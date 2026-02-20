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

    tests.forEach(function (entry) {
      try {
        entry.fn();
      } catch (error) {
        failures.push(entry.name + ': ' + error.message);
      }
    });

    var output = document.getElementById('testOutput');
    output.textContent = failures.length
      ? 'FAILED\n' + failures.join('\n')
      : 'PASSED (' + tests.length + ' tests)';
  }

  function resetStorage() {
    if (window.progressStore && typeof window.progressStore.resetAll === 'function') {
      window.progressStore.resetAll();
    }
  }

  window.TestRunner = {
    assert: assert,
    test: test,
    run: run,
    resetStorage: resetStorage
  };
})();