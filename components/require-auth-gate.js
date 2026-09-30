/**
 * Auth gate for credits & subscriptions — no framework.
 * Call before creating Checkout Session / PaymentIntent for paid plans.
 * @module require-auth-gate
 */

/**
 * @typedef {{ id?: string, email?: string } | null | undefined} SessionUser
 */

/**
 * @param {SessionUser} user
 * @returns {{ ok: true, userId: string, email: string } | { ok: false, reason: string }}
 */
export function requireLoggedInUser(user) {
  if (!user || typeof user !== 'object') {
    return { ok: false, reason: 'not_authenticated' };
  }
  const id = user.id != null ? String(user.id).trim() : '';
  const email = user.email != null ? String(user.email).trim() : '';
  if (!id && !email) {
    return { ok: false, reason: 'not_authenticated' };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, reason: 'email_invalid' };
  }
  return {
    ok: true,
    userId: id || email,
    email: email,
  };
}

/**
 * Throws if user cannot buy credits / subscription.
 * @param {SessionUser} user
 */
export function assertCanPurchaseEntitlement(user) {
  const r = requireLoggedInUser(user);
  if (!r.ok) {
    const err = new Error('Purchase requires login: ' + r.reason);
    err.code = 'AUTH_REQUIRED';
    err.reason = r.reason;
    throw err;
  }
  return r;
}

/**
 * Kinds that must never use guest checkout.
 */
export const AUTH_REQUIRED_KINDS = ['credits', 'subscription', 'pro', 'business'];

/**
 * @param {string} kind
 * @returns {boolean}
 */
export function kindRequiresAuth(kind) {
  const k = String(kind || '')
    .toLowerCase()
    .trim();
  return AUTH_REQUIRED_KINDS.indexOf(k) !== -1;
}
