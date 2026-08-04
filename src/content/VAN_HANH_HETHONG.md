# CliniPortal — Hướng Dẫn Vận Hành Module & Tính Năng Hệ Sinh Thái

> **Tài liệu Kỹ thuật & Vận hành**: Mô tả chi tiết nguyên lý hoạt động, luồng xử lý dữ liệu, cấu trúc các module và tính năng trong Hệ sinh thái Web Y khoa **CliniPortal**.

---

## 📌 1. Tổng Quan Kiến Trúc Vận Hành (Ecosystem Architecture)

CliniPortal là hệ sinh thái web y khoa tĩnh hoạt động theo cơ chế **Offline-First**, không phụ thuộc server nặng, tối ưu hóa tốc độ truy cập cho sinh viên y khoa và bác sĩ lâm sàng. Hệ thống kết hợp 2 tầng kiến trúc chính:

1. **Static Core Layer (Pure HTML/CSS/JS)**:
   - Chạy trực tiếp từ giao thức `file:///` hoặc bất kỳ web server cục bộ nào.
   - Dùng **Vanilla JavaScript ES6+**, không phụ thuộc framework frontend (React/Vue/Angular), đảm bảo độ trễ 0ms và khả năng hoạt động ngay cả khi không có Internet.
   - Quản lý giao diện đồng nhất bằng **CSS Design Tokens** và cơ chế **Dynamic Layout Injection** (Header/Footer/Sidebar).

2. **Markdown-Driven Content & TypeScript Layer (`src/`)**:
   - Quản lý toàn bộ tri thức y khoa qua dữ liệu dạng **Markdown (`.md`)** và cấu hình **JSON/TypeScript**.
   - Bộ chuyển đổi nội dung `markdown-engine.ts` và `content-loader.ts` giúp tự động biên dịch bài viết, trích xuất mục lục (TOC), gán metadata và phân loại danh mục.

```
                  +-----------------------------------+
                  |   Nguồn Dữ Liệu Y Khoa (Content)   |
                  |  Markdown (.md) / JSON / Config   |
                  +-----------------+-----------------+
                                    |
                                    v
                  +-----------------+-----------------+
                  |   Core Engine (`src/core/`)       |
                  | - markdown-engine.ts              |
                  | - content-loader.ts               |
                  | - router.ts & search-engine.ts    |
                  +-----------------+-----------------+
                                    |
            +-----------------------+-----------------------+
            |                                               |
            v                                               v
+-----------+-----------------------+   +-------------------+-------------------+
|  7 Phân Hệ Nội Dung (Pages Layer) |   | DocSpace & Clinical Studios       |
| - Công cụ Lâm sàng (Calculators)  |   | - ABG Studio (Phân tích khí máu)  |
| - Dược lý (Pharmacology)          |   | - Drug Picker (Bộ chọn thuốc)     |
| - Kỹ năng (Clinical Skills)       |   | - Case Logger (Quản lý ca bệnh)   |
| - Sinh lý - SLB (Physiology)      |   | - Workspace & Note Engine         |
| - Tiếp cận & Bệnh lý (Approaches) |   +---------------------------------------+
| - Y học chứng cứ (EBM & Guidelines)|
| - Y học cổ truyền (TCM)           |
+-----------------------------------+
```

---

## 🗂️ 2. Vận Hành Chi Tiết 7 Phân Hệ Nội Dung Y Khoa

### 2.1. Phân Hệ Công Cụ Lâm Sàng (Clinical Calculators & Decision Support)
- **Vị trí dữ liệu & mã nguồn**: `src/content/calculators/`, `pages/Công cụ/`, `js/clinical-engine.js` / `src/core/clinical-engine.ts`.
- **Cơ chế vận hành**:
  - Mỗi công cụ tính toán được cấu hình dưới dạng công thức toán-y học và bảng khoảng tham chiếu chuẩn (Biological Reference Intervals).
  - Khi người dùng nhập chỉ số (ví dụ: Tuổi, Giới, Creatinine máu, Huyết áp), `clinical-engine` thực thi tính toán thời gian thực (real-time computation).
  - Kết quả được phân loại theo thang điểm nguy cơ (Risk Stratification), đi kèm khuyến cáo lâm sàng (Clinical Actionable Recommendations).
- **Các tính năng nổi bật**: Tính mức lọc cầu thận (eGFR CKD-EPI / Cockcroft-Gault), Thang điểm HAS-BLED, CHA₂DS₂-VASc, CURB-65, APRI, FIB-4, Phân tích diện tích bề mặt cơ thể (BSA).

### 2.2. Phân Hệ Dược Lý Lâm Sàng (Pharmacology)
- **Vị trí dữ liệu & mã nguồn**: `src/content/pharmacology/`, `pages/Dược lý/`, `js/pharmacology-symptoms.js`.
- **Cơ chế vận hành**:
  - Dữ liệu thuốc tổ chức theo mô hình thẻ phân loại chuẩn (Drug Cards): Phân nhóm Dược lý, Cơ chế tác dụng (Mechanism of Action), Chỉ định, Liều dùng lâm sàng, Chống chỉ định, Tác dụng không mong muốn (ADR) và Tương tác thuốc.
  - Sử dụng engine `pharmacology-symptoms.js` cho phép tra cứu thuốc theo **Triệu chứng lâm sàng** và **Hội chứng bệnh lý**.
- **Tính năng nổi bật**: Tra cứu nhanh cơ chế thuốc cấp cứu, phác đồ phối hợp kháng sinh, bảng quy đổi liều Corticoid, cảnh báo độc tính thuốc trên gan/thận.

### 2.3. Phân Hệ Kỹ Năng Lâm Sàng & Cận Lâm Sàng (Clinical Skills)
- **Vị trí dữ liệu & mã nguồn**: `src/content/skills/`, `pages/Kỹ năng/`, `js/clinical-skill-tabs.js`.
- **Cơ chế vận hành**:
  - Chuẩn hóa nội dung theo quy trình khám lâm sàng tại giường (Bedside Examination) và các bảng kiểm OSCE (Objective Structured Clinical Examination).
  - Tích hợp các bộ công cụ phân tích kết quả cận lâm sàng theo từng bước (Step-by-step interpretation algorithms).
- **Tính năng nổi bật**: Bảng kiểm kỹ năng khám Tim mạch/Hô hấp/Thần kinh, hướng dẫn đọc X-quang ngực thẳng, đọc Điện tâm đồ (ECG) 12 chuyển đạo, quy trình chọc dò tủy sống / khí máu.

### 2.4. Phân Hệ Sinh Lý - Sinh Lý Bệnh (Physiology & Pathophysiology)
- **Vị trí dữ liệu & mã nguồn**: `src/content/pathophysiology/`, `pages/Sinh lý - Sinh lý bệnh/`, `js/components/physio-components.js`, `js/toc.js`.
- **Cơ chế vận hành**:
  - Bài viết được dựng trên hệ thống **Web Components chuyên biệt** (`<physio-concept>`, `<patho-mechanism>`), cho phép đóng gói sơ đồ cơ chế bệnh sinh.
  - Engine `toc.js` tự động quét các thẻ tiêu đề (H2, H3, H4) trong bài để dựng Mục lục Động (Interactive Dynamic Table of Contents) hỗ trợ cuộn mượt (smooth scroll) và highlight phần đang đọc.
- **Tính năng nổi bật**: Trực quan hóa điện thế hoạt động tế bào cơ tim, cơ chế điều hòa huyết áp đường dài/ngắn, sinh lý bệnh sốc, rối loạn điện giải.

### 2.5. Phân Hệ Tiếp Cận & Ma Trận Bệnh Lý (Clinical Approaches & Pathology Matrix)
- **Vị trí dữ liệu & mã nguồn**: `src/content/approaches/`, `pages/Tiếp cận/`, `js/flowchart.js`, `pages/Tiếp cận/4. Bệnh lý/benh-ly.js`.
- **Cơ chế vận hành**:
  - **Vector Flowchart Engine (`flowchart.js`)**: Render các sơ đồ thuật toán chẩn đoán nhánh rẽ (Decision Trees) bằng SVG/Vector tương tác, hỗ trợ thu phóng (zoom/pan), highlight đường đi theo quyết định lâm sàng.
  - **Pathology Matrix Engine (`benh-ly.js`)**: Hiển thị phác đồ tiếp cận bệnh lý dưới dạng **Infographic Poster Board** kết hợp Flowchart trung tâm và các Card vệ tinh (Alert Banner, Comparison Card, Dose Table, Process Ribbon, Clinical Pearls).
- **Tính năng nổi bật**: Sơ đồ tiếp cận Đau ngực cấp, Khó thở cấp, Hôn mê, Sốc nhiễm khuẩn, Ma trận chẩn đoán phân biệt bệnh lý Tiêu hóa/Tim mạch.

### 2.6. Phân Hệ Y Học Chứng Cứ (EBM & Guidelines Summary)
- **Vị trí dữ liệu & mã nguồn**: `src/content/ebm/`, `pages/Y học chứng cứ/`, `pages/Y học chứng cứ/Guidelines/Guidelines.js`.
- **Cơ chế vận hành**:
  - Engine `Guidelines.js` quản lý kho tóm tắt các khuyến cáo lâm sàng mới nhất từ các hiệp hội y khoa uy tín thế giới (ESC, AHA/ACC, GINA, GOLD, KDIGO).
  - Đồng bộ và lọc dữ liệu khuyến cáo theo Phân loại Mức độ Khuyến cáo (Class I, IIa, IIb, III) và Mức độ Chứng cứ (Level A, B, C).
  - Tích hợp bộ lưu trữ Supabase / Local Storage Cache giúp tra cứu tức thì offline.
- **Tính năng nổi bật**: Tóm tắt Guideline Nhồi máu cơ tim cấp, Suy tim, Tăng huyết áp, ĐTĐ tuýp 2, Hen phế quản, COPD.

### 2.7. Phân Hệ Y Học Cổ Truyền (TCM - Traditional Chinese Medicine)
- **Vị trí dữ liệu & mã nguồn**: `src/content/tcm/`, `pages/Y học cổ truyền/`, `css/components/y-hoc-co-truyen.css`.
- **Cơ chế vận hành**:
  - Chuẩn hóa lý luận YHCT (Tạng phủ, Bát cương, Khí huyết) kết hợp đối chiếu triệu chứng Y học hiện đại.
  - Quản lý cơ sở dữ liệu bài thuốc cổ phương và sơ đồ quy chiếu huyệt vị.
- **Tính năng nổi bật**: Biện chứng luận trị hội chứng Tạng phủ, tra cứu bài thuốc theo chứng trạng, sơ đồ đường kinh và huyệt vị nguyên/lạc.

---

## ⚡ 3. Vận Hành Các Tính Năng Cốt Lõi System & DocSpace

### 3.1. Dynamic Layout & Path Management System
- **Nguyên lý Injection**: Mọi trang HTML tĩnh trong `pages/` không lặp lại code Navigation mà sử dụng placeholder:
  ```html
  <div id="header-placeholder" data-header-path="[PATH]/components/header.html"></div>
  <div id="footer-placeholder" data-footer-path="[PATH]/components/footer.html"></div>
  ```
- **Quy tắc đường dẫn tương đối (Path Prefixing)**:
  Để đảm bảo hoạt động 100% offline trên giao thức `file:///`, file JavaScript `main.js` & `header.js` tính toán độ sâu thư mục từ vị trí file hiện tại về root theo bảng quy chiếu:
  - Cấp 0 (`index.html`): `./`
  - Cấp 1 (`pages/Module.html`): `../`
  - Cấp 2 (`pages/Module/Page.html`): `../../`
  - Cấp 3 (`pages/Module/Sub/Page.html`): `../../../`
  - Cấp 4 (`pages/Module/Sub/Sub2/Page.html`): `../../../../`

### 3.2. Design System & Dark/Light Theme Switching
- **Design Tokens**: Định nghĩa tập trung tại `css/main.css` qua CSS Custom Properties:
  - Màu chủ đạo: `--color-primary` (`#0284c7` - Xanh y tế).
  - Nền trang & Nền card: `--color-bg`, `--color-surface` (tự động đảo màu theo theme).
  - Cảnh báo y khoa: `--color-success`, `--color-warning`, `--color-danger`, `--color-info`.
- **Cơ chế Chuyển đổi Dark Mode**:
  - Gắn thuộc tính `data-theme="dark"` hoặc `data-theme="light"` trên thẻ `<html>`.
  - Nút chuyển theme trên Header gọi hàm toggling trong `main.js`, tự động ghi nhớ trạng thái vào `localStorage.getItem('cliniportal_theme')`.

### 3.3. Engine Tra Cứu & Tìm Kiếm Lâm Sàng
- **Tra cứu ICD-10 (`js/tracuu-icd10.js`)**:
  - Chứa chỉ mục tìm kiếm nhanh toàn bộ danh mục mã bệnh ICD-10 (Tiếng Việt & Tiếng Anh).
  - Hỗ trợ tìm kiếm theo từ khóa không dấu, mã chẩn đoán, hoặc nhóm bệnh lý.
- **Global Search Engine (`src/core/search-engine.ts`)**:
  - Lập chỉ mục (indexing) toàn bộ bài viết Markdown, công cụ tính toán, và thẻ thuốc trong hệ thống.
  - Phân tích từ khóa tìm kiếm (fuzzy search) và trả về kết quả phân loại theo phân hệ.

### 3.4. Studio Chẩn Đoán Chuyên Sâu & DocSpace Features
- **ABG Studio (`js/abg-studio/abg-studio.js`)**:
  - Studio chuyên sâu phân tích Khí máu động mạch (Arterial Blood Gas Analysis).
  - Tự động đánh giá Rối loạn thăng bằng Kiềm - Toan (Toan/Kiềm Chuyển hóa hay Hô hấp), đáp ứng bù trừ, Anion Gap, Delta Gap và tình trạng giảm oxy máu (PaO₂/FiO₂ ratio).
- **Drug Picker (`src/docspace/features/drug-picker.ts`)**:
  - Component chọn thuốc thông minh tích hợp vào giao diện ghi chú và đơn thuốc.
  - Hỗ trợ tìm kiếm theo tên biệt dược, hoạt chất, gợi ý liều dùng và tự động kiểm tra tương tác thuốc.
- **Case Logger (`src/docspace/features/case-logger-view.ts`)**:
  - Phân hệ nhật ký ca bệnh lâm sàng cho sinh viên & bác sĩ.
  - Cho phép lưu trữ tiến trình bệnh án (SOAP format: Subjective, Objective, Assessment, Plan), theo dõi diễn tiến sinh hiệu và kết quả xét nghiệm.
- **DocSpace Workspace (`src/docspace/docspace-view.ts`)**:
  - Môi trường làm việc đa năng kết hợp ghi chú tri thức y khoa (Markdown Notes), quản lý tài liệu lâm sàng, và tích hợp các công cụ AI hỗ trợ chẩn đoán.

### 3.5. State Management & Local Storage System
- Quản lý toàn bộ trạng thái người dùng (Local State) thông qua `src/core/storage.ts` và `src/docspace/storage.ts`:
  - Lưu danh sách ca bệnh cá nhân (`case_logs`).
  - Lưu bài viết đã bookmark (`favorite_articles`).
  - Lưu lịch sử tính toán chỉ số lâm sàng (`calculator_history`).
  - Cấu hình tùy chỉnh giao diện và cỡ chữ.

---

## 🛠️ 4. Quy Trình Vận Hành Nội Dung & Kiểm Thử (Operational Workflow)

### 4.1. Quy Chuẩn Tạo Bài Viết Nội Dung Mới (`src/content/`)
1. **Đặt tên file**: Sử dụng 100% chữ thường, không dấu, nối bằng dấu gạch ngang (ASCII Kebab-case). Ví dụ: `duong-huyet-cap-cuu.md`.
2. **Khai báo Header Metadata (YAML Frontmatter)**:
   ```yaml
   ---
   title: "Tiếp cận Chẩn đoán và Xử trí Tăng Đường huyết Cấp cứu"
   description: "Hướng dẫn chẩn đoán phân biệt và phác đồ bù dịch, insulin cho DKA và HHS."
   category: "approaches"
   tags: ["noi-tiet", "cap-cuu", "dka", "hhs"]
   updatedAt: "2026-08-03"
   author: "CliniPortal Team"
   ---
   ```
3. **Cập nhật Category Mapping**: Khai báo slug bài viết và tên danh mục Tiếng Việt tương ứng tại `data/categories.json`.

### 4.2. Checklist Kiểm Thử & An Toàn Mã Nguồn (Quality Assurance)
Trước khi phát hành hoặc commit bất kỳ thay đổi nào trong hệ thống, bắt buộc thực thi các công cụ kiểm tra tự động:

1. **Kiểm tra Đường dẫn Tương đối**: Đảm bảo tất cả liên kết CSS/JS/Image khớp đúng cấp thư mục `../`.
2. **Kiểm tra Rủi ro Phụ thuộc Mã nguồn (Graphify Risk Assessment)**:
   ```bash
   node scratch/query_graph.js <tên_file_hoặc_module>
   ```
   *Nếu file thuộc nhóm Hub Rủi ro Cao (`main.js`, `guidelines.js`, `benh-ly.js`, `clinical-engine.js`), bắt buộc kiểm thử tác động dây chuyền.*
3. **Kiểm tra Cấu trúc Thẻ HTML**:
   ```bash
   node scratch/check_tags.js <path_to_file.html>
   ```
   *Đảm bảo không bị đóng thiếu thẻ HTML làm vỡ giao diện chung.*

---

## 🔗 5. Ý Tưởng Liên Kết Hệ Sinh Thái Xuyên Module (Cross-Module Integration Ideas)

Để tối ưu hóa trải nghiệm "All-in-one" của DocSpace và CliniPortal, dưới đây là các ý tưởng liên kết tính năng (hyper-linking) giữa các phân hệ:

### 5.1. Tiếp Cận Bệnh Lý (Approaches) & Dược Lý (Pharmacology)
- **Smart Drug Tooltips**: Tại các node "Quyết định điều trị" trên Flowchart tiếp cận lâm sàng, click vào tên nhóm thuốc (VD: ACEi, Beta-blocker) sẽ tự động bật **Drug Picker (DocSpace)** hoặc popup thẻ thuốc của module **Dược lý**. Bác sĩ có thể xem nhanh liều lượng và chống chỉ định ngay trên màn hình flowchart.
- **Phác Đồ Động**: Khi xem bài bệnh lý ở module Tiếp cận (VD: Suy tim cấp), hệ thống tự đề xuất (suggest) các thuốc phổ biến từ module Dược lý dựa trên tag/category liên quan.

### 5.2. Công Cụ Lâm Sàng (Calculators) & Y Học Chứng Cứ (Guidelines)
- **Guideline Contextual Action**: Sau khi người dùng tính xong một thang điểm (VD: CHA₂DS₂-VASc), dựa trên kết quả trả về (nguy cơ cao/thấp), `clinical-engine` sẽ hiển thị nút "Xem khuyến cáo quản lý". Nút này sẽ dẫn trực tiếp (deep-link) đến đoạn (section) cụ thể trong tài liệu Guideline ở phân hệ **Y học chứng cứ**.

### 5.3. Case Logger (DocSpace) & Các Công Cụ Tính Toán Y Khoa
- **Auto-Sync Sinh Hiệu (Bi-directional Data Flow)**: 
  - **Mô tả**: Ghi nhận sinh hiệu (Mạch, Huyết áp, Nhịp thở, SpO2, Nhiệt độ) và các xét nghiệm cơ bản (Creatinine, K+, Na+, Bilirubin) trực tiếp vào tab "Objective" (Khách quan) của **Case Logger**. 
  - **Cách thức hoạt động**: Thay vì phải chuyển tab và nhập lại từ đầu, một nút bấm **"Calculate from Vitals"** sẽ xuất hiện. Nhấn nút này sẽ kích hoạt `clinical-engine`, tự động lấy (parse) các giá trị đã nhập để truyền (autofill) vào các công cụ trong phân hệ **Calculators**.
  - **Ví dụ**: Truyền Creatinine, Tuổi, Giới tính để tính eGFR; truyền Huyết áp, Nhịp thở, Tri giác để tính qSOFA, CURB-65. Sau khi tính xong, kết quả (VD: eGFR = 45 mL/phút) sẽ được tự động chèn ngược lại vào phần "Assessment" (Đánh giá) của bệnh án.
- **Tích Hợp Khí Máu Động Mạch (ABG Studio Side-Panel)**: 
  - **Mô tả**: Trong quá trình lưu trữ bệnh án, khi bác sĩ nhập kết quả xét nghiệm Khí máu động mạch (pH, pCO2, HCO3-).
  - **Cách thức hoạt động**: Bác sĩ có thể click nút "Phân tích Khí máu" (Analyze ABG). Hệ thống không mở một trang mới mà sẽ trượt ra một **Side-panel của ABG Studio** (ngay trong không gian DocSpace). ABG Studio sẽ đọc các giá trị vừa nhập, tính toán khoảng trống Anion (Anion Gap), Delta Gap và đưa ra chẩn đoán rối loạn toan kiềm (VD: Toan chuyển hóa tăng Anion Gap bù trừ bằng Kiềm hô hấp). 
  - **Lưu kết quả**: Bác sĩ nhấn "Save to Case", toàn bộ biện luận và chẩn đoán này sẽ được đính kèm trực tiếp vào phần bệnh án hiện tại, đảm bảo mạch suy nghĩ lâm sàng không bị gián đoạn.

### 5.4. Kỹ Năng Lâm Sàng (Skills) & Sinh Lý Bệnh (Pathophysiology)
- **Giải Thích Cơ Chế Tại Chỗ (In-situ Pathophysiology Learning)**: 
  - **Mô tả**: Sinh viên y khoa thường học các thao tác khám thực thể ở module **Kỹ Năng** (VD: Khám tim mạch - dấu hiệu tĩnh mạch cổ nổi, tiếng ngựa phi T3, khám gan to).
  - **Cách thức hoạt động**: Cạnh mỗi dấu hiệu lâm sàng đặc hiệu trong Bảng kiểm (Checklist) sẽ có một biểu tượng **"Giải thích Sinh lý bệnh" (Brain/Info icon)**. Khi tương tác, một Popover hoặc Modal sẽ hiện ra, trích xuất chính xác đoạn giải thích cơ chế tương ứng từ module **Sinh lý - SLB** thông qua cơ chế Content Injection.
  - **Ví dụ**: Khi nhấn vào "Tĩnh mạch cổ nổi", hệ thống sẽ truy xuất nội dung từ bài "Sinh lý bệnh suy tim phải": *"Suy tim phải làm giảm khả năng tống máu của tâm thất phải, dẫn đến ứ máu ở tâm nhĩ phải và tĩnh mạch trung tâm, làm tăng áp lực tĩnh mạch (CVP) và biểu hiện bằng tĩnh mạch cổ nổi"*. Có thể kèm theo sơ đồ cơ chế huyết động thu nhỏ.
  - **Lợi ích cốt lõi**: Giúp sinh viên chuyển dịch từ việc "Nhớ triệu chứng máy móc" sang "Hiểu sâu cơ chế gốc rễ", kết nối kiến thức y cơ sở trực tiếp với các thao tác lâm sàng tại giường bệnh.

### 5.5. Tra Cứu ICD-10 (Hub) — Trung Tâm Định Tuyến Y Khoa
- Thay vì chỉ tra cứu mã bệnh tĩnh, **Mã ICD-10** sẽ trở thành "Clinical Navigation Hub".
- **Ecosystem Integration**: Khi click vào một mã bệnh (VD: I21 - Nhồi máu cơ tim cấp), hệ thống sẽ hiển thị thẻ Hub bao gồm các lối tắt đến:
  - Phác đồ tiếp cận đau ngực (Approaches)
  - Khuyến cáo ESC/AHA mới nhất (Guidelines)
  - Sinh lý bệnh thiếu máu cục bộ cơ tim (Patho)
  - Thang điểm TIMI, GRACE (Calculators)

### 5.6. Y Học Cổ Truyền (TCM) & Y Học Hiện Đại
- **Cross-Mapping Database**: Trong tương lai, liên kết trực tiếp một hội chứng y học hiện đại (VD: Tăng huyết áp vô căn) với các thể lâm sàng của YHCT (Can dương vượng, Âm hư hỏa vượng) để đưa ra góc nhìn đa chiều, hỗ trợ chỉ định điều trị kết hợp cho bác sĩ.

---

## ⚡ 5.7. Các Chuỗi Phản Ứng Liên Phân Hệ (Cross-Module Chain Reactions)
Khái niệm "Chuỗi phản ứng" (Chain Reaction) nâng tầm CliniPortal từ một thư viện tra cứu rời rạc thành một **Hệ thống Hỗ trợ Quyết định Lâm sàng (CDSS) chủ động**. Khi một sự kiện xảy ra ở một module, nó sẽ kích hoạt tự động hàng loạt các tính năng ở các module khác:

### 1. Chuỗi Kê Đơn An Toàn (Prescription Safety Chain)
*Luồng dữ liệu khép kín giúp giảm thiểu sai sót y khoa (Medication Errors).*
- **Trigger**: Bác sĩ nhập chẩn đoán và kết quả xét nghiệm (Tuổi, Cân nặng, Creatinine, AST/ALT) vào **Case Logger**.
- **Action 1 (Calculators)**: Hệ thống chạy ngầm, tự động tính độ thanh thải Creatinine (eGFR) và thang điểm suy gan (Child-Pugh).
- **Action 2 (Drug Picker/Pharmacology)**: Khi bác sĩ gõ tên thuốc để kê đơn, hệ thống đối chiếu với eGFR và Child-Pugh hiện tại. Nếu eGFR < 30 mL/min, màn hình lập tức nháy đỏ cảnh báo giảm liều hoặc chống chỉ định (VD: Metformin, NOACs) và gợi ý thuốc thay thế.
- **Action 3 (EBM/Guidelines)**: Kèm theo cảnh báo là một nút bấm nhỏ mở nhanh bằng chứng (Evidence-base) giải thích tại sao cần chỉnh liều theo hướng dẫn KDIGO mới nhất.

### 2. Chuỗi Xử Trí Cấp Cứu Trực Tiếp (Emergency Resuscitation Workflow)
*Tối ưu hóa thời gian Vàng (Golden Hour) trong cấp cứu.*
- **Trigger**: Bác sĩ chọn phác đồ "Sốc nhiễm khuẩn" hoặc "Phản vệ" từ **Approaches (Flowchart)**.
- **Action 1 (DocSpace)**: Khởi động đồng hồ bấm giờ đếm ngược (Timer) cho "Gói 1 giờ" (1-hour bundle).
- **Action 2 (Calculators)**: Tích hợp ngay một mini-calculator trên Flowchart để tính lượng dịch truyền bù (30ml/kg) và tính liều truyền Adrenaline/Noradrenaline (mcg/kg/min) dựa trên cân nặng bệnh nhân.
- **Action 3 (Skills)**: Tại bước yêu cầu "Đặt đường truyền tĩnh mạch trung tâm (CVC)" trên sơ đồ, hiện popup chứa Checklist nhanh (5 bước vô khuẩn tối đa) từ module Kỹ năng lâm sàng để ê-kíp điều dưỡng đối chiếu.

### 3. Chuỗi Biện Luận Cận Lâm Sàng (Lab-to-Action Pipeline)
*Kết nối từ con số xét nghiệm vô tri đến hành động lâm sàng.*
- **Trigger**: Bác sĩ nhập kết quả Khí máu động mạch (ABG) hoặc Điện giải đồ bất thường vào **ABG Studio / Case Logger**.
- **Action 1 (Pathophysiology)**: Tự động trích xuất cơ chế sinh lý bệnh giải thích tình trạng "Toan chuyển hóa tăng Anion Gap" cho sinh viên học tập tại chỗ.
- **Action 2 (Approaches)**: Đề xuất các nguyên nhân (Ketoacidosis, Lactic acidosis, Uremia...) và điều hướng đến phác đồ chẩn đoán phân biệt.
- **Action 3 (Pharmacology)**: Gợi ý và mở công cụ tính toán bù Bicarbonate hoặc phác đồ pha dịch Kali tĩnh mạch an toàn, đi kèm tốc độ truyền tối đa khuyến cáo.

### 4. Chuỗi Đồng Bộ Kiến Thức Đa Chiều (Omni-Channel Knowledge Sync)
- **Trigger**: Người dùng Highlight hoặc tạo Ghi chú (Note) trên một bài viết **Sinh lý bệnh** hoặc **Khuyến cáo (EBM)**.
- **Action 1 (DocSpace)**: Hệ thống tự động trích xuất các câu highlight này, gắn tag ICD-10 tương ứng và đưa vào "Bản đồ Tri thức" (Knowledge Graph) của user.
- **Action 2 (Anki/Flashcard)**: Tự động chuyển đổi các highlight có chứa các con số/chỉ định (VD: "Mục tiêu HA < 130/80") thành dạng thẻ Flashcard (Spaced Repetition) để sinh viên ôn thi OSCE.
- **Action 3 (TCM Bridge)**: Bất kỳ khi nào sinh viên ôn tập một bệnh lý Hiện đại, hệ thống sẽ đề xuất 1 thẻ flashcard mở rộng về góc nhìn của Y học Cổ truyền (Ví dụ: đối chiếu Tăng huyết áp với chứng Huyễn vựng).

---

*Tài liệu được cập nhật tự động và lưu trữ tại `src/content/VAN_HANH_HETHONG.md` — CliniPortal Ecosystem.*
