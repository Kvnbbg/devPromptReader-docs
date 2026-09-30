# Payment verification checklist (techandstream)

Run in Stripe **test mode** first, then one low-value live payment if needed.

## A. Normal payment end-to-end

- [ ] Create Checkout Session or Payment Link with real `success_url` / `cancel_url`
- [ ] Pay with test card `4242 4242 4242 4242` (any future expiry, any CVC)
- [ ] Webhook `checkout.session.completed` or `payment_intent.succeeded` received and **signature verified**
- [ ] Access unlocked **only** after webhook (not from frontend alone)
- [ ] Receipt / access-proof row stored (`charge_id` or `payment_intent`)

## B. 3-D Secure + billing address

- [ ] Checkout: `billing_address_collection: 'required'`
- [ ] Radar or API requests 3DS when policy says so
- [ ] Test card `4000 0025 0000 3155` shows 3DS challenge and can complete
- [ ] Failed 3DS does not grant access

## C. Credits & subscriptions require login

- [ ] Unauthenticated user hitting buy credits / Pro → redirect login
- [ ] Session `user_id` or account email attached to Checkout `client_reference_id` / `metadata`
- [ ] Guest checkout **disabled** for credits and subscriptions
- [ ] `assertCheckoutAllowed` / `validatePaymentRequestBody` reject empty email and name "Test"

## D. Public product pages

Current public `/checkout/...` pages may only show mailto until Payment Link is wired.
- [ ] Either embed Checkout Session URL or keep mailto — do not claim live pay if link missing
- [ ] Align displayed Pro price (home vs checkout page)

## Code helpers (no compile)

- `components/checkout-guard.js` — field guards
- `components/server-validate.js` — server body validation
- `components/checkout-session-options.js` — recommended Session option object
- `components/access-proof.js` — local proof log (also mirror on server)
