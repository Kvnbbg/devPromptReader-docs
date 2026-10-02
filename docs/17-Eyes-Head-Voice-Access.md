# 17 — Accès : yeux, tête, voix (motricité très limitée)

Public : personnes qui **voient**, peuvent bouger la **tête** et/ou utiliser la **voix**, avec peu ou pas d’usage des mains.

## Couches (du système vers l’app)

1. **OS / matériel** (prioritaire)
   - Windows : Eye Control, Voice Access
   - macOS / iOS : Voice Control, Switch Control, Eye Tracking (selon appareil)
   - Android : Switch Access, Voice Access
   - Solutions gaze (Tobii, etc.) qui exposent un **curseur** ou un **switch**

2. **App Lecteur** (ce que nous fournissons)
   - Tout actionnable au **clavier** (déjà : `bindLecteurKeys`, skip link)
   - **Navigation séquentielle** (1–2 switches / appui tête) : `sequential-nav.js`
   - **Commandes vocales** in-app (Web Speech API, si dispo) : `voice-commands.js`
   - **Dwell / regard** : cibles larges, pas d’action au seul hover, délais longs : `gaze-friendly.js`
   - Annonces SR + labels stables pour que le contrôle vocal OS reconnaisse les boutons

## Principe

L’app ne remplace pas un eye-tracker médical. Elle reste **compatible** : focus clair, gros boutons, noms accessibles, mode séquentiel, voix optionnelle.

## Psycho

- Pas de limite de temps agressive
- Confirmation vocale / visuelle avant action destructive
- « Répéter » / « Annuler » toujours disponibles
