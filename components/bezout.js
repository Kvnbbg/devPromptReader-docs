/**
 * Bézout / extended Euclidean — pure JS, no deps.
 * Link: safe arithmetic ↔ https://github.com/kvnbbg/Division-by-Zero
 * @module bezout
 */

/**
 * @param {number} a
 * @param {number} b
 * @returns {{ gcd: number, s: number, t: number }}
 */
export function egcd(a, b) {
  let oldR = Math.trunc(a);
  let r = Math.trunc(b);
  let oldS = 1;
  let s = 0;
  let oldT = 0;
  let t = 1;

  while (r !== 0) {
    const q = Math.trunc(oldR / r);
    const nextR = oldR - q * r;
    oldR = r;
    r = nextR;
    const nextS = oldS - q * s;
    oldS = s;
    s = nextS;
    const nextT = oldT - q * t;
    oldT = t;
    t = nextT;
  }

  let gcd = oldR;
  if (gcd < 0) {
    gcd = -gcd;
    oldS = -oldS;
    oldT = -oldT;
  }
  return { gcd: gcd, s: oldS, t: oldT };
}

/**
 * @param {number} n
 * @param {number} m
 * @returns {number}
 */
export function gcd(n, m) {
  return egcd(n, m).gcd;
}

/**
 * Modular inverse of a mod m, or null if gcd !== 1.
 * @param {number} a
 * @param {number} m
 * @returns {number|null}
 */
export function modInverse(a, m) {
  const mod = Math.trunc(m);
  if (mod <= 1) return null;
  const res = egcd(((a % mod) + mod) % mod, mod);
  if (res.gcd !== 1) return null;
  let inv = res.s % mod;
  if (inv < 0) inv += mod;
  return inv;
}

/**
 * Safe integer division outcome (aligns with Division-by-Zero spirit).
 * @param {number} numerator
 * @param {number} denominator
 * @returns {{ ok: boolean, quotient?: number, remainder?: number, error?: string }}
 */
export function safeDivInt(numerator, denominator) {
  const d = Math.trunc(denominator);
  if (d === 0) {
    return { ok: false, error: 'division_by_zero' };
  }
  const n = Math.trunc(numerator);
  return {
    ok: true,
    quotient: Math.trunc(n / d),
    remainder: n % d,
  };
}

/** Built-in numeric fixtures for demos / tests. */
export const BEZOUT_EXAMPLES = [
  { n: 252, m: 198, gcd: 18, s: -7, t: 9 },
  { n: 30, m: 12, gcd: 6, s: 1, t: -2 },
  { n: 17, m: 5, gcd: 1, s: -2, t: 7 },
  { n: 0, m: 14, gcd: 14, s: 0, t: 1 },
];

/**
 * Verify one example: s*n + t*m === gcd
 * @param {{ n: number, m: number, gcd: number, s: number, t: number }} ex
 */
export function verifyBezoutExample(ex) {
  const got = egcd(ex.n, ex.m);
  const linear = got.s * ex.n + got.t * ex.m;
  return {
    ok: got.gcd === ex.gcd && linear === got.gcd,
    got: got,
    linear: linear,
  };
}

export const DIVISION_BY_ZERO_REPO =
  'https://github.com/kvnbbg/Division-by-Zero';
