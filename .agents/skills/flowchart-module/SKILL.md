---
name: flowchart-module
description: >
  Tạo, chỉnh sửa và vẽ lưu đồ tiếp cận lâm sàng tương tác (Interactive Clinical Flowcharts & Vector Studio)
  trong phân hệ Tiếp cận của CliniPortal. Kích hoạt khi AI cần: tạo lưu đồ thuật toán chẩn đoán,
  phác đồ xử trí cấp cứu, vẽ đường nối mũi tên vector, hoặc chỉnh sửa bất kỳ lưu đồ y khoa nào.
---

# Clinical Flowchart & Medical Draw Engine Skill

Skill này quy định chuẩn kiến trúc, quy tắc bố cục (Layout & Edge Routing Rules), dữ liệu JSON Schema và quy trình tạo/chỉnh sửa lưu đồ y khoa trong `Apps_ykhoa`.

---

## 📁 Cấu trúc Hệ thống Lưu đồ Y khoa

```
Apps_ykhoa/
├── js/
│   ├── flowchart.js                      # DOM Accordion Flowchart Controller
│   └── medical-draw-engine.js            # Vector SVG Edge Routing Engine & Canvas Builder
├── css/components/
│   ├── flowchart.css                     # Flowchart Card & DOM Node Styles
│   └── clinical-flow-studio.css          # Studio Studio Workspace & Node Palette Styles
├── pages/
│   ├── clinical-flow-studio.html         # Visual Interactive Studio thiết kế lưu đồ
│   └── Tiếp cận/                         # Thư viện lưu đồ phân loại theo chuyên khoa
└── docs/
    └── HUONG_DAN_THIET_KE_VA_VE_LUU_DO_YKHOA.md # Tài liệu hướng dẫn chi tiết
```

---

## ⚡ Các Công nghệ & Script Bắt buộc

Khi tạo một trang lưu đồ y khoa mới, bắt buộc nhúng các tài nguyên sau:

```html
<!-- CSS -->
<link rel="stylesheet" href="../../../css/reset.css">
<link rel="stylesheet" href="../../../css/main.css">
<link rel="stylesheet" href="../../../css/components/header.css">
<link rel="stylesheet" href="../../../css/components/sidebar.css">
<link rel="stylesheet" href="../../../css/components/footer.css">
<link rel="stylesheet" href="../../../css/components/clinical-flow-studio.css"> <!-- BẮT BUỘC NẾU DÙNG VECTOR -->

<!-- JS -->
<script src="../../../js/main.js" defer></script>
<script src="../../../js/medical-draw-engine.js"></script> <!-- Vector SVG Drawing Engine -->
<script src="../../../js/flowchart.js"></script>          <!-- DOM Accordion Flowchart -->
```

---

## 🎨 Quy chuẩn Phân loại Node Y khoa (Node Types & Colors)

| Loại Node | Tên chuyên môn | Màu sắc / CSS Class | Ý nghĩa Lâm sàng |
| :--- | :--- | :--- | :--- |
| `start` | Bệnh cảnh ban đầu | `med-node-start` (Xanh dương) | Tình huống tiếp cận ban đầu (Triệu chứng chính, Lý do vào viện). |
| `question` | Câu hỏi phân nhánh | `med-node-question` (Cam/Vàng) | Điểm rẽ nhánh chẩn đoán (Có/Không, Tiêu chuẩn chẩn đoán). |
| `action` | Can thiệp / Xử trí | `med-node-action` (Xanh lá) | Y lệnh điều trị, thủ thuật, cấp đơn thuốc. |
| `danger` | Cảnh báo Cấp cứu | `med-node-danger` (Đỏ) | Tình trạng nguy kịch, dọa tử vong, cần hồi sức ngay. |
| `success` | Tiên lượng tốt | `med-node-success` (Xanh ngọc) | Bệnh nhân ổn định, cho xuất viện hoặc chuyển phòng bệnh. |
| `dose` | Cảnh báo Liều thuốc | `med-node-dose` (Tím) | Cảnh báo liều dùng, chống chỉ định, độc tính của thuốc. |

---

## 📐 Quy tắc Bố cục & Định tuyến Mũi tên (Edge Routing Rules)

Khi AI sinh hoặc vẽ lưu đồ y khoa (qua JSON Schema hoặc SVG), bắt buộc tuân thủ 6 quy tắc sau (học tập từ `next-ai-draw-io`):

### Rule 1: Giới hạn Viewport Đơn (Single Viewport Constraint)
- Mọi node nằm trong khung tọa độ $X: 0 \rightarrow 1000px$, $Y: 0 \rightarrow 750px$.
- Khoảng cách chiều dọc giữa các cấp node: $120 \rightarrow 160px$. Khoảng cách chiều ngang: $180 \rightarrow 240px$.

### Rule 2: Neo Điểm Đi & Điểm Đến cố định (Explicit Anchors)
- Mỗi đường nối phải có `exitX`, `exitY` (mép ra từ Node nguồn) và `entryX`, `entryY` (mép vào Node đích).
- **Quy trình chảy từ trên xuống**: Xuất phát mép dưới (`exitX=0.5; exitY=1.0`), vào mép trên (`entryX=0.5; entryY=0.0`).
- **Phân nhánh 2 bên**: Phân nhánh trái (`exitX=0.0; exitY=0.5`), Phân nhánh phải (`exitX=1.0; exitY=0.5`).

### Rule 3: Tránh Chồng Tuyến Mũi tên Đôi (Bidirectional / Parallel Separation)
- Nếu giữa 2 node có 2 đường nối ngược nhau, không dùng chung vị trí trung tâm. Dùng `exitY=0.3` cho đường đi và `exitY=0.7` cho đường về.

### Rule 4: Điểm uốn Tránh Chướng ngại vật (Waypoints Obstacle Avoidance)
- Khi đường nối đi qua node trung gian, khai báo danh sách điểm uốn `waypoints: [{x: 750, y: 80}, {x: 750, y: 200}]` để uốn mũi tên đi vòng xung quanh chu vi sơ đồ, tuyệt đối không cắt ngang qua khung nội dung của node khác.

### Rule 5: Nhãn Mũi tên Rõ ràng (Connector Labels)
- Các câu hỏi phân nhánh phải có nhãn rõ ràng: `"Có / Yes"`, `"Không / No"`, `"Độ II trở lên"`, `"HA vẫn tụt"`.

### Rule 6: Highlight Lộ trình Lâm sàng Động (Interactive Path Highlighting)
- Khi người dùng nhấp vào nhãn câu trả lời, engine tự động gọi `highlightPathFromEdge(edgeId)` để làm nổi bật tuyến cấp cứu/điều trị tương ứng.

---

## 📋 Chuẩn dữ liệu JSON Schema Lưu đồ Y khoa

```json
{
  "version": "1.0",
  "width": 1000,
  "height": 750,
  "nodes": [
    {
      "id": "node-1",
      "type": "start",
      "title": "NGHI NGỜ SỐC PHẢN VỆ",
      "subtitle": "Biểu hiện Da, Niêm mạc, Hô hấp, Tuần hoàn",
      "badge": "BƯỚC 1",
      "x": 380,
      "y": 40,
      "width": 240
    },
    {
      "id": "node-2",
      "type": "action",
      "title": "TIÊM ADRENALIN BẮP NGAY",
      "subtitle": "Bắp đùi ngoài",
      "badge": "KHẨN CẤP",
      "x": 380,
      "y": 200,
      "width": 240,
      "details": "<b>Liều dùng:</b> Người lớn 0.5 - 1mg. Trẻ em 0.01mg/kg."
    }
  ],
  "edges": [
    {
      "id": "e1",
      "source": "node-1",
      "target": "node-2",
      "label": "Độ II trở lên",
      "type": "danger",
      "style": "orthogonal",
      "exitX": 0.5,
      "exitY": 1.0,
      "entryX": 0.5,
      "entryY": 0.0
    }
  ]
}
```

---

## 📝 Hướng dẫn AI Tạo & Sửa Lưu đồ Y khoa

1. **Khi tạo sơ đồ mới**: Khai báo đủ dữ liệu `nodes` & `edges` chuẩn JSON Schema trên.
2. **Khi chỉnh sửa vi mô**: Chỉ sửa thông tin tiêu đề, liều thuốc hoặc tọa độ $x, y$ của node cần sửa, giữ nguyên các node khác (tương tự cơ chế `edit_diagram`).
3. **Mở Studio**: Truy cập trang `pages/clinical-flow-studio.html` để vẽ trực quan hoặc xuất file ảnh SVG/PNG.
