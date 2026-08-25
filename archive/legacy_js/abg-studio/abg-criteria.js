/**
 * abg-criteria.js — Blood Gas Pro Studio
 * Định nghĩa tiêu chuẩn chẩn đoán, công thức bù trừ sinh lý & Cảnh báo an toàn lâm sàng.
 */

const ABG_CRITERIA = {
  // 1. Phân loại Oxy hóa & ARDS theo Berlin Definition (P/F ratio)
  getOxygenationStatus(pao2, fio2) {
    if (!pao2 || !fio2) return { text: "Chưa đủ dữ liệu PaO2/FiO2", badge: "badge-info", pf: null, ards: "N/A" };
    const fio2Dec = fio2 > 1 ? fio2 / 100 : fio2;
    const pf = pao2 / fio2Dec;

    if (pf > 300) {
      return { text: `Tỉ lệ P/F = ${pf.toFixed(0)} mmHg — Oxy hóa máu bình thường`, badge: "badge-normal", pf, ards: "Bình thường" };
    } else if (pf > 200 && pf <= 300) {
      return { text: `Tỉ lệ P/F = ${pf.toFixed(0)} mmHg — Giảm oxy máu nhẹ / ARDS Nhẹ (Mild)`, badge: "badge-warning", pf, ards: "ARDS Nhẹ" };
    } else if (pf > 100 && pf <= 200) {
      return { text: `Tỉ lệ P/F = ${pf.toFixed(0)} mmHg — ARDS Mức Độ Vừa (Moderate ARDS)`, badge: "badge-danger", pf, ards: "ARDS Vừa" };
    } else {
      return { text: `Tỉ lệ P/F = ${pf.toFixed(0)} mmHg — ARDS Nặng (Severe ARDS)`, badge: "badge-danger", pf, ards: "ARDS Nặng" };
    }
  },

  // 2. Tính Gradient A-a DO2 (Alveolar-arterial Oxygen Gradient)
  calculateAaDO2(pao2, pco2, fio2, patAge = 40) {
    if (!pao2 || !pco2 || !fio2) return null;
    const fio2Dec = fio2 > 1 ? fio2 / 100 : fio2;
    // PAO2 = FiO2 * (PB - PH2O) - PaCO2 / R  =>  FiO2 * (760 - 47) - PaCO2 / 0.8
    const paO2Ideal = fio2Dec * 713 - (pco2 / 0.8);
    const aaGradient = paO2Ideal - pao2;
    const expectedAa = (patAge / 4) + 4; // Công thức kỳ vọng theo tuổi

    return {
      aaGradient: Math.max(0, aaGradient),
      expectedAa,
      isElevated: aaGradient > expectedAa + 5
    };
  },

  // 3. Tiêu chuẩn Chloride niệu trong Kiềm chuyển hóa
  getUrineClCriteria(urineCl) {
    if (urineCl === null || urineCl === undefined || isNaN(urineCl)) {
      return {
        type: "Chưa xét nghiệm Urine Cl-",
        advice: "Khuyên làm thêm Chloride niệu (UCl-) để phân biệt đáp ứng truyền Saline."
      };
    }
    if (urineCl < 20) {
      return {
        type: "Kiềm CH ĐÁP ỨNG Chloride (UCl- < 20 mEq/L)",
        advice: "Nguyên nhân do mất dịch/nôn ói/hút dịch dạ dày/lợi tiểu cũ. Bù NaCl 0.9% + KCl hiệu quả cao."
      };
    } else {
      return {
        type: "Kiềm CH KHÔNG ĐÁP ỨNG Chloride (UCl- ≥ 20 mEq/L)",
        advice: "Nguyên nhân do Cường Aldosterone/Lợi tiểu còn tác dụng/Hạ K+ nặng. Truyền Saline không chữa khỏi (Cần bù KCl + ngưng lợi tiểu)."
      };
    }
  },

  // 4. Các bẫy lâm sàng & Cảnh báo an toàn
  getSafetyWarnings(primaryDisorders, clinicalData) {
    const warnings = [];

    if (primaryDisorders.includes("respiratoryAcidosis")) {
      warnings.push("⚠️ <strong>Toan hô hấp:</strong> Là vấn đề THÔNG KHÍ. Tuyệt đối KHÔNG bù Bicarbonate máy móc (gây toan nghịch lý nội tế bào & tăng ứ CO2). Cần cải thiện thông khí (NIV / Đặt NKQ).");
    }
    if (primaryDisorders.includes("respiratoryAlkalosis")) {
      warnings.push("🚨 <strong>Bẫy kiềm hô hấp:</strong> Đừng quy kết do lo âu quá sớm! Có thể là dấu hiệu báo động sớm của <strong>Sepsis</strong>, <strong>Thuyên tắc phổi (PE)</strong> hoặc ngộ độc Salicylate.");
      warnings.push("⛔ <strong>Cấm thở túi giấy:</strong> Tuyệt đối không cho bệnh nhân thở lại vào túi giấy khi chưa loại trừ hoàn toàn thiếu oxy máu hoặc PE.");
    }
    if (primaryDisorders.includes("metabolicAcidosis") && clinicalData.agCorr > 14) {
      warnings.push("🩸 <strong>Toan CH tăng AG:</strong> Nhớ kiểm tra nguyên nhân MUDPILES / GOLDMARK (DKA, Lactic, Uremia, Toxins).");
    }

    return warnings;
  }
};
