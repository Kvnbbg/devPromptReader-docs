# Components — Lecteur a11y boot

```js
import { bootLecteurA11y, getParrainageCopy, runSmokeAssert } from './components/index.js';

const session = bootLecteurA11y({
  mainId: 'main',
  readerEl: document.getElementById('reader'),
  highContrast: true,
  autoScroll: true,
  lang: 'fr',
  onNext: goNext,
  onPrev: goPrev,
});
// Space toggles scroll pause; session.destroy() on unmount
```

Docs: `docs/16-A11y-Full-App.md`
