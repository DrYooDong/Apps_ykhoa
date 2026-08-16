/**
 * CliniPortal — Comprehensive Anemia Diagnostic & Classification Engine (TypeScript Module)
 * WHO Severity Criteria, MCV/MCH Morphology Matrix, Reticulocyte Production Index (RPI) & Etiologic Triage
 */

export interface AnemiaEvaluationResult {
  severity: string;
  severityClass: string;
  morphology: string;
  morphologyClass: string;
  rpi: number;
  rpiClass: string;
  diagTitle: string;
  tests: string[];
}

export function calculateAnemia(): void {
  const gender = (document.getElementById('gender') as HTMLSelectElement | null)?.value || 'male';
  const hb = parseFloat((document.getElementById('hb') as HTMLInputElement | null)?.value || '12') || 12;
  const hct = parseFloat((document.getElementById('hct') as HTMLInputElement | null)?.value || '36') || 36;
  const mcv = parseFloat((document.getElementById('mcv') as HTMLInputElement | null)?.value || '85') || 85;
  const mch = parseFloat((document.getElementById('mch') as HTMLInputElement | null)?.value || '28') || 28;
  const retic = parseFloat((document.getElementById('retic') as HTMLInputElement | null)?.value || '1.0') || 1.0;
  const jaundice = (document.getElementById('jaundice') as HTMLSelectElement | null)?.value || 'none';

  // 1. Severity
  const normalHb = gender === 'male' ? 13.0 : 12.0;
  const sevBadge = document.getElementById('res-severity-badge');

  if (sevBadge) {
    if (hb >= normalHb) {
      sevBadge.innerText = 'Không thiếu máu';
      sevBadge.className = 'score-badge badge-normal';
    } else if (hb >= 11.0) {
      sevBadge.innerText = 'Nhẹ (≥11)';
      sevBadge.className = 'score-badge badge-info';
    } else if (hb >= 8.0) {
      sevBadge.innerText = 'TRUNG BÌNH (8-10.9)';
      sevBadge.className = 'score-badge badge-warn';
    } else if (hb >= 6.5) {
      sevBadge.innerText = 'NẶNG (6.5-7.9)';
      sevBadge.className = 'score-badge badge-severe';
    } else {
      sevBadge.innerText = 'RẤT NẶNG (<6.5)';
      sevBadge.className = 'score-badge badge-severe';
    }
  }

  // 2. Morphology
  const morphBadge = document.getElementById('res-morph-badge');
  let morphType = 'normocytic';

  if (mcv < 80) {
    morphType = 'microcytic';
    if (morphBadge) {
      morphBadge.innerText = mch < 27 ? 'Nhỏ Nhược sắc' : 'Nhỏ Đẳng sắc';
      morphBadge.className = 'score-badge badge-warn';
    }
  } else if (mcv > 100) {
    morphType = 'macrocytic';
    if (morphBadge) {
      morphBadge.innerText = 'Hồng cầu TO';
      morphBadge.className = 'score-badge badge-info';
    }
  } else {
    morphType = 'normocytic';
    if (morphBadge) {
      morphBadge.innerText = 'Đẳng sắc Đẳng bào';
      morphBadge.className = 'score-badge badge-normal';
    }
  }

  // 3. RPI Calculation
  const targetHct = gender === 'male' ? 45.0 : 40.0;
  let matFactor = 1.0;
  if (hct < 15) matFactor = 2.5;
  else if (hct < 25) matFactor = 2.0;
  else if (hct < 35) matFactor = 1.5;
  else matFactor = 1.0;

  const correctedRetic = retic * (hct / targetHct);
  const rpi = correctedRetic / matFactor;

  const rpiBadge = document.getElementById('res-rpi-badge');
  if (rpiBadge) {
    rpiBadge.innerText = `${rpi.toFixed(2)} (${rpi >= 2 ? '≥ 2' : '< 2'})`;
    rpiBadge.className = rpi >= 2 ? 'score-badge badge-severe' : 'score-badge badge-info';
  }

  // 4. Recommendations
  const diagTitle = document.getElementById('diag-title');
  const diagDesc = document.getElementById('diag-desc');
  const diagBox = document.getElementById('diag-box');

  const tests: string[] = [];

  if (morphType === 'microcytic') {
    if (diagTitle) diagTitle.innerText = '🔬 Hướng tiếp cận Thiếu máu Hồng cầu Nhỏ:';
    tests.push(
      '1. <strong>Bộ chỉ số Sắt:</strong> Ferritin, Sắt huyết thanh, TIBC, TSAT. Ferritin &lt; 30 ng/mL → <strong>Thiếu máu Thiếu Sắt (IDA)</strong>.'
    );
    tests.push(
      '2. <strong>Điện di Hemoglobin:</strong> Tìm <strong>Thalassemia</strong> (Mentzer Index MCV/RBC &lt; 13).'
    );
  } else if (morphType === 'macrocytic') {
    if (diagTitle) diagTitle.innerText = '🔬 Hướng tiếp cận Thiếu máu Hồng cầu To:';
    tests.push('1. Định lượng <strong>Vitamin B12 &amp; Acid Folic</strong>.');
    tests.push('2. Kiểm tra Chức năng Giáp (TSH, FT4), Chức năng Gan &amp; Tiền sử rượu.');
  } else {
    if (rpi >= 2 || jaundice === 'yes') {
      if (diagTitle) diagTitle.innerText = '🚨 Thiếu máu Tán huyết / Mất máu (RPI ≥ 2):';
      tests.push('1. <strong>Test Coombs trực tiếp &amp; gián tiếp</strong> (AIHA).');
      tests.push('2. Bilirubin gián tiếp, LDH, Haptoglobin &amp; Phết máu ngoại vi tìm Schistocytes.');
    } else {
      if (diagTitle) diagTitle.innerText = '🔬 Giảm sản xuất tại tủy (RPI < 2):';
      tests.push('1. Đánh giá Thận: Creatinine, eGFR, Erythropoietin (EPO).');
      tests.push('2. Nếu giảm 2-3 dòng tế bào máu → <strong>Tủy đồ &amp; Sinh thiết tủy</strong>.');
    }
  }

  if (diagDesc) diagDesc.innerHTML = tests.join('<br/>');
  if (diagBox) {
    diagBox.style.borderLeftColor = rpi >= 2 ? 'var(--color-rose, #e11d48)' : 'var(--color-primary)';
  }
}

export function resetForm(): void {
  const setVal = (id: string, val: string) => {
    const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
    if (el) el.value = val;
  };

  setVal('gender', 'male');
  setVal('hb', '8.5');
  setVal('hct', '26');
  setVal('mcv', '72');
  setVal('mch', '23');
  setVal('retic', '1.2');
  setVal('bleeding-history', 'none');
  setVal('jaundice', 'none');

  calculateAnemia();
}

export function initAnemiaAssessment(): void {
  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', calculateAnemia);
    el.addEventListener('change', calculateAnemia);
  });

  const btnReset = document.querySelector('.reset-btn');
  if (btnReset) {
    btnReset.addEventListener('click', resetForm);
  }

  calculateAnemia();
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.calculateAnemia = calculateAnemia;
  win.resetForm = resetForm;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnemiaAssessment);
  } else {
    initAnemiaAssessment();
  }
}
