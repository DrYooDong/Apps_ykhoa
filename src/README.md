# CliniPortal 2.0 — Cấu Trúc Mã Nguồn & Kiến Trúc TypeScript (`src/`)

> **Master Architecture Guide**: Tài liệu tổng quan kiến trúc tầng mã nguồn TypeScript, bộ điều hướng SPA, nạp nội dung động và các phân hệ lâm sàng của **CliniPortal**.

---

## 🏛️ 1. Tổng Quan Kiến Trúc `src/`

Thư mục `src/` là hạt nhân mã nguồn hiện đại của CliniPortal, được xây dựng theo kiến trúc **Modular TypeScript + Vanilla Web Standards (No Heavy Frameworks)**. Hệ thống kết hợp cơ chế nạp nội dung theo định hướng Markdown (**Markdown-Driven Content**), bảng điều khiển Bento Grid hiện đại, cùng các công cụ hỗ trợ quyết định lâm sàng (CDSS) chạy trực tiếp trên trình duyệt.

```text
src/
├── assets/                    # Kho tài nguyên dùng chung (Images, Icons, Fonts)
├── components/                # Web Components & UI UI Shell (Header, Footer, Sidebar, Navigation)
├── content/                   # Kho tri thức y khoa & dữ liệu phân hệ (Markdown & JSON)
│   ├── docspace/              # Không gian số cá nhân của Bác sĩ (SOAP, SBAR, AI RAG, Living Protocols)
│   ├── ebm/                   # Y học chứng cứ (Kho Guidelines, RCTs, Thống kê y học, EBM Lab)
│   └── pathophysiology/       # Sinh lý - Sinh lý bệnh (Hóa sinh 7 Khối, Sinh lý cơ quan, CCBS, Simulators)
├── core/                      # Core Engines trung tâm (Router, Content Loader, Markdown Parser, Search)
├── dashboard/                 # Bento Grid Dashboard & Widget sinh hiệu, điều hướng phân hệ
├── data/                      # Dữ liệu hằng số, danh mục ICD-10, dược thư, cấu hình hệ thống
├── effects/                   # Hiệu ứng chuyển động, Canvas y học, Visual micro-animations
├── knowledge/                 # Cơ sở tri thức chuẩn hóa, Wiki hạt nhân y khoa
├── simulators/                # Bộ mô phỏng sinh lý & huyết động học tương tác (Canvas / SVG)
├── styles/                    # Master CSS Stylesheets, Design Tokens, Dark Mode, Component CSS
├── tools/                     # Các bộ công cụ tính toán & tiện ích lâm sàng đa năng
├── index.ts                   # Entry Point chính của toàn bộ ứng dụng SPA
└── router.ts                  # Bộ định tuyến Hash-based SPA Router
```

---

## ⚙️ 2. Các Động Cơ Cốt Lõi (`src/core/`)

| Động cơ (Engine) | Tệp tin | Chức năng & Nhiệm vụ |
|---|---|---|
| **Markdown Core Engine** | `src/core/markdown-engine.ts` | Biên dịch Markdown (`.md`) sang HTML chuẩn Semantic, tự động trích xuất Mục lục (TOC), xử lý các khối Alert (`[!NOTE]`, `[!TIP]`, `[!WARNING]`, `[!IMPORTANT]`) và Custom Blocks (`:::clinical-pearl`, `:::formula-card`, `:::physio-steps`). |
| **Content Loader** | `src/core/content-loader.ts` | Nạp động dữ liệu bài viết `.md`, tệp `.html` và danh mục `index.json`, quản lý bộ nhớ đệm (Cache) và fallback thông minh. |
| **Router SPA** | `src/core/router.ts` & `src/router.ts` | Điều hướng không tải lại trang qua Hash-based URL (`#/ebm`, `#/pathophysiology`, `#/docspace`, `#/guidelines`), kích hoạt View tương ứng. |
| **Category Mapper** | `src/core/category-mapper.ts` | Ánh xạ và chuẩn hóa tên danh mục, icon, màu sắc đại diện cho 7 phân hệ y khoa. |
| **Search Engine** | `src/core/search-engine.ts` & `src/core/smart-search.ts` | Tìm kiếm toàn văn thời gian thực (Full-text & Fuzzy Search) trên toàn bộ kho bài học, guideline và máy tính y khoa. |
| **App State** | `src/core/app-state.ts` | Quản lý trạng thái toàn cục (Theme Dark/Light, Active Profile, Bookmarks, Lịch sử xem). |
| **Navigation Tabs** | `src/core/navigation-tabs.ts` | Quản lý hệ thống Tab điều hướng đa nhiệm và Quick Nav bar. |

---

## 🗂️ 3. Phân Hệ Nội Dung & Tri Thức (`src/content/`)

1. **`ebm/` (Evidence-Based Medicine & Guidelines)**:
   - Kho hơn 60+ bài tóm tắt Guideline quốc tế (ESC, ADA, GINA, GOLD, KDIGO, SSC) và Bộ Y Tế Việt Nam.
   - 12 Chuyên đề Thống kê Y học Lâm sàng tương tác (P-value, NNT, Forest Plot, Survival Analysis...).
   - Công cụ phân tích chất lượng tạp chí tự động (OpenAlex Live API, Journal Trust Scorer, Beall's List Blacklist).
2. **`pathophysiology/` (Sinh lý & Sinh lý bệnh)**:
   - **Hóa sinh Y học (Biochemistry)**: 7 Khối chuyên đề với 31 bài học chuẩn hóa sâu về cơ chế phân tử, enzym, chuyển hóa và biện luận cận lâm sàng.
   - **Sinh lý học Cơ quan**: 9 phần đại cương và hệ cơ quan với đồ thị tương tác.
   - **Sinh lý bệnh & Cơ chế bệnh sinh (CCBS)**: Các ca bệnh sinh lý bệnh lâm sàng kinh điển (ACS, AKI, Sốc, Hen, Suy tim, Xơ gan...).
   - **Simulators**: Bộ mô phỏng điện thế hoạt động (Nernst/Goldman), chu chuyển tim (Wiggers), phân tích khí máu (ABG).
3. **`docspace/` (Không gian Bác sĩ)**:
   - Bệnh án điện tử cá nhân: SOAP Digital, SBAR Handover, Checklist tua trực OnCall, Sổ tay phác đồ cá nhân.
   - Trợ lý AI lâm sàng: Multi-Provider LLM Engine (Gemini, Groq, OpenRouter, Ollama), Local RAG Engine, Living Protocols.

---

## 🎨 4. Giao Diện & Design System (`src/styles/`)

Hệ thống tuân thủ nghiêm ngặt **CliniPortal Design System**:
- **Design Tokens**: 100% sử dụng biến CSS (`var(--color-primary)`, `var(--color-surface)`, `var(--color-bg)`, `var(--color-text)`...).
- **Dark Mode**: Hỗ trợ toàn diện qua thuộc tính `data-theme="dark"`, chuyển đổi tức thì và bảo vệ mắt khi trực đêm.
- **Bento Grid**: Kiến trúc giao diện chia ô thẻ đa năng (Bento Grid) kết hợp đồ họa SVG phẳng và hiệu ứng Glassmorphism tinh tế.
- **Responsive Mobile-First**: Tối ưu hoàn hảo cho mọi kích thước màn hình từ điện thoại di động (width $\le$ 375px) đến màn hình máy trạm y tế.

---

## 🚀 5. Hướng Dẫn Phát Triển & Vận Hành

### Chạy Môi Trường Phát Triển Cục Bộ
```bash
npm run dev
```
Truy cập máy chủ Vite tại `http://localhost:5173`.

### Thêm Bài Viết / Nội Dung Mới
1. Tạo tệp `.md` mới trong thư mục phân hệ tương ứng (`src/content/<category>/...`).
2. Khai báo đầy đủ Frontmatter YAML ở đầu tệp (title, tags, category, difficulty...).
3. Đăng ký tệp vào danh mục `index.json` của phân hệ để kích hoạt tự động trên giao diện Hub.
