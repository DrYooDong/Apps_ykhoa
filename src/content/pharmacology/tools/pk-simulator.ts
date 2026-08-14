/**
 * CliniPortal — Pharmacokinetic (PK) Simulator (TypeScript Module)
 */

export function initPkSimulator(): void {
  const canvas = document.getElementById('pk-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const sDose = document.getElementById('slider-dose') as HTMLInputElement | null;
  const st12 = document.getElementById('slider-t12') as HTMLInputElement | null;
  const sTau = document.getElementById('slider-tau') as HTMLInputElement | null;
  const sVd = document.getElementById('slider-vd') as HTMLInputElement | null;

  function drawPkCurve() {
    if (!ctx || !canvas) return;
    const dose = parseFloat(sDose?.value || '500');
    const t12 = parseFloat(st12?.value || '6');
    const tau = parseFloat(sTau?.value || '12');
    const vd = parseFloat(sVd?.value || '35');

    const valDose = document.getElementById('val-dose');
    const valT12 = document.getElementById('val-t12');
    const valTau = document.getElementById('val-tau');
    const valVd = document.getElementById('val-vd');

    if (valDose) valDose.textContent = dose.toString();
    if (valT12) valT12.textContent = t12.toString();
    if (valTau) valTau.textContent = tau.toString();
    if (valVd) valVd.textContent = vd.toString();

    const ke = Math.LN2 / t12;
    const w = canvas.width;
    const h = canvas.height;
    const padX = 40;
    const padY = 30;
    const plotW = w - padX - 20;
    const plotH = h - padY - 20;

    ctx.clearRect(0, 0, w, h);

    // Grid background
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = padX; x <= w - 20; x += 60) {
      ctx.moveTo(x, 10);
      ctx.lineTo(x, h - padY);
    }
    for (let y = 10; y <= h - padY; y += 40) {
      ctx.moveTo(padX, y);
      ctx.lineTo(w - 20, y);
    }
    ctx.stroke();

    // Reference lines: MEC (10) & MTC (30)
    const maxConcScale = 40; // max Y = 40 mcg/ml
    const yMec = h - padY - (10 / maxConcScale) * plotH;
    const yMtc = h - padY - (30 / maxConcScale) * plotH;

    // MEC green line
    ctx.strokeStyle = '#059669';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padX, yMec);
    ctx.lineTo(w - 20, yMec);
    ctx.stroke();

    // MTC red line
    ctx.strokeStyle = '#e11d48';
    ctx.beginPath();
    ctx.moveTo(padX, yMtc);
    ctx.lineTo(w - 20, yMtc);
    ctx.stroke();
    ctx.setLineDash([]);

    // Calculate multi-dose PK curve over 48 hours
    const totalHours = 48;
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 3;
    ctx.beginPath();

    let maxC = 0;
    let minC = 999;

    for (let px = 0; px <= plotW; px++) {
      const t = (px / plotW) * totalHours;
      let cp = 0;

      // Sum doses given at 0, tau, 2*tau, 3*tau...
      for (let dTime = 0; dTime <= t; dTime += tau) {
        const dt = t - dTime;
        cp += (dose / vd) * Math.exp(-ke * dt);
      }

      if (cp > maxC) maxC = cp;
      if (t > tau && cp < minC) minC = cp;

      const py = h - padY - (Math.min(cp, maxConcScale) / maxConcScale) * plotH;

      if (px === 0) ctx.moveTo(padX + px, py);
      else ctx.lineTo(padX + px, py);
    }
    ctx.stroke();

    // Update stats
    const statCmax = document.getElementById('stat-cmax');
    const statCmin = document.getElementById('stat-cmin');
    const statAuc = document.getElementById('stat-auc');

    if (statCmax) statCmax.textContent = maxC.toFixed(1);
    if (statCmin) statCmin.textContent = (minC < 990 ? minC.toFixed(1) : (maxC * 0.4).toFixed(1));
    if (statAuc) statAuc.textContent = Math.round((dose / (vd * ke))).toString();
  }

  [sDose, st12, sTau, sVd].forEach(s => {
    s?.addEventListener('input', drawPkCurve);
  });
  drawPkCurve();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPkSimulator);
  } else {
    initPkSimulator();
  }
}
