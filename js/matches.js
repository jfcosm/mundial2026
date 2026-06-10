// World Cup 2026 Matches Database and Team Statistics
(function() {
  const INITIAL_MATCHES = [
    {
      id: "m1",
      homeTeam: "México",
      homeCode: "MEX",
      homeFlag: "🇲🇽",
      awayTeam: "Estados Unidos",
      awayCode: "USA",
      awayFlag: "🇺🇸",
      kickoff: "2026-06-11T18:00:00-06:00", // June 11, 6:00 PM local Mexico
      group: "Grupo A",
      stadium: "Estadio Azteca, CDMX",
      realHomeGoals: null,
      realAwayGoals: null,
      status: "scheduled"
    },
    {
      id: "m2",
      homeTeam: "Canadá",
      homeCode: "CAN",
      homeFlag: "🇨🇦",
      awayTeam: "Nueva Zelanda",
      awayCode: "NZL",
      awayFlag: "🇳🇿",
      kickoff: "2026-06-11T20:30:00-07:00", // June 11, 8:30 PM local Vancouver
      group: "Grupo B",
      stadium: "BC Place, Vancouver",
      realHomeGoals: null,
      realAwayGoals: null,
      status: "scheduled"
    },
    {
      id: "m3",
      homeTeam: "España",
      homeCode: "ESP",
      homeFlag: "🇪🇸",
      awayTeam: "Japón",
      awayCode: "JPN",
      awayFlag: "🇯🇵",
      kickoff: "2026-06-12T15:00:00-04:00", // June 12, 3:00 PM local New York
      group: "Grupo C",
      stadium: "MetLife Stadium, East Rutherford",
      realHomeGoals: null,
      realAwayGoals: null,
      status: "scheduled"
    },
    {
      id: "m4",
      homeTeam: "Argentina",
      homeCode: "ARG",
      homeFlag: "🇦🇷",
      awayTeam: "Francia",
      awayCode: "FRA",
      awayFlag: "🇫🇷",
      kickoff: "2026-06-12T19:00:00-05:00", // June 12, 7:00 PM local Dallas
      group: "Grupo D",
      stadium: "AT&T Stadium, Arlington",
      realHomeGoals: null,
      realAwayGoals: null,
      status: "scheduled"
    },
    {
      id: "m5",
      homeTeam: "Brasil",
      homeCode: "BRA",
      homeFlag: "🇧🇷",
      awayTeam: "Camerún",
      awayCode: "CMR",
      awayFlag: "🇨🇲",
      kickoff: "2026-06-13T14:00:00-07:00", // June 13, 2:00 PM local Los Angeles
      group: "Grupo E",
      stadium: "SoFi Stadium, Inglewood",
      realHomeGoals: null,
      realAwayGoals: null,
      status: "scheduled"
    },
    {
      id: "m6",
      homeTeam: "Alemania",
      homeCode: "GER",
      homeFlag: "🇩🇪",
      awayTeam: "Marruecos",
      awayCode: "MAR",
      awayFlag: "🇲🇦",
      kickoff: "2026-06-13T18:00:00-04:00", // June 13, 6:00 PM local Boston
      group: "Grupo F",
      stadium: "Gillette Stadium, Foxborough",
      realHomeGoals: null,
      realAwayGoals: null,
      status: "scheduled"
    },
    {
      id: "m7",
      homeTeam: "Italia",
      homeCode: "ITA",
      homeFlag: "🇮🇹",
      awayTeam: "Uruguay",
      awayCode: "URU",
      awayFlag: "🇺🇾",
      kickoff: "2026-06-14T15:00:00-04:00", // June 14, 3:00 PM local Miami
      group: "Grupo G",
      stadium: "Hard Rock Stadium, Miami Gardens",
      realHomeGoals: null,
      realAwayGoals: null,
      status: "scheduled"
    },
    {
      id: "m8",
      homeTeam: "Portugal",
      homeCode: "POR",
      homeFlag: "🇵🇹",
      awayTeam: "Corea del Sur",
      awayCode: "KOR",
      awayFlag: "🇰🇷",
      kickoff: "2026-06-14T19:00:00-05:00", // June 14, 7:00 PM local Houston
      group: "Grupo H",
      stadium: "NRG Stadium, Houston",
      realHomeGoals: null,
      realAwayGoals: null,
      status: "scheduled"
    }
  ];

  const TEAM_STATS = {
    "México": {
      participations: 17,
      titles: 0,
      bestResult: "Cuartos de final (1970, 1986)",
      attack: 78,
      defense: 75,
      overview: "El gigante de la Concacaf busca hacer valer su localía histórica en el Estadio Azteca para superar la barrera de los cuartos de final."
    },
    "Estados Unidos": {
      participations: 11,
      titles: 0,
      bestResult: "Tercer lugar (1930)",
      attack: 83,
      defense: 80,
      overview: "Con una generación joven y consolidada en Europa, la selección de las barras y las estrellas quiere hacer historia como coanfitrión."
    },
    "Canadá": {
      participations: 2,
      titles: 0,
      bestResult: "Fase de grupos (1986, 2022)",
      attack: 77,
      defense: 74,
      overview: "Liderados por Alphonso Davies, los canadienses buscan su primera victoria en la historia de las copas mundiales como locales."
    },
    "Nueva Zelanda": {
      participations: 2,
      titles: 0,
      bestResult: "Fase de grupos (1982, 2010)",
      attack: 68,
      defense: 71,
      overview: "Los 'All Whites' clasifican buscando reeditar la hazaña de Sudáfrica 2010, donde se marcharon invictos de la fase de grupos."
    },
    "España": {
      participations: 16,
      titles: 1,
      bestResult: "Campeón (2010)",
      attack: 89,
      defense: 86,
      overview: "La 'Roja' impone su juego de posesión y velocidad en bandas con jóvenes estrellas y un mediocampo altamente creativo."
    },
    "Japón": {
      participations: 7,
      titles: 0,
      bestResult: "Octavos de final (2002, 2010, 2018, 2022)",
      attack: 82,
      defense: 81,
      overview: "Los 'Samuráis Azules' son reconocidos por su orden táctico letal, transiciones a gran velocidad y gran disciplina colectiva."
    },
    "Argentina": {
      participations: 18,
      titles: 3,
      bestResult: "Campeón (1978, 1986, 2022)",
      attack: 93,
      defense: 89,
      overview: "La 'Albiceleste' defiende la corona mundial con un plantel repleto de figuras consagradas y la mística ganadora de Lionel Scaloni."
    },
    "Francia": {
      participations: 16,
      titles: 2,
      bestResult: "Campeón (1998, 2018)",
      attack: 92,
      defense: 91,
      overview: "Los 'Bleus' combinan velocidad física extrema, profundidad letal y una jerarquía en partidos decisivos que los hace favoritos."
    },
    "Brasil": {
      participations: 22,
      titles: 5,
      bestResult: "Campeón (1958, 1962, 1970, 1994, 2002)",
      attack: 94,
      defense: 87,
      overview: "La única selección con asistencia perfecta a los mundiales. Busca el ansiado hexacampeonato combinando samba y verticalidad."
    },
    "Camerún": {
      participations: 8,
      titles: 0,
      bestResult: "Cuartos de final (1990)",
      attack: 75,
      defense: 73,
      overview: "Los 'Leones Indomables' regresan al torneo con su característica potencia física y la meta de revivir su gloria de Italia 1990."
    },
    "Alemania": {
      participations: 20,
      titles: 4,
      bestResult: "Campeón (1954, 1974, 1990, 2014)",
      attack: 88,
      defense: 85,
      overview: "La 'Mannschaft' representa la disciplina y eficiencia táctica en torneos cortos, buscando igualar a Brasil con su quinta estrella."
    },
    "Marruecos": {
      participations: 6,
      titles: 0,
      bestResult: "Cuarto lugar (2022)",
      attack: 81,
      defense: 85,
      overview: "La revelación histórica de Qatar 2022 busca consolidarse como la principal potencia emergente del fútbol mundial."
    },
    "Italia": {
      participations: 18,
      titles: 4,
      bestResult: "Campeón (1934, 1938, 1982, 2006)",
      attack: 84,
      defense: 88,
      overview: "La escuadra 'Azzurra' llega con hambre de revancha y el clásico orden táctico defensivo que los ha llevado a ser tetracampeones."
    },
    "Uruguay": {
      participations: 14,
      titles: 2,
      bestResult: "Campeón (1930, 1950)",
      attack: 85,
      defense: 86,
      overview: "La 'Celeste' fusiona la mítica 'garra charrúa' con el ritmo vertical y de alta presión propuesto por su nueva generación."
    },
    "Portugal": {
      participations: 8,
      titles: 0,
      bestResult: "Tercer lugar (1966)",
      attack: 88,
      defense: 84,
      overview: "Una constelación de talento ofensivo luso busca coronarse en América tras dominar en los torneos europeos recientes."
    },
    "Corea del Sur": {
      participations: 11,
      titles: 0,
      bestResult: "Cuarto lugar (2002)",
      attack: 78,
      defense: 76,
      overview: "Un juego dinámico e incansable define a los coreanos, que buscan forzar errores a base de desgaste físico y presión."
    }
  };

  // A match is lockable if the current time is less than 1 hour before kickoff.
  // currentSimulatedTime is a millisecond timestamp representing simulated time.
  function isMatchLocked(match, currentSimulatedTime) {
    const kickoffTime = new Date(match.kickoff).getTime();
    const oneHourInMs = 60 * 60 * 1000;
    return (kickoffTime - currentSimulatedTime) <= oneHourInMs;
  }

  // Helper to format kickoff dates
  function formatMatchTime(kickoffStr) {
    const date = new Date(kickoffStr);
    return date.toLocaleString('es-ES', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  window.WC_DATA = {
    INITIAL_MATCHES,
    TEAM_STATS,
    isMatchLocked,
    formatMatchTime
  };
})();
