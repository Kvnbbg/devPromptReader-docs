# Task 03 — Device-first sync

## Policy

1. All progress writes to device first (localStorage / IndexedDB).
2. Account DB sync is optional and batched.
3. No continuous server streaming of game state.

## Keys (suggested)

mq_progress, math_progress, chronos_state, lives, gold, boosters, last_sync_at

## Steps

1. Confirm write path is local on answer / level end.
2. If auth present: queue sync job (debounce ≥ 30s or on visibility hidden).
3. On load: read local first; merge remote only if newer and trusted.

## Output

LOCAL_WRITE=yes|no
SYNC_MODE=off|batched
STATUS=
