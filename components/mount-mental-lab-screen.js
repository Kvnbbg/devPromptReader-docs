/**
 * Mount Math Lab mental-calc UI — light DOM, 44px targets, keyboard Enter.
 * @module mount-mental-lab-screen
 */

import { createMentalCalcSession } from './mental-calc-session.js';
import { recordMoneySlice } from './money-quest-progress.js';

/**
 * @param {HTMLElement} root
 * @param {{
 *   difficulty?: 'easy'|'medium'|'hard',
 *   lang?: 'fr'|'en',
 *   initialSeconds?: number,
 *   lives?: number,
 *   recordToMoneyQuest?: boolean,
 * }} [opts]
 */
export function mountMentalLabScreen(root, opts) {
  if (!root) {
    return { destroy: function () {}, getSession: function () { return null; } };
  }
  const o = opts || {};
  const lang = o.lang === 'en' ? 'en' : 'fr';
  const session = createMentalCalcSession({
    difficulty: o.difficulty || 'easy',
    lang: lang,
    initialSeconds: o.initialSeconds,
    lives: o.lives,
  });

  function esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function paint(feedback) {
    const ch = session.getChallenge();
    const st = session.getStats();
    const chrono = st.chronos || {};
    let html = '<section class="ts-mental-lab" style="max-width:24rem;width:100%;margin:0 auto;padding:1rem;box-sizing:border-box">';
    html +=
      '<h1 style="font-size:1.2rem;margin:0 0 0.5rem">' +
      (lang === 'en' ? 'Math Lab — mental calc' : 'Math Lab — calcul mental') +
      '</h1>';
    html +=
      '<p style="margin:0 0 0.75rem;font-size:0.9rem">' +
      (lang === 'en' ? 'Score' : 'Score') +
      ': <strong>' +
      st.score +
      '</strong> · ' +
      (lang === 'en' ? 'Streak' : 'Série') +
      ': ' +
      st.streak +
      ' · ' +
      (lang === 'en' ? 'Lives' : 'Vies') +
      ': ' +
      (chrono.lives != null ? chrono.lives : '—') +
      '</p>';
    if (feedback) {
      html +=
        '<p role="status" style="margin:0 0 0.75rem">' +
        esc(feedback) +
        '</p>';
    }
    html +=
      '<p style="font-size:1.5rem;font-weight:600;margin:0 0 1rem" id="ts-mc-prompt">' +
      esc(lang === 'en' ? ch.prompt : ch.promptFr) +
      '</p>';
    html +=
      '<label style="display:block;margin-bottom:0.75rem">' +
      (lang === 'en' ? 'Your answer' : 'Ta réponse') +
      '<input id="ts-mc-input" type="text" inputmode="numeric" autocomplete="off" ' +
      'style="display:block;width:100%;min-height:48px;margin-top:0.35rem;font-size:1.25rem;box-sizing:border-box;padding:0.5rem" />' +
      '</label>';
    html +=
      '<button type="button" data-action="submit" style="min-height:48px;min-width:48px;padding:0.6rem 1.2rem;font-size:1rem;margin-right:0.5rem">' +
      (lang === 'en' ? 'Check' : 'Valider') +
      '</button>';
    html +=
      '<button type="button" data-action="skip" style="min-height:48px;padding:0.6rem 1rem">' +
      (lang === 'en' ? 'Skip' : 'Passer') +
      '</button>';
    html += '</section>';
    root.innerHTML = html;
    const input = root.querySelector('#ts-mc-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          doSubmit();
        }
      });
    }
  }

  function doSubmit() {
    const input = root.querySelector('#ts-mc-input');
    const val = input ? input.value : '';
    const result = session.submit(val);
    if (o.recordToMoneyQuest) {
      recordMoneySlice({
        sliceId: 'mental_' + Date.now(),
        pointsDelta: result.correct ? 1 : 0,
        success: result.correct,
        seconds: 0,
      });
    }
    const fb = result.correct
      ? lang === 'en'
        ? 'Correct!'
        : 'Juste !'
      : lang === 'en'
        ? 'Answer was ' + result.expected
        : 'C’était ' + result.expected;
    paint(fb);
  }

  function onClick(e) {
    const t = e.target;
    if (!t || !t.getAttribute) return;
    const a = t.getAttribute('data-action');
    if (a === 'submit') doSubmit();
    if (a === 'skip') {
      session.skip();
      paint(lang === 'en' ? 'Skipped' : 'Passé');
    }
  }

  paint(null);
  root.addEventListener('click', onClick);

  return {
    getSession: function () {
      return session;
    },
    destroy: function () {
      root.removeEventListener('click', onClick);
      root.innerHTML = '';
    },
  };
}
