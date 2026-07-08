---
name: physiology-module
description: >
  Tạo và chỉnh sửa bài viết sinh lý học / sinh lý bệnh trực quan trong phân hệ
  Sinh lý - Sinh lý bệnh của CliniPortal. Kích hoạt khi AI cần: viết bài học sinh lý mới,
  thêm phần nội dung, cập nhật hình ảnh minh họa, hoặc làm việc với
  pages/Sinh lý - Sinh lý bệnh/.
---

# Physiology Module Skill

## 📁 Cấu trúc Phân hệ

```
pages/Sinh lý - Sinh lý bệnh/
├── Sinhly-sinhlybenh.html              # Hub tổng
├── README.md                           # Giới thiệu phân hệ
├── Sinhly/                             # Sinh lý học chuẩn
│   ├── HUONG_DAN_THIET_KE.md          # ⭐ Design guide chi tiết
│   ├── Note sinh lý.md                 # Ghi chú phát triển
│   ├── css/
│   │   └── physio-shared.css           # CSS RIÊNG của module Sinh lý
│   ├── js/
│   │   └── physio-shared.js            # JS RIÊNG của module Sinh lý
│   ├── images/                         # Ảnh minh họa theo Phần
│   │   ├── Phan1/ ... Phan7/
│   │   └── co2_transport_blood.png
│   ├── Phan1/                          # Phần 1: Tế bào học
│   │   ├── SL_TB_Daicuong&TB.html
│   │   ├── SL_TB_Diensinhly.html
│   │   └── SL_TB_Mangtebao.html
│   ├── Phan2/ ... Phan7/
│   └── [Các phần khác đang phát triển]
└── [Sinh lý bệnh — chưa có nội dung]
```

---

## ⚠️ Đặc điểm Quan trọng — Cấp Thư mục

Bài viết sinh lý nằm ở **cấp 4** (`pages/Sinh lý .../Sinhly/PhanX/file.html`).
Đây là trường hợp **duy nhất** có tài nguyên module riêng:

```html
<!-- Tài nguyên hệ thống (cấp 4 = 4 dấu ../) -->
<link rel="stylesheet" href="../../../../css/reset.css">
<link rel="stylesheet" href="../../../../css/main.css">
<link rel="stylesheet" href="../../../../css/components/header.css">
<link rel="stylesheet" href="../../../../css/components/sidebar.css">
<link rel="stylesheet" href="../../../../css/components/footer.css">

<!-- Tài nguyên riêng module Sinh lý (2 cấp lên = về thư mục Sinhly/) -->
<link rel="stylesheet" href="../../css/physio-shared.css">

<!-- Hình ảnh (tham chiếu đến images/ trong Sinhly/) -->
<img src="../../images/PhanX/ten-hinh.png" alt="Mô tả">

<!-- JS hệ thống -->
<script src="../../../../js/main.js" defer></script>
<script src="../../../../components/header.js" defer></script>
<script src="../../../../components/footer.js" defer></script>
<script src="../../../../js/toc.js" defer></script>        <!-- TOC tự động -->
<script src="../../../../js/physio-patho.js" defer></script>  <!-- Lightbox -->

<!-- JS module riêng -->
<script src="../../js/physio-shared.js" defer></script>
```

---

## 🔧 Cơ chế TOC Tự động (toc.js)

**Không cần code TOC thủ công.** Chỉ cần dùng cấu trúc `<main class="visual-container">` — script `toc.js` sẽ tự động:
1. Quét tất cả `<h2>`, `<h3>` trong nội dung
2. Tạo sidebar TOC có sticky scrolling
3. Highlight mục đang đọc

```html
<body>
  <div id="header-placeholder" ...></div>
  
  <div class="app-container">
    <aside class="app-sidebar">...</aside>
    
    <!-- QUAN TRỌNG: class="visual-container" để toc.js nhận diện -->
    <main class="visual-container">
      <!-- NỘI DUNG BÀI HỌC — toc.js tự inject cột TOC vào đây -->
      <article class="physio-article">
        <h1>Tên Bài học</h1>
        <h2>Phần 1: ...</h2>
        <h3>Mục 1.1: ...</h3>
        ...
      </article>
    </main>
  </div>
</body>
```

---

## 🎨 CSS Classes cho Nội dung Bài học

### Hệ thống tiêu đề sinh lý (physio-shared.css)
```html
<div class="physio-section">
  <h2 class="section-title">Tiêu đề Phần</h2>
  <h3 class="subsection-title">Tiêu đề Mục con</h3>
</div>
```

### Hộp thông tin & cảnh báo
```html
<div class="info-box">ℹ️ Thông tin quan trọng</div>
<div class="warning-box">⚠️ Lưu ý lâm sàng</div>
<div class="clinical-pearl">💎 Pearl lâm sàng</div>
<div class="key-concept">🔑 Khái niệm chìa khóa</div>
```

### Bảng so sánh
```html
<div class="comparison-table">
  <table>
    <thead><tr><th>Đặc điểm</th><th>Bình thường</th><th>Bệnh lý</th></tr></thead>
    <tbody>...</tbody>
  </table>
</div>
```

### Hình ảnh minh họa (Lightbox tự động)
```html
<!-- physio-patho.js tự động thêm lightbox khi click -->
<figure class="physio-figure">
  <img src="../../images/PhanX/ten-hinh.png" 
       alt="Mô tả hình" 
       class="physio-img lightbox-trigger">
  <figcaption>Chú thích hình</figcaption>
</figure>
```

---

## 📝 Quy tắc Đặt Tên File

```
SL_[MÃ_PHẦN]_[Tên_Rút_Gọn].html

VD:
SL_TB_Mangtebao.html     → Sinh Lý / Tế Bào / Màng tế bào
SL_TM_Hoatdong.html      → Sinh Lý / Tim Mạch / Hoạt động tim
SL_HH_Thongkhi.html      → Sinh Lý / Hô Hấp / Thông khí
```

### Mã phần (Phan):
| Phần | Nội dung |
|------|---------|
| Phan1 | Tế bào học |
| Phan2 | Thần kinh & Cơ |
| Phan3 | Tim mạch |
| Phan4 | Hô hấp |
| Phan5 | Thận & Điện giải |
| Phan6 | Tiêu hóa |
| Phan7 | Nội tiết |

---

## 📝 Quy trình Tạo Bài học Mới

1. **Xác định Phần** — Tạo file vào đúng thư mục `PhanX/`
2. **Copy boilerplate** từ `templates/physiology-template.html`
3. **Điều chỉnh paths** (cấp 4 + tài nguyên module)
4. **Đặt `<main class="visual-container">`** để TOC hoạt động
5. **Tổ chức tiêu đề** theo `h2` (mục lớn) → `h3` (mục con) — TOC sẽ tự tạo
6. **Đọc** `pages/Sinh lý - Sinh lý bệnh/Sinhly/HUONG_DAN_THIET_KE.md` để xem ví dụ đầy đủ
