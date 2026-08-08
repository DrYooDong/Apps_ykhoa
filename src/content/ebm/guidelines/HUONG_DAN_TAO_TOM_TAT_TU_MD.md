# 📖 HUỚNG DẪN TẠO TÓM TẮT GUIDELINE VÀ RCT TỪ FILE MARKDOWN (.MD)

> **Tài liệu hướng dẫn quy trình chuyển đổi tự động / bán tự động từ các tài liệu Y khoa dạng Markdown (.md) sang trang web tóm tắt chuyên nghiệp trong phân hệ EBM (Y học chứng cứ) của CliniPortal.**

---

## 📌 1. MỤC TIÊU & KIẾN TRÚC TỔNG QUAN

Khi có một file tài liệu y khoa `.md` (phác đồ, hướng dẫn điều trị, nghiên cứu RCT, guideline quốc tế hoặc Bộ Y tế), quy trình này giúp biến đổi file `.md` thành:
1. **Một trang HTML tóm tắt độc lập (`.html`)** nằm trong thư mục `src/content/ebm/guidelines/kho-guidelines/`.
2. **Một bản ghi dữ liệu chuẩn (JS Metadata)** trong mảng `SAMPLE_STUDIES` thuộc file `src/content/ebm/guidelines/guidelinesdata.js` để hiển thị và tìm kiếm trên Hub Kho Guidelines (`guidelines.html`).

```
File Nguồn (.md)
    │
    ├──► 1. Tạo HTML UI: src/content/ebm/guidelines/kho-guidelines/<slug>.html
    │
    └──► 2. Cập nhật Index: src/content/ebm/guidelines/guidelinesdata.js (SAMPLE_STUDIES)
```

---

## 📄 2. QUY CHUẨN ĐẦU VÀO CỦA FILE MARKDOWN (.MD)

File `.md` đầu vào nên có cấu trúc frontmatter và các phần nội dung rõ ràng như sau:

```markdown
---
title: "Phác Đồ Xử Trí Cấp Cứu Sốc Nhiễm Khuẩn (Sepsis-3) & SSC 2021"
englishTitle: "Surviving Sepsis Campaign International Guidelines 2021"
organization: "Surviving Sepsis Campaign (SSC) / ESICM / SCCM"
year: 2021
specialty: "icu"         # cardio | pulmo | gi | endo | neuro | infect | renal | rheum | hema | onco | pedia | obgyn | icu
sourceType: "intl-guideline" # intl-study | intl-guideline | vn-moh | vn-doh | vn-association
design: "guideline"     # rct | meta | cohort | guideline | review | other
impact: "practice-changing" # practice-changing | informative | early-signal | negative | regulatory
drug: "Norepinephrine, Vasopressin, Epinephrine, Dobutamine, Hydrocortisone"
population: "Bệnh nhân trưởng thành bị nhiễm trùng huyết và sốc nhiễm khuẩn"
sourceUrl: "https://doi.org/10.1007/s00134-021-06506-y"
tags: "Sepsis, Shock, Norepinephrine, Kháng sinh, Hồi sức"
---

# Tổng Quan
[Nội dung tổng quan ngắn 2-3 câu...]

## 1. Các Trụ Cột / Khuyến Cáo Cốt Lõi (Pillars)
- Trụ cột 1: ...
- Trụ cột 2: ...
- Trụ cột 3: ...

## 2. Tiêu Chuẩn Chẩn Đoán & Phân Loại
...

## 3. Phác Đồ Điều Trị & Liều Dùng (Regimens)
...

## 4. Kết Quả Nghiên Cứu / Bằng Chứng & Biểu Đồ (Data / Forest Plot)
- HR 0.86 (95% CI 0.74-0.99, p=0.04)
- COL: Can thiệp: 74.5% | Giả dược: 48.2%
- HBAR: Nhóm A: 80% | Nhóm B: 50%
```

---

## 🛠️ 3. QUY TRÌNH 5 BƯỚC THỰC HIỆN

### Step 1: Phân tích & Trích xuất Dữ liệu từ File `.md`
- **Thông tin nhận diện**: Tiêu đề tiếng Việt, tiêu đề tiếng Anh, Tổ chức ban hành, Năm, Chuyên khoa (`specialty`), Loại nguồn (`sourceType`), Thiết kế (`design`), Mức độ tác động (`impact`).
- **Nội dung lâm sàng**:
  - **Trụ cột chính (Pillars)**: 3-4 điểm đổi mới quan trọng nhất.
  - **Khuyến cáo chính**: Phân loại theo Class I, IIa, IIb, III và Mức bằng chứng (LOE A, B, C).
  - **Phác đồ liều dùng**: Bảng phân liều, điều chỉnh liều theo chức năng gan/thận.
  - **Cảnh báo an toàn / Chống chỉ định**: Sử dụng hộp thông tin Danger, Warning, Caution.
  - **Dữ liệu bằng chứng**: Các chỉ số RR, HR, OR, p-value hoặc số liệu phần trăm.

### Step 2: Đặt tên Slug & Khai báo Đường dẫn
- Đặt tên file HTML dạng slug gạch nối, ví dụ:
  - `2024-kdigo-ckd.html`
  - `byt-sot-xuat-huyet-dengue-2023.html`
  - `phac-do-soc-nhiem-khuan-sepsis3.html`
- Thư mục lưu trữ: `src/content/ebm/guidelines/kho-guidelines/<slug>.html`.
- Cấp thư mục: **Cấp 4** so với `Apps_ykhoa/`.
- Tiền tố đường dẫn tương đối:
  - Về thư mục gốc `Apps_ykhoa`: `../../../../`
  - Về Hub Guidelines: `../guidelines.html`
  - Về Hub Y học chứng cứ: `../../ebm.html`

### Step 3: Tạo Trang HTML Chi Tiết từ Boilerplate chuẩn
Sử dụng mẫu HTML dưới đây và điền dữ liệu đã trích xuất từ Step 1:

```html
<!DOCTYPE html>
<html lang="vi" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[Mô tả SEO tóm tắt nội dung guideline khoảng 150-160 ký tự]">
  <title>[Tiêu Đề Guideline] – CliniPortal</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

    :root {
      --green: #059669; --green-bg: #f0fdf4; --green-light: #a7f3d0;
      --orange: #d97706; --orange-bg: #fffbeb; --orange-light: #fde68a;
      --red: #dc2626; --red-bg: #fef2f2; --red-light: #fca5a5;
      --blue: #2563eb; --blue-bg: #eff6ff; --blue-light: #bfdbfe;
      --teal: #0d9488; --teal-bg: #f0fdfa; --teal-light: #99f6e4;
      --purple: #7c3aed; --purple-bg: #faf5ff; --purple-light: #ddd6fe;
      --accent: #0f6fb4;
      --bg: #f0f4f8; --surface: #ffffff; --surface-2: #f8fafc;
      --border: #cbd5e1; --border-light: #e2e8f0;
      --text: #0f172a; --text-muted: #475569; --text-faint: #94a3b8;
      --radius: 16px; --tr: 220ms cubic-bezier(0.16,1,0.3,1);
    }

    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; font-size: 15px; background: var(--bg); color: var(--text); line-height: 1.65; min-height: 100vh; }

    /* TOP NAV */
    .topnav { position: sticky; top: 0; z-index: 200; background: rgba(255,255,255,0.94); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border-bottom: 1px solid var(--border-light); display: flex; align-items: center; gap: 1rem; padding: 0 1.5rem; height: 56px; }
    .topnav-back { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--accent); text-decoration: none; font-size: 0.82rem; font-weight: 600; padding: 0.3rem 0.75rem; border-radius: 8px; transition: background var(--tr); white-space: nowrap; }
    .topnav-back:hover { background: var(--blue-bg); }
    .topnav-divider { width: 1px; height: 18px; background: var(--border-light); flex-shrink: 0; }
    .topnav-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 0.88rem; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    /* HERO */
    .hero { background: linear-gradient(135deg, #0c4a6e 0%, #0f6fb4 40%, #065f46 100%); color: #fff; padding: 3rem 1.5rem 4.5rem; position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 15% 60%, rgba(56,189,248,0.2) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(16,185,129,0.15) 0%, transparent 50%); }
    .hero-inner { max-width: 960px; margin: 0 auto; position: relative; z-index: 1; }
    .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.24); border-radius: 20px; padding: 0.3rem 0.9rem; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 1rem; color: #7dd3fc; }
    .hero-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(1.7rem, 4vw, 2.5rem); font-weight: 800; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 0.75rem; }
    .hero-title span { display: block; background: linear-gradient(90deg, #7dd3fc, #6ee7b7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 0.7em; font-weight: 600; letter-spacing: 0; margin-bottom: 0.2rem; }
    .hero-subtitle { font-size: 0.95rem; opacity: 0.85; max-width: 680px; margin-bottom: 1.5rem; line-height: 1.6; }

    /* PILLARS STICKY NAV STRIP (MỤC LỤC ĐỒNG BỘ CHUẨN) */
    .pillars-nav { position: sticky; top: 56px; z-index: 190; background: var(--surface); border-bottom: 1px solid var(--border-light); padding: 0.75rem 1.5rem; }
    .pillars-nav-inner { max-width: 960px; margin: 0 auto; display: flex; gap: 0.6rem; overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .pillar-tab { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.85rem; border-radius: 10px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.78rem; font-weight: 700; color: var(--text-muted); border: 1px solid var(--border-light); background: var(--surface-2); text-decoration: none; white-space: nowrap; transition: all var(--tr); }
    .pillar-tab:hover { border-color: var(--accent); color: var(--accent); background: var(--blue-bg); }
    .pillar-tab.p-1 { border-left: 4px solid var(--blue); }
    .pillar-tab.p-2 { border-left: 4px solid var(--teal); }
    .pillar-tab.p-3 { border-left: 4px solid var(--green); }
    .pillar-tab.p-4 { border-left: 4px solid var(--purple); }

    /* PILLARS */
    .pillars { background: var(--surface); border-bottom: 1px solid var(--border-light); padding: 1.5rem; }
    .pillars-inner { max-width: 960px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; }
    .pillar { background: var(--surface-2); border: 1px solid var(--border-light); border-radius: 14px; padding: 1.1rem 1.25rem; display: flex; align-items: flex-start; gap: 0.85rem; position: relative; overflow: hidden; }
    .pillar::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; border-radius: 4px 0 0 4px; }
    .pillar.p1::before { background: var(--blue); }
    .pillar.p2::before { background: var(--green); }
    .pillar.p3::before { background: var(--orange); }
    .pillar-icon { font-size: 1.6rem; flex-shrink: 0; line-height: 1; }
    .pillar-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 0.88rem; color: var(--text); margin-bottom: 0.2rem; }
    .pillar-desc { font-size: 0.78rem; color: var(--text-muted); line-height: 1.45; }

    /* PAGE CONTENT */
    .page-content { max-width: 960px; margin: 0 auto; padding: 2rem 1.5rem; display: flex; flex-direction: column; gap: 1.75rem; }

    /* SEC CARD */
    .sec-card { background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius); overflow: hidden; scroll-margin-top: 110px; }
    .sec-hdr { padding: 1rem 1.25rem; border-bottom: 1px solid var(--border-light); background: var(--surface-2); display: flex; align-items: center; gap: 0.6rem; }
    .sec-hdr-icon { font-size: 1.1rem; }
    .sec-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.95rem; font-weight: 800; color: var(--text); }
    .sec-body { padding: 1.35rem; }

    /* INFOBOX ALERTS */
    .infobox { display: flex; align-items: flex-start; gap: 0.85rem; padding: 1rem 1.15rem; border-radius: 12px; margin-bottom: 1rem; font-size: 0.85rem; line-height: 1.6; }
    .infobox:last-child { margin-bottom: 0; }
    .infobox-icon { font-size: 1.25rem; flex-shrink: 0; line-height: 1.2; }
    .infobox.danger { background: var(--red-bg); border: 1px solid var(--red-light); border-left: 4px solid var(--red); }
    .infobox.success { background: var(--green-bg); border: 1px solid var(--green-light); border-left: 4px solid var(--green); }
    .infobox.warning { background: var(--orange-bg); border: 1px solid var(--orange-light); border-left: 4px solid var(--orange); }
    .infobox.info { background: var(--blue-bg); border: 1px solid var(--blue-light); border-left: 4px solid var(--blue); }
    .infobox strong { display: block; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.88rem; margin-bottom: 0.2rem; }

    /* REGIMEN TABLE */
    .table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .regimen-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; min-width: 600px; }
    .regimen-table th { background: var(--surface-2); color: var(--text-muted); font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.7rem 0.85rem; border-bottom: 1px solid var(--border-light); text-align: left; }
    .regimen-table td { padding: 0.8rem 0.85rem; border-bottom: 1px solid var(--border-light); vertical-align: top; line-height: 1.55; }
    .rx-tag { display: inline-block; background: var(--border-light); color: var(--text-muted); font-size: 0.72rem; font-family: 'JetBrains Mono', monospace; padding: 0.15rem 0.45rem; border-radius: 5px; margin: 0.1rem 0.1rem 0.1rem 0; }
    .rx-tag.preferred { background: var(--green-bg); color: #065f46; border: 1px solid var(--green-light); font-weight: 600; }

    @media (max-width: 768px) {
      .page-content { padding: 1.25rem 1rem; }
      .sec-body { padding: 1rem; }
    }
  </style>
</head>
<body>

  <!-- TOP NAV -->
  <nav class="topnav">
    <a href="../guidelines.html" class="topnav-back">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      Kho Guidelines
    </a>
    <div class="topnav-divider"></div>
    <div class="topnav-title">[Tên ngắn guideline]</div>
  </nav>

  <!-- HERO -->
  <header class="hero">
    <div class="hero-inner">
      <div class="hero-badge">🔬 [Tổ chức ban hành / Năm]</div>
      <h1 class="hero-title">
        <span>[Tên tiếng Anh nguyên bản]</span>
        [Tiêu Đề Tiếng Việt Nổi Bật]
      </h1>
      <p class="hero-subtitle">[Mô tả tóm tắt giá trị lâm sàng cốt lõi của hướng dẫn này]</p>
    </div>
  </header>

  <!-- PILLARS STRIP -->
  <section class="pillars">
    <div class="pillars-inner">
      <div class="pillar p1">
        <div class="pillar-icon">⚡</div>
        <div>
          <div class="pillar-title">Trụ cột 1</div>
          <div class="pillar-desc">[Nội dung đổi mới trọng tâm 1]</div>
        </div>
      </div>
      <div class="pillar p2">
        <div class="pillar-icon">🎯</div>
        <div>
          <div class="pillar-title">Trụ cột 2</div>
          <div class="pillar-desc">[Nội dung đổi mới trọng tâm 2]</div>
        </div>
      </div>
      <div class="pillar p3">
        <div class="pillar-icon">🛡️</div>
        <div>
          <div class="pillar-title">Trụ cột 3</div>
          <div class="pillar-desc">[Nội dung đổi mới trọng tâm 3]</div>
        </div>
      </div>
    </div>
  </section>

  <!-- MAIN CONTENT -->
  <main class="page-content">

    <!-- CARD 1: TỔNG QUAN & KHUYẾN CÁO CỐT LÕI -->
    <article class="sec-card">
      <div class="sec-hdr">
        <span class="sec-hdr-icon">📋</span>
        <h2 class="sec-title">1. Khuyến Cáo Lâm Sàng Trọng Tâm</h2>
      </div>
      <div class="sec-body">
        <div class="infobox success">
          <span class="infobox-icon">✅</span>
          <div>
            <strong>Khuyến cáo Mạnh (Class I, LOE A)</strong>
            [Nội dung chỉ định bắt buộc / lựa chọn đầu tay...]
          </div>
        </div>
        <div class="infobox warning">
          <span class="infobox-icon">⚠️</span>
          <div>
            <strong>Cần Cân Nhắc / Nguy Cơ (Class IIa/IIb)</strong>
            [Nội dung cần theo dõi sát hoặc có điều kiện...]
          </div>
        </div>
        <div class="infobox danger">
          <span class="infobox-icon">🚫</span>
          <div>
            <strong>Chống Chỉ Định / Không Khuyên Dùng (Class III)</strong>
            [Nội dung hành vi chống chỉ định hoặc không mang lại lợi ích...]
          </div>
        </div>
      </div>
    </article>

    <!-- CARD 2: PHÁC ĐỒ ĐIỀU TRỊ & BẢNG LIỀU DÙNG -->
    <article class="sec-card">
      <div class="sec-hdr">
        <span class="sec-hdr-icon">💊</span>
        <h2 class="sec-title">2. Phác Đồ Thuốc & Hướng Dẫn Liều Dùng</h2>
      </div>
      <div class="sec-body">
        <div class="table-wrapper">
          <table class="regimen-table">
            <thead>
              <tr>
                <th>Thuốc / Can Thiệp</th>
                <th>Liều Khởi Đầu & Duy Trì</th>
                <th>Mục Tiêu & Lưu Ý Lâm Sàng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Thuốc A</strong><br>
                  <span class="rx-tag preferred">Ưu tiên hàng 1</span>
                </td>
                <td>0.05 – 0.1 mcg/kg/phút TTM</td>
                <td>Duy trì MAP ≥ 65 mmHg. Theo dõi ngoại vi hoặc TMTT.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </article>

  </main>
</body>
</html>
```

### Step 4: Đăng Ký Bản Ghi trong `guidelinesdata.js`
Mở file `src/content/ebm/guidelines/guidelinesdata.js` và thêm object mới vào mảng `SAMPLE_STUDIES`:

```js
{
  id: "study_slug_name",                     // ID duy nhất (ví dụ: study_sepsis3_2021)
  title: "AHA/ACC 2025: Tiêu đề tiếng Việt...", // Tiêu đề hiển thị trên danh sách
  drug: "Norepinephrine, Vasopressin...",    // Tên thuốc / can thiệp chính
  sourceType: "intl-guideline",              // intl-study | intl-guideline | vn-moh | vn-doh | vn-association
  specialty: "icu",                          // cardio | pulmo | gi | endo | neuro | infect | renal | rheum | hema | onco | pedia | obgyn | icu
  design: "guideline",                       // rct | meta | cohort | guideline | review | other
  intervention: "Nội dung can thiệp chính...",
  primaryEndpoint: "Tiêu chí đánh giá chính...",
  keyResults: "HR 0.86 (95% CI 0.74-0.99, p=0.04)...", // Nhận diện Forest Plot tự động
  impact: "practice-changing",               // practice-changing | informative | early-signal | negative | regulatory
  year: 2021,
  organization: "SSC / ESICM / SCCM",
  phase: "International Guideline",
  sampleSize: null,
  population: "Bệnh nhân sốc nhiễm khuẩn...",
  summary: "Nội dung tóm tắt cốt lõi 2-3 câu...",
  detailedConclusion: "Kết luận chi tiết về liều dùng và quy trình...",
  sourceUrl: "https://doi.org/...",
  file: "kho-guidelines/phac-do-soc-nhiem-khuan-sepsis3.html", // Đường dẫn tính từ ebm/guidelines/
  asianData: true,
  bookmarked: false,
  subgroups: {                               // (Tùy chọn) hiển thị biểu đồ phụ
    "Phân nhóm 1": "HR 0.75 (95% CI 0.60-0.90)",
    "Tỷ lệ đạt mục tiêu (%)": "COL: Nhóm A: 75% | Nhóm B: 45%"
  }
}
```

### Step 5: Kiểm Tra Lỗi & Xác Nhận Layout (Integrity Check)
1. **HTML Closing Tags**: Chạy kiểm tra thẻ đóng mở bằng Node script nếu cần:
   `node scratch/check_tags.js src/content/ebm/guidelines/kho-guidelines/<slug>.html`
2. **Path Verification**:
   - Kiểm tra `../guidelines.html` từ file trong `kho-guidelines/`.
   - Kiểm tra `file` trong `guidelinesdata.js` có tiền tố `kho-guidelines/<slug>.html`.
3. **Màu sắc & Dark Mode**:
   - Đảm bảo sử dụng các biến CSS `--surface`, `--text`, `--border-light`, `--green-bg`, v.v. để tối ưu hiển thị Dark Mode.

---

## 🎨 4. QUY TẮC HIỂN THỊ BIỂU ĐỒ TỰ ĐỘNG (MINI CHARTS)

Hệ thống Kho Guidelines trong CliniPortal có khả năng **tự động phân tích chuỗi văn bản** trong `keyResults` hoặc `subgroups` để vẽ biểu đồ SVG dạng Mini:

| Cú Pháp Chuỗi Số Liệu | Loại Biểu Đồ Render Tự Động |
| :--- | :--- |
| `HR 0.86 (95% CI 0.74-0.99, p=0.04)` | **Forest Plot** (Trục 1.0, khoảng tin cậy 95%) |
| `COL: Can thiệp: 74.5% \| Giả dược: 48.2%` | **Column Chart** (Biểu đồ cột đứng so sánh %) |
| `HBAR: Tuổi <65: 78.5% \| Tuổi ≥65: 54.0%` | **Horizontal Bar Chart** (Biểu đồ thanh ngang) |

---

---

## 🤖 5. PROMPT CHUẨN XUẤT MẢNG JSON DÀNH CHO NOTEBOOKLM (DÙNG ĐẢM BẢO CHUẨN GUIDELINESDATA.JS)

Nếu bạn muốn **NotebookLM xuất trực tiếp MẢNG JSON `[ { ... } ]` chuẩn 100%** để copy-paste thẳng vào mảng `SAMPLE_STUDIES` trong `guidelinesdata.js`, hãy dùng Prompt dưới đây:

```markdown
Bạn là một chuyên gia Y học chứng cứ (EBM). Hãy đọc tài liệu/PDF được cung cấp và trích xuất dữ liệu ra MẢNG JSON CHUẨN trong cặp ngoặc vuông [ ] bên dưới (KHÔNG viết thêm văn bản giải thích bên ngoài khối JSON, KHÔNG thêm bớt key):

```json
[
  {
    "id": "study_[tên_slug]_[năm]",
    "title": "[Tên Tiếng Việt đầy đủ của Hướng dẫn / Nghiên cứu]",
    "drug": "[Danh sách các hoạt chất/thuốc can thiệp chính, phân cách bằng dấu phẩy]",
    "sourceType": "[Chỉ chọn 1 giá trị: intl-study | intl-guideline | vn-moh | vn-doh | vn-association]",
    "specialty": "[Chỉ chọn 1 giá trị: cardio | pulmo | gi | endo | neuro | infect | renal | rheum | hema | onco | pedia | obgyn | icu]",
    "design": "[Chỉ chọn 1 giá trị: rct | meta | cohort | guideline | review | other]",
    "intervention": "[Mô tả tóm tắt can thiệp / phác đồ mới / quy trình chẩn đoán trong 1-2 câu]",
    "primaryEndpoint": "[Tiêu chí đánh giá chính hoặc mục tiêu lâm sàng hàng đầu]",
    "keyResults": "[Kết quả nổi bật nhất. BẮT BUỘC dùng dạng HR 0.86 (95% CI 0.74-0.99, p=0.04) nếu có]",
    "impact": "[Chỉ chọn 1 giá trị: practice-changing | informative | early-signal | negative | regulatory]",
    "year": 2026,
    "organization": "[Tên tổ chức ban hành: GINA, KDIGO, AHA, ESC...]",
    "phase": "International Guideline",
    "sampleSize": null,
    "population": "[Đối tượng bệnh nhân mục tiêu]",
    "summary": "[Tóm tắt tổng quan cốt lõi 2-3 câu]",
    "detailedConclusion": "[Tóm tắt kết luận chi tiết 3-5 câu về liều dùng, khuyến cáo Class I, IIa, III]",
    "file": "kho-guidelines/[tên-file-slug].html",
    "asianData": true,
    "bookmarked": false,
    "subgroups": {
      "Khuyến cáo Class I": "Nội dung khuyến cáo mạnh...",
      "Tỷ lệ đạt mục tiêu (%)": "COL: Can thiệp: 74.5% | Giả dược: 48.2%",
      "Phân tích theo tuổi": "HBAR: Tuổi <65: 78.5% | Tuổi >=65: 54.0%"
    }
  }
]
```
```

---

## 🤖 6. PROMPT XUẤT NỘI DUNG MARKDOWN (.MD) CHO NỘI DUNG TRANG CHI TIẾT

Sao chép toàn bộ nội dung trong khung dưới đây dán vào NotebookLM khi muốn tạo file nội dung Markdown (.md):

```markdown
Bạn là một chuyên gia Y học chứng cứ (EBM). Hãy đọc kỹ toàn bộ tài liệu/PDF được cung cấp và tổng hợp thành một bài viết hoàn chỉnh dạng Markdown (.md) theo ĐÚNG CẤU TRÚC CHUẨN CliniPortal dưới đây.

⚠️ YÊU CẦU BẮT BUỘC VỀ ĐỊNH DẠNG:
1. Trích xuất chính xác các số liệu thống kê (HR, OR, RR, 95% CI, p-value, tỷ lệ %).
2. ĐIỀU CHỈNH CÚ PHÁP BIỂU ĐỒ ĐỂ HỆ THỐNG TỰ ĐỘNG RENDER SVG:
   - Chỉ số nguy cơ tương đối / Forest plot: Bắt buộc dùng cú pháp `HR X.XX (95% CI X.XX-X.XX, p=X.XX)` hoặc `OR...` hoặc `RR...`.
   - Biểu đồ Cột đứng (Column Chart): Bắt buộc dùng cú pháp `COL: Tên nhóm 1: XX.X% | Tên nhóm 2: YY.Y%`.
   - Biểu đồ Thanh ngang Subgroup (Horizontal Bar Chart): Bắt buộc dùng cú pháp `HBAR: Tên phân nhóm 1: XX.X% | Tên phân nhóm 2: YY.Y%`.

---
title: "[Tên Khuyến Cáo / Nghiên Cứu Nổi Bật Bằng Tiếng Việt]"
englishTitle: "[Tên Tiếng Anh Nguyên Bản Đầy Đủ]"
organization: "[Tổ chức ban hành: KDIGO / AHA-ACC / ESC / GINA / GOLD / Bộ Y tế Việt Nam...]"
year: 2026
specialty: "[pulmo | cardio | endo | renal | icu | infect...]"
sourceType: "[intl-guideline | intl-study | vn-moh...]"
design: "[guideline | rct | meta...]"
impact: "[practice-changing | informative...]"
drug: "[Budesonide-formoterol, Salbutamol...]"
population: "[Đối tượng bệnh nhân]"
sourceUrl: "[Link DOI nếu có]"
---

# Tổng Quan
[Tóm tắt bối cảnh lâm sàng trong 2-3 câu]

## 1. Các Trụ Cột Đổi Mới Cốt Lõi (Pillars)
- **Trụ cột 1:** [Điểm thay đổi 1]
- **Trụ cột 2:** [Điểm thay đổi 2]
- **Trụ cột 3:** [Điểm thay đổi 3]

## 2. Tiêu Chuẩn Chẩn Đoán & Khuyến Cáo Lâm Sàng (Recommendations)
### A. Khuyến Cáo Mạnh (Class I / LOE A, B)
- ✅ **[Hành vi / Chỉ định 1]:** [Chi tiết khuyến cáo bắt buộc]

### B. Cần Cân Nhắc / Có Điều Kiện (Class IIa, IIb / LOE B, C)
- ⚠️ **[Hành vi cân nhắc 1]:** [Chi tiết điều kiện áp dụng]

### C. Chống Chỉ Định / Không Khuyên Dùng (Class III / Danger)
- 🚫 **[Hành vi chống chỉ định 1]:** [Chi tiết hành vi chống chỉ định]

## 3. Phác Đồ Thuốc & Hướng Dẫn Liều Dùng (Regimens)
| Thuốc / Can Thiệp | Phác Đồ & Liều Dùng | Mục Tiêu & Lưu Ý Lâm Sàng |
| :--- | :--- | :--- |
| **[Tên Thuốc 1]** | [Liều khởi đầu, liều duy trì] | [Lưu ý lâm sàng] |

## 4. Kết Quả Định Lượng & Biểu Đồ (Data & Subgroups)
- **Primary Endpoint:** HR 0.86 (95% CI 0.74-0.99, p=0.04)
- **Tỷ lệ kiểm soát:** COL: Can thiệp: 74.5% | Giả dược: 48.2%
- **Phân nhóm theo Tuổi:** HBAR: Tuổi <65: 78.5% | Tuổi >=65: 54.0%
```

