/**
 * Orientation helpers — pure JS, no build.
 * Aligns with landscape one-screen goals (Math Lab / reader chrome).
 * @module orientation-media
 */

/**
 * @returns {'portrait' | 'landscape'}
 */
export function getOrientation() {
  if (typeof window === 'undefined') return 'portrait';
  const w = window.innerWidth || 0;
  const h = window.innerHeight || 0;
  return w >= h ? 'landscape' : 'portrait';
}

/**
 * Prefer matchMedia when available.
 * @returns {boolean}
 */
export function isLandscape() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia) {
    try {
      if (window.matchMedia('(orientation: landscape)').matches) return true;
      if (window.matchMedia('(orientation: portrait)').matches) return false;
    } catch (_) {
      /* fall through */
    }
  }
  return getOrientation() === 'landscape';
}

/**
 * Subscribe to orientation / resize changes.
 * @param {(orient: 'portrait' | 'landscape') => void} cb
 * @returns {() => void} unsubscribe
 */
export function onOrientationChange(cb) {
  if (typeof window === 'undefined' || typeof cb !== 'function') {
    return function () {};
  }
  let last = getOrientation();
  function fire() {
    const next = getOrientation();
    if (next !== last) {
      last = next;
      cb(next);
    }
  }
  window.addEventListener('resize', fire);
  window.addEventListener('orientationchange', fire);
  return function unsubscribe() {
    window.removeEventListener('resize', fire);
    window.removeEventListener('orientationchange', fire);
  };
}

/**
 * CSS class tokens for layout roots.
 */
export function orientationClass() {
  return isLandscape() ? 'is-landscape' : 'is-portrait';
}
