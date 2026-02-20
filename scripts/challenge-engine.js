(function () {
  var fallbackChallenges = [
    {
      challengeId: 'copy-001',
      title: 'Copy Current Line',
      prompt: 'Copy the full current line.',
      sourceText: 'alpha beta gamma',
      targetInstruction: 'Use a valid Vim copy combination.',
      allowedKeyCombos: ['yy', 'Y'],
      hintText: 'Try line yank commands.',
      solutionText: 'Use yy (or Y) in normal mode.',
      hintAtSeconds: 30,
      solutionAtSeconds: 90
    },
    {
      challengeId: 'copy-002',
      title: 'Copy Current Word',
      prompt: 'Copy only the current word.',
      sourceText: 'delta epsilon zeta',
      targetInstruction: 'Use a word-yank combination.',
      allowedKeyCombos: ['yiw'],
      hintText: 'Text objects help with word granularity.',
      solutionText: 'Use yiw in normal mode.',
      hintAtSeconds: 30,
      solutionAtSeconds: 90
    }
  ];

  function normalizeCombo(value) {
    return String(value || '').trim();
  }

  function isValidChallenge(challenge) {
    if (!challenge || typeof challenge !== 'object') {
      return false;
    }

    if (!challenge.challengeId || !challenge.title || !Array.isArray(challenge.allowedKeyCombos)) {
      return false;
    }

    if (typeof challenge.hintAtSeconds !== 'number' || typeof challenge.solutionAtSeconds !== 'number') {
      return false;
    }

    if (challenge.hintAtSeconds >= challenge.solutionAtSeconds) {
      return false;
    }

    if (!challenge.allowedKeyCombos.length) {
      return false;
    }

    return true;
  }

  function sanitizeChallenge(challenge) {
    return {
      challengeId: challenge.challengeId,
      title: challenge.title,
      prompt: challenge.prompt,
      sourceText: challenge.sourceText,
      targetInstruction: challenge.targetInstruction || '',
      allowedKeyCombos: challenge.allowedKeyCombos.map(function (combo) { return normalizeCombo(combo); }),
      hintText: challenge.hintText,
      solutionText: challenge.solutionText,
      hintAtSeconds: challenge.hintAtSeconds,
      solutionAtSeconds: challenge.solutionAtSeconds
    };
  }

  function guidanceState(elapsedMs, challenge) {
    var seconds = Math.floor(Math.max(0, elapsedMs) / 1000);
    var hintVisible = seconds >= challenge.hintAtSeconds;
    var solutionVisible = seconds >= challenge.solutionAtSeconds;

    return {
      hintVisible: hintVisible,
      solutionVisible: solutionVisible,
      hintText: hintVisible ? challenge.hintText : '',
      solutionText: solutionVisible ? challenge.solutionText : ''
    };
  }

  function createGuidanceScheduler(challenge, onStateChange) {
    var previous = {
      hintVisible: false,
      solutionVisible: false
    };

    return {
      reset: function () {
        previous = {
          hintVisible: false,
          solutionVisible: false
        };
      },
      update: function (elapsedMs) {
        var next = guidanceState(elapsedMs, challenge);
        if (next.hintVisible !== previous.hintVisible || next.solutionVisible !== previous.solutionVisible) {
          previous = {
            hintVisible: next.hintVisible,
            solutionVisible: next.solutionVisible
          };
          if (typeof onStateChange === 'function') {
            onStateChange(next);
          }
        }
        return next;
      }
    };
  }

  window.challengeEngine = {
    loadChallenges: function () {
      return fetch('data/challenges.json')
        .then(function (response) {
          if (!response.ok) {
            throw new Error('challenge data unavailable');
          }
          return response.json();
        })
        .then(function (challenges) {
          if (!Array.isArray(challenges)) {
            throw new Error('challenge data must be an array');
          }

          var validChallenges = challenges.filter(isValidChallenge).map(sanitizeChallenge);
          if (!validChallenges.length) {
            throw new Error('no valid challenges found');
          }

          return validChallenges;
        })
        .catch(function () {
          return fallbackChallenges.slice();
        });
    },
    validateSubmission: function (challenge, submittedKeyCombo, submittedOutput) {
      var combo = normalizeCombo(submittedKeyCombo);
      var allowedCombo = challenge.allowedKeyCombos.indexOf(combo) >= 0;

      if (!allowedCombo) {
        return {
          status: 'in_progress',
          allowedCombo: false,
          errorMessage: 'Invalid key combination for this challenge.'
        };
      }
      return {
        status: 'passed',
        allowedCombo: true,
        errorMessage: ''
      };
    },
    guidanceState: guidanceState,
    createGuidanceScheduler: createGuidanceScheduler
  };
})();
