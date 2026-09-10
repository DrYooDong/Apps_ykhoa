import { Benh, CategoryType, KnowledgeBase, RoleType, ThresholdMap, TrieuChung } from '../types.ts';
import kbRaw from '@vault/data/clinical-rules-kb.json';
import casesRaw from '@vault/data/sample-clinical-cases.json';

export const ROLE_LABELS: Record<RoleType, { label: string; badgeClass: string }> = {
  dt: { label: 'đặc trưng', badgeClass: 'text-blue-700 border border-blue-200 bg-blue-50' },
  gy: { label: 'gợi ý', badgeClass: 'text-amber-700 border border-amber-200 bg-amber-50' },
  ht: { label: 'hỗ trợ', badgeClass: 'text-slate-700 border border-slate-200 bg-slate-100' },
  loaitru: { label: 'loại trừ', badgeClass: 'text-red-700 border border-red-200 bg-red-50' },
};

export const GROUP_COLORS: Record<string, string> = {
  'Toàn thân': '#5b6b74',
  'Tim mạch': '#c2362f',
  'Hô hấp': '#1f6f8b',
  'Tiêu hóa': '#c07a1f',
  'Tiết niệu': '#3f6fb5',
  'Nội tiết': '#8a5a2b',
  'Thần kinh': '#5a4fcf',
  'Sản phụ khoa': '#c05299',
  'Da niêm': '#b3455e',
  'Huyết học': '#a3364c',
  'Tiền căn': '#64748b',
  'Cận lâm sàng': '#2f6f4f',
  'Khác': '#5b6b74',
};

export const GROUP_NAMES: string[] = Object.keys(GROUP_COLORS);

export const CLINICAL_FIELDS: [string, string][] = [
  ['vNhiet', 'Nhiệt độ (°C)'],
  ['vMach', 'Mạch (l/ph)'],
  ['vHATT', 'HA tâm thu (mmHg)'],
  ['vHATTr', 'HA tâm trương (mmHg)'],
  ['vTho', 'Nhịp thở (l/ph)'],
  ['vSpo2', 'SpO₂ (%)'],
  ['lBC', 'Bạch cầu (G/L)'],
  ['lTC', 'Tiểu cầu (G/L)'],
  ['lHct', 'Hematocrit (%)'],
  ['lGlu', 'Glucose (mmol/L)'],
  ['lTrop', 'Troponin (ng/L)'],
];

export const DEFAULT_KNOWLEDGE_BASE: KnowledgeBase = kbRaw as unknown as KnowledgeBase;

export interface SampleCase {
  ten: string;
  sel: string[];
  vitals?: Record<string, string>;
  labs?: Record<string, string>;
  selected?: string[];
  negated?: string[];
  form: {
    gioiTinh: 'nam' | 'nu' | 'khac';
    tuoi: string;
    ngheNghiep: string;
    lyDo: string;
    text: { cn: string; tt: string; tc: string; cls: string };
  };
}

export const SAMPLE_CASES: SampleCase[] = casesRaw as unknown as SampleCase[];
