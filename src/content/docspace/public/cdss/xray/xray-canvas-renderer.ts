/**
 * CliniPortal CDSS — Intelligent Radiography (RadAI X-Ray) Canvas Engine
 * High-Fidelity Photorealistic Clinical Radiography Renderer
 * Path: public/cdss/xray/xray-canvas-renderer.ts
 */

import { Finding, ExamType, CanvasTransformState, Severity } from './xray-types';

export class XRayCanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private offscreenCanvas: HTMLCanvasElement;
  private offscreenCtx: CanvasRenderingContext2D;
  private noiseCanvas: HTMLCanvasElement | null = null;
  
  public readonly W = 600;
  public readonly H = 750;

  private examType: ExamType = 'chest_pa';
  private caseId: string = 'case-copd-001';
  private patientInfo: { age?: number; gender?: 'M' | 'F'; title?: string } = { age: 68, gender: 'M' };
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

  public windowPreset: 'DEFAULT' | 'LUNG' | 'MEDIASTINUM' | 'BONE' | 'HIGH_DYNAMIC' = 'DEFAULT';

  public setWindowPreset(preset: 'DEFAULT' | 'LUNG' | 'MEDIASTINUM' | 'BONE' | 'HIGH_DYNAMIC'): void {
    this.windowPreset = preset;
    switch (preset) {
      case 'LUNG':
        this.state.contrast = 25;
        this.state.brightness = -10;
        break;
      case 'MEDIASTINUM':
        this.state.contrast = 45;
        this.state.brightness = -25;
        break;
      case 'BONE':
        this.state.contrast = 60;
        this.state.brightness = 20;
        break;
      case 'HIGH_DYNAMIC':
        this.state.contrast = 70;
        this.state.brightness = 0;
        break;
      case 'DEFAULT':
      default:
        this.state.contrast = 0;
        this.state.brightness = 0;
        break;
    }
    this.draw();
  }

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

    this.initNoiseTexture();
    this.setupCanvasDimensions();
    this.attachEvents();
  }

  public setExamData(
    examType: ExamType,
    findings: Finding[],
    activeId?: string | null,
    caseId?: string,
    patientInfo?: { age?: number; gender?: 'M' | 'F'; title?: string }
  ): void {
    this.examType = examType;
    this.findings = findings;
    this.activeFindingId = activeId || null;
    if (caseId) this.caseId = caseId;
    if (patientInfo) this.patientInfo = patientInfo;
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

  private initNoiseTexture(): void {
    const nc = document.createElement('canvas');
    nc.width = 128;
    nc.height = 128;
    const nctx = nc.getContext('2d');
    if (!nctx) return;

    const imgData = nctx.createImageData(128, 128);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      // Subtle monochrome quantum mottle
      const noise = (Math.random() - 0.5) * 45;
      const v = Math.min(255, Math.max(0, 128 + noise));
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 22; // Low opacity
    }
    nctx.putImageData(imgData, 0, 0);
    this.noiseCanvas = nc;
  }

  private attachEvents(): void {
    this.canvas.addEventListener('mousedown', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.W / rect.width;
      const scaleY = this.H / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      const transformedX = (clickX - this.W / 2 - this.state.panX) / this.state.zoom + this.W / 2;
      const transformedY = (clickY - this.H / 2 - this.state.panY) / this.state.zoom + this.H / 2;

      let hitFinding: Finding | null = null;
      if (this.state.showOverlay) {
        for (const f of this.findings) {
          if (f.x !== undefined && f.y !== undefined) {
            const rad = (f.radius || 40) + 12;
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

    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      const newZoom = Math.min(Math.max(this.state.zoom * zoomFactor, 0.5), 3.5);
      this.state.zoom = newZoom;
      this.draw();
    }, { passive: false });
  }

  // ==========================================
  // RENDER BASE ANATOMY OFFSCREEN
  // ==========================================
  private renderBaseOffscreen(): void {
    const ctx = this.offscreenCtx;
    ctx.clearRect(0, 0, this.W, this.H);

    if (this.examType.startsWith('abdomen')) {
      this.renderAbdomenAnatomy(ctx);
    } else {
      this.renderChestAnatomy(ctx);
    }

    // Apply Phosphor Film Grain Texture across the whole radiograph
    if (this.noiseCanvas) {
      ctx.save();
      const pattern = ctx.createPattern(this.noiseCanvas, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, this.W, this.H);
      }
      ctx.restore();
    }

    // DICOM PACS Lead Marker and Metadata Header
    this.renderDicomMetadataAndLeadMarker(ctx);
  }

  // ==========================================
  // PHOTOREALISTIC CHEST ANATOMY (CXR)
  // ==========================================
  private renderChestAnatomy(ctx: CanvasRenderingContext2D): void {
    const W = this.W;
    const H = this.H;
    const isCopd = this.caseId === 'case-copd-001';
    const isPneumonia = this.caseId === 'case-pneumonia-001';
    const isCancer = this.caseId === 'case-lung-cancer-001';
    const isHeartFailure = this.caseId === 'case-heart-failure-001';
    const isPtx = this.caseId === 'case-pneumothorax-001';
    const isLoculated = this.caseId === 'case-loculated-effusion-001';
    const isEarlyGGO = this.caseId === 'case-early-consolidation-001';
    const isApicalTb = this.caseId === 'case-apical-tb-cavity-001';
    const isPneumoperitoneum = this.caseId === 'case-pneumoperitoneum-001';
    const isArds = this.caseId === 'case-ards-covid-001';
    const isMiliary = this.caseId === 'case-miliary-tb-001';
    const isPericardial = this.caseId === 'case-pericardial-effusion-001';

    // 1. Film Emulsion Base & Radiographic Background
    const filmGrad = ctx.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, W * 0.95);
    filmGrad.addColorStop(0, '#0a0d14');
    filmGrad.addColorStop(0.5, '#05070c');
    filmGrad.addColorStop(1, '#020306');
    ctx.fillStyle = filmGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Collimator Border & Exposure Penumbra
    ctx.save();
    ctx.strokeStyle = 'rgba(25, 32, 44, 0.4)';
    ctx.lineWidth = 12;
    this.roundRect(ctx, 10, 10, W - 20, H - 20, 16);
    ctx.stroke();
    ctx.restore();

    // 3. Thoracic Soft Tissue Silhouette (Axillae, Neck, Lateral Chest Walls)
    ctx.save();
    ctx.filter = 'blur(10px)';
    const softTissueGrad = ctx.createLinearGradient(0, 0, 0, H);
    softTissueGrad.addColorStop(0, 'rgba(45, 50, 60, 0.35)');
    softTissueGrad.addColorStop(0.2, 'rgba(55, 62, 72, 0.45)');
    softTissueGrad.addColorStop(0.6, 'rgba(50, 56, 66, 0.4)');
    softTissueGrad.addColorStop(1, 'rgba(35, 40, 48, 0.3)');
    ctx.fillStyle = softTissueGrad;

    ctx.beginPath();
    ctx.moveTo(35, 90);
    ctx.bezierCurveTo(80, 60, 200, 48, 300, 50);
    ctx.bezierCurveTo(400, 48, 520, 60, 565, 90);
    ctx.bezierCurveTo(575, 140, 580, 300, 575, 520);
    ctx.bezierCurveTo(570, 620, 560, 700, 555, H);
    ctx.lineTo(45, H);
    ctx.bezierCurveTo(40, 700, 30, 620, 25, 520);
    ctx.bezierCurveTo(20, 300, 25, 140, 35, 90);
    ctx.closePath();
    ctx.fill();

    // Female breast shadows or pectoral folds
    if (this.patientInfo.gender === 'F' || isHeartFailure) {
      const breastGrad = ctx.createRadialGradient(200, 490, 10, 200, 490, 95);
      breastGrad.addColorStop(0, 'rgba(80, 85, 95, 0.35)');
      breastGrad.addColorStop(0.7, 'rgba(55, 60, 70, 0.2)');
      breastGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = breastGrad;
      ctx.beginPath();
      ctx.arc(195, 490, 95, 0, Math.PI * 2);
      ctx.fill();

      const breastGradL = ctx.createRadialGradient(405, 490, 10, 405, 490, 95);
      breastGradL.addColorStop(0, 'rgba(80, 85, 95, 0.35)');
      breastGradL.addColorStop(0.7, 'rgba(55, 60, 70, 0.2)');
      breastGradL.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = breastGradL;
      ctx.beginPath();
      ctx.arc(405, 490, 95, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 4. Radiolucent Lung Fields (Dark Pulmonary Parenchyma)
    // Diaphragm level: lower in COPD (y=610) vs normal (y=570)
    const diaphragmY = isCopd ? 610 : 570;
    const lungDarkness = isCopd ? 'rgba(2, 3, 5, 0.98)' : 'rgba(7, 9, 14, 0.94)';

    ctx.save();
    ctx.filter = 'blur(6px)';
    ctx.fillStyle = lungDarkness;

    // Right Lung Field
    ctx.beginPath();
    ctx.moveTo(280, 115);
    ctx.bezierCurveTo(270, 200, 260, 350, 270, 470);
    ctx.bezierCurveTo(275, 520, 280, diaphragmY - 20, 290, diaphragmY);
    ctx.bezierCurveTo(240, diaphragmY + 15, 140, diaphragmY + 8, 85, diaphragmY - 20); // Costophrenic sulcus
    ctx.bezierCurveTo(65, 480, 55, 380, 60, 280);
    ctx.bezierCurveTo(65, 180, 85, 130, 125, 105);
    ctx.bezierCurveTo(175, 80, 245, 90, 280, 115);
    ctx.closePath();
    ctx.fill();

    // Left Lung Field
    const leftDiaphragmY = diaphragmY + 15; // Left diaphragm is normally ~1.5cm lower
    ctx.beginPath();
    ctx.moveTo(320, 115);
    ctx.bezierCurveTo(330, 200, 345, 350, 335, 470);
    ctx.bezierCurveTo(330, 520, 325, leftDiaphragmY - 20, 315, leftDiaphragmY);
    ctx.bezierCurveTo(360, leftDiaphragmY + 15, 460, leftDiaphragmY + 8, 515, leftDiaphragmY - 20);
    ctx.bezierCurveTo(535, 480, 545, 380, 540, 280);
    ctx.bezierCurveTo(535, 180, 515, 130, 475, 105);
    ctx.bezierCurveTo(425, 80, 355, 90, 320, 115);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 5. Thoracic Spine Column (T1 - T12 Vertebrae)
    ctx.save();
    ctx.filter = 'blur(1.5px)';
    for (let i = 0; i < 12; i++) {
      const y = 90 + i * 42;
      const vW = 30 + (i > 6 ? (i - 6) * 1.5 : 0);
      const vH = 34;
      const vX = 300 - vW / 2;

      // Vertebral Body Medullary Bone
      const vGrad = ctx.createLinearGradient(vX, 0, vX + vW, 0);
      vGrad.addColorStop(0, 'rgba(110, 115, 125, 0.45)');
      vGrad.addColorStop(0.5, 'rgba(145, 150, 165, 0.55)');
      vGrad.addColorStop(1, 'rgba(110, 115, 125, 0.45)');
      ctx.fillStyle = vGrad;
      this.roundRect(ctx, vX, y, vW, vH, 4);
      ctx.fill();

      // Intervertebral Disc Space (thin radiolucent stripe)
      ctx.fillStyle = 'rgba(25, 30, 40, 0.6)';
      ctx.fillRect(vX + 2, y + vH, vW - 4, 6);

      // Pedicles ("Owl Eyes" cortical rings)
      ctx.strokeStyle = 'rgba(180, 185, 200, 0.5)';
      ctx.lineWidth = 1.8;
      ctx.strokeRect(vX + 3, y + 8, 5, 8);
      ctx.strokeRect(vX + vW - 8, y + 8, 5, 8);

      // Spinous process midline teardrop
      ctx.fillStyle = 'rgba(165, 170, 185, 0.6)';
      ctx.beginPath();
      ctx.ellipse(300, y + 17, 3, 7, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 6. Central Airway: Trachea & Carinal Bifurcation
    ctx.save();
    ctx.filter = 'blur(1.2px)';
    ctx.fillStyle = 'rgba(10, 14, 20, 0.95)'; // Radiolucent air lumen
    ctx.strokeStyle = 'rgba(150, 155, 168, 0.45)'; // Paratracheal stripe
    ctx.lineWidth = 1.5;

    // Trachea from C6 down to T4 (y=80 to y=270)
    const tracheaShift = isPtx ? 8 : 0; // Trachea slightly shifted to left in right tension ptx
    ctx.beginPath();
    ctx.moveTo(291 + tracheaShift, 70);
    ctx.lineTo(291 + tracheaShift, 265);
    ctx.lineTo(309 + tracheaShift, 265);
    ctx.lineTo(309 + tracheaShift, 70);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Carina and Mainstem Bronchi
    // Right Main Bronchus (steeper 25 deg, shorter, wider)
    ctx.beginPath();
    ctx.moveTo(293 + tracheaShift, 265);
    ctx.quadraticCurveTo(275 + tracheaShift, 290, 260 + tracheaShift, 320);
    ctx.lineTo(272 + tracheaShift, 325);
    ctx.quadraticCurveTo(285 + tracheaShift, 295, 300 + tracheaShift, 275);
    ctx.closePath();
    ctx.fill();

    // Left Main Bronchus (longer, more horizontal 45 deg under aortic arch)
    ctx.beginPath();
    ctx.moveTo(307 + tracheaShift, 265);
    ctx.quadraticCurveTo(330 + tracheaShift, 295, 355 + tracheaShift, 325);
    ctx.lineTo(348 + tracheaShift, 335);
    ctx.quadraticCurveTo(320 + tracheaShift, 305, 300 + tracheaShift, 275);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 7. Skeletal Rib Cage: 10 Posterior Ribs + 8 Anterior Ribs
    this.renderRibCage(ctx, isCopd);

    // 8. Clavicles & Scapular Borders
    this.renderClaviclesAndScapulae(ctx);

    // 9. Pulmonary Vasculature & Bronchovascular Tree
    this.renderPulmonaryVasculature(ctx, isCopd, isHeartFailure, isPtx, isPericardial, isArds, isMiliary, isEarlyGGO);

    // 10. Mediastinum & Cardiac Silhouette
    this.renderCardiacSilhouette(ctx, isCopd, isHeartFailure, isPtx, isPericardial, isEarlyGGO);

    // 11. Hemidiaphragms & Costophrenic Sulci
    this.renderHemidiaphragms(ctx, isCopd, isPneumonia, isHeartFailure, isPtx, isLoculated, isPneumoperitoneum, isPericardial);

    // 12. Case-Specific Diagnostic Pathologies (Dense Consolidation, Mass, Air-fluid, GGO, Miliary, Effusion)
    this.renderCaseSpecificPathologies(ctx, {
      isCopd, isPneumonia, isCancer, isHeartFailure, isPtx,
      isLoculated, isEarlyGGO, isApicalTb, isPneumoperitoneum,
      isArds, isMiliary, isPericardial
    });
  }

  // ==========================================
  // PHOTOREALISTIC ABDOMEN KUB (BOWEL OBSTRUCTION)
  // ==========================================
  private renderAbdomenAnatomy(ctx: CanvasRenderingContext2D): void {
    const W = this.W;
    const H = this.H;

    // Dark Film Background
    const filmGrad = ctx.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, W * 0.95);
    filmGrad.addColorStop(0, '#0a0d14');
    filmGrad.addColorStop(0.5, '#05070c');
    filmGrad.addColorStop(1, '#020306');
    ctx.fillStyle = filmGrad;
    ctx.fillRect(0, 0, W, H);

    // Abdominal Flank Soft Tissue Contour & Psoas Muscle Shadows
    ctx.save();
    ctx.filter = 'blur(8px)';
    ctx.fillStyle = 'rgba(50, 55, 65, 0.4)';
    ctx.beginPath();
    ctx.moveTo(50, 30);
    ctx.bezierCurveTo(70, 200, 65, 450, 55, H);
    ctx.lineTo(545, H);
    ctx.bezierCurveTo(535, 450, 530, 200, 550, 30);
    ctx.closePath();
    ctx.fill();

    // Psoas Shadows (Oblique bilateral soft tissue ridges from L1 down to iliac crest)
    ctx.fillStyle = 'rgba(65, 70, 82, 0.35)';
    ctx.beginPath();
    ctx.moveTo(270, 150);
    ctx.lineTo(150, 560);
    ctx.lineTo(190, 570);
    ctx.lineTo(285, 150);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(330, 150);
    ctx.lineTo(450, 560);
    ctx.lineTo(410, 570);
    ctx.lineTo(315, 150);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Lumbar Spine (L1 - L5) & Sacrum
    ctx.save();
    ctx.filter = 'blur(1.8px)';
    for (let i = 0; i < 5; i++) {
      const y = 140 + i * 55;
      const vW = 55 + i * 2;
      const vH = 42;
      const vX = 300 - vW / 2;

      ctx.fillStyle = 'rgba(135, 140, 155, 0.55)';
      this.roundRect(ctx, vX, y, vW, vH, 6);
      ctx.fill();

      // Disc space
      ctx.fillStyle = 'rgba(25, 30, 40, 0.7)';
      ctx.fillRect(vX + 4, y + vH, vW - 8, 8);

      // Transverse processes
      ctx.fillStyle = 'rgba(125, 130, 145, 0.45)';
      ctx.fillRect(vX - 22, y + 12, 22, 12);
      ctx.fillRect(vX + vW, y + 12, 22, 12);
    }

    // Pelvic Brim & Sacroiliac Joint Shadows
    ctx.strokeStyle = 'rgba(145, 150, 168, 0.55)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(200, 640, 75, 0.3, Math.PI * 1.1);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(400, 640, 75, -Math.PI * 0.1, Math.PI * 0.7);
    ctx.stroke();
    ctx.restore();

    // Lower Ribs (11th & 12th floating ribs)
    ctx.save();
    ctx.strokeStyle = 'rgba(130, 135, 150, 0.4)';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(270, 70);
    ctx.quadraticCurveTo(170, 95, 80, 120);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(330, 70);
    ctx.quadraticCurveTo(430, 95, 520, 120);
    ctx.stroke();
    ctx.restore();

    // Pathological Bowel Obstruction (SBO): Dilated Small Bowel Loops with Multiple Air-Fluid Levels
    this.renderBowelObstructionPathology(ctx);
  }

  // ==========================================
  // DETAILED SKELETAL SYSTEM
  // ==========================================
  private renderRibCage(ctx: CanvasRenderingContext2D, isCopd: boolean): void {
    ctx.save();
    ctx.filter = 'blur(1.6px)';

    // 10 Posterior Ribs
    const numRibs = 10;
    const baseSpacing = isCopd ? 48 : 42; // Widened in COPD
    const startY = isCopd ? 120 : 135;

    for (let i = 0; i < numRibs; i++) {
      const y = startY + i * baseSpacing;
      const ribW = 12 + Math.sin((i / numRibs) * Math.PI) * 5;
      const curvature = isCopd ? 0.75 : 1.0; // Ribs more horizontal in COPD

      // Posterior Right Rib
      ctx.strokeStyle = 'rgba(165, 172, 188, 0.45)';
      ctx.lineWidth = ribW;
      ctx.beginPath();
      ctx.moveTo(280, y - 5);
      ctx.bezierCurveTo(
        210, y + 10 * curvature,
        110, y + 28 * curvature,
        70, y + 55 * curvature
      );
      ctx.stroke();

      // Sharp cortical margin lines
      ctx.strokeStyle = 'rgba(195, 202, 218, 0.65)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(280, y - 5 - ribW / 2);
      ctx.bezierCurveTo(210, y + 10 * curvature - ribW / 2, 110, y + 28 * curvature - ribW / 2, 70, y + 55 * curvature - ribW / 2);
      ctx.stroke();

      // Posterior Left Rib
      ctx.strokeStyle = 'rgba(165, 172, 188, 0.45)';
      ctx.lineWidth = ribW;
      ctx.beginPath();
      ctx.moveTo(320, y - 5);
      ctx.bezierCurveTo(
        390, y + 10 * curvature,
        490, y + 28 * curvature,
        530, y + 55 * curvature
      );
      ctx.stroke();

      ctx.strokeStyle = 'rgba(195, 202, 218, 0.65)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(320, y - 5 - ribW / 2);
      ctx.bezierCurveTo(390, y + 10 * curvature - ribW / 2, 490, y + 28 * curvature - ribW / 2, 530, y + 55 * curvature - ribW / 2);
      ctx.stroke();
    }

    // 8 Anterior Ribs (Sloping downward-inward at 45 degrees towards sternum)
    for (let i = 0; i < 8; i++) {
      const y = startY + 60 + i * baseSpacing;
      const ribW = 9;

      ctx.strokeStyle = 'rgba(145, 152, 168, 0.3)';
      ctx.lineWidth = ribW;

      // Right Anterior Rib
      ctx.beginPath();
      ctx.moveTo(70, y);
      ctx.quadraticCurveTo(150, y + 45, 240, y + 80);
      ctx.stroke();

      // Left Anterior Rib
      ctx.beginPath();
      ctx.moveTo(530, y);
      ctx.quadraticCurveTo(450, y + 45, 360, y + 80);
      ctx.stroke();
    }
    ctx.restore();
  }

  private renderClaviclesAndScapulae(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.filter = 'blur(1.5px)';

    // S-Shaped Clavicles
    ctx.strokeStyle = 'rgba(175, 182, 198, 0.65)';
    ctx.lineWidth = 11;

    // Right Clavicle
    ctx.beginPath();
    ctx.moveTo(275, 135); // Sternoclavicular joint
    ctx.bezierCurveTo(220, 115, 150, 105, 80, 125); // Acromioclavicular end
    ctx.stroke();

    // Cortical edge highlights
    ctx.strokeStyle = 'rgba(215, 222, 238, 0.75)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(275, 130);
    ctx.bezierCurveTo(220, 110, 150, 100, 80, 120);
    ctx.stroke();

    // Left Clavicle
    ctx.strokeStyle = 'rgba(175, 182, 198, 0.65)';
    ctx.lineWidth = 11;
    ctx.beginPath();
    ctx.moveTo(325, 135);
    ctx.bezierCurveTo(380, 115, 450, 105, 520, 125);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(215, 222, 238, 0.75)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(325, 130);
    ctx.bezierCurveTo(380, 110, 450, 100, 520, 120);
    ctx.stroke();

    // Lateral Scapular Shadows (Winged out laterally)
    ctx.strokeStyle = 'rgba(115, 120, 135, 0.35)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(65, 150);
    ctx.lineTo(45, 280);
    ctx.lineTo(75, 340);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(535, 150);
    ctx.lineTo(555, 280);
    ctx.lineTo(525, 340);
    ctx.stroke();

    ctx.restore();
  }

  // ==========================================
  // PULMONARY VASCULATURE & BRONCHOVASCULAR TREE
  // ==========================================
  private renderPulmonaryVasculature(
    ctx: CanvasRenderingContext2D,
    isCopd: boolean,
    isHeartFailure: boolean,
    isPtx: boolean,
    isPericardial?: boolean,
    isArds?: boolean,
    isMiliary?: boolean,
    isEarlyGGO?: boolean
  ): void {
    ctx.save();
    ctx.filter = 'blur(2px)';

    // Right Hilum (y=320) & Left Hilum (y=305, naturally higher)
    // In Heart Failure: engorged vascular pedicle & cephalization
    // In Pericardial Effusion: clear, oligemic lung fields without cephalization
    // In COPD: pruned peripheral vessels (prominent hila, black periphery)
    const hilarAlpha = isHeartFailure ? 0.75 : isPericardial ? 0.38 : isCopd ? 0.65 : 0.55;
    const vesselColor = `rgba(145, 152, 168, ${hilarAlpha})`;

    ctx.strokeStyle = vesselColor;

    // Right Pulmonary Artery Trunk (Interlobar artery)
    ctx.lineWidth = isHeartFailure ? 14 : isPericardial ? 8.5 : 10;
    ctx.beginPath();
    ctx.moveTo(265, 280);
    ctx.quadraticCurveTo(255, 320, 245, 370);
    ctx.stroke();

    // Left Pulmonary Artery (Loops over left main bronchus)
    ctx.lineWidth = isHeartFailure ? 15 : isPericardial ? 9 : 11;
    ctx.beginPath();
    ctx.moveTo(345, 270);
    ctx.quadraticCurveTo(365, 305, 375, 360);
    ctx.stroke();

    // Branching Vessels: Right Hemithorax (Omit in Pneumothorax if right side)
    if (!isPtx) {
      const branchesR = [
        // Upper lobe branches
        { from: [260, 290], to: [200, 210], w: isHeartFailure ? 5 : 3.5 },
        { from: [200, 210], to: [170, 160], w: isHeartFailure ? 3.5 : 2 },
        { from: [200, 210], to: [230, 160], w: isHeartFailure ? 3.5 : 2 },
        // Middle & Lower lobe branches
        { from: [250, 350], to: [180, 420], w: isCopd ? 2 : isPericardial ? 2.5 : 4 },
        { from: [180, 420], to: [140, 470], w: isCopd ? 1 : isPericardial ? 1.8 : 2.5 },
        { from: [245, 370], to: [220, 490], w: isCopd ? 2 : isPericardial ? 2.8 : 4.5 },
        { from: [220, 490], to: [190, 540], w: isCopd ? 1 : isPericardial ? 1.8 : 2.5 },
      ];

      branchesR.forEach((b) => {
        ctx.lineWidth = b.w;
        ctx.beginPath();
        ctx.moveTo(b.from[0], b.from[1]);
        ctx.lineTo(b.to[0], b.to[1]);
        ctx.stroke();
      });
    }

    // Branching Vessels: Left Hemithorax (Especially visible in Early GGO Lingula)
    const branchesL = [
      // Upper lobe branches
      { from: [360, 285], to: [420, 210], w: isHeartFailure ? 5 : 3.5 },
      { from: [420, 210], to: [450, 160], w: isHeartFailure ? 3.5 : 2 },
      { from: [420, 210], to: [390, 160], w: isHeartFailure ? 3.5 : 2 },
      // Lower lobe & Lingula branches (Sharp lines passing through GGO)
      { from: [370, 340], to: [440, 420], w: isEarlyGGO ? 3.8 : isCopd ? 2 : isPericardial ? 2.5 : 4 },
      { from: [440, 420], to: [480, 470], w: isEarlyGGO ? 2.4 : isCopd ? 1 : isPericardial ? 1.8 : 2.5 },
      { from: [375, 360], to: [400, 490], w: isEarlyGGO ? 4.0 : isCopd ? 2 : isPericardial ? 2.8 : 4.5 },
      { from: [400, 490], to: [430, 540], w: isEarlyGGO ? 2.4 : isCopd ? 1 : isPericardial ? 1.8 : 2.5 },
      // Extra lingular subsegmental vessels for early GGO case
      ...(isEarlyGGO ? [
        { from: [390, 410], to: [425, 445], w: 2.2 },
        { from: [400, 430], to: [415, 465], w: 1.8 }
      ] : []),
    ];

    branchesL.forEach((b) => {
      ctx.lineWidth = b.w;
      ctx.beginPath();
      ctx.moveTo(b.from[0], b.from[1]);
      ctx.lineTo(b.to[0], b.to[1]);
      ctx.stroke();
    });

    // Miliary TB fine reticular lattice
    if (isMiliary) {
      ctx.strokeStyle = 'rgba(175, 182, 200, 0.25)';
      ctx.lineWidth = 0.9;
      for (let i = 0; i < 24; i++) {
        const rx = 90 + (i % 8) * 55;
        const ry = 150 + Math.floor(i / 8) * 110;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx + 28, ry + 16);
        ctx.lineTo(rx + 45, ry - 8);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  // ==========================================
  // CARDIAC SILHOUETTE & MEDIASTINUM
  // ==========================================
  private renderCardiacSilhouette(
    ctx: CanvasRenderingContext2D,
    isCopd: boolean,
    isHeartFailure: boolean,
    isPtx: boolean,
    isPericardial?: boolean,
    isEarlyGGO?: boolean
  ): void {
    ctx.save();
    ctx.filter = 'blur(4px)';

    // In Pericardial Effusion: massive globular water-bottle / flask heart (CTR > 0.68)
    // In Heart Failure: massive cardiomegaly (CTR > 0.62)
    // In COPD: narrow droplet heart (CTR < 0.40)
    // In Tension PTX: mediastinum shifted 15px to left
    const shift = isPtx ? 14 : 0;
    const heartWidth = isPericardial ? 320 : isHeartFailure ? 260 : isCopd ? 130 : 190;
    const apexX = isPericardial ? 472 : isHeartFailure ? 450 : isCopd ? 365 : 405;
    const apexY = isPericardial ? 565 : isHeartFailure ? 555 : isCopd ? 530 : 540;
    const rightHeartX = isPericardial ? 145 : 215;

    const heartGrad = ctx.createRadialGradient(
      310 + shift,
      420,
      20,
      310 + shift,
      420,
      heartWidth * 0.95
    );
    heartGrad.addColorStop(0, 'rgba(125, 132, 148, 0.92)');
    heartGrad.addColorStop(0.5, 'rgba(105, 112, 126, 0.88)');
    heartGrad.addColorStop(0.85, 'rgba(75, 82, 94, 0.75)');
    heartGrad.addColorStop(1, 'rgba(40, 45, 55, 0.3)');

    ctx.fillStyle = heartGrad;
    ctx.beginPath();

    if (isPericardial) {
      // Classic symmetric Water-Bottle / Flask-shaped bulbous heart
      ctx.moveTo(295 + shift, 175);
      ctx.bezierCurveTo(340 + shift, 185, 410 + shift, 280, 445 + shift, 390);
      ctx.bezierCurveTo(465 + shift, 450, apexX + shift, 520, apexX + shift, apexY);
      ctx.bezierCurveTo(380 + shift, apexY + 28, 270 + shift, apexY + 30, rightHeartX + shift, apexY);
      ctx.bezierCurveTo(rightHeartX - 25 + shift, 500, 160 + shift, 420, 185 + shift, 360);
      ctx.bezierCurveTo(210 + shift, 280, 260 + shift, 185, 295 + shift, 175);
      ctx.closePath();
      ctx.fill();

      // Epicardial Fat Pad Sign (Thin lucent stripe separating myocardium from outer pericardium)
      ctx.filter = 'blur(1.2px)';
      ctx.strokeStyle = 'rgba(8, 12, 18, 0.92)'; // Dark fat lucency
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(apexX - 18 + shift, apexY - 25);
      ctx.quadraticCurveTo(apexX - 8 + shift, apexY, apexX - 35 + shift, apexY + 12);
      ctx.stroke();

      // Outer pericardial membrane line
      ctx.strokeStyle = 'rgba(235, 240, 255, 0.85)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(apexX - 22 + shift, apexY - 28);
      ctx.quadraticCurveTo(apexX - 10 + shift, apexY - 2, apexX - 38 + shift, apexY + 14);
      ctx.stroke();
    } else {
      // Standard / Cardiomegaly Silhouette
      ctx.moveTo(295 + shift, 185);
      ctx.bezierCurveTo(310 + shift, 180, 335 + shift, 185, 345 + shift, 205); // Aortic knob
      ctx.bezierCurveTo(348 + shift, 225, 338 + shift, 245, 335 + shift, 260); // Aortopulmonary window
      ctx.bezierCurveTo(345 + shift, 280, 355 + shift, 310, 355 + shift, 340); // Pulmonary conus
      // Left ventricular contour extending down to apex
      ctx.bezierCurveTo(370 + shift, 380, apexX + shift, 460, apexX + shift, apexY);
      // Lower border
      ctx.bezierCurveTo(380 + shift, apexY + 25, 300 + shift, apexY + 30, 240 + shift, apexY + 15);
      // Right cardiophrenic angle to right atrium
      ctx.bezierCurveTo(205 + shift, apexY - 20, 210 + shift, 480, 215 + shift, 420);
      // Right atrium border
      ctx.bezierCurveTo(220 + shift, 360, 235 + shift, 300, 255 + shift, 260);
      // Superior Vena Cava straight margin up to thoracic inlet
      ctx.bezierCurveTo(265 + shift, 230, 280 + shift, 200, 295 + shift, 185);
      ctx.closePath();
      ctx.fill();

      // Early GGO Silhouette Sign: subtle blurring along mid-left cardiac contour
      if (isEarlyGGO) {
        ctx.filter = 'blur(6px)';
        ctx.fillStyle = 'rgba(145, 152, 170, 0.45)';
        ctx.beginPath();
        ctx.ellipse(365, 435, 26, 42, 0.25, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  // ==========================================
  // HEMIDIAPHRAGMS & SUBDIAPHRAGMATIC
  // ==========================================
  private renderHemidiaphragms(
    ctx: CanvasRenderingContext2D,
    isCopd: boolean,
    isPneumonia: boolean,
    isHeartFailure: boolean,
    isPtx: boolean,
    isLoculated?: boolean,
    isPneumoperitoneum?: boolean,
    isPericardial?: boolean
  ): void {
    const H = this.H;
    const diaphragmBaseY = isCopd ? 625 : 570;
    const curvature = isCopd ? 0.35 : 1.0; // Flattened in COPD

    ctx.save();
    ctx.filter = 'blur(4px)';

    // Right Hemidiaphragm (Liver density below)
    const rightEffusion = isPneumonia || isHeartFailure;
    const liverGrad = ctx.createLinearGradient(0, diaphragmBaseY - 40, 0, H);
    liverGrad.addColorStop(0, 'rgba(85, 92, 105, 0.85)');
    liverGrad.addColorStop(0.3, 'rgba(65, 72, 82, 0.9)');
    liverGrad.addColorStop(1, 'rgba(30, 35, 42, 0.95)');

    ctx.fillStyle = liverGrad;
    ctx.beginPath();
    ctx.moveTo(300, diaphragmBaseY);

    if (isLoculated) {
      // Tented diaphragmatic contour (peak pulled up at x=125)
      ctx.quadraticCurveTo(190, diaphragmBaseY - 55, 135, diaphragmBaseY - 25);
      ctx.lineTo(125, diaphragmBaseY - 38); // Tenting peak
      ctx.quadraticCurveTo(95, diaphragmBaseY - 15, 65, diaphragmBaseY + 10);
    } else {
      ctx.quadraticCurveTo(
        190,
        diaphragmBaseY - 60 * curvature,
        rightEffusion ? 120 : 65, // Blunted in effusion
        diaphragmBaseY + (rightEffusion ? 30 : 0)
      );
    }

    ctx.lineTo(65, H);
    ctx.lineTo(300, H);
    ctx.closePath();
    ctx.fill();

    // Left Hemidiaphragm & Gastric Air Bubble (Magenblase)
    const leftBaseY = diaphragmBaseY + 15;
    const leftEffusion = isHeartFailure;

    ctx.beginPath();
    ctx.moveTo(300, leftBaseY);
    ctx.quadraticCurveTo(
      410,
      leftBaseY - 55 * curvature,
      leftEffusion ? 480 : 535,
      leftBaseY + (leftEffusion ? 25 : 0)
    );
    ctx.lineTo(535, H);
    ctx.lineTo(300, H);
    ctx.closePath();
    ctx.fill();

    // Gastric Air Bubble (Magenblase) - thin diaphragmatic stripe under left dome
    ctx.filter = 'blur(2px)';
    ctx.fillStyle = 'rgba(8, 10, 15, 0.92)';
    ctx.beginPath();
    ctx.ellipse(390, leftBaseY + 30, 38, 22, -0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(140, 145, 160, 0.4)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.restore();
  }

  // ==========================================
  // CASE-SPECIFIC RADIOLOGICAL PATHOLOGIES
  // ==========================================
  private renderCaseSpecificPathologies(
    ctx: CanvasRenderingContext2D,
    p: {
      isCopd: boolean;
      isPneumonia: boolean;
      isCancer: boolean;
      isHeartFailure: boolean;
      isPtx: boolean;
      isLoculated: boolean;
      isEarlyGGO: boolean;
      isApicalTb: boolean;
      isPneumoperitoneum: boolean;
      isArds: boolean;
      isMiliary: boolean;
      isPericardial: boolean;
    }
  ): void {
    const {
      isCopd, isPneumonia, isCancer, isHeartFailure, isPtx,
      isLoculated, isEarlyGGO, isApicalTb, isPneumoperitoneum,
      isArds, isMiliary, isPericardial
    } = p;
    // ----------------------------------------------------
    // CASE 1: COPD & EMPHYSEMA
    // ----------------------------------------------------
    if (isCopd) {
      // Bilateral apical hyperlucent bullae with paper-thin white walls
      ctx.save();
      ctx.filter = 'blur(1.5px)';
      ctx.strokeStyle = 'rgba(160, 165, 180, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(160, 180, 45, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(430, 175, 40, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // ----------------------------------------------------
    // CASE 2: LOBAR PNEUMONIA (Right Lower Lobe)
    // ----------------------------------------------------
    if (isPneumonia) {
      ctx.save();
      ctx.filter = 'blur(5px)';

      // Dense fluffy alveolar consolidation filling right lower zone
      const consolGrad = ctx.createRadialGradient(200, 500, 10, 200, 500, 95);
      consolGrad.addColorStop(0, 'rgba(195, 200, 215, 0.88)');
      consolGrad.addColorStop(0.5, 'rgba(170, 175, 192, 0.75)');
      consolGrad.addColorStop(0.85, 'rgba(130, 135, 150, 0.45)');
      consolGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = consolGrad;
      ctx.beginPath();
      ctx.arc(200, 500, 95, 0, Math.PI * 2);
      ctx.fill();

      // Branching dark tubular Air Bronchograms
      ctx.filter = 'blur(1.2px)';
      ctx.strokeStyle = 'rgba(8, 12, 18, 0.95)';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(215, 440);
      ctx.lineTo(205, 480);
      ctx.lineTo(185, 520);
      ctx.moveTo(205, 480);
      ctx.lineTo(225, 515);
      ctx.stroke();

      // Meniscus sign blunting right costophrenic angle
      ctx.fillStyle = 'rgba(175, 180, 195, 0.82)';
      ctx.beginPath();
      ctx.moveTo(65, 540);
      ctx.quadraticCurveTo(100, 560, 140, 580);
      ctx.lineTo(140, 610);
      ctx.lineTo(65, 610);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    // ----------------------------------------------------
    // CASE 3: CENTRAL LUNG CANCER & GOLDEN S SIGN
    // ----------------------------------------------------
    if (isCancer) {
      ctx.save();
      ctx.filter = 'blur(2.5px)';

      // Dense right hilar mass (5x4 cm)
      const massGrad = ctx.createRadialGradient(275, 285, 5, 275, 285, 55);
      massGrad.addColorStop(0, 'rgba(215, 220, 235, 0.95)');
      massGrad.addColorStop(0.6, 'rgba(185, 190, 205, 0.85)');
      massGrad.addColorStop(1, 'rgba(130, 135, 150, 0.2)');
      ctx.fillStyle = massGrad;
      ctx.beginPath();
      ctx.arc(275, 285, 55, 0, Math.PI * 2);
      ctx.fill();

      // Corona Radiata / Spiculated borders
      ctx.strokeStyle = 'rgba(195, 200, 215, 0.65)';
      ctx.lineWidth = 1.8;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
        ctx.beginPath();
        ctx.moveTo(275 + Math.cos(a) * 45, 285 + Math.sin(a) * 45);
        ctx.lineTo(275 + Math.cos(a) * 72, 285 + Math.sin(a) * 72);
        ctx.stroke();
      }

      // Golden S sign of Golden (Right middle lobe atelectasis triangle)
      ctx.fillStyle = 'rgba(165, 170, 185, 0.65)';
      ctx.beginPath();
      ctx.moveTo(275, 285);
      ctx.bezierCurveTo(240, 310, 170, 340, 120, 355);
      ctx.lineTo(260, 380);
      ctx.closePath();
      ctx.fill();

      // Calcified mediastinal nodes
      ctx.filter = 'blur(1px)';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.beginPath();
      ctx.arc(310, 180, 5, 0, Math.PI * 2);
      ctx.arc(302, 192, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // ----------------------------------------------------
    // CASE 4: CONGESTIVE HEART FAILURE
    // ----------------------------------------------------
    if (isHeartFailure) {
      ctx.save();

      // Perihilar "Batwing / Butterfly" pulmonary alveolar edema
      ctx.filter = 'blur(7px)';
      const batwingGrad = ctx.createRadialGradient(250, 370, 10, 250, 370, 85);
      batwingGrad.addColorStop(0, 'rgba(175, 180, 195, 0.65)');
      batwingGrad.addColorStop(0.7, 'rgba(145, 150, 165, 0.45)');
      batwingGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = batwingGrad;
      ctx.beginPath();
      ctx.ellipse(230, 370, 75, 55, -0.2, 0, Math.PI * 2);
      ctx.ellipse(370, 370, 75, 55, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Kerley B Lines (Short 1-2cm horizontal non-branching lines at lateral bases)
      ctx.filter = 'blur(1px)';
      ctx.strokeStyle = 'rgba(215, 220, 235, 0.85)';
      ctx.lineWidth = 2.2;
      for (let i = 0; i < 6; i++) {
        const yR = 490 + i * 14;
        ctx.beginPath();
        ctx.moveTo(70, yR);
        ctx.lineTo(95, yR);
        ctx.stroke();

        const yL = 500 + i * 14;
        ctx.beginPath();
        ctx.moveTo(530, yL);
        ctx.lineTo(505, yL);
        ctx.stroke();
      }

      ctx.restore();
    }

    // ----------------------------------------------------
    // CASE 5: TENSION PNEUMOTHORAX (Right Hemithorax)
    // ----------------------------------------------------
    if (isPtx) {
      ctx.save();

      // 1. Completely avascular, jet-black pleural air pocket in right lateral hemithorax
      ctx.filter = 'blur(3px)';
      ctx.fillStyle = '#020306';
      ctx.beginPath();
      ctx.moveTo(215, 115);
      ctx.bezierCurveTo(150, 140, 120, 240, 130, 370);
      ctx.bezierCurveTo(135, 470, 175, 550, 220, 570);
      ctx.lineTo(65, 570);
      ctx.lineTo(65, 115);
      ctx.closePath();
      ctx.fill();

      // 2. Crisp, fine white line of the VISCERAL PLEURA
      ctx.filter = 'blur(1.2px)';
      ctx.strokeStyle = 'rgba(235, 240, 255, 0.9)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(215, 115);
      ctx.bezierCurveTo(160, 150, 140, 260, 145, 380);
      ctx.bezierCurveTo(150, 470, 185, 530, 225, 565);
      ctx.stroke();

      // 3. Partially collapsed right lung with increased radiodensity
      ctx.filter = 'blur(4px)';
      ctx.fillStyle = 'rgba(125, 132, 148, 0.45)';
      ctx.beginPath();
      ctx.moveTo(215, 115);
      ctx.bezierCurveTo(160, 150, 140, 260, 145, 380);
      ctx.bezierCurveTo(150, 470, 185, 530, 225, 565);
      ctx.lineTo(275, 565);
      ctx.lineTo(275, 115);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    // ----------------------------------------------------
    // CASE 7: LOCULATED PLEURAL EFFUSION & INTERLOBAR PSEUDOTUMOR
    // ----------------------------------------------------
    if (isLoculated) {
      ctx.save();
      ctx.filter = 'blur(2.5px)';

      // 1. Horizontal Minor Fissure line passing across right lung field
      ctx.strokeStyle = 'rgba(205, 212, 228, 0.55)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(70, 345);
      ctx.lineTo(275, 345);
      ctx.stroke();

      // 2. Vanishing Pseudotumor (Phantom tumor) along right minor fissure (biconvex spindle lens)
      const pseudoGrad = ctx.createRadialGradient(215, 345, 5, 215, 345, 55);
      pseudoGrad.addColorStop(0, 'rgba(205, 212, 228, 0.95)');
      pseudoGrad.addColorStop(0.65, 'rgba(175, 182, 200, 0.82)');
      pseudoGrad.addColorStop(1, 'rgba(110, 118, 135, 0.1)');
      ctx.fillStyle = pseudoGrad;

      // Classic spindle shape with tapered medial and lateral ends
      ctx.beginPath();
      ctx.moveTo(150, 345);
      ctx.bezierCurveTo(180, 320, 250, 320, 280, 345);
      ctx.bezierCurveTo(250, 370, 180, 370, 150, 345);
      ctx.closePath();
      ctx.fill();

      // Sharp margin border of encysted fissure fluid
      ctx.strokeStyle = 'rgba(230, 238, 255, 0.85)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // 3. Encapsulated / D-shaped loculated pleural collection along right lateral wall
      const locGrad = ctx.createLinearGradient(65, 0, 145, 0);
      locGrad.addColorStop(0, 'rgba(195, 202, 218, 0.92)');
      locGrad.addColorStop(0.65, 'rgba(160, 168, 185, 0.8)');
      locGrad.addColorStop(1, 'rgba(95, 102, 118, 0.15)');
      ctx.fillStyle = locGrad;

      ctx.beginPath();
      ctx.moveTo(65, 375);
      ctx.bezierCurveTo(135, 395, 140, 465, 65, 490); // D-shaped convexity into lung
      ctx.closePath();
      ctx.fill();

      // Obtuse angle lines with lateral chest wall (> 90 degrees)
      ctx.strokeStyle = 'rgba(225, 232, 248, 0.85)';
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // Split Pleura Sign (Fine separation of visceral and parietal pleural lines)
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(65, 370);
      ctx.bezierCurveTo(140, 395, 145, 465, 65, 495);
      ctx.stroke();

      // 4. Tented diaphragm & apical thickening (fibrotic pleural changes)
      ctx.filter = 'blur(1.5px)';
      ctx.strokeStyle = 'rgba(215, 220, 235, 0.8)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(105, 560);
      ctx.lineTo(125, 532); // Tenting peak
      ctx.lineTo(148, 565);
      ctx.stroke();

      // Apical thickening cap
      ctx.fillStyle = 'rgba(175, 182, 198, 0.65)';
      ctx.beginPath();
      ctx.arc(125, 105, 28, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // ----------------------------------------------------
    // CASE 8: EARLY CONSOLIDATION & GROUND-GLASS OPACITY (GGO)
    // ----------------------------------------------------
    if (isEarlyGGO) {
      ctx.save();

      // 1. Delicate Ground-Glass haze in left lingula (pulmonary vessels remain visible through haze)
      ctx.filter = 'blur(7px)';
      const ggoGrad = ctx.createRadialGradient(395, 430, 8, 395, 430, 80);
      ggoGrad.addColorStop(0, 'rgba(175, 182, 200, 0.52)'); // Semi-transparent haze
      ggoGrad.addColorStop(0.55, 'rgba(145, 152, 170, 0.35)');
      ggoGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ggoGrad;
      ctx.beginPath();
      ctx.ellipse(395, 430, 80, 65, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // 2. Acinar rosettes / peribronchial cuffing (cluster of 5-8mm soft nodular rosettes)
      ctx.filter = 'blur(2.2px)';
      const acinarCenters = [
        [375, 405], [390, 420], [410, 410],
        [385, 445], [415, 440], [365, 390],
      ];
      acinarCenters.forEach(([ax, ay]) => {
        const rosetGrad = ctx.createRadialGradient(ax, ay, 1, ax, ay, 9);
        rosetGrad.addColorStop(0, 'rgba(205, 212, 228, 0.65)');
        rosetGrad.addColorStop(0.7, 'rgba(165, 172, 190, 0.38)');
        rosetGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = rosetGrad;
        ctx.beginPath();
        ctx.arc(ax, ay, 9, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Silhouette sign softly blurring mid-left ventricular cardiac margin
      ctx.filter = 'blur(5px)';
      ctx.fillStyle = 'rgba(155, 162, 180, 0.45)';
      ctx.beginPath();
      ctx.ellipse(355, 455, 30, 42, 0.28, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // ----------------------------------------------------
    // CASE 9: APICAL CAVITARY TUBERCULOSIS
    // ----------------------------------------------------
    if (isApicalTb) {
      ctx.save();

      // 1. Thick-walled Cavity in Right Infraclavicular Zone (x=205, y=175)
      ctx.filter = 'blur(1.5px)';

      // Outer cavity wall (3-4mm thickness)
      ctx.fillStyle = 'rgba(195, 202, 218, 0.85)';
      ctx.beginPath();
      ctx.arc(205, 175, 26, 0, Math.PI * 2);
      ctx.fill();

      // Inner air lumen (radiolucent dark core)
      ctx.fillStyle = 'rgba(8, 12, 18, 0.95)';
      ctx.beginPath();
      ctx.arc(205, 175, 18, 0, Math.PI * 2);
      ctx.fill();

      // Small internal air-fluid level in dependent part of cavity
      ctx.fillStyle = 'rgba(185, 192, 208, 0.75)';
      ctx.beginPath();
      ctx.arc(205, 175, 18, 0.2, Math.PI - 0.2);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'rgba(235, 240, 255, 0.85)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(189, 180);
      ctx.lineTo(221, 180);
      ctx.stroke();

      // Irregular, nodular inner wall lining
      ctx.strokeStyle = 'rgba(215, 222, 238, 0.65)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(205, 175, 26, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Satellite Bronchogenic Nodules (cluster of 3-6mm nodules)
      ctx.filter = 'blur(1.8px)';
      const satNodules = [
        [165, 150, 4.5], [175, 195, 5], [235, 155, 4],
        [240, 190, 6], [225, 225, 5], [250, 235, 4.5],
        [195, 240, 5], [215, 265, 4],
      ];
      satNodules.forEach(([nx, ny, nr]) => {
        const nodGrad = ctx.createRadialGradient(nx, ny, 1, nx, ny, nr);
        nodGrad.addColorStop(0, 'rgba(210, 218, 235, 0.85)');
        nodGrad.addColorStop(0.7, 'rgba(175, 182, 200, 0.5)');
        nodGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = nodGrad;
        ctx.beginPath();
        ctx.arc(nx, ny, nr, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Apical Pleural Cap and Fibrotic Volume Loss Retraction
      ctx.strokeStyle = 'rgba(195, 202, 218, 0.7)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(175, 110, 35, Math.PI * 0.8, Math.PI * 1.8);
      ctx.stroke();

      // Fibrotic retraction bands pulling right hilum upward
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 2]);
      ctx.beginPath();
      ctx.moveTo(205, 195);
      ctx.lineTo(260, 265);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();
    }

    // ----------------------------------------------------
    // CASE 10: PNEUMOPERITONEUM / FREE SUBDIAPHRAGMATIC AIR
    // ----------------------------------------------------
    if (isPneumoperitoneum) {
      ctx.save();

      // 1. Crescentic Free Air Line under Right Hemidiaphragm (Subdiaphragmatic Crescent)
      ctx.filter = 'blur(1px)';

      // Radiolucent jet-black crescent between right diaphragm and liver dome
      ctx.fillStyle = '#020408';
      ctx.beginPath();
      ctx.moveTo(130, 565);
      ctx.quadraticCurveTo(195, 520, 275, 555); // Top curve (diaphragm under-surface)
      ctx.quadraticCurveTo(195, 532, 130, 565); // Bottom curve (liver dome surface - 6mm gap)
      ctx.closePath();
      ctx.fill();

      // Crisp white highlight of the Right Diaphragm Stripe (2mm thin diaphragm)
      ctx.strokeStyle = 'rgba(240, 245, 255, 0.95)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(125, 565);
      ctx.quadraticCurveTo(195, 520, 275, 555);
      ctx.stroke();

      // Solid liver dome upper boundary below the air crescent
      ctx.strokeStyle = 'rgba(165, 172, 188, 0.85)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(130, 565);
      ctx.quadraticCurveTo(195, 532, 275, 555);
      ctx.stroke();

      // 2. Free Air under Left Hemidiaphragm (Separate from gastric Magenblase)
      ctx.fillStyle = '#020408';
      ctx.beginPath();
      ctx.moveTo(330, 565);
      ctx.quadraticCurveTo(410, 538, 485, 575);
      ctx.quadraticCurveTo(410, 548, 330, 565);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(240, 245, 255, 0.95)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(330, 565);
      ctx.quadraticCurveTo(410, 538, 485, 575);
      ctx.stroke();

      // 3. Rigler's Sign (Double Wall Sign) in upper abdomen (x=310, y=640)
      ctx.filter = 'blur(1.5px)';
      // Air on both sides of bowel loop
      ctx.strokeStyle = 'rgba(235, 242, 255, 0.9)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.ellipse(310, 640, 38, 20, 0.1, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }

    // ----------------------------------------------------
    // CASE 11: ARDS & DIFFUSE PERIPHERAL GGO / CONSOLIDATION
    // ----------------------------------------------------
    if (isArds) {
      ctx.save();

      // 1. Bilateral diffuse peripheral ground-glass opacities (GGO)
      ctx.filter = 'blur(8px)';
      const ardsGradR = ctx.createRadialGradient(180, 420, 20, 180, 420, 110);
      ardsGradR.addColorStop(0, 'rgba(185, 192, 210, 0.65)');
      ardsGradR.addColorStop(0.7, 'rgba(150, 158, 175, 0.45)');
      ardsGradR.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ardsGradR;
      ctx.beginPath();
      ctx.ellipse(175, 410, 105, 95, -0.15, 0, Math.PI * 2);
      ctx.fill();

      const ardsGradL = ctx.createRadialGradient(420, 430, 20, 420, 430, 110);
      ardsGradL.addColorStop(0, 'rgba(185, 192, 210, 0.65)');
      ardsGradL.addColorStop(0.7, 'rgba(150, 158, 175, 0.45)');
      ardsGradL.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ardsGradL;
      ctx.beginPath();
      ctx.ellipse(425, 420, 105, 95, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // 2. Multifocal dense patchy consolidation in dependent bases
      ctx.filter = 'blur(4.5px)';
      const basePatchR = ctx.createRadialGradient(165, 485, 10, 165, 485, 65);
      basePatchR.addColorStop(0, 'rgba(215, 222, 238, 0.85)');
      basePatchR.addColorStop(0.7, 'rgba(175, 182, 200, 0.6)');
      basePatchR.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = basePatchR;
      ctx.beginPath();
      ctx.arc(165, 485, 65, 0, Math.PI * 2);
      ctx.fill();

      const basePatchL = ctx.createRadialGradient(435, 495, 10, 435, 495, 65);
      basePatchL.addColorStop(0, 'rgba(215, 222, 238, 0.85)');
      basePatchL.addColorStop(0.7, 'rgba(175, 182, 200, 0.6)');
      basePatchL.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = basePatchL;
      ctx.beginPath();
      ctx.arc(435, 495, 65, 0, Math.PI * 2);
      ctx.fill();

      // 3. Dark branching air bronchograms through the dense infiltrates
      ctx.filter = 'blur(1.2px)';
      ctx.strokeStyle = 'rgba(6, 10, 16, 0.95)';
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(170, 450);
      ctx.lineTo(165, 490);
      ctx.lineTo(145, 525);
      ctx.moveTo(165, 490);
      ctx.lineTo(185, 520);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(430, 455);
      ctx.lineTo(435, 495);
      ctx.lineTo(455, 530);
      ctx.moveTo(435, 495);
      ctx.lineTo(420, 525);
      ctx.stroke();

      ctx.restore();
    }

    // ----------------------------------------------------
    // CASE 12: MILIARY TUBERCULOSIS (Snowstorm Pattern)
    // ----------------------------------------------------
    if (isMiliary) {
      ctx.save();
      ctx.filter = 'blur(1.0px)';

      const noduleColor = 'rgba(225, 232, 248, 0.82)';
      const noduleCore = 'rgba(255, 255, 255, 0.95)';

      const drawMiliaryField = (minX: number, maxX: number, minY: number, maxY: number) => {
        let seed = 42;
        const pseudoRand = () => {
          seed = (seed * 9301 + 49297) % 233280;
          return seed / 233280;
        };

        for (let i = 0; i < 220; i++) {
          const nx = minX + pseudoRand() * (maxX - minX);
          const ny = minY + pseudoRand() * (maxY - minY);
          const nr = 1.2 + pseudoRand() * 1.4;

          // Exclude heart and hilar vessels
          if (nx > 240 && nx < 360 && ny > 260 && ny < 560) continue;

          ctx.fillStyle = noduleColor;
          ctx.beginPath();
          ctx.arc(nx, ny, nr, 0, Math.PI * 2);
          ctx.fill();

          if (nr > 1.8) {
            ctx.fillStyle = noduleCore;
            ctx.beginPath();
            ctx.arc(nx, ny, nr * 0.45, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      };

      // Right lung field
      drawMiliaryField(75, 275, 120, 560);
      // Left lung field
      drawMiliaryField(325, 525, 120, 560);

      ctx.restore();
    }

    // ----------------------------------------------------
    // CASE 13: SEVERE PERICARDIAL EFFUSION (Water Bottle Heart)
    // ----------------------------------------------------
    if (isPericardial) {
      ctx.save();
      ctx.filter = 'blur(1.5px)';
      ctx.strokeStyle = 'rgba(225, 235, 255, 0.85)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(310, 440, 160, 0.25, Math.PI - 0.25);
      ctx.stroke();

      ctx.restore();
    }
  }

  // ==========================================
  // BOWEL OBSTRUCTION PATHOLOGY
  // ==========================================
  private renderBowelObstructionPathology(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.filter = 'blur(2.5px)';

    // Step-ladder dilated small bowel loops with horizontal Air-Fluid Levels
    const loops = [
      { x: 190, y: 260, w: 140, h: 55 },
      { x: 270, y: 330, w: 155, h: 60 },
      { x: 180, y: 400, w: 165, h: 65 },
      { x: 260, y: 475, w: 150, h: 60 },
    ];

    loops.forEach((lp) => {
      // 1. Gas on top (dark radiolucent dome)
      ctx.fillStyle = 'rgba(5, 7, 10, 0.95)';
      ctx.beginPath();
      ctx.ellipse(lp.x + lp.w / 2, lp.y + lp.h / 2, lp.w / 2, lp.h / 2, 0, Math.PI, 0);
      ctx.fill();

      // 2. Fluid below (dense radiopaque fluid reservoir)
      ctx.fillStyle = 'rgba(155, 160, 175, 0.75)';
      ctx.beginPath();
      ctx.ellipse(lp.x + lp.w / 2, lp.y + lp.h / 2, lp.w / 2, lp.h / 2, 0, 0, Math.PI);
      ctx.fill();

      // 3. Crisp horizontal Air-Fluid Interface line
      ctx.strokeStyle = 'rgba(235, 240, 255, 0.85)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(lp.x, lp.y + lp.h / 2);
      ctx.lineTo(lp.x + lp.w, lp.y + lp.h / 2);
      ctx.stroke();

      // 4. Valvulae Conniventes (Plicae circulares crossing completely from wall to wall)
      ctx.strokeStyle = 'rgba(195, 200, 215, 0.55)';
      ctx.lineWidth = 1.4;
      for (let vx = lp.x + 12; vx < lp.x + lp.w - 10; vx += 14) {
        ctx.beginPath();
        ctx.moveTo(vx, lp.y + 4);
        ctx.lineTo(vx, lp.y + lp.h - 4);
        ctx.stroke();
      }
    });

    ctx.restore();
  }

  // ==========================================
  // DICOM METADATA & LEAD ORIENTATION MARKER
  // ==========================================
  private renderDicomMetadataAndLeadMarker(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    // Metallic Lead Marker [ R ] (Right side of patient = Viewer's Left)
    const markerX = 40;
    const markerY = 40;
    ctx.fillStyle = 'rgba(235, 240, 255, 0.95)';
    ctx.font = '900 24px "Be Vietnam Pro", sans-serif';
    ctx.fillText('R', markerX, markerY);

    ctx.strokeStyle = 'rgba(235, 240, 255, 0.85)';
    ctx.lineWidth = 2;
    this.roundRect(ctx, markerX - 6, markerY - 22, 28, 28, 4);
    ctx.stroke();

    // Upper Left Header
    ctx.font = '600 10px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(195, 205, 225, 0.85)';
    ctx.fillText('CHO RAY HOSPITAL • RADIOLOGY PACS', 80, 30);
    ctx.fillStyle = 'rgba(145, 155, 175, 0.75)';
    ctx.fillText(`PATIENT: ${this.patientInfo.gender === 'F' ? 'FEMALE' : 'MALE'}, ${this.patientInfo.age || 60}Y • ${this.caseId.toUpperCase()}`, 80, 45);

    // Upper Right Header
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(195, 205, 225, 0.85)';
    ctx.fillText(this.examType === 'abdomen_supine' ? 'KUB ERECT' : 'CXR PA UPRIGHT', this.W - 30, 30);
    ctx.fillStyle = 'rgba(145, 155, 175, 0.75)';
    ctx.fillText('120 kVp • 3.2 mAs • FFD: 180cm', this.W - 30, 45);

    // Bottom Left Technical Tag
    ctx.textAlign = 'left';
    let windowTag = 'WL: -500  WW: 1500 (LUNG)';
    if (this.windowPreset === 'MEDIASTINUM') windowTag = 'WL: 40  WW: 400 (MEDIASTINUM)';
    else if (this.windowPreset === 'BONE') windowTag = 'WL: 300  WW: 2000 (BONE)';
    else if (this.windowPreset === 'HIGH_DYNAMIC') windowTag = 'WL: -200  WW: 800 (HI-DYNAMIC)';
    else if (this.windowPreset === 'DEFAULT') windowTag = 'WL: -500  WW: 1500 (STANDARD)';
    ctx.fillText(windowTag, 30, this.H - 30);
    ctx.fillText('MATRIX: 2048 x 2560 • 16-BIT DR', 30, this.H - 18);

    // Bottom Right 10cm Calibrated Scale Bar
    const scaleBarX = this.W - 130;
    const scaleBarY = this.H - 26;
    ctx.strokeStyle = 'rgba(215, 225, 245, 0.85)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(scaleBarX, scaleBarY);
    ctx.lineTo(scaleBarX + 100, scaleBarY);
    // End ticks
    ctx.moveTo(scaleBarX, scaleBarY - 5);
    ctx.lineTo(scaleBarX, scaleBarY + 5);
    ctx.moveTo(scaleBarX + 50, scaleBarY - 3);
    ctx.lineTo(scaleBarX + 50, scaleBarY + 3);
    ctx.moveTo(scaleBarX + 100, scaleBarY - 5);
    ctx.lineTo(scaleBarX + 100, scaleBarY + 5);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(195, 205, 225, 0.85)';
    ctx.fillText('10 cm', scaleBarX + 50, scaleBarY - 8);

    ctx.restore();
  }

  // ==========================================
  // MAIN COMPOSITOR DRAW
  // ==========================================
  public draw(): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.W, this.H);

    ctx.save();

    // PACS Interactive Visual Filters
    const b = this.state.brightness; // -80..80
    const c = this.state.contrast; // -80..80
    const brightnessVal = 100 + b;
    const contrastVal = 100 + c;
    const invertVal = this.state.inverted ? 100 : 0;

    ctx.filter = `brightness(${brightnessVal}%) contrast(${contrastVal}%) invert(${invertVal}%)`;

    // Apply Zoom & Pan from center of canvas
    ctx.translate(this.W / 2 + this.state.panX, this.H / 2 + this.state.panY);
    ctx.scale(this.state.zoom, this.state.zoom);
    ctx.translate(-this.W / 2, -this.H / 2);

    // Draw offscreen pre-rendered anatomy
    ctx.drawImage(this.offscreenCanvas, 0, 0);

    ctx.restore();

    // Render CAD / RadAI Hotspots Overlay (in screen coordinates so rings & text stay crisp)
    if (this.state.showOverlay) {
      this.renderHotspotsOverlay();
    }
  }

  // ==========================================
  // SLEEK RADAI CAD OVERLAY
  // ==========================================
  private renderHotspotsOverlay(): void {
    const ctx = this.ctx;
    ctx.save();

    this.findings.forEach(f => {
      if (f.x === undefined || f.y === undefined) return;

      const screenX = (f.x - this.W / 2) * this.state.zoom + this.W / 2 + this.state.panX;
      const screenY = (f.y - this.H / 2) * this.state.zoom + this.H / 2 + this.state.panY;
      const screenR = (f.radius || 40) * this.state.zoom;

      const isActive = f.id === this.activeFindingId;
      const color = this.getSeverityColor(f.severity);

      // Outer Target Reticle
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = isActive ? 2.5 : 1.5;
      ctx.setLineDash(isActive ? [5, 4] : [3, 3]);
      ctx.beginPath();
      ctx.arc(screenX, screenY, screenR, 0, Math.PI * 2);
      ctx.stroke();

      // Precision Corner Bracket Crosshairs
      ctx.setLineDash([]);
      const crossSize = 10;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      // Top-Left corner
      ctx.beginPath();
      ctx.moveTo(screenX - screenR, screenY - 8);
      ctx.lineTo(screenX - screenR, screenY + 8);
      ctx.moveTo(screenX - 8, screenY - screenR);
      ctx.lineTo(screenX + 8, screenY - screenR);
      ctx.stroke();

      // Center glowing marker
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(screenX, screenY, isActive ? 5 : 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Glowing Pulse Ring if active
      if (isActive) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(screenX, screenY, screenR + 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Modern Glassmorphic Tag
      const conf = Math.round(f.confidence > 1 ? f.confidence : f.confidence * 100);
      const label = `${f.nameVi || f.name} (${conf}%)`;
      ctx.font = '700 11px "Be Vietnam Pro", sans-serif';
      const textWidth = ctx.measureText(label).width;
      const boxW = textWidth + 20;
      const boxH = 24;
      const boxX = screenX - boxW / 2;
      const boxY = screenY - screenR - 28;

      ctx.fillStyle = 'rgba(10, 16, 28, 0.9)';
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      this.roundRect(ctx, boxX, boxY, boxW, boxH, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.fillText(label, boxX + 10, boxY + 16);

      ctx.restore();
    });

    ctx.restore();
  }

  private getSeverityColor(sev: Severity): string {
    switch (sev) {
      case 'critical': return '#f43f5e';
      case 'severe': return '#fb923c';
      case 'moderate': return '#fbbf24';
      default: return '#34d399';
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
