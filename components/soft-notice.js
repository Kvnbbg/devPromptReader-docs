/**
 * SoftNoticeQueue — throttled, coalesced, skippable notices.
 * Spec: agents/notify/
 * @module soft-notice
 */

/**
 * @typedef {{ kind: string, text: string, priority?: number, payload?: unknown }} Notice
 */

/**
 * @param {{ minIntervalMs?: number, maxCooldownMs?: number }} [opts]
 */
export function createSoftNoticeQueue(opts) {
  const minIntervalMs = (opts && opts.minIntervalMs) || 5000;
  const maxCooldownMs = (opts && opts.maxCooldownMs) || 60 * 60 * 1000;

  /** @type {Notice[]} */
  let queue = [];
  /** @type {Notice | null} */
  let visible = null;
  let lastShownAt = 0;
  let cooldownMs = minIntervalMs;

  /**
   * @param {Notice} n
   */
  function coalesce(n) {
    const i = queue.findIndex(function (x) {
      return x.kind === n.kind;
    });
    if (i >= 0) queue[i] = n;
    else queue.push(n);
    queue.sort(function (a, b) {
      return (b.priority || 0) - (a.priority || 0);
    });
  }

  /**
   * @param {Notice} notice
   */
  function enqueue(notice) {
    if (!notice || typeof notice.kind !== 'string') return;
    const text = notice.text != null ? String(notice.text) : '';
    const n = {
      kind: notice.kind,
      text: text.slice(0, 500),
      priority: Number(notice.priority) || 0,
      payload: notice.payload,
    };
    if (n.priority >= 100 && !visible) {
      visible = n;
      lastShownAt = Date.now();
      return;
    }
    coalesce(n);
  }

  /**
   * @param {number} [now]
   * @returns {Notice | null}
   */
  function tick(now) {
    const t = now || Date.now();
    if (visible) return visible;
    if (t - lastShownAt < cooldownMs) return null;
    if (!queue.length) return null;
    visible = queue.shift() || null;
    lastShownAt = t;
    return visible;
  }

  function skip() {
    visible = null;
    cooldownMs = Math.min(maxCooldownMs, Math.max(minIntervalMs, cooldownMs * 2));
  }

  function dismiss() {
    visible = null;
    cooldownMs = minIntervalMs;
  }

  /** @returns {Notice | null} */
  function getVisible() {
    return visible;
  }

  function getQueueLength() {
    return queue.length;
  }

  return {
    enqueue: enqueue,
    tick: tick,
    skip: skip,
    dismiss: dismiss,
    getVisible: getVisible,
    getQueueLength: getQueueLength,
  };
}
