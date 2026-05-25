# Template: Post-Mortem Report

Use after fixing a high-severity or production-impacting bug.
Send in the PR or ticket closing the issue.

---

## Incident Overview
| Field | Value |
|-------|-------|
| Bug title | |
| Report date | |
| Environment | |
| Severity | [Critical / High / Medium / Low] |
| Owner | @user |
| Affected versions | |

## What Happened

```
<2-sentence description of the symptom and its impact>
```

## Timeline

| Time (UTC) | Event |
|-----------|-------|
|           | Bug introduced by commit <SHA> |
|           | Incorrect behavior first observed |
|           | Reported by |
|           | Root cause identified |
|           | Fix committed |
|           | Verification confirmed |

## Root Cause

```
<1–3 sentence explanation. Code cause only — not "tests were missing" unless that’s the actual cause.>
```

## Symptoms and Detection

- **First observed:** <where and how it surfaced>
- **Detection gaps:** <why existing monitoring / tests didn’t catch it>
- **Why it wasn’t caught in CI:** <specific reason>

## The Fix

```diff
<minimal diff starting from the root cause change>
```

## Impact Summary

| Dimension | Detail |
|-----------|--------|
| Estimated downtime | |
| Estimated number of users affected | |
| Data loss | [Yes / No — detail if yes] |

## Prevention

- [ ] Regression test added: `<file:line>`
- [ ] Alerting / monitoring improved: `<description>`
- [ ] CI / lint rule added: `<description>`
- [ ] Code-review checklist updated: `<description>`
- [ ] Next review in 2 weeks to verify no recurrence

## Lessons Learned (optional)

```
<1–2 bullets on what the team learned>
```
