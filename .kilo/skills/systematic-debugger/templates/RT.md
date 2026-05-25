# Template: Minimal Reproduction Script

Use this script when submitting a bug fix PR or asking for help.
Save it as `reproduce.sh`, `reproduce.py`, or `reproduce.ts` in the project root.

---

## Shell / CLI

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "=== Step 1: Build the project ==="
npm install
npm run build

echo "=== Step 2: Start the server ==="
npm run dev &
SERVER_PID=$!
sleep 3

echo "=== Step 3: Reproduce the bug ==="
# Replace with your exact command/request that triggers the bug
curl -s http://localhost:3000/api/endpoint | jq .

echo "=== Step 4: Expected vs. Actual ==="
echo "Expected: <what you expect>"
# echo the actual output above

echo "=== Step 5: Clean up ==="
kill $SERVER_PID 2>/dev/null || true
```

---

## Python

```python
#!/usr/bin/env python3
"""
Minimal reproduction for: <bug title>

Steps (run in order):
1. <prerequisite step>
2. <trigger action>
3. Observe <what to look for>

Expected: <expected behavior>
Actual:   <actual behavior>
"""

def reproduce():
    # Step 1
    setup()

    # Step 2 — trigger the bug
    result = trigger_condition()
    return result


def setup():
    pass  # TODO: define


def trigger_condition():
    pass  # TODO: define


if __name__ == "__main__":
    result = reproduce()
    print("Result:", result)
```

---

## Node / TypeScript

```typescript
#!/usr/bin/env ts-node

/**
 * Minimal reproduction for: <bug title>
 *
 * Steps:
 *   1. <prerequisite>
 *   2. <trigger action>
 *
 * Expected: <expected behavior>
 * Actual:   <actual behavior>
 */

async function reproduce() {
  // Step 1
  await setup();

  // Step 2 — trigger the bug
  const result = await triggerCondition();
  console.log("Result:", result);
}

async function setup() {
  // TODO: define
}

async function triggerCondition() {
  // TODO: define
  throw new Error("not implemented");
}

reproduce().catch(console.error);
```
