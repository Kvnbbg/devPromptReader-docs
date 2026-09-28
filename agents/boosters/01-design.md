# Booster design

## Principles

1. Reward streak / milestones, not paywall.
2. Optional use: player may ignore booster.
3. Effects short and clear (extra time, shield one wrong, double XP once).
4. Store counts on device first.

## Types (minimal set)

| id | effect |
|----|--------|
| time_plus | +N seconds chronos |
| shield | next wrong does not take life (gold still optional) |
| xp_double | next correct grants 2x XP |
| gold_small | +small gold |

## Grant moments

- every K correct streak (e.g. 3)
- end of epreuve if score >= threshold
- random roll 5–15% after correct (cap daily)

## Anti-spam

Max grants per session. Soft notice via notify pack when granted.
