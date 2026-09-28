# Orchestrator (tiny model)

## Loop

```
for task in 01 02 03 04 05 06:
  open agents/seo/{task}-*.md
  read Goal + Steps only
  execute
  fill Output
  set Status DONE or BLOCKED
  stop if BLOCKED and need human
```

## Parallel

- 03 and 04 may run in parallel after 01 is DONE.
- 02 needs 01 host choice DONE.
- 05 and 06 may run in parallel after 01.

## Stop conditions

- Status BLOCKED + reason written
- Or all six DONE

## Report format

```
01: DONE|BLOCKED
02: DONE|BLOCKED
03: DONE|BLOCKED
04: DONE|BLOCKED
05: DONE|BLOCKED
06: DONE|BLOCKED
```
