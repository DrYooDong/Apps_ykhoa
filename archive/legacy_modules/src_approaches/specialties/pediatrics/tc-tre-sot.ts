/**
 * CliniPortal — Tiếp Cận Sốt Ở Trẻ Em & Pediatric Antipyretic Calculator (TypeScript Module)
 */

export function scrollToSec(secId: string): void {
  const el = document.getElementById(secId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('.quick-nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = Array.from(document.querySelectorAll('.quick-nav-btn')).find(b => (b as HTMLElement).getAttribute('onclick')?.includes(secId) || (b as HTMLElement).dataset.section === secId);
    if (activeBtn) activeBtn.classList.add('active');
  }
}

export function switchMainTab(tabId: string, btnEl: HTMLElement): void {
  const container = btnEl.closest('.section-card');
  if (!container) return;
  container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  container.querySelectorAll('.tab-content-panel').forEach(p => p.classList.remove('active'));

  btnEl.classList.add('active');
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');
}

let currentSite = 'rectal';

export function setSitePreset(site: string, btnEl?: HTMLElement): void {
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  currentSite = site;
  const slider = document.getElementById('tempSlider') as HTMLInputElement | null;
  if (slider) updateTempSim(parseFloat(slider.value));
}

export function updateTempSim(val: number): void {
  const tempValDisp = document.getElementById('tempValDisp');
  const rectalResultVal = document.getElementById('rectalResultVal');
  const siteDiffDisp = document.getElementById('siteDiffDisp');
  const tempMeterFill = document.getElementById('tempMeterFill');
  const badge = document.getElementById('feverBadge');
  const explanation = document.getElementById('tempSimExplanation');

  if (!tempValDisp || !rectalResultVal || !siteDiffDisp || !tempMeterFill || !badge || !explanation) return;

  tempValDisp.innerText = val.toFixed(1) + ' °C';

  let rectal = val;
  let siteName = 'Hậu môn (Chuẩn)';

  if (currentSite === 'oral') {
    rectal = val + 0.4;
    siteName = 'Miệng (+0.4°C)';
  } else if (currentSite === 'axillary') {
    rectal = val + 0.5;
    siteName = 'Trán / Nách (+0.5°C)';
  } else if (currentSite === 'tympanic') {
    rectal = val + 0.8;
    siteName = 'Ống tai (+0.8°C)';
  }

  rectalResultVal.innerText = rectal.toFixed(1) + ' °C';
  siteDiffDisp.innerText = siteName;

  const fillPct = Math.min(100, Math.max(0, ((rectal - 35.5) / 7.0) * 100));
  tempMeterFill.style.width = fillPct + '%';

  if (rectal >= 41.5) {
    badge.innerText = 'SỐT CỰC CAO (HYPERPYREXIA ≥ 41.5°C)';
    badge.style.background = 'rgba(239, 68, 68, 0.2)';
    badge.style.color = '#dc2626';
    explanation.innerText = 'Sốt cực cao: Cảnh báo nguy cơ tổn thương CNS hoặc nhiễm trùng/xuất huyết não nặng!';
  } else if (rectal >= 39.0) {
    badge.innerText = 'SỐT CAO (39.0°C - 41.4°C)';
    badge.style.background = 'rgba(239, 68, 68, 0.15)';
    badge.style.color = '#ef4444';
    explanation.innerText = 'Sốt cao: Cân nhắc dùng thuốc hạ sốt (Paracetamol / Ibuprofen) để giảm quấy khóc, khó chịu.';
  } else if (rectal >= 38.0) {
    badge.innerText = 'SỐT VỪA / SỐT NHẸ (38.0°C - 38.9°C)';
    badge.style.background = 'rgba(245, 158, 11, 0.15)';
    badge.style.color = '#d97706';
    explanation.innerText = 'Sốt nhẹ/vừa: Phản ứng sinh lý có lợi, không bắt buộc dùng hạ sốt nếu trẻ chơi đùa bình thường.';
  } else {
    badge.innerText = 'KHÔNG SỐT / THÂN NHIỆT BÌNH THƯỜNG (< 38.0°C)';
    badge.style.background = 'rgba(16, 185, 129, 0.15)';
    badge.style.color = '#10b981';
    explanation.innerText = 'Thân nhiệt trong giới hạn bình thường.';
  }
}

export function setWeightPreset(wt: number, btnEl?: HTMLElement): void {
  document.querySelectorAll('#sec-cdss .preset-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  const slider = document.getElementById('wtSlider') as HTMLInputElement | null;
  if (slider) slider.value = wt.toString();
  updateDoseCalc(wt);
}

export function updateDoseCalc(wt: number): void {
  const wtValDisp = document.getElementById('wtValDisp');
  const wtDispBox = document.getElementById('wtDispBox');
  const paraDoseMg = document.getElementById('paraDoseMg');
  const paraSyrupVol = document.getElementById('paraSyrupVol');
  const paraMaxDay = document.getElementById('paraMaxDay');
  const ibuDoseMg = document.getElementById('ibuDoseMg');
  const ibuSyrupVol = document.getElementById('ibuSyrupVol');
  const ibuMaxDay = document.getElementById('ibuMaxDay');

  if (!wtValDisp || !wtDispBox || !paraDoseMg || !paraSyrupVol || !paraMaxDay || !ibuDoseMg || !ibuSyrupVol || !ibuMaxDay) return;

  wtValDisp.innerText = wt.toFixed(1) + ' kg';
  wtDispBox.innerText = wt.toFixed(1) + ' kg';

  // Paracetamol: 10 - 15 mg/kg
  const pMin = Math.round(wt * 10);
  const pMax = Math.round(wt * 15);
  const pDay = Math.round(wt * 60);
  const pSyr = (pMax / 160 * 5).toFixed(1);

  paraDoseMg.innerText = `${pMin} - ${pMax} mg / lần`;
  paraSyrupVol.innerHTML = `Siro (160mg/5ml): <strong>~${pSyr} ml</strong> | Gói 150mg: <strong>${(pMax/150).toFixed(1)} gói</strong>`;
  paraMaxDay.innerText = `Dùng mỗi 4–6 giờ | Tối đa: ${pDay} mg/ngày`;

  // Ibuprofen: 5 - 10 mg/kg
  const iMin = Math.round(wt * 5);
  const iMax = Math.round(wt * 10);
  const iDay = Math.round(wt * 40);
  const iSyr = (iMax / 100 * 5).toFixed(1);

  ibuDoseMg.innerText = `${iMin} - ${iMax} mg / lần`;
  ibuSyrupVol.innerHTML = `Siro (100mg/5ml): <strong>~${iSyr} ml</strong> / lần`;
  ibuMaxDay.innerText = `Dùng mỗi 6–8 giờ | Tối đa: ${iDay} mg/ngày`;

  // Age check for Ibuprofen
  const ageMonthsInput = document.getElementById('ageMonthsInput') as HTMLInputElement | null;
  const ageM = ageMonthsInput ? (parseFloat(ageMonthsInput.value) || 12) : 12;
  const ibuAlert = document.getElementById('ibuAgeAlert');
  if (ibuAlert) {
    ibuAlert.style.display = ageM < 6 ? 'block' : 'none';
  }
}

if (typeof window !== 'undefined') {
  (window as any).scrollToSec = scrollToSec;
  (window as any).switchMainTab = switchMainTab;
  (window as any).setSitePreset = setSitePreset;
  (window as any).updateTempSim = updateTempSim;
  (window as any).setWeightPreset = setWeightPreset;
  (window as any).updateDoseCalc = updateDoseCalc;
}

export function initPediatricFever(): void {
  const tempSlider = document.getElementById('tempSlider') as HTMLInputElement | null;
  if (tempSlider) {
    tempSlider.addEventListener('input', (e) => updateTempSim(parseFloat((e.target as HTMLInputElement).value)));
  }

  const wtSlider = document.getElementById('wtSlider') as HTMLInputElement | null;
  if (wtSlider) {
    wtSlider.addEventListener('input', (e) => updateDoseCalc(parseFloat((e.target as HTMLInputElement).value)));
  }

  document.getElementById('ageMonthsInput')?.addEventListener('input', () => {
    const wt = wtSlider ? parseFloat(wtSlider.value) : 10;
    updateDoseCalc(wt);
  });

  updateTempSim(38.5);
  updateDoseCalc(10);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPediatricFever);
  } else {
    initPediatricFever();
  }
}
