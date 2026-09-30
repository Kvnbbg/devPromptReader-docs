# Components — autonomous JS, no compilation

Vanilla ES modules. Secure. Aligned with agent packs + fraud/payment ops.

## Entry

```js
import {
  createGameSession,
  assertCheckoutAllowed,
  buildCheckoutSessionParams,
  cardThreeDSecureOptions,
  runSmokeAssert,
} from './components/index.js';

// Server only — merge into stripe.checkout.sessions.create({
const sessionParams = {
  ...buildCheckoutSessionParams({
    mode: 'subscription',
    successUrl: 'https://techandstream.com/success',
    cancelUrl: 'https://techandstream.com/cancel',
    customerEmail: user.email,
    clientReferenceId: user.id,
    requireBillingAddress: true,
    metadata: { product_id: 'pro' },
  }),
  line_items: [/* your price */],
};
```

## Inventory

See [MANIFEST.md](./MANIFEST.md).

## Payment verification

[ops/payment-verification-checklist.md](../ops/payment-verification-checklist.md)
