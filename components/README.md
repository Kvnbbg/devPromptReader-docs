# Math Lab — calcul mental

```js
import { createMentalCalcSession } from './components/index.js';

const lab = createMentalCalcSession({ difficulty: 'medium', lang: 'fr' });
console.log(lab.getChallenge().promptFr);
lab.submit(42);
```
