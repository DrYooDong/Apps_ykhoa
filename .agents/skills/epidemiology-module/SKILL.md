---
name: epidemiology-module
description: >
  Quy trình tạo và chỉnh sửa bài viết Dịch tễ học Y khoa & Y tế công cộng chuẩn MDX Native (Astro Content Collections)
  trong phân hệ Cơ sở Y khoa (src/content/basic-medical/epidemiology/) của CliniPortal.
  Kích hoạt khi AI cần: tạo bài Dịch tễ học bệnh lý mới từ Knowledge Vault (1.4. Kho dịch tễ học),
  thêm sơ đồ tam giác dịch tễ / chu kỳ lây truyền vector SVG Editorial, tích hợp bảng đối sánh véc-tơ,
  dữ liệu tỷ lệ mắc/tử vong, R0, DALYs hoặc xử lý layout điều hướng sticky.
---

# Epidemiology Module Skill (Dịch Tễ Học Y Khoa & Y Tế Công Cộng — MDX Native)

> Kỹ năng chuyên sâu hướng dẫn cấu trúc, cú pháp MDX Native, hệ thống linh kiện y khoa (`QuickNav`, `Alert`, `stats-strip`, `table-modern`, `matrix-grid`), sơ đồ tam giác dịch tễ và chu kỳ véc-tơ SVG cho phân hệ **Dịch Tễ Học Y Khoa (Medical Epidemiology & Public Health)** trong CliniPortal.

---

## 🏛️ 1. Quy hoạch Phân hệ 5 Khối Dịch Tễ Học

Tất cả các bài viết Dịch tễ học được lưu trữ dưới định dạng `.mdx` tại `src/content/basic-medical/epidemiology/`:

```text
src/content/basic-medical/epidemiology/
├── README.md
├── dth-dengue.mdx                 # Sốt xuất huyết Dengue (Truyền nhiễm)
├── dth-sot-ret.mdx                # Sốt rét Plasmodium & Vector Anopheles
├── dth-tang-huyet-ap.mdx          # Tăng huyết áp & Bệnh tim mạch (Mãn tính)
├── dth-dai-thao-duong.mdx         # Đái tháo đường Type 2 & Hội chứng chuyển hóa
└── ...                            # Các bài dịch tễ học chuyên khoa khác
```

Nguồn tri thức gốc được lưu trữ tại:
`knowledge-vault/1.4. Kho dịch tễ học/[Tên Chuyên Khoa]/DTH_[Tên Bệnh].md`

---

## 🛑 2. Bộ Quy tắc Bất di Bất dịch (Mandatory Rules for MDX Native)

1. **Chuẩn Định Dạng MDX Native — Không Dùng HTML Shell**:
   - Tệp bài viết có đuôi `.mdx` (ví dụ: `dth-dengue.mdx`, `dth-sot-ret.mdx`).
   - Tuyệt đối **KHÔNG** dùng `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, `<script>`, `<style>`.
   - Layout được quản lý tập trung qua `src/pages/dich-te-hoc/[...slug].astro` và `ArticleLayout.astro`.

2. **Khối YAML Frontmatter Chuẩn Hóa**:
   - Mọi tệp `.mdx` bắt buộc bắt đầu bằng Frontmatter đầy đủ: `title`, `slug`, `code`, `domain`, `domainName`, `cdcChapter`, `whoRef`, `category: "epidemiology"`, `status: "published"`, `version: "2.0.0"`, `updatedAt`, `description`, `tags`, `clinicalPearls`, `sections`.

3. **Thanh Mục Lục Tự Động (`<QuickNav />`)**:
   - Đặt `<QuickNav />` ngay sau thẻ tiêu đề `<h1>` của bài viết.
   - Các mục trong mảng `sections: [{ id: "sec-1", number: 1, title: "...", icon: "fa-..." }]` tự động đồng bộ với thanh điều hướng nhanh sticky và Sidebar Table of Contents.
   - Tiêu đề từng phần trong bài dùng cú pháp: `## 1. Tên Phần {#sec-1}`, `## 2. Tên Phần {#sec-2}`.

4. **Chuẩn Đồ Họa Xuất Bản Cao Cấp (Editorial Pure Inline SVG Studio)**:
   - **Tam Giác Dịch Tễ (Epidemiological Triad)**: Tác nhân (*Agent*) — Vật chủ (*Host*) — Môi trường (*Environment*).
   - **Chu Kỳ Lây Truyền Véc-tơ**: Dùng đường cong mượt mà (`<path d="M... Q..." />`) hoặc đường trực giao có marker `<defs>` chỉ hướng rõ ràng.
   - **Cấm thẻ HTML trong SVG `<text>`**: **TUYỆT ĐỐI CẤM** dùng các thẻ HTML (`<strong>`, `<b>`, `<span>`, `<br>`) bên trong `<text>` của SVG. Bắt buộc dùng `<tspan font-weight="700">` hoặc định vị tọa độ `y` rõ ràng.

5. **Kiểm Định Bản Build Bắt Buộc**:
   - Sau khi tạo hoặc chỉnh sửa tệp `.mdx`, bắt buộc kiểm tra bằng:
     ```bash
     npm run build
     ```
   - Lệnh này chạy `tsc --noEmit && vite build` để đảm bảo 0 lỗi kiểu dữ liệu TypeScript và biên dịch toàn bộ các module MDX thành công.

---

## 🎨 3. Hệ Thống Linh Kiện MDX Y Khoa Trong Phân Hệ Dịch Tễ Học

### A. Dải Chỉ Số Dịch Tễ Học Nhanh (`.stats-strip`)

```html
<section class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val red">R₀ = 2.0–4.0</div>
      <div class="stat-lbl">Hệ số lây nhiễm cơ bản trong ổ dịch</div>
    </div>
    <div class="stat-card">
      <div class="stat-val amber">8–12 ngày</div>
      <div class="stat-lbl">Thời kỳ ủ bệnh ngoại lai (EIP) trong muỗi Aedes</div>
    </div>
    <div class="stat-card">
      <div class="stat-val blue">390 Triệu</div>
      <div class="stat-lbl">Ca nhiễm toàn cầu hàng năm (WHO Estimate)</div>
    </div>
    <div class="stat-card">
      <div class="stat-val green">&lt; 0.5%</div>
      <div class="stat-lbl">Tỷ lệ tử vong khi quản lý bù dịch chuẩn EBM</div>
    </div>
  </div>
</section>
```

---

### B. Khung Cảnh Báo & Giám Sát Dịch Tễ (`.infobox`)

```html
<!-- 1. CẢNH BÁO BÙNG PHÁT Ổ DỊCH (DANGER) -->
<div class="infobox danger">
  <i class="fa-solid fa-triangle-exclamation infobox-icon" style="color: #dc2626;"></i>
  <div>
    <strong>Cảnh Báo Dịch Tễ Học &amp; Bùng Phát (Red Flag):</strong><br />
    Nhiễm thứ phát với typ huyết thanh khác (Secondary Heterotypic Infection) làm tăng vọt nguy cơ Sốt xuất huyết Dengue nặng do hiện tượng Tăng cường miễn dịch phụ thuộc kháng thể (ADE).
  </div>
</div>

<!-- 2. ĐỘNG HỌC VÉC-TƠ & TRUYỀN BỆNH (REACTION) -->
<div class="infobox reaction">
  <i class="fa-solid fa-mosquito infobox-icon" style="color: #7c3aed;"></i>
  <div>
    <strong>Đặc Điểm Sinh Học Véc-tơ Truyền Bệnh:</strong><br />
    Muỗi <em>Aedes aegypti</em> hút máu ban ngày (đỉnh điểm lúc sáng sớm và chiều tối), ưa sống trong nhà và đẻ trứng ở các dụng cụ chứa nước sạch nhân tạo.
  </div>
</div>

<!-- 3. ĐIỂM NGỌC LÂM SÀNG (PEARL) -->
<div class="infobox pearl">
  <i class="fa-solid fa-gem infobox-icon" style="color: #0284c7;"></i>
  <div>
    <strong>Điểm Ngọc Lâm Sàng &amp; Dấu Hiệu Cảnh Báo (Clinical Pearl):</strong><br />
    Giai đoạn nguy hiểm nhất diễn ra từ ngày thứ 3 đến ngày thứ 7 (thời điểm bệnh nhân bắt đầu hạ sốt), cần theo dõi sát hematocrit tăng vọt và tiểu cầu giảm sâu báo hiệu thoát huyết tương.
  </div>
</div>

<!-- 4. GIÁM SÁT & Y TẾ CÔNG CỘNG (INFO) -->
<div class="infobox info">
  <i class="fa-solid fa-shield-virus infobox-icon" style="color: #0d9488;"></i>
  <div>
    <strong>Can Thiệp Y Tế Công Cộng &amp; Kiểm Soát Ổ Dịch:</strong><br />
    Chiến lược can thiệp cốt lõi là diệt lăng quăng/bọ gậy (chỉ số BI &lt; 20), phun hóa chất ULV diệt muỗi trưởng thành và truyền thông thay đổi hành vi cộng đồng.
  </div>
</div>
```

---

### C. Bảng Đối Sánh Dịch Tễ Học (`.table-responsive` + `.table-modern`)

```html
<div class="table-responsive">
  <table class="table-modern">
    <thead>
      <tr>
        <th style="width: 25%;">Chỉ Số Dịch Tễ</th>
        <th style="width: 37%;">Sốt Xuất Huyết Dengue</th>
        <th style="width: 38%;">Sốt Rét (Malaria)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Tác nhân gây bệnh</strong></td>
        <td>Virus Dengue (DENV 1–4, Flavivirus)</td>
        <td>Ký sinh trùng <em>Plasmodium</em> (P. falciparum, P. vivax...)</td>
      </tr>
      <tr>
        <td><strong>Véc-tơ truyền bệnh chính</strong></td>
        <td>Muỗi <em>Aedes aegypti</em> &amp; <em>Aedes albopictus</em></td>
        <td>Muỗi <em>Anopheles</em> cái (hút máu ban đêm)</td>
      </tr>
      <tr>
        <td><strong>Tập tính hút máu</strong></td>
        <td><span class="rx-tag warning">Ban ngày (Sáng sớm &amp; Chiều tà)</span></td>
        <td><span class="rx-tag danger">Ban đêm (Từ hoàng hôn đến bình minh)</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 📐 4. Template MDX Mẫu Chuẩn Cho Bài Dịch Tễ Học

```mdx
---
title: "Dịch Tễ Học Sốt Xuất Huyết Dengue & Động Thái Véc-tơ"
slug: "dth-dengue"
code: "EPI-INF-01"
domain: "infectious"
domainName: "Dịch Tễ Bệnh Truyền Nhiễm & Vi Sinh"
cdcChapter: "CDC Yellow Book - Chapter 4: Dengue"
whoRef: "WHO Dengue Guidelines for Diagnosis, Treatment, Prevention and Control (2024)"
category: "epidemiology"
status: "published"
version: "2.0.0"
updatedAt: "2026-08-30"
description: "Tam giác dịch tễ học Dengue; Đặc điểm sinh học muỗi Aedes; Hiện tượng tăng cường kháng thể (ADE); Gánh nặng dịch tễ toàn cầu và chiến lược kiểm soát ổ dịch tại Việt Nam."
tags:
  - "Dịch tễ"
  - "Dengue"
  - "Aedes"
  - "ADE"
  - "Y tế công cộng"
clinicalPearls:
  - "Giai đoạn thoát huyết tương nguy hiểm nhất trùng với thời điểm bệnh nhân bắt đầu hạ sốt (ngày 3-7 của bệnh)."
  - "Nhiễm thứ phát với typ huyết thanh khác là yếu tố nguy cơ hàng đầu gây sốc sốt xuất huyết Dengue nặng do ADE."
sections:
  - id: "sec-1"
    number: 1
    title: "Tam Giác Dịch Tễ Học & Mô Hình Lan Truyền"
    icon: "fa-triangle-exclamation"
  - id: "sec-2"
    number: 2
    title: "Tác Nhân Virus & Sinh Lý Bệnh Học Phân Tử"
    icon: "fa-dna"
  - id: "sec-3"
    number: 3
    title: "Đặc Điểm Sinh Học Véc-tơ & Chu Kỳ Lây Truyền"
    icon: "fa-mosquito"
  - id: "sec-4"
    number: 4
    title: "Gánh Nặng Dịch Tễ, Can Thiệp Y Tế CC & Trích Dẫn EBM"
    icon: "fa-earth-americas"
---

# 🦟 DỊCH TỄ HỌC SỐT XUẤT HUYẾT DENGUE & ĐỘNG THÁI VÉC-TƠ

<QuickNav />

<!-- DẢI CHỈ SỐ NHANH (QUICK STATS STRIP) -->
<section class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val red">R₀ = 2.0–4.0</div>
      <div class="stat-lbl">Hệ số lây nhiễm cơ bản trong vụ dịch</div>
    </div>
    <div class="stat-card">
      <div class="stat-val amber">8–12 ngày</div>
      <div class="stat-lbl">Thời kỳ ủ bệnh ngoại lai (EIP)</div>
    </div>
    <div class="stat-card">
      <div class="stat-val blue">390 Triệu</div>
      <div class="stat-lbl">Ca nhiễm toàn cầu hàng năm (WHO)</div>
    </div>
    <div class="stat-card">
      <div class="stat-val green">&lt; 0.5%</div>
      <div class="stat-lbl">Tỷ lệ tử vong khi quản lý bù dịch chuẩn</div>
    </div>
  </div>
</section>

---

## 1. Tam Giác Dịch Tễ Học & Mô Hình Lan Truyền {#sec-1}

Phân tích 3 yếu tố cấu thành tam giác dịch tễ: Tác nhân (Virus Dengue 1-4), Vật chủ (Người, tính cảm nhiễm và miễn dịch typ), Môi trường (Đô thị hóa, vật dụng chứa nước, biến đổi khí hậu)...

---

## 2. Tác Nhân Virus & Sinh Lý Bệnh Học Phân Tử {#sec-2}

<div class="infobox danger">
  <i class="fa-solid fa-triangle-exclamation infobox-icon" style="color: #dc2626;"></i>
  <div>
    <strong>Hiện Tượng Tăng Cường Miễn Dịch (ADE):</strong><br />
    Kháng thể trung hòa chéo không hoàn toàn từ lần nhiễm trước liên kết với virus mới, tạo điều kiện cho virus xâm nhập tế bào đơn nhân qua thụ thể FcγR, tăng tải lượng virus ồ ạt.
  </div>
</div>

---

## 3. Đặc Điểm Sinh Học Véc-tơ & Chu Kỳ Lây Truyền {#sec-3}

<div class="infobox reaction">
  <i class="fa-solid fa-mosquito infobox-icon" style="color: #7c3aed;"></i>
  <div>
    <strong>Đặc Điểm Véc-tơ:</strong><br />
    <em>Aedes aegypti</em> hút máu nhiều lần trong một chu kỳ sinh sản, giúp phát tán virus nhanh chóng giữa các thành viên trong cùng hộ gia đình.
  </div>
</div>

---

## 4. Gánh Nặng Dịch Tễ, Can Thiệp Y Tế CC & Trích Dẫn EBM {#sec-4}

<div class="matrix-grid">
  <div class="matrix-card">
    <div class="matrix-card-title">
      <span>1. Giám Sát Chỉ Số Muỗi</span>
      <span class="rx-tag preferred">BI &lt; 20</span>
    </div>
    <div class="matrix-card-desc">
      Chỉ số Breteau (BI) đo lường số dụng cụ chứa lăng quăng / 100 nhà kiểm tra, ngưỡng an toàn dưới 20.
    </div>
  </div>
</div>

<!-- KHUNG TRÍCH DẪN Y VĂN CHUẨN AMA (CITATION BOX) -->
<div class="citation-box" style="margin-top: 2rem; padding: 1.25rem 1.5rem; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #cbd5e1); border-left: 4px solid var(--color-primary, #0284c7); border-radius: 12px; font-size: 0.88rem; line-height: 1.8; color: var(--color-text-muted, #475569);">
  <strong style="color: var(--color-text, #0f172a); font-size: 0.95rem;"><i class="fa-solid fa-book-medical"></i> Trích Dẫn Y Văn &amp; Tài Liệu Tham Khảo Chuẩn AMA:</strong>
  <ol style="margin: 0.5rem 0 0 0; padding-left: 1.25rem;">
    <li><strong>World Health Organization.</strong> <em>Dengue: Guidelines for Diagnosis, Treatment, Prevention and Control</em>. Geneva: WHO; 2024.</li>
    <li><strong>Centers for Disease Control and Prevention.</strong> <em>CDC Yellow Book: Health Information for International Travel</em>. Oxford University Press; 2024.</li>
  </ol>
</div>

<!-- HÀNG NÚT ĐIỀU HƯỚNG SPA -->
<div class="btn-row" style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
  <a href="#/basic-medical/dich-te-hoc" class="btn btn-primary">
    <i class="fa-solid fa-arrow-left"></i> Quay lại Mục Lục Dịch Tễ Học
  </a>
  <a href="#sec-1" class="btn">
    <i class="fa-solid fa-arrow-up"></i> Lên đầu trang
  </a>
</div>
```

---

## 🛠️ 5. Checklist Kiểm Định Trước Khi Bàn Giao

- [ ] File lưu đúng định dạng `.mdx` tại `src/content/basic-medical/epidemiology/dth-ten-bai.mdx`.
- [ ] Khối Frontmatter đầy đủ các trường bắt buộc, mảng `sections` khớp 100% các thẻ `{#sec-X}` trong bài.
- [ ] Sử dụng linh kiện `<QuickNav />` và các infobox dịch tễ học.
- [ ] Mọi dấu so sánh `<` được escape thành `&lt;`, dấu `>` thành `&gt;`, `{` thành `&#123;`, `}` thành `&#125;` ngoài JSX props.
- [ ] Không chứa thẻ HTML trong thẻ `<text>` của SVG đồ họa.
- [ ] Chạy `npm run build` đạt kết quả thành công (**Exit code 0**, không có lỗi TypeScript hay JSX compilation).
