/**
 * CliniPortal 2.0 — Journal Trust Scorer Algorithm (TypeScript)
 * Path: src/content/ebm/guidelines/js/journal-trust-scorer.ts
 */

export interface TrustScoreResult {
  score: number;
  grade: string;
  color: string;
  level: string;
  breakdown: Record<string, number>;
}

export interface JournalQualityProfile {
  journalName: string;
  metrics: any;
  trustScore: TrustScoreResult;
  predatoryAudit: any;
  recommendation: string;
}

import '../guidelines-types';

export function calculateJournalTrustScore(metrics: any, predatoryAudit?: any): TrustScoreResult {
  if (!metrics) {
    return { score: 0, grade: 'Chưa xếp hạng', color: '#94a3b8', level: 'UNKNOWN', breakdown: {} };
  }

  if (metrics.quartile === 'MOH' || metrics.sourceType === 'vn-moh' || metrics.sourceType === 'national-guideline') {
    const pDeduction = predatoryAudit ? (predatoryAudit.scoreDeduction || 0) : 0;
    const finalScore = Math.max(0, 92 - pDeduction);
    return {
      score: finalScore,
      grade: '🇻🇳 Khuyến cáo Cấp Quốc gia — Bộ Y tế Việt Nam',
      color: '#dc2626',
      level: 'NATIONAL_MOH',
      breakdown: { mohScore: 92, deduction: pDeduction }
    };
  }

  const ifVal = parseFloat(metrics.if || metrics.impactFactor || 0);
  const sjrVal = parseFloat(metrics.sjr || 0);
  const snipVal = parseFloat(metrics.snip || 0);
  const hVal = parseInt(metrics.hIndex || 0, 10);
  const qVal = metrics.quartile || 'Q4';

  let ifScore = 0;
  if (ifVal > 0) {
    ifScore = Math.min(100, (ifVal / 35.0) * 100);
    if (ifVal >= 100) ifScore = 100;
  }

  let qScore = 25;
  if (qVal === 'Q1') qScore = 100;
  else if (qVal === 'Q2') qScore = 75;
  else if (qVal === 'Q3') qScore = 50;
  else if (qVal === 'Q4') qScore = 25;

  let sjrScore = 0;
  if (sjrVal > 0) {
    sjrScore = Math.min(100, (sjrVal / 6.0) * 100);
  } else {
    sjrScore = qScore;
  }

  let snipScore = 0;
  if (snipVal > 0) {
    snipScore = Math.min(100, (snipVal / 3.5) * 100);
  } else {
    snipScore = qScore;
  }

  let hScore = 0;
  if (hVal > 0) {
    hScore = Math.min(100, (hVal / 400.0) * 100);
  } else {
    hScore = qScore;
  }

  let rawScore = (ifScore * 0.35) + (qScore * 0.30) + (sjrScore * 0.15) + (snipScore * 0.10) + (hScore * 0.10);
  
  if (!ifVal && !sjrVal) {
    rawScore *= 0.8;
  }

  const deduction = predatoryAudit ? (predatoryAudit.scoreDeduction || 0) : 0;
  const finalScore = Math.max(0, Math.min(100, Math.round(rawScore - deduction)));

  let grade = '🟢 Tạp chí Đạt chuẩn';
  let color = '#2563eb';
  let level = 'RELIABLE';

  if (predatoryAudit && predatoryAudit.isPredatory) {
    grade = '🚨 High Risk / Nghi ngờ Biến tướng';
    color = '#dc2626';
    level = 'PREDATORY_RISK';
  } else if (finalScore >= 90) {
    grade = '🌟 Top Elite World Class (Tạp chí Hàng đầu Thế giới)';
    color = '#16a34a';
    level = 'TOP_ELITE';
  } else if (finalScore >= 75) {
    grade = '💎 High Impact Specialist (Tạp chí Chuyên khoa Cao)';
    color = '#0284c7';
    level = 'HIGH_IMPACT';
  } else if (finalScore >= 50) {
    grade = '🟢 Reliable Peer-Reviewed (Tạp chí Đạt chuẩn Uy tín)';
    color = '#2563eb';
    level = 'RELIABLE';
  } else if (finalScore >= 30) {
    grade = '⚠️ Moderate / Chỉ số Trung bình';
    color = '#d97706';
    level = 'MODERATE';
  } else {
    grade = '⚠️ Low Impact / Dữ liệu Hạn chế';
    color = '#64748b';
    level = 'LOW';
  }

  return {
    score: finalScore,
    grade,
    color,
    level,
    breakdown: {
      ifScore: Math.round(ifScore),
      qScore: Math.round(qScore),
      sjrScore: Math.round(sjrScore),
      snipScore: Math.round(snipScore),
      hScore: Math.round(hScore),
      rawScore: Math.round(rawScore),
      deduction
    }
  };
}

export function getJournalQualityProfile(journalName: string, studyObj?: any): JournalQualityProfile | null {
  let metrics: any = null;

  if (window.getJournalMetrics) {
    metrics = window.getJournalMetrics(journalName, studyObj);
  }

  if (!metrics && studyObj) {
    metrics = {
      name: journalName || studyObj.organization || 'Tạp chí',
      journal: journalName || studyObj.organization,
      if: studyObj.impactFactor || studyObj.if || null,
      impactFactor: studyObj.impactFactor || studyObj.if || null,
      quartile: studyObj.quartile || (studyObj.sourceType === 'vn-moh' ? 'MOH' : 'Q4'),
      sjr: studyObj.sjr || null,
      snip: studyObj.snip || null,
      hIndex: studyObj.hIndex || null,
      publisher: studyObj.publisher || 'N/A',
      sourceType: studyObj.sourceType
    };
  }

  if (!metrics) return null;

  const predatoryAudit = window.auditPredatoryRisk ? window.auditPredatoryRisk(journalName, metrics.publisher, metrics.issn) : null;
  const trustScore = calculateJournalTrustScore(metrics, predatoryAudit);

  let rec = 'Nghiên cứu có nguồn uy tín, đạt chuẩn thực hành lâm sàng.';
  if (trustScore.level === 'TOP_ELITE') {
    rec = 'Nguồn chứng cứ lâm sàng cấp độ cao nhất thế giới (Top Elite). Khuyến cáo độ tin cậy tuyệt đối.';
  } else if (trustScore.level === 'NATIONAL_MOH') {
    rec = 'Khuyến cáo pháp lý bắt buộc tuân thủ theo quy định của Bộ Y tế Việt Nam.';
  } else if (trustScore.level === 'PREDATORY_RISK') {
    rec = 'CẢNH BÁO: Tạp chí có rủi ro bình duyệt lỏng lẻo / biến tướng. Cần thận trọng khi áp dụng điều trị.';
  }

  return {
    journalName: journalName || metrics.name,
    metrics,
    trustScore,
    predatoryAudit,
    recommendation: rec
  };
}

if (typeof window !== 'undefined') {
  window.calculateJournalTrustScore = calculateJournalTrustScore;
  window.getJournalQualityProfile = getJournalQualityProfile;
}
