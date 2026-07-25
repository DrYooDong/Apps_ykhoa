/**
 * cxr-studio.js — Chest X-Ray Pro Studio
 * Main UI Orchestrator: Quản lý Tab, Mixer Layers, SVG Rendering, Virtual CTR Ruler,
 * ABCDE Checklist, Emergency Alerts & Quiz Mode.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const elActiveChips = document.getElementById('activeModifiersChips');
  const elScenarioListGrid = document.getElementById('scenarioListGrid');
  const elPatientPanel = document.getElementById('patientContextPanel');
  const elChecklistContainer = document.getElementById('systematicChecklist');
  const elDiagnosticCriteriaBox = document.getElementById('diagnosticCriteriaBox');
  const elQuizStudioBox = document.getElementById('quizStudioBox');
  const elCtrValueDisplay = document.getElementById('dispCtrValue');
  const elBtnInvertXray = document.getElementById('btnInvertXray');
  const elSliderContrast = document.getElementById('inputContrast');
  const elSliderBrightness = document.getElementById('inputBrightness');

  // Active Layers State
  let layersState = {
    consolidationR: false,
    ggo: false,
    pneumothoraxR: false,
    effusionR: false,
    cavity: false,
    nodule: false,
    atelectasis: false,
    pulmonaryEdema: false,
    cardiomegaly: false,
    aorticKnob: false,
    ribFracture: false,
    emphysema: false
  };

  let activeScenarioId = null;
  let activeCategory = 'ALL';
  let svgEngine = null;
  let canvasEngine = null;

  // Initialize SVG Engine
  if (typeof CXRSVGEngine !== 'undefined') {
    svgEngine = new CXRSVGEngine('cxrSvgContainer');
  }

  // Initialize Canvas DICOM Post-Processing Engine if container exists
  const canvasContainer = document.getElementById('cxrCanvasContainer');
  if (typeof CXRCanvasEngine !== 'undefined' && canvasContainer) {
    canvasEngine = new CXRCanvasEngine('cxrCanvasContainer');
  }

  // Layer Checkbox Listeners
  const layerCheckboxes = {
    consolidationR: 'chkConsolidationR',
    ggo: 'chkGgo',
    pneumothoraxR: 'chkPneumothoraxR',
    effusionR: 'chkEffusionR',
    cavity: 'chkCavity',
    pulmonaryEdema: 'chkPulmonaryEdema',
    cardiomegaly: 'chkCardiomegaly',
    aorticKnob: 'chkAorticKnob',
    ribFracture: 'chkRibFracture',
    emphysema: 'chkEmphysema'
  };

  Object.keys(layerCheckboxes).forEach(key => {
    const el = document.getElementById(layerCheckboxes[key]);
    if (el) {
      el.addEventListener('change', () => {
        layersState[key] = el.checked;
        triggerCXRAnalysis();
      });
    }
  });

  // Toolbar Invert & Adjustments
  if (elBtnInvertXray) {
    elBtnInvertXray.addEventListener('click', () => {
      if (svgEngine) {
        const isInv = svgEngine.toggleInvert();
        elBtnInvertXray.classList.toggle('active', isInv);
        triggerCXRAnalysis();
      }
    });
  }

  const elBtnToggleVasculature = document.getElementById('btnToggleVasculature');
  if (elBtnToggleVasculature) {
    elBtnToggleVasculature.addEventListener('click', () => {
      if (svgEngine) {
        svgEngine.showVasculature = !svgEngine.showVasculature;
        elBtnToggleVasculature.classList.toggle('active', svgEngine.showVasculature);
        triggerCXRAnalysis();
      }
    });
  }

  const elBtnToggleAnnotations = document.getElementById('btnToggleAnnotations');
  if (elBtnToggleAnnotations) {
    elBtnToggleAnnotations.addEventListener('click', () => {
      if (svgEngine) {
        svgEngine.showAnnotations = !svgEngine.showAnnotations;
        elBtnToggleAnnotations.classList.toggle('active', svgEngine.showAnnotations);
        triggerCXRAnalysis();
      }
    });
  }

  const elBtnToggleSharpen = document.getElementById('btnToggleSharpen');
  if (elBtnToggleSharpen) {
    elBtnToggleSharpen.addEventListener('click', () => {
      if (canvasEngine) {
        canvasEngine.edgeEnhance = !canvasEngine.edgeEnhance;
        elBtnToggleSharpen.classList.toggle('active', canvasEngine.edgeEnhance);
        triggerCXRAnalysis();
      } else {
        elBtnToggleSharpen.classList.toggle('active');
      }
    });
  }

  const elBtnToggleBoneFilter = document.getElementById('btnToggleBoneFilter');
  if (elBtnToggleBoneFilter) {
    elBtnToggleBoneFilter.addEventListener('click', () => {
      if (canvasEngine) {
        canvasEngine.boneFilter = !canvasEngine.boneFilter;
        elBtnToggleBoneFilter.classList.toggle('active', canvasEngine.boneFilter);
        triggerCXRAnalysis();
      } else {
        elBtnToggleBoneFilter.classList.toggle('active');
      }
    });
  }

  document.querySelectorAll('.btn-lut-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-lut-preset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lut = btn.getAttribute('data-lut');
      if (canvasEngine) {
        canvasEngine.colormap = lut;
        triggerCXRAnalysis();
      }
    });
  });

  document.querySelectorAll('.btn-dicom-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-dicom-preset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const preset = btn.getAttribute('data-preset');
      if (svgEngine) {
        svgEngine.setWindowPreset(preset);
        if (elSliderContrast) elSliderContrast.value = svgEngine.contrast;
        if (elSliderBrightness) elSliderBrightness.value = svgEngine.brightness;
        triggerCXRAnalysis();
      }
    });
  });

  if (elSliderContrast) {
    elSliderContrast.addEventListener('input', () => {
      if (svgEngine) svgEngine.contrast = elSliderContrast.value;
      triggerCXRAnalysis();
    });
  }

  if (elSliderBrightness) {
    elSliderBrightness.addEventListener('input', () => {
      if (svgEngine) svgEngine.brightness = elSliderBrightness.value;
      triggerCXRAnalysis();
    });
  }

  // Render Scenarios List
  function renderScenariosList() {
    if (!elScenarioListGrid || typeof CXR_SCENARIOS === 'undefined') return;
    elScenarioListGrid.innerHTML = '';

    CXR_SCENARIOS.forEach(sc => {
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
    const sc = CXR_SCENARIOS.find(s => s.id === scId);
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

    // Set layers
    layersState = { ...sc.layers };
    Object.keys(layerCheckboxes).forEach(key => {
      const el = document.getElementById(layerCheckboxes[key]);
      if (el) el.checked = !!layersState[key];
    });

    renderScenariosList();
    triggerCXRAnalysis();
  }

  document.getElementById('btnResetStudio')?.addEventListener('click', () => {
    activeScenarioId = null;
    if (elPatientPanel) elPatientPanel.style.display = 'none';
    Object.keys(layersState).forEach(k => layersState[k] = false);
    Object.keys(layerCheckboxes).forEach(key => {
      const el = document.getElementById(layerCheckboxes[key]);
      if (el) el.checked = false;
    });
    renderScenariosList();
    triggerCXRAnalysis();
  });

  // Tab & Category Pills Navigation
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
  function triggerCXRAnalysis() {
    const heartWidthPx = layersState.cardiomegaly ? 260 : 180;
    const thoraxWidthPx = 400;

    const res = CXREngine.analyze(layersState, heartWidthPx, thoraxWidthPx);

    // SVG Render
    if (svgEngine) {
      svgEngine.render(layersState, res.ctrData.ctr);
      
      // Optional Canvas DICOM Post-Processing (Sharpening, Bone Filter, Pseudocolors)
      if (canvasEngine) {
        const svgEl = document.getElementById('cxrSvgContainer')?.querySelector('svg');
        if (svgEl) {
          canvasEngine.processSVG(svgEl);
        }
      }
    }

    // Active Chips Bar
    if (elActiveChips) {
      const activeKeys = Object.keys(layersState).filter(k => layersState[k]);
      elActiveChips.innerHTML = activeKeys.length > 0 ? activeKeys.map(k => `
        <span class="active-mod-chip">${k}</span>
      `).join('') : '<span style="font-size:0.8rem; color:var(--color-text-muted);">Phim X-quang chưa chọn tổn thương</span>';
    }

    // CTR Display
    if (elCtrValueDisplay) {
      elCtrValueDisplay.textContent = res.ctrData.text;
    }

    // Render ABCDE Checklist
    renderChecklist(res.abcde);

    // Render Diagnostic Criteria
    renderCriteria(res);
  }

  function renderChecklist(abcde) {
    if (!elChecklistContainer) return;
    elChecklistContainer.innerHTML = `
      <div class="chk-item ${abcde.airways.class}">
        <div class="chk-header">
          <span class="chk-num">A — Airways (Đường thở)</span>
          <span class="chk-val">${abcde.airways.status}</span>
        </div>
        <div class="chk-note">${abcde.airways.note}</div>
      </div>

      <div class="chk-item ${abcde.breathing.class}">
        <div class="chk-header">
          <span class="chk-num">B — Breathing (Nhu mô & Màng phổi)</span>
          <span class="chk-val">${abcde.breathing.status}</span>
        </div>
        <div class="chk-note">${abcde.breathing.note}</div>
      </div>

      <div class="chk-item ${abcde.circulation.class}">
        <div class="chk-header">
          <span class="chk-num">C — Circulation (Tim & Trung thất)</span>
          <span class="chk-val">${abcde.circulation.status}</span>
        </div>
        <div class="chk-note">${abcde.circulation.note}</div>
      </div>

      <div class="chk-item ${abcde.diaphragm.class}">
        <div class="chk-header">
          <span class="chk-num">D — Diaphragm (Cơ hoành & Góc sườn hoành)</span>
          <span class="chk-val">${abcde.diaphragm.status}</span>
        </div>
        <div class="chk-note">${abcde.diaphragm.note}</div>
      </div>

      <div class="chk-item ${abcde.everythingElse.class}">
        <div class="chk-header">
          <span class="chk-num">E — Everything Else (Xương & Mô mềm)</span>
          <span class="chk-val">${abcde.everythingElse.status}</span>
        </div>
        <div class="chk-note">${abcde.everythingElse.note}</div>
      </div>
    `;
  }

  function renderCriteria(res) {
    if (!elDiagnosticCriteriaBox) return;
    elDiagnosticCriteriaBox.innerHTML = `
      <div style="font-size:0.85rem; line-height:1.5;">
        <h4 style="font-size:0.9rem; font-weight:800; color:var(--color-primary); margin-bottom:0.4rem;">💡 Tiêu Chuẩn Chẩn Đoán X-Quang Ngực</h4>
        <p style="margin-bottom:0.4rem;"><strong>Tổn thương chính:</strong> ${res.findings.join(', ')}</p>
        ${res.isEmergency ? `
          <div style="padding:0.6rem; background:rgba(239,68,68,0.12); border-left:3px solid #ef4444; border-radius:6px; color:#b91c1c; font-weight:700;">
            🚨 BÁO ĐỘNG HÌNH ẢNH CẤP CỨU: Phát hiện tổn thương đe dọa tính mạng! Cần can thiệp khẩn cấp (giải áp kim màng phổi / đặt ống dẫn lưu / bù dịch chống sốc).
          </div>
        ` : ''}
      </div>
    `;
  }

  // Quiz Challenge
  document.getElementById('btnStartStudioQuiz')?.addEventListener('click', startQuizChallenge);

  function startQuizChallenge() {
    if (!elQuizStudioBox) return;
    elQuizStudioBox.style.display = 'block';
    elQuizStudioBox.scrollIntoView({ behavior: 'smooth' });

    const sc = CXR_SCENARIOS[Math.floor(Math.random() * CXR_SCENARIOS.length)];
    loadScenario(sc.id);

    const quizOptionsContainer = document.getElementById('quizStudioOptions');
    if (!quizOptionsContainer) return;

    const allTitles = CXR_SCENARIOS.map(s => s.title);
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
              🎉 CHÍNH XÁC! Dấu hiệu X-quang: ${sc.title}.<br>
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
  loadScenario('sc_lobar_consolidation');
});
