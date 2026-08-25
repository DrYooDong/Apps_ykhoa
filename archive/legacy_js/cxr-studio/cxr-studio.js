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

  // AI-CDSS Vitals & Symptoms State
  let vitalsState = {
    age: 55,
    gender: 'male',
    temp: 37.2,
    hr: 82,
    sbp: 125,
    dbp: 80,
    spo2: 97,
    rr: 18,
    cough: false,
    dyspnea: false,
    headache: false,
    anosmia: false
  };
  let showHeatmapROI = false;

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

  // AI-CDSS Heatmap ROI Toggle & Vitals Listeners
  const elBtnToggleHeatmapROI = document.getElementById('btnToggleHeatmapROI');
  if (elBtnToggleHeatmapROI) {
    elBtnToggleHeatmapROI.addEventListener('click', () => {
      showHeatmapROI = !showHeatmapROI;
      elBtnToggleHeatmapROI.classList.toggle('active', showHeatmapROI);
      triggerCXRAnalysis();
    });
  }

  const vitalInputs = ['cdssAge', 'cdssTemp', 'cdssHR', 'cdssSBP', 'cdssDBP', 'cdssSpO2'];
  vitalInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        const valEl = document.getElementById('val' + id.charAt(0).toUpperCase() + id.slice(1));
        if (valEl) {
          valEl.textContent = id === 'cdssSpO2' ? `${el.value}%` : el.value;
        }
        const stateKey = id.replace('cdss', '').toLowerCase();
        vitalsState[stateKey] = Number(el.value);
        triggerCXRAnalysis();
      });
    }
  });

  // Sync RR display with special label (no % suffix)
  const elRR = document.getElementById('cdssRR');
  if (elRR) {
    elRR.addEventListener('input', () => {
      const valEl = document.getElementById('valCdssRR');
      if (valEl) valEl.textContent = elRR.value;
      vitalsState.rr = Number(elRR.value);
      triggerCXRAnalysis();
    });
  }

  const elCdssGender = document.getElementById('cdssGender');
  if (elCdssGender) {
    elCdssGender.addEventListener('change', () => {
      vitalsState.gender = elCdssGender.value;
      triggerCXRAnalysis();
    });
  }

  const symptomCheckboxes = ['cdssCough', 'cdssDyspnea', 'cdssHeadache', 'cdssAnosmia'];
  symptomCheckboxes.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', () => {
        const stateKey = id.replace('cdss', '').toLowerCase();
        vitalsState[stateKey] = el.checked;
        triggerCXRAnalysis();
      });
    }
  });

  document.querySelectorAll('.btn-cdss-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-preset');
      if (preset === 'sepsis-pneumonia') {
        applyCDSSPreset(68, 'male', 39.2, 115, 85, 50, 89, 28, true, true, false, false, {
          consolidationR: true,
          effusionR: true
        });
      } else if (preset === 'covid-hypoxemia') {
        applyCDSSPreset(52, 'female', 38.6, 105, 110, 75, 88, 26, true, true, true, true, {
          ggo: true
        });
      } else if (preset === 'chf-edema') {
        applyCDSSPreset(72, 'male', 37.1, 115, 165, 100, 91, 22, true, true, false, false, {
          cardiomegaly: true,
          pulmonaryEdema: true,
          effusionR: true
        });
      }
    });
  });

  function applyCDSSPreset(age, gender, temp, hr, sbp, dbp, spo2, rr, cough, dyspnea, headache, anosmia, layers) {
    vitalsState = { age, gender, temp, hr, sbp, dbp, spo2, rr, cough, dyspnea, headache, anosmia };
    const setVal = (id, val, text) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
      const valEl = document.getElementById('val' + id.charAt(0).toUpperCase() + id.slice(1));
      if (valEl) valEl.textContent = text || val;
    };
    setVal('cdssAge', age);
    if (document.getElementById('cdssGender')) document.getElementById('cdssGender').value = gender;
    setVal('cdssTemp', temp);
    setVal('cdssHR', hr);
    setVal('cdssSBP', sbp);
    setVal('cdssDBP', dbp);
    setVal('cdssSpO2', spo2, `${spo2}%`);
    setVal('cdssRR', rr);
    // Sync RR display separately (valCdssRR)
    const valRREl = document.getElementById('valCdssRR');
    if (valRREl) valRREl.textContent = rr;
    const rrEl = document.getElementById('cdssRR');
    if (rrEl) rrEl.value = rr;
    if (document.getElementById('cdssCough')) document.getElementById('cdssCough').checked = cough;
    if (document.getElementById('cdssDyspnea')) document.getElementById('cdssDyspnea').checked = dyspnea;
    if (document.getElementById('cdssHeadache')) document.getElementById('cdssHeadache').checked = headache;
    if (document.getElementById('cdssAnosmia')) document.getElementById('cdssAnosmia').checked = anosmia;

    Object.keys(layersState).forEach(k => {
      layersState[k] = Boolean(layers[k]);
      const chkEl = document.getElementById(layerCheckboxes[k]);
      if (chkEl) chkEl.checked = layersState[k];
    });

    triggerCXRAnalysis();
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

    // 4. CDSS Bayesian Differential & Action Bundle Render
    if (typeof CXR_CDSS_ENGINE !== 'undefined') {
      const probs = CXR_CDSS_ENGINE.calculateBayesianDifferential(vitalsState, layersState, res.ctrData);
      const treatmentPlan = CXR_CDSS_ENGINE.evaluateSeverityAndTreatment(vitalsState, layersState, probs);
      renderCDSSResults(probs, treatmentPlan);

      // Render ROI Heatmaps if toggle active
      renderHeatmapROIOverlay();

      // Render Advanced Cards v2.0 (Narrative, RuleBasedAdvice, CURB-65)
      renderCDSSAdvancedResults(probs, treatmentPlan);
    }
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

  function renderCDSSResults(probs, plan) {
    const elMeters = document.getElementById('cdssProbabilityMeters');
    if (elMeters) {
      const diseaseNames = {
        pneumonia: "1. Viêm phổi vi khuẩn / Nhiễm khuẩn",
        covid19: "2. Viêm phổi siêu vi (COVID-19 / Flu)",
        cardiogenicEdema: "3. Phù phổi cấp suy tim huyết động",
        pleuralEffusionAcute: "4. Tràn dịch / Tràn khí màng phổi"
      };

      elMeters.innerHTML = Object.entries(probs).map(([key, val]) => {
        const pct = Math.round(val * 100);
        const fillClass = pct >= 70 ? 'high' : pct >= 40 ? 'mod' : 'low';
        return `
          <div class="cdss-prob-row">
            <div class="cdss-prob-header">
              <span>${diseaseNames[key] || key}</span>
              <span style="font-weight: 800; color: var(--color-primary);">${pct}%</span>
            </div>
            <div class="cdss-prob-bar">
              <div class="cdss-prob-fill ${fillClass}" style="width: ${pct}%;"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    const elBadge = document.getElementById('badgeCdssSeverity');
    if (elBadge) {
      elBadge.className = plan.badgeClass;
      elBadge.textContent = plan.severityLabel;
    }

    const elSummary = document.getElementById('cdssSummaryText');
    if (elSummary) {
      elSummary.textContent = plan.summaryText;
    }

    const elTreatments = document.getElementById('cdssTreatmentsBox');
    if (elTreatments) {
      elTreatments.innerHTML = `
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-text); margin-bottom: 0.4rem;">
          💊 ĐIỀU TRỊ BAN ĐẦU (HOUR-1 BUNDLE):
        </div>
        <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.82rem; color: var(--color-text-muted);">
          ${plan.treatments.map(t => `<li style="margin-bottom: 0.3rem;">${t}</li>`).join('')}
        </ul>
      `;
    }

    const elLabs = document.getElementById('cdssLabsBox');
    if (elLabs) {
      elLabs.innerHTML = `
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-text); margin-bottom: 0.4rem;">
          🧪 CHỈ ĐỊNH XÉT NGHIỆM & CẬN LÂM SÀNG:
        </div>
        <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.82rem; color: var(--color-text-muted);">
          ${plan.labs.map(l => `<li style="margin-bottom: 0.3rem;">${l}</li>`).join('')}
        </ul>
      `;
    }

    const elEbm = document.getElementById('cdssEbmLinksBox');
    if (elEbm && plan.ebmLinks) {
      elEbm.innerHTML = `
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-text); margin-bottom: 0.5rem;">
          🔗 LIÊN KẾT CHÉO CÔNG CỤ CLINIPORTAL (EVIDENCE BRIDGE):
        </div>
        <div style="display: flex; flex-wrap: wrap;">
          ${plan.ebmLinks.map(link => `
            <a href="${link.url}" class="cdss-ebm-chip" target="_blank">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> [${link.badge}] ${link.title}
            </a>
          `).join('')}
        </div>
      `;
    }
  }

  // renderHeatmapROIOverlay() — giữ nguyên
  function renderHeatmapROIOverlay() {
    const svgEl = document.getElementById('cxrSvgContainer')?.querySelector('svg');
    if (!svgEl) return;

    const oldGroup = svgEl.querySelector('#cdssHeatmapRoiGroup');
    if (oldGroup) {
      oldGroup.remove();
    }

    if (!showHeatmapROI || typeof CXR_CDSS_ENGINE === 'undefined') return;

    const rois = CXR_CDSS_ENGINE.getHeatmapROIs(layersState);
    if (rois.length === 0) return;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('id', 'cdssHeatmapRoiGroup');

    rois.forEach(roi => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', roi.x);
      rect.setAttribute('y', roi.y);
      rect.setAttribute('width', roi.width);
      rect.setAttribute('height', roi.height);
      rect.setAttribute('rx', '8');
      rect.setAttribute('class', 'svg-roi-heatmap-box');
      rect.setAttribute('stroke', roi.color);
      rect.setAttribute('fill', roi.color);

      const labelBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      labelBg.setAttribute('x', roi.x);
      labelBg.setAttribute('y', roi.y - 20);
      labelBg.setAttribute('width', Math.min(180, roi.width + 30));
      labelBg.setAttribute('height', '18');
      labelBg.setAttribute('class', 'svg-roi-label-bg');

      const labelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      labelText.setAttribute('x', roi.x + 6);
      labelText.setAttribute('y', roi.y - 7);
      labelText.setAttribute('class', 'svg-roi-label-text');
      labelText.textContent = roi.label;

      g.appendChild(rect);
      g.appendChild(labelBg);
      g.appendChild(labelText);
    });

    svgEl.appendChild(g);
  }

  // Initial render
  renderScenariosList();
  loadScenario('sc_lobar_consolidation');

  // ──────────────────────────────────────────────────────────────────────
  // ADVANCED CDSS CARDS v2.0 (ported from cdss-xray-app)
  // ──────────────────────────────────────────────────────────────────────

  /**
   * Render Clinical Narrative + Rule-Based Advice + CURB-65 score cards
   * Ported from cdss-xray-app: RuleBasedAdvice.tsx, mockService.ts, PatientVitalsForm.tsx
   */
  function renderCDSSAdvancedResults(probs, plan) {
    if (typeof CXR_CDSS_ENGINE === 'undefined') return;

    // --- Xác định bệnh hàng đầu (highest probability)
    const topEntry = Object.entries(probs).reduce((max, [k, v]) => v > max[1] ? [k, v] : max, ['', 0]);
    const topDisease = topEntry[0];
    const topProb = topEntry[1];

    // --- Xây dựng danh sách tổn thương X-quang hiện tại
    const layerLabels = {
      consolidationR: 'Đông đặc nhu mô thùy dưới phổi phải',
      ggo: 'Thâm nhiễm kính mờ 2 bên (GGO)',
      cavity: 'Hang láo thành dày đỉnh phổi',
      pulmonaryEdema: 'Phù phổi hình cánh bướm',
      pneumothoraxR: 'Tràn khí màng phổi áp lực phải',
      effusionR: 'Tràn dịch màng phổi phải',
      cardiomegaly: 'Bóng tim to (CTR > 0.50)',
      aorticKnob: 'Giãn quai động mạch chủ',
      ribFracture: 'Gãy xương sườn',
      emphysema: 'Tràn khí dưới da mô mềm'
    };
    const cxrFindings = Object.entries(layersState)
      .filter(([k, v]) => v && layerLabels[k])
      .map(([k]) => layerLabels[k]);

    // === 1. CLINICAL NARRATIVE ===
    const elNarrative = document.getElementById('cdssNarrativeText');
    if (elNarrative && CXR_CDSS_ENGINE.generateClinicalNarrative) {
      elNarrative.textContent = CXR_CDSS_ENGINE.generateClinicalNarrative(
        vitalsState, topDisease, topProb, cxrFindings
      );
    }

    // === 2. RULE-BASED ADVICE ===
    const elAdvice = document.getElementById('cdssRuleAdviceContent');
    if (elAdvice && CXR_CDSS_ENGINE.getRuleBasedAdvice) {
      const advice = CXR_CDSS_ENGINE.getRuleBasedAdvice(topDisease, topProb, vitalsState, layersState);
      const urgencyColors = {
        critical: 'var(--color-danger)',
        high: 'var(--color-danger)',
        mod: 'var(--color-warning)',
        low: 'var(--color-success)'
      };
      const borderColor = urgencyColors[advice.urgency] || 'var(--color-primary)';
      elAdvice.innerHTML = `
        <div style="padding:0.75rem; border-left:4px solid ${borderColor}; background:var(--color-bg); border-radius:var(--radius-sm); margin-bottom:0.75rem;">
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem;">
            <span style="font-size:1.2rem;">${advice.icon}</span>
            <strong style="font-size:0.95rem; color:var(--color-text);">${advice.title}</strong>
          </div>
          <p style="font-size:0.82rem; color:var(--color-text-muted); line-height:1.5; margin:0 0 0.75rem 0;">${advice.description}</p>
          <div style="font-size:0.8rem; font-weight:700; color:var(--color-text); margin-bottom:0.4rem;">Khuyến cáo cụ thể:</div>
          <ul style="margin:0; padding-left:1.2rem;">
            ${advice.recommendations.map(r => `<li style="font-size:0.82rem; color:var(--color-text-muted); margin-bottom:0.35rem;">${r}</li>`).join('')}
          </ul>
        </div>
        <p style="font-size:0.75rem; color:var(--color-text-muted); font-style:italic; margin:0;">
          ⚠️ Chỉ là công cụ hỗ trợ. Quyết định lâm sàng cuối cùng thuộc về bác sĩ phụ trách.
        </p>
      `;
    }

    // === 3. CURB-65 SCORE ===
    const elCurb = document.getElementById('cdssCurb65Content');
    if (elCurb && CXR_CDSS_ENGINE.calculateCURB65) {
      const curb = CXR_CDSS_ENGINE.calculateCURB65(vitalsState);
      const curbBgColors = {
        'cdss-curb-low': 'rgba(34, 197, 94, 0.12)',
        'cdss-curb-mod': 'rgba(234, 179, 8, 0.12)',
        'cdss-curb-high': 'rgba(239, 68, 68, 0.12)',
        'cdss-curb-critical': 'rgba(139, 0, 0, 0.18)'
      };
      const curbBorderColors = {
        'cdss-curb-low': '#22c55e',
        'cdss-curb-mod': '#eab308',
        'cdss-curb-high': '#ef4444',
        'cdss-curb-critical': '#8b0000'
      };
      const bg = curbBgColors[curb.colorClass] || 'var(--color-bg)';
      const border = curbBorderColors[curb.colorClass] || 'var(--color-primary)';

      // Big score display
      elCurb.innerHTML = `
        <div style="display:flex; align-items:center; gap:1rem; padding:0.85rem; background:${bg}; border:1px solid ${border}; border-radius:var(--radius-sm); margin-bottom:0.75rem;">
          <div style="font-size:2.5rem; font-weight:900; color:${border}; min-width:48px; text-align:center;">${curb.score}</div>
          <div>
            <div style="font-size:0.9rem; font-weight:800; color:var(--color-text);">${curb.label}</div>
            <div style="font-size:0.82rem; color:var(--color-text-muted); margin-top:0.2rem;">${curb.recommendation}</div>
          </div>
        </div>
        ${curb.criteria.length > 0 ? `
          <div style="font-size:0.78rem; color:var(--color-text-muted); font-weight:700; margin-bottom:0.3rem;">Điểm dương tính:</div>
          <ul style="margin:0; padding-left:1.2rem;">
            ${curb.criteria.map(c => `<li style="font-size:0.8rem; color:var(--color-text-muted);">${c}</li>`).join('')}
          </ul>
        ` : '<p style="font-size:0.8rem; color:#22c55e; font-weight:700;">Không có yếu tố nguy cơ nào — Điều trị ngoại trú.</p>'}
        <p style="font-size:0.73rem; color:var(--color-text-muted); font-style:italic; margin-top:0.6rem;">
          *CURB-65 áp dụng cho viêm phổi cộng đồng. Phương trình tính điểm này chỉ tính các chỉ số có dữ liệu nhập (C, R, B, 65).
        </p>
      `;
    }
  }

  // ── RIGHT PANEL SUB-TABS NAVIGATION ─────────────────────────────────────
  document.querySelectorAll('.right-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.right-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.right-tab-content').forEach(c => c.style.display = 'none');
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-rtab');
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.style.display = 'flex';
    });
  });

  // ── ACCORDION COLLAPSE TOGGLE FOR STUDIO CARDS ─────────────────────────
  document.querySelectorAll('.card-header-toggle').forEach(header => {
    header.addEventListener('click', (e) => {
      const card = header.closest('.studio-card');
      if (card) {
        card.classList.toggle('collapsed');
      }
    });
  });

});

