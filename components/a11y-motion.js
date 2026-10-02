/**
 * Motion preferences — disable ripple/bounce/auto-scroll animations when reduced.
 * @module a11y-motion
 */

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (_) {
    return false;
  }
}

/**
 * Gate for search-bar-fx / auto-scroll decorations.
 * @param {() => void} fancy
 * @param {() => void} [plain]
 */
export function runWithMotionPreference(fancy, plain) {
  if (prefersReducedMotion()) {
    if (typeof plain === 'function') plain();
    return false;
  }
  if (typeof fancy === 'function') fancy();
  return true;
}
