/**
 * Gaze / dwell friendly defaults — large targets, no hover-only actions.
 * Works with OS eye-control cursors that synthesize clicks.
 * @module gaze-friendly
 */

export const GAZE_MIN_PX = 48;
export const DEFAULT_DWELL_MS = 1000;

/**
 * Enlarge interactive controls under root for gaze/switch.
 * @param {ParentNode} root
 */
export function enlargeTargetsForGaze(root) {
  const scope = root || (typeof document !== 'undefined' ? document : null);
  if (!scope || !scope.querySelectorAll) return 0;
  const nodes = scope.querySelectorAll(
    'button, a, [role="button"], input, select, summary, [data-seq]'
  );
  let n = 0;
  for (let i = 0; i < nodes.length; i++) {
    const el = nodes[i];
    if (!el.style) continue;
    el.style.minWidth = GAZE_MIN_PX + 'px';
    el.style.minHeight = GAZE_MIN_PX + 'px';
    n++;
  }
  return n;
}

/**
 * Dwell activation: stay over element for dwellMs → callback.
 * Useful when eye software cannot click but can move pointer.
 * @param {HTMLElement} el
 * @param {() => void} onDwell
 * @param {{ dwellMs?: number }} [opts]
 * @returns {() => void}
 */
export function attachDwell(el, onDwell, opts) {
  const dwellMs = (opts && opts.dwellMs) || DEFAULT_DWELL_MS;
  let timer = null;

  function clear() {
    if (timer != null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function onEnter() {
    clear();
    timer = setTimeout(function () {
      if (typeof onDwell === 'function') onDwell();
    }, dwellMs);
  }

  el.addEventListener('pointerenter', onEnter);
  el.addEventListener('pointerleave', clear);
  el.addEventListener('blur', clear);

  return function destroy() {
    clear();
    el.removeEventListener('pointerenter', onEnter);
    el.removeEventListener('pointerleave', clear);
    el.removeEventListener('blur', clear);
  };
}
