# Contrôles anti-fraude checkout (techandstream)

Lié au litige fraude (ex. nom « Test », client invité sans e-mail).

## Règles produit (à appliquer côté app + Radar)

### 1. Interdire ou freiner

- Nom porteur / billing name ∈ { test, testing, dummy, asdf, xxx } (casse ignorée)
- Prénom + nom vides ou un seul caractère
- E-mail vide ou invalide
- Checkout 100 % invité **sans** e-mail → bloquer

### 2. Exiger e-mail

Toujours collecter un e-mail valide avant `PaymentIntent` / Checkout Session.

### 3. 3-D Secure

- Radar : **Request 3D Secure** si pays carte ≠ FR (ou hors EEE), ou montant > seuil, ou client nouveau / invité.
- API (PaymentIntent) : `payment_method_options[card][request_three_d_secure] = 'automatic'` ou `'any'` selon politique.

### 4. Radar (exemples à adapter dans Dashboard)

```
Request 3D Secure if :is_anonymous: = true
Request 3D Secure if :card_country: != 'FR'
Block if :email: = null
Review if :amount_in_usd: < 10 and :is_anonymous: = true
Block if :card_country: = 'US' and :amount_in_usd: < 10 and :is_anonymous: = true
```

(Tester avec Rule backtesting avant activation agressive.)

### 5. Preuve d’accès (petits paiements numériques)

Après `payment_intent.succeeded` (webhook **signé**) :

1. Enregistrer `charge_id` / `payment_intent` / `customer_email` / `timestamp` / `product_id`.
2. Journal d’accès service (première ouverture de l’outil).
3. Conserver ≥ 180 jours (litiges).

Module code : `components/access-proof.js` + validation client `components/checkout-guard.js`.
