/**
 * Lecteur reading themes — dark / blue / white / light screens + font size.
 * Pure class tokens on a root element. No build step.
 * @module reader-theme
 */

export const THEMES = ['white', 'light', 'dark', 'blue'];

const STYLE_ID = 'ts-reader-theme-css';

const CSS =
  '.ts-reader-root{transition:background-color .2s ease,color .2s ease}' +
  '.ts-reader-root.theme-white{background:#fff;color:#111}' +
  '.ts-reader-root.theme-light{background:#f4f1ea;color:#1a1a1a}' +
  '.ts-reader-root.theme-dark{background:#121417;color:#e8eaed}' +
  '.ts-reader-root.theme-blue{background:#0b1c2d;color:#d6e4f0}' +
  '.ts-reader-root[data-font-size="sm"]{font-size:14px;line-height:1.55}' +
  '.ts-reader-root[data-font-size="md"]{font-size:16px;line-height:1.6}' +
  '.ts-reader-root[data-font-size="lg"]{font-size:18px;line-height:1.65}' +
  '.ts-reader-root[data-font-size="xl"]{font-size:20px;line-height:1.7}' +
  '@media(prefers-color-scheme:dark){.ts-reader-root.theme-auto{background:#121417;color:#e8eaed}}' +
  '@media(prefers-color-scheme:light){.ts-reader-root.theme-auto{background:#fff;color:#111}}';

export function ensureReaderThemeStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * @param {HTMLElement} root
 * @param {{ theme?: string, fontSize?: 'sm'|'md'|'lg'|'xl' }} opts
 */
export function applyReaderTheme(root, opts) {
  if (!root) return { ok: false };
  ensureReaderThemeStyles();
  const o = opts || {};
  let theme = String(o.theme || 'white').toLowerCase();
  if (THEMES.indexOf(theme) === -1 && theme !== 'auto') theme = 'white';
  root.classList.add('ts-reader-root');
  for (let i = 0; i < THEMES.length; i++) {
    root.classList.remove('theme-' + THEMES[i]);
  }
  root.classList.remove('theme-auto');
  root.classList.add('theme-' + theme);
  const fs = o.fontSize || 'md';
  root.setAttribute('data-font-size', fs);
  return { ok: true, theme: theme, fontSize: fs };
}

export function cycleTheme(current) {
  const i = THEMES.indexOf(current);
  const next = THEMES[(i + 1) % THEMES.length];
  return next;
}
