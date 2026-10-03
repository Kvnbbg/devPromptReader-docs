# Entitlements (no compile)

```js
import {
  resolveOffer,
  assertOfferReadyForCheckout,
  planGrantFromPayment,
  configureEntitlements,
} from './components/index.js';

// Après décision owner : crédits Premium = 500 / mois
configureEntitlements({
  premium: {
    product_key: 'premium',
    entitlement: 'premium',
    credits_per_month: 500,
    apps: [],
    amounts: { month: 4.99, year: 39.99 },
  },
});

assertOfferReadyForCheckout('studio_premium', 'month');
planGrantFromPayment({ product_key: 'train_premium', interval: 'year' });
```
