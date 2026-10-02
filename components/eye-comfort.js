/**
 * Eye comfort for Lecteur — colorblind-friendly filters + comfort panel state.
 * Uses CSS filters on a root (not a medical diagnosis tool).
 * @module eye-comfort
 */

import { readJson, writeJson } from './safe-storage.js';
import { applyReaderTheme } from './reader-theme.js';
import { setHighContrast } from './a11y-contrast.js';
import { announce } from './a11y-live-region.js';

const KEY = 'ts_eye_comfort_v1';
const STYLE_ID = 'ts-eye-comfort-css';

/** Vision simulation / ease modes (approximate CSS filters). */
export const EYE_MODES = {
  none: { filter: 'none', labelFr: 'Normal', labelEn: 'Default' },
  soft: {
    filter: 'contrast(0.95) brightness(1.02)',
    labelFr: 'Doux',
    labelEn: 'Soft',
  },
  protanopia: {
    filter: 'url(#ts-cb-protanopia) saturate(0.9)',
    labelFr: 'Protanopie (approx.)',
    labelEn: 'Protanopia (approx.)',
  },
  deuteranopia: {
    filter: 'url(#ts-cb-deuteranopia) saturate(0.9)',
    labelFr: 'Deutéranopie (approx.)',
    labelEn: 'Deuteranopia (approx.)',
  },
  tritanopia: {
    filter: 'url(#ts-cb-tritanopia) saturate(0.95)',
    labelFr: 'Tritanopie (approx.)',
    labelEn: 'Tritanopia (approx.)',
  },
  grayscale: {
    filter: 'grayscale(1) contrast(1.05)',
    labelFr: 'Niveaux de gris',
    labelEn: 'Grayscale',
  },
};

const SVG_FILTERS =
  '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false">' +
  '<defs>' +
  '<filter id="ts-cb-protanopia"><feColorMatrix type="matrix" values="' +
  '0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0"/></filter>' +
  '<filter id="ts-cb-deuteranopia"><feColorMatrix type="matrix" values="' +
  '0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0"/></filter>' +
  '<filter id="ts-cb-tritanopia"><feColorMatrix type="matrix" values="' +
  '0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0"/></filter>' +
  '</defs></svg>';

export function ensureEyeComfortAssets() {
  if (typeof document === 'undefined') return;
  if (!document.getElementById('ts-cb-svg')) {
    const wrap = document.createElement('div');
    wrap.id = 'ts-cb-svg';
    wrap.innerHTML = SVG_FILTERS;
    document.body.appendChild(wrap);
  }
  if (!document.getElementById(STYLE_ID)) {
    const s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent =
      '.ts-eye-comfort-root{transition:filter .2s ease}' +
      '@media(prefers-reduced-motion:reduce){.ts-eye-comfort-root{transition:none}}';
    document.head.appendChild(s);
  }
}

export function defaultEyeComfort() {
  return {
    mode: 'none',
    theme: 'light',
    fontSize: 'md',
    highContrast: false,
  };
}

export function loadEyeComfort() {
  const d = readJson(KEY, null);
  return Object.assign(defaultEyeComfort(), d && typeof d === 'object' ? d : {});
}

export function saveEyeComfort(state) {
  writeJson(KEY, state || defaultEyeComfort());
}

/**
 * Apply eye mode filter + optional theme/contrast on reader root.
 * @param {HTMLElement} root
 * @param {ReturnType<typeof defaultEyeComfort>} [state]
 * @param {{ announce?: boolean, lang?: 'fr'|'en' }} [opts]
 */
export function applyEyeComfort(root, state, opts) {
  if (!root) return { ok: false };
  ensureEyeComfortAssets();
  const st = Object.assign(defaultEyeComfort(), state || loadEyeComfort());
  const mode = EYE_MODES[st.mode] ? st.mode : 'none';
  st.mode = mode;

  root.classList.add('ts-eye-comfort-root', 'ts-reader-root');
  root.style.filter = EYE_MODES[mode].filter;

  applyReaderTheme(root, { theme: st.theme, fontSize: st.fontSize });
  setHighContrast(root, !!st.highContrast);
  saveEyeComfort(st);

  const o = opts || {};
  if (o.announce !== false) {
    const label =
      o.lang === 'en' ? EYE_MODES[mode].labelEn : EYE_MODES[mode].labelFr;
    announce(o.lang === 'en' ? 'Display: ' + label : 'Affichage : ' + label);
  }
  return { ok: true, state: st };
}

/**
 * Cycle color mode only.
 * @param {HTMLElement} root
 */
export function cycleEyeMode(root) {
  const keys = Object.keys(EYE_MODES);
  const st = loadEyeComfort();
  const i = keys.indexOf(st.mode);
  st.mode = keys[(i + 1) % keys.length];
  return applyEyeComfort(root, st);
}
