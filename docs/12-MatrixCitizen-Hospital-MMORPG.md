# 12 — MatrixCitizen Hospital Path (Medical Simulation MMORPG)

## Status

Design complete for documentation and dry wiring. Implementation of epreuves/scenes is additive and non-destructive toward existing MatrixCitizen, Money Quest, and Math Lab surfaces.

## Thesis

MatrixCitizen is an open-world **work simulation** with MMORPG-style progression. The hospital path is one **vertical career spine** among others: the player inhabits emergency / trauma roles, makes dialogue and protocol choices under time pressure, and advances from responsible staff toward specialist. Pacing mirrors Money Quest **slices** (scene → choice → consequence).

## Explicit boundaries

- Fiction and pedagogy only. **Not** clinical advice and **not** a certifying medical training product.
- Disclaimer required on every hospital scene entry.
- Core reading tools and non-hospital paths remain ungated.

## Role ladder

| Rank | Label (FR) | Focus |
|------|------------|--------|
| 0 | Observateur | Watch, learn protocols |
| 1 | Responsable de triage | Prioritise cases |
| 2 | Intervenant urgence | Dialogue + first actions |
| 3 | Spécialiste (branche) | Deeper protocol trees |

Horizontal branches (optional): infirmier, régulation, administration, famille/accompagnant (RP).

## Scene structure (one slice)

1. Brief (vitals, context — no real PHI).
2. Dialogue options (≥2, one clearly suboptimal).
3. Protocol choice (exam / wait / escalate).
4. Consequence (time, gold/resources, moral/energy as “life”).
5. Soft notice (throttled) + optional booster roll.
6. Persist device-first.

## Shared systems (dry hooks)

- Chronos: correct protocol decision may extend timer.
- Gold then life on critical failure (see `agents/game/01`).
- Boosters: time_plus, shield, xp_double, gold_small (`agents/boosters/`).
- SoftNoticeQueue (`agents/notify/`).
- Dashboard dry: level, play time, points, objective, grade (`agents/game/05`).

## RP beta settings (atomic granularity)

| Setting | Effect |
|---------|--------|
| tone | formal / tense / dry humour off |
| consequence_severity | soft / standard / hard |
| scene_duration | short / medium |
| show_scores | on / off |
| allow_meta_cheats | reveal optimal path once per scene (beta) |

These are authoring tools for RP fans, not competitive exploits.

## URLs (existing surfaces)

- https://www.techandstream.com/matrix-citizen
- https://www.techandstream.com/matrixcitizen/simulation
- https://www.techandstream.com/matrixcitizen/parcours
- https://www.techandstream.com/DevMatrixCitizen.html
- Money Quest: /money-quest

## Agent pack

[`agents/matrix-hospital/`](../agents/matrix-hospital/)

---

Previous: [11-Notify-Throttle-Boosters](11-Notify-Throttle-Boosters.md)  
Index: [AGENTS_INDEX.md](../AGENTS_INDEX.md)
