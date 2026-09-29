/**
 * MatrixCitizen hospital path state. Spec: agents/matrix-hospital/
 * Fiction only — not medical advice.
 * @module hospital-state
 */

import { readJson, writeJson } from './safe-storage.js';

const KEY = 'ts_hospital_v1';

export const DISCLAIMER =
  'This is a fictional work simulation for education and roleplay. It is not medical advice and not professional training certification.';

export function defaultHospitalState() {
  return {
    rank: 0,
    branch: null,
    xp: 0,
    gold: 10,
    life: 3,
    scenesCompleted: 0,
    grade: '—',
    playTimeSec: 0,
    streak: 0,
    sessionBoosterGrants: 0,
    rp: {
      tone: 'neutral',
      consequence_severity: 'standard',
      scene_duration: 'short',
      show_scores: true,
      allow_meta_cheats: false,
    },
  };
}

export function loadHospital() {
  const data = readJson(KEY, null);
  if (!data || typeof data !== 'object') return defaultHospitalState();
  const base = defaultHospitalState();
  return Object.assign(base, data, {
    rp: Object.assign(base.rp, data.rp || {}),
  });
}

/** @param {ReturnType<typeof defaultHospitalState>} s */
export function saveHospital(s) {
  writeJson(KEY, s || defaultHospitalState());
}

/**
 * @param {ReturnType<typeof defaultHospitalState>} state
 * @param {{ goldDelta?: number, lifeDelta?: number, xpDelta?: number }} delta
 */
export function applyConsequence(state, delta) {
  const d = delta || {};
  const s = Object.assign({}, state);
  const goldDelta = d.goldDelta || 0;
  const lifeDelta = d.lifeDelta || 0;
  const xpDelta = d.xpDelta || 0;

  s.gold = Math.max(0, (s.gold || 0) + goldDelta);

  if (lifeDelta < 0) {
    const need = -lifeDelta;
    if ((s.gold || 0) >= need) {
      s.gold -= need;
    } else {
      s.life = Math.max(0, (s.life || 0) - need);
    }
  } else if (lifeDelta > 0) {
    s.life = (s.life || 0) + lifeDelta;
  }

  s.xp = Math.max(0, (s.xp || 0) + xpDelta);
  return s;
}

/** @param {ReturnType<typeof defaultHospitalState>} state */
export function gradeFromXp(state) {
  const xp = (state && state.xp) || 0;
  if (xp >= 200) return 'A';
  if (xp >= 100) return 'B';
  if (xp >= 40) return 'C';
  if (xp >= 10) return 'D';
  return '—';
}
