# Components + a11y

```js
import {
  ensureSkipLink,
  bindLecteurKeys,
  announce,
  setHighContrast,
  getParrainageCopy,
  applyReaderTheme,
  createAutoScroll,
} from './components/index.js';

ensureSkipLink('main');
bindLecteurKeys(document, {
  onNext: goNext,
  onPrev: goPrev,
  onPauseScroll: function () { sc.pause(); },
});
setHighContrast(readerEl, true);
announce('Page suivante');
const copy = getParrainageCopy('fr');
```

Docs: `docs/16-A11y-Full-App.md` · pack `agents/a11y/`
