/**
 * DocSpace — ECG SVG Renderers, Paper Grids, Cabrera Vector & Calipers
 * Path: src/content/docspace/features/studios/ecg-renderers.ts
 */

import {
  EcgInputs,
  EcgFilterType,
  EcgMontageType,
  HrvAnalysisResult,
  EcgMorphologyComparison,
  EcgCalloutAnnotation,
  NORMAL_SINUS_BASELINE
} from './ecg-types';
import { analyzeEcg } from './ecg-analytics';

export function renderEcgAxisSvg(deg: number): string {
  const size = 320;
  const center = size / 2;
  const r = 115;

  const rad = (deg * Math.PI) / 180;
  const arrowX = center + r * Math.cos(rad);
  const arrowY = center + r * Math.sin(rad);

  const getPt = (angleDeg: number, radius: number) => {
    const a = (angleDeg * Math.PI) / 180;
    return { x: center + radius * Math.cos(a), y: center + radius * Math.sin(a) };
  };

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${size} ${size}" width="100%" height="${size}" style="max-width:320px;">
      <defs>
        <marker id="axisArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
        </marker>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#ef4444" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Vùng màu Trục (Sectors) -->
      <path d="M ${center} ${center} L ${getPt(-30, r).x} ${getPt(-30, r).y} A ${r} ${r} 0 0 1 ${getPt(90, r).x} ${getPt(90, r).y} Z" fill="rgba(16, 185, 129, 0.16)" stroke="#10b981" stroke-width="0.8" />
      <path d="M ${center} ${center} L ${getPt(-90, r).x} ${getPt(-90, r).y} A ${r} ${r} 0 0 1 ${getPt(-30, r).x} ${getPt(-30, r).y} Z" fill="rgba(245, 158, 11, 0.16)" stroke="#f59e0b" stroke-width="0.8" />
      <path d="M ${center} ${center} L ${getPt(90, r).x} ${getPt(90, r).y} A ${r} ${r} 0 0 1 ${getPt(180, r).x} ${getPt(180, r).y} Z" fill="rgba(239, 68, 68, 0.16)" stroke="#ef4444" stroke-width="0.8" />
      <path d="M ${center} ${center} L ${getPt(180, r).x} ${getPt(180, r).y} A ${r} ${r} 0 0 1 ${getPt(-90, r).x} ${getPt(-90, r).y} Z" fill="rgba(139, 92, 246, 0.14)" stroke="#8b5cf6" stroke-width="0.8" />

      <!-- Vòng tròn ngoài & Trục tọa độ -->
      <circle cx="${center}" cy="${center}" r="${r}" fill="none" stroke="var(--color-border)" stroke-width="1.5" />
      <line x1="${center - r - 15}" y1="${center}" x2="${center + r + 15}" y2="${center}" stroke="var(--color-border)" stroke-width="1" />
      <line x1="${center}" y1="${center - r - 15}" x2="${center}" y2="${center + r + 15}" stroke="var(--color-border)" stroke-width="1" />

      <!-- Lead Labels Cabrera / Standard -->
      <text x="${center + r + 18}" y="${center + 4}" fill="var(--color-text)" font-size="9.5" font-weight="800">DI (0°)</text>
      <text x="${center - r - 22}" y="${center + 4}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="end">±180°</text>
      <text x="${center}" y="${center + r + 18}" fill="var(--color-text)" font-size="9.5" font-weight="800" text-anchor="middle">aVF (+90°)</text>
      <text x="${center}" y="${center - r - 8}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="middle">-90° (aVR)</text>

      <!-- Oblique Lead Lines -->
      <line x1="${center}" y1="${center}" x2="${getPt(60, r).x}" y2="${getPt(60, r).y}" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="2,2" />
      <text x="${getPt(60, r + 12).x}" y="${getPt(60, r + 12).y}" fill="var(--color-text-muted)" font-size="8.5">DII (+60°)</text>

      <line x1="${center}" y1="${center}" x2="${getPt(-30, r).x}" y2="${getPt(-30, r).y}" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="2,2" />
      <text x="${getPt(-30, r + 14).x}" y="${getPt(-30, r + 14).y}" fill="var(--color-text-muted)" font-size="8.5">aVL (-30°)</text>

      <line x1="${center}" y1="${center}" x2="${getPt(120, r).x}" y2="${getPt(120, r).y}" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="2,2" />
      <text x="${getPt(120, r + 14).x}" y="${getPt(120, r + 14).y}" fill="var(--color-text-muted)" font-size="8.5">DIII (+120°)</text>

      <!-- Vector Mũi Tên Bệnh Nhân -->
      <line x1="${center}" y1="${center}" x2="${arrowX}" y2="${arrowY}" stroke="#ef4444" stroke-width="3.5" marker-end="url(#axisArrow)" />
      <circle cx="${center}" cy="${center}" r="12" fill="url(#centerGlow)" />
      <circle cx="${center}" cy="${center}" r="4.5" fill="#ef4444" stroke="#ffffff" stroke-width="1.5" />

      <!-- Góc hiển thị trung tâm -->
      <rect x="${center - 36}" y="${center - 40}" width="72" height="22" rx="5" fill="var(--color-surface)" stroke="#ef4444" stroke-width="1.5" />
      <text x="${center}" y="${center - 25}" fill="#ef4444" font-size="11.5" font-weight="800" text-anchor="middle">${deg > 0 ? `+${deg}` : deg}°</text>
    </svg>
  `;
}

/**
 * Render Sơ Đồ Cây Động Mạch Vành Giải Phẫu & Vùng Tổn Thương SVG (Coronary Tree Mapper)
 */
export function renderCoronaryArterySvg(culprit: 'LAD' | 'LCx' | 'RCA' | 'LMCA' | 'NONE' | 'MULTI'): string {
  const isLad = culprit === 'LAD' || culprit === 'LMCA' || culprit === 'MULTI';
  const isLcx = culprit === 'LCx' || culprit === 'LMCA' || culprit === 'MULTI';
  const isRca = culprit === 'RCA' || culprit === 'MULTI';
  const isLmca = culprit === 'LMCA';

  return `
    <svg viewBox="0 0 420 280" width="100%" height="240" style="background:var(--color-surface); border-radius:12px;">
      <defs>
        <radialGradient id="ladGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#ef4444" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="rcaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="lcxGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Khung viền tim giải phẫu -->
      <path d="M 210,50 C 270,10 370,60 370,140 C 370,200 280,240 210,265 C 140,240 50,200 50,140 C 50,60 150,10 210,50 Z" 
            fill="var(--color-bg)" stroke="var(--color-border)" stroke-width="2" />

      <!-- Gốc Động Mạch Chủ (Aortic Root) -->
      <ellipse cx="210" cy="55" rx="24" ry="12" fill="var(--color-surface)" stroke="var(--color-text-muted)" stroke-width="2" />
      <text x="210" y="40" fill="var(--color-text-muted)" font-size="9" font-weight="700" text-anchor="middle">Gốc ĐM Chủ (Aorta)</text>

      <!-- 1. Thân Chung ĐM Vành Trái (LMCA) -->
      <path d="M 225,58 Q 240,65 255,75" fill="none" stroke="${isLmca ? '#ef4444' : 'var(--color-text-muted)'}" stroke-width="${isLmca ? '6' : '3.5'}" stroke-linecap="round" />
      ${isLmca ? '<circle cx="240" cy="66" r="10" fill="url(#ladGlow)" /><text x="260" y="60" fill="#ef4444" font-size="10" font-weight="800">💥 LMCA TẮC CẤP</text>' : '<text x="250" y="65" fill="var(--color-text-muted)" font-size="8.5">LMCA</text>'}

      <!-- 2. Nhánh Liên Thất Trước (LAD) -->
      <path d="M 255,75 Q 245,130 215,190 Q 210,225 210,250" fill="none" stroke="${isLad ? '#dc2626' : '#94a3b8'}" stroke-width="${isLad ? '5' : '3'}" stroke-linecap="round" />
      <path d="M 245,115 Q 275,135 295,155" fill="none" stroke="${isLad ? '#dc2626' : '#94a3b8'}" stroke-width="2" />
      <path d="M 230,160 Q 255,180 270,200" fill="none" stroke="${isLad ? '#dc2626' : '#94a3b8'}" stroke-width="1.8" />
      ${isLad ? '<circle cx="245" cy="115" r="12" fill="url(#ladGlow)" /><text x="280" y="115" fill="#dc2626" font-size="10" font-weight="800">LAD (Thủ phạm chính)</text>' : '<text x="265" y="125" fill="#64748b" font-size="8.5">LAD (Thành Trước)</text>'}

      <!-- 3. Nhánh Mũ (LCx) -->
      <path d="M 255,75 Q 315,90 340,140 Q 350,175 335,210" fill="none" stroke="${isLcx ? '#2563eb' : '#94a3b8'}" stroke-width="${isLcx ? '5' : '3'}" stroke-linecap="round" />
      <path d="M 310,105 Q 330,125 345,135" fill="none" stroke="${isLcx ? '#2563eb' : '#94a3b8'}" stroke-width="2" />
      ${isLcx ? '<circle cx="310" cy="105" r="12" fill="url(#lcxGlow)" /><text x="325" y="90" fill="#2563eb" font-size="10" font-weight="800">LCx (Thành Bên)</text>' : '<text x="325" y="90" fill="#64748b" font-size="8.5">LCx</text>'}

      <!-- 4. Động Mạch Vành Phải (RCA) -->
      <path d="M 195,58 Q 140,80 115,130 Q 100,180 135,225 Q 165,245 190,250" fill="none" stroke="${isRca ? '#ea580c' : '#94a3b8'}" stroke-width="${isRca ? '5' : '3'}" stroke-linecap="round" />
      <path d="M 125,110 Q 155,130 170,145" fill="none" stroke="${isRca ? '#ea580c' : '#94a3b8'}" stroke-width="2" />
      <path d="M 110,160 Q 140,175 160,185" fill="none" stroke="${isRca ? '#ea580c' : '#94a3b8'}" stroke-width="1.8" />
      ${isRca ? '<circle cx="125" cy="110" r="12" fill="url(#rcaGlow)" /><text x="55" y="115" fill="#ea580c" font-size="10" font-weight="800">RCA (Thành Dưới/RV)</text>' : '<text x="75" y="125" fill="#64748b" font-size="8.5">RCA</text>'}

      <!-- Chú thích Vùng Mạch Máu -->
      <g transform="translate(15, 240)">
        <rect width="180" height="32" rx="6" fill="var(--color-surface-offset, #f8fafc)" stroke="var(--color-border)" stroke-width="0.8" />
        <circle cx="12" cy="16" r="4" fill="${culprit === 'LAD' || culprit === 'LMCA' ? '#dc2626' : culprit === 'RCA' ? '#ea580c' : culprit === 'LCx' ? '#2563eb' : '#10b981'}" />
        <text x="24" y="19" fill="var(--color-text)" font-size="9" font-weight="700">Mạch Thủ Phạm: ${culprit === 'NONE' ? 'Chưa thấy tắc cấp' : culprit}</text>
      </g>
    </svg>
  `;
}

// ============================================================
// PAPER SETTINGS INTERFACE
// ============================================================
export interface EcgPaperSettings {
  speedMmPerSec: 12.5 | 25 | 50;   // Tốc độ giấy (mm/s)
  gainMmPerMv: 5 | 10 | 20;         // Độ khuếch đại (mm/mV)
  rhythmLead: string;                 // Lead rhythm strip (mặc định II)
}

export const DEFAULT_PAPER_SETTINGS: EcgPaperSettings = {
  speedMmPerSec: 25,
  gainMmPerMv: 10,
  rhythmLead: 'II',
};

// ============================================================
// PER-LEAD WAVEFORM GENERATOR (Vector Cardiography Model)
// ============================================================

export function getLeadAmplitudes(lead: string, inputs: EcgInputs): {
  pAmp: number;       // Biên độ P (mm), âm = đảo
  pDur: number;       // Thời gian P (ms)
  qDepth: number;     // Độ sâu Q (mm)
  rHeight: number;    // Chiều cao R (mm)
  sDepth: number;     // Độ sâu S (mm)
  tAmp: number;       // Biên độ T (mm)
  stDev: number;      // ST chênh (mm)
  rPrimed: boolean;   // R' (thỏ hai bướu: RBBB, V1)
  qrsWide: boolean;   // QRS ≥ 120ms
} {
  const { lead1Net = 6, avfNet = 4, rv5 = 14, rv6 = 12, sv1 = 10, sv3 = 8 } = inputs;
  const qrsWide = (inputs.qrsDuration || 85) >= 120;
  const hasDelta = inputs.hasDeltaWave;
  const hasLbbb = inputs.hasLbbb;

  const stKey = `st${lead}` as keyof EcgInputs;
  const stDev = (inputs[stKey] as number | undefined) || 0;

  const diAmp = lead1Net;
  const avfAmp = avfNet;
  const diiAmp = 0.5 * diAmp + 0.866 * avfAmp;
  const diiiAmp = -0.5 * diAmp + 0.866 * avfAmp;
  const avrAmp = -(diAmp + avfAmp) / 2;
  const avlAmp = (diAmp - avfAmp) / 2;
  const avfCalc = avfAmp;

  switch (lead) {
    case 'I':
      return { pAmp: diAmp > 0 ? 1.8 : -0.8, pDur: inputs.pWaveDuration || 90, qDepth: diAmp > 0 ? 1 : 0, rHeight: Math.max(0, diAmp * 1.2), sDepth: Math.max(0, diAmp < 0 ? Math.abs(diAmp) * 1.5 : 2), tAmp: diAmp > 0 ? 2.5 : -1.5, stDev, rPrimed: false, qrsWide };
    case 'II':
      return { pAmp: diiAmp > 0 ? 2.2 : -0.8, pDur: inputs.pWaveDuration || 90, qDepth: 0.5, rHeight: Math.max(2, diiAmp * 1.3), sDepth: 1.5, tAmp: diiAmp > 0 ? 3.5 : -1.5, stDev, rPrimed: false, qrsWide };
    case 'III':
      return { pAmp: diiiAmp > 0 ? 1.0 : -1.2, pDur: inputs.pWaveDuration || 90, qDepth: diiiAmp < 0 ? 2.5 : 0.5, rHeight: Math.max(0, diiiAmp * 1.1), sDepth: Math.max(0, diiiAmp < 0 ? Math.abs(diiiAmp) * 1.2 : 3), tAmp: diiiAmp > 0 ? 1.5 : -1.5, stDev, rPrimed: false, qrsWide };
    case 'aVR':
      return { pAmp: avrAmp < 0 ? -1.5 : 0.5, pDur: inputs.pWaveDuration || 90, qDepth: Math.max(0, -avrAmp * 0.8), rHeight: Math.max(0, avrAmp > 0 ? avrAmp * 1.0 : 0), sDepth: Math.max(0, -avrAmp * 1.2), tAmp: avrAmp < 0 ? -2.0 : 1.5, stDev: -(stDev) * 0.5, rPrimed: false, qrsWide };
    case 'aVL':
      return { pAmp: avlAmp > 0 ? 1.2 : -0.6, pDur: inputs.pWaveDuration || 90, qDepth: avlAmp < 0 ? 1.5 : 0.5, rHeight: Math.max(0, avlAmp * 1.4), sDepth: avlAmp < 0 ? 3 : 2, tAmp: avlAmp > 0 ? 2.0 : -1.5, stDev, rPrimed: false, qrsWide };
    case 'aVF':
      return { pAmp: avfCalc > 0 ? 1.8 : -0.8, pDur: inputs.pWaveDuration || 90, qDepth: 0.5, rHeight: Math.max(0, avfCalc * 1.3), sDepth: 2, tAmp: avfCalc > 0 ? 2.5 : -1.5, stDev, rPrimed: false, qrsWide };
    case 'V1': {
      const rH = hasLbbb ? 0.5 : 2;
      const sD = sv1 || 10;
      return { pAmp: -0.5, pDur: inputs.pWaveDuration || 90, qDepth: 0, rHeight: rH, sDepth: sD, tAmp: hasLbbb ? 2.5 : -1.5, stDev, rPrimed: !hasLbbb, qrsWide };
    }
    case 'V2': {
      const rH = hasLbbb ? 0.5 : 3;
      const sD = Math.max(sv1 || 10, (sv3 || 8));
      return { pAmp: 0.5, pDur: inputs.pWaveDuration || 90, qDepth: 0, rHeight: rH, sDepth: sD, tAmp: hasLbbb ? 3 : (inputs.tWaveType === 'biphasic_wellens' ? 0 : -1), stDev, rPrimed: !hasLbbb, qrsWide };
    }
    case 'V3': {
      const rH = ((sv3 || 8) + (rv5 || 14)) / 3.5;
      const sD = (sv3 || 8) * 0.7;
      return { pAmp: 1.0, pDur: inputs.pWaveDuration || 90, qDepth: 0, rHeight: rH, sDepth: sD, tAmp: 1.5, stDev, rPrimed: false, qrsWide };
    }
    case 'V4': {
      const rH = (rv5 || 14) * 0.85;
      const sD = (sv3 || 8) * 0.4;
      return { pAmp: 1.2, pDur: inputs.pWaveDuration || 90, qDepth: hasDelta ? 0 : 0.5, rHeight: rH, sDepth: sD, tAmp: 2.5, stDev, rPrimed: false, qrsWide };
    }
    case 'V5': {
      const rH = rv5 || 14;
      const sD = hasLbbb ? 2 : 1.5;
      return { pAmp: 1.2, pDur: inputs.pWaveDuration || 90, qDepth: hasDelta ? 0 : 1, rHeight: rH, sDepth: sD, tAmp: 3, stDev, rPrimed: false, qrsWide };
    }
    case 'V6': {
      const rH = (inputs.rv6 || 12);
      return { pAmp: 1.2, pDur: inputs.pWaveDuration || 90, qDepth: hasDelta ? 0 : 1.2, rHeight: rH, sDepth: 0.5, tAmp: 2.5, stDev, rPrimed: false, qrsWide };
    }
    case 'V7':
    case 'V8':
    case 'V9':
      return { pAmp: 0.8, pDur: inputs.pWaveDuration || 90, qDepth: 0.5, rHeight: 8, sDepth: 2, tAmp: inputs.stV7V9 && inputs.stV7V9 > 0.5 ? 2.5 : 1.5, stDev: inputs.stV7V9 || 0, rPrimed: false, qrsWide };
    case 'V3R':
    case 'V4R':
    case 'V5R':
      return { pAmp: -0.5, pDur: inputs.pWaveDuration || 90, qDepth: 0, rHeight: 1.5, sDepth: 3, tAmp: inputs.stV4R && inputs.stV4R > 0.5 ? 1.5 : -1, stDev: inputs.stV4R || 0, rPrimed: false, qrsWide };
    case 'Lewis':
      // Lewis lead: Bipolar modified I with 3x augmented P-wave
      return { pAmp: 4.5, pDur: inputs.pWaveDuration || 90, qDepth: 0.5, rHeight: 6, sDepth: 2, tAmp: 1.8, stDev: 0, rPrimed: false, qrsWide };
    default:
      return { pAmp: 1, pDur: 90, qDepth: 0.5, rHeight: 8, sDepth: 2, tAmp: 2.5, stDev: 0, rPrimed: false, qrsWide };
  }
}

/**
 * Tạo SVG path data cho 1 nhịp tim (single beat) của 1 chuyển đạo kèm mô phỏng bộ lọc
 */
export function generateBeatPath(
  startX: number,
  baseY: number,
  rrMs: number,
  inputs: EcgInputs,
  lead: string,
  pxPerMm: number,
  gainMmPerMv: number,
  filter: EcgFilterType = 'standard'
): string {
  const amp = getLeadAmplitudes(lead, inputs);
  const qrsDur = inputs.qrsDuration || 85;
  const prDur = inputs.prInterval || 160;
  const qtDur = inputs.qtInterval || 400;

  const msToX = (ms: number) => ms * 0.025 * pxPerMm;
  const mmToY = (mm: number) => -mm * (gainMmPerMv / 10) * pxPerMm;

  // Mô phỏng dập dềnh đường đẳng điện nếu là Raw filter
  let driftOffset = 0;
  if (filter === 'raw' || filter === 'notch50') {
    driftOffset = Math.sin(startX * 0.012) * pxPerMm * 2.2;
  }
  const effectiveBaseY = baseY + driftOffset;

  const x0 = startX;
  const pStart = x0 + msToX(20);
  const pEnd = x0 + msToX(20 + amp.pDur);
  const qrsStart = x0 + msToX(prDur);
  const qEnd = qrsStart + msToX(qrsDur * 0.15);
  const rPeak = qrsStart + msToX(qrsDur * 0.35);
  const sPeak = qrsStart + msToX(qrsDur * 0.65);
  const jPoint = qrsStart + msToX(qrsDur);
  const tPeak = jPoint + msToX((qtDur - qrsDur) * 0.5);
  const tEnd = x0 + msToX(qtDur + prDur * 0.8);

  const stY = effectiveBaseY + mmToY(amp.stDev);

  let tAmpCalc = amp.tAmp;
  const tType = inputs.tWaveType || 'normal';
  if (tType === 'inverted') tAmpCalc = -Math.abs(tAmpCalc);
  if (tType === 'peaked' || tType === 'hyperacute') tAmpCalc = Math.abs(tAmpCalc) * 1.8;
  if (tType === 'flattened') tAmpCalc = Math.abs(tAmpCalc) * 0.15;
  if (tType === 'de_winter') tAmpCalc = Math.abs(tAmpCalc) * 2.2;

  const isAfib = inputs.rhythmType === 'afib';
  const isVt = inputs.rhythmType === 'vt';
  const isPacing = inputs.rhythmType === 'pacing';
  const isDelta = inputs.hasDeltaWave;

  let d = `M ${x0},${effectiveBaseY} `;
  d += `L ${pStart},${effectiveBaseY} `;

  // Sóng P
  if (!isAfib && (inputs.hyperkalemiaStage || 0) < 3 && !isVt) {
    const pMid = (pStart + pEnd) / 2;
    const pTop = effectiveBaseY + mmToY(amp.pAmp);
    if (inputs.rhythmType === 'aflutter') {
      d += `L ${pMid},${effectiveBaseY + mmToY(2.5)} L ${pEnd},${effectiveBaseY + mmToY(-1)} L ${pEnd + msToX(50)},${effectiveBaseY + mmToY(2.5)} L ${pEnd + msToX(100)},${effectiveBaseY + mmToY(-1)} L ${qrsStart},${effectiveBaseY} `;
    } else {
      d += `C ${pStart + msToX(20)},${pTop} ${pEnd - msToX(20)},${pTop} ${pEnd},${effectiveBaseY} `;
    }
  } else if (isAfib) {
    const steps = 8;
    const stepX = (qrsStart - pStart) / steps;
    for (let i = 0; i < steps; i++) {
      const noiseY = effectiveBaseY + mmToY(Math.sin(i * 2.3) * 0.8);
      d += `L ${pStart + i * stepX},${noiseY} `;
    }
  }

  // Đoạn PR
  d += `L ${qrsStart},${effectiveBaseY} `;

  // Phức bộ QRS
  if (isPacing) {
    d += `L ${qrsStart},${effectiveBaseY + mmToY(-6)} L ${qrsStart + 2},${effectiveBaseY + mmToY(-6)} L ${qrsStart + 2},${effectiveBaseY} `;
    d += `L ${qEnd},${effectiveBaseY + mmToY(2)} L ${rPeak},${effectiveBaseY + mmToY(amp.rHeight * 0.7)} L ${sPeak},${effectiveBaseY + mmToY(-amp.sDepth * 0.5)} L ${jPoint},${stY} `;
  } else if (isDelta) {
    const deltaEnd = qrsStart + msToX(40);
    d += `L ${deltaEnd},${effectiveBaseY + mmToY(amp.rHeight * 0.4)} `;
    d += `L ${rPeak},${effectiveBaseY + mmToY(amp.rHeight)} L ${sPeak},${effectiveBaseY + mmToY(-amp.sDepth)} L ${jPoint},${stY} `;
  } else if (amp.rPrimed && !inputs.hasLbbb) {
    d += `L ${qEnd},${effectiveBaseY + mmToY(-amp.qDepth)} `;
    d += `L ${qrsStart + msToX(15)},${effectiveBaseY + mmToY(amp.rHeight)} `;
    d += `L ${sPeak},${effectiveBaseY + mmToY(-amp.sDepth)} `;
    d += `L ${sPeak + msToX(15)},${effectiveBaseY + mmToY(amp.rHeight * 0.6)} `;
    d += `L ${jPoint},${stY} `;
  } else {
    if (amp.qDepth > 0) {
      d += `L ${qEnd},${effectiveBaseY + mmToY(-amp.qDepth)} `;
    }
    if (amp.rHeight > 0) {
      d += `L ${rPeak},${effectiveBaseY + mmToY(amp.rHeight)} `;
    }
    if (amp.sDepth > 0) {
      d += `L ${sPeak},${effectiveBaseY + mmToY(-amp.sDepth)} `;
    }
    d += `L ${jPoint},${stY} `;
  }

  // Đoạn ST
  d += `L ${tPeak - msToX(40)},${stY} `;

  // Sóng T
  if (tType === 'biphasic_wellens') {
    d += `C ${tPeak - msToX(30)},${effectiveBaseY + mmToY(tAmpCalc * 0.5)} ${tPeak},${effectiveBaseY + mmToY(tAmpCalc * 0.5)} ${tPeak},${effectiveBaseY} `;
    d += `C ${tPeak + msToX(20)},${effectiveBaseY + mmToY(-tAmpCalc * 1.5)} ${tEnd - msToX(20)},${effectiveBaseY + mmToY(-tAmpCalc * 1.5)} ${tEnd},${effectiveBaseY} `;
  } else if (tType === 'de_winter') {
    d += `C ${tPeak - msToX(30)},${effectiveBaseY + mmToY(-2)} ${tPeak},${effectiveBaseY + mmToY(tAmpCalc)} ${tEnd},${effectiveBaseY} `;
  } else {
    d += `C ${tPeak - msToX(20)},${effectiveBaseY + mmToY(tAmpCalc * 1.1)} ${tPeak + msToX(20)},${effectiveBaseY + mmToY(tAmpCalc * 1.1)} ${tEnd},${effectiveBaseY} `;
  }

  // Sóng Osborn
  if (inputs.hasOsbornWave) {
    d += `L ${tEnd + msToX(20)},${effectiveBaseY + mmToY(5)} L ${tEnd + msToX(50)},${effectiveBaseY} `;
  }

  // Sóng U
  if (inputs.hasUWave) {
    const uMid = tEnd + msToX(80);
    d += `C ${tEnd + msToX(40)},${effectiveBaseY + mmToY(1.2)} ${uMid},${effectiveBaseY + mmToY(1.5)} ${uMid + msToX(40)},${effectiveBaseY} `;
  }

  d += `L ${x0 + msToX(rrMs)},${effectiveBaseY} `;

  return d;
}

/**
 * Render 1 strip của 1 chuyển đạo
 */
export function renderLeadStrip(
  lead: string,
  inputs: EcgInputs,
  settings: EcgPaperSettings,
  stripWidthPx: number,
  stripHeightPx: number,
  traceStroke: string,
  showLabel = true,
  showCalPulse = true,
  filter: EcgFilterType = 'standard'
): string {
  const { speedMmPerSec, gainMmPerMv } = settings;
  const boxPx = stripWidthPx / (speedMmPerSec * 4);
  const pxPerMs = boxPx / 40;

  const hr = inputs.heartRate || 75;
  const rrMs = (60 / hr) * 1000;
  const rrPx = rrMs * pxPerMs;

  const baseY = stripHeightPx / 2;
  const numBeats = Math.ceil(stripWidthPx / rrPx) + 1;
  const mmPx = boxPx;

  let pathData = `M 0,${baseY} `;
  const calOffset = showCalPulse ? 30 : 0;

  if (showCalPulse) {
    const calH = mmPx * gainMmPerMv;
    pathData += `L ${5},${baseY} L ${5},${baseY - calH} L ${20},${baseY - calH} L ${20},${baseY} L ${calOffset},${baseY} `;
  }

  for (let b = 0; b < numBeats; b++) {
    const startX = calOffset + b * rrPx;
    if (startX > stripWidthPx + rrPx) break;
    pathData += generateBeatPath(startX, baseY, rrMs, inputs, lead, mmPx, gainMmPerMv, filter);
  }

  const labelText = lead.replace('aV', 'a') === 'aVR' ? 'aVR' : lead;

  return `
    <path d="${pathData}" fill="none" stroke="${traceStroke}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
    ${showLabel ? `
    <rect x="4" y="4" width="${labelText.length * 7 + 6}" height="16" rx="3" fill="rgba(0,0,0,0.55)" />
    <text x="7" y="15.5" fill="#ffffff" font-size="10" font-weight="800" font-family="'Inter', monospace">${labelText}</text>
    ` : ''}
  `;
}

/**
 * === MAIN FUNCTION 1: render12LeadEcgPaper (Hỗ trợ 5 kiểu Montage & Digital Filters) ===
 */
export function render12LeadEcgPaper(
  inputs: EcgInputs,
  settings: EcgPaperSettings = DEFAULT_PAPER_SETTINGS,
  theme: 'paper' | 'neon' | 'dark' = 'paper',
  montage: EcgMontageType = 'cabrera',
  filter: EcgFilterType = 'standard'
): string {
  const totalW = 860;
  const topPad = 32;

  let bgFill = '#fff5f5';
  let gridSmall = 'rgba(252, 165, 165, 0.7)';
  let gridLarge = 'rgba(239, 68, 68, 0.65)';
  let traceColor = '#111827';
  let textColor = '#1e3a5f';
  let headerBg = 'rgba(239, 68, 68, 0.06)';
  let dividerColor = 'rgba(239, 68, 68, 0.25)';

  if (theme === 'neon') {
    bgFill = '#030712';
    gridSmall = 'rgba(16, 185, 129, 0.12)';
    gridLarge = 'rgba(16, 185, 129, 0.35)';
    traceColor = '#10b981';
    textColor = '#34d399';
    headerBg = 'rgba(16, 185, 129, 0.08)';
    dividerColor = 'rgba(16, 185, 129, 0.2)';
  } else if (theme === 'dark') {
    bgFill = '#0f172a';
    gridSmall = 'rgba(255,255,255,0.04)';
    gridLarge = 'rgba(255,255,255,0.10)';
    traceColor = '#38bdf8';
    textColor = '#94a3b8';
    headerBg = 'rgba(56, 189, 248, 0.06)';
    dividerColor = 'rgba(255,255,255,0.08)';
  }

  const filterLabels: Record<EcgFilterType, string> = {
    standard: '0.5 - 35 Hz (Medical Standard + Notch)',
    raw: 'RAW (Tín hiệu thô - Không lọc)',
    hp05: '0.5 Hz High-Pass (Lọc Baseline)',
    notch50: '50 Hz AC Notch (Lọc điện lưới)',
    lp35: '35 Hz Low-Pass (Lọc co cơ)',
  };

  const gId = `ecgG_${Date.now()}`;
  const smallBox = 2.5;
  const largeBox = 12.5;

  // Montage 1: Standard 6x2 Layout (6 Limb Left, 6 Precordial Right)
  if (montage === 'standard6x2') {
    const colW = totalW / 2;
    const rowH = 65;
    const totalH = topPad + rowH * 6 + 10;
    const leadsLimb = ['I', 'II', 'III', 'aVR', 'aVL', 'aVF'];
    const leadsPrecordial = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6'];

    return `
      <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto" style="border-radius:10px; display:block; max-width:100%;">
        <defs>
          <pattern id="${gId}_sm" width="${smallBox}" height="${smallBox}" patternUnits="userSpaceOnUse">
            <path d="M ${smallBox} 0 L 0 0 0 ${smallBox}" fill="none" stroke="${gridSmall}" stroke-width="0.4"/>
          </pattern>
          <pattern id="${gId}_lg" width="${largeBox}" height="${largeBox}" patternUnits="userSpaceOnUse">
            <rect width="${largeBox}" height="${largeBox}" fill="url(#${gId}_sm)"/>
            <path d="M ${largeBox} 0 L 0 0 0 ${largeBox}" fill="none" stroke="${gridLarge}" stroke-width="1.0"/>
          </pattern>
        </defs>

        <rect width="${totalW}" height="${totalH}" fill="${bgFill}" rx="10"/>
        <rect x="0" y="${topPad}" width="${totalW}" height="${totalH - topPad}" fill="url(#${gId}_lg)"/>

        <!-- Header -->
        <rect x="0" y="0" width="${totalW}" height="${topPad}" fill="${headerBg}" rx="10"/>
        <text x="12" y="20" fill="${textColor}" font-size="10.5" font-weight="800">
          ECG STANDARD 6x2 MONTAGE — ${settings.speedMmPerSec} mm/s | ${settings.gainMmPerMv} mm/mV | Filter: ${filterLabels[filter]}
        </text>

        <!-- Divider -->
        <line x1="${colW}" y1="${topPad}" x2="${colW}" y2="${totalH}" stroke="${dividerColor}" stroke-width="1.2"/>

        <!-- Limb Leads -->
        ${leadsLimb.map((lead, i) => `
          <g transform="translate(0, ${topPad + i * rowH})">
            ${renderLeadStrip(lead, inputs, settings, colW, rowH, traceColor, true, true, filter)}
          </g>
        `).join('')}

        <!-- Precordial Leads -->
        ${leadsPrecordial.map((lead, i) => `
          <g transform="translate(${colW}, ${topPad + i * rowH})">
            ${renderLeadStrip(lead, inputs, settings, colW, rowH, traceColor, true, false, filter)}
          </g>
        `).join('')}
      </svg>
    `;
  }

  // Montage 2: Continuous 12x1 Strip (12 channels vertical)
  if (montage === 'continuous12x1') {
    const rowH = 55;
    const all12 = ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'];
    const totalH = topPad + rowH * 12 + 10;

    return `
      <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto" style="border-radius:10px; display:block; max-width:100%;">
        <defs>
          <pattern id="${gId}_sm" width="${smallBox}" height="${smallBox}" patternUnits="userSpaceOnUse">
            <path d="M ${smallBox} 0 L 0 0 0 ${smallBox}" fill="none" stroke="${gridSmall}" stroke-width="0.4"/>
          </pattern>
          <pattern id="${gId}_lg" width="${largeBox}" height="${largeBox}" patternUnits="userSpaceOnUse">
            <rect width="${largeBox}" height="${largeBox}" fill="url(#${gId}_sm)"/>
            <path d="M ${largeBox} 0 L 0 0 0 ${largeBox}" fill="none" stroke="${gridLarge}" stroke-width="1.0"/>
          </pattern>
        </defs>

        <rect width="${totalW}" height="${totalH}" fill="${bgFill}" rx="10"/>
        <rect x="0" y="${topPad}" width="${totalW}" height="${totalH - topPad}" fill="url(#${gId}_lg)"/>

        <!-- Header -->
        <rect x="0" y="0" width="${totalW}" height="${topPad}" fill="${headerBg}" rx="10"/>
        <text x="12" y="20" fill="${textColor}" font-size="10.5" font-weight="800">
          ECG 12x1 CONTINUOUS STRIP — ${settings.speedMmPerSec} mm/s | ${settings.gainMmPerMv} mm/mV | Filter: ${filterLabels[filter]}
        </text>

        ${all12.map((lead, i) => `
          <g transform="translate(0, ${topPad + i * rowH})">
            ${renderLeadStrip(lead, inputs, settings, totalW, rowH, traceColor, true, true, filter)}
            <line x1="0" y1="${rowH}" x2="${totalW}" y2="${rowH}" stroke="${dividerColor}" stroke-width="0.5" stroke-dasharray="2,2"/>
          </g>
        `).join('')}
      </svg>
    `;
  }

  // Montage 3: Extended Posterior & Right Ventricular Leads (V7-V9 + V3R-V5R)
  if (montage === 'extended_rv_posterior') {
    const colW = totalW / 3;
    const rowH = 95;
    const extRows = [
      ['V7', 'V8', 'V9'],
      ['V3R', 'V4R', 'V5R'],
      ['V1', 'V2', 'V3']
    ];
    const totalH = topPad + rowH * 3 + 10;

    return `
      <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto" style="border-radius:10px; display:block; max-width:100%;">
        <defs>
          <pattern id="${gId}_sm" width="${smallBox}" height="${smallBox}" patternUnits="userSpaceOnUse">
            <path d="M ${smallBox} 0 L 0 0 0 ${smallBox}" fill="none" stroke="${gridSmall}" stroke-width="0.4"/>
          </pattern>
          <pattern id="${gId}_lg" width="${largeBox}" height="${largeBox}" patternUnits="userSpaceOnUse">
            <rect width="${largeBox}" height="${largeBox}" fill="url(#${gId}_sm)"/>
            <path d="M ${largeBox} 0 L 0 0 0 ${largeBox}" fill="none" stroke="${gridLarge}" stroke-width="1.0"/>
          </pattern>
        </defs>

        <rect width="${totalW}" height="${totalH}" fill="${bgFill}" rx="10"/>
        <rect x="0" y="${topPad}" width="${totalW}" height="${totalH - topPad}" fill="url(#${gId}_lg)"/>

        <!-- Header -->
        <rect x="0" y="0" width="${totalW}" height="${topPad}" fill="${headerBg}" rx="10"/>
        <text x="12" y="20" fill="${textColor}" font-size="10.5" font-weight="800">
          ECG EXTENDED LEADS (THÀNH SAU V7-V9 &amp; THẤT PHẢI V3R-V5R) — Filter: ${filterLabels[filter]}
        </text>

        ${extRows.map((row, ri) => row.map((lead, ci) => `
          <g transform="translate(${ci * colW}, ${topPad + ri * rowH})">
            ${renderLeadStrip(lead, inputs, settings, colW, rowH, traceColor, true, ci === 0, filter)}
          </g>
        `).join('')).join('')}
      </svg>
    `;
  }

  // Montage 4: Lewis Lead (Bipolar P-Wave Magnifier)
  if (montage === 'lewis_lead') {
    const rowH = 160;
    const totalH = topPad + rowH * 2 + 10;

    return `
      <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto" style="border-radius:10px; display:block; max-width:100%;">
        <defs>
          <pattern id="${gId}_sm" width="${smallBox}" height="${smallBox}" patternUnits="userSpaceOnUse">
            <path d="M ${smallBox} 0 L 0 0 0 ${smallBox}" fill="none" stroke="${gridSmall}" stroke-width="0.4"/>
          </pattern>
          <pattern id="${gId}_lg" width="${largeBox}" height="${largeBox}" patternUnits="userSpaceOnUse">
            <rect width="${largeBox}" height="${largeBox}" fill="url(#${gId}_sm)"/>
            <path d="M ${largeBox} 0 L 0 0 0 ${largeBox}" fill="none" stroke="${gridLarge}" stroke-width="1.0"/>
          </pattern>
        </defs>

        <rect width="${totalW}" height="${totalH}" fill="${bgFill}" rx="10"/>
        <rect x="0" y="${topPad}" width="${totalW}" height="${totalH - topPad}" fill="url(#${gId}_lg)"/>

        <!-- Header -->
        <rect x="0" y="0" width="${totalW}" height="${topPad}" fill="${headerBg}" rx="10"/>
        <text x="12" y="20" fill="${textColor}" font-size="10.5" font-weight="800">
          LEWIS BIPOLAR LEAD (PHÓNG ĐẠI SÓNG P ĐỂ CHẨN ĐOÁN CUỒNG NHĨ / RUNG NHĨ)
        </text>

        <!-- Lewis Lead Strip (3x P Wave) -->
        <g transform="translate(0, ${topPad})">
          ${renderLeadStrip('Lewis', inputs, settings, totalW, rowH, '#7c3aed', true, true, filter)}
          <rect x="${totalW - 200}" y="10" width="190" height="24" rx="4" fill="rgba(124, 58, 237, 0.15)"/>
          <text x="${totalW - 105}" y="26" fill="#7c3aed" font-size="10" font-weight="800" text-anchor="middle">Sóng P phóng đại x3</text>
        </g>

        <!-- Rhythm Lead II for comparison -->
        <g transform="translate(0, ${topPad + rowH})">
          ${renderLeadStrip('II', inputs, settings, totalW, rowH, traceColor, true, true, filter)}
        </g>
      </svg>
    `;
  }

  // Default Montage: Cabrera 4x3 + Rhythm Strip
  const colW = totalW / 4;
  const rowH = 110;
  const rhythmH = 100;
  const totalH = topPad + rowH * 3 + rhythmH + 8;
  const leadRows: string[][] = [
    ['I', 'aVR', 'V1', 'V4'],
    ['II', 'aVL', 'V2', 'V5'],
    ['III', 'aVF', 'V3', 'V6'],
  ];
  const rhythmLead = settings.rhythmLead || 'II';

  return `
    <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto"
      style="border-radius:10px; box-shadow:0 4px 20px rgba(0,0,0,0.15); display:block; max-width:100%;"
      class="dsp-ecg-12lead-svg">
      <defs>
        <pattern id="${gId}_sm" width="${smallBox}" height="${smallBox}" patternUnits="userSpaceOnUse">
          <path d="M ${smallBox} 0 L 0 0 0 ${smallBox}" fill="none" stroke="${gridSmall}" stroke-width="0.4"/>
        </pattern>
        <pattern id="${gId}_lg" width="${largeBox}" height="${largeBox}" patternUnits="userSpaceOnUse">
          <rect width="${largeBox}" height="${largeBox}" fill="url(#${gId}_sm)"/>
          <path d="M ${largeBox} 0 L 0 0 0 ${largeBox}" fill="none" stroke="${gridLarge}" stroke-width="1.0"/>
        </pattern>
        ${leadRows.flatMap((row, ri) => row.map((_, ci) =>
          `<clipPath id="${gId}_c${ri}${ci}"><rect x="${ci*colW}" y="${topPad + ri*rowH}" width="${colW}" height="${rowH}"/></clipPath>`
        )).join('')}
        <clipPath id="${gId}_rhythm"><rect x="0" y="${topPad + 3*rowH}" width="${totalW}" height="${rhythmH}"/></clipPath>
      </defs>

      <rect width="${totalW}" height="${totalH}" fill="${bgFill}" rx="10"/>
      <rect x="0" y="${topPad}" width="${totalW}" height="${rowH * 3 + rhythmH}" fill="url(#${gId}_lg)"/>

      <rect x="0" y="0" width="${totalW}" height="${topPad}" fill="${headerBg}" rx="10"/>
      <text x="12" y="20" fill="${textColor}" font-size="10.5" font-weight="800" font-family="'Inter', monospace">
        ECG CABRERA — ${settings.speedMmPerSec} mm/s | ${settings.gainMmPerMv} mm/mV | Filter: ${filterLabels[filter]}
      </text>
      <text x="${totalW - 12}" y="20" fill="${textColor}" font-size="9.5" font-weight="600" font-family="'Inter', monospace" text-anchor="end">
        ${inputs.rhythmType?.toUpperCase()} | QRS ${inputs.qrsDuration || 85}ms | QT ${inputs.qtInterval || 400}ms
      </text>

      ${[1,2,3].map(i => `<line x1="${i*colW}" y1="${topPad}" x2="${i*colW}" y2="${topPad + 3*rowH}" stroke="${dividerColor}" stroke-width="1" stroke-dasharray="3,3"/>`).join('')}
      ${[1,2].map(i => `<line x1="0" y1="${topPad + i*rowH}" x2="${totalW}" y2="${topPad + i*rowH}" stroke="${dividerColor}" stroke-width="0.8" stroke-dasharray="3,3"/>`).join('')}
      <line x1="0" y1="${topPad + 3*rowH}" x2="${totalW}" y2="${topPad + 3*rowH}" stroke="${gridLarge}" stroke-width="1.2"/>

      ${leadRows.map((row, ri) => row.map((lead, ci) => `
        <g clip-path="url(#${gId}_c${ri}${ci})" transform="translate(${ci * colW}, ${topPad + ri * rowH})">
          ${renderLeadStrip(lead, inputs, settings, colW, rowH, traceColor, true, ci === 0, filter)}
        </g>
      `).join('')).join('')}

      <g clip-path="url(#${gId}_rhythm)" transform="translate(0, ${topPad + 3 * rowH})">
        <rect x="0" y="0" width="${totalW}" height="${rhythmH}" fill="${theme === 'paper' ? 'rgba(255,245,245,0.3)' : 'rgba(0,0,0,0.2)'}"/>
        ${renderLeadStrip(rhythmLead, inputs, { ...settings, speedMmPerSec: settings.speedMmPerSec as 12.5 | 25 | 50 }, totalW, rhythmH, traceColor, true, true, filter)}
        <text x="${totalW - 10}" y="${rhythmH - 8}" fill="${textColor}" font-size="9.5" font-weight="700" text-anchor="end" font-family="'Inter', monospace">Rhythm Strip</text>
      </g>
      <text x="${totalW - 10}" y="${totalH - 3}" fill="${textColor}" font-size="8.5" font-weight="600" text-anchor="end" opacity="0.7" font-family="monospace">
        CliniPortal ECG Studio Pro | ${settings.speedMmPerSec}mm/s | ${settings.gainMmPerMv}mm/mV
      </text>
    </svg>
  `;
}

/**
 * === MAIN FUNCTION 2: renderEcgSideBySideSvg ===
 */
export function renderEcgSideBySideSvg(
  patientInputs: EcgInputs,
  baselineInputs: EcgInputs = NORMAL_SINUS_BASELINE,
  settings: EcgPaperSettings = DEFAULT_PAPER_SETTINGS,
  theme: 'paper' | 'neon' | 'dark' = 'paper',
  patientTitle = 'BẢN GHI CA BỆNH / PRESET HIỆN TẠI',
  baselineTitle = 'BẢN GHI ĐỐI CHỨNG BÌNH THƯỜNG'
): string {
  const totalW = 900;
  const panelW = 440;
  const gap = 20;
  const totalH = 430;
  const topPad = 32;
  const colW = panelW / 2;
  const rowH = 90;

  let bgFill = '#fff5f5';
  let gridSmall = 'rgba(252, 165, 165, 0.7)';
  let gridLarge = 'rgba(239, 68, 68, 0.65)';
  let patientTrace = '#dc2626';
  let baselineTrace = '#0284c7';

  if (theme === 'neon') {
    bgFill = '#030712';
    gridSmall = 'rgba(16, 185, 129, 0.12)';
    gridLarge = 'rgba(16, 185, 129, 0.35)';
    patientTrace = '#f43f5e';
    baselineTrace = '#10b981';
  } else if (theme === 'dark') {
    bgFill = '#0f172a';
    gridSmall = 'rgba(255,255,255,0.04)';
    gridLarge = 'rgba(255,255,255,0.10)';
    patientTrace = '#fb7185';
    baselineTrace = '#38bdf8';
  }

  const leadsLeft = [['I', 'V1'], ['II', 'V2'], ['V5', 'aVF']];
  const gId = `sideG_${Date.now()}`;
  const smallBox = 2.5;
  const largeBox = 12.5;

  return `
    <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto" style="border-radius:10px; display:block; max-width:100%; background:var(--color-bg);">
      <defs>
        <pattern id="${gId}_sm" width="${smallBox}" height="${smallBox}" patternUnits="userSpaceOnUse">
          <path d="M ${smallBox} 0 L 0 0 0 ${smallBox}" fill="none" stroke="${gridSmall}" stroke-width="0.4"/>
        </pattern>
        <pattern id="${gId}_lg" width="${largeBox}" height="${largeBox}" patternUnits="userSpaceOnUse">
          <rect width="${largeBox}" height="${largeBox}" fill="url(#${gId}_sm)"/>
          <path d="M ${largeBox} 0 L 0 0 0 ${largeBox}" fill="none" stroke="${gridLarge}" stroke-width="0.9"/>
        </pattern>
      </defs>

      <!-- Panel 1: Left (Patient / Preset) -->
      <g transform="translate(0, 0)">
        <rect width="${panelW}" height="${totalH}" fill="${bgFill}" rx="8"/>
        <rect x="0" y="${topPad}" width="${panelW}" height="${totalH - topPad}" fill="url(#${gId}_lg)"/>
        <rect x="0" y="0" width="${panelW}" height="${topPad}" fill="rgba(220, 38, 38, 0.12)" rx="8"/>
        <circle cx="14" cy="16" r="4" fill="#dc2626"/>
        <text x="24" y="20" fill="#dc2626" font-size="11" font-weight="800" font-family="'Inter', sans-serif">
          ${patientTitle} (${patientInputs.heartRate || 75} bpm)
        </text>

        ${leadsLeft.map((row, ri) => row.map((lead, ci) => `
          <g transform="translate(${ci * colW}, ${topPad + ri * rowH})">
            ${renderLeadStrip(lead, patientInputs, settings, colW, rowH, patientTrace, true, ci === 0)}
          </g>
        `).join('')).join('')}
      </g>

      <!-- Panel 2: Right (Normal Baseline Reference) -->
      <g transform="translate(${panelW + gap}, 0)">
        <rect width="${panelW}" height="${totalH}" fill="${bgFill}" rx="8"/>
        <rect x="0" y="${topPad}" width="${panelW}" height="${totalH - topPad}" fill="url(#${gId}_lg)"/>
        <rect x="0" y="0" width="${panelW}" height="${topPad}" fill="rgba(2, 132, 199, 0.12)" rx="8"/>
        <circle cx="14" cy="16" r="4" fill="#0284c7"/>
        <text x="24" y="20" fill="#0284c7" font-size="11" font-weight="800" font-family="'Inter', sans-serif">
          ${baselineTitle} (75 bpm)
        </text>

        ${leadsLeft.map((row, ri) => row.map((lead, ci) => `
          <g transform="translate(${ci * colW}, ${topPad + ri * rowH})">
            ${renderLeadStrip(lead, baselineInputs, settings, colW, rowH, baselineTrace, true, ci === 0)}
          </g>
        `).join('')).join('')}
      </g>

      <!-- Center Divider Badge -->
      <g transform="translate(${panelW + gap / 2 - 12}, ${totalH / 2 - 12})">
        <circle cx="12" cy="12" r="14" fill="var(--color-surface)" stroke="var(--color-border)" stroke-width="1.5"/>
        <text x="12" y="16" fill="var(--color-text-muted)" font-size="9" font-weight="800" text-anchor="middle">VS</text>
      </g>
    </svg>
  `;
}

/**
 * === MAIN FUNCTION 3: renderEcgGhostOverlaySvg ===
 */
export function renderEcgGhostOverlaySvg(
  patientInputs: EcgInputs,
  baselineInputs: EcgInputs = NORMAL_SINUS_BASELINE,
  targetLead: string = 'V2',
  settings: EcgPaperSettings = DEFAULT_PAPER_SETTINGS,
  theme: 'paper' | 'neon' | 'dark' = 'paper'
): string {
  const totalW = 860;
  const totalH = 340;
  const baseY = totalH / 2 + 10;
  const mmPx = 3.2;

  let bgFill = '#fff5f5';
  let gridSmall = 'rgba(252, 165, 165, 0.7)';
  let gridLarge = 'rgba(239, 68, 68, 0.65)';
  let patientTrace = '#dc2626';
  let baselineTrace = '#0284c7';
  let textColor = '#1e3a5f';

  if (theme === 'neon') {
    bgFill = '#030712';
    gridSmall = 'rgba(16, 185, 129, 0.12)';
    gridLarge = 'rgba(16, 185, 129, 0.35)';
    patientTrace = '#f43f5e';
    baselineTrace = '#10b981';
    textColor = '#34d399';
  } else if (theme === 'dark') {
    bgFill = '#0f172a';
    gridSmall = 'rgba(255,255,255,0.04)';
    gridLarge = 'rgba(255,255,255,0.10)';
    patientTrace = '#fb7185';
    baselineTrace = '#38bdf8';
    textColor = '#94a3b8';
  }

  const hr = patientInputs.heartRate || 75;
  const rrMs = (60 / hr) * 1000;
  const normalRrMs = 800;

  const pathPatient = `M 40,${baseY} ` + generateBeatPath(40, baseY, rrMs, patientInputs, targetLead, mmPx, settings.gainMmPerMv) + generateBeatPath(40 + (rrMs * 0.025 * mmPx), baseY, rrMs, patientInputs, targetLead, mmPx, settings.gainMmPerMv);
  const pathBaseline = `M 40,${baseY} ` + generateBeatPath(40, baseY, normalRrMs, baselineInputs, targetLead, mmPx, settings.gainMmPerMv) + generateBeatPath(40 + (normalRrMs * 0.025 * mmPx), baseY, normalRrMs, baselineInputs, targetLead, mmPx, settings.gainMmPerMv);

  const pAmpPat = getLeadAmplitudes(targetLead, patientInputs);
  const pAmpBase = getLeadAmplitudes(targetLead, baselineInputs);
  const deltaSt = pAmpPat.stDev - pAmpBase.stDev;

  const gId = `ghostG_${Date.now()}`;

  return `
    <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto" style="border-radius:10px; display:block; max-width:100%;">
      <defs>
        <pattern id="${gId}_sm" width="${mmPx}" height="${mmPx}" patternUnits="userSpaceOnUse">
          <path d="M ${mmPx} 0 L 0 0 0 ${mmPx}" fill="none" stroke="${gridSmall}" stroke-width="0.5"/>
        </pattern>
        <pattern id="${gId}_lg" width="${mmPx * 5}" height="${mmPx * 5}" patternUnits="userSpaceOnUse">
          <rect width="${mmPx * 5}" height="${mmPx * 5}" fill="url(#${gId}_sm)"/>
          <path d="M ${mmPx * 5} 0 L 0 0 0 ${mmPx * 5}" fill="none" stroke="${gridLarge}" stroke-width="1.2"/>
        </pattern>
      </defs>

      <rect width="${totalW}" height="${totalH}" fill="${bgFill}" rx="10"/>
      <rect x="0" y="36" width="${totalW}" height="${totalH - 36}" fill="url(#${gId}_lg)"/>

      <rect x="0" y="0" width="${totalW}" height="36" fill="rgba(0,0,0,0.06)" rx="10"/>
      <text x="14" y="22" fill="${textColor}" font-size="12" font-weight="800" font-family="'Inter', sans-serif">
        🔍 XẾP CHỒNG HÌNH THÁI SÓNG ĐIỆN TIM CHUYỂN ĐẠO ${targetLead} (GHOST OVERLAY VIEW)
      </text>

      <g transform="translate(${totalW - 350}, 10)">
        <circle cx="10" cy="10" r="5" fill="${patientTrace}"/>
        <text x="20" y="14" fill="${textColor}" font-size="10.5" font-weight="800">Ca Bệnh / Hiện Tại</text>
        <circle cx="160" cy="10" r="5" fill="${baselineTrace}"/>
        <text x="170" y="14" fill="${textColor}" font-size="10.5" font-weight="800">Bình Thường Đối Chứng</text>
      </g>

      <path d="${pathBaseline}" fill="none" stroke="${baselineTrace}" stroke-width="2.5" stroke-dasharray="4,3" stroke-linecap="round" opacity="0.85"/>
      <path d="${pathPatient}" fill="none" stroke="${patientTrace}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

      <g transform="translate(40, ${totalH - 35})">
        <rect width="780" height="26" rx="6" fill="var(--color-surface, #ffffff)" stroke="var(--color-border)" stroke-width="1"/>
        <text x="14" y="17" fill="var(--color-text)" font-size="10" font-weight="700">
          Chuyển đạo: <strong style="color:var(--color-primary);">${targetLead}</strong> |
          &Delta;ST: <strong style="color:#dc2626;">${deltaSt > 0 ? `+${deltaSt.toFixed(1)}` : deltaSt.toFixed(1)} mm</strong> |
          ST Ca Bệnh: <strong>${pAmpPat.stDev > 0 ? `+${pAmpPat.stDev}` : pAmpPat.stDev} mm</strong> |
          QRS: <strong>${patientInputs.qrsDuration || 85} ms</strong> (Chuẩn: 85 ms) |
          QTc: <strong>${patientInputs.qtInterval ? `${patientInputs.qtInterval} ms` : 'N/A'}</strong>
        </text>
      </g>
    </svg>
  `;
}

/**
 * === MAIN FUNCTION 4: renderEcgFocalLeadsWithCalloutsSvg ===
 */
export function renderEcgFocalLeadsWithCalloutsSvg(
  patientInputs: EcgInputs,
  keyLeads: string[] = ['V2', 'V3', 'aVL', 'III'],
  annotations: EcgCalloutAnnotation[] = [],
  settings: EcgPaperSettings = DEFAULT_PAPER_SETTINGS,
  theme: 'paper' | 'neon' | 'dark' = 'paper'
): string {
  const totalW = 860;
  const cardW = 415;
  const cardH = 175;
  const gap = 15;
  const totalH = cardH * 2 + gap + 30;

  let bgFill = '#fff5f5';
  let gridSmall = 'rgba(252, 165, 165, 0.7)';
  let gridLarge = 'rgba(239, 68, 68, 0.65)';
  let traceColor = '#111827';
  let textColor = '#1e3a5f';

  if (theme === 'neon') {
    bgFill = '#030712';
    gridSmall = 'rgba(16, 185, 129, 0.12)';
    gridLarge = 'rgba(16, 185, 129, 0.35)';
    traceColor = '#10b981';
    textColor = '#34d399';
  } else if (theme === 'dark') {
    bgFill = '#0f172a';
    gridSmall = 'rgba(255,255,255,0.04)';
    gridLarge = 'rgba(255,255,255,0.10)';
    traceColor = '#38bdf8';
    textColor = '#94a3b8';
  }

  const gId = `focalG_${Date.now()}`;
  const leadsToRender = keyLeads.slice(0, 4);

  return `
    <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="auto" style="border-radius:10px; display:block; max-width:100%;">
      <defs>
        <pattern id="${gId}_sm" width="2.5" height="2.5" patternUnits="userSpaceOnUse">
          <path d="M 2.5 0 L 0 0 0 2.5" fill="none" stroke="${gridSmall}" stroke-width="0.4"/>
        </pattern>
        <pattern id="${gId}_lg" width="12.5" height="12.5" patternUnits="userSpaceOnUse">
          <rect width="12.5" height="12.5" fill="url(#${gId}_sm)"/>
          <path d="M 12.5 0 L 0 0 0 12.5" fill="none" stroke="${gridLarge}" stroke-width="0.9"/>
        </pattern>
      </defs>

      <rect width="${totalW}" height="${totalH}" fill="var(--color-bg)" rx="10"/>

      ${leadsToRender.map((lead, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const ox = 10 + col * (cardW + gap);
        const oy = 10 + row * (cardH + gap);

        const leadAnn = annotations.find(a => a.lead === lead);

        return `
          <g transform="translate(${ox}, ${oy})">
            <rect width="${cardW}" height="${cardH}" fill="${bgFill}" rx="8" stroke="var(--color-border)" stroke-width="1.2"/>
            <rect x="0" y="26" width="${cardW}" height="${cardH - 26}" fill="url(#${gId}_lg)" rx="0"/>

            <rect x="0" y="0" width="${cardW}" height="26" fill="rgba(0,0,0,0.06)" rx="8"/>
            <text x="10" y="17.5" fill="${textColor}" font-size="11" font-weight="800" font-family="'Inter', sans-serif">
              CHUYỂN ĐẠO TRỌNG ĐIỂM: ${lead}
            </text>

            <g transform="translate(0, 26)">
              ${renderLeadStrip(lead, patientInputs, settings, cardW, cardH - 26, traceColor, false, true)}
            </g>

            ${leadAnn ? `
              <g transform="translate(${cardW - 200}, 34)">
                <rect width="190" height="48" rx="6" fill="rgba(220, 38, 38, 0.92)" stroke="#ffffff" stroke-width="1"/>
                <text x="10" y="16" fill="#ffffff" font-size="10" font-weight="800">${leadAnn.label}</text>
                <text x="10" y="32" fill="rgba(255,255,255,0.9)" font-size="8.5" font-weight="600">${leadAnn.detail.slice(0, 38)}...</text>
              </g>
            ` : ''}
          </g>
        `;
      }).join('')}
    </svg>
  `;
}

/**
 * Lấy dữ liệu đối chiếu hình thái chi tiết theo ID ca mẫu
 */
export function render12LeadGridSvg(inputs: EcgInputs, activeLead = 'II', theme: 'paper' | 'neon' | 'dark' = 'paper'): string {
  const settings: EcgPaperSettings = {
    speedMmPerSec: 25,
    gainMmPerMv: 10,
    rhythmLead: activeLead,
  };
  return render12LeadEcgPaper(inputs, settings, theme);
}
