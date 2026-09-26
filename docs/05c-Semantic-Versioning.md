# 05c — Semantic Versioning Investigation and Application

## Investigation Summary

Semantic Versioning (SemVer) is a formal convention for communicating the nature of changes in a software artefact through a three-part version number of the form MAJOR.MINOR.PATCH.

The authoritative specification is Semantic Versioning 2.0.0 (semver.org / GitHub semver/semver).

### Core Rules

Given a version number MAJOR.MINOR.PATCH:

1. **MAJOR** is incremented when incompatible (breaking) changes are introduced to the public API or documented behaviour.
2. **MINOR** is incremented when new, backward-compatible functionality is added.
3. **PATCH** is incremented when backward-compatible bug fixes are introduced.

Additional conventions:

- Pre-release versions may append a hyphen and identifier (e.g., 1.0.0-alpha.1, 1.0.0-rc.1).
- Build metadata may be appended with a plus sign.
- Version 0.y.z denotes initial development; the public API is not considered stable.
- Once a version is released, its contents must not be modified; any change requires a new version.

### Rationale for Adoption in the Present Project

- Clear signalling of compatibility risk to implementers and downstream consumers of the documentation and of any future reference implementation.
- Alignment with widely understood package-management expectations (npm, and analogous systems).
- Support for disciplined evolution of the retention layer, mathematical upload model, and reader features without silent breakage.

## Recommended Versioning Policy for This Documentation Repository

- Documentation releases follow SemVer.
- A change that alters required reading order, mandatory constraints, or the mathematical integrity model constitutes a MAJOR increment.
- Addition of new optional pages, expanded explanations, or non-breaking clarifications constitutes a MINOR increment.
- Typographical corrections, link updates, and purely editorial improvements constitute a PATCH increment.
- The README and process page must record the current documentation version and the commit or tag against which implementations should be validated.

## Relationship to Implementation Repositories

Any code repository that realises devPromptReader should declare a dependency on, or at least cite, a specific documentation version (tag or commit SHA).  
Breaking changes in the documentation trigger a corresponding MAJOR version bump in dependent implementations when public contracts are affected.

---

Previous: [05b-Skippable-Returning-Suggestions](05b-Skippable-Returning-Suggestions.md)  
Next: [06-Layout-Typography-Performance](06-Layout-Typography-Performance.md)
