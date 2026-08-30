---
name: biochemistry-module
description: >
  Quy trình tạo và chỉnh sửa bài viết Hóa sinh Y học & Sinh học phân tử chuẩn MDX Native (Astro Content Collections)
  trong phân hệ Cơ sở Y khoa (src/content/basic-medical/biochemistry/) của CliniPortal.
  Kích hoạt khi AI cần: tạo bài Hóa sinh mới thuộc 7 khối (Block 1 - Block 7),
  thêm sơ đồ cơ chế phân tử SVG Editorial, tích hợp bảng xét nghiệm cận lâm sàng, công thức KaTeX hoặc xử lý layout điều hướng sticky.
---

# Biochemistry Module Skill (Hóa Sinh Y Học & Sinh Học Phân Tử — MDX Native)

> Kỹ năng chuyên sâu hướng dẫn cấu trúc, cú pháp MDX Native, hệ thống linh kiện y khoa (`BiochemQuickNav`, `BiochemAlert`, `stats-strip`, `table-modern`, `matrix-grid`), công thức toán KaTeX và sơ đồ phân tử SVG cho phân hệ **Hóa Sinh Y Học (Biochemistry & Molecular Biology)** trong CliniPortal.

---

## 🏛️ 1. Quy hoạch Phân hệ 7 Khối (7 Blocks)

Tất cả các bài viết Hóa sinh được lưu trữ dưới định dạng `.mdx` tại `src/content/basic-medical/biochemistry/`:

```text
src/content/basic-medical/biochemistry/
├── README.md
├── block1-biomolecules/           # Khối 1: Cấu trúc 4 Đại phân tử (Glucid, Lipid, Protid, Acid Nucleic, Hb, Nước/pH)
├── block2-catalysis-signaling/    # Khối 2: Động học Enzym, Coenzym, Màng tế bào & Dẫn truyền tín hiệu
├── block3-bioenergetics/          # Khối 3: Năng lượng sinh học, Chuỗi hô hấp tế bào & Chu trình Krebs (TCA)
├── block4-intermediary-metabolism/# Khối 4: Chuyển hóa chuyên biệt Glucid, Lipid, Protid, Hemoglobin & Nucleotid
├── block5-molecular-genetics/     # Khối 5: Di truyền phân tử, Tái bản DNA, Phiên mã, Dịch mã & Kỹ thuật Gen
├── block6-organ-metabolism/       # Khối 6: Hóa sinh cơ quan & Tích hợp chuyển hóa No - Đói
├── block7-clinical-biochemistry/  # Khối 7: Hóa sinh lâm sàng & Biện luận bộ Bilan xét nghiệm
└── components/                    # Linh kiện TSX/Astro (BiochemQuickNav, BiochemAlert)
```

Nguồn tri thức gốc được lưu trữ tại:
`knowledge-vault/1.2. Kho hóa sinh y học/[Tên Block]/HS_[Tên bài].md`

---

## 🛑 2. Bộ Quy tắc Bất di Bất dịch (Mandatory Rules for MDX Native)

1. **Chuẩn Định Dạng MDX Native — Không Dùng HTML Shell**:
   - Tệp bài viết có đuôi `.mdx` (ví dụ: `chuoi-ho-hap-etc.mdx`, `hoa-hoc-glucid.mdx`).
   - Tuyệt đối **KHÔNG** dùng `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, `<script>`, `<style>`.
   - Layout được quản lý tập trung qua `src/pages/hoa-sinh/[...slug].astro` và `ArticleLayout.astro`.

2. **Khối YAML Frontmatter Chuẩn Hóa**:
   - Mọi tệp `.mdx` bắt buộc bắt đầu bằng Frontmatter đầy đủ: `title`, `slug`, `code`, `block`, `blockName`, `order`, `harperChapter`, `lippincottChapter`, `category: "biochemistry"`, `status: "published"`, `version: "2.0.0"`, `updatedAt`, `description`, `tags`, `clinicalPearls`, `keyReactions`, `relatedLabTests`, `sections`.

3. **Thanh Mục Lục Tự Động (`<BiochemQuickNav />`)**:
   - Đặt `<BiochemQuickNav />` ngay sau thẻ tiêu đề `<h1>` của bài viết.
   - Các mục trong mảng `sections: [{ id: "sec-1", number: 1, title: "...", icon: "fa-..." }]` tự động đồng bộ với thanh điều hướng nhanh sticky và Sidebar Table of Contents.
   - Tiêu đề từng phần trong bài dùng cú pháp: `## 1. Tên Phần {#sec-1}`, `## 2. Tên Phần {#sec-2}`.

4. **Chuẩn Toán Y Sinh & Ký Tự KaTeX**:
   - Dùng `$$ ... $$` cho các phương trình hóa sinh/năng lượng độc lập.
   - Dùng `$ ... $` cho các biến số, ký hiệu ion trong dòng ($NADH$, $FADH_2$, $\Delta G^{0\prime}$, $K_m$, $V_{max}$).
   - **Escape ký tự JSX**: Dấu so sánh `<` viết thành `&lt;`, `>` viết thành `&gt;`, ngoặc `{` viết thành `&#123;`, `}` viết thành `&#125;` khi nằm trong văn bản thường ngoài JSX props.

5. **Chuẩn Đồ Họa SVG Thuần (Editorial Pure Inline SVG)**:
   - Sơ đồ chuyển hóa, màng tế bào dùng Pure Inline SVG với `viewBox` co giãn linh hoạt và token `var(--color-...)` để tự động đổi màu khi sang Dark Mode.
   - **TUYỆT ĐỐI CẤM** dùng các thẻ HTML (`<strong>`, `<b>`, `<span>`, `<br>`) bên trong `<text>` của SVG. Bắt buộc dùng `<tspan font-weight="700">` hoặc các thẻ `<text>` định vị tọa độ rõ ràng.

6. **Kiểm Định Bản Build Bắt Buộc**:
   - Sau khi tạo hoặc chỉnh sửa tệp `.mdx`, bắt buộc kiểm tra bằng:
     ```bash
     npm run build
     ```
   - Lệnh này chạy `tsc --noEmit && vite build` để đảm bảo 0 lỗi kiểu dữ liệu TypeScript và biên dịch toàn bộ các module MDX thành công.

---

## 🎨 3. Hệ Thống Linh Kiện MDX Y Khoa Trong Phân Hệ Hóa Sinh

### A. Khung Thông Tin Y Khoa (`<BiochemAlert>`)

```html
<!-- 1. ĐIỂM NGỌC LÂM SÀNG (PEARL) -->
<BiochemAlert type="pearl" title="Điểm Ngọc Lâm Sàng & Biện Luận Chẩn Đoán (Clinical Pearl)">
  Khí độc Cyanua (CN-) và CO ức chế Phức hợp IV (Cytochrome c oxidase) tại Heme a3, chặn đứng hoàn toàn chuỗi hô hấp tế bào gây ngạt mô cấp tính dù phân áp O2 máu bình thường.
</BiochemAlert>

<!-- 2. CẢNH BÁO NGUY HIỂM / ĐỘC CHẤT (DANGER) -->
<BiochemAlert type="danger" title="Cảnh Báo Độc Tính & Cấp Cứu Y Khoa (Red Flag)">
  2,4-Dinitrophenol (DNP) là chất phá ghép hóa học kỵ nước làm sụp đổ PMF, kích thích ETC chạy tối đa gây sốt cao ác tính và suy đa tạng tử vong.
</BiochemAlert>

<!-- 3. PHẢN ỨNG / ĐIỂM CHỐT ENZYME (REACTION) -->
<BiochemAlert type="reaction" title="Phản Ứng Then Chốt & Enzyme Giới Hạn Tốc Độ">
  $$\text{NADH} + \text{H}^+ + \frac{1}{2}\text{O}_2 + 2.5\text{ ADP} + 2.5\text{ P}_i \rightarrow \text{NAD}^+ + \text{H}_2\text{O} + 2.5\text{ ATP} \quad (\Delta G^{0\prime} \approx -218.2\text{ kJ/mol})$$
</BiochemAlert>

<!-- 4. CON ĐƯỜNG CHUYỂN HÓA (PATHWAY) -->
<BiochemAlert type="pathway" title="Con Đường Chuyển Hóa Trung Gian">
  Điện tử từ NADH bào tương đi vào ty thể qua Thoi Malate - Aspartate (tạo 2.5 ATP) hoặc Thoi Glycerol-3-Phosphate (tạo 1.5 ATP).
</BiochemAlert>

<!-- 5. GHI CHÚ THÔNG TIN (INFO) -->
<BiochemAlert type="info" title="Thông Tin Sinh Học Phân Tử">
  Màng trong ty thể chứa hàm lượng cao Cardiolipin (4 chuỗi acyl kỵ nước), tạo rào cản ngăn chặn sự rò rỉ proton qua màng.
</BiochemAlert>
```

---

### B. Dải Chỉ Số Nhanh (`.stats-strip`)

```html
<section class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val blue">30–32 ATP</div>
      <div class="stat-lbl">Năng lượng ròng / 1 phân tử Glucose hoàn chỉnh</div>
    </div>
    <div class="stat-card">
      <div class="stat-val green">10 H⁺ / NADH</div>
      <div class="stat-lbl">Số proton bơm qua IMM (4 tại I, 4 tại III, 2 tại IV)</div>
    </div>
    <div class="stat-card">
      <div class="stat-val purple">~200 mV</div>
      <div class="stat-lbl">Lực đẩy proton (PMF = Δψ + dốc hóa học ΔpH)</div>
    </div>
    <div class="stat-card">
      <div class="stat-val red">-218.2 kJ/mol</div>
      <div class="stat-lbl">Biến thiên năng lượng tự do Gibbs (ΔG°') từ NADH đến O₂</div>
    </div>
  </div>
</section>
```

---

### C. Ma Trận Khám Phá Bento Grid (`.matrix-grid` + `.matrix-card`)

```html
<div class="matrix-grid">
  <div class="matrix-card">
    <div class="matrix-card-title">
      <span>1. Ức Chế Phức Hợp I</span>
      <span class="rx-tag danger">Rotenone, Amytal</span>
    </div>
    <div class="matrix-card-desc">
      Khóa vị trí truyền điện tử từ Fe-S sang Coenzyme Q. <strong>Succinate có thể bypass</strong> qua Phức hợp II để duy trì hô hấp.
    </div>
  </div>

  <div class="matrix-card">
    <div class="matrix-card-title">
      <span>2. Ức Chế Phức Hợp IV</span>
      <span class="rx-tag danger">Cyanide, CO, Azide</span>
    </div>
    <div class="matrix-card-desc">
      Khóa chặt trung tâm Heme a3 - CuB, làm liệt hoàn toàn hô hấp tế bào gây tử vong nhanh chóng.
    </div>
  </div>
</div>
```

---

### D. Bảng Đối Sánh Y Khoa Hiện Đại (`.table-responsive` + `.table-modern`)

```html
<div class="table-responsive">
  <table class="table-modern">
    <thead>
      <tr>
        <th style="width: 25%;">Đặc Điểm Đối Sánh</th>
        <th style="width: 37%;">Thoi Malate - Aspartate</th>
        <th style="width: 38%;">Thoi Glycerol-3-Phosphate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Phân bố mô chính</strong></td>
        <td><span class="rx-tag preferred">Tim, Gan, Thận</span></td>
        <td><span class="rx-tag warning">Cơ vân, Não</span></td>
      </tr>
      <tr>
        <td><strong>Điểm đổ vào ETC</strong></td>
        <td><strong>Phức hợp I</strong> (Dưới dạng NADH ty thể)</td>
        <td><strong>Coenzyme Q</strong> (Dưới dạng FADH2)</td>
      </tr>
      <tr>
        <td><strong>Năng lượng ATP thu được</strong></td>
        <td><span class="rx-tag preferred"><strong>2.5 ATP / NADH</strong></span></td>
        <td><span class="rx-tag warning"><strong>1.5 ATP / NADH</strong></span></td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 📐 4. Template MDX Mẫu Chuẩn Cho Bài Hóa Sinh Y Học

```mdx
---
title: "CHEM-XX: [Tiêu Đề Bài Giảng Hóa Sinh Chuẩn]"
slug: "ten-bai-slug"
code: "CHEM-XX"
block: "blockX-..."
blockName: "Tên Khối Chuyên Đề Hóa Sinh"
order: 1
harperChapter: "Harper's Illustrated Biochemistry 32nd Edition - Chapter XX"
lippincottChapter: "Lippincott Illustrated Reviews: Biochemistry 8th Edition - Chapter XX"
category: "biochemistry"
status: "published"
version: "2.0.0"
updatedAt: "2026-08-30"
description: "Mô tả ngắn gọn, súc tích (1-2 câu) về cơ chế phân tử, enzym giới hạn tốc độ, bệnh học chuyển hóa và ứng dụng xét nghiệm lâm sàng."
tags:
  - "Hóa sinh"
  - "Enzym"
  - "Chuyển hóa"
clinicalPearls:
  - "Điểm ngọc lâm sàng 1 về cơ chế bệnh học phân tử hoặc ứng dụng điều trị."
  - "Điểm ngọc lâm sàng 2 về bẫy chẩn đoán hoặc dấu ấn cận lâm sàng đặc hiệu."
keyReactions:
  - "Phương trình phản ứng chốt 1 --> Sản phẩm"
  - "Phương trình phản ứng chốt 2 --> Sản phẩm"
relatedLabTests:
  - "Xét nghiệm cận lâm sàng 1"
  - "Xét nghiệm cận lâm sàng 2"
sections:
  - id: "sec-1"
    number: 1
    title: "Cấu Trúc Phân Tử & Con Đường Hóa Sinh Nền Tảng"
    icon: "fa-dna"
  - id: "sec-2"
    number: 2
    title: "Các Phản Ứng Enzym & Điểm Chốt Động Học"
    icon: "fa-flask-vial"
  - id: "sec-3"
    number: 3
    title: "Bệnh Học Rối Loạn & Khiếm Khuyết Di Truyền"
    icon: "fa-stethoscope"
  - id: "sec-4"
    number: 4
    title: "Bộ Bilan Xét Nghiệm & Trích Dẫn Y Văn EBM"
    icon: "fa-book-medical"
---

# 🧪 [TIÊU ĐỀ BÀI GIẢNG HÓA SINH CHUẨN]

<BiochemQuickNav />

<!-- DẢI CHỈ SỐ NHANH (QUICK STATS STRIP) -->
<section class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val blue">Thông số 1</div>
      <div class="stat-lbl">Mô tả chỉ số hóa sinh</div>
    </div>
    <div class="stat-card">
      <div class="stat-val green">Thông số 2</div>
      <div class="stat-lbl">Động học enzym & Giới hạn tốc độ</div>
    </div>
    <div class="stat-card">
      <div class="stat-val purple">EBM 2026</div>
      <div class="stat-lbl">Chuẩn hóa Harper 32nd & Lippincott 8th</div>
    </div>
    <div class="stat-card">
      <div class="stat-val red">Thông số 4</div>
      <div class="stat-lbl">Dấu ấn sinh học theo dõi</div>
    </div>
  </div>
</section>

---

## 1. Cấu Trúc Phân Tử & Con Đường Hóa Sinh Nền Tảng {#sec-1}

Nội dung chi tiết về phân loại, cấu trúc không gian, tính chất lý hóa...

---

## 2. Các Phản Ứng Enzym & Điểm Chốt Động Học {#sec-2}

<BiochemAlert type="reaction" title="Phản Ứng Giới Hạn Tốc Độ">
  Phương trình phản ứng hóa học hoặc cơ chế enzym chốt.
</BiochemAlert>

---

## 3. Bệnh Học Rối Loạn & Khiếm Khuyết Di Truyền {#sec-3}

<BiochemAlert type="pearl" title="Điểm Ngọc Lâm Sàng (Clinical Pearl)">
  Phân tích cơ chế bệnh sinh phân tử và bẫy chẩn đoán lâm sàng.
</BiochemAlert>

---

## 4. Bộ Bilan Xét Nghiệm & Trích Dẫn Y Văn EBM {#sec-4}

<div class="matrix-grid">
  <div class="matrix-card">
    <div class="matrix-card-title">
      <span>1. Xét Nghiệm A</span>
      <span class="rx-tag info">Khoảng Tham Chiếu</span>
    </div>
    <div class="matrix-card-desc">
      Ý nghĩa biện luận lâm sàng khi chỉ số tăng hoặc giảm.
    </div>
  </div>
</div>

<!-- KHUNG TRÍCH DẪN Y VĂN CHUẨN AMA (CITATION BOX) -->
<div class="citation-box" style="margin-top: 2rem; padding: 1.25rem 1.5rem; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #cbd5e1); border-left: 4px solid var(--color-primary, #0284c7); border-radius: 12px; font-size: 0.88rem; line-height: 1.8; color: var(--color-text-muted, #475569);">
  <strong style="color: var(--color-text, #0f172a); font-size: 0.95rem;"><i class="fa-solid fa-book-medical"></i> Trích Dẫn Y Văn &amp; Tài Liệu Tham Khảo Chuẩn AMA:</strong>
  <ol style="margin: 0.5rem 0 0 0; padding-left: 1.25rem;">
    <li><strong>Kennelly PJ, et al.</strong> <em>Harper's Illustrated Biochemistry</em>. 32nd ed. McGraw Hill; 2023.</li>
    <li><strong>Ferrier DR.</strong> <em>Lippincott Illustrated Reviews: Biochemistry</em>. 8th ed. Wolters Kluwer; 2021.</li>
    <li><strong>Bộ Môn Hóa Sinh (ĐHYD TP.HCM).</strong> <em>Hóa Sinh Y Học</em>. TP. Hồ Chí Minh: NXB Y Học; 2024.</li>
  </ol>
</div>

<!-- HÀNG NÚT ĐIỀU HƯỚNG SPA -->
<div class="btn-row" style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
  <a href="#/basic-medical/hoa-sinh" class="btn btn-primary">
    <i class="fa-solid fa-arrow-left"></i> Quay lại Mục Lục Hóa Sinh Y Học
  </a>
  <a href="#sec-1" class="btn">
    <i class="fa-solid fa-arrow-up"></i> Lên đầu trang
  </a>
</div>
```

---

## 🛠️ 5. Checklist Kiểm Định Trước Khi Bàn Giao

- [ ] File lưu đúng định dạng `.mdx` tại `src/content/basic-medical/biochemistry/blockX-.../ten-bai.mdx`.
- [ ] Khối Frontmatter đầy đủ các trường bắt buộc, mảng `sections` khớp 100% các thẻ `{#sec-X}` trong bài.
- [ ] Sử dụng linh kiện `<BiochemQuickNav />` và `<BiochemAlert>`.
- [ ] Tất cả công thức toán học dùng cú pháp KaTeX (`$$` hoặc `$`), không chứa ký tự tiếng Việt thô trong khối LaTeX.
- [ ] Mọi dấu so sánh `<` được escape thành `&lt;`, dấu `>` thành `&gt;`, `{` thành `&#123;`, `}` thành `&#125;` ngoài JSX props.
- [ ] Không chứa thẻ HTML trong thẻ `<text>` của SVG đồ họa.
- [ ] Chạy `npm run build` đạt kết quả thành công (**Exit code 0**, không có lỗi TypeScript hay JSX compilation).
