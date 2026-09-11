/**
 * CliniPortal DocSpace — Drug Reference & Clinical Interaction Database
 * Kho Dược Thư Lâm Sàng, Chỉnh Liều Theo eGFR / Child-Pugh & Kiểm Tra Tương Tác Thuốc (Kho DUOC)
 * Hỗ trợ bác sĩ rà soát an toàn kê đơn, chống chỉ định và chỉnh liều tự động tại giường bệnh (CDSS)
 */

export type InteractionSeverity = 'contraindicated' | 'major' | 'moderate' | 'minor';

export interface DrugInteraction {
  interactingDrugId: string;
  interactingDrugName: string;
  severity: InteractionSeverity;
  effect: string;
  mechanism: string;
  management: string; // Khuyến cáo xử trí lâm sàng
}

export interface RenalDoseAdjustment {
  egfrThreshold: number; // Ngưỡng eGFR (mL/min/1.73m²)
  recommendation: string; // Liều khuyến cáo hoặc Chống chỉ định
  status: 'normal' | 'reduce_dose' | 'monitor_closely' | 'caution' | 'contraindicated';
}

export interface HepaticDoseAdjustment {
  childPughClass: 'A' | 'B' | 'C';
  recommendation: string;
  status: 'normal' | 'caution' | 'monitor_closely' | 'reduce_dose' | 'contraindicated';
}

export interface ClinicalDrug {
  id: string;
  genericName: string;
  brandNames: string[];
  drugClass: string;
  specialties: string[];
  standardDose: string;
  route: string;
  indicationSummary: string;
  blackboxWarnings?: string[];
  monitoringParameters: string[];
  renalAdjustments: RenalDoseAdjustment[];
  hepaticAdjustments: HepaticDoseAdjustment[];
  interactions: DrugInteraction[];
  pearls: string;
}

export const DRUG_DATABASE: Record<string, ClinicalDrug> = {
  // ─── 1. DAPAGLIFLOZIN (SGLT2i) ─────────────────────────────────────────
  dapagliflozin: {
    id: 'dapagliflozin',
    genericName: 'Dapagliflozin',
    brandNames: ['Forxiga', 'Farxiga'],
    drugClass: 'Thuốc ức chế SGLT2 (SGLT2 Inhibitor)',
    specialties: ['Tim Mạch', 'Nội Tiết', 'Thận Học'],
    standardDose: '10 mg x 1 lần/ngày vào buổi sáng',
    route: 'Uống (Oral)',
    indicationSummary: 'Suy tim (HFrEF, HFmrEF, HFpEF), Bệnh thận mạn (CKD có albumin niệu), Đái tháo đường típ 2',
    blackboxWarnings: [
      'Nguy cơ Nhiễm toan ceton đái tháo đường thể đường huyết bình thường (Euglycemic DKA)',
      'Viêm mô hoại tử vùng đáy chậu (Hội chứng Fournier - hoại thư sinh dục)'
    ],
    monitoringParameters: ['eGFR định kỳ', 'Dấu hiệu toan ceton (buồn nôn, đau bụng, thở Kussmaul)', 'Nhiễm trùng tiểu và nấm sinh dục'],
    renalAdjustments: [
      { egfrThreshold: 25, recommendation: 'eGFR ≥ 25 mL/phút: Dùng liều chuẩn 10 mg/ngày. Không cần chỉnh liều.', status: 'normal' },
      { egfrThreshold: 20, recommendation: 'eGFR 20 - 24 mL/phút: Có thể tiếp tục 10 mg/ngày nếu đã khởi trị từ trước để bảo vệ tim - thận.', status: 'monitor_closely' },
      { egfrThreshold: 0, recommendation: 'eGFR < 20 mL/phút hoặc đang lọc máu nhân tạo: Không khuyến cáo khởi đầu điều trị mới.', status: 'contraindicated' }
    ],
    hepaticAdjustments: [
      { childPughClass: 'A', recommendation: 'Child-Pugh A: Dùng liều thông thường 10 mg/ngày', status: 'normal' },
      { childPughClass: 'B', recommendation: 'Child-Pugh B: Khởi đầu 5 mg/ngày, tăng lên 10 mg nếu dung nạp tốt', status: 'caution' },
      { childPughClass: 'C', recommendation: 'Child-Pugh C (Suy gan nặng): Thận trọng, cân nhắc lợi ích - nguy cơ', status: 'caution' }
    ],
    interactions: [
      {
        interactingDrugId: 'furosemide',
        interactingDrugName: 'Furosemide / Thuốc lợi tiểu quai',
        severity: 'moderate',
        effect: 'Tăng nguy cơ tụt huyết áp thể tích và suy thận cấp trước thận do hiệp đồng bài niệu thẩm thấu.',
        mechanism: 'SGLT2i gây bài niệu thẩm thấu glucose kết hợp lợi tiểu quai làm giảm thể tích tuần hoàn hiệu dụng.',
        management: 'Theo dõi sát huyết áp và cân nặng; có thể cần giảm tạm thời liều Furosemide khi khởi đầu Dapagliflozin.'
      },
      {
        interactingDrugId: 'insulin',
        interactingDrugName: 'Insulin / Sulfonylureas (Gliclazide)',
        severity: 'moderate',
        effect: 'Tăng nguy cơ hạ đường huyết quá mức.',
        mechanism: 'Dapagliflozin hạ đường huyết phụ thuộc lọc cầu thận, phối hợp thuốc kích thích tiết insulin làm tụt glucose đột ngột.',
        management: 'Chủ động giảm 20 - 50% liều Insulin hoặc giảm liều Sulfonylurea khi phối hợp.'
      }
    ],
    pearls: 'Tụt eGFR nhẹ ban đầu (khoảng 3-5 mL/min trong 2-4 tuần đầu) là phản ứng sinh lý do phục hồi phản hồi ống cầu thận (TGF), KHÔNG ĐƯỢC NGƯNG THUỐC trừ khi tụt > 30%.'
  },

  // ─── 2. BISOPROLOL (BETA-BLOCKER) ───────────────────────────────────────
  bisoprolol: {
    id: 'bisoprolol',
    genericName: 'Bisoprolol Fumarate',
    brandNames: ['Concor', 'Bisostad'],
    drugClass: 'Thuốc chẹn chọn lọc thụ thể Beta-1 adrenergic',
    specialties: ['Tim Mạch'],
    standardDose: 'Khởi đầu 1.25 mg/ngày, tăng dần mỗi 2-4 tuần đến đích 10 mg/ngày',
    route: 'Uống (Oral)',
    indicationSummary: 'Suy tim HFrEF ổn định, Tăng huyết áp, Đau thắt ngực mạn, Kiểm soát tần số thất trong Rung nhĩ',
    blackboxWarnings: ['Tuyệt đối không ngưng thuốc đột ngột vì có thể gây bùng phát cơn đau thắt ngực, loạn nhịp thất hoặc NMCT cấp.'],
    monitoringParameters: ['Tần số tim (duy trì 55-60 bpm lúc nghỉ)', 'Huyết áp', 'Dấu hiệu sung huyết / ứ dịch xấu đi'],
    renalAdjustments: [
      { egfrThreshold: 20, recommendation: 'eGFR ≥ 20 mL/phút: Dùng liều thông thường', status: 'normal' },
      { egfrThreshold: 0, recommendation: 'eGFR < 20 mL/phút: Liều tối đa không quá 10 mg/ngày; khởi đầu thận trọng 1.25 mg/ngày', status: 'reduce_dose' }
    ],
    hepaticAdjustments: [
      { childPughClass: 'A', recommendation: 'Child-Pugh A: Liều thông thường', status: 'normal' },
      { childPughClass: 'B', recommendation: 'Child-Pugh B: Dò liều thận trọng', status: 'caution' },
      { childPughClass: 'C', recommendation: 'Child-Pugh C: Liều tối đa không quá 10 mg/ngày do giảm chuyển hóa qua gan', status: 'caution' }
    ],
    interactions: [
      {
        interactingDrugId: 'amiodarone',
        interactingDrugName: 'Amiodarone',
        severity: 'major',
        effect: 'Nguy cơ chậm nhịp tim kịch phát, block nhĩ thất độ cao hoặc ngừng xoang.',
        mechanism: 'Tác dụng hiệp đồng ức chế dẫn truyền nút xoang và nút nhĩ thất (AV node).',
        management: 'Theo dõi ECG liên tục; chỉnh liều cả hai thuốc; chuẩn bị sẵn Atropine hoặc máy tạo nhịp nếu cần.'
      },
      {
        interactingDrugId: 'verapamil_diltiazem',
        interactingDrugName: 'Verapamil / Diltiazem (Non-DHP CCB)',
        severity: 'contraindicated',
        effect: 'Tụt huyết áp nặng, block AV hoàn toàn, ức chế co bóp cơ tim dẫn đến suy tim cấp.',
        mechanism: 'Cùng ức chế mạnh inotropic âm tính và dromotropic âm tính.',
        management: 'Chống chỉ định phối hợp Bisoprolol với Verapamil hoặc Diltiazem IV trong suy tim.'
      }
    ],
    pearls: 'Chỉ khởi trị khi suy tim đã ổn định (không còn ứ dịch cấp). Quy tắc: "Start low, go slow" (Khởi đầu liều thấp, tăng liều chậm rãi).'
  },

  // ─── 3. PERINDOPRIL (ACE INHIBITOR) ────────────────────────────────────
  perindopril: {
    id: 'perindopril',
    genericName: 'Perindopril Arginine / Tert-butylamine',
    brandNames: ['Coversyl', 'Coveram (phối hợp Amlodipine)'],
    drugClass: 'Thuốc ức chế men chuyển Angiotensin (ACEi)',
    specialties: ['Tim Mạch', 'Thận Học'],
    standardDose: '2.5 - 5 mg/ngày, có thể tăng đến 10 mg/ngày',
    route: 'Uống (Oral)',
    indicationSummary: 'Tăng huyết áp, Suy tim sung huyết, Bệnh mạch vành ổn định (EUROPA trial), Đạm niệu đái tháo đường',
    blackboxWarnings: [
      'Độc tính trên thai nhi (Gây quái thai, suy thận thai nhi) — Chống chỉ định tuyệt đối trong thai kỳ!',
      'Phù mạch thần kinh (Angioedema) nguy hiểm tính mạng'
    ],
    monitoringParameters: ['Kali máu (nguy cơ tăng Kali)', 'Creatinine máu / eGFR (tăng ≤ 30% chấp nhận được)', 'Ho khan khan tiếng'],
    renalAdjustments: [
      { egfrThreshold: 60, recommendation: 'eGFR ≥ 60 mL/phút: Liều 5 - 10 mg/ngày', status: 'normal' },
      { egfrThreshold: 30, recommendation: 'eGFR 30 - 59 mL/phút: Khởi đầu 2.5 mg/ngày, tối đa 5 mg/ngày', status: 'reduce_dose' },
      { egfrThreshold: 15, recommendation: 'eGFR 15 - 29 mL/phút: 2.5 mg mỗi 2 ngày một lần', status: 'reduce_dose' },
      { egfrThreshold: 0, recommendation: 'eGFR < 15 mL/phút hoặc chạy thận: 2.5 mg vào ngày lọc máu', status: 'monitor_closely' }
    ],
    hepaticAdjustments: [
      { childPughClass: 'A', recommendation: 'Child-Pugh A/B: Không cần chỉnh liều', status: 'normal' },
      { childPughClass: 'B', recommendation: 'Child-Pugh B: Dung nạp tốt', status: 'normal' },
      { childPughClass: 'C', recommendation: 'Child-Pugh C: Chuyển đổi Perindopril thành Perindoprilat hoạt tính có thể chậm hơn', status: 'caution' }
    ],
    interactions: [
      {
        interactingDrugId: 'spironolactone',
        interactingDrugName: 'Spironolactone / Thuốc giữ Kali',
        severity: 'major',
        effect: 'Tăng Kali máu ác tính (Hyperkalemia > 6.0 mmol/L) gây rối loạn nhịp thất.',
        mechanism: 'Cùng ức chế trục RAA làm giảm đào thải K+ qua ống lượn xa.',
        management: 'Bắt buộc kiểm tra Kali huyết thanh và Creatinine trước khi phối hợp, sau 1 tuần, 1 tháng và mỗi 3-6 tháng sau đó.'
      },
      {
        interactingDrugId: 'sacubitril_valsartan',
        interactingDrugName: 'Sacubitril/Valsartan (ARNI)',
        severity: 'contraindicated',
        effect: 'Tăng nguy cơ phù mạch dị ứng nặng đe dọa tắc thở (Angioedema).',
        mechanism: 'Ức chế đồng thời enzyme ACE và Neprilysin làm tăng tích tụ Bradykinin mô.',
        management: 'Bắt buộc nghỉ (Wash-out) ít nhất 36 GIỜ sau liều Perindopril cuối cùng mới được uống liều ARNI đầu tiên!'
      }
    ],
    pearls: 'Nếu bệnh nhân xuất hiện ho khan kéo dài do tích tụ bradykinin (khoảng 10-15%), chuyển sang nhóm ức chế thụ thể ARB (Losartan, Telmisartan).'
  },

  // ─── 4. SPIRONOLACTONE (MRA) ───────────────────────────────────────────
  spironolactone: {
    id: 'spironolactone',
    genericName: 'Spironolactone',
    brandNames: ['Aldactone', 'Verospiron'],
    drugClass: 'Thuốc đối kháng thụ thể Mineralocorticoid (MRA) / Lợi tiểu giữ Kali',
    specialties: ['Tim Mạch', 'Tiêu Hóa - Gan Mật', 'Thận Học'],
    standardDose: 'Suy tim: 25 - 50 mg/ngày | Xơ gan cổ trướng: 100 - 400 mg/ngày (tỷ lệ 100mg Spirono : 40mg Furosemide)',
    route: 'Uống (Oral)',
    indicationSummary: 'Suy tim HFrEF (RALES trial), Tăng huyết áp kháng trị, Xơ gan báng bụng, Cường Aldosterone tiên phát',
    blackboxWarnings: ['Tăng Kali máu đe dọa tính mạng khi phối hợp thuốc ức chế men chuyển hoặc ở bệnh nhân suy thận nặng.'],
    monitoringParameters: ['Kali máu (ngưng nếu K > 5.5 mmol/L)', 'Creatinine máu (ngưng nếu Creatinine > 220 µmol/L hoặc eGFR < 30)', 'Nữ hóa tuyến vú ở nam giới'],
    renalAdjustments: [
      { egfrThreshold: 50, recommendation: 'eGFR ≥ 50 mL/phút: Liều khởi đầu 25 mg/ngày', status: 'normal' },
      { egfrThreshold: 30, recommendation: 'eGFR 30 - 49 mL/phút: Khởi đầu 12.5 - 25 mg uống cách ngày hoặc 12.5 mg/ngày', status: 'reduce_dose' },
      { egfrThreshold: 0, recommendation: 'eGFR < 30 mL/phút hoặc Kali > 5.0 mmol/L: CHỐNG CHỈ ĐỊNH KHỞI TRỊ', status: 'contraindicated' }
    ],
    hepaticAdjustments: [
      { childPughClass: 'A', recommendation: 'Child-Pugh A: 50 - 100 mg/ngày', status: 'normal' },
      { childPughClass: 'B', recommendation: 'Child-Pugh B: 100 - 200 mg/ngày để kiểm soát báng', status: 'normal' },
      { childPughClass: 'C', recommendation: 'Child-Pugh C: Dò liều thận trọng từ 100mg, tăng dần mỗi 3-5 ngày, tránh hạ Natri và bệnh não gan', status: 'monitor_closely' }
    ],
    interactions: [
      {
        interactingDrugId: 'potassium_supplements',
        interactingDrugName: 'Kali Clorid (Kaleorid) / Thực phẩm bổ sung Kali',
        severity: 'contraindicated',
        effect: 'Tăng Kali máu nặng cấp tính, rung thất hoặc ngừng tim.',
        mechanism: 'Bổ sung ngoại sinh trong khi thận bị ức chế bài xuất K+.',
        management: 'Không bao giờ kê đơn Kali kèm Spironolactone trừ trường hợp hạ Kali kháng trị được theo dõi tại ICU.'
      }
    ],
    pearls: 'Trong xơ gan cổ trướng, tỷ lệ vàng kinh điển là 100 mg Spironolactone : 40 mg Furosemide để duy trì nồng độ Kali máu bình thường.'
  },

  // ─── 5. FUROSEMIDE (LOOP DIURETIC) ─────────────────────────────────────
  furosemide: {
    id: 'furosemide',
    genericName: 'Furosemide',
    brandNames: ['Lasix'],
    drugClass: 'Thuốc lợi tiểu quai (Loop Diuretic)',
    specialties: ['Tim Mạch', 'Hồi Sức - Cấp Cứu', 'Thận Học'],
    standardDose: 'Nội trú cấp cứu: 20 - 40 mg IV tiêm chậm | Ngoại trú: 20 - 80 mg/ngày uống',
    route: 'Uống / Tiêm tĩnh mạch (PO / IV)',
    indicationSummary: 'Phù phổi cấp, Đợt cấp suy tim ứ huyết, Phù do hội chứng thận hư hoặc xơ gan, Tăng huyết áp khẩn cấp',
    monitoringParameters: ['Điện giải đồ (Hạ Kali, hạ Natri, hạ Magie)', 'BUN / Creatinine', 'Lượng nước tiểu 24h', 'Thính lực (độc tính tai nếu tiêm IV nhanh liều cao)'],
    renalAdjustments: [
      { egfrThreshold: 30, recommendation: 'eGFR ≥ 30 mL/phút: Liều thông thường', status: 'normal' },
      { egfrThreshold: 0, recommendation: 'eGFR < 30 mL/phút hoặc suy thận nặng: Cần liều cao hơn (80 - 240 mg/ngày) do giảm bài tiết thuốc vào lòng ống thận', status: 'normal' }
    ],
    hepaticAdjustments: [
      { childPughClass: 'A', recommendation: 'Child-Pugh A: Liều thông thường', status: 'normal' },
      { childPughClass: 'B', recommendation: 'Child-Pugh B: Phối hợp Spironolactone', status: 'monitor_closely' },
      { childPughClass: 'C', recommendation: 'Child-Pugh C: Dùng quá mức có thể thúc đẩy Hội chứng gan thận (HRS) hoặc Bệnh não gan', status: 'caution' }
    ],
    interactions: [
      {
        interactingDrugId: 'vancomycin',
        interactingDrugName: 'Vancomycin / Aminoglycoside (Gentamicin)',
        severity: 'major',
        effect: 'Tăng mạnh độc tính trên thính giác (Điếc vĩnh viễn) và độc tính trên thận (AKI).',
        mechanism: 'Tác dụng hiệp đồng phá hủy tế bào lông ốc tai và hoại tử ống thận cấp.',
        management: 'Tránh tiêm Furosemide nhanh; truyền IV chậm ≤ 4 mg/phút; theo dõi nồng độ đáy Vancomycin và thính lực.'
      }
    ],
    pearls: 'Khả dụng sinh học đường uống của Furosemide chỉ khoảng 50% (Quy tắc chuyển đổi: 40 mg PO ≈ 20 mg IV).'
  },

  // ─── 6. ATORVASTATIN (STATIN) ──────────────────────────────────────────
  atorvastatin: {
    id: 'atorvastatin',
    genericName: 'Atorvastatin Calcium',
    brandNames: ['Lipitor', 'Atorlip'],
    drugClass: 'Thuốc hạ lipid máu nhóm ức chế HMG-CoA Reductase (Statin)',
    specialties: ['Tim Mạch', 'Nội Tiết', 'Thần Kinh'],
    standardDose: 'Liều cao (High-intensity): 40 - 80 mg/ngày | Liều trung bình: 10 - 20 mg/ngày',
    route: 'Uống (Oral)',
    indicationSummary: 'Hội chứng vành cấp (ACS), Phòng ngừa tiên phát và thứ phát biến cố tim mạch xơ vữa (ASCVD), Đột quỵ thiếu máu não',
    monitoringParameters: ['Men gan ALT/AST (trước điều trị)', 'Lipid máu toàn phần sau 4-12 tuần', 'CK máu nếu có đau cơ hoặc yếu cơ'],
    renalAdjustments: [
      { egfrThreshold: 0, recommendation: 'Mọi mức eGFR (kể cả lọc máu): Không cần chỉnh liều vì thuốc đào thải chủ yếu qua mật và phân.', status: 'normal' }
    ],
    hepaticAdjustments: [
      { childPughClass: 'A', recommendation: 'Child-Pugh A: Thận trọng, bắt đầu liều thấp', status: 'caution' },
      { childPughClass: 'B', recommendation: 'Child-Pugh B: Bệnh gan đang hoạt động hoặc tăng men gan kéo dài > 3x GHBT: CHỐNG CHỈ ĐỊNH', status: 'contraindicated' },
      { childPughClass: 'C', recommendation: 'Child-Pugh C: Chống chỉ định tuyệt đối', status: 'contraindicated' }
    ],
    interactions: [
      {
        interactingDrugId: 'amiodarone',
        interactingDrugName: 'Amiodarone / Clarithromycin / Diltiazem',
        severity: 'major',
        effect: 'Tăng nồng độ Atorvastatin huyết tương, tăng nguy cơ viêm cơ và tiêu cơ vân cấp (Rhabdomyolysis).',
        mechanism: 'Ức chế mạnh enzym chuyển hóa Cytochrome P450 3A4 (CYP3A4).',
        management: 'Liều Atorvastatin không nên vượt quá 20 mg/ngày khi dùng đồng thời với Amiodarone. Theo dõi đau cơ và CK máu.'
      }
    ],
    pearls: 'Bệnh nhân Hội chứng vành cấp (ACS) cần khởi động ngay Statin cường độ cao (Atorvastatin 80mg hoặc Rosuvastatin 40mg) bất kể mức LDL-C ban đầu.'
  },

  // ─── 7. APIXABAN (DOAC) ────────────────────────────────────────────────
  apixaban: {
    id: 'apixaban',
    genericName: 'Apixaban',
    brandNames: ['Eliquis'],
    drugClass: 'Thuốc chống đông đường uống ức chế trực tiếp yếu tố Xa (DOAC)',
    specialties: ['Tim Mạch', 'Huyết Học', 'Hô Hấp'],
    standardDose: 'Rung nhĩ: 5 mg x 2 lần/ngày (Giảm xuống 2.5 mg x 2 lần/ngày nếu có ≥ 2 trong 3 tiêu chuẩn: Tuổi ≥ 80, Cân nặng ≤ 60kg, Creatinine ≥ 133 µmol/L)',
    route: 'Uống (Oral)',
    indicationSummary: 'Dự phòng đột quỵ trong Rung nhĩ không do van tim, Điều trị và dự phòng tái phát DVT và Thuyên tắc phổi (PE)',
    monitoringParameters: ['Dấu hiệu xuất huyết', 'Creatinine máu / eGFR tính bằng Cockcroft-Gault', 'Hemoglobin định kỳ'],
    renalAdjustments: [
      { egfrThreshold: 30, recommendation: 'CrCl ≥ 30 mL/phút: 5 mg x 2 lần/ngày (hoặc 2.5mg nếu đủ tiêu chí ABC)', status: 'normal' },
      { egfrThreshold: 15, recommendation: 'CrCl 15 - 29 mL/phút: Dùng liều giảm 2.5 mg x 2 lần/ngày', status: 'reduce_dose' },
      { egfrThreshold: 0, recommendation: 'CrCl < 15 mL/phút hoặc đang lọc máu: Không khuyến cáo tại Châu Âu (FDA cho phép liều 2.5mg/5mg với thận trọng)', status: 'caution' }
    ],
    hepaticAdjustments: [
      { childPughClass: 'A', recommendation: 'Child-Pugh A: Dùng liều thông thường', status: 'normal' },
      { childPughClass: 'B', recommendation: 'Child-Pugh B: Dùng thận trọng', status: 'caution' },
      { childPughClass: 'C', recommendation: 'Child-Pugh C (Xơ gan mất bù): Chống chỉ định do tăng nguy cơ chảy máu', status: 'contraindicated' }
    ],
    interactions: [
      {
        interactingDrugId: 'antiplatelet',
        interactingDrugName: 'Aspirin / Clopidogrel / Ticagrelor',
        severity: 'major',
        effect: 'Tăng gấp 2-3 lần nguy cơ xuất huyết tiêu hóa lớn hoặc xuất huyết nội sọ.',
        mechanism: 'Hiệp đồng tác dụng chống đông dòng thác và ức chế nút thắt tiểu cầu.',
        management: 'Chỉ phối hợp trong thời gian tối thiểu được chỉ định (liệu pháp bộ đôi sau PCI); ngưng Aspirin sớm nhất có thể.'
      }
    ],
    pearls: 'Apixaban là DOAC có tỷ lệ xuất huyết tiêu hóa thấp nhất và an toàn nhất trên chức năng thận trong các DOACs.'
  },

  // ─── 8. ENOXAPARIN (LMWH) ──────────────────────────────────────────────
  enoxaparin: {
    id: 'enoxaparin',
    genericName: 'Enoxaparin Sodium',
    brandNames: ['Lovenox'],
    drugClass: 'Heparin trọng lượng phân tử thấp (LMWH)',
    specialties: ['Tim Mạch', 'Hồi Sức - Cấp Cứu', 'Hô Hấp'],
    standardDose: 'Liều điều trị: 1 mg/kg tiêm dưới da mỗi 12 giờ (hoặc 1.5 mg/kg mỗi 24 giờ) | Liều dự phòng VTE: 40 mg SC mỗi 24 giờ',
    route: 'Tiêm dưới da (Subcutaneous - SC) hoặc Tiêm IV bolus trong STEMI',
    indicationSummary: 'Hội chứng vành cấp (STEMI / NSTEMI), Điều trị DVT / Thuyên tắc phổi cấp, Dự phòng thuyên tắc huyết khối ngoại khoa/nội khoa',
    monitoringParameters: ['Số lượng tiểu cầu (sàng lọc giảm tiểu cầu do Heparin - HIT)', 'Chức năng thận eGFR', 'Hoạt tính kháng yếu tố Xa (Anti-Xa) ở người béo phì hoặc suy thận'],
    renalAdjustments: [
      { egfrThreshold: 30, recommendation: 'CrCl ≥ 30 mL/phút: 1 mg/kg SC mỗi 12 giờ', status: 'normal' },
      { egfrThreshold: 0, recommendation: 'CrCl < 30 mL/phút: GIẢM LIỀU XUỐNG 1 mg/kg SC MỖI 24 GIỜ (hoặc chuyển sang Heparin không phân đoạn UFH)', status: 'reduce_dose' }
    ],
    hepaticAdjustments: [
      { childPughClass: 'A', recommendation: 'Child-Pugh A: Dùng bình thường', status: 'normal' },
      { childPughClass: 'B', recommendation: 'Child-Pugh B: Thận trọng nguy cơ chảy máu do giảm tổng hợp yếu tố đông máu', status: 'caution' },
      { childPughClass: 'C', recommendation: 'Child-Pugh C: Cân nhắc kỹ, theo dõi sát', status: 'caution' }
    ],
    interactions: [
      {
        interactingDrugId: 'doac_oral',
        interactingDrugName: 'Rivaroxaban / Apixaban / Dabigatran',
        severity: 'contraindicated',
        effect: 'Chống chỉ định dùng đồng thời hai thuốc chống đông toàn thân trừ giai đoạn gối đầu chuyển tiếp.',
        mechanism: 'Tê liệt hoàn toàn hệ đông máu gây xuất huyết ồ ạt.',
        management: 'Ngưng Enoxaparin trước khi uống DOAC 0-2 giờ (tại thời điểm liều Enoxaparin tiếp theo).'
      }
    ],
    pearls: 'Tuyệt đối không tiêm bắp (IM) vì gây tụ máu lớn trong cơ. Khi tiêm dưới da bụng, không được xoa vị trí tiêm.'
  },

  // ─── 9. MEROPENEM (CARBAPENEM ANTIBIOTIC) ──────────────────────────────
  meropenem: {
    id: 'meropenem',
    genericName: 'Meropenem',
    brandNames: ['Meronem'],
    drugClass: 'Kháng sinh nhóm Carbapenem phổ siêu rộng',
    specialties: ['Truyền Nhiễm', 'Hồi Sức - Cấp Cứu', 'Hô Hấp'],
    standardDose: 'Nhiễm trùng nặng / Sepsis: 1g IV mỗi 8 giờ (truyền kéo dài 3 giờ để tối ưu %T > MIC) | Viêm màng não: 2g IV mỗi 8 giờ',
    route: 'Tiêm truyền tĩnh mạch (IV infusion)',
    indicationSummary: 'Sốc nhiễm khuẩn, Viêm phổi bệnh viện (HAP/VAP), Nhiễm trùng ổ bụng phức tạp, Viêm màng não mủ do vi khuẩn Gram âm đa kháng ESBL',
    monitoringParameters: ['Chức năng thận eGFR để chỉnh khoảng cách liều', 'Dấu hiệu co giật thần kinh', 'Bạch cầu và đáp ứng lâm sàng'],
    renalAdjustments: [
      { egfrThreshold: 50, recommendation: 'CrCl > 50 mL/phút: 1g mỗi 8 giờ', status: 'normal' },
      { egfrThreshold: 26, recommendation: 'CrCl 26 - 50 mL/phút: 1g mỗi 12 giờ', status: 'reduce_dose' },
      { egfrThreshold: 10, recommendation: 'CrCl 10 - 25 mL/phút: 500 mg mỗi 12 giờ', status: 'reduce_dose' },
      { egfrThreshold: 0, recommendation: 'CrCl < 10 mL/phút: 500 mg mỗi 24 giờ (bổ sung liều sau lọc máu)', status: 'reduce_dose' }
    ],
    hepaticAdjustments: [
      { childPughClass: 'A', recommendation: 'Mọi phân độ: Không cần chỉnh liều do thuốc thải trừ chủ yếu qua thận', status: 'normal' },
      { childPughClass: 'B', recommendation: 'Không cần chỉnh liều', status: 'normal' },
      { childPughClass: 'C', recommendation: 'Không cần chỉnh liều', status: 'normal' }
    ],
    interactions: [
      {
        interactingDrugId: 'valproic_acid',
        interactingDrugName: 'Acid Valproic / Natri Valproate (Depakine)',
        severity: 'contraindicated',
        effect: 'Giảm đột ngột 60-80% nồng độ Acid Valproic máu trong vòng 24 giờ, dẫn đến bùng phát trạng thái động kinh co giật kháng trị.',
        mechanism: 'Carbapenem ức chế enzym acylpeptide hydrolase và tăng liên hợp glucuronide làm đào thải cấp tốc Valproate.',
        management: 'CHỐNG CHỈ ĐỊNH PHỐI HỢP! Nếu bắt buộc dùng Meropenem, phải chuyển thuốc chống động kinh sang Levetiracetam (Keppra).'
      }
    ],
    pearls: 'Chiến lược "Truyền kéo dài 3 giờ" (Extended Infusion) giúp tối đa hóa thời gian nồng độ thuốc tự do trên nồng độ ức chế tối thiểu (%fT > MIC), cải thiện rõ rệt tỷ lệ sống còn trong sốc nhiễm trùng.'
  },

  // ─── 10. METFORMIN (BIGUANIDE) ─────────────────────────────────────────
  metformin: {
    id: 'metformin',
    genericName: 'Metformin Hydrochloride',
    brandNames: ['Glucophage'],
    drugClass: 'Thuốc hạ đường huyết nhóm Biguanide',
    specialties: ['Nội Tiết'],
    standardDose: '500 - 1000 mg x 2 lần/ngày cùng hoặc ngay sau bữa ăn (Tối đa 2000 - 2550 mg/ngày)',
    route: 'Uống (Oral)',
    indicationSummary: 'Thuốc đầu tay điều trị Đái tháo đường típ 2, Hội chứng buồng trứng đa nang (PCOS)',
    blackboxWarnings: ['Nhiễm toan Acid Lactic do Metformin (MALA - Metformin-Associated Lactic Acidosis) hiếm gặp nhưng tỷ lệ tử vong lên tới 50%.'],
    monitoringParameters: ['eGFR định kỳ ít nhất mỗi năm 1 lần (mỗi 3-6 tháng nếu eGFR < 60)', 'Nồng độ Vitamin B12 máu sau điều trị dài hạn'],
    renalAdjustments: [
      { egfrThreshold: 45, recommendation: 'eGFR ≥ 45 mL/phút: Dùng liều đầy đủ tối đa 2000 mg/ngày', status: 'normal' },
      { egfrThreshold: 30, recommendation: 'eGFR 30 - 44 mL/phút: Cân nhắc lợi ích, giảm liều tối đa không quá 1000 mg/ngày. Không khởi trị mới.', status: 'reduce_dose' },
      { egfrThreshold: 0, recommendation: 'eGFR < 30 mL/phút: CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI do nguy cơ tích tụ gây toan Lactic', status: 'contraindicated' }
    ],
    hepaticAdjustments: [
      { childPughClass: 'A', recommendation: 'Child-Pugh A: Dùng thận trọng', status: 'caution' },
      { childPughClass: 'B', recommendation: 'Child-Pugh B/C (Bệnh gan nặng, suy gan): Chống chỉ định do giảm độ thanh thải acid lactic tại gan', status: 'contraindicated' },
      { childPughClass: 'C', recommendation: 'Child-Pugh C: Chống chỉ định tuyệt đối', status: 'contraindicated' }
    ],
    interactions: [
      {
        interactingDrugId: 'iodinated_contrast',
        interactingDrugName: 'Thuốc cản quang chứa Iod (CT Scanner)',
        severity: 'major',
        effect: 'Tăng nguy cơ suy thận cấp do thuốc cản quang dẫn đến tích tụ Metformin và toan lactic.',
        mechanism: 'Thuốc cản quang làm suy giảm tạm thời chức năng lọc cầu thận.',
        management: 'Tạm ngưng Metformin vào thời điểm hoặc trước khi chụp CT cản quang nếu eGFR 30-59 mL/phút. Chỉ dùng lại sau 48 giờ khi xét nghiệm lại chức năng thận ổn định.'
      }
    ],
    pearls: 'Để giảm thiểu tác dụng phụ trên đường tiêu hóa (đầy bụng, tiêu chảy), luôn uống cùng bữa ăn và tăng liều từ từ (500mg/tuần).'
  },

  // ─── 11. NORADRENALINE (VASOPRESSOR) ───────────────────────────────────
  noradrenaline: {
    id: 'noradrenaline',
    genericName: 'Norepinephrine / Noradrenaline',
    brandNames: ['Levophed'],
    drugClass: 'Thuốc vận mạch kích thích mạnh thụ thể Alpha-1 adrenergic',
    specialties: ['Hồi Sức - Cấp Cứu'],
    standardDose: 'Khởi đầu 0.05 - 0.1 µg/kg/phút, chỉnh liều nhanh mỗi 2-5 phút để đạt đích MAP ≥ 65 mmHg',
    route: 'Truyền tĩnh mạch liên tục qua catheter tĩnh mạch trung tâm (CVC)',
    indicationSummary: 'Vận mạch đầu tay số 1 trong Sốc nhiễm khuẩn (Septic Shock) và Sốc tim sau khi đã bù đủ dịch',
    blackboxWarnings: ['Hoại tử mô trầm trọng nếu thoát mạch ra mô dưới da ngoại vi. Cần truyền qua đường truyền trung tâm.'],
    monitoringParameters: ['Huyết áp động mạch xâm lấn (A-line) liên tục', 'Huyết áp động mạch trung bình MAP (đích ≥ 65 mmHg)', 'Lactate máu và độ thanh thải lactate', 'Tưới máu ngoại vi (thời gian đổ đầy mao mạch CRT, vân tím)'],
    renalAdjustments: [
      { egfrThreshold: 0, recommendation: 'Không phụ thuộc chức năng thận. Dùng theo đáp ứng huyết động MAP.', status: 'normal' }
    ],
    hepaticAdjustments: [
      { childPughClass: 'A', recommendation: 'Không chỉnh liều theo chức năng gan.', status: 'normal' },
      { childPughClass: 'B', recommendation: 'Không chỉnh liều theo chức năng gan.', status: 'normal' },
      { childPughClass: 'C', recommendation: 'Không chỉnh liều theo chức năng gan.', status: 'normal' }
    ],
    interactions: [
      {
        interactingDrugId: 'halothane_anesthetics',
        interactingDrugName: 'Thuốc mê bay hơi chứa Halogen',
        severity: 'major',
        effect: 'Tăng nhạy cảm cơ tim gây loạn nhịp thất nặng.',
        mechanism: 'Tương tác với thụ thể beta cơ tim trong tình trạng thiếu oxy.',
        management: 'Theo dõi điện tim liên tục, sẵn sàng thuốc chống loạn nhịp.'
      }
    ],
    pearls: 'Trong sốc nhiễm khuẩn, nếu đã đạt liều Noradrenaline 0.25 µg/kg/phút mà MAP vẫn < 65 mmHg, PHỐI HỢP NGAY Vasopressin liều cố định 0.03 UI/phút.'
  }
};

/**
 * Kiểm tra xung đột tương tác giữa danh sách các thuốc được kê đơn
 */
export function checkDrugInteractions(drugIds: string[]): {
  hasContraindications: boolean;
  totalInteractions: number;
  conflicts: {
    drug1: string;
    drug2: string;
    severity: InteractionSeverity;
    effect: string;
    management: string;
  }[];
} {
  const conflicts: {
    drug1: string;
    drug2: string;
    severity: InteractionSeverity;
    effect: string;
    management: string;
  }[] = [];

  let hasContraindications = false;

  for (let i = 0; i < drugIds.length; i++) {
    const d1 = DRUG_DATABASE[drugIds[i].toLowerCase()];
    if (!d1) continue;

    for (let j = i + 1; j < drugIds.length; j++) {
      const d2Id = drugIds[j].toLowerCase();
      const matchedInteraction = d1.interactions.find(it => it.interactingDrugId.toLowerCase() === d2Id);

      if (matchedInteraction) {
        if (matchedInteraction.severity === 'contraindicated') {
          hasContraindications = true;
        }
        conflicts.push({
          drug1: d1.genericName,
          drug2: matchedInteraction.interactingDrugName,
          severity: matchedInteraction.severity,
          effect: matchedInteraction.effect,
          management: matchedInteraction.management
        });
      }
    }
  }

  return {
    hasContraindications,
    totalInteractions: conflicts.length,
    conflicts
  };
}

/**
 * Lấy hướng dẫn chỉnh liều theo eGFR cho một thuốc cụ thể
 */
export function getRenalDoseAdjustment(drugId: string, egfr: number): RenalDoseAdjustment | undefined {
  const drug = DRUG_DATABASE[drugId.toLowerCase()];
  if (!drug || drug.renalAdjustments.length === 0) return undefined;

  // Sort descending by threshold
  const sorted = [...drug.renalAdjustments].sort((a, b) => b.egfrThreshold - a.egfrThreshold);
  for (const adj of sorted) {
    if (egfr >= adj.egfrThreshold) {
      return adj;
    }
  }
  return sorted[sorted.length - 1];
}
