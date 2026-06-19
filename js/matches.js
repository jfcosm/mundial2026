// World Cup 2026 Matches Database and Team Statistics
(function() {
  const INITIAL_MATCHES = [
    // ==============================================
    // JORNADA 1 – FASE DE GRUPOS
    // ==============================================

    // --- JUEVES 11 JUN ---
    { id:"m1",  homeTeam:"México",           homeCode:"MEX", homeFlag:"🇲🇽", awayTeam:"Sudáfrica",         awayCode:"RSA", awayFlag:"🇿🇦", kickoff:"2026-06-11T15:00:00-04:00", group:"Grupo A", stadium:"Estadio Azteca, CDMX",                 realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m2",  homeTeam:"Corea del Sur",    homeCode:"KOR", homeFlag:"🇰🇷", awayTeam:"Chequia",            awayCode:"CZE", awayFlag:"🇨🇿", kickoff:"2026-06-11T22:00:00-04:00", group:"Grupo A", stadium:"Estadio Tres de Marzo, Guadalajara",    realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- VIERNES 12 JUN ---
    { id:"m3",  homeTeam:"Canadá",           homeCode:"CAN", homeFlag:"🇨🇦", awayTeam:"Bosnia y Herzegovina",awayCode:"BIH", awayFlag:"🇧🇦", kickoff:"2026-06-12T15:00:00-04:00", group:"Grupo B", stadium:"BMO Field, Toronto",                   realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m4",  homeTeam:"Estados Unidos",   homeCode:"USA", homeFlag:"🇺🇸", awayTeam:"Paraguay",           awayCode:"PAR", awayFlag:"🇵🇾", kickoff:"2026-06-12T21:00:00-04:00", group:"Grupo D", stadium:"SoFi Stadium, Inglewood",               realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- SÁBADO 13 JUN ---
    { id:"m5",  homeTeam:"Catar",            homeCode:"QAT", homeFlag:"🇶🇦", awayTeam:"Suiza",              awayCode:"SUI", awayFlag:"🇨🇭", kickoff:"2026-06-13T15:00:00-04:00", group:"Grupo B", stadium:"Mercedes-Benz Stadium, Atlanta",         realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m6",  homeTeam:"Brasil",           homeCode:"BRA", homeFlag:"🇧🇷", awayTeam:"Marruecos",          awayCode:"MAR", awayFlag:"🇲🇦", kickoff:"2026-06-13T18:00:00-04:00", group:"Grupo C", stadium:"SoFi Stadium, Inglewood",               realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m7",  homeTeam:"Haití",            homeCode:"HAI", homeFlag:"🇭🇹", awayTeam:"Escocia",            awayCode:"SCO", awayFlag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", kickoff:"2026-06-13T21:00:00-04:00", group:"Grupo C", stadium:"Hard Rock Stadium, Miami",              realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- DOMINGO 14 JUN ---
    { id:"m8",  homeTeam:"Australia",        homeCode:"AUS", homeFlag:"🇦🇺", awayTeam:"Turquía",            awayCode:"TUR", awayFlag:"🇹🇷", kickoff:"2026-06-14T00:00:00-04:00", group:"Grupo D", stadium:"BC Place, Vancouver",                    realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m9",  homeTeam:"Alemania",         homeCode:"GER", homeFlag:"🇩🇪", awayTeam:"Curazao",            awayCode:"CUW", awayFlag:"🇨🇼", kickoff:"2026-06-14T13:00:00-04:00", group:"Grupo E", stadium:"Gillette Stadium, Boston",               realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m10", homeTeam:"Países Bajos",     homeCode:"NED", homeFlag:"🇳🇱", awayTeam:"Japón",              awayCode:"JPN", awayFlag:"🇯🇵", kickoff:"2026-06-14T16:00:00-04:00", group:"Grupo F", stadium:"Levi's Stadium, Santa Clara",             realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m11", homeTeam:"Costa de Marfil",  homeCode:"CIV", homeFlag:"🇨🇮", awayTeam:"Ecuador",            awayCode:"ECU", awayFlag:"🇪🇨", kickoff:"2026-06-14T19:00:00-04:00", group:"Grupo E", stadium:"AT&T Stadium, Arlington",                 realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m12", homeTeam:"Suecia",           homeCode:"SWE", homeFlag:"🇸🇪", awayTeam:"Túnez",              awayCode:"TUN", awayFlag:"🇹🇳", kickoff:"2026-06-14T22:00:00-04:00", group:"Grupo F", stadium:"MetLife Stadium, East Rutherford",       realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- LUNES 15 JUN ---
    { id:"m13", homeTeam:"España",           homeCode:"ESP", homeFlag:"🇪🇸", awayTeam:"Cabo Verde",         awayCode:"CPV", awayFlag:"🇨🇻", kickoff:"2026-06-15T12:00:00-04:00", group:"Grupo H", stadium:"Hard Rock Stadium, Miami",              realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m14", homeTeam:"Bélgica",          homeCode:"BEL", homeFlag:"🇧🇪", awayTeam:"Egipto",             awayCode:"EGY", awayFlag:"🇪🇬", kickoff:"2026-06-15T15:00:00-04:00", group:"Grupo G", stadium:"Lincoln Financial Field, Filadelfia",   realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m15", homeTeam:"Uruguay",          homeCode:"URU", homeFlag:"🇺🇾", awayTeam:"Arabia Saudita",     awayCode:"KSA", awayFlag:"🇸🇦", kickoff:"2026-06-15T18:00:00-04:00", group:"Grupo H", stadium:"Gillette Stadium, Boston",               realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m16", homeTeam:"Irán",             homeCode:"IRN", homeFlag:"🇮🇷", awayTeam:"Nueva Zelanda",      awayCode:"NZL", awayFlag:"🇳🇿", kickoff:"2026-06-15T21:00:00-04:00", group:"Grupo G", stadium:"NRG Stadium, Houston",                  realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- MARTES 16 JUN ---
    { id:"m17", homeTeam:"Francia",          homeCode:"FRA", homeFlag:"🇫🇷", awayTeam:"Senegal",            awayCode:"SEN", awayFlag:"🇸🇳", kickoff:"2026-06-16T15:00:00-04:00", group:"Grupo I", stadium:"MetLife Stadium, East Rutherford",       realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m18", homeTeam:"Irak",             homeCode:"IRQ", homeFlag:"🇮🇶", awayTeam:"Noruega",            awayCode:"NOR", awayFlag:"🇳🇴", kickoff:"2026-06-16T18:00:00-04:00", group:"Grupo I", stadium:"Subaru Park, Filadelfia",               realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m19", homeTeam:"Argentina",        homeCode:"ARG", homeFlag:"🇦🇷", awayTeam:"Argelia",            awayCode:"ALG", awayFlag:"🇩🇿", kickoff:"2026-06-16T21:00:00-04:00", group:"Grupo J", stadium:"AT&T Stadium, Arlington",                 realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- MIÉRCOLES 17 JUN ---
    { id:"m20", homeTeam:"Austria",          homeCode:"AUT", homeFlag:"🇦🇹", awayTeam:"Jordania",           awayCode:"JOR", awayFlag:"🇯🇴", kickoff:"2026-06-17T00:00:00-04:00", group:"Grupo J", stadium:"Arrowhead Stadium, Kansas City",         realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m21", homeTeam:"Portugal",         homeCode:"POR", homeFlag:"🇵🇹", awayTeam:"RD del Congo",       awayCode:"COD", awayFlag:"🇨🇩", kickoff:"2026-06-17T13:00:00-04:00", group:"Grupo K", stadium:"Levi's Stadium, Santa Clara",             realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m22", homeTeam:"Inglaterra",       homeCode:"ENG", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayTeam:"Croacia",            awayCode:"CRO", awayFlag:"🇭🇷", kickoff:"2026-06-17T16:00:00-04:00", group:"Grupo L", stadium:"SoFi Stadium, Inglewood",               realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m23", homeTeam:"Ghana",            homeCode:"GHA", homeFlag:"🇬🇭", awayTeam:"Panamá",             awayCode:"PAN", awayFlag:"🇵🇦", kickoff:"2026-06-17T19:00:00-04:00", group:"Grupo L", stadium:"BC Place, Vancouver",                    realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m24", homeTeam:"Uzbekistán",       homeCode:"UZB", homeFlag:"🇺🇿", awayTeam:"Colombia",           awayCode:"COL", awayFlag:"🇨🇴", kickoff:"2026-06-17T22:00:00-04:00", group:"Grupo K", stadium:"NRG Stadium, Houston",                  realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // ==============================================
    // JORNADA 2 – FASE DE GRUPOS (Jun 22–26)
    // Bloques fijos: 16:00 y 19:00 Chile
    // ==============================================

    // --- LUNES 22 JUN ---
    { id:"m25", homeTeam:"Argentina",        homeCode:"ARG", homeFlag:"🇦🇷", awayTeam:"Austria",            awayCode:"AUT", awayFlag:"🇦🇹", kickoff:"2026-06-22T16:00:00-04:00", group:"Grupo J", stadium:"AT&T Stadium, Arlington",                 realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m26", homeTeam:"Francia",          homeCode:"FRA", homeFlag:"🇫🇷", awayTeam:"Irak",               awayCode:"IRQ", awayFlag:"🇮🇶", kickoff:"2026-06-22T16:00:00-04:00", group:"Grupo I", stadium:"Lincoln Financial Field, Filadelfia",   realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m27", homeTeam:"Noruega",          homeCode:"NOR", homeFlag:"🇳🇴", awayTeam:"Senegal",            awayCode:"SEN", awayFlag:"🇸🇳", kickoff:"2026-06-22T19:00:00-04:00", group:"Grupo I", stadium:"MetLife Stadium, East Rutherford",       realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m28", homeTeam:"Jordania",         homeCode:"JOR", homeFlag:"🇯🇴", awayTeam:"Argelia",            awayCode:"ALG", awayFlag:"🇩🇿", kickoff:"2026-06-22T19:00:00-04:00", group:"Grupo J", stadium:"Levi's Stadium, Santa Clara",             realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- MARTES 23 JUN ---
    { id:"m29", homeTeam:"Portugal",         homeCode:"POR", homeFlag:"🇵🇹", awayTeam:"Uzbekistán",         awayCode:"UZB", awayFlag:"🇺🇿", kickoff:"2026-06-23T16:00:00-04:00", group:"Grupo K", stadium:"Gillette Stadium, Boston",               realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m30", homeTeam:"Inglaterra",       homeCode:"ENG", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayTeam:"Ghana",              awayCode:"GHA", awayFlag:"🇬🇭", kickoff:"2026-06-23T16:00:00-04:00", group:"Grupo L", stadium:"Arrowhead Stadium, Kansas City",         realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m31", homeTeam:"Panamá",           homeCode:"PAN", homeFlag:"🇵🇦", awayTeam:"Croacia",            awayCode:"CRO", awayFlag:"🇭🇷", kickoff:"2026-06-23T19:00:00-04:00", group:"Grupo L", stadium:"Hard Rock Stadium, Miami",              realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m32", homeTeam:"Colombia",         homeCode:"COL", homeFlag:"🇨🇴", awayTeam:"RD del Congo",       awayCode:"COD", awayFlag:"🇨🇩", kickoff:"2026-06-23T19:00:00-04:00", group:"Grupo K", stadium:"NRG Stadium, Houston",                  realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- MIÉRCOLES 24 JUN ---
    { id:"m33", homeTeam:"Suiza",            homeCode:"SUI", homeFlag:"🇨🇭", awayTeam:"Canadá",             awayCode:"CAN", awayFlag:"🇨🇦", kickoff:"2026-06-24T16:00:00-04:00", group:"Grupo B", stadium:"BMO Field, Toronto",                   realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m34", homeTeam:"Bosnia y Herzegovina",homeCode:"BIH", homeFlag:"🇧🇦", awayTeam:"Catar",           awayCode:"QAT", awayFlag:"🇶🇦", kickoff:"2026-06-24T16:00:00-04:00", group:"Grupo B", stadium:"Mercedes-Benz Stadium, Atlanta",         realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m35", homeTeam:"Marruecos",        homeCode:"MAR", homeFlag:"🇲🇦", awayTeam:"Haití",              awayCode:"HAI", awayFlag:"🇭🇹", kickoff:"2026-06-24T19:00:00-04:00", group:"Grupo C", stadium:"Subaru Park, Filadelfia",               realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m36", homeTeam:"Escocia",          homeCode:"SCO", homeFlag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", awayTeam:"Brasil",             awayCode:"BRA", awayFlag:"🇧🇷", kickoff:"2026-06-24T19:00:00-04:00", group:"Grupo C", stadium:"SoFi Stadium, Inglewood",               realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- JUEVES 25 JUN ---
    { id:"m37", homeTeam:"Sudáfrica",        homeCode:"RSA", homeFlag:"🇿🇦", awayTeam:"Corea del Sur",      awayCode:"KOR", awayFlag:"🇰🇷", kickoff:"2026-06-25T16:00:00-04:00", group:"Grupo A", stadium:"AT&T Stadium, Arlington",                 realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m38", homeTeam:"Chequia",          homeCode:"CZE", homeFlag:"🇨🇿", awayTeam:"México",             awayCode:"MEX", awayFlag:"🇲🇽", kickoff:"2026-06-25T16:00:00-04:00", group:"Grupo A", stadium:"Estadio Azteca, CDMX",                 realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m39", homeTeam:"Curazao",          homeCode:"CUW", homeFlag:"🇨🇼", awayTeam:"Costa de Marfil",    awayCode:"CIV", awayFlag:"🇨🇮", kickoff:"2026-06-25T19:00:00-04:00", group:"Grupo E", stadium:"MetLife Stadium, East Rutherford",       realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m40", homeTeam:"Ecuador",          homeCode:"ECU", homeFlag:"🇪🇨", awayTeam:"Alemania",           awayCode:"GER", awayFlag:"🇩🇪", kickoff:"2026-06-25T19:00:00-04:00", group:"Grupo E", stadium:"Levi's Stadium, Santa Clara",             realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- VIERNES 26 JUN ---
    { id:"m41", homeTeam:"Túnez",            homeCode:"TUN", homeFlag:"🇹🇳", awayTeam:"Países Bajos",       awayCode:"NED", awayFlag:"🇳🇱", kickoff:"2026-06-26T16:00:00-04:00", group:"Grupo F", stadium:"Hard Rock Stadium, Miami",              realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m42", homeTeam:"Japón",            homeCode:"JPN", homeFlag:"🇯🇵", awayTeam:"Suecia",             awayCode:"SWE", awayFlag:"🇸🇪", kickoff:"2026-06-26T16:00:00-04:00", group:"Grupo F", stadium:"Mercedes-Benz Stadium, Atlanta",         realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m43", homeTeam:"Turquía",          homeCode:"TUR", homeFlag:"🇹🇷", awayTeam:"Estados Unidos",     awayCode:"USA", awayFlag:"🇺🇸", kickoff:"2026-06-26T19:00:00-04:00", group:"Grupo D", stadium:"NRG Stadium, Houston",                  realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m44", homeTeam:"Paraguay",         homeCode:"PAR", homeFlag:"🇵🇾", awayTeam:"Australia",          awayCode:"AUS", awayFlag:"🇦🇺", kickoff:"2026-06-26T19:00:00-04:00", group:"Grupo D", stadium:"BC Place, Vancouver",                    realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // ==============================================
    // JORNADA 3 – FASE DE GRUPOS (Jun 28–30)
    // Bloques fijos: 16:00 y 19:00 Chile
    // ==============================================

    // --- DOMINGO 28 JUN ---
    { id:"m45", homeTeam:"Noruega",          homeCode:"NOR", homeFlag:"🇳🇴", awayTeam:"Francia",            awayCode:"FRA", awayFlag:"🇫🇷", kickoff:"2026-06-28T16:00:00-04:00", group:"Grupo I", stadium:"MetLife Stadium, East Rutherford",       realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m46", homeTeam:"Senegal",          homeCode:"SEN", homeFlag:"🇸🇳", awayTeam:"Irak",               awayCode:"IRQ", awayFlag:"🇮🇶", kickoff:"2026-06-28T16:00:00-04:00", group:"Grupo I", stadium:"Lincoln Financial Field, Filadelfia",   realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m47", homeTeam:"Argentina",        homeCode:"ARG", homeFlag:"🇦🇷", awayTeam:"Jordania",           awayCode:"JOR", awayFlag:"🇯🇴", kickoff:"2026-06-28T19:00:00-04:00", group:"Grupo J", stadium:"AT&T Stadium, Arlington",                 realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m48", homeTeam:"Austria",          homeCode:"AUT", homeFlag:"🇦🇹", awayTeam:"Argelia",            awayCode:"ALG", awayFlag:"🇩🇿", kickoff:"2026-06-28T19:00:00-04:00", group:"Grupo J", stadium:"Levi's Stadium, Santa Clara",             realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- LUNES 29 JUN ---
    { id:"m49", homeTeam:"Portugal",         homeCode:"POR", homeFlag:"🇵🇹", awayTeam:"Colombia",           awayCode:"COL", awayFlag:"🇨🇴", kickoff:"2026-06-29T16:00:00-04:00", group:"Grupo K", stadium:"Gillette Stadium, Boston",               realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m50", homeTeam:"Uzbekistán",       homeCode:"UZB", homeFlag:"🇺🇿", awayTeam:"RD del Congo",       awayCode:"COD", awayFlag:"🇨🇩", kickoff:"2026-06-29T16:00:00-04:00", group:"Grupo K", stadium:"SoFi Stadium, Inglewood",               realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m51", homeTeam:"Inglaterra",       homeCode:"ENG", homeFlag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", awayTeam:"Panamá",             awayCode:"PAN", awayFlag:"🇵🇦", kickoff:"2026-06-29T19:00:00-04:00", group:"Grupo L", stadium:"Arrowhead Stadium, Kansas City",         realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m52", homeTeam:"Ghana",            homeCode:"GHA", homeFlag:"🇬🇭", awayTeam:"Croacia",            awayCode:"CRO", awayFlag:"🇭🇷", kickoff:"2026-06-29T19:00:00-04:00", group:"Grupo L", stadium:"Hard Rock Stadium, Miami",              realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- JUEVES 18 JUN ---
    { id:"m53", homeTeam:"Canadá",           homeCode:"CAN", homeFlag:"🇨🇦", awayTeam:"Catar",              awayCode:"QAT", awayFlag:"🇶🇦", kickoff:"2026-06-18T18:00:00-04:00", group:"Grupo B", stadium:"BC Place, Vancouver",                   realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m54", homeTeam:"Suiza",            homeCode:"SUI", homeFlag:"🇨🇭", awayTeam:"Bosnia y Herzegovina",awayCode:"BIH", awayFlag:"🇧🇦", kickoff:"2026-06-18T15:00:00-04:00", group:"Grupo B", stadium:"SoFi Stadium, Inglewood",               realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- VIERNES 19 JUN ---
    { id:"m55", homeTeam:"Brasil",           homeCode:"BRA", homeFlag:"🇧🇷", awayTeam:"Haití",              awayCode:"HAI", awayFlag:"🇭🇹", kickoff:"2026-06-19T20:30:00-04:00", group:"Grupo C", stadium:"Lincoln Financial Field, Filadelfia",   realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m56", homeTeam:"Escocia",          homeCode:"SCO", homeFlag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", awayTeam:"Marruecos",          awayCode:"MAR", awayFlag:"🇲🇦", kickoff:"2026-06-19T18:00:00-04:00", group:"Grupo C", stadium:"Gillette Stadium, Boston",               realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- JUEVES 18 JUN (Adicionales Grupo A) ---
    { id:"m57", homeTeam:"Chequia",          homeCode:"CZE", homeFlag:"🇨🇿", awayTeam:"Sudáfrica",          awayCode:"RSA", awayFlag:"🇿🇦", kickoff:"2026-06-18T12:00:00-04:00", group:"Grupo A", stadium:"Mercedes-Benz Stadium, Atlanta",         realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m58", homeTeam:"México",           homeCode:"MEX", homeFlag:"🇲🇽", awayTeam:"Corea del Sur",      awayCode:"KOR", awayFlag:"🇰🇷", kickoff:"2026-06-18T21:00:00-04:00", group:"Grupo A", stadium:"Estadio Tres de Marzo, Guadalajara",    realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- VIERNES 19 JUN (Adicionales Grupo D) ---
    { id:"m59", homeTeam:"Estados Unidos",   homeCode:"USA", homeFlag:"🇺🇸", awayTeam:"Australia",          awayCode:"AUS", awayFlag:"🇦🇺", kickoff:"2026-06-19T15:00:00-04:00", group:"Grupo D", stadium:"Lumen Field, Seattle",                   realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m60", homeTeam:"Turquía",          homeCode:"TUR", homeFlag:"🇹🇷", awayTeam:"Paraguay",           awayCode:"PAR", awayFlag:"🇵🇾", kickoff:"2026-06-19T23:00:00-04:00", group:"Grupo D", stadium:"Levi's Stadium, Santa Clara",             realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- SÁBADO 20 JUN (Adicionales Grupo E & F) ---
    { id:"m61", homeTeam:"Alemania",         homeCode:"GER", homeFlag:"🇩🇪", awayTeam:"Costa de Marfil",    awayCode:"CIV", awayFlag:"🇨🇮", kickoff:"2026-06-20T16:00:00-04:00", group:"Grupo E", stadium:"BMO Field, Toronto",                   realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m62", homeTeam:"Ecuador",          homeCode:"ECU", homeFlag:"🇪🇨", awayTeam:"Curazao",            awayCode:"CUW", awayFlag:"🇨🇼", kickoff:"2026-06-20T20:00:00-04:00", group:"Grupo E", stadium:"Arrowhead Stadium, Kansas City",         realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m63", homeTeam:"Países Bajos",     homeCode:"NED", homeFlag:"🇳🇱", awayTeam:"Suecia",             awayCode:"SWE", awayFlag:"🇸🇪", kickoff:"2026-06-20T13:00:00-04:00", group:"Grupo F", stadium:"NRG Stadium, Houston",                  realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- DOMINGO 21 JUN (Adicionales Grupo F, G & H) ---
    { id:"m64", homeTeam:"Túnez",            homeCode:"TUN", homeFlag:"🇹🇳", awayTeam:"Japón",              awayCode:"JPN", awayFlag:"🇯🇵", kickoff:"2026-06-21T00:00:00-04:00", group:"Grupo F", stadium:"Estadio Monterrey, Guadalupe",         realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m65", homeTeam:"Bélgica",          homeCode:"BEL", homeFlag:"🇧🇪", awayTeam:"Irán",               awayCode:"IRN", awayFlag:"🇮🇷", kickoff:"2026-06-21T15:00:00-04:00", group:"Grupo G", stadium:"SoFi Stadium, Inglewood",               realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m66", homeTeam:"Nueva Zelanda",    homeCode:"NZL", homeFlag:"🇳🇿", awayTeam:"Egipto",             awayCode:"EGY", awayFlag:"🇪🇬", kickoff:"2026-06-21T21:00:00-04:00", group:"Grupo G", stadium:"BC Place, Vancouver",                    realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m69", homeTeam:"España",           homeCode:"ESP", homeFlag:"🇪🇸", awayTeam:"Arabia Saudita",     awayCode:"KSA", awayFlag:"🇸🇦", kickoff:"2026-06-21T12:00:00-04:00", group:"Grupo H", stadium:"Mercedes-Benz Stadium, Atlanta",         realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m70", homeTeam:"Uruguay",          homeCode:"URU", homeFlag:"🇺🇾", awayTeam:"Cabo Verde",         awayCode:"CPV", awayFlag:"🇨🇻", kickoff:"2026-06-21T18:00:00-04:00", group:"Grupo H", stadium:"Hard Rock Stadium, Miami",              realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // --- VIERNES 26 JUN (Adicionales Grupo G & H - Jornada 3 Simultáneos) ---
    { id:"m67", homeTeam:"Egipto",           homeCode:"EGY", homeFlag:"🇪🇬", awayTeam:"Irán",               awayCode:"IRN", awayFlag:"🇮🇷", kickoff:"2026-06-26T23:00:00-04:00", group:"Grupo G", stadium:"Lumen Field, Seattle",                   realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m68", homeTeam:"Nueva Zelanda",    homeCode:"NZL", homeFlag:"🇳🇿", awayTeam:"Bélgica",            awayCode:"BEL", awayFlag:"🇧🇪", kickoff:"2026-06-26T23:00:00-04:00", group:"Grupo G", stadium:"BC Place, Vancouver",                    realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m71", homeTeam:"España",           homeCode:"ESP", homeFlag:"🇪🇸", awayTeam:"Uruguay",            awayCode:"URU", awayFlag:"🇺🇾", kickoff:"2026-06-26T20:00:00-04:00", group:"Grupo H", stadium:"Estadio Tres de Marzo, Guadalajara",    realHomeGoals:null, realAwayGoals:null, status:"scheduled" },
    { id:"m72", homeTeam:"Cabo Verde",       homeCode:"CPV", homeFlag:"🇨🇻", awayTeam:"Arabia Saudita",     awayCode:"KSA", awayFlag:"🇸🇦", kickoff:"2026-06-26T20:00:00-04:00", group:"Grupo H", stadium:"NRG Stadium, Houston",                  realHomeGoals:null, realAwayGoals:null, status:"scheduled" },

    // ==============================================
    // FASE DE ELIMINACIÓN DIRECTA
    // ==============================================

    // --- DIECISEISAVOS (Jul 2–5) ---
    { id:"k1",  homeTeam:"1º Grupo A", homeCode:"1A", homeFlag:"❓", awayTeam:"2º Grupo B", awayCode:"2B", awayFlag:"❓", kickoff:"2026-07-02T16:00:00-04:00", group:"Dieciseisavos - Llave 1",  stadium:"MetLife Stadium, East Rutherford",  realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"1A", placeholderAway:"2B" },
    { id:"k2",  homeTeam:"1º Grupo C", homeCode:"1C", homeFlag:"❓", awayTeam:"2º Grupo D", awayCode:"2D", awayFlag:"❓", kickoff:"2026-07-02T19:00:00-04:00", group:"Dieciseisavos - Llave 2",  stadium:"AT&T Stadium, Arlington",           realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"1C", placeholderAway:"2D" },
    { id:"k3",  homeTeam:"1º Grupo E", homeCode:"1E", homeFlag:"❓", awayTeam:"2º Grupo F", awayCode:"2F", awayFlag:"❓", kickoff:"2026-07-03T16:00:00-04:00", group:"Dieciseisavos - Llave 3",  stadium:"Hard Rock Stadium, Miami",          realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"1E", placeholderAway:"2F" },
    { id:"k4",  homeTeam:"1º Grupo G", homeCode:"1G", homeFlag:"❓", awayTeam:"2º Grupo H", awayCode:"2H", awayFlag:"❓", kickoff:"2026-07-03T19:00:00-04:00", group:"Dieciseisavos - Llave 4",  stadium:"Levi's Stadium, Santa Clara",       realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"1G", placeholderAway:"2H" },
    { id:"k5",  homeTeam:"1º Grupo I", homeCode:"1I", homeFlag:"❓", awayTeam:"2º Grupo J", awayCode:"2J", awayFlag:"❓", kickoff:"2026-07-04T16:00:00-04:00", group:"Dieciseisavos - Llave 5",  stadium:"Gillette Stadium, Boston",          realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"1I", placeholderAway:"2J" },
    { id:"k6",  homeTeam:"1º Grupo K", homeCode:"1K", homeFlag:"❓", awayTeam:"2º Grupo L", awayCode:"2L", awayFlag:"❓", kickoff:"2026-07-04T19:00:00-04:00", group:"Dieciseisavos - Llave 6",  stadium:"NRG Stadium, Houston",              realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"1K", placeholderAway:"2L" },
    { id:"k7",  homeTeam:"3º mejor 1", homeCode:"3X", homeFlag:"❓", awayTeam:"3º mejor 2", awayCode:"3Y", awayFlag:"❓", kickoff:"2026-07-05T16:00:00-04:00", group:"Dieciseisavos - Llave 7",  stadium:"SoFi Stadium, Inglewood",           realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"3X", placeholderAway:"3Y" },
    { id:"k8",  homeTeam:"3º mejor 3", homeCode:"3Z", homeFlag:"❓", awayTeam:"3º mejor 4", awayCode:"3W", awayFlag:"❓", kickoff:"2026-07-05T19:00:00-04:00", group:"Dieciseisavos - Llave 8",  stadium:"BC Place, Vancouver",               realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"3Z", placeholderAway:"3W" },

    // --- OCTAVOS (Jul 7–10) ---
    { id:"k9",  homeTeam:"G1 Llave 1", homeCode:"Q1", homeFlag:"❓", awayTeam:"G1 Llave 2", awayCode:"Q2", awayFlag:"❓", kickoff:"2026-07-07T16:00:00-04:00", group:"Octavos - Llave 1", stadium:"MetLife Stadium, East Rutherford",  realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"G-K1", placeholderAway:"G-K2" },
    { id:"k10", homeTeam:"G1 Llave 3", homeCode:"Q3", homeFlag:"❓", awayTeam:"G1 Llave 4", awayCode:"Q4", awayFlag:"❓", kickoff:"2026-07-07T19:00:00-04:00", group:"Octavos - Llave 2", stadium:"AT&T Stadium, Arlington",           realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"G-K3", placeholderAway:"G-K4" },
    { id:"k11", homeTeam:"G1 Llave 5", homeCode:"Q5", homeFlag:"❓", awayTeam:"G1 Llave 6", awayCode:"Q6", awayFlag:"❓", kickoff:"2026-07-08T16:00:00-04:00", group:"Octavos - Llave 3", stadium:"Hard Rock Stadium, Miami",          realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"G-K5", placeholderAway:"G-K6" },
    { id:"k12", homeTeam:"G1 Llave 7", homeCode:"Q7", homeFlag:"❓", awayTeam:"G1 Llave 8", awayCode:"Q8", awayFlag:"❓", kickoff:"2026-07-08T19:00:00-04:00", group:"Octavos - Llave 4", stadium:"Levi's Stadium, Santa Clara",       realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"G-K7", placeholderAway:"G-K8" },

    // --- CUARTOS (Jul 11–14) ---
    { id:"k13", homeTeam:"G2 Llave 1", homeCode:"SF1", homeFlag:"❓", awayTeam:"G2 Llave 2", awayCode:"SF2", awayFlag:"❓", kickoff:"2026-07-11T16:00:00-04:00", group:"Cuartos - Llave 1", stadium:"MetLife Stadium, East Rutherford",  realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"QF1", placeholderAway:"QF2" },
    { id:"k14", homeTeam:"G2 Llave 3", homeCode:"SF3", homeFlag:"❓", awayTeam:"G2 Llave 4", awayCode:"SF4", awayFlag:"❓", kickoff:"2026-07-11T19:00:00-04:00", group:"Cuartos - Llave 2", stadium:"AT&T Stadium, Arlington",           realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"QF3", placeholderAway:"QF4" },
    { id:"k15", homeTeam:"G2 Llave 5", homeCode:"SF5", homeFlag:"❓", awayTeam:"G2 Llave 6", awayCode:"SF6", awayFlag:"❓", kickoff:"2026-07-14T16:00:00-04:00", group:"Cuartos - Llave 3", stadium:"Hard Rock Stadium, Miami",          realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"QF5", placeholderAway:"QF6" },
    { id:"k16", homeTeam:"G2 Llave 7", homeCode:"SF7", homeFlag:"❓", awayTeam:"G2 Llave 8", awayCode:"SF8", awayFlag:"❓", kickoff:"2026-07-14T19:00:00-04:00", group:"Cuartos - Llave 4", stadium:"Levi's Stadium, Santa Clara",       realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"QF7", placeholderAway:"QF8" },

    // --- SEMIFINALES (Jul 15–16) ---
    { id:"k17", homeTeam:"Semi 1",     homeCode:"S1",  homeFlag:"❓", awayTeam:"Semi 2",     awayCode:"S2",  awayFlag:"❓", kickoff:"2026-07-15T18:00:00-04:00", group:"Semifinal 1", stadium:"MetLife Stadium, East Rutherford",  realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"SF1", placeholderAway:"SF2" },
    { id:"k18", homeTeam:"Semi 3",     homeCode:"S3",  homeFlag:"❓", awayTeam:"Semi 4",     awayCode:"S4",  awayFlag:"❓", kickoff:"2026-07-16T18:00:00-04:00", group:"Semifinal 2", stadium:"AT&T Stadium, Arlington",           realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"SF3", placeholderAway:"SF4" },

    // --- TERCER PUESTO (Jul 18) ---
    { id:"k19", homeTeam:"Perdedor SF1",homeCode:"3P1",homeFlag:"❓", awayTeam:"Perdedor SF2",awayCode:"3P2",awayFlag:"❓", kickoff:"2026-07-18T16:00:00-04:00", group:"Tercer Puesto", stadium:"Hard Rock Stadium, Miami",          realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"L-SF1", placeholderAway:"L-SF2" },

    // --- GRAN FINAL (Jul 19) ---
    { id:"k20", homeTeam:"Ganador SF1",homeCode:"F1", homeFlag:"❓", awayTeam:"Ganador SF2",awayCode:"F2", awayFlag:"❓", kickoff:"2026-07-19T14:00:00-04:00", group:"Gran Final", stadium:"MetLife Stadium, East Rutherford",  realHomeGoals:null, realAwayGoals:null, status:"scheduled", isKnockout:true, resolved:false, placeholderHome:"W-SF1", placeholderAway:"W-SF2" }
  ];

  const TEAM_STATS = {
    "Argentina": { participations: 18, titles: 3, bestResult: "Campeón (1978, 1986, 2022)", attack: 93, defense: 89, overview: "La 'Albiceleste' defiende la corona mundial con un plantel repleto de figuras consagradas." },
    "Austria": { participations: 7, titles: 0, bestResult: "Tercer lugar (1954)", attack: 79, defense: 78, overview: "Una selección europea sólida y ordenada tácticamente." },
    "Francia": { participations: 16, titles: 2, bestResult: "Campeón (1998, 2018)", attack: 92, defense: 91, overview: "Los 'Bleus' combinan velocidad física extrema, profundidad letal y gran jerarquía." },
    "Irak": { participations: 1, titles: 0, bestResult: "Fase de grupos (1986)", attack: 70, defense: 68, overview: "La escuadra asiática busca dar la gran sorpresa en el torneo internacional." },
    "Noruega": { participations: 3, titles: 0, bestResult: "Octavos de final (1998)", attack: 84, defense: 77, overview: "Liderados por Erling Haaland en el ataque, buscan ser la gran sorpresa europea." },
    "Senegal": { participations: 3, titles: 0, bestResult: "Cuartos de final (2002)", attack: 81, defense: 82, overview: "Los Leones de la Teranga combinan potencia física y experiencia internacional." },
    "Jordania": { participations: 0, titles: 0, bestResult: "Debutante", attack: 68, defense: 66, overview: "Debutan en el máximo torneo buscando escribir historia en su primera participación." },
    "Argelia": { participations: 4, titles: 0, bestResult: "Octavos de final (2014)", attack: 78, defense: 76, overview: "Selección del norte de África veloz y con un mediocampo altamente dinámico." },
    "Portugal": { participations: 8, titles: 0, bestResult: "Tercer lugar (1966)", attack: 88, defense: 84, overview: "Una constelación de talento ofensivo luso busca coronarse en América." },
    "Uzbekistán": { participations: 0, titles: 0, bestResult: "Debutante", attack: 71, defense: 70, overview: "Debutan en la copa mundial tras un gran proceso clasificatorio en Asia." },
    "Inglaterra": { participations: 16, titles: 1, bestResult: "Campeón (1966)", attack: 90, defense: 88, overview: "La cuna del fútbol llega con un plantel estelar y la presión de llevar la copa a casa." },
    "Ghana": { participations: 4, titles: 0, bestResult: "Cuartos de final (2010)", attack: 77, defense: 75, overview: "Las 'Estrellas Negras' destacan por su potencia física y velocidad en transiciones." },
    "Panamá": { participations: 1, titles: 0, bestResult: "Fase de grupos (2018)", attack: 72, defense: 71, overview: "Los 'Canaleros' regresan al mundial con una plantilla experimentada y unida." },
    "Croacia": { participations: 6, titles: 0, bestResult: "Subcampeón (2018)", attack: 83, defense: 84, overview: "Los balcánicos destacan por su control del mediocampo y resiliencia mental." },
    "Colombia": { participations: 6, titles: 0, bestResult: "Cuartos de final (2014)", attack: 84, defense: 80, overview: "El equipo cafetero destaca por su buen trato de balón y velocidad en bandas." },
    "RD Congo": { participations: 1, titles: 0, bestResult: "Fase de grupos (1974)", attack: 73, defense: 71, overview: "Los 'Leopardos' retornan buscando hacer valer su potencia física africana." },
    "Suiza": { participations: 12, titles: 0, bestResult: "Cuartos de final (1934, 1938, 1954)", attack: 80, defense: 81, overview: "Un equipo altamente ordenado con gran disciplina táctica y solidez." },
    "Canadá": { participations: 2, titles: 0, bestResult: "Fase de grupos (1986, 2022)", attack: 77, defense: 74, overview: "Liderados por Alphonso Davies, buscan hacer valer su localía." },
    "Bosnia y Herzegovina": { participations: 1, titles: 0, bestResult: "Fase de grupos (2014)", attack: 75, defense: 74, overview: "Un conjunto europeo con gran temperamento y excelente juego aéreo." },
    "Catar": { participations: 1, titles: 0, bestResult: "Fase de grupos (2022)", attack: 72, defense: 70, overview: "El campeón de Asia busca consolidar su crecimiento deportivo a nivel mundial." },
    "Marruecos": { participations: 6, titles: 0, bestResult: "Cuarto lugar (2022)", attack: 81, defense: 85, overview: "La revelación de Qatar 2022 busca confirmar su estatus como potencia global." },
    "Haití": { participations: 1, titles: 0, bestResult: "Fase de grupos (1974)", attack: 67, defense: 65, overview: "Los caribeños vuelven a la cita mundialista con mucha ilusión y entrega física." },
    "Escocia": { participations: 8, titles: 0, bestResult: "Fase de grupos", attack: 76, defense: 77, overview: "Una escuadra británica combativa, caracterizada por su entrega y juego físico." },
    "Brasil": { participations: 22, titles: 5, bestResult: "Campeón (1958, 1962, 1970, 1994, 2002)", attack: 94, defense: 87, overview: "La única selección con asistencia perfecta busca su ansiado hexacampeonato." },
    "Sudáfrica": { participations: 3, titles: 0, bestResult: "Fase de grupos (1998, 2002, 2010)", attack: 73, defense: 72, overview: "Los 'Bafana Bafana' regresan motivados a la escena internacional." },
    "Corea del Sur": { participations: 11, titles: 0, bestResult: "Cuarto lugar (2002)", attack: 78, defense: 76, overview: "Un juego dinámico e incansable define a los guerreros coreanos." },
    "Chequia": { participations: 9, titles: 0, bestResult: "Subcampeón (1934, 1962)", attack: 79, defense: 77, overview: "Una selección europea caracterizada por su disciplina e inteligencia táctica." },
    "México": { participations: 17, titles: 0, bestResult: "Cuartos de final (1970, 1986)", attack: 78, defense: 75, overview: "El gigante de la Concacaf busca superar la barrera del quinto partido como local." },
    "Curazao": { participations: 0, titles: 0, bestResult: "Debutante", attack: 70, defense: 69, overview: "La gran sorpresa caribeña del torneo hace su histórica presentación." },
    "Costa de Marfil": { participations: 3, titles: 0, bestResult: "Fase de grupos (2006, 2010, 2014)", attack: 81, defense: 78, overview: "Los elefantes marfileños combinan talento técnico y gran resistencia." },
    "Ecuador": { participations: 4, titles: 0, bestResult: "Octavos de final (2006)", attack: 80, defense: 82, overview: "La Tri destaca por su juventud, gran despliegue físico y orden táctico." },
    "Alemania": { participations: 20, titles: 4, bestResult: "Campeón (1954, 1974, 1990, 2014)", attack: 88, defense: 85, overview: "La 'Mannschaft' representa la eficiencia competitiva buscando su quinta estrella." },
    "Túnez": { participations: 6, titles: 0, bestResult: "Fase de grupos", attack: 74, defense: 76, overview: "Las Águilas de Cartago destacan por su férrea defensa y contragolpe letal." },
    "Países Bajos": { participations: 11, titles: 0, bestResult: "Subcampeón (1974, 1978, 2010)", attack: 87, defense: 89, overview: "La 'Naranja Mecánica' busca al fin coronar su historia con el título mundial." },
    "Japón": { participations: 7, titles: 0, bestResult: "Octavos de final", attack: 82, defense: 81, overview: "Samuráis Azules con transiciones rápidas y gran disciplina táctica." },
    "Suecia": { participations: 12, titles: 0, bestResult: "Subcampeón (1958)", attack: 80, defense: 79, overview: "Conjunto escandinavo de gran talla física y juego aéreo dominante." },
    "Turquía": { participations: 2, titles: 0, bestResult: "Tercer lugar (2002)", attack: 81, defense: 78, overview: "Una escuadra turca caracterizada por su pasión, garra y gran técnica individual." },
    "Estados Unidos": { participations: 11, titles: 0, bestResult: "Tercer lugar (1930)", attack: 83, defense: 80, overview: "Los estadounidenses quieren consolidar su crecimiento en casa." },
    "Paraguay": { participations: 8, titles: 0, bestResult: "Cuartos de final (2010)", attack: 76, defense: 80, overview: "La escuadra guaraní destaca por su garra, juego aéreo y solidez defensiva." },
    "Australia": { participations: 6, titles: 0, bestResult: "Octavos de final (2006, 2022)", attack: 75, defense: 76, overview: "Los 'Socceroos' son incansables, con juego físico y vertical." },
    "Cabo Verde": { participations: 0, titles: 0, bestResult: "Debutante", attack: 71, defense: 70, overview: "Los Tiburones Azules debutan con orgullo representando al fútbol isleño africano." },
    "Arabia Saudita": { participations: 6, titles: 0, bestResult: "Octavos de final (1994)", attack: 73, defense: 71, overview: "Hijos del desierto veloces y tácticos, listos para plantar cara." },
    "Uruguay": { participations: 14, titles: 2, bestResult: "Campeón (1930, 1950)", attack: 85, defense: 86, overview: "La Celeste de Marcelo Bielsa destaca por su presión asfixiante y mística." },
    "España": { participations: 16, titles: 1, bestResult: "Campeón (2010)", attack: 89, defense: 86, overview: "La Roja domina la posesión y desborda por bandas con juventud." },
    "Nueva Zelanda": { participations: 2, titles: 0, bestResult: "Fase de grupos (1982, 2010)", attack: 68, defense: 71, overview: "All Whites buscando repetir la hazaña histórica de Sudáfrica 2010." },
    "Bélgica": { participations: 14, titles: 0, bestResult: "Tercer lugar (2018)", attack: 85, defense: 81, overview: "Los Diablos Rojos combinan talento veterano con jóvenes promesas europeas." },
    "Egipto": { participations: 3, titles: 0, bestResult: "Fase de grupos", attack: 79, defense: 76, overview: "Los faraones buscan avanzar de ronda liderados por su velocidad ofensiva." },
    "Irán": { participations: 6, titles: 0, bestResult: "Fase de grupos", attack: 75, defense: 76, overview: "Un conjunto defensivamente muy disciplinado y letal al contragolpe." }
  };

  // A match is lockable if the current time is less than 15 minutes before kickoff.
  // currentSimulatedTime is a millisecond timestamp representing simulated time.
  function isMatchLocked(match, currentSimulatedTime) {
    const kickoffTime = new Date(match.kickoff).getTime();
    const fifteenMinInMs = 15 * 60 * 1000;
    return (kickoffTime - currentSimulatedTime) <= fifteenMinInMs;
  }

  // Helper to format kickoff dates — always shown in Chile time (America/Santiago)
  function formatMatchTime(kickoffStr) {
    const date = new Date(kickoffStr);
    const lang = localStorage.getItem("wc_lang") || "es";
    const locale = lang === "en" ? "en-US" : "es-ES";
    return date.toLocaleString(locale, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Santiago'
    });
  }

  window.WC_DATA = {
    INITIAL_MATCHES,
    TEAM_STATS,
    isMatchLocked,
    formatMatchTime
  };
})();
