window.TestRunner.test('US2 boundary below hint threshold has no hint', function () {
  var challenge = {
    hintAtSeconds: 30,
    solutionAtSeconds: 90,
    hintText: 'hint',
    solutionText: 'solution'
  };

  var state = window.challengeEngine.guidanceState(29999, challenge);
  window.TestRunner.assert(state.hintVisible === false, 'hint must be hidden at 29.999s');
});

window.TestRunner.test('US2 boundary exact hint and solution thresholds reveal states', function () {
  var challenge = {
    hintAtSeconds: 30,
    solutionAtSeconds: 90,
    hintText: 'hint',
    solutionText: 'solution'
  };

  var hintState = window.challengeEngine.guidanceState(30000, challenge);
  var solutionState = window.challengeEngine.guidanceState(90000, challenge);

  window.TestRunner.assert(hintState.hintVisible === true, 'hint must be visible at exactly 30s');
  window.TestRunner.assert(solutionState.solutionVisible === true, 'solution must be visible at exactly 90s');
});