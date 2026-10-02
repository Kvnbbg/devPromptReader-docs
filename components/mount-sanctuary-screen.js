/**
 * Mount a single “Rappels & Rituels” screen — minimal DOM, low-end safe.
 * Recover wizard loads only when user requests “Plus”.
 * No framework, no animation required.
 * @module mount-sanctuary-screen
 */

import { openSanctuaryLite } from './sanctuary-opener.js';
import { setRitualItemDone, listRituals } from './ritual-todo.js';
import { createRecoverSession } from './recover-heal.js';
import { announce } from './a11y-live-region.js';

/**
 * @param {HTMLElement} root
 * @param {{ lang?: 'fr'|'en' }} [opts]
 * @returns {{ destroy: () => void, refresh: () => void }}
 */
export function mountSanctuaryScreen(root, opts) {
  if (!root) {
    return { destroy: function () {}, refresh: function () {} };
  }
  const lang = opts && opts.lang === 'en' ? 'en' : 'fr';
  let recoverPanel = null;
  let rh = null;

  function esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render() {
    const view = openSanctuaryLite(lang);
    let html = '';
    html += '<section class="ts-sanctuary" style="max-width:36rem;width:100%;margin:0 auto;padding:1rem;box-sizing:border-box">';
    html += '<h1 style="font-size:1.25rem;line-height:1.35;margin:0 0 0.75rem">' +
      (lang === 'en' ? 'Reminders & rituals' : 'Rappels & rituels') +
      '</h1>';
    html += '<p style="margin:0 0 1rem;line-height:1.5">' + esc(view.opener) + '</p>';
    html += '<p role="status" style="margin:0 0 1.25rem;padding:0.75rem 1rem;border-radius:0.5rem;border:1px solid #ccc;line-height:1.45"><strong>' +
      (lang === 'en' ? 'Today' : 'Aujourd’hui') +
      ' — </strong>' + esc(view.mantra.text) + '</p>';

    for (let i = 0; i < view.rituals.length; i++) {
      const r = view.rituals[i];
      html += '<div data-ritual="' + esc(r.id) + '" style="margin-bottom:1.25rem">';
      html += '<h2 style="font-size:1.05rem;margin:0 0 0.5rem">' + esc(r.label) + '</h2>';
      html += '<ul style="list-style:none;padding:0;margin:0">';
      for (let j = 0; j < r.items.length; j++) {
        const it = r.items[j];
        const id = 'rit-' + r.id + '-' + j;
        html +=
          '<li style="margin:0 0 0.5rem">' +
          '<label style="display:flex;gap:0.6rem;align-items:flex-start;min-height:44px;cursor:pointer">' +
          '<input type="checkbox" data-ritual-id="' +
          esc(r.id) +
          '" data-item-index="' +
          j +
          '" id="' +
          id +
          '" ' +
          (it.done ? 'checked ' : '') +
          'style="width:22px;height:22px;margin-top:0.15rem;flex-shrink:0" />' +
          '<span>' +
          esc(it.text) +
          '</span></label></li>';
      }
      html += '</ul></div>';
    }

    html +=
      '<p style="margin:1rem 0 0.75rem;font-size:0.95rem;opacity:0.9">' +
      esc(view.moreHint) +
      '</p>';
    html +=
      '<button type="button" data-action="more-recover" style="min-height:48px;min-width:48px;padding:0.6rem 1rem;font-size:1rem">' +
      (lang === 'en' ? 'Recover & heal (optional)' : 'Recover & heal (optionnel)') +
      '</button>';
    html += '<div data-recover-slot style="margin-top:1rem"></div>';
    html += '</section>';

    root.innerHTML = html;
  }

  function onClick(e) {
    const t = e.target;
    if (!t) return;
    if (t.getAttribute && t.getAttribute('data-action') === 'more-recover') {
      openRecover();
      return;
    }
    if (t.getAttribute && t.getAttribute('data-action') === 'rh-next' && rh) {
      const step = rh.next();
      paintRecover();
      announce(step);
      return;
    }
    if (t.getAttribute && t.getAttribute('data-action') === 'rh-complete' && rh) {
      rh.complete();
      if (recoverPanel) recoverPanel.innerHTML =
        '<p>' + (lang === 'en' ? 'Saved on this device only.' : 'Enregistré sur cet appareil seulement.') + '</p>';
      return;
    }
  }

  function onChange(e) {
    const t = e.target;
    if (!t || t.type !== 'checkbox') return;
    const rid = t.getAttribute('data-ritual-id');
    const idx = parseInt(t.getAttribute('data-item-index'), 10);
    if (!rid || isNaN(idx)) return;
    setRitualItemDone(rid, idx, t.checked);
    announce(lang === 'en' ? (t.checked ? 'Done' : 'Undone') : t.checked ? 'Fait' : 'Annulé');
  }

  function openRecover() {
    recoverPanel = root.querySelector('[data-recover-slot]');
    if (!recoverPanel) return;
    rh = createRecoverSession(lang);
    paintRecover();
  }

  function paintRecover() {
    if (!recoverPanel || !rh) return;
    const step = rh.getStep();
    let h = '<div style="border:1px solid #ccc;border-radius:0.5rem;padding:0.75rem">';
    h += '<p><strong>Étape : ' + esc(step) + '</strong></p>';
    if (step === 'recognize') {
      h +=
        '<label>' +
        (lang === 'en' ? 'I feel…' : 'Je me sens…') +
        '<input data-rh-feeling type="text" style="display:block;width:100%;min-height:44px;margin-top:0.35rem;box-sizing:border-box" /></label>';
    }
    if (step === 'write') {
      h +=
        '<label>' +
        (lang === 'en' ? 'What triggered it?' : 'Qu’est-ce qui a déclenché ?') +
        '<textarea data-rh-trigger style="display:block;width:100%;min-height:88px;margin-top:0.35rem;box-sizing:border-box"></textarea></label>';
    }
    if (step === 'close') {
      h +=
        '<button type="button" data-action="rh-complete" style="min-height:48px;margin-top:0.5rem">' +
        (lang === 'en' ? 'I choose myself — save' : 'Je me choisis — enregistrer') +
        '</button>';
    } else {
      h +=
        '<button type="button" data-action="rh-next" style="min-height:48px;margin-top:0.5rem">' +
        (lang === 'en' ? 'Next' : 'Suivant') +
        '</button>';
    }
    h += '</div>';
    recoverPanel.innerHTML = h;
    const feel = recoverPanel.querySelector('[data-rh-feeling]');
    if (feel) {
      feel.addEventListener('change', function () {
        rh.setFeeling(feel.value);
      });
    }
    const trig = recoverPanel.querySelector('[data-rh-trigger]');
    if (trig) {
      trig.addEventListener('change', function () {
        rh.setTrigger(trig.value);
      });
    }
  }

  render();
  root.addEventListener('click', onClick);
  root.addEventListener('change', onChange);

  return {
    refresh: function () {
      render();
    },
    destroy: function () {
      root.removeEventListener('click', onClick);
      root.removeEventListener('change', onChange);
      root.innerHTML = '';
      rh = null;
    },
  };
}
