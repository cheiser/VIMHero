(function () {
  var events = [];

  function safeStringify(value) {
    try {
      return JSON.stringify(value);
    } catch (error) {
      return '"[unserializable]"';
    }
  }

  function render() {
    var el = document.getElementById('eventHistory');
    if (!el) {
      return;
    }

    var text = events
      .map(function (eventEntry) {
        var suffix = Object.keys(eventEntry.details || {}).length
          ? ' ' + safeStringify(eventEntry.details)
          : '';
        return eventEntry.at + ' ' + eventEntry.event + suffix;
      })
      .join('\n');

    el.textContent = text;
  }

  window.eventLog = {
    add: function (event, details) {
      events.push({
        event: event,
        details: details || {},
        at: new Date().toISOString()
      });
      render();
    },
    list: function () {
      return events.slice();
    },
    clear: function () {
      events.length = 0;
      render();
    }
  };
})();