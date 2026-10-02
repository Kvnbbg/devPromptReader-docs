/**
 * High contrast + system prefers-contrast / prefers-color-scheme.
 * @module a11y-contrast
 */

const STYLE_ID = 'ts-a11y-contrast-css';

const CSS =
  '.ts-reader-root.theme-high-contrast{background:#000!important;color:#fff!important}' +
  '.ts-reader-root.theme-high-contrast a{color:#ffff00!important;text-decoration:underline}' +
  '.ts-reader-root.theme-high-contrast button,.ts-reader-root.theme-high-contrast .ts-search-input{' +
  'border:2px solid #fff!important;background:#000!important;color:#fff!important;min-height:48px}' +
  '.ts-focus-ring:focus-visible{outline:3px solid #ff0;outline-offset:3px}' +
  '@media(prefers-contrast:more){.ts-reader-root{border-color:currentColor}}';

export function ensureContrastStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * @param {HTMLElement} root
 * @param {boolean} on
 */
export function setHighContrast(root, on) {
  if (!root) return;
  ensureContrastStyles();
  root.classList.add('ts-reader-root');
  if (on) root.classList.add('theme-high-contrast');
  else root.classList.remove('theme-high-contrast');
}

export function systemPrefersMoreContrast() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  try {
    return window.matchMedia('(prefers-contrast: more)').matches;
  } catch (_) {
    return false;
  }
}
