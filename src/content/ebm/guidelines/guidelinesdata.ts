/**
 * CliniPortal 2.0 — Guidelines Metadata & Journal Registry (TypeScript)
 * Path: src/content/ebm/guidelines/guidelinesdata.ts
 */

export interface SpecialtyMeta {
  name: string;
  color: string;
  bg: string;
}

export interface SourceTypeMeta {
  name: string;
  color: string;
  bg: string;
}

export interface DesignMeta {
  name: string;
}

export interface ImpactMeta {
  name: string;
  color: string;
  bg: string;
}

export interface ClinicalConditionMeta {
  id: string;
  name: string;
  icd10: string[];
  color: string;
  bg: string;
  specialty?: string;
}

export interface JournalMetricsItem {
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

export const SOURCE_TYPES: Record<string, SourceTypeMeta> = {
  'intl-study': { name: 'Nghiên cứu Quốc tế', color: '#6366f1', bg: '#e0e7ff' },
  'intl-guideline': { name: 'Guideline Quốc tế', color: '#0d9488', bg: '#ccfbf1' },
  'vn-moh': { name: 'Bộ Y tế Việt Nam', color: '#dc2626', bg: '#fee2e2' },
  'vn-association': { name: 'Hội chuyên khoa VN', color: '#16a34a', bg: '#dcfce7' }
};

export const DESIGNS: Record<string, DesignMeta> = {
  'rct': { name: 'Thử nghiệm lâm sàng (RCT)' },
  'meta': { name: 'Tổng quan / Meta-Analysis' },
  'cohort': { name: 'Nghiên cứu quan sát / Thuần tập' },
  'guideline': { name: 'Hướng dẫn / Khuyến cáo' },
  'review': { name: 'Bài tổng quan y khoa (Review)' },
  'case-report': { name: 'Case Report / Series' },
  'other': { name: 'Khác' }
};

export const IMPACTS: Record<string, ImpactMeta> = {
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
  'valvular-heart': { id: 'valvular-heart', name: 'Bệnh van tim', icd10: ['I34', 'I35', 'I05'], color: '#be123c', bg: '#fff1f2' },
  'diabetes-t2d': { id: 'diabetes-t2d', name: 'Đái tháo đường Típ 2', icd10: ['E11', 'E11.9', 'E11.2'], color: '#7c3aed', bg: '#faf5ff' },
  'diabetes-t1d': { id: 'diabetes-t1d', name: 'Đái tháo đường Típ 1', icd10: ['E10', 'E10.9'], color: '#6d28d9', bg: '#f5f3ff' },
  'thyroid': { id: 'thyroid', name: 'Bệnh lý tuyến giáp (Bão giáp / Nhược giáp)', icd10: ['E05', 'E05.5', 'E03'], color: '#0284c7', bg: '#f0f9ff' },
  'dyslipidemia': { id: 'dyslipidemia', name: 'Rối loạn lipid máu', icd10: ['E78', 'E78.0', 'E78.5'], color: '#d97706', bg: '#fffbeb' },
  'obesity': { id: 'obesity', name: 'Béo phì & Hội chứng chuyển hóa', icd10: ['E66', 'E66.9', 'E88.81'], color: '#9a3412', bg: '#fff7ed' },
  'copd': { id: 'copd', name: 'Bệnh phổi tắc nghẽn mạn tính (COPD)', icd10: ['J44', 'J44.9', 'J44.1'], color: '#0284c7', bg: '#f0f9ff' },
  'asthma': { id: 'asthma', name: 'Hen suyễn (Asthma)', icd10: ['J45', 'J45.9'], color: '#0d9488', bg: '#f0fdfa' },
  'pneumonia': { id: 'pneumonia', name: 'Viêm phổi mắc phải cộng đồng & Bệnh viện', icd10: ['J18', 'J15', 'J18.9'], color: '#2563eb', bg: '#eff6ff' },
  'interstitial-lung': { id: 'interstitial-lung', name: 'Bệnh phổi mô kẽ & Xơ phổi', icd10: ['J84', 'J84.1'], color: '#475569', bg: '#f8fafc' },
  'tb': { id: 'tb', name: 'Lao phổi & Lao ngoài phổi', icd10: ['A15', 'A16', 'A19'], color: '#b45309', bg: '#fef3c7' },
  'ckd': { id: 'ckd', name: 'Bệnh thận mạn (CKD)', icd10: ['N18', 'N18.3', 'N18.9'], color: '#059669', bg: '#ecfdf5' },
  'aki': { id: 'aki', name: 'Tổn thương thận cấp (AKI)', icd10: ['N17', 'N17.9'], color: '#047857', bg: '#f0fdf4' },
  'nephrotic': { id: 'nephrotic', name: 'Hội chứng thận hư & Viêm cầu thận', icd10: ['N04', 'N00', 'N03'], color: '#0f766e', bg: '#f0fdfa' },
  'bph-luts': { id: 'bph-luts', name: 'Tăng sinh lành tính tuyến tiền liệt (BPH/LUTS)', icd10: ['N40', 'N40.1'], color: '#4338ca', bg: '#eef2ff' },
  'uti': { id: 'uti', name: 'Nhiễm khuẩn tiết niệu', icd10: ['N39.0', 'N10'], color: '#1d4ed8', bg: '#eff6ff' },
  'icu': { id: 'icu', name: 'Nhiễm trùng Hồi sức & Sốc nhiễm khuẩn', icd10: ['A41', 'A41.9', 'R65.2', 'R57.2'], color: '#059669', bg: '#ecfdf5' },
  'hepatitis-b': { id: 'hepatitis-b', name: 'Viêm gan vi rút B', icd10: ['B18.0', 'B18.1'], color: '#ca8a04', bg: '#fefce8' },
  'hepatitis-c': { id: 'hepatitis-c', name: 'Viêm gan vi rút C', icd10: ['B18.2'], color: '#16a34a', bg: '#f0fdf4' },
  'flu': { id: 'flu', name: 'Cúm mùa', icd10: ['J09', 'J10', 'J11'], color: '#2563eb', bg: '#eff6ff' },
  'covid19': { id: 'covid19', name: 'COVID-19', icd10: ['U07.1'], color: '#6366f1', bg: '#e0e7ff' },
  'hemorrhagic-fever': { id: 'hemorrhagic-fever', name: 'Sốt xuất huyết (Dengue/Marburg/Ebola/Nipah)', icd10: ['A90', 'A91', 'A98.3', 'A98.4', 'A98'], color: '#be185d', bg: '#fce7f3' },
  'measles': { id: 'measles', name: 'Sởi', icd10: ['B05'], color: '#e11d48', bg: '#fff1f2' },
  'invasive-fungal': { id: 'invasive-fungal', name: 'Nhiễm nấm xâm lấn & Aspergillus', icd10: ['B49', 'B44'], color: '#854d0e', bg: '#fefce8' },
  'hfmd': { id: 'hfmd', name: 'Bệnh Tay chân miệng', icd10: ['B08.4'], color: '#ea580c', bg: '#fff7ed' },
  'cirrhosis': { id: 'cirrhosis', name: 'Xơ gan & Tăng áp tĩnh mạch cửa', icd10: ['K74', 'K70.3'], color: '#991b1b', bg: '#fef2f2' },
  'masld-mash': { id: 'masld-mash', name: 'Gan nhiễm mỡ (MASLD / MASH)', icd10: ['K76.0', 'K75.8'], color: '#65a30d', bg: '#f7fee7' },
  'gerd-peptic': { id: 'gerd-peptic', name: 'Trào ngược GERD & Loét dạ dày', icd10: ['K21', 'K25', 'K27'], color: '#c2410c', bg: '#fff7ed' },
  'ibd': { id: 'ibd', name: 'Viêm ruột mạn tính (IBD - Crohn / UC)', icd10: ['K50', 'K51'], color: '#7e22ce', bg: '#faf5ff' },
  'stroke': { id: 'stroke', name: 'Đột quỵ thiếu máu & Xuất huyết não', icd10: ['I63', 'I61', 'I64', 'G45'], color: '#9333ea', bg: '#faf5ff' },
  'epilepsy': { id: 'epilepsy', name: 'Động kinh & Co giật', icd10: ['G40', 'G40.9'], color: '#a855f7', bg: '#f3e8ff' },
  'headache-migraine': { id: 'headache-migraine', name: 'Đau đầu & Migraine', icd10: ['G43', 'G44'], color: '#6b21a8', bg: '#faf5ff' },
  'gout': { id: 'gout', name: 'Bệnh Gút (Gout)', icd10: ['M10', 'M10.0'], color: '#b91c1c', bg: '#fef2f2' },
  'ra': { id: 'ra', name: 'Viêm khớp dạng thấp (RA)', icd10: ['M05', 'M06'], color: '#c05621', bg: '#fffaf0' },
  'osteoporosis': { id: 'osteoporosis', name: 'Loãng xương', icd10: ['M81', 'M80'], color: '#71717a', bg: '#f4f4f5' },
  'lupus-sle': { id: 'lupus-sle', name: 'Lupus ban đỏ hệ thống (SLE)', icd10: ['M32'], color: '#be185d', bg: '#fce7f3' },
  'solid-cancers': { id: 'solid-cancers', name: 'Ung thư các tạng (Phổi, Gan, Vú, Đại trực tràng)', icd10: ['C34', 'C22', 'C50', 'C18'], color: '#be123c', bg: '#fff1f2' },
  'vte-pe': { id: 'vte-pe', name: 'Huyết khối tĩnh mạch & Thuyên tắc phổi (VTE/PE)', icd10: ['I82', 'I26'], color: '#9f1239', bg: '#fff1f2' },
  'malaria': { id: 'malaria', name: 'Sốt rét (Malaria)', icd10: ['B50', 'B51', 'B52', 'B53', 'B54'], color: '#d97706', bg: '#fffbeb' },
  'meningitis': { id: 'meningitis', name: 'Viêm màng não (Meningitis)', icd10: ['G00', 'G01', 'G02', 'G03'], color: '#7c3aed', bg: '#faf5ff' },
  'uterine-fibroids': { id: 'uterine-fibroids', name: 'U xơ tử cung & Sản phụ khoa', icd10: ['D25', 'N80', 'N92', 'O14', 'O72'], color: '#e11d48', bg: '#fff1f2' }
};

export const JOURNAL_METRICS_DATABASE: Record<string, JournalMetricsItem> = {
  'N Engl J Med': { name: 'The New England Journal of Medicine (NEJM)', journal: 'N Engl J Med', aliases: ['nejm', 'new england journal of medicine'], if: 158.5, quartile: 'Q1', sjr: 14.52, snip: 5.82, hIndex: 1150, category: 'General Medicine', publisher: 'Massachusetts Medical Society', issn: '0028-4793' },
  'NEJM': { name: 'The New England Journal of Medicine (NEJM)', journal: 'N Engl J Med', aliases: ['nejm', 'new england journal of medicine'], if: 158.5, quartile: 'Q1', sjr: 14.52, snip: 5.82, hIndex: 1150, category: 'General Medicine', publisher: 'Massachusetts Medical Society', issn: '0028-4793' },
  'Lancet': { name: 'The Lancet', journal: 'Lancet', aliases: ['the lancet'], if: 168.9, quartile: 'Q1', sjr: 15.68, snip: 6.12, hIndex: 850, category: 'General Medicine', publisher: 'Elsevier', issn: '0140-6736' },
  'JAMA': { name: 'JAMA - Journal of the American Medical Association', journal: 'JAMA', aliases: ['jama', 'journal of the american medical association'], if: 120.7, quartile: 'Q1', sjr: 9.85, snip: 4.95, hIndex: 720, category: 'General Medicine', publisher: 'American Medical Association', issn: '0098-7484' },
  'BMJ': { name: 'BMJ - British Medical Journal', journal: 'BMJ', aliases: ['british medical journal'], if: 105.7, quartile: 'Q1', sjr: 4.82, snip: 3.45, hIndex: 450, category: 'General Medicine', publisher: 'BMJ Publishing Group', issn: '0959-8138' },
  'Ann Intern Med': { name: 'Annals of Internal Medicine', journal: 'Ann Intern Med', aliases: ['annals of internal medicine', 'annals int med'], if: 19.6, quartile: 'Q1', sjr: 5.10, snip: 3.05, hIndex: 410, category: 'General Medicine', publisher: 'American College of Physicians', issn: '0003-4819' },
  'Nat Med': { name: 'Nature Medicine', journal: 'Nat Med', aliases: ['nature medicine'], if: 82.9, quartile: 'Q1', sjr: 18.25, snip: 7.40, hIndex: 640, category: 'General Medicine', publisher: 'Nature Publishing Group', issn: '1078-8956' },
  'PLOS Med': { name: 'PLOS Medicine', journal: 'PLOS Med', aliases: ['plos medicine'], if: 15.8, quartile: 'Q1', sjr: 4.25, snip: 2.85, hIndex: 260, category: 'General Medicine', publisher: 'PLOS', issn: '1549-1676' },

  'Circulation': { name: 'Circulation (AHA)', journal: 'Circulation', aliases: ['circulation journal'], if: 37.8, quartile: 'Q1', sjr: 6.95, snip: 3.12, hIndex: 610, category: 'Cardiology', publisher: 'Lippincott Williams & Wilkins', issn: '0009-7322' },
  'Eur Heart J': { name: 'European Heart Journal (ESC)', journal: 'Eur Heart J', aliases: ['european heart journal', 'ehj'], if: 39.3, quartile: 'Q1', sjr: 7.21, snip: 3.45, hIndex: 420, category: 'Cardiology', publisher: 'Oxford University Press', issn: '0195-668X' },
  'J Am Coll Cardiol': { name: 'Journal of the American College of Cardiology (JACC)', journal: 'J Am Coll Cardiol', aliases: ['jacc', 'journal of the american college of cardiology'], if: 24.0, quartile: 'Q1', sjr: 5.42, snip: 2.85, hIndex: 480, category: 'Cardiology', publisher: 'Elsevier', issn: '0735-1097' },
  'JAMA Cardiol': { name: 'JAMA Cardiology', journal: 'JAMA Cardiol', aliases: ['jama cardiology'], if: 24.0, quartile: 'Q1', sjr: 5.15, snip: 2.90, hIndex: 140, category: 'Cardiology', publisher: 'American Medical Association', issn: '2380-6583' },
  'Eur J Heart Fail': { name: 'European Journal of Heart Failure', journal: 'Eur J Heart Fail', aliases: ['ejhf'], if: 18.2, quartile: 'Q1', sjr: 4.10, snip: 2.30, hIndex: 185, category: 'Cardiology', publisher: 'Wiley-Blackwell', issn: '1388-9842' },
  'JAHA': { name: 'Journal of the American Heart Association', journal: 'JAHA', aliases: ['jaha'], if: 6.1, quartile: 'Q1', sjr: 1.85, snip: 1.45, hIndex: 125, category: 'Cardiology', publisher: 'Wiley-Blackwell', issn: '2047-9980' },

  'Lancet Respir Med': { name: 'The Lancet Respiratory Medicine', journal: 'Lancet Respir Med', aliases: ['lancet respiratory medicine'], if: 38.7, quartile: 'Q1', sjr: 6.85, snip: 3.10, hIndex: 195, category: 'Pulmonology', publisher: 'Elsevier', issn: '2213-2600' },
  'Am J Respir Crit Care Med': { name: 'American Journal of Respiratory and Critical Care Medicine (AJRCCM)', journal: 'Am J Respir Crit Care Med', aliases: ['ajrccm', 'blue journal'], if: 19.3, quartile: 'Q1', sjr: 4.85, snip: 2.70, hIndex: 390, category: 'Pulmonology/ICU', publisher: 'American Thoracic Society', issn: '1073-449X' },
  'Thorax': { name: 'Thorax (BTS)', journal: 'Thorax', aliases: ['thorax journal'], if: 10.8, quartile: 'Q1', sjr: 2.95, snip: 2.10, hIndex: 255, category: 'Pulmonology', publisher: 'BMJ Publishing Group', issn: '0040-6376' },
  'Chest': { name: 'CHEST Journal', journal: 'Chest', aliases: ['chest journal'], if: 9.6, quartile: 'Q1', sjr: 2.15, snip: 1.85, hIndex: 260, category: 'Pulmonology/ICU', publisher: 'Elsevier', issn: '0012-3692' },
  'Eur Respir J': { name: 'European Respiratory Journal (ERJ)', journal: 'Eur Respir J', aliases: ['erj'], if: 24.3, quartile: 'Q1', sjr: 4.90, snip: 2.80, hIndex: 280, category: 'Pulmonology', publisher: 'European Respiratory Society', issn: '0903-1936' },
  'Intensive Care Med': { name: 'Intensive Care Medicine (ESICM)', journal: 'Intensive Care Med', aliases: ['icm', 'intensive care medicine'], if: 38.9, quartile: 'Q1', sjr: 6.45, snip: 3.20, hIndex: 240, category: 'ICU', publisher: 'Springer', issn: '0342-4642' },
  'Crit Care Med': { name: 'Critical Care Medicine (SCCM)', journal: 'Crit Care Med', aliases: ['ccm', 'critical care medicine'], if: 8.8, quartile: 'Q1', sjr: 2.10, snip: 1.75, hIndex: 295, category: 'ICU', publisher: 'Lippincott Williams & Wilkins', issn: '0090-3493' },

  'Lancet Infect Dis': { name: 'The Lancet Infectious Diseases', journal: 'Lancet Infect Dis', aliases: ['lancet infectious diseases'], if: 56.3, quartile: 'Q1', sjr: 9.85, snip: 4.50, hIndex: 290, category: 'Infectious Disease', publisher: 'Elsevier', issn: '1473-3099' },
  'Clin Infect Dis': { name: 'Clinical Infectious Diseases (CID/IDSA)', journal: 'Clin Infect Dis', aliases: ['cid', 'clinical infectious diseases'], if: 11.8, quartile: 'Q1', sjr: 3.65, snip: 2.25, hIndex: 375, category: 'Infectious Disease', publisher: 'Oxford University Press', issn: '1058-4838' },
  'J Infect Dis': { name: 'The Journal of Infectious Diseases (JID)', journal: 'J Infect Dis', aliases: ['jid'], if: 6.4, quartile: 'Q1', sjr: 2.10, snip: 1.55, hIndex: 320, category: 'Infectious Disease', publisher: 'Oxford University Press', issn: '0022-1899' },
  'Gastroenterology': { name: 'Gastroenterology (AGA)', journal: 'Gastroenterology', aliases: ['gastroenterology journal'], if: 29.4, quartile: 'Q1', sjr: 5.88, snip: 2.95, hIndex: 410, category: 'Gastroenterology', publisher: 'Elsevier', issn: '0016-5085' },
  'Gut': { name: 'Gut (BSG)', journal: 'Gut', aliases: ['gut journal'], if: 24.5, quartile: 'Q1', sjr: 5.12, snip: 2.75, hIndex: 345, category: 'Gastroenterology', publisher: 'BMJ Publishing Group', issn: '0017-5749' },
  'J Hepatol': { name: 'Journal of Hepatology (EASL)', journal: 'J Hepatol', aliases: ['journal of hepatology'], if: 26.8, quartile: 'Q1', sjr: 5.95, snip: 3.05, hIndex: 310, category: 'Gastroenterology', publisher: 'Elsevier', issn: '0168-8278' },
  'Hepatology': { name: 'Hepatology (AASLD)', journal: 'Hepatology', aliases: ['hepatology journal'], if: 13.5, quartile: 'Q1', sjr: 3.85, snip: 2.05, hIndex: 380, category: 'Gastroenterology', publisher: 'Wolters Kluwer', issn: '0270-9139' },

  'Diabetes Care': { name: 'Diabetes Care (ADA)', journal: 'Diabetes Care', aliases: ['diabetes care'], if: 17.1, quartile: 'Q1', sjr: 4.12, snip: 2.35, hIndex: 380, category: 'Endocrinology', publisher: 'American Diabetes Association', issn: '0149-5992' },
  'Lancet Diabetes Endocrinol': { name: 'The Lancet Diabetes & Endocrinology', journal: 'Lancet Diabetes Endocrinol', aliases: ['lancet diabetes'], if: 44.0, quartile: 'Q1', sjr: 7.80, snip: 3.80, hIndex: 165, category: 'Endocrinology', publisher: 'Elsevier', issn: '2213-8587' },
  'JCEM': { name: 'The Journal of Clinical Endocrinology & Metabolism', journal: 'JCEM', aliases: ['jcem'], if: 5.8, quartile: 'Q1', sjr: 1.80, snip: 1.40, hIndex: 340, category: 'Endocrinology', publisher: 'Oxford University Press', issn: '0021-972X' },
  'Kidney Int': { name: 'Kidney International (ISN)', journal: 'Kidney Int', aliases: ['kidney international'], if: 19.6, quartile: 'Q1', sjr: 3.95, snip: 2.15, hIndex: 290, category: 'Nephrology', publisher: 'Elsevier', issn: '0085-2538' },
  'JASN': { name: 'Journal of the American Society of Nephrology (JASN)', journal: 'JASN', aliases: ['jasn'], if: 12.9, quartile: 'Q1', sjr: 3.40, snip: 2.05, hIndex: 285, category: 'Nephrology', publisher: 'Wolters Kluwer', issn: '1046-6673' },

  'Blood': { name: 'Blood (ASH)', journal: 'Blood', aliases: ['blood journal'], if: 20.3, quartile: 'Q1', sjr: 4.65, snip: 2.45, hIndex: 490, category: 'Hematology', publisher: 'American Society of Hematology', issn: '0006-4971' },
  'J Clin Oncol': { name: 'Journal of Clinical Oncology (JCO/ASCO)', journal: 'J Clin Oncol', aliases: ['jco'], if: 45.3, quartile: 'Q1', sjr: 9.15, snip: 4.10, hIndex: 560, category: 'Oncology', publisher: 'ASCO', issn: '0732-183X' },
  'Pediatrics': { name: 'Pediatrics (AAP)', journal: 'Pediatrics', aliases: ['pediatrics aap'], if: 8.0, quartile: 'Q1', sjr: 2.10, snip: 1.70, hIndex: 310, category: 'Pediatrics', publisher: 'American Academy of Pediatrics', issn: '0031-4005' },
  'Lancet Child Adolesc Health': { name: 'The Lancet Child & Adolescent Health', journal: 'Lancet Child Adolesc Health', aliases: ['lancet child'], if: 36.4, quartile: 'Q1', sjr: 6.20, snip: 2.90, hIndex: 85, category: 'Pediatrics', publisher: 'Elsevier', issn: '2352-4642' },

  'Bộ Y tế Việt Nam': { name: 'Khuyến cáo Cấp Quốc gia — Bộ Y tế Việt Nam', journal: 'Bộ Y tế Việt Nam', aliases: ['byt', 'bo y te', 'qđ-byt', 'quuyết định bộ y tế'], if: null, quartile: 'MOH', sjr: null, snip: null, hIndex: null, category: 'Hướng Dẫn Quốc Gia', publisher: 'Bộ Y tế Việt Nam', issn: 'N/A' }
};

export function getJournalMetrics(journalName?: string, studyObj?: any): any {
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

import { Study } from './guidelines-types';

export const SAMPLE_STUDIES: Study[] = [];

if (typeof window !== 'undefined') {
  window.JOURNAL_METRICS_DATABASE = JOURNAL_METRICS_DATABASE;
  window.getJournalMetrics = getJournalMetrics;
  window.CLINICAL_CONDITIONS = CLINICAL_CONDITIONS;
  window.DEFAULT_CLINICAL_CONDITIONS = CLINICAL_CONDITIONS;
  window.SAMPLE_STUDIES = [];

  window.SPECIALTIES = SPECIALTIES;
  window.SOURCE_TYPES = SOURCE_TYPES;
  window.DESIGNS = DESIGNS;
  window.IMPACTS = IMPACTS;
}
