# 05i — Alternative Implementation: Go CLI Version

## Purpose

This page supplies an alternative, server-side or command-line oriented realisation of the feed-parsing and integrity-related portions of the design, expressed in Go. It is intended as a complementary path for offline tooling, CI checks, or a lightweight local CLI that can feed the same normalised item model used by the browser-based reader.

The Go path remains symbiotic: it does not replace the client-side reader; it may pre-process feeds or verify Merkle roots for heavy documents before they enter the local store.

## Recommended Libraries

- Feed parsing: `github.com/mmcdole/gofeed` (universal RSS 2.0 / Atom 1.0 / JSON Feed support, resilient to imperfect feeds).
- Alternative lighter option: `github.com/SlyMarbo/rss` for simpler fetch-and-update loops.
- Cryptographic digests for the upload integrity model: standard library `crypto/sha256`.

## Illustrative Go CLI Sketch

```go
package main

import (
	"context"
	"fmt"
	"log"
	"net/url"
	"os"
	"time"

	"github.com/mmcdole/gofeed"
)

var allowedOrigins = map[string]struct{}{
	"www.techandstream.com": {},
	"techandstream.com":     {},
	"www.kevinmarville.com": {},
}

func originAllowed(raw string) bool {
	u, err := url.Parse(raw)
	if err != nil {
		return false
	}
	_, ok := allowedOrigins[u.Hostname()]
	return ok
}

func main() {
	if len(os.Args) < 2 {
		log.Fatal("usage: devprompt-feed <feed-url>")
	}
	feedURL := os.Args[1]
	if !originAllowed(feedURL) {
		log.Fatal("origin not in allow-list")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	fp := gofeed.NewParser()
	fp.UserAgent = "devPromptReader-cli/0.5"
	feed, err := fp.ParseURLWithContext(feedURL, ctx)
	if err != nil {
		log.Fatal(err)
	}

	limit := 5
	if len(feed.Items) < limit {
		limit = len(feed.Items)
	}
	for i := 0; i < limit; i++ {
		it := feed.Items[i]
		fmt.Printf("- %s\n  %s\n  %s\n", it.Title, it.Link, it.Published)
	}
}
```

## Security and Policy Alignment

- Origin allow-list is enforced before any network request proceeds.
- Request timeout bounds resource consumption.
- No evaluation of remote content beyond structured feed fields.
- Output is plain text or structured JSON suitable for piping into other tools or for seeding the client-side cache.

## Integration with the True Loop

A CI job or local cron may invoke the CLI, write a bounded JSON snapshot of recent items, and place that snapshot where the browser reader can load it offline. The client still performs its own sanitisation and rendering under the layout constraints already defined.

---

Previous: [05h-Functional-Component-Flow](05h-Functional-Component-Flow.md)  
Next: [05j-MMORPG-Game-Mechanics](05j-MMORPG-Game-Mechanics.md)
