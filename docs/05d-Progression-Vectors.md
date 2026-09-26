# 05d — MMORPG Progression Vectors

## Exploration Summary

Progression vectors constitute the measurable axes along which a player (or, in the present context, a reader-user) advances. Contemporary MMORPG design literature distinguishes several complementary approaches.

### Vertical Progression

Vertical progression increases absolute power or capability along a single dominant axis (character level, gear score, document-mastery rank).  
It supplies clear, linear goals and strong short-term motivation.  
Risks include content obsolescence for lower-tier material and pressure to keep pace.

### Horizontal Progression

Horizontal progression expands the breadth of available options (additional themes, knowledge domains, reading modes, collection of completed documents) without necessarily increasing absolute power.  
It favours exploration, personalisation, and longer-term engagement at the cost of less dramatic power fantasies.

### Multi-Vector / Parallel Progression

The preferred model for devPromptReader is multi-vector (or parallel) progression. Multiple independent or loosely coupled axes advance simultaneously:

- **Reading Mastery Vector**: cumulative reading time, documents completed, streak length.
- **Knowledge Domain Vector**: exposure to and completion of material mapped to savoirs, dev, math, Money Quest, and official public information.
- **Upload / Integrity Vector**: successful verified heavy-document uploads and Merkle-root integrity events.
- **Customisation Vector**: themes unlocked, scroll presets refined, typography preferences saved.
- **Social / Profile Vector** (optional, consent-gated): authenticated profile completeness, optional chat interaction signals.

Each vector may award its own form of experience or unlock tokens. Cross-vector synergies are permitted (for example, completing a Money Quest-related reading item may grant a modest bonus on the Knowledge Domain vector) but never become mandatory gates.

### Design Implications for the Present System

- Prefer soft caps and logarithmic scaling on any single vertical axis to avoid runaway power differentials.
- Maintain horizontal breadth so that a user focused exclusively on local offline reading still experiences meaningful progression.
- Expose vector status in a compact, single-column mobile-friendly panel that collapses under the existing layout constraints.
- Never allow any vector state to disable core CRUD or reading functionality.

---

Previous: [05c-Semantic-Versioning](05c-Semantic-Versioning.md)  
Next: [05e-RSS-Feed-Parsing-and-Symbiosis](05e-RSS-Feed-Parsing-and-Symbiosis.md)
