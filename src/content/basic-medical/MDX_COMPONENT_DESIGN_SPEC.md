# 📘 MDX COMPONENT DESIGN SPECIFICATION — CƠ SỞ Y KHOA & CLINICAL SUITE
> **Phiên bản**: 2.0.0 (Gold Standard)  
> **Áp dụng cho**: `src/content/basic-medical/` (`physiology/`, `pathophysiology-cases/`, `biochemistry/`, `epidemiology/`) và `src/content/ebm/guidelines/`  
> **Mục tiêu**: Chuẩn hóa 100% cấu trúc, mã nguồn mẫu (Code Snippets), Design Tokens, KaTeX Math và cơ chế Responsive/Dark Mode cho từng thành phần giao diện của file `.mdx`.

---

## 📑 MỤC LỤC
1. [Nguyên Tắc & Hệ Thống Design Tokens](#1-nguyên-tắc--hệ-thống-design-tokens)
2. [Thành Phần 1: Frontmatter YAML Schema](#thành-phần-1-frontmatter-yaml-schema)
3. [Thành Phần 2: Hero Header & Quick Stats Strip](#thành-phần-2-hero-header--quick-stats-strip)
4. [Thành Phần 3: Sticky Quick Navigation Bar](#thành-phần-3-sticky-quick-navigation-bar)
5. [Thành Phần 4: Khung Thông Tin Y Khoa Chuyên Sâu (`*Alert` & `infobox`)](#thành-phần-4-khung-thông-tin-y-khoa-chuyên-sâu-alert--infobox)
6. [Thành Phần 5: Lưu Đồ, Sơ Đồ Cơ Chế & Sơ Đồ Chuyển Hóa (Flowchart & Pathway Studio)](#thành-phần-5-lưu-đồ-sơ-đồ-cơ-chế--sơ-đồ-chuyển-hóa-flowchart--pathway-studio)
7. [Thành Phần 6: Biểu Thức Toán Y Sinh & KaTeX Math Notation](#thành-phần-6-biểu-thức-toán-y-sinh--katex-math-notation)
8. [Thành Phần 7: Bảng Đối Sánh Lâm Sàng & Ma Trận Bento Grids](#thành-phần-7-bảng-đối-sánh-lâm-sàng--ma-trận-bento-grids)
9. [Thành Phần 8: Hàng Nút Hành Động & Trích Dẫn Y Văn AMA](#thành-phần-8-hàng-nút-hành-động--trích-dẫn-y-văn-ama)
10. [Golden Template: File MDX Mẫu Chuẩn Đầy Đủ](#10-golden-template-file-mdx-mẫu-chuẩn-đầy-đủ)

---

## 1. NGUYÊN TẮC & HỆ THỐNG DESIGN TOKENS

Mọi thành phần trong MDX bắt buộc tuân thủ hệ thống CSS Variables chung của CliniPortal:

```css
/* Color Tokens */
--color-primary: #0284c7;        /* Màu chủ đạo (Sky Blue) */
--color-primary-dark: #0369a1;   /* Màu nhấn tương phản */
--color-surface: #ffffff;        /* Nền thẻ / Container (Light) */
--color-surface-2: #f8fafc;      /* Nền phụ (Light) */
--color-bg: #f0f4f8;             /* Nền toàn trang */
--color-border: #cbd5e1;         /* Viền tiêu chuẩn */
--color-text: #0f172a;           /* Chữ chính */
--color-text-muted: #475569;     /* Chữ phụ / Chú thích */

/* Clinical Semantic Accents */
--color-success: #059669;        /* Sinh lý bình thường, Tiên lượng tốt */
--color-warning: #d97706;        /* Theo dõi, Nguy cơ trung bình */
--color-danger: #dc2626;         /* Cấp cứu, Cờ đỏ (Red Flags), Độc tính */
--color-purple: #7c3aed;         /* Chuyển hóa, Dược lý, Gen di truyền */
--color-teal: #0d9488;           /* Cận lâm sàng, Xét nghiệm Lab */

/* Dark Mode Tokens (Tự động kích hoạt với [data-theme="dark"]) */
[data-theme="dark"] {
  --color-surface: #1e293b;
  --color-surface-2: #0f172a;
  --color-bg: #0b1120;
  --color-border: #334155;
  --color-text: #f1f5f9;
  --color-text-muted: #94a3b8;
}
```

---

## THÀNH PHẦN 1: FRONTMATTER YAML SCHEMA

Mỗi file MDX bắt buộc bắt đầu bằng khối metadata YAML chuẩn hóa:

```yaml
---
title: "Sinh Lý Lọc Tại Cầu Thận & Độ Lọc Cầu Thận (GFR)"
slug: "sl-than-cauthan"
code: "PHYS-REN-01"
part: "part6"                          # part1 - part9 (áp dụng cho Physiology)
system: "renal"
systemName: "Sinh Lý Thận & Thể Dịch"
guytonChapter: "Guyton 14th - Chapter 26 & 27"
ganongChapter: "Ganong 26th - Chapter 37"
category: "physiology"                 # physiology | pathophysiology | biochemistry | epidemiology
status: "published"
version: "2.0.0"
updatedAt: "2026-08-26"
description: "Mô tả ngắn gọn, súc tích (1-2 câu) phục vụ mục lục, thẻ tóm tắt và Search Index."
tags:
  - "sinh-ly"
  - "cau-than"
  - "gfr"
  - "starling"
clinicalPearls:
  - "Màng đáy cầu thận tích điện âm (Heparan Sulfate) đẩy lùi hoàn toàn Albumin dù bán kính phân tử nhỏ hơn lỗ lọc."
  - "NSAIDs làm co tiểu động mạch đến, ACEi/ARBs làm giãn tiểu động mạch đi; phối hợp khi mất nước gây Prerenal AKI."
sections:
  - id: "sec-1"
    number: 1
    title: "Cấu Trúc Màng Lọc Cầu Thận 3 Lớp"
    icon: "fa-filter"
  - id: "sec-2"
    number: 2
    title: "Động Lực Học Starling & Áp Suất Lọc (NFP)"
    icon: "fa-scale-balanced"
  - id: "sec-3"
    number: 3
    title: "Độ Lọc Cầu Thận GFR & Phân Suất Lọc (FF)"
    icon: "fa-gauge-high"
  - id: "sec-4"
    number: 4
    title: "Tài Liệu Tham Khảo EBM"
    icon: "fa-book-medical"
---
```

---

## THÀNH PHẦN 2: HERO HEADER & QUICK STATS STRIP

Dùng để hiển thị các chỉ số sinh lý / dịch tễ / hóa sinh cốt lõi ngay đầu bài viết giúp ghi nhớ nhanh:

```html
<!-- DẢI CHỈ SỐ NHANH (QUICK STATS STRIP) -->
<section class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val blue">125 mL/min</div>
      <div class="stat-lbl">Độ lọc cầu thận GFR chuẩn (180 Lít dịch lọc/ngày)</div>
    </div>
    <div class="stat-card">
      <div class="stat-val green">+10 mmHg</div>
      <div class="stat-lbl">Áp suất lọc ròng (NFP = Pgc - Pbs - πgc)</div>
    </div>
    <div class="stat-card">
      <div class="stat-val amber">20% (0.20)</div>
      <div class="stat-lbl">Phân suất lọc sinh lý (FF = GFR / RPF)</div>
    </div>
    <div class="stat-card">
      <div class="stat-val red">&lt; 0.01%</div>
      <div class="stat-lbl">Tỷ lệ Albumin qua màng nhờ rào cản điện tích âm</div>
    </div>
  </div>
</section>
```

---

## THÀNH PHẦN 3: STICKY QUICK NAVIGATION BAR

Thanh điều hướng nhanh neo cố định (sticky) khi cuộn trang, tự động liên kết với các `id="sec-..."` của bài viết:

```html
<nav class="pillars-nav">
  <div class="pillars-nav-inner">
    <a href="#sec-1" class="pillar-link active">
      <i class="fa-solid fa-filter"></i> 1. Màng Lọc
    </a>
    <a href="#sec-2" class="pillar-link">
      <i class="fa-solid fa-scale-balanced"></i> 2. Lực Starling
    </a>
    <a href="#sec-3" class="pillar-link">
      <i class="fa-solid fa-gauge-high"></i> 3. GFR &amp; FF
    </a>
    <a href="#sec-4" class="pillar-link">
      <i class="fa-solid fa-book-medical"></i> 4. Trích Dẫn
    </a>
  </div>
</nav>
```

---

## THÀNH PHẦN 4: KHUNG THÔNG TIN Y KHOA CHUYÊN SÂU (`*Alert` & `infobox`)

Phục vụ việc làm nổi bật các điểm chốt lâm sàng, chống chỉ định, hoặc cơ chế phân tử:

```html
<!-- 1. ALERT ĐIỂM NGỌC LÂM SÀNG (PEARL) -->
<div class="infobox pearl">
  <i class="fa-solid fa-gem infobox-icon" style="color: #0284c7;"></i>
  <div>
    <strong>Điểm Ngọc Lâm Sàng (Clinical Pearl):</strong><br />
    Trong Bệnh Sang Thương Tối Thiểu (MCD), mất các gốc điện tích âm Heparan Sulfate làm Albumin lọt qua ồ ạt, gây Hội chứng thận hư tiểu đạm chọn lọc cao.
  </div>
</div>

<!-- 2. ALERT CẢNH BÁO NGUY HIỂM / CHỐNG CHỈ ĐỊNH (DANGER) -->
<div class="infobox danger">
  <i class="fa-solid fa-triangle-exclamation infobox-icon" style="color: #dc2626;"></i>
  <div>
    <strong>Cảnh Báo Tương Tác Dược Lý (Red Flag):</strong><br />
    Tuyệt đối không phối hợp NSAIDs (co tiểu ĐM đến) + ACEi/ARBs (giãn tiểu ĐM đi) ở bệnh nhân mất nước vì triệt tiêu hoàn toàn áp lực lọc cầu thận ($P_{GC}$), gây Suy thận cấp trước thận nặng.
  </div>
</div>

<!-- 3. ALERT PHẢN ỨNG / CƠ CHẾ ENZYME (REACTION) -->
<div class="infobox reaction">
  <i class="fa-solid fa-flask-vial infobox-icon" style="color: #7c3aed;"></i>
  <div>
    <strong>Điểm Chốt Động Học Enzym:</strong><br />
    Enzym HMG-CoA Reductase là enzyme giới hạn tốc độ tổng hợp Cholesterol nội sinh, bị ức chế cạnh tranh thuận nghịch bởi nhóm thuốc Statins.
  </div>
</div>

<!-- 4. ALERT THÔNG TIN / GHI CHÚ (INFO) -->
<div class="infobox info">
  <i class="fa-solid fa-circle-info infobox-icon" style="color: #0d9488;"></i>
  <div>
    <strong>Ghi Chú Sinh Học:</strong><br />
    Lưu lượng máu đến thận ($RBF \approx 1200\text{ mL/min}$) chiếm tới 20–25% cung lượng tim lúc nghỉ ngơi.
  </div>
</div>
```

---

## THÀNH PHẦN 5: LƯU ĐỒ, SƠ ĐỒ CƠ CHẾ & SƠ ĐỒ CHUYỂN HÓA (Flowchart & Pathway Studio)

### Dạng A: Lưới Con Đường Cơ Chế Đa Cột (`.flow-step-grid` + `.flow-step-card`)
Dùng khi có 3 - 6 cơ chế / con đường sinh lý tác động đồng thời (Ví dụ: Chế độ ăn DASH, Cơ chế bệnh sinh Sốc, Cơ chế đề kháng kháng sinh):

```html
<div class="flow-container">
  <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 1.02rem; color: var(--color-text); margin-bottom: 0.35rem;">
    Figure 1. Các Con Đường Tác Động Hiệp Đồng Của Vi Chất &amp; Dưỡng Chất
  </div>
  <div style="font-size: 0.84rem; color: var(--color-text-muted); margin-bottom: 1.25rem;">
    Mô hình phối hợp các con đường sinh lý học điều hòa sức cản mạch máu và thể tích tuần hoàn:
  </div>

  <div class="flow-step-grid">
    <!-- Thẻ 1: Kali (Xanh Dương) -->
    <div class="flow-step-card c-kali">
      <div class="flow-step-num">PATHWAY 01 • KALI</div>
      <div class="flow-step-title">Tăng Nạp Kali (K⁺)</div>
      <div class="flow-step-desc">
        Thúc đẩy bài tiết Natri qua ống thận &amp; Giảm co thắt tế bào cơ trơn mạch máu qua bơm Na⁺/K⁺-ATPase.
      </div>
      <div class="flow-step-impact">
        <i class="fa-solid fa-arrow-trend-down"></i> Giảm sức cản ngoại biên &amp; thể tích
      </div>
    </div>

    <!-- Thẻ 2: Magie (Xanh Ngọc) -->
    <div class="flow-step-card c-magie">
      <div class="flow-step-num">PATHWAY 02 • MAGIE</div>
      <div class="flow-step-title">Tăng Nạp Magie (Mg²⁺)</div>
      <div class="flow-step-desc">
        Hoạt động như <strong>chất chẹn kênh Canxi tự nhiên</strong>, kích hoạt tổng hợp Nitric Oxide (NO) gây giãn mạch.
      </div>
      <div class="flow-step-impact">
        <i class="fa-solid fa-arrow-trend-down"></i> Giãn trực tiếp mạch máu &amp; hạ áp
      </div>
    </div>

    <!-- Thẻ 3: Canxi (Hổ Phách) -->
    <div class="flow-step-card c-canxi">
      <div class="flow-step-num">PATHWAY 03 • CANXI</div>
      <div class="flow-step-title">Tăng Nạp Canxi (Ca²⁺)</div>
      <div class="flow-step-desc">
        Điều hòa trương lực giao cảm, ổn định màng tế bào và ức chế giải phóng renin từ phức hợp cận cầu thận.
      </div>
      <div class="flow-step-impact">
        <i class="fa-solid fa-shield-halved"></i> Ổn định đáp ứng co giãn mạch
      </div>
    </div>

    <!-- Thẻ 4: Giảm Natri (Đỏ Cảnh Báo) -->
    <div class="flow-step-card c-natri">
      <div class="flow-step-num">PATHWAY 04 • GIẢM NATRI</div>
      <div class="flow-step-title">Giảm Natri (1500–2300 mg)</div>
      <div class="flow-step-desc">
        Cắt giảm giữ muối nước và dịch ngoại bào, giảm áp lực đổ đầy tâm thất và giảm cung lượng tim.
      </div>
      <div class="flow-step-impact">
        <i class="fa-solid fa-arrow-trend-down"></i> Giảm áp lực dịch tuần hoàn
      </div>
    </div>
  </div>

  <!-- TỔNG KẾT KẾT CỤC DƯỚI ĐÁY -->
  <div style="margin-top: 1.25rem; padding: 0.85rem 1.1rem; background: rgba(5,150,105,0.08); border: 1.5px solid rgba(5,150,105,0.25); border-radius: 10px; text-align: center; font-weight: 800; font-size: 0.88rem; color: #059669;">
    <i class="fa-solid fa-circle-check"></i> KẾT CỤC HIỆP ĐỒNG: HẠ HUYẾT ÁP TÂM THU (-11 mmHg) &amp; TÂM TRƯƠNG (-5.5 mmHg) BỀN VỮNG
  </div>
</div>
```

---

### Dạng B: Chuỗi Lưu Đồ Quyết Định Từng Bước (`.flow-steps` + `.flow-step`)
Dùng khi mô tả lưu đồ thuật toán chẩn đoán, phân tầng nguy cơ hoặc phác đồ xử trí cấp cứu:

```html
<div class="flow-steps">
  <!-- Bước 1 -->
  <div class="flow-step">
    <div class="flow-icon">01</div>
    <div class="flow-content">
      <div class="flow-title">Bước 1: Đánh Giá Huyết Động &amp; Cấp Cứu Ban Đầu</div>
      <div class="flow-desc">
        Xác định ngay dấu hiệu suy sụp tuần hoàn (SBP &lt; 90 mmHg, SpO₂ &lt; 90%, tri giác thay đổi).
      </div>
    </div>
  </div>

  <!-- Bước 2: Điểm Rẽ Nhánh -->
  <div class="flow-step">
    <div class="flow-icon">02</div>
    <div class="flow-content">
      <div class="flow-title">Bước 2: Phân Tầng Theo Thang Điểm Nguy Cơ</div>
      <div class="flow-desc">Đánh giá nguy cơ diễn tiến tử vong hoặc tổn thương tạng cấp:</div>
      
      <div class="flow-branch">
        <div class="flow-branch-card accent-green">
          <strong>✅ Nguy Cơ Thấp:</strong><br />
          Theo dõi ngoại trú, tái khám sau 48–72h.
        </div>
        <div class="flow-branch-card accent-red">
          <strong>🚨 Nguy Cơ Cao:</strong><br />
          Chỉ định nhập ICU, khởi trị thuốc vận mạch IV sớm.
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## THÀNH PHẦN 6: BIỂU THỨC TOÁN Y SINH & KaTeX MATH NOTATION

Sử dụng cú pháp KaTeX tiêu chuẩn (`$$` cho khối công thức lớn, `$` cho công thức inline trong dòng):

```markdown
### 1. Áp Suất Lọc Ròng (Net Filtration Pressure - NFP)
$$\text{NFP} = (P_{GC} - P_{BS}) - (\pi_{GC} - \pi_{BS})$$

$$\text{NFP} = (+60\text{ mmHg} - 18\text{ mmHg}) - (32\text{ mmHg} - 0\text{ mmHg}) = \mathbf{+10\text{ mmHg}}$$

### 2. Độ Lọc Cầu Thận (Glomerular Filtration Rate - GFR)
$$GFR = K_f \times \text{NFP} = 12.5\text{ mL/min/mmHg} \times 10\text{ mmHg} = \mathbf{125\text{ mL/phút} \approx 180\text{ Lít/ngày}}$$

### 3. Phân Suất Thải Natri (Fractional Excretion of Sodium - $\text{FE}_{\text{Na}}$)
$$\text{FE}_{\text{Na}} = \frac{U_{\text{Na}} \times P_{\text{Cr}}}{P_{\text{Na}} \times U_{\text{Cr}}} \times 100\%$$

- $\text{FE}_{\text{Na}} < 1\%$: Hướng tới **AKI Trước Thận** (Ống thận tái hấp thu Natri tốt).
- $\text{FE}_{\text{Na}} > 2\%$: Hướng tới **Hoại Tử Ống Thận Cấp - ATN** (Ống thận mất khả năng giữ Natri).
```

---

## THÀNH PHẦN 7: BẢNG ĐỐI SÁNH LÂM SÀNG & MA TRẬN BENTO GRIDS

### Dạng A: Bảng Đối Sánh Y Khoa Có Responsive Wrapper (`.table-responsive`)

```html
<div class="table-responsive">
  <table class="table-modern">
    <thead>
      <tr>
        <th style="width: 25%;">Chỉ Số Phân Biệt</th>
        <th style="width: 37%;">Suy Thận Trước Thận (Prerenal AKI)</th>
        <th style="width: 38%;">Hoại Tử Ống Thận Cấp (ATN)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Áp lực thẩm thấu niệu ($U_{\text{osm}}$)</strong></td>
        <td><span class="rx-tag preferred">&gt; 500 mOsm/kg</span> (Cô đặc tốt)</td>
        <td><span class="rx-tag danger">&lt; 350 mOsm/kg</span> (Mất khả năng cô đặc)</td>
      </tr>
      <tr>
        <td><strong>Natri niệu ($U_{\text{Na}}$)</strong></td>
        <td><span class="rx-tag preferred">&lt; 20 mEq/L</span> (Tăng giữ muối)</td>
        <td><span class="rx-tag danger">&gt; 40 mEq/L</span> (Mất muối qua nước tiểu)</td>
      </tr>
      <tr>
        <td><strong>Phân suất thải Natri ($\text{FE}_{\text{Na}}$)</strong></td>
        <td><span class="rx-tag preferred">&lt; 1%</span></td>
        <td><span class="rx-tag danger">&gt; 2%</span></td>
      </tr>
      <tr>
        <td><strong>Cặn lắng nước tiểu (Sediment)</strong></td>
        <td>Trụ trong (Hyaline casts) hoặc bình thường</td>
        <td><strong>Trụ hạt nâu bùn (Muddy brown granular casts)</strong></td>
      </tr>
    </tbody>
  </table>
</div>
```

---

### Dạng B: Ma Trận Khám Phá Bento (`.matrix-grid` + `.matrix-card`)

```html
<div class="matrix-grid">
  <div class="matrix-card">
    <div class="matrix-card-title">
      <span>1. Màng Đáy Cầu Thận (GBM)</span>
      <span class="rx-tag preferred">Điện tích âm</span>
    </div>
    <div class="matrix-card-desc">
      Cấu tạo từ Collagen type IV, Laminin và Heparan sulfate proteoglycan, tạo rào cản ngăn protein mang điện âm.
    </div>
  </div>

  <div class="matrix-card">
    <div class="matrix-card-title">
      <span>2. Tế Bào Có Chân (Podocytes)</span>
      <span class="rx-tag info">Khe lọc 25–30 nm</span>
    </div>
    <div class="matrix-card-desc">
      Các chân lồng vào nhau tạo khe lọc được nối bởi phân tử Nephrin và Podocin, điều hòa tính thấm chọn lọc.
    </div>
  </div>
</div>
```

---

## THÀNH PHẦN 8: HÀNG NÚT HÀNH ĐỘNG & TRÍCH DẪN Y VĂN AMA

Đặt ở cuối mỗi bài viết để đảm bảo tính toàn vẹn EBM và điều hướng quay lại danh mục trơn tru:

```html
<!-- KHUNG TRÍCH DẪN Y VĂN CHUẨN AMA (CITATION BOX) -->
<div class="citation-box" style="margin-top: 1.5rem;">
  <strong>Trích dẫn tài liệu tham khảo chuẩn (AMA Format):</strong><br />
  1. Hall JE, Hall ME. <em>Guyton and Hall Textbook of Medical Physiology</em>. 14th ed. Philadelphia, PA: Elsevier; 2021:321-344.<br />
  2. Barrett KE, Barman SM, Brooks HL, Yuan JXJ. <em>Ganong's Review of Medical Physiology</em>. 26th ed. New York, NY: McGraw-Hill; 2019:657-678.
</div>

<!-- HÀNG NÚT ĐIỀU HƯỚNG SPA (#/ebm/kho-guidelines HOẶC MỤC LỤC PHÂN HỆ) -->
<div class="btn-row">
  <a href="#/basic-medical/physiology" class="btn btn-primary">
    <i class="fa-solid fa-arrow-left"></i> Quay lại Mục Lục Sinh Lý Học
  </a>
  <a href="#sec-1" class="btn">
    <i class="fa-solid fa-arrow-up"></i> Lên đầu trang
  </a>
</div>
```

---

## 10. GOLDEN TEMPLATE: FILE MDX MẪU CHUẨN ĐẦY ĐỦ

Dưới đây là khung mẫu hoàn chỉnh để tạo bất kỳ bài viết Y khoa mới nào trong CliniPortal:

```mdx
---
title: "Tiêu Đề Bài Viết Y Khoa Chuẩn"
slug: "ma-dinh-danh-slug"
code: "PHYS-SYS-01"
part: "part6"
system: "renal"
systemName: "Tên Chuyên Khoa / Hệ Cơ Quan"
guytonChapter: "Guyton 14th - Chapter XX"
category: "physiology"
status: "published"
version: "2.0.0"
updatedAt: "2026-08-28"
description: "Mô tả ngắn gọn 1-2 câu súc tích về nội dung và giá trị lâm sàng của bài viết."
tags:
  - "tu-khoa-1"
  - "tu-khoa-2"
clinicalPearls:
  - "Điểm ngọc lâm sàng đắt giá số 1."
  - "Điểm ngọc lâm sàng đắt giá số 2."
sections:
  - id: "sec-1"
    number: 1
    title: "Đại Cương & Cơ Chế Nền Tảng"
    icon: "fa-book-medical"
  - id: "sec-2"
    number: 2
    title: "Sơ Đồ Cơ Chế & Phân Tầng Lâm Sàng"
    icon: "fa-route"
  - id: "sec-3"
    number: 3
    title: "Bảng Đối Sánh & Ứng Dụng Thực Hành"
    icon: "fa-table"
  - id: "sec-4"
    number: 4
    title: "Tài Liệu Tham Khảo EBM"
    icon: "fa-graduation-cap"
---

<nav class="pillars-nav">
  <div class="pillars-nav-inner">
    <a href="#sec-1" class="pillar-link active"><i class="fa-solid fa-book-medical"></i> 1. Đại Cương</a>
    <a href="#sec-2" class="pillar-link"><i class="fa-solid fa-route"></i> 2. Cơ Chế</a>
    <a href="#sec-3" class="pillar-link"><i class="fa-solid fa-table"></i> 3. Đối Sánh</a>
    <a href="#sec-4" class="pillar-link"><i class="fa-solid fa-graduation-cap"></i> 4. Trích Dẫn</a>
  </div>
</nav>

<div class="page-content">

  <!-- SECTION 1 -->
  <section class="sec-card" id="sec-1">
    <div class="sec-hdr">
      <span class="sec-hdr-icon">🔬</span>
      <h2 class="sec-title">1. Đại Cương &amp; Cơ Chế Nền Tảng</h2>
    </div>
    <div class="sec-body">
      <p>Nội dung lý thuyết y khoa chuyên sâu được trình bày rõ ràng, súc tích...</p>

      <div class="infobox pearl">
        <i class="fa-solid fa-gem infobox-icon" style="color: #0284c7;"></i>
        <div>
          <strong>Điểm Ngọc Lâm Sàng (Clinical Pearl):</strong><br />
          Mô tả ngắn gọn mẹo chẩn đoán hoặc cạm bẫy cần tránh trong thực hành.
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 2 -->
  <section class="sec-card" id="sec-2">
    <div class="sec-hdr">
      <span class="sec-hdr-icon">🗺️</span>
      <h2 class="sec-title">2. Sơ Đồ Cơ Chế &amp; Phân Tầng Lâm Sàng</h2>
    </div>
    <div class="sec-body">
      <div class="flow-container">
        <div class="flow-step-grid">
          <div class="flow-step-card c-kali">
            <div class="flow-step-num">CƠ CHẾ 01</div>
            <div class="flow-step-title">Con Đường Kích Hoạt</div>
            <div class="flow-step-desc">Mô tả tác động của thụ thể và chất truyền tin thứ hai.</div>
            <div class="flow-step-impact"><i class="fa-solid fa-check"></i> Hiệu ứng sinh học 1</div>
          </div>
          <div class="flow-step-card c-magie">
            <div class="flow-step-num">CƠ CHẾ 02</div>
            <div class="flow-step-title">Con Đường Ức Chế</div>
            <div class="flow-step-desc">Mô tả cơ chế feedback điều hòa ngược âm tính.</div>
            <div class="flow-step-impact"><i class="fa-solid fa-shield-halved"></i> Bảo vệ cơ quan đích</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 3 -->
  <section class="sec-card" id="sec-3">
    <div class="sec-hdr">
      <span class="sec-hdr-icon">📊</span>
      <h2 class="sec-title">3. Bảng Đối Sánh &amp; Ứng Dụng Thực Hành</h2>
    </div>
    <div class="sec-body">
      <div class="table-responsive">
        <table class="table-modern">
          <thead>
            <tr>
              <th>Đặc Điểm</th>
              <th>Nhóm A</th>
              <th>Nhóm B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Cơ chế chính</strong></td>
              <td>Giãn mạch trực tiếp</td>
              <td>Ức chế co mạch qua trục RAAS</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- SECTION 4: CITATION & FOOTER -->
  <section class="sec-card" id="sec-4">
    <div class="sec-hdr">
      <span class="sec-hdr-icon">📚</span>
      <h2 class="sec-title">4. Tài Liệu Tham Khảo EBM</h2>
    </div>
    <div class="sec-body">
      <div class="citation-box">
        <strong>Trích dẫn tài liệu tham khảo chuẩn (AMA Format):</strong><br />
        1. Hall JE, Hall ME. <em>Guyton and Hall Textbook of Medical Physiology</em>. 14th ed. Philadelphia, PA: Elsevier; 2021.<br />
        2. Barrett KE, et al. <em>Ganong's Review of Medical Physiology</em>. 26th ed. McGraw-Hill; 2019.
      </div>

      <div class="btn-row">
        <a href="#/basic-medical/physiology" class="btn btn-primary">
          <i class="fa-solid fa-arrow-left"></i> Quay lại Mục Lục
        </a>
        <a href="#sec-1" class="btn">
          <i class="fa-solid fa-arrow-up"></i> Lên đầu trang
        </a>
      </div>
    </div>
  </section>

</div>
```
