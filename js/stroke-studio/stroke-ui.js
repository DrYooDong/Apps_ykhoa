/**
 * Neurology & Stroke Studio UI Controller
 * CliniPortal - Neurology & Emergency Decision Support System
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Elements
  var selectStrokeType = document.getElementById('strokeType');
  var inputOnsetTime = document.getElementById('onsetTimeHours');
  var sliderOnsetTime = document.getElementById('onsetTimeSlider');
  var inputWeight = document.getElementById('bodyWeight');

  var inputSbp = document.getElementById('sbp');
  var inputDbp = document.getElementById('dbp');
  var inputPlt = document.getElementById('platelets');
  var inputInr = document.getElementById('inr');
  var inputGlu = document.getElementById('glucose');

  var btnReset = document.getElementById('btnResetStudio');
  var presetContainer = document.getElementById('scenarioPresetContainer');

  // Outputs
  var heroBadge = document.getElementById('resHeroBadge');
  var heroTitle = document.getElementById('resHeroTitle');
  var heroSummary = document.getElementById('resHeroSummary');

  var valNihssTotal = document.getElementById('valNihssTotal');
  var badgeNihssSev = document.getElementById('badgeNihssSev');

  var valRtpaTotal = document.getElementById('valRtpaTotal');
  var valRtpaBolus = document.getElementById('valRtpaBolus');
  var valRtpaInfusion = document.getElementById('valRtpaInfusion');
  var valRtpaVials = document.getElementById('valRtpaVials');

  var containerRecommendations = document.getElementById('containerRecommendations');
  var containerSafetyWarnings = document.getElementById('containerSafetyWarnings');
  var containerIchPanel = document.getElementById('containerIchPanel');

  // Timeline Slider Sync
  if (inputOnsetTime && sliderOnsetTime) {
    inputOnsetTime.addEventListener('input', function () {
      sliderOnsetTime.value = inputOnsetTime.value;
      runAnalysis();
    });
    sliderOnsetTime.addEventListener('input', function () {
      inputOnsetTime.value = sliderOnsetTime.value;
      runAnalysis();
    });
  }

  // Stroke Type Switcher
  if (selectStrokeType) {
    selectStrokeType.addEventListener('change', function () {
      var isHemorrhagic = selectStrokeType.value === 'hemorrhagic';
      var ichWrapper = document.getElementById('ichInputsWrapper');
      if (ichWrapper) {
        ichWrapper.style.display = isHemorrhagic ? 'block' : 'none';
      }
      runAnalysis();
    });
  }

  // Khởi tạo Scenarios & NIHSS Items
  initScenarios();
  initNihssListeners();

  // Listeners cho tất cả inputs
  var allInputs = document.querySelectorAll('.stroke-calc-input, .stroke-calc-select, .stroke-checkbox');
  allInputs.forEach(function (elem) {
    elem.addEventListener('input', runAnalysis);
    elem.addEventListener('change', runAnalysis);
  });

  if (btnReset) {
    btnReset.addEventListener('click', resetForm);
  }

  // Run initial
  runAnalysis();

  /**
   * Đăng ký Event Listeners cho 11 mục NIHSS Visual Evaluator
   */
  function initNihssListeners() {
    var nihssButtons = document.querySelectorAll('.nihss-opt-btn');
    nihssButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var group = btn.getAttribute('data-nihss-group');
        var val = btn.getAttribute('data-val');

        // Toggle active trong nhóm
        var siblings = document.querySelectorAll('.nihss-opt-btn[data-nihss-group="' + group + '"]');
        siblings.forEach(function (s) { s.classList.remove('active'); });
        btn.classList.add('active');

        // Cập nhật hidden input
        var hiddenInp = document.getElementById('nihss_' + group);
        if (hiddenInp) hiddenInp.value = val;

        runAnalysis();
      });
    });
  }

  function initScenarios() {
    if (!presetContainer || !window.StrokeScenarios) return;

    var scenarios = window.StrokeScenarios.getScenarios();
    presetContainer.innerHTML = '';

    scenarios.forEach(function (sc) {
      var btn = document.createElement('button');
      btn.className = 'sc-btn ' + sc.badgeClass;
      btn.type = 'button';
      btn.innerHTML = '<div class="sc-btn-title">' + sc.title + '</div>' +
                      '<div class="sc-btn-desc">' + sc.desc.substring(0, 65) + '...</div>';
      btn.addEventListener('click', function () {
        loadScenario(sc.id);
      });
      presetContainer.appendChild(btn);
    });
  }

  function loadScenario(scenarioId) {
    var sc = window.StrokeScenarios.getScenarioById(scenarioId);
    if (!sc) return;

    var d = sc.data;
    if (selectStrokeType) selectStrokeType.value = d.strokeType || 'ischemic';
    if (inputOnsetTime) inputOnsetTime.value = d.onsetTimeHours !== undefined ? d.onsetTimeHours : 2.0;
    if (sliderOnsetTime) sliderOnsetTime.value = d.onsetTimeHours !== undefined ? d.onsetTimeHours : 2.0;
    if (inputWeight) inputWeight.value = d.bodyWeight || 60;

    if (inputSbp) inputSbp.value = d.sbp || 130;
    if (inputDbp) inputDbp.value = d.dbp || 80;
    if (inputPlt) inputPlt.value = d.platelets || 200000;
    if (inputInr) inputInr.value = d.inr || 1.0;
    if (inputGlu) inputGlu.value = d.glucose || 110;

    // Safety Checklist
    var chk = d.safetyChecklist || {};
    for (var k in chk) {
      var elem = document.getElementById('chk_' + k);
      if (elem) elem.checked = Boolean(chk[k]);
    }

    // NIHSS Items
    var n = d.nihssScores || {};
    for (var itemKey in n) {
      var val = n[itemKey];
      var hiddenInp = document.getElementById('nihss_' + itemKey);
      if (hiddenInp) hiddenInp.value = val;

      var btnToActive = document.querySelector('.nihss-opt-btn[data-nihss-group="' + itemKey + '"][data-val="' + val + '"]');
      if (btnToActive) {
        var siblings = document.querySelectorAll('.nihss-opt-btn[data-nihss-group="' + itemKey + '"]');
        siblings.forEach(function (s) { s.classList.remove('active'); });
        btnToActive.classList.add('active');
      }
    }

    // ICH Params
    if (d.strokeType === 'hemorrhagic') {
      var inputGcs = document.getElementById('gcsScore');
      var inputVol = document.getElementById('ichVolume');
      var checkIvh = document.getElementById('hasIvh');
      var checkInfra = document.getElementById('isInfratentorial');
      var inputAge = document.getElementById('age');

      if (inputGcs) inputGcs.value = d.gcsScore || 15;
      if (inputVol) inputVol.value = d.ichVolume || 15;
      if (checkIvh) checkIvh.checked = Boolean(d.hasIvh);
      if (checkInfra) checkInfra.checked = Boolean(d.isInfratentorial);
      if (inputAge) inputAge.value = d.age || 65;
    }

    var ichWrapper = document.getElementById('ichInputsWrapper');
    if (ichWrapper) {
      ichWrapper.style.display = d.strokeType === 'hemorrhagic' ? 'block' : 'none';
    }

    runAnalysis();
  }

  function resetForm() {
    if (selectStrokeType) selectStrokeType.value = 'ischemic';
    if (inputOnsetTime) inputOnsetTime.value = 2.0;
    if (sliderOnsetTime) sliderOnsetTime.value = 2.0;
    if (inputWeight) inputWeight.value = 60;
    if (inputSbp) inputSbp.value = 130;
    if (inputDbp) inputDbp.value = 80;
    if (inputPlt) inputPlt.value = 200000;
    if (inputInr) inputInr.value = 1.0;
    if (inputGlu) inputGlu.value = 110;

    // Reset Checklist
    var chks = document.querySelectorAll('.stroke-checkbox');
    chks.forEach(function (c) { c.checked = false; });

    // Reset NIHSS to 0
    var nihssButtons = document.querySelectorAll('.nihss-opt-btn');
    nihssButtons.forEach(function (b) {
      if (b.getAttribute('data-val') === '0') b.classList.add('active');
      else b.classList.remove('active');
    });
    var hiddenNihss = document.querySelectorAll('.nihss-hidden-input');
    hiddenNihss.forEach(function (h) { h.value = 0; });

    var ichWrapper = document.getElementById('ichInputsWrapper');
    if (ichWrapper) ichWrapper.style.display = 'none';

    runAnalysis();
  }

  function runAnalysis() {
    if (!window.StrokeEngine) return;

    // Thu thập NIHSS
    var nihssScores = {};
    var hiddenNihss = document.querySelectorAll('.nihss-hidden-input');
    hiddenNihss.forEach(function (h) {
      var key = h.id.replace('nihss_', '');
      nihssScores[key] = Number(h.value || 0);
    });

    // Safety Checklist
    var safetyChecklist = {
      hasIchHistory: Boolean(document.getElementById('chk_hasIchHistory') && document.getElementById('chk_hasIchHistory').checked),
      hasRecentHeadTrauma: Boolean(document.getElementById('chk_hasRecentHeadTrauma') && document.getElementById('chk_hasRecentHeadTrauma').checked),
      hasRecentMajorSurgery: Boolean(document.getElementById('chk_hasRecentMajorSurgery') && document.getElementById('chk_hasRecentMajorSurgery').checked),
      hasGiBleed: Boolean(document.getElementById('chk_hasGiBleed') && document.getElementById('chk_hasGiBleed').checked),
      hasLargeInfarct: Boolean(document.getElementById('chk_hasLargeInfarct') && document.getElementById('chk_hasLargeInfarct').checked),
      isTakingNoac: Boolean(document.getElementById('chk_isTakingNoac') && document.getElementById('chk_isTakingNoac').checked)
    };

    var inputData = {
      strokeType: selectStrokeType ? selectStrokeType.value : 'ischemic',
      onsetTimeHours: inputOnsetTime ? inputOnsetTime.value : 2.0,
      bodyWeight: inputWeight ? inputWeight.value : 60,

      sbp: inputSbp ? inputSbp.value : 130,
      dbp: inputDbp ? inputDbp.value : 80,
      platelets: inputPlt ? inputPlt.value : 200000,
      inr: inputInr ? inputInr.value : 1.0,
      glucose: inputGlu ? inputGlu.value : 110,

      nihssScores: nihssScores,
      safetyChecklist: safetyChecklist,

      gcsScore: document.getElementById('gcsScore') ? document.getElementById('gcsScore').value : 15,
      ichVolume: document.getElementById('ichVolume') ? document.getElementById('ichVolume').value : 15,
      hasIvh: document.getElementById('hasIvh') ? document.getElementById('hasIvh').checked : false,
      isInfratentorial: document.getElementById('isInfratentorial') ? document.getElementById('isInfratentorial').checked : false,
      age: document.getElementById('age') ? document.getElementById('age').value : 65
    };

    var res = window.StrokeEngine.analyze(inputData);
    renderResults(res);
  }

  function renderResults(res) {
    // 1. Hero Diagnosis Banner
    if (heroBadge && heroTitle && heroSummary) {
      heroBadge.className = 'badge ' + res.timeWindow.badgeClass;
      heroBadge.textContent = res.strokeType === 'ischemic' ? 'NHỒI MÁU NÃO CẤP' : 'XUẤT HUYẾT NÃO CẤP';
      heroTitle.textContent = res.timeWindow.label;
      heroSummary.textContent = res.timeWindow.summary;
    }

    // 2. NIHSS Total & Severity
    if (valNihssTotal) {
      valNihssTotal.textContent = res.nihss.total + ' / 42';
      badgeNihssSev.className = 'badge ' + res.nihss.badgeClass;
      badgeNihssSev.textContent = res.nihss.severity;
    }

    // 3. rtPA Dosing Card
    var r = res.rtpaDosing;
    if (valRtpaTotal) valRtpaTotal.textContent = r.totalDose.toFixed(1) + ' mg';
    if (valRtpaBolus) valRtpaBolus.textContent = r.bolusDose.toFixed(1) + ' mg (' + r.bolusDose.toFixed(1) + ' mL)';
    if (valRtpaInfusion) valRtpaInfusion.textContent = r.infusionDose.toFixed(1) + ' mg (' + r.infusionDose.toFixed(1) + ' mL)';
    if (valRtpaVials) valRtpaVials.textContent = r.vials50mg + ' lọ (50mg)';

    // 4. Safety Warnings & Contraindications
    if (containerSafetyWarnings) {
      containerSafetyWarnings.innerHTML = '';
      var s = res.safety;

      if (s.warnings.length > 0) {
        s.warnings.forEach(function (w) {
          var box = document.createElement('div');
          box.className = 'ab ab-warn';
          box.style.marginBottom = '0.5rem';
          box.innerHTML = '<strong>⚠️ ' + w.title + '</strong><p style="margin-top:0.2rem;margin-bottom:0;">' + w.desc + '</p>';
          containerSafetyWarnings.appendChild(box);
        });
      }

      if (s.contraindications.length > 0) {
        var box = document.createElement('div');
        box.className = 'ab ab-danger';
        box.style.marginBottom = '0.5rem';
        box.innerHTML = '<strong>⛔ CHỐNG CHỈ ĐỊNH TIÊM rtPA:</strong><ul style="margin-top:0.3rem;margin-bottom:0;padding-left:1.2rem;">' +
                        s.contraindications.map(function(c){ return '<li>' + c + '</li>'; }).join('') +
                        '</ul>';
        containerSafetyWarnings.appendChild(box);
      } else if (res.strokeType === 'ischemic' && res.timeWindow.isRtpaWindow && !s.isBpTooHigh) {
        var box = document.createElement('div');
        box.className = 'ab ab-ok';
        box.style.marginBottom = '0.5rem';
        box.innerHTML = '✅ <strong>KHÔNG CÓ CHỐNG CHỈ ĐỊNH rtPA:</strong> Bệnh nhân đủ điều kiện tiêm tiêu sợi huyết ngay!';
        containerSafetyWarnings.appendChild(box);
      }
    }

    // 5. ICH Score Panel (Xuất huyết não)
    if (containerIchPanel) {
      containerIchPanel.innerHTML = '';
      if (res.ichResult) {
        var ich = res.ichResult;
        var box = document.createElement('div');
        box.className = 'stroke-ich-card';
        box.innerHTML = '<h4 style="font-size: 1.05rem; font-weight: 800; color: var(--color-danger); margin-bottom: 0.5rem;"><i class="fa-solid fa-brain"></i> Bảng Điểm ICH Score (Tử Vong 30 Ngày)</h4>' +
                        '<div style="display: flex; justify-content: space-between; align-items: center;">' +
                        '  <div>' +
                        '    <span style="font-size: 2rem; font-weight: 800; color: var(--color-text);">' + ich.score + '</span> <span style="font-size: 1rem; color: var(--color-text-muted);">/ 6 điểm</span>' +
                        '  </div>' +
                        '  <div>' +
                        '    <span class="badge badge-danger" style="font-size: 1rem; padding: 0.4rem 0.8rem;">Tỷ lệ tử vong 30 ngày: ' + ich.mortality30d + '</span>' +
                        '  </div>' +
                        '</div>';
        containerIchPanel.appendChild(box);
      }
    }

    // 6. Clinical Recommendations
    if (containerRecommendations) {
      containerRecommendations.innerHTML = '';
      res.recommendations.forEach(function (rec) {
        var box = document.createElement('div');
        box.className = 'ab ab-' + (rec.type === 'danger' ? 'danger' : (rec.type === 'warning' ? 'warn' : 'ok'));
        box.style.marginBottom = '0.75rem';
        box.innerHTML = '<strong>' + rec.title + '</strong><p style="margin-top: 0.35rem; margin-bottom: 0; font-size: 0.92rem;">' + rec.content + '</p>';
        containerRecommendations.appendChild(box);
      });
    }

    // 7. Highlight Flowchart Nodes
    updateFlowchartNodes(res.activeNodes);
  }

  function updateFlowchartNodes(activeNodeIds) {
    var allNodes = document.querySelectorAll('.stroke-fc-node');
    allNodes.forEach(function (node) {
      var nodeId = node.getAttribute('data-node-id');
      if (activeNodeIds.indexOf(nodeId) !== -1) {
        node.classList.add('active-node');
      } else {
        node.classList.remove('active-node');
      }
    });
  }
});
