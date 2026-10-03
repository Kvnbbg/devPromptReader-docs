/**
 * Plan grants from a Stripe-like event payload (dry, pure JS).
 * Server applies DB writes; this module only decides what to grant.
 * @module webhook-grant-plan
 */

import { planGrantFromPayment } from './entitlements-grant-dry.js';
import { getMonthlyGrant } from './credits-limits.js';

/**
 * Extract product_key from Checkout Session / Invoice metadata.
 * @param {object} event
 */
export function extractProductKeyFromEvent(event) {
  const e = event || {};
  const obj = e.data && e.data.object ? e.data.object : e;
  const meta = obj.metadata || {};
  if (meta.product_key) return String(meta.product_key);
  if (obj.subscription_details && obj.subscription_details.metadata) {
    const m = obj.subscription_details.metadata;
    if (m.product_key) return String(m.product_key);
  }
  return null;
}

/**
 * @param {{
 *   id?: string,
 *   type?: string,
 *   data?: { object?: object },
 * }} event
 */
export function planWebhookGrant(event) {
  const e = event || {};
  const type = String(e.type || '');
  const allowed =
    type === 'checkout.session.completed' ||
    type === 'invoice.paid' ||
    type === 'invoice.payment_succeeded';

  if (!allowed && type) {
    return { ok: false, reason: 'ignored_event_type', type: type, grants: [] };
  }

  const productKey = extractProductKeyFromEvent(e);
  if (!productKey) {
    return { ok: false, reason: 'missing_product_key', grants: [] };
  }

  const obj = e.data && e.data.object ? e.data.object : {};
  const interval =
    (obj.metadata && obj.metadata.interval) === 'year' ? 'year' : 'month';

  const planned = planGrantFromPayment({
    product_key: productKey,
    interval: interval,
    stripe_event_id: e.id || null,
  });

  if (!planned.ok) return planned;

  const credits = getMonthlyGrant(productKey);
  return {
    ok: true,
    type: type || 'manual',
    idempotency_key: e.id || null,
    product_key: productKey,
    credits_to_grant: credits,
    grants: planned.grants,
  };
}
