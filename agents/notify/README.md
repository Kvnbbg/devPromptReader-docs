# Notify pack — throttling design

## Goal

Soft notifications that do not spam. Skippable. Battery-safe.

## Files

1. `01-throttle-rules.md` — rules only
2. `02-component-api.md` — component contract
3. `03-code-js.md` — JS alternative code
4. `04-code-go.md` — optional Go CLI note

## One-line design

max 1 soft notice per THROTTLE_MS; queue collapses; user skip increases cool-down.
