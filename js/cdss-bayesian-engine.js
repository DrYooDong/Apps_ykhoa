/**
 * cdss-bayesian-engine.js — CliniPortal Core Clinical Decision Support System Engine
 * Bộ máy suy diễn Bayes xác suất & hỗ trợ ra quyết định lâm sàng dùng chung
 * cho hệ sinh thái Web Y khoa CliniPortal (100% Vanilla JS ES6+, Offline file:///).
 */

class CDSSBayesianEngine {
  /**
   * Tính xác suất hậu nghiệm theo Định lý Bayes (Bayes' Theorem)
   * @param {Object} priors - Tỷ lệ mắc tiên nghiệm (Ví dụ: { pneumonia: 0.05, covid: 0.05 })
   * @param {Object} likelihoods - Xác suất có điều kiện P(Symptom | Disease)
   * @param {Object} baseRates - Tỷ lệ hiện diện triệu chứng trong quần thể P(Symptom)
   * @param {Object} observed - Các triệu chứng/sinh tồn quan sát được { fever: true, cough: true, ... }
   * @returns {Object} Xác suất hậu nghiệm đã cập nhật (chưa chuẩn hóa)
   */
  static calculatePosterior(priors, likelihoods, baseRates, observed) {
    let posteriors = { ...priors };
    const diseases = Object.keys(priors);

    diseases.forEach(disease => {
      Object.entries(observed).forEach(([symptom, isPresent]) => {
        const pSymGivenDis = likelihoods[disease] && likelihoods[disease][symptom];
        const pSym = baseRates[symptom];

        if (pSymGivenDis !== undefined && pSym !== undefined && pSym > 0 && pSym < 1) {
          if (isPresent) {
            // P(D|S) = P(S|D) * P(D) / P(S)
            posteriors[disease] = (pSymGivenDis * posteriors[disease]) / pSym;
          } else {
            // P(D|~S) = (1 - P(S|D)) * P(D) / (1 - P(S))
            posteriors[disease] = ((1 - pSymGivenDis) * posteriors[disease]) / (1 - pSym);
          }
        }
      });
    });

    return posteriors;
  }

  /**
   * Hiệu chỉnh xác suất theo các yếu tố nguy cơ dân số (Tuổi & Giới tính)
   * @param {Object} posteriors - Xác suất sau khi tính Bayes
   * @param {number} age - Tuổi bệnh nhân (năm)
   * @param {string} gender - 'male' | 'female' | 'nam' | 'nu'
   * @param {number} ageBoostRatio - Hệ số ảnh hưởng tuổi (mặc định 0.45)
   * @param {number} maleRiskRatio - Tỷ số nguy cơ ở nam giới (mặc định 1.15)
   * @returns {Object} Xác suất đã hiệu chỉnh
   */
  static applyDemographicModifiers(posteriors, age = 50, gender = 'male', ageBoostRatio = 0.45, maleRiskRatio = 1.15) {
    let adjusted = { ...posteriors };
    const ageFactor = Math.min(1.0, Math.max(0, Number(age) / 80));
    const isMale = String(gender).toLowerCase() === 'male' || String(gender).toLowerCase() === 'nam';

    Object.keys(adjusted).forEach(disease => {
      const ageBoost = 0.35 + (ageBoostRatio * ageFactor);
      adjusted[disease] = (adjusted[disease] * ageBoost) / (
        adjusted[disease] * ageBoost + (1 - adjusted[disease]) * (1 - ageBoost)
      );

      if (isMale) {
        adjusted[disease] = (adjusted[disease] * maleRiskRatio) / (
          adjusted[disease] * maleRiskRatio + (1 - adjusted[disease])
        );
      }
    });

    return adjusted;
  }

  /**
   * Chuẩn hóa mảng xác suất trong dải an toàn [minVal, maxVal]
   * @param {Object} probs - Object xác suất
   * @param {number} minVal - Mặc định 0.01 (1%)
   * @param {number} maxVal - Mặc định 0.98 (98%)
   */
  static normalizeProbabilities(probs, minVal = 0.01, maxVal = 0.98) {
    const normalized = {};
    Object.keys(probs).forEach(key => {
      const val = Number(probs[key]);
      if (isNaN(val)) {
        normalized[key] = minVal;
      } else {
        normalized[key] = Math.min(maxVal, Math.max(minVal, val));
      }
    });
    return normalized;
  }

  /**
   * Đánh giá mức độ nặng lâm sàng dựa trên huyết động và dấu hiệu sinh tồn
   * @param {Object} vitals - { sbp, dbp, hr, temp, spo2, age }
   * @param {number} maxDiseaseProb - Xác suất cao nhất của chẩn đoán chính
   * @returns {Object} { level, label, badgeClass, isShock, isSevere }
   */
  static evaluateSeverityTriage(vitals, maxDiseaseProb = 0.5) {
    const sbp = Number(vitals.sbp || 120);
    const hr = Number(vitals.hr || 75);
    const temp = Number(vitals.temp || 37.0);
    const spo2 = Number(vitals.spo2 || 98);
    const age = Number(vitals.age || 50);

    const isShock = sbp < 90 || spo2 < 90;
    const isSevere = temp > 39.0 || hr > 110 || spo2 < 94 || (age >= 65 && sbp < 100);

    if (isShock) {
      return {
        level: "Critical",
        label: "NGUY KỊCH — HỒI SỨC CẤP CỨU",
        badgeClass: "badge-severity-critical",
        isShock: true,
        isSevere: true
      };
    } else if (isSevere || (age >= 65 && maxDiseaseProb > 0.70)) {
      return {
        level: "High",
        label: "Nặng — Nhập Viện Nội Trú / ICU",
        badgeClass: "badge-severity-high",
        isShock: false,
        isSevere: true
      };
    } else if (maxDiseaseProb > 0.50 || temp > 38.0 || hr > 100) {
      return {
        level: "Moderate",
        label: "Trung bình — Theo dõi sát",
        badgeClass: "badge-severity-mod",
        isShock: false,
        isSevere: false
      };
    }

    return {
      level: "Low",
      label: "Nhẹ / Ngoại trú",
      badgeClass: "badge-severity-low",
      isShock: false,
      isSevere: false
    };
  }
}

// Global Export cho trình duyệt không dùng module ES6
if (typeof window !== 'undefined') {
  window.CDSSBayesianEngine = CDSSBayesianEngine;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CDSSBayesianEngine };
}
