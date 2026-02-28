window.TestRunner.test('challenge-engine foundation disallowed combo keeps attempt active', function () {
  var challenge = {
    allowedKeyCombos: ['yy'],
    sourceText: 'alpha',
    hintAtSeconds: 15,
    solutionAtSeconds: 30
  };

  var result = window.challengeEngine.validateSubmission(challenge, 'dd', 'alpha');

  window.TestRunner.assert(result.status === 'in_progress', 'expected in_progress status');
  window.TestRunner.assert(result.allowedCombo === false, 'expected allowedCombo false');
});

window.TestRunner.test('challenge-engine foundation guidance hidden before threshold', function () {
  var challenge = {
    hintAtSeconds: 15,
    solutionAtSeconds: 30,
    hintText: 'hint',
    solutionText: 'solution'
  };

  var result = window.challengeEngine.guidanceState(29000, challenge);

  window.TestRunner.assert(result.hintVisible === false, 'hint should be hidden before 30s');
  window.TestRunner.assert(result.solutionVisible === false, 'solution should be hidden before 90s');
});

window.TestRunner.test('challenge-engine foundation filters by group and falls back when empty', function () {
  var challenges = [
    { challengeId: 'copy-001', groupId: 'navigation' },
    { challengeId: 'copy-002', groupId: 'editing' }
  ];

  var navigation = window.challengeEngine.filterChallengesByGroup(challenges, 'navigation');
  var fallback = window.challengeEngine.filterChallengesByGroup(challenges, 'missing-group');

  window.TestRunner.assert(navigation.length === 1, 'navigation group should return one challenge');
  window.TestRunner.assert(navigation[0].challengeId === 'copy-001', 'should keep only navigation challenge');
  window.TestRunner.assert(fallback.length === 2, 'missing group should fallback to mixed set');
});
