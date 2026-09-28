# Throttle rules

## Why

Live reading + game events can fire often. Showing every event blocks UX and drains battery.

## Rules

1. MIN_INTERVAL_MS = 1000 (bars/level) or 5000 (soft notices)
2. Soft notice: max 1 visible at a time
3. Skip / Later → cool-down *= 2 (cap e.g. 1 hour)
4. Same kind of notice: coalesce (keep latest payload)
5. No notice while user is actively typing or in answer modal (optional flag)
6. Device-local only for queue; no server push stream required

## Priority

P0 critical (rare) can bypass throttle once
P1 soft tip — throttled
P2 flavor — drop if busy

## Output fields for implementer

THROTTLE_MS=
COOLDOWN_ON_SKIP=
COALESCE=yes
