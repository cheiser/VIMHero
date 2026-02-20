(function () {
  function now() {
    return Date.now();
  }

  function percentile(values, value) {
    if (!values.length) {
      return 0;
    }

    var sorted = values.slice().sort(function (a, b) { return a - b; });
    var index = Math.max(0, Math.ceil(sorted.length * value) - 1);
    return sorted[index];
  }

  window.perfMetrics = {
    marks: [],
    start: function (label) {
      var stamp = now();
      this.marks.push({ label: label, type: 'start', at: stamp });
      return stamp;
    },
    end: function (label, startedAt) {
      var stamp = now();
      var durationMs = Math.max(0, stamp - startedAt);
      this.marks.push({ label: label, type: 'end', at: stamp, durationMs: durationMs });
      return durationMs;
    },
    durations: function (label) {
      return this.marks
        .filter(function (mark) { return mark.label === label && mark.type === 'end'; })
        .map(function (mark) { return mark.durationMs; });
    },
    p95: function (label) {
      return percentile(this.durations(label), 0.95);
    },
    clear: function () {
      this.marks = [];
    }
  };
})();