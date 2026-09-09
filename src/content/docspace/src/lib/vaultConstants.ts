/**
 * CliniPortal MedLens — Knowledge Vault Constants & Type Definitions
 * Định nghĩa 18 Kho tri thức Y khoa và các cấu trúc dữ liệu liên quan.
 */

export interface VaultArticle {
  id: string;
  title: string;
  fullFileName: string;
  khoCode: string;
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
  topic?: string;

  // SOAP & Case extensions
  caseId?: string;
  experienceLevel?: 'essential' | 'pitfall' | 'rare' | 'advanced';
  difficultyRating?: number;
  authorDoctor?: string;
  demographicContext?: string;
  historyPearls?: string;
  objectivePitfalls?: string;
  diagnosticPearls?: string;
  takeawayLessons?: string;
}

export interface VaultKhoSummary {
  code: string;
  name: string;
  group: string;
  icon: string;
  color: string;
  articleCount: number;
  specialties: string[];
}

export interface ClinicalPathwayLinks {
  conditionName: string;
  gpsl?: VaultArticle;  // Giải phẫu & Sinh lý
  slb?: VaultArticle;   // Sinh lý bệnh
  dth?: VaultArticle;   // Dịch tễ học
  ytnc?: VaultArticle;  // Yếu tố nguy cơ
  cd?: VaultArticle;    // Tiêu chuẩn chẩn đoán
  pddt?: VaultArticle;  // Phác đồ điều trị
  duoc?: VaultArticle;  // Dược lâm sàng
  bc?: VaultArticle;    // Biến chứng
  tv?: VaultArticle;    // Tư vấn người bệnh
  cc?: VaultArticle;    // Công cụ & thang điểm
}

export const KHO_DEFINITIONS: Record<string, { name: string; group: string; icon: string; color: string }> = {
  // 1. Cơ sở
  GPSL: { name: 'GP & Sinh lý', group: 'Cơ sở', icon: 'HeartPulse', color: '#0284c7' },
  HS:   { name: 'Hóa sinh Y học', group: 'Cơ sở', icon: 'FlaskConical', color: '#8b5cf6' },
  SLB:  { name: 'Sinh lý bệnh', group: 'Cơ sở', icon: 'Zap', color: '#f59e0b' },
  DTH:  { name: 'Dịch tễ học', group: 'Cơ sở', icon: 'Activity', color: '#10b981' },
  KN:   { name: 'Kỹ năng lâm sàng', group: 'Cơ sở', icon: 'Stethoscope', color: '#6366f1' },

  // 2. Chuyên sâu
  YTNC: { name: 'Yếu tố nguy cơ', group: 'Chuyên sâu', icon: 'AlertTriangle', color: '#f97316' },
  TC:   { name: 'Triệu chứng học', group: 'Chuyên sâu', icon: 'Search', color: '#0ea5e9' },
  CLS:  { name: 'Cận lâm sàng', group: 'Chuyên sâu', icon: 'FileText', color: '#6366f1' },
  CD:   { name: 'Tiêu chuẩn chẩn đoán', group: 'Chuyên sâu', icon: 'ClipboardCheck', color: '#ec4899' },
  PDDT: { name: 'Phác đồ điều trị', group: 'Chuyên sâu', icon: 'Pill', color: '#3b82f6' },
  CN:   { name: 'Cập nhật Hướng dẫn', group: 'Chuyên sâu', icon: 'RotateCw', color: '#2563eb' },
  DUOC: { name: 'Dược lý học', group: 'Chuyên sâu', icon: 'ShieldAlert', color: '#06b6d4' },
  TV:   { name: 'Tư vấn người bệnh', group: 'Chuyên sâu', icon: 'UserCheck', color: '#84cc16' },
  BC:   { name: 'Biến chứng', group: 'Chuyên sâu', icon: 'AlertOctagon', color: '#ef4444' },

  // 3. Thực hành & Bệnh án
  BA:   { name: 'Bệnh án SOAP', group: 'Thực hành', icon: 'BookOpen', color: '#10b981' },

  // 4. Hỗ trợ
  DD:   { name: 'Dinh dưỡng lâm sàng', group: 'Hỗ trợ', icon: 'Utensils', color: '#eab308' },
  CC:   { name: 'Thang điểm lâm sàng', group: 'Hỗ trợ', icon: 'Calculator', color: '#f59e0b' },
  EBM:  { name: 'NCKH & EBM Guidelines', group: 'Hỗ trợ', icon: 'BookOpen', color: '#64748b' },
  CDSS: { name: 'Kho CDSS', group: 'Hỗ trợ', icon: 'Cpu', color: '#0284c7' },
  ICD10:{ name: 'Kho mã ICD-10', group: 'Hỗ trợ', icon: 'Barcode', color: '#0ea5e9' },
  CORE: { name: 'Thực thể Hạt nhân', group: 'Hỗ trợ', icon: 'Dna', color: '#a855f7' },
};
