/**
 * Cirrhosis UI — Điều khiển Giao diện và Tương tác Studio Đánh giá Xơ gan
 * CliniPortal Studio Module
 */
(function (global) {
  'use strict';

  document.addEventListener('DOMContentLoaded', initCirrhosisStudio);

  function initCirrhosisStudio() {
    const Engine = global.CirrhosisEngine;
    const Scenarios = global.CIRRHOSIS_SCENARIOS || [];

    if (!Engine) {
      console.error('CirrhosisEngine core library missing!');
      return;
    }

    // DOM Elements
    const elements = {
      // Inputs
      age: document.getElementById('age'),
      gender: document.getElementById('gender'),
      bili: document.getElementById('bili'),
      biliUnit: document.getElementById('biliUnit'),
      alb: document.getElementById('alb'),
      albUnit: document.getElementById('albUnit'),
      inr: document.getElementById('inr'),
      cr: document.getElementById('cr'),
      crUnit: document.getElementById('crUnit'),
      sodium: document.getElementById('sodium'),
      dialysis: document.getElementById('dialysis'),
      ast: document.getElementById('ast'),
      alt: document.getElementById('alt'),
      plt: document.getElementById('plt'),
      ascites: document.getElementById('ascites'),
      encephalopathy: document.getElementById('encephalopathy'),

      // Checkboxes
      chk_varbleed: document.getElementById('chk_varbleed'),
      chk_sbp: document.getElementById('chk_sbp'),
      chk_hrs: document.getElementById('chk_hrs'),
      chk_jaundice: document.getElementById('chk_jaundice'),
      chk_fever: document.getElementById('chk_fever'),
      chk_confusion: document.getElementById('chk_confusion'),
      chk_hypotension: document.getElementById('chk_hypotension'),

      // Outputs / Cards
      cardChildPugh: document.getElementById('cardChildPugh'),
      cpScore: document.getElementById('cpScore'),
      cpClass: document.getElementById('cpClass'),
      cpDesc: document.getElementById('cpDesc'),
      cpMissing: document.getElementById('cpMissing'),
      cpSurvival: document.getElementById('cpSurvival'),

      cardMELD: document.getElementById('cardMELD'),
      meldNaScore: document.getElementById('meldNaScore'),
      meldSubScores: document.getElementById('meldSubScores'),
      meldClass: document.getElementById('meldClass'),
      meldDesc: document.getElementById('meldDesc'),
      meldMissing: document.getElementById('meldMissing'),
      meldMeterFill: document.getElementById('meldMeterFill'),

      cardFibrosis: document.getElementById('cardFibrosis'),
      fib4Val: document.getElementById('fib4Val'),
      fib4Text: document.getElementById('fib4Text'),
      apriVal: document.getElementById('apriVal'),
      apriText: document.getElementById('apriText'),

      cardALBI: document.getElementById('cardALBI'),
      albiVal: document.getElementById('albiVal'),
      albiText: document.getElementById('albiText'),

      cardDecomp: document.getElementById('cardDecomp'),
      decompTitle: document.getElementById('decompTitle'),
      decompList: document.getElementById('decompList'),

      alertRed: document.getElementById('alertRed'),
      alertContent: document.getElementById('alertContent'),

      recBox: document.getElementById('recBox'),
      recList: document.getElementById('recList'),

      // Actions
      presetContainer: document.getElementById('presetContainer'),
      btnReset: document.getElementById('btnReset'),
      btnCopyEMR: document.getElementById('btnCopyEMR'),
      emrPreview: document.getElementById('emrPreview'),
      btnToggleEMR: document.getElementById('btnToggleEMR'),
      emrBoxContainer: document.getElementById('emrBoxContainer')
    };

    // Helper reading input value
    function getVal(el) {
      if (!el) return null;
      const v = parseFloat(el.value);
      return isNaN(v) ? null : v;
    }

    function getStr(el) {
      return el ? el.value : '';
    }

    function getChk(el) {
      return el ? el.checked : false;
    }

    // Render Scenario Presets
    function renderPresets() {
      if (!elements.presetContainer || !Scenarios.length) return;
      elements.presetContainer.innerHTML = '';

      Scenarios.forEach(sc => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `sc-btn ${sc.id === 'compensated' ? 'sc-teal' : sc.id === 'mild_decomp' ? 'sc-amber' : sc.id === 'severe_decomp' ? 'sc-danger' : sc.id === 'dialysis_meld' ? 'sc-purple' : 'sc-blue'}`;
        btn.innerHTML = `
          <div class="sc-title">${sc.title}</div>
          <div class="sc-desc">${sc.desc}</div>
        `;
        btn.addEventListener('click', () => applyScenario(sc));
        elements.presetContainer.appendChild(btn);
      });
    }

    // Apply Scenario Data to Form
    function applyScenario(sc) {
      const d = sc.data;
      if (!d) return;

      if (elements.age) elements.age.value = d.age || '';
      if (elements.gender) elements.gender.value = d.gender || 'male';
      if (elements.bili) elements.bili.value = d.bili || '';
      if (elements.biliUnit) elements.biliUnit.value = d.biliUnit || 'mg/dL';
      if (elements.alb) elements.alb.value = d.alb || '';
      if (elements.albUnit) elements.albUnit.value = d.albUnit || 'g/dL';
      if (elements.inr) elements.inr.value = d.inr || '';
      if (elements.cr) elements.cr.value = d.cr || '';
      if (elements.crUnit) elements.crUnit.value = d.crUnit || 'mg/dL';
      if (elements.sodium) elements.sodium.value = d.sodium || '';
      if (elements.dialysis) elements.dialysis.value = d.dialysis || 0;
      if (elements.ast) elements.ast.value = d.ast || '';
      if (elements.alt) elements.alt.value = d.alt || '';
      if (elements.plt) elements.plt.value = d.plt || '';
      if (elements.ascites) elements.ascites.value = d.ascites || '';
      if (elements.encephalopathy) elements.encephalopathy.value = d.encephalopathy || '';

      if (elements.chk_varbleed) elements.chk_varbleed.checked = !!d.chk_varbleed;
      if (elements.chk_sbp) elements.chk_sbp.checked = !!d.chk_sbp;
      if (elements.chk_hrs) elements.chk_hrs.checked = !!d.chk_hrs;
      if (elements.chk_jaundice) elements.chk_jaundice.checked = !!d.chk_jaundice;
      if (elements.chk_fever) elements.chk_fever.checked = !!d.chk_fever;
      if (elements.chk_confusion) elements.chk_confusion.checked = !!d.chk_confusion;
      if (elements.chk_hypotension) elements.chk_hypotension.checked = !!d.chk_hypotension;

      // Update active scenario visual
      document.querySelectorAll('#presetContainer .sc-btn').forEach(b => b.classList.remove('active'));
      event.currentTarget.classList.add('active');

      runCalculation();
    }

    // Reset Form
    function resetForm() {
      const inputs = document.querySelectorAll('.cirrhosis-panel-card input, .cirrhosis-panel-card select');
      inputs.forEach(inp => {
        if (inp.type === 'checkbox') inp.checked = false;
        else if (inp.type === 'number' || inp.type === 'text') inp.value = '';
        else if (inp.tagName === 'SELECT') inp.selectedIndex = 0;
      });

      document.querySelectorAll('#presetContainer .sc-btn').forEach(b => b.classList.remove('active'));
      runCalculation();
    }

    // Main Engine Runner & UI Updater
    function runCalculation() {
      const rawData = {
        age: getVal(elements.age),
        gender: getStr(elements.gender),
        bili: getVal(elements.bili),
        biliUnit: getStr(elements.biliUnit),
        alb: getVal(elements.alb),
        albUnit: getStr(elements.albUnit),
        inr: getVal(elements.inr),
        cr: getVal(elements.cr),
        crUnit: getStr(elements.crUnit),
        sodium: getVal(elements.sodium),
        dialysis: parseInt(getStr(elements.dialysis)) || 0,
        ast: getVal(elements.ast),
        alt: getVal(elements.alt),
        plt: getVal(elements.plt),
        ascites: parseInt(getStr(elements.ascites)) || 0,
        encephalopathy: parseInt(getStr(elements.encephalopathy)) || 0,
        chk_varbleed: getChk(elements.chk_varbleed),
        chk_sbp: getChk(elements.chk_sbp),
        chk_hrs: getChk(elements.chk_hrs),
        chk_jaundice: getChk(elements.chk_jaundice),
        chk_fever: getChk(elements.chk_fever),
        chk_confusion: getChk(elements.chk_confusion),
        chk_hypotension: getChk(elements.chk_hypotension)
      };

      // 1. Convert Units
      const converted = Engine.convertUnits(rawData);

      // 2. Child-Pugh Score
      const cpRes = Engine.calcChildPugh(converted);
      updateChildPughUI(cpRes);

      // 3. MELD Scores
      const meldRes = Engine.calcMELD(converted);
      updateMELDUI(meldRes);

      // 4. Fibrosis (FIB-4 & APRI)
      const fibRes = Engine.calcFibrosis(converted);
      updateFibrosisUI(fibRes);

      // 5. ALBI Grade
      const albiRes = Engine.calcALBI(converted);
      updateALBIUI(albiRes);

      // 6. Decompensation & CDSS
      const decompRes = Engine.evalDecompensation(rawData, cpRes, meldRes);
      updateDecompUI(decompRes);

      // 7. EMR Report Generator
      updateEMRReport(converted, cpRes, meldRes, fibRes, albiRes, decompRes);
    }

    // UI Updater: Child-Pugh
    function updateChildPughUI(res) {
      if (!elements.cardChildPugh) return;
      elements.cardChildPugh.className = `score-card ${res.color}`;

      if (res.complete) {
        elements.cpScore.textContent = `${res.score} (Class ${res.class})`;
        elements.cpClass.textContent = res.label;
        elements.cpDesc.textContent = res.desc;
        if (elements.cpMissing) elements.cpMissing.textContent = '';
        if (elements.cpSurvival) {
          elements.cpSurvival.innerHTML = `<strong>Tỷ lệ sống:</strong> 1 năm ~${res.survival1y} | 2 năm ~${res.survival2y}<br><strong>Phẫu thuật:</strong> Nguy cơ ${res.surgRisk}`;
        }
      } else {
        elements.cpScore.textContent = '—';
        elements.cpClass.textContent = res.label;
        elements.cpDesc.textContent = res.desc;
        if (elements.cpMissing) elements.cpMissing.textContent = `Còn thiếu: ${res.missing.join(', ')}`;
        if (elements.cpSurvival) elements.cpSurvival.innerHTML = '';
      }
    }

    // UI Updater: MELD
    function updateMELDUI(res) {
      if (!elements.cardMELD) return;
      elements.cardMELD.className = `score-card ${res.color}`;

      if (res.complete) {
        elements.meldNaScore.textContent = res.meldNa;
        elements.meldSubScores.innerHTML = `MELD 3.0: <strong>${res.meld30}</strong> | MELD gốc: <strong>${res.meld}</strong>`;
        elements.meldClass.textContent = res.label;
        elements.meldDesc.textContent = `${res.desc} (Tử vong 90 ngày: ${res.mort90d})`;
        if (elements.meldMissing) elements.meldMissing.textContent = '';

        // Meter fill
        if (elements.meldMeterFill) {
          const pct = Math.min(Math.max(((res.meldNa - 6) / (40 - 6)) * 100, 5), 100);
          elements.meldMeterFill.style.width = `${pct}%`;
        }
      } else {
        elements.meldNaScore.textContent = '—';
        elements.meldSubScores.innerHTML = '';
        elements.meldClass.textContent = res.label;
        elements.meldDesc.textContent = res.desc;
        if (elements.meldMissing) elements.meldMissing.textContent = `Còn thiếu: ${res.missing.join(', ')}`;
        if (elements.meldMeterFill) elements.meldMeterFill.style.width = '0%';
      }
    }

    // UI Updater: Fibrosis
    function updateFibrosisUI(res) {
      if (!elements.cardFibrosis) return;

      if (res.fib4) {
        elements.fib4Val.textContent = res.fib4;
        elements.fib4Text.textContent = res.fib4Text;
        elements.fib4Text.className = `score-desc text-${res.fib4Color}`;
      } else {
        elements.fib4Val.textContent = '—';
        elements.fib4Text.textContent = 'Nhập: Tuổi, AST, ALT, Tiêu cầu để tính FIB-4';
        elements.fib4Text.className = 'score-desc';
      }

      if (res.apri) {
        elements.apriVal.textContent = res.apri;
        elements.apriText.textContent = res.apriText;
        elements.apriText.className = `score-desc text-${res.apriColor}`;
      } else {
        elements.apriVal.textContent = '—';
        elements.apriText.textContent = 'Nhập: AST, Tiêu cầu để tính APRI';
        elements.apriText.className = 'score-desc';
      }
    }

    // UI Updater: ALBI
    function updateALBIUI(res) {
      if (!elements.cardALBI) return;

      if (res.score !== null) {
        elements.albiVal.textContent = `Grade ${res.grade} (${res.score})`;
        elements.albiText.textContent = res.label;
        elements.albiText.className = `score-desc text-${res.color}`;
      } else {
        elements.albiVal.textContent = '—';
        elements.albiText.textContent = 'Nhập: Bilirubin và Albumin để tính ALBI Grade';
        elements.albiText.className = 'score-desc';
      }
    }

    // UI Updater: Decompensation & Alerts
    function updateDecompUI(res) {
      if (!elements.cardDecomp) return;

      if (res.isDecompensated) {
        elements.cardDecomp.className = 'decomp-card decomp';
        elements.decompTitle.textContent = '🔴 Xơ Gan Mất Bù — Cần Hồi Sức / Ghép Gan';
      } else {
        elements.cardDecomp.className = 'decomp-card comp';
        elements.decompTitle.textContent = '🟢 Xơ Gan Còn Bù — Theo Dõi Định Kỳ';
      }

      if (elements.decompList) {
        elements.decompList.innerHTML = '';
        if (res.flags.length > 0) {
          res.flags.forEach(f => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="flag">✦</span> ${f}`;
            elements.decompList.appendChild(li);
          });
        } else {
          const li = document.createElement('li');
          li.textContent = 'Chưa ghi nhận dấu mất bù lâm sàng. Tiếp tục tầm soát biến chứng và điều trị nguyên nhân.';
          elements.decompList.appendChild(li);
        }
      }

      // Red Alerts Box
      if (elements.alertRed) {
        if (res.redAlerts.length > 0) {
          elements.alertRed.style.display = 'block';
          elements.alertContent.innerHTML = res.redAlerts.map(a => `<div class="alert-item">${a}</div>`).join('');
        } else {
          elements.alertRed.style.display = 'none';
        }
      }

      // Recommendations Box
      if (elements.recBox && elements.recList) {
        if (res.recommendations.length > 0) {
          elements.recBox.style.display = 'block';
          elements.recList.innerHTML = res.recommendations.map(r => `<li><i class="fa-solid fa-check text-primary"></i> ${r}</li>`).join('');
        } else {
          elements.recBox.style.display = 'none';
        }
      }
    }

    // UI Updater: EMR Report Preview
    function updateEMRReport(converted, cpRes, meldRes, fibRes, albiRes, decompRes) {
      if (!elements.emrPreview) return;
      const report = Engine.generateEMRReport(converted, cpRes, meldRes, fibRes, albiRes, decompRes);
      elements.emrPreview.value = report;
    }

    // Copy EMR Action
    function copyEMR() {
      if (!elements.emrPreview) return;
      elements.emrPreview.select();
      navigator.clipboard.writeText(elements.emrPreview.value).then(() => {
        const origText = elements.btnCopyEMR.innerHTML;
        elements.btnCopyEMR.innerHTML = '<i class="fa-solid fa-check"></i> Đã Sao Chép!';
        elements.btnCopyEMR.classList.add('btn-success');
        setTimeout(() => {
          elements.btnCopyEMR.innerHTML = origText;
          elements.btnCopyEMR.classList.remove('btn-success');
        }, 2000);
      }).catch(err => {
        alert('Không thể sao chép văn bản. Vui lòng chọn và chép thủ công.');
      });
    }

    // Attach Event Listeners
    function attachEvents() {
      const allInputs = document.querySelectorAll('.cirrhosis-panel-card input, .cirrhosis-panel-card select');
      allInputs.forEach(input => {
        input.addEventListener('input', runCalculation);
        input.addEventListener('change', runCalculation);
      });

      if (elements.btnReset) elements.btnReset.addEventListener('click', resetForm);
      if (elements.btnCopyEMR) elements.btnCopyEMR.addEventListener('click', copyEMR);

      if (elements.btnToggleEMR && elements.emrBoxContainer) {
        elements.btnToggleEMR.addEventListener('click', () => {
          const isHidden = elements.emrBoxContainer.style.display === 'none';
          elements.emrBoxContainer.style.display = isHidden ? 'block' : 'none';
          elements.btnToggleEMR.innerHTML = isHidden
            ? '<i class="fa-solid fa-file-lines"></i> Ẩn Khung Báo Cáo EMR'
            : '<i class="fa-solid fa-file-lines"></i> Hiện Khung Báo Cáo EMR';
        });
      }
    }

    // Initialize
    renderPresets();
    attachEvents();
    runCalculation();
  }
})(typeof window !== 'undefined' ? window : this);
