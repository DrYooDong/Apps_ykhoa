/**
 * Medical Abbreviations Dictionary & Helper Utilities for DocSpace
 * Chuẩn hóa các thuật ngữ viết tắt Y khoa lâm sàng (chuẩn BV Chợ Rẫy, ĐHYD TP.HCM, Bạch Mai)
 */

export interface AbbrDefinition {
  abbr: string;
  full: string;
  category: 'clinical' | 'exam' | 'lab' | 'diagnosis' | 'management';
  description?: string;
}

export const MEDICAL_ABBREVIATIONS: AbbrDefinition[] = [
  // 1. Thuật ngữ hành chính & đại cương
  { abbr: 'BN', full: 'Bệnh nhân', category: 'clinical', description: 'Người bệnh' },
  { abbr: 'LS', full: 'Lâm sàng', category: 'clinical', description: 'Khám và diễn biến trực tiếp trên người bệnh' },
  { abbr: 'CLS', full: 'Cận lâm sàng', category: 'lab', description: 'Xét nghiệm và chẩn đoán hình ảnh' },
  { abbr: 'HC', full: 'Hội chứng', category: 'clinical', description: 'Tập hợp các triệu chứng cùng cơ chế' },
  { abbr: 'TC', full: 'Triệu chứng', category: 'clinical', description: 'Dấu hiệu cơ năng hoặc thực thể' },
  { abbr: 'TCCN', full: 'Triệu chứng cơ năng', category: 'clinical', description: 'Triệu chứng do người bệnh cảm nhận' },
  { abbr: 'TCTT', full: 'Triệu chứng thực thể', category: 'exam', description: 'Dấu hiệu phát hiện qua thăm khám' },
  { abbr: 'DHST', full: 'Dấu hiệu sinh tồn', category: 'exam', description: 'Sinh hiệu (M, HA, T°C, NT, SpO₂)' },
  { abbr: 'BS', full: 'Bệnh sử', category: 'clinical', description: 'Quá trình diễn biến bệnh' },
  { abbr: 'LDNV', full: 'Lý do nhập viện', category: 'clinical', description: 'Lý do chính khiến người bệnh vào viện' },
  { abbr: 'LDVV', full: 'Lý do vào viện', category: 'clinical', description: 'Lý do vào viện' },
  { abbr: 'TKLS', full: 'Thăm khám lâm sàng', category: 'exam', description: 'Khám thực thể tại giường' },
  { abbr: 'KLS', full: 'Khám lâm sàng', category: 'exam', description: 'Khám lâm sàng' },
  { abbr: 'BA', full: 'Bệnh án', category: 'clinical', description: 'Hồ sơ bệnh án' },
  { abbr: 'EMR', full: 'Bệnh án điện tử', category: 'clinical', description: 'Electronic Medical Record' },

  // 2. Dấu hiệu sinh tồn
  { abbr: 'HA', full: 'Huyết áp', category: 'exam', description: 'Huyết áp động mạch (mmHg)' },
  { abbr: 'HATT', full: 'Huyết áp tâm thu', category: 'exam', description: 'Huyết áp tối đa' },
  { abbr: 'HATTr', full: 'Huyết áp tâm trương', category: 'exam', description: 'Huyết áp tối thiểu' },
  { abbr: 'T°C', full: 'Nhiệt độ', category: 'exam', description: 'Thân nhiệt (°C)' },
  { abbr: 'M', full: 'Mạch', category: 'exam', description: 'Tần số mạch (lần/phút)' },
  { abbr: 'NT', full: 'Nhịp thở', category: 'exam', description: 'Tần số thở (lần/phút)' },
  { abbr: 'SpO₂', full: 'Độ bão hòa oxy máu ngoại vi', category: 'exam', description: 'Độ bão hòa oxy mao mạch (%)' },

  // 3. Huyết học & Cận lâm sàng phổ biến
  { abbr: 'TPTTBM', full: 'Tổng phân tích tế bào máu', category: 'lab', description: 'Công thức máu ngoại vi (CBC)' },
  { abbr: 'WBC', full: 'Bạch cầu', category: 'lab', description: 'White Blood Cells (G/L)' },
  { abbr: 'NEU', full: 'Bạch cầu đa nhân trung tính', category: 'lab', description: 'Neutrophil (%)' },
  { abbr: 'LYM', full: 'Bạch cầu lympho', category: 'lab', description: 'Lymphocyte (%)' },
  { abbr: 'PLT', full: 'Tiểu cầu', category: 'lab', description: 'Platelets (G/L)' },
  { abbr: 'RBC', full: 'Hồng cầu', category: 'lab', description: 'Red Blood Cells (T/L)' },
  { abbr: 'Hct', full: 'Hematocrit', category: 'lab', description: 'Thể tích khối hồng cầu (%)' },
  { abbr: 'Hb', full: 'Hemoglobin', category: 'lab', description: 'Huyết sắc tố (g/dL)' },
  { abbr: 'KMĐM', full: 'Khí máu động mạch', category: 'lab', description: 'Arterial Blood Gas (pH, PaO2, PaCO2, HCO3-)' },
  { abbr: 'ECG', full: 'Điện tâm đồ', category: 'lab', description: 'Electrocardiogram (ĐTĐ)' },
  { abbr: 'ĐTĐ', full: 'Điện tâm đồ', category: 'lab', description: 'Điện tâm đồ' },
  { abbr: 'XQ', full: 'X-quang', category: 'lab', description: 'X-quang chẩn đoán' },
  { abbr: 'SA', full: 'Siêu âm', category: 'lab', description: 'Siêu âm y khoa (Ultrasound)' },
  { abbr: 'CT', full: 'Cắt lớp vi tính', category: 'lab', description: 'CT-scanner' },
  { abbr: 'MRI', full: 'Cộng hưởng từ', category: 'lab', description: 'Magnetic Resonance Imaging' },
  { abbr: 'NS', full: 'Nội soi', category: 'lab', description: 'Nội soi đường tiêu hóa / hô hấp' },
  { abbr: 'DNT', full: 'Dịch não tủy', category: 'lab', description: 'Cerebrospinal Fluid (CSF)' },
  { abbr: 'TPTNT', full: 'Tổng phân tích nước tiểu', category: 'lab', description: 'Xét nghiệm 10 thông số nước tiểu' },

  // 4. Chẩn đoán & Quản lý
  { abbr: 'CĐ', full: 'Chẩn đoán', category: 'diagnosis', description: 'Xác định bệnh lý' },
  { abbr: 'CĐSB', full: 'Chẩn đoán sơ bộ', category: 'diagnosis', description: 'Chẩn đoán nghĩ nhiều nhất ban đầu' },
  { abbr: 'CĐPB', full: 'Chẩn đoán phân biệt', category: 'diagnosis', description: 'Các bệnh lý có biểu hiện tương tự' },
  { abbr: 'CĐXĐ', full: 'Chẩn đoán xác định', category: 'diagnosis', description: 'Chẩn đoán sau cùng có bằng chứng CLS' },
  { abbr: 'ĐT', full: 'Điều trị', category: 'management', description: 'Kế hoạch và phác đồ điều trị' },
  { abbr: 'XT', full: 'Xử trí', category: 'management', description: 'Các bước xử trí cấp cứu / hồi sức' },
  { abbr: 'DHCB', full: 'Dấu hiệu cảnh báo', category: 'clinical', description: 'Dấu hiệu cảnh báo diễn tiến nặng' },

  // 5. Bệnh lý mạn tính & Thường gặp
  { abbr: 'SXHD', full: 'Sốt xuất huyết Dengue', category: 'diagnosis', description: 'Sốt xuất huyết do vi rút Dengue' },
  { abbr: 'SXH', full: 'Sốt xuất huyết', category: 'diagnosis', description: 'Sốt xuất huyết' },
  { abbr: 'THA', full: 'Tăng huyết áp', category: 'diagnosis', description: 'Tăng huyết áp động mạch' },
  { abbr: 'ĐTĐ', full: 'Đái tháo đường', category: 'diagnosis', description: 'Tiểu đường (Type 1, Type 2)' },
  { abbr: 'COPD', full: 'Bệnh phổi tắc nghẽn mạn tính', category: 'diagnosis', description: 'Chronic Obstructive Pulmonary Disease' },
  { abbr: 'NMCT', full: 'Nhồi máu cơ tim', category: 'diagnosis', description: 'Myocardial Infarction' },
  { abbr: 'ST', full: 'Suy tim', category: 'diagnosis', description: 'Suy giảm chức năng bơm máu của tim' },
  { abbr: 'ĐQ', full: 'Đột quỵ', category: 'diagnosis', description: 'Tai biến mạch máu não (nhồi máu / xuất huyết)' },
];

/** Map từ thuật ngữ đầy đủ sang từ viết tắt */
export const FULL_TO_ABBR_MAP: Record<string, string> = {
  'tổng phân tích tế bào máu': 'TPTTBM',
  'khí máu động mạch': 'KMĐM',
  'bạch cầu đa nhân trung tính': 'NEU',
  'bạch cầu đa nhân': 'NEU',
  'bạch cầu': 'WBC',
  'tiểu cầu': 'PLT',
  'hồng cầu': 'RBC',
  'bệnh nhân': 'BN',
  'lâm sàng': 'LS',
  'cận lâm sàng': 'CLS',
  'hội chứng': 'HC',
  'triệu chứng cơ năng': 'TCCN',
  'triệu chứng thực thể': 'TCTT',
  'dấu hiệu sinh tồn': 'DHST',
  'sinh hiệu': 'DHST',
  'huyết áp': 'HA',
  'nhiệt độ': 'T°C',
  'nhịp thở': 'NT',
  'mạch': 'M',
  'siêu âm': 'SA',
  'x-quang': 'XQ',
  'điện tâm đồ': 'ECG',
  'chẩn đoán sơ bộ': 'CĐSB',
  'chẩn đoán phân biệt': 'CĐPB',
  'chẩn đoán xác định': 'CĐXĐ',
  'chẩn đoán': 'CĐ',
  'tiền căn': 'TC',
  'tiền sử': 'TC',
  'lý do nhập viện': 'LDNV',
  'lý do vào viện': 'LDVV',
  'bệnh sử': 'BS',
  'điều trị': 'ĐT',
  'xử trí': 'XT',
  'dấu hiệu cảnh báo': 'DHCB',
  'sốt xuất huyết dengue': 'SXHD',
  'tăng huyết áp': 'THA',
  'đái tháo đường': 'ĐTĐ',
  'dịch não tủy': 'DNT',
  'tổng phân tích nước tiểu': 'TPTNT',
  'thăm khám lâm sàng': 'TKLS',
  'khám lâm sàng': 'KLS',
  'bệnh án': 'BA',
};

/** Map từ viết tắt sang giải nghĩa đầy đủ */
export const ABBR_TO_FULL_MAP: Record<string, string> = {};
MEDICAL_ABBREVIATIONS.forEach((item) => {
  if (!ABBR_TO_FULL_MAP[item.abbr]) {
    ABBR_TO_FULL_MAP[item.abbr] = item.full;
  }
});

/**
 * Chuyển văn bản y khoa sang văn bản chuẩn viết tắt bệnh viện
 * @param text Văn bản đầu vào
 */
export function toAbbreviatedMedicalText(text: string): string {
  if (!text) return text;
  let result = text;

  // Sắp xếp các cụm từ theo độ dài giảm dần để match cụm dài trước (e.g. "bạch cầu đa nhân" trước "bạch cầu")
  const sortedKeys = Object.keys(FULL_TO_ABBR_MAP).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    const abbr = FULL_TO_ABBR_MAP[key];
    // Thay thế regex không phân biệt hoa thường, bảo toàn biên từ tiếng Việt
    const regex = new RegExp(`(?<=[^a-zà-ỹ0-9]|^)${key}(?=[^a-zà-ỹ0-9]|$)`, 'gi');
    result = result.replace(regex, abbr);
  }

  return result;
}

/**
 * Lấy giải nghĩa nhanh từ viết tắt để hiển thị tooltip
 */
export function getAbbrDefinition(abbr: string): string | null {
  return ABBR_TO_FULL_MAP[abbr] || null;
}

/**
 * Mở rộng từ khóa tìm kiếm 2 chiều giữa từ viết tắt và từ đầy đủ
 * Ví dụ: gõ "plt" -> tìm cả "plt" và "tiểu cầu", gõ "tiểu cầu" -> tìm cả "plt"
 */
export function expandSearchTerms(query: string): string[] {
  if (!query) return [];
  const q = query.trim().toLowerCase();
  const results = new Set<string>();
  results.add(q);

  // 1. Kiểm tra nếu q khớp với từ viết tắt -> thêm dạng đầy đủ
  const upperQ = q.toUpperCase();
  if (ABBR_TO_FULL_MAP[upperQ]) {
    results.add(ABBR_TO_FULL_MAP[upperQ].toLowerCase());
  }

  // 2. Kiểm tra nếu q là một phần hoặc khớp với dạng đầy đủ -> thêm từ viết tắt
  for (const [full, abbr] of Object.entries(FULL_TO_ABBR_MAP)) {
    if (full.includes(q) || q.includes(full)) {
      results.add(abbr.toLowerCase());
      results.add(full.toLowerCase());
    }
  }

  // 3. Mapping bổ sung đặc thù
  if (q === 'plt') results.add('tieu cau');
  if (q === 'wbc') results.add('bach cau');
  if (q === 'rbc') results.add('hong cau');
  if (q === 'hct') results.add('hematocrit');
  if (q === 'kmdm' || q === 'abg') {
    results.add('khi mau dong mach');
    results.add('khi mau');
  }
  if (q === 'xq') results.add('x-quang');
  if (q === 'sa') results.add('sieu am');
  if (q === 'ha') results.add('huyet ap');
  if (q === 'sxhd' || q === 'sxh') results.add('sot xuat huyet');
  if (q === 'tha') results.add('tang huyet ap');
  if (q === 'dtd') results.add('dai thao duong');
  if (q === 'dnt') results.add('dich nao tuy');

  return Array.from(results);
}
