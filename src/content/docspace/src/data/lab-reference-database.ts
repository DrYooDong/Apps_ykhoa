/**
 * CliniPortal DocSpace — Laboratory Reference & Panic Values Database
 * Bảng Tham Chiếu Cận Lâm Sàng & Ngưỡng Báo Động Đỏ Y Khoa (Critical / Panic Values)
 * Chuẩn hóa 50+ xét nghiệm thường quy và chuyên sâu tại giường bệnh
 */

export interface LabNormalRange {
  min?: number;
  max?: number;
  minMale?: number;
  maxMale?: number;
  minFemale?: number;
  maxFemale?: number;
  text?: string;
}

export interface LabReferenceItem {
  id: string;
  name: string;
  vietnameseName: string;
  category:
    | 'hematology'
    | 'coagulation'
    | 'biochemistry'
    | 'cardiac_markers'
    | 'inflammatory'
    | 'electrolytes'
    | 'blood_gas'
    | 'urinalysis'
    | 'csf'
    | 'endocrine';
  unit: string;
  normalRange: LabNormalRange;
  criticalLow?: number;        // Giá trị báo động đỏ thấp (Panic value)
  criticalHigh?: number;       // Giá trị báo động đỏ cao (Panic value)
  clinicalSignificanceHigh: string;
  clinicalSignificanceLow: string;
  relatedDiseases: string[];   // Mã các bệnh lý liên quan trong hệ thống
}

export const LAB_REFERENCE_DATABASE: Record<string, LabReferenceItem> = {
  // ─── HUYẾT HỌC & ĐÔNG MÁU ───────────────────────────────────────────────
  wbc: {
    id: 'wbc',
    name: 'White Blood Cell Count',
    vietnameseName: 'Số lượng Bạch cầu (WBC)',
    category: 'hematology',
    unit: 'G/L (10³/µL)',
    normalRange: { min: 4.0, max: 10.0 },
    criticalLow: 2.0,
    criticalHigh: 30.0,
    clinicalSignificanceHigh: 'Nhiễm trùng cấp tính, phản ứng giả lơ-xê-mi, bạch cầu cấp/mạn, stress hoại tử mô',
    clinicalSignificanceLow: 'Suy tủy xương, nhiễm virus nặng (Dengue, HIV), sốc nhiễm trùng Gram âm nặng, thuốc ức chế tủy',
    relatedDiseases: ['viem_phoi', 'soc_nhiem_khuan', 'viem_ruot_thua_cap', 'viem_tui_mat_cap', 'sot_xuat_huyet']
  },
  plt: {
    id: 'plt',
    name: 'Platelet Count',
    vietnameseName: 'Số lượng Tiểu cầu (PLT)',
    category: 'hematology',
    unit: 'G/L (10³/µL)',
    normalRange: { min: 150, max: 450 },
    criticalLow: 50,
    criticalHigh: 1000,
    clinicalSignificanceHigh: 'Tăng tiểu cầu tiên phát, phản ứng sau cắt lách, viêm mạn tính, thiếu máu thiếu sắt',
    clinicalSignificanceLow: 'Sốt xuất huyết Dengue nặng, xơ gan tăng áp cửa (lách to), đông máu nội mạch rải rác (DIC), ITP',
    relatedDiseases: ['sot_xuat_huyet', 'xo_gan', 'soc_nhiem_khuan', 'xuat_huyet_tieu_hoa_tren']
  },
  hct: {
    id: 'hct',
    name: 'Hematocrit',
    vietnameseName: 'Thể tích khối hồng cầu (Hct)',
    category: 'hematology',
    unit: '%',
    normalRange: { minMale: 40, maxMale: 50, minFemale: 36, maxFemale: 44 },
    criticalLow: 20,
    criticalHigh: 60,
    clinicalSignificanceHigh: 'Cô đặc máu do mất huyết tương (Sốt xuất huyết Dengue ngày 3-7, bỏng nặng), đa hồng cầu',
    clinicalSignificanceLow: 'Xuất huyết tiêu hóa cấp tính, vỡ thai ngoài tử cung, thiếu máu mạn tính',
    relatedDiseases: ['sot_xuat_huyet', 'xuat_huyet_tieu_hoa_tren', 'thai_ngoai_tc', 'suy_than']
  },
  inr: {
    id: 'inr',
    name: 'International Normalized Ratio',
    vietnameseName: 'Chỉ số bình thường hóa quốc tế (INR)',
    category: 'coagulation',
    unit: 'ratio',
    normalRange: { min: 0.8, max: 1.2, text: '0.8 – 1.2 (người bình thường), 2.0 – 3.0 (điều trị Warfarin)' },
    criticalHigh: 5.0,
    clinicalSignificanceHigh: 'Suy gan cấp/mạn, quá liều thuốc kháng Vitamin K (nguy cơ xuất huyết cao), thiếu hụt Vitamin K, DIC',
    clinicalSignificanceLow: 'Tình trạng tăng đông máu',
    relatedDiseases: ['xo_gan', 'xuat_huyet_tieu_hoa_tren', 'rung_nhi']
  },
  d_dimer: {
    id: 'd_dimer',
    name: 'D-Dimer',
    vietnameseName: 'Định lượng D-Dimer',
    category: 'coagulation',
    unit: 'ng/mL (hoặc µg/mL FEU)',
    normalRange: { max: 500, text: '< 500 ng/mL (hoặc tuổi x 10 ở người > 50 tuổi)' },
    criticalHigh: 4000,
    clinicalSignificanceHigh: 'Thuyên tắc động mạch phổi (PE), huyết khối tĩnh mạch sâu (DVT), DIC, ung thư, sau phẫu thuật lớn',
    clinicalSignificanceLow: 'Giá trị dự báo âm tính rất cao (> 95%) để loại trừ PE/DVT ở nhóm nguy cơ thấp',
    relatedDiseases: ['thuyen_tac_phoi']
  },

  // ─── DẤU ẤN TIM MẠCH & VIÊM ──────────────────────────────────────────────
  hs_troponin: {
    id: 'hs_troponin',
    name: 'High-Sensitivity Troponin T/I',
    vietnameseName: 'Troponin siêu nhạy (hs-cTn)',
    category: 'cardiac_markers',
    unit: 'ng/L (pg/mL)',
    normalRange: { max: 14, text: '< 14 ng/L (hs-cTnT), < 16 ng/L nữ, < 34 ng/L nam (hs-cTnI)' },
    criticalHigh: 100,
    clinicalSignificanceHigh: 'Nhồi máu cơ tim cấp (động học tăng/giảm > 20-50%), viêm cơ tim cấp, PE nặng, suy tim cấp, suy thận nặng',
    clinicalSignificanceLow: 'Bình thường, loại trừ tổn thương tế bào cơ tim cấp',
    relatedDiseases: ['hoi_chung_vanh_cap', 'thuyen_tac_phoi', 'suy_tim']
  },
  nt_probnp: {
    id: 'nt_probnp',
    name: 'N-terminal pro-B-type Natriuretic Peptide',
    vietnameseName: 'Định lượng NT-proBNP',
    category: 'cardiac_markers',
    unit: 'pg/mL',
    normalRange: { max: 125, text: '< 125 pg/mL (< 75 tuổi), < 450 pg/mL (≥ 75 tuổi)' },
    criticalHigh: 5000,
    clinicalSignificanceHigh: 'Suy tim cấp ứ trệ (điểm cắt loại trừ < 300 pg/mL; chẩn đoán: > 450 pg/mL nếu < 50 tuổi, > 900 nếu 50-75 tuổi, > 1800 nếu > 75 tuổi)',
    clinicalSignificanceLow: 'Loại trừ suy tim cấp ở bệnh nhân khó thở cấp tính',
    relatedDiseases: ['suy_tim', 'thuyen_tac_phoi']
  },
  crp: {
    id: 'crp',
    name: 'C-Reactive Protein',
    vietnameseName: 'Protein phản ứng C (CRP)',
    category: 'inflammatory',
    unit: 'mg/L',
    normalRange: { max: 5.0 },
    criticalHigh: 100.0,
    clinicalSignificanceHigh: 'Nhiễm trùng vi khuẩn cấp tính (thường > 20-50 mg/L), đợt bùng phát bệnh tự miễn, viêm tụy hoại tử',
    clinicalSignificanceLow: 'Không có tình trạng viêm cấp tính',
    relatedDiseases: ['viem_phoi', 'soc_nhiem_khuan', 'viem_ruot_thua_cap', 'viem_tui_mat_cap', 'viem_tuy_cap']
  },
  procalcitonin: {
    id: 'procalcitonin',
    name: 'Procalcitonin (PCT)',
    vietnameseName: 'Định lượng Procalcitonin',
    category: 'inflammatory',
    unit: 'ng/mL',
    normalRange: { max: 0.05, text: '< 0.05 ng/mL (bình thường)' },
    criticalHigh: 2.0,
    clinicalSignificanceHigh: 'Nhiễm khuẩn huyết nặng, sốc nhiễm khuẩn (PCT > 2.0 ng/mL), viêm phổi do vi khuẩn (PCT > 0.25 ng/mL)',
    clinicalSignificanceLow: 'Nhiễm virus đơn thuần, không có chỉ định dùng kháng sinh (PCT < 0.1 ng/mL)',
    relatedDiseases: ['soc_nhiem_khuan', 'viem_phoi']
  },

  // ─── SINH HÓA THẬN & GAN MẬT ─────────────────────────────────────────────
  creatinine: {
    id: 'creatinine',
    name: 'Serum Creatinine',
    vietnameseName: 'Creatinine huyết thanh',
    category: 'biochemistry',
    unit: 'µmol/L',
    normalRange: { minMale: 62, maxMale: 115, minFemale: 53, maxFemale: 97 },
    criticalHigh: 500,
    clinicalSignificanceHigh: 'Tổn thương thận cấp (tăng ≥ 26.5 µmol/L trong 48h), đợt cấp bệnh thận mạn, suy thận mất bù',
    clinicalSignificanceLow: 'Teo cơ nặng, suy dinh dưỡng, thai kỳ',
    relatedDiseases: ['suy_than', 'soc_nhiem_khuan', 'dai_thao_duong', 'tang_huyet_ap']
  },
  glucose: {
    id: 'glucose',
    name: 'Fasting Plasma Glucose',
    vietnameseName: 'Glucose máu',
    category: 'biochemistry',
    unit: 'mmol/L',
    normalRange: { min: 3.9, max: 6.4, text: '3.9 – 6.4 mmol/L (đói); < 7.8 mmol/L (sau ăn 2h)' },
    criticalLow: 2.8,
    criticalHigh: 25.0,
    clinicalSignificanceHigh: 'Nhiễm toan ceton do ĐTĐ (DKA), tăng áp lực thẩm thấu (HHS), đái tháo đường chưa kiểm soát',
    clinicalSignificanceLow: 'Hạ đường huyết cấp tính do quá liều insulin/sulfonylurea, suy thượng thận cấp, u tiết insulin',
    relatedDiseases: ['dai_thao_duong', 'nhiem_toan_ceton_dka', 'ha_duong_huyet_cap', 'suy_thuong_than_cap']
  },
  ast: {
    id: 'ast',
    name: 'Aspartate Aminotransferase (AST/GOT)',
    vietnameseName: 'Men gan AST',
    category: 'biochemistry',
    unit: 'U/L',
    normalRange: { min: 0, max: 40 },
    criticalHigh: 1000,
    clinicalSignificanceHigh: 'Hoại tử tế bào gan cấp (viêm gan virus cấp, ngộ độc Paracetamol > 1000 U/L), viêm gan do rượu (AST/ALT > 2), sốc gan',
    clinicalSignificanceLow: 'Bình thường',
    relatedDiseases: ['xo_gan', 'sot_xuat_huyet', 'soc_nhiem_khuan']
  },
  alt: {
    id: 'alt',
    name: 'Alanine Aminotransferase (ALT/GPT)',
    vietnameseName: 'Men gan ALT',
    category: 'biochemistry',
    unit: 'U/L',
    normalRange: { minMale: 0, maxMale: 35, minFemale: 0, maxFemale: 25 },
    criticalHigh: 1000,
    clinicalSignificanceHigh: 'Tổn thương tế bào gan đặc hiệu (viêm gan virus, viêm gan nhiễm mỡ, viêm gan do thuốc)',
    clinicalSignificanceLow: 'Bình thường',
    relatedDiseases: ['xo_gan', 'sot_xuat_huyet']
  },
  amylase_lipase: {
    id: 'amylase_lipase',
    name: 'Serum Lipase',
    vietnameseName: 'Men tụy Lipase máu',
    category: 'biochemistry',
    unit: 'U/L',
    normalRange: { min: 10, max: 60, text: '< 60 U/L (ngưỡng chẩn đoán VTC: > 3 lần GHBT > 180 U/L)' },
    criticalHigh: 500,
    clinicalSignificanceHigh: 'Viêm tụy cấp (độ nhạy và độ đặc hiệu cao hơn Amylase), tắc nghẽn ống tụy, thủng tạng rỗng',
    clinicalSignificanceLow: 'Bình thường, xơ tụy giai đoạn cuối',
    relatedDiseases: ['viem_tuy_cap']
  },

  // ─── ĐIỆN GIẢI ĐỒ & KHÍ MÁU ──────────────────────────────────────────────
  potassium: {
    id: 'potassium',
    name: 'Serum Potassium (K+)',
    vietnameseName: 'Kali huyết thanh (K+)',
    category: 'electrolytes',
    unit: 'mmol/L',
    normalRange: { min: 3.5, max: 5.0 },
    criticalLow: 2.8,
    criticalHigh: 6.5,
    clinicalSignificanceHigh: 'Nguy cơ rung thất, ngừng tim! Gặp trong suy thận cấp, toan hóa máu, suy thượng thận, dùng thuốc ACEi/ARB/MRA',
    clinicalSignificanceLow: 'Nguy cơ xoắn đỉnh, yếu liệt cơ! Gặp trong nôn ói nhiều, tiêu chảy, dùng lợi tiểu quai không bù Kali, toan ceton sau tiêm insulin',
    relatedDiseases: ['suy_than', 'nhiem_toan_ceton_dka', 'suy_thuong_than_cap', 'suy_tim']
  },
  sodium: {
    id: 'sodium',
    name: 'Serum Sodium (Na+)',
    vietnameseName: 'Natri huyết thanh (Na+)',
    category: 'electrolytes',
    unit: 'mmol/L',
    normalRange: { min: 135, max: 145 },
    criticalLow: 120,
    criticalHigh: 160,
    clinicalSignificanceHigh: 'Mất nước ưu trương, đái tháo nhạt, quá tải muối ưu trương',
    clinicalSignificanceLow: 'Phù não, co giật, lú lẫn! Gặp trong SIADH, suy tim, xơ gan cổ trướng, suy thượng thận cấp, dùng lợi tiểu Thiazide',
    relatedDiseases: ['ha_natri_mau', 'suy_thuong_than_cap', 'xo_gan', 'suy_tim']
  },
  lactate: {
    id: 'lactate',
    name: 'Blood Lactate',
    vietnameseName: 'Lactate máu động mạch',
    category: 'blood_gas',
    unit: 'mmol/L',
    normalRange: { min: 0.5, max: 2.0 },
    criticalHigh: 4.0,
    clinicalSignificanceHigh: 'Thiếu oxy mô nặng, giảm tưới máu tổ chức (Sốc nhiễm khuẩn, sốc tim, sốc mất máu, toan lactic do Metformin)',
    clinicalSignificanceLow: 'Tưới máu mô và chuyển hóa hiếu khí bình thường',
    relatedDiseases: ['soc_nhiem_khuan', 'hoi_chung_vanh_cap', 'xuat_huyet_tieu_hoa_tren']
  },
  ph_art: {
    id: 'ph_art',
    name: 'Arterial pH',
    vietnameseName: 'pH máu động mạch',
    category: 'blood_gas',
    unit: 'pH',
    normalRange: { min: 7.35, max: 7.45 },
    criticalLow: 7.15,
    criticalHigh: 7.60,
    clinicalSignificanceHigh: 'Kiềm chuyển hóa (nôn ói nhiều, dùng lợi tiểu), kiềm hô hấp (thở nhanh tăng thông khí)',
    clinicalSignificanceLow: 'Toan chuyển hóa (DKA, suy thận, sốc nhiễm khuẩn), toan hô hấp cấp (đợt cấp COPD ứ CO2)',
    relatedDiseases: ['nhiem_toan_ceton_dka', 'copd', 'soc_nhiem_khuan', 'suy_than']
  }
};

/**
 * Lấy thông tin một xét nghiệm cận lâm sàng
 */
export function getLabTest(testId: string): LabReferenceItem | undefined {
  return LAB_REFERENCE_DATABASE[testId];
}

/**
 * Đánh giá kết quả cận lâm sàng của bệnh nhân
 */
export function evaluateLabValue(
  testId: string,
  val: number,
  gender: 'nam' | 'nu' = 'nam'
): {
  status: 'normal' | 'high' | 'low' | 'critical_high' | 'critical_low';
  message: string;
  isPanic: boolean;
} {
  const item = LAB_REFERENCE_DATABASE[testId];
  if (!item) {
    return { status: 'normal', message: 'Không tìm thấy định nghĩa xét nghiệm', isPanic: false };
  }

  // 1. Kiểm tra ngưỡng báo động đỏ (Critical Panic Values)
  if (item.criticalHigh !== undefined && val >= item.criticalHigh) {
    return {
      status: 'critical_high',
      message: `BÁO ĐỘNG ĐỎ CAO: ${val} ${item.unit} (Ngưỡng nguy hiểm: ≥ ${item.criticalHigh})! ${item.clinicalSignificanceHigh}`,
      isPanic: true
    };
  }

  if (item.criticalLow !== undefined && val <= item.criticalLow) {
    return {
      status: 'critical_low',
      message: `BÁO ĐỘNG ĐỎ THẤP: ${val} ${item.unit} (Ngưỡng nguy hiểm: ≤ ${item.criticalLow})! ${item.clinicalSignificanceLow}`,
      isPanic: true
    };
  }

  // 2. Xác định cận trên và cận dưới bình thường
  let min = item.normalRange.min;
  let max = item.normalRange.max;

  if (gender === 'nam') {
    if (item.normalRange.minMale !== undefined) min = item.normalRange.minMale;
    if (item.normalRange.maxMale !== undefined) max = item.normalRange.maxMale;
  } else {
    if (item.normalRange.minFemale !== undefined) min = item.normalRange.minFemale;
    if (item.normalRange.maxFemale !== undefined) max = item.normalRange.maxFemale;
  }

  // 3. So sánh khoảng bình thường
  if (max !== undefined && val > max) {
    return {
      status: 'high',
      message: `Tăng: ${val} ${item.unit} (Bình thường: ${min ?? 0} – ${max}). ${item.clinicalSignificanceHigh}`,
      isPanic: false
    };
  }

  if (min !== undefined && val < min) {
    return {
      status: 'low',
      message: `Giảm: ${val} ${item.unit} (Bình thường: ${min} – ${max ?? 'không giới hạn'}). ${item.clinicalSignificanceLow}`,
      isPanic: false
    };
  }

  return {
    status: 'normal',
    message: `Trong giới hạn bình thường (${min ?? 0} – ${max ?? 'không giới hạn'} ${item.unit})`,
    isPanic: false
  };
}
