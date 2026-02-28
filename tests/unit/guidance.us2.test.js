window.TestRunner.test('US2 guidance reveals hint at 30s and solution at 90s', function () {
  var challenge = {
    hintAtSeconds: 15,
    solutionAtSeconds: 30,
    hintText: 'hint',
    solutionText: 'solution'
  };

  var at30 = window.challengeEngine.guidanceState(15000, challenge);
  var at90 = window.challengeEngine.guidanceState(30000, challenge);

  window.TestRunner.assert(at30.hintVisible === true, 'hint should be visible at 30s');
  window.TestRunner.assert(at30.solutionVisible === false, 'solution should be hidden at 30s');
  window.TestRunner.assert(at90.solutionVisible === true, 'solution should be visible at 90s');
});

window.TestRunner.test('US2 scheduler emits only on state transitions', function () {
  var challenge = {
    hintAtSeconds: 15,
    solutionAtSeconds: 30,
    hintText: 'hint',
    solutionText: 'solution'
  };
  var transitions = 0;

  var scheduler = window.challengeEngine.createGuidanceScheduler(challenge, function () {
    transitions += 1;
  });

  scheduler.reset();
  scheduler.update(1000);
  scheduler.update(15000);
  scheduler.update(45000);
  scheduler.update(30000);

  window.TestRunner.assert(transitions === 2, 'expected transition events only at 30s and 90s');
});

window.TestRunner.test('US1 new command evaluation returns active state for incorrect combo', function () {
  var challenge = {
    allowedKeyCombos: ['yi)'],
    sourceText: 'call(alpha beta)',
    hintAtSeconds: 15,
    solutionAtSeconds: 30
  };

  var result = window.challengeEngine.validateSubmission(challenge, 'yy', 'alpha beta');
  window.TestRunner.assert(result.status === 'in_progress', 'incorrect new command combo should keep attempt active');
});
