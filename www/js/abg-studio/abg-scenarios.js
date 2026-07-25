/**
 * abg-scenarios.js — Blood Gas Pro Studio
 * Danh sách các ca bệnh lâm sàng cấp cứu chuẩn với bối cảnh bệnh nhân, sinh hiệu & thông số khí máu.
 */

const ABG_SCENARIOS = [
  {
    id: "sc_dka_severe",
    title: "Nhiễm toan Ceton Đái tháo đường nặng (DKA)",
    category: "Toan chuyển hóa",
    difficulty: "Trung bình",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 24 tuổi — Tiền sử ĐTĐ týp 1 tự ngưng Insulin 3 ngày",
      hr: "128 bpm",
      bp: "90/60 mmHg",
      spo2: "98% (Khí trời)",
      temp: "37.2 °C",
      rr: "32 lần/phút (Thở Kussmaul)",
      gcs: "13 điểm (Lơ mơ)",
      description: "Bệnh nhân vào viện vì thở nhanh sâu (Kussmaul), hơi thở có mùi trái cây chín, đau bụng mơ hồ và nôn ói nhiều.",
      symptoms: [
        "Thở Kussmaul sâu và nhanh (32 lần/phút)",
        "Mùi Ceton hơi thở nồng nặc",
        "Khô niêm mạc, tĩnh mạch cổ xẹp",
        "Glucose máu: 480 mg/dL, Ketone máu: 5.2 mmol/L"
      ]
    },
    abg: {
      ph: 7.12,
      pco2: 18,
      pao2: 95,
      hco3: 6,
      na: 135,
      cl: 96,
      k: 5.4,
      alb: 4.0,
      lactate: 1.8,
      glucose: 480,
      ure: 12.5,
      fio2: 21,
      duration: "acute",
      ketone: "positive"
    }
  },
  {
    id: "sc_septic_shock",
    title: "Sốc Nhiễm Trùng & Toan Lactic Cấp Cứu",
    category: "Toan chuyển hóa",
    difficulty: "Nâng cao",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nữ, 68 tuổi — Tiền sử ĐTĐ týp 2, Viêm thận bể thận cấp",
      hr: "135 bpm",
      bp: "75/45 mmHg",
      spo2: "92% (FiO2 40%)",
      temp: "39.1 °C",
      rr: "28 lần/phút",
      gcs: "11 điểm (Kích thích, lơ mơ)",
      description: "Bệnh nhân sốt cao rét run, tụt huyết áp nặng không đáp ứng bù dịch 30ml/kg. Da nổi bông, tưới máu ngoại vi kém.",
      symptoms: [
        "Tụt huyết áp kéo dài cần Noradrenaline",
        "Lactate máu tăng vọt 6.8 mmol/L",
        "Thiếu niệu (< 15 ml/giờ)",
        "BC: 24.500/mm³, CRP: 180 mg/L"
      ]
    },
    abg: {
      ph: 7.18,
      pco2: 26,
      pao2: 78,
      hco3: 9,
      na: 138,
      cl: 101,
      k: 5.1,
      alb: 3.2,
      lactate: 6.8,
      glucose: 210,
      ure: 18.2,
      fio2: 40,
      duration: "acute",
      ketone: "negative"
    }
  },
  {
    id: "sc_copd_exacerbation",
    title: "Đợt Cấp COPD Trút Cơ Hô Hấp (Toan Hô Hấp Mạn Đợt Cấp)",
    category: "Toan hô hấp",
    difficulty: "Nâng cao",
    badgeColor: "#f59e0b",
    patient: {
      demographics: "Nam, 72 tuổi — Tiền sử COPD nhóm E 15 năm, hút thuốc 50 gói-năm",
      hr: "115 bpm",
      bp: "145/90 mmHg",
      spo2: "83% (Khí trời)",
      temp: "37.5 °C",
      rr: "34 lần/phút (Thở co kéo)",
      gcs: "12 điểm (Lơ mơ do ứ CO2)",
      description: "Bệnh nhân khó thở tăng dần 3 ngày nay, ho đàm xanh đặc. Thở co kéo cơ hô hấp phụ, rì rào phế nang giảm toàn bộ hai phổi.",
      symptoms: [
        "Ứ CO2 não (Tremor tay, lơ mơ)",
        "Thở ngực bụng ngược chiều",
        "PaCO2 vọt lên 78 mmHg",
        "HCO3- cơ bản cao (38 mEq/L) thể hiện nền bù mạn"
      ]
    },
    abg: {
      ph: 7.24,
      pco2: 78,
      pao2: 52,
      hco3: 33,
      na: 140,
      cl: 94,
      k: 4.6,
      alb: 3.8,
      lactate: 1.5,
      glucose: 130,
      ure: 6.2,
      fio2: 21,
      duration: "chronic",
      ketone: "negative"
    }
  },
  {
    id: "sc_aspirin_toxicity",
    title: "Ngộ Độc Salicylate (Aspirin) — Rối Loạn Hỗn Hợp Phức Tạp",
    category: "Độc chất / Khác",
    difficulty: "Chuyên gia",
    badgeColor: "#8b5cf6",
    patient: {
      demographics: "Nữ, 29 tuổi — Uống 40 viên Aspirin 500mg để tự hại 4 giờ trước",
      hr: "120 bpm",
      bp: "110/70 mmHg",
      spo2: "97% (Khí trời)",
      temp: "38.5 °C (Tăng thân nhiệt)",
      rr: "30 lần/phút (Tăng thông khí)",
      gcs: "14 điểm (Út ớ, ù tai)",
      description: "Bệnh nhân ù tai nồng nặc, sốt nhẹ, thở rất nhanh do Kích thích trung tâm hô hấp trực tiếp bởi Salicylate kèm toan chuyển hóa tăng AG.",
      symptoms: [
        "Ù tai (Tinnitus) và hoa mắt",
        "Thở nhanh sâu kích thích",
        "Kiềm Hô Hấp kết hợp Toan Chuyển Hóa tăng AG",
        "pH gần như bình thường (7.42) nhưng khí máu bất thường cực nặng"
      ]
    },
    abg: {
      ph: 7.42,
      pco2: 20,
      pao2: 102,
      hco3: 13,
      na: 140,
      cl: 98,
      k: 3.6,
      alb: 4.0,
      lactate: 2.2,
      glucose: 110,
      ure: 5.8,
      fio2: 21,
      duration: "acute",
      ketone: "negative"
    }
  },
  {
    id: "sc_severe_vomiting",
    title: "Kiềm Chuyển Hóa Do Nôn Ói Kéo Dài (Hẹp Môn Vị)",
    category: "Kiềm chuyển hóa",
    difficulty: "Cơ bản",
    badgeColor: "#06b6d4",
    patient: {
      demographics: "Nam, 55 tuổi — Tiền sử Loét dạ dày tá tràng, nôn ói dịch chua 5 ngày",
      hr: "105 bpm",
      bp: "95/60 mmHg",
      spo2: "96% (Khí trời)",
      temp: "36.8 °C",
      rr: "14 lần/phút",
      gcs: "15 điểm",
      description: "Bệnh nhân nôn ra thức ăn cũ dịch trong chua nhiều lần trong ngày. Mất axit HCl dạ dày dẫn tới kiềm chuyển hóa nặng kèm hạ Kali máu.",
      symptoms: [
        "Mất nước độ II (Mắt trũng, véo da dương tính)",
        "Hạ Kali máu gây mỏi cơ (K+: 2.8 mmol/L)",
        "Chloride niệu rất thấp (< 10 mEq/L) — Đáp ứng Chloride",
        "Đáp ứng bù hô hấp chậm nhịp thở"
      ]
    },
    abg: {
      ph: 7.54,
      pco2: 48,
      pao2: 88,
      hco3: 40,
      na: 136,
      cl: 84,
      k: 2.8,
      alb: 4.2,
      lactate: 1.1,
      glucose: 95,
      ure: 11.2,
      urineCl: 8,
      fio2: 21,
      duration: "acute",
      ketone: "negative"
    }
  },
  {
    id: "sc_panic_hyperventilation",
    title: "Cơn Lo Âu Tăng Thông Khí (Acute Panic Attack)",
    category: "Kiềm hô hấp",
    difficulty: "Cơ bản",
    badgeColor: "#3b82f6",
    patient: {
      demographics: "Nữ, 22 tuổi — Lo âu sau áp lực thi cử",
      hr: "118 bpm",
      bp: "130/80 mmHg",
      spo2: "100% (Khí trời)",
      temp: "36.6 °C",
      rr: "36 lần/phút (Thở cạn, nhanh)",
      gcs: "15 điểm (Hốt hoảng)",
      description: "Bệnh nhân hồi hộp, vồ vập thở nhanh, tê rần hai bàn tay và quanh môi, ngón tay co quắp kiểu bàn tay người đỡ đẻ (Carpopedal spasm).",
      symptoms: [
        "Tê rần đầu ngón tay & quanh miệng",
        "Dấu Chvostek & Trousseau dương tính do hạ Canxi ion hóa cấp",
        "PaCO2 giảm sâu 22 mmHg",
        "PaO2 bình thường hoặc tăng nhẹ"
      ]
    },
    abg: {
      ph: 7.56,
      pco2: 22,
      pao2: 108,
      hco3: 19,
      na: 140,
      cl: 104,
      k: 3.7,
      alb: 4.0,
      lactate: 1.0,
      glucose: 92,
      ure: 4.5,
      fio2: 21,
      duration: "acute",
      ketone: "negative"
    }
  },
  {
    id: "sc_ards_severe",
    title: "Hội Chứng Suy Hô Hấp Cấp (ARDS Severe do Viêm Phổi)",
    category: "Hô hấp & Oxy hóa",
    difficulty: "Nâng cao",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 60 tuổi — Viêm phổi thùy biến chứng ARDS nặng",
      hr: "125 bpm",
      bp: "115/75 mmHg",
      spo2: "86% (FiO2 80% qua thở máy)",
      temp: "38.8 °C",
      rr: "30 lần/phút (Thở máy PEEP 14)",
      gcs: "Sedated (Đặt nội khí quản)",
      description: "X-quang ngực thâm nhiễm phế nang lan tỏa 2 bên. PaO2/FiO2 giảm nặng còn 88 (P/F ratio < 100 — ARDS nặng).",
      symptoms: [
        "Tỉ lệ P/F = 70 / 0.8 = 87.5 mmHg (ARDS nặng)",
        "A-a DO2 tăng vọt (380 mmHg) do Shunt phế nang",
        "Đang thông khí nhân tạo bảo vệ phổi"
      ]
    },
    abg: {
      ph: 7.29,
      pco2: 52,
      pao2: 70,
      hco3: 24,
      na: 139,
      cl: 102,
      k: 4.4,
      alb: 3.0,
      lactate: 2.8,
      glucose: 140,
      ure: 9.0,
      fio2: 80,
      duration: "acute",
      ketone: "negative"
    }
  },
  {
    id: "sc_diarrhea_normal_ag",
    title: "Tiêu Chảy Mất Nước Nặng (Toan CH Anion Gap Bình Thường)",
    category: "Toan chuyển hóa",
    difficulty: "Trung bình",
    badgeColor: "#f59e0b",
    patient: {
      demographics: "Nữ, 45 tuổi — Tiêu chảy nước 15 lần/ngày x 3 ngày do Nhiễm trùng dịch",
      hr: "112 bpm",
      bp: "90/55 mmHg",
      spo2: "98% (Khí trời)",
      temp: "37.8 °C",
      rr: "24 lần/phút",
      gcs: "14 điểm",
      description: "Bệnh nhân đi tiêu phân nước liên tục gây mất HCO3- trực tiếp qua đường ruột. Clorua máu tăng tương ứng (Hyperchloremic metabolic acidosis).",
      symptoms: [
        "Tiêu chảy cấp mất Bicarbonate tuỵ/mật",
        "Cl- máu tăng cao (116 mmol/L)",
        "Anion Gap bình thường (10 mmol/L)",
        "Khô niêm mạc, hạ Kali máu nhẹ"
      ]
    },
    abg: {
      ph: 7.25,
      pco2: 30,
      pao2: 96,
      hco3: 13,
      na: 139,
      cl: 116,
      k: 3.2,
      alb: 4.1,
      lactate: 1.4,
      glucose: 98,
      ure: 8.5,
      fio2: 21,
      duration: "acute",
      ketone: "negative"
    }
  }
];
