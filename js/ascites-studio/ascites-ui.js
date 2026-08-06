/**
 * Ascites Studio UI Controller
 * CliniPortal - Gastroenterology & Emergency Decision Support System
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Inputs
  var inputSAlb = document.getElementById('serumAlbumin');
  var inputAAlb = document.getElementById('ascitesAlbumin');
  var selectAlbUnit = document.getElementById('albuminUnit');

  var inputAProt = document.getElementById('ascitesProtein');
  var selectProtUnit = document.getElementById('proteinUnit');

  var inputWbc = document.getElementById('wbc');
  var inputNeutroPct = document.getElementById('neutrophilPct');

  var inputGlu = document.getElementById('glucose');
  var selectGluUnit = document.getElementById('glucoseUnit');
  var inputLdh = document.getElementById('ldh');
  var inputSLdhUln = document.getElementById('serumLdhUln');

  var inputAda = document.getElementById('ada');
  var inputAmy = document.getElementById('amylase');
  var inputBiliRatio = document.getElementById('bilirubinRatio');

  var selectCyto = document.getElementById('cytology');
  var selectCulture = document.getElementById('culture');

  var inputWeight = document.getElementById('bodyWeight');
  var inputLvpVol = document.getElementById('paracentesisVolume');

  var btnReset = document.getElementById('btnResetStudio');
  var presetContainer = document.getElementById('scenarioPresetContainer');

  // Outputs
  var heroBadge = document.getElementById('resHeroBadge');
  var heroTitle = document.getElementById('resHeroTitle');
  var heroSummary = document.getElementById('resHeroSummary');

  var valSaag = document.getElementById('valSaag');
  var badgeSaag = document.getElementById('badgeSaag');

  var valAnc = document.getElementById('valAnc');
  var badgeAnc = document.getElementById('badgeAnc');

  var valRunyon = document.getElementById('valRunyon');
  var badgeRunyon = document.getElementById('badgeRunyon');

  var containerFindings = document.getElementById('containerFindings');
  var containerEtiologies = document.getElementById('containerEtiologies');
  var containerRecommendations = document.getElementById('containerRecommendations');
  var containerAlbuminDosing = document.getElementById('containerAlbuminDosing');

  // Khởi tạo Scenarios
  initScenarios();

  // Listeners
  var allInputs = document.querySelectorAll('.ascites-calc-input, .ascites-calc-select');
  allInputs.forEach(function (elem) {
    elem.addEventListener('input', runAnalysis);
    elem.addEventListener('change', runAnalysis);
  });

  if (btnReset) {
    btnReset.addEventListener('click', resetForm);
  }

  // Chạy lần đầu
  runAnalysis();

  function initScenarios() {
    if (!presetContainer || !window.AscitesScenarios) return;

    var scenarios = window.AscitesScenarios.getScenarios();
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
    var sc = window.AscitesScenarios.getScenarioById(scenarioId);
    if (!sc) return;

    var d = sc.data;
    if (inputSAlb) inputSAlb.value = d.serumAlbumin !== undefined ? d.serumAlbumin : '';
    if (inputAAlb) inputAAlb.value = d.ascitesAlbumin !== undefined ? d.ascitesAlbumin : '';
    if (selectAlbUnit) selectAlbUnit.value = d.albuminUnit || 'g/dL';

    if (inputAProt) inputAProt.value = d.ascitesProtein !== undefined ? d.ascitesProtein : '';
    if (selectProtUnit) selectProtUnit.value = d.proteinUnit || 'g/dL';

    if (inputWbc) inputWbc.value = d.wbc !== undefined ? d.wbc : '';
    if (inputNeutroPct) inputNeutroPct.value = d.neutrophilPct !== undefined ? d.neutrophilPct : '';

    if (inputGlu) inputGlu.value = d.glucose !== undefined ? d.glucose : '';
    if (selectGluUnit) selectGluUnit.value = d.glucoseUnit || 'mg/dL';
    if (inputLdh) inputLdh.value = d.ldh !== undefined ? d.ldh : '';
    if (inputSLdhUln) inputSLdhUln.value = d.serumLdhUln || 200;

    if (inputAda) inputAda.value = d.ada !== undefined ? d.ada : '';
    if (inputAmy) inputAmy.value = d.amylase !== undefined ? d.amylase : '';
    if (inputBiliRatio) inputBiliRatio.value = d.bilirubinRatio !== undefined ? d.bilirubinRatio : '';

    if (selectCyto) selectCyto.value = d.cytology || 'negative';
    if (selectCulture) selectCulture.value = d.culture || 'negative';

    if (inputWeight) inputWeight.value = d.bodyWeight || 60;
    if (inputLvpVol) inputLvpVol.value = d.paracentesisVolume || 0;

    runAnalysis();
  }

  function resetForm() {
    var formInputs = document.querySelectorAll('.ascites-calc-input');
    formInputs.forEach(function (inp) {
      inp.value = '';
    });
    if (inputSLdhUln) inputSLdhUln.value = 200;
    if (inputWeight) inputWeight.value = 60;
    if (inputLvpVol) inputLvpVol.value = 0;
    if (selectCyto) selectCyto.value = 'negative';
    if (selectCulture) selectCulture.value = 'negative';

    runAnalysis();
  }

  function runAnalysis() {
    if (!window.AscitesEngine) return;

    var inputData = {
      serumAlbumin: inputSAlb ? inputSAlb.value : '',
      ascitesAlbumin: inputAAlb ? inputAAlb.value : '',
      albuminUnit: selectAlbUnit ? selectAlbUnit.value : 'g/dL',

      ascitesProtein: inputAProt ? inputAProt.value : '',
      proteinUnit: selectProtUnit ? selectProtUnit.value : 'g/dL',

      wbc: inputWbc ? inputWbc.value : '',
      neutrophilPct: inputNeutroPct ? inputNeutroPct.value : '',

      glucose: inputGlu ? inputGlu.value : '',
      glucoseUnit: selectGluUnit ? selectGluUnit.value : 'mg/dL',
      ldh: inputLdh ? inputLdh.value : '',
      serumLdhUln: inputSLdhUln ? inputSLdhUln.value : 200,

      ada: inputAda ? inputAda.value : '',
      amylase: inputAmy ? inputAmy.value : '',
      bilirubinRatio: inputBiliRatio ? inputBiliRatio.value : '',

      cytology: selectCyto ? selectCyto.value : 'negative',
      culture: selectCulture ? selectCulture.value : 'negative',

      bodyWeight: inputWeight ? inputWeight.value : 60,
      paracentesisVolume: inputLvpVol ? inputLvpVol.value : 0
    };

    var res = window.AscitesEngine.analyze(inputData);
    renderResults(res);
  }

  function renderResults(res) {
    // 1. Hero Diagnosis Banner
    if (heroBadge && heroTitle && heroSummary) {
      var inf = res.infectionResult;
      var saag = res.saagResult;

      if (inf.type !== 'NO_INFECTION') {
        heroBadge.className = 'badge ' + inf.badgeClass;
        heroBadge.textContent = 'CẢNH BÁO NHIỄM TRÙNG';
        heroTitle.textContent = inf.label;
        heroSummary.textContent = inf.summary;
      } else {
        heroBadge.className = 'badge ' + saag.badgeClass;
        heroBadge.textContent = res.metrics.isHighSaag ? 'TĂNG ÁP CỬA' : 'KHÔNG TĂNG ÁP CỬA';
        heroTitle.textContent = saag.label;
        heroSummary.textContent = saag.summary;
      }
    }

    // 2. Metrics Grid
    var m = res.metrics;

    if (valSaag) {
      valSaag.textContent = m.saag !== null ? m.saag.toFixed(2) + ' g/dL' : '—';
      badgeSaag.className = 'badge ' + (m.isHighSaag === true ? 'badge-danger' : (m.isHighSaag === false ? 'badge-info' : 'badge-neutral'));
      badgeSaag.textContent = m.isHighSaag === true ? 'SAAG ≥ 1.1 (Tăng áp cửa)' : (m.isHighSaag === false ? 'SAAG < 1.1 (Bình thường)' : 'Chưa nhập');
    }

    if (valAnc) {
      valAnc.textContent = m.anc !== null ? m.anc.toFixed(0) + ' / μL' : '—';
      badgeAnc.className = 'badge ' + (m.isHighAnc ? 'badge-danger' : (m.anc !== null ? 'badge-success' : 'badge-neutral'));
      badgeAnc.textContent = m.isHighAnc ? 'Bạch cầu tăng (≥ 250)' : (m.anc !== null ? 'Bình thường (< 250)' : 'Chưa nhập');
    }

    if (valRunyon) {
      valRunyon.textContent = m.runyonCount + ' / 3 tiêu chí';
      badgeRunyon.className = 'badge ' + (m.isSecondaryPeritonitis ? 'badge-danger' : (m.runyonCount >= 1 ? 'badge-warning' : 'badge-neutral'));
      badgeRunyon.textContent = m.isSecondaryPeritonitis ? 'Nghi Viêm phúc mạc thứ phát' : (m.runyonCount >= 1 ? 'Cần cảnh giác' : 'Âm tính');
    }

    // 3. Clinical Findings
    if (containerFindings) {
      containerFindings.innerHTML = '';
      if (res.findings.length === 0) {
        containerFindings.innerHTML = '<div class="ascites-empty-state">Chưa phát hiện bất thường sinh hóa hoặc tế bào đặc hiệu.</div>';
      } else {
        res.findings.forEach(function (f) {
          var item = document.createElement('div');
          item.className = 'ab ab-' + (f.level === 'danger' ? 'danger' : (f.level === 'warning' ? 'warn' : 'info'));
          item.style.marginBottom = '0.75rem';
          item.innerHTML = '<strong>' + f.title + '</strong><p style="margin-top: 0.25rem; margin-bottom: 0;">' + f.desc + '</p>';
          containerFindings.appendChild(item);
        });
      }
    }

    // 4. Etiologies Score List
    if (containerEtiologies) {
      containerEtiologies.innerHTML = '';
      if (res.etiologies.length === 0) {
        containerEtiologies.innerHTML = '<div class="ascites-empty-state">Chưa đủ dữ liệu để xếp loại nguyên nhân.</div>';
      } else {
        res.etiologies.forEach(function (et) {
          var row = document.createElement('div');
          row.className = 'ascites-etiology-row';
          row.innerHTML = '<div class="et-info">' +
                          '  <i class="fa-solid ' + et.icon + ' et-icon text-' + et.color + '"></i>' +
                          '  <span class="et-name">' + et.name + '</span>' +
                          '</div>' +
                          '<div class="et-progress-bar">' +
                          '  <div class="et-progress-fill bg-' + et.color + '" style="width: ' + et.score + '%;"></div>' +
                          '</div>' +
                          '<span class="et-score-badge badge badge-' + et.color + '">' + et.score + '% Khả năng</span>';
          containerEtiologies.appendChild(row);
        });
      }
    }

    // 5. Albumin Dosing Card
    if (containerAlbuminDosing) {
      containerAlbuminDosing.innerHTML = '';
      if (res.albuminDosing) {
        var d = res.albuminDosing;
        var box = document.createElement('div');
        box.className = 'ascites-albumin-card';
        box.innerHTML = '<h4 style="font-size: 1.05rem; font-weight: 800; color: var(--color-danger); margin-bottom: 0.5rem;"><i class="fa-solid fa-prescription-bottle-medical"></i> Liều Truyền Albumin IV Cho Bệnh Nhân SBP (' + d.weight + ' kg)</h4>' +
                        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.75rem;">' +
                        '  <div style="background: rgba(239,68,68,0.08); padding: 0.85rem; border-radius: 10px; border: 1px solid rgba(239,68,68,0.2);">' +
                        '    <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-danger);">NGÀY 1 (1.5 g/kg) trong 6h đầu:</div>' +
                        '    <div style="font-size: 1.4rem; font-weight: 800; color: var(--color-text); margin-top: 0.25rem;">' + d.day1Grams.toFixed(0) + ' g Albumin</div>' +
                        '    <div style="font-size: 0.85rem; color: var(--color-text-muted);">Tương đương ~ <strong>' + d.day1Ml.toFixed(0) + ' mL Albumin 20%</strong> (' + (d.day1Ml / 50).toFixed(1) + ' chai 50ml)</div>' +
                        '  </div>' +
                        '  <div style="background: rgba(245,158,11,0.08); padding: 0.85rem; border-radius: 10px; border: 1px solid rgba(245,158,11,0.2);">' +
                        '    <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-warning);">NGÀY 3 (1.0 g/kg):</div>' +
                        '    <div style="font-size: 1.4rem; font-weight: 800; color: var(--color-text); margin-top: 0.25rem;">' + d.day3Grams.toFixed(0) + ' g Albumin</div>' +
                        '    <div style="font-size: 0.85rem; color: var(--color-text-muted);">Tương đương ~ <strong>' + d.day3Ml.toFixed(0) + ' mL Albumin 20%</strong> (' + (d.day3Ml / 50).toFixed(1) + ' chai 50ml)</div>' +
                        '  </div>' +
                        '</div>';
        containerAlbuminDosing.appendChild(box);
      }
    }

    // 6. Recommendations
    if (containerRecommendations) {
      containerRecommendations.innerHTML = '';
      if (res.recommendations.length === 0) {
        containerRecommendations.innerHTML = '<div class="ab ab-info">ℹ️ Hoàn thiện các thông số sinh hóa & cấy dịch báng để nhận hướng dẫn lâm sàng.</div>';
      } else {
        res.recommendations.forEach(function (rec) {
          var box = document.createElement('div');
          box.className = 'ab ab-' + (rec.type === 'danger' ? 'danger' : (rec.type === 'warning' ? 'warn' : 'ok'));
          box.style.marginBottom = '0.75rem';
          box.innerHTML = '<strong>' + rec.title + '</strong><p style="margin-top: 0.35rem; margin-bottom: 0; font-size: 0.92rem;">' + rec.content + '</p>';
          containerRecommendations.appendChild(box);
        });
      }
    }

    // 7. Flowchart Highlight
    updateFlowchartNodes(res.activeNodes);
  }

  function updateFlowchartNodes(activeNodeIds) {
    var allNodes = document.querySelectorAll('.ascites-fc-node');
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
