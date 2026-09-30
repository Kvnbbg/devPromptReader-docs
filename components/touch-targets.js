/**
 * Touch target helpers — min 44×44 CSS px (mobile primary).
 * @module touch-targets
 */

export const MIN_TOUCH_PX = 44;

/**
 * @param {Element | null | undefined} el
 * @returns {{ ok: boolean, width: number, height: number }}
 */
export function measureTouchTarget(el) {
  if (!el || typeof el.getBoundingClientRect !== 'function') {
    return { ok: false, width: 0, height: 0 };
  }
  const r = el.getBoundingClientRect();
  const width = r.width || 0;
  const height = r.height || 0;
  return {
    ok: width >= MIN_TOUCH_PX && height >= MIN_TOUCH_PX,
    width: width,
    height: height,
  };
}

/**
 * Apply inline min size if below threshold (non-destructive to layout if already larger).
 * @param {HTMLElement | null | undefined} el
 */
export function ensureMinTouchSize(el) {
  if (!el || !el.style) return;
  const m = measureTouchTarget(el);
  if (m.width < MIN_TOUCH_PX) {
    el.style.minWidth = MIN_TOUCH_PX + 'px';
  }
  if (m.height < MIN_TOUCH_PX) {
    el.style.minHeight = MIN_TOUCH_PX + 'px';
  }
}

/**
 * Query interactive elements and return those below min size.
 * @param {ParentNode} [root]
 * @returns {Element[]}
 */
export function findSmallTouchTargets(root) {
  const scope = root || (typeof document !== 'undefined' ? document : null);
  if (!scope || !scope.querySelectorAll) return [];
  const sel = 'button, a, [role="button"], input, select, textarea, summary';
  const nodes = scope.querySelectorAll(sel);
  const bad = [];
  for (let i = 0; i < nodes.length; i++) {
    if (!measureTouchTarget(nodes[i]).ok) bad.push(nodes[i]);
  }
  return bad;
}
