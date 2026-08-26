/**
 * CliniPortal 2.0 — CCBS (Cơ Chế Bệnh Sinh) Type Definitions & MDX Schema
 * Path: src/content/basic-medical/types/ccbs.types.ts
 */

export type CcbsSystem =
  | 'cardiovascular'
  | 'respiratory'
  | 'renal'
  | 'digestive'
  | 'neurology'
  | 'endocrine'
  | 'hematology'
  | 'pediatrics'
  | 'general';

export interface CcbsSectionMeta {
  id: string;
  number: number;
  title: string;
  icon: string;
}

export interface CcbsMdxFrontmatter {
  title: string;
  slug: string;
  code: string;
  system: CcbsSystem;
  systemName: string;
  order: number;
  icd10?: string;
  category: 'pathophysiology-cases';
  status: 'published' | 'draft' | 'archived';
  version: string;
  updatedAt: string;
  description: string;
  tags: string[];
  clinicalPearls?: string[];
  keyMechanisms?: string[];
  relatedLabTests?: string[];
  sections?: CcbsSectionMeta[];
}

export interface CcbsTopic {
  id: string;
  slug: string;
  code: string;
  title: string;
  system: CcbsSystem;
  systemName: string;
  order: number;
  overview: string;
  clinicalPearls: string[];
  tags: string[];
}

export interface CcbsDataStore {
  version: string;
  totalCases: number;
  topics: CcbsTopic[];
}
