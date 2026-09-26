# 05b — Skippable Returning Suggestions and Personalised Notifications

## Purpose

After a configurable period of inactivity or after a reading session ends, the application may present a **skippable suggestion** inviting the user to engage with additional material.  
The suggestion is designed to return after a further delay if dismissed, thereby functioning as a gentle return trigger without persistent interruption.

## Behavioural Specification

1. **Trigger conditions** (any combination, configurable):
   - Elapsed time since last session exceeds a threshold (default example: 12–24 hours).
   - Current reading session reaches a natural pause (end of document, user-initiated pause of auto-scroll).
   - User has previously opted into notifications or personalisation features.

2. **Presentation**:
   - Non-modal, non-blocking card or banner occupying limited vertical space.
   - Clear “Skip” / “Later” control of minimum 44 px touch target.
   - Optional “Do not show again for X days” preference stored locally or in the authenticated profile.

3. **Returning behaviour**:
   - If skipped, the same or a rotated suggestion reappears after a longer cool-down interval.
   - Frequency is capped to avoid fatigue (maximum one suggestion per defined window).

## Personalisation Sources

When the user is authenticated and has configured relevant preferences, the suggestion content may be personalised from:

- Authentication sign-in status and associated profile settings.
- Optional chat history or interaction signals (strictly with explicit consent and local or encrypted storage).
- Declared interests or reading preferences stored in the user profile.

Personalisation remains optional. Unauthenticated or privacy-restricted users receive generic, high-quality suggestions drawn from the knowledge nodes.

## Content Sources for Suggestions

Suggested reading may include:

- Material drawn from the dry RSS or feed surfaces of techandstream.com/savoirs and techandstream.com/dev (when such feeds are available and stable).
- Official public information via a secure new-tab link to the French government actualité page:  
  [https://www.info.gouv.fr/toute-l-actualite](https://www.info.gouv.fr/toute-l-actualite)

## Secure New-Tab Opening

All external links opened from suggestions **must** use the following attributes for security and privacy:

```html
<a href="https://www.info.gouv.fr/toute-l-actualite"
   target="_blank"
   rel="noopener noreferrer">
  Consulter l’actualité officielle (ouvre un nouvel onglet)
</a>
```

- `target="_blank"` opens a new browsing context.
- `rel="noopener"` (now implicit in modern browsers for `target="_blank"`, yet still declared for clarity and older environments) prevents the new page from accessing `window.opener`.
- `rel="noreferrer"` additionally suppresses the Referer header when privacy is desired.

The link text or an adjacent accessible label must indicate that a new tab will open.

Alternative or complementary RSS-derived items from /savoirs and /dev follow the identical secure-opening pattern.

## Integration with Progression

Accepting a suggestion and completing the linked reading may award a modest XP increment, reinforcing the meta-loop without obligation.  
Skipping never incurs a penalty.

## Privacy and Consent

- Notification permission is requested only when the user enables the feature.
- Profile-derived personalisation requires prior consent.
- All suggestion state is user-controllable and deletable.

---

Previous: [05-Retention-Layer-MMORPG](05-Retention-Layer-MMORPG.md)  
Next: [05c-Semantic-Versioning](05c-Semantic-Versioning.md)
