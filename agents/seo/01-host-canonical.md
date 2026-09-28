# Task 01 — Host + canonical

## Goal

One host. One canonical. No conflict.

## Steps

1. Choose policy: A (apex) or B (www).
2. Set permanent redirect 301 (not 307).
3. Set `<link rel="canonical">` to the same host on all main pages.
4. Set `og:url` to the same host.
5. Verify:
   - curl -sI https://techandstream.com/ → 301 to chosen host
   - curl -sI https://www.techandstream.com/ → 200 on chosen host (or 301 to it)
   - HTML canonical matches chosen host

## Do not

- Do not change robots AI blocks.
- Do not delete pages.

## Output

POLICY=
REDIRECT=
CANONICAL=
VERIFY_OK=yes|no

## Status

TODO
