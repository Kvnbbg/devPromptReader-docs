# 18 — Sanctuaire (vérifié) + perf appareils modestes

## Vérification données (OK)

| Source | Contenu |
|--------|---------|
| mantras | **7** (m1–m7) FR + EN, alignés code `FALLBACK` |
| rituels | **3** : corps / cœur / esprit, 3 items chacun |

Pas de fetch obligatoire : les modules embarquent les mêmes textes (zéro réseau au premier affichage).

## Mantras — rôle

Phrases **courtes** du jour (stable 24 h via `localStorage`). Pas de rotation animée lourde.

## Rituels — rôle

Checklists de **soin**, pas de productivité agressive. Coche locale uniquement.

## Perf (low-end)

- `listRituals` : **1** lecture `localStorage` (corrigé v2.3.1)
- `openSanctuaryLite` : sync, pas de promesse, pas d’image
- Pas d’animation imposée ; respecter `prefers-reduced-motion`
- Éviter de re-render toute la liste à chaque coche : mettre à jour l’item seul côté UI

## API rapide

```js
import { openSanctuaryLite, setRitualItemDone } from './components/index.js';
const view = openSanctuaryLite('fr');
// view.opener, view.mantra, view.rituals, view.moreHint
```
