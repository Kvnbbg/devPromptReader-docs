/**
 * TikTok-like continuous vertical scroll for document reader.
 * Pure JS, no dependencies. Pair with touch-swipe for manual override.
 * @module reader-auto-scroll
 */

/**
 * @param {HTMLElement} container scrollable element
 * @param {{
 *   speedPxPerSec?: number,
 *   onEnd?: () => void,
 *   onTick?: (y: number) => void,
 * }} [opts]
 */
export function createAutoScroll(container, opts) {
  const o = opts || {};
  let speed = o.speedPxPerSec != null ? o.speedPxPerSec : 40;
  let raf = null;
  let lastTs = 0;
  let running = false;
  let paused = false;

  function frame(ts) {
    if (!running || paused) return;
    if (!lastTs) lastTs = ts;
    const dt = Math.min(0.05, (ts - lastTs) / 1000);
    lastTs = ts;
    if (container && typeof container.scrollTop === 'number') {
      container.scrollTop += speed * dt;
      if (typeof o.onTick === 'function') o.onTick(container.scrollTop);
      const max = container.scrollHeight - container.clientHeight;
      if (max > 0 && container.scrollTop >= max - 1) {
        running = false;
        raf = null;
        if (typeof o.onEnd === 'function') o.onEnd();
        return;
      }
    }
    raf = requestAnimationFrame(frame);
  }

  return {
    start: function () {
      if (running) return;
      running = true;
      paused = false;
      lastTs = 0;
      raf = requestAnimationFrame(frame);
    },
    pause: function () {
      paused = true;
      lastTs = 0;
    },
    resume: function () {
      if (!running) return;
      paused = false;
      lastTs = 0;
      raf = requestAnimationFrame(frame);
    },
    stop: function () {
      running = false;
      paused = false;
      lastTs = 0;
      if (raf != null && typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(raf);
      }
      raf = null;
    },
    setSpeed: function (pxPerSec) {
      speed = Math.max(0, Number(pxPerSec) || 0);
    },
    getSpeed: function () {
      return speed;
    },
    isRunning: function () {
      return running && !paused;
    },
  };
}

/** Preset speeds for reader UI. */
export const SCROLL_PRESETS = {
  slow: 24,
  medium: 40,
  fast: 72,
  turbo: 110,
};
