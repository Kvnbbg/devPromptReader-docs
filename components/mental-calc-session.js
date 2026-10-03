/**
 * Mental calc session wired to chronos / score (Math Lab challenge).
 * @module mental-calc-session
 */

import {
  generateMentalChallenge,
  gradeMentalAnswer,
} from './mental-calc.js';
import { createChronosLives } from './chronos-lives.js';
import { maybeGrantBooster } from './boosters.js';
import { announce } from './a11y-live-region.js';

/**
 * @param {{
 *   difficulty?: 'easy'|'medium'|'hard',
 *   initialSeconds?: number,
 *   lives?: number,
 *   lang?: 'fr'|'en',
 * }} [opts]
 */
export function createMentalCalcSession(opts) {
  const o = opts || {};
  const difficulty = o.difficulty || 'easy';
  const lang = o.lang === 'en' ? 'en' : 'fr';
  const chronos = createChronosLives({
    initialSeconds: o.initialSeconds != null ? o.initialSeconds : 60,
    lives: o.lives != null ? o.lives : 3,
    gold: 0,
  });

  let current = generateMentalChallenge(difficulty);
  let score = 0;
  let streak = 0;
  let answered = 0;
  let correctCount = 0;

  function speakPrompt() {
    announce(lang === 'en' ? current.prompt : current.promptFr);
  }

  speakPrompt();

  return {
    getChallenge: function () {
      return current;
    },
    getScore: function () {
      return score;
    },
    getStreak: function () {
      return streak;
    },
    getStats: function () {
      return {
        score: score,
        streak: streak,
        answered: answered,
        correctCount: correctCount,
        chronos: chronos.getState(),
      };
    },
    /**
     * @param {unknown} userInput
     */
    submit: function (userInput) {
      const g = gradeMentalAnswer(current, userInput);
      answered += 1;
      if (g.correct) {
        correctCount += 1;
        streak += 1;
        score += current.points + Math.min(10, streak);
        chronos.onCorrect();
        maybeGrantBooster({ streak: streak, sessionGrants: 0, dailyGrants: 0 });
        announce(lang === 'en' ? 'Correct' : 'Juste');
      } else {
        streak = 0;
        chronos.onWrong(1);
        announce(
          lang === 'en'
            ? 'Expected ' + g.expected
            : 'Réponse : ' + g.expected
        );
      }
      current = generateMentalChallenge(difficulty);
      speakPrompt();
      return {
        correct: g.correct,
        expected: g.expected,
        given: g.given,
        next: current,
        stats: {
          score: score,
          streak: streak,
          chronos: chronos.getState(),
        },
      };
    },
    skip: function () {
      streak = 0;
      chronos.onWrong(0);
      current = generateMentalChallenge(difficulty);
      speakPrompt();
      return current;
    },
    setDifficulty: function (d) {
      if (d === 'easy' || d === 'medium' || d === 'hard') {
        // difficulty closed over — recreate challenge only
        current = generateMentalChallenge(d);
      }
      return current;
    },
  };
}
