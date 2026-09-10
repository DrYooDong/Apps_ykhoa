import { CaseTemplate } from "../types";

export const CLINICAL_CASES: CaseTemplate[] = [
  {
    id: "case-ais-mca",
    title: "Đột quỵ thiếu máu não cấp (AIS) - Tắc nhánh MCA M1 Trái",
    subtitle: "Khởi phát 2 giờ trước, liệt nửa người P + Thất ngôn Broca",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/40",
    category: "Cấp cứu Đột quỵ",
    summary: "Bệnh nhân nam 64 tuổi, tiền sử THA và Rung nhĩ, đột ngột yếu tay chân phải và không nói được khi đang ăn sáng lúc 7:30. Tiếp nhận lúc 9:30 (Cửa sổ 2h).",
    profile: {
      ageGroup: "Trung niên (41-65)",
      ageYears: 64,
      sex: "Nam",
      onsetTime: "Cấp tính (<3h)",
      onsetContext: "Đột ngột khi đang sinh hoạt (7h30 sáng)",
      chiefComplaint: "Yếu liệt nửa người phải và đột ngột không nói được (Mất ngôn ngữ)"
    },
    vitals: {
      hr: 98,
      sbp: 175,
      dbp: 102,
      rr: 18,
      spo2: 97,
      temp: 36.8,
      glucose: 128
    },
    mentalStatus: {
      gcsEye: 4,
      gcsVerbal: 2,
      gcsMotor: 6,
      gcsScore: 12,
      orientationTime: false,
      orientationPlace: true,
      orientationPerson: true,
      speechType: "Mất ngôn ngữ diễn đạt (Broca)",
      summary: "Tỉnh táo, tiếp xúc bằng cử chỉ tốt nhưng mất khả năng diễn đạt ngôn ngữ lời nói, hiểu mệnh lệnh cơ bản."
    },
    cranialNerves: {
      cn2_fields: "Bán manh đồng danh (P)",
      cn2_pupils: "Đều 2 bên (PERRLA)",
      cn2_rapd: false,
      cn3_4_6_motility: "Liếc ngang phối hợp mất",
      cn7_facial: "Liệt mặt trung ương P (liệt 1/4 dưới, nếp nhăn trán còn)",
      cn9_10_gag: "Bình thường",
      cn12_hypoglossal: "Lưỡi lệch Phải khi thè"
    },
    motorExam: {
      rightArmMRC: 1,
      leftArmMRC: 5,
      rightLegMRC: 2,
      leftLegMRC: 5,
      pronatorDrift: "Dương tính tay Phải",
      muscleTone: "Giảm trương lực cơ (Liệt mềm/LMN)",
      weaknessPattern: "Liệt nửa người bên Phải"
    },
    sensoryExam: {
      lightTouch: "Giảm nửa người Phải",
      dermatomeLevel: "Không có mức rõ",
      proprioception: "Mất cảm giác tư thế khớp",
      saddleAnesthesia: false
    },
    reflexes: {
      bicepsReflex: 1,
      tricepsReflex: 1,
      patellarReflex: 1,
      achillesReflex: 1,
      babinskiSign: "Dương tính bên Phải (Duỗi ngón cái)",
      clonus: "Không có",
      meningealSigns: false,
      kernigSign: false,
      brudzinskiSign: false
    },
    coordinationGait: {
      fingerToNose: "Quá tầm bên Phải (Dysmetria)",
      heelToShin: "Rối loạn bên Phải",
      rapidAlternating: "Mất đồng vận (Dysdiadochokinesia)",
      rombergTest: "Không đứng được cả khi mở mắt (Tiểu não)",
      gaitType: "Dáng đi phạt cỏ (Hemiparetic/Vung chân)"
    },
    redFlags: [
      "Khởi phát đột ngột dạng mạch máu",
      "Liệt nửa người đối bên kèm liệt mặt trung ương",
      "Thất ngôn thể Broca (vỏ não bán cầu ưu thế)",
      "Trong cửa sổ tiêu sợi huyết (<4.5 giờ)"
    ],
    expectedDiagnosis: "Nhồi máu não cấp tuần hoàn trước giờ thứ 2 - Tắc động mạch não giữa trái (MCA M1) / Cần chụp CTA sọ cổ khẩn để chỉ định tPA và EVT.",
    goldStandardNotes: "Theo Campbell & Kelly Handbook (Chương 11): Mục tiêu Door-to-needle < 60 phút. Chụp CT không cản quang loại trừ xuất huyết ngay. Nếu không chống chỉ định, dùng Alteplase IV 0.9 mg/kg (10% bolus, 90% truyền trong 60 phút). Chụp CTA đánh giá tắc mạch lớn LVO để lấy huyết khối cơ học (EVT) ngay trong 6h."
  },
  {
    id: "case-sah-thunderclap",
    title: "Xuất huyết dưới nhện (SAH) do vỡ phình mạch ACom",
    subtitle: "Đau đầu sét đánh (Thunderclap), nôn vọt, hội chứng màng não",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    category: "Cấp cứu Mạch máu não",
    summary: "Nữ 48 tuổi, đang nâng vật nặng thì đột ngột xuất hiện đau đầu dữ dội cực độ đạt đỉnh sau 30 giây ('đau đầu khủng khiếp nhất cuộc đời'), nôn nhiều, cứng gáy.",
    profile: {
      ageGroup: "Trung niên (41-65)",
      ageYears: 48,
      sex: "Nữ",
      onsetTime: "Cấp tính (<3h)",
      onsetContext: "Sau gắng sức/chấn thương (Nâng vật nặng)",
      chiefComplaint: "Đau đầu sét đánh dữ dội chưa từng có trong đời kèm nôn mửa và cứng cổ"
    },
    vitals: {
      hr: 104,
      sbp: 185,
      dbp: 110,
      rr: 20,
      spo2: 98,
      temp: 37.4,
      glucose: 110
    },
    mentalStatus: {
      gcsEye: 3,
      gcsVerbal: 4,
      gcsMotor: 6,
      gcsScore: 13,
      orientationTime: true,
      orientationPlace: true,
      orientationPerson: true,
      speechType: "Bình thường",
      summary: "Bệnh nhân vật vã vì đau đầu, kích thích ánh sáng (photophobia), lơ mơ nhẹ (Hunt & Hess độ 3)."
    },
    cranialNerves: {
      cn2_fields: "Bình thường",
      cn2_pupils: "Đều 2 bên (PERRLA)",
      cn2_rapd: false,
      cn3_4_6_motility: "Bình thường",
      cn7_facial: "Bình thường",
      cn9_10_gag: "Bình thường",
      cn12_hypoglossal: "Bình thường"
    },
    motorExam: {
      rightArmMRC: 5,
      leftArmMRC: 5,
      rightLegMRC: 5,
      leftLegMRC: 5,
      pronatorDrift: "Không có",
      muscleTone: "Bình thường",
      weaknessPattern: "Không yếu"
    },
    sensoryExam: {
      lightTouch: "Bình thường",
      dermatomeLevel: "Không có mức rõ",
      proprioception: "Bình thường",
      saddleAnesthesia: false
    },
    reflexes: {
      bicepsReflex: 2,
      tricepsReflex: 2,
      patellarReflex: 2,
      achillesReflex: 2,
      babinskiSign: "Âm tính (Đáp ứng gập)",
      clonus: "Không có",
      meningealSigns: true,
      kernigSign: true,
      brudzinskiSign: true
    },
    coordinationGait: {
      fingerToNose: "Chính xác",
      heelToShin: "Bình thường",
      rapidAlternating: "Bình thường",
      rombergTest: "Âm tính (Đứng vững khi nhắm mắt)",
      gaitType: "Bình thường"
    },
    redFlags: [
      "Đau đầu sét đánh đạt đỉnh trong <1 phút (Thunderclap)",
      "Hội chứng màng não (Cổ cứng, Kernig (+), Brudzinski (+))",
      "Sợ ánh sáng và nôn vọt",
      "Huyết áp cơn tăng vọt phản ứng"
    ],
    expectedDiagnosis: "Xuất huyết dưới nhện (SAH) độ 3 theo Hunt-Hess do vỡ phình động mạch thông trước (ACom).",
    goldStandardNotes: "Theo Campbell & Kelly Handbook (Chương 12): CT sọ não không tiêm cản quang nhạy >95% trong 48h. Nếu CT bình thường nhưng nghi ngờ cao: chọc dò dịch não tủy sau 6h tìm hồng cầu không đổi giữa 4 ống & xanthochromia. Hội chẩn Ngoại thần kinh khẩn, kiểm soát HA < 160 mmHg, dùng Nimodipine 60mg mỗi 4h x 21 ngày ngừa co thắt mạch."
  },
  {
    id: "case-meningitis",
    title: "Viêm màng não mủ cấp cộng đồng (Phế cầu - S. pneumoniae)",
    subtitle: "Sốt cao, đau đầu dữ dội, cổ cứng, ban xuất huyết rải rác",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/40",
    category: "Nhiễm trùng Thần kinh",
    summary: "Bệnh nhân nam 28 tuổi, sốt 39.5°C 2 ngày, đau đầu dữ dội kèm cứng cổ, sợ ánh sáng và lơ mơ dần. Không có tiền sử chấn thương.",
    profile: {
      ageGroup: "Thanh niên (18-40)",
      ageYears: 28,
      sex: "Nam",
      onsetTime: "Bán cấp (vài ngày)",
      onsetContext: "Sau sốt/nhiễm trùng hô hấp trên",
      chiefComplaint: "Sốt cao, đau đầu như búa bổ, cứng cổ, nôn ói và lơ mơ"
    },
    vitals: {
      hr: 118,
      sbp: 130,
      dbp: 80,
      rr: 22,
      spo2: 96,
      temp: 39.4,
      glucose: 105
    },
    mentalStatus: {
      gcsEye: 3,
      gcsVerbal: 4,
      gcsMotor: 6,
      gcsScore: 13,
      orientationTime: false,
      orientationPlace: true,
      orientationPerson: true,
      speechType: "Bình thường",
      summary: "Lơ mơ, trả lời chậm chạp, kích thích đau mở mắt và định hướng lộn xộn ngày tháng."
    },
    cranialNerves: {
      cn2_fields: "Bình thường",
      cn2_pupils: "Đều 2 bên (PERRLA)",
      cn2_rapd: false,
      cn3_4_6_motility: "Bình thường",
      cn7_facial: "Bình thường",
      cn9_10_gag: "Bình thường",
      cn12_hypoglossal: "Bình thường"
    },
    motorExam: {
      rightArmMRC: 5,
      leftArmMRC: 5,
      rightLegMRC: 5,
      leftLegMRC: 5,
      pronatorDrift: "Không có",
      muscleTone: "Bình thường",
      weaknessPattern: "Không yếu"
    },
    sensoryExam: {
      lightTouch: "Bình thường",
      dermatomeLevel: "Không có mức rõ",
      proprioception: "Bình thường",
      saddleAnesthesia: false
    },
    reflexes: {
      bicepsReflex: 2,
      tricepsReflex: 2,
      patellarReflex: 2,
      achillesReflex: 2,
      babinskiSign: "Âm tính (Đáp ứng gập)",
      clonus: "Không có",
      meningealSigns: true,
      kernigSign: true,
      brudzinskiSign: true
    },
    coordinationGait: {
      fingerToNose: "Chính xác",
      heelToShin: "Bình thường",
      rapidAlternating: "Bình thường",
      rombergTest: "Âm tính (Đứng vững khi nhắm mắt)",
      gaitType: "Bình thường"
    },
    redFlags: [
      "Tam chứng màng não: Sốt + Đau đầu + Cổ cứng",
      "Dấu hiệu Kernig & Brudzinski dương tính rõ",
      "Biến đổi tri giác cấp tính",
      "Bệnh cảnh đe dọa viêm màng não mủ"
    ],
    expectedDiagnosis: "Viêm màng não mủ cấp tính mắc phải cộng đồng (Nghi do Streptococcus pneumoniae hoặc N. meningitidis).",
    goldStandardNotes: "Theo Campbell & Kelly Handbook (Chương 14): Cấy máu ngay trước tiêm kháng sinh. Nếu có dấu hiệu tri giác suy giảm cần CT sọ não trước chọc dò dịch não tủy (loại trừ tăng ICP/thoát vị não). Không được trì hoãn kháng sinh: Ceftriaxone 2g q12h + Vancomycin 25-35 mg/kg liều tải + Dexamethasone 10mg tiêm 15 phút trước hoặc cùng lúc liều kháng sinh đầu tiên (giảm 30% tử vong và điếc)."
  },
  {
    id: "case-gbs-aidp",
    title: "Hội chứng Guillain-Barré (AIDP) - Liệt mềm hướng tâm",
    subtitle: "Yếu 2 chân lan dần lên 2 tay sau 2 tuần tiêu chảy, mất PXGX",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/40",
    category: "Bệnh lý Thần kinh cơ & Ngoại biên",
    summary: "Bệnh nhân nữ 32 tuổi, 2 tuần sau đợt viêm dạ dày ruột cấp thấy tê châm chích bàn chân, sau đó yếu dần hai chân không đi lên cầu thang được, yếu lan lên hai tay, nuốt nghẹn nhẹ.",
    profile: {
      ageGroup: "Thanh niên (18-40)",
      ageYears: 32,
      sex: "Nữ",
      onsetTime: "Bán cấp (vài ngày)",
      onsetContext: "Sau sốt/nhiễm trùng tiêu hóa 2 tuần",
      chiefComplaint: "Yếu hai chân tiến triển hướng tâm lên hai tay kèm tê bì ngọn chi và khó thở nhẹ khi nằm"
    },
    vitals: {
      hr: 92,
      sbp: 135,
      dbp: 85,
      rr: 24,
      spo2: 95,
      temp: 37.0,
      glucose: 98
    },
    mentalStatus: {
      gcsEye: 4,
      gcsVerbal: 5,
      gcsMotor: 6,
      gcsScore: 15,
      orientationTime: true,
      orientationPlace: true,
      orientationPerson: true,
      speechType: "Bình thường",
      summary: "Hoàn toàn tỉnh táo, nhận thức bình thường, giọng nói có phần yếu và hụt hơi (báo hiệu cơ hô hấp mệt mỏi)."
    },
    cranialNerves: {
      cn2_fields: "Bình thường",
      cn2_pupils: "Đều 2 bên (PERRLA)",
      cn2_rapd: false,
      cn3_4_6_motility: "Bình thường",
      cn7_facial: "Liệt mặt ngoại biên P (Bell's palsy, nhăn trán mất, hở mi)",
      cn9_10_gag: "Mất phản xạ nôn / Lưỡi gà lệch P",
      cn12_hypoglossal: "Bình thường"
    },
    motorExam: {
      rightArmMRC: 3,
      leftArmMRC: 3,
      rightLegMRC: 2,
      leftLegMRC: 2,
      pronatorDrift: "Cả hai tay",
      muscleTone: "Giảm trương lực cơ (Liệt mềm/LMN)",
      weaknessPattern: "Liệt tứ chi (Quadriplegia)"
    },
    sensoryExam: {
      lightTouch: "Mất cảm giác dạng găng - vớ",
      dermatomeLevel: "Không có mức rõ",
      proprioception: "Rung âm thoa giảm ngọn chi",
      saddleAnesthesia: false
    },
    reflexes: {
      bicepsReflex: 0,
      tricepsReflex: 0,
      patellarReflex: 0,
      achillesReflex: 0,
      babinskiSign: "Âm tính (Đáp ứng gập)",
      clonus: "Không có",
      meningealSigns: false,
      kernigSign: false,
      brudzinskiSign: false
    },
    coordinationGait: {
      fingerToNose: "Chính xác",
      heelToShin: "Rối loạn bên Phải",
      rapidAlternating: "Bình thường",
      rombergTest: "Không đứng được cả khi mở mắt (Tiểu não)",
      gaitType: "Dáng đi chân rũ / nhấc cao (Steppage - Liệt TK Mác/L5)"
    },
    redFlags: [
      "Yếu cơ tiến triển đối xứng hướng tâm (Ascending weakness)",
      "Mất toàn bộ phản xạ gân xương (Areflexia - 0/4)",
      "Có dấu hiệu khó thở hụt hơi và liệt dây thần kinh sọ (VII, IX, X)",
      "Dọa suy hô hấp thần kinh cơ"
    ],
    expectedDiagnosis: "Hội chứng Guillain-Barré (Viêm đa rễ dây thần kinh mất myelin cấp tính - AIDP) dọa suy hô hấp.",
    goldStandardNotes: "Theo Campbell & Kelly Handbook (Chương 7 & 20): Đánh giá FVC (<15-20 mL/kg) hoặc NIF (<-20 to -30 cmH2O). Nếu phải đặt nội khí quản: CHỐNG CHỈ ĐỊNH dùng Succinylcholine vì nguy cơ tăng kali máu tử vong; dùng Rocuronium 50% liều chuẩn. Điều trị đặc hiệu: IVIG 0.4 g/kg/ngày x 5 ngày hoặc thay huyết tương (Plasma exchange). Chống chỉ định Corticosteroids vì không có lợi và tăng biến chứng."
  },
  {
    id: "case-hints-vertigo-stroke",
    title: "Hội chứng tiền đình cấp (AVS) - Đột quỵ PICA / Wallenberg",
    subtitle: "Chóng mặt dữ dội liên tục, nystagmus đổi hướng, Skew deviation",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/40",
    category: "Cấp cứu Thần kinh sọ & Thân não",
    summary: "Nam 59 tuổi, tiền sử ĐTĐ và THA, xuất hiện chóng mặt quay cuồng liên tục kèm nôn ói dữ dội từ sáng sớm, đi loạng choạng ngã sang phải, nuốt sặc và nhìn đôi.",
    profile: {
      ageGroup: "Trung niên (41-65)",
      ageYears: 59,
      sex: "Nam",
      onsetTime: "Cấp tính (<3h)",
      onsetContext: "Đột ngột khi thức dậy sáng sớm",
      chiefComplaint: "Chóng mặt xoay tròn liên tục, nôn mửa dữ dội, nuốt nghẹn và đi ngã về bên phải"
    },
    vitals: {
      hr: 88,
      sbp: 168,
      dbp: 98,
      rr: 19,
      spo2: 97,
      temp: 36.7,
      glucose: 160
    },
    mentalStatus: {
      gcsEye: 4,
      gcsVerbal: 5,
      gcsMotor: 6,
      gcsScore: 15,
      orientationTime: true,
      orientationPlace: true,
      orientationPerson: true,
      speechType: "Nói đớ (Dysarthria)",
      summary: "Tỉnh táo nhưng chóng mặt nôn mửa nhiều, giọng nói hơi đớ và khàn nhẹ."
    },
    cranialNerves: {
      cn2_fields: "Bình thường",
      cn2_pupils: "Anisocoria (Lệch kích thước)",
      cn2_rapd: false,
      cn3_4_6_motility: "Liếc ngang phối hợp mất",
      cn5_sensory: "Tê bì nhánh V1, V2, V3",
      cn7_facial: "Bình thường",
      cn8_hearing: "Bình thường",
      cn9_10_gag: "Mất phản xạ nôn / Lưỡi gà lệch P",
      cn12_hypoglossal: "Bình thường"
    },
    motorExam: {
      rightArmMRC: 5,
      leftArmMRC: 5,
      rightLegMRC: 5,
      leftLegMRC: 5,
      pronatorDrift: "Không có",
      muscleTone: "Bình thường",
      weaknessPattern: "Không yếu"
    },
    sensoryExam: {
      lightTouch: "Mất cảm giác theo khoanh da",
      dermatomeLevel: "Không có mức rõ",
      proprioception: "Bình thường",
      saddleAnesthesia: false
    },
    reflexes: {
      bicepsReflex: 2,
      tricepsReflex: 2,
      patellarReflex: 2,
      achillesReflex: 2,
      babinskiSign: "Âm tính (Đáp ứng gập)",
      clonus: "Không có",
      meningealSigns: false,
      kernigSign: false,
      brudzinskiSign: false
    },
    coordinationGait: {
      fingerToNose: "Quá tầm bên Phải (Dysmetria)",
      heelToShin: "Rối loạn bên Phải",
      rapidAlternating: "Mất đồng vận (Dysdiadochokinesia)",
      rombergTest: "Không đứng được cả khi mở mắt (Tiểu não)",
      gaitType: "Dáng đi bước lảo đảo (Ataxic - Chân đế rộng)"
    },
    hints: {
      performed: true,
      headImpulse: "Bình thường (Đột quỵ nguy cơ cao)",
      nystagmus: "Đổi hướng khi liếc mắt (Hướng tâm - Nguy cơ đột quỵ)",
      testOfSkew: "Lệch trục nhãn cầu đứng (Skew deviation - Nguy cơ đột quỵ thân não)",
      conclusion: "HINTS dương tính kiểu TRUNG ƯƠNG (INFARCT): Head Impulse bình thường + Nystagmus đổi hướng + Test of Skew lệch trục đứng -> Khả năng cao đột quỵ thiếu máu tiểu não/thân não (PICA / Wallenberg)!"
    },
    redFlags: [
      "Bộ HINTS dương tính kiểu trung ương (INFARCT)",
      "Mất điều hòa tiểu não cùng bên (Dysmetria, Ataxia P)",
      "Hội chứng Horner cùng bên (Co đồng tử, sụp mi P)",
      "Giảm cảm giác nhiệt đau chéo (mặt P, thân T) - Hội chứng Wallenberg"
    ],
    expectedDiagnosis: "Nhồi máu cuống não/hành não bên phải (Hội chứng Wallenberg / Tắc nhánh PICA) - Đột quỵ tuần hoàn sau cấp tính.",
    goldStandardNotes: "Theo Campbell & Kelly Handbook (Chương 9 & 11): HINTS test nhạy hơn MRI não trong 24h đầu đối với đột quỵ tuần hoàn sau (MRI có tỷ lệ âm tính giả lên tới 19% trong 24h đầu!). Không được loại trừ đột quỵ chỉ dựa vào MRI âm tính khi lâm sàng và HINTS chỉ điểm tổn thương trung ương."
  },
  {
    id: "case-bppv-benign",
    title: "Chóng mặt tư thế kịch phát lành tính (BPPV)",
    subtitle: "Chóng mặt từng cơn <1 phút khi đổi tư thế, Dix-Hallpike dương tính",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    category: "Tiền đình Ngoại biên",
    summary: "Nữ 52 tuổi, than phiền chóng mặt dữ dội mỗi khi xoay trở người trên giường hoặc ngước nhìn lên cao, cơn kéo dài 20-30 giây rồi hết, không mất thính lực hay tê yếu.",
    profile: {
      ageGroup: "Trung niên (41-65)",
      ageYears: 52,
      sex: "Nữ",
      onsetTime: "Cấp tính (<3h)",
      onsetContext: "Khi thay đổi tư thế đầu / trở mình trên giường",
      chiefComplaint: "Chóng mặt xoay tròn từng cơn ngắn <30 giây khi xoay đầu, kèm buồn nôn"
    },
    vitals: {
      hr: 76,
      sbp: 125,
      dbp: 80,
      rr: 16,
      spo2: 99,
      temp: 36.6,
      glucose: 92
    },
    mentalStatus: {
      gcsEye: 4,
      gcsVerbal: 5,
      gcsMotor: 6,
      gcsScore: 15,
      orientationTime: true,
      orientationPlace: true,
      orientationPerson: true,
      speechType: "Bình thường",
      summary: "Tỉnh táo hoàn toàn, bình thường giữa các cơn."
    },
    cranialNerves: {
      cn2_fields: "Bình thường",
      cn2_pupils: "Đều 2 bên (PERRLA)",
      cn2_rapd: false,
      cn3_4_6_motility: "Bình thường",
      cn7_facial: "Bình thường",
      cn8_hearing: "Bình thường",
      cn9_10_gag: "Bình thường",
      cn12_hypoglossal: "Bình thường"
    },
    motorExam: {
      rightArmMRC: 5,
      leftArmMRC: 5,
      rightLegMRC: 5,
      leftLegMRC: 5,
      pronatorDrift: "Không có",
      muscleTone: "Bình thường",
      weaknessPattern: "Không yếu"
    },
    sensoryExam: {
      lightTouch: "Bình thường",
      dermatomeLevel: "Không có mức rõ",
      proprioception: "Bình thường",
      saddleAnesthesia: false
    },
    reflexes: {
      bicepsReflex: 2,
      tricepsReflex: 2,
      patellarReflex: 2,
      achillesReflex: 2,
      babinskiSign: "Âm tính (Đáp ứng gập)",
      clonus: "Không có",
      meningealSigns: false,
      kernigSign: false,
      brudzinskiSign: false
    },
    coordinationGait: {
      fingerToNose: "Chính xác",
      heelToShin: "Bình thường",
      rapidAlternating: "Bình thường",
      rombergTest: "Âm tính (Đứng vững khi nhắm mắt)",
      gaitType: "Bình thường"
    },
    hints: {
      performed: false,
      headImpulse: "Chưa đánh giá",
      nystagmus: "Không có",
      testOfSkew: "Không lệch",
      conclusion: "Chóng mặt tư thế kịch phát lành tính: Cần làm nghiệm pháp Dix-Hallpike thay vì HINTS (HINTS chỉ dùng cho chóng mặt liên tục AVS)."
    },
    redFlags: [],
    expectedDiagnosis: "Chóng mặt tư thế kịch phát lành tính (BPPV ống bán khuyên sau bên Phải).",
    goldStandardNotes: "Theo Campbell & Kelly Handbook (Chương 9): Nghiệm pháp Dix-Hallpike kích thích thấy nystagmus xoay ngược chiều kim đồng hồ, có thời gian tiềm tàng 2-5s, thoáng qua <30s và mỏi dần (fatigable). Điều trị vàng là nghiệm pháp tái định vị sỏi tai Epley Maneuver, không lạm dụng thuốc ức chế tiền đình kéo dài."
  },
  {
    id: "case-myasthenia-crisis",
    title: "Cơn Nhược cơ cấp (Myasthenic Crisis) dọa suy hô hấp",
    subtitle: "Sụp mi 2 bên, nhìn đôi tăng khi mỏi, khó nuốt, đếm một hơi <12",
    badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/40",
    category: "Thần kinh cơ",
    summary: "Nữ 26 tuổi đã chẩn đoán Myasthenia Gravis, đang điều trị Pyridostigmine, gần đây bị cảm cúm sốt nhẹ rồi xuất hiện sụp mi nặng, khó nuốt tăng, không thể ho khạc và đếm một hơi chỉ được 10.",
    profile: {
      ageGroup: "Thanh niên (18-40)",
      ageYears: 26,
      sex: "Nữ",
      onsetTime: "Cấp tính (<3h)",
      onsetContext: "Sau đợt nhiễm trùng đường hô hấp trên",
      chiefComplaint: "Sụp mi, nhìn đôi, nuốt nghẹn sặc và khó thở hụt hơi tăng dần"
    },
    vitals: {
      hr: 102,
      sbp: 120,
      dbp: 75,
      rr: 28,
      spo2: 94,
      temp: 37.6,
      glucose: 100
    },
    mentalStatus: {
      gcsEye: 4,
      gcsVerbal: 5,
      gcsMotor: 6,
      gcsScore: 15,
      orientationTime: true,
      orientationPlace: true,
      orientationPerson: true,
      speechType: "Bình thường",
      summary: "Bệnh nhân tỉnh táo, vẻ lo lắng, vã mồ hôi, nói hụt hơi, không giữ được cổ thẳng."
    },
    cranialNerves: {
      cn2_fields: "Bình thường",
      cn2_pupils: "Đều 2 bên (PERRLA)",
      cn2_rapd: false,
      cn3_4_6_motility: "Liếc ngang phối hợp mất",
      cn7_facial: "Bình thường",
      cn9_10_gag: "Mất phản xạ nôn / Lưỡi gà lệch P",
      cn12_hypoglossal: "Bình thường"
    },
    motorExam: {
      rightArmMRC: 3,
      leftArmMRC: 3,
      rightLegMRC: 3,
      leftLegMRC: 3,
      pronatorDrift: "Cả hai tay",
      muscleTone: "Bình thường",
      weaknessPattern: "Yếu gốc chi chiếm ưu thế (Cơ/NMJ)"
    },
    sensoryExam: {
      lightTouch: "Bình thường",
      dermatomeLevel: "Không có mức rõ",
      proprioception: "Bình thường",
      saddleAnesthesia: false
    },
    reflexes: {
      bicepsReflex: 2,
      tricepsReflex: 2,
      patellarReflex: 2,
      achillesReflex: 2,
      babinskiSign: "Âm tính (Đáp ứng gập)",
      clonus: "Không có",
      meningealSigns: false,
      kernigSign: false,
      brudzinskiSign: false
    },
    coordinationGait: {
      fingerToNose: "Chính xác",
      heelToShin: "Bình thường",
      rapidAlternating: "Bình thường",
      rombergTest: "Âm tính (Đứng vững khi nhắm mắt)",
      gaitType: "Dáng đi giảm đau (Antalgic)"
    },
    redFlags: [
      "Đếm 1 hơi thở chỉ tới 10 (<20 là dấu hiệu yếu cơ hô hấp nặng)",
      "Yếu cơ nâng cổ (Inability to lift head)",
      "Không kiểm soát được dịch tiết hầu họng (Dọa hít sặc)",
      "Yếu cơ hô hấp hạn chế (Restrictive respiratory failure)"
    ],
    expectedDiagnosis: "Cơn nhược cơ kịch phát cấp (Myasthenic Crisis) phân nhóm Osserman V / Dọa suy hô hấp.",
    goldStandardNotes: "Theo Campbell & Kelly Handbook (Chương 20): Thử nghiệm túi đá (Ice pack test) nhạy 77% (chườm mí mắt 2 phút thấy cải thiện sụp mi). Đo FVC & NIF. Tránh fluoroquinolones, aminoglycosides, thuốc an thần, và succinylcholine. Nhập Neuro-ICU ngay, lọc huyết tương (PE) hoặc IVIG."
  },
  {
    id: "case-cauda-equina",
    title: "Hội chứng chùm đuôi ngựa (Cauda Equina Syndrome) cấp",
    subtitle: "Đau thắt lưng lan xuống 2 chân, tê bì yên ngựa, bí tiểu cấp",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/40",
    category: "Cấp cứu Tủy sống & Cột sống",
    summary: "Nam 45 tuổi, đau thắt lưng dữ dội sau khi khuân chậu cây, sau đó lan xuống mặt sau 2 đùi, sáng nay thấy tê bì vùng hậu môn sinh dục và bí tiểu hoàn toàn.",
    profile: {
      ageGroup: "Trung niên (41-65)",
      ageYears: 45,
      sex: "Nam",
      onsetTime: "Cấp tính (<3h)",
      onsetContext: "Sau khuân vác nặng gây chấn thương đĩa đệm",
      chiefComplaint: "Đau thắt lưng lan xuống 2 chân, mất cảm giác vùng mông sinh dục và không tiểu được"
    },
    vitals: {
      hr: 82,
      sbp: 140,
      dbp: 90,
      rr: 16,
      spo2: 99,
      temp: 36.7,
      glucose: 104
    },
    mentalStatus: {
      gcsEye: 4,
      gcsVerbal: 5,
      gcsMotor: 6,
      gcsScore: 15,
      orientationTime: true,
      orientationPlace: true,
      orientationPerson: true,
      speechType: "Bình thường",
      summary: "Tỉnh táo hoàn toàn, đau đớn nhiều vùng thắt lưng và bàng quang căng trướng."
    },
    cranialNerves: {
      cn2_fields: "Bình thường",
      cn2_pupils: "Đều 2 bên (PERRLA)",
      cn2_rapd: false,
      cn3_4_6_motility: "Bình thường",
      cn7_facial: "Bình thường",
      cn9_10_gag: "Bình thường",
      cn12_hypoglossal: "Bình thường"
    },
    motorExam: {
      rightArmMRC: 5,
      leftArmMRC: 5,
      rightLegMRC: 3,
      leftLegMRC: 3,
      pronatorDrift: "Không có",
      muscleTone: "Giảm trương lực cơ (Liệt mềm/LMN)",
      weaknessPattern: "Liệt 2 chi dưới (Paraplegia)"
    },
    sensoryExam: {
      lightTouch: "Mất cảm giác theo khoanh da",
      dermatomeLevel: "S2-S5 (Yên ngựa - Saddle)",
      proprioception: "Bình thường",
      saddleAnesthesia: true
    },
    reflexes: {
      bicepsReflex: 2,
      tricepsReflex: 2,
      patellarReflex: 1,
      achillesReflex: 0,
      babinskiSign: "Âm tính (Đáp ứng gập)",
      clonus: "Không có",
      meningealSigns: false,
      kernigSign: false,
      brudzinskiSign: false
    },
    coordinationGait: {
      fingerToNose: "Chính xác",
      heelToShin: "Bình thường",
      rapidAlternating: "Bình thường",
      rombergTest: "Âm tính (Đứng vững khi nhắm mắt)",
      gaitType: "Dáng đi chân rũ / nhấc cao (Steppage - Liệt TK Mác/L5)"
    },
    redFlags: [
      "Tê bì vùng yên ngựa (Saddle anesthesia S2-S5)",
      "Bí tiểu cấp tính / mất trương lực cơ vòng bàng quang",
      "Mất phản xạ gân gót S1 và yếu gấp mu chân L5",
      "Cấp cứu ngoại khoa tủy sống khẩn cấp (<48 giờ)"
    ],
    expectedDiagnosis: "Hội chứng chùm đuôi ngựa cấp tính (Cauda Equina Syndrome) do thoát vị đĩa đệm thể trung tâm khối lớn L4-L5.",
    goldStandardNotes: "Theo Campbell & Kelly Handbook (Chương 8 & 17): Hội chứng chùm đuôi ngựa là cấp cứu ngoại thần kinh thực sự! Bắt buộc chụp MRI cột sống thắt lưng khẩn cấp (STAT MRI). Phẫu thuật giải ép vi phẫu trong vòng 48 giờ tối quan trọng để phục hồi chức năng cơ tròn và vận động."
  }
];
