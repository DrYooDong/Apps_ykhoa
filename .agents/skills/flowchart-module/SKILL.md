---
name: flowchart-module
description: >
  Tạo và chỉnh sửa lưu đồ tiếp cận lâm sàng tương tác (Interactive Flowcharts) trong
  phân hệ Tiếp cận của CliniPortal. Kích hoạt khi AI cần: tạo lưu đồ thuật toán chẩn đoán,
  phác đồ xử trí cấp cứu, hoặc bất kỳ trang nào trong pages/Tiếp cận/.
---

# Flowchart Module Skill

## 📁 Cấu trúc Phân hệ

```
pages/Tiếp cận/
├── tiep-can.html                         # Hub tổng (search + filter)
├── HUONG_DAN_THIET_KE.md                 # Design guide chi tiết
├── 1. Cấp cứu & Hồi sức chấn thương/
│   ├── Cấp cứu Môi trường & Độc chất/
│   ├── Cấp cứu Ngoại khoa & Chấn thương/
│   ├── Cấp cứu Sản - Nhi/
│   └── Hồi sức cơ bản & nâng cao/
├── 2. Tiếp cận chẩn đoán từ triệu chứng lâm sàng/
│   ├── Than phiền Hô hấp - Tim mạch/
│   ├── Than phiền Thần kinh - Cơ xương khớp/
│   ├── Than phiền Thận niệu - Sinh dục/
│   ├── Than phiền Tiêu hóa - Bụng/
│   └── Than phiền Toàn thân/
├── 3. Quản lý bệnh lý mạn tính & hệ thống/
│   ├── Chuyển hóa & Nội tiết/
│   ├── Huyết học & Truyền nhiễm/
│   ├── Sức khỏe Hành vi & Tâm thần/
│   ├── Tim mạch & Thận/
│   └── Tiêu hóa - Ngoại khoa/
├── 4. Chăm sóc đặc biệt Sản Phụ khoa & Nhi khoa/
└── 5. Y học dự phòng & Kỹ năng nền tảng/
```

## 📐 Đường dẫn Tương đối

- File ở **gốc Tiếp cận** (cấp 2): prefix `../../`
- File trong **thư mục con** (cấp 3): prefix `../../../`
- File trong **thư mục con sâu hơn** (cấp 4): prefix `../../../../`

---

## ⚡ CSS & JS Bắt buộc

```html
<!-- CSS -->
<link rel="stylesheet" href="../../../css/reset.css">
<link rel="stylesheet" href="../../../css/main.css">
<link rel="stylesheet" href="../../../css/components/header.css">
<link rel="stylesheet" href="../../../css/components/sidebar.css">
<link rel="stylesheet" href="../../../css/components/footer.css">
<link rel="stylesheet" href="../../../css/components/flowchart.css">  <!-- BẮT BUỘC -->

<!-- JS -->
<script src="../../../js/main.js" defer></script>
<script src="../../../components/header.js" defer></script>
<script src="../../../components/footer.js" defer></script>
<script src="../../../js/flowchart.js"></script>  <!-- Load KHÔNG defer để init ngay -->
```

---

## 🔧 JavaScript API — flowchart.js

### `switchPane(paneName)`
Chuyển đổi giữa các sơ đồ con (pane). Ví dụ: từ "Chẩn đoán" sang "Xử trí".
```html
<button onclick="switchPane('chan-doan')">Chẩn đoán</button>
<button onclick="switchPane('xu-tri')">Xử trí</button>

<div class="flow-pane" id="chan-doan">...</div>
<div class="flow-pane" id="xu-tri" style="display:none">...</div>
```

### `toggleNode(nodeId)`
Mở/đóng bảng thông tin chi tiết của node.
```html
<div class="fnode" onclick="toggleNode('node-1')">
  <span class="fnode-title">Tiêu đề Node</span>
  <i class="fa fa-chevron-down fnode-arrow"></i>
</div>
<div class="fnode-details" id="node-1">
  <!-- Nội dung chi tiết -->
</div>
```

---

## 🎨 CSS Classes Hệ thống Lưu đồ (flowchart.css)

### Layout
```html
<div class="flow-container">          <!-- Bao bọc toàn bộ lưu đồ -->
  <div class="flow-pane-tabs">        <!-- Thanh tab chuyển sơ đồ con -->
    <button class="fpane-btn active" onclick="switchPane('id')">Tab 1</button>
  </div>
  <div class="flow-pane active" id="id">  <!-- Một sơ đồ con -->
    ...
  </div>
</div>
```

### Node Types (màu sắc)
```html
<!-- Node khởi đầu -->
<div class="fnode fnode-start">Tiêu đề bệnh cảnh</div>

<!-- Node câu hỏi / phân nhánh -->
<div class="fnode fnode-question">
  <div class="fnode-q">Câu hỏi chẩn đoán?</div>
</div>

<!-- Node hành động / xử trí -->
<div class="fnode fnode-action">Thực hiện điều trị X</div>

<!-- Node nguy cơ (đỏ) -->
<div class="fnode fnode-danger">Nguy cơ cao — cần can thiệp ngay</div>

<!-- Node kết quả tốt (xanh) -->
<div class="fnode fnode-success">Tiên lượng tốt</div>

<!-- Node có thể mở rộng (accordion) -->
<div class="fnode fnode-expandable" onclick="toggleNode('id')">
  <div class="fnode-header">
    <span class="fnode-title">Tiêu đề</span>
    <i class="fa fa-chevron-down fnode-arrow"></i>
  </div>
  <div class="fnode-details" id="id">
    <!-- Chi tiết lâm sàng -->
  </div>
</div>
```

### Mũi tên kết nối
```html
<div class="flow-arrow">↓</div>
<div class="flow-arrow flow-arrow-yes">Có / Yes</div>
<div class="flow-arrow flow-arrow-no">Không / No</div>
```

### Hộp cảnh báo lâm sàng
```html
<div class="clinical-alert ca-danger">⚠️ Cảnh báo nguy hiểm</div>
<div class="clinical-alert ca-warning">⚡ Thận trọng</div>
<div class="clinical-alert ca-info">ℹ️ Thông tin</div>
<div class="clinical-alert ca-success">✅ An toàn</div>
```

---

## 📋 Sidebar Navigation Chuẩn cho Phân hệ Tiếp cận

```html
<aside class="app-sidebar" id="appSidebar">
  <div class="sidebar-header">
    <span class="sidebar-title">Tiếp cận Lâm sàng</span>
    <button class="sidebar-collapse-btn" id="sidebarCollapseBtn">
      <i class="fas fa-chevron-left"></i>
    </button>
  </div>
  <nav class="sidebar-nav">
    <a href="../../../pages/Tiếp cận/tiep-can.html" class="sidebar-link">
      <i class="fas fa-home"></i><span>Tổng quan</span>
    </a>
    <!-- Thêm các link tới trang trong phân hệ -->
  </nav>
</aside>
```

---

## 📝 Quy trình Tạo Lưu đồ Mới

1. **Chọn vị trí** đúng trong cây thư mục (đúng nhóm phân loại)
2. **Copy boilerplate** từ `templates/flowchart-template.html`
3. **Điều chỉnh paths** theo cấp thư mục
4. **Thiết kế flow**: Dùng `fnode-start` → `fnode-question` → `fnode-action/danger/success`
5. **Thêm accordion** cho các node có chi tiết lâm sàng dài
6. **Tham khảo** file `pages/Tiếp cận/HUONG_DAN_THIET_KE.md` để xem ví dụ đầy đủ
