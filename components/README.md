# Checkout + webhook (pure JS)

```js
import {
  planCheckoutSession,
  planWebhookGrant,
  mountPaymentButton,
} from './components/index.js';

// Server:
const plan = planCheckoutSession({
  productKey: 'premium',
  interval: 'month',
  successUrl: 'https://www.techandstream.com/pay/success',
  cancelUrl: 'https://www.techandstream.com/pay/cancel',
  priceMap: { premium: { month: 'price_xxx', year: 'price_yyy' } },
});
// if (plan.ok) stripe.checkout.sessions.create(plan.sessionParams)
```
