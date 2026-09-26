# 05k — Analysis of RSS / Atom Parsing Systems

## Comparative Landscape

| Approach | Strengths | Weaknesses | Fit for devPromptReader |
|----------|-----------|------------|-------------------------|
| Browser DOMParser + manual mapping | Zero dependency after fetch | Brittle on malformed feeds | Minimal client path |
| JavaScript feed libraries | Convenient | Bundle size, audit surface | Acceptable if audited |
| Go `mmcdole/gofeed` | Robust multi-format | Needs Go toolchain or binary | **Primary for CLI `devPromptReader feed`** |
| Go `SlyMarbo/rss` | Simple polite updates | Narrower features | Optional poller |
| Full aggregators | Rich UI | Out of scoped reader | Out of scope |

## Security Controls (Mandatory)

1. Origin / host allow-list before request.
2. Response size ceiling.
3. Content-Type check (xml / rss / atom).
4. Parser configured without external-entity expansion.
5. Sanitisation of HTML descriptions before any UI insertion.
6. External links opened only with safe new-context attributes in the browser path.

## Terminal Path Specifics

The CLI (`devPromptReader feed`) applies the same allow-list and timeout policy. Output is plain text or JSON; no HTML is rendered in the terminal, which removes an entire class of XSS risk from the CLI surface.

## True Loop (Unified)

allow-list check → conditional fetch → validate → parse → normalise → cache or print → bounded consumption (browser card or CLI lines) → user action or script exit → controlled state.

No unbounded background polling is authorised in either path.

## Recommendation

- **Browser**: minimal allow-listed fetch + sanitise.
- **Terminal**: `devPromptReader` built on `gofeed`, subcommand `feed`, shared normalised item schema so both paths stay symbiotic.

---

Previous: [05j-MMORPG-Game-Mechanics](05j-MMORPG-Game-Mechanics.md)  
Next: [06-Layout-Typography-Performance](06-Layout-Typography-Performance.md)
