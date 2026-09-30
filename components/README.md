# Components — ready to use (no build)

Vanilla ES modules. No TypeScript, no bundler, no npm required for basic use.

Aligned with agent packs: `agents/notify`, `agents/boosters`, `agents/game`, `agents/matrix-hospital`.

## Load in browser

```html
<script type="module">
  import {
    createGameSession,
    createSoftNoticeQueue,
    maybeGrantBooster,
    loadDashboard,
    recordMoneySlice,
  } from './components/index.js';

  const session = createGameSession({ useHospital: true });
  session.startChronos();
  session.onCorrectAnswer();
  console.log(session.snapshot());
  console.log(loadDashboard());
</script>
```

Or import individual files: `soft-notice.js`, `boosters.js`, etc.

## Security notes

- No `eval`, no remote code execution.
- `localStorage` only via `safe-storage.js` (try/catch).
- Notice text: use `textContent`, not `innerHTML`, unless you sanitize.
- Hospital path is fiction only — show `DISCLAIMER` in UI.
- No network calls from these modules.

## Files

| File | Role |
|------|------|
| `index.js` | Barrel exports |
| `safe-storage.js` | Safe localStorage JSON |
| `soft-notice.js` | Throttled soft notices |
| `boosters.js` | Grant / consume boosters |
| `chronos-lives.js` | Timer + gold-then-life |
| `hospital-state.js` | MatrixCitizen hospital state |
| `integrate.js` | Session wiring |
| `dashboard-dry.js` | Hub stats (MQ / Math / Hospital) |
| `money-quest-progress.js` | Money Quest slices |
| `smoke-assert.js` | Smoke checks |
| `example-usage.html` | Demo page |

## Smoke test

```html
<script type="module">
  import { runSmokeAssert } from './components/smoke-assert.js';
  console.log(runSmokeAssert());
</script>
```
