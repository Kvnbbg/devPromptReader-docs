# Milestone 2026-09-30

## Delivered

- Horizontal mode #4 → PR **#73** (retractable rail, wide bands, curved-screen effect, portrait unchanged)
- Tests: **61/61** green (nav / onboarding / feed)
- Merged: PR **#70**, **#71**, **#72** (rebase conflict resolved on #72)
- Open: PR **#73**

## DB migration

Not applicable from restricted sandbox (Postgres protocol reset on pooler). Apply via Supabase SQL editor with browser session:

https://supabase.com/dashboard/project/cxkvwarvrqfylsagiddw/sql/new

## Known debt (not fixed this turn)

TopNav and MobileNav each own a navigation panel (duplicate UI sources). Do not refactor without dedicated test budget.

See `agents/nav/01-dedupe-top-mobile.md`.
