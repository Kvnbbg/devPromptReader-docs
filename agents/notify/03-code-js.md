# Code JS — SoftNoticeQueue

```javascript
// lightweight throttle + coalesce
export function createSoftNoticeQueue({
  minIntervalMs = 5000,
  maxCooldownMs = 60 * 60 * 1000,
} = {}) {
  let queue = [];
  let visible = null;
  let lastShownAt = 0;
  let cooldownMs = minIntervalMs;

  function coalesce(n) {
    const i = queue.findIndex((x) => x.kind === n.kind);
    if (i >= 0) queue[i] = n;
    else queue.push(n);
    queue.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  function enqueue(notice) {
    if ((notice.priority || 0) >= 100 && !visible) {
      visible = notice;
      lastShownAt = Date.now();
      return;
    }
    coalesce(notice);
  }

  function tick(now = Date.now()) {
    if (visible) return visible;
    if (now - lastShownAt < cooldownMs) return null;
    if (!queue.length) return null;
    visible = queue.shift();
    lastShownAt = now;
    return visible;
  }

  function skip() {
    visible = null;
    cooldownMs = Math.min(maxCooldownMs, cooldownMs * 2);
  }

  function dismiss() {
    visible = null;
    cooldownMs = minIntervalMs;
  }

  function getVisible() {
    return visible;
  }

  return { enqueue, tick, skip, dismiss, getVisible };
}
```

## Usage

```javascript
const q = createSoftNoticeQueue();
q.enqueue({ kind: 'tip', text: 'Suggestion lecture', priority: 1 });
setInterval(() => {
  const n = q.tick();
  if (n) renderBanner(n);
}, 1000);
```
