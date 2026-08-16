/**
 * CliniPortal — Vancomycin Pharmacokinetics (PK/PD) & AUC-Guided Dosing Studio (TypeScript Module)
 */

export interface WeightsData {
  ibw: number;
  adjbw: number;
  isObese: boolean;
  bmi: number;
  bsa: number;
}

export interface PKParams {
  dose: number;
  tau: number;
  tinf: number;
  cPeak: number;
  tPeak: number;
  cTrough: number;
  tTrough: number;
}

export interface PKResult {
  ke: number;
  thalf: number;
  Vd: number;
  Cl: number;
  calcAUC: number;
  cMax: number;
  cMin: number;
  error: string | null;
}

export interface RegimenPrediction {
  predictedAUC: number;
  predictedTrough: number;
}

export class VancomycinPKCore {
  static calculateWeights(weight: number, height: number, gender: string): WeightsData {
    if (!height || height <= 0) return { ibw: weight, adjbw: weight, isObese: false, bmi: 0, bsa: 0 };
    
    let ibw = gender === 'male' ? 50 + 0.91 * (height - 152.4) : 45.5 + 0.91 * (height - 152.4);
    ibw = Math.max(ibw, 1);
    ibw = Math.round(ibw * 10) / 10;
    
    const isObese = weight > 1.2 * ibw;
    const adjbw = isObese ? Math.round((ibw + 0.4 * (weight - ibw)) * 10) / 10 : weight;
    const bmi = Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10;
    const bsa = Math.round(Math.sqrt((height * weight) / 3600) * 100) / 100;
    
    return { ibw, adjbw, isObese, bmi, bsa };
  }

  static calculateCrCl(age: number, weight: number, scr: number, gender: string): number | null {
    if (!age || !weight || !scr || scr <= 0) return null;
    const adjScr = (age >= 65 && scr < 0.7) ? 0.7 : scr;
    const crcl = Math.max(Math.round(((140 - age) * weight) / (72 * adjScr) * (gender === 'female' ? 0.85 : 1)), 1);
    return crcl;
  }

  static calculatePK(params: PKParams): PKResult {
    const { dose, tau, tinf, cPeak, tPeak, cTrough, tTrough } = params;
    
    const tD = tau - tinf - tPeak - tTrough;
    if (tD <= 0) return { ke: 0, thalf: 0, Vd: 0, Cl: 0, calcAUC: 0, cMax: 0, cMin: 0, error: "Thời gian lấy mẫu không hợp lệ so với khoảng cách liều (tau)." };
    if (cPeak <= cTrough) return { ke: 0, thalf: 0, Vd: 0, Cl: 0, calcAUC: 0, cMax: 0, cMin: 0, error: "C-peak phải lớn hơn C-trough." };

    const ke = Math.log(cPeak / cTrough) / tD;
    const thalf = Math.log(2) / ke;
    
    const cMax = cPeak * Math.exp(ke * tPeak);
    const cMin = cTrough * Math.exp(-ke * tTrough);
    
    const Vd = (dose * (1 - Math.exp(-ke * tinf))) / (tinf * ke * (cMax - cMin * Math.exp(-ke * tinf)));
    const Cl = ke * Vd;
    
    const aT = ((cMax + cMin) * tinf) / 2 + (cMax - cMin) / ke;
    const n = 24 / tau;
    const calcAUC = aT * n;
    
    return { ke, thalf, Vd, Cl, calcAUC, cMax, cMin, error: null };
  }

  static predictRegimen(targetDosePerInterval: number, interval: number, ke: number, Vd: number, tinf: number = 1.0): RegimenPrediction {
    const cMaxPred = (targetDosePerInterval * (1 - Math.exp(-ke * tinf))) / (tinf * ke * Vd * (1 - Math.exp(-ke * interval)));
    const cMinPred = cMaxPred * Math.exp(-ke * (interval - tinf));
    
    const n = 24 / interval;
    const aT = ((cMaxPred + cMinPred) * tinf) / 2 + (cMaxPred - cMinPred) / ke;
    const predictedAUC = aT * n;
    
    return { predictedAUC, predictedTrough: cMinPred };
  }
}

// ── UI CONTROLLER & STATE ──
let currentMainTab: string = 'empiric';
let currentSubTab: string = 'intermittent';
let currentMethod: string = 'pk';
let currentScenario: string = 'adult';

export interface VanPatientState {
  age: number;
  gender: string;
  weight: number;
  height: number;
  scr: number;
  scrUnit: string;
  ibw: number;
  adjbw: number;
  bsa: number;
  crcl: number | null;
  isObese: boolean;
  calcWeight: number;
}

let patient: VanPatientState = {
  age: 0, gender: 'male', weight: 0, height: 0, scr: 0, scrUnit: 'mgdl',
  ibw: 0, adjbw: 0, bsa: 0, crcl: null, isObese: false, calcWeight: 0
};

export function toggleObese(): void {
  const c = (document.getElementById('prof-obese') as HTMLInputElement)?.checked;
  const hRow = document.getElementById('height-row');
  if (hRow) hRow.style.display = c ? 'block' : 'none';
  onPatientChange();
}

export function onPatientChange(): void {
  const age = parseInt((document.getElementById('prof-age') as HTMLInputElement)?.value, 10) || 0;
  const gender = (document.getElementById('prof-gender') as HTMLSelectElement)?.value || 'male';
  const weight = parseFloat((document.getElementById('prof-weight') as HTMLInputElement)?.value) || 0;
  const scrVal = parseFloat((document.getElementById('prof-scr') as HTMLInputElement)?.value) || 0;
  const scrUnit = (document.getElementById('prof-scr-unit') as HTMLSelectElement)?.value || 'mgdl';
  const obese = (document.getElementById('prof-obese') as HTMLInputElement)?.checked || false;
  const height = parseFloat((document.getElementById('prof-height') as HTMLInputElement)?.value) || 0;
  
  const crclEl = document.getElementById('crcl-display') as HTMLInputElement | null;
  const metEl = document.getElementById('metrics-panel');

  if (age <= 0 || weight <= 0 || scrVal <= 0) {
    if (crclEl) {
      crclEl.value = '—';
      crclEl.className = 'input-readonly';
    }
    if (metEl) metEl.style.display = 'none';
    patient = { age, gender, weight, height, scr: scrVal, scrUnit, ibw: weight, adjbw: weight, bsa: 0, crcl: null, isObese: false, calcWeight: weight };
    triggerCalc();
    return;
  }

  if (obese && height <= 0) {
    if (crclEl) crclEl.value = '—';
    if (metEl) metEl.style.display = 'none';
    patient.crcl = null;
    triggerCalc();
    return;
  }

  const wData = VancomycinPKCore.calculateWeights(weight, obese ? height : 0, gender);
  const scrMgdl = scrUnit === 'umoll' ? scrVal / 88.4 : scrVal;
  
  if (obese && height > 0) {
    const mIbw = document.getElementById('m-ibw');
    const mAdjbw = document.getElementById('m-adjbw');
    const mBsa = document.getElementById('m-bsa');
    const mStatus = document.getElementById('m-status');
    if (mIbw) mIbw.textContent = wData.ibw.toString();
    if (mAdjbw) mAdjbw.textContent = wData.isObese ? wData.adjbw.toString() : 'N/A';
    if (mBsa) mBsa.textContent = wData.bsa.toString();
    if (mStatus) mStatus.textContent = wData.isObese ? 'Béo phì' : (weight < wData.ibw ? 'Nhẹ cân' : 'Bình thường');
    if (metEl) metEl.style.display = 'block';
  } else {
    if (metEl) metEl.style.display = 'none';
  }
  
  const calcW = (obese && wData.isObese) ? wData.adjbw : weight;
  const crcl = VancomycinPKCore.calculateCrCl(age, calcW, scrMgdl, gender);
  
  if (crclEl) {
    crclEl.value = crcl?.toString() || '—';
    crclEl.className = 'input-readonly ' + (crcl && crcl >= 60 ? 'crcl-ok' : (crcl && crcl >= 30 ? 'crcl-mod' : 'crcl-severe'));
  }
  
  patient = { age, gender, weight, height, scr: scrVal, scrUnit, ibw: wData.ibw, adjbw: wData.adjbw, bsa: wData.bsa, crcl, isObese: wData.isObese, calcWeight: calcW };
  triggerCalc();
}

export function switchMainTab(tabId: string, btn: HTMLElement): void {
  currentMainTab = tabId;
  document.querySelectorAll('.van-tab-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');

  const st = document.getElementById('vanSubtabs');
  const bp = document.getElementById('btnPrint');

  if (tabId === 'empiric') {
    if (st) st.classList.remove('visible');
    if (bp) bp.style.display = 'none';
    showTabContent('tc-empiric');
    setResultHeader('Kết quả Liều ban đầu', 'Empiric Dosing — Vancomycin');
    const pkRep = document.getElementById('pkReport');
    const regBox = document.getElementById('regimenBox');
    const aGauge = document.getElementById('aucGauge');
    if (pkRep) pkRep.style.display = 'none';
    if (regBox) regBox.style.display = 'none';
    if (aGauge) aGauge.style.display = 'none';
    setGuide('empiric');
    runEmpiric();
  } else {
    if (st) st.classList.add('visible');
    if (bp) bp.style.display = 'flex';
    const as = document.querySelector('.van-subtab-btn.active') as HTMLElement | null;
    if (as) as.click();
  }
}

export function switchSubTab(tabId: string, btn: HTMLElement): void {
  currentSubTab = tabId;
  document.querySelectorAll('.van-subtab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  showTabContent('tc-' + tabId);

  const pkRep = document.getElementById('pkReport');
  const regBox = document.getElementById('regimenBox');
  const aGauge = document.getElementById('aucGauge');
  if (pkRep) pkRep.style.display = 'none';
  if (regBox) regBox.style.display = 'none';
  if (aGauge) aGauge.style.display = 'none';

  if (tabId === 'intermittent') {
    setResultHeader('Hiệu chỉnh liều — Ngắt quãng', 'AUC-based Dosing Adjustment');
    setGuide('intermittent');
    runIntermittent();
  } else if (tabId === 'civ') {
    setResultHeader('Hiệu chỉnh liều — CIV', 'Continuous Infusion Vancomycin');
    setGuide('civ');
    runCIV();
  } else if (tabId === 'ihd') {
    setResultHeader('Liều bù sau lọc máu', 'IHD Supplementary Dose');
    setGuide('ihd');
    runIHD();
  } else if (tabId === 'opat') {
    setResultHeader('Đích nồng độ Ngoại trú', 'OPAT Trough Target');
    setGuide('opat');
    runOPAT();
  }
}

export function showTabContent(id: string): void {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

export function setResultHeader(t: string, s: string): void {
  const rcTitle = document.getElementById('rcTitle');
  const rcSub = document.getElementById('rcSubtitle');
  if (rcTitle) rcTitle.textContent = t;
  if (rcSub) rcSub.textContent = s;
}

export function setMethod(m: string, btn: HTMLElement): void {
  currentMethod = m;
  document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const fPk = document.getElementById('fields-pk');
  const fDir = document.getElementById('fields-direct');
  if (fPk) fPk.style.display = m === 'pk' ? 'block' : 'none';
  if (fDir) fDir.style.display = m === 'direct' ? 'block' : 'none';
  runIntermittent();
}

export function selectScenario(sc: string, btn: HTMLElement): void {
  currentScenario = sc;
  document.querySelectorAll('.sc-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  runEmpiric();
}

export function roundDose(d: number, step: number = 250): number {
  return Math.max(250, Math.round(d / step) * step);
}

export function setStatus(text: string, cls: string): void {
  const el = document.getElementById('rcStatus');
  if (!el) return;
  el.innerHTML = text;
  el.className = 'vrc-status ' + cls;
}

export function setMainResult(html: string): void {
  const el = document.getElementById('mainResult');
  if (el) el.innerHTML = html;
}

export function clearAlerts(): void {
  const el = document.getElementById('alertsArea');
  if (el) el.innerHTML = '';
}

export function addAlert(type: string, icon: string, title: string, body: string): void {
  const el = document.getElementById('alertsArea');
  if (el) {
    el.innerHTML += `<div class="van-alert a-${type}"><i class="fa-solid ${icon} van-alert-icon"></i><div class="van-alert-content"><h4>${title}</h4><p>${body}</p></div></div>`;
  }
}

export function updateAUCGauge(auc: number): void {
  const aucGauge = document.getElementById('aucGauge');
  if (aucGauge) aucGauge.style.display = 'block';
  const pct = Math.min(Math.max((auc / 1000) * 100, 0), 100);
  const ptr = document.getElementById('aucPointer');
  if (ptr) {
    ptr.style.left = pct + '%';
    const col = auc < 400 ? 'var(--van-amber)' : (auc > 600 ? 'var(--van-red)' : 'var(--van-green)');
    ptr.style.background = col;
  }
  const gVal = document.getElementById('aucGaugeVal');
  if (gVal) {
    const col = auc < 400 ? 'var(--van-amber)' : (auc > 600 ? 'var(--van-red)' : 'var(--van-green)');
    gVal.innerHTML = `<span style="color:${col};font-weight:800">${Math.round(auc)} mg.h/L</span> — ` + (auc < 400 ? 'Dưới đích (<400)' : (auc > 600 ? 'Vượt đích (>600)' : 'Trong khoảng đích (400-600)'));
  }
}

export function triggerCalc(): void {
  if (currentMainTab === 'empiric') runEmpiric();
  else if (currentSubTab === 'intermittent') runIntermittent();
  else if (currentSubTab === 'civ') runCIV();
  else if (currentSubTab === 'ihd') runIHD();
  else runOPAT();
}

export function runEmpiric(): void {
  clearAlerts();
  ['pkReport', 'regimenBox', 'aucGauge'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const w = patient.weight;
  const crcl = patient.crcl;
  const sc = currentScenario;

  if (!w || w <= 0) {
    setMainResult('<div class="vrc-placeholder"><i class="fa-solid fa-user-plus"></i><span>Vui lòng nhập thông tin bệnh nhân<br>(đặc biệt Cân nặng)</span></div>');
    setStatus('<i class="fa-solid fa-circle-dot"></i> Chưa đủ thông tin', '');
    return;
  }

  let tau = 12;
  let dbl = false;
  if (crcl !== null) {
    if (crcl >= 90) tau = 8;
    else if (crcl >= 50) tau = 12;
    else if (crcl >= 30) tau = 24;
    else if (crcl >= 20) tau = 48;
    else dbl = true;
  }

  if (sc === 'adult') {
    const ld = roundDose(Math.min(25 * w, 3000));
    if (dbl) {
      setMainResult(`<div class="vrc-dose-label">Liều nạp (Loading Dose)</div><div class="vrc-dose-val">${ld} mg</div><div class="vrc-dose-sub">Truyền IV — Sau đó chỉnh liều theo nồng độ đo được</div><div style="margin-top:10px;padding:9px;background:var(--van-red-h);border:1px solid var(--van-red-b);border-radius:8px;color:var(--van-red);font-size:.77rem;font-weight:700"><i class="fa-solid fa-triangle-exclamation"></i> CrCl &lt; 20 mL/min — Không thể tính liều duy trì theo công thức</div>`);
      setStatus('<i class="fa-solid fa-triangle-exclamation"></i> CẦN CHỈNH LIỀU THEO NỒNG ĐỘ', 's-danger');
      addAlert('danger', 'fa-kidney', 'Suy thận nặng — Dose-by-level', `CrCl = ${crcl} mL/min. Nguy cơ tích lũy thuốc rất cao. Cho liều nạp ${ld} mg, đo nồng độ đáy mỗi 24h để quyết định có cho liều tiếp không.`);
    } else {
      const md = roundDose(15 * w);
      setMainResult(`<div class="vrc-dose-label">Liều nạp (Loading Dose)</div><div class="vrc-dose-val">${ld} mg</div><div class="vrc-dose-sub" style="margin-bottom:10px">Truyền IV — Một lần duy nhất</div><hr style="border:none;border-top:1px solid var(--color-divider);margin:10px 0"><div class="vrc-dose-label">Liều duy trì (Maintenance)</div><div class="vrc-dose-val" style="font-size:1.5rem">${md} mg mỗi ${tau}h</div><div class="vrc-dose-sub">= ${md * (24 / tau)} mg/ngày — TBW ${w} kg, CrCl ${crcl || '?'} mL/min</div>`);
      if (crcl === null) {
        setStatus('<i class="fa-solid fa-circle-question"></i> Thiếu dữ liệu Creatinin', 's-info');
        addAlert('warn', 'fa-triangle-exclamation', 'Không tính được CrCl', 'Thiếu Creatinin huyết thanh. Khoảng cách Q12H mặc định. Bổ sung Scr để tối ưu phác đồ.');
      } else if (crcl < 50) {
        setStatus(`<i class="fa-solid fa-hourglass-half"></i> KHOẢNG LIỀU KÉO DÀI (CrCl ${crcl} mL/min)`, 's-warn');
        addAlert('warn', 'fa-triangle-exclamation', `Suy thận mức độ vừa (CrCl = ${crcl} mL/min)`, `Khoảng cách liều kéo dài Q${tau}H để giảm tích lũy. Theo dõi nồng độ sau 2-3 liều.`);
      } else {
        setStatus('<i class="fa-solid fa-circle-check"></i> Phác đồ Empiric gợi ý', 's-ok');
        addAlert('ok', 'fa-circle-check', 'Chức năng thận bình thường', `CrCl = ${crcl} mL/min — Khoảng cách Q${tau}H phù hợp. Đo nồng độ đáy trước liều thứ 3-4.`);
      }
    }
  } else if (sc === 'obese') {
    if (!patient.adjbw || patient.adjbw <= 0) {
      setMainResult('<div class="vrc-placeholder"><i class="fa-solid fa-weight-scale"></i><span>Bật checkbox béo phì và nhập chiều cao<br>để tính AdjBW cho phác đồ béo phì</span></div>');
      setStatus('<i class="fa-solid fa-circle-dot"></i> Cần nhập chiều cao', 's-warn');
      return;
    }
    const ab = patient.adjbw;
    const ld2 = roundDose(Math.min(20 * w, 3000));
    const md2 = roundDose(Math.min(15 * ab, 4500 / (24 / tau)));
    setMainResult(`<div class="vrc-dose-label">Liều nạp — Theo TBW ${w} kg</div><div class="vrc-dose-val">${ld2} mg</div><div class="vrc-dose-sub" style="margin-bottom:10px">Truyền IV — 20 mg/kg TBW (tối đa 3000 mg)</div><hr style="border:none;border-top:1px solid var(--color-divider);margin:10px 0"><div class="vrc-dose-label">Liều duy trì — Theo AdjBW ${ab} kg</div><div class="vrc-dose-val" style="font-size:1.5rem">${md2} mg mỗi ${tau}h</div><div class="vrc-dose-sub">= ${md2 * (24 / tau)} mg/ngày</div>`);
    setStatus('<i class="fa-solid fa-person-walking"></i> PHÁC ĐỒ BÉO PHÌ (TBW + AdjBW)', 's-warn');
    addAlert('info', 'fa-circle-info', 'Hiệu chỉnh cân nặng béo phì', `Nạp theo TBW ${w} kg để đạt nồng độ điều trị nhanh. Duy trì theo AdjBW ${ab} kg (IBW ${patient.ibw} kg + 40% thặng dư).`);
  } else if (sc === 'child') {
    const sd = roundDose((60 * w) / 4, 50);
    setMainResult(`<div class="vrc-dose-label">Liều duy trì — Nhi khoa Q6H</div><div class="vrc-dose-val">${sd} mg</div><div class="vrc-dose-sub">= mỗi 6 giờ (Q6H) = ${sd * 4} mg/ngày<br>Tính: 60 mg/kg/ngày : 4 liều — Cân nặng ${w} kg</div>`);
    setStatus('<i class="fa-solid fa-child"></i> LIỀU PHÁP NHI KHOA (Q6H)', 's-info');
    addAlert('info', 'fa-circle-info', 'Lưu ý dược động học nhi khoa', 'Trẻ em (3 tháng – < 12 tuổi) có thể tích phân bố và lọc cầu thận cao hơn người lớn, cần Q6H. Kiểm tra nồng độ đáy sau 48h.');
  } else if (sc === 'civ') {
    const ld3 = roundDose(15 * w);
    const cr = roundDose(30 * w, 250);
    setMainResult(`<div class="vrc-dose-label">Liều nạp (Loading Dose)</div><div class="vrc-dose-val">${ld3} mg</div><div class="vrc-dose-sub" style="margin-bottom:10px">Truyền IV trong 1-2 giờ — Trước khi bắt đầu CIV</div><hr style="border:none;border-top:1px solid var(--color-divider);margin:10px 0"><div class="vrc-dose-label">Tốc độ CIV ban đầu</div><div class="vrc-dose-val" style="font-size:1.5rem">${cr} mg/24h</div><div class="vrc-dose-sub">= ${Math.round(cr / 24)} mg/giờ — Đích Css = 20-25 mg/L</div>`);
    setStatus('<i class="fa-solid fa-arrows-spin"></i> CIV — TRUYỀN LIÊN TỤC', 's-info');
    addAlert('info', 'fa-circle-info', 'Phác đồ truyền liên tục (CIV)', 'Đích Css = 20-25 mg/L tương đương AUC = 480-600 mg.h/L. Đo Css ngẫu nhiên sau 24h truyền ổn định để hiệu chỉnh tốc độ.');
  }
}

export function runIntermittent(): void {
  clearAlerts();
  const regBox = document.getElementById('regimenBox');
  if (regBox) regBox.style.display = 'none';

  const dose = parseFloat((document.getElementById('int-dose') as HTMLInputElement)?.value);
  const tau = parseInt((document.getElementById('int-interval') as HTMLSelectElement)?.value, 10);
  const aucTarget = parseFloat((document.getElementById('int-auc-target') as HTMLInputElement)?.value);
  const w = patient.weight;

  if (!dose || !tau || !w || w <= 0) {
    setMainResult('<div class="vrc-placeholder"><i class="fa-solid fa-sliders"></i><span>Nhập đầy đủ thông tin bệnh nhân<br>và phác đồ hiện tại</span></div>');
    setStatus('<i class="fa-solid fa-circle-dot"></i> Chưa đủ thông tin', '');
    const pkR = document.getElementById('pkReport');
    const aG = document.getElementById('aucGauge');
    if (pkR) pkR.style.display = 'none';
    if (aG) aG.style.display = 'none';
    return;
  }

  const n = 24 / tau;
  const tdd = dose * n;
  let calcAUC = 0, ke = 0, Vd = 0, Cl = 0, tHalf = 0;
  const pkR = document.getElementById('pkReport');

  if (currentMethod === 'direct') {
    calcAUC = parseFloat((document.getElementById('int-auc-calc') as HTMLInputElement)?.value) || 0;
    if (pkR) pkR.style.display = 'none';
    if (!calcAUC) {
      setMainResult('<div class="vrc-placeholder"><span>Nhập AUC 24h hiện tại để tiếp tục</span></div>');
      setStatus('', '');
      const aG = document.getElementById('aucGauge');
      if (aG) aG.style.display = 'none';
      return;
    }
  } else {
    const cP = parseFloat((document.getElementById('int-cpeak') as HTMLInputElement)?.value);
    const tP = parseFloat((document.getElementById('int-t-peak') as HTMLInputElement)?.value);
    const cT = parseFloat((document.getElementById('int-ctrough') as HTMLInputElement)?.value);
    const tT = parseFloat((document.getElementById('int-t-trough') as HTMLInputElement)?.value);
    const tI = parseFloat((document.getElementById('int-tinf') as HTMLInputElement)?.value);

    if (!cP || !cT || isNaN(tP) || isNaN(tT) || !tI) {
      setMainResult('<div class="vrc-placeholder"><span>Nhập nồng độ Đỉnh/Đáy và thời gian lấy mẫu</span></div>');
      if (pkR) pkR.style.display = 'none';
      const aG = document.getElementById('aucGauge');
      if (aG) aG.style.display = 'none';
      return;
    }

    if (cP <= cT) {
      setMainResult('<div class="vrc-placeholder" style="color:var(--van-red)"><i class="fa-solid fa-triangle-exclamation"></i><span>C-peak phải lớn hơn C-trough</span></div>');
      if (pkR) pkR.style.display = 'none';
      const aG = document.getElementById('aucGauge');
      if (aG) aG.style.display = 'none';
      return;
    }

    const pkParams: PKParams = { dose, tau, tinf: tI, cPeak: cP, tPeak: tP, cTrough: cT, tTrough: tT };
    const pkRes = VancomycinPKCore.calculatePK(pkParams);
    if (pkRes.error) {
      setMainResult(`<div class="vrc-placeholder" style="color:var(--van-red)"><i class="fa-solid fa-triangle-exclamation"></i><span>${pkRes.error}</span></div>`);
      if (pkR) pkR.style.display = 'none';
      const aG = document.getElementById('aucGauge');
      if (aG) aG.style.display = 'none';
      return;
    }

    ke = pkRes.ke; Vd = pkRes.Vd; Cl = pkRes.Cl; tHalf = pkRes.thalf; calcAUC = pkRes.calcAUC;

    const setPkText = (id: string, text: string) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setPkText('pk-ke', ke.toFixed(4));
    setPkText('pk-thalf', tHalf.toFixed(1));
    setPkText('pk-vd', Vd.toFixed(1));
    setPkText('pk-vd-kg', (Vd / w).toFixed(2));
    setPkText('pk-cl', Cl.toFixed(2));
    setPkText('pk-cl-ml', Math.round((Cl * 1000) / 60).toString());
    setPkText('pk-auc', Math.round(calcAUC).toString());
    setPkText('pk-auc-mic', Math.round(calcAUC).toString());

    if (pkR) pkR.style.display = 'block';
  }

  updateAUCGauge(calcAUC);
  const nTDD = tdd * (aucTarget / calcAUC);
  const nD = roundDose(nTDD / n);
  const aTDD = nD * n;
  const delta = aTDD - tdd;

  setMainResult(`<div class="vrc-dose-label">Liều đề xuất mới</div><div class="vrc-dose-val">${nD} mg mỗi ${tau}h</div><div class="vrc-dose-sub">TDD mới: ${aTDD} mg/ngày (${delta > 0 ? '+' : ''}${delta} mg so với cũ)<br>AUC hiện tại: ${Math.round(calcAUC)} → Đích: ${aucTarget} mg.h/L</div>`);

  if (calcAUC > 600) {
    setStatus('<i class="fa-solid fa-circle-radiation"></i> AUC VƯỢT ĐÍCH — NGUY CƠ ĐỘC TÍNH', 's-danger');
    addAlert('danger', 'fa-kidney', `AUC vượt đích (${Math.round(calcAUC)} > 600)`, `Nguy cơ AKI tăng đáng kể. Cần GIẢM liều về ${nD} mg Q${tau}H. Theo dõi SCr và nước tiểu.`);
  } else if (calcAUC < 400) {
    setStatus('<i class="fa-solid fa-arrow-trend-down"></i> AUC DƯỚI ĐÍCH — NGUY CƠ THẤT BẠI', 's-warn');
    addAlert('warn', 'fa-triangle-exclamation', `AUC dưới đích (${Math.round(calcAUC)} < 400)`, `Nguy cơ thất bại điều trị. Cần Tăng liều lên ${nD} mg Q${tau}H. Đo lại nồng độ sau 3-4 liều.`);
  } else {
    setStatus('<i class="fa-solid fa-circle-check"></i> AUC TRONG KHOẢNG ĐÍCH (400-600)', 's-ok');
    addAlert('ok', 'fa-circle-check', `AUC tối ưu (${Math.round(calcAUC)} mg.h/L)`, `Phác đồ đang đạt đích. Duy trì ${dose} mg Q${tau}H và kiểm tra lại nồng độ sau 3-5 ngày.`);
  }

  if (currentMethod === 'pk' && ke > 0 && Vd > 0) {
    const intv = [8, 12, 24];
    let tb = '';
    intv.forEach(t => {
      const ni = 24 / t;
      const rd = roundDose(nTDD / ni, 250);
      const pred = VancomycinPKCore.predictRegimen(rd, t, ke, Vd, 1.0);
      const aP = pred.predictedAUC;
      const cMn = pred.predictedTrough;
      const isOk = aP >= 400 && aP <= 600;
      const bC = isOk ? 'ok' : (aP > 600 ? 'danger' : 'warn');
      const bT = isOk ? 'Khuyên dùng' : (aP > 600 ? 'AUC cao' : 'AUC thấp');
      tb += `<tr><td><strong>${rd} mg</strong> Q${t}H</td><td>${Math.round(aP)}</td><td>${cMn.toFixed(1)}</td><td><span class="r-badge ${bC}">${bT}</span></td></tr>`;
    });
    const regBody = document.getElementById('regimenBody');
    if (regBody) regBody.innerHTML = tb;
    if (regBox) regBox.style.display = 'block';
  }
}

export function runCIV(): void {
  clearAlerts();
  ['pkReport', 'regimenBox', 'aucGauge'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const tdd = parseFloat((document.getElementById('civ-tdd') as HTMLInputElement)?.value);
  const css = parseFloat((document.getElementById('civ-css') as HTMLInputElement)?.value);
  const tg = parseFloat((document.getElementById('civ-target') as HTMLInputElement)?.value);

  if (!tdd || !css || !tg || css <= 0) {
    setMainResult('<div class="vrc-placeholder"><span>Nhập tổng liều 24h, Css đo được và Css đích</span></div>');
    setStatus('', '');
    return;
  }

  const nT = roundDose(tdd * (tg / css), 250);
  const dl = nT - tdd;
  setMainResult(`<div class="vrc-dose-label">Tốc độ CIV điều chỉnh</div><div class="vrc-dose-val">${nT} mg/24h</div><div class="vrc-dose-sub">= ${Math.round(nT / 24)} mg/giờ<br>Thay đổi: ${dl > 0 ? '+' : ''}${dl} mg/ngày so với phác đồ cũ<br>Css hiện tại: ${css} → Đích: ${tg} mg/L</div>`);

  if (css > 25) {
    setStatus('<i class="fa-solid fa-circle-radiation"></i> CSS QUÁ CAO — NGỬNG VÀ TÁI TITRATE', 's-danger');
    addAlert('danger', 'fa-circle-xmark', `Css vượt ngưỡng an toàn (${css} > 25 mg/L)`, `Nguy cơ AKI. TẠM NGỬNG truyền cho đến khi Css < 20 mg/L, sau đó khởi động lại: ${nT} mg/24h.`);
  } else if (css < 17) {
    setStatus('<i class="fa-solid fa-arrow-trend-up"></i> CSS DƯỚI ĐÍCH — TĂNG TỐC ĐỘ TRUYỀN', 's-warn');
    addAlert('warn', 'fa-triangle-exclamation', `Css chưa đạt đích (${css} < 17 mg/L)`, `Tăng tốc độ CIV lên ${nT} mg/24h. Cân nhắc cho thêm liều nạp bổ sung (5-10 mg/kg) nếu nhiễm khuẩn nặng.`);
  } else {
    setStatus('<i class="fa-solid fa-circle-check"></i> CSS TRONG KHOẢNG ĐÍCH', 's-ok');
    addAlert('ok', 'fa-circle-check', `Css tối ưu (${css} mg/L)`, `Duy trì tốc độ ${tdd} mg/24h. Kiểm tra Css mỗi 24-48h.`);
  }
}

export function runIHD(): void {
  clearAlerts();
  ['pkReport', 'regimenBox', 'aucGauge'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const pre = parseFloat((document.getElementById('ihd-pre') as HTMLInputElement)?.value);
  const tp = parseFloat((document.getElementById('ihd-target') as HTMLInputElement)?.value);
  const w = patient.weight;

  if (!pre || !tp || !w || w <= 0) {
    setMainResult('<div class="vrc-placeholder"><span>Nhập nồng độ trước lọc máu và cân nặng</span></div>');
    setStatus('', '');
    return;
  }

  const postEst = pre * 0.65;
  const supp = Math.max(0, (tp - postEst) * 0.7 * w);
  const sd = roundDose(supp, 250);
  const mpk = (sd / w).toFixed(1);

  setMainResult(`<div class="vrc-dose-label">Nồng độ ước tính sau lọc máu</div><div class="vrc-dose-val" style="font-size:1.4rem;color:var(--van-amber)">${postEst.toFixed(1)} mg/L</div><div class="vrc-dose-sub" style="margin-bottom:10px">Ước tính: ${pre} mg/L × (1 - 0.35)</div><hr style="border:none;border-top:1px solid var(--color-divider);margin:10px 0"><div class="vrc-dose-label">Liều bù (Supplementary Dose)</div><div class="vrc-dose-val">${sd} mg</div><div class="vrc-dose-sub">= ${mpk} mg/kg — TBW ${w} kg<br>Đích đạt sau bù: ~${tp} mg/L — Cho NGAY sau IHD</div>`);

  if (pre < 10) {
    setStatus('<i class="fa-solid fa-arrow-up"></i> CẦN BỔ SUNG LIỀU TRƯỚC KHI LỌC MÁU', 's-warn');
    addAlert('warn', 'fa-triangle-exclamation', `Nồng độ trước lọc thấp (${pre} mg/L)`, 'Nồng độ trước HD thấp hơn đích điều trị. Cân nhắc cho liều nạp trước khi lọc máu.');
  } else if (pre > 20) {
    setStatus('<i class="fa-solid fa-droplet-slash"></i> NỒNG ĐỘ CAO — THEO DÕI SAU LỌC', 's-info');
    addAlert('info', 'fa-circle-info', `Nồng độ trước lọc cao (${pre} mg/L)`, `Lọc máu sẽ làm giảm nồng độ xuống ~${postEst.toFixed(1)} mg/L. Nếu đạt đích sau lọc, có thể bỏ qua liều bù.`);
  } else {
    setStatus('<i class="fa-solid fa-circle-check"></i> LIỀU BÙ TÍNH TOÁN ĐẦY ĐỦ', 's-ok');
    addAlert('ok', 'fa-circle-check', 'Lịch trình điều trị hợp lý', `Cho ${sd} mg (${mpk} mg/kg) ngay sau IHD để phục hồi nồng độ về đích ${tp} mg/L.`);
  }
}

export function runOPAT(): void {
  clearAlerts();
  ['pkReport', 'regimenBox', 'aucGauge'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const tr = parseFloat((document.getElementById('opat-trough') as HTMLInputElement)?.value);
  const auc = parseFloat((document.getElementById('opat-auc') as HTMLInputElement)?.value);

  if (!tr || !auc) {
    setMainResult('<div class="vrc-placeholder"><span>Nhập nồng độ đáy và AUC nội viện</span></div>');
    setStatus('', '');
    return;
  }

  const ratio = auc / tr;
  const t4 = (400 / ratio).toFixed(1);
  const t6 = (600 / ratio).toFixed(1);
  const ac = auc < 400 ? 'Dưới đích' : (auc > 600 ? 'Vượt đích' : 'Đạt đích');
  const acol = auc < 400 ? 'var(--van-amber)' : (auc > 600 ? 'var(--van-red)' : 'var(--van-green)');

  setMainResult(`<div style="text-align:left;width:100%"><div class="vrc-dose-label">AUC nội viện: ${Math.round(auc)} mg.h/L — <span style="color:${acol}">${ac}</span></div><div style="margin:10px 0;font-size:.82rem;color:var(--color-text)"><strong>Tỉ lệ AUC/Ctrough</strong> ước tính: <span style="color:var(--van-blue);font-weight:800">${ratio.toFixed(1)}</span> mg.h/L per mg/L đáy</div><hr style="border:none;border-top:1px solid var(--color-divider);margin:10px 0"><div class="vrc-dose-label">Khoảng nồng độ đáy OPAT (AUC 400-600)</div><div class="vrc-dose-val" style="font-size:1.4rem">${t4} – ${t6} mg/L</div><div class="vrc-dose-sub">Nồng độ đáy ngoại trú trong khoảng này → AUC 400-600 mg.h/L<br>(Giả định chức năng thận ổn định sau xuất viện)</div></div>`);
  setStatus('<i class="fa-solid fa-house-medical-circle-check"></i> ĐÍCH NGOẠI TRÚ TỪ NỘI VIỆN', 's-purple');
  addAlert('info', 'fa-circle-info', 'Hướng dẫn theo dõi OPAT', `Đo nồng độ đáy mỗi 1-2 tuần ngoại trú. Dừng Vancomycin nếu SCr tăng > 0.5 mg/dL hoặc nồng độ đáy vượt ${t6} mg/L.`);
}

export function setGuide(tabId: string): void {
  const g: Record<string, string[]> = {
    empiric: [
      '<strong>Liều nạp (Loading dose):</strong> 20-25 mg/kg TBW (tối đa 3000 mg) — Cần thiết để đạt nhanh nồng độ điều trị.',
      '<strong>Liều duy trì:</strong> Hiệu chỉnh khoảng cách liều (Q8H-Q48H) theo CrCl để tránh tích lũy và độc tính thận.',
      '<strong>Thể trạng đặc biệt:</strong> Béo phì: nạp TBW, duy trì AdjBW. Nhi khoa: Q6H. CIV: Css 20-25 mg/L.',
      '<strong>Theo dõi:</strong> Đo nồng độ đáy trước liều thứ 3-4 ở trạng thái ổn định.'
    ],
    intermittent: [
      '<strong>Lấy mẫu Đỉnh:</strong> Ít nhất 1 giờ sau kết thúc truyền dịch.',
      '<strong>Lấy mẫu Đáy:</strong> 30 phút trước liều kế tiếp — đo ở trạng thái ổn định (sau 3-4 liều).',
      '<strong>Sawchuk-Zaske:</strong> Tính ke, t-half, Vd và Cl-vanc cá thể hóa từ 2 điểm nồng độ.',
      '<strong>Bảng so sánh:</strong> Dự đoán AUC và Ctrough với Q8H/Q12H/Q24H để chọn phác đồ tối ưu.'
    ],
    civ: [
      '<strong>Đích Css:</strong> 20-25 mg/L tương đương AUC ~480-600 mg.h/L.',
      '<strong>Ưu điểm CIV:</strong> Nồng độ ổn định hơn, ít độc tính đỉnh, thuận lợi cho suy thận nặng.',
      '<strong>Hiệu chỉnh:</strong> Liều mới = (Css-đích / Css-đo) x Liều cũ — Áp dụng ngay.',
      '<strong>Hold:</strong> Ngừng truyền nếu Css > 25 mg/L cho đến khi < 20 mg/L rồi giảm 20-30%.'
    ],
    ihd: [
      '<strong>Loại bỏ qua lọc:</strong> Màng high-flux loại bỏ 30-40% Vancomycin mỗi chu kỳ IHD 4 giờ.',
      '<strong>Thời điểm bù thuốc:</strong> Cho liều bổ sung ngay sau khi kết thúc chu kỳ IHD.',
      '<strong>Theo dõi:</strong> Đo nồng độ 2-3 ngày/lần ở bệnh nhân IHD.',
      '<strong>Tần suất:</strong> Bệnh nhân IHD 3 lần/tuần thường cần Vancomycin mỗi 48-72h.'
    ],
    opat: [
      '<strong>Giả định:</strong> Tỉ lệ AUC/Ctrough ổn định khi chức năng thận không đổi sau xuất viện.',
      '<strong>Theo dõi ngoại trú:</strong> Đo nồng độ đáy mỗi 1-2 tuần; SCr mỗi tuần đầu.',
      '<strong>Dừng thuốc khi:</strong> Ctrough > giới hạn trên OPAT, SCr tăng >= 0.5 mg/dL.',
      '<strong>Phối hợp:</strong> Dược sĩ lâm sàng OPAT cần theo dõi và hiệu chỉnh định kỳ.'
    ]
  };
  const items = g[tabId] || g.empiric;
  const guideList = document.getElementById('guideList');
  if (guideList && items) {
    guideList.innerHTML = items.map(i => `<li>${i}</li>`).join('');
  }
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.VancomycinPK = VancomycinPKCore;
  win.toggleObese = toggleObese;
  win.onPatientChange = onPatientChange;
  win.switchMainTab = switchMainTab;
  win.switchSubTab = switchSubTab;
  win.setMethod = setMethod;
  win.selectScenario = selectScenario;
  win.runEmpiric = runEmpiric;
  win.runIntermittent = runIntermittent;
  win.runCIV = runCIV;
  win.runIHD = runIHD;
  win.runOPAT = runOPAT;
}

export function initVancomycinStudio(): void {
  onPatientChange();
  setGuide('empiric');
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVancomycinStudio);
  } else {
    initVancomycinStudio();
  }
}
