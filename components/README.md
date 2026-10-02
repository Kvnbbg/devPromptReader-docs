# Hands-free Lecteur

```js
import { bootHandsFreeLecteur } from './components/index.js';

const hf = bootHandsFreeLecteur({
  readerEl: document.getElementById('reader'),
  lang: 'fr',
  voice: true,
  onNext: goNext,
  onPrev: goPrev,
});
// Voix : « suivant », « scan », « valider », « aide »
// Tête/switch : hf.seq.next() / hf.seq.select()
```

See `docs/17-Eyes-Head-Voice-Access.md`.
