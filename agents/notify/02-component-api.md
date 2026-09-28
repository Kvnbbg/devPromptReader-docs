# Component API (dry)

## Name

SoftNoticeQueue

## Methods

- enqueue({ kind, text, priority, payload })
- tick(now)
- skip()
- dismiss()
- getVisible()

## State

- queue: array
- lastShownAt: number
- cooldownMs: number
- visible: null | notice

## UI

- non-modal banner
- Skip button >= 44px
- single column mobile
- no emoji required; SVG ok

## Persist (optional)

localStorage key: ts_soft_notice_cooldown
