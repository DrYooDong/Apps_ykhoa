/**
 * Clinical Cheatsheets & Quick Reference Data Bundle
 * CliniPortal — Master Clinical Command Center
 */

window.CLINICAL_CHEATSHEETS_DATA = [
  {
    id: "anaphylaxis-protocol",
    title: "Phác đồ Cấp cứu Sốc phản vệ",
    category: "Cấp cứu khẩn",
    badge: "EMERGENCY",
    badgeClass: "badge-danger",
    icon: "fa-triangle-exclamation",
    summary: "Xử trí khẩn cấp Phản vệ theo Thông tư 51/2017/TT-BYT. Adrenaline là thuốc thiết yếu hàng đầu.",
    details: {
      firstLine: "Adrenaline 1mg/1ml (1:1000) Tiêm bắp ngay lập tức (Mặt ngoài giữa đùi):",
      dosing: [
        "Người lớn: 1/2 - 1 ống (0.5 - 1ml) IM. Nhắc lại sau 3-5 phút nếu chưa đỡ.",
        "Trẻ em: 0.01 mg/kg (tương đương 1/10 ống/10kg cân nặng).",
        "Tư thế: Nằm đầu bằng, chân cao. (Nằm nghiêng nếu nôn)."
      ],
      secondary: [
        "Thở Ôxy qua mask 6-10 lít/phút.",
        "Xả dịch NaCl 0.9% truyền tĩnh mạch nhanh 1-2 lít (người lớn) / 10-20ml/kg (trẻ em).",
        "Thuốc phối hợp: Diphenhydramin 10-20mg IV/IM + Methylprednisolone 40-80mg IV."
      ]
    },
    tags: ["Cấp cứu", "Sốc", "Adrenaline", "Phản vệ", "BYT"]
  },
  {
    id: "gcs-apgar-score",
    title: "Thang điểm Glasgow (GCS) & APGAR",
    category: "Thang điểm",
    badge: "SCORE",
    badgeClass: "badge-warning",
    icon: "fa-chart-simple",
    summary: "Đánh giá tri giác tri giác chấn thương sọ não (GCS 3-15) và sức khỏe sơ sinh (APGAR 0-10).",
    details: {
      firstLine: "GCS (Glasgow Coma Scale): Mắt (E:4) + Lời nói (V:5) + Vận động (M:6)",
      dosing: [
        "E4: Mở tự nhiên | E3: Mở khi gọi | E2: Mở khi đau | E1: Không mở",
        "V5: Chuẩn | V4: Lẫn lộn | V3: Từ không phù hợp | V2: Kêu ầm ừ | V1: Không đáp ứng",
        "M6: Theo lệnh | M5: Định vị đau | M4: Co tay né đau | M3: Gấp cứng mất vỏ | M2: Duỗi cứng mất não | M1: Liệt hoàn toàn"
      ],
      secondary: [
        "GCS ≤ 8 điểm: Hôn mê nặng -> Đặt nội khí quản bảo vệ đường thở khẩn cấp.",
        "APGAR (1 & 5 phút): Appearance (Hồng hào), Pulse (>100l/p), Grimace (Khóc to), Activity (Cử động tốt), Respiration (Thở đều)."
      ]
    },
    tags: ["Tri giác", "GCS", "APGAR", "Sơ sinh", "Nội khí quản"]
  },
  {
    id: "acs-mona-protocol",
    title: "Phác đồ MONA trong Mạch vành cấp",
    category: "Tim mạch",
    badge: "ACUTE CARDIAC",
    badgeClass: "badge-danger",
    icon: "fa-heart-pulse",
    summary: "Xử trí ban đầu Hội chứng Mạch vành cấp (STEMI / NSTEMI) tại phòng cấp cứu.",
    details: {
      firstLine: "MONA-B Quy chuẩn:",
      dosing: [
        "M - Morphine 2-4mg IV: Nếu đau ngực nhiều không giảm với Nitroglycerin.",
        "O - Oxygen: Thở O2 nếu SpO2 < 90% hoặc có thở dốc.",
        "N - Nitroglycerin 0.4mg ngậm dưới lưỡi q5m (tối đa 3 lần). Chống chỉ định: Huyết áp tâm thu < 90, Nhồi máu thất phải, dùng PDE-5i.",
        "A - Aspirin 160-325mg nhai nuốt ngay lập tức + P2Y12 (Clopidogrel 300-600mg hoặc Ticagrelor 180mg)."
      ],
      secondary: [
        "Đo ECG 12 chuyển đạo trong vòng 10 phút đầu nhập viện.",
        "Khẩn trương hội chẩn can thiệp mạch vành thì đầu (Primary PCI < 120 phút)."
      ]
    },
    tags: ["Tim mạch", "MONA", "ACS", "Nhồi máu cơ tim", "ECG"]
  },
  {
    id: "renal-dosing-sodium",
    title: "Công thức Sodium & Tra liều Suy thận",
    category: "Thận - Điện giải",
    badge: "FORMULA",
    badgeClass: "badge-info",
    icon: "fa-calculator",
    summary: "Tính Na+ hiệu chỉnh theo Đường huyết và các ngưỡng điều chỉnh liều thuốc theo eGFR.",
    details: {
      firstLine: "Công thức Na+ hiệu chỉnh (Corrected Sodium):",
      dosing: [
        "Corrected Na+ = Measured Na+ + 0.016 × (Glucose mg/dL - 100)",
        "Hoặc: Na+ + 1.6 × (Glucose mmol/L - 5.5) / 5.5",
        "Tốc độ bù Na+ hạ nặng (< 120 mEq/L): Không quá 8-10 mEq/L trong 24 giờ đầu để tránh Hội chứng hủy Myelin cầu não (CPM)."
      ],
      secondary: [
        "Ngưỡng chỉnh liều theo eGFR (ml/min/1.73m²):",
        "• eGFR 30-50: Giảm 25-50% liều hoặc kéo dài khoảng cách liều.",
        "• eGFR 15-30: Giảm 50-75% liều.",
        "• eGFR < 15 (Chạy thận): Tránh Metformin, Spironolactone, Enoxaparin (hoặc chỉnh theo Anti-Xa)."
      ]
    },
    tags: ["Điện giải", "Sodium", "Suy thận", "eGFR", "Liều thuốc"]
  },
  {
    id: "acls-cpr-protocol",
    title: "Cấp cứu Ngừng tuần hoàn (ACLS)",
    category: "Cấp cứu khẩn",
    badge: "ACLS",
    badgeClass: "badge-danger",
    icon: "fa-bolt-lightning",
    summary: "Phác đồ hồi sức tim phổi nâng cao cho Nhịp phá được (VF/pVT) và Không phá được (Asystole/PEA).",
    details: {
      firstLine: "CPR chất lượng cao: Ép tim 100-120 lần/phút, sâu 5-6cm, dội toàn bộ, tỷ lệ 30:2.",
      dosing: [
        "Nhịp Phá được (VF / VT mất mạch): Số 1 SHOCK 200J Biphasic -> Ép tim 2 phút -> Epinephrine 1mg IV q3-5m -> Amiodarone 300mg IV (sau shock thứ 3) -> Amiodarone 150mg (sau shock thứ 5).",
        "Nhịp Không phá được (Asystole / PEA): Ép tim ngay -> Epinephrine 1mg IV càng sớm càng tốt, nhắc lại q3-5m -> Tìm & điều trị nguyên nhân 5H & 5T."
      ],
      secondary: [
        "5H: Hypovolemia, Hypoxia, Hydrogen ion (Acidosis), Hypo/Hyperkalemia, Hypothermia.",
        "5T: Tension pneumothorax, Tamponade (Cardiac), Toxins, Thrombosis (Pulmonary), Thrombosis (Coronary)."
      ]
    },
    tags: ["CPR", "ACLS", "Ngừng tuần hoàn", "Amiodarone", "Sốc điện"]
  },
  {
    id: "acute-asthma-protocol",
    title: "Xử trí Cơn hen phế quản cấp",
    category: "Hô hấp",
    badge: "RESPIRATORY",
    badgeClass: "badge-success",
    icon: "fa-lungs",
    summary: "Xử trí cắt cơn hen cấp tính tại cấp cứu và phân độ nặng nhẹ theo GINA.",
    details: {
      firstLine: "Thuốc cắt cơn hàng 1 (First-Line Reliever):",
      dosing: [
        "Salbutamol 2.5-5mg + Ipratropium 0.5mg Phun khí dung (Nebulizer) q20m trong giờ đầu (tối đa 3 lần).",
        "Corticosteroid toàn thân sớm: Methylprednisolone 40-80mg IV hoặc Prednisolone 40-50mg uống.",
        "Cơn hen nặng/Dọa ngừng thở: Magnesium Sulfate (MgSO4) 2g IV truyền tĩnh mạch chậm trong 20 phút."
      ],
      secondary: [
        "Dấu hiệu dọa thở máy: Phổi câm (Silent chest), Tím tái, Rối loạn ý thức, PaCO2 > 45 mmHg.",
        "Thở O2 duy trì SpO2 93 - 95%."
      ]
    },
    tags: ["Hô hấp", "Hen phế quản", "Salbutamol", "GINA", "Khí dung"]
  }
];
