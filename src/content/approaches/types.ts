/**
 * CliniPortal — Clinical Approaches Type Definitions
 */

export interface ApproachItem {
  id: string;
  name: string;
  category: string;
  type: string;
  path: string;
  legacyPath?: string;
  tags?: string[];
}

export interface RedFlagCard {
  id: string;
  category: string;
  topicName: string;
  question: string;
  answer: string;
  explanation: string;
}

export interface SymptomMatrixItem {
  redFlags: string[];
  diffDiags: string[];
  actionText: string;
  actionUrl: string;
}

export interface ApproachSectionMeta {
  id: string;
  name: string;
  icon: string;
  color: string;
}
