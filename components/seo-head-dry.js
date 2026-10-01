/**
 * SEO head helpers — dry, client-safe, no XSS.
 * Prefer server-rendered tags for crawl; these help SPA/reader route changes.
 * Does NOT manipulate bounce rate or fake engagement.
 * @module seo-head-dry
 */

function textOnly(value, max) {
  const s = String(value == null ? '' : value)
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim();
  return s.slice(0, max || 300);
}

function ensureMeta(attr, key, content) {
  if (typeof document === 'undefined') return null;
  const sel = 'meta[' + attr + '="' + key + '"]';
  let el = document.head.querySelector(sel);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', textOnly(content, 320));
  return el;
}

/**
 * @param {{
 *   title?: string,
 *   description?: string,
 *   canonicalUrl?: string,
 *   robots?: string,
 * }} opts
 */
export function applySeoHead(opts) {
  const o = opts || {};
  if (typeof document === 'undefined') return { ok: false, reason: 'no_document' };

  if (o.title) {
    document.title = textOnly(o.title, 70);
  }
  if (o.description) {
    ensureMeta('name', 'description', o.description);
  }
  if (o.robots) {
    ensureMeta('name', 'robots', o.robots);
  }
  if (o.canonicalUrl) {
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    const url = textOnly(o.canonicalUrl, 2048);
    if (/^https?:\/\//i.test(url)) {
      link.setAttribute('href', url);
    }
  }
  return { ok: true };
}

/**
 * Open Graph + Twitter card basics (dry).
 * @param {{ title?: string, description?: string, url?: string, image?: string }}
 */
export function applySocialMeta(opts) {
  const o = opts || {};
  if (o.title) {
    ensureMeta('property', 'og:title', o.title);
    ensureMeta('name', 'twitter:title', o.title);
  }
  if (o.description) {
    ensureMeta('property', 'og:description', o.description);
    ensureMeta('name', 'twitter:description', o.description);
  }
  if (o.url && /^https?:\/\//i.test(String(o.url))) {
    ensureMeta('property', 'og:url', o.url);
  }
  if (o.image && /^https?:\/\//i.test(String(o.image))) {
    ensureMeta('property', 'og:image', o.image);
    ensureMeta('name', 'twitter:image', o.image);
  }
  ensureMeta('name', 'twitter:card', 'summary_large_image');
  return { ok: true };
}
