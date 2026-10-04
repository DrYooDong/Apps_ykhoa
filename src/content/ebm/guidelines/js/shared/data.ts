/**
 * CliniPortal — EBM & Guidelines Database (TypeScript Module)
 */
import {
  SpecialtyMeta, SourceTypeMeta, DesignMeta,
  ImpactMeta, ClinicalConditionMeta, JournalMetric
} from './types';

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

export const JOURNAL_METRICS_DATABASE: Record<string, JournalMetric> = {
  'N Engl J Med': { name: 'The New England Journal of Medicine (NEJM)', journal: 'N Engl J Med', aliases: ['nejm', 'new england journal of medicine'], if: 158.5, quartile: 'Q1', sjr: 14.52, snip: 5.82, hIndex: 1150, category: 'General Medicine', publisher: 'Massachusetts Medical Society', issn: '0028-4793' },
  'NEJM': { name: 'The New England Journal of Medicine (NEJM)', journal: 'N Engl J Med', aliases: ['nejm', 'new england journal of medicine'], if: 158.5, quartile: 'Q1', sjr: 14.52, snip: 5.82, hIndex: 1150, category: 'General Medicine', publisher: 'Massachusetts Medical Society', issn: '0028-4793' },
  'Lancet': { name: 'The Lancet', journal: 'Lancet', aliases: ['the lancet'], if: 168.9, quartile: 'Q1', sjr: 15.68, snip: 6.12, hIndex: 850, category: 'General Medicine', publisher: 'Elsevier', issn: '0140-6736' },
  'JAMA': { name: 'JAMA - Journal of the American Medical Association', journal: 'JAMA', aliases: ['jama', 'journal of the american medical association'], if: 120.7, quartile: 'Q1', sjr: 9.85, snip: 4.95, hIndex: 720, category: 'General Medicine', publisher: 'American Medical Association', issn: '0098-7484' },
  'BMJ': { name: 'BMJ - British Medical Journal', journal: 'BMJ', aliases: ['british medical journal'], if: 105.7, quartile: 'Q1', sjr: 4.82, snip: 3.45, hIndex: 450, category: 'General Medicine', publisher: 'BMJ Publishing Group', issn: '0959-8138' },
  'Circulation': { name: 'Circulation (AHA)', journal: 'Circulation', aliases: ['circulation journal'], if: 37.8, quartile: 'Q1', sjr: 6.95, snip: 3.12, hIndex: 610, category: 'Cardiology', publisher: 'Lippincott Williams & Wilkins', issn: '0009-7322' },
  'Eur Heart J': { name: 'European Heart Journal (ESC)', journal: 'Eur Heart J', aliases: ['european heart journal', 'ehj'], if: 39.3, quartile: 'Q1', sjr: 7.21, snip: 3.45, hIndex: 420, category: 'Cardiology', publisher: 'Oxford University Press', issn: '0195-668X' },
  'J Am Coll Cardiol': { name: 'Journal of the American College of Cardiology (JACC)', journal: 'J Am Coll Cardiol', aliases: ['jacc', 'journal of the american college of cardiology'], if: 24.0, quartile: 'Q1', sjr: 5.42, snip: 2.85, hIndex: 480, category: 'Cardiology', publisher: 'Elsevier', issn: '0735-1097' },
  'Lancet Respir Med': { name: 'The Lancet Respiratory Medicine', journal: 'Lancet Respir Med', aliases: ['lancet respiratory medicine'], if: 38.7, quartile: 'Q1', sjr: 6.85, snip: 3.10, hIndex: 195, category: 'Pulmonology', publisher: 'Elsevier', issn: '2213-2600' },
  'Diabetes Care': { name: 'Diabetes Care (ADA)', journal: 'Diabetes Care', aliases: ['diabetes care'], if: 17.1, quartile: 'Q1', sjr: 4.12, snip: 2.35, hIndex: 380, category: 'Endocrinology', publisher: 'American Diabetes Association', issn: '0149-5992' },
  'Kidney Int': { name: 'Kidney International (ISN)', journal: 'Kidney Int', aliases: ['kidney international'], if: 19.6, quartile: 'Q1', sjr: 3.95, snip: 2.15, hIndex: 290, category: 'Nephrology', publisher: 'Elsevier', issn: '0085-2538' },
  'Blood': { name: 'Blood (ASH)', journal: 'Blood', aliases: ['blood journal'], if: 20.3, quartile: 'Q1', sjr: 4.65, snip: 2.45, hIndex: 490, category: 'Hematology', publisher: 'American Society of Hematology', issn: '0006-4971' },
  'Bộ Y tế Việt Nam': { name: 'Khuyến cáo Cấp Quốc gia — Bộ Y tế Việt Nam', journal: 'Bộ Y tế Việt Nam', aliases: ['byt', 'bo y te', 'qđ-byt', 'quuyết định bộ y tế'], if: null, quartile: 'MOH', sjr: null, snip: null, hIndex: null, category: 'Hướng Dẫn Quốc Gia', publisher: 'Bộ Y tế Việt Nam', issn: 'N/A' }
};

// Đồng bộ sang window để đảm bảo tương thích ngược 100% với các legacy scripts
if (typeof window !== 'undefined') {
  const win = window as any;
  win.SPECIALTIES = SPECIALTIES;
  win.SOURCE_TYPES = SOURCE_TYPES;
  win.DESIGNS = DESIGNS;
  win.IMPACTS = IMPACTS;
  win.CLINICAL_CONDITIONS = CLINICAL_CONDITIONS;
  win.DEFAULT_CLINICAL_CONDITIONS = CLINICAL_CONDITIONS;
  win.JOURNAL_METRICS_DATABASE = JOURNAL_METRICS_DATABASE;
}
