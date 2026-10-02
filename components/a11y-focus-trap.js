/**
 * Focus trap for dialogs — keyboard / switch users.
 * @module a11y-focus-trap
 */

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * @param {HTMLElement} container
 * @returns {() => void} release
 */
export function trapFocus(container) {
  if (!container || typeof document === 'undefined') return function () {};
  const previously = document.activeElement;

  function list() {
    return Array.prototype.slice.call(container.querySelectorAll(FOCUSABLE)).filter(function (el) {
      return el.offsetParent !== null || el === document.activeElement;
    });
  }

  function onKey(e) {
    if (e.key !== 'Tab') return;
    const items = list();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  container.addEventListener('keydown', onKey);
  const items = list();
  if (items[0]) items[0].focus();

  return function release() {
    container.removeEventListener('keydown', onKey);
    if (previously && previously.focus) {
      try {
        previously.focus();
      } catch (_) {}
    }
  };
}
