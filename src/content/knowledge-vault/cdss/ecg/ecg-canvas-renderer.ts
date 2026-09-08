/**
 * CliniPortal CDSS — ECG High-DPI Canvas & SVG Waveform Engine
 * Path: src/content/knowledge-vault/cdss/ecg/ecg-canvas-renderer.ts
 */

import {
  LeadName,
  EcgCase,
  CaliperMeasurement,
  LeadFilterMode,
  EcgDisplayTheme,
  WaveType,
  ManualAnnotation,
  AnnotationValidationReport
} from './ecg-types';

import {
  generateLeadWaveformPoints,
  pointsToSvgPath,
  generateCalibrationPulse,
  playQrsBeep,
  validateUserManualAnnotations,
  LEAD_ANATOMY_MAP,
  LEAD_FILTER_DEFINITIONS,
  EcgPoint
} from './ecg-math';

export interface EcgCanvasOptions {
  theme?: EcgDisplayTheme;
  paperSpeed?: number; // 25, 50 mm/s
  voltageGain?: number; // 0.5, 1.0, 2.0 (10mm/mV * gain)
  layoutMode?: '3x4' | '6x2' | '12x1' | 'single';
  selectedLead?: LeadName;
  filterMode?: LeadFilterMode;
  showGrid?: boolean;
  isLiveMode?: boolean;
  isAudioMuted?: boolean;
}

const ALL_12_LEADS: LeadName[] = [
  "I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"
];

export class EcgCanvasRenderer {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private currentCase: EcgCase;
  private options: Required<EcgCanvasOptions>;

  // Caliper & Annotation state
  public caliper: CaliperMeasurement = {
    active: false,
    startX: 0,
    endX: 0,
    startY: 0,
    endY: 0,
    deltaMs: 0,
    deltaBpm: 0,
    deltaMv: 0,
    lead: 'All'
  };

  public activeWaveAnnotation: WaveType | null = null;
  public manualAnnotations: ManualAnnotation[] = [];
  public lastValidationReport: AnnotationValidationReport | null = null;

  // Live simulation & Audio
  private animationFrameId: number | null = null;
  private sweepProgress: number = 0; // 0.0 to 1.0
  private lastBeepTime: number = 0;
  private isDraggingCaliper: boolean = false;

  // Pixels to MM scaling (standard 1mm = ~3.78px on 96dpi, configured for crisp rendering)
  public readonly PIXELS_PER_MM = 3.7795; // ~96 DPI screen standard

  constructor(containerId: string, initialCase: EcgCase, opts: EcgCanvasOptions = {}) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Container #${containerId} not found`);
    this.container = el;
    this.currentCase = initialCase;

    this.options = {
      theme: opts.theme || 'paper',
      paperSpeed: opts.paperSpeed || 25,
      voltageGain: opts.voltageGain || 1.0,
      layoutMode: opts.layoutMode || '3x4',
      selectedLead: opts.selectedLead || 'II',
      filterMode: opts.filterMode || 'ALL',
      showGrid: opts.showGrid !== undefined ? opts.showGrid : true,
      isLiveMode: opts.isLiveMode || false,
      isAudioMuted: opts.isAudioMuted !== undefined ? opts.isAudioMuted : true
    };

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'ecg-main-canvas';
    this.canvas.style.display = 'block';
    this.canvas.style.width = '100%';
    this.canvas.style.cursor = 'crosshair';
    this.container.appendChild(this.canvas);

    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('Cannot get 2D context');
    this.ctx = context;

    this.setupEventListeners();
    this.resizeCanvas();
    this.startLoop();
  }

  public setCase(newCase: EcgCase): void {
    this.currentCase = newCase;
    this.manualAnnotations = [];
    this.lastValidationReport = null;
    this.render();
  }

  public setOptions(newOpts: Partial<EcgCanvasOptions>): void {
    this.options = { ...this.options, ...newOpts };
    this.resizeCanvas();
    this.render();
  }

  public getOptions(): Required<EcgCanvasOptions> {
    return { ...this.options };
  }

  public toggleLive(): boolean {
    this.options.isLiveMode = !this.options.isLiveMode;
    if (!this.options.isLiveMode) {
      this.sweepProgress = 1.0;
    }
    return this.options.isLiveMode;
  }

  public toggleMute(): boolean {
    this.options.isAudioMuted = !this.options.isAudioMuted;
    return this.options.isAudioMuted;
  }

  public toggleCaliper(): boolean {
    this.caliper.active = !this.caliper.active;
    this.activeWaveAnnotation = null;
    this.render();
    return this.caliper.active;
  }

  public setAnnotationMode(wave: WaveType | null): void {
    this.activeWaveAnnotation = wave;
    if (wave) {
      this.caliper.active = false;
    }
    this.render();
  }

  public clearAnnotations(): void {
    this.manualAnnotations = [];
    this.lastValidationReport = null;
    this.render();
  }

  public resizeCanvas(): void {
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(700, rect.width || 1000);
    
    // Determine canvas height based on layout
    let height = 650;
    if (this.options.layoutMode === '3x4') height = 580;
    else if (this.options.layoutMode === '6x2') height = 750;
    else if (this.options.layoutMode === '12x1') height = 1400;
    else if (this.options.layoutMode === 'single') height = 480;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.height = `${height}px`;

    this.ctx.resetTransform();
    this.ctx.scale(dpr, dpr);
    this.render();
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', () => this.resizeCanvas());

    this.canvas.addEventListener('mousedown', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (this.caliper.active) {
        this.isDraggingCaliper = true;
        this.caliper.startX = x;
        this.caliper.startY = y;
        this.caliper.endX = x;
        this.caliper.endY = y;
        this.caliper.deltaMs = 0;
        this.caliper.deltaBpm = 0;
        this.caliper.deltaMv = 0;
        this.render();
        return;
      }

      if (this.activeWaveAnnotation) {
        this.placeAnnotation(x, y, this.activeWaveAnnotation);
      }
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.caliper.active && this.isDraggingCaliper) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.caliper.endX = x;
        this.caliper.endY = y;

        const diffX = Math.abs(x - this.caliper.startX);
        const diffY = Math.abs(y - this.caliper.startY);

        const diffXMm = diffX / this.PIXELS_PER_MM;
        const timeSec = diffXMm / this.options.paperSpeed;
        this.caliper.deltaMs = Math.round(timeSec * 1000);
        this.caliper.deltaBpm = this.caliper.deltaMs > 0 ? Math.round(60000 / this.caliper.deltaMs) : 0;

        const diffYMm = diffY / this.PIXELS_PER_MM;
        this.caliper.deltaMv = Number((diffYMm / (10 * this.options.voltageGain)).toFixed(2));

        this.render();
      }
    });

    window.addEventListener('mouseup', () => {
      if (this.isDraggingCaliper) {
        this.isDraggingCaliper = false;
        this.render();
      }
    });
  }

  private placeAnnotation(x: number, y: number, wave: WaveType): void {
    const lead = this.options.selectedLead || 'II';
    const pxPerMm = this.PIXELS_PER_MM;
    const timeMs = Math.round(((x % 300) / pxPerMm / this.options.paperSpeed) * 1000);
    const voltageMv = Number(((y / pxPerMm) / (10 * this.options.voltageGain)).toFixed(2));

    const ann: ManualAnnotation = {
      id: 'ann_' + Date.now(),
      lead,
      waveType: wave,
      x,
      y,
      timeMs,
      voltageMv,
      createdTime: Date.now()
    };

    this.manualAnnotations.push(ann);

    // Run validation immediately
    const leadData = this.currentCase.leadsData[lead];
    this.lastValidationReport = validateUserManualAnnotations(
      this.manualAnnotations.filter(a => a.lead === lead),
      leadData,
      lead,
      this.currentCase.metrics.heartRate,
      this.currentCase.title
    );

    this.render();

    // Fire custom event for UI updates
    const event = new CustomEvent('ecg-annotation-update', {
      detail: { report: this.lastValidationReport, annotations: this.manualAnnotations }
    });
    window.dispatchEvent(event);
  }

  private startLoop(): void {
    let lastTime = performance.now();

    const loop = (now: number) => {
      if (this.options.isLiveMode) {
        const elapsed = now - lastTime;
        const cycleDurationMs = 2500 * (25 / this.options.paperSpeed);
        this.sweepProgress = (this.sweepProgress + elapsed / cycleDurationMs) % 1.0;

        const rrIntervalMs = (60 / Math.max(30, this.currentCase.metrics.heartRate)) * 1000;
        if (now - this.lastBeepTime >= rrIntervalMs) {
          if (!this.options.isAudioMuted) {
            playQrsBeep(this.currentCase.metrics.heartRate > 100 ? 950 : 840, 0.05);
          }
          this.lastBeepTime = now;
        }

        this.render();
      }

      lastTime = now;
      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  public render(): void {
    const dpr = window.devicePixelRatio || 1;
    const width = this.canvas.width / dpr;
    const height = this.canvas.height / dpr;

    this.ctx.clearRect(0, 0, width, height);

    // 1. Draw Background & Grid
    this.drawBackground(width, height);
    if (this.options.showGrid) {
      this.drawGrid(width, height);
    }

    // 2. Draw Waveforms based on Layout
    if (this.options.layoutMode === '3x4') {
      this.render3x4Layout(width, height);
    } else if (this.options.layoutMode === '6x2') {
      this.render6x2Layout(width, height);
    } else if (this.options.layoutMode === '12x1') {
      this.render12x1Layout(width, height);
    } else {
      this.renderSingleLeadLayout(width, height);
    }

    // 3. Draw Manual Annotations
    this.drawAnnotations();

    // 4. Draw Caliper if active
    if (this.caliper.active) {
      this.drawCaliper();
    }

    // 5. Draw Watermark & Technical Spec Footer
    this.drawFooterTechnicalSpecs(width, height);
  }

  private drawBackground(w: number, h: number): void {
    if (this.options.theme === 'monitor') {
      this.ctx.fillStyle = '#021a12'; // CRT dark emerald
    } else if (this.options.theme === 'amber') {
      this.ctx.fillStyle = '#18181b'; // ICU Amber black
    } else {
      this.ctx.fillStyle = '#fff9fa'; // Standard Medical Pink Paper
    }
    this.ctx.fillRect(0, 0, w, h);
  }

  private drawGrid(w: number, h: number): void {
    const pxPerMm = this.PIXELS_PER_MM;
    const minorPx = pxPerMm; // 1mm square
    const majorPx = pxPerMm * 5; // 5mm large box (0.20s / 0.5mV)

    let minorColor = 'rgba(244, 114, 182, 0.28)'; // pink paper minor
    let majorColor = 'rgba(236, 72, 153, 0.65)'; // pink paper major

    if (this.options.theme === 'monitor') {
      minorColor = 'rgba(6, 78, 59, 0.4)';
      majorColor = 'rgba(16, 185, 129, 0.7)';
    } else if (this.options.theme === 'amber') {
      minorColor = 'rgba(120, 53, 15, 0.4)';
      majorColor = 'rgba(245, 158, 11, 0.7)';
    }

    this.ctx.lineWidth = 0.5;

    // Minor lines (1mm)
    this.ctx.strokeStyle = minorColor;
    this.ctx.beginPath();
    for (let x = 0; x <= w; x += minorPx) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, h);
    }
    for (let y = 0; y <= h; y += minorPx) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(w, y);
    }
    this.ctx.stroke();

    // Major lines (5mm)
    this.ctx.lineWidth = 1.0;
    this.ctx.strokeStyle = majorColor;
    this.ctx.beginPath();
    for (let x = 0; x <= w; x += majorPx) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, h);
    }
    for (let y = 0; y <= h; y += majorPx) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(w, y);
    }
    this.ctx.stroke();
  }

  private getSignalColor(): string {
    if (this.options.theme === 'monitor') return '#22c55e'; // neon green
    if (this.options.theme === 'amber') return '#f59e0b'; // neon amber
    return '#0f172a'; // dark medical ink
  }

  /**
   * Layout 3x4: 12 Leads in 4 columns × 3 rows + continuous bottom Rhythm Strip (DII)
   */
  private render3x4Layout(w: number, h: number): void {
    const cols = 4;
    const rows = 3;
    const rhythmHeight = 110;
    const gridHeight = h - rhythmHeight;
    const colWidth = w / cols;
    const rowHeight = gridHeight / rows;

    const layoutGrid: LeadName[][] = [
      ["I", "aVR", "V1", "V4"],
      ["II", "aVL", "V2", "V5"],
      ["III", "aVF", "V3", "V6"]
    ];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const lead = layoutGrid[r][c];
        const originX = c * colWidth;
        const originY = r * rowHeight + rowHeight * 0.55;
        this.drawSingleLeadSegment(lead, originX, originY, colWidth, rowHeight, 2.5);
      }
    }

    // Long Rhythm Strip DII across bottom
    const rhythmOriginY = gridHeight + rhythmHeight * 0.55;
    this.drawSingleLeadSegment("II", 0, rhythmOriginY, w, rhythmHeight, 10.0, "DII Kéo Dài (Continuous Rhythm Strip)");
  }

  /**
   * Layout 6x2: 6 Limb leads on Left, 6 Chest leads on Right
   */
  private render6x2Layout(w: number, h: number): void {
    const colWidth = w / 2;
    const rowHeight = h / 6;

    const limbLeads: LeadName[] = ["I", "II", "III", "aVR", "aVL", "aVF"];
    const chestLeads: LeadName[] = ["V1", "V2", "V3", "V4", "V5", "V6"];

    limbLeads.forEach((lead, r) => {
      this.drawSingleLeadSegment(lead, 0, r * rowHeight + rowHeight * 0.55, colWidth, rowHeight, 5.0);
    });

    chestLeads.forEach((lead, r) => {
      this.drawSingleLeadSegment(lead, colWidth, r * rowHeight + rowHeight * 0.55, colWidth, rowHeight, 5.0);
    });
  }

  /**
   * Layout 12x1: All 12 leads stacked vertically
   */
  private render12x1Layout(w: number, h: number): void {
    const rowHeight = h / 12;
    ALL_12_LEADS.forEach((lead, r) => {
      this.drawSingleLeadSegment(lead, 0, r * rowHeight + rowHeight * 0.55, w, rowHeight, 10.0);
    });
  }

  /**
   * Layout Single: Magnified single lead
   */
  private renderSingleLeadLayout(w: number, h: number): void {
    const lead = this.options.selectedLead || "II";
    this.drawSingleLeadSegment(lead, 0, h * 0.5, w, h, 10.0, `Chuyển Đạo ${lead} (Phóng Đại Chi Tiết)`);
  }

  private drawSingleLeadSegment(
    lead: LeadName,
    originX: number,
    originY: number,
    width: number,
    height: number,
    durationSec: number,
    customLabel?: string
  ): void {
    const leadData = this.currentCase.leadsData[lead];
    if (!leadData) return;

    const pxPerMm = this.PIXELS_PER_MM;
    const signalColor = this.getSignalColor();

    // 1. Draw Lead Label
    this.ctx.fillStyle = signalColor;
    this.ctx.font = 'bold 12px "JetBrains Mono", monospace';
    this.ctx.fillText(customLabel || lead, originX + 10, originY - height * 0.35);

    // 2. Draw 1mV standard calibration pulse at beginning of lead
    const calPulsePath = generateCalibrationPulse(pxPerMm, pxPerMm, originY, originX + 12);
    this.drawSvgPathString(calPulsePath, signalColor, 1.4);

    // 3. Generate wave points
    const wavePoints = generateLeadWaveformPoints(
      leadData,
      this.currentCase.metrics.heartRate,
      durationSec,
      {
        sampleRate: 350,
        voltageScale: this.options.voltageGain,
        rhythmVariance: String(this.currentCase.metrics.regularity).includes('Loạn nhịp') ? 0.35 : 0
      }
    );

    // 4. Calculate sweep cutoff if live mode
    let maxPx: number | undefined = undefined;
    if (this.options.isLiveMode) {
      maxPx = originX + width * this.sweepProgress;
    }

    // 5. Build and draw SVG path
    const waveformPath = pointsToSvgPath(
      wavePoints,
      pxPerMm,
      pxPerMm,
      originY,
      originX + 12 + (5 * pxPerMm), // Offset after calibration pulse
      maxPx
    );

    this.drawSvgPathString(waveformPath, signalColor, 1.6);

    // 6. Draw sweep line if live mode
    if (this.options.isLiveMode && maxPx !== undefined && maxPx >= originX && maxPx <= originX + width) {
      this.ctx.strokeStyle = '#38bdf8';
      this.ctx.lineWidth = 2.0;
      this.ctx.beginPath();
      this.ctx.moveTo(maxPx, originY - height * 0.45);
      this.ctx.lineTo(maxPx, originY + height * 0.45);
      this.ctx.stroke();
    }
  }

  private drawSvgPathString(pathStr: string, strokeColor: string, strokeWidth: number): void {
    if (!pathStr) return;
    try {
      const p = new Path2D(pathStr);
      this.ctx.strokeStyle = strokeColor;
      this.ctx.lineWidth = strokeWidth;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.stroke(p);
    } catch {
      // Fallback
    }
  }

  private drawAnnotations(): void {
    for (const ann of this.manualAnnotations) {
      this.ctx.fillStyle = '#ef4444';
      this.ctx.beginPath();
      this.ctx.arc(ann.x, ann.y, 5, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 10px sans-serif';
      this.ctx.fillText(ann.waveType, ann.x - 3, ann.y + 3);
    }
  }

  private drawCaliper(): void {
    const c = this.caliper;
    if (c.startX === c.endX && c.startY === c.endY) return;

    this.ctx.save();
    this.ctx.strokeStyle = '#2563eb';
    this.ctx.lineWidth = 1.5;
    this.ctx.setLineDash([4, 4]);

    // Horizontal calipers
    this.ctx.beginPath();
    this.ctx.moveTo(c.startX, 0);
    this.ctx.lineTo(c.startX, this.canvas.height);
    this.ctx.moveTo(c.endX, 0);
    this.ctx.lineTo(c.endX, this.canvas.height);
    this.ctx.stroke();

    // Measurement readout badge
    const midX = (c.startX + c.endX) / 2;
    const midY = (c.startY + c.endY) / 2;

    const badgeText = `${c.deltaMs} ms | ${c.deltaBpm} bpm | ${c.deltaMv} mV`;
    this.ctx.font = 'bold 12px "JetBrains Mono", monospace';
    const textWidth = this.ctx.measureText(badgeText).width;

    this.ctx.setLineDash([]);
    this.ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    this.ctx.fillRect(midX - textWidth / 2 - 8, midY - 14, textWidth + 16, 26);
    this.ctx.strokeStyle = '#38bdf8';
    this.ctx.strokeRect(midX - textWidth / 2 - 8, midY - 14, textWidth + 16, 26);

    this.ctx.fillStyle = '#38bdf8';
    this.ctx.fillText(badgeText, midX - textWidth / 2, midY + 4);

    this.ctx.restore();
  }

  private drawFooterTechnicalSpecs(w: number, h: number): void {
    this.ctx.fillStyle = this.options.theme === 'paper' ? '#64748b' : '#94a3b8';
    this.ctx.font = '11px "JetBrains Mono", monospace';
    const spec = `25 mm/s, 10 mm/mV (Gain: ${this.options.voltageGain}x) | Filter: 0.05-150Hz | CliniPortal ECG High-Fidelity Engine`;
    this.ctx.fillText(spec, 15, h - 10);
  }

  public destroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
