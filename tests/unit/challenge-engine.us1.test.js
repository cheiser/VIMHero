window.TestRunner.test('US1 allowed combo with matching output passes', function () {
  var challenge = {
    allowedKeyCombos: ['yy'],
    sourceText: 'alpha beta',
    hintAtSeconds: 30,
    solutionAtSeconds: 90
  };

  var result = window.challengeEngine.validateSubmission(challenge, 'yy', 'alpha beta');

  window.TestRunner.assert(result.status === 'passed', 'expected passed status');
  window.TestRunner.assert(result.allowedCombo === true, 'expected allowedCombo true');
});

window.TestRunner.test('US1 allowed combo passes even when output differs', function () {
  var challenge = {
    allowedKeyCombos: ['yy'],
    sourceText: 'alpha beta',
    hintAtSeconds: 30,
    solutionAtSeconds: 90
  };

  var result = window.challengeEngine.validateSubmission(challenge, 'yy', 'different');

  window.TestRunner.assert(result.status === 'passed', 'expected passed status');
});

window.TestRunner.test('US1 disallowed combo returns explicit error while active', function () {
  var challenge = {
    allowedKeyCombos: ['yy'],
    sourceText: 'alpha beta',
    hintAtSeconds: 30,
    solutionAtSeconds: 90
  };

  var result = window.challengeEngine.validateSubmission(challenge, 'p', 'alpha beta');

  window.TestRunner.assert(result.status === 'in_progress', 'attempt should remain active');
  window.TestRunner.assert(result.errorMessage.length > 0, 'expected error message');
});
