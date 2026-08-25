document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Tabs
  const tabBtns = document.querySelectorAll('.sidebar-tab-btn');
  const tabContents = document.querySelectorAll('.sidebar-tab-content');

  // DOM Elements - Inputs
  const settingSelect = document.getElementById('clinicalSetting');
  const nonIcuRegimenSelect = document.getElementById('nonIcuRegimen');
  const weightInput = document.getElementById('patientWeight');
  const bgInput = document.getElementById('currentBG');
  const egfrInput = document.getElementById('patientEGFR');
  const hba1cInput = document.getElementById('patientHbA1c');
  const nutritionSelect = document.getElementById('nutritionStatus');

  // Checkboxes
  const riskHypoChk = document.getElementById('riskHypo');
  const riskResistChk = document.getElementById('riskResist');
  const riskCvdChk = document.getElementById('riskCVD');

  // Value Labels
  const valWeight = document.getElementById('valWeight');
  const valCurrentBG = document.getElementById('valCurrentBG');
  const valEGFR = document.getElementById('valEGFR');
  const valHbA1c = document.getElementById('valHbA1c');

  // Presets
  const presetBtns = document.querySelectorAll('.sc-btn[data-preset]');
  const resetBtn = document.getElementById('btnResetStudio');

  // Display Sections
  const sectionOutpatient = document.getElementById('sectionOutpatient');
  const sectionNonICU = document.getElementById('sectionNonICU');
  const sectionICU = document.getElementById('sectionICU');
  const nonIcuRegimenGroup = document.getElementById('nonIcuRegimenGroup');
  const nutritionGroup = document.getElementById('nutritionGroup');
  const npoSafetyBanner = document.getElementById('npoSafetyBanner');

  // Main Summary Display
  const summaryModeTag = document.getElementById('summaryModeTag');
  const riskBadgeStatus = document.getElementById('riskBadgeStatus');
  const mainMetricVal = document.getElementById('mainMetricVal');
  const mainMetricUnit = document.getElementById('mainMetricUnit');
  const mainMetricDesc = document.getElementById('mainMetricDesc');

  // --- TAB SWITCHING ---
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.style.display = 'none');
      btn.classList.add('active');
      const targetTab = document.getElementById(btn.dataset.tab);
      if (targetTab) targetTab.style.display = 'block';
    });
  });

  // --- PRESETS HANDLING ---
  const presetsData = {
    outpatient_t2d: { setting: 'outpatient', regimen: 'basal_bolus', weight: 65, bg: 180, egfr: 55, hba1c: 8.8, nutrition: 'eating', hypo: false, resist: false, cvd: true },
    inpatient_ward: { setting: 'non_icu', regimen: 'basal_bolus', weight: 60, bg: 260, egfr: 70, hba1c: 9.2, nutrition: 'eating', hypo: false, resist: false, cvd: false },
    inpatient_npo: { setting: 'non_icu', regimen: 'basal_bolus', weight: 70, bg: 210, egfr: 45, hba1c: 8.0, nutrition: 'npo', hypo: false, resist: false, cvd: false },
    icu_dka: { setting: 'icu', regimen: 'basal_bolus', weight: 60, bg: 380, egfr: 90, hba1c: 11.5, nutrition: 'npo', hypo: false, resist: true, cvd: false },
    ckd_dm: { setting: 'outpatient', regimen: 'basal_bolus', weight: 60, bg: 200, egfr: 22, hba1c: 8.2, nutrition: 'eating', hypo: true, resist: false, cvd: true },
    inpatient_premix: { setting: 'non_icu', regimen: 'premix_2', weight: 60, bg: 240, egfr: 65, hba1c: 9.0, nutrition: 'eating', hypo: false, resist: false, cvd: false }
  };

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const presetKey = btn.dataset.preset;
      const data = presetsData[presetKey];
      if (data) {
        settingSelect.value = data.setting;
        if (nonIcuRegimenSelect && data.regimen) nonIcuRegimenSelect.value = data.regimen;
        weightInput.value = data.weight;
        bgInput.value = data.bg;
        egfrInput.value = data.egfr;
        hba1cInput.value = data.hba1c;
        nutritionSelect.value = data.nutrition;
        riskHypoChk.checked = data.hypo;
        riskResistChk.checked = data.resist;
        riskCvdChk.checked = data.cvd;
        calculateStudio();
      }
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      settingSelect.value = 'non_icu';
      if (nonIcuRegimenSelect) nonIcuRegimenSelect.value = 'basal_bolus';
      weightInput.value = 60;
      bgInput.value = 240;
      egfrInput.value = 60;
      hba1cInput.value = 8.5;
      nutritionSelect.value = 'eating';
      riskHypoChk.checked = false;
      riskResistChk.checked = false;
      riskCvdChk.checked = false;
      calculateStudio();
    });
  }

  // --- REACTIVE EVENT LISTENERS ---
  const allInputs = [settingSelect, nonIcuRegimenSelect, weightInput, bgInput, egfrInput, hba1cInput, nutritionSelect, riskHypoChk, riskResistChk, riskCvdChk];
  allInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', calculateStudio);
      input.addEventListener('change', calculateStudio);
    }
  });

  // --- MAIN CALCULATION FUNCTION ---
  function calculateStudio() {
    // 1. Read Values
    const setting = settingSelect.value;
    const nonIcuRegimen = nonIcuRegimenSelect ? nonIcuRegimenSelect.value : 'basal_bolus';
    const weight = parseFloat(weightInput.value) || 60;
    const bg = parseFloat(bgInput.value) || 200;
    const egfr = parseFloat(egfrInput.value) || 60;
    const hba1c = parseFloat(hba1cInput.value) || 8.0;
    const nutrition = nutritionSelect.value;
    const isHypo = riskHypoChk.checked;
    const isResist = riskResistChk.checked;
    const isCvd = riskCvdChk.checked;

    // 2. Update Label Displays
    valWeight.innerText = `${weight} kg`;
    valCurrentBG.innerText = `${bg} mg/dL`;
    valEGFR.innerText = `${egfr} mL/min`;
    valHbA1c.innerText = `${hba1c}%`;

    // 3. Handle Mode Visibility & Calculations
    if (setting === 'outpatient') {
      sectionOutpatient.style.display = 'block';
      sectionNonICU.style.display = 'none';
      sectionICU.style.display = 'none';
      if (nonIcuRegimenGroup) nonIcuRegimenGroup.style.display = 'none';
      nutritionGroup.style.display = 'none';
      npoSafetyBanner.style.display = 'none';

      summaryModeTag.innerText = 'NGOẠI TRÚ — MA TRẬN THUỐC VIÊN & GLP-1 RA';
      riskBadgeStatus.innerText = 'KHUYẾN CÁO ADA / KDIGO 2026';
      riskBadgeStatus.setAttribute('data-risk', egfr < 30 ? 'high' : 'low');

      mainMetricVal.innerText = `${hba1c}%`;
      mainMetricUnit.innerText = 'HbA1c Mục Tiêu < 7.0%';
      mainMetricDesc.innerText = `Bệnh nhân ngoại trú (eGFR = ${egfr} mL/phút/1.73m²)`;

      renderOadMatrix(egfr, isCvd, isHypo);

    } else if (setting === 'non_icu') {
      sectionOutpatient.style.display = 'none';
      sectionNonICU.style.display = 'block';
      sectionICU.style.display = 'none';
      if (nonIcuRegimenGroup) nonIcuRegimenGroup.style.display = 'block';
      nutritionGroup.style.display = 'block';

      // TDD multiplier logic
      let tddMult = 0.40;
      if (isHypo || egfr < 30) tddMult = 0.25;
      if (isResist || bg > 300) tddMult = 0.50;
      if (isHypo && isResist) tddMult = 0.30;

      const TDD = Math.round(weight * tddMult);

      if (nutrition === 'npo') {
        npoSafetyBanner.style.display = 'flex';
      } else {
        npoSafetyBanner.style.display = 'none';
      }

      mainMetricVal.innerText = `${TDD}`;
      mainMetricUnit.innerText = 'Đơn vị / ngày';
      mainMetricDesc.innerText = `Tổng liều Insulin dự kiến (TDD) dựa trên cân nặng ${weight} kg (${tddMult.toFixed(2)} ĐV/kg)`;

      if (nonIcuRegimen === 'basal_bolus') {
        summaryModeTag.innerText = 'BỆNH PHÒNG NON-ICU — BASAL-BOLUS DƯỚI DA';
        riskBadgeStatus.innerText = 'MỤC TIÊU ĐH: 140 - 180 mg/dL';
        riskBadgeStatus.setAttribute('data-risk', isHypo ? 'mid' : 'low');
        renderBasalBolusCards(TDD, tddMult, nutrition);
      } else if (nonIcuRegimen === 'premix_2') {
        summaryModeTag.innerText = 'BỆNH PHÒNG NON-ICU — PREMIXED (2 MŨI SÁNG/TỐI)';
        riskBadgeStatus.innerText = 'YÊU CẦU ĂN UỐNG ĐỀU ĐẶN';
        riskBadgeStatus.setAttribute('data-risk', 'mid');
        renderPremix2Cards(TDD, tddMult, nutrition);
      } else if (nonIcuRegimen === 'premix_3') {
        summaryModeTag.innerText = 'BỆNH PHÒNG NON-ICU — PREMIXED ANALOGUE (3 MŨI/NGÀY)';
        riskBadgeStatus.innerText = 'RYZODEG / NOVOMIX 30';
        riskBadgeStatus.setAttribute('data-risk', 'mid');
        renderPremix3Cards(TDD, tddMult, nutrition);
      }

      renderSlidingScale(tddMult);

    } else if (setting === 'icu') {
      sectionOutpatient.style.display = 'none';
      sectionNonICU.style.display = 'none';
      sectionICU.style.display = 'block';
      if (nonIcuRegimenGroup) nonIcuRegimenGroup.style.display = 'none';
      nutritionGroup.style.display = 'none';
      npoSafetyBanner.style.display = 'none';

      summaryModeTag.innerText = 'HỒI SỨC TÍCH CỰC ICU — TRUYỀN TĨNH MẠCH';
      riskBadgeStatus.innerText = 'MỤC TIÊU ĐH: 140 - 180 mg/dL';
      riskBadgeStatus.setAttribute('data-risk', 'high');

      let ivMult = 0.10;
      if (isHypo || egfr < 30) ivMult = 0.05;

      const pumpRate = (weight * ivMult).toFixed(1);

      mainMetricVal.innerText = `${pumpRate}`;
      mainMetricUnit.innerText = 'mL / giờ (ĐV/giờ)';
      mainMetricDesc.innerText = `Tốc độ Bơm tiêm điện Insulin Regular khởi đầu (${ivMult.toFixed(2)} ĐV/kg/h cho ${weight} kg)`;

      document.getElementById('pumpRateIVVal').innerText = `${pumpRate}`;
      document.getElementById('pumpRateIVMult').innerText = `${ivMult.toFixed(2)}`;
    }
  }

  // --- RENDER BASAL-BOLUS CARDS ---
  function renderBasalBolusCards(TDD, tddMult, nutrition) {
    const title = document.getElementById('nonIcuTitle');
    const grid = document.getElementById('nonIcuPrescriptionGrid');
    if (title) title.innerText = '💉 Phác Đồ Nền - Phóng (Basal-Bolus 4 Mũi)';

    const basal = Math.round(TDD * 0.50);
    const bolusTotal = TDD - basal;
    let bolusMeal = Math.round(bolusTotal / 3);
    if (nutrition === 'npo') bolusMeal = 0;

    grid.innerHTML = `
      <div class="vitals-item" style="border-left: 4px solid var(--color-primary);">
        <div class="vitals-label">TỔNG LIỀU (TDD)</div>
        <div class="vitals-val">${TDD} ĐV</div>
        <div style="font-size: 0.7rem; color: var(--color-text-muted);">${tddMult.toFixed(2)} ĐV/kg/ngày</div>
      </div>
      <div class="vitals-item" style="border-left: 4px solid var(--color-success);">
        <div class="vitals-label">INSULIN NỀN (BASAL)</div>
        <div class="vitals-val" style="color: var(--color-success);">${basal} ĐV</div>
        <div style="font-size: 0.7rem; color: var(--color-text-muted);">Glargine / Detemir (1 lần/ngày lúc 21h)</div>
      </div>
      <div class="vitals-item" style="border-left: 4px solid var(--color-warning);">
        <div class="vitals-label">INSULIN BỮA ĂN (BOLUS)</div>
        <div class="vitals-val" style="color: var(--color-warning);">${nutrition === 'npo' ? 'NGỪNG (NPO)' : bolusMeal + ' ĐV x 3 bữa'}</div>
        <div style="font-size: 0.7rem; color: var(--color-text-muted);">Aspart / Lispro (Trước 3 bữa ăn)</div>
      </div>
    `;
  }

  // --- RENDER PREMIXED 2 DOSES CARDS ---
  function renderPremix2Cards(TDD, tddMult, nutrition) {
    const title = document.getElementById('nonIcuTitle');
    const grid = document.getElementById('nonIcuPrescriptionGrid');
    if (title) title.innerText = '💉 Phác Đồ Insulin Trộn / Hỗn Hợp (Premixed 70/30 — 2 Mũi/Ngày)';

    let morning = Math.round(TDD * 2 / 3);
    let evening = TDD - morning;

    if (nutrition === 'npo') {
      morning = 0;
      evening = 0;
    }

    grid.innerHTML = `
      <div class="vitals-item" style="border-left: 4px solid var(--color-primary);">
        <div class="vitals-label">TỔNG LIỀU (TDD)</div>
        <div class="vitals-val">${TDD} ĐV</div>
        <div style="font-size: 0.7rem; color: var(--color-text-muted);">${tddMult.toFixed(2)} ĐV/kg/ngày</div>
      </div>
      <div class="vitals-item" style="border-left: 4px solid var(--color-warning);">
        <div class="vitals-label">MŨI SÁNG (2/3 TDD)</div>
        <div class="vitals-val" style="color: var(--color-warning);">${nutrition === 'npo' ? 'NGỪNG (NPO)' : morning + ' ĐV'}</div>
        <div style="font-size: 0.7rem; color: var(--color-text-muted);">Tiêm trước ăn sáng 30 phút</div>
      </div>
      <div class="vitals-item" style="border-left: 4px solid var(--color-info);">
        <div class="vitals-label">MŨI CHIỀU/TỐI (1/3 TDD)</div>
        <div class="vitals-val" style="color: var(--color-info);">${nutrition === 'npo' ? 'NGỪNG (NPO)' : evening + ' ĐV'}</div>
        <div style="font-size: 0.7rem; color: var(--color-text-muted);">Tiêm trước ăn tối 30 phút</div>
      </div>
    `;
  }

  // --- RENDER PREMIXED 3 DOSES CARDS ---
  function renderPremix3Cards(TDD, tddMult, nutrition) {
    const title = document.getElementById('nonIcuTitle');
    const grid = document.getElementById('nonIcuPrescriptionGrid');
    if (title) title.innerText = '💉 Phác Đồ Insulin Trộn Analogue (Premixed — 3 Mũi/Ngày)';

    let morning = Math.round(TDD * 0.40);
    let noon = Math.round(TDD * 0.20);
    let evening = TDD - morning - noon;

    if (nutrition === 'npo') {
      morning = 0;
      noon = 0;
      evening = 0;
    }

    grid.innerHTML = `
      <div class="vitals-item" style="border-left: 4px solid var(--color-primary);">
        <div class="vitals-label">TỔNG LIỀU (TDD)</div>
        <div class="vitals-val">${TDD} ĐV</div>
        <div style="font-size: 0.7rem; color: var(--color-text-muted);">${tddMult.toFixed(2)} ĐV/kg/ngày</div>
      </div>
      <div class="vitals-item" style="border-left: 4px solid var(--color-warning);">
        <div class="vitals-label">MŨI SÁNG (40%)</div>
        <div class="vitals-val" style="color: var(--color-warning);">${nutrition === 'npo' ? 'NGỪNG' : morning + ' ĐV'}</div>
        <div style="font-size: 0.7rem; color: var(--color-text-muted);">Trước ăn sáng</div>
      </div>
      <div class="vitals-item" style="border-left: 4px solid var(--color-info);">
        <div class="vitals-label">MŨI TRƯA (20%)</div>
        <div class="vitals-val" style="color: var(--color-info);">${nutrition === 'npo' ? 'NGỪNG' : noon + ' ĐV'}</div>
        <div style="font-size: 0.7rem; color: var(--color-text-muted);">Trước ăn trưa</div>
      </div>
      <div class="vitals-item" style="border-left: 4px solid var(--color-success);">
        <div class="vitals-label">MŨI TỐI (40%)</div>
        <div class="vitals-val" style="color: var(--color-success);">${nutrition === 'npo' ? 'NGỪNG' : evening + ' ĐV'}</div>
        <div style="font-size: 0.7rem; color: var(--color-text-muted);">Trước ăn tối</div>
      </div>
    `;
  }

  // --- RENDER OAD MATRIX ---
  function renderOadMatrix(egfr, isCvd, isHypo) {
    const container = document.getElementById('oadMatrixGrid');
    if (!container) return;

    const drugs = [
      {
        name: 'Metformin',
        class: 'Biguanide (Lựa chọn hàng đầu)',
        getStatus: (e) => {
          if (e >= 45) return { badge: 'OK', color: 'alert-success', text: 'Sử dụng liều tiêu chuẩn (1000 - 2000 mg/ngày). First-line.' };
          if (e >= 30) return { badge: 'THẬN TRỌNG', color: 'alert-warning', text: 'Giảm 50% liều (tối đa 1000 mg/ngày). Không khởi đầu liều mới.' };
          return { badge: 'CHỐNG CHỈ ĐỊNH', color: 'alert-danger', text: 'Ngừng ngay! eGFR < 30 mL/phút có nguy cơ toan Lactic nghiêm trọng.' };
        }
      },
      {
        name: 'SGLT2i (Empagliflozin / Dapagliflozin)',
        class: 'Ức chế SGLT2 (Bảo vệ Thận & Tim)',
        getStatus: (e) => {
          if (e >= 20) return { badge: 'ƯU TIÊN CAO', color: 'alert-success', text: `Ưu tiên hàng đầu (ADA/KDIGO) giúp bảo vệ thận & giảm nhập viện do suy tim${isCvd ? ' (Chỉ định rõ ở bệnh nhân ASCVD/HF)' : ''}.` };
          return { badge: 'KHÔNG KHỞI ĐẦU', color: 'alert-warning', text: 'Không dùng khởi đầu mới nếu eGFR < 20. Nếu đang dùng từ trước có thể duy trì.' };
        }
      },
      {
        name: 'GLP-1 RA (Dulaglutide / Semaglutide)',
        class: 'Đồng vận Receptor GLP-1',
        getStatus: (e) => {
          if (e >= 15) return { badge: 'ƯU TIÊN CAO', color: 'alert-success', text: 'Ưu tiên cao giúp giảm biến cố tim mạch, giảm cân mạnh và không gây hạ đường huyết.' };
          return { badge: 'THẬN TRỌNG', color: 'alert-warning', text: 'Dữ liệu an toàn hạn chế ở eGFR < 15 mL/phút.' };
        }
      },
      {
        name: 'DPP-4i (Linagliptin / Sitagliptin)',
        class: 'Ức chế DPP-4',
        getStatus: (e) => {
          if (e >= 45) return { badge: 'AN TOÀN', color: 'alert-success', text: 'Dùng liều tiêu chuẩn (Linagliptin 5mg, Sitagliptin 100mg).' };
          return { badge: 'CHỈNH LIỀU', color: 'alert-warning', text: 'Linagliptin 5mg không cần chỉnh liều. Sitagliptin giảm liều còn 50mg (eGFR 30-45) hoặc 25mg (eGFR < 30).' };
        }
      },
      {
        name: 'Sulfonylurea (Gliclazide MR / Glimepiride)',
        class: 'Kích thích tiết Insulin',
        getStatus: (e) => {
          if (e >= 60) return { badge: 'CÂN NHẮC', color: 'alert-info', text: 'Ưu tiên Gliclazide MR thế hệ mới. Nguy cơ hạ đường huyết nhẹ - trung bình.' };
          if (e >= 30) return { badge: 'NGUY CƠ HẠ ĐH', color: 'alert-warning', text: 'Thận trọng! Giảm liều Sulfonylurea do giảm thải trừ qua thận.' };
          return { badge: 'TRÁNH DÙNG', color: 'alert-danger', text: 'Tránh dùng Sulfonylurea khi eGFR < 30 mL/phút do nguy cơ hạ đường huyết kéo dài.' };
        }
      }
    ];

    let html = '';
    drugs.forEach(d => {
      const st = d.getStatus(egfr);
      html += `
        <div class="studio-alert-banner ${st.color}" style="margin-bottom: 0; justify-content: space-between;">
          <div style="flex: 1;">
            <div style="font-weight: 800; font-size: 0.9rem;">${d.name} <span style="font-weight: 400; font-size: 0.78rem; opacity: 0.85;">— ${d.class}</span></div>
            <div style="font-size: 0.8rem; margin-top: 0.2rem; opacity: 0.95;">${st.text}</div>
          </div>
          <span class="studio-risk-badge" style="white-space: nowrap; margin-left: 0.5rem; background: rgba(0,0,0,0.08);">${st.badge}</span>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // --- RENDER SLIDING SCALE ---
  function renderSlidingScale(tddMult) {
    const tbody = document.getElementById('slidingScaleBody');
    if (!tbody) return;

    // Scale multipliers based on TDD sensitivity
    const rows = [
      { range: '141 - 180', low: 0, med: 0, high: 1 },
      { range: '181 - 220', low: 1, med: 2, high: 3 },
      { range: '221 - 260', low: 2, med: 4, high: 5 },
      { range: '261 - 300', low: 3, med: 6, high: 7 },
      { range: '301 - 340', low: 4, med: 8, high: 9 },
      { range: '> 340', low: '5 + Báo BS', med: '10 + Báo BS', high: '12 + Báo BS' }
    ];

    let html = '';
    rows.forEach(r => {
      html += `
        <tr style="border-bottom: 1px solid var(--color-divider);">
          <td style="padding: 0.35rem; font-weight: 700;">${r.range}</td>
          <td style="padding: 0.35rem;">${typeof r.low === 'number' ? '+' + r.low + ' ĐV' : r.low}</td>
          <td style="padding: 0.35rem; font-weight: 700; color: var(--color-primary);">${typeof r.med === 'number' ? '+' + r.med + ' ĐV' : r.med}</td>
          <td style="padding: 0.35rem;">${typeof r.high === 'number' ? '+' + r.high + ' ĐV' : r.high}</td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  }

  // Initial Run
  calculateStudio();
});