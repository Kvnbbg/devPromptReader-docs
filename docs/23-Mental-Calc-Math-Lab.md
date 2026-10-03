# 23 — Calcul mental (Math Lab)

## Modules

| File | Role |
|------|------|
| mental-calc.js | Génère + note une question |
| mental-calc-session.js | Session + chronos + score + streak |
| data/mental-calc-levels.json | Niveaux lab |

## Difficultés

- **easy** : + − (petits nombres), 10 pts
- **medium** : + − × , 20 pts
- **hard** : plus grands + × , 35 pts

## Intégration

```js
import { createMentalCalcSession } from './components/index.js';

const lab = createMentalCalcSession({
  difficulty: 'medium',
  initialSeconds: 90,
  lives: 3,
  lang: 'fr',
});

lab.getChallenge(); // { promptFr, answer, points, ... }
lab.submit(42);     // { correct, next, stats }
```

Compatible Money Quest / dashboard dry (enregistrer `stats.score`).
