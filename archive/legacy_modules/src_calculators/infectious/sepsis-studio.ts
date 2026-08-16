/**
 * CliniPortal — Sepsis & Septic Shock CDSS Studio (TypeScript Module)
 * Multi-score Sepsis-3 Engine: NEWS2, SOFA, qSOFA, SIRS, MEDS Score, Shock Index & Surviving Sepsis Campaign (SSC) 1-Hour Bundle
 */

export interface SepsisScenarioData {
  hr: number;
  sbp: number;
  rr: number;
  temp: number;
  spo2: number;
  scale: string;
  o2: string;
  acvpu: string;
  resp: string;
  coag: string;
  liver: string;
  cardio: string;
  cns: string;
  renal: string;
  terminal: boolean;
  age65: boolean;
  lri: boolean;
  nursing: boolean;
  bands: boolean;
  wbcAbn: boolean;
  lactate: boolean;
}

export interface SepsisScenarioPreset {
  id: string;
  title: string;
  desc: string;
  cls: string;
  d: SepsisScenarioData;
}

export const SCENARIOS: SepsisScenarioPreset[] = [
  {
    id: 'septic-shock',
    title: 'Ca 1: Sốc Nhiễm Khuẩn Điển Hình',
    desc: 'Viêm phổi nặng, suy đa cơ quan, Lactate > 2, HA tụt',
    cls: 'sc-sepsis-danger',
    d: {
      hr: 120, sbp: 82, rr: 28, temp: 39.4, spo2: 88, scale: '1', o2: '2', acvpu: '3',
      resp: '3', coag: '2', liver: '2', cardio: '3', cns: '2', renal: '2',
      terminal: false, age65: true, lri: true, nursing: false, bands: true, wbcAbn: true, lactate: true
    }
  },
  {
    id: 'early-sepsis',
    title: 'Ca 2: Nhiễm Khuẩn Huyết Sớm (Sepsis)',
    desc: 'SOFA ≥ 2, qSOFA ≥ 2, chưa tụt huyết áp',
    cls: 'sc-sepsis-amber',
    d: {
      hr: 108, sbp: 100, rr: 24, temp: 38.8, spo2: 94, scale: '1', o2: '2', acvpu: '3',
      resp: '1', coag: '0', liver: '1', cardio: '1', cns: '1', renal: '1',
      terminal: false, age65: true, lri: true, nursing: false, bands: false, wbcAbn: true, lactate: false
    }
  },
  {
    id: 'sirs-only',
    title: 'Ca 3: SIRS Đơn Thuần (Chưa Sepsis)',
    desc: 'Sốt, nhịp tim nhanh — chưa đủ tiêu chuẩn Sepsis-3',
    cls: 'sc-sepsis-teal',
    d: {
      hr: 95, sbp: 118, rr: 22, temp: 38.5, spo2: 97, scale: '1', o2: '0', acvpu: '0',
      resp: '0', coag: '0', liver: '0', cardio: '0', cns: '0', renal: '0',
      terminal: false, age65: false, lri: false, nursing: false, bands: false, wbcAbn: true, lactate: false
    }
  },
  {
    id: 'elderly-pneumonia',
    title: 'Ca 4: Viêm Phổi BN Cao Tuổi',
    desc: 'Tuổi ≥ 65, viêm phổi, lú lẫn nhẹ, NEWS2 cao',
    cls: 'sc-sepsis-purple',
    d: {
      hr: 112, sbp: 105, rr: 26, temp: 37.8, spo2: 91, scale: '1', o2: '2', acvpu: '3',
      resp: '1', coag: '1', liver: '0', cardio: '0', cns: '1', renal: '1',
      terminal: false, age65: true, lri: true, nursing: true, bands: true, wbcAbn: true, lactate: false
    }
  }
];

function setVal(id: string, v: string | number): void {
  const el = document.getElementById(id) as HTMLInputElement | null;
  if (el) el.value = v.toString();
}

function setSel(id: string, v: string): void {
  const el = document.getElementById(id) as HTMLSelectElement | null;
  if (el) el.value = v;
}

function setChk(id: string, v: boolean): void {
  const el = document.getElementById(id) as HTMLInputElement | null;
  if (el) el.checked = Boolean(v);
}

function getNum(id: string): number {
  const el = document.getElementById(id) as HTMLInputElement | null;
  return el ? parseFloat(el.value) || 0 : 0;
}

function getInt(id: string): number {
  const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
  return el ? parseInt(el.value, 10) || 0 : 0;
}

function getChk(id: string): boolean {
  const el = document.getElementById(id) as HTMLInputElement | null;
  return el ? el.checked : false;
}

export function loadScenario(d: SepsisScenarioData): void {
  setVal('vit-hr', d.hr);
  setVal('vit-sbp', d.sbp);
  setVal('vit-rr', d.rr);
  setVal('vit-temp', d.temp);
  setVal('vit-spo2', d.spo2);
  setSel('vit-spo2-scale', d.scale);
  setSel('vit-oxygen', d.o2);
  setSel('vit-acvpu', d.acvpu);
  setSel('sofa-resp', d.resp);
  setSel('sofa-coag', d.coag);
  setSel('sofa-liver', d.liver);
  setSel('sofa-cardio', d.cardio);
  setSel('sofa-cns', d.cns);
  setSel('sofa-renal', d.renal);
  setChk('meds-terminal', d.terminal);
  setChk('meds-age65', d.age65);
  setChk('meds-lri', d.lri);
  setChk('meds-nursing', d.nursing);
  setChk('meds-bands', d.bands);
  setChk('sirs-wbc-abn', d.wbcAbn);
  setChk('sepsis3-lactate', d.lactate);
  calculateAll();
}

export function calculateAll(): void {
  const hr = getNum('vit-hr');
  const sbp = getNum('vit-sbp');
  const rr = getNum('vit-rr');
  const temp = getNum('vit-temp');
  const spo2 = getNum('vit-spo2');
  const scale = getInt('vit-spo2-scale');
  const oxVal = getInt('vit-oxygen');
  const acvpu = getInt('vit-acvpu');

  // ── NEWS2 ──
  let news2 = 0;
  if (rr <= 8) news2 += 3;
  else if (rr <= 11) news2 += 1;
  else if (rr <= 20) news2 += 0;
  else if (rr <= 24) news2 += 2;
  else news2 += 3;

  news2 += oxVal;

  if (scale === 1) {
    if (spo2 >= 96) news2 += 0;
    else if (spo2 >= 94) news2 += 1;
    else if (spo2 >= 92) news2 += 2;
    else news2 += 3;
  } else {
    if (spo2 >= 97) news2 += 3;
    else if (spo2 >= 95) news2 += 2;
    else if (spo2 >= 93) news2 += 1;
    else if (spo2 >= 88) news2 += 0;
    else if (spo2 >= 86) news2 += 1;
    else if (spo2 >= 84) news2 += 2;
    else news2 += 3;
  }

  if (sbp <= 90) news2 += 3;
  else if (sbp <= 100) news2 += 2;
  else if (sbp <= 110) news2 += 1;
  else if (sbp <= 219) news2 += 0;
  else news2 += 3;

  if (temp <= 35.0) news2 += 3;
  else if (temp <= 36.0) news2 += 1;
  else if (temp <= 38.0) news2 += 0;
  else if (temp <= 39.0) news2 += 1;
  else news2 += 2;

  if (hr <= 40) news2 += 3;
  else if (hr <= 50) news2 += 1;
  else if (hr <= 90) news2 += 0;
  else if (hr <= 110) news2 += 1;
  else if (hr <= 130) news2 += 2;
  else news2 += 3;

  news2 += acvpu;

  // ── SOFA ──
  const sofa = getInt('sofa-resp') + getInt('sofa-coag') + getInt('sofa-liver') +
    getInt('sofa-cardio') + getInt('sofa-cns') + getInt('sofa-renal');

  // ── SIRS ──
  let sirs = 0;
  if (temp > 38.0 || temp < 36.0) sirs++;
  if (hr > 90) sirs++;
  if (rr > 20) sirs++;
  if (getChk('sirs-wbc-abn')) sirs++;

  // ── qSOFA ──
  let qsofa = 0;
  if (rr >= 22) qsofa++;
  if (acvpu > 0) qsofa++;
  if (sbp <= 100) qsofa++;

  // ── Shock Index ──
  const shockIdx = (sbp > 0) ? (hr / sbp) : 0;

  // ── MEDS ──
  let meds = 0;
  if (getChk('meds-terminal')) meds += 6;
  if (getChk('meds-age65')) meds += 3;
  if (getChk('meds-lri')) meds += 2;
  if (getChk('meds-nursing')) meds += 2;
  if (getChk('meds-bands')) meds += 3;
  if (acvpu > 0) meds += 2;
  if (rr >= 20 || spo2 < 90) meds += 3;
  if (getInt('sofa-coag') >= 1) meds += 3;
  if (sbp < 90 || getInt('sofa-cardio') >= 1) meds += 3;

  // ── Clinical Phenotype ──
  const isSepsis = sofa >= 2 && qsofa >= 2;
  const isSepticShock = isSepsis && getChk('sepsis3-lactate') && sbp <= 90;

  // ── Update Score Tiles ──
  updateTile('tile-news2', 'val-news2', 'lbl-news2', news2, [
    { max: 4, cls: 'tile-ok', lbl: 'Nguy cơ thấp' },
    { max: 6, cls: 'tile-warn', lbl: 'Trung bình — Tăng theo dõi' },
    { max: 8, cls: 'tile-alert', lbl: 'Cao — Đánh giá khẩn' },
    { max: 99, cls: 'tile-crit', lbl: 'RẤT CAO — NGUY CẤP' }
  ]);

  updateTile('tile-sofa', 'val-sofa', 'lbl-sofa', sofa, [
    { max: 1, cls: 'tile-ok', lbl: 'Bình thường' },
    { max: 3, cls: 'tile-warn', lbl: 'Suy cơ quan nhẹ' },
    { max: 6, cls: 'tile-alert', lbl: 'Suy cơ quan trung bình' },
    { max: 99, cls: 'tile-crit', lbl: 'Suy đa cơ quan nặng' }
  ]);

  updateTile('tile-qsofa', 'val-qsofa', 'lbl-qsofa', qsofa, [
    { max: 1, cls: 'tile-ok', lbl: qsofa + '/3 — Thấp' },
    { max: 2, cls: 'tile-warn', lbl: qsofa + '/3 — Cần xét nghiệm' },
    { max: 99, cls: 'tile-crit', lbl: qsofa + '/3 — NGUY CƠ CAO' }
  ]);

  updateTile('tile-sirs', 'val-sirs', 'lbl-sirs', sirs, [
    { max: 1, cls: 'tile-ok', lbl: sirs + '/4 — Chưa đủ SIRS' },
    { max: 2, cls: 'tile-warn', lbl: sirs + '/4 — Đáp ứng viêm' },
    { max: 3, cls: 'tile-alert', lbl: sirs + '/4 — SIRS rõ' },
    { max: 99, cls: 'tile-crit', lbl: sirs + '/4 — SIRS đầy đủ' }
  ]);

  updateTile('tile-meds', 'val-meds', 'lbl-meds', meds, [
    { max: 4, cls: 'tile-ok', lbl: 'Nguy cơ thấp' },
    { max: 7, cls: 'tile-warn', lbl: 'Trung bình (~8%)' },
    { max: 12, cls: 'tile-alert', lbl: 'Cao (~20-30%)' },
    { max: 99, cls: 'tile-crit', lbl: 'Rất cao (>50%)' }
  ]);

  const shockEl = document.getElementById('tile-shock');
  const shockVal = document.getElementById('val-shock');
  const shockLbl = document.getElementById('lbl-shock');
  if (shockVal) shockVal.textContent = shockIdx.toFixed(2);
  if (shockEl) {
    shockEl.className = 'score-tile';
    if (shockIdx >= 1.0) {
      shockEl.classList.add('tile-crit');
      if (shockLbl) shockLbl.textContent = 'NGUY CẤP ≥ 1.0';
    } else if (shockIdx >= 0.8) {
      shockEl.classList.add('tile-alert');
      if (shockLbl) shockLbl.textContent = 'Cao 0.8-1.0';
    } else {
      shockEl.classList.add('tile-ok');
      if (shockLbl) shockLbl.textContent = 'Bình thường';
    }
  }

  // ── Mortality ──
  let mort = 'Thấp (&lt; 1%)';
  let mortColor = 'var(--color-success, #10b981)';
  if (isSepticShock || meds > 15 || sofa >= 10) {
    mort = 'Rất cao (≥ 50%)'; mortColor = 'var(--color-danger, #ef4444)';
  } else if (meds >= 13 || sofa >= 6) {
    mort = 'Cao (~ 20–30%)'; mortColor = 'var(--color-danger, #ef4444)';
  } else if (meds >= 8 || sofa >= 3) {
    mort = 'Trung bình (~ 8%)'; mortColor = '#f97316';
  } else if (meds >= 5 || sofa >= 1) {
    mort = 'Nhẹ (~ 2%)'; mortColor = 'var(--color-warning, #f59e0b)';
  }
  const mortEl = document.getElementById('val-mortality');
  if (mortEl) { mortEl.innerHTML = mort; mortEl.style.color = mortColor; }

  // ── Diagnosis Banner ──
  const banner = document.getElementById('dx-banner');
  const bannerLbl = document.getElementById('dx-banner-label');
  const bannerTitle = document.getElementById('dx-banner-title');
  const bannerDesc = document.getElementById('dx-banner-desc');
  const badgeOverall = document.getElementById('badge-overall');

  if (banner && bannerLbl && bannerTitle && bannerDesc && badgeOverall) {
    if (isSepticShock) {
      banner.className = 'sepsis-diagnosis-banner state-critical';
      bannerLbl.textContent = 'CHẨN ĐOÁN: SEPSIS-3';
      bannerTitle.textContent = '🔴 SỐC NHIỄM KHUẨN (SEPTIC SHOCK)';
      bannerDesc.textContent = 'Sepsis + Lactate > 2.0 mmol/L + Tụt huyết áp cần vận mạch. Tỷ lệ tử vong > 40%. Kích hoạt 1-hour Bundle khẩn!';
      badgeOverall.className = 'badge badge-danger';
      badgeOverall.textContent = 'NGUY CẤP';
    } else if (isSepsis) {
      banner.className = 'sepsis-diagnosis-banner state-critical';
      bannerLbl.textContent = 'CHẨN ĐOÁN: SEPSIS-3';
      bannerTitle.textContent = '🟠 NHIỄM KHUẨN HUYẾT (SEPSIS)';
      bannerDesc.textContent = 'SOFA ≥ 2 + qSOFA ≥ 2. Rối loạn chức năng cơ quan đe dọa tính mạng. Bắt đầu điều trị Sepsis ngay!';
      badgeOverall.className = 'badge badge-warning';
      badgeOverall.textContent = 'NGUY HIỂM';
    } else if (qsofa >= 2) {
      banner.className = 'sepsis-diagnosis-banner state-warn';
      bannerLbl.textContent = 'CẢNH BÁO: qSOFA ≥ 2';
      bannerTitle.textContent = '⚠️ NGHI NGỜ NHIỄM KHUẨN HUYẾT';
      bannerDesc.textContent = 'qSOFA = ' + qsofa + '/3. Chưa đủ tiêu chuẩn Sepsis-3 nhưng cần xét nghiệm SOFA đầy đủ và theo dõi sát.';
      badgeOverall.className = 'badge badge-warning';
      badgeOverall.textContent = 'THẬN TRỌNG';
    } else if (news2 >= 5 || sirs >= 2) {
      banner.className = 'sepsis-diagnosis-banner state-warn';
      bannerLbl.textContent = 'CẢNH BÁO: NEWS2/SIRS';
      bannerTitle.textContent = '🟡 ĐÁP ỨNG VIÊM / NGUY CƠ NHIỄM KHUẨN';
      bannerDesc.textContent = 'NEWS2 = ' + news2 + ', SIRS = ' + sirs + '/4. Có dấu hiệu sinh lý bất thường. Tăng tần suất theo dõi và đánh giá lại.';
      badgeOverall.className = 'badge badge-warning';
      badgeOverall.textContent = 'THEO DÕI';
    } else {
      banner.className = 'sepsis-diagnosis-banner state-ok';
      bannerLbl.textContent = 'PHÂN TÍCH LÂM SÀNG';
      bannerTitle.textContent = '✅ Chưa Ghi Nhận Bất Thường Đáng Kể';
      bannerDesc.textContent = 'Các thông số sinh lý trong giới hạn bình thường. Tiếp tục theo dõi định kỳ.';
      badgeOverall.className = 'badge badge-success';
      badgeOverall.textContent = 'ỔN ĐỊNH';
    }
  }

  // ── Clinical Alerts ──
  const alerts: { cls: string; txt: string }[] = [];

  if (isSepticShock) {
    alerts.push({ cls: 'alert-crit', txt: '🔴 <strong>SỐC NHIỄM KHUẨN (Septic Shock — Sepsis-3):</strong> Lactate > 2 mmol/L + Tụt huyết áp cần vận mạch. Tỷ lệ tử vong > 40%. <strong>Kích hoạt 1-hour Bundle:</strong> Cấy máu → KS phổ rộng → Bù dịch 30 mL/kg → Norepinephrine IV nếu MAP < 65 mmHg!' });
  } else if (isSepsis) {
    alerts.push({ cls: 'alert-high', txt: '🟠 <strong>NHIỄM KHUẨN HUYẾT (Sepsis — Sepsis-3):</strong> SOFA = ' + sofa + ' + qSOFA = ' + qsofa + '/3. Rối loạn chức năng cơ quan đe dọa tính mạng. Bắt đầu Sepsis Bundle trong 1 giờ!' });
  }

  if (news2 >= 7) alerts.push({ cls: 'alert-high', txt: '🔴 <strong>NEWS2 = ' + news2 + ' (Nguy cơ rất cao):</strong> Chuyển ICU / Hồi sức, đánh giá khẩn, monitor liên tục.' });
  else if (news2 >= 5) alerts.push({ cls: 'alert-mid', txt: '🟠 <strong>NEWS2 = ' + news2 + ' (Nguy cơ trung bình):</strong> Tăng tần suất theo dõi, cân nhắc khu vực theo dõi cao hơn.' });
  else if (news2 >= 1) alerts.push({ cls: 'alert-low', txt: '🟡 <strong>NEWS2 = ' + news2 + ' (Nguy cơ thấp):</strong> Theo dõi định kỳ mỗi 4-6 giờ.' });

  if (!isSepsis && qsofa >= 2) alerts.push({ cls: 'alert-mid', txt: '⚠️ <strong>qSOFA = ' + qsofa + '/3:</strong> Nghi ngờ nhiễm khuẩn huyết — cần xét nghiệm SOFA đầy đủ (bilirubin, creatinine, PaO₂/FiO₂).' });
  if (!isSepsis && sirs >= 2) alerts.push({ cls: 'alert-low', txt: '🟡 <strong>SIRS = ' + sirs + '/4:</strong> Có đáp ứng viêm hệ thống. Tìm nguồn nhiễm khuẩn, xét nghiệm CRP, PCT, cấy máu nếu sốt.' });

  if (shockIdx >= 1.0) alerts.push({ cls: 'alert-crit', txt: '🔴 <strong>Shock Index = ' + shockIdx.toFixed(2) + ' ≥ 1.0 (Sốc nặng):</strong> Nguy cơ tưới máu mô suy giảm nghiêm trọng. Bù dịch cấp cứu và đánh giá vận mạch.' });
  else if (shockIdx >= 0.8) alerts.push({ cls: 'alert-mid', txt: '⚠️ <strong>Shock Index = ' + shockIdx.toFixed(2) + ' (Cao):</strong> Theo dõi sát huyết động.' });

  if (alerts.length === 0) alerts.push({ cls: 'alert-ok', txt: '✅ <strong>Chưa ghi nhận bất thường sinh lý đáng kể.</strong> Tiếp tục theo dõi sát lâm sàng.' });

  const container = document.getElementById('alert-container');
  if (container) {
    container.innerHTML = alerts.map(a => `<div class="sepsis-alert-item ${a.cls}">${a.txt}</div>`).join('');
  }
}

function updateTile(
  tileId: string,
  valId: string,
  lblId: string,
  score: number,
  rules: { max: number; cls: string; lbl: string }[]
): void {
  const tile = document.getElementById(tileId);
  const valEl = document.getElementById(valId);
  const lblEl = document.getElementById(lblId);
  if (valEl) valEl.textContent = score.toString();
  if (!tile) return;
  tile.className = 'score-tile';
  for (let i = 0; i < rules.length; i++) {
    if (score <= rules[i].max) {
      tile.classList.add(rules[i].cls);
      if (lblEl) lblEl.textContent = rules[i].lbl;
      return;
    }
  }
}

export function resetSepsisForm(): void {
  setVal('vit-hr', 80);
  setVal('vit-sbp', 120);
  setVal('vit-rr', 16);
  setVal('vit-temp', 37.0);
  setVal('vit-spo2', 98);
  setSel('vit-spo2-scale', '1');
  setSel('vit-oxygen', '0');
  setSel('vit-acvpu', '0');
  ['sofa-resp', 'sofa-coag', 'sofa-liver', 'sofa-cardio', 'sofa-cns', 'sofa-renal'].forEach(id => {
    setSel(id, '0');
  });
  [
    'meds-terminal', 'meds-age65', 'meds-lri', 'meds-nursing', 'meds-bands', 'sirs-wbc-abn', 'sepsis3-lactate',
    'bun-lactate', 'bun-culture', 'bun-abx', 'bun-fluid', 'bun-vaso'
  ].forEach(id => {
    setChk(id, false);
  });
  calculateAll();
}

export function initSepsisStudio(): void {
  const grid = document.getElementById('presetGrid');
  if (grid) {
    grid.innerHTML = '';
    SCENARIOS.forEach(sc => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sepsis-sc-btn ' + sc.cls;
      btn.innerHTML = `<div class="sc-title">${sc.title}</div><div class="sc-desc">${sc.desc}</div>`;
      btn.addEventListener('click', () => { loadScenario(sc.d); });
      grid.appendChild(btn);
    });
  }

  const allInputs = document.querySelectorAll(
    '.sepsis-input, .sepsis-select, #meds-terminal, #meds-age65, #meds-lri, #meds-nursing, #meds-bands, #sirs-wbc-abn, #sepsis3-lactate'
  );
  allInputs.forEach(el => {
    el.addEventListener('input', calculateAll);
    el.addEventListener('change', calculateAll);
  });

  const btnReset = document.getElementById('btn-clear-all');
  if (btnReset) btnReset.addEventListener('click', resetSepsisForm);

  calculateAll();
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.calculateSepsisAll = calculateAll;
  win.loadSepsisScenario = loadScenario;
  win.resetSepsisForm = resetSepsisForm;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSepsisStudio);
  } else {
    initSepsisStudio();
  }
}
