/**
 * Diagnostic Criteria & Clinical Decision Database - DocSpace
 * CSDL Tiêu chuẩn Chẩn đoán, Ngưỡng Cận lâm sàng, Phác đồ Bậc thang & Biến chứng
 * Chuẩn hóa 10 Bệnh Trọng Tâm + 2 Bệnh Mở Rộng kết nối 16 Kho Tri Thức CliniPortal
 */

export interface DiagnosticCriterionItem {
  id: string;
  type: 'mandatory' | 'major' | 'minor' | 'lab' | 'imaging' | 'exclusion' | 'warning' | string;
  label: string;
  description?: string;
  sourceGuideline?: string;
  labThreshold?: string;
  symptomIds?: string[];
  cdssRole?: 'dt' | 'gy' | 'ht' | 'loaitru';
  weight?: number;
}

export interface DrugChainOption {
  drugName: string;
  class: string;
  route: string;
  dosage: string;
  frequency: string;
  instructions: string;
  isFirstLine: boolean;
  notes?: string;
  contraindications?: string[];
}

export interface ComplicationOrderItem {
  drug: string;
  dosage: string;
  note: string;
  drugName?: string;
  route?: string;
  rate?: string;
  timing?: string;
  warning?: string;
}

export interface DiseaseComplicationItem {
  id?: string;
  name: string;
  severity?: 'critical' | 'warning' | 'info' | string;
  timeframe: 'acute_24h' | 'subacute_7d' | 'chronic';
  warningSigns: string;
  triggerCriteria?: string;
  preventiveAction: string;
  actionSummary?: string;
  onCallAlertText: string;
  orderSet?: ComplicationOrderItem[];
}

export interface VaultPathwayLink {
  khoCode: 'TC' | 'CD' | 'CLS' | 'PDDT' | 'DUOC' | 'BC' | 'TV' | 'YTNC' | 'EBM';
  khoName: string;
  articleTitle?: string;
  searchKeyword: string;
}

export interface GradedProtocol {
  title?: string;
  tuyen?: string[];
  initialManagement?: string[];
  drugs?: Array<[string, string, string]>; // [Tên thuốc / Dịch truyền, Liều & Đường dùng, Ghi chú / Điều kiện]
  firstLineDrugs?: DrugChainOption[];
  secondLineDrugs?: DrugChainOption[];
  monitoring?: string[];
  cautions?: string[];
  timelinePhases?: any[];
  escalationCriteria?: string;
  dischargeCriteria?: string;
}

export interface SeverityGradingItem {
  grade: string;
  severity: 'mild' | 'moderate' | 'severe' | 'critical' | 'phenotype' | 'info' | string;
  criteria: string;
  triage: string;
  primaryAction: string;
  targetVitals?: string;
  badgeText?: string;
  protocol?: GradedProtocol;
  escalationCriteria?: string;
  dischargeCriteria?: string;
}

export interface ClinicalSubBranch {
  id: string;
  groupId?: string;
  groupName?: string;
  name: string;
  badgeText?: string;
  icon?: string;
  color?: string;
  urgency?: 'immediate' | 'urgent' | 'priority' | string;
  criteria?: string;
  triage?: string;
  targetVitals?: string;
  escalationCriteria?: string;
  dischargeCriteria?: string;
  keyActions?: string[];
  drugs?: [string, string, string][];
  timelinePhases?: any[];
  monitoring?: string[];
  cautions?: string[];
}

export interface ClinicalBranch {
  id: string;
  name: string;
  axisType?: 'severity' | 'phenotype' | 'stage' | 'triage_score' | 'treatment_step' | 'comorbidity' | 'custom' | string;
  badgeText?: string;
  color?: string;
  criteria: string;
  triage?: string;
  targetVitals?: string;
  escalationCriteria?: string;
  dischargeCriteria?: string;
  drugs?: [string, string, string][];
  firstLineDrugs?: DrugChainOption[];
  secondLineDrugs?: DrugChainOption[];
  monitoring?: string[];
  cautions?: string[];
  timelinePhases?: any[];
  patientCounseling?: string;
  hasSubBranches?: boolean;
  subBranchMode?: 'single-select' | 'multi-select';
  subBranchLabel?: string;
  subBranches?: ClinicalSubBranch[];
}

export interface BranchAxis {
  axisId: string;
  axisName: string;
  axisLabelShort?: string;
  axisIcon?: string;
  axisType: 'severity' | 'phenotype' | 'stage' | 'triage_score' | 'treatment_step' | 'comorbidity' | 'custom' | string;
  axisOrder?: number;
  isRequired?: boolean;
  description?: string;
  branches: ClinicalBranch[];
}

export interface CombinedProtocol {
  id: string;
  axisSelections: Record<string, string>;
  combinedName?: string;
  badgeText?: string;
  color?: string;
  criteriaSummary?: string;
  triage?: string;
  targetVitals?: string;
  escalationCriteria?: string;
  dischargeCriteria?: string;
  drugs?: [string, string, string][];
  firstLineDrugs?: DrugChainOption[];
  secondLineDrugs?: DrugChainOption[];
  additionalTreatments?: string[];
  keyWarnings?: string[];
  monitoring?: string[];
  cautions?: string[];
  timelinePhases?: any[];
}

export interface ClinicalIndicationItem {
  indicationName: string;
  criteria: string;
  orderTarget?: string;
  note?: string;
}

export interface ClinicalIndicationGroup {
  category: string;
  badgeText?: string;
  color?: string;
  items: Array<ClinicalIndicationItem | string>;
}

export interface ClinicalCautionsDefinition {
  specificTreatmentIndications?: string;
  criticalWarnings?: string[];
  contraindications?: string[];
  dischargeCriteria?: string[];
  clinicalIndications?: Array<ClinicalIndicationGroup | ClinicalIndicationItem | string>;
  treatmentIndications?: Array<ClinicalIndicationGroup | ClinicalIndicationItem | string>;
}

export interface ClinicalBranchingSystem {
  mode?: 'single' | 'multi';
  selectionFlow?: 'sequential' | 'independent' | 'matrix';
  axisName?: string;
  axisLabelShort?: string;
  axisIcon?: string;
  axisType?: 'severity' | 'phenotype' | 'stage' | 'triage_score' | 'treatment_step' | 'comorbidity' | 'custom' | string;
  description?: string;
  branches?: ClinicalBranch[];
  axes?: BranchAxis[];
  combinedProtocols?: CombinedProtocol[];
}

export interface DiseaseReactionChainDefinition {
  icdCode: string;
  icdPrefixes: string[];
  diseaseName: string;
  specialty: string;
  severity: 'emergency' | 'urgent' | 'routine';
  summary: string;
  goldStandard: string;
  
  // Rule chẩn đoán
  criteriaRule: {
    minMajorRequired?: number;
    minMinorRequired?: number;
    mandatoryIds?: string[];
    ruleDescription: string;
  };
  criteria: DiagnosticCriterionItem[];
  
  // Phân độ lâm sàng & Đánh giá mức độ nặng / Thể lâm sàng
  stagingType?: 'severity' | 'phenotype' | 'stage' | 'score' | 'none';
  hasSeverityGrading?: boolean;
  nonStagedExplanation?: string;
  severityGrading?: SeverityGradingItem[];

  // 🌿 HỆ THỐNG PHÂN NHÁNH PHÁC ĐỒ ĐA DẠNG (Dynamic Clinical Branching)
  branching?: ClinicalBranchingSystem;

  // Phác đồ điều trị phân bậc
  protocol: {
    title: string;
    guideline: string;
    targetGoals: string[];
    initialManagement: string[];
    firstLineDrugs: DrugChainOption[];
    secondLineDrugs: DrugChainOption[];
    supportiveCare: string[];
  };

  // Cảnh báo biến chứng & giám sát
  complications: DiseaseComplicationItem[];
  monitoringLabs: string[];

  // Liên kết 16 Kho Tri thức
  vaultPathways: VaultPathwayLink[];

  // Lưu ý lâm sàng, Cảnh báo, Chống chỉ định & Chỉ định can thiệp
  clinicalCautions?: ClinicalCautionsDefinition;

  // Lộ trình & Phác đồ theo phân độ (Nested Protocols)
  timelinePhases?: any[];
  protocols?: any[];
}

import { KHO_CHAN_DOAN_DATABASE } from './kho-chan-doan-db.ts';
import { ENRICHED_DISEASES } from './enriched/index.ts';

export const DIAGNOSTIC_CHAIN_DATABASE: Record<string, DiseaseReactionChainDefinition> = {
  ...KHO_CHAN_DOAN_DATABASE,
  ...ENRICHED_DISEASES,
};

export function findReactionChainByIcd(icdCode: string): DiseaseReactionChainDefinition | null {
  if (!icdCode) return null;
  const clean = icdCode.toUpperCase().trim();
  for (const key of Object.keys(DIAGNOSTIC_CHAIN_DATABASE)) {
    const item = DIAGNOSTIC_CHAIN_DATABASE[key];
    if (item && item.icdPrefixes && Array.isArray(item.icdPrefixes) && item.icdPrefixes.some(p => clean.startsWith(p) || clean === p)) {
      return item;
    }
  }
  return null;
}

export function getAllReactionChains(): DiseaseReactionChainDefinition[] {
  return Object.values(DIAGNOSTIC_CHAIN_DATABASE).filter((c): c is DiseaseReactionChainDefinition => Boolean(c && c.diseaseName));
}
