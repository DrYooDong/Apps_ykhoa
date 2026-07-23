/**
 * electrolyte-studio.js — Electrolyte Pro Studio
 * Main UI Orchestrator: Quản lý Tab, Sliders, Scenarios, Canvas Plot,
 * Dynamic Adrogué-Madias Gauges, Directives Card Rendering & Quiz Challenge.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const elNaCurrentRange = document.getElementById('inputNaCurrentRange');
  const elNaCurrentNum = document.getElementById('inputNaCurrentNum');
  const elNaTargetRange = document.getElementById('inputNaTargetRange');
  const elNaTargetNum = document.getElementById('inputNaTargetNum');
  const elNaFluidSelect = document.getElementById('selectNaFluid');

  const elKValRange = document.getElementById('inputKValRange');
  const elKValNum = document.getElementById('inputKValNum');
  const elKEcgSelect = document.getElementById('selectKEcg');
  const elKSympSelect = document.getElementById('selectKSymp');

  const elCaValRange = document.getElementById('inputCaValRange');
  const elCaValNum = document.getElementById('inputCaValNum');
  const elCaAlbNum = document.getElementById('inputCaAlbNum');
  const elCaSympSelect = document.getElementById('selectCaSymp');

  const elMgValNum = document.getElementById('inputMgValNum');
  const elWeightNum = document.getElementById('inputWeightNum');
  const elAgeNum = document.getElementById('inputAgeNum');
  const elGenderSelect = document.getElementById('selectGender');
  const elSymptomsSelect = document.getElementById('selectSymptoms');

  // Containers
  const elActiveChips = document.getElementById('activeModifiersChips');
  const elScenarioListGrid = document.getElementById('scenarioListGrid');
  const elPatientPanel = document.getElementById('patientContextPanel');
  const elDirectivesContainer = document.getElementById('directivesContainer');
  const elQuizStudioBox = document.getElementById('quizStudioBox');

  // Metrics Displays
  const elDispTbw = document.getElementById('dispTbwValue');
  const elDispDeltaAdrogue = document.getElementById('dispDeltaAdrogueValue');
  const elDispInfusionRate = document.getElementById('dispInfusionRateValue');
  const elDispWaterDeficit = document.getElementById('dispWaterDeficitValue');
  const elDispHypoProtocolAlert = document.getElementById('hypoEmergencyProtocolAlert');

  // State
  let activeScenarioId = null;
  let activeCategory = 'ALL';
  let balanceCanvas = null;

  // Initialize Canvas
  if (typeof ElectrolyteBalanceCanvas !== 'undefined') {
    balanceCanvas = new ElectrolyteBalanceCanvas('canvasElectrolyteBalance');
  }

  function setInputValue(rangeEl, numEl, val) {
    if (rangeEl) rangeEl.value = val;
    if (numEl) numEl.value = val;
  }

  function syncPair(rangeEl, numEl) {
    if (!rangeEl || !numEl) return;
    rangeEl.addEventListener('input', () => {
      numEl.value = rangeEl.value;
      triggerAnalysis();
    });
    numEl.addEventListener('input', () => {
      rangeEl.value = numEl.value;
      triggerAnalysis();
    });
  }

  syncPair(elNaCurrentRange, elNaCurrentNum);
  syncPair(elNaTargetRange, elNaTargetNum);
  syncPair(elKValRange, elKValNum);
  syncPair(elCaValRange, elCaValNum);

  [elNaFluidSelect, elKEcgSelect, elKSympSelect, elCaAlbNum, elCaSympSelect, elMgValNum, elWeightNum, elAgeNum, elGenderSelect, elSymptomsSelect].forEach(input => {
    if (input) {
      input.addEventListener('input', triggerAnalysis);
      input.addEventListener('change', triggerAnalysis);
    }
  });

  document.querySelectorAll('.ods-risk-checkbox').forEach(cb => {
    cb.addEventListener('change', triggerAnalysis);
  });

  // Render Scenarios List
  function renderScenariosList() {
    if (!elScenarioListGrid || typeof ELECTROLYTE_SCENARIOS === 'undefined') return;
    elScenarioListGrid.innerHTML = '';

    ELECTROLYTE_SCENARIOS.forEach(sc => {
      if (activeCategory !== 'ALL' && sc.category !== activeCategory) return;

      const card = document.createElement('div');
      card.className = `scenario-card ${activeScenarioId === sc.id ? 'active' : ''}`;
      card.innerHTML = `
        <div class="scenario-card-header">
          <span class="scenario-card-title">${sc.title}</span>
          <span class="scenario-diff-badge" style="background:${sc.badgeColor}; color:#fff;">${sc.category}</span>
        </div>
        <p style="font-size:0.78rem; color:var(--color-text-muted); margin:0;">${sc.patient.demographics}</p>
      `;
      card.addEventListener('click', () => loadScenario(sc.id));
      elScenarioListGrid.appendChild(card);
    });
  }

  function loadScenario(scId) {
    const sc = ELECTROLYTE_SCENARIOS.find(s => s.id === scId);
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
      document.getElementById('patContextDesc').textContent = sc.patient.description;

      const sympList = document.getElementById('patSymptomsList');
      if (sympList) {
        sympList.innerHTML = sc.patient.symptoms.map(s => `<li>• ${s}</li>`).join('');
      }
    }

    setInputValue(elNaCurrentRange, elNaCurrentNum, sc.elyte.naCurrent);
    setInputValue(elNaTargetRange, elNaTargetNum, sc.elyte.naTarget);
    if (elNaFluidSelect) elNaFluidSelect.value = sc.elyte.naFluid;

    setInputValue(elKValRange, elKValNum, sc.elyte.kVal);
    if (elKEcgSelect) elKEcgSelect.value = sc.elyte.kEcg;
    if (elKSympSelect) elKSympSelect.value = sc.elyte.kSymp;

    setInputValue(elCaValRange, elCaValNum, sc.elyte.caVal);
    if (elCaAlbNum) elCaAlbNum.value = sc.elyte.caAlb;
    if (elCaSympSelect) elCaSympSelect.value = sc.elyte.caSymp;

    if (elMgValNum) elMgValNum.value = sc.elyte.mgVal;
    if (elWeightNum) elWeightNum.value = sc.elyte.weight;
    if (elAgeNum) elAgeNum.value = sc.elyte.age;
    if (elGenderSelect) elGenderSelect.value = sc.elyte.gender;
    if (elSymptomsSelect) elSymptomsSelect.value = sc.elyte.symptoms;

    document.querySelectorAll('.ods-risk-checkbox').forEach(cb => {
      cb.checked = sc.elyte.odsRisks && sc.elyte.odsRisks.includes(cb.value);
    });

    renderScenariosList();
    triggerAnalysis();
  }

  document.getElementById('btnResetStudio')?.addEventListener('click', () => {
    activeScenarioId = null;
    if (elPatientPanel) elPatientPanel.style.display = 'none';
    setInputValue(elNaCurrentRange, elNaCurrentNum, 118);
    setInputValue(elNaTargetRange, elNaTargetNum, 124);
    if (elNaFluidSelect) elNaFluidSelect.value = 513;
    setInputValue(elKValRange, elKValNum, 4.0);
    if (elKEcgSelect) elKEcgSelect.value = 0;
    if (elKSympSelect) elKSympSelect.value = 0;
    setInputValue(elCaValRange, elCaValNum, 2.25);
    if (elCaAlbNum) elCaAlbNum.value = 40;
    if (elCaSympSelect) elCaSympSelect.value = 0;
    if (elMgValNum) elMgValNum.value = 0.85;
    if (elWeightNum) elWeightNum.value = 60;
    if (elAgeNum) elAgeNum.value = 50;
    if (elGenderSelect) elGenderSelect.value = 'male';
    if (elSymptomsSelect) elSymptomsSelect.value = 'severe';
    document.querySelectorAll('.ods-risk-checkbox').forEach(cb => cb.checked = false);

    renderScenariosList();
    triggerAnalysis();
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

  function getCheckedOdsRisks() {
    const arr = [];
    document.querySelectorAll('.ods-risk-checkbox:checked').forEach(cb => arr.push(cb.value));
    return arr;
  }

  // Trigger Analysis Engine
  function triggerAnalysis() {
    const elyteData = {
      naCurrent: elNaCurrentNum ? elNaCurrentNum.value : 135,
      naTarget: elNaTargetNum ? elNaTargetNum.value : 140,
      naFluid: elNaFluidSelect ? elNaFluidSelect.value : 513,
      kVal: elKValNum ? parseFloat(elKValNum.value) : 4.0,
      kEcg: elKEcgSelect ? parseInt(elKEcgSelect.value) : 0,
      kSymp: elKSympSelect ? parseInt(elKSympSelect.value) : 0,
      caVal: elCaValNum ? parseFloat(elCaValNum.value) : 2.25,
      caAlb: elCaAlbNum ? parseFloat(elCaAlbNum.value) : 40,
      caSymp: elCaSympSelect ? parseInt(elCaSympSelect.value) : 0,
      mgVal: elMgValNum ? parseFloat(elMgValNum.value) : 0.85,
      weight: elWeightNum ? elWeightNum.value : 60,
      age: elAgeNum ? elAgeNum.value : 50,
      gender: elGenderSelect ? elGenderSelect.value : 'male',
      symptoms: elSymptomsSelect ? elSymptomsSelect.value : 'severe',
      odsRisks: getCheckedOdsRisks()
    };

    const res = ElectrolyteEngine.analyze(elyteData);

    // Render Canvas
    if (balanceCanvas) {
      balanceCanvas.render(elyteData);
    }

    // Active Chips
    if (elActiveChips) {
      elActiveChips.innerHTML = `
        <span class="active-mod-chip">Na⁺: ${elyteData.naCurrent}</span>
        <span class="active-mod-chip" style="background:#f59e0b;">K⁺: ${elyteData.kVal}</span>
        <span class="active-mod-chip" style="background:#8b5cf6;">Ca²⁺: ${elyteData.caVal}</span>
        <span class="active-mod-chip" style="background:#10b981;">Mg²⁺: ${elyteData.mgVal}</span>
        ${activeScenarioId ? `<span class="active-mod-chip" style="background:#6366f1;">Ca: ${ELECTROLYTE_SCENARIOS.find(s=>s.id===activeScenarioId)?.title}</span>` : ''}
      `;
    }

    // Update Metrics Display
    if (elDispTbw) elDispTbw.textContent = `${res.tbw.toFixed(1)} Lít (Hệ số: ${res.tbwFactor})`;
    if (elDispDeltaAdrogue) {
      const fluidName = elNaFluidSelect ? elNaFluidSelect.options[elNaFluidSelect.selectedIndex].text.split(' (')[0] : 'Dịch';
      elDispDeltaAdrogue.innerHTML = `Truyền 1L <strong>${fluidName}</strong>: Na⁺ sẽ <strong>${res.deltaNa1L > 0 ? 'TĂNG' : 'GIẢM'} ${Math.abs(res.deltaNa1L).toFixed(2)} mmol/L</strong>`;
    }

    if (elDispInfusionRate) {
      if (res.isMismatch) {
        elDispInfusionRate.innerHTML = `<span style="color:#ef4444; font-weight:700;">⚠️ Chọn sai loại dịch! Dịch này biến thiên ngược mục tiêu.</span>`;
      } else if (res.reqChange === 0) {
        elDispInfusionRate.textContent = `0 mL/giờ (Natri đã đạt mục tiêu)`;
      } else {
        elDispInfusionRate.innerHTML = `Tổng thể tích: <strong>${Math.round(res.reqVolMl)} mL</strong> (${(res.reqVolLiters).toFixed(2)}L)<br>Vận tốc truyền: <strong><span class="dose-highlight">${res.infusionRateMlHr} mL/giờ</span></strong> (Kéo dài $\\ge$ ${res.safeTimeHours}h)`;
      }
    }

    if (elDispWaterDeficit) {
      elDispWaterDeficit.textContent = res.waterDeficit > 0 ? `${res.waterDeficit.toFixed(2)} Lít nước tự do` : '0 Lít (Không dư/thiếu Natri)';
    }

    // Emergency Protocol Alert Card
    if (elDispHypoProtocolAlert) {
      if (elyteData.naCurrent < 130 && elyteData.symptoms === 'severe') {
        elDispHypoProtocolAlert.style.display = 'block';
        elDispHypoProtocolAlert.innerHTML = `
          <div style="background:rgba(239,68,68,0.12); border:2px solid #ef4444; border-radius:12px; padding:0.85rem; color:#b91c1c; font-size:0.85rem;">
            <strong>🚨 Y LỆNH KHẨN CẤP KHÔNG TRÌ HOÃN (EMERGENCY BOLUS PROTOCOL):</strong><br>
            • Bệnh nhân Hạ Natri máu nặng kèm triệu chứng thần kinh nguy kịch.<br>
            • <strong>Y LỆNH: Tiêm tĩnh mạch nhanh <span class="dose-highlight">100 - 150 mL dung dịch NaCl 3% trong 20 phút</span></strong>.<br>
            • Lặp lại tối đa 2 lần nữa (mỗi 20 phút) nếu chưa đỡ co giật.
          </div>
        `;
      } else {
        elDispHypoProtocolAlert.style.display = 'none';
      }
    }

    // Render Directives
    renderDirectives(res.directives);
  }

  function renderDirectives(directives) {
    if (!elDirectivesContainer) return;
    elDirectivesContainer.innerHTML = directives.map(d => `
      <div class="directive-card ${d.priority}">
        <div class="directive-title">${d.icon} ${d.title}</div>
        <ul class="directive-list">
          ${d.commands.map(cmd => `<li>${cmd}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  // Quiz Challenge
  document.getElementById('btnStartStudioQuiz')?.addEventListener('click', startQuizChallenge);

  function startQuizChallenge() {
    if (!elQuizStudioBox) return;
    elQuizStudioBox.style.display = 'block';
    elQuizStudioBox.scrollIntoView({ behavior: 'smooth' });

    const sc = ELECTROLYTE_SCENARIOS[Math.floor(Math.random() * ELECTROLYTE_SCENARIOS.length)];
    loadScenario(sc.id);

    const quizOptionsContainer = document.getElementById('quizStudioOptions');
    if (!quizOptionsContainer) return;

    const allTitles = ELECTROLYTE_SCENARIOS.map(s => s.title);
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
              🎉 CHÍNH XÁC! Xử trí chuẩn: ${sc.title}.<br>
              <span style="font-size:0.8rem; font-weight:normal;">Chi tiết: ${sc.patient.symptoms.join(', ')}.</span>
            </div>
          `;
        } else {
          feedbackBox.innerHTML = `
            <div style="padding:0.8rem; background:rgba(239,68,68,0.15); border:1px solid #ef4444; border-radius:10px; color:#b91c1c; font-size:0.88rem; font-weight:700;">
              ❌ CHƯA CHÍNH XÁC. Đáp án đúng là: ${sc.title}.<br>
              <span style="font-size:0.8rem; font-weight:normal;">Bệnh cảnh: ${sc.patient.description}</span>
            </div>
          `;
        }
      });
    });
  }

  // Initial load
  renderScenariosList();
  loadScenario('sc_severe_hyponatremia_seizure');
});
