/**
 * CliniPortal — Pathophysiology Module Type Definitions
 */

export interface PathophysiologyItem {
  id: string;
  name: string;
  category: string;
  type: string;
  path: string;
  legacyPath?: string;
  tags?: string[];
}

export interface PhysioFlashcard {
  id: string;
  category: string;
  title: string;
  question: string;
  answer: string;
  explanation: string;
}

export interface PhysioFormula {
  id: string;
  name: string;
  category: string;
  formula: string;
  unit: string;
  variables: { name: string; label: string; unit: string; defaultValue?: number }[];
  calculate: (inputs: Record<string, number>) => number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PathoCategoryMeta {
  id: string;
  name: string;
  icon: string;
}
