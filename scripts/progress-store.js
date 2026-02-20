(function () {
  var PROFILE_KEY = 'vimhero.profile';
  var ATTEMPTS_KEY = 'vimhero.attempts';
  var SESSION_KEY = 'vimhero.session';

  var memoryStorage = {};

  function storage() {
    try {
      if (window.localStorage) {
        return window.localStorage;
      }
    } catch (error) {
      // Fall through to memory storage.
    }

    return {
      getItem: function (key) {
        return Object.prototype.hasOwnProperty.call(memoryStorage, key) ? memoryStorage[key] : null;
      },
      setItem: function (key, value) {
        memoryStorage[key] = String(value);
      },
      removeItem: function (key) {
        delete memoryStorage[key];
      }
    };
  }

  function readJson(key, fallbackFactory) {
    var store = storage();

    try {
      var raw = store.getItem(key);
      if (!raw) {
        var created = fallbackFactory();
        store.setItem(key, JSON.stringify(created));
        return created;
      }
      return JSON.parse(raw);
    } catch (error) {
      var fallback = fallbackFactory();
      try {
        store.setItem(key, JSON.stringify(fallback));
      } catch (writeError) {
        memoryStorage[key] = JSON.stringify(fallback);
      }
      return fallback;
    }
  }

  function writeJson(key, value) {
    var serialized = JSON.stringify(value);
    try {
      storage().setItem(key, serialized);
    } catch (error) {
      memoryStorage[key] = serialized;
    }
  }

  function defaultProfile() {
    return {
      profileId: 'local',
      totalScore: 0,
      currentStreak: 0,
      bestStreak: 0,
      completedChallenges: 0,
      totalAttempts: 0,
      lastActiveAt: null
    };
  }

  function defaultSession() {
    return {
      sessionId: 'current',
      startedAt: new Date().toISOString(),
      endedAt: null,
      attemptsCount: 0,
      passedCount: 0,
      failedCount: 0,
      averageCompletionMs: null,
      hintsShownCount: 0,
      solutionsShownCount: 0
    };
  }

  function average(values) {
    if (!values.length) {
      return null;
    }

    var total = values.reduce(function (sum, value) {
      return sum + value;
    }, 0);

    return Math.round(total / values.length);
  }

  window.progressStore = {
    getProfile: function () {
      return readJson(PROFILE_KEY, defaultProfile);
    },
    saveProfile: function (profile) {
      writeJson(PROFILE_KEY, profile);
    },
    getAttempts: function () {
      return readJson(ATTEMPTS_KEY, function () { return []; });
    },
    saveAttempts: function (attempts) {
      writeJson(ATTEMPTS_KEY, attempts);
    },
    getSession: function () {
      return readJson(SESSION_KEY, defaultSession);
    },
    saveSession: function (session) {
      writeJson(SESSION_KEY, session);
    },
    resetAll: function () {
      var store = storage();
      try {
        store.removeItem(PROFILE_KEY);
        store.removeItem(ATTEMPTS_KEY);
        store.removeItem(SESSION_KEY);
      } catch (error) {
        // Ignore storage removal failures and clear memory fallback.
      }
      delete memoryStorage[PROFILE_KEY];
      delete memoryStorage[ATTEMPTS_KEY];
      delete memoryStorage[SESSION_KEY];
    },
    recordAttemptStart: function (attempt) {
      var attempts = this.getAttempts();
      attempts.push({
        attemptId: attempt.attemptId,
        challengeId: attempt.challengeId,
        startedAt: attempt.startedAt,
        endedAt: null,
        elapsedMs: null,
        status: 'in_progress',
        submittedKeyCombo: null,
        submittedOutput: null,
        errorMessage: null,
        hintShown: false,
        solutionShown: false
      });
      this.saveAttempts(attempts);

      var profile = this.getProfile();
      profile.totalAttempts += 1;
      profile.lastActiveAt = new Date().toISOString();
      this.saveProfile(profile);

      var session = this.getSession();
      session.attemptsCount += 1;
      this.saveSession(session);
    },
    recordAttemptOutcome: function (attemptId, status, elapsedMs, hintShown, solutionShown, submittedKeyCombo, submittedOutput, errorMessage) {
      var attempts = this.getAttempts();
      var updatedAttempts = attempts.map(function (attempt) {
        if (attempt.attemptId !== attemptId) {
          return attempt;
        }

        attempt.status = status;
        attempt.elapsedMs = elapsedMs;
        attempt.endedAt = new Date().toISOString();
        attempt.hintShown = Boolean(hintShown);
        attempt.solutionShown = Boolean(solutionShown);
        attempt.submittedKeyCombo = submittedKeyCombo || null;
        attempt.submittedOutput = submittedOutput || null;
        attempt.errorMessage = errorMessage || null;
        return attempt;
      });
      this.saveAttempts(updatedAttempts);

      var profile = this.getProfile();
      if (status === 'passed') {
        profile.totalScore += 10;
        profile.currentStreak += 1;
        profile.bestStreak = Math.max(profile.bestStreak, profile.currentStreak);
        profile.completedChallenges += 1;
      }

      if (status === 'failed') {
        profile.currentStreak = 0;
      }

      profile.lastActiveAt = new Date().toISOString();
      this.saveProfile(profile);

      var session = this.getSession();
      if (status === 'passed') {
        session.passedCount += 1;
      }

      if (status === 'failed') {
        session.failedCount += 1;
      }

      if (hintShown) {
        session.hintsShownCount += 1;
      }

      if (solutionShown) {
        session.solutionsShownCount += 1;
      }

      var completedAttempts = updatedAttempts.filter(function (attempt) {
        return attempt.status === 'passed' || attempt.status === 'failed';
      });

      session.averageCompletionMs = average(
        completedAttempts.map(function (attempt) {
          return attempt.elapsedMs || 0;
        })
      );

      this.saveSession(session);
    }
  };
})();
