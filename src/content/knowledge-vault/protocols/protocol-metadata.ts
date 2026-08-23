/**
 * CliniPortal 2.0 — Clinical Protocols Metadata & Category Registry
 * Path: src/content/protocols/protocol-metadata.ts
 */

export interface ProtocolSpecialtyMeta {
  key: string;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  bg: string;
  description: string;
}

export interface TriageMeta {
  key: string;
  name: string;
  badgeClass: string;
  color: string;
  bg: string;
  icon: string;
}

export const PROTOCOL_SPECIALTIES: Record<string, ProtocolSpecialtyMeta> = {
  all: {
    key: 'all',
    name: 'Tất cả Phác đồ',
    nameEn: 'All Protocols',
    icon: 'fa-solid fa-layer-group',
    color: 'var(--color-primary, #0284c7)',
    bg: 'rgba(2, 132, 199, 0.1)',
    description: 'Toàn bộ kho phác đồ điều trị đa chuyên khoa chuẩn EBM',
  },
  emergency: {
    key: 'emergency',
    name: 'Hồi sức - Cấp cứu',
    nameEn: 'Emergency & Critical Care',
    icon: 'fa-solid fa-truck-medical',
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.1)',
    description: 'Hồi sức chống sốc, cấp cứu ngừng tuần hoàn, ngộ độc cấp và thông khí nhân tạo',
  },
  cardio: {
    key: 'cardio',
    name: 'Tim mạch',
    nameEn: 'Cardiology',
    icon: 'fa-solid fa-heart-pulse',
    color: '#dc2626',
    bg: 'rgba(220, 38, 38, 0.1)',
    description: 'Hội chứng vành cấp, suy tim, tăng huyết áp, rối loạn nhịp tim',
  },
  infectious: {
    key: 'infectious',
    name: 'Truyền nhiễm & Vi sinh',
    nameEn: 'Infectious Diseases',
    icon: 'fa-solid fa-virus',
    color: '#0d9488',
    bg: 'rgba(13, 148, 136, 0.1)',
    description: 'Sốt xuất huyết Dengue, Sepsis, Viêm gan virus, Nhiễm trùng đa kháng',
  },
  pulmo: {
    key: 'pulmo',
    name: 'Hô hấp',
    nameEn: 'Pulmonology',
    icon: 'fa-solid fa-lungs',
    color: '#2563eb',
    bg: 'rgba(37, 99, 235, 0.1)',
    description: 'Cơn hen cấp, đợt cấp COPD, viêm phổi cộng đồng, ARDS, thuyên tắc phổi',
  },
  gi: {
    key: 'gi',
    name: 'Tiêu hóa - Gan mật',
    nameEn: 'Gastroenterology & Hepatology',
    icon: 'fa-solid fa-stethoscope',
    color: '#ca8a04',
    bg: 'rgba(202, 138, 4, 0.1)',
    description: 'Xuất huyết tiêu hóa, xơ gan mất bù, viêm tụy cấp, IBD',
  },
  endo: {
    key: 'endo',
    name: 'Nội tiết & Chuyển hóa',
    nameEn: 'Endocrinology & Metabolism',
    icon: 'fa-solid fa-dna',
    color: '#7c3aed',
    bg: 'rgba(124, 58, 237, 0.1)',
    description: 'Đái tháo đường, toan ceton DKA, tăng áp lực thẩm thấu HHS, bão giáp',
  },
  renal: {
    key: 'renal',
    name: 'Thận - Tiết niệu',
    nameEn: 'Nephrology & Urology',
    icon: 'fa-solid fa-kidneys',
    color: '#0891b2',
    bg: 'rgba(8, 145, 178, 0.1)',
    description: 'Tổn thương thận cấp AKI, bệnh thận mạn CKD, lọc máu liên tục CRRT',
  },
  neuro: {
    key: 'neuro',
    name: 'Thần kinh',
    nameEn: 'Neurology',
    icon: 'fa-solid fa-brain',
    color: '#c026d3',
    bg: 'rgba(192, 38, 211, 0.1)',
    description: 'Đột quỵ thiếu máu cấp, xuất huyết não, trạng thái động kinh, viêm màng não',
  },
  pediatrics: {
    key: 'pediatrics',
    name: 'Nhi khoa',
    nameEn: 'Pediatrics',
    icon: 'fa-solid fa-child',
    color: '#16a34a',
    bg: 'rgba(22, 163, 74, 0.1)',
    description: 'Sốt co giật, tay chân miệng, tiêu chảy cấp, viêm tiểu phế quản',
  },
};

export const TRIAGE_LEVELS: Record<string, TriageMeta> = {
  emergency: {
    key: 'emergency',
    name: 'Cấp cứu Tối khẩn',
    badgeClass: 'badge-danger',
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.15)',
    icon: 'fa-solid fa-bell',
  },
  inpatient: {
    key: 'inpatient',
    name: 'Điều trị Nội trú',
    badgeClass: 'badge-warning',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.15)',
    icon: 'fa-solid fa-bed-pulse',
  },
  outpatient: {
    key: 'outpatient',
    name: 'Điều trị Ngoại trú',
    badgeClass: 'badge-success',
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.15)',
    icon: 'fa-solid fa-house-medical',
  },
};
