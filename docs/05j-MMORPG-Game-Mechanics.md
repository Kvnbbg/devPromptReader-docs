# 05j — MMORPG Game Mechanics (Including Terminal-Based)

## Scope

This page extends prior progression and economy material with explicit attention to **terminal-based** MMORPG-style mechanics: text or TUI loops that remain fully usable inside a shell and that can be driven by the `devPromptReader` CLI.

## Terminal-Compatible Mechanical Families

### 1. Text Core Loops

- Micro: print a short status line after a successful `feed` or `docs verify` invocation.
- Session: complete a local document inspection or a bounded feed read; award a local XP delta stored in a profile file.
- Return: a future scheduled or manual CLI run can surface a one-line “suggestion” (equivalent of the skippable card) without blocking the shell.

### 2. Persistent Profile (File-Backed)

A simple local file (for example JSON or SQLite) records vector totals, last feed ETag, and preferred theme tokens. This mirrors persistent character investment without requiring a graphical client.

### 3. Collection via Completion Flags

Document paths that have been verified or marked read accumulate in a completion set. Listing that set (`devPromptReader docs list`) supplies a lightweight collection view in pure text.

### 4. Absence of Loss and Stamina

No mechanic may revoke reading rights or impose energy costs that block `docs` or `feed` subcommands. Terminal users must always be able to inspect local files offline.

### 5. Social Layers

Guilds, chat, and leaderboards remain out of scope for the CLI core. Any future multi-user feature must be opt-in and must not affect offline commands.

## Compatibility Filter (Terminal Edition)

A mechanic is admitted only when it:

- works in a non-interactive or lightly interactive terminal;
- stores state locally without mandatory network;
- never gates `devPromptReader docs` or local verification;
- can be expressed with the multi-vector model already defined;
- produces output suitable for piping or scripting.

## Mapping to CLI Subcommands

| Mechanic | CLI expression |
|----------|----------------|
| Micro feedback | Exit codes + one-line status on `feed` / `verify` |
| Session reward | Local XP write after successful verify or intentional “mark read” |
| Collection | `docs list` showing completed / verified paths |
| Return suggestion | Optional one-line tip on `status` when cool-down elapsed |
| Economy sink | Optional cosmetic flag in profile; never required for core commands |

---

Previous: [05i-Go-CLI-Alternative](05i-Go-CLI-Alternative.md)  
Next: [05k-RSS-Parsing-Systems-Analysis](05k-RSS-Parsing-Systems-Analysis.md)
