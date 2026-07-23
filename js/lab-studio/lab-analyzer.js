/**
 * Lab Pro Studio — Diagnostic Analyzer Engine
 * Evaluates blood test values, calculates gauge bar positions, generates active chips,
 * and infers differential diagnosis options based on clinical patterns.
 */

window.LabAnalyzer = {

  // Evaluate single analyte value
  evaluateValue: function(key, val) {
    const ref = window.LAB_REFERENCE_DATA[key];
    if (!ref || val === undefined || val === null || isNaN(val)) {
      return { status: "normal", code: "NORMAL", label: "Bình thường", pctPin: 50 };
    }

    const { min, max, lowCrit, highCrit } = ref;
    let status = "normal";
    let code = "NORMAL";
    let label = "Bình thường";
    let pctPin = 50;

    if (val < min) {
      if (lowCrit !== undefined && val <= lowCrit) {
        status = "critical"; code = "CRITICAL_LOW"; label = "GIẢM NẶNG";
      } else {
        status = "low"; code = "LOW"; label = "Giảm";
      }
    } else if (val > max) {
      if (highCrit !== undefined && val >= highCrit) {
        status = "critical"; code = "CRITICAL_HIGH"; label = "TĂNG NẶNG";
      } else {
        status = "high"; code = "HIGH"; label = "Tăng";
      }
    }

    // Calculate position % on gauge bar (0 to 100%)
    if (val <= min) {
      const dist = min - (lowCrit || (min * 0.5));
      pctPin = dist > 0 ? Math.max(5, 25 - ((min - val) / dist) * 20) : 15;
    } else if (val >= max) {
      const dist = (highCrit || (max * 1.5)) - max;
      pctPin = dist > 0 ? Math.min(95, 75 + ((val - max) / dist) * 20) : 85;
    } else {
      pctPin = 25 + ((val - min) / (max - min)) * 50;
    }

    return { status, code, label, pctPin: Math.round(pctPin), ref };
  },

  // Analyze entire set of current lab values
  analyzeLabSet: function(values) {
    const findings = [];
    const activeChips = [];
    const ddxList = [];

    // 1. Evaluate all values
    Object.keys(values).forEach(key => {
      const val = values[key];
      const res = this.evaluateValue(key, val);
      if (res.status !== "normal") {
        findings.push({ key, val, ...res });

        if (res.status === "critical") {
          activeChips.push({ text: `${res.ref.name}: ${val} ${res.ref.unit} (${res.label})`, type: "chip-danger" });
        } else if (res.status === "high" || res.status === "low") {
          activeChips.push({ text: `${res.ref.name} ${res.label}`, type: "chip-warning" });
        }
      }
    });

    // Helper map
    const getV = (k) => values[k] || 0;

    // 2. Pattern Matching Rules for Differential Diagnosis (DDx)

    // Rule 1: Thiếu máu thiếu sắt (Iron Deficiency Anemia)
    if (getV("hb") < 120 && getV("mcv") < 80 && getV("rdw") > 14.5) {
      ddxList.push({
        title: "Thiếu máu Thiếu sắt (Iron Deficiency Anemia)",
        prob: "Rất cao (90%)",
        desc: "Thiếu máu hồng cầu nhỏ nhược sắc (Hb < 120, MCV < 80) kèm dải phân bố kích thước hồng cầu RDW tăng cao (> 14.5%).",
        nextTests: "📌 Đề xuất thêm: Ferritin huyết thanh, Sắt huyết thanh, TIBC, Tỷ lệ bão hòa Transferrin."
      });
    }

    // Rule 2: Thalassemia
    if (getV("hb") < 110 && getV("mcv") < 75 && (getV("retic") > 2.0 || getV("bili_tp") > 25)) {
      ddxList.push({
        title: "Bệnh Lý Thalassemia / Tán Huyết Mãn",
        prob: "Cao (80%)",
        desc: "Thiếu máu hồng cầu nhỏ mức độ nặng kèm phản ứng tăng sinh hồng cầu lưới hoặc tăng Bilirubin gián tiếp do tán huyết.",
        nextTests: "📌 Đề xuất thêm: Điện di Hemoglobin (Hb electrophoresis), Xét nghiệm gen Thalassemia."
      });
    }

    // Rule 3: Thiếu máu Hồng cầu khổng lồ (Megaloblastic Anemia)
    if (getV("hb") < 100 && getV("mcv") > 105) {
      ddxList.push({
        title: "Thiếu Máu Hồng Cầu Khổng Lồ (Thiếu Vit B12 / Folate)",
        prob: "Rất cao (92%)",
        desc: "Thiếu máu mức độ nặng kèm thể tích hồng cầu phồng to (MCV > 105 fL) và giảm bạch cầu/tiểu cầu nhẹ.",
        nextTests: "📌 Đề xuất thêm: Nồng độ Vitamin B12 huyết thanh, Acid Folic máu, Phết máu ngoại vi."
      });
    }

    // Rule 4: Xuất huyết giảm tiểu cầu tự miễn (ITP)
    if (getV("plt") < 30 && getV("hb") >= 110 && getV("inr") <= 1.2 && getV("aptt") <= 35) {
      ddxList.push({
        title: "Xuất Huyết Giảm Tiểu Cầu Tự Miễn (ITP)",
        prob: "Rất cao (95%)",
        desc: "Giảm tiểu cầu đơn độc rất nặng (< 30 G/L) trong khi các dòng hồng cầu, bạch cầu và các yếu tố đông máu bình thường.",
        nextTests: "📌 Đề xuất thêm: Phết máu ngoại vi (loại trừ tiểu cầu vón giả), Kháng thể kháng tiểu cầu, Tủy đồ."
      });
    }

    // Rule 5: DIC
    if (getV("plt") < 100 && (getV("inr") > 1.4 || getV("pt_pct") < 60) && getV("ddimer") > 2.0) {
      ddxList.push({
        title: "Đông Máu Nội Mạch Rải Rác (DIC)",
        prob: "Cấp cứu nguy hiểm (95%)",
        desc: "Giảm tiểu cầu, kéo dài thời gian đông máu ngoại sinh (INR/PT) và tăng sản phẩm thoái biến Fibrin D-Dimer rất cao.",
        nextTests: "📌 Đề xuất thêm: Định lượng Fibrinogen, Khám phát hiện chảy máu chân kim/xuất huyết niêm mạc."
      });
    }

    // Rule 6: Hemophilia
    if (getV("aptt") > 45 && getV("inr") <= 1.2 && getV("plt") >= 150) {
      ddxList.push({
        title: "Bệnh Lý Đông Máu Nội Sinh (Hemophilia A/B)",
        prob: "Rất cao (90%)",
        desc: "Thời gian APTT kéo dài đơn độc (> 45s) phản ánh rối loạn đường đông máu nội sinh.",
        nextTests: "📌 Đề xuất thêm: Định lượng yếu tố VIII, yếu tố IX, yếu tố XI, Bảng hỏi tiền sử gia đình."
      });
    }

    // Rule 7: Sốt xuất huyết Dengue nặng
    if (getV("hct") > 48 && getV("plt") < 50 && getV("wbc") < 4.0) {
      ddxList.push({
        title: "Sốt Xuất Huyết Dengue Cảnh Báo Nặng",
        prob: "Cấp cứu nguy hiểm (95%)",
        desc: "Tam chứng: Cô đặc máu Hct > 48%, Giảm tiểu cầu rất nặng < 50 G/L và Bạch cầu giảm sâu.",
        nextTests: "📌 Đề xuất thêm: Test nhanh Dengue NS1 / IgM-IgG, Siêu âm màng phổi báng bụng."
      });
    }

    // Rule 8: Suy gan cấp / Viêm gan cấp hoại tử
    if (getV("ast") > 400 || getV("alt") > 400) {
      ddxList.push({
        title: "Viêm Gan Cấp Bùng Phát / Hoại Tử Tế Bào Gan",
        prob: "Rất cao (92%)",
        desc: "Enzyme chuyển hóa men gan AST/ALT tăng > 10 lần giới hạn trên bình thường.",
        nextTests: "📌 Đề xuất thêm: HBsAg, Anti-HCV, Ngộ độc Paracetamol, Xét nghiệm chức năng đông máu (PT/INR)."
      });
    }

    // Rule 9: Xơ gan mất bù
    if (getV("alb") < 28 && (getV("inr") > 1.5 || getV("pt_pct") < 50) && getV("bili_tp") > 35) {
      ddxList.push({
        title: "Xơ Gan Mất Bù (Suy Chức Năng Gan Mãn)",
        prob: "Cao (88%)",
        desc: "Albumin máu sụt giảm nặng (< 28 g/L), giảm tổng hợp yếu tố đông máu (INR > 1.5) và Bilirubin tăng.",
        nextTests: "📌 Đề xuất thêm: Siêu âm Doppler gan mật, Tỷ lệ AST/ALT (APRI index), Nội soi dạ dày tầm soát tĩnh mạch trướng."
      });
    }

    // Rule 10: Viêm tụy cấp nặng do Tăng Triglyceride
    if (getV("trig") > 11.3 && getV("wbc") > 12.0) {
      ddxList.push({
        title: "Viêm Tụy Cấp Nặng do Tăng Triglyceride Máu",
        prob: "Rất cao (94%)",
        desc: "Triglyceride tăng cực kỳ nghiêm trọng (> 11.3 mmol/L) kích hoạt viêm tụy cấp hoại tử.",
        nextTests: "📌 Đề xuất thêm: Amylase / Lipase máu, CT Scan ổ bụng có thuốc tương phản, Lọc máu thay huyết tương khẩn."
      });
    }

    // Rule 11: Hội chứng thận hư
    if (getV("alb") < 30 && (getV("chol") > 7.0 || getV("trig") > 3.0)) {
      ddxList.push({
        title: "Hội Chứng Thận Hư (Nephrotic Syndrome)",
        prob: "Cao (85%)",
        desc: "Giảm Albumin máu nặng (< 30 g/L) phối hợp rối loạn Lipid máu phản ứng (Cholesterol / Triglyceride tăng cao).",
        nextTests: "📌 Đề xuất thêm: Protein niệu 24 giờ, Tổng phân tích nước tiểu, Sinh thiết thận nếu chỉ định."
      });
    }

    // Rule 12: Suy thận cấp / Bệnh thận mãn giai đoạn cuối (ESRD / AKI)
    if (getV("cre") > 150 || getV("egfr") < 60) {
      const isESRD = getV("cre") > 500 || getV("egfr") < 15;
      ddxList.push({
        title: isESRD ? "Bệnh Thận Mãn Giai Đoạn Cuối (ESRD)" : "Tổn Thương Thận Cấp (AKI) / Suy Thận",
        prob: "Rất cao (90%)",
        desc: `Creatinine huyết thanh tăng cao (${getV("cre")} μmol/L) làm suy giảm nghiêm trọng mức lọc cầu thận eGFR = ${getV("egfr")} mL/min/1.73m².`,
        nextTests: "📌 Đề xuất thêm: Khí máu động mạch (Toan chuyển hóa), Điện giải Na+/K+/Ca2+, Siêu âm hệ tiết niệu."
      });
    }

    // Rule 13: Cơn Gút Cấp Tính (Acute Gout)
    if (getV("uric") > 500 && getV("wbc") > 11.0) {
      ddxList.push({
        title: "Cơn Gút Cấp Tính (Acute Gouty Arthritis)",
        prob: "Cao (88%)",
        desc: "Acid Uric máu tăng rất cao (> 500 μmol/L) kích thích đáp ứng viêm cấp tính ở khớp.",
        nextTests: "📌 Đề xuất thêm: Soi kính hiển vi phân cực dịch khớp (tinh thể Urat hình kim âm tính), X-quang khớp."
      });
    }

    // Rule 14: Nhiễm trùng / Shock nhiễm khuẩn
    if (getV("wbc") > 15.0 && getV("neu_pct") > 80) {
      ddxList.push({
        title: "Phản Ứng Viêm Cấp / Nhiễm Trùng Huyết (Sepsis)",
        prob: "Cao (88%)",
        desc: "Bạch cầu tăng vọt (> 15 G/L) với tỷ lệ Neutrophil ưu thế (> 80% - chuyển trái).",
        nextTests: "📌 Đề xuất thêm: Procalcitonin (PCT), CRP, Cấy máu làm kháng sinh đồ, Khí máu động mạch."
      });
    }

    // Rule 15: Nhiễm toan Cetone Đái tháo đường (DKA)
    if (getV("glucose") > 15.0 && getV("hba1c") > 9.0) {
      ddxList.push({
        title: "Nhiễm Toan Cetone / Tăng Thẩm Thấu do Đái Tháo Đường",
        prob: "Rất cao (92%)",
        desc: "Glucose máu lúc đói tăng rất cao (> 15 mmol/L) và HbA1c > 9.0% phản ánh mất kiểm soát đường huyết nghiêm trọng.",
        nextTests: "📌 Đề xuất thêm: Cetone máu / Cetone niệu, Khí máu động mạch (Đánh giá pH & HCO3-), Điện giải đồ."
      });
    }

    // Default Fallback DDx if none triggered
    if (ddxList.length === 0) {
      ddxList.push({
        title: "Chưa phát hiện hội chứng bệnh lý điển hình",
        prob: "Tham khảo",
        desc: "Các trị số xét nghiệm ở mức bình thường hoặc thay đổi nhẹ chưa đủ tiêu chuẩn chẩn đoán hội chứng cấp cứu.",
        nextTests: "📌 Khuyến cáo: Theo dõi lâm sàng và làm lại xét nghiệm sau 24-48 giờ nếu triệu chứng kéo dài."
      });
    }

    return { findings, activeChips, ddxList };
  }
};
