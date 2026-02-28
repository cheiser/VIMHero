window.TestRunner.test('US2 group filtering keeps only selected command-group challenges', function () {
  var challenges = [
    { challengeId: 'copy-001', groupId: 'navigation' },
    { challengeId: 'copy-002', groupId: 'editing' },
    { challengeId: 'copy-003', groupId: 'navigation' }
  ];

  var filtered = window.challengeEngine.filterChallengesByGroup(challenges, 'navigation');
  var ids = window.TestRunner.challengeIds(filtered);

  window.TestRunner.assert(filtered.length === 2, 'selected group should include two challenges');
  window.TestRunner.assertContainsAll(ids, ['copy-001', 'copy-003'], 'filtered challenge ids');
});

