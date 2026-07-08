---
name: cliniportal-architecture
description: >
  Hiểu và làm việc với kiến trúc tổng thể của CliniPortal — hệ sinh thái web y khoa
  tĩnh (pure HTML/CSS/JS). Kích hoạt khi AI cần: tạo trang mới, sửa layout, thêm
  CSS/JS, cấu hình đường dẫn, hoặc làm bất kỳ tác vụ nào trong project CliniPortal.
---

# CliniPortal Architecture Skill

## 📌 Project Identity

- **Tên**: CliniPortal
- **Loại**: Static web app — pure HTML/CSS/JS, NO framework, NO build tools
- **Giao thức**: Chạy qua `file:///` (offline) hoặc web server cục bộ
- **Thư mục gốc**: `i:\Drive của tôi\apps\Apps_ykhoa\`
- **Tài liệu tổng**: `docs/PROJECT_OVERVIEW.md`, `docs/FILE_MAP.md`

---

## 🏗️ Cấu trúc Thư mục Gốc

```
Apps_ykhoa/
├── index.html               # Trang chủ
├── assets/                  # Fonts, images, icons, lottie, buttons, backgrounds
├── components/              # header.html/.js, footer.html/.js
├── css/
│   ├── reset.css
│   ├── main.css             # Design System CỐT LÕI — phải load ở MỌI trang
│   └── components/          # 20+ CSS files theo từng module
├── js/
│   ├── main.js              # App controller — phải load ở MỌI trang
│   ├── [module].js
│   └── calculators/
├── templates/               # 4 boilerplate HTML mẫu
├── pages/                   # 7 phân hệ nội dung
└── docs/                    # Tài liệu hệ thống
```

---

## 🎨 Design System — Design Tokens

Tất cả styling phải dùng CSS variables từ `main.css`. **KHÔNG hardcode màu, kích thước.**

### Màu sắc chính
```css
var(--color-primary)      /* #0284c7 — xanh dương y tế */
var(--color-primary-dark) /* #0369a1 */
var(--color-surface)      /* Nền card (auto dark/light) */
var(--color-bg)           /* Nền trang (auto dark/light) */
var(--color-text)         /* Chữ chính */
var(--color-text-muted)   /* Chữ phụ */
var(--color-border)       /* Viền */
```

### Typography
```css
var(--text-xs)   /* 0.75rem */
var(--text-sm)   /* 0.875rem */
var(--text-base) /* 1rem */
var(--text-lg)   /* 1.125rem */
var(--text-xl)   /* 1.25rem */
var(--text-2xl)  /* 1.5rem */
var(--text-3xl)  /* 1.875rem */
var(--text-4xl)  /* 2.25rem */
```

### Bo góc & Đổ bóng
```css
var(--radius-sm) var(--radius-md) var(--radius-lg) var(--radius-full)
var(--shadow-sm) var(--shadow-md) var(--shadow-lg) var(--shadow-xl)
```

### Dark Mode
Toggle `data-theme="dark"` trên `<html>`. JavaScript tự lưu vào `localStorage`.
```javascript
// Bật dark mode:
document.documentElement.setAttribute('data-theme', 'dark');
localStorage.setItem('theme', 'dark');
```

---

## 📐 CRITICAL: Quy tắc Đường dẫn Tương đối

**Đây là nguồn lỗi phổ biến nhất.** Đếm số cấp thư mục từ file đến root:

| Vị trí file | Prefix |
|-------------|--------|
| `index.html` (root) | `./` hoặc không cần |
| `pages/Module.html` (cấp 1) | `../` |
| `pages/Module/page.html` (cấp 2) | `../../` |
| `pages/Module/Sub/page.html` (cấp 3) | `../../../` |
| `pages/Module/Sub/Sub2/page.html` (cấp 4) | `../../../../` |

### Ví dụ cho file ở cấp 3 (pages/Công cụ/Thận/DG_ABG.html):
```html
<link rel="stylesheet" href="../../../css/reset.css">
<link rel="stylesheet" href="../../../css/main.css">
<link rel="stylesheet" href="../../../css/components/header.css">
<script src="../../../js/main.js" defer></script>
<script src="../../../components/header.js" defer></script>
```

> ⚠️ **Ngoại lệ Sinh lý học**: Bài viết ở cấp 4 (`pages/Sinh lý .../Sinhly/PhanX/`) còn có tài nguyên riêng ở `../../css/physio-shared.css` (relative đến thư mục `Sinh lý/`).

---

## 🧱 Layout HTML Chuẩn (Boilerplate)

Mọi trang nội dung đều dùng cấu trúc này:

```html
<!DOCTYPE html>
<html lang="vi" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[Mô tả trang]">
  <title>[Tên trang] – CliniPortal</title>

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <!-- FontAwesome -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">

  <!-- CSS Core (thay [PATH] theo cấp thư mục) -->
  <link rel="stylesheet" href="[PATH]/css/reset.css">
  <link rel="stylesheet" href="[PATH]/css/main.css">
  <link rel="stylesheet" href="[PATH]/css/components/header.css">
  <link rel="stylesheet" href="[PATH]/css/components/sidebar.css">
  <link rel="stylesheet" href="[PATH]/css/components/footer.css">
  <!-- CSS riêng của module (nếu có) -->
</head>
<body>
  <div id="header-placeholder" data-header-path="[PATH]/components/header.html"></div>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>

  <div class="app-container">
    <aside class="app-sidebar" id="appSidebar">
      <!-- COPY sidebar nav từ trang cùng phân hệ -->
    </aside>

    <main class="main-wrapper">
      <!-- NỘI DUNG CHÍNH -->
    </main>
  </div>

  <div id="footer-placeholder" data-footer-path="[PATH]/components/footer.html"></div>

  <!-- JS Core -->
  <script src="[PATH]/js/main.js" defer></script>
  <script src="[PATH]/components/header.js" defer></script>
  <script src="[PATH]/components/footer.js" defer></script>
  <!-- JS riêng của module (nếu có) -->
</body>
</html>
```

---

## 🗂️ 7 Phân hệ và Skills tương ứng

| Module | Hub | Skill AI |
|--------|-----|---------|
| Công cụ | `pages/Công cụ/cong-cu.html` | `clinical-tools-module` |
| Dược lý | `pages/Dược lý/duoc-ly.html` | `pharmacology-module` |
| Kỹ năng | `pages/Kỹ năng/ky-nang.html` | `clinical-skills-module` |
| Sinh lý | `pages/Sinh lý .../Sinhly-sinhlybenh.html` | `physiology-module` |
| Tiếp cận | `pages/Tiếp cận/tiep-can.html` | `flowchart-module` |
| EBM | `pages/Y học chứng cứ/yhcc.html` | — |
| YHCT | `pages/Y học cổ truyền/y-hoc-co-truyen.html` | — |

---

## ⚠️ Các lỗi thường gặp — Cần tránh

1. **Sai đường dẫn tương đối** — Luôn đếm cấp thư mục trước khi viết path
2. **Hardcode màu** — Dùng `var(--color-primary)` thay vì `#0284c7`
3. **Không load `main.js`** — File này bắt buộc để theme/sidebar hoạt động
4. **Quên `data-header-path`** — Thiếu attribute này thì header không load được
5. **Thêm thư viện ngoài** — CliniPortal dùng Vanilla JS thuần, không jQuery/React
