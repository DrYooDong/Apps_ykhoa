/**
 * Journal Trust Scorer Engine (journal-trust-scorer.ts)
 * Path: src/content/ebm/guidelines/js/journal-trust-scorer.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface TrustScoreResult {
  score: number;
  grade: string;
  color: string;
  level: string;
  breakdown: Record<string, number>;
}

export function calculateJournalTrustScore(metrics: any, predatoryAudit?: any): TrustScoreResult {
  if (!metrics) {
    return { score: 0, grade: 'Chưa xếp hạng', color: '#94a3b8', level: 'UNKNOWN', breakdown: {} };
  }

  if (metrics.quartile === 'MOH' || metrics.sourceType === 'vn-moh') {
    const deduction = predatoryAudit?.scoreDeduction || 0;
    return {
      score: Math.max(0, 92 - deduction),
      grade: '🇻🇳 Khuyến cáo Quốc gia — Bộ Y tế Việt Nam',
      color: '#dc2626',
      level: 'NATIONAL_MOH',
      breakdown: { mohScore: 92, deduction }
    };
  }

  const ifVal = parseFloat(metrics.if || metrics.impactFactor || 0);
  const qVal = metrics.quartile || 'Q4';

  let ifScore = ifVal > 0 ? Math.min(100, (ifVal / 35.0) * 100) : 0;
  let qScore = qVal === 'Q1' ? 100 : qVal === 'Q2' ? 75 : qVal === 'Q3' ? 50 : 25;

  let rawScore = (ifScore * 0.4) + (qScore * 0.6);
  const deduction = predatoryAudit?.scoreDeduction || 0;
  const finalScore = Math.max(0, Math.min(100, Math.round(rawScore - deduction)));

  let grade = '🟢 Tạp chí Đạt chuẩn';
  let color = '#2563eb';
  let level = 'RELIABLE';

  if (predatoryAudit?.isPredatory) {
    grade = '🚨 High Risk / Nghi ngờ Biến tướng';
    color = '#dc2626';
    level = 'PREDATORY_RISK';
  } else if (finalScore >= 85) {
    grade = '⭐ Top Tier Journal';
    color = '#16a34a';
    level = 'TOP_TIER';
  }

  return {
    score: finalScore,
    grade,
    color,
    level,
    breakdown: { ifScore, qScore, deduction }
  };
}

if (typeof window !== 'undefined') {
  (window as any).calculateJournalTrustScore = calculateJournalTrustScore;
}
