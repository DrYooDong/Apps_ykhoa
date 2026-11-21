/**
 * CliniPortal — Clinical Approach Subsystem (Tiếp Cận Lâm Sàng) Types
 * Path: src/content/basic-medical/approach/types/approach.types.ts
 *
 * Định nghĩa cấu trúc dữ liệu cho phân hệ Tiếp Cận Lâm Sàng (BMS-TC)
 * Tổ chức theo 13 Chuyên khoa, khung bài học 9 mục chuẩn EBM 2026
 */

export type ApproachUrgency = 'emergent' | 'urgent' | 'routine';

export type ApproachLessonStatus = 'published' | 'draft';

export interface ApproachLessonSection {
  id: string;
  number: number;
  title: string;
  icon?: string;
}

export interface ApproachCrossLink {
  label: string;
  hash: string;
  module: 'physiology' | 'ccbs' | 'biochemistry' | 'antibiotics' | 'handbook' | 'guideline';
}

export interface ApproachLesson {
  id: string;
  code: string;
  slug: string;
  title: string;
  specialtyNumber: number;
  specialtyKey: string;
  specialtyTitle: string;
  lessonNumber: number;
  order: number;
  description: string;
  estimatedMinutes: number;
  urgency: ApproachUrgency;
  status: ApproachLessonStatus;
  hasVaultSource: boolean;
  vaultFile?: string;
  tags: string[];
  keyTakeaway: string;
  redFlagsPreview?: string;
  crossLinks?: ApproachCrossLink[];
  sections?: ApproachLessonSection[];
  isGoldenTemplate?: boolean;
}

export interface ApproachSpecialty {
  id: string;
  number: number;
  key: string;
  codePrefix: string;
  title: string;
  shortTitle: string;
  icon: string;
  color: string;
  bgColor?: string;
  badge: string;
  description: string;
  clinicalObjective: string;
  lessons: ApproachLesson[];
}

export interface ApproachMdxFrontmatter {
  title: string;
  slug: string;
  code: string;
  specialty: string;
  specialtyLabel: string;
  specialtyNumber: number;
  lessonNumber: number;
  order: number;
  urgency: ApproachUrgency;
  status: ApproachLessonStatus;
  version?: string;
  updatedAt?: string;
  estimatedTime?: number;
  description?: string;
  tags?: string[];
  icd10?: string[];
  clinicalPearls?: string[];
  sections?: ApproachLessonSection[];
}
