# Example: Intermittent Jest Test Failure

## Bug Report
> "Tests fail on CI randomly — about 1 in 3 runs. Locally they always pass."

## Symptom

```
FAIL src/features/ShoppingCart.test.ts
  ✕ renders cart total when items have different VAT rates (42ms)
    ● Error: expect(received).toBe(expected)
       // Received: 119.98
       // Expected: 119.99

  Total tests run: 150
  Passed: 149   Failed: 1
  Duration: 3.2s
```

## Phase 1 — Reproduce

Ran locally 6 times: passed every time.  
Ran on CI 5 times: failed, then failed, then passed, then failed, then passed.

Not reproducible locally under the same Node version. Flag to investigate CI environment differences.

## Phase 2 — Isolate

- Test file: `src/features/ShoppingCart.test.ts`
- Line of failure: assertion at `src/features/ShoppingCart.vatTotal()` return value
- `ShoppingCart.calculateTotal()` uses `Date.now()` to pick the active VAT rate for that fiscal period
- CI clock vs. local clock difference confirmed by logging `Date.now()` in both environments (diff ~4ms): not the root cause yet.

The floating-point comparison `toBe(119.99)` while `calculateTotal()` returns `119.98999999999999` — classic floating-point accumulation artifact. Locally the order of operations happens to produce exactly 119.99; on CI the different scheduler ordering produces a slightly different sum.

## Phase 3 — Root-Cause Analysis

Hypotheses:
1. **H1 — Floating-point accumulation**: the vatTotal uses `+` in a loop, different scheduling order changes the sum slightly → `119.989999…` not `119.990000…`.
   - Experiment: inserted `console.log(calculateTotal().toFixed(2))` in the test. On failing run: `119.98` then `119.989999` then `119.99` on re-run. Confirmed.
2. **H2 — Race condition in VAT rate lookup**: ruled out — rate object is a constant.
3. **H3 — Locale/currency formatting side effect**: ruled out — locale not loaded in unit test.

**Root cause (H1 confirmed):** Floating-point arithmetic in `calculateTotal()` is not rounded before comparison, and CI's scheduling produces a slightly different sum order causing `toBe` to fail on `120.00 - 0.011316… + 0.011316…`.

## Phase 4 — Fix

In `src/features/ShoppingCart.ts`:
- Round `vatTotal` to 2 decimal places using a cent-based helper before returning.

```diff
-  const total = prices.reduce((sum, price) => sum + price, 0);
-  return total * (1 + vatRate);
+  const total = prices.reduce((sum, price) => sum + roundToCents(price), 0);
+  return roundToCents(total * (1 + vatRate));
```

```typescript
function roundToCents(value: number): number {
  return Math.round(value * 100) / 100;
}
```

## Phase 5 — Verify

- Re-ran failing test locally 20x — 20 passes (no regression).
- Re-ran full suite locally: 150/150 pass.
- Pushed to CI: green on first run, confirmed with 3 consecutive re-runs.

## Root cause statement
`calculateTotal()` did not round monetary values to cents before returning, so floating-point accumulation order differences caused `toBe` assertions to intermittently fail.

## Commit message

```
fix: round monetary values to cents before returning from calculateTotal()

Root cause: Floating-point imprecision in calculateTotal() produces
119.9899… instead of 119.99 when the sum order differs between CI and local.

Why the fix works: roundToCents() is applied to every price and to the final
total before returning, so the caller always receives a 2-decimal value.

RT: src/features/ShoppingCart.test.ts::Cart total always rounds to cents
```
