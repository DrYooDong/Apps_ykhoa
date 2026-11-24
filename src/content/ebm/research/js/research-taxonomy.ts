/**
 * CliniPortal 2.0 — Standardized Research Label Taxonomy (7 Axes)
 * Path: src/content/ebm/research/js/research-taxonomy.ts
 */

export interface TaxonomyMeta {
  label: string;
  shortLabel?: string;
  icon: string;
  tone: 'indigo' | 'emerald' | 'teal' | 'amber' | 'rose' | 'violet' | 'slate';
}

export const RESEARCH_SPECIALTIES: Record<string, { label: string; icon: string }> = {
  cardio: { label: 'Tim mạch - Chuyển hóa', icon: 'fa-solid fa-heart-pulse' },
  icu: { label: 'Hồi sức tích cực (ICU)', icon: 'fa-solid fa-bed-pulse' },
  infect: { label: 'Truyền nhiễm & Kháng sinh', icon: 'fa-solid fa-virus-covid' },
  pulmo: { label: 'Hô hấp', icon: 'fa-solid fa-lungs' },
  gi: { label: 'Tiêu hóa - Gan mật', icon: 'fa-solid fa-liver' },
  endo: { label: 'Nội tiết - Đái tháo đường', icon: 'fa-solid fa-droplet' },
  renal: { label: 'Thận - Điện giải', icon: 'fa-solid fa-filter' },
  neuro: { label: 'Thần kinh', icon: 'fa-solid fa-brain' },
  nutri: { label: 'Dinh dưỡng lâm sàng', icon: 'fa-solid fa-seedling' },
  hema: { label: 'Huyết học', icon: 'fa-solid fa-vial' },
  onco: { label: 'Ung bướu', icon: 'fa-solid fa-ribbon' },
  pedia: { label: 'Nhi khoa', icon: 'fa-solid fa-child-reaching' },
  obgyn: { label: 'Sản Phụ khoa', icon: 'fa-solid fa-person-pregnant' },
  derma: { label: 'Da liễu - Mô mềm', icon: 'fa-solid fa-hand-dots' }
};

export const RESEARCH_DESIGNS: Record<string, TaxonomyMeta> = {
  rct: {
    label: 'Thử nghiệm lâm sàng (RCT)',
    shortLabel: 'RCT',
    icon: 'fa-solid fa-flask-vial',
    tone: 'indigo'
  },
  'meta-analysis': {
    label: 'Phân tích gộp (Meta-Analysis)',
    shortLabel: 'Meta-Analysis',
    icon: 'fa-solid fa-layer-group',
    tone: 'violet'
  },
  'systematic-review': {
    label: 'Tổng quan hệ thống (SR)',
    shortLabel: 'Syst. Review',
    icon: 'fa-solid fa-magnifying-glass-chart',
    tone: 'teal'
  },
  'prospective-cohort': {
    label: 'Đoàn hệ tiến cứu (Prospective Cohort)',
    shortLabel: 'Cohort Tiến cứu',
    icon: 'fa-solid fa-users-viewfinder',
    tone: 'emerald'
  },
  'retrospective-cohort': {
    label: 'Đoàn hệ hồi cứu (Retrospective Cohort)',
    shortLabel: 'Cohort Hồi cứu',
    icon: 'fa-solid fa-clock-rotate-left',
    tone: 'amber'
  },
  'diagnostic-accuracy': {
    label: 'Nghiên cứu Chẩn đoán & Dấu ấn sinh học',
    shortLabel: 'Chẩn đoán (AUC)',
    icon: 'fa-solid fa-bullseye',
    tone: 'teal'
  },
  'clinical-review': {
    label: 'Tổng quan chuyên sâu (State-of-the-Art)',
    shortLabel: 'Deep Review',
    icon: 'fa-solid fa-book-journal-whills',
    tone: 'slate'
  }
};

export const OUTCOME_DIRECTIONS: Record<string, TaxonomyMeta> = {
  'positive-superior': {
    label: 'Vượt trội / Có lợi có ý nghĩa (Positive)',
    shortLabel: 'Positive (Vượt trội)',
    icon: 'fa-solid fa-arrow-trend-up',
    tone: 'emerald'
  },
  'non-inferior': {
    label: 'Không thua kém (Non-Inferior)',
    shortLabel: 'Non-Inferior',
    icon: 'fa-solid fa-equals',
    tone: 'teal'
  },
  'mixed-coprimary': {
    label: 'Kết cục kép phân hóa (Mixed Endpoints)',
    shortLabel: 'Mixed (Phân hóa)',
    icon: 'fa-solid fa-code-branch',
    tone: 'amber'
  },
  'neutral-null': {
    label: 'Trung tính / Không khác biệt (Neutral / Null)',
    shortLabel: 'Neutral / Null',
    icon: 'fa-solid fa-minus',
    tone: 'slate'
  },
  'harm-negative': {
    label: 'Bất lợi / Cảnh báo an toàn (Harm / Negative)',
    shortLabel: 'Harm / Negative',
    icon: 'fa-solid fa-triangle-exclamation',
    tone: 'rose'
  }
};

export const IMPACT_VERDICTS: Record<string, TaxonomyMeta> = {
  'practice-changing': {
    label: 'Thay đổi thực hành (Practice-Changing)',
    shortLabel: 'Practice-Changing',
    icon: 'fa-solid fa-bolt',
    tone: 'indigo'
  },
  'practice-informing': {
    label: 'Định hướng cá thể hóa (Practice-Informing)',
    shortLabel: 'Practice-Informing',
    icon: 'fa-solid fa-compass-drafting',
    tone: 'teal'
  },
  confirmatory: {
    label: 'Củng cố bằng chứng (Confirmatory)',
    shortLabel: 'Confirmatory',
    icon: 'fa-solid fa-shield-halved',
    tone: 'emerald'
  },
  'hypothesis-generating': {
    label: 'Gợi mở giả thuyết (Hypothesis-Generating)',
    shortLabel: 'Hypothesis-Gen',
    icon: 'fa-solid fa-lightbulb',
    tone: 'amber'
  }
};

export const INTERVENTION_CLASSES: Record<string, string> = {
  sglt2i: 'Thuốc ức chế SGLT2 (SGLT2i)',
  statin: 'Liệu pháp Statin / Hạ Lipid',
  'systemic-corticosteroid': 'Corticosteroid hệ thống (ICU / Hô hấp)',
  'antimicrobial-pkpd': 'Kháng sinh & Tối ưu hóa PK/PD',
  'fluid-electrolyte-acidbase': 'Dịch truyền, Điện giải & Toan kiềm',
  'vasopressor-hemodynamics': 'Thuốc vận mạch & Huyết động',
  'respiratory-support': 'Thông khí bảo vệ phổi & Nằm sấp (ARDS)',
  'biomarker-diagnostics': 'Dấu ấn sinh học & Chẩn đoán hình ảnh',
  'nutrition-microbiome': 'Can thiệp Dinh dưỡng & Hệ vi sinh',
  'neuro-critical-care': 'Điều trị Thần kinh & Chống co thắt',
  'hepatology-portal': 'Quản lý Bệnh gan, Cổ trướng & Đồng nhiễm'
};

export const ENDPOINT_CATEGORIES: Record<string, string> = {
  mortality: 'Tử vong (Mortality 28d / CV / All-cause)',
  mace: 'Biến cố Tim mạch chính (MACE)',
  'severity-prognosis': 'Tiên lượng độ nặng & Biến chứng',
  'diagnostic-performance': 'Hiệu năng chẩn đoán (AUC / Sens / Spec)',
  'clinical-recovery': 'Phục hồi lâm sàng & Thời gian nằm viện',
  'metabolic-control': 'Kiểm soát chuyển hóa, Huyết áp & Cân nặng',
  'organ-protection': 'Bảo vệ tạng (Thận, Phổi, Gan, Thần kinh)'
};

export const RESEARCH_CONDITIONS: Record<string, string> = {
  'heart-failure': 'Suy tim & Tim mạch - ĐTĐ (ASCVD/HF)',
  dyslipidemia: 'Rối loạn lipid máu & Dự phòng xơ vữa',
  hypertension: 'Tăng huyết áp',
  syncope: 'Ngất (Syncope) & Cấp cứu tim mạch',
  pneumonia: 'Viêm phổi cộng đồng nặng (SCAP)',
  ards: 'Hội chứng suy hô hấp cấp (ARDS)',
  sepsis: 'Nhiễm khuẩn huyết & Sốc nhiễm khuẩn (Sepsis)',
  'metabolic-acidosis': 'Toan chuyển hóa nặng & AKI tại ICU',
  'dengue-fever': 'Sốt xuất huyết Dengue',
  'amr-mrsa': 'Vi khuẩn kháng thuốc (MRSA / Đa kháng)',
  ssti: 'Nhiễm trùng da & mô mềm (SSTI)',
  tb: 'Bệnh Lao & Lao thai kỳ',
  tetanus: 'Bệnh Uốn ván (Tetanus)',
  'viral-encephalitis': 'Viêm não virus',
  'hiv-hepatitis-coinfection': 'Đồng nhiễm HIV & Viêm gan virus',
  'refractory-ascites': 'Xơ gan & Cổ trướng kháng trị',
  'cystic-hepatic-lesions': 'Tổn thương nang gan',
  obesity: 'Béo phì & Hội chứng chuyển hóa',
  'gut-health': 'Rối loạn chức năng ruột & Hệ vi sinh'
};

export const ROB_LABELS: Record<string, { label: string; tone: TaxonomyMeta['tone'] }> = {
  low: { label: 'Nguy cơ sai lệch Thấp (Low RoB)', tone: 'emerald' },
  'some-concerns': { label: 'Có quan ngại (Some Concerns)', tone: 'amber' },
  high: { label: 'Nguy cơ sai lệch Cao (High RoB)', tone: 'rose' },
  'not-applicable': { label: 'Tổng quan chuyên đề (N/A)', tone: 'slate' }
};

export const GRADE_LABELS: Record<string, { label: string; stars: string; tone: TaxonomyMeta['tone'] }> = {
  high: { label: 'GRADE Cao (High)', stars: '⊕⊕⊕⊕', tone: 'emerald' },
  moderate: { label: 'GRADE Trung bình (Moderate)', stars: '⊕⊕⊕◯', tone: 'teal' },
  low: { label: 'GRADE Thấp (Low)', stars: '⊕⊕◯◯', tone: 'amber' },
  'very-low': { label: 'GRADE Rất thấp (Very Low)', stars: '⊕◯◯◯', tone: 'rose' }
};
