/**
 * Protocol Registry & Knowledge Engine — MedLens DocSpace
 * Quản lý danh mục phác đồ điều trị mở rộng, cho phép nạp, tra cứu, chỉnh sửa
 * và bổ sung phác đồ mới (Custom Protocols) có lưu trữ cục bộ (LocalStorage).
 * Phục vụ kho phác đồ lớn chuẩn Bộ Y Tế, WHO, Surviving Sepsis, GINA, GOLD.
 */

import { DailyTimelinePhase, TreatmentProblemRow } from './dailyTreatmentTimeline.ts';
import { SeverityGradingItem } from '../../data/diagnostic-criteria-database.ts';

export interface EditableProtocolItem {
  id: string;
  diseaseId: string;
  diseaseName: string;
  icd10: string;
  specialty: string;
  triageLevel: 'outpatient' | 'inpatient' | 'icu';
  organization: string; // "Bộ Y Tế", "WHO", "Surviving Sepsis", "GINA", "GOLD", "Chuyên khoa"
  versionYear: number;
  lastUpdated: string;
  description: string;
  severityGrades?: SeverityGradingItem[];
  timelinePhases: DailyTimelinePhase[];
  cautions: string[];
  contraindications: string[];
  dischargeCriteria: string[];
  isCustom?: boolean; // Phác đồ do người dùng/bác sĩ tự thêm/sửa
}

const CUSTOM_PROTOCOLS_STORAGE_KEY = 'docspace_custom_protocols_v1';

/**
 * Danh mục chuyên khoa chuẩn y khoa
 */
export const CLINICAL_SPECIALTIES = [
  { id: 'all', name: 'Tất cả chuyên khoa' },
  { id: 'nhiem', name: 'Truyền nhiễm & Nhiệt đới' },
  { id: 'icu', name: 'Hồi sức Cấp cứu (ICU/HDU)' },
  { id: 'tieu_hoa', name: 'Tiêu hóa - Gan mật' },
  { id: 'ho_hap', name: 'Hô hấp & Phổi' },
  { id: 'tim_mach', name: 'Tim mạch' },
  { id: 'than_tiet_nieu', name: 'Thận - Lọc máu' },
  { id: 'than_kinh', name: 'Thần kinh' },
  { id: 'noi_tiet', name: 'Nội tiết & Chuyển hóa' },
] as const;

/**
 * Các phác đồ cấp cứu & nội khoa mẫu được thiết kế sẵn theo chuẩn Bộ Y Tế & Quốc tế
 */
export const BUILT_IN_STANDARD_PROTOCOLS: EditableProtocolItem[] = [
  {
    id: 'soc_nhiem_khuan_sepsis',
    diseaseId: 'soc_nhiem_khuan',
    diseaseName: 'Sốc nhiễm khuẩn & Nhiễm khuẩn huyết (Septic Shock)',
    icd10: 'R65.21 / A41.9',
    specialty: 'icu',
    triageLevel: 'icu',
    organization: 'Surviving Sepsis Campaign & Bộ Y Tế',
    versionYear: 2026,
    lastUpdated: '2026-03-15T00:00:00.000Z',
    description: 'Hồi sức giờ đầu (Hour-1 Bundle), bù dịch tinh thể 30 ml/kg, vận mạch sớm Noradrenaline duy trì MAP ≥ 65 mmHg, cấy máu trước kháng sinh phổ rộng IV trong 1h đầu.',
    severityGrades: [
      {
        grade: 'Độ 1: Nhiễm khuẩn huyết (Sepsis)',
        severity: 'moderate',
        criteria: 'Nhiễm trùng kèm tăng điểm SOFA ≥ 2 (hoặc qSOFA ≥ 2: Thở ≥ 22 l/p, Rối loạn tri giác GCS < 15, HATT ≤ 100 mmHg).',
        primaryAction: 'Cấy máu, kháng sinh IV phổ rộng trong 1h, bù dịch 30 ml/kg nếu tụt áp hoặc Lactate ≥ 4 mmol/L.',
        triage: 'inpatient',
      },
      {
        grade: 'Độ 2: Sốc nhiễm khuẩn (Septic Shock)',
        severity: 'critical',
        criteria: 'Nhiễm khuẩn huyết kèm tụt HA dai dẳng cần thuốc vận mạch để duy trì MAP ≥ 65 mmHg VÀ Lactate máu > 2 mmol/L dù đã bù đủ thể tích dịch.',
        primaryAction: 'Hồi sức tích cực ICU, đặt CVC/Art-line, Noradrenaline liều 0.05 - 1.0 mcg/kg/phút, cân nhắc Hydrocortisone nếu kháng vận mạch.',
        triage: 'icu',
      },
    ],
    timelinePhases: [
      {
        id: 'sepsis_phase_1',
        dayRange: 'Giờ 0 - 6',
        phaseName: 'Pha Hồi sức Khẩn cấp Giờ đầu (Hour-1 Bundle & Resuscitation)',
        clinicalGoal: 'Khôi phục tưới máu mô khẩn cấp: MAP ≥ 65 mmHg, Lactate máu giảm > 20% mỗi 2h, nước tiểu ≥ 0.5 ml/kg/h.',
        treatments: [
          {
            category: 'Bù dịch tinh thể',
            content: 'Truyền tinh thể Ringer Lactate 30 ml/kg trong 3 giờ đầu (đánh giá đáp ứng dịch bằng PLR - nâng chân thụ động hoặc siêu âm Vena Cava VCI).',
            isHighlighted: true,
          },
          {
            category: 'Vận mạch sớm',
            content: 'Noradrenaline (Norepinephrine) IV qua bơm tiêm điện/CVC, khởi đầu 0.05 mcg/kg/phút chỉnh liều mỗi 5-10 phút để đạt MAP ≥ 65 mmHg.',
            isHighlighted: true,
          },
          {
            category: 'Kháng sinh phổ rộng',
            content: 'Cấy máu 2 vị trí trước khi dùng thuốc. Tiêm tĩnh mạch kháng sinh phổ rộng liều tấn công trong 1 giờ đầu (VD: Meropenem 1g q8h + Vancomycin 25-30 mg/kg loading).',
            isHighlighted: true,
          },
          {
            category: 'Hỗ trợ vỏ thượng thận',
            content: 'Hydrocortisone 200 mg/ngày (50 mg IV q6h hoặc truyền liên tục) nếu shock trơ cần liều Noradrenaline > 0.25 mcg/kg/phút.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Huyết áp xâm lấn (Art-line), MAP, nhịp tim, nhịp thở, SpO2, tri giác', frequency: 'Liên tục / Mỗi 15-30 phút' },
          { type: 'LS', metric: 'Nước tiểu qua sonde Foley có bình đo theo giờ', frequency: 'Mỗi 1 giờ' },
          { type: 'CLS', metric: 'Khí máu động mạch (ABG), Lactate máu động mạch', frequency: 'Mỗi 2 - 4 giờ cho đến khi bình thường hóa' },
          { type: 'CLS', metric: 'Tổng phân tích tế bào máu, Creatinine, Men gan, Điện giải đồ, Đụng dập đông máu', frequency: 'Mỗi 12 - 24 giờ' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Tránh quá tải dịch dẫn đến phù phổi cấp và ARDS ở bệnh nhân suy tim hoặc bệnh thận mạn.',
            'Không trì hoãn kháng sinh để chờ kết quả cấy máu.',
            'Kiểm soát đường huyết mục tiêu 140 - 180 mg/dL (7.8 - 10.0 mmol/L).',
          ],
          triageOrDischargeCriteria: 'Chỉ chuyển khỏi ICU khi ngừng hoàn toàn vận mạch > 24h, MAP ≥ 65 mmHg ổn định, Lactate < 2.0 mmol/L, ổ nhiễm trùng đã được kiểm soát.',
        },
      },
    ],
    cautions: [
      'Tuyệt đối không dùng Dopamine đầu tay thay thế Noradrenaline (nguy cơ loạn nhịp cao hơn đáng kể).',
      'Đánh giá kiểm soát nguồn nhiễm (Source Control) trong 6 - 12h đầu: dẫn lưu áp xe, tháo bỏ catheter nhiễm trùng, phẫu thuật khẩn nếu thủng tạng rỗng.',
    ],
    contraindications: [
      'Chống chỉ định bù dịch ồ ạt không kiểm soát khi áp lực tĩnh mạch trung tâm hoặc siêu âm tim có dấu hiệu suy tim thất phải / phù phổi cấp.',
    ],
    dischargeCriteria: [
      'Hết sốt liên tục ≥ 48 giờ.',
      'Dừng hoàn toàn vận mạch, huyết động và tưới máu mô ổn định (MAP > 65 mmHg, Lactate máu < 2 mmol/L).',
      'Bạch cầu máu và CRP/PCT có xu hướng giảm rõ rệt.',
      'Tự thở khí phòng, SpO2 ≥ 95%, ăn uống và đi lại được.',
    ],
  },
  {
    id: 'con_hen_phe_quan_cap',
    diseaseId: 'hen_phe_quan_cap',
    diseaseName: 'Cơn hen phế quản cấp (Acute Asthma Exacerbation)',
    icd10: 'J45.9',
    specialty: 'ho_hap',
    triageLevel: 'icu',
    organization: 'GINA & QĐ Bộ Y Tế',
    versionYear: 2026,
    lastUpdated: '2026-03-20T00:00:00.000Z',
    description: 'Xử trí cơn hen phế quản cấp theo mức độ: Thở oxy SpO2 93-95%, SABA khí dung lặp lại kết hợp Ipratropium, Corticosteroid toàn thân sớm, Magnesium Sulfate IV trong cơn nặng.',
    severityGrades: [
      {
        grade: 'Độ 1: Cơn hen nhẹ - trung bình',
        severity: 'moderate',
        criteria: 'Nói từng câu, SpO2 ≥ 92%, mạch 100-120 l/p, PEF 50-80% giá trị dự đoán.',
        primaryAction: 'Khí dung SABA 2.5-5mg mỗi 20 phút x 3 lần đầu, Corticoid uống Prednisolone 1 mg/kg/ngày.',
        triage: 'inpatient',
      },
      {
        grade: 'Độ 2: Cơn hen nặng - Đe dọa tính mạng',
        severity: 'critical',
        criteria: 'Nói từng từ, vã mồ hôi, co kéo cơ hô hấp phụ, SpO2 < 90%, mạch > 120 l/p, phổi im lặng (silent chest), PEF < 50%.',
        primaryAction: 'Thở oxy lưu lượng cao, SABA + SAMA khí dung liên tục, Methylprednisolone 40-80 mg IV, Magnesium sulfate 2g IV trong 20 phút, chuẩn bị đặt nội khí quản nếu kiệt sức hô hấp.',
        triage: 'icu',
      },
    ],
    timelinePhases: [
      {
        id: 'asthma_p1',
        dayRange: 'Giờ 0 - 4',
        phaseName: 'Pha Cắt Cơn Cấp Cứu (Hour 0 - 4 Acute Relief)',
        clinicalGoal: 'Giải phóng co thắt phế quản, đảo ngược tình trạng thiếu oxy mô (SpO2 93-95%), cải thiện lưu lượng đỉnh PEF > 70%.',
        treatments: [
          {
            category: 'Thở oxy liệu pháp',
            content: 'Thở oxy qua gọng mũi hoặc mặt nạ duy trì SpO2 93 - 95% (92 - 95% ở phụ nữ có thai).',
            isHighlighted: true,
          },
          {
            category: 'Giãn phế quản tác dụng ngắn (SABA + SAMA)',
            content: 'Salbutamol 5mg + Ipratropium bromide 0.5mg khí dung mỗi 20 phút trong giờ đầu tiên (3 liều liên tiếp), sau đó chuyển khí dung q1-4h tùy đáp ứng.',
            isHighlighted: true,
          },
          {
            category: 'Corticosteroid toàn thân',
            content: 'Methylprednisolone 40 - 80 mg IV (hoặc Prednisolone 40 - 50 mg uống) dùng ngay trong giờ đầu, duy trì 5 - 7 ngày.',
            isHighlighted: true,
          },
          {
            category: 'Magnesium Sulfate IV',
            content: 'Magnesium sulfate 2g pha 100ml NaCl 0.9% truyền tĩnh mạch trong 20 phút ở bệnh nhân cơn nặng hoặc không đáp ứng phác đồ ban đầu.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'SpO2, nhịp thở, độ co kéo cơ hô hấp phụ, tri giác, tiếng rít rale rít phế quản', frequency: 'Mỗi 15 - 30 phút' },
          { type: 'CLS', metric: 'PEF (Peak Expiratory Flow) trước và sau khí dung', frequency: 'Trước và sau mỗi lần khí dung' },
          { type: 'CLS', metric: 'Khí máu động mạch nếu SpO2 < 92% hoặc có dấu hiệu kiệt sức hô hấp (PaCO2 tăng là dấu hiệu cảnh báo nguy kịch)', frequency: 'Khi có chỉ định lâm sàng' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'PaCO2 bình thường hoặc tăng ở bệnh nhân đang thở nhanh là dấu hiệu kiệt cơ hô hấp cực kỳ nguy hiểm, báo hiệu ngừng thở.',
            'Tuyệt đối không dùng thuốc an thần nhóm Benzodiazepine hoặc Opiate.',
          ],
          triageOrDischargeCriteria: 'Xuất viện khi PEF > 70% dự đoán, hết khó thở, SpO2 > 94% khí phòng duy trì > 4h sau liều khí dung cuối cùng.',
        },
      },
    ],
    cautions: [
      'Tránh lạm dụng thuốc an thần làm ức chế trung tâm hô hấp.',
      'Kiểm tra kỹ tiền sử dị ứng thuốc nhóm Aspirin/NSAIDs (Hội chứng Samter).',
    ],
    contraindications: [
      'Chống chỉ định thuốc chẹn Beta giao cảm không chọn lọc (kể cả dạng nhỏ mắt Timolol).',
      'Không dùng kháng sinh thường quy trừ khi có bằng chứng nhiễm khuẩn hô hấp rõ rệt.',
    ],
    dischargeCriteria: [
      'Triệu chứng lâm sàng cải thiện hoàn toàn, không còn co kéo cơ hô hấp.',
      'PEF ≥ 70% giá trị dự đoán.',
      'SpO2 ≥ 94% khi thở khí trời liên tục > 4 giờ.',
      'Được hướng dẫn kỹ thuật xịt bình hít định liều (MDI + buồng đệm) và đơn thuốc duy trì (ICS-Formoterol).',
    ],
  },
  {
    id: 'dot_cap_copd_gold',
    diseaseId: 'dot_cap_copd',
    diseaseName: 'Đợt cấp Bệnh phổi tắc nghẽn mạn tính (AE-COPD)',
    icd10: 'J44.1',
    specialty: 'ho_hap',
    triageLevel: 'inpatient',
    organization: 'GOLD & QĐ Bộ Y Tế',
    versionYear: 2026,
    lastUpdated: '2026-03-18T00:00:00.000Z',
    description: 'Thở oxy có kiểm soát SpO2 88-92%, SABA + SAMA khí dung, Corticosteroid toàn thân 5 ngày, kháng sinh khi có đủ 3 triệu chứng Anthonisen (tăng khó thở, tăng thể tích đờm, đờm mủ), hỗ trợ thông khí không xâm nhập (NIV/BiPAP).',
    severityGrades: [
      {
        grade: 'Độ 1: Đợt cấp COPD mức độ nhẹ - trung bình',
        severity: 'moderate',
        criteria: 'Tăng khó thở có thể tự kiểm soát, SpO2 ≥ 88%, không có toan hô hấp.',
        primaryAction: 'Tăng liều giãn phế quản khí dung SABA/SAMA, Prednisone 40 mg/ngày x 5 ngày.',
        triage: 'inpatient',
      },
      {
        grade: 'Độ 2: Đợt cấp COPD mức độ nặng',
        severity: 'critical',
        criteria: 'Thở nhanh > 30 l/p, sử dụng cơ hô hấp phụ, SpO2 < 88%, toan hô hấp cấp (pH < 7.35, PaCO2 > 45 mmHg).',
        primaryAction: 'Thở BiPAP/NIV sớm, Methylprednisolone 40mg IV q12h, kháng sinh đường tĩnh mạch (Amoxicillin/Clavulanate hoặc Cefoperazone/Sulbactam + Macrolide/Quinolone).',
        triage: 'icu',
      },
    ],
    timelinePhases: [
      {
        id: 'copd_p1',
        dayRange: 'N1 - N3',
        phaseName: 'Pha Cấp tính & Kiểm soát Toan Hô Hấp',
        clinicalGoal: 'Duy trì SpO2 88 - 92%, tránh ứ trệ CO2 dẫn đến hôn mê toan hô hấp, đảo ngược tình trạng khó thở và tắc nghẽn thông khí.',
        treatments: [
          {
            category: 'Liệu pháp oxy có kiểm soát',
            content: 'Thở oxy qua van Venturi 24% - 28% hoặc gọng kính 1 - 2 L/phút, duy trì SpO2 mục tiêu 88 - 92%. Tránh thở oxy liều cao làm mất kích thích hô hấp do giảm oxy máu.',
            isHighlighted: true,
          },
          {
            category: 'Thuốc giãn phế quản khí dung',
            content: 'Salbutamol 2.5mg + Ipratropium 0.5mg khí dung mỗi 4 - 6 giờ (có thể tăng lên mỗi 1 - 2 giờ trong những giờ đầu).',
            isHighlighted: true,
          },
          {
            category: 'Corticosteroid toàn thân',
            content: 'Methylprednisolone 40 mg IV một lần mỗi ngày (hoặc Prednisolone 40 mg uống) trong 5 ngày (không dùng kéo dài).',
          },
          {
            category: 'Kháng sinh theo kinh nghiệm',
            content: 'Chỉ định khi có đờm mủ (tiêu chuẩn Anthonisen): Amoxicillin-Clavulanic 1g x 3 lần/ngày hoặc Cefotaxime 1-2g q8h IV, hoặc Levofloxacin 750mg/ngày IV nếu có yếu tố nguy cơ Pseudomonas.',
            isHighlighted: true,
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'SpO2 mục tiêu (88-92%), nhịp thở, mức độ thở gắng sức, tri giác (ngủ gà, lú lẫn do tăng CO2 máu)', frequency: 'Mỗi 1 - 2 giờ' },
          { type: 'CLS', metric: 'Khí máu động mạch (ABG) kiểm tra pH và PaCO2 sau khi bắt đầu thở oxy 30 - 60 phút', frequency: 'Khi có biến động lâm sàng' },
          { type: 'CLS', metric: 'X-quang ngực thẳng loại trừ tràn khí màng phổi hoặc viêm phổi phối hợp', frequency: 'Lúc nhập viện' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Cảnh giác biến chứng tràn khí màng phổi tự phát do vỡ bóng khí thủng.',
            'Thở oxy nồng độ quá cao làm tăng PaCO2 nhanh chóng, ức chế trung tâm hô hấp dẫn đến hôn mê.',
          ],
          triageOrDischargeCriteria: 'Xuất viện khi bệnh nhân dùng được thuốc hít tại nhà, SpO2 ổn định > 88% với oxy hoặc khí phòng, pH > 7.35.',
        },
      },
    ],
    cautions: [
      'Không dùng corticoid toàn thân kéo dài quá 5-7 ngày trong đợt cấp (không tăng hiệu quả mà tăng nguy cơ nhiễm trùng, tăng đường huyết).',
    ],
    contraindications: [
      'Chống chỉ định thở oxy liều cao không kiểm soát.',
      'Chống chỉ định thông khí không xâm nhập (NIV) khi ngừng tim, ngừng thở, rối loạn tri giác nặng không hợp tác, nôn mửa nhiều hoặc có nguy cơ sặc.',
    ],
    dischargeCriteria: [
      'Tình trạng lâm sàng ổn định liên tục ≥ 24 giờ.',
      'Khí máu động mạch ổn định, không còn toan hô hấp mất bù (pH > 7.35).',
      'Đã tối ưu hóa phác đồ điều trị duy trì (LABA + LAMA + ICS) và hướng dẫn phục hồi chức năng hô hấp.',
    ],
  },
];

/**
 * Lấy danh sách phác đồ tùy chỉnh do người dùng thêm/sửa từ LocalStorage
 */
export function getCustomProtocols(): EditableProtocolItem[] {
  try {
    const raw = localStorage.getItem(CUSTOM_PROTOCOLS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error loading custom protocols:', e);
    return [];
  }
}

/**
 * Lấy toàn bộ phác đồ tổng hợp (Built-in Standards + Custom Protocols)
 */
export function getAllRegisteredProtocols(): EditableProtocolItem[] {
  const custom = getCustomProtocols();
  const map = new Map<string, EditableProtocolItem>();

  // 1. Nạp built-in standard protocols
  BUILT_IN_STANDARD_PROTOCOLS.forEach((p) => {
    map.set(p.diseaseId, p);
  });

  // 2. Ghi đè hoặc thêm mới bằng custom protocols
  custom.forEach((p) => {
    map.set(p.diseaseId, p);
  });

  return Array.from(map.values());
}

/**
 * Tìm phác đồ theo diseaseId
 */
export function getRegisteredProtocolById(diseaseId: string): EditableProtocolItem | undefined {
  const all = getAllRegisteredProtocols();
  return all.find(
    (p) =>
      p.diseaseId.toLowerCase() === diseaseId.toLowerCase() ||
      p.id.toLowerCase() === diseaseId.toLowerCase() ||
      p.icd10.toLowerCase().includes(diseaseId.toLowerCase())
  );
}

/**
 * Lưu phác đồ tùy chỉnh vào LocalStorage
 */
export function saveCustomProtocol(protocol: EditableProtocolItem): void {
  try {
    const list = getCustomProtocols();
    const existingIdx = list.findIndex((p) => p.diseaseId === protocol.diseaseId);
    if (existingIdx >= 0) {
      list[existingIdx] = { ...protocol, isCustom: true, lastUpdated: new Date().toISOString() };
    } else {
      list.push({ ...protocol, isCustom: true, lastUpdated: new Date().toISOString() });
    }
    localStorage.setItem(CUSTOM_PROTOCOLS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving custom protocol:', e);
  }
}

/**
 * Xóa phác đồ tùy chỉnh
 */
export function deleteCustomProtocol(diseaseId: string): void {
  try {
    const list = getCustomProtocols().filter((p) => p.diseaseId !== diseaseId);
    localStorage.setItem(CUSTOM_PROTOCOLS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error deleting custom protocol:', e);
  }
}

/**
 * Khôi phục về phác đồ mặc định (xóa mọi tùy chỉnh)
 */
export function resetToDefaultProtocols(): void {
  try {
    localStorage.removeItem(CUSTOM_PROTOCOLS_STORAGE_KEY);
  } catch (e) {
    console.error('Error resetting protocols:', e);
  }
}

/**
 * Xuất toàn bộ phác đồ tùy chỉnh ra file JSON
 */
export function exportProtocolsToJson(): string {
  const custom = getCustomProtocols();
  return JSON.stringify(custom, null, 2);
}

/**
 * Nhập phác đồ từ chuỗi JSON
 */
export function importProtocolsFromJson(jsonStr: string): { success: boolean; count: number; error?: string } {
  try {
    const parsed = JSON.parse(jsonStr);
    const items: EditableProtocolItem[] = Array.isArray(parsed) ? parsed : [parsed];
    const validItems = items.filter((item) => item && item.diseaseId && item.diseaseName);
    if (validItems.length === 0) {
      return { success: false, count: 0, error: 'Dữ liệu JSON không đúng định dạng phác đồ điều trị' };
    }
    validItems.forEach((p) => saveCustomProtocol(p));
    return { success: true, count: validItems.length };
  } catch (e: any) {
    return { success: false, count: 0, error: e?.message || 'Lỗi cú pháp JSON' };
  }
}
