(function () {
  function format(ms) {
    var totalSeconds = Math.floor(ms / 1000);
    var minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    var seconds = String(totalSeconds % 60).padStart(2, '0');
    return minutes + ':' + seconds;
  }

  function createTimer(onTick, options) {
    var config = options || {};
    var intervalMs = config.intervalMs || 200;
    var now = config.now || function () { return Date.now(); };
    var setIntervalFn = config.setIntervalFn || function (cb, ms) { return window.setInterval(cb, ms); };
    var clearIntervalFn = config.clearIntervalFn || function (id) { return window.clearInterval(id); };

    var startedAt = 0;
    var elapsed = 0;
    var intervalId = null;

    function computeElapsed() {
      return Math.max(0, now() - startedAt);
    }

    function emitTick() {
      if (typeof onTick === 'function') {
        onTick(elapsed, format(elapsed));
      }
    }

    return {
      start: function () {
        if (intervalId !== null) {
          return;
        }

        startedAt = now() - elapsed;
        intervalId = setIntervalFn(function () {
          elapsed = computeElapsed();
          emitTick();
        }, intervalMs);
      },
      stop: function () {
        if (intervalId !== null) {
          clearIntervalFn(intervalId);
          intervalId = null;
          elapsed = computeElapsed();
        }
        return elapsed;
      },
      reset: function () {
        if (intervalId !== null) {
          clearIntervalFn(intervalId);
          intervalId = null;
        }
        elapsed = 0;
        emitTick();
      },
      elapsedMs: function () {
        return intervalId !== null ? computeElapsed() : elapsed;
      },
      format: format
    };
  }

  window.timerModule = {
    createTimer: createTimer,
    format: format
  };
})();