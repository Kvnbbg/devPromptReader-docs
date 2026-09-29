/**
 * Thin session wiring: chronos + boosters + notices + optional hospital.
 * No framework. Safe to import as one entry.
 * @module integrate
 */

import { createSoftNoticeQueue } from './soft-notice.js';
import { maybeGrantBooster, consumeBooster, loadBoosters } from './boosters.js';
import { createChronosLives } from './chronos-lives.js';
import {
  loadHospital,
  saveHospital,
  applyConsequence,
  gradeFromXp,
  DISCLAIMER,
} from './hospital-state.js';

/**
 * @param {{
 *   initialSeconds?: number,
 *   noticeMinIntervalMs?: number,
 *   useHospital?: boolean,
 * }} [opts]
 */
export function createGameSession(opts) {
  const o = opts || {};
  const notices = createSoftNoticeQueue({
    minIntervalMs: o.noticeMinIntervalMs || 5000,
  });
  const chronos = createChronosLives({
    initialSeconds: o.initialSeconds != null ? o.initialSeconds : 60,
  });

  let streak = 0;
  let sessionBoosterGrants = 0;
  let hospital = o.useHospital ? loadHospital() : null;

  function onCorrectAnswer() {
    streak += 1;
    chronos.onCorrect();
    const id = maybeGrantBooster({
      streak: streak,
      sessionGrants: sessionBoosterGrants,
      dailyGrants: 0,
    });
    if (id) {
      sessionBoosterGrants += 1;
      notices.enqueue({
        kind: 'booster',
        text: 'Booster: ' + id,
        priority: 2,
        payload: { id: id },
      });
      if (id === 'shield') chronos.armShield();
      if (id === 'gold_small') chronos.addGold(3);
      if (id === 'time_plus') {
        /* chronos.onCorrect already added time; extra small bump optional */
      }
    }
    if (hospital) {
      hospital = applyConsequence(hospital, { xpDelta: 5 });
      hospital.streak = streak;
      hospital.grade = gradeFromXp(hospital);
      saveHospital(hospital);
    }
    return snapshot();
  }

  function onWrongAnswer() {
    streak = 0;
    chronos.onWrong(1);
    if (hospital) {
      hospital = applyConsequence(hospital, { goldDelta: 0, lifeDelta: -1, xpDelta: 0 });
      hospital.streak = 0;
      hospital.grade = gradeFromXp(hospital);
      saveHospital(hospital);
    }
    return snapshot();
  }

  /** @param {number} [now] */
  function tick(now) {
    chronos.tick(now);
    notices.tick(now);
    return snapshot();
  }

  function snapshot() {
    return {
      chronos: chronos.getState(),
      notice: notices.getVisible(),
      boosters: loadBoosters(),
      streak: streak,
      hospital: hospital,
      disclaimer: o.useHospital ? DISCLAIMER : null,
    };
  }

  function skipNotice() {
    notices.skip();
  }

  function dismissNotice() {
    notices.dismiss();
  }

  /** @param {string} id */
  function useBooster(id) {
    if (!consumeBooster(id)) return false;
    if (id === 'shield') chronos.armShield();
    if (id === 'gold_small') chronos.addGold(3);
    return true;
  }

  return {
    onCorrectAnswer: onCorrectAnswer,
    onWrongAnswer: onWrongAnswer,
    tick: tick,
    snapshot: snapshot,
    skipNotice: skipNotice,
    dismissNotice: dismissNotice,
    useBooster: useBooster,
    notices: notices,
    chronos: chronos,
    startChronos: function () {
      chronos.start();
    },
    pauseChronos: function () {
      chronos.pause();
    },
  };
}

export { DISCLAIMER };
