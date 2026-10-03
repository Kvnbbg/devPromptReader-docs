# Credits + payment button

```js
import {
  mountPaymentButton,
  getBalance,
  grantMonthlyForProduct,
  spendCredits,
} from './components/index.js';

mountPaymentButton(el, {
  productKey: 'premium',
  interval: 'month',
  lang: 'fr',
  createSession: async (payload) => {
    const r = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return r.json();
  },
});
```
