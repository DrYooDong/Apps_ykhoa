/**
 * CliniPortal — Comprehensive Pneumonia Studio (TypeScript Module)
 * Integrated CDSS Engine: CURB-65, PSI/PORT, IDSA/ATS 2019/2020 ICU Criteria, HAP/VAP MDR Risk Stratification & SARI Alerts
 */

export interface PneumoniaPatientData {
  age: number;
  gender: string;
  rr: number;
  sbp: number;
  dbp: number;
  temp: number;
  pulse: number;
  mental: number;
  bun: number;
  pf: number;
  wbc: number;
  plt: number;
  ph: number;
  na: number;
  glu: number;
  hct: number;
  cxrMulti: boolean;
  pleural: boolean;
  neoplasm: boolean;
  liver: boolean;
  chf: boolean;
  cvd: boolean;
  renal: boolean;
  hapHosp: boolean;
  hapAb: boolean;
  hapShock: boolean;
  sariVirus: boolean;
  pneuVaso: boolean;
}

export interface PresetScenario {
  id: string;
  name: string;
  tag: string;
  desc: string;
  data: PneumoniaPatientData;
}

export const PRESETS: PresetScenario[] = [
  {
    id: 'cap-mild',
    name: '🟢 CAP Ngoại Trú',
    tag: 'CURB-65 = 0 | PSI I',
    desc: 'Nam 45t, sốt nhẹ, sinh hiệu & cận lâm sàng bình thường.',
    data: {
      age: 45, gender: 'male', rr: 18, sbp: 120, dbp: 80, temp: 38.0, pulse: 82, mental: 0, bun: 14,
      pf: 420, wbc: 9.5, plt: 240, ph: 7.41, na: 139, glu: 98, hct: 42,
      cxrMulti: false, pleural: false, neoplasm: false, liver: false, chf: false, cvd: false, renal: false,
      hapHosp: false, hapAb: false, hapShock: false, sariVirus: false, pneuVaso: false
    }
  },
  {
    id: 'cap-moderate',
    name: '🟡 CAP Nội Trú Thường',
    tag: 'CURB-65 = 2 | PSI III',
    desc: 'Nam 68t, thở 24l/p, BUN 22, có suy tim mạn.',
    data: {
      age: 68, gender: 'male', rr: 24, sbp: 115, dbp: 75, temp: 38.5, pulse: 98, mental: 0, bun: 22,
      pf: 320, wbc: 12.8, plt: 210, ph: 7.38, na: 136, glu: 110, hct: 37,
      cxrMulti: false, pleural: false, neoplasm: false, liver: false, chf: true, cvd: false, renal: false,
      hapHosp: false, hapAb: false, hapShock: false, sariVirus: false, pneuVaso: false
    }
  },
  {
    id: 'cap-severe-icu',
    name: '🔴 CAP Nặng (Nhập ICU)',
    tag: 'IDSA/ATS Tiêu chuẩn chính (+)',
    desc: 'Nữ 72t, lú lẫn, thở 34l/p, SBP 85, PaO2/FiO2 180, tổn thương đa thùy.',
    data: {
      age: 72, gender: 'female', rr: 34, sbp: 85, dbp: 50, temp: 39.2, pulse: 128, mental: 1, bun: 35,
      pf: 180, wbc: 18.5, plt: 90, ph: 7.28, na: 128, glu: 160, hct: 28,
      cxrMulti: true, pleural: true, neoplasm: false, liver: false, chf: true, cvd: false, renal: true,
      hapHosp: false, hapAb: false, hapShock: false, sariVirus: false, pneuVaso: true
    }
  },
  {
    id: 'hap-mdr-high',
    name: '🟣 HAP Nguy Cơ MDR Cao',
    tag: 'Khởi phát nội viện + KS IV 90 ngày',
    desc: 'Nam 60t, ho sốt sau 4 ngày nhập viện, có sốc & đã dùng KS tĩnh mạch.',
    data: {
      age: 60, gender: 'male', rr: 26, sbp: 105, dbp: 65, temp: 38.8, pulse: 105, mental: 0, bun: 26,
      pf: 260, wbc: 15.2, plt: 180, ph: 7.35, na: 134, glu: 135, hct: 34,
      cxrMulti: true, pleural: false, neoplasm: false, liver: false, chf: false, cvd: false, renal: false,
      hapHosp: true, hapAb: true, hapShock: true, sariVirus: false, pneuVaso: false
    }
  },
  {
    id: 'sari-viral',
    name: '🦠 SARI Nghi Vi-rút',
    tag: 'Viêm phổi nghi vi-rút nguy hiểm',
    desc: 'Nam 52t, sốt 39.5°C, thở 28l/p, bạch cầu giảm (3.8k), nghi dịch tễ vi-rút.',
    data: {
      age: 52, gender: 'male', rr: 28, sbp: 110, dbp: 70, temp: 39.5, pulse: 112, mental: 0, bun: 18,
      pf: 240, wbc: 3.8, plt: 120, ph: 7.36, na: 137, glu: 105, hct: 39,
      cxrMulti: true, pleural: false, neoplasm: false, liver: false, chf: false, cvd: false, renal: false,
      hapHosp: false, hapAb: false, hapShock: false, sariVirus: true, pneuVaso: false
    }
  }
];

export function setBadge(el: HTMLElement | null, type: string): void {
  if (!el) return;
  el.className = 'studio-risk-badge';
  el.setAttribute('data-risk', type || 'low');
}

export function runPneumoniaLogic(): void {
  const inAge = document.getElementById('pneu-age') as HTMLInputElement | null;
  const inGender = document.getElementById('pneu-gender') as HTMLSelectElement | null;
  const inRr = document.getElementById('pneu-rr') as HTMLInputElement | null;
  const inSbp = document.getElementById('pneu-sbp') as HTMLInputElement | null;
  const inDbp = document.getElementById('pneu-dbp') as HTMLInputElement | null;
  const inTemp = document.getElementById('pneu-temp') as HTMLInputElement | null;
  const inPulse = document.getElementById('pneu-pulse') as HTMLInputElement | null;
  const inMental = document.getElementById('pneu-mental') as HTMLSelectElement | null;
  const inBun = document.getElementById('pneu-bun') as HTMLInputElement | null;
  const inPf = document.getElementById('pneu-pf') as HTMLInputElement | null;
  const inWbc = document.getElementById('pneu-wbc') as HTMLInputElement | null;
  const inPlt = document.getElementById('pneu-plt') as HTMLInputElement | null;
  const inPh = document.getElementById('pneu-ph') as HTMLInputElement | null;
  const inNa = document.getElementById('pneu-na') as HTMLInputElement | null;
  const inGlu = document.getElementById('pneu-glu') as HTMLInputElement | null;
  const inHct = document.getElementById('pneu-hct') as HTMLInputElement | null;

  const chkCxrMulti = document.getElementById('pneu-cxr-multi') as HTMLInputElement | null;
  const chkPleural = document.getElementById('pneu-pleural') as HTMLInputElement | null;
  const chkPsiNeoplasm = document.getElementById('psi-neoplasm') as HTMLInputElement | null;
  const chkPsiLiver = document.getElementById('psi-liver') as HTMLInputElement | null;
  const chkPsiChf = document.getElementById('psi-chf') as HTMLInputElement | null;
  const chkPsiCvd = document.getElementById('psi-cvd') as HTMLInputElement | null;
  const chkPsiRenal = document.getElementById('psi-renal') as HTMLInputElement | null;
  const chkHapHosp = document.getElementById('hap-hosp48') as HTMLInputElement | null;
  const chkHapAb = document.getElementById('hap-ab90') as HTMLInputElement | null;
  const chkHapShock = document.getElementById('hap-shock') as HTMLInputElement | null;
  const chkSariVirus = document.getElementById('sari-virus') as HTMLInputElement | null;
  const chkPneuVaso = document.getElementById('pneu-vaso') as HTMLInputElement | null;

  const outCurb65 = document.getElementById('out-curb65');
  const outPsi = document.getElementById('out-psi');
  const outIdsa = document.getElementById('out-idsa');
  const outMdr = document.getElementById('out-mdr');
  const curbSubtext = document.getElementById('curbSubtext');
  const psiSubtext = document.getElementById('psiSubtext');
  const curbMeter = document.getElementById('curbMeter');
  const psiMeter = document.getElementById('psiMeter');

  const boxAlert = document.getElementById('pneu-diagnostic-alert');
  const listDiag = document.getElementById('pneu-diagnostic-list');
  const cdssList = document.getElementById('cdssList');
  const emrTextarea = document.getElementById('emrTextarea') as HTMLTextAreaElement | null;

  const age = parseFloat(inAge?.value || '0') || 0;
  const gender = inGender?.value || 'male';
  const rr = parseFloat(inRr?.value || '0') || 0;
  const sbp = parseFloat(inSbp?.value || '0') || 0;
  const dbp = parseFloat(inDbp?.value || '0') || 0;
  const temp = parseFloat(inTemp?.value || '0') || 0;
  const pulse = parseFloat(inPulse?.value || '0') || 0;
  const mental = parseInt(inMental?.value || '0', 10) || 0;
  const bun = parseFloat(inBun?.value || '0') || 0;
  const pf = parseFloat(inPf?.value || '0') || 0;
  const wbc = parseFloat(inWbc?.value || '0') || 0;
  const plt = parseFloat(inPlt?.value || '0') || 0;
  const ph = parseFloat(inPh?.value || '0') || 0;
  const na = parseFloat(inNa?.value || '0') || 0;
  const glu = parseFloat(inGlu?.value || '0') || 0;
  const hct = parseFloat(inHct?.value || '0') || 0;

  // 1. CURB-65
  let curb = 0;
  if (mental === 1) curb++;
  if (bun > 19) curb++;
  if (rr >= 30) curb++;
  if (sbp < 90 || dbp <= 60) curb++;
  if (age >= 65) curb++;

  if (outCurb65) outCurb65.textContent = curb.toString();
  if (curbSubtext) curbSubtext.textContent = `${curb}/5 chỉ số thỏa`;
  const curbPct = (curb / 5) * 100;
  if (curbMeter) {
    curbMeter.style.width = curbPct + '%';
    curbMeter.style.backgroundColor = curb >= 4 ? 'var(--color-rose)' : curb >= 3 ? '#eab308' : curb >= 2 ? '#f59e0b' : 'var(--color-success)';
  }
  setBadge(outCurb65, curb >= 4 ? 'critical' : curb >= 3 ? 'high' : curb >= 2 ? 'mid' : 'low');

  // 2. PSI Score
  let psi = gender === 'female' ? age - 10 : age;
  if (chkPsiNeoplasm?.checked) psi += 30;
  if (chkPsiLiver?.checked) psi += 20;
  if (chkPsiChf?.checked) psi += 10;
  if (chkPsiCvd?.checked) psi += 10;
  if (chkPsiRenal?.checked) psi += 10;

  if (mental === 1) psi += 20;
  if (rr >= 30) psi += 20;
  if (sbp < 90) psi += 20;
  if (temp < 35 || temp >= 40) psi += 15;
  if (pulse >= 125) psi += 10;

  if (ph < 7.35) psi += 30;
  if (bun >= 30) psi += 20;
  if (na < 130) psi += 20;
  if (glu >= 250) psi += 10;
  if (hct < 30) psi += 10;
  if (pf < 250) psi += 10;
  if (chkCxrMulti?.checked) psi += 30;
  if (chkPleural?.checked) psi += 10;

  let psiClass = 'I';
  let psiBadge = 'low';

  const hasComorbidities = chkPsiNeoplasm?.checked || chkPsiLiver?.checked || chkPsiChf?.checked || chkPsiCvd?.checked || chkPsiRenal?.checked;
  const abnormalVitals = mental === 1 || rr >= 30 || sbp < 90 || pulse >= 125 || temp < 35 || temp >= 40;

  if (age <= 50 && !hasComorbidities && !abnormalVitals) {
    psiClass = 'I'; psiBadge = 'low';
  } else if (psi <= 70) {
    psiClass = 'II'; psiBadge = 'low';
  } else if (psi <= 90) {
    psiClass = 'III'; psiBadge = 'mid';
  } else if (psi <= 130) {
    psiClass = 'IV'; psiBadge = 'high';
  } else {
    psiClass = 'V'; psiBadge = 'critical';
  }

  if (outPsi) outPsi.textContent = `Class ${psiClass}`;
  if (psiSubtext) psiSubtext.textContent = `${psi} điểm nguy cơ`;
  const psiPct = Math.min(100, Math.max(10, (psi / 160) * 100));
  if (psiMeter) {
    psiMeter.style.width = psiPct + '%';
    psiMeter.style.backgroundColor = psiClass === 'V' ? 'var(--color-rose)' : psiClass === 'IV' ? '#eab308' : psiClass === 'III' ? '#f59e0b' : 'var(--color-success)';
  }
  setBadge(outPsi, psiBadge);

  // 3. IDSA/ATS
  let idsaMajor = 0;
  let idsaMinor = 0;

  if (chkPneuVaso?.checked) idsaMajor++;
  if (rr >= 30) idsaMinor++;
  if (pf <= 250) idsaMinor++;
  if (chkCxrMulti?.checked) idsaMinor++;
  if (mental === 1) idsaMinor++;
  if (bun >= 20) idsaMinor++;
  if (wbc < 4.0) idsaMinor++;
  if (plt < 100) idsaMinor++;
  if (temp < 36) idsaMinor++;
  if (sbp < 90) idsaMinor++;

  let idsaResult = 'Ngoại trú';
  let idsaBadge = 'low';

  if (idsaMajor >= 1 || idsaMinor >= 3) {
    idsaResult = 'Nhập ICU';
    idsaBadge = 'critical';
  } else if (curb >= 2 || psiClass === 'IV' || psiClass === 'V') {
    idsaResult = 'Nội trú thường';
    idsaBadge = 'high';
  }

  if (outIdsa) outIdsa.textContent = idsaResult;
  setBadge(outIdsa, idsaBadge);

  // 4. MDR Risk
  let mdrRisk = false;
  if (chkHapHosp?.checked && (chkHapAb?.checked || chkHapShock?.checked || chkPneuVaso?.checked)) {
    mdrRisk = true;
  }

  if (outMdr) {
    if (chkHapHosp?.checked) {
      outMdr.textContent = mdrRisk ? 'Cao (MDR +)' : 'Thấp';
      setBadge(outMdr, mdrRisk ? 'critical' : 'low');
    } else {
      outMdr.textContent = 'N/A (CAP)';
      setBadge(outMdr, 'low');
    }
  }

  // 5. Alerts & CDSS Directives
  const alerts: string[] = [];
  const cdss: string[] = [];
  let isCritical = false;

  if (chkHapHosp?.checked) {
    alerts.push('<strong>🏥 Viêm Phổi Bệnh Viện (HAP/VAP):</strong> Triệu chứng khởi phát ≥ 48 giờ sau nhập viện.');
    if (mdrRisk) {
      alerts.push('<strong style="color: var(--color-rose);">⚠️ Nguy cơ MDR CAO:</strong> Thỏa tiền sử dùng KS IV 90 ngày hoặc sốc/thở máy.');
      cdss.push('💊 <strong>Kháng sinh ban đầu HAP MDR cao:</strong> Phối hợp 2 kháng sinh chống P. aeruginosa (Beta-lactam phổ rộng + Aminoglycoside/Fluoroquinolone) + Vancomycin/Linezolid bao phủ MRSA.');
      isCritical = true;
    } else {
      alerts.push('📌 Nguy cơ MDR Thấp: Điều trị theo hướng dẫn HAP nguy cơ thấp.');
      cdss.push('💊 <strong>Kháng sinh HAP nguy cơ thấp:</strong> Đơn trị liệu Piperacillin/tazobactam, Cefepime, Levofloxacin hoặc Meropenem.');
    }
  } else {
    alerts.push('<strong>🏡 Viêm Phổi Cộng Đồng (CAP):</strong>');
    if (idsaResult === 'Nhập ICU') {
      alerts.push(`<strong style="color: var(--color-rose);">🚨 CHỈ ĐỊNH NHẬP ICU:</strong> Thỏa tiêu chuẩn IDSA/ATS (${idsaMajor} chính, ${idsaMinor} phụ).`);
      cdss.push('🚨 <strong>Nhập ICU khẩn cấp:</strong> Cần hỗ trợ hô hấp (Thở máy/NIV) và hỗ trợ tuần hoàn nếu có sốc.');
      cdss.push('💊 <strong>KS CAP Nặng (ICU):</strong> Beta-lactam chống phế cầu (Ceftriaxone / Cefotaxime / Ampicillin-sulbactam) + Azithromycin HOẶC Fluoroquinolone IV.');
      isCritical = true;
    } else if (idsaResult === 'Nội trú thường') {
      alerts.push(`📌 <strong>Chỉ định Nhập viện Nội Trú:</strong> Điểm CURB-65 = ${curb}, PSI Class ${psiClass}.`);
      cdss.push('💊 <strong>KS CAP Nội trú (Khoa thường):</strong> Beta-lactam tĩnh mạch + Macrolide (Azithromycin) HOẶC Đơn trị hô hấp Fluoroquinolone (Levofloxacin/Moxifloxacin).');
    } else {
      alerts.push(`🟢 <strong>Điều trị Ngoại Trú:</strong> Bệnh nhân nguy cơ thấp (CURB-65 = ${curb}, PSI Class ${psiClass}).`);
      cdss.push('💊 <strong>KS CAP Ngoại trú:</strong> Amoxicillin liều cao (1g x 3 lần/ngày) hoặc Doxycycline (nếu không bệnh nền); hoặc Amoxicillin/clavulanate + Macrolide (nếu có bệnh nền).');
    }
  }

  if (chkSariVirus?.checked && temp >= 38 && rr >= 22) {
    alerts.push('<strong style="color: var(--color-rose);">🦠 Gợi ý Viêm Phổi Nặng do Vi-rút (SARI):</strong> Cần cách ly hô hấp khẩn cấp.');
    cdss.push('🦠 <strong>Dịch tễ SARI:</strong> Lấy mẫu quệt mũi họng làm PCR vi-rút hô hấp (Cúm, SARS-CoV-2), dùng Oseltamivir sớm nếu nghi cúm.');
    isCritical = true;
  }

  if (boxAlert) boxAlert.className = 'studio-alert-banner ' + (isCritical ? 'alert-danger' : 'alert-info');
  if (listDiag) listDiag.innerHTML = alerts.map(a => `<li>${a}</li>`).join('');
  if (cdssList) cdssList.innerHTML = cdss.map(c => `<li class="cdss-recommendation-item">${c}</li>`).join('');

  // EMR Report text
  const emrText = `=== PNEUMONIA STUDIO - BÁO CÁO LÂM SÀNG ===
Bệnh nhân: ${age} tuổi | Giới tính: ${gender === 'female' ? 'Nữ' : 'Nam'}
Sinh hiệu: HA ${sbp}/${dbp} mmHg | Mạch ${pulse} bpm | Nhịp thở ${rr} l/p | T° ${temp}°C | Tri giác: ${mental === 1 ? 'Lú lẫn' : 'Tỉnh'}
Xét nghiệm: PaO2/FiO2: ${pf} | BUN: ${bun} mg/dL | WBC: ${wbc} k/uL | Plt: ${plt} k/uL | pH: ${ph} | Na: ${na} mmol/L
Hình ảnh: ${chkCxrMulti?.checked ? 'Thâm nhiễm đa thùy' : 'Bình thường/Đơn thùy'} | Tràn dịch MP: ${chkPleural?.checked ? 'Có' : 'Không'}

-- KẾT QUẢ ĐÁNH GIÁ NGUY CƠ --
• Điểm CURB-65: ${curb} điểm
• Thang điểm PSI: Class ${psiClass} (${psi} điểm)
• Tiêu chuẩn IDSA/ATS: ${idsaResult} (${idsaMajor} tiêu chuẩn chính, ${idsaMinor} tiêu chuẩn phụ)
• Phân tầng HAP/VAP: ${chkHapHosp?.checked ? (mdrRisk ? 'Bệnh viện - MDR CAO' : 'Bệnh viện - MDR Thấp') : 'Viêm phổi cộng đồng (CAP)'}
• Cảnh báo SARI: ${chkSariVirus?.checked ? 'Nghi ngờ vi-rút hô hấp nguy hiểm' : 'Âm tính'}

-- ĐỊNH HƯỚNG ĐIỀU TRỊ (CDSS) --
${cdss.map(c => '- ' + c.replace(/<[^>]*>/g, '')).join('\n')}`;

  if (emrTextarea) emrTextarea.value = emrText;
}

export function loadPresetData(d: PneumoniaPatientData): void {
  const setVal = (id: string, v: string | number) => {
    const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
    if (el) el.value = v.toString();
  };
  const setChk = (id: string, b: boolean) => {
    const el = document.getElementById(id) as HTMLInputElement | null;
    if (el) el.checked = b;
  };

  setVal('pneu-age', d.age);
  setVal('pneu-gender', d.gender);
  setVal('pneu-rr', d.rr);
  setVal('pneu-sbp', d.sbp);
  setVal('pneu-dbp', d.dbp);
  setVal('pneu-temp', d.temp);
  setVal('pneu-pulse', d.pulse);
  setVal('pneu-mental', d.mental);
  setVal('pneu-bun', d.bun);
  setVal('pneu-pf', d.pf);
  setVal('pneu-wbc', d.wbc);
  setVal('pneu-plt', d.plt);
  setVal('pneu-ph', d.ph);
  setVal('pneu-na', d.na);
  setVal('pneu-glu', d.glu);
  setVal('pneu-hct', d.hct);

  setChk('pneu-cxr-multi', d.cxrMulti);
  setChk('pneu-pleural', d.pleural);
  setChk('psi-neoplasm', d.neoplasm);
  setChk('psi-liver', d.liver);
  setChk('psi-chf', d.chf);
  setChk('psi-cvd', d.cvd);
  setChk('psi-renal', d.renal);
  setChk('hap-hosp48', d.hapHosp);
  setChk('hap-ab90', d.hapAb);
  setChk('hap-shock', d.hapShock);
  setChk('sari-virus', d.sariVirus);
  setChk('pneu-vaso', d.pneuVaso);

  runPneumoniaLogic();
}

export function clearPneumoniaInputs(): void {
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  const setVal = (id: string, v: string) => {
    const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
    if (el) el.value = v;
  };

  document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach(c => (c.checked = false));

  setVal('pneu-age', '50');
  setVal('pneu-rr', '18');
  setVal('pneu-sbp', '120');
  setVal('pneu-dbp', '80');
  setVal('pneu-temp', '37.0');
  setVal('pneu-pulse', '80');
  setVal('pneu-bun', '15');
  setVal('pneu-pf', '400');
  setVal('pneu-wbc', '7.5');
  setVal('pneu-plt', '250');
  setVal('pneu-ph', '7.40');
  setVal('pneu-na', '140');
  setVal('pneu-glu', '100');
  setVal('pneu-hct', '40');

  runPneumoniaLogic();
}

export function initPneumoniaStudio(): void {
  const presetContainer = document.getElementById('presetContainer');
  if (presetContainer) {
    presetContainer.innerHTML = '';
    PRESETS.forEach(p => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'preset-btn';
      btn.innerHTML = `
        <span class="preset-name">${p.name}</span>
        <span class="preset-tag">${p.tag}</span>
        <span class="preset-desc">${p.desc}</span>
      `;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadPresetData(p.data);
      });
      presetContainer.appendChild(btn);
    });
  }

  const inputs = document.querySelectorAll('#pneu-calc-form input, #pneu-calc-form select');
  inputs.forEach(el => {
    el.addEventListener('input', runPneumoniaLogic);
    el.addEventListener('change', runPneumoniaLogic);
  });

  const btnClear = document.getElementById('pneu-btn-clear');
  if (btnClear) btnClear.addEventListener('click', clearPneumoniaInputs);

  const btnToggleEMR = document.getElementById('btnToggleEMR');
  const emrContainer = document.getElementById('emrContainer');
  if (btnToggleEMR && emrContainer) {
    btnToggleEMR.addEventListener('click', () => {
      if (emrContainer.style.display === 'none') {
        emrContainer.style.display = 'block';
        btnToggleEMR.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Ẩn Khung Báo Cáo EMR';
      } else {
        emrContainer.style.display = 'none';
        btnToggleEMR.innerHTML = '<i class="fa-solid fa-file-lines"></i> Hiện Khung Báo Cáo EMR';
      }
    });
  }

  const btnCopyEMR = document.getElementById('btnCopyEMR');
  const emrTextarea = document.getElementById('emrTextarea') as HTMLTextAreaElement | null;
  if (btnCopyEMR && emrTextarea) {
    btnCopyEMR.addEventListener('click', () => {
      navigator.clipboard.writeText(emrTextarea.value).then(() => {
        const origText = btnCopyEMR.innerHTML;
        btnCopyEMR.innerHTML = '<i class="fa-solid fa-check"></i> Đã Sao Chép!';
        btnCopyEMR.style.background = 'var(--color-success)';
        btnCopyEMR.style.color = '#ffffff';
        setTimeout(() => {
          btnCopyEMR.innerHTML = origText;
          btnCopyEMR.style.background = '';
          btnCopyEMR.style.color = '';
        }, 2000);
      });
    });
  }

  runPneumoniaLogic();
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.runPneumoniaLogic = runPneumoniaLogic;
  win.loadPresetData = loadPresetData;
  win.clearPneumoniaInputs = clearPneumoniaInputs;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPneumoniaStudio);
  } else {
    initPneumoniaStudio();
  }
}
