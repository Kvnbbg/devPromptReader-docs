/**
 * Dry grant planner — what the webhook SHOULD write (no side effects).
 * Use in tests / admin UI before enabling live buttons.
 * @module entitlements-grant-dry
 */

import { resolveOffer } from './entitlements-resolve.js';

/**
 * @param {{
 *   product_key: string,
 *   interval?: 'month'|'year',
 *   stripe_event_id?: string,
 *   customer_id?: string,
 *   amount_eur?: number,
 * }} paid
 */
export function planGrantFromPayment(paid) {
  const p = paid || {};
  const resolved = resolveOffer(p.product_key, p.interval || 'month');
  if (!resolved) {
    return {
      ok: false,
      reason: 'unknown_product',
      grants: [],
    };
  }
  if (!resolved.ready_for_checkout) {
    return {
      ok: false,
      reason: 'offer_not_configured',
      blockers: resolved.blockers,
      grants: [],
    };
  }

  const grants = [
    {
      type: 'entitlement',
      key: resolved.entitlement,
      active: true,
    },
  ];

  for (let i = 0; i < resolved.apps.length; i++) {
    grants.push({
      type: 'app_access',
      key: resolved.apps[i],
      active: true,
    });
  }

  if (
    typeof resolved.credits_per_month === 'number' &&
    resolved.credits_per_month > 0
  ) {
    grants.push({
      type: 'credits',
      amount: resolved.credits_per_month,
      period: 'month',
    });
  }

  return {
    ok: true,
    idempotency_key: p.stripe_event_id || null,
    product_key: resolved.product_key,
    grants: grants,
  };
}
