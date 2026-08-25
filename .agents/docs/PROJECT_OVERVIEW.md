# CliniPortal — Tổng quan Hệ thống

> **CliniPortal** là một hệ sinh thái web y khoa tĩnh (pure HTML/CSS/JS), không framework, chạy hoàn toàn offline qua giao thức `file:///`. Mục tiêu: cung cấp công cụ lâm sàng, kiến thức sinh lý bệnh, kỹ năng và lưu đồ tiếp cận cho sinh viên y khoa và bác sĩ.

---

## 🏗️ Kiến trúc Tổng thể

```
Apps_ykhoa/                  ← Root thư mục dự án
├── index.html               ← Trang chủ SPA Container
├── knowledge-vault/         ← Obsidian Knowledge Vault (.md - 2479 files)
├── src/                     ← Toàn bộ mã nguồn & style (Vite + TypeScript SPA Engine)
│   ├── assets/              ← Icons, Fonts, Media
│   ├── components/          ← Web Components UI (Header, Footer, Sidebar, Modals)
│   ├── content/             ← Nội dung Y khoa (Basic Medical, DocSpace, EBM, Vault Hub)
│   ├── core/                ← Router, Markdown Engine, Category Mapper, Search Engine
│   ├── dashboard/           ← Homepage Bento Widgets & Effects
│   ├── data/                ← Danh mục ánh xạ (categories.json, search index)
│   ├── effects/             ← Hiệu ứng chuyển động Canvas y học
│   ├── knowledge/           ← Evidence Bridge
│   ├── simulators/          ← Bộ mô phỏng sinh lý & toan kiềm
│   ├── styles/              ← Design Tokens & Modular CSS (106 components CSS, reset, main)
│   └── tools/               ← Bộ công cụ lâm sàng đa năng
├── assets/                  ← Tài nguyên media dùng chung (images, icons, fonts, svg)
├── platforms/               ← Electron Desktop Runner (platforms/desktop/)
├── tools/                   ← Bộ công cụ phát triển & bảo trì
│   ├── scripts/             ← Build & Catalog Compiler scripts
│   ├── templates/           ← HTML/SVG Starter Boilerplates
│   └── scratch/             # Scripts audit, chẩn đoán, test tạm thời
├── archive/                 ← Kho lưu trữ bản sao lưu, demos cũ, mã nguồn legacy
└── docs/                    ← Tài liệu kiến trúc & quy trình dự án
```

---

## 🧱 Cơ chế Layout Dùng chung

CliniPortal dùng **dynamic layout injection** — không có server-side rendering. Mỗi trang tự load header/footer bằng JavaScript `fetch()`:

```html
<!-- Header placeholder (đầu body) -->
<div id="header-placeholder" data-header-path="[path]/components/header.html"></div>

<!-- Footer placeholder (cuối body) -->
<div id="footer-placeholder" data-footer-path="[path]/components/footer.html"></div>

<!-- Scripts -->
<script src="[path]/js/main.js" defer></script>
<script src="[path]/components/header.js" defer></script>
<script src="[path]/components/footer.js" defer></script>
```

---

## 🎨 Design System

| Token | Giá trị | Ý nghĩa |
|-------|---------|---------|
| `--color-primary` | `#0284c7` | Xanh dương y tế |
| `--color-surface` | `#ffffff` (light) / `#1e293b` (dark) | Nền card |
| `--color-bg` | `#f8fafc` (light) / `#0f172a` (dark) | Nền trang |
| `--text-sm` → `--text-4xl` | 0.875rem → 2.25rem | Thang typography |
| `--radius-sm` → `--radius-full` | 4px → 9999px | Bo góc |
| `--shadow-sm` → `--shadow-xl` | — | Đổ bóng |

Dark mode: toggle `data-theme="dark"` trên thẻ `<html>`. Lưu vào `localStorage`.

---

## 📐 Quy tắc Đường dẫn Tương đối (Critical)

| Cấp thư mục file | Prefix về root | Ví dụ |
|------------------|---------------|-------|
| Root (index.html) | `./` | `./css/main.css` |
| Cấp 1 (pages/xxx.html) | `../` | `../css/main.css` |
| Cấp 2 (pages/Module/xxx.html) | `../../` | `../../css/main.css` |
| Cấp 3 (pages/Module/Sub/xxx.html) | `../../../` | `../../../css/main.css` |
| Cấp 4 (pages/Module/Sub/Sub2/xxx.html) | `../../../../` | `../../../../css/main.css` |

> ⚠️ **Lỗi thường gặp**: Sinh lý học nằm ở cấp 4 (`pages/Sinh lý - Sinh lý bệnh/Sinhly/PhanX/`) nhưng có thêm tài nguyên riêng ở `../../css/physio-shared.css` và `../../js/physio-shared.js`.

---

## 🗂️ Phân hệ Nội dung (6 Modules)

| Module | Thư mục | Hub HTML | JS chính | CSS chính |
|--------|---------|----------|---------|-----------|
| **Công cụ** | `pages/Công cụ/` | `cong-cu.html` | `main.js` | `main.css` + tool-specific |
| **Dược lý** | `pages/Dược lý/` | `duoc-ly.html` | `pharmacology-symptoms.js` | `pharmacology-symptoms.css` |
| **Kỹ năng** | `pages/Kỹ năng/` | `ky-nang.html` | `clinical-skill-tabs.js` | `clinical-skill.css` |
| **Sinh lý** | `pages/Sinh lý - Sinh lý bệnh/` | `Sinhly-sinhlybenh.html` | `physio-patho.js`, `toc.js` | `physio-patho.css`, `physio-shared.css` |
| **Tiếp cận** | `pages/Tiếp cận/` | `tiep-can.html` | `flowchart.js`, `approach-hub.js` | `flowchart.css`, `approach-hub.css` |
| **EBM** | `pages/Y học chứng cứ/` | `yhcc.html` | `main.js` | `main.css` |
| **YHCT** | `pages/Y học cổ truyền/` | `y-hoc-co-truyen.html` | `main.js` | `y-hoc-co-truyen.css` |

---

## 🔧 Nguyên tắc Phát triển

1. **Vanilla JS ES6+** — Không jQuery, không framework
2. **CSS Variables** — Luôn dùng `var(--token)`, không hardcode màu
3. **Responsive-first** — Mobile trước, rồi `@media (min-width: 768px)`
4. **Offline-first** — Tất cả path phải hoạt động với `file:///`
5. **BEM-like naming** — Tiền tố theo module: `.flow-`, `.fnode-`, `.physio-`, `.calc-`

---

## 📎 Tài liệu Tham khảo Nhanh

| Tài liệu | Vị trí |
|----------|--------|
| Kiến trúc tổng | file này (`.agents/docs/PROJECT_OVERVIEW.md`) |
| Bản đồ file | `.agents/docs/FILE_MAP.md` |
| CSS guide | `css/README.md` |
| Design-to-Code guide | `.agents/docs/DESIGN_TO_CODE.md` |
| JS guide | `js/README.md` |
| Pages guide | `pages/README.md` |
| Assets guide | `assets/README.md` |
| Flowchart design guide | `pages/Tiếp cận/HUONG_DAN_THIET_KE.md` |
| Công cụ design guide | `pages/Công cụ/HUONG_DAN_THIET_KE.md` |
| Sinh lý design guide | `pages/Sinh lý - Sinh lý bệnh/Sinhly/HUONG_DAN_THIET_KE.md` |
| AI Skills | `.agents/skills/` |
