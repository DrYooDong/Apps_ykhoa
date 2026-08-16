/**
 * CliniPortal — Polytrauma & Massive Transfusion Protocol (MTP) Studio (TypeScript Module)
 * ATLS 10th & CRASH-2: TASH Score, ABC Score, Shock Index (SI), 1:1:1 Blood Component Coordinator & TXA Protocol
 */

export interface PolytraumaTASHParams {
  sbp: number;
  hr: number;
  hb: number;
  be: number;
  sex: string;
  pelvicFx: boolean;
  femurFx: boolean;
  fastPos: boolean;
}

export interface PolytraumaABCParams {
  isPenetrating: boolean;
  sbp: number;
  hr: number;
  fastPos: boolean;
}

export function toggleBtn(id: string): void {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.classList.toggle('active');
  const icon = btn.querySelector('.fa-check') as HTMLElement | null;
  if (icon) {
    icon.style.display = btn.classList.contains('active') ? 'inline-block' : 'none';
  }
  calculateAll();
}

export function setToggle(id: string, state: boolean): void {
  const btn = document.getElementById(id);
  if (!btn) return;
  if (state) btn.classList.add('active');
  else btn.classList.remove('active');
  const icon = btn.querySelector('.fa-check') as HTMLElement | null;
  if (icon) icon.style.display = state ? 'inline-block' : 'none';
}

export function loadPreset(type: string): void {
  const setVal = (id: string, val: string) => {
    const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
    if (el) el.value = val;
  };

  if (type === 'pelvic') {
    setVal('inp-sex', 'male');
    setVal('inp-sbp', '85');
    setVal('inp-hr', '130');
    setVal('inp-hb', '8.0');
    setVal('inp-be', '-8');
    setVal('inp-ebl', '2500');
    setToggle('tg-fast', true);
    setToggle('tg-pelvic', true);
    setToggle('tg-femur', false);
    setToggle('tg-penetrating', false);
  } else if (type === 'penetrating') {
    setVal('inp-sex', 'male');
    setVal('inp-sbp', '75');
    setVal('inp-hr', '140');
    setVal('inp-hb', '7.0');
    setVal('inp-be', '-12');
    setVal('inp-ebl', '3000');
    setToggle('tg-fast', true);
    setToggle('tg-pelvic', false);
    setToggle('tg-femur', false);
    setToggle('tg-penetrating', true);
  } else if (type === 'mild') {
    setVal('inp-sex', 'female');
    setVal('inp-sbp', '115');
    setVal('inp-hr', '90');
    setVal('inp-hb', '12.5');
    setVal('inp-be', '-1');
    setVal('inp-ebl', '500');
    setToggle('tg-fast', false);
    setToggle('tg-pelvic', false);
    setToggle('tg-femur', false);
    setToggle('tg-penetrating', false);
  }
  calculateAll();
}

export function calculateAll(): void {
  const sex = (document.getElementById('inp-sex') as HTMLSelectElement | null)?.value || 'male';
  const weight = parseFloat((document.getElementById('inp-weight') as HTMLInputElement | null)?.value || '70') || 70;
  const sbp = parseFloat((document.getElementById('inp-sbp') as HTMLInputElement | null)?.value || '120') || 120;
  const hr = parseFloat((document.getElementById('inp-hr') as HTMLInputElement | null)?.value || '80') || 80;
  const hb = parseFloat((document.getElementById('inp-hb') as HTMLInputElement | null)?.value || '12') || 12;
  const be = parseFloat((document.getElementById('inp-be') as HTMLInputElement | null)?.value || '0') || 0;
  const ebl = parseFloat((document.getElementById('inp-ebl') as HTMLInputElement | null)?.value || '1000') || 1000;

  const fastPos = document.getElementById('tg-fast')?.classList.contains('active') || false;
  const pelvicFx = document.getElementById('tg-pelvic')?.classList.contains('active') || false;
  const femurFx = document.getElementById('tg-femur')?.classList.contains('active') || false;
  const isPenetrating = document.getElementById('tg-penetrating')?.classList.contains('active') || false;

  const lblEbl = document.getElementById('lbl-ebl');
  if (lblEbl) {
    lblEbl.textContent = `${ebl.toLocaleString()} mL (~${Math.round((ebl / (weight * 70)) * 100)}% thể tích)`;
  }

  const win = window as any;
  const engine = win.PolytraumaEngine;
  if (!engine) return;

  // 1. Shock Index
  const siRes = engine.calculateShockIndex(hr, sbp);
  const resSi = document.getElementById('res-si');
  if (resSi) {
    resSi.textContent = `${siRes.si} (${siRes.severity})`;
    resSi.style.color = siRes.color;
  }

  // 2. TASH Score
  const tashRes = engine.calculateTASH({ sbp, hr, hb, be, sex, pelvicFx, femurFx, fastPos });
  const resTash = document.getElementById('res-tash');
  const resTashProb = document.getElementById('res-tash-prob');
  if (resTash) resTash.textContent = `${tashRes.score} điểm`;
  if (resTashProb) resTashProb.textContent = `${tashRes.probability.toFixed(1)}%`;

  // 3. ABC Score
  const abcRes = engine.calculateABC({ isPenetrating, sbp, hr, fastPos });
  const resAbc = document.getElementById('res-abc');
  if (resAbc) resAbc.textContent = `${abcRes.score}/4 điểm`;

  // 4. Update STAT Banner
  const banner = document.getElementById('stat-banner');
  const statTitle = document.getElementById('stat-title');
  const statIcon = document.getElementById('stat-icon');

  if (banner && statTitle && statIcon) {
    if (abcRes.isMTPIndicated || tashRes.probability > 30 || siRes.si >= 1.0) {
      banner.style.background = 'rgba(220, 38, 38, 0.1)';
      banner.style.borderColor = 'rgba(220, 38, 38, 0.3)';
      statTitle.textContent = 'KÍCH HOẠT GÓI TRUYỀN MÁU KHỐI LƯỢNG LỚN (MTP 1:1:1)';
      statTitle.style.color = 'var(--color-rose, #dc2626)';
      statIcon.className = 'fa-solid fa-triangle-exclamation';
      statIcon.style.color = 'var(--color-rose, #dc2626)';
    } else {
      banner.style.background = 'rgba(22, 163, 74, 0.1)';
      banner.style.borderColor = 'rgba(22, 163, 74, 0.3)';
      statTitle.textContent = 'CHƯA CÓ CHỈ ĐỊNH MTP (THEO DÕI SÁT HÌNH ẢNH & SINH HIỆU)';
      statTitle.style.color = 'var(--color-success)';
      statIcon.className = 'fa-solid fa-circle-check';
      statIcon.style.color = 'var(--color-success)';
    }
  }

  // 5. MTP Packs Calculation (1:1:1)
  const mtpPacks = engine.calculateMTPPack(ebl);
  const valPrbc = document.getElementById('val-prbc');
  const valFfp = document.getElementById('val-ffp');
  const valPlatelets = document.getElementById('val-platelets');

  if (valPrbc) valPrbc.textContent = mtpPacks.prbcUnits;
  if (valFfp) valFfp.textContent = mtpPacks.ffpUnits;
  if (valPlatelets) valPlatelets.textContent = mtpPacks.plateletPools;

  generateHISOrder({ sbp, hr, hb, be, ebl, siRes, tashRes, abcRes, mtpPacks });
}

export function generateHISOrder({ sbp, hr, hb, be, ebl, siRes, tashRes, abcRes, mtpPacks }: any): void {
  const lines: string[] = [];
  lines.push(
    `Y LỆNH MTP: SBP ${sbp}mmHg | HR ${hr}bpm | SI: ${siRes.si} | TASH: ${tashRes.score}pt (${tashRes.probability.toFixed(1)}%) | ABC: ${abcRes.score}/4.`
  );
  lines.push(
    `MTP Packs 1:1:1: ${mtpPacks.prbcUnits} KHC + ${mtpPacks.ffpUnits} FFP + ${mtpPacks.plateletPools} Pool Tiểu cầu.`
  );
  lines.push(`Thuốc: TXA 1g IV bolus 10 min + 1g IV duy trì 8h | Calcium Gluconate 1g IV.`);

  const hisOrderText = document.getElementById('his-order-text') as HTMLTextAreaElement | null;
  if (hisOrderText) hisOrderText.value = lines.join('\n');
}

export function copyHISOrder(): void {
  const hisOrderText = document.getElementById('his-order-text') as HTMLTextAreaElement | null;
  const text = hisOrderText?.value || '';
  navigator.clipboard.writeText(text).then(() => {
    alert('Đã sao chép Y lệnh MTP cấp cứu!');
  });
}

export function initPolytraumaStudio(): void {
  const inputs = document.querySelectorAll(
    '#inp-sex, #inp-weight, #inp-sbp, #inp-hr, #inp-hb, #inp-be, #inp-ebl'
  );

  inputs.forEach(inp => {
    inp.addEventListener('input', calculateAll);
    inp.addEventListener('change', calculateAll);
  });

  calculateAll();
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.toggleBtn = toggleBtn;
  win.setToggle = setToggle;
  win.loadPreset = loadPreset;
  win.calculateAll = calculateAll;
  win.copyHISOrder = copyHISOrder;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPolytraumaStudio);
  } else {
    initPolytraumaStudio();
  }
}
