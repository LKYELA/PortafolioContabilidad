# Template: Debug Log Entry

Copy this block into the project's `DEBUG_LOG.md` or project wiki after each fix.
Do not include sensitive data (API keys, PII, tokens).

---

## [YYYY-MM-DD] Bug: <short summary>

### Reporter / Context
- Reported by: @<handle or "internal review">
- Environment: <env — prod / staging / local>
- Severity: [Critical / High / Medium / Low]

### Symptom

```
<error message, screenshot, or behavior description>
```

### Reproduction Steps
1.
2.

### Root Cause

```
<one sentence as identified in Phase 3>
```

### Fix Applied

```diff
<smallest possible diff — do not paste the full file>
```

### Why This Fixes It

```
<one sentence at the code-path level>
```

### Regression Test

- Test file:
- Test name / line:
- `RT: <short description>`

### Stack Trace / Diagnostic Log (full)

```
<paste full log here if needed — keep outside markdown code block if >200 lines>
```
