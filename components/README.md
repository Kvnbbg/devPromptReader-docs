# Components — modules JS autonomes

> Prêts à l’emploi, sécurisés, **sans dépendance de compilation**, alignés sur les packs documentés.

## Import unique

```js
import {
  createGameSession,
  createSoftNoticeQueue,
  assertCheckoutAllowed,
  assertCanPurchaseEntitlement,
  buildCheckoutSessionParams,
  recordPaymentProof,
  runSmokeAssert,
} from './components/index.js';
```

## Crédits / abonnements (connexion obligatoire)

```js
import {
  assertCanPurchaseEntitlement,
  kindRequiresAuth,
  buildCheckoutSessionParams,
  accessMetadata,
} from './components/index.js';

if (kindRequiresAuth('subscription')) {
  const auth = assertCanPurchaseEntitlement(req.user); // throws if guest
  const sessionParams = buildCheckoutSessionParams({
    mode: 'subscription',
    successUrl,
    cancelUrl,
    customerEmail: auth.email,
    clientReferenceId: auth.userId,
    requireBillingAddress: true,
    metadata: accessMetadata({ userId: auth.userId, productId: 'pro', kind: 'subscription' }),
  });
}
```

## Inventaire

[MANIFEST.md](./MANIFEST.md)
