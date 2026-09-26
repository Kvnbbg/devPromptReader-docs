# 04 — Reader-Viewer Features

## Continuous Auto-Scroll

The viewer implements continuous vertical scroll (infinite-drop lecture style).  
Auto-scroll velocity is expressed either in pixels per second or pages per minute and is fully configurable.  
Touch interaction pauses the scroll; release or explicit resume restarts it.

## Configurable Parameters (Single-Column Control Panel)

All controls appear in a collapsible panel that collapses to a single column on small viewports:

- Auto-scroll speed.
- Theme selection: dark, blue-light (reduced blue emission), pure white, high-contrast light.  Themes affect only colour tokens; layout remains invariant.
- Typography: restricted system-safe font families, size scaling (base 16 px, 2 px increments), line-height, and letter-spacing.
- Optional on-device or network-mediated translation of extracted text.  Translation is never automatic; Google Translate (or equivalent) is invoked only on explicit user request and only when network connectivity is available.

## Media Constraints

- Images and video: `max-width: 100%`, stable aspect-ratio containers, `playsInline`, `preload="metadata"`.
- All iframes and embeds are dimension-constrained and sandboxed.

## Apple / iOS Considerations

- Respect for CSS environment variables (`safe-area-inset-*`).
- Minimum interactive target size of 44 × 44 CSS pixels.
- Honouring of the `prefers-reduced-motion` media query.
- Preference for File System Access and Web Share APIs where supported.

---

Previous: [03-Architecture-and-CRUD](03-Architecture-and-CRUD.md)  
Next: [05-Retention-Layer-MMORPG](05-Retention-Layer-MMORPG.md)
