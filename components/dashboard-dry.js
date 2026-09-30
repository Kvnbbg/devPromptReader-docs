/**
 * Dashboard dry wire — levels, time, points, objective, grades.
 * Spec: agents/game/05-dashboard-dry-wire.md
 * Device-first; no server stream.
 * @module dashboard-dry
 */

import { readJson, writeJson } from './safe-storage.js';

const KEY = 'ts_dashboard_v1';

export function defaultDashboard() {
  return {
    moneyQuest: {
      level: 0,
      playTimeSec: 0,
      points: 0,
      objective: '—',
      grade: '—',
    },
    mathLab: {
      level: 0,
      playTimeSec: 0,
      points: 0,
      objective: '—',
      grade: '—',
    },
    hospital: {
      level: 0,
      playTimeSec: 0,
      points: 0,
      objective: '—',
      grade: '—',
    },
    updatedAt: null,
  };
}

export function loadDashboard() {
  const data = readJson(KEY, null);
  if (!data || typeof data !== 'object') return defaultDashboard();
  const base = defaultDashboard();
  return {
    moneyQuest: Object.assign(base.moneyQuest, data.moneyQuest || {}),
    mathLab: Object.assign(base.mathLab, data.mathLab || {}),
    hospital: Object.assign(base.hospital, data.hospital || {}),
    updatedAt: data.updatedAt || null,
  };
}

/** @param {ReturnType<typeof defaultDashboard>} d */
export function saveDashboard(d) {
  const payload = d || defaultDashboard();
  payload.updatedAt = new Date().toISOString();
  writeJson(KEY, payload);
}

/**
 * Merge a game slice into dashboard row.
 * @param {'moneyQuest'|'mathLab'|'hospital'} gameKey
 * @param {{ level?: number, playTimeSec?: number, points?: number, objective?: string, grade?: string }} slice
 */
export function mergeGameIntoDashboard(gameKey, slice) {
  const d = loadDashboard();
  if (!d[gameKey]) return d;
  const s = slice || {};
  if (s.level != null) d[gameKey].level = s.level;
  if (s.playTimeSec != null) d[gameKey].playTimeSec = s.playTimeSec;
  if (s.points != null) d[gameKey].points = s.points;
  if (s.objective != null) d[gameKey].objective = String(s.objective).slice(0, 120);
  if (s.grade != null) d[gameKey].grade = String(s.grade).slice(0, 8);
  saveDashboard(d);
  return d;
}
