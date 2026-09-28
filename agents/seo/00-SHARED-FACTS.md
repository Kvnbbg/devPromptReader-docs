# Shared facts

SITE_WWW=https://www.techandstream.com
SITE_APEX=https://techandstream.com
CANONICAL_DECLARED=https://techandstream.com/
REDIRECT_OBSERVED=apex 307 to www
SITEMAP=https://techandstream.com/sitemap.xml
ROBOTS=https://techandstream.com/robots.txt
GOOGLEBOT=Allow
AI_BOTS=Disallow (keep)

# Conflict

Canonical says apex. Live redirect sends users to www.
Fix: one host only. Prefer either:

A) 301 www → apex + canonical apex
B) 301 apex → www + canonical www

Pick one. Apply everywhere.
