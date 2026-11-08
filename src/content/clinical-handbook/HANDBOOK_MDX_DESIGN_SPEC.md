# 📘 CLINICAL HANDBOOK MDX DESIGN SPECIFICATION & VAULT
> **Phân Hệ**: Sổ Tay Lâm Sàng CliniPortal (`src/content/clinical-handbook/`)  
> **Phiên Bản**: 2.0.0 (Gold Standard Clinical Practice)  
> **Đúc Kết & Kế Thừa Từ**: `basic-medical/MDX_COMPONENT_DESIGN_SPEC.md` & `ebm/guidelines/GUIDELINE_MDX_DESIGN_SPEC.md`  
> **Mục Tiêu**: Chuẩn hóa 100% triết lý thiết kế, bố cục thông tin mật độ cao (High Information Density), lưu đồ thuật toán Editorial SVG, cạm bẫy chẩn đoán, bảng liều thực chiến và khả năng tương thích toàn diện với `CliniMdxEngine` trên nền Dark/Light Mode.

---

## 📑 MỤC LỤC TỔNG QUAN

1. [Triết Lý Thiết Kế & Hệ Thống Design Tokens Lâm Sàng](#1-triết-lý-thiết-kế--hệ-thống-design-tokens-lâm-sàng)
2. [Cấu Trúc Frontmatter YAML Chuẩn Hóa](#2-cấu-trúc-frontmatter-yaml-chuẩn-hóa)
3. [Thành Phần 1: Dải Chỉ Số Then Chốt & Đúc Kết Nhanh (`.stats-strip`)](#thành-phần-1-dải-chỉ-số-then-chốt--đúc-kết-nhanh)
4. [Thành Phần 2: Thanh Điều Hướng Nhanh Neo Cố Định (`.pillars-nav`)](#thành-phần-2-thanh-điều-hướng-nhanh-neo-cố-định)
5. [Thành Phần 3: Hệ Thống Khung Cảnh Báo & Hộp Ghi Nhớ (`.infobox` & `.callout`)](#thành-phần-3-hệ-thống-khung-cảnh-báo--hộp-ghi-nhớ)
6. [Thành Phần 4: Lưu Đồ Editorial SVG & Cơ Chế Bệnh Học 2.0](#thành-phần-4-lưu-đồ-editorial-svg--cơ-chế-bệnh-học-20)
7. [Thành Phần 4B: Lưới Thẻ Quyết Định Đa Cột (Responsive Decision Grid Cards) — Chuẩn Anti-ASCII](#thành-phần-4b-lưới-thẻ-quyết-định-đa-cột-responsive-decision-grid-cards--chuẩn-anti-ascii)
8. [Thành Phần 5: Ray Dẫn Đường & Thuật Toán Quyết Định Từng Bước (`.flow-track`)](#thành-phần-5-ray-dẫn-đường--thuật-toán-quyết-định-từng-bước)
9. [Thành Phần 6: Bảng Chẩn Đoán, Đối Sánh & Dược Lý Liều Dùng](#thành-phần-6-bảng-chẩn-đoán-đối-sánh--dược-lý-liều-dùng)
10. [Thành Phần 7: Thẻ Cạm Bẫy Lâm Sàng & Cờ Đỏ Tử Vong (`.pitfall-card`)](#thành-phần-7-thẻ-cạm-bẫy-lâm-sàng--cờ-đỏ-tử-vong)
11. [Thành Phần 8: Ca Bệnh Thực Chiến & Trực Cảm Bên Giường Bệnh (`.case-study-card`)](#thành-phần-8-ca-bệnh-thực-chiến--trực-cảm-bên-giường-bệnh)
12. [Thành Phần 9: Biểu Thức Toán Y Sinh KaTeX Math Notation](#thành-phần-9-biểu-thức-toán-y-sinh-katex-math-notation)
13. [Quy Chuẩn Đặt ID Tiêu Đề Cho CliniMdxEngine (`{#sec-id}`)](#quy-chuẩn-đặt-id-tiêu-đề-cho-clinimdxengine-sec-id)
14. [Golden Template: Cấu Trúc File MDX Mẫu Chuẩn Cho Mọi Bài Đúc Kết](#14-golden-template-cấu-trúc-file-mdx-mẫu-chuẩn-cho-mọi-bài-đúc-kết)

---

## 1. TRIẾT LÝ THIẾT KẾ & HỆ THỐNG DESIGN TOKENS LÂM SÀNG

Khác với giáo trình lý thuyết dàn trải hay bản tóm tắt guideline thuần học thuật, **Sổ Tay Lâm Sàng (Clinical Handbook)** được thiết kế như một **Bảng Điều Khiển Cấp Cứu & Trực Chiến (Clinical Cockpit)** dành cho bác sĩ nội trú, bác sĩ chuyên khoa và điều dưỡng lâm sàng:

- **Nguyên Tắc 30 Giây**: Bác sĩ chỉ cần nhìn lướt dải chỉ số (`stats-strip`) và khung đúc kết (`rule-of-thumb`) là nắm trọn hành động quyết định.
- **Không Dùng Văn Bản Thuần (Anti-Wall of Text)**: Mọi cơ chế phân tử hoặc dòng chảy quyết định đều phải chuyển hóa thành **Editorial SVG Flowchart** hoặc **Linear Step Track**.
- **Minh Bạch Cạm Bẫy & Cờ Đỏ**: Bẫy xét nghiệm giả tạo, chống chỉ định trí mạng được đóng gói vào các **Thẻ Cạm Bẫy (Pitfall Cards)** màu đỏ/hổ phách với viền nổi bật.
- **100% Dark Mode & Design Tokens**: Tự động chuyển đổi thích ứng với ánh sáng phòng trực đêm bệnh viện mà không làm mỏi mắt.

### Bảng Phân Vai Design Tokens (CSS Roles)

```css
:root {
  /* Nhận diện thương hiệu Sổ tay lâm sàng */
  --handbook-primary:           var(--color-primary, #0284c7);
  --handbook-primary-hover:     var(--color-primary-hover, #0369a1);
  --handbook-primary-hl:        var(--color-primary-hl, rgba(2, 132, 199, 0.08));

  /* Tông màu biểu cảm lâm sàng (Semantics) */
  --hb-emerald:                 #10b981;  /* An toàn, đáp ứng tốt, bình thường */
  --hb-amber:                   #f59e0b;  /* Cảnh giác, ngưỡng theo dõi, bẫy trung bình */
  --hb-rose:                    #ef4444;  /* Cấp cứu, chống chỉ định, cạm bẫy tử vong */
  --hb-violet:                  #8b5cf6;  /* Cơ chế, dược động học, gen, miễn dịch */
  --hb-teal:                    #0d9488;  /* Cận lâm sàng, lab cut-offs, chẩn đoán hình ảnh */
  --hb-indigo:                  #6366f1;  /* Chứng cứ EBM, phác đồ chuẩn hóa */

  /* Bề mặt (Surfaces) thích ứng tương phản */
  --handbook-bg:                var(--color-bg, #f0f4f8);
  --handbook-surface:           var(--color-surface, #ffffff);
  --handbook-surface-2:         var(--color-surface-2, #f8fafc);
  --handbook-surface-offset:    var(--color-surface-offset, #f1f5f9);
  --handbook-border:            var(--color-border, #cbd5e1);
  --handbook-divider:           var(--color-divider, #e2e8f0);
}

[data-theme="dark"] {
  --handbook-primary:           var(--color-primary, #38bdf8);
  --handbook-bg:                var(--color-bg, #080e1a);
  --handbook-surface:           var(--color-surface, #101828);
  --handbook-surface-2:         var(--color-surface-2, #162032);
  --handbook-surface-offset:    var(--color-surface-offset, #1a2840);
  --handbook-border:            var(--color-border, #263a57);
}
```

---

## 2. CẤU TRÚC FRONTMATTER YAML CHUẨN HÓA

Mỗi file bài học MDX trong `src/content/clinical-handbook/<specialty>/<disease>/<slug>.mdx` bắt buộc khai báo đầy đủ khối YAML Frontmatter:

```yaml
---
title: "Tiêu Chuẩn Chẩn Đoán Viêm Gan Siêu Vi B & Cạm Bẫy Cận Lâm Sàng"
slug: "hbv-01-tieu-chuan-chan-doan-va-cam-bay"
specialty: "truyen-nhiem"
specialtyLabel: "Bệnh Truyền Nhiễm & Nhiệt Đới"
disease: "viem-gan-b"
diseaseLabel: "Viêm Gan Siêu Vi B (HBV)"
order: 1
tags:
  - "Viêm gan B"
  - "HBV"
  - "Tiêu chuẩn chẩn đoán"
  - "4 Pha tự nhiên"
  - "Bẫy ALT"
  - "Bẫy FibroScan"
  - "Anti-HBc IgM"
  - "EBM 2026"
difficulty: "advanced"             # beginner | intermediate | advanced
estimatedTime: 25                  # phút đọc & phân tích
lastUpdated: "2026-11-08"
evidenceLevel: "EBM 2026 • AASLD / EASL / BYT"
sections:
  - id: "sec-takeaway"
    number: 1
    title: "Đúc Kết 30 Giây (The Bottom Line & Rule of Thumb)"
    icon: "fa-bolt"
  - id: "sec-4-phases"
    number: 2
    title: "Bản Đồ 4 Pha Tự Nhiên Của Nhiễm HBV Mạn Tính"
    icon: "fa-diagram-project"
  - id: "sec-diagnostic-criteria"
    number: 3
    title: "Bộ Tiêu Chuẩn Chẩn Đoán Cốt Lõi & Chỉ Định Khởi Trị"
    icon: "fa-clipboard-check"
  - id: "sec-serology-pitfalls"
    number: 4
    title: "Cạm Bẫy Huyết Thanh Học (Serology & Anti-HBc IgM)"
    icon: "fa-triangle-exclamation"
  - id: "sec-alt-fibroscan-pitfalls"
    number: 5
    title: "Bẫy Ngưỡng ALT Phòng Xét Nghiệm & Bẫy Đo Độ Cứng Gan"
    icon: "fa-wave-square"
  - id: "sec-qhbsag-role"
    number: 6
    title: "Tái Hoạt HBV & Phân Tuyến Ngoại Trú - Nội Viện (QĐ 1740)"
    icon: "fa-chart-pie"
  - id: "sec-bedside-matrix"
    number: 7
    title: "Bảng Ma Trận Phân Biệt Cấp vs Bùng Phát Mạn"
    icon: "fa-table-list"
  - id: "sec-case-scenarios"
    number: 8
    title: "Ca Lâm Sàng Thực Tế & Đúc Kết Xương Máu"
    icon: "fa-user-doctor"
---
```

---

## THÀNH PHẦN 1: DẢI CHỈ SỐ THEN CHỐT & ĐÚC KẾT NHANH

Đặt ngay sau tiêu đề H1 và hàng Huy hiệu chuyên khoa để hiển thị 4 giá trị ngưỡng lâm sàng hoặc kết luận sống còn:

```html
<!-- DẢI CHỈ SỐ NHANH (QUICK STATS STRIP) -->
<section class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val blue">≤ 35 / ≤ 25 U/L</div>
      <div class="stat-lbl">Ngưỡng ALT bình thường thực tế theo AASLD (Nam / Nữ)</div>
    </div>
    <div class="stat-card">
      <div class="stat-val red">ALT &gt; 5× ULN</div>
      <div class="stat-lbl">Chống chỉ định đo FibroScan (Độ cứng giả vọt F4)</div>
    </div>
    <div class="stat-card">
      <div class="stat-val amber">20 – 30%</div>
      <div class="stat-lbl">Tỷ lệ bùng phát mạn có Anti-HBc IgM (+) gây nhầm cấp</div>
    </div>
    <div class="stat-card">
      <div class="stat-val green">&lt; 1.000 IU/mL</div>
      <div class="stat-lbl">Ngưỡng qHBsAg kết hợp DNA thấp tiên lượng thải sạch</div>
    </div>
  </div>
</section>
```

---

## THÀNH PHẦN 2: THANH ĐIỀU HƯỚNG NHANH NEO CỐ ĐỊNH

Cho phép bác sĩ nhảy ngay tới phần đang cần xem (ví dụ: bẫy xét nghiệm, phác đồ liều, bảng đối chiếu) mà không phải vuốt màn hình liên tục:

```html
<!-- THANH ĐIỀU HƯỚNG NHANH NEO CỐ ĐỊNH (STICKY QUICK NAV) -->
<nav class="pillars-nav">
  <div class="pillars-nav-inner">
    <a href="#sec-takeaway" class="pillar-link active">
      <i class="fa-solid fa-bolt"></i> 1. Đúc Kết 30s
    </a>
    <a href="#sec-4-phases" class="pillar-link">
      <i class="fa-solid fa-diagram-project"></i> 2. Bản Đồ 4 Pha
    </a>
    <a href="#sec-diagnostic-criteria" class="pillar-link">
      <i class="fa-solid fa-clipboard-check"></i> 3. Tiêu Chuẩn Vàng
    </a>
    <a href="#sec-serology-pitfalls" class="pillar-link">
      <i class="fa-solid fa-triangle-exclamation"></i> 4. Bẫy Huyết Thanh
    </a>
    <a href="#sec-alt-fibroscan-pitfalls" class="pillar-link">
      <i class="fa-solid fa-wave-square"></i> 5. Bẫy ALT &amp; Scan
    </a>
    <a href="#sec-case-scenarios" class="pillar-link">
      <i class="fa-solid fa-user-doctor"></i> 6. Ca Thực Chiến
    </a>
  </div>
</nav>
```

---

## THÀNH PHẦN 3: HỆ THỐNG KHUNG CẢNH BÁO & HỘP GHI NHỚ

Hệ thống phân cấp 6 nhóm khung chú thích y khoa có viền đổi màu, icon nổi và nền tương phản:

```html
<!-- 1. ĐIỂM NGỌC LÂM SÀNG (PEARL) -->
<div class="callout callout-pearl">
  <div class="callout-title">
    <i class="fa-solid fa-gem"></i> Điểm Ngọc Lâm Sàng (Clinical Pearl)
  </div>
  <div class="callout-body">
    Nhiễm HBV thể HBeAg âm tính (Pha 4) cực kỳ nguy hiểm vì người bệnh thường chủ quan. Tải lượng virus dao động mạnh từng tháng, men gan có thể bình thường xen kẽ các đợt tăng vọt gây xơ gan âm thầm.
  </div>
</div>

<!-- 2. CẠM BẪY CHẾT NGƯỜI / CỜ ĐỎ (RED FLAG / DANGER) -->
<div class="callout callout-danger">
  <div class="callout-title">
    <i class="fa-solid fa-skull-crossbones"></i> Cạm Bẫy Chết Người (Fatal Pitfall)
  </div>
  <div class="callout-body">
    Tuyệt đối không chẩn đoán Viêm gan B cấp và chờ đợi hồi phục tự nhiên khi chưa khai thác tiền sử HBsAg cũ hoặc hiệu giá Anti-HBc IgM. Đợt bùng phát cấp trên nền mạn tính (ACLF) nếu chậm trễ kháng virus tỷ lệ tử vong lên tới <strong>30–50%</strong>.
  </div>
</div>

<!-- 3. NGUYÊN TẮC BỎ TÚI (RULE OF THUMB) -->
<div class="callout callout-rule">
  <div class="callout-title">
    <i class="fa-solid fa-ruler-combined"></i> Nguyên Tắc Bỏ Túi (Rule of Thumb)
  </div>
  <div class="callout-body">
    Khi đọc kết quả FibroScan: Hãy luôn nhìn song song với men gan ALT cùng ngày. Nếu ALT $> 100\text{ U/L}$, giá trị độ cứng đo được chỉ dùng để tham khảo, không dùng để chốt giai đoạn xơ hóa gan.
  </div>
</div>

<!-- 4. CẢNH BÁO THẬN TRỌNG (WARNING) -->
<div class="callout callout-warning">
  <div class="callout-title">
    <i class="fa-solid fa-triangle-exclamation"></i> Cảnh Báo Lâm Sàng
  </div>
  <div class="callout-body">
    Bệnh nhân có Anti-HBc đơn độc chuẩn bị dùng Rituximab hoặc thuốc ức chế miễn dịch mạnh bắt buộc phải dùng thuốc kháng virus dự phòng bất kể nồng độ HBV DNA.
  </div>
</div>

<!-- 5. GHI NHỚ LÂM SÀNG (INFO) -->
<div class="callout callout-info">
  <div class="callout-title">
    <i class="fa-solid fa-circle-info"></i> Thông Tin Bổ Trợ
  </div>
  <div class="callout-body">
    Tỷ lệ ung thư gan (HCC) ở pha Dung nạp miễn dịch (Pha 1) rất thấp nhưng nếu bệnh nhân $> 30$ tuổi có tải lượng virus cao kéo dài thì nguy cơ HCC bắt đầu gia tăng.
  </div>
</div>

<!-- 6. KẾT QUẢ ĐẠT ĐÍCH (SUCCESS) -->
<div class="callout callout-success">
  <div class="callout-title">
    <i class="fa-solid fa-circle-check"></i> Đích Điều Trị Lý Tưởng (Functional Cure)
  </div>
  <div class="callout-body">
    Mục tiêu cao nhất của điều trị là mất HBsAg và xuất hiện Anti-HBs bảo vệ (chữa khỏi chức năng), giúp giảm thiểu tối đa biến cố xơ gan mất bù và ung thư biểu mô tế bào gan.
  </div>
</div>
```

---

## THÀNH PHẦN 4: LƯU ĐỒ EDITORIAL SVG & CƠ CHẾ BỆNH HỌC 2.0

Tuyệt đối không dùng ASCII art hay ảnh chụp mờ. Dùng Pure Inline SVG lồng trong khung `.flowchart-editorial-card` đạt 100% Dark Mode, responsive scroll và typography xuất bản:

```html
<div class="flowchart-editorial-card">
  <div class="flowchart-editorial-header">
    <div class="flowchart-editorial-title">
      <i class="fa-solid fa-diagram-project" style="color: var(--handbook-primary);"></i>
      <span>BẢN ĐỒ 4 PHA DIỄN TIẾN TỰ NHIÊN CỦA NHIỄM HBV MẠN TÍNH (EASL / AASLD)</span>
    </div>
    <div class="flowchart-editorial-badges">
      <span class="flowchart-editorial-badge">EASL 2024 • AASLD 2024</span>
    </div>
  </div>
  
  <div class="flowchart-editorial-viewport">
    <svg class="flowchart-editorial-svg" viewBox="0 0 940 340" width="940" height="340" xmlns="http://www.w3.org/2000/svg" font-family="'Plus Jakarta Sans', -apple-system, sans-serif">
      <!-- Cột HBeAg (+) -->
      <rect x="20" y="20" width="435" height="40" rx="8" fill="rgba(2, 132, 199, 0.12)" stroke="#0284c7" stroke-width="1.5" />
      <text x="237" y="46" text-anchor="middle" font-size="14" font-weight="700" fill="#0284c7">HBeAg DƯƠNG TÍNH</text>

      <!-- Pha 1 -->
      <rect x="20" y="80" width="435" height="110" rx="8" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1.2" />
      <text x="35" y="105" font-size="13" font-weight="700" fill="#059669">PHA 1: NHIỄM MẠN HBeAg (+) (Dung Nạp Miễn Dịch)</text>
      <text x="35" y="130" font-size="12" font-weight="500" fill="var(--handbook-text)">• HBV DNA rất cao (&gt; 10⁷ IU/mL), ALT bình thường dai dẳng</text>
      <text x="35" y="152" font-size="12" font-weight="500" fill="var(--handbook-text)">• Tổn thương hoại tử/xơ hóa gan: Không hoặc tối thiểu</text>
      <text x="35" y="174" font-size="12" font-weight="700" fill="#059669">► Chưa chỉ định điều trị ngay, theo dõi mỗi 3–6 tháng</text>

      <!-- Pha 2 -->
      <rect x="20" y="205" width="435" height="115" rx="8" fill="rgba(239, 68, 68, 0.08)" stroke="#ef4444" stroke-width="1.2" />
      <text x="35" y="230" font-size="13" font-weight="700" fill="#dc2626">PHA 2: VIÊM GAN MẠN HBeAg (+) (Thải Trừ Miễn Dịch)</text>
      <text x="35" y="255" font-size="12" font-weight="500" fill="var(--handbook-text)">• HBV DNA 10⁴ – 10⁷ IU/mL, ALT tăng ngắt quãng hoặc liên tục</text>
      <text x="35" y="277" font-size="12" font-weight="500" fill="var(--handbook-text)">• Xơ hóa tiến triển nhanh, nguy cơ xơ gan mất bù</text>
      <text x="35" y="299" font-size="12" font-weight="700" fill="#dc2626">► CHỈ ĐỊNH ĐIỀU TRỊ THUỐC KHÁNG VIRUS NGAY</text>

      <!-- Cột HBeAg (-) -->
      <rect x="485" y="20" width="435" height="40" rx="8" fill="rgba(139, 92, 246, 0.12)" stroke="#8b5cf6" stroke-width="1.5" />
      <text x="702" y="46" text-anchor="middle" font-size="14" font-weight="700" fill="#8b5cf6">HBeAg ÂM TÍNH / ANTI-HBe (+)</text>

      <!-- Pha 3 -->
      <rect x="485" y="80" width="435" height="110" rx="8" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" stroke-width="1.2" />
      <text x="500" y="105" font-size="13" font-weight="700" fill="#059669">PHA 3: NHIỄM MẠN HBeAg (-) (Người Mang Không Hoạt Động)</text>
      <text x="500" y="130" font-size="12" font-weight="500" fill="var(--handbook-text)">• HBV DNA thấp (&lt; 2.000 IU/mL), ALT bình thường dai dẳng ≥ 12th</text>
      <text x="500" y="152" font-size="12" font-weight="500" fill="var(--handbook-text)">• qHBsAg &lt; 1.000 IU/mL, nguy cơ ung thư gan thấp</text>
      <text x="500" y="174" font-size="12" font-weight="700" fill="#059669">► Chưa chỉ định điều trị, kiểm tra định kỳ mỗi 6–12 tháng</text>

      <!-- Pha 4 -->
      <rect x="485" y="205" width="435" height="115" rx="8" fill="rgba(245, 158, 11, 0.08)" stroke="#f59e0b" stroke-width="1.2" />
      <text x="500" y="230" font-size="13" font-weight="700" fill="#d97706">PHA 4: VIÊM GAN MẠN HBeAg (-) (Đột Biến Precore / BCP)</text>
      <text x="500" y="255" font-size="12" font-weight="500" fill="var(--handbook-text)">• HBV DNA &gt; 2.000 IU/mL dao động mạnh, ALT tăng từng đợt</text>
      <text x="500" y="277" font-size="12" font-weight="500" fill="var(--handbook-text)">• Diễn tiến âm thầm dẫn thẳng tới xơ gan F4 và ung thư gan HCC</text>
      <text x="500" y="299" font-size="12" font-weight="700" fill="#d97706">► CHỈ ĐỊNH ĐIỀU TRỊ KHÁNG VIRUS LÂU DÀI</text>
    </svg>
  </div>
  
  <div class="flowchart-legend-row">
    <div class="flowchart-legend-item"><span class="legend-dot" style="background: #10b981;"></span> Thể Nhiễm trùng mạn (Theo dõi)</div>
    <div class="flowchart-legend-item"><span class="legend-dot" style="background: #ef4444;"></span> Thể Viêm gan mạn (Điều trị ngay)</div>
    <div class="flowchart-legend-item"><span class="legend-dot" style="background: #f59e0b;"></span> Đột biến Precore/BCP (Nguy hiểm ngầm)</div>
  </div>
</div>
```

---

## THÀNH PHẦN 4B: LƯỚI THẺ QUYẾT ĐỊNH ĐA CỘT (RESPONSIVE DECISION GRID CARDS) — CHUẨN ANTI-ASCII

> ⚠️ **Quy Chuẩn Chống ASCII Art (Anti-ASCII Rule)**:  
> Khi tiếp nhận bản thiết kế hoặc nội dung tóm tắt từ **NotebookLM / LLM**, AI thường có xu hướng vẽ sơ đồ bằng ký tự đơn dòng `+----+----|`.  
> Trên màn hình di động (width $\le$ 375px), các khối ASCII này sẽ bị vỡ dòng nghiêm trọng hoặc bắt người dùng cuộn ngang rất khó chịu.  
> **Quy định bắt buộc:** Phải chuyển hóa 100% sơ đồ phân loại, phân tầng giai đoạn hoặc tiêu chuẩn chỉ định thành **Responsive Grid Cards** tự động co giãn (`auto-fit, minmax(280px, 1fr)`).

### Mẫu 1: Lưới 4 Pha Diễn Tiến Sinh Học (4-Phase Bio Grid)

```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0;">

  <!-- PHA 1 (Dung nạp - Xanh dương) -->
  <div style="background: var(--handbook-surface); border: 1px solid var(--handbook-border); border-top: 4px solid #0284c7; border-radius: var(--handbook-radius-md); padding: 1.15rem; box-shadow: var(--handbook-card-shadow);">
    <div style="font-size: 0.72rem; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 0.35rem;">PHA 1 &bull; HBeAg DƯƠNG TÍNH</div>
    <div style="font-size: 1.05rem; font-weight: 800; color: var(--handbook-text); margin-bottom: 0.5rem;">Nhiễm Mạn Dung Nạp Miễn Dịch</div>
    <div style="font-size: 0.86rem; line-height: 1.55; color: var(--handbook-muted);">
      <div>&bull; <strong>HBV DNA:</strong> Rất cao (&gt; 10⁷ IU/mL)</div>
      <div>&bull; <strong>ALT:</strong> Hoàn toàn bình thường theo chuẩn AASLD</div>
      <div>&bull; <strong>Tổn thương gan:</strong> Không hoặc tối thiểu</div>
      <div style="margin-top: 0.6rem; padding: 0.4rem 0.6rem; background: rgba(2, 132, 199, 0.08); border-radius: 4px; font-weight: 700; color: #0284c7;">
        Thái độ: Theo dõi định kỳ mỗi 3–6 tháng.
      </div>
    </div>
  </div>

  <!-- PHA 2 (Hoạt động - Đỏ) -->
  <div style="background: var(--handbook-surface); border: 1px solid var(--handbook-border); border-top: 4px solid #ef4444; border-radius: var(--handbook-radius-md); padding: 1.15rem; box-shadow: var(--handbook-card-shadow);">
    <div style="font-size: 0.72rem; font-weight: 800; color: #ef4444; text-transform: uppercase; margin-bottom: 0.35rem;">PHA 2 &bull; HBeAg DƯƠNG TÍNH</div>
    <div style="font-size: 1.05rem; font-weight: 800; color: var(--handbook-text); margin-bottom: 0.5rem;">Viêm Gan Mạn Thể Hoạt Động</div>
    <div style="font-size: 0.86rem; line-height: 1.55; color: var(--handbook-muted);">
      <div>&bull; <strong>HBV DNA:</strong> Cao (10⁴ – 10⁷ IU/mL)</div>
      <div>&bull; <strong>ALT:</strong> Tăng từng đợt hoặc liên tục</div>
      <div>&bull; <strong>Mô học:</strong> Viêm hoại tử &amp; xơ hóa tiến triển</div>
      <div style="margin-top: 0.6rem; padding: 0.4rem 0.6rem; background: rgba(239, 68, 68, 0.08); border-radius: 4px; font-weight: 700; color: #dc2626;">
        Thái độ: CHỈ ĐỊNH KHỞI TRỊ NAs NGAY (TDF/TAF/ETV).
      </div>
    </div>
  </div>

  <!-- PHA 3 (Không hoạt động - Xanh lá) -->
  <div style="background: var(--handbook-surface); border: 1px solid var(--handbook-border); border-top: 4px solid #10b981; border-radius: var(--handbook-radius-md); padding: 1.15rem; box-shadow: var(--handbook-card-shadow);">
    <div style="font-size: 0.72rem; font-weight: 800; color: #10b981; text-transform: uppercase; margin-bottom: 0.35rem;">PHA 3 &bull; HBeAg ÂM TÍNH</div>
    <div style="font-size: 1.05rem; font-weight: 800; color: var(--handbook-text); margin-bottom: 0.5rem;">Người Mang Virus Không Hoạt Động</div>
    <div style="font-size: 0.86rem; line-height: 1.55; color: var(--handbook-muted);">
      <div>&bull; <strong>HBV DNA:</strong> Thấp (&lt; 2.000 IU/mL)</div>
      <div>&bull; <strong>ALT:</strong> Luôn trong ngưỡng bình thường chuẩn AASLD</div>
      <div>&bull; <strong>qHBsAg:</strong> Thường &lt; 1.000 IU/mL</div>
      <div style="margin-top: 0.6rem; padding: 0.4rem 0.6rem; background: rgba(16, 185, 129, 0.08); border-radius: 4px; font-weight: 700; color: #059669;">
        Thái độ: Theo dõi ALT &amp; Siêu âm/AFP mỗi 6–12 tháng.
      </div>
    </div>
  </div>

  <!-- PHA 4 (Đột biến Precore - Hổ phách) -->
  <div style="background: var(--handbook-surface); border: 1px solid var(--handbook-border); border-top: 4px solid #f59e0b; border-radius: var(--handbook-radius-md); padding: 1.15rem; box-shadow: var(--handbook-card-shadow);">
    <div style="font-size: 0.72rem; font-weight: 800; color: #d97706; text-transform: uppercase; margin-bottom: 0.35rem;">PHA 4 &bull; HBeAg ÂM / ĐỘT BIẾN PRECORE</div>
    <div style="font-size: 1.05rem; font-weight: 800; color: var(--handbook-text); margin-bottom: 0.5rem;">Viêm Gan Mạn Thể Tái Hoạt Động</div>
    <div style="font-size: 0.86rem; line-height: 1.55; color: var(--handbook-muted);">
      <div>&bull; <strong>HBV DNA:</strong> Dao động (2.000 – &gt; 20.000 IU/mL)</div>
      <div>&bull; <strong>ALT:</strong> Tăng bất thường từng đợt (dễ bỏ sót)</div>
      <div>&bull; <strong>Nguy cơ:</strong> Âm thầm tiến triển xơ gan và ung thư gan</div>
      <div style="margin-top: 0.6rem; padding: 0.4rem 0.6rem; background: rgba(245, 158, 11, 0.08); border-radius: 4px; font-weight: 700; color: #d97706;">
        Thái độ: KHỞI TRỊ NAs KÉO DÀI.
      </div>
    </div>
  </div>

</div>
```

### Mẫu 2: Lưới 3 Tiêu Chuẩn Vàng Khởi Trị (3-Criteria Gold Grid)

```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0;">

  <div style="background: var(--handbook-surface); border: 2px solid #0284c7; border-radius: var(--handbook-radius-md); padding: 1.25rem; box-shadow: var(--handbook-card-shadow);">
    <div style="font-weight: 800; color: #0284c7; font-size: 0.95rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-certificate"></i> TIÊU CHUẨN 1: XƠ HÓA &ge; F2</div>
    <div style="font-size: 0.88rem; line-height: 1.6; color: var(--handbook-text);">
      Xơ gan (F4) hoặc xơ hóa gan đáng kể (&ge; F2) xác định qua APRI &gt; 0.5, FIB-4 &ge; 1.45 hoặc FibroScan &gt; 7.0 kPa.
      <div style="margin-top: 0.6rem; color: #0284c7; font-weight: 700;">
        &rArr; KHỞI TRỊ NGAY (Bất kể mức HBV DNA hay ALT).
      </div>
    </div>
  </div>

  <div style="background: var(--handbook-surface); border: 2px solid #f59e0b; border-radius: var(--handbook-radius-md); padding: 1.25rem; box-shadow: var(--handbook-card-shadow);">
    <div style="font-weight: 800; color: #d97706; font-size: 0.95rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-dna"></i> TIÊU CHUẨN 2: DNA + ALT TĂNG</div>
    <div style="font-size: 0.88rem; line-height: 1.6; color: var(--handbook-text);">
      Thỏa đồng thời HBV DNA &gt; 2.000 IU/mL VÀ ALT &gt; ULN chuẩn (Nam &gt; 35, Nữ &gt; 25 U/L).
      <div style="margin-top: 0.6rem; color: #d97706; font-weight: 700;">
        &rArr; KHỞI TRỊ NGAY (Đặc trưng Pha 2 và Pha 4).
      </div>
    </div>
  </div>

  <div style="background: var(--handbook-surface); border: 2px solid #ef4444; border-radius: var(--handbook-radius-md); padding: 1.25rem; box-shadow: var(--handbook-card-shadow);">
    <div style="font-weight: 800; color: #dc2626; font-size: 0.95rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-triangle-exclamation"></i> TIÊU CHUẨN 3: DNA TRÊN NGƯỠNG + NGUY CƠ</div>
    <div style="font-size: 0.88rem; line-height: 1.6; color: var(--handbook-text);">
      HBV DNA phát hiện kèm tiền sử gia đình HCC, đồng nhiễm HIV/HCV/HDV hoặc &ge; 30–35 tuổi.
      <div style="margin-top: 0.6rem; color: #dc2626; font-weight: 700;">
        &rArr; KHỞI TRỊ NGAY ĐỂ BẢO VỆ MÔ GAN.
      </div>
    </div>
  </div>

</div>
```

---

## THÀNH PHẦN 5: RAY DẪN ĐƯỜNG & THUẬT TOÁN QUYẾT ĐỊNH TỪNG BƯỚC

Hệ thống `.flow-track-container` kết hợp cột mốc (marker), ray dẫn (rail line) và phân nhánh rẽ nhánh (branching) rất thích hợp cho phác đồ tiếp cận bệnh nhân tại phòng khám:

```html
<div class="flow-track-container">
  <!-- BƯỚC 1 -->
  <div class="flow-track-step">
    <div class="flow-track-rail">
      <div class="flow-track-marker marker-blue">01</div>
      <div class="flow-track-line"></div>
    </div>
    <div class="flow-track-content accent-blue">
      <div class="flow-step-header">
        <div class="flow-step-title"><i class="fa-solid fa-vial-virus" style="color: #0284c7;"></i> Bước 1: Tiếp Nhận &amp; Xác Định HBsAg (+)</div>
        <span class="flow-step-badge flow-badge-blue">Ban đầu</span>
      </div>
      <div class="flow-step-text">
        Khai thác kỹ tiền sử nhiễm HBV trong quá khứ hoặc của mẹ/gia đình. Làm đồng thời: HBeAg, Anti-HBe, ALT/AST, HBV DNA và Siêu âm Doppler ổ bụng.
      </div>
    </div>
  </div>

  <!-- BƯỚC 2: RẼ NHÁNH QUYẾT ĐỊNH -->
  <div class="flow-track-step">
    <div class="flow-track-rail">
      <div class="flow-track-marker marker-teal">02</div>
      <div class="flow-track-line"></div>
    </div>
    <div class="flow-track-content accent-teal">
      <div class="flow-step-header">
        <div class="flow-step-title"><i class="fa-solid fa-code-branch" style="color: #0d9488;"></i> Bước 2: Đánh Giá Men Gan &amp; Xơ Hóa Gan</div>
        <span class="flow-step-badge flow-badge-amber">Phân nhánh</span>
      </div>
      <div class="flow-step-text">
        <div class="flow-branch-grid">
          <div class="flow-branch-card accent-green">
            <div class="flow-branch-title" style="color: #047857;">
              <i class="fa-solid fa-circle-check"></i> ALT ≤ ULN (Nam ≤ 35, Nữ ≤ 25)
            </div>
            <div class="flow-branch-desc">
              Chỉ định đo FibroScan khi gan không viêm. Nếu LSM &lt; 7.0 kPa: Nhóm nguy cơ thấp, theo dõi định kỳ.
            </div>
          </div>
          <div class="flow-branch-card accent-rose">
            <div class="flow-branch-title" style="color: #be123c;">
              <i class="fa-solid fa-triangle-exclamation"></i> ALT &gt; 2–5× ULN Hoặc Gan Đã Thô
            </div>
            <div class="flow-branch-desc">
              Tạm hoãn FibroScan; tính APRI/FIB-4. Khởi trị Tenofovir/Entecavir nếu HBV DNA vượt ngưỡng.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## THÀNH PHẦN 6: BẢNG CHẨN ĐOÁN, ĐỐI SÁNH & DƯỢC LÝ LIỀU DÙNG

Bảng đối chiếu lâm sàng đạt chuẩn responsive và bo góc mượt mà qua `.table-card` và `.table-wrapper`:

```html
<div class="table-card">
  <div class="table-header">
    <div class="table-title">
      <i class="fa-solid fa-table-cells"></i> Bảng Đối Chiếu: Viêm Gan B Cấp Tính Thật Sự vs Đợt Bùng Phát Trên Nền Mạn
    </div>
    <span class="table-badge"><i class="fa-solid fa-shield-virus"></i> Phân biệt sống còn</span>
  </div>
  <div class="table-wrapper">
    <table class="comparison-table">
      <thead>
        <tr>
          <th style="width: 25%;">Tiêu chí lâm sàng</th>
          <th style="width: 37%;">Viêm Gan B Cấp Tính Thật Sự</th>
          <th style="width: 38%;">Đợt Bùng Phát Cấp Trên Nền Mạn (Flare)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="highlight-cell"><strong>Tiền sử xét nghiệm</strong></td>
          <td>HBsAg (-) trong vòng 6 tháng gần nhất</td>
          <td>HBsAg (+) kéo dài &gt; 6 tháng hoặc người nhà nhiễm HBV</td>
        </tr>
        <tr>
          <td class="highlight-cell"><strong>Hiệu giá Anti-HBc IgM</strong></td>
          <td><span class="badge badge-teal">Rất cao</span> (S/CO &gt; 10, titer cao)</td>
          <td><span class="badge badge-amber">Thấp đến vừa</span> (S/CO &lt; 5 – 8)</td>
        </tr>
        <tr>
          <td class="highlight-cell"><strong>Hình thái nhu mô gan</strong></td>
          <td>Siêu âm gan mịn, lách bình thường</td>
          <td>Gan thô, bờ không đều, lách to, có dấu xơ gan</td>
        </tr>
        <tr>
          <td class="highlight-cell"><strong>Xử trí điều trị</strong></td>
          <td>Hồi sức hỗ trợ, &gt;95% tự đào thải</td>
          <td><strong style="color: #ef4444;">KHỞI TRỊ NUCs (TDF/TAF/ETV) CÀNG SỚM CÀNG TỐT</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### Bảng Dược Lý Tra Cứu Liều Dùng NUCs (`.dose-table-wrapper`)

```html
<div class="dose-table-wrapper">
  <table class="dose-table">
    <thead>
      <tr>
        <th>Thuốc Kháng Virus</th>
        <th>Liều Chuẩn Người Lớn</th>
        <th>Chỉnh Liều Theo eGFR (Thận)</th>
        <th>Ưu Tiên Lâm Sàng</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Tenofovir Alafenamide (TAF)</strong></td>
        <td>25 mg / ngày (uống cùng bữa ăn)</td>
        <td>Không cần chỉnh liều nếu eGFR ≥ 15 mL/min</td>
        <td>Ưu tiên cho người cao tuổi, loãng xương, suy thận</td>
      </tr>
      <tr>
        <td><strong>Tenofovir Disoproxil (TDF)</strong></td>
        <td>300 mg / ngày (uống lúc đói/no)</td>
        <td>eGFR &lt; 50 mL/min: Giãn cữ 48h–72h</td>
        <td>Phụ nữ có thai, đồng nhiễm HBV/HIV</td>
      </tr>
      <tr>
        <td><strong>Entecavir (ETV)</strong></td>
        <td>0.5 mg / ngày (chưa dùng NUCs)<br />1.0 mg / ngày (kháng Lamivudine)</td>
        <td>eGFR &lt; 50 mL/min: Giảm liều theo bậc</td>
        <td>Uống lúc đói (trước ăn 2h hoặc sau ăn 2h)</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## THÀNH PHẦN 7: THẺ CẠM BẪY LÂM SÀNG & CỜ ĐỎ TỬ VONG

Đóng gói các sai sót thường gặp trong phòng xét nghiệm thành lưới thẻ cạm bẫy trực quan:

```html
<div class="pitfall-grid">
  <!-- Thẻ Cạm bẫy 1 -->
  <div class="pitfall-card danger">
    <div class="pitfall-header">
      <div class="pitfall-badge"><i class="fa-solid fa-triangle-exclamation"></i> CẠM BẪY LAB 01</div>
      <div class="pitfall-title">Tin Vào Chữ "Bình Thường" Của Ngưỡng ALT Phòng Xét Nghiệm</div>
    </div>
    <div class="pitfall-body">
      Phần lớn máy sinh hóa cài ngưỡng tham chiếu chung 40–50 U/L cho cả nam và nữ. Nhưng ngưỡng chuẩn của gan khỏe mạnh thực tế theo AASLD là <strong>Nam ≤ 35 U/L, Nữ ≤ 25 U/L</strong>.
    </div>
    <div class="pitfall-consequence">
      <i class="fa-solid fa-skull-crossbones"></i> HẬU QUẢ: Bỏ sót tới 35% bệnh nhân nữ viêm gan mạn đang tiến triển xơ hóa.
    </div>
  </div>

  <!-- Thẻ Cạm bẫy 2 -->
  <div class="pitfall-card warning">
    <div class="pitfall-header">
      <div class="pitfall-badge"><i class="fa-solid fa-wave-square"></i> CẠM BẪY SCAN 02</div>
      <div class="pitfall-title">Đo Độ Cứng Gan (FibroScan) Khi Men Gan Đang Tăng Vọt</div>
    </div>
    <div class="pitfall-body">
      Khi tế bào gan viêm phù nề cấp, bao Glisson căng phồng làm vận tốc sóng biến dạng tăng vọt giả tạo, máy báo độ cứng 18–25 kPa (báo xơ gan F4 giả).
    </div>
    <div class="pitfall-consequence">
      <i class="fa-solid fa-ban"></i> HÀNH ĐỘNG: Hoãn đo scan khi ALT &gt; 5× ULN; dùng APRI hoặc FIB-4 thay thế.
    </div>
  </div>
</div>
```

---

## THÀNH PHẦN 8: CA BỆNH THỰC CHIẾN & TRỰC CẢM BÊN GIƯỜNG BỆNH

Dành cho các bài học ca bệnh thực tế hoặc phân tích tình huống sai lầm kinh điển:

```html
<div class="case-study-card">
  <div class="case-header">
    <div class="case-badge"><i class="fa-solid fa-user-doctor"></i> CA THỰC CHIẾN TẠI GIƯỜNG BỆNH</div>
    <div class="case-title">Bệnh nhân nữ 38 tuổi, phát hiện HBsAg (+) tình cờ khi khám sức khỏe định kỳ</div>
  </div>
  <div class="case-scenario-box">
    <strong>Tình huống:</strong> Bệnh nhân có kết quả HBsAg (+), HBeAg (-), Anti-HBe (+). Xét nghiệm lab tại phòng khám: ALT 32 U/L (phiếu lab ghi bình thường &lt; 40 U/L), HBV DNA = 42.000 IU/mL. Bác sĩ tuyến dưới dặn: "Virus ngủ yên, men gan tốt, không cần uống thuốc".
  </div>
  <div class="case-analysis">
    <strong>Phân tích lâm sàng:</strong> 
    - Bệnh nhân là nữ, ALT = 32 U/L thực chất là <strong>tăng 1.28 lần ULN AASLD</strong> (&gt; 25 U/L).<br />
    - Kết hợp HBV DNA &gt; 2.000 IU/mL và HBeAg (-) chứng tỏ bệnh nhân đang ở <strong>Pha 4 (Viêm gan mạn HBeAg âm tính đột biến Precore)</strong> chứ không phải người mang virus ngủ yên!<br />
    - Kết quả sinh thiết/FibroScan sau đó cho thấy xơ hóa tiến triển F3.
  </div>
  <div class="case-takeaway">
    <i class="fa-solid fa-lightbulb"></i> <strong>BÀI HỌC XƯƠNG MÁU:</strong> Luôn áp dụng ngưỡng ALT theo giới tính (Nam ≤ 35, Nữ ≤ 25) khi đánh giá bệnh nhân nhiễm HBV mạn tính.
  </div>
</div>
```

---

## THÀNH PHẦN 9: BIỂU THỨC TOÁN Y SINH KATEX MATH NOTATION

Hiển thị công thức tính chỉ số APRI, FIB-4, Child-Pugh, GFR bằng khối KaTeX đẹp mắt, có viền bo và hỗ trợ cuộn trên mobile:

```html
<div class="katex-display-card">
  <div class="equation-box">
    $$\text{APRI} = \frac{\left( \frac{\text{AST (U/L)}}{\text{AST ULN (U/L)}} \right)}{\text{Tiểu Cầu } (10^9/\text{L})} \times 100$$
  </div>
  <div class="equation-legend">
    <strong>Ý nghĩa lâm sàng:</strong> Ngưỡng $\text{APRI} > 1.5$ dự đoán xơ gan tiến triển (F4) với độ đặc hiệu cao, đặc biệt hữu ích khi không có máy đo độ cứng gan hoặc khi men gan quá cao không đo được FibroScan.
  </div>
</div>
```

---

## 13. QUY CHUẨN ĐẶT ID TIÊU ĐỀ CHO CLINIMDXENGINE (`{#sec-id}`)

`CliniMdxEngine` của CliniPortal hỗ trợ tự động bóc tách các Heading cấp 2 (`##`) có đuôi `{#custom-id}` để:
1. Tự động bọc khối nội dung vào thẻ HTML `<section class="article-section" id="sec-id">`.
2. Tạo danh mục liên kết tự động trong **Mục lục (TOC)** ở sidebar.
3. Đồng bộ chính xác với các đường link neo `#sec-id` trên thanh điều hướng dính `.pillars-nav`.

> ⚠️ **Lưu ý cú pháp quan trọng**:  
> **ĐÚNG**: `## ⚡ 1. Đúc Kết 30 Giây (The Bottom Line & Rule of Thumb) {#sec-takeaway}`  
> **SAI**: Không được gõ thẻ lồng thủ công `<section id="sec-takeaway">` trước `##`, vì parser sẽ tạo ra 2 thẻ section lồng nhau gây lỗi DOM!

---

## 14. GOLDEN TEMPLATE: CẤU TRÚC FILE MDX MẪU CHUẨN

Người biên soạn chỉ cần copy khung mẫu 8 phần dưới đây để đắp nội dung từ NotebookLM / y văn vào:

```markdown
---
title: "Tiêu Chuẩn Chẩn Đoán [Tên Bệnh Lý] & Cạm Bẫy Lâm Sàng"
slug: "slug-bai-viet"
specialty: "chuyen-khoa"
specialtyLabel: "Tên Chuyên Khoa Đầy Đủ"
disease: "ten-benh-slug"
diseaseLabel: "Tên Bệnh Lý Đầy Đủ"
order: 1
tags:
  - "Tên bệnh"
  - "Tiêu chuẩn chẩn đoán"
  - "Cạm bẫy lâm sàng"
  - "Phác đồ điều trị"
  - "EBM 2026"
difficulty: "advanced"             # beginner | intermediate | advanced
estimatedTime: 25                  # phút đọc & phân tích
lastUpdated: "2026-11-08"
evidenceLevel: "EBM 2026 • AASLD / ESC / KDIGO"
sections:
  - id: "sec-takeaway"
    number: 1
    title: "Đúc Kết 30 Giây (The Bottom Line & Rule of Thumb)"
    icon: "fa-bolt"
  - id: "sec-4-phases"
    number: 2
    title: "Bản Đồ Phân Tầng Giai Đoạn / Cơ Chế Bệnh Học"
    icon: "fa-diagram-project"
  - id: "sec-diagnostic-criteria"
    number: 3
    title: "Bộ Tiêu Chuẩn Chẩn Đoán Cốt Lõi & Chỉ Định Khởi Trị"
    icon: "fa-clipboard-check"
  - id: "sec-serology-pitfalls"
    number: 4
    title: "Cạm Bẫy Xét Nghiệm & Chẩn Đoán Phân Biệt"
    icon: "fa-triangle-exclamation"
  - id: "sec-alt-fibroscan-pitfalls"
    number: 5
    title: "Bẫy Ngưỡng Cận Lâm Sàng & Thăm Dò Chức Năng"
    icon: "fa-wave-square"
  - id: "sec-qhbsag-role"
    number: 6
    title: "Chiến Lược Dự Phòng Tái Phát & Phân Cấp Chuyển Tuyến"
    icon: "fa-chart-pie"
  - id: "sec-bedside-matrix"
    number: 7
    title: "Bảng Ma Trận Đối Chiếu & Bảng Kiểm Tại Giường Bệnh"
    icon: "fa-table-list"
  - id: "sec-case-scenarios"
    number: 8
    title: "Ca Lâm Sàng Thực Tế & Đúc Kết Xương Máu"
    icon: "fa-user-doctor"
---

# 🧬 TIÊU CHUẨN CHẨN ĐOÁN [TÊN BỆNH LÝ] & CẠM BẪY LÂM SÀNG

<div class="module-badge-group" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
  <span class="badge" style="background: rgba(2, 132, 199, 0.12); color: #0284c7; padding: 4px 10px; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; border: 1px solid rgba(2, 132, 199, 0.25);"><i class="fa-solid fa-stethoscope"></i> Chuyên Khoa</span>
  <span class="badge" style="background: rgba(16, 185, 129, 0.12); color: #059669; padding: 4px 10px; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; border: 1px solid rgba(16, 185, 129, 0.25);"><i class="fa-solid fa-file-shield"></i> Hướng Dẫn BYT</span>
  <span class="badge" style="background: rgba(245, 158, 11, 0.12); color: #d97706; padding: 4px 10px; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; border: 1px solid rgba(245, 158, 11, 0.25);"><i class="fa-solid fa-shield-halved"></i> EBM 2026</span>
</div>

<!-- DẢI CHỈ SỐ NHANH 30S -->
<section class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val blue">Chỉ số 1</div>
      <div class="stat-lbl">Mô tả chỉ số dịch tễ then chốt</div>
    </div>
    <div class="stat-card">
      <div class="stat-val red">Chỉ số 2</div>
      <div class="stat-lbl">Tỷ lệ tử vong hoặc gánh nặng bệnh tật</div>
    </div>
    <div class="stat-card">
      <div class="stat-val amber">Chỉ số 3</div>
      <div class="stat-lbl">Ngưỡng cut-off xét nghiệm quyết định</div>
    </div>
    <div class="stat-card">
      <div class="stat-val green">Chỉ số 4</div>
      <div class="stat-lbl">Hiệu quả cải thiện khi can thiệp sớm</div>
    </div>
  </div>
</section>

<!-- THANH ĐIỀU HƯỚNG NHANH CỐ ĐỊNH -->
<nav class="pillars-nav">
  <div class="pillars-nav-inner">
    <a href="#sec-takeaway" class="pillar-link active"><i class="fa-solid fa-bolt"></i> 1. Đúc Kết 30s</a>
    <a href="#sec-4-phases" class="pillar-link"><i class="fa-solid fa-diagram-project"></i> 2. Phân Tầng</a>
    <a href="#sec-diagnostic-criteria" class="pillar-link"><i class="fa-solid fa-clipboard-check"></i> 3. Tiêu Chuẩn & Khởi Trị</a>
    <a href="#sec-serology-pitfalls" class="pillar-link"><i class="fa-solid fa-triangle-exclamation"></i> 4. Bẫy Xét Nghiệm</a>
    <a href="#sec-alt-fibroscan-pitfalls" class="pillar-link"><i class="fa-solid fa-wave-square"></i> 5. Bẫy Cận Lâm Sàng</a>
    <a href="#sec-qhbsag-role" class="pillar-link"><i class="fa-solid fa-chart-pie"></i> 6. Phòng Ngừa & Chuyển Tuyến</a>
    <a href="#sec-bedside-matrix" class="pillar-link"><i class="fa-solid fa-table-list"></i> 7. Bảng Đối Chiếu</a>
    <a href="#sec-case-scenarios" class="pillar-link"><i class="fa-solid fa-user-doctor"></i> 8. Ca Thực Chiến</a>
  </div>
</nav>

---

## ⚡ 1. ĐÚC KẾT 30 GIÂY (THE BOTTOM LINE & RULE OF THUMB) {#sec-takeaway}

<div class="callout callout-pearl">
  <div class="callout-title"><i class="fa-solid fa-lightbulb"></i> NGUYÊN TẮC VÀNG TRONG TIẾP CẬN LÂM SÀNG</div>
  <p>Tóm tắt ngắn gọn trong 3–5 câu về bối cảnh dịch tễ, mục tiêu can thiệp và lưu ý sống còn...</p>
  <ul>
    <li><strong>Quy tắc 1:</strong> ...</li>
    <li><strong>Quy tắc 2:</strong> ...</li>
    <li><strong>Quy tắc 3:</strong> ...</li>
  </ul>
</div>

---

## 🗺️ 2. BẢN ĐỒ PHÂN TẦNG GIAI ĐOẠN / CƠ CHẾ BỆNH HỌC {#sec-4-phases}

<!-- DÙNG LƯỚI RESPONSIVE GRID CARDS (THÀNH PHẦN 4B) -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
  <!-- Các card phân tầng ở đây -->
</div>

---

## 📋 3. BỘ TIÊU CHUẨN CHẨN ĐOÁN CỐT LÕI & CHỈ ĐỊNH KHỞI TRỊ {#sec-diagnostic-criteria}

<!-- KaTeX Card tính điểm / công thức y sinh -->
<div class="katex-display-card">
  <div class="equation-box">
    $$\text{Công thức KaTeX}$$
  </div>
  <div class="equation-legend">
    <strong>Ý nghĩa lâm sàng:</strong> Giải thích các ngưỡng cut-off...
  </div>
</div>

---

## ⚠️ 4. CẠM BẪY XÉT NGHIỆM & CHẨN ĐOÁN PHÂN BIỆT {#sec-serology-pitfalls}

<!-- Lưới cạm bẫy lâm sàng -->
<div class="pitfall-grid">
  <div class="pitfall-card warning">
    <div class="pitfall-header">
      <div class="pitfall-badge"><i class="fa-solid fa-triangle-exclamation"></i> CẠM BẪY 01</div>
      <div class="pitfall-title">Tên cạm bẫy 1</div>
    </div>
    <div class="pitfall-body">Mô tả cơ chế gây hiểu nhầm...</div>
    <div class="pitfall-consequence"><i class="fa-solid fa-shield-virus"></i> HÀNH ĐỘNG KHUYẾN CÁO: ...</div>
  </div>
  <div class="pitfall-card danger">
    <div class="pitfall-header">
      <div class="pitfall-badge"><i class="fa-solid fa-ban"></i> CẠM BẪY 02</div>
      <div class="pitfall-title">Tên cạm bẫy 2</div>
    </div>
    <div class="pitfall-body">Mô tả cạm bẫy trí mạng...</div>
    <div class="pitfall-consequence"><i class="fa-solid fa-circle-exclamation"></i> HÀNH ĐỘNG KHUYẾN CÁO: ...</div>
  </div>
</div>

---

## 📉 5. BẪY NGƯỠNG CẬN LÂM SÀNG & THĂM DÒ CHỨC NĂNG {#sec-alt-fibroscan-pitfalls}

<!-- Bổ sung thẻ pitfall-card nguy hiểm -->

---

## 🎯 6. CHIẾN LƯỢC DỰ PHÒNG TÁI PHÁT & PHÂN CẤP CHUYỂN TUYẾN {#sec-qhbsag-role}

<!-- Phân định tuyến ban đầu vs tuyến chuyên sâu -->

---

## 📊 7. BẢNG MA TRẬN ĐỐI CHIẾU & BẢNG KIỂM TẠI GIƯỜNG BỆNH {#sec-bedside-matrix}

<div class="table-card">
  <div class="table-header">
    <div class="table-title"><i class="fa-solid fa-table-list"></i> BẢNG ĐỐI CHIẾU LÂM SÀNG</div>
  </div>
  <div class="handbook-table-container">
    <table class="handbook-table">
      <thead>
        <tr>
          <th>Tiêu Chí</th>
          <th>Thể A</th>
          <th>Thể B</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>...</td>
          <td>...</td>
          <td>...</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

---

## 🩺 8. CA LÂM SÀNG THỰC TẾ & ĐÚC KẾT XƯƠNG MÁU {#sec-case-scenarios}

<div class="case-study-card">
  <div class="case-header">
    <div class="case-badge"><i class="fa-solid fa-stethoscope"></i> CA THỰC CHIẾN 01</div>
    <div class="case-title">Tiêu đề tình huống lâm sàng</div>
  </div>
  <div class="case-scenario-box">
    <strong>Tình huống:</strong> Mô tả bệnh nhân, triệu chứng và kết quả xét nghiệm ban đầu...
  </div>
  <div class="case-analysis">
    <strong>Phân tích lâm sàng:</strong>
    <ul>
      <li>Điểm mấu chốt 1...</li>
      <li>Điểm mấu chốt 2...</li>
    </ul>
  </div>
  <div class="case-takeaway">
    <i class="fa-solid fa-lightbulb"></i> <strong>BÀI HỌC XƯƠNG MÁU:</strong> Đúc kết hành động thực hành...
  </div>
</div>

---

## 📚 9. TÀI LIỆU THAM KHẢO (CHUẨN AMA FORMAT) {#sec-references}

1. Tổ chức / Tác giả. *Tiêu đề nghiên cứu / Guideline*. Nơi xuất bản; Năm. doi:...
```


