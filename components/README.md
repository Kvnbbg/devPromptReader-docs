# Components — ready to use (no build)

Vanilla ES modules. No TypeScript, no bundler, no npm required for basic use.

## Load in browser

```html
<script type="module">
  import { createSoftNoticeQueue } from './components/soft-notice.js';
  import { maybeGrantBooster, consumeBooster, loadBoosters } from './components/boosters.js';
  import { loadHospital, saveHospital, defaultHospitalState, applyConsequence } from './components/hospital-state.js';
  import { createChronosLives } from './components/chronos-lives.js';
  import { createGameSession } from './components/integrate.js';
</script>
```

Or copy files into your app `src/lib/` and import the same way.

## Security notes

- No `eval`, no remote code.
- `localStorage` only; wrap in try/catch.
- Strings from notices should be textContent, never innerHTML, unless you sanitize.
- Hospital content is fiction only — show disclaimer in UI.

## Files

| File | Role |
|------|------|
| `soft-notice.js` | Throttled soft notices |
| `boosters.js` | Grant / consume boosters |
| `hospital-state.js` | MatrixCitizen hospital path state |
| `chronos-lives.js` | Timer + gold-then-life |
| `integrate.js` | Thin session wiring all of the above |
| `safe-storage.js` | Shared safe localStorage |
