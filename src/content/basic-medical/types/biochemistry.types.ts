/**
 * CLINI_PORTAL — BIOCHEMISTRY TYPES DEFINITION & MDX SCHEMA
 * Path: src/content/basic-medical/types/biochemistry.types.ts
 */

export type BiochemistryBlockId =
  | 'block1-biomolecules'
  | 'block2-catalysis-signaling'
  | 'block3-bioenergetics'
  | 'block4-intermediary-metabolism'
  | 'block5-molecular-genetics'
  | 'block6-organ-metabolism'
  | 'block7-clinical-biochemistry';

export interface BiochemSectionMeta {
  id: string;
  number: number;
  title: string;
  icon: string;
}

export interface BiochemistryMdxFrontmatter {
  title: string;
  slug: string;
  code: string;
  block: BiochemistryBlockId;
  blockName: string;
  order: number;
  harperChapter?: string;
  lippincottChapter?: string;
  category: 'biochemistry';
  status: 'published' | 'draft' | 'archived';
  version: string;
  updatedAt: string;
  description: string;
  tags: string[];
  clinicalPearls?: string[];
  keyReactions?: string[];
  relatedLabTests?: string[];
  sections?: BiochemSectionMeta[];
}

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
