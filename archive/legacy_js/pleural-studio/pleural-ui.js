/**
 * Pleural Effusion Studio UI Logic & Controller
 * CliniPortal - Respiratory & Emergency Decision Support System
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Elements
  var inputPfProt = document.getElementById('pfProtein');
  var inputSProt = document.getElementById('serumProtein');
  var selectProtUnit = document.getElementById('proteinUnit');

  var inputPfLdh = document.getElementById('pfLdh');
  var inputSLdh = document.getElementById('serumLdh');
  var inputSLdhUln = document.getElementById('serumLdhUln');

  var inputPfAlb = document.getElementById('pfAlbumin');
  var inputSAlb = document.getElementById('serumAlbumin');
  var selectAlbUnit = document.getElementById('albuminUnit');

  var checkDiuretic = document.getElementById('isDiureticOrChf');

  var inputPfAda = document.getElementById('pfAda');
  var inputPfGlu = document.getElementById('pfGlucose');
  var selectGluUnit = document.getElementById('glucoseUnit');
  var inputPfPh = document.getElementById('pfPh');

  var inputPfTri = document.getElementById('pfTriglycerides');
  var selectTriUnit = document.getElementById('triglycerideUnit');
  var inputPfChol = document.getElementById('pfCholesterol');
  var selectCholUnit = document.getElementById('cholesterolUnit');

  var inputPfAmy = document.getElementById('pfAmylase');
  var inputSAmy = document.getElementById('serumAmylase');

  var inputNeutro = document.getElementById('neutrophilPct');
  var inputLympho = document.getElementById('lymphocytePct');
  var inputEosino = document.getElementById('eosinophilPct');
  var inputRbc = document.getElementById('rbc');

  var selectGross = document.getElementById('grossAppearance');
  var selectCyto = document.getElementById('cytology');
  var selectGramAfb = document.getElementById('gramAfb');

  var btnReset = document.getElementById('btnResetStudio');
  var presetContainer = document.getElementById('scenarioPresetContainer');

  // Outputs
  var heroBadge = document.getElementById('resHeroBadge');
  var heroTitle = document.getElementById('resHeroTitle');
  var heroSummary = document.getElementById('resHeroSummary');

  var valProtRatio = document.getElementById('valProtRatio');
  var badgeProtRatio = document.getElementById('badgeProtRatio');

  var valLdhRatio = document.getElementById('valLdhRatio');
  var badgeLdhRatio = document.getElementById('badgeLdhRatio');

  var valLdhUln = document.getElementById('valLdhUln');
  var badgeLdhUln = document.getElementById('badgeLdhUln');

  var valSeag = document.getElementById('valSeag');
  var badgeSeag = document.getElementById('badgeSeag');

  var containerFindings = document.getElementById('containerFindings');
  var containerEtiologies = document.getElementById('containerEtiologies');
  var containerRecommendations = document.getElementById('containerRecommendations');

  // Khởi tạo các Scenario Cards
  initScenarios();

  // Đăng ký Event Listeners cho tất cả inputs
  var allInputs = document.querySelectorAll('.pleural-calc-input, .pleural-calc-select, .pleural-checkbox');
  allInputs.forEach(function (elem) {
    elem.addEventListener('input', runAnalysis);
    elem.addEventListener('change', runAnalysis);
  });

  if (btnReset) {
    btnReset.addEventListener('click', resetForm);
  }

  // Khởi chạy phân tích ban đầu
  runAnalysis();

  /**
   * Render các nút Ca Lâm Sàng Mẫu
   */
  function initScenarios() {
    if (!presetContainer || !window.PleuralScenarios) return;

    var scenarios = window.PleuralScenarios.getScenarios();
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

  /**
   * Tải ca lâm sàng mẫu vào Form
   */
  function loadScenario(scenarioId) {
    var sc = window.PleuralScenarios.getScenarioById(scenarioId);
    if (!sc) return;

    var d = sc.data;
    if (inputPfProt) inputPfProt.value = d.pfProtein !== undefined ? d.pfProtein : '';
    if (inputSProt) inputSProt.value = d.serumProtein !== undefined ? d.serumProtein : '';
    if (selectProtUnit) selectProtUnit.value = d.proteinUnit || 'g/dL';

    if (inputPfLdh) inputPfLdh.value = d.pfLdh !== undefined ? d.pfLdh : '';
    if (inputSLdh) inputSLdh.value = d.serumLdh !== undefined ? d.serumLdh : '';
    if (inputSLdhUln) inputSLdhUln.value = d.serumLdhUln || 200;

    if (inputPfAlb) inputPfAlb.value = d.pfAlbumin !== undefined ? d.pfAlbumin : '';
    if (inputSAlb) inputSAlb.value = d.serumAlbumin !== undefined ? d.serumAlbumin : '';
    if (selectAlbUnit) selectAlbUnit.value = d.albuminUnit || 'g/dL';

    if (checkDiuretic) checkDiuretic.checked = Boolean(d.isDiureticOrChf);

    if (inputPfAda) inputPfAda.value = d.pfAda !== undefined ? d.pfAda : '';
    if (inputPfGlu) inputPfGlu.value = d.pfGlucose !== undefined ? d.pfGlucose : '';
    if (selectGluUnit) selectGluUnit.value = d.glucoseUnit || 'mg/dL';
    if (inputPfPh) inputPfPh.value = d.pfPh !== undefined ? d.pfPh : '';

    if (inputPfTri) inputPfTri.value = d.pfTriglycerides !== undefined ? d.pfTriglycerides : '';
    if (selectTriUnit) selectTriUnit.value = d.triglycerideUnit || 'mg/dL';
    if (inputPfChol) inputPfChol.value = d.pfCholesterol !== undefined ? d.pfCholesterol : '';
    if (selectCholUnit) selectCholUnit.value = d.cholesterolUnit || 'mg/dL';

    if (inputPfAmy) inputPfAmy.value = d.pfAmylase !== undefined ? d.pfAmylase : '';
    if (inputSAmy) inputSAmy.value = d.serumAmylase !== undefined ? d.serumAmylase : '';

    if (inputNeutro) inputNeutro.value = d.neutrophilPct !== undefined ? d.neutrophilPct : '';
    if (inputLympho) inputLympho.value = d.lymphocytePct !== undefined ? d.lymphocytePct : '';
    if (inputEosino) inputEosino.value = d.eosinophilPct !== undefined ? d.eosinophilPct : '';
    if (inputRbc) inputRbc.value = d.rbc !== undefined ? d.rbc : '';

    if (selectGross) selectGross.value = d.grossAppearance || 'clear';
    if (selectCyto) selectCyto.value = d.cytology || 'negative';
    if (selectGramAfb) selectGramAfb.value = d.gramAfb || 'negative';

    runAnalysis();
  }

  /**
   * Đặt lại Form về mặc định
   */
  function resetForm() {
    var formInputs = document.querySelectorAll('.pleural-calc-input');
    formInputs.forEach(function (inp) {
      inp.value = '';
    });
    if (inputSLdhUln) inputSLdhUln.value = 200;
    if (checkDiuretic) checkDiuretic.checked = false;
    if (selectGross) selectGross.value = 'clear';
    if (selectCyto) selectCyto.value = 'negative';
    if (selectGramAfb) selectGramAfb.value = 'negative';

    runAnalysis();
  }

  /**
   * Thu thập dữ liệu & Chạy Phân Tích Engine
   */
  function runAnalysis() {
    if (!window.PleuralEngine) return;

    var inputData = {
      pfProtein: inputPfProt ? inputPfProt.value : '',
      serumProtein: inputSProt ? inputSProt.value : '',
      proteinUnit: selectProtUnit ? selectProtUnit.value : 'g/dL',

      pfLdh: inputPfLdh ? inputPfLdh.value : '',
      serumLdh: inputSLdh ? inputSLdh.value : '',
      serumLdhUln: inputSLdhUln ? inputSLdhUln.value : 200,

      pfAlbumin: inputPfAlb ? inputPfAlb.value : '',
      serumAlbumin: inputSAlb ? inputSAlb.value : '',
      albuminUnit: selectAlbUnit ? selectAlbUnit.value : 'g/dL',

      isDiureticOrChf: checkDiuretic ? checkDiuretic.checked : false,

      pfAda: inputPfAda ? inputPfAda.value : '',
      pfGlucose: inputPfGlu ? inputPfGlu.value : '',
      glucoseUnit: selectGluUnit ? selectGluUnit.value : 'mg/dL',
      pfPh: inputPfPh ? inputPfPh.value : '',

      pfTriglycerides: inputPfTri ? inputPfTri.value : '',
      triglycerideUnit: selectTriUnit ? selectTriUnit.value : 'mg/dL',
      pfCholesterol: inputPfChol ? inputPfChol.value : '',
      cholesterolUnit: selectCholUnit ? selectCholUnit.value : 'mg/dL',

      pfAmylase: inputPfAmy ? inputPfAmy.value : '',
      serumAmylase: inputSAmy ? inputSAmy.value : '',

      neutrophilPct: inputNeutro ? inputNeutro.value : '',
      lymphocytePct: inputLympho ? inputLympho.value : '',
      eosinophilPct: inputEosino ? inputEosino.value : '',
      rbc: inputRbc ? inputRbc.value : '',

      grossAppearance: selectGross ? selectGross.value : 'clear',
      cytology: selectCyto ? selectCyto.value : 'negative',
      gramAfb: selectGramAfb ? selectGramAfb.value : 'negative'
    };

    var res = window.PleuralEngine.analyze(inputData);
    renderResults(res);
  }

  /**
   * Hiển thị Kết quả ra UI
   */
  function renderResults(res) {
    // 1. Hero Diagnosis Banner
    if (heroBadge && heroTitle && heroSummary) {
      heroBadge.className = 'badge ' + res.primary.badgeClass;
      heroBadge.textContent = res.primary.type === 'EXUDATE' ? 'DỊCH TIẾT' : (res.primary.type === 'PSEUDO_EXUDATE' ? 'BẪY CÔ ĐẶC DỊCH' : 'DỊCH THẤM');
      heroTitle.textContent = res.primary.label;
      heroSummary.textContent = res.primary.summary;
    }

    // 2. Metrics & Light Criteria
    var m = res.metrics;

    if (valProtRatio) {
      valProtRatio.textContent = m.protRatio !== null ? m.protRatio.toFixed(2) : '—';
      badgeProtRatio.className = 'badge ' + (m.c1 === true ? 'badge-danger' : (m.c1 === false ? 'badge-success' : 'badge-neutral'));
      badgeProtRatio.textContent = m.c1 === true ? 'Dương tính (> 0.5)' : (m.c1 === false ? 'Âm tính (≤ 0.5)' : 'Chưa nhập');
    }

    if (valLdhRatio) {
      valLdhRatio.textContent = m.ldhRatio !== null ? m.ldhRatio.toFixed(2) : '—';
      badgeLdhRatio.className = 'badge ' + (m.c2 === true ? 'badge-danger' : (m.c2 === false ? 'badge-success' : 'badge-neutral'));
      badgeLdhRatio.textContent = m.c2 === true ? 'Dương tính (> 0.6)' : (m.c2 === false ? 'Âm tính (≤ 0.6)' : 'Chưa nhập');
    }

    if (valLdhUln) {
      valLdhUln.textContent = m.ldhUlnFraction !== null ? (m.ldhUlnFraction * 100).toFixed(0) + '% ULN' : '—';
      badgeLdhUln.className = 'badge ' + (m.c3 === true ? 'badge-danger' : (m.c3 === false ? 'badge-success' : 'badge-neutral'));
      badgeLdhUln.textContent = m.c3 === true ? 'Dương tính (> 67% ULN)' : (m.c3 === false ? 'Âm tính (≤ 67% ULN)' : 'Chưa nhập');
    }

    if (valSeag) {
      valSeag.textContent = m.seag !== null ? m.seag.toFixed(2) + ' g/dL' : '—';
      if (badgeSeag) {
        badgeSeag.className = 'badge ' + (m.isPseudoExudate ? 'badge-warning' : (m.seag !== null && m.seag > 1.2 ? 'badge-info' : 'badge-neutral'));
        badgeSeag.textContent = m.seag !== null ? (m.seag > 1.2 ? 'SEAG > 1.2 (Gợi ý Dịch thấm)' : 'SEAG ≤ 1.2 (Dịch tiết)') : 'Chưa nhập';
      }
    }

    // 3. Clinical Findings List
    if (containerFindings) {
      containerFindings.innerHTML = '';
      if (res.findings.length === 0) {
        containerFindings.innerHTML = '<div class="pleural-empty-state">Chưa phát hiện bất thường sinh hóa hoặc tế bào đặc hiệu.</div>';
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
        containerEtiologies.innerHTML = '<div class="pleural-empty-state">Chưa có đủ dữ liệu để xếp loại nguyên nhân.</div>';
      } else {
        res.etiologies.forEach(function (et) {
          var row = document.createElement('div');
          row.className = 'pleural-etiology-row';
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

    // 5. Clinical Recommendations
    if (containerRecommendations) {
      containerRecommendations.innerHTML = '';
      if (res.recommendations.length === 0) {
        containerRecommendations.innerHTML = '<div class="ab ab-info">ℹ️ Tiếp tục hoàn thiện các thông số sinh hóa & tế bào để nhận hướng dẫn xử trí cá thể hóa.</div>';
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

    // 6. Highlight Flowchart Nodes
    updateFlowchartNodes(res.activeFlowchartNodes);
  }

  /**
   * Cập nhật các Node trong Sơ đồ Thuật toán
   */
  function updateFlowchartNodes(activeNodeIds) {
    var allNodes = document.querySelectorAll('.pleural-fc-node');
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
