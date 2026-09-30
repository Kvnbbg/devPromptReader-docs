/**
 * Client-side checkout guards — block obvious fraud patterns before Stripe.
 * Server must still validate; never trust the browser alone.
 * @module checkout-guard
 */

const BLOCKED_NAME_RE =
  /^(test|testing|tester|dummy|fake|asdf|xxx|user|admin|sample|n\/?a)$/i;

/**
 * @param {string} value
 * @returns {string}
 */
function norm(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const e = norm(email).toLowerCase();
  if (e.length < 5 || e.length > 254) return false;
  // pragmatic, not full RFC
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

/**
 * @param {string} name
 * @returns {boolean} true if name looks like a placeholder / test
 */
export function isBlockedCardholderName(name) {
  const n = norm(name);
  if (!n) return true;
  if (n.length < 2) return true;
  if (BLOCKED_NAME_RE.test(n)) return true;
  if (BLOCKED_NAME_RE.test(n.replace(/\s/g, ''))) return true;
  return false;
}

/**
 * @param {{
 *   email?: string,
 *   name?: string,
 *   cardName?: string,
 *   requireEmail?: boolean,
 * }} input
 * @returns {{ ok: boolean, errors: string[] }}
 */
export function validateCheckoutFields(input) {
  const i = input || {};
  const errors = [];
  const requireEmail = i.requireEmail !== false;

  if (requireEmail && !isValidEmail(i.email || '')) {
    errors.push('email_required_or_invalid');
  }

  const name = i.cardName || i.name || '';
  if (isBlockedCardholderName(name)) {
    errors.push('name_blocked_or_empty');
  }

  return { ok: errors.length === 0, errors: errors };
}

/**
 * Call before creating PaymentIntent / redirect to Checkout.
 * @param {object} input same as validateCheckoutFields
 * @throws {Error} if invalid
 */
export function assertCheckoutAllowed(input) {
  const r = validateCheckoutFields(input);
  if (!r.ok) {
    const err = new Error('Checkout blocked: ' + r.errors.join(','));
    err.code = 'CHECKOUT_GUARD';
    err.errors = r.errors;
    throw err;
  }
  return true;
}
