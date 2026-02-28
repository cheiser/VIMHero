window.TestRunner.test('US1 allowed combo with matching output passes', function () {
  var challenge = {
    allowedKeyCombos: ['yy'],
    sourceText: 'alpha beta',
    hintAtSeconds: 15,
    solutionAtSeconds: 30
  };

  var result = window.challengeEngine.validateSubmission(challenge, 'yy', 'alpha beta');

  window.TestRunner.assert(result.status === 'passed', 'expected passed status');
  window.TestRunner.assert(result.allowedCombo === true, 'expected allowedCombo true');
});

window.TestRunner.test('US1 allowed combo passes even when output differs', function () {
  var challenge = {
    allowedKeyCombos: ['yy'],
    sourceText: 'alpha beta',
    hintAtSeconds: 15,
    solutionAtSeconds: 30
  };

  var result = window.challengeEngine.validateSubmission(challenge, 'yy', 'different');

  window.TestRunner.assert(result.status === 'passed', 'expected passed status');
});

window.TestRunner.test('US1 disallowed combo returns explicit error while active', function () {
  var challenge = {
    allowedKeyCombos: ['yy'],
    sourceText: 'alpha beta',
    hintAtSeconds: 15,
    solutionAtSeconds: 30
  };

  var result = window.challengeEngine.validateSubmission(challenge, 'p', 'alpha beta');

  window.TestRunner.assert(result.status === 'in_progress', 'attempt should remain active');
  window.TestRunner.assert(result.errorMessage.length > 0, 'expected error message');
});

window.TestRunner.test('US1 command groups include navigation editing and text-objects', function () {
  var challenges = [
    { challengeId: 'copy-001', groupId: 'navigation', groupName: 'Navigation' },
    { challengeId: 'copy-002', groupId: 'editing', groupName: 'Editing' },
    { challengeId: 'copy-003', groupId: 'text-objects', groupName: 'Text Objects' }
  ];

  var groups = window.challengeEngine.getCommandGroups(challenges);
  var ids = groups.map(function (entry) { return entry.groupId; });

  window.TestRunner.assertContainsAll(ids, ['navigation', 'editing', 'text-objects'], 'groupIds');
});
