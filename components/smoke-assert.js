/**
 * Tiny smoke checks — run in browser console or node with localStorage mock.
 * Does not throw on missing localStorage; reports results object.
 * @module smoke-assert
 */

import { createSoftNoticeQueue } from './soft-notice.js';
import { maybeGrantBooster, loadBoosters } from './boosters.js';
import { createChronosLives } from './chronos-lives.js';
import { createGameSession } from './integrate.js';
import { loadDashboard } from './dashboard-dry.js';
import { recordMoneySlice, loadMoneyQuest } from './money-quest-progress.js';

/**
 * @returns {{ ok: boolean, checks: Record<string, boolean>, errors: string[] }}
 */
export function runSmokeAssert() {
  const checks = {};
  const errors = [];

  function check(name, fn) {
    try {
      checks[name] = !!fn();
      if (!checks[name]) errors.push(name + ' returned falsy');
    } catch (e) {
      checks[name] = false;
      errors.push(name + ': ' + (e && e.message ? e.message : String(e)));
    }
  }

  check('softNotice', function () {
    const q = createSoftNoticeQueue({ minIntervalMs: 1 });
    q.enqueue({ kind: 't', text: 'hi', priority: 1 });
    return q.getQueueLength() >= 0;
  });

  check('chronos', function () {
    const c = createChronosLives({ initialSeconds: 10, gold: 2, lives: 2 });
    c.onCorrect();
    c.onWrong(1);
    return c.getState().lives >= 0;
  });

  check('boostersApi', function () {
    loadBoosters();
    maybeGrantBooster({ streak: 0, sessionGrants: 99, dailyGrants: 99 });
    return true;
  });

  check('session', function () {
    const s = createGameSession({ useHospital: false, initialSeconds: 5 });
    s.onCorrectAnswer();
    return !!s.snapshot().chronos;
  });

  check('dashboard', function () {
    return !!loadDashboard().moneyQuest;
  });

  check('moneyQuest', function () {
    recordMoneySlice({ sliceId: 'smoke', pointsDelta: 1, success: true, seconds: 1 });
    return loadMoneyQuest().points >= 0;
  });

  const ok = errors.length === 0;
  return { ok: ok, checks: checks, errors: errors };
}
