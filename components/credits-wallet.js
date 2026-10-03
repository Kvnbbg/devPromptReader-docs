/**
 * Local credit wallet — device cache. Server remains authority after webhook.
 * @module credits-wallet
 */

import { readJson, writeJson } from './safe-storage.js';
import {
  CREDIT_WALLET_MAX,
  CREDIT_SPEND_MAX_PER_ACTION,
  clampBalance,
  getMonthlyGrant,
} from './credits-limits.js';

const KEY = 'ts_credits_wallet_v1';

function defaultWallet() {
  return {
    balance: 0,
    updatedAt: null,
    lastGrantProduct: null,
    lastGrantAt: null,
    history: [],
  };
}

export function loadWallet() {
  const w = readJson(KEY, null);
  return Object.assign(defaultWallet(), w && typeof w === 'object' ? w : {});
}

function saveWallet(w) {
  writeJson(KEY, w);
}

function pushHistory(w, entry) {
  const h = Array.isArray(w.history) ? w.history : [];
  h.push(entry);
  w.history = h.slice(-40);
}

/**
 * @param {number} amount
 * @param {string} [reason]
 * @param {string} [ref]
 */
export function grantCredits(amount, reason, ref) {
  const n = Math.floor(Number(amount) || 0);
  if (n <= 0) return loadWallet();
  const w = loadWallet();
  w.balance = clampBalance(w.balance, n);
  w.updatedAt = new Date().toISOString();
  pushHistory(w, {
    type: 'grant',
    amount: n,
    reason: String(reason || 'grant').slice(0, 80),
    ref: String(ref || '').slice(0, 120),
    at: w.updatedAt,
  });
  saveWallet(w);
  return w;
}

/**
 * Apply monthly grant for a product_key (idempotent per day+product if ref set).
 * @param {string} productKey
 * @param {string} [stripeEventId]
 */
export function grantMonthlyForProduct(productKey, stripeEventId) {
  const amount = getMonthlyGrant(productKey);
  if (amount <= 0) return loadWallet();
  const w = loadWallet();
  if (stripeEventId && w.history) {
    for (let i = 0; i < w.history.length; i++) {
      if (w.history[i].ref === stripeEventId) return w;
    }
  }
  const next = grantCredits(amount, 'monthly:' + productKey, stripeEventId || '');
  next.lastGrantProduct = productKey;
  next.lastGrantAt = next.updatedAt;
  saveWallet(next);
  return next;
}

/**
 * @param {number} amount
 * @param {string} [reason]
 * @returns {{ ok: boolean, wallet: object, error?: string }}
 */
export function spendCredits(amount, reason) {
  const n = Math.floor(Number(amount) || 0);
  if (n <= 0) return { ok: false, wallet: loadWallet(), error: 'invalid_amount' };
  if (n > CREDIT_SPEND_MAX_PER_ACTION) {
    return { ok: false, wallet: loadWallet(), error: 'over_spend_cap' };
  }
  const w = loadWallet();
  if (w.balance < n) {
    return { ok: false, wallet: w, error: 'insufficient' };
  }
  w.balance = clampBalance(w.balance, -n);
  w.updatedAt = new Date().toISOString();
  pushHistory(w, {
    type: 'spend',
    amount: n,
    reason: String(reason || 'spend').slice(0, 80),
    at: w.updatedAt,
  });
  saveWallet(w);
  return { ok: true, wallet: w };
}

export function getBalance() {
  return loadWallet().balance;
}

export function getWalletMax() {
  return CREDIT_WALLET_MAX;
}
