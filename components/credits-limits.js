/**
 * Credit limits per product / plan — source of truth for grants & caps.
 * @module credits-limits
 */

/** Monthly credit grant when subscription renews or checkout completes. */
export const CREDIT_GRANTS = {
  premium: 500,
  studio_premium: 0,
  train_premium: 0,
  free: 0,
  starter: 50,
};

/** Hard wallet cap (prevents runaway balances). */
export const CREDIT_WALLET_MAX = 20000;

/** Max credits spendable in a single action. */
export const CREDIT_SPEND_MAX_PER_ACTION = 1000;

/**
 * @param {string} productKey
 * @returns {number}
 */
export function getMonthlyGrant(productKey) {
  const k = String(productKey || '');
  if (Object.prototype.hasOwnProperty.call(CREDIT_GRANTS, k)) {
    return CREDIT_GRANTS[k];
  }
  return 0;
}

/**
 * @param {number} balance
 * @param {number} delta positive or negative
 * @returns {number} clamped balance
 */
export function clampBalance(balance, delta) {
  let next = (Number(balance) || 0) + (Number(delta) || 0);
  if (next < 0) next = 0;
  if (next > CREDIT_WALLET_MAX) next = CREDIT_WALLET_MAX;
  return next;
}
