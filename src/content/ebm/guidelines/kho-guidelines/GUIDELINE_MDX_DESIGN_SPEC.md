# 📜 GUIDELINE & LANDMARK TRIAL MDX DESIGN SPECIFICATION
> **Phân Hệ**: Y Học Chứng Cứ — Kho Guidelines & Thử Nghiệm Lâm Sàng (`src/content/ebm/guidelines/kho-guidelines/`)  
> **Phiên bản**: 2.0.0 (Gold Standard EBM Suite)  
> **Mục tiêu**: Chuẩn hóa 100% cấu trúc, mã nguồn mẫu, thẻ phân tầng khuyến cáo (COR/LOE), bảng đối sánh thống kê (HR/NNT/p-value), lưu đồ thuật toán và khả năng tương tác CDSS cho các bài tóm tắt Guideline Y khoa.

---

## 📑 MỤC LỤC
1. [Nguyên Tắc Thiết Kế EBM & Design Tokens](#1-nguyên-tắc-thiết-kế-ebm--design-tokens)
2. [Thành Phần 1: Frontmatter YAML Schema (Khuyến Cáo & Phân Tầng Chứng Cứ)](#thành-phần-1-frontmatter-yaml-schema)
3. [Thành Phần 2: Hero Banner, Badges COR/LOE & Stats Strip](#thành-phần-2-hero-banner-badges-corloe--stats-strip)
4. [Thành Phần 3: Cấu Trúc Khối Nội Dung (Section Cards & Headings)](#thành-phần-3-cấu-trúc-khối-nội-dung-section-cards--headings)
5. [Thành Phần 4: Khung Khuyến Cáo Phân Tầng (COR I / IIa / IIb / III & LOE)](#thành-phần-4-khung-khuyến-cáo-phân-tầng-cor-i--iia--iib--iii--loe)
6. [Thành Phần 5: Lưu Đồ Thuật Toán Phác Đồ Điều Trị & Phân Tầng Nguy Cơ](#thành-phần-5-lưu-đồ-thuật-toán-phác-đồ-điều-trị--phân-tầng-nguy-cơ)
7. [Thành Phần 6: Bảng Dược Lý, Bảng Liều (Dose Table) & Ma Trận Tương Tác DDI](#thành-phần-6-bảng-dược-lý-bảng-liều-dose-table--ma-trận-tương-tác-ddi)
8. [Thành Phần 7: Bảng Báo Cáo Thử Nghiệm Lâm Sàng (HR, RRR, ARR, NNT, p-value)](#thành-phần-7-bảng-báo-cáo-thử-nghiệm-lâm-sàng-hr-rrr-arr-nnt-p-value)
9. [Thành Phần 8: Công Cụ CDSS Tính Toán Tương Tác Trực Tiếp Trong Bài](#thành-phần-8-công-cụ-cdss-tính-toán-tương-tác-trực-tiếp-trong-bài)
10. [Thành Phần 9: Trích Dẫn Y Văn Chuẩn AMA & Liên Kết Chéo Hệ Sinh Thái](#thành-phần-9-trích-dẫn-y-văn-chuẩn-ama--liên-kết-chéo-hệ-sinh-thái)
11. [Golden Template: File MDX Guideline Mẫu Chuẩn Toàn Diện](#11-golden-template-file-mdx-guideline-mẫu-chuẩn-toàn-diện)
12. [Thành Phần Mở Rộng: Thiết Kế Tóm Tắt Nghiên Cứu & Landmark Trial (EBM Study Suite)](#12-thành-phần-mở-rộng-thiết-kế-tóm-tắt-nghiên-cứu--landmark-trial-ebm-study-suite)

---

## 1. NGUYÊN TẮC THIẾT KẾ EBM & DESIGN TOKENS

Mỗi bài tóm tắt Guideline trong CliniPortal được thiết kế như một **Bảng điều khiển lâm sàng (Clinical Dashboard)**:
- **Ngắn gọn, súc tích (High Information Density)**: Tập trung vào thay đổi phác đồ thực tế, liều lượng cụ thể và cạm bẫy lâm sàng.
- **Minh bạch cấp độ chứng cứ**: Mọi khuyến cáo điều trị bắt buộc gắn kèm **COR** (Class of Recommendation) và **LOE** (Level of Evidence).
- **100% Dark Mode & Design Tokens**: Tự động chuyển đổi màu tương phản bảo vệ mắt bác sĩ trực đêm.

```css
/* EBM Clinical Color Palette */
--cor-1-bg: rgba(16, 185, 129, 0.12);
--cor-1-border: #10b981;
--cor-1-text: #059669;        /* Khuyến cáo Mạnh / Chỉ định Bắt buộc */

--cor-2a-bg: rgba(2, 132, 199, 0.12);
--cor-2a-border: #0284c7;
--cor-2a-text: #0284c7;       /* Khuyến cáo Trung bình / Nên chỉ định */

--cor-2b-bg: rgba(217, 119, 6, 0.12);
--cor-2b-border: #d97706;
--cor-2b-text: #d97706;       /* Khuyến cáo Yếu / Cân nhắc */

--cor-3-bg: rgba(220, 38, 38, 0.12);
--cor-3-border: #dc2626;
--cor-3-text: #dc2626;        /* Chống chỉ định / Không có lợi / Gây hại */

/* DocSpace Unified Typography Tokens */
--dsp-font-body:    'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--dsp-font-display: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--dsp-font-mono:    'IBM Plex Mono', monospace;
```

---

## THÀNH PHẦN 1: FRONTMATTER YAML SCHEMA

Khai báo metadata chuẩn hóa tương thích với Astro Content Loader ([`content.config.ts`](file:///d:/Apps/Apps_ykhoa/src/content.config.ts)) và Guideline Registry ([`kho-guidelines-registry.ts`](file:///d:/Apps/Apps_ykhoa/src/content/ebm/guidelines/js/kho-guidelines-registry.ts)):

```yaml
---
title: "AHA/ACC 2025: Hướng Dẫn Chẩn Đoán & Điều Trị Tăng Huyết Áp Ở Người Trưởng Thành"
slug: "2025-aha-acc-hypertension"
code: "GDL-2025-AHA-ACC-HYPERTENSION"
organization: "AHA / ACC"
year: "2025"
category: "guidelines"
status: "published"
version: "2.0.0"
updatedAt: "2026-08-28"
cor: "I"                               # Khuyến cáo cao nhất trong tài liệu (I | IIa | IIb)
loe: "A"                               # Mức chứng cứ cao nhất (A | B-R | B-NR)
description: "Tóm tắt toàn diện Hướng dẫn AHA/ACC 2025 về Tăng Huyết Áp: Thang điểm PREVENT, chỉ định triệt thần kinh thận (RDN), chiến lược khởi trị viên phối hợp liều cố định (SPC) và bãi bỏ thuật ngữ HTN Urgency."
tags:
  - "AHA / ACC"
  - "2025"
  - "Tăng huyết áp"
  - "Evidence-Based Medicine"
keyRecommendations:
  - "Đánh giá nguy cơ tim mạch 10 năm bằng phương trình PREVENT™ (Ngưỡng can thiệp ≥ 7.5%)."
  - "Khởi trị ngay bằng Viên phối hợp liều cố định (SPC) 2 nhóm thuốc cho Tăng huyết áp Độ 2."
  - "Chỉ định Triệt thần kinh thận qua ống thông (RDN) cho Tăng huyết áp kháng trị."
  - "Bãi bỏ thuật ngữ Tăng huyết áp khẩn cấp (HTN Urgency), tập trung phân định Cấp cứu (Emergency)."
sections:
  - id: "sec-1"
    number: 1
    title: "Phân Loại, PREVENT & Đo HA Chuẩn Xác"
    icon: "fa-solid fa-gauge-high"
  - id: "sec-2"
    number: 2
    title: "Can Thiệp Lối Sống & Chế Độ Ăn DASH"
    icon: "fa-solid fa-utensils"
  - id: "sec-3"
    number: 3
    title: "Khởi Trị Dược Lý & Phác Đồ Phối Hợp SPC"
    icon: "fa-solid fa-pills"
  - id: "sec-4"
    number: 4
    title: "Tăng Huyết Áp Kháng Trị & Can Thiệp RDN"
    icon: "fa-solid fa-bolt"
  - id: "sec-5"
    number: 5
    title: "Cấp Cứu Tăng Huyết Áp & Quần Thể Đặc Biệt"
    icon: "fa-solid fa-truck-medical"
  - id: "sec-6"
    number: 6
    title: "Tài Liệu Tham Khảo EBM"
    icon: "fa-solid fa-book-medical"
---
```

---

## THÀNH PHẦN 2: HERO BANNER, BADGES COR/LOE & STATS STRIP

### Dải Chỉ Số Then Chốt (`.stats-strip` + `.stats-grid`)
Đặt ngay dưới khối frontmatter để hiển thị 4 phát hiện / khuyến cáo quan trọng nhất:

```html
<div class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val blue">PREVENT ≥ 7.5%</div>
      <div class="stat-lbl">Ngưỡng nguy cơ tim mạch 10 năm chỉ định khởi trị</div>
    </div>
    <div class="stat-card">
      <div class="stat-val green">SPC 2 Nhóm</div>
      <div class="stat-lbl">Ưu tiên Viên phối hợp liều cố định ngay từ đầu</div>
    </div>
    <div class="stat-card">
      <div class="stat-val purple">RDN (Class IIb)</div>
      <div class="stat-lbl">Triệt hạch giao cảm động mạch thận khi kháng trị</div>
    </div>
    <div class="stat-card">
      <div class="stat-val red">Bãi Bỏ Urgency</div>
      <div class="stat-lbl">Chỉ phân định Cấp cứu (Emergency: có HMOD)</div>
    </div>
  </div>
</div>
```

---

## THÀNH PHẦN 3: CẤU TRÚC KHỐI NỘI DUNG (Section Cards & Headings)

Toàn bộ thân bài viết được bọc trong `<div class="page-content">` và các khối `<div class="sec-card" id="sec-...">`:

```html
<div class="page-content">

  <div class="sec-card" id="sec-1">
    <!-- Header của Section -->
    <div class="sec-hdr">
      <span class="sec-hdr-icon">📌</span>
      <h2 class="sec-title">Phần 1: Định Nghĩa, Phân Loại Huyết Áp &amp; Thang Điểm PREVENT™</h2>
      <span class="sec-badge">Điểm Mới 2025</span>
    </div>

    <!-- Body của Section -->
    <div class="sec-body">
      <div class="sec-subtitle">Sự Thay Đổi Cốt Lõi Trong Đánh Giá Nguy Cơ Tim Mạch</div>
      <p>
        Hướng dẫn 2025 chính thức khuyến cáo sử dụng <strong>phương trình PREVENT™</strong> thay thế cho các phương trình PCEs cũ...
      </p>
    </div>
  </div>

</div>
```

---

## THÀNH PHẦN 4: KHUNG KHUYẾN CÁO PHÂN TẦNG (COR I / IIa / IIb / III & LOE)

### Khung Khuyến Cáo Chuẩn EBM (`.rec-card`)

```html
<!-- KHUYẾN CÁO MẠNH (CLASS I - BENEFIT >>> RISK) -->
<div class="rec-card cor-1">
  <div class="rec-header">
    <span class="badge-cor-1"><i class="fa-solid fa-circle-check"></i> CLASS I (MẠNH)</span>
    <span class="badge-loe-a"><i class="fa-solid fa-layer-group"></i> MỨC A (Đa RCTs)</span>
  </div>
  <div class="rec-body">
    Ở người trưởng thành có Tăng huyết áp Độ 2 (Huyết áp phòng khám $\ge 140/90\text{ mmHg}$), 
    <strong>khuyến cáo khởi trị ngay bằng Viên Phối Hợp Liều Cố Định (SPC) 2 nhóm thuốc</strong> 
    (RAASi + CCB hoặc RAASi + Thiazide/Thiazide-like) kết hợp thay đổi lối sống.
  </div>
</div>

<!-- KHUYẾN CÁO TRUNG BÌNH (CLASS IIa - BENEFIT >> RISK) -->
<div class="rec-card cor-2a">
  <div class="rec-header">
    <span class="badge-cor-2a"><i class="fa-solid fa-circle-info"></i> CLASS IIa (NÊN CHỈ ĐỊNH)</span>
    <span class="badge-loe-b"><i class="fa-solid fa-layer-group"></i> MỨC B-R (RCT đơn lẻ)</span>
  </div>
  <div class="rec-body">
    Sử dụng máy đo huyết áp bắp tay tự động tại nhà (HBPM) hoặc đo lưu động 24 giờ (ABPM) 
    được khuyến cáo để xác nhận chẩn đoán và loại trừ Tăng huyết áp áo choàng trắng.
  </div>
</div>

<!-- CHỐNG CHỈ ĐỊNH / NGUY HẠI (CLASS III - HARM >>> BENEFIT) -->
<div class="rec-card cor-3">
  <div class="rec-header">
    <span class="badge-cor-3"><i class="fa-solid fa-triangle-exclamation"></i> CLASS III: NGUY HẠI (HARM)</span>
    <span class="badge-loe-a"><i class="fa-solid fa-layer-group"></i> MỨC A</span>
  </div>
  <div class="rec-body">
    <strong>CẤM phối hợp đồng thời 2 thuốc ức chế hệ RAAS</strong> 
    (ACEi + ARB hoặc ACEi/ARB + Thuốc ức chế trực tiếp Renin Aliskiren) do làm tăng vọt nguy cơ Suy thận cấp, Tụt huyết áp và Tăng kali máu nguy kịch mà không giảm biến cố tim mạch.
  </div>
</div>
```

---

## THÀNH PHẦN 5: LƯU ĐỒ THUẬT TOÁN PHÁC ĐỒ ĐIỀU TRỊ, TIẾP CẬN & SƠ ĐỒ CƠ CHẾ 2.0

### Dạng A: Clinical Flow Track 2.0 (Linear Stepper với Ray Dẫn Đường & Marker Đổi Màu)

Sử dụng hệ thống `.flow-track-container` cho các quy trình chẩn đoán, sàng lọc hoặc bậc thang điều trị tuần tự:

```html
<div class="flow-track-container">
  <!-- Bước 1 -->
  <div class="flow-track-step">
    <div class="flow-track-rail">
      <div class="flow-track-marker marker-blue">01</div>
      <div class="flow-track-line"></div>
    </div>
    <div class="flow-track-content accent-blue">
      <div class="flow-step-header">
        <div class="flow-step-title"><i class="fa-solid fa-stethoscope" style="color: #0284c7;"></i> Bước 1: Tiếp Nhận &amp; Đánh Giá Ban Đầu</div>
        <span class="flow-step-badge flow-badge-blue">Khởi đầu</span>
      </div>
      <div class="flow-step-text">
        Mô tả chi tiết bước lâm sàng, tiêu chuẩn sàng lọc hoặc các chỉ định cận lâm sàng ban đầu.
      </div>
    </div>
  </div>

  <!-- Bước 2: Kèm Rẽ Nhánh Phân Tuyến Quyết Định -->
  <div class="flow-track-step">
    <div class="flow-track-rail">
      <div class="flow-track-marker marker-teal">02</div>
      <div class="flow-track-line"></div>
    </div>
    <div class="flow-track-content accent-teal">
      <div class="flow-step-header">
        <div class="flow-step-title"><i class="fa-solid fa-code-branch" style="color: #0d9488;"></i> Bước 2: Phân Tầng Nguy Cơ &amp; Quyết Định Lâm Sàng</div>
        <span class="flow-step-badge flow-badge-amber">Rẽ nhánh</span>
      </div>
      <div class="flow-step-text">
        <div class="flow-branch-grid">
          <div class="flow-branch-card accent-green">
            <div class="flow-branch-title" style="color: #047857;"><i class="fa-solid fa-circle-check"></i> Nhóm Nguy Cơ Thấp / Đáp Ứng Tốt</div>
            <div class="flow-branch-desc">Thay đổi lối sống, theo dõi định kỳ mỗi 3–6 tháng.</div>
          </div>
          <div class="flow-branch-card accent-rose">
            <div class="flow-branch-title" style="color: #be123c;"><i class="fa-solid fa-triangle-exclamation"></i> Nhóm Nguy Cơ Cao / Kháng Trị</div>
            <div class="flow-branch-desc">Khởi trị phối hợp thuốc liều cao hoặc can thiệp chuyên sâu.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

### Dạng B: Editorial SVG Studio Container 2.0 (Sơ Đồ Đồ Họa & Cơ Chế Phân Tử Xuất Bản)

Bọc SVG chuẩn trong khung `.flowchart-editorial-card` đạt 100% Dark Mode adaptive và responsive scrolling mượt mà:

```html
<div class="flowchart-editorial-card">
  <div class="flowchart-editorial-hdr">
    <div class="flowchart-editorial-title">
      <i class="fa-solid fa-diagram-project" style="color: var(--color-primary, #0284c7);"></i>
      <span>LƯU ĐỒ QUYẾT ĐỊNH ĐIỀU TRỊ CHUYÊN SÂU (EBM 2026)</span>
    </div>
    <span class="flow-step-badge flow-badge-green">Editorial SVG Studio 2.0</span>
  </div>
  <div class="flowchart-editorial-canvas">
    <svg class="med-svg" viewBox="0 0 960 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <!-- Nền card động theo Design Tokens -->
      <rect width="960" height="480" fill="var(--color-surface, #ffffff)" rx="12" stroke="var(--color-border, #cbd5e1)" stroke-width="1"/>
      <!-- Sơ đồ vector y khoa (TUYỆT ĐỐI KHÔNG DÙNG THẺ HTML NHƯ <strong>, <br> TRONG SVG <text>) -->
    </svg>
  </div>
  <div class="flowchart-legend-row">
    <div class="flowchart-legend-item"><span class="legend-dot" style="background: #10b981;"></span> Nhóm chỉ định ưu tiên</div>
    <div class="flowchart-legend-item"><span class="legend-dot" style="background: #0284c7;"></span> Nhóm điều trị thay thế</div>
    <div class="flowchart-legend-item"><span class="legend-dot" style="background: #dc2626;"></span> Chống chỉ định / Nguy cơ cao</div>
  </div>
</div>
```

#### Bảng Tham Chiếu SVG Semantic Classes (Hỗ trợ Dark Mode tự động 100%):

| Nhóm Class | Tên Class CSS | Ý Nghĩa / Mục Đích Sử Dụng |
|---|---|---|
| **Node Khởi Đầu** | `.node-start` | Nút tiếp nhận ban đầu / Start node (viền xanh 2px, nền nhạt) |
| **Node Quyết Định** | `.node-decision` | Nút phân nhánh điều kiện (nền surface-2, viền trung tính) |
| **Node Hành Động** | `.node-action-blue` / `.node-action-green` | Hành động lâm sàng thường quy / Khuyến cáo ưu tiên |
| | `.node-action-red` / `.node-action-amber` | Cảnh báo nguy cơ, phân nhánh kháng trị hoặc kiểm soát chặt |
| | `.node-action-teal` / `.node-action-purple` | Điều trị chuyên khoa, xét nghiệm phân tử, kỹ thuật can thiệp |
| **Node Đích (Terminal)** | `.node-terminal-green` / `.node-terminal-blue` | Header bar màu đặc kết quả điều trị thành công / duy trì |
| | `.node-terminal-red` / `.node-terminal-amber` | Header bar màu đặc kết quả thất bại, chuyển tầng hoặc tử vong |
| **Nhãn Text SVG** | `text.label-primary` | Tiêu đề hoặc nội dung chính (tự đổi sang trắng ở dark mode) |
| | `text.label-muted` | Chú thích phụ, đơn vị, ngưỡng chỉ số lâm sàng |
| | `text.label-white` | Chữ trắng trên các khối node có màu nền đậm |
| **Mũi Tên & Nhánh** | `.arrow-default`, `.arrow-blue`, `.arrow-green`, `.arrow-red` | Đường line/path vector nối giữa các khối quyết định |
| | `.badge-yes`, `.badge-no` | Khối nhãn "CÓ / KHÔNG", "ĐẠT / KHÔNG ĐẠT" trên đường nối |


---

## THÀNH PHẦN 6: BẢNG DƯỢC LÝ, BẢNG LIỀU (Dose Table) & MA TRẬN TƯƠNG TÁC DDI

```html
<div class="table-responsive">
  <table class="table-modern">
    <thead>
      <tr>
        <th style="width: 22%;">Nhóm Thuốc</th>
        <th style="width: 28%;">Hoạt Chất &amp; Liều Khởi Đầu</th>
        <th style="width: 25%;">Liều Tối Đa Thường Dùng</th>
        <th style="width: 25%;">Lưu Ý Lâm Sàng &amp; Chống Chỉ Định</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>ACE Inhibitors (ACEi)</strong></td>
        <td>
          • Lisinopril: 10 mg/ngày<br />
          • Enalapril: 5 mg/ngày<br />
          • Perindopril: 4–5 mg/ngày
        </td>
        <td>
          • Lisinopril: 40 mg/ngày<br />
          • Enalapril: 40 mg/ngày<br />
          • Perindopril: 10 mg/ngày
        </td>
        <td>
          <span class="rx-tag danger">Cấm dùng khi mang thai</span><br />
          Theo dõi Creatinine &amp; Kali sau 1–2 tuần. Nguy cơ ho khan (10–15%) và phù mạch (Angioedema).
        </td>
      </tr>
      <tr>
        <td><strong>ARBs (Chẹn Thụ Thể)</strong></td>
        <td>
          • Losartan: 50 mg/ngày<br />
          • Telmisartan: 40 mg/ngày<br />
          • Valsartan: 80 mg/ngày
        </td>
        <td>
          • Losartan: 100 mg/ngày<br />
          • Telmisartan: 80 mg/ngày<br />
          • Valsartan: 320 mg/ngày
        </td>
        <td>
          <span class="rx-tag preferred">Ưu tiên thay thế khi ho do ACEi</span><br />
          Bảo vệ thận mạnh mẽ ở bệnh nhân Đái tháo đường có Albumin niệu.
        </td>
      </tr>
      <tr>
        <td><strong>DHP-CCB (Chẹn Canxi)</strong></td>
        <td>
          • Amlodipine: 2.5–5 mg/ngày<br />
          • Nifedipine GITS: 30 mg/ngày
        </td>
        <td>
          • Amlodipine: 10 mg/ngày<br />
          • Nifedipine GITS: 90 mg/ngày
        </td>
        <td>
          Giãn mạch trực tiếp, không ảnh hưởng chuyển hóa. Tác dụng phụ thường gặp: <strong>Phù mắt cá chân</strong>, đỏ bừng mặt.
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## THÀNH PHẦN 7: BẢNG BÁO CÁO THỬ NGHIỆM LÂM SÀNG (HR, RRR, ARR, NNT, p-value)

Dùng cho các bài tóm tắt Thử nghiệm bước ngoặt (Landmark Clinical Trials như EMPA-REG, DAPA-HF, SPRINT, CAPE COD):

```html
<div class="table-responsive">
  <table class="table-modern">
    <thead>
      <tr>
        <th>Tiêu Chí Đánh Giá (Endpoints)</th>
        <th>Nhóm Can Thiệp (Empagliflozin)</th>
        <th>Nhóm Giả Dược (Placebo)</th>
        <th>Chỉ Số Hiệu Quả (HR / RRR / NNT)</th>
        <th>Giá Trị p</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>3-Point MACE (Tử vong TM, MI, Đột quỵ)</strong></td>
        <td>10.5% (490/4687)</td>
        <td>12.1% (282/2333)</td>
        <td>
          <strong>HR = 0.86</strong> (95% CI: 0.74–0.99)<br />
          <span class="rx-tag preferred">RRR = 14%</span> | ARR = 1.6% | <strong>NNT = 62</strong>
        </td>
        <td>$p = 0.04$</td>
      </tr>
      <tr>
        <td><strong>Tử Vong Do Nguyên Nhân Tim Mạch</strong></td>
        <td>3.7% (172/4687)</td>
        <td>5.9% (137/2333)</td>
        <td>
          <strong>HR = 0.62</strong> (95% CI: 0.49–0.77)<br />
          <span class="rx-tag preferred">RRR = 38%</span> | ARR = 2.2% | <strong>NNT = 45</strong>
        </td>
        <td>$p &lt; 0.001$</td>
      </tr>
      <tr>
        <td><strong>Tái Nhập Viện Vì Suy Tim (HHF)</strong></td>
        <td>2.7% (126/4687)</td>
        <td>4.1% (95/2333)</td>
        <td>
          <strong>HR = 0.65</strong> (95% CI: 0.50–0.85)<br />
          <span class="rx-tag preferred">RRR = 35%</span> | ARR = 1.4% | <strong>NNT = 71</strong>
        </td>
        <td>$p = 0.002$</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## THÀNH PHẦN 8: CÔNG CỤ CDSS TÍNH TOÁN TƯƠNG TÁC TRỰC TIẾP TRONG BÀI

Nhúng trực tiếp mini-calculator vào bài viết (được tự động kích hoạt bởi `hydrateMdxInteractiveTools()` trong reader):

```html
<div class="flow-container" style="border: 2px solid var(--color-primary); background: rgba(2, 132, 199, 0.03);">
  <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 1.05rem; color: var(--color-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 8px;">
    <i class="fa-solid fa-calculator"></i> CDSS: Bộ Phân Loại Huyết Áp &amp; Hướng Dẫn Xử Trí Tức Thì
  </div>
  <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1rem;">
    Nhập trị số Huyết áp tâm thu (SBP) và Tâm trương (DBP) phòng khám:
  </p>

  <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
    <div style="flex: 1; min-width: 140px;">
      <label style="display: block; font-size: 0.78rem; font-weight: 700; margin-bottom: 4px;">HATT (SBP mmHg):</label>
      <input type="number" id="input-sbp" value="145" min="50" max="260" style="width: 100%; padding: 0.55rem 0.75rem; border-radius: 8px; border: 1.5px solid var(--color-border); font-weight: 700; font-size: 0.95rem;" />
    </div>
    <div style="flex: 1; min-width: 140px;">
      <label style="display: block; font-size: 0.78rem; font-weight: 700; margin-bottom: 4px;">HATTr (DBP mmHg):</label>
      <input type="number" id="input-dbp" value="92" min="30" max="160" style="width: 100%; padding: 0.55rem 0.75rem; border-radius: 8px; border: 1.5px solid var(--color-border); font-weight: 700; font-size: 0.95rem;" />
    </div>
  </div>

  <div id="bp-class-result" style="padding: 0.85rem 1rem; border-radius: 8px; background: var(--color-surface); border: 1px solid var(--color-border);">
    <!-- Kết quả CDSS tự động render tại đây -->
  </div>
</div>
```

---

## THÀNH PHẦN 9: TRÍCH DẪN Y VĂN CHUẨN AMA & LIÊN KẾT CHÉO HỆ SINH THÁI

```html
<!-- KHUNG TRÍCH DẪN Y VĂN CHUẨN (AMA FORMAT) -->
<div class="citation-box" style="margin-top: 1.5rem;">
  <strong>Trích dẫn tài liệu tham khảo chuẩn (AMA Format):</strong><br />
  1. Jones DW, Ferdinand KC, Taler SJ, et al. 2025 AHA/ACC/AANP/AAPA/ABC/ACCP/ACPM/AGS/AMA/ASPC/NMA/PCNA/SGIM Guideline for the Prevention, Detection, Evaluation and Management of High Blood Pressure in Adults. <em>Hypertension</em>. 2025;82(4):e212-e316. doi:10.1161/HYP.0000000000000249.<br />
  2. Whelton PK, Carey RM, Aronow WS, et al. 2017 ACC/AHA/AAPA/ABC/ACPM/AGS/APhA/ASH/ASPC/NMA/PCNA Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults. <em>J Am Coll Cardiol</em>. 2018;71(19):e127-e248.
</div>

<!-- KHÁM PHÁ THÊM TRONG HỆ SINH THÁI CLINIPORTAL -->
<div style="margin-top: 1.5rem;">
  <h4 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.9rem; font-weight: 700; margin-bottom: 0.75rem;">🌐 Khám Phá Thêm Trong CliniPortal:</h4>
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

## 11. GOLDEN TEMPLATE: FILE MDX GUIDELINE MẪU CHUẨN TOÀN DIỆN

```mdx
---
title: "Tên Khuyến Cáo Lâm Sàng / Tên Thử Nghiệm"
slug: "nam-tochuc-chude"
code: "GDL-YYYY-ORG-TOPIC"
organization: "Tổ Chức Ban Hành"
year: "2026"
category: "guidelines"
status: "published"
version: "2.0.0"
updatedAt: "2026-08-28"
cor: "I"
loe: "A"
description: "Mô tả ngắn gọn 1-2 câu về chỉ định then chốt, thay đổi phác đồ và mục tiêu điều trị."
tags:
  - "Tổ Chức"
  - "2026"
  - "Khuyến cáo lâm sàng"
  - "Evidence-Based Medicine"
keyRecommendations:
  - "Điểm khuyến cáo cốt lõi số 1."
  - "Điểm khuyến cáo cốt lõi số 2."
  - "Điểm khuyến cáo cốt lõi số 3."
sections:
  - id: "sec-1"
    number: 1
    title: "Chẩn Đoán & Phân Tầng Ban Đầu"
    icon: "fa-solid fa-stethoscope"
  - id: "sec-2"
    number: 2
    title: "Phác Đồ Điều Trị & Bảng Liều Thuốc"
    icon: "fa-solid fa-pills"
  - id: "sec-3"
    number: 3
    title: "Lưu Đồ Quyết Định Lâm Sàng"
    icon: "fa-solid fa-diagram-project"
  - id: "sec-4"
    number: 4
    title: "Tài Liệu Tham Khảo EBM"
    icon: "fa-solid fa-book-medical"
---

<!-- STATS STRIP -->
<div class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val green">Khuyến Cáo 1</div>
      <div class="stat-lbl">Chỉ số / Điểm mới then chốt</div>
    </div>
    <div class="stat-card">
      <div class="stat-val blue">Khuyến Cáo 2</div>
      <div class="stat-lbl">Chiến lược điều trị ưu tiên</div>
    </div>
    <div class="stat-card">
      <div class="stat-val amber">Khuyến Cáo 3</div>
      <div class="stat-lbl">Ngưỡng theo dõi an toàn</div>
    </div>
    <div class="stat-card">
      <div class="stat-val red">Cấm Chỉ Định</div>
      <div class="stat-lbl">Cảnh báo nguy kịch Class III</div>
    </div>
  </div>
</div>

<div class="page-content">

  <!-- SECTION 1 -->
  <div class="sec-card" id="sec-1">
    <div class="sec-hdr">
      <span class="sec-hdr-icon">🔬</span>
      <h2 class="sec-title">Phần 1: Tiêu Chuẩn Chẩn Đoán &amp; Phân Tầng</h2>
    </div>
    <div class="sec-body">
      <p>Nội dung khuyến cáo được trình bày với cấu trúc rõ ràng...</p>

      <div class="rec-card cor-1">
        <div class="rec-header">
          <span class="badge-cor-1"><i class="fa-solid fa-circle-check"></i> CLASS I (MẠNH)</span>
          <span class="badge-loe-a"><i class="fa-solid fa-layer-group"></i> LOE A</span>
        </div>
        <div class="rec-body">
          Khuyến cáo chỉ định xét nghiệm ban đầu cho 100% bệnh nhân nghi ngờ...
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 2 -->
  <div class="sec-card" id="sec-2">
    <div class="sec-hdr">
      <span class="sec-hdr-icon">💊</span>
      <h2 class="sec-title">Phần 2: Phác Đồ Điều Trị &amp; Bảng Liều Thuốc</h2>
    </div>
    <div class="sec-body">
      <div class="table-responsive">
        <table class="table-modern">
          <thead>
            <tr>
              <th>Thuốc</th>
              <th>Liều Khởi Đầu</th>
              <th>Liều Duy Trì</th>
              <th>Lưu Ý An Toàn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Thuốc A</strong></td>
              <td>10 mg/ngày</td>
              <td>20–40 mg/ngày</td>
              <td>Kiểm tra chức năng thận sau 2 tuần</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- SECTION 3 -->
  <div class="sec-card" id="sec-3">
    <div class="sec-hdr">
      <span class="sec-hdr-icon">🗺️</span>
      <h2 class="sec-title">Phần 3: Lưu Đồ Quyết Định Lâm Sàng</h2>
    </div>
    <div class="sec-body">
      <div class="flow-steps">
        <div class="flow-step">
          <div class="flow-icon">01</div>
          <div class="flow-content">
            <div class="flow-title">Bước 1: Tiếp Nhận &amp; Đánh Giá Nguy Cơ</div>
            <div class="flow-desc">Thực hiện thăm khám lâm sàng và làm xét nghiệm cận lâm sàng cơ bản.</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 4: CITATION & BUTTONS -->
  <div class="sec-card" id="sec-4">
    <div class="sec-hdr">
      <span class="sec-hdr-icon">📚</span>
      <h2 class="sec-title">Phần 4: Tài Liệu Tham Khảo EBM</h2>
    </div>
    <div class="sec-body">
      <div class="citation-box">
        <strong>Trích dẫn tài liệu tham khảo chuẩn (AMA Format):</strong><br />
        1. Author AA, Author BB. Title of clinical practice guideline. <em>Journal Name</em>. 2026;Vol(Issue):Pages. doi:10.xxxx/xxxx.
      </div>

      <div class="btn-row">
        <a href="#/ebm/kho-guidelines" class="btn btn-primary">
          <i class="fa-solid fa-arrow-left"></i> Quay lại Kho Guidelines
        </a>
        <a href="#sec-1" class="btn">
          <i class="fa-solid fa-arrow-up"></i> Lên đầu trang
        </a>
      </div>
    </div>
  </div>

</div>
```

---

## 12. THÀNH PHẦN MỞ RỘNG: THIẾT KẾ TÓM TẮT NGHIÊN CỨU & LANDMARK TRIAL (EBM STUDY SUITE)

> **Mục đích**: Các bài báo khoa học gốc, thử nghiệm lâm sàng ngẫu nhiên có nhóm chứng (**Landmark RCTs**), tổng quan hệ thống (**Systematic Reviews**) và phân tích gộp (**Meta-Analyses**) có đặc thù dữ liệu hoàn toàn khác với các Hướng dẫn Thực hành Lâm sàng (CPGs).  
> Bộ style suite `src/styles/components/research-study-article.css` được nạp tự động qua `src/styles/global.css`, mang đến giao diện trực quan, đậm chất học thuật xuất bản quốc tế (NEJM / Lancet / JAMA standard) mà vẫn bảo đảm 100% Dark Mode và responsive mobile-first.

---

### 12.1. So Sánh Kiến Trúc CPG vs Research Study

| Đặc tính | Hướng Dẫn Thực Hành (CPG) | Thử Nghiệm Lâm Sàng / Nghiên Cứu (Study) |
|---|---|---|
| **Mục tiêu chính** | Khuyến cáo hành động điều trị | Kiểm định giả thuyết khoa học & bằng chứng số học |
| **Phân tầng cốt lõi** | `COR` (I, IIa, IIb, III) & `LOE` (A, B, C) | `PICO`, Điểm kết thúc chính/phụ (Endpoints) |
| **Độ tin cậy** | Đồng thuận chuyên gia & Hội đồng Guideline | Đánh giá nguy cơ sai lệch (**Cochrane RoB 2.0 / ROBINS-I**) |
| **Dữ liệu định lượng** | Bảng liều thuốc, sơ đồ lưu đồ | **HR, RR, OR, ARR, RRR, NNT, 95% CI, p-value** |
| **Kết luận thực hành** | Bậc thang chỉ định | **Verdict Box (Practice-Changing vs Confirmatory)** |

---

### 12.2. Nhóm Badge Nghiên Cứu Chuyên Biệt (`.study-badges`)

Được đặt ngay dưới tiêu đề bài viết trong `.article-hero`:

```html
<div class="module-badge-group study-badges">
  <span class="badge badge-study-type"><i class="fa-solid fa-microscope"></i> Landmark RCT Phase III</span>
  <span class="badge badge-phase"><i class="fa-solid fa-flask-vial"></i> Đa Trung Tâm Quốc Tế</span>
  <span class="badge badge-rob"><i class="fa-solid fa-shield-check"></i> Cochrane RoB: Nguy cơ Thấp</span>
  <span class="badge badge-journal"><i class="fa-solid fa-newspaper"></i> N Engl J Med 2015</span>
  <span class="badge badge-sample-size"><i class="fa-solid fa-users"></i> N = 7,020 BN</span>
</div>
```

---

### 12.3. Dải Chỉ Số Thử Nghiệm (`.stats-strip.theme-trial`)

Sử dụng dải chỉ số mang sắc thái Indigo/Cyan (`theme-trial`) để làm nổi bật các biến số định lượng then chốt của thử nghiệm lâm sàng:

```html
<section class="stats-strip theme-trial">
  <div class="stat-card">
    <div class="stat-num highlight-trial">7,020</div>
    <div class="stat-lbl">Bệnh nhân (42 quốc gia)</div>
  </div>
  <div class="stat-card">
    <div class="stat-num highlight-trial">0.86</div>
    <div class="stat-lbl">HR 3-Point MACE (p = 0.04)</div>
  </div>
  <div class="stat-card">
    <div class="stat-num highlight-trial">0.62</div>
    <div class="stat-lbl">HR Tử vong Tim mạch (Giảm 38%)</div>
  </div>
  <div class="stat-card">
    <div class="stat-num highlight-trial">0.65</div>
    <div class="stat-lbl">HR Tử vong do mọi nguyên nhân</div>
  </div>
</section>
```

---

### 12.4. Khung Cấu Trúc PICO Bento Grid (`.pico-bento-grid`)

Trực quan hóa thiết kế nghiên cứu theo chuẩn PICO quốc tế:

```html
<div class="pico-bento-grid">
  <div class="pico-item pico-p">
    <span class="pico-tag"><i class="fa-solid fa-user-group"></i> Population (Dân số)</span>
    <div class="pico-text">Người trưởng thành mắc ĐTĐ típ 2 kèm bệnh tim mạch do xơ vữa (ASCVD) đã xác lập, eGFR ≥ 30 mL/min/1.73m².</div>
  </div>
  <div class="pico-item pico-i">
    <span class="pico-tag"><i class="fa-solid fa-syringe"></i> Intervention (Can thiệp)</span>
    <div class="pico-text">Empagliflozin 10 mg hoặc 25 mg uống 1 lần mỗi ngày kết hợp với phác đồ chuẩn.</div>
  </div>
  <div class="pico-item pico-c">
    <span class="pico-tag"><i class="fa-solid fa-vial"></i> Comparison (Đối chứng)</span>
    <div class="pico-text">Giả dược (Placebo) tương ứng 1 lần mỗi ngày kết hợp với phác đồ chuẩn.</div>
  </div>
  <div class="pico-item pico-o">
    <span class="pico-tag"><i class="fa-solid fa-trophy"></i> Outcome (Kết cục chính)</span>
    <div class="pico-text">3-Point MACE: Tử vong tim mạch, Nhồi máu cơ tim không tử vong, hoặc Đột quỵ không tử vong.</div>
  </div>
</div>
```

---

### 12.5. Bảng Điểm Kết Thúc Thử Nghiệm (`.trial-endpoints-table`)

Bảng dữ liệu thống kê chuyên sâu hiển thị tỷ lệ biến cố, Hazard Ratio / Relative Risk, khoảng tin cậy 95%, p-value và kết luận ưu thế can thiệp:

```html
<div class="table-wrap">
  <table class="data-table trial-endpoints-table">
    <thead>
      <tr>
        <th>Biến Cố / Điểm Kết Thúc</th>
        <th>Nhóm Can Thiệp (Empa)</th>
        <th>Nhóm Giả Dược (Placebo)</th>
        <th>Thống Kê (HR / ARR)</th>
        <th>Giá Trị p</th>
        <th>Ưu Thế</th>
      </tr>
    </thead>
    <tbody>
      <tr class="endpoint-primary">
        <td><strong>3-Point MACE</strong></td>
        <td>490/4687 (10.5%)</td>
        <td>282/2333 (12.1%)</td>
        <td>HR 0.86 (95% CI 0.74–0.99)</td>
        <td><span class="p-val sig">p = 0.04</span></td>
        <td><span class="favors-exp">Nghiêng về Can thiệp</span></td>
      </tr>
      <tr class="endpoint-secondary">
        <td><strong>Tử vong do Tim mạch</strong></td>
        <td>172/4687 (3.7%)</td>
        <td>137/2333 (5.9%)</td>
        <td>HR 0.62 (95% CI 0.49–0.77)</td>
        <td><span class="p-val sig">p &lt; 0.001</span></td>
        <td><span class="favors-exp">Nghiêng về Can thiệp</span></td>
      </tr>
      <tr>
        <td><strong>Đột quỵ không tử vong</strong></td>
        <td>164/4687 (3.5%)</td>
        <td>69/2333 (3.0%)</td>
        <td>HR 1.18 (95% CI 0.89–1.56)</td>
        <td><span class="p-val ns">p = 0.26</span></td>
        <td><span class="favors-ctrl">Không khác biệt</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

---

### 12.6. Thẻ Đánh Giá Nguy Cơ Sai Lệch Cochrane RoB 2.0 (`.rob-card`)

Ma trận hiển thị mức độ rủi ro sai lệch phương pháp luận theo 5 lĩnh vực Cochrane:

```html
<div class="rob-card">
  <div class="rob-header">
    <div class="rob-title"><i class="fa-solid fa-shield-halved"></i> Đánh Giá Nguy Cơ Sai Lệch (Cochrane RoB 2.0)</div>
    <span class="badge badge-rob"><i class="fa-solid fa-circle-check"></i> Rủi ro Sai lệch Tổng thể: THẤP</span>
  </div>
  <div class="rob-grid">
    <div class="rob-domain-card low-risk">
      <div class="rob-domain-title">D1: Ngẫu Nhiên Hóa</div>
      <div class="rob-status">Nguy cơ thấp</div>
      <div class="rob-desc">Sinh chuỗi ngẫu nhiên bằng máy tính trung tâm, giấu mã phân bổ qua hệ thống tương tác web.</div>
    </div>
    <div class="rob-domain-card low-risk">
      <div class="rob-domain-title">D2: Sai Lệch Can Thiệp</div>
      <div class="rob-status">Nguy cơ thấp</div>
      <div class="rob-desc">Làm mù đôi hoàn toàn đối với bệnh nhân, nhân viên y tế và điều phối viên nghiên cứu.</div>
    </div>
    <div class="rob-domain-card low-risk">
      <div class="rob-domain-title">D3: Dữ Liệu Thiếu Hụt</div>
      <div class="rob-status">Nguy cơ thấp</div>
      <div class="rob-desc">Tỷ lệ mất dấu theo dõi cực thấp (&lt; 1%), phân tích theo nguyên tắc ý định điều trị (ITT).</div>
    </div>
    <div class="rob-domain-card low-risk">
      <div class="rob-domain-title">D4: Đo Lường Kết Cục</div>
      <div class="rob-status">Nguy cơ thấp</div>
      <div class="rob-desc">Hội đồng đánh giá biến cố độc lập (CEC) làm mù với phân nhóm điều trị khi phân loại.</div>
    </div>
    <div class="rob-domain-card low-risk">
      <div class="rob-domain-title">D5: Báo Cáo Chọn Lọc</div>
      <div class="rob-status">Nguy cơ thấp</div>
      <div class="rob-desc">Toàn bộ các kết cục đã đăng ký trước trên ClinicalTrials.gov đều được công bố chi tiết.</div>
    </div>
  </div>
</div>
```

---

### 12.7. Hộp Phán Quyết Ứng Dụng Thực Hành Lâm Sàng (`.verdict-box`)

Tổng kết giá trị ứng dụng lâm sàng của nghiên cứu (Practice-Changing vs Confirmatory):

```html
<div class="verdict-box practice-changing">
  <div class="verdict-badge"><i class="fa-solid fa-gavel"></i> PHÁN QUYẾT LÂM SÀNG: PRACTICE-CHANGING</div>
  <h4>Nghiên cứu mang tính bước ngoặt thay đổi toàn diện hướng dẫn điều trị toàn cầu</h4>
  <p>EMPA-REG OUTCOME là thử nghiệm đầu tiên chứng minh thuốc ức chế SGLT2 không chỉ hạ đường huyết mà còn làm giảm ngoạn mục 38% tử vong tim mạch và 35% nhập viện do suy tim, mở đường cho kỷ nguyên mới trong điều trị tim mạch - thận - chuyển hóa.</p>
  <div class="verdict-grid">
    <div><strong>Khuyến cáo Guideline:</strong> Đưa SGLT2i lên vị trí ưu tiên hàng đầu trong các Hướng dẫn ADA, ESC, AHA và Bộ Y tế cho BN ĐTĐ có bệnh tim mạch.</div>
    <div><strong>Tác động chi phí/lợi ích:</strong> NNT = 39 để ngăn ngừa 1 ca tử vong tim mạch trong 3 năm, khẳng định tính khả thi cao trong thực hành.</div>
  </div>
  <div class="takeaway-pearl">
    <i class="fa-solid fa-lightbulb"></i> <strong>Lưu ý thực chiến:</strong> Luôn kiểm tra eGFR trước khi khởi trị (chỉ định khi eGFR ≥ 20–30 mL/min/1.73m² theo các cập nhật mới) và dặn dò bệnh nhân uống đủ nước, vệ sinh cơ quan sinh dục để phòng ngừa nhiễm trùng niệu - sinh dục.
  </div>
</div>
```
