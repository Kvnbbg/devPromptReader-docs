/**
 * Horizontal / vertical swipe detection for reader & carousels.
 * Does not call preventDefault unless opts.preventScroll is true (then passive: false).
 * @module touch-swipe
 */

import { bindPressSurface } from './touch-listeners.js';

/**
 * @param {Event} e
 * @returns {{ x: number, y: number } | null}
 */
function pointFromEvent(e) {
  if (!e) return null;
  if (e.touches && e.touches.length) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  if (e.changedTouches && e.changedTouches.length) {
    return {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };
  }
  if (typeof e.clientX === 'number') {
    return { x: e.clientX, y: e.clientY };
  }
  return null;
}

/**
 * @param {Element} el
 * @param {{
 *   thresholdPx?: number,
 *   onSwipe?: (dir: 'left'|'right'|'up'|'down', detail: object) => void,
 *   axis?: 'horizontal' | 'vertical' | 'both',
 * }} [opts]
 * @returns {() => void} destroy
 */
export function attachSwipe(el, opts) {
  const o = opts || {};
  const threshold = o.thresholdPx != null ? o.thresholdPx : 40;
  const axis = o.axis || 'both';
  let start = null;
  let startT = 0;

  function onDown(e) {
    start = pointFromEvent(e);
    startT = Date.now();
  }

  function onUp(e) {
    if (!start) return;
    const end = pointFromEvent(e);
    if (!end) {
      start = null;
      return;
    }
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);
    const dt = Date.now() - startT;
    start = null;

    if (adx < threshold && ady < threshold) return;

    let dir = null;
    if (axis === 'horizontal' || (axis === 'both' && adx >= ady)) {
      if (adx >= threshold) dir = dx < 0 ? 'left' : 'right';
    }
    if (!dir && (axis === 'vertical' || (axis === 'both' && ady > adx))) {
      if (ady >= threshold) dir = dy < 0 ? 'up' : 'down';
    }
    if (dir && typeof o.onSwipe === 'function') {
      o.onSwipe(dir, { dx: dx, dy: dy, dt: dt });
    }
  }

  return bindPressSurface(el, {
    onDown: onDown,
    onUp: onUp,
    passiveMove: true,
  });
}
