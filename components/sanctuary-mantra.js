/**
 * Daily mantra picker — local, no network required.
 * Embeds fallback data if JSON not fetched.
 * @module sanctuary-mantra
 */

import { readJson, writeJson } from './safe-storage.js';

const FALLBACK = [
  { id: 'm1', fr: 'On avance doucement, mais on avance.', en: 'We move gently, but we move.' },
  { id: 'm2', fr: 'On se choisit, encore.', en: 'We choose ourselves, again.' },
  { id: 'm3', fr: 'On ne force pas ; on suit le courant.', en: 'We do not force; we follow the current.' },
  { id: 'm4', fr: 'Ralentir, c’est parfois durer.', en: 'Slowing down is sometimes how we last.' },
  { id: 'm5', fr: 'On reste fidèles à nos origines.', en: 'We stay true to our origins.' },
  { id: 'm6', fr: 'Un geste local, un geste doux.', en: 'One local act, one gentle act.' },
  { id: 'm7', fr: 'Recover & heal : on a le droit de se soigner.', en: 'Recover and heal: we are allowed to care for ourselves.' },
];

const DAY_KEY = 'ts_mantra_day_v1';

/**
 * @param {'fr'|'en'} [lang]
 * @param {typeof FALLBACK} [list]
 */
export function pickMantra(lang, list) {
  const items = list && list.length ? list : FALLBACK;
  const day = new Date().toISOString().slice(0, 10);
  const saved = readJson(DAY_KEY, null);
  if (saved && saved.day === day && saved.id) {
    const found = items.filter(function (m) {
      return m.id === saved.id;
    })[0];
    if (found) return formatMantra(found, lang);
  }
  const idx = Math.floor(Math.random() * items.length);
  const m = items[idx];
  writeJson(DAY_KEY, { day: day, id: m.id });
  return formatMantra(m, lang);
}

function formatMantra(m, lang) {
  return {
    id: m.id,
    text: lang === 'en' ? m.en : m.fr,
  };
}

export function listMantras() {
  return FALLBACK.slice();
}
