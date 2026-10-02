# 16 — Accessibilité web app (a11y)

Cible : **toute** l’app, avec priorité **Lecteur (devPromptReader)** et **Parrainage**.

## Publics

| Public | Besoins principaux |
|--------|-------------------|
| Tétraplégie / motricité limitée | Clavier / switch / commande vocale ; cibles ≥ 44px (idéalement 48+) ; pas de gestes multi-doigts obligatoires ; focus visible ; délais longs ou annulables |
| Sourds / malentendants | Pas d’info **uniquement** sonore ; sous-titres / transcription ; indicateurs visuels |
| Aveugles / malvoyants | Structure sémantique, ARIA, contrastes, zoom 200 %, lecteurs d’écran, thèmes fort contraste |
| Charge cognitive / psycho | Parcours courts, messages calmes, pas de FOMO agressif, skip, confirmation claire (surtout Parrainage) |

## Norme de travail

Viser **WCAG 2.2 niveau AA** sur les écrans Lecteur et Parrainage, puis étendre.

## Modules code (no build)

| Fichier | Rôle |
|---------|------|
| `a11y-focus-trap.js` | Piège focus modales + restauration |
| `a11y-live-region.js` | Annonces `aria-live` (sans spam) |
| `a11y-keyboard.js` | Raccourcis Lecteur documentés, skip link |
| `a11y-contrast.js` | Thème high-contrast + prefers-contrast |
| `a11y-motion.js` | Respect `prefers-reduced-motion` |
| `parrainage-a11y-copy.js` | Textes Parrainage non culpabilisantes |

## Psycho — Lecteur

- Vitesse auto-scroll **réglable** et **pause** immédiate (espace / bouton).
- Pas de défilement forcé non interruptible.
- Thèmes white / light / dark / blue déjà fournis ; ajouter **high-contrast**.

## Psycho — Parrainage

- Formuler l’invitation comme **choix**, pas obligation.
- Éviter compteurs anxiogènes, timers artificiels, « tes amis te jugent ».
- Erreurs récupérables ; succès discrètement confirmé (live region).
- Alternative : partager plus tard / ignorer sans pénalité visible.
