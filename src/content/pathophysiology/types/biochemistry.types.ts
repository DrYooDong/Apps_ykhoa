/**
 * CLINI_PORTAL — BIOCHEMISTRY TYPES DEFINITION
 * Path: src/content/pathophysiology/types/biochemistry.types.ts
 */

export interface BiochemistryBlock {
  id: string;
  code: string;
  name: string;
  englishName: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  topicsCount: number;
}

export interface BiochemistryTopic {
  id: string;
  blockId: string;
  order: number;
  code: string;
  title: string;
  slug: string;
  badge: string;
  tags: string[];
  overview: string;
  keyReactions: string[];
  clinicalPearls: string[];
  relatedLabTests: string[];
}

export interface MetabolicPathway {
  id: string;
  name: string;
  shortDesc: string;
  topicId: string;
  icon: string;
  color: string;
  stepsCount: number;
  keyEnzymes: string[];
}

export interface BiochemistryDataStore {
  version: string;
  stats: {
    totalBlocks: number;
    totalTopics: number;
    totalPathways: number;
    totalClinicalPearls: number;
    totalEnzymes: number;
  };
  blocks: BiochemistryBlock[];
  topics: BiochemistryTopic[];
  metabolicPathways: MetabolicPathway[];
}
