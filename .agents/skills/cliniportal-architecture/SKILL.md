---
name: cliniportal-architecture
description: >
  Hiểu và làm việc với kiến trúc tổng thể của CliniPortal — hệ sinh thái web y khoa
  tĩnh (pure HTML/CSS/JS). Kích hoạt khi AI cần: tạo trang mới, sửa layout, thêm
  CSS/JS, cấu hình đường dẫn, hoặc làm bất kỳ tác vụ nào trong project CliniPortal.
---

# CliniPortal Architecture & Knowledge Graph Skill

## 📌 Project Identity & Core Paradigm

- **Tên**: CliniPortal — Hệ sinh thái Web Y khoa Tĩnh
- **Loại**: Static web app — pure HTML/CSS/JS, NO framework, NO build tools
- **Giao thức**: Chạy qua `file:///` (offline) hoặc web server cục bộ
- **Thư mục gốc**: `d:\Apps_ykhoa\` (hoặc `i:\Drive của tôi\apps\Apps_ykhoa\`)
- **Tài liệu tổng**: `docs/PROJECT_OVERVIEW.md`, `docs/FILE_MAP.md`
- **Đồ thị Mã nguồn**: `graphify-out/` (Knowledge Graph Index với 3,444 nodes & 6,068 edges)

---

## 🔍 Tích hợp Đồ thị Mã nguồn (`graphify-out`) & Tra cứu Nhanh (Fast Task Understanding)

Để tăng tốc độ hiểu công việc và không phải quét thủ công hàng trăm file, AI phải áp dụng quy trình tra cứu Đồ thị Kiến trúc mã nguồn qua `graphify-out`:

### 1. Công cụ Tra cứu Đồ thị CLI (`scratch/query_graph.js`)
Khi bắt đầu một tác vụ liên quan đến module hoặc file JS/HTML bất kỳ, hãy chạy lệnh:
```bash
node scratch/query_graph.js <tên_file_hoặc_hàm>
```
**Kết quả thu được**:
- **Inbound Dependencies (Fan-in)**: Số lượng file/hàm đang gọi hoặc phụ thuộc vào file này.
- **Outbound Dependencies (Fan-out)**: Các thư viện/hàm mà file này sử dụng.
- **Cấp độ Rủi ro (Risk Assessment)**: `LOW`, `MEDIUM`, `HIGH RISK`, hoặc `CRITICAL HUB`.

### 2. Danh mục Hub Modules Cốt lõi (High-Fan-in Centrality)
Dựa trên kết quả phân tích Graphify, các file sau đây có chỉ số liên kết cực cao, **mọi thay đổi trên chúng đều phải được kiểm thử tác động dây chuyền (side-effects)**:

| Hub Module | Vị trí | Tác dụng | Chỉ số Fan-in | Cấp độ Rủi ro |
|------------|--------|----------|---------------|---------------|
| `main.js` | `js/main.js` | Controller toàn app, quản lý theme, sidebar, modal, routing | >500 | **CRITICAL HUB** |
| `guidelines.js` | `pages/Y học chứng cứ/Guidelines/Guidelines.js` | Engine xử lý dữ liệu khuyến cáo lâm sàng & Supabase | 570 | **CRITICAL HUB** |
| `benh-ly.js` | `pages/Tiếp cận/4. Bệnh lý/benh-ly.js` | Engine hiển thị Ma trận & Phác đồ Bệnh lý | >200 | **CRITICAL HUB** |
| `clinical-engine.js` | `js/clinical-engine.js` | Engine tính toán lâm sàng chung cho phân hệ Công cụ | >150 | **HIGH RISK** |
| `physio-components.js` | `pages/Sinh lý.../js/components/physio-components.js` | Web Component render bài giảng sinh lý bệnh | >120 | **HIGH RISK** |
| `tracuu-icd10.js` | `js/tracuu-icd10.js` | Tra cứu mã ICD-10 toàn hệ thống | >100 | **HIGH RISK** |
| `abg-studio.js` | `js/abg-studio/abg-studio.js` | Studio phân tích khí máu động mạch | >80 | **HIGH RISK** |

---

## 🏗️ Cấu trúc Thư mục Gốc & Phân vùng

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
├── graphify-out/            # Knowledge Graph Analysis (graph.json, GRAPH_REPORT.md)
├── scratch/                 # Tooling tự động (query_graph.js, check_tags.js)
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

### Typography & Spacing
```css
var(--text-xs)   /* 0.75rem */
var(--text-sm)   /* 0.875rem */
var(--text-base) /* 1rem */
var(--text-lg)   /* 1.125rem */
var(--text-xl)   /* 1.25rem */
var(--text-2xl)  /* 1.5rem */
var(--text-3xl)  /* 1.875rem */
```

### Dark Mode
Toggle `data-theme="dark"` trên `<html>`. JavaScript tự lưu vào `localStorage`.

---

## 📐 CRITICAL: Quy tắc Đường dẫn Tương đối

Đếm số cấp thư mục từ file đến root để tính prefix chính xác:

| Vị trí file | Prefix |
|-------------|--------|
| `index.html` (root) | `./` hoặc không cần |
| `pages/Module.html` (cấp 1) | `../` |
| `pages/Module/page.html` (cấp 2) | `../../` |
| `pages/Module/Sub/page.html` (cấp 3) | `../../../` |
| `pages/Module/Sub/Sub2/page.html` (cấp 4) | `../../../../` |

### Ví dụ cho file ở cấp 3 (`pages/Công cụ/Thận/DG_ABG.html`):
```html
<link rel="stylesheet" href="../../../css/reset.css">
<link rel="stylesheet" href="../../../css/main.css">
<link rel="stylesheet" href="../../../css/components/header.css">
<script src="../../../js/main.js" defer></script>
<script src="../../../components/header.js" defer></script>
```

---

## 🧱 Layout HTML Chuẩn (Boilerplate)

Mọi trang nội dung đều tuân thủ cấu trúc khung chuẩn:

```html
<!DOCTYPE html>
<html lang="vi" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[Mô tả trang]">
  <title>[Tên trang] – CliniPortal</title>

  <!-- Google Fonts & FontAwesome -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">

  <!-- CSS Core (thay [PATH] theo cấp thư mục) -->
  <link rel="stylesheet" href="[PATH]/css/reset.css">
  <link rel="stylesheet" href="[PATH]/css/main.css">
  <link rel="stylesheet" href="[PATH]/css/components/header.css">
  <link rel="stylesheet" href="[PATH]/css/components/sidebar.css">
  <link rel="stylesheet" href="[PATH]/css/components/footer.css">
</head>
<body>
  <div id="header-placeholder" data-header-path="[PATH]/components/header.html"></div>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>

  <div class="app-container">
    <aside class="app-sidebar" id="appSidebar">
      <!-- Sidebar nav của phân hệ -->
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
| EBM | `pages/Y học chứng cứ/yhcc.html` | `guideline-summary-module` |
| Bệnh lý | `pages/Tiếp cận/4. Bệnh lý/` | `pathology-approach-module` |

---

## ⚠️ Quy tắc Giảm thiểu Rủi ro (Risk Mitigation Rules)

1. **Trước khi sửa bất kỳ file JS/CSS nào**: Chạy `node scratch/query_graph.js <filename>` để xem đồ thị phụ thuộc. Nếu Rủi ro là `HIGH RISK` hoặc `CRITICAL HUB`, phải tạo plan và khoanh vùng tác động.
2. **Sai đường dẫn tương đối**: Đếm lại số cấp thư mục và dùng đúng prefix `../`.
3. **Hardcode màu**: Luôn dùng `var(--color-primary)` hoặc tokens sẵn có.
4. **Bảo tồn HTML Integrity**: Chạy `node scratch/check_tags.js <file.html>` trước và sau khi chỉnh sửa HTML.

