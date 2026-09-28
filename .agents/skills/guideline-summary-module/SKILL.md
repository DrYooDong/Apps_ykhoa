---
name: guideline-summary-module
description: >
  Tạo, cập nhật và tổng hợp các trang tóm tắt khuyến cáo lâm sàng và nghiên cứu y khoa (Guidelines / RCT Landmark)
  theo chuẩn Astro MDX Native tại src/content/ebm/guidelines/kho-guidelines/<slug>.mdx của CliniPortal.
  Kích hoạt khi AI cần tạo mới hoặc cập nhật guideline, tổng hợp từ file markdown đơn/đa phần (P1, P2, P3...), trích xuất ảnh đính kèm, hoặc làm việc với Kho Guidelines EBM.
---

# Guideline Summary Module Skill (Astro MDX Native Flagship)

Tài liệu này định nghĩa tiêu chuẩn thiết kế, cấu trúc mã nguồn, quy trình tổng hợp và các thành phần giao diện mẫu (Boilerplate) cho các trang tóm tắt hướng dẫn lâm sàng (Guidelines/RCT Landmark) tại phân hệ **Y học chứng cứ (EBM)** của CliniPortal (`src/content/ebm/guidelines/kho-guidelines/`).

---

## 🛑 MODULE RULES BẮT BUỘC (Quy tắc Module EBM Guidelines 2026)

1. **Chuẩn Định Dạng Astro MDX Native**: Mọi trang tóm tắt Guideline trong `src/content/ebm/guidelines/kho-guidelines/` được định dạng `.mdx` (Astro Content Collections), tuân thủ nghiêm ngặt YAML Frontmatter Schema và cú pháp JSX/HTML sạch.
2. **Quy Tắc Đặt Tên File & Slug**: File MDX mới phải đặt theo dạng `<year>-<org>-<topic>.mdx` (ví dụ: `2026-apasl-viem-gan-b.mdx`, `2024-byt-vgsvc.mdx`). Dùng 100% ASCII kebab-case chữ thường.
3. **Quy Trình Tổng Hợp Nguồn Đa Phần (Multi-part Synthesis Workflow)**: Khi nhận tài liệu nguồn chia thành nhiều phần (`_P1.md`, `_P2.md`, `_P3.md`...), AI bắt buộc:
   - Đọc và phân tích toàn bộ tất cả các phần để nắm trọn vẹn bức tranh tổng thể.
   - Sử dụng script tự động `node .agents/skills/guideline-summary-module/scripts/synthesize_guideline_mdx.js --slug=<slug> --files="<p1>,<p2>,<p3>"` để trích xuất ảnh và làm sạch văn bản ban đầu.
   - Biên tập, tái cấu trúc logic thành các phân mục (sections) chặt chẽ, không để sót bất kỳ thông tin nào.
4. **BẮT BUỘC XỬ LÝ HÌNH ẢNH ĐÍNH KÈM TỪ FILE NGUỒN (Image Asset Pipeline)**:
   - Khi file `.md` nguồn có chứa hình ảnh đính kèm (`![[Pasted image ...]]` hoặc `![alt](path)`):
   - **Bước 1**: Tự động tìm và sao chép file ảnh từ thư mục đính kèm (`knowledge-vault/_resources/attachments/`) sang `src/content/ebm/guidelines/kho-guidelines/images/` với tên chuẩn kebab-case: `<slug>-fig<X>.<ext>` (ví dụ: `2026-apasl-vgsv-fig1.png`).
   - **Bước 2**: Nhúng hình ảnh vào đúng vị trí tương ứng trong bài viết bằng thẻ `<div class="fig-card">`:
     ```html
     <div class="fig-card">
       <img src="./images/<slug>-fig<X>.png" alt="[Mô tả hình ảnh]" class="fig-img" loading="lazy" />
       <div class="fig-caption">
         <div class="fig-title">Figure X. [Tiêu đề hình ảnh]</div>
         [Mô tả chi tiết giải thích ý nghĩa lâm sàng dưới hình]
       </div>
     </div>
     ```
4.1. **QUY TẮC CHUYỂN ĐỔI LƯU ĐỒ HÌNH ẢNH SANG CODE TRỰC QUAN (Flowchart Image to Visual Code Rule)**:
   - **Phát hiện & Phân định vai trò**:
     - Khi trong file `.md` nguồn có **hình ảnh lưu đồ** (lưu đồ chẩn đoán, phân tầng cấp cứu, thuật toán điều trị, sơ đồ PRISMA, visual summary...) kèm theo **đoạn text mô tả / khối ASCII tóm tắt**:
     - **Bản chất của đoạn text/ASCII**: Đoạn text/ASCII đó **chỉ là bản tóm tắt ý lại (fallback)** để hỗ trợ đọc khi không có phương tiện xem ảnh.
   - **Nguyên tắc hành động cốt lõi**:
     - **NẾU CÓ ẢNH LƯU ĐỒ**: Bắt buộc nhúng ảnh (`.fig-card`) VÀ **sửa/tái hiện thành CODE trực quan** (Inline SVG Editorial Flowchart chuẩn `flowchart-module` hoặc linh kiện HTML/CSS visual nodes/cards tương tác) mô phỏng chính xác cấu trúc phân nhánh, màu sắc và thiết kế của lưu đồ trong ảnh. **Tuyệt đối KHÔNG giữ lại khối text/ASCII sơ sài** khi đã có ảnh lưu đồ.
     - **NẾU KHÔNG CÓ ẢNH LƯU ĐỒ**: Chỉ khi file nguồn hoàn toàn không có ảnh đính kèm, AI mới sử dụng đoạn text mô tả hoặc khối ASCII chuẩn hóa để tái hiện logic lưu đồ.
5. **BẢO TỒN 100% TOÀN VẸN NỘI DUNG Y KHOA (100% Medical Content Integrity)**:
   - File `.md` nguồn chứa các tri thức y khoa đã được tóm tắt kỹ lưỡng từ các nghiên cứu/guidelines (mốc chỉ số, tiêu chuẩn chẩn đoán, bảng/sơ đồ TABLE & FIGURE, tên thử nghiệm RCT, chỉ số HR/OR/RR/%, phân tích phân nhóm, tài liệu tham khảo chuẩn AMA).
   - **TUYỆT ĐỐI KHÔNG LƯỢC BỎ, CẮT NGẮN HAY LÀM MẤT BẤT KỲ THÔNG TIN NÀO**.
6. **CẤM TRÌNH BÀY DẠNG TEXT ĐƠN ĐIỆU (Visual Clinical Dashboard Architecture)**:
   - Trang tóm tắt Guideline **KHÔNG ĐƯỢC** chỉ chứa các đoạn chữ (paragraph) hay danh sách bullet đơn thuần.
   - Bắt buộc chuyển đổi mọi khuyến cáo lâm sàng thành hệ thống trực quan:
     - Thẻ thống kê nổi bật (`.stats-strip` + `.stat-card`).
     - 3 Trụ cột cốt lõi (`.pillars` + `.pillar.p1/p2/p3`).
     - Thanh điều hướng nhanh (`.quickmenu`).
     - Khung phân mục chuyên đề (`.sec-card` + `.sec-hdr` + `.sec-body`).
     - Bento Grid Cards (`.updates-grid`, `.update-card`, `.matrix-grid`).
     - Bảng phác đồ & liều dùng chuẩn (`.table-wrapper`, `.regimen-table`, `.source-cell`, `.rx-tag`).
     - Infoboxes cảnh báo màu sắc (`.infobox.danger`, `.warning`, `.success`, `.info`).
     - Thẻ phân cấp chứng cứ EBM (`.ebm-grade`, `.cor-badge`, `.loe-badge`).
7. **BẮT BUỘC KIỂM TRA & LÀM SẠCH LỖI $ (Math LaTeX Formatting Cleanup)**:
   - Trước khi hoàn tất, **BẮT BUỘC** làm sạch 100% ký tự `$` math LaTeX (`$BMI \ge 25$` $\rightarrow$ `BMI ≥ 25`, `$ALT \ge 40$` $\rightarrow$ `ALT ≥ 40`, `$\ge 150\text{ mg/dL}$` $\rightarrow$ `≥ 150 mg/dL`, `$\ge 20\%$` $\rightarrow$ `≥ 20%`).
8. **KỸ THUẬT GHI FILE LỚN AN TOÀN (Safe Large-File Writing Pattern)**:
   - Đối với các file MDX lớn (30KB – 60KB+), **tránh truyền chuỗi multiline quá dài qua PowerShell command-line** vì sẽ bị lỗi hệ điều hành Windows *"The filename or extension is too long"*.
   - Sử dụng Node.js script / Python helper script hoặc công cụ ghi file trực tiếp để ghi file UTF-8 an toàn.
9. **Kiểm Tra HTML & Tag Integrity**: Chạy `node tools/scratch/check_tags.js <file>.mdx` sau khi tạo/sửa để đảm bảo không có thẻ mở/đóng sai lệch hoặc lỗi cú pháp JSX.
10. **Bắt Buộc Đăng Ký Kho Lưu Trữ Tĩnh (`kho-guidelines-registry.ts`)**: Mọi guideline mới tạo phải bổ sung 1 bản ghi vào array `KHO_GUIDELINES_STATIC` trong `src/content/ebm/guidelines/js/kho-guidelines-registry.ts` (tự động nạp vào `SAMPLE_STUDIES` và `window.studies`).
11. **TIÊU CHUẨN TÓM TẮT NGHIÊN CỨU & LANDMARK RCTS CHUẨN NATURE (Nature-Grade Medical Research Card Standard)**: Khi tóm tắt các thử nghiệm lâm sàng trọng điểm (Landmark RCTs từ NEJM, Lancet, JAMA, Nature Medicine...), bắt buộc áp dụng toàn diện **Khung 16 Mục Chuẩn Hóa** từ Skill `medical-research-card` và `GUIDELINE_MDX_DESIGN_SPEC.md` Mục 12: Khung PICO Bento Grid (`.pico-bento-grid`), Bảng Điểm Kết Thúc Thử Nghiệm (`.trial-endpoints-table`), Đánh giá Nguy cơ Sai lệch Cochrane RoB 2.0 (`.rob-card`), và Hộp Phán Quyết Thực Hành Lâm Sàng (`.verdict-box`).

---

## 📁 Cấu trúc Thư mục Guidelines EBM

```
src/content/ebm/guidelines/
├── guidelines.html                       # Trang tra cứu Guidelines (Cấp 3)
├── guidelines.css                        # CSS cho trang tra cứu
├── js/
│   ├── kho-guidelines-registry.ts        # Kho Metadata tĩnh tập trung (KHO_GUIDELINES_STATIC 105+ bài)
│   ├── guidelinesdata.ts                 # Danh mục & nạp KHO_GUIDELINES_STATIC -> SAMPLE_STUDIES
│   ├── guideline-sync.ts                 # Bộ điều phối Lưu trữ Cục bộ & Khử trùng lặp
│   └── guidelines.ts                     # Controller chính
└── kho-guidelines/                       # Thư mục chứa các file .mdx chi tiết
    ├── images/                           # Thư mục chứa ảnh minh họa figure trích xuất
    │   ├── 2026-apasl-vgsv-fig1.png
    │   └── 2026-apasl-vgsv-fig2.png
    ├── 2026-apasl-viem-gan-b.mdx         # File Guideline APASL 2026 MDX
    ├── 2024-byt-vgsvc.mdx                # File Guideline BYT VGSVC MDX
    └── 2025-aha-acc-hypertension.mdx     # File Guideline AHA/ACC 2025 MDX
```

---

## 🧱 Cấu Trúc File MDX Native Chuẩn (Boilerplate)

```mdx
---
title: "[Tên Guideline Tiếng Việt Chuẩn]: [Tiêu đề phụ]"
slug: "[year]-[org]-[topic]"
code: "GDL-[YEAR]-[ORG]-[TOPIC]"
organization: "[Tên Hội/Tổ chức, ví dụ: APASL / KDIGO / Bộ Y Tế / AHA]"
year: "2026"
category: "guidelines"
status: "published"
version: "3.0.0"
updatedAt: "2026-08-31"
cor: "I"
loe: "A"
description: "[Mô tả súc tích 150-160 ký tự về nội dung guideline]"
tags:
  - "[Tổ chức]"
  - "[Năm]"
  - "[Chủ đề lâm sàng]"
  - "Khuyến cáo lâm sàng"
  - "Evidence-Based Medicine"
keyRecommendations:
  - "[Khuyến cáo cốt lõi 1]"
  - "[Khuyến cáo cốt lõi 2]"
  - "[Khuyến cáo cốt lõi 3]"
  - "[Khuyến cáo cốt lõi 4]"
sections:
  - id: "sec-1"
    number: 1
    title: "[Tên Mục 1]"
    icon: "fa-solid fa-book-medical"
  - id: "sec-2"
    number: 2
    title: "[Tên Mục 2]"
    icon: "fa-solid fa-pills"
  - id: "sec-3"
    number: 3
    title: "[Tên Mục 3]"
    icon: "fa-solid fa-chart-area"
---

<div class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val green">[Chỉ số/Mốc 1]</div>
      <div class="stat-lbl">[Ý nghĩa lâm sàng]</div>
    </div>
    <div class="stat-card">
      <div class="stat-val blue">[Chỉ số/Mốc 2]</div>
      <div class="stat-lbl">[Ý nghĩa lâm sàng]</div>
    </div>
    <div class="stat-card">
      <div class="stat-val amber">[Chỉ số/Mốc 3]</div>
      <div class="stat-lbl">[Ý nghĩa lâm sàng]</div>
    </div>
    <div class="stat-card">
      <div class="stat-val red">[Chỉ số/Mốc 4]</div>
      <div class="stat-lbl">[Ý nghĩa lâm sàng]</div>
    </div>
  </div>
</div>

<div class="pillars">
  <div class="pillars-inner">
    <div class="pillar p1">
      <div class="pillar-icon">🔄</div>
      <div>
        <div class="pillar-title">[Trụ cột 1]</div>
        <div class="pillar-desc">[Tóm tắt điểm cốt lõi 1-2 câu]</div>
      </div>
    </div>
    <div class="pillar p2">
      <div class="pillar-icon">🎯</div>
      <div>
        <div class="pillar-title">[Trụ cột 2]</div>
        <div class="pillar-desc">[Tóm tắt điểm cốt lõi 1-2 câu]</div>
      </div>
    </div>
    <div class="pillar p3">
      <div class="pillar-icon">🔍</div>
      <div>
        <div class="pillar-title">[Trụ cột 3]</div>
        <div class="pillar-desc">[Tóm tắt điểm cốt lõi 1-2 câu]</div>
      </div>
    </div>
  </div>
</div>

<div class="quickmenu" id="quickmenu">
  <div class="quickmenu-inner">
    <a href="#sec-1" class="quickmenu-item active">1. [Mục 1]</a>
    <a href="#sec-2" class="quickmenu-item">2. [Mục 2]</a>
    <a href="#sec-3" class="quickmenu-item">3. [Mục 3]</a>
  </div>
</div>

<div class="page-content">

  <!-- SECTION CARD 1 -->
  <div class="sec-card" id="sec-1">
    <div class="sec-hdr"><span class="sec-hdr-icon">🔬</span> <h2 class="sec-title">[Tiêu đề phân mục 1]</h2></div>
    <div class="sec-body">
      
      <!-- Fig Card nếu có ảnh -->
      <div class="fig-card">
        <img src="./images/[slug]-fig1.png" alt="[Tiêu đề]" class="fig-img" loading="lazy" />
        <div class="fig-caption">
          <div class="fig-title">[Tiêu đề hình ảnh]</div>
          [Giải thích ý nghĩa lâm sàng]
        </div>
      </div>

      <!-- Infoboxes -->
      <div class="infobox info">
        <span class="infobox-icon">💡</span>
        <div>
          <strong>[Tiêu đề Infobox]</strong>
          [Nội dung thông tin quan trọng]
        </div>
      </div>

      <!-- Updates Grid -->
      <div class="updates-grid">
        <div class="update-card">
          <div class="update-card-accent" style="background: #0f6fb4;"></div>
          <div class="update-card-header">
            <div class="update-card-icon" style="background: #eff6ff; color: #0f6fb4;">🩺</div>
            <div class="update-card-title">[Tiêu đề thẻ]</div>
          </div>
          <div class="update-card-body">
            <ul style="margin-left: 1rem; line-height: 1.7;">
              <li>[Điểm 1]</li>
              <li>[Điểm 2]</li>
            </ul>
          </div>
          <div class="update-verdict verdict-blue">[Nhãn kết luận]</div>
        </div>
      </div>

      <!-- Table Card Standard Component -->
      <div class="table-card">
        <div class="table-header">
          <div class="table-title">
            <i class="fa-solid fa-pills"></i> Bảng 1. Phác Đồ Điều Trị Dược Lý Khuyến Cáo
          </div>
          <span class="table-badge"><i class="fa-solid fa-prescription-bottle-medical"></i> Phác đồ điều trị</span>
        </div>
        <div class="table-wrapper">
          <table class="regimen-table">
            <thead>
              <tr>
                <th style="width:20%">Phác đồ / Thuốc</th>
                <th style="width:40%">Chỉ định &amp; Liều lượng</th>
                <th style="width:40%">Lưu ý lâm sàng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="source-cell"><span class="rx-tag preferred">Ưu tiên</span> [Tên thuốc]</td>
                <td>[Liều dùng, đường dùng, thời gian]</td>
                <td>[Chỉnh liều, tác dụng phụ]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>

  <!-- CITATION BOX -->
  <div class="citation-box">
    <strong>Tài liệu gốc:</strong> [Trích dẫn chuẩn AMA bao gồm Tác giả, Tên bài, Tạp chí, Năm, DOI/PMID]
  </div>

</div>

<!-- BOTTOM NAV -->
<div style="margin-top: 1.5rem;">
  <div class="btn-row">
    <a href="#/ebm/kho-guidelines" class="btn btn-primary">
      <i class="fa-solid fa-arrow-left"></i> Quay lại Kho Guidelines
    </a>
    <a href="#sec-1" class="btn">
      <i class="fa-solid fa-arrow-up"></i> Lên đầu trang
    </a>
  </div>
</div>
```

---

## ⚡ Quy Trình 5 Bước Tối Ưu Nhanh & Không Lỗi (v2.0 Pipeline)

> **Mục tiêu**: Nhanh hơn ×3, Loại bỏ 100% lỗi cú pháp và tự động hóa toàn diện từ tiền xử lý đến đăng ký và kiểm định chất lượng.

```
┌───────────────────────────────────────────────────────────────────────────┐
│                      PIPELINE TỔNG HỢP GUIDELINE v2.0                     │
│                                                                           │
│ [1] Khảo sát Nguồn ──> [2] Trích Xuất Ảnh ──> [3] Load Template & Biên Tập│
│                        (synthesize script)     (template-guideline / rct) │
│                                                                 │         │
│                                                                 ▼         │
│                        [5] 8-Point QA Gate ◄── [4] Đăng Ký Registry Tự Động│
│                            (qa_guideline.js)        (register_guideline.js)│
└───────────────────────────────────────────────────────────────────────────┘
```

### 1. Khảo sát Nguồn & Chọn Template Phù Hợp:
- Xác định toàn bộ các file `.md` nguồn được giao (`_P1.md`, `_P2.md`...).
- Chọn mẫu template dựng sẵn tương ứng trong thư mục `templates/`:
  - **Hướng dẫn / Phác đồ điều trị / Khuyến cáo**: Dùng `templates/template-guideline.mdx`
  - **Thử nghiệm lâm sàng trọng điểm (RCT Landmark)**: Dùng `templates/template-rct.mdx`
- Tìm kiếm các ảnh `![[Pasted image ...]]` trong nguồn, đặc biệt là ảnh liên quan đến lưu đồ, thuật toán, phân loại.
- **Quy tắc Lưu đồ**: Nếu nguồn có ảnh lưu đồ kèm đoạn text tóm tắt ý, ưu tiên tái hiện thành code visual/SVG theo thiết kế của ảnh.

### 2. Chạy Script Trích Xuất Ảnh & Tiền Xử Lý:
```bash
node .agents/skills/guideline-summary-module/scripts/synthesize_guideline_mdx.js --slug=<slug> --files="<path1>,<path2>,..."
```
- Script tự động tìm ảnh trong `knowledge-vault/`, copy sang `kho-guidelines/images/<slug>-figX.png`, và làm sạch ban đầu ký tự math `$`.

### 3. Biên Tập Nội Dung Dựa Trên Template (Tiết Kiệm 70% Thời Gian):
- Sao chép cấu trúc từ `templates/template-guideline.mdx` hoặc `templates/template-rct.mdx`.
- Điền dữ liệu thực tế vào các placeholder `[BRACKET]`.
- Giữ nguyên cấu trúc thẻ chuẩn HTML, Design Tokens `var(--color-...)`, thẻ thống kê `.stats-strip`, `.pillars`, và `.quickmenu`.
- **QUY CHUẨN THIẾT KẾ BẢNG Y KHOA (TABLE DESIGN STANDARD) — BẮT BUỘC 100%**:
  1. **Cấu trúc bao đóng**: Mọi bảng bắt buộc bọc trong `.table-card` với `.table-header` và `.table-wrapper`:
     ```html
     <div class="table-card">
       <div class="table-header">
         <div class="table-title"><i class="fa-solid fa-..."></i> Bảng X. [Tiêu Đề]</div>
         <span class="table-badge"><i class="fa-solid fa-..."></i> [Nhãn]</span>
       </div>
       <div class="table-wrapper">
         <table class="[LỚP-CHUYÊN-BIỆT]">...</table>
       </div>
     </div>
     ```
  2. **CẤM đặt tiêu đề bên trong `.table-wrapper`**: Tuyệt đối không đặt `<h3>` hoặc `.table-title` vào trong `.table-wrapper` vì sẽ bị trượt ngang khi cuộn trên thiết bị di động.
  3. **CẤM dùng `.regimen-table` bừa bãi**: Phải chọn đúng lớp bảng phù hợp theo bản chất dữ liệu:
     - `.regimen-table`: Phác đồ thuốc, y lệnh, phân liều (cột 1 in đậm tên thuốc).
     - `.diagnostic-table`: Tiêu chuẩn chẩn đoán (IAIHG, Korman, Banff, ACR...).
     - `.score-table`: Thang điểm lượng giá, nguy cơ (Leipzig, NWI, Child-Pugh, MELD, RUCAM). Điểm số dùng `.score-badge.score-pos` (+), `.score-badge.score-neg` (-), `.score-badge.score-neu` (0). Hàng tổng kết dùng `<tr class="total-row">`.
     - `.comparison-table`: Bảng đối sánh triệu chứng cơ quan, danh mục thuốc/thảo dược, xét nghiệm.
     - `.trial-endpoints-table`: Biến cố kết cục RCT, nguy cơ tương đối (HR/RR), p-value.
- Ghi file vào `src/content/ebm/guidelines/kho-guidelines/<slug>.mdx`.

### 4. Đăng Ký Tự Động Vào Kho Registry:
- Sử dụng script tự động hóa để cập nhật `kho-guidelines-registry.ts` và kiểm tra đối chiếu `guidelinesdata.ts`:
```bash
node .agents/skills/guideline-summary-module/scripts/register_guideline.js \
  --slug="<slug>" \
  --title="[Tên Tiếng Việt Chuẩn]" \
  --titleEn="[Tên Tiếng Anh]" \
  --org="[Tổ Chức]" \
  --year=[Năm] \
  --specialty="[Mã chuyên khoa: gi / cardio / infect / endo / ...]" \
  --sourceType="intl-guideline" \
  --design="guideline" \
  --impact="practice-changing" \
  --conditionKey="[key bệnh lý]" \
  --icd10="[Mã ICD-10, ví dụ: K71,K71.0]" \
  --summary="[Tóm tắt súc tích 2-3 câu]" \
  --intervention="[Can thiệp cốt lõi]"
```

### 5. Chạy Cổng Kiểm Định Chất Lượng 8 Điểm (8-Point QA Gate):
- Chạy lệnh kiểm tra tổng thể toàn bộ bài viết trước khi bàn giao:
```bash
node .agents/skills/guideline-summary-module/scripts/qa_guideline.js --slug=<slug>
```
- **Bộ 8 Tiêu chí Đánh giá Tự động**:
  1. `[1/8]` File tồn tại và đúng kích thước.
  2. `[2/8]` Frontmatter YAML đầy đủ 11 trường chuẩn.
  3. `[3/8]` 100% Sạch ký tự math LaTeX `$`.
  4. `[4/8]` Cấu trúc thẻ HTML cân bằng tuyệt đối (không sót thẻ mở/đóng).
  5. `[5/8]` Toàn bộ liên kết hình ảnh `./images/...` tồn tại thực tế.
  6. `[6/8]` Không có lỗi trùng lặp HTML entities (`&amp;amp;`).
  7. `[7/8]` Đã đăng ký hợp lệ trong `kho-guidelines-registry.ts`.
  8. `[8/8]` `conditionKey` tương thích với `guidelinesdata.ts`.
- **Yêu cầu nghiệm thu**: Đạt tối thiểu **7.5/8 điểm** mới được coi là hoàn tất.


