/**
 * Disease Order Sets Database - DocSpace
 * Kết nối mã ICD-10 với Lộ trình điều trị (Guidelines), Công cụ tính toán (Calculators), và Danh mục Thuốc gợi ý
 */

export interface OrderSetGuideline {
  title: string;
  link: string;
}

export interface OrderSetCalculator {
  title: string;
  id: string;
}

export interface OrderSetDrug {
  name: string;
  dosage?: string;
  note?: string;
}

export interface OrderSet {
  icdPrefixes: string[]; // ví dụ: ["I10", "I11", "I15"]
  diseaseName: string;
  summary: string;
  guidelines: OrderSetGuideline[];
  calculators: OrderSetCalculator[];
  suggestedDrugs: OrderSetDrug[];
}

export const DISEASE_ORDER_SETS: OrderSet[] = [
  {
    icdPrefixes: ["I10", "I11", "I12", "I13", "I15"],
    diseaseName: "Tăng huyết áp vô căn / thứ phát",
    summary: "Phác đồ kiểm soát huyết áp theo VNHA/ESC 2022. Ưu tiên khởi đầu phối hợp 2 thuốc liều thấp.",
    guidelines: [
      { title: "Khuyến cáo Chẩn đoán & Điều trị THA (VNHA 2022)", link: "#/ebm/guidelines/htn-vnha-2022" },
      { title: "Tiếp cận Tăng huyết áp Cấp cứu (Hypertensive Crisis)", link: "#/content/approaches/htn-emergency.html" }
    ],
    calculators: [
      { title: "Đánh giá nguy cơ biến cố tim mạch ASCVD Risk", id: "ascvd" },
      { title: "Tính độ thanh thải Creatinine (Cockcroft-Gault)", id: "crcl" }
    ],
    suggestedDrugs: [
      { name: "Amlodipine", dosage: "5mg - 10mg x 1 lần/ngày (uống sáng)", note: "Chẹn kênh Canxi DHP" },
      { name: "Losartan", dosage: "50mg - 100mg x 1 lần/ngày", note: "Ức chế thụ thể ARB" },
      { name: "Perindopril", dosage: "5mg - 10mg x 1 lần/ngày", note: "Ức chế men chuyển ACEi" },
      { name: "Bisoprolol", dosage: "2.5mg - 5mg x 1 lần/ngày", note: "Chẹn Beta (ưu tiên nếu có suy tim/BĐMV)" },
      { name: "Hydrochlorothiazide", dosage: "12.5mg - 25mg x 1 lần/ngày", note: "Lợi tiểu Thiazide" }
    ]
  },
  {
    icdPrefixes: ["E11", "E10", "E13", "E14"],
    diseaseName: "Đái tháo đường typ 2 / typ 1",
    summary: "Kiểm soát đường huyết mục tiêu HbA1c < 7.0%. Đánh giá kèm biến chứng thận/tim mạch để chọn SGLT2i / GLP-1RA.",
    guidelines: [
      { title: "Hướng dẫn chẩn đoán và điều trị ĐTĐ typ 2 (Bộ Y Tế / ADA 2024)", link: "#/ebm/guidelines/diabetes-ada-2024" },
      { title: "Tiếp cận Hạ đường huyết cấp cứu", link: "#/content/approaches/hypoglycemia.html" }
    ],
    calculators: [
      { title: "Tính eGFR (CKD-EPI 2021)", id: "egfr" }
    ],
    suggestedDrugs: [
      { name: "Metformin", dosage: "500mg - 1000mg x 2 lần/ngày (sau ăn)", note: "Nền tảng điều trị" },
      { name: "Dapagliflozin", dosage: "10mg x 1 lần/ngày (uống sáng)", note: "SGLT2i - Bảo vệ tim & thận" },
      { name: "Empagliflozin", dosage: "10mg - 25mg x 1 lần/ngày", note: "SGLT2i" },
      { name: "Gliclazide MR", dosage: "30mg - 120mg x 1 lần/ngày (trước ăn sáng)", note: "Sulfonylurea thế hệ mới" },
      { name: "Insulin Glargine", dosage: "10-14 UI tiêm dưới da lúc 21h", note: "Insulin nền" }
    ]
  },
  {
    icdPrefixes: ["I50"],
    diseaseName: "Suy tim (HFrEF / HFpEF)",
    summary: "Tối ưu hóa bộ 4 trụ cột điều trị suy tim phân suất tống máu giảm (HFrEF): ARNI/ACEi/ARB + Beta Blocker + MRA + SGLT2i.",
    guidelines: [
      { title: "Khuyến cáo Chẩn đoán và Điều trị Suy tim Cấp & Mạn (VNHA / ESC 2023)", link: "#/ebm/guidelines/heart-failure-2023" }
    ],
    calculators: [
      { title: "Thang điểm tiên lượng MAGGIC Risk Score", id: "maggic" }
    ],
    suggestedDrugs: [
      { name: "Sacubitril/Valsartan", dosage: "49/51mg x 2 lần/ngày", note: "ARNI (thay thế ACEi/ARB)" },
      { name: "Bisoprolol", dosage: "2.5mg - 10mg x 1 lần/ngày", note: "Chẹn Beta giao cảm" },
      { name: "Spironolactone", dosage: "25mg x 1 lần/ngày", note: "Kháng Aldosterone (MRA)" },
      { name: "Dapagliflozin", dosage: "10mg x 1 lần/ngày", note: "SGLT2i" },
      { name: "Furosemide", dosage: "20mg - 40mg x 1-2 lần/ngày", note: "Lợi tiểu quai (khi có ứ trệ tuần hoàn)" }
    ]
  },
  {
    icdPrefixes: ["J44", "J45"],
    diseaseName: "Bệnh phổi tắc nghẽn mạn tính (COPD) / Hen phế quản",
    summary: "Xử trí đợt cấp COPD/Hen. Giãn phế quản phun khí dung, Corticoid toàn thân ngắn ngày.",
    guidelines: [
      { title: "Hướng dẫn chẩn đoán và điều trị COPD (GOLD 2024 / BYT)", link: "#/ebm/guidelines/copd-gold-2024" },
      { title: "Hướng dẫn GINA 2023 trong Quản lý Hen phế quản", link: "#/ebm/guidelines/asthma-gina-2023" }
    ],
    calculators: [
      { title: "Đánh giá mức độ nặng đợt cấp COPD", id: "copd-severity" }
    ],
    suggestedDrugs: [
      { name: "Salbutamol + Ipratropium", dosage: "Khí dung 1 tép x 3-4 lần/ngày", note: "SABA + SAMA" },
      { name: "Budesonide", dosage: "Khí dung 1mg x 2 lần/ngày", note: "ICS khí dung" },
      { name: "Methylprednisolone", dosage: "40mg tiêm tĩnh mạch x 1-2 lần/ngày", note: "Corticoid đường toàn thân (5-7 ngày)" },
      { name: "Amoxicillin/Clavulanate", dosage: "1g x 2 lần/ngày (uống)", note: "Kháng sinh (khi có dấu hiệu nhiễm trùng đờm)" }
    ]
  },
  {
    icdPrefixes: ["J18", "J15", "J13"],
    diseaseName: "Viêm phổi mắc phải cộng đồng (CAP)",
    summary: "Phân tầng nguy cơ CURB-65. Chọn lựa kháng sinh kinh nghiệm phù hợp với vi khuẩn đường hô hấp.",
    guidelines: [
      { title: "Hướng dẫn điều trị Viêm phổi mắc phải cộng đồng (IDSA/ATS & BYT)", link: "#/ebm/guidelines/cap-byt" }
    ],
    calculators: [
      { title: "Thang điểm tiên lượng CURB-65 Score", id: "curb65" }
    ],
    suggestedDrugs: [
      { name: "Amoxicillin/Clavulanate", dosage: "1g x 2 lần/ngày (uống)", note: "Beta-lactam + ức chế beta-lactamase" },
      { name: "Azithromycin", dosage: "500mg x 1 lần/ngày (3-5 ngày)", note: "Macrolide bao phủ vi khuẩn không điển hình" },
      { name: "Levofloxacin", dosage: "500mg - 750mg x 1 lần/ngày (tiêm/uống)", note: "Fluoroquinolone hô hấp" },
      { name: "Ceftriaxone", dosage: "1g - 2g tiêm TƯM x 1 lần/ngày", note: "Cephalosporin thế hệ 3" }
    ]
  },
  {
    icdPrefixes: ["N18"],
    diseaseName: "Bệnh thận mạn (CKD)",
    summary: "Phân độ CKD theo eGFR & Albumin niệu. Kiểm soát HA, ĐTĐ, điều chỉnh liều thuốc theo mức lọc cầu thận.",
    guidelines: [
      { title: "Khuyến cáo Quản lý & Điều trị Bệnh thận mạn (KDIGO 2023)", link: "#/ebm/guidelines/kdigo-ckd-2023" }
    ],
    calculators: [
      { title: "Tính eGFR CKD-EPI 2021", id: "egfr" },
      { title: "Hiệu chỉnh liều thuốc theo GFR", id: "gfr-dosing" }
    ],
    suggestedDrugs: [
      { name: "Dapagliflozin", dosage: "10mg x 1 lần/ngày", note: "Làm chậm tiến triển suy thận (eGFR >= 25)" },
      { name: "Losartan", dosage: "25mg - 50mg x 1 lần/ngày", note: "Giảm đạm niệu (theo dõi K+ máu)" },
      { name: "Calcium Carbonate", dosage: "500mg x 2-3 lần/ngày (uống trong bữa ăn)", note: "Gắn Phosphate" },
      { name: "Erythropoietin (EPO)", dosage: "2000 UI - 4000 UI tiêm dưới da 2-3 lần/tuần", note: "Điều trị thiếu máu do suy thận" }
    ]
  }
];

export function findOrderSetByIcd(code: string): OrderSet | undefined {
  if (!code) return undefined;
  const cleanCode = code.toUpperCase().trim().replace(/\./g, '');
  return DISEASE_ORDER_SETS.find(os =>
    os.icdPrefixes.some(pref => {
      const cleanPref = pref.toUpperCase().trim().replace(/\./g, '');
      return cleanCode.startsWith(cleanPref);
    })
  );
}
