/**
 * Resuscitative Metabolic, Electrolyte & AEIOU Dialysis Crisis UI Controller
 * CliniPortal Design System
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Element Selectors
  const inputIds = [
    'ph', 'paco2', 'hco3', 'na', 'cl', 'albumin', 'lactate', 'weight', 'k',
    'ekgPattern', 'hasCvc', 'hasSeizures', 'hasComa', 'hasIcpSign', 'hasAki',
    'isKetoacidosis', 'aeiou_a', 'aeiou_e', 'aeiou_i', 'aeiou_o', 'aeiou_u',
    'isHemodynamicallyUnstable'
  ];

  const inputs = {};
  inputIds.forEach(id => {
    inputs[id] = document.getElementById(id);
  });

  // Result Elements
  const resHeroBadge = document.getElementById('resHeroBadge');
  const resHeroTitle = document.getElementById('resHeroTitle');
  const resHeroSummary = document.getElementById('resHeroSummary');

  const valAbgPrimary = document.getElementById('valAbgPrimary');
  const valAgAdj = document.getElementById('valAgAdj');
  const valDeltaRatio = document.getElementById('valDeltaRatio');

  const containerHyperkalemia = document.getElementById('containerHyperkalemia');
  const containerHyponatremia = document.getElementById('containerHyponatremia');
  const containerBicarIcu = document.getElementById('containerBicarIcu');
  const containerAeiouDialysis = document.getElementById('containerAeiouDialysis');
  const containerGoldmark = document.getElementById('containerGoldmark');

  const scenarioContainer = document.getElementById('scenarioPresetContainer');
  const btnCopyReport = document.getElementById('btnCopyEmrReport');
  const btnReset = document.getElementById('btnResetStudio');

  // AEIOU Cards
  const aeiouCards = {
    a: document.getElementById('aeiouCardA'),
    e: document.getElementById('aeiouCardE'),
    i: document.getElementById('aeiouCardI'),
    o: document.getElementById('aeiouCardO'),
    u: document.getElementById('aeiouCardU')
  };

  // 2. Main Calculation & UI Render Function
  function renderCalculations() {
    if (!window.MetabolicEngine) return;

    // Gather Input Values
    const rawData = {
      ph: inputs.ph ? inputs.ph.value : 7.4,
      paco2: inputs.paco2 ? inputs.paco2.value : 40,
      hco3: inputs.hco3 ? inputs.hco3.value : 24,
      na: inputs.na ? inputs.na.value : 140,
      cl: inputs.cl ? inputs.cl.value : 104,
      albumin: inputs.albumin ? inputs.albumin.value : 4.0,
      lactate: inputs.lactate ? inputs.lactate.value : 1.0,
      weight: inputs.weight ? inputs.weight.value : 60,
      k: inputs.k ? inputs.k.value : 4.2,
      ekgPattern: inputs.ekgPattern ? inputs.ekgPattern.value : 'normal',
      hasCvc: inputs.hasCvc ? inputs.hasCvc.checked : false,
      hasSeizures: inputs.hasSeizures ? inputs.hasSeizures.checked : false,
      hasComa: inputs.hasComa ? inputs.hasComa.checked : false,
      hasIcpSign: inputs.hasIcpSign ? inputs.hasIcpSign.checked : false,
      hasAki: inputs.hasAki ? inputs.hasAki.checked : false,
      isKetoacidosis: inputs.isKetoacidosis ? inputs.isKetoacidosis.checked : false,
      aeiou_a: inputs.aeiou_a ? inputs.aeiou_a.checked : false,
      aeiou_e: inputs.aeiou_e ? inputs.aeiou_e.checked : false,
      aeiou_i: inputs.aeiou_i ? inputs.aeiou_i.checked : false,
      aeiou_o: inputs.aeiou_o ? inputs.aeiou_o.checked : false,
      aeiou_u: inputs.aeiou_u ? inputs.aeiou_u.checked : false,
      isHemodynamicallyUnstable: inputs.isHemodynamicallyUnstable ? inputs.isHemodynamicallyUnstable.checked : false
    };

    // Engine Evaluations
    const abgRes = window.MetabolicEngine.analyzeAbg(rawData);
    const kRes = window.MetabolicEngine.analyzeHyperkalemia(rawData);
    const naRes = window.MetabolicEngine.analyzeHyponatremia(rawData);
    const bicarRes = window.MetabolicEngine.analyzeBicarIcu(rawData);
    const aeiouRes = window.MetabolicEngine.analyzeAeiou(rawData);

    // Update Hero Banner
    if (aeiouRes.isDialysisRequired || kRes.isEmergency || naRes.isSevereSymptomatic || bicarRes.isIndicated) {
      if (resHeroBadge) {
        resHeroBadge.className = 'badge badge-danger';
        resHeroBadge.innerHTML = '🚨 CẤP CỨU HỒI SỨC NGUY HIỂM TÍNH MẠNG';
      }
    } else {
      if (resHeroBadge) {
        resHeroBadge.className = 'badge badge-success';
        resHeroBadge.innerHTML = '✅ TÌNH TRẠNG ỔN ĐỊNH / THEO DÕI';
      }
    }

    if (resHeroTitle) resHeroTitle.innerText = abgRes.primary;
    if (resHeroSummary) {
      resHeroSummary.innerHTML = `pH: <strong>${abgRes.ph}</strong> | PaCO2: <strong>${abgRes.paco2}</strong> mmHg | HCO3: <strong>${abgRes.hco3}</strong> mEq/L | AG hiệu chỉnh: <strong>${abgRes.adjAg}</strong> mEq/L`;
    }

    // Update 3 KPI Score Badges
    if (valAbgPrimary) valAbgPrimary.innerText = abgRes.primary.split('(')[0];
    if (valAgAdj) valAgAdj.innerText = abgRes.adjAg;
    if (valDeltaRatio) valDeltaRatio.innerText = abgRes.deltaRatio;

    // Update AEIOU Visual Cards
    if (aeiouCards.a) aeiouCards.a.classList.toggle('active', aeiouRes.a);
    if (aeiouCards.e) aeiouCards.e.classList.toggle('active', aeiouRes.e);
    if (aeiouCards.i) aeiouCards.i.classList.toggle('active', aeiouRes.i);
    if (aeiouCards.o) aeiouCards.o.classList.toggle('active', aeiouRes.o);
    if (aeiouCards.u) aeiouCards.u.classList.toggle('active', aeiouRes.u);

    // Render Hyperkalemia Panel
    if (containerHyperkalemia) {
      containerHyperkalemia.innerHTML = `
        <div style="padding: 0.85rem; border-radius: 10px; background: ${kRes.isEmergency ? 'rgba(239, 68, 68, 0.08)' : 'var(--color-surface)'}; border: 1px solid ${kRes.isEmergency ? 'var(--color-danger)' : 'var(--color-border)'};">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
            <strong style="color: ${kRes.isEmergency ? 'var(--color-danger)' : 'var(--color-text)'}; font-size: 0.95rem;">⚡ Tăng Kali Máu (K+ = ${kRes.k} mmol/L): ${kRes.severity}</strong>
            <span class="badge ${kRes.isEmergency ? 'badge-danger' : 'badge-info'}">${kRes.threatLevel}</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--color-danger); font-weight: 700; margin-bottom: 0.5rem;">${kRes.ekgAlert}</p>
          <div style="font-size: 0.82rem; display: flex; flex-direction: column; gap: 0.3rem;">
            <div><strong>🔴 Ổn định màng tim:</strong> ${kRes.calciumDose}</div>
            <div><strong>🔵 Shift Kali vào tế bào:</strong> ${kRes.insulinDose}</div>
            <div><strong>🟢 Phun khí dung:</strong> ${kRes.salbutamolDose}</div>
          </div>
        </div>
      `;
    }

    // Render Hyponatremia NaCl 3% Bolus Panel
    if (containerHyponatremia) {
      containerHyponatremia.innerHTML = `
        <div style="padding: 0.85rem; border-radius: 10px; background: ${naRes.isSevereSymptomatic ? 'rgba(139, 92, 246, 0.08)' : 'var(--color-surface)'}; border: 1px solid ${naRes.isSevereSymptomatic ? '#8b5cf6' : 'var(--color-border)'};">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
            <strong style="color: #8b5cf6; font-size: 0.95rem;">💧 Hạ Natri Máu (Na+ = ${naRes.na} mmol/L): ${naRes.protocolTitle}</strong>
          </div>
          <p style="font-size: 0.85rem; font-weight: 700; color: var(--color-text); margin-bottom: 0.3rem;">${naRes.rescueBolus}</p>
          <p style="font-size: 0.8rem; color: var(--color-text-muted); margin: 0;">${naRes.targetNaRise}</p>
        </div>
      `;
    }

    // Render BICAR-ICU Protocol Panel
    if (containerBicarIcu) {
      containerBicarIcu.innerHTML = `
        <div style="padding: 0.85rem; border-radius: 10px; background: ${bicarRes.isIndicated ? 'rgba(2, 132, 199, 0.08)' : 'var(--color-surface)'}; border: 1px solid ${bicarRes.isIndicated ? 'var(--color-primary)' : 'var(--color-border)'};">
          <strong style="color: var(--color-primary); font-size: 0.9rem; display: block; margin-bottom: 0.3rem;">🟡 NaHCO3 8.4% BICAR-ICU Protocol (pH = ${bicarRes.ph})</strong>
          <p style="font-size: 0.84rem; font-weight: 700; color: var(--color-text); margin-bottom: 0.3rem;">${bicarRes.summary}</p>
          <p style="font-size: 0.82rem; color: var(--color-text-muted); margin: 0;">${bicarRes.dose}</p>
        </div>
      `;
    }

    // Render AEIOU Dialysis Panel
    if (containerAeiouDialysis) {
      containerAeiouDialysis.innerHTML = `
        <div style="padding: 0.85rem; border-radius: 10px; background: ${aeiouRes.isDialysisRequired ? 'rgba(239, 68, 68, 0.1)' : 'var(--color-surface)'}; border: 1px solid ${aeiouRes.isDialysisRequired ? 'var(--color-danger)' : 'var(--color-border)'};">
          <strong style="color: var(--color-danger); font-size: 0.95rem; display: block; margin-bottom: 0.3rem;">🏥 Kích Hoạt Lọc Máu Cấp Cứu Khẩn (AEIOU Criteria)</strong>
          <p style="font-size: 0.85rem; font-weight: 800; color: var(--color-danger); margin-bottom: 0.4rem;">${aeiouRes.recommendation}</p>
          <p style="font-size: 0.84rem; font-weight: 700; color: var(--color-primary); margin: 0;">${aeiouRes.mode}</p>
        </div>
      `;
    }

    // Render GOLD MARK Panel
    if (containerGoldmark) {
      if (abgRes.isHagma && abgRes.goldmark.length > 0) {
        containerGoldmark.innerHTML = `
          <div style="padding: 0.85rem; border-radius: 10px; background: rgba(245, 158, 11, 0.08); border: 1px solid var(--color-warning);">
            <strong style="color: var(--color-warning); font-size: 0.9rem; display: block; margin-bottom: 0.4rem;"><i class="fa-solid fa-list-check"></i> Tra Cứu Nguyên Nhân HAGMA (GOLD MARK Matrix)</strong>
            <ul style="font-size: 0.8rem; margin: 0; padding-left: 1.2rem; color: var(--color-text);">
              ${abgRes.goldmark.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `;
      } else {
        containerGoldmark.innerHTML = '';
      }
    }
  }

  // 3. Render Scenario Presets
  function renderPresets() {
    if (!scenarioContainer || !window.MetabolicScenarios) return;

    scenarioContainer.innerHTML = window.MetabolicScenarios.map(sc => `
      <button type="button" class="sc-btn ${sc.badgeClass}" data-sc-id="${sc.id}">
        <div class="sc-btn-title">${sc.title}</div>
        <div class="sc-btn-desc">${sc.desc}</div>
      </button>
    `).join('');

    scenarioContainer.querySelectorAll('.sc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-sc-id');
        const found = window.MetabolicScenarios.find(s => s.id === id);
        if (found) {
          applyScenarioData(found.data);
        }
      });
    });
  }

  function applyScenarioData(d) {
    Object.keys(d).forEach(k => {
      if (inputs[k]) {
        if (inputs[k].type === 'checkbox') {
          inputs[k].checked = d[k];
        } else {
          inputs[k].value = d[k];
        }
      }
    });
    renderCalculations();
  }

  // 4. Attach Event Listeners
  inputIds.forEach(id => {
    if (inputs[id]) {
      inputs[id].addEventListener('input', renderCalculations);
      inputs[id].addEventListener('change', renderCalculations);
    }
  });

  // 5. Copy EMR Report Button
  if (btnCopyReport) {
    btnCopyReport.addEventListener('click', () => {
      const ph = inputs.ph ? inputs.ph.value : '7.4';
      const paco2 = inputs.paco2 ? inputs.paco2.value : '40';
      const hco3 = inputs.hco3 ? inputs.hco3.value : '24';
      const na = inputs.na ? inputs.na.value : '140';
      const cl = inputs.cl ? inputs.cl.value : '104';
      const k = inputs.k ? inputs.k.value : '4.2';

      const reportText = `[BÁO CÁO CẤP CỨU RỐI LOẠN ĐIỆN GIẢI & TOAN KIỀM - CLINIPORTAL]
- Khí máu động mạch (ABG): pH ${ph} | PaCO2 ${paco2} mmHg | HCO3 ${hco3} mEq/L
- Điện giải đồ: Na+ ${na} mmol/L | K+ ${k} mmol/L | Cl- ${cl} mmol/L
- Tiêu chuẩn Lọc máu cấp cứu (AEIOU): ${document.getElementById('containerAeiouDialysis') ? document.getElementById('containerAeiouDialysis').innerText : 'N/A'}
- Y lệnh Xử trí khẩn: Xem chi tiết tại CliniPortal Emergency Resuscitation Workstation.`;

      navigator.clipboard.writeText(reportText).then(() => {
        alert('📋 Đã sao chép Báo cáo Cấp cứu EMR vào Clipboard!');
      }).catch(err => {
        console.error('Lỗi sao chép EMR:', err);
      });
    });
  }

  // 6. Reset Button
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (window.MetabolicScenarios && window.MetabolicScenarios[0]) {
        applyScenarioData(window.MetabolicScenarios[0].data);
      }
    });
  }

  // Initial Boot
  renderPresets();
  renderCalculations();
});
