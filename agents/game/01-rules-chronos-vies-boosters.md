# Task 01 — Chronos, vies, boosters (rules)

## Rules (ready)

CHRONOS:
- After a correct answer: timer duration increases (reward).
- Implementation: onCorrect → chronoRemaining += bonusSeconds

VIES / OR:
- Wrong path: lose gold first, then life.
- Order: try spend gold penalty → if gold insufficient → lose 1 life

BOOSTERS:
- Gained at random along play as perseverance rewards.
- Not purchased only; drop chance on streak or milestone.

## Status in product

Not yet fully branched into epreuves (DRY).

## Agent work

1. Locate epreuve runtime (math/epreuves/* or shared quiz engine).
2. Add adapter calls only:
   - onCorrectAnswer()
   - onWrongAnswer()
   - onMilestone()
3. Do not rewrite UI of all epreuves.

## Output

WIRED_EPREUVES=list or none
ADAPTER_PATH=
STATUS=TODO|DONE|BLOCKED
