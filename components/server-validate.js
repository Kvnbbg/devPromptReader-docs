/**
 * Server-side payment body validation (same rules as checkout-guard).
 * Node 18+ ESM. Pair with Stripe webhook signature verification.
 * @module server-validate
 */

import {
  isValidEmail,
  isBlockedCardholderName,
  validateCheckoutFields,
  assertCheckoutAllowed,
} from './checkout-guard.js';

export {
  isValidEmail,
  isBlockedCardholderName,
  validateCheckoutFields,
  assertCheckoutAllowed,
};

/**
 * @param {Record<string, unknown>} body
 * @returns {{ ok: boolean, errors: string[], email: string, name: string }}
 */
export function validatePaymentRequestBody(body) {
  const b = body && typeof body === 'object' ? body : {};
  const email = b.email != null ? String(b.email) : '';
  const name =
    b.cardName != null
      ? String(b.cardName)
      : b.name != null
        ? String(b.name)
        : '';
  const result = validateCheckoutFields({
    email: email,
    cardName: name,
    requireEmail: true,
  });
  return {
    ok: result.ok,
    errors: result.errors.slice(),
    email: email.trim(),
    name: name.trim(),
  };
}
