# 15 — SEO dry + search bar FX (Lecteur)

## Legitimate SEO multiplier

| Module | Effect |
|--------|--------|
| seo-head-dry | title, description, canonical, robots |
| seo-json-ld | WebApplication + BreadcrumbList |
| seo-boost-dry | one-call route boost |

Server-rendered HTML remains primary for Googlebot; these helpers help SPA transitions and consistency.

## Search bar UX (not Google ranking)

`search-bar-fx.js` — ripple on pointer, bounce on Enter. Works for Lecteur search or any styled bar. Does not call Google/Bing APIs.

## Example

```js
import {
  applyLecteurSeoBoost,
  enhanceSearchBar,
  SEO_DRY_CHECKLIST,
} from './components/index.js';

applyLecteurSeoBoost({
  title: 'Lecteur — read docs offline',
  description: 'Mobile-first document reader with local controls.',
  canonicalUrl: 'https://www.techandstream.com/lecteur',
  breadcrumbs: [
    { name: 'Home', url: 'https://www.techandstream.com/' },
    { name: 'Lecteur', url: 'https://www.techandstream.com/lecteur' },
  ],
});

enhanceSearchBar(document.querySelector('#q'), {
  onQuery: function (q) { console.log(q); },
});
```
