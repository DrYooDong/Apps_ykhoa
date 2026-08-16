/**
 * Lab Diagnostics & Imaging Hub - DocSpace
 * Kho Cận Lâm Sàng, Khoảng Tham Chiếu, Gói Chỉ Định & Smart Lab Parser
 * Hỗ trợ phân tích kết quả xét nghiệm, bắt cờ đỏ (Critical Flags) & Biên giải lâm sàng
 */

import { escapeHtml } from '../docspace-view';

export interface LabTestItem {
  id: string;
  name: string;
  category: 'hematology' | 'biochemistry' | 'coagulation' | 'electrolytes' | 'cardiac' | 'urinalysis' | 'abg' | 'microbiology';
  categoryName: string;
  unit: string;
  refRangeMale: string;
  refRangeFemale?: string;
  criticalLow?: number;
  criticalHigh?: number;
  minNormal?: number;
  maxNormal?: number;
  aliases: string[];
  clinicalSignificance: string;
  highCauses?: string[];
  lowCauses?: string[];
  pearls?: string;
}

export interface LabOrderSet {
  id: string;
  name: string;
  category: string;
  icon: string;
  indication: string;
  tests: string[];
  description: string;
}

export interface ParsedLabResult {
  rawLine: string;
  testId?: string;
  testName: string;
  value: number;
  unit?: string;
  status: 'normal' | 'high' | 'low' | 'critical_high' | 'critical_low' | 'unknown';
  refRangeText?: string;
  flagText: string;
  significance?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. KHO DỮ LIỆU CẬN LÂM SÀNG & KHOẢNG THAM CHIẾU TOÀN DIỆN
// ─────────────────────────────────────────────────────────────────────────────

export const LAB_TESTS_DATABASE: LabTestItem[] = [
  // --- HUYẾT HỌC & ĐÔNG MÁU ---
  {
    id: 'wbc',
    name: 'Bạch cầu (WBC - White Blood Cell)',
    category: 'hematology',
    categoryName: 'Huyết học',
    unit: 'G/L (10^9/L)',
    refRangeMale: '4.0 - 10.0',
    minNormal: 4.0,
    maxNormal: 10.0,
    criticalLow: 1.5,
    criticalHigh: 30.0,
    aliases: ['wbc', 'bach cau', 'leukocyte', 'white blood cell'],
    clinicalSignificance: 'Chỉ số phản ánh tình trạng nhiễm trùng, phản ứng viêm toàn thân hoặc bệnh lý huyết học.',
    highCauses: ['Nhiễm khuẩn cấp (viêm phổi, viêm ruột thừa, áp xe)', 'Sepsis', 'Bạch cầu cấp / mạn (Leukemia)', 'Stress nặng, chấn thương', 'Dùng Corticosteroid'],
    lowCauses: ['Nhiễm virus (Sốt xuất huyết, Cúm, HIV)', 'Suy tủy xương, ung thư di căn tủy', 'Nhiễm trùng nặng/sốc nhiễm khuẩn tối cấp', 'Tác dụng phụ hóa trị / thuốc ức chế tủy'],
    pearls: 'Bạch cầu > 12 G/L hoặc < 4 G/L là một trong các tiêu chuẩn đáp ứng viêm toàn thân (SIRS).'
  },
  {
    id: 'neu_percent',
    name: 'Bạch cầu đa nhân trung tính (% Neutrophil)',
    category: 'hematology',
    categoryName: 'Huyết học',
    unit: '%',
    refRangeMale: '45 - 75',
    minNormal: 45,
    maxNormal: 75,
    aliases: ['neu', 'neutrophil', 'neu%', 'neut%'],
    clinicalSignificance: 'Dòng tế bào đầu tiên tham gia đáp ứng miễn dịch bẩm sinh chống vi khuẩn.',
    highCauses: ['Nhiễm trùng vi khuẩn cấp tính (Left shift / tăng bạch cầu non)', 'Hoại tử mô (Nhồi máu cơ tim, bỏng)', 'Viêm tụy cấp'],
    lowCauses: ['Nhiễm virus', 'Nhiễm trùng huyết nặng gây suy kiệt', 'Thuốc kháng giáp tổng hợp (PTU/Thiamazole)'],
    pearls: 'Hiện tượng chuyển trái (Left shift / Neutrophil > 80% hoặc xuất hiện Band cells > 10%) gợi ý mạnh nhiễm khuẩn nặng dù tổng WBC chưa tăng cao.'
  },
  {
    id: 'lym_percent',
    name: 'Bạch cầu Lympho (% Lymphocyte)',
    category: 'hematology',
    categoryName: 'Huyết học',
    unit: '%',
    refRangeMale: '20 - 40',
    minNormal: 20,
    maxNormal: 40,
    aliases: ['lym', 'lympho', 'lymphocyte', 'lym%'],
    clinicalSignificance: 'Miễn dịch đặc hiệu (tế bào T, B).',
    highCauses: ['Nhiễm virus (EBV, CMV, Viêm gan virus, COVID-19)', 'Lao mạn tính', 'Leukemia dòng lympho (CLL)'],
    lowCauses: ['Nhiễm trùng cấp tính nặng (Sepsis)', 'Dùng Corticoid kéo dài', 'Hội chứng suy giảm miễn dịch (HIV/AIDS)'],
    pearls: 'Tỷ lệ Neutrophil / Lymphocyte (NLR) tăng cao là chỉ điểm tiên lượng nặng trong viêm phổi và Sepsis.'
  },
  {
    id: 'rbc',
    name: 'Hồng cầu (RBC - Red Blood Cell)',
    category: 'hematology',
    categoryName: 'Huyết học',
    unit: 'T/L (10^12/L)',
    refRangeMale: '4.2 - 5.8',
    refRangeFemale: '3.8 - 5.0',
    minNormal: 3.8,
    maxNormal: 5.8,
    aliases: ['rbc', 'hong cau', 'red blood cell'],
    clinicalSignificance: 'Vận chuyển oxy đến các mô cơ quan.',
    highCauses: ['Đa hồng cầu nguyên phát (Polycythemia vera)', 'Thiếu oxy mạn tính (COPD, tim bẩm sinh tím)', 'Mất nước cô đặc máu'],
    lowCauses: ['Thiếu máu các nguyên nhân (Mất máu cấp/mạn, thiếu sắt, tan máu, suy tủy, bệnh thận mạn)']
  },
  {
    id: 'hgb',
    name: 'Hemoglobin (Hb / Hgb)',
    category: 'hematology',
    categoryName: 'Huyết học',
    unit: 'g/dL (hoặc g/L)',
    refRangeMale: '13.0 - 17.5 g/dL (130 - 175 g/L)',
    refRangeFemale: '12.0 - 15.5 g/dL (120 - 155 g/L)',
    minNormal: 12.0,
    maxNormal: 17.5,
    criticalLow: 7.0,
    criticalHigh: 20.0,
    aliases: ['hb', 'hgb', 'hemoglobin', 'huyết sắc tố'],
    clinicalSignificance: 'Chỉ số vàng chẩn đoán và phân độ thiếu máu.',
    highCauses: ['Bệnh đa hồng cầu', 'COPD nặng', 'Mất nước nặng'],
    lowCauses: ['Xuất huyết tiêu hóa, chấn thương', 'Thiếu máu thiếu sắt', 'Thalassemia', 'Bệnh thận mạn (giảm Erythropoietin)'],
    pearls: 'Ngưỡng truyền máu thông thường: Hb < 7.0 g/dL. Với bệnh nhân có hội chứng mạch vành cấp hoặc huyết động không ổn định: cân nhắc truyền khi Hb < 8.0 g/dL.'
  },
  {
    id: 'hct',
    name: 'Hematocrit (Hct)',
    category: 'hematology',
    categoryName: 'Huyết học',
    unit: '% (L/L)',
    refRangeMale: '40 - 52 % (0.40 - 0.52)',
    refRangeFemale: '36 - 48 % (0.36 - 0.48)',
    minNormal: 36,
    maxNormal: 52,
    criticalLow: 20,
    criticalHigh: 60,
    aliases: ['hct', 'hematocrit'],
    clinicalSignificance: 'Tỷ lệ thể tích hồng cầu chiếm trong thể tích máu toàn phần.',
    highCauses: ['Cô đặc máu do thoát huyết tương (Sốt xuất huyết Dengue nặng)', 'Bỏng nặng, mất nước', 'Đa hồng cầu'],
    lowCauses: ['Thiếu máu', 'Pha loãng máu do truyền dịch quá mức'],
    pearls: 'Trong Sốt xuất huyết Dengue: Hct tăng > 20% so với giá trị ban đầu là dấu hiệu cảnh báo thoát huyết tương cần bù dịch chống sốc.'
  },
  {
    id: 'plt',
    name: 'Tiểu cầu (PLT - Platelet)',
    category: 'hematology',
    categoryName: 'Huyết học',
    unit: 'G/L (10^9/L)',
    refRangeMale: '150 - 450',
    minNormal: 150,
    maxNormal: 450,
    criticalLow: 50,
    criticalHigh: 1000,
    aliases: ['plt', 'tieu cau', 'platelet'],
    clinicalSignificance: 'Chức năng đông cầm máu ban đầu.',
    highCauses: ['Tăng tiểu cầu phản ứng (Nhiễm trùng, sau cắt lách, thiếu máu thiếu sắt)', 'Tăng tiểu cầu tiên phát (ET)'],
    lowCauses: ['Sốt xuất huyết Dengue (ngày 3-7)', 'Xuất huyết giảm tiểu cầu miễn dịch (ITP)', 'Đông máu nội mạch rải rác (DIC)', 'Xơ gan / Cường lách', 'Giảm tiểu cầu do Heparin (HIT)'],
    pearls: 'Tiểu cầu < 50 G/L: Tránh can thiệp thủ thuật xâm lấn. Tiểu cầu < 10-20 G/L: Nguy cơ xuất huyết tự nhiên đe dọa tính mạng (chảy máu não, tiêu hóa).'
  },
  {
    id: 'inr',
    name: 'INR (International Normalized Ratio / PT-INR)',
    category: 'coagulation',
    categoryName: 'Đông máu',
    unit: 'Ratio',
    refRangeMale: '0.85 - 1.15',
    minNormal: 0.85,
    maxNormal: 1.15,
    criticalHigh: 4.5,
    aliases: ['inr', 'pt inr', 'pt-inr', 'prothrombin inr'],
    clinicalSignificance: 'Theo dõi con đường đông máu ngoại sinh và hiệu quả điều trị thuốc kháng Vitamin K (Warfarin/Sintrom).',
    highCauses: ['Dùng thuốc kháng Vitamin K quá liều', 'Suy gan nặng / Xơ gan mất bù', 'Thiếu hụt Vitamin K', 'DIC'],
    lowCauses: ['Tình trạng tăng đông máu'],
    pearls: 'Mục tiêu INR điều trị rung nhĩ / huyết khối tĩnh mạch bằng kháng Vitamin K thường là 2.0 - 3.0 (Van cơ học hai lá: 2.5 - 3.5). INR > 5.0 cần xử trí Vitamin K1 đường uống/tiêm.'
  },
  {
    id: 'aptt_ratio',
    name: 'aPTT Bệnh/Chứng (Tỷ lệ aPTT)',
    category: 'coagulation',
    categoryName: 'Đông máu',
    unit: 'Ratio (hoặc giây)',
    refRangeMale: '0.85 - 1.20 (28 - 38 giây)',
    minNormal: 0.85,
    maxNormal: 1.20,
    criticalHigh: 2.5,
    aliases: ['aptt', 'tck', 'aptt r', 'aptt ratio', 'activated partial thromboplastin time'],
    clinicalSignificance: 'Đánh giá con đường đông máu nội sinh và theo dõi điều trị Heparin không phân đoạn (UFH).',
    highCauses: ['Dùng Heparin không phân đoạn', 'Hemophilia A (thiếu yếu tố VIII), Hemophilia B (thiếu yếu tố IX)', 'Bệnh von Willebrand', 'Kháng đông Lupus (Lupus anticoagulant)'],
    lowCauses: ['Tăng đông, giai đoạn đầu DIC']
  },
  {
    id: 'ddimer',
    name: 'D-dimer',
    category: 'coagulation',
    categoryName: 'Đông máu',
    unit: 'ng/mL (hoặc µg/L FEU)',
    refRangeMale: '< 500 ng/mL (FEU)',
    maxNormal: 500,
    criticalHigh: 2000,
    aliases: ['d-dimer', 'ddimer', 'd dimer'],
    clinicalSignificance: 'Sản phẩm thoái giáng của Fibrin, phản ánh quá trình hình thành và tiêu cục máu đông.',
    highCauses: ['Thuyên tắc động mạch phổi (PE)', 'Huyết khối tĩnh mạch sâu (DVT)', 'Đông máu nội mạch rải rác (DIC)', 'Nhiễm trùng huyết nặng', 'Chấn thương/Phẫu thuật lớn', 'Ung thư'],
    lowCauses: ['Loại trừ thuyên tắc huyết khối với độ nhạy cao (> 95%)'],
    pearls: 'D-dimer có giá trị dự báo âm tính rất cao: Nếu D-dimer < 500 ng/mL ở bệnh nhân có xác suất lâm sàng PE thấp/vừa (Wells score) thì có thể loại trừ PE an toàn mà không cần chụp CTPA.'
  },

  // --- SINH HÓA, THẬN, GAN & ĐIỆN GIẢI ---
  {
    id: 'glucose',
    name: 'Glucose Máu (Đường huyết lúc đói)',
    category: 'biochemistry',
    categoryName: 'Sinh hóa',
    unit: 'mmol/L (hoặc mg/dL)',
    refRangeMale: '3.9 - 6.4 mmol/L (70 - 115 mg/dL)',
    minNormal: 3.9,
    maxNormal: 6.4,
    criticalLow: 2.8,
    criticalHigh: 20.0,
    aliases: ['glucose', 'glu', 'duong huyet', 'glycemia'],
    clinicalSignificance: 'Đánh giá chuyển hóa carbohydrate, chẩn đoán ĐTĐ và hạ đường huyết.',
    highCauses: ['Đái tháo đường Típ 1 / Típ 2', 'Nhiễm toan Ceton đái tháo đường (DKA)', 'Tăng áp lực thẩm thấu do đái tháo đường (HHS)', 'Dùng Corticoid', 'Stress phản ứng'],
    lowCauses: ['Quá liều Insulin hoặc Sulfonylurea', 'Suy thượng thận cấp', 'Nghiện rượu nhịn đói', 'Suy gan nặng', 'U tiết insulin (Insulinoma)'],
    pearls: 'Hạ đường huyết (Glucose < 3.9 mmol/L, đặc biệt < 2.8 mmol/L) là cấp cứu khẩn cần xử trí 15g đường uống hoặc truyền Glucose ưu trương 20-30% ngay.'
  },
  {
    id: 'hba1c',
    name: 'HbA1c (Hemoglobin A1c)',
    category: 'biochemistry',
    categoryName: 'Sinh hóa',
    unit: '% (mmol/mol)',
    refRangeMale: '4.0 - 5.6 % (Bình thường)',
    minNormal: 4.0,
    maxNormal: 5.6,
    aliases: ['hba1c', 'a1c', 'glycated hemoglobin'],
    clinicalSignificance: 'Phản ánh nồng độ đường huyết trung bình trong 2-3 tháng qua.',
    highCauses: ['Tiền đái tháo đường (5.7 - 6.4%)', 'Đái tháo đường (≥ 6.5%)', 'Kiểm soát đường huyết kém'],
    lowCauses: ['Bệnh huyết sắc tố, tan máu, sau truyền máu, mất máu mạn tính'],
    pearls: 'Mục tiêu điều trị chung cho đa số bệnh nhân ĐTĐ người lớn là HbA1c < 7.0% (cá thể hóa 6.5% ở người trẻ và 7.5 - 8.0% ở người cao tuổi nhiều bệnh nền).'
  },
  {
    id: 'creatinine',
    name: 'Creatinine Huyết thanh',
    category: 'biochemistry',
    categoryName: 'Sinh hóa',
    unit: 'µmol/L (hoặc mg/dL)',
    refRangeMale: '62 - 106 µmol/L (0.7 - 1.2 mg/dL)',
    refRangeFemale: '44 - 88 µmol/L (0.5 - 1.0 mg/dL)',
    minNormal: 44,
    maxNormal: 106,
    criticalHigh: 500,
    aliases: ['creatinine', 'cre', 'creat', 'creatinin'],
    clinicalSignificance: 'Chỉ số đánh giá chức năng lọc cầu thận (eGFR).',
    highCauses: ['Tổn thương thận cấp (AKI theo KDIGO: tăng ≥ 26.5 µmol/L trong 48h)', 'Bệnh thận mạn (CKD)', 'Mất nước giảm tưới máu thận', 'Tiêu cơ vân cấp (Rhabdomyolysis)'],
    lowCauses: ['Suy kiệt, teo cơ nặng, người ăn chay trường'],
    pearls: 'Creatinine máu tăng muộn: Chỉ bắt đầu tăng khi chức năng thận đã suy giảm > 50%. Cần tính toán eGFR theo công thức CKD-EPI 2021.'
  },
  {
    id: 'urea',
    name: 'Ure Máu (BUN / Urea)',
    category: 'biochemistry',
    categoryName: 'Sinh hóa',
    unit: 'mmol/L (hoặc mg/dL)',
    refRangeMale: '2.5 - 7.5 mmol/L (BUN: 7 - 20 mg/dL)',
    minNormal: 2.5,
    maxNormal: 7.5,
    criticalHigh: 30.0,
    aliases: ['ure', 'urea', 'bun', 'blood urea nitrogen'],
    clinicalSignificance: 'Sản phẩm chuyển hóa đạm đào thải qua thận.',
    highCauses: ['Suy thận cấp và mạn', 'Xuất huyết tiêu hóa trên (tiêu hóa máu làm tăng hấp thu ure)', 'Mất nước nặng', 'Chế độ ăn nhiều đạm, tăng dị hóa'],
    lowCauses: ['Suy dinh dưỡng nặng, suy tế bào gan nặng (giảm tổng hợp ure)'],
    pearls: 'Tỷ lệ BUN / Creatinine > 20:1 (tương đương Urea/Cre > 80-100) gợi ý nguyên nhân suy thận trước thận (thiếu thể tích tuần hoàn) hoặc xuất huyết tiêu hóa.'
  },
  {
    id: 'egfr',
    name: 'Mức lọc cầu thận ước tính (eGFR - CKD-EPI)',
    category: 'biochemistry',
    categoryName: 'Sinh hóa',
    unit: 'mL/min/1.73m²',
    refRangeMale: '≥ 90 mL/min/1.73m²',
    minNormal: 90,
    criticalLow: 15,
    aliases: ['egfr', 'gfr', 'muc loc cau than'],
    clinicalSignificance: 'Phân tầng giai đoạn Bệnh thận mạn (G1: ≥90, G2: 60-89, G3a: 45-59, G3b: 30-44, G4: 15-29, G5: <15).',
    lowCauses: ['Bệnh thận mạn giai đoạn tiến triển', 'Tổn thương thận cấp'],
    pearls: 'Bắt buộc tra cứu eGFR trước khi kê đơn các thuốc đào thải qua thận: Metformin (ngừng khi eGFR < 30), Kháng sinh (Aminoglycoside, Vancomycin, Quinolone), NOAC/DOAC, SGLT2i.'
  },
  {
    id: 'na',
    name: 'Natri Máu (Na+)',
    category: 'electrolytes',
    categoryName: 'Điện giải',
    unit: 'mmol/L (mEq/L)',
    refRangeMale: '135 - 145',
    minNormal: 135,
    maxNormal: 145,
    criticalLow: 120,
    criticalHigh: 160,
    aliases: ['na', 'natri', 'sodium', 'na+'],
    clinicalSignificance: 'Ion quyết định áp lực thẩm thấu ngoại bào và thể tích dịch.',
    highCauses: ['Mất nước không bù đủ (Đái tháo nhạt, sốt cao, tiêu chảy mất nước)', 'Truyền dịch ưu trương'],
    lowCauses: ['Hội chứng tiết ADH không thích hợp (SIADH)', 'Dùng thuốc lợi tiểu Thiazide', 'Suy tim ứ huyết, Xơ gan, Thận hư', 'Suy thượng thận (Addison)', 'Hạ Natri giả tạo do tăng Glucose/Lipid máu'],
    pearls: 'Quy tắc chỉnh Natri trong tăng đường huyết: Na hiệu chỉnh = Na đo được + 0.024 x (Glucose - 5.5). Không nâng Natri quá 8-10 mmol/L trong 24h đầu để tránh hủy myelin cầu não (ODS).'
  },
  {
    id: 'k',
    name: 'Kali Máu (K+)',
    category: 'electrolytes',
    categoryName: 'Điện giải',
    unit: 'mmol/L (mEq/L)',
    refRangeMale: '3.5 - 5.0',
    minNormal: 3.5,
    maxNormal: 5.0,
    criticalLow: 2.8,
    criticalHigh: 6.5,
    aliases: ['k', 'kali', 'potassium', 'k+'],
    clinicalSignificance: 'Điện thế màng tế bào, đặc biệt là cơ tim và thần kinh cơ.',
    highCauses: ['Suy thận cấp / mạn (giảm bài tiết)', 'Dùng thuốc giữ Kali (ACEi, ARB, Spironolactone, Finerenone, NSAID)', 'Toan chuyển hóa, tan máu, tiêu cơ vân'],
    lowCauses: ['Mất qua đường tiêu hóa (Nôn ói, tiêu chảy)', 'Mất qua thận (Dùng lợi tiểu Furosemide/Thiazide)', 'Hạ Kali do dịch chuyển tế bào (Dùng Insulin, khí dung Salbutamol)'],
    pearls: 'Tăng Kali máu (K+ > 6.0 mmol/L kèm biến đổi ECG: sóng T cao nhọn, PR dài, QRS giãn) là cấp cứu tim mạch tối khẩn ➔ Tiêm Canxi Clorid/Gluconat bảo vệ màng cơ tim ngay lập tức.'
  },
  {
    id: 'cl',
    name: 'Clo Máu (Cl-)',
    category: 'electrolytes',
    categoryName: 'Điện giải',
    unit: 'mmol/L (mEq/L)',
    refRangeMale: '98 - 106',
    minNormal: 98,
    maxNormal: 106,
    aliases: ['cl', 'clo', 'chloride', 'cl-'],
    clinicalSignificance: 'Thăng bằng kiềm toan và tính khoảng trống Anion (Anion Gap).'
  },
  {
    id: 'ca_total',
    name: 'Canxi Toàn phần (Total Calcium)',
    category: 'electrolytes',
    categoryName: 'Điện giải',
    unit: 'mmol/L (hoặc mg/dL)',
    refRangeMale: '2.15 - 2.55 mmol/L (8.6 - 10.2 mg/dL)',
    minNormal: 2.15,
    maxNormal: 2.55,
    criticalLow: 1.6,
    criticalHigh: 3.2,
    aliases: ['ca', 'canxi', 'calcium'],
    clinicalSignificance: 'Đồng yếu tố dẫn truyền thần kinh cơ và đông máu. Cần hiệu chỉnh theo Albumin: Ca hiệu chỉnh = Ca đo được + 0.8 x (40 - Albumin)/10.'
  },
  {
    id: 'ast',
    name: 'AST / GOT (Aspartate Aminotransferase)',
    category: 'biochemistry',
    categoryName: 'Sinh hóa',
    unit: 'U/L',
    refRangeMale: '< 40 U/L',
    maxNormal: 40,
    criticalHigh: 1000,
    aliases: ['ast', 'got', 'sgot', 'men gan ast'],
    clinicalSignificance: 'Men tế bào có ở gan, cơ tim, cơ vân, hồng cầu.',
    highCauses: ['Viêm gan cấp do virus hoặc độc chất (Paracetamol)', 'Hoại tử tế bào gan do thiếu máu cục bộ (Ischemic hepatitis)', 'Viêm gan do rượu (Tỷ lệ AST/ALT > 2)', 'Nhồi máu cơ tim, Tiêu cơ vân']
  },
  {
    id: 'alt',
    name: 'ALT / GPT (Alanine Aminotransferase)',
    category: 'biochemistry',
    categoryName: 'Sinh hóa',
    unit: 'U/L',
    refRangeMale: '< 40 U/L (Nam < 50, Nữ < 35)',
    maxNormal: 40,
    criticalHigh: 1000,
    aliases: ['alt', 'gpt', 'sgpt', 'men gan alt'],
    clinicalSignificance: 'Men đặc hiệu cao nhất cho tổn thương tế bào gan.',
    highCauses: ['Viêm gan virus B, C cấp và mạn', 'Viêm gan thoái hóa mỡ (MASLD / MASH)', 'Viêm gan tự miễn, độc chất', 'Tắc mật']
  },
  {
    id: 'bilirubin_total',
    name: 'Bilirubin Toàn phần (Total Bilirubin)',
    category: 'biochemistry',
    categoryName: 'Sinh hóa',
    unit: 'µmol/L (hoặc mg/dL)',
    refRangeMale: '5.0 - 21.0 µmol/L (0.3 - 1.2 mg/dL)',
    minNormal: 5.0,
    maxNormal: 21.0,
    criticalHigh: 200,
    aliases: ['bili', 'bilirubin', 'bilirubin tp', 'total bilirubin'],
    clinicalSignificance: 'Sản phẩm chuyển hóa Heme. Gây vàng da rõ khi Bilirubin > 35-50 µmol/L (2-3 mg/dL).',
    highCauses: ['Tắc mật ngoài gan (Sỏi mật, u đầu tụy, u đường mật)', 'Viêm gan cấp/xơ gan mất bù', 'Tan máu cấp (Tăng Bilirubin gián tiếp)']
  },
  {
    id: 'crp',
    name: 'CRP (C-Reactive Protein / hs-CRP)',
    category: 'biochemistry',
    categoryName: 'Sinh hóa',
    unit: 'mg/L',
    refRangeMale: '< 5.0 mg/L',
    maxNormal: 5.0,
    criticalHigh: 100.0,
    aliases: ['crp', 'c reactive protein', 'hs crp', 'hs-crp'],
    clinicalSignificance: 'Protein pha cấp nhạy cảm phản ánh mức độ viêm và nhiễm trùng.',
    highCauses: ['Nhiễm khuẩn cấp tính (Viêm phổi, Sepsis, áp xe)', 'Bệnh tự miễn bùng phát (Lupus, Viêm khớp dạng thấp)', 'Nhồi máu cơ tim, sau mổ lớn']
  },
  {
    id: 'procalcitonin',
    name: 'Procalcitonin (PCT)',
    category: 'biochemistry',
    categoryName: 'Sinh hóa',
    unit: 'ng/mL (µg/L)',
    refRangeMale: '< 0.05 ng/mL (Bình thường)',
    maxNormal: 0.05,
    criticalHigh: 2.0,
    aliases: ['pct', 'procalcitonin'],
    clinicalSignificance: 'Dấu ấn sinh học đặc hiệu cao cho nhiễm trùng vi khuẩn toàn thân và Sepsis.',
    highCauses: ['Nhiễm trùng vi khuẩn nặng, Viêm phổi mắc phải cộng đồng', 'Sepsis (0.5 - 2.0 ng/mL), Sốc nhiễm khuẩn (> 2.0 ng/mL)'],
    lowCauses: ['Nhiễm virus thuần túy, viêm không do nhiễm trùng (thường < 0.25 ng/mL)'],
    pearls: 'Hướng dẫn dừng/xuống thang kháng sinh: Khi PCT giảm > 80% so với đỉnh hoặc giảm < 0.25 ng/mL kèm lâm sàng cải thiện.'
  },
  {
    id: 'troponin_t_hs',
    name: 'hs-cTnT (High-Sensitivity Troponin T)',
    category: 'cardiac',
    categoryName: 'Men tim',
    unit: 'ng/L (pg/mL)',
    refRangeMale: '< 14 ng/L (Ngưỡng bách phân vị thứ 99)',
    maxNormal: 14,
    criticalHigh: 52,
    aliases: ['trop t', 'troponin t', 'hs-ctnt', 'hs ctnt', 'ctnt'],
    clinicalSignificance: 'Chỉ số vàng phát hiện hoại tử tế bào cơ tim và chẩn đoán Hội chứng vành cấp (ACS).',
    highCauses: ['Nhồi máu cơ tim cấp (Type 1 và Type 2)', 'Viêm cơ tim, viêm màng ngoài tim', 'Thuyên tắc phổi (PE nặng gây căng thất phải)', 'Sốc nhiễm khuẩn, Suy thận mạn (tích tụ giảm thanh thải)'],
    pearls: 'Phác đồ ESC 0/1h hoặc 0/2h: Động học men tim (Delta Troponin tăng nhanh sau 1h-2h) có giá trị quyết định chẩn đoán NSTEMI.'
  },
  {
    id: 'nt_probnp',
    name: 'NT-proBNP',
    category: 'cardiac',
    categoryName: 'Men tim',
    unit: 'pg/mL (ng/L)',
    refRangeMale: '< 125 pg/mL (< 75 tuổi) | < 450 pg/mL (≥ 75 tuổi)',
    maxNormal: 125,
    criticalHigh: 1800,
    aliases: ['probnp', 'nt probnp', 'nt-probnp', 'bnp'],
    clinicalSignificance: 'Peptid bài niệu phản ánh tình trạng căng giãn áp lực buồng thất và chẩn đoán suy tim.',
    highCauses: ['Suy tim cấp và mạn tính (HFrEF, HFmrEF, HFpEF)', 'Bệnh cơ tim, rung nhĩ', 'Thuyên tắc phổi, tăng áp phổi', 'Suy thận mạn'],
    pearls: 'Ngưỡng loại trừ suy tim cấp khi khó thở cấp tại cấp cứu: NT-proBNP < 300 pg/mL. Ngưỡng xác định suy tim cấp: > 450 pg/mL (< 50t), > 900 pg/mL (50-75t), > 1800 pg/mL (> 75t).'
  },
  {
    id: 'lactate',
    name: 'Lactate Máu (Động mạch / Tĩnh mạch)',
    category: 'abg',
    categoryName: 'Khí máu & Hồi sức',
    unit: 'mmol/L',
    refRangeMale: '0.5 - 2.0 mmol/L',
    minNormal: 0.5,
    maxNormal: 2.0,
    criticalHigh: 4.0,
    aliases: ['lactate', 'lactic acid', 'acid lactic'],
    clinicalSignificance: 'Chỉ số vàng đánh giá giảm tưới máu mô và chuyển hóa kỵ khí trong Sốc nhiễm khuẩn và Sốc tim.',
    highCauses: ['Sốc nhiễm khuẩn (Septic shock: Lactate > 2.0 mmol/L dù đã bù đủ dịch)', 'Sốc tim, Sốc giảm thể tích', 'Ngừng tuần hoàn, Co giật kéo dài', 'Thiếu máu cục bộ mạc treo'],
    pearls: 'Lactate > 4.0 mmol/L là chỉ định hồi sức dịch và vận mạch tối khẩn. Tốc độ thanh thải Lactate (> 20% mỗi 2 giờ) là mục tiêu đánh giá đáp ứng hồi sức sốc.'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. GÓI CHỈ ĐỊNH CẬN LÂM SÀNG THEO TÌNH HUỐNG LÂM SÀNG (ORDER SETS)
// ─────────────────────────────────────────────────────────────────────────────

export const LAB_ORDER_SETS: LabOrderSet[] = [
  {
    id: 'os_emergency_routine',
    name: 'Gói Cấp Cứu / Nhập Viện Thường Quy',
    category: 'Cấp cứu',
    icon: 'fa-solid fa-truck-medical',
    indication: 'Bệnh nhân mới nhập viện cấp cứu cần khảo sát tình trạng cơ bản',
    tests: [
      'Tổng phân tích tế bào máu ngoại vi (CTM 18-24 thông số)',
      'Đông máu cơ bản (PT/INR, aPTT, Fibrinogen)',
      'Sinh hóa máu: Glucose, Urea, Creatinine, eGFR',
      'Điện giải đồ (Na+, K+, Cl-)',
      'Men gan (AST, ALT)',
      'Tổng phân tích nước tiểu 10 thông số',
      'Điện tâm đồ (ECG 12 chuyển đạo tại giường)',
      'X-quang ngực thẳng (CXR)'
    ],
    description: 'Bộ xét nghiệm tiêu chuẩn đánh giá huyết học, đông máu, chức năng thận, gan và tim phổi ban đầu.'
  },
  {
    id: 'os_sepsis_icu',
    name: 'Gói Nhiễm Khuẩn Huyết & Sốc Nhiễm Khuẩn (Sepsis-3)',
    category: 'Hồi sức ICU',
    icon: 'fa-solid fa-biohazard',
    indication: 'Bệnh nhân sốt cao, tụt huyết áp, thở nhanh nghi ngờ Sepsis / Sốc nhiễm khuẩn',
    tests: [
      'Tổng phân tích tế bào máu ngoại vi (WBC, Neutrophil, Hct, PLT)',
      'Khí máu động mạch (ABG) + Đo nồng độ Lactate máu khẩn',
      'Procalcitonin (PCT) định lượng & hs-CRP',
      'Cấy máu 2 vị trí (2 chai kỵ khí + 2 chai ái khí) trước khi dùng kháng sinh',
      'Chức năng thận (Creatinine, Urea, eGFR)',
      'Điện giải đồ (Na+, K+, Cl-, Ca2+)',
      'Đông máu toàn bộ (PT/INR, aPTT, Fibrinogen, D-dimer loại trừ DIC)',
      'X-quang ngực thẳng và Siêu âm bụng tìm ổ nhiễm khuẩn'
    ],
    description: 'Tuân thủ Hour-1 Bundle của Surviving Sepsis Campaign (SSC) 2026: Cấy máu, đo Lactate và đánh giá suy tạng SOFA.'
  },
  {
    id: 'os_acute_coronary',
    name: 'Gói Hội Chứng Mạch Vành Cấp & Đau Ngực (ACS)',
    category: 'Tim mạch',
    icon: 'fa-solid fa-heart-pulse',
    indication: 'Đau ngực cấp nghi ngờ Nhồi máu cơ tim (STEMI / NSTEMI / UAP)',
    tests: [
      'Điện tâm đồ 12 chuyển đạo (làm ngay trong ≤ 10 phút đầu)',
      'High-sensitivity Troponin T hoặc I (hs-cTnT/I thời điểm 0h và 1h/2h)',
      'NT-proBNP định lượng (đánh giá suy tim kèm theo)',
      'Bilan Lipid máu toàn phần (Cholesterol toàn phần, Triglyceride, LDL-C, HDL-C)',
      'Sinh hóa máu: Glucose, Creatinine, eGFR, AST, ALT',
      'Điện giải đồ (K+, Mg2+ - phòng ngừa rối loạn nhịp tim)',
      'Siêu âm tim tại giường (POCUS/Echocardiography đánh giá rối loạn vận động vùng)'
    ],
    description: 'Theo phác đồ ESC 0/1h hoặc 0/2h để chẩn đoán xác định hoặc loại trừ nhồi máu cơ tim cấp.'
  },
  {
    id: 'os_heart_failure',
    name: 'Gói Đánh Giá & Theo Dõi Suy Tim (Heart Failure)',
    category: 'Tim mạch',
    icon: 'fa-solid fa-heart-crack',
    indication: 'Khó thở khi gắng sức, phù 2 chân, tĩnh mạch cổ nổi, nghi ngờ hoặc đợt cấp suy tim',
    tests: [
      'NT-proBNP hoặc BNP định lượng',
      'Điện giải đồ (Na+, K+, Cl-) theo dõi sát khi dùng lợi tiểu',
      'Chức năng thận (Creatinine, Urea, eGFR) đánh giá hội chứng tim thận',
      'Tổng phân tích tế bào máu ngoại vi (tìm thiếu máu là yếu tố thúc đẩy)',
      'Bilan sắt huyết thanh & Ferritin (tìm thiếu sắt ở bệnh nhân suy tim)',
      'Điện tâm đồ 12 chuyển đạo & X-quang ngực thẳng (tìm bóng tim to, sung huyết phổi)',
      'Siêu âm tim Doppler màu (đo phân suất tống máu LVEF)'
    ],
    description: 'Khảo sát toàn diện theo khuyến cáo ESC/AHA: Đánh giá phân suất tống máu, xung huyết và thiếu sắt.'
  },
  {
    id: 'os_pneumonia_respiratory',
    name: 'Gói Viêm Phổi & Suy Hô Hấp Cấp (CAP / COPD)',
    category: 'Hô hấp',
    icon: 'fa-solid fa-lungs',
    indication: 'Sốt, ho đàm, khó thở, ran ẩm/nổ phổi, SpO2 giảm',
    tests: [
      'X-quang ngực thẳng (CXR) hoặc CT Scanner lồng ngực độ phân giải cao',
      'Tổng phân tích tế bào máu ngoại vi (WBC, % Neutrophil, Eosinophil)',
      'Khí máu động mạch (ABG) đánh giá PaO2, PaCO2 và toan kiềm hô hấp',
      'hs-CRP định lượng & Procalcitonin (định hướng nhiễm trùng vi khuẩn)',
      'Soi tươi, nhuộm Gram và Cấy đàm làm kháng sinh đồ',
      'Creatinine, Urea, Điện giải đồ (tính thang điểm CURB-65 / PSI)'
    ],
    description: 'Chẩn đoán xác định viêm phổi, phân tầng mức độ nặng CURB-65 và quyết định vị trí điều trị (Nội trú / ICU).'
  },
  {
    id: 'os_ckd_renal',
    name: 'Gói Khảo Sát Bệnh Thận & Đái Tháo Đường (CKD / Diabetes)',
    category: 'Thận - Nội tiết',
    icon: 'fa-solid fa-kidneys',
    indication: 'Sàng lọc biến chứng thận ở bệnh nhân ĐTĐ, THA hoặc theo dõi Bệnh thận mạn',
    tests: [
      'Tỷ lệ Albumin/Creatinine niệu (UACR - Urine Albumin-to-Creatinine Ratio mẫu nước tiểu buổi sáng)',
      'Creatinine huyết thanh & Tính eGFR theo công thức CKD-EPI 2021',
      'Urea máu, Axit Uric huyết thanh',
      'HbA1c định lượng & Glucose máu đói',
      'Điện giải đồ (Na+, K+, Cl-, Canxi, Phosphat máu)',
      'Tổng phân tích nước tiểu 10 thông số (tìm Protein niệu, Hồng cầu niệu)',
      'Siêu âm hệ tiết niệu (kích thước thận, phân biệt vỏ tủy, sỏi thận)'
    ],
    description: 'Phân loại Bệnh thận mạn theo phân tầng CGA của KDIGO 2024 (Nguyên nhân, eGFR G1-G5, Albumin niệu A1-A3).'
  },
  {
    id: 'os_hepatitis_liver',
    name: 'Gói Khảo Sát Gan Mật & Xơ Gan (Liver Profile)',
    category: 'Tiêu hóa - Gan mật',
    icon: 'fa-solid fa-disease',
    indication: 'Vàng da, men gan tăng, nghi ngờ viêm gan B/C, xơ gan hoặc nghiện rượu',
    tests: [
      'Bilan men gan: AST, ALT, GGT, Phosphatase kiềm (ALP)',
      'Bilirubin toàn phần, Bilirubin trực tiếp và gián tiếp',
      'Protein toàn phần & Albumin huyết thanh (tính điểm Child-Pugh)',
      'Đông máu cơ bản (PT/INR, aPTT đánh giá chức năng tổng hợp gan)',
      'Huyết thanh học viêm gan: HBsAg, Anti-HCV',
      'Dấu ấn ung thư gan: Alpha-Fetoprotein (AFP)',
      'Siêu âm ổ bụng Doppler mạch máu gan & Đo độ đàn hồi mô gan (FibroScan)'
    ],
    description: 'Đánh giá toàn diện chức năng tổng hợp, hủy hoại tế bào gan, ứ mật và phân tầng xơ hóa FIB-4.'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. SMART LAB PARSER ENGINE (NHẬN DIỆN VĂN BẢN KẾT QUẢ DÁN NHANH)
// ─────────────────────────────────────────────────────────────────────────────

export class SmartLabParser {
  public static parseRawText(rawText: string): ParsedLabResult[] {
    if (!rawText || !rawText.trim()) return [];

    const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const results: ParsedLabResult[] = [];

    lines.forEach(line => {
      const parsed = this.parseSingleLine(line);
      if (parsed) {
        results.push(parsed);
      }
    });

    return results;
  }

  private static parseSingleLine(line: string): ParsedLabResult | null {
    // Regex tìm kiếm số thập phân hoặc nguyên trong dòng
    const numRegex = /[:=,\t\s]+([0-9]+(?:[\.,][0-9]+)?)/;
    const match = line.match(numRegex);
    if (!match) return null;

    const valStr = match[1].replace(',', '.');
    const value = parseFloat(valStr);
    if (isNaN(value)) return null;

    // Tìm tên xét nghiệm tương ứng
    const lowerLine = line.toLowerCase();
    let matchedTest: LabTestItem | undefined;

    for (const test of LAB_TESTS_DATABASE) {
      if (test.aliases.some(alias => lowerLine.includes(alias.toLowerCase()))) {
        matchedTest = test;
        break;
      }
    }

    if (!matchedTest) {
      // Dòng không match được với từ điển có sẵn
      return {
        rawLine: line,
        testName: line.split(/[:=,\t]/)[0].trim(),
        value: value,
        status: 'unknown',
        flagText: 'Chưa có khoảng chuẩn'
      };
    }

    // Đánh giá khoảng tham chiếu
    let status: ParsedLabResult['status'] = 'normal';
    let flagText = 'Bình thường';

    if (matchedTest.criticalHigh !== undefined && value >= matchedTest.criticalHigh) {
      status = 'critical_high';
      flagText = '🚨 NGUY KỊCH (RẤT CAO)';
    } else if (matchedTest.criticalLow !== undefined && value <= matchedTest.criticalLow) {
      status = 'critical_low';
      flagText = '🚨 NGUY KỊCH (RẤT THẤP)';
    } else if (matchedTest.maxNormal !== undefined && value > matchedTest.maxNormal) {
      status = 'high';
      flagText = '⬆ TĂNG CAO';
    } else if (matchedTest.minNormal !== undefined && value < matchedTest.minNormal) {
      status = 'low';
      flagText = '⬇ GIẢM THẤP';
    }

    return {
      rawLine: line,
      testId: matchedTest.id,
      testName: matchedTest.name,
      value: value,
      unit: matchedTest.unit,
      status: status,
      refRangeText: matchedTest.refRangeMale,
      flagText: flagText,
      significance: matchedTest.clinicalSignificance
    };
  }

  public static generateSummaryText(results: ParsedLabResult[]): string {
    if (!results.length) return '';

    const abnormal = results.filter(r => r.status !== 'normal' && r.status !== 'unknown');
    const critical = results.filter(r => r.status === 'critical_high' || r.status === 'critical_low');

    let text = `[KẾT QUẢ CẬN LÂM SÀNG TỔNG HỢP]:\n`;

    if (critical.length > 0) {
      text += `🚨 CỜ ĐỎ NGUY KỊCH CẦN XỬ TRÍ NGAY:\n`;
      critical.forEach(c => {
        text += `• ${c.testName}: ${c.value} ${c.unit || ''} (${c.flagText} - Chuẩn: ${c.refRangeText})\n`;
      });
      text += `\n`;
    }

    if (abnormal.length > 0) {
      text += `⚠️ CÁC CHỈ SỐ BẤT THƯỜNG:\n`;
      abnormal.forEach(a => {
        text += `• ${a.testName}: ${a.value} ${a.unit || ''} [${a.flagText}] (BT: ${a.refRangeText})\n`;
      });
      text += `\n`;
    }

    const normalCount = results.length - abnormal.length;
    text += `✓ Các chỉ số khác trong giới hạn bình thường (${normalCount} chỉ số).\n`;

    return text.trim();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. LAB DIAGNOSTICS HUB MAIN VIEW CONTROLLER (MODAL GIAO DIỆN)
// ─────────────────────────────────────────────────────────────────────────────

export class LabDiagnosticsHub {
  private modalEl: HTMLElement;
  private currentTab: 'parser' | 'ordersets' | 'dictionary' | 'imaging' = 'parser';
  private targetInputId: string = 'esClsQuickPaste';
  private onInsertCallback?: (text: string) => void;

  constructor() {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'modalLabDiagnosticsHub';
    this.modalEl.style.display = 'none';
    this.modalEl.style.position = 'fixed';
    this.modalEl.style.inset = '0';
    this.modalEl.style.zIndex = '1070';
    this.modalEl.style.background = 'rgba(15, 23, 42, 0.75)';
    this.modalEl.style.backdropFilter = 'blur(5px)';
    this.modalEl.style.alignItems = 'center';
    this.modalEl.style.justifyContent = 'center';
    this.modalEl.style.padding = '16px';
    document.body.appendChild(this.modalEl);

    this.modalEl.addEventListener('mousedown', (e) => {
      if (e.target === this.modalEl) this.close();
    });
  }

  public open(defaultTab: 'parser' | 'ordersets' | 'dictionary' | 'imaging' = 'parser', targetInputId: string = 'esClsQuickPaste', onInsertCallback?: (text: string) => void) {
    this.currentTab = defaultTab;
    this.targetInputId = targetInputId;
    this.onInsertCallback = onInsertCallback;

    this.renderLayout();
    this.modalEl.style.display = 'flex';
    this.bindEvents();
  }

  public close() {
    this.modalEl.style.display = 'none';
    this.modalEl.innerHTML = '';
  }

  private renderLayout() {
    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface, #fff); width:100%; max-width:1080px; max-height:92vh; border-radius:14px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.4); border: 1px solid var(--color-border);">
        
        <!-- Header Strip -->
        <div style="padding:14px 20px; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:36px; height:36px; border-radius:8px; background:linear-gradient(135deg, #0284c7, #0ea5e9); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.15rem; box-shadow:0 2px 6px rgba(2,132,199,0.3);">
              <i class="fa-solid fa-flask-vial"></i>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <h3 style="margin:0; font-size:16.5px; font-weight:800; color:var(--color-primary);">Kho Cận Lâm Sàng &amp; Smart Lab Parser</h3>
                <span style="background:rgba(2,132,199,0.12); color:var(--color-primary); font-size:11px; font-weight:700; padding:2px 8px; border-radius:10px;">Diagnostic CDSS</span>
              </div>
              <p style="margin:2px 0 0 0; font-size:12px; color:var(--color-text-muted);">Gói chỉ định CLS, Tra cứu giá trị tham chiếu, Bắt cờ đỏ xét nghiệm &amp; Checklist ECG/X-quang</p>
            </div>
          </div>
          <button id="btnCloseLabHub" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--color-text-muted); line-height:1;" title="Đóng">&times;</button>
        </div>

        <!-- Navigation Tabs -->
        <div style="display:flex; gap:6px; padding:8px 20px; background:var(--color-surface); border-bottom:1px solid var(--color-border); overflow-x:auto;">
          <button type="button" class="dsp-btn dsp-btn-sm js-lab-tab ${this.currentTab === 'parser' ? 'dsp-btn-primary active' : 'dsp-btn-ghost'}" data-tab="parser" style="font-size:12px; font-weight:700; border-radius:8px;">
            <i class="fa-solid fa-bolt" style="color:#f59e0b;"></i> Smart Lab Parser (Dán Nhanh &amp; Bắt Cờ Đỏ)
          </button>
          <button type="button" class="dsp-btn dsp-btn-sm js-lab-tab ${this.currentTab === 'ordersets' ? 'dsp-btn-primary active' : 'dsp-btn-ghost'}" data-tab="ordersets" style="font-size:12px; font-weight:700; border-radius:8px;">
            <i class="fa-solid fa-list-check" style="color:#0284c7;"></i> Gói Chỉ Định CLS (Order Sets)
          </button>
          <button type="button" class="dsp-btn dsp-btn-sm js-lab-tab ${this.currentTab === 'dictionary' ? 'dsp-btn-primary active' : 'dsp-btn-ghost'}" data-tab="dictionary" style="font-size:12px; font-weight:700; border-radius:8px;">
            <i class="fa-solid fa-book-medical" style="color:#10b981;"></i> Khoảng Tham Chiếu &amp; Biên Giải (60+ Chỉ số)
          </button>
          <button type="button" class="dsp-btn dsp-btn-sm js-lab-tab ${this.currentTab === 'imaging' ? 'dsp-btn-primary active' : 'dsp-btn-ghost'}" data-tab="imaging" style="font-size:12px; font-weight:700; border-radius:8px;">
            <i class="fa-solid fa-x-ray" style="color:#8b5cf6;"></i> Checklist Đọc ECG &amp; X-quang
          </button>
        </div>

        <!-- Content Body -->
        <div id="labHubContentBody" style="padding:18px 20px; overflow-y:auto; flex:1; background:var(--color-bg);">
          ${this.renderTabContent()}
        </div>

      </div>
    `;
  }

  private renderTabContent(): string {
    switch (this.currentTab) {
      case 'parser':
        return this.renderParserTab();
      case 'ordersets':
        return this.renderOrderSetsTab();
      case 'dictionary':
        return this.renderDictionaryTab();
      case 'imaging':
        return this.renderImagingTab();
      default:
        return '';
    }
  }

  // ─── TAB 1: SMART LAB PARSER ──────────────────────────────────────────────
  private renderParserTab(): string {
    return `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; height:100%;">
        <!-- Left: Input Raw Text -->
        <div style="display:flex; flex-direction:column; gap:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <label style="font-size:13px; font-weight:700; color:var(--color-text);"><i class="fa-solid fa-paste" style="color:var(--color-primary);"></i> Dán văn bản kết quả xét nghiệm thô:</label>
            <button type="button" id="btnLabSampleData" class="dsp-btn dsp-btn-ghost dsp-btn-sm" style="font-size:11px; color:var(--color-primary);">
              <i class="fa-solid fa-magic"></i> Thử dữ liệu mẫu Sepsis / ACS
            </button>
          </div>
          
          <textarea id="txtLabRawInput" rows="12" class="dsp-input" placeholder="Copy &amp; Paste kết quả xét nghiệm từ bệnh viện hoặc máy xét nghiệm vào đây...
Ví dụ:
WBC: 16.5
Neu%: 84.2
Hb: 8.5
PLT: 95
Glucose: 14.2
Creatinine: 210
K+: 6.2
Troponin T: 85
Lactate: 4.5
PCT: 3.8" style="font-family:monospace; font-size:12.5px; line-height:1.5; resize:none; flex:1; padding:12px; border:1.5px solid var(--color-border); border-radius:8px;"></textarea>

          <div style="display:flex; gap:8px;">
            <button type="button" id="btnDoParseLab" class="dsp-btn dsp-btn-primary" style="flex:1; font-weight:800; padding:10px; font-size:13px;">
              <i class="fa-solid fa-microchip"></i> Phân Tích &amp; Bắt Cờ Đỏ Lâm Sàng
            </button>
            <button type="button" id="btnClearLabInput" class="dsp-btn dsp-btn-outline" style="padding:10px;">
              <i class="fa-solid fa-trash"></i> Xóa
            </button>
          </div>
        </div>

        <!-- Right: Parsed Results & Action -->
        <div style="display:flex; flex-direction:column; gap:10px; background:var(--color-surface); padding:14px; border-radius:10px; border:1px solid var(--color-border); overflow:hidden;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--color-border); padding-bottom:8px;">
            <h4 style="margin:0; font-size:13.5px; font-weight:800; color:var(--color-text);">
              <i class="fa-solid fa-square-poll-vertical" style="color:#10b981;"></i> Báo Cáo Phân Tích &amp; Cảnh Báo
            </h4>
            <span id="labParsedCountBadge" style="font-size:11px; color:var(--color-text-muted);">Chưa phân tích</span>
          </div>

          <div id="labParsedOutputArea" style="flex:1; overflow-y:auto; font-size:12.5px; display:flex; flex-direction:column; gap:8px;">
            <div style="text-align:center; padding:40px 20px; color:var(--color-text-muted);">
              <i class="fa-solid fa-clipboard-check" style="font-size:32px; margin-bottom:8px; opacity:0.6;"></i>
              <div>Dán kết quả xét nghiệm bên trái và bấm <strong>"Phân Tích"</strong> để tự động nhận diện chỉ số tăng/giảm và cờ đỏ nguy kịch.</div>
            </div>
          </div>

          <div id="labActionButtonsBar" style="display:none; gap:8px; border-top:1px solid var(--color-border); padding-top:10px;">
            <button type="button" id="btnInsertLabToO" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="flex:1; font-weight:700;">
              <i class="fa-solid fa-stethoscope"></i> + Chèn vào ô Thăm khám (O)
            </button>
            <button type="button" id="btnInsertLabToA" class="dsp-btn dsp-btn-outline dsp-btn-sm" style="flex:1; font-weight:700;">
              <i class="fa-solid fa-brain"></i> + Chèn vào Đánh giá (A)
            </button>
            <button type="button" id="btnCopyLabSummary" class="dsp-btn dsp-btn-ghost dsp-btn-sm" style="border:1px solid var(--color-border);">
              <i class="fa-solid fa-copy"></i> Copy
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ─── TAB 2: ORDER SETS (GÓI CHỈ ĐỊNH CLS) ──────────────────────────────────
  private renderOrderSetsTab(): string {
    return `
      <div>
        <div style="margin-bottom:14px; font-size:13px; color:var(--color-text); background:rgba(2,132,199,0.08); border-left:4px solid var(--color-primary); padding:10px 14px; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
          <div><i class="fa-solid fa-wand-magic-sparkles" style="color:var(--color-primary); margin-right:6px;"></i> <strong>Gói Chỉ Định Xét Nghiệm Chuẩn:</strong> Chọn gói phù hợp để 1-click chèn vào ô Chỉ định CLS trong SOAP.</div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:14px;">
          ${LAB_ORDER_SETS.map(set => `
            <div class="dsp-card" style="border:1px solid var(--color-border); background:var(--color-surface); border-radius:10px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; gap:10px;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="width:30px; height:30px; border-radius:6px; background:rgba(2,132,199,0.12); color:var(--color-primary); display:flex; align-items:center; justify-content:center; font-size:14px;">
                      <i class="${set.icon}"></i>
                    </span>
                    <div>
                      <h4 style="margin:0; font-size:14.5px; font-weight:800; color:var(--color-primary);">${escapeHtml(set.name)}</h4>
                      <span style="font-size:10.5px; color:var(--color-text-muted); font-weight:600; text-transform:uppercase;">${escapeHtml(set.category)}</span>
                    </div>
                  </div>
                </div>
                
                <p style="font-size:12px; color:var(--color-text-muted); margin:0 0 8px 0; font-style:italic;">
                  ${escapeHtml(set.indication)}
                </p>

                <div style="background:var(--color-bg); padding:8px 10px; border-radius:6px; font-size:11.5px; line-height:1.45; border:1px solid var(--color-border); max-height:120px; overflow-y:auto;">
                  <strong>Danh mục chỉ định (${set.tests.length} xét nghiệm):</strong>
                  <ul style="margin:4px 0 0 0; padding-left:18px; color:var(--color-text);">
                    ${set.tests.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <button type="button" class="dsp-btn dsp-btn-primary dsp-btn-sm js-btn-apply-orderset" data-set-id="${set.id}" style="width:100%; font-weight:700; justify-content:center; padding:6px 0;">
                <i class="fa-solid fa-plus"></i> Áp dụng Gói vào Chỉ định CLS
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ─── TAB 3: DICTIONARY (KHOẢNG THAM CHIẾU & BIÊN GIẢI) ───────────────────
  private renderDictionaryTab(): string {
    return `
      <div>
        <div style="display:flex; gap:10px; margin-bottom:14px; align-items:center;">
          <div style="position:relative; flex:1;">
            <i class="fa-solid fa-magnifying-glass" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--color-text-muted); font-size:13px;"></i>
            <input type="text" id="txtLabDictSearch" class="dsp-input" placeholder="Tìm xét nghiệm theo tên, từ viết tắt (VD: Troponin, WBC, Hb, Creatinine, K+, ALT...)" style="padding-left:34px; font-size:13px;" />
          </div>
          <select id="selLabCategoryFilter" class="dsp-input" style="width:180px; font-size:12.5px;">
            <option value="all">Tất cả chuyên khoa</option>
            <option value="hematology">Huyết học</option>
            <option value="biochemistry">Sinh hóa</option>
            <option value="coagulation">Đông máu</option>
            <option value="electrolytes">Điện giải</option>
            <option value="cardiac">Men tim & Dấu ấn</option>
            <option value="abg">Khí máu & Hồi sức</option>
          </select>
        </div>

        <div id="labDictListContainer" style="display:flex; flex-direction:column; gap:10px;">
          ${this.renderDictionaryItems(LAB_TESTS_DATABASE)}
        </div>
      </div>
    `;
  }

  private renderDictionaryItems(tests: LabTestItem[]): string {
    if (!tests.length) {
      return `<div style="text-align:center; padding:30px; color:var(--color-text-muted);">Không tìm thấy xét nghiệm phù hợp.</div>`;
    }

    return tests.map(t => `
      <div class="dsp-card" style="border:1px solid var(--color-border); background:var(--color-surface); border-radius:8px; padding:12px 16px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px; gap:8px; flex-wrap:wrap;">
          <div>
            <span style="font-size:10.5px; font-weight:800; color:var(--color-primary); background:rgba(2,132,199,0.1); padding:2px 6px; border-radius:4px; margin-right:6px;">
              ${escapeHtml(t.categoryName)}
            </span>
            <strong style="font-size:14px; color:var(--color-text);">${escapeHtml(t.name)}</strong>
          </div>
          <div style="background:var(--color-bg); border:1px solid var(--color-border); padding:2px 8px; border-radius:6px; font-size:12px; font-weight:700; color:var(--color-primary);">
            Khoảng chuẩn: ${escapeHtml(t.refRangeMale)} ${escapeHtml(t.unit)}
          </div>
        </div>

        <p style="font-size:12.5px; color:var(--color-text); margin:4px 0 6px 0; line-height:1.45;">
          ${escapeHtml(t.clinicalSignificance)}
        </p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:11.5px; background:var(--color-bg); padding:8px 10px; border-radius:6px; border:1px solid var(--color-border);">
          <div>
            <strong style="color:#dc2626;"><i class="fa-solid fa-arrow-trend-up"></i> Nguyên nhân TĂNG:</strong>
            <ul style="margin:2px 0 0 0; padding-left:16px; color:var(--color-text-muted);">
              ${(t.highCauses || []).map(c => `<li>${escapeHtml(c)}</li>`).join('')}
            </ul>
          </div>
          <div>
            <strong style="color:#2563eb;"><i class="fa-solid fa-arrow-trend-down"></i> Nguyên nhân GIẢM:</strong>
            <ul style="margin:2px 0 0 0; padding-left:16px; color:var(--color-text-muted);">
              ${(t.lowCauses || []).map(c => `<li>${escapeHtml(c)}</li>`).join('')}
            </ul>
          </div>
        </div>

        ${t.pearls ? `
          <div style="font-size:11.5px; color:#047857; background:#ecfdf5; padding:6px 10px; border-radius:6px; margin-top:6px; border-left:3px solid #10b981;">
            <strong><i class="fa-solid fa-lightbulb"></i> Clinical Pearl:</strong> ${escapeHtml(t.pearls)}
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  // ─── TAB 4: IMAGING & ECG CHECKLIST ───────────────────────────────────────
  private renderImagingTab(): string {
    return `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <!-- ECG Checklist -->
        <div class="dsp-card" style="border:1px solid var(--color-border); background:var(--color-surface); border-radius:10px; padding:16px;">
          <div style="display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--color-border); padding-bottom:10px; margin-bottom:12px;">
            <span style="width:32px; height:32px; border-radius:6px; background:rgba(220,38,38,0.12); color:#dc2626; display:flex; align-items:center; justify-content:center; font-size:15px;">
              <i class="fa-solid fa-heart-pulse"></i>
            </span>
            <div>
              <h4 style="margin:0; font-size:15px; font-weight:800; color:var(--color-text);">Checklist 7 Bước Đọc ECG 12 Chuyển Đạo</h4>
              <span style="font-size:11px; color:var(--color-text-muted);">Tiêu chuẩn AHA/ESC</span>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px; font-size:12.5px; line-height:1.45;">
            <div style="background:var(--color-bg); padding:8px 10px; border-radius:6px; border-left:3px solid #dc2626;">
              <strong>1. Tần số tim &amp; Nhịp:</strong> Đều hay không? Tần số = 300 / số ô lớn (hoặc 1500 / số ô nhỏ). Nhịp xoang: Sóng P (+) ở I, II, aVF; (-) ở aVR.
            </div>
            <div style="background:var(--color-bg); padding:8px 10px; border-radius:6px; border-left:3px solid #ea580c;">
              <strong>2. Trục điện tim:</strong> Dựa vào D1 và aVF (Trục trung gian: D1(+), aVF(+); Trục trái: D1(+), aVF(-); Trục phải: D1(-), aVF(+)).
            </div>
            <div style="background:var(--color-bg); padding:8px 10px; border-radius:6px; border-left:3px solid #f59e0b;">
              <strong>3. Sóng P &amp; Khoảng PR:</strong> Sóng P < 2.5mm, rộng < 0.12s. PR bình thường 0.12 - 0.20s (PR dài: Block AV độ 1; PR ngắn: WPW).
            </div>
            <div style="background:var(--color-bg); padding:8px 10px; border-radius:6px; border-left:3px solid #10b981;">
              <strong>4. Phức bộ QRS:</strong> Hẹp < 0.12s hay Rộng ≥ 0.12s (Block nhánh LBBB/RBBB). Tiêu chuẩn dày thất trái (Sokolow-Lyon: S V1 + R V5/V6 > 35mm).
            </div>
            <div style="background:var(--color-bg); padding:8px 10px; border-radius:6px; border-left:3px solid #0284c7;">
              <strong>5. Đoạn ST &amp; Sóng T:</strong> ST chênh lên/xuống (Dấu hiệu STEMI/NSTEMI)? Sóng T âm, T nhọn đối xứng?
            </div>
            <div style="background:var(--color-bg); padding:8px 10px; border-radius:6px; border-left:3px solid #6366f1;">
              <strong>6. Khoảng QTc:</strong> QTc = QT / căn bậc 2 của RR. QTc dài > 450ms (Nam), > 460ms (Nữ) ➔ Nguy cơ Xoắn đỉnh (Torsades de Pointes).
            </div>
            <div style="background:var(--color-bg); padding:8px 10px; border-radius:6px; border-left:3px solid #8b5cf6;">
              <strong>7. Sóng Q bệnh lý:</strong> Sâu > 25% biên độ R và rộng ≥ 0.04s ➔ Hoại tử sẹo cơ tim cũ.
            </div>
          </div>
        </div>

        <!-- CXR Checklist -->
        <div class="dsp-card" style="border:1px solid var(--color-border); background:var(--color-surface); border-radius:10px; padding:16px;">
          <div style="display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--color-border); padding-bottom:10px; margin-bottom:12px;">
            <span style="width:32px; height:32px; border-radius:6px; background:rgba(139,92,246,0.12); color:#8b5cf6; display:flex; align-items:center; justify-content:center; font-size:15px;">
              <i class="fa-solid fa-x-ray"></i>
            </span>
            <div>
              <h4 style="margin:0; font-size:15px; font-weight:800; color:var(--color-text);">Checklist A-B-C-D-E Đọc X-quang Ngực Thẳng</h4>
              <span style="font-size:11px; color:var(--color-text-muted);">Quy chuẩn Chẩn đoán hình ảnh</span>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px; font-size:12.5px; line-height:1.45;">
            <div style="background:var(--color-bg); padding:8px 10px; border-radius:6px; border-left:3px solid #0284c7;">
              <strong>A - Airway (Đường thở):</strong> Khí quản có nằm ở đường giữa hay bị kéo lệch/đẩy lệch? Phế quản gốc 2 bên có thông thoáng?
            </div>
            <div style="background:var(--color-bg); padding:8px 10px; border-radius:6px; border-left:3px solid #10b981;">
              <strong>B - Breathing / Lung Fields (Nhu mô phổi):</strong> Có tổn thương đông đặc, thâm nhiễm phế nang, hình mờ mô kẽ, nốt hay hang? Có tràn khí màng phổi (mất vân phổi vùng ngoại vi)?
            </div>
            <div style="background:var(--color-bg); padding:8px 10px; border-radius:6px; border-left:3px solid #dc2626;">
              <strong>C - Cardiac &amp; Mediastinum (Tim &amp; Trung thất):</strong> Chỉ số Tim/Lồng ngực (CTR) > 0.50 (Bóng tim to)? Bờ tim có sắc nét (Dấu hiệu Silhouette)? Trung thất có dãn rộng (nghi ngờ bóc tách ĐMC)?
            </div>
            <div style="background:var(--color-bg); padding:8px 10px; border-radius:6px; border-left:3px solid #f59e0b;">
              <strong>D - Diaphragm &amp; Angles (Cơ hoành &amp; Góc sườn hoành):</strong> Góc sườn hoành có nhọn hay bị tù/mất góc (Tràn dịch màng phổi)? Có liềm hơi dưới hoành (Thủng tạng rỗng)?
            </div>
            <div style="background:var(--color-bg); padding:8px 10px; border-radius:6px; border-left:3px solid #8b5cf6;">
              <strong>E - Everything Else (Xương &amp; Mô mềm):</strong> Gãy xương sườn/xương đòn? Tràn khí dưới da? Ống nội khí quản, Catheter tĩnh mạch trung tâm (CVC), ống dẫn lưu có đúng vị trí?
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private bindEvents() {
    // Tab switching
    this.modalEl.querySelectorAll('.js-lab-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentTab = btn.getAttribute('data-tab') as any;
        this.renderLayout();
        this.bindEvents();
      });
    });

    document.getElementById('btnCloseLabHub')?.addEventListener('click', () => this.close());

    // ─── TAB 1: PARSER ACTIONS ──────────────────────────────────────────────
    if (this.currentTab === 'parser') {
      const txtInput = document.getElementById('txtLabRawInput') as HTMLTextAreaElement;
      const btnSample = document.getElementById('btnLabSampleData');
      const btnParse = document.getElementById('btnDoParseLab');
      const btnClear = document.getElementById('btnClearLabInput');
      const outputArea = document.getElementById('labParsedOutputArea');
      const actionBars = document.getElementById('labActionButtonsBar');
      const badgeCount = document.getElementById('labParsedCountBadge');

      let currentParsedResults: ParsedLabResult[] = [];

      btnSample?.addEventListener('click', () => {
        if (txtInput) {
          txtInput.value = `WBC: 18.5 G/L
Neu%: 88.5 %
Hb: 9.2 g/dL
Hct: 28.5 %
PLT: 85 G/L
Glucose: 16.8 mmol/L
Creatinine: 245 umol/L
Urea: 18.5 mmol/L
Na+: 132 mmol/L
K+: 6.3 mmol/L
hs-cTnT: 95 ng/L
Lactate: 4.8 mmol/L
Procalcitonin: 6.5 ng/mL`;
        }
      });

      btnClear?.addEventListener('click', () => {
        if (txtInput) txtInput.value = '';
        if (outputArea) {
          outputArea.innerHTML = `
            <div style="text-align:center; padding:40px 20px; color:var(--color-text-muted);">
              <i class="fa-solid fa-clipboard-check" style="font-size:32px; margin-bottom:8px; opacity:0.6;"></i>
              <div>Dán kết quả xét nghiệm bên trái và bấm <strong>"Phân Tích"</strong>.</div>
            </div>
          `;
        }
        if (actionBars) actionBars.style.display = 'none';
        if (badgeCount) badgeCount.textContent = 'Chưa phân tích';
      });

      btnParse?.addEventListener('click', () => {
        const text = txtInput?.value || '';
        if (!text.trim()) {
          alert('Vui lòng dán kết quả xét nghiệm vào ô nhập.');
          return;
        }

        currentParsedResults = SmartLabParser.parseRawText(text);
        if (!currentParsedResults.length) {
          if (outputArea) outputArea.innerHTML = `<div style="color:var(--color-danger); padding:20px; text-align:center;">Không thể trích xuất được chỉ số số học nào từ văn bản.</div>`;
          return;
        }

        if (badgeCount) badgeCount.textContent = `Đã phân tích ${currentParsedResults.length} chỉ số`;
        if (actionBars) actionBars.style.display = 'flex';

        // Render card results
        if (outputArea) {
          outputArea.innerHTML = currentParsedResults.map(r => {
            let bg = 'var(--color-bg)';
            let borderColor = 'var(--color-border)';
            let textColor = 'var(--color-text)';
            let badgeBg = 'rgba(100,116,139,0.12)';
            let badgeColor = '#64748b';

            if (r.status === 'critical_high' || r.status === 'critical_low') {
              bg = '#fef2f2';
              borderColor = '#ef4444';
              textColor = '#991b1b';
              badgeBg = '#fee2e2';
              badgeColor = '#dc2626';
            } else if (r.status === 'high') {
              bg = '#fffbeb';
              borderColor = '#f59e0b';
              textColor = '#92400e';
              badgeBg = '#fef3c7';
              badgeColor = '#d97706';
            } else if (r.status === 'low') {
              bg = '#eff6ff';
              borderColor = '#3b82f6';
              textColor = '#1e40af';
              badgeBg = '#dbeafe';
              badgeColor = '#2563eb';
            } else if (r.status === 'normal') {
              bg = '#f0fdf4';
              borderColor = '#10b981';
              textColor = '#065f46';
              badgeBg = '#dcfce7';
              badgeColor = '#16a34a';
            }

            return `
              <div style="background:${bg}; border:1px solid ${borderColor}; border-radius:6px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <strong style="color:${textColor}; font-size:13px;">${escapeHtml(r.testName)}</strong>
                  <div style="font-size:11px; color:var(--color-text-muted);">
                    Khoảng chuẩn: ${escapeHtml(r.refRangeText || 'N/A')}
                  </div>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:14px; font-weight:800; color:${textColor};">
                    ${r.value} <span style="font-size:11px; font-weight:normal;">${escapeHtml(r.unit || '')}</span>
                  </div>
                  <span style="background:${badgeBg}; color:${badgeColor}; font-size:10.5px; font-weight:800; padding:1px 6px; border-radius:4px;">
                    ${r.flagText}
                  </span>
                </div>
              </div>
            `;
          }).join('');
        }
      });

      // Chèn kết quả vào SOAP
      const handleInsert = (targetField: string) => {
        const summary = SmartLabParser.generateSummaryText(currentParsedResults);
        if (!summary) return;

        if (this.onInsertCallback) {
          this.onInsertCallback(summary);
          this.close();
          return;
        }

        const targetEl = document.getElementById(targetField) as HTMLTextAreaElement;
        if (targetEl) {
          const current = targetEl.value.trim();
          targetEl.value = current ? `${current}\n\n${summary}` : summary;
          targetEl.focus();
          alert('✅ Đã chèn báo cáo phân tích cận lâm sàng vào bệnh án thành công!');
          this.close();
        } else {
          navigator.clipboard.writeText(summary).then(() => {
            alert('✅ Đã sao chép báo cáo cận lâm sàng vào Clipboard!');
            this.close();
          });
        }
      };

      document.getElementById('btnInsertLabToO')?.addEventListener('click', () => handleInsert('esONotes'));
      document.getElementById('btnInsertLabToA')?.addEventListener('click', () => handleInsert('esAAssessment'));
      document.getElementById('btnCopyLabSummary')?.addEventListener('click', () => {
        const summary = SmartLabParser.generateSummaryText(currentParsedResults);
        if (summary) {
          navigator.clipboard.writeText(summary).then(() => alert('✅ Đã sao chép tóm tắt vào Clipboard!'));
        }
      });
    }

    // ─── TAB 2: ORDER SETS ACTIONS ──────────────────────────────────────────
    if (this.currentTab === 'ordersets') {
      this.modalEl.querySelectorAll('.js-btn-apply-orderset').forEach(btn => {
        btn.addEventListener('click', () => {
          const setId = btn.getAttribute('data-set-id');
          const set = LAB_ORDER_SETS.find(s => s.id === setId);
          if (!set) return;

          const textToAdd = set.tests.join('\n');
          const ordersTextarea = document.getElementById('esClsOrders') as HTMLTextAreaElement;

          if (ordersTextarea) {
            const current = ordersTextarea.value.trim();
            ordersTextarea.value = current ? `${current}\n${textToAdd}` : textToAdd;
            alert(`✅ Đã thêm ${set.tests.length} chỉ định xét nghiệm từ gói "${set.name}" vào Bệnh án SOAP!`);
            this.close();
          } else {
            navigator.clipboard.writeText(textToAdd).then(() => {
              alert(`✅ Đã sao chép danh sách chỉ định gói "${set.name}" vào Clipboard!`);
              this.close();
            });
          }
        });
      });
    }

    // ─── TAB 3: DICTIONARY SEARCH ───────────────────────────────────────────
    if (this.currentTab === 'dictionary') {
      const searchInput = document.getElementById('txtLabDictSearch') as HTMLInputElement;
      const categorySelect = document.getElementById('selLabCategoryFilter') as HTMLSelectElement;
      const listContainer = document.getElementById('labDictListContainer');

      const filterList = () => {
        const q = (searchInput?.value || '').toLowerCase().trim();
        const cat = categorySelect?.value || 'all';

        const filtered = LAB_TESTS_DATABASE.filter(t => {
          const matchCat = cat === 'all' || t.category === cat;
          const matchQuery = !q || t.name.toLowerCase().includes(q) || t.aliases.some(a => a.toLowerCase().includes(q)) || t.clinicalSignificance.toLowerCase().includes(q);
          return matchCat && matchQuery;
        });

        if (listContainer) {
          listContainer.innerHTML = this.renderDictionaryItems(filtered);
        }
      };

      searchInput?.addEventListener('input', filterList);
      categorySelect?.addEventListener('change', filterList);
    }
  }
}

export const labDiagnosticsHub = new LabDiagnosticsHub();
