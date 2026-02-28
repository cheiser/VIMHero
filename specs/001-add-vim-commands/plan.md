# Implementation Plan: Expanded Vim Command Coverage

**Branch**: `001-add-vim-commands` | **Date**: 2026-02-20 | **Spec**: `C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\specs\001-add-vim-commands\spec.md`
**Input**: Feature specification from `/specs/001-add-vim-commands/spec.md`

## Summary

Expand the current Vim training experience with additional commands, targeted command-group practice, and per-command progress tracking while preserving existing learner progress. Design keeps the existing browser-only architecture, extends the command catalog model, and formalizes prompt/evaluation/progress contracts for predictable testing.

## Technical Context

**Language/Version**: HTML5 + JavaScript (ES2020+) + CSS3  
**Primary Dependencies**: None (browser-native APIs only; no frameworks/libraries)  
**Storage**: Browser localStorage for learner profile, attempts, and per-command progress  
**Testing**: `npm test` browser unit tests + `npm run lint` static checks  
**Target Platform**: Modern desktop browsers  
**Project Type**: web (frontend-only static application)  
**Performance Goals**: For 95% of command submissions, correctness feedback appears within 1 second  
**Constraints**: No new framework/build system; preserve existing progress data; maintain current interaction and copy patterns  
**Scale/Scope**: Single-learner local app; expanded command catalog and command-group filtering only

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Pre-Design Gate Assessment:
- Code Quality Gate: PASS. Planned changes include unit coverage for new command availability, evaluation logic, command-group filtering, and progress persistence; lint/test failures block merge.
- UX Consistency Gate: PASS. Existing training flow, feedback patterns, and keyboard-first interaction remain unchanged while adding only command/group selectors and guidance text.
- Performance Gate: PASS. p95 feedback budget (<1s) is explicit and validated via existing performance instrumentation around submit/evaluation flows.
- Observability Gate: PASS. Existing event and performance telemetry will be extended for command group selection, command presentation, evaluation failures, and persistence failures.
- Simplicity Gate: PASS. No new dependencies or abstractions; extend current data structures and modules directly.

Post-Design Gate Re-Assessment:
- Code Quality Gate: PASS. Data model and API contracts define deterministic behaviors for command selection, evaluation, and progress mutation.
- UX Consistency Gate: PASS. Quickstart validates unchanged core journey with additive command/group controls and consistent copy.
- Performance Gate: PASS. Quickstart includes repeatable p95 measurement checks for expanded command submissions.
- Observability Gate: PASS. Contracts include events/fields required for diagnosing command-level failures and progress-write issues.
- Simplicity Gate: PASS. Design remains frontend-only with browser-native persistence and no additional runtime dependencies.

## Project Structure

### Documentation (this feature)

```text
C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\specs\001-add-vim-commands\
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts\openapi.yaml
`-- tasks.md
```

### Source Code (repository root)

```text
C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\
|-- index.html
|-- data\
|   `-- challenges.json
|-- scripts\
|   |-- app.js
|   |-- challenge-engine.js
|   |-- progress-store.js
|   |-- timer.js
|   |-- event-log.js
|   `-- perf-metrics.js
|-- styles\
|   `-- app.css
`-- tests\unit\
```

**Structure Decision**: Keep the existing static web architecture and extend current app/data/test modules in place to minimize complexity and maintain consistency.

## Complexity Tracking

No constitution violations identified; no complexity exceptions required.
