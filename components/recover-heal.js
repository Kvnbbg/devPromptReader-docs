/**
 * Recover & heal micro-wizard — local only, optional notes.
 * Steps: recognize → breathe → write → micro-ritual → close.
 * @module recover-heal
 */

import { readJson, writeJson } from './safe-storage.js';
import { announce } from './a11y-live-region.js';

const KEY = 'ts_recover_sessions_v1';
const MAX = 30;

const STEPS = ['recognize', 'breathe', 'write', 'ritual', 'close'];

const MICRO = {
  fr: [
    'Boire un verre d’eau',
    'Marcher 5 minutes',
    'Écrire 3 lignes',
    'Respirer 2 minutes',
    'Regarder par la fenêtre',
  ],
  en: [
    'Drink a glass of water',
    'Walk 5 minutes',
    'Write 3 lines',
    'Breathe for 2 minutes',
    'Look out the window',
  ],
};

/**
 * @param {'fr'|'en'} [lang]
 */
export function createRecoverSession(lang) {
  const L = lang === 'en' ? 'en' : 'fr';
  let step = 0;
  const data = {
    id: 'rh_' + Date.now(),
    feeling: '',
    trigger: '',
    microRitual: '',
    takeaway: '',
    startedAt: new Date().toISOString(),
    completedAt: null,
  };

  return {
    steps: STEPS.slice(),
    microOptions: MICRO[L].slice(),
    getStep: function () {
      return STEPS[step];
    },
    getIndex: function () {
      return step;
    },
    getData: function () {
      return Object.assign({}, data);
    },
    setFeeling: function (t) {
      data.feeling = String(t || '').slice(0, 200);
    },
    setTrigger: function (t) {
      data.trigger = String(t || '').slice(0, 500);
    },
    setMicroRitual: function (t) {
      data.microRitual = String(t || '').slice(0, 120);
    },
    setTakeaway: function (t) {
      data.takeaway = String(t || '').slice(0, 500);
    },
    next: function () {
      if (step < STEPS.length - 1) step += 1;
      return STEPS[step];
    },
    prev: function () {
      if (step > 0) step -= 1;
      return STEPS[step];
    },
    complete: function () {
      data.completedAt = new Date().toISOString();
      const all = readJson(KEY, []);
      const list = Array.isArray(all) ? all : [];
      list.push(Object.assign({}, data));
      writeJson(KEY, list.slice(-MAX));
      announce(L === 'en' ? 'Session saved locally.' : 'Session enregistrée localement.');
      return data;
    },
  };
}

export function listRecoverSessions() {
  const all = readJson(KEY, []);
  return Array.isArray(all) ? all.slice() : [];
}

export function clearRecoverSessions() {
  writeJson(KEY, []);
}
