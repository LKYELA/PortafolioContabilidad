---
name: systematic-debugger
description: A methodical debugging skill that guides the agent through error reproduction, root cause analysis, hypothesis testing, fix implementation, verification, and documentation. Use when the user reports a bug, error message, unexpected behavior, or code failure.
version: 1.0.0
author: User
triggers:
  - debug
  - bug
  - error
  - fix
  - broken
  - fails
  - unexpected behavior
  - stack trace
  - exception
  - not working
  - investigate
  - troubleshoot
---

# Systematic Debugger

This skill enforces a structured, methodical approach to every bug. The goal is root-cause fixes, not random patches. The pipeline below is sequential — do not proceed to the next phase until the current one is satisfied.

---

## Phase 1 — Reproduce

Before editing anything, confirm the failure is real and reproducible.

**Steps**
1. Restate the symptom verbatim: visible output, error message, stack trace line:number, or failing assertion.
2. Find the smallest input / scenario that triggers the failure.
3. Capture evidence — screenshot, terminal output, test failure log, network response body.
4. Record every reproduction step so it can be re-run after the fix.

**Allowed**
- Restart services, reinstall deps, clear caches — anything to reach a clean starting state.

**Forbidden**
- Do not edit code before you have at least one confirmed failure signal.
- Do not assume the stack trace frame is the root cause.
- Do not reproduce mentally — run the steps and capture real output.

---

## Phase 2 — Isolate

Narrow the search space to a specific file, function, or data path before forming hypotheses.

**Steps**
1. Map the symptom to the affected layer: UI, business logic, data access, infra/config, or a dependency.
2. Check git history on the affected area: `git log -p --all -S "<keyword>"`, `git blame`, `git bisect`.
3. Read the code in the identified area along with adjacent modules or dependency docs.
4. Build a focused reproduction — a unit test, a standalone script, or a minimal HTML page — that exercises only the broken path.
5. Eliminate variables: comment out unrelated code paths, add temporary `console.log` / breakpoints to confirm execution order.

**Output of this phase**
You can point to a specific file and line range and say "the bug is somewhere in here."

**Isolation quality bar**
- If you cannot name the affected file within 10 minutes of reading the error, broaden your search rather than trying direct fixes.

---

## Phase 3 — Root-Cause Analysis

Form and test hypotheses against evidence, not against gut feel.

**Steps**
1. List all plausible root causes (usually 2–5).
2. For each hypothesis, design one low-cost experiment: a log line, a breakpoint, a network assertion, a computed-style read, or a state diff.
3. Run experiments one at a time; record the result.
4. Stop when the evidence points to one cause, and state it explicitly before touching any fix.

**Diagnostic checklist**
- Is the error thrown, silently swallowed, or swallowed by a catch with an empty body?
- Is a `null` / `undefined` / `NaN` value propagating through the call chain?
- Is there a race condition, timing dependency, or un-awaited promise?
- Is a stale cache or outdated state being returned?
- Is a dependency or API returning an unexpected shape or status?
- Are environment variables, config values, or secrets resolved differently in this context?

**Root-cause quality bar**
- "It's probably a cache issue" is not a confirmed root cause — show the entire stale-response lifecycle before fixing.

---

## Phase 4 — Fix (Minimal, Rooted)

Fix the root cause, nothing more and nothing less.

**Steps**
1. Formulate the fix as a resolution of the confirmed root cause.
2. Write the smallest change that blocks that cause.
3. If the fix touches multiple files, understand the dependency chain before editing — do not spread changes across files without confirming cross-file dependencies.
4. Keep untested code and edge cases in mind — add a guard if warranted, but do not add unverified changes.

**Forbidden**
- Additional refactors, cosmetic changes, or new features in the same commit.

---

## Phase 5 — Verify

A fix is confirmed only after both the reproduction and the full test suite pass.

**Steps**
1. Re-run the exact reproduction steps from Phase 1. The failure must no longer appear.
2. Run the full test suite. Do not stop at the passing case.  
   - `npm test` · `npm run test:ci` · `pytest` · `go test ./...` etc.
3. Write a regression test if one does not already exist. The test must fail _before_ the fix and pass _after_.

**Regression-test guidelines**
- Assert the exact thing that was broken — not an adjacent behavior.
- Name the test explicitly so future readers understand what is being guarded: `test_<module>_<specific_case>`.
- If a full mock / fixture setup is unreasonable, prefer the real-world path and log a `RT: add fixture` TODO.
- **The fix phase is not complete until the regression test passes.**

---

## Phase 6 — Document & Close

Retroactively document what was found and fixed so no one re-investigates the same bug.

**Commit message template**

```
fix: <short imperative summary>

Root cause: <one-sentence explanation of what actually went wrong>

Why the fix works: <one-sentence explanation of how it resolves the root cause>

Regression test: <file:line or commit SHA that adds it — label RT: <description>>
```

**In-code note (only if non-obvious)**
Add a one-line comment on the changed line(s) explaining why this prevents recurrence.

**Forbidden**
- Do not paste stack traces into code comments.
- Do not add time-of-day / date-stamped comments ("Fixed on 2024-03-15 by Bob").
- Do not leave `console.log` / `console.error` / `debugger` in committed code.

---

## Hard Rules

| # | Rule |
|---|------|
| 1 | **No random edits** — every character typed must trace back to a verified hypothesis from Phase 3. |
| 2 | **No hand-waving** — if you cannot reproduce or isolate, state that explicitly and stop. Invoking "dependency bug" without verifying the dependency is not a diagnosis. |
| 3 | **No unverified fixes** — a hypothesis is accepted only after a test or log confirms it. |
| 4 | **No style edits on a bug fix** — reformatting belongs in a separate commit. |
| 5 | **No leftover debug code** — `console.log`, `console.error`, and `debugger` must be removed before commit. |

---

## Workflow Checklist

Run through this before marking a fix as complete:

- [ ] Phase 1 — I have a confirmed reproduction and captured evidence.
- [ ] Phase 2 — I can point to the affected file and function range.
- [ ] Phase 3 — I have stated the root cause explicitly and verified it with at least one experiment.
- [ ] Phase 4 — My change is no larger than needed to address that root cause.
- [ ] Phase 5 — The reproduction steps pass and the full test suite passes.
- [ ] Phase 6 — The commit message documents the root cause.
- [ ] Hard Rules — None of the five hard rules are broken.

---

## Decision Tree

Got an error or bug report? Follow the tree exactly:

1. **Stack trace present?**
   - Yes → map the top frame to code, read context, run Phase 3.
   - No → go to 2.

2. **Failing test?**
   - Yes → read the assertion, read the code under test, run Phase 3.
   - No → go to 3.

3. **Visual / behavioral anomaly (no error text)?**
   - Yes → reproduce manually, inspect dev tools console / network / state, run Phase 3.
   - No → the issue is not reproducible. Document "cannot reproduce" and stop before making any code change.
