# Math modules

```js
import {
  egcd,
  solveLinearDiophantine,
  safeDivInt,
} from './components/index.js';

egcd(30, 12);
solveLinearDiophantine(30, 12, 6);
safeDivInt(10, 0); // { ok: false, error: 'division_by_zero' }
```
