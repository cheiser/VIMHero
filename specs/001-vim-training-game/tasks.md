# Tasks: Vim Mastery Challenge Game

**Input**: Design documents from `/specs/001-vim-training-game/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included because the specification requires automated validation for correctness, timing behavior, and scoring behavior.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Static web app: `index.html`, `styles/`, `scripts/`, `data/`, `tests/`
- Feature docs: `specs/001-vim-training-game/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create static app directories and baseline files in `index.html`, `styles/app.css`, `scripts/app.js`, `scripts/challenge-engine.js`, `scripts/timer.js`, `scripts/progress-store.js`, `scripts/event-log.js`, `scripts/perf-metrics.js`, `data/challenges.json`, `tests/unit/run-tests.html`, and `tests/unit/test-helpers.js`
- [X] T002 Define initial copy-text challenge seed data schema and MVP challenge entries in `data/challenges.json`
- [X] T003 [P] Build base application layout shells (challenge panel, feedback panel, guidance panel, progress panel) in `index.html`
- [X] T004 [P] Define global style tokens and baseline responsive layout in `styles/app.css`
- [X] T005 [P] Implement lightweight browser test harness bootstrap in `tests/unit/run-tests.html` and `tests/unit/test-helpers.js`
- [X] T006 [P] Add performance/event instrumentation scaffolding in `scripts/perf-metrics.js` and `scripts/event-log.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T007 Implement localStorage persistence utilities for profile, attempts, and session summaries in `scripts/progress-store.js`
- [X] T008 Implement timer lifecycle controls (start, tick, stop, elapsed) in `scripts/timer.js`
- [X] T009 Implement challenge validation engine for allowed key-combo checks in `scripts/challenge-engine.js`
- [X] T010 Implement automatic guidance scheduler for fixed thresholds (30s hint, 90s solution) in `scripts/challenge-engine.js`
- [X] T011 Implement shared application state controller and normalized status messaging in `scripts/app.js`
- [X] T012 [P] Add foundational unit tests for storage, timer, and validation engine modules in `tests/unit/progress-store.foundation.test.js`, `tests/unit/timer.foundation.test.js`, and `tests/unit/challenge-engine.foundation.test.js`
- [X] T013 Align contract documentation with frontend action mappings in `specs/001-vim-training-game/contracts/openapi.yaml`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Complete Timed Vim Challenges (Priority: P1) MVP

**Goal**: Let users run timed copy-text challenges and get pass/error results based on allowed key combinations.

**Independent Test**: Start one copy-text challenge, run timer, submit key combo + output, and verify pass/error feedback and elapsed time are shown.

### Tests for User Story 1

- [X] T014 [P] [US1] Add unit tests for allowed key-combo pass/error behavior in `tests/unit/challenge-engine.us1.test.js`
- [X] T015 [P] [US1] Add unit tests for disallowed combo error while attempt remains active in `tests/unit/challenge-engine.us1.test.js`
- [X] T016 [P] [US1] Add unit tests for timer start/elapsed rendering flow in `tests/unit/timer.us1.test.js`

### Implementation for User Story 1

- [X] T017 [US1] Implement challenge start workflow and timer binding in `scripts/app.js`
- [X] T018 [US1] Implement submission flow for `submittedKeyCombo` and `submittedOutput` in `scripts/app.js`
- [X] T019 [US1] Render source text, challenge prompt, and submission controls in `index.html`
- [X] T020 [US1] Style timer, input controls, and pass/error feedback states in `styles/app.css`
- [X] T021 [US1] Persist attempt lifecycle updates (start, submit, pass/fail) in `scripts/progress-store.js`
- [X] T022 [US1] Ensure submit contract behavior matches implementation for `/challenges/{challengeId}/attempts` and `/attempts/{attemptId}/submit` in `specs/001-vim-training-game/contracts/openapi.yaml`

**Checkpoint**: User Story 1 is fully functional and independently testable

---

## Phase 4: User Story 2 - Receive Time-Delayed Guidance (Priority: P2)

**Goal**: Automatically reveal hint at 30 seconds and solution at 90 seconds during active attempts.

**Independent Test**: Start a challenge, wait without solving, and verify automatic hint at 30s and automatic solution at 90s.

### Tests for User Story 2

- [X] T023 [P] [US2] Add unit tests for automatic hint/solution thresholds in `tests/unit/guidance.us2.test.js`
- [X] T024 [P] [US2] Add unit tests for threshold boundary behavior (submit at hint/solution moment) in `tests/unit/guidance-threshold.us2.test.js`

### Implementation for User Story 2

- [X] T025 [US2] Implement timed guidance state transitions in `scripts/challenge-engine.js`
- [X] T026 [US2] Integrate guidance rendering lifecycle in `scripts/app.js`
- [X] T027 [US2] Add hint/solution UI regions with `aria-live` behavior in `index.html`
- [X] T028 [US2] Style hint and solution states with consistent visual hierarchy in `styles/app.css`
- [X] T029 [US2] Record hint/solution reveal events in `scripts/event-log.js`
- [X] T030 [US2] Update guidance contract mapping for `/attempts/{attemptId}/guidance` in `specs/001-vim-training-game/contracts/openapi.yaml`

**Checkpoint**: User Stories 1 and 2 both work independently

---

## Phase 5: User Story 3 - Track Progress in a Game-Like Format (Priority: P3)

**Goal**: Show score, streak, and session summary to motivate continued practice.

**Independent Test**: Complete multiple attempts with mixed outcomes and verify score, streak, and session summary update accurately.

### Tests for User Story 3

- [X] T031 [P] [US3] Add unit tests for scoring and streak update rules in `tests/unit/progress.us3.test.js`
- [X] T032 [P] [US3] Add unit tests for session summary aggregation in `tests/unit/session-summary.us3.test.js`

### Implementation for User Story 3

- [X] T033 [US3] Implement score and streak update logic on attempt outcomes in `scripts/progress-store.js`
- [X] T034 [US3] Implement session summary aggregation and retrieval in `scripts/progress-store.js`
- [X] T035 [US3] Render score, streak, and session summary components in `index.html`
- [X] T036 [US3] Wire progress UI updates and session summary refresh in `scripts/app.js`
- [X] T037 [US3] Style scoreboard and session summary panels in `styles/app.css`
- [X] T038 [US3] Align profile/session actions with `/profile` and `/sessions/current/summary` contract behavior in `specs/001-vim-training-game/contracts/openapi.yaml`

**Checkpoint**: All user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T039 [P] Update scenario documentation to match final UX and terminology in `specs/001-vim-training-game/quickstart.md`
- [X] T040 Execute quickstart validation flow and capture verification notes in `specs/001-vim-training-game/quickstart.md`
- [X] T041 Capture p95 timing evidence for challenge start and submission actions in `specs/001-vim-training-game/quickstart.md`
- [X] T042 Run accessibility and UX consistency pass (focus order, labels, feedback wording) in `index.html` and `styles/app.css`
- [X] T043 Run full browser unit test harness and fix regressions in `tests/unit/run-tests.html` and `scripts/`
- [X] T044 Update implementation notes and final compliance summary in `specs/001-vim-training-game/plan.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies
- **Phase 2 (Foundational)**: Depends on Phase 1; blocks all user stories
- **Phase 3 (US1)**: Depends on Phase 2; MVP baseline
- **Phase 4 (US2)**: Depends on Phase 3 challenge loop and Phase 2 timer/engine foundations
- **Phase 5 (US3)**: Depends on Phase 3 outcomes and Phase 2 persistence foundations
- **Phase 6 (Polish)**: Depends on completion of selected user stories

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational; no dependency on other stories
- **US2 (P2)**: Requires US1 challenge runtime and submission flow
- **US3 (P3)**: Requires US1 attempt outcomes; can proceed independently of US2 once outcomes exist

### Within Each User Story

- Tests before implementation
- Data/state logic before UI wiring
- UI wiring before styling polish
- Contract alignment after behavior is implemented

### Parallel Opportunities

- Setup: T003, T004, T005, T006 can run in parallel after T001/T002
- Foundational: T012 can run in parallel with T007-T011 once baseline modules exist
- US1: T014, T015, T016 parallel; then T019/T020 parallel after T017/T018
- US2: T023 and T024 parallel; T027 and T028 parallel after T025/T026
- US3: T031 and T032 parallel; T035 and T037 parallel after T033/T034

---

## Parallel Example: User Story 1

```bash
# Parallel tests
Task: "T014 [US1] tests/unit/challenge-engine.us1.test.js"
Task: "T015 [US1] tests/unit/challenge-engine.us1.test.js"
Task: "T016 [US1] tests/unit/timer.us1.test.js"

# Parallel UI work after controller wiring
Task: "T019 [US1] index.html"
Task: "T020 [US1] styles/app.css"
```

## Parallel Example: User Story 2

```bash
# Parallel guidance tests
Task: "T023 [US2] tests/unit/guidance.us2.test.js"
Task: "T024 [US2] tests/unit/guidance-threshold.us2.test.js"

# Parallel presentation updates
Task: "T027 [US2] index.html"
Task: "T028 [US2] styles/app.css"
```

## Parallel Example: User Story 3

```bash
# Parallel progress tests
Task: "T031 [US3] tests/unit/progress.us3.test.js"
Task: "T032 [US3] tests/unit/session-summary.us3.test.js"

# Parallel UI + style updates
Task: "T035 [US3] index.html"
Task: "T037 [US3] styles/app.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate US1 independently using the story test criteria
5. Demo MVP

### Incremental Delivery

1. Deliver US1 (timed copy challenge pass/error loop)
2. Deliver US2 (automatic hints/solution)
3. Deliver US3 (score/streak/session summary)
4. Run Polish phase checks and finalize evidence

### Parallel Team Strategy

1. Developer A: core engine and timer (`scripts/challenge-engine.js`, `scripts/timer.js`)
2. Developer B: UI integration (`index.html`, `scripts/app.js`, `styles/app.css`)
3. Developer C: persistence and tests (`scripts/progress-store.js`, `tests/unit/`)

---

## Notes

- Every task follows required checklist format with ID and file path.
- `[P]` tasks target separate files and minimal coupling.
- User story tasks include `[US#]` labels for traceability.
- Suggested MVP scope: Phase 3 / User Story 1 only.
