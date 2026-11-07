/**
 * CliniPortal — Clinical Handbook & Decision Pearls Types
 * Path: src/content/clinical-handbook/types/handbook.types.ts
 * 
 * Hệ thống kiểu dữ liệu cho phân hệ "Sổ Tay Kinh Nghiệm & Đúc Kết Lâm Sàng" (Clinical Handbook)
 * Thiết kế 3 tầng: Chuyên khoa (Specialty) -> Bệnh lý (Disease) -> Bài Đúc kết MDX (Pearl Article)
 */

export type SpecialtyId = 
  | 'truyen-nhiem'
  | 'tim-mach'
  | 'ho-hap'
  | 'tieu-hoa-gan-mat'
  | 'hoi-suc-cap-cuu'
  | 'noi-tiet'
  | 'than-tiet-nieu'
  | 'than-kinh';

export interface HandbookArticleSection {
  id: string;
  number: number;
  title: string;
  icon?: string;
}

export interface HandbookArticle {
  id: string;
  slug: string;
  diseaseId: string;
  specialtyId: SpecialtyId;
  title: string;
  subtitle?: string;
  description: string;
  estimatedMinutes: number;
  tags: string[];
  keyTakeaway: string;
  order: number;
  filePath: string;
  isDraft?: boolean;
  isFeatured?: boolean;
  lastUpdated: string;
  evidenceLevel: string;
  sections?: HandbookArticleSection[];
}

export interface HandbookDisease {
  id: string;
  slug: string;
  specialtyId: SpecialtyId;
  name: string;
  nameEn: string;
  icd10: string;
  icon: string;
  color?: string;
  badge?: string;
  summary: string;
  keyPearlsPreview: string[];
  guidelines: string[];
  order: number;
  articles: HandbookArticle[];
}

export interface HandbookSpecialty {
  id: SpecialtyId;
  name: string;
  shortName: string;
  nameEn: string;
  icon: string;
  color: string;
  bgColor?: string;
  badge: string;
  description: string;
  order: number;
  diseases: HandbookDisease[];
}
