window.TestRunner.test('US3 session summary aggregates attempts and averages', function () {
  window.TestRunner.resetStorage();

  window.progressStore.recordAttemptStart({
    attemptId: 'attempt-1',
    challengeId: 'copy-001',
    startedAt: new Date().toISOString()
  });
  window.progressStore.recordAttemptOutcome('attempt-1', 'passed', 1000, true, false, 'yy', 'alpha beta', '');

  window.progressStore.recordAttemptStart({
    attemptId: 'attempt-2',
    challengeId: 'copy-002',
    startedAt: new Date().toISOString()
  });
  window.progressStore.recordAttemptOutcome('attempt-2', 'failed', 3000, false, true, 'yiw', 'wrong', 'Output mismatch');

  var session = window.progressStore.getSession();

  window.TestRunner.assert(session.attemptsCount === 2, 'session attempts should equal 2');
  window.TestRunner.assert(session.passedCount === 1, 'session passed count should equal 1');
  window.TestRunner.assert(session.failedCount === 1, 'session failed count should equal 1');
  window.TestRunner.assert(session.hintsShownCount === 1, 'session hints count should equal 1');
  window.TestRunner.assert(session.solutionsShownCount === 1, 'session solutions count should equal 1');
  window.TestRunner.assert(session.averageCompletionMs === 2000, 'average completion should be 2000ms');
});