// World Cup 2026 Matches Database
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
    isMatchLocked,
    formatMatchTime
  };
})();
