# Quickstart: Vim Mastery Challenge Game

## Prerequisites
- Modern desktop browser.
- No external dependencies or build tools.

## Run
1. Open `C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\index.html` in a browser.
2. Select a copy-text challenge and click **Start Attempt**.

## Validate Core Behavior

### Timed challenge
1. Start challenge.
2. Confirm timer begins immediately.
3. Submit an allowed key combination and matching output.
4. Confirm pass result and elapsed time are shown.

### Wrong combination handling
1. Start challenge.
2. Submit a disallowed key combination.
3. Confirm explicit error message appears.
4. Confirm attempt remains active and timer continues.

### Automatic guidance timing
1. Start challenge and do not complete it.
2. Confirm hint appears automatically at 30 seconds.
3. Confirm full solution appears automatically at 90 seconds.

### Progress tracking
1. Complete multiple attempts.
2. Confirm score and streak update after outcomes.
3. Confirm session summary includes attempts and average completion time.

## Validation Notes (2026-02-20)
- Core flow validated against challenge start, submit pass/fail, and disallowed-combo retry behavior.
- Guidance threshold behavior validated at 30s and 90s boundaries using unit tests.
- Session summary aggregation validated for attempts, pass/fail totals, and average completion time.

## Performance Evidence (p95 target < 1000ms)
- Instrumented labels: `challenge_start`, `submit`.
- Captured from browser instrumentation in `window.perfMetrics`.
- Evidence summary:
  - `challenge_start` p95: < 1000ms
  - `submit` p95: < 1000ms

## Accessibility + UX Consistency Checks
- Focusable flow verified for select -> start -> key combo -> output -> submit.
- All form controls have explicit labels.
- Feedback and guidance regions use `aria-live="polite"`.
- Pass/error wording normalized via single feedback status region.

## Observability check
1. Execute start, error, hint reveal, solution reveal, pass, fail, retry, and quit flows.
2. Confirm lifecycle events are captured in application event history.