# Sanctuary modules

```js
import {
  pickMantra,
  listRituals,
  setRitualItemDone,
  createRecoverSession,
} from './components/index.js';

console.log(pickMantra('fr'));
const rituals = listRituals('fr');
setRitualItemDone('morning_soft_start', 0, true);

const rh = createRecoverSession('fr');
rh.setFeeling('fatigué');
rh.next(); // breathe → write → ritual → close
rh.complete();
```
