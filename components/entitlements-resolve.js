/**
 * Resolve what a paid offer must grant — client-safe reference map.
 * Server webhook remains source of truth for writes.
 * @module entitlements-resolve
 */

/** Default matrix (override via configureEntitlements). */
const DEFAULT_OFFERS = {
  premium: {
    product_key: 'premium',
    entitlement: 'premium',
    credits_per_month: null,
    apps: [],
    amounts: { month: 4.99, year: 39.99 },
  },
  studio_premium: {
    product_key: 'studio_premium',
    entitlement: 'studio_premium',
    credits_per_month: 0,
    apps: ['beatmaker', 'studio'],
    amounts: { month: 7.99, year: 59.99 },
  },
  train_premium: {
    product_key: 'train_premium',
    entitlement: 'train_premium',
    credits_per_month: 0,
    apps: ['train_adventures'],
    amounts: { month: 2.99, year: 19.99 },
  },
};

let offers = Object.assign({}, DEFAULT_OFFERS);

/**
 * @param {Partial<typeof DEFAULT_OFFERS>} map
 */
export function configureEntitlements(map) {
  if (!map || typeof map !== 'object') return;
  offers = Object.assign({}, DEFAULT_OFFERS, map);
}

/**
 * @param {string} productKey
 * @param {'month'|'year'} [interval]
 * @returns {null | {
 *   product_key: string,
 *   entitlement: string,
 *   credits_per_month: number|null,
 *   apps: string[],
 *   amount_eur: number|null,
 *   ready_for_checkout: boolean,
 *   blockers: string[],
 * }}
 */
export function resolveOffer(productKey, interval) {
  const key = String(productKey || '');
  const o = offers[key];
  if (!o) return null;
  const iv = interval === 'year' ? 'year' : 'month';
  const blockers = [];
  if (o.credits_per_month === null) {
    blockers.push('credits_per_month_not_set');
  }
  const amount =
    o.amounts && typeof o.amounts[iv] === 'number' ? o.amounts[iv] : null;
  return {
    product_key: o.product_key,
    entitlement: o.entitlement,
    credits_per_month: o.credits_per_month,
    apps: (o.apps || []).slice(),
    amount_eur: amount,
    ready_for_checkout: blockers.length === 0,
    blockers: blockers,
  };
}

/**
 * Build Checkout metadata to attach server-side.
 * @param {string} productKey
 * @param {'month'|'year'} interval
 */
export function buildCheckoutMetadata(productKey, interval) {
  const r = resolveOffer(productKey, interval);
  if (!r) return null;
  return {
    product_key: r.product_key,
    interval: interval === 'year' ? 'year' : 'month',
    entitlement: r.entitlement,
    credits_per_month: String(
      r.credits_per_month == null ? '' : r.credits_per_month
    ),
    apps: (r.apps || []).join(','),
  };
}

/**
 * Guard: do not open Checkout if offer not fully configured.
 * @param {string} productKey
 * @param {'month'|'year'} [interval]
 */
export function assertOfferReadyForCheckout(productKey, interval) {
  const r = resolveOffer(productKey, interval);
  if (!r) {
    throw new Error('Unknown product_key: ' + productKey);
  }
  if (!r.ready_for_checkout) {
    throw new Error(
      'Offer not ready for checkout: ' + r.blockers.join(', ')
    );
  }
  return r;
}

export function listProductKeys() {
  return Object.keys(offers);
}
