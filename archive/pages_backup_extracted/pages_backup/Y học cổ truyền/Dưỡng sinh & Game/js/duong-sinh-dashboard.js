/**
 * DUONG SINH DASHBOARD CONTROLLER - CliniPortal YHCT Module
 * 24 Solar Terms Calendar, 9 TCM Constitution Analyzer & Local Storage Persistence
 */

document.addEventListener("DOMContentLoaded", function () {
  const solarListEl = document.getElementById("solarTermsList");
  const quizBoxEl = document.getElementById("constQuizBox");
  const resultBoxEl = document.getElementById("constResultBox");

  if (typeof DUONG_SINH_DATA === "undefined") return;

  // Render Solar Terms List
  function renderSolarTerms() {
    if (!solarListEl) return;

    solarListEl.innerHTML = DUONG_SINH_DATA.solarTerms.map(t => `
      <div class="solar-item">
        <div>
          <div class="solar-name">🌱 Tiết ${t.name} <span style="font-weight:400; color:var(--color-tcm-green); font-size:11px;">(${t.element})</span></div>
          <div style="color:var(--color-text-muted); margin-top:2px;">Dưỡng sinh: ${t.focus}</div>
        </div>
        <div style="text-align:right;">
          <div class="solar-time">${t.time}</div>
          <div style="font-size:10px; font-weight:700; color:var(--color-warning);">Huyệt: ${t.point}</div>
        </div>
      </div>
    `).join("");
  }

  // Render Constitution Quiz
  function renderConstitutionQuiz() {
    if (!quizBoxEl) return;

    quizBoxEl.innerHTML = `
      <form id="constForm">
        ${DUONG_SINH_DATA.quiz.map((q, idx) => `
          <div style="margin-bottom:0.75rem;">
            <div style="font-weight:700; color:var(--color-text); margin-bottom:0.35rem;">
              ${idx + 1}. ${q.q}
            </div>
            <label class="const-opt-label">
              <input type="radio" name="q_${idx}" value="${q.type}" required>
              <span>Đúng với tôi</span>
            </label>
            <label class="const-opt-label" style="margin-top:4px;">
              <input type="radio" name="q_${idx}" value="none" checked>
              <span>Không đúng</span>
            </label>
          </div>
        `).join("")}
        <button type="submit" class="mode-btn active" style="width:100%; justify-content:center; margin-top:1rem;">
          <i class="fa-solid fa-calculator"></i> Phân Tích Thể Chất YHCT
        </button>
      </form>
    `;

    document.getElementById("constForm").addEventListener("submit", (e) => {
      e.preventDefault();
      analyzeConstitution();
    });
  }

  // Analyze Constitution Results
  function analyzeConstitution() {
    const form = document.getElementById("constForm");
    const formData = new FormData(form);
    const counts = {};

    for (let [key, val] of formData.entries()) {
      if (val !== "none") {
        counts[val] = (counts[val] || 0) + 1;
      }
    }

    let topType = "binh-hoa";
    let maxC = 0;
    for (let t in counts) {
      if (counts[t] > maxC) {
        maxC = counts[t];
        topType = t;
      }
    }

    const constData = DUONG_SINH_DATA.constitutions.find(c => c.id === topType) || DUONG_SINH_DATA.constitutions[4];

    // Save result
    localStorage.setItem("yhct_user_constitution", constData.name);

    if (resultBoxEl) {
      resultBoxEl.innerHTML = `
        <div class="const-result-card">
          <h4 style="margin:0; font-size:var(--text-sm); color:var(--color-tcm-green); font-weight:700;">
            🏆 KẾT QUẢ PHÂN TÍCH: BẠN THUỘC THỂ CHẤT [${constData.name}]
          </h4>
          <div><strong>Đặc điểm nhận diện:</strong> ${constData.desc}</div>
          <div><strong>Lời khuyên ăn uống dưỡng sinh:</strong> ${constData.advice}</div>
          <div><strong>Gợi ý huyệt tự bấm tại nhà:</strong> <span style="font-weight:700; color:var(--color-tcm-gold);">${constData.points}</span></div>
        </div>
      `;
    }
  }

  // Check saved constitution
  function checkSavedConstitution() {
    const saved = localStorage.getItem("yhct_user_constitution");
    if (saved && resultBoxEl) {
      resultBoxEl.innerHTML = `
        <div class="const-result-card">
          <div style="font-size:11px; color:var(--color-text-muted);">Kết quả trắc nghiệm trước đây của bạn:</div>
          <h4 style="margin:2px 0 0 0; color:var(--color-tcm-green);">${saved}</h4>
        </div>
      `;
    }
  }

  // Initialize
  renderSolarTerms();
  renderConstitutionQuiz();
  checkSavedConstitution();
});
