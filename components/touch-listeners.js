/**
 * Safe touch / pointer listeners — prefer passive for scroll performance.
 * @module touch-listeners
 */

/**
 * @param {EventTarget} target
 * @param {string} type
 * @param {EventListenerOrEventListenerObject} handler
 * @param {{ passive?: boolean, capture?: boolean }} [opts]
 * @returns {() => void} remove function
 */
export function addPointerListener(target, type, handler, opts) {
  if (!target || !target.addEventListener) return function () {};
  const o = opts || {};
  const passive = o.passive !== false;
  const capture = !!o.capture;
  const options = { passive: passive, capture: capture };
  target.addEventListener(type, handler, options);
  return function remove() {
    target.removeEventListener(type, handler, options);
  };
}

/**
 * Bind both pointer and touch fallbacks where needed.
 * Uses pointer events when available.
 * @param {EventTarget} target
 * @param {{
 *   onDown?: (e: Event) => void,
 *   onMove?: (e: Event) => void,
 *   onUp?: (e: Event) => void,
 *   passiveMove?: boolean,
 * }} handlers
 * @returns {() => void}
 */
export function bindPressSurface(target, handlers) {
  const h = handlers || {};
  const removes = [];
  const hasPointer =
    typeof window !== 'undefined' && 'PointerEvent' in window;

  if (hasPointer) {
    if (h.onDown) {
      removes.push(
        addPointerListener(target, 'pointerdown', h.onDown, { passive: true })
      );
    }
    if (h.onMove) {
      removes.push(
        addPointerListener(target, 'pointermove', h.onMove, {
          passive: h.passiveMove !== false,
        })
      );
    }
    if (h.onUp) {
      removes.push(
        addPointerListener(target, 'pointerup', h.onUp, { passive: true })
      );
      removes.push(
        addPointerListener(target, 'pointercancel', h.onUp, { passive: true })
      );
    }
  } else {
    if (h.onDown) {
      removes.push(
        addPointerListener(target, 'touchstart', h.onDown, { passive: true })
      );
    }
    if (h.onMove) {
      removes.push(
        addPointerListener(target, 'touchmove', h.onMove, {
          passive: h.passiveMove !== false,
        })
      );
    }
    if (h.onUp) {
      removes.push(
        addPointerListener(target, 'touchend', h.onUp, { passive: true })
      );
      removes.push(
        addPointerListener(target, 'touchcancel', h.onUp, { passive: true })
      );
    }
  }

  return function unbind() {
    for (let i = 0; i < removes.length; i++) removes[i]();
  };
}
