# 09 — Référencement Google (SEO) — Audit et plan d’action

## Périmètre

Audit technique et éditorial du site principal **https://techandstream.com** (et www) réalisé le 2026-09-28.  
Objectif : état des lieux factuel et actions prioritaires pour le référencement Google, sans modifier de façon destructive les surfaces existantes.

## État des lieux (ce qui est déjà en place)

### Technique

| Élément | Statut | Observation |
|---------|--------|-------------|
| `robots` meta | OK | `index, follow` + max-image-preview / snippet |
| `Googlebot` dans robots.txt | OK | Explicitement autorisé (`Allow: /`) |
| Sitemap | OK | `https://techandstream.com/sitemap.xml` (~411 URL), déclaré dans robots.txt ; sitemaps complémentaires (kevinmarville, Supabase) |
| Canonical | OK | `https://techandstream.com/` (non-www) |
| Title | OK | « TechAndStream \| Développement Web, Projets Numériques & Solutions Tech » |
| Meta description | OK | Présente, orientée bénéfice + langues |
| Open Graph + Twitter Cards | OK | Complets (image 1200×630, alt, locale FR) |
| hreflang | OK | fr-FR, en-US, it, es, de, pt, ja, zh + x-default |
| JSON-LD (schema.org) | OK | Plusieurs blocs présents |
| Flux RSS / Atom | OK | Discovery links dans le `<head>` |
| HTTPS / HSTS | OK | Strict-Transport-Security |
| PWA manifest / favicons | OK | Présents |

### Contenu indexable

- Pages outils, hub, world, articles (ex. navigateurs IA, guerre du capital IA), cuisine sociale, etc. figurent dans le sitemap et sont accessibles sans blocage Googlebot.
- La home expose un `h1` cohérent avec la marque et une structure de titres lisible.

### Politique robots IA

Les robots d’entraînement / scraping IA sont volontairement bloqués (Content-Signal, X-Robots-Tag partiel, listes Disallow). **Googlebot n’est pas concerné** et reste autorisé. Cette distinction doit être maintenue.

## Points de vigilance

1. **Cohérence www / non-www**  
   Le canonical pointe vers `https://techandstream.com/`. Vérifier que `www.techandstream.com` redirige en 301 permanent vers la version non-www (ou l’inverse, mais une seule version canonique).

2. **Titles et descriptions uniques par page**  
   Chaque URL importante (hub, world, articles, outils) doit avoir un `<title>` et une meta description distincts, alignés sur l’intention de recherche (outils IA devs, Money Quest, etc.).

3. **Un seul `h1` clair par page**  
   Déjà exigé dans les contraintes layout/SEOHead de ce dépôt ; à contrôler sur les pages dynamiques.

4. **Contenu indexable sans JavaScript**  
   Le texte principal doit rester dans le HTML initial (progressive enhancement), conformément à la page 06.

5. **Search Console**  
   Propriété Google Search Console à maintenir à jour : sitemap soumis, couverture d’index, Core Web Vitals, pages exclues à surveiller.

6. **Mots-clés de marque vs concurrentiels**  
   La marque « TechAndStream » / « techandstream » est déjà associée au domaine. Les requêtes génériques (« outils IA développeurs », « générateur de prompts ») exigent du contenu long, des liens internes et de l’autorité externe.

## Plan d’action priorité (prochain gain SEO)

| Priorité | Action | Critère de succès |
|----------|--------|-------------------|
| P0 | Confirmer redirection 301 www → non-www (ou inverse) | Une seule URL canonique dans les résultats |
| P0 | Search Console : sitemap soumis + 0 erreur critique de couverture | Rapport couverture vert |
| P1 | Audit titles/descriptions des 20 URL les plus prioritaires | Aucun doublon title |
| P1 | Maillage interne : hub → outils → articles → world | Chaque outil lié depuis au moins une page éditoriale |
| P2 | Contenu ciblé intention (prompts IA, Money Quest, Math) | 1 page piliers / thème |
| P2 | Core Web Vitals mobile (LCP, INP, CLS) | Seuils « bon » Search Console |
| P3 | Données structurées : valider JSON-LD (Organization, WebSite, SoftwareApplication si applicable) | 0 erreur Rich Results Test |

## Lien avec devPromptReader

- Les pages documentation de ce dépôt GitHub ne remplacent pas le site public ; elles restent hors périmètre d’indexation prioritaire du domaine techandstream.com sauf décision contraire.
- Toute future page publique « lecteur / devPromptReader » devra hériter des mêmes règles : un `h1`, title unique, description, canonical, et contenu lisible sans JS.

## Non-destructif

Aucune modification de production n’est imposée par ce document. Les actions listées sont des recommandations à appliquer sur le dépôt ou l’hébergement du site public, en versionnant chaque changement.

---

Previous: [08-Language-Register-and-Progression](08-Language-Register-and-Progression.md)  
Return to [README](../README.md)
