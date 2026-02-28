(function () {
  var state = {
    challenges: [],
    visibleChallenges: [],
    commandGroups: [],
    selectedGroupId: 'mixed',
    currentChallenge: null,
    currentAttempt: null,
    timer: null,
    guidanceScheduler: null,
    hintShown: false,
    solutionShown: false
  };

  function element(id) {
    return document.getElementById(id);
  }

  function setFeedback(message, isError) {
    var feedback = element('feedback');
    feedback.textContent = message;
    feedback.className = 'status ' + (isError ? 'error' : 'ok');
  }

  function setTimerText(text) {
    element('timer').textContent = text;
  }

  function focusKeyComboInput() {
    var keyComboInput = element('keyCombo');
    if (!keyComboInput) {
      return;
    }

    keyComboInput.focus();
  }

  function setGuidance(stateGuidance) {
    var hint = element('hint');
    var solution = element('solution');

    hint.textContent = stateGuidance.hintText || '';
    solution.textContent = stateGuidance.solutionText || '';

    if (stateGuidance.hintVisible && !state.hintShown) {
      state.hintShown = true;
      window.eventLog.add('hint_shown', { attemptId: state.currentAttempt && state.currentAttempt.attemptId });
    }

    if (stateGuidance.solutionVisible && !state.solutionShown) {
      state.solutionShown = true;
      window.eventLog.add('solution_shown', { attemptId: state.currentAttempt && state.currentAttempt.attemptId });
    }
  }

  function renderCommandProgress() {
    var output = element('commandProgress');
    var rows = window.progressStore.getAllCommandProgress();
    if (!rows.length) {
      output.textContent = 'No command progress yet.';
      return;
    }

    output.textContent = rows
      .map(function (row) {
        return [
          row.commandId,
          'attempts=' + row.attemptsCount,
          'success=' + row.successCount,
          'status=' + row.masteryStatus
        ].join(' | ');
      })
      .join('\n');
  }

  function renderProgress() {
    var profile = window.progressStore.getProfile();
    var session = window.progressStore.getSession();

    element('score').textContent = 'Score: ' + profile.totalScore;
    element('streak').textContent = 'Streak: ' + profile.currentStreak + ' (Best: ' + profile.bestStreak + ')';
    element('sessionSummary').textContent = [
      'Attempts: ' + session.attemptsCount,
      'Passed: ' + session.passedCount,
      'Failed: ' + session.failedCount,
      'Avg ms: ' + (session.averageCompletionMs === null ? 'n/a' : session.averageCompletionMs),
      'Hints shown: ' + session.hintsShownCount,
      'Solutions shown: ' + session.solutionsShownCount
    ].join('\n');

    renderCommandProgress();
  }

  function selectedChallenge() {
    var challengeId = element('challengeSelect').value;
    return state.visibleChallenges.find(function (challenge) {
      return challenge.challengeId === challengeId;
    }) || null;
  }

  function populateChallenges(challenges) {
    var select = element('challengeSelect');
    select.innerHTML = '';

    challenges.forEach(function (challenge, index) {
      var option = document.createElement('option');
      option.value = challenge.challengeId;
      option.textContent = (index + 1) + '. ' + challenge.title;
      select.appendChild(option);
    });

    if (challenges.length) {
      state.currentChallenge = challenges[0];
      select.value = state.currentChallenge.challengeId;
    } else {
      state.currentChallenge = null;
      setFeedback('No commands available for selected group. Using mixed fallback.', true);
    }
  }

  function populateGroups(groups) {
    var select = element('groupSelect');
    select.innerHTML = '';

    var mixed = document.createElement('option');
    mixed.value = 'mixed';
    mixed.textContent = 'Mixed (all groups)';
    select.appendChild(mixed);

    groups.forEach(function (group) {
      var option = document.createElement('option');
      option.value = group.groupId;
      option.textContent = group.name;
      select.appendChild(option);
    });

    select.value = 'mixed';
  }

  function applyGroupFilter(groupId) {
    state.selectedGroupId = groupId || 'mixed';
    state.visibleChallenges = window.challengeEngine.filterChallengesByGroup(state.challenges, state.selectedGroupId);

    populateChallenges(state.visibleChallenges);
    window.eventLog.addTyped(window.eventLog.eventTypes.GROUP_SELECTED, {
      groupId: state.selectedGroupId,
      challengeCount: state.visibleChallenges.length
    });
  }

  function startAttempt() {
    var challenge = selectedChallenge();
    if (!challenge) {
      setFeedback('Select a challenge before starting.', true);
      return;
    }

    state.currentChallenge = challenge;
    state.currentAttempt = {
      attemptId: 'attempt-' + Date.now(),
      challengeId: challenge.challengeId,
      commandId: challenge.challengeId,
      startedAt: new Date().toISOString(),
      status: 'in_progress'
    };
    state.hintShown = false;
    state.solutionShown = false;

    element('prompt').textContent = challenge.prompt;
    element('sourceText').textContent = challenge.sourceText;
    element('keyCombo').value = '';
    element('outputText').value = '';
    element('hint').textContent = '';
    element('solution').textContent = '';
    setFeedback('Challenge started. Timer is running.', false);
    focusKeyComboInput();

    var startedAtMark = window.perfMetrics.start('challenge_start');
    window.progressStore.recordAttemptStart(state.currentAttempt);
    window.eventLog.add('start', {
      attemptId: state.currentAttempt.attemptId,
      challengeId: challenge.challengeId
    });
    window.eventLog.addTyped(window.eventLog.eventTypes.PROMPT_SERVED, {
      attemptId: state.currentAttempt.attemptId,
      challengeId: challenge.challengeId,
      groupId: challenge.groupId
    });

    state.guidanceScheduler = window.challengeEngine.createGuidanceScheduler(challenge, setGuidance);
    state.guidanceScheduler.reset();

    if (state.timer) {
      state.timer.stop();
    }
    state.timer = window.timerModule.createTimer(updateTick);
    state.timer.reset();
    state.timer.start();

    window.perfMetrics.end('challenge_start', startedAtMark);
    renderProgress();
  }

  function submitAttempt() {
    if (!state.currentChallenge || !state.currentAttempt) {
      setFeedback('Start a challenge before submitting.', true);
      return;
    }
    if (state.currentAttempt.status !== 'in_progress') {
      setFeedback('This attempt is already finished. Start a new attempt.', true);
      return;
    }

    var submittedKeyCombo = element('keyCombo').value;
    var submittedOutput = element('outputText').value;
    var startedAtMark = window.perfMetrics.start('submit');
    var evalMark = window.perfMetrics.start('submit_evaluate');

    var result = window.challengeEngine.validateSubmission(
      state.currentChallenge,
      submittedKeyCombo,
      submittedOutput
    );

    if (result.status === 'in_progress') {
      setFeedback(result.errorMessage, true);
      window.eventLog.add('validation_error', {
        attemptId: state.currentAttempt.attemptId,
        submittedKeyCombo: submittedKeyCombo,
        reason: result.errorMessage
      });
      window.eventLog.addTyped(window.eventLog.eventTypes.EVALUATE_FAIL, {
        attemptId: state.currentAttempt.attemptId,
        challengeId: state.currentChallenge.challengeId,
        groupId: state.currentChallenge.groupId,
        reason: result.errorMessage
      });
      window.perfMetrics.end('submit_evaluate', evalMark);
      window.perfMetrics.end('submit', startedAtMark);
      return;
    }

    state.timer.stop();
    var elapsedMs = state.timer.elapsedMs();
    var isError = result.status !== 'passed';

    setFeedback(isError ? result.errorMessage : 'Passed in ' + elapsedMs + 'ms.', isError);

    window.progressStore.recordAttemptOutcome(
      state.currentAttempt.attemptId,
      result.status,
      elapsedMs,
      state.hintShown,
      state.solutionShown,
      submittedKeyCombo,
      submittedOutput,
      isError ? result.errorMessage : '',
      state.currentChallenge.challengeId
    );

    window.eventLog.add(result.status, {
      attemptId: state.currentAttempt.attemptId,
      challengeId: state.currentChallenge.challengeId,
      elapsedMs: elapsedMs,
      submittedKeyCombo: submittedKeyCombo
    });
    window.eventLog.addTyped(window.eventLog.eventTypes.PROGRESS_WRITE, {
      attemptId: state.currentAttempt.attemptId,
      challengeId: state.currentChallenge.challengeId,
      status: result.status
    });

    state.currentAttempt.status = result.status;
    window.perfMetrics.end('submit_evaluate', evalMark);
    window.perfMetrics.end('submit', startedAtMark);
    renderProgress();
  }

  function updateTick(elapsedMs, text) {
    setTimerText(text);

    if (!state.currentChallenge || !state.currentAttempt || state.currentAttempt.status !== 'in_progress') {
      return;
    }

    var guidance = state.guidanceScheduler
      ? state.guidanceScheduler.update(elapsedMs)
      : window.challengeEngine.guidanceState(elapsedMs, state.currentChallenge);

    setGuidance(guidance);
  }

  function init() {
    state.timer = window.timerModule.createTimer(updateTick);
    setTimerText(window.timerModule.format(0));

    window.challengeEngine.loadChallenges().then(function (challenges) {
      state.challenges = challenges;
      state.commandGroups = window.challengeEngine.getCommandGroups(challenges);
      populateGroups(state.commandGroups);
      applyGroupFilter('mixed');
    });

    var onGroupChange = function () {
      applyGroupFilter(element('groupSelect').value);
    };
    element('groupSelect').addEventListener('change', onGroupChange);
    element('groupSelect').addEventListener('input', onGroupChange);

    element('startBtn').addEventListener('click', startAttempt);
    element('submitBtn').addEventListener('click', submitAttempt);
    element('keyCombo').addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && !event.isComposing) {
        event.preventDefault();
        submitAttempt();
      }
    });

    focusKeyComboInput();
    renderProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
