---
name: physiology-module
description: >
  Quy trình tạo và chỉnh sửa bài viết Sinh lý học Y khoa chuẩn MDX Native (Astro Content Collections)
  trong phân hệ Cơ sở Y khoa (src/content/basic-medical/physiology/) của CliniPortal.
  Kích hoạt khi AI cần: viết bài học sinh lý mới thuộc 9 khối (Part 1 - Part 9),
  thêm sơ đồ vòng điều hòa phản hồi (Feedback loops) SVG, công thức toán lý sinh KaTeX (Nernst, GHK, Starling, GFR),
  hoặc tích hợp các ca lâm sàng / dược lý ứng dụng chuẩn Guyton 14th & Ganong 26th.
---

# Physiology Module Skill (Sinh Lý Học Y Khoa — MDX Native)

> Kỹ năng chuyên sâu hướng dẫn cấu trúc, cú pháp MDX Native, hệ thống linh kiện y khoa (`PhysioQuickNav`, `Alert`, `stats-strip`, `table-modern`, `matrix-grid`), công thức toán KaTeX và sơ đồ điều hòa sinh lý SVG cho phân hệ **Sinh Lý Học Y Khoa (Medical Physiology)** trong CliniPortal.

---

## 🏛️ 1. Quy hoạch Phân hệ 9 Khối Sinh Lý (9 Parts)

Tất cả các bài viết Sinh lý học được lưu trữ dưới định dạng `.mdx` tại `src/content/basic-medical/physiology/`:

```text
src/content/basic-medical/physiology/
├── README.md
├── part1/                         # Part 1: Sinh lý Tế bào, Màng & Nội môi (Cellular & Homeostasis)
├── part2/                         # Part 2: Thần kinh & Cơ (Neuromuscular Physiology)
├── part3/                         # Part 3: Tim mạch & Huyết động học (Cardiovascular & Hemodynamics)
├── part4/                         # Part 4: Hô hấp & Trao đổi khí (Respiratory Physiology)
├── part5/                         # Part 5: Thận, Cân bằng Thể dịch & Toan kiềm (Renal & Acid-Base)
├── part6/                         # Part 6: Tiêu hóa & Gan mật (Gastrointestinal & Hepatobiliary)
├── part7/                         # Part 7: Nội tiết & Chuyển hóa (Endocrinology & Metabolism)
├── part8/                         # Part 8: Sinh sản & Phát triển (Reproductive Physiology)
├── part9/                         # Part 9: Thần kinh Cấp cao & Giác quan (Sensory & CNS Physiology)
└── components/                    # Linh kiện TSX/Astro (PhysioQuickNav)
```

Nguồn tri thức gốc được lưu trữ tại:
`knowledge-vault/1.1. Kho sinh lý y học/[Tên Phần]/SL_[Tên bài].md`

---

## 🛑 2. Bộ Quy tắc Bất di Bất dịch (Mandatory Rules for MDX Native)

1. **Chuẩn Định Dạng MDX Native — Không Dùng HTML Shell**:
   - Tệp bài viết có đuôi `.mdx` (ví dụ: `sl-tb-mangtebao.mdx`, `sl-than-cauthan.mdx`, `sl-tim-dien-the.mdx`).
   - Tuyệt đối **KHÔNG** dùng `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, `<script>`, `<style>`.
   - Layout được quản lý tập trung qua `src/pages/sinh-ly/[...slug].astro` và `ArticleLayout.astro`.

2. **Khối YAML Frontmatter Chuẩn Hóa**:
   - Mọi tệp `.mdx` bắt buộc bắt đầu bằng Frontmatter đầy đủ: `title`, `slug`, `code`, `part`, `system`, `systemName`, `guytonChapter`, `ganongChapter`, `category: "physiology"`, `status: "published"`, `version: "2.0.0"`, `updatedAt`, `description`, `tags`, `clinicalPearls`, `sections`.

3. **Thanh Mục Lục Tự Động (`<PhysioQuickNav />`)**:
   - Đặt `<PhysioQuickNav />` ngay sau thẻ tiêu đề `<h1>` của bài viết.
   - Các mục trong mảng `sections: [{ id: "sec-1", number: 1, title: "...", icon: "fa-..." }]` tự động đồng bộ với thanh điều hướng nhanh sticky và Sidebar Table of Contents.
   - Tiêu đề từng phần trong bài dùng cú pháp: `## 1. Tên Phần {#sec-1}`, `## 2. Tên Phần {#sec-2}`.

4. **Chuẩn Toán Y Sinh & Biểu Thức KaTeX**:
   - Dùng `$$ ... $$` cho các công thức định lượng sinh lý (Nernst, GHK, Fick, Starling, GFR, Henderson-Hasselbalch, Clearance, FEV1/FVC).
   - Dùng `$ ... $` cho các biến số trong dòng ($V_m$, $P_{GC}$, $\pi_{GC}$, $\text{FE}_{\text{Na}}$, $\text{PaO}_2$).
   - **Escape ký tự JSX**: Dấu so sánh `<` viết thành `&lt;`, `>` viết thành `&gt;`, ngoặc `{` viết thành `&#123;`, `}` viết thành `&#125;` ngoài JSX props.

5. **Chuẩn Sơ Đồ Điều Hòa Sinh Lý SVG (Editorial Pure Inline SVG)**:
   - Sơ đồ phản hồi thần kinh - thể dịch (Negative/Positive Feedback Loops), trục dưới đồi - tuyến yên - tuyến đích dùng Pure Inline SVG với `viewBox` co giãn linh hoạt và token `var(--color-...)` để tự động đổi màu khi sang Dark Mode.
   - **TUYỆT ĐỐI CẤM** dùng các thẻ HTML (`<strong>`, `<b>`, `<span>`, `<br>`) bên trong `<text>` của SVG. Bắt buộc dùng `<tspan font-weight="700">` hoặc các thẻ `<text>` định vị tọa độ rõ ràng.

6. **Kiểm Định Bản Build Bắt Buộc**:
   - Sau khi tạo hoặc chỉnh sửa tệp `.mdx`, bắt buộc kiểm tra bằng:
     ```bash
     npm run build
     ```
   - Lệnh này chạy `tsc --noEmit && vite build` để đảm bảo 0 lỗi kiểu dữ liệu TypeScript và biên dịch toàn bộ các module MDX thành công.

---

## 🎨 3. Hệ Thống Linh Kiện MDX Y Khoa Trong Phân Hệ Sinh Lý

### A. Dải Chỉ Số Sinh Lý Nhanh (`.stats-strip`)

```html
<section class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val blue">125 mL/min</div>
      <div class="stat-lbl">Độ lọc cầu thận chuẩn (180 Lít dịch lọc/ngày)</div>
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

### B. Khung Thông Tin Y Khoa & Điểm Ngọc Lâm Sàng (`.infobox`)

```html
<!-- 1. ĐIỂM NGỌC LÂM SÀNG (PEARL) -->
<div class="infobox pearl">
  <i class="fa-solid fa-gem infobox-icon" style="color: #0284c7;"></i>
  <div>
    <strong>Điểm Ngọc Lâm Sàng (Clinical Pearl):</strong><br />
    Bơm Na+/K+-ATPase tiêu tốn 1/3 đến 2/3 tổng lượng ATP của toàn bộ cơ thể để duy trì nồng độ Na+ thấp bên trong và K+ cao bên ngoài tế bào.
  </div>
</div>

<!-- 2. CẢNH BÁO NGUY HIỂM / CHỐNG CHỈ ĐỊNH (DANGER) -->
<div class="infobox danger">
  <i class="fa-solid fa-triangle-exclamation infobox-icon" style="color: #dc2626;"></i>
  <div>
    <strong>Cảnh Báo Dược Lý (Red Flag):</strong><br />
    Tăng Kali máu làm màng tế bào bớt phân cực (kéo Vm lên gần 0), ban đầu làm tăng tính kích thích nhưng sau đó làm bất hoạt mạn tính cổng h của kênh Na+, dẫn đến ngừng tim ở thì tâm trương.
  </div>
</div>

<!-- 3. PHẢN ỨNG / CƠ CHẾ SINH LÝ (REACTION) -->
<div class="infobox reaction">
  <i class="fa-solid fa-flask-vial infobox-icon" style="color: #7c3aed;"></i>
  <div>
    <strong>Điểm Chốt Động Học Điện Sinh Lý:</strong><br />
    Điện thế màng nghỉ của tế bào thần kinh (-70 đến -90 mV) gần như bằng điện thế cân bằng Nernst của ion K+ (-94 mV) do tính thấm của màng đối với K+ cao gấp 50-100 lần so với Na+.
  </div>
</div>

<!-- 4. GHI CHÚ THÔNG TIN (INFO) -->
<div class="infobox info">
  <i class="fa-solid fa-circle-info infobox-icon" style="color: #0d9488;"></i>
  <div>
    <strong>Ghi Chú Sinh Lý:</strong><br />
    Lưu lượng máu đến thận (RBF ≈ 1200 mL/min) chiếm tới 20–25% cung lượng tim lúc nghỉ ngơi.
  </div>
</div>
```

---

### C. Biểu Thức Toán Y Sinh & KaTeX Math

```markdown
### 1. Phương Trình Nernst (Điện Thế Cân Bằng Của Một Ion)
$$E_{\text{ion}} = \frac{RT}{zF} \ln\left(\frac{[\text{ion}]_{\text{out}}}{[\text{ion}]_{\text{in}}}\right) = \frac{61.5}{z} \log_{10}\left(\frac{[\text{ion}]_{\text{out}}}{[\text{ion}]_{\text{in}}}\right) \quad (\text{ở } 37^\circ\text{C})$$

### 2. Phương Trình Goldman-Hodgkin-Katz (Điện Thế Màng Nghỉ)
$$V_m = 61.5 \log_{10}\left( \frac{P_{\text{K}}[\text{K}^+]_{\text{out}} + P_{\text{Na}}[\text{Na}^+]_{\text{out}} + P_{\text{Cl}}[\text{Cl}^-]_{\text{in}}}{P_{\text{K}}[\text{K}^+]_{\text{in}} + P_{\text{Na}}[\text{Na}^+]_{\text{in}} + P_{\text{Cl}}[\text{Cl}^-]_{\text{out}}} \right)$$

### 3. Áp Suất Lọc Ròng Cầu Thận (Starling Forces)
$$\text{NFP} = (P_{\text{GC}} - P_{\text{BS}}) - (\pi_{\text{GC}} - \pi_{\text{BS}}) = (60 - 18) - (32 - 0) = \mathbf{+10\text{ mmHg}}$$
```

---

### D. Ma Trận Bento Khám Phá Cấu Trúc (`.matrix-grid` + `.matrix-card`)

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

## 📐 4. Template MDX Mẫu Chuẩn Cho Bài Sinh Lý Học

```mdx
---
title: "Sinh Lý Lọc Tại Cầu Thận & Độ Lọc Cầu Thận (GFR)"
slug: "sl-than-cauthan"
code: "PHYS-REN-01"
part: "part5"
system: "renal"
systemName: "Sinh Lý Thận & Thể Dịch"
guytonChapter: "Guyton 14th - Chapter 26 & 27: Glomerular Filtration and Renal Blood Flow"
ganongChapter: "Ganong 26th - Chapter 37: Renal Function & Micturition"
category: "physiology"
status: "published"
version: "2.0.0"
updatedAt: "2026-08-30"
description: "Cấu trúc màng lọc cầu thận 3 lớp; Động lực học Starling và áp suất lọc ròng (NFP); Cơ chế tự điều hòa GFR (Phản hồi ống - cầu thận qua Macula Densa); Phân suất lọc (FF) và ứng dụng lâm sàng trong tổn thương thận cấp."
tags:
  - "sinh-ly"
  - "cau-than"
  - "gfr"
  - "starling"
  - "tu-dieu-hoa"
clinicalPearls:
  - "Màng đáy cầu thận tích điện âm (Heparan Sulfate) đẩy lùi hoàn toàn Albumin dù bán kính phân tử Albumin nhỏ hơn đường kính lỗ lọc."
  - "NSAIDs làm co tiểu động mạch đến, ACEi/ARBs làm giãn tiểu động mạch đi; phối hợp hai nhóm thuốc khi bệnh nhân mất nước gây triệt tiêu áp lực lọc dẫn đến suy thận cấp trước thận nặng."
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
    title: "Cơ Chế Tự Điều Hòa GFR & Phản Hồi Ống - Cầu Thận"
    icon: "fa-arrows-rotate"
  - id: "sec-4"
    number: 4
    title: "Ứng Dụng Dược Lý Lâm Sàng & Trích Dẫn EBM"
    icon: "fa-stethoscope"
---

# 🧬 SINH LÝ LỌC TẠI CẦU THẬN & ĐỘ LỌC CẦU THẬN (GFR)

<PhysioQuickNav />

<!-- DẢI CHỈ SỐ NHANH (QUICK STATS STRIP) -->
<section class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val blue">125 mL/min</div>
      <div class="stat-lbl">Độ lọc cầu thận chuẩn (180 Lít dịch lọc/ngày)</div>
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
      <div class="stat-val purple">Guyton 14th</div>
      <div class="stat-lbl">Chuẩn hóa Guyton 14th & Ganong 26th</div>
    </div>
  </div>
</section>

---

## 1. Cấu Trúc Màng Lọc Cầu Thận 3 Lớp {#sec-1}

Nội dung phân tích 3 lớp màng lọc (Nội mô mao mạch có cửa sổ, Màng đáy cầu thận GBM giàu điện tích âm, Tế bào có chân Podocytes với khe lọc)...

---

## 2. Động Lực Học Starling & Áp Suất Lọc (NFP) {#sec-2}

$$\text{NFP} = (P_{\text{GC}} - P_{\text{BS}}) - (\pi_{\text{GC}} - \pi_{\text{BS}}) = (60 - 18) - (32 - 0) = \mathbf{+10\text{ mmHg}}$$

$$GFR = K_f \times \text{NFP} = 12.5\text{ mL/min/mmHg} \times 10\text{ mmHg} = \mathbf{125\text{ mL/phút}}$$

---

## 3. Cơ Chế Tự Điều Hòa GFR & Phản Hồi Ống - Cầu Thận {#sec-3}

<div class="infobox pearl">
  <i class="fa-solid fa-gem infobox-icon" style="color: #0284c7;"></i>
  <div>
    <strong>Điểm Ngọc Lâm Sàng (Clinical Pearl):</strong><br />
    Khi lưu lượng dịch lọc tăng cao, Macula Densa tại quai Henle cảm nhận sự tăng nồng độ Na+ và Cl-, giải phóng Adenosine gây co tiểu động mạch đến, kéo GFR trở về mức bình thường.
  </div>
</div>

---

## 4. Ứng Dụng Dược Lý Lâm Sàng & Trích Dẫn EBM {#sec-4}

<div class="infobox danger">
  <i class="fa-solid fa-triangle-exclamation infobox-icon" style="color: #dc2626;"></i>
  <div>
    <strong>Cảnh Báo Tương Tác Dược Lý:</strong><br />
    Tuyệt đối không phối hợp NSAIDs (co tiểu ĐM đến) + ACEi/ARBs (giãn tiểu ĐM đi) ở bệnh nhân mất nước vì triệt tiêu áp suất lọc, gây suy thận cấp trước thận nặng.
  </div>
</div>

<!-- KHUNG TRÍCH DẪN Y VĂN CHUẨN AMA (CITATION BOX) -->
<div class="citation-box" style="margin-top: 2rem; padding: 1.25rem 1.5rem; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #cbd5e1); border-left: 4px solid var(--color-primary, #0284c7); border-radius: 12px; font-size: 0.88rem; line-height: 1.8; color: var(--color-text-muted, #475569);">
  <strong style="color: var(--color-text, #0f172a); font-size: 0.95rem;"><i class="fa-solid fa-book-medical"></i> Trích Dẫn Y Văn &amp; Tài Liệu Tham Khảo Chuẩn AMA:</strong>
  <ol style="margin: 0.5rem 0 0 0; padding-left: 1.25rem;">
    <li><strong>Hall JE, Hall ME.</strong> <em>Guyton and Hall Textbook of Medical Physiology</em>. 14th ed. Philadelphia, PA: Elsevier; 2021:321-344.</li>
    <li><strong>Barrett KE, Barman SM, Brooks HL, Yuan JXJ.</strong> <em>Ganong's Review of Medical Physiology</em>. 26th ed. New York, NY: McGraw-Hill; 2019:657-678.</li>
  </ol>
</div>

<!-- HÀNG NÚT ĐIỀU HƯỚNG SPA -->
<div class="btn-row" style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
  <a href="#/basic-medical/sinh-ly" class="btn btn-primary">
    <i class="fa-solid fa-arrow-left"></i> Quay lại Mục Lục Sinh Lý Học
  </a>
  <a href="#sec-1" class="btn">
    <i class="fa-solid fa-arrow-up"></i> Lên đầu trang
  </a>
</div>
```

---

## 🛠️ 5. Checklist Kiểm Định Trước Khi Bàn Giao

- [ ] File lưu đúng định dạng `.mdx` tại `src/content/basic-medical/physiology/partX/ten-bai.mdx`.
- [ ] Khối Frontmatter đầy đủ các trường bắt buộc, mảng `sections` khớp 100% các thẻ `{#sec-X}` trong bài.
- [ ] Sử dụng linh kiện `<PhysioQuickNav />` và các infobox y khoa.
- [ ] Tất cả công thức toán học dùng cú pháp KaTeX (`$$` hoặc `$`), không chứa ký tự tiếng Việt thô trong khối LaTeX.
- [ ] Mọi dấu so sánh `<` được escape thành `&lt;`, dấu `>` thành `&gt;`, `{` thành `&#123;`, `}` thành `&#125;` ngoài JSX props.
- [ ] Không chứa thẻ HTML trong thẻ `<text>` của SVG đồ họa.
- [ ] Chạy `npm run build` đạt kết quả thành công (**Exit code 0**, không có lỗi TypeScript hay JSX compilation).
