window.TestRunner.test('US1 timer emits elapsed display through onTick', function () {
  var now = 1000;
  var scheduled = null;
  var seenText = '';

  var timer = window.timerModule.createTimer(function (elapsedMs, text) {
    if (elapsedMs >= 60000) {
      seenText = text;
    }
  }, {
    now: function () { return now; },
    setIntervalFn: function (callback) {
      scheduled = callback;
      return 7;
    },
    clearIntervalFn: function () {}
  });

  timer.start();
  now = 61000;
  scheduled();

  window.TestRunner.assert(seenText === '01:00', 'expected timer text 01:00 after 60s');
});