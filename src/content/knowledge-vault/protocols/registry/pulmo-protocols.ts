/**
 * CliniPortal 2.0 — Kho Phác Đồ Hô Hấp
 * Path: src/content/protocols/registry/pulmo-protocols.ts
 */

import { ClinicalProtocol } from '../protocol-types';

export const PULMO_PROTOCOLS: ClinicalProtocol[] = [
  {
    id: 'pddt-asthma-gina-2025',
    title: 'Phác đồ Quản lý & Xử trí Cơn Hen Phế Quản Cấp (GINA 2025/2026)',
    titleEn: 'Global Initiative for Asthma (GINA 2025): Acute Asthma Exacerbation Management',
    aliases: ['Hen phế quản', 'Cơn hen cấp', 'Asthma Exacerbation', 'Hen suyễn'],
    icd10: ['J45', 'J45.0', 'J45.9'],
    specialty: 'pulmo',
    triageLevel: 'emergency',
    guidelineSource: 'Global Strategy for Asthma Management and Prevention (GINA 2025/2026)',
    evidenceLevel: 'Class I, Level A',
    year: 2025,
    summary: 'Chiến lược kiểm soát nền viêm ưu tiên Track 1 (ICS-Formoterol làm thuốc cắt cơn và duy trì MART), xử trí cơn kịch phát cấp cứu bằng SABA khí dung dồn dập, Corticosteroid toàn thân sớm và Magnesium Sulfate tĩnh mạch.',
    redFlags: [
      'Cơn hen đe dọa tính mạng: Lồng ngực im lặng (Silent chest), kiệt sức, lú lẫn, thở ngắt quãng, tím tái.',
      'Huyết động và oxy máu suy sụp: SpO2 < 90% (dù đang thở oxy), Mạch nhanh > 120 lần/phút hoặc nhịp chậm do kiệt cơ hô hấp.',
      'Lưu lượng đỉnh thở ra PEF < 50% trị số dự đoán hoặc giá trị tốt nhất của bệnh nhân.',
      'Khí máu động mạch: PaCO2 bình thường hoặc tăng (PaCO2 ≥ 45 mmHg) ở bệnh nhân đang thở nhanh là dấu hiệu suy hô hấp tối khẩn cần đặt nội khí quản.',
    ],
    steps: [
      {
        stepId: 'step_1_triage_oxygen',
        order: 1,
        phase: 'triage',
        title: '1. Đánh Giá Mức Độ Nặng & Thở Oxy Mục Tiêu (0 - 10 phút)',
        timeframe: 'Phút 0 - 10',
        description: 'Đo SpO2, tần số thở, mạch và đánh giá khả năng nói trọn câu. Cho thở oxy qua gọng mũi hoặc mặt nạ có túi khí để duy trì mục tiêu SpO2 93 - 95% ở người lớn (94 - 98% ở trẻ em).',
        conditionIf: 'Có dấu hiệu Cơn hen đe dọa tính mạng (Lồng ngực im lặng, lơ mơ)',
        conditionThen: 'Báo động đỏ cấp cứu, khí dung liên tục, truyền MgSO4 và chuẩn bị đặt nội khí quản.',
        flowchartNodeType: 'start',
      },
      {
        stepId: 'step_2_saba_nebulization',
        order: 2,
        phase: 'first-line',
        title: '2. Khí Dung Dồn Dập SABA + SAMA (Giờ Đầu Tiên)',
        timeframe: 'Trong 60 phút đầu',
        description: 'Khí dung Salbutamol 2.5 - 5mg phối hợp Ipratropium Bromide 0.5mg mỗi 20 phút x 3 lần liên tiếp trong giờ đầu tiên. Sử dụng buồng đệm xịt 4-10 nhát nếu không có máy khí dung.',
        drugs: [
          {
            genericName: 'Salbutamol + Ipratropium bromide',
            tradeNames: ['Combivent', 'Berodual'],
            route: 'Nebulized',
            maintenanceDose: '1 - 2 nang khí dung mỗi 20 phút trong giờ đầu, sau đó cách mỗi 1 - 4 giờ tùy đáp ứng',
            clinicalNotes: 'Phối hợp SABA + SAMA giúp giãn phế quản hiệp đồng và giảm tỷ lệ nhập viện rõ rệt so với SABA đơn thuần.',
          },
        ],
        isAlert: true,
        flowchartNodeType: 'action',
      },
      {
        stepId: 'step_3_systemic_steroid',
        order: 3,
        phase: 'first-line',
        title: '3. Corticosteroid Toàn Thân Sớm (Đường Uống hoặc Tiêm Mạch)',
        timeframe: 'Trong giờ đầu tiếp cận',
        description: 'Dùng Corticosteroid toàn thân ngay lập tức để ức chế phản ứng viêm cấp niêm mạc phế quản. Đường uống (Prednisolone) có hiệu quả tương đương đường tĩnh mạch nếu bệnh nhân còn nuốt được.',
        drugs: [
          {
            genericName: 'Prednisolone / Methylprednisolone',
            tradeNames: ['Solu-Medrol', 'Medrol'],
            route: 'PO',
            loadingDose: '40 - 50 mg uống 1 lần/ngày (hoặc Methylprednisolone 40 - 80 mg IV tiêm mạch nếu nôn ói)',
            maintenanceDose: 'Duy trì trong 5 - 7 ngày ở người lớn (3 - 5 ngày ở trẻ em), KHÔNG cần giảm liều dần',
            clinicalNotes: 'Dùng sớm trong giờ đầu giúp giảm rõ rệt tỷ lệ tái phát và nhu cầu nhập viện.',
          },
        ],
        flowchartNodeType: 'action',
      },
      {
        stepId: 'step_4_magnesium_sulfate',
        order: 4,
        phase: 'refractory',
        title: '4. Magnesium Sulfate Tĩnh Mạch (Cơn nặng / Không đáp ứng)',
        timeframe: 'Giờ thứ 1 - 2',
        description: 'Chỉ định truyền Magnesium Sulfate 2g tĩnh mạch trong 20 phút cho bệnh nhân có cơn hen nặng, FEV1 < 25-30% dự đoán hoặc không đáp ứng với khí dung ban đầu.',
        drugs: [
          {
            genericName: 'Magnesium Sulfate (MgSO4) 15% / 50%',
            route: 'IV',
            loadingDose: '2g truyền tĩnh mạch chậm trong 20 phút (trẻ em: 40 - 50 mg/kg, tối đa 2g)',
            isHighAlert: true,
            clinicalNotes: 'Cơ chế: Ức chế dòng canxi vào cơ trơn phế quản giúp giãn cơ trơn cực mạnh.',
          },
        ],
        isAlert: true,
        flowchartNodeType: 'alert',
      },
      {
        stepId: 'step_5_maintenance_mart',
        order: 5,
        phase: 'recovery',
        title: '5. Xuất Viện & Kê Đơn Duy Trì Phác Đồ MART (Track 1)',
        timeframe: 'Trước khi xuất viện',
        description: 'Chuyển sang bình hít phối hợp ICS-Formoterol liều thấp (Track 1) vừa dùng duy trì hàng ngày vừa dùng để cắt cơn khi có triệu chứng (MART). Hướng dẫn kỹ thuật sử dụng bình hít và cấp bản Kế hoạch Hành động Xử trí Hen (Asthma Action Plan).',
        drugs: [
          {
            genericName: 'Budesonide / Formoterol',
            tradeNames: ['Symbicort Turbuhaler / Rapihaler'],
            route: 'Inhaled',
            maintenanceDose: '1 - 2 nhát hít (160/4.5 mcg) x 2 lần/ngày, và hít thêm 1 nhát khi cần cắt cơn',
            maxDose24h: 'Tối đa không quá 8 - 12 nhát hít/ngày',
            clinicalNotes: 'Track 1 MART giúp giảm 65% nguy cơ kịch phát nặng so với chỉ dùng SABA đơn thuần.',
          },
        ],
        flowchartNodeType: 'stable',
      },
    ],
    contraindications: [
      {
        conflictWithCondition: 'Đái tháo đường kèm theo (E11)',
        forbiddenDrugOrAction: 'Lạm dụng Corticoid toàn thân liều cao kéo dài không kiểm soát đường huyết',
        dangerLevel: 'relative',
        explanation: 'Corticoid làm tăng đề kháng insulin và kích thích tân tạo đường gây tăng đường huyết cấp tính.',
        recommendation: 'Theo dõi đường huyết mao mạch mỗi 6h, chỉnh liều Insulin tạm thời trong 5 ngày dùng Corticoid.',
      },
      {
        conflictWithCondition: 'Tăng huyết áp / Bệnh tim mạch đồng mắc',
        forbiddenDrugOrAction: 'Thuốc chẹn Beta giao cảm không chọn lọc (Propranolol, Nadolol)',
        dangerLevel: 'absolute',
        explanation: 'Chẹn beta 2 gây co thắt phế quản ác tính dữ dội kháng thuốc.',
        recommendation: 'Nếu bắt buộc dùng chẹn beta vì suy tim/sau nhồi máu, chỉ dùng thuốc chẹn Beta-1 siêu chọn lọc (Bisoprolol, Nebivolol) ở liều thấp nhất.',
      },
    ],
    sharedDecisionOptions: [
      {
        optionName: 'Phương án 1: Liệu pháp MART (Track 1 — Ưu tiên hàng đầu theo GINA)',
        approachType: 'standard-invasive',
        pros: [
          'Chỉ dùng 1 bình hít duy nhất (ICS-Formoterol) cho cả duy trì và cắt cơn.',
          'Bệnh nhân luôn được bảo vệ bởi Corticoid kháng viêm mỗi khi có triệu chứng.',
          'Giảm 65% nguy cơ nhập viện cấp cứu so với dùng SABA đơn thuần.',
        ],
        cons: [
          'Chi phí bình hít phối hợp ban đầu cao hơn so với bình SABA rời.',
        ],
        estimatedCost: 'medium',
        suitableFor: 'Mọi bệnh nhân từ 12 tuổi trở lên từ Bậc 1 đến Bậc 5 theo GINA.',
      },
      {
        optionName: 'Phương án 2: Liệu pháp Phối hợp Rời (Track 2 — Lựa chọn thay thế)',
        approachType: 'conservative',
        pros: [
          'Chi phí từng bình thuốc thấp hơn, thuốc phổ biến tại y tế tuyến cơ sở.',
        ],
        cons: [
          'Bệnh nhân dễ bỏ thuốc duy trì và rơi vào tình trạng chỉ dùng SABA cắt cơn rất nguy hiểm.',
        ],
        estimatedCost: 'low',
        suitableFor: 'Bệnh nhân không có điều kiện tiếp cận bình hít MART hoặc đang kiểm soát rất tốt với Track 2.',
      },
    ],
    dischargeCriteria: [
      'Không còn khó thở khi đi lại nhẹ nhàng.',
      'Khí dung SABA đã giãn cách được mỗi ≥ 4 giờ.',
      'PEF đạt > 70 - 80% trị số dự đoán hoặc giá trị tốt nhất.',
      'SpO2 duy trì > 94% khi thở khí phòng tự nhiên.',
      'Đã được cấp thuốc uống 5 ngày Corticoid và bình hít duy trì MART.',
    ],
    updatedAt: '2026-08-22',
  },
];
