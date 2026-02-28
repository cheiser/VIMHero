(function () {
  var events = [];
  var EVENT_TYPES = {
    GROUP_SELECTED: 'group_selected',
    PROMPT_SERVED: 'prompt_served',
    EVALUATE_FAIL: 'evaluate_fail',
    PROGRESS_WRITE: 'progress_write'
  };

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
    eventTypes: EVENT_TYPES,
    add: function (event, details) {
      events.push({
        event: event,
        details: details || {},
        at: new Date().toISOString()
      });
      render();
    },
    addTyped: function (type, payload) {
      var safePayload = payload && typeof payload === 'object' ? payload : {};
      this.add(type, safePayload);
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
