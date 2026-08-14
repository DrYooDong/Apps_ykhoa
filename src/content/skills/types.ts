/**
 * CliniPortal — Clinical Skills Module Type Definitions
 */

export interface ClinicalSkill {
  id: string;
  name: string;
  category: string;
  type: string;
  path: string;
  legacyPath?: string;
  tags?: string[];
}

export interface CranialNerveItem {
  title: string;
  type: string;
  exam: string;
  patho: string;
}

export interface OsceChecklistItem {
  text: string;
  pts: number;
  critical: boolean;
}

export type OsceDifficulty = 'basic' | 'intermediate' | 'advanced';

export interface OsceCase {
  id: string;
  difficulty: OsceDifficulty;
  category: string;
  title: string;
  patient: string;
  vitals: string;
  scenario: string;
  duration: number; // in seconds
  checklist: OsceChecklistItem[];
  keyPoints: string[];
}

export interface SkillCategoryMeta {
  id: string;
  name: string;
  icon: string;
  badge: string;
  count: number;
}
