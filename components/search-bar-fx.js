/**
 * Search bar UI: ripple + bounce feedback (CSS classes).
 * Works for in-app search AND decorative “Google / Bing style” bars (dry).
 * Does not contact Google or alter ranking — pure UX.
 * @module search-bar-fx
 */

const STYLE_ID = 'ts-search-bar-fx-css';

const CSS =
  '.ts-search-wrap{position:relative;display:block;width:100%;max-width:36rem}' +
  '.ts-search-wrap input.ts-search-input{width:100%;min-height:44px;box-sizing:border-box;' +
  'padding:0.65rem 1rem;border-radius:999px;border:1px solid #c5c9d2;font-size:16px;' +
  'outline:none;transition:box-shadow .2s ease,border-color .2s ease,transform .18s ease}' +
  '.ts-search-wrap input.ts-search-input:focus{border-color:#5b6cff;box-shadow:0 0 0 3px rgba(91,108,255,.25)}' +
  '.ts-search-wrap.is-bounce input.ts-search-input{animation:ts-search-bounce .45s ease}' +
  '@keyframes ts-search-bounce{0%{transform:scale(1)}30%{transform:scale(1.03)}60%{transform:scale(0.98)}100%{transform:scale(1)}}' +
  '.ts-ripple{position:absolute;border-radius:50%;transform:scale(0);background:rgba(91,108,255,.28);' +
  'pointer-events:none;animation:ts-ripple-anim .55s ease-out forwards}' +
  '@keyframes ts-ripple-anim{to{transform:scale(2.4);opacity:0}}' +
  '@media(prefers-reduced-motion:reduce){.ts-search-wrap.is-bounce input.ts-search-input{animation:none}' +
  '.ts-ripple{animation:none;opacity:0}}';

/** Inject stylesheet once. */
export function ensureSearchBarStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = CSS;
  document.head.appendChild(el);
}

/**
 * @param {HTMLElement} wrap container with position relative
 * @param {number} clientX
 * @param {number} clientY
 */
export function playRipple(wrap, clientX, clientY) {
  if (!wrap || typeof document === 'undefined') return;
  ensureSearchBarStyles();
  const rect = wrap.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 0.6;
  const span = document.createElement('span');
  span.className = 'ts-ripple';
  span.style.width = size + 'px';
  span.style.height = size + 'px';
  span.style.left = clientX - rect.left - size / 2 + 'px';
  span.style.top = clientY - rect.top - size / 2 + 'px';
  wrap.appendChild(span);
  setTimeout(function () {
    if (span.parentNode) span.parentNode.removeChild(span);
  }, 600);
}

/**
 * Brief bounce on the input (submit / focus success).
 * @param {HTMLElement} wrap
 */
export function playBounce(wrap) {
  if (!wrap) return;
  ensureSearchBarStyles();
  wrap.classList.remove('is-bounce');
  void wrap.offsetWidth;
  wrap.classList.add('is-bounce');
  setTimeout(function () {
    wrap.classList.remove('is-bounce');
  }, 480);
}

/**
 * Enhance an existing input[type=search|text] with ripple + bounce.
 * @param {HTMLInputElement} input
 * @param {{ onQuery?: (q: string) => void }} [opts]
 * @returns {() => void} destroy
 */
export function enhanceSearchBar(input, opts) {
  const o = opts || {};
  if (!input || !input.parentNode) return function () {};
  ensureSearchBarStyles();

  let wrap = input.closest('.ts-search-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'ts-search-wrap';
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);
  }
  input.classList.add('ts-search-input');
  if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
    input.setAttribute('aria-label', 'Search');
  }

  function onPointer(e) {
    const x = e.clientX != null ? e.clientX : 0;
    const y = e.clientY != null ? e.clientY : 0;
    playRipple(wrap, x, y);
  }

  function onKey(e) {
    if (e.key === 'Enter') {
      playBounce(wrap);
      if (typeof o.onQuery === 'function') o.onQuery(String(input.value || '').trim());
    }
  }

  input.addEventListener('pointerdown', onPointer, { passive: true });
  input.addEventListener('keydown', onKey);

  return function destroy() {
    input.removeEventListener('pointerdown', onPointer);
    input.removeEventListener('keydown', onKey);
  };
}
