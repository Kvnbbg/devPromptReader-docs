/**
 * Sequential scan navigation for 1–2 switch / head-switch users.
 * Highlights candidates in order; "select" activates focused item.
 * @module sequential-nav
 */

const STYLE_ID = 'ts-seq-nav-css';

function ensureCss() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent =
    '.ts-seq-highlight{outline:4px solid #ff0!important;outline-offset:4px;' +
    'box-shadow:0 0 0 8px rgba(0,0,0,.45)!important;z-index:9999}' +
    '.ts-seq-highlight{min-width:48px;min-height:48px}';
  document.head.appendChild(s);
}

/**
 * @param {ParentNode} root
 * @param {string} [selector]
 * @returns {HTMLElement[]}
 */
export function collectActionables(root, selector) {
  const sel =
    selector ||
    'button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[role="button"],[data-seq]';
  const scope = root || document;
  if (!scope.querySelectorAll) return [];
  return Array.prototype.slice.call(scope.querySelectorAll(sel)).filter(function (el) {
    const st = window.getComputedStyle ? window.getComputedStyle(el) : null;
    if (st && (st.visibility === 'hidden' || st.display === 'none')) return false;
    return true;
  });
}

/**
 * @param {{
 *   root?: ParentNode,
 *   selector?: string,
 *   onActivate?: (el: HTMLElement) => void,
 *   announce?: (msg: string) => void,
 *   lang?: 'fr'|'en',
 * }} [opts]
 */
export function createSequentialNav(opts) {
  const o = opts || {};
  ensureCss();
  let items = [];
  let index = -1;
  let current = null;

  function refresh() {
    items = collectActionables(o.root || document, o.selector);
    if (index >= items.length) index = items.length - 1;
  }

  function clearHighlight() {
    if (current) current.classList.remove('ts-seq-highlight');
    current = null;
  }

  function highlight(i) {
    clearHighlight();
    if (i < 0 || i >= items.length) return;
    current = items[i];
    current.classList.add('ts-seq-highlight');
    if (current.scrollIntoView) {
      current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    try {
      current.focus({ preventScroll: true });
    } catch (_) {
      try {
        current.focus();
      } catch (__) {}
    }
    const name =
      current.getAttribute('aria-label') ||
      current.textContent ||
      current.getAttribute('title') ||
      'élément';
    if (typeof o.announce === 'function') {
      o.announce(String(name).trim().slice(0, 80));
    }
  }

  return {
    refresh: refresh,
    next: function () {
      refresh();
      if (!items.length) return;
      index = (index + 1) % items.length;
      highlight(index);
    },
    prev: function () {
      refresh();
      if (!items.length) return;
      index = (index - 1 + items.length) % items.length;
      highlight(index);
    },
    select: function () {
      refresh();
      if (index < 0 || !items[index]) return;
      const el = items[index];
      if (typeof o.onActivate === 'function') o.onActivate(el);
      else if (typeof el.click === 'function') el.click();
    },
    destroy: function () {
      clearHighlight();
      items = [];
      index = -1;
    },
  };
}
