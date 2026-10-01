/**
 * JSON-LD injector — stringified via JSON.stringify only (no HTML injection).
 * Aligns with agents/seo/05-jsonld-check.md
 * @module seo-json-ld
 */

const SCRIPT_ID_PREFIX = 'ts-jsonld-';

/**
 * @param {string} id stable id suffix
 * @param {object} data plain object graph
 */
export function setJsonLd(id, data) {
  if (typeof document === 'undefined') return null;
  const safeId = SCRIPT_ID_PREFIX + String(id || 'main').replace(/[^a-zA-Z0-9_-]/g, '');
  let el = document.getElementById(safeId);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = safeId;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data == null ? {} : data);
  return el;
}

/**
 * WebApplication / SoftwareApplication sketch for Lecteur.
 * @param {{ name?: string, url?: string, description?: string }}
 */
export function lecteurAppJsonLd(opts) {
  const o = opts || {};
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: o.name || 'devPromptReader Lecteur',
    url: o.url || 'https://www.techandstream.com/',
    description:
      o.description ||
      'Document reader with offline-capable viewing, mobile-first layout, and local reading controls.',
    applicationCategory: 'BrowserApplication',
    operatingSystem: 'Any',
  };
}

/**
 * BreadcrumbList helper.
 * @param {{ name: string, url: string }[]} items
 */
export function breadcrumbJsonLd(items) {
  const list = Array.isArray(items) ? items : [];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: list.map(function (it, i) {
      return {
        '@type': 'ListItem',
        position: i + 1,
        name: String(it.name || '').slice(0, 120),
        item: String(it.url || '').slice(0, 2048),
      };
    }),
  };
}
