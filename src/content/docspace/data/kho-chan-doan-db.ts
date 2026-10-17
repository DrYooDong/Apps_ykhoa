/**
 * CliniPortal Kho Chẩn Đoán Database
 * Sẵn sàng tiếp nhận bệnh lý mới từ Prompts (Clean Slate)
 */
import type { DiseaseReactionChainDefinition } from './diagnostic-criteria-database';

export const KHO_CHAN_DOAN_DATABASE: Record<string, DiseaseReactionChainDefinition> = {
  tang_huyet_ap: {
    icdCode: 'I10',
    icdPrefixes: ['I10', 'I11', 'I12', 'I13', 'I15'],
    diseaseName: 'Tăng huyết áp',
    specialty: 'Tim mạch',
    severity: 'urgent',
    summary: 'Tăng huyết áp là tình trạng áp lực máu tác động lên thành động mạch tăng cao mạn tính, xác định khi Huyết áp tâm thu ≥ 140 mmHg và/hoặc Huyết áp tâm trương ≥ 90 mmHg qua ít nhất 2 lần đo chuẩn tại 2 thời điểm khác nhau (hoặc đo liên tục ABPM/HBPM theo ESC/VNHA 2022). Cần tầm soát tổn thương cơ quan đích và phân định nguyên phát hay thứ phát.',
    goldStandard: 'Đo huyết áp tại phòng khám chuẩn ≥ 140/90 mmHg ở ≥ 2 lần khám khác nhau; hoặc Huyết áp lưu động 24h (ABPM) ban ngày ≥ 135/85 mmHg, trung bình 24h ≥ 130/80 mmHg; hoặc Huyết áp tự đo tại nhà (HBPM) ≥ 135/85 mmHg theo khuyến cáo ESC/ESH và VNHA 2022.',
    criteriaRule: {
      minMajorRequired: 1,
      ruleDescription: 'Huyết áp tâm thu ≥ 140 mmHg HOẶC Huyết áp tâm trương ≥ 90 mmHg ở ≥ 2 lần đo, hoặc có tiền căn đang dùng thuốc hạ áp.',
    },
    criteria: [
      {
        id: 'tc_hatt_tang_cao',
        type: 'major',
        label: 'Huyết áp tâm thu ≥ 140 mmHg',
        description: 'Đo HA đúng quy trình, người bệnh nghỉ ngơi tối thiểu 5 phút, không dùng cà phê hoặc thuốc lá trước đó 30 phút.',
        sourceGuideline: 'Khuyến cáo Phân hội Tăng huyết áp Việt Nam (VNHA 2022)',
        cdssRole: 'dt',
        weight: 5.0,
      },
      {
        id: 'tc_hattr_tang_cao',
        type: 'major',
        label: 'Huyết áp tâm trương ≥ 90 mmHg',
        description: 'HA tâm trương đo bằng thính chẩn tiếng Korotkoff pha V.',
        sourceGuideline: 'Khuyến cáo Phân hội Tăng huyết áp Việt Nam (VNHA 2022)',
        cdssRole: 'dt',
        weight: 4.5,
      },
      {
        id: 'tien_su_tang_huyet_ap',
        type: 'major',
        label: 'Tiền sử được chẩn đoán THA hoặc đang điều trị thuốc hạ áp',
        description: 'Bệnh nhân có sổ khám bệnh, đơn thuốc hoặc tự khai tiền căn tăng huyết áp mạn tính.',
        sourceGuideline: 'Hồ sơ bệnh án điện tử EMR',
        cdssRole: 'dt',
        weight: 4.5,
      },
    ],
    classificationSystems: [
      {
        systemName: 'Phân độ THA theo ISH 2020 / ESC 2024 / VNHA 2022',
        classes: [
          {
            classId: 'tha_do_1',
            className: 'Tăng huyết áp Độ 1',
            criteria: 'HATT 140 - 159 mmHg và/hoặc HATTr 90 - 99 mmHg',
            icdSuffix: 'I10',
          },
          {
            classId: 'tha_do_2',
            className: 'Tăng huyết áp Độ 2',
            criteria: 'HATT 160 - 179 mmHg và/hoặc HATTr 100 - 109 mmHg',
            icdSuffix: 'I10',
          },
          {
            classId: 'tha_do_3',
            className: 'Tăng huyết áp Độ 3',
            criteria: 'HATT ≥ 180 mmHg và/hoặc HATTr ≥ 110 mmHg',
            icdSuffix: 'I10',
          },
          {
            classId: 'con_tang_huyet_ap',
            className: 'Cơn tăng huyết áp (Khẩn cấp / Cấp cứu)',
            criteria: 'HATT ≥ 180 mmHg và/hoặc HATTr ≥ 120 mmHg có hoặc không kèm tổn thương cơ quan đích cấp tính (HMOD)',
            icdSuffix: 'I10.1',
          },
        ],
      },
    ],
    etiologyOptions: [
      {
        category: 'Tăng huyết áp nguyên phát (Vô căn / Essential Hypertension) — Chiếm 90-95%',
        specificCauses: [
          {
            name: 'Tăng huyết áp nguyên phát (vô căn) kết hợp các yếu tố nguy cơ tim mạch: tuổi tác, lối sống, ăn mặn, đề kháng insulin, xơ cứng thành mạch theo tuổi',
            confidence: 'probable',
            recommendedWorkup: [
              'Tổng phân tích nước tiểu (tìm Protein niệu / Microalbumin niệu)',
              'Creatinine huyết thanh & Ước tính eGFR (CKD-EPI)',
              'Điện giải đồ máu (Na+, K+, Cl-)',
              'Đường huyết đói (Glucose) và Lipid máu toàn phần (Cholesterol, Triglyceride, LDL-C)',
              'Điện tâm đồ 12 chuyển đạo (tầm soát phì đại thất trái Sokolow-Lyon)'
            ],
          },
        ],
      },
      {
        category: 'Tăng huyết áp thứ phát (Secondary Hypertension) — Chiếm 5-10%',
        specificCauses: [
          {
            name: 'Bệnh nhu mô thận mạn tính (Viêm cầu thận, Bệnh thận đái tháo đường, Thận đa nang)',
            confidence: 'suspected',
            recommendedWorkup: [
              'Siêu âm Doppler 2 thận và hệ tiết niệu',
              'Định lượng Protein niệu 24h hoặc Tỷ số UACR',
              'Sinh thiết thận khi có chỉ định'
            ],
          },
          {
            name: 'Hẹp động mạch thận (Xơ vữa hoặc Loạn sản sợi cơ)',
            confidence: 'suspected',
            recommendedWorkup: [
              'Siêu âm Doppler động mạch thận',
              'Chụp MSCT hoặc MRI mạch máu thận có cản quang'
            ],
          },
          {
            name: 'Bệnh lý nội tiết: U tủy thượng thận (Pheochromocytoma), Cường Aldosterone nguyên phát (Hội chứng Conn), Hội chứng Cushing',
            confidence: 'suspected',
            recommendedWorkup: [
              'Định lượng Metanephrine / Normetanephrine tự do niệu 24h',
              'Tỷ số Aldosterone / Renin huyết tương (ARR)',
              'Nghiệm pháp ức chế Dexamethasone liều thấp qua đêm'
            ],
          },
        ],
      },
    ],
    protocol: {
      title: 'Phác đồ điều trị Tăng huyết áp phối hợp kiểm soát mục tiêu',
      guideline: 'Khuyến cáo Phân hội Tăng huyết áp Việt Nam (VNHA) & ESC 2024',
      targetGoals: [
        'Huyết áp mục tiêu chung: < 130/80 mmHg (nếu dung nạp tốt)',
        'Người cao tuổi (≥ 65 tuổi): HATT mục tiêu 130 - 139 mmHg, HATTr 70 - 79 mmHg',
        'Kiểm soát toàn diện các yếu tố nguy cơ tim mạch đồng mắc'
      ],
      initialManagement: [
        'Thay đổi lối sống: Giảm muối (< 5g NaCl/ngày), hạn chế bia rượu, tập thể dục ≥ 150 phút/tuần',
        'Khởi trị phối hợp đôi liều thấp cố định (Single-pill combination): ACEi/ARB + CCB hoặc Thiazide-like',
      ],
      firstLineDrugs: [
        {
          drugName: 'Amlodipine',
          class: 'Chẹn kênh calci (DHP-CCB)',
          route: 'Uống',
          dosage: '5 mg',
          frequency: '1 lần/ngày vào buổi sáng',
          instructions: 'Uống vào buổi sáng, theo dõi phù mắt cá chân.',
          isFirstLine: true,
        },
        {
          drugName: 'Telmisartan',
          class: 'Chẹn thụ thể Angiotensin II (ARB)',
          route: 'Uống',
          dosage: '40 mg',
          frequency: '1 lần/ngày',
          instructions: 'Phối hợp với Amlodipine để tăng hiệu quả hạ áp và giảm tác dụng phụ phù chân.',
          isFirstLine: true,
        },
      ],
      secondLineDrugs: [],
      supportiveCare: ['Chế độ ăn DASH', 'Giảm cân nếu thừa cân BMI ≥ 23'],
    },
    complications: [
      {
        name: 'Tổn thương cơ quan đích tim mạch: Phì đại thất trái, Suy tim, Bệnh mạch vành',
        timeframe: 'chronic',
        warningSigns: 'Đau thắt ngực khi gắng sức, khó thở về đêm, phù hai chi dưới',
        preventiveAction: 'Kiểm soát HA < 130/80 mmHg bền vững, đo ECG và Siêu âm tim định kỳ',
        onCallAlertText: 'Khám chuyên khoa Tim mạch nếu có triệu chứng suy tim',
      },
      {
        name: 'Tổn thương cơ quan đích não: Đột quỵ thiếu máu não thoáng qua (TIA) hoặc Xuất huyết não',
        timeframe: 'acute_24h',
        warningSigns: 'Yếu liệt nửa người, méo miệng, nói ngọng, đau đầu dữ dội, lú lẫn',
        preventiveAction: 'Hạ áp an toàn, tránh để tụt HA quá nhanh trong cơn cấp tính',
        onCallAlertText: 'Báo động Code Stroke khẩn cấp nếu có dấu hiệu thần kinh định vị',
      },
      {
        name: 'Tổn thương cơ quan đích thận: Bệnh thận mạn do tăng huyết áp (Xơ cứng tiểu động mạch thận)',
        timeframe: 'chronic',
        warningSigns: 'Tiểu bọt, phù mắt cá chân, Creatinine máu tăng dần, eGFR giảm',
        preventiveAction: 'Ưu tiên thuốc ức chế hệ RAAS (ACEi/ARB) để bảo vệ thận',
        onCallAlertText: 'Theo dõi eGFR và Kali máu mỗi 3-6 tháng',
      },
    ],
    monitoringLabs: ['lHATT', 'lHATTr', 'lCre', 'lGlu', 'lDienGiai'],
    vaultPathways: [
      {
        khoCode: 'CD',
        khoName: 'Kho Tiêu Chuẩn CĐ',
        articleTitle: 'Tiêu chuẩn chẩn đoán Tăng huyết áp theo VNHA/ESC',
        searchKeyword: 'tăng huyết áp chẩn đoán',
      },
      {
        khoCode: 'PDDT',
        khoName: 'Kho Phác Đồ Điều Trị',
        articleTitle: 'Phác đồ hạ áp bậc thang phối hợp đôi liều cố định',
        searchKeyword: 'phác đồ điều trị tăng huyết áp',
      },
    ],
  },
};
