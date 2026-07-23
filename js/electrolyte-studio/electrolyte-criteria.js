/**
 * electrolyte-criteria.js — Electrolyte Pro Studio
 * Quy tắc sinh lý, công thức tính toán & Tiêu chuẩn xử trí cấp cứu điện giải.
 */

const ELECTROLYTE_CRITERIA = {
  // 1. Tính Nước Tổng Cơ Thể (TBW)
  calculateTBW(weight, age, gender) {
    let factor = 0.6;
    if (gender === 'male') {
      factor = age >= 65 ? 0.5 : 0.6;
    } else {
      factor = age >= 65 ? 0.45 : 0.5;
    }
    return { tbw: weight * factor, factor };
  },

  // 2. Phương trình Adrogué-Madias (Biến thiên Natri trên 1L dịch)
  calculateAdrogueMadias(fluidNa, currentNa, tbw) {
    return (fluidNa - currentNa) / (tbw + 1);
  },

  // 3. Canxi hiệu chỉnh Albumin
  calculateCorrectedCalcium(caTotal, albGperL) {
    // Albumin g/L -> nếu alb < 40: Ca_corr = Ca + 0.02 * (40 - Alb)
    const alb = albGperL || 40;
    return caTotal + 0.02 * (40 - alb);
  },

  // 4. Lượng Nước Tự Do Thiếu Hụt (Water Deficit cho Tăng Na+)
  calculateWaterDeficit(currentNa, tbw) {
    if (currentNa <= 145) return 0;
    return tbw * ((currentNa / 140) - 1);
  },

  // 5. Đơn thuốc & Hướng xử trí theo cấp độ ưu tiên (Priority 1, 2, 3)
  getDirectives(elyteData) {
    const directives = [];

    // --- SUB-MODULE 1: NATRI ---
    if (elyteData.naCurrent < 135) {
      // HẠ NATRI MÁU
      if (elyteData.symptoms === 'severe' && elyteData.naCurrent < 130) {
        directives.push({
          priority: "priority-1",
          icon: "🚨",
          title: "Ưu tiên 1: Y lệnh Cấp cứu Phù Não (Protocol Bolus NaCl 3%)",
          commands: [
            "<strong>Truyền tĩnh mạch nhanh <span class='dose-highlight'>100 - 150 mL NaCl 3% trong 20 phút</span></strong>.",
            "Có thể lặp lại 2 lần nữa (mỗi 20 phút) nếu chưa đỡ co giật hoặc Na+ chưa tăng 5 mmol/L.",
            "XN lại điện giải đồ mỗi 2-4 giờ."
          ]
        });
      }

      let maxRate = 10;
      let hasOds = elyteData.odsRisks && elyteData.odsRisks.length > 0;
      if (hasOds) maxRate = 6;

      const reqChange = elyteData.naTarget - elyteData.naCurrent;
      directives.push({
        priority: hasOds ? "priority-1" : "priority-2",
        icon: "🛡️",
        title: `Ưu tiên 2: Phác đồ Duy trì & Phòng Hủy Myelin (ODS Limit: ${maxRate} mmol/L/24h)`,
        commands: [
          `Tốc độ nâng Natri tối đa an toàn: <strong><span class='dose-highlight'>≤ ${maxRate} mmol/L trong 24 giờ đầu</span></strong>.`,
          hasOds ? "<span style='color:#ef4444; font-weight:700;'>🚨 NGUY CƠ ODS CAO:</span> Bệnh nhân nghiện rượu/suy dinh dưỡng/hạ K+ -> Giới hạn nâng Na+ tối đa 4-6 mmol/L/24h." : "Theo dõi Natri máu mỗi 4-6 giờ.",
          "Cần tính toán bù thêm lượng nước mất tiếp diễn qua nước tiểu & sốt."
        ]
      });
    } else if (elyteData.naCurrent > 145) {
      // TĂNG NATRI MÁU
      directives.push({
        priority: "priority-2",
        icon: "🚰",
        title: "Bù Nước Tự Do (Free Water Deficit)",
        commands: [
          "Ưu tiên bù nước qua đường uống hoặc truyền Dextrose 5% / NaCl 0.45%.",
          "Tốc độ hạ Natri tối đa: <strong>≤ 10 mmol/L trong 24 giờ</strong> để tránh phù não cấp."
        ]
      });
    }

    // --- SUB-MODULE 2: KALI ---
    if (elyteData.kVal >= 5.5) {
      // TĂNG KALI MÁU (UKKA 2023)
      if (elyteData.kEcg > 0 || elyteData.kVal >= 6.5) {
        directives.push({
          priority: "priority-1",
          icon: "🛡️",
          title: "Tăng K+ — Ưu tiên 1: Ổn định màng tế bào cơ tim",
          commands: [
            "<strong>Tiêm TM chậm <span class='dose-highlight'>30 mL Calcium Gluconate 10%</span> (hoặc 10 mL Calcium Chloride 10%) trong 10 phút.</strong>",
            elyteData.kEcg === 3 ? "<span style='color:#ef4444; font-weight:800;'>CẤP CỨU NGƯNG TIM:</span> Tiêm TM nhanh 10 mL Calcium Chloride 10% ngay lập tức!" : "Ghi lại ECG sau 5-10 phút. Nếu còn biến đổi ECG, lặp lại liều Canxi lần 2."
          ]
        });
      }

      if (elyteData.kVal >= 6.0 || elyteData.kEcg > 0) {
        directives.push({
          priority: "priority-2",
          icon: "📉",
          title: "Tăng K+ — Ưu tiên 2: Dịch chuyển K+ vào tế bào",
          commands: [
            "<strong>Truyền TM Insulin-Glucose:</strong> Pha <span class='dose-highlight'>10 UI Insulin Actrapid</span> vào <span class='dose-highlight'>125 mL Dextrose 20%</span> (hoặc 50mL D50%) truyền TM trong <strong>15-30 phút</strong>.",
            "Phun khí dung: <span class='dose-highlight'>Salbutamol 10-20 mg</span> (Nebules 2.5mg x 4-8 ống).",
            "Thử đường huyết mao mạch mỗi giờ trong 6 giờ."
          ]
        });
      }

      directives.push({
        priority: "priority-3",
        icon: "🚽",
        title: "Tăng K+ — Ưu tiên 3: Đào thải K+ khỏi cơ thể",
        commands: [
          "Dừng thuốc gây tăng K+ (ACEi, ARB, Spironolactone, NSAIDs).",
          "Uống: <span class='dose-highlight'>Sodium Zirconium Cyclosilicate (SZC) 10g x 3 lần/ngày</span> hoặc Resonium/Kalimate 15g x 3 lần/ngày.",
          elyteData.kVal >= 6.5 ? "<span style='color:#ef4444; font-weight:700;'>Chỉ định Lọc máu cấp cứu (HD)</span> nếu thiểu niệu hoặc không đáp ứng nội khoa." : "Tiêm TM Furosemide 40-80mg nếu tiểu được."
        ]
      });
    } else if (elyteData.kVal < 3.5) {
      // HẠ KALI MÁU
      if (elyteData.kVal < 2.5 || elyteData.kEcg > 0 || elyteData.kSymp === 1) {
        directives.push({
          priority: "priority-1",
          icon: "🚨",
          title: "Hạ K+ — Ưu tiên 1: Bù Kali tĩnh mạch CẤP CỨU",
          commands: [
            "Pha <span class='dose-highlight'>3 ống KCl 10% (10ml) vào 1 Lít NaCl 0.9%</span> (Nồng độ max 40 mmol/L).",
            "Tốc độ truyền tối đa: <span class='dose-highlight'>10 - 20 mmol/giờ</span> qua máy truyền dịch.",
            "Bắt buộc kiểm tra & Bù <span class='dose-highlight'>Magnesium (MgSO4 2g TM)</span> nếu Mg2+ thấp."
          ]
        });
      } else {
        directives.push({
          priority: "priority-2",
          icon: "💊",
          title: "Hạ K+ — Uống / Truyền duy trì chậm",
          commands: [
            "Đường uống (ưu tiên): <span class='dose-highlight'>Kaleorid 600mg (8 mmol K+) 1-2 viên x 2-3 lần/ngày</span>.",
            "Kiểm tra và bù Magnesium máu kèm theo."
          ]
        });
      }
    }

    // --- SUB-MODULE 3: CANXI ---
    const caCorr = this.calculateCorrectedCalcium(elyteData.caVal, elyteData.caAlb);

    if (caCorr > 2.60) {
      // TĂNG CANXI MÁU
      if (caCorr > 3.5 || elyteData.caSymp === 3) {
        directives.push({
          priority: "priority-1",
          icon: "🚰",
          title: "Tăng Ca2+ — Ưu tiên 1: Bù dịch tích cực (Resuscitation)",
          commands: [
            "Truyền TM <span class='dose-highlight'>NaCl 0.9% 1000 mL trong 2-4 giờ đầu</span>. Tổng liều 3-6 Lít/24h.",
            "Mục tiêu nước tiểu > 100 mL/giờ."
          ]
        });
        directives.push({
          priority: "priority-2",
          icon: "💉",
          title: "Tăng Ca2+ — Ưu tiên 2: Bisphosphonates & Calcitonin",
          commands: [
            "<strong>Zoledronic Acid:</strong> <span class='dose-highlight'>4 mg pha 50mL NaCl 0.9% truyền TM 15 phút</span>.",
            "Calcitonin: <span class='dose-highlight'>4 IU/kg tiêm bắp / tiêm dưới da mỗi 12 giờ</span>."
          ]
        });
      }
    } else if (caCorr < 2.20) {
      // HẠ CANXI MÁU
      if (caCorr < 1.90 || elyteData.caSymp === 2) {
        directives.push({
          priority: "priority-1",
          icon: "🚨",
          title: "Hạ Ca2+ — Ưu tiên 1: Bù Canxi Tĩnh mạch CẤP CỨU",
          commands: [
            "Bolus: <span class='dose-highlight'>10 - 20 mL Calcium Gluconate 10% pha 50-100mL D5%</span> truyền TM chậm trong 10-20 phút.",
            "Duy trì: Pha <span class='dose-highlight'>100 mL Calcium Gluconate 10% vào 1 Lít D5%</span> truyền TM 50-100 mL/giờ.",
            "Kiểm tra & bù Magie máu."
          ]
        });
      }
    }

    if (directives.length === 0) {
      directives.push({
        priority: "priority-ok",
        icon: "✅",
        title: "Tình trạng Điện giải Ổn định",
        commands: ["Các chỉ số Natri, Kali, Canxi ở ngưỡng an toàn. Tiếp tục theo dõi lâm sàng."]
      });
    }

    return directives;
  }
};
