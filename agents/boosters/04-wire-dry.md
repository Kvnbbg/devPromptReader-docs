# Wire dry (epreuves)

## Hooks

onCorrectAnswer:
  streak++
  maybeGrantBooster({ streak, sessionGrants, dailyGrants })
  if granted → SoftNoticeQueue.enqueue({ kind: 'booster', text: id })

onWrongAnswer:
  streak = 0
  if shield active → consume shield, skip life loss
  else apply gold-then-life rule

## Status

DRY until epreuve runtime calls these hooks.

STATUS=TODO
