/**
 * CliniPortal — ICU Sedation, Analgesia & Delirium Suite (TypeScript Module)
 * PADIS Guidelines: RASS (Richmond Agitation-Sedation Scale), CPOT (Critical-Care Pain Observation Tool), CAM-ICU & Syringe Pump Infusion Engine
 */

export interface ICUEvaluationResult {
  rass: number;
  cpotTotal: number;
  isDelirium: boolean;
  pumpRate: number;
  advice: string[];
}

export function calculateICU(): void {
  // 1. RASS
  const rassSelect = document.getElementById('rass-select') as HTMLSelectElement | null;
  const rass = parseInt(rassSelect?.value || '0', 10);
  const rassBadge = document.getElementById('res-rass-badge');
  if (rassBadge) {
    rassBadge.innerText = (rass > 0 ? '+' : '') + rass;
    if (rass >= 2 || rass <= -4) {
      rassBadge.className = 'score-badge badge-severe';
    } else if (rass === 1 || rass === -3) {
      rassBadge.className = 'score-badge badge-warn';
    } else {
      rassBadge.className = 'score-badge badge-normal';
    }
  }

  // 2. CPOT
  const cpotFace = parseInt((document.getElementById('cpot-face') as HTMLSelectElement | null)?.value || '0', 10);
  const cpotBody = parseInt((document.getElementById('cpot-body') as HTMLSelectElement | null)?.value || '0', 10);
  const cpotVent = parseInt((document.getElementById('cpot-vent') as HTMLSelectElement | null)?.value || '0', 10);
  const cpotTen = parseInt((document.getElementById('cpot-tension') as HTMLSelectElement | null)?.value || '0', 10);
  const cpotTotal = cpotFace + cpotBody + cpotVent + cpotTen;

  const cpotBadge = document.getElementById('res-cpot-badge');
  if (cpotBadge) {
    cpotBadge.innerText = `${cpotTotal} / 8`;
    if (cpotTotal >= 3) {
      cpotBadge.className = 'score-badge badge-severe';
    } else if (cpotTotal > 0) {
      cpotBadge.className = 'score-badge badge-warn';
    } else {
      cpotBadge.className = 'score-badge badge-normal';
    }
  }

  // 3. CAM-ICU
  const f1 = (document.getElementById('cam-f1') as HTMLInputElement | null)?.checked || false;
  const f2 = (document.getElementById('cam-f2') as HTMLInputElement | null)?.checked || false;
  const f3 = (document.getElementById('cam-f3') as HTMLInputElement | null)?.checked || false;
  const f4 = ((document.getElementById('cam-f4') as HTMLInputElement | null)?.checked || false) || rass !== 0;

  const isDelirium = f1 && f2 && (f3 || f4);
  const camBadge = document.getElementById('res-cam-badge');
  if (camBadge) {
    if (isDelirium) {
      camBadge.innerText = 'DƯƠNG TÍNH';
      camBadge.className = 'score-badge badge-severe';
    } else {
      camBadge.innerText = 'Âm tính';
      camBadge.className = 'score-badge badge-normal';
    }
  }

  // 4. Bơm tiêm điện
  const weight = parseFloat((document.getElementById('weight') as HTMLInputElement | null)?.value || '60') || 60;
  const drug = (document.getElementById('drug-select') as HTMLSelectElement | null)?.value || 'propofol';
  const dose = parseFloat((document.getElementById('drug-dose-input') as HTMLInputElement | null)?.value || '20') || 0;

  let pumpRate = 0;
  const drugRange = document.getElementById('drug-range-info');
  const doseUnitLabel = document.getElementById('dose-unit-label');

  if (drug === 'propofol') {
    if (drugRange) drugRange.innerText = 'Khuyến cáo: 5 – 50 mcg/kg/phút';
    if (doseUnitLabel) doseUnitLabel.innerText = 'mcg/kg/phút';
    pumpRate = (dose * weight * 60) / 10000;
  } else if (drug === 'midazolam') {
    if (drugRange) drugRange.innerText = 'Khuyến cáo: 0.02 – 0.2 mg/kg/giờ';
    if (doseUnitLabel) doseUnitLabel.innerText = 'mg/kg/giờ';
    pumpRate = (dose * weight) / 1.0;
  } else if (drug === 'fentanyl') {
    if (drugRange) drugRange.innerText = 'Khuyến cáo: 0.7 – 10 mcg/kg/giờ';
    if (doseUnitLabel) doseUnitLabel.innerText = 'mcg/kg/giờ';
    pumpRate = (dose * weight) / 10.0;
  } else if (drug === 'dexmed') {
    if (drugRange) drugRange.innerText = 'Khuyến cáo: 0.2 – 1.4 mcg/kg/giờ';
    if (doseUnitLabel) doseUnitLabel.innerText = 'mcg/kg/giờ';
    pumpRate = (dose * weight) / 4.0;
  }

  const pumpRateResult = document.getElementById('pump-rate-result');
  if (pumpRateResult) pumpRateResult.innerText = pumpRate.toFixed(1);

  // 5. Khuyến cáo Can thiệp
  const diagTitle = document.getElementById('diag-title');
  const diagDesc = document.getElementById('diag-desc');
  const diagBox = document.getElementById('diag-box');

  const advice: string[] = [];
  if (cpotTotal >= 3) {
    advice.push('⚠️ <strong>CPOT ≥ 3:</strong> Ưu tiên tăng liều Giảm đau (Fentanyl) trước khi tăng an thần.');
  }
  if (rass > 0) {
    advice.push('⚠️ <strong>RASS > 0:</strong> Kiểm tra cựa quậy/chống máy, cân nhắc tăng nhẹ an thần nếu đã đủ giảm đau.');
  } else if (rass < -3) {
    advice.push('🚨 <strong>RASS ≤ -4:</strong> An thần quá sâu! Giảm 25-50% liều hoặc tạm ngưng an thần (SAT).');
  }
  if (isDelirium) {
    advice.push('🧠 <strong>CAM-ICU (+):</strong> Ưu tiên Dexmedetomidine, hạn chế Benzodiazepine.');
  }

  if (advice.length === 0) {
    if (diagTitle) diagTitle.innerText = '🎯 Hướng xử trí lâm sàng:';
    if (diagDesc) {
      diagDesc.innerHTML =
        'Đạt mục tiêu an thần nông (RASS -2 đến 0) & không bị đau. Tiếp tục ngưng an thần hàng ngày (SAT) đánh giá cai máy.';
    }
    if (diagBox) diagBox.style.borderLeftColor = 'var(--color-primary)';
  } else {
    if (diagTitle) diagTitle.innerText = '⚠️ Khuyến cáo can thiệp ICU:';
    if (diagDesc) diagDesc.innerHTML = advice.join('<br/>');
    if (diagBox) diagBox.style.borderLeftColor = 'var(--color-rose, #e11d48)';
  }
}

export function resetAll(): void {
  const setVal = (id: string, val: string) => {
    const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
    if (el) el.value = val;
  };
  const setChk = (id: string, checked: boolean) => {
    const el = document.getElementById(id) as HTMLInputElement | null;
    if (el) el.checked = checked;
  };

  setVal('rass-select', '0');
  setVal('cpot-face', '0');
  setVal('cpot-body', '0');
  setVal('cpot-vent', '0');
  setVal('cpot-tension', '0');
  setChk('cam-f1', false);
  setChk('cam-f2', false);
  setChk('cam-f3', false);
  setChk('cam-f4', false);
  setVal('weight', '60');
  setVal('drug-select', 'propofol');
  setVal('drug-dose-input', '20');
  calculateICU();
}

export function initICUSedation(): void {
  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', calculateICU);
    el.addEventListener('change', calculateICU);
  });

  const btnReset = document.querySelector('.reset-btn');
  if (btnReset) {
    btnReset.addEventListener('click', resetAll);
  }

  calculateICU();
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.calculateICU = calculateICU;
  win.resetAll = resetAll;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initICUSedation);
  } else {
    initICUSedation();
  }
}
