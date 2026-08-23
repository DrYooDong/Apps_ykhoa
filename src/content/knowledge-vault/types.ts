/**
 * CliniPortal — Knowledge Vault Module Types
 */

export interface VaultArticle {
  id: string;
  title: string;
  fullFileName: string;
  khoCode: 'GPSL' | 'HS' | 'SLB' | 'DTH' | 'YTNC' | string;
  khoName: string;
  khoGroup?: string;
  khoDir: string;
  khoIcon: string;
  khoColor?: string;
  specialty: string;
  part: string;
  relPath: string;
  snippet: string;
  readTime: string;
  aliases?: string[];
  keywords?: string[];
  icd10?: string[];
  tags?: string[];
  content?: string;
}

export interface VaultKhoSummary {
  code: string;
  name: string;
  dirName: string;
  icon: string;
  color: string;
  articleCount: number;
  specialties: string[];
}

export interface VaultFilterState {
  searchQuery: string;
  activeKho: string; // 'ALL' or khoCode
  activeSpecialty: string; // 'ALL' or specific specialty name
}

export interface ClinicalPathwayLinks {
  conditionName: string;
  gpsl?: VaultArticle;
  slb?: VaultArticle;
  dth?: VaultArticle;
  ytnc?: VaultArticle;
  cd?: VaultArticle;
  pddt?: VaultArticle;
  bc?: VaultArticle;
  tv?: VaultArticle;
  cn?: VaultArticle;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface VaultPersonalAnnotation {
  id: string;
  articleId: string;
  authorId?: string;
  noteText: string;
  pearlType?: 'experience' | 'warning' | 'dosage' | 'general';
  createdAt: string;
  updatedAt: string;
}

export interface FlowchartNode {
  id: string;
  label: string;
  subLabel?: string;
  type: 'start' | 'decision' | 'action' | 'alert' | 'stable';
  x: number;
  y: number;
  width?: number;
  height?: number;
  details?: string;
  recommendation?: string;
}

export interface FlowchartEdge {
  from: string;
  to: string;
  label?: string;
  isYes?: boolean;
}

export interface ClinicalFlowchart {
  id: string;
  title: string;
  specialty: string;
  conditionName: string;
  description: string;
  nodes: FlowchartNode[];
  edges: FlowchartEdge[];
}

export interface MedicalFlashcard {
  id: string;
  articleId?: string;
  specialty: string;
  category: 'pearl' | 'danger' | 'dosage' | 'diagnosis' | 'guideline';
  frontQuestion: string;
  backAnswer: string;
  clinicalContext?: string;
  sourceArticleTitle?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface FlashcardReviewState {
  cardId: string;
  interval: number; // in days
  repetition: number;
  efactor: number; // default 2.5
  nextReviewDate: string; // ISO date string
  lastRating?: number; // 0-4
  masteryLevel: number; // 0 - 100%
  lastReviewedAt: string;
}

export interface EncyclopediaQuickFacts {
  icdCode?: string;
  epidemiologySummary?: string;
  goldStandardDx?: string;
  firstLineRx?: string;
  criticalAlert?: string;
  prognosisSummary?: string;
  guidelineRef?: string;
}

export interface EncyclopediaSection {
  tier: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  title: string;
  badge: string;
  icon: string;
  color: string;
  summary: string;
}

export interface VaultEncyclopediaData {
  quickFacts?: EncyclopediaQuickFacts;
  molecularMechanismSvg?: string;
  comparisonTableHtml?: string;
  pearls?: string[];
  redFlags?: string[];
  stepwiseTreatment?: {
    step: string;
    action: string;
    details: string;
  }[];
  dosingAdjustments?: {
    condition: string;
    adjustment: string;
  }[];
  landmarkTrials?: {
    name: string;
    year: string;
    finding: string;
    impact: string;
  }[];
}
