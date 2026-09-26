# 05f — MMORPG Economy Systems Exploration

## Core Concepts

Virtual economies in MMORPGs are commonly modelled with the faucet–sink (or source–sink) framework.

- **Faucets (sources)**: mechanisms that introduce currency or valuable resources into the system (quest rewards, combat loot, crafting yields, daily login bonuses, reading-time XP conversion).
- **Sinks (drains)**: mechanisms that permanently remove currency or resources (repair fees, vendor purchases that destroy gold, listing fees, consumable expenditure, intentional destruction of items).

Without adequate sinks, continuous faucet activity produces inflation, eroding the perceived value of currency and items.

## Design Principles Relevant to Retention Layers

1. **Controlled inflow**: faucets should scale with meaningful activity rather than pure time-on-site.
2. **Meaningful sinks**: sinks should feel consequential yet never block core functionality.
3. **Soft limits**: wallet or inventory caps, when used, must be framed as diegetic constraints rather than arbitrary barriers.
4. **No real-money trading pressure**: the present system awards only non-transferable progression tokens and cosmetic unlocks; no tradable virtual currency is introduced.
5. **Player-centric accounting**: because social trading is absent by design, variance is low and balance remains predictable.

## Application to devPromptReader

- **Faucets**: reading time, document completion, verified uploads, and acceptance of knowledge suggestions award XP or domain-specific tokens.
- **Sinks**: cosmetic unlocks, advanced scroll presets, and optional knowledge-card expansions consume tokens. Tokens are never required for reading or CRUD.
- **No inflation vector**: tokens are non-tradable and non-convertible to real currency; their sole purpose is local progression signalling.
- **Symbiosis with Money Quest**: any cross-credit with Money Quest remains advisory and optional; it does not create a shared tradable currency.

This lightweight economy supports the true retention loop (action → reward → optional re-engagement) without introducing economic complexity that could compromise the offline-first or free-core guarantees.

---

Previous: [05e-RSS-Feed-Parsing-and-Symbiosis](05e-RSS-Feed-Parsing-and-Symbiosis.md)  
Next: [05g-RSS-Parsing-Implementation](05g-RSS-Parsing-Implementation.md)
