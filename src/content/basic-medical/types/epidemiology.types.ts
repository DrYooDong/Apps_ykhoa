/**
 * CliniPortal — Epidemiology & Biostatistics Subsystem Types
 * Path: src/content/pathophysiology/types/epidemiology.types.ts
 */

export interface EpidemiologyBlock {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface EpidemiologyTopic {
  id: string;
  code: string;
  blockId: string;
  title: string;
  slug: string;
  overview: string;
  keyFormulas: string[];
  clinicalPearls: string[];
  biasAndPitfalls: string[];
  relatedMetrics: string[];
  tags: string[];
}

export interface EpidemiologyFormula {
  id: string;
  name: string;
  category: string;
  formula: string;
  description: string;
  interpretation: string;
  example: string;
}

export interface StudyDesignInfo {
  id: string;
  name: string;
  englishName: string;
  type: 'Quan sát Mô tả' | 'Quan sát Phân tích' | 'Quan sát Mô tả / Phân tích' | 'Thực nghiệm Can thiệp';
  unit: string;
  direction: string;
  primaryMeasure: string;
  strengths: string[];
  limitations: string[];
  biasRisk: string;
  example: string;
}

export interface OutbreakPattern {
  id: string;
  name: string;
  englishName: string;
  description: string;
  curveShape: string;
  examples: string[];
  keyFeatures: string[];
}

export interface CausalityCriterion {
  id: string;
  number: number;
  name: string;
  englishName: string;
  description: string;
  classicExample: string;
}
