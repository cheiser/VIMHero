window.TestRunner.test('US3 scoring and streak update for pass then fail', function () {
  window.TestRunner.resetStorage();

  window.progressStore.recordAttemptStart({
    attemptId: 'attempt-pass',
    challengeId: 'copy-001',
    startedAt: new Date().toISOString()
  });

  window.progressStore.recordAttemptOutcome('attempt-pass', 'passed', 1000, false, false, 'yy', 'alpha beta', '');

  var profileAfterPass = window.progressStore.getProfile();
  window.TestRunner.assert(profileAfterPass.totalScore === 10, 'score should increase by 10 on pass');
  window.TestRunner.assert(profileAfterPass.currentStreak === 1, 'streak should increment on pass');

  window.progressStore.recordAttemptStart({
    attemptId: 'attempt-fail',
    challengeId: 'copy-001',
    startedAt: new Date().toISOString()
  });

  window.progressStore.recordAttemptOutcome('attempt-fail', 'failed', 1500, false, false, 'yy', 'wrong', 'Output mismatch');

  var profileAfterFail = window.progressStore.getProfile();
  window.TestRunner.assert(profileAfterFail.currentStreak === 0, 'streak should reset on fail');
  window.TestRunner.assert(profileAfterFail.bestStreak >= 1, 'best streak should retain max value');
});

window.TestRunner.test('US3 command progress updates and mastery transitions', function () {
  window.TestRunner.resetStorage();

  window.progressStore.recordAttemptStart({
    attemptId: 'cmd-1',
    challengeId: 'copy-004',
    commandId: 'copy-004',
    startedAt: new Date().toISOString()
  });
  window.progressStore.recordAttemptOutcome('cmd-1', 'passed', 500, false, false, 'yw', 'jump ', '', 'copy-004');

  window.progressStore.recordAttemptStart({
    attemptId: 'cmd-2',
    challengeId: 'copy-004',
    commandId: 'copy-004',
    startedAt: new Date().toISOString()
  });
  window.progressStore.recordAttemptOutcome('cmd-2', 'passed', 500, false, false, 'yw', 'jump ', '', 'copy-004');

  window.progressStore.recordAttemptStart({
    attemptId: 'cmd-3',
    challengeId: 'copy-004',
    commandId: 'copy-004',
    startedAt: new Date().toISOString()
  });
  window.progressStore.recordAttemptOutcome('cmd-3', 'passed', 500, false, false, 'yw', 'jump ', '', 'copy-004');

  var progress = window.progressStore.getCommandProgress('copy-004');
  window.TestRunner.assert(progress.attemptsCount === 3, 'attempts should be tracked per command');
  window.TestRunner.assert(progress.successCount === 3, 'successes should be tracked per command');
  window.TestRunner.assert(progress.masteryStatus === 'proficient', 'mastery should become proficient after repeated success');
});
