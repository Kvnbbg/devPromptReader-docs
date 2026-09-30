# Stripe — clé API exposée + virements suspendus

## Contexte type (techandstream)

Message fréquent : *Vos virements sont suspendus car une clé API a été trouvée exposée le [date].*

Tourner la clé **une fois** ne suffit pas si :
- l’ancienne clé n’est pas **révoquée / expirée immédiatement** ;
- la même clé reste dans l’historique git, un `.env` public, le JS front, ou un service tiers ;
- Stripe attend une **confirmation manuelle** dans le Dashboard (tâches / View task).

## Checklist immédiate (ordre)

1. **Dashboard → Developers → API keys**
   - Roll / rotate secret key (`sk_live_…`).
   - Invalider l’ancienne **maintenant** (pas seulement “expire in 7 days” si l’option “expire now” existe).
2. **Restreindre la nouvelle clé** (restricted key) : PaymentIntents, Customers, pas de payouts si le serveur web n’en a pas besoin.
3. **Metttre à jour tous les secrets** : Vercel / serveur / CI / webhooks — redéployer.
4. **Chercher les fuites restantes**
   - Site : `/.env`, source JS, Network tab → jamais de `sk_live_` côté navigateur.
   - Git : historique (`gitleaks` / `git log -p | grep sk_live_`).
   - GitHub secret scanning alerts.
5. **API request logs** (Workbench) : refunds, payouts, customers list depuis IP inconnues depuis le 14 août 2026.
6. **Bank / payout destination** : vérifier que l’IBAN n’a pas changé.
7. **Dashboard tâches** : “View task” / e-mail Stripe — confirmer *Yes, I rotated / this is me* si demandé. Sans cette étape, la suspension peut **persister** après rotation.
8. Contacter le support Stripe **avec** : date d’exposition, preuve de rotation, preuve qu’aucune `sk_live_` n’est plus publique.

## Pourquoi le “bug” persiste après rotation

| Cause | Action |
|-------|--------|
| Ancienne clé encore active en parallèle | Expire / delete old key now |
| Nouvelle clé pas déployée partout | Redéployer tous les environnements |
| Tâche Dashboard non validée | Ouvrir Action requise / View task |
| Clé encore dans un commit public | Purge git + considérer la clé brûlée |
| `sk_live_` dans le front | Retirer ; seules les clés **publishable** `pk_` côté client |

## Règle d’or

`sk_live_` = serveur uniquement. `pk_live_` = navigateur uniquement.
