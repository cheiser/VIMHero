window.TestRunner.test('timer foundation formats elapsed mm:ss', function () {
  var value = window.timerModule.format(61000);
  window.TestRunner.assert(value === '01:01', 'expected 01:01 for 61s');
});

window.TestRunner.test('timer foundation reports elapsed via injected clock', function () {
  var now = 1000;
  var scheduled = null;

  var timer = window.timerModule.createTimer(null, {
    now: function () { return now; },
    setIntervalFn: function (callback) {
      scheduled = callback;
      return 1;
    },
    clearIntervalFn: function () {}
  });

  timer.start();
  now = 2200;
  scheduled();

  window.TestRunner.assert(timer.elapsedMs() === 1200, 'expected elapsed 1200');
});