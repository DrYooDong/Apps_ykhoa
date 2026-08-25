/**
 * Cardiogenic Shock & ACS Interventional Pro UI Controller
 * CliniPortal Design System
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Element Selectors
  const inputIds = [
    'age', 'weight', 'sbp', 'hr', 'lactate', 'numVasopressors', 'killip', 'timeToPci',
    'isAnteriorStemi', 'hasColdExtremities', 'hasOliguria', 'isCardiacArrest',
    'hasMechanicalSupport', 'hasVsrOrMr'
  ];

  const inputs = {};
  inputIds.forEach(id => {
    inputs[id] = document.getElementById(id);
  });

  // Result Elements
  const resHeroBadge = document.getElementById('resHeroBadge');
  const resHeroTitle = document.getElementById('resHeroTitle');
  const resHeroSummary = document.getElementById('resHeroSummary');

  const valScaiStage = document.getElementById('valScaiStage');
  const valTimiScore = document.getElementById('valTimiScore');
  const valInotropeSpeed = document.getElementById('valInotropeSpeed');

  const containerScaiDetails = document.getElementById('containerScaiDetails');
  const containerInotropeDetails = document.getElementById('containerInotropeDetails');
  const containerMcsDetails = document.getElementById('containerMcsDetails');

  const scenarioContainer = document.getElementById('scenarioPresetContainer');
  const btnCopyReport = document.getElementById('btnCopyEmrReport');
  const btnReset = document.getElementById('btnResetStudio');

  // 2. Main Calculation & UI Render Function
  function renderCalculations() {
    if (!window.CardiogenicEngine) return;

    // Gather Input Values
    const rawData = {
      age: inputs.age ? inputs.age.value : 65,
      weight: inputs.weight ? inputs.weight.value : 68,
      sbp: inputs.sbp ? inputs.sbp.value : 82,
      hr: inputs.hr ? inputs.hr.value : 115,
      lactate: inputs.lactate ? inputs.lactate.value : 3.2,
      numVasopressors: inputs.numVasopressors ? inputs.numVasopressors.value : 1,
      killip: inputs.killip ? inputs.killip.value : 3,
      timeToPci: inputs.timeToPci ? inputs.timeToPci.value : 2.0,
      isAnteriorStemi: inputs.isAnteriorStemi ? inputs.isAnteriorStemi.checked : true,
      hasColdExtremities: inputs.hasColdExtremities ? inputs.hasColdExtremities.checked : true,
      hasOliguria: inputs.hasOliguria ? inputs.hasOliguria.checked : true,
      isCardiacArrest: inputs.isCardiacArrest ? inputs.isCardiacArrest.checked : false,
      hasMechanicalSupport: inputs.hasMechanicalSupport ? inputs.hasMechanicalSupport.checked : false,
      hasVsrOrMr: inputs.hasVsrOrMr ? inputs.hasVsrOrMr.checked : false
    };

    // Engine Evaluations
    const scaiRes = window.CardiogenicEngine.calculateScaiStage(rawData);
    const timiRes = window.CardiogenicEngine.calculateTimiStemi(rawData);
    const inoRes = window.CardiogenicEngine.calculateInotropes(rawData);
    const mcsRes = window.CardiogenicEngine.evaluateMcsTriggers({
      ...rawData,
      scaiStage: scaiRes.stage
    });

    // Update Hero Banner
    if (resHeroBadge) {
      resHeroBadge.className = `badge ${scaiRes.badgeClass}`;
      resHeroBadge.innerHTML = scaiRes.stage;
    }

    if (resHeroTitle) resHeroTitle.innerText = `Sốc Tim ${scaiRes.stage} — Nguy Cơ Tử Vong: ${scaiRes.mortality}`;
    if (resHeroSummary) {
      resHeroSummary.innerHTML = `SBP: <strong>${rawData.sbp}</strong> mmHg | HR: <strong>${rawData.hr}</strong> bpm | Lactate: <strong>${rawData.lactate}</strong> mmol/L | TIMI STEMI: <strong>${timiRes.score} điểm</strong> (Tử vong 30d: ${timiRes.mortality30d})`;
    }

    // Update 3 KPI Score Badges
    if (valScaiStage) valScaiStage.innerText = scaiRes.stage.split(' ')[1] || 'C';
    if (valTimiScore) valTimiScore.innerText = `${timiRes.score} đ (${timiRes.mortality30d})`;
    if (valInotropeSpeed) valInotropeSpeed.innerText = `NE: ${inoRes.neSpeed} mL/h`;

    // Render SCAI Details Panel
    if (containerScaiDetails) {
      containerScaiDetails.innerHTML = `
        <div style="padding: 0.85rem; border-radius: 10px; background: rgba(239, 68, 68, 0.08); border: 1px solid var(--color-danger);">
          <strong style="color: var(--color-danger); font-size: 0.95rem; display: block; margin-bottom: 0.3rem;">📊 Đánh Giá Phân Tầng Sốc Tim SCAI Shock Stage</strong>
          <p style="font-size: 0.85rem; font-weight: 700; color: var(--color-text); margin-bottom: 0.3rem;">${scaiRes.description}</p>
          <p style="font-size: 0.82rem; color: var(--color-text-muted); margin: 0;">Tỷ lệ tử vong dự đoán: <strong>${scaiRes.mortality}</strong></p>
        </div>
      `;
    }

    // Render Inotrope Details Panel
    if (containerInotropeDetails) {
      containerInotropeDetails.innerHTML = `
        <div style="padding: 0.85rem; border-radius: 10px; background: rgba(2, 132, 199, 0.06); border: 1px solid var(--color-primary);">
          <strong style="color: var(--color-primary); font-size: 0.95rem; display: block; margin-bottom: 0.4rem;">💊 Tốc Độ Bơm Tiêm Điện Thuốc Tăng Co Bóp & Vận Mạch (Cân nặng: ${rawData.weight} kg)</strong>
          <p style="font-size: 0.83rem; font-weight: 700; color: var(--color-danger); margin-bottom: 0.5rem;">${inoRes.recommendation}</p>
          <div style="font-size: 0.82rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
            <div>🔴 <strong>Norepinephrine (4mg/50mL):</strong> ${inoRes.neSpeed} mL/h (${inoRes.neDose} mcg/kg/min)</div>
            <div>🔵 <strong>Dobutamine (250mg/50mL):</strong> ${inoRes.dobuSpeed} mL/h (${inoRes.dobuDose} mcg/kg/min)</div>
            <div>🟢 <strong>Epinephrine (1mg/50mL):</strong> ${inoRes.epiSpeed} mL/h (${inoRes.epiDose} mcg/kg/min)</div>
          </div>
        </div>
      `;
    }

    // Render MCS Details Panel
    if (containerMcsDetails) {
      containerMcsDetails.innerHTML = `
        <div style="padding: 0.85rem; border-radius: 10px; background: ${mcsRes.impellaEcmosIndicated || mcsRes.iabpIndicated ? 'rgba(239, 68, 68, 0.1)' : 'var(--color-surface)'}; border: 1px solid ${mcsRes.impellaEcmosIndicated || mcsRes.iabpIndicated ? 'var(--color-danger)' : 'var(--color-border)'};">
          <strong style="color: var(--color-danger); font-size: 0.95rem; display: block; margin-bottom: 0.3rem;">🫀 Chỉ Định Hỗ Trợ Tuần Hoàn Cơ Học (MCS: IABP / Impella / VA-ECMO)</strong>
          <p style="font-size: 0.85rem; font-weight: 800; color: var(--color-danger); margin: 0;">${mcsRes.summary}</p>
        </div>
      `;
    }
  }

  // 3. Render Scenario Presets
  function renderPresets() {
    if (!scenarioContainer || !window.CardiogenicScenarios) return;

    scenarioContainer.innerHTML = window.CardiogenicScenarios.map(sc => `
      <button type="button" class="sc-btn ${sc.badgeClass}" data-sc-id="${sc.id}">
        <div class="sc-btn-title">${sc.title}</div>
        <div class="sc-btn-desc">${sc.desc}</div>
      </button>
    `).join('');

    scenarioContainer.querySelectorAll('.sc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-sc-id');
        const found = window.CardiogenicScenarios.find(s => s.id === id);
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
      const sbp = inputs.sbp ? inputs.sbp.value : '82';
      const hr = inputs.hr ? inputs.hr.value : '115';
      const lactate = inputs.lactate ? inputs.lactate.value : '3.2';

      const reportText = `[BÁO CÁO CẤP CỨU SỐC TIM & CAN THIỆP MẠCH VÀNH - CLINIPORTAL]
- Huyết động: HA ${sbp} mmHg | Tần số tim ${hr} bpm | Lactate ${lactate} mmol/L
- Phân tầng Sốc tim SCAI: ${document.getElementById('resHeroBadge') ? document.getElementById('resHeroBadge').innerText : 'N/A'}
- Liều Vận mạch BTĐ: ${document.getElementById('containerInotropeDetails') ? document.getElementById('containerInotropeDetails').innerText : 'N/A'}
- Y lệnh Thuốc chống đông/kháng tiểu cầu kép: Aspirin 300mg + Ticagrelor 180mg + Heparin 70U/kg IV.
- Chỉ định MCS: Xem chi tiết tại CliniPortal Cardiogenic Studio.`;

      navigator.clipboard.writeText(reportText).then(() => {
        alert('📋 Đã sao chép Báo cáo Sốc Tim EMR vào Clipboard!');
      }).catch(err => {
        console.error('Lỗi sao chép EMR:', err);
      });
    });
  }

  // 6. Reset Button
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (window.CardiogenicScenarios && window.CardiogenicScenarios[0]) {
        applyScenarioData(window.CardiogenicScenarios[0].data);
      }
    });
  }

  // Initial Boot
  renderPresets();
  renderCalculations();
});
