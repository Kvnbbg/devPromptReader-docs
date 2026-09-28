# Go note

CLI `devPromptReader` does not show UI banners.
Throttle applies only if CLI prints tips:

- max one tip line per run
- or respect last_tip_at file mtime + MIN_INTERVAL

No continuous notify loop in CLI.
