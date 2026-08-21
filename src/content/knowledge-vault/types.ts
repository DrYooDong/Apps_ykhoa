/**
 * CliniPortal — Knowledge Vault Module Types
 */

export interface VaultArticle {
  id: string;
  title: string;
  fullFileName: string;
  khoCode: 'GPSL' | 'HS' | 'SLB' | 'DTH' | string;
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
