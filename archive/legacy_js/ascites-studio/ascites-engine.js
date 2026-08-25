/**
 * Ascites & Paracentesis Diagnostic Engine (Ascites Engine)
 * CliniPortal - Gastroenterology & Emergency Decision Support System
 * 
 * Logic 5 Tầng:
 * 1. SAAG (Serum-Ascites Albumin Gradient) - Phân loại Tăng áp cửa vs Không tăng áp cửa
 * 2. Phân nhóm theo Total Protein dịch báng (Xơ gan vs Suy tim vs Ung thư vs Lao vs Thận hư)
 * 3. Phân tầng Nhiễm trùng Dịch báng (ANC = WBC * Neutro%, SBP vs CNNA vs MNB)
 * 4. Tiêu chuẩn Runyon chẩn đoán Viêm phúc mạc thứ phát (Protein > 1.0, Glucose < 50, LDH > ULN)
 * 5. Máy tính liều Albumin truyền IV (Phác đồ SBP Ngày 1 & 3, Chọc tháo báng báng lượng lớn LVP)
 */

window.AscitesEngine = (function () {
  'use strict';

  function toGramPerDl(val, unit) {
    if (val === null || val === undefined || isNaN(val)) return null;
    return unit === 'g/L' ? val / 10 : Number(val);
  }

  function toMgPerDl(val, unit, type) {
    if (val === null || val === undefined || isNaN(val)) return null;
    if (unit === 'mmol/L') {
      if (type === 'glucose') return val * 18.018;
    }
    return Number(val);
  }

  function analyze(input) {
    var sAlb = toGramPerDl(input.serumAlbumin, input.albuminUnit);
    var aAlb = toGramPerDl(input.ascitesAlbumin, input.albuminUnit);
    var aProt = toGramPerDl(input.ascitesProtein, input.proteinUnit);

    var wbc = input.wbc !== '' && input.wbc !== null ? Number(input.wbc) : null;
    var neutroPct = input.neutrophilPct !== '' && input.neutrophilPct !== null ? Number(input.neutrophilPct) : null;

    var glu = toMgPerDl(input.glucose, input.glucoseUnit, 'glucose');
    var ldh = input.ldh !== '' && input.ldh !== null ? Number(input.ldh) : null;
    var sLdhUln = input.serumLdhUln ? Number(input.serumLdhUln) : 200;

    var ada = input.ada !== '' && input.ada !== null ? Number(input.ada) : null;
    var amy = input.amylase !== '' && input.amylase !== null ? Number(input.amylase) : null;
    var miliBilirubin = input.bilirubinRatio !== '' && input.bilirubinRatio !== null ? Number(input.bilirubinRatio) : null;

    var cyto = input.cytology || 'negative';
    var culture = input.culture || 'negative';

    var weight = input.bodyWeight ? Number(input.bodyWeight) : 60;
    var lvpVol = input.paracentesisVolume ? Number(input.paracentesisVolume) : 0;

    // -------------------------------------------------------------
    // TẦNG 1: Tính SAAG & Phân Loại Tăng Áp Cửa
    // -------------------------------------------------------------
    var saag = (sAlb !== null && aAlb !== null) ? (sAlb - aAlb) : null;
    var isHighSaag = saag !== null ? saag >= 1.1 : null;

    var saagLabel = 'Chưa xác định';
    var saagBadge = 'badge-neutral';
    var saagSummary = 'Vui lòng nhập đầy đủ Albumin Huyết thanh và Albumin Dịch báng để tính chỉ số SAAG.';

    if (isHighSaag === true) {
      saagLabel = 'TĂNG ÁP LỰC TĨNH MẠCH CỬA (Portal Hypertension)';
      saagBadge = 'badge-danger';
      saagSummary = 'SAAG = ' + saag.toFixed(2) + ' g/dL (≥ 1.1 g/dL). Nguyên nhân do Tăng áp lực tĩnh mạch cửa (Độ chính xác 97%). Phổ biến nhất là Xơ gan, Suy tim sung huyết, Budd-Chiari.';
    } else if (isHighSaag === false) {
      saagLabel = 'KHÔNG DO TĂNG ÁP CỬA (Non-Portal Hypertension)';
      saagBadge = 'badge-info';
      saagSummary = 'SAAG = ' + saag.toFixed(2) + ' g/dL (< 1.1 g/dL). Áp lực tĩnh mạch cửa bình thường. Gợi ý các tổn thương màng bụng (Ung thư, Lao màng bụng, Viêm tụy, Hội chứng Thận hư).';
    }

    // -------------------------------------------------------------
    // TẦNG 2: Phân Loại Nguyên Nhân Theo Protein Dịch Báng & Biomarkers
    // -------------------------------------------------------------
    var findings = [];
    var etiologies = [];

    if (isHighSaag === true) {
      if (aProt !== null && aProt < 2.5) {
        findings.push({
          title: 'SAAG Cao (≥ 1.1) & Protein Dịch Báng Thấp (< 2.5 g/dL)',
          level: 'danger',
          desc: 'Điển hình cho XƠ GAN (Cirrhosis).' + (aProt < 1.5 ? ' ⚠️ Protein < 1.5 g/dL: NGUY CƠ NHO CAO BỊ VIÊM PHÚC MẠC VI TRÙNG TỰ PHÁT (SBP)! Cân nhắc dự phòng Norfloxacin.' : '')
        });
        etiologies.push({ name: 'Xơ gan (Cirrhosis)', score: 95, icon: 'fa-liver', color: 'danger' });
        etiologies.push({ name: 'Hội chứng Budd-Chiari muộn', score: 65, icon: 'fa-notes-medical', color: 'warning' });
      } else if (aProt !== null && aProt >= 2.5) {
        findings.push({
          title: 'SAAG Cao (≥ 1.1) & Protein Dịch Báng Cao (≥ 2.5 g/dL)',
          level: 'warning',
          desc: 'Tăng áp cửa do nguyên nhân SAU GAN hoặc TẠI GAN có bảo tồn khả năng tổng hợp Protein. Gợi ý: Suy tim sung huyết, Viêm màng ngoài tim co thắt, Hội chứng Budd-Chiari sớm.'
        });
        etiologies.push({ name: 'Suy tim sung huyết (CHF)', score: 90, icon: 'fa-heart-pulse', color: 'warning' });
        etiologies.push({ name: 'Viêm màng ngoài tim co thắt', score: 80, icon: 'fa-heart', color: 'warning' });
        etiologies.push({ name: 'Budd-Chiari sớm / SOS', score: 75, icon: 'fa-disease', color: 'warning' });
      }
    } else if (isHighSaag === false) {
      if (cyto === 'positive') {
        findings.push({
          title: 'Tế bào học Dịch báng (+)',
          level: 'danger',
          desc: 'Phát hiện tế bào ung thư ác tính. Chẩn đoán xác định UNG THƯ MÀNG BỤNG (Peritoneal Carcinomatosis).'
        });
        etiologies.push({ name: 'Ung thư màng bụng (Carcinomatosis)', score: 99, icon: 'fa-dna', color: 'danger' });
      }

      if (ada !== null && ada >= 30) {
        findings.push({
          title: 'ADA Dịch Báng Tăng Cao (≥ 30 U/L)',
          level: 'danger',
          desc: 'ADA = ' + ada.toFixed(1) + ' U/L. Khả năng cao LAO MÀNG BỤNG (Tuberculous Peritonitis).'
        });
        etiologies.push({ name: 'Lao màng bụng (TB Peritonitis)', score: 92, icon: 'fa-microscope', color: 'danger' });
      }

      if (amy !== null && amy > 1000) {
        findings.push({
          title: 'Amylase Dịch Báng Cực Cao (> 1000 U/L)',
          level: 'warning',
          desc: 'Amylase = ' + amy + ' U/L. Chẩn đoán TRÀN DỊCH MÀNG BỤNG DO TUỴ (Viêm tụy cấp/mãn, Nang giả tụy vỡ).'
        });
        etiologies.push({ name: 'Tràn dịch màng bụng do Tụy', score: 95, icon: 'fa-stomach', color: 'warning' });
      }

      if (aProt !== null && aProt < 2.5 && !etiologies.some(function(e){ return e.name.indexOf('Thận hư') !== -1; })) {
        etiologies.push({ name: 'Hội chứng Thận hư (Nephrotic)', score: 85, icon: 'fa-kidneys', color: 'info' });
      }
    }

    // -------------------------------------------------------------
    // TẦNG 3: Phân Tầng Nhiễm Trùng Dịch Báng & SBP (ANC Engine)
    // -------------------------------------------------------------
    var anc = (wbc !== null && neutroPct !== null) ? (wbc * (neutroPct / 100)) : null;
    var isHighAnc = anc !== null ? anc >= 250 : false;

    // Runyon Criteria for Secondary Peritonitis
    var r1 = aProt !== null ? aProt > 1.0 : false;
    var r2 = glu !== null ? glu < 50 : false;
    var r3 = ldh !== null ? ldh > sLdhUln : false;
    var runyonCount = (r1 ? 1 : 0) + (r2 ? 1 : 0) + (r3 ? 1 : 0);

    var isSecondaryPeritonitis = isHighAnc && (runyonCount >= 2 || culture === 'polymicrobial');

    var infectionType = 'NO_INFECTION';
    var infectionLabel = 'Dịch báng không nhiễm trùng';
    var infectionBadge = 'badge-success';
    var infectionSummary = 'Bạch cầu đa nhân ANC < 250 / μL. Chưa có bằng chứng nhiễm trùng dịch báng.';

    if (isSecondaryPeritonitis) {
      infectionType = 'SECONDARY_PERITONITIS';
      infectionLabel = 'VIÊM PHÚC MẠC THỨ PHÁT (Secondary Bacterial Peritonitis)';
      infectionBadge = 'badge-danger';
      infectionSummary = 'ANC ≥ 250 / μL kèm thỏa ≥ 2 tiêu chuẩn Runyon (Protein > 1.0, Glucose < 50, LDH > ULN) hoặc cấy nhiều loài vi khuẩn. NGUY CƠ THỦNG TẠNG RỖNG / ÁP XE TRONG Ổ BỤNG! Cần chụp CT Bụng khẩn + Hội chẩn Ngoại khoa.';
    } else if (isHighAnc && (culture === 'monomicrobial' || culture === 'negative')) {
      if (culture === 'monomicrobial') {
        infectionType = 'SBP';
        infectionLabel = 'VIÊM PHÚC MẠC VI TRÙNG TỰ PHÁT (SBP - Spontaneous Bacterial Peritonitis)';
        infectionBadge = 'badge-danger';
        infectionSummary = 'ANC = ' + anc.toFixed(0) + ' / μL (≥ 250 / μL) & Cấy vi khuẩn dương tính (đơn loài). CẦN ĐIỀU TRỊ KHÁNG SINH PHỔ RỘNG IV + TRUYỀN ALBUMIN NGAY!';
      } else {
        infectionType = 'CNNA';
        infectionLabel = 'BẠCH CẦU ĐA NHÂN CẤY ÂM TÍNH (CNNA - Culture-Negative Neutrocytic Ascites)';
        infectionBadge = 'badge-warning';
        infectionSummary = 'ANC = ' + anc.toFixed(0) + ' / μL (≥ 250 / μL) nhưng cấy vi khuẩn âm tính. Phác đồ điều trị VẪN GIỐNG HỆT SBP (Kháng sinh IV + Truyền Albumin IV)!';
      }
    } else if (!isHighAnc && culture === 'monomicrobial') {
      infectionType = 'MNB';
      infectionLabel = 'NHIỄM VI TRÙNG DỊCH BÁNG CHƯA ĐÁP ỨNG VIÊM (MNB - Monomicrobial Bacterascites)';
      infectionBadge = 'badge-warning';
      infectionSummary = 'Cấy vi khuẩn dương tính nhưng ANC < 250 / μL. Nếu bệnh nhân có triệu chứng sốt/đau bụng $\\rightarrow$ Điều trị như SBP. Nếu không có triệu chứng $\\rightarrow$ Chọc dò lại sau 48h.';
    }

    // -------------------------------------------------------------
    // TẦNG 4 & 5: Liều Truyền Albumin IV & Hướng Dẫn Can Thiệp
    // -------------------------------------------------------------
    var recommendations = [];
    var albuminDosing = null;

    if (infectionType === 'SBP' || infectionType === 'CNNA') {
      var day1Grams = weight * 1.5;
      var day3Grams = weight * 1.0;
      var day1Ml20Pct = (day1Grams / 20) * 100; // Albumin 20%
      var day3Ml20Pct = (day3Grams / 20) * 100;

      albuminDosing = {
        weight: weight,
        day1Grams: day1Grams,
        day1Ml: day1Ml20Pct,
        day3Grams: day3Grams,
        day3Ml: day3Ml20Pct
      };

      recommendations.push({
        title: '🚨 PHÁC ĐỒ KHÁNG SINH & TRUYỀN ALBUMIN CHO SBP / CNNA',
        type: 'danger',
        content: '1) Kháng sinh IV ngay: Cefotaxime 2g IV q8h hoặc Ceftriaxone 2g IV q24h trong 5-7 ngày.<br>' +
                 '2) Truyền IV Albumin 20%: <strong>Ngày 1: ' + day1Grams.toFixed(0) + ' g (' + day1Ml20Pct.toFixed(0) + ' mL Albumin 20%)</strong> trong vòng 6 giờ đầu; <strong>Ngày 3: ' + day3Grams.toFixed(0) + ' g (' + day3Ml20Pct.toFixed(0) + ' mL Albumin 20%)</strong> để ngăn ngừa Hội chứng Gan-Thận (HRS) & Giảm tử vong (từ 30% xuống 10%).'
      });
    }

    if (lvpVol > 5) {
      var lvpAlbGrams = lvpVol * 8; // 8g Albumin / Lít dịch tháo
      var lvpAlbMl = (lvpAlbGrams / 20) * 100;

      recommendations.push({
        title: '💧 BÙ ALBUMIN CHỌC THÁO BÁNG LƯỢNG NHIỀU (LVP > 5 Liters)',
        type: 'warning',
        content: 'Bệnh nhân tháo ' + lvpVol + ' Lít dịch báng. Để tránh Rối loạn tuần hoàn sau chọc tháo (PICD), cần truyền: <strong>' + lvpAlbGrams.toFixed(0) + ' g Albumin (' + lvpAlbMl.toFixed(0) + ' mL Albumin 20%)</strong> ngay sau khi hoàn thành chọc tháo (8g Albumin / Lít dịch tháo).'
      });
    }

    // Active Flowchart Nodes
    var activeNodes = ['node-start', 'node-saag'];
    if (isHighSaag === true) {
      activeNodes.push('node-saag-high');
      if (aProt < 2.5) activeNodes.push('node-cirrhosis');
      else activeNodes.push('node-heart-failure');
    } else if (isHighSaag === false) {
      activeNodes.push('node-saag-low');
      if (cyto === 'positive') activeNodes.push('node-carcinomatosis');
      if (ada >= 30) activeNodes.push('node-tb-peritonitis');
    }

    if (isHighAnc) {
      activeNodes.push('node-anc-high');
      if (isSecondaryPeritonitis) activeNodes.push('node-secondary');
      else activeNodes.push('node-sbp-treatment');
    } else {
      activeNodes.push('node-anc-low');
    }

    return {
      metrics: {
        saag: saag,
        isHighSaag: isHighSaag,
        anc: anc,
        isHighAnc: isHighAnc,
        runyonCount: runyonCount,
        isSecondaryPeritonitis: isSecondaryPeritonitis
      },
      saagResult: {
        label: saagLabel,
        badgeClass: saagBadge,
        summary: saagSummary
      },
      infectionResult: {
        type: infectionType,
        label: infectionLabel,
        badgeClass: infectionBadge,
        summary: infectionSummary
      },
      findings: findings,
      etiologies: etiologies.sort(function (a, b) { return b.score - a.score; }),
      recommendations: recommendations,
      albuminDosing: albuminDosing,
      activeNodes: activeNodes
    };
  }

  return {
    analyze: analyze
  };
})();
