/**
 * Dynamic Risk Score Calculator - DocSpace
 * Tự động bóc tách sinh hiệu từ văn bản tự do (SOAP/Khám thực thể)
 * và tính các chỉ số nguy cơ cấp cứu: qSOFA, CURB-65, SIRS...
 */

export interface ExtractedVitals {
  hr?: number;        // Mạch (lần/phút)
  sbp?: number;       // Huyết áp tâm thu (mmHg)
  dbp?: number;       // Huyết áp tâm trương (mmHg)
  rr?: number;        // Nhịp thở (lần/phút)
  temp?: number;      // Nhiệt độ (°C)
  spo2?: number;      // SpO2 (%)
  gcs?: number;       // Thang điểm Glasgow (3-15)
  alteredMentation?: boolean; // Tri giác thay đổi (lơ mơ, hôn mê, lú lẫn...)
  urea?: number;      // Ure máu (mmol/L)
  wbc?: number;       // Bạch cầu (K/uL hoặc G/L)
}

export interface RiskScoreResult {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  summary: string;
  details: string[];
  protocolQuery: string; // Từ khóa để tra cứu Living Protocols / EBM
}

/**
 * Trích xuất các thông số sinh hiệu từ đoạn văn bản thô
 */
export function parseVitals(text: string): ExtractedVitals {
  if (!text) return {};
  const vitals: ExtractedVitals = {};
  const normalized = text.toLowerCase();

  // 1. Huyết áp (HA / BP): VD "HA: 120/80", "ha 90/60", "bp 130/80"
  const bpMatch = normalized.match(/(?:ha|huyết áp|bp)\s*[:=]?\s*(\d{2,3})\s*[\/\\]\s*(\d{2,3})/i);
  if (bpMatch) {
    vitals.sbp = parseInt(bpMatch[1], 10);
    vitals.dbp = parseInt(bpMatch[2], 10);
  }

  // 2. Mạch (M / HR / Pulse): VD "M: 90", "Mạch 100", "hr 85"
  const hrMatch = normalized.match(/(?:mạch|m|hr|pulse)\s*[:=]?\s*(\d{2,3})\s*(?:l\/p|lần\/phút|bpm)?/i);
  if (hrMatch) {
    const val = parseInt(hrMatch[1], 10);
    if (val >= 30 && val <= 250) vitals.hr = val;
  }

  // 3. Nhịp thở (NT / RR): VD "NT: 24", "nhịp thở 22", "rr 20"
  const rrMatch = normalized.match(/(?:nhịp thở|nt|rr)\s*[:=]?\s*(\d{1,2})\s*(?:l\/p|lần\/phút)?/i);
  if (rrMatch) {
    const val = parseInt(rrMatch[1], 10);
    if (val >= 5 && val <= 60) vitals.rr = val;
  }

  // 4. Nhiệt độ (NĐ / Temp / T): VD "T: 38.5", "nhiệt độ 39", "temp 37.5"
  const tempMatch = normalized.match(/(?:nhiệt độ|nđ|temp|t)\s*[:=]?\s*(\d{2}(?:\.\d)?)\s*°?c?/i);
  if (tempMatch) {
    const val = parseFloat(tempMatch[1]);
    if (val >= 30 && val <= 45) vitals.temp = val;
  }

  // 5. SpO2: VD "spo2 94%", "spo2: 98"
  const spo2Match = normalized.match(/spo2?\s*[:=]?\s*(\d{2,3})\s*%?/i);
  if (spo2Match) {
    const val = parseInt(spo2Match[1], 10);
    if (val >= 50 && val <= 100) vitals.spo2 = val;
  }

  // 6. GCS (Glasgow): VD "gcs: 14", "glasgow 13"
  const gcsMatch = normalized.match(/(?:gcs|glasgow)\s*[:=]?\s*(\d{1,2})/i);
  if (gcsMatch) {
    const val = parseInt(gcsMatch[1], 10);
    if (val >= 3 && val <= 15) {
      vitals.gcs = val;
      if (val < 15) vitals.alteredMentation = true;
    }
  }

  // 7. Nhận diện tri giác thay đổi từ từ khóa
  if (vitals.alteredMentation === undefined) {
    const alteredKeywords = ['lơ mơ', 'hôn mê', 'lú lẫn', 'kích thích', 'tỉnh chậm', 'tiếp xúc chậm', 'lơ mơ nhẹ', 'lẫn lộn', 'đáo để'];
    if (alteredKeywords.some(kw => normalized.includes(kw))) {
      vitals.alteredMentation = true;
    }
  }

  // 8. Bạch cầu (WBC): VD "wbc 14.5", "bạch cầu 15"
  const wbcMatch = normalized.match(/(?:wbc|bạch cầu)\s*[:=]?\s*(\d{1,2}(?:\.\d)?)/i);
  if (wbcMatch) {
    vitals.wbc = parseFloat(wbcMatch[1]);
  }

  // 9. Ure máu: VD "ure 8.5", "urea 9"
  const ureaMatch = normalized.match(/(?:urea|ure)\s*[:=]?\s*(\d{1,2}(?:\.\d)?)/i);
  if (ureaMatch) {
    vitals.urea = parseFloat(ureaMatch[1]);
  }

  return vitals;
}

/**
 * Đánh giá các thang điểm nguy cơ từ sinh hiệu đã bóc tách
 */
export function evaluateRiskScores(vitals: ExtractedVitals, age: number = 50): RiskScoreResult[] {
  const results: RiskScoreResult[] = [];

  // 1. Thang điểm qSOFA (Quick SOFA - Nhiễm khuẩn huyết)
  if (vitals.rr !== undefined || vitals.sbp !== undefined || vitals.alteredMentation !== undefined) {
    let qSofaScore = 0;
    const qSofaDetails: string[] = [];

    if (vitals.rr !== undefined && vitals.rr >= 22) {
      qSofaScore++;
      qSofaDetails.push(`Nhịp thở ≥ 22 lần/phút (${vitals.rr})`);
    }
    if (vitals.sbp !== undefined && vitals.sbp <= 100) {
      qSofaScore++;
      qSofaDetails.push(`Huyết áp tâm thu ≤ 100 mmHg (${vitals.sbp})`);
    }
    if (vitals.alteredMentation) {
      qSofaScore++;
      qSofaDetails.push(`Tri giác thay đổi / GCS < 15${vitals.gcs ? ` (${vitals.gcs} đ)` : ''}`);
    }

    const isHighRisk = qSofaScore >= 2;
    results.push({
      id: 'qsofa',
      name: 'qSOFA',
      score: qSofaScore,
      maxScore: 3,
      riskLevel: isHighRisk ? 'high' : qSofaScore === 1 ? 'moderate' : 'low',
      summary: isHighRisk 
        ? `qSOFA = ${qSofaScore}/3 điểm (NGUY CƠ CAO SỐC NHIỄM KHUẨN)`
        : `qSOFA = ${qSofaScore}/3 điểm (Nguy cơ thấp)`,
      details: qSofaDetails,
      protocolQuery: 'Sepsis'
    });
  }

  // 2. Thang điểm CURB-65 (Đánh giá mức độ viêm phổi cộng đồng)
  if (vitals.rr !== undefined || vitals.sbp !== undefined || vitals.dbp !== undefined || vitals.alteredMentation !== undefined) {
    let curbScore = 0;
    const curbDetails: string[] = [];

    if (vitals.alteredMentation) {
      curbScore++;
      curbDetails.push('C: Confusion (Tri giác lú lẫn/thay đổi)');
    }
    if (vitals.urea !== undefined && vitals.urea > 7) {
      curbScore++;
      curbDetails.push(`U: Urea > 7 mmol/L (${vitals.urea})`);
    }
    if (vitals.rr !== undefined && vitals.rr >= 30) {
      curbScore++;
      curbDetails.push(`R: Respiratory rate ≥ 30/phút (${vitals.rr})`);
    }
    if ((vitals.sbp !== undefined && vitals.sbp < 90) || (vitals.dbp !== undefined && vitals.dbp <= 60)) {
      curbScore++;
      curbDetails.push(`B: Blood pressure (HA tâm thu < 90 hoặc tâm trương ≤ 60: ${vitals.sbp}/${vitals.dbp})`);
    }
    if (age >= 65) {
      curbScore++;
      curbDetails.push(`65: Age ≥ 65 tuổi (${age}t)`);
    }

    const riskLevel = curbScore >= 3 ? 'high' : curbScore >= 2 ? 'moderate' : 'low';
    results.push({
      id: 'curb65',
      name: 'CURB-65',
      score: curbScore,
      maxScore: 5,
      riskLevel,
      summary: curbScore >= 3 
        ? `CURB-65 = ${curbScore}/5 điểm (Viêm phổi nặng - Cân nhắc ICU)`
        : curbScore === 2 
        ? `CURB-65 = ${curbScore}/5 điểm (Mức độ trung bình - Khuyên nhập viện)`
        : `CURB-65 = ${curbScore}/5 điểm (Mức độ nhẹ - Điều trị ngoại trú)`,
      details: curbDetails,
      protocolQuery: 'Viêm phổi'
    });
  }

  // 3. Hội chứng đáp ứng viêm toàn thân SIRS
  if (vitals.hr !== undefined || vitals.rr !== undefined || vitals.temp !== undefined) {
    let sirsScore = 0;
    const sirsDetails: string[] = [];

    if (vitals.temp !== undefined && (vitals.temp > 38.0 || vitals.temp < 36.0)) {
      sirsScore++;
      sirsDetails.push(`Nhiệt độ > 38°C hoặc < 36°C (${vitals.temp}°C)`);
    }
    if (vitals.hr !== undefined && vitals.hr > 90) {
      sirsScore++;
      sirsDetails.push(`Mạch > 90 lần/phút (${vitals.hr})`);
    }
    if (vitals.rr !== undefined && vitals.rr > 20) {
      sirsScore++;
      sirsDetails.push(`Nhịp thở > 20 lần/phút (${vitals.rr})`);
    }
    if (vitals.wbc !== undefined && (vitals.wbc > 12 || vitals.wbc < 4)) {
      sirsScore++;
      sirsDetails.push(`Bạch cầu > 12k hoặc < 4k (${vitals.wbc})`);
    }

    if (sirsScore >= 2) {
      results.push({
        id: 'sirs',
        name: 'SIRS',
        score: sirsScore,
        maxScore: 4,
        riskLevel: sirsScore >= 3 ? 'high' : 'moderate',
        summary: `SIRS = ${sirsScore}/4 tiêu chuẩn (Thỏa mãn Đáp ứng viêm toàn thân)`,
        details: sirsDetails,
        protocolQuery: 'Sepsis'
      });
    }
  }

  return results;
}
