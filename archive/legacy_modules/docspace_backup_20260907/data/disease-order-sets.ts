/**
 * Disease Order Sets Database V2 - DocSpace
 * Kết nối mã ICD-10 với Lộ trình điều trị (Guidelines), Công cụ tính toán (Calculators), và Danh mục Thuốc/CLS gợi ý
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

export interface OrderSetLab {
  name: string;
  purpose?: string;
}

export interface OrderSet {
  icdPrefixes: string[]; // ví dụ: ["I10", "I11", "I15"]
  diseaseName: string;
  summary: string;
  guidelines: OrderSetGuideline[];
  calculators: OrderSetCalculator[];
  suggestedDrugs: OrderSetDrug[];
  suggestedLabs?: OrderSetLab[];
}

export const DISEASE_ORDER_SETS: OrderSet[] = [
  {
    icdPrefixes: ["I10", "I11", "I12", "I13", "I15"],
    diseaseName: "Tăng Huyết Áp Vô Căn / Thứ Phát",
    summary: "Phác đồ kiểm soát huyết áp theo VNHA/ESC 2024. Mục tiêu HA phòng khám < 130/80 mmHg (nếu dung nạp). Ưu tiên phối hợp đôi cố định (Single-pill combination).",
    guidelines: [
      { title: "Khuyến cáo Chẩn đoán & Điều trị THA (VNHA 2022 / ESC 2024)", link: "#/ebm" },
      { title: "Tiếp cận Tăng huyết áp Cấp cứu (Hypertensive Crisis)", link: "#/ebm" }
    ],
    calculators: [
      { title: "Đánh giá nguy cơ biến cố tim mạch ASCVD Risk", id: "ascvd" },
      { title: "Tính mức lọc cầu thận eGFR (CKD-EPI)", id: "ckd-epi" }
    ],
    suggestedDrugs: [
      { name: "Amlodipine", dosage: "5mg - 10mg x 1 lần/ngày (uống sáng)", note: "Chẹn kênh Canxi DHP" },
      { name: "Losartan", dosage: "50mg - 100mg x 1 lần/ngày", note: "Ức chế thụ thể ARB" },
      { name: "Perindopril", dosage: "5mg - 10mg x 1 lần/ngày", note: "Ức chế men chuyển ACEi" },
      { name: "Bisoprolol", dosage: "2.5mg - 5mg x 1 lần/ngày", note: "Chẹn Beta (ưu tiên nếu có suy tim/BĐMV)" },
      { name: "Indapamide / HCTZ", dosage: "1.5mg - 25mg x 1 lần/ngày", note: "Lợi tiểu giống Thiazide" }
    ],
    suggestedLabs: [
      { name: "Điện giải đồ (Na+, K+, Cl-)", purpose: "Theo dõi trước và sau dùng ACEi/ARB/Lợi tiểu" },
      { name: "Creatinine & eGFR", purpose: "Đánh giá tổn thương cơ quan đích tại thận" },
      { name: "ECG 12 chuyển đạo", purpose: "Tìm phì đại thất trái (Sokolow-Lyon)" },
      { name: "UACR nước tiểu", purpose: "Sàng lọc microalbumin niệu" }
    ]
  },
  {
    icdPrefixes: ["E11", "E10", "E13", "E14"],
    diseaseName: "Đái Tháo Đường Típ 2 / Típ 1",
    summary: "Kiểm soát đường huyết cá thể hóa (HbA1c < 7.0%). Ưu tiên SGLT2i và GLP-1RA nếu có bệnh tim mạch xơ vữa, suy tim hoặc bệnh thận mạn.",
    guidelines: [
      { title: "Hướng dẫn chẩn đoán và điều trị ĐTĐ typ 2 (Bộ Y Tế / ADA 2024)", link: "#/ebm" },
      { title: "Tiếp cận Cấp cứu Hạ đường huyết & Nhiễm toan Ceton", link: "#/ebm" }
    ],
    calculators: [
      { title: "Bảng tính liều Insulin trượt (Sliding Scale)", id: "insulin-sliding-scale" },
      { title: "Mức lọc cầu thận ước tính eGFR (CKD-EPI)", id: "ckd-epi" }
    ],
    suggestedDrugs: [
      { name: "Metformin", dosage: "500mg - 1000mg x 2 lần/ngày (sau ăn)", note: "Hàng đầu nếu eGFR ≥ 30" },
      { name: "Empagliflozin / Dapagliflozin", dosage: "10mg x 1 lần/ngày", note: "SGLT2i bảo vệ tim thận" },
      { name: "Gliclazide MR", dosage: "30mg - 120mg x 1 lần/ngày (uống sáng)", note: "Sulfonylurea kích thích tiết insulin" },
      { name: "Sitagliptin", dosage: "100mg x 1 lần/ngày", note: "Ức chế DPP-4 trung tính cân nặng" },
      { name: "Insulin Glargine (Lantus)", dosage: "10 UI - 0.2 UI/kg tiêm dưới da buổi tối", note: "Insulin nền" }
    ],
    suggestedLabs: [
      { name: "HbA1c & Glucose đói", purpose: "Đánh giá kiểm soát đường huyết trung bình 3 tháng" },
      { name: "Bilan Lipid máu toàn phần", purpose: "Sàng lọc rối loạn chuyển hóa lipid" },
      { name: "Tỷ lệ UACR nước tiểu sáng", purpose: "Phát hiện biến chứng thận sớm" }
    ]
  },
  {
    icdPrefixes: ["I50", "I50.0", "I50.1", "I50.9"],
    diseaseName: "Suy Tim Cấp / Mạn Tính (HFrEF / HFpEF)",
    summary: "Chiến lược 4 Trụ Cột Nền Tảng (Fantastic Four): 1. ARNI/ACEi; 2. Chẹn Beta; 3. MRA (Spironolactone); 4. SGLT2i (Dapagliflozin/Empagliflozin). Dùng lợi tiểu quai khi có ứ trệ dịch.",
    guidelines: [
      { title: "Hướng dẫn chẩn đoán và điều trị Suy tim cấp và mạn (ESC 2023 / VNHA 2023)", link: "#/ebm" }
    ],
    calculators: [
      { title: "Phân tầng tiên lượng suy tim & Liều tương đương", id: "dose-equivalence" },
      { title: "Độ thanh thải Creatinine", id: "crcl" }
    ],
    suggestedDrugs: [
      { name: "Sacubitril / Valsartan (Entresto)", dosage: "24/26mg ➔ 49/51mg ➔ 97/103mg PO BID", note: "ARNI trụ cột số 1" },
      { name: "Bisoprolol / Metoprolol Succinate", dosage: "1.25mg ➔ chỉnh lên 10mg/ngày", note: "Chẹn Beta giao cảm khi ổn định dịch" },
      { name: "Spironolactone", dosage: "25mg - 50mg x 1 lần/ngày", note: "Kháng thụ thể Mineralocorticoid (MRA)" },
      { name: "Dapagliflozin / Empagliflozin", dosage: "10mg x 1 lần/ngày", note: "SGLT2i giảm tử vong và nhập viện" },
      { name: "Furosemide", dosage: "20mg - 40mg IV/PO", note: "Lợi tiểu quai giải áp ứ huyết" }
    ],
    suggestedLabs: [
      { name: "NT-proBNP / BNP định lượng", purpose: "Chẩn đoán và theo dõi đáp ứng điều trị suy tim" },
      { name: "Điện giải đồ (Na+, K+, Cl-)", purpose: "Theo dõi sát khi phối hợp ARNI, MRA và lợi tiểu" },
      { name: "Siêu âm tim Doppler", purpose: "Đo phân suất tống máu LVEF và chức năng tâm trương" }
    ]
  },
  {
    icdPrefixes: ["I48", "I48.0", "I48.1", "I48.9"],
    diseaseName: "Rung Nhĩ (Atrial Fibrillation)",
    summary: "Chiến lược ABC theo ESC 2024: A (Anticoagulation - Kháng đông dự phòng đột quỵ dựa trên CHA2DS2-VASc); B (Better symptom control - Kiểm soát tần số/nhịp); C (Cardiovascular risk factors).",
    guidelines: [
      { title: "Khuyến cáo Chẩn đoán và Xử trí Rung nhĩ (ESC 2024 / VNHA)", link: "#/ebm" }
    ],
    calculators: [
      { title: "Thang điểm Đột quỵ CHA2DS2-VASc", id: "cha2ds2-vasc" },
      { title: "Thang điểm Nguy cơ Xuất huyết HAS-BLED", id: "has-bled" }
    ],
    suggestedDrugs: [
      { name: "Rivaroxaban", dosage: "20mg x 1 lần/ngày (uống cùng bữa ăn tối)", note: "NOAC/DOAC ức chế FXa" },
      { name: "Apixaban", dosage: "5mg x 2 lần/ngày (2.5mg BID nếu suy thận/cao tuổi)", note: "NOAC an toàn tiêu hóa & thận" },
      { name: "Bisoprolol", dosage: "2.5mg - 5mg x 1 lần/ngày", note: "Kiểm soát tần số thất" },
      { name: "Digoxin", dosage: "0.125mg - 0.25mg x 1 lần/ngày", note: "Phối hợp kiểm soát tần số khi có suy tim" },
      { name: "Amiodarone", dosage: "200mg/ngày", note: "Chuyển nhịp và duy trì nhịp xoang" }
    ]
  },
  {
    icdPrefixes: ["J18", "J15", "J13", "J14"],
    diseaseName: "Viêm Phổi Mắc Phải Cộng Đồng (CAP)",
    summary: "Phân tầng mức độ nặng bằng thang điểm CURB-65 / PSI. Kháng sinh kinh nghiệm đường uống (Ngoại trú: Amox/Clav + Macrolide/Doxycycline) hoặc IV (Nội trú: Ceftriaxone + Macrolide/Quinolone).",
    guidelines: [
      { title: "Hướng dẫn chẩn đoán và điều trị Viêm phổi mắc phải cộng đồng (Bộ Y Tế / ATS/IDSA)", link: "#/ebm" }
    ],
    calculators: [
      { title: "Thang điểm Mức độ nặng Viêm phổi CURB-65", id: "curb65" },
      { title: "Tiêu chuẩn Đáp ứng Viêm Toàn Thân SIRS", id: "sirs" }
    ],
    suggestedDrugs: [
      { name: "Ceftriaxone", dosage: "1g - 2g IV mỗi 24 giờ", note: "Cephalosporin thế hệ 3" },
      { name: "Azithromycin", dosage: "500mg IV/PO ngày 1, sau đó 250mg q24h x 4 ngày", note: "Macrolide diệt VK không điển hình" },
      { name: "Levofloxacin", dosage: "500mg - 750mg IV/PO mỗi 24 giờ", note: "Fluoroquinolone hô hấp đơn trị" },
      { name: "Amoxicillin / Clavulanate", dosage: "1000/62.5mg x 2 lần/ngày", note: "Kháng sinh đường uống ngoại trú" }
    ],
    suggestedLabs: [
      { name: "X-quang ngực thẳng (CXR)", purpose: "Xác định tổn thương đông đặc thâm nhiễm phế nang" },
      { name: "Công thức máu & CRP / Procalcitonin", purpose: "Đánh giá mức độ viêm và định hướng vi khuẩn" },
      { name: "Cấy đàm làm kháng sinh đồ", purpose: "Phân lập vi khuẩn gây bệnh" }
    ]
  },
  {
    icdPrefixes: ["J44", "J44.0", "J44.1", "J44.9"],
    diseaseName: "Bệnh Phổi Tắc Nghẽn Mạn Tính (COPD)",
    summary: "Xử trí Đợt cấp COPD theo GOLD 2024: Thuốc dãn phế quản SABA/SAMA khí dung liều cao + Corticoid toàn thân ngắn ngày (Prednisolone 40mg x 5 ngày) + Kháng sinh nếu có tam chứng Anthonisen.",
    guidelines: [
      { title: "Chiến lược toàn cầu về chẩn đoán và điều trị COPD (GOLD 2024)", link: "#/ebm" }
    ],
    calculators: [
      { title: "Phân tích Khí máu động mạch (ABG Studio)", id: "abg" }
    ],
    suggestedDrugs: [
      { name: "Salbutamol + Ipratropium (Combivent)", dosage: "1 nang khí dung mỗi 4 - 6 giờ", note: "SABA + SAMA dãn phế quản cấp" },
      { name: "Methylprednisolone", dosage: "40mg IV/PO mỗi ngày x 5 ngày", note: "Corticoid toàn thân ngắn hạn" },
      { name: "Budesonide / Formoterol (Symbicort)", dosage: "160/4.5mcg x 2 hít x 2 lần/ngày", note: "Duy trì ngoài đợt cấp" },
      { name: "Amoxicillin / Clavulanate", dosage: "1g x 2 lần/ngày x 5-7 ngày", note: "Kháng sinh khi đàm đổi màu đục" }
    ]
  },
  {
    icdPrefixes: ["N18", "N18.1", "N18.2", "N18.3", "N18.4", "N18.5", "N18.9"],
    diseaseName: "Bệnh Thận Mạn (CKD G1-G5)",
    summary: "Phân loại theo KDIGO 2024 dựa trên eGFR và Albumin niệu. Kiểm soát HA mục tiêu SBP < 120 mmHg, dùng ức chế men chuyển/ARB + SGLT2i + Finerenone để làm chậm tiến triển suy thận.",
    guidelines: [
      { title: "Hướng dẫn KDIGO 2024 về Quản lý Bệnh Thận Mạn", link: "#/ebm" }
    ],
    calculators: [
      { title: "Tính eGFR theo CKD-EPI 2021", id: "ckd-epi" },
      { title: "Tính độ thanh thải Creatinine Cockcroft-Gault", id: "creatinine-clearance" }
    ],
    suggestedDrugs: [
      { name: "Dapagliflozin / Empagliflozin", dosage: "10mg x 1 lần/ngày", note: "SGLT2i làm chậm suy giảm GFR (eGFR ≥ 20)" },
      { name: "Losartan / Perindopril", dosage: "Liều dung nạp tối đa", note: "Giảm áp lực lọc cầu thận & Protein niệu" },
      { name: "Furosemide", dosage: "40mg - 80mg/ngày", note: "Kiểm soát quá tải thể tích khi G4-G5" }
    ]
  },
  {
    icdPrefixes: ["K25", "K26", "K27", "K92.0", "K92.2"],
    diseaseName: "Xuất Huyết Tiêu Hóa Trên (UGIB)",
    summary: "Hồi sức huyết động: Đặt 2 đường truyền lớn, truyền dịch/máu giữ Hb ≥ 7-8 g/dL. Dùng PPI liều cao (Esomeprazole 80mg IV bolus ➔ 8mg/h). Nội soi dạ dày can thiệp trong vòng 24h.",
    guidelines: [
      { title: "Hướng dẫn Chẩn đoán và Xử trí Xuất huyết tiêu hóa trên (ACG / ESGE)", link: "#/ebm" }
    ],
    calculators: [
      { title: "Thang điểm Glasgow-Blatchford Bleeding Score", id: "glasgow-blatchford" }
    ],
    suggestedDrugs: [
      { name: "Esomeprazole", dosage: "80mg IV bolus ➔ 8mg/giờ truyền liên tục 72 giờ", note: "PPI ức chế toan giữ pH dạ dày > 6" },
      { name: "Terlipressin / Octreotide", dosage: "Octreotide 50mcg IV bolus ➔ 50mcg/h", note: "Giảm áp lực tĩnh mạch cửa nếu nghi xơ gan" },
      { name: "Ceftriaxone", dosage: "1g IV mỗi 24 giờ x 5-7 ngày", note: "Dự phòng nhiễm trùng ở bệnh nhân xơ gan XHTH" }
    ]
  }
];

export function findOrderSetByIcd(icdCode: string): OrderSet | undefined {
  const cleanCode = icdCode.toUpperCase().trim();
  return DISEASE_ORDER_SETS.find(set => 
    set.icdPrefixes.some(prefix => cleanCode.startsWith(prefix.toUpperCase()))
  );
}
