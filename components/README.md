# Components

## Confort des yeux

```js
import { applyEyeComfort, cycleEyeMode, EYE_MODES } from './components/index.js';

applyEyeComfort(readerEl, {
  mode: 'soft', // none | soft | protanopia | deuteranopia | tritanopia | grayscale
  theme: 'dark',
  fontSize: 'xl',
  highContrast: false,
}, { lang: 'fr' });
```

Filtres approximatifs — pas un dispositif médical.
