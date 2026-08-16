/**
 * DocSpace — ECG Pro Studio (TypeScript)
 * Phân Tích 12 Chuyển Đạo, Tính Trục Điện Tim Vector & Đánh Giá QTc / Sgarbossa
 */

export interface EcgInputs {
  heartRate: number; // l/p
  rhythmType: 'sinus' | 'afib' | 'aflutter' | 'svt' | 'vt' | 'pacing' | 'other';
  lead1Net: number; // mm (R - S ở DI)
  avfNet: number;   // mm (R - S ở aVF)
  prInterval?: number; // ms (chuẩn 120 - 200)
  qrsDuration?: number; // ms (chuẩn < 120)
  qtInterval?: number; // ms
  sv1?: number; // mm
  rv5?: number; // mm
  raVL?: number; // mm
  sv3?: number; // mm
  hasLbbb?: boolean;
  sgarbossaConcordantStElevation?: boolean; // ≥1mm ST chênh lên cùng hướng QRS (5đ)
  sgarbossaConcordantStDepressionV1V3?: boolean; // ≥1mm ST chênh xuống ở V1-V3 (3đ)
  sgarbossaExcessiveDiscordant?: boolean; // ≥5mm ST chênh ngược hướng QRS (2đ)
}

export interface EcgAnalysisResult {
  heartRateCategory: string;
  axisAngleDegree: number;
  axisClassification: string;
  axisColor: string;
  qtcBazett: number | null;
  qtcFridericia: number | null;
  qtcInterpretation: string | null;
  lvhStatus: string | null;
  sgarbossaScore: number | null;
  sgarbossaInterpretation: string | null;
  clinicalSummary: string;
  recommendations: string[];
}

export function analyzeEcg(inputs: EcgInputs): EcgAnalysisResult {
  const {
    heartRate,
    rhythmType,
    lead1Net,
    avfNet,
    prInterval,
    qrsDuration,
    qtInterval,
    sv1 = 0,
    rv5 = 0,
    raVL = 0,
    sv3 = 0,
    hasLbbb,
    sgarbossaConcordantStElevation,
    sgarbossaConcordantStDepressionV1V3,
    sgarbossaExcessiveDiscordant,
  } = inputs;

  const recommendations: string[] = [];

  // 1. Tần số & Nhịp
  let heartRateCategory = '';
  if (heartRate < 60) heartRateCategory = 'Nhịp chậm (< 60 l/p)';
  else if (heartRate > 100) heartRateCategory = 'Nhịp nhanh (> 100 l/p)';
  else heartRateCategory = 'Tần số bình thường (60 - 100 l/p)';

  // 2. Tính Trục Điện Tim (Hexaxial Reference System)
  // Góc alpha = atan2(aVF, DI)
  const rad = Math.atan2(avfNet, lead1Net);
  let deg = Math.round(rad * (180 / Math.PI));

  let axisClassification = '';
  let axisColor = '#10b981';

  if (deg >= -30 && deg <= 90) {
    axisClassification = 'Trục Trung Tính (Normal Axis)';
    axisColor = '#10b981';
  } else if (deg < -30 && deg >= -90) {
    axisClassification = 'Trục Lệch Trái (Left Axis Deviation - LAD)';
    axisColor = '#f59e0b';
    recommendations.push('Trục lệch trái: Tìm nguyên nhân Block phân nhánh trái trước (LAFB), Dày thất trái (LVH), Nhồi máu cơ tim thành dưới.');
  } else if (deg > 90 && deg <= 180) {
    axisClassification = 'Trục Lệch Phải (Right Axis Deviation - RAD)';
    axisColor = '#ef4444';
    recommendations.push('Trục lệch phải: Tìm nguyên nhân Tăng gánh thất phải / Tâm phế mạn (COPD), Thuyên tắc phổi cấp, Block phân nhánh trái sau (LPFB).');
  } else {
    axisClassification = 'Trục Vô Định / Cực Phải (Extreme / Northwest Axis)';
    axisColor = '#8b5cf6';
    recommendations.push('Trục vô định: Gặp trong Nhịp nhanh thất (VT), Khí phế thũng nặng hoặc Đặt sai điện cực.');
  }

  // 3. Khoảng QTc
  let qtcBazett: number | null = null;
  let qtcFridericia: number | null = null;
  let qtcInterpretation: string | null = null;

  if (qtInterval && heartRate > 0) {
    const rrSec = 60 / heartRate;
    qtcBazett = Math.round(qtInterval / Math.sqrt(rrSec));
    qtcFridericia = Math.round(qtInterval / Math.cbrt(rrSec));

    if (qtcBazett > 500) {
      qtcInterpretation = `⚠️ QTc KÉO DÀI NẶNG (${qtcBazett} ms) ➔ Nguy cơ cao Xoắn đỉnh (Torsades de Pointes)! Ngừng ngay các thuốc kéo dài QT.`;
      recommendations.push('Kiểm tra ngay điện giải đồ (K+, Mg2+, Ca2+) và tránh phối hợp thuốc chống loạn nhịp nhóm III / Macrolide / Quinolone.');
    } else if (qtcBazett > 460) {
      qtcInterpretation = `QTc Kéo dài nhẹ/trung bình (${qtcBazett} ms)`;
    } else if (qtcBazett < 350) {
      qtcInterpretation = `Hội chứng QT Ngắn (${qtcBazett} ms)`;
    } else {
      qtcInterpretation = `Khoảng QTc bình thường (${qtcBazett} ms)`;
    }
  }

  // 4. Dày Thất Trái (LVH Criteria)
  let lvhStatus: string | null = null;
  const sokolowLyon = sv1 + rv5;
  const cornell = raVL + sv3;

  if (sokolowLyon >= 35) {
    lvhStatus = `Dày thất trái (Tiêu chuẩn Sokolow-Lyon: SV1 + RV5 = ${sokolowLyon} mm ≥ 35mm)`;
  } else if (cornell >= 28) {
    lvhStatus = `Dày thất trái (Tiêu chuẩn Cornell: RaVL + SV3 = ${cornell} mm ≥ 28mm ở nam / ≥ 20mm ở nữ)`;
  } else if (raVL > 11) {
    lvhStatus = `Dày thất trái (RaVL = ${raVL} mm > 11mm)`;
  } else {
    lvhStatus = 'Chưa đủ tiêu chuẩn điện thế dày thất trái';
  }

  // 5. Tiêu Chuẩn Sgarbossa (trong LBBB hoặc Nhịp máy tạo nhịp)
  let sgarbossaScore: number | null = null;
  let sgarbossaInterpretation: string | null = null;

  if (hasLbbb || rhythmType === 'pacing') {
    let score = 0;
    if (sgarbossaConcordantStElevation) score += 5;
    if (sgarbossaConcordantStDepressionV1V3) score += 3;
    if (sgarbossaExcessiveDiscordant) score += 2;

    sgarbossaScore = score;
    if (score >= 3) {
      sgarbossaInterpretation = `🚨 SGARBOSSA DƯƠNG TÍNH (${score} điểm) ➔ Độ đặc hiệu > 90% cho Nhồi Máu Cơ Tim Cấp kèm LBBB! Kích hoạt Cathlab khẩn cấp.`;
      recommendations.push('Xử trí như Nhồi máu cơ tim ST chênh lên (STEMI tương đương): Hội chẩn can thiệp mạch vành thì đầu.');
    } else {
      sgarbossaInterpretation = `Sgarbossa âm tính (${score} điểm) — Chưa thấy dấu hiệu nhồi máu cơ tim rõ trên nền LBBB.`;
    }
  }

  // 6. Clinical Summary
  let summary = `[ECG Pro Report]\n• Nhịp: ${rhythmType.toUpperCase()} | Tần số: ${heartRate} l/p (${heartRateCategory})`;
  summary += `\n• Trục điện tim: Góc ${deg}° (${axisClassification})`;
  if (prInterval) summary += `\n• Khoảng PR: ${prInterval} ms ${prInterval > 200 ? '(Block AV độ I)' : prInterval < 120 ? '(WPW/Hội chứng tiền kích thích)' : ''}`;
  if (qrsDuration) summary += `\n• Độ rộng QRS: ${qrsDuration} ms ${qrsDuration >= 120 ? '(QRS giãn rộng / Block nhánh)' : ''}`;
  if (qtcBazett) summary += `\n• QTc: ${qtcBazett} ms (Bazett) | ${qtcFridericia} ms (Fridericia) ➔ ${qtcInterpretation}`;
  if (lvhStatus) summary += `\n• Phì đại buồng tim: ${lvhStatus}`;
  if (sgarbossaInterpretation) summary += `\n• Sgarbossa: ${sgarbossaInterpretation}`;

  return {
    heartRateCategory,
    axisAngleDegree: deg,
    axisClassification,
    axisColor,
    qtcBazett,
    qtcFridericia,
    qtcInterpretation,
    lvhStatus,
    sgarbossaScore,
    sgarbossaInterpretation,
    clinicalSummary: summary,
    recommendations,
  };
}

/**
 * Render Vòng Tròn Trục Điện Tim Vector 360 độ SVG (Hexaxial Vector Compass)
 */
export function renderEcgAxisSvg(deg: number): string {
  const size = 300;
  const center = size / 2;
  const r = 105;

  // Tính tọa độ vector mũi tên
  const rad = (deg * Math.PI) / 180;
  const arrowX = center + r * Math.cos(rad);
  const arrowY = center + r * Math.sin(rad);

  const getPt = (angleDeg: number, radius: number) => {
    const a = (angleDeg * Math.PI) / 180;
    return { x: center + radius * Math.cos(a), y: center + radius * Math.sin(a) };
  };

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${size} ${size}" width="100%" height="${size}">
      <defs>
        <marker id="axisArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
        </marker>
      </defs>

      <!-- Vùng màu Trục (Sectors) -->
      <!-- Normal Axis (-30 đến 90) -->
      <path d="M ${center} ${center} L ${getPt(-30, r).x} ${getPt(-30, r).y} A ${r} ${r} 0 0 1 ${getPt(90, r).x} ${getPt(90, r).y} Z" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="0.5" />

      <!-- Left Axis (-30 đến -90) -->
      <path d="M ${center} ${center} L ${getPt(-90, r).x} ${getPt(-90, r).y} A ${r} ${r} 0 0 1 ${getPt(-30, r).x} ${getPt(-30, r).y} Z" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="0.5" />

      <!-- Right Axis (90 đến 180) -->
      <path d="M ${center} ${center} L ${getPt(90, r).x} ${getPt(90, r).y} A ${r} ${r} 0 0 1 ${getPt(180, r).x} ${getPt(180, r).y} Z" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" stroke-width="0.5" />

      <!-- Northwest Axis (-90 đến -180) -->
      <path d="M ${center} ${center} L ${getPt(180, r).x} ${getPt(180, r).y} A ${r} ${r} 0 0 1 ${getPt(-90, r).x} ${getPt(-90, r).y} Z" fill="rgba(139, 92, 246, 0.12)" stroke="#8b5cf6" stroke-width="0.5" />

      <!-- Vòng tròn ngoài & Trục tọa độ -->
      <circle cx="${center}" cy="${center}" r="${r}" fill="none" stroke="var(--color-border)" stroke-width="1.5" />
      <line x1="${center - r - 15}" y1="${center}" x2="${center + r + 15}" y2="${center}" stroke="var(--color-border)" stroke-width="1" />
      <line x1="${center}" y1="${center - r - 15}" x2="${center}" y2="${center + r + 15}" stroke="var(--color-border)" stroke-width="1" />

      <!-- Lead Labels -->
      <text x="${center + r + 18}" y="${center + 4}" fill="var(--color-text)" font-size="9" font-weight="700">DI (0°)</text>
      <text x="${center - r - 20}" y="${center + 4}" fill="var(--color-text-muted)" font-size="8" text-anchor="end">±180°</text>
      <text x="${center}" y="${center + r + 18}" fill="var(--color-text)" font-size="9" font-weight="700" text-anchor="middle">aVF (+90°)</text>
      <text x="${center}" y="${center - r - 8}" fill="var(--color-text-muted)" font-size="8" text-anchor="middle">-90° (aVR)</text>

      <!-- Oblique Lead Lines (DII 60, DIII 120, aVL -30) -->
      <line x1="${center}" y1="${center}" x2="${getPt(60, r).x}" y2="${getPt(60, r).y}" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="2,2" />
      <text x="${getPt(60, r + 12).x}" y="${getPt(60, r + 12).y}" fill="var(--color-text-muted)" font-size="8">DII (+60°)</text>

      <line x1="${center}" y1="${center}" x2="${getPt(-30, r).x}" y2="${getPt(-30, r).y}" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="2,2" />
      <text x="${getPt(-30, r + 14).x}" y="${getPt(-30, r + 14).y}" fill="var(--color-text-muted)" font-size="8">aVL (-30°)</text>

      <line x1="${center}" y1="${center}" x2="${getPt(120, r).x}" y2="${getPt(120, r).y}" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="2,2" />
      <text x="${getPt(120, r + 14).x}" y="${getPt(120, r + 14).y}" fill="var(--color-text-muted)" font-size="8">DIII (+120°)</text>

      <!-- Vector Mũi Tên Bệnh Nhân -->
      <line x1="${center}" y1="${center}" x2="${arrowX}" y2="${arrowY}" stroke="#ef4444" stroke-width="3" marker-end="url(#axisArrow)" />
      <circle cx="${center}" cy="${center}" r="4" fill="#ef4444" />

      <!-- Góc hiển thị trung tâm -->
      <rect x="${center - 32}" y="${center - 35}" width="64" height="20" rx="4" fill="var(--color-surface)" stroke="#ef4444" stroke-width="1.5" />
      <text x="${center}" y="${center - 21}" fill="#ef4444" font-size="11" font-weight="800" text-anchor="middle">${deg > 0 ? `+${deg}` : deg}°</text>
    </svg>
  `;
}
