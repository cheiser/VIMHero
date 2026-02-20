# Research: Vim Mastery Challenge Game

## Decision 1: Frontend Technology Choice
- Decision: Implement with standard HTML5, JavaScript, and CSS only.
- Rationale: Matches explicit product constraint and preserves low operational complexity.
- Alternatives considered: React/Vue frameworks (rejected due to constraint and extra complexity); TypeScript toolchain (rejected to avoid build requirements).

## Decision 2: Challenge Validation Strategy
- Decision: Pass requires a key combination from an allowed set per challenge.
- Rationale: Aligns with learning goal of practicing correct Vim combinations, not only final output state.
- Alternatives considered: Final-text-only validation (rejected because it does not verify key-combo mastery); exact single-sequence validation (rejected as too rigid for learning).

## Decision 3: Error Handling and Retry Flow
- Decision: Disallowed key combinations show immediate error and keep the same timed attempt active.
- Rationale: Maintains flow and gives immediate corrective feedback without forcing restart.
- Alternatives considered: Immediate attempt failure (rejected for higher frustration); limited wrong-attempt threshold (rejected for unnecessary complexity in MVP).

## Decision 4: Guidance Timing
- Decision: Automatic hint at 30 seconds and automatic full solution at 90 seconds for all challenges.
- Rationale: Directly reflects clarified behavior and keeps challenge timing predictable.
- Alternatives considered: User-requested hints (rejected; conflicts with clarified behavior); difficulty-based timing (rejected in MVP for consistency).

## Decision 5: Persistence and Progress
- Decision: Store learner profile, attempts, and session summaries in localStorage.
- Rationale: Supports single-user continuity without backend dependencies.
- Alternatives considered: In-memory only (rejected due to data loss on reload); remote API persistence (rejected due to scope and simplicity goals).

## Decision 6: Performance Validation
- Decision: Instrument challenge start and validation timings in-browser and verify p95 <1s.
- Rationale: Satisfies non-functional requirement and constitution performance gate.
- Alternatives considered: No explicit measurement (rejected as non-compliant); synthetic benchmark only (rejected as insufficient for user-flow confidence).

## Clarification Resolution Summary
No unresolved NEEDS CLARIFICATION items remain.
