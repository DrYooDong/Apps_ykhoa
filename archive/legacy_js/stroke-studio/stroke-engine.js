/**
 * Neurology & Stroke Diagnostic Engine (Stroke Engine) Pro Edition
 * CliniPortal - Emergency & ICU Stroke Workstation Engine
 * 
 * Logic 8 Tầng:
 * 1. Time-Window Analysis (rtPA ≤ 4.5h, EVT 4.5h-24h DAWN/DEFUSE-3)
 * 2. NIHSS Evaluator (Thang điểm NIHSS 11 mục)
 * 3. ASPECTS Score Evaluator (CT Brain 10 vùng lãnh thổ ĐM Não Giữa)
 * 4. RACE Score Evaluator (Tầm soát Tắc mạch máu lớn LVO)
 * 5. rtPA Dose Calculator (0.9 mg/kg, max 90mg: 10% Bolus, 90% Infusion)
 * 6. rtPA Safety Checklist (Chống chỉ định tuyệt đối & tương đối)
 * 7. Acute Stroke BP Control & Antihypertensive Titrator (Nicardipine / Labetalol)
 * 8. ICH Score Sub-Engine (Xuất huyết nội sọ & Tiên lượng tử vong 30 ngày)
 */

window.StrokeEngine = (function () {
  'use strict';

  function analyze(input) {
    var strokeType = input.strokeType || 'ischemic'; // 'ischemic' hoặc 'hemorrhagic'
    var onsetHours = input.onsetTimeHours !== '' && input.onsetTimeHours !== null ? Number(input.onsetTimeHours) : 2.0;
    var weight = input.bodyWeight ? Number(input.bodyWeight) : 60;
    var age = input.age ? Number(input.age) : 65;

    // -------------------------------------------------------------
    // TẦNG 1: Thanh Cửa Sổ Thời Gian (Time-Window Analysis)
    // -------------------------------------------------------------
    var isRtpaWindow = onsetHours <= 4.5;
    var isEvtWindow = onsetHours > 4.5 && onsetHours <= 24.0;
    var isLateWindow = onsetHours > 24.0;

    var timeWindowLabel = 'Cửa Sổ Vàng Tiêu Sợi Huyết Tĩnh Mạch (rtPA Window)';
    var timeWindowBadge = 'badge-danger';
    var timeWindowSummary = 'Khởi phát ' + onsetHours.toFixed(1) + ' giờ (≤ 4.5h). Đủ điều kiện xét Chỉ định Thuốc tiêu sợi huyết tĩnh mạch (rtPA / Alteplase). Cần kiểm tra bảng kiểm an toàn chống chỉ định ngay lập tức!';

    if (isEvtWindow) {
      timeWindowLabel = 'Cửa Sổ Mở Rộng Can Thiệp Nội Mạch Lấy Huyết Khối (EVT Window)';
      timeWindowBadge = 'badge-warning';
      timeWindowSummary = 'Khởi phát ' + onsetHours.toFixed(1) + ' giờ (4.5h - 24h). Quá cửa sổ tiêm rtPA tĩnh mạch thông thường. CHỈ ĐỊNH CHỤP CTA/CT Perfusion/MRI tìm TẮC MẠCH MÁU LỚN (LVO) để Can thiệp lấy huyết khối cơ học bằng Stent (EVT) theo thử nghiệm DAWN / DEFUSE-3!';
    } else if (isLateWindow) {
      timeWindowLabel = 'Cửa Sổ Muộn (> 24 Giờ)';
      timeWindowBadge = 'badge-info';
      timeWindowSummary = 'Khởi phát ' + onsetHours.toFixed(1) + ' giờ (> 24h). Quá cửa sổ tái thông rtPA & EVT thông thường. Tập trung điều trị nội khoa tích cực, chống đông/kháng tiểu cầu phòng ngừa thứ phát & phục hồi chức năng sớm.';
    }

    // -------------------------------------------------------------
    // TẦNG 2: NIHSS Evaluator (Thang điểm NIHSS 11 Mục)
    // -------------------------------------------------------------
    var n = input.nihssScores || {};
    var nihssItems = {
      i1a: Number(n.i1a || 0),
      i1b: Number(n.i1b || 0),
      i1c: Number(n.i1c || 0),
      i2: Number(n.i2 || 0),
      i3: Number(n.i3 || 0),
      i4: Number(n.i4 || 0),
      i5a: Number(n.i5a || 0),
      i5b: Number(n.i5b || 0),
      i6a: Number(n.i6a || 0),
      i6b: Number(n.i6b || 0),
      i7: Number(n.i7 || 0),
      i8: Number(n.i8 || 0),
      i9: Number(n.i9 || 0),
      i10: Number(n.i10 || 0),
      i11: Number(n.i11 || 0)
    };

    var totalNihss = 0;
    for (var key in nihssItems) {
      totalNihss += nihssItems[key];
    }

    var nihssSeverity = 'Nhẹ (Minor Stroke)';
    var nihssBadgeClass = 'badge-success';

    if (totalNihss >= 21) {
      nihssSeverity = 'Nặng (Severe Stroke)';
      nihssBadgeClass = 'badge-danger';
    } else if (totalNihss >= 16) {
      nihssSeverity = 'Trung bình - Nặng (Moderate-Severe Stroke)';
      nihssBadgeClass = 'badge-danger';
    } else if (totalNihss >= 5) {
      nihssSeverity = 'Trung bình (Moderate Stroke)';
      nihssBadgeClass = 'badge-warning';
    }

    // -------------------------------------------------------------
    // TẦNG 3: ASPECTS Score (CT Brain 10 Vùng Lãnh Thổ MCA)
    // -------------------------------------------------------------
    var aspectsAffected = input.aspectsAffected || []; // mảng các mã vùng bị giảm đậm độ: ['C', 'L', 'IC', 'I', 'M1'...]
    var aspectsScore = Math.max(0, 10 - aspectsAffected.length);
    var aspectsStatus = 'Thuận lợi cho tái thông (ASPECTS ≥ 6)';
    var aspectsBadge = 'badge-success';

    if (aspectsScore < 6) {
      aspectsStatus = 'Nhồi máu diện rộng / Thất bại tái thông cao (ASPECTS < 6)';
      aspectsBadge = 'badge-danger';
    }

    // -------------------------------------------------------------
    // TẦNG 4: RACE Score (Rapid Arterial Occlusion Evaluation - Tầm soát LVO)
    // -------------------------------------------------------------
    var race = input.raceScores || {};
    var raceFacial = Number(race.facial || 0); // 0-2
    var raceArm = Number(race.arm || 0); // 0-2
    var raceLeg = Number(race.leg || 0); // 0-2
    var raceGaze = Number(race.gaze || 0); // 0-1
    var raceCortical = Number(race.cortical || 0); // 0-2 (Aphasia/Agnosia)

    var totalRace = raceFacial + raceArm + raceLeg + raceGaze + raceCortical;
    var isHighLvoRisk = totalRace >= 5;
    var raceStatus = isHighLvoRisk ? 'Nguy cơ Tắc Mạch Máu Lớn (LVO) CAO (RACE ≥ 5)' : 'Nguy cơ LVO Thấp - Trung bình (RACE < 5)';
    var raceBadge = isHighLvoRisk ? 'badge-danger' : 'badge-info';

    // -------------------------------------------------------------
    // TẦNG 5: Máy Tính Liều rtPA (rtPA Dosage Calculator)
    // -------------------------------------------------------------
    var rawDose = 0.9 * weight;
    var totalRtpaDose = Math.min(rawDose, 90.0); // Max 90mg
    var bolusDose = totalRtpaDose * 0.10; // 10% Bolus 1 min
    var infusionDose = totalRtpaDose * 0.90; // 90% Infusion 60 min
    var alteplaseVials = Math.ceil(totalRtpaDose / 50.0); // Lọ 50mg

    var rtpaDosingInfo = {
      weight: weight,
      totalDose: totalRtpaDose,
      bolusDose: bolusDose,
      infusionDose: infusionDose,
      vials50mg: alteplaseVials
    };

    // -------------------------------------------------------------
    // TẦNG 6: Bảng Kiểm Chống Chỉ Định rtPA (Safety Checklist)
    // -------------------------------------------------------------
    var sbp = input.sbp ? Number(input.sbp) : 130;
    var dbp = input.dbp ? Number(input.dbp) : 80;
    var plt = input.platelets ? Number(input.platelets) : 200000;
    var inr = input.inr ? Number(input.inr) : 1.0;
    var glu = input.glucose ? Number(input.glucose) : 110;

    var sc = input.safetyChecklist || {};

    var contraindications = [];
    var warnings = [];

    // 1. Huyết áp
    var isBpTooHigh = sbp > 185 || dbp > 110;
    if (isBpTooHigh) {
      warnings.push({
        title: 'Huyết áp Cực cao (> 185/110 mmHg)',
        desc: 'Huyết áp hiện tại ' + sbp + '/' + dbp + ' mmHg. CHỐNG CHỈ ĐỊNH TIÊM rtPA CHO ĐẾN KHI HẠ HA KHẨN CẤP < 185/110 mmHg bằng Labetalol 10-20mg IV hoặc Nicardipine 5mg/h IV!'
      });
    }

    // 2. Xét nghiệm máu
    if (plt < 100000) contraindications.push('Tiểu cầu < 100,000 / μL (' + plt + ' / μL)');
    if (inr > 1.7) contraindications.push('INR > 1.7 (' + inr.toFixed(2) + ')');
    if (glu < 50) contraindications.push('Hạ đường huyết (Glucose < 50 mg/dL - Cần loại trừ Stroke Mimic)');

    // 3. Tiền sử cờ đỏ
    if (sc.hasIchHistory) contraindications.push('Tiền sử Xuất huyết não hoặc Dị dạng mạch máu toàn bộ');
    if (sc.hasRecentHeadTrauma) contraindications.push('Chấn thương đầu nặng hoặc Phẫu thuật sọ脑 < 3 tháng');
    if (sc.hasRecentMajorSurgery) contraindications.push('Phẫu thuật lớn hoặc Chấn thương nặng < 14 ngày');
    if (sc.hasGiBleed) contraindications.push('Xuất huyết tiêu hóa hoặc Tiết niệu < 21 ngày');
    if (sc.hasLargeInfarct || aspectsScore < 6) contraindications.push('CT/MRI nhồi máu diện rộng (ASPECTS < 6 hoặc > 1/3 lãnh thổ ĐM não giữa)');
    if (sc.isTakingNoac) contraindications.push('Đang dùng thuốc chống đông đường uống thế hệ mới (NOAC) < 48 giờ');

    var isRtpaEligible = strokeType === 'ischemic' && isRtpaWindow && !isBpTooHigh && contraindications.length === 0;

    // -------------------------------------------------------------
    // TẦNG 7: Phác Đồ Hạ Huyết Áp & Tính Liều Thuốc Vận Mạch Hạ Áp
    // -------------------------------------------------------------
    var bpTargetText = '';
    var bpProtocolGuide = '';
    var nicardipineInfusionRate = 0; // mL/h (pha 50mg/500mL = 0.1 mg/mL hoặc bơm tiêm điện 10mg/50mL = 0.2 mg/mL)

    if (strokeType === 'ischemic') {
      if (isRtpaEligible || isRtpaWindow) {
        bpTargetText = 'Mục tiêu Huyết áp Tiền tiêm rtPA: SBP < 185 mmHg & DBP < 110 mmHg. Hậu rtPA (24h đầu): SBP < 180 mmHg & DBP < 105 mmHg.';
        bpProtocolGuide = 'Nicardipine IV: Bắt đầu 5 mg/h (25 mL/h nồng độ 0.2 mg/mL). Tăng liều 2.5 mg/h mỗi 5-15 phút (Tối đa 15 mg/h) cho đến khi đạt HA mục tiêu.<br>Labetalol IV: 10-20 mg IV chầm chậm 1-2 phút, có thể lặp lại hoặc truyền 2-8 mg/min.';
      } else {
        bpTargetText = 'Nhồi máu não không dùng rtPA: Duy trì Huyết áp đáp ứng (Permissive Hypertension) up to 220/120 mmHg. Chỉ hạ HA khi SBP > 220 mmHg hoặc DBP > 120 mmHg (hoặc tổn thương đích tim/thận).';
        bpProtocolGuide = 'Nếu SBP > 220 mmHg: Hạ HA nhẹ nhàng 15% trong 24h đầu bằng Nicardipine/Labetalol IV.';
      }
    } else {
      bpTargetText = 'Xuất huyết não cấp (ICH): Hạ SBP khẩn cấp xuống 130 - 140 mmHg trong vòng 1 giờ (Thử nghiệm INTERACT-2 & ATTACH-2) để giảm sự lan rộng của khối máu tụ.';
      bpProtocolGuide = 'Khởi đầu Nicardipine 5 mg/h IV truyền liên tục. Tăng liều mỗi 5-10 phút đến khi SBP 130-140 mmHg. Tránh giảm SBP < 120 mmHg.';
    }

    if (sbp > 140) {
      var desiredNicardipineDoseMgHr = Math.min(15, Math.max(5, (sbp - 140) * 0.15 + 5));
      nicardipineInfusionRate = desiredNicardipineDoseMgHr * 5; // mL/h với nồng độ 0.2 mg/mL (10mg/50mL)
    }

    // -------------------------------------------------------------
    // TẦNG 8: ICH Score Sub-Engine (Xuất huyết nội sọ)
    // -------------------------------------------------------------
    var ichResult = null;
    if (strokeType === 'hemorrhagic') {
      var gcs = input.gcsScore ? Number(input.gcsScore) : 15;
      var vol = input.ichVolume ? Number(input.ichVolume) : 15; // mL
      var isIvh = Boolean(input.hasIvh);
      var isInfratentorial = Boolean(input.isInfratentorial);

      var gcsPts = 0;
      if (gcs <= 4) gcsPts = 2;
      else if (gcs <= 12) gcsPts = 1;

      var volPts = vol >= 30 ? 1 : 0;
      var ivhPts = isIvh ? 1 : 0;
      var infraPts = isInfratentorial ? 1 : 0;
      var agePts = age >= 80 ? 1 : 0;

      var totalIchScore = gcsPts + volPts + ivhPts + infraPts + agePts;

      var mortalityRates = ['0%', '13%', '26%', '72%', '97%', '100%', '100%'];
      var mortality30d = mortalityRates[totalIchScore] || '100%';

      ichResult = {
        score: totalIchScore,
        mortality30d: mortality30d,
        gcsPts: gcsPts,
        volPts: volPts,
        ivhPts: ivhPts,
        infraPts: infraPts,
        agePts: agePts
      };
    }

    // Recommendations
    var recommendations = [];

    if (strokeType === 'ischemic') {
      if (isRtpaEligible) {
        recommendations.push({
          title: '🚨 ĐỦ ĐIỀU KIỆN TIÊM THUỐC TIÊU SỢI HUYẾT (rtPA / Alteplase)',
          type: 'danger',
          content: 'Bệnh nhân trong cửa sổ vàng ' + onsetHours.toFixed(1) + 'h và không có chống chỉ định. Tiến hành khởi động <strong>rtPA liều ' + totalRtpaDose.toFixed(1) + ' mg</strong>: Tiêm Bolus IV ' + bolusDose.toFixed(1) + ' mg trong 1 phút, sau đó truyền IV phần còn lại ' + infusionDose.toFixed(1) + ' mg trong 60 phút. Theo dõi huyết áp mỗi 15 phút!'
        });
      } else if (isRtpaWindow && isBpTooHigh) {
        recommendations.push({
          title: '⚠️ CẦN HẠ HUYẾT ÁP KHẨN CẤP ĐỂ DÙNG rtPA',
          type: 'warning',
          content: 'Huyết áp > 185/110 mmHg. Dùng Labetalol 10-20mg IV tiêm chậm 1-2 min hoặc Nicardipine 5mg/h IV truyền tĩnh mạch. Khi HA < 185/110 mmHg và ổn định $\\rightarrow$ Tiến hành tiêm rtPA ngay.'
        });
      } else if (contraindications.length > 0) {
        recommendations.push({
          title: '⛔ CHỐNG CHỈ ĐỊNH TIÊM rtPA TĨNH MẠCH',
          type: 'danger',
          content: 'Bệnh nhân có cờ đỏ chống chỉ định: <strong>' + contraindications.join('; ') + '</strong>. Nếu onset ≤ 24h và nghi tắc mạch lớn (LVO) $\\rightarrow$ Chụp CTA khẩn xét Can thiệp Lấy huyết khối cơ học (EVT).'
        });
      }

      if (isHighLvoRisk || isEvtWindow || (isRtpaWindow && totalNihss >= 6)) {
        recommendations.push({
          title: '🎯 CHỈ ĐỊNH TẦM SOÁT TẮC MẠCH MÁU LỚN (LVO) & CAN THIỆP EVT',
          type: 'warning',
          content: 'Điểm RACE = ' + totalRace + ' (≥ 5) hoặc NIHSS = ' + totalNihss + ' (≥ 6). Nguy cơ cao tắc ĐM Não giữa (M1/M2), ĐM Cảnh trong (ICA) hoặc ĐM Thân nền. Chỉ định chụp CTA ĐM Não/Cổ khẩn cấp và chuyển DSA Can thiệp lấy huyết khối bằng Stent Retriever ngay lập tức!'
        });
      }
    } else {
      recommendations.push({
        title: '🚨 HƯỚNG DẪN XỬ TRÍ XUẤT HUYẾT NÃO CẤP (ICH)',
        type: 'danger',
        content: '1) Kiểm soát huyết áp khẩn cấp: Hạ SBP xuống 130-140 mmHg bằng Nicardipine/Labetalol IV;<br>' +
                 '2) Đảo ngược chống đông khẩn cấp (PCC / Vitamin K / Idarucizumab / Andexanet alfa);<br>' +
                 '3) Hội chẩn Ngoại Thần kinh xét mổ giải áp hoặc dẫn lưu não thất (EVD) nếu có IVH hoặc nguy cơ tụt kẹt brainstem.'
      });
    }

    // Summary Text for EMR Copy
    var summaryReportText = '[BÁO CÁO CẤP CỨU ĐỘT QUỴ NÃO CẤP]\n' +
      '• Thể bệnh: ' + (strokeType === 'ischemic' ? 'Nhồi máu brain cấp' : 'Xuất huyết não (ICH)') + '\n' +
      '• Thời gian khởi phát (Onset): ' + onsetHours.toFixed(1) + ' giờ (' + timeWindowLabel + ')\n' +
      '• Sinh hiệu: HA ' + sbp + '/' + dbp + ' mmHg | Cân nặng: ' + weight + ' kg | Age: ' + age + '\n' +
      '• Thang điểm NIHSS: ' + totalNihss + ' điểm (' + nihssSeverity + ')\n' +
      '• ASPECTS Score: ' + aspectsScore + '/10 (' + aspectsStatus + ')\n' +
      '• RACE Score (LVO): ' + totalRace + '/9 (' + raceStatus + ')\n';

    if (strokeType === 'ischemic') {
      summaryReportText += '• Khuyến cáo rtPA: ' + (isRtpaEligible ? 'ĐỦ ĐIỀU KIỆN rtPA' : 'Không dùng / Chống chỉ định (' + (contraindications.join(', ') || 'Quá cửa sổ/HA cao') + ')') + '\n' +
        '• Liều rtPA (0.9mg/kg): Tổng ' + totalRtpaDose.toFixed(1) + ' mg (Bolus 10%: ' + bolusDose.toFixed(1) + ' mg, Truyền 90%: ' + infusionDose.toFixed(1) + ' mg - ' + alteplaseVials + ' lọ 50mg)\n';
    } else if (ichResult) {
      summaryReportText += '• ICH Score: ' + ichResult.score + ' điểm | Tiên lượng tử vong 30 ngày: ' + ichResult.mortality30d + '\n';
    }
    summaryReportText += '• Mục tiêu HA: ' + bpTargetText + '\n' +
      '• Y lệnh hạ HA: Nicardipine 10mg/50mL truyền Bơm tiêm điện tốc độ ' + nicardipineInfusionRate.toFixed(1) + ' mL/h (chỉnh theo SBP).';

    return {
      strokeType: strokeType,
      onsetHours: onsetHours,
      nihss: {
        total: totalNihss,
        severity: nihssSeverity,
        badgeClass: nihssBadgeClass,
        items: nihssItems
      },
      aspects: {
        score: aspectsScore,
        status: aspectsStatus,
        badgeClass: aspectsBadge,
        affected: aspectsAffected
      },
      race: {
        score: totalRace,
        isHighLvoRisk: isHighLvoRisk,
        status: raceStatus,
        badgeClass: raceBadge
      },
      timeWindow: {
        label: timeWindowLabel,
        badgeClass: timeWindowBadge,
        summary: timeWindowSummary,
        isRtpaWindow: isRtpaWindow,
        isEvtWindow: isEvtWindow,
        isLateWindow: isLateWindow
      },
      rtpaDosing: rtpaDosingInfo,
      safety: {
        isEligible: isRtpaEligible,
        isBpTooHigh: isBpTooHigh,
        contraindications: contraindications,
        warnings: warnings
      },
      bpControl: {
        targetText: bpTargetText,
        protocolGuide: bpProtocolGuide,
        nicardipineRate: nicardipineInfusionRate
      },
      ichResult: ichResult,
      recommendations: recommendations,
      summaryReportText: summaryReportText
    };
  }

  return {
    analyze: analyze
  };
})();
