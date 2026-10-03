# 19 — Stripe entitlements (avant boutons de paiement)

## Prix créés (EUR)

| product_key | Mensuel | Annuel | Droit |
|-------------|---------|--------|--------|
| premium | 4,99 € (existant) | 39,99 € | `premium` + crédits **à trancher** |
| studio_premium | 7,99 € | 59,99 € | `studio_premium` → BeatMaker/Studio, **0 crédit hub** |
| train_premium | 2,99 € | 19,99 € | `train_premium` → Train Adventures, **0 crédit hub** |

## Règle d’or

**Ne pas** activer les boutons Checkout tant que `credits_per_month` pour Premium n’est pas un nombre (0 = accès seul, >0 = forfait).

`assertOfferReadyForCheckout('premium')` **bloque** tant que crédits = `null`.

## Modules

- `entitlements-resolve.js`
- `entitlements-grant-dry.js`
- `data/stripe-entitlements.json`

## Webhook (rappel)

1. Vérifier signature Stripe  
2. Lire metadata `product_key`, `entitlement`, `credits_per_month`  
3. Grant idempotent sur `event.id`  
4. Jamais créditer sans `product_key` connu  

## URSSAF / Drive

Optionnel : log date, payment id, montant, product_key, crédits, statut paid/refunded — **après** matrice figée.
