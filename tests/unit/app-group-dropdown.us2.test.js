window.TestRunner.test('US2 app updates challenge dropdown when command group changes', function () {
  function ensureElement(tagName, id) {
    var existing = document.getElementById(id);
    if (existing) {
      return existing;
    }

    var node = document.createElement(tagName);
    node.id = id;
    document.body.appendChild(node);
    return node;
  }

  [
    ['select', 'groupSelect'],
    ['select', 'challengeSelect'],
    ['button', 'startBtn'],
    ['button', 'submitBtn'],
    ['p', 'feedback'],
    ['p', 'timer'],
    ['pre', 'prompt'],
    ['pre', 'sourceText'],
    ['input', 'keyCombo'],
    ['textarea', 'outputText'],
    ['p', 'hint'],
    ['p', 'solution'],
    ['p', 'score'],
    ['p', 'streak'],
    ['pre', 'sessionSummary'],
    ['pre', 'commandProgress'],
    ['pre', 'eventHistory']
  ].forEach(function (entry) {
    ensureElement(entry[0], entry[1]);
  });

  var stubChallenges = [
    { challengeId: 'copy-001', groupId: 'navigation', groupName: 'Navigation', title: 'Copy Current Line', prompt: '', sourceText: '', allowedKeyCombos: ['yy'], hintText: '', solutionText: '', hintAtSeconds: 15, solutionAtSeconds: 30 },
    { challengeId: 'copy-002', groupId: 'editing', groupName: 'Editing', title: 'Copy To End Of Line', prompt: '', sourceText: '', allowedKeyCombos: ['y$'], hintText: '', solutionText: '', hintAtSeconds: 15, solutionAtSeconds: 30 },
    { challengeId: 'copy-003', groupId: 'navigation', groupName: 'Navigation', title: 'Copy To Next Word', prompt: '', sourceText: '', allowedKeyCombos: ['yw'], hintText: '', solutionText: '', hintAtSeconds: 15, solutionAtSeconds: 30 }
  ];

  var originalLoadChallenges = window.challengeEngine.loadChallenges;
  window.challengeEngine.loadChallenges = function () {
    return Promise.resolve(stubChallenges.slice());
  };

  function loadAppScript() {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = '../../scripts/app.js';
      script.onload = resolve;
      script.onerror = function () {
        reject(new Error('failed to load app.js in test'));
      };
      document.body.appendChild(script);
    });
  }

  return loadAppScript()
    .then(function () {
      return new Promise(function (resolve) {
        window.setTimeout(resolve, 0);
      });
    })
    .then(function () {
      var groupSelect = document.getElementById('groupSelect');
      var challengeSelect = document.getElementById('challengeSelect');

      var beforeValues = Array.from(challengeSelect.options).map(function (option) { return option.value; });
      window.TestRunner.assert(beforeValues.length === 3, 'mixed group should show all challenges');

      groupSelect.value = 'editing';
      groupSelect.dispatchEvent(new Event('change'));

      var afterValues = Array.from(challengeSelect.options).map(function (option) { return option.value; });
      window.TestRunner.assert(afterValues.length === 1, 'editing group should show one challenge');
      window.TestRunner.assert(afterValues[0] === 'copy-002', 'challenge dropdown should update to editing challenge');
      window.TestRunner.assert(challengeSelect.value === 'copy-002', 'challenge dropdown selection should sync with filtered list');
    })
    .finally(function () {
      window.challengeEngine.loadChallenges = originalLoadChallenges;
    });
});
