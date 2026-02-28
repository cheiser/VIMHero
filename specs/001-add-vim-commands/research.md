# Research: Expanded Vim Command Coverage

## Decision 1: Command Expansion Scope
- Decision: Add commands in three learner-facing groups: navigation, editing, and text-object operations.
- Rationale: Supports progressive learning while keeping command discovery manageable.
- Alternatives considered: Flat ungrouped list (rejected due to poor discoverability); adding all advanced commands immediately (rejected due to cognitive overload).

## Decision 2: Command Group Filtering Behavior
- Decision: Allow learners to select a single command group for focused practice; default to balanced mixed mode when no group is selected.
- Rationale: Aligns with FR-005 while preserving a low-friction default path.
- Alternatives considered: Mandatory group selection before session start (rejected as unnecessary friction); random-only mode (rejected as insufficient for focused learning).

## Decision 3: Progress Compatibility Strategy
- Decision: Preserve existing progress schema and append per-command progress records for newly added commands with safe defaults.
- Rationale: Meets FR-007 and avoids regressions for returning learners.
- Alternatives considered: Reset all progress on schema change (rejected due to data loss); maintain separate progress store for new commands (rejected due to added complexity).

## Decision 4: Incorrect Input Guidance
- Decision: On incorrect or partial command input, keep attempt active, provide corrective guidance, and allow immediate retry.
- Rationale: Reinforces learning without penalty spikes and supports iterative mastery.
- Alternatives considered: Immediate failure on first incorrect input (rejected for poor learning UX); silent failure without guidance (rejected for weak instructional value).

## Decision 5: Contract Shape for Frontend Actions
- Decision: Document REST-style contracts for command listing, prompt generation, command evaluation, and per-command progress reads.
- Rationale: Produces explicit interface expectations for tests and future integration without changing current frontend-only deployment.
- Alternatives considered: No formal contract artifact (rejected due to weaker testability); GraphQL schema (rejected as unnecessary for current scope).

## Clarification Resolution Summary
All Technical Context fields are resolved. No NEEDS CLARIFICATION markers remain.
