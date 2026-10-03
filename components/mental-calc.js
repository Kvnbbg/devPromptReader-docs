/**
 * Mental calculation challenges for Math Lab / Money Quest.
 * Pure JS, no deps. Difficulty tiers + scoring.
 * @module mental-calc
 */

/** @typedef {'easy'|'medium'|'hard'} Difficulty */

const OPS = {
  easy: ['+', '-'],
  medium: ['+', '-', '*'],
  hard: ['+', '-', '*'],
};

/**
 * @param {number} min
 * @param {number} max
 */
function randInt(min, max) {
  const a = Math.ceil(min);
  const b = Math.floor(max);
  return a + Math.floor(Math.random() * (b - a + 1));
}

/**
 * @param {Difficulty} [difficulty]
 * @returns {{
 *   id: string,
 *   difficulty: Difficulty,
 *   prompt: string,
 *   promptFr: string,
 *   answer: number,
 *   op: string,
 *   a: number,
 *   b: number,
 *   points: number,
 *   secondsHint: number,
 * }}
 */
export function generateMentalChallenge(difficulty) {
  const d =
    difficulty === 'medium' || difficulty === 'hard' ? difficulty : 'easy';
  const opList = OPS[d];
  const op = opList[randInt(0, opList.length - 1)];

  let a;
  let b;
  let answer;

  if (op === '+') {
    if (d === 'easy') {
      a = randInt(2, 20);
      b = randInt(2, 20);
    } else if (d === 'medium') {
      a = randInt(10, 90);
      b = randInt(10, 90);
    } else {
      a = randInt(50, 400);
      b = randInt(50, 400);
    }
    answer = a + b;
  } else if (op === '-') {
    if (d === 'easy') {
      a = randInt(5, 30);
      b = randInt(1, a);
    } else if (d === 'medium') {
      a = randInt(20, 120);
      b = randInt(5, a);
    } else {
      a = randInt(100, 500);
      b = randInt(20, a);
    }
    answer = a - b;
  } else {
    // *
    if (d === 'medium') {
      a = randInt(3, 12);
      b = randInt(3, 12);
    } else {
      a = randInt(6, 19);
      b = randInt(6, 19);
    }
    answer = a * b;
  }

  const points = d === 'easy' ? 10 : d === 'medium' ? 20 : 35;
  const secondsHint = d === 'easy' ? 12 : d === 'medium' ? 15 : 20;

  return {
    id: 'mc_' + Date.now() + '_' + randInt(100, 999),
    difficulty: d,
    prompt: a + ' ' + op + ' ' + b + ' = ?',
    promptFr: 'Calcule : ' + a + ' ' + op + ' ' + b,
    answer: answer,
    op: op,
    a: a,
    b: b,
    points: points,
    secondsHint: secondsHint,
  };
}

/**
 * @param {{ answer: number }} challenge
 * @param {unknown} userInput
 * @returns {{ correct: boolean, expected: number, given: number|null }}
 */
export function gradeMentalAnswer(challenge, userInput) {
  const expected = challenge && typeof challenge.answer === 'number' ? challenge.answer : NaN;
  const given = parseUserNumber(userInput);
  const correct =
    given !== null && !isNaN(expected) && given === expected;
  return { correct: correct, expected: expected, given: given };
}

function parseUserNumber(input) {
  if (typeof input === 'number' && isFinite(input)) {
    return Math.trunc(input);
  }
  const s = String(input == null ? '' : input)
    .trim()
    .replace(',', '.');
  if (!s || !/^-?\d+$/.test(s)) return null;
  return parseInt(s, 10);
}

/**
 * Batch of challenges for a round.
 * @param {number} count
 * @param {Difficulty} [difficulty]
 */
export function generateRound(count, difficulty) {
  const n = Math.max(1, Math.min(20, Math.floor(count) || 5));
  const list = [];
  for (let i = 0; i < n; i++) {
    list.push(generateMentalChallenge(difficulty));
  }
  return list;
}
