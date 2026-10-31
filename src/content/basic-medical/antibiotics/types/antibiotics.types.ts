/**
 * CliniPortal — Clinical Antibiotics & Antimicrobial Stewardship (AMS) Types
 * Path: src/content/basic-medical/antibiotics/types/antibiotics.types.ts
 * 
 * Định nghĩa cấu trúc dữ liệu cho phân hệ Kháng Sinh Học Lâm Sàng (BMS-ATB)
 * Tuân thủ chuẩn WHO AWaRe 2023, IDSA, Sanford Guide & BYT Việt Nam
 */

export type AWaReTier = 'access' | 'watch' | 'reserve' | 'discouraged' | 'not-applicable';

export type PKPDIndex = 'T>MIC' | 'Cmax/MIC' | 'AUC24/MIC';

export type AntibioticToolId = 
  | 'd8-safety-wizard'
  | 'pkpd-simulator'
  | 'aware-navigator'
  | 'delabeling-matrix'
  | 'iv-po-stepdown';

export interface AntibioticLessonSection {
  id: string;
  number: number;
  title: string;
  icon?: string;
}

export interface AntibioticLesson {
  id: string;
  slug: string;
  title: string;
  moduleNumber: number;
  moduleKey: string;
  moduleTitle: string;
  lessonNumber: number;
  order: number;
  description: string;
  estimatedMinutes: number;
  tags: string[];
  awareTier?: AWaReTier;
  pkpdModel?: PKPDIndex;
  keyTakeaway: string;
  hasInteractiveTool?: boolean;
  toolId?: AntibioticToolId;
  sections?: AntibioticLessonSection[];
  isNewEbm2026?: boolean;
}

export interface AntibioticModule {
  id: string;
  number: number;
  key: string;
  title: string;
  shortTitle: string;
  icon: string;
  color: string;
  bgColor?: string;
  badge: string;
  description: string;
  clinicalObjective: string;
  lessons: AntibioticLesson[];
}

export interface AntibioticToolMeta {
  id: AntibioticToolId;
  title: string;
  shortTitle: string;
  icon: string;
  badge: string;
  color: string;
  description: string;
  clinicalValue: string;
  targetAudience: string;
}

export interface AWaReDrugItem {
  id: string;
  genericName: string;
  vietnameseName: string;
  brandNames: string[];
  tier: AWaReTier;
  drugClass: string;
  primaryIndications: string[];
  doseStandardAdult: string;
  doseAdjustmentRenal: string;
  contraindications: string[];
  bioavailabilityOral: number; // Tỷ lệ % hấp thu F
  whoAwArECode: string;
  vietnamHospitalUseNote: string;
}

