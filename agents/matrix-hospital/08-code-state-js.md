# Task 08 — Code alternative (state JS)

```javascript
const HOSPITAL_KEY = 'ts_hospital_v1';

export function loadHospital() {
  try {
    return JSON.parse(localStorage.getItem(HOSPITAL_KEY) || '{}');
  } catch {
    return {};
  }
}

export function saveHospital(s) {
  localStorage.setItem(HOSPITAL_KEY, JSON.stringify(s));
}

export function defaultHospitalState() {
  return {
    rank: 0,
    branch: null,
    xp: 0,
    gold: 10,
    life: 3,
    scenesCompleted: 0,
    grade: '—',
    playTimeSec: 0,
    rp: {
      tone: 'neutral',
      consequence_severity: 'standard',
      scene_duration: 'short',
      show_scores: true,
      allow_meta_cheats: false,
    },
  };
}

export function applyConsequence(state, { goldDelta = 0, lifeDelta = 0, xpDelta = 0 }) {
  const s = { ...state };
  s.gold = Math.max(0, (s.gold || 0) + goldDelta);
  if (lifeDelta < 0) {
    const need = -lifeDelta;
    // prefer gold buffer: 1 gold shields 1 life tick if available
    if ((s.gold || 0) >= need) s.gold -= need;
    else s.life = Math.max(0, (s.life || 0) - need);
  } else {
    s.life = (s.life || 0) + lifeDelta;
  }
  s.xp = (s.xp || 0) + xpDelta;
  return s;
}
```

Wire chronos/boosters from other packs; do not duplicate.

STATUS=
