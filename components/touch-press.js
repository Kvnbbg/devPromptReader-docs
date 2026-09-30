/**
 * Tap vs long-press without blocking scroll (passive down/move).
 * @module touch-press
 */

import { bindPressSurface } from './touch-listeners.js';

/**
 * @param {Element} el
 * @param {{
 *   longPressMs?: number,
 *   moveCancelPx?: number,
 *   onTap?: (e: Event) => void,
 *   onLongPress?: (e: Event) => void,
 * }} [opts]
 * @returns {() => void}
 */
export function attachPress(el, opts) {
  const o = opts || {};
  const longMs = o.longPressMs != null ? o.longPressMs : 450;
  const moveCancel = o.moveCancelPx != null ? o.moveCancelPx : 12;
  let timer = null;
  let startX = 0;
  let startY = 0;
  let longFired = false;
  let active = false;

  function clearTimer() {
    if (timer != null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function coords(e) {
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX || 0, y: e.clientY || 0 };
  }

  function onDown(e) {
    active = true;
    longFired = false;
    const c = coords(e);
    startX = c.x;
    startY = c.y;
    clearTimer();
    timer = setTimeout(function () {
      longFired = true;
      if (typeof o.onLongPress === 'function') o.onLongPress(e);
    }, longMs);
  }

  function onMove(e) {
    if (!active) return;
    const c = coords(e);
    if (
      Math.abs(c.x - startX) > moveCancel ||
      Math.abs(c.y - startY) > moveCancel
    ) {
      clearTimer();
    }
  }

  function onUp(e) {
    if (!active) return;
    active = false;
    clearTimer();
    if (!longFired && typeof o.onTap === 'function') o.onTap(e);
  }

  return bindPressSurface(el, {
    onDown: onDown,
    onMove: onMove,
    onUp: onUp,
    passiveMove: true,
  });
}
