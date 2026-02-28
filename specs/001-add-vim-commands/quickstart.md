# Quickstart: Expanded Vim Command Coverage

## Prerequisites
- Modern desktop browser
- Project dependencies installed for lint/test commands

## Run
1. Open `C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\index.html` in a browser.
2. Start a practice session.

## Command Catalog Reference
- navigation: `copy-001`, `copy-004`
- editing: `copy-003`, `copy-005`
- text-objects: `copy-002`, `copy-006`

## Validate Core Scenarios

### 1. New commands appear in normal practice
1. Start a new session with default settings.
2. Confirm prompts include commands not present in the original baseline set.
3. Submit correct input for one new command.
4. Confirm immediate success feedback is shown.

### 2. Command-group focused practice
1. Select a command group (for example, navigation).
2. Start practice.
3. Confirm generated prompts only use commands in the selected group.
4. Clear selection and restart.
5. Confirm mixed mode shows commands from multiple groups.

### 3. Progress tracking for new commands
1. Complete at least three attempts across two new commands.
2. Open learner progress view.
3. Confirm each attempted command shows attempts and success totals.
4. Reload the page.
5. Confirm progress values remain intact.

### 4. Existing progress preservation
1. Seed existing progress in local storage.
2. Load updated command set.
3. Confirm prior progress values remain unchanged.
4. Confirm new commands initialize with default progress state.

## Performance Validation
1. Capture timing data around command submission feedback.
2. Run at least 30 submissions.
3. Confirm p95 feedback latency is below 1 second.

## Quality Gates
1. Run `npm run lint`.
2. Run `npm test`.
3. Treat any failure as a merge blocker.

## Execution Evidence (2026-02-20)
- `npm run lint`: FAILED (script unavailable; no `package.json` in repository root)
- `npm test`: FAILED (script unavailable; no `package.json` in repository root)
- Unit suite fallback execution: PASSED (`22 tests`) via Node harness loading `tests/unit/*.test.js`
- Performance evidence from harness (`100` submissions):
  - `submit` p95: `0ms` (`<= 1000ms` budget)
  - `submit_evaluate` p95: `0ms` (`<= 1000ms` budget)
- UX/accessibility checks verified in markup/styles:
  - command group selector has explicit label (`label[for="groupSelect"]`)
  - timer/feedback/hint/solution regions use `aria-live="polite"`
  - keyboard focus styles present for `input/select/textarea/button`
  - per-command progress panel present (`#commandProgress`) and readable with existing panel styling
