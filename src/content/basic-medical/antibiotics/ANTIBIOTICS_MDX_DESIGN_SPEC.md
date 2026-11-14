# 📜 HƯỚNG DẪN THIẾT KẾ & TRÌNH BÀY GIAO DIỆN CÁC FILE MDX PHÂN HỆ KHÁNG SINH HỌC
> **Tài liệu**: Antibiotics MDX UI/UX & Component Design Specification  
> **Vị trí áp dụng**: `src/content/basic-medical/antibiotics/`  
> **Dành cho**: AI Agents & Lập trình viên bên ngoài tham gia chỉnh sửa, cập nhật hoặc tạo mới các bài học `.mdx`.  
> **Phiên bản Engine**: CliniPortal 2.0 (Pure TypeScript MDX Engine — Zero-Runtime Dependency)  
> **Chuẩn Y khoa**: WHO AWaRe 2023, Sanford Guide 2024-2026, IDSA/ATS & Bộ Y tế Việt Nam.

---

## 📑 MỤC LỤC
1. [Tổng Quan Kiến Trúc Phân Hệ Kháng Sinh Học (`antibiotics/`)](#1-tổng-quan-kiến-trúc-phân-hệ-kháng-sinh-học)
2. [Cơ Chế Render Của CliniPortal MDX Engine](#2-cơ-chế-render-của-cliniportal-mdx-engine)
3. [Quy Chuẩn Master Design Tokens & Dark Mode](#3-quy-chuẩn-master-design-tokens--dark-mode)
4. [Thành Phần 1: Cấu Trúc Khối Frontmatter YAML Chuẩn Hóa](#thành-phần-1-cấu-trúc-khối-frontmatter-yaml-chuẩn-hóa)
5. [Thành Phần 2: Hero Header & Module Badges Group](#thành-phần-2-hero-header--module-badges-group)
6. [Thành Phần 3: Thanh Điều Hướng Nhanh Sticky (`<AntibioticQuickNav />`)](#thành-phần-3-thanh-điều-hướng-nhanh-sticky-antibioticquicknav-)
7. [Thành Phần 4: Huy Hiệu Phân Tầng WHO AWaRe (`<AWaRePill />`)](#thành-phần-4-huy-hiệu-phân-tầng-who-aware-awarepill-)
8. [Thành Phần 5: Đồ Họa Xuất Bản Editorial Pure SVG Studio (`.flowchart-card`)](#thành-phần-5-đồ-họa-xuất-bản-editorial-pure-svg-studio-flowchart-card)
9. [Thành Phần 6: Bảng Dược Lý & Ma Trận Tra Cứu Lâm Sàng](#thành-phần-6-bảng-dược-lý--ma-trận-tra-cứu-lâm-sàng)
10. [Thành Phần 7: Biểu Thức Toán Y Sinh & KaTeX PK/PD Notation](#thành-phần-7-biểu-thức-toán-y-sinh--katex-pkpd-notation)
11. [Thành Phần 8: Khung Ghi Chú Y Khoa (Infoboxes & Alerts)](#thành-phần-8-khung-ghi-chú-y-khoa-infoboxes--alerts)
12. [Thành Phần 9: Trích Dẫn Y Văn Chuẩn AMA & Điều Hướng Cuối Bài](#thành-phần-9-trích-dẫn-y-văn-chuẩn-ama--điều-hướng-cuối-bài)
13. [Bộ 8 Quy Tắc Bất Di Bất Dịch Khi Soạn Thảo MDX (Zero-Tolerance Rules)](#bộ-8-quy-tắc-bất-di-bất-dịch-khi-soạn-thảo-mdx)
14. [Bảng Kiểm Tự Động Hóa (Self-Audit Checklist)](#bảng-kiểm-tự-động-hóa-self-audit-checklist)
15. [Golden Template: File MDX Mẫu Chuẩn Hoàn Chỉnh](#golden-template-file-mdx-mẫu-chuẩn-hoàn-chỉnh)

---

## 1. TỔNG QUAN KIẾN TRÚC PHÂN HỆ KHÁNG SINH HỌC

Toàn bộ nội dung phân hệ Kháng Sinh Học Lâm Sàng (Antimicrobial Stewardship - AMS) nằm tại `src/content/basic-medical/antibiotics/`, được tổ chức thành **6 Modules đào tạo** gồm **17 bài học `.mdx`** cùng hệ sinh thái linh kiện, dữ liệu và công cụ tương tác:

```text
src/content/basic-medical/antibiotics/
├── ANTIBIOTICS_MDX_DESIGN_SPEC.md        # File đặc tả thiết kế giao diện (File hiện tại)
├── README.md                             # Tài liệu tổng quan phân hệ
├── index.ts                              # Barrel export
├── module1-vi-sinh/                      # Module 1: Vi Sinh Y Học & Phân Nhóm Vi Khuẩn (2 bài)
│   ├── ks-1-1-cau-truc-vi-khuan-phan-loai.mdx
│   └── ks-1-2-nhuom-gram-xet-nghiem-vi-sinh.mdx
├── module2-phan-loai-aware/              # Module 2: Bảng Tuần Hoàn & Phân Tầng AWaRe (2 bài)
│   ├── ks-2-1-co-che-tac-dung-cau-truc-hoa-hoc.mdx
│   └── ks-2-2-khung-aware-who-den-tin-hieu.mdx
├── module3-pk-pd-duong-dung/             # Module 3: PK/PD & Tối Ưu Hóa Đường Dùng (3 bài)
│   ├── ks-3-1-chi-so-pk-pd-co-ban.mdx
│   ├── ks-3-2-pho-tac-dong-cua-cac-loai-khang-sinh.mdx
│   └── ks-3-3-duong-dung-chuyen-doi-iv-sang-po.mdx
├── module4-ke-don-an-toan-adr/           # Module 4: Kê Đơn An Toàn, Tương Tác DDI & Độc Tính (4 bài)
│   ├── ks-4-1-bang-kiem-8-dieu-d8-checklist.mdx
│   ├── ks-4-2-nguyen-tac-phoi-hop-tranh-trung-lap.mdx
│   ├── ks-4-3-tac-dung-phu-doc-tinh-khang-sinh.mdx
│   └── ks-4-4.mdx
├── module5-di-ung-beta-lactam/           # Module 5: Dị Ứng Beta-Lactam, Quinolone & Phản Ứng Chéo (3 bài)
│   ├── ks-5-1-phan-biet-di-ung-that-vs-adr.mdx
│   ├── ks-5-2-ty-le-phan-ung-cheo-beta-lactam.mdx
│   └── ks-5-3-di-ung-khang-sinh-quinolone-va-chien-luoc-thay-the.mdx
├── module6-phac-do-ngoai-tru/            # Module 6: Phác Đồ Ngoại Trú Chuẩn EBM (3 bài)
│   ├── ks-6-1-dieu-tri-cap-the-nhe.mdx
│   ├── ks-6-2-dieu-tri-uti-khong-bien-chung.mdx
│   └── ks-6-3-dieu-tri-ssti-the-nhe.mdx
├── components/                           # Linh kiện UI chuyên biệt phân hệ
│   ├── AntibioticQuickNav.ts             # Sticky Nav cho bài giảng kháng sinh
│   └── AWaRePill.ts                      # Huy hiệu WHO AWaRe 2023
├── data/
│   └── antibiotics-curriculum-data.ts    # CSDL 6 Modules, 16 Bài học & 5 Công cụ
├── types/
│   └── antibiotics.types.ts              # Định nghĩa Typescript interfaces
└── views/                                # Views render Hub và Tools
    ├── antibiotics-hub-view.ts
    └── antibiotics-tools-view.ts
```

---

## 2. CƠ CHẾ RENDER CỦA CLINIPORTAL MDX ENGINE

Các bài viết `.mdx` trong phân hệ này được phân tích bởi **`CliniMdxEngine`** (`src/core/mdx-engine.ts`), một engine TypeScript thuần được thiết kế để:
1. **Không phụ thuộc thư viện runtime nặng nề**: Chạy mượt mà cả trong chế độ `file:///` offline lẫn trên Web Server.
2. **Quy trình xử lý 5 bước**:
   - **Bước 1 (Trích xuất Frontmatter)**: Quét khối YAML `--- ... ---` ở đầu file, parse các trường cơ bản và mảng lồng nhau (`sections: [...]`).
   - **Bước 2 (Làm sạch & Stash bảo vệ)**: Loại bỏ các lệnh `import` hoặc comments `{/* ... */}`; cất toàn bộ các khối `<svg>...</svg>`, `<script>...</script>`, `<style>...</style>` vào `stashMap` tạm thời để parser Markdown không phá vỡ cú pháp.
   - **Bước 3 (Chuyển đổi Custom MDX Components)**: Tìm và thay thế các thẻ đặc biệt như `<AntibioticQuickNav />`, `<AWaRePill tier="..." />` thành HTML tĩnh tương ứng.
   - **Bước 4 (Render Markdown)**: Biến đổi tiêu đề có anchor (`## X. ... <span id="..."></span>`), in đậm, bảng, KaTeX Math (`$...$`, `$$...$$`).
   - **Bước 5 (Hoàn nguyên Stash)**: Đưa lại nội dung SVG nguyên vẹn vào cây DOM HTML cuối cùng.

> [!IMPORTANT]
> **Hệ quả cho AI khi chỉnh sửa file `.mdx`**:
> - File `.mdx` là file văn bản lai (Hybrid Text/HTML/Markdown).
> - **KHÔNG** được thêm cấu trúc khung HTML toàn trang như `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`.
> - **KHÔNG** dùng lệnh `import React ...` vì bài học được biên dịch qua custom pipeline.

---

## 3. QUY CHUẨN MASTER DESIGN TOKENS & DARK MODE

Mọi màu sắc, nền thẻ, đường viền trong file MDX phải kế thừa hệ thống **Design Tokens chuẩn của CliniPortal**, tuyệt đối **không hardcode màu hex ngẫu nhiên**:

```css
/* --- Semantic Clinical Palette --- */
var(--dsp-sky, #0284c7)          /* Xanh dương lâm sàng chủ đạo (Kháng sinh học, Vi sinh) */
var(--dsp-emerald, #10b981)      /* Xanh lá: Nhóm ACCESS WHO, An toàn, Tiên lượng tốt */
var(--dsp-amber, #f59e0b)        /* Vàng/Cam: Nhóm WATCH WHO, Cảnh báo, Cần giám sát */
var(--dsp-rose, #ef4444)         /* Đỏ: Nhóm RESERVE WHO, Cấm chỉ định, Cờ đỏ, Độc tính cao */
var(--dsp-violet, #8b5cf6)       /* Tím: Cơ chế phân tử, Gen đề kháng, Enzyme, Dược lý */
var(--dsp-teal, #0d9488)         /* Xanh mòng két: Xét nghiệm Vi sinh, Nhuộm Gram, MIC */

/* --- Dark Mode Surface System --- */
/* Mặc định chế độ Dark First: */
var(--color-bg, #090d16)         /* Nền bài viết tối sâu */
var(--color-surface, #0f172a)    /* Nền card, thẻ bảng, hộp SVG */
var(--color-surface-2, #1e293b)  /* Nền cấp 2, hover table, formula box */
var(--color-border, #334155)     /* Đường viền phân cách */
var(--color-text, #f1f5f9)       /* Màu chữ chính */
var(--color-text-muted, #94a3b8) /* Màu chú thích phụ */

/* Chế độ Light Mode (Tự động kích hoạt khi html mang attribute data-theme="light") */
[data-theme="light"] {
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-surface-2: #f1f5f9;
  --color-border: #e2e8f0;
  --color-text: #0f172a;
  --color-text-muted: #64748b;
}
```

---

## THÀNH PHẦN 1: CẤU TRÚC KHỐI FRONTMATTER YAML CHUẨN HÓA

Mỗi file `.mdx` bắt buộc mở đầu bằng khối Frontmatter YAML đóng trong 2 dòng `---`. Khối này định danh metadata cho bài học trong hệ thống mục lục, thanh tiến độ và thanh điều hướng:

```yaml
---
title: "Tên bài học đầy đủ (Viết hoa chữ cái đầu hoặc Title Case)"
slug: "ks-x-y-ten-bai-viet-kebab-case"
module: "moduleX-ten-module"
moduleLabel: "Module X: Tên Module Đầy Đủ"
moduleNumber: 1                         # Số thứ tự module (1 đến 6)
lessonNumber: 1                         # Số thứ tự bài trong module (1, 2, 3...)
order: 1                                # Số thứ tự toàn khóa (1 đến 16)
aware: "access"                         # (Tùy chọn) Phân tầng AWaRe nếu bài chuyên đề về nhóm thuốc: "access" | "watch" | "reserve" | "discouraged"
tags:
  - "Từ khóa 1"
  - "Từ khóa 2"
  - "Kháng sinh"
difficulty: "foundation"                # Mức độ: "foundation" | "intermediate" | "advanced"
estimatedTime: 20                       # Thời gian đọc ước tính (phút)
lastUpdated: "2026-10-31"               # Ngày cập nhật định dạng YYYY-MM-DD
sections:
  - id: "sec-1"
    number: 1
    title: "Tên Phần 1 Ngắn Gọn"
    icon: "fa-microscope"              # (Tùy chọn) FontAwesome icon name
  - id: "sec-2"
    number: 2
    title: "Tên Phần 2 Ngắn Gọn"
    icon: "fa-layer-group"
  - id: "sec-3"
    number: 3
    title: "Tên Phần 3 Ngắn Gọn"
    icon: "fa-table"
  - id: "sec-4"
    number: 4
    title: "Tài Liệu Tham Khảo (AMA Style)"
    icon: "fa-book-medical"
---
```

> [!CAUTION]
> **Ràng buộc quan trọng**: Các phần tử `id` trong danh sách `sections` (ví dụ `sec-1`, `sec-2`) **BẮT BUỘC** phải khớp chính xác với `id` gắn trên các thẻ Heading trong thân bài viết. Nếu không khớp, thanh điều hướng nhanh sẽ không cuộn tới được vị trí mong muốn.

---

## THÀNH PHẦN 2: HERO HEADER & MODULE BADGES GROUP

Ngay sau khối Frontmatter, giao diện mở đầu bài học bao gồm **Tiêu đề cấp 1 (`#`)** và **Khối huy hiệu phân hệ (`module-badge-group`)**:

### Cú pháp chuẩn:
```markdown
# 🛡️ TIÊU ĐỀ BÀI HỌC IN HOA TOÀN BỘ

<div class="module-badge-group">
  <span class="badge badge-teal"><i class="fa-solid fa-shield-virus"></i> Kháng Sinh Học Lâm Sàng</span>
  <span class="badge badge-blue"><i class="fa-solid fa-bacterium"></i> Module 1 • Vi Sinh Y Học</span>
  <span class="badge badge-purple"><i class="fa-solid fa-layer-group"></i> Cấu Trúc Tế Bào Vi Khuẩn</span>
</div>
```

### Các lớp màu Badge hỗ trợ sẵn:
- `.badge-teal`: Xanh mòng két (Chuyên khoa, Dược lý, Vi sinh).
- `.badge-blue`: Xanh dương (Tên Module, Học phần).
- `.badge-purple`: Tím (Chủ đề phân tử, Cơ chế).
- `.badge-emerald`: Xanh lá (Chuẩn EBM, Hướng dẫn WHO, Access Tier).
- `.badge-amber`: Vàng/Cam (Watch Tier, Cảnh báo).
- `.badge-rose`: Đỏ (Reserve Tier, Kháng đa thuốc MDR/XDR).

---

## THÀNH PHẦN 3: THANH ĐIỀU HƯỚNG NHANH STICKY (`<AntibioticQuickNav />`)

Ngay dưới `module-badge-group`, bắt buộc chèn một Custom Tag đơn:

```html
<AntibioticQuickNav />
```

### Cách thức hoạt động:
- `CliniMdxEngine` tự động đọc mảng `sections` trong Frontmatter của bài viết.
- Sinh ra một thanh điều hướng Sticky nổi ở đỉnh trang (`top: 60px; z-index: 90`), có hiệu ứng kính mờ (`backdrop-filter: blur(12px)`).
- Chứa danh sách các nút tab trượt ngang (Horizontal Scroll), hiển thị số thứ tự và tiêu đề từng phần.
- Khi người dùng bấm vào tab, trang sẽ cuộn mượt mà (Smooth Scroll) đến mục tương ứng.

### Cách gắn ID tương ứng trên các Tiêu Đề (`##`):
Để thanh QuickNav bắt được vị trí cuộn, viết các tiêu đề cấp 2 (`H2`) theo cú pháp chuẩn:

```markdown
## 1. Định Hướng Lâm Sàng & Ý Nghĩa Kiến Thức <span id="sec-1"></span>

Nội dung chi tiết của phần 1...

---

## 2. Hình Thái & Sự Sắp Xếp Của Vi Khuẩn <span id="sec-2"></span>

Nội dung chi tiết của phần 2...
```

---

## THÀNH PHẦN 4: HUY HIỆU PHÂN TẦNG WHO AWARE (`<AWaRePill />`)

Để chuẩn hóa việc gắn nhãn phân tầng kháng sinh theo WHO AWaRe 2023 trong các bảng thuốc hoặc đoạn văn lâm sàng, sử dụng thẻ:

```html
<AWaRePill tier="access" />
<AWaRePill tier="watch" />
<AWaRePill tier="reserve" />
<AWaRePill tier="discouraged" />
```

### Ý nghĩa hiển thị của 4 phân tầng:
1. `access`: **ACCESS (TIẾP CẬN)** — Đèn xanh, viền xanh lá, biểu tượng `fa-circle-check`. Kháng sinh ưu tiên hàng đầu, chiếm $\ge 60\%$ tiêu thụ.
2. `watch`: **WATCH (GIÁM SÁT)** — Đèn vàng, viền cam hổ phách, biểu tượng `fa-triangle-exclamation`. Phổ rộng, nguy cơ kháng thuốc cao.
3. `reserve`: **RESERVE (DỰ TRỮ)** — Đèn đỏ, viền đỏ, biểu tượng `fa-shield-halved`. "Vũ khí cuối cùng" cho vi khuẩn siêu kháng (CRE, CRAB, MRSA).
4. `discouraged`: **DISCOURAGED (KHÔNG KHUYẾN CÁO)** — Nền xám, biểu tượng `fa-ban`. Các phối hợp kháng sinh cố định (FDCs) bất hợp lý.

---

## THÀNH PHẦN 5: ĐỒ HỌA XUẤT BẢN EDITORIAL PURE SVG STUDIO (`.flowchart-card`)

Phân hệ Kháng sinh học CliniPortal nghiêm cấm dùng các thư viện vẽ đồ thị phụ thuộc (như Chart.js hay Mermaid thô). Mọi lưu đồ thuật toán, chu trình xử trí và sơ đồ cơ chế phân tử phải được viết bằng **Pure Editorial SVG** nhúng trực tiếp trong khung `.flowchart-card`:

### Cấu trúc khung chuẩn bao bọc SVG:
```html
<div class="flowchart-card">
  <div class="flowchart-header">
    <div class="flowchart-title">
      <i class="fa-solid fa-route" style="color: var(--color-primary, #0284c7);"></i> 
      TIÊU ĐỀ IN HOA: SƠ ĐỒ ĐỐI CHIẾU HOẶC LƯU ĐỒ THUẬT TOÁN
    </div>
    <span class="badge badge-blue">Pure Editorial SVG</span>
  </div>
  <div class="flowchart-svg-container">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 480" width="100%" height="100%" style="background:var(--color-surface, #ffffff); border-radius:12px; font-family:system-ui, -apple-system, sans-serif;">
      <!-- Khối định nghĩa Gradients & Filters nếu có -->
      <defs>
        <linearGradient id="gradSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0284c7" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0.05" />
        </linearGradient>
      </defs>

      <!-- Tiêu đề & Chú thích bên trong SVG -->
      <text x="480" y="38" text-anchor="middle" font-size="20" font-weight="900" fill="var(--color-text, #0f172a)">
        TIÊU ĐỀ CHÍNH CỦA SƠ ĐỒ
      </text>
      <text x="480" y="62" text-anchor="middle" font-size="13" font-weight="600" fill="var(--color-text-muted, #64748b)">
        Mô tả ngắn gọn nguyên lý hoặc thông điệp cốt lõi của sơ đồ
      </text>

      <!-- Các khối node & mũi tên vector -->
      <g transform="translate(50, 90)">
        <rect x="0" y="0" width="400" height="340" rx="12" fill="url(#gradSky)" stroke="#0284c7" stroke-width="1.5" />
        <rect x="15" y="15" width="370" height="34" rx="8" fill="#0284c7" />
        <text x="200" y="37" text-anchor="middle" font-size="14" font-weight="800" fill="#ffffff">
          NHÃN KHỐI TRÁI
        </text>
        <!-- Thêm các tệp text khác -->
      </g>
    </svg>
  </div>
</div>
```

### Bộ quy tắc sống còn khi viết SVG trong MDX:
1. **Tuyệt đối không lồng thẻ HTML trong SVG**: Thẻ `<text>` của SVG không chấp nhận `<b>`, `<strong>`, `<span>`, `<br>`, `<div>`. Sử dụng `<tspan font-weight="700">` hoặc tách nhiều dòng `<text>` với tọa độ `y` khác nhau.
2. **Hỗ trợ tự động 100% Dark Mode**:
   - Nền SVG dùng: `fill="var(--color-surface, #ffffff)"` hoặc `style="background:var(--color-surface, #ffffff)"`.
   - Chữ chính dùng: `fill="var(--color-text, #0f172a)"`.
   - Chữ phụ dùng: `fill="var(--color-text-muted, #64748b)"`.
   - Đường viền dùng: `stroke="var(--color-border, #e2e8f0)"`.
3. **Responsive qua `viewBox`**: Luôn khai báo `viewBox="0 0 Width Height"` và `width="100%" height="100%"`.

---

## THÀNH PHẦN 6: BẢNG DƯỢC LÝ & MA TRẬN TRA CỨU LÂM SÀNG

Các bảng tra cứu phân loại, liều lượng và kháng tự nhiên cần được trình bày rõ ràng, dễ quét nhanh (scannable) trên màn hình lâm sàng:

### Định dạng Markdown Table chuẩn:
```markdown
| Dạng Hình Thái | Kiểu Sắp Xếp Đặc Trưng | Ví Dụ Vi Khuẩn Lâm Sàng | Kháng Tự Nhiên & Lưu Ý |
| :--- | :--- | :--- | :--- |
| **Cầu khuẩn Gram (+)** | Từng chùm như chùm nho | *Staphylococcus aureus* | Tự nhiên kháng Aztreonam |
| **Cầu khuẩn Gram (+)** | Chuỗi dài hoặc cặp đôi | *Streptococcus pneumoniae* | Nhạy cảm với Penicillin/Amox liều cao |
| **Trực khuẩn Gram (-)** | Trực khuẩn gram âm hiếu khí | *Pseudomonas aeruginosa* | Kháng tự nhiên: Ampicillin, Cefazolin, Ceftriaxone |
| **Vi khuẩn không vách** | Không có hình thái cố định | *Mycoplasma pneumoniae* | Kháng tuyệt đối 100% các Beta-lactam |
```

### Quy chuẩn định dạng nội dung trong bảng:
- Tên vi khuẩn, chi và loài bắt buộc in nghiêng (`*Escherichia coli*`, `*Staphylococcus aureus*`).
- Dược chất hoặc nhóm thuốc viết in hoa chữ cái đầu hoặc in đậm (`**Vancomycin**`, `**Amoxicillin**`).
- Các chỉ số định lượng hoặc so sánh nhỏ hơn/lớn hơn phải dùng KaTeX hoặc ký tự an toàn (`$\le 2\text{ mg/L}$` hoặc `&lt; 15%`).

---

## THÀNH PHẦN 7: BIỂU THỨC TOÁN Y SINH & KATEX PK/PD NOTATION

Các bài học kháng sinh (đặc biệt Module 3 và Module 4) chứa nhiều công thức tính toán dược lực học/dược động học (PK/PD) và độ thanh thải thận:

### 1. Công thức dạng khối (Display Math):
Đặt trong `$$ ... $$` nằm trên dòng độc lập:

```latex
$$
\%T > \text{MIC} = \frac{\ln\left(\frac{\text{Dose}}{V_d \times \text{MIC}}\right)}{k_e} \times \frac{100}{\tau}
$$
```

Hoặc công thức tính độ thanh thải Creatinine theo Cockcroft-Gault:

```latex
$$
\text{CrCl (nam)} = \frac{(140 - \text{Tuổi}) \times \text{Cân nặng (kg)}}{72 \times \text{Creatinine huyết thanh (mg/dL)}}
$$
```
*(Đối với nữ: nhân thêm hệ số $0.85$)*.

### 2. Ký hiệu toán trong dòng (Inline Math):
Đặt trong `$ ... $`:
- Thời gian nồng độ thuốc trên MIC: `$\%T > \text{MIC} \ge 50-60\%$`
- Tỷ số diện tích dưới đường cong trên MIC: `$\text{AUC}_{24}/\text{MIC} \ge 400$`
- Tỷ số nồng độ đỉnh trên MIC: `$C_{\max}/\text{MIC} \ge 8-10$`
- Nồng độ ức chế tối thiểu: `$\text{MIC} \le 1\text{ mg/L}$`
- Thang đo thể tích & cân nặng: `$1\text{ }\mu\text{m}$`, `$100\text{ mg/kg/ngày}$`.

> [!CAUTION]
> **Quy tắc ký tự JSX Escaping**:
> Khi gõ công thức hoặc so sánh trong văn bản thuần Markdown (ngoài khối LaTeX `$$...$$`):
> - Dấu nhỏ hơn `<` bắt buộc chuyển thành `&lt;` (ví dụ: `eGFR &lt; 30 mL/phút`, `SpO2 &lt; 92%`).
> - Dấu lớn hơn `>` bắt buộc chuyển thành `&gt;` (ví dụ: `Bạch cầu &gt; 12.000 /mm3`).
> - Nếu đặt bên trong khối LaTeX `$...$`, ký tự `<` và `>` được phép dùng bình thường.

---

## THÀNH PHẦN 8: KHUNG GHI CHÚ Y KHOA (INFOBOXES & ALERTS)

Để làm nổi bật các lưu ý an toàn, cạm bẫy kê đơn và điểm chốt thực hành, sử dụng một trong hai dạng cú pháp sau:

### Dạng 1: GitHub-Style Alerts (Được CliniPortal hỗ trợ mặc định)
```markdown
> [!NOTE]
> Ngoài thang điểm CRB-65, điều kiện cần để điều trị ngoại trú bao gồm: SpO2 ≥ 92%, bệnh nhân dung nạp được đường uống và có gia đình hỗ trợ theo dõi tại nhà.

> [!WARNING]
> Cảnh báo tương tác DDI: Ciprofloxacin ức chế mạnh CYP1A2, làm tăng nồng độ Theophylline trong huyết tương lên gấp 2-3 lần, nguy cơ gây co giật và loạn nhịp tim tử vong.

> [!IMPORTANT]
> Nguyên tắc vi sinh: Luôn cấy máu và bệnh phẩm trước khi bắt đầu liều kháng sinh đầu tiên. Tuy nhiên, ở bệnh nhân sốc nhiễm khuẩn, tuyệt đối không được trì hoãn kháng sinh quá 1 giờ.

> [!TIP]
> Điểm ngọc lâm sàng (Clinical Pearl): Tăng gấp đôi liều Amoxicillin (từ 500mg lên 1000mg x 3 lần/ngày) có thể vượt qua cơ chế đề kháng do đột biến PBP của phế cầu mà không cần phải đổi sang kháng sinh phổ rộng.
```

### Dạng 2: Khung Infobox HTML Thẩm Mỹ Cao
```html
<div class="infobox pearl">
  <div class="infobox-title"><i class="fa-solid fa-gem"></i> ĐIỂM NGỌC LÂM SÀNG (CLINICAL PEARL)</div>
  <p>Kháng sinh Aminoglycosides (Gentamicin, Amikacin) có hiệu ứng hậu kháng sinh (PAE) kéo dài. Do đó, chế độ liều 1 lần duy nhất trong ngày (Once-Daily Dosing) vừa tăng hiệu quả diệt khuẩn theo nồng độ đỉnh Cmax, vừa giảm độc tính tích lũy trên thận và ốc tai.</p>
</div>

<div class="infobox danger">
  <div class="infobox-title"><i class="fa-solid fa-triangle-exclamation"></i> CẢNH BÁO NGUY HIỂM (SAFETY WARNING)</div>
  <p>Tuyệt đối không phối hợp Ceftriaxone đường tĩnh mạch với các dung dịch truyền chứa Canxi (như Ringer Lactate) ở trẻ sơ sinh do nguy cơ tạo kết tủa Ceftriaxone-Canxi tử vong tại phổi và thận.</p>
</div>
```

---

## THÀNH PHẦN 9: TRÍCH DẪN Y VĂN CHUẨN AMA & ĐIỀU HƯỚNG CUỐI BÀI

Cuối mỗi bài viết `.mdx`, bắt buộc có danh mục tài liệu tham khảo theo chuẩn **AMA (American Medical Association 11th Edition)** để đảm bảo tính bằng chứng khoa học (EBM):

```markdown
---

## 5. Tài Liệu Tham Khảo (AMA Style) <span id="sec-5"></span>

1. World Health Organization. *The WHO AWaRe Antibiotic Book*. Geneva: World Health Organization; 2023. Licence: CC BY-NC-SA 3.0 IGO.
2. Hauser AR. *Antibiotic Basics for Clinicians: The ABCs of Choosing the Right Antibacterial Agent*. 3rd ed. Philadelphia: Wolters Kluwer; 2020:45-89.
3. Gilbert DN, Chambers HF, Saag MS, et al. *The Sanford Guide to Antimicrobial Therapy 2024*. 54th ed. Sperryville, VA: Antimicrobial Therapy, Inc.; 2024.
4. Bộ Y Tế Việt Nam. *Hướng Dẫn Sử Dụng Kháng Sinh*. Ban hành kèm theo Quyết định số 708/QĐ-BYT. Hà Nội: Nhà xuất bản Y học; 2020.
```

---

## BỘ 8 QUY TẮC BẤT DI BẤT DỊCH KHI SOẠN THẢO MDX

Mọi AI Agent hoặc thành viên phát triển khi thao tác trên các file `.mdx` của phân hệ `antibiotics` phải tuân thủ nghiêm ngặt 8 điều răn sau:

1. **Khớp ID Section 1:1**: Mọi phần tử trong `sections: [{ id: "sec-X", ... }]` của Frontmatter phải có một thẻ tương ứng `## X. Tiêu Đề <span id="sec-X"></span>` trong thân bài.
2. **Không Dùng Thẻ Khung Toàn Trang**: Tuyệt đối không thêm `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`.
3. **Thoát Ký Tự JSX**: Luôn đổi `<` thành `&lt;` và `>` thành `&gt;` trong văn bản Markdown thô nếu không nằm trong khối math `$ ... $`.
4. **Không Thẻ HTML Trong SVG Text**: Không dùng `<b>`, `<strong>`, `<span>`, `<br>` bên trong thẻ `<text>` của SVG.
5. **Dark Mode Tokens 100%**: Sử dụng `var(--color-...)` hoặc `var(--dsp-...)`, không dùng mã màu cố định `#ffffff` cho nền hay `#000000` cho chữ mà không có token dự phòng.
6. **In Nghiêng Danh Pháp Vi Sinh**: Tên vi khuẩn, nấm, ký sinh trùng phải luôn được in nghiêng (`*Staphylococcus aureus*`, `*Pseudomonas aeruginosa*`).
7. **Bảo Tồn Thứ Tự Khóa Học**: Không đổi trường `order`, `moduleNumber`, `lessonNumber` trừ khi có chỉ định tái cấu trúc toàn diện chương trình.
8. **Đường Dẫn Tương Đối Chuẩn**: Nếu nhúng hình ảnh, lưu file ảnh vào thư mục con và trỏ đúng đường dẫn tương đối.

---

## BẢNG KIỂM TỰ ĐỘNG HÓA (SELF-AUDIT CHECKLIST)

Trước khi bàn giao hoặc lưu file `.mdx`, AI Agent hãy tự kiểm tra qua bảng kiểm 7 điểm sau:

- [ ] **Frontmatter**: Đầy đủ `title`, `slug`, `module`, `sections`, `tags`, `difficulty`, `estimatedTime`.
- [ ] **Section Anchors**: Tất cả `id` trong `sections` đều có `<span id="...">` tương ứng trong bài.
- [ ] **Header & Badges**: Đã có `module-badge-group` và thẻ `<AntibioticQuickNav />`.
- [ ] **AWaRe Pilling**: Các bảng thuốc đã sử dụng `<AWaRePill tier="..." />` hợp lý.
- [ ] **Pure SVG**: Các sơ đồ vector có `viewBox`, không có lỗi thẻ lồng HTML trong `<text>`, hiển thị tốt ở Dark Mode.
- [ ] **Math & Escaping**: Không còn dấu `<` hoặc `>` chưa thoát trong câu văn thường.
- [ ] **Build Validation**: Chạy thử lệnh kiểm tra cú pháp và build không có lỗi vỡ tag.

---

## GOLDEN TEMPLATE: FILE MDX MẪU CHUẨN HOÀN CHỈNH

Dưới đây là mã nguồn mẫu của một file `.mdx` hoàn hảo, sẵn sàng để copy và tùy chỉnh cho bất kỳ bài giảng kháng sinh mới nào:

```markdown
---
title: "Mô Phỏng Chỉ Số PK/PD & Tối Ưu Hóa Chế Độ Liều Kháng Sinh"
slug: "ks-3-1-chi-so-pk-pd-co-ban"
module: "module3-pk-pd-duong-dung"
moduleLabel: "Module 3: PK/PD & Đường Dùng"
moduleNumber: 3
lessonNumber: 1
order: 5
aware: "access"
tags:
  - "PK/PD"
  - "T>MIC"
  - "AUC/MIC"
  - "Cmax/MIC"
  - "Truyền kéo dài"
difficulty: "intermediate"
estimatedTime: 25
lastUpdated: "2026-10-31"
sections:
  - id: "sec-1"
    number: 1
    title: "Định Hướng Lâm Sàng & Phân Loại 3 Nhóm PK/PD"
    icon: "fa-chart-line"
  - id: "sec-2"
    number: 2
    title: "Sơ Đồ Tương Quan Nồng Độ - Thời Gian Của 3 Kiểu Diệt Khuẩn"
    icon: "fa-bezier-curve"
  - id: "sec-3"
    number: 3
    title: "Bảng Đối Sánh 3 Mô Hình PK/PD Lâm Sàng"
    icon: "fa-table"
  - id: "sec-4"
    number: 4
    title: "Chiến Lược Truyền Kéo Dài & Truyền Liên Tục Beta-Lactam"
    icon: "fa-stopwatch-20"
  - id: "sec-5"
    number: 5
    title: "Tài Liệu Tham Khảo (AMA Style)"
    icon: "fa-book-medical"
---

# 🛡️ MÔ PHỎNG CHỈ SỐ PK/PD & TỐI ƯU HÓA CHẾ ĐỘ LIỀU KHÁNG SINH

<div class="module-badge-group">
  <span class="badge badge-teal"><i class="fa-solid fa-shield-virus"></i> Kháng Sinh Học Lâm Sàng</span>
  <span class="badge badge-blue"><i class="fa-solid fa-chart-line"></i> Module 3 • Dược Lực Học PK/PD</span>
  <span class="badge badge-emerald"><i class="fa-solid fa-stopwatch"></i> Tối Ưu Chế Độ Liều EBM</span>
</div>

<AntibioticQuickNav />

## 1. Định Hướng Lâm Sàng & Phân Loại 3 Nhóm PK/PD <span id="sec-1"></span>

Trong thực hành lâm sàng hiện đại, việc lựa chọn đúng loại kháng sinh nhạy cảm trên kháng sinh đồ chỉ là 50% chặng đường điều trị thành công. 50% còn lại quyết định sự sống còn của bệnh nhân phụ thuộc vào việc **thiết lập chế độ liều (Dosing Regimen)** sao cho nồng độ thuốc tự do tại mô đích đạt được mục tiêu dược lực học (Pharmacodynamics - PD) tối ưu.

Kháng sinh được phân chia thành 3 mô hình tương quan PK/PD kinh điển:
1. **Diệt khuẩn phụ thuộc thời gian (Time-dependent killing):** Chỉ số quyết định là $\%T > \text{MIC}$.
2. **Diệt khuẩn phụ thuộc nồng độ (Concentration-dependent killing):** Chỉ số quyết định là $C_{\max}/\text{MIC}$.
3. **Diệt khuẩn phụ thuộc tổng lượng thuốc phơi nhiễm:** Chỉ số quyết định là $\text{AUC}_{24}/\text{MIC}$.

---

## 2. Sơ Đồ Tương Quan Nồng Độ - Thời Gian Của 3 Kiểu Diệt Khuẩn <span id="sec-2"></span>

<div class="flowchart-card">
  <div class="flowchart-header">
    <div class="flowchart-title"><i class="fa-solid fa-route" style="color: var(--color-primary, #0284c7);"></i> 3 MÔ HÌNH DƯỢC LỰC HỌC KHÁNG SINH PK/PD KINH ĐIỂN</div>
    <span class="badge badge-blue">Pure Editorial SVG</span>
  </div>
  <div class="flowchart-svg-container">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 420" width="100%" height="100%" style="background:var(--color-surface, #ffffff); border-radius:12px; font-family:system-ui, -apple-system, sans-serif;">
  <text x="480" y="38" text-anchor="middle" font-size="20" font-weight="900" fill="var(--color-text, #0f172a)">
    3 MÔ HÌNH DƯỢC ĐỘNG HỌC / DƯỢC LỰC HỌC (PK/PD) CỦA KHÁNG SINH
  </text>
  <text x="480" y="62" text-anchor="middle" font-size="13" font-weight="600" fill="var(--color-text-muted, #64748b)">
    Cơ sở phân tử để quyết định khoảng cách liều, thời gian truyền và chiến lược phối hợp
  </text>

  <!-- Panel 1: Time Dependent -->
  <g transform="translate(40, 85)">
    <rect x="0" y="0" width="270" height="300" rx="10" fill="rgba(2, 132, 199, 0.08)" stroke="#0284c7" stroke-width="1.5" />
    <rect x="10" y="10" width="250" height="32" rx="6" fill="#0284c7" />
    <text x="135" y="31" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">1. PHỤ THUỘC THỜI GIAN</text>
    <text x="135" y="68" text-anchor="middle" font-size="15" font-weight="900" fill="#0284c7">%T &gt; MIC</text>
    <text x="15" y="105" font-size="11" font-weight="700" fill="var(--color-text, #0f172a)">• Nhóm thuốc tiêu biểu:</text>
    <text x="25" y="125" font-size="10.5" font-weight="500" fill="var(--color-text-muted, #64748b)">Beta-lactams (Penicillin, Cephalo, Carbapenem)</text>
    <text x="15" y="160" font-size="11" font-weight="700" fill="var(--color-text, #0f172a)">• Mục tiêu điều trị:</text>
    <text x="25" y="180" font-size="10.5" font-weight="600" fill="#059669">%T &gt; MIC đạt 40 - 70% (100% trong ICU)</text>
    <text x="15" y="215" font-size="11" font-weight="700" fill="var(--color-text, #0f172a)">• Chiến lược tối ưu:</text>
    <text x="25" y="235" font-size="10.5" font-weight="500" fill="var(--color-text-muted, #64748b)">Chia nhỏ liều, truyền kéo dài 3-4h hoặc truyền liên tục 24h</text>
  </g>

  <!-- Panel 2: Concentration Dependent -->
  <g transform="translate(345, 85)">
    <rect x="0" y="0" width="270" height="300" rx="10" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1.5" />
    <rect x="10" y="10" width="250" height="32" rx="6" fill="#10b981" />
    <text x="135" y="31" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">2. PHỤ THUỘC NỒNG ĐỘ</text>
    <text x="135" y="68" text-anchor="middle" font-size="15" font-weight="900" fill="#059669">Cmax / MIC</text>
    <text x="15" y="105" font-size="11" font-weight="700" fill="var(--color-text, #0f172a)">• Nhóm thuốc tiêu biểu:</text>
    <text x="25" y="125" font-size="10.5" font-weight="500" fill="var(--color-text-muted, #64748b)">Aminoglycosides, Metronidazole, Daptomycin</text>
    <text x="15" y="160" font-size="11" font-weight="700" fill="var(--color-text, #0f172a)">• Mục tiêu điều trị:</text>
    <text x="25" y="180" font-size="10.5" font-weight="600" fill="#059669">Cmax / MIC đạt 8 - 10 lần</text>
    <text x="15" y="215" font-size="11" font-weight="700" fill="var(--color-text, #0f172a)">• Chiến lược tối ưu:</text>
    <text x="25" y="235" font-size="10.5" font-weight="500" fill="var(--color-text-muted, #64748b)">Dồn toàn bộ liều dùng 1 lần duy nhất trong ngày (Once-Daily)</text>
  </g>

  <!-- Panel 3: AUC Dependent -->
  <g transform="translate(650, 85)">
    <rect x="0" y="0" width="270" height="300" rx="10" fill="rgba(139, 92, 246, 0.08)" stroke="#8b5cf6" stroke-width="1.5" />
    <rect x="10" y="10" width="250" height="32" rx="6" fill="#8b5cf6" />
    <text x="135" y="31" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">3. TỔNG LƯỢNG PHƠI NHIỄM</text>
    <text x="135" y="68" text-anchor="middle" font-size="15" font-weight="900" fill="#7c3aed">AUC24 / MIC</text>
    <text x="15" y="105" font-size="11" font-weight="700" fill="var(--color-text, #0f172a)">• Nhóm thuốc tiêu biểu:</text>
    <text x="25" y="125" font-size="10.5" font-weight="500" fill="var(--color-text-muted, #64748b)">Vancomycin, Fluoroquinolones, Macrolides</text>
    <text x="15" y="160" font-size="11" font-weight="700" fill="var(--color-text, #0f172a)">• Mục tiêu điều trị:</text>
    <text x="25" y="180" font-size="10.5" font-weight="600" fill="#059669">AUC24 / MIC đạt 400 - 600 (với Vancomycin)</text>
    <text x="15" y="215" font-size="11" font-weight="700" fill="var(--color-text, #0f172a)">• Chiến lược tối ưu:</text>
    <text x="25" y="235" font-size="10.5" font-weight="500" fill="var(--color-text-muted, #64748b)">Theo dõi nồng độ thuốc TDM, duy trì đủ tổng liều 24 giờ</text>
  </g>
</svg>
  </div>
</div>

---

## 3. Bảng Đối Sánh 3 Mô Hình PK/PD Lâm Sàng <span id="sec-3"></span>

| Chỉ Số PK/PD | Nhóm Kháng Sinh Đại Diện | Mục Tiêu Lâm Sàng Tối Ưu | Phân Tầng AWaRe Tiêu Biểu |
| :--- | :--- | :--- | :---: |
| **$\%T > \text{MIC}$** | Penicillins, Cephalosporins, Carbapenems | $40\text{--}70\%$ chu kỳ đưa liều | <AWaRePill tier="access" /> |
| **$C_{\max}/\text{MIC}$** | Gentamicin, Amikacin, Tobramycin | $\ge 8\text{--}10\text{ lần MIC}$ | <AWaRePill tier="access" /> |
| **$\text{AUC}_{24}/\text{MIC}$** | Vancomycin, Teicoplanin | $400\text{--}600\text{ mg}\cdot\text{h/L}$ | <AWaRePill tier="watch" /> |
| **$\text{AUC}_{24}/\text{MIC}$** | Ciprofloxacin, Levofloxacin | $\ge 125$ (Gram âm), $\ge 30$ (Gram dương) | <AWaRePill tier="watch" /> |

---

## 4. Chiến Lược Truyền Kéo Dài & Truyền Liên Tục Beta-Lactam <span id="sec-4"></span>

Đối với bệnh nhân hồi sức tích cực (ICU), sốc nhiễm khuẩn hoặc nhiễm các chủng vi khuẩn gram âm có MIC cận ngưỡng (như *Pseudomonas aeruginosa*), việc tiêm ngắt quãng thông thường (30 phút) khiến nồng độ thuốc tụt xuống dưới MIC nhanh chóng.

> [!TIP]
> **Chiến lược truyền kéo dài (Extended Infusion):**
> Kéo dài thời gian truyền mỗi liều từ 3 đến 4 giờ (thay vì 30 phút) giúp tăng thời gian $\%T > \text{MIC}$ lên tới $80-100\%$ chu kỳ mà không cần phải tăng tổng liều thuốc trong ngày, giảm thiểu độc tính và nâng cao tỷ lệ sống còn.

---

## 5. Tài Liệu Tham Khảo (AMA Style) <span id="sec-5"></span>

1. Craig WA. Pharmacokinetic/pharmacodynamic parameters: rationale for antibacterial dosing of mice and men. *Clin Infect Dis*. 1998;26(1):1-10.
2. Hauser AR. *Antibiotic Basics for Clinicians: The ABCs of Choosing the Right Antibacterial Agent*. 3rd ed. Philadelphia: Wolters Kluwer; 2020.
3. Rybak MJ, Le J, Lodise TP, et al. Therapeutic monitoring of vancomycin for serious methicillin-resistant *Staphylococcus aureus* infections: A revised consensus guideline and review by the ASHP, IDSA, PIDS, and SIDP. *Am J Health Syst Pharm*. 2020;77(11):835-864.
```

