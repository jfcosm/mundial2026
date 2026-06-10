// Firebase Cloud Firestore Storage & Scoring Management
(function() {
  const DEFAULT_SIMULATED_TIME = new Date("2026-06-10T15:20:00-04:00").getTime();

  // In-memory cache synced in real time
  window.WC_CACHE = {
    matches: [],
    predictions: {},
    users: [],
    simulatedTime: DEFAULT_SIMULATED_TIME,
    testModeActive: true
  };

  const DEFAULT_USERS = [
    { username: "admin", password: "admin2026", avatar: "🏆", isAdmin: true, points: 0, exact: 0, difference: 0, teamGoals: 0, outcome: 0, incorrect: 0 },
    { username: "Messi10", password: "messi10", avatar: "🐐", isAdmin: false, points: 0, exact: 0, difference: 0, teamGoals: 0, outcome: 0, incorrect: 0 },
    { username: "Ronaldo7", password: "ronaldo7", avatar: "⚡", isAdmin: false, points: 0, exact: 0, difference: 0, teamGoals: 0, outcome: 0, incorrect: 0 },
    { username: "NeymarJr", password: "neymarjr", avatar: "👑", isAdmin: false, points: 0, exact: 0, difference: 0, teamGoals: 0, outcome: 0, incorrect: 0 },
    { username: "Chicharito", password: "chicharito", avatar: "🤖", isAdmin: false, points: 0, exact: 0, difference: 0, teamGoals: 0, outcome: 0, incorrect: 0 }
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

  // Seeding functions
  function seedMatches() {
    console.log("Seeding default matches to Firestore...");
    const batch = window.db.batch();
    window.WC_DATA.INITIAL_MATCHES.forEach(match => {
      const ref = window.db.collection("matches").doc(match.id);
      batch.set(ref, match);
    });
    return batch.commit();
  }

  function seedUsers() {
    console.log("Seeding default users and predictions to Firestore...");
    const batch = window.db.batch();
    
    // Seed users
    DEFAULT_USERS.forEach(user => {
      const ref = window.db.collection("users").doc(user.username);
      batch.set(ref, user);
    });

    // Seed predictions
    Object.keys(DEFAULT_PREDICTIONS).forEach(key => {
      const [username, matchId] = key.split("_");
      const ref = window.db.collection("predictions").doc(key);
      batch.set(ref, {
        username: username,
        matchId: matchId,
        homeGoals: DEFAULT_PREDICTIONS[key].homeGoals,
        awayGoals: DEFAULT_PREDICTIONS[key].awayGoals
      });
    });

    return batch.commit();
  }

  // Setup Real-time Listeners
  function initFirebaseSync(onDataChangedCallback) {
    if (!window.db) {
      console.error("Firebase db is not initialized.");
      return;
    }

    // 1. Sync simulated time
    window.db.collection("settings").doc("simTime").onSnapshot(doc => {
      if (doc.exists) {
        window.WC_CACHE.simulatedTime = doc.data().time;
      } else {
        window.WC_CACHE.simulatedTime = DEFAULT_SIMULATED_TIME;
        window.db.collection("settings").doc("simTime").set({ time: DEFAULT_SIMULATED_TIME });
      }
      onDataChangedCallback();
    });

    // 2. Sync matches
    window.db.collection("matches").onSnapshot(snapshot => {
      const matches = [];
      snapshot.forEach(doc => {
        matches.push(doc.data());
      });
      matches.sort((a, b) => a.id.localeCompare(b.id));

      if (matches.length === 0) {
        seedMatches();
      } else {
        window.WC_CACHE.matches = matches;
        onDataChangedCallback();
      }
    }, err => console.error("Error syncing matches: ", err));

    // 3. Sync users
    window.db.collection("users").onSnapshot(snapshot => {
      const users = [];
      snapshot.forEach(doc => {
        users.push(doc.data());
      });

      if (users.length === 0) {
        seedUsers();
      } else {
        window.WC_CACHE.users = users;
        onDataChangedCallback();
      }
    }, err => console.error("Error syncing users: ", err));

    // 4. Sync predictions
    window.db.collection("predictions").onSnapshot(snapshot => {
      const predictions = {};
      snapshot.forEach(doc => {
        predictions[doc.id] = doc.data();
      });
      window.WC_CACHE.predictions = predictions;
      onDataChangedCallback();
    }, err => console.error("Error syncing predictions: ", err));

    // 5. Sync testMode setting
    window.db.collection("settings").doc("testMode").onSnapshot(doc => {
      if (doc.exists) {
        window.WC_CACHE.testModeActive = doc.data().active;
      } else {
        window.WC_CACHE.testModeActive = true;
        window.db.collection("settings").doc("testMode").set({ active: true });
      }
      onDataChangedCallback();
    }, err => console.error("Error syncing testMode: ", err));
  }

  // Read data interfaces (reading from real-time local cache)
  function getUsers() {
    return window.WC_CACHE.users;
  }

  function getPredictions() {
    return window.WC_CACHE.predictions;
  }

  function getMatches() {
    return window.WC_CACHE.matches;
  }

  function getSimulatedTime() {
    if (window.WC_CACHE.testModeActive) {
      return window.WC_CACHE.simulatedTime;
    } else {
      return new Date().getTime(); // Actual browser system time!
    }
  }

  // Write data interfaces (writing directly to Firestore)
  function savePrediction(username, matchId, homeGoals, awayGoals) {
    const key = `${username}_${matchId}`;
    return window.db.collection("predictions").doc(key).set({
      username: username,
      matchId: matchId,
      homeGoals: parseInt(homeGoals, 10),
      awayGoals: parseInt(awayGoals, 10),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  function saveSimulatedTime(timeMs) {
    return window.db.collection("settings").doc("simTime").set({ time: timeMs });
  }

  function resolveKnockoutBrackets(matches) {
    const getStandings = (groupName) => {
      const teams = {};
      const groupMatches = matches.filter(m => m.group === groupName && !m.isKnockout);
      
      groupMatches.forEach(m => {
        if (!teams[m.homeTeam]) {
          teams[m.homeTeam] = { name: m.homeTeam, code: m.homeCode, flag: m.homeFlag, points: 0, gd: 0, gf: 0 };
        }
        if (!teams[m.awayTeam]) {
          teams[m.awayTeam] = { name: m.awayTeam, code: m.awayCode, flag: m.awayFlag, points: 0, gd: 0, gf: 0 };
        }
      });
      
      groupMatches.forEach(m => {
        if (m.realHomeGoals !== null && m.realAwayGoals !== null) {
          const hG = parseInt(m.realHomeGoals, 10);
          const aG = parseInt(m.realAwayGoals, 10);
          
          teams[m.homeTeam].gf += hG;
          teams[m.awayTeam].gf += aG;
          teams[m.homeTeam].gd += (hG - aG);
          teams[m.awayTeam].gd += (aG - hG);
          
          if (hG > aG) {
            teams[m.homeTeam].points += 3;
          } else if (hG < aG) {
            teams[m.awayTeam].points += 3;
          } else {
            teams[m.homeTeam].points += 1;
            teams[m.awayTeam].points += 1;
          }
        }
      });
      
      return Object.values(teams).sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.gd !== a.gd) return b.gd - a.gd;
        if (b.gf !== a.gf) return b.gf - a.gf;
        return a.name.localeCompare(b.name);
      });
    };

    const isGroupCompleted = (groupName) => {
      const groupMatches = matches.filter(m => m.group === groupName && !m.isKnockout);
      if (groupMatches.length === 0) return false;
      return groupMatches.every(m => m.status === "finished");
    };

    const bracketRules = {
      "k1": { homeGroup: "Grupo I", homeRank: 1, awayGroup: "Grupo J", awayRank: 2 },
      "k2": { homeGroup: "Grupo K", homeRank: 1, awayGroup: "Grupo L", awayRank: 2 },
      "k3": { homeGroup: "Grupo A", homeRank: 1, awayGroup: "Grupo B", awayRank: 2 },
      "k4": { homeGroup: "Grupo C", homeRank: 1, awayGroup: "Grupo D", awayRank: 2 },
      "k5": { homeGroup: "Grupo E", homeRank: 1, awayGroup: "Grupo F", awayRank: 2 },
      "k6": { homeGroup: "Grupo G", homeRank: 1, awayGroup: "Grupo H", awayRank: 2 }
    };

    matches.forEach(m => {
      if (m.isKnockout) {
        const rule = bracketRules[m.id];
        if (rule) {
          const homeCompleted = isGroupCompleted(rule.homeGroup);
          const awayCompleted = isGroupCompleted(rule.awayGroup);

          if (homeCompleted && awayCompleted) {
            const homeStandings = getStandings(rule.homeGroup);
            const awayStandings = getStandings(rule.awayGroup);

            const homeTeamObj = homeStandings[rule.homeRank - 1];
            const awayTeamObj = awayStandings[rule.awayRank - 1];

            if (homeTeamObj && awayTeamObj) {
              m.homeTeam = homeTeamObj.name;
              m.homeFlag = homeTeamObj.flag;
              m.homeCode = homeTeamObj.code;
              m.awayTeam = awayTeamObj.name;
              m.awayFlag = awayTeamObj.flag;
              m.awayCode = awayTeamObj.code;
              m.resolved = true;
            }
          } else {
            m.homeTeam = `${rule.homeRank}º ${rule.homeGroup}`;
            m.homeFlag = "❓";
            m.homeCode = m.placeholderHome;
            m.awayTeam = `${rule.awayRank}º ${rule.awayGroup}`;
            m.awayFlag = "❓";
            m.awayCode = m.placeholderAway;
            m.resolved = false;
          }
        }
      }
    });
  }

  function saveMatches(matches) {
    resolveKnockoutBrackets(matches);

    const batch = window.db.batch();
    matches.forEach(match => {
      const ref = window.db.collection("matches").doc(match.id);
      batch.set(ref, match);
    });
    return batch.commit();
  }

  // Points Calculation logic
  function calculateMatchPoints(pred, match) {
    if (!pred || pred.homeGoals === null || pred.homeGoals === undefined || pred.awayGoals === null || pred.awayGoals === undefined ||
        match.realHomeGoals === null || match.realHomeGoals === undefined || match.realAwayGoals === null || match.realAwayGoals === undefined) {
      return { points: 0, type: "none", description: "Sin pronóstico o partido no finalizado" };
    }

    const pH = parseInt(pred.homeGoals, 10);
    const pA = parseInt(pred.awayGoals, 10);
    const rH = parseInt(match.realHomeGoals, 10);
    const rA = parseInt(match.realAwayGoals, 10);

    const predOutcome = pH > pA ? "H" : (pH < pA ? "A" : "D");
    const realOutcome = rH > rA ? "H" : (rH < rA ? "A" : "D");

    if (predOutcome !== realOutcome) {
      return { points: 0, type: "incorrect", description: "Resultado incorrecto (0 pts)" };
    }

    if (pH === rH && pA === rA) {
      return { points: 10, type: "exact", description: "Marcador exacto (+10 pts)" };
    }

    if ((pH - pA) === (rH - rA)) {
      return { points: 8, type: "difference", description: "Diferencia de goles exacta (+8 pts)" };
    }

    if (pH === rH || pA === rA) {
      return { points: 6, type: "team_goals", description: "Acierto de goles de un equipo (+6 pts)" };
    }

    return { points: 5, type: "outcome", description: "Solo resultado (+5 pts)" };
  }

  // Calculate scores for all users and updates their values in Firestore
  function calculateAndSyncUserScores(updatedMatches, predictions) {
    const users = getUsers();
    const batch = window.db.batch();

    users.forEach(user => {
      let totalPoints = 0;
      let exactCount = 0;
      let diffCount = 0;
      let teamGoalsCount = 0;
      let outcomeCount = 0;
      let incorrectCount = 0;
      let totalPredictions = 0;

      updatedMatches.forEach(match => {
        const predKey = `${user.username}_${match.id}`;
        const pred = predictions[predKey];

        if (pred && pred.homeGoals !== null && pred.homeGoals !== undefined) {
          totalPredictions++;
          if (match.realHomeGoals !== null && match.realHomeGoals !== undefined) {
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

      const userRef = window.db.collection("users").doc(user.username);
      batch.update(userRef, {
        points: totalPoints,
        exact: exactCount,
        difference: diffCount,
        teamGoals: teamGoalsCount,
        outcome: outcomeCount,
        incorrect: incorrectCount
      });
    });

    return batch.commit();
  }

  // Return sorted leaderboard list based on cached user scores
  function calculateLeaderboard() {
    const users = [...window.WC_CACHE.users];
    return users.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.exact !== a.exact) return b.exact - a.exact;
      return a.username.localeCompare(b.username);
    });
  }

  // Clear data back to defaults in Firebase
  function resetAllData() {
    const batch = window.db.batch();
    
    // Reset matches
    window.WC_DATA.INITIAL_MATCHES.forEach(match => {
      const ref = window.db.collection("matches").doc(match.id);
      batch.set(ref, match);
    });

    // Reset users
    DEFAULT_USERS.forEach(u => {
      const ref = window.db.collection("users").doc(u.username);
      batch.set(ref, u);
    });

    // Delete existing predictions in cache first
    Object.keys(window.WC_CACHE.predictions).forEach(key => {
      const ref = window.db.collection("predictions").doc(key);
      batch.delete(ref);
    });

    // Seed mock predictions
    Object.keys(DEFAULT_PREDICTIONS).forEach(key => {
      const [username, matchId] = key.split("_");
      const ref = window.db.collection("predictions").doc(key);
      batch.set(ref, {
        username: username,
        matchId: matchId,
        homeGoals: DEFAULT_PREDICTIONS[key].homeGoals,
        awayGoals: DEFAULT_PREDICTIONS[key].awayGoals
      });
    });

    // Reset time
    const timeRef = window.db.collection("settings").doc("simTime");
    batch.set(timeRef, { time: DEFAULT_SIMULATED_TIME });

    // Reset testMode to true
    const testModeRef = window.db.collection("settings").doc("testMode");
    batch.set(testModeRef, { active: true });

    return batch.commit();
  }

  window.WC_STORAGE = {
    DEFAULT_USERS,
    initFirebaseSync,
    getUsers,
    getPredictions,
    getMatches,
    getSimulatedTime,
    savePrediction,
    saveSimulatedTime,
    saveMatches,
    resetAllData,
    calculateMatchPoints,
    calculateLeaderboard,
    calculateAndSyncUserScores
  };
})();
