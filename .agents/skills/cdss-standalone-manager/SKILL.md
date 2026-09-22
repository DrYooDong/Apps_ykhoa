---
name: cdss-standalone-manager
description: >
  Kỹ năng quản lý, kiểm tra, audit và giám sát vòng đời các web CDSS độc lập (Standalone CDSS Web Modules)
  trong hệ sinh thái CliniPortal DocSpace. Kích hoạt khi cần: tra cứu danh mục CDSS, kiểm tra tính toàn vẹn
  kết nối giữa Hub và các module con, kiểm tra chế độ chạy offline file:/// và GitHub Pages, rà soát registry
  (cdss-registry.ts), hoặc bảo trì các module CDSS (Dengue, ECG, ABG, RadAI X-Ray, Hepa, Neuro, Microbio, Antibiotic).
---

# CDSS Standalone Manager Skill

Kỹ năng này chịu trách nhiệm quản lý, điều phối và bảo trì toàn bộ các ứng dụng Hỗ trợ Quyết định Lâm sàng độc lập (**Standalone CDSS Web Modules**) hoạt động trong thư mục `src/content/docspace/public/cdss/`.

---

## 🏛️ 1. Bản Đồ Hệ Sinh Thái CDSS Standalone

Mỗi module CDSS độc lập có thể được xây dựng bằng Vanilla TypeScript/HTML5 hoặc React/Vite, nhưng **bắt buộc** phải tuân thủ chuẩn tích hợp CliniPortal DocSpace:

| ID Module | Slug / Thư mục | Chuyên khoa | Kiến trúc | File Khởi Chạy |
|---|---|---|---|---|
| `cdss-dengue-fluid` | `dengue/` | Truyền nhiễm | Vanilla TS + State Controller | `dengue/index.html` |
| `cdss-ecg-analysis` | `ecg/` | Tim mạch | React 19 / Canvas 2D + IIFE Fallback | `ecg/index.html` |
| `cdss-abg-pro` | `abg/` | Hô hấp & Cấp cứu | React 19 + IIFE Fallback | `abg/index.html` |
| `cdss-radai-xray` | `xray/` | Chẩn đoán hình ảnh | Vanilla TS + Canvas PACS Controller | `xray/index.html` |
| `cdss-hepa-biochem` | `hepa/` | Tiêu hóa & Gan mật | React 19 Pre-built Bundle | `hepa/index.html` |
| `cdss-neuro-exam` | `neuro/` | Thần kinh & Đột quỵ | React 19 Pre-built Bundle | `neuro/index.html` |
| `cdss-microbiology-mahon` | `microbio/` | Truyền nhiễm & Vi sinh | React 19 + IIFE Fallback | `microbio/index.html` |
| `cdss-antibiotic-dosing` | `antibiotic/` | Dược lý & Kháng sinh | React 19 + Tailwind v4 + IIFE Fallback | `antibiotic/index.html` |
| `cdss-vancomycin-pk` | `vancomycin/` | Dược lý & Kháng sinh | React 19 + Tailwind v4 + IIFE Fallback | `vancomycin/index.html` |

---

## 🔍 2. Quy Trình Kiểm Tra & Audit Toàn Diện (CDSS Health Audit)

Khi nhận lệnh kiểm tra hoặc audit hệ thống CDSS, AI Agent thực hiện tuần tự 5 bước sau:

### Bước 1: Kiểm Tra Toàn Vẹn Thẻ HTML & Navigation Shell
Mọi file `index.html` của CDSS con bắt buộc phải tích hợp:
- CSS Shell chuẩn: `<link rel="stylesheet" href="../shared/cdss-shell.css">`
- Script Shell chuẩn: `<script src="../shared/cdss-shell.js"></script>`
- Thẻ `<header class="cdss-portal-navbar">` chứa đủ 3 liên kết: Knowledge Vault, Kho CDSS, Tên Module hiện tại, cùng các nút thao tác DocSpace Pro, Danh Mục CDSS, và Nút Theme Toggle.
- Chạy lệnh kiểm tra tính toàn vẹn thẻ:
  ```bash
  node tools/scratch/check_tags.js src/content/docspace/public/cdss/<module>/index.html
  ```

### Bước 2: Đồng Bộ Trạng Thái Theme (Dark/Light Mode)
- Đảm bảo biến `data-theme` được đồng bộ qua `localStorage.getItem('cliniportal_theme')`.
- Khi chuyển đổi theme trên header, toàn bộ background, panel, bảng biểu, canvas hoặc biểu đồ của module phải tự thích ứng (không bị vỡ chữ trắng trên nền trắng hoặc ngược lại).

### Bước 3: Khả Năng Vận Hành Offline (`file:///`) & GitHub Pages
- Tuyệt đối không dùng đường dẫn tuyệt đối bắt đầu bằng `/` trong mã nguồn frontend (phải dùng `./` hoặc relative path).
- Đối với các module React, nếu ES modules bị trình duyệt chặn ở chế độ `file:///`, phải cung cấp script fallback nạp bundle IIFE dự phòng.

### Bước 4: Đăng Ký Module Vào Registry Trung Tâm (`cdss-registry.ts`)
- Mọi module mới hoặc sửa đổi metadata phải cập nhật `CDSS_MODULES` trong `src/content/docspace/public/cdss/cdss-registry.ts`.
- Các trường bắt buộc: `id`, `slug`, `title`, `titleEn`, `shortDesc`, `category`, `categoryName`, `version`, `updatedAt`, `author`, `guidelineSource`, `icd10`, `icon`, `badge`, `isStandalone`, `standaloneUrl`.

### Bước 5: Re-bundle CDSS Hub
- Sau khi cập nhật registry, thực hiện build lại file bundle của Hub:
  ```bash
  npx esbuild src/content/docspace/public/cdss/index.ts --bundle --outfile=src/content/docspace/public/cdss/cdss-hub-bundle.js --format=iife
  ```
- Mở `src/content/docspace/public/cdss/index.html` kiểm tra số lượng module hiển thị trên Hub grid.
