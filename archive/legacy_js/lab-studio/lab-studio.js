/**
 * Lab Pro Studio — Main Controller
 * Orchestrates UI interactions, tab switches, scenario selection, real-time lab mixer updates,
 * virtual report rendering with gauge bars, systematic 6-step reading checklist, & quiz challenge.
 */

document.addEventListener("DOMContentLoaded", function () {
  let currentLabValues = {};
  let currentScenario = null;
  let activeStepId = "step1";

  // DOM Elements
  const scenarioListGrid = document.getElementById("scenarioListGrid");
  const labMixerGrid = document.getElementById("labMixerGrid");
  const patientContextPanel = document.getElementById("patientContextPanel");
  const activeModifiersChips = document.getElementById("activeModifiersChips");
  const labReportTableBody = document.getElementById("labReportTableBody");
  const ddxCardsContainer = document.getElementById("ddxCardsContainer");
  const systematicChecklist = document.getElementById("systematicChecklist");
  const diagnosticCriteriaBox = document.getElementById("diagnosticCriteriaBox");
  const quizStudioBox = document.getElementById("quizStudioBox");
  const quizStudioOptions = document.getElementById("quizStudioOptions");
  const btnStartStudioQuiz = document.getElementById("btnStartStudioQuiz");
  const btnResetStudio = document.getElementById("btnResetStudio");

  // Tab switching (Ca bệnh mẫu vs Lab Mixer)
  const tabBtns = document.querySelectorAll(".sidebar-tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const targetTab = btn.getAttribute("data-tab");
      document.querySelectorAll(".sidebar-tab-content").forEach(ct => {
        ct.style.display = ct.id === targetTab ? "block" : "none";
      });
    });
  });

  // Category Pills Filter for Scenarios
  const scenarioCatBtns = document.querySelectorAll("#scenarioCategoryPills .cat-pill-btn");
  scenarioCatBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      scenarioCatBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.getAttribute("data-scenariocat");
      filterScenarios(cat);
    });
  });

  // Search input for Scenarios
  const scenarioSearchInput = document.getElementById("scenarioSearchInput");
  if (scenarioSearchInput) {
    scenarioSearchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      renderScenariosList(q);
    });
  }

  // Render Scenarios List
  function renderScenariosList(filterQuery = "") {
    if (!scenarioListGrid || !window.LAB_SCENARIOS) return;

    const filtered = window.LAB_SCENARIOS.filter(sc => {
      const matchText = (sc.title + sc.description + sc.category).toLowerCase();
      return matchText.includes(filterQuery);
    });

    scenarioListGrid.innerHTML = filtered.map(sc => `
      <div class="scenario-card-item ${currentScenario && currentScenario.id === sc.id ? 'active' : ''}" data-id="${sc.id}">
        <span class="scenario-card-badge" style="background: rgba(2, 132, 199, 0.1); color: var(--color-primary);">
          ${sc.category}
        </span>
        <div class="scenario-card-title">${sc.title}</div>
        <div style="font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600;">${sc.demographics}</div>
      </div>
    `).join("");

    document.querySelectorAll(".scenario-card-item").forEach(card => {
      card.addEventListener("click", () => {
        const scId = card.getAttribute("data-id");
        selectScenario(scId);
      });
    });
  }

  function filterScenarios(category) {
    if (category === "ALL") {
      renderScenariosList();
    } else {
      renderScenariosList(category.toLowerCase());
    }
  }

  // Select Scenario
  function selectScenario(scId) {
    const sc = window.LAB_SCENARIOS.find(s => s.id === scId);
    if (!sc) return;

    currentScenario = sc;
    currentLabValues = { ...sc.values };

    // Highlight card
    document.querySelectorAll(".scenario-card-item").forEach(c => {
      c.classList.toggle("active", c.getAttribute("data-id") === scId);
    });

    // Update patient context panel
    if (patientContextPanel) {
      patientContextPanel.style.display = "block";
      document.getElementById("patDemographics").textContent = `${sc.demographics} — ${sc.title}`;
      document.getElementById("patHR").textContent = `${sc.vitals.hr} bpm`;
      document.getElementById("patBP").textContent = sc.vitals.bp;
      document.getElementById("patSpO2").textContent = `${sc.vitals.spo2}%`;
      document.getElementById("patTemp").textContent = `${sc.vitals.temp} °C`;
      document.getElementById("patContextDesc").textContent = sc.description;

      const sympList = document.getElementById("patSymptomsList");
      if (sympList) {
        sympList.innerHTML = sc.symptoms.map(s => `<li>• ${s}</li>`).join("");
      }
    }

    // Sync input fields in mixer
    syncMixerInputs();

    // Re-render report & analysis
    updateStudioDisplay();
  }

  // Render Lab Mixer Controls
  function renderLabMixer() {
    if (!labMixerGrid || !window.LAB_REFERENCE_DATA) return;

    const groups = {
      cbc: { title: "🩸 HUYẾT HỌC (CBC)", keys: ["wbc", "neu_pct", "lym_pct", "rbc", "hb", "hct", "mcv", "mch", "mchc", "rdw", "plt", "retic"] },
      liver: { title: "🫀 SINH HÓA GAN - MẬT", keys: ["ast", "alt", "ggt", "alp", "bili_tp", "bili_tt", "alb", "prot"] },
      kidney: { title: "💧 SINH HÓA THẬN", keys: ["urea", "cre", "egfr", "uric"] },
      metabolic: { title: "🍬 ĐƯỜNG & LIPID", keys: ["glucose", "hba1c", "chol", "trig", "hdl", "ldl"] },
      coag: { title: "🩸 ĐÔNG CẦM MÁU", keys: ["pt_pct", "inr", "aptt", "fib", "ddimer"] }
    };

    let html = "";
    Object.keys(groups).forEach(gKey => {
      const g = groups[gKey];
      html += `
        <div class="lab-cat-group">
          <div class="lab-cat-title">${g.title}</div>
      `;
      g.keys.forEach(k => {
        const ref = window.LAB_REFERENCE_DATA[k];
        if (!ref) return;
        const defaultVal = currentLabValues[k] !== undefined ? currentLabValues[k] : ((ref.min + ref.max) / 2).toFixed(1);
        if (currentLabValues[k] === undefined) currentLabValues[k] = parseFloat(defaultVal);

        html += `
          <div class="lab-input-row">
            <span class="lab-input-label" title="${ref.desc}">${ref.name}</span>
            <input type="number" class="lab-input-num" data-key="${k}" value="${defaultVal}" step="0.1" min="0">
            <span class="lab-input-unit">${ref.unit}</span>
          </div>
        `;
      });
      html += `</div>`;
    });

    labMixerGrid.innerHTML = html;

    // Attach listeners to inputs
    document.querySelectorAll(".lab-input-num").forEach(inp => {
      inp.addEventListener("input", (e) => {
        const k = inp.getAttribute("data-key");
        const val = parseFloat(e.target.value);
        currentLabValues[k] = isNaN(val) ? 0 : val;
        updateStudioDisplay();
      });
    });
  }

  function syncMixerInputs() {
    document.querySelectorAll(".lab-input-num").forEach(inp => {
      const k = inp.getAttribute("data-key");
      if (currentLabValues[k] !== undefined) {
        inp.value = currentLabValues[k];
      }
    });
  }

  // Main Studio Display Update function
  function updateStudioDisplay() {
    if (!window.LabAnalyzer || !window.LAB_REFERENCE_DATA) return;

    const analysis = window.LabAnalyzer.analyzeLabSet(currentLabValues);

    // 1. Render Active Chips
    if (activeModifiersChips) {
      if (analysis.activeChips.length === 0) {
        activeModifiersChips.innerHTML = `<span style="font-size: 0.8rem; color: var(--color-text-muted); font-style: italic;">Các trị số đều trong khoảng tham chiếu bình thường.</span>`;
      } else {
        activeModifiersChips.innerHTML = analysis.activeChips.map(c => `
          <span class="active-chip ${c.type}">
            <i class="fa-solid fa-circle-exclamation"></i> ${c.text}
          </span>
        `).join("");
      }
    }

    // 2. Render Virtual Lab Report Table
    renderReportTable();

    // 3. Render Differential Diagnosis Cards
    if (ddxCardsContainer) {
      ddxCardsContainer.innerHTML = analysis.ddxList.map(ddx => `
        <div class="ddx-card-item">
          <div class="ddx-card-title">
            <span>🩺 ${ddx.title}</span>
            <span class="ddx-probability">${ddx.prob}</span>
          </div>
          <div class="ddx-card-desc">${ddx.desc}</div>
          <div class="ddx-next-tests">${ddx.nextTests}</div>
        </div>
      `).join("");
    }

    // 4. Update Systematic 6-Step Checklist Status
    updateSystematicChecklist(analysis.findings);

    // 5. Update Criteria Box for current active step
    showStepCriteria(activeStepId);
  }

  // Render Report Table with Gauge Bars
  function renderReportTable() {
    if (!labReportTableBody || !window.LAB_REFERENCE_DATA) return;

    const groups = [
      { key: "cbc", title: "🩸 CÔNG THỨC MÁU TOÀN PHẦN (CBC)" },
      { key: "liver", title: "🫀 SINH HÓA CHỨC NĂNG GAN - MẬT" },
      { key: "kidney", title: "💧 SINH HÓA CHỨC NĂNG THẬN" },
      { key: "metabolic", title: "🍬 CHUYỂN HÓA ĐƯỜNG & LIPID MÁU" },
      { key: "coag", title: "🩸 XÉT NGHIỆM ĐÔNG CẦM MÁU" }
    ];

    let html = "";
    groups.forEach(g => {
      const keysInGroup = Object.keys(window.LAB_REFERENCE_DATA).filter(k => window.LAB_REFERENCE_DATA[k].group === g.key);
      if (keysInGroup.length === 0) return;

      html += `
        <tr style="background: rgba(2, 132, 199, 0.05);">
          <td colspan="5" style="font-weight: 800; color: var(--color-primary); font-size: 0.82rem;">
            ${g.title}
          </td>
        </tr>
      `;

      keysInGroup.forEach(k => {
        const ref = window.LAB_REFERENCE_DATA[k];
        const val = currentLabValues[k];
        const ev = window.LabAnalyzer.evaluateValue(k, val);

        let statusClass = "val-status-normal";
        let pinClass = "pin-normal";
        if (ev.status === "high") { statusClass = "val-status-high"; pinClass = "pin-high"; }
        else if (ev.status === "low") { statusClass = "val-status-low"; pinClass = "pin-low"; }
        else if (ev.status === "critical") { statusClass = "val-status-critical"; pinClass = "pin-critical"; }

        html += `
          <tr>
            <td style="font-weight: 700; color: var(--color-text);">${ref.name}</td>
            <td class="${statusClass}">${val !== undefined ? val : '--'}</td>
            <td style="color: var(--color-text-muted); font-size: 0.78rem;">${ref.unit}</td>
            <td style="font-size: 0.78rem; color: var(--color-text-muted);">${ref.min} – ${ref.max}</td>
            <td>
              <div class="gauge-bar-track">
                <div class="gauge-bar-normal-zone" style="left: 25%; width: 50%;"></div>
                <div class="gauge-bar-pin ${pinClass}" style="left: ${ev.pctPin}%;"></div>
              </div>
            </td>
          </tr>
        `;
      });
    });

    labReportTableBody.innerHTML = html;
  }

  // Render Systematic Checklist Cards
  function renderSystematicChecklist() {
    if (!systematicChecklist) return;

    const steps = [
      { id: "step1", title: "1. Đánh giá CBC tổng quát", desc: "Hồng cầu (Hb, Hct), Bạch cầu (WBC), Tiểu cầu (PLT)." },
      { id: "step2", title: "2. Phân tích chỉ số Hồng cầu", desc: "MCV (< 80: Nhỏ, > 100: To), RDW (> 14.5%) & Retic." },
      { id: "step3", title: "3. Công thức Bạch cầu", desc: "Tỷ lệ Neutrophil % (trung tính) & Lymphocyte %." },
      { id: "step4", title: "4. Chức năng Gan & Mật", desc: "Men gan (AST, ALT, GGT, ALP), Bilirubin & Albumin." },
      { id: "step5", title: "5. Chức năng Thận & Đường", desc: "Creatinine, eGFR, Acid Uric, Glucose & HbA1c." },
      { id: "step6", title: "6. Đông cầm máu & D-Dimer", desc: "Ngoại sinh (PT/INR), Nội sinh (APTT), Fibrinogen & D-Dimer." }
    ];

    systematicChecklist.innerHTML = steps.map(s => `
      <div class="chk-step-card ${s.id === activeStepId ? 'active' : ''}" id="${s.id}" style="cursor: pointer;">
        <div class="chk-step-header">
          <i class="fa-solid fa-circle-notch fa-spin" style="color: var(--color-primary);"></i> ${s.title}
        </div>
        <div class="chk-step-body">${s.desc}</div>
        <div class="chk-step-status" style="background: rgba(2, 132, 199, 0.1); color: var(--color-primary);">Đang kiểm tra...</div>
      </div>
    `).join("");

    // Attach click listener to each step card
    steps.forEach(s => {
      const card = document.getElementById(s.id);
      if (card) {
        card.addEventListener("click", () => {
          activeStepId = s.id;
          document.querySelectorAll(".chk-step-card").forEach(c => c.classList.remove("active"));
          card.classList.add("active");
          showStepCriteria(s.id);
        });
      }
    });
  }

  // Update Status for ALL 6 steps
  function updateSystematicChecklist(findings) {
    const getV = (k) => currentLabValues[k] !== undefined ? currentLabValues[k] : null;

    // STEP 1: CBC tổng quát (Hb, WBC, PLT)
    const hb = getV("hb"), wbc = getV("wbc"), plt = getV("plt");
    const el1 = document.querySelector("#step1 .chk-step-status");
    if (el1) {
      if (hb !== null && hb < 120) {
        el1.textContent = `⚠️ Thiếu máu (Hb: ${hb} g/L)`;
        el1.style.background = "rgba(225, 29, 72, 0.1)"; el1.style.color = "#e11d48";
      } else if (plt !== null && plt < 150) {
        el1.textContent = `⚠️ Giảm tiểu cầu (PLT: ${plt} G/L)`;
        el1.style.background = "rgba(225, 29, 72, 0.1)"; el1.style.color = "#e11d48";
      } else if (wbc !== null && wbc > 10.0) {
        el1.textContent = `⚠️ Tăng bạch cầu (WBC: ${wbc} G/L)`;
        el1.style.background = "rgba(217, 119, 6, 0.1)"; el1.style.color = "#d97706";
      } else {
        el1.textContent = "✅ CBC Tế bào máu bình thường";
        el1.style.background = "rgba(34, 197, 94, 0.1)"; el1.style.color = "#15803d";
      }
    }

    // STEP 2: Chỉ số hồng cầu (MCV, RDW, Retic)
    const mcv = getV("mcv"), rdw = getV("rdw");
    const el2 = document.querySelector("#step2 .chk-step-status");
    if (el2) {
      if (mcv !== null && mcv < 80) {
        el2.textContent = `⚠️ Hồng cầu nhỏ (MCV: ${mcv} fL)`;
        el2.style.background = "rgba(217, 119, 6, 0.1)"; el2.style.color = "#d97706";
      } else if (mcv !== null && mcv > 100) {
        el2.textContent = `⚠️ Hồng cầu phồng to (MCV: ${mcv} fL)`;
        el2.style.background = "rgba(225, 29, 72, 0.1)"; el2.style.color = "#e11d48";
      } else if (rdw !== null && rdw > 14.5) {
        el2.textContent = `⚠️ RDW tăng (${rdw}%) - Kích thước bất đồng`;
        el2.style.background = "rgba(217, 119, 6, 0.1)"; el2.style.color = "#d97706";
      } else {
        el2.textContent = "✅ MCV/RDW Đẳng sắc đẳng bào";
        el2.style.background = "rgba(34, 197, 94, 0.1)"; el2.style.color = "#15803d";
      }
    }

    // STEP 3: Công thức bạch cầu (Neu %, Lym %)
    const neu = getV("neu_pct"), lym = getV("lym_pct");
    const el3 = document.querySelector("#step3 .chk-step-status");
    if (el3) {
      if (neu !== null && neu > 74) {
        el3.textContent = `⚠️ Tăng Neutrophil (${neu}%) - Nhiễm khuẩn`;
        el3.style.background = "rgba(225, 29, 72, 0.1)"; el3.style.color = "#e11d48";
      } else if (lym !== null && lym > 45) {
        el3.textContent = `⚠️ Tăng Lympho (${lym}%) - Nhiễm vi rút`;
        el3.style.background = "rgba(217, 119, 6, 0.1)"; el3.style.color = "#d97706";
      } else {
        el3.textContent = "✅ Công thức bạch cầu cân bằng";
        el3.style.background = "rgba(34, 197, 94, 0.1)"; el3.style.color = "#15803d";
      }
    }

    // STEP 4: Chức năng gan (AST, ALT, Bili, Alb)
    const ast = getV("ast"), alt = getV("alt"), alb = getV("alb"), bili = getV("bili_tp");
    const el4 = document.querySelector("#step4 .chk-step-status");
    if (el4) {
      if ((ast !== null && ast > 40) || (alt !== null && alt > 40)) {
        el4.textContent = `⚠️ Men gan tăng (AST: ${ast}, ALT: ${alt})`;
        el4.style.background = "rgba(225, 29, 72, 0.1)"; el4.style.color = "#e11d48";
      } else if (alb !== null && alb < 35) {
        el4.textContent = `⚠️ Giảm Albumin gan (${alb} g/L)`;
        el4.style.background = "rgba(217, 119, 6, 0.1)"; el4.style.color = "#d97706";
      } else if (bili !== null && bili > 17.1) {
        el4.textContent = `⚠️ Tăng Bilirubin (${bili} μmol/L)`;
        el4.style.background = "rgba(217, 119, 6, 0.1)"; el4.style.color = "#d97706";
      } else {
        el4.textContent = "✅ Chức năng gan mật bình thường";
        el4.style.background = "rgba(34, 197, 94, 0.1)"; el4.style.color = "#15803d";
      }
    }

    // STEP 5: Thận & Đường / Lipid (Creatinine, eGFR, Glucose)
    const cre = getV("cre"), egfr = getV("egfr"), glu = getV("glucose");
    const el5 = document.querySelector("#step5 .chk-step-status");
    if (el5) {
      if (cre !== null && cre > 106) {
        el5.textContent = `⚠️ Creatinine tăng (${cre} μmol/L)`;
        el5.style.background = "rgba(225, 29, 72, 0.1)"; el5.style.color = "#e11d48";
      } else if (glu !== null && glu > 5.6) {
        el5.textContent = `⚠️ Đường huyết đói tăng (${glu} mmol/L)`;
        el5.style.background = "rgba(217, 119, 6, 0.1)"; el5.style.color = "#d97706";
      } else {
        el5.textContent = "✅ Chức năng thận & Đường bình thường";
        el5.style.background = "rgba(34, 197, 94, 0.1)"; el5.style.color = "#15803d";
      }
    }

    // STEP 6: Đông cầm máu (PT, INR, APTT, D-Dimer)
    const inr = getV("inr"), aptt = getV("aptt"), ddimer = getV("ddimer");
    const el6 = document.querySelector("#step6 .chk-step-status");
    if (el6) {
      if (ddimer !== null && ddimer > 0.5) {
        el6.textContent = `⚠️ D-Dimer tăng (${ddimer} mg/L)`;
        el6.style.background = "rgba(225, 29, 72, 0.1)"; el6.style.color = "#e11d48";
      } else if (inr !== null && inr > 1.2) {
        el6.textContent = `⚠️ INR kéo dài (${inr})`;
        el6.style.background = "rgba(217, 119, 6, 0.1)"; el6.style.color = "#d97706";
      } else if (aptt !== null && aptt > 35) {
        el6.textContent = `⚠️ APTT kéo dài (${aptt}s)`;
        el6.style.background = "rgba(217, 119, 6, 0.1)"; el6.style.color = "#d97706";
      } else {
        el6.textContent = "✅ Chức năng Đông máu bình thường";
        el6.style.background = "rgba(34, 197, 94, 0.1)"; el6.style.color = "#15803d";
      }
    }
  }

  // Show Step Criteria & Guidance in diagnosticCriteriaBox
  function showStepCriteria(stepId) {
    if (!diagnosticCriteriaBox) return;

    const guidanceData = {
      step1: {
        title: "📌 Bước 1: Đánh Giá CBC Tế Bào Máu Tổng Quát",
        rules: [
          "**Hemoglobin (Hb)**: Nam < 130 g/L, Nữ < 120 g/L → Chẩn đoán Thiếu máu WHO.",
          "**Bạch cầu (WBC)**: Normal 4.0 - 10.0 G/L. > 10.0: Phản ứng nhiễm khuẩn/stress. < 4.0: Suy tủy/Nhiễm vi rút.",
          "**Tiểu cầu (PLT)**: Normal 150 - 400 G/L. < 150: Giảm tiểu cầu. < 50: Nguy cơ xuất huyết khẩn."
        ]
      },
      step2: {
        title: "📌 Bước 2: Phân Tích Chỉ Số Hồng Cầu (MCV & RDW)",
        rules: [
          "**MCV < 80 fL**: Hồng cầu nhỏ (Thiếu máu thiếu sắt, Thalassemia, Thiếu máu bệnh mãn tính).",
          "**MCV 80 - 100 fL**: Đẳng sắc đẳng bào (Tán huyết cấp, Mất máu cấp, Suy tủy).",
          "**MCV > 100 fL**: Hồng cầu phồng to (Thiếu Vitamin B12, Acid Folic, Nghiện rượu, Bệnh gan).",
          "**RDW > 14.5%**: Kích thước hồng cầu bất đồng đều (Biệt hóa IDA với Thalassemia minor)."
        ]
      },
      step3: {
        title: "📌 Bước 3: Công Thức Bạch Cầu (Differential WBC)",
        rules: [
          "**Neutrophil (40 - 74%)**: Tăng > 74% (chuyển trái) → Gợi ý nhiễm vi khuẩn cấp hoặc ổ mủ.",
          "**Lymphocyte (20 - 45%)**: Tăng > 45% → Gợi ý nhiễm vi rút (EBV, CMV, Dengue) hoặc bệnh bạch cầu.",
          "**Eosinophil (0.5 - 5%)**: Tăng > 5% → Gợi ý dị ứng, hen suyễn hoặc nhiễm ký sinh trùng giun sán."
        ]
      },
      step4: {
        title: "📌 Bước 4: Chức Năng Gan - Mật & Protein Huyết Thanh",
        rules: [
          "**Tổn thương tế bào gan**: AST/ALT > 40 U/L. ALT/ALP ratio > 5 → Hoại tử tế bào gan cấp.",
          "**Ứ mật / Tắc mật**: GGT & ALP tăng cao kèm Bilirubin Trực Tiếp tăng > 5.1 μmol/L.",
          "**Suy chức năng tổng hợp**: Albumin < 35 g/L & Tỷ lệ PT < 70% (INR > 1.2)."
        ]
      },
      step5: {
        title: "📌 Bước 5: Chức Năng Thận & Chuyển Hóa Đường/Lipid",
        rules: [
          "**Suy thận (AKI / CKD)**: Creatinine > 106 μmol/L. eGFR < 60 mL/min/1.73m².",
          "**Đái tháo đường**: Glucose đói > 5.6 mmol/L, HbA1c > 6.5%. Thở Kussmaul nếu DKA.",
          "**Rối loạn Lipid**: Cholesterol > 5.2, LDL-C > 3.4, Triglyceride > 1.88 (Tụy cấp khi > 11.3)."
        ]
      },
      step6: {
        title: "📌 Bước 6: Xét Nghiệm Đông Cầm Máu & D-Dimer",
        rules: [
          "**Đường ngoại sinh (PT / INR)**: PT% < 70% hoặc INR > 1.2 → Tổn thương gan, Thiếu Vitamin K, Warfarin.",
          "**Đường nội sinh (APTT)**: APTT > 35s → Hemophilia A/B, Heparin, Kháng đông Lupus.",
          "**D-Dimer > 0.5 mg/L**: Tăng sản phẩm thoái biến Fibrin → Huyết khối DVT/PE, DIC."
        ]
      }
    };

    const data = guidanceData[stepId] || guidanceData.step1;
    diagnosticCriteriaBox.innerHTML = `
      <div style="background: rgba(2, 132, 199, 0.05); border: 1px solid rgba(2, 132, 199, 0.2); border-radius: 10px; padding: 0.85rem;">
        <h4 style="font-size: 0.9rem; font-weight: 800; color: var(--color-primary); margin-bottom: 0.5rem;">${data.title}</h4>
        <ul style="font-size: 0.78rem; color: var(--color-text); line-height: 1.5; padding-left: 1rem; margin: 0;">
          ${data.rules.map(r => `<li style="margin-bottom: 0.4rem;">${r.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  // Quiz Mode Controller
  if (btnStartStudioQuiz) {
    btnStartStudioQuiz.addEventListener("click", () => {
      if (!currentScenario) {
        alert("Vui lòng chọn một ca bệnh mẫu trước khi tham gia Quiz!");
        return;
      }

      if (quizStudioBox) {
        quizStudioBox.style.display = "block";
        quizStudioBox.scrollIntoView({ behavior: "smooth" });

        quizStudioOptions.innerHTML = currentScenario.quizOptions.map((opt, idx) => `
          <button class="quiz-opt-btn" data-idx="${idx}">${String.fromCharCode(65 + idx)}. ${opt}</button>
        `).join("");

        document.querySelectorAll(".quiz-opt-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const chosen = parseInt(btn.getAttribute("data-idx"));
            if (chosen === currentScenario.correctAnswerIndex) {
              btn.classList.add("correct");
              alert("🎉 CHÍNH XÁC!\n\n" + currentScenario.explanation);
            } else {
              btn.classList.add("incorrect");
              alert("❌ CHƯA ĐÚNG! Hãy đọc lại phần gợi ý chẩn đoán phân biệt.");
            }
          });
        });
      }
    });
  }

  // Reset Button
  if (btnResetStudio) {
    btnResetStudio.addEventListener("click", () => {
      if (window.LAB_SCENARIOS && window.LAB_SCENARIOS.length > 0) {
        selectScenario(window.LAB_SCENARIOS[0].id);
      }
    });
  }

  // Initialize
  renderLabMixer();
  renderScenariosList();
  renderSystematicChecklist();

  // Load first scenario by default
  if (window.LAB_SCENARIOS && window.LAB_SCENARIOS.length > 0) {
    selectScenario(window.LAB_SCENARIOS[0].id);
  }
});
