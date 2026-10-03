/**
 * Linear Diophantine: n*x + m*y = c
 * Uses Bézout (egcd). No deps.
 * @module diophantine
 */

import { egcd } from './bezout.js';

/**
 * @param {number} n
 * @param {number} m
 * @param {number} c
 * @returns {{
 *   ok: boolean,
 *   reason?: string,
 *   gcd?: number,
 *   x0?: number,
 *   y0?: number,
 *   stepX?: number,
 *   stepY?: number,
 *   particular?: string,
 *   general?: string,
 * }}
 */
export function solveLinearDiophantine(n, m, c) {
  const N = Math.trunc(n);
  const M = Math.trunc(m);
  const C = Math.trunc(c);

  if (N === 0 && M === 0) {
    if (C === 0) {
      return {
        ok: true,
        gcd: 0,
        x0: 0,
        y0: 0,
        stepX: 0,
        stepY: 0,
        particular: 'any (0,0) works; all integers if c=0',
        general: 'x,y arbitrary',
      };
    }
    return { ok: false, reason: 'no_solution_zero_coeffs' };
  }

  const { gcd: d, s, t } = egcd(N, M);
  if (C % d !== 0) {
    return { ok: false, reason: 'gcd_does_not_divide_c', gcd: d };
  }

  const k = C / d;
  const x0 = s * k;
  const y0 = t * k;
  const stepX = M / d;
  const stepY = -N / d;

  return {
    ok: true,
    gcd: d,
    x0: x0,
    y0: y0,
    stepX: stepX,
    stepY: stepY,
    particular: N + '*(' + x0 + ') + ' + M + '*(' + y0 + ') = ' + C,
    general:
      'x = ' +
      x0 +
      ' + ' +
      stepX +
      '*k, y = ' +
      y0 +
      ' + ' +
      stepY +
      '*k (k integer)',
  };
}

/** Demo fixtures. */
export const DIOPHANTINE_EXAMPLES = [
  { n: 30, m: 12, c: 6, expectOk: true },
  { n: 30, m: 12, c: 5, expectOk: false },
  { n: 17, m: 5, c: 1, expectOk: true },
];
