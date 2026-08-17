# 🩺 CliniPortal 2.0 — Hệ Sinh Thái Web Y Khoa & Công Cụ Lâm Sàng Offline-First

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Desktop%20%7C%20Android%20%7C%20PWA-emerald.svg)]()
[![Stack](https://img.shields.io/badge/Stack-Pure%20HTML5%2FCSS3%20%7C%20Modular%20TypeScript%20%7C%20Vite-sky.svg)]()
[![Offline First](https://img.shields.io/badge/Offline--First-100%25-amber.svg)]()
[![EBM Standards](https://img.shields.io/badge/Standards-EBM%20%7C%20GRADE%20%7C%20HL7%20FHIR%20R4-purple.svg)]()

> **CliniPortal** là hệ sinh thái web y khoa đa nền tảng được xây dựng theo tiêu chí **Offline-First**, hoạt động mượt mà qua giao thức `file:///` hoặc web app không cần Internet. Phục vụ tra cứu máy tính lâm sàng, phác đồ điều trị, kỹ năng khám bệnh, dược lý học, sinh lý - sinh lý bệnh phân tử và y học chứng cứ dành cho Bác sĩ, Bác sĩ nội trú và Sinh viên y khoa.

---

## 🌟 1. Các Phân Hệ & Tính Năng Cốt Lõi

- ⚡ **Offline-First 100%**: Hoạt động hoàn toàn độc lập không cần Internet. Tối ưu tốc độ tải tức thì (0ms latency) trên máy tính trạm bệnh viện và thiết bị di động.
- 🧮 **Bộ Công Cụ Lâm Sàng (Clinical Calculators & CDSS)**: Hơn 30+ máy tính y khoa chuyên sâu (eGFR CKD-EPI 2021, CHA₂DS₂-VASc, HAS-BLED, Phân tích khí máu ABG 6 bước, Thang điểm Child-Pugh, MELD-Na, CURB-65).
- 📚 **Y Học Chứng Cứ & Kho Guidelines (EBM Hub)**: Tổng hợp hơn 60+ khuyến cáo điều trị (ESC, ADA, GINA, GOLD, KDIGO, SSC, IDSA, Bộ Y Tế), tích hợp ma trận đối sánh nghiên cứu (Multi-Compare Matrix), đồ thị Forest Plot thuần SVG, và bộ phân tích độ tin cậy tạp chí y văn (OpenAlex Live API & Beall's List).
- 📊 **Thống Kê Y Học Lâm Sàng (Medical Statistics Suite)**: 12 chuyên đề thực chiến ($P$-value, NNT, ARR/RRR, Odds Ratio, Phân tích sống còn Kaplan-Meier/Cox, Propensity Score Matching, Xử lý dữ liệu khuyết MICE).
- 🧬 **Kho Hóa Sinh Y Học Phân Tử (Biochemistry 7 Blocks - 31 Lessons)**: Hệ thống 31 chuyên đề bài giảng chuyên sâu từ Cấu trúc phân tử, Động học Enzym, Năng lượng sinh học/Krebs, Chuyển hóa trung gian đến Biện luận hóa sinh lâm sàng (Bilan gan, thận, tim mạch, nội tiết, ung thư).
- 🫀 **Sinh Lý Bệnh Lâm Sàng (Pathophysiology Cases - CCBS)**: Phân tích cơ chế bệnh sinh chi tiết cho 17+ ca bệnh kinh điển (ACS, Sốc, AKI, CKD, Suy tim, Hen phế quản, COPD, Xơ gan, ĐTĐ...).
- 🎮 **Bộ Mô Phỏng Sinh Lý Tương Tác (Interactive Simulators)**: Mô phỏng điện thế màng Nernst/Goldman, Đồ thị chu chuyển tim Wiggers, Giải thuật toan kiềm Stewart, Động học mao mạch Starling.
- 👨‍⚕️ **Không Gian Số Bác Sĩ (DocSpace)**: Sổ tay bệnh phòng SOAP Digital, Bàn giao trực SBAR, Checklist OnCall, Trợ lý AI lâm sàng (Multi-Provider LLM Engine: Gemini, Groq, OpenRouter, Ollama) và tương thích chuẩn y tế **HL7 FHIR R4**.
- 🌗 **Giao Diện Bento Grid & Dark Mode**: Thiết kế hiện đại chuẩn y khoa, bảo vệ mắt khi trực đêm qua cơ chế CSS Tokens tự động.

---

## 🗂️ 2. Cấu Trúc Mã Nguồn & Thư Mục Dự Án

```text
Apps_ykhoa/
├── index.html                   # Trang chủ ứng dụng CliniPortal SPA
├── manifest.json                # Cấu hình Web App Manifest (PWA)
├── sw.js                        # Service Worker hỗ trợ Offline Caching
├── capacitor.config.json        # Cấu hình Capacitor Native Mobile App
├── vite.config.js               # Cấu hình Vite Build System & Path Aliasing (@/)
├── package.json                 # Cấu hình Dependencies & Build Scripts
├── tsconfig.json                # Cấu hình TypeScript Compiler
├── README.md                    # Tài liệu giới thiệu tổng quan hệ thống này
│
├── src/                         # 🚀 TẦNG MÃ NGUỒN CHÍNH (Vite + TypeScript Modular)
│   ├── assets/                  # Kho tài nguyên dùng chung (Icons SVG y tế, Images, Fonts)
│   ├── components/              # Web Components UI Shell (Header, Footer, Sidebar, Navigation)
│   ├── content/                 # 🏥 KHO NỘI DUNG Y KHOA (Markdown-Driven Content)
│   │   ├── docspace/            # Không gian số Bác sĩ (SOAP, SBAR, OnCall, AI Hub, FHIR)
│   │   ├── ebm/                 # Y học chứng cứ (Kho Guidelines, Thống kê y học, EBM Lab)
│   │   └── pathophysiology/     # Sinh lý & SLB (Hóa sinh 7 Blocks, Sinh lý cơ quan, CCBS, Simulators)
│   ├── core/                    # Core Engines (Router, Markdown Engine, Content Loader, Search)
│   ├── dashboard/               # Bento Grid Dashboard & Widget sinh hiệu
│   ├── data/                    # Dynamic Data Registry (ICD-10, Drug Catalog, Categories)
│   ├── effects/                 # Hiệu ứng chuyển động Canvas y học
│   ├── knowledge/               # Cơ sở tri thức chuẩn hóa
│   ├── simulators/              # Bộ mô phỏng sinh lý & toan kiềm tương tác
│   ├── styles/                  # Design Tokens, Dark Mode, Component CSS
│   ├── tools/                   # Bộ công cụ lâm sàng đa năng
│   ├── index.ts                 # Source Entry Point
│   └── router.ts                # Hash-based SPA Router
│
├── knowledge-vault/             # 📓 OBSIDIAN KNOWLEDGE VAULT (Kho tri thức Markdown bổ trợ)
├── templates/                   # Boilerplate HTML mẫu cho các bài viết mới
├── docs/                        # Tài liệu hệ thống & Quy chuẩn phát triển (FILE_MAP, ARCHITECTURE)
├── desktop/                     # Electron Desktop Wrapper (launch-desktop.cmd)
└── mobile/                      # Mobile Build Scripts (setup-capacitor.cmd)
```

---

## 💻 3. Hướng Dẫn Cài Đặt & Khởi Chạy

### Cách 1: Khởi Chạy Môi Trường Phát Triển Web (Vite + TypeScript)
```bash
# Cài đặt dependencies
npm install

# Khởi chạy local dev server
npm run dev
```
Truy cập ứng dụng tại `http://localhost:5173`.

### Cách 2: Đóng Gói Bản Build Production
```bash
npm run build
```
Toàn bộ mã nguồn TypeScript và tài nguyên tĩnh sẽ được biên dịch và đóng gói tối ưu vào thư mục `dist/`.

### Cách 3: Chạy Ứng Dụng Desktop Độc Lập (Electron Windows App)
- **Phương án 1-Click**: Nhấp đúp chuột vào file **`desktop/launch-desktop.cmd`**.
- **Phương án Command Line**:
  ```bash
  npm start
  ```

### Cách 4: Biên Dịch Ứng Dụng Android (Capacitor)
- **Phương án 1-Click**: Nhấp đúp chuột vào file **`mobile/setup-capacitor.cmd`**.
- **Phương án Command Line**:
  ```bash
  npm run cap:sync
  cd android
  ./gradlew assembleDebug
  ```
  File APK cài đặt nằm tại: `android/app/build/outputs/apk/debug/app-debug.apk`.

---

## 🎨 4. Quy Chuẩn Thiết Kế & Design System

Hệ thống tuân thủ nghiêm ngặt **CliniPortal Design Tokens** trong `src/styles/`:

```css
/* Color Tokens */
--color-primary: #0284c7;       /* Xanh chủ đạo */
--color-surface: #ffffff;       /* Nền card (Tự động đổi theo Dark Mode) */
--color-bg: #f8fafc;            /* Nền trang (Tự động đổi theo Dark Mode) */
--color-text: #0f172a;          /* Màu chữ chính */
--color-text-muted: #64748b;    /* Màu chữ phụ */
--color-border: #e2e8f0;        /* Đường viền */

/* Status Tokens */
--color-success: #10b981;       /* Xanh lá */
--color-warning: #f59e0b;       /* Vàng cam */
--color-danger: #ef4444;        /* Đỏ cảnh báo */
--color-info: #06b6d4;          /* Xanh ngọc */
```

---

## 📄 Giấy Phép & Đóng Góp

Dự án được nghiên cứu và phát triển bởi **CliniPortal Team** vì mục đích nâng cao chất lượng thực hành lâm sàng và đào tạo y khoa.

---
*Mọi tài liệu chi tiết về kiến trúc và quy chuẩn phát triển, vui lòng tham khảo thư mục [`docs/`](file:///d:/Apps_ykhoa/docs).*
