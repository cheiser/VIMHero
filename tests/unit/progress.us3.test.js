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