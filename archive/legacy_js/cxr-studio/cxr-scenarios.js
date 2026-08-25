/**
 * cxr-scenarios.js — Chest X-Ray Pro Studio
 * Ngân hàng ca lâm sàng & hình ảnh X-quang ngực cấp cứu chuẩn.
 */

const CXR_SCENARIOS = [
  {
    id: "sc_lobar_consolidation",
    title: "Đông Đặc Phổi Thùy Dưới Phải (Viêm Phổi Thùy)",
    category: "Nhu mô phổi",
    difficulty: "Trung bình",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 54 tuổi — Khó thở, sốt cao rét run, ho đàm rỉ sắt 3 ngày",
      hr: "115 bpm",
      bp: "110/70 mmHg",
      spo2: "91% (Khí trời)",
      temp: "39.2 °C",
      rr: "28 lần/phút",
      gcs: "15 điểm",
      description: "Bệnh nhân sốt cao, đau ngực màng phổi bên phải, rung thanh tăng, gõ đục và rần nổ đáy phổi phải.",
      symptoms: [
        "Đám mờ đồng nhất thùy dưới phổi phải",
        "Có dấu hiệu phế quản khí (Air Bronchogram)",
        "Xóa bờ vòm hoành phải (Dấu hiệu bóng mờ - Silhouette sign (+))",
        "Góc sườn hoành phải bình thường"
      ]
    },
    layers: {
      consolidationR: true,
      ggo: false,
      pneumothoraxR: false,
      effusionR: false,
      cavity: false,
      nodule: false,
      atelectasis: false,
      pulmonaryEdema: false,
      cardiomegaly: false,
      aorticKnob: false,
      ribFracture: false,
      emphysema: false
    }
  },
  {
    id: "sc_tension_pneumothorax",
    title: "Tràn Khí Màng Phổi Áp Lực Bên Phải (Tension Pneumothorax)",
    category: "Màng phổi",
    difficulty: "Khẩn cấp",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 22 tuổi — Cao 1m82, gầy, đau ngực phải đột ngột sau ho mạnh",
      hr: "138 bpm",
      bp: "80/50 mmHg (Tụt HA)",
      spo2: "84% (Khí trời)",
      temp: "36.8 °C",
      rr: "36 lần/phút (Thở vồ vập)",
      gcs: "13 điểm (Kích thích, lơ mơ)",
      description: "Bệnh nhân khó thở dữ dội, tím tái, tĩnh mạch cổ nổi vồng, lồng ngực phải căng vồng, mất rì rào phế nang hoàn toàn.",
      symptoms: [
        "Đường màng phổi lá tạng (Visceral pleural line) co rúm về rốn phổi",
        "Phổi phải sáng vô mạch (Avascular hyperlucency)",
        "Khí quản & Trung thất bị đẩy lệch sang BÊN TRÁI",
        "Y lệnh khẩn cấp: Đặt kim giải áp khoang liên sườn 2 đường trung đòn phải"
      ]
    },
    layers: {
      consolidationR: false,
      ggo: false,
      pneumothoraxR: true,
      effusionR: false,
      cavity: false,
      nodule: false,
      atelectasis: false,
      pulmonaryEdema: false,
      cardiomegaly: false,
      aorticKnob: false,
      ribFracture: false,
      emphysema: false
    }
  },
  {
    id: "sc_massive_pleural_effusion",
    title: "Tràn Dịch Màng Phổi Diện Rộng Phải (Massive Effusion)",
    category: "Màng phổi",
    difficulty: "Trung bình",
    badgeColor: "#f59e0b",
    patient: {
      demographics: "Nữ, 65 tuổi — Tiền sử Ung thư vú, khó thở tăng dần 2 tuần",
      hr: "108 bpm",
      bp: "120/75 mmHg",
      spo2: "89% (Khí trời)",
      temp: "37.1 °C",
      rr: "26 lần/phút",
      gcs: "15 điểm",
      description: "Bệnh nhân không thể nằm bằng, gõ đục tuyệt đối toàn bộ lồng ngực phải, mất rì rào phế nang và rung thanh.",
      symptoms: [
        "Mờ đục toàn bộ phế trường phải",
        "Đường cong Damoiseau tù góc sườn hoành phải",
        "Đẩy lệch khí quản & bóng tim sang bên đối diện (bên trái)",
        "Chỉ định chọc dò / dẫn lưu màng phổi chẩn đoán & giải áp"
      ]
    },
    layers: {
      consolidationR: false,
      ggo: false,
      pneumothoraxR: false,
      effusionR: true,
      cavity: false,
      nodule: false,
      atelectasis: false,
      pulmonaryEdema: false,
      cardiomegaly: false,
      aorticKnob: false,
      ribFracture: false,
      emphysema: false
    }
  },
  {
    id: "sc_cardiogenic_pulmonary_edema",
    title: "Phù Phổi Cấp Do Tim (Butterfly Pattern & Cardiomegaly)",
    category: "Tim mạch & Trung thất",
    difficulty: "Khẩn cấp",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 70 tuổi — Tiền sử Bệnh tim cục bộ, ĐTĐ2, khó thở kịch phát về đêm",
      hr: "125 bpm",
      bp: "175/105 mmHg",
      spo2: "82% (Khí trời)",
      temp: "36.6 °C",
      rr: "34 lần/phút (Ho khạc đàm bọt hồng)",
      gcs: "14 điểm",
      description: "Bệnh nhân vã mồ hôi, ho khạc đàm bọt hồng, rần ẩm dâng lên hai phế trường như sóng vỗ.",
      symptoms: [
        "Hình ảnh Cánh Bướm (Batwing / Butterfly pattern) mờ rốn phổi 2 bên",
        "Tỷ lệ Tim-Lồng ngực CTR > 0.60 (Tim to toàn bộ)",
        "Đường Kerley B ở đáy phổi",
        "Tái phân bố mạch máu đỉnh phổi (Cephalization)"
      ]
    },
    layers: {
      consolidationR: false,
      ggo: false,
      pneumothoraxR: false,
      effusionR: false,
      cavity: false,
      nodule: false,
      atelectasis: false,
      pulmonaryEdema: true,
      cardiomegaly: true,
      aorticKnob: true,
      ribFracture: false,
      emphysema: false
    }
  },
  {
    id: "sc_ards_ground_glass",
    title: "Suy Hô Hấp Cấp ARDS (Kính Mờ & Thâm Nhiễm Phế Nang 2 Bên)",
    category: "Nhu mô phổi",
    difficulty: "Nâng cao",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 48 tuổi — Sốc nhiễm trùng đường mật biến chứng ARDS nặng",
      hr: "130 bpm",
      bp: "90/60 mmHg",
      spo2: "85% (FiO2 80% qua thở máy PEEP 12)",
      temp: "38.9 °C",
      rr: "30 lần/phút",
      gcs: "Sedated",
      description: "Bệnh nhân tổn thương màng phế nang mao mạch lan tỏa, PaO2/FiO2 = 88 mmHg. Phim X-quang thâm nhiễm phế nang 2 bên.",
      symptoms: [
        "Thâm nhiễm kính mờ (Ground-glass opacities) lan tỏa 2 bên phổi",
        "Bóng tim kích thước bình thường (CTR < 0.50)",
        "Không có dấu hiệu quá tải thể tích (Phân biệt với Phù phổi do tim)",
        "Tương hợp tiêu chuẩn Berlin Definition ARDS"
      ]
    },
    layers: {
      consolidationR: false,
      ggo: true,
      pneumothoraxR: false,
      effusionR: false,
      cavity: false,
      nodule: false,
      atelectasis: false,
      pulmonaryEdema: false,
      cardiomegaly: false,
      aorticKnob: false,
      ribFracture: false,
      emphysema: false
    }
  },
  {
    id: "sc_tb_cavity",
    title: "Lao Phổi Hang Đỉnh Phải (Tuberculous Cavity)",
    category: "Nhu mô phổi",
    difficulty: "Trung bình",
    badgeColor: "#f59e0b",
    patient: {
      demographics: "Nam, 45 tuổi — Ho kéo dài > 3 tuần, sốt nhẹ về chiều, sụt 6kg, ho máu nhẹ",
      hr: "90 bpm",
      bp: "115/70 mmHg",
      spo2: "97% (Khí trời)",
      temp: "37.8 °C",
      rr: "20 lần/phút",
      gcs: "15 điểm",
      description: "Bệnh nhân ho đàm lẫn máu đốm tươi. Nghe rần ẩm vùng hạ đòn phải.",
      symptoms: [
        "Hình hang (Cavity) thành dày ở phân thùy đỉnh phổi phải",
        "Thâm nhiễm vệ tinh xung quanh hang",
        "Chỉ định Xét nghiệm Xpert MTB/RIF & Nhuộm soi AFB đàm"
      ]
    },
    layers: {
      consolidationR: false,
      ggo: false,
      pneumothoraxR: false,
      effusionR: false,
      cavity: true,
      nodule: false,
      atelectasis: false,
      pulmonaryEdema: false,
      cardiomegaly: false,
      aorticKnob: false,
      ribFracture: false,
      emphysema: false
    }
  },
  {
    id: "sc_rib_fractures_emphysema",
    title: "Chấn Thương Ngực: Gãy Nhiều Xương Sườn & Tràn Khí Dưới Da",
    category: "Xương & Mô mềm",
    difficulty: "Nâng cao",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 38 tuổi — Tai nạn giao thông đập ngực vào tay lái xe máy",
      hr: "118 bpm",
      bp: "110/65 mmHg",
      spo2: "92% (Khí trời)",
      temp: "36.9 °C",
      rr: "28 lần/phút (Thở nông do đau)",
      gcs: "15 điểm",
      description: "Bệnh nhân đau ngực trái dữ dội khi hít vào, sờ thấy rạo rực gãy xương sườn 4, 5, 6 và dấu lép bép dưới da cổ ngực.",
      symptoms: [
        "Mất liên tục (Gãy) các xương sườn 4, 5, 6 bên trái",
        "Tràn khí dưới da (Subcutaneous emphysema) mô mềm thành ngực",
        "Cần theo dõi sát Mảng sườn di động (Flail chest) và Tràn máu màng phổi"
      ]
    },
    layers: {
      consolidationR: false,
      ggo: false,
      pneumothoraxR: false,
      effusionR: false,
      cavity: false,
      nodule: false,
      atelectasis: false,
      pulmonaryEdema: false,
      cardiomegaly: false,
      aorticKnob: false,
      ribFracture: true,
      emphysema: true
    }
  }
];
