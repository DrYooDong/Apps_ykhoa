/**
 * CliniPortal 2.0 — Physiology MDX Schema & Type Definitions
 * Path: src/content/basic-medical/types/physiology.types.ts
 */

export type PhysioSystem =
  | 'cellular'      // Tế bào & Nội môi
  | 'nervous'       // Thần kinh & Giác quan
  | 'cardiovascular'// Tuần hoàn & Tim mạch
  | 'respiratory'   // Hô hấp
  | 'digestive'     // Tiêu hóa & Chuyển hóa
  | 'renal'         // Thận & Tiết niệu
  | 'endocrine'     // Nội tiết
  | 'reproductive'  // Sinh sản
  | 'pediatric';    // Sinh lý Nhi khoa

export interface PhysioSectionMeta {
  id: string;
  number: number;
  title: string;
  icon: string;
}

export interface PhysioMdxFrontmatter {
  title: string;
  slug: string;
  code: string;
  part: string; // part1, part2, ..., part9
  system: PhysioSystem;
  systemName: string;
  guytonChapter?: string;
  ganongChapter?: string;
  category: 'physiology';
  status: 'published' | 'draft' | 'archived';
  version: string;
  updatedAt: string;
  description: string;
  tags: string[];
  clinicalPearls?: string[];
  keyFormulas?: string[];
  sections?: PhysioSectionMeta[];
}
