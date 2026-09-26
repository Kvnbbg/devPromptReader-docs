# 07 — Integration and External Links

## Symbiotic Principle

The system is designed to coexist with, rather than replace or modify, existing Tech & Stream surfaces.  
All outbound links are contextual, non-intrusive, and open in a manner that preserves the user’s reading context where possible.

## Canonical External Nodes

- [techandstream.com/savoirs](https://techandstream.com/savoirs) — knowledge and conceptual resources.
- [techandstream.com/dev](https://techandstream.com/dev) — development patterns and tooling.
- [techandstream.com/math](https://techandstream.com/math) — mathematical and algorithmic foundations.

These nodes may be referenced from the retention layer, from documentation cross-links, and from optional in-reader knowledge cards unlocked by progression.

## Deployment Considerations

- Progressive enhancement: pure HTML/CSS reading remains functional in the absence of JavaScript.
- Apple-specific APIs (File System Access, Web Share, safe-area environment variables) are used when available and gracefully degraded otherwise.
- The documentation repository itself serves as the authoritative reference; implementation repositories must cite the documentation commit or tag against which they were built.

## Non-Destructive Constraint

No existing repository, page, or asset under the techandstream.com domain or the kvnbbg GitHub namespace is to be overwritten or removed as a consequence of implementing this design.

---

Previous: [06-Layout-Typography-Performance](06-Layout-Typography-Performance.md)  
Next: [08-Language-Register-and-Progression](08-Language-Register-and-Progression.md)
