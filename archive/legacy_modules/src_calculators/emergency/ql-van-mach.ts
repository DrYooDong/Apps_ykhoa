/**
 * CliniPortal — Vasoactive & Inotrope Management Studio (TypeScript Module)
 * Multi-infusion syringe pump calculator, VIS (Vasoactive-Inotropic Score), Hemodynamic Radar (MAP/Shock Index), PLR Test & 1-Click EMR Order Generator
 */

export function calcIBW(): number {
  const g = (document.getElementById('p-gender') as HTMLSelectElement | null)?.value || 'male';
  const h = parseFloat((document.getElementById('p-height') as HTMLInputElement | null)?.value || '165') || 165;
  return g === 'male' ? 50 + 0.9 * (h - 152.4) : 45.5 + 0.9 * (h - 152.4);
}

export function syncDoseInput(type: string): void {
  const sld = document.getElementById(`sld-${type}`) as HTMLInputElement | null;
  const lbl = document.getElementById(`lbl-dose-${type}`);
  if (!sld || !lbl) return;

  const val = parseFloat(sld.value);
  lbl.textContent = `${type === 'ino' ? val.toFixed(1) : val.toFixed(2)} mcg/kg/min`;
  updateStudio();
}

export function switchTab(idx: number): void {
  document.querySelectorAll('.interv-btn').forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
  document.querySelectorAll('.interv-panel').forEach((c, i) => {
    c.classList.toggle('active', i === idx);
  });
}

export function loadPreset(key: string): void {
  const chkNe = document.getElementById('chk-ne') as HTMLInputElement | null;
  const sldNe = document.getElementById('sld-ne') as HTMLInputElement | null;
  const chkVaso = document.getElementById('chk-vaso') as HTMLInputElement | null;
  const chkEpi = document.getElementById('chk-epi') as HTMLInputElement | null;
  const sldEpi = document.getElementById('sld-epi') as HTMLInputElement | null;
  const chkIno = document.getElementById('chk-ino') as HTMLInputElement | null;
  const selInoDrug = document.getElementById('sel-ino-drug') as HTMLSelectElement | null;
  const sldIno = document.getElementById('sld-ino') as HTMLInputElement | null;

  const hSbp = document.getElementById('h-sbp') as HTMLInputElement | null;
  const hDbp = document.getElementById('h-dbp') as HTMLInputElement | null;
  const hHr = document.getElementById('h-hr') as HTMLInputElement | null;
  const hLactate = document.getElementById('h-lactate') as HTMLInputElement | null;
  const hScvo2 = document.getElementById('h-scvo2') as HTMLInputElement | null;

  if (key === 'septic') {
    if (chkNe) chkNe.checked = true;
    if (sldNe) sldNe.value = '0.15';
    if (chkVaso) chkVaso.checked = false;
    if (chkEpi) chkEpi.checked = false;
    if (chkIno) chkIno.checked = false;
    if (hSbp) hSbp.value = '82';
    if (hDbp) hDbp.value = '48';
    if (hHr) hHr.value = '118';
    if (hLactate) hLactate.value = '4.2';
    if (hScvo2) hScvo2.value = '65';
  } else if (key === 'cardio') {
    if (chkNe) chkNe.checked = true;
    if (sldNe) sldNe.value = '0.10';
    if (chkVaso) chkVaso.checked = false;
    if (chkEpi) chkEpi.checked = false;
    if (chkIno) chkIno.checked = true;
    if (selInoDrug) selInoDrug.value = 'DOBU';
    if (sldIno) sldIno.value = '5.0';
    if (hSbp) hSbp.value = '78';
    if (hDbp) hDbp.value = '50';
    if (hHr) hHr.value = '105';
    if (hLactate) hLactate.value = '5.1';
    if (hScvo2) hScvo2.value = '52';
  } else if (key === 'anaphylaxis') {
    if (chkNe) chkNe.checked = false;
    if (chkVaso) chkVaso.checked = false;
    if (chkEpi) chkEpi.checked = true;
    if (sldEpi) sldEpi.value = '0.15';
    if (chkIno) chkIno.checked = false;
    if (hSbp) hSbp.value = '70';
    if (hDbp) hDbp.value = '40';
    if (hHr) hHr.value = '135';
  } else if (key === 'refractory') {
    if (chkNe) chkNe.checked = true;
    if (sldNe) sldNe.value = '0.35';
    if (chkVaso) chkVaso.checked = true;
    if (chkEpi) chkEpi.checked = true;
    if (sldEpi) sldEpi.value = '0.10';
    if (chkIno) chkIno.checked = false;
    if (hSbp) hSbp.value = '75';
    if (hDbp) hDbp.value = '45';
    if (hHr) hHr.value = '125';
    if (hLactate) hLactate.value = '6.8';
  } else if (key === 'brady') {
    if (chkNe) chkNe.checked = false;
    if (chkVaso) chkVaso.checked = false;
    if (chkEpi) chkEpi.checked = false;
    if (chkIno) chkIno.checked = true;
    if (selInoDrug) selInoDrug.value = 'DOPA';
    if (sldIno) sldIno.value = '7.5';
    if (hSbp) hSbp.value = '76';
    if (hDbp) hDbp.value = '44';
    if (hHr) hHr.value = '38';
  }

  const lblNe = document.getElementById('lbl-dose-ne');
  const lblEpi = document.getElementById('lbl-dose-epi');
  const lblIno = document.getElementById('lbl-dose-ino');

  if (lblNe && sldNe) lblNe.textContent = `${parseFloat(sldNe.value).toFixed(2)} mcg/kg/min`;
  if (lblEpi && sldEpi) lblEpi.textContent = `${parseFloat(sldEpi.value).toFixed(2)} mcg/kg/min`;
  if (lblIno && sldIno) lblIno.textContent = `${parseFloat(sldIno.value).toFixed(1)} mcg/kg/min`;

  updateStudio();
}

export function updateStudio(): void {
  const wtInput = document.getElementById('p-weight') as HTMLInputElement | null;
  const wt = parseFloat(wtInput?.value || '65') || 65;
  const ibw = calcIBW();
  const calcWt = Math.min(wt, ibw);

  const ibwChip = document.getElementById('ibw-chip');
  if (ibwChip) {
    ibwChip.textContent = `IBW: ${ibw.toFixed(1)} kg | Cân nặng tính toán: ${calcWt.toFixed(1)} kg`;
  }

  let totalVIS = 0;

  // NE
  const chkNe = (document.getElementById('chk-ne') as HTMLInputElement | null)?.checked || false;
  const pumpCardNe = document.getElementById('pump-card-ne');
  if (pumpCardNe) pumpCardNe.classList.toggle('active', chkNe);
  let rateNe = 0;
  if (chkNe) {
    const doseNe = parseFloat((document.getElementById('sld-ne') as HTMLInputElement | null)?.value || '0') || 0;
    const concNe = parseFloat((document.getElementById('conc-ne') as HTMLSelectElement | null)?.value || '80') || 80;
    rateNe = (doseNe * calcWt * 60) / concNe;
    totalVIS += doseNe * 100;
  }
  const rateNeEl = document.getElementById('rate-ne');
  if (rateNeEl) rateNeEl.textContent = rateNe.toFixed(1);

  // VASO
  const chkVaso = (document.getElementById('chk-vaso') as HTMLInputElement | null)?.checked || false;
  const pumpCardVaso = document.getElementById('pump-card-vaso');
  if (pumpCardVaso) pumpCardVaso.classList.toggle('active', chkVaso);
  let rateVaso = 0;
  if (chkVaso) {
    rateVaso = (0.03 * 60) / 0.4;
    totalVIS += 0.03 * 10000;
  }
  const rateVasoEl = document.getElementById('rate-vaso');
  if (rateVasoEl) rateVasoEl.textContent = rateVaso.toFixed(1);

  // EPI
  const chkEpi = (document.getElementById('chk-epi') as HTMLInputElement | null)?.checked || false;
  const pumpCardEpi = document.getElementById('pump-card-epi');
  if (pumpCardEpi) pumpCardEpi.classList.toggle('active', chkEpi);
  let rateEpi = 0;
  if (chkEpi) {
    const doseEpi = parseFloat((document.getElementById('sld-epi') as HTMLInputElement | null)?.value || '0') || 0;
    const concEpi = parseFloat((document.getElementById('conc-epi') as HTMLSelectElement | null)?.value || '80') || 80;
    rateEpi = (doseEpi * calcWt * 60) / concEpi;
    totalVIS += doseEpi * 100;
  }
  const rateEpiEl = document.getElementById('rate-epi');
  if (rateEpiEl) rateEpiEl.textContent = rateEpi.toFixed(1);

  // INOTROPE
  const chkIno = (document.getElementById('chk-ino') as HTMLInputElement | null)?.checked || false;
  const pumpCardIno = document.getElementById('pump-card-ino');
  if (pumpCardIno) pumpCardIno.classList.toggle('active', chkIno);
  let rateIno = 0;
  if (chkIno) {
    const doseIno = parseFloat((document.getElementById('sld-ino') as HTMLInputElement | null)?.value || '0') || 0;
    const concIno = parseFloat((document.getElementById('conc-ino') as HTMLSelectElement | null)?.value || '5000') || 5000;
    rateIno = (doseIno * calcWt * 60) / concIno;
    const drugIno = (document.getElementById('sel-ino-drug') as HTMLSelectElement | null)?.value || 'DOBU';
    if (drugIno === 'DOBU' || drugIno === 'DOPA') {
      totalVIS += doseIno * 1;
    }
  }
  const rateInoEl = document.getElementById('rate-ino');
  if (rateInoEl) rateInoEl.textContent = rateIno.toFixed(1);

  // VIS DISPLAY
  const visScoreEl = document.getElementById('vis-score');
  if (visScoreEl) visScoreEl.textContent = totalVIS.toFixed(1);

  const bge = document.getElementById('vis-badge');
  const visDesc = document.getElementById('vis-desc');
  if (bge && visDesc) {
    if (totalVIS < 10) {
      bge.textContent = 'Nguy cơ thấp';
      bge.style.background = 'var(--vm-ok-h)';
      bge.style.color = 'var(--vm-ok)';
      bge.style.borderColor = 'var(--vm-ok-b)';
      visDesc.textContent = 'Tải nhẹ - Tiên lượng tốt';
    } else if (totalVIS < 20) {
      bge.textContent = 'Tải trung bình';
      bge.style.background = 'var(--vm-amber-h)';
      bge.style.color = 'var(--vm-amber)';
      bge.style.borderColor = 'var(--vm-amber-b)';
      visDesc.textContent = 'Cần giám sát suy đa tạng & tưới máu mô';
    } else {
      bge.textContent = 'TẢI RẤT CAO (ICU NẶNG)';
      bge.style.background = 'var(--vm-red-h)';
      bge.style.color = 'var(--vm-red)';
      bge.style.borderColor = 'var(--vm-red-b)';
      visDesc.textContent = '🚨 Nguy cơ tử vong cao. Cân nhắc hội chẩn VA-ECMO / IABP';
    }
  }

  // HEMODYNAMICS
  const sbp = parseFloat((document.getElementById('h-sbp') as HTMLInputElement | null)?.value || '85') || 85;
  const dbp = parseFloat((document.getElementById('h-dbp') as HTMLInputElement | null)?.value || '50') || 50;
  const hr = parseFloat((document.getElementById('h-hr') as HTMLInputElement | null)?.value || '115') || 115;
  const map = (sbp + 2 * dbp) / 3;
  const si = hr / sbp;

  const valMap = document.getElementById('val-map');
  const valSi = document.getElementById('val-si');
  const mapStatus = document.getElementById('lbl-map-status');

  if (valMap) valMap.textContent = map.toFixed(1);
  if (valSi) valSi.textContent = si.toFixed(2);
  if (mapStatus) {
    mapStatus.textContent = map >= 65 ? '✅ Đạt mục tiêu (≥ 65)' : '⚠️ CHƯA ĐẠT MỤC TIÊU (< 65)';
    mapStatus.style.color = map >= 65 ? 'var(--vm-ok)' : 'var(--vm-red)';
  }

  // RADAR
  let targetX = 110;
  let targetY = 75;

  if (chkNe && !chkIno) {
    targetX = 110;
    targetY = 65;
  } else if (chkIno || (chkNe && chkIno)) {
    targetX = 275;
    targetY = 65;
  } else if (si > 1.2 && !chkNe) {
    targetX = 110;
    targetY = 155;
  } else if (totalVIS >= 20) {
    targetX = 275;
    targetY = 155;
  }

  const dot = document.getElementById('radar-dot');
  const dotInner = document.getElementById('radar-dot-inner');
  if (dot && dotInner) {
    dot.setAttribute('cx', targetX.toString());
    dot.setAttribute('cy', targetY.toString());
    dotInner.setAttribute('cx', targetX.toString());
    dotInner.setAttribute('cy', targetY.toString());
  }

  calcReverse();
  generateHISOrder();

  const win = window as any;
  if (win.ClinicalBridge && typeof win.ClinicalBridge.updateSession === 'function') {
    win.ClinicalBridge.updateSession({
      patientWeight: wt,
      patientIBW: ibw,
      map: map.toFixed(1),
      visScore: totalVIS.toFixed(1),
      shockIndex: si.toFixed(2)
    });
  }
}

export function calcPLR(): void {
  const pp1 = parseFloat((document.getElementById('plr-pp1') as HTMLInputElement | null)?.value || '30') || 30;
  const pp2 = parseFloat((document.getElementById('plr-pp2') as HTMLInputElement | null)?.value || '36') || 36;
  const pct = ((pp2 - pp1) / pp1) * 100;
  const box = document.getElementById('plr-result-box');
  if (!box) return;

  if (pct >= 13) {
    box.innerHTML = `✅ Phản ứng Dịch DƯƠNG TÍNH (&Delta;PP = ${pct.toFixed(1)}% &ge; 13%). Tim còn đáp ứng bù dịch!`;
    box.style.color = 'var(--vm-ok)';
  } else {
    box.innerHTML = `⚠️ Phản ứng Dịch ÂM TÍNH (&Delta;PP = ${pct.toFixed(1)}% &lt; 13%). Ngưng truyền dịch, ưu tiên tăng vận mạch / trợ tim.`;
    box.style.color = 'var(--vm-red)';
  }
}

export function calcReverse(): void {
  const rate = parseFloat((document.getElementById('rev-rate') as HTMLInputElement | null)?.value || '0') || 0;
  const conc = parseFloat((document.getElementById('rev-drug') as HTMLSelectElement | null)?.value || '80') || 80;
  const wt = parseFloat((document.getElementById('rev-weight') as HTMLInputElement | null)?.value || '65') || 65;
  const dose = (rate * conc) / (wt * 60);

  const resEl = document.getElementById('rev-result-val');
  if (resEl) resEl.textContent = `${dose.toFixed(2)} mcg/kg/phút`;
}

export function generateHISOrder(): void {
  const wt = (document.getElementById('p-weight') as HTMLInputElement | null)?.value || '65';
  const map = document.getElementById('val-map')?.textContent || '65';
  const vis = document.getElementById('vis-score')?.textContent || '0';

  const lines: string[] = [];
  lines.push(`-- Y LỆNH HỒI SỨC VẬN MẠCH & BỆNH ÁN --`);
  lines.push(`Bệnh nhân: ${wt} kg | MAP hiện tại: ${map} mmHg | VIS Score: ${vis}`);
  lines.push(``);

  const chkNe = (document.getElementById('chk-ne') as HTMLInputElement | null)?.checked;
  const chkVaso = (document.getElementById('chk-vaso') as HTMLInputElement | null)?.checked;
  const chkEpi = (document.getElementById('chk-epi') as HTMLInputElement | null)?.checked;
  const chkIno = (document.getElementById('chk-ino') as HTMLInputElement | null)?.checked;

  if (chkNe) {
    const dose = document.getElementById('lbl-dose-ne')?.textContent || '';
    const rate = document.getElementById('rate-ne')?.textContent || '';
    lines.push(`1. Norepinephrine 4mg/50mL (Pha NaCl 0.9% vđ 50mL): BTĐ running ${rate} mL/h (= ${dose}).`);
  }
  if (chkVaso) {
    lines.push(`2. Vasopressin 20UI/50mL: BTĐ running 4.5 mL/h (= 0.03 UI/min).`);
  }
  if (chkEpi) {
    const dose = document.getElementById('lbl-dose-epi')?.textContent || '';
    const rate = document.getElementById('rate-epi')?.textContent || '';
    lines.push(`3. Epinephrine 4mg/50mL: BTĐ running ${rate} mL/h (= ${dose}).`);
  }
  if (chkIno) {
    const drug = (document.getElementById('sel-ino-drug') as HTMLSelectElement | null)?.value || 'DOBU';
    const dose = document.getElementById('lbl-dose-ino')?.textContent || '';
    const rate = document.getElementById('rate-ino')?.textContent || '';
    lines.push(`4. ${drug} (Pha BTĐ 50mL): BTĐ running ${rate} mL/h (= ${dose}).`);
  }

  lines.push(``);
  lines.push(`Mục tiêu: MAP ≥ 65 mmHg. Đặt CVC & A-Line theo dõi huyết động liên tục.`);

  const hisOrderBox = document.getElementById('his-order-text');
  if (hisOrderBox) hisOrderBox.textContent = lines.join('\n');
}

export function copyHISOrder(): void {
  const text = document.getElementById('his-order-text')?.textContent || '';
  navigator.clipboard.writeText(text).then(() => {
    alert('Đã sao chép y lệnh bệnh án vào bộ nhớ tạm!');
  });
}

export function initVasopressorStudio(): void {
  const inputs = document.querySelectorAll(
    '#p-gender, #p-height, #p-weight, #chk-ne, #sld-ne, #conc-ne, #chk-vaso, #chk-epi, #sld-epi, #conc-epi, #chk-ino, #sel-ino-drug, #sld-ino, #conc-ino, #h-sbp, #h-dbp, #h-hr, #h-lactate, #h-scvo2'
  );

  inputs.forEach(inp => {
    inp.addEventListener('input', updateStudio);
    inp.addEventListener('change', updateStudio);
  });

  const btnCopy = document.querySelector('.btn-copy');
  if (btnCopy) btnCopy.addEventListener('click', copyHISOrder);

  const plrInputs = document.querySelectorAll('#plr-pp1, #plr-pp2');
  plrInputs.forEach(inp => {
    inp.addEventListener('input', calcPLR);
  });

  const revInputs = document.querySelectorAll('#rev-rate, #rev-drug, #rev-weight');
  revInputs.forEach(inp => {
    inp.addEventListener('input', calcReverse);
    inp.addEventListener('change', calcReverse);
  });

  updateStudio();
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.calcIBW = calcIBW;
  win.syncDoseInput = syncDoseInput;
  win.switchTab = switchTab;
  win.loadPreset = loadPreset;
  win.updateStudio = updateStudio;
  win.calcPLR = calcPLR;
  win.calcReverse = calcReverse;
  win.copyHISOrder = copyHISOrder;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVasopressorStudio);
  } else {
    initVasopressorStudio();
  }
}
