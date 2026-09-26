# 05k — Analysis of RSS / Atom Parsing Systems

## Comparative Landscape

| Approach | Strengths | Weaknesses | Fit for devPromptReader |
|----------|-----------|------------|-------------------------|
| Browser-native DOMParser + manual mapping | Zero dependency, works offline after fetch | Brittle against malformed feeds, no JSON Feed | Acceptable for minimal client path |
| JavaScript libraries (e.g. rss-parser) | Convenient, often isomorphic | Bundle size, occasional security surface | Usable if tree-shaken and audited |
| Go `mmcdole/gofeed` | Robust, multi-format, mature | Requires a Go runtime or pre-built binary | Ideal for CLI / CI / pre-processing |
| Go `SlyMarbo/rss` | Simple update loop, polite polling | Narrower feature set | Suitable for lightweight pollers |
| Full desktop aggregators | Rich UI, many feeds | Far beyond the scoped reader | Out of scope |

## Security Analysis

Critical controls already required by the specification:

1. Origin allow-list before any request.
2. Response size ceiling.
3. Rejection of unexpected Content-Type.
4. Disablement of external entity resolution (XXE) in the chosen parser.
5. HTML sanitisation of every description field before insertion into the DOM.
6. `rel="noopener noreferrer"` on every external navigation.

Failure to apply any of the above re-introduces well-known risks (XXE, oversized payloads, tab-nabbing, XSS via feed content).

## Performance and Mobile Considerations

- Conditional requests (ETag / Last-Modified) keep bandwidth low.
- Client-side caches must expire; stale feed data is preferable to unbounded growth.
- Rendering is limited to a small number of items so that the single-column mobile layout never produces excessive vertical length or layout thrashing.

## True Loop Re-statement

fetch (allow-listed) → validate → parse (safe) → sanitise → normalise → cache → bounded render or suggestion → user action (skip / open secure new tab / open in reader) → return to controlled application state.

No background unbounded polling is authorised. The Go CLI variant may perform the same loop under a scheduled or manual invocation and deposit a static snapshot for the client.

## Recommendation

- Client path: keep the JavaScript implementation minimal and strictly allow-listed.
- Tooling / CI / offline pre-process path: prefer the Go CLI built on `gofeed` as documented in 05i.
- Both paths share the same normalised item schema so that the reader remains agnostic to the origin of the cached items.

---

Previous: [05j-MMORPG-Game-Mechanics](05j-MMORPG-Game-Mechanics.md)  
Next: [06-Layout-Typography-Performance](06-Layout-Typography-Performance.md)
