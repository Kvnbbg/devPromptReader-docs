# 06 — Layout, Typography, and Performance Constraints

## Layout Rules (375 px Base)

- Mobile is the primary design target.
- Root containers use `width: 100%` and appropriate `max-width` at larger breakpoints.
- `overflow-x: clip` (or `hidden`) is applied to prevent horizontal scroll of core content.
- Navigation bars, sidebars, cards, and tables **must** collapse to a single stacked column on viewports ≤ 640 px.
- Fixed-width layouts for core content are prohibited.
- No simultaneous horizontal and vertical scrolling of the primary reading surface is permitted.

## Touch and Interaction

- Minimum touch target size: 44 × 44 CSS pixels for every interactive control.
- Simultaneous visible controls are reduced; actions are grouped logically.

## Typography

- Concise titles.
- Short line lengths.
- Smaller body text blocks preferred over dense paragraphs.
- No oversized hero headings that push primary content below the fold.
- No dense all-caps copy.
- Multi-page splitting of long content is explicitly allowed.
- Inline links and navigation elements within paragraphs are permitted when they aid progressive disclosure.

## Performance and SEO

- Non-critical media is lazy-loaded.
- Text content must remain readable without JavaScript.
- An SEOHead component (or equivalent) supplies one clear `h1` and a logical heading hierarchy.

## Content Rules

- All decorative icons are SVG.
- Emoji characters are prohibited in the interface.

---

Previous: [05-Retention-Layer-MMORPG](05-Retention-Layer-MMORPG.md)  
Next: [07-Integration-and-External-Links](07-Integration-and-External-Links.md)
