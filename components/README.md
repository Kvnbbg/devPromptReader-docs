# Components — autonomous JS, no compilation

Vanilla ES modules. Secure defaults. Aligned with agent packs + fraud ops.

## Entry

```js
import {
  createGameSession,
  assertCheckoutAllowed,
  recordPaymentProof,
  validatePaymentRequestBody,
  runSmokeAssert,
} from './components/index.js';
```

## Inventory

See [MANIFEST.md](./MANIFEST.md).

## Security

- No eval, no network inside modules
- localStorage via safe-storage try/catch
- Checkout: block Test/empty names, require email
- Server: use `server-validate.js` + Stripe webhook signatures
- Hospital: fiction disclaimer only

## Demo

Open `example-usage.html` via any static server (ES modules need HTTP, not always `file://`).
