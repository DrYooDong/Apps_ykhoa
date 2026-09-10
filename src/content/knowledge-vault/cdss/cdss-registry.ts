/**
 * CliniPortal CDSS — Module Registry
 * Path: src/content/knowledge-vault/cdss/cdss-registry.ts
 */

import { CDSSModuleMeta } from './cdss-types';

export const CDSS_MODULES: CDSSModuleMeta[] = [
  {
    id: 'cdss-dengue-fluid',
    slug: 'dengue',
    title: 'Phác Đồ Dịch Truyền & Chống Sốc SXHD Dengue (Bộ Y Tế 2023)',
    titleEn: 'Dengue Fluid Resuscitation & Shock Management CDSS',
    shortDesc: 'Tự động tính cân nặng hiệu chỉnh CDC 2014, bảng kế hoạch cọc dịch 4 cột động học và liều vận mạch Dopamin/Noradrenalin bơm tiêm điện 50ml.',
    category: 'infectious',
    categoryName: 'Truyền nhiễm & Vi sinh',
    version: '2.0.0 (BYT 2023)',
    updatedAt: '2026-09-08',
    author: 'CliniPortal CDSS Squad & BYT QĐ 2760/QĐ-BYT',
    guidelineSource: 'Quyết định số 2760/QĐ-BYT ngày 04/07/2023 của Bộ Y tế Việt Nam',
    icd10: ['A97', 'A97.0', 'A97.1', 'A97.2', 'A97.9'],
    icon: 'fa-solid fa-droplet',
    badge: 'Bộ Y Tế 2023',
    isStandalone: true,
    standaloneUrl: 'dengue/index.html'
  },
  {
    id: 'cdss-ecg-analysis',
    slug: 'ecg',
    title: 'Phân Tích Điện Tâm Đồ 12 Chuyển Đạo & Hỗ Trợ Chẩn Đoán ECG Master',
    titleEn: '12-Lead ECG Waveform Analysis & Diagnostic Assistant CDSS',
    shortDesc: 'Bộ phân tích điện tâm đồ 12 đạo trình trực quan trên canvas độ phân giải cao: 21 ca bệnh lâm sàng điển hình, đo đạc thước Caliper điện tử, cẩm nang 10 bước BS Nguyễn Tôn Kinh Thi & ECG Made Easy, đo trục điện tim, QT/QTc, STEMI định khu và thuật toán Brugada.',
    category: 'cardiology',
    categoryName: 'Tim mạch',
    version: '2.5.0 (21 Ca Lâm Sàng)',
    updatedAt: '2026-09-09',
    author: 'CliniPortal ECG Master Squad & Dr. Atul Luthra',
    guidelineSource: 'AHA/ACC/HRS Guidelines for the Interpretation of the 12-Lead Electrocardiogram & BS Nguyễn Tôn Kinh Thi',
    icd10: ['I21', 'I47', 'I48', 'I49', 'R94.3'],
    icon: 'fa-solid fa-heart-pulse',
    badge: '21 Ca Lâm Sàng + Caliper',
    isStandalone: true,
    standaloneUrl: 'ecg/index.html'
  },
  {
    id: 'cdss-abg-pro',
    slug: 'abg',
    title: 'Phân Tích Khí Máu Động Mạch & Xử Trí Lâm Sàng (ABG Pro)',
    titleEn: 'Arterial Blood Gas Analysis & Acid-Base Clinical Decision Support',
    shortDesc: 'Đánh giá 6 bước rối loạn toan kiềm, 24 ca lâm sàng chuyên sâu, Nomogram Siggaard-Andersen tương tác, 3 cây quyết định trao đổi khí & GOLDMARK, cẩm nang Test Allen và kỹ thuật lấy máu động mạch.',
    category: 'respiratory',
    categoryName: 'Hô hấp & Cấp cứu',
    version: '2.5.0 (24 Ca Lâm Sàng + Nomogram)',
    updatedAt: '2026-09-09',
    author: 'CliniPortal Critical Care Squad & EBM Guidelines',
    guidelineSource: 'Hennessey & Japp / Pierre & Ranson ABG Interpretation Guidelines / Arterial Blood Gases Made Easy',
    icd10: ['E87.2', 'E87.3', 'J96', 'E10.1', 'R06.0'],
    icon: 'fa-solid fa-lungs',
    badge: '24 Ca + Nomogram + Cây Quyết Định',
    isStandalone: true,
    standaloneUrl: 'abg/index.html'
  },
  {
    id: 'cdss-radai-xray',
    slug: 'xray',
    title: 'Phân Tích X-Quang Ngực & Bụng Thông Minh (RadAI Analyzer)',
    titleEn: 'Intelligent Chest & Abdominal Radiography PACS CDSS',
    shortDesc: 'Mô phỏng trạm đọc PACS số hóa: phát hiện đông đặc, tràn khí, tràn dịch, bóng tim to, mức nước-hơi tắc ruột, liềm hơi dưới hoành và xuất kết luận hình ảnh SOAP.',
    category: 'radiology',
    categoryName: 'Chẩn đoán hình ảnh',
    version: '2.0.0',
    updatedAt: '2026-09-08',
    author: 'CliniPortal RadAI Squad',
    guidelineSource: 'ACR Appropriateness Criteria & Radiology Clinical Decision Rules',
    icd10: ['J18', 'J98.1', 'J90', 'K56', 'R91'],
    icon: 'fa-solid fa-x-ray',
    badge: 'PACS Workstation',
    isStandalone: true,
    standaloneUrl: 'xray/index.html'
  },
  {
    id: 'cdss-hepa-biochem',
    slug: 'hepa',
    title: 'Phân Tích Sinh Hóa Gan & Quyết Định Lâm Sàng (HepaCDSS)',
    titleEn: 'Liver Biochemistry & Clinical Decision Support System',
    shortDesc: 'Phân tích sinh hóa gan chuẩn ACG, WHO: lưu đồ tiếp cận, tính tỷ số R-ratio, De Ritis, FIB-4, APRI, phân tầng viêm gan virus, xơ gan Child-Pugh, MELD-Na và tổn thương gan do thuốc (DILI).',
    category: 'gastroenterology',
    categoryName: 'Tiêu hóa & Gan mật',
    version: '2.0.0',
    updatedAt: '2026-09-08',
    author: 'CliniPortal HepaCDSS Squad & ACG Guidelines',
    guidelineSource: 'ACG Clinical Guideline: Evaluation of Abnormal Liver Chemistries (Am J Gastroenterol 2017)',
    icd10: ['K71', 'K72', 'K73', 'K74', 'K76', 'B18'],
    icon: 'fa-solid fa-virus',
    badge: 'ACG & WHO Standard',
    isStandalone: true,
    standaloneUrl: 'hepa/index.html'
  },
  {
    id: 'cdss-neuro-exam',
    slug: 'neuro',
    title: 'Thần Kinh Lâm Sàng & Mô Phỏng Y Khoa (NeuroExam Pro)',
    titleEn: 'Clinical Neurological Examination & Simulation CDSS',
    shortDesc: 'Nền tảng khám thần kinh chuyên sâu & mô phỏng động 2D/3D: 5 loại thoát vị não & tam chứng Cushing 3D, vận nhãn III/IV/VI, phản xạ đồng tử, khoanh da C2-S5, 6 dáng đi, cây phân loại rối loạn vận động Shibasaki, hội chứng thân não bắt chéo & một rưỡi, quy trình cấp cứu hôn mê & Japan Coma Scale (JCS 3-3-9), thang điểm NIHSS/ASPECTS và ngân hàng kinh nghiệm lâm sàng.',
    category: 'neurology',
    categoryName: 'Thần kinh & Đột quỵ',
    version: '2.5.0 (Cấp Cứu & Mô Phỏng Động)',
    updatedAt: '2026-09-10',
    author: 'CliniPortal NeuroExam Squad',
    guidelineSource: 'AHA/ASA Guidelines for Acute Ischemic Stroke & Campbell Neurologic Exam',
    icd10: ['I63', 'I61', 'G40', 'G45', 'R40'],
    icon: 'fa-solid fa-brain',
    badge: 'Bản Nâng Cấp 2.5: 3D + Thân Não + JCS + Rối Loạn Vận Động',
    isStandalone: true,
    standaloneUrl: 'neuro/index.html'
  }
];

export function getCDSSModuleById(id: string): CDSSModuleMeta | undefined {
  return CDSS_MODULES.find(m => m.id === id);
}

export function getCDSSModuleBySlug(slug: string): CDSSModuleMeta | undefined {
  return CDSS_MODULES.find(m => m.slug === slug);
}
