window.TestRunner.test('progress-store foundation defaults', function () {
  window.TestRunner.resetStorage();
  var profile = window.progressStore.getProfile();
  var session = window.progressStore.getSession();

  window.TestRunner.assert(profile.totalScore === 0, 'expected score default 0');
  window.TestRunner.assert(profile.currentStreak === 0, 'expected streak default 0');
  window.TestRunner.assert(session.attemptsCount === 0, 'expected attemptsCount default 0');
});

window.TestRunner.test('progress-store foundation start increments attempts', function () {
  window.TestRunner.resetStorage();

  window.progressStore.recordAttemptStart({
    attemptId: 'attempt-1',
    challengeId: 'copy-001',
    startedAt: new Date().toISOString()
  });

  var profile = window.progressStore.getProfile();
  var session = window.progressStore.getSession();

  window.TestRunner.assert(profile.totalAttempts === 1, 'expected totalAttempts 1');
  window.TestRunner.assert(session.attemptsCount === 1, 'expected session attemptsCount 1');
});

window.TestRunner.test('progress-store foundation migration preserves profile defaults and initializes command progress', function () {
  window.TestRunner.resetStorage();
  window.localStorage.removeItem('vimhero.schema.version');
  window.localStorage.removeItem('vimhero.commandProgress');

  var profile = window.progressStore.getProfile();
  var allProgress = window.progressStore.getAllCommandProgress();

  window.TestRunner.assert(profile.profileId === 'local', 'profile should remain available after migration');
  window.TestRunner.assert(Array.isArray(allProgress), 'command progress should initialize as array view');
});
