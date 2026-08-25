/**
 * electrolyte-canvas.js — Electrolyte Pro Studio
 * Visualizes 4 key electrolytes (Na, K, Ca, Mg) on a dynamic HTML5 Canvas Bar Chart
 * with normal physiological safety corridors & live patient value pins.
 */

class ElectrolyteBalanceCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this._resizeCanvas();
  }

  _resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = (rect.width || 580) * dpr;
    this.canvas.height = (rect.height || 260) * dpr;
    this.ctx.scale(dpr, dpr);
    this.displayWidth = rect.width || 580;
    this.displayHeight = rect.height || 260;
  }

  render(elyteData) {
    if (!this.canvas) return;
    this._resizeCanvas();

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    this.ctx.clearRect(0, 0, this.displayWidth, this.displayHeight);

    const ions = [
      {
        name: "Na⁺ (Natri)",
        val: elyteData.naCurrent,
        unit: "mmol/L",
        minNorm: 135,
        maxNorm: 145,
        minScale: 100,
        maxScale: 170,
        color: "#0ea5e9"
      },
      {
        name: "K⁺ (Kali)",
        val: elyteData.kVal,
        unit: "mmol/L",
        minNorm: 3.5,
        maxNorm: 5.0,
        minScale: 1.5,
        maxScale: 8.5,
        color: "#f59e0b"
      },
      {
        name: "Ca²⁺ (Hiệu chỉnh)",
        val: ELECTROLYTE_CRITERIA.calculateCorrectedCalcium(elyteData.caVal, elyteData.caAlb),
        unit: "mmol/L",
        minNorm: 2.20,
        maxNorm: 2.60,
        minScale: 1.20,
        maxScale: 4.00,
        color: "#8b5cf6"
      },
      {
        name: "Mg²⁺ (Magie)",
        val: elyteData.mgVal || 0.85,
        unit: "mmol/L",
        minNorm: 0.75,
        maxNorm: 1.05,
        minScale: 0.30,
        maxScale: 1.80,
        color: "#10b981"
      }
    ];

    const numCols = ions.length;
    const colWidth = (this.displayWidth - 60) / numCols;
    const paddingLeft = 40;
    const paddingTop = 30;
    const paddingBottom = 40;
    const barHeight = this.displayHeight - paddingTop - paddingBottom;

    ions.forEach((ion, idx) => {
      const colX = paddingLeft + idx * colWidth + 15;
      const barW = colWidth - 30;

      // 1. Full Scale Track Background
      this.ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)';
      this.ctx.beginPath();
      this.ctx.roundRect(colX, paddingTop, barW, barHeight, 8);
      this.ctx.fill();

      // Helper Y converter
      const getY = (val) => {
        const pct = (val - ion.minScale) / (ion.maxScale - ion.minScale);
        const clampedPct = Math.max(0, Math.min(1, pct));
        return paddingTop + barHeight - (clampedPct * barHeight);
      };

      // 2. Green Physiological Safety Corridor (Normal Range Zone)
      const normTopY = getY(ion.maxNorm);
      const normBotY = getY(ion.minNorm);
      const normH = Math.max(4, normBotY - normTopY);

      this.ctx.fillStyle = isDark ? 'rgba(34, 197, 94, 0.25)' : 'rgba(34, 197, 94, 0.3)';
      this.ctx.fillRect(colX, normTopY, barW, normH);

      this.ctx.strokeStyle = '#22c55e';
      this.ctx.lineWidth = 1;
      this.ctx.setLineDash([2, 2]);
      this.ctx.strokeRect(colX, normTopY, barW, normH);
      this.ctx.setLineDash([]);

      // 3. Patient Value Indicator Bar / Pin
      const patY = getY(ion.val);
      const isAbnormal = ion.val < ion.minNorm || ion.val > ion.maxNorm;

      // Value Fill Bar from Normal Center
      this.ctx.fillStyle = isAbnormal ? (ion.val < ion.minNorm ? '#3b82f6' : '#ef4444') : '#22c55e';
      this.ctx.beginPath();
      this.ctx.arc(colX + barW / 2, patY, 8, 0, 2 * Math.PI);
      this.ctx.fill();

      this.ctx.lineWidth = 2.5;
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.stroke();

      // 4. Value Text & Labels
      this.ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
      this.ctx.font = '800 12px "Plus Jakarta Sans", sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(`${ion.val.toFixed(idx === 0 ? 0 : (idx === 1 ? 1 : 2))}`, colX + barW / 2, patY - 12);

      // Ion Title below
      this.ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
      this.ctx.font = '700 11px "Inter", sans-serif';
      this.ctx.fillText(ion.name, colX + barW / 2, this.displayHeight - 12);
    });
  }
}
