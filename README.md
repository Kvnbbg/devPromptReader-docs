# devPromptReader Documentation

## Accessibilité (v2.0.0)

Toute l’app : tétraplégie (clavier/switch), sourds/malentendants, aveugles/malvoyants, charge cognitive — priorité **Lecteur** + **Parrainage**.

→ [docs/16-A11y-Full-App.md](docs/16-A11y-Full-App.md) · [agents/a11y/](agents/a11y/) · modules `a11y-*` + `parrainage-a11y-copy.js`

```js
import {
  ensureSkipLink,
  bindLecteurKeys,
  announce,
  setHighContrast,
  getParrainageCopy,
} from './components/index.js';
```

---

*Kvnbbg*
