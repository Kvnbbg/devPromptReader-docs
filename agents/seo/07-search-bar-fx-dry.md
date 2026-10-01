# 07 — Search bar ripple/bounce (dry UX) + SEO boost modules

## Goal

Multiply **legitimate** SEO effect (titles, canonical, JSON-LD) and polish in-app search UX with ripple/bounce. Not ranking fraud.

## Code

- `components/seo-head-dry.js`
- `components/seo-json-ld.js`
- `components/seo-boost-dry.js`
- `components/search-bar-fx.js`

## Wire (dry)

1. On Lecteur route change → `applyLecteurSeoBoost({ title, description, canonicalUrl })`
2. On search input mount → `enhanceSearchBar(input, { onQuery })`
3. Respect `prefers-reduced-motion`

## Do not

- Fake bounce rate / hidden text / doorway pages
