/**
 * CliniPortal — Calculators Module Type Definitions
 */

export interface ClinicalTool {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  part: string;
  tags: string[];
}

export interface ToolPartMeta {
  id: string;
  name: string;
  icon: string;
}

export interface LabValueItem {
  key: string;
  name: string;
  range: string;
}

export type LabCategory = 'hemato' | 'biochem' | 'electro' | 'coag';
