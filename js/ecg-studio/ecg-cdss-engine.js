/**
 * ECG Pro Studio — AI-CDSS Bayesian Cardiovascular Emergency & Culprit Artery Engine
 * Extends CDSSBayesianEngine for 12-lead ECG interpretation, ACS stratification, Culprit Artery localization, and ACC/AHA Hour-1 Action Bundles.
 */

(function () {
  'use strict';

  // Base Priors (Prevalence in ED Chest Pain Triage)
  const ECG_PRIORS = {
    stemi: 0.15,
    nstemi: 0.30,
    pericarditis: 0.10,
    benign: 0.45
  };

  const ECG_CDSS_ENGINE = {
    /**
     * Calculates Bayesian probability distribution for 4 cardiovascular diagnoses
     * @param {Object} vitals - Patient vitals & chest pain history
     * @param {Set|Array} activeModifiers - Currently active ECG abnormality modifier IDs
     * @returns {Object} Normalized probabilities {stemi, nstemi, pericarditis, benign}
     */
    calculateBayesianDifferential: function (vitals, activeModifiers) {
      const mods = activeModifiers instanceof Set ? Array.from(activeModifiers) : (activeModifiers || []);
      const likelihoods = {
        stemi: 1.0,
        nstemi: 1.0,
        pericarditis: 1.0,
        benign: 1.0
      };

      // 1. Evaluate ECG Abnormality Modifiers
      const hasStemiAnt = mods.includes('stemi_anterior');
      const hasStemiInf = mods.includes('stemi_inferior');
      const hasStemiLat = mods.includes('stemi_lateral');
      const hasStemiPost = mods.includes('stemi_posterior');
      const hasDeWinter = mods.includes('de_winter');
      const hasWellens = mods.includes('wellens');
      const hasNstemi = mods.includes('nstemi');
      const hasPericarditis = mods.includes('pericarditis');
      const hasBrugada = mods.includes('brugada_type1');
      const isNormal = mods.includes('sinus_normal') || mods.length === 0;

      if (hasStemiAnt || hasStemiInf || hasStemiLat || hasStemiPost || hasDeWinter) {
        likelihoods.stemi *= 18.0;
        likelihoods.nstemi *= 1.8;
        likelihoods.pericarditis *= 0.5;
        likelihoods.benign *= 0.05;
      }

      if (hasWellens || hasNstemi) {
        likelihoods.nstemi *= 12.0;
        likelihoods.stemi *= 2.5;
        likelihoods.pericarditis *= 0.6;
        likelihoods.benign *= 0.1;
      }

      if (hasPericarditis) {
        likelihoods.pericarditis *= 15.0;
        likelihoods.stemi *= 1.2;
        likelihoods.nstemi *= 0.8;
        likelihoods.benign *= 0.15;
      }

      if (hasBrugada) {
        likelihoods.stemi *= 3.0;
        likelihoods.pericarditis *= 1.5;
        likelihoods.benign *= 0.1;
      }

      if (isNormal && !hasStemiAnt && !hasStemiInf && !hasStemiLat && !hasStemiPost && !hasNstemi && !hasWellens && !hasPericarditis) {
        likelihoods.benign *= 5.0;
        likelihoods.nstemi *= 0.4;
        likelihoods.stemi *= 0.08;
      }

      // 2. Evaluate Clinical Vitals & Chest Pain History
      if (vitals.chestPainType === 'crushing') {
        likelihoods.stemi *= 3.2;
        likelihoods.nstemi *= 2.8;
        likelihoods.pericarditis *= 0.6;
        likelihoods.benign *= 0.3;
      } else if (vitals.chestPainType === 'pleuritic') {
        likelihoods.pericarditis *= 4.5;
        likelihoods.stemi *= 0.5;
        likelihoods.nstemi *= 0.6;
        likelihoods.benign *= 1.2;
      }

      // Cardiogenic Shock / Severe Hypotension (SBP < 90)
      if (vitals.sbp && vitals.sbp < 90) {
        likelihoods.stemi *= 4.0;
        likelihoods.nstemi *= 2.0;
        likelihoods.benign *= 0.08;
      }

      // Tachycardia (HR > 110)
      if (vitals.hr && vitals.hr > 110) {
        likelihoods.stemi *= 1.6;
        likelihoods.nstemi *= 1.5;
        likelihoods.pericarditis *= 1.8;
      }

      // High Risk Score (HEART / TIMI >= 5)
      if (vitals.heartRiskScore && vitals.heartRiskScore >= 5) {
        likelihoods.stemi *= 2.5;
        likelihoods.nstemi *= 3.0;
        likelihoods.benign *= 0.2;
      }

      // Apply Global Demographic Modifiers (Age/Gender)
      const demog = typeof CDSSBayesianEngine !== 'undefined'
        ? CDSSBayesianEngine.applyDemographicModifiers(ECG_PRIORS, vitals.age || 55, vitals.gender || 'male')
        : ECG_PRIORS;

      // Combine priors with likelihood ratios (Bayes' Rule: Posterior ∝ Prior × Likelihood Ratio)
      const raw = {};
      let totalWeight = 0;
      Object.keys(ECG_PRIORS).forEach(k => {
        raw[k] = (demog[k] || ECG_PRIORS[k]) * (likelihoods[k] || 1.0);
        totalWeight += raw[k];
      });

      // Normalize over the differential partition so probabilities sum to ~1.0
      const normalized = {};
      Object.keys(raw).forEach(k => {
        const prob = totalWeight > 0 ? (raw[k] / totalWeight) : 0.25;
        normalized[k] = Math.min(0.98, Math.max(0.01, prob));
      });

      return normalized;
    },

    /**
     * Identifies the Culprit Artery and affected myocardial territory based on active modifiers
     * @param {Set|Array} activeModifiers
     * @returns {Object|null} Culprit vessel data or null if no focal ischemia
     */
    getCulpritArteryInfo: function (activeModifiers) {
      const mods = activeModifiers instanceof Set ? Array.from(activeModifiers) : (activeModifiers || []);

      if (mods.includes('stemi_anterior') || mods.includes('de_winter') || mods.includes('wellens')) {
        return {
          vesselCode: 'LAD',
          vesselName: 'Động Mạch Gian Thất Trước (LAD — Left Anterior Descending)',
          territory: 'Vùng Trước Vách / Trước Rộng (Anteroseptal / Anterior)',
          leads: ['V1', 'V2', 'V3', 'V4'],
          reciprocalLeads: ['DII', 'DIII', 'aVF'],
          clinicalAlert: 'CẢNH BÁO NGUY CƠ CAO: Tắc nghẽn nhánh gian thất trước đe dọa diện tích lớn cơ tim thất trái. Nguy cơ suy tim cấp & sốc tim!',
          contraindication: null,
          colorClass: 'danger'
        };
      }

      if (mods.includes('stemi_inferior')) {
        return {
          vesselCode: 'RCA',
          vesselName: 'Động Mạch Vành Phải (RCA — Right Coronary Artery) [80%] / LCx [20%]',
          territory: 'Vùng Thành Dưới (Inferior Wall)',
          leads: ['DII', 'DIII', 'aVF'],
          reciprocalLeads: ['DI', 'aVL'],
          clinicalAlert: 'CẢNH BÁO CHỐNG CHỈ ĐỊNH: Nhồi máu thành dưới có nguy cơ cao kèm Nhồi Máu Thất Phải (40%). Yêu cầu đo ngay chuyển đạo V3R, V4R và V7-V9.',
          contraindication: 'CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI Nitroglycerin & Morphine (tránh tụt huyết áp nặng do giảm tiền tải thất phải). Ưu tiên truyền dung dịch NaCl 0.9%!',
          colorClass: 'danger'
        };
      }

      if (mods.includes('stemi_lateral')) {
        return {
          vesselCode: 'LCx',
          vesselName: 'Động Mạch Mũ (LCx — Left Circumflex) / Nhánh Chéo D1 (LAD)',
          territory: 'Vùng Thành Bên (Lateral Wall)',
          leads: ['DI', 'aVL', 'V5', 'V6'],
          reciprocalLeads: ['DIII', 'aVF'],
          clinicalAlert: 'Tắc nhánh bên cơ tim thất trái. Cần theo dõi rối loạn nhịp và chức năng thất trái.',
          contraindication: null,
          colorClass: 'warning'
        };
      }

      if (mods.includes('stemi_posterior')) {
        return {
          vesselCode: 'LCx_RCA',
          vesselName: 'Động Mạch Mũ (LCx) hoặc Nhánh Liên Thất Sau (PDA - RCA)',
          territory: 'Vùng Thành Sau Thật (True Posterior Wall)',
          leads: ['V7', 'V8', 'V9', 'V1 (soi gương)', 'V2 (soi gương)'],
          reciprocalLeads: ['V1', 'V2', 'V3'],
          clinicalAlert: 'Hình ảnh soi gương sóng R cao rộng và ST chênh xuống ở V1-V3. Yêu cầu đo chuyển đạo V7, V8, V9 sau lưng để xác định chẩn đoán.',
          contraindication: null,
          colorClass: 'danger'
        };
      }

      return null;
    },

    /**
     * Generates hemodynamic severity triage and ACC/AHA Hour-1 clinical action bundle
     * @param {Object} vitals
     * @param {Set|Array} activeModifiers
     * @param {Object} probs - Bayesian probabilities
     * @returns {Object} Triage summary and treatment bundle
     */
    evaluateSeverityAndTreatment: function (vitals, activeModifiers, probs) {
      const culprit = this.getCulpritArteryInfo(activeModifiers);
      const triage = typeof CDSSBayesianEngine !== 'undefined'
        ? CDSSBayesianEngine.evaluateSeverityTriage(vitals)
        : { level: 'Low', score: 0 };
      const isStemi = probs.stemi >= 0.55 || culprit !== null;
      const isNstemi = probs.nstemi >= 0.50;
      const isPericarditis = probs.pericarditis >= 0.50;

      let severityLabel = 'BÌNH THƯỜNG — THEO DÕI NGOẠI TRÚ';
      let badgeClass = 'badge-severity-low';
      let summaryText = 'Điện tim hiện tại chưa phát hiện dấu hiệu thiếu máu cơ tim cấp hay tổn thương mạch vành nghiêm trọng. Tiếp tục theo dõi lâm sàng.';
      let treatments = [
        'Đo lại điện tim sau 15-30 phút nếu triệu chứng đau ngực vẫn tiếp diễn.',
        'Kiểm tra lại các yếu tố nguy cơ tim mạch và tiền sử bệnh lý của bệnh nhân.'
      ];
      let labs = [
        'Xét nghiệm Troponin I/T siêu nhạy (hs-Troponin) mẫu 0 giờ để làm mốc cơ bản.',
        'Kiểm tra Điện giải đồ (K+, Mg2+, Ca2+), Glucose máu, Chức năng thận (Ure, Creatinin).'
      ];
      let contraindications = [];

      if (triage.level === 'Critical' || isStemi) {
        severityLabel = 'NGUY KỊCH — CODE STEMI / SỐC TIM';
        badgeClass = 'badge-severity-critical';
        const vesselText = culprit ? `Tắc nhánh ${culprit.vesselCode} (${culprit.territory})` : 'Hội chứng mạch vành cấp có ST chênh lên (STEMI)';
        summaryText = `Báo động CODE STEMI! ${vesselText}. Bệnh nhân cần được kích hoạt Phòng Can thiệp Mạch vành (Cath Lab) khẩn cấp trong thời gian vàng < 90 phút.`;

        treatments = [
          'Kích hoạt ngay CODE STEMI — Liên hệ Đơn vị Can thiệp Tim mạch (Cath Lab) / Đội ngũ PCI.',
          'Nhai nát Aspirin 300-325 mg (chống kết tập tiểu cầu liều nạp ban đầu).',
          'Thuốc ức chế P2Y12: Ticagrelor 180 mg hoặc Clopidogrel 600 mg đường uống.',
          'Chống đông tiêm tĩnh mạch: Heparin không phân đoạn (UFH) bolus 60-70 U/kg (tối đa 4000 U) hoặc Enoxaparin 1 mg/kg dưới da.',
          'Đảm bảo 2 đường truyền tĩnh mạch lớn, chuẩn bị máy sốc tim sẵn sàng tại giường.'
        ];

        if (culprit && culprit.contraindication) {
          contraindications.push(culprit.contraindication);
          treatments.unshift('⚠️ CẢNH BÁO CHỐNG CHỈ ĐỊNH: KHÔNG DÙNG Nitroglycerin & Morphine trong Nhồi máu thành dưới / thất phải!');
        } else {
          treatments.push('Nitroglycerin ngậm dưới lưỡi 0.4 mg mỗi 5 phút (tối đa 3 liều) nếu HA tâm thu > 90 mmHg.');
        }

        labs = [
          'Troponin I/T siêu nhạy (hs-Troponin) — không chờ kết quả để trì hoãn PCI!',
          'Điện giải đồ, Chức năng thận, Đông máu toàn bộ (PT, aPTT, INR), Công thức máu.',
          'Đo thêm chuyển đạo V3R, V4R (nhồi máu thất phải) và V7-V9 (nhồi máu thành sau).'
        ];
      } else if (triage.level === 'High' || isNstemi) {
        severityLabel = 'NẶNG — HỘI CHỨNG MẠCH VÀNH CẤP (NSTEMI / ACS)';
        badgeClass = 'badge-severity-high';
        summaryText = 'Hình ảnh điện tim gợi ý thiếu máu cơ tim / NSTEMI nguy cơ cao. Cần nhập viện theo dõi sát tại Đơn vị Tim mạch hoặc ICU và đánh giá động học Troponin.';

        treatments = [
          'Aspirin 300-325 mg nhai nát + Thuốc ức chế P2Y12 (Ticagrelor 180 mg hoặc Clopidogrel 300-600 mg).',
          'Enoxaparin 1 mg/kg tiêm dưới da mỗi 12 giờ hoặc Heparin theo phác đồ.',
          'Đánh giá chỉ định chụp mạch vành can thiệp sớm trong 24 giờ (theo phân tầng nguy cơ GRACE / TIMI).'
        ];
        labs = [
          'Xét nghiệm hs-Troponin phác đồ 0 giờ - 1 giờ (hoặc 0h - 2h) để phát hiện delta tăng động học.',
          'Điện giải đồ, Chức năng thận, Lipid máu, NT-proBNP.'
        ];
      } else if (isPericarditis) {
        severityLabel = 'TRUNG BÌNH — VIÊM MÀNG NGOÀI TIM CẤP';
        badgeClass = 'badge-severity-mod';
        summaryText = 'Điện tim ST chênh lên lõm lan tỏa kết hợp PR chênh xuống đặc trưng của Viêm màng ngoài tim cấp. Cần phân biệt với STEMI và đánh giá tràn dịch màng tim.';

        treatments = [
          'Thuốc kháng viêm không steroid (NSAIDs): Ibuprofen 600-800 mg x 3 lần/ngày hoặc Aspirin 650-1000 mg x 3 lần/ngày.',
          'Colchicine 0.5 mg x 2 lần/ngày (trong ít nhất 3 tháng để giảm nguy cơ tái phát).',
          'Siêu âm tim tại giường (POCUS) để kiểm tra lượng dịch màng tim và dấu hiệu chèn ép tim cấp.'
        ];
        labs = [
          'CRP định lượng, Tốc độ lắng máu (ESR), Bạch cầu.',
          'Troponin I/T hs (loại trừ viêm cơ tim đồng mắc - Myopericarditis).'
        ];
      }

      const ebmLinks = [
        {
          badge: 'GUIDELINES',
          title: 'Khuyến cáo ACC/AHA & ESC — Hội chứng Mạch vành cấp (ACS)',
          url: '../../guidelines/hub.html'
        },
        {
          badge: 'DOSING',
          title: 'Tra cứu Liều Thuốc Cấp Cứu Tim Mạch Khẩn Cấp',
          url: '../../pharmacology/emergency.html'
        },
        {
          badge: 'TOOL',
          title: 'Khí máu động mạch ABG Pro Studio — Chẩn đoán Huyết động',
          url: '../renal/dg-abg-studio.html'
        }
      ];

      return {
        severityLabel,
        badgeClass,
        summaryText,
        treatments,
        labs,
        ebmLinks,
        contraindications,
        culprit
      };
    }
  };

  // Export to window global scope & CommonJS
  if (typeof window !== 'undefined') {
    window.ECGCDSSEngine = ECG_CDSS_ENGINE;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ECG_CDSS_ENGINE };
  }
})();
