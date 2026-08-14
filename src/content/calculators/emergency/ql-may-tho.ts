/**
 * CliniPortal — Mechanical Ventilation Studio & Waveform Simulator Engine (TypeScript Module)
 */

export interface VentCaseOption {
  text: string;
  correct: boolean;
}

export interface VentCaseData {
  title: string;
  qTitle: string;
  question: string;
  options: VentCaseOption[];
  explanation: string;
  action: () => void;
}

// ── STATE VARIABLES ──
let activeScenario: string = 'normal';
let isWaveformPaused: boolean = false;
let animFrameId: number | null = null;

let timeStep: number = 0;
let canvasWidth: number = 600;
let canvasHeight: number = 120;

let pBuffer: number[] = new Array(600).fill(5);
let qBuffer: number[] = new Array(600).fill(0);
let vBuffer: number[] = new Array(600).fill(0);
let cursorX: number = 0;

let cvsP: HTMLCanvasElement | null = null;
let cvsQ: HTMLCanvasElement | null = null;
let cvsV: HTMLCanvasElement | null = null;
let ctxP: CanvasRenderingContext2D | null = null;
let ctxQ: CanvasRenderingContext2D | null = null;
let ctxV: CanvasRenderingContext2D | null = null;

// ── 1. CANVAS ENGINE ──
export function initCanvases(): void {
  cvsP = document.getElementById('canvas-pressure') as HTMLCanvasElement | null;
  cvsQ = document.getElementById('canvas-flow') as HTMLCanvasElement | null;
  cvsV = document.getElementById('canvas-volume') as HTMLCanvasElement | null;

  if (!cvsP || !cvsQ || !cvsV) return;

  const parentLane = cvsP.parentElement;
  const w = parentLane ? parentLane.clientWidth : 600;
  const h = parentLane ? parentLane.clientHeight : 120;

  [cvsP, cvsQ, cvsV].forEach(cvs => {
    cvs.width = w > 0 ? w : 600;
    cvs.height = h > 0 ? h : 120;
  });

  canvasWidth = cvsP.width;
  canvasHeight = cvsP.height;

  if (pBuffer.length !== canvasWidth) {
    pBuffer = new Array(canvasWidth).fill(5);
    qBuffer = new Array(canvasWidth).fill(0);
    vBuffer = new Array(canvasWidth).fill(0);
    cursorX = 0;
  }

  ctxP = cvsP.getContext('2d');
  ctxQ = cvsQ.getContext('2d');
  ctxV = cvsV.getContext('2d');
}

export function toggleWaveformPause(): void {
  isWaveformPaused = !isWaveformPaused;
  const btn = document.getElementById('btn-toggle-pause');
  const icon = document.getElementById('icon-pause');
  const text = document.getElementById('text-pause');

  if (isWaveformPaused) {
    if (icon) icon.className = 'fa-solid fa-play';
    if (text) text.textContent = 'Tiếp Tục';
    if (btn) btn.style.background = '#0284c7';
  } else {
    if (icon) icon.className = 'fa-solid fa-pause';
    if (text) text.textContent = 'Tạm Dừng';
    if (btn) btn.style.background = '#1e293b';
  }
}

export function startWaveformLoop(): void {
  if (animFrameId) cancelAnimationFrame(animFrameId);

  function render(): void {
    if (!isWaveformPaused) {
      updateWaveformPhysics();
      drawCanvases();
    }
    animFrameId = requestAnimationFrame(render);
  }
  render();
}

export function updateWaveformPhysics(): void {
  const rr = parseFloat((document.getElementById('inp-rr') as HTMLInputElement)?.value) || 16;
  const vt = parseFloat((document.getElementById('inp-vt') as HTMLInputElement)?.value) || 420;
  const peep = parseFloat((document.getElementById('inp-peep') as HTMLInputElement)?.value) || 5;
  const pplat = parseFloat((document.getElementById('inp-pplat') as HTMLInputElement)?.value) || 22;
  const mode = (document.getElementById('inp-mode') as HTMLSelectElement)?.value || 'VCV';
  const autoPeep = parseFloat((document.getElementById('inp-autopeep') as HTMLInputElement)?.value) || 0;
  const raw = parseFloat((document.getElementById('inp-raw') as HTMLInputElement)?.value) || 5;
  const cstat = parseFloat((document.getElementById('inp-cstat') as HTMLInputElement)?.value) || 35;

  const cycleTime = 60 / rr;
  const ieVal = (document.getElementById('inp-ie') as HTMLSelectElement)?.value || '1:2';
  let ieRatio = 0.33;
  if (ieVal === '1:3') ieRatio = 0.25;
  else if (ieVal === '1:4') ieRatio = 0.20;
  else if (ieVal === '1:1.5') ieRatio = 0.40;
  else if (ieVal === '1:1') ieRatio = 0.50;

  const tInsp = cycleTime * ieRatio;
  const tExp = cycleTime - tInsp;

  const tInCycle = (timeStep * 0.03) % cycleTime;
  timeStep += 1;

  let curP = peep;
  let curQ = 0;
  let curV = 0;

  if (tInCycle < tInsp) {
    const progressInsp = tInCycle / tInsp;
    curV = vt * Math.sin((progressInsp * Math.PI) / 2);

    if (mode === 'PCV' || mode === 'PSV' || mode === 'CPAP') {
      curP = peep + (pplat - peep) * (1 - Math.exp(-progressInsp * 5));
      curQ = 60 * (1 - progressInsp * 0.8);
    } else {
      curQ = 50;
      curP = peep + (curV / cstat) + (curQ * raw) / 60;
    }
  } else {
    const tInExp = tInCycle - tInsp;
    const progressExp = tInExp / tExp;

    curV = vt * Math.exp(-progressExp * 4);
    curQ = -60 * Math.exp(-progressExp * 3);

    if (autoPeep > 0 && progressExp > 0.8) {
      curQ = -12 * (1 - progressExp);
    }

    curP = peep + autoPeep * (1 - progressExp);
  }

  if (pBuffer.length > 0) {
    pBuffer[cursorX] = curP;
    qBuffer[cursorX] = curQ;
    vBuffer[cursorX] = curV;
  }

  const elemP = document.getElementById('val-cur-p');
  const elemQ = document.getElementById('val-cur-q');
  const elemV = document.getElementById('val-cur-v');
  if (elemP) elemP.textContent = Math.round(curP).toString();
  if (elemQ) elemQ.textContent = Math.round(curQ).toString();
  if (elemV) elemV.textContent = Math.round(curV).toString();

  cursorX = (cursorX + 2) % canvasWidth;
}

export function drawCanvases(): void {
  drawSingleCanvas(ctxP, pBuffer, '#10b981', 0, 60);
  drawSingleCanvas(ctxQ, qBuffer, '#f59e0b', -80, 80);
  drawSingleCanvas(ctxV, vBuffer, '#06b6d4', 0, 900);
}

function drawSingleCanvas(ctx: CanvasRenderingContext2D | null, buffer: number[], color: string, minVal: number, maxVal: number): void {
  if (!ctx || !buffer || buffer.length === 0) return;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x < canvasWidth; x += 40) {
    ctx.moveTo(x, 0); ctx.lineTo(x, canvasHeight);
  }
  for (let y = 0; y < canvasHeight; y += 30) {
    ctx.moveTo(0, y); ctx.lineTo(canvasWidth, y);
  }
  ctx.stroke();

  if (minVal < 0) {
    const zeroY = canvasHeight - ((0 - minVal) / (maxVal - minVal)) * canvasHeight;
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.moveTo(0, zeroY); ctx.lineTo(canvasWidth, zeroY);
    ctx.stroke();
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();

  const len = Math.min(buffer.length, canvasWidth);
  for (let x = 0; x < len; x++) {
    const val = buffer[x] !== undefined ? (buffer[x] as number) : minVal;
    const normY = (val - minVal) / (maxVal - minVal);
    const y = canvasHeight - (normY * canvasHeight);

    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cursorX, 0, 3, canvasHeight);
}

// ── 2. CLINICAL CALCULATIONS & ADVISORY ──
export function calculateAll(): void {
  const genderElem = document.querySelector('input[name="gender"]:checked') as HTMLInputElement | null;
  const gender = genderElem ? genderElem.value : 'male';
  const height = parseFloat((document.getElementById('inp-height') as HTMLInputElement)?.value) || 165;
  const weight = parseFloat((document.getElementById('inp-weight') as HTMLInputElement)?.value) || 60;

  const mode = (document.getElementById('inp-mode') as HTMLSelectElement)?.value || 'VCV';
  const vt = parseFloat((document.getElementById('inp-vt') as HTMLInputElement)?.value) || 420;
  const rr = parseFloat((document.getElementById('inp-rr') as HTMLInputElement)?.value) || 16;
  const peep = parseFloat((document.getElementById('inp-peep') as HTMLInputElement)?.value) || 5;
  const pplat = parseFloat((document.getElementById('inp-pplat') as HTMLInputElement)?.value) || 22;
  const fio2 = parseFloat((document.getElementById('inp-fio2') as HTMLInputElement)?.value) || 40;
  const ph = parseFloat((document.getElementById('inp-ph') as HTMLInputElement)?.value) || 7.40;
  const paco2 = parseFloat((document.getElementById('inp-paco2') as HTMLInputElement)?.value) || 40;
  const spo2 = parseFloat((document.getElementById('inp-spo2') as HTMLInputElement)?.value) || 96;

  const heightInches = height / 2.54;
  let pbw = gender === 'male' ? 50 + 2.3 * (heightInches - 60) : 45.5 + 2.3 * (heightInches - 60);
  pbw = Math.max(30, pbw);

  const resPbw = document.getElementById('res-pbw');
  const tagPatient = document.getElementById('tag-patient-summary');
  if (resPbw) resPbw.textContent = pbw.toFixed(1) + ' kg';
  if (tagPatient) tagPatient.textContent = `${gender === 'male' ? 'Nam' : 'Nữ'}, ${height}cm | PBW: ${pbw.toFixed(1)} kg`;

  const vtPerKg = vt / pbw;
  const resVtPbw = document.getElementById('res-vt-pbw');
  const numVtPbwSub = document.getElementById('num-vt-pbw-sub');
  const numVt = document.getElementById('num-vt');
  if (resVtPbw) resVtPbw.textContent = vtPerKg.toFixed(1);
  if (numVtPbwSub) numVtPbwSub.textContent = `${vtPerKg.toFixed(1)} mL/kg PBW`;
  if (numVt) numVt.textContent = Math.round(vt).toString();

  const vtMinRatio = activeScenario === 'ards' ? 4 : 6;
  const vtMaxRatio = activeScenario === 'ards' ? 6 : 8;
  const vtMin = Math.round(pbw * vtMinRatio);
  const vtMax = Math.round(pbw * vtMaxRatio);

  const resVtTarget = document.getElementById('res-vt-target');
  const progLblMin = document.getElementById('prog-lbl-min');
  const progLblMax = document.getElementById('prog-lbl-max');
  if (resVtTarget) resVtTarget.textContent = `${vtMin} - ${vtMax} mL`;
  if (progLblMin) progLblMin.textContent = `${vtMin} mL (${vtMinRatio} mL/kg)`;
  if (progLblMax) progLblMax.textContent = `${vtMax} mL (${vtMaxRatio} mL/kg)`;

  let pct = 50;
  if (vtPerKg <= 3) pct = 0;
  else if (vtPerKg >= 10) pct = 100;
  else pct = ((vtPerKg - 3) / 7) * 100;
  const vtProgFill = document.getElementById('vt-progress-fill');
  if (vtProgFill) vtProgFill.style.width = pct + '%';

  const dp = pplat - peep;
  const resDp = document.getElementById('res-driving-p');
  const resPlatP = document.getElementById('res-plat-p');
  const numDp = document.getElementById('num-dp');
  const numPplat = document.getElementById('num-pplat');
  const numPeep = document.getElementById('num-peep');
  const numRr = document.getElementById('num-rr');
  const numFio2 = document.getElementById('num-fio2');
  const numSpo2 = document.getElementById('num-spo2');

  if (resDp) resDp.textContent = `${dp} cmH2O`;
  if (resPlatP) resPlatP.textContent = `${pplat} cmH2O`;
  if (numDp) numDp.textContent = dp.toString();
  if (numPplat) numPplat.textContent = pplat.toString();
  if (numPeep) numPeep.textContent = peep.toString();
  if (numRr) numRr.textContent = rr.toString();
  if (numFio2) numFio2.textContent = fio2.toString();
  if (numSpo2) numSpo2.textContent = spo2.toString();

  const mv = (vt * rr) / 1000;
  const numMv = document.getElementById('num-mv');
  if (numMv) numMv.textContent = mv.toFixed(1);

  const cstat = dp > 0 ? (vt / dp).toFixed(1) : '35.0';
  const numCstat = document.getElementById('num-cstat');
  const inpCstat = document.getElementById('inp-cstat') as HTMLInputElement | null;
  if (numCstat) numCstat.textContent = cstat;
  if (inpCstat) inpCstat.value = Math.round(parseFloat(cstat)).toString();

  const raw = parseFloat((document.getElementById('inp-raw') as HTMLInputElement)?.value) || 5;
  const ppeak = Math.round(pplat + (raw * 0.8));
  const numPip = document.getElementById('num-pip');
  if (numPip) numPip.textContent = ppeak.toString();

  let alertsHtml = '';
  if (pplat > 30) {
    alertsHtml += `<div class="ab ab-danger">
      <div class="ab-title"><i class="fa-solid fa-triangle-exclamation"></i> Pplateau NGUY HIỂM (${pplat} cmH2O)</div>
      <div>Vượt ngưỡng an toàn &le; 30 cmH2O. Giảm VT ngay từng bước 1 mL/kg PBW!</div>
    </div>`;
  }
  if (dp > 15) {
    alertsHtml += `<div class="ab ab-warn">
      <div class="ab-title"><i class="fa-solid fa-triangle-exclamation"></i> Driving Pressure Cao (ΔP = ${dp} cmH2O)</div>
      <div>Vượt mốc bảo vệ phổi &le; 15 cmH2O. Tăng nguy cơ tử vong ICU.</div>
    </div>`;
  }
  if (ph < 7.35 && paco2 > 45) {
    const newRR = Math.round((paco2 * rr) / 40);
    alertsHtml += `<div class="ab ab-warn">
      <div class="ab-title"><i class="fa-solid fa-lungs-virus"></i> TOAN HÔ HẤP (pH ${ph} | PaCO2 ${paco2})</div>
      <div>Khuyến nghị tăng RR từ ${rr} &rarr; <strong>${newRR} lần/phút</strong> để thải CO2.</div>
    </div>`;
  }

  const clinicalAlerts = document.getElementById('clinical-alerts');
  if (clinicalAlerts) {
    clinicalAlerts.innerHTML = alertsHtml || `<div class="ab ab-ok">
      <div class="ab-title"><i class="fa-solid fa-circle-check"></i> Thông Số Bảo Vệ Phổi Tối Ưu</div>
      <div>Cơ học phổi &amp; Khí máu động mạch hiện ở trong ngưỡng an toàn.</div>
    </div>`;
  }
}

export function toggleModeInputs(): void {
  const mode = (document.getElementById('inp-mode') as HTMLSelectElement)?.value || 'VCV';
  const tag = document.getElementById('tag-current-mode');

  if (tag) {
    tag.textContent = `${mode} Mode`;
    if (mode === 'VCV') tag.className = 'vent-status-tag tag-vcv';
    else if (mode === 'PCV') tag.className = 'vent-status-tag tag-pcv';
    else if (mode === 'PSV') tag.className = 'vent-status-tag tag-psv';
    else if (mode === 'SIMV') tag.className = 'vent-status-tag tag-simv';
    else tag.className = 'vent-status-tag tag-cpap';
  }

  calculateAll();
}

export function resetCalculator(): void {
  const genderM = document.getElementById('gender-m') as HTMLInputElement | null;
  if (genderM) genderM.checked = true;

  const setVal = (id: string, val: string) => {
    const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
    if (el) el.value = val;
  };

  setVal('inp-height', '165');
  setVal('inp-weight', '60');
  setVal('inp-mode', 'VCV');
  setVal('inp-vt', '420');
  setVal('inp-rr', '16');
  setVal('inp-peep', '5');
  setVal('inp-pplat', '22');
  setVal('inp-autopeep', '0');
  setVal('inp-raw', '5');
  setVal('inp-ie', '1:2');
  setVal('inp-ph', '7.40');
  setVal('inp-paco2', '40');
  setVal('inp-spo2', '96');

  toggleModeInputs();
  calculateAll();
}

export function resetAllStudio(): void {
  resetCalculator();
  const firstTab = document.querySelectorAll('.tab-btn')[0] as HTMLElement | undefined;
  if (firstTab) switchTab('tab-master-studio', firstTab);
  loadCaseStudy(1);
}

// ── 3. WEANING LOGIC ──
export function evaluateWeaning(): void {
  const c1 = (document.getElementById('wean-chk-1') as HTMLInputElement)?.checked;
  const c2 = (document.getElementById('wean-chk-2') as HTMLInputElement)?.checked;
  const c3 = (document.getElementById('wean-chk-3') as HTMLInputElement)?.checked;
  const c4 = (document.getElementById('wean-chk-4') as HTMLInputElement)?.checked;
  const c5 = (document.getElementById('wean-chk-5') as HTMLInputElement)?.checked;

  const box = document.getElementById('wean-readiness-status');
  if (!box) return;

  if (c1 && c2 && c3 && c4 && c5) {
    box.className = 'ab ab-ok';
    box.innerHTML = `<div class="ab-title"><i class="fa-solid fa-circle-check"></i> SẴN SÀNG THỬ NGHIỆM SBT</div>
    <div>Đạt 5/5 tiêu chí lâm sàng. Bắt đầu Thử nghiệm thở tự nhiên (SBT) 30-120 phút.</div>`;
  } else {
    box.className = 'ab ab-warn';
    box.innerHTML = `<div class="ab-title"><i class="fa-solid fa-triangle-exclamation"></i> Chưa đủ điều kiện cai máy</div>
    <div>Cần đạt đầy đủ 5 tiêu chí để đảm bảo an toàn cho bệnh nhân.</div>`;
  }
}

export function calculateRSBI(): void {
  const f = parseFloat((document.getElementById('rsbi-rr') as HTMLInputElement)?.value) || 22;
  const vtL = parseFloat((document.getElementById('rsbi-vt') as HTMLInputElement)?.value) || 0.38;

  const rsbi = Math.round(f / vtL);
  const resRsbi = document.getElementById('res-rsbi-val');
  if (resRsbi) resRsbi.textContent = `${rsbi} lần/min/L`;

  const box = document.getElementById('rsbi-result-box');
  if (!box) return;

  if (rsbi <= 105) {
    box.className = 'ab ab-ok';
    box.innerHTML = `<div class="ab-title"><i class="fa-solid fa-circle-check"></i> RSBI = ${rsbi} (ĐẠT &le; 105)</div>
    <div>Tỷ lệ cai máy thành công cao. Khuyến khích tiến hành rút ống.</div>`;
  } else {
    box.className = 'ab ab-danger';
    box.innerHTML = `<div class="ab-title"><i class="fa-solid fa-triangle-exclamation"></i> RSBI = ${rsbi} (NGUY CƠ THẤT BẠI &gt; 105)</div>
    <div>Bệnh nhân đang thở nhanh nông. Nguy cơ mệt cơ hô hấp cao nếu rút ống!</div>`;
  }
}

export function calculateCuffLeak(): void {
  const vti = parseFloat((document.getElementById('clt-vti') as HTMLInputElement)?.value) || 500;
  const vte = parseFloat((document.getElementById('clt-vte') as HTMLInputElement)?.value) || 450;
  const leak = Math.max(0, vti - vte);

  const resLeak = document.getElementById('res-cuff-leak');
  if (resLeak) resLeak.textContent = `${leak} mL`;
  const alertBox = document.getElementById('cuff-leak-alert');
  if (!alertBox) return;

  if (leak < 110) {
    alertBox.className = 'ab ab-danger';
    alertBox.innerHTML = `<div class="ab-title"><i class="fa-solid fa-circle-xmark"></i> THẤT BẠI: Cuff Leak < 110 mL</div>
    <div>Rò rỉ chỉ đạt ${leak} mL. Nguy cơ phù nề thanh quản nặng! Dùng Corticoid IV trước khi rút ống 4 giờ.</div>`;
  } else {
    alertBox.className = 'ab ab-ok';
    alertBox.innerHTML = `<div class="ab-title"><i class="fa-solid fa-circle-check"></i> ĐẠT: Cuff Leak = ${leak} mL (&ge; 110 mL)</div>
    <div>Nguy cơ phù thanh quản thấp. Có thể tiến hành rút ống an toàn.</div>`;
  }
}

export function evaluateExtubationO2(): void {
  const c1 = (document.getElementById('risk-copd') as HTMLInputElement)?.checked;
  const c2 = (document.getElementById('risk-co2') as HTMLInputElement)?.checked;
  const c3 = (document.getElementById('risk-age') as HTMLInputElement)?.checked;
  const c4 = (document.getElementById('risk-heart') as HTMLInputElement)?.checked;

  const alertBox = document.getElementById('extubation-o2-alert');
  if (!alertBox) return;

  if (c1 || c2 || c3 || c4) {
    alertBox.className = 'ab ab-warn';
    alertBox.innerHTML = `<div class="ab-title"><i class="fa-solid fa-circle-info"></i> Khuyến cáo sau rút: NIV hoặc HFNC</div>
    <div>Thuộc nhóm nguy cơ cao thất bại. Ưu tiên hỗ trợ NIV (BiPAP) hoặc Oxy dòng cao HFNC ngay sau khi rút.</div>`;
  } else {
    alertBox.className = 'ab ab-info';
    alertBox.innerHTML = `<div class="ab-title"><i class="fa-solid fa-circle-info"></i> Khuyến cáo sau rút: HFNC hoặc COT</div>
    <div>Nhóm nguy cơ trung bình/thấp. Ưu tiên HFNC thay cho oxy thông thường.</div>`;
  }
}

// ── 4. CASE SIMULATOR & QUIZ ARENA ──
export const caseDatabase: Record<number, VentCaseData> = {
  1: {
    title: "Ca 1: ARDS Nặng do Viêm Phổi",
    qTitle: "Câu Hỏi Lâm Sàng (Ca 1 — ARDS):",
    question: "Bệnh nhân ARDS này đang cài đặt VT 480 mL (8 mL/kg PBW) với Pplat là 34 cmH2O. Xử trí lâm sàng ưu tiên tiếp theo là gì?",
    options: [
      { text: "A. Giữ nguyên thông số và tăng an thần sâu", correct: false },
      { text: "B. Giảm VT từng bước xuống 6 mL/kg (rồi 4 mL/kg nếu cần) để Pplat ≤ 30 cmH2O", correct: true },
      { text: "C. Tăng PEEP lên 20 cmH2O ngay lập tức mà không chỉnh VT", correct: false },
      { text: "D. Tăng tần số thở lên 40 lần/phút", correct: false }
    ],
    explanation: "<strong>Đúng!</strong> Theo khuyến cáo ARDSNet, khi Pplat vượt quá 30 cmH2O, chiến lược bảo vệ phổi yêu cầu giảm ngay VT từng bước 1 mL/kg PBW (xuống mức 4-6 mL/kg) để đưa Pplat về ngưỡng an toàn ≤ 30 cmH2O.",
    action: () => {
      activeScenario = 'ards';
      const setVal = (id: string, val: string) => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
        if (el) el.value = val;
      };
      setVal('inp-mode', 'VCV');
      setVal('inp-vt', '330');
      setVal('inp-rr', '20');
      setVal('inp-peep', '12');
      setVal('inp-pplat', '28');
      setVal('inp-fio2', '70');
      setVal('inp-autopeep', '0');
      setVal('inp-cstat', '18');
      setVal('inp-raw', '8');
      setVal('inp-ph', '7.31');
      setVal('inp-paco2', '48');
      setVal('inp-spo2', '91');
      toggleModeInputs();
    }
  },
  2: {
    title: "Ca 2: Cơn COPD Cấp Bẫy Khí",
    qTitle: "Câu Hỏi Lâm Sàng (Ca 2 — COPD):",
    question: "Bệnh nhân COPD có Auto-PEEP là 8 cmH2O và xuất hiện nhịp chống máy thở. Biện pháp điều chỉnh máy thở thích hợp nhất là gì?",
    options: [
      { text: "A. Kéo dài thời gian thở ra bằng cách tăng I:E lên 1:4 và giảm RR", correct: true },
      { text: "B. Tăng tần số thở lên 25 lần/phút để thải CO2", correct: false },
      { text: "C. Tăng VT lên 10 mL/kg PBW", correct: false },
      { text: "D. Tắt hoàn toàn PEEP ngoại sinh", correct: false }
    ],
    explanation: "<strong>Đúng!</strong> Đối với COPD bị bẫy khí (Auto-PEEP), nguyên tắc là kéo dài thời gian thở ra (Te) bằng cách tăng tỷ lệ I:E (1:3 hoặc 1:4) và giảm tần số thở (10-12 lần/phút) để khí có đủ thời gian thoát ra ngoài.",
    action: () => {
      activeScenario = 'copd';
      const setVal = (id: string, val: string) => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
        if (el) el.value = val;
      };
      setVal('inp-mode', 'VCV');
      setVal('inp-vt', '380');
      setVal('inp-rr', '12');
      setVal('inp-peep', '5');
      setVal('inp-autopeep', '8');
      setVal('inp-raw', '18');
      setVal('inp-ie', '1:4');
      setVal('inp-cstat', '45');
      setVal('inp-ph', '7.32');
      setVal('inp-paco2', '56');
      setVal('inp-spo2', '89');
      toggleModeInputs();
    }
  },
  3: {
    title: "Ca 3: Tràn Khí Màng Phổi Cấp",
    qTitle: "Câu Hỏi Lâm Sàng (Ca 3 — Tràn Khí):",
    question: "Áp lực đường thở đỉnh PIP vọt từ 24 lên 42 cmH2O đột ngột, SpO2 giảm còn 82%, lồng ngực bên phải phồng, rì rào phế nang bên phải mất. Xử trí cấp cứu đầu tiên?",
    options: [
      { text: "A. Chụp X-quang phổi tại giường chờ kết quả", correct: false },
      { text: "B. Tháo máy thở, bóp bóng & Chọc hút kim giải áp màng phổi phải cấp cứu!", correct: true },
      { text: "C. Tăng FiO2 lên 100% và chờ 15 phút", correct: false },
      { text: "D. Hút đờm qua ống nội khí quản", correct: false }
    ],
    explanation: "<strong>Đúng!</strong> Đây là triệu chứng điển hình của Tràn khí màng phổi áp lực cấp tính (Pneumothorax). Phải lập tức tháo máy thở bóp bóng và chọc kim giải áp màng phổi phải cấp cứu để cứu sống bệnh nhân!",
    action: () => {
      activeScenario = 'pneumothorax';
      const setVal = (id: string, val: string) => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
        if (el) el.value = val;
      };
      setVal('inp-mode', 'VCV');
      setVal('inp-vt', '400');
      setVal('inp-rr', '22');
      setVal('inp-peep', '5');
      setVal('inp-pplat', '42');
      setVal('inp-fio2', '100');
      setVal('inp-autopeep', '0');
      setVal('inp-cstat', '12');
      setVal('inp-raw', '15');
      setVal('inp-ph', '7.22');
      setVal('inp-paco2', '58');
      setVal('inp-spo2', '82');
      toggleModeInputs();
    }
  },
  4: {
    title: "Ca 4: Phù Phổi Cấp Tim",
    qTitle: "Câu Hỏi Lâm Sàng (Ca 4 — Phù Phổi Cấp Tim):",
    question: "Bệnh nhân nữ 72T phù phổi cấp do tim đang được thông khí không xâm nhập (CPAP/NIV) với PEEP 8 cmH2O, FiO2 60%. Cơ chế lợi ích chính của PEEP trong tình huống này là gì?",
    options: [
      { text: "A. Tăng thể tích khí đọng trong dạ dày", correct: false },
      { text: "B. Mở phế nang bị ngập dịch, đồng thời giảm tĩnh mạch hồi lưu (tiền tải) và giảm sức cản thất trái (hậu tải)", correct: true },
      { text: "C. Tăng lượng CO2 đào thải gấp 2 lần", correct: false },
      { text: "D. Làm giảm tần số tim xuống dưới 40 nhịp/phút", correct: false }
    ],
    explanation: "<strong>Đúng!</strong> PEEP/CPAP trong phù phổi cấp làm tăng áp lực lồng ngực, giúp giảm máu tĩnh mạch về tim (giảm tiền tải) và giảm áp lực xuyên thành thất trái (giảm hậu tải), đồng thời mở phế nang bị ngập dịch giúp SpO2 cải thiện nhanh chóng.",
    action: () => {
      activeScenario = 'niv';
      const setVal = (id: string, val: string) => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
        if (el) el.value = val;
      };
      setVal('inp-mode', 'CPAP');
      setVal('inp-ipap', '14');
      setVal('inp-epap', '8');
      setVal('inp-peep', '8');
      setVal('inp-fio2', '60');
      setVal('inp-rr', '24');
      setVal('inp-ph', '7.28');
      setVal('inp-paco2', '46');
      setVal('inp-spo2', '78');
      toggleModeInputs();
    }
  },
  5: {
    title: "Ca 5: Cơn Hen Cấp Nặng",
    qTitle: "Câu Hỏi Lâm Sàng (Ca 5 — Cơn Hen Cấp Nặng):",
    question: "Bệnh nhân hen phế quản nguy cơ tử vong cần thở máy có Sức cản Raw = 25 cmH2O/L/s, PaCO2 = 68 mmHg, pH = 7.24. Mục tiêu cài đặt máy thở hàng đầu là gì?",
    options: [
      { text: "A. Tăng tần số thở lên 30 lần/phút để bình thường hóa PaCO2 ngay", correct: false },
      { text: "B. Giữ RR thấp (10-12 lần/phút), I:E kéo dài 1:4.5 và chấp nhận Toan hô hấp có kiểm soát (Permissive Hypercapnia) miễn pH ≥ 7.20", correct: true },
      { text: "C. Cài PEEP = 15 cmH2O", correct: false },
      { text: "D. Cài VT = 12 mL/kg PBW", correct: false }
    ],
    explanation: "<strong>Đúng!</strong> Trong cơn hen cấp nặng, đường thở bị co thắt dữ dội. Ưu tiên hàng đầu là tránh căng phồng phổi động quá mức (Auto-PEEP) bằng cách giữ RR thấp và I:E kéo rộng, chấp nhận PaCO2 cao có kiểm soát (Permissive Hypercapnia) miễn là pH ≥ 7.20.",
    action: () => {
      activeScenario = 'asthma';
      const setVal = (id: string, val: string) => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
        if (el) el.value = val;
      };
      setVal('inp-mode', 'VCV');
      setVal('inp-vt', '360');
      setVal('inp-rr', '10');
      setVal('inp-ie', '1:4');
      setVal('inp-raw', '25');
      setVal('inp-autopeep', '10');
      setVal('inp-ph', '7.24');
      setVal('inp-paco2', '68');
      setVal('inp-spo2', '84');
      toggleModeInputs();
    }
  },
  6: {
    title: "Ca 6: Nhược Cơ Cấp",
    qTitle: "Câu Hỏi Lâm Sàng (Ca 6 — Nhược Cơ Cấp):",
    question: "Bệnh nhân nữ 35T bị liệt cơ hô hấp do nhược cơ cấp, cơ học phổi hoàn toàn bình thường (Cstat 55, Raw 4). Chiến lược cài đặt máy thở nào thích hợp?",
    options: [
      { text: "A. Thở máy VCV với VT 7-8 mL/kg PBW tiêu chuẩn, PEEP 5, FiO2 21% vì nhu mô phổi hoàn toàn lành lặn", correct: true },
      { text: "B. Hạn chế VT xuống 4 mL/kg như ARDS", correct: false },
      { text: "C. Tắt hoàn toàn PEEP", correct: false },
      { text: "D. Cài FiO2 100% liên tục", correct: false }
    ],
    explanation: "<strong>Đúng!</strong> Bệnh nhân liệt cơ thở có nhu mô phổi hoàn toàn bình thường (suy bơm thông khí thuần túy). Chỉ cần thông khí VCV với thể tích tiêu chuẩn 7-8 mL/kg PBW, FiO2 21% và PEEP sinh lý 5 cmH2O.",
    action: () => {
      activeScenario = 'normal';
      const setVal = (id: string, val: string) => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
        if (el) el.value = val;
      };
      setVal('inp-mode', 'VCV');
      setVal('inp-vt', '460');
      setVal('inp-rr', '16');
      setVal('inp-peep', '5');
      setVal('inp-fio2', '21');
      setVal('inp-cstat', '55');
      setVal('inp-raw', '4');
      setVal('inp-ph', '7.40');
      setVal('inp-paco2', '38');
      setVal('inp-spo2', '98');
      toggleModeInputs();
    }
  },
  7: {
    title: "Ca 7: Cai Máy Hậu Phẫu Tim",
    qTitle: "Câu Hỏi Lâm Sàng (Ca 7 — Cai Máy Hậu Phẫu):",
    question: "Bệnh nhân nam 55T sau phẫu thuật tim giờ thứ 8 đang thử nhịp thở tự nhiên (SBT) ở PSV 8 cmH2O. RSBI = 42 lần/min/L, Cuff leak = 320 mL, tỉnh táo hoàn toàn. Xử trí thích hợp?",
    options: [
      { text: "A. Giữ máy thở thêm 48 giờ nữa", correct: false },
      { text: "B. Tiến hành rút ống nội khí quản và chuyển sang thở Oxy gọng mũi", correct: true },
      { text: "C. Tăng liều an thần Propofol", correct: false },
      { text: "D. Cho thở lại mốt VCV", correct: false }
    ],
    explanation: "<strong>Đúng!</strong> Bệnh nhân đáp ứng hoàn hảo các tiêu chí rút ống: RSBI < 105 (42), Cuff leak test tốt (320 mL > 110 mL), tri giác tỉnh táo. Tiến hành rút ống nội khí quản an toàn.",
    action: () => {
      activeScenario = 'wean';
      const setVal = (id: string, val: string) => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
        if (el) el.value = val;
      };
      setVal('inp-mode', 'PSV');
      setVal('inp-pinsp', '8');
      setVal('inp-peep', '5');
      setVal('inp-fio2', '30');
      setVal('rsbi-rr', '16');
      setVal('rsbi-vt', '0.38');
      setVal('clt-vti', '500');
      setVal('clt-vte', '180');

      const chk1 = document.getElementById('wean-chk-1') as HTMLInputElement | null;
      const chk2 = document.getElementById('wean-chk-2') as HTMLInputElement | null;
      const chk3 = document.getElementById('wean-chk-3') as HTMLInputElement | null;
      const chk4 = document.getElementById('wean-chk-4') as HTMLInputElement | null;
      const chk5 = document.getElementById('wean-chk-5') as HTMLInputElement | null;
      if (chk1) chk1.checked = true;
      if (chk2) chk2.checked = true;
      if (chk3) chk3.checked = true;
      if (chk4) chk4.checked = true;
      if (chk5) chk5.checked = true;

      toggleModeInputs();
      evaluateWeaning();
      calculateRSBI();
      calculateCuffLeak();
    }
  },
  8: {
    title: "Ca 8: Nguy Cơ Chấn Thương Thể Tích",
    qTitle: "Câu Hỏi Lâm Sàng (Ca 8 — Chấn Thương Thể Tích):",
    question: "Bệnh nhân nam 70T nặng 75kg, cao 160cm (PBW 55kg). Bác sĩ cài VT = 550 mL (10 mL/kg theo cân nặng thực). Pplat tăng lên 35 cmH2O. Nguyên nhân và hướng khắc phục?",
    options: [
      { text: "A. Sai lầm do tính VT theo Cân nặng thực tế thay vì Cân nặng lý tưởng (PBW). Cần giảm VT về 330 mL (6 mL/kg PBW)", correct: true },
      { text: "B. Do phổi bị xẹp, cần tăng VT lên 650 mL", correct: false },
      { text: "C. Tăng PEEP lên 18 cmH2O mà giữ nguyên VT", correct: false },
      { text: "D. Cho bệnh nhân nằm sấp ngay", correct: false }
    ],
    explanation: "<strong>Đúng!</strong> Thể tích phổi phụ thuộc vào chiều cao và giới tính (PBW), không phụ thuộc vào lớp mỡ/cân nặng thực tế. Cài VT theo cân nặng thực tế ở bệnh nhân thừa cân sẽ gây quá tải thể tích (Volutrauma/VILI) và đẩy Pplat lên mức nguy hiểm!",
    action: () => {
      activeScenario = 'volutrauma';
      const genderM = document.getElementById('gender-m') as HTMLInputElement | null;
      if (genderM) genderM.checked = true;
      const setVal = (id: string, val: string) => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
        if (el) el.value = val;
      };
      setVal('inp-height', '160');
      setVal('inp-weight', '75');
      setVal('inp-mode', 'VCV');
      setVal('inp-vt', '550');
      setVal('inp-pplat', '35');
      setVal('inp-peep', '5');
      setVal('inp-rr', '16');
      setVal('inp-fio2', '40');
      toggleModeInputs();
    }
  }
};

export function loadCaseStudy(caseId: number): void {
  document.querySelectorAll('.case-card-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`case-btn-${caseId}`);
  if (btn) btn.classList.add('active');

  const data = caseDatabase[caseId];
  if (!data) return;

  const quizTitle = document.getElementById('quiz-title');
  const quizQuestion = document.getElementById('quiz-question');
  if (quizTitle) quizTitle.innerHTML = `<i class="fa-solid fa-circle-question"></i> ${data.qTitle}`;
  if (quizQuestion) quizQuestion.textContent = data.question;

  const optBox = document.getElementById('quiz-options-box');
  if (optBox) {
    optBox.innerHTML = '';
    data.options.forEach((opt) => {
      const b = document.createElement('button');
      b.className = 'quiz-opt-btn';
      b.textContent = opt.text;
      b.onclick = () => answerQuiz(b, opt.correct, data.explanation);
      optBox.appendChild(b);
    });
  }

  const quizExplanation = document.getElementById('quiz-explanation');
  if (quizExplanation) quizExplanation.style.display = 'none';
  data.action();
}

export function answerQuiz(btn: HTMLElement, isCorrect: boolean, expText: string): void {
  document.querySelectorAll('.quiz-opt-btn').forEach(b => {
    (b as HTMLButtonElement).disabled = true;
    (b as HTMLElement).style.opacity = '0.7';
  });

  if (isCorrect) {
    btn.classList.add('correct');
  } else {
    btn.classList.add('wrong');
  }

  const exp = document.getElementById('quiz-explanation');
  if (exp) {
    exp.style.display = 'block';
    exp.style.background = isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)';
    exp.style.border = isCorrect ? '1px solid #10b981' : '1px solid #ef4444';
    exp.style.color = '#f8fafc';
    exp.innerHTML = expText;
  }
}

// ── 5. ACCORDION & TAB SWITCHING ──
export function switchTab(tabId: string, btn?: HTMLElement): void {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  const targetTab = document.getElementById(tabId);
  if (targetTab) targetTab.classList.add('active');
  if (btn) btn.classList.add('active');

  if (tabId === 'tab-master-studio') {
    setTimeout(initCanvases, 50);
  } else if (tabId === 'tab-guideline-md') {
    const win = window as any;
    if (typeof win.CliniMarkdown !== 'undefined') {
      win.CliniMarkdown.renderFromFile('Quản lý máy thở.md', '#guideline-md-container');
    }
  }
}

export function toggleAccordion(header: HTMLElement): void {
  const item = header.parentElement;
  if (item) item.classList.toggle('open');
}

// Global binding for inline onclick attributes
if (typeof window !== 'undefined') {
  const win = window as any;
  win.initCanvases = initCanvases;
  win.toggleWaveformPause = toggleWaveformPause;
  win.calculateAll = calculateAll;
  win.toggleModeInputs = toggleModeInputs;
  win.resetCalculator = resetCalculator;
  win.resetAllStudio = resetAllStudio;
  win.evaluateWeaning = evaluateWeaning;
  win.calculateRSBI = calculateRSBI;
  win.calculateCuffLeak = calculateCuffLeak;
  win.evaluateExtubationO2 = evaluateExtubationO2;
  win.loadCaseStudy = loadCaseStudy;
  win.answerQuiz = answerQuiz;
  win.switchTab = switchTab;
  win.toggleAccordion = toggleAccordion;
}

export function initVentStudio(): void {
  try {
    initCanvases();
    resetCalculator();
    evaluateWeaning();
    calculateCuffLeak();
    evaluateExtubationO2();
    calculateRSBI();
  } catch (e) {
    console.error("Initialization calculations warning:", e);
  }

  startWaveformLoop();

  try {
    loadCaseStudy(1);
  } catch (e) {
    console.error("Load initial case study warning:", e);
  }

  window.addEventListener('resize', initCanvases);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVentStudio);
  } else {
    initVentStudio();
  }
}
