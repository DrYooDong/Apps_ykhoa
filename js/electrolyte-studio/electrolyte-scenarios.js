/**
 * electrolyte-scenarios.js — Electrolyte Pro Studio
 * Ngân hàng ca lâm sàng cấp cứu điện giải (Na, K, Ca, Mg) với sinh hiệu & thông số phòng xét nghiệm.
 */

const ELECTROLYTE_SCENARIOS = [
  {
    id: "sc_severe_hyponatremia_seizure",
    title: "Hạ Natri Máu Nặng Co Giật Cấp Cứu (Na+ < 120)",
    category: "Natri (Na+)",
    difficulty: "Khẩn cấp",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nữ, 52 tuổi — Tiền sử Uống thuốc lợi tiểu Thiazide, nôn ói 4 ngày",
      hr: "112 bpm",
      bp: "90/60 mmHg",
      spo2: "95% (Khí trời)",
      temp: "37.0 °C",
      rr: "24 lần/phút",
      gcs: "10 điểm (Co giật toàn thân vừa ngưng, lơ mơ)",
      description: "Bệnh nhân vào viện vì co giật cơn lớn (Generalized tonic-clonic seizure), lơ mơ sau co giật. Natri máu vọt xuống 115 mmol/L.",
      symptoms: [
        "Co giật cơn lớn và lơ mơ (GCS 10đ)",
        "Dấu hiệu phù não cấp tính do hạ Osmolal máu",
        "Chỉ định Y lệnh Khẩn cấp: Bolus NaCl 3% 150ml trong 20 phút",
        "Không được hoãn truyền NaCl 3%"
      ]
    },
    elyte: {
      naCurrent: 115,
      naTarget: 122,
      naFluid: 513, // NaCl 3%
      kVal: 3.2,
      kEcg: 0,
      kSymp: 0,
      caVal: 2.15,
      caAlb: 38,
      caSymp: 0,
      mgVal: 0.7,
      weight: 55,
      age: 52,
      gender: "female",
      symptoms: "severe",
      odsRisks: ["hypokalemia"]
    }
  },
  {
    id: "sc_ods_risk_hyponatremia",
    title: "Hạ Natri Máu Mạn Ở Bệnh Nhân Nghiện Rượu (ODS Risk High)",
    category: "Natri (Na+)",
    difficulty: "Nâng cao",
    badgeColor: "#f59e0b",
    patient: {
      demographics: "Nam, 58 tuổi — Tiền sử Nghiện rượu mạn tính, Suy dinh dưỡng",
      hr: "98 bpm",
      bp: "105/70 mmHg",
      spo2: "97% (Khí trời)",
      temp: "36.8 °C",
      rr: "18 lần/phút",
      gcs: "14 điểm (Đau đầu, mỏi cơ nhẹ)",
      description: "Bệnh nhân gầy mòn, nhập viện vì mệt mỏi kéo dài. Natri máu 112 mmol/L. Nguy cơ rất cao bị Hủy Myelin Não (ODS) nếu nâng Na+ nhanh.",
      symptoms: [
        "Nghiện rượu mạn + Suy dinh dưỡng nặng (ODS Risk (+))",
        "Vận tốc nâng Na+ tuyệt đối KHÔNG vượt 4-6 mmol/L/24h",
        "Truyền NaCl 0.9% hoặc duy trì chậm với máy tiêm điện"
      ]
    },
    elyte: {
      naCurrent: 112,
      naTarget: 117,
      naFluid: 154, // NaCl 0.9%
      kVal: 3.1,
      kEcg: 0,
      kSymp: 0,
      caVal: 2.10,
      caAlb: 30,
      caSymp: 0,
      mgVal: 0.6,
      weight: 50,
      age: 58,
      gender: "male",
      symptoms: "mild",
      odsRisks: ["alcohol", "malnutrition", "hypokalemia"]
    }
  },
  {
    id: "sc_hyperkalemia_ecg_crisis",
    title: "Tăng Kali Máu Nguy Kịch Biến Đổi ECG (K+ 6.8, Mất Sóng P)",
    category: "Kali (K+)",
    difficulty: "Khẩn cấp",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 65 tuổi — Tiền sử Bệnh thận mạn giai đoạn 5, bỏ lọc máu 4 ngày",
      hr: "45 bpm (Nhịp chậm)",
      bp: "85/50 mmHg",
      spo2: "94% (Khí trời)",
      temp: "36.5 °C",
      rr: "26 lần/phút",
      gcs: "13 điểm (Đờ đẫn)",
      description: "Bệnh nhân mệt nhiều, nhịp tim chậm. ECG ghi nhận mất sóng P, QRS giãn rộng 0.16s (Sóng hình sin). Cực kỳ nguy hiểm ngưng tim.",
      symptoms: [
        "ECG biến đổi nặng: Mất P, QRS giãn rộng",
        "Ổn định màng tế bào cơ tim NGAY: Tiêm tĩnh mạch Calcium Gluconate 10% 30mL",
        "Chuyển K+ vào tế bào: Truyền Insulin Actrapid 10UI + D20% 125mL & Khí dung Salbutamol",
        "Chỉ định Lọc máu cấp cứu (Hemodialysis)"
      ]
    },
    elyte: {
      naCurrent: 136,
      naTarget: 136,
      naFluid: 154,
      kVal: 6.8,
      kEcg: 2, // Mất P / QRS giãn rộng
      kSymp: 1, // Yếu cơ
      caVal: 2.05,
      caAlb: 35,
      caSymp: 0,
      mgVal: 0.8,
      weight: 65,
      age: 65,
      gender: "male",
      symptoms: "mild",
      odsRisks: []
    }
  },
  {
    id: "sc_severe_hypokalemia_paralysis",
    title: "Hạ Kali Máu Nặng Gây Liệt Cơ & Sóng U (K+ 2.1)",
    category: "Kali (K+)",
    difficulty: "Nâng cao",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nữ, 34 tuổi — Tiền sử Tiêu chảy cấp 4 ngày, uống lợi tiểu giảm cân",
      hr: "110 bpm",
      bp: "100/60 mmHg",
      spo2: "96% (Khí trời)",
      temp: "37.1 °C",
      rr: "20 lần/phút",
      gcs: "15 điểm",
      description: "Bệnh nhân yếu liệt 2 chân tiến triển lên 2 tay, không tự đứng dậy được. ECG có sóng U lớn, ST dẹt.",
      symptoms: [
        "Yếu liệt cơ lực 2/5 hai chân",
        "ECG có sóng U rõ, ST chênh xuống",
        "Y lệnh bù K+ tĩnh mạch khẩn cấp 10-20 mmol/giờ qua máy truyền dịch",
        "Bắt buộc bù Magnesium phối hợp"
      ]
    },
    elyte: {
      naCurrent: 135,
      naTarget: 135,
      naFluid: 154,
      kVal: 2.1,
      kEcg: 1,
      kSymp: 1, // Liệt cơ
      caVal: 2.10,
      caAlb: 40,
      caSymp: 0,
      mgVal: 0.5, // Hạ Magie
      weight: 50,
      age: 34,
      gender: "female",
      symptoms: "mild",
      odsRisks: []
    }
  },
  {
    id: "sc_hypercalcemic_crisis_cancer",
    title: "Khủng Hoảng Tăng Canxi Máu Do Ung Thư (Ca2+ Hiệu Chỉnh 3.7)",
    category: "Canxi (Ca2+)",
    difficulty: "Nâng cao",
    badgeColor: "#8b5cf6",
    patient: {
      demographics: "Nam, 62 tuổi — Tiền sử Ung thư phổi di căn xương",
      hr: "105 bpm",
      bp: "110/70 mmHg",
      spo2: "96% (Khí trời)",
      temp: "37.4 °C",
      rr: "22 lần/phút",
      gcs: "12 điểm (Lơ mơ, lú lẫn)",
      description: "Bệnh nhân lú lẫn, nôn ói, tiểu nhiều, mất nước nặng. Canxi toàn phần 3.40 mmol/L, Albumin 25 g/L -> Canxi hiệu chỉnh = 3.70 mmol/L.",
      symptoms: [
        "Canxi hiệu chỉnh = 3.70 mmol/L (Khủng hoảng Tăng Ca2+)",
        "Bù dịch NaCl 0.9% tích cực 3-6 Lít/24h",
        "Tiêm tĩnh mạch Zoledronic Acid 4mg / Pamidronate",
        "Calcitonin 4 UI/kg tiêm bắp mỗi 12 giờ"
      ]
    },
    elyte: {
      naCurrent: 142,
      naTarget: 142,
      naFluid: 154,
      kVal: 4.0,
      kEcg: 0,
      kSymp: 0,
      caVal: 3.40,
      caAlb: 25, // Ca_corr = 3.4 + 0.02*(40-25) = 3.70
      caSymp: 3, // Hôn mê / Lú lẫn
      mgVal: 0.85,
      weight: 60,
      age: 62,
      gender: "male",
      symptoms: "mild",
      odsRisks: []
    }
  },
  {
    id: "sc_hypocalcemia_tetany",
    title: "Hạ Canxi Máu Co Quắp Cơ Tetany Sau Phẫu Thuật Giáp",
    category: "Canxi (Ca2+)",
    difficulty: "Trung bình",
    badgeColor: "#06b6d4",
    patient: {
      demographics: "Nữ, 42 tuổi — Tiền sử Phẫu thuật cắt toàn bộ tuyến giáp ngày thứ 2",
      hr: "92 bpm",
      bp: "120/75 mmHg",
      spo2: "98% (Khí trời)",
      temp: "36.7 °C",
      rr: "20 lần/phút",
      gcs: "15 điểm",
      description: "Bệnh nhân tê rần quanh môi và các đầu ngón tay, co quắp bàn tay kiểu người đỡ đẻ. Chvostek & Trousseau (+). Canxi toàn phần 1.65 mmol/L.",
      symptoms: [
        "Tetany cấp tính & Trousseau sign (+)",
        "Tiêm tĩnh mạch chậm 10-20ml Calcium Gluconate 10% trong 10-20 phút",
        "Duy trì truyền liên tục Calcium Gluconate qua bơm tiêm điện",
        "Bổ sung Calcitriol đường uống"
      ]
    },
    elyte: {
      naCurrent: 139,
      naTarget: 139,
      naFluid: 154,
      kVal: 3.8,
      kEcg: 0,
      kSymp: 0,
      caVal: 1.65,
      caAlb: 40,
      caSymp: 2, // Tetany
      mgVal: 0.75,
      weight: 55,
      age: 42,
      gender: "female",
      symptoms: "mild",
      odsRisks: []
    }
  }
];
