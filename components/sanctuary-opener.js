/**
 * Lightweight sanctuary opener — sync, no fetch, no animations required.
 * Safe for low-end tablets/phones.
 * @module sanctuary-opener
 */

import { pickMantra } from './sanctuary-mantra.js';
import { listRituals } from './ritual-todo.js';

/**
 * One object for first paint of “Rappels & Rituels”.
 * @param {'fr'|'en'} [lang]
 * @returns {{
 *   opener: string,
 *   mantra: { id: string, text: string },
 *   rituals: ReturnType<typeof listRituals>,
 *   moreHint: string,
 * }}
 */
export function openSanctuaryLite(lang) {
  const L = lang === 'en' ? 'en' : 'fr';
  return {
    opener:
      L === 'en'
        ? 'Here we remember who we are, why we go on, and how we care.'
        : 'Ici, on se souvient qui on est, pourquoi on avance, et comment on prend soin.',
    mantra: pickMantra(L),
    rituals: listRituals(L),
    moreHint:
      L === 'en'
        ? 'Want more? Open one ritual. Nothing is required.'
        : 'Envie d’aller plus loin ? Ouvre un rituel. Rien n’est obligatoire.',
  };
}
