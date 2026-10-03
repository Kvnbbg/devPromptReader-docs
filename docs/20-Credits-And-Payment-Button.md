# 20 — Crédits & bouton de paiement

## Limites configurées

| Clé | Crédits / mois |
|-----|----------------|
| premium | **500** |
| studio_premium | 0 (accès app) |
| train_premium | 0 (accès app) |
| starter | 50 |
| free | 0 |

- Plafond portefeuille : **20 000**
- Max dépense / action : **1 000**

## Modules

| File | Role |
|------|------|
| credits-limits.js | plafonds |
| credits-wallet.js | solde local + grant/spend |
| payment-button.js | bouton Checkout sécurisé |
| entitlements-resolve.js | Premium prêt (500) |

## Bouton qui « fonctionne »

Le client **ne** contient **pas** la clé secrète Stripe. Le bouton appelle `createSession` (ton API), qui renvoie `{ url }` Checkout, puis redirige.

```js
import { mountPaymentButton, grantMonthlyForProduct } from './components/index.js';

mountPaymentButton(document.getElementById('pay'), {
  productKey: 'premium',
  interval: 'month',
  lang: 'fr',
  createSession: async function (payload) {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json(); // { url: 'https://checkout.stripe.com/...' }
  },
});
```

Webhook serveur : après paiement, appeler la même logique que `grantMonthlyForProduct('premium', event.id)` **côté serveur** (source de vérité), le wallet local n’est qu’un cache.
