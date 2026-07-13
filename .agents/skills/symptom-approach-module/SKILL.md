---
name: symptom-approach-module
description: >
  Tạo và chỉnh sửa các trang tiếp cận triệu chứng lâm sàng (Symptom Approach Pages) trong
  phân hệ Tiếp cận của CliniPortal. Kích hoạt khi AI cần: tạo trang chẩn đoán phân biệt triệu chứng mới,
  thiết lập layout 7 bước tiếp cận lâm sàng, hoặc làm việc với thư mục pages/Tiếp cận/2. Triệu chứng/.
---

# Symptom Approach Module Skill

Tài liệu này định nghĩa quy chuẩn thiết kế, cấu trúc HTML và các quy tắc kỹ thuật khi xây dựng hoặc chỉnh sửa các trang tiếp cận triệu chứng lâm sàng nằm trong thư mục `pages/Tiếp cận/2. Triệu chứng/`.

---

## 📁 Cấu trúc Phân hệ Triệu chứng

```
pages/Tiếp cận/2. Triệu chứng/
├── Than phiền Hô hấp - Tim mạch/
├── Than phiền Thần kinh - Cơ xương khớp/
├── Than phiền Thận niệu - Sinh dục/
├── Than phiền Tiêu hóa - Bụng/
└── Than phiền Toàn thân/
    ├── Sốt/
    │   ├── TC_Sot.html               # Hub tiếp cận Sốt (cấp 4)
    │   ├── TC_Sot&Daudau.html        # Sốt + Đau đầu (cấp 4)
    │   └── ...
    ├── TC_Phu.html                   # Tiếp cận Phù (cấp 3)
    └── TC_Vangda.html                # Tiếp cận Vàng da (cấp 3)
```

---

## 📐 Quy tắc Đường dẫn Tương đối (Relative Paths)

Đường dẫn tương đối tới các tài nguyên tĩnh (`css/`, `js/`, `components/`) phải được tính chính xác dựa trên cấp thư mục của file HTML:

*   **File ở cấp 3** (ví dụ: `pages/Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/TC_Phu.html`):
    *   Sử dụng: `../../../../` (4 cấp) để về thư mục gốc.
    *   Ví dụ: `<link rel="stylesheet" href="../../../../css/main.css">`
*   **File ở cấp 4** (ví dụ: `pages/Tiếp cận/2. Triệu chứng/Than phiền Toàn thân/Sốt/TC_Sot&Daudau.html`):
    *   Sử dụng: `../../../../../` (5 cấp) để về thư mục gốc.
    *   Ví dụ: `<link rel="stylesheet" href="../../../../../css/main.css">`

---

## ⚡ CSS & JS Bắt buộc phải load

Các trang tiếp cận triệu chứng sử dụng hệ thống **Mục lục tự động (TOC)** và **ScrollSpy** thông qua file `approach-symptom.js` và `approach-symptom.css`.

### Cấu trúc `<head>` (Ví dụ cho file cấp 4):
```html
<!-- CSS Core -->
<link rel="stylesheet" href="../../../../../css/reset.css">
<link rel="stylesheet" href="../../../../../css/main.css">
<link rel="stylesheet" href="../../../../../css/components/header.css">
<link rel="stylesheet" href="../../../../../css/components/sidebar.css">
<link rel="stylesheet" href="../../../../../css/components/footer.css">

<!-- CSS Layout Tiếp cận Triệu chứng (BẮT BUỘC) -->
<link rel="stylesheet" href="../../../../../css/components/approach-symptom.css">
```

### Cấu trúc cuối `<body>` (Ví dụ cho file cấp 4):
```html
<!-- JS Core -->
<script src="../../../../../js/main.js" defer></script>
<script src="../../../../../components/header.js" defer></script>
<script src="../../../../../components/footer.js" defer></script>

<!-- JS Layout Tiếp cận Triệu chứng (BẮT BUỘC - tự động sinh ra TOC và điều khiển ScrollSpy) -->
<script src="../../../../../js/approach-symptom.js" defer></script>
```

---

## 📐 Cấu trúc Layout HTML của Trang Tiếp cận Triệu chứng

Mỗi trang tiếp cận triệu chứng phải tuân thủ nghiêm ngặt khung cấu trúc HTML sau:

```html
<div class="app-container">
  <!-- SIDEBAR (Tập trung điều hướng và chứa container tự sinh mục lục) -->
  <aside class="app-sidebar" id="appSidebar">
    <!-- Nút toggle arrow -->
    <button id="sidebar-toggle-arrow" class="sidebar-toggle-arrow" aria-label="Thu gọn/Mở rộng Sidebar">
      <!-- SVG Arrow icon -->
    </button>
    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li><a href="../../../../../index.html" class="nav-item">Trang chủ</a></li>
        <li><a href="../../../../../pages/Tiếp cận/tiep-can.html" class="nav-item">Tiếp cận lâm sàng</a></li>
        <li><a href="TC_Sot.html" class="nav-item active">Tiếp cận Sốt</a></li>
      </ul>
      <!-- Vùng chứa Mục lục tự sinh (JS sẽ chèn TOC và ScrollSpy vào đây) -->
      <div class="sidebar-toc" id="sidebarToc"></div>
    </nav>
  </aside>

  <!-- MAIN WRAPPER -->
  <main class="main-wrapper">
    <!-- BREADCRUMB -->
    <!-- HERO BANNER -->

    <!-- LƯỚI TRIỆU CHỨNG CHỨA CÁC BƯỚC -->
    <div class="symptom-grid">
      <!-- Các thẻ symptom-step-card đặt ở đây -->
    </div>
  </main>
</div>
```

---

## 🎨 Quy chuẩn CSS Class cho các Thẻ bước lâm sàng (`.symptom-step-card`)

Hệ thống tự động sinh Mục lục (`approach-symptom.js`) sẽ quét qua toàn bộ các phần tử có class `.symptom-step-card` để tạo link liên kết. 

### 1. Phân chia Độ rộng cột (Grid Columns)
*   `.symptom-col-6`: Chiếm 50% độ rộng của lưới triệu chứng trên màn hình desktop (tự động chuyển sang 100% trên màn hình nhỏ &le; 991px). Thích hợp cho các bước ngắn hoặc song song.
*   `.symptom-col-12`: Chiếm 100% độ rộng của lưới. Thích hợp cho các bảng chẩn đoán phân biệt dài hoặc các bước phức tạp.

### 2. Thiết lập Màu sắc viền theo Phân tầng Lâm sàng
Mỗi bước trong quy trình tiếp cận 7 bước có viền màu tương thích với tính chất y khoa:
*   `.border-danger` (Đỏ): Dành cho **Bước 1: Ổn định ban đầu – Sàng lọc nguy cơ** (Đe dọa tính mạng/Cờ đỏ).
*   `.border-primary` (Xanh dương): Dành cho **Bước 2: Thu thập dữ kiện** và **Bước 6: Xử trí ban đầu**.
*   `.border-warning` (Vàng): Dành cho **Bước 3: Lập danh sách chẩn đoán phân biệt**.
*   `.border-success` (Xanh lá): Dành cho **Bước 4: Biện luận lâm sàng**.
*   `.border-info` (Xanh ngọc): Dành cho **Bước 5: Cận lâm sàng hợp lý**.

### 3. Cấu trúc một Step Card tiêu chuẩn:
```html
<div class="symptom-step-card border-danger symptom-col-6">
  <div class="step-card-header">
    <span class="step-card-tag tag-danger">Bước 1</span>
  </div>
  <h3 class="step-card-title"><i class="fas fa-exclamation-triangle"></i> Tiêu đề bước</h3>
  <div class="step-card-body">
    <!-- Nội dung văn bản, danh sách <ul> hoặc bảng -->
  </div>
</div>
```
*   **Thẻ tag màu sắc tương ứng:** `.tag-danger` (Đỏ), `.tag-warning` (Vàng), `.tag-success` (Xanh lá), `.tag-info` (Xanh ngọc), hoặc mặc định (Xanh dương).

---

## 📊 Cấu trúc Bảng dữ liệu (`.symptom-table`)

Mọi bảng dữ liệu tra cứu y khoa (bảng phân độ, bảng phân tích dịch...) phải được bao bọc trong class cuộn ngang:

```html
<div class="symptom-table-wrapper">
  <table class="symptom-table">
    <thead>
      <tr>
        <th>Cột 1</th>
        <th>Cột 2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Dữ liệu 1</td>
        <td>Dữ liệu 2</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 📈 Cấu trúc Thẻ Lưu đồ / Thuật toán trực quan (`.image-placeholder-card`)

Để nhúng các lưu đồ tiếp cận lâm sàng hoặc phác đồ xử trí chi tiết theo dạng thẻ ảnh kèm mô tả lý luận:

```html
<div class="image-placeholder-card">
  <div class="image-title">
    <span>📊</span> Tên lưu đồ thuật toán / Phác đồ xử trí
  </div>
  <div class="image-drop-area">
    <div class="image-drop-text">
      <!-- Ảnh lưu đồ thực tế (đặt tại images/) -->
      <img src="../../../../../images/TC_Sot_TenFile.png" alt="Mô tả ảnh"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
      <!-- Trình giữ chỗ fallback khi mất ảnh -->
      <div class="fallback-placeholder" style="display: none;">
        <i class="fa-regular fa-image"></i>
        <p>Sơ đồ lưu đồ thuật toán đang được cập nhật</p>
      </div>
    </div>
  </div>
  <div class="image-description">
    <strong>Tóm tắt lưu đồ / Biện luận lâm sàng:</strong><br>
    - Viết các ý chính tóm tắt đường đi của lưu đồ để bác sĩ có thể đọc nhanh văn bản khi không load được hình ảnh.
  </div>
</div>
```

---

## 💡 Hộp thông điệp cốt lõi và Tài liệu tham khảo
Được đặt ở cuối trang bên ngoài `.symptom-grid` để tổng kết bài học:

### Thông điệp cốt lõi (`.take-home-card`):
```html
<section class="take-home-card">
  <div class="take-home-title">
    <i class="fas fa-lightbulb"></i> Thông điệp Cốt lõi (Take-home Messages)
  </div>
  <div class="take-home-body">
    <ul>
      <li>Điểm cốt lõi 1</li>
    </ul>
  </div>
</section>
```

### Tài liệu tham khảo (`.references-card`):
```html
<section class="references-card">
  <div class="references-title">
    <i class="fas fa-book"></i> Tài liệu Tham khảo
  </div>
  <ol class="references-list">
    <li>Tên tài liệu tham khảo 1</li>
  </ol>
</section>
```
