# 05j — Further Exploration of MMORPG Game Mechanics

## Scope

This page extends the earlier treatment of progression vectors and economy systems by examining additional classic MMORPG mechanical families and mapping only those that remain compatible with a non-gating, offline-first document reader.

## Mechanical Families Examined

### 1. Core Gameplay Loop Granularity

- Nano / micro loops (seconds to minutes): immediate feedback after a page turn or a short auto-scroll interval.
- Session loops (minutes to an hour): complete a document, receive a modest XP packet, optionally open a knowledge card.
- Daily / return loops: the skippable returning suggestion already specified.
- Seasonal or knowledge arcs: longer collections of related reading mapped to savoirs / dev / math / Money Quest.

Only the first three are required for a minimal viable retention layer; the fourth is optional and content-driven.

### 2. Character / Profile Persistence

Persistent local profile (themes, scroll presets, vector totals) mirrors the “persistent profile investment” mechanic. Loss of the profile would feel costly; therefore export and backup of local state are recommended but never mandatory for reading.

### 3. Collection and Completionism

Document completion flags and optional knowledge-card collections supply a light collection mechanic without inventory management or tradable items.

### 4. Risk and Loss Avoidance

Classic MMORPGs use death penalties or item loss as sinks. In the present design, the only “loss” is the voluntary decision not to claim a cosmetic unlock. No reading progress is ever revoked.

### 5. Social and Competitive Layers

Guilds, leaderboards, and PvP are deliberately omitted from the core specification. Any future social feature must remain opt-in and must not affect the ability to read or upload.

## Compatibility Filter

A mechanic is admitted into the design only when it satisfies all of the following:

- does not gate core reading or CRUD;
- does not introduce tradable currency or real-money pressure;
- remains functional offline after the initial data load;
- respects the single-column mobile layout and 44 px touch targets;
- can be expressed with the existing multi-vector progression model.

Mechanics that fail the filter (for example, stamina systems that block reading, or auction houses) are recorded as out of scope.

---

Previous: [05i-Go-CLI-Alternative](05i-Go-CLI-Alternative.md)  
Next: [05k-RSS-Parsing-Systems-Analysis](05k-RSS-Parsing-Systems-Analysis.md)
