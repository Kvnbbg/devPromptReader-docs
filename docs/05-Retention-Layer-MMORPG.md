# 05 — Retention Layer (MMORPG-Style Evolution)

## Design Intent

An optional, lightweight progression system is defined to encourage sustained engagement without gating core reading functionality.  
The system is modelled on classic MMORPG progression loops and is intended to be maintained as a living Game Design Document (GDD) component under the kvnbbg namespace.

## Exploration of Established MMORPG Retention Mechanics

Research into contemporary and classical MMORPG design identifies several interlocking mechanisms that reliably support long-term retention. The following summary informs the present specification without prescribing predatory monetisation patterns.

### Nested Core Loops

Effective retention arises from nested loops operating at different timescales:

- **Session (micro) loop**: short, satisfying cycles of action and immediate feedback (read a section, earn a small XP increment, adjust a display parameter).
- **Daily / return loop**: reasons to re-enter the application after a period of absence (a soft suggestion, a mild daily objective, or a personalised knowledge prompt).
- **Progression (meta) loop**: accumulation of XP, levels, and unlocks that confer lasting cosmetic or convenience benefits.
- **Seasonal or knowledge loop**: longer-horizon goals that map to external knowledge nodes (savoirs, dev, math) and official information sources.

These loops must remain voluntary. No loop may disable core reading, upload, or local CRUD capabilities.

### Progression Vectors and Persistent Investment

- Experience points awarded for measurable activity (reading time, documents completed, successful verified uploads).
- Discrete levels that unlock non-essential rewards: additional themes, refined scroll presets, or contextual knowledge cards.
- Persistent local profile that records progress; optional authenticated synchronisation when the user has signed in.
- Clear short-term goals (complete three short documents) paired with longer aspirational goals (reach a knowledge tier linked to techandstream.com/math).

### Return Triggers and Soft Nudges

Return triggers encourage re-engagement without coercion. One such trigger is formalised in the subsequent section on skippable returning suggestions.

### Social and Knowledge Dimensions

Where authentication and optional chat or profile settings exist, personalisation may draw upon those signals.  
Social features, if introduced later, remain strictly opt-in and never required for progression.

### Guardrails

- No variable-ratio reward schedules designed to induce compulsion.
- No paywalls or energy systems that block reading.
- All progression data remain under user control (exportable, deletable).
- The system respects the non-destructive principle relative to existing Tech & Stream surfaces.

## Core Loop (Operational Summary)

- Reading time, documents completed, and successful uploads award experience points (XP).
- Accumulation of XP advances the user through discrete levels.
- Levels unlock cosmetic themes, advanced scroll presets, and contextual external knowledge links.

## External Knowledge Mapping

Quests and unlocks map to nodes on techandstream.com:

- savoirs — conceptual depth.
- dev — implementation patterns.
- math — algorithmic foundations (including the chunking and integrity model).

## Storage and Privacy

Progress is stored locally by default.  
Optional authenticated cloud synchronisation may be offered; it is never required for core features.

## Non-Gating Principle

No level, quest, or progression state may disable or restrict the fundamental ability to upload, store, or read documents.

---

Previous: [04-Reader-Viewer-Features](04-Reader-Viewer-Features.md)  
Next: [05b-Skippable-Returning-Suggestions](05b-Skippable-Returning-Suggestions.md)
