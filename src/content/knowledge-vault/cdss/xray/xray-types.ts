/**
 * CliniPortal CDSS — Intelligent Radiography (RadAI X-Ray) Types
 * Path: src/content/knowledge-vault/cdss/xray/xray-types.ts
 */

export type ExamType = 'chest_pa' | 'chest_lateral' | 'abdomen_supine' | 'abdomen_erect';

export type Severity = 'mild' | 'moderate' | 'severe' | 'critical';

export type FindingType = 
  | 'pneumothorax'
  | 'pleural_effusion'
  | 'cardiomegaly'
  | 'lung_nodule'
  | 'consolidation'
  | 'rib_fracture'
  | 'pulmonary_edema'
  | 'atelectasis'
  | 'hiatal_hernia'
  | 'intestinal_obstruction'
  | 'free_air'
  | 'calcification'
  | 'foreign_body'
  | 'scoliosis'
  | 'mediastinal_shift'
  | 'opacity'
  | 'lucency'
  | 'fracture'
  | 'mass'
  | 'effusion'
  | 'deformity';

export interface Finding {
  id: string;
  type: FindingType;
  name: string;
  nameVi: string;
  description: string;
  location: string;
  severity: Severity;
  confidence: number;
  x?: number; // Normalized 0..W or percent
  y?: number;
  radius?: number;
  radiographicSign?: string;
  measurements?: { label: string; value: string }[];
  clinicalSignificance?: string;
  differentialDiagnosis?: string[];
  recommendedActions?: string[];
}

export interface CaseStudy {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: 'M' | 'F';
  examDate: string;
  examType: ExamType;
  clinicalHistory: string;
  findings: Finding[];
  impression: string;
}

export interface RadiographicKnowledge {
  id: string;
  signName: string;
  signNameVi: string;
  examType: ExamType;
  pathology: string;
  imagingDescription: string;
  clinicalImplication: string;
  differentialList: string[];
}

export interface CanvasTransformState {
  zoom: number;
  panX: number;
  panY: number;
  brightness: number;
  contrast: number;
  inverted: boolean;
  showOverlay: boolean;
}
