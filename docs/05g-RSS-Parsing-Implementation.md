# 05g — Detailed RSS / Atom Parsing Implementation (Lightweight, Reasonably Secure)

## Design Goals

- Lightweight: minimal dependencies, suitable for mobile and offline-first contexts.
- Reasonably secure: strict origin allow-list, response-size limits, HTML sanitisation, no evaluation of remote scripts.
- True loop: fetch → parse → cache → render → optional suggestion → user action returns to the same controlled path.

## Recommended Allow-List

Only the following origins (or their exact path variants) are permitted:

- `https://www.techandstream.com`
- `https://techandstream.com`
- `https://www.kevinmarville.com` (observed in current feed self-links)

Any other origin is rejected before parsing begins.

## Algorithm Outline

1. **Discovery / selection**: choose a feed URL from the known discovery set or a cached list.
2. **Conditional fetch**: issue `GET` with `If-None-Match` / `If-Modified-Since` when previous validators exist.
3. **Response validation**:
   - Status 200 or 304.
   - Content-Type contains `xml`, `rss`, or `atom`.
   - Body size ≤ configured maximum (e.g., 512 KiB).
4. **Parse**: use a standards-compliant RSS 2.0 / Atom 1.0 parser that does not execute external entities.
5. **Sanitise**: strip or escape all HTML in descriptions; retain only a restricted set of inline tags if any are required for display.
6. **Normalise**: map items to a common internal structure `{ title, link, pubDate, summary, categories }`.
7. **Cache**: store the normalised list together with ETag / Last-Modified and an expiry timestamp in IndexedDB or equivalent.
8. **Render / suggest**: surface a bounded number of items (e.g., 3–5) inside the single-column mobile layout or the skippable suggestion card.
9. **User action**: external links open with `target="_blank" rel="noopener noreferrer"`; internal actions remain inside the controlled application flow.

## Alternative Lightweight Code Sketch (Illustrative)

```javascript
// Pseudocode — illustrative only; adapt to chosen runtime and sanitiser.
const ALLOWED_ORIGINS = new Set([
  'https://www.techandstream.com',
  'https://techandstream.com',
  'https://www.kevinmarville.com'
]);

async function fetchAndParseFeed(url, { etag, lastModified } = {}) {
  const u = new URL(url);
  if (![...ALLOWED_ORIGINS].some(o => u.origin === o || u.href.startsWith(o))) {
    throw new Error('Origin not allowed');
  }
  const headers = {};
  if (etag) headers['If-None-Match'] = etag;
  if (lastModified) headers['If-Modified-Since'] = lastModified;

  const res = await fetch(url, { headers, credentials: 'omit', mode: 'cors' });
  if (res.status === 304) return { notModified: true };
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ct = res.headers.get('content-type') || '';
  if (!/xml|rss|atom/i.test(ct)) throw new Error('Unexpected content-type');

  const text = await res.text();
  if (text.length > 512 * 1024) throw new Error('Response too large');

  // Parse with a safe RSS/Atom library; never eval.
  const items = parseRssOrAtom(text).map(normaliseItem).map(sanitiseSummary);
  return {
    items: items.slice(0, 20),
    etag: res.headers.get('etag'),
    lastModified: res.headers.get('last-modified')
  };
}
```

The sketch deliberately omits framework-specific details. Implementers must supply a battle-tested sanitiser and a parser that disables external-entity resolution.

## True Loop Closure

Every path that begins with a feed fetch must terminate either in a local cache update, a rendered suggestion that the user can skip, or a secure new-tab navigation. No unbounded background polling is permitted. The loop therefore remains under explicit user or session control.

---

Previous: [05f-MMORPG-Economy-Systems](05f-MMORPG-Economy-Systems.md)  
Next: [05h-Functional-Component-Flow](05h-Functional-Component-Flow.md)
