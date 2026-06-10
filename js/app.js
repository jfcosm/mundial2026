// World Cup 2026 Predictor - Main App Logic
(function() {
  // Select DOM Elements
  const screenAuth = document.getElementById("screen-auth");
  const screenDashboard = document.getElementById("screen-dashboard");
  const screenLeaderboard = document.getElementById("screen-leaderboard");
  const screenAdmin = document.getElementById("screen-admin");
  const mainNavigation = document.getElementById("main-navigation");
  const userHeaderProfile = document.getElementById("user-header-profile");
  const currentSimulatedTimeHud = document.getElementById("current-simulated-time-hud");

  // Auth Forms
  const authTabLogin = document.getElementById("auth-tab-login");
  const authTabSignup = document.getElementById("auth-tab-signup");
  const formLogin = document.getElementById("form-login");
  const formSignup = document.getElementById("form-signup");
  const signupAvatarGrid = document.getElementById("signup-avatar-grid");

  // Filters & Containers
  const matchesGridContainer = document.getElementById("matches-grid-container");
  const leaderboardBody = document.getElementById("leaderboard-body");
  const adminMatchesContainer = document.getElementById("admin-matches-container");
  const adminLogOutput = document.getElementById("admin-log-output");
  const adminTimeDisplay = document.getElementById("admin-time-display");
  const toastContainer = document.getElementById("toast-container");
  const miniLeaderboardContainer = document.getElementById("mini-leaderboard-container");

  // Team Sidebar Elements
  const teamDetailsSidebar = document.getElementById("team-details-sidebar");
  const teamSidebarFlag = document.getElementById("team-sidebar-flag");
  const teamSidebarName = document.getElementById("team-sidebar-name");
  const teamSidebarOverview = document.getElementById("team-sidebar-overview");
  const teamStatParticipations = document.getElementById("team-stat-participations");
  const teamStatTitles = document.getElementById("team-stat-titles");
  const teamStatBest = document.getElementById("team-stat-best");
  const teamAttrAttackVal = document.getElementById("team-attr-attack-val");
  const teamAttrAttackFill = document.getElementById("team-attr-attack-fill");
  const teamAttrDefenseVal = document.getElementById("team-attr-defense-val");
  const teamAttrDefenseFill = document.getElementById("team-attr-defense-fill");
  const btnCloseTeamSidebar = document.getElementById("btn-close-team-sidebar");

  // State Variables
  let currentUser = null;
  let activeTab = "screen-dashboard";
  let activeFilter = "all";
  const AVATARS = ['🐐', '🦁', '⚡', '👑', '🤖', '🦊', '🐙', '🦅', '🦄', '⚽'];
  let selectedSignupAvatar = AVATARS[0];

  // TRANSLATION SYSTEM
  const TRANSLATIONS = {
    es: {
      locale: "es-ES",
      title: "El Oráculo del Mundial 2026",
      loadingDate: "Cargando fecha...",
      guest: "Invitado",
      logout: "Salir",
      tabMatches: "🏟️ Partidos",
      tabLeaderboard: "🏆 Tabla",
      tabSimulator: "⚙️ Simulador",
      // Auth screen
      authTitle: "Inicio de Juego",
      authLoginTab: "Ingresar",
      authSignupTab: "Registrarse",
      usernameLabel: "Usuario",
      usernamePlaceholder: "Tu nombre o alias",
      passwordLabel: "Contraseña",
      passwordPlaceholder: "••••••••",
      loginSubmit: "Iniciar Juego",
      signupUsernameLabel: "Elige un Usuario",
      signupUsernamePlaceholder: "Alias (3-12 letras)",
      signupUsernameTitle: "Solo letras (a-z), números y guiones bajos (_). Sin espacios, guiones ni símbolos.",
      signupPasswordLabel: "Crea una Contraseña",
      signupPasswordPlaceholder: "Mínimo 6 caracteres",
      signupPhoneLabel: "Teléfono de Contacto (Opcional)",
      signupAvatarLabel: "Elige tu Avatar",
      signupSubmit: "Crear Cuenta",
      // Dashboard screen
      dashboardTitle: "Pronósticos del Oráculo",
      dashboardDesc: "Completa tus resultados. Los partidos cierran exactamente 1 hora antes del pitazo inicial. Haz clic en las banderas para ver datos históricos de cada selección.",
      filterAll: "Todos",
      filterOpen: "Abiertos",
      filterClosed: "Cerrados",
      liveLeaderboard: "Clasificación en Vivo",
      viewFullLeaderboard: "Ver Tabla Completa",
      // Leaderboard screen
      leaderboardTitle: "Salón de la Fama",
      rulesTitle: "Reglamento de Puntos del Oráculo",
      rulesDesc: "<strong>Puntaje Máximo por Partido: 10 Pts</strong><br>⚽ Marcador Exacto = 10 Pts | ⚖️ Misma Diferencia de Goles = 8 Pts | 🎯 Acierto Goles de un Equipo = 6 Pts | 📊 Solo Resultado (G/E/P) = 5 Pts",
      thPos: "Pos",
      thUser: "Usuario",
      thExact: "Exactos",
      thGoalDiff: "Dif. Goles",
      thTeamGoals: "Goles Eq.",
      thOutcome: "Solo Gan.",
      thIncorrect: "Errados",
      thTotalPts: "Pts Totales",
      // Admin screen
      adminTitle: "Consola de Simulación Mundial 2026",
      timeMachineTitle: "⏱️ Máquina del Tiempo",
      timeMachineDesc: "Usa los botones para adelantar el tiempo del Mundial y ver cómo se bloquean los pronósticos en la sección de Partidos.",
      simModeLabel: "MODO SIMULACIÓN / TEST",
      btnSubDay: "-1 Día",
      btnAddHour: "+1 Hora",
      btnAddDay: "+1 Día",
      btnResetDb: "⚠️ Restaurar Datos Iniciales",
      serverLogTitle: "💻 Registro del Servidor",
      matchSimTitle: "🏟️ Simulador de Resultados de Partidos",
      matchSimDesc: "Ajusta los marcadores reales de cada partido y finalízalos para que la app calcule los puntos de los jugadores y actualice la tabla en tiempo real.",
      btnFinalize: "Finalizar",
      lblSimulated: "Simulado",
      // Sidebar details
      sidebarHistoryTitle: "Historial Mundialista",
      sidebarParticipations: "Participaciones",
      sidebarTitles: "Títulos Mundiales",
      sidebarBestResult: "Mejor Resultado",
      sidebarAttributes: "Atributos (Valoración)",
      sidebarAttack: "Ataque",
      sidebarDefense: "Defensa",
      sidebarClickNotice: "* Haz clic en la bandera de cualquier otra selección en los partidos para ver su rendimiento histórico.",
      // Dynamic text
      lblPendingClass: "🔒 Clasificación Pendiente",
      lblFinished: "🏁 Finalizado",
      lblClosed: "🔒 Cerrado",
      lblClosesIn: "🔓 Cierra en:",
      btnSave: "Guardar",
      lblRealScore: "Real:",
      pts: "Pts",
      ptsCaps: "PTS",
      adminBadge: "ADMIN",
      oracleRank: "Oráculo de Oro",
      strikerRank: "Goleador",
      tacticianRank: "Estratega",
      rookieRank: "Principiante",
      // Toast and log messages
      toastWelcome: "¡Bienvenido de nuevo, {username}!",
      toastProfileRestored: "¡Perfil de usuario restaurado: {username}!",
      toastMockUserInit: "¡Usuario mock inicializado: {username}!",
      toastLoginError: "Usuario o contraseña incorrectos.",
      toastFieldsRequired: "Por favor ingresa ambos marcadores.",
      toastNumericRequired: "Goles deben ser numéricos.",
      toastPredictionSaved: "¡Pronóstico guardado para {home} vs {away}!",
      toastSimTimeUpdated: "Tiempo simulado actualizado.",
      toastDbRestored: "Base de datos de Firebase restaurada.",
      toastMatchFinalized: "Partido finalizado: {home} {hVal} - {aVal} {away}",
      toastSaveError: "Error al guardar pronóstico en la base de datos.",
      toastSimError: "Error al simular partido en la base de datos.",
      toastResetError: "Error al restaurar base de datos en Firebase.",
      toastTimeError: "Error al actualizar fecha en la base de datos.",
      toastModeSuccess: "Modo Simulación activado.",
      toastModeProd: "Modo Producción (Hora Real) activado.",
      toastUsernameTaken: "Ese nombre de usuario ya está tomado.",
      toastSignupError: "Error al crear cuenta. Revisa tus datos.",
      toastAccountCreated: "¡Cuenta creada con éxito! Bienvenido {name}",
      toastLogout: "Sesión cerrada.",
      confirmReset: "¿Seguro que deseas restaurar la base de datos a sus valores por defecto en Firebase? Se borrarán cuentas nuevas y resultados simulados.",
      logServerStarted: "Consola del Servidor iniciada. El Oráculo del Mundial 2026.",
      logSystemTime: "Fecha y Hora actual del sistema (Sincronizado): {time}",
      logPredicted: "{username} pronosticó: {home} {homeVal} - {awayVal} {away}",
      logMatchSimulated: "Simulado partido: {home} {hVal} - {aVal} {away}. Calculando puntos...",
      logUserEarns: " -> {username} gana {points} pts ({desc}) con pronóstico [{homeGoals}-{awayGoals}]",
      logTimeAdjusted: "Máquina del Tiempo ajustada a: {time}",
      logDbReset: "Base de datos de Firebase reiniciada a valores iniciales por defecto.",
      logProvisioning: "Provisionando cuenta de autenticación para usuario mock: {name}...",
      logNewAccount: "Nueva cuenta registrada: {name} (avatar: {avatar})",
      logSimEnabled: "Modo de Simulación y Pruebas habilitado por el Administrador.",
      logSimDisabled: "Modo de Producción (Hora Real en Vivo) habilitado. Controles de tiempo desactivados.",
      syncRealClock: "Sincronizado con Reloj Real",
      noMatchesCategory: "No hay partidos en esta categoría para mostrar.",
      closesInTooltip: "Pronósticos cierran 1h antes del partido",
      viewStatsFor: "Ver estadísticas de {team}",
      pointsResult_exact: "Marcador exacto (+10 pts)",
      pointsResult_difference: "Diferencia de goles exacta (+8 pts)",
      pointsResult_team_goals: "Acierto de goles de un equipo (+6 pts)",
      pointsResult_outcome: "Solo resultado (+5 pts)",
      pointsResult_incorrect: "Resultado incorrecto (0 pts)",
      pointsResult_none: "Sin pronóstico o partido no finalizado",
      logUserEntered: "Usuario ingresado: {username}"
    },
    en: {
      locale: "en-US",
      title: "The World Cup 2026 Oracle",
      loadingDate: "Loading date...",
      guest: "Guest",
      logout: "Logout",
      tabMatches: "🏟️ Matches",
      tabLeaderboard: "🏆 Leaderboard",
      tabSimulator: "⚙️ Simulator",
      // Auth screen
      authTitle: "Game Login",
      authLoginTab: "Login",
      authSignupTab: "Sign Up",
      usernameLabel: "Username",
      usernamePlaceholder: "Your name or alias",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      loginSubmit: "Start Game",
      signupUsernameLabel: "Choose a Username",
      signupUsernamePlaceholder: "Alias (3-12 letters)",
      signupUsernameTitle: "Letters (a-z), numbers, and underscores (_) only. No spaces, hyphens, or special characters.",
      signupPasswordLabel: "Create a Password",
      signupPasswordPlaceholder: "Minimum 6 characters",
      signupPhoneLabel: "Contact Phone (Optional)",
      signupAvatarLabel: "Choose your Avatar",
      signupSubmit: "Create Account",
      // Dashboard screen
      dashboardTitle: "Oracle Predictions",
      dashboardDesc: "Enter your predictions. Matches lock exactly 1 hour before kickoff. Click on the flags to view historical stats for each team.",
      filterAll: "All",
      filterOpen: "Open",
      filterClosed: "Closed",
      liveLeaderboard: "Live Standings",
      viewFullLeaderboard: "View Full Table",
      // Leaderboard screen
      leaderboardTitle: "Hall of Fame",
      rulesTitle: "Oracle Points System Rules",
      rulesDesc: "<strong>Max Points per Match: 10 Pts</strong><br>⚽ Exact Score = 10 Pts | ⚖️ Same Goal Difference = 8 Pts | 🎯 Correct Team Score = 6 Pts | 📊 Outcome Only (W/D/L) = 5 Pts",
      thPos: "Pos",
      thUser: "User",
      thExact: "Exact",
      thGoalDiff: "Goal Diff",
      thTeamGoals: "Team Goals",
      thOutcome: "Outcome Only",
      thIncorrect: "Incorrect",
      thTotalPts: "Total Pts",
      // Admin screen
      adminTitle: "World Cup 2026 Simulation Console",
      timeMachineTitle: "⏱️ Time Machine",
      timeMachineDesc: "Use the buttons to fast-forward the World Cup time and see how predictions lock in the Matches section.",
      simModeLabel: "SIMULATION / TEST MODE",
      btnSubDay: "-1 Day",
      btnAddHour: "+1 Hour",
      btnAddDay: "+1 Day",
      btnResetDb: "⚠️ Reset Default Data",
      serverLogTitle: "💻 Server Log",
      matchSimTitle: "🏟️ Match Score Simulator",
      matchSimDesc: "Adjust the real scores for each match and finalize them so the app calculates player points and updates the leaderboard in real-time.",
      btnFinalize: "Finalize",
      lblSimulated: "Simulated",
      // Sidebar details
      sidebarHistoryTitle: "World Cup History",
      sidebarParticipations: "Participations",
      sidebarTitles: "World Cups Won",
      sidebarBestResult: "Best Result",
      sidebarAttributes: "Attributes (Rating)",
      sidebarAttack: "Attack",
      sidebarDefense: "Defense",
      sidebarClickNotice: "* Click on the flag of any other team in the matches to view their historical performance.",
      // Dynamic text
      lblPendingClass: "🔒 Qualification Pending",
      lblFinished: "🏁 Finished",
      lblClosed: "🔒 Locked",
      lblClosesIn: "🔓 Closes in:",
      btnSave: "Save",
      lblRealScore: "Real:",
      pts: "Pts",
      ptsCaps: "PTS",
      adminBadge: "ADMIN",
      oracleRank: "Gold Oracle",
      strikerRank: "Striker",
      tacticianRank: "Tactician",
      rookieRank: "Rookie",
      // Toast and log messages
      toastWelcome: "Welcome back, {username}!",
      toastProfileRestored: "User profile restored: {username}!",
      toastMockUserInit: "Mock user initialized: {username}!",
      toastLoginError: "Incorrect username or password.",
      toastFieldsRequired: "Please enter both scores.",
      toastNumericRequired: "Goals must be numeric.",
      toastPredictionSaved: "Prediction saved for {home} vs {away}!",
      toastSimTimeUpdated: "Simulated time updated.",
      toastDbRestored: "Firebase database restored to defaults.",
      toastMatchFinalized: "Match finalized: {home} {hVal} - {aVal} {away}",
      toastSaveError: "Error saving prediction to database.",
      toastSimError: "Error simulating match in database.",
      toastResetError: "Error restoring database in Firebase.",
      toastTimeError: "Error updating date in database.",
      toastModeSuccess: "Simulation Mode enabled.",
      toastModeProd: "Production Mode (Real Time) enabled.",
      toastUsernameTaken: "That username is already taken.",
      toastSignupError: "Error creating account. Check your details.",
      toastAccountCreated: "Account created successfully! Welcome {name}",
      toastLogout: "Logged out.",
      confirmReset: "Are you sure you want to restore the Firebase database to its default values? New accounts and simulated results will be deleted.",
      logServerStarted: "Server Console initialized. The World Cup 2026 Oracle.",
      logSystemTime: "Current system date and time (Synced): {time}",
      logPredicted: "{username} predicted: {home} {homeVal} - {awayVal} {away}",
      logMatchSimulated: "Simulated match: {home} {hVal} - {aVal} {away}. Calculating points...",
      logUserEarns: " -> {username} wins {points} pts ({desc}) with prediction [{homeGoals}-{awayGoals}]",
      logTimeAdjusted: "Time Machine adjusted to: {time}",
      logDbReset: "Firebase database reset to default initial values.",
      logProvisioning: "Provisioning auth account for mock user: {name}...",
      logNewAccount: "New account registered: {name} (avatar: {avatar})",
      logSimEnabled: "Simulation and Test Mode enabled by Administrator.",
      logSimDisabled: "Production Mode (Live Real Time) enabled. Time machine controls disabled.",
      syncRealClock: "Synced with Real Clock",
      noMatchesCategory: "No matches to display in this category.",
      closesInTooltip: "Predictions close 1h before kickoff",
      viewStatsFor: "View stats for {team}",
      pointsResult_exact: "Exact score (+10 pts)",
      pointsResult_difference: "Exact goal difference (+8 pts)",
      pointsResult_team_goals: "Correct team goals (+6 pts)",
      pointsResult_outcome: "Outcome only (+5 pts)",
      pointsResult_incorrect: "Incorrect outcome (0 pts)",
      pointsResult_none: "No prediction or match unfinished",
      logUserEntered: "User logged in: {username}"
    }
  };

  const TEAM_OVERVIEWS_EN = {
    "Argentina": "The 'Albiceleste' defends the world crown with a squad full of established stars.",
    "Austria": "A solid and tactically organized European squad.",
    "Francia": "The 'Bleus' combine extreme physical speed, lethal depth, and great hierarchy.",
    "Irak": "The Asian side seeks to pull off a major upset in the international tournament.",
    "Noruega": "Led by Erling Haaland in attack, they look to be the big European surprise.",
    "Senegal": "The Lions of Teranga combine physical power and international experience.",
    "Jordania": "Making their World Cup debut, looking to write history in their first participation.",
    "Argelia": "A fast North African team with a highly dynamic midfield.",
    "Portugal": "A constellation of Portuguese offensive talent looks to be crowned in America.",
    "Uzbekistán": "Debut in the World Cup after a great qualifying campaign in Asia.",
    "Inglaterra": "The birthplace of football arrives with a star-studded squad and the pressure to bring the cup home.",
    "Ghana": "The 'Black Stars' stand out for their physical strength and fast transitions.",
    "Panamá": "The 'Canaleros' return to the World Cup with an experienced and united squad.",
    "Croacia": "The Balkan side stands out for their midfield control and mental resilience.",
    "Colombia": "The coffee-producing nation stands out for its good ball handling and wing speed.",
    "RD Congo": "The 'Leopards' return looking to assert their African physical power.",
    "Suiza": "A highly organized team with great tactical discipline and solidity.",
    "Canadá": "Led by Alphonso Davies, they seek to make their home field advantage count.",
    "Bosnia y Herzegovina": "A European team with great temperament and excellent aerial play.",
    "Catar": "The Asian champions look to consolidate their growth on the world stage.",
    "Marruecos": "The revelation of Qatar 2022 looks to confirm its status as a global power.",
    "Haití": "The Caribbean team returns to the World Cup with great enthusiasm and physical effort.",
    "Escocia": "A combative British side, characterized by their dedication and physical play.",
    "Brasil": "The only team with a perfect attendance record seeks its sixth world title.",
    "Sudáfrica": "The 'Bafana Bafana' return motivated to the international scene.",
    "Corea del Sur": "A dynamic and tireless game defines the Korean warriors.",
    "Chequia": "A European team characterized by its discipline and tactical intelligence.",
    "México": "The Concacaf giant seeks to break the fifth-game barrier as hosts.",
    "Curazao": "The big Caribbean surprise of the tournament makes its historic appearance.",
    "Costa de Marfil": "The Elephants combine technical talent and high endurance.",
    "Ecuador": "La Tri stands out for its youth, great physical deployment, and tactical order.",
    "Alemania": "The 'Mannschaft' represents competitive efficiency, seeking its fifth star.",
    "Túnez": "The Eagles of Carthage stand out for their tight defense and lethal counterattack.",
    "Países Bajos": "The 'Clockwork Orange' looks to finally crown its history with the world title.",
    "Japón": "Blue Samurai with fast transitions and great tactical discipline.",
    "Suecia": "Scandinavian side of great physical stature and dominant aerial play.",
    "Turquía": "A Turkish squad characterized by passion, grit, and great individual technique.",
    "Estados Unidos": "The Americans want to consolidate their growth on home soil.",
    "Paraguay": "The Guaraní squad stands out for its grit, aerial play, and defensive solidity.",
    "Australia": "The 'Socceroos' are tireless, with a physical and vertical style of play.",
    "Cabo Verde": "The Blue Sharks debut with pride representing African island football.",
    "Arabia Saudita": "Fast and tactical sons of the desert, ready to stand their ground.",
    "Uruguay": "Marcelo Bielsa's Celeste stands out for its suffocating pressure and mystique.",
    "España": "La Roja dominates possession and attacks down the wings with youth.",
    "Nueva Zelanda": "All Whites seeking to repeat the historic feat of South Africa 2010.",
    "Bélgica": "The Red Devils combine veteran talent with young European prospects.",
    "Egipto": "The Pharaohs seek to advance past the group stage led by their offensive speed.",
    "Irán": "A defensively very disciplined team, lethal on the counterattack."
  };

  const BEST_RESULTS_EN = {
    "Campeón (1978, 1986, 2022)": "Champion (1978, 1986, 2022)",
    "Tercer lugar (1954)": "Third place (1954)",
    "Campeón (1998, 2018)": "Champion (1998, 2018)",
    "Fase de grupos (1986)": "Group stage (1986)",
    "Octavos de final (1998)": "Round of 16 (1998)",
    "Cuartos de final (2002)": "Quarter-finals (2002)",
    "Debutante": "Debutante",
    "Octavos de final (2014)": "Round of 16 (2014)",
    "Tercer lugar (1966)": "Third place (1966)",
    "Campeón (1966)": "Champion (1966)",
    "Cuartos de final (2010)": "Quarter-finals (2010)",
    "Fase de grupos (2018)": "Group stage (2018)",
    "Subcampeón (2018)": "Runner-up (2018)",
    "Cuartos de final (2014)": "Quarter-finals (2014)",
    "Fase de grupos (1974)": "Group stage (1974)",
    "Cuartos de final (1934, 1938, 1954)": "Quarter-finals (1934, 1938, 1954)",
    "Fase de grupos (1986, 2022)": "Group stage (1986, 2022)",
    "Fase de grupos (2014)": "Group stage (2014)",
    "Fase de grupos (2022)": "Group stage (2022)",
    "Cuarto lugar (2022)": "Fourth place (2022)",
    "Fase de grupos": "Group stage",
    "Campeón (1958, 1962, 1970, 1994, 2002)": "Champion (1958, 1962, 1970, 1994, 2002)",
    "Fase de grupos (1998, 2002, 2010)": "Group stage (1998, 2002, 2010)",
    "Cuarto lugar (2002)": "Fourth place (2002)",
    "Subcampeón (1934, 1962)": "Runner-up (1934, 1962)",
    "Cuartos de final (1970, 1986)": "Quarter-finals (1970, 1986)",
    "Fase de grupos (2006, 2010, 2014)": "Group stage (2006, 2010, 2014)",
    "Octavos de final (2006)": "Round of 16 (2006)",
    "Campeón (1954, 1974, 1990, 2014)": "Champion (1954, 1974, 1990, 2014)",
    "Subcampeón (1974, 1978, 2010)": "Runner-up (1974, 1978, 2010)",
    "Octavos de final": "Round of 16",
    "Subcampeón (1958)": "Runner-up (1958)",
    "Tercer lugar (2002)": "Third place (2002)",
    "Tercer lugar (1930)": "Third place (1930)",
    "Cuartos de final (2010)": "Quarter-finals (2010)",
    "Octavos de final (2006, 2022)": "Round of 16 (2006, 2022)",
    "Octavos de final (1994)": "Round of 16 (1994)",
    "Campeón (1930, 1950)": "Champion (1930, 1950)",
    "Campeón (2010)": "Champion (2010)",
    "Fase de grupos (1982, 2010)": "Group stage (1982, 2010)",
    "Tercer lugar (2018)": "Third place (2018)"
  };

  function t(key, replaces = {}) {
    const lang = localStorage.getItem("wc_lang") || "es";
    let text = TRANSLATIONS[lang]?.[key] || TRANSLATIONS["es"]?.[key] || key;
    Object.keys(replaces).forEach(k => {
      text = text.replace(`{${k}}`, replaces[k]);
    });
    return text;
  }

  function translateTeamName(name, lang) {
    if (lang !== 'en') return name;
    const teamTranslations = {
      "México": "Mexico",
      "Sudáfrica": "South Africa",
      "Corea del Sur": "South Korea",
      "Chequia": "Czechia",
      "Canadá": "Canada",
      "Bosnia y Herzegovina": "Bosnia and Herzegovina",
      "Estados Unidos": "United States",
      "Paraguay": "Paraguay",
      "Argentina": "Argentina",
      "Austria": "Austria",
      "Francia": "France",
      "Irak": "Iraq",
      "Noruega": "Norway",
      "Senegal": "Senegal",
      "Jordania": "Jordan",
      "Argelia": "Algeria",
      "Portugal": "Portugal",
      "Uzbekistán": "Uzbekistan",
      "Inglaterra": "England",
      "Ghana": "Ghana",
      "Panamá": "Panama",
      "Croacia": "Croatia",
      "Colombia": "Colombia",
      "RD Congo": "DR Congo",
      "Suiza": "Switzerland",
      "Catar": "Qatar",
      "Marruecos": "Morocco",
      "Haití": "Haiti",
      "Escocia": "Scotland",
      "Brasil": "Brazil",
      "Curazao": "Curaçao",
      "Costa de Marfil": "Ivory Coast",
      "Ecuador": "Ecuador",
      "Alemania": "Germany",
      "Túnez": "Tunisia",
      "Países Bajos": "Netherlands",
      "Japón": "Japan",
      "Suecia": "Sweden",
      "Turquía": "Turkey",
      "Australia": "Australia",
      "Cabo Verde": "Cape Verde",
      "Arabia Saudita": "Saudi Arabia",
      "Uruguay": "Uruguay",
      "España": "Spain",
      "Nueva Zelanda": "New Zealand",
      "Bélgica": "Belgium",
      "Egipto": "Egypt",
      "Irán": "Iran"
    };
    
    if (teamTranslations[name]) {
      return teamTranslations[name];
    }
    
    // Handle placeholders
    return name
      .replace('1º Grupo', '1st Group')
      .replace('2º Grupo', '2nd Group');
  }

  function translateGroup(group, lang) {
    if (lang !== 'en') return group;
    return group
      .replace('Grupo', 'Group')
      .replace('Octavos - Llave', 'Round of 16 - Bracket');
  }

  function updateStaticTranslations() {
    document.querySelectorAll("[data-t]").forEach(el => {
      const key = el.getAttribute("data-t");
      el.innerHTML = t(key);
    });
    document.querySelectorAll("[data-t-placeholder]").forEach(el => {
      const key = el.getAttribute("data-t-placeholder");
      el.placeholder = t(key);
    });
    document.querySelectorAll("[data-t-title]").forEach(el => {
      const key = el.getAttribute("data-t-title");
      el.title = t(key);
    });
  }

  // LOG SYSTEM
  function addLog(message, type = "normal") {
    const line = document.createElement("div");
    line.className = `log-line ${type}`;
    const timestamp = new Date(window.WC_STORAGE.getSimulatedTime()).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    line.innerText = `[${timestamp}] ${message}`;
    adminLogOutput.appendChild(line);
    adminLogOutput.scrollTop = adminLogOutput.scrollHeight;
  }

  // TOAST SYSTEM
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    let icon = "🔔";
    if (type === "success") icon = "✅";
    if (type === "error") icon = "❌";

    toast.innerHTML = `<span aria-hidden="true">${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    // Auto remove toast
    setTimeout(() => {
      toast.style.animation = "fadeSlideIn 0.3s reverse forwards";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Rank name resolver based on points
  function getRankDetails(points) {
    if (points >= 46) return { name: "Oráculo de Oro", class: "oracle" };
    if (points >= 31) return { name: "Goleador", class: "striker" };
    if (points >= 16) return { name: "Estratega", class: "tactician" };
    return { name: "Principiante", class: "rookie" };
  }

  // INITIALIZATION
  function init() {
    // 1. Start real-time Firebase Sync listeners
    window.WC_STORAGE.initFirebaseSync(() => {
      // Whenever Firestore registers a data change, update the UI reactively
      renderAll();
    });
    
    // 2. Check local session persistence
    const storedUser = sessionStorage.getItem("wc_active_user");
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
    }

    setupEventListeners();
    initSignupAvatars();
    updateMuteButtonUI();

    addLog(t("logServerStarted"), "system");
    
    setTimeout(() => {
      addLog(t("logSystemTime", { time: new Date(window.WC_STORAGE.getSimulatedTime()).toLocaleString(t("locale")) }), "normal");
    }, 1500);
  }

  // SIGNUP AVATARS GRID
  function initSignupAvatars() {
    signupAvatarGrid.innerHTML = "";
    AVATARS.forEach((avatar, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `avatar-option ${index === 0 ? 'selected' : ''}`;
      btn.innerText = avatar;
      btn.setAttribute("aria-label", `Seleccionar avatar ${avatar}`);
      btn.addEventListener("click", () => {
        window.WC_SOUND.playClick();
        document.querySelectorAll(".avatar-option").forEach(el => el.classList.remove("selected"));
        btn.classList.add("selected");
        selectedSignupAvatar = avatar;
      });
      signupAvatarGrid.appendChild(btn);
    });
  }

  function renderAll() {
    const isTestActive = window.WC_CACHE.testModeActive;
    const simTime = window.WC_STORAGE.getSimulatedTime();
    
    const lang = localStorage.getItem("wc_lang") || "es";
    const locale = lang === "en" ? "en-US" : "es-ES";

    // Sync language dropdown selector
    const langSelector = document.getElementById("lang-selector");
    if (langSelector) {
      langSelector.value = lang;
    }

    // Apply static HTML translations
    updateStaticTranslations();

    const formattedTime = new Date(simTime).toLocaleString(locale, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    // Update Header HUD
    if (isTestActive) {
      currentSimulatedTimeHud.innerHTML = `<span style="color: var(--color-neon-yellow); margin-right: 0.25rem;">${t("hudTest")}</span> ${formattedTime}`;
    } else {
      currentSimulatedTimeHud.innerHTML = `<span style="color: var(--color-neon-green); text-shadow: 0 0 8px var(--color-neon-green); margin-right: 0.25rem;">${t("hudLive")}</span> ${formattedTime}`;
    }
    
    // Update Admin Time display
    if (isTestActive) {
      adminTimeDisplay.innerText = formattedTime;
      adminTimeDisplay.style.color = "var(--color-neon-yellow)";
      adminTimeDisplay.style.borderColor = "#222";
    } else {
      adminTimeDisplay.innerText = t("syncRealClock");
      adminTimeDisplay.style.color = "var(--color-neon-green)";
      adminTimeDisplay.style.borderColor = "var(--color-neon-green)";
      adminTimeDisplay.style.textShadow = "0 0 8px rgba(0, 255, 135, 0.4)";
    }

    if (currentUser) {
      // Logged In layout
      screenAuth.classList.remove("active");
      mainNavigation.style.display = "flex";
      userHeaderProfile.style.display = "flex";
      
      // Update User HUD
      const leaderboard = window.WC_STORAGE.calculateLeaderboard();
      const userStats = leaderboard.find(u => u.username === currentUser.username) || { points: 0 };
      
      document.getElementById("user-header-avatar").innerText = currentUser.avatar;
      document.getElementById("user-header-name").innerText = currentUser.username;
      document.getElementById("user-header-score").innerText = `${userStats.points} ${t("pts")}`;
      
      // Update Dashboard HUD stats
      document.getElementById("dashboard-hud-score").innerText = `${userStats.points} ${t("pts")}`;
      const rank = getRankDetails(userStats.points);
      const dashboardHudRank = document.getElementById("dashboard-hud-rank");
      dashboardHudRank.innerText = rank.name;
      dashboardHudRank.className = `user-badge-level ${rank.class}`;

      // Show admin tab ONLY for admins
      const tabAdminBtn = document.getElementById("tab-admin");
      if (currentUser.isAdmin) {
        tabAdminBtn.style.display = "block";
      } else {
        tabAdminBtn.style.display = "none";
        // If current tab is admin and they are not admin, fallback to dashboard
        if (activeTab === "screen-admin") activeTab = "screen-dashboard";
      }

      // Hide all screens, show active
      document.querySelectorAll(".screen-section").forEach(s => s.classList.remove("active"));
      document.getElementById(activeTab).classList.add("active");

      // Active tab styling
      document.querySelectorAll(".tab-btn").forEach(btn => {
        if (btn.getAttribute("data-target") === activeTab) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      // Render tab specific components
      if (activeTab === "screen-dashboard") {
        renderDashboard();
        renderMiniLeaderboard();
      }
      if (activeTab === "screen-leaderboard") renderLeaderboard();
      if (activeTab === "screen-admin") renderAdmin();
    } else {
      // Unauthenticated Layout
      screenAuth.classList.add("active");
      mainNavigation.style.display = "none";
      userHeaderProfile.style.display = "none";
      
      document.querySelectorAll(".screen-section").forEach(s => {
        if (s.id !== "screen-auth") s.classList.remove("active");
      });
      renderAuth();
    }
  }

  function renderAuth() {
    // Switch between Signup/Login forms
    authTabLogin.onclick = () => {
      window.WC_SOUND.playClick();
      authTabLogin.classList.add("active");
      authTabSignup.classList.remove("active");
      formLogin.style.display = "block";
      formSignup.style.display = "none";
    };

    authTabSignup.onclick = () => {
      window.WC_SOUND.playClick();
      authTabSignup.classList.add("active");
      authTabLogin.classList.remove("active");
      formSignup.style.display = "block";
      formLogin.style.display = "none";
    };
  }

  // TEAM SIDEBAR DRAWER CONTROL
  function openTeamSidebar(teamName) {
    const stats = window.WC_DATA.TEAM_STATS[teamName];
    if (!stats) return;

    // Play click sound
    window.WC_SOUND.playClick();

    const lang = localStorage.getItem("wc_lang") || "es";
    const overview = lang === "en" ? (TEAM_OVERVIEWS_EN[teamName] || stats.overview) : stats.overview;
    const bestResult = lang === "en" ? (BEST_RESULTS_EN[stats.bestResult] || stats.bestResult) : stats.bestResult;

    // Populate Sidebar elements
    const matches = window.WC_STORAGE.getMatches();
    const activeMatchWithTeam = matches.find(m => m.homeTeam === teamName || m.awayTeam === teamName);
    const flag = activeMatchWithTeam ? (activeMatchWithTeam.homeTeam === teamName ? activeMatchWithTeam.homeFlag : activeMatchWithTeam.awayFlag) : "🏳️";

    teamSidebarFlag.innerText = flag;
    teamSidebarName.innerText = translateTeamName(teamName, lang);
    teamSidebarOverview.innerText = overview;

    teamStatParticipations.innerText = stats.participations;
    teamStatTitles.innerText = stats.titles > 0 ? `${stats.titles} 🏆` : "0";
    teamStatBest.innerText = bestResult;

    // Attributes
    teamAttrAttackVal.innerText = stats.attack;
    teamAttrAttackFill.style.width = `${stats.attack}%`;
    teamAttrDefenseVal.innerText = stats.defense;
    teamAttrDefenseFill.style.width = `${stats.defense}%`;

    // Open Sidebar drawer
    teamDetailsSidebar.classList.add("open");
    teamDetailsSidebar.setAttribute("aria-hidden", "false");
  }

  function closeTeamSidebar() {
    if (teamDetailsSidebar.classList.contains("open")) {
      window.WC_SOUND.playClick();
      teamDetailsSidebar.classList.remove("open");
      teamDetailsSidebar.setAttribute("aria-hidden", "true");
    }
  }

  // RENDER: MINI LEADERBOARD SIDEBAR
  function renderMiniLeaderboard() {
    const leaderboard = window.WC_STORAGE.calculateLeaderboard();
    miniLeaderboardContainer.innerHTML = "";

    // Take top 5 users
    const topUsers = leaderboard.slice(0, 5);

    topUsers.forEach((user, index) => {
      const row = document.createElement("div");
      row.className = `mini-leaderboard-row ${user.username === currentUser.username ? 'active' : ''}`;

      row.innerHTML = `
        <div class="mini-user-info">
          <span class="mini-user-rank-val">${index + 1}</span>
          <span class="mini-user-avatar" aria-hidden="true">${user.avatar}</span>
          <span class="mini-user-name" title="${user.username}">${user.username}</span>
        </div>
        <span class="mini-user-points">${user.points} ${t("pts")}</span>
      `;
      miniLeaderboardContainer.appendChild(row);
    });
  }

  // RENDER: MATCHES DASHBOARD
  function renderDashboard() {
    const matches = window.WC_STORAGE.getMatches();
    const predictions = window.WC_STORAGE.getPredictions();
    const simTime = window.WC_STORAGE.getSimulatedTime();
    const lang = localStorage.getItem("wc_lang") || "es";

    matchesGridContainer.innerHTML = "";

    const filteredMatches = matches.filter(match => {
      const isLocked = window.WC_DATA.isMatchLocked(match, simTime);
      if (activeFilter === "open") return !isLocked;
      if (activeFilter === "closed") return isLocked;
      return true;
    });

    if (filteredMatches.length === 0) {
      matchesGridContainer.innerHTML = `
        <div class="glass-panel text-center" style="grid-column: 1 / -1; padding: 3rem;">
          <p style="color: var(--color-text-muted);">${t("noMatchesCategory")}</p>
        </div>
      `;
      return;
    }

    filteredMatches.forEach(match => {
      const isKnockout = match.isKnockout === true;
      const isResolved = match.resolved === true;
      const isLocked = window.WC_DATA.isMatchLocked(match, simTime) || (isKnockout && !isResolved);
      
      const predKey = `${currentUser.username}_${match.id}`;
      const userPred = predictions[predKey] || { homeGoals: "", awayGoals: "" };
      
      const card = document.createElement("div");
      card.className = `glass-panel match-card ${isKnockout && !isResolved ? 'match-pending' : ''}`;

      // Header row
      const isMatchFinished = match.realHomeGoals !== null && match.realAwayGoals !== null;
      let lockHtml = "";
      if (isKnockout && !isResolved) {
        lockHtml = `<span class="match-lock-status locked" style="background: rgba(255, 183, 0, 0.1); color: var(--color-neon-yellow); border-color: rgba(255, 183, 0, 0.2);">${t("lblPendingClass")}</span>`;
      } else if (isMatchFinished) {
        lockHtml = `<span class="match-lock-status locked">${t("lblFinished")}</span>`;
      } else if (isLocked) {
        lockHtml = `<span class="match-lock-status locked">${t("lblClosed")}</span>`;
      } else {
        const lockTime = new Date(match.kickoff).getTime() - 60 * 60 * 1000;
        const diffMs = lockTime - simTime;
        const hours = Math.floor(diffMs / (3600 * 1000));
        const minutes = Math.floor((diffMs % (3600 * 1000)) / (60 * 1000));
        lockHtml = `<span class="match-lock-status open" title="${t("closesInTooltip")}">${t("lblClosesIn")} ${hours}h ${minutes}m</span>`;
      }

      // Prediction and scoring math displays
      let pointsBadgeHtml = "";
      if (isMatchFinished) {
        const result = window.WC_STORAGE.calculateMatchPoints(userPred, match);
        let badgeClass = "zero";
        const scoreText = `${result.points} ${t("ptsCaps")}`;
        const localizedDesc = t("pointsResult_" + result.type, { points: result.points }) || result.description;

        if (result.type === "exact") badgeClass = "exact";
        else if (result.type === "difference" || result.type === "team_goals") badgeClass = "close";
        else if (result.type === "outcome") badgeClass = "outcome";

        pointsBadgeHtml = `
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem;">
            <span class="points-badge-earned ${badgeClass}">${scoreText}</span>
            <span style="font-size: 0.6rem; color: var(--color-text-muted); text-align: right;">${localizedDesc}</span>
          </div>
        `;
      }

      // Home and Away Score Value placeholders
      const inputDisabledAttr = (isLocked || isMatchFinished) ? "disabled" : "";
      const homeTranslated = translateTeamName(match.homeTeam, lang);
      const awayTranslated = translateTeamName(match.awayTeam, lang);

      card.innerHTML = `
        <div class="match-card-header">
          <span class="match-group">${translateGroup(match.group, lang)}</span>
          <span>${window.WC_DATA.formatMatchTime(match.kickoff)}</span>
          ${lockHtml}
        </div>
        
        <div class="match-teams-vs" style="flex-direction: column; gap: 0.75rem;">
          <!-- Scoreboard Centered at Top -->
          <div style="display: flex; justify-content: center; margin-bottom: 0.25rem;">
            <div class="scoreboard-score-inputs">
              <input type="text" inputmode="numeric" pattern="[0-9]*" class="score-input-box" 
                     id="pred-home-${match.id}" value="${userPred.homeGoals}" ${inputDisabledAttr}
                     aria-label="Goles de ${homeTranslated}" maxlength="2">
              <span class="score-separator" style="margin: 0 0.25rem;">:</span>
              <input type="text" inputmode="numeric" pattern="[0-9]*" class="score-input-box" 
                     id="pred-away-${match.id}" value="${userPred.awayGoals}" ${inputDisabledAttr}
                     aria-label="Goles de ${awayTranslated}" maxlength="2">
            </div>
          </div>
 
          <!-- Teams Row Below inputs -->
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; text-align: center;">
            <!-- Home Team Column -->
            <div class="${(isKnockout && !isResolved) ? 'team-info-disabled' : 'team-info'}" 
                 data-team="${match.homeTeam}" 
                 title="${(isKnockout && !isResolved) ? '' : t("viewStatsFor", { team: homeTranslated })}"
                 style="flex: 1; flex-direction: column; align-items: center; justify-content: center; gap: 0.2rem; cursor: ${(isKnockout && !isResolved) ? 'default' : 'pointer'};">
              <span class="team-flag" aria-hidden="true" style="font-size: 2.2rem; margin: 0; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">${match.homeFlag}</span>
              <span class="team-name" title="${homeTranslated}" style="font-size: 0.9rem; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; font-weight: 700;">${homeTranslated}</span>
              <span class="team-code" style="font-size: 0.65rem; margin: 0; padding: 0.05rem 0.2rem; background: rgba(255,255,255,0.05); border-radius: 3px; color: var(--color-text-muted); font-family: var(--font-heading);">${match.homeCode}</span>
            </div>
 
            <!-- VS Divider -->
            <div style="font-family: var(--font-heading); font-weight: 900; color: var(--color-text-dim); font-size: 0.75rem; min-width: 20px;">VS</div>
 
            <!-- Away Team Column -->
            <div class="${(isKnockout && !isResolved) ? 'team-info-disabled' : 'team-info'}" 
                 data-team="${match.awayTeam}" 
                 title="${(isKnockout && !isResolved) ? '' : t("viewStatsFor", { team: awayTranslated })}"
                 style="flex: 1; flex-direction: column; align-items: center; justify-content: center; gap: 0.2rem; cursor: ${(isKnockout && !isResolved) ? 'default' : 'pointer'};">
              <span class="team-flag" aria-hidden="true" style="font-size: 2.2rem; margin: 0; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">${match.awayFlag}</span>
              <span class="team-name" title="${awayTranslated}" style="font-size: 0.9rem; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; font-weight: 700;">${awayTranslated}</span>
              <span class="team-code" style="font-size: 0.65rem; margin: 0; padding: 0.05rem 0.2rem; background: rgba(255,255,255,0.05); border-radius: 3px; color: var(--color-text-muted); font-family: var(--font-heading);">${match.awayCode}</span>
            </div>
          </div>
        </div>
 
        <div class="match-card-footer">
          <div class="match-venue">
            <span aria-hidden="true">📍</span> <span>${match.stadium}</span>
          </div>
          
          <div class="match-action-row">
            <div>
              ${isMatchFinished ? `<div class="actual-score-tag">${t("lblRealScore")} ${match.realHomeGoals} - ${match.realAwayGoals}</div>` : ''}
            </div>
            <div>
              ${pointsBadgeHtml}
              ${(!isLocked && !isMatchFinished) ? `
                <button class="btn-save-prediction" id="btn-save-${match.id}" type="button">
                  ${t("btnSave")}
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      `;

      // Click event for team stats sidebar
      card.querySelectorAll(".team-info").forEach(element => {
        element.addEventListener("click", () => {
          const teamName = element.getAttribute("data-team");
          openTeamSidebar(teamName);
        });
      });

      // Save listener for cards
      const saveBtn = card.querySelector(`#btn-save-${match.id}`);
      if (saveBtn) {
        saveBtn.addEventListener("click", () => {
          const homeVal = document.getElementById(`pred-home-${match.id}`).value.trim();
          const awayVal = document.getElementById(`pred-away-${match.id}`).value.trim();

          if (homeVal === "" || awayVal === "") {
            window.WC_SOUND.playError();
            showToast(t("toastFieldsRequired"), "error");
            return;
          }

          if (isNaN(homeVal) || isNaN(awayVal)) {
            window.WC_SOUND.playError();
            showToast(t("toastNumericRequired"), "error");
            return;
          }

          // Save prediction to Firestore
          window.WC_STORAGE.savePrediction(currentUser.username, match.id, homeVal, awayVal)
            .then(() => {
              window.WC_SOUND.playSuccess();
              showToast(t("toastPredictionSaved", { home: homeTranslated, away: awayTranslated }));
              addLog(t("logPredicted", { username: currentUser.username, home: homeTranslated, homeVal: homeVal, awayVal: awayVal, away: awayTranslated }), "success");
            })
            .catch(err => {
              window.WC_SOUND.playError();
              showToast(t("toastSaveError"), "error");
              console.error("Firebase save error: ", err);
            });
        });
      }

      // Restrict character input to digits on keypress
      card.querySelectorAll(".score-input-box").forEach(input => {
        input.addEventListener("input", () => {
          input.value = input.value.replace(/[^0-9]/g, '');
        });
      });

      matchesGridContainer.appendChild(card);
    });
  }

  // RENDER: LEADERBOARD
  function renderLeaderboard() {
    const leaderboard = window.WC_STORAGE.calculateLeaderboard();
    leaderboardBody.innerHTML = "";

    leaderboard.forEach((user, index) => {
      const row = document.createElement("tr");
      if (user.username === currentUser.username) {
        row.className = "current-user-row";
      }

      // Rank Display medaling
      let rankText = `${index + 1}`;
      if (index === 0) rankText = `<span class="rank-icon" title="${t("medalGold")}">🏆</span>`;
      else if (index === 1) rankText = `<span class="rank-icon" title="${t("medalSilver")}">🥈</span>`;
      else if (index === 2) rankText = `<span class="rank-icon" title="${t("medalBronze")}">🥉</span>`;

      // Level description
      const level = getRankDetails(user.points);

      row.innerHTML = `
        <td class="text-center rank-col">${rankText}</td>
        <td>
          <div class="user-col">
            <span class="user-col-avatar" aria-hidden="true">${user.avatar}</span>
            <div>
              <span class="user-col-name">${user.username}</span>
              ${user.isAdmin ? `<span class="user-badge-level" style="background: rgba(255,255,255,0.1); margin-left:0.25rem;">${t("adminBadge")}</span>` : ''}
              <div class="mt-1">
                <span class="user-badge-level ${level.class}">${level.name}</span>
              </div>
            </div>
          </div>
        </td>
        <td class="text-center stat-col">${user.exact}</td>
        <td class="text-center stat-col">${user.difference}</td>
        <td class="text-center stat-col">${user.teamGoals}</td>
        <td class="text-center stat-col">${user.outcome}</td>
        <td class="text-center stat-col">${user.incorrect}</td>
        <td class="text-center points-col">${user.points} ${t("pts")}</td>
      `;
      leaderboardBody.appendChild(row);
    });
  }

  // RENDER: ADMIN SIMULATOR
  function renderAdmin() {
    const isTestActive = window.WC_CACHE.testModeActive;
    const lang = localStorage.getItem("wc_lang") || "es";
    
    // Sync the checkbox
    document.getElementById("admin-toggle-testmode").checked = isTestActive;
    
    // Disable or enable time travel buttons
    const btnSubDay = document.getElementById("btn-time-sub-day");
    const btnAddHour = document.getElementById("btn-time-add-hour");
    const btnAddDay = document.getElementById("btn-time-add-day");
    const timeSliderContainer = document.getElementById("admin-time-controls-box");

    if (isTestActive) {
      btnSubDay.disabled = false;
      btnAddHour.disabled = false;
      btnAddDay.disabled = false;
      timeSliderContainer.style.opacity = "1";
      timeSliderContainer.style.pointerEvents = "auto";
    } else {
      btnSubDay.disabled = true;
      btnAddHour.disabled = true;
      btnAddDay.disabled = true;
      timeSliderContainer.style.opacity = "0.4";
      timeSliderContainer.style.pointerEvents = "none";
    }

    const matches = window.WC_STORAGE.getMatches();
    const predictions = window.WC_STORAGE.getPredictions();
    const simTime = window.WC_STORAGE.getSimulatedTime();

    adminMatchesContainer.innerHTML = "";

    matches.forEach(match => {
      const isFinished = match.realHomeGoals !== null && match.realAwayGoals !== null;
      const isLocked = window.WC_DATA.isMatchLocked(match, simTime);
      
      const row = document.createElement("div");
      row.className = "admin-match-row";

      // Current goals inputs (default to 0 if not simulated yet)
      const currentHomeSim = match.realHomeGoals !== null ? match.realHomeGoals : 0;
      const currentAwaySim = match.realAwayGoals !== null ? match.realAwayGoals : 0;

      const homeTranslated = translateTeamName(match.homeTeam, lang);
      const awayTranslated = translateTeamName(match.awayTeam, lang);

      let actionHtml = "";
      if (isFinished) {
        actionHtml = `<span class="admin-status-lbl text-glow-green">${t("lblSimulated")} (${match.realHomeGoals}-${match.realAwayGoals})</span>`;
      } else {
        const lockoutWarning = isLocked ? `<span style="color:var(--color-neon-magenta); font-size:0.6rem; display:block;">${t("lblClosed")}</span>` : '';
        actionHtml = `
          <div style="text-align: right;">
            ${lockoutWarning}
            <button class="btn-finish-match mt-1" id="btn-admin-finish-${match.id}" type="button">
              ${t("btnFinalize")}
            </button>
          </div>
        `;
      }

      row.innerHTML = `
        <div class="admin-match-row-details" style="flex: 1;">
          <div class="admin-match-teams">
            <span>${match.homeFlag} ${homeTranslated}</span>
            <span style="color: var(--color-text-muted);"> vs </span>
            <span>${match.awayFlag} ${awayTranslated}</span>
          </div>
          <span style="font-size: 0.65rem; color: var(--color-text-dim); display:block; margin-top:0.2rem;">
            ${window.WC_DATA.formatMatchTime(match.kickoff)} - ${match.stadium}
          </span>
        </div>

        <!-- Incrementers for simulation (Only visible if not finalized) -->
        ${!isFinished ? `
          <div class="admin-score-adjuster">
            <!-- Home Adjust -->
            <button class="btn-score-spin" id="btn-spin-home-down-${match.id}" type="button">-</button>
            <span class="admin-score-val" id="val-home-${match.id}">${currentHomeSim}</span>
            <button class="btn-score-spin" id="btn-spin-home-up-${match.id}" type="button">+</button>
            
            <span style="margin: 0 0.2rem; color: var(--color-text-dim)">:</span>

            <!-- Away Adjust -->
            <button class="btn-score-spin" id="btn-spin-away-down-${match.id}" type="button">-</button>
            <span class="admin-score-val" id="val-away-${match.id}">${currentAwaySim}</span>
            <button class="btn-score-spin" id="btn-spin-away-up-${match.id}" type="button">+</button>
          </div>
        ` : ''}

        <div style="min-width: 110px; text-align: right;">
          ${actionHtml}
        </div>
      `;

      // Incrementer buttons logic
      if (!isFinished) {
        let hVal = currentHomeSim;
        let aVal = currentAwaySim;

        const updateDisp = () => {
          document.getElementById(`val-home-${match.id}`).innerText = hVal;
          document.getElementById(`val-away-${match.id}`).innerText = aVal;
        };

        row.querySelector(`#btn-spin-home-up-${match.id}`).onclick = () => { window.WC_SOUND.playClick(); hVal++; updateDisp(); };
        row.querySelector(`#btn-spin-home-down-${match.id}`).onclick = () => { window.WC_SOUND.playClick(); if (hVal > 0) hVal--; updateDisp(); };
        row.querySelector(`#btn-spin-away-up-${match.id}`).onclick = () => { window.WC_SOUND.playClick(); aVal++; updateDisp(); };
        row.querySelector(`#btn-spin-away-down-${match.id}`).onclick = () => { window.WC_SOUND.playClick(); if (aVal > 0) aVal--; updateDisp(); };

        // Finish action logic
        row.querySelector(`#btn-admin-finish-${match.id}`).onclick = () => {
          const savedMatches = window.WC_STORAGE.getMatches();
          const matchIndex = savedMatches.findIndex(m => m.id === match.id);
          
          if (matchIndex !== -1) {
            // Update local memory copy for calculations
            savedMatches[matchIndex].realHomeGoals = hVal;
            savedMatches[matchIndex].realAwayGoals = aVal;
            savedMatches[matchIndex].status = "finished";
            
            // Push match score to Firestore, then compute and update user scores in Firestore
            window.WC_STORAGE.saveMatches(savedMatches)
              .then(() => {
                const predictions = window.WC_STORAGE.getPredictions();
                return window.WC_STORAGE.calculateAndSyncUserScores(savedMatches, predictions);
              })
              .then(() => {
                window.WC_SOUND.playLevelUp();
                showToast(t("toastMatchFinalized", { home: homeTranslated, hVal: hVal, aVal: aVal, away: awayTranslated }));
                addLog(t("logMatchSimulated", { home: homeTranslated, hVal: hVal, aVal: aVal, away: awayTranslated }), "success");

                // Print points updates to log
                const predictions = window.WC_STORAGE.getPredictions();
                const leaderboard = window.WC_STORAGE.calculateLeaderboard();
                leaderboard.forEach(user => {
                  const uPred = predictions[`${user.username}_${match.id}`];
                  if (uPred) {
                    const ptsResult = window.WC_STORAGE.calculateMatchPoints(uPred, match);
                    if (ptsResult.points > 0) {
                      const localizedDesc = t("pointsResult_" + ptsResult.type, { points: ptsResult.points }) || ptsResult.description;
                      addLog(t("logUserEarns", { username: user.username, points: ptsResult.points, desc: localizedDesc, homeGoals: uPred.homeGoals, awayGoals: uPred.awayGoals }), "normal");
                    }
                  }
                });

                renderAll();
              })
              .catch(err => {
                window.WC_SOUND.playError();
                showToast(t("toastSimError"), "error");
                console.error("Simulation save error: ", err);
              });
          }
        };
      }

      adminMatchesContainer.appendChild(row);
    });
  }

  // SOUND TOGGLE UI
  function updateMuteButtonUI() {
    const isMuted = window.WC_SOUND.getMutedState();
    document.getElementById("mute-icon").innerText = isMuted ? "🔇" : "🔊";
  }

  // SYSTEM LISTENERS
  function setupEventListeners() {
    // Navigation Tabs Router
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        if (target) {
          window.WC_SOUND.playClick();
          activeTab = target;
          renderAll();
        }
      });
    });

    // Sidebar View All Rankings trigger
    document.getElementById("btn-sidebar-view-all").onclick = () => {
      window.WC_SOUND.playClick();
      activeTab = "screen-leaderboard";
      renderAll();
    };

    // Close team stats sidebar
    btnCloseTeamSidebar.onclick = closeTeamSidebar;

    // Close sidebar on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeTeamSidebar();
      }
    });

    // Close sidebar on clicking outside
    document.addEventListener("click", (e) => {
      if (teamDetailsSidebar.classList.contains("open") &&
          !teamDetailsSidebar.contains(e.target) &&
          !e.target.closest(".team-info")) {
        closeTeamSidebar();
      }
    });

    // Mute Button
    document.getElementById("tab-mute-toggle").addEventListener("click", () => {
      window.WC_SOUND.toggleMute();
      updateMuteButtonUI();
      // Test beep to give feedback
      window.WC_SOUND.playClick();
    });

    // Logout
    document.getElementById("btn-logout").addEventListener("click", () => {
      window.WC_SOUND.playError();
      sessionStorage.removeItem("wc_active_user");
      currentUser = null;
      activeTab = "screen-dashboard";
      renderAll();
      showToast(t("toastLogout"), "error");
    });

    // Language Selector Event
    const langSelector = document.getElementById("lang-selector");
    if (langSelector) {
      langSelector.addEventListener("change", (e) => {
        window.WC_SOUND.playClick();
        const nextLang = e.target.value;
        localStorage.setItem("wc_lang", nextLang);
        renderAll();
      });
    }

    // Dashboard Filters
    document.getElementById("btn-filter-all").onclick = (e) => { window.WC_SOUND.playClick(); toggleFilter("all", e.target); };
    document.getElementById("btn-filter-open").onclick = (e) => { window.WC_SOUND.playClick(); toggleFilter("open", e.target); };
    document.getElementById("btn-filter-closed").onclick = (e) => { window.WC_SOUND.playClick(); toggleFilter("closed", e.target); };

    function toggleFilter(filterVal, btnEl) {
      activeFilter = filterVal;
      document.querySelectorAll(".matches-filter-bar .filter-btn").forEach(b => b.classList.remove("active"));
      btnEl.classList.add("active");
      renderDashboard();
    }

    // Toggle Test Mode switch
    document.getElementById("admin-toggle-testmode").onchange = (e) => {
      const active = e.target.checked;
      window.db.collection("settings").doc("testMode").set({ active: active })
        .then(() => {
          if (active) {
            window.WC_SOUND.playSuccess();
            showToast(t("toastModeSuccess"));
            addLog(t("logSimEnabled"), "system");
          } else {
            window.WC_SOUND.playError();
            showToast(t("toastModeProd"));
            addLog(t("logSimDisabled"), "system");
          }
          renderAll();
        })
        .catch(err => {
          window.WC_SOUND.playError();
          showToast("Error al cambiar modo de prueba.", "error");
          console.error("Firebase testMode save error: ", err);
        });
    };

    // Time Machine adjustments
    document.getElementById("btn-time-sub-day").onclick = () => adjustSimTime(-24 * 3600 * 1000);
    document.getElementById("btn-time-add-hour").onclick = () => adjustSimTime(3600 * 1000);
    document.getElementById("btn-time-add-day").onclick = () => adjustSimTime(24 * 3600 * 1000);

    function adjustSimTime(offsetMs) {
      window.WC_SOUND.playClick();
      const current = window.WC_STORAGE.getSimulatedTime();
      const nextTime = current + offsetMs;
      
      window.WC_STORAGE.saveSimulatedTime(nextTime)
        .then(() => {
          addLog(t("logTimeAdjusted", { time: new Date(nextTime).toLocaleString(t("locale")) }), "system");
          showToast(t("toastSimTimeUpdated"));
          renderAll();
        })
        .catch(err => {
          window.WC_SOUND.playError();
          showToast(t("toastTimeError"), "error");
          console.error("Time machine save error: ", err);
        });
    }

    // Reset Database button
    document.getElementById("btn-reset-database").onclick = () => {
      if (confirm(t("confirmReset"))) {
        window.WC_SOUND.playError();
        
        window.WC_STORAGE.resetAllData()
          .then(() => {
            sessionStorage.removeItem("wc_active_user");
            currentUser = null;
            activeTab = "screen-dashboard";
            
            addLog(t("logDbReset"), "system");
            showToast(t("toastDbRestored"));
            renderAll();
          })
          .catch(err => {
            window.WC_SOUND.playError();
            showToast(t("toastResetError"), "error");
            console.error("Firebase reset error: ", err);
          });
      }
    };

    // Form Submissions (Modified to use Firebase Auth + Firestore)
    formLogin.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById("login-username").value.trim();
      const pass = document.getElementById("login-password").value.trim();
      const email = name.toLowerCase() + '@oraculo2026.com';
      const lang = localStorage.getItem("wc_lang") || "es";

      // Sign in via Firebase Auth using mock email
      window.auth.signInWithEmailAndPassword(email, pass)
        .then(() => {
          // Retrieve matching Firestore user document
          return window.db.collection("users").doc(name).get();
        })
        .then(doc => {
          if (doc.exists) {
            currentUser = doc.data();
            sessionStorage.setItem("wc_active_user", JSON.stringify(currentUser));
            
            window.WC_SOUND.playSuccess();
            showToast(t("toastWelcome", { username: currentUser.username }));
            addLog(t("logUserEntered", { username: currentUser.username }));
            
            renderAll();
          } else {
            // User authenticated in Auth, but doc missing in Firestore. Let's create it!
            const defaultUser = window.WC_STORAGE.DEFAULT_USERS.find(u => u.username.toLowerCase() === name.toLowerCase());
            const newUser = defaultUser ? { ...defaultUser } : {
              username: name,
              password: pass,
              phone: "",
              avatar: "⚽",
              isAdmin: name.toLowerCase() === "admin",
              points: 0, exact: 0, difference: 0, teamGoals: 0, outcome: 0, incorrect: 0
            };
            return window.db.collection("users").doc(name).set(newUser).then(() => {
              currentUser = newUser;
              sessionStorage.setItem("wc_active_user", JSON.stringify(newUser));
              window.WC_SOUND.playSuccess();
              showToast(t("toastProfileRestored", { username: currentUser.username }));
              addLog(t("logUserEntered", { username: currentUser.username }));
              renderAll();
            });
          }
        })
        .catch(err => {
          // If the login failed, check if the entered name/password matches a default mock user.
          // If so, we auto-create the Auth account on the fly (since Auth database was created fresh!)
          const defaultUser = window.WC_STORAGE.DEFAULT_USERS.find(u => u.username.toLowerCase() === name.toLowerCase() && u.password === pass);
          if (defaultUser) {
            addLog(t("logProvisioning", { name: name }), "system");
            return window.auth.createUserWithEmailAndPassword(email, pass)
              .then(() => {
                // Ensure profile doc exists in Firestore
                return window.db.collection("users").doc(name).set(defaultUser);
              })
              .then(() => {
                currentUser = defaultUser;
                sessionStorage.setItem("wc_active_user", JSON.stringify(defaultUser));
                window.WC_SOUND.playSuccess();
                showToast(t("toastMockUserInit", { username: currentUser.username }));
                addLog(t("logUserEntered", { username: currentUser.username }));
                renderAll();
              })
              .catch(signUpErr => {
                window.WC_SOUND.playError();
                showToast(t("toastLoginError"), "error");
                console.error("Auth mock signup error: ", signUpErr);
              });
          } else {
            window.WC_SOUND.playError();
            showToast(t("toastLoginError"), "error");
            console.error("Auth login error: ", err);
          }
        });
    };

    formSignup.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById("signup-username").value.trim();
      const pass = document.getElementById("signup-password").value.trim();
      const phoneVal = document.getElementById("signup-phone").value.trim();
      const lang = localStorage.getItem("wc_lang") || "es";

      if (name.length < 3) {
        window.WC_SOUND.playError();
        showToast(lang === "en" ? "Username must be at least 3 characters." : "El usuario debe tener al menos 3 letras.", "error");
        return;
      }

      if (pass.length < 6) {
        window.WC_SOUND.playError();
        showToast(lang === "en" ? "Password must be at least 6 characters." : "La contraseña debe tener al menos 6 caracteres.", "error");
        return;
      }

      // Check if username document exists in Firestore first
      window.db.collection("users").doc(name).get()
        .then(doc => {
          if (doc.exists) {
            throw new Error("username_taken");
          }
          // Register via Firebase Auth using mock email
          return window.auth.createUserWithEmailAndPassword(name.toLowerCase() + '@oraculo2026.com', pass);
        })
        .then(() => {
          // Save profile document in Firestore
          const newUser = {
            username: name,
            password: pass,
            phone: phoneVal,
            avatar: selectedSignupAvatar,
            isAdmin: false,
            points: 0,
            exact: 0,
            difference: 0,
            teamGoals: 0,
            outcome: 0,
            incorrect: 0
          };
          return window.db.collection("users").doc(name).set(newUser).then(() => newUser);
        })
        .then((newUser) => {
          currentUser = newUser;
          sessionStorage.setItem("wc_active_user", JSON.stringify(newUser));

          window.WC_SOUND.playLevelUp();
          showToast(t("toastAccountCreated", { name: name }));
          addLog(t("logNewAccount", { name: name, avatar: selectedSignupAvatar }), "success");

          // Reset signup form inputs
          formSignup.reset();
          initSignupAvatars();

          renderAll();
        })
        .catch(err => {
          window.WC_SOUND.playError();
          if (err.message === "username_taken") {
            showToast(t("toastUsernameTaken"), "error");
          } else {
            showToast(t("toastSignupError"), "error");
            console.error("Auth signup error: ", err);
          }
        });
    };
  }

  // Start the application
  window.addEventListener("DOMContentLoaded", init);
})();
