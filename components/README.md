# Switch / tête + mains libres

```js
import {
  bootHandsFreeLecteur,
  bindSwitchKeys,
} from './components/index.js';

const hf = bootHandsFreeLecteur({ readerEl, lang: 'fr', onNext, onPrev });

// 2 switches (tête) : Espace = scan, Entrée = valider
const stop = bindSwitchKeys({ seq: hf.seq, mode: 'two' });

// 1 switch : appui court = suivant, long = valider
// bindSwitchKeys({ seq: hf.seq, mode: 'one', longPressMs: 700 });
```
