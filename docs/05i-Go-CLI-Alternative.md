# 05i — Terminal CLI: Go Version of devPromptReader

## Command Name and Accessibility

The terminal realisation is installed and invoked as the single command:

```text
devPromptReader
```

After installation (for example via `go install` or a released binary placed on `PATH`), the user may type `devPromptReader` followed by subcommands. No other binary name is required for the core CLI surface.

## Purpose

Provide a symbiotic, offline-capable companion to the browser reader that:

- fetches and normalises allow-listed RSS/Atom feeds;
- lists, inspects, and optionally verifies local document metadata (including Merkle roots);
- exposes progression-vector summaries stored in a local profile file;
- never gates reading or upload behind network or account requirements.

The CLI does not replace the web reader; it complements it for terminal workflows, CI, and headless pre-processing.

## Recommended Subcommands

| Subcommand | Role |
|------------|------|
| `devPromptReader feed [url]` | Fetch and print a bounded list of items from an allow-listed feed (default: home RSS). |
| `devPromptReader docs list` | List locally registered documents and their integrity roots when present. |
| `devPromptReader docs verify <path>` | Recompute SHA-256 / Merkle summary for a local file. |
| `devPromptReader status` | Show local progression vectors and profile summary. |
| `devPromptReader version` | Print CLI and documentation compatibility version. |

## Illustrative Go Entry Point

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

var allowedHosts = map[string]struct{}{
	"www.techandstream.com": {},
	"techandstream.com":     {},
	"www.kevinmarville.com": {},
}

func originAllowed(raw string) bool {
	u, err := url.Parse(raw)
	if err != nil {
		return false
	}
	_, ok := allowedHosts[u.Hostname()]
	return ok
}

func cmdFeed(args []string) {
	feedURL := "https://www.techandstream.com/rss.xml"
	if len(args) > 0 {
		feedURL = args[0]
	}
	if !originAllowed(feedURL) {
		log.Fatal("origin not in allow-list")
	}
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	fp := gofeed.NewParser()
	fp.UserAgent = "devPromptReader/0.6"
	feed, err := fp.ParseURLWithContext(feedURL, ctx)
	if err != nil {
		log.Fatal(err)
	}
	n := 5
	if len(feed.Items) < n {
		n = len(feed.Items)
	}
	for i := 0; i < n; i++ {
		it := feed.Items[i]
		fmt.Printf("%d. %s\n   %s\n", i+1, it.Title, it.Link)
	}
}

func main() {
	if len(os.Args) < 2 {
		fmt.Println("usage: devPromptReader <feed|docs|status|version> ...")
		os.Exit(1)
	}
	switch os.Args[1] {
	case "feed":
		cmdFeed(os.Args[2:])
	case "version":
		fmt.Println("devPromptReader 0.6.0 (docs 0.6.0)")
	default:
		fmt.Println("usage: devPromptReader <feed|docs|status|version> ...")
		os.Exit(1)
	}
}
```

Build and install example:

```bash
go build -o devPromptReader .
# or
go install  # produces $GOPATH/bin/devPromptReader when module main is named accordingly
```

## Security Alignment

- Origin allow-list before network access.
- Timeouts on all outbound requests.
- No execution of remote content beyond structured feed fields.
- Local document verification uses only standard cryptographic primitives (SHA-256).

## Symbiosis

CLI output (JSON or plain text) may seed the browser reader cache. The browser path remains the primary interactive reader; the CLI is the terminal counterpart accessible via the command `devPromptReader`.

---

Previous: [05h-Functional-Component-Flow](05h-Functional-Component-Flow.md)  
Next: [05j-MMORPG-Game-Mechanics](05j-MMORPG-Game-Mechanics.md)
