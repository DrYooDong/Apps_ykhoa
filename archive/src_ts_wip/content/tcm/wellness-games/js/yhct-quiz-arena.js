/**
 * YHCT QUIZ ARENA CONTROLLER - CliniPortal YHCT Module
 * Gamified Learning Loop, Timer, Web Audio Synth, Streak Multiplier & Local Highscore
 */

document.addEventListener("DOMContentLoaded", function () {
  const modeGrid = document.getElementById("arenaModeGrid");
  const stageBox = document.getElementById("arenaStageBox");
  const hudScore = document.getElementById("hudScore");
  const hudStreak = document.getElementById("hudStreak");
  const hudTimer = document.getElementById("hudTimer");

  if (!stageBox || typeof YHCT_QUIZ_DATA === "undefined") return;

  let activeMode = "thiet_chan";
  let score = 0;
  let streak = 0;
  let qIndex = 0;
  let timerVal = 15;
  let timerInterval = null;
  let questionsList = [];

  // Web Audio Synth for sound effects (No external MP3 files needed!)
  function playTone(freq, type = "sine", duration = 0.15) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio fallback
    }
  }

  // Render Arena Mode Cards
  function renderModes() {
    if (!modeGrid) return;
    modeGrid.innerHTML = YHCT_QUIZ_DATA.modes.map(m => `
      <div class="arena-mode-card ${m.id === activeMode ? 'active' : ''}" data-id="${m.id}">
        <div class="arena-mode-icon">${m.icon}</div>
        <div class="arena-mode-title">${m.name}</div>
        <div class="arena-mode-desc">${m.desc}</div>
      </div>
    `).join("");

    document.querySelectorAll(".arena-mode-card").forEach(card => {
      card.addEventListener("click", () => {
        document.querySelectorAll(".arena-mode-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        startArenaMode(card.getAttribute("data-id"));
      });
    });
  }

  // Start Arena Mode
  function startArenaMode(modeId) {
    activeMode = modeId;
    score = 0;
    streak = 0;
    qIndex = 0;
    updateHUD();

    questionsList = YHCT_QUIZ_DATA.questions[modeId] || [];
    if (questionsList.length === 0) return;

    renderCurrentQuestion();
  }

  function updateHUD() {
    if (hudScore) hudScore.innerText = score;
    if (hudStreak) hudStreak.innerText = `🔥 ${streak}x`;
    if (hudTimer) hudTimer.innerText = `${timerVal}s`;
  }

  // Timer Loop
  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerVal = 15;
    updateHUD();

    timerInterval = setInterval(() => {
      timerVal--;
      updateHUD();
      if (timerVal <= 0) {
        clearInterval(timerInterval);
        handleTimeOut();
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
  }

  // Render Current Question
  function renderCurrentQuestion() {
    const q = questionsList[qIndex];
    if (!q) {
      showArenaSummary();
      return;
    }

    startTimer();

    stageBox.innerHTML = `
      <div class="arena-stage-card">
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:var(--text-xs); color:var(--color-tcm-green); font-weight:700;">
          <span>CÂU HỎI ${qIndex + 1} / ${questionsList.length}</span>
          <span>Hệ số Combo: 🔥 ${Math.max(1, streak)}x</span>
        </div>

        <div class="arena-q-text">${q.q}</div>

        <div class="arena-opts-grid">
          ${q.options.map((opt, idx) => `
            <button class="arena-opt-btn" onclick="submitArenaAnswer(${idx})">
              <span>${String.fromCharCode(65 + idx)}. ${opt}</span>
              <i class="fa-solid fa-chevron-right" style="opacity:0.5; font-size:12px;"></i>
            </button>
          `).join("")}
        </div>

        <div id="arenaFeedback"></div>
      </div>
    `;
  }

  // Handle Timeout
  function handleTimeOut() {
    playTone(200, "sawtooth", 0.3);
    streak = 0;
    updateHUD();

    const q = questionsList[qIndex];
    const feedbackBox = document.getElementById("arenaFeedback");
    const btns = document.querySelectorAll(".arena-opt-btn");

    btns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.answer) btn.classList.add("correct");
    });

    if (feedbackBox) {
      feedbackBox.innerHTML = `
        <div class="arena-explanation-box" style="border-color:var(--color-danger); color:var(--color-danger);">
          <strong>⏰ HẾT GIỜ!</strong> Đáp án đúng là <strong>${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}</strong>.<br>${q.explanation}
        </div>
      `;
      appendNextButton(feedbackBox);
    }
  }

  // Submit Answer
  window.submitArenaAnswer = function (optIdx) {
    stopTimer();
    const q = questionsList[qIndex];
    const feedbackBox = document.getElementById("arenaFeedback");
    const btns = document.querySelectorAll(".arena-opt-btn");

    btns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.answer) btn.classList.add("correct");
      if (idx === optIdx && idx !== q.answer) btn.classList.add("wrong");
    });

    if (optIdx === q.answer) {
      playTone(587.33, "sine", 0.2); // D5 success tone
      streak++;
      const gained = 100 * Math.max(1, streak);
      score += gained;
      updateHUD();

      feedbackBox.innerHTML = `
        <div class="arena-explanation-box" style="border-color:var(--color-success); color:var(--color-success);">
          <strong>🎉 CHÍNH XÁC! (+${gained} điểm)</strong><br>${q.explanation}
        </div>
      `;
    } else {
      playTone(220, "sawtooth", 0.25); // A3 fail tone
      streak = 0;
      updateHUD();

      feedbackBox.innerHTML = `
        <div class="arena-explanation-box" style="border-color:var(--color-danger); color:var(--color-danger);">
          <strong>❌ RẤT TIẾC!</strong> Đáp án đúng là <strong>${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}</strong>.<br>${q.explanation}
        </div>
      `;
    }

    appendNextButton(feedbackBox);
  };

  function appendNextButton(container) {
    const btn = document.createElement("button");
    btn.className = "mode-btn active";
    btn.style.marginTop = "1rem";
    btn.style.width = "100%";
    btn.style.justifyContent = "center";
    btn.innerText = qIndex < questionsList.length - 1 ? "Câu tiếp theo ➔" : "Xem kết quả Đấu trường 🏆";
    btn.onclick = () => {
      qIndex++;
      if (qIndex < questionsList.length) {
        renderCurrentQuestion();
      } else {
        showArenaSummary();
      }
    };
    container.appendChild(btn);
  }

  // Summary Page
  function showArenaSummary() {
    stopTimer();

    let rankBadge = "Tân Thủ Đấu Trường 🔰";
    if (score >= 1000) rankBadge = "Đại Thần Y Đấu Trường 🏆";
    else if (score >= 600) rankBadge = "Y Sư Đông Y 🌟";
    else if (score >= 300) rankBadge = "Cao Thủ Đấu Trường 🥇";

    // Save Highscore to localStorage
    const savedBest = parseInt(localStorage.getItem(`yhct_high_${activeMode}`) || "0");
    if (score > savedBest) {
      localStorage.setItem(`yhct_high_${activeMode}`, score.toString());
    }

    stageBox.innerHTML = `
      <div class="arena-stage-card" style="text-align:center;">
        <h2 style="margin:0; color:var(--color-tcm-green);">🏆 KẾT QUẢ ĐẤU TRƯỜNG YHCT</h2>
        <div style="font-size:2rem; font-weight:700; color:var(--color-text); margin:0.5rem 0;">${score} ĐIỂM</div>
        <div style="font-size:var(--text-sm); font-weight:700; color:var(--color-tcm-gold); margin-bottom:1rem;">Danh hiệu: ${rankBadge}</div>

        <p style="font-size:var(--text-xs); color:var(--color-text-muted);">
          Kỷ lục cao nhất của bạn ở chế độ này: <strong>${Math.max(score, savedBest)} điểm</strong>
        </p>

        <button class="mode-btn active" onclick="startArenaMode('${activeMode}')" style="margin:1rem auto 0 auto; justify-content:center;">
          <i class="fa-solid fa-rotate-right"></i> Thách đấu lại
        </button>
      </div>
    `;
  }

  // Initialize
  renderModes();
  startArenaMode("thiet_chan");

  window.startArenaMode = startArenaMode;
});
