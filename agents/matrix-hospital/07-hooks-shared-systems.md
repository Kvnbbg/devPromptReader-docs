# Task 07 — Hooks to shared systems

onSceneSuccess:
  chronos bonus
  maybeGrantBooster
  SoftNoticeQueue.enqueue kind=hospital_tip

onSceneFail:
  gold then life
  streak=0

onRankUp:
  dashboard dry fields update

Do not reimplement throttle; import notify pack.

STATUS=
