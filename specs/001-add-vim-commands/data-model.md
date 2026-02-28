# Data Model: Expanded Vim Command Coverage

## Entity: CommandDefinition
- Description: Defines each trainable Vim command available to learners.
- Fields:
  - commandId (string, required, unique)
  - keySequence (string, required)
  - groupId (string, required)
  - title (string, required, 3-80 chars)
  - trainingPrompt (string, required)
  - expectedOutcome (string, required)
  - guidanceText (string, required)
  - difficultyLevel (enum: beginner|intermediate|advanced, required)
  - isActive (boolean, required)
- Relationships:
  - Many CommandDefinitions belong to one CommandGroup.
  - One CommandDefinition has many CommandAttempts and one CommandProgress per learner.
- Validation Rules:
  - keySequence must be non-empty.
  - groupId must reference an existing CommandGroup.
  - commandId must remain stable across releases.

## Entity: CommandGroup
- Description: Logical grouping used for focused practice selection.
- Fields:
  - groupId (string, required, unique)
  - name (string, required)
  - description (string, required)
  - displayOrder (integer, required, >= 0)
- Relationships:
  - One CommandGroup has many CommandDefinitions.
- Validation Rules:
  - At least one active CommandDefinition must exist for any selectable group.

## Entity: CommandAttempt
- Description: One learner submission against a command prompt.
- Fields:
  - attemptId (string, required, unique)
  - commandId (string, required)
  - sessionId (string, required)
  - submittedInput (string, required)
  - isCorrect (boolean, required)
  - feedbackMessage (string, required)
  - createdAt (datetime string, required)
- Relationships:
  - Many CommandAttempts belong to one CommandDefinition.
- State Transitions:
  - started -> evaluated_correct
  - started -> evaluated_incorrect
  - evaluated_incorrect -> started (retry path)

## Entity: CommandProgress
- Description: Aggregated learner progress for each command.
- Fields:
  - profileId (string, required)
  - commandId (string, required)
  - attemptsCount (integer, required, >= 0)
  - successCount (integer, required, >= 0)
  - masteryStatus (enum: unseen|learning|proficient, required)
  - lastAttemptAt (datetime string, nullable)
- Relationships:
  - One CommandProgress record references one CommandDefinition and one learner profile.
- Validation Rules:
  - successCount cannot exceed attemptsCount.
  - masteryStatus transitions only in order: unseen -> learning -> proficient.
