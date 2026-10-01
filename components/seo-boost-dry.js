/**
 * Dry “SEO boost” coordinator for Lecteur routes — multiplies *legitimate* signals only:
 * unique title, description, canonical, JSON-LD, social tags.
 * Explicitly does NOT: cloaking, fake traffic, bounce-rate fraud, keyword stuffing.
 * @module seo-boost-dry
 */

import { applySeoHead, applySocialMeta } from './seo-head-dry.js';
import { setJsonLd, lecteurAppJsonLd, breadcrumbJsonLd } from './seo-json-ld.js';

/**
 * @param {{
 *   title: string,
 *   description: string,
 *   canonicalUrl: string,
 *   imageUrl?: string,
 *   breadcrumbs?: { name: string, url: string }[],
 *   includeAppSchema?: boolean,
 * }} page
 */
export function applyLecteurSeoBoost(page) {
  const p = page || {};
  if (!p.title || !p.description || !p.canonicalUrl) {
    return { ok: false, reason: 'title_description_canonical_required' };
  }

  applySeoHead({
    title: p.title,
    description: p.description,
    canonicalUrl: p.canonicalUrl,
    robots: 'index,follow',
  });

  applySocialMeta({
    title: p.title,
    description: p.description,
    url: p.canonicalUrl,
    image: p.imageUrl,
  });

  if (p.includeAppSchema !== false) {
    setJsonLd(
      'app',
      lecteurAppJsonLd({
        name: 'devPromptReader Lecteur',
        url: p.canonicalUrl,
        description: p.description,
      })
    );
  }

  if (p.breadcrumbs && p.breadcrumbs.length) {
    setJsonLd('breadcrumb', breadcrumbJsonLd(p.breadcrumbs));
  }

  return { ok: true };
}

/** Checklist text for agents (Search Console etc.). */
export const SEO_DRY_CHECKLIST = [
  'One clear H1 matching intent',
  'Unique title ≤ ~60 chars',
  'Meta description ≤ ~155 chars',
  'Canonical host consistent (www vs apex)',
  'JSON-LD valid (Rich Results test)',
  'Mobile CWV / 44px targets',
  'Internal links from hub pages',
  'No fake engagement or cloaking',
];
