---
name: pathology-approach-module
description: >
  Tạo, chỉnh sửa và quản lý các phác đồ tiếp cận bệnh lý y khoa (Pathology Matrix, Flowchart & Clinical Infographic Poster Board)
  trong phân hệ Bệnh lý của CliniPortal. Kích hoạt khi AI cần: tạo trang phác đồ bệnh lý mới,
  xây dựng Infographic Poster kết hợp Flowchart và các card thông tin xung quanh (Alert Banner,
  Comparison Card, Dose Table, Process Ribbon, Clinical Pearls), hoặc làm việc với thư mục pages/Tiếp cận/4. Bệnh lý/.
---

# Pathology Approach & Clinical Infographic Board Module Skill

Skill này quy định chuẩn kiến trúc, cấu trúc dữ liệu JSON Schema, quy chuẩn thiết kế UI/UX và quy trình thiết kế các trang phác đồ tiếp cận bệnh lý lâm sàng dạng **Clinical Infographic Poster Board** trong CliniPortal.

---

## 🛑 MODULE RULES BẮT BUỘC (Quy tắc Module Phác Đồ Bệnh Lý)

1. **Bảo Vệ Hub `benh-ly.js`**: `benh-ly.js` là **CRITICAL HUB** với >200 liên kết phụ thuộc. BẮT BUỘC chạy `node scratch/query_graph.js benh-ly.js` trước khi thực hiện bất kỳ refactor nào trên engine.
2. **Khai Báo Đúng 4 CSS & 3 JS Engine**: Khi nhúng Poster vào HTML, phải nạp đầy đủ `clinical-flow-studio.css`, `clinical-infographic-poster.css`, `benh-ly.css`, `medical-draw-engine.js`, `clinical-infographic-renderer.js` và `benh-ly.js`.
3. **Chuẩn Dữ Liệu JSON Schema**: Mọi bài phác đồ Poster JSON phải đáp ứng đầy đủ các trường chính: `id`, `name`, `icd`, `urgentAlert`, `flowchart`, `comparisonSection`, `dosingSection`, `processRibbon`, `takeaway`.
4. **Chuẩn Hóa Tọa Độ Node Studio**: Tọa độ $(x, y)$ và chiều rộng node flowchart phải khớp vừa khung viewBox SVG Canvas 750x480px.
5. **Kiểm Tra HTML Integrity**: Chạy `node scratch/check_tags.js path/to/file.html` khi tạo/sửa HTML trong phân hệ Bệnh lý.

---

## 📁 Cấu trúc Phân hệ Tiếp cận Bệnh lý

```text
Apps_ykhoa/
├── css/components/
│   ├── clinical-flow-studio.css          # Studio Workspace & Node Palette Styles
│   └── clinical-infographic-poster.css     # Poster Board Grid, Alert Banner, Dose Table Styles
├── js/
│   ├── medical-draw-engine.js            # Vector SVG Edge Routing & Canvas Builder
│   └── clinical-infographic-renderer.js  # Renderer chuyển đổi JSON sang Poster Board
├── pages/
│   ├── clinical-flow-studio.html         # Visual Interactive Studio thiết kế lưu đồ
│   └── Tiếp cận/4. Bệnh lý/
│       ├── benh-ly.html                  # Pathology Dashboard & Infographic Poster View Overlay
│       ├── benh-ly.css                   # Custom styles cho Pathology Hub
│       └── benh-ly.js                    # Management logic, local data & Poster controller
```

---

## ⚡ Các Tài Nguyên Bắt Buộc Khai Báo (CSS & JS Inclusions)

Khi làm việc hoặc tạo trang tiếp cận bệnh lý mới, bắt buộc khai báo đủ các tài nguyên sau:

```html
<!-- Base & Layout CSS -->
<link rel="stylesheet" href="../../../css/reset.css">
<link rel="stylesheet" href="../../../css/main.css">
<link rel="stylesheet" href="../../../css/components/header.css">
<link rel="stylesheet" href="../../../css/components/sidebar.css">
<link rel="stylesheet" href="../../../css/components/footer.css">

<!-- Flowchart & Infographic Poster CSS (BẮT BUỘC) -->
<link rel="stylesheet" href="../../../css/components/clinical-flow-studio.css">
<link rel="stylesheet" href="../../../css/components/clinical-infographic-poster.css">
<link rel="stylesheet" href="benh-ly.css">

<!-- JS Engine Dependencies -->
<script src="../../../js/main.js" defer></script>
<script src="../../../js/medical-draw-engine.js"></script>
<script src="../../../js/clinical-infographic-renderer.js"></script>
<script src="benh-ly.js"></script>
```

---

## 🎨 Quy Chuẩn Phân Loại Node & Component Lâm Sàng

| Loại Node / Component | Class CSS / Type | Ý nghĩa Lâm sàng & Ứng dụng |
| :--- | :--- | :--- |
| `start` | `med-node-start` (Xanh lam) | Tình huống tiếp cận ban đầu (Ví dụ: Nghi ngờ DVT, Người HBsAg dương tính). |
| `question` | `med-node-question` (Cam/Vàng) | Điểm rẽ nhánh chẩn đoán (Ví dụ: Wells Score $\le 1$ hay $\ge 2$, Có xơ gan không?). |
| `action` | `med-node-action` (Xanh lá) | Y lệnh can thiệp, xét nghiệm chỉ định, thủ thuật. |
| `danger` | `med-node-danger` (Đỏ) | Tình trạng nguy kịch, xác định bệnh nguy cơ cao, chuyển cấp cứu. |
| `success` | `med-node-success` (Xanh ngọc) | Bệnh nhân ổn định, loại trừ bệnh, theo dõi định kỳ. |
| `dose` / `dose-table` | `dose-table-card` (Tím / Indigo) | Bảng liều dùng thuốc chi tiết, thời gian điều trị và lưu ý chỉnh liều. |
| `alert` | `urgent-alert-banner` (Banner Đỏ) | Đánh giá ngay các dấu hiệu khẩn cấp cần ICU / Hồi sức ban đầu. |
| `comparison` | `comparison-card-grid` (Bảng 2 cột) | So sánh phân loại (DVT đoạn gần vs Đoạn xa; Tiêu chuẩn chẩn đoán). |
| `pipeline` | `process-pipeline-ribbon` (Chuỗi icon) | Thanh quy trình 5-6 bước dạng icon nối tiếp ➔ ở chân trang. |

---

## 📋 Chuẩn Dữ Liệu JSON Schema Cho Clinical Infographic Poster

Mỗi bài bệnh lý đầy đủ định dạng Poster được lưu trữ theo cấu trúc JSON Schema chuẩn:

```json
{
  "id": "path_dvt_poster",
  "name": "Phác Đồ Tiếp Cận DVT Chi Dưới",
  "subtitle": "Cập nhật thực hành 2026 — áp dụng cho người lớn nghi DVT",
  "icd": "I80.2",
  "specialty": "cap-cuu",
  "category": "ca-hai",
  "guidelines": ["NICE NG158 (2023)", "ASH Diagnosis (2018)", "CHEST 2021"],
  
  "urgentAlert": {
    "step": 1,
    "title": "ĐÁNH GIÁ NGAY TÌNH TRẠNG CẦN XỬ TRÍ KHẨN",
    "items": [
      "Khó thở, đau ngực, ngất, giảm SpO2, tụt huyết áp → nghi PE kèm theo",
      "Chân sưng căng toàn bộ, tím tái, đau dữ dội → nghi Phlegmasia"
    ],
    "actionText": "NẾU CÓ DẤU HIỆU TRÊN: XỬ TRÍ CẤP CỨU / HỘI CHẨN NGAY"
  },

  "flowchart": {
    "title": "LƯU ĐỒ CHẨN ĐOÁN CHÍNH DVT CHI DƯỚI",
    "width": 750,
    "height": 480,
    "nodes": [
      { 
        "id": "fn1", 
        "type": "start", 
        "title": "NGHI NGỜ DVT CHI DƯỚI", 
        "subtitle": "TÍNH WELLS DVT 2 MỨC", 
        "x": 260, 
        "y": 30, 
        "width": 240 
      },
      { 
        "id": "fn5", 
        "type": "danger", 
        "title": "XÁC ĐỊNH DVT", 
        "subtitle": "Siêu âm dương tính", 
        "x": 440, 
        "y": 320, 
        "width": 220, 
        "targetCardId": "comparison-card-section" 
      }
    ],
    "edges": [
      { "id": "fe1", "source": "fn1", "target": "fn5", "label": "Wells ≥ 2", "type": "danger" }
    ]
  },

  "comparisonSection": {
    "step": 3,
    "title": "ĐÃ XÁC ĐỊNH DVT → PHÂN LOẠI VỊ TRÍ HUYẾT KHỐI",
    "columns": [
      {
        "title": "DVT ĐOẠN GẦN (khoeo trở lên)",
        "theme": "navy",
        "bullets": ["Chống đông ít nhất 3 tháng", "Ưu tiên điều trị ngoại trú nếu ổn định"]
      },
      {
        "title": "DVT ĐOẠN XA ĐƠN ĐỘC",
        "theme": "teal",
        "bullets": ["Theo dõi siêu âm 2 tuần nếu nhẹ", "Chống đông khi có nguy cơ lan rộng"]
      }
    ]
  },

  "dosingSection": {
    "step": 4,
    "title": "LỰA CHỌN CHỐNG ĐÔNG & LIỀU DÙNG",
    "drugs": [
      { "name": "Apixaban (DOAC)", "dose": "10 mg x 2 lần/ngày x 7 ngày → 5 mg x 2 lần/ngày" },
      { "name": "Rivaroxaban (DOAC)", "dose": "15 mg x 2 lần/ngày x 21 ngày → 20 mg/ngày" }
    ],
    "specialNotices": ["Thai kỳ: Dùng phác đồ riêng, thường ưu tiên LMWH"]
  },

  "processRibbon": [
    { "icon": "fa-user-doctor", "label": "1. Xác suất LS", "targetId": "urgent-alert-card" },
    { "icon": "fa-vial", "label": "2. D-dimer / SA", "targetId": "poster-draw-canvas-container" },
    { "icon": "fa-map-pin", "label": "3. Vị trí DVT", "targetId": "comparison-card-section" },
    { "icon": "fa-pills", "label": "4. Chọn thuốc", "targetId": "dose-table-card-section" }
  ],

  "takeaway": {
    "title": "THÔNG ĐỆP THỰC HÀNH",
    "content": "Không chẩn đoán DVT chỉ vì D-dimer tăng. Đánh giá kỹ nguy cơ chảy máu trước khi kê đơn."
  }
}
```

---

## 🔗 Quy Tắc Tương Tác 2 Chiều (Cross-linking & Highlighting)

1. **Từ Flowchart Node đến Side Card**:
   - Khai báo thuộc tính `"targetCardId": "id-card-tuong-ung"` trong đối tượng node của flowchart.
   - Engine sẽ tự động lắng nghe sự kiện nhấp chọn node để cuộn mượt và kích hoạt hiệu ứng chớp sáng viền Card (`.card-highlight-active`).
2. **Từ Process Ribbon đến Vùng Nội Dung**:
   - Mỗi phần tử trong `processRibbon` khai báo `"targetId": "id-section"`.
   - Khi bác sĩ bấm vào nút bước quy trình ở chân trang, hệ thống gọi `ClinicalInfographicRenderer.highlightSection(targetId)` để cuộn trực tiếp tới vùng kiến thức đó.

---

## 📝 Quy Trình AI Tạo & Cập Nhật Bài Bệnh Lý

1. **Đọc kỹ thông tin khuyến cáo Y học chứng cứ mới nhất** (NICE, ACC/AHA, ESC, GINA, GOLD...).
2. **Kiểm tra tác động Graphify trên Hub `benh-ly.js`**: `benh-ly.js` là **CRITICAL HUB** (>200 liên kết). Trước khi sửa đổi engine bệnh lý, hãy chạy `node scratch/query_graph.js benh-ly.js` để đánh giá bán kính ảnh hưởng.
3. **Bảo tồn tính toàn vẹn HTML**: Chạy `node scratch/check_tags.js path/to/file.html` khi tạo/sửa trang HTML thuộc phân hệ Bệnh lý.
4. **Tạo khối dữ liệu JSON** theo đúng Schema `pathology-approach-module` ở trên.
5. **Thêm hoặc cập nhật vào danh sách bệnh lý** qua `benh-ly.js` hoặc nút **Nhập JSON** trên giao diện Pathology Dashboard.
6. **Kiểm tra hiển thị**:
   - Bấm nút **"👁️ Xem Poster"** để kiểm tra bản Poster Infographic Board.
   - Bấm nút **"Studio"** để điều chỉnh vị trí tọa độ $x, y$ của các Node Flowchart nếu cần.

