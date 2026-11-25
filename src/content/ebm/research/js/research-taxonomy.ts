/**
 * CliniPortal 2.0 — Standardized Research Label Taxonomy & Atomic Decomposer (9 Faceted Axes)
 * Path: src/content/ebm/research/js/research-taxonomy.ts
 */

import type {
  AtomicLabelAxis,
  LabelOverlapReport,
  LabelTone,
  ResearchAtomicLabel,
  ResearchStudyRecord
} from './research-types';

export interface TaxonomyMeta {
  label: string;
  shortLabel?: string;
  icon: string;
  tone: LabelTone;
}

export const ATOMIC_AXIS_META: Record<
  AtomicLabelAxis,
  { title: string; short: string; icon: string; tone: LabelTone; description: string }
> = {
  condition: {
    title: 'Bệnh Lý & Vấn Đề Lâm Sàng',
    short: 'Bệnh / Vấn đề',
    icon: 'fa-solid fa-stethoscope',
    tone: 'indigo',
    description: 'Nhóm bệnh lý trung tâm, mã ICD-10 và câu hỏi bệnh học cụ thể'
  },
  population: {
    title: 'Quần Thể Nghiên Cứu (P)',
    short: 'Quần thể (P)',
    icon: 'fa-solid fa-users',
    tone: 'teal',
    description: 'Đặc điểm dân số tuyển chọn, bối cảnh nội viện/cộng đồng và độ tuổi'
  },
  design: {
    title: 'Thiết Kế & Phương Pháp Luận',
    short: 'Thiết kế',
    icon: 'fa-solid fa-flask-vial',
    tone: 'violet',
    description: 'Bậc thiết kế nghiên cứu (RCT, Meta, Cohort, Chẩn đoán), làm mù và quy mô trung tâm'
  },
  intervention: {
    title: 'Nhóm Can Thiệp / Tác Nhân (I)',
    short: 'Can thiệp (I)',
    icon: 'fa-solid fa-pills',
    tone: 'indigo',
    description: 'Lớp thuốc, chiến lược điều trị hoặc dấu ấn sinh học khảo sát'
  },
  comparator: {
    title: 'Nhóm Đối Chứng (C)',
    short: 'Đối chứng (C)',
    icon: 'fa-solid fa-scale-unbalanced',
    tone: 'slate',
    description: 'Giả dược, điều trị chuẩn, đối chứng chủ động hay phân tầng đối chiếu'
  },
  endpoint: {
    title: 'Nhóm Tiêu Chí Kết Cục (O)',
    short: 'Kết cục (O)',
    icon: 'fa-solid fa-bullseye',
    tone: 'teal',
    description: 'Tử vong, MACE, tiên lượng nặng, hiệu năng chẩn đoán (AUC) hay phục hồi'
  },
  outcome: {
    title: 'Hướng Kết Quả & Phán Quyết',
    short: 'Hướng KQ',
    icon: 'fa-solid fa-arrow-trend-up',
    tone: 'emerald',
    description: 'Chiều hướng bằng chứng (Positive / Mixed / Neutral / Harm) và tác động lâm sàng'
  },
  quality: {
    title: 'Thẩm Định RoB, GRADE & Tài Trợ',
    short: 'RoB / GRADE',
    icon: 'fa-solid fa-shield-halved',
    tone: 'amber',
    description: 'Nguy cơ sai lệch Cochrane RoB 2.0, độ chắc chắn GRADE và nguồn tài trợ'
  },
  topic: {
    title: 'Từ Khóa Chủ Đề Đối Chiếu',
    short: 'Chủ đề (#)',
    icon: 'fa-solid fa-hashtag',
    tone: 'rose',
    description: 'Các thẻ chủ đề chuyên sâu gom cụm những nghiên cứu trả lời cùng câu hỏi'
  }
};

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
  'hepatology-portal': 'Quản lý Bệnh gan, Cổ trướng & Đồng nhiễm',
  'vaccine-immunization': 'Vắc-xin & Miễn dịch dự phòng'
};

export const COMPARATOR_TYPES: Record<string, string> = {
  placebo: 'Giả dược (Placebo)',
  'placebo-or-standard': 'Giả dược / Điều trị chuẩn',
  'active-control': 'Đối chứng chủ động (Active Control)',
  'standard-of-care': 'Điều trị nền tiêu chuẩn (SoC)',
  'severity-strata': 'Phân tầng theo mức độ nặng',
  'normal-electrolytes': 'Nhóm điện giải bình thường',
  'crp-wbc-standard': 'Xét nghiệm chuẩn (WBC / CRP)',
  'placebo-and-active-coadmin': 'Giả dược & Tiêm đơn độc đối chứng'
};

export const ENDPOINT_CATEGORIES: Record<string, string> = {
  mortality: 'Tử vong (Mortality 28d / CV / All-cause)',
  mace: 'Biến cố Tim mạch chính (MACE)',
  'severity-prognosis': 'Tiên lượng độ nặng & Biến chứng',
  'diagnostic-performance': 'Hiệu năng chẩn đoán (AUC / Sens / Spec)',
  'clinical-recovery': 'Phục hồi lâm sàng & Thời gian nằm viện',
  'metabolic-control': 'Kiểm soát chuyển hóa, Huyết áp & Cân nặng',
  'organ-protection': 'Bảo vệ tạng (Thận, Phổi, Gan, Thần kinh)',
  'vaccine-efficacy-safety': 'Hiệu lực vắc-xin (VE), Miễn dịch & An toàn (AEFI)'
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

export const PROBLEM_LABELS_VI: Record<string, string> = {
  'dengue-electrolytes': 'Điện giải trong Dengue',
  hyponatremia: 'Hạ Natri máu',
  'severe-dengue-prognosis': 'Tiên lượng Dengue nặng',
  'length-of-stay': 'Thời gian nằm viện (LOS)',
  mortality: 'Tử vong nội viện',
  'mortality-28d': 'Tử vong ngày 28',
  'primary-prevention': 'Dự phòng tiên phát (Cấp 1)',
  'secondary-prevention': 'Dự phòng thứ phát (Cấp 2)',
  'cvd-risk-reduction': 'Giảm nguy cơ tim mạch',
  'older-adults-70plus': 'Người cao tuổi ≥ 70',
  'disability-free-survival': 'Sống sót không tàn tật',
  't2dm-ascvd': 'ĐTĐ típ 2 kèm ASCVD',
  'cardiovascular-mortality': 'Tử vong tim mạch',
  'heart-failure-hospitalization': 'Nhập viện do suy tim',
  'severe-cap': 'Viêm phổi cộng đồng nặng (SCAP)',
  'icu-respiratory-failure': 'Suy hô hấp tại ICU',
  'acute-fever-triage': 'Phân loại sốt cấp tính',
  'nlr-mlr-biomarker': 'Chỉ số NLR / MLR',
  'bacterial-vs-noninfectious': 'Phân biệt nhiễm khuẩn vs không nhiễm khuẩn',
  'weight-loss': 'Giảm cân lâm sàng',
  'cardiometabolic-markers': 'Chỉ số chuyển hóa - lipid',
  'dietary-comparison': 'Đối chiếu chế độ ăn',
  'gut-barrier-integrity': 'Toàn vẹn hàng rào ruột',
  'bowel-regularity': 'Điều hòa tính chất phân (BSFS)',
  microbiome: 'Hệ vi sinh vật ruột',
  'dengue-vaccination': 'Tiêm chủng phòng Dengue (TAK-003)',
  'vaccine-coadministration': 'Tiêm đồng thời nhiều vắc-xin',
  'post-marketing-safety': 'An toàn hậu lưu hành (AEFI)'
};

export const POPULATION_TAGS_VI: Record<string, string> = {
  'hospitalized-dengue': 'BN Dengue nhập viện',
  'asian-cohort': 'Quần thể Châu Á',
  adults: 'Người trưởng thành (≥18t)',
  'adults-pooled': 'Người lớn đa nghiên cứu',
  'functional-gi-symptoms': 'Rối loạn tiêu hóa chức năng',
  'elderly-70plus': 'Người cao tuổi ≥ 70 tuổi',
  'community-dwelling': 'Sống độc lập cộng đồng',
  'no-prior-cvd': 'Chưa có bệnh tim mạch',
  'high-cvd-risk': 'Nguy cơ tim mạch cao',
  'icu-adults': 'Người lớn tại ICU',
  'severe-cap-non-septic-shock': 'SCAP chưa sốc nhiễm khuẩn',
  'overweight-obesity': 'Thừa cân / Béo phì',
  'metabolic-syndrome': 'Hội chứng chuyển hóa',
  'hospitalized-fever': 'BN sốt nhập viện',
  'ed-adults': 'Người lớn cấp cứu (ED)',
  t2dm: 'Đái tháo đường típ 2',
  'established-ascvd': 'Đã xác lập ASCVD',
  'pediatric-adolescent': 'Trẻ em & Thanh thiếu niên (4–16t)',
  'endemic-population': 'Dân số vùng lưu hành dịch tễ',
  'seropositive-and-seronegative': 'Cả huyết thanh dương & âm tính'
};

export const TOPIC_TAGS_VI: Record<string, string> = {
  dengue: 'Sốt xuất huyết Dengue',
  'vac-xin-dengue': 'Vắc-xin Dengue (TAK-003)',
  'tiem-dong-thoi': 'Tiêm đồng thời (Co-administration)',
  'an-toan-aefi': 'Giám sát an toàn AEFI',
  'tong-quan-prisma': 'Tổng quan hệ thống PRISMA',
  'ha-natri-mau': 'Hạ Natri máu',
  'roi-loan-dien-giai': 'Rối loạn điện giải',
  'tien-luong': 'Tiên lượng nặng',
  'ket-qua-am-tinh': 'Kết quả âm tính / Trung tính',
  probiotics: 'Men vi sinh (Probiotics)',
  'hang-rao-ruot': 'Hàng rào ruột (Zonulin)',
  'he-vi-sinh': 'Hệ vi sinh (Microbiome)',
  statin: 'Liệu pháp Statin',
  'du-phong-tien-phat': 'Dự phòng tiên phát',
  'du-phong-thu-phat': 'Dự phòng thứ phát',
  'du-phong-tim-mach': 'Dự phòng tim mạch',
  'lao-khoa': 'Lão khoa (≥ 70 tuổi)',
  'ket-cuc-kep': 'Kết cục chính kép',
  'meta-analysis': 'Phân tích gộp',
  'corticoid-icu': 'Corticoid tại ICU',
  'viem-phoi-nang': 'Viêm phổi nặng (SCAP)',
  'giam-dat-nkq': 'Giảm đặt nội khí quản',
  'dinh-duong-chuyen-hoa': 'Dinh dưỡng chuyển hóa',
  'low-carb': 'Chế độ ăn Low-Carb',
  'giam-can': 'Giảm cân',
  'dau-an-sinh-hoc': 'Dấu ấn sinh học',
  'nlr-mlr': 'Tỷ số NLR / MLR',
  'chan-doan-sot': 'Chẩn đoán sốt cấp',
  sepsis: 'Nhiễm khuẩn huyết / Sepsis',
  sglt2i: 'Ức chế SGLT2 (SGLT2i)',
  'bao-ve-tim-than': 'Bảo vệ Tim - Thận'
};

export const FUNDING_LABELS: Record<string, { label: string; tone: LabelTone }> = {
  'public-academic': { label: 'Công lập / Hàn lâm độc lập', tone: 'emerald' },
  'industry-pharma': { label: 'Tài trợ Dược phẩm / Công nghiệp', tone: 'amber' },
  mixed: { label: 'Đồng tài trợ Công - Tư', tone: 'teal' },
  unknown: { label: 'Chưa ghi nhận nguồn tài trợ', tone: 'slate' }
};

export const ROB_LABELS: Record<string, { label: string; shortLabel: string; tone: LabelTone }> = {
  low: { label: 'Nguy cơ sai lệch Thấp (Low RoB)', shortLabel: 'RoB Thấp', tone: 'emerald' },
  'some-concerns': { label: 'Có quan ngại (Some Concerns)', shortLabel: 'RoB Quan ngại', tone: 'amber' },
  high: { label: 'Nguy cơ sai lệch Cao (High RoB)', shortLabel: 'RoB Cao', tone: 'rose' },
  'not-applicable': { label: 'Tổng quan chuyên đề (N/A)', shortLabel: 'RoB N/A', tone: 'slate' }
};

export const GRADE_LABELS: Record<
  string,
  { label: string; shortLabel: string; stars: string; rank: number; tone: LabelTone }
> = {
  high: { label: 'GRADE Cao (High)', shortLabel: 'GRADE Cao', stars: '⊕⊕⊕⊕', rank: 4, tone: 'emerald' },
  moderate: {
    label: 'GRADE Trung bình (Moderate)',
    shortLabel: 'GRADE TB',
    stars: '⊕⊕⊕◯',
    rank: 3,
    tone: 'teal'
  },
  low: { label: 'GRADE Thấp (Low)', shortLabel: 'GRADE Thấp', stars: '⊕⊕◯◯', rank: 2, tone: 'amber' },
  'very-low': {
    label: 'GRADE Rất thấp (Very Low)',
    shortLabel: 'GRADE Rất thấp',
    stars: '⊕◯◯◯',
    rank: 1,
    tone: 'rose'
  }
};

export function humanizeSlugLabel(raw: string, map?: Record<string, string>): string {
  if (!raw) return '';
  if (map && map[raw]) return map[raw];
  return raw
    .split('-')
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
    .join(' ');
}

/**
 * Decomposes a single research study into structured, clickable atomic labels across 9 axes.
 * This is the core engine powering Label Anatomy Strips, Label Atlas, and Shared/Diff Comparison.
 */
export function decomposeStudyLabels(study: ResearchStudyRecord): ResearchAtomicLabel[] {
  const labels: ResearchAtomicLabel[] = [];

  // 1. Condition & Problem labels
  if (study.conditionKey) {
    labels.push({
      key: `condition:${study.conditionKey}`,
      axis: 'condition',
      axisTitle: ATOMIC_AXIS_META.condition.title,
      axisShort: 'Bệnh lý',
      facetKey: 'conditionKey',
      value: study.conditionKey,
      label: RESEARCH_CONDITIONS[study.conditionKey] || humanizeSlugLabel(study.conditionKey),
      icon: 'fa-solid fa-stethoscope',
      tone: 'indigo',
      isPrimary: true
    });
  }
  for (const p of study.problemLabels || []) {
    labels.push({
      key: `condition:prob:${p}`,
      axis: 'condition',
      axisTitle: ATOMIC_AXIS_META.condition.title,
      axisShort: 'Vấn đề',
      facetKey: 'problemLabel',
      value: p,
      label: humanizeSlugLabel(p, PROBLEM_LABELS_VI),
      icon: 'fa-solid fa-tag',
      tone: 'indigo',
      isPrimary: false
    });
  }

  // 2. Population labels
  for (const pop of study.populationTags || []) {
    labels.push({
      key: `population:${pop}`,
      axis: 'population',
      axisTitle: ATOMIC_AXIS_META.population.title,
      axisShort: 'Quần thể',
      facetKey: 'populationTag',
      value: pop,
      label: humanizeSlugLabel(pop, POPULATION_TAGS_VI),
      icon: 'fa-solid fa-users',
      tone: 'teal',
      isPrimary: true
    });
  }

  // 3. Design label
  if (study.design) {
    const dm = RESEARCH_DESIGNS[study.design];
    labels.push({
      key: `design:${study.design}`,
      axis: 'design',
      axisTitle: ATOMIC_AXIS_META.design.title,
      axisShort: 'Thiết kế',
      facetKey: 'design',
      value: study.design,
      label: dm?.shortLabel || study.design,
      icon: dm?.icon || 'fa-solid fa-flask-vial',
      tone: dm?.tone || 'violet',
      isPrimary: true
    });
  }

  // 4. Intervention Class
  if (study.interventionClass) {
    labels.push({
      key: `intervention:${study.interventionClass}`,
      axis: 'intervention',
      axisTitle: ATOMIC_AXIS_META.intervention.title,
      axisShort: 'Can thiệp',
      facetKey: 'interventionClass',
      value: study.interventionClass,
      label: INTERVENTION_CLASSES[study.interventionClass] || humanizeSlugLabel(study.interventionClass),
      icon: 'fa-solid fa-pills',
      tone: 'violet',
      isPrimary: true
    });
  }

  // 5. Comparator Type
  if (study.comparatorType) {
    labels.push({
      key: `comparator:${study.comparatorType}`,
      axis: 'comparator',
      axisTitle: ATOMIC_AXIS_META.comparator.title,
      axisShort: 'Đối chứng',
      facetKey: 'comparatorType',
      value: study.comparatorType,
      label: COMPARATOR_TYPES[study.comparatorType] || humanizeSlugLabel(study.comparatorType),
      icon: 'fa-solid fa-scale-unbalanced',
      tone: 'slate',
      isPrimary: true
    });
  }

  // 6. Primary Endpoint Category
  if (study.primaryEndpointCategory) {
    labels.push({
      key: `endpoint:${study.primaryEndpointCategory}`,
      axis: 'endpoint',
      axisTitle: ATOMIC_AXIS_META.endpoint.title,
      axisShort: 'Kết cục',
      facetKey: 'endpointCategory',
      value: study.primaryEndpointCategory,
      label:
        ENDPOINT_CATEGORIES[study.primaryEndpointCategory] ||
        humanizeSlugLabel(study.primaryEndpointCategory),
      icon: 'fa-solid fa-bullseye',
      tone: 'teal',
      isPrimary: true
    });
  }

  // 7. Outcome Direction & Impact Verdict
  if (study.outcomeDirection) {
    const om = OUTCOME_DIRECTIONS[study.outcomeDirection];
    labels.push({
      key: `outcome:dir:${study.outcomeDirection}`,
      axis: 'outcome',
      axisTitle: ATOMIC_AXIS_META.outcome.title,
      axisShort: 'Hướng KQ',
      facetKey: 'outcomeDirection',
      value: study.outcomeDirection,
      label: om?.shortLabel || study.outcomeDirection,
      icon: om?.icon || 'fa-solid fa-arrow-trend-up',
      tone: om?.tone || 'emerald',
      isPrimary: true
    });
  }
  if (study.impactVerdict) {
    const vm = IMPACT_VERDICTS[study.impactVerdict];
    labels.push({
      key: `outcome:verdict:${study.impactVerdict}`,
      axis: 'outcome',
      axisTitle: ATOMIC_AXIS_META.outcome.title,
      axisShort: 'Phán quyết',
      facetKey: 'impactVerdict',
      value: study.impactVerdict,
      label: vm?.shortLabel || study.impactVerdict,
      icon: vm?.icon || 'fa-solid fa-bolt',
      tone: vm?.tone || 'indigo',
      isPrimary: false
    });
  }

  // 8. Quality Appraisal (RoB + GRADE + Funding)
  if (study.robOverall) {
    const rm = ROB_LABELS[study.robOverall];
    labels.push({
      key: `quality:rob:${study.robOverall}`,
      axis: 'quality',
      axisTitle: ATOMIC_AXIS_META.quality.title,
      axisShort: 'RoB 2.0',
      facetKey: 'robOverall',
      value: study.robOverall,
      label: rm?.shortLabel || study.robOverall,
      icon: 'fa-solid fa-shield-halved',
      tone: rm?.tone || 'amber',
      isPrimary: true
    });
  }
  if (study.gradeCertainty) {
    const gm = GRADE_LABELS[study.gradeCertainty];
    labels.push({
      key: `quality:grade:${study.gradeCertainty}`,
      axis: 'quality',
      axisTitle: ATOMIC_AXIS_META.quality.title,
      axisShort: 'GRADE',
      facetKey: 'gradeCertainty',
      value: study.gradeCertainty,
      label: gm ? `${gm.stars} ${gm.shortLabel}` : study.gradeCertainty,
      icon: 'fa-solid fa-award',
      tone: gm?.tone || 'teal',
      isPrimary: true
    });
  }
  if (study.fundingSource) {
    const fm = FUNDING_LABELS[study.fundingSource];
    labels.push({
      key: `quality:fund:${study.fundingSource}`,
      axis: 'quality',
      axisTitle: ATOMIC_AXIS_META.quality.title,
      axisShort: 'Tài trợ',
      facetKey: 'fundingSource',
      value: study.fundingSource,
      label: fm?.label || study.fundingSource,
      icon: 'fa-solid fa-building-columns',
      tone: fm?.tone || 'slate',
      isPrimary: false
    });
  }

  // 9. Topic Tags
  for (const tag of study.topicTags || []) {
    labels.push({
      key: `topic:${tag}`,
      axis: 'topic',
      axisTitle: ATOMIC_AXIS_META.topic.title,
      axisShort: 'Chủ đề',
      facetKey: 'topicTag',
      value: tag,
      label: `#${TOPIC_TAGS_VI[tag] || tag}`,
      icon: 'fa-solid fa-hashtag',
      tone: 'rose',
      isPrimary: false
    });
  }

  return labels;
}

/**
 * Computes exact atomic label overlap (Shared DNA) vs divergence across 2–5 studies.
 */
export function computeLabelOverlap(studies: ResearchStudyRecord[]): LabelOverlapReport {
  if (studies.length < 2) {
    return { similarityPercent: 100, sharedLabels: [], divergentAxes: [] };
  }

  const perStudy = studies.map((s) => ({
    study: s,
    labels: decomposeStudyLabels(s)
  }));

  const labelByKey = new Map<string, ResearchAtomicLabel>();
  const keyCount = new Map<string, number>();

  for (const entry of perStudy) {
    const seenInThis = new Set<string>();
    for (const lbl of entry.labels) {
      labelByKey.set(lbl.key, lbl);
      if (!seenInThis.has(lbl.key)) {
        seenInThis.add(lbl.key);
        keyCount.set(lbl.key, (keyCount.get(lbl.key) || 0) + 1);
      }
    }
  }

  const sharedLabels: ResearchAtomicLabel[] = [];
  for (const [k, cnt] of keyCount.entries()) {
    if (cnt === studies.length) {
      const found = labelByKey.get(k);
      if (found) sharedLabels.push(found);
    }
  }

  const totalUnique = keyCount.size || 1;
  // Weighted Jaccard across all atomic labels
  const similarityPercent = Math.round((sharedLabels.length / totalUnique) * 100);

  const axesOrder: AtomicLabelAxis[] = [
    'condition',
    'population',
    'design',
    'intervention',
    'comparator',
    'endpoint',
    'outcome',
    'quality',
    'topic'
  ];

  const divergentAxes: LabelOverlapReport['divergentAxes'] = [];
  for (const axis of axesOrder) {
    const sigs = perStudy.map((entry) =>
      entry.labels
        .filter((l) => l.axis === axis)
        .map((l) => l.key)
        .sort()
        .join('|')
    );
    if (new Set(sigs).size > 1) {
      divergentAxes.push({
        axis,
        axisTitle: ATOMIC_AXIS_META[axis].title,
        valuesByStudy: perStudy.map((entry) => ({
          studyId: entry.study.id,
          studyLabel: entry.study.trialAcronym || `${entry.study.journal} ${entry.study.year}`,
          labels: entry.labels.filter((l) => l.axis === axis)
        }))
      });
    }
  }

  return {
    similarityPercent,
    sharedLabels,
    divergentAxes
  };
}
