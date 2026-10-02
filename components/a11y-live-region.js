/**
 * Polite/assertive live regions — throttle to avoid SR spam.
 * @module a11y-live-region
 */

const POLITE_ID = 'ts-a11y-live-polite';
const ASSERTIVE_ID = 'ts-a11y-live-assertive';

function ensure(id, politeness) {
  if (typeof document === 'undefined') return null;
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', politeness);
    el.setAttribute('aria-atomic', 'true');
    el.className = 'ts-sr-only';
    el.style.cssText =
      'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;';
    document.body.appendChild(el);
  }
  return el;
}

let lastText = '';
let lastAt = 0;

/**
 * @param {string} message
 * @param {{ assertive?: boolean, minIntervalMs?: number }} [opts]
 */
export function announce(message, opts) {
  const o = opts || {};
  const text = String(message || '').trim().slice(0, 200);
  if (!text) return;
  const min = o.minIntervalMs != null ? o.minIntervalMs : 1200;
  const now = Date.now();
  if (text === lastText && now - lastAt < min) return;
  lastText = text;
  lastAt = now;
  const el = ensure(o.assertive ? ASSERTIVE_ID : POLITE_ID, o.assertive ? 'assertive' : 'polite');
  if (!el) return;
  el.textContent = '';
  setTimeout(function () {
    el.textContent = text;
  }, 20);
}
