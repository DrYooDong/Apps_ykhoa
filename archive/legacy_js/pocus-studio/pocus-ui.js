/**
 * eFAST POCUS & Emergency Procedures UI Controller
 * CliniPortal Design System
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // State
  const efastState = {
    ruq: false,
    luq: false,
    pelvis: false,
    pericardial: false,
    r_pleura: false,
    l_pleura: false,
    ivc_collapsible: true
  };

  // Elements
  const windowBtns = {
    ruq: document.getElementById('btn_ruq'),
    luq: document.getElementById('btn_luq'),
    pelvis: document.getElementById('btn_pelvis'),
    pericardial: document.getElementById('btn_pericardial'),
    r_pleura: document.getElementById('btn_r_pleura'),
    l_pleura: document.getElementById('btn_l_pleura'),
    ivc_collapsible: document.getElementById('btn_ivc')
  };

  const rushPump = document.getElementById('rushPump');
  const rushTank = document.getElementById('rushTank');
  const rushPipes = document.getElementById('rushPipes');
  const procedureSelect = document.getElementById('procedureSelect');

  // Result Banner & Panels
  const resHeroBadge = document.getElementById('resHeroBadge');
  const resHeroTitle = document.getElementById('resHeroTitle');
  const resHeroSummary = document.getElementById('resHeroSummary');

  const valEfastResult = document.getElementById('valEfastResult');
  const valRushShockType = document.getElementById('valRushShockType');
  const valIvcStatus = document.getElementById('valIvcStatus');

  const containerEfastDetails = document.getElementById('containerEfastDetails');
  const containerRushDetails = document.getElementById('containerRushDetails');
  const containerProcedureGuide = document.getElementById('containerProcedureGuide');

  const scenarioContainer = document.getElementById('scenarioPresetContainer');
  const btnCopyReport = document.getElementById('btnCopyEmrReport');
  const btnReset = document.getElementById('btnResetStudio');

  // 1. Toggle eFAST Window State
  Object.keys(windowBtns).forEach(key => {
    if (windowBtns[key]) {
      windowBtns[key].addEventListener('click', () => {
        efastState[key] = !efastState[key];
        windowBtns[key].classList.toggle('positive', efastState[key]);
        renderCalculations();
      });
    }
  });

  // 2. Render Calculations & Output
  function renderCalculations() {
    if (!window.PocusEngine) return;

    // Engine Evaluations
    const efastRes = window.PocusEngine.analyzeEfast(efastState);

    const rushData = {
      pump: rushPump ? rushPump.value : 'normal',
      tank: rushTank ? rushTank.value : 'normal',
      pipes: rushPipes ? rushPipes.value : 'normal'
    };
    const rushRes = window.PocusEngine.analyzeRush(rushData);

    const currentProc = procedureSelect ? procedureSelect.value : 'chest_tube';
    const procGuide = window.PocusEngine.getProcedureGuidance(currentProc);

    // Hero Banner
    if (efastRes.isPositive || rushRes.shockType.includes('SỐC')) {
      if (resHeroBadge) {
        resHeroBadge.className = 'badge badge-danger';
        resHeroBadge.innerHTML = '🚨 KẾT QUẢ KHẢO SÁT CẤP CỨU NGUY HIỂM';
      }
    } else {
      if (resHeroBadge) {
        resHeroBadge.className = 'badge badge-success';
        resHeroBadge.innerHTML = '✅ KẾT QUẢ KHẢO SÁT ÂM TÍNH / ỔN ĐỊNH';
      }
    }

    if (resHeroTitle) resHeroTitle.innerText = efastRes.summary;
    if (resHeroSummary) {
      resHeroSummary.innerHTML = `Đánh giá RUSH Protocol: <strong>${rushRes.shockType}</strong> | IVC: <strong>${efastRes.ivcStatus}</strong>`;
    }

    // Update 3 KPI Badges
    if (valEfastResult) valEfastResult.innerText = efastRes.isPositive ? `${efastRes.posCount}/6 DƯƠNG TÍNH` : 'ÂM TÍNH';
    if (valRushShockType) valRushShockType.innerText = rushRes.shockType.split('(')[0].replace('🚨', '').replace('🫀', '').replace('🩸', '').replace('🦠', '');
    if (valIvcStatus) valIvcStatus.innerText = efastState.ivc_collapsible ? 'Xẹp > 50%' : 'Giãn > 2.1cm';

    // Render eFAST Details Panel
    if (containerEfastDetails) {
      containerEfastDetails.innerHTML = `
        <div style="padding: 0.85rem; border-radius: 10px; background: ${efastRes.isPositive ? 'rgba(239, 68, 68, 0.08)' : 'var(--color-surface)'}; border: 1px solid ${efastRes.isPositive ? 'var(--color-danger)' : 'var(--color-border)'};">
          <strong style="color: ${efastRes.isPositive ? 'var(--color-danger)' : 'var(--color-text)'}; font-size: 0.95rem; display: block; margin-bottom: 0.3rem;">📋 Khuyến Cáo Xử Trí eFAST</strong>
          <p style="font-size: 0.85rem; font-weight: 700; color: var(--color-text); margin-bottom: 0.4rem;">${efastRes.actionRecommendation}</p>
          <p style="font-size: 0.82rem; color: var(--color-text-muted); margin: 0;"><strong>Tĩnh mạch chủ dưới (IVC):</strong> ${efastRes.ivcStatus}</p>
        </div>
      `;
    }

    // Render RUSH Details Panel
    if (containerRushDetails) {
      containerRushDetails.innerHTML = `
        <div style="padding: 0.85rem; border-radius: 10px; background: rgba(2, 132, 199, 0.06); border: 1px solid var(--color-primary);">
          <strong style="color: var(--color-primary); font-size: 0.95rem; display: block; margin-bottom: 0.3rem;">🫀 Kết Luận Siêu Âm Sốc RUSH Protocol</strong>
          <p style="font-size: 0.85rem; font-weight: 800; color: var(--color-danger); margin-bottom: 0.4rem;">${rushRes.shockType}</p>
          <p style="font-size: 0.83rem; font-weight: 700; color: var(--color-text); margin: 0;">${rushRes.rushRecommendation}</p>
        </div>
      `;
    }

    // Render Procedure Guide Panel
    if (containerProcedureGuide) {
      containerProcedureGuide.innerHTML = `
        <div style="padding: 1rem; border-radius: 12px; background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border);">
          <h4 style="font-size: 1rem; font-weight: 800; color: var(--color-primary); margin-bottom: 0.5rem;">${procGuide.title}</h4>
          <p style="font-size: 0.83rem; color: var(--color-text-muted); margin-bottom: 0.3rem;"><strong>Chỉ định:</strong> ${procGuide.indication}</p>
          <p style="font-size: 0.83rem; color: var(--color-text-muted); margin-bottom: 0.3rem;"><strong>Mốc giải phẫu:</strong> ${procGuide.landmark}</p>
          <p style="font-size: 0.83rem; color: var(--color-text-muted); margin-bottom: 0.75rem;"><strong>Cỡ dụng cụ:</strong> ${procGuide.sizeGuide}</p>
          <strong style="font-size: 0.85rem; color: var(--color-text); display: block; margin-bottom: 0.4rem;">Các bước thực hành chuẩn EBM:</strong>
          <ol style="font-size: 0.82rem; color: var(--color-text); padding-left: 1.2rem; margin: 0; display: flex; flex-direction: column; gap: 0.35rem;">
            ${procGuide.steps.map(step => `<li>${step}</li>`).join('')}
          </ol>
        </div>
      `;
    }
  }

  // 3. Render Scenario Presets
  function renderPresets() {
    if (!scenarioContainer || !window.PocusScenarios) return;

    scenarioContainer.innerHTML = window.PocusScenarios.map(sc => `
      <button type="button" class="sc-btn ${sc.badgeClass}" data-sc-id="${sc.id}">
        <div class="sc-btn-title">${sc.title}</div>
        <div class="sc-btn-desc">${sc.desc}</div>
      </button>
    `).join('');

    scenarioContainer.querySelectorAll('.sc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-sc-id');
        const found = window.PocusScenarios.find(s => s.id === id);
        if (found) {
          applyScenarioData(found.data);
        }
      });
    });
  }

  function applyScenarioData(d) {
    Object.keys(efastState).forEach(k => {
      efastState[k] = !!d[k];
      if (windowBtns[k]) {
        windowBtns[k].classList.toggle('positive', efastState[k]);
      }
    });

    if (rushPump && d.pump) rushPump.value = d.pump;
    if (rushTank && d.tank) rushTank.value = d.tank;
    if (rushPipes && d.pipes) rushPipes.value = d.pipes;
    if (procedureSelect && d.procedureSelect) procedureSelect.value = d.procedureSelect;

    renderCalculations();
  }

  // 4. Attach Select Event Listeners
  [rushPump, rushTank, rushPipes, procedureSelect].forEach(el => {
    if (el) {
      el.addEventListener('change', renderCalculations);
    }
  });

  // 5. Copy EMR Report Button
  if (btnCopyReport) {
    btnCopyReport.addEventListener('click', () => {
      const efastRes = window.PocusEngine.analyzeEfast(efastState);
      const rushData = {
        pump: rushPump ? rushPump.value : 'normal',
        tank: rushTank ? rushTank.value : 'normal',
        pipes: rushPipes ? rushPipes.value : 'normal'
      };
      const rushRes = window.PocusEngine.analyzeRush(rushData);

      const reportText = `[BÁO CÁO SIÊU ÂM CẤP CỨU eFAST POCUS & RUSH PROTOCOL - CLINIPORTAL]
- Kết quả eFAST 7 Cửa Sổ: ${efastRes.summary}
- Đánh giá Tĩnh mạch chủ dưới (IVC): ${efastRes.ivcStatus}
- Phân loại Sốc RUSH Protocol: ${rushRes.shockType}
- Y lệnh / Khuyến cáo Can thiệp: ${efastRes.actionRecommendation}
- Hướng dẫn Thủ thuật: Đã rà soát checklist an toàn tại CliniPortal POCUS Studio.`;

      navigator.clipboard.writeText(reportText).then(() => {
        alert('📋 Đã sao chép Báo cáo Siêu âm POCUS EMR vào Clipboard!');
      }).catch(err => {
        console.error('Lỗi sao chép EMR:', err);
      });
    });
  }

  // 6. Reset Button
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (window.PocusScenarios && window.PocusScenarios[0]) {
        applyScenarioData(window.PocusScenarios[0].data);
      }
    });
  }

  // Initial Boot
  renderPresets();
  renderCalculations();
});
