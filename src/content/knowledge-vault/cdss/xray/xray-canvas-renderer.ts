/**
 * CliniPortal CDSS — Intelligent Radiography (RadAI X-Ray) Canvas Engine
 * Path: src/content/knowledge-vault/cdss/xray/xray-canvas-renderer.ts
 */

import { Finding, ExamType, CanvasTransformState, Severity } from './xray-types';

export class XRayCanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private offscreenCanvas: HTMLCanvasElement;
  private offscreenCtx: CanvasRenderingContext2D;
  
  public readonly W = 600;
  public readonly H = 750;

  private examType: ExamType = 'chest_pa';
  private findings: Finding[] = [];
  private activeFindingId: string | null = null;
  private hoveredFindingId: string | null = null;

  public state: CanvasTransformState = {
    zoom: 1,
    panX: 0,
    panY: 0,
    brightness: 0,
    contrast: 0,
    inverted: false,
    showOverlay: true,
  };

  private isDragging = false;
  private startDragX = 0;
  private startDragY = 0;

  private onSelectFindingCallback?: (finding: Finding | null) => void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D context');
    this.ctx = ctx;

    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCanvas.width = this.W;
    this.offscreenCanvas.height = this.H;
    this.offscreenCtx = this.offscreenCanvas.getContext('2d')!;

    this.setupCanvasDimensions();
    this.attachEvents();
  }

  public setExamData(examType: ExamType, findings: Finding[], activeId?: string | null): void {
    this.examType = examType;
    this.findings = findings;
    this.activeFindingId = activeId || null;
    this.renderBaseOffscreen();
    this.draw();
  }

  public setActiveFinding(id: string | null): void {
    this.activeFindingId = id;
    this.draw();
  }

  public setOnSelectFinding(cb: (finding: Finding | null) => void): void {
    this.onSelectFindingCallback = cb;
  }

  public updateState(newState: Partial<CanvasTransformState>): void {
    this.state = { ...this.state, ...newState };
    this.draw();
  }

  public resetTransform(): void {
    this.state.zoom = 1;
    this.state.panX = 0;
    this.state.panY = 0;
    this.state.brightness = 0;
    this.state.contrast = 0;
    this.state.inverted = false;
    this.draw();
  }

  private setupCanvasDimensions(): void {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.W * dpr;
    this.canvas.height = this.H * dpr;
    this.canvas.style.width = '100%';
    this.canvas.style.maxWidth = `${this.W}px`;
    this.canvas.style.height = 'auto';
    this.canvas.style.aspectRatio = `${this.W} / ${this.H}`;
    this.ctx.scale(dpr, dpr);
  }

  private attachEvents(): void {
    // Mouse drag for pan
    this.canvas.addEventListener('mousedown', (e) => {
      // Check if clicking finding
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.W / rect.width;
      const scaleY = this.H / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      // Transform back from zoom/pan
      const transformedX = (clickX - this.W / 2 - this.state.panX) / this.state.zoom + this.W / 2;
      const transformedY = (clickY - this.H / 2 - this.state.panY) / this.state.zoom + this.H / 2;

      let hitFinding: Finding | null = null;
      if (this.state.showOverlay) {
        for (const f of this.findings) {
          if (f.x !== undefined && f.y !== undefined) {
            const rad = f.radius || 40;
            const dist = Math.hypot(transformedX - f.x, transformedY - f.y);
            if (dist <= rad) {
              hitFinding = f;
              break;
            }
          }
        }
      }

      if (hitFinding) {
        this.activeFindingId = hitFinding.id;
        this.onSelectFindingCallback?.(hitFinding);
        this.draw();
        return;
      }

      this.isDragging = true;
      this.startDragX = e.clientX - this.state.panX;
      this.startDragY = e.clientY - this.state.panY;
      this.canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        this.state.panX = e.clientX - this.startDragX;
        this.state.panY = e.clientY - this.startDragY;
        this.draw();
      }
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.canvas.style.cursor = 'crosshair';
      }
    });

    // Zoom on wheel
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      const newZoom = Math.min(Math.max(this.state.zoom * zoomFactor, 0.5), 3.5);
      this.state.zoom = newZoom;
      this.draw();
    }, { passive: false });
  }

  // ==========================================
  // RENDER BASE ANATOMY
  // ==========================================
  private renderBaseOffscreen(): void {
    const ctx = this.offscreenCtx;
    ctx.clearRect(0, 0, this.W, this.H);

    if (this.examType.startsWith('abdomen')) {
      this.renderAbdomenAnatomy(ctx);
    } else {
      this.renderChestAnatomy(ctx);
    }
  }

  private renderChestAnatomy(ctx: CanvasRenderingContext2D): void {
    const W = this.W;
    const H = this.H;

    // 1. Film background
    const filmGrad = ctx.createRadialGradient(W / 2, H / 2, 50, W / 2, H / 2, W * 0.85);
    filmGrad.addColorStop(0, '#1a1a1a');
    filmGrad.addColorStop(0.5, '#101010');
    filmGrad.addColorStop(1, '#050505');
    ctx.fillStyle = filmGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Soft Tissue / Thoracic contour
    ctx.save();
    ctx.filter = 'blur(8px)';
    const bodyGrad = ctx.createLinearGradient(0, 0, 0, H);
    bodyGrad.addColorStop(0, 'rgba(60,60,60,0.3)');
    bodyGrad.addColorStop(0.2, 'rgba(80,80,80,0.4)');
    bodyGrad.addColorStop(0.5, 'rgba(70,70,70,0.3)');
    bodyGrad.addColorStop(1, 'rgba(50,50,50,0.2)');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.moveTo(30, 80);
    ctx.bezierCurveTo(80, 60, 200, 50, 300, 55);
    ctx.bezierCurveTo(400, 50, 520, 60, 570, 80);
    ctx.lineTo(580, H);
    ctx.lineTo(20, H);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 3. Lung Fields (Right & Left)
    const lungGradR = ctx.createRadialGradient(200, 350, 20, 200, 350, 200);
    lungGradR.addColorStop(0, 'rgba(5,5,5,0.95)');
    lungGradR.addColorStop(0.3, 'rgba(10,10,10,0.9)');
    lungGradR.addColorStop(0.6, 'rgba(15,15,15,0.85)');
    lungGradR.addColorStop(1, 'rgba(35,35,35,0.4)');

    ctx.save();
    ctx.filter = 'blur(4px)';
    ctx.fillStyle = lungGradR;
    ctx.beginPath();
    ctx.moveTo(280, 120);
    ctx.bezierCurveTo(270, 200, 260, 350, 270, 480);
    ctx.bezierCurveTo(275, 530, 280, 560, 290, 580);
    ctx.bezierCurveTo(250, 590, 150, 580, 100, 540);
    ctx.bezierCurveTo(70, 500, 60, 400, 65, 300);
    ctx.bezierCurveTo(70, 200, 90, 140, 130, 110);
    ctx.bezierCurveTo(180, 85, 250, 95, 280, 120);
    ctx.closePath();
    ctx.fill();

    // Left lung
    const lungGradL = ctx.createRadialGradient(400, 350, 20, 400, 350, 190);
    lungGradL.addColorStop(0, 'rgba(5,5,5,0.95)');
    lungGradL.addColorStop(0.3, 'rgba(10,10,10,0.9)');
    lungGradL.addColorStop(0.6, 'rgba(15,15,15,0.85)');
    lungGradL.addColorStop(1, 'rgba(35,35,35,0.4)');
    ctx.fillStyle = lungGradL;
    ctx.beginPath();
    ctx.moveTo(320, 120);
    ctx.bezierCurveTo(330, 200, 340, 350, 330, 480);
    ctx.bezierCurveTo(325, 530, 320, 560, 310, 580);
    ctx.bezierCurveTo(350, 590, 450, 580, 500, 540);
    ctx.bezierCurveTo(530, 500, 540, 400, 535, 300);
    ctx.bezierCurveTo(530, 200, 510, 140, 470, 110);
    ctx.bezierCurveTo(420, 85, 350, 95, 320, 120);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 4. Heart Silhouette (Mediastinum)
    const hasCardiomegaly = this.findings.some(f => f.type === 'cardiomegaly');
    const heartScale = hasCardiomegaly ? 1.25 : 1.0;
    
    ctx.save();
    ctx.filter = 'blur(5px)';
    const heartGrad = ctx.createRadialGradient(320, 400, 10, 320, 400, 130 * heartScale);
    heartGrad.addColorStop(0, 'rgba(75,75,75,0.9)');
    heartGrad.addColorStop(0.4, 'rgba(65,65,65,0.85)');
    heartGrad.addColorStop(1, 'rgba(35,35,35,0.3)');
    ctx.fillStyle = heartGrad;
    ctx.beginPath();
    ctx.moveTo(300, 180);
    ctx.bezierCurveTo(310, 220, 330, 300, 340 * heartScale, 380);
    ctx.bezierCurveTo(350 * heartScale, 440, 370 * heartScale, 500, 340, 560);
    ctx.bezierCurveTo(320, 590, 270, 590, 240, 570);
    ctx.bezierCurveTo(210, 540, 200, 480, 210, 420);
    ctx.bezierCurveTo(225, 350, 260, 280, 280, 220);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 5. Spine column
    ctx.save();
    ctx.filter = 'blur(2px)';
    const spineGrad = ctx.createLinearGradient(285, 0, 315, 0);
    spineGrad.addColorStop(0, 'rgba(55,55,55,0.4)');
    spineGrad.addColorStop(0.5, 'rgba(80,80,80,0.7)');
    spineGrad.addColorStop(1, 'rgba(55,55,55,0.4)');
    ctx.fillStyle = spineGrad;
    ctx.fillRect(288, 100, 24, 500);
    ctx.restore();

    // 6. Ribs (anterior & posterior curves)
    ctx.save();
    ctx.filter = 'blur(2px)';
    ctx.strokeStyle = 'rgba(75,75,75,0.35)';
    ctx.lineWidth = 4;
    for (let i = 0; i < 9; i++) {
      const y = 160 + i * 45;
      // Right rib
      ctx.beginPath();
      ctx.moveTo(290, y);
      ctx.bezierCurveTo(200, y + 20, 100, y + 50, 90, y + 80);
      ctx.stroke();
      // Left rib
      ctx.beginPath();
      ctx.moveTo(310, y);
      ctx.bezierCurveTo(400, y + 20, 500, y + 50, 510, y + 80);
      ctx.stroke();
    }
    ctx.restore();

    // 7. Diaphragm Domes
    ctx.save();
    ctx.filter = 'blur(4px)';
    ctx.fillStyle = 'rgba(65,65,65,0.7)';
    // Right hemidiaphragm
    ctx.beginPath();
    ctx.moveTo(80, 600);
    ctx.quadraticCurveTo(190, 520, 300, 560);
    ctx.lineTo(300, H);
    ctx.lineTo(80, H);
    ctx.closePath();
    ctx.fill();
    // Left hemidiaphragm
    ctx.beginPath();
    ctx.moveTo(300, 560);
    ctx.quadraticCurveTo(410, 530, 520, 600);
    ctx.lineTo(520, H);
    ctx.lineTo(300, H);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 8. Clavicles
    ctx.save();
    ctx.filter = 'blur(2px)';
    ctx.strokeStyle = 'rgba(85,85,85,0.6)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(280, 130);
    ctx.quadraticCurveTo(180, 115, 80, 140);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(320, 130);
    ctx.quadraticCurveTo(420, 115, 520, 140);
    ctx.stroke();
    ctx.restore();
  }

  private renderAbdomenAnatomy(ctx: CanvasRenderingContext2D): void {
    const W = this.W;
    const H = this.H;

    // 1. Film base
    const filmGrad = ctx.createRadialGradient(W / 2, H / 2, 50, W / 2, H / 2, W * 0.8);
    filmGrad.addColorStop(0, '#1c1c1c');
    filmGrad.addColorStop(0.5, '#121212');
    filmGrad.addColorStop(1, '#060606');
    ctx.fillStyle = filmGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Abdominal wall contour
    ctx.save();
    ctx.filter = 'blur(6px)';
    const bodyGrad = ctx.createRadialGradient(W / 2, H / 2, 50, W / 2, H / 2, 280);
    bodyGrad.addColorStop(0, 'rgba(55,55,55,0.3)');
    bodyGrad.addColorStop(0.5, 'rgba(50,50,50,0.4)');
    bodyGrad.addColorStop(1, 'rgba(20,20,20,0)');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.ellipse(W / 2, H / 2, 250, 340, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. Psoas muscle margins
    ctx.save();
    ctx.filter = 'blur(4px)';
    ctx.fillStyle = 'rgba(55,55,55,0.25)';
    // Right psoas
    ctx.beginPath();
    ctx.moveTo(280, 200);
    ctx.lineTo(290, 200);
    ctx.lineTo(260, 600);
    ctx.lineTo(240, 600);
    ctx.closePath();
    ctx.fill();
    // Left psoas
    ctx.beginPath();
    ctx.moveTo(320, 200);
    ctx.lineTo(310, 200);
    ctx.lineTo(340, 600);
    ctx.lineTo(360, 600);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 4. Lumbar Spine
    ctx.save();
    ctx.filter = 'blur(2px)';
    for (let i = 0; i < 5; i++) {
      const y = 200 + i * 70;
      const vw = 50 + i * 3;
      const vh = 45;
      ctx.fillStyle = 'rgba(80,80,80,0.6)';
      ctx.fillRect(300 - vw / 2, y, vw, vh);
      ctx.fillStyle = 'rgba(95,95,95,0.4)';
      ctx.fillRect(300 - vw / 2, y, vw, 3);
      ctx.fillRect(300 - vw / 2, y + vh - 3, vw, 3);
    }
    ctx.restore();

    // 5. Pelvic Ring
    ctx.save();
    ctx.filter = 'blur(4px)';
    ctx.strokeStyle = 'rgba(75,75,75,0.5)';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(220, 640, 60, 0.4, Math.PI * 1.2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(380, 640, 60, -Math.PI * 0.2, Math.PI * 0.6);
    ctx.stroke();
    ctx.restore();

    // 6. Bowel Gas Patterns (Small & Large intestine loops)
    ctx.save();
    ctx.filter = 'blur(3px)';
    ctx.fillStyle = 'rgba(10,10,10,0.85)';
    // Stomach bubble
    ctx.beginPath();
    ctx.ellipse(380, 160, 45, 30, -0.2, 0, Math.PI * 2);
    ctx.fill();
    // Transverse colon gas
    for (let x = 180; x < 420; x += 35) {
      ctx.beginPath();
      ctx.ellipse(x, 260 + Math.sin(x * 0.05) * 15, 18, 22, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // ==========================================
  // MAIN COMPOSITOR DRAW
  // ==========================================
  public draw(): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.W, this.H);

    ctx.save();

    // PACS Filters
    const b = this.state.brightness; // -100..100
    const c = this.state.contrast; // -100..100
    const brightnessVal = 100 + b;
    const contrastVal = 100 + c;
    const invertVal = this.state.inverted ? 100 : 0;

    ctx.filter = `brightness(${brightnessVal}%) contrast(${contrastVal}%) invert(${invertVal}%)`;

    // Apply Zoom & Pan from center
    ctx.translate(this.W / 2 + this.state.panX, this.H / 2 + this.state.panY);
    ctx.scale(this.state.zoom, this.state.zoom);
    ctx.translate(-this.W / 2, -this.H / 2);

    // Draw offscreen pre-rendered anatomy
    ctx.drawImage(this.offscreenCanvas, 0, 0);

    // Render Pathology Overlays on the film
    this.renderPathologies(ctx);

    ctx.restore();

    // Render Hotspots Overlay (in screen coordinates so rings stay crisp and labels readable)
    if (this.state.showOverlay) {
      this.renderHotspotsOverlay();
    }
  }

  private renderPathologies(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    this.findings.forEach(f => {
      const x = f.x || 300;
      const y = f.y || 400;
      const r = f.radius || 50;

      if (f.type === 'pneumothorax' || f.type === 'lucency') {
        // Dark hyperlucency area with sharp pleural line
        ctx.save();
        ctx.filter = 'blur(2px)';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      } else if (f.type === 'consolidation' || f.type === 'opacity') {
        // Fluffy white infiltrates
        ctx.save();
        ctx.filter = 'blur(6px)';
        const grad = ctx.createRadialGradient(x, y, 5, x, y, r);
        grad.addColorStop(0, 'rgba(180, 180, 180, 0.85)');
        grad.addColorStop(0.6, 'rgba(140, 140, 140, 0.6)');
        grad.addColorStop(1, 'rgba(80, 80, 80, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (f.type === 'effusion' || f.type === 'pleural_effusion') {
        // Meniscus sign blunting
        ctx.save();
        ctx.filter = 'blur(4px)';
        ctx.fillStyle = 'rgba(160, 160, 160, 0.9)';
        ctx.beginPath();
        ctx.moveTo(x - r, y);
        ctx.quadraticCurveTo(x, y - 20, x + r, y - 40);
        ctx.lineTo(x + r, y + r);
        ctx.lineTo(x - r, y + r);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      } else if (f.type === 'calcification') {
        // Bright dense spot
        ctx.save();
        ctx.filter = 'blur(1px)';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });

    ctx.restore();
  }

  private renderHotspotsOverlay(): void {
    const ctx = this.ctx;
    ctx.save();

    // Map through finding hotspots
    this.findings.forEach(f => {
      if (f.x === undefined || f.y === undefined) return;

      // Transform coordinate to screen viewport
      const screenX = (f.x - this.W / 2) * this.state.zoom + this.W / 2 + this.state.panX;
      const screenY = (f.y - this.H / 2) * this.state.zoom + this.H / 2 + this.state.panY;
      const screenR = (f.radius || 40) * this.state.zoom;

      const isActive = f.id === this.activeFindingId;
      const color = this.getSeverityColor(f.severity);

      // Outer bounding circle
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = isActive ? 2.5 : 1.5;
      ctx.setLineDash(isActive ? [4, 4] : [2, 2]);
      ctx.beginPath();
      ctx.arc(screenX, screenY, screenR, 0, Math.PI * 2);
      ctx.stroke();

      // Center crosshair marker
      ctx.setLineDash([]);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(screenX, screenY, isActive ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing highlight ring if active
      if (isActive) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(screenX, screenY, screenR + 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Label Tag
      const label = `${f.nameVi || f.name} (${Math.round((f.confidence > 1 ? f.confidence : f.confidence * 100))}%)`;
      ctx.font = '600 11px "Be Vietnam Pro", sans-serif';
      const textWidth = ctx.measureText(label).width;
      const boxW = textWidth + 16;
      const boxH = 22;
      const boxX = screenX - boxW / 2;
      const boxY = screenY - screenR - 26;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      this.roundRect(ctx, boxX, boxY, boxW, boxH, 4);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.fillText(label, boxX + 8, boxY + 15);

      ctx.restore();
    });

    ctx.restore();
  }

  private getSeverityColor(sev: Severity): string {
    switch (sev) {
      case 'critical': return '#ef4444';
      case 'severe': return '#f97316';
      case 'moderate': return '#f59e0b';
      default: return '#10b981';
    }
  }

  private roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}
