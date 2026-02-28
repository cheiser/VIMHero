(function () {
  var fallbackChallenges = [
    {
      challengeId: 'copy-001',
      groupId: 'navigation',
      groupName: 'Navigation',
      title: 'Copy Current Line',
      prompt: 'Copy the full current line.',
      sourceText: 'alpha beta gamma',
      targetInstruction: 'Use a valid Vim copy combination.',
      allowedKeyCombos: ['yy', 'Y'],
      difficultyLevel: 'beginner',
      hintText: 'Try line yank commands.',
      solutionText: 'Use yy (or Y) in normal mode.',
      hintAtSeconds: 15,
      solutionAtSeconds: 30
    },
    {
      challengeId: 'copy-002',
      groupId: 'text-objects',
      groupName: 'Text Objects',
      title: 'Copy Current Word',
      prompt: 'Copy only the current word.',
      sourceText: 'delta epsilon zeta',
      targetInstruction: 'Use a word-yank combination.',
      allowedKeyCombos: ['yiw'],
      difficultyLevel: 'beginner',
      hintText: 'Text objects help with word granularity.',
      solutionText: 'Use yiw in normal mode.',
      hintAtSeconds: 15,
      solutionAtSeconds: 30
    },
    {
      challengeId: 'copy-003',
      groupId: 'editing',
      groupName: 'Editing',
      title: 'Copy To End Of Line',
      prompt: 'Copy from cursor to line end.',
      sourceText: 'vim hero training',
      targetInstruction: 'Use a valid to-end yank combination.',
      allowedKeyCombos: ['y$'],
      difficultyLevel: 'beginner',
      hintText: 'Use a motion that reaches line end.',
      solutionText: 'Use y$ in normal mode.',
      hintAtSeconds: 15,
      solutionAtSeconds: 30
    },
    {
      challengeId: 'copy-004',
      groupId: 'navigation',
      groupName: 'Navigation',
      title: 'Copy To Next Word',
      prompt: 'Copy from cursor to the start of the next word.',
      sourceText: 'jump quickly now',
      targetInstruction: 'Use a yank + motion combination.',
      allowedKeyCombos: ['yw'],
      difficultyLevel: 'beginner',
      hintText: 'Use a word motion after yank.',
      solutionText: 'Use yw in normal mode.',
      hintAtSeconds: 15,
      solutionAtSeconds: 30
    },
    {
      challengeId: 'copy-005',
      groupId: 'editing',
      groupName: 'Editing',
      title: 'Copy Inside Parentheses',
      prompt: 'Copy only the text inside parentheses.',
      sourceText: 'call(alpha beta)',
      targetInstruction: 'Use a text object combination for inside parentheses.',
      allowedKeyCombos: ['yi)'],
      difficultyLevel: 'intermediate',
      hintText: 'Inside text object is useful here.',
      solutionText: 'Use yi) in normal mode.',
      hintAtSeconds: 15,
      solutionAtSeconds: 30
    },
    {
      challengeId: 'copy-006',
      groupId: 'text-objects',
      groupName: 'Text Objects',
      title: 'Copy Around Word',
      prompt: 'Copy the current word including surrounding spacing where applicable.',
      sourceText: 'vim hero mastery',
      targetInstruction: 'Use an around-word text object.',
      allowedKeyCombos: ['yaw'],
      difficultyLevel: 'intermediate',
      hintText: 'Around-word differs from inner-word.',
      solutionText: 'Use yaw in normal mode.',
      hintAtSeconds: 15,
      solutionAtSeconds: 30
    },
    {
      challengeId: 'copy-007',
      groupId: 'navigation',
      groupName: 'Navigation',
      title: 'Go To Start Of File',
      prompt: 'Move the cursor to the first line of the file.',
      sourceText: 'line one\nline two\nline three',
      targetInstruction: 'Use a normal-mode file-start motion.',
      allowedKeyCombos: ['gg'],
      difficultyLevel: 'beginner',
      hintText: 'Use the command that jumps to line 1.',
      solutionText: 'Use gg in normal mode.',
      hintAtSeconds: 15,
      solutionAtSeconds: 30
    },
    {
      challengeId: 'copy-008',
      groupId: 'navigation',
      groupName: 'Navigation',
      title: 'Go To End Of File',
      prompt: 'Move the cursor to the last line of the file.',
      sourceText: 'line one\nline two\nline three',
      targetInstruction: 'Use a normal-mode file-end motion.',
      allowedKeyCombos: ['G'],
      difficultyLevel: 'beginner',
      hintText: 'Use the command that jumps to the last line.',
      solutionText: 'Use G in normal mode.',
      hintAtSeconds: 15,
      solutionAtSeconds: 30
    },
    {
      challengeId: 'copy-009',
      groupId: 'editing',
      groupName: 'Editing',
      title: 'Select All And Copy',
      prompt: 'Select all text in the file and yank it.',
      sourceText: 'alpha beta\ngamma delta\nepsilon zeta',
      targetInstruction: 'Use a full-file visual selection then yank.',
      allowedKeyCombos: ['ggVGy'],
      difficultyLevel: 'intermediate',
      hintText: 'Jump to top, select to bottom, then yank.',
      solutionText: 'Use ggVGy in normal mode.',
      hintAtSeconds: 15,
      solutionAtSeconds: 30
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
    var groupId = normalizeCombo(challenge.groupId || '').toLowerCase() || 'mixed';
    var groupName = normalizeCombo(challenge.groupName) || 'Mixed';
    return {
      challengeId: challenge.challengeId,
      groupId: groupId,
      groupName: groupName,
      title: challenge.title,
      prompt: challenge.prompt,
      sourceText: challenge.sourceText,
      targetInstruction: challenge.targetInstruction || '',
      allowedKeyCombos: challenge.allowedKeyCombos.map(function (combo) { return normalizeCombo(combo); }),
      difficultyLevel: challenge.difficultyLevel || 'beginner',
      hintText: challenge.hintText,
      solutionText: challenge.solutionText,
      hintAtSeconds: challenge.hintAtSeconds,
      solutionAtSeconds: challenge.solutionAtSeconds
    };
  }

  function uniqueBy(arr, keyFn) {
    var seen = {};
    var out = [];
    arr.forEach(function (item) {
      var key = keyFn(item);
      if (!seen[key]) {
        seen[key] = true;
        out.push(item);
      }
    });
    return out;
  }

  function getCommandGroups(challenges) {
    var normalized = Array.isArray(challenges) ? challenges : [];
    var groups = uniqueBy(normalized.map(function (challenge) {
      return {
        groupId: challenge.groupId || 'mixed',
        name: challenge.groupName || 'Mixed'
      };
    }), function (group) { return group.groupId; });

    return groups.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  function filterChallengesByGroup(challenges, groupId) {
    var requestedGroupId = normalizeCombo(groupId).toLowerCase();
    if (!requestedGroupId || requestedGroupId === 'mixed') {
      return (challenges || []).slice();
    }

    var filtered = (challenges || []).filter(function (challenge) {
      return normalizeCombo(challenge.groupId).toLowerCase() === requestedGroupId;
    });

    return filtered.length ? filtered : (challenges || []).slice();
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
        errorMessage: '',
        guidanceText: ''
      };
    },
    getCommandGroups: getCommandGroups,
    filterChallengesByGroup: filterChallengesByGroup,
    guidanceState: guidanceState,
    createGuidanceScheduler: createGuidanceScheduler
  };
})();
