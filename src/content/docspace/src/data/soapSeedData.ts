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

/**
 * Danh sách ca lâm sàng mẫu đã được di dời vào Knowledge Vault (vault-catalog.json, khoCode: 'BA').
 * Toàn bộ ca lâm sàng được nạp và quản lý qua pipeline NotebookLM -> Knowledge Vault.
 */
export const SAMPLE_SOAP_EXPERIENCES: SoapClinicalExperience[] = [];
