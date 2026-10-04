# 📚 EBM Guidelines Hub — Standalone Project

> **Dự án Độc Lập**: Trung Tâm Tra Cứu, Đối Chiếu Y Học Chứng Cứ, Phân Tích Thử Nghiệm Lâm Sàng & Thẩm Định Hướng Dẫn Điều Trị Y Khoa.  
> **Kiến trúc**: TypeScript Modular + Vanilla CSS3 + Vector SVG Engine, 100% Offline-First.

---

## 🏛️ 1. Giới Thiệu Dự Án

**EBM Guidelines Hub** là một phân hệ web y khoa chuyên sâu được đóng gói thành một dự án độc lập hoàn chỉnh, cho phép phát triển, nâng cấp, kiểm thử và triển khai riêng biệt mà không phụ thuộc vào hệ sinh thái cha.

### ✨ Các Phân Hệ & Tính Năng Trọng Tâm:
1. **Kho Guidelines & Nghiên Cứu Lâm Sàng (`guidelines.html`)**:
   - Quản lý **161+ Thử nghiệm lâm sàng trọng điểm (Landmark Trials)** và Hướng dẫn điều trị chuẩn từ Bộ Y tế Việt Nam, Hội Tim mạch VN, ESC, AHA/ACC, ADA, GINA, GOLD, KDIGO, SSC, IDSA.
   - **Đối chiếu Đa chiều (Multi-Compare 3D Matrix)**: Chọn đồng thời nhiều nghiên cứu để so sánh song song các tiêu chí can thiệp, đối tượng, hiệu quả và độ an toàn.
   - **Hỗ trợ Quyết định Lâm sàng (CDSS Dosing Matcher)**: Phân tích ca bệnh cụ thể (tuổi, giới, eGFR, tiền sử bệnh) để tự động đối chiếu liều khuyến cáo và chống chỉ định.
   - **Đồ họa SVG Tương Tác**: Vẽ biểu đồ **Forest Plot SVG** và **Bubble Evidence Map** trực tiếp trên trình duyệt, không dùng thư viện ngoài.
   - **Command Palette (`Ctrl + K`)**: Tra cứu phím tắt siêu tốc cho bác sĩ lâm sàng.
2. **Bộ Thẩm Định Tạp Chí & Y Văn (`journal-quality-analyzer.html`)**:
   - Tra cứu trực tiếp cơ sở dữ liệu **OpenAlex REST API** với chỉ số trích dẫn, H-Index, Scimago Quartile (Q1 - Q4).
   - Thuật toán **Journal Trust Score (0-100)** lượng giá độ uy tín tạp chí.
   - Bộ lọc phát hiện **Tạp chí săn mồi / Biến tướng (Predatory Journals)** dựa trên danh sách Beall's List.
3. **Guideline Radar (`guideline-radar/radar.html`)**:
   - Trạm theo dõi và đối chiếu trực quan những thay đổi thực hành lâm sàng (**Practice-Changing Updates**) giữa các ấn bản khuyến cáo cũ và mới.
4. **Trình Đọc Toàn Văn MDX Guidelines (`index.html#/reader/<slug>`)**:
   - Kho **117+ bài viết tóm tắt chi tiết** chuẩn Astro MDX Native, tích hợp Mục lục thông minh (TOC), tự động scale cỡ chữ, Dark Mode, in ấn PDF và xuất SOAP Note.

---

## 📂 2. Cấu Trúc Thư Mục Dự Án

```text
archive/ebm-guidelines/
├── index.html                           # Cổng thông tin Master Portal & Trình đọc MDX SPA
├── guidelines.html                      # Giao diện chính Kho Guidelines & Nghiên cứu EBM
├── journal-quality-analyzer.html        # Giao diện Thẩm định Tạp chí & Trust Score
├── guidelines.css                       # Master CSS entry point
├── package.json                         # Khai báo cấu hình dự án độc lập (Vite + TypeScript)
├── tsconfig.json                        # Cấu hình TypeScript độc lập
├── vite.config.ts                       # Cấu hình bundling đa trang (Multi-page app)
├── README.md                            # Tài liệu hướng dẫn này
│
├── js/                                  # Mã nguồn TypeScript & Controllers
│   ├── index.ts                         # Master exports
│   ├── guidelines.ts                    # Controller khởi động DOM & sự kiện
│   ├── guidelinesdata.ts                # Dữ liệu chuyên khoa, tạp chí, điều kiện lâm sàng
│   ├── kho-guidelines-registry.ts       # 161+ Metadata Guidelines tĩnh chuẩn hóa
│   ├── guidelines-types.ts              # Định nghĩa Interface & TypeScript Types
│   ├── guideline-table.ts               # Render bảng, thẻ compact & bộ lọc
│   ├── guideline-sync.ts                # Bộ nhớ LocalStorage & Khử trùng lặp
│   ├── guideline-visualizations.ts      # Biểu đồ Bento Grid, Evidence Map SVG
│   ├── guideline-charts-engine.ts       # Máy sinh biểu đồ Forest Plot SVG
│   ├── guideline-cdss.ts                # CDSS Dosing Matcher theo chức năng thận
│   ├── guideline-compare-matrix.ts      # Ma trận so sánh 3D đa nghiên cứu
│   ├── guideline-cmd-palette.ts         # Command Palette (Ctrl+K)
│   ├── guideline-modals.ts              # Hộp thoại Thêm/Sửa & Quản lý ICD-10
│   ├── openalex-service.ts              # Dịch vụ tra cứu OpenAlex API
│   ├── journal-trust-scorer.ts          # Bộ tính điểm Journal Trust Score
│   ├── journal-quality-analyzer.ts      # Controller phân tích chất lượng tạp chí
│   ├── ebm-format-loader.ts             # Bộ nạp đa định dạng MD, JSON, CSV
│   │
│   ├── core/                            # Thư viện lõi nội bộ (Standalone Cores)
│   │   ├── cliniportal-sync.js          # Bộ phát sự kiện đồng bộ cục bộ
│   │   ├── theme-manager.ts             # Quản lý Dark / Light Mode
│   │   ├── clinical-intent.ts           # Event Bus lâm sàng
│   │   ├── mdx-engine.ts                # Parser chuyển đổi MDX sang HTML chuẩn hóa
│   │   └── flowchart-viewer.ts          # Hydration hỗ trợ sơ đồ trực quan
│   │
│   └── shared/                          # Dữ liệu & Types dùng chung
│       ├── types.ts                     # EBM Guideline Types
│       ├── renderer.ts                  # Badge Renderers & Metric Helpers
│       └── data.ts                      # Cơ sở dữ liệu tạp chí & chuyên khoa
│
├── css/                                 # Hệ thống Modular CSS Vanilla
│   ├── guidelines-base.css              # Design Tokens, Dark Mode, Shell Layout
│   ├── guidelines-components.css        # Search Bar, Pills, Badges, Dropdowns
│   ├── guidelines-table.css             # Bảng dữ liệu, Cards, Forest Plot SVG
│   ├── guidelines-modals.css            # Hộp thoại CDSS, Ma trận So sánh 3D
│   ├── guidelines-analytics.css         # Phân tích NNT & Thống kê
│   ├── guidelines-dashboard.css         # Bento Grid Styles
│   ├── guidelines-timeline.css          # Dòng thời gian nghiên cứu
│   ├── journal-quality.css              # Giao diện Thẩm định tạp chí
│   ├── ebm-design-tokens.css            # Biến màu Design Tokens y tế
│   └── non-intrusive-ui.css             # Giao diện y tế công thái học
│
├── data/                                # Cơ sở dữ liệu JSON & TypeScript
│   ├── guidelines-db.json               # CSDL JSON dự phòng
│   ├── conditions-db.json               # CSDL bệnh lý & mã ICD-10
│   ├── predatory-blacklist.ts           # Danh sách đen Beall's List tạp chí rủi ro
│   └── icd10-data.js                    # Từ điển mã bệnh ICD-10
│
├── kho-guidelines/                      # 117+ Bài viết Tóm tắt Hướng dẫn Điều trị (.mdx)
│   ├── 2026-ada-diabetes.mdx
│   ├── 2026-esc-heart-failure-p1.mdx
│   ├── 2026-ssc-sepsis.mdx
│   ├── 2024-byt-sot-xuat-huyet-dengue.mdx
│   ├── ... (117+ tệp mdx khác)
│   └── images/                          # Hình ảnh y khoa, sơ đồ cơ chế đính kèm
│
├── guideline-radar/                     # Phân hệ Guideline Radar Diff Viewer
│   ├── radar.html                       # Giao diện Radar
│   ├── radar.css                        # CSS Radar
│   └── radar.ts                         # Controller phân tích diff
│
└── tools/                               # 12 Công cụ kiểm định & QA tự động
    ├── verify_all_guidelines_mdx.js     # Kiểm tra toàn vẹn 117+ file MDX
    ├── deep_check_guidelines_mdx.js     # Audit chi tiết cấu trúc MDX
    ├── audit_tables.js                  # Audit cú pháp bảng Markdown
    └── standardize_guidelines_mdx.js    # Chuẩn hóa định dạng
```

---

## 🚀 3. Hướng Dẫn Cài Đặt & Phát Triển

### Bước 1: Mở thư mục dự án
```bash
cd "archive/ebm-guidelines"
```

### Bước 2: Cài đặt dependencies (Vite + TypeScript)
```bash
npm install
```

### Bước 3: Chạy môi trường phát triển (Dev Server)
```bash
npm run dev
```
Trình duyệt sẽ tự động mở tại địa chỉ: `http://localhost:5173/`

### Bước 4: Kiểm tra tính toàn vẹn dữ liệu
```bash
npm run verify:mdx
```

### Bước 5: Đóng gói bản phát hành (Production Build)
```bash
npm run build
```
Bản dựng tĩnh sẵn sàng triển khai sẽ được tạo tại thư mục `dist/`.

---

## 🏥 4. Triển Khai Ngoại Tuyến (100% Offline-First)

Dự án được thiết kế theo nguyên lý **Zero-Dependency Runtime**:
- **Không cần Node.js lúc chạy**: Bạn có thể copy toàn bộ thư mục này vào USB hoặc máy tính bệnh viện.
- **Mở trực tiếp qua trình duyệt**: Nhấp đúp vào `index.html` hoặc `guidelines.html` là ứng dụng sẽ chạy ngay lập tức với đầy đủ tính năng tra cứu, so sánh ma trận 3D, CDSS Matcher và xem biểu đồ Forest Plot.

---

## 📝 5. Quy Trình Nạp Thêm Guideline Mới

1. **Thêm Metadata**: Mở `js/kho-guidelines-registry.ts` và thêm bản ghi mới vào mảng `KHO_GUIDELINES_STATIC`.
2. **Tạo Bài Viết Chi Tiết**: Tạo tệp `<slug>.mdx` trong thư mục `kho-guidelines/` theo cấu trúc chuẩn:
   - Frontmatter YAML (title, organization, year, specialty, impact...)
   - Tóm tắt PICO (Population, Intervention, Comparator, Outcomes)
   - Bảng khuyến cáo then chốt & Phân độ bằng chứng (GRADE)
   - Lưu đồ tiếp cận lâm sàng
3. **Chạy Kiểm Định**:
   ```bash
   node tools/verify_all_guidelines_mdx.js
   ```

---

## 📄 6. Giấy Phép & Bản Quyền

Dự án thuộc sở hữu của hệ sinh thái **CliniPortal**. Bản đóng gói độc lập dùng cho mục đích nghiên cứu, học tập và hỗ trợ thực hành y khoa dựa trên bằng chứng (EBM).
