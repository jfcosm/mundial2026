// Local Storage & Scoring Management
(function() {
  const DEFAULT_USERS = [
    { username: "admin", password: "admin", avatar: "🏆", isAdmin: true },
    { username: "Messi10", password: "123", avatar: "🐐", isAdmin: false },
    { username: "Ronaldo7", password: "123", avatar: "⚡", isAdmin: false },
    { username: "NeymarJr", password: "123", avatar: "👑", isAdmin: false },
    { username: "Chicharito", password: "123", avatar: "🤖", isAdmin: false }
  ];

  const DEFAULT_PREDICTIONS = {
    "Messi10_m1": { homeGoals: 1, awayGoals: 2 },
    "Messi10_m2": { homeGoals: 2, awayGoals: 0 },
    "Messi10_m3": { homeGoals: 2, awayGoals: 1 },
    "Messi10_m4": { homeGoals: 3, awayGoals: 1 },
    "Messi10_m5": { homeGoals: 2, awayGoals: 0 },
    "Messi10_m6": { homeGoals: 1, awayGoals: 1 },
    "Messi10_m7": { homeGoals: 0, awayGoals: 1 },
    "Messi10_m8": { homeGoals: 2, awayGoals: 1 },

    "Ronaldo7_m1": { homeGoals: 1, awayGoals: 1 },
    "Ronaldo7_m2": { homeGoals: 1, awayGoals: 0 },
    "Ronaldo7_m3": { homeGoals: 3, awayGoals: 1 },
    "Ronaldo7_m4": { homeGoals: 1, awayGoals: 2 },
    "Ronaldo7_m5": { homeGoals: 3, awayGoals: 1 },
    "Ronaldo7_m6": { homeGoals: 2, awayGoals: 0 },
    "Ronaldo7_m7": { homeGoals: 1, awayGoals: 1 },
    "Ronaldo7_m8": { homeGoals: 3, awayGoals: 0 },

    "Chicharito_m1": { homeGoals: 3, awayGoals: 1 },
    "Chicharito_m2": { homeGoals: 1, awayGoals: 1 },
    "Chicharito_m3": { homeGoals: 1, awayGoals: 1 },
    "Chicharito_m4": { homeGoals: 0, awayGoals: 2 },
    "Chicharito_m5": { homeGoals: 1, awayGoals: 1 },
    "Chicharito_m6": { homeGoals: 2, awayGoals: 1 },
    "Chicharito_m7": { homeGoals: 2, awayGoals: 0 },
    "Chicharito_m8": { homeGoals: 1, awayGoals: 1 },

    "NeymarJr_m1": { homeGoals: 2, awayGoals: 2 },
    "NeymarJr_m2": { homeGoals: 0, awayGoals: 0 },
    "NeymarJr_m3": { homeGoals: 2, awayGoals: 0 },
    "NeymarJr_m4": { homeGoals: 2, awayGoals: 2 },
    "NeymarJr_m5": { homeGoals: 4, awayGoals: 0 },
    "NeymarJr_m6": { homeGoals: 1, awayGoals: 2 },
    "NeymarJr_m7": { homeGoals: 1, awayGoals: 2 },
    "NeymarJr_m8": { homeGoals: 2, awayGoals: 2 }
  };

  // Initial Time: June 10, 2026 at 3:20 PM local (1 day before WC kickoff)
  const DEFAULT_SIMULATED_TIME = new Date("2026-06-10T15:20:00-04:00").getTime();

  function initLocalStorage() {
    if (!localStorage.getItem("wc_users")) {
      localStorage.setItem("wc_users", JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem("wc_predictions")) {
      localStorage.setItem("wc_predictions", JSON.stringify(DEFAULT_PREDICTIONS));
    }
    if (!localStorage.getItem("wc_matches")) {
      localStorage.setItem("wc_matches", JSON.stringify(window.WC_DATA.INITIAL_MATCHES));
    }
    if (!localStorage.getItem("wc_current_time")) {
      localStorage.setItem("wc_current_time", DEFAULT_SIMULATED_TIME.toString());
    }
  }

  // Get data wrappers
  function getUsers() {
    return JSON.parse(localStorage.getItem("wc_users")) || [];
  }

  function getPredictions() {
    return JSON.parse(localStorage.getItem("wc_predictions")) || {};
  }

  function getMatches() {
    return JSON.parse(localStorage.getItem("wc_matches")) || [];
  }

  function getSimulatedTime() {
    return parseInt(localStorage.getItem("wc_current_time"), 10) || DEFAULT_SIMULATED_TIME;
  }

  // Set data wrappers
  function saveUsers(users) {
    localStorage.setItem("wc_users", JSON.stringify(users));
  }

  function savePredictions(predictions) {
    localStorage.setItem("wc_predictions", JSON.stringify(predictions));
  }

  function saveMatches(matches) {
    localStorage.setItem("wc_matches", JSON.stringify(matches));
  }

  function saveSimulatedTime(timeMs) {
    localStorage.setItem("wc_current_time", timeMs.toString());
  }

  // Clear data back to defaults
  function resetAllData() {
    localStorage.setItem("wc_users", JSON.stringify(DEFAULT_USERS));
    localStorage.setItem("wc_predictions", JSON.stringify(DEFAULT_PREDICTIONS));
    localStorage.setItem("wc_matches", JSON.stringify(window.WC_DATA.INITIAL_MATCHES));
    localStorage.setItem("wc_current_time", DEFAULT_SIMULATED_TIME.toString());
  }

  // Calculate points and prediction details for a user-match combination
  function calculateMatchPoints(pred, match) {
    if (!pred || pred.homeGoals === null || pred.awayGoals === null ||
        match.realHomeGoals === null || match.realAwayGoals === null) {
      return { points: 0, type: "none", description: "Sin pronóstico o partido no finalizado" };
    }

    const pH = parseInt(pred.homeGoals, 10);
    const pA = parseInt(pred.awayGoals, 10);
    const rH = parseInt(match.realHomeGoals, 10);
    const rA = parseInt(match.realAwayGoals, 10);

    const predOutcome = pH > pA ? "H" : (pH < pA ? "A" : "D");
    const realOutcome = rH > rA ? "H" : (rH < rA ? "A" : "D");

    // Outcome incorrect: 0 points
    if (predOutcome !== realOutcome) {
      return { points: 0, type: "incorrect", description: "Resultado incorrecto (0 pts)" };
    }

    // Exact Match: 10 points
    if (pH === rH && pA === rA) {
      return { points: 10, type: "exact", description: "Marcador exacto (+10 pts)" };
    }

    // Goal Difference Match: 8 points
    if ((pH - pA) === (rH - rA)) {
      return { points: 8, type: "difference", description: "Diferencia de goles exacta (+8 pts)" };
    }

    // Team Goals Match (at least one team goals guessed right): 6 points
    if (pH === rH || pA === rA) {
      return { points: 6, type: "team_goals", description: "Acierto de goles de un equipo (+6 pts)" };
    }

    // Correct Outcome only: 5 points
    return { points: 5, type: "outcome", description: "Solo resultado (+5 pts)" };
  }

  // Calculate scores for all users and returns sorted list for leaderboard
  function calculateLeaderboard() {
    const users = getUsers();
    const predictions = getPredictions();
    const matches = getMatches();

    const leaderboard = users.map(user => {
      let totalPoints = 0;
      let exactCount = 0;
      let diffCount = 0;
      let teamGoalsCount = 0;
      let outcomeCount = 0;
      let incorrectCount = 0;
      let totalPredictions = 0;

      matches.forEach(match => {
        const predKey = `${user.username}_${match.id}`;
        const pred = predictions[predKey];

        if (pred && pred.homeGoals !== null && pred.awayGoals !== null) {
          totalPredictions++;
          if (match.realHomeGoals !== null && match.realAwayGoals !== null) {
            const result = calculateMatchPoints(pred, match);
            totalPoints += result.points;

            if (result.type === "exact") exactCount++;
            else if (result.type === "difference") diffCount++;
            else if (result.type === "team_goals") teamGoalsCount++;
            else if (result.type === "outcome") outcomeCount++;
            else if (result.type === "incorrect") incorrectCount++;
          }
        }
      });

      return {
        username: user.username,
        avatar: user.avatar,
        isAdmin: !!user.isAdmin,
        points: totalPoints,
        exact: exactCount,
        difference: diffCount,
        teamGoals: teamGoalsCount,
        outcome: outcomeCount,
        incorrect: incorrectCount,
        totalPredictions: totalPredictions
      };
    });

    // Sort: Points Desc, then Exact Match Count Desc, then alphabetical username
    return leaderboard.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.exact !== a.exact) return b.exact - a.exact;
      return a.username.localeCompare(b.username);
    });
  }

  // Export functions to window
  window.WC_STORAGE = {
    initLocalStorage,
    getUsers,
    getPredictions,
    getMatches,
    getSimulatedTime,
    saveUsers,
    savePredictions,
    saveMatches,
    saveSimulatedTime,
    resetAllData,
    calculateMatchPoints,
    calculateLeaderboard
  };
})();
