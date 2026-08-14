/**
 * CliniPortal — Clinical Pharmacology Type Definitions
 */

export type PregnancyCategory = 'A' | 'B' | 'C' | 'D' | 'X' | 'N/A';
export type DrugRoute = 'PO' | 'IV' | 'IM' | 'SC' | 'Inhalation' | 'Topical' | 'PR' | 'SL' | 'TD' | string;
export type DrugSeverity = 'contraindicated' | 'major' | 'moderate' | 'minor' | 'synergistic';

export interface DrugDosage {
  standardAdult?: string;
  maxDaily?: string;
  maxAdultDaily?: string;
  pediatric?: string;
  renalNote?: string;
}

export interface RenalBracket {
  crcl?: string;
  dialysis?: string;
  recommendation: string;
}

export interface RenalAdjustment {
  formula?: string;
  brackets?: RenalBracket[];
}

export interface Drug {
  id: string;
  name: string;
  brandNames: string[];
  drugClass: string;
  category: string;
  routes: DrugRoute[];
  pregnancyCategory: PregnancyCategory;
  mechanism?: string;
  blackBoxWarning?: string | null;
  indications: string[];
  dosage: DrugDosage;
  renalAdjustment?: RenalAdjustment;
  hepaticWarning?: string;
  adverseEffects: string[];
  contraindications: string[];
  monitoring?: string[];
  counseling?: string[];
}

export interface DrugInteraction {
  id: string;
  drug1: string;
  drug2: string;
  group1?: string;
  group2?: string;
  severity: DrugSeverity;
  severityLabel: string;
  summary: string;
  mechanism: string;
  clinicalManagement: string;
}

export interface PKParameter {
  drugId: string;
  name: string;
  halfLifeHours: number;
  volumeOfDistributionLkg: number;
  proteinBindingPercent: number;
  bioavailabilityPercent: number;
  eliminationRoute: string;
  therapeuticRange?: string;
}

export interface SymptomPathwayNode {
  id: string;
  label: string;
  type: 'danger' | 'warning' | 'teal' | 'info';
  title: string;
  drugs?: string[];
  protocol?: string;
  contraindications?: string[];
  redFlags?: string[];
}

export interface SymptomPathway {
  symptomId: string;
  symptomName: string;
  nodes: SymptomPathwayNode[];
}

export interface AntidoteProtocol {
  toxin: string;
  antidote: string;
  mechanism: string;
  dosing: string;
  monitoring: string;
}
