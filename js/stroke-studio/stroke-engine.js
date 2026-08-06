/**
 * Neurology & Stroke Diagnostic Engine (Stroke Engine)
 * CliniPortal - Neurology & Emergency Decision Support System
 * 
 * Logic 5 Tầng:
 * 1. Time-Window Analysis (Thanh Cửa sổ Thời gian: ≤ 4.5h rtPA, 4.5h-24h EVT DAWN/DEFUSE-3)
 * 2. NIHSS Evaluator (Thang điểm NIHSS 11 mục & Phân loại độ nặng)
 * 3. rtPA Dose Calculator (0.9 mg/kg, max 90mg: Bolus 10% 1 min + Truyền 90% 60 min, Tính lọ Alteplase 50mg)
 * 4. rtPA Safety & Contraindication Checklist (HA > 185/110, PLT < 100k, INR > 1.7, NOAC, Tiền sử XHN/CT)
 * 5. ICH Score Sub-Engine (Xuất huyết não: GCS, Thể tích khối máu tụ, IVH, Vị trí dưới lều & Tử vong 30 ngày)
 */

window.StrokeEngine = (function () {
  'use strict';

  function analyze(input) {
    var strokeType = input.strokeType || 'ischemic'; // 'ischemic' hoặc 'hemorrhagic'
    var onsetHours = input.onsetTimeHours !== '' && input.onsetTimeHours !== null ? Number(input.onsetTimeHours) : 2.0;
    var weight = input.bodyWeight ? Number(input.bodyWeight) : 60;

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
    // TẦNG 3: Máy Tính Liều rtPA (rtPA Dosage Calculator)
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
    // TẦNG 4: Bảng Kiểm Chống Chỉ Định rtPA (Safety Checklist)
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
    if (plt < 100000) {
      contraindications.push('Tiểu cầu < 100,000 / μL (' + plt + ' / μL)');
    }
    if (inr > 1.7) {
      contraindications.push('INR > 1.7 (' + inr.toFixed(2) + ')');
    }
    if (glu < 50) {
      contraindications.push('Hạ đường huyết (Glucose < 50 mg/dL - Cần loại trừ Stroke Mimic)');
    }

    // 3. Tiền sử cờ đỏ
    if (sc.hasIchHistory) contraindications.push('Tiền sử Xuất huyết não hoặc Dị dạng mạch máu não');
    if (sc.hasRecentHeadTrauma) contraindications.push('Chấn thương đầu nặng hoặc Phẫu thuật sọ não < 3 tháng');
    if (sc.hasRecentMajorSurgery) contraindications.push('Phẫu thuật lớn hoặc Chấn thương nặng < 14 ngày');
    if (sc.hasGiBleed) contraindications.push('Xuất huyết tiêu hóa hoặc Tiết niệu < 21 ngày');
    if (sc.hasLargeInfarct) contraindications.push('CT/MRI cho thấy Nhồi máu diện rộng (> 1/3 lãnh thổ ĐM não giữa)');
    if (sc.isTakingNoac) contraindications.push('Đang dùng thuốc chống đông đường uống thế hệ mới (NOAC) < 48 giờ');

    var isRtpaEligible = strokeType === 'ischemic' && isRtpaWindow && !isBpTooHigh && contraindications.length === 0;

    // -------------------------------------------------------------
    // TẦNG 5: ICH Score Sub-Engine (Xuất huyết não)
    // -------------------------------------------------------------
    var ichResult = null;
    if (strokeType === 'hemorrhagic') {
      var gcs = input.gcsScore ? Number(input.gcsScore) : 15;
      var vol = input.ichVolume ? Number(input.ichVolume) : 15; // mL
      var isIvh = Boolean(input.hasIvh);
      var isInfratentorial = Boolean(input.isInfratentorial);
      var age = input.age ? Number(input.age) : 65;

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
          content: 'Bệnh nhân có cờ đỏ chống chỉ định: <strong>' + contraindications.join('; ') + '</strong>. Nếu onset ≤ 24h và nghi tắc mạch lớn (LVO) $\rightarrow$ Chụp CTA khẩn xét Can thiệp Lấy huyết khối cơ học (EVT).'
        });
      }

      if (isEvtWindow || (isRtpaWindow && totalNihss >= 6)) {
        recommendations.push({
          title: '🎯 CHỈ ĐỊNH TẦM SOÁT TẮC MẠCH MÁU LỚN (LVO) & CAN THIỆP EVT',
          type: 'warning',
          content: 'NIHSS ≥ 6 hoặc trong cửa sổ 4.5h-24h. Chỉ định Chụp CTA Động mạch não/Cổ khẩn cấp. Nếu phát hiện tắc ĐM Não giữa (M1/M2), ĐM Cảnh trong (ICA) hoặc ĐM Thân nền $\rightarrow$ Chuyển DSA can thiệp lấy huyết khối bằng Stent Retriever ngay lập tức.'
        });
      }
    } else {
      recommendations.push({
        title: '🚨 HƯỚNG DẪN XỬ TRÍ XUẤT HUYẾT NÃO CẤP (ICH)',
        type: 'danger',
        content: '1) Kiểm soát huyết áp khẩn cấp: Hạ SBP xuống 130-140 mmHg bằng Nicardipine/Labetalol IV;<br>' +
                 '2) Đảo ngược chống đông khẩn cấp (PCC / Vitamin K / Idarucizumab / Andexanet alfa);<br>' +
                 '3) Hội chẩn Ngoại Thần kinh xét mổ giải áp hoặc dẫn lưu não thất (EVD) nếu có IVH hoặc nguy cơ tụt kẹt não.'
      });
    }

    // Active Flowchart Nodes
    var activeNodes = ['node-start', 'node-ct-scan'];
    if (strokeType === 'ischemic') {
      activeNodes.push('node-ischemic');
      if (isRtpaWindow) {
        activeNodes.push('node-rtpa-window');
        if (isRtpaEligible) activeNodes.push('node-rtpa-execute');
        else if (isBpTooHigh) activeNodes.push('node-bp-control');
        else activeNodes.push('node-rtpa-contra');
      } else if (isEvtWindow) {
        activeNodes.push('node-evt-window');
        activeNodes.push('node-evt-execute');
      } else {
        activeNodes.push('node-late-window');
      }
    } else {
      activeNodes.push('node-hemorrhagic');
      activeNodes.push('node-ich-score');
    }

    return {
      strokeType: strokeType,
      onsetHours: onsetHours,
      nihss: {
        total: totalNihss,
        severity: nihssSeverity,
        badgeClass: nihssBadgeClass,
        items: nihssItems
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
      ichResult: ichResult,
      recommendations: recommendations,
      activeNodes: activeNodes
    };
  }

  return {
    analyze: analyze
  };
})();
