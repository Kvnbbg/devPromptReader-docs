# SEO Agent Swarm — Guide for low / tiny models

## Rule

1. Read only ONE task file at a time.
2. Do only what that file says.
3. Write result in the DONE section of that file (or report status).
4. Do not edit other task files unless your task says so.
5. Do not destroy existing site assets.

## Order

Execute tasks in number order:

1. `01-host-canonical.md`
2. `02-search-console.md`
3. `03-titles-unique.md`
4. `04-internal-links.md`
5. `05-jsonld-check.md`
6. `06-cwv-mobile.md`

## Shared facts (read once)

- Site: `https://www.techandstream.com` and `https://techandstream.com`
- Canonical today: `https://techandstream.com/` (no www)
- Redirect today: no-www → www (307) — CONFLICT
- Sitemap: `https://techandstream.com/sitemap.xml`
- Googlebot: allowed in robots.txt
- AI scrapers: blocked on purpose — do not unblock

## Success

All task files show status DONE or BLOCKED with reason.
