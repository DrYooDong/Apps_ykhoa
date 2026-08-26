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

/**
 * MDX Frontmatter Schema cho Bài viết Dịch tễ học bệnh lý
 * Tuân thủ quy chuẩn .agents/skills/mdx-content-architecture/SKILL.md
 */
export interface EpidemiologyMdxFrontmatter {
  title: string;
  slug: string;
  code: string;
  icd10: string;
  specialtyId: string;
  category: 'epidemiology';
  status: 'published' | 'draft' | 'review';
  version: string;
  updatedAt: string;
  description: string;
  tags: string[];
  
  // Dữ liệu dịch tễ học trọng yếu (Epi Vital Metrics)
  metrics: {
    r0?: string;
    rt?: string;
    incubationPeriod: string;
    eip?: string; // Extrinsic Incubation Period (trong vector)
    iip?: string; // Intrinsic Incubation Period (trong người)
    vector?: string;
    reservoir?: string;
    modeOfTransmission: string;
    caseFatalityRate: string;
    whoClassification?: string;
    annualGlobalCases?: string;
    vietnamEndemicStatus?: string;
    vaccineStatus?: string;
  };

  // 8 Trụ cột Dịch tễ học
  pillars: Array<{
    id: string;
    number: number;
    title: string;
    icon: string;
  }>;
}
