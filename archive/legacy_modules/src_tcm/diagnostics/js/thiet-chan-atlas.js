/**
 * THIET CHAN ATLAS CONTROLLER - CliniPortal YHCT Module
 * SVG Tongue Renderer, Zone Interactivity & Quiz Challenge Engine
 */

document.addEventListener("DOMContentLoaded", function () {
  const tongueSVG = document.getElementById("tongueSVG");
  const detailPanel = document.getElementById("tcDetailPanel");
  const colorBtns = document.querySelectorAll(".btn-tc-color");
  const coatBtns = document.querySelectorAll(".btn-tc-coat");
  const shapeBtns = document.querySelectorAll(".btn-tc-shape");

  if (!tongueSVG || typeof THIET_CHAN_DATA === "undefined") return;

  let activeZone = "tip";
  let activeColor = "binh-thuong";
  let activeCoat = "trang-mong";
  let activeShape = "normal";

  // SVG Render Function
  function renderTongueSVG() {
    const curColor = THIET_CHAN_DATA.colors.find(c => c.id === activeColor) || THIET_CHAN_DATA.colors[0];
    const curCoat = THIET_CHAN_DATA.coats.find(c => c.id === activeCoat) || THIET_CHAN_DATA.coats[0];

    // Build SVG paths for Tongue
    tongueSVG.innerHTML = `
      <defs>
        <!-- Filter for tongue texture -->
        <filter id="coatTexture">
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise"/>
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0"/>
          <feComposite in2="SourceGraphic" in="noise" operator="in"/>
        </filter>
      </defs>

      <!-- SVG Main Tongue Body Container -->
      <g id="tongueMainGroup">
        <!-- Root Zone (Gốc Lưỡi) -->
        <path class="tongue-zone ${activeZone === 'root' ? 'active-zone' : ''}" id="zone-root"
          d="M 60 110 C 60 40, 240 40, 240 110 L 220 160 L 80 160 Z"
          fill="${curColor.hex}" opacity="0.9" />

        <!-- Sides Zone (Hai bên mép lưỡi) -->
        <path class="tongue-zone ${activeZone === 'sides' ? 'active-zone' : ''}" id="zone-sides"
          d="M 60 110 L 80 160 L 80 260 L 50 200 C 45 160, 50 130, 60 110 Z M 240 110 L 220 160 L 220 260 L 250 200 C 255 160, 250 130, 240 110 Z"
          fill="${curColor.hex}" opacity="0.95" />

        <!-- Center Zone (Giữa lưỡi) -->
        <path class="tongue-zone ${activeZone === 'center' ? 'active-zone' : ''}" id="zone-center"
          d="M 80 160 L 220 160 L 220 260 L 80 260 Z"
          fill="${curColor.hex}" />

        <!-- Tip Zone (Đầu lưỡi) -->
        <path class="tongue-zone ${activeZone === 'tip' ? 'active-zone' : ''}" id="zone-tip"
          d="M 80 260 L 220 260 L 210 300 C 180 350, 120 350, 90 300 Z"
          fill="${curColor.hex}" />

        <!-- Coating Overlay Layer -->
        <path d="M 80 120 C 90 70, 210 70, 220 120 L 200 250 L 100 250 Z"
          fill="${curCoat.hex}" opacity="${activeCoat === 'boc' ? 0.3 : 0.65}" style="pointer-events:none;" />

        <!-- Toothmarks Overlay (if Phù To) -->
        ${activeShape === 'phu-to' ? `
          <path d="M 46 140 Q 56 145 48 155 Q 58 160 50 170 M 254 140 Q 244 145 252 155 Q 242 160 250 170"
            stroke="#b91c1c" stroke-width="3" fill="none" style="pointer-events:none;" />
        ` : ''}

        <!-- Fissure/Cracks Overlay (if Nứt Nẻ) -->
        ${activeShape === 'nut-ne' ? `
          <path d="M 150 140 L 150 280 M 120 180 L 180 180 M 130 230 L 170 230"
            stroke="#991b1b" stroke-width="2" stroke-dasharray="3 2" fill="none" style="pointer-events:none;" />
        ` : ''}

        <!-- Zone Labels -->
        <text x="150" y="90" text-anchor="middle" font-size="11" font-weight="700" fill="#fff" style="pointer-events:none;">GỐC LƯỠI (Thận)</text>
        <text x="150" y="210" text-anchor="middle" font-size="11" font-weight="700" fill="#fff" style="pointer-events:none;">GIỮA LƯỠI (Tỳ Vị)</text>
        <text x="150" y="295" text-anchor="middle" font-size="11" font-weight="700" fill="#fff" style="pointer-events:none;">ĐẦU LƯỠI (Tâm Phế)</text>
        <text x="62" y="190" text-anchor="middle" font-size="10" font-weight="700" fill="#fff" style="pointer-events:none;" transform="rotate(-90,62,190)">MEP LƯỠI (Can)</text>
      </g>
    `;

    // Attach Click events to Zones
    document.getElementById("zone-tip").addEventListener("click", () => selectZone("tip"));
    document.getElementById("zone-center").addEventListener("click", () => selectZone("center"));
    document.getElementById("zone-sides").addEventListener("click", () => selectZone("sides"));
    document.getElementById("zone-root").addEventListener("click", () => selectZone("root"));
  }

  // Select Zone & Render Details
  function selectZone(zoneId) {
    activeZone = zoneId;
    renderTongueSVG();

    const zData = THIET_CHAN_DATA.zones[zoneId];
    const cData = THIET_CHAN_DATA.colors.find(c => c.id === activeColor) || THIET_CHAN_DATA.colors[0];
    const coatData = THIET_CHAN_DATA.coats.find(c => c.id === activeCoat) || THIET_CHAN_DATA.coats[0];
    const shapeData = THIET_CHAN_DATA.shapes.find(s => s.id === activeShape);

    detailPanel.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid var(--color-surface-offset); padding-bottom:0.75rem;">
        <h3 style="margin:0; font-size:var(--text-lg); font-weight:700; color:var(--color-text);">
          <i class="fa-solid fa-bullseye" style="color:var(--color-tcm-green);"></i> Vùng ${zData.name}
        </h3>
        <span class="element-badge-lg" style="background:var(--color-tcm-green);">${zData.organs}</span>
      </div>

      <p style="font-size:var(--text-xs); color:var(--color-text-muted); margin:0; line-height:1.5;">
        ${zData.desc}
      </p>

      <!-- Active Combination Diagnosis Box -->
      <div style="background:var(--color-surface-offset); border:1px solid var(--color-divider); border-radius:var(--radius-md); padding:1rem; font-size:var(--text-xs); display:flex; flex-direction:column; gap:0.5rem;">
        <div style="font-weight:700; color:var(--color-text);">🔍 TỔNG HỢP CHẨN ĐOÁN HÌNH THÁI DỰA TRÊN THUỘC TÍNH ĐANG CHỌN:</div>
        <div>• <strong>Chất Lưỡi (${cData.name}):</strong> <span style="color:var(--color-danger);">${cData.meaning}</span></div>
        <div>• <strong>Rêu Lưỡi (${coatData.name}):</strong> <span style="color:var(--color-warning);">${coatData.meaning}</span></div>
        ${shapeData ? `<div>• <strong>Hình Thể (${shapeData.name}):</strong> <span>${shapeData.meaning}</span></div>` : ""}
      </div>

      <!-- Zone Specific Pathologies -->
      <div style="margin-top:0.5rem;">
        <h4 style="margin:0 0 0.5rem 0; font-size:var(--text-xs); font-weight:700; color:var(--color-text);">
          ⚠️ Các dấu hiệu bệnh lý đại biểu tại ${zData.name}:
        </h4>
        <div style="display:flex; flex-direction:column; gap:0.4rem;">
          ${zData.pathologies.map(p => `
            <div style="background:var(--color-surface-2); border:1px solid var(--color-divider); padding:0.5rem 0.85rem; border-radius:var(--radius-sm); font-size:var(--text-xs);">
              <strong style="color:var(--color-tcm-red);">• ${p.condition}:</strong>
              <div style="color:var(--color-text-muted); margin-top:2px;">${p.meaning}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  // Button Listeners for Selectors
  colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      colorBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeColor = btn.getAttribute("data-color");
      selectZone(activeZone);
    });
  });

  coatBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      coatBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCoat = btn.getAttribute("data-coat");
      selectZone(activeZone);
    });
  });

  shapeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      shapeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeShape = btn.getAttribute("data-shape");
      selectZone(activeZone);
    });
  });

  // Quiz Challenge Controller
  let quizIndex = 0;
  let quizScore = 0;

  window.initQuizChallenge = function () {
    quizIndex = 0;
    quizScore = 0;
    renderQuizQuestion();
  };

  function renderQuizQuestion() {
    const q = THIET_CHAN_DATA.quiz[quizIndex];
    const quizBox = document.getElementById("tcQuizBox");
    if (!quizBox || !q) return;

    quizBox.innerHTML = `
      <div class="tc-quiz-card">
        <div class="tc-quiz-header">
          <span style="font-size:var(--text-xs); font-weight:700; color:var(--color-tcm-green);">
            🧠 THỬ THÁCH THIỆT CHẨN — CÂU ${quizIndex + 1}/${THIET_CHAN_DATA.quiz.length}
          </span>
          <span style="font-size:var(--text-xs); font-weight:700; color:var(--color-text-muted);">
            Điểm: ${quizScore}/${quizIndex}
          </span>
        </div>

        <div class="tc-quiz-question">${q.question}</div>

        <div class="tc-quiz-options">
          ${q.options.map((opt, idx) => `
            <button class="tc-quiz-opt-btn" onclick="submitQuizAnswer(${idx})">
              ${String.fromCharCode(65 + idx)}. ${opt}
            </button>
          `).join("")}
        </div>

        <div id="quizFeedbackBox"></div>
      </div>
    `;
  }

  window.submitQuizAnswer = function (optIdx) {
    const q = THIET_CHAN_DATA.quiz[quizIndex];
    const feedbackBox = document.getElementById("quizFeedbackBox");
    const btns = document.querySelectorAll(".tc-quiz-opt-btn");

    btns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) btn.classList.add("correct");
      if (idx === optIdx && idx !== q.correct) btn.classList.add("wrong");
    });

    if (optIdx === q.correct) {
      quizScore++;
      feedbackBox.innerHTML = `
        <div class="tc-quiz-feedback" style="background:var(--color-success-hl); color:var(--color-success); border:1px solid var(--color-success);">
          <strong>🎉 CHÍNH XÁC!</strong> ${q.explanation}
        </div>
      `;
    } else {
      feedbackBox.innerHTML = `
        <div class="tc-quiz-feedback" style="background:var(--color-danger-hl); color:var(--color-danger); border:1px solid var(--color-danger);">
          <strong>❌ CHƯA ĐÚNG!</strong> Đáp án đúng là <strong>${String.fromCharCode(65 + q.correct)}. ${q.options[q.correct]}</strong>.<br>${q.explanation}
        </div>
      `;
    }

    // Add Next Button
    const nextBtn = document.createElement("button");
    nextBtn.className = "mode-btn active";
    nextBtn.style.marginTop = "1rem";
    nextBtn.style.width = "100%";
    nextBtn.style.justifyContent = "center";
    nextBtn.innerText = quizIndex < THIET_CHAN_DATA.quiz.length - 1 ? "Câu hỏi tiếp theo ➔" : "Xem kết quả thử thách 🏆";
    nextBtn.onclick = () => {
      quizIndex++;
      if (quizIndex < THIET_CHAN_DATA.quiz.length) {
        renderQuizQuestion();
      } else {
        showQuizResults();
      }
    };
    feedbackBox.appendChild(nextBtn);
  };

  function showQuizResults() {
    const quizBox = document.getElementById("tcQuizBox");
    quizBox.innerHTML = `
      <div class="tc-quiz-card" style="text-align:center;">
        <h3 style="margin:0 0 0.5rem 0; color:var(--color-tcm-green);">🏆 HOÀN THÀNH BÀI THỬ THÁCH THIỆT CHẨN!</h3>
        <p style="font-size:var(--text-sm); color:var(--color-text-muted);">
          Bạn đã trả lời đúng <strong>${quizScore}/${THIET_CHAN_DATA.quiz.length}</strong> câu hỏi.
        </p>
        <button class="mode-btn active" onclick="initQuizChallenge()" style="margin:1rem auto 0 auto; justify-content:center;">
          <i class="fa-solid fa-rotate-right"></i> Làm lại thử thách
        </button>
      </div>
    `;
  }

  // Initialize
  renderTongueSVG();
  selectZone("tip");
});
