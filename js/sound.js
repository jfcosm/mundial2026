// Web Audio API Retro Sound Synthesizer
(function() {
  let audioCtx = null;
  let isMuted = localStorage.getItem("wc_muted") === "true";

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playTone(freq, duration, type = "sine", gainStart = 0.1) {
    if (isMuted) return;
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(gainStart, audioCtx.currentTime);
    // Exponential decay to 0
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  // SOUND EFFECTS

  // 1. Short retro click
  function playClick() {
    playTone(600, 0.05, "sine", 0.08);
  }

  // 2. Twin-note retro success (coin sound)
  function playSuccess() {
    if (isMuted) return;
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    // Note 1: C5
    playTone(523.25, 0.1, "triangle", 0.12);

    // Note 2: E5 starting 80ms later
    setTimeout(() => {
      playTone(659.25, 0.18, "triangle", 0.12);
    }, 80);
  }

  // 3. Low warning buzz (error/locked)
  function playError() {
    playTone(130, 0.25, "sawtooth", 0.08);
  }

  // 4. Quick rising arpeggio (level up / prediction saved)
  function playLevelUp() {
    if (isMuted) return;
    initAudio();
    if (!audioCtx) return;

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
    notes.forEach((freq, index) => {
      setTimeout(() => {
        playTone(freq, 0.12, "sine", 0.08);
      }, index * 60);
    });
  }

  // Toggle mute state
  function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem("wc_muted", isMuted.toString());
    return isMuted;
  }

  function getMutedState() {
    return isMuted;
  }

  window.WC_SOUND = {
    initAudio,
    playClick,
    playSuccess,
    playError,
    playLevelUp,
    toggleMute,
    getMutedState
  };
})();
