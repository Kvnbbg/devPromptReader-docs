# 21 — Checkout session plan + webhook grant plan

## Server flow

1. Client `mountPaymentButton` → `POST /api/create-checkout-session`
2. Server: `planCheckoutSession({ productKey, interval, successUrl, cancelUrl })`
3. If `ok`, `stripe.checkout.sessions.create(sessionParams)`
4. Return `{ url: session.url }`
5. Webhook: `planWebhookGrant(event)` → apply grants with `idempotency_key = event.id`

## Configure Price IDs

Replace placeholders in `STRIPE_PRICE_IDS` (or pass `priceMap` into `planCheckoutSession`).

## Modules

- `checkout-session-plan.js`
- `webhook-grant-plan.js`
