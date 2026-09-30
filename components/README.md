# Components — ready to use (no build)

Vanilla ES modules. No TypeScript, no bundler required.

## Fraud / checkout

```js
import { assertCheckoutAllowed, recordPaymentProof, recordAccessProof } from './components/index.js';

assertCheckoutAllowed({ email: userEmail, cardName: nameOnCard });
// after webhook-confirmed success:
recordPaymentProof({ paymentIntentId, chargeId, email, productId, amount: 5, currency: 'usd' });
recordAccessProof({ paymentIntentId, path: '/app' });
```

See also `ops/checkout-fraud-controls.md` and `ops/stripe-exposed-key-recovery.md`.

## Other modules

soft-notice, boosters, chronos-lives, hospital-state, integrate, dashboard-dry, money-quest-progress, smoke-assert, safe-storage, index.js
