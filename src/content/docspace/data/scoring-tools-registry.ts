/**
 * CliniPortal DocSpace — Scoring Tools & Clinical Calculators Registry
 * Đăng ký các Thang Điểm & Công Cụ Tính Toán Lâm Sàng Cốt Lõi (Kho CC)
 * Phục vụ tự động lượng giá nguy cơ, phân tầng điều trị và hỗ trợ quyết định y khoa (CDSS)
 */

export interface ScoringComponent {
  id: string;
  label: string;
  subLabel?: string;
  points: number;
  type: 'boolean' | 'select' | 'range';
  options?: { label: string; points: number }[];
  category?: 'vital' | 'lab' | 'clinical' | 'history';
}

export interface RiskTier {
  minScore: number;
  maxScore: number;
  tierName: string;
  urgencyLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  color: string;
  mortalityRate?: string;
  clinicalAction: string;
  disposition: string; // Ngoại trú, Khoa thường, Cấp cứu, ICU
}

export interface ScoringTool {
  id: string;
  name: string;
  vietnameseName: string;
  abbreviation: string;
  category: 'respiratory' | 'cardiovascular' | 'infectious' | 'neurology' | 'hepatology' | 'gastroenterology' | 'critical_care';
  icdCode?: string;
  sourceVaultFile?: string;
  evidenceSource: string;
  purpose: string;
  relatedDiseases: string[];
  components: ScoringComponent[];
  riskTiers: RiskTier[];
  calculate: (inputs: Record<string, boolean | number>) => {
    totalScore: number;
    matchedTier: RiskTier;
    breakdown: { label: string; points: number }[];
  };
}

export const SCORING_TOOLS_REGISTRY: Record<string, ScoringTool> = {
  // ─── 1. CURB-65 (VIÊM PHỔI CỘNG ĐỒNG) ──────────────────────────────────
  curb65: {
    id: 'curb65',
    name: 'CURB-65 Score for Pneumonia Severity',
    vietnameseName: 'Thang điểm CURB-65 Phân tầng độ nặng Viêm phổi',
    abbreviation: 'CURB-65',
    category: 'respiratory',
    icdCode: 'J18.9',
    sourceVaultFile: '3.1. Kho công cụ & thang điểm/CC_CURB65_P1.md',
    evidenceSource: 'British Thoracic Society (BTS) / Hướng dẫn BYT & ATS/IDSA',
    purpose: 'Đánh giá nguy cơ tử vong 30 ngày và quyết định nơi điều trị (Ngoại trú, Nội trú, hay ICU) cho viêm phổi cộng đồng',
    relatedDiseases: ['viem_phoi', 'copd', 'soc_nhiem_khuan'],
    components: [
      { id: 'c', label: 'C - Confusion (Rối loạn tri giác)', subLabel: 'Điểm AMT ≤ 8 hoặc lú lẫn cấp tính mới xuất hiện', points: 1, type: 'boolean', category: 'clinical' },
      { id: 'u', label: 'U - Urea huyết thanh > 7 mmol/L', subLabel: 'Urea > 7 mmol/L (hoặc BUN > 19 mg/dL)', points: 1, type: 'boolean', category: 'lab' },
      { id: 'r', label: 'R - Respiratory rate (Nhịp thở) ≥ 30 lần/phút', subLabel: 'Thở nhanh cấp tính ≥ 30 l/p', points: 1, type: 'boolean', category: 'vital' },
      { id: 'b', label: 'B - Blood pressure (Huyết áp tụt)', subLabel: 'HATT < 90 mmHg HOẶC HATTr ≤ 60 mmHg', points: 1, type: 'boolean', category: 'vital' },
      { id: 'age65', label: '65 - Tuổi ≥ 65 tuổi', subLabel: 'Bệnh nhân từ 65 tuổi trở lên', points: 1, type: 'boolean', category: 'history' },
    ],
    riskTiers: [
      { minScore: 0, maxScore: 1, tierName: 'Nhóm I (Nguy cơ thấp)', urgencyLevel: 'LOW', color: '#10b981', mortalityRate: '0.6 - 2.7%', clinicalAction: 'Có thể điều trị ngoại trú an toàn bằng kháng sinh uống. Tái khám sau 48-72 giờ.', disposition: 'Ngoại trú' },
      { minScore: 2, maxScore: 2, tierName: 'Nhóm II (Nguy cơ trung bình)', urgencyLevel: 'MEDIUM', color: '#f59e0b', mortalityRate: '6.8 - 9.2%', clinicalAction: 'Nhập viện điều trị nội trú ngắn hạn hoặc theo dõi chặt tại phòng lưu. Dùng kháng sinh uống hoặc tiêm tĩnh mạch.', disposition: 'Nội trú khoa Hô Hấp' },
      { minScore: 3, maxScore: 5, tierName: 'Nhóm III (Nguy cơ cao / Nặng)', urgencyLevel: 'CRITICAL', color: '#ef4444', mortalityRate: '14 - 27.8%', clinicalAction: 'Viêm phổi nặng bắt buộc nhập viện khẩn cấp, cân nhắc ngay chuyển khoa Hồi sức tích cực (ICU/HDU). Kháng sinh phối hợp IV.', disposition: 'Khoa Hồi Sức Tích Cực (ICU)' },
    ],
    calculate: (inputs) => {
      let totalScore = 0;
      const breakdown: { label: string; points: number }[] = [];
      const tool = SCORING_TOOLS_REGISTRY.curb65;

      tool.components.forEach(comp => {
        if (inputs[comp.id]) {
          totalScore += comp.points;
          breakdown.push({ label: comp.label, points: comp.points });
        }
      });

      const matchedTier = tool.riskTiers.find(t => totalScore >= t.minScore && totalScore <= t.maxScore) || tool.riskTiers[0];
      return { totalScore, matchedTier, breakdown };
    }
  },

  // ─── 2. QSOFA (NHIỄM TRÙNG HUYẾT / SEPSIS) ──────────────────────────────
  qsofa: {
    id: 'qsofa',
    name: 'quick Sequential Organ Failure Assessment',
    vietnameseName: 'Thang điểm qSOFA Sàng lọc nhanh Nhiễm trùng huyết',
    abbreviation: 'qSOFA',
    category: 'infectious',
    icdCode: 'A41.9',
    sourceVaultFile: '3.1. Kho công cụ & thang điểm/CC_QSOFA_P1.md',
    evidenceSource: 'The Third International Consensus Definitions for Sepsis (Sepsis-3, JAMA 2016)',
    purpose: 'Sàng lọc tức thì tại giường bệnh nhân nghi ngờ nhiễm trùng có nguy cơ diễn tiến suy đa tạng và tử vong cao ngoài ICU',
    relatedDiseases: ['soc_nhiem_khuan', 'viem_phoi', 'viem_ruot_thua_cap', 'viem_tui_mat_cap'],
    components: [
      { id: 'rr_gte_22', label: 'Tần số thở ≥ 22 lần/phút', subLabel: 'Thở nhanh nhịp thở ≥ 22 chu kỳ/phút', points: 1, type: 'boolean', category: 'vital' },
      { id: 'altered_mental', label: 'Thay đổi tri giác (GCS < 15)', subLabel: 'Bất kỳ thay đổi nào về trạng thái tâm thần tỉnh táo', points: 1, type: 'boolean', category: 'clinical' },
      { id: 'sbp_lte_100', label: 'Huyết áp tâm thu ≤ 100 mmHg', subLabel: 'HATT tụt ≤ 100 mmHg', points: 1, type: 'boolean', category: 'vital' },
    ],
    riskTiers: [
      { minScore: 0, maxScore: 1, tierName: 'qSOFA Âm tính (0 - 1 điểm)', urgencyLevel: 'LOW', color: '#10b981', mortalityRate: '< 3%', clinicalAction: 'Nguy cơ tử vong thấp. Tiếp tục theo dõi lâm sàng và điều trị ổ nhiễm trùng ban đầu.', disposition: 'Theo dõi khoa thường' },
      { minScore: 2, maxScore: 3, tierName: 'qSOFA Dương tính (≥ 2 điểm)', urgencyLevel: 'CRITICAL', color: '#ef4444', mortalityRate: '10 - 24%', clinicalAction: 'Báo động đỏ Sepsis! Cần tầm soát suy cơ quan (tính đầy đủ SOFA Score), định lượng Lactate máu khẩn, cấy máu trước khi dùng kháng sinh phổ rộng trong vòng 1 giờ vàng (Hour-1 Bundle).', disposition: 'Cấp cứu / ICU' },
    ],
    calculate: (inputs) => {
      let totalScore = 0;
      const breakdown: { label: string; points: number }[] = [];
      const tool = SCORING_TOOLS_REGISTRY.qsofa;
      tool.components.forEach(comp => {
        if (inputs[comp.id]) {
          totalScore += comp.points;
          breakdown.push({ label: comp.label, points: comp.points });
        }
      });
      const matchedTier = tool.riskTiers.find(t => totalScore >= t.minScore && totalScore <= t.maxScore) || tool.riskTiers[0];
      return { totalScore, matchedTier, breakdown };
    }
  },

  // ─── 3. CHA2DS2-VASc (RUNG NHĨ & DỰ PHÒNG ĐỘT QUỴ) ─────────────────────
  cha2ds2_vasc: {
    id: 'cha2ds2_vasc',
    name: 'CHA2DS2-VASc Score for Atrial Fibrillation Stroke Risk',
    vietnameseName: 'Thang điểm CHA2DS2-VASc Phân tầng nguy cơ đột quỵ trong Rung nhĩ',
    abbreviation: 'CHA₂DS₂-VASc',
    category: 'cardiovascular',
    icdCode: 'I48',
    sourceVaultFile: '3.1. Kho công cụ & thang điểm/CC_CHA2DS2_VASC_P1.md',
    evidenceSource: 'ESC 2024 Guidelines for the management of Atrial Fibrillation / AHA/ACC/ACCP',
    purpose: 'Lượng giá nguy cơ đột quỵ tắc mạch hàng năm và hướng dẫn chỉ định kháng đông DOAC (Apixaban, Rivaroxaban...) hoặc VKA',
    relatedDiseases: ['hoi_chung_vanh_cap', 'tai_bien_mach_mau_nao', 'suy_tim'],
    components: [
      { id: 'chf', label: 'C - Congestive Heart Failure', subLabel: 'Suy tim sung huyết hoặc LVEF ≤ 40%', points: 1, type: 'boolean', category: 'history' },
      { id: 'htn', label: 'H - Hypertension', subLabel: 'Tăng huyết áp hoặc đang điều trị thuốc hạ áp', points: 1, type: 'boolean', category: 'history' },
      { id: 'age75', label: 'A₂ - Age ≥ 75 years', subLabel: 'Tuổi từ 75 trở lên (2 điểm)', points: 2, type: 'boolean', category: 'history' },
      { id: 'dm', label: 'D - Diabetes Mellitus', subLabel: 'Đái tháo đường típ 1 hoặc 2', points: 1, type: 'boolean', category: 'history' },
      { id: 'stroke', label: 'S₂ - Prior Stroke / TIA / Thromboembolism', subLabel: 'Tiền sử đột quỵ não, TIA, tắc mạch ngoại vi (2 điểm)', points: 2, type: 'boolean', category: 'history' },
      { id: 'vascular', label: 'V - Vascular Disease', subLabel: 'Tiền sử NMCT, bệnh mạch máu ngoại vi, xơ vữa ĐMC', points: 1, type: 'boolean', category: 'history' },
      { id: 'age65_74', label: 'A - Age 65–74 years', subLabel: 'Tuổi từ 65 đến 74', points: 1, type: 'boolean', category: 'history' },
      { id: 'female', label: 'Sc - Sex Category (Female)', subLabel: 'Giới tính Nữ (Risk modifier)', points: 1, type: 'boolean', category: 'history' },
    ],
    riskTiers: [
      { minScore: 0, maxScore: 0, tierName: 'Nguy cơ rất thấp (0 điểm ở nam)', urgencyLevel: 'LOW', color: '#10b981', mortalityRate: 'Đột quỵ < 0.2%/năm', clinicalAction: 'Không dùng thuốc kháng đông hoặc chống kết tập tiểu cầu (Class I, Level B).', disposition: 'Ngoại trú' },
      { minScore: 1, maxScore: 1, tierName: 'Nguy cơ thấp (1 điểm ở nam, hoặc 1 điểm nữ tính riêng)', urgencyLevel: 'MEDIUM', color: '#f59e0b', mortalityRate: 'Đột quỵ ~ 0.6 - 1.3%/năm', clinicalAction: 'Cân nhắc dùng kháng đông đường uống DOAC theo từng cá thể và sở thích bệnh nhân (Class IIa, Level B). Đánh giá nguy cơ xuất huyết HAS-BLED.', disposition: 'Ngoại trú tim mạch' },
      { minScore: 2, maxScore: 9, tierName: 'Nguy cơ cao (≥ 2 điểm ở nam hoặc ≥ 3 điểm ở nữ)', urgencyLevel: 'HIGH', color: '#ef4444', mortalityRate: 'Đột quỵ 2.2 - 15.2%/năm', clinicalAction: 'Chỉ định BẮT BUỘC dùng thuốc kháng đông đường uống (Ưu tiên DOAC: Apixaban, Rivaroxaban, Dabigatran hơn Warfarin) trừ khi có chống chỉ định tuyệt đối (Class I, Level A).', disposition: 'Khám chuyên khoa Tim Mạch' },
    ],
    calculate: (inputs) => {
      let totalScore = 0;
      const breakdown: { label: string; points: number }[] = [];
      const tool = SCORING_TOOLS_REGISTRY.cha2ds2_vasc;
      tool.components.forEach(comp => {
        if (inputs[comp.id]) {
          totalScore += comp.points;
          breakdown.push({ label: comp.label, points: comp.points });
        }
      });
      const matchedTier = tool.riskTiers.find(t => totalScore >= t.minScore && totalScore <= t.maxScore) || tool.riskTiers[2];
      return { totalScore, matchedTier, breakdown };
    }
  },

  // ─── 4. HAS-BLED (NGUY CƠ XUẤT HUYẾT KHI DÙNG KHÁNG ĐÔNG) ───────────────
  has_bled: {
    id: 'has_bled',
    name: 'HAS-BLED Score for Major Bleeding Risk',
    vietnameseName: 'Thang điểm HAS-BLED Lượng giá nguy cơ xuất huyết lớn khi dùng kháng đông',
    abbreviation: 'HAS-BLED',
    category: 'cardiovascular',
    icdCode: 'I48',
    sourceVaultFile: '3.1. Kho công cụ & thang điểm/CC_HAS_BLED_P1.md',
    evidenceSource: 'Chest 2010 / ESC Atrial Fibrillation Guidelines',
    purpose: 'Nhận diện các yếu tố nguy cơ xuất huyết có thể can thiệp được trước khi bắt đầu hoặc trong quá trình dùng thuốc kháng đông',
    relatedDiseases: ['hoi_chung_vanh_cap', 'xuat_huyet_tieu_hoa_tren'],
    components: [
      { id: 'h', label: 'H - Hypertension không kiểm soát', subLabel: 'Huyết áp tâm thu > 160 mmHg', points: 1, type: 'boolean', category: 'vital' },
      { id: 'a_renal', label: 'A - Abnormal Renal function', subLabel: 'Chạy thận, ghép thận, hoặc Creatinine ≥ 200 µmol/L (2.26 mg/dL)', points: 1, type: 'boolean', category: 'lab' },
      { id: 'a_liver', label: 'A - Abnormal Liver function', subLabel: 'Bệnh gan mạn (Xơ gan) hoặc Bilirubin > 2x GHBT kèm AST/ALT > 3x GHBT', points: 1, type: 'boolean', category: 'lab' },
      { id: 's', label: 'S - Prior Stroke', subLabel: 'Tiền sử đột quỵ não trước đây', points: 1, type: 'boolean', category: 'history' },
      { id: 'b', label: 'B - Bleeding history / Predisposition', subLabel: 'Tiền sử xuất huyết lớn, xuất huyết tiêu hóa, thiếu máu, cơ địa dễ chảy máu', points: 1, type: 'boolean', category: 'history' },
      { id: 'l', label: 'L - Labile INR', subLabel: 'INR không ổn định, thời gian trong ngưỡng điều trị TTR < 60% (nếu dùng VKA)', points: 1, type: 'boolean', category: 'lab' },
      { id: 'e', label: 'E - Elderly (Tuổi > 65)', subLabel: 'Bệnh nhân trên 65 tuổi', points: 1, type: 'boolean', category: 'history' },
      { id: 'd_drugs', label: 'D - Drugs predisposing to bleed', subLabel: 'Dùng đồng thời kháng kết tập tiểu cầu (Aspirin, Clopidogrel) hoặc NSAID', points: 1, type: 'boolean', category: 'history' },
      { id: 'd_alcohol', label: 'D - Alcohol excess', subLabel: 'Lạm dụng rượu bia (≥ 8 đơn vị cồn/tuần)', points: 1, type: 'boolean', category: 'history' },
    ],
    riskTiers: [
      { minScore: 0, maxScore: 2, tierName: 'Nguy cơ xuất huyết thấp / trung bình (0 - 2 điểm)', urgencyLevel: 'LOW', color: '#10b981', mortalityRate: 'Xuất huyết 1.1 - 1.9%/năm', clinicalAction: 'Dùng kháng đông an toàn. Theo dõi định kỳ thông thường.', disposition: 'Ngoại trú' },
      { minScore: 3, maxScore: 9, tierName: 'Nguy cơ xuất huyết cao (≥ 3 điểm)', urgencyLevel: 'HIGH', color: '#ef4444', mortalityRate: 'Xuất huyết ≥ 3.7 - 8.9%/năm', clinicalAction: 'Thận trọng cao độ! Điểm ≥ 3 KHÔNG PHẢI chống chỉ định kháng đông, mà là tín hiệu cần: Tích cực điều chỉnh các yếu tố sửa đổi được (hạ HA, ngưng NSAID/Aspirin, hạn chế rượu), ưu tiên DOACs, hẹn tái khám và xét nghiệm đông máu dày hơn.', disposition: 'Theo dõi chặt chẽ' },
    ],
    calculate: (inputs) => {
      let totalScore = 0;
      const breakdown: { label: string; points: number }[] = [];
      const tool = SCORING_TOOLS_REGISTRY.has_bled;
      tool.components.forEach(comp => {
        if (inputs[comp.id]) {
          totalScore += comp.points;
          breakdown.push({ label: comp.label, points: comp.points });
        }
      });
      const matchedTier = tool.riskTiers.find(t => totalScore >= t.minScore && totalScore <= t.maxScore) || tool.riskTiers[1];
      return { totalScore, matchedTier, breakdown };
    }
  },

  // ─── 5. WELLS SCORE (THUYÊN TẮC PHỔI - PE) ──────────────────────────────
  wells_pe: {
    id: 'wells_pe',
    name: 'Wells Criteria for Pulmonary Embolism',
    vietnameseName: 'Thang điểm Wells Lượng giá xác suất Thuyên tắc phổi (PE)',
    abbreviation: 'Wells PE',
    category: 'respiratory',
    icdCode: 'I26',
    sourceVaultFile: '3.1. Kho công cụ & thang điểm/CC_WELLS_PE_P1.md',
    evidenceSource: 'Ann Intern Med 2001 / ESC Guidelines on Acute Pulmonary Embolism',
    purpose: 'Đánh giá xác suất tiền nghiệm của thuyên tắc động mạch phổi để chỉ định xét nghiệm D-dimer hoặc chụp CT Angio động mạch phổi (CTPA)',
    relatedDiseases: ['thuyen_tac_phoi', 'copd', 'hoi_chung_vanh_cap'],
    components: [
      { id: 'dvt_symptoms', label: 'Triệu chứng lâm sàng của DVT', subLabel: 'Sưng đau bắp chân, phù một bên chân (3 điểm)', points: 3.0, type: 'boolean', category: 'clinical' },
      { id: 'pe_most_likely', label: 'Chẩn đoán PE khả thi hơn các chẩn đoán khác', subLabel: 'Không có chẩn đoán phân biệt nào giải thích triệu chứng tốt hơn PE (3 điểm)', points: 3.0, type: 'boolean', category: 'clinical' },
      { id: 'hr_gt_100', label: 'Nhịp tim nhanh > 100 lần/phút', subLabel: 'Mạch > 100 l/p (1.5 điểm)', points: 1.5, type: 'boolean', category: 'vital' },
      { id: 'immobilization', label: 'Bất động hoặc phẫu thuật trong 4 tuần qua', subLabel: 'Nằm liệt giường ≥ 3 ngày hoặc đại phẫu trong vòng 4 tuần (1.5 điểm)', points: 1.5, type: 'boolean', category: 'history' },
      { id: 'prior_vte', label: 'Tiền sử từng bị DVT hoặc PE', subLabel: 'Có bệnh sử thuyên tắc huyết khối tĩnh mạch trước đây (1.5 điểm)', points: 1.5, type: 'boolean', category: 'history' },
      { id: 'hemoptysis', label: 'Ho ra máu (Hemoptysis)', subLabel: 'Ho khạc đờm lẫn máu tươi (1 điểm)', points: 1.0, type: 'boolean', category: 'clinical' },
      { id: 'malignancy', label: 'Ung thư đang tiến triển', subLabel: 'Đang điều trị ung thư, điều trị giảm nhẹ hoặc chẩn đoán trong vòng 6 tháng (1 điểm)', points: 1.0, type: 'boolean', category: 'history' },
    ],
    riskTiers: [
      { minScore: 0, maxScore: 4, tierName: 'PE Không chắc chắn / Nguy cơ thấp (≤ 4 điểm)', urgencyLevel: 'LOW', color: '#10b981', mortalityRate: 'Xác suất PE ~ 12%', clinicalAction: 'Chỉ định làm xét nghiệm D-dimer độ nhạy cao. Nếu D-dimer âm tính (< 500 ng/mL hoặc ngưỡng chỉnh theo tuổi: Tuổi x 10 ở người > 50 tuổi): Loại trừ an toàn PE, không cần chụp CTPA.', disposition: 'Phòng cấp cứu / Nội trú' },
      { minScore: 4.5, maxScore: 12.5, tierName: 'PE Khả năng cao (> 4 điểm)', urgencyLevel: 'CRITICAL', color: '#ef4444', mortalityRate: 'Xác suất PE ~ 37 - 65%', clinicalAction: 'Khả năng cao thuyên tắc phổi! Bỏ qua D-dimer, chỉ định ngay CHỤP CT ĐỘNG MẠCH PHỔI CẢN QUANG (CTPA). Khởi động ngay thuốc chống đông (Enoxaparin hoặc UFH) trong khi chờ chụp nếu không có chống chỉ định xuất huyết.', disposition: 'Cấp cứu / Hồi sức' },
    ],
    calculate: (inputs) => {
      let totalScore = 0;
      const breakdown: { label: string; points: number }[] = [];
      const tool = SCORING_TOOLS_REGISTRY.wells_pe;
      tool.components.forEach(comp => {
        if (inputs[comp.id]) {
          totalScore += comp.points;
          breakdown.push({ label: comp.label, points: comp.points });
        }
      });
      const matchedTier = totalScore <= 4 ? tool.riskTiers[0] : tool.riskTiers[1];
      return { totalScore, matchedTier, breakdown };
    }
  },

  // ─── 6. GLASGOW COMA SCALE (GCS) ────────────────────────────────────────
  gcs: {
    id: 'gcs',
    name: 'Glasgow Coma Scale',
    vietnameseName: 'Thang điểm Hôn mê Glasgow (GCS)',
    abbreviation: 'GCS',
    category: 'neurology',
    icdCode: 'R40.2',
    sourceVaultFile: '3.1. Kho công cụ & thang điểm/CC_GCS_P1.md',
    evidenceSource: 'Teasdale & Jennett, Lancet 1974 / ATLS (Advanced Trauma Life Support)',
    purpose: 'Lượng giá mức độ suy giảm ý thức và chấn thương sọ não cấp tính qua 3 đáp ứng: Mắt (E), Lời nói (V), Vận động (M)',
    relatedDiseases: ['tai_bien_mach_mau_nao', 'soc_nhiem_khuan', 'viem_nao_mang_nao'],
    components: [
      {
        id: 'eye',
        label: 'Mắt (Eye Opening - E: 1–4 điểm)',
        points: 4,
        type: 'select',
        options: [
          { label: 'E4: Mở mắt tự nhiên', points: 4 },
          { label: 'E3: Mở mắt khi gọi / nghe tiếng động', points: 3 },
          { label: 'E2: Mở mắt khi kích thích đau', points: 2 },
          { label: 'E1: Không mở mắt dù kích thích đau', points: 1 },
        ]
      },
      {
        id: 'verbal',
        label: 'Lời nói (Verbal Response - V: 1–5 điểm)',
        points: 5,
        type: 'select',
        options: [
          { label: 'V5: Trả lời đúng, định hướng tốt không gian thời gian', points: 5 },
          { label: 'V4: Trả lời lẫn lộn, nhầm lẫn', points: 4 },
          { label: 'V3: Nói từ ngữ không thích hợp, rời rạc', points: 3 },
          { label: 'V2: Kêu rên, phát âm khó hiểu vô nghĩa', points: 2 },
          { label: 'V1: Hoàn toàn không phát âm', points: 1 },
        ]
      },
      {
        id: 'motor',
        label: 'Vận động (Motor Response - M: 1–6 điểm)',
        points: 6,
        type: 'select',
        options: [
          { label: 'M6: Thực hiện y lệnh chính xác', points: 6 },
          { label: 'M5: Đáp ứng đúng vị trí kích thích đau (Gạt tay)', points: 5 },
          { label: 'M4: Co tay tránh kích thích đau (Rụt chi)', points: 4 },
          { label: 'M3: Co cứng mất vỏ (Gấp bất thường chi trên)', points: 3 },
          { label: 'M2: Duỗi cứng mất não (Duỗi bất thường các chi)', points: 2 },
          { label: 'M1: Hoàn toàn không đáp ứng vận động', points: 1 },
        ]
      }
    ],
    riskTiers: [
      { minScore: 13, maxScore: 15, tierName: 'Chấn thương sọ não nhẹ / Ý thức tỉnh táo (13 - 15 điểm)', urgencyLevel: 'LOW', color: '#10b981', clinicalAction: 'Theo dõi tri giác mỗi 1-2 giờ. Đánh giá dấu hiệu thần kinh khu trú.', disposition: 'Khoa phòng thường' },
      { minScore: 9, maxScore: 12, tierName: 'Chấn thương sọ não vừa / Rối loạn ý thức (9 - 12 điểm)', urgencyLevel: 'MEDIUM', color: '#f59e0b', clinicalAction: 'Chỉ định chụp CT sọ não khẩn. Hội chẩn chuyên khoa Thần kinh / Phẫu thuật thần kinh. Theo dõi sát đường thở.', disposition: 'Cấp cứu / Đơn vị đột quỵ' },
      { minScore: 3, maxScore: 8, tierName: 'Hôn mê sâu / Chấn thương sọ não nặng (≤ 8 điểm)', urgencyLevel: 'CRITICAL', color: '#ef4444', clinicalAction: 'GCS ≤ 8: CÂN NHẮC ĐẶT NỘI KHÍ QUẢN BẢO VỆ ĐƯỜNG THỞ NGAY! Hồi sức chống phù não (Nằm đầu cao 30°, Mannitol/NaCl 3%, thở máy kiểm soát PaCO2 35-40 mmHg).', disposition: 'ICU Hồi Sức Tích Cực' },
    ],
    calculate: (inputs) => {
      let totalScore = 0;
      const breakdown: { label: string; points: number }[] = [];
      const tool = SCORING_TOOLS_REGISTRY.gcs;

      const e = Number(inputs['eye']) || 4;
      const v = Number(inputs['verbal']) || 5;
      const m = Number(inputs['motor']) || 6;
      totalScore = e + v + m;

      breakdown.push({ label: `Mắt (E): ${e} điểm`, points: e });
      breakdown.push({ label: `Lời nói (V): ${v} điểm`, points: v });
      breakdown.push({ label: `Vận động (M): ${m} điểm`, points: m });

      const matchedTier = tool.riskTiers.find(t => totalScore >= t.minScore && totalScore <= t.maxScore) || tool.riskTiers[0];
      return { totalScore, matchedTier, breakdown };
    }
  },

  // ─── 7. CHILD-PUGH (CHỨC NĂNG GAN & XƠ GAN) ──────────────────────────────
  child_pugh: {
    id: 'child_pugh',
    name: 'Child-Turcotte-Pugh (CTP) Score for Cirrhosis Mortality',
    vietnameseName: 'Thang điểm Child-Pugh Phân loại giai đoạn và tiên lượng Xơ gan',
    abbreviation: 'Child-Pugh',
    category: 'hepatology',
    icdCode: 'K74.6',
    sourceVaultFile: '3.1. Kho công cụ & thang điểm/CC_CHILD_PUGH_P1.md',
    evidenceSource: 'Pugh et al., Br J Surg 1973 / AASLD & EASL Cirrhosis Guidelines',
    purpose: 'Phân loại mức độ suy chức năng tế bào gan và tiên lượng tỷ lệ sống sót sau phẫu thuật hoặc bệnh gan giai đoạn cuối',
    relatedDiseases: ['xo_gan', 'xuat_huyet_tieu_hoa_tren'],
    components: [
      {
        id: 'encephalopathy',
        label: 'Bệnh não gan (Hôn mê gan)',
        points: 1,
        type: 'select',
        options: [
          { label: 'Không có bệnh não gan', points: 1 },
          { label: 'Độ 1 - 2 (Lơ mơ, đảo lộn giấc ngủ, run vẫy Flapping tremor)', points: 2 },
          { label: 'Độ 3 - 4 (Lú lẫn nặng, ngủ gà, hôn mê)', points: 3 },
        ]
      },
      {
        id: 'ascites',
        label: 'Cổ trướng (Báng bụng)',
        points: 1,
        type: 'select',
        options: [
          { label: 'Không có cổ trướng', points: 1 },
          { label: 'Cổ trướng nhẹ / vừa (đáp ứng thuốc lợi tiểu)', points: 2 },
          { label: 'Cổ trướng mức độ nhiều / kháng trị', points: 3 },
        ]
      },
      {
        id: 'bilirubin',
        label: 'Bilirubin toàn phần',
        points: 1,
        type: 'select',
        options: [
          { label: '< 34 µmol/L (< 2 mg/dL)', points: 1 },
          { label: '34 - 51 µmol/L (2 - 3 mg/dL)', points: 2 },
          { label: '> 51 µmol/L (> 3 mg/dL)', points: 3 },
        ]
      },
      {
        id: 'albumin',
        label: 'Albumin huyết thanh',
        points: 1,
        type: 'select',
        options: [
          { label: '> 35 g/L (> 3.5 g/dL)', points: 1 },
          { label: '28 - 35 g/L (2.8 - 3.5 g/dL)', points: 2 },
          { label: '< 28 g/L (< 2.8 g/dL)', points: 3 },
        ]
      },
      {
        id: 'inr',
        label: 'INR / Thời gian Prothrombin kéo dài',
        points: 1,
        type: 'select',
        options: [
          { label: 'INR < 1.7 (PT kéo dài < 4s)', points: 1 },
          { label: 'INR 1.7 - 2.3 (PT kéo dài 4 - 6s)', points: 2 },
          { label: 'INR > 2.3 (PT kéo dài > 6s)', points: 3 },
        ]
      },
    ],
    riskTiers: [
      { minScore: 5, maxScore: 6, tierName: 'Child-Pugh A (5 - 6 điểm: Xơ gan còn bù)', urgencyLevel: 'LOW', color: '#10b981', mortalityRate: 'Tử vong 1 năm: ~10% | Tỷ lệ sống sót 2 năm: 85%', clinicalAction: 'Chức năng gan còn bù tốt. Bệnh nhân chịu được phẫu thuật bụng lớn. Điều trị nguyên nhân (thuốc kháng virus, kiêng rượu), tầm soát ung thư gan HCC mỗi 6 tháng.', disposition: 'Ngoại trú Gan Mật' },
      { minScore: 7, maxScore: 9, tierName: 'Child-Pugh B (7 - 9 điểm: Xơ gan mất bù vừa)', urgencyLevel: 'MEDIUM', color: '#f59e0b', mortalityRate: 'Tử vong 1 năm: ~20% | Tỷ lệ sống sót 2 năm: 60%', clinicalAction: 'Xơ gan mất bù. Cần điều chỉnh liều thuốc đào thải qua gan. Cân nhắc đưa vào danh sách chờ ghép gan.', disposition: 'Khoa Tiêu Hóa Gan Mật' },
      { minScore: 10, maxScore: 15, tierName: 'Child-Pugh C (10 - 15 điểm: Xơ gan mất bù nặng)', urgencyLevel: 'CRITICAL', color: '#ef4444', mortalityRate: 'Tử vong 1 năm: ~55% | Tỷ lệ sống sót 2 năm: 35%', clinicalAction: 'Tiên lượng rất xấu! Tỷ lệ tử vong chu phẫu > 80%. Chỉ định ghép gan là phương pháp điều trị duy nhất mang lại cơ hội sống còn.', disposition: 'Nhập viện theo dõi tích cực' },
    ],
    calculate: (inputs) => {
      let totalScore = 0;
      const breakdown: { label: string; points: number }[] = [];
      const tool = SCORING_TOOLS_REGISTRY.child_pugh;

      ['encephalopathy', 'ascites', 'bilirubin', 'albumin', 'inr'].forEach(key => {
        const val = Number(inputs[key]) || 1;
        totalScore += val;
        breakdown.push({ label: `${key}: ${val} điểm`, points: val });
      });

      const matchedTier = tool.riskTiers.find(t => totalScore >= t.minScore && totalScore <= t.maxScore) || tool.riskTiers[0];
      return { totalScore, matchedTier, breakdown };
    }
  },

  // ─── 8. GLASGOW-BLATCHFORD (XUẤT HUYẾT TIÊU HÓA TRÊN) ─────────────────
  glasgow_blatchford: {
    id: 'glasgow_blatchford',
    name: 'Glasgow-Blatchford Bleeding Score (GBS)',
    vietnameseName: 'Thang điểm Glasgow-Blatchford Đánh giá xuất huyết tiêu hóa trên',
    abbreviation: 'GBS',
    category: 'gastroenterology',
    icdCode: 'K92.2',
    sourceVaultFile: '3.1. Kho công cụ & thang điểm/CC_GLASGOW_BLATCHFORD_P1.md',
    evidenceSource: 'Lancet 2000 / ACG Clinical Guideline: Upper Gastrointestinal and Ulcer Bleeding',
    purpose: 'Sàng lọc bệnh nhân xuất huyết tiêu hóa trên có cần can thiệp truyền máu, nội soi cấp cứu hay có thể xuất viện theo dõi ngoại trú',
    relatedDiseases: ['xuat_huyet_tieu_hoa_tren', 'loet_da_day_ta_trang', 'xo_gan'],
    components: [
      { id: 'bun_high', label: 'BUN tăng (Urea ≥ 6.5 mmol/L)', subLabel: 'Urea máu tăng do hấp thu máu trong ống tiêu hóa', points: 2, type: 'boolean', category: 'lab' },
      { id: 'hb_low_male', label: 'Hb giảm ở nam (< 120 g/L)', subLabel: 'Hb < 120 g/L (1 điểm) hoặc < 100 g/L (3 điểm)', points: 1, type: 'boolean', category: 'lab' },
      { id: 'hb_low_female', label: 'Hb giảm ở nữ (< 100 g/L)', subLabel: 'Hb < 100 g/L (1 điểm)', points: 1, type: 'boolean', category: 'lab' },
      { id: 'sbp_low', label: 'Huyết áp tâm thu < 100 mmHg', subLabel: 'HATT tụt < 100 mmHg (1-2 điểm)', points: 1, type: 'boolean', category: 'vital' },
      { id: 'pulse_high', label: 'Mạch ≥ 100 lần/phút', subLabel: 'Mạch nhanh do mất máu (1 điểm)', points: 1, type: 'boolean', category: 'vital' },
      { id: 'melena', label: 'Đi cầu phân đen', subLabel: 'Phân đen hôi khẳn (1 điểm)', points: 1, type: 'boolean', category: 'clinical' },
      { id: 'syncope', label: 'Ngất / Choáng váng khi đứng', subLabel: 'Triệu chứng tụt huyết áp tư thế (2 điểm)', points: 2, type: 'boolean', category: 'clinical' },
      { id: 'hepatic_disease', label: 'Bệnh gan mạn tính', subLabel: 'Tiền sử xơ gan, viêm gan mạn (2 điểm)', points: 2, type: 'boolean', category: 'history' },
      { id: 'heart_failure', label: 'Suy tim', subLabel: 'Tiền sử suy tim sung huyết (2 điểm)', points: 2, type: 'boolean', category: 'history' },
    ],
    riskTiers: [
      { minScore: 0, maxScore: 0, tierName: 'GBS = 0 (Nguy cơ cực thấp)', urgencyLevel: 'LOW', color: '#10b981', mortalityRate: '< 0.5%', clinicalAction: 'Bệnh nhân có thể xuất viện an toàn không cần nhập viện cấp cứu, hẹn nội soi tiêu hóa theo lịch ngoại trú.', disposition: 'Ngoại trú' },
      { minScore: 1, maxScore: 5, tierName: 'GBS 1 - 5 (Nguy cơ trung bình)', urgencyLevel: 'MEDIUM', color: '#f59e0b', mortalityRate: 'Cần can thiệp ~ 15%', clinicalAction: 'Nhập viện khoa Tiêu hóa. Bắt đầu truyền dịch, ức chế bơm proton PPI liều cao, sắp xếp nội soi trong vòng 24 giờ.', disposition: 'Khoa Tiêu Hóa' },
      { minScore: 6, maxScore: 23, tierName: 'GBS ≥ 6 (Nguy cơ cao / Cần can thiệp tích cực)', urgencyLevel: 'CRITICAL', color: '#ef4444', mortalityRate: 'Cần can thiệp > 50%', clinicalAction: 'Báo động xuất huyết tiêu hóa nặng! Lập 2 đường truyền tĩnh mạch lớn, xét nghiệm nhóm máu và dự trù hồng cầu lắng, nội soi dạ dày can thiệp khẩn cấp trong vòng 12 giờ.', disposition: 'Khoa Cấp Cứu / Hồi Sức' },
    ],
    calculate: (inputs) => {
      let totalScore = 0;
      const breakdown: { label: string; points: number }[] = [];
      const tool = SCORING_TOOLS_REGISTRY.glasgow_blatchford;
      tool.components.forEach(comp => {
        if (inputs[comp.id]) {
          totalScore += comp.points;
          breakdown.push({ label: comp.label, points: comp.points });
        }
      });
      const matchedTier = tool.riskTiers.find(t => totalScore >= t.minScore && totalScore <= t.maxScore) || tool.riskTiers[2];
      return { totalScore, matchedTier, breakdown };
    }
  }
};

/**
 * Tra cứu công cụ thang điểm theo ID
 */
export function getScoringToolById(id: string): ScoringTool | undefined {
  return SCORING_TOOLS_REGISTRY[id];
}

/**
 * Tìm các thang điểm liên quan đến một bệnh lý cụ thể
 */
export function getScoringToolsForDisease(diseaseId: string): ScoringTool[] {
  return Object.values(SCORING_TOOLS_REGISTRY).filter(tool =>
    tool.relatedDiseases.includes(diseaseId)
  );
}
