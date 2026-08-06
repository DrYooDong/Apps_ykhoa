/**
 * Pleural Effusion Diagnostic Engine (Pleural Engine)
 * CliniPortal - Respiratory & Emergency Decision Support System
 * 
 * Logic 5 Tầng:
 * 1. Tiêu chuẩn Light Standard (Protein dMP/HT, LDH dMP/HT, LDH dMP > 2/3 ULN)
 * 2. SEAG (Serum-to-Pleural Fluid Albumin Gradient) & Protein Gradient - Sửa lỗi Pseudo-exudate do dùng lợi tiểu
 * 3. Phân tích Biomarkers đặc hiệu & Công thức Tế bào (ADA, Triglyceride/Cholesterol, Amylase, Lympho/Neutro/Eos)
 * 4. Phân tầng Tràn dịch Viêm phổi (Parapneumonic Risk Score & Chỉ định Dẫn lưu: pH < 7.2, Glucose < 60, LDH > 1000, Mủ)
 * 5. Tổng hợp Chẩn đoán & Định hướng Can thiệp Lâm sàng (Chọc dò, Dẫn lưu, Sinh thiết, VATS)
 */

window.PleuralEngine = (function () {
  'use strict';

  /**
   * Chuyển đổi đơn vị Protein / Albumin (g/L -> g/dL)
   */
  function toGramPerDl(val, unit) {
    if (val === null || val === undefined || isNaN(val)) return null;
    return unit === 'g/L' ? val / 10 : Number(val);
  }

  /**
   * Chuyển đổi đơn vị Glucose / Triglyceride / Cholesterol (mmol/L -> mg/dL)
   */
  function toMgPerDl(val, unit, type) {
    if (val === null || val === undefined || isNaN(val)) return null;
    if (unit === 'mmol/L') {
      if (type === 'glucose') return val * 18.018;
      if (type === 'triglyceride') return val * 88.57;
      if (type === 'cholesterol') return val * 38.67;
    }
    return Number(val);
  }

  /**
   * Hàm phân tích chính
   */
  function analyze(input) {
    var pProt = toGramPerDl(input.pfProtein, input.proteinUnit);
    var sProt = toGramPerDl(input.serumProtein, input.proteinUnit);
    var pLdh = input.pfLdh !== '' && input.pfLdh !== null ? Number(input.pfLdh) : null;
    var sLdh = input.serumLdh !== '' && input.serumLdh !== null ? Number(input.serumLdh) : null;
    var sLdhUln = input.serumLdhUln ? Number(input.serumLdhUln) : 200;

    var pAlb = toGramPerDl(input.pfAlbumin, input.albuminUnit);
    var sAlb = toGramPerDl(input.serumAlbumin, input.albuminUnit);

    var isDiuretic = Boolean(input.isDiureticOrChf);

    var pAda = input.pfAda !== '' && input.pfAda !== null ? Number(input.pfAda) : null;
    var pGlu = toMgPerDl(input.pfGlucose, input.glucoseUnit, 'glucose');
    var pPh = input.pfPh !== '' && input.pfPh !== null ? Number(input.pfPh) : null;

    var pTri = toMgPerDl(input.pfTriglycerides, input.triglycerideUnit, 'triglyceride');
    var pChol = toMgPerDl(input.pfCholesterol, input.cholesterolUnit, 'cholesterol');

    var pAmy = input.pfAmylase !== '' && input.pfAmylase !== null ? Number(input.pfAmylase) : null;
    var sAmy = input.serumAmylase !== '' && input.serumAmylase !== null ? Number(input.serumAmylase) : null;

    var neutro = input.neutrophilPct !== '' && input.neutrophilPct !== null ? Number(input.neutrophilPct) : null;
    var lympho = input.lymphocytePct !== '' && input.lymphocytePct !== null ? Number(input.lymphocytePct) : null;
    var eosino = input.eosinophilPct !== '' && input.eosinophilPct !== null ? Number(input.eosinophilPct) : null;
    var rbc = input.rbc !== '' && input.rbc !== null ? Number(input.rbc) : null;

    var gross = input.grossAppearance || 'clear';
    var cyto = input.cytology || 'negative';
    var gramAfb = input.gramAfb || 'negative';

    // -------------------------------------------------------------
    // TẦNG 1: Tiêu chuẩn Light Standard
    // -------------------------------------------------------------
    var protRatio = (pProt !== null && sProt && sProt > 0) ? (pProt / sProt) : null;
    var ldhRatio = (pLdh !== null && sLdh && sLdh > 0) ? (pLdh / sLdh) : null;
    var ldhUlnFraction = (pLdh !== null && sLdhUln > 0) ? (pLdh / sLdhUln) : null;

    var c1 = protRatio !== null ? protRatio > 0.5 : null;
    var c2 = ldhRatio !== null ? ldhRatio > 0.6 : null;
    var c3 = ldhUlnFraction !== null ? ldhUlnFraction > (2 / 3) : null;

    var matchedCriteriaCount = 0;
    if (c1 === true) matchedCriteriaCount++;
    if (c2 === true) matchedCriteriaCount++;
    if (c3 === true) matchedCriteriaCount++;

    var isLightsExudate = matchedCriteriaCount >= 1;

    // -------------------------------------------------------------
    // TẦNG 2: SEAG & Protein Gradient (Sửa lỗi Pseudo-exudate)
    // -------------------------------------------------------------
    var seag = (sAlb !== null && pAlb !== null) ? (sAlb - pAlb) : null;
    var protGrad = (sProt !== null && pProt !== null) ? (sProt - pProt) : null;

    var isPseudoExudate = false;
    if (isLightsExudate) {
      if (seag !== null && seag > 1.2) {
        isPseudoExudate = true;
      } else if (protGrad !== null && protGrad > 3.1 && isDiuretic) {
        isPseudoExudate = true;
      } else if (isDiuretic && seag !== null && seag > 1.2) {
        isPseudoExudate = true;
      }
    }

    // Kết luận Phân loại Chính
    var primaryType = 'TRANSUDATE'; // Default
    var primaryLabel = 'Dịch thấm (Transudate)';
    var primaryBadgeClass = 'badge-info';
    var primarySummary = 'Dịch thấm xuất hiện do tăng áp suất thủy tĩnh hoặc giảm áp suất keo (Suy tim, Xơ gan, Thận hư). Khuyên dùng điều trị bệnh lý nền.';

    if (isPseudoExudate) {
      primaryType = 'PSEUDO_EXUDATE';
      primaryLabel = 'Dịch thấm Giả diện Dịch tiết (Pseudo-Exudate)';
      primaryBadgeClass = 'badge-warning';
      primarySummary = 'Tiêu chuẩn Light chẩn đoán Dịch tiết, nhưng chỉ số SEAG > 1.2 g/dL cho thấy đây là DỊCH THẤM bị cô đặc do điều trị thuốc Lợi tiểu ở bệnh nhân Suy tim / Xơ gan!';
    } else if (isLightsExudate) {
      primaryType = 'EXUDATE';
      primaryLabel = 'Dịch tiết (Exudate)';
      primaryBadgeClass = 'badge-danger';
      primarySummary = 'Dịch tiết xuất hiện do tổn thương/viêm màng phổi làm tăng tính thấm mao mạch. Cần tiếp tục thăm dò tìm nguyên nhân nhiễm trùng, lao, ung thư hoặc miễn dịch.';
    }

    // -------------------------------------------------------------
    // TẦNG 3: Phân tích Biomarkers & Công thức Tế bào
    // -------------------------------------------------------------
    var findings = [];
    var etiologyCandidates = [];

    // 1. Lao màng phổi (TB)
    if (pAda !== null && pAda >= 40) {
      var isHighLympho = lympho !== null && lympho >= 50;
      findings.push({
        title: 'ADA Tăng cao (≥ 40 U/L)',
        level: 'danger',
        desc: 'ADA = ' + pAda.toFixed(1) + ' U/L' + (isHighLympho ? ' kết hợp Lymphocyte = ' + lympho + '%' : '') + '. Độ nghi ngờ LAO MÀNG PHỔI cực kỳ cao (Độ nhạy & Đặc hiệu > 90%).'
      });
      etiologyCandidates.push({ name: 'Lao màng phổi (Tuberculous Pleurisy)', score: isHighLympho ? 95 : 85, icon: 'fa-microscope', color: 'danger' });
    } else if (gramAfb === 'afb_positive') {
      findings.push({
        title: 'Nhuộm AFB (+)',
        level: 'danger',
        desc: 'Xác nhận sự hiện diện của Trực khuẩn Kháng cồn Kháng axit (Nghi ngờ Lao Màng Phổi).'
      });
      etiologyCandidates.push({ name: 'Lao màng phổi (AFB Positive)', score: 99, icon: 'fa-bacteriophage', color: 'danger' });
    }

    // 2. Viêm phổi & Mủ màng phổi
    var isEmpyema = gross === 'purulent' || gramAfb === 'gram_positive' || gramAfb === 'gram_negative';
    var isComplicatedParapneumonic = false;
    var isUncomplicatedParapneumonic = false;

    if (isEmpyema) {
      findings.push({
        title: 'Mủ Màng Phổi (Empyema)',
        level: 'danger',
        desc: 'Dịch mủ đục hoặc soi/cấy vi khuẩn dương tính. Chỉ định DẪN LƯU MÀNG PHỔI KHẨN CẤP + Kháng sinh toàn thân + Hội chẩn Ngoại Lồng ngực.'
      });
      etiologyCandidates.push({ name: 'Mủ màng phổi (Empyema)', score: 99, icon: 'fa-vial-virus', color: 'danger' });
    } else {
      var lowPh = pPh !== null && pPh < 7.20;
      var lowGlu = pGlu !== null && pGlu < 60;
      var highLdh = pLdh !== null && pLdh > 1000;

      if (lowPh || lowGlu || highLdh) {
        isComplicatedParapneumonic = true;
        var reasonList = [];
        if (lowPh) reasonList.push('pH < 7.20 (' + pPh + ')');
        if (lowGlu) reasonList.push('Glucose < 60 mg/dL (' + pGlu.toFixed(0) + ' mg/dL)');
        if (highLdh) reasonList.push('LDH > 1000 U/L (' + pLdh + ' U/L)');

        findings.push({
          title: 'Tràn Dịch Viêm Phổi Phức Tạp (Complicated Parapneumonic)',
          level: 'danger',
          desc: 'Có dấu hiệu chuyển đổi toan hóa/tiêu tiêu Glucose: ' + reasonList.join(', ') + '. NGUY CƠ HÓA MỦ CAO → CÓ CHỈ ĐỊNH DẪN LƯU MÀNG PHỔI (Chest Tube Drainage).'
        });
        etiologyCandidates.push({ name: 'Tràn dịch viêm phổi phức tạp', score: 90, icon: 'fa-lungs-virus', color: 'danger' });
      } else if (neutro !== null && neutro >= 50 && primaryType === 'EXUDATE') {
        isUncomplicatedParapneumonic = true;
        findings.push({
          title: 'Bạch cầu Đa nhân Trung tính chiếm ưu thế (≥ 50%)',
          level: 'warning',
          desc: 'Gợi ý đáp ứng viêm cấp tính (Viêm phổi, Tắc mạch phổi, Viêm tụy cấp).'
        });
        etiologyCandidates.push({ name: 'Tràn dịch viêm phổi đơn thuần (Uncomplicated)', score: 75, icon: 'fa-lungs', color: 'warning' });
      }
    }

    // 3. Tràn dịch Màng phổi Ung thư (Malignancy)
    if (cyto === 'positive') {
      findings.push({
        title: 'Tế bào học Dịch màng phổi (+)',
        level: 'danger',
        desc: 'Phát hiện tế bào ác tính trong dịch màng phổi. Chẩn đoán xác định Tràn Dịch Màng Phổi Ung Thư (Malignant Pleural Effusion).'
      });
      etiologyCandidates.push({ name: 'Tràn dịch màng phổi Ung thư (Malignant)', score: 99, icon: 'fa-dna', color: 'danger' });
    } else if (gross === 'hemorrhagic' || (rbc !== null && rbc >= 100000)) {
      findings.push({
        title: 'Dịch Màng Phổi Máu / RBC ≥ 100,000 / μL',
        level: 'warning',
        desc: 'Cần phân biệt: Ung thư màng phổi, Tắc mạch phổi (PE), Chấn thương lồng ngực hoặc Tràn máu màng phổi (Hemothorax nếu Hct MP/Hct Máu > 50%).'
      });
      etiologyCandidates.push({ name: 'Nghi ngờ Ung thư / PE / Chấn thương', score: 70, icon: 'fa-droplet', color: 'warning' });
    }

    // 4. Dưỡng chấp vs Giả dưỡng chấp
    if (gross === 'milky' || (pTri !== null && pTri > 110)) {
      if (pChol !== null && pChol >= 200) {
        findings.push({
          title: 'Giả Dưỡng Chấp (Pseudochylothorax)',
          level: 'warning',
          desc: 'Cholesterol ≥ 200 mg/dL (' + pChol.toFixed(0) + ' mg/dL). Gặp trong các bệnh viêm màng phổi mãn tính kéo dài (Lao cũ, Viêm khớp dạng thấp).'
        });
        etiologyCandidates.push({ name: 'Giả dưỡng chấp (Pseudochylothorax)', score: 85, icon: 'fa-bottle-droplet', color: 'warning' });
      } else {
        findings.push({
          title: 'Tràn Dịch Dưỡng Chấp (Chylothorax)',
          level: 'danger',
          desc: 'Triglyceride > 110 mg/dL (' + (pTri ? pTri.toFixed(0) : '>110') + ' mg/dL). Do tổn thương Ống ngực (U Lymphoma, Phẫu thuật/Chấn thương lồng ngực).'
        });
        etiologyCandidates.push({ name: 'Tràn dịch Dưỡng chấp (Chylothorax)', score: 90, icon: 'fa-wine-bottle', color: 'danger' });
      }
    }

    // 5. Viêm tụy / Vỡ thực quản
    if (pAmy !== null && sAmy !== null && pAmy > sAmy) {
      findings.push({
        title: 'Amylase Dịch Màng Phổi Tăng (Amylase MP > Serum)',
        level: 'warning',
        desc: 'Amylase MP = ' + pAmy + ' U/L > Huyết thanh (' + sAmy + ' U/L). Gợi ý Viêm tụy cấp/mãn, Nang giả tụy hoặc Vỡ thực quản (Hội chứng Boerhaave).'
      });
      etiologyCandidates.push({ name: 'Viêm tụy / Vỡ thực quản', score: 80, icon: 'fa-stomach', color: 'warning' });
    }

    // Nếu là Dịch thấm
    if (primaryType === 'TRANSUDATE' || primaryType === 'PSEUDO_EXUDATE') {
      if (!etiologyCandidates.some(function (e) { return e.name.indexOf('Suy tim') !== -1; })) {
        etiologyCandidates.push({ name: 'Suy tim sung huyết (CHF)', score: 85, icon: 'fa-heart-pulse', color: 'info' });
        etiologyCandidates.push({ name: 'Xơ gan (Hepatic Hydrothorax)', score: 75, icon: 'fa-liver', color: 'info' });
        etiologyCandidates.push({ name: 'Hội chứng Thận hư / Giảm Albumin', score: 65, icon: 'fa-kidneys', color: 'info' });
      }
    }

    // -------------------------------------------------------------
    // TẦNG 4 & 5: Định hướng Can Thiệp & Khuyên dùng Lâm sàng
    // -------------------------------------------------------------
    var recommendations = [];

    if (isEmpyema || isComplicatedParapneumonic) {
      recommendations.push({
        title: '🚨 CHỈ ĐỊNH DẪN LƯU MÀNG PHỔI KHẨN (Chest Tube Drainage)',
        type: 'danger',
        content: 'Bệnh nhân có mủ màng phổi hoặc tràn dịch viêm phổi phức tạp (pH < 7.20 / Glucose < 60 mg/dL). Cần đặt ống dẫn lưu lồng ngực (12-28 Fr) ngay lập tức kết hợp kháng sinh phổ rộng IV. Nếu dịch có vách hóa, cân nhắc bơm thuốc tiêu sợi huyết (Alteplase + DNase) hoặc Nội soi lồng ngực (VATS) sớm.'
      });
    }

    if (primaryType === 'EXUDATE' && cyto === 'negative' && (pAda === null || pAda < 40) && !isEmpyema && !isComplicatedParapneumonic) {
      recommendations.push({
        title: '🔍 ĐỀ XUẤT THẮM DÒ BỔ SUNG (Chưa rõ nguyên nhân)',
        type: 'warning',
        content: 'Dịch tiết chưa xác định rõ nguyên nhân sau chọc dò lần 1. Đề xuất: 1) Lặp lại tế bào học dịch màng phổi lần 2 (tăng độ nhạy lên 80%); 2) Chụp CT Ngực có tiêm thuốc tương quang (đánh giá nhu mô & màng phổi); 3) Sinh thiết màng phổi qua da hoặc Nội soi màng phổi chẩn đoán (Medical Thoracoscopy / VATS).'
      });
    }

    if (isPseudoExudate) {
      recommendations.push({
        title: '✅ ĐIỀU CHỈNH HƯỚNG ĐIỀU TRỊ (Pseudo-Exudate)',
        type: 'success',
        content: 'Tránh chọc dò màng phổi nhiều lần hoặc làm sinh thiết màng phổi không cần thiết. Tập trung tối ưu hóa điều trị Suy tim / Xơ gan (chỉnh liều lợi tiểu, giảm gánh nặng thể tích).'
      });
    }

    // Đánh giá nút trên Sơ đồ Thuật toán (Active Flowchart Nodes)
    var activeFlowchartNodes = ['node-start', 'node-lights'];
    if (isLightsExudate) {
      activeFlowchartNodes.push('node-lights-exudate');
      if (isDiuretic) {
        activeFlowchartNodes.push('node-seag-check');
        if (isPseudoExudate) {
          activeFlowchartNodes.push('node-pseudo-exudate');
        } else {
          activeFlowchartNodes.push('node-true-exudate');
        }
      } else {
        activeFlowchartNodes.push('node-true-exudate');
      }

      if (!isPseudoExudate) {
        activeFlowchartNodes.push('node-biomarkers');
        if (isEmpyema || isComplicatedParapneumonic) activeFlowchartNodes.push('node-drainage');
        if (pAda >= 40 || gramAfb === 'afb_positive') activeFlowchartNodes.push('node-tb');
        if (cyto === 'positive') activeFlowchartNodes.push('node-malignancy');
      }
    } else {
      activeFlowchartNodes.push('node-lights-transudate');
      activeFlowchartNodes.push('node-transudate-cause');
    }

    return {
      metrics: {
        protRatio: protRatio,
        ldhRatio: ldhRatio,
        ldhUlnFraction: ldhUlnFraction,
        c1: c1,
        c2: c2,
        c3: c3,
        matchedCriteriaCount: matchedCriteriaCount,
        isLightsExudate: isLightsExudate,
        seag: seag,
        protGrad: protGrad,
        isPseudoExudate: isPseudoExudate
      },
      primary: {
        type: primaryType,
        label: primaryLabel,
        badgeClass: primaryBadgeClass,
        summary: primarySummary
      },
      findings: findings,
      etiologies: etiologyCandidates.sort(function (a, b) { return b.score - a.score; }),
      recommendations: recommendations,
      activeFlowchartNodes: activeFlowchartNodes
    };
  }

  return {
    analyze: analyze
  };
})();
