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

    addLog("Consola del Servidor iniciada. El Oráculo del Mundial 2026.", "system");
    
    setTimeout(() => {
      addLog(`Fecha y Hora actual del sistema (Sincronizado): ${new Date(window.WC_STORAGE.getSimulatedTime()).toLocaleString('es-ES')}`, "normal");
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
    const formattedTime = new Date(simTime).toLocaleString('es-ES', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    // Update Header HUD
    if (isTestActive) {
      currentSimulatedTimeHud.innerHTML = `<span style="color: var(--color-neon-yellow); margin-right: 0.25rem;">🛠️ TEST:</span> ${formattedTime}`;
    } else {
      currentSimulatedTimeHud.innerHTML = `<span style="color: var(--color-neon-green); text-shadow: 0 0 8px var(--color-neon-green); margin-right: 0.25rem;">🔴 EN VIVO:</span> ${formattedTime}`;
    }
    
    // Update Admin Time display
    if (isTestActive) {
      adminTimeDisplay.innerText = formattedTime;
      adminTimeDisplay.style.color = "var(--color-neon-yellow)";
      adminTimeDisplay.style.borderColor = "#222";
    } else {
      adminTimeDisplay.innerText = "Sincronizado con Reloj Real";
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
      document.getElementById("user-header-score").innerText = `${userStats.points} Pts`;
      
      // Update Dashboard HUD stats
      document.getElementById("dashboard-hud-score").innerText = `${userStats.points} Pts`;
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

    // Populate Sidebar elements
    const matches = window.WC_STORAGE.getMatches();
    const activeMatchWithTeam = matches.find(m => m.homeTeam === teamName || m.awayTeam === teamName);
    const flag = activeMatchWithTeam ? (activeMatchWithTeam.homeTeam === teamName ? activeMatchWithTeam.homeFlag : activeMatchWithTeam.awayFlag) : "🏳️";

    teamSidebarFlag.innerText = flag;
    teamSidebarName.innerText = teamName;
    teamSidebarOverview.innerText = stats.overview;

    teamStatParticipations.innerText = stats.participations;
    teamStatTitles.innerText = stats.titles > 0 ? `${stats.titles} 🏆` : "0";
    teamStatBest.innerText = stats.bestResult;

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
        <span class="mini-user-points">${user.points} pts</span>
      `;
      miniLeaderboardContainer.appendChild(row);
    });
  }

  // RENDER: MATCHES DASHBOARD
  function renderDashboard() {
    const matches = window.WC_STORAGE.getMatches();
    const predictions = window.WC_STORAGE.getPredictions();
    const simTime = window.WC_STORAGE.getSimulatedTime();

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
          <p style="color: var(--color-text-muted);">No hay partidos en esta categoría para mostrar.</p>
        </div>
      `;
      return;
    }

    filteredMatches.forEach(match => {
      const isLocked = window.WC_DATA.isMatchLocked(match, simTime);
      const predKey = `${currentUser.username}_${match.id}`;
      const userPred = predictions[predKey] || { homeGoals: "", awayGoals: "" };
      
      const card = document.createElement("div");
      card.className = `glass-panel match-card`;

      // Header row
      const isMatchFinished = match.realHomeGoals !== null && match.realAwayGoals !== null;
      let lockHtml = "";
      if (isMatchFinished) {
        lockHtml = `<span class="match-lock-status locked">🏁 Finalizado</span>`;
      } else if (isLocked) {
        lockHtml = `<span class="match-lock-status locked">🔒 Cerrado</span>`;
      } else {
        const lockTime = new Date(match.kickoff).getTime() - 60 * 60 * 1000;
        const diffMs = lockTime - simTime;
        const hours = Math.floor(diffMs / (3600 * 1000));
        const minutes = Math.floor((diffMs % (3600 * 1000)) / (60 * 1000));
        lockHtml = `<span class="match-lock-status open" title="Pronósticos cierran 1h antes del partido">🔓 Cierra en: ${hours}h ${minutes}m</span>`;
      }

      // Prediction and scoring math displays
      let pointsBadgeHtml = "";
      if (isMatchFinished) {
        const result = window.WC_STORAGE.calculateMatchPoints(userPred, match);
        let badgeClass = "zero";
        let scoreText = `${result.points} PTS`;

        if (result.type === "exact") badgeClass = "exact";
        else if (result.type === "difference" || result.type === "team_goals") badgeClass = "close";
        else if (result.type === "outcome") badgeClass = "outcome";

        pointsBadgeHtml = `
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem;">
            <span class="points-badge-earned ${badgeClass}">${scoreText}</span>
            <span style="font-size: 0.6rem; color: var(--color-text-muted); text-align: right;">${result.description}</span>
          </div>
        `;
      }

      // Home and Away Score Value placeholders
      const inputDisabledAttr = (isLocked || isMatchFinished) ? "disabled" : "";

      card.innerHTML = `
        <div class="match-card-header">
          <span class="match-group">${match.group}</span>
          <span>${window.WC_DATA.formatMatchTime(match.kickoff)}</span>
          ${lockHtml}
        </div>
        
        <div class="match-teams-vs">
          <!-- Home Team Row (Clickable for Stats) -->
          <div class="team-row">
            <div class="team-info" data-team="${match.homeTeam}" title="Ver estadísticas de ${match.homeTeam}">
              <span class="team-flag" aria-hidden="true">${match.homeFlag}</span>
              <span class="team-name" title="${match.homeTeam}">${match.homeTeam}</span>
              <span class="team-code">${match.homeCode}</span>
            </div>
            
            <div class="scoreboard-score-inputs">
              <input type="text" inputmode="numeric" pattern="[0-9]*" class="score-input-box" 
                     id="pred-home-${match.id}" value="${userPred.homeGoals}" ${inputDisabledAttr}
                     aria-label="Goles de ${match.homeTeam}" maxlength="2">
              <span class="score-separator">:</span>
              <input type="text" inputmode="numeric" pattern="[0-9]*" class="score-input-box" 
                     id="pred-away-${match.id}" value="${userPred.awayGoals}" ${inputDisabledAttr}
                     aria-label="Goles de ${match.awayTeam}" maxlength="2">
            </div>
          </div>

          <!-- Away Team Row (Clickable for Stats) -->
          <div class="team-row" style="margin-top: 0.25rem;">
            <div class="team-info" data-team="${match.awayTeam}" title="Ver estadísticas de ${match.awayTeam}">
              <span class="team-flag" aria-hidden="true">${match.awayFlag}</span>
              <span class="team-name" title="${match.awayTeam}">${match.awayTeam}</span>
              <span class="team-code">${match.awayCode}</span>
            </div>
          </div>
        </div>

        <div class="match-card-footer">
          <div class="match-venue">
            <span aria-hidden="true">📍</span> <span>${match.stadium}</span>
          </div>
          
          <div class="match-action-row">
            <div>
              ${isMatchFinished ? `<div class="actual-score-tag">Real: ${match.realHomeGoals} - ${match.realAwayGoals}</div>` : ''}
            </div>
            <div>
              ${pointsBadgeHtml}
              ${(!isLocked && !isMatchFinished) ? `
                <button class="btn-save-prediction" id="btn-save-${match.id}" type="button">
                  Guardar
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
            showToast("Por favor ingresa ambos marcadores.", "error");
            return;
          }

          if (isNaN(homeVal) || isNaN(awayVal)) {
            window.WC_SOUND.playError();
            showToast("Goles deben ser numéricos.", "error");
            return;
          }

          // Save prediction to Firestore
          window.WC_STORAGE.savePrediction(currentUser.username, match.id, homeVal, awayVal)
            .then(() => {
              window.WC_SOUND.playSuccess();
              showToast(`¡Pronóstico guardado para ${match.homeTeam} vs ${match.awayTeam}!`);
              addLog(`${currentUser.username} pronosticó: ${match.homeTeam} ${homeVal} - ${awayVal} ${match.awayTeam}`, "success");
            })
            .catch(err => {
              window.WC_SOUND.playError();
              showToast("Error al guardar pronóstico en la base de datos.", "error");
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
      if (index === 0) rankText = `<span class="rank-icon" title="Oro">🏆</span>`;
      else if (index === 1) rankText = `<span class="rank-icon" title="Plata">🥈</span>`;
      else if (index === 2) rankText = `<span class="rank-icon" title="Bronce">🥉</span>`;

      // Level description
      const level = getRankDetails(user.points);

      row.innerHTML = `
        <td class="text-center rank-col">${rankText}</td>
        <td>
          <div class="user-col">
            <span class="user-col-avatar" aria-hidden="true">${user.avatar}</span>
            <div>
              <span class="user-col-name">${user.username}</span>
              ${user.isAdmin ? '<span class="user-badge-level" style="background: rgba(255,255,255,0.1); margin-left:0.25rem;">ADMIN</span>' : ''}
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
        <td class="text-center points-col">${user.points} pts</td>
      `;
      leaderboardBody.appendChild(row);
    });
  }

  // RENDER: ADMIN SIMULATOR
  function renderAdmin() {
    const isTestActive = window.WC_CACHE.testModeActive;
    
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

      let actionHtml = "";
      if (isFinished) {
        actionHtml = `<span class="admin-status-lbl text-glow-green">Simulado (${match.realHomeGoals}-${match.realAwayGoals})</span>`;
      } else {
        const lockoutWarning = isLocked ? '<span style="color:var(--color-neon-magenta); font-size:0.6rem; display:block;">🔒 Bloqueado</span>' : '';
        actionHtml = `
          <div style="text-align: right;">
            ${lockoutWarning}
            <button class="btn-finish-match mt-1" id="btn-admin-finish-${match.id}" type="button">
              Finalizar
            </button>
          </div>
        `;
      }

      row.innerHTML = `
        <div class="admin-match-row-details" style="flex: 1;">
          <div class="admin-match-teams">
            <span>${match.homeFlag} ${match.homeTeam}</span>
            <span style="color: var(--color-text-muted);"> vs </span>
            <span>${match.awayFlag} ${match.awayTeam}</span>
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
                showToast(`Partido finalizado: ${match.homeTeam} ${hVal} - ${aVal} ${match.awayTeam}`);
                addLog(`Simulado partido: ${match.homeTeam} ${hVal} - ${aVal} ${match.awayTeam}. Calculando puntos...`, "success");

                // Print points updates to log
                const predictions = window.WC_STORAGE.getPredictions();
                const leaderboard = window.WC_STORAGE.calculateLeaderboard();
                leaderboard.forEach(user => {
                  const uPred = predictions[`${user.username}_${match.id}`];
                  if (uPred) {
                    const ptsResult = window.WC_STORAGE.calculateMatchPoints(uPred, match);
                    if (ptsResult.points > 0) {
                      addLog(` -> ${user.username} gana ${ptsResult.points} pts (${ptsResult.description}) con pronóstico [${uPred.homeGoals}-${uPred.awayGoals}]`, "normal");
                    }
                  }
                });

                renderAll();
              })
              .catch(err => {
                window.WC_SOUND.playError();
                showToast("Error al simular partido en la base de datos.", "error");
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
      showToast("Sesión cerrada.", "error");
    });

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
            showToast("Modo Simulación activado.");
            addLog("Modo de Simulación y Pruebas habilitado por el Administrador.", "system");
          } else {
            window.WC_SOUND.playError();
            showToast("Modo Producción (Hora Real) activado.");
            addLog("Modo de Producción (Hora Real en Vivo) habilitado. Controles de tiempo desactivados.", "system");
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
          addLog(`Máquina del Tiempo ajustada a: ${new Date(nextTime).toLocaleString('es-ES')}`, "system");
          showToast("Tiempo simulado actualizado.");
          renderAll();
        })
        .catch(err => {
          window.WC_SOUND.playError();
          showToast("Error al actualizar fecha en la base de datos.", "error");
          console.error("Time machine save error: ", err);
        });
    }

    // Reset Database button
    document.getElementById("btn-reset-database").onclick = () => {
      if (confirm("¿Seguro que deseas restaurar la base de datos a sus valores por defecto en Firebase? Se borrarán cuentas nuevas y resultados simulados.")) {
        window.WC_SOUND.playError();
        
        window.WC_STORAGE.resetAllData()
          .then(() => {
            sessionStorage.removeItem("wc_active_user");
            currentUser = null;
            activeTab = "screen-dashboard";
            
            addLog("Base de datos de Firebase reiniciada a valores iniciales por defecto.", "system");
            showToast("Base de datos de Firebase restaurada.");
            renderAll();
          })
          .catch(err => {
            window.WC_SOUND.playError();
            showToast("Error al restaurar base de datos en Firebase.", "error");
            console.error("Firebase reset error: ", err);
          });
      }
    };

    // Form Submissions (Modified to use Firebase Auth + Firestore)
    formLogin.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById("login-username").value.trim();
      const pass = document.getElementById("login-password").value.trim();

      // Sign in via Firebase Auth using mock email
      window.auth.signInWithEmailAndPassword(name.toLowerCase() + '@oraculo2026.com', pass)
        .then(() => {
          // Retrieve matching Firestore user document
          return window.db.collection("users").doc(name).get();
        })
        .then(doc => {
          if (doc.exists) {
            currentUser = doc.data();
            sessionStorage.setItem("wc_active_user", JSON.stringify(currentUser));
            
            window.WC_SOUND.playSuccess();
            showToast(`¡Bienvenido de nuevo, ${currentUser.username}!`);
            addLog(`Usuario ingresado: ${currentUser.username}`);
            
            renderAll();
          } else {
            window.WC_SOUND.playError();
            showToast("Perfil de usuario no encontrado.", "error");
          }
        })
        .catch(err => {
          window.WC_SOUND.playError();
          showToast("Usuario o contraseña incorrectos.", "error");
          console.error("Auth login error: ", err);
        });
    };

    formSignup.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById("signup-username").value.trim();
      const pass = document.getElementById("signup-password").value.trim();
      const phoneVal = document.getElementById("signup-phone").value.trim();

      if (name.length < 3) {
        window.WC_SOUND.playError();
        showToast("El usuario debe tener al menos 3 letras.", "error");
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
          showToast(`¡Cuenta creada con éxito! Bienvenido ${name}`);
          addLog(`Nueva cuenta registrada: ${name} (avatar: ${selectedSignupAvatar})`, "success");

          // Reset signup form inputs
          formSignup.reset();
          initSignupAvatars();

          renderAll();
        })
        .catch(err => {
          window.WC_SOUND.playError();
          if (err.message === "username_taken") {
            showToast("Ese nombre de usuario ya está tomado.", "error");
          } else {
            showToast("Error al crear cuenta. Revisa tus datos.", "error");
            console.error("Auth signup error: ", err);
          }
        });
    };
  }

  // Start the application
  window.addEventListener("DOMContentLoaded", init);
})();
