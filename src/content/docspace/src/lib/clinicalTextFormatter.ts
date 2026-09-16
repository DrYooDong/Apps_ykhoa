/**
 * Clinical Text Formatter & Symbol Transformer — DocSpace
 * Chuẩn hóa văn bản y khoa, rút gọn câu từ, thay thế tên viết tắt chuẩn và chuyển đổi ký hiệu toán học EBM
 */

// Bảng tra cứu tên kép dạng "Tên đầy đủ (tên viết tắt)" -> Chuyển thành tên tắt viết hoa chuẩn
const MEDICAL_ACRONYM_MAP: [RegExp, string][] = [
  // Huyết học & Sinh hóa
  [/\bhematocrit\s*\(\s*hct\s*\)/gi, 'Hct'],
  [/\bhct\s*\(\s*hematocrit\s*\)/gi, 'Hct'],
  [/\bbạch cầu\s*\(\s*wbc\s*\)/gi, 'BC'],
  [/\bwbc\s*\(\s*bạch cầu\s*\)/gi, 'BC'],
  [/\btiểu cầu\s*\(\s*plt\s*\)/gi, 'Tiểu cầu'],
  [/\bplt\s*\(\s*tiểu cầu\s*\)/gi, 'Tiểu cầu'],
  [/\bhồng cầu\s*\(\s*rbc\s*\)/gi, 'Hồng cầu'],
  [/\bkhí máu động mạch\s*\(\s*abg\s*\)/gi, 'Khí máu ĐM (ABG)'],
  [/\btổng phân tích tế bào máu ngoại vi\s*\(\s*cbc\s*\)/gi, 'CTM (CBC)'],
  [/\bcông thức máu\s*\(\s*ctm\s*\)/gi, 'CTM'],

  // Tim mạch & Hô hấp
  [/\bhuyết áp tâm thu\s*\(\s*hatt\s*\)/gi, 'HATT'],
  [/\bhuyết áp tâm trương\s*\(\s*hattr\s*\)/gi, 'HATTr'],
  [/\bhuyết áp\s*\(\s*ha\s*\)/gi, 'HA'],
  [/\bđộ bão hòa oxy\s*\(\s*spo2\s*\)/gi, 'SpO₂'],
  [/\bspo2\b/gi, 'SpO₂'],
  [/\bphân suất tống máu\s*\(\s*ef\s*\)/gi, 'EF'],
  [/\bnhồi máu cơ tim\s*\(\s*nmct\s*\)/gi, 'NMCT'],
  [/\bđiện tâm đồ\s*\(\s*ecg\s*\)/gi, 'ECG'],
  [/\bx-quang ngực\s*\(\s*cxr\s*\)/gi, 'X-quang ngực'],

  // Truyền nhiễm & Bệnh học
  [/\bsốt xuất huyết dengue\s*\(\s*sxhd\s*\)/gi, 'SXH Dengue'],
  [/\bsốt xuất huyết\s*\(\s*sxh\s*\)/gi, 'SXH'],
  [/\bdấu hiệu cảnh báo\s*\(\s*dhcb\s*\)/gi, 'DHCB'],
  [/\bký sinh trùng sốt rét\s*\(\s*kstsr\s*\)/gi, 'KSTSR'],
  [/\bdịch tễ học\s*\(\s*dth\s*\)/gi, 'DTH'],
  [/\bđái tháo đường\s*\(\s*đtđ\s*\)/gi, 'ĐTĐ'],
  [/\btăng huyết áp\s*\(\s*tha\s*\)/gi, 'THA'],
  [/\bchẩn đoán hình ảnh\s*\(\s*cđha\s*\)/gi, 'CĐHA'],
  [/\bcận lâm sàng\s*\(\s*cls\s*\)/gi, 'CLS'],
  [/\bnghiệm pháp dây thắt\s*\(\s*lacet\s*\)/gi, 'Nghiệm pháp Lacet'],
];

// Bảng thay thế các cụm từ nối dài dòng thành ký hiệu toán học / logic y khoa
const SYMBOL_REPLACEMENTS: [RegExp, string][] = [
  // So sánh & Ngưỡng
  [/\bít nhất\b|\btối thiểu\b|\blớn hơn hoặc bằng\b|\bbằng hoặc lớn hơn\b/gi, '>='],
  [/\btối đa\b|\bnhỏ hơn hoặc bằng\b|\bbằng hoặc nhỏ hơn\b/gi, '<='],
  [/\btăng trên\b|\blớn hơn\b|\bvượt quá\b/gi, '>'],
  [/\bgiảm dưới\b|\bnhỏ hơn\b/gi, '<'],

  // Phối hợp & Logic
  [/\bkèm theo\b|\bkèm\b|\bphối hợp với\b/gi, '+'],
  [/\bvà\/hoặc\b/gi, '/'],
  [/\bdương tính\b/gi, '(+)'],
  [/\bâm tính\b/gi, '(-)'],

  // Đơn vị và từ ngữ thường lặp
  [/\bhematocrit\b/gi, 'Hct'],
];

/**
 * Rút gọn và chuẩn hóa văn bản tiêu chuẩn lâm sàng
 * - Chuyển đổi tên kép sang tên tắt chuẩn EBM
 * - Chuyển đổi từ nối sang ký hiệu toán học
 * - Làm sạch khoảng trắng thừa
 */
export function shortenClinicalText(text: string | undefined | null): string {
  if (!text) return '';

  let result = text;

  // 1. Áp dụng bảng từ viết tắt y khoa
  for (const [pattern, replacement] of MEDICAL_ACRONYM_MAP) {
    result = result.replace(pattern, replacement);
  }

  // 2. Chuyển đổi câu từ sang ký hiệu logic
  for (const [pattern, replacement] of SYMBOL_REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }

  // 3. Chuẩn hóa khoảng trắng quanh các ký hiệu toán học
  result = result
    .replace(/\s*>=\s*/g, ' >= ')
    .replace(/\s*<=\s*/g, ' <= ')
    .replace(/\s*>\s*/g, ' > ')
    .replace(/\s*<\s*/g, ' < ')
    .replace(/\s*\+\s*/g, ' + ')
    .replace(/\s*\(\s*\+\s*\)/g, ' (+)')
    .replace(/\s*\(\s*-\s*\)/g, ' (-)')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return result;
}

/**
 * Rút gọn nhãn tiêu chuẩn (Criteria Label)
 */
export function formatCriterionLabel(label: string): string {
  return shortenClinicalText(label);
}

/**
 * Chuẩn hóa ngưỡng định lượng cận lâm sàng (Lab Threshold)
 */
export function formatLabThreshold(threshold?: string): string {
  if (!threshold) return '';
  return shortenClinicalText(threshold);
}
