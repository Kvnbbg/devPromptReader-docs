/**
 * Map keyboard / external switch events to sequential nav.
 * 1-switch: same key cycles then long-press or second timing selects
 * 2-switch: key A = next, key B = select
 * Head switches often emulate Space / Enter / digits.
 * @module switch-keys
 */

/**
 * @param {{
 *   seq: { next: () => void, select: () => void, prev?: () => void },
 *   mode?: 'two' | 'one',
 *   nextKey?: string,
 *   selectKey?: string,
 *   oneKey?: string,
 *   longPressMs?: number,
 *   target?: EventTarget,
 * }} opts
 * @returns {() => void} destroy
 */
export function bindSwitchKeys(opts) {
  const o = opts || {};
  const seq = o.seq;
  if (!seq || typeof seq.next !== 'function') return function () {};

  const mode = o.mode === 'one' ? 'one' : 'two';
  const nextKey = o.nextKey || 'Space';
  const selectKey = o.selectKey || 'Enter';
  const oneKey = o.oneKey || 'Space';
  const longMs = o.longPressMs != null ? o.longPressMs : 700;
  const target = o.target || (typeof document !== 'undefined' ? document : null);
  if (!target) return function () {};

  let pressTimer = null;
  let longFired = false;

  function code(e) {
    if (e.code) return e.code;
    if (e.key === ' ') return 'Space';
    return e.key;
  }

  function clear() {
    if (pressTimer != null) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
  }

  function onDown(e) {
    const c = code(e);
    if (mode === 'two') {
      if (c === nextKey || c === 'Space') {
        e.preventDefault();
        seq.next();
      } else if (c === selectKey || c === 'Enter') {
        e.preventDefault();
        seq.select();
      }
      return;
    }
    // one-switch: short = next, long = select
    if (c !== oneKey && c !== 'Space') return;
    e.preventDefault();
    longFired = false;
    clear();
    pressTimer = setTimeout(function () {
      longFired = true;
      seq.select();
    }, longMs);
  }

  function onUp(e) {
    if (mode !== 'one') return;
    const c = code(e);
    if (c !== oneKey && c !== 'Space') return;
    if (!longFired) {
      clear();
      seq.next();
    }
    clear();
  }

  target.addEventListener('keydown', onDown);
  target.addEventListener('keyup', onUp);

  return function destroy() {
    clear();
    target.removeEventListener('keydown', onDown);
    target.removeEventListener('keyup', onUp);
  };
}
