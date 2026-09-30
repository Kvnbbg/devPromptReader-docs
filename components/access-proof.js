/**
 * Access proof log for small digital payments — device or server mirror.
 * Store charge/pi id + email + product + timestamps for dispute evidence.
 * @module access-proof
 */

import { readJson, writeJson } from './safe-storage.js';

const KEY = 'ts_access_proof_v1';
const MAX_ENTRIES = 200;

/**
 * @returns {object[]}
 */
function loadAll() {
  const data = readJson(KEY, []);
  return Array.isArray(data) ? data : [];
}

function saveAll(list) {
  writeJson(KEY, list.slice(-MAX_ENTRIES));
}

/**
 * Record successful payment linkage (call after confirmed success).
 * @param {{
 *   paymentIntentId?: string,
 *   chargeId?: string,
 *   email?: string,
 *   productId?: string,
 *   amount?: number,
 *   currency?: string,
 * }} meta
 */
export function recordPaymentProof(meta) {
  const m = meta || {};
  const list = loadAll();
  list.push({
    type: 'payment',
    at: new Date().toISOString(),
    paymentIntentId: m.paymentIntentId ? String(m.paymentIntentId).slice(0, 128) : null,
    chargeId: m.chargeId ? String(m.chargeId).slice(0, 128) : null,
    email: m.email ? String(m.email).slice(0, 254) : null,
    productId: m.productId ? String(m.productId).slice(0, 64) : null,
    amount: typeof m.amount === 'number' ? m.amount : null,
    currency: m.currency ? String(m.currency).slice(0, 8) : null,
  });
  saveAll(list);
  return list[list.length - 1];
}

/**
 * Record first access to the digital product after payment.
 * @param {{ paymentIntentId?: string, chargeId?: string, path?: string }} meta
 */
export function recordAccessProof(meta) {
  const m = meta || {};
  const list = loadAll();
  list.push({
    type: 'access',
    at: new Date().toISOString(),
    paymentIntentId: m.paymentIntentId ? String(m.paymentIntentId).slice(0, 128) : null,
    chargeId: m.chargeId ? String(m.chargeId).slice(0, 128) : null,
    path: m.path ? String(m.path).slice(0, 200) : null,
  });
  saveAll(list);
  return list[list.length - 1];
}

/** @param {string} chargeOrPi */
export function findProofsFor(chargeOrPi) {
  const id = String(chargeOrPi || '');
  return loadAll().filter(function (e) {
    return e.paymentIntentId === id || e.chargeId === id;
  });
}

export function exportProofs() {
  return loadAll();
}
