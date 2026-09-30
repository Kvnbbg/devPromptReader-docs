# Components — modules JS autonomes

Sans compilation. Sécurisés. Alignés packs documentés.

## Touch

```js
import {
  ensureMinTouchSize,
  attachSwipe,
  attachPress,
  isLandscape,
} from './components/index.js';

ensureMinTouchSize(btn);
const stop = attachSwipe(el, {
  axis: 'horizontal',
  onSwipe: function (dir) { console.log(dir); },
});
// later: stop();
```

See [docs/14-Touch-Events.md](../docs/14-Touch-Events.md).
