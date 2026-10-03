/**
 * Build Stripe Checkout Session params (server-side helper, no SDK required).
 * Pass result into stripe.checkout.sessions.create(...).
 * Never put secret key in the browser.
 * @module checkout-session-plan
 */

import {
  assertOfferReadyForCheckout,
  buildCheckoutMetadata,
} from './entitlements-resolve.js';

/**
 * Map product_key + interval → your Stripe Price IDs (fill from Dashboard).
 * @type {Record<string, { month?: string, year?: string }>}
 */
export const STRIPE_PRICE_IDS = {
  premium: {
    month: 'price_REPLACE_PREMIUM_MONTH',
    year: 'price_REPLACE_PREMIUM_YEAR',
  },
  studio_premium: {
    month: 'price_REPLACE_STUDIO_MONTH',
    year: 'price_REPLACE_STUDIO_YEAR',
  },
  train_premium: {
    month: 'price_REPLACE_TRAIN_MONTH',
    year: 'price_REPLACE_TRAIN_YEAR',
  },
};

/**
 * @param {string} productKey
 * @param {'month'|'year'} interval
 * @param {typeof STRIPE_PRICE_IDS} [priceMap]
 */
export function resolvePriceId(productKey, interval, priceMap) {
  const map = priceMap || STRIPE_PRICE_IDS;
  const row = map[productKey];
  if (!row) return null;
  const id = interval === 'year' ? row.year : row.month;
  if (!id || String(id).indexOf('REPLACE') !== -1) return null;
  return id;
}

/**
 * @param {{
 *   productKey: string,
 *   interval?: 'month'|'year',
 *   successUrl: string,
 *   cancelUrl: string,
 *   customerEmail?: string,
 *   clientReferenceId?: string,
 *   priceMap?: typeof STRIPE_PRICE_IDS,
 * }} input
 */
export function planCheckoutSession(input) {
  const i = input || {};
  const interval = i.interval === 'year' ? 'year' : 'month';
  const offer = assertOfferReadyForCheckout(i.productKey, interval);
  const priceId = resolvePriceId(i.productKey, interval, i.priceMap);
  const blockers = [];
  if (!priceId) blockers.push('stripe_price_id_not_configured');
  if (!i.successUrl || !/^https?:\/\//i.test(i.successUrl)) {
    blockers.push('success_url_invalid');
  }
  if (!i.cancelUrl || !/^https?:\/\//i.test(i.cancelUrl)) {
    blockers.push('cancel_url_invalid');
  }

  const metadata = buildCheckoutMetadata(i.productKey, interval) || {};

  const sessionParams = {
    mode: 'subscription',
    line_items: priceId ? [{ price: priceId, quantity: 1 }] : [],
    success_url: i.successUrl,
    cancel_url: i.cancelUrl,
    billing_address_collection: 'required',
    payment_method_options: {
      card: { request_three_d_secure: 'automatic' },
    },
    metadata: metadata,
    subscription_data: { metadata: metadata },
  };

  if (i.customerEmail) {
    sessionParams.customer_email = String(i.customerEmail).slice(0, 254);
  }
  if (i.clientReferenceId) {
    sessionParams.client_reference_id = String(i.clientReferenceId).slice(0, 200);
  }

  return {
    ok: blockers.length === 0,
    blockers: blockers,
    offer: offer,
    priceId: priceId,
    sessionParams: sessionParams,
  };
}
