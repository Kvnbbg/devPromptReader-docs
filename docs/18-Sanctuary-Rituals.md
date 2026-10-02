# 18 — Sanctuaire dry (mantras, rituels, recover)

Device-first. No guilt copy. Aligns with techandstream « miroir affectif » concept without requiring a CMS.

## Data

- `data/sanctuary-mantras.json`
- `data/sanctuary-rituals.json`

## Modules

| File | Role |
|------|------|
| sanctuary-mantra.js | One mantra per day |
| ritual-todo.js | Pre-filled checklists |
| recover-heal.js | 5-step local wizard |

## Privacy

Recover notes stay in `localStorage` until user clears. Offer `clearRecoverSessions()` in settings.
