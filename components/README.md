# Components — Lecteur modules (no compile)

```js
import {
  applyLecteurSeoBoost,
  enhanceSearchBar,
  createAutoScroll,
  attachSwipe,
  runSmokeAssert,
} from './components/index.js';

applyLecteurSeoBoost({
  title: 'Lecteur',
  description: 'Read documents locally, mobile-first.',
  canonicalUrl: 'https://www.techandstream.com/lecteur',
});

enhanceSearchBar(document.querySelector('#search'));
```

SEO is **dry & legitimate** only (no cloaking / fake bounce).
