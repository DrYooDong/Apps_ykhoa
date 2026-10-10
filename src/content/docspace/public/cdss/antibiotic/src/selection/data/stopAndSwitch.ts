import { SourceRef } from '../types';

/**
 * Evidence-Based Antibiotic Duration, Stopping Checklist and IV-to-PO Switch Protocol
 * Sources:
 * - BV Bệnh Nhiệt Đới: Lưu đồ các bước ngưng kháng sinh (File 1, P.3)
 * - Bộ Y tế: Quyết định 5631/QĐ-BYT 2020 (Phụ lục 5 & 6)
 */

export interface DurationBenchmark {
  conditionVi: string;
  conditionEn: string;
  minDays: number;
  maxDays?: number;
  trialName: string;
  noteVi: string;
  source: SourceRef;
}

export const EVIDENCE_BASED_DURATIONS: DurationBenchmark[] = [
  {
    conditionVi: 'Viêm phổi cộng đồng (CAP)',
    conditionEn: 'Community-Acquired Pneumonia (CAP)',
    minDays: 3,
    maxDays: 5,
    trialName: 'PTC trial; BTS Guidelines',
    noteVi: 'Ngưng sau 3 - 5 ngày nếu đạt tiêu chí ổn định lâm sàng và hết sốt ≥ 48 giờ.',
    source: { doc: 'BVBND_LuuDo', page: 3 }
  },
  {
    conditionVi: 'Viêm phổi thở máy (VAP)',
    conditionEn: 'Ventilator-Associated Pneumonia (VAP)',
    minDays: 7,
    maxDays: 8,
    trialName: 'PRORATA; REGARD-VAP trials',
    noteVi: 'Liệu trình 7 ngày tương đương hiệu quả và giảm chọn lọc chủng kháng thuốc so với 14 ngày.',
    source: { doc: 'BVBND_LuuDo', page: 3 }
  },
  {
    conditionVi: 'Nhiễm trùng ổ bụng / Áp xe',
    conditionEn: 'Complicated Intra-abdominal Infection',
    minDays: 4,
    maxDays: 5,
    trialName: 'STOP-IT trial (NEJM 2015)',
    noteVi: '4 ngày sau khi đã kiểm soát nguồn lây (dẫn lưu ổ áp xe hoặc phẫu thuật triệt để).',
    source: { doc: 'BVBND_LuuDo', page: 3 }
  },
  {
    conditionVi: 'Nhiễm khuẩn huyết do vi khuẩn Gram âm',
    conditionEn: 'Gram-Negative Bacteremia',
    minDays: 7,
    maxDays: 7,
    trialName: 'Yahav 2019; Lee 2023 trials',
    noteVi: '7 ngày an toàn trên bệnh nhân đã ổn định huyết động và hết sốt ≥ 48 giờ.',
    source: { doc: 'BVBND_LuuDo', page: 3 }
  },
  {
    conditionVi: 'Nhiễm khuẩn đường tiết niệu có sốt / Viêm đài bể thận',
    conditionEn: 'Complicated UTI / Pyelonephritis',
    minDays: 7,
    maxDays: 7,
    trialName: 'IDSA Guidelines',
    noteVi: '7 ngày nếu dùng FQ hoặc beta-lactam đường tiêm và bệnh nhân đáp ứng lâm sàng tốt.',
    source: { doc: 'BVBND_LuuDo', page: 3 }
  },
  {
    conditionVi: 'Nhiễm khuẩn huyết do Tụ cầu vàng (S. aureus bacteremia)',
    conditionEn: 'Staphylococcus aureus Bacteremia (SAB)',
    minDays: 14,
    maxDays: 28,
    trialName: 'IDSA SAB Guidelines',
    noteVi: 'Tối thiểu 14 ngày cho ca không biến chứng; 4-6 tuần nếu có biến chứng/viêm nội tâm mạc.',
    source: { doc: 'BVBND_LuuDo', page: 3 }
  },
  {
    conditionVi: 'Viêm nội tâm mạc nhiễm khuẩn (IE)',
    conditionEn: 'Infective Endocarditis',
    minDays: 28,
    maxDays: 56,
    trialName: 'AHA/ESC Endocarditis Guidelines',
    noteVi: '4 - 8 tuần tùy van tự nhiên hay van nhân tạo và chủng vi khuẩn phân lập.',
    source: { doc: 'BVBND_LuuDo', page: 3 }
  },
  {
    conditionVi: 'Viêm phổi do trực khuẩn Gram âm không lên men (NFNG - P. aeruginosa, A. baumannii)',
    conditionEn: 'Pneumonia due to Non-fermenting Gram-negative (NFNG)',
    minDays: 10,
    maxDays: 14,
    trialName: 'BVBND Protocol',
    noteVi: '10 - 14 ngày do nguy cơ tái phát cao.',
    source: { doc: 'BVBND_LuuDo', page: 3 }
  }
];

export const STOP_ANTIBIOTIC_CHECKLIST = {
  clinicalCriteria: [
    {
      id: 'crit_afebrile',
      textVi: 'Thân nhiệt ≤ 37.3°C trong liên tục ≥ 24 - 48 giờ (không dùng hạ sốt)',
      isMandatory: true
    },
    {
      id: 'crit_hemodynamic',
      textVi: 'Huyết động ổn định, không dùng thuốc vận mạch (Noradrenalin, Adrenalin...)',
      isMandatory: true
    },
    {
      id: 'crit_oxygenation',
      textVi: 'FiO₂ ≤ 40% HOẶC SpO₂ đạt mục tiêu lâm sàng khi thở khí trời',
      isMandatory: true
    },
    {
      id: 'crit_local_signs',
      textVi: 'Các triệu chứng tại chỗ (đau, sưng, đỏ, chảy mủ) giảm rõ rệt',
      isMandatory: true
    },
    {
      id: 'crit_oral_intake',
      textVi: 'Ăn uống được qua đường tiêu hóa, không buồn nôn/nôn',
      isMandatory: true
    }
  ],
  labCriteria: [
    {
      id: 'crit_pct',
      textVi: 'Procalcitonin (PCT) < 0.5 ng/mL HOẶC giảm ≥ 80% so với giá trị đỉnh'
    },
    {
      id: 'crit_wbc',
      textVi: 'Số lượng bạch cầu (WBC) về ngưỡng bình thường (4.000 - 10.000/mm³)'
    },
    {
      id: 'crit_crp',
      textVi: 'CRP giảm > 50% so với đỉnh HOẶC < 35 mg/L'
    }
  ],
  additionalFavorable: [
    { id: 'crit_lactate', textVi: 'Lactate máu bình thường (< 2.0 mmol/L)' },
    { id: 'crit_neg_blood_culture', textVi: 'Cấy máu kiểm tra âm tính sau điều trị' }
  ]
};

export const IV_TO_PO_CONTRAINDICATIONS = [
  'Viêm nội tâm mạc nhiễm khuẩn',
  'Viêm màng não mủ / Nhiễm trùng hệ thần kinh trung ương',
  'Viêm trung thất',
  'Nhiễm trùng hoại tử mô mềm (viêm cân mạc hoại tử)',
  'Viêm xương tủy cấp / mạn tính',
  'Nhiễm trùng khớp chưa dẫn lưu',
  'Ổ áp xe sâu chưa được dẫn lưu triệt để',
  'Nhiễm khuẩn liên quan đến các thiết bị cấy ghép nhân tạo'
];

export interface IvToPoDrugPair {
  ivName: string;
  poName: string;
  poDoseVi: string;
  group: 1 | 2 | 3 | 4;
  bioavailabilityVi: string;
  notesVi?: string;
}

export const IV_TO_PO_DRUG_PAIRS: IvToPoDrugPair[] = [
  // Nhóm 1: F > 90%, tỷ lệ 1:1
  {
    ivName: 'Levofloxacin IV',
    poName: 'Levofloxacin viên',
    poDoseVi: '500mg mỗi 12 giờ HOẶC 750mg mỗi 24 giờ',
    group: 1,
    bioavailabilityVi: '> 99% (tỷ lệ liều IV:PO = 1:1)'
  },
  {
    ivName: 'Moxifloxacin IV',
    poName: 'Moxifloxacin viên',
    poDoseVi: '400mg mỗi 24 giờ',
    group: 1,
    bioavailabilityVi: '> 90% (tỷ lệ liều IV:PO = 1:1)'
  },
  {
    ivName: 'Linezolid IV',
    poName: 'Linezolid viên',
    poDoseVi: '600mg mỗi 12 giờ',
    group: 1,
    bioavailabilityVi: '100% (tỷ lệ liều IV:PO = 1:1)'
  },
  {
    ivName: 'Fluconazole IV',
    poName: 'Fluconazole viên/hỗn dịch',
    poDoseVi: '200 - 400mg mỗi 24 giờ',
    group: 1,
    bioavailabilityVi: '> 90% (tỷ lệ liều IV:PO = 1:1)'
  },
  {
    ivName: 'Metronidazole IV',
    poName: 'Metronidazole viên',
    poDoseVi: '500mg mỗi 8 - 12 giờ',
    group: 1,
    bioavailabilityVi: '> 99% (tỷ lệ liều IV:PO = 1:1)'
  },
  {
    ivName: 'Co-trimoxazole (TMP-SMX) IV',
    poName: 'Co-trimoxazole viên',
    poDoseVi: '2 viên 480mg (hoặc 1 viên Forte 960mg) mỗi 12 giờ',
    group: 1,
    bioavailabilityVi: '> 90% (tỷ lệ liều IV:PO = 1:1)'
  },

  // Nhóm 2: F 70-80%, bù bằng tăng liều PO
  {
    ivName: 'Ciprofloxacin 400mg IV q12h',
    poName: 'Ciprofloxacin viên',
    poDoseVi: '500mg - 750mg mỗi 12 giờ',
    group: 2,
    bioavailabilityVi: '70 - 80% (bù trừ bằng tăng liều viên PO)'
  },
  {
    ivName: 'Voriconazole 200mg IV q12h',
    poName: 'Voriconazole viên',
    poDoseVi: '200mg mỗi 12 giờ',
    group: 2,
    bioavailabilityVi: '80%'
  },

  // Nhóm 3: F > 90% nhưng liều PO tối đa thấp hơn
  {
    ivName: 'Clindamycin 600mg IV q8h',
    poName: 'Clindamycin viên',
    poDoseVi: '300mg - 450mg mỗi 6 - 8 giờ',
    group: 3,
    bioavailabilityVi: '> 90% (liều PO thấp hơn do dung nạp tiêu hóa)'
  },
  {
    ivName: 'Ampicillin/Sulbactam hoặc Amoxicillin IV',
    poName: 'Amoxicillin/Clavulanate hoặc Amoxicillin viên',
    poDoseVi: 'Amox/Clav 875/125mg hoặc 1000mg mỗi 12 giờ',
    group: 3,
    bioavailabilityVi: '75 - 90%'
  },

  // Nhóm 4: F thấp hơn và liều PO thấp hơn
  {
    ivName: 'Cefuroxime 750mg - 1.5g IV q8h',
    poName: 'Cefuroxime axetil viên',
    poDoseVi: '500mg mỗi 12 giờ',
    group: 4,
    bioavailabilityVi: '50 - 60%'
  }
];
