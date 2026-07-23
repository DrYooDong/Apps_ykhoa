/* ============================================================
   EBM PRACTICE LAB — INTERACTIVE LOGIC
   Location: pages/Y học chứng cứ/EBM Lab/ebm-lab.js
============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  initTabs();
  initPicoBuilder();
  initCaspChecklist();
  initNntCalculator();
});

/* ── TAB SWITCHING ── */
function initTabs() {
  const tabBtns = document.querySelectorAll(".lab-tab-btn");
  const panels = document.querySelectorAll(".lab-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetPanel = btn.getAttribute("data-tab");

      tabBtns.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(`panel-${targetPanel}`).classList.add("active");
    });
  });
}

/* ── 1. PICO BUILDER LOGIC ── */
function initPicoBuilder() {
  const pInput = document.getElementById("pico-p");
  const iInput = document.getElementById("pico-i");
  const cInput = document.getElementById("pico-c");
  const oInput = document.getElementById("pico-o");

  const qPreview = document.getElementById("pico-question-preview");
  const searchString = document.getElementById("pico-search-string");
  const btnCopy = document.getElementById("btn-copy-pico");

  function updatePicoOutput() {
    const p = pInput.value.trim() || "[Đối tượng bệnh nhân]";
    const i = iInput.value.trim() || "[Biện pháp can thiệp]";
    const c = cInput.value.trim() || "[Biện pháp so sánh]";
    const o = oInput.value.trim() || "[Kết cục kỳ vọng]";

    // Build Natural Language Question
    qPreview.innerHTML = `Ở bệnh nhân <strong style="color: var(--ebm-primary-dark);">${p}</strong>, việc sử dụng <strong style="color: #06b6d4;">${i}</strong> so với <strong style="color: var(--ebm-purple);">${c}</strong> có giúp <strong style="color: var(--ebm-success);">${o}</strong> hay không?`;

    // Build PubMed Search String
    const meshP = pInput.value.trim() ? `(${pInput.value.trim()}[Title/Abstract] OR "${pInput.value.trim()}"[MeSH Terms])` : "";
    const meshI = iInput.value.trim() ? `(${iInput.value.trim()}[Title/Abstract] OR "${iInput.value.trim()}"[MeSH Terms])` : "";
    const meshC = cInput.value.trim() ? `(${cInput.value.trim()}[Title/Abstract])` : "";
    const meshO = oInput.value.trim() ? `(${oInput.value.trim()}[Title/Abstract])` : "";

    const parts = [meshP, meshI, meshC, meshO].filter(Boolean);
    const query = parts.length > 0 ? parts.join(" AND ") : "Nhập thông tin PICO phía trên để tạo chuỗi tìm kiếm...";

    searchString.textContent = query;
  }

  [pInput, iInput, cInput, oInput].forEach((el) => {
    el.addEventListener("input", updatePicoOutput);
  });

  if (btnCopy) {
    btnCopy.addEventListener("click", () => {
      navigator.clipboard.writeText(searchString.textContent).then(() => {
        const origText = btnCopy.innerHTML;
        btnCopy.innerHTML = `<i class="fa-solid fa-check"></i> Đã sao chép!`;
        setTimeout(() => (btnCopy.innerHTML = origText), 2000);
      });
    });
  }

  // Load saved PICO
  const savedPico = localStorage.getItem("cliniportal_pico_draft");
  if (savedPico) {
    try {
      const data = JSON.parse(savedPico);
      pInput.value = data.p || "";
      iInput.value = data.i || "";
      cInput.value = data.c || "";
      oInput.value = data.o || "";
    } catch (e) {}
  }

  // Save PICO on edit
  [pInput, iInput, cInput, oInput].forEach((el) => {
    el.addEventListener("change", () => {
      localStorage.setItem(
        "cliniportal_pico_draft",
        JSON.stringify({
          p: pInput.value,
          i: iInput.value,
          c: cInput.value,
          o: oInput.value,
        })
      );
    });
  });

  updatePicoOutput();
}

/* ── 2. CASP CRITICAL APPRAISAL TOOLKIT LOGIC ── */
function initCaspChecklist() {
  const caspRadios = document.querySelectorAll('.casp-options input[type="radio"]');
  const scoreVal = document.getElementById("casp-score-value");
  const riskBadge = document.getElementById("casp-risk-badge");

  function calculateCaspScore() {
    let yesCount = 0;
    let noCount = 0;
    let cantCount = 0;
    let totalAnswered = 0;

    const questions = document.querySelectorAll(".casp-item");
    questions.forEach((q) => {
      const checked = q.querySelector('input[type="radio"]:checked');
      if (checked) {
        totalAnswered++;
        if (checked.value === "yes") yesCount++;
        else if (checked.value === "no") noCount++;
        else if (checked.value === "cant") cantCount++;
      }
    });

    scoreVal.textContent = `${yesCount} / 11`;

    if (totalAnswered < 5) {
      riskBadge.className = "casp-score-badge mod-risk";
      riskBadge.innerHTML = `<i class="fa-solid fa-circle-info"></i> Đang đánh giá (${totalAnswered}/11 câu)...`;
      return;
    }

    if (yesCount >= 9 && noCount <= 1) {
      riskBadge.className = "casp-score-badge low-risk";
      riskBadge.innerHTML = `<i class="fa-solid fa-shield-halved"></i> Sai số thấp (High Quality RCT)`;
    } else if (yesCount >= 6) {
      riskBadge.className = "casp-score-badge mod-risk";
      riskBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Sai số trung bình (Moderate Quality)`;
    } else {
      riskBadge.className = "casp-score-badge high-risk";
      riskBadge.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Sai số cao / Chất lượng thấp (Low Quality)`;
    }
  }

  caspRadios.forEach((radio) => {
    radio.addEventListener("change", calculateCaspScore);
  });

  calculateCaspScore();
}

/* ── 3. NNT & ARR CALCULATOR LOGIC ── */
function initNntCalculator() {
  const inputCer = document.getElementById("calc-cer"); // Control Event Rate (%)
  const inputEer = document.getElementById("calc-eer"); // Experimental Event Rate (%)

  const valArr = document.getElementById("metric-arr");
  const valRrr = document.getElementById("metric-rrr");
  const valNnt = document.getElementById("metric-nnt");
  const valOr = document.getElementById("metric-or");

  const iconGrid = document.getElementById("icon-array-grid");
  const iconText = document.getElementById("icon-array-text");

  function calculateNnt() {
    let cer = parseFloat(inputCer.value);
    let eer = parseFloat(inputEer.value);

    if (isNaN(cer)) cer = 20;
    if (isNaN(eer)) eer = 12;

    const arr = Math.abs(cer - eer); // Absolute Risk Reduction (%)
    const rrr = cer > 0 ? ((cer - eer) / cer) * 100 : 0; // Relative Risk Reduction (%)
    const nnt = arr > 0 ? Math.ceil(100 / arr) : 0; // Number Needed to Treat

    // Odd Ratio approximation for events
    const oddsControl = cer / (100 - cer);
    const oddsExp = eer / (100 - eer);
    const oddsRatio = oddsControl > 0 ? (oddsExp / oddsControl).toFixed(2) : "--";

    valArr.textContent = `${arr.toFixed(1)}%`;
    valRrr.textContent = `${rrr.toFixed(1)}%`;
    valNnt.textContent = nnt > 0 ? nnt : "∞";
    valOr.textContent = oddsRatio;

    // Render 100 Icon Array Visual
    renderIconArray(cer, eer, arr, nnt);
  }

  function renderIconArray(cer, eer, arr, nnt) {
    if (!iconGrid) return;
    iconGrid.innerHTML = "";

    const numSaved = Math.round(arr); // How many out of 100 are saved by drug
    const numEventExp = Math.round(eer); // How many still have event despite drug
    const numUnaffected = 100 - numSaved - numEventExp;

    for (let i = 0; i < 100; i++) {
      const icon = document.createElement("div");
      icon.className = "person-icon";

      if (i < numSaved) {
        icon.classList.add("saved");
        icon.innerHTML = `<i class="fa-solid fa-heart-pulse"></i>`;
        icon.title = "Được cứu nhờ can thiệp điều trị";
      } else if (i < numSaved + numEventExp) {
        icon.classList.add("event");
        icon.innerHTML = `<i class="fa-solid fa-user-xmark"></i>`;
        icon.title = "Vẫn xảy ra biến cố";
      } else {
        icon.classList.add("unaffected");
        icon.innerHTML = `<i class="fa-solid fa-user"></i>`;
        icon.title = "Không xảy ra biến cố";
      }

      iconGrid.appendChild(icon);
    }

    if (iconText) {
      iconText.innerHTML = `Điều trị <strong>100</strong> bệnh nhân sẽ giúp cứu được <strong style="color: var(--ebm-success);">${numSaved} người</strong> khỏi biến cố (NNT = <strong>${nnt}</strong>).`;
    }
  }

  [inputCer, inputEer].forEach((input) => {
    if (input) input.addEventListener("input", calculateNnt);
  });

  calculateNnt();
}
