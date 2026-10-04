/**
 * CliniPortal — Clinical Cheatsheets Standalone Engine (Offline & File:/// Safe)
 * Path: src/components/clinical-cheatsheets-standalone.js
 * 
 * Đảm bảo tính năng "Tra Cứu Nhanh" hoạt động 100% tức thì ở mọi môi trường:
 * file:/// offline, GitHub Pages, Electron và Local Web Server.
 */

(function () {
  'use strict';

  var CHEATSHEETS_DATA = [
    // ══════════════════════════════════════════════════════════
    // NHÓM 1: PHÁC ĐỒ NHANH (3 PHÁC ĐỒ)
    // ══════════════════════════════════════════════════════════
    {
      id: "anaphylaxis-protocol-byt",
      title: "Phác đồ Cấp cứu Phản vệ (Thông tư 51/2017/TT-BYT)",
      category: "Phác đồ nhanh",
      badge: "EMERGENCY • BYT",
      badgeClass: "badge-danger",
      icon: "fa-triangle-exclamation",
      summary: "Xử trí khẩn cấp phản vệ từ độ II trở lên. Adrenaline 1mg/1ml (1:1000) tiêm bắp ngay lập tức là thuốc thiết yếu sống còn hàng đầu.",
      details: {
        firstLine: "Adrenaline 1mg/1ml (1:1000) Tiêm bắp ngay lập tức (Mặt trước ngoài giữa đùi):",
        dosing: [
          "Người lớn: 1/2 – 1 ống (0.5 – 1 ml) IM. Nhắc lại mỗi 3 – 5 phút nếu chưa đáp ứng.",
          "Trẻ em: 0.01 mg/kg (tối đa 0.3 – 0.5 ml/lần). Quy đổi: < 10kg: 1/5 – 1/4 ống; 10–20kg: 1/3 ống; 20–30kg: 1/2 ống; > 30kg: 1/2 – 1 ống.",
          "Tư thế người bệnh: Nằm đầu bằng, kê cao chân. Nếu khó thở/suy hô hấp: ngồi dậy; Nếu nôn/nôn ói: nằm nghiêng an toàn. Tuyệt đối không ngồi dậy đột ngột!"
        ],
        secondary: [
          "Thở Oxy mask 6 – 10 L/phút; Thiết lập ngay 2 đường truyền tĩnh mạch kim lớn (16–18G).",
          "Xả dịch NaCl 0.9% tĩnh mạch nhanh: Người lớn 1 – 2 lít; Trẻ em 10 – 20 ml/kg truyền trong 10 – 20 phút.",
          "Thuốc phối hợp sau hồi sức: Diphenhydramine 10–25mg IV/IM + Methylprednisolone 1–2mg/kg (hoặc Hydrocortisone 100–200mg) IV."
        ]
      },
      tags: ["Phản vệ", "Sốc", "Adrenaline", "BYT", "Thông tư 51", "Cấp cứu", "Dị ứng"],
      actionUrl: "#/calculators/ql-bu-dich-studio",
      actionText: "Phác đồ bù dịch"
    },
    {
      id: "nstemi-protocol",
      title: "NSTEMI & Đau Thắt Ngực Không Ổn Định (ESC/AHA)",
      category: "Phác đồ nhanh",
      badge: "ACUTE CARDIAC",
      badgeClass: "badge-warning",
      icon: "fa-heart-pulse",
      summary: "Hội chứng vành cấp không ST chênh lên. Khởi động sớm chống đông, kháng kết tập tiểu cầu kép (DAPT) và phân tầng nguy cơ TIMI / GRACE.",
      details: {
        firstLine: "Liều nạp kháng kết tập tiểu cầu kép (DAPT) & Chống đông ngay tại phòng cấp cứu:",
        dosing: [
          "Aspirin: 162 – 325 mg nhai nuốt ngay (loại không bao tan trong ruột), duy trì 81 – 100 mg/ngày.",
          "Kháng P2Y12: Ticagrelor 180 mg nạp (90mg x 2 lần/ngày) HOẶC Clopidogrel 300 – 600 mg nạp (75mg/ngày nếu không có Ticagrelor).",
          "Chống đông nền: Enoxaparin (LMWH) 1 mg/kg tiêm dưới da mỗi 12h HOẶC Heparin không phân đoạn (UFH) bolus 60 UI/kg (max 4000 UI) rồi truyền 12 UI/kg/h (đích aPTT 50–70s)."
        ],
        secondary: [
          "Giảm đau/Giãn mạch: Nitroglycerin 0.4mg ngậm dưới lưỡi mỗi 5 phút (tối đa 3 lần) nếu HA tâm thu > 90 mmHg và không dùng thuốc ức chế PDE-5 trong 24–48h.",
          "Chẹn Beta giao cảm (Metoprolol/Bisoprolol) đường uống trong 24h đầu nếu không có suy tim cấp, nhịp chậm < 60, HA tụt hoặc co thắt phế quản.",
          "Statin cường độ cao: Atorvastatin 80 mg hoặc Rosuvastatin 40 mg uống sớm."
        ]
      },
      tags: ["NSTEMI", "Vành cấp", "DAPT", "Aspirin", "Ticagrelor", "Enoxaparin", "Heparin", "Tim mạch"],
      actionUrl: "#/calculators/timi-risk",
      actionText: "Tính điểm TIMI"
    },
    {
      id: "stemi-reperfusion-protocol",
      title: "STEMI — Tái Tư Vấn Mạch Vành Cấp Cứu (Time is Muscle)",
      category: "Phác đồ nhanh",
      badge: "TIME IS MUSCLE",
      badgeClass: "badge-danger",
      icon: "fa-bolt",
      summary: "Nhồi máu cơ tim có ST chênh lên. Cửa sổ tái tưới máu tối khẩn: Can thiệp vành qua da (PCI) thì đầu Door-to-Balloon < 90 phút hoặc Tiêu sợi huyết < 30 phút.",
      details: {
        firstLine: "Phác đồ nạp thuốc cấp cứu trước can thiệp (Door-to-ECG < 10 phút):",
        dosing: [
          "Aspirin: 162 – 325 mg nhai ngay lập tức.",
          "Kháng P2Y12 cường lực: Ticagrelor 180 mg nạp HOẶC Prasugrel 60 mg nạp (nếu rõ giải phẫu vành làm PCI) HOẶC Clopidogrel 600 mg nạp.",
          "Chống đông trước PCI: Heparin UFH 70 – 100 UI/kg IV bolus (duy trì ACT 250–300s)."
        ],
        secondary: [
          "Chiến lược Tiêu sợi huyết (khi dự kiến chuyển PCI > 120 phút): Dùng Tenecteplase (TNK-tPA) liều theo cân nặng (30–50mg) bolus trong 5–10s kèm Enoxaparin 30mg IV bolus + 1mg/kg SC và Clopidogrel 300mg (nếu ≤ 75 tuổi).",
          "Luôn mắc monitor theo dõi nhịp liên tục và dán sẵn bản cực sốc điện (phòng ngừa rung thất/nhanh thất vô mạch).",
          "Tránh tuyệt đối dùng Nitrat và Morphin nếu nghi ngờ nhồi máu thất phải (ST chênh lên ở DII, DIII, aVF, V4R) hoặc tụt huyết áp."
        ]
      },
      tags: ["STEMI", "Tái tưới máu", "PCI", "Tiêu sợi huyết", "Door-to-Balloon", "Aspirin", "Ticagrelor", "Cấp cứu"],
      actionUrl: "#/calculators/timi-risk",
      actionText: "Thang điểm TIMI STEMI"
    },

    // ══════════════════════════════════════════════════════════
    // NHÓM 2: CÔNG CỤ LÂM SÀNG (3 CÔNG CỤ)
    // ══════════════════════════════════════════════════════════
    {
      id: "tool-bmi-calculator",
      title: "BMI — Chỉ Số Khối Cơ Thể & Thể Trạng (WPRO / WHO)",
      category: "Công cụ",
      badge: "TOOL • DINH DƯỠNG",
      badgeClass: "badge-primary",
      icon: "fa-calculator",
      summary: "Đánh giá tình trạng dinh dưỡng, thiếu năng lượng trường diễn và phân độ béo phì theo chuẩn người Châu Á - Thái Bình Dương (IDI & WPRO).",
      details: {
        firstLine: "Công thức: BMI = Cân nặng (kg) / [Chiều cao (m)]²",
        dosing: [
          "BMI < 18.5 kg/m²: Gầy / Thiếu năng lượng trường diễn (CED).",
          "BMI 18.5 – 22.9 kg/m²: Bình thường (Thể trạng chuẩn khuyến nghị cho người Việt Nam).",
          "BMI 23.0 – 24.9 kg/m²: Tiền béo phì (Thừa cân). Nguy cơ rối loạn chuyển hóa & tim mạch bắt đầu tăng.",
          "BMI 25.0 – 29.9 kg/m²: Béo phì độ I (Khuyến cáo can thiệp điều chỉnh lối sống, tiết chế calo).",
          "BMI ≥ 30.0 kg/m²: Béo phì độ II (Béo phì nặng, xem xét can thiệp dược lý hoặc phẫu thuật)."
        ],
        secondary: [
          "Cân nặng lý tưởng (IBW): Nam = 50 + 0.91 × [Chiều cao (cm) - 152.4]; Nữ = 45.5 + 0.91 × [Chiều cao (cm) - 152.4].",
          "Cân nặng hiệu chỉnh khi béo phì (ABW): ABW = IBW + 0.4 × [Cân nặng thực tế - IBW] (dùng trong tính liều Aminoglycoside, Vancomycin)."
        ]
      },
      tags: ["BMI", "Béo phì", "WPRO", "Dinh dưỡng", "IBW", "ABW", "Công cụ"],
      actionUrl: "#/calculators/bmi-calculator",
      actionText: "Mở máy tính BMI"
    },
    {
      id: "tool-crcl-cockcroft-gault",
      title: "CrCl — Độ Thanh Thải Creatinine (Cockcroft - Gault)",
      category: "Công cụ",
      badge: "TOOL • DƯỢC LÝ",
      badgeClass: "badge-info",
      icon: "fa-flask",
      summary: "Ước tính độ thanh thải Creatinine chuẩn FDA và Dược thư Quốc gia dùng để hiệu chỉnh liều thuốc kháng sinh, DOAC, hóa trị và bảo vệ thận.",
      details: {
        firstLine: "Phương trình Cockcroft - Gault (Creatinine huyết thanh tính theo mg/dL):",
        dosing: [
          "Nam giới: CrCl (ml/phút) = [(140 - Tuổi) × Cân nặng (kg)] / [72 × Creatinine HT (mg/dL)].",
          "Nữ giới: CrCl (ml/phút) = CrCl (Nam) × 0.85.",
          "Quy đổi nồng độ Creatinine: Nếu xét nghiệm trả về µmol/L, chia cho 88.4 để ra mg/dL (hoặc Mẫu số = 0.814 × Creatinine µmol/L)."
        ],
        secondary: [
          "Lựa chọn cân nặng chuẩn xác: Dùng Cân nặng thực tế nếu nhẹ cân (TBW < IBW); Dùng IBW nếu cân nặng bình thường; Dùng Cân nặng hiệu chỉnh (ABW) nếu béo phì (BMI ≥ 30 hoặc TBW > 120% IBW).",
          "Phân tầng suy thận chỉnh liều: Bình thường (> 80 ml/p); Giảm nhẹ (50–80 ml/p); Giảm trung bình (30–50 ml/p); Giảm nặng (10–30 ml/p); Suy thận giai đoạn cuối (< 10 ml/p hoặc lọc máu)."
        ]
      },
      tags: ["CrCl", "Cockcroft Gault", "Độ thanh thải", "Chỉnh liều thuốc", "Kháng sinh", "Thận", "Dược lâm sàng"],
      actionUrl: "#/calculators/egfr-calculator",
      actionText: "Mở máy tính CrCl / eGFR"
    },
    {
      id: "tool-egfr-ckd-epi",
      title: "eGFR — Mức Lọc Cầu Thận & Phân Độ CKD (CKD-EPI 2021)",
      category: "Công cụ",
      badge: "TOOL • THẬN HỌC",
      badgeClass: "badge-success",
      icon: "fa-vial-virus",
      summary: "Đánh giá mức lọc cầu thận ước tính theo phương trình CKD-EPI 2021 (không phụ thuộc chủng tộc) và phân tầng giai đoạn Bệnh thận mạn theo KDIGO.",
      details: {
        firstLine: "Phân tầng giai đoạn Bệnh thận mạn KDIGO theo eGFR (ml/phút/1.73 m²):",
        dosing: [
          "G1 (eGFR ≥ 90): Bình thường hoặc tăng (kèm bằng chứng tổn thương thận kéo dài > 3 tháng).",
          "G2 (eGFR 60 – 89): Giảm nhẹ mức lọc cầu thận.",
          "G3a (eGFR 45 – 59): Giảm nhẹ đến trung bình.",
          "G3b (eGFR 30 – 44): Giảm trung bình đến nặng (Thận trọng Metformin, thuốc cản quang i-ốt, NSAIDs).",
          "G4 (eGFR 15 – 29): Giảm nặng (Lập kế hoạch tạo FAV, tư vấn chuẩn bị điều trị thay thế thận).",
          "G5 (eGFR < 15): Suy thận giai đoạn cuối (Chỉ định chạy thận nhân tạo, lọc màng bụng hoặc ghép thận)."
        ],
        secondary: [
          "Công thức CKD-EPI 2021: eGFR = 142 × min(SCr/κ, 1)^α × max(SCr/κ, 1)^-1.200 × 0.9938^Tuổi [× 1.012 nếu là Nữ]. (Nữ: κ = 0.7, α = -0.241; Nam: κ = 0.9, α = -0.302).",
          "Lưu ý lâm sàng: eGFR theo CKD-EPI dùng để chẩn đoán và theo dõi bệnh thận mạn, trong khi CrCl theo Cockcroft-Gault vẫn là chuẩn được hầu hết nhà sản xuất khuyến nghị để chỉnh liều thuốc."
        ]
      },
      tags: ["eGFR", "CKD-EPI", "KDIGO", "Bệnh thận mạn", "Suy thận", "Creatinine", "Công cụ"],
      actionUrl: "#/calculators/egfr-calculator",
      actionText: "Mở máy tính eGFR"
    },

    // ══════════════════════════════════════════════════════════
    // NHÓM 3: THANG ĐIỂM LÂM SÀNG (6 THANG ĐIỂM)
    // ══════════════════════════════════════════════════════════
    {
      id: "score-news2",
      title: "NEWS2 — Cảnh Báo Sớm Nguy Kịch (Royal College of Physicians)",
      category: "Thang điểm",
      badge: "SCORE • NGUY CƠ",
      badgeClass: "badge-purple",
      icon: "fa-bed-pulse",
      summary: "Thang điểm cảnh báo sớm chuẩn Hoàng gia Anh (RCP). Đánh giá nhanh nguy cơ tử vong, suy hô hấp và nhu cầu chuyển khoa Hồi sức tích cực (ICU).",
      details: {
        firstLine: "Lượng giá 6 thông số sinh hiệu (Hô hấp, SpO2, Oxy hỗ trợ, Huyết áp tâm thu, Mạch, Tri giác ACVPU, Thân nhiệt):",
        dosing: [
          "Tổng điểm 0 – 4: NGUY CƠ THẤP -> Điều dưỡng tiếp tục theo dõi thường quy tối thiểu 4 – 6 giờ/lần.",
          "Điểm đơn lẻ = 3 (ở bất kỳ chỉ số sinh hiệu nào): NGUY CƠ TRUNG BÌNH ĐƠN LẺ -> Bác sĩ trực phải thăm khám tại giường ngay trong vòng 30 phút.",
          "Tổng điểm 5 – 6: NGUY CƠ TRUNG BÌNH -> Tăng tần suất theo dõi mỗi 1 giờ, hội chẩn bác sĩ hồi sức tích cực/cấp cứu.",
          "Tổng điểm ≥ 7: NGUY CƠ CAO (NGUY KỊCH) -> Kích hoạt ngay Đội phản ứng nhanh (RRT/MET), chuyển khoa ICU cấp cứu."
        ],
        secondary: [
          "Thang SpO2 2 dành cho bệnh nhân suy hô hấp tăng CO2 máu (COPD đích 88–92%): 88–92% = 0đ; 93–94% có oxy = 1đ; 95–96% có oxy = 2đ; ≥ 97% có oxy = 3đ.",
          "Thang đánh giá tri giác ACVPU: Alert (Tỉnh táo) = 0 điểm; New Confusion (Lẫn lộn mới xuất hiện) / Voice (Đáp ứng lời nói) / Pain (Đáp ứng đau) / Unresponsive (Không đáp ứng) = 3 điểm."
        ]
      },
      tags: ["NEWS2", "Cảnh báo sớm", "ICU", "Suy hô hấp", "Sinh hiệu", "Triage", "Thang điểm"],
      actionUrl: "#/calculators/news2-score",
      actionText: "Tính điểm NEWS2"
    },
    {
      id: "score-sofa",
      title: "SOFA — Đánh Giá Suy Đa Cơ Quan & Sepsis-3",
      category: "Thang điểm",
      badge: "SCORE • SUY ĐA TẠNG",
      badgeClass: "badge-danger",
      icon: "fa-shield-halved",
      summary: "Thang điểm xác định suy đa cơ quan trong Nhiễm khuẩn huyết và Hồi sức cấp cứu theo Định nghĩa Đồng thuận Quốc tế Sepsis-3 (JAMA 2016).",
      details: {
        firstLine: "Đánh giá 6 hệ cơ quan trọng yếu (0 – 4 điểm mỗi hệ, tổng thang điểm từ 0 – 24 điểm):",
        dosing: [
          "1. Hô hấp (PaO2/FiO2): >400 (0đ) | ≤400 (1đ) | ≤300 (2đ) | ≤200 có thở máy (3đ) | ≤100 có thở máy (4đ).",
          "2. Đông máu (Tiểu cầu): >150 (0đ) | ≤150 (1đ) | ≤100 (2đ) | ≤50 (3đ) | ≤20 x10^9/L (4đ).",
          "3. Gan (Bilirubin): <20 (0đ) | 20–32 (1đ) | 33–101 (2đ) | 102–204 (3đ) | >204 µmol/L (4đ).",
          "4. Tim mạch: MAP ≥ 70 (0đ) | MAP < 70 (1đ) | Dopamine ≤5 hoặc Dobutamine (2đ) | Noradrenaline ≤0.1 (3đ) | Noradrenaline >0.1 µg/kg/p (4đ).",
          "5. Thần kinh (Glasgow): 15 (0đ) | 13–14 (1đ) | 10–12 (2đ) | 6–9 (3đ) | <6 (4đ).",
          "6. Thận (Creatinine/Nước tiểu): <110 (0đ) | 110–170 (1đ) | 171–299 (2đ) | 300–440 hoặc <500ml/ngày (3đ) | >440 µmol/L hoặc <200ml/ngày (4đ)."
        ],
        secondary: [
          "Chẩn đoán Sepsis theo Sepsis-3: Nghi ngờ/xác định nhiễm khuẩn + Điểm SOFA tăng cấp tính ≥ 2 điểm so với điểm nền (tương ứng tỷ lệ tử vong nội viện > 10%).",
          "Sốc nhiễm khuẩn (Septic Shock): Sepsis + Cần thuốc vận mạch để duy trì MAP ≥ 65 mmHg VÀ Lactate máu > 2 mmol/L dù đã hồi sức đủ dịch (tử vong nội viện > 40%)."
        ]
      },
      tags: ["SOFA", "Sepsis-3", "Suy đa tạng", "ICU", "Hồi sức", "Lactate", "Thang điểm"],
      actionUrl: "#/calculators/sofa-score",
      actionText: "Mở bảng tính SOFA"
    },
    {
      id: "score-qsofa",
      title: "qSOFA — Sàng Lọc Nhanh Sepsis Ngoài ICU (Quick SOFA)",
      category: "Thang điểm",
      badge: "SCORE • SÀNG LỌC",
      badgeClass: "badge-rose",
      icon: "fa-bolt-lightning",
      summary: "Thang điểm sàng lọc nhanh nhiễm khuẩn huyết tại giường bệnh, phòng khám và khoa cấp cứu không cần xét nghiệm cận lâm sàng.",
      details: {
        firstLine: "Bộ 3 tiêu chí lâm sàng tại giường (Mỗi tiêu chí bất thường = 1 điểm):",
        dosing: [
          "1. Nhịp thở nhanh: Tần số thở ≥ 22 lần/phút (+1 điểm).",
          "2. Rối loạn tri giác: Điểm Glasgow GCS < 15 điểm hoặc có lẫn lộn mới (+1 điểm).",
          "3. Tụt huyết áp: Huyết áp tâm thu ≤ 100 mmHg (+1 điểm)."
        ],
        secondary: [
          "qSOFA ≥ 2 điểm: DƯƠNG TÍNH -> Bệnh nhân có nguy cơ cao diễn tiến suy đa tạng, cần nằm ICU và tử vong nội viện tăng cao.",
          "Hành động khẩn: Tầm soát ngay ổ nhiễm khuẩn, đo nồng độ Lactate máu, cấy vi sinh trước khi dùng kháng sinh, tính toán đầy đủ bộ điểm SOFA và kích hoạt Gói can thiệp 1 giờ (Hour-1 Bundle)."
        ]
      },
      tags: ["qSOFA", "Quick SOFA", "Sepsis", "Nhiễm khuẩn huyết", "Bedside", "Sàng lọc", "Thang điểm"],
      actionUrl: "#/calculators/qsofa-score",
      actionText: "Tính nhanh qSOFA"
    },
    {
      id: "score-sirs",
      title: "SIRS — Hội Chứng Đáp Ứng Viêm Toàn Thân (ACC/SCCM)",
      category: "Thang điểm",
      badge: "SCORE • HỘI CHỨNG",
      badgeClass: "badge-warning",
      icon: "fa-temperature-arrow-up",
      summary: "Tiêu chuẩn Hội chứng đáp ứng viêm toàn thân (SIRS). Có độ nhạy rất cao trong nhận diện sớm phản ứng viêm cấp tính do nhiễm trùng hoặc vô trùng.",
      details: {
        firstLine: "4 Tiêu chuẩn lâm sàng & cận lâm sàng (Đạt ≥ 2 trong 4 tiêu chuẩn là xác định có SIRS):",
        dosing: [
          "1. Thân nhiệt: Sốt cao > 38.0°C (100.4°F) HOẶC Hạ thân nhiệt < 36.0°C (96.8°F).",
          "2. Nhịp tim: Nhịp tim nhanh > 90 lần/phút.",
          "3. Hô hấp: Thở nhanh > 20 lần/phút HOẶC PaCO2 < 32 mmHg (kiềm hô hấp do tăng thông khí).",
          "4. Bạch cầu máu (WBC): Tăng > 12.000/µL HOẶC Giảm < 4.000/µL HOẶC Tỷ lệ bạch cầu non (dạng đũa/bands) > 10%."
        ],
        secondary: [
          "SIRS + Nghi ngờ có ổ nhiễm khuẩn = Nhiễm khuẩn huyết (Sepsis theo định nghĩa kinh điển Sepsis-2).",
          "SIRS không do nhiễm khuẩn thường gặp trong: Viêm tụy cấp nặng, bỏng diện rộng, đa chấn thương mô dập nát, nhồi máu cơ tim diện rộng, hội chứng sau ngừng tim."
        ]
      },
      tags: ["SIRS", "Viêm toàn thân", "Sốt", "Bạch cầu", "Nhiễm khuẩn", "Viêm tụy", "Thang điểm"],
      actionUrl: "#/calculators/sirs-criteria",
      actionText: "Xem tiêu chuẩn SIRS"
    },
    {
      id: "score-psi-port",
      title: "PSI / PORT Score — Phân Tầng Độ Nặng Viêm Phổi (CAP)",
      category: "Thang điểm",
      badge: "SCORE • VIÊM PHỔI",
      badgeClass: "badge-info",
      icon: "fa-lungs",
      summary: "Chỉ số độ nặng viêm phổi mắc phải cộng đồng (Pneumonia Severity Index). Dự đoán tỷ lệ tử vong 30 ngày và định hướng an toàn nơi điều trị (Ngoại trú, Nội trú, ICU).",
      details: {
        firstLine: "Phân tầng nguy cơ 5 nhóm (Class I – V) dựa trên điểm số 20 biến số lâm sàng & xét nghiệm:",
        dosing: [
          "Nhóm I – II (Điểm ≤ 70): Nguy cơ rất thấp đến thấp (Tử vong 0.1 – 0.6%) -> ĐIỀU TRỊ NGOẠI TRÚ AN TOÀN.",
          "Nhóm III (Điểm 71 – 90): Nguy cơ trung bình (Tử vong 0.9 – 2.8%) -> NẰM PHÒNG LƯU / ĐIỀU TRỊ NỘI TRÚ NGẮN HẠN.",
          "Nhóm IV (Điểm 91 – 130): Nguy cơ cao (Tử vong 8.2 – 9.3%) -> BẮT BUỘC NHẬP VIỆN NỘI TRÚ KHOA HÔ HẤP.",
          "Nhóm V (Điểm > 130): Nguy cơ rất cao (Tử vong 27 – 31%) -> NHẬP KHOA HỒI SỨC TÍCH CỰC (ICU) KHẨN CẤP."
        ],
        secondary: [
          "Các biến số có điểm số nặng nhất: pH máu < 7.35 (+30 điểm); Sa sút tri giác (+20đ); BUN ≥ 11 mmol/L (+20đ); Natri < 130 mmol/L (+20đ); Glucose ≥ 14 mmol/L (+10đ); Hct < 30% (+10đ); Tràn dịch màng phổi (+10đ).",
          "Tuổi: Nam = Tuổi; Nữ = Tuổi - 10; Nhà dưỡng lão = +10đ; Ung thư = +30đ; Bệnh gan = +20đ; Suy tim = +10đ."
        ]
      },
      tags: ["PSI", "PORT", "Viêm phổi", "CAP", "Hô hấp", "Ngoại trú", "ICU", "Thang điểm"],
      actionUrl: "#/calculators/curb65-score",
      actionText: "Máy tính Viêm phổi"
    },
    {
      id: "score-curb65",
      title: "CURB-65 — Phân Tuyến Điều Trị Viêm Phổi Cộng Đồng (BTS)",
      category: "Thang điểm",
      badge: "SCORE • TRIAGE CAP",
      badgeClass: "badge-warning",
      icon: "fa-lungs-virus",
      summary: "Thang điểm 5 biến số nhanh của Hội Lồng ngực Anh (BTS) giúp bác sĩ cấp cứu phân luồng điều trị viêm phổi cộng đồng ngay tại phòng khám.",
      details: {
        firstLine: "Mỗi tiêu chuẩn thỏa mãn tính 1 điểm (Thang điểm tổng từ 0 – 5 điểm):",
        dosing: [
          "C (Confusion): Lẫn lộn, mất định hướng bản thân/không gian/thời gian (+1 điểm).",
          "U (Urea): Urea huyết thanh > 7 mmol/L (tương đương BUN > 19 mg/dL) (+1 điểm).",
          "R (Respiratory rate): Nhịp thở nhanh ≥ 30 lần/phút (+1 điểm).",
          "B (Blood pressure): HA tụt: HA tâm thu < 90 mmHg HOẶC HA tâm trương ≤ 60 mmHg (+1 điểm).",
          "65 (Age ≥ 65): Bệnh nhân từ 65 tuổi trở lên (+1 điểm)."
        ],
        secondary: [
          "0 – 1 điểm: Nguy cơ tử vong thấp (< 3%) -> Xem xét an toàn ĐIỀU TRỊ NGOẠI TRÚ.",
          "2 điểm: Nguy cơ tử vong trung bình (khoảng 9%) -> Khuyến nghị NHẬP VIỆN ĐIỀU TRỊ NỘI TRÚ tại khoa hô hấp/nội khoa.",
          "3 – 5 điểm: Nguy cơ tử vong cao đến rất cao (15 – 40%) -> VIÊM PHỔI NẶNG: Nhập viện khẩn cấp, đánh giá ngay chỉ định vào khoa ICU."
        ]
      },
      tags: ["CURB65", "Viêm phổi", "CAP", "Urea", "Hô hấp", "BTS", "Triage", "Thang điểm"],
      actionUrl: "#/calculators/curb65-score",
      actionText: "Tính điểm CURB-65"
    }
  ];

  var currentFilter = 'all';
  var currentQuery = '';
  var pinnedIds = [];

  try {
    pinnedIds = JSON.parse(localStorage.getItem('cliniportal_pinned_cheatsheets') || '[]');
  } catch (e) {
    pinnedIds = [];
  }

  function getElements() {
    return {
      modalOverlay: document.getElementById('cheatsheetsModalOverlay'),
      grid: document.getElementById('cheatsheetsGridContainer'),
      closeBtn: document.getElementById('closeCheatsheetModalBtn'),
      searchInput: document.getElementById('cheatsheetSearchInput'),
      filterControls: document.getElementById('cheatsheetsFilterControls')
    };
  }

  function openCheatsheetModal() {
    var els = getElements();
    if (!els.modalOverlay) return;
    els.modalOverlay.style.display = 'flex';
    requestAnimationFrame(function () {
      els.modalOverlay.classList.add('active');
    });
    document.body.style.overflow = 'hidden';
    if (els.searchInput) {
      setTimeout(function () {
        els.searchInput.focus();
      }, 120);
    }
    renderCheatsheets();
  }

  function closeCheatsheetModal() {
    var els = getElements();
    if (!els.modalOverlay) return;
    els.modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(function () {
      els.modalOverlay.style.display = 'none';
    }, 250);
  }

  function renderCheatsheets() {
    var els = getElements();
    if (!els.grid) return;

    var items = [].concat(CHEATSHEETS_DATA);

    // Filter by tab
    if (currentFilter !== 'all') {
      items = items.filter(function (item) {
        if (currentFilter === 'protocol') return item.category === 'Phác đồ nhanh';
        if (currentFilter === 'tool') return item.category === 'Công cụ';
        if (currentFilter === 'score') return item.category === 'Thang điểm';
        return true;
      });
    }

    // Filter by search query
    if (currentQuery.trim() !== '') {
      var q = currentQuery.trim().toLowerCase();
      items = items.filter(function (item) {
        var inTitle = item.title.toLowerCase().indexOf(q) !== -1;
        var inCategory = item.category.toLowerCase().indexOf(q) !== -1;
        var inSummary = item.summary.toLowerCase().indexOf(q) !== -1;
        var inTags = item.tags.some(function (t) { return t.toLowerCase().indexOf(q) !== -1; });
        var inDetails = item.details && item.details.firstLine.toLowerCase().indexOf(q) !== -1;
        var inDosing = item.details && item.details.dosing && item.details.dosing.some(function (d) { return d.toLowerCase().indexOf(q) !== -1; });
        var inSecondary = item.details && item.details.secondary && item.details.secondary.some(function (s) { return s.toLowerCase().indexOf(q) !== -1; });
        return inTitle || inCategory || inSummary || inTags || inDetails || inDosing || inSecondary;
      });
    }

    // Sort pinned items first
    items.sort(function (a, b) {
      var isAPinned = pinnedIds.indexOf(a.id) !== -1;
      var isBPinned = pinnedIds.indexOf(b.id) !== -1;
      if (isAPinned && !isBPinned) return -1;
      if (!isAPinned && isBPinned) return 1;
      return 0;
    });

    if (items.length === 0) {
      els.grid.innerHTML = [
        '<div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--color-text-muted, #64748b);">',
        '  <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 0.75rem; opacity: 0.5;"></i>',
        '  <p style="font-weight: 700; margin: 0; font-size: 1.05rem; color: var(--color-text, #0f172a);">Không tìm thấy phác đồ / công thức phù hợp</p>',
        '  <small style="opacity: 0.75;">Thử tìm kiếm với từ khóa khác như "Phản vệ", "STEMI", "BMI", "CrCl", "eGFR", "SOFA", "CURB65"...</small>',
        '</div>'
      ].join('');
      return;
    }

    els.grid.innerHTML = items.map(function (item) {
      var isPinned = pinnedIds.indexOf(item.id) !== -1;
      var dosingHtml = item.details.dosing.map(function (d) { return '<li>' + d + '</li>'; }).join('');
      var secondaryHtml = (item.details.secondary && item.details.secondary.length > 0)
        ? [
            '<div class="cheatsheet-secondary-box">',
            '  <span class="cheatsheet-secondary-title"><i class="fa-solid fa-circle-exclamation" style="color: var(--color-primary);"></i> Lưu ý &amp; Hướng dẫn lâm sàng:</span>',
            '  <ul class="cheatsheet-secondary-list">',
            item.details.secondary.map(function (s) { return '<li>' + s + '</li>'; }).join(''),
            '  </ul>',
            '</div>'
          ].join('')
        : '';
      var tagsHtml = item.tags.map(function (t) { return '<span class="cheatsheet-tag">#' + t + '</span>'; }).join('');
      var actionLinkHtml = item.actionUrl
        ? [
            '<a href="' + item.actionUrl + '" class="cheatsheet-action-link" title="Mở trang công cụ / phác đồ chi tiết">',
            '  <span>' + (item.actionText || 'Mở chi tiết') + '</span>',
            '  <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.65rem;"></i>',
            '</a>'
          ].join('')
        : '';

      return [
        '<div class="cheatsheet-card" data-id="' + item.id + '">',
        '  <div class="cheatsheet-card-top">',
        '    <div class="cheatsheet-card-title-group">',
        '      <div class="cheatsheet-icon-box">',
        '        <i class="fa-solid ' + item.icon + '"></i>',
        '      </div>',
        '      <div>',
        '        <h4>' + item.title + '</h4>',
        '        <span class="cheatsheet-card-category">' + item.category + '</span>',
        '      </div>',
        '    </div>',
        '    <div style="display: flex; align-items: center; gap: 0.35rem;">',
        '      <span class="cheatsheet-badge ' + item.badgeClass + '">' + item.badge + '</span>',
        '      <button class="cheatsheet-pin-btn ' + (isPinned ? 'pinned' : '') + '" data-pin-id="' + item.id + '" title="' + (isPinned ? 'Bỏ ghim' : 'Ghim lên đầu') + '">',
        '        <i class="' + (isPinned ? 'fa-solid' : 'fa-regular') + ' fa-star"></i>',
        '      </button>',
        '    </div>',
        '  </div>',
        '  <p class="cheatsheet-summary">' + item.summary + '</p>',
        '  <div class="cheatsheet-details-box">',
        '    <span class="cheatsheet-first-line">' + item.details.firstLine + '</span>',
        '    <ul class="cheatsheet-dosing-list">',
        dosingHtml,
        '    </ul>',
        secondaryHtml,
        '  </div>',
        '  <div class="cheatsheet-card-footer">',
        '    <div class="cheatsheet-tags">',
        tagsHtml,
        '    </div>',
        '    <div class="cheatsheet-card-actions">',
        actionLinkHtml,
        '      <button type="button" class="cheatsheet-copy-btn" data-copy-id="' + item.id + '" title="Sao chép nội dung">',
        '        <i class="fa-regular fa-copy"></i>',
        '        <span>Chép</span>',
        '      </button>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');

    // Attach Pin click listeners
    els.grid.querySelectorAll('.cheatsheet-pin-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var pinId = btn.getAttribute('data-pin-id');
        if (!pinId) return;

        var idx = pinnedIds.indexOf(pinId);
        if (idx !== -1) {
          pinnedIds.splice(idx, 1);
        } else {
          pinnedIds.push(pinId);
        }

        try {
          localStorage.setItem('cliniportal_pinned_cheatsheets', JSON.stringify(pinnedIds));
        } catch (err) {}
        renderCheatsheets();
      });
    });

    // Attach Action link click to close modal
    els.grid.querySelectorAll('.cheatsheet-action-link').forEach(function (link) {
      link.addEventListener('click', function () {
        closeCheatsheetModal();
      });
    });

    // Attach Copy click listeners
    els.grid.querySelectorAll('.cheatsheet-copy-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var cardId = btn.getAttribute('data-copy-id');
        var item = CHEATSHEETS_DATA.find(function (d) { return d.id === cardId; });
        if (!item) return;

        var copyLines = [
          '[' + item.title + ']',
          item.summary,
          '---',
          item.details.firstLine
        ];
        item.details.dosing.forEach(function (d) { copyLines.push('• ' + d); });
        if (item.details.secondary) {
          copyLines.push('Lưu ý:');
          item.details.secondary.forEach(function (s) { copyLines.push('- ' + s); });
        }
        copyLines.push('---');
        copyLines.push('Nguồn: CliniPortal MedLens - Tra Cứu Nhanh Y Khoa');

        var copyText = copyLines.join('\n');

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(copyText).then(function () {
            btn.classList.add('copied');
            btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Đã chép</span>';
            setTimeout(function () {
              btn.classList.remove('copied');
              btn.innerHTML = '<i class="fa-regular fa-copy"></i> <span>Chép</span>';
            }, 1800);
          });
        }
      });
    });
  }

  function initListeners() {
    var els = getElements();

    // Trigger buttons
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('#header-cheatsheets-btn, .open-cheatsheet-btn, .cheatsheet-trigger-btn, #openCheatsheetModalBtn');
      if (trigger) {
        e.preventDefault();
        openCheatsheetModal();
      }
    });

    if (els.closeBtn) {
      els.closeBtn.addEventListener('click', closeCheatsheetModal);
    }

    if (els.modalOverlay) {
      els.modalOverlay.addEventListener('click', function (e) {
        if (e.target === els.modalOverlay) {
          closeCheatsheetModal();
        }
      });
    }

    if (els.searchInput) {
      els.searchInput.addEventListener('input', function () {
        currentQuery = els.searchInput.value;
        renderCheatsheets();
      });
    }

    if (els.filterControls) {
      els.filterControls.querySelectorAll('.cheatsheet-filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          els.filterControls.querySelectorAll('.cheatsheet-filter-btn').forEach(function (b) {
            b.classList.remove('active');
          });
          btn.classList.add('active');
          currentFilter = btn.getAttribute('data-filter') || 'all';
          renderCheatsheets();
        });
      });
    }

    // Phím Esc đóng modal
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && els.modalOverlay && els.modalOverlay.classList.contains('active')) {
        closeCheatsheetModal();
      }
    });
  }

  // Khởi tạo toàn cục
  window.openCheatsheetModal = openCheatsheetModal;
  window.closeCheatsheetModal = closeCheatsheetModal;
  window.renderCheatsheets = renderCheatsheets;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initListeners);
  } else {
    initListeners();
  }
})();
