# Feature Specification: Vim Mastery Challenge Game

**Feature Branch**: `001-vim-training-game`  
**Created**: 2026-02-20  
**Status**: Draft  
**Input**: User description: "Build an application that can help me become a master of vim in a Unix terminal. It should provide some simple challenges such as copy text and after some time passes how to solve them. It should be presented in a game-ish manner. And it should time the user."

## Clarifications

### Session 2026-02-20

- Q: Should challenge pass/fail validate only final output or also specific Vim key combinations? -> A: Pass requires a valid key combination from a per-challenge allowed set.
- Q: Should hints and solutions be timer-triggered automatically or user-requested? -> A: Hints and solution appear automatically at configured timer thresholds.
- Q: Should hint/solution thresholds be global fixed values or vary by difficulty? -> A: Use global fixed timing for all challenges (hint at 30 seconds, solution at 90 seconds).
- Q: On wrong key combination, should the attempt fail immediately or stay active? -> A: Show an error and keep the current timed attempt active.
- Q: What challenge types are included in MVP scope? -> A: MVP includes copy-text challenges only.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Complete Timed Vim Challenges (Priority: P1)

As a learner, I want short terminal-based Vim challenges so I can practice core editing actions under time pressure.

**Why this priority**: Timed challenge execution is the core learning loop and primary user value.

**Independent Test**: Launch one challenge, start the timer, complete the task using Vim commands, and receive success/failure feedback with elapsed time.

**Acceptance Scenarios**:

1. **Given** a learner starts a basic challenge, **When** the challenge begins, **Then** the app shows the target task, start state, and active timer.
2. **Given** a learner completes the target edit correctly, **When** the challenge is submitted or detected as complete, **Then** the app records completion and elapsed time.
3. **Given** a learner exits or fails the challenge, **When** the challenge ends, **Then** the app shows failure feedback and allows retry.

---

### User Story 2 - Receive Time-Delayed Guidance (Priority: P2)

As a learner, I want progressive hints and then a full solution after enough time passes so I can keep learning when stuck.

**Why this priority**: Guidance prevents frustration while preserving challenge and skill development.

**Independent Test**: Start a challenge and wait without solving; verify hints appear at configured time thresholds and a full solution appears at the final threshold.

**Acceptance Scenarios**:

1. **Given** a learner has not solved a challenge after the first threshold, **When** threshold time is reached, **Then** the app displays a hint without ending the challenge.
2. **Given** a learner still has not solved a challenge after the final threshold, **When** final threshold time is reached, **Then** the app displays a full solution path.

---

### User Story 3 - Track Progress in a Game-Like Format (Priority: P3)

As a learner, I want points, streaks, and progress summaries so I feel motivated to continue practicing.

**Why this priority**: Game-style progression supports retention and repeated practice over time.

**Independent Test**: Complete multiple challenges with different outcomes and verify score, streak, and summary updates reflect each result.

**Acceptance Scenarios**:

1. **Given** a learner completes consecutive challenges successfully, **When** each challenge ends, **Then** the streak count increases and is shown.
2. **Given** a learner views their session summary, **When** the session ends, **Then** the app shows completed challenges, average completion time, and hint/solution usage.

### Edge Cases

- What happens when a learner submits an answer exactly at the same moment a hint or solution threshold is reached?
- How does the system handle a learner leaving a challenge mid-run and returning later?
- What happens when a learner repeatedly fails the same challenge in one session?
- How does the system handle invalid or incomplete edits that partially match the target outcome?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a catalog of beginner-friendly Vim copy-text challenges for MVP.
- **FR-002**: System MUST start and display a visible timer immediately when a challenge begins.
- **FR-003**: System MUST evaluate whether a learner used a key combination from the challenge's allowed-command set and return pass/fail feedback based on that validation.
- **FR-004**: System MUST provide at least one intermediate hint and one full solution that appear automatically at fixed thresholds (hint at 30 seconds, solution at 90 seconds).
- **FR-005**: System MUST allow learners to retry a challenge after failure without losing access to that challenge.
- **FR-006**: System MUST record per-challenge outcomes including completion status, elapsed time, and hint/solution usage.
- **FR-007**: System MUST present game-like progression indicators including score and streak.
- **FR-008**: System MUST present a session summary showing challenge outcomes and time-based performance.
- **FR-009**: System MUST support interaction in a Unix terminal context.
- **FR-010**: System MUST show an explicit error message when a submission uses a disallowed key combination, even if resulting text appears correct, and keep the current timed attempt active.

### Non-Functional Requirements *(mandatory)*

- **NFR-001 Code Quality**: All changes MUST include automated validation for challenge correctness, timing behavior, and scoring behavior.
- **NFR-002 UX Consistency**: Prompts, feedback messages, and challenge result displays MUST use consistent terminology and formatting across all challenge types.
- **NFR-003 Performance**: 95% of challenge start actions and result evaluations MUST complete in under 1 second from user action.
- **NFR-004 Observability**: The system MUST capture challenge lifecycle events (start, hint shown, solution shown, pass, fail, retry, quit) for progress and troubleshooting review.

### Key Entities *(include if feature involves data)*

- **Challenge**: A timed Vim exercise with a prompt, initial content/state, expected outcome, hint schedule, and solution path.
- **Attempt**: A learner's single run of a challenge, including start time, end time, elapsed duration, result, and guidance usage.
- **Learner Profile**: Aggregated player progress including total score, streak, completed challenge count, and recent performance trends.
- **Session Summary**: End-of-session rollup of attempts, completion rate, average times, and guidance dependency.

## Assumptions

- Initial scope targets individual learners rather than instructor-led multi-user play.
- Challenge content in MVP is limited to copy-text tasks and can expand later.
- Progress is tracked per learner session and available for later review.
- Guidance thresholds are global fixed defaults for all challenges: hint at 30 seconds and solution at 90 seconds.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 90% of new learners can complete their first challenge within 5 minutes of starting the app.
- **SC-002**: At least 80% of completed sessions include three or more attempted challenges.
- **SC-003**: At least 70% of learners who start a second session improve their median challenge completion time by 20% or more versus their first session.
- **SC-004**: At least 85% of surveyed learners report that timed challenges and delayed guidance help them understand Vim workflows better.
