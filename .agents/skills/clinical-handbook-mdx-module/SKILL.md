---
name: clinical-handbook-mdx-module
description: >-
  Quy chuẩn và quy trình toàn diện biên tập, tái cấu trúc và hoàn thiện bài học Sổ tay Lâm sàng (.mdx) trong src/content/clinical-handbook/ gắn kết chặt chẽ với Design Tokens CliniPortal 2.0, HANDBOOK_MDX_DESIGN_SPEC.md, Responsive Decision Grid Cards, Editorial SVG Flowcharts, Bảng Dược lý & Cạm bẫy thực chiến. Kích hoạt khi AI cần: tạo mới hoặc chỉnh sửa bài học MDX sổ tay, chuyển đổi bản draft/raw markdown (như hh.mdx, dengue-03.mdx) thành bài học chuẩn hoàn chỉnh, áp dụng design tokens, đổi tên file ngữ nghĩa sau khi thêm design, hoặc đăng ký catalog bài viết.
---

# 📘 Clinical Handbook MDX Module Skill (Sổ Tay Lâm Sàng & Đúc Kết Thực Chiến)

> **Phân hệ**: Sổ Tay Lâm Sàng CliniPortal (`src/content/clinical-handbook/`)  
> **Phiên bản chuẩn**: 2.0.0 (Gold Standard Clinical Practice)  
> **Tài liệu tham chiếu cốt lõi**: `src/content/clinical-handbook/HANDBOOK_MDX_DESIGN_SPEC.md` & `src/styles/components/clinical-handbook.css`  
> **Triết lý**: Chuyển hóa toàn bộ văn bản hàn lâm dàn trải (Wall of text / Raw markdown) thành **Bảng Điều Khiển Cấp Cứu & Trực Chiến (Clinical Cockpit)** mật độ thông tin cao, trực quan hóa 100%, sẵn sàng cho bác sĩ tra cứu trong 30 giây bên giường bệnh.

---

## 🏛️ 1. TỔNG QUAN VỀ PHÂN HỆ SỔ TAY LÂM SÀNG

Phân hệ Sổ tay Lâm sàng được tổ chức theo cấu trúc 3 tầng:
`Chuyên khoa (Specialty)` $\rightarrow$ `Bệnh lý (Disease)` $\rightarrow$ `Bài học MDX (Handbook Article)`

```text
src/content/clinical-handbook/
├── HANDBOOK_MDX_DESIGN_SPEC.md             # Đặc tả chuẩn thiết kế & CSS tokens
├── index.ts                                # Entry point xuất bản
├── types/
│   └── handbook.types.ts                   # Định nghĩa TypeScript interface
├── data/
│   └── handbook-catalog.ts                 # CSDL Master 8 chuyên khoa & bài học MDX
├── views/
│   ├── handbook-hub-view.ts                # Màn hình Hub Chuyên khoa
│   ├── handbook-disease-view.ts            # Màn hình Danh mục bài học theo bệnh
│   └── handbook-reader-view.ts             # Trình đọc MDX Native SPA với TOC dính
└── <specialty>/                            # 8 Thư mục chuyên khoa (kebab-case)
    └── <disease>/                          # Thư mục bệnh lý (kebab-case)
        ├── <slug-1>.mdx                    # Bài học MDX số 1 (Hoàn chỉnh)
        └── <slug-2>.mdx                    # Bài học MDX số 2 (Đang soạn)
```

### 8 Chuyên Khoa Chuẩn Hóa
1. `truyen-nhiem` (Bệnh Truyền Nhiễm & Nhiệt Đới)
2. `tim-mach` (Tim Mạch Học)
3. `tieu-hoa-gan-mat` (Tiêu Hóa & Gan Mật)
4. `ho-hap` (Hô Hấp Học)
5. `hoi-suc-cap-cuu` (Hồi Sức Cấp Cứu & Chống Độc)
6. `noi-tiet` (Nội Tiết & Chuyển Hóa)
7. `than-tiet-nieu` (Thận - Tiết Niệu & Lọc Máu)
8. `than-kinh` (Thần Kinh Học)

---

## 🛑 2. BỘ 11 QUY TẮC VÀNG BẮT BUỘC (MODULE HARD RULES)

Khi biên tập, tiếp nhận hoặc chuyển đổi bất kỳ file `.mdx` nào trong `src/content/clinical-handbook/`, AI **bắt buộc tuân thủ 11 quy tắc sau**:

### Quy tắc 1: CẤM TUYỆT ĐỐI ASCII ART (Anti-ASCII Rule)
- Tuyệt đối **không** dùng sơ đồ vẽ bằng ký tự đơn dòng `+----+----|` hoặc `──>` trong khối code block.
- Khối ASCII sẽ bị vỡ dòng nghiêm trọng trên màn hình điện thoại (width $\le$ 375px).
- **Hành động bắt buộc**: Phải chuyển hóa 100% sơ đồ phân tầng, cơ chế hoặc thuật toán thành:
  1. **Responsive Decision Grid Cards** (`auto-fit, minmax(280px, 1fr)`) có viền màu phân cấp.
  2. Hoặc **Editorial Pure SVG** (`.flowchart-editorial-card`) tuân thủ Dark Mode.
  3. Hoặc **Linear Flow Track** (`.flow-track-container`).

### Quy tắc 2: FRONTMATTER YAML CHUẨN XÁC 100%
- Bắt buộc khai báo đầy đủ các trường: `title`, `slug`, `specialty`, `specialtyLabel`, `disease`, `diseaseLabel`, `order`, `tags`, `difficulty` (`beginner` | `intermediate` | `advanced`), `estimatedTime` (phút), `lastUpdated`, `evidenceLevel`, `sections`.
- Mảng `sections: [{ id: "sec-id", number: 1, title: "...", icon: "fa-..." }]` **phải khớp chính xác 100%** với danh sách ID của các Heading `##` trong bài.

### Quy tắc 3: QUY CHUẨN ĐẶT ID TIÊU ĐỀ CHO CLINIMDXENGINE
- Tiêu đề Heading 2 (`##`) phải có định dạng: `## <Icon FontAwesome> <Số>. <Tên Phân Mục> {#sec-id}`
  - Ví dụ: `## ⚡ 1. ĐÚC KẾT 30 GIÂY (THE BOTTOM LINE) {#sec-takeaway}`
  - Ví dụ: `## ⚠️ 4. CẠM BẪY XÉT NGHIỆM HUYẾT THANH {#sec-serology-pitfalls}`
- **CẤM**: Không được tự ý gõ thẻ `<section id="sec-takeaway">` trước `##`. `CliniMdxEngine` tự động bọc thẻ section dựa trên `{#sec-id}`. Nếu gõ thủ công sẽ tạo 2 thẻ section lồng nhau gây lỗi vỡ layout DOM!

### Quy tắc 4: ESCAPE KÝ TỰ JSX & LÀM SẠCH LỖI MATH LATEX
- Trong văn bản và bảng MDX:
  - Dấu nhỏ hơn: `<` $\rightarrow$ `&lt;` (ví dụ: `ALT &lt; 40 U/L`, `eGFR &lt; 60 mL/min`).
  - Dấu lớn hơn: `>` $\rightarrow$ `&gt;` (ví dụ: `HBV DNA &gt; 2.000 IU/mL`).
  - Dấu nhân: dùng `&times;` hoặc `×` (ví dụ: `5&times; ULN` thay vì `5x ULN`).
  - Dấu lớn hơn bằng / nhỏ hơn bằng: dùng `&ge;` / `&le;` hoặc `≥` / `≤`.
- Công thức toán KaTeX:
  - Khối toán đặt trong thẻ `.katex-display-card` với `$$\text{Công thức}$$`.
  - Tuyệt đối sửa các lỗi gõ thiếu dấu gạch chéo ngược như `rac{` $\rightarrow$ `\frac{`, `imes` $\rightarrow$ `\times`, `ULN_{AST}` $\rightarrow$ `\text{ULN}_{\text{AST}}`.
  - Không để các ký tự `$` đơn lẻ bọc text tiếng Việt vì sẽ kích hoạt KaTeX parser làm biến dạng giao diện.

### Quy tắc 5: BỘ KHUNG GIAO DIỆN BẮT BUỘC (Mandatory UI Cockpit)
Một bài học chuẩn hoàn chỉnh **bắt buộc phải có đủ 6 tầng linh kiện chính**:
1. **Dải chỉ số nhanh 30s** (`.stats-strip` với 4 thẻ `.stat-card` chứa các con số sống còn).
2. **Thanh điều hướng nhanh cố định** (`.pillars-nav` với các đường link neo `#sec-...`).
3. **Khung đúc kết & cảnh báo** (`.callout` với các biến thể `.callout-pearl`, `.callout-danger`, `.callout-rule`, `.callout-warning`).
4. **Lưới thẻ quyết định hoặc bảng đối chiếu** (`Responsive Grid Cards` hoặc `.table-card` / `.handbook-table`).
5. **Thẻ cạm bẫy lâm sàng** (`.pitfall-grid` với `.pitfall-card.danger` hoặc `warning`).
6. **Ca lâm sàng thực tế** (`.case-study-card` với 4 phần: Tiêu đề, Tình huống, Phân tích, Bài học xương máu).

### Quy tắc 6: BẢO TOÀN 100% NỘI DUNG Y KHOA (Zero Content Drop)
- Không được cắt xén, lược bỏ các mốc xét nghiệm, tiêu chuẩn chẩn đoán, biệt dược, liều dùng hay hướng dẫn của Bộ Y tế/quốc tế trong bản draft.
- Nhiệm vụ của AI là **tổ chức lại thông tin (Restructure & Elevate)** vào các linh kiện trực quan, **không phải xóa bớt nội dung**.

### Quy tắc 7: PHÂN BIỆT THỰC CHIẾN VS LÝ THUYẾT HÀN LÂM
- Các bài học trong Sổ tay Lâm sàng hướng đến **hành động tức thì (Action-oriented)**:
  - Khởi trị thuốc gì? Liều bao nhiêu? Uống đói hay no?
  - Chỉnh liều theo eGFR thế nào?
  - Bẫy xét nghiệm nào thường gặp khiến chẩn đoán sai?
  - Khi nào bắt buộc phải chuyển viện/hội chẩn khẩn cấp?

### Quy tắc 8: 100% DESIGN TOKENS & DARK MODE COMPLIANT
- Sử dụng các biến màu CSS từ `clinical-handbook.css`:
  - `--handbook-primary`, `--handbook-surface`, `--handbook-bg`, `--handbook-border`, `--handbook-text`, `--handbook-muted`.
  - Các màu ngữ cảnh lâm sàng: `#10b981` (Xanh lá - An toàn), `#f59e0b` (Hổ phách - Cảnh giác), `#ef4444` / `#dc2626` (Đỏ - Cấp cứu / Cạm bẫy tử vong), `#0284c7` (Xanh dương - Tiêu chuẩn cốt lõi).

### Quy tắc 9: ĐỒNG BỘ CSDL MASTER (`handbook-catalog.ts`)
- Mỗi khi hoàn thiện một file bài học `.mdx`, AI phải kiểm tra và cập nhật bản ghi tương ứng trong `src/content/clinical-handbook/data/handbook-catalog.ts`:
  - Đổi trạng thái `isDraft: false` hoặc xóa cờ draft.
  - Cập nhật đúng `filePath`, `title`, `description`, `keyTakeaway`, `tags`, `sections`.

### Quy tắc 10: KIỂM TOÁN CHẤT LƯỢNG TRƯỚC KHI BÀN GIAO (Quality Gate)
- Chạy `node tools/scratch/check_tags.js <file>.mdx` để đảm bảo không lệch thẻ HTML.
- Chạy `node .agents/skills/clinical-handbook-mdx-module/scripts/validate_handbook_mdx.mjs <file>.mdx` để kiểm định toàn diện.
- Chạy `npm run build` để xác nhận Vite biên dịch thành công 100% không vướng lỗi TypeScript hay import.

### Quy tắc 11: ĐỔI TÊN FILE NGỮ NGHĨA SAU KHI THÊM DESIGN (Semantic File Renaming Rule)
- Khi thêm design / hoàn thiện một file bản thảo có tên chung chung hoặc tên rút gọn đánh số (ví dụ: `hh.mdx`, `draft.mdx`, `note.mdx`, `dengue-03.mdx`, `hbv-04.mdx`), AI **bắt buộc phải đổi tên file `.mdx`** sao cho phản ánh đúng chủ đề lâm sàng của bài viết theo chuẩn đặt tên thống nhất của phân hệ:
  - **Cấu trúc tên file chuẩn**: `<ma-benh>-<STT-2-chu-so>-<chu-de-ngan-kebab-case>.mdx` (chữ thường 100%, ASCII thuần không dấu tiếng Việt, nối bằng dấu gạch nối `-`).
  - **Ví dụ chuẩn**:
    - `hh.mdx` / `dengue-02.mdx` $\rightarrow$ `dengue-02-viem-gan-nang-va-suy-gan-cap.mdx`
    - `dengue-03.mdx` $\rightarrow$ `dengue-03-chi-dinh-truyen-tieu-cau.mdx`
    - `hbv-01.mdx` $\rightarrow$ `hbv-01-tieu-chuan-chan-doan-va-cam-bay.mdx`
- **Đồng bộ bắt buộc ngay khi đổi tên file**:
  1. Cập nhật trường `slug` (và kiểm tra `order`) trong Frontmatter YAML khớp chính xác 100% với tên file mới (không kèm `.mdx`).
  2. Cập nhật đồng bộ `id`, `slug` và `filePath` trong `src/content/clinical-handbook/data/handbook-catalog.ts` (vì `handbook-reader-view.ts` nạp bài viết theo mẫu `${specialtyId}/${diseaseSlug}/${slug}.mdx`).
  3. Xóa/di chuyển file tên thô cũ (không để tồn tại song song 2 bản cũ và mới gây rác kho nội dung) và rà soát toàn repo xem có đường dẫn cũ nào cần cập nhật.

---

## 🚀 3. QUY TRÌNH 5 BƯỚC HOÀN THIỆN BÀI HỌC (THE 5-STEP PIPELINE)

```text
[BƯỚC 1: GIẢI PHẪU NỘI DUNG RAW/DRAFT]
  ├── Rà soát toàn bộ file nháp (ví dụ: hh.mdx)
  ├── Nhận diện các con số dịch tễ & cut-off ──> Gom vào Dải Chỉ Số 30s
  ├── Nhận diện các giai đoạn / tiêu chuẩn ──> Gom vào Responsive Grid Cards
  ├── Nhận diện bảng thuốc & chỉnh liều ──> Gom vào Dose Table Wrapper
  ├── Nhận diện bẫy xét nghiệm / sai lầm ──> Gom vào Pitfall Cards
  └── Nhận diện tình huống thực tế ──> Gom vào Bedside Case Study Cards

[BƯỚC 2: KHỞI TẠO FRONTMATTER & BADGES]
  ├── Xác định specialtyId & diseaseId chuẩn
  ├── Soạn danh mục sections (id, number, title, icon)
  └── Đặt Title H1 và nhóm nhãn huy hiệu (Module Badge Group)

[BƯỚC 3: XÂY DỰNG KHUNG COCKPIT 30 GIÂY]
  ├── Thêm .stats-strip với 4 thẻ stat-card (Blue, Red, Amber, Green)
  ├── Thêm thanh điều hướng nhanh .pillars-nav với link neo #sec-id
  └── Thêm Section 1: Đúc kết 30s với .callout-pearl

[BƯỚC 4: TÁI CẤU TRÚC TỪNG PHÂN MỤC THEO DESIGN SYSTEM]
  ├── Biến đổi các phân tầng thành Grid Cards (minmax(280px, 1fr))
  ├── Bọc bảng vào .table-card và .table-wrapper
  ├── Làm sạch ký tự JSX (< -> &lt;, > -> &gt;)
  ├── Chuyển công thức vào .katex-display-card
  └── Gắn anchor {#sec-id} vào mọi tiêu đề H2

[BƯỚC 5: ĐỔI TÊN FILE NGỮ NGHĨA, CẬP NHẬT CATALOG & CHẠY QUALITY GATE]
  ├── Đổi tên file draft/tạm (như hh.mdx, dengue-03.mdx) sang <ma-benh>-<NN>-<chu-de-kebab-case>.mdx & đồng bộ `slug` trong YAML
  ├── Cập nhật đồng bộ `id`, `slug`, `filePath` và metadata trong src/content/clinical-handbook/data/handbook-catalog.ts
  ├── Chạy test kiểm tra thẻ: node tools/scratch/check_tags.js <file>.mdx
  ├── Chạy validator: node .agents/skills/clinical-handbook-mdx-module/scripts/validate_handbook_mdx.mjs <file>.mdx
  └── Kiểm tra render hiển thị trên trình duyệt hoặc dev server
```

---

## 🎨 4. THƯ VIỆN LINH KIỆN THIẾT KẾ MẪU CHUẨN (DESIGN COMPONENT VAULT)

Dưới đây là các linh kiện đã được tối ưu hóa cho `clinical-handbook.css`. Hãy sao chép và đắp dữ liệu lâm sàng vào:

### 4.1. Nhóm Huy Hiệu Header (Badge Group)
```html
<div class="module-badge-group" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
  <span class="badge" style="background: rgba(2, 132, 199, 0.12); color: #0284c7; padding: 4px 10px; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; border: 1px solid rgba(2, 132, 199, 0.25);"><i class="fa-solid fa-stethoscope"></i> [Tên Chuyên Khoa]</span>
  <span class="badge" style="background: rgba(16, 185, 129, 0.12); color: #059669; padding: 4px 10px; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; border: 1px solid rgba(16, 185, 129, 0.25);"><i class="fa-solid fa-file-shield"></i> Quyết định [Số]/QĐ-BYT</span>
  <span class="badge" style="background: rgba(245, 158, 11, 0.12); color: #d97706; padding: 4px 10px; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; border: 1px solid rgba(245, 158, 11, 0.25);"><i class="fa-solid fa-shield-halved"></i> EBM 2026 [Tên Hiệp Hội]</span>
</div>
```

### 4.2. Dải Chỉ Số Then Chốt 30s (`.stats-strip`)
```html
<section class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val blue">[Giá trị 1]</div>
      <div class="stat-lbl">[Mô tả ngắn gọn chỉ số dịch tễ / cut-off then chốt]</div>
    </div>
    <div class="stat-card">
      <div class="stat-val red">[Giá trị 2]</div>
      <div class="stat-lbl">[Cảnh báo tử vong / Chống chỉ định cấp cứu]</div>
    </div>
    <div class="stat-card">
      <div class="stat-val amber">[Giá trị 3]</div>
      <div class="stat-lbl">[Tỷ lệ cạm bẫy / Ngưỡng nghi ngờ]</div>
    </div>
    <div class="stat-card">
      <div class="stat-val green">[Giá trị 4]</div>
      <div class="stat-lbl">[Hiệu quả can thiệp / Đích điều trị đạt được]</div>
    </div>
  </div>
</section>
```

### 4.3. Thanh Điều Hướng Nhanh Neo Dính (`.pillars-nav`)
```html
<nav class="pillars-nav">
  <div class="pillars-nav-inner">
    <a href="#sec-takeaway" class="pillar-link active"><i class="fa-solid fa-bolt"></i> 1. Đúc Kết 30s</a>
    <a href="#sec-stages" class="pillar-link"><i class="fa-solid fa-diagram-project"></i> 2. Phân Tầng</a>
    <a href="#sec-criteria" class="pillar-link"><i class="fa-solid fa-clipboard-check"></i> 3. Tiêu Chuẩn</a>
    <a href="#sec-regimens" class="pillar-link"><i class="fa-solid fa-pills"></i> 4. Phác Đồ Liều</a>
    <a href="#sec-pitfalls" class="pillar-link"><i class="fa-solid fa-triangle-exclamation"></i> 5. Cạm Bẫy</a>
    <a href="#sec-special-cases" class="pillar-link"><i class="fa-solid fa-hospital-user"></i> 6. Nhóm Đặc Biệt</a>
    <a href="#sec-cases" class="pillar-link"><i class="fa-solid fa-user-doctor"></i> 7. Ca Thực Chiến</a>
  </div>
</nav>
```

### 4.4. Hệ Thống Khung Callout Đúc Kết & Cảnh Báo
```html
<!-- ĐIỂM NGỌC LÂM SÀNG (PEARL) -->
<div class="callout callout-pearl">
  <div class="callout-title"><i class="fa-solid fa-lightbulb"></i> NGUYÊN TẮC VÀNG LÂM SÀNG (CLINICAL PEARL)</div>
  <div class="callout-body">
    Nội dung đúc kết sâu sắc, mang tính bước ngoặt trong tư duy chẩn đoán và điều trị...
  </div>
</div>

<!-- CẠM BẪY TỬ VONG / CỜ ĐỎ (DANGER) -->
<div class="callout callout-danger">
  <div class="callout-title"><i class="fa-solid fa-skull-crossbones"></i> CẠM BẪY CHẾT NGƯỜI (FATAL PITFALL)</div>
  <div class="callout-body">
    Cảnh báo chống chỉ định trí mạng hoặc sai sót thường gặp gây suy cơ quan cấp...
  </div>
</div>

<!-- NGUYÊN TẮC BỎ TÚI (RULE OF THUMB) -->
<div class="callout callout-rule">
  <div class="callout-title"><i class="fa-solid fa-ruler-combined"></i> NGUYÊN TẮC BỎ TÚI (RULE OF THUMB)</div>
  <div class="callout-body">
    Mẹo nhớ nhanh để ra quyết định liều hoặc phiên giải xét nghiệm trong 5 giây...
  </div>
</div>

<!-- CẢNH BÁO THẬN TRỌNG (WARNING) -->
<div class="callout callout-warning">
  <div class="callout-title"><i class="fa-solid fa-triangle-exclamation"></i> CẢNH BÁO LÂM SÀNG</div>
  <div class="callout-body">
    Lưu ý tương tác thuốc, chỉnh liều theo chức năng thận/gan...
  </div>
</div>
```

### 4.5. Lưới Thẻ Quyết Định Đa Cột Tự Co Giãn (Responsive Decision Grid Cards)
Thay thế hoàn toàn bảng phân loại cũ hoặc ASCII diagram:

```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0;">

  <!-- THẺ 1: XANH DƯƠNG -->
  <div style="background: var(--handbook-surface); border: 1px solid var(--handbook-border); border-top: 4px solid #0284c7; border-radius: var(--handbook-radius-md); padding: 1.15rem; box-shadow: var(--handbook-card-shadow);">
    <div style="font-size: 0.72rem; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 0.35rem;">NHÓM 1 &bull; [TÊN PHÂN NHÓM]</div>
    <div style="font-size: 1.05rem; font-weight: 800; color: var(--handbook-text); margin-bottom: 0.5rem;">[Tiêu Đề Thể Lâm Sàng]</div>
    <div style="font-size: 0.86rem; line-height: 1.55; color: var(--handbook-muted);">
      <div>&bull; <strong>Tiêu chí A:</strong> [Giá trị xét nghiệm]</div>
      <div>&bull; <strong>Tiêu chí B:</strong> [Biểu hiện lâm sàng]</div>
      <div style="margin-top: 0.6rem; padding: 0.4rem 0.6rem; background: rgba(2, 132, 199, 0.08); border-radius: 4px; font-weight: 700; color: #0284c7;">
        Hành động: [Xử trí khuyến cáo]
      </div>
    </div>
  </div>

  <!-- THẺ 2: ĐỎ -->
  <div style="background: var(--handbook-surface); border: 1px solid var(--handbook-border); border-top: 4px solid #ef4444; border-radius: var(--handbook-radius-md); padding: 1.15rem; box-shadow: var(--handbook-card-shadow);">
    <div style="font-size: 0.72rem; font-weight: 800; color: #ef4444; text-transform: uppercase; margin-bottom: 0.35rem;">NHÓM 2 &bull; [TÊN PHÂN NHÓM NGUY HIỂM]</div>
    <div style="font-size: 1.05rem; font-weight: 800; color: var(--handbook-text); margin-bottom: 0.5rem;">[Tiêu Đề Nguy Cơ Tiến Triển]</div>
    <div style="font-size: 0.86rem; line-height: 1.55; color: var(--handbook-muted);">
      <div>&bull; <strong>Tiêu chí A:</strong> [Giá trị xét nghiệm cảnh báo]</div>
      <div>&bull; <strong>Mô học / Tổn thương:</strong> [Tiến triển xơ hóa / hoại tử]</div>
      <div style="margin-top: 0.6rem; padding: 0.4rem 0.6rem; background: rgba(239, 68, 68, 0.08); border-radius: 4px; font-weight: 700; color: #dc2626;">
        Hành động: [CHỈ ĐỊNH ĐIỀU TRỊ NGAY LẬP TỨC]
      </div>
    </div>
  </div>

  <!-- THẺ 3: XANH LÁ HOẶC HỔ PHÁCH -->
  <div style="background: var(--handbook-surface); border: 1px solid var(--handbook-border); border-top: 4px solid #10b981; border-radius: var(--handbook-radius-md); padding: 1.15rem; box-shadow: var(--handbook-card-shadow);">
    <div style="font-size: 0.72rem; font-weight: 800; color: #10b981; text-transform: uppercase; margin-bottom: 0.35rem;">NHÓM 3 &bull; [TÊN PHÂN NHÓM ỔN ĐỊNH]</div>
    <div style="font-size: 1.05rem; font-weight: 800; color: var(--handbook-text); margin-bottom: 0.5rem;">[Người Mang Mầm Bệnh Yên Lặng]</div>
    <div style="font-size: 0.86rem; line-height: 1.55; color: var(--handbook-muted);">
      <div>&bull; <strong>Tiêu chí A:</strong> [Chỉ số bình thường]</div>
      <div style="margin-top: 0.6rem; padding: 0.4rem 0.6rem; background: rgba(16, 185, 129, 0.08); border-radius: 4px; font-weight: 700; color: #059669;">
        Hành động: [Theo dõi định kỳ mỗi 6–12 tháng]
      </div>
    </div>
  </div>

</div>
```

### 4.6. Bảng Đối Chiếu Lâm Sàng (`.table-card` & `.handbook-table`)
```html
<div class="table-card">
  <div class="table-header">
    <div class="table-title"><i class="fa-solid fa-table-list"></i> [TIÊU ĐỀ BẢNG ĐỐI CHIẾU]</div>
    <span class="table-badge"><i class="fa-solid fa-shield-virus"></i> Phân biệt sống còn</span>
  </div>
  <div class="handbook-table-container">
    <table class="handbook-table">
      <thead>
        <tr>
          <th style="width: 25%;">Tiêu chí phân định</th>
          <th style="width: 37%;">Thể Bệnh A</th>
          <th style="width: 38%;">Thể Bệnh B</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Tiền sử / Thời gian</strong></td>
          <td>Mô tả thể A</td>
          <td>Mô tả thể B</td>
        </tr>
        <tr>
          <td><strong>Chỉ số cận lâm sàng</strong></td>
          <td><span class="badge" style="background: rgba(16, 185, 129, 0.1); color: #059669; font-weight: 700;">Giá trị A</span></td>
          <td><span class="badge" style="background: rgba(239, 68, 68, 0.1); color: #dc2626; font-weight: 700;">Giá trị B</span></td>
        </tr>
        <tr>
          <td><strong>Xử trí khuyến cáo</strong></td>
          <td>Theo dõi hỗ trợ</td>
          <td><strong style="color: #dc2626;">CAN THIỆP NGAY LẬP TỨC</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### 4.7. Bảng Dược Lý Tra Cứu Liều Dùng & Chỉnh Liều Suy Thận (`.dose-table-wrapper`)
```html
<div class="table-card">
  <div class="table-header">
    <div class="table-title"><i class="fa-solid fa-pills"></i> BẢNG LIỀU DÙNG &amp; HIỆU CHỈNH THEO CHỨC NĂNG THẬN (eGFR)</div>
  </div>
  <div class="handbook-table-container">
    <table class="handbook-table">
      <thead>
        <tr>
          <th style="width: 22%;">Tên Thuốc</th>
          <th style="width: 24%;">Liều Chuẩn Người Lớn</th>
          <th style="width: 30%;">Chỉnh Liều Theo eGFR (mL/phút)</th>
          <th style="width: 24%;">Ưu Tiên Lâm Sàng</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Thuốc A</strong></td>
          <td>Liều x lần/ngày (uống lúc no/đói)</td>
          <td>
            &bull; eGFR &ge; 50: Giữ nguyên<br />
            &bull; eGFR &lt; 50: Giãn cữ 48h
          </td>
          <td>Ưu tiên cho phụ nữ có thai, người trẻ</td>
        </tr>
        <tr>
          <td><strong>Thuốc B</strong></td>
          <td>Liều x lần/ngày</td>
          <td>eGFR &ge; 15: Không cần chỉnh liều</td>
          <td>Ưu tiên người cao tuổi, suy thận, loãng xương</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### 4.8. Lưới Thẻ Cạm Bẫy Lâm Sàng (`.pitfall-grid` & `.pitfall-card`)
```html
<div class="pitfall-grid">

  <!-- CẠM BẪY 1: CẢNH BÁO NGUY HIỂM -->
  <div class="pitfall-card danger">
    <div class="pitfall-header">
      <div class="pitfall-badge"><i class="fa-solid fa-skull-crossbones"></i> CẠM BẪY NGUY HIỂM 01</div>
      <div class="pitfall-title">[Tên Sai Lầm Thường Gặp]</div>
    </div>
    <div class="pitfall-body">
      Mô tả cụ thể tại sao bác sĩ hay mắc bẫy này, cơ chế sinh học hoặc cách ghi phiếu xét nghiệm gây hiểu nhầm...
    </div>
    <div class="pitfall-consequence">
      <i class="fa-solid fa-ban"></i> HẬU QUẢ &amp; HÀNH ĐỘNG: [Hậu quả trí mạng và khuyến cáo chính xác]
    </div>
  </div>

  <!-- CẠM BẪY 2: CẢNH BÁO THẬN TRỌNG -->
  <div class="pitfall-card warning">
    <div class="pitfall-header">
      <div class="pitfall-badge"><i class="fa-solid fa-triangle-exclamation"></i> CẠM BẪY CHẨN ĐOÁN 02</div>
      <div class="pitfall-title">[Tên Sai Lầm Thăm Dò Cận Lâm Sàng]</div>
    </div>
    <div class="pitfall-body">
      Mô tả tình huống đo đạc sai lệch (ví dụ: đo FibroScan khi gan đang viêm phù nề)...
    </div>
    <div class="pitfall-consequence">
      <i class="fa-solid fa-circle-check"></i> GIẢI PHÁP THAY THẾ: [Phương pháp đánh giá an toàn thay thế]
    </div>
  </div>

</div>
```

### 4.9. Ca Bệnh Thực Chiến Bên Giường Bệnh (`.case-study-card`)
```html
<div class="case-study-card">
  <div class="case-header">
    <div class="case-badge"><i class="fa-solid fa-stethoscope"></i> CA THỰC CHIẾN 01 &bull; NGOẠI TRÚ</div>
    <div class="case-title">[Tóm tắt nhân khẩu & lý do đến khám của bệnh nhân]</div>
  </div>
  <div class="case-scenario-box">
    <strong>Tình huống:</strong> Mô tả bệnh sử, các triệu chứng cơ năng, kết quả xét nghiệm ban đầu và quyết định sai lầm thường gặp của tuyến trước...
  </div>
  <div class="case-analysis">
    <strong>Phân tích lâm sàng chuyên sâu:</strong>
    <ul>
      <li><strong>Điểm bẫy 1:</strong> Phân tích tại sao kết quả xét nghiệm không như mắt thường nhìn thấy...</li>
      <li><strong>Đánh giá xơ hóa:</strong> Sử dụng công thức không xâm lấn hoặc chẩn đoán hình ảnh...</li>
      <li><strong>Giai đoạn thực tế:</strong> Khẳng định giai đoạn bệnh chính xác...</li>
    </ul>
  </div>
  <div class="case-takeaway">
    <i class="fa-solid fa-lightbulb"></i> <strong>BÀI HỌC XƯƠNG MÁU:</strong> Đúc kết hành động thực hành lâm sàng mà mọi bác sĩ phải ghi nhớ để không lặp lại sai lầm.
  </div>
</div>
```

### 4.10. Thẻ Công Thức KaTeX Math (`.katex-display-card`)
```html
<div class="katex-display-card">
  <div class="equation-box">
    $$\text{Tên Chỉ Số} = \frac{\text{Tử Số}}{\text{Mẫu Số}} \times 100$$
  </div>
  <div class="equation-legend">
    <strong>Quy chuẩn phiên giải lâm sàng:</strong><br />
    &bull; $\text{Ngưỡng 1} \le X$: Phân tầng nguy cơ thấp.<br />
    &bull; $X &lt; \text{Ngưỡng 2} \le Y$: Xơ hóa / Tổn thương đáng kể.<br />
    &bull; $\text{Chỉ số} > Y$: <strong>Nguy cơ cao / Biến chứng nặng</strong>.
  </div>
</div>
```

---

## 🛠️ 5. CÔNG CỤ TỰ ĐỘNG & BẢNG KIỂM CHẤT LƯỢNG (SCRIPTS & TOOLING)

### 5.1. Script Tự Động Kiểm Tra Tính Toàn Vẹn Của File MDX
Skill cung cấp script chuyên dụng tại `.agents/skills/clinical-handbook-mdx-module/scripts/validate_handbook_mdx.mjs`:

```bash
# Cú pháp chạy kiểm thử:
node .agents/skills/clinical-handbook-mdx-module/scripts/validate_handbook_mdx.mjs <đường_dẫn_file_mdx>

# Ví dụ:
node .agents/skills/clinical-handbook-mdx-module/scripts/validate_handbook_mdx.mjs src/content/clinical-handbook/truyen-nhiem/viem-gan-b/hbv-01-tieu-chuan-chan-doan-va-cam-bay.mdx
```

Các tiêu chí script tự động rà soát:
1. **Frontmatter**: Kiểm tra tồn tại đầy đủ 12 trường bắt buộc và cấu trúc mảng `sections`.
2. **Khớp Section ID**: Kiểm tra từng `id` trong YAML có thẻ `## ... {#<id>}` tương ứng trong văn bản hay không.
3. **Phát hiện ASCII Art**: Báo lỗi ngay nếu phát hiện các chuỗi vẽ sơ đồ ký tự `+----+` hoặc `|---|`.
4. **Phát hiện lỗi LaTeX**: Báo lỗi các từ khóa toán học bị thiếu gạch chéo ngược (`rac{`, `imes`, `pm`).
5. **Cân bằng thẻ HTML**: Kiểm tra số lượng thẻ mở và thẻ đóng (`div`, `table`, `thead`, `tbody`, `tr`, `th`, `td`, `p`, `span`, `ul`, `li`, `strong`).
6. **Linh kiện cốt lõi**: Xác nhận có đủ `.stats-strip`, `.pillars-nav`, `.callout`, `.pitfall-card`, `.case-study-card`.

---

## 📋 6. CHECKLIST TỰ ĐÁNH GIÁ (DEFINITION OF DONE)

Trước khi xác nhận hoàn thành bất kỳ bài học nào trong Sổ tay Lâm sàng, hãy đánh dấu kiểm tra bảng checklist sau:

- [ ] File MDX nằm đúng thư mục `src/content/clinical-handbook/<specialty>/<disease>/<ma-benh>-<NN>-<chu-de-kebab-case>.mdx` (đã đổi tên từ file thô/nháp như `hh.mdx`, `dengue-03.mdx` và xóa file tên cũ).
- [ ] Tên file, trường `slug` trong Frontmatter YAML và `id`/`slug`/`filePath` trong `handbook-catalog.ts` khớp nhau 100%, dùng tiếng Việt không dấu chuẩn kebab-case.
- [ ] Khối Frontmatter YAML đầy đủ 100% metadata và mảng `sections` khớp với các `## ... {#sec-id}`.
- [ ] Có dải chỉ số 30s `.stats-strip` với 4 thẻ `.stat-card` chứa số liệu dịch tễ / cut-off then chốt.
- [ ] Có thanh điều hướng nhanh cố định `.pillars-nav` với các nút bấm neo liên kết.
- [ ] Không còn bất kỳ sơ đồ ASCII art đơn dòng nào; toàn bộ đã chuyển sang Responsive Grid Cards hoặc SVG.
- [ ] Các bảng thuốc, bảng đối chiếu đều được bọc trong `.table-card` và `.handbook-table-container`.
- [ ] Các công thức y sinh được trình bày trong `.katex-display-card` với KaTeX sạch.
- [ ] Có ít nhất 1–2 thẻ cạm bẫy `.pitfall-card` chỉ rõ sai sót thường gặp và hậu quả.
- [ ] Có ít nhất 1 ca lâm sàng thực chiến `.case-study-card` minh họa trực quan.
- [ ] Đã escape toàn bộ ký tự `<` thành `&lt;` và `>` thành `&gt;` trong văn bản và bảng.
- [ ] Đã đăng ký bài viết vào `src/content/clinical-handbook/data/handbook-catalog.ts`.
- [ ] Chạy `node tools/scratch/check_tags.js <file>.mdx` báo **100% cân bằng và hợp lệ**.
- [ ] Chạy `node .agents/skills/clinical-handbook-mdx-module/scripts/validate_handbook_mdx.mjs <file>.mdx` báo **0 lỗi**.
- [ ] `npm run build` thành công không gặp lỗi runtime hoặc vỡ layout.

