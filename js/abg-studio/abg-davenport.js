/**
 * abg-davenport.js — Blood Gas Pro Studio
 * Quản lý & Render Biểu Đồ Davenport & Siggaard-Andersen Acid-Base Nomogram bằng HTML5 Canvas.
 * Hỗ trợ vẽ Isobar curves, Polygon vùng bù trừ sinh lý, điểm chấm động & Tương tác click/drag.
 */

class ABGDavenportNomogram {
  constructor(canvasId, onPointSelectedCallback) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error(`Canvas with id ${canvasId} not found.`);
      return;
    }
    this.ctx = this.canvas.getContext('2d');
    this.onPointSelected = onPointSelectedCallback;

    // Giới hạn trục tọa độ
    this.minPh = 6.8;
    this.maxPh = 7.8;
    this.minPco2 = 10;
    this.maxPco2 = 110;

    // Offsets lề
    this.paddingLeft = 50;
    this.paddingBottom = 40;
    this.paddingTop = 25;
    this.paddingRight = 25;

    this._resizeCanvas();
    this._bindEvents();
  }

  _resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = (rect.width || 560) * dpr;
    this.canvas.height = (rect.height || 320) * dpr;
    this.ctx.scale(dpr, dpr);
    this.displayWidth = rect.width || 560;
    this.displayHeight = rect.height || 320;
    this.graphWidth = this.displayWidth - this.paddingLeft - this.paddingRight;
    this.graphHeight = this.displayHeight - this.paddingTop - this.paddingBottom;
  }

  _x(ph) {
    return this.paddingLeft + ((ph - this.minPh) / (this.maxPh - this.minPh)) * this.graphWidth;
  }

  _y(pco2) {
    return this.paddingTop + this.graphHeight - ((pco2 - this.minPco2) / (this.maxPco2 - this.minPco2)) * this.graphHeight;
  }

  _phFromX(x) {
    return this.minPh + ((x - this.paddingLeft) / this.graphWidth) * (this.maxPh - this.minPh);
  }

  _pco2FromY(y) {
    return this.maxPco2 - ((y - this.paddingTop) / this.graphHeight) * (this.maxPco2 - this.minPco2);
  }

  _drawPolygon(points, fillColor, label, labelX, labelY) {
    if (points.length === 0) return;
    this.ctx.beginPath();
    this.ctx.moveTo(this._x(points[0].ph), this._y(points[0].pco2));
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(this._x(points[i].ph), this._y(points[i].pco2));
    }
    this.ctx.closePath();
    this.ctx.fillStyle = fillColor;
    this.ctx.fill();

    if (label) {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      this.ctx.fillStyle = isDark ? '#94a3b8' : '#334155';
      this.ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(label, this._x(labelX), this._y(labelY));
    }
  }

  _drawIsobars() {
    // Henderson-Hasselbalch: pCO2 = (HCO3- * 10^(pH - 6.1)) / 0.0301
    const hco3Values = [10, 15, 20, 24, 30, 40, 50];
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    hco3Values.forEach(hco3 => {
      this.ctx.beginPath();
      let first = true;
      for (let ph = 6.85; ph <= 7.75; ph += 0.02) {
        const pco2 = (hco3 * Math.pow(10, ph - 6.1)) / 0.0301;
        if (pco2 >= this.minPco2 && pco2 <= this.maxPco2) {
          const x = this._x(ph);
          const y = this._y(pco2);
          if (first) { this.ctx.moveTo(x, y); first = false; }
          else { this.ctx.lineTo(x, y); }
        }
      }
      this.ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(100, 116, 139, 0.2)';
      this.ctx.lineWidth = 1;
      this.ctx.setLineDash([2, 3]);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    });
  }

  _drawGrid() {
    this._resizeCanvas();
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    this.ctx.clearRect(0, 0, this.displayWidth, this.displayHeight);

    // 1. Normal Zone (Xanh lá)
    this._drawPolygon([
      { ph: 7.35, pco2: 35 }, { ph: 7.45, pco2: 35 }, { ph: 7.45, pco2: 45 }, { ph: 7.35, pco2: 45 }
    ], isDark ? 'rgba(34, 197, 94, 0.25)' : 'rgba(34, 197, 94, 0.35)', 'Normal', 7.4, 40);

    // 2. Acute Resp Acidosis
    this._drawPolygon([
      { ph: 7.35, pco2: 45 }, { ph: 7.15, pco2: 95 }, { ph: 7.05, pco2: 95 }, { ph: 7.25, pco2: 45 }
    ], isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.2)', 'Ac. Resp. Aci.', 7.15, 75);

    // 3. Chronic Resp Acidosis
    this._drawPolygon([
      { ph: 7.35, pco2: 45 }, { ph: 7.30, pco2: 95 }, { ph: 7.20, pco2: 95 }, { ph: 7.25, pco2: 45 }
    ], isDark ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.35)', 'Chr. Resp. Aci.', 7.30, 80);

    // 4. Acute Resp Alkalosis
    this._drawPolygon([
      { ph: 7.45, pco2: 35 }, { ph: 7.65, pco2: 15 }, { ph: 7.75, pco2: 15 }, { ph: 7.55, pco2: 35 }
    ], isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.2)', 'Ac. Resp. Alk.', 7.65, 20);

    // 5. Chronic Resp Alkalosis
    this._drawPolygon([
      { ph: 7.45, pco2: 35 }, { ph: 7.50, pco2: 15 }, { ph: 7.60, pco2: 15 }, { ph: 7.55, pco2: 35 }
    ], isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.35)', 'Chr. Resp. Alk.', 7.50, 20);

    // 6. Metabolic Acidosis
    this._drawPolygon([
      { ph: 7.35, pco2: 35 }, { ph: 6.95, pco2: 15 }, { ph: 7.10, pco2: 10 }, { ph: 7.45, pco2: 35 }
    ], isDark ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.25)', 'Met. Acidosis', 7.1, 20);

    // 7. Metabolic Alkalosis
    this._drawPolygon([
      { ph: 7.45, pco2: 45 }, { ph: 7.55, pco2: 60 }, { ph: 7.65, pco2: 60 }, { ph: 7.55, pco2: 45 }
    ], isDark ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.25)', 'Met. Alkalosis', 7.6, 55);

    // Draw Isobars
    this._drawIsobars();

    // Axes lines
    this.ctx.strokeStyle = isDark ? '#475569' : '#94a3b8';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.paddingLeft, this.paddingTop);
    this.ctx.lineTo(this.paddingLeft, this.displayHeight - this.paddingBottom);
    this.ctx.lineTo(this.displayWidth - this.paddingRight, this.displayHeight - this.paddingBottom);
    this.ctx.stroke();

    // X Axis Labels (pH)
    this.ctx.fillStyle = isDark ? '#cbd5e1' : '#475569';
    this.ctx.font = '600 11px "Inter", sans-serif';
    this.ctx.textAlign = 'center';
    for (let ph = 6.8; ph <= 7.8; ph += 0.1) {
      const x = this._x(ph);
      const y = this.displayHeight - this.paddingBottom;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x, y + 4);
      this.ctx.stroke();
      this.ctx.fillText(ph.toFixed(1), x, y + 16);
    }
    this.ctx.fillText("pH Máu Động Mạch", this.displayWidth / 2, this.displayHeight - 4);

    // Y Axis Labels (pCO2)
    this.ctx.textAlign = 'right';
    this.ctx.textBaseline = 'middle';
    for (let pco2 = 10; pco2 <= 110; pco2 += 10) {
      const y = this._y(pco2);
      const x = this.paddingLeft;
      this.ctx.beginPath();
      this.ctx.moveTo(x - 4, y);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      this.ctx.fillText(pco2, x - 8, y);
    }

    this.ctx.save();
    this.ctx.translate(14, this.displayHeight / 2);
    this.ctx.rotate(-Math.PI / 2);
    this.ctx.textAlign = 'center';
    this.ctx.fillText("PaCO₂ (mmHg)", 0, 0);
    this.ctx.restore();
  }

  plotPoint(ph, pco2) {
    this._drawGrid();
    if (!ph || !pco2 || ph < 6.7 || ph > 7.9 || pco2 < 5 || pco2 > 120) return;

    const x = this._x(ph);
    const y = this._y(pco2);

    // Dashed coordinate tracking lines
    this.ctx.strokeStyle = 'rgba(2, 132, 199, 0.6)';
    this.ctx.lineWidth = 1.5;
    this.ctx.setLineDash([4, 4]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.paddingLeft, y);
    this.ctx.lineTo(x, y);
    this.ctx.lineTo(x, this.displayHeight - this.paddingBottom);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // Outer Aura Glow
    this.ctx.beginPath();
    this.ctx.arc(x, y, 12, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'rgba(2, 132, 199, 0.25)';
    this.ctx.fill();

    // Inner Glowing Red Pin
    this.ctx.beginPath();
    this.ctx.arc(x, y, 6, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#ef4444';
    this.ctx.fill();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.stroke();

    // Coordinate Label Tag
    this.ctx.fillStyle = '#0ea5e9';
    this.ctx.font = '800 12px "Plus Jakarta Sans", sans-serif';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`pH ${ph.toFixed(2)}, PaCO₂ ${pco2.toFixed(1)}`, x + 10, y - 8);
  }

  _bindEvents() {
    if (!this.canvas) return;
    let isDragging = false;

    const updatePointFromMouse = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let ph = this._phFromX(mouseX);
      let pco2 = this._pco2FromY(mouseY);

      // Clamp
      ph = Math.max(6.8, Math.min(7.8, parseFloat(ph.toFixed(2))));
      pco2 = Math.max(10, Math.min(110, parseFloat(pco2.toFixed(1))));

      if (this.onPointSelected) {
        this.onPointSelected(ph, pco2);
      }
    };

    this.canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      updatePointFromMouse(e);
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (isDragging) updatePointFromMouse(e);
    });

    window.addEventListener('mouseup', () => { isDragging = false; });
  }
}
