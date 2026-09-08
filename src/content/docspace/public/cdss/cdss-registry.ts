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
    title: 'Phân Tích Điện Tâm Đồ 12 Chuyển Đạo & Hỗ Trợ Chẩn Đoán ECG',
    titleEn: '12-Lead ECG Waveform Analysis & Diagnostic Assistant CDSS',
    shortDesc: 'Bộ phân tích điện tâm đồ 12 đạo trình trực quan trên canvas độ phân giải cao: đo đạc sóng P-QRS-T, trục điện tim, QT/QTc, phân tích hội chứng vành cấp STEMI/NSTEMI và loạn nhịp tim.',
    category: 'cardiology',
    categoryName: 'Tim mạch',
    version: '2.1.0',
    updatedAt: '2026-09-08',
    author: 'CliniPortal ECG Master Squad',
    guidelineSource: 'AHA/ACC/HRS Guidelines for the Interpretation of the 12-Lead Electrocardiogram',
    icd10: ['I21', 'I47', 'I48', 'I49', 'R94.3'],
    icon: 'fa-solid fa-heart-pulse',
    badge: 'Interactive Canvas',
    isStandalone: true,
    standaloneUrl: 'ecg/index.html'
  },
  {
    id: 'cdss-abg-pro',
    slug: 'abg',
    title: 'Phân Tích Khí Máu Động Mạch & Xử Trí Lâm Sàng (ABG Pro)',
    titleEn: 'Arterial Blood Gas Analysis & Acid-Base Clinical Decision Support',
    shortDesc: 'Đánh giá 6 bước rối loạn toan kiềm, Anion Gap hiệu chỉnh Albumin, Delta-Delta, PaO2/FiO2 ARDS Berlin, phác đồ cấp cứu DKA/COPD và kết nối SOAP DocSpace.',
    category: 'respiratory',
    categoryName: 'Hô hấp & Cấp cứu',
    version: '2.0.0',
    updatedAt: '2026-09-08',
    author: 'CliniPortal Critical Care Squad & EBM Guidelines',
    guidelineSource: 'Hennessey & Japp / Pierre & Ranson ABG Interpretation Guidelines',
    icd10: ['E87.2', 'E87.3', 'J96', 'E10.1', 'R06.0'],
    icon: 'fa-solid fa-lungs',
    badge: 'Cấp Cứu & Hồi Sức',
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
  }
];

export function getCDSSModuleById(id: string): CDSSModuleMeta | undefined {
  return CDSS_MODULES.find(m => m.id === id);
}

export function getCDSSModuleBySlug(slug: string): CDSSModuleMeta | undefined {
  return CDSS_MODULES.find(m => m.slug === slug);
}
