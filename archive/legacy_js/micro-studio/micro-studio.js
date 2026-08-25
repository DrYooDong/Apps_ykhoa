/**
 * micro-studio.js — Microbiology Pro Studio
 * Main UI Orchestrator: Quản lý Tab, Organism Mixer, SVG Rendering, Decision Tree,
 * Antibiogram Table & Quiz Mode.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const elActiveChips = document.getElementById('activeModifiersChips');
  const elScenarioListGrid = document.getElementById('scenarioListGrid');
  const elPatientPanel = document.getElementById('patientContextPanel');
  const elDecisionTreeContainer = document.getElementById('decisionTreeContainer');
  const elAntibiogramTableBody = document.getElementById('antibiogramTableBody');
  const elQuizStudioBox = document.getElementById('quizStudioBox');

  // Sliders & Selects
  const elSelectGram = document.getElementById('selectGramType');
  const elSelectStain = document.getElementById('selectStainType');
  const elSelectPlate = document.getElementById('selectCulturePlate');
  const elSelectCatalase = document.getElementById('selectCatalase');
  const elSelectCoagulase = document.getElementById('selectCoagulase');
  const elSelectOxidase = document.getElementById('selectOxidase');
  const elSelectLactose = document.getElementById('selectLactose');

  let activeScenarioId = null;
  let activeCategory = 'ALL';
  let svgEngine = null;

  // Initialize SVG Engine
  if (typeof MicroSVGEngine !== 'undefined') {
    svgEngine = new MicroSVGEngine('microSvgContainer', 'culturePlateContainer');
  }

  // Input Listeners
  [elSelectGram, elSelectStain, elSelectPlate, elSelectCatalase, elSelectCoagulase, elSelectOxidase, elSelectLactose].forEach(sel => {
    if (sel) {
      sel.addEventListener('change', triggerMicroAnalysis);
    }
  });

  // Search input listener
  const elSearchInput = document.getElementById('scenarioSearchInput');
  if (elSearchInput) {
    elSearchInput.addEventListener('input', renderScenariosList);
  }

  // Render Scenarios List (Grouped & Filtered)
  function renderScenariosList() {
    if (!elScenarioListGrid || typeof MICRO_SCENARIOS === 'undefined') return;
    elScenarioListGrid.innerHTML = '';

    const searchTerm = elSearchInput ? elSearchInput.value.trim().toLowerCase() : '';

    // Filter scenarios
    const filtered = MICRO_SCENARIOS.filter(sc => {
      const matchCat = activeCategory === 'ALL' || sc.category === activeCategory;
      const matchSearch = !searchTerm || 
        sc.title.toLowerCase().includes(searchTerm) ||
        sc.patient.demographics.toLowerCase().includes(searchTerm) ||
        sc.micro.organismId.toLowerCase().includes(searchTerm);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      elScenarioListGrid.innerHTML = `
        <div style="text-align:center; padding:1.5rem; color:var(--color-text-muted); font-size:0.85rem;">
          <i class="fa-solid fa-circle-question" style="font-size:1.5rem; margin-bottom:0.4rem; display:block;"></i>
          Không tìm thấy ca vi sinh phù hợp từ khóa
        </div>
      `;
      return;
    }

    // Group by category if activeCategory === 'ALL'
    const categories = activeCategory === 'ALL' 
      ? ['Gram dương', 'Gram âm', 'Vi nấm', 'Vi khuẩn đặc biệt']
      : [activeCategory];

    categories.forEach(cat => {
      const catItems = filtered.filter(sc => sc.category === cat);
      if (catItems.length === 0) return;

      // Group Header
      if (activeCategory === 'ALL') {
        const groupHeader = document.createElement('div');
        groupHeader.className = 'scenario-group-header';
        groupHeader.innerHTML = `
          <span>${cat === 'Gram dương' ? '🟣' : (cat === 'Gram âm' ? '🔴' : (cat === 'Vi nấm' ? '🔮' : '🧫'))} ${cat}</span>
          <span class="scenario-group-count">${catItems.length} ca</span>
        `;
        elScenarioListGrid.appendChild(groupHeader);
      }

      catItems.forEach(sc => {
        const card = document.createElement('div');
        card.className = `scenario-card ${activeScenarioId === sc.id ? 'active' : ''}`;
        card.innerHTML = `
          <div class="scenario-card-header">
            <span class="scenario-card-title">${sc.title}</span>
            <span class="scenario-diff-badge" style="background:${sc.badgeColor}; color:#fff;">${sc.micro.organismId}</span>
          </div>
          <p style="font-size:0.78rem; color:var(--color-text-muted); margin:0;">${sc.patient.demographics}</p>
        `;
        card.addEventListener('click', () => loadScenario(sc.id));
        elScenarioListGrid.appendChild(card);
      });
    });
  }

  function loadScenario(scId) {
    const sc = MICRO_SCENARIOS.find(s => s.id === scId);
    if (!sc) return;

    activeScenarioId = scId;

    if (elPatientPanel) {
      elPatientPanel.style.display = 'block';
      document.getElementById('patDemographics').textContent = sc.patient.demographics;
      document.getElementById('patHR').textContent = sc.patient.hr;
      document.getElementById('patBP').textContent = sc.patient.bp;
      document.getElementById('patSpO2').textContent = sc.patient.spo2;
      document.getElementById('patTemp').textContent = sc.patient.temp;
      document.getElementById('patRR').textContent = sc.patient.rr;
      document.getElementById('patGCS').textContent = sc.patient.gcs;
      document.getElementById('patContextDesc').textContent = `${sc.patient.description} (Mẫu phẩm: ${sc.patient.specimen})`;

      const sympList = document.getElementById('patSymptomsList');
      if (sympList) {
        sympList.innerHTML = sc.patient.symptoms.map(s => `<li>• ${s}</li>`).join('');
      }
    }

    // Set Select Inputs
    if (elSelectGram) elSelectGram.value = sc.micro.gram;
    if (elSelectStain) elSelectStain.value = sc.micro.stainType;
    if (elSelectPlate) elSelectPlate.value = sc.micro.culturePlate;
    if (elSelectCatalase) elSelectCatalase.value = sc.micro.catalase;
    if (elSelectCoagulase) elSelectCoagulase.value = sc.micro.coagulase;
    if (elSelectOxidase) elSelectOxidase.value = sc.micro.oxidase;
    if (elSelectLactose) elSelectLactose.value = sc.micro.lactose;

    renderScenariosList();
    triggerMicroAnalysis();
  }

  document.getElementById('btnResetStudio')?.addEventListener('click', () => {
    activeScenarioId = null;
    if (elPatientPanel) elPatientPanel.style.display = 'none';
    if (elSelectGram) elSelectGram.value = "gram_pos_cocci_clusters";
    if (elSelectStain) elSelectStain.value = "gram";
    if (elSelectPlate) elSelectPlate.value = "blood_agar_beta";
    if (elSelectCatalase) elSelectCatalase.value = "positive";
    if (elSelectCoagulase) elSelectCoagulase.value = "positive";
    if (elSelectOxidase) elSelectOxidase.value = "negative";
    if (elSelectLactose) elSelectLactose.value = "none";
    renderScenariosList();
    triggerMicroAnalysis();
  });

  // Tab & Filter Pills Navigation
  document.querySelectorAll('.sidebar-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.sidebar-tab-content').forEach(c => c.style.display = 'none');
      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');
      document.getElementById(target).style.display = 'block';
    });
  });

  document.querySelectorAll('.cat-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-cat');
      renderScenariosList();
    });
  });

  // Analysis & Render Trigger
  function triggerMicroAnalysis() {
    const activeSc = MICRO_SCENARIOS.find(s => s.id === activeScenarioId);

    const microData = {
      gram: elSelectGram ? elSelectGram.value : "gram_pos_cocci_clusters",
      stainType: elSelectStain ? elSelectStain.value : "gram",
      culturePlate: elSelectPlate ? elSelectPlate.value : "blood_agar_beta",
      catalase: elSelectCatalase ? elSelectCatalase.value : "positive",
      coagulase: elSelectCoagulase ? elSelectCoagulase.value : "positive",
      oxidase: elSelectOxidase ? elSelectOxidase.value : "negative",
      lactose: elSelectLactose ? elSelectLactose.value : "none",
      morphology: elSelectGram ? elSelectGram.options[elSelectGram.selectedIndex].text : "Cầu khuẩn",
      organismId: activeSc ? activeSc.micro.organismId : "S. aureus (MRSA)",
      pmn: activeSc ? activeSc.micro.pmn : "high"
    };

    const res = MicroEngine.analyze(microData);

    // SVG Render
    if (svgEngine) {
      svgEngine.renderMicroscopy(microData);
    }

    // Active Chips Bar
    if (elActiveChips) {
      elActiveChips.innerHTML = `
        <span class="active-mod-chip">${microData.organismId}</span>
        <span class="active-mod-chip" style="background:#8b5cf6;">${microData.morphology}</span>
        <span class="active-mod-chip" style="background:#0ea5e9;">${microData.stainType.toUpperCase()}</span>
      `;
    }

    // Render Decision Tree
    renderDecisionTree(res.decisionSteps);

    // Render Antibiogram Table
    renderAntibiogram(res.antibiogram);
  }

  function renderDecisionTree(steps) {
    if (!elDecisionTreeContainer) return;
    elDecisionTreeContainer.innerHTML = steps.map(s => `
      <div class="tree-step-card">
        <div class="tree-step-title">${s.title}</div>
        <div class="tree-step-val">${s.val}</div>
        <div style="font-size:0.75rem; color:var(--color-text-muted); margin-top:0.2rem;">${s.note}</div>
      </div>
    `).join('');
  }

  function renderAntibiogram(antibiogram) {
    if (!elAntibiogramTableBody) return;
    if (antibiogram.length === 0) {
      elAntibiogramTableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:var(--color-text-muted);">Không có dữ liệu kháng sinh đồ cho mẫu này</td></tr>`;
      return;
    }

    elAntibiogramTableBody.innerHTML = antibiogram.map(item => `
      <tr>
        <td style="font-weight:700; color:var(--color-text);">${item.drug}</td>
        <td style="text-align:center;"><span class="sir-badge ${item.class}">${item.status}</span></td>
        <td style="font-size:0.75rem; color:var(--color-text-muted);">${item.note}</td>
      </tr>
    `).join('');
  }

  // Quiz Challenge
  document.getElementById('btnStartStudioQuiz')?.addEventListener('click', startQuizChallenge);

  function startQuizChallenge() {
    if (!elQuizStudioBox) return;
    elQuizStudioBox.style.display = 'block';
    elQuizStudioBox.scrollIntoView({ behavior: 'smooth' });

    const sc = MICRO_SCENARIOS[Math.floor(Math.random() * MICRO_SCENARIOS.length)];
    loadScenario(sc.id);

    const quizOptionsContainer = document.getElementById('quizStudioOptions');
    if (!quizOptionsContainer) return;

    const allTitles = MICRO_SCENARIOS.map(s => s.title);
    const wrongTitles = allTitles.filter(t => t !== sc.title).sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [sc.title, ...wrongTitles].sort(() => 0.5 - Math.random());

    quizOptionsContainer.innerHTML = `
      <p style="font-size:0.95rem; font-weight:700; color:var(--color-text); margin-bottom:0.75rem;">
        🏥 <strong>Tình huống:</strong> ${sc.patient.demographics}. ${sc.patient.description}
      </p>
      <div class="quiz-options-list">
        ${options.map(opt => `
          <button class="quiz-option-btn" data-val="${opt}">${opt}</button>
        `).join('')}
      </div>
      <div id="quizFeedbackBox" style="margin-top:0.75rem; display:none;"></div>
    `;

    document.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.getAttribute('data-val');
        const feedbackBox = document.getElementById('quizFeedbackBox');
        feedbackBox.style.display = 'block';

        document.querySelectorAll('.quiz-option-btn').forEach(b => {
          b.disabled = true;
          if (b.getAttribute('data-val') === sc.title) {
            b.classList.add('correct');
          } else if (b === btn) {
            b.classList.add('wrong');
          }
        });

        if (selected === sc.title) {
          feedbackBox.innerHTML = `
            <div style="padding:0.8rem; background:rgba(34,197,94,0.15); border:1px solid #22c55e; border-radius:10px; color:#15803d; font-size:0.88rem; font-weight:700;">
              🎉 CHÍNH XÁC! Tác nhân vi sinh: ${sc.title}.<br>
              <span style="font-size:0.8rem; font-weight:normal;">Đặc điểm: ${sc.patient.symptoms.join(', ')}.</span>
            </div>
          `;
        } else {
          feedbackBox.innerHTML = `
            <div style="padding:0.8rem; background:rgba(239,68,68,0.15); border:1px solid #ef4444; border-radius:10px; color:#b91c1c; font-size:0.88rem; font-weight:700;">
              ❌ CHƯA CHÍNH XÁC. Đáp án đúng là: ${sc.title}.<br>
              <span style="font-size:0.8rem; font-weight:normal;">Phân tích: ${sc.patient.description}</span>
            </div>
          `;
        }
      });
    });
  }

  // Initial render
  renderScenariosList();
  loadScenario('sc_mrsa_bacteremia');
});
