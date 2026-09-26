# 05h — Complete Functional Component Flow

home → devPrompt → onclick.user_select → devPromptReader

## Purpose

This page defines the end-to-end interaction sequence that realises the symbiotic relationship among the home surface, the prompt-generation entry point, user selection, and the document reader itself. The flow is deliberately linear at the high level while remaining interruptible and offline-tolerant at each step.

## Sequence

1. **Home**  
   The user lands on the Tech & Stream home surface. Mobile navigation is already collapsed to a single column. Feed-derived teasers (“Derniers du feed”) and entry points for Money Quest, Math-related knowledge, and the prompt generator are visible without horizontal scroll.

2. **devPrompt**  
   The user activates the prompt-generation control (or an equivalent “French-dev-ai-tools” entry). A lightweight prompt interface appears. No heavy document is required at this stage. The interface respects the 44 px minimum touch target and progressive-disclosure language rules.

3. **onclick.user_select**  
   The user selects an action that implies document interaction (upload, open existing local document, or accept a feed-derived suggestion). The selection event carries a minimal payload: document identifier or file handle, optional progression-vector hints, and any personalisation flags derived from authenticated profile settings (when present).

4. **devPromptReader**  
   Control transfers to the reader component. The reader:
   - initialises from local storage / OPFS when offline;
   - applies the current theme, typography, and auto-scroll parameters;
   - if a feed suggestion was the trigger, may surface a single knowledge card drawn from the cached RSS/Atom items;
   - awards progression vectors only after meaningful reading activity;
   - never blocks core reading behind economy or level gates.

## Alternative Lightweight Component Sketch (Illustrative)

```javascript
// Pseudocode illustrating the control hand-off. Framework-agnostic.
function onHomePromptActivate() {
  showDevPromptUI({ onSelect: handleUserSelect });
}

function handleUserSelect(selection) {
  // selection = { type: 'upload'|'local'|'feed-item', payload, vectors? }
  const readerState = prepareReaderState(selection);
  navigateToReader(readerState); // or mount <DevPromptReader state={readerState} />
}

function prepareReaderState(selection) {
  return {
    documentRef: selection.payload,
    theme: loadUserTheme(),
    scrollParams: loadScrollParams(),
    knowledgeHints: selection.type === 'feed-item' ? [selection.payload] : [],
    progressionContext: selection.vectors || {}
  };
}
```

The sketch emphasises a single direction of control flow and the absence of hidden side-effects that would break the offline-first or non-destructive guarantees.

## Closure of the True Loop

After the reader session ends (document closed, suggestion skipped, or explicit return), control returns either to the home surface or to a lightweight post-session summary that may award modest XP and offer the next skippable suggestion. The economy system (token sinks for cosmetic unlocks) is consulted only if the user voluntarily opens the customisation panel.

This completes a fully functional, reasonably secure, and lightweight path from home through selection into the reader while preserving every constraint established in the preceding documentation pages.

---

Previous: [05g-RSS-Parsing-Implementation](05g-RSS-Parsing-Implementation.md)  
Next: [06-Layout-Typography-Performance](06-Layout-Typography-Performance.md)
