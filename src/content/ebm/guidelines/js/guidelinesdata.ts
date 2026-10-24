/**
 * CliniPortal 2.0 — Guidelines Metadata & Journal Registry (TypeScript)
 * Path: src/content/ebm/guidelines/guidelinesdata.ts
 */

import { SpecialtyMeta, SourceTypeMeta, DesignMeta, ImpactMeta, ClinicalConditionMeta } from './guidelines-types';

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
  cardio: { name: 'Tim mạch', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  pulmo: { name: 'Hô hấp', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  gi: { name: 'Tiêu hóa', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  endo: { name: 'Nội tiết', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  neuro: { name: 'Thần kinh', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  infect: { name: 'Truyền nhiễm', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  renal: { name: 'Thận học', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  rheum: { name: 'Cơ xương khớp', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  hema: { name: 'Huyết học', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  onco: { name: 'Ung thư', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  pedia: { name: 'Nhi khoa', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  obgyn: { name: 'Sản phụ khoa', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  icu: { name: 'Hồi sức tích cực', color: '#059669', bg: 'rgba(5, 150, 105, 0.08)' },
  derma: { name: 'Da liễu', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  ent: { name: 'Tai Mũi Họng', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  nutri: { name: 'Dinh dưỡng', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  allergy: { name: 'Dị ứng - Miễn dịch', color: '#e11d48', bg: 'rgba(225, 29, 72, 0.08)' }
};

export const SOURCE_TYPES: Record<string, SourceTypeMeta> = {
  'intl-study': { name: 'Nghiên cứu Quốc tế', color: '#475569', bg: 'rgba(71, 85, 105, 0.08)' },
  'intl-guideline': { name: 'Guideline Quốc tế', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  'vn-moh': { name: 'Bộ Y tế Việt Nam', color: '#059669', bg: 'rgba(5, 150, 105, 0.1)' },
  'vn-doh': { name: 'Sở Y tế Việt Nam', color: '#059669', bg: 'rgba(5, 150, 105, 0.08)' },
  'vn-association': { name: 'Hội chuyên khoa VN', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' }
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
  'practice-changing': { name: 'Practice-Changing', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
  'informative': { name: 'Informative', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.08)' },
  'early-signal': { name: 'Early Signal', color: '#475569', bg: 'rgba(71, 85, 105, 0.08)' },
  'negative': { name: 'Negative/Âm tính', color: '#64748b', bg: 'rgba(100, 116, 139, 0.08)' },
  'regulatory': { name: 'Regulatory', color: '#334155', bg: 'rgba(51, 65, 85, 0.08)' }
};

export const CLINICAL_CONDITIONS: Record<string, ClinicalConditionMeta> = {
  'heart-failure': { id: 'heart-failure', name: 'Suy tim (HF / AHF)', icd10: ["I42", "I50", "I50.1", "I50.2", "I50.3", "I50.4", "I50.9"], color: '#dc2626', bg: '#fef2f2', specialty: 'cardio' },
  'hypertension': { id: 'hypertension', name: 'Tăng huyết áp (THA)', icd10: ["I10", "I11", "I15", "O14"], color: '#0891b2', bg: '#ecfeff', specialty: 'cardio' },
  'af': { id: 'af', name: 'Rung nhĩ & Loạn nhịp (AF)', icd10: ["I48", "I48.0", "I48.1", "I48.2", "I48.9", "I49"], color: '#ea580c', bg: '#fff7ed', specialty: 'cardio' },
  'cad': { id: 'cad', name: 'Bệnh mạch vành & NMCT (CAD / ACS / STEMI)', icd10: ["I20", "I21", "I21.0", "I22", "I25", "I73.9"], color: '#b91c1c', bg: '#fff1f1', specialty: 'cardio' },
  'valvular-heart': { id: 'valvular-heart', name: 'Bệnh van tim & Viêm nội tâm mạc', icd10: ["I05", "I33", "I34", "I35", "I38"], color: '#be123c', bg: '#fff1f2', specialty: 'cardio' },
  'cardiogenic-shock': { id: 'cardiogenic-shock', name: 'Sốc tim & Ngừng tuần hoàn', icd10: ["I46", "I46.9", "R57.0"], color: '#e11d48', bg: '#fff1f2', specialty: 'cardio' },
  'syncope': { id: 'syncope', name: 'Ngất & Tụt HA tư thế', icd10: ["I95.1", "R55"], color: '#64748b', bg: '#f8fafc', specialty: 'cardio' },
  'vte-pe': { id: 'vte-pe', name: 'Huyết khối TM & Thuyên tắc phổi (VTE / PE)', icd10: ["I26", "I80", "I82"], color: '#9f1239', bg: '#fff1f2', specialty: 'cardio' },
  'cardiorenal-syndrome': { id: 'cardiorenal-syndrome', name: 'Hội chứng Tim Thận Chuyển hóa (CKM / CRS)', icd10: ["E11", "I12", "I13", "I50", "N18"], color: '#047857', bg: '#f0fdf4', specialty: 'cardio' },
  'copd': { id: 'copd', name: 'Bệnh phổi tắc nghẽn mạn (COPD)', icd10: ["J44", "J44.0", "J44.1", "J44.9"], color: '#0284c7', bg: '#f0f9ff', specialty: 'pulmo' },
  'asthma': { id: 'asthma', name: 'Hen phế quản (Asthma)', icd10: ["J45", "J45.0", "J45.9"], color: '#0d9488', bg: '#f0fdfa', specialty: 'pulmo' },
  'pneumonia': { id: 'pneumonia', name: 'Viêm phổi (CAP / HAP / VAP)', icd10: ["J13", "J15", "J18", "J18.9"], color: '#2563eb', bg: '#eff6ff', specialty: 'pulmo' },
  'interstitial-lung': { id: 'interstitial-lung', name: 'Bệnh phổi mô kẽ & Xơ phổi (ILD)', icd10: ["J84", "J84.1", "J84.9"], color: '#475569', bg: '#f8fafc', specialty: 'pulmo' },
  'tb': { id: 'tb', name: 'Lao phổi & Lao ngoài phổi (TB)', icd10: ["A15", "A15.0", "A16", "A17", "A18", "A19", "O98.0", "P37.0"], color: '#b45309', bg: '#fef3c7', specialty: 'pulmo' },
  'ards': { id: 'ards', name: 'Suy hô hấp cấp tiến triển (ARDS)', icd10: ["J80", "R09.2"], color: '#0369a1', bg: '#f0f9ff', specialty: 'pulmo' },
  'cirrhosis': { id: 'cirrhosis', name: 'Xơ gan, Cổ trướng & Tăng áp cửa', icd10: ["I85", "K70", "K70.3", "K74", "R18"], color: '#991b1b', bg: '#fef2f2', specialty: 'gi' },
  'masld-mash': { id: 'masld-mash', name: 'Bệnh gan thoái hóa mỡ (MASLD / MASH)', icd10: ["K75.8", "K76.0"], color: '#65a30d', bg: '#f7fee7', specialty: 'gi' },
  'dili': { id: 'dili', name: 'Tổn thương gan do thuốc (DILI)', icd10: ["K71", "K71.0", "K71.1", "K71.2", "K71.6", "K72.0"], color: '#dc2626', bg: '#fef2f2', specialty: 'gi' },
  'autoimmune-hepatitis': { id: 'autoimmune-hepatitis', name: 'Viêm gan tự miễn (AIH)', icd10: ["K75.4"], color: '#b91c1c', bg: '#fff1f1', specialty: 'gi' },
  'wilson': { id: 'wilson', name: 'Bệnh Wilson (Thoái hóa gan nhân bèo)', icd10: ["E83.0", "E83.01"], color: '#b45309', bg: '#fef3c7', specialty: 'gi' },
  'cystic-hepatic-lesions': { id: 'cystic-hepatic-lesions', name: 'Tổn thương nang gan & Kén sán lá gan', icd10: ["B67.0", "K76.8"], color: '#15803d', bg: '#f0fdf4', specialty: 'gi' },
  'gerd-peptic': { id: 'gerd-peptic', name: 'Trào ngược GERD & Loét DDTT', icd10: ["K21", "K25", "K26", "K27"], color: '#c2410c', bg: '#fff7ed', specialty: 'gi' },
  'biliary-tract': { id: 'biliary-tract', name: 'Bệnh đường mật & Viêm tụy cấp (TG18 / IAP)', icd10: ["K80", "K81", "K81.0", "K83.0", "K85"], color: '#059669', bg: '#ecfdf5', specialty: 'gi' },
  'ibd': { id: 'ibd', name: 'Viêm ruột (IBD) & Ruột kích thích (IBS)', icd10: ["K50", "K51", "K58"], color: '#7e22ce', bg: '#faf5ff', specialty: 'gi' },
  'ugib': { id: 'ugib', name: 'Xuất huyết tiêu hóa trên (UGIB)', icd10: ["I85.0", "K25.0", "K92.0", "K92.2"], color: '#b91c1c', bg: '#fff1f1', specialty: 'gi' },
  'gut-health': { id: 'gut-health', name: 'Sức khỏe đường ruột & Hệ vi sinh', icd10: ["K58.0", "K59.0", "K63.8"], color: '#16a34a', bg: '#f0fdf4', specialty: 'gi' },
  'acute-gastroenteritis': { id: 'acute-gastroenteritis', name: 'Viêm dạ dày ruột cấp (AGE)', icd10: ["A09", "K52.9"], color: '#d97706', bg: '#fffbeb', specialty: 'gi' },
  'hepatitis-b': { id: 'hepatitis-b', name: 'Viêm gan B (HBV)', icd10: ["B16", "B18.0", "B18.1"], color: '#ca8a04', bg: '#fefce8', specialty: 'infect' },
  'hepatitis-c': { id: 'hepatitis-c', name: 'Viêm gan C (HCV)', icd10: ["B17.1", "B18.2"], color: '#16a34a', bg: '#f0fdf4', specialty: 'infect' },
  'flu': { id: 'flu', name: 'Cúm mùa & Vi rút hô hấp (Influenza / RSV)', icd10: ["J09", "J10", "J11", "J12"], color: '#2563eb', bg: '#eff6ff', specialty: 'infect' },
  'covid19': { id: 'covid19', name: 'COVID-19', icd10: ["U07.1", "U07.2"], color: '#6366f1', bg: '#e0e7ff', specialty: 'infect' },
  'hemorrhagic-fever': { id: 'hemorrhagic-fever', name: 'Sốt xuất huyết Dengue & Vi rút sốt xuất huyết', icd10: ["A90", "A91", "A98.3", "A98.4", "A98.5", "A98.8"], color: '#be185d', bg: '#fce7f3', specialty: 'infect' },
  'measles': { id: 'measles', name: 'Sởi & Ngoại ban vi rút', icd10: ["B05", "B05.9"], color: '#e11d48', bg: '#fff1f2', specialty: 'infect' },
  'hfmd': { id: 'hfmd', name: 'Tay chân miệng (TCM)', icd10: ["B08.4"], color: '#ea580c', bg: '#fff7ed', specialty: 'infect' },
  'mpox': { id: 'mpox', name: 'Đậu mùa khỉ (Mpox)', icd10: ["B04"], color: '#a16207', bg: '#fefce8', specialty: 'infect' },
  'hantavirus': { id: 'hantavirus', name: 'Vi rút Hanta (HFRS / HPS)', icd10: ["A98.5", "B33.4"], color: '#be123c', bg: '#fff1f2', specialty: 'infect' },
  'invasive-fungal': { id: 'invasive-fungal', name: 'Nhiễm nấm xâm lấn & Aspergillus', icd10: ["B37.7", "B44", "B45", "B49"], color: '#854d0e', bg: '#fefce8', specialty: 'infect' },
  'malaria': { id: 'malaria', name: 'Sốt rét (Malaria)', icd10: ["B50", "B51", "B52", "B54"], color: '#d97706', bg: '#fffbeb', specialty: 'infect' },
  'meningitis': { id: 'meningitis', name: 'Viêm màng não & Viêm não', icd10: ["A39", "G00", "G01", "G02", "G03"], color: '#7c3aed', bg: '#faf5ff', specialty: 'infect' },
  'brain-abscess': { id: 'brain-abscess', name: 'Áp xe não & Nhiễm trùng TKTW', icd10: ["G06", "G06.0", "G07"], color: '#6d28d9', bg: '#f5f3ff', specialty: 'infect' },
  'diphtheria': { id: 'diphtheria', name: 'Bạch hầu (Diphtheria)', icd10: ["A36", "A36.0", "A36.9"], color: '#b45309', bg: '#fef3c7', specialty: 'infect' },
  'hiv-aids': { id: 'hiv-aids', name: 'HIV/AIDS & Nhiễm trùng cơ hội', icd10: ["B20", "B24", "Z21"], color: '#e11d48', bg: '#fff1f2', specialty: 'infect' },
  'infectious-diarrhea': { id: 'infectious-diarrhea', name: 'Tiêu chảy nhiễm trùng cấp', icd10: ["A04", "A08", "A09"], color: '#d97706', bg: '#fffbeb', specialty: 'infect' },
  'ams-resistance': { id: 'ams-resistance', name: 'Quản lý KS (AMS), Vi sinh & VK đa kháng', icd10: ["A49.02", "B95", "B96", "U82", "U83", "Y40", "Z16", "Z88.0"], color: '#047857', bg: '#f0fdf4', specialty: 'infect' },
  'uti': { id: 'uti', name: 'Nhiễm khuẩn tiết niệu (UTI)', icd10: ["N10", "N30", "N39.0"], color: '#1d4ed8', bg: '#eff6ff', specialty: 'infect' },
  'gonorrhea': { id: 'gonorrhea', name: 'Bệnh lậu (Gonorrhea / STI)', icd10: ["A54", "A54.0", "A54.1", "A54.2", "A54.3", "A54.4", "A54.6", "A54.8"], color: '#0284c7', bg: '#f0f9ff', specialty: 'infect' },
  'syphilis': { id: 'syphilis', name: 'Bệnh giang mai (Syphilis / STI)', icd10: ["A51", "A51.0", "A51.1", "A51.3", "A51.5", "A52", "A53", "A50"], color: '#0d9488', bg: '#f0fdfa', specialty: 'infect' },
  'ssti': { id: 'ssti', name: 'Nhiễm khuẩn da & mô mềm (SSTI / Viêm mô tế bào)', icd10: ["A46", "L02", "L03", "L08"], color: '#e11d48', bg: '#fff1f2', specialty: 'infect' },
  'iai': { id: 'iai', name: 'Nhiễm khuẩn ổ bụng & Áp xe (IAI)', icd10: ["K35", "K65", "K81", "K83"], color: '#059669', bg: '#ecfdf5', specialty: 'infect' },
  'icu': { id: 'icu', name: 'Nhiễm trùng Hồi sức, Sốc NK & Sepsis', icd10: ["A41", "A41.9", "R57.2", "R65.2"], color: '#059669', bg: '#ecfdf5', specialty: 'icu' },
  'emergency-admission': { id: 'emergency-admission', name: 'Cấp cứu & Tiếp nhận bệnh nặng', icd10: ["R68.8", "Z76.8"], color: '#dc2626', bg: '#fef2f2', specialty: 'icu' },
  'aki': { id: 'aki', name: 'Tổn thương thận cấp & Lọc máu (AKI / CRRT)', icd10: ["N17", "N17.0", "N17.9", "Z99.2"], color: '#047857', bg: '#f0fdf4', specialty: 'renal' },
  'diabetes-t2d': { id: 'diabetes-t2d', name: 'Đái tháo đường Típ 2 (T2D & Biến chứng)', icd10: ["E11", "E11.2", "E11.4", "E11.9", "G63.2"], color: '#7c3aed', bg: '#faf5ff', specialty: 'endo' },
  'diabetes-t1d': { id: 'diabetes-t1d', name: 'Đái tháo đường Típ 1 (T1D)', icd10: ["E10", "E10.1", "E10.9"], color: '#6d28d9', bg: '#f5f3ff', specialty: 'endo' },
  'thyroid': { id: 'thyroid', name: 'Bão giáp & Bệnh tuyến giáp', icd10: ["E02", "E03", "E05", "E05.5"], color: '#0284c7', bg: '#f0f9ff', specialty: 'endo' },
  'dyslipidemia': { id: 'dyslipidemia', name: 'Rối loạn lipid máu & Xơ vữa', icd10: ["E78", "E78.0", "E78.2", "E78.5"], color: '#d97706', bg: '#fffbeb', specialty: 'endo' },
  'obesity': { id: 'obesity', name: 'Béo phì & Hội chứng chuyển hóa', icd10: ["E66", "E66.0", "E66.9", "E88.81"], color: '#9a3412', bg: '#fff7ed', specialty: 'endo' },
  'clinical-nutrition': { id: 'clinical-nutrition', name: 'Dinh dưỡng lâm sàng & Tiết chế', icd10: ["E43", "E44", "E46", "Z71.3"], color: '#16a34a', bg: '#f0fdf4', specialty: 'nutri' },
  'ckd': { id: 'ckd', name: 'Bệnh thận mạn & Thiếu máu thận (CKD)', icd10: ["D63.1", "N18", "N18.3", "N18.5", "N18.9"], color: '#059669', bg: '#ecfdf5', specialty: 'renal' },
  'nephrotic': { id: 'nephrotic', name: 'Hội chứng thận hư & Viêm cầu thận', icd10: ["N00", "N03", "N04"], color: '#0f766e', bg: '#f0fdfa', specialty: 'renal' },
  'bph-luts': { id: 'bph-luts', name: 'Tăng sinh tuyến tiền liệt (BPH / LUTS)', icd10: ["N40", "N40.1", "R39.1"], color: '#4338ca', bg: '#eef2ff', specialty: 'renal' },
  'stroke': { id: 'stroke', name: 'Đột quỵ não & Sa sút trí tuệ', icd10: ["F03", "G45", "I61", "I63", "I64"], color: '#9333ea', bg: '#faf5ff', specialty: 'neuro' },
  'epilepsy': { id: 'epilepsy', name: 'Động kinh & Co giật', icd10: ["G40", "G40.9", "R56"], color: '#a855f7', bg: '#f3e8ff', specialty: 'neuro' },
  'headache-migraine': { id: 'headache-migraine', name: 'Đau đầu & Migraine', icd10: ["G43", "G44", "G44.2"], color: '#6b21a8', bg: '#faf5ff', specialty: 'neuro' },
  'neuro-emergencies': { id: 'neuro-emergencies', name: 'Cấp cứu Thần kinh & Chấn thương sọ não', icd10: ["G71.0", "I62", "S06", "S06.4"], color: '#7e22ce', bg: '#faf5ff', specialty: 'neuro' },
  'gout': { id: 'gout', name: 'Gút & Tăng acid uric máu', icd10: ["E79.0", "M10", "M10.0"], color: '#b91c1c', bg: '#fef2f2', specialty: 'rheum' },
  'ra': { id: 'ra', name: 'Viêm khớp dạng thấp (RA)', icd10: ["M05", "M06"], color: '#c05621', bg: '#fffaf0', specialty: 'rheum' },
  'osteoporosis': { id: 'osteoporosis', name: 'Loãng xương & Sức khỏe xương', icd10: ["E55.9", "M80", "M81"], color: '#71717a', bg: '#f4f4f5', specialty: 'rheum' },
  'lupus-sle': { id: 'lupus-sle', name: 'Lupus ban đỏ hệ thống (SLE)', icd10: ["M32", "M32.1", "N08.5"], color: '#be185d', bg: '#fce7f3', specialty: 'rheum' },
  'solid-cancers': { id: 'solid-cancers', name: 'Ung thư tạng (Phổi / Gan / Vú / ĐTT / CTC)', icd10: ["C18", "C22", "C34", "C50", "C53", "D59.5"], color: '#be123c', bg: '#fff1f2', specialty: 'onco' },
  'hemangioma': { id: 'hemangioma', name: 'U máu & Dị dạng mạch (ISSVA)', icd10: ["D18", "D18.0", "Q28"], color: '#db2777', bg: '#fdf2f8', specialty: 'pedia' },
  'uterine-fibroids': { id: 'uterine-fibroids', name: 'U xơ tử cung & Sản Phụ khoa', icd10: ["D25", "D25.9", "N80", "N92.0", "O14", "O72"], color: '#e11d48', bg: '#fff1f2', specialty: 'obgyn' },
  'anaphylaxis': { id: 'anaphylaxis', name: 'Phản vệ & Dị ứng nọc (Anaphylaxis / HVA)', icd10: ["T78", "T78.0", "T78.2", "T78.4", "X23"], color: '#e11d48', bg: '#fff1f2', specialty: 'derma' }
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
  'Cureus': { name: 'Cureus Journal of Medical Science', journal: 'Cureus', aliases: ['cureus', 'cureus journal of medical science'], if: 1.2, quartile: 'Q3', sjr: 0.38, snip: 0.65, hIndex: 55, category: 'General Medicine', publisher: 'Springer Nature', issn: '2168-8184' },

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
  'J Gastroenterol': { name: 'Journal of Gastroenterology (JSGE)', journal: 'J Gastroenterol', aliases: ['j gastroenterol', 'journal of gastroenterology', 'jsge'], if: 6.2, quartile: 'Q1', sjr: 1.85, snip: 1.45, hIndex: 145, category: 'Gastroenterology', publisher: 'Springer', issn: '0944-1174' },

  'Diabetes Care': { name: 'Diabetes Care (ADA)', journal: 'Diabetes Care', aliases: ['diabetes care'], if: 17.1, quartile: 'Q1', sjr: 4.12, snip: 2.35, hIndex: 380, category: 'Endocrinology', publisher: 'American Diabetes Association', issn: '0149-5992' },
  'Lancet Diabetes Endocrinol': { name: 'The Lancet Diabetes & Endocrinology', journal: 'Lancet Diabetes Endocrinol', aliases: ['lancet diabetes'], if: 44.0, quartile: 'Q1', sjr: 7.80, snip: 3.80, hIndex: 165, category: 'Endocrinology', publisher: 'Elsevier', issn: '2213-8587' },
  'JCEM': { name: 'The Journal of Clinical Endocrinology & Metabolism', journal: 'JCEM', aliases: ['jcem'], if: 5.8, quartile: 'Q1', sjr: 1.80, snip: 1.40, hIndex: 340, category: 'Endocrinology', publisher: 'Oxford University Press', issn: '0021-972X' },
  'Kidney Int': { name: 'Kidney International (ISN)', journal: 'Kidney Int', aliases: ['kidney international'], if: 19.6, quartile: 'Q1', sjr: 3.95, snip: 2.15, hIndex: 290, category: 'Nephrology', publisher: 'Elsevier', issn: '0085-2538' },
  'JASN': { name: 'Journal of the American Society of Nephrology (JASN)', journal: 'JASN', aliases: ['jasn'], if: 12.9, quartile: 'Q1', sjr: 3.40, snip: 2.05, hIndex: 285, category: 'Nephrology', publisher: 'Wolters Kluwer', issn: '1046-6673' },

  'Blood': { name: 'Blood (ASH)', journal: 'Blood', aliases: ['blood journal'], if: 20.3, quartile: 'Q1', sjr: 4.65, snip: 2.45, hIndex: 490, category: 'Hematology', publisher: 'American Society of Hematology', issn: '0006-4971' },
  'J Clin Oncol': { name: 'Journal of Clinical Oncology (JCO/ASCO)', journal: 'J Clin Oncol', aliases: ['jco'], if: 45.3, quartile: 'Q1', sjr: 9.15, snip: 4.10, hIndex: 560, category: 'Oncology', publisher: 'ASCO', issn: '0732-183X' },
  'Pediatrics': { name: 'Pediatrics (AAP)', journal: 'Pediatrics', aliases: ['pediatrics aap'], if: 8.0, quartile: 'Q1', sjr: 2.10, snip: 1.70, hIndex: 310, category: 'Pediatrics', publisher: 'American Academy of Pediatrics', issn: '0031-4005' },
  'Lancet Child Adolesc Health': { name: 'The Lancet Child & Adolescent Health', journal: 'Lancet Child Adolesc Health', aliases: ['lancet child'], if: 36.4, quartile: 'Q1', sjr: 6.20, snip: 2.90, hIndex: 85, category: 'Pediatrics', publisher: 'Elsevier', issn: '2352-4642' },
  'Allergy': { name: 'Allergy (European Journal of Allergy and Clinical Immunology - EAACI)', journal: 'Allergy', aliases: ['allergy', 'allergy journal', 'eaaci allergy'], if: 12.4, quartile: 'Q1', sjr: 3.45, snip: 2.30, hIndex: 215, category: 'Allergy & Immunology', publisher: 'Wiley-Blackwell', issn: '0105-4538' },

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
import { KHO_GUIDELINES_STATIC } from './kho-guidelines-registry';

export const SAMPLE_STUDIES: Study[] = KHO_GUIDELINES_STATIC;

if (typeof window !== 'undefined') {
  window.JOURNAL_METRICS_DATABASE = JOURNAL_METRICS_DATABASE;
  window.getJournalMetrics = getJournalMetrics;
  window.CLINICAL_CONDITIONS = CLINICAL_CONDITIONS;
  window.DEFAULT_CLINICAL_CONDITIONS = CLINICAL_CONDITIONS;
  window.SAMPLE_STUDIES = SAMPLE_STUDIES;

  window.SPECIALTIES = SPECIALTIES;
  window.SOURCE_TYPES = SOURCE_TYPES;
  window.DESIGNS = DESIGNS;
  window.IMPACTS = IMPACTS;
}
