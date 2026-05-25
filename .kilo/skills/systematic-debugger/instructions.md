# Systematic Debugger Skill Instructions

This skill enforces a structured, methodical approach to debugging. The goal is to find and fix root causes — not to apply random patches or guesses. Every debugging session must pass through the full pipeline in order.

---

## The Six-Phase Debugging Pipeline

### Phase 1 — Reproduce

Before making any change, confirm the failure is real and reproducible.

**Steps:**
1. Restate the symptom in your own words (visible output, error message, stack trace line:number, failing assertion).
2. Identify the smallest input / scenario that triggers the failure.
3. Run it and capture evidence: screenshot, terminal output, test failure log, network response.
4. Record the reproduction steps verbatim so they can be re-run after the fix.

**Rules:**
- Do not skip this phase.
- Do not assume a stack trace is the root cause.
- Do not begin editing code until you have captured at least one confirmed failure signal.

---

### Phase 2 — Isolate

Narrow the search space so you know _where_ the bug lives before you think about _why_.

**Steps:**
1. Identify the affected area: which file(s), which function(s), which layer (UI / logic / data / infra)?
2. Check if this is the first occurrence: `git log -p --all -S "<error keyword>"` or `git blame` on the relevant lines.
3. If the bug is in an unfamiliar codebase, read the surrounding module / Figma docs / architecture notes.
4. Create a focused reproduction: a unit test, a script, or a minimal HTML page that isolates just the broken path.
5. Eliminate variables: comment out unrelated code, add temporary console logs / breakpoints to confirm execution order.

**Output of this phase:** You can point to a specific file and line range and say "the bug is somewhere in here."

---

### Phase 3 — Root-Cause Analysis

Only after isolation should you form and test hypotheses.

**Steps:**
1. List all plausible root causes (typically 2–5).
2. For each hypothesis, design a single, low-cost experiment:
   - Add a console / log / breakpoint that confirms or rejects the hypothesis.
   - Inspect a network request or API response.
   - Check a computed style, state snapshot, or environment variable.
3. Execute experiments one at a time, recording the result.
4. When the data points to one cause, state it explicitly before writing any fix.

**Diagnostic checklist:**
- Is the error thrown or silently swallowed?
- Is a `null` / `undefined` / `NaN` propagating?
- Is a race condition or timing issue involved?
- Is there a caching or state-staleness problem?
- Is a dependency returning an unexpected shape?
- Are environment variables or API keys misconfigured?

**Rules:**
- Never skip to a fix based on a single observation.
- If multiple hypotheses remain plausible after isolation, pick the cheapest experiment first.

---

### Phase 4 — Fix (Minimal, Rooted)

Fix the root cause, nothing more.

**Steps:**
1. Formulate the fix as a resolution of the root cause, not a symptom workaround.
2. Write the smallest change that addresses the cause. Do not refactor or restructure surrounding code at the same time.
3. If multiple files must change, note the dependency chain before editing.
4. Keep untested code and edge cases in mind — add a guard if warranted, but do not add unverified changes.

**Rules:**
- Do not spread the fix across files without confirming cross-file dependencies.
- Do not add new features or refactors while fixing a bug — use a separate branch / commit.

---

### Phase 5 — Verify

A fix is only confirmed after it passes automated verification and reproduces the original scenario.

**Steps:**
1. Re-run the reproduction steps from Phase 1. Confirm the failure no longer occurs.
2. Run the full test suite: `npm test`, `pytest`, `go test ./...`, etc. Do not stop at the passing case.
3. If there is no existing test suite, write a regression test that would have caught the bug. Run it and confirm it passes.
4. Inspect the before / after behavior with a real data set, not just the minimal reproduction.

**Regression test guidelines:**
- The test should assert the exact same thing that was broken.
- Name the test clearly so future readers understand what it guards: `test_<module>_<specific_case>`.
- If a full mock / fixture setup is unreasonable, prefer the real world path and log a TODO for later (RT: add full fixture).
- Do not move forward to documentation until at least one regression test is in place.

**Rules:**
- A fix is not done until the regression test passes.
- Do not mark a fix as verified if only the reproduction script passes and the main suite has not been run.

---

### Phase 6 — Document & Close

Close the loop so future engineers find the answer without re-investigating.

**Minimum closing documentation:**
1. **Commit message (mandatory):** structured as:
   ```
   fix: <short imperative summary>

   Root cause: <one-sentence explanation of what actually went wrong>

   Why the fix works: <one-sentence explanation of how it resolves the cause>

   Regression test: <file:line or commit that adds it — see RT: … label>
   ```
2. **In-code note (only if non-obvious):** inline comment on the line(s) you changed, briefly describing why this prevents the bug from recurring. Do not store stack traces in comments.

---

## Hard Rules (Never Violate)

| # | Rule |
|---|------|
| 1 | **Never random edit** — every character typed must be tied to a verified hypothesis from Phase 3. |
| 2 | **Never hand-wave** — when you cannot find a root cause, say so explicitly and escalate; do not invoke "must be a dependency bug" and move on. |
| 3 | **Never claim confirmation without running tests** — hypothesis acceptance requires test or log evidence. |
| 4 | **Never add style reformatting on top of a bug fix** — separate reformatting into a distinct commit/branch. |
| 5 | **Never leave `console.log` / `console.error` / `debugger` statements in committed code** — remove them after verification. Not acceptable: leaving them for reviewers to clean up. |

---

## Workflow Checklist

Before starting:
- [ ] Phase 1: Reproduce — I have confirmed a failure and captured evidence.
- [ ] Phase 2: Isolate — I can point to the specific file / function / root-cause area.
- [ ] Phase 3: Root-Cause Analysis — I have stated the root cause explicitly and proved it with at least one diagnostic experiment.
- [ ] Phase 4: Fix — I am changing exactly enough to address the root cause.
- [ ] Phase 5: Verify — The reproduction step passes and all tests pass.
- [ ] Phase 6: Document — Commit message explains the root cause.
- [ ] Hard Rules — I have not violated any rule above.

---

## Decision Tree

1. Error message / stack trace present?
   - Yes → map the top frame to the source file, read the code context, root cause analysis.
   - No → go to 2.

2. Failing test?
   - Yes → read the assertion, then the code under test, then root cause analysis.
   - No → go to 3.

3. Visual / behavioral anomaly?
   - Yes → reproduce manually, inspect dev tools network / console / state, root cause analysis.
   - No → the issue is not reproducible; document that and stop before making changes.
