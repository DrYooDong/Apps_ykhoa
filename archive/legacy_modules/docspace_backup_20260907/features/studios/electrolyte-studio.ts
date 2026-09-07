/**
 * DocSpace — Electrolyte & Fluid Research Studio Pro ($10,000 Level Clinical Lab Suite)
 * 5-Ion Diagnostic Engine (Na, K, Ca, Mg, PO4),
 * Adrogué-Madias & Barsoum-Levine Multi-Dose Formulas,
 * Free Water Deficit (FWD), Bolus Protocol (NaCl 3%),
 * Osmotic Demyelination Syndrome (ODS) Safe Corridor vs Danger Zone SVG,
 * 8-Infusate Fluid Matrix & 20+ Master Clinical Research Presets.
 * 100% Pure TypeScript & Pure SVG — Zero External Dependencies.
 */

export interface ElectrolytePreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  category: 'hyponatremia' | 'hypernatremia' | 'potassium' | 'calcium_mg_p' | 'critical_resus';
  description: string;
  values: ElectrolyteInputs;
}

export interface ElectrolyteInputs {
  mode: 'hyponatremia' | 'hypernatremia' | 'hypokalemia' | 'hyperkalemia' | 'calcium_disorder' | 'magnesium_po4';
  weightKg: number;
  gender: 'male' | 'female';
  isElderly?: boolean;
  
  // Natri & Thẩm thấu
  serumNa: number; // mmol/L
  targetNa?: number; // mmol/L
  glucoseMmol?: number; // mmol/L
  selectedInfusate?: 'nacl_3' | 'nacl_09' | 'ringer' | 'plasmalyte' | 'd5w' | 'nacl_045' | 'd5_half_ns' | 'albumin_20';
  hasSevereSymptoms?: boolean; // Co giật, hôn mê
  isHighOdsRisk?: boolean;     // Xơ gan, suy dinh dưỡng, nghiện rượu (Giới hạn 4-6 mmol/L/24h)
  urineOutputMlPerHour?: number; // mL/h (cho Barsoum-Levine)
  urineNaMmol?: number;          // mmol/L
  
  // Kali
  serumK?: number; // mmol/L
  targetK?: number; // mmol/L
  hasEcgChangesK?: boolean; // Sóng T nhọn, QRS giãn, sóng U
  hasRenalFailure?: boolean;
  
  // Canxi, Albumin, Photpho
  serumCaTotal?: number; // mmol/L hoặc mg/dL (1 mmol/L = 4.0 mg/dL)
  isCaMgDl?: boolean;
  serumAlbuminGDl?: number; // g/dL (chuẩn 4.0)
  serumPhosphate?: number;  // mmol/L hoặc mg/dL
  hasTetanySigns?: boolean; // Dấu Chvostek / Trousseau / Co giật
  
  // Magie
  serumMg?: number; // mmol/L (chuẩn 0.75 - 1.05)
  hasTorsadesRisk?: boolean; // QT dài, Xoắn đỉnh
  
  // Bệnh cảnh nuôi ăn lại
  isRefeedingRisk?: boolean; // Nhịn đói kéo dài, suy kiệt
}

export interface ElectrolyteResult {
  tbwLiters: number;
  
  // Natri
  correctedNa: number | null;
  sodiumDeficitMeq: number | null;
  freeWaterDeficitLiters: number | null;
  adrogueDeltaNaPerLiter: number | null;
  infusionRateMlPerHour: number | null;
  dailyNaCorrectionMaxLimit: number;
  bolusProtocolSummary: string | null;
  odsRiskWarning: string | null;
  ddavpClampProtocol: string | null;
  
  // Kali
  potassiumDeficitMeq: number | null;
  potassiumIvMaxRateSummary: string | null;
  hyperkalemiaStepProtocol: string[] | null;
  magnesiumCofactorAlert: string | null;
  
  // Canxi & Photpho
  correctedCalciumMmol: number | null;
  calciumPhosphateProduct: number | null;
  calciumReplacementProtocol: string | null;
  
  // Magie & Refeeding
  magnesiumReplacementProtocol: string | null;
  refeedingSyndromeProtocol: string | null;
  
  // Tổng hợp
  emergencyFlags: string[];
  safeSpeedLimitSummary: string;
  clinicalSummary: string;
  recommendations: string[];
  infusateComparison: Array<{ name: string; naContent: number; osm: number; deltaNa: number }>;
}

export const INFUSATE_DATA: Record<string, { name: string; na: number; k: number; cl: number; osm: number; desc: string }> = {
  nacl_3: { name: 'Natri Clorid 3% (Ưu Trương)', na: 513, k: 0, cl: 513, osm: 1026, desc: 'Chỉ định bolus cấp cứu cắt phù não & hạ Na máu nặng có triệu chứng thần kinh' },
  nacl_09: { name: 'Natri Clorid 0.9% (Đẳng Trương)', na: 154, k: 0, cl: 154, osm: 308, desc: 'Dịch tinh thể chuẩn, bù thể tích lòng mạch trong hạ Na giảm thể tích' },
  ringer: { name: 'Ringer Lactate (Cân Bằng)', na: 130, k: 4, cl: 109, osm: 273, desc: 'Dịch tinh thể sinh lý, ít nguy cơ toan máu tăng Clo khi truyền lượng lớn' },
  plasmalyte: { name: 'Plasma-Lyte 148', na: 140, k: 5, cl: 98, osm: 295, desc: 'Dịch đệm sinh lý chứa Acetate & Gluconate, gần tương đồng huyết tương nhất' },
  d5w: { name: 'Dextrose 5% Trong Nước (D5W)', na: 0, k: 0, cl: 0, osm: 278, desc: 'Tương đương truyền Nước Tự Do (nước cất) sau khi Glucose được chuyển hóa' },
  nacl_045: { name: 'Natri Clorid 0.45% (1/2 NS)', na: 77, k: 0, cl: 77, osm: 154, desc: 'Dịch nhược trương, cung cấp 50% nước tự do cho tăng Natri máu' },
  d5_half_ns: { name: 'D5 1/2 Normal Saline', na: 77, k: 0, cl: 77, osm: 432, desc: 'Vừa bù năng lượng vừa bù nước tự do và điện giải duy trì' },
  albumin_20: { name: 'Albumin 20% (Keo Ưu Trương)', na: 154, k: 0, cl: 154, osm: 308, desc: 'Kéo dịch từ mô kẽ vào lòng mạch (x4 lần thể tích truyền), dùng cho xơ gan/hội chứng thận hư' },
};

export const ELYTE_PRESETS: ElectrolytePreset[] = [
  {
    id: 'siadh_seizures',
    name: '1. Hạ Na Máu Nặng Co Giật (SIADH: Na 110)',
    badge: '🚨 Cấp Cứu Thần Kinh Na < 115',
    badgeColor: '#dc2626',
    category: 'critical_resus',
    description: 'Bệnh nhân ung thư phổi tiết ADH không thích hợp, Na 110 mmol/L, hôn mê co giật. Cần Bolus khẩn NaCl 3% 100-150mL.',
    values: {
      mode: 'hyponatremia', weightKg: 60, gender: 'male', isElderly: false,
      serumNa: 110, targetNa: 120, glucoseMmol: 5.6, selectedInfusate: 'nacl_3',
      hasSevereSymptoms: true, isHighOdsRisk: false, serumK: 4.1
    }
  },
  {
    id: 'cirrhosis_hyponatremia_high_ods',
    name: '2. Hạ Na Máu Ở Bệnh Nhân Xơ Gan (Nguy Cơ ODS Cao)',
    badge: '⚠️ Giới Hạn Tăng ≤ 4-6 mmol/L/24h',
    badgeColor: '#ea580c',
    category: 'hyponatremia',
    description: 'Xơ gan Child-Pugh C báng bụng căng, Na 118 mmol/L. Nguy cơ cực cao Hủy Myelin Cầu Não (ODS), phải kiểm soát nâng Natri cực chậm.',
    values: {
      mode: 'hyponatremia', weightKg: 65, gender: 'male', isElderly: false,
      serumNa: 118, targetNa: 124, glucoseMmol: 6.2, selectedInfusate: 'nacl_3',
      hasSevereSymptoms: false, isHighOdsRisk: true, serumK: 3.4
    }
  },
  {
    id: 'hypernatremia_di_central',
    name: '3. Tăng Na Do Đái Tháo Nhạt (Central DI: Na 166)',
    badge: '🚨 Tăng Thẩm Thấu Nặng FWD = 6.8L',
    badgeColor: '#dc2626',
    category: 'hypernatremia',
    description: 'Sau phẫu thuật u tuyến yên, tiểu nhiều 8 Lít/ngày, Na 166 mmol/L. Cần bù nước tự do D5W kết hợp Desmopressin (Minirin).',
    values: {
      mode: 'hypernatremia', weightKg: 55, gender: 'female', isElderly: false,
      serumNa: 166, targetNa: 145, glucoseMmol: 5.4, selectedInfusate: 'd5w',
      hasSevereSymptoms: true, serumK: 3.9
    }
  },
  {
    id: 'hyperkalemia_cardiac_emergency',
    name: '4. Tăng Kali Nguy Kịch (K 7.8, Sóng T Nhọn, QRS Rộng)',
    badge: '🚨 Cấp Cứu Ngừng Tim (Calcium Stat)',
    badgeColor: '#7f1d1d',
    category: 'critical_resus',
    description: 'Bệnh thận mạn giai đoạn cuối bỏ chạy thận, K 7.8 mmol/L, QRS giãn rộng 140ms. Nguy cơ rung thất trong vài phút.',
    values: {
      mode: 'hyperkalemia', weightKg: 68, gender: 'male', isElderly: false,
      serumNa: 135, serumK: 7.8, targetK: 4.5, hasEcgChangesK: true, hasRenalFailure: true
    }
  },
  {
    id: 'refractory_hypokalemia_hypomg',
    name: '5. Hạ Kali Kháng Trị Kèm Hạ Magie (K 2.2, Mg 0.38)',
    badge: '⚡ Kháng Trị Bù Kali Nếu Không Có Mg',
    badgeColor: '#8b5cf6',
    category: 'potassium',
    description: 'Tiêu chảy kéo dài dùng lợi tiểu, K 2.2 mmol/L bù KCl không lên do Mg 0.38 mmol/L làm tê liệt bơm Na/K-ATPase. Sóng U dẹt.',
    values: {
      mode: 'hypokalemia', weightKg: 58, gender: 'female', isElderly: false,
      serumNa: 136, serumK: 2.2, targetK: 4.0, serumMg: 0.38, hasEcgChangesK: true
    }
  },
  {
    id: 'severe_hypocalcemia_tetany',
    name: '6. Hạ Canxi Máu Cấp Kèm Co Thắt Tetany (Ca 1.45)',
    badge: '⚡ Dấu Trousseau & Co Thắt Thanh Quản',
    badgeColor: '#9333ea',
    category: 'calcium_mg_p',
    description: 'Sau phẫu thuật cắt toàn bộ tuyến giáp, tê buốt bàn tay, co quắp ngón tay (Tetany), khoảng QTc kéo dài 520ms. Ca++ toàn phần 1.45 mmol/L.',
    values: {
      mode: 'calcium_disorder', weightKg: 52, gender: 'female', isElderly: false,
      serumNa: 140, serumCaTotal: 1.45, isCaMgDl: false, serumAlbuminGDl: 4.0,
      hasTetanySigns: true, serumMg: 0.85
    }
  },
  {
    id: 'hypercalcemia_malignancy',
    name: '7. Tăng Canxi Máu Ác Tính Do Ung Thư (Ca corr = 3.85)',
    badge: '🚨 Nguy Cơ Loạn Nhịp & Suy Thận Cấp',
    badgeColor: '#b91c1c',
    category: 'calcium_mg_p',
    description: 'Ung thư vú di căn xương tiết PTHrP, lơ mơ mất nước nặng, Ca toàn phần 3.6 mmol/L với Albumin 2.5 g/dL (Ca hiệu chỉnh = 3.9 mmol/L).',
    values: {
      mode: 'calcium_disorder', weightKg: 50, gender: 'female', isElderly: false,
      serumNa: 132, serumCaTotal: 3.6, isCaMgDl: false, serumAlbuminGDl: 2.5,
      serumPhosphate: 0.7, selectedInfusate: 'nacl_09'
    }
  },
  {
    id: 'torsades_hypomagnesemia',
    name: '8. Hạ Magie Máu Gây Loạn Nhịp Xoắn Đỉnh (Mg 0.30)',
    badge: '🚨 Cấp Cứu Xoắn Đỉnh (MgSO4 Stat)',
    badgeColor: '#450a0a',
    category: 'critical_resus',
    description: 'Nghiện rượu mạn nhịn ăn, Mg 0.30 mmol/L, xuất hiện từng cơn nhịp nhanh thất đa hình dạng Xoắn đỉnh (Torsades de Pointes).',
    values: {
      mode: 'magnesium_po4', weightKg: 62, gender: 'male', isElderly: false,
      serumNa: 138, serumK: 3.1, serumMg: 0.30, hasTorsadesRisk: true
    }
  },
  {
    id: 'refeeding_severe_hypophosphatemia',
    name: '9. Hội Chứng Nuôi Ăn Lại (Refeeding: PO4 = 0.22 mmol/L)',
    badge: '🚨 Tụt Photpho / Liệt Cơ Hoành Hô Hấp',
    badgeColor: '#c026d3',
    category: 'calcium_mg_p',
    description: 'Bệnh nhân suy kiệt nặng được nuôi ăn tĩnh mạch (TPN) nhiều đường đột ngột, tế bào ồ ạt tiêu thụ PO4 tạo ATP làm PO4 máu tụt về 0.22.',
    values: {
      mode: 'magnesium_po4', weightKg: 42, gender: 'female', isElderly: false,
      serumNa: 134, serumK: 2.8, serumMg: 0.55, serumPhosphate: 0.22, isRefeedingRisk: true
    }
  },
  {
    id: 'hypovolemic_diarrhea_na',
    name: '10. Hạ Natri Giảm Thể Tích Do Mất Qua Tiêu Hóa',
    badge: '💧 Bù Thể Tích Bằng NaCl 0.9%',
    badgeColor: '#0284c7',
    category: 'hyponatremia',
    description: 'Tiêu chảy nhiễm khuẩn 4 ngày, tụt huyết áp tư thế, da nhăn, Na 122 mmol/L. Cần bù thể tích bằng NaCl 0.9% hoặc Ringer Lactate.',
    values: {
      mode: 'hyponatremia', weightKg: 60, gender: 'male', isElderly: false,
      serumNa: 122, targetNa: 132, glucoseMmol: 5.5, selectedInfusate: 'nacl_09',
      hasSevereSymptoms: false, isHighOdsRisk: false, serumK: 3.2
    }
  },
  {
    id: 'pseudohyponatremia_hypertriglyceride',
    name: '11. Giả Hạ Natri Máu Do Tăng Triglyceride (Na đo = 118)',
    badge: '🧪 Giả Hạ Natri (Áp Suất Thẩm Thấu Bình Thường)',
    badgeColor: '#0ea5e9',
    category: 'hyponatremia',
    description: 'Viêm tụy cấp do Triglyceride 45 mmol/L (4000 mg/dL), huyết tương đục như sữa làm sai lệch đo điện cực gián tiếp.',
    values: {
      mode: 'hyponatremia', weightKg: 75, gender: 'male', isElderly: false,
      serumNa: 118, targetNa: 135, glucoseMmol: 6.0, selectedInfusate: 'nacl_09',
      hasSevereSymptoms: false
    }
  },
  {
    id: 'hyperglycemic_hyponatremia_dka',
    name: '12. Hạ Natri Máu Do Tăng Đường Huyết (DKA: Gluc 45)',
    badge: '📈 Natri Hiệu Chỉnh Katz: +11 mmol/L',
    badgeColor: '#f59e0b',
    category: 'hyponatremia',
    description: 'DKA đường huyết 45 mmol/L (810 mg/dL) kéo nước từ tế bào ra mô kẽ. Na đo được 124 mmol/L (Na hiệu chỉnh thực tế là 135 mmol/L).',
    values: {
      mode: 'hyponatremia', weightKg: 62, gender: 'female', isElderly: false,
      serumNa: 124, targetNa: 135, glucoseMmol: 45.0, selectedInfusate: 'nacl_09',
      hasSevereSymptoms: false
    }
  },
  {
    id: 'hypernatremia_elderly_dehydration',
    name: '13. Tăng Natri Máu Người Già (Mất Nước Tự Do FWD = 4.2L)',
    badge: '👵 Người Cao Tuổi Mất Cảm Giác Khát',
    badgeColor: '#ef4444',
    category: 'hypernatremia',
    description: 'Cụ bà 82 tuổi sốt nằm liệt giường bỏ uống nước 5 ngày, Na 158 mmol/L, lưỡi khô nứt nẻ. Bù nước tự do chậm qua sonde dạ dày.',
    values: {
      mode: 'hypernatremia', weightKg: 46, gender: 'female', isElderly: true,
      serumNa: 158, targetNa: 140, glucoseMmol: 6.2, selectedInfusate: 'd5w',
      hasSevereSymptoms: false
    }
  },
  {
    id: 'tumor_lysis_hyperkalemia_hyperpo4',
    name: '14. Hội Chứng Tiêu Khối U (Tumor Lysis: K 6.8, PO4 3.2)',
    badge: '🚨 Tăng K + Tăng PO4 + Hạ Canxi',
    badgeColor: '#991b1b',
    category: 'critical_resus',
    description: 'Bệnh bạch cầu cấp sau hóa trị, giải phóng ồ ạt ion nội bào: K 6.8, PO4 3.2 mmol/L, kết tủa Canxi Phosphate gây hạ Ca 1.5 mmol/L và suy thận.',
    values: {
      mode: 'hyperkalemia', weightKg: 65, gender: 'male', isElderly: false,
      serumNa: 134, serumK: 6.8, targetK: 4.5, serumCaTotal: 1.5, serumPhosphate: 3.2,
      hasEcgChangesK: true, hasRenalFailure: true
    }
  },
  {
    id: 'cs_wasting_post_tbi',
    name: '15. Hạ Na Mất Muối Não Sau Chấn Thương Sọ Não (CSW)',
    badge: '🧠 CSW: Mất Muối Kèm Mất Nước Nặng',
    badgeColor: '#d97706',
    category: 'hyponatremia',
    description: 'Chảy máu dưới nhện, tiểu nhiều muối qua thận (Urine Na > 80 mmol/L) làm tụt thể tích và Na máu tụt 116 mmol/L. Cần bù NaCl 3% + Bù thể tích.',
    values: {
      mode: 'hyponatremia', weightKg: 70, gender: 'male', isElderly: false,
      serumNa: 116, targetNa: 126, glucoseMmol: 5.8, selectedInfusate: 'nacl_3',
      hasSevereSymptoms: true, isHighOdsRisk: false, urineNaMmol: 95
    }
  },
  {
    id: 'gitelman_syndrome_hypokalemia',
    name: '16. Hội Chứng Gitelman (Hạ K, Hạ Mg Mạn Tính)',
    badge: '🧬 Rối Loạn Ống Lượn Xa Di Truyền',
    badgeColor: '#06b6d4',
    category: 'potassium',
    description: 'Đột biến đồng vận chuyển Na-Cl (NCCT) giống tác dụng thiazide kéo dài, K 2.4, Mg 0.45, hạ Canxi niệu, huyết áp thấp.',
    values: {
      mode: 'hypokalemia', weightKg: 52, gender: 'female', isElderly: false,
      serumNa: 137, serumK: 2.4, targetK: 3.8, serumMg: 0.45
    }
  },
  {
    id: 'rhabdomyolysis_hyperkalemia',
    name: '17. Tiêu Cơ Vân Cấp Sau Chấn Thương (K 6.5, Ca 1.6)',
    badge: '⚠️ Vỡ Tế Bào Cơ Vân Hoại Tử',
    badgeColor: '#dc2626',
    category: 'potassium',
    description: 'Vùi lấp sau sập nhà, CK tăng 85,000 U/L, K 6.5 mmol/L, nước tiểu màu xá xị do myoglobin. Cần kiềm hóa nước tiểu và truyền dịch lớn.',
    values: {
      mode: 'hyperkalemia', weightKg: 74, gender: 'male', isElderly: false,
      serumNa: 136, serumK: 6.5, targetK: 4.5, serumCaTotal: 1.6, hasEcgChangesK: true
    }
  },
  {
    id: 'overcorrection_hyponatremia_ddavp',
    name: '18. Nâng Natri Quá Tốc Độ Cần Dùng dDAVP Clamp (Na +12 trong 10h)',
    badge: '🚨 Nguy Cơ ODS Khẩn / Cần dDAVP Stat',
    badgeColor: '#7f1d1d',
    category: 'critical_resus',
    description: 'Hạ Na do uống bia (Beer potomania) hồi phục đột ngột đa niệu, Na vọt từ 112 lên 124 trong 10 giờ (> 8 mmol/L). Phải dùng ngay Desmopressin + D5W.',
    values: {
      mode: 'hyponatremia', weightKg: 58, gender: 'male', isElderly: false,
      serumNa: 124, targetNa: 118, glucoseMmol: 5.2, selectedInfusate: 'd5w',
      hasSevereSymptoms: false, isHighOdsRisk: true
    }
  },
  {
    id: 'd5w_large_volume_hyponatremia',
    name: '19. Hạ Natri Máu Sau Mổ Do Truyền D5W Quá Mức',
    badge: '💧 Ngộ Độc Nước Bệnh Viện (Iatrogenic)',
    badgeColor: '#0284c7',
    category: 'hyponatremia',
    description: 'Sau mổ nội soi ổ bụng, bệnh nhân đau đớn tiết ADH sinh lý nhưng được truyền 4 Lít D5W làm Na tụt từ 138 xuống 119 mmol/L.',
    values: {
      mode: 'hyponatremia', weightKg: 64, gender: 'female', isElderly: false,
      serumNa: 119, targetNa: 128, glucoseMmol: 7.2, selectedInfusate: 'nacl_3',
      hasSevereSymptoms: true
    }
  },
  {
    id: 'hypernatremia_salt_poisoning',
    name: '20. Ngộ Độc Muối Cấp Tính (Acute Salt Ingestion: Na 178)',
    badge: '🚨 Quá Tải Natri Ưu Trương Cực Nặng',
    badgeColor: '#450a0a',
    category: 'critical_resus',
    description: 'Uống nhầm nước muối biển đậm đặc hoặc xì dầu số lượng lớn, Na tăng vọt 178 mmol/L, co giật, xuất huyết não do co rút tế bào.',
    values: {
      mode: 'hypernatremia', weightKg: 60, gender: 'male', isElderly: false,
      serumNa: 178, targetNa: 150, glucoseMmol: 6.0, selectedInfusate: 'd5w',
      hasSevereSymptoms: true
    }
  }
];

/**
 * Thuật toán Phân Tích & Tính Toán Thăng Bằng Điện Giải 5 Ion Toàn Năng
 */
export function analyzeElectrolyte(inputs: ElectrolyteInputs): ElectrolyteResult {
  const {
    mode,
    weightKg,
    gender,
    isElderly = false,
    serumNa,
    targetNa = 130,
    glucoseMmol = 5.6,
    selectedInfusate = 'nacl_3',
    hasSevereSymptoms = false,
    isHighOdsRisk = false,
    urineOutputMlPerHour,
    urineNaMmol,
    serumK = 4.0,
    targetK = 4.0,
    hasEcgChangesK = false,
    hasRenalFailure = false,
    serumCaTotal,
    isCaMgDl = false,
    serumAlbuminGDl = 4.0,
    serumPhosphate,
    hasTetanySigns = false,
    serumMg = 0.85,
    hasTorsadesRisk = false,
    isRefeedingRisk = false,
  } = inputs;

  const emergencyFlags: string[] = [];
  const safetyAlerts: string[] = [];
  const recommendations: string[] = [];

  // 1. TÍNH THỂ TÍCH NƯỚC CƠ THỂ (TBW)
  let tbwFraction = gender === 'male' ? 0.6 : 0.5;
  if (isElderly) tbwFraction -= 0.05;
  const tbwLiters = parseFloat((weightKg * tbwFraction).toFixed(1));

  // 2. NATRI HIỆU CHỈNH ĐƯỜNG HUYẾT (Katz & Hillier Equation)
  // Katz: Na_corr = Na + 1.6 * ((Glucose_mmol - 5.6) / 5.6)
  let correctedNa: number | null = null;
  if (glucoseMmol && glucoseMmol > 5.6) {
    correctedNa = parseFloat((serumNa + 1.6 * ((glucoseMmol - 5.6) / 5.6)).toFixed(1));
  }

  // 3. TÍNH TOÁN THEO TỪNG RỐI LOẠN ION
  let sodiumDeficitMeq: number | null = null;
  let freeWaterDeficitLiters: number | null = null;
  let adrogueDeltaNaPerLiter: number | null = null;
  let infusionRateMlPerHour: number | null = null;
  let dailyNaCorrectionMaxLimit = isHighOdsRisk ? 6 : 8; // mmol/L/24h
  let bolusProtocolSummary: string | null = null;
  let odsRiskWarning: string | null = null;
  let ddavpClampProtocol: string | null = null;

  let potassiumDeficitMeq: number | null = null;
  let potassiumIvMaxRateSummary: string | null = null;
  let hyperkalemiaStepProtocol: string[] | null = null;
  let magnesiumCofactorAlert: string | null = null;

  let correctedCalciumMmol: number | null = null;
  let calciumPhosphateProduct: number | null = null;
  let calciumReplacementProtocol: string | null = null;

  let magnesiumReplacementProtocol: string | null = null;
  let refeedingSyndromeProtocol: string | null = null;
  let safeSpeedLimitSummary = '';

  const infusateNa = INFUSATE_DATA[selectedInfusate]?.na ?? 513;
  const effectiveSerumNa = correctedNa !== null ? correctedNa : serumNa;

  // Bảng so sánh 8 loại dịch
  const infusateComparison = Object.entries(INFUSATE_DATA).map(([key, data]) => {
    const delta = (data.na - effectiveSerumNa) / (tbwLiters + 1);
    return {
      name: data.name,
      naContent: data.na,
      osm: data.osm,
      deltaNa: parseFloat(delta.toFixed(2)),
    };
  });

  // A. HẠ NATRI MÁU (HYPONATREMIA)
  if (mode === 'hyponatremia') {
    // Adrogué-Madias Formula: Delta Na = (Na_inf - Na_serum) / (TBW + 1)
    adrogueDeltaNaPerLiter = parseFloat(((infusateNa - effectiveSerumNa) / (tbwLiters + 1)).toFixed(2));

    const deltaTarget = Math.max(0, targetNa - effectiveSerumNa);
    sodiumDeficitMeq = Math.round(tbwLiters * deltaTarget);

    const targetDelta24h = Math.min(dailyNaCorrectionMaxLimit, deltaTarget);
    if (adrogueDeltaNaPerLiter > 0) {
      const totalLiters24h = targetDelta24h / adrogueDeltaNaPerLiter;
      infusionRateMlPerHour = Math.round((totalLiters24h * 1000) / 24);
    }

    // Bolus Protocol khi có triệu chứng thần kinh nặng
    if (hasSevereSymptoms) {
      bolusProtocolSummary = '🚨 GIAO THỨC BOLUS CẤP CỨU CẮT PHÙ NÃO: Truyền tĩnh mạch nhanh 100 - 150 mL NaCl 3% trong 10-20 phút. Đánh giá lại triệu chứng, có thể lặp lại tối đa 3 lần (mỗi lần cách 20-30 phút) đến khi nâng được 4 - 6 mmol/L Natri hoặc dứt cơn co giật.';
      emergencyFlags.push('🚨 CO GIẬT / HÔN MÊ DO HẠ NATRI NẶNG: Bolus NaCl 3% 100-150mL IV Stat trong 15 phút!');
    }

    // Cảnh báo ODS & dDAVP Clamp
    odsRiskWarning = `⚠️ NGUY CƠ HỦY MYELIN CẦU NÃO (ODS/CPM): Tốc độ nâng Natri TUYỆT ĐỐI KHÔNG VƯỢT QUÁ ${dailyNaCorrectionMaxLimit} mmol/L trong 24 giờ đầu (${isHighOdsRisk ? 'Bệnh nhân có nguy cơ cao: Xơ gan / Suy dinh dưỡng / Nghiện rượu ➔ Giới hạn 4 - 6 mmol/L' : 'Tối đa 8 mmol/L/24h'}).`;
    
    ddavpClampProtocol = 'Phác đồ dDAVP Clamp (Nếu nâng Natri quá nhanh > 8 mmol/L/24h hoặc bệnh nhân đa niệu đột ngột): Tiêm Desmopressin 1 - 2 mcg IV/SC mỗi 6 - 8 giờ kết hợp truyền Dextrose 5% 3 mL/kg/h để hạ lại Natri về ngưỡng an toàn.';

    safeSpeedLimitSummary = `Giới hạn nâng Natri an toàn: Tối đa ${dailyNaCorrectionMaxLimit} mmol/L/24h (${(dailyNaCorrectionMaxLimit / 24).toFixed(2)} mmol/L/giờ). Thử lại Natri máu mỗi 4 - 6 giờ.`;
    recommendations.push(safeSpeedLimitSummary);
    if (bolusProtocolSummary) recommendations.push(bolusProtocolSummary);
  }

  // B. TĂNG NATRI MÁU (HYPERNATREMIA)
  else if (mode === 'hypernatremia') {
    if (serumNa > 140) {
      // Free Water Deficit: FWD = TBW * ((Na_serum / 140) - 1)
      freeWaterDeficitLiters = parseFloat((tbwLiters * ((serumNa / 140) - 1)).toFixed(1));
      // Tốc độ bù chia trong 48h
      infusionRateMlPerHour = Math.round((freeWaterDeficitLiters * 1000) / 48);
    }

    if (hasSevereSymptoms || serumNa >= 160) {
      emergencyFlags.push(`🚨 TĂNG NATRI MÁU NẶNG (${serumNa} mmol/L): Nguy cơ xuất huyết não do co rút tế bào thần kinh. Cần bù nước tự do khẩn cấp.`);
    }

    safeSpeedLimitSummary = 'Tốc độ hạ Natri an toàn: Tối đa 0.5 mmol/L/giờ (tối đa 10 - 12 mmol/L/24h) để phòng ngừa Phù Não Cấp Dội Ngược (Cerebral Edema). Bù FWD chia đều trong 48 - 72 giờ.';
    safetyAlerts.push(safeSpeedLimitSummary);
    recommendations.push('Ưu tiên bù nước tự do qua đường tiêu hóa (uống hoặc bơm qua sonde dạ dày nước chín) nếu bệnh nhân tỉnh táo, hoặc truyền tĩnh mạch Dextrose 5% / NaCl 0.45%.');
  }

  // C. HẠ KALI MÁU (HYPOKALEMIA)
  else if (mode === 'hypokalemia') {
    if (serumK < 4.0) {
      const drop = 4.0 - serumK;
      // Mỗi 0.1 mmol/L giảm tương đương thiếu hụt khoảng 15-35 mEq K+ toàn cơ thể
      potassiumDeficitMeq = Math.round(drop * 150);
    }

    if (serumK < 2.5 || hasEcgChangesK) {
      emergencyFlags.push(`🚨 HẠ KALI MÁU NẶNG (${serumK} mmol/L): Nguy cơ loạn nhịp thất, xoắn đỉnh và liệt cơ hô hấp!`);
    }

    potassiumIvMaxRateSummary = 'Tốc độ truyền Kali tĩnh mạch: Ngoại vi tối đa 10 - 20 mEq/giờ (nồng độ tối đa 40 mEq/L); Tĩnh mạch trung tâm tối đa 40 mEq/giờ (nồng độ tối đa 80 mEq/L có monitor theo dõi).';
    
    if (serumMg < 0.75) {
      magnesiumCofactorAlert = `⚠️ ĐỒNG HẠ MAGIE MÁU (${serumMg} mmol/L < 0.75): Bắt buộc tiêm truyền Magnesium Sulfate (MgSO4 1-2g IV) đồng thời, vì hạ Magie ức chế bơm Na+/K+-ATPase gây kháng trị bù Kali!`;
      emergencyFlags.push('⚠️ Hạ Magie máu đi kèm: Phải bù Magie trước hoặc đồng thời với Kali.');
      recommendations.push(magnesiumCofactorAlert);
    }

    safeSpeedLimitSummary = 'Ưu tiên bù đường uống (KCl viên 0.5-1g). Chỉ truyền tĩnh mạch khi K+ < 2.5 mmol/L, có biến đổi ECG sóng U, hoặc bệnh nhân không uống được.';
    recommendations.push(potassiumIvMaxRateSummary);
  }

  // D. TĂNG KALI MÁU (HYPERKALEMIA)
  else if (mode === 'hyperkalemia') {
    if (serumK >= 6.5 || hasEcgChangesK) {
      emergencyFlags.push(`🚨 TĂNG KALI MÁU NGUY KỊCH (${serumK} mmol/L): Nguy cơ Rung Thất / Vô Tâm Thu! Tiến hành ngay phác đồ 3 bước cấp cứu.`);
    }

    hyperkalemiaStepProtocol = [
      '1. ỔN ĐỊNH MÀNG CƠ TIM (STAT): Tiêm tĩnh mạch chậm 10 - 20 mL Calcium Gluconate 10% trong 3 - 5 phút (có tác dụng trong 1-3 phút, kéo dài 30-60 phút). Lặp lại liều sau 5-10 phút nếu ECG chưa cải thiện.',
      '2. CHUYỂN KALI VÀO TẾ BÀO: Truyền nhanh 10 UI Insulin Regular pha trong 150 - 250 mL Glucose 10% (hoặc 50 mL Glucose 50%) trong 20-30 phút + Khí dung Salbutamol (Albuterol) 10 - 20 mg trong 15 phút + Natri Bicarbonate 8.4% 50-100 mL nếu có toan chuyển hóa kèm theo.',
      '3. ĐÀO THẢI KALI RA KHỎI CƠ THỂ: Furosemide 40 - 80 mg IV (nếu còn nước tiểu) + Nhựa trao đổi ion (Lokelma 10g uống x 3 lần/ngày hoặc Resonium 15-30g uống) + CHỈ ĐỊNH LỌC MÁU CẤP CỨU (Chạy thận nhân tạo Hemodialysis) nếu suy thận vô niệu hoặc K+ > 7.0 mmol/L kháng trị.'
    ];

    safeSpeedLimitSummary = 'Phác đồ cấp cứu 3 bước tăng Kali máu nguy kịch: Bảo vệ tim (Canxi) ➔ Chuyển dịch ion (Insulin/Salbutamol) ➔ Đào thải (Lợi tiểu/Nhựa gắn/Lọc máu).';
    recommendations.push(...hyperkalemiaStepProtocol);
  }

  // E. RỐI LOẠN CANXI MÁU
  else if (mode === 'calcium_disorder') {
    if (typeof serumCaTotal === 'number') {
      const caMmol = isCaMgDl ? serumCaTotal / 4.0 : serumCaTotal;
      // Ca_corr = Ca_total + 0.8 * (4.0 - Albumin) / 4.0
      correctedCalciumMmol = parseFloat((caMmol + 0.02 * (40 - (serumAlbuminGDl * 10))).toFixed(2));

      if (correctedCalciumMmol < 1.75 || hasTetanySigns) {
        emergencyFlags.push(`🚨 HẠ CANXI MÁU NẶNG (${correctedCalciumMmol} mmol/L) CÓ DẤU HIỆU TETANY: Nguy cơ co thắt thanh quản và co giật!`);
        calciumReplacementProtocol = 'Phác đồ bù Canxi cấp cứu: Tiêm tĩnh mạch chậm 1 - 2 ống Calcium Gluconate 10% (10 - 20 mL) pha trong 100 mL D5W trong 10 - 20 phút. Duy trì truyền liên tục 50 - 100 mg nguyên tố Canxi/giờ.';
      } else if (correctedCalciumMmol > 3.0) {
        emergencyFlags.push(`🚨 TĂNG CANXI MÁU ÁC TÍNH (${correctedCalciumMmol} mmol/L): Nguy cơ hôn mê và suy thận cấp!`);
        calciumReplacementProtocol = 'Phác đồ hạ Canxi máu cấp cứu: Truyền NaCl 0.9% 200 - 300 mL/giờ bù thể tích ➔ Furosemide 20 - 40 mg IV khi đã đủ dịch ➔ Calcitonin 4 UI/kg tiêm dưới da mỗi 12 giờ ➔ Axit Zoledronic 4 mg IV truyền trong 15 phút (Bisphosphonate).';
      }

      if (serumPhosphate) {
        const pMmol = serumPhosphate;
        // Tích số Ca x P (mg2/dL2): (Ca_mg/dL) * (P_mg/dL)
        const caMg = correctedCalciumMmol * 4.0;
        const pMg = pMmol * 3.1;
        calciumPhosphateProduct = Math.round(caMg * pMg);
        if (calciumPhosphateProduct > 55) {
          safetyAlerts.push(`⚠️ TÍCH SỐ CANXI x PHOTPHO TĂNG CAO (${calciumPhosphateProduct} mg²/dL² > 55): Nguy cơ kết tủa Canxi Phosphate gây vôi hóa mạch máu và hoại tử mô mềm cấp (Calciphylaxis). Hạn chế bù Canxi đường tĩnh mạch nếu không có đe dọa tính mạng.`);
        }
      }
    }
  }

  // F. MAGIE & HỘI CHỨNG NUÔI ĂN LẠI (REFEEDING)
  else if (mode === 'magnesium_po4') {
    if (serumMg < 0.5 || hasTorsadesRisk) {
      emergencyFlags.push(`🚨 HẠ MAGIE MÁU NẶNG (${serumMg} mmol/L) / NGUY CƠ XOẮN ĐỈNH: Tiêm tĩnh mạch Magnesium Sulfate!`);
      magnesiumReplacementProtocol = 'Liều cấp cứu Xoắn đỉnh / Co giật: Tiêm tĩnh mạch 1 - 2 g Magnesium Sulfate (MgSO4 50% 2-4 mL pha trong 10-20 mL D5W) trong 2 - 5 phút. Sau đó truyền duy trì 1 - 2 g/giờ.';
    }

    if (isRefeedingRisk || (serumPhosphate && serumPhosphate < 0.3)) {
      emergencyFlags.push('🚨 HỘI CHỨNG NUOI ĂN LẠI (REFEEDING SYNDROME): Hạ Photpho máu nặng đe dọa liệt cơ hoành và tiêu cơ vân!');
      refeedingSyndromeProtocol = 'Phác đồ Hội chứng Nuôi ăn lại: Giảm ngay 50% tốc độ nuôi ăn calo ➔ Bù Natri/Kali Phosphate tĩnh mạch 0.08 - 0.16 mmol/kg trong 4 - 6 giờ ➔ Bổ sung Thiamine (Vitamin B1) 100 - 200 mg IV trước khi tiếp tục cho ăn ➔ Bù Magie và Kali đồng thời.';
    }
  }

  // 4. TỔNG HỢP TÓM TẮT LÂM SÀNG
  let summary = `[BÁO CÁO HỒI SỨC ĐIỆN GIẢI & DỊCH TRUYỀN — DOCSPACE ELECTROLYTE PRO STUDIO]\n`;
  summary += `• Bệnh nhân: ${weightKg} kg (${gender === 'male' ? 'Nam' : 'Nữ'}${isElderly ? ', cao tuổi' : ''}) | Thể tích nước cơ thể (TBW): ${tbwLiters} Lít\n`;
  
  if (mode === 'hyponatremia') {
    summary += `• Chẩn đoán: Hạ Natri Máu (${serumNa} mmol/L${correctedNa ? `, hiệu chỉnh: ${correctedNa} mmol/L` : ''}) ➔ Mục tiêu: ${targetNa} mmol/L\n`;
    summary += `• Hiệu ứng 1 Lít ${INFUSATE_DATA[selectedInfusate]?.name}: Làm tăng Natri +${adrogueDeltaNaPerLiter} mmol/L\n`;
    summary += `• Tốc độ truyền khuyến nghị (${INFUSATE_DATA[selectedInfusate]?.name}): ${infusionRateMlPerHour} mL/giờ\n`;
    summary += `• Giới hạn an toàn ODS: Tối đa ${dailyNaCorrectionMaxLimit} mmol/L trong 24 giờ đầu\n`;
    if (bolusProtocolSummary) summary += `• Bolus cấp cứu: ${bolusProtocolSummary}\n`;
  } else if (mode === 'hypernatremia') {
    summary += `• Chẩn đoán: Tăng Natri Máu (${serumNa} mmol/L) | Lượng nước tự do thiếu hụt (FWD): ${freeWaterDeficitLiters} Lít\n`;
    summary += `• Tốc độ bù nước tự do (${INFUSATE_DATA[selectedInfusate]?.name} / Đường tiêu hóa): ${infusionRateMlPerHour} mL/giờ chia đều trong 48 giờ\n`;
  } else if (mode === 'hyperkalemia') {
    summary += `• Chẩn đoán: Tăng Kali Máu (${serumK} mmol/L) | Mức độ nguy cơ: ${hasEcgChangesK ? 'Khẩn cấp có biến đổi ECG' : 'Theo dõi sát'}\n`;
    summary += `• Phác đồ: 1. Calcium Gluconate 10% IV stat -> 2. Insulin 10UI + Dextrose -> 3. Lợi tiểu / Nhựa gắn / Lọc máu\n`;
  } else if (mode === 'hypokalemia') {
    summary += `• Chẩn đoán: Hạ Kali Máu (${serumK} mmol/L) | Thiếu hụt ước tính: ~${potassiumDeficitMeq} mEq K+\n`;
    summary += `• Magie máu đi kèm: ${serumMg} mmol/L (${serumMg < 0.75 ? '⚠️ Cần bù Magie đồng thời' : 'Bình thường'})\n`;
  } else if (mode === 'calcium_disorder') {
    summary += `• Chẩn đoán: Rối Loạn Canxi Máu (Ca đo = ${serumCaTotal}, Ca hiệu chỉnh Albumin = ${correctedCalciumMmol} mmol/L)\n`;
    if (calciumPhosphateProduct) summary += `• Tích số Ca x P: ${calciumPhosphateProduct} mg²/dL²\n`;
  } else if (mode === 'magnesium_po4') {
    summary += `• Chẩn đoán: Rối Loạn Magie (${serumMg} mmol/L) / Photpho (${serumPhosphate || 'N/A'} mmol/L)\n`;
  }

  return {
    tbwLiters,
    correctedNa,
    sodiumDeficitMeq,
    freeWaterDeficitLiters,
    adrogueDeltaNaPerLiter,
    infusionRateMlPerHour,
    dailyNaCorrectionMaxLimit,
    bolusProtocolSummary,
    odsRiskWarning,
    ddavpClampProtocol,
    potassiumDeficitMeq,
    potassiumIvMaxRateSummary,
    hyperkalemiaStepProtocol,
    magnesiumCofactorAlert,
    correctedCalciumMmol,
    calciumPhosphateProduct,
    calciumReplacementProtocol,
    magnesiumReplacementProtocol,
    refeedingSyndromeProtocol,
    emergencyFlags,
    safeSpeedLimitSummary,
    clinicalSummary: summary,
    recommendations,
    infusateComparison,
  };
}

/**
 * Render Đồ Thị Đường Cong Bù Dịch 48 Giờ SVG & Vùng Nguy Hiểm ODS (Safe Zone vs Danger Zone)
 */
export function renderFluidTimelineSvg(
  currentNa: number,
  targetNa: number,
  rateMlH: number,
  delta24h: number = 6,
  isHighRisk: boolean = false
): string {
  const w = 560;
  const h = 260;
  const padL = 45;
  const padR = 30;
  const padT = 30;
  const padB = 40;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;

  const minNa = Math.min(100, currentNa - 5);
  const maxNa = Math.max(160, Math.max(currentNa, targetNa) + 10);

  const getX = (hour: number) => padL + (hour / 48) * innerW;
  const getY = (valNa: number) => padT + innerH - ((valNa - minNa) / (maxNa - minNa)) * innerH;

  const maxSafe24h = isHighRisk ? 6 : 8;
  const dangerThreshold24h = isHighRisk ? 8 : 10;

  const na0 = currentNa;
  const na6 = currentNa + (delta24h * 6) / 24;
  const na12 = currentNa + (delta24h * 12) / 24;
  const na24 = currentNa + delta24h;
  const na48 = targetNa;

  // Safe Corridor Polygon (0h -> 24h)
  const safePoly = `
    ${getX(0)},${getY(na0)}
    ${getX(24)},${getY(na0 + maxSafe24h)}
    ${getX(24)},${getY(na0 + 4)}
    ${getX(0)},${getY(na0)}
  `;

  // Danger Zone Polygon (ODS Danger > maxSafe)
  const dangerPoly = `
    ${getX(0)},${getY(na0)}
    ${getX(24)},${getY(na0 + 16)}
    ${getX(24)},${getY(na0 + dangerThreshold24h)}
    ${getX(0)},${getY(na0)}
  `;

  const trajectoryPts = [
    `${getX(0)},${getY(na0)}`,
    `${getX(6)},${getY(na6)}`,
    `${getX(12)},${getY(na12)}`,
    `${getX(24)},${getY(na24)}`,
    `${getX(48)},${getY(na48)}`,
  ].join(' ');

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" style="background:var(--color-surface); border-radius:12px;">
      <defs>
        <linearGradient id="safeCorridorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#10b981" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#10b981" stop-opacity="0.25" />
        </linearGradient>
        <linearGradient id="dangerCorridorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.05" />
          <stop offset="100%" stop-color="#ef4444" stop-opacity="0.22" />
        </linearGradient>
      </defs>

      <!-- Vùng Nguy Hiểm Hủy Myelin Cầu Não (ODS Danger Zone) -->
      <polygon points="${dangerPoly}" fill="url(#dangerCorridorGrad)" stroke="#ef4444" stroke-width="0.8" stroke-dasharray="3,3" />
      <text x="${getX(18)}" y="${getY(na0 + dangerThreshold24h + 2)}" fill="#ef4444" font-size="8.5" font-weight="800">VÙNG NGUY HIỂM ODS (&gt; ${dangerThreshold24h} mmol/L/24h)</text>

      <!-- Vùng Hành Lang An Toàn (Safe Target Corridor: 4-8 mmol/L/24h) -->
      <polygon points="${safePoly}" fill="url(#safeCorridorGrad)" stroke="#10b981" stroke-width="1.2" />
      <text x="${getX(12)}" y="${getY(na0 + maxSafe24h / 2)}" fill="#10b981" font-size="9" font-weight="800">HÀNH LANG AN TOÀN (+${maxSafe24h} mmol/L)</text>

      <!-- Trục Tọa Độ -->
      <line x1="${padL}" y1="${padT + innerH}" x2="${w - padR}" y2="${padT + innerH}" stroke="var(--color-border)" stroke-width="1.5" />
      <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + innerH}" stroke="var(--color-border)" stroke-width="1.5" />

      <!-- X Ticks (Hours: 0, 6, 12, 24, 36, 48) -->
      ${[0, 6, 12, 24, 36, 48].map(hr => `
        <line x1="${getX(hr)}" y1="${padT + innerH}" x2="${getX(hr)}" y2="${padT + innerH + 5}" stroke="var(--color-border)" stroke-width="1" />
        <text x="${getX(hr)}" y="${h - 15}" fill="var(--color-text-muted)" font-size="8.5" font-weight="700" text-anchor="middle">${hr}h</text>
      `).join('')}
      <text x="${w / 2}" y="${h - 2}" fill="var(--color-text)" font-size="10" font-weight="800" text-anchor="middle">Thời Gian Bù Dịch (Giờ)</text>

      <!-- Y Ticks (Natri mmol/L) -->
      ${[110, 120, 130, 140, 150, 160].filter(v => v >= minNa && v <= maxNa).map(v => `
        <line x1="${padL - 4}" y1="${getY(v)}" x2="${w - padR}" y2="${getY(v)}" stroke="var(--color-border)" stroke-width="0.5" stroke-dasharray="2,2" />
        <text x="${padL - 6}" y="${getY(v) + 3}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="end">${v}</text>
      `).join('')}
      <text x="14" y="${padT + innerH / 2}" fill="var(--color-text)" font-size="10" font-weight="800" text-anchor="middle" transform="rotate(-90 14 ${padT + innerH / 2})">Natri (mmol/L)</text>

      <!-- Đường Cong Quỹ Đạo Bù Dịch (Trajectory Curve) -->
      <polyline fill="none" stroke="var(--color-primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${trajectoryPts}" />

      <!-- Checkpoint Nodes (0h, 6h, 12h, 24h, 48h) -->
      <!-- 0h -->
      <circle cx="${getX(0)}" cy="${getY(na0)}" r="6" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
      <text x="${getX(0)}" y="${getY(na0) - 10}" fill="var(--color-text)" font-size="9" font-weight="800" text-anchor="start">${na0}</text>

      <!-- 6h -->
      <circle cx="${getX(6)}" cy="${getY(na6)}" r="5" fill="var(--color-warning)" stroke="#ffffff" stroke-width="1.5" />
      <text x="${getX(6)}" y="${getY(na6) - 9}" fill="var(--color-warning)" font-size="8.5" font-weight="700" text-anchor="middle">${na6.toFixed(1)}</text>

      <!-- 24h -->
      <circle cx="${getX(24)}" cy="${getY(na24)}" r="6.5" fill="var(--color-primary)" stroke="#ffffff" stroke-width="2" />
      <text x="${getX(24)}" y="${getY(na24) - 10}" fill="var(--color-primary)" font-size="9.5" font-weight="800" text-anchor="middle">${na24.toFixed(1)} (+${delta24h})</text>

      <!-- 48h (Target) -->
      <circle cx="${getX(48)}" cy="${getY(na48)}" r="7" fill="#10b981" stroke="#ffffff" stroke-width="2" />
      <text x="${getX(48)}" y="${getY(na48) - 10}" fill="#10b981" font-size="9.5" font-weight="800" text-anchor="end">Đích ${na48}</text>
    </svg>
  `;
}
