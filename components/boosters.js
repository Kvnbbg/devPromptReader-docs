/**
 * Boosters — perseverance rewards. Spec: agents/boosters/
 * @module boosters
 */

import { readJson, writeJson } from './safe-storage.js';

const KEY = 'ts_boosters_v1';

const BOOSTER_TYPES = [
  { id: 'time_plus', weight: 40 },
  { id: 'shield', weight: 25 },
  { id: 'xp_double', weight: 20 },
  { id: 'gold_small', weight: 15 },
];

/** @returns {Record<string, number>} */
export function loadBoosters() {
  const data = readJson(KEY, {});
  return data && typeof data === 'object' ? data : {};
}

/** @param {Record<string, number>} state */
export function saveBoosters(state) {
  writeJson(KEY, state || {});
}

function pickType() {
  let total = 0;
  for (let i = 0; i < BOOSTER_TYPES.length; i++) total += BOOSTER_TYPES[i].weight;
  let r = Math.random() * total;
  for (let i = 0; i < BOOSTER_TYPES.length; i++) {
    r -= BOOSTER_TYPES[i].weight;
    if (r <= 0) return BOOSTER_TYPES[i].id;
  }
  return BOOSTER_TYPES[0].id;
}

/**
 * @param {{
 *   streak?: number,
 *   sessionGrants?: number,
 *   dailyGrants?: number,
 *   roll?: number,
 *   streakNeed?: number,
 *   sessionCap?: number,
 *   dailyCap?: number,
 * }} ctx
 * @returns {string | null} booster id or null
 */
export function maybeGrantBooster(ctx) {
  const c = ctx || {};
  const sessionGrants = c.sessionGrants || 0;
  const dailyGrants = c.dailyGrants || 0;
  const sessionCap = c.sessionCap != null ? c.sessionCap : 3;
  const dailyCap = c.dailyCap != null ? c.dailyCap : 5;
  const streakNeed = c.streakNeed != null ? c.streakNeed : 3;
  const roll = c.roll != null ? c.roll : 0.1;
  const streak = c.streak || 0;

  if (sessionGrants >= sessionCap || dailyGrants >= dailyCap) return null;

  const streakHit = streak > 0 && streak % streakNeed === 0;
  const rollHit = Math.random() < roll;
  if (!streakHit && !rollHit) return null;

  const id = pickType();
  const state = loadBoosters();
  state[id] = (state[id] || 0) + 1;
  saveBoosters(state);
  return id;
}

/** @param {string} id @returns {boolean} */
export function consumeBooster(id) {
  if (!id || typeof id !== 'string') return false;
  const state = loadBoosters();
  if (!state[id] || state[id] < 1) return false;
  state[id] -= 1;
  if (state[id] <= 0) delete state[id];
  saveBoosters(state);
  return true;
}

export function listBoosterTypes() {
  return BOOSTER_TYPES.map(function (t) {
    return t.id;
  });
}
