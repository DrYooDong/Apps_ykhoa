/**
 * journal-trust-scorer.js
 * Thuật toán Tính điểm Uy tín Tổng hợp (Journal Trust Score 0 - 100)
 * Kết hợp chỉ số Impact Factor, Quartile, SJR, SNIP, H-Index & Kiểm tra Rủi ro Predatory.
 * 
 * CliniPortal - Y học Chứng cứ
 */

(function () {
  'use strict';

  /**
   * Tính toán Journal Trust Score (0 - 100) dựa trên trọng số chuẩn hóa
   * @param {Object} metrics - { if, impactFactor, quartile, sjr, snip, hIndex, sourceType }
   * @param {Object} predatoryAudit - Result from auditPredatoryRisk()
   * @returns {Object} { score: number, grade: string, color: string, breakdown: Object }
   */
  function calculateJournalTrustScore(metrics, predatoryAudit) {
    if (!metrics) {
      return { score: 0, grade: 'Chưa xếp hạng', color: '#94a3b8', level: 'UNKNOWN', breakdown: {} };
    }

    // Xử lý riêng cho Khuyến cáo Quốc gia Bộ Y tế Việt Nam
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

    // 1. IF Score (35% Trọng số) - Benchmark: IF >= 35 được max 100 điểm
    let ifScore = 0;
    if (ifVal > 0) {
      ifScore = Math.min(100, (ifVal / 35.0) * 100);
      if (ifVal >= 100) ifScore = 100;
    }

    // 2. Quartile Score (30% Trọng số)
    let qScore = 25;
    if (qVal === 'Q1') qScore = 100;
    else if (qVal === 'Q2') qScore = 75;
    else if (qVal === 'Q3') qScore = 50;
    else if (qVal === 'Q4') qScore = 25;

    // 3. SJR Score (15% Trọng số) - Benchmark: SJR >= 6.0 được max 100
    let sjrScore = 0;
    if (sjrVal > 0) {
      sjrScore = Math.min(100, (sjrVal / 6.0) * 100);
    } else {
      sjrScore = qScore; // Fallback theo Quartile nếu thiếu SJR
    }

    // 4. SNIP Score (10% Trọng số) - Benchmark: SNIP >= 3.5 được max 100
    let snipScore = 0;
    if (snipVal > 0) {
      snipScore = Math.min(100, (snipVal / 3.5) * 100);
    } else {
      snipScore = qScore;
    }

    // 5. H-Index Score (10% Trọng số) - Benchmark: H-Index >= 400 được max 100
    let hScore = 0;
    if (hVal > 0) {
      hScore = Math.min(100, (hVal / 400.0) * 100);
    } else {
      hScore = qScore;
    }

    // Điểm thô trước trừ rủi ro
    let rawScore = (ifScore * 0.35) + (qScore * 0.30) + (sjrScore * 0.15) + (snipScore * 0.10) + (hScore * 0.10);
    
    // Nếu thiếu cả IF và SJR thì giảm 20% tự động
    if (!ifVal && !sjrVal) {
      rawScore *= 0.8;
    }

    // Điểm trừ rủi ro Predatory
    const deduction = predatoryAudit ? (predatoryAudit.scoreDeduction || 0) : 0;
    const finalScore = Math.max(0, Math.min(100, Math.round(rawScore - deduction)));

    // Phân cấp danh hiệu
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
      grade: grade,
      color: color,
      level: level,
      breakdown: {
        ifScore: Math.round(ifScore),
        qScore: Math.round(qScore),
        sjrScore: Math.round(sjrScore),
        snipScore: Math.round(snipScore),
        hScore: Math.round(hScore),
        rawScore: Math.round(rawScore),
        deduction: deduction
      }
    };
  }

  /**
   * Tạo hồ sơ đánh giá chất lượng toàn diện cho một tạp chí
   * @param {string} journalName - Tên tạp chí
   * @param {Object} studyObj - Đơn vị nghiên cứu hiện tại (nếu có)
   * @returns {Object} Hồ sơ hoàn chỉnh
   */
  function getJournalQualityProfile(journalName, studyObj) {
    let metrics = null;

    // 1. Tìm trong local CSDL
    if (window.getJournalMetrics) {
      metrics = window.getJournalMetrics(journalName, studyObj);
    }

    if (!metrics && studyObj) {
      metrics = {
        name: journalName || studyObj.organization || studyObj.journal || 'Tạp chí Y khoa',
        journal: journalName || studyObj.organization || studyObj.journal,
        if: studyObj.impactFactor || studyObj.if || null,
        quartile: studyObj.quartile || (studyObj.sourceType === 'vn-moh' ? 'MOH' : null),
        sjr: studyObj.sjr || null,
        snip: studyObj.snip || null,
        hIndex: studyObj.hIndex || null,
        sourceType: studyObj.sourceType
      };
    }

    if (!metrics) {
      metrics = {
        name: journalName || 'Tạp chí Y khoa',
        journal: journalName,
        if: null, quartile: null, sjr: null, snip: null, hIndex: null
      };
    }

    // 2. Audit Predatory Risk
    const predatoryAudit = window.auditPredatoryRisk ? window.auditPredatoryRisk(metrics) : { riskLevel: 'SAFE', isPredatory: false, flags: [] };

    // 3. Calculate Trust Score
    const trustScore = calculateJournalTrustScore(metrics, predatoryAudit);

    return {
      name: metrics.name || metrics.journal || journalName,
      journal: metrics.journal || journalName,
      metrics: metrics,
      predatoryAudit: predatoryAudit,
      trustScore: trustScore
    };
  }

  // Export to global window
  window.calculateJournalTrustScore = calculateJournalTrustScore;
  window.getJournalQualityProfile = getJournalQualityProfile;

})();
