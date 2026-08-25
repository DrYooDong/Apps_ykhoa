/**
 * Knowledge Map Data — CliniPortal
 * Mạng lưới liên kết tri thức liên phân hệ (Kỹ năng ↔ Sinh lý ↔ Tiếp cận ↔ Công cụ ↔ Dược lý)
 */

window.KNOWLEDGE_MAP_DATA = {
  "kham-tim-mach": {
    tags: ["tim-mach", "kham-tim", "tieng-thoi", "valves"],
    title: "Khám Tim Mạch",
    links: [
      { module: "Sinh lý", title: "Sinh lý Tuần hoàn & Chu kỳ tim", url: "../../Sinh lý - Sinh lý bệnh/Sinhly/Phan1/SL_Timmach.html", icon: "🧬" },
      { module: "Tiếp cận", title: "Lưu đồ Tiếp cận Đau ngực", url: "../../Tiếp cận/2. Triệu chứng/Than phiền Tim mạch/Đau ngực/TC_DauNguc.html", icon: "🤒" },
      { module: "Công cụ", title: "Thang điểm TIMI / GRACE / Wells", url: "../../Công cụ/Tim mạch & huyết khối/ptnctimmach.html", icon: "⚙️" },
      { module: "Dược lý", title: "Dược lý Thuốc Tim Mạch & Kháng đông", url: "../../Dược lý/Chuyên khoa/DL_Timmach.html", icon: "💊" }
    ]
  },
  "kham-ho-hap": {
    tags: ["ho-hap", "kham-phoi", "ran-nổ", "khó-thở"],
    title: "Khám Hô Hấp",
    links: [
      { module: "Sinh lý", title: "Sinh lý Trao đổi & Vận chuyển khí", url: "../../Sinh lý - Sinh lý bệnh/Sinhly/Phan4/SL_Traodoikhi.html", icon: "🧬" },
      { module: "Tiếp cận", title: "Lưu đồ Tiếp cận Khó thở cấp", url: "../../Tiếp cận/2. Triệu chứng/Than phiền Hô hấp/Khó thở/TC_KhoTho.html", icon: "🤒" },
      { module: "Công cụ", title: "Đánh giá Viêm phổi (PSI / CURB-65)", url: "../../Công cụ/Hô hấp & Lao/DG_Viem-phoi.html", icon: "⚙️" },
      { module: "Dược lý", title: "Dược lý Thuốc Hô Hấp & Phun khí dung", url: "../../Dược lý/Chuyên khoa/DL_Hohap.html", icon: "💊" }
    ]
  },
  "hoi-sinh-tim-phoi": {
    tags: ["cpr", "acls", "ngung-tuan-hoan", "hoi-suc"],
    title: "Hồi Sinh Tim Phổi (CPR/ACLS)",
    links: [
      { module: "Tiếp cận", title: "Phác đồ Cấp cứu Khẩn 60s", url: "../../Tiếp cận/1. HS-CC/emergency-quick-protocol.html", icon: "⚡" },
      { module: "Công cụ", title: "Quản lý Thuốc Vận mạch & Trợ tim", url: "../../Công cụ/Cấp cứu & hồi sức/QL_Vanmach.html", icon: "⚙️" },
      { module: "Dược lý", title: "Tra cứu Thuốc Cấp cứu Khẩn cấp (Emergency FAB)", url: "../../Dược lý/duoc-ly.html", icon: "💊" }
    ]
  },
  "doc-ecg": {
    tags: ["ecg", "dien-tam-do", "nhip-tim", "stemi"],
    title: "Đọc Điện Tâm Đồ (ECG)",
    links: [
      { module: "Sinh lý", title: "Sinh lý Điện thế hoạt động cơ tim", url: "../../Sinh lý - Sinh lý bệnh/Sinhly-sinhlybenh.html", icon: "🧬" },
      { module: "Tiếp cận", title: "Lưu đồ Tiếp cận Rối loạn nhịp tim", url: "../../Tiếp cận/tiep-can.html", icon: "🤒" },
      { module: "Công cụ", title: "Máy tính Khoảng QTc & Trục điện tim", url: "../../Công cụ/cong-cu.html", icon: "⚙️" },
      { module: "Dược lý", title: "Dược lý Thuốc Chống Rối Lạn Nhịp Tim", url: "../../Dược lý/Chuyên khoa/DL_Timmach.html", icon: "💊" }
    ]
  },
  "doc-abg": {
    tags: ["abg", "khi-mau-dong-mach", "toan-kiem", "ph"],
    title: "Đọc Khí Máu Động Mạch (ABG)",
    links: [
      { module: "Sinh lý", title: "Sinh lý Cân bằng Toan Kiềm & Đệm Thận - Phổi", url: "../../Sinh lý - Sinh lý bệnh/Sinhly-sinhlybenh.html", icon: "🧬" },
      { module: "Công cụ", title: "Máy tính ABG 6 Bước Chẩn Đoán Tự Động", url: "../../Công cụ/Thận & Điện giải - toan kiềm/DG_ABG.html", icon: "⚙️" },
      { module: "Dược lý", title: "Dược lý Bù Bicarbonate & Toan Thận", url: "../../Dược lý/Chuyên khoa/DL_Ttoan_than.html", icon: "💊" }
    ]
  }
};
