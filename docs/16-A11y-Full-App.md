# 16 — Accessibilité web app (a11y)

Cible : **toute** l’app, priorité **Lecteur** et **Parrainage**.

## Publics

| Public | Besoins |
|--------|---------|
| Tétraplégie | Clavier / switch, cibles 44–48px, focus visible |
| Sourds / HoH | Pas d’info uniquement sonore |
| Aveugles / malvoyants | SR, contraste, zoom, thèmes |
| **Yeux / daltonisme / fatigue** | `eye-comfort.js` : soft, protanopie, deutéranopie, tritanopie, gris + taille |
| Charge cognitive | Parrainage non culpabilisant |

## Modules

`a11y-*`, `lecteur-a11y-boot.js`, `parrainage-a11y-copy.js`, **`eye-comfort.js`**, `reader-theme.js`

## Yeux — exemple

```js
import { applyEyeComfort, cycleEyeMode } from './components/index.js';
applyEyeComfort(readerEl, {
  mode: 'deuteranopia',
  theme: 'dark',
  fontSize: 'lg',
  highContrast: false,
}, { lang: 'fr' });
```
