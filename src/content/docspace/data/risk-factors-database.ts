/**
 * CliniPortal DocSpace — Risk Factors Database
 * Kho Dữ Liệu Yếu Tố Nguy Cơ Bệnh Học Lâm Sàng (Modifiable vs Non-Modifiable)
 * Kết nối phân tầng nguy cơ và phòng ngừa tiên phát/thứ phát cho 30 Bệnh Lý Trọng Tâm
 */

export interface RiskFactorItem {
  id: string;
  name: string;
  type: 'modifiable' | 'non_modifiable'; // Có thể thay đổi được (lối sống, chuyển hóa) vs Không thể thay đổi (tuổi, gen)
  category: 'behavioral' | 'metabolic' | 'genetic' | 'environmental' | 'iatrogenic';
  relativeRisk?: string;                 // Nguy cơ tương đối (VD: RR 2.5, OR 3.2)
  description: string;
  interventionTarget?: string;           // Mục tiêu can thiệp lối sống / dược lý
}

export interface DiseaseRiskProfile {
  diseaseId: string;
  diseaseName: string;
  icdCode: string;
  specialty: string;
  scoringSystem?: string;                // Thang điểm lượng giá nguy cơ (SCORE2, ASCVD, CHA2DS2-VASc, Wells...)
  factors: RiskFactorItem[];
  highRiskThresholdText: string;
  preventivePearls: string;
}

export const DISEASE_RISK_FACTORS_DATABASE: Record<string, DiseaseRiskProfile> = {
  hoi_chung_vanh_cap: {
    diseaseId: 'hoi_chung_vanh_cap',
    diseaseName: 'Hội chứng vành cấp / Nhồi máu cơ tim (ACS)',
    icdCode: 'I21.9',
    specialty: 'Tim Mạch',
    scoringSystem: 'Thang điểm SCORE2 (ESC) / ASCVD 10-year Risk (AHA) / GRACE Score',
    highRiskThresholdText: 'Hút thuốc lá + Tăng huyết áp + ĐTĐ hoặc LDL-C > 4.9 mmol/L xếp nhóm nguy cơ tim mạch rất cao',
    preventivePearls: 'Kiểm soát chặt chẽ LDL-C < 1.4 mmol/L (< 55 mg/dL) sau biến cố vành cấp giúp giảm 22% biến cố tim mạch tái phát.',
    factors: [
      {
        id: 'rf_smoking',
        name: 'Hút thuốc lá, thuốc lào',
        type: 'modifiable',
        category: 'behavioral',
        relativeRisk: 'RR 2.0 – 3.0',
        description: 'Gây tổn thương nội mạc mạch máu, tăng kết tập tiểu cầu và co thắt mạch vành.',
        interventionTarget: 'Cai thuốc lá hoàn toàn, tránh hút thuốc thụ động'
      },
      {
        id: 'rf_dyslipidemia',
        name: 'Rối loạn lipid máu (Tăng LDL-C, Triglyceride)',
        type: 'modifiable',
        category: 'metabolic',
        relativeRisk: 'RR 2.5',
        description: 'Tích tụ lipoprotein gây hình thành mảng xơ vữa trong lòng động mạch vành.',
        interventionTarget: 'LDL-C < 1.4 mmol/L (< 55 mg/dL) bằng Statin cường độ cao + Ezetimibe'
      },
      {
        id: 'rf_hypertension',
        name: 'Tăng huyết áp không kiểm soát',
        type: 'modifiable',
        category: 'metabolic',
        relativeRisk: 'RR 1.8 – 2.2',
        description: 'Gia tăng áp lực cơ học lên thành mạch thúc đẩy nứt vỡ mảng xơ vữa.',
        interventionTarget: 'Huyết áp < 130/80 mmHg'
      },
      {
        id: 'rf_diabetes',
        name: 'Đái tháo đường típ 2',
        type: 'modifiable',
        category: 'metabolic',
        relativeRisk: 'RR 2.0 – 4.0',
        description: 'Bệnh nhân ĐTĐ tương đương nguy cơ đã từng mắc bệnh mạch vành (CAD risk equivalent).',
        interventionTarget: 'HbA1c < 7.0%, ưu tiên dùng SGLT2i hoặc GLP-1 RA'
      },
      {
        id: 'rf_age_male',
        name: 'Tuổi cao (Nam ≥ 45, Nữ ≥ 55)',
        type: 'non_modifiable',
        category: 'genetic',
        relativeRisk: 'RR 1.5 mỗi 10 năm',
        description: 'Lão hóa tự nhiên của hệ tuần hoàn và xơ cứng thành mạch.',
        interventionTarget: 'Tầm soát định kỳ chức năng tim mạch'
      },
      {
        id: 'rf_family_history',
        name: 'Tiền sử gia đình có biến cố tim mạch sớm (Nam < 55, Nữ < 65)',
        type: 'non_modifiable',
        category: 'genetic',
        relativeRisk: 'RR 1.7 – 2.0',
        description: 'Yếu tố di truyền về chuyển hóa lipid và nội mạc thành mạch.',
        interventionTarget: 'Khởi trị statin sớm và tích cực'
      }
    ]
  },
  dot_quy_nao: {
    diseaseId: 'dot_quy_nao',
    diseaseName: 'Đột quỵ não cấp (Nhồi máu não / Xuất huyết não)',
    icdCode: 'I63.9',
    specialty: 'Thần Kinh',
    scoringSystem: 'Thang điểm ABCD2 (tiên lượng sau TIA) / CHA2DS2-VASc (nguy cơ thuyên tắc do rung nhĩ)',
    highRiskThresholdText: 'Rung nhĩ không dùng kháng đông có nguy cơ đột quỵ tăng gấp 5 lần so với người bình thường',
    preventivePearls: 'Kiểm soát tốt huyết áp là biện pháp phòng ngừa đột quỵ hiệu quả nhất ở quy mô dân số.',
    factors: [
      {
        id: 'rf_afib',
        name: 'Rung nhĩ (Atrial Fibrillation)',
        type: 'modifiable',
        category: 'metabolic',
        relativeRisk: 'RR 5.0',
        description: 'Ứ trệ dòng máu tiểu nhĩ trái tạo cục máu đông di chuyển lên gây tắc mạch não lớn.',
        interventionTarget: 'Dùng kháng đông DOACs (Rivaroxaban, Apixaban, Dabigatran)'
      },
      {
        id: 'rf_hypertension_stroke',
        name: 'Tăng huyết áp',
        type: 'modifiable',
        category: 'metabolic',
        relativeRisk: 'RR 3.0 – 4.0',
        description: 'Yếu tố nguy cơ số 1 cho cả nhồi máu não và xuất huyết não tự phát.',
        interventionTarget: 'Hạ HA < 130/80 mmHg'
      },
      {
        id: 'rf_carotid_stenosis',
        name: 'Hẹp động mạch cảnh trong',
        type: 'modifiable',
        category: 'metabolic',
        relativeRisk: 'RR 3.5',
        description: 'Mảng xơ vữa gây hẹp lòng mạch hoặc nứt vỡ bắn mảnh thuyên tắc lên não.',
        interventionTarget: 'Statin cường độ cao, xem xét phẫu thuật bóc nội mạc (CEA) nếu hẹp > 70%'
      }
    ]
  },
  suy_tim: {
    diseaseId: 'suy_tim',
    diseaseName: 'Suy tim cấp & Mạn tính (HF)',
    icdCode: 'I50.9',
    specialty: 'Tim Mạch',
    scoringSystem: 'Phân độ NYHA / Phân giai đoạn AHA Stage A-D',
    highRiskThresholdText: 'Tiền sử NMCT diện rộng hoặc tăng huyết áp lâu năm có nguy cơ cao tiến triển suy tim',
    preventivePearls: 'Khởi trị sớm ức chế SGLT2i ở bệnh nhân ĐTĐ hoặc CKD giúp giảm 30% nguy cơ khởi phát suy tim mới.',
    factors: [
      {
        id: 'rf_cad_post_mi',
        name: 'Tiền sử bệnh động mạch vành / Nhồi máu cơ tim',
        type: 'modifiable',
        category: 'metabolic',
        relativeRisk: 'RR 4.0',
        description: 'Tổn thương hoại tử cơ tim gây tái cấu trúc thất trái và giảm co bóp.',
        interventionTarget: 'Điều trị 4 trụ cột GDMT tối ưu'
      },
      {
        id: 'rf_alcohol_abuse',
        name: 'Lạm dụng rượu bia nặng kéo dài',
        type: 'modifiable',
        category: 'behavioral',
        relativeRisk: 'RR 2.2',
        description: 'Độc tính trực tiếp của cồn gây bệnh cơ tim giãn nở do rượu.',
        interventionTarget: 'Cai rượu bia tuyệt đối (có thể hồi phục một phần chức năng tim)'
      }
    ]
  },
  thuyen_tac_phoi: {
    diseaseId: 'thuyen_tac_phoi',
    diseaseName: 'Thuyên tắc động mạch phổi (PE / DVT)',
    icdCode: 'I26.9',
    specialty: 'Tim Mạch',
    scoringSystem: 'Thang điểm Wells PE / Geneva Score / Thang điểm Padua',
    highRiskThresholdText: 'Sau phẫu thuật chỉnh hình lớn (thay khớp) hoặc ung thư tiến triển',
    preventivePearls: 'Dự phòng huyết khối bằng Enoxaparin hoặc DOACs sau phẫu thuật lớn làm giảm > 60% biến cố PE tử vong.',
    factors: [
      {
        id: 'rf_immobilization',
        name: 'Nằm bất động > 3 ngày / Chuyến bay đường dài > 6h',
        type: 'modifiable',
        category: 'behavioral',
        relativeRisk: 'RR 3.0',
        description: 'Ứ trệ tuần hoàn tĩnh mạch sâu chi dưới (Tam chứng Virchow).',
        interventionTarget: 'Vận động sớm, mang tất áp lực y khoa, uống đủ nước'
      },
      {
        id: 'rf_active_cancer',
        name: 'Bệnh lý ác tính đang tiến triển',
        type: 'non_modifiable',
        category: 'genetic',
        relativeRisk: 'RR 4.0 – 6.0',
        description: 'Khối u tiết các chất kích hoạt đông máu và chèn ép hệ tĩnh mạch.',
        interventionTarget: 'Dự phòng kháng đông trọng lượng phân tử thấp (LMWH)'
      },
      {
        id: 'rf_estrogen_therapy',
        name: 'Dùng thuốc tránh thai phối hợp chứa Estrogen / Liệu pháp HRT',
        type: 'modifiable',
        category: 'iatrogenic',
        relativeRisk: 'RR 2.0 – 4.0',
        description: 'Estrogen kích thích gan tổng hợp các yếu tố đông máu.',
        interventionTarget: 'Chuyển sang biện pháp tránh thai chỉ có Progestin hoặc dụng cụ tử cung'
      }
    ]
  },
  xo_gan: {
    diseaseId: 'xo_gan',
    diseaseName: 'Xơ gan & Bệnh gan mạn tính',
    icdCode: 'K74.6',
    specialty: 'Tiêu Hóa & Gan Mật',
    scoringSystem: 'Thang điểm Child-Pugh (A/B/C) / Thang điểm MELD-Na',
    highRiskThresholdText: 'Uống rượu > 60g cồn/ngày ở nam (> 40g ở nữ) hoặc nhiễm virus viêm gan B/C chưa điều trị',
    preventivePearls: 'Tiêm phòng vaccine Viêm gan B phổ cập cho trẻ sơ sinh là chiến lược loại trừ xơ gan và K gan bền vững nhất.',
    factors: [
      {
        id: 'rf_hbv_hcv',
        name: 'Nhiễm virus Viêm gan B hoặc Viêm gan C mạn tính',
        type: 'modifiable',
        category: 'environmental',
        relativeRisk: 'RR 10.0 – 20.0',
        description: 'Phản ứng viêm mạn tính phá hủy tế bào gan và kích hoạt tế bào hình sao tạo mô xơ.',
        interventionTarget: 'Thuốc kháng virus Tenofovir (TDF/TAF) hoặc Sofosbuvir/Velpatasvir'
      },
      {
        id: 'rf_alcohol_cirrhosis',
        name: 'Uống rượu bia mức độ gây hại kéo dài (> 5 năm)',
        type: 'modifiable',
        category: 'behavioral',
        relativeRisk: 'RR 5.0 – 10.0',
        description: 'Chuyển hóa ethanol tạo Acetaldehyde gây độc gan và stress oxy hóa.',
        interventionTarget: 'Ngưng rượu hoàn toàn'
      },
      {
        id: 'rf_masld',
        name: 'Gan nhiễm mỡ liên quan rối loạn chuyển hóa (MASLD / NASH)',
        type: 'modifiable',
        category: 'metabolic',
        relativeRisk: 'RR 3.0',
        description: 'Tích tụ mỡ gây viêm gan thoái hóa mỡ tiến triển thành xơ gan.',
        interventionTarget: 'Giảm 7-10% trọng lượng cơ thể, tập thể dục thường xuyên'
      }
    ]
  }
};

/**
 * Lấy hồ sơ yếu tố nguy cơ của một bệnh lý
 */
export function getRiskFactorsForDisease(diseaseId: string): DiseaseRiskProfile | undefined {
  return DISEASE_RISK_FACTORS_DATABASE[diseaseId];
}
