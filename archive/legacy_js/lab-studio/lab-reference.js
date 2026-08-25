/**
 * Lab Pro Studio — Reference Database & Criteria Definition
 * Defines reference ranges, units, category grouping, and clinical criteria.
 */

window.LAB_REFERENCE_DATA = {
  // --- HUYẾT HỌC (CBC) ---
  wbc: { name: "Bạch cầu (WBC)", group: "cbc", unit: "G/L", min: 4.0, max: 10.0, lowCrit: 1.5, highCrit: 30.0, desc: "Tổng số lượng bạch cầu ngoại vi" },
  neu_pct: { name: "Neutrophil %", group: "cbc", unit: "%", min: 40.0, max: 74.0, lowCrit: 10.0, highCrit: 90.0, desc: "Tỷ lệ bạch cầu trung tính" },
  lym_pct: { name: "Lymphocyte %", group: "cbc", unit: "%", min: 20.0, max: 45.0, lowCrit: 5.0, highCrit: 75.0, desc: "Tỷ lệ bạch cầu Lympho" },
  mono_pct: { name: "Monocyte %", group: "cbc", unit: "%", min: 2.0, max: 8.0, lowCrit: 0, highCrit: 20.0, desc: "Tỷ lệ bạch cầu Mono" },
  eos_pct: { name: "Eosinophil %", group: "cbc", unit: "%", min: 0.5, max: 5.0, lowCrit: 0, highCrit: 20.0, desc: "Tỷ lệ bạch cầu ái toan" },
  baso_pct: { name: "Basophil %", group: "cbc", unit: "%", min: 0.0, max: 1.5, lowCrit: 0, highCrit: 10.0, desc: "Tỷ lệ bạch cầu ái kiềm" },
  rbc: { name: "Hồng cầu (RBC)", group: "cbc", unit: "T/L", min: 3.8, max: 5.8, lowCrit: 2.0, highCrit: 7.0, desc: "Tổng số lượng hồng cầu" },
  hb: { name: "Hemoglobin (Hb)", group: "cbc", unit: "g/L", min: 120, max: 165, lowCrit: 60, highCrit: 200, desc: "Nồng độ Huyết sắc tố" },
  hct: { name: "Hematocrit (Hct)", group: "cbc", unit: "%", min: 35.0, max: 50.0, lowCrit: 20.0, highCrit: 60.0, desc: "Thể tích khối hồng cầu" },
  mcv: { name: "MCV", group: "cbc", unit: "fL", min: 80.0, max: 100.0, lowCrit: 60.0, highCrit: 120.0, desc: "Thể tích trung bình hồng cầu" },
  mch: { name: "MCH", group: "cbc", unit: "pg", min: 27.0, max: 32.0, lowCrit: 18.0, highCrit: 40.0, desc: "Lượng Hb trung bình hồng cầu" },
  mchc: { name: "MCHC", group: "cbc", unit: "g/L", min: 320, max: 360, lowCrit: 260, highCrit: 390, desc: "Nồng độ Hb trung bình hồng cầu" },
  rdw: { name: "RDW-CV", group: "cbc", unit: "%", min: 11.5, max: 14.5, lowCrit: 9.0, highCrit: 25.0, desc: "Dải phân bố kích thước hồng cầu" },
  plt: { name: "Tiểu cầu (PLT)", group: "cbc", unit: "G/L", min: 150, max: 400, lowCrit: 20, highCrit: 1000, desc: "Số lượng tiểu cầu" },
  retic: { name: "Hồng cầu lưới (Retic)", group: "cbc", unit: "%", min: 0.5, max: 2.0, lowCrit: 0.1, highCrit: 10.0, desc: "Tỷ lệ hồng cầu lưới" },

  // --- SINH HÓA GAN - MẬT ---
  ast: { name: "AST (SGOT)", group: "liver", unit: "U/L", min: 0, max: 40, lowCrit: 0, highCrit: 1000, desc: "Enzyme men gan AST" },
  alt: { name: "ALT (SGPT)", group: "liver", unit: "U/L", min: 0, max: 40, lowCrit: 0, highCrit: 1000, desc: "Enzyme men gan ALT" },
  ggt: { name: "GGT", group: "liver", unit: "U/L", min: 0, max: 50, lowCrit: 0, highCrit: 500, desc: "Enzyme Gamma-GT" },
  alp: { name: "Alkaline Phosphatase (ALP)", group: "liver", unit: "U/L", min: 40, max: 130, lowCrit: 10, highCrit: 600, desc: "Enzyme Phosphatase kiềm" },
  bili_tp: { name: "Bilirubin Toàn phần", group: "liver", unit: "μmol/L", min: 3.4, max: 17.1, lowCrit: 0, highCrit: 200, desc: "Bilirubin tổng số" },
  bili_tt: { name: "Bilirubin Trực tiếp", group: "liver", unit: "μmol/L", min: 0.0, max: 5.1, lowCrit: 0, highCrit: 100, desc: "Bilirubin liên hợp" },
  alb: { name: "Albumin máu", group: "liver", unit: "g/L", min: 35, max: 52, lowCrit: 15, highCrit: 65, desc: "Protein Albumin huyết thanh" },
  prot: { name: "Protein Toàn phần", group: "liver", unit: "g/L", min: 64, max: 83, lowCrit: 40, highCrit: 100, desc: "Tổng lượng Protein huyết thanh" },

  // --- SINH HÓA THẬN - ĐIỆN GIẢI ---
  urea: { name: "Urea (BUN)", group: "kidney", unit: "mmol/L", min: 2.5, max: 7.5, lowCrit: 1.0, highCrit: 35.0, desc: "Nồng độ Ure máu" },
  cre: { name: "Creatinine", group: "kidney", unit: "μmol/L", min: 53, max: 106, lowCrit: 20, highCrit: 700, desc: "Creatinine huyết thanh" },
  egfr: { name: "eGFR", group: "kidney", unit: "mL/min/1.73m²", min: 90, max: 140, lowCrit: 15, highCrit: 180, desc: "Ước tính mức lọc cầu thận" },
  uric: { name: "Acid Uric", group: "kidney", unit: "μmol/L", min: 140, max: 420, lowCrit: 50, highCrit: 800, desc: "Nồng độ Acid Uric máu" },

  // --- ĐƯỜNG & LIPID MÁU ---
  glucose: { name: "Glucose đói", group: "metabolic", unit: "mmol/L", min: 3.9, max: 5.6, lowCrit: 2.2, highCrit: 20.0, desc: "Đường huyết lúc đói" },
  hba1c: { name: "HbA1c", group: "metabolic", unit: "%", min: 4.0, max: 5.6, lowCrit: 3.0, highCrit: 14.0, desc: "Huyết sắc tố Glycat hóa 3 tháng" },
  chol: { name: "Cholesterol TP", group: "metabolic", unit: "mmol/L", min: 3.1, max: 5.2, lowCrit: 1.5, highCrit: 12.0, desc: "Cholesterol toàn phần" },
  trig: { name: "Triglyceride", group: "metabolic", unit: "mmol/L", min: 0.46, max: 1.88, lowCrit: 0.2, highCrit: 11.3, desc: "Triglyceride huyết thanh" },
  hdl: { name: "HDL-Cholesterol", group: "metabolic", unit: "mmol/L", min: 1.03, max: 2.0, lowCrit: 0.4, highCrit: 3.5, desc: "Cholesterol bảo vệ (tốt)" },
  ldl: { name: "LDL-Cholesterol", group: "metabolic", unit: "mmol/L", min: 1.8, max: 3.4, lowCrit: 0.5, highCrit: 8.0, desc: "Cholesterol xấu" },

  // --- ĐÔNG CẦM MÁU ---
  pt_pct: { name: "Tỷ lệ Prothrombin (PT %)", group: "coag", unit: "%", min: 70, max: 100, lowCrit: 20, highCrit: 120, desc: "Hoạt tính đông máu đường ngoại sinh" },
  inr: { name: "INR", group: "coag", unit: "chỉ số", min: 0.8, max: 1.2, lowCrit: 0.5, highCrit: 5.0, desc: "Chỉ số chuẩn hóa quốc tế PT" },
  aptt: { name: "APTT (giây)", group: "coag", unit: "s", min: 25, max: 35, lowCrit: 15, highCrit: 100, desc: "Thời gian Thromboplastin từng phần" },
  fib: { name: "Fibrinogen", group: "coag", unit: "g/L", min: 2.0, max: 4.0, lowCrit: 0.8, highCrit: 8.0, desc: "Yếu tố I đông máu" },
  ddimer: { name: "D-Dimer", group: "coag", unit: "mg/L FEU", min: 0, max: 0.5, lowCrit: 0, highCrit: 10.0, desc: "Sản phẩm thoái biến Fibrin trùng hợp" }
};

window.LAB_CRITERIA_DATA = {
  anemia: {
    title: "Tiêu chuẩn Thiếu máu (WHO)",
    text: "Nam: Hb < 130 g/L | Nữ: Hb < 120 g/L | Phụ nữ mang thai: Hb < 110 g/L.",
    steps: ["Nhẹ: Hb 100-120 g/L", "Trung bình: Hb 70-100 g/L", "Nặng: Hb < 70 g/L (Chỉ định truyền máu khẩn)"]
  },
  dic: {
    title: "Tiêu chuẩn Chẩn đoán DIC (ISTH Score ≥ 5)",
    text: "Chẩn đoán đông máu nội mạch rải rác dựa trên 4 chỉ số:",
    steps: [
      "Tiểu cầu: < 50 G/L (2đ), 50-100 G/L (1đ)",
      "D-Dimer: Tăng rất cao (> 5.0 mg/L FEU) (3đ), Tăng nhẹ (2đ)",
      "PT kéo dài: > 6 giây (2đ), 3-6 giây (1đ)",
      "Fibrinogen: < 1.0 g/L (1đ)"
    ]
  },
  acute_liver: {
    title: "Tổn thương Gan Cấp tính (ACLF / ALI)",
    text: "Tăng Men gan AST/ALT > 10 lần giới hạn trên bình thường (ULN) kèm suy giảm chức năng tổng hợp (PT% < 50% hoặc INR > 1.5, Albumin giảm).",
    steps: ["Kiểu hoại tử tế bào gan: ALT/ALP ratio > 5", "Kiểu ứ mật: ALT/ALP ratio < 2"]
  },
  nephrotic: {
    title: "Hội chứng Thận hư (Nephrotic Syndrome)",
    text: "Tam chứng chẩn đoán:",
    steps: ["Protein niệu nặng (> 3.5 g/24h)", "Albumin máu giảm nặng (< 30 g/L)", "Phù toàn thân + Tăng Lipid máu phản ứng (Cholesterol & Triglyceride tăng cao)"]
  }
};
