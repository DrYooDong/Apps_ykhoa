/**
 * Arrhythmia Pro Studio - High-Precision Gaussian Waveform ECG Engine (TypeScript Module)
 * CliniPortal Cardiology Module
 * Động cơ tổng hợp dạng sóng ECG y khoa siêu mượt bằng hàm Gaussian & Splines,
 * hỗ trợ 3 chế độ giao diện: Giấy in Hồng Y tế, Monitor Cấp cứu ICU Neon, và Đen trắng.
 */

import { ECGParams } from './arrhythmia-studio-scenarios';

export interface ECGTheme {
  bg: string;
  gridSmall: string;
  gridBig: string;
  trace: string;
  text: string;
}

export interface ECGCanvasConfig {
  paperSpeed: number; // mm/s
  gainScale: number; // N = 10mm/mV
  smallGridPx: number;
  bigGridPx: number;
  ecgLineWidth: number;
}

export class ArrhythmiaCanvasEngineService {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrameId: number | null = null;
  private isRunning: boolean = false;
  private xPos: number = 0;
  private isExpanded: boolean = false;

  private readonly THEMES: Record<string, ECGTheme> = {
    'paper-pink': {
      bg: '#fff1f2',
      gridSmall: 'rgba(244, 63, 94, 0.14)',
      gridBig: 'rgba(244, 63, 94, 0.32)',
      trace: '#e11d48',
      text: '#9f1239'
    },
    'icu-neon': {
      bg: '#020617',
      gridSmall: 'rgba(16, 185, 129, 0.12)',
      gridBig: 'rgba(16, 185, 129, 0.28)',
      trace: '#10b981',
      text: '#34d399'
    },
    'paper-white': {
      bg: '#fcfcfc',
      gridSmall: 'rgba(2, 132, 199, 0.12)',
      gridBig: 'rgba(2, 132, 199, 0.30)',
      trace: '#0284c7',
      text: '#0369a1'
    }
  };

  private currentThemeKey: string = 'paper-pink';

  private CONFIG: ECGCanvasConfig = {
    paperSpeed: 25, // mm/s
    gainScale: 1.0, // N = 10mm/mV
    smallGridPx: 10,
    bigGridPx: 50,
    ecgLineWidth: 2.2
  };

  private currentParams: ECGParams = {
    hr: 75,
    qrsWidth: 90,
    pWave: 'normal',
    prInterval: 160,
    regularity: 'regular',
    qtInterval: 400,
    stSegment: 'normal',
    deltaWave: false,
    epsilonWave: false
  };

  public init(canvasId: string): void {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();

    window.addEventListener('resize', () => this.resizeCanvas());
    this.start();
  }

  public resizeCanvas(): void {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    if (parent) {
      this.canvas.width = parent.clientWidth || 800;
      this.canvas.height = this.isExpanded ? 460 : 320;
    }
    this.drawBackgroundGrid();
  }

  public setTheme(themeKey: string): void {
    if (this.THEMES[themeKey]) {
      this.currentThemeKey = themeKey;
      this.drawBackgroundGrid();
    }
  }

  public setGainScale(scale: number | string): void {
    this.CONFIG.gainScale = typeof scale === 'number' ? scale : parseFloat(scale) || 1.0;
    this.drawBackgroundGrid();
  }

  public setPaperSpeed(speed: number | string): void {
    this.CONFIG.paperSpeed = typeof speed === 'number' ? speed : parseInt(speed, 10) || 25;
  }

  public toggleExpand(): boolean {
    this.isExpanded = !this.isExpanded;
    const container = this.canvas ? this.canvas.parentElement : null;
    if (container) {
      container.classList.toggle('canvas-expanded', this.isExpanded);
    }
    this.resizeCanvas();
    return this.isExpanded;
  }

  private gaussian(x: number, mu: number, sigma: number, amp: number): number {
    if (sigma <= 0) return 0;
    return amp * Math.exp(-Math.pow(x - mu, 2) / (2 * sigma * sigma));
  }

  public drawBackgroundGrid(): void {
    if (!this.ctx || !this.canvas) return;

    const theme = this.THEMES[this.currentThemeKey] || this.THEMES['paper-pink']!;
    const width = this.canvas.width;
    const height = this.canvas.height;

    this.ctx.fillStyle = theme.bg;
    this.ctx.fillRect(0, 0, width, height);

    // 1. Lưới nhỏ 1mm
    this.ctx.beginPath();
    this.ctx.strokeStyle = theme.gridSmall;
    this.ctx.lineWidth = 0.75;
    for (let x = 0; x < width; x += this.CONFIG.smallGridPx) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += this.CONFIG.smallGridPx) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
    }
    this.ctx.stroke();

    // 2. Lưới lớn 5mm
    this.ctx.beginPath();
    this.ctx.strokeStyle = theme.gridBig;
    this.ctx.lineWidth = 1.25;
    for (let x = 0; x < width; x += this.CONFIG.bigGridPx) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += this.CONFIG.bigGridPx) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
    }
    this.ctx.stroke();

    // 3. Nhãn thông số y khoa
    const gainText =
      this.CONFIG.gainScale === 0.5
        ? '5 mm/mV (N/2)'
        : this.CONFIG.gainScale === 2.0
        ? '20 mm/mV (2N)'
        : '10 mm/mV (N)';
    this.ctx.fillStyle = theme.text;
    this.ctx.font = '700 11px Inter, sans-serif';
    this.ctx.fillText('LEAD II (Thực thời)', 12, 22);
    this.ctx.fillText(`${this.CONFIG.paperSpeed} mm/s | ${gainText}`, width - 150, 22);
  }

  public updateParams(newParams: Partial<ECGParams>): void {
    this.currentParams = { ...this.currentParams, ...newParams };
  }

  private getWaveformVoltage(tInBeat: number, _beatDuration: number): number {
    const p = this.currentParams;
    let voltage = 0;

    const qrsMs = p.qrsWidth || 90;
    const prMs = p.prInterval || 160;
    const qtcMs = p.qtInterval || 400;

    // Vị trí mốc chuẩn (ms)
    const pCenter = 60;
    const qrsStart = Math.max(110, prMs);
    const qrsCenter = qrsStart + qrsMs * 0.4;
    const tCenter = qrsStart + qtcMs * 0.68;

    // 1. SÓNG P / F / f
    if (p.pWave === 'normal') {
      voltage += this.gaussian(tInBeat, pCenter, 14, 0.16);
    } else if (p.pWave === 'sawtooth') {
      voltage += 0.18 * Math.sin((tInBeat / 160) * 2 * Math.PI);
    } else if (p.pWave === 'chaotic') {
      voltage +=
        this.gaussian(tInBeat, 40, 8, 0.05) -
        this.gaussian(tInBeat, 90, 10, 0.04) +
        0.05 * Math.sin(tInBeat / 25);
    } else if (p.pWave === 'retrograde') {
      voltage -= this.gaussian(tInBeat, qrsStart - 25, 10, 0.14);
    }

    // 2. PHỨC BỘ QRS
    if (p.deltaWave) {
      voltage += this.gaussian(tInBeat, qrsStart - 8, 12, 0.32);
    }

    // Sóng Q (Âm nhỏ)
    voltage -= this.gaussian(tInBeat, qrsCenter - qrsMs * 0.25, qrsMs * 0.08, 0.12);

    // Sóng R (Dương cao nhọn)
    const rSigma = Math.max(3.5, qrsMs * 0.09);
    voltage += this.gaussian(tInBeat, qrsCenter, rSigma, 0.95);

    // Sóng S (Âm sau R)
    voltage -= this.gaussian(tInBeat, qrsCenter + qrsMs * 0.25, qrsMs * 0.12, 0.28);

    // Sóng Epsilon (ARVC)
    if (p.epsilonWave) {
      voltage += this.gaussian(tInBeat, qrsCenter + qrsMs * 0.45, 6, 0.22);
    }

    // 3. ĐOẠN ST & SÓNG T
    if (p.stSegment === 'brugada-coved') {
      const brugadaPeak = qrsCenter + qrsMs * 0.3;
      voltage += this.gaussian(tInBeat, brugadaPeak, 20, 0.42);
      voltage -= this.gaussian(tInBeat, tCenter, 28, 0.22);
    } else if (p.stSegment === 'elevation') {
      voltage += this.gaussian(tInBeat, qrsCenter + 35, 30, 0.3);
      voltage += this.gaussian(tInBeat, tCenter, 22, 0.25);
    } else if (p.stSegment === 'depression') {
      voltage -= this.gaussian(tInBeat, qrsCenter + 35, 30, 0.22);
      voltage += this.gaussian(tInBeat, tCenter, 22, 0.25);
    } else {
      voltage += this.gaussian(tInBeat, tCenter, 26, 0.28);
    }

    return voltage;
  }

  private renderLoop(): void {
    if (!this.isRunning || !this.ctx || !this.canvas) return;

    const theme = this.THEMES[this.currentThemeKey] || this.THEMES['paper-pink']!;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerY = height / 2 + 10;

    const speed = (this.CONFIG.paperSpeed / 25) * 2.2;
    const beatDurationMs = 60000 / Math.max(20, Math.min(250, this.currentParams.hr));

    const tInBeat = (this.xPos * (beatDurationMs / (width * 0.35))) % beatDurationMs;
    const voltage = this.getWaveformVoltage(tInBeat, beatDurationMs);

    const yPos = centerY - voltage * 100 * this.CONFIG.gainScale;

    this.ctx.strokeStyle = theme.trace;
    this.ctx.lineWidth = this.CONFIG.ecgLineWidth;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    if (this.xPos === 0) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, yPos);
    } else {
      const clearWidth = 25;
      this.ctx.fillStyle = theme.bg;
      this.ctx.fillRect(this.xPos, 0, clearWidth, height);

      this.redrawGridRegion(this.xPos, clearWidth, height, theme);

      this.ctx.lineTo(this.xPos, yPos);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(this.xPos, yPos);
    }

    this.xPos += speed;
    if (this.xPos >= width) {
      this.xPos = 0;
    }

    this.animationFrameId = requestAnimationFrame(() => this.renderLoop());
  }

  private redrawGridRegion(startX: number, clearW: number, height: number, theme: ECGTheme): void {
    if (!this.ctx) return;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(startX, 0, clearW, height);
    this.ctx.clip();

    this.ctx.strokeStyle = theme.gridSmall;
    this.ctx.lineWidth = 0.75;
    this.ctx.beginPath();
    const startGridX = Math.floor(startX / this.CONFIG.smallGridPx) * this.CONFIG.smallGridPx;
    for (let x = startGridX; x <= startX + clearW; x += this.CONFIG.smallGridPx) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += this.CONFIG.smallGridPx) {
      this.ctx.moveTo(startX, y);
      this.ctx.lineTo(startX + clearW, y);
    }
    this.ctx.stroke();

    this.ctx.strokeStyle = theme.gridBig;
    this.ctx.lineWidth = 1.25;
    this.ctx.beginPath();
    const startBigX = Math.floor(startX / this.CONFIG.bigGridPx) * this.CONFIG.bigGridPx;
    for (let x = startBigX; x <= startX + clearW; x += this.CONFIG.bigGridPx) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += this.CONFIG.bigGridPx) {
      this.ctx.moveTo(startX, y);
      this.ctx.lineTo(startX + clearW, y);
    }
    this.ctx.stroke();

    this.ctx.restore();
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.xPos = 0;
    this.drawBackgroundGrid();
    this.renderLoop();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

export const ArrhythmiaCanvasEngine = new ArrhythmiaCanvasEngineService();

// Global binding
if (typeof window !== 'undefined') {
  (window as any).ArrhythmiaCanvasEngine = ArrhythmiaCanvasEngine;
}
