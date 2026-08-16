/**
 * CliniPortal — Clinical Studio Tools TypeScript Models & Interfaces
 * Path: src/content/calculators/studio-models.ts
 */

export type SpecialtyCategory = 
  | 'emergency'
  | 'cardiology'
  | 'renal'
  | 'respiratory'
  | 'infectious'
  | 'gastroenterology'
  | 'endocrinology'
  | 'hematology'
  | 'neurology'
  | 'general';

export type RiskTier = 'low' | 'mid' | 'high' | 'critical';

export interface StudioCasePreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  params: Record<string, any>;
  clinicalTip?: string;
}

export interface StudioInterventionProtocol {
  id: string;
  title: string;
  icon: string;
  summary: string;
  steps: string[];
  evidenceLevel?: string;
  drugsOrEquipment?: string[];
  contraindications?: string[];
}

export interface StudioMetricOutput {
  key: string;
  label: string;
  value: string | number;
  unit?: string;
  status?: 'normal' | 'warning' | 'danger' | 'info';
  explanation?: string;
}

export interface ClinicalStudioManifest {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  specialty: SpecialtyCategory;
  specialtyName: string;
  specialtyIcon: string;
  icon: string;
  riskTier: RiskTier;
  riskLabel: string;
  description: string;
  indications: string[];
  ebmGuidelines: string[];
  features: string[];
  route: string;
  presets: StudioCasePreset[];
  protocols: StudioInterventionProtocol[];
  hisOrderTemplate?: string;
}

export interface StudioFilterOptions {
  specialty?: SpecialtyCategory | 'all';
  searchQuery?: string;
  riskTier?: RiskTier | 'all';
}
