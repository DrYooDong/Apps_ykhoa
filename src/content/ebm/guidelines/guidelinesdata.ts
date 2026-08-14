/**
 * Guidelines Core Metadata & Databases (guidelinesdata.ts)
 * Path: src/content/ebm/guidelines/guidelinesdata.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface SpecialtyMeta {
  name: string;
  color: string;
  bg: string;
}

export interface JournalMetricMeta {
  name: string;
  journal: string;
  aliases: string[];
  if: number | null;
  quartile: string;
  sjr: number | null;
  snip: number | null;
  hIndex: number | null;
  category: string;
  publisher: string;
  issn: string;
}

export interface ClinicalConditionMeta {
  id: string;
  name: string;
  icd10: string[];
  color: string;
  bg: string;
}

export const SPECIALTIES: Record<string, SpecialtyMeta> = {
  cardio: { name: 'Tim mạch', color: '#dc2626', bg: '#fef2f2' },
  pulmo: { name: 'Hô hấp', color: '#2563eb', bg: '#eff6ff' },
  gi: { name: 'Tiêu hóa', color: '#ca8a04', bg: '#fefce8' },
  endo: { name: 'Nội tiết', color: '#7c3aed', bg: '#faf5ff' },
  neuro: { name: 'Thần kinh', color: '#c026d3', bg: '#fdf4ff' },
  infect: { name: 'Truyền nhiễm', color: '#16a34a', bg: '#f0fdf4' },
  renal: { name: 'Thận học', color: '#0891b2', bg: '#ecfeff' },
  rheum: { name: 'Cơ xương khớp', color: '#ea580c', bg: '#fff7ed' },
  hema: { name: 'Huyết học', color: '#db2777', bg: '#fdf2f8' },
  onco: { name: 'Ung thư', color: '#be185d', bg: '#fce7f3' },
  pedia: { name: 'Nhi khoa', color: '#0284c7', bg: '#f0f9ff' },
  obgyn: { name: 'Sản phụ khoa', color: '#e11d48', bg: '#fff1f2' },
  icu: { name: 'Hồi sức tích cực', color: '#059669', bg: '#ecfdf5' },
  derma: { name: 'Da liễu', color: '#ec4899', bg: '#fdf2f8' },
  ent: { name: 'Tai Mũi Họng', color: '#06b6d4', bg: '#ecfeff' },
  nutri: { name: 'Dinh dưỡng', color: '#65a30d', bg: '#f7fee7' }
};

export const SOURCE_TYPES: Record<string, { name: string; color: string; bg: string }> = {
  'intl-study': { name: 'Nghiên cứu Quốc tế', color: '#6366f1', bg: '#e0e7ff' },
  'intl-guideline': { name: 'Guideline Quốc tế', color: '#0d9488', bg: '#ccfbf1' },
  'vn-moh': { name: 'Bộ Y tế Việt Nam', color: '#dc2626', bg: '#fee2e2' },
  'vn-association': { name: 'Hội chuyên khoa VN', color: '#16a34a', bg: '#dcfce7' }
};

export const DESIGNS: Record<string, { name: string }> = {
  'rct': { name: 'Thử nghiệm lâm sàng (RCT)' },
  'meta': { name: 'Tổng quan / Meta-Analysis' },
  'cohort': { name: 'Nghiên cứu quan sát / Thuần tập' },
  'guideline': { name: 'Hướng dẫn / Khuyến cáo' },
  'review': { name: 'Bài tổng quan y khoa (Review)' },
  'case-report': { name: 'Case Report / Series' },
  'other': { name: 'Khác' }
};

export const IMPACTS: Record<string, { name: string; color: string; bg: string }> = {
  'practice-changing': { name: 'Practice-Changing', color: '#dc2626', bg: '#fef2f2' },
  'informative': { name: 'Informative', color: '#2563eb', bg: '#eff6ff' },
  'early-signal': { name: 'Early Signal', color: '#d97706', bg: '#fffbeb' },
  'negative': { name: 'Negative/Âm tính', color: '#4b5563', bg: '#f3f4f6' },
  'regulatory': { name: 'Regulatory', color: '#7c3aed', bg: '#faf5ff' }
};

export const CLINICAL_CONDITIONS: Record<string, ClinicalConditionMeta> = {
  'heart-failure': { id: 'heart-failure', name: 'Suy tim (Heart Failure)', icd10: ['I50', 'I50.1', 'I50.9'], color: '#dc2626', bg: '#fef2f2' },
  'hypertension': { id: 'hypertension', name: 'Tăng huyết áp', icd10: ['I10', 'I11', 'I15'], color: '#0891b2', bg: '#ecfeff' },
  'af': { id: 'af', name: 'Rung nhĩ (AF)', icd10: ['I48', 'I48.0'], color: '#ea580c', bg: '#fff7ed' },
  'cad': { id: 'cad', name: 'Bệnh động mạch vành (CAD/CCS)', icd10: ['I25', 'I20', 'I21'], color: '#b91c1c', bg: '#fff1f1' },
  'diabetes-t2d': { id: 'diabetes-t2d', name: 'Đái tháo đường Típ 2', icd10: ['E11', 'E11.9', 'E11.2'], color: '#7c3aed', bg: '#faf5ff' },
  'copd': { id: 'copd', name: 'Bệnh phổi tắc nghẽn mạn tính (COPD)', icd10: ['J44', 'J44.9', 'J44.1'], color: '#0284c7', bg: '#f0f9ff' },
  'asthma': { id: 'asthma', name: 'Hen suyễn (Asthma)', icd10: ['J45', 'J45.9'], color: '#0d9488', bg: '#f0fdfa' },
  'ckd': { id: 'ckd', name: 'Bệnh thận mạn (CKD)', icd10: ['N18', 'N18.3', 'N18.9'], color: '#059669', bg: '#ecfdf5' },
  'stroke': { id: 'stroke', name: 'Đột quỵ thiếu máu & Xuất huyết não', icd10: ['I63', 'I61', 'I64', 'G45'], color: '#9333ea', bg: '#faf5ff' }
};

export const JOURNAL_METRICS_DATABASE: Record<string, JournalMetricMeta> = {
  'N Engl J Med': { name: 'The New England Journal of Medicine (NEJM)', journal: 'N Engl J Med', aliases: ['nejm', 'new england journal of medicine'], if: 158.5, quartile: 'Q1', sjr: 14.52, snip: 5.82, hIndex: 1150, category: 'General Medicine', publisher: 'Massachusetts Medical Society', issn: '0028-4793' },
  'NEJM': { name: 'The New England Journal of Medicine (NEJM)', journal: 'N Engl J Med', aliases: ['nejm', 'new england journal of medicine'], if: 158.5, quartile: 'Q1', sjr: 14.52, snip: 5.82, hIndex: 1150, category: 'General Medicine', publisher: 'Massachusetts Medical Society', issn: '0028-4793' },
  'Lancet': { name: 'The Lancet', journal: 'Lancet', aliases: ['the lancet'], if: 168.9, quartile: 'Q1', sjr: 15.68, snip: 6.12, hIndex: 850, category: 'General Medicine', publisher: 'Elsevier', issn: '0140-6736' },
  'JAMA': { name: 'JAMA - Journal of the American Medical Association', journal: 'JAMA', aliases: ['jama', 'journal of the american medical association'], if: 120.7, quartile: 'Q1', sjr: 9.85, snip: 4.95, hIndex: 720, category: 'General Medicine', publisher: 'American Medical Association', issn: '0098-7484' },
  'BMJ': { name: 'BMJ - British Medical Journal', journal: 'BMJ', aliases: ['british medical journal'], if: 105.7, quartile: 'Q1', sjr: 4.82, snip: 3.45, hIndex: 450, category: 'General Medicine', publisher: 'BMJ Publishing Group', issn: '0959-8138' },
  'Circulation': { name: 'Circulation (AHA)', journal: 'Circulation', aliases: ['circulation journal'], if: 37.8, quartile: 'Q1', sjr: 6.95, snip: 3.12, hIndex: 610, category: 'Cardiology', publisher: 'Lippincott Williams & Wilkins', issn: '0009-7322' },
  'Eur Heart J': { name: 'European Heart Journal (ESC)', journal: 'Eur Heart J', aliases: ['european heart journal', 'ehj'], if: 39.3, quartile: 'Q1', sjr: 7.21, snip: 3.45, hIndex: 420, category: 'Cardiology', publisher: 'Oxford University Press', issn: '0195-668X' },
  'Diabetes Care': { name: 'Diabetes Care (ADA)', journal: 'Diabetes Care', aliases: ['diabetes care'], if: 17.1, quartile: 'Q1', sjr: 4.12, snip: 2.35, hIndex: 380, category: 'Endocrinology', publisher: 'American Diabetes Association', issn: '0149-5992' },
  'Kidney Int': { name: 'Kidney International (ISN)', journal: 'Kidney Int', aliases: ['kidney international'], if: 19.6, quartile: 'Q1', sjr: 3.95, snip: 2.15, hIndex: 290, category: 'Nephrology', publisher: 'Elsevier', issn: '0085-2538' },
  'Bộ Y tế Việt Nam': { name: 'Khuyến cáo Cấp Quốc gia — Bộ Y tế Việt Nam', journal: 'Bộ Y tế Việt Nam', aliases: ['byt', 'bo y te', 'qđ-byt', 'quuyết định bộ y tế'], if: null, quartile: 'MOH', sjr: null, snip: null, hIndex: null, category: 'Hướng Dẫn Quốc Gia', publisher: 'Bộ Y tế Việt Nam', issn: 'N/A' }
};

export function getJournalMetrics(journalName: string, studyObj?: any): any {
  if (studyObj && (studyObj.impactFactor || studyObj.quartile || studyObj.if)) {
    return {
      if: studyObj.impactFactor || studyObj.if || null,
      quartile: studyObj.quartile || 'Q1',
      sjr: studyObj.sjr || null,
      snip: studyObj.snip || null,
      hIndex: studyObj.hIndex || null,
      name: journalName || studyObj.organization || 'Tạp chí Y khoa',
      publisher: studyObj.publisher || 'N/A'
    };
  }
  if (!journalName) return null;
  const qClean = journalName.trim().toLowerCase();

  const directKey = Object.keys(JOURNAL_METRICS_DATABASE).find(k => k.toLowerCase() === qClean);
  if (directKey) return JOURNAL_METRICS_DATABASE[directKey];

  const aliasKey = Object.keys(JOURNAL_METRICS_DATABASE).find(k => {
    const item = JOURNAL_METRICS_DATABASE[k];
    return item.aliases && item.aliases.some(a => a.toLowerCase() === qClean || qClean.includes(a.toLowerCase()));
  });
  if (aliasKey) return JOURNAL_METRICS_DATABASE[aliasKey];

  const partialKey = Object.keys(JOURNAL_METRICS_DATABASE).find(k => 
    qClean.includes(k.toLowerCase()) || k.toLowerCase().includes(qClean) ||
    JOURNAL_METRICS_DATABASE[k].name.toLowerCase().includes(qClean)
  );
  return partialKey ? JOURNAL_METRICS_DATABASE[partialKey] : null;
}

export const SAMPLE_STUDIES: any[] = [];

if (typeof window !== 'undefined') {
  (window as any).SPECIALTIES = SPECIALTIES;
  (window as any).SOURCE_TYPES = SOURCE_TYPES;
  (window as any).DESIGNS = DESIGNS;
  (window as any).IMPACTS = IMPACTS;
  (window as any).CLINICAL_CONDITIONS = CLINICAL_CONDITIONS;
  (window as any).JOURNAL_METRICS_DATABASE = JOURNAL_METRICS_DATABASE;
  (window as any).getJournalMetrics = getJournalMetrics;
  (window as any).SAMPLE_STUDIES = SAMPLE_STUDIES;
}
