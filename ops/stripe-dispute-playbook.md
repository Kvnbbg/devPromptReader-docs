# Stripe dispute playbook (merchant ops)

Reusable template. **Do not commit cardholder PII or full charge IDs of open cases to a public repo.** Keep case files private.

## Before the deadline

1. Open Dashboard → Payment → Dispute.
2. Note: reason code, amount, due date, fees already debited.
3. Decide: **counter** (if delivery/access evidence exists) or **accept** (if cost of fees already exceeds recoverable amount and evidence is weak).

## Fraud / 10.4 — evidence that helps

- Authorization + CVC/AVS results
- Product description + URL + terms accepted at checkout
- Digital delivery logs (account access, download, credit grant) with timestamps
- Customer communications
- Stripe Smart Disputes compiled pack + optional shipping/access fields

## Evidence that often fails alone

- Guest checkout with empty email/phone
- Card name "Test" or placeholder
- No proof the buyer received the digital good

## Response structure (attach in Dashboard)

1. One-page chronology (payment → early fraud warning → dispute opened → response).
2. Short statement: authorized payment, what was sold, what evidence is attached.
3. Files: screenshots of successful charge, terms, access logs.

## After the case

- Record decision and date in an internal register.
- Tighten Radar / require email / prefer 3-D Secure for high-risk geo.
- Never store full PAN; use Stripe Dashboard exports only.

## Legal note

Card-network disputes are not the same as a court (tribunal). For state-court claims, retain counsel. This playbook is operational, not legal advice.
