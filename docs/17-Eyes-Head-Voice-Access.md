# 17 — Accès : yeux, tête, voix

## Modules

| Module | Rôle |
|--------|------|
| sequential-nav.js | Scan + select |
| switch-keys.js | **1 ou 2 switches** (Espace/Entrée ou long-press) |
| voice-commands.js | Reconnaissance vocale navigateur |
| gaze-friendly.js | 48px + dwell |
| handsfree-lecteur-boot.js | Boot unique |

## 2 switches (recommandé tête)

- Switch A → `seq.next()` (scan)
- Switch B → `seq.select()` (valider)

```js
bindSwitchKeys({ seq: hf.seq, mode: 'two' });
```

## 1 switch

- Court → suivant · Long → valider

```js
bindSwitchKeys({ seq: hf.seq, mode: 'one', longPressMs: 700 });
```

OS Voice Access / Eye Control restent prioritaires pour le curseur global.
