# Example: Production NullPointerException (Java)

## Bug Report
> "Getting a 500 on the /api/invoices endpoint randomly. Logs show a NullPointerException at InvoicesController.java:142 but no other info."

## Symptom

```
HTTP 500 Internal Server Error — /api/invoices?user_id=42
NullPointerException: Cannot invoke
  "com.example.models.Invoice.amount()" because "invoice" is null
    at com.example.api.InvoicesController.getInvoice(InvoicesController.java:142)
    at com.example.api.InvoicesController$$FastClassBySpringCGLIB$$...
```

## Phase 1 — Reproduce

- Reproduced locally: `curl http://localhost:8080/api/invoices?user_id=42` → 500 every time.
- `user_id = 42` is a test account added last week; no corresponding record in the `invoices` table.

## Phase 2 — Isolate

Affected code path:
```
InvoicesController.getInvoice  line 142
  → InvoiceService.findByUserId  line 58
    → invoiceRepository.findByUserId
      → Optional<Invoice> — returns empty Optional for user_id 42
```

`InvoiceRepository.findByUserId` (line 58) returns `Optional.empty()` when the user has no invoices.  
`InvoiceService` converts it to `null`.  
`InvoicesController` (line 142) calls `invoice.amount()` without a null guard.

## Phase 3 — Root-Cause Analysis

Hypotheses:
1. **H1 — `invoice` is null because service returns null on empty Optional**: log the return value of `findByUserId` in the service → confirmed: `Optional.empty()` for user 42.
2. **H2 — Wrong DB column / query filter**: `SELECT * FROM invoices WHERE user_id = ?` — correct query, userId 42 simply has no invoices. Ruled out.
3. **H3 — Concurrent delete between the two service calls**: not possible — single fetch, no intermediate steps. Ruled out.

**Root cause (H1 confirmed):** `InvoiceService.findByUserId` returns `null` instead of `Optional.empty()` or a `NoSuchElementException` with context when the user has no invoices. `InvoicesController` calls `invoice.amount()` without checking for null.

## Phase 4 — Fix

In `InvoiceService.findByUserId`:
- Return `Optional.empty()` instead of `null` when no invoice is found.

```diff
-  return repo.findByUserId(userId).orElse(null);
+  return repo.findByUserId(userId);
```

In `InvoicesController.getInvoice`:
- Short-circuit with HTTP 404 before calling `invoice.amount()`.

```diff
-  Invoice invoice = invoiceService.findByUserId(userId);
-  return ResponseEntity.ok(invoice.amount());
+  Optional<Invoice> opt = invoiceService.findByUserId(userId);
+  if (opt.isEmpty()) {
+    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
+  }
+  Invoice invoice = opt.get();
+  return ResponseEntity.ok(invoice.amount());
```

### Risk note
Changing the return type of `findByUserId` from `Invoice or null` to `Optional<Invoice>` is a breaking API change for any callers that assume non-null. Before merging:
- Grepped for `findByUserId(` across all files; only two callers — both updated in the same PR.
- Checked for serialized contracts (Swagger/OpenAPI) — endpoint spec updated in the PR.

## Phase 5 — Verify

1. **Manually:** `curl http://localhost:8080/api/invoices?user_id=42` → `HTTP 404` ✓
2. **Unit test (new):** `InvoiceControllerTest.missingInvoiceReturns404()` → PASS ✓
3. **Unit test (existing):** All 340 existing controller tests → PASS ✓
4. **Staging smoke test:** `/api/invoices?user_id=1` → 200 with expected body ✓

## Phase 6 — Document & Close

```
fix: return 404 when invoice not found instead of NPE

Root cause: InvoiceService.findByUserId returned null on empty Optional
instead of Optional.empty(), and InvoicesController accessed invoice.amount()
without a null guard, producing a NullPointerException.

Why the fix works: findInvoice now returns Optional<Invoice> consistently;
the controller short-circuits with 404 before dereferencing.

RT: InvoiceControllerTest.missingInvoiceReturns404
```
