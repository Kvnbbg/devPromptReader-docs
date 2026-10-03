# 22 — Bézout + Diophantine (simple)

## Bézout

s×n + t×m = pgcd(n,m)

Exemple : 1×30 + (−2)×12 = 6

## Diophantine

nx + my = c a des solutions **ssi** pgcd(n,m) divise c.

```js
import { solveLinearDiophantine, egcd } from './components/index.js';
solveLinearDiophantine(30, 12, 6);
// ok: true, x0, y0, general form with k
solveLinearDiophantine(30, 12, 5);
// ok: false (6 does not divide 5)
```

## Division-by-Zero

https://github.com/kvnbbg/Division-by-Zero — division sûre (`safeDivInt`).
