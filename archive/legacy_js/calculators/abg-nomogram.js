/**
 * abg-nomogram.js
 * Chịu trách nhiệm vẽ biểu đồ Toan kiềm (Acid-Base Nomogram) sử dụng HTML5 Canvas.
 * Biểu đồ có trục X: pH (6.9 - 7.7) và trục Y: pCO2 (10 - 100 mmHg).
 */

class ABGNomogram {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`Canvas with id ${canvasId} not found.`);
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        
        // Cấu hình tọa độ
        this.minPh = 6.9;
        this.maxPh = 7.7;
        this.minPco2 = 10;
        this.maxPco2 = 100;
        
        // Kích thước vẽ
        this.paddingLeft = 50;
        this.paddingBottom = 40;
        this.paddingTop = 20;
        this.paddingRight = 20;
        this.graphWidth = this.canvas.width - this.paddingLeft - this.paddingRight;
        this.graphHeight = this.canvas.height - this.paddingTop - this.paddingBottom;
    }

    // Chuyển đổi giá trị pH thành tọa độ pixel X
    _x(ph) {
        return this.paddingLeft + ((ph - this.minPh) / (this.maxPh - this.minPh)) * this.graphWidth;
    }

    // Chuyển đổi giá trị pCO2 thành tọa độ pixel Y
    _y(pco2) {
        return this.paddingTop + this.graphHeight - ((pco2 - this.minPco2) / (this.maxPco2 - this.minPco2)) * this.graphHeight;
    }

    // Vẽ một vùng đa giác
    _drawPolygon(points, color, label, labelX, labelY) {
        this.ctx.beginPath();
        this.ctx.moveTo(this._x(points[0].ph), this._y(points[0].pco2));
        for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(this._x(points[i].ph), this._y(points[i].pco2));
        }
        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill();

        if (label) {
            this.ctx.fillStyle = '#1e293b';
            this.ctx.font = '10px "Plus Jakarta Sans", sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(label, this._x(labelX), this._y(labelY));
        }
    }

    // Vẽ lại toàn bộ khung nền
    _drawGrid() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Các vùng bù trừ sinh lý (tương đối theo lý thuyết Siggaard-Andersen)
        // 1. Bình thường (Normal)
        this._drawPolygon([
            { ph: 7.35, pco2: 35 }, { ph: 7.45, pco2: 35 }, { ph: 7.45, pco2: 45 }, { ph: 7.35, pco2: 45 }
        ], 'rgba(34, 197, 94, 0.4)', 'Normal', 7.4, 40);

        // 2. Toan Hô Hấp Cấp (Acute Resp Acidosis)
        this._drawPolygon([
            { ph: 7.35, pco2: 45 }, { ph: 7.15, pco2: 90 }, { ph: 7.05, pco2: 90 }, { ph: 7.25, pco2: 45 }
        ], 'rgba(239, 68, 68, 0.2)', 'Ac. Resp. Aci.', 7.15, 75);

        // 3. Toan Hô Hấp Mạn (Chronic Resp Acidosis)
        this._drawPolygon([
            { ph: 7.35, pco2: 45 }, { ph: 7.30, pco2: 90 }, { ph: 7.20, pco2: 90 }, { ph: 7.25, pco2: 45 }
        ], 'rgba(239, 68, 68, 0.4)', 'Chr. Resp. Aci.', 7.30, 80);

        // 4. Kiềm Hô Hấp Cấp (Acute Resp Alkalosis)
        this._drawPolygon([
            { ph: 7.45, pco2: 35 }, { ph: 7.65, pco2: 15 }, { ph: 7.75, pco2: 15 }, { ph: 7.55, pco2: 35 }
        ], 'rgba(59, 130, 246, 0.2)', 'Ac. Resp. Alk.', 7.65, 20);

        // 5. Kiềm Hô Hấp Mạn (Chronic Resp Alkalosis)
        this._drawPolygon([
            { ph: 7.45, pco2: 35 }, { ph: 7.50, pco2: 15 }, { ph: 7.60, pco2: 15 }, { ph: 7.55, pco2: 35 }
        ], 'rgba(59, 130, 246, 0.4)', 'Chr. Resp. Alk.', 7.50, 20);

        // 6. Toan Chuyển Hóa (Metabolic Acidosis)
        this._drawPolygon([
            { ph: 7.35, pco2: 35 }, { ph: 6.95, pco2: 15 }, { ph: 7.10, pco2: 10 }, { ph: 7.45, pco2: 35 }
        ], 'rgba(245, 158, 11, 0.3)', 'Met. Aci.', 7.1, 20);

        // 7. Kiềm Chuyển Hóa (Metabolic Alkalosis)
        this._drawPolygon([
            { ph: 7.45, pco2: 45 }, { ph: 7.55, pco2: 60 }, { ph: 7.65, pco2: 60 }, { ph: 7.55, pco2: 45 }
        ], 'rgba(168, 85, 247, 0.3)', 'Met. Alk.', 7.6, 55);

        // Vẽ trục tọa độ
        this.ctx.strokeStyle = '#64748b';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        // Trục Y
        this.ctx.moveTo(this.paddingLeft, this.paddingTop);
        this.ctx.lineTo(this.paddingLeft, this.canvas.height - this.paddingBottom);
        // Trục X
        this.ctx.lineTo(this.canvas.width - this.paddingRight, this.canvas.height - this.paddingBottom);
        this.ctx.stroke();

        // Nhãn trục X (pH)
        this.ctx.fillStyle = '#334155';
        this.ctx.font = '12px "Inter", sans-serif';
        this.ctx.textAlign = 'center';
        for (let ph = 6.9; ph <= 7.7; ph += 0.1) {
            let x = this._x(ph);
            let y = this.canvas.height - this.paddingBottom;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y + 5);
            this.ctx.stroke();
            this.ctx.fillText(ph.toFixed(1), x, y + 18);
        }
        this.ctx.fillText("pH máu", this.canvas.width / 2, this.canvas.height - 5);

        // Nhãn trục Y (pCO2)
        this.ctx.textAlign = 'right';
        this.ctx.textBaseline = 'middle';
        for (let pco2 = 10; pco2 <= 100; pco2 += 10) {
            let y = this._y(pco2);
            let x = this.paddingLeft;
            this.ctx.beginPath();
            this.ctx.moveTo(x - 5, y);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
            this.ctx.fillText(pco2, x - 10, y);
        }
        this.ctx.save();
        this.ctx.translate(15, this.canvas.height / 2);
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.textAlign = 'center';
        this.ctx.fillText("pCO₂ (mmHg)", 0, 0);
        this.ctx.restore();
    }

    /**
     * Plot kết quả bệnh nhân lên biểu đồ
     * @param {number} ph - Độ pH
     * @param {number} pco2 - Phân áp CO2
     */
    plotPoint(ph, pco2) {
        this._drawGrid(); // Xóa cũ, vẽ lại nền

        if (!ph || !pco2 || ph < 6.5 || ph > 8.0 || pco2 < 0 || pco2 > 150) return; // Ra ngoài vùng

        const x = this._x(ph);
        const y = this._y(pco2);

        // Vẽ các đường gióng
        this.ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        this.ctx.lineWidth = 1.5;
        this.ctx.setLineDash([5, 5]);
        this.ctx.beginPath();
        this.ctx.moveTo(this.paddingLeft, y);
        this.ctx.lineTo(x, y);
        this.ctx.lineTo(x, this.canvas.height - this.paddingBottom);
        this.ctx.stroke();
        this.ctx.setLineDash([]); // Reset dash

        // Vẽ chấm tròn đỏ có viền trắng
        this.ctx.beginPath();
        this.ctx.arc(x, y, 6, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#ef4444';
        this.ctx.fill();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.stroke();

        // Chú thích giá trị kế bên
        this.ctx.fillStyle = '#0f172a';
        this.ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`(${ph}, ${pco2})`, x + 10, y - 10);
    }
}
