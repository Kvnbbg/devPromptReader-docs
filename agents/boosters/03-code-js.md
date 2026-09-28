# Code JS — boosters

```javascript
const BOOSTER_TYPES = [
  { id: 'time_plus', weight: 40 },
  { id: 'shield', weight: 25 },
  { id: 'xp_double', weight: 20 },
  { id: 'gold_small', weight: 15 },
];

const KEY = 'ts_boosters_v1';

export function loadBoosters() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

export function saveBoosters(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

function pickType() {
  const total = BOOSTER_TYPES.reduce((s, t) => s + t.weight, 0);
  let r = Math.random() * total;
  for (const t of BOOSTER_TYPES) {
    r -= t.weight;
    if (r <= 0) return t.id;
  }
  return BOOSTER_TYPES[0].id;
}

export function maybeGrantBooster(ctx) {
  // ctx: { streak, sessionGrants, dailyGrants, roll = 0.1, streakNeed = 3 }
  if (ctx.sessionGrants >= 3 || ctx.dailyGrants >= 5) return null;
  const streakHit = ctx.streak > 0 && ctx.streak % ctx.streakNeed === 0;
  const rollHit = Math.random() < (ctx.roll ?? 0.1);
  if (!streakHit && !rollHit) return null;
  const id = pickType();
  const state = loadBoosters();
  state[id] = (state[id] || 0) + 1;
  saveBoosters(state);
  return id;
}

export function consumeBooster(id) {
  const state = loadBoosters();
  if (!state[id]) return false;
  state[id] -= 1;
  if (state[id] <= 0) delete state[id];
  saveBoosters(state);
  return true;
}
```
