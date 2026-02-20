# Data Model: Vim Mastery Challenge Game

## Entity: Challenge
- Description: Defines a Vim copy-text exercise with validation and guidance rules.
- Fields:
  - challengeId (string, required, unique)
  - title (string, required, 3-80 chars)
  - prompt (string, required)
  - sourceText (string, required)
  - targetInstruction (string, required)
  - allowedKeyCombos (array[string], required, min 1)
  - hintText (string, required)
  - solutionText (string, required)
  - hintAtSeconds (integer, required, fixed 30)
  - solutionAtSeconds (integer, required, fixed 90)
- Relationships:
  - One Challenge has many Attempts.
- Validation Rules:
  - allowedKeyCombos entries must be non-empty and unique within a challenge.
  - hintAtSeconds must be less than solutionAtSeconds.

## Entity: Attempt
- Description: One timed learner run of a challenge.
- Fields:
  - attemptId (string, required, unique)
  - challengeId (string, required)
  - startedAt (datetime string, required)
  - endedAt (datetime string, nullable)
  - elapsedMs (integer, nullable, >= 0)
  - status (enum: in_progress|passed|failed|abandoned, required)
  - submittedKeyCombo (string, nullable)
  - submittedOutput (string, nullable)
  - errorMessage (string, nullable)
  - hintShown (boolean, required)
  - solutionShown (boolean, required)
- Relationships:
  - Many Attempts belong to one Challenge.
  - Many Attempts contribute to one LearnerProfile and one SessionSummary.
- State Transitions:
  - in_progress -> passed
  - in_progress -> failed
  - in_progress -> abandoned
  - in_progress (disallowed combo) -> in_progress with errorMessage updated

## Entity: LearnerProfile
- Description: Persistent learner progression stats.
- Fields:
  - profileId (string, required)
  - totalScore (integer, required, >= 0)
  - currentStreak (integer, required, >= 0)
  - bestStreak (integer, required, >= 0)
  - completedChallenges (integer, required, >= 0)
  - totalAttempts (integer, required, >= 0)
  - lastActiveAt (datetime string, nullable)
- Validation Rules:
  - bestStreak >= currentStreak.

## Entity: SessionSummary
- Description: Aggregated stats for the current play session.
- Fields:
  - sessionId (string, required)
  - startedAt (datetime string, required)
  - endedAt (datetime string, nullable)
  - attemptsCount (integer, required, >= 0)
  - passedCount (integer, required, >= 0)
  - failedCount (integer, required, >= 0)
  - averageCompletionMs (integer, nullable)
  - hintsShownCount (integer, required, >= 0)
  - solutionsShownCount (integer, required, >= 0)
