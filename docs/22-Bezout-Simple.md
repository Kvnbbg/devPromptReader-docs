# 22 — Bézout (version simple)

## En une phrase

Pour deux entiers n et m, on peut toujours trouver des entiers s et t tels que **s×n + t×m = pgcd(n, m)**.

## Exemple concret

n = 30, m = 12 → pgcd = 6  
parce que **1×30 + (−2)×12 = 6**.

## À quoi ça sert

- Résoudre des équations du type 30x + 12y = 6
- Trouver un **inverse modulaire** (crypto) quand le pgcd vaut 1
- Prouver des résultats d’arithmétique (ex. lemme d’Euclide pour les premiers)

## Lien avec Division-by-Zero

[kvnbbg/Division-by-Zero](https://github.com/kvnbbg/Division-by-Zero) traite la **division sûre** (pas de ÷0 silencieux).  
Bézout / `safeDivInt` : le pgcd et la division entière restent des **égalités contrôlées**, jamais une division par zéro masquée.

## Module

`components/bezout.js` — `egcd`, `gcd`, `modInverse`, `safeDivInt`, `BEZOUT_EXAMPLES`
