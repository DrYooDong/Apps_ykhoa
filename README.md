# 🩺 CliniPortal — Hệ Sinh Thái Web Y Khoa & Công Cụ Lâm Sàng Offline-First

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Electron%20%7C%20Android-emerald.svg)]()
[![Stack](https://img.shields.io/badge/Stack-Pure%20HTML%2FCSS%2FJS%20%7C%20Vite%20%7C%20TypeScript-sky.svg)]()
[![Offline First](https://img.shields.io/badge/Offline--First-100%25-amber.svg)]()

> **CliniPortal** là hệ sinh thái web y khoa đa nền tảng được xây dựng theo tiêu chí **Offline-First**, hoạt động mượt mà qua giao thức `file:///` hoặc web app không cần Internet. Phục vụ tra cứu công cụ lâm sàng, kỹ năng khám bệnh, phác đồ tiếp cận, dược lý và sinh lý bệnh dành cho bác sĩ, y sĩ và sinh viên y khoa.

---

## 🌟 Tính Năng Nổi Bật

- ⚡ **Offline-First 100%**: Độc lập hoàn toàn với máy chủ từ xa. Chạy trực tiếp từ file tĩnh trên máy tính hoặc di động.
- 🧮 **Bộ Công Cụ Lâm Sàng (Clinical Calculators)**: Tính toán nhanh các chỉ số ABG, eGFR, GCS, CHADS2-VASc, phỏng đoán liều và phác đồ điều trị động.
- 🔀 **Lưu Đồ Tiếp Cận Tương Tác (Vector Flowcharts)**: Sơ đồ chẩn đoán & xử trí cấp cứu trực quan, tương tác node & vector SVG.
- 💊 **Dược Lý & Phác Đồ Thuốc**: Tra cứu dược lý theo triệu chứng lâm sàng, chuyên khoa và liều dùng chuẩn.
- 🩺 **Kỹ Năng Lâm Sàng (OSCE & Bedside)**: Quy trình thực hành kỹ năng lâm sàng, đọc kết quả ECG, CXR và cận lâm sàng.
- 🧬 **Sinh Lý & Sinh Lý Bệnh**: Bài đọc sinh lý học trực quan, tự động tạo mục lục động (TOC) và minh họa chuyên sâu.
- 📚 **Y Học Chứng Cứ (EBM Guidelines) & YHCT**: Tóm tắt khuyến cáo y khoa mới nhất và kiến thức Y học cổ truyền.
- 📓 **Obsidian Knowledge Vault Integration**: Đồng bộ và hiển thị bài viết Markdown (`.md`) trực tiếp từ Obsidian Vault.
- 🌗 **Giao Diện Hiện Đại & Dark Mode**: Tự động chuyển đổi Light/Dark Mode tối ưu trải nghiệm đọc ban đêm.
- 📱 **Đa Nền Tảng (Cross-Platform)**: Chạy trên Web Browser, Windows Desktop App (Electron) và Android Mobile App (Capacitor / PWA).

---

## 🗂️ Cấu Trúc Thư Mục Dự Án (ASCII Kebab-case & Unified Source)

```
Apps_ykhoa/
├── index.html               # Trang chủ hệ thống CliniPortal
├── manifest.json            # Cấu hình Web App Manifest (PWA)
├── sw.js                    # Service Worker hỗ trợ Offline Caching
├── capacitor.config.json    # Cấu hình Capacitor Mobile App
<<<<<<< HEAD
├── package.json             # Cấu hình Npm / Vite / Electron / Capacitor
├── assets/                  # Tài nguyên tĩnh (Fonts, Images, Icons, Lottie)
├── components/              # Shared Layout (Header, Footer, Navigation)
├── css/                     # Reset CSS, Design System Tokens (main.css) & Module CSS
├── js/                      # Logic điều hướng, Engine đồng bộ & Calculators
├── templates/               # Boilerplate HTML mẫu cho lập trình viên
├── src/                     # Mã nguồn & Phân hệ nội dung Y khoa chính:
│   ├── components/          # UI Components & Application Views
│   ├── core/                # Clinical Engine, Search & Content Loaders
│   ├── styles/              # Core Stylesheets
│   └── content/             # Phân hệ nội dung Y khoa chính:
│       ├── calculators/     # Máy tính & Chỉ số lâm sàng
│       ├── pharmacology/    # Tra cứu thuốc & Phác đồ điều trị
│       ├── skills/          # Kỹ năng lâm sàng & Đọc cận lâm sàng
│       ├── pathophysiology/ # Bài đọc Sinh lý học & Sinh lý bệnh
│       ├── approaches/      # Lưu đồ & Thuật toán chẩn đoán
│       ├── ebm/             # Guidelines & Evidence-Based Medicine
│       └── tcm/             # Kiến thức Y học cổ truyền
├── archive/                  # Lưu trữ file nén (pages_backup.zip)
├── desktop/                 # Script & Electron Main Process (Laptop App)
│   ├── launch-desktop.cmd
│   └── main-electron.js
├── mobile/                  # Script & Hướng dẫn Đóng gói Mobile (Android/iOS)
│   ├── setup-capacitor.cmd
│   └── build-android-instructions.md
└── docs/                    # Tài liệu hệ thống & Kiến trúc phần mềm
=======
├── vite.config.js           # Cấu hình Vite Build System & Path Aliasing (@/)
├── package.json             # Cấu hình NPM Dependencies & Build Scripts
├── tsconfig.json            # Cấu hình TypeScript compiler
│
├── knowledge-vault/         # 📓 OBSIDIAN KNOWLEDGE VAULT (Kho tri thức Markdown tập trung)
│   ├── .obsidian/           # Cấu hình Obsidian
│   ├── 0. Kỹ năng/          # Ghi chú kỹ năng lâm sàng (.md)
│   ├── 0. Sinh lý học/      # Ghi chú sinh lý bệnh (.md)
│   ├── 1. Bệnh truyền nhiễm/# Chuyên khoa Truyền nhiễm (.md)
│   ├── 2. Hồi sức/          # Chuyên khoa Hồi sức cấp cứu (.md)
│   └── ...                  # Các chuyên khoa ngoại, sản, nhi, EBM...
│
├── src/                     # 🚀 CANONICAL SOURCE CODE (Vite + TypeScript Modular)
│   ├── assets/              # Tài nguyên tĩnh nguồn (Images, Fonts, Icons)
│   ├── components/          # Reusable UI Components (Header, Sidebar, Reader)
│   ├── content/             # 🏥 7 PHÂN HỆ NỘI DUNG Y KHOA (ASCII KEBAB-CASE 100%)
│   │   ├── calculators/     # Máy tính & Chỉ số lâm sàng (cardiology, renal...)
│   │   ├── pharmacology/    # Tra cứu thuốc & Phác đồ điều trị (specialties...)
│   │   ├── pathophysiology/ # Bài đọc Sinh lý - Sinh lý bệnh (physiology...)
│   │   ├── skills/          # Kỹ năng lâm sàng & Đọc cận lâm sàng (can-lam-sang...)
│   │   ├── approaches/      # Lưu đồ & Thuật toán chẩn đoán (vector flows...)
│   │   ├── ebm/             # Y học chứng cứ & Guidelines (guidelines...)
│   │   └── tcm/             # Y học cổ truyền (theory-ngu-hanh, herbs...)
│   ├── core/                # Core engines (Router, Markdown Engine, Category Mapper)
│   ├── styles/              # CSS Modular & Design System Tokens (main.css)
│   └── index.ts             # Source entry point
│
├── content/                 # 📄 BACKWARD-COMPATIBLE CONTENT ROOT (.md, .json)
├── data/                    # Dynamic Data Mapping (categories.json - map ASCII slug sang Tiếng Việt)
├── templates/               # Boilerplate HTML mẫu cho phát triển trang mới
├── docs/                    # Tài liệu hệ thống, kiến trúc & hướng dẫn phát triển
├── desktop/                 # Electron Desktop Wrapper (launch-desktop.cmd, main-electron.js)
└── mobile/                  # Mobile Build Scripts (setup-capacitor.cmd, build-www.js)
>>>>>>> 118f471dfcbd10fbe0d37531863cff5d8bfb2edb
```

---

## ⚡ Các Điểm Cải Tiến Kiến Trúc Quan Trọng

### 1. Chuẩn Hóa Naming ASCII Kebab-Case Cho Nội Dung (`src/content/`)
- Toàn bộ 7 phân hệ nội dung được tổ chức dưới `src/content/` bằng tên thư mục **ASCII Kebab-case thuần túy** (không khoảng trắng, không dấu Tiếng Việt):
  - `src/content/calculators/` (Công cụ)
  - `src/content/pharmacology/` (Dược lý)
  - `src/content/pathophysiology/` (Sinh lý - Sinh lý bệnh)
  - `src/content/skills/` (Kỹ năng)
  - `src/content/approaches/` (Tiếp cận)
  - `src/content/ebm/` (Y học chứng cứ)
  - `src/content/tcm/` (Y học cổ truyền)
- **Lợi ích**: Triệt tiêu hoàn toàn rủi ro mã hóa URL `%C3%B4ng%20c%E1%BB%A5`, lỗi 404 File Not Found và lỗi phân biệt hoa/thường trên Android (Linux kernel), iOS và Electron.
- **Hiển thị Tiếng Việt**: Tên tiếng Việt hiển thị trên giao diện người dùng được điều khiển động bởi `data/categories.json` và `src/core/category-mapper.ts`.

### 2. Hợp Nhất Nguồn Mã Nguồn Về Thư Mục `src/`
- Thư mục **`src/`** là trung tâm mã nguồn phát triển chính của dự án (Modular TypeScript, Modern CSS & Component Engine).
- Các thư mục tĩnh cấp root (`js/`, `css/`, `components/`) được giữ vai trò **Backward-Compatible Fallback** phục vụ trường hợp mở trực tiếp từng trang HTML riêng lẻ không qua Vite server.

### 3. Tối Ưu Đường Dẫn Mạch Lạc & Path Aliases (`@/`)
- Nhằm khắc phục độ phức tạp của việc đếm cấp đường dẫn tương đối thủ công (`../../../../`), dự án thiết lập **Vite Path Aliasing** và **TypeScript `compilerOptions.paths`**:
  - `@/components` $\rightarrow$ `src/components`
  - `@/core` $\rightarrow$ `src/core`
  - `@/styles` $\rightarrow$ `src/styles`
  - `@/content` $\rightarrow$ `src/content`
- Khi build hoặc phát triển module trong `src/`, nhà phát triển import tài nguyên ngắn gọn, chính xác mà không lo bị gãy liên kết khi di chuyển file.

---

## 🖥️ 1. Hướng Dẫn Khởi Chạy Trên Desktop (Web & Laptop)

Ứng dụng hỗ trợ 2 phương thức khởi chạy trên máy tính:

### Cách 1: Trải nghiệm Trực tiếp trên Trình duyệt Web (Không cần cài đặt)

1. Tải hoặc clone thư mục dự án về máy tính.
2. Nhấp đúp chuột trực tiếp vào file **`index.html`** ở thư mục gốc để mở ứng dụng trên trình duyệt web bất kỳ.
3. *(Dành cho Developer)*: Khởi chạy môi trường phát triển siêu tốc với Vite:
   ```bash
   npm install
   npm run dev
   ```
   Ứng dụng sẽ tự động mở tại địa chỉ `http://localhost:3000`.

---

### Cách 2: Chạy Ứng Dụng Desktop Độc Lập (Electron App)

Ứng dụng được đóng gói qua Electron để chạy như một phần mềm Windows độc lập.

#### Yêu cầu Môi trường:
- **Node.js** (`v18.0.0` trở lên): Tải tại [nodejs.org](https://nodejs.org/).

#### Thao tác Khởi chạy:
- 🚀 **Phương án 1-Click (Khuyên dùng trên Windows)**: Nhấp đúp vào file **`desktop/launch-desktop.cmd`**.
- 💻 **Phương án Command Line**:
  ```bash
  npm start
  ```

---

## 📱 2. Hướng Dẫn Cài Đặt Trên Di Động (Android & iOS)

CliniPortal tích hợp **Capacitor JS** để chuyển đổi toàn bộ ứng dụng web thành ứng dụng di động bản địa (Native Mobile App).

### 🤖 Biên Dịch & Cài Đặt File APK Android

#### 🚀 Cách 1: Biên dịch bằng Script 1-Click
1. Nhấp đúp chuột vào file: **`mobile/setup-capacitor.cmd`**.
2. Script sẽ tự động đóng gói tài nguyên web sang `./www` và đồng bộ với Android Studio project tại `./android`.
3. Mở **Android Studio** $\rightarrow$ Chọn **Open** $\rightarrow$ Trỏ tới thư mục `android/`.
4. Chọn menu **Build** $\rightarrow$ **Build Bundle(s) / APK(s)** $\rightarrow$ **Build APK(s)**.
5. Lấy file `app-debug.apk` cài đặt tại: `android/app/build/outputs/apk/debug/app-debug.apk`.

#### 💻 Cách 2: Biên dịch qua Command Line
```bash
# Đồng bộ web assets & Capacitor config
npm run cap:sync

# Biên dịch APK trực tiếp bằng Gradle CLI
cd android
./gradlew assembleDebug
```

---

### 🌐 Cách 3: Chạy Dạng PWA (Progressive Web App)

1. Truy cập CliniPortal qua trình duyệt Safari (iOS) hoặc Chrome (Android).
2. Nhấp vào nút **Chia sẻ** (Safari) hoặc **Menu 3 chấm** (Chrome).
3. Chọn **Thêm vào màn hình chính** (*Add to Home Screen*).

---

## 📓 3. Tích Hợp Obsidian Knowledge Vault (`knowledge-vault`)

Thư mục **`knowledge-vault/`** là nơi quản lý tri thức y khoa tập trung tương thích 100% với **Obsidian**:

1. **Mở Vault trên Obsidian**: Trong Obsidian, chọn *Open folder as vault* $\rightarrow$ Trỏ tới thư mục `knowledge-vault/`.
2. **Cấu trúc YAML Frontmatter**: Mọi bài viết Markdown nên chứa phần thông tin đầu trang như sau:
   ```yaml
   ---
   title: "Phác Đồ Xử Trí Sốc Nhiễm Khuẩn (Sepsis-3)"
   category: "Hồi Sức Cấp Cứu"
   author: "CliniPortal Team"
   updatedDate: "26/07/2026"
   ---
   ```
3. **Hiển thị trên CliniPortal**: Engine `CliniMarkdown` (`src/core/markdown-engine.ts` / `js/utils/markdown-renderer.js`) tự động đọc YAML metadata, chuyển đổi Markdown thành giao diện HTML cao cấp có hỗ trợ:
   - 💡 **GitHub Alert Boxes** (`> [!NOTE]`, `> [!WARNING]`, `> [!IMPORTANT]`, `> [!TIP]`, `> [!CAUTION]`)
   - 📌 **Heading Slug IDs**: Tự động đánh chỉ số headings để sinh **Mục Lục Động (TOC)**.
   - 🖼️ **Medical Figures**: Tự động chuyển đổi `![caption](url)` thành thẻ `<figure>` chuẩn y khoa.
   - 📊 **Responsive Data Tables**: Tự động bọc bảng trong container cuộn ngang chống tràn màn hình.

---

## 📐 4. Quy Chuẩn Phát Triển & Design Tokens

### Design System & Theme Variables
Tất cả styling bắt buộc dùng biến CSS từ `src/styles/main.css`:
```css
/* Color Tokens */
color: var(--color-primary);       /* #0284c7 - Blue Primary */
background: var(--color-surface); /* Card Background (Light/Dark auto) */
background: var(--color-bg);      /* Page Background (Light/Dark auto) */

/* Typography & Layout Tokens */
font-size: var(--text-base);
border-radius: var(--radius-md);
box-shadow: var(--shadow-sm);
```

---

## 📋 5. Bảng Rà Soát Thư Mục & Trạng Thái Xử Lý (Workspace Audit)

| Thư mục / File | Mục đích & Trạng thái | Hành động Xử lý |
|----------------|----------------------|-----------------|
| `knowledge-vault/` | Obsidian Knowledge Vault | **Đã đổi tên** từ `Kho kiến thức` sang ASCII Kebab-case. |
| `src/content/` | Phân hệ nội dung Y khoa chính | **100% ASCII Kebab-case** (`calculators`, `pharmacology`, `pathophysiology`, `skills`, `approaches`, `ebm`, `tcm`). |
| `pages_backup/` | Thư mục backup thủ công cũ | **Đã dọn dẹp** (loại bỏ khỏi cây dự án). |
| `note.md` | Ghi chú ý tưởng kiến trúc cũ | **Đã chuyển nội dung** sang `docs/architecture-proposal.md`. |
| `www/` | Build artifacts tạm thời của Capacitor | **Đã thêm vào `.gitignore`** (sinh tự động qua script build). |
| `dist/` | Build output của Vite | **Đã thêm vào `.gitignore`** (sinh tự động khi build production). |
| `docs/` | Tài liệu kiến trúc & hướng dẫn | **Đã cập nhật đầy đủ** (`PROJECT_OVERVIEW.md`, `FILE_MAP.md`, `DESIGN_TO_CODE.md`). |

---

## 📄 Giấy Phép & Đóng Góp

Dự án được xây dựng và phát triển bởi **CliniPortal Team** phục vụ cộng đồng y khoa.

---
*Mọi thắc mắc hoặc đóng góp phát triển hệ thống, vui lòng tham khảo tài liệu chi tiết tại thư mục [`docs/`](file:///d:/Apps_ykhoa/docs).*
