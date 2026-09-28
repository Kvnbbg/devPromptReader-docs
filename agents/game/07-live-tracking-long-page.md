# Task 07 — Live tracking on long page

## Goal

During long read in devPromptReader:

- notifications (soft, skippable)
- parsing status (if feed/url)
- progress bars
- level / XP
update without blocking scroll

## Steps

1. Open long document or long URL.
2. Enable live tracking.
3. Scroll / auto-scroll.
4. Confirm bars and level update on interval or on section exit (not every pixel).
5. Throttle updates (≤ 1/s) to save battery.

## Do not

- Do not stream full content to server continuously.
- Do not block main thread.

## Output

TRACKING_OK=
THROTTLE_MS=
BARS_UPDATE=
LEVEL_UPDATE=
STATUS=
