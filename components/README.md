# Components — modules JS autonomes

> Prêts à l’emploi, sécurisés, **sans compilation**, alignés sur les packs documentés.

## Import

```js
import {
  createGameSession,
  attachSwipe,
  createAutoScroll,
  SCROLL_PRESETS,
  ensureMinTouchSize,
  assertCheckoutAllowed,
  runSmokeAssert,
} from './components/index.js';
```

## Reader auto-scroll + swipe

```js
const sc = createAutoScroll(readerEl, { speedPxPerSec: SCROLL_PRESETS.medium });
sc.start();
attachSwipe(readerEl, {
  axis: 'vertical',
  onSwipe: function () { sc.pause(); },
});
```

See MANIFEST.md and docs/14-Touch-Events.md.
