import { SimulationCaseBlueprint } from '../../src/types/simulation.ts';

export const PARAMETRIC_DENGUE_BLUEPRINT: SimulationCaseBlueprint = {
  blueprintId: 'BP-DENGUE-SHOCK-01',
  diseaseId: 'sot_xuat_huyet_dengue',
  diseaseName: 'Sốt xuất huyết Dengue',
  icdCode: 'A97',
  title: 'Giả Lập Lâm Sàng: Sốt Xuất Huyết Dengue Thể Cảnh Báo & Sốc Đa Nhánh',
  summary:
    'Mô hình đào tạo biện luận lâm sàng thích ứng dựa trên 6 Module tham số hóa nhân quả. Tự động chuyển hướng đáp án đúng và phương án nhiễu theo cơ địa bệnh nhân: Người trẻ không bệnh nền vs Người già suy tim mạn vs Biến chứng xuất huyết nội tạng ẩn.',
  learningObjectives: [
    'Nhận diện chuẩn xác pha nguy hiểm của Dengue (Ngày 4 - Ngày 6, thời điểm nhiệt độ hạ nhưng nguy cơ sốc đạt đỉnh).',
    'Thành thạo phân tầng huyết động: Phân biệt dấu hiệu cảnh báo, sốc còn bù (huyết áp kẹp) và sốc mất bù (tụt huyết áp).',
    'Ra quyết định bù dịch cá thể hóa theo cơ địa: Tránh quá tải dịch ở bệnh nhân suy tim và phát hiện kịp thời xuất huyết nội ẩn.',
    'Rèn luyện kỹ năng thi OSCE 100 điểm với các câu hỏi tình huống có phương án nhiễu thích ứng.',
    'Nhận diện và hóa giải 5 thiên kiến nhận thức trong cấp cứu y khoa.',
  ],
  branches: [
    // =========================================================================
    // NHÁNH A: BỆNH NHÂN TRẺ, KHÔNG BỆNH NỀN (SỐC THOÁT DỊCH ĐIỂN HÌNH)
    // =========================================================================
    {
      branchId: 'branch_a_young_classic',
      branchTitle: 'Nhánh A: Thanh Niên 22 Tuổi — Sốc Thoát Huyết Tương Thuần Túy',
      branchBadge: 'Thể Điển Hình (Y4 - Y6)',
      branchDescription:
        'Bệnh nhân trẻ, cơ địa khỏe mạnh, ngày thứ 5 hạ sốt nhưng đột ngột xuất hiện huyết áp kẹp, cô đặc máu nặng cần hồi sức dịch tinh thể theo phác đồ chuẩn Bộ Y Tế.',
      targetAudience: 'Sinh viên Y4, Y6, Bác sĩ Đa khoa thực hành',
      demographics: {
        id: 'demo_young_male',
        label: 'Nam, 22 tuổi, 60kg',
        age: 22,
        gender: 'nam',
        weightKg: 60,
        occupation: 'Sinh viên',
      },
      comorbidity: {
        id: 'comorb_none',
        label: 'Khỏe mạnh, không tiền sử bệnh lý',
        description: 'Chức năng tim, gan, thận trước đó hoàn toàn bình thường.',
        riskFlag: 'none',
        cautionNotes: ['Dung nạp thể tích tốt, nguy cơ quá tải dịch thấp nếu tuân thủ tốc độ.'],
      },
      timelineDay: 5,
      vitalsVariant: {
        id: 'vitals_shock_compensated',
        statusLabel: 'Sốc Dengue (Huyết áp kẹp, tưới máu kém)',
        hemodynamicState: 'compensated_shock',
        vitals: {
          vNhiet: '37.0',
          vMach: '124',
          vHATT: '90',
          vHATTr: '75',
          vTho: '24',
          vSpo2: '97',
        },
      },
      labVariant: {
        id: 'lab_classic_hemoconcentration',
        statusLabel: 'Cô đặc máu nặng (Hct 48%) kèm Giảm tiểu cầu (32 G/L)',
        labs: {
          lBC: '3.8',
          lTC: '32',
          lHct: '48',
          lGlu: '5.8',
          lTrop: '<0.01',
        },
        additionalLabs: {
          'AST / ALT': '165 / 138 U/L',
          'Khí máu động mạch': 'pH 7.34, HCO3- 19 mmol/L, Lactate 3.1 mmol/L',
          'Dengue NS1 Ag': 'Dương tính (+) ngày 2',
          'Siêu âm bụng tại giường': 'Dịch ổ bụng lượng ít, dịch màng phổi phải lượng ít, thành túi mật dày 5mm',
        },
        bleedingFlag: false,
      },
      treatmentResponse: {
        id: 'resp_good_crystalloid',
        label: 'Đáp ứng tốt với dịch tinh thể',
        vitalsAfter1h: 'Mạch 92 l/p, HA 105/70 mmHg, tưới máu ngoại vi ấm lại, CRT < 2s',
        urineOutput: '1.2 mL/kg/h',
        clinicalOutcome: 'Huyết động ổn định, chuyển giảm bậc dịch truyền xuống 10 ml/kg/h rồi 7.5 ml/kg/h.',
      },
      chiefComplaint: 'Mệt lả, bứt rứt, tay chân lạnh vào ngày thứ 5 của bệnh',
      historyOfPresentIllness:
        'Bệnh nhân sốt cao liên tục 4 ngày đầu (39-40°C), đau đầu hốc mắt, đau cơ khớp dữ dội. Sáng ngày 5, người nhà thấy bệnh nhân hạ sốt về 37°C nhưng lại mệt lả đi, vã mồ hôi, tiểu ít (chỉ tiểu 1 lần lượng ít trong 12 giờ qua), bứt rứt, tay chân lạnh ẩm.',
      physicalExamSummary:
        'Bệnh nhân tỉnh nhưng đừ, bứt rứt nhẹ. Da tái lạnh ẩm ở đầu chi, thời gian đổ đầy mao mạch (CRT) = 3.5 giây. Mạch quay nhanh, nhỏ, khó bắt (124 l/p). Huyết áp kẹp: 90/75 mmHg (hiệu áp 15 mmHg). Tim đều, phổi không ran. Gan to 2cm dưới bờ sườn, ấn đau tức.',
      
      // OSCE Questions for Branch A
      questions: [
        {
          id: 'q_a_1_history',
          pillar: 'history_exam',
          pillarTitle: '1. Khai thác Triệu chứng & Đánh giá Cờ Đỏ',
          pillarWeight: 25,
          prompt:
            'Dấu hiệu nào sau đây là bằng chứng quyết định nhất chỉ điểm bệnh nhân đã bước vào giai đoạn sốc nguy kịch?',
          options: [
            {
              id: 'opt_a1_1',
              text: 'Nhiệt độ cơ thể giảm từ 39.5°C xuống còn 37.0°C.',
              isCorrect: false,
              score: 5,
              rationale: 'Nhiệt độ hạ là đặc điểm kinh điển của pha nguy hiểm, nhưng tự nó không phản ánh mức độ tưới máu mô.',
            },
            {
              id: 'opt_a1_2',
              text: 'Huyết áp kẹp 90/75 mmHg (hiệu áp 15 mmHg) kết hợp đầu chi lạnh ẩm và mạch nhanh 124 l/p.',
              isCorrect: true,
              score: 25,
              rationale: 'Chính xác! Huyết áp kẹp (hiệu số HATT - HATTr <= 20 mmHg) kèm mạch nhanh nhỏ và CRT kéo dài là tiêu chuẩn vàng của Sốc Dengue còn bù do giảm thể tích nội mạch nặng.',
            },
            {
              id: 'opt_a1_3',
              text: 'Bệnh nhân đau mỏi cơ khớp và đau đầu sau hốc mắt.',
              isCorrect: false,
              score: 0,
              rationale: 'Đây là các triệu chứng thông thường của pha sốt khởi phát, không dùng để chẩn đoán sốc.',
            },
            {
              id: 'opt_a1_4',
              text: 'Tiểu cầu giảm xuống 32 G/L.',
              isCorrect: false,
              score: 5,
              rationale: 'Tiểu cầu giảm là dấu hiệu cảnh báo thường gặp, nhưng không phải thước đo trực tiếp của suy sụp huyết động.',
            },
          ],
        },
        {
          id: 'q_a_2_labs',
          pillar: 'labs_workup',
          pillarTitle: '2. Chỉ định Cận Lâm Sàng & Phân Tích Động Học',
          pillarWeight: 25,
          prompt:
            'Chỉ số cận lâm sàng nào quan trọng nhất cần được làm lại mỗi 1–2 giờ để giám sát trực tiếp mức độ thoát huyết tương và đáp ứng bù dịch?',
          options: [
            {
              id: 'opt_a2_1',
              text: 'Định lượng số lượng tiểu cầu (Platelets) mỗi giờ.',
              isCorrect: false,
              score: 5,
              rationale: 'Số lượng tiểu cầu chỉ cần kiểm tra 12-24 giờ/lần; tiểu cầu không phản ánh mức độ thể tích lòng mạch trong pha sốc cấp.',
            },
            {
              id: 'opt_a2_2',
              text: 'Dung tích hồng cầu Hematocrit (Hct) đo lại ngay tại giường mỗi 1–2 giờ.',
              isCorrect: true,
              score: 25,
              rationale: 'Chính xác! Hct phản ánh tỷ lệ thể tích khối hồng cầu / huyết tương, là la bàn sinh tử để điều chỉnh tốc độ dịch tinh thể hoặc chuyển dịch cao phân tử.',
            },
            {
              id: 'opt_a2_3',
              text: 'Men tim Troponin I và CK-MB.',
              isCorrect: false,
              score: 0,
              penaltyNote: 'Lãng phí cận lâm sàng không cần thiết trên thanh niên không triệu chứng tim mạch.',
              rationale: 'Không có chỉ định thường quy cho bệnh nhân trẻ không có rối loạn nhịp tim hoặc đau ngực.',
            },
            {
              id: 'opt_a2_4',
              text: 'Chụp CT ngực bụng cản quang khẩn.',
              isCorrect: false,
              score: 0,
              penaltyNote: 'Nguy cơ độc thận do thuốc cản quang trên bệnh nhân đang thiếu thể tích tuần hoàn.',
              rationale: 'CT scan hoàn toàn không có chỉ định lúc này, siêu âm tại giường là đủ an toàn và hiệu quả.',
            },
          ],
        },
        {
          id: 'q_a_3_dx',
          pillar: 'diagnosis_staging',
          pillarTitle: '3. Xác Lập Chẩn Đoán & Phân Tầng Mức Độ',
          pillarWeight: 25,
          prompt:
            'Chẩn đoán lâm sàng và phân độ đầy đủ, chuẩn xác nhất cho bệnh nhân này theo Hướng dẫn Bộ Y Tế là gì?',
          options: [
            {
              id: 'opt_a3_1',
              text: 'Sốt xuất huyết Dengue có dấu hiệu cảnh báo - Ngày 5.',
              isCorrect: false,
              score: 5,
              rationale: 'Chưa đủ mức độ nghiêm trọng! Bệnh nhân đã có HA kẹp (90/75), mạch nhanh nhỏ và CRT kéo dài nên đã rơi vào Sốc Dengue.',
            },
            {
              id: 'opt_a3_2',
              text: 'Sốt xuất huyết Dengue nặng thể Sốc Dengue (Compensated Shock) - Ngày 5.',
              isCorrect: true,
              score: 25,
              rationale: 'Chính xác hoàn toàn! Đạt chuẩn mã hóa ICD-10 A97.1 (Sốc Dengue còn bù) với đầy đủ ngày bệnh.',
            },
            {
              id: 'opt_a3_3',
              text: 'Nhiễm trùng huyết nghi từ đường tiêu hóa / Sốc nhiễm trùng.',
              isCorrect: false,
              score: 0,
              rationale: 'Sai lệch bệnh cảnh dịch tễ, bệnh nhân không có ổ nhiễm khuẩn và đã có NS1 dương tính.',
            },
            {
              id: 'opt_a3_4',
              text: 'Sốc phản vệ độ III chưa rõ dị nguyên.',
              isCorrect: false,
              score: 0,
              rationale: 'Bệnh cảnh không phù hợp, không có yếu tố tiếp xúc dị nguyên và không có tổn thương hô hấp hay da niêm cấp tính.',
            },
          ],
        },
        {
          id: 'q_a_4_rx',
          pillar: 'management_safety',
          pillarTitle: '4. Xử Trí Cấp Cứu & An Toàn Người Bệnh',
          pillarWeight: 25,
          prompt:
            'Y lệnh hồi sức dịch truyền bước đầu tiên (Giờ vàng thứ 1) chuẩn xác nhất cho bệnh nhân này là gì?',
          options: [
            {
              id: 'opt_a4_1',
              text: 'Ringer Lactate hoặc NaCl 0.9% truyền tĩnh mạch với tốc độ 15 ml/kg/h (tổng 900 ml) trong 1 giờ đầu, sau đó đánh giá lại lâm sàng và Hct.',
              isCorrect: true,
              score: 25,
              rationale: 'Chính xác! Đây là phác đồ chuẩn mực của Bộ Y Tế Việt Nam và WHO cho Sốc Dengue người lớn còn bù.',
            },
            {
              id: 'opt_a4_2',
              text: 'Truyền dịch cao phân tử Dextran 40 với tốc độ 15 ml/kg/h ngay từ đầu.',
              isCorrect: false,
              score: 5,
              rationale: 'Cao phân tử chỉ được chỉ định khi sốc mất bù tụt HA hoặc sốc thất bại sau 1 giờ bù dịch tinh thể 15 ml/kg/h.',
            },
            {
              id: 'opt_a4_3',
              text: 'Truyền 01 đơn vị Khối tiểu cầu cấp cứu vì PLT < 50 G/L.',
              isCorrect: false,
              score: 0,
              penaltyNote: 'Sai lầm nghiêm trọng! Truyền tiểu cầu khi không có xuất huyết nặng làm tăng nguy cơ quá tải dịch và phản ứng miễn dịch.',
              rationale: 'Không truyền tiểu cầu dự phòng trong sốt xuất huyết Dengue theo khuyến cáo EBM.',
            },
            {
              id: 'opt_a4_4',
              text: 'Dùng ngay vận mạch Noradrenaline truyền tĩnh mạch liều 0.1 mcg/kg/phút.',
              isCorrect: false,
              score: 0,
              penaltyNote: 'Chống chỉ định dùng vận mạch khi lòng mạch còn rỗng, làm co mạch gây hoại tử chi và suy đa tạng.',
              rationale: 'Sốc Dengue là sốc giảm thể tích, bắt buộc phải bù đủ dịch trước khi cân nhắc vận mạch.',
            },
          ],
        },
      ],
      clinicalPearls: [
        {
          title: 'Quy luật "Hết sốt là giờ vàng nguy hiểm"',
          context: 'Bệnh nhân bước vào ngày thứ 4–6, thân nhiệt tự nhiên hạ xuống 37°C.',
          action: 'Bắt buộc phải đo sinh hiệu (Mạch, HATT, HATTr, CRT) mỗi 1–2 giờ.',
          mechanism: 'Đây là thời điểm tính thấm thành mạch tăng tối đa gây thoát huyết tương ồ ạt; hết sốt không phải là khỏi bệnh mà là khởi đầu của sốc.',
        },
        {
          title: 'Công thức Huyết áp kẹp <= 20 mmHg',
          context: 'Huyết áp tâm thu vẫn duy trì 90-100 mmHg nhưng huyết áp tâm trương tăng lên (90/75 mmHg).',
          action: 'Chẩn đoán và xử trí ngay như một trường hợp Sốc Dengue còn bù.',
          mechanism: 'Cơ thể co mạch ngoại biên tối đa để bảo tồn tưới máu tạng trung tâm làm tăng HA tâm trương, khiến hiệu số huyết áp kẹp lại.',
        },
        {
          title: 'Ưu tiên Ringer Lactate hơn NaCl 0.9%',
          context: 'Lựa chọn dung dịch tinh thể để truyền thể tích lớn trong 24 giờ đầu.',
          action: 'Ưu tiên chỉ định Ringer Lactate / Ringer Acetate hơn là dung dịch muối đẳng trương thông thường.',
          mechanism: 'Truyền lượng lớn NaCl 0.9% dễ dẫn đến toan chuyển hóa tăng clorid máu (Hyperchloremic metabolic acidosis), làm nặng thêm tình trạng toan sẵn có do sốc.',
        },
      ],
      cognitivePitfalls: [
        {
          biasName: 'Anchoring Bias (Thiên kiến mỏ neo vào thân nhiệt)',
          biasType: 'anchoring',
          warningText: 'Bác sĩ thấy bệnh nhân hết sốt thì chủ quan cho rằng bệnh đã ổn định và cho bệnh nhân về điều trị ngoại trú.',
          remedyAction: 'Luôn xem xét tam giác sinh hiệu: Thân nhiệt bình thường + Mạch nhanh + HA kẹp = Báo động đỏ sốc.',
        },
        {
          biasName: 'Premature Closure (Đóng chẩn đoán sớm)',
          biasType: 'premature_closure',
          warningText: 'Tập trung điều trị giảm đau hạ sốt mà không sờ nắn khám bụng phát hiện gan to ấn đau và không kiểm tra CRT.',
          remedyAction: 'Bắt buộc thực hiện bảng kiểm khám lâm sàng toàn diện 4 bước trước khi kết luận tình trạng người bệnh.',
        },
      ],
      ebmReferences: [
        'Hướng dẫn chẩn đoán, điều trị Sốt xuất huyết Dengue (Ban hành kèm theo Quyết định số 2760/QĐ-BYT ngày 04/07/2023 của Bộ trưởng Bộ Y tế).',
        'World Health Organization (WHO) 2022 Guidelines on Clinical Management of Dengue.',
      ],
    },

    // =========================================================================
    // NHÁNH B: NGƯỜI CAO TUỔI CÓ TIỀN SỬ SUY TIM (BÙ DỊCH DÈ DẶT & POCUS)
    // =========================================================================
    {
      branchId: 'branch_b_elderly_heart_failure',
      branchTitle: 'Nhánh B: Cụ Bà 72 Tuổi Có Tiền Sử Suy Tim — Nguy Cơ Phù Phổi Cấp',
      branchBadge: 'Cơ Địa Đặc Biệt (Y6 - Nội Trú)',
      branchDescription:
        'Bệnh nhân cao tuổi, tiền sử suy tim EF 36% mắc Dengue có sốc. Yêu cầu bác sĩ phải bù dịch dè dặt, phối hợp siêu âm POCUS đánh giá tĩnh mạch chủ dưới và chuẩn bị sớm dịch keo cao phân tử.',
      targetAudience: 'Bác sĩ Nội trú, Bác sĩ Hồi sức Cấp cứu',
      demographics: {
        id: 'demo_elderly_female',
        label: 'Nữ, 72 tuổi, 52kg',
        age: 72,
        gender: 'nu',
        weightKg: 52,
        occupation: 'Hưu trí',
      },
      comorbidity: {
        id: 'comorb_heart_failure',
        label: 'Suy tim mạn NYHA II (EF 36%) do Bệnh tim thiếu máu cục bộ',
        description: 'Đang dùng thuốc định kỳ: Bisoprolol 2.5mg, Enalapril 5mg (đã tạm ngưng khi vào viện).',
        riskFlag: 'fluid_overload',
        cautionNotes: [
          'Dung nạp thể tích tuần hoàn cực kỳ kém.',
          'Dồn dịch nhanh 15-20 ml/kg/h sẽ lập tức kích hoạt Phù phổi cấp do tim (Iatrogenic Pulmonary Edema).',
        ],
      },
      timelineDay: 5,
      vitalsVariant: {
        id: 'vitals_shock_elderly_hf',
        statusLabel: 'Sốc Dengue kẹp HA trên cơ địa suy tim, thở nhanh co kéo nhẹ',
        hemodynamicState: 'compensated_shock',
        vitals: {
          vNhiet: '36.8',
          vMach: '116',
          vHATT: '85',
          vHATTr: '65',
          vTho: '28',
          vSpo2: '93',
        },
      },
      labVariant: {
        id: 'lab_elderly_hf',
        statusLabel: 'Hct 46% (Cô đặc máu) kèm NT-proBNP tăng cao (2.450 pg/mL)',
        labs: {
          lBC: '4.2',
          lTC: '28',
          lHct: '46',
          lGlu: '6.4',
          lTrop: '0.03',
        },
        additionalLabs: {
          'NT-proBNP': '2.450 pg/mL (Tăng cao chỉ điểm suy tim nền)',
          'eGFR (CKD-EPI)': '42 mL/min/1.73m2 (Suy thận mạn độ 3a)',
          'Siêu âm tim tại giường (FoCUS)': 'Phân suất tống máu LVEF 36%, buồng tim giãn nhẹ, tĩnh mạch chủ dưới IVC đường kính 1.2cm xẹp > 50% theo nhịp thở',
          'Siêu âm phổi (LUS)': 'Đường B-lines rải rác 2 đáy phổi (khoảng 3 đường/khoang liên sườn), tràn dịch màng phổi 2 bên lượng ít',
        },
        bleedingFlag: false,
      },
      treatmentResponse: {
        id: 'resp_cautious_fluid_colloid',
        label: 'Nâng được huyết áp an toàn mà không gây suy hô hấp cấp',
        vitalsAfter1h: 'Mạch 96 l/p, HA 100/65 mmHg, SpO2 96% (thở oxy canula 3 l/p), phổi không tăng ran ẩm',
        urineOutput: '0.8 mL/kg/h',
        clinicalOutcome: 'Huyết động ổn định, phối hợp truyền Albumin 20% liều nhỏ giúp giữ thể tích nội mạch bền vững.',
      },
      chiefComplaint: 'Khó thở, mệt lả, bứt rứt, huyết áp tụt ngày thứ 5 của Dengue',
      historyOfPresentIllness:
        'Cụ bà 72 tuổi, tiền sử suy tim mạn điều trị ngoại trú ổn định. Ngày 1–4 sốt nhẹ 38–38.5°C kèm chán ăn, mệt mỏi. Sáng ngày thứ 5 thân nhiệt hạ còn 36.8°C nhưng người bệnh bắt đầu thở mệt dồn dập, bứt rứt, tiểu rất ít.',
      physicalExamSummary:
        'Bệnh nhân tỉnh, tiếp xúc chậm, thở co kéo cơ liên sườn nhẹ, nhịp thở 28 l/p, SpO2 93% khí phòng. Đầu chi lạnh, CRT = 3 giây. Mạch 116 l/p, HA 85/65 mmHg. Khám tim: Tiếng T1 T2 mờ, có tiếng T3 gallop nhẹ ở mỏm. Phổi nghe ran ẩm rải rác 1/3 dưới 2 phế trường.',
      
      // OSCE Questions for Branch B
      questions: [
        {
          id: 'q_b_1_history',
          pillar: 'history_exam',
          pillarTitle: '1. Khai thác Triệu chứng & Đối Chiếu Bệnh Nền',
          pillarWeight: 25,
          prompt:
            'Trước dấu hiệu ran ẩm đáy phổi kết hợp huyết áp tụt 85/65 mmHg ở bệnh nhân này, nhận định lâm sàng nào sau đây là chuẩn xác nhất?',
          options: [
            {
              id: 'opt_b1_1',
              text: 'Ran ẩm chứng tỏ bệnh nhân đã bị viêm phổi bệnh viện, cần bắt đầu ngay kháng sinh phổ rộng.',
              isCorrect: false,
              score: 0,
              rationale: 'Bệnh nhân vào viện ngày 5 vì sốt xuất huyết, tổn thương phổi 2 bên kèm tiền sử suy tim gợi ý ứ huyết tĩnh mạch phổi hơn là viêm phổi cấp.',
            },
            {
              id: 'opt_b1_2',
              text: 'Đây là tình trạng Sốc Dengue giảm thể tích trên nền cơ tim giảm dự trữ co bóp, ran ẩm phản ánh ứ huyết tim mạch mạn tính kết hợp thoát dịch màng phổi nhẹ.',
              isCorrect: true,
              score: 25,
              rationale: 'Rất xuất sắc! Bác sĩ đã nhận diện được sự chồng lấp giữa tình trạng thiếu dịch lòng mạch do Dengue và khả năng dung nạp thể tích kém của quả tim suy.',
            },
            {
              id: 'opt_b1_3',
              text: 'Bệnh nhân bị nhồi máu cơ tim cấp có sốc tim là nguyên nhân duy nhất.',
              isCorrect: false,
              score: 5,
              rationale: 'Troponin chỉ tăng nhẹ tương ứng với suy tim mạn, Hct 46% và tiểu cầu 28 khẳng định Dengue là nguyên nhân chính.',
            },
            {
              id: 'opt_b1_4',
              text: 'Ran ẩm không quan trọng, cứ điều trị như người bình thường.',
              isCorrect: false,
              score: 0,
              penaltyNote: 'Sai sót nguy hiểm bỏ qua dấu hiệu ứ huyết phổi.',
              rationale: 'Bỏ qua ran ẩm ở người suy tim sẽ dẫn đến chỉ định bù dịch quá mức gây tử vong.',
            },
          ],
        },
        {
          id: 'q_b_2_labs',
          pillar: 'labs_workup',
          pillarTitle: '2. Thăm Dò Huyết Động Tại Giường (POCUS)',
          pillarWeight: 25,
          prompt:
            'Công cụ thăm dò tại giường nào mang tính quyết định giúp bác sĩ tự tin quyết định có nên truyền dịch tiếp hay phải dừng dịch ngay?',
          options: [
            {
              id: 'opt_b2_1',
              text: 'Chụp X-quang phổi thẳng tại giường sau mỗi 30 phút.',
              isCorrect: false,
              score: 0,
              rationale: 'X-quang không đánh giá được động học thể tích mạch máu theo thời gian thực và gây phơi nhiễm tia.',
            },
            {
              id: 'opt_b2_2',
              text: 'Siêu âm tim phổi tại giường (POCUS) đánh giá đường kính/độ xẹp tĩnh mạch chủ dưới (IVC) và đường B-lines nhu mô phổi.',
              isCorrect: true,
              score: 25,
              rationale: 'Chính xác! IVC xẹp > 50% chứng tỏ lòng mạch vẫn đang thiếu dịch cần bù, trong khi B-lines tăng dày cảnh báo sung huyết phổi cần hãm dịch lại.',
            },
            {
              id: 'opt_b2_3',
              text: 'Xét nghiệm lặp lại Troponin I mỗi 15 phút.',
              isCorrect: false,
              score: 0,
              penaltyNote: 'Lãng phí cận lâm sàng không có giá trị hướng dẫn truyền dịch.',
              rationale: 'Troponin không hướng dẫn được tốc độ bù dịch.',
            },
            {
              id: 'opt_b2_4',
              text: 'Đặt ống nội khí quản thở máy xâm lấn dự phòng trước.',
              isCorrect: false,
              score: 0,
              penaltyNote: 'Can thiệp xâm lấn không cần thiết khi SpO2 93% vẫn đáp ứng oxy canula.',
              rationale: 'Chưa có chỉ định đặt NKQ ở thời điểm này.',
            },
          ],
        },
        {
          id: 'q_b_3_dx',
          pillar: 'diagnosis_staging',
          pillarTitle: '3. Phân Tầng Chẩn Đoán Đa Bệnh Lý',
          pillarWeight: 25,
          prompt:
            'Chẩn đoán bệnh học xác đáng và phân tầng nguy cơ cho ca bệnh này là gì?',
          options: [
            {
              id: 'opt_b3_1',
              text: 'Sốt xuất huyết Dengue nặng thể sốc (ICD-10 A97.1) trên cơ địa Suy tim NYHA II (EF 36%) / Suy thận mạn độ 3a.',
              isCorrect: true,
              score: 25,
              rationale: 'Chính xác hoàn toàn! Phản ánh toàn diện bệnh chính, biến chứng sốc và các cơ địa nguy cơ cao.',
            },
            {
              id: 'opt_b3_2',
              text: 'Phù phổi cấp huyết động do suy tim mất bù đơn thuần.',
              isCorrect: false,
              score: 0,
              rationale: 'Bỏ sót hoàn toàn bệnh căn Dengue và tình trạng thoát huyết tương cô đặc máu.',
            },
            {
              id: 'opt_b3_3',
              text: 'Sốt xuất huyết Dengue thể nhẹ điều trị ngoại trú.',
              isCorrect: false,
              score: 0,
              penaltyNote: 'Lỗi sai chết người khi bệnh nhân đã có HA tụt 85/65.',
              rationale: 'Bệnh nhân có sốc bắt buộc điều trị tại ICU.',
            },
            {
              id: 'opt_b3_4',
              text: 'Hội chứng vành cấp không ST chênh lên.',
              isCorrect: false,
              score: 5,
              rationale: 'Không phải bệnh cảnh chính gây ra sốc ngày thứ 5.',
            },
          ],
        },
        {
          id: 'q_b_4_rx',
          pillar: 'management_safety',
          pillarTitle: '4. Chiến Lược Hồi Sức Dịch Dè Dặt & An Toàn',
          pillarWeight: 25,
          prompt:
            'Chiến lược xử trí hồi sức huyết động bước đầu an toàn nhất cho cụ bà này là gì?',
          options: [
            {
              id: 'opt_b4_1',
              text: 'Dồn nhanh Ringer Lactate 15–20 ml/kg/h như người trẻ tuổi để giải quyết nhanh tình trạng sốc.',
              isCorrect: false,
              score: 0,
              penaltyNote: 'Nguy cơ phù phổi cấp và suy hô hấp cấp tử vong ngay trong giờ đầu tiên!',
              rationale: 'Rất nguy hiểm! Bệnh nhân suy tim EF 36% không thể dung nạp lượng dịch tinh thể 800-1000 ml trong 1 giờ.',
            },
            {
              id: 'opt_b4_2',
              text: 'Truyền Ringer Lactate dè dặt 7–10 ml/kg/h (khoảng 350–500 ml/h), thở oxy canula 3 l/p, theo dõi sát nhịp thở, ran phổi và IVC; chuẩn bị sớm dịch keo (Albumin 20% hoặc Dextran) nếu kém đáp ứng.',
              isCorrect: true,
              score: 25,
              rationale: 'Rất xuất sắc! Đây là nguyên tắc hồi sức dịch tinh tế ở người có bệnh nền tim mạch: Bù thể tích thận trọng, giữ dịch trong lòng mạch và theo dõi sát chỉ số ứ trệ phổi.',
            },
            {
              id: 'opt_b4_3',
              text: 'Tuyệt đối cấm truyền dịch, tiêm ngay Furosemide 40mg tĩnh mạch và bắt đầu Noradrenaline.',
              isCorrect: false,
              score: 0,
              penaltyNote: 'Tiêm lợi tiểu cho bệnh nhân đang giảm thể tích nội mạch (Hct 46%) sẽ đẩy bệnh nhân vào sốc mất bù tử vong.',
              rationale: 'Sai lầm nghiêm trọng! Furosemide làm cạn kiệt thêm lòng mạch đang thiếu dịch.',
            },
            {
              id: 'opt_b4_4',
              text: 'Chuyển viện ngay lập tức lên tuyến trên mà không xử trí gì vì ca này quá khó.',
              isCorrect: false,
              score: 0,
              penaltyNote: 'Không chuyển viện khi huyết động bệnh nhân chưa ổn định.',
              rationale: 'Bệnh nhân có thể tử vong trên đường vận chuyển nếu huyết áp không được nâng lên tối thiểu.',
            },
          ],
        },
      ],
      clinicalPearls: [
        {
          title: 'Tam Giác Hồi Sức Thận Trọng ở Bệnh Nhân Tim Mạch',
          context: 'Bệnh nhân suy tim mạn / bệnh thận mạn mắc Sốt xuất huyết Dengue có sốc.',
          action: 'Giảm tốc độ dịch tinh thể khởi đầu xuống 7–10 ml/kg/h thay vì 15 ml/kg/h, theo dõi lâm sàng mỗi 30 phút.',
          mechanism: 'Quả tim suy có đường cong Frank-Starling dẹt; bù dịch quá nhanh sẽ làm tăng áp lực mao mạch phổi bít vượt quá 18-20 mmHg gây thoát dịch vào phế nang.',
        },
        {
          title: 'Giá trị của POCUS (Siêu âm tại giường)',
          context: 'Phân vân giữa thiếu dịch (do Dengue) và thừa dịch (do Suy tim).',
          action: 'Đặt đầu dò siêu âm mặt cắt dưới sườn đo tĩnh mạch chủ dưới (IVC) và mặt cắt phổi tìm B-lines.',
          mechanism: 'IVC xẹp hoàn toàn khi hít vào là bằng chứng không thể chối cãi của việc thiếu thể tích tuần hoàn hiệu dụng.',
        },
        {
          title: 'Chỉ định sớm Dung dịch keo (Colloid / Albumin)',
          context: 'Bệnh nhân suy tim sốc Dengue không thể dung nạp thể tích dịch tinh thể lớn.',
          action: 'Chuyển sớm sang Albumin hoặc Dextran khi dịch tinh thể đạt ngưỡng giới hạn an toàn.',
          mechanism: 'Dịch keo có áp lực keo cao, giữ nước trong lòng mạch tốt hơn gấp 3-4 lần dịch tinh thể, giúp nâng huyết áp với thể tích truyền ít hơn nhiều.',
        },
      ],
      cognitivePitfalls: [
        {
          biasName: 'Framing Effect (Hiệu ứng đóng khung phác đồ)',
          biasType: 'framing',
          warningText: 'Bác sĩ áp dụng máy móc văn bản phác đồ "Sốc Dengue = Ringer Lactate 15 ml/kg/h" mà không điều chỉnh theo cơ địa bệnh nhân.',
          remedyAction: 'Luôn nhớ nguyên tắc: "Điều trị người bệnh có bệnh, không điều trị bệnh trên lý thuyết".',
        },
        {
          biasName: 'Availability Bias (Thiên kiến kinh nghiệm sẵn có)',
          biasType: 'availability',
          warningText: 'Thấy bệnh nhân suy tim vào viện có ran ẩm thì phản xạ ngay lập tức tiêm Furosemide mà quên bệnh nhân đang bị sốt xuất huyết kẹp HA.',
          remedyAction: 'Luôn kiểm tra Hct và hiệu áp trước khi dùng bất kỳ thuốc lợi tiểu nào.',
        },
      ],
      ebmReferences: [
        'AHA/ACC 2022 Guideline for the Management of Heart Failure: Hemodynamic Assessment in Critical Illness.',
        'Hướng dẫn chẩn đoán, điều trị Sốt xuất huyết Dengue Bộ Y tế 2023 - Phụ lục Xử trí ca bệnh có bệnh nền phối hợp.',
      ],
    },

    // =========================================================================
    // NHÁNH C: BIẾN CHỨNG XUẤT HUYẾT NỘI TẠNG ẨN (HCT TỤT NGHỊCH THƯỜNG)
    // =========================================================================
    {
      branchId: 'branch_c_occult_internal_bleeding',
      branchTitle: 'Nhánh C: Nam 30 Tuổi — Xuất Huyết Nội Tạng Ẩn (Hct Tụt Sâu Đột Ngột)',
      branchBadge: 'Bẫy Tử Vong Lâm Sàng (Y6 - Cấp Cứu)',
      branchDescription:
        'Bệnh nhân Dengue ngày thứ 5 rơi vào sốc tụt huyết áp nhưng Hematocrit không tăng mà tụt sâu từ 46% xuống 26%, bụng chướng đau. Bác sĩ phải nhận diện xuất huyết nội ẩn và truyền máu khẩn cấp thay vì tiếp tục dồn dịch tinh thể.',
      targetAudience: 'Bác sĩ Cấp cứu, Bác sĩ Ngoại khoa, Học viên Sau đại học',
      demographics: {
        id: 'demo_adult_bleeding',
        label: 'Nam, 30 tuổi, 65kg',
        age: 30,
        gender: 'nam',
        weightKg: 65,
        occupation: 'Kinh doanh tự do',
      },
      comorbidity: {
        id: 'comorb_peptic_ulcer',
        label: 'Tiền sử Viêm loét dạ dày tá tràng (có uống thuốc giảm đau Ibuprofen ngày 2)',
        description: 'Bệnh nhân tự ý mua thuốc hạ sốt Ibuprofen 400mg uống 3 lần trong 2 ngày đầu.',
        riskFlag: 'bleeding',
        cautionNotes: [
          'Nguy cơ xuất huyết tiêu hóa bùng phát dữ dội do NSAIDs kết hợp giảm tiểu cầu nặng của Dengue.',
          'Mất máu cấp trong lòng ống tiêu hóa hoặc sau phúc mạc có thể diễn tiến âm thầm không ói ra máu ngay.',
        ],
      },
      timelineDay: 5,
      vitalsVariant: {
        id: 'vitals_decompensated_bleeding_shock',
        statusLabel: 'Sốc mất bù tụt huyết áp (HA 80/60 mmHg, mạch rất nhanh 132 l/p)',
        hemodynamicState: 'decompensated_shock',
        vitals: {
          vNhiet: '36.2',
          vMach: '132',
          vHATT: '80',
          vHATTr: '60',
          vTho: '26',
          vSpo2: '95',
        },
      },
      labVariant: {
        id: 'lab_occult_bleeding',
        statusLabel: 'Hematocrit tụt đột ngột (26%) nghịch thường với tình trạng sốc!',
        labs: {
          lBC: '6.5',
          lTC: '18',
          lHct: '26',
          lGlu: '5.2',
          lTrop: '<0.01',
        },
        additionalLabs: {
          'Hematocrit lúc vào viện (N4)': '46%',
          'Hematocrit hiện tại (N5)': '26% (Giảm 20% tuyệt đối chỉ sau 12 giờ!)',
          'Tiểu cầu': '18 G/L (Giảm nặng)',
          'Đông máu toàn bộ': 'PT 48%, aPTT 54s, Fibrinogen 1.4 g/L',
          'Siêu âm ổ bụng khẩn': 'Dịch tự do ổ bụng không thuần trạng (nghi máu), quai ruột ứ dịch và hơi',
          'Đặt sonde dạ dày': 'Hút ra 300ml dịch nâu đen lẫn máu đông cục',
        },
        bleedingFlag: true,
      },
      treatmentResponse: {
        id: 'resp_blood_transfusion_hemostasis',
        label: 'Đáp ứng hồi phục sau khi truyền Khối hồng cầu và nội soi can thiệp',
        vitalsAfter1h: 'Mạch giảm còn 104 l/p, HA nâng lên 100/65 mmHg sau 2 đơn vị Hồng cầu lắng',
        urineOutput: '0.9 mL/kg/h',
        clinicalOutcome: 'Cầm máu ổ loét dạ dày thành công qua nội soi, kiểm soát huyết động an toàn.',
      },
      chiefComplaint: 'Bụng đau chướng tăng dần, hoa mắt chóng mặt dữ dội, huyết áp tụt sâu',
      historyOfPresentIllness:
        'Bệnh nhân sốt ngày thứ 5. Ở nhà có tự mua thuốc Ibuprofen uống. Sáng ngày 5, sau khi hết sốt, bệnh nhân thấy hoa mắt, vã mồ hôi lạnh, choáng váng khi ngồi dậy, đau bụng thượng vị dữ dội và bụng chướng căng dần. Chưa thấy nôn ra máu hay đi cầu phân đen ra ngoài.',
      physicalExamSummary:
        'Bệnh nhân lơ mơ nhẹ, da niêm nhợt nhạt rõ rệt (khác hẳn vẻ mặt sung huyết đỏ của Dengue thông thường). Chi lạnh ngắt, mạch quay nhanh nhỏ như sợi chỉ (132 l/p). Huyết áp tụt: 80/60 mmHg. Bụng chướng nhẹ, ấn đau khắp bụng, phản ứng nhẹ vùng thượng vị. Sonde dạ dày ra dịch bã cà phê lẫn máu tươi.',
      
      // OSCE Questions for Branch C
      questions: [
        {
          id: 'q_c_1_history',
          pillar: 'history_exam',
          pillarTitle: '1. Khai thác Yếu Tố Nguy Cơ & Dấu Chứng Xuất Huyết Ẩn',
          pillarWeight: 25,
          prompt:
            'Yếu tố nào trong tiền sử và bệnh sử kết hợp với da niêm nhợt nhạt là cờ đỏ báo động nghi ngờ xuất huyết tiêu hóa ẩn dữ dội ở bệnh nhân này?',
          options: [
            {
              id: 'opt_c1_1',
              text: 'Bệnh nhân không tiêm phòng cúm mùa trước đó.',
              isCorrect: false,
              score: 0,
              rationale: 'Không liên quan đến biến chứng xuất huyết.',
            },
            {
              id: 'opt_c1_2',
              text: 'Tiền sử viêm loét dạ dày kết hợp việc tự ý uống thuốc hạ sốt nhóm NSAIDs (Ibuprofen) trong pha sốt.',
              isCorrect: true,
              score: 25,
              rationale: 'Chính xác! NSAIDs ức chế COX-1 làm tổn thương niêm mạc dạ dày và ức chế kết tập tiểu cầu, khi gặp virus Dengue gây giảm tiểu cầu nặng sẽ bùng phát xuất huyết tiêu hóa ồ ạt.',
            },
            {
              id: 'opt_c1_3',
              text: 'Bệnh nhân bị muỗi vằn Aedes đốt vào ban ngày.',
              isCorrect: false,
              score: 0,
              rationale: 'Đây là phương thức lây truyền tự nhiên của Dengue, không phải yếu tố gây xuất huyết tiêu hóa.',
            },
            {
              id: 'opt_c1_4',
              text: 'Bệnh nhân có xét nghiệm NS1 dương tính.',
              isCorrect: false,
              score: 5,
              rationale: 'NS1 chỉ khẳng định nhiễm virus, không chỉ điểm biến chứng xuất huyết ẩn.',
            },
          ],
        },
        {
          id: 'q_c_2_labs',
          pillar: 'labs_workup',
          pillarTitle: '2. Giải Mã Nghịch Lý Hematocrit (Hct Tụt Trong Pha Sốc)',
          pillarWeight: 25,
          prompt:
            'Tại sao một bệnh nhân đang sốc Dengue nặng lại có Hematocrit giảm sâu từ 46% xuống 26% (thay vì tăng cao do cô đặc máu)?',
          options: [
            {
              id: 'opt_c2_1',
              text: 'Do phòng xét nghiệm làm sai kết quả, cần yêu cầu xét nghiệm lại và không làm gì trong lúc chờ đợi.',
              isCorrect: false,
              score: 0,
              penaltyNote: 'Lãng phí thời gian vàng cấp cứu dẫn đến bệnh nhân tử vong vì mất máu!',
              rationale: 'Không được trì hoãn khi lâm sàng đã có da niêm nhợt, tụt HA và sonde dạ dày ra máu.',
            },
            {
              id: 'opt_c2_2',
              text: 'Bệnh nhân bị xuất huyết nội tạng cấp tính gây mất cả khối hồng cầu lẫn huyết tương, dẫn đến Hematocrit tụt nhanh nghịch thường với tình trạng sốc.',
              isCorrect: true,
              score: 25,
              rationale: 'Rất xuất sắc! Đây là định luật sống còn trong cấp cứu Dengue: Sốc Dengue kèm Hct tụt hoặc không tăng tương ứng với mức độ sốc = Xuất huyết nội tạng ẩn!',
            },
            {
              id: 'opt_c2_3',
              text: 'Do virus Dengue tự phá hủy toàn bộ tế bào hồng cầu trong máu.',
              isCorrect: false,
              score: 0,
              rationale: 'Virus Dengue không gây tan máu tán huyết ồ ạt như sốt rét.',
            },
            {
              id: 'opt_c2_4',
              text: 'Do bệnh nhân đã tự uống quá nhiều nước lọc ở nhà gây pha loãng máu.',
              isCorrect: false,
              score: 5,
              rationale: 'Uống nước không thể làm tụt Hct từ 46% xuống 26% kèm sốc tụt HA 80/60 mmHg.',
            },
          ],
        },
        {
          id: 'q_c_3_dx',
          pillar: 'diagnosis_staging',
          pillarTitle: '3. Chẩn Đoán Xác Quyết Biến Chứng Đe Dọa Sinh Mạng',
          pillarWeight: 25,
          prompt:
            'Chẩn đoán lâm sàng toàn diện và cấp bách nhất cần ghi vào hồ sơ bệnh án là gì?',
          options: [
            {
              id: 'opt_c3_1',
              text: 'Sốt xuất huyết Dengue nặng thể Sốc xuất huyết (Dengue Shock with Severe Bleeding) biến chứng Xuất huyết tiêu hóa trên cấp tính mất máu nặng (ICD-10 A97.2).',
              isCorrect: true,
              score: 25,
              rationale: 'Chính xác hoàn toàn! Phân định rõ thể sốc do xuất huyết nặng đe dọa tử vong.',
            },
            {
              id: 'opt_c3_2',
              text: 'Sốt xuất huyết Dengue thể cảnh báo đơn thuần.',
              isCorrect: false,
              score: 0,
              penaltyNote: 'Chẩn đoán sai mức độ nguy kịch.',
              rationale: 'Bệnh nhân đã sốc mất bù tụt huyết áp 80/60 mmHg, không thể là thể cảnh báo.',
            },
            {
              id: 'opt_c3_3',
              text: 'Thủng tạng rỗng ngoại khoa cấp cứu.',
              isCorrect: false,
              score: 5,
              rationale: 'Có thể nhầm lẫn do đau bụng, nhưng bệnh cảnh Dengue và Hct tụt cấp chỉ điểm xuất huyết tiêu hóa.',
            },
            {
              id: 'opt_c3_4',
              text: 'Viêm dạ dày cấp tính.',
              isCorrect: false,
              score: 0,
              rationale: 'Quá xem nhẹ tình trạng sốc mất máu cấp tính.',
            },
          ],
        },
        {
          id: 'q_c_4_rx',
          pillar: 'management_safety',
          pillarTitle: '4. Y Lệnh Hồi Sức Sinh Tử: Truyền Máu Khẩn',
          pillarWeight: 25,
          prompt:
            'Hành động hồi sức ưu tiên số 1 mang tính quyết định cứu sống người bệnh lúc này là gì?',
          options: [
            {
              id: 'opt_c4_1',
              text: 'Tiếp tục tăng tốc độ truyền Ringer Lactate lên 20–25 ml/kg/h để nâng huyết áp.',
              isCorrect: false,
              score: 0,
              penaltyNote: 'Sai lầm chết người! Dồn dịch tinh thể lúc này làm loãng máu cực độ, rửa trôi cục máu đông và làm bệnh nhân tử vong nhanh chóng!',
              rationale: 'Cấm dồn dịch tinh thể khi Hct tụt sâu trong sốc mất máu.',
            },
            {
              id: 'opt_c4_2',
              text: 'Lấy máu thử phản ứng chéo khẩn cấp, chỉ định truyền ngay Khối hồng cầu (5–10 ml/kg) cùng nhóm máu, tiêm tĩnh mạch Esomeprazole 80mg bolus và hội chẩn nội soi cầm máu.',
              isCorrect: true,
              score: 25,
              rationale: 'Tuyệt vời! Đây là y lệnh cứu mạng duy nhất: Bù lại lượng máu đã mất bằng máu toàn phần / khối hồng cầu, kết hợp ức chế toan dạ dày liều cao và chuẩn bị can thiệp cầm máu.',
            },
            {
              id: 'opt_c4_3',
              text: 'Truyền 10 đơn vị tiểu cầu đậm đặc trước, chờ tiểu cầu tăng mới truyền máu.',
              isCorrect: false,
              score: 5,
              rationale: 'Ưu tiên số 1 là truyền hồng cầu lắng để phục hồi khả năng vận chuyển oxy mô, tiểu cầu và huyết tương tươi đông lạnh sẽ phối hợp theo phác đồ truyền máu khối lượng lớn.',
            },
            {
              id: 'opt_c4_4',
              text: 'Chỉ định chuyển mổ mở bụng thám sát ngay lập tức.',
              isCorrect: false,
              score: 0,
              penaltyNote: 'Bệnh nhân đang sốc nặng chưa hồi sức huyết động, đưa vào mổ sẽ tử vong trên bàn mổ.',
              rationale: 'Phải hồi sức nâng huyết áp bằng truyền máu và nội soi can thiệp trước.',
            },
          ],
        },
      ],
      clinicalPearls: [
        {
          title: 'Quy luật "Nghịch lý Hematocrit"',
          context: 'Bệnh nhân sốt xuất huyết rơi vào sốc tụt huyết áp nhưng Hct không tăng hoặc tụt sâu đột ngột.',
          action: 'Nghĩ ngay đến xuất huyết nội tạng ẩn (đường tiêu hóa, sau phúc mạc, cơ thắt lưng chậu) và đặt sonde dạ dày kiểm tra.',
          mechanism: 'Thoát huyết tương làm tăng Hct; nếu Hct tụt trong khi huyết áp đang tụt chứng tỏ có hiện tượng mất máu toàn phần ra khỏi lòng mạch.',
        },
        {
          title: 'Tuyệt đối tránh "Bẫy dồn dịch tinh thể khi mất máu"',
          context: 'Bệnh nhân sốc xuất huyết Dengue.',
          action: 'Không được dồn dịch tinh thể tốc độ cao kéo dài; chuyển ngay sang truyền Khối hồng cầu và huyết tương tươi.',
          mechanism: 'Dịch tinh thể không mang oxy và làm loãng yếu tố đông máu, phá vỡ cục máu đông tự nhiên tại vị trí mạch máu tổn thương (Dilutional coagulopathy).',
        },
        {
          title: 'Cấm kỵ tuyệt đối nhóm thuốc NSAIDs trong sốt Dengue',
          context: 'Bệnh nhân sốt cao nghi ngờ hoặc chưa loại trừ Dengue.',
          action: 'Chỉ được dùng Paracetamol liều an toàn (10-15 mg/kg/lần, tối đa 60 mg/kg/ngày). Tuyệt đối cấm Aspirin, Ibuprofen, Diclofenac.',
          mechanism: 'NSAIDs ức chế kết tập tiểu cầu không hồi phục và gây loét niêm mạc dạ dày, là thủ phạm hàng đầu gây tử vong do xuất huyết tiêu hóa ở bệnh nhân Dengue.',
        },
      ],
      cognitivePitfalls: [
        {
          biasName: 'Confirmation Bias (Thiên kiến xác nhận)',
          biasType: 'confirmation',
          warningText: 'Bác sĩ khăng khăng nghĩ bệnh nhân sốc là do thoát dịch (vì Dengue thường sốc do thoát dịch) mà bỏ qua màu sắc da nhợt nhạt và Hct tụt.',
          remedyAction: 'Chủ động tìm kiếm bằng chứng phản nghiệm: "Liệu có lý do nào khác làm huyết áp tụt ngoài thoát huyết tương không?"',
        },
        {
          biasName: 'Availability Bias (Bẫy mắt thấy mới tin)',
          biasType: 'availability',
          warningText: 'Không thấy bệnh nhân nôn ra máu hay đi ngoài phân đen nên nghĩ bệnh nhân không có xuất huyết.',
          remedyAction: 'Nhớ rằng máu có thể đọng 1–2 lít trong lòng ruột hoặc khoang sau phúc mạc trước khi xuất hiện ra ngoài.',
        },
      ],
      ebmReferences: [
        'Quyết định số 2760/QĐ-BYT Bộ Y Tế 2023 - Hướng dẫn chẩn đoán & xử trí Xuất huyết nặng trong Sốt xuất huyết Dengue.',
        'British Society of Gastroenterology (BSG) Guideline on Acute Lower and Upper Gastrointestinal Bleeding.',
      ],
    },
  ],
};
