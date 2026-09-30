# 14 — Touch events

## Modules (no build)

| File | Role |
|------|------|
| `touch-targets.js` | Min 44×44 measurement / ensure |
| `touch-listeners.js` | Passive pointer/touch bind + unbind |
| `touch-swipe.js` | Swipe left/right/up/down |
| `touch-press.js` | Tap vs long-press |

## Rules

1. Prefer **passive** listeners for move/scroll performance.
2. Do not `preventDefault` on touchmove unless implementing a custom gesture that must block scroll.
3. Interactive controls ≥ **44px** on mobile primary layouts.
4. Pointer events first; touch fallback when `PointerEvent` missing.
5. Always return an **unsubscribe / destroy** function.

## Example

```js
import { attachSwipe, ensureMinTouchSize, attachPress } from './components/index.js';

ensureMinTouchSize(document.getElementById('next'));
attachSwipe(readerEl, {
  axis: 'vertical',
  thresholdPx: 50,
  onSwipe: function (dir) {
    if (dir === 'up') goNextPage();
  },
});
```
