import { SoapClinicalExperience } from '../types.ts';

export const SOAP_SPECIALTIES = [
  'Tất cả chuyên khoa',
  'Tim mạch',
  'Hô hấp',
  'Tiêu hóa - Gan mật',
  'Hồi sức - Cấp cứu',
  'Thần kinh',
  'Nhiễm trùng - Nhiệt đới',
  'Nội tiết - Thận',
  'Nhi khoa',
  'Sản phụ khoa',
  'Cơ xương khớp',
  'Ngoại khoa - Chấn thương',
];

export const EXPERIENCE_LEVEL_LABELS: Record<
  string,
  { label: string; bg: string; text: string; border: string }
> = {
  essential: { label: 'Ca kinh điển', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'thuc-chien': { label: 'Ca thực chiến', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  pitfall: { label: 'Bẫy lâm sàng', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  rare: { label: 'Tình huống hiếm', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  advanced: { label: 'Chuyên sâu EBM', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
};

export function getExperienceLevelConfig(level?: string) {
  if (level && EXPERIENCE_LEVEL_LABELS[level]) {
    return EXPERIENCE_LEVEL_LABELS[level];
  }
  return {
    label: level ? String(level).toUpperCase() : 'Ca lâm sàng',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
  };
}

function safeMatchKeyword(text: string, syn: string): boolean {
  if (syn === 'nhi') {
    return /(^|[^\p{L}])nhi([^\p{L}]|$)/u.test(text);
  }
  if (syn === 'tim') {
    return /(^|[^\p{L}])tim([^\p{L}]|$)/u.test(text);
  }
  if (syn === 'gan') {
    return /(^|[^\p{L}])gan([^\p{L}]|$)/u.test(text);
  }
  if (syn === 'mật') {
    return /(^|[^\p{L}])mật([^\p{L}]|$)/u.test(text);
  }
  return text.includes(syn);
}

/**
 * So khớp thông minh giữa chuyên khoa được chọn trên thanh lọc và chuyên khoa thực tế của ca bệnh
 * Hỗ trợ từ đồng nghĩa y khoa (Truyền nhiễm <-> Nhiễm trùng - Nhiệt đới, Cấp cứu <-> Hồi sức - Cấp cứu)
 * và ca đa chuyên khoa (phân cách bởi '/', '&', ',')
 */
export function matchesSoapSpecialty(filterSpecialty: string, caseSpecialty?: string, caseTags?: string[]): boolean {
  if (!filterSpecialty || filterSpecialty === 'Tất cả chuyên khoa') return true;
  if (!caseSpecialty && (!caseTags || caseTags.length === 0)) return false;

  const normFilter = filterSpecialty.toLowerCase().trim();
  const cSpec = (caseSpecialty || '').toLowerCase().trim();
  const cTags = (caseTags || []).map((t) => t.toLowerCase().trim());
  const allText = `${cSpec} ${cTags.join(' ')}`.toLowerCase();

  if (cSpec === normFilter) return true;

  const SPECIALTY_SYNONYM_MAP: Record<string, string[]> = {
    'nhiễm trùng - nhiệt đới': [
      'truyền nhiễm',
      'nhiễm trùng',
      'nhiệt đới',
      'dengue',
      'sepsis',
      'nhiễm khuẩn',
      'vi sinh',
      'ký sinh trùng',
    ],
    'hồi sức - cấp cứu': [
      'cấp cứu',
      'hồi sức',
      'icu',
      'hdu',
      'chống độc',
      'hồi sức tích cực',
    ],
    'tiêu hóa - gan mật': [
      'tiêu hóa',
      'gan mật',
      'gan',
      'mật',
      'dạ dày',
      'tiêu hoá',
    ],
    'hô hấp': ['hô hấp', 'phổi', 'copd', 'hen'],
    'tim mạch': ['tim mạch', 'tim'],
    'thần kinh': ['thần kinh', 'não', 'đột quỵ'],
    'nội tiết - thận': [
      'nội tiết',
      'thận',
      'thận - tiết niệu',
      'tiết niệu',
      'lọc máu',
      'đái tháo đường',
    ],
    'nhi khoa': ['nhi khoa', 'trẻ em', 'sơ sinh', 'bệnh nhi'],
    'sản phụ khoa': ['sản', 'phụ khoa', 'sản phụ khoa', 'thai kỳ'],
    'cơ xương khớp': ['cơ xương khớp', 'khớp', 'xương khớp'],
    'ngoại khoa - chấn thương': ['ngoại khoa', 'chấn thương'],
  };

  const synonyms = SPECIALTY_SYNONYM_MAP[normFilter];
  if (synonyms) {
    return synonyms.some((syn) => safeMatchKeyword(allText, syn));
  }

  return false;
}

export interface DiseaseGroupItem {
  name: string;
  count: number;
}

const KNOWN_DISEASE_PATTERNS: Array<{ name: string; test: RegExp }> = [
  { name: 'SXH Dengue', test: /(dengue|sốt xuất huyết|sxhd)/i },
  { name: 'Sốt thương hàn', test: /(thương hàn|typhoid)/i },
  { name: 'Viêm màng não', test: /(viêm màng n[aã]o|vmn|meningitis)/i },
  { name: 'Viêm gan vi rút B', test: /(viêm gan.*b|hepatitis b|hbv)/i },
  { name: 'Viêm gan vi rút C', test: /(viêm gan.*c|hepatitis c|hcv)/i },
  { name: 'Viêm gan do thuốc', test: /(viêm gan.*thuốc|dili)/i },
  { name: 'Thủy đậu', test: /(thủy đậu|varicella|chickenpox)/i },
  { name: 'Tay chân miệng', test: /(tay chân miệng|hfmd)/i },
  { name: 'Leptospirosis', test: /(leptospir|hội chứng weil)/i },
  { name: 'HIV/AIDS', test: /(hiv|aids)/i },
  { name: 'Sốt rét', test: /(sốt rét|malaria|plasmodium)/i },
  { name: 'Nhiễm trùng huyết', test: /(nhiễm trùng huyết|sepsis|nhiễm khuẩn huyết|urosepsis)/i },
  { name: 'Lao phổi', test: /(lao phổi|tuberculosis|afb)/i },
  { name: 'Viêm phổi cộng đồng', test: /(viêm phổi.*cộng đồng|viêm phổi)/i },
  { name: 'Đợt cấp COPD', test: /(copd|bptnmt|tắc nghẽn mạn)/i },
  { name: 'Phản vệ', test: /(phản vệ|anaphylaxis)/i },
  { name: 'Nhiễm trùng da mô mềm', test: /(da mô mềm|áp xe da|cellulitis)/i },
  { name: 'Nhiễm trùng đường tiết niệu', test: /(viêm bàng quang|bể thận|tiết niệu|ruti)/i },
  { name: 'Nhiễm trùng tiêu hóa', test: /(tiêu hóa.*ngộ độc|dạ dày ruột|rotavirus)/i },
  { name: 'Ngộ độc nọc bọ cạp', test: /(bọ cạp|scorpion)/i },
];

/**
 * Tự động nhận diện mặt bệnh / vấn đề lâm sàng chính của ca bệnh SOAP
 */
export function detectCaseDisease(c: SoapClinicalExperience): string {
  const fullText = `${c.id || ''} ${c.title || ''} ${(c.tags || []).join(' ')} ${c.a?.primaryDiagnosis || ''}`.toLowerCase();
  for (const item of KNOWN_DISEASE_PATTERNS) {
    if (item.test.test(fullText)) {
      return item.name;
    }
  }
  // Fallback: Tìm tag mô tả bệnh (không phải chuyên khoa, không phải SOAP)
  const candidateTags = (c.tags || []).filter(
    (t) =>
      !/^(truyền nhiễm|nhi khoa|cấp cứu|hô hấp|thần kinh|tiêu hóa|tim mạch|nội tiết|ngoại khoa|thận|soap|ca lâm sàng|hồi sức)$/i.test(
        t.trim()
      )
  );
  if (candidateTags.length > 0) {
    return candidateTags[0].trim();
  }
  return c.title ? c.title.split(/[,–-]/)[0].trim() : 'Khác';
}

/**
 * Danh sách ca lâm sàng mẫu đã được di dời vào Knowledge Vault (vault-catalog.json, khoCode: 'BA').
 * Toàn bộ ca lâm sàng được nạp và quản lý qua pipeline NotebookLM -> Knowledge Vault.
 */
export const SAMPLE_SOAP_EXPERIENCES: SoapClinicalExperience[] = [];

