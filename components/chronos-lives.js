/**
 * Chronos + gold-then-life rules. Spec: agents/game/01
 * @module chronos-lives
 */

/**
 * @param {{
 *   initialSeconds?: number,
 *   gold?: number,
 *   lives?: number,
 *   bonusOnCorrect?: number,
 * }} [opts]
 */
export function createChronosLives(opts) {
  const o = opts || {};
  let remaining = Math.max(0, o.initialSeconds != null ? o.initialSeconds : 60);
  let gold = Math.max(0, o.gold != null ? o.gold : 10);
  let lives = Math.max(0, o.lives != null ? o.lives : 3);
  const bonusOnCorrect = o.bonusOnCorrect != null ? o.bonusOnCorrect : 5;
  let running = false;
  let lastTick = 0;
  let shieldNext = false;

  function getState() {
    return {
      remaining: remaining,
      gold: gold,
      lives: lives,
      running: running,
      shieldNext: shieldNext,
    };
  }

  function start() {
    running = true;
    lastTick = Date.now();
  }

  function pause() {
    running = false;
  }

  /** @param {number} [now] */
  function tick(now) {
    if (!running) return getState();
    const t = now || Date.now();
    const dt = Math.max(0, (t - lastTick) / 1000);
    lastTick = t;
    remaining = Math.max(0, remaining - dt);
    if (remaining <= 0) running = false;
    return getState();
  }

  function onCorrect() {
    remaining += bonusOnCorrect;
    return getState();
  }

  /**
   * Wrong answer: gold first, then life. Shield skips life/gold once.
   * @param {number} [goldCost]
   */
  function onWrong(goldCost) {
    const cost = goldCost != null ? goldCost : 1;
    if (shieldNext) {
      shieldNext = false;
      return getState();
    }
    if (gold >= cost) {
      gold -= cost;
    } else {
      lives = Math.max(0, lives - 1);
    }
    return getState();
  }

  function armShield() {
    shieldNext = true;
  }

  /** @param {number} n */
  function addGold(n) {
    gold = Math.max(0, gold + (n || 0));
  }

  return {
    getState: getState,
    start: start,
    pause: pause,
    tick: tick,
    onCorrect: onCorrect,
    onWrong: onWrong,
    armShield: armShield,
    addGold: addGold,
  };
}
