/**
 * Recommended Stripe Checkout Session option fragments (plain objects).
 * No Stripe SDK import — merge into your server-side sessions.create() params.
 * Secret key stays on server only.
 * @module checkout-session-options
 */

/**
 * Base options for one-time or subscription Checkout.
 * @param {{
 *   mode?: 'payment' | 'subscription',
 *   successUrl: string,
 *   cancelUrl: string,
 *   customerEmail?: string,
 *   clientReferenceId?: string,
 *   metadata?: Record<string, string>,
 *   requireBillingAddress?: boolean,
 *   allowPromotionCodes?: boolean,
 * }} cfg
 */
export function buildCheckoutSessionParams(cfg) {
  const c = cfg || {};
  if (!c.successUrl || !c.cancelUrl) {
    throw new Error('successUrl and cancelUrl are required');
  }

  const params = {
    mode: c.mode === 'subscription' ? 'subscription' : 'payment',
    success_url: String(c.successUrl),
    cancel_url: String(c.cancelUrl),
    billing_address_collection:
      c.requireBillingAddress === false ? 'auto' : 'required',
    phone_number_collection: { enabled: false },
  };

  if (c.customerEmail) {
    params.customer_email = String(c.customerEmail).slice(0, 254);
  }
  if (c.clientReferenceId) {
    params.client_reference_id = String(c.clientReferenceId).slice(0, 200);
  }
  if (c.metadata && typeof c.metadata === 'object') {
    params.metadata = c.metadata;
  }
  if (c.allowPromotionCodes) {
    params.allow_promotion_codes = true;
  }

  return params;
}

/**
 * PaymentIntent options fragment to request 3DS when creating PI on server.
 * Merge under payment_method_options.
 */
export function cardThreeDSecureOptions(level) {
  const v = level === 'any' ? 'any' : 'automatic';
  return {
    card: {
      request_three_d_secure: v,
    },
  };
}

/**
 * Metadata keys we recommend for dispute + access proof.
 */
export function accessMetadata(opts) {
  const o = opts || {};
  const out = {};
  if (o.userId) out.user_id = String(o.userId).slice(0, 64);
  if (o.productId) out.product_id = String(o.productId).slice(0, 64);
  if (o.kind) out.kind = String(o.kind).slice(0, 32);
  return out;
}
