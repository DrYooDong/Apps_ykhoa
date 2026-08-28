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

## THÀNH PHẦN 5: LƯU ĐỒ THUẬT TOÁN PHÁC ĐỒ ĐIỀU TRỊ & PHÂN TẦNG NGUY CƠ

### Dạng A: Ma Trận Cơ Chế / Khối Can Thiệp Đa Cột (`.flow-step-grid`)

```html
<div class="flow-container">
  <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 1.02rem; color: var(--color-text); margin-bottom: 0.35rem;">
    Sơ Đồ 1: Các Trụ Cột Can Thiệp Lối Sống Hạ Huyết Áp (AHA/ACC 2025)
  </div>
  <div style="font-size: 0.84rem; color: var(--color-text-muted); margin-bottom: 1.25rem;">
    Ước tính mức sụt giảm huyết áp tâm thu (SBP) khi tuân thủ nghiêm ngặt từng biện pháp:
  </div>

  <div class="flow-step-grid">
    <!-- Cột 1: Chế độ ăn DASH -->
    <div class="flow-step-card c-green">
      <div class="flow-step-num">TRỤ CỘT 01</div>
      <div class="flow-step-title">Chế Độ Ăn DASH</div>
      <div class="flow-step-desc">Giàu rau xanh, trái cây, ngũ cốc nguyên hạt, sữa ít béo; giảm chất béo bão hòa.</div>
      <div class="flow-step-impact">
        <i class="fa-solid fa-arrow-trend-down"></i> Giảm ~11 mmHg SBP
      </div>
    </div>

    <!-- Cột 2: Giảm Natri -->
    <div class="flow-step-card c-orange">
      <div class="flow-step-num">TRỤ CỘT 02</div>
      <div class="flow-step-title">Cắt Giảm Muối Ăn</div>
      <div class="flow-step-desc">Mục tiêu tối ưu &lt; 1500 mg Natri/ngày (hoặc cắt giảm ít nhất 1000 mg/ngày).</div>
      <div class="flow-step-impact">
        <i class="fa-solid fa-arrow-trend-down"></i> Giảm ~5–6 mmHg SBP
      </div>
    </div>

    <!-- Cột 3: Tăng Kali -->
    <div class="flow-step-card c-blue">
      <div class="flow-step-num">TRỤ CỘT 03</div>
      <div class="flow-step-title">Tăng Nạp Kali Ăn Uống</div>
      <div class="flow-step-desc">Bổ sung 3500–5000 mg Kali/ngày từ thực phẩm tươi (trừ bệnh nhân CKD giai đoạn muộn).</div>
      <div class="flow-step-impact">
        <i class="fa-solid fa-arrow-trend-down"></i> Giảm ~4–5 mmHg SBP
      </div>
    </div>

    <!-- Cột 4: Hoạt Động Thể Lực -->
    <div class="flow-step-card c-purple">
      <div class="flow-step-num">TRỤ CỘT 04</div>
      <div class="flow-step-title">Tập Thể Dục Đều Đặn</div>
      <div class="flow-step-desc">90–150 phút/tuần bài tập Aerobic hoặc bài tập kháng lực đẳng trường (Isometric).</div>
      <div class="flow-step-impact">
        <i class="fa-solid fa-arrow-trend-down"></i> Giảm ~5–8 mmHg SBP
      </div>
    </div>
  </div>
</div>
```

---

### Dạng B: Lưu Đồ Quyết Định Điều Trị Từng Bước (`.flow-steps` + `.flow-step`)

```html
<div class="flow-steps">
  <!-- Bước 1: Khám & Phân Độ -->
  <div class="flow-step">
    <div class="flow-icon">01</div>
    <div class="flow-content">
      <div class="flow-title">Bước 1: Xác Định Trị Số Huyết Áp &amp; Phân Tầng Ban Đầu</div>
      <div class="flow-desc">Đo HA đúng chuẩn tại phòng khám kết hợp kiểm tra tổn thương cơ quan đích (HMOD).</div>
    </div>
  </div>

  <!-- Bước 2: Rẽ Nhánh Điều Trị -->
  <div class="flow-step">
    <div class="flow-icon">02</div>
    <div class="flow-content">
      <div class="flow-title">Bước 2: Lựa Chọn Chiến Lược Khởi Trị</div>
      <div class="flow-desc">Dựa trên mức huyết áp và phân tầng nguy cơ 10 năm:</div>
      
      <div class="flow-branch">
        <div class="flow-branch-card accent-blue">
          <strong>🔹 Tăng Huyết Áp Độ 1 (130-139 / 80-89 mmHg):</strong><br />
          - PREVENT &lt; 7.5%: Thay đổi lối sống 3–6 tháng.<br />
          - PREVENT &ge; 7.5% hoặc có CVD/CKD/ĐTĐ: Khởi trị 1 thuốc.
        </div>
        <div class="flow-branch-card accent-red">
          <strong>🚨 Tăng Huyết Áp Độ 2 (&ge; 140 / &ge; 90 mmHg):</strong><br />
          - Khởi trị ngay <strong>SPC 2 nhóm thuốc</strong> (RAASi + CCB hoặc RAASi + Thiazide).<br />
          - Mục tiêu kiểm soát: HA &lt; 130/80 mmHg trong vòng 1 tháng.
        </div>
      </div>
    </div>
  </div>
</div>
```

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
