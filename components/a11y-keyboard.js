/**
 * Lecteur keyboard map + skip link helper (tetraplegia / switch).
 * @module a11y-keyboard
 */

/**
 * Default Lecteur shortcuts (document in UI).
 */
export const LECTEUR_KEYS = {
  next: ['ArrowRight', 'PageDown', 'j'],
  prev: ['ArrowLeft', 'PageUp', 'k'],
  pauseScroll: [' ', 'Spacebar'],
  theme: ['t'],
  search: ['/'],
};

/**
 * @param {HTMLElement} root
 * @param {{
 *   onNext?: () => void,
 *   onPrev?: () => void,
 *   onPauseScroll?: () => void,
 *   onTheme?: () => void,
 *   onSearch?: () => void,
 * }} handlers
 * @returns {() => void}
 */
export function bindLecteurKeys(root, handlers) {
  const h = handlers || {};
  function onKey(e) {
    if (!e || e.altKey || e.ctrlKey || e.metaKey) return;
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    const k = e.key;
    if (LECTEUR_KEYS.next.indexOf(k) !== -1 && h.onNext) {
      e.preventDefault();
      h.onNext();
    } else if (LECTEUR_KEYS.prev.indexOf(k) !== -1 && h.onPrev) {
      e.preventDefault();
      h.onPrev();
    } else if ((k === ' ' || k === 'Spacebar') && h.onPauseScroll) {
      e.preventDefault();
      h.onPauseScroll();
    } else if (k === 't' && h.onTheme) {
      h.onTheme();
    } else if (k === '/' && h.onSearch) {
      e.preventDefault();
      h.onSearch();
    }
  }
  const el = root || (typeof document !== 'undefined' ? document : null);
  if (!el) return function () {};
  el.addEventListener('keydown', onKey);
  return function () {
    el.removeEventListener('keydown', onKey);
  };
}

/**
 * Insert skip link as first focusable in body.
 * @param {string} targetId id of main content
 * @param {string} [label]
 */
export function ensureSkipLink(targetId, label) {
  if (typeof document === 'undefined') return;
  const id = 'ts-skip-to-content';
  if (document.getElementById(id)) return;
  const a = document.createElement('a');
  a.id = id;
  a.href = '#' + String(targetId || 'main').replace(/^#/, '');
  a.textContent = label || 'Aller au contenu';
  a.className = 'ts-skip-link';
  a.style.cssText =
    'position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;z-index:10000';
  a.addEventListener('focus', function () {
    a.style.left = '8px';
    a.style.top = '8px';
    a.style.width = 'auto';
    a.style.height = 'auto';
    a.style.padding = '12px 16px';
    a.style.background = '#000';
    a.style.color = '#fff';
  });
  a.addEventListener('blur', function () {
    a.style.left = '-9999px';
    a.style.width = '1px';
    a.style.height = '1px';
    a.style.padding = '0';
  });
  document.body.insertBefore(a, document.body.firstChild);
}
