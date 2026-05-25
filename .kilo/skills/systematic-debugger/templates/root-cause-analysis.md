# Template: Root-Cause Analysis Session Notes

Fill this out before writing any fix.
Copy-paste this block into your task ticket, PR body, or commit message.

---

## Bug Summary
```
Title: <one-line summary>
Symptom: <what you see or error message>
Severity: [Critical / High / Medium / Low]
```

## Reproduction Steps
1.
2.

## Isolation
- Affected file(s):
- Affected function(s) / class(es):
- Version / commit where last known good:
- Commit that introduced it (`git bisect` result):

## Hypotheses Tested

| # | Hypothesis | Experiment | Result | Verdict |
|---|------------|-----------|--------|---------|
| 1 |            |           |        |         |
| 2 |            |           |        |         |
| 3 |            |           |        |         |

## Root Cause (filled after hypothesis validation)
```
<one-sentence explanation of what actually went wrong>
```

## Why Previous Attempts Failed (if applicable)
```
<list before: what was tried and why it didn't work>
```
