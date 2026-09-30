/**
 * Money Quest progress — device-first slices (film-like decisions).
 * Aligns with Money Quest path; no server required.
 * @module money-quest-progress
 */

import { readJson, writeJson } from './safe-storage.js';
import { mergeGameIntoDashboard } from './dashboard-dry.js';

const KEY = 'ts_money_quest_v1';

export function defaultMoneyQuest() {
  return {
    level: 0,
    playTimeSec: 0,
    points: 0,
    gold: 0,
    slicesCompleted: 0,
    objective: 'Complete one budget slice',
    grade: '—',
    lastSliceId: null,
  };
}

export function loadMoneyQuest() {
  const data = readJson(KEY, null);
  if (!data || typeof data !== 'object') return defaultMoneyQuest();
  return Object.assign(defaultMoneyQuest(), data);
}

/** @param {ReturnType<typeof defaultMoneyQuest>} s */
export function saveMoneyQuest(s) {
  writeJson(KEY, s || defaultMoneyQuest());
}

/**
 * Record one decision slice (success or fail).
 * @param {{ sliceId?: string, pointsDelta?: number, goldDelta?: number, seconds?: number, success?: boolean }} ev
 */
export function recordMoneySlice(ev) {
  const e = ev || {};
  const s = loadMoneyQuest();
  s.slicesCompleted = (s.slicesCompleted || 0) + 1;
  s.points = Math.max(0, (s.points || 0) + (e.pointsDelta || 0));
  s.gold = Math.max(0, (s.gold || 0) + (e.goldDelta || 0));
  s.playTimeSec = (s.playTimeSec || 0) + Math.max(0, e.seconds || 0);
  if (e.sliceId) s.lastSliceId = String(e.sliceId).slice(0, 64);
  if (e.success) {
    s.level = Math.max(s.level || 0, Math.floor((s.points || 0) / 50));
  }
  if (s.points >= 200) s.grade = 'A';
  else if (s.points >= 100) s.grade = 'B';
  else if (s.points >= 40) s.grade = 'C';
  else if (s.points >= 10) s.grade = 'D';
  else s.grade = '—';
  saveMoneyQuest(s);
  mergeGameIntoDashboard('moneyQuest', {
    level: s.level,
    playTimeSec: s.playTimeSec,
    points: s.points,
    objective: s.objective,
    grade: s.grade,
  });
  return s;
}
