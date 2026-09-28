# Task 02 — Phone horizontal = 1 screen (Math Lab)

## Goal

In landscape mobile, Math Lab fits one viewport: no critical control below the fold.

## Steps

1. Open /math at width ~667 height ~375 (landscape phone).
2. Check: question + answers + chrono + vies visible without scroll.
3. If not: CSS orientation media query:
   - reduce padding
   - stack or compact stats bar
   - max-height 100dvh
   - overflow hidden on chrome, scroll only on question body if needed

## Do not

- Do not break portrait mode.
- Do not remove accessibility targets 44px when possible; compact spacing instead.

## Output

PORTRAIT_OK=
LANDSCAPE_ONE_SCREEN=
CSS_CHANGED=
STATUS=
