/**
 * electrolyte-management.js — Electrolyte Pro Studio
 * Động cơ xử trí lâm sàng cá nhân hóa cho rối loạn Điện giải (Na+, K+, Ca2+, Mg2+).
 * Xử lý cả Ca bệnh mẫu lẫn thông số tự điền riêng.
 */

class ElectrolyteManagement {
  /**
   * Sinh phác đồ xử trí chi tiết dựa trên elyteData
   * @param {Object} elyteData 
   * @param {Object|null} scenarioData - Dữ liệu scenario nếu đang ở chế độ ca mẫu
   * @returns {Object} Các phần xử trí: immediate, shortTerm, maintenance, monitoring, complications
   */
  static generateProtocol(elyteData, scenarioData = null) {
    const weight = parseFloat(elyteData.weight) || 60;
    const na = parseFloat(elyteData.naCurrent) || 135;
    const k = parseFloat(elyteData.kVal) || 4.0;
    const caRaw = parseFloat(elyteData.caVal) || 2.25;
    const alb = parseFloat(elyteData.caAlb) || 40;
    const caCorr = ELECTROLYTE_CRITERIA.calculateCorrectedCalcium(caRaw, alb);
    const mg = parseFloat(elyteData.mgVal) || 0.85;

    const protocols = [];

    // --- 1. XỬ TRÍ NATRI (Na+) ---
    if (na < 135) {
      protocols.push(this._getHyponatremiaProtocol(na, elyteData, weight));
    } else if (na > 145) {
      protocols.push(this._getHypernatremiaProtocol(na, elyteData, weight));
    }

    // --- 2. XỬ TRÍ KALI (K+) ---
    if (k < 3.5) {
      protocols.push(this._getHypokalemiaProtocol(k, elyteData, weight));
    } else if (k >= 5.5) {
      protocols.push(this._getHyperkalemiaProtocol(k, elyteData, weight));
    }

    // --- 3. XỬ TRÍ CANXI (Ca2+) ---
    if (caCorr < 2.20) {
      protocols.push(this._getHypocalcemiaProtocol(caCorr, elyteData, weight));
    } else if (caCorr > 2.60) {
      protocols.push(this._getHypercalcemiaProtocol(caCorr, elyteData, weight));
    }

    // --- 4. XỬ TRÍ MAGIE (Mg2+) ---
    if (mg < 0.75) {
      protocols.push(this._getHypomagnesemiaProtocol(mg, elyteData, weight));
    } else if (mg > 1.25) {
      protocols.push(this._getHypermagnesemiaProtocol(mg, elyteData, weight));
    }

    // Tổng hợp danh sách protocol thành các bước đồng bộ
    const immediate = [];
    const shortTerm = [];
    const maintenance = [];
    const monitoring = [];
    const complications = [];

    // Nếu là ca mẫu và có scenarioData.management, thêm phần ghi chú đặc thù từ ca mẫu
    if (scenarioData && scenarioData.patient && scenarioData.patient.symptoms) {
      immediate.push({
        badge: "Đặc thù ca bệnh",
        type: "danger",
        title: `Định hướng lâm sàng ca bệnh: ${scenarioData.title}`,
        desc: scenarioData.patient.description,
        actions: scenarioData.patient.symptoms
      });
    }

    protocols.forEach(p => {
      if (p.immediate) immediate.push(...p.immediate);
      if (p.shortTerm) shortTerm.push(...p.shortTerm);
      if (p.maintenance) maintenance.push(...p.maintenance);
      if (p.monitoring) monitoring.push(...p.monitoring);
      if (p.complications) complications.push(...p.complications);
    });

    if (protocols.length === 0) {
      immediate.push({
        badge: "Bình thường",
        type: "success",
        title: "Tình trạng Điện Giải Trong Giới Hạn Sinh Lý",
        desc: "Các chỉ số Na+, K+, Ca2+, Mg2+ hiện tại ở mức an toàn.",
        actions: ["Không cần xử trí cấp cứu điện giải.", "Duy trì chế độ ăn và theo dõi định kỳ."]
      });
    }

    return {
      ionCount: protocols.length,
      immediate,
      shortTerm,
      maintenance,
      monitoring,
      complications
    };
  }

  // --- HẠ NATRI MÁU ---
  static _getHyponatremiaProtocol(na, elyteData, weight) {
    const isSevere = elyteData.symptoms === 'severe' || na < 120;
    const hasOds = elyteData.odsRisks && elyteData.odsRisks.length > 0;

    const res = {
      immediate: [],
      shortTerm: [],
      maintenance: [],
      monitoring: [],
      complications: []
    };

    if (isSevere) {
      res.immediate.push({
        badge: "Khẩn Cấp (Priority 1)",
        type: "danger",
        title: "Xử Trí Phù Não / Triệu Chứng Thần Kinh Cấp Tính do Hạ Na+",
        desc: "Cần nâng Natri máu khẩn cấp 4-6 mmol/L trong 1-2 giờ đầu để chống tụt não.",
        actions: [
          `<strong>Y lệnh Bolus:</strong> Tiêm/truyền tĩnh mạch nhanh <span class="dose-highlight">150 mL NaCl 3% trong 20 phút</span> (liều ước tính 2 mL/kg ~ ${Math.round(weight * 2)} mL).`,
          `Nếu triệu chứng co giật/hôn mê không cải thiện, lặp lại liều Bolus 150 mL NaCl 3% lần 2 sau 20 phút (tối đa 3 lần).`,
          `Mục tiêu: Đạt mức tăng Na+ cấp từ 4 – 6 mmol/L hoặc hết triệu chứng thần kinh nguy kịch.`
        ]
      });
    }

    res.shortTerm.push({
      badge: "Duy Trì 1-24h",
      type: "warning",
      title: "Kiểm Soát Tốc Độ Nâng Natri & Động Học Adrogué-Madias",
      desc: `Giới hạn tốc độ nâng Na+ tuyệt đối: ≤ ${hasOds ? '6' : '10'} mmol/L/24h.`,
      actions: [
        hasOds 
          ? `<strong class="text-danger">⚠️ NGUY CƠ ODS CAO:</strong> Bệnh nhân có yếu tố nguy cơ ODS (nghiện rượu / suy dinh dưỡng / hạ K+). Tốc độ nâng Na+ KHÔNG VƯỢT QUÁ <span class="dose-highlight">4 - 6 mmol/L/24h</span>.`
          : `Tốc độ nâng Na+ an toàn tối đa: <span class="dose-highlight">8 - 10 mmol/L trong 24h đầu</span> và ≤ 18 mmol/L trong 48h.`,
        `Tính toán theo công thức Adrogué-Madias với dịch chọn lựa. Cài đặt tốc độ qua máy truyền dịch (Infusion Pump).`
      ]
    });

    res.maintenance.push({
      badge: "> 24 Giờ",
      type: "info",
      title: "Xử Trí Theo Nguyên Nhân Hạ Na+ Máu",
      desc: "Xác định thể tích tuần hoàn (Giảm thể tích, Đẳng thể tích hay Thừa thể tích).",
      actions: [
        `<strong>SIADH (Đẳng thể tích):</strong> Hạn chế nước < 800 - 1000 mL/ngày, cân nhắc viên muối NaCl uống hoặc Urea/Tolvaptan.`,
        `<strong>Giảm thể tích (Nôn, tiêu chảy, lợi tiểu):</strong> Bù NaCl 0.9% đường tĩnh mạch.`,
        `<strong>Suy tim / Xơ gan (Thừa thể tích):</strong> Hạn chế nước + Lợi tiểu quai (Furosemide).`
      ]
    });

    res.monitoring.push({
      badge: "Theo Dõi",
      type: "info",
      title: "Tần Suất Kiểm Tra Sinh Hóa Na+",
      desc: "Phòng ngừa nâng quá nhanh (Overcorrection).",
      actions: [
        `Trong giai đoạn Bolus cấp cứu: Xét nghiệm lại Na+ máu mỗi 2 - 4 giờ.`,
        `Khi tình trạng ổn định: Xét nghiệm Na+ máu mỗi 6 - 8 giờ trong 24 giờ đầu.`,
        `Theo dõi sát lượng nước tiểu (nếu nước tiểu vọt > 100 mL/giờ → nguy cơ tự điều chỉnh nâng Na+ quá nhanh).`
      ]
    });

    res.complications.push({
      badge: "Cảnh Báo Nặng",
      type: "danger",
      title: "Hội Chứng Hủy Myelin Cầu Não (ODS / CPM)",
      desc: "Xảy ra khi Na+ tăng quá 10-12 mmol/L/24h, gây liệt tứ chi, ngưng thở, khóa trong (Locked-in syndrome).",
      actions: [
        `Nếu Na+ tăng quá nhanh (Overcorrection > 6-8 mmol/L trong 12h): Ngưng ngay dung dịch ưu trương.`,
        `Truyền Dextrose 5% 3 mL/kg/giờ hoặc cho Desmopressin (DDAVP) 1-2 mcg tiêm TM/tiêm dưới da để hạ lại Na+ về ngưỡng an toàn.`
      ]
    });

    return res;
  }

  // --- TĂNG NATRI MÁU ---
  static _getHypernatremiaProtocol(na, elyteData, weight) {
    const { tbw } = ELECTROLYTE_CRITERIA.calculateTBW(weight, parseInt(elyteData.age)||50, elyteData.gender||'male');
    const deficit = ELECTROLYTE_CRITERIA.calculateWaterDeficit(na, tbw);

    return {
      immediate: [{
        badge: "Khẩn Cấp",
        type: "danger",
        title: "Bù Nước Tự Do & Hạ Natri Máu An Toàn",
        desc: `Lượng nước tự do thiếu hụt ước tính: ${deficit.toFixed(2)} Lít.`,
        actions: [
          `Ưu tiên bù nước tự do qua <strong>đường uống hoặc xông dạ dày (Nước chín)</strong> nếu bệnh nhân tỉnh.`,
          `Nếu không uống được: Truyền tĩnh mạch <strong>Dextrose 5%</strong> hoặc <strong>NaCl 0.45%</strong>.`,
          `Tốc độ giảm Na+ tuyệt đối: <span class="dose-highlight">≤ 0.5 mmol/L/giờ</span> (Tối đa ≤ 10 mmol/L/24h) để tránh Phù Não cấp.`
        ]
      }],
      shortTerm: [{
        badge: "1-24 Giờ",
        type: "warning",
        title: "Tính Liều Dịch Truyền Hạ Natri",
        desc: "Phân bổ bù lượng nước thiếu hụt trong 48 - 72 giờ.",
        actions: [
          `Bù 50% lượng nước thiếu hụt (${(deficit/2).toFixed(2)} Lít) trong 24 giờ đầu + cộng thêm lượng nước mất tiếp diễn (sốt, mồ hôi, tiểu nhiều).`,
          `50% lượng nước thiếu hụt còn lại bù trong 24 - 48 giờ tiếp theo.`
        ]
      }],
      monitoring: [{
        badge: "Theo Dõi",
        type: "info",
        title: "Giám Sát Hạ Na+",
        desc: "Đánh giá tri giác và Osmolal máu.",
        actions: [
          `Đo Na+ máu mỗi 4 giờ trong 12 giờ đầu.`,
          `Nếu tri giác xấu đi khi Na+ giảm → Đề phòng Phù Não cấp do bù nước quá nhanh.`
        ]
      }]
    };
  }

  // --- HẠ KALI MÁU ---
  static _getHypokalemiaProtocol(k, elyteData, weight) {
    const isSevere = k < 2.5 || elyteData.kEcg > 0 || elyteData.kSymp === 1;

    return {
      immediate: [{
        badge: isSevere ? "Khẩn Cấp (Priority 1)" : "Ưu Tiên 2",
        type: isSevere ? "danger" : "warning",
        title: isSevere ? "Bù Kali Tĩnh Mạch Khẩn Cấp (K+ < 2.5 hoặc Biến Đổi ECG)" : "Bù Kali Đường Uống / Truyền Chậm",
        desc: isSevere ? "Nguy cơ loạn nhịp tim nguy hiểm (Xoắn đỉnh, VF) và liệt cơ hô hấp." : "Tình trạng hạ K+ nhẹ đến trung bình.",
        actions: isSevere ? [
          `<strong>Y lệnh Tĩnh mạch:</strong> Pha <span class="dose-highlight">40 mmol KCl (tương đương 4 ống KCl 10% 10ml) vào 1 Lít NaCl 0.9%</span>.`,
          `Tốc độ truyền qua máy tiêm điện / máy truyền dịch: <span class="dose-highlight">10 - 20 mmol K+/giờ</span> (Ngoại trừ cấp cứu ngưng tim).`,
          `Bắt buộc theo dõi Monitor tim liên tục trong suốt quá trình truyền KCl tốc độ cao.`,
          `<strong class="text-danger">BẮT BUỘC BÙ MAGNESIUM:</strong> Tiêm TM <span class="dose-highlight">MgSO4 15% 2-4g (10-20 mmol)</span> pha D5% truyền trong 20 phút (Hạ Mg2+ làm trơn kênh Na-K-ATPase làm bù K+ thất bại).`
        ] : [
          `Đường uống (Ưu tiên): <span class="dose-highlight">Kaleorid 600mg (8 mmol K+) 1-2 viên x 2-3 lần/ngày</span> sau ăn.`,
          `Hoặc dung dịch KCl 10% uống (10ml = 13.4 mmol K+) pha loãng với nước trái cây.`
        ]
      }],
      shortTerm: [{
        badge: "Lưu Ý An Toàn",
        type: "warning",
        title: "Quy Tắc An Toàn Khi Bù Kali Tĩnh Mạch",
        desc: "Tránh hoại tử mô & ngưng tim do lỡ tay đẩy tĩnh mạch trực tiếp.",
        actions: [
          `<strong class="text-danger">❌ KHÔNG BAO GIỜ TIÊM TĨNH MẠCH TRỰC TIẾP (IV PUSH) KCl!</strong> Lỗi này gây ngưng tim thì tâm thu lập tức.`,
          `Nồng độ KCl truyền tĩnh mạch ngoại vi tối đa: 40 mmol/L. Nếu cần bù nồng độ cao hơn (đến 60 mmol/L), bắt buộc dùng Tĩnh Mạch Trung Tâm (CVC).`
        ]
      }],
      monitoring: [{
        badge: "Theo Dõi",
        type: "info",
        title: "Tần Suất XN Kali",
        desc: "Đánh giá mức độ hồi phục K+.",
        actions: [
          `Sau mỗi 20-40 mmol K+ truyền TM: Xét nghiệm lại K+ máu sau 2 giờ.`,
          `Kiểm tra nước tiểu: Cần đảm bảo lượng nước tiểu > 0.5 mL/kg/giờ trước khi bù K+ lượng lớn.`
        ]
      }]
    };
  }

  // --- TĂNG KALI MÁU ---
  static _getHyperkalemiaProtocol(k, elyteData, weight) {
    const ecg = elyteData.kEcg; // 0: Bình thường, 1: T cao nhọn, 2: Mất P/QRS rộng, 3: Sóng hình sin/VF

    return {
      immediate: [{
        badge: "Ưu Tiên 1 — Khẩn Cấp",
        type: "danger",
        title: "1. Ổn Định Màng Tế Bào Cơ Tim (Protection)",
        desc: "Chống rung thất và ngưng tim thì tâm trương. Tác dụng trong 1-3 phút.",
        actions: [
          `<strong>Y lệnh Tiêm Canxi:</strong> Tiêm tĩnh mạch chậm <span class="dose-highlight">Calcium Gluconate 10% 30 mL</span> (hoặc Calcium Chloride 10% 10 mL qua CVC) trong 5-10 phút.`,
          ecg === 3 ? `<strong class="text-danger">🚨 CẤP CỨU NGƯNG TIM / SÓNG HÌNH SIN:</strong> Tiêm TM nhanh Calcium Chloride 10% 10 mL ngay lập tức!` : `Nếu sau 5-10 phút ECG vẫn còn biến đổi (T cao nhọn, QRS rộng) → Tiêm lặp lại liều Canxi thứ 2.`
        ]
      }, {
        badge: "Ưu Tiên 2 — Cấp Cứu",
        type: "danger",
        title: "2. Dịch Chuyển K+ Vào Trong Tế Bào (Shift K+)",
        desc: "Hạ K+ máu tạm thời trong 2 - 4 giờ.",
        actions: [
          `<strong>Insulin + Glucose:</strong> Pha <span class="dose-highlight">10 UI Insulin Actrapid</span> vào <span class="dose-highlight">125 mL Dextrose 20%</span> (hoặc 50 mL D50%), truyền TM trong 15 - 30 phút. (Bắt buộc thử đường huyết trước).`,
          `<strong>Phun Khí Dung Salbutamol:</strong> Kích thích $\\beta_2$-agonist: Phun khí dung <span class="dose-highlight">Salbutamol 10 - 20 mg</span> (Nebules 2.5mg x 4-8 ống) trong 15 phút.`,
          `<strong>Sodium Bicarbonate 8.4%:</strong> Chỉ dùng nếu có Toan chuyển hóa kèm theo (pH < 7.20). Truyền TM 50 - 100 mL.`
        ]
      }],
      shortTerm: [{
        badge: "Ưu Tiên 3",
        type: "warning",
        title: "3. Đào Thải K+ Ra Khỏi Cơ Thể (Elimination)",
        desc: "Loại bỏ K+ thực sự khỏi cơ thể.",
        actions: [
          `<strong>Lợi tiểu quai:</strong> Tiêm TM <span class="dose-highlight">Furosemide 40 - 80 mg</span> (nếu bệnh nhân còn chức năng thận & không tụt HA).`,
          `<strong>Thuốc trao đổi Ion đường ruột:</strong> Uống <span class="dose-highlight">Sodium Zirconium Cyclosilicate (SZC / Lokelma) 10g x 3 lần/ngày</span> hoặc Kalimate / Resonium 15g pha nước uống.`,
          k >= 6.5 || ecg >= 2 
            ? `<strong class="text-danger">🚨 CHỈ ĐỊNH LỌC MÁU CẤP CỨU (HD / CRRT):</strong> Chuẩn bị lọc máu khẩn cấp nếu Kali ≥ 6.5 mmol/L, vô niệu hoặc thất bại với điều trị nội khoa.`
            : `Đình chỉ ngay các thuốc làm tăng K+: ACEi, ARB, Spironolactone, NSAIDs, Potassium supplements.`
        ]
      }],
      monitoring: [{
        badge: "Theo Dõi Tim",
        type: "info",
        title: "Theo Dõi Monitor & Đường Huyết",
        desc: "Tránh hạ đường huyết do Insulin.",
        actions: [
          `Đo đường huyết mao mạch mỗi 1 giờ trong 4 - 6 giờ sau khi truyền Insulin-Glucose.`,
          `Đo Kali máu lại sau 1-2 giờ. Đảm bảo ECG trở về nhịp xoang bình thường.`
        ]
      }]
    };
  }

  // --- HẠ CANXI MÁU ---
  static _getHypocalcemiaProtocol(caCorr, elyteData, weight) {
    const isSevere = caCorr < 1.90 || elyteData.caSymp >= 2;

    return {
      immediate: [{
        badge: isSevere ? "Khẩn Cấp" : "Ưu Tiên 2",
        type: isSevere ? "danger" : "warning",
        title: isSevere ? "Bù Canxi Tĩnh Mạch Cấp Cứu (Co giật / Tetany / Chvostek-Trousseau (+))" : "Bù Canxi Đường Uống",
        desc: "Tình trạng hạ Ca2+ nặng gây co thắt thanh quản, co quắp tay chân (Tetany) hoặc kéo dài QTc.",
        actions: isSevere ? [
          `<strong>Bolus Cấp cứu:</strong> Pha <span class="dose-highlight">10 - 20 mL Calcium Gluconate 10%</span> (1-2 ống) vào 50-100 mL Dextrose 5%, truyền tĩnh mạch chậm trong 10 - 20 phút.`,
          `<strong>Duy trì:</strong> Pha <span class="dose-highlight">100 mL Calcium Gluconate 10% (10 ống) vào 1 Lít Dextrose 5%</span>, truyền TM với tốc độ 50 - 100 mL/giờ qua bơm tiêm điện.`,
          `Mục tiêu: Đạt Ca2+ hiệu chỉnh > 2.0 mmol/L và hết triệu chứng Tetany.`,
          `Bù Magnesium phối hợp nếu Mg2+ máu thấp.`
        ] : [
          `Bổ sung đường uống: <span class="dose-highlight">Calcium Carbonate 1000 - 1500 mg/ngày</span> (chứa 400-600mg Ca2+ nguyên tố) chia 2-3 lần.`,
          `Kết hợp Vitamin D hoạt hóa: <span class="dose-highlight">Calcitriol 0.25 - 0.5 mcg/ngày</span>.`
        ]
      }]
    };
  }

  // --- TĂNG CANXI MÁU ---
  static _getHypercalcemiaProtocol(caCorr, elyteData, weight) {
    const isCrisis = caCorr > 3.5 || elyteData.caSymp === 3;

    return {
      immediate: [{
        badge: isCrisis ? "Khủng Hoảng (Crisis)" : "Ưu Tiên 2",
        type: isCrisis ? "danger" : "warning",
        title: "1. Bù Dịch NaCl 0.9% Tích Cực (Volume Resuscitation)",
        desc: "Tăng Canxi máu gây tiểu nhiều mất nước nặng. Bù dịch giúp hạ Canxi qua đường tiểu.",
        actions: [
          `<strong>Truyền TM NaCl 0.9%:</strong> <span class="dose-highlight">1000 mL trong 2 - 4 giờ đầu</span>, sau đó duy trì 200 - 300 mL/giờ. Tổng thể tích 3 - 6 Lít/24 giờ.`,
          `Mục tiêu: Đạt lượng nước tiểu > 100 - 150 mL/giờ.`
        ]
      }, {
        badge: "Thuốc Ức Chế Hủy Xương",
        type: "danger",
        title: "2. Thuốc Hạ Canxi Máu Đặc Hiệu",
        desc: "Zoledronic Acid & Calcitonin.",
        actions: [
          `<strong>Zoledronic Acid (Bisphosphonate):</strong> <span class="dose-highlight">4 mg pha trong 100 mL NaCl 0.9%</span> truyền TM trong ít nhất 15 phút. (Tác dụng tối đa sau 2-4 ngày).`,
          `<strong>Calcitonin:</strong> <span class="dose-highlight">4 UI/kg tiêm bắp / tiêm dưới da mỗi 12 giờ</span>. Tác dụng hạ Ca2+ nhanh sau 4-6h (dùng tạm thời trong khi chờ Zoledronic Acid tác dụng).`
        ]
      }]
    };
  }

  // --- HẠ MAGIE MÁU ---
  static _getHypomagnesemiaProtocol(mg, elyteData, weight) {
    return {
      immediate: [{
        badge: mg < 0.5 ? "Khẩn Cấp" : "Ưu Tiên 2",
        type: mg < 0.5 ? "danger" : "warning",
        title: "Bù Magnesium Tĩnh Mạch",
        desc: "Hạ Mg2+ gây hạ K+ và hạ Ca2+ kháng trị, nguy cơ Xoắn Đỉnh (Torsades de Pointes).",
        actions: [
          `<strong>Nguy kịch / Xoắn đỉnh:</strong> Tiêm TM nhanh <span class="dose-highlight">MgSO4 15% 2g (13.3 mmol) pha 10 mL D5% trong 1 - 2 phút</span>.`,
          `<strong>Nặng (Mg < 0.5 mmol/L):</strong> Pha <span class="dose-highlight">MgSO4 15% 4 - 6g vào 500 mL NaCl 0.9%</span> truyền TM trong 4 - 6 giờ.`,
          `Duy trì: 1-2g MgSO4 mỗi ngày.`
        ]
      }]
    };
  }

  // --- TĂNG MAGIE MÁU ---
  static _getHypermagnesemiaProtocol(mg, elyteData, weight) {
    return {
      immediate: [{
        badge: "Cấp Cứu",
        type: "danger",
        title: "Xử Trí Tăng Magie Máu Nặng",
        desc: "Ức chế thần kinh cơ, mất phản xạ gân xương, hạ huyết áp, ngưng thở.",
        actions: [
          `Ngưng ngay tất cả nguồn bổ sung Magie (thuốc nhuận tràng, antacid chứa Mg).`,
          `<strong>Đối kháng độc tính:</strong> Tiêm tĩnh mạch <span class="dose-highlight">Calcium Gluconate 10% 10 - 20 mL</span> trong 5 - 10 phút.`,
          `Bù dịch NaCl 0.9% + Furosemide để tăng thải Mg qua nước tiểu.`,
          `Lọc máu cấp cứu nếu suy thận nặng.`
        ]
      }]
    };
  }
}
