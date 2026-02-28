# Tasks: Expanded Vim Command Coverage

**Input**: Design documents from `/specs/001-add-vim-commands/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Automated tests are required by the feature specification (NFR-001), so test tasks are included in each user story phase.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Align dataset and baseline tooling for expanded command work.

- [X] T001 Add expanded command catalog seed data grouped by navigation/editing/text-object in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\data\challenges.json
- [X] T002 Document command-group IDs and command IDs used by this feature in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\specs\001-add-vim-commands\quickstart.md
- [X] T003 [P] Add command-coverage verification helper functions in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\tests\unit\test-helpers.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core structures required before user stories can be implemented.

**CRITICAL**: No user story work begins until this phase is complete.

- [X] T004 Extend command-loading and normalization logic for CommandDefinition and CommandGroup in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\scripts\challenge-engine.js
- [X] T005 [P] Add progress-store schema versioning and safe migration for CommandProgress defaults in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\scripts\progress-store.js
- [X] T006 [P] Add observability event names and payload shape for command group select, prompt served, evaluate fail, and progress write in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\scripts\event-log.js
- [X] T007 Add performance metric hooks for expanded command submit/evaluate path in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\scripts\perf-metrics.js

**Checkpoint**: Foundation ready; user stories can be implemented independently.

---

## Phase 3: User Story 1 - Learn New Commands in Practice (Priority: P1) MVP

**Goal**: Learners encounter and complete newly added commands in regular practice.

**Independent Test**: Start a session and verify newly added commands appear and evaluate correctly with immediate feedback.

### Tests for User Story 1

- [X] T008 [P] [US1] Add unit tests for new command availability in session prompt generation in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\tests\unit\challenge-engine.us1.test.js
- [X] T009 [P] [US1] Add unit tests for correct/incorrect evaluation and learner feedback for new commands in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\tests\unit\guidance.us2.test.js

### Implementation for User Story 1

- [X] T010 [US1] Implement prompt generation updates for new command set in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\scripts\challenge-engine.js
- [X] T011 [US1] Implement evaluation logic and corrective feedback for new command attempts in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\scripts\app.js
- [X] T012 [US1] Update command prompt and feedback UI copy for expanded command training in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\index.html
- [X] T013 [US1] Align command prompt and feedback styling with existing patterns in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\styles\app.css

**Checkpoint**: US1 is independently functional and testable.

---

## Phase 4: User Story 2 - Focus Practice by Command Group (Priority: P2)

**Goal**: Learners can choose one command group and practice only commands in that group.

**Independent Test**: Select a group and verify prompts only include commands from the selected group; clear selection and verify mixed mode returns.

### Tests for User Story 2

- [X] T014 [P] [US2] Add unit tests for command-group filter behavior and fallback to mixed mode in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\tests\unit\challenge-engine.foundation.test.js
- [X] T015 [P] [US2] Add UI behavior tests for command-group selection and reset in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\tests\unit\run-tests.html

### Implementation for User Story 2

- [X] T016 [US2] Implement command-group filtering and no-eligible-command fallback in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\scripts\challenge-engine.js
- [X] T017 [US2] Implement group selection state and prompt refresh behavior in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\scripts\app.js
- [X] T018 [US2] Add command-group selector controls and labels in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\index.html
- [X] T019 [US2] Add command-group selector and empty-state styles in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\styles\app.css

**Checkpoint**: US2 is independently functional and testable.

---

## Phase 5: User Story 3 - See Progress on Newly Added Commands (Priority: P3)

**Goal**: Learners can view per-command progress for newly added commands while preserving existing progress.

**Independent Test**: Complete attempts on new commands, reload, and verify per-command attempts/success totals persist without altering existing history.

### Tests for User Story 3

- [X] T020 [P] [US3] Add unit tests for per-command progress updates and mastery state transitions in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\tests\unit\progress.us3.test.js
- [X] T021 [P] [US3] Add unit tests for migration-preserved existing progress with new command defaults in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\tests\unit\progress-store.foundation.test.js

### Implementation for User Story 3

- [X] T022 [US3] Implement CommandProgress read/write helpers per command in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\scripts\progress-store.js
- [X] T023 [US3] Integrate command progress updates into submit/evaluate flow in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\scripts\app.js
- [X] T024 [US3] Add per-command progress view markup and labels in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\index.html
- [X] T025 [US3] Add per-command progress panel styling in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\styles\app.css

**Checkpoint**: US3 is independently functional and testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finish cross-story validation, quality gates, and release readiness.

- [X] T026 [P] Update contract-to-implementation notes for command/group/progress flows in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\specs\001-add-vim-commands\contracts\openapi.yaml
- [X] T027 Run lint and unit test suite and capture pass evidence in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\specs\001-add-vim-commands\quickstart.md
- [X] T028 Validate p95 feedback latency target and record results in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\specs\001-add-vim-commands\quickstart.md
- [X] T029 Perform final UX consistency and accessibility verification for new controls and feedback text in C:\Users\jaffa\Documents\GIT\CodexTest\VIMHero\specs\001-add-vim-commands\quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 (Setup): No dependencies.
- Phase 2 (Foundational): Depends on Phase 1 completion; blocks all user stories.
- Phase 3 (US1): Depends on Phase 2 completion.
- Phase 4 (US2): Depends on Phase 2 completion; independent of US1 completion.
- Phase 5 (US3): Depends on Phase 2 completion; independent of US1/US2 completion.
- Phase 6 (Polish): Depends on completion of all targeted user stories.

### User Story Dependency Graph

- US1 (P1): Independent after Foundational.
- US2 (P2): Independent after Foundational.
- US3 (P3): Independent after Foundational.
- Suggested delivery order for risk control: US1 -> US2 -> US3.

### Within Each User Story

- Tests first, then implementation.
- Data/model logic before UI wiring.
- UI wiring before final styling adjustments.

### Parallel Opportunities

- Setup parallel: T003.
- Foundational parallel: T005, T006.
- US1 parallel tests: T008, T009.
- US2 parallel tests: T014, T015.
- US3 parallel tests: T020, T021.
- Cross-cutting parallel: T026 with implementation hardening.

---

## Parallel Example: User Story 1

```bash
Task: "T008 [US1] Add unit tests for new command availability in tests/unit/challenge-engine.us1.test.js"
Task: "T009 [US1] Add evaluation feedback tests in tests/unit/guidance.us2.test.js"
```

## Parallel Example: User Story 2

```bash
Task: "T014 [US2] Add command-group filter tests in tests/unit/challenge-engine.foundation.test.js"
Task: "T015 [US2] Add group-selection UI behavior checks in tests/unit/run-tests.html"
```

## Parallel Example: User Story 3

```bash
Task: "T020 [US3] Add command-progress update tests in tests/unit/progress.us3.test.js"
Task: "T021 [US3] Add migration compatibility tests in tests/unit/progress-store.foundation.test.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate US1 independent test criteria.
4. Demo/release MVP increment.

### Incremental Delivery

1. Deliver US1 (new commands in practice).
2. Deliver US2 (group-focused practice).
3. Deliver US3 (per-command progress view and persistence safety).
4. Finish Phase 6 polish and quality evidence.

### Parallel Team Strategy

1. One developer finalizes foundational tasks (T004-T007).
2. Then split by story:
   - Developer A: US1 tasks.
   - Developer B: US2 tasks.
   - Developer C: US3 tasks.
3. Rejoin for Phase 6 cross-cutting validation.


