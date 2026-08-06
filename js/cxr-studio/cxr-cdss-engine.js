/**
 * cxr-cdss-engine.js — CliniPortal Chest X-Ray Decision Support Engine
 * Bộ máy suy diễn Bayes xác suất & hỗ trợ ra quyết định lâm sàng cho phim X-quang ngực
 * kết hợp dấu hiệu sinh tồn (Vitals Fusion, Severity Stratification & AI Heatmap ROI).
 *
 * v2.0 — Tích hợp thêm từ cdss-xray-app:
 *   • getRuleBasedAdvice()       — Khuyến cáo lâm sàng chi tiết theo từng bệnh lý
 *   • calculateCURB65()          — Tính điểm CURB-65 tự động từ vitals
 *   • generateClinicalNarrative() — Tóm tắt lâm sàng tự động kết hợp X-quang + vitals
 */

const CXR_CDSS_ENGINE = {
  // 1. Tỷ lệ tiên nghiệm (Priors) & Tỷ lệ quần thể (Base Rates)
  priors: {
    pneumonia: 0.04,
    covid19: 0.05,
    cardiogenicEdema: 0.03,
    pleuralEffusionAcute: 0.02
  },

  baseRates: {
    fever: 0.06,
    cough: 0.15,
    headache: 0.25,
    anosmia: 0.08,
    tachycardia: 0.12,
    hypertension: 0.22,
    dyspnea: 0.18
  },

  // 2. Bảng Likelihoods P(Symptom | Disease)
  likelihoods: {
    pneumonia: {
      fever: 0.82,
      cough: 0.85,
      headache: 0.30,
      anosmia: 0.08,
      tachycardia: 0.65,
      hypertension: 0.25,
      dyspnea: 0.75
    },
    covid19: {
      fever: 0.78,
      cough: 0.68,
      headache: 0.62,
      anosmia: 0.72,
      tachycardia: 0.42,
      hypertension: 0.28,
      dyspnea: 0.65
    },
    cardiogenicEdema: {
      fever: 0.10,
      cough: 0.45,
      headache: 0.20,
      anosmia: 0.02,
      tachycardia: 0.75,
      hypertension: 0.70,
      dyspnea: 0.90
    },
    pleuralEffusionAcute: {
      fever: 0.40,
      cough: 0.60,
      headache: 0.15,
      anosmia: 0.05,
      tachycardia: 0.55,
      hypertension: 0.30,
      dyspnea: 0.82
    }
  },

  /**
   * Tính toán xác suất chẩn đoán phân biệt theo định lý Bayes
   * @param {Object} vitals - { age, gender, temp, sbp, dbp, hr, spo2, cough, headache, anosmia, dyspnea }
   * @param {Object} cxrLayers - Các tổn thương X-quang SVG đang bật
   * @param {Object} ctrData - Kết quả đo tỷ lệ tim/lồng ngực
   */
  calculateBayesianDifferential(vitals, cxrLayers, ctrData) {
    const isFever = Number(vitals.temp) > 37.8;
    const isTachycardia = Number(vitals.hr) > 95;
    const isHypertension = Number(vitals.sbp) > 135 || Number(vitals.dbp) > 88;

    const observed = {
      fever: isFever,
      cough: Boolean(vitals.cough),
      headache: Boolean(vitals.headache),
      anosmia: Boolean(vitals.anosmia),
      tachycardia: isTachycardia,
      hypertension: isHypertension,
      dyspnea: Boolean(vitals.dyspnea)
    };

    let post = { ...this.priors };
    const diseases = Object.keys(this.priors);

    // Bước 1: Cập nhật Bayes cho từng triệu chứng quan sát được
    diseases.forEach(d => {
      Object.entries(observed).forEach(([sym, isPresent]) => {
        const pSymD = this.likelihoods[d][sym];
        const pSym = this.baseRates[sym];
        if (pSymD !== undefined && pSym !== undefined) {
          if (isPresent) {
            post[d] = (pSymD * post[d]) / pSym;
          } else {
            post[d] = ((1 - pSymD) * post[d]) / (1 - pSym);
          }
        }
      });
    });

    // Bước 2: Hiệu chỉnh theo Tuổi & Giới tính
    const ageFactor = Math.min(1.0, Math.max(0, Number(vitals.age || 50) / 80));
    diseases.forEach(d => {
      const ageBoost = 0.35 + (0.45 * ageFactor);
      post[d] = (post[d] * ageBoost) / (post[d] * ageBoost + (1 - post[d]) * (1 - ageBoost));
      const genderStr = String(vitals.gender || '').toLowerCase();
      if (genderStr === 'male' || genderStr === 'nam') {
        post[d] = (post[d] * 1.15) / (post[d] * 1.15 + (1 - post[d]));
      }
    });

    // Bước 3: DUNG HỢP TRỰC TIẾP VỚI TỔN THƯƠNG X-QUANG (Imaging Evidence Fusion)
    if (cxrLayers.consolidationR || cxrLayers.cavity) {
      post.pneumonia = Math.max(post.pneumonia, 0.92);
      post.covid19 = Math.max(post.covid19, 0.35);
    }
    if (cxrLayers.ggo) {
      post.covid19 = Math.max(post.covid19, 0.88);
      post.pneumonia = Math.max(post.pneumonia, 0.65);
    }
    if (ctrData && ctrData.isCardiomegaly) {
      post.cardiogenicEdema = Math.max(post.cardiogenicEdema, 0.85);
      if (cxrLayers.pulmonaryEdema) post.cardiogenicEdema = 0.96;
    }
    if (cxrLayers.effusionR) {
      post.pleuralEffusionAcute = Math.max(post.pleuralEffusionAcute, 0.89);
    }
    if (cxrLayers.pneumothoraxR) {
      post.pleuralEffusionAcute = Math.max(post.pleuralEffusionAcute, 0.94);
    }

    // Chuẩn hóa và làm tròn xác suất (0.01 -> 0.98)
    const normalized = {};
    diseases.forEach(d => {
      const val = Number(post[d]);
      normalized[d] = Math.min(0.98, Math.max(0.01, isNaN(val) ? 0.05 : val));
    });

    return normalized;
  },

  /**
   * Phân tầng mức độ nặng & Đề xuất phác đồ điều trị động
   */
  evaluateSeverityAndTreatment(vitals, cxrLayers, probs) {
    let severity = "Low"; // Low | Moderate | High | Critical
    let severityLabel = "Nhẹ / Ngoại trú";
    let badgeClass = "badge-severity-low";
    const treatments = [];
    const labs = [];
    const ebmLinks = [];

    const isShock = Number(vitals.sbp) < 90 || Number(vitals.spo2) < 90;
    const isSevereVitals = Number(vitals.temp) > 39.0 || Number(vitals.hr) > 110 || Number(vitals.spo2) < 94;
    const isHighRiskAge = Number(vitals.age) >= 65;

    // Phân tầng Severity
    if (isShock || cxrLayers.pneumothoraxR) {
      severity = "Critical";
      severityLabel = "NGUY KỊCH — HỒI SỨC CẤP CỨU";
      badgeClass = "badge-severity-critical";
    } else if (isSevereVitals || (isHighRiskAge && probs.pneumonia > 0.70)) {
      severity = "High";
      severityLabel = "Nặng — Nhập Viện Nội Trú / ICU";
      badgeClass = "badge-severity-high";
    } else if (probs.pneumonia > 0.50 || probs.covid19 > 0.50 || probs.cardiogenicEdema > 0.50) {
      severity = "Moderate";
      severityLabel = "Trung bình — Theo dõi sát";
      badgeClass = "badge-severity-mod";
    }

    // Lập kế hoạch điều trị (Treatment Plan Generation)
    if (probs.pneumonia > 0.60) {
      treatments.push("Kháng sinh theo kinh nghiệm (Beta-lactam + Macrolide hoặc Quinolone hô hấp)");
      treatments.push("Hạ sốt bằng Acetaminophen khi T > 38.5°C, bổ sung nước & điện giải");
      labs.push("Cấy đờm & Cấy máu trước khi dùng kháng sinh", "Khí máu động mạch (ABG)", "CRP / Procalcitonin");
      ebmLinks.push({
        title: "Pneumonia Studio (CURB-65 / PSI)",
        url: "pneumonia-studio.html",
        badge: "Studio"
      });
      ebmLinks.push({
        title: "Chỉnh liều Kháng sinh ở Bệnh nhân Suy thận",
        url: "../infectious/chinh-lieu-khang-sinh.html",
        badge: "Dược lý"
      });
    }
    if (probs.covid19 > 0.60) {
      treatments.push("Cách ly đường hô hấp 10 ngày, theo dõi sát SpO2 tại giường");
      treatments.push("Chỉ định Corticosteroid (Dexamethasone) nếu SpO2 < 94% hoặc cần thở oxy");
      labs.push("Test nhanh / RT-PCR SARS-CoV-2", "D-dimer & Ferritin huyết thanh");
    }
    if (probs.cardiogenicEdema > 0.60) {
      treatments.push("Hội chẩn Tim mạch khẩn cấp — Kiểm soát huyết áp & quản lý dịch");
      treatments.push("Lợi tiểu quai (Furosemide đường tĩnh mạch), giãn mạch Nitroglycerin nếu HA cho phép");
      labs.push("Siêu âm tim tại giường (POCUS/Echocardiography)", "NT-proBNP / BNP, Troponin T/I");
      ebmLinks.push({
        title: "ECG Pro Studio (12 Chuyển đạo & Calipers)",
        url: "../emergency/ecg-studio.html",
        badge: "Cập cứu"
      });
    }
    if (cxrLayers.pneumothoraxR) {
      treatments.push("🚨 CẢNH BÁO: Dẫn lưu màng phổi / Chọc hút khí cấp cứu ngay lập tức");
      labs.push("Siêu âm màng phổi (FAST/eFAST)", "X-quang ngực kiểm tra sau thủ thuật");
    }

    // Luôn gợi ý ABG khi bệnh nhân khó thở hoặc bão hòa oxy thấp
    if (Number(vitals.spo2) <= 95 || Boolean(vitals.dyspnea)) {
      ebmLinks.push({
        title: "Blood Gas Pro Studio & Phân tích ABG",
        url: "../renal/dg-abg-studio.html",
        badge: "Studio"
      });
    }

    if (treatments.length === 0) {
      treatments.push("Không cần can thiệp cấp cứu tức thì. Hướng dẫn theo dõi triệu chứng tại nhà.");
      labs.push("Tái khám sau 3-5 ngày nếu triệu chứng hô hấp không cải thiện.");
    }

    // Tóm tắt lâm sàng tự động
    const genderVN = (String(vitals.gender).toLowerCase() === 'male' || String(vitals.gender).toLowerCase() === 'nam') ? "nam" : "nữ";
    const summaryText = `Bệnh nhân ${genderVN} ${vitals.age} tuổi, vào viện với Sốt ${vitals.temp}°C, HA ${vitals.sbp}/${vitals.dbp} mmHg, Mạch ${vitals.hr} bpm, SpO2 ${vitals.spo2}%. Phù hợp với mức độ: ${severityLabel}.`;

    return {
      severity,
      severityLabel,
      badgeClass,
      treatments,
      labs,
      ebmLinks,
      summaryText
    };
  },

  /**
   * Trả về danh sách vùng Bản đồ nhiệt AI (ROI Highlighting Boxes) cho SVG
   */
  getHeatmapROIs(cxrLayers) {
    const rois = [];
    if (cxrLayers.consolidationR) {
      rois.push({
        id: "roi-consolidation",
        label: "Đông đặc nhu mô (92% Conf)",
        x: 65,
        y: 200,
        width: 90,
        height: 85,
        color: "rgba(239, 68, 68, 0.75)" // danger red
      });
    }
    if (cxrLayers.ggo) {
      rois.push({
        id: "roi-ggo-left",
        label: "Kính mờ GGO (88% Conf)",
        x: 235,
        y: 175,
        width: 100,
        height: 95,
        color: "rgba(249, 115, 22, 0.75)" // warning orange
      });
      rois.push({
        id: "roi-ggo-right",
        label: "Kính mờ GGO (88% Conf)",
        x: 65,
        y: 175,
        width: 100,
        height: 95,
        color: "rgba(249, 115, 22, 0.75)"
      });
    }
    if (cxrLayers.pneumothoraxR) {
      rois.push({
        id: "roi-pneumothorax",
        label: "Tràn khí áp lực (96% Conf)",
        x: 55,
        y: 95,
        width: 110,
        height: 180,
        color: "rgba(239, 68, 68, 0.85)"
      });
    }
    if (cxrLayers.effusionR) {
      rois.push({
        id: "roi-effusion",
        label: "Tràn dịch góc sườn hoành (89% Conf)",
        x: 58,
        y: 250,
        width: 85,
        height: 60,
        color: "rgba(59, 130, 246, 0.75)" // blue
      });
    }
    if (cxrLayers.cardiomegaly) {
      rois.push({
        id: "roi-cardiomegaly",
        label: "Bóng tim to CTR > 0.5 (95% Conf)",
        x: 140,
        y: 180,
        width: 130,
        height: 110,
        color: "rgba(168, 85, 247, 0.75)" // purple
      });
    }
    return rois;
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PHẦN MỞ RỘNG v2.0 — Ported from cdss-xray-app (RuleBasedAdvice.tsx + mockService.ts)
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Tính điểm CURB-65 tự động từ vitals
   * CURB-65: Confusion(1) + Urea>7(skip) + RR≥30(1) + SBP<90/DBP<60(1) + Age≥65(1)
   * Trả về: { score, label, recommendation, colorClass }
   */
  calculateCURB65(vitals) {
    let score = 0;
    const criteria = [];

    // C — Confusion (Rối loạn tri giác) — dùng symptom proxy: giả sử không confusion nếu bệnh nhân tự vào viện
    // (Không có input confusion riêng → bỏ qua, để mở rộng sau)

    // U — Urea > 7 mmol/L — không có input → bỏ qua

    // R — Respiratory Rate ≥ 30 lần/phút
    if (Number(vitals.rr) >= 30) {
      score++;
      criteria.push('Nhịp thở ≥ 30 l/phút (+1)');
    }

    // B — Blood pressure: SBP < 90 hoặc DBP ≤ 60
    if (Number(vitals.sbp) < 90 || Number(vitals.dbp) <= 60) {
      score++;
      criteria.push('Huyết áp thấp: SBP < 90 hoặc DBP ≤ 60 mmHg (+1)');
    }

    // 65 — Age ≥ 65
    if (Number(vitals.age) >= 65) {
      score++;
      criteria.push('Tuổi ≥ 65 (+1)');
    }

    let label, recommendation, colorClass;
    if (score === 0) {
      label = 'CURB-65: 0 — Nguy cơ rất thấp';
      recommendation = 'Điều trị ngoại trú. Kháng sinh uống, tái khám sau 48h.';
      colorClass = 'cdss-curb-low';
    } else if (score === 1) {
      label = 'CURB-65: 1 — Nguy cơ thấp';
      recommendation = 'Cân nhắc điều trị ngoại trú hoặc nhập viện ngắn ngày. Theo dõi sát.';
      colorClass = 'cdss-curb-low';
    } else if (score === 2) {
      label = 'CURB-65: 2 — Nguy cơ trung bình';
      recommendation = 'Xem xét nhập viện nội trú. Kháng sinh tĩnh mạch, theo dõi SpO2 và sinh tồn.';
      colorClass = 'cdss-curb-mod';
    } else if (score === 3) {
      label = 'CURB-65: 3 — Nguy cơ cao';
      recommendation = 'Nhập viện bắt buộc. Cân nhắc ICU nếu có suy hô hấp hoặc huyết động không ổn.';
      colorClass = 'cdss-curb-high';
    } else {
      label = `CURB-65: ${score} — NGUY KỊCH`;
      recommendation = 'Chuyển ICU ngay lập tức. Đánh giá đặt nội khí quản, hỗ trợ hô hấp xâm lấn.';
      colorClass = 'cdss-curb-critical';
    }

    return { score, label, recommendation, colorClass, criteria };
  },

  /**
   * Khuyến cáo lâm sàng chi tiết theo bệnh lý hàng đầu
   * Ported từ RuleBasedAdvice.tsx (cdss-xray-app)
   * @param {string} topDisease — 'pneumonia' | 'covid19' | 'cardiogenicEdema' | 'pleuralEffusionAcute' | 'tuberculosis' | 'pneumothorax'
   * @param {number} probability — 0.0 đến 1.0
   * @param {Object} vitals — vitals state
   * @param {Object} cxrLayers — active SVG layers
   * @returns {Object} { title, description, icon, urgency, recommendations[] }
   */
  getRuleBasedAdvice(topDisease, probability, vitals, cxrLayers) {
    const isHighConf = probability >= 0.75;
    const isModConf  = probability >= 0.50;

    // ── Viêm phổi vi khuẩn ──────────────────────────────────────────────
    if (topDisease === 'pneumonia') {
      if (isHighConf) {
        return {
          title: 'Khả năng cao: Viêm Phổi Vi Khuẩn',
          icon: '⚠️',
          urgency: 'high',
          description: 'Hình ảnh X-quang phù hợp với viêm phổi đông đặc có air-bronchograms điển hình. Kết hợp với sốt và/hoặc đờm mủ → định hướng vi khuẩn.',
          recommendations: [
            'Bắt đầu kháng sinh kinh nghiệm: Beta-lactam (Amoxicillin-Clavulanate) + Macrolide (Azithromycin) hoặc Quinolone hô hấp (Levofloxacin 500mg)',
            'Cấy đờm và cấy máu 2 mẫu TRƯỚC khi dùng kháng sinh đầu tiên',
            'Đánh giá nhập viện theo thang điểm CURB-65 (xem bên dưới)',
            'Đánh giá tràn dịch màng phổi — chọc hút nếu ≥ 1cm trên X-quang nằm',
            'Khí máu động mạch (ABG) nếu SpO2 < 94% hoặc nhịp thở > 24 l/phút'
          ]
        };
      } else if (isModConf) {
        return {
          title: 'Có thể: Viêm Phổi (độ tin cậy trung bình)',
          icon: '🔶',
          urgency: 'mod',
          description: 'Một số dấu hiệu X-quang gợi ý viêm phổi nhưng không điển hình. Cần tương quan lâm sàng.',
          recommendations: [
            'Kết hợp triệu chứng lâm sàng (sốt, ho đờm, ran nổ nghe phổi) để quyết định điều trị',
            'Cấy đờm và CRP/Procalcitonin',
            'Tái chụp X-quang sau 24-48h nếu điều trị ngoại trú',
            'Xem xét soi phế quản nếu tổn thương tái phát cùng vị trí hoặc không đáp ứng kháng sinh 72h'
          ]
        };
      }
    }

    // ── COVID-19 / Viêm phổi siêu vi ────────────────────────────────────
    if (topDisease === 'covid19') {
      if (isHighConf) {
        return {
          title: 'Khả năng cao: COVID-19 / Viêm Phổi Siêu Vi',
          icon: '🦠',
          urgency: 'high',
          description: 'Hình ảnh kính mờ (GGO) 2 bên, phân bố ngoại vi và đáy phổi — đặc trưng của COVID-19 hoặc viêm phổi siêu vi khác (Influenza, RSV).',
          recommendations: [
            'Xét nghiệm RT-PCR SARS-CoV-2 và/hoặc Test nhanh kháng nguyên ngay',
            'Cách ly đường hô hấp theo quy trình bệnh viện cho đến khi có kết quả',
            'Dexamethasone 6mg/ngày x 10 ngày nếu SpO2 < 94% hoặc cần hỗ trợ oxy',
            'Theo dõi D-dimer và Ferritin — tăng cao gợi ý nguy cơ huyết khối và bão Cytokine',
            'CT ngực có cản quang nếu triệu chứng nặng hoặc tình trạng xấu đi nhanh'
          ]
        };
      } else if (isModConf) {
        return {
          title: 'Có thể: COVID-19 / Viêm phổi siêu vi (trung bình)',
          icon: '🔶',
          urgency: 'mod',
          description: 'Hình ảnh gợi ý nhưng không đặc trưng — cần phân biệt với viêm phổi vi khuẩn không điển hình (Mycoplasma, Legionella).',
          recommendations: [
            'Xét nghiệm PCR COVID-19 + Cúm A/B',
            'Cân nhắc Azithromycin để bao phủ vi khuẩn không điển hình',
            'Theo dõi SpO2 liên tục nếu nhập viện',
            'Tái chụp X-quang sau 48-72h để đánh giá tiến triển'
          ]
        };
      }
    }

    // ── Phù phổi suy tim ────────────────────────────────────────────────
    if (topDisease === 'cardiogenicEdema') {
      if (isHighConf) {
        return {
          title: 'Khả năng cao: Phù Phổi Cấp / Suy Tim Mất Bù',
          icon: '🫀',
          urgency: 'high',
          description: 'Hình ảnh "cánh bướm" (bat-wing), tái phân bố mạch máu về đỉnh phổi, Kerley B lines — đặc trưng phù phổi do tim.',
          recommendations: [
            'Hội chẩn Tim mạch khẩn cấp — Đánh giá EF bằng siêu âm tim tại giường (POCUS)',
            'Furosemide IV 20-40mg bolus, lặp lại sau 1h nếu đáp ứng không đủ (mục tiêu lợi niệu ≥ 200mL/h)',
            'Nitroglycerin truyền tĩnh mạch nếu HA cho phép (SBP > 100mmHg) — giãn mạch giảm tiền/hậu gánh',
            'Đặt người bệnh tư thế ngồi thẳng (fowler cao), thở oxy lưu lượng cao hoặc CPAP/BiPAP nếu SpO2 < 90%',
            'Xét nghiệm: NT-proBNP/BNP, Troponin T/I, Siêu âm tim, ECG 12 chuyển đạo'
          ]
        };
      } else if (isModConf) {
        return {
          title: 'Có thể: Phù phổi / Quá tải dịch',
          icon: '🔶',
          urgency: 'mod',
          description: 'Hình ảnh gợi ý quá tải dịch nhưng chưa đủ điển hình — phân biệt với ARDS, viêm phổi lan tỏa.',
          recommendations: [
            'Siêu âm tim tại giường đánh giá chức năng thất trái và áp lực đổ đầy',
            'Định lượng NT-proBNP để phân biệt với nguyên nhân hô hấp',
            'Đánh giá đáp ứng với thử nghiệm lợi tiểu nhẹ (Furosemide 20mg PO)'
          ]
        };
      }
    }

    // ── Tràn dịch / Tràn khí màng phổi ─────────────────────────────────
    if (topDisease === 'pleuralEffusionAcute') {
      const hasPneumothorax = cxrLayers && cxrLayers.pneumothoraxR;
      if (hasPneumothorax) {
        return {
          title: '🚨 CẢNH BÁO: Tràn Khí Màng Phổi Áp Lực',
          icon: '🚨',
          urgency: 'critical',
          description: 'Dấu hiệu X-quang cho thấy tràn khí màng phổi áp lực — khí tích tụ làm lệch trung thất, xẹp phổi và chèn ép tim. ĐÂY LÀ CẤP CỨU SINH TỬ.',
          recommendations: [
            '🚨 GIẢI ÁP KIM NGAY LẬP TỨC: Châm kim cỡ 14G vào khoang liên sườn 2, đường giữa đòn bên tổn thương',
            'Sau khi ổn định: Đặt ống dẫn lưu màng phổi (Chest Tube) khoang liên sườn 4-5, đường nách trước',
            'Hồi sức dịch ngay nếu huyết áp thấp — không trì hoãn để chụp thêm X-quang',
            'Theo dõi SpO2, mạch, HA liên tục sau thủ thuật'
          ]
        };
      } else {
        return {
          title: isHighConf ? 'Khả năng cao: Tràn Dịch Màng Phổi' : 'Có thể: Tràn dịch màng phổi',
          icon: isHighConf ? '⚠️' : '🔶',
          urgency: isHighConf ? 'high' : 'mod',
          description: 'Mờ góc sườn hoành, đường cong Damoiseau trên X-quang — gợi ý tràn dịch màng phổi.',
          recommendations: [
            'Siêu âm màng phổi xác nhận và định lượng dịch (nhạy hơn X-quang 3-4 lần)',
            'Chọc tháo dịch màng phổi (Thoracentesis) nếu: lớp dịch ≥ 1cm trên X-quang nằm, hoặc có triệu chứng khó thở',
            'Gửi xét nghiệm dịch: Protein, LDH, Glucose, tế bào, cấy vi khuẩn, PCR lao nếu nghi ngờ TB',
            'Áp dụng tiêu chuẩn Light để phân biệt dịch thấm (HF, xơ gan, thận hư) với dịch tiết (viêm phổi, ác tính, TB)'
          ]
        };
      }
    }

    // ── Mặc định ────────────────────────────────────────────────────────
    return {
      title: 'Kết quả Không Điển Hình — Cần Đánh Giá Lâm Sàng',
      icon: '📋',
      urgency: 'low',
      description: 'Hình ảnh X-quang hiện tại không đủ đặc trưng để xác định chẩn đoán đơn thuần. Cần kết hợp bệnh sử, thăm khám thực thể và cận lâm sàng.',
      recommendations: [
        'Tái khám sau 4-6 tuần để đánh giá tiến triển hoặc thoái lui tổn thương',
        'Cân nhắc CT ngực nếu tổn thương khu trú, nghi ngờ khối u hoặc không rõ nguồn gốc',
        'Hội chẩn chuyên khoa Hô hấp nếu bất thường kéo dài hoặc bệnh nhân hút thuốc lá'
      ]
    };
  },

  /**
   * Tạo tóm tắt lâm sàng tự động (Clinical Narrative) kết hợp X-quang + vitals
   * Ported & mở rộng từ generateMockAnalysisResult() trong cdss-xray-app/mockService.ts
   * @returns {string} narrative text
   */
  generateClinicalNarrative(vitals, topDisease, topProb, cxrFindings) {
    const genderVN = (String(vitals.gender).toLowerCase() === 'male' || String(vitals.gender).toLowerCase() === 'nam') ? 'nam' : 'nữ';
    const age = Number(vitals.age);
    const temp = Number(vitals.temp);
    const sbp = Number(vitals.sbp);
    const dbp = Number(vitals.dbp);
    const hr = Number(vitals.hr);
    const spo2 = Number(vitals.spo2);
    const rr = Number(vitals.rr) || null;

    // Phần 1: Nhân khẩu học + Sinh tồn
    let narrative = `Bệnh nhân ${genderVN} ${age} tuổi vào cấp cứu với: Nhiệt độ ${temp}°C, Huyết áp ${sbp}/${dbp} mmHg, Nhịp tim ${hr} bpm, SpO₂ ${spo2}%`;
    if (rr) narrative += `, Nhịp thở ${rr} l/phút`;
    narrative += '. ';

    // Phần 2: Triệu chứng cơ năng
    const symptoms = [];
    if (vitals.cough) symptoms.push('ho đờm/ho khan');
    if (vitals.dyspnea) symptoms.push('khó thở cấp tính');
    if (vitals.headache) symptoms.push('đau đầu/mệt mỏi');
    if (vitals.anosmia) symptoms.push('mất khứu giác/vị giác (Anosmia)');
    if (symptoms.length > 0) {
      narrative += `Bệnh nhân than phiền: ${symptoms.join(', ')}. `;
    }

    // Phần 3: Hình ảnh X-quang
    if (cxrFindings && cxrFindings.length > 0) {
      narrative += `X-quang ngực cho thấy: ${cxrFindings.join('; ')}. `;
    } else {
      narrative += 'X-quang ngực chưa chọn tổn thương cụ thể. ';
    }

    // Phần 4: Nhận định lâm sàng
    const diseaseNames = {
      pneumonia: 'Viêm Phổi Vi Khuẩn',
      covid19: 'COVID-19 / Viêm Phổi Siêu Vi',
      cardiogenicEdema: 'Phù Phổi Cấp / Suy Tim Mất Bù',
      pleuralEffusionAcute: 'Tràn Dịch/Khí Màng Phổi'
    };
    const disName = diseaseNames[topDisease] || topDisease;
    const pct = Math.round(topProb * 100);

    // Cờ nguy hiểm
    const isFever = temp > 37.8;
    const isHypoxia = spo2 < 94;
    const isShock = sbp < 90;
    const isTachycardia = hr > 100;
    const isRapidBreathing = rr && rr >= 30;

    narrative += `Nhận định: Phù hợp nhất với chẩn đoán ${disName} (xác suất ${pct}%). `;

    if (isShock || isHypoxia) {
      narrative += '⚠️ CẢNH BÁO: Bệnh nhân có dấu hiệu SỐC hoặc SUY HÔ HẤP — cần can thiệp cấp cứu ngay. ';
    } else if (isFever && isTachycardia) {
      narrative += 'Sốt kết hợp nhịp tim nhanh gợi ý nhiễm khuẩn toàn thân. ';
    }
    if (isRapidBreathing) {
      narrative += `Nhịp thở ${rr} l/phút (≥ 30) — tiêu chí CURB-65 dương tính, nguy cơ cao. `;
    }

    narrative += 'Quyết định điều trị cuối cùng cần dựa trên đánh giá lâm sàng toàn diện của bác sĩ.';
    return narrative;
  }

};

if (typeof window !== 'undefined') {
  window.CXR_CDSS_ENGINE = CXR_CDSS_ENGINE;
}
