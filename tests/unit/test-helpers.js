(function () {
  var tests = [];
  var failures = [];

  function assert(condition, message) {
    if (!condition) {
      failures.push(message || 'Assertion failed');
    }
  }

  function test(name, fn) {
    tests.push({ name: name, fn: fn });
  }

  function run() {
    failures = [];
    var chain = Promise.resolve();

    tests.forEach(function (entry) {
      chain = chain.then(function () {
        try {
          return Promise.resolve(entry.fn());
        } catch (error) {
          failures.push(entry.name + ': ' + error.message);
          return Promise.resolve();
        }
      }).catch(function (error) {
        failures.push(entry.name + ': ' + error.message);
      });
    });

    return chain.then(function () {
      var output = document.getElementById('testOutput');
      output.textContent = failures.length
        ? 'FAILED\n' + failures.join('\n')
        : 'PASSED (' + tests.length + ' tests)';
    });
  }

  function resetStorage() {
    if (window.progressStore && typeof window.progressStore.resetAll === 'function') {
      window.progressStore.resetAll();
    }
  }

  function groupIds(challenges) {
    return (challenges || []).map(function (challenge) {
      return challenge.groupId;
    });
  }

  function challengeIds(challenges) {
    return (challenges || []).map(function (challenge) {
      return challenge.challengeId;
    });
  }

  function assertContainsAll(actualValues, expectedValues, label) {
    expectedValues.forEach(function (value) {
      assert(actualValues.indexOf(value) >= 0, (label || 'values') + ' should include ' + value);
    });
  }

  window.TestRunner = {
    assert: assert,
    test: test,
    run: run,
    resetStorage: resetStorage,
    groupIds: groupIds,
    challengeIds: challengeIds,
    assertContainsAll: assertContainsAll
  };
})();
