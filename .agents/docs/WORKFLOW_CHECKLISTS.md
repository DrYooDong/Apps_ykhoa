# WORKFLOW CHECKLISTS — CliniPortal Ecosystem

> **Mục đích**: Tài liệu này tập hợp các danh sách kiểm tra (Checklists) tiêu chuẩn cho 4 quy trình làm việc phổ biến nhất trong hệ sinh thái CliniPortal. Mọi lập trình viên và AI Assistant phải thực hiện lần lượt từng bước trước khi hoàn tất công việc.

---

## 📋 Checklist A: Tạo Trang HTML Mới (New Page Workflow)

Dùng khi tạo bất kỳ trang HTML mới nào (trang tóm tắt guideline, phác đồ bệnh lý, công cụ lâm sàng, bài đọc sinh lý...).

- [ ] **1. Đặt tên file đúng chuẩn ASCII kebab-case**:
  - Ví dụ: `2026-kdigo-ckd.html`, `dg-abg.html` (chỉ dùng chữ thường, số, dấu gạch ngang `-`, không dấu tiếng Việt, không khoảng trắng).
- [ ] **2. Phân tích cấp thư mục & tính prefix đường dẫn tương đối**:
  - Root: `./`
  - Cấp 1 (`pages/module.html`): `../`
  - Cấp 2 (`pages/module/page.html`): `../../`
  - Cấp 3 (`pages/module/sub/page.html`): `../../../`
  - Cấp 4 (`src/content/ebm/guidelines/kho-guidelines/file.html`): `../../../../`
- [ ] **3. Copy Boilerplate HTML tiêu chuẩn**:
  - Dùng đúng thẻ `<!DOCTYPE html>`, `<html lang="vi" data-theme="light">`.
- [ ] **4. Nạp thứ tự CSS chuẩn xác**:
  - 1: `reset.css`
  - 2: `main.css`
  - 3: `components/header.css`, `sidebar.css`, `footer.css`
  - 4: Custom CSS riêng của trang (nếu có).
- [ ] **5. Cấu hình Dynamic Layout Injection**:
  - Khai báo `<div id="header-placeholder" data-header-path="[PREFIX]components/header.html"></div>`
  - Khai báo `<div id="footer-placeholder" data-footer-path="[PREFIX]components/footer.html"></div>`
- [ ] **6. Nạp thứ tự JS với thuộc tính `defer`**:
  - `main.js` → `header.js` → `footer.js` → JS riêng của trang.
- [ ] **7. Tối ưu SEO Meta Data**:
  - Đặt `<title>[Tên Trang Chi Tiết] – CliniPortal</title>`
  - Khai báo `<meta name="description" content="[Mô tả y khoa súc tích 150-160 ký tự]">`
- [ ] **8. Chạy script kiểm tra tính toàn vẹn thẻ HTML**:
  ```bash
  node tools/tools/scratch/check_tags.js path/to/file.html
  ```
- [ ] **9. Đăng ký Registry tương ứng**:
  - Thêm vào `guidelinesdata.js` (nếu là Guideline EBM).
  - Thêm vào `benh-ly.js` (nếu là Bệnh lý).
  - Thêm vào menu `cong-cu.html` (nếu là Máy tính lâm sàng).
- [ ] **10. Cập nhật `.agents/docs/FILE_MAP.md`**: Thêm vị trí file mới vào sơ đồ cây thư mục.
- [ ] **11. Kiểm tra hiển thị giao diện**:
  - Test Dark Mode (`data-theme="dark"`).
  - Test Responsive trên màn hình di động ($\le 375px$).

---

## 🎨 Checklist B: Chỉnh Sửa CSS/JS Core (Core Refactoring Workflow)

Dùng khi tác động vào các file dùng chung toàn hệ thống như `css/main.css`, `css/reset.css`, `js/main.js`, `js/clinical-engine.js`...

- [ ] **1. Đánh giá bán kính ảnh hưởng qua Đồ thị Phụ thuộc Graphify**:
  ```bash
  node tools/tools/scratch/query_graph.js <filename>
  ```
  - Nếu kết quả là `HIGH RISK` hoặc `CRITICAL HUB`, không sửa đổi trực tiếp khi chưa khoanh vùng phạm vi.
- [ ] **2. Tuân thủ nguyên tắc Bảo tồn CSS Variables (Design Tokens)**:
  - Chỉ thêm biến mới, KHÔNG xóa hoặc đổi tên các biến `--color-*` hiện có.
  - Tuyệt đối không hardcode màu hex (`#0284c7`) trực tiếp vào selector.
- [ ] **3. Tránh phá vỡ CSS Specificity**:
  - Không lạm dụng `!important`.
  - Không sửa selector toàn cục như `div`, `p`, `a` trong CSS module.
- [ ] **4. Kiểm thử khả năng tương thích Dark Mode**:
  - Mở giao diện ở cả 2 chế độ `data-theme="light"` và `data-theme="dark"`.
  - Đảm bảo độ tương phản màu chữ / màu nền đạt chuẩn WCAG 2.1 AA (tối thiểu 4.5:1).
- [ ] **5. Kiểm thử tác động trên 5 trang mẫu ở các phân hệ khác nhau**:
  - Trang chủ (`index.html`)
  - Guideline EBM (`src/content/ebm/guidelines/guidelines.html`)
  - Bệnh lý (`pages/Tiếp cận/4. Bệnh lý/benh-ly.html`)
  - Sinh lý (`pages/Sinh lý - Sinh lý bệnh/Sinhly-sinhlybenh.html`)
  - Công cụ (`pages/Công cụ/cong-cu.html`)

---

## 🩺 Checklist C: Sáng Tác & Biên Tập Nội Dung Y Khoa (Medical Content Workflow)

Dùng khi viết hoặc biên tập bài đọc lâm sàng, tóm tắt khuyến cáo, phác đồ điều trị.

- [ ] **1. Trích dẫn nguồn chứng cứ chính xác**:
  - Ghi rõ tên tổ chức phát hành (ACC/AHA, ESC, NICE, KDIGO, GINA, GOLD, Bộ Y tế Việt Nam...).
  - Ghi rõ năm phát hành hoặc trích dẫn PMID / DOI.
- [ ] **2. Gợi mở mức độ bằng chứng & Phân loại khuyến cáo**:
  - Ghi rõ **Class I / IIa / IIb / III** và **Level of Evidence A / B / C**.
  - Ví dụ: *(Khuyến cáo Class I, LoE A)*.
- [ ] **3. Làm nổi bật các Cảnh báo An toàn & Chống chỉ định**:
  - Dùng thẻ Infobox màu đỏ (`.infobox.danger`) cho tình huống chống chỉ định, độc tính khẩn cấp.
  - Dùng thẻ Infobox màu cam (`.infobox.warning`) cho lưu ý chỉnh liều suy thận/suy gan.
- [ ] **4. Loại bỏ văn phong AI (Medical Humanizer Audit)**:
  - Không dùng các cụm từ sáo rỗng: *"Trong bối cảnh y học hiện đại...", "Bài viết này sẽ cung cấp cái nhìn toàn diện..."*.
  - Đi thẳng vào thực hành lâm sàng súc tích, câu ngắn, tập trung vào hành động bác sĩ cần làm.
- [ ] **5. Chuẩn hóa thuật ngữ & Định dạng Liều dùng**:
  - Dùng tên gốc thuốc (Generic name) kèm liều lượng, đường dùng, tần suất cụ thể.
  - Ví dụ: *Apixaban 10 mg uống 2 lần/ngày x 7 ngày, sau đó 5 mg uống 2 lần/ngày*.
- [ ] **6. Định dạng bảng biểu & Lưu đồ trực quan**:
  - Không để đoạn văn quá 5 dòng mà không có ngắt dòng hoặc bullet points.
  - Sử dụng bảng so sánh (`.regimen-table` hoặc `.comparison-card-grid`) khi phân biệt 2 thẻ bệnh hoặc 2 phác đồ.

---

## 🔍 Checklist D: Kiểm Thử QA & Sửa Lỗi (Debugging & QA Workflow)

Dùng trước khi commit hoặc hoàn tất bất kỳ bài tập / tính năng nào.

- [ ] **1. Kiểm tra Console Error**:
  - Mở F12 DevTools Console → Không có lỗi đỏ (RefError, SyntaxError, 404 Not Found).
- [ ] **2. Kiểm tra Dynamic Injection Header / Footer**:
  - Mở tab Network → `components/header.html` và `footer.html` trả về HTTP 200/OK.
- [ ] **3. Kiểm tra tính hoạt động của đường dẫn tương đối (Links Audit)**:
  - Bấm thử các nút quay lại (`.topnav-back`), breadcrumbs, sidebar navigation.
  - Đảm bảo không bị lỗi `file:///` 404 file not found.
- [ ] **4. Kiểm tra Responsive Layout**:
  - Mở Responsive Mode ở 3 mốc kích thước:
    - Mobile Small: 375px (iPhone SE)
    - Tablet: 768px (iPad)
    - Desktop: 1280px+
  - Đảm bảo không bị tràn khung ngang (Horizontal scrollbar ngoài ý muốn).
- [ ] **5. Kiểm tra Tương tác Giao diện**:
  - Toggle Dark Mode → Kiểm tra text màu sáng trên nền tối rõ ràng.
  - Thử mở/đóng Sidebar trên Mobile overlay.
  - Thử tra cứu ô Search / Filter (nếu trang có tính năng tra cứu).
- [ ] **6. Chạy Kiểm Tra Tổng Thể Dự Án**:
  - Chạy `node tools/tools/scratch/check_tags.js` cho toàn bộ file HTML mới sửa.

---

## 🗂️ Checklist E: Kho Tiêu Chuẩn & Bảng Kiểm Front-End Toàn Diện (Front-End Quality Treasury)

> **Kho tra cứu độc lập**: Đối chiếu chi tiết 7 Section theo tiêu chuẩn quốc tế [thedaviddias/Front-End-Checklist](https://github.com/thedaviddias/Front-End-Checklist) đã được Việt hóa và tối ưu riêng cho CliniPortal tại **[.agents/docs/FRONTEND_CHECKLIST_VAULT.md](file:///d:/Apps_ykhoa/.agents/docs/FRONTEND_CHECKLIST_VAULT.md)**.

- [ ] **1. Head & Meta Data**: Doctype, `lang="vi"`, Viewport, Title độc nhất, Meta description, Open Graph images.
- [ ] **2. HTML Semantic & Accessibility**: HTML5 tags, 1 thẻ `<h1>`, ARIA roles, Tab key navigation.
- [ ] **3. CSS & Design System**: Biến CSS `var(--color-...)`, 0 hardcode hex `#0284c7`, Dark Mode, Touch target $\ge 44 \times 44\text{px}$.
- [ ] **4. JS & DOM Performance**: `defer` attribute, Pure Vanilla JS, clean `console.log`, safe dereferencing `el?.`.
- [ ] **5. Media & Assets**: `alt="..."` cho 100% ảnh, explicit `width/height`, WebP/SVG, `loading="lazy"`.
- [ ] **6. Security & Performance**: `rel="noopener noreferrer"`, Core Web Vitals (LCP < 2.5s, CLS < 0.1).
- [ ] **7. CliniPortal Medical**: Relative paths audit (`./`, `../`, `../../`, `../../../`, `../../../../`), Dynamic Header/Footer injection, EBM Citations, Registry synchronization (`FILE_MAP.md`).

---

## ⚡ Checklist F: Chuyển Đổi Bài Giảng Sang MDX Native (MDX Migration Workflow)

Dùng khi chuyển đổi các phân hệ bài giảng HTML tĩnh sang kiến trúc **TypeScript + MDX Native** tốc độ cao.

- [ ] **1. Trích xuất Metadata & Cấu trúc Header**:
  - Tiêu đề H1, mô tả tóm tắt, mã code bài giảng, phân hệ và các chương sách tham khảo Guyton/Ganong.
- [ ] **2. Tạo Frontmatter YAML Chuẩn Typecheck**:
  - Khai báo đầy đủ các trường: `title`, `slug`, `code`, `part`, `system`, `guytonChapter`, `clinicalPearls`, `sections`.
- [ ] **3. Chuyển đổi Khung Nội dung & Linh kiện JSX**:
  - Dùng thẻ linh kiện `<PhysioAlert>`, `<PhysioQuickNav>`, `<PhysioFeedbackLoop>`.
  - Encode các ký tự đặc biệt trong text props (`&` $\rightarrow$ `và` hoặc `&amp;`).
  - Bọc công thức Toán trong MathJax `$ ... $` hoặc `$$ ... $$`.
- [ ] **4. Dọn dẹp File HTML Cũ**:
  - Xóa file `.html` cùng tên ngay sau khi hoàn tất file `.mdx`.
- [ ] **5. Kiểm thử TypeScript Compile**:
  - Chạy `npm run typecheck` $\rightarrow$ Đạt chuẩn 0 lỗi type.

---

## 🎨 Checklist G: Quy Trình Điều Phối Design Squad (Design Agent Squad Workflow)

Dùng khi tiếp nhận bất kỳ yêu cầu thiết kế giao diện, bento layout, motion animation, tạo component mới hoặc audit UI/UX.

- [ ] **1. Đăng ký Tác vụ vào Kanban Board (`DESIGN_SQUAD_KANBAN.md`)**:
  - Ghi rõ ID, Title, Scope tệp tin, đưa vào cột `Backlog`.
- [ ] **2. Phân Tích & Soạn Thảo Design Contract (Agent-01 Strategist)**:
  - Áp dụng `stop-making-ui-slop` để loại bỏ dữ liệu giả, layout rập khuôn.
  - Định rõ Job-to-be-done, phân tầng thị giác và danh mục component được phép dùng.
  - Chuyển thẻ sang `Ready`.
- [ ] **3. Hiện Thực Hóa Giao Diện (Agent-02 Implementation + Agent-04 Domain)**:
  - 100% dùng Design Tokens (`var(--color-...)`), không hardcode mã màu.
  - Kỹ thuật chuyển động: `scale(0.97)` on active, `scale(0.95)` on enter, thời lượng $< 300\text{ms}$, custom easing curve (`cubic-bezier`).
  - Sơ đồ/lưu đồ dùng Pure Inline SVG (`flowchart-module`, `medical-editorial-diagram`).
  - Chuyển thẻ sang `Running`.
- [ ] **4. Kiểm Định Chất Lượng & Merge Gate (Agent-03 Auditor)**:
  - [ ] Độ tương phản WCAG 2.1/2.2 AA ($\ge 4.5:1$).
  - [ ] Dark Mode kiểm thử hoàn hảo (`data-theme="dark"`).
  - [ ] Mobile 375px không vỡ khung, Touch target $\ge 44\text{px}$.
  - [ ] `node tools/scratch/check_tags.js` 0 lỗi thẻ đóng/mở.
  - Chuyển thẻ sang `Review`.
- [ ] **5. Hoàn Tất & Tích Hợp (Merge Gate Pass)**:
  - Cập nhật `docs/FILE_MAP.md`.
  - Chuyển thẻ sang `Merged` trong `DESIGN_SQUAD_KANBAN.md`.


