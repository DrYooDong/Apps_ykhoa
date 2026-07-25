/**
 * abg-studio.js — Blood Gas Pro Studio
 * Main UI Orchestrator: Quản lý Tab, Sliders, Scenarios, Davenport Canvas Plot,
 * Active Chips, 7-Step Checklist, Oxygenation Metrics & Quiz Mode.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const elPhRange = document.getElementById('inputPhRange');
  const elPhNum = document.getElementById('inputPhNum');
  const elPco2Range = document.getElementById('inputPco2Range');
  const elPco2Num = document.getElementById('inputPco2Num');
  const elHco3Range = document.getElementById('inputHco3Range');
  const elHco3Num = document.getElementById('inputHco3Num');
  const elPao2Range = document.getElementById('inputPao2Range');
  const elPao2Num = document.getElementById('inputPao2Num');
  const elFio2Num = document.getElementById('inputFio2Num');

  const elNaNum = document.getElementById('inputNaNum');
  const elClNum = document.getElementById('inputClNum');
  const elKNum = document.getElementById('inputKNum');
  const elAlbNum = document.getElementById('inputAlbNum');
  const elLactateNum = document.getElementById('inputLactateNum');
  const elGlucoseNum = document.getElementById('inputGlucoseNum');
  const elUreNum = document.getElementById('inputUreNum');
  const elDurationSelect = document.getElementById('selectDuration');
  const elKetoneSelect = document.getElementById('selectKetone');
  const elUrineClNum = document.getElementById('inputUrineClNum');
  const elWeightNum = document.getElementById('inputWeightNum');

  // Display Containers
  const elActiveChips = document.getElementById('activeModifiersChips');
  const elScenarioListGrid = document.getElementById('scenarioListGrid');
  const elPatientPanel = document.getElementById('patientContextPanel');
  const elChecklistContainer = document.getElementById('systematicChecklist');
  const elDiagnosticCriteriaBox = document.getElementById('diagnosticCriteriaBox');
  const elQuizStudioBox = document.getElementById('quizStudioBox');

  // Metrics Displays
  const elPfValue = document.getElementById('dispPfValue');
  const elPfBadge = document.getElementById('dispPfBadge');
  const elAaValue = document.getElementById('dispAaValue');
  const elAgValue = document.getElementById('dispAgValue');
  const elAgCorrValue = document.getElementById('dispAgCorrValue');
  const elDeltaPin = document.getElementById('deltaGaugePin');
  const elDeltaRatioVal = document.getElementById('dispDeltaRatioVal');
  const elBicarbDeficitVal = document.getElementById('dispBicarbDeficitVal');

  // State
  let activeScenarioId = null;
  let activeCategory = 'ALL';
  let activeDdxTab = 'matched';
  let davenportNomogram = null;

  // Helper to clear active scenario highlight when user manually modifies params or drags Nomogram
  function clearActiveScenario() {
    if (activeScenarioId !== null) {
      activeScenarioId = null;
      if (elPatientPanel) elPatientPanel.style.display = 'none';
      renderScenariosList();
    }
  }

  // 1. Initialize Davenport Canvas Plot
  if (typeof ABGDavenportNomogram !== 'undefined') {
    davenportNomogram = new ABGDavenportNomogram('canvasDavenport', (newPh, newPco2) => {
      clearActiveScenario();
      setInputValue(elPhRange, elPhNum, newPh.toFixed(2));
      setInputValue(elPco2Range, elPco2Num, newPco2.toFixed(1));
      triggerABGAnalysis();
    });
  }

  // Helper to sync Range & Number
  function setInputValue(rangeEl, numEl, val) {
    if (rangeEl) rangeEl.value = val;
    if (numEl) numEl.value = val;
  }

  function syncPair(rangeEl, numEl) {
    if (!rangeEl || !numEl) return;
    rangeEl.addEventListener('input', () => {
      clearActiveScenario();
      numEl.value = rangeEl.value;
      triggerABGAnalysis();
    });
    numEl.addEventListener('input', () => {
      clearActiveScenario();
      rangeEl.value = numEl.value;
      triggerABGAnalysis();
    });
  }

  syncPair(elPhRange, elPhNum);
  syncPair(elPco2Range, elPco2Num);
  syncPair(elHco3Range, elHco3Num);
  syncPair(elPao2Range, elPao2Num);

  [elFio2Num, elNaNum, elClNum, elKNum, elAlbNum, elLactateNum, elGlucoseNum, elUreNum, elDurationSelect, elKetoneSelect, elUrineClNum, elWeightNum].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        clearActiveScenario();
        triggerABGAnalysis();
      });
      input.addEventListener('change', () => {
        clearActiveScenario();
        triggerABGAnalysis();
      });
    }
  });

  // Shortcut button to scroll to DDx
  document.getElementById('btnScrollToDDx')?.addEventListener('click', () => {
    const ddxSec = document.getElementById('differentialDiagnosisSection');
    if (ddxSec) ddxSec.scrollIntoView({ behavior: 'smooth' });
  });

  // 2. Render Scenarios List
  function renderScenariosList() {
    if (!elScenarioListGrid || typeof ABG_SCENARIOS === 'undefined') return;
    elScenarioListGrid.innerHTML = '';

    ABG_SCENARIOS.forEach(sc => {
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

  // Load a Scenario
  function loadScenario(scId) {
    const sc = ABG_SCENARIOS.find(s => s.id === scId);
    if (!sc) return;

    activeScenarioId = scId;

    // Load Patient Vitals Panel
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

    // Populate Inputs
    setInputValue(elPhRange, elPhNum, sc.abg.ph);
    setInputValue(elPco2Range, elPco2Num, sc.abg.pco2);
    setInputValue(elHco3Range, elHco3Num, sc.abg.hco3);
    setInputValue(elPao2Range, elPao2Num, sc.abg.pao2);
    if (elFio2Num) elFio2Num.value = sc.abg.fio2;
    if (elNaNum) elNaNum.value = sc.abg.na;
    if (elClNum) elClNum.value = sc.abg.cl;
    if (elKNum) elKNum.value = sc.abg.k;
    if (elAlbNum) elAlbNum.value = sc.abg.alb;
    if (elLactateNum) elLactateNum.value = sc.abg.lactate;
    if (elGlucoseNum) elGlucoseNum.value = sc.abg.glucose;
    if (elUreNum) elUreNum.value = sc.abg.ure;
    if (elDurationSelect) elDurationSelect.value = sc.abg.duration;
    if (elKetoneSelect) elKetoneSelect.value = sc.abg.ketone;
    if (elUrineClNum) elUrineClNum.value = sc.abg.urineCl !== undefined ? sc.abg.urineCl : '';

    renderScenariosList();
    triggerABGAnalysis();
  }

  // Reset Studio
  document.getElementById('btnResetStudio')?.addEventListener('click', () => {
    activeScenarioId = null;
    if (elPatientPanel) elPatientPanel.style.display = 'none';
    setInputValue(elPhRange, elPhNum, 7.40);
    setInputValue(elPco2Range, elPco2Num, 40);
    setInputValue(elHco3Range, elHco3Num, 24);
    setInputValue(elPao2Range, elPao2Num, 95);
    if (elFio2Num) elFio2Num.value = 21;
    if (elNaNum) elNaNum.value = 140;
    if (elClNum) elClNum.value = 100;
    if (elKNum) elKNum.value = 4.0;
    if (elAlbNum) elAlbNum.value = 4.0;
    if (elLactateNum) elLactateNum.value = 1.0;
    if (elGlucoseNum) elGlucoseNum.value = 95;
    if (elUreNum) elUreNum.value = 5.0;
    if (elDurationSelect) elDurationSelect.value = 'acute';
    if (elKetoneSelect) elKetoneSelect.value = 'negative';
    if (elUrineClNum) elUrineClNum.value = '';
    renderScenariosList();
    triggerABGAnalysis();
  });

  // 3. Tab Navigation & Preset Pills
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

  // Preset Buttons in Tab 2
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-preset');
      if (preset === 'dka') loadScenario('sc_dka_severe');
      else if (preset === 'vomiting') loadScenario('sc_severe_vomiting');
      else if (preset === 'copd') loadScenario('sc_copd_exacerbation');
      else if (preset === 'panic') loadScenario('sc_panic_hyperventilation');
      else if (preset === 'sepsis') loadScenario('sc_septic_shock');
      else if (preset === 'ards') loadScenario('sc_ards_severe');
    });
  });

  // 4. ABG Analysis Trigger
  function triggerABGAnalysis() {
    const inputData = {
      ph: elPhNum ? elPhNum.value : 7.4,
      pco2: elPco2Num ? elPco2Num.value : 40,
      hco3: elHco3Num ? elHco3Num.value : 24,
      pao2: elPao2Num ? elPao2Num.value : 95,
      fio2: elFio2Num ? elFio2Num.value : 21,
      na: elNaNum ? elNaNum.value : 140,
      cl: elClNum ? elClNum.value : 100,
      k: elKNum ? elKNum.value : 4.0,
      alb: elAlbNum ? elAlbNum.value : 4.0,
      lactate: elLactateNum ? elLactateNum.value : 1.0,
      glucose: elGlucoseNum ? elGlucoseNum.value : 95,
      ure: elUreNum ? elUreNum.value : 5.0,
      duration: elDurationSelect ? elDurationSelect.value : 'acute',
      ketone: elKetoneSelect ? elKetoneSelect.value : 'negative',
      urineCl: elUrineClNum ? elUrineClNum.value : null,
      weight: elWeightNum ? elWeightNum.value : 60
    };

    const res = ABGEngine.analyze(inputData);

    // Update Davenport Canvas Plot
    if (davenportNomogram) {
      davenportNomogram.plotPoint(parseFloat(inputData.ph), parseFloat(inputData.pco2));
    }

    // Active Modifiers Chips Bar
    if (elActiveChips) {
      elActiveChips.innerHTML = `
        <span class="active-mod-chip">pH: ${inputData.ph}</span>
        <span class="active-mod-chip">PaCO₂: ${inputData.pco2} mmHg</span>
        <span class="active-mod-chip">HCO₃⁻: ${inputData.hco3} mEq/L</span>
        <span class="active-mod-chip">PaO₂: ${inputData.pao2} mmHg</span>
        ${activeScenarioId ? `<span class="active-mod-chip" style="background:#8b5cf6;">Ca: ${ABG_SCENARIOS.find(s=>s.id===activeScenarioId)?.title}</span>` : ''}
      `;
    }

    // Oxygenation & Metrics
    if (res.oxygenation) {
      if (elPfValue) elPfValue.textContent = res.oxygenation.pf ? `${res.oxygenation.pf.toFixed(0)}` : 'N/A';
      if (elPfBadge) {
        elPfBadge.className = `metric-status-badge ${res.oxygenation.badge}`;
        elPfBadge.textContent = res.oxygenation.ards;
      }
    }

    if (res.aaGradient && elAaValue) {
      elAaValue.textContent = `${res.aaGradient.aaGradient.toFixed(1)} mmHg (BT: < ${res.aaGradient.expectedAa.toFixed(1)})`;
    }

    if (elAgValue) elAgValue.textContent = `${res.anionGap.toFixed(1)} mEq/L`;
    if (elAgCorrValue) elAgCorrValue.textContent = `${res.agCorr.toFixed(1)} mEq/L`;

    // Delta Ratio Bar Pin
    if (elDeltaPin) {
      const pinPercent = Math.min(100, Math.max(0, (res.deltaRatio / 2.5) * 100));
      elDeltaPin.style.left = `${pinPercent}%`;
    }
    if (elDeltaRatioVal) elDeltaRatioVal.textContent = res.deltaRatio ? res.deltaRatio.toFixed(2) : 'N/A';
    if (elBicarbDeficitVal) elBicarbDeficitVal.textContent = res.bicarbDeficit > 0 ? `${res.bicarbDeficit.toFixed(0)} mEq` : '0 mEq (Bình thường)';

    // Render 7-Step Checklist
    renderChecklist(res);

    // Render Diagnostic Criteria
    renderCriteria(res);

    // Render Differential Diagnosis Studio Section
    renderDifferentialDiagnosis(inputData, res);
  }

  function renderChecklist(res) {
    if (!elChecklistContainer) return;
    elChecklistContainer.innerHTML = `
      <!-- Step 1 -->
      <div class="chk-item ${res.isValid ? 'status-valid' : 'status-invalid'}">
        <div class="chk-header">
          <span class="chk-num">Bước 1: Kiểm định Henderson-Hasselbalch</span>
          <span class="chk-val">${res.isValid ? '✅ Hợp lệ' : '❌ Không hợp lệ'}</span>
        </div>
        <div class="chk-note">${res.validationText}</div>
      </div>

      <!-- Step 2 -->
      <div class="chk-item status-info">
        <div class="chk-header">
          <span class="chk-num">Bước 2: Oxy hóa máu & Trao đổi khí</span>
          <span class="chk-val">${res.oxygenation?.ards || 'Bình thường'}</span>
        </div>
        <div class="chk-note">${res.oxygenation?.text || ''} ${res.aaGradient ? `<br>Gradient A-a DO₂: <strong>${res.aaGradient.aaGradient.toFixed(1)} mmHg</strong> ${res.aaGradient.isElevated ? '(Tăng cao — Gợi ý Shunt hoặc Bất tương hợp V/Q)' : '(Bình thường)'}` : ''}</div>
      </div>

      <!-- Step 3 -->
      <div class="chk-item status-primary">
        <div class="chk-header">
          <span class="chk-num">Bước 3: Rối loạn Nguyên phát</span>
          <span class="chk-val">${res.primaryDisorder}</span>
        </div>
        <div class="chk-note">Dựa trên phân tích tương quan giữa pH (${elPhNum?.value}) và PaCO₂ / HCO₃⁻.</div>
      </div>

      <!-- Step 4 -->
      <div class="chk-item status-warning">
        <div class="chk-header">
          <span class="chk-num">Bước 4: Đáp ứng Bù trừ Sinh lý</span>
          <span class="chk-val">Kiểm tra đáp ứng</span>
        </div>
        <div class="chk-note">${res.compensationText || 'Không có rối loạn nguyên phát rõ rệt.'}</div>
      </div>

      <!-- Step 5 -->
      <div class="chk-item ${res.hasHighAG ? 'status-invalid' : 'status-valid'}">
        <div class="chk-header">
          <span class="chk-num">Bước 5: Anion Gap (AG) & Albumin</span>
          <span class="chk-val">${res.hasHighAG ? 'TĂNG AG' : 'AG Bình thường'}</span>
        </div>
        <div class="chk-note">AG thực tế: ${res.anionGap.toFixed(1)} | AG hiệu chỉnh Albumin: <strong>${res.agCorr.toFixed(1)} mEq/L</strong> (Chuẩn: 12 ± 2).</div>
      </div>

      <!-- Step 6 -->
      <div class="chk-item status-info">
        <div class="chk-header">
          <span class="chk-num">Bước 6: Tỷ lệ Delta Ratio (ΔGap / ΔHCO₃⁻)</span>
          <span class="chk-val">${res.hasHighAG ? res.deltaRatio.toFixed(2) : 'N/A'}</span>
        </div>
        <div class="chk-note">${res.hasHighAG ? res.deltaText : 'Chỉ tính tỷ lệ Delta khi có Toan chuyển hóa tăng AG.'}</div>
      </div>

      <!-- Step 7 -->
      <div class="chk-item status-critical">
        <div class="chk-header">
          <span class="chk-num">Bước 7: Chẩn đoán & Gợi ý Nguyên nhân</span>
          <span class="chk-val">${res.conclusions.length} Kết luận</span>
        </div>
        <div class="chk-note">
          <strong style="color:var(--color-primary);">${res.conclusions.join(' + ')}</strong>
          ${res.causesList.length > 0 ? `<ul style="margin-top:0.3rem; padding-left:1.1rem;">${res.causesList.map(c=>`<li><strong>${c.name}</strong> (${c.clues.join(', ')})</li>`).join('')}</ul>` : ''}
        </div>
      </div>
    `;
  }

  function renderCriteria(res) {
    if (!elDiagnosticCriteriaBox) return;
    const warningsHTML = res.warnings.length > 0 ? `<div style="margin-top:0.5rem; padding:0.6rem; background:rgba(239,68,68,0.1); border-left:3px solid #ef4444; border-radius:6px;"><ul style="margin:0; padding-left:1.1rem; font-size:0.8rem;">${res.warnings.map(w=>`<li style="margin-bottom:0.3rem;">${w}</li>`).join('')}</ul></div>` : '';

    const urineClInfo = ABG_CRITERIA.getUrineClCriteria(elUrineClNum ? elUrineClNum.value : null);

    elDiagnosticCriteriaBox.innerHTML = `
      <div style="font-size:0.85rem; line-height:1.5;">
        <h4 style="font-size:0.9rem; font-weight:800; color:var(--color-primary); margin-bottom:0.4rem;">💡 Tiêu Chuẩn & Cảnh Báo Lâm Sàng</h4>
        <p style="margin-bottom:0.5rem;"><strong>Kiểm định Chloride Niệu:</strong> ${urineClInfo.type}<br><small style="color:var(--color-text-muted);">${urineClInfo.advice}</small></p>
        ${warningsHTML}
      </div>
    `;
  }

  // 6. Differential Diagnosis Renderer
  function renderDifferentialDiagnosis(inputData, res) {
    const elSummary = document.getElementById('ddxDynamicActiveSummary');
    const elTabs = document.getElementById('ddxTabPillsList');
    const elContent = document.getElementById('ddxCategoryContentBox');
    if (!elContent) return;

    if (typeof ABGEngine.getDifferentialDiagnoses !== 'function') return;
    const categories = ABGEngine.getDifferentialDiagnoses(inputData, res);
    const matchedCats = categories.filter(c => c.isMatched);

    // 1. Dynamic Summary Alert Box
    if (elSummary) {
      if (matchedCats.length > 0) {
        elSummary.innerHTML = `
          <div class="ddx-active-alert">
            <div style="font-size: 0.95rem; font-weight: 800; color: var(--color-primary); margin-bottom: 0.35rem;">
              ⚡ PHÂN TÍCH CHẨN ĐOÁN PHÂN BIỆT ĐANG TƯƠNG THÍCH VỚI KẾT QUẢ KHÍ MÁU:
            </div>
            <div style="font-size: 0.88rem; font-weight: 700; color: var(--color-text); margin-bottom: 0.4rem;">
              ➔ Chẩn đoán chính: <span style="color: var(--color-danger);">${res.conclusions.join(' + ')}</span>
            </div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              ${matchedCats.map(c => `<span class="ddx-match-pill"><i class="fa-solid fa-circle-check"></i> ${c.title} (${c.badge})</span>`).join('')}
            </div>
          </div>
        `;
      } else {
        elSummary.innerHTML = `
          <div class="ddx-active-alert" style="border-left-color: #22c55e;">
            <div style="font-size: 0.9rem; font-weight: 700; color: #15803d;">
              ✅ Khí máu động mạch trong giới hạn bình thường. Tra cứu các bảng chẩn đoán phân biệt bên dưới nếu nghi ngờ rối loạn kiềm toan ẩn.
            </div>
          </div>
        `;
      }
    }

    // 2. Render Tab Pills
    if (elTabs) {
      const tabOptions = [
        { id: 'matched', label: '📌 Phù Hợp Hiện Tại', count: matchedCats.length },
        { id: 'all', label: 'Tất Cả Rối Loạn' },
        { id: 'highAG', label: '🧪 Toan CH Tăng AG' },
        { id: 'normalAG', label: '💧 Toan CH AG BT' },
        { id: 'metAlkalosis', label: '🤮 Kiềm CH' },
        { id: 'respAcidosis', label: '🫁 Toan HH' },
        { id: 'respAlkalosis', label: '💨 Kiềm HH' },
        { id: 'mixedDisorders', label: '⚡ Ca Hỗn Hợp' }
      ];

      elTabs.innerHTML = tabOptions.map(t => `
        <button class="ddx-tab-btn ${activeDdxTab === t.id ? 'active' : ''}" data-ddxtab="${t.id}">
          ${t.label} ${t.count !== undefined ? `<span class="ddx-tab-badge">${t.count}</span>` : ''}
        </button>
      `).join('');

      elTabs.querySelectorAll('.ddx-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          activeDdxTab = btn.getAttribute('data-ddxtab');
          renderDifferentialDiagnosis(inputData, res);
        });
      });
    }

    // 3. Render Categories Content
    let displayCats = [];
    if (activeDdxTab === 'matched') {
      displayCats = matchedCats.length > 0 ? matchedCats : categories;
    } else if (activeDdxTab === 'all') {
      displayCats = categories;
    } else {
      displayCats = categories.filter(c => c.id === activeDdxTab);
    }

    if (displayCats.length === 0) {
      elContent.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--color-text-muted);">Không tìm thấy nhóm chẩn đoán phân biệt phù hợp.</div>`;
      return;
    }

    elContent.innerHTML = displayCats.map(cat => `
      <div class="ddx-category-box ${cat.isMatched ? 'is-matched' : ''}">
        <div class="ddx-cat-header">
          <div>
            <h3 class="ddx-cat-title">
              ${cat.isMatched ? '<i class="fa-solid fa-circle-exclamation" style="color:var(--color-danger);"></i>' : '<i class="fa-solid fa-book-medical"></i>'}
              ${cat.title}
            </h3>
            <p class="ddx-cat-desc">${cat.description}</p>
          </div>
          <span class="ddx-cat-badge">${cat.badge}</span>
        </div>

        <div class="ddx-items-grid">
          ${cat.items.map(item => `
            <div class="ddx-item-card priority-${item.priority.toLowerCase()}">
              <div class="ddx-item-header">
                <span class="ddx-item-name">${item.name}</span>
                <span class="ddx-priority-tag priority-${item.priority.toLowerCase()}">
                  ${item.priority === 'CRITICAL' ? '🔴 NGUY CƠ CAO' : item.priority === 'HIGH' ? '🟠 ƯU TIÊN' : '🟡 THEO DÕI'}
                </span>
              </div>
              <p class="ddx-item-clues"><strong>Manh mối:</strong> ${item.clues}</p>
              <div class="ddx-item-lab">
                <i class="fa-solid fa-vial"></i> <strong>Cận lâm sàng đề xuất:</strong> ${item.labSuggest}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // 5. Quiz Challenge Mode
  document.getElementById('btnStartStudioQuiz')?.addEventListener('click', startQuizChallenge);

  function startQuizChallenge() {
    if (!elQuizStudioBox) return;
    elQuizStudioBox.style.display = 'block';
    elQuizStudioBox.scrollIntoView({ behavior: 'smooth' });

    // Pick a random scenario
    const sc = ABG_SCENARIOS[Math.floor(Math.random() * ABG_SCENARIOS.length)];
    loadScenario(sc.id);

    const quizOptionsContainer = document.getElementById('quizStudioOptions');
    if (!quizOptionsContainer) return;

    // Distractors
    const allTitles = ABG_SCENARIOS.map(s => s.title);
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
              🎉 CHÍNH XÁC! Chẩn đoán đúng: ${sc.title}.<br>
              <span style="font-size:0.8rem; font-weight:normal;">Lý giải: ${sc.patient.symptoms.join(', ')}.</span>
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

  // Render initial scenario
  renderScenariosList();
  loadScenario('sc_dka_severe');
});
