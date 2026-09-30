# 13 — Autonomous JS components (no compilation)

## Location

[`components/`](../components/)

## Principle

Ship **vanilla ES modules** that match agent pack specs without a build step. Copy into any app that supports `import` in the browser or a simple static host.

## Map pack → module

| Agent pack | Module |
|------------|--------|
| notify | `soft-notice.js` |
| boosters | `boosters.js` |
| game chronos / vies | `chronos-lives.js` |
| matrix-hospital | `hospital-state.js` |
| game dashboard dry | `dashboard-dry.js` |
| Money Quest slices | `money-quest-progress.js` |
| session glue | `integrate.js` + `index.js` |

## Symbiosis

Does not replace live Math Lab / Money Quest / MatrixCitizen pages. Provides drop-in state machines and UI-agnostic APIs for progressive wiring.

## Security

Local-only storage, no eval, capped strings, fiction disclaimer for hospital.
