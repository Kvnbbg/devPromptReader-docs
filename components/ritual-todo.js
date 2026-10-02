/**
 * Pre-filled ritual checklists — device-first, low-end friendly.
 * One localStorage read per listRituals() call (no lag loops).
 * @module ritual-todo
 */

import { readJson, writeJson } from './safe-storage.js';

const STATE_KEY = 'ts_ritual_state_v1';

const DEFAULT_RITUALS = [
  {
    id: 'morning_soft_start',
    category: 'corps',
    labelFr: 'Démarrage doux',
    labelEn: 'Soft start',
    itemsFr: [
      'Boire un grand verre d’eau.',
      '3 minutes de respiration consciente.',
      'Étirements très doux (cou, épaules, dos).',
    ],
    itemsEn: [
      'Drink a full glass of water.',
      '3 minutes of mindful breathing.',
      'Very gentle stretches (neck, shoulders, back).',
    ],
  },
  {
    id: 'evening_heart_check',
    category: 'coeur',
    labelFr: 'Check-in du soir',
    labelEn: 'Evening check-in',
    itemsFr: [
      'Se rappeler un moment doux de la journée.',
      'Envoyer un message tendre (ou à soi).',
      'Noter une chose pour laquelle on est reconnaissant.',
    ],
    itemsEn: [
      'Recall one gentle moment from the day.',
      'Send a kind message (or to yourself).',
      'Note one thing you are grateful for.',
    ],
  },
  {
    id: 'strategy_anchor',
    category: 'esprit',
    labelFr: 'Ancrage stratégie',
    labelEn: 'Strategy anchor',
    itemsFr: [
      'Relire un principe (local, vegan, non-forçage).',
      'Noter 1 chose apprise aujourd’hui.',
      'Choisir une seule priorité pour demain.',
    ],
    itemsEn: [
      'Reread one principle (local, vegan, non-forcing).',
      'Note one thing learned today.',
      'Choose a single priority for tomorrow.',
    ],
  },
];

function loadState() {
  const s = readJson(STATE_KEY, {});
  return s && typeof s === 'object' ? s : {};
}

function saveState(s) {
  writeJson(STATE_KEY, s);
}

/**
 * @param {'fr'|'en'} [lang]
 */
export function listRituals(lang) {
  const st = loadState();
  const en = lang === 'en';
  const out = [];
  for (let r = 0; r < DEFAULT_RITUALS.length; r++) {
    const ritual = DEFAULT_RITUALS[r];
    const texts = en ? ritual.itemsEn : ritual.itemsFr;
    const items = [];
    for (let i = 0; i < texts.length; i++) {
      const key = ritual.id + ':' + i;
      const cell = st[key];
      items.push({
        index: i,
        text: texts[i],
        done: !!(cell && cell.done),
      });
    }
    out.push({
      id: ritual.id,
      category: ritual.category,
      label: en ? ritual.labelEn : ritual.labelFr,
      items: items,
    });
  }
  return out;
}

export function setRitualItemDone(ritualId, itemIndex, done) {
  const st = loadState();
  const key = String(ritualId) + ':' + String(itemIndex);
  st[key] = {
    done: !!done,
    at: new Date().toISOString(),
  };
  saveState(st);
  return st[key];
}

export function resetRitualProgress(ritualId) {
  const st = loadState();
  const prefix = String(ritualId) + ':';
  const keys = Object.keys(st);
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].indexOf(prefix) === 0) delete st[keys[i]];
  }
  saveState(st);
}
