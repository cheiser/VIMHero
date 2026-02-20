window.TestRunner.test('challenge-engine foundation disallowed combo keeps attempt active', function () {
  var challenge = {
    allowedKeyCombos: ['yy'],
    sourceText: 'alpha',
    hintAtSeconds: 30,
    solutionAtSeconds: 90
  };

  var result = window.challengeEngine.validateSubmission(challenge, 'dd', 'alpha');

  window.TestRunner.assert(result.status === 'in_progress', 'expected in_progress status');
  window.TestRunner.assert(result.allowedCombo === false, 'expected allowedCombo false');
});

window.TestRunner.test('challenge-engine foundation guidance hidden before threshold', function () {
  var challenge = {
    hintAtSeconds: 30,
    solutionAtSeconds: 90,
    hintText: 'hint',
    solutionText: 'solution'
  };

  var result = window.challengeEngine.guidanceState(29000, challenge);

  window.TestRunner.assert(result.hintVisible === false, 'hint should be hidden before 30s');
  window.TestRunner.assert(result.solutionVisible === false, 'solution should be hidden before 90s');
});