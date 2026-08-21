---
name: epidemiology-module
description: >
  Quy trình tạo và chỉnh sửa bài viết Dịch tễ học Y khoa & Y tế công cộng chuẩn EBM
  trong phân hệ Cơ sở Y khoa (src/content/basic-medical/epidemiology/) của CliniPortal.
  Kích hoạt khi AI cần: tạo bài Dịch tễ học bệnh lý mới từ Knowledge Vault (1.4. Kho dịch tễ học),
  thêm sơ đồ tam giác dịch tễ / chu kỳ lây truyền vector SVG, tích hợp bảng đối sánh véc-tơ,
  dữ liệu tỷ lệ mắc/tử vong, hoặc xử lý layout điều hướng sticky .pillars-nav.
---

# Epidemiology Module Skill (Dịch Tễ Học Y Khoa & Y Tế Công Cộng)

> Kỹ năng chuyên sâu hướng dẫn cấu trúc, giao diện, bảng số liệu dịch tễ học, sơ đồ vectơ & chu kỳ lây truyền SVG thuần và chuẩn điều hướng mượt mà cho phân hệ **Dịch Tễ Học Y Khoa (Medical Epidemiology & Public Health)** trong CliniPortal.

---

## 🏛️ 1. Quy hoạch Phân hệ & Cấu Trúc Lưu Trữ

Tất cả các bài viết Dịch tễ học được lưu trữ tại `src/content/basic-medical/epidemiology/`:

```text
src/content/basic-medical/epidemiology/
├── README.md                              # Giới thiệu phân hệ & danh mục bài viết
├── HUONG_DAN_THIET_KE_DICH_TE.md          # Hướng dẫn thiết kế & Design tokens
├── WORKFLOW_TAO_TRANG_DICH_TE_HOC.md      # Quy trình biên dịch từ Knowledge Vault sang HTML
└── dth-[ma-benh-slug].html                # File bài viết dịch tễ học chuyên sâu (Cấp 4)
```

Nguồn tri thức gốc được lưu trữ tại:
`knowledge-vault/1.4. Kho dịch tễ học/[Tên chuyên khoa]/DTH_[Tên bệnh].md`

---

## 🛑 2. Bộ Quy tắc Bất di Bất dịch (Mandatory Rules)

1. **Đường dẫn tương đối cấp 4**:
   - Tệp bài viết nằm ở cấp 4 (ví dụ `src/content/basic-medical/epidemiology/dth-dengue.html`).
   - Root CSS/JS: `../../../../css/` và `../../../../components/`.
   - Resource module: `../css/physio-shared.css` và `../js/physio-shared.js` (hoặc module tương ứng).
2. **Cấm xung đột SPA Hash Router**:
   - Tất cả các thẻ `<a href="#sec-X">` trong thanh điều hướng bài học **bắt buộc** phải có:
     `onclick="event.preventDefault(); document.getElementById('sec-X')?.scrollIntoView({behavior:'smooth'});"`
   - Thuộc tính `scroll-margin-top: 80px;` phải được khai báo trên `.article-section` hoặc `.sec-card` để tránh bị toolbar/header che khuất tiêu đề khi cuộn.
3. **Thanh Mục lục chuẩn Kho Guidelines (`.pillars-nav`)**:
   - Sử dụng thanh dải sticky nav `.pillars-nav` với các tab `.pillar-tab.p-1` &rarr; `.p-X`.
   - **Tuyệt đối không** nhân bản 2 khối mục lục (không dùng song song thẻ `.toc-card` trùng lặp).
4. **Chuẩn Đồ Họa Xuất Bản Cao Cấp (Editorial-Grade Inline SVG Studio)**:
   - **Tỷ lệ & Kích thước Card**: Thẻ node (Card Base) phải có kích thước tối thiểu `width="260" - "300"`, `height="110" - "135"`, `rx="14"`, không được tạo box quá hẹp dẫn tới tràn/cắt cụt chữ.
   - **Header Pill Tích Hợp**: Header icon/danh mục phải được tích hợp gọn gàng ở đỉnh thẻ (`<rect x="14" y="-12" width="..." height="26" rx="13" fill="...">`) với icon/text nổi bật, **tuyệt đối không đặt vòng tròn icon lơ lửng đè lên viền hoặc che khuất chữ**.
   - **Tọa độ & Căn lề đa dòng**: Dùng tọa độ rõ ràng (`x="16"` từ mép trái, `y="32"`, `y="52"`, `y="70"`, `y="88"`...) cho tiêu đề và các dòng bullet point.
   - **Đường Nối & Arrow Markers**: Dùng đường cong mượt mà (`<path d="M... Q..." />`) hoặc đường trực giao có marker `<defs>` chỉ hướng rõ ràng, không vẽ đường thẳng cắt chéo thô sơ đâm xuyên qua tâm chữ.
   - **Center Hub**: Giao điểm trung tâm phải có vòng pulse đồng tâm phát sáng (`stroke-width="6"`, `fill-opacity="0.08"`), thể hiện rõ tiêu điểm giao thoa bùng phát dịch.
   - **Cấm thẻ HTML trong SVG `<text>`**: **TUYỆT ĐỐI CẤM** dùng các thẻ HTML (`<strong>`, `<b>`, `<span>`, `<br>`, `<em>`, `<code>`) bên trong `<text>` của SVG.
5. **Kiểm tra HTML Integrity & Định Dạng Ký Tự ($ / #)**:
   - Sau khi tạo hoặc chỉnh sửa tệp HTML, bắt buộc chạy:
     ```bash
     node scratch/check_tags.js src/content/basic-medical/epidemiology/dth-[ten-bai].html
     node scratch/check_format_bugs.js src/content/basic-medical/epidemiology/dth-[ten-bai].html
     npm run build
     ```
   - **Tuyệt đối không để sót ký tự `$` (LaTeX thô)**: Mọi công thức/ký hiệu toán học phải chuyển sang HTML entities, Unicode (`α, β, Δ, →, ₂, ⁺, ⁻, ≥, ≤`) hoặc thẻ semantic (`<sup>`, `<sub>`, `<em>`, `<code>`).
   - **Tuyệt đối không để sót ký tự `#` (Markdown thô)**: Mọi tiêu đề Markdown (`#`, `##`, `#tag`) phải chuyển đổi hoàn toàn sang các thẻ HTML (`<h1>`, `<h2>`, `<h3>`, `.badge`).

---

## 🎨 3. Hệ Thống Khung Hộp Ngữ Nghĩa Dịch Tễ Học (Callout Boxes)

| Loại hộp | Class | Màu chủ đạo | Ý nghĩa dịch tễ học |
|----------|-------|-------------|---------------------|
| **Cảnh Báo Dịch Tễ** | `.danger-box` / `.epi-alert-danger` | Đỏ (`#ef4444`) | Bùng phát ổ dịch, nguy cơ tử vong cao, độc lực đột biến |
| **Động Học Véc-tơ** | `.vector-box` / `.reaction-box` | Tím (`#8b5cf6`) | Sinh học muỗi/bọ gậy, thời kỳ ủ bệnh ngoại lai EIP, cơ chế truyền bệnh |
| **Điểm Ngọc Lâm Sàng** | `.pearl-box` | Hổ phách (`#f59e0b`) | Dấu hiệu cảnh báo sớm, nhóm nguy cơ cao, bẫy chẩn đoán |
| **Giám Sát & Y Tế CC** | `.info-box` / `.epi-surveillance-box` | Xanh ngọc (`#0d9488` / `#0284c7`) | Biện pháp can thiệp cộng đồng, chỉ số DALYs, tiêm chủng |

---

## 📐 4. Template HTML Mẫu Chuẩn Cho Bài Dịch Tễ Học

```html
<!DOCTYPE html>
<html lang="vi" data-theme="light">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DTH: [Tên Bệnh/Tác Nhân] – Dịch Tễ Học Y Khoa – CliniPortal</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="../../../../css/reset.css">
    <link rel="stylesheet" href="../../../../css/main.css">
    <link rel="stylesheet" href="../../../../css/components/physio-content.css">
    <link rel="stylesheet" href="../../../../css/components/epidemiology-hub.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <style>
        :root {
            --epi-accent: #0d9488;
            --epi-gradient: linear-gradient(135deg, #042f2e 0%, #0f172a 50%, #134e4a 100%);
        }

        [data-theme="dark"] {
            --epi-gradient: linear-gradient(135deg, #022c22 0%, #090d16 50%, #042f2e 100%);
        }

        .epi-article-header {
            background: var(--epi-gradient);
            color: #ffffff;
            padding: 2.5rem 2rem;
            border-radius: 16px;
            margin-bottom: 2rem;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(13, 148, 136, 0.3);
        }

        .epi-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(45, 212, 191, 0.18);
            backdrop-filter: blur(8px);
            padding: 0.35rem 0.85rem;
            border-radius: 999px;
            font-size: 0.82rem;
            font-weight: 700;
            margin-bottom: 1rem;
            border: 1px solid rgba(45, 212, 191, 0.35);
            color: #2dd4bf;
            text-transform: uppercase;
        }

        /* PILLARS STICKY NAV STRIP */
        .pillars-nav {
            position: sticky;
            top: 0;
            z-index: 100;
            background: var(--color-surface, #ffffff);
            border: 1px solid var(--color-border, #e2e8f0);
            border-radius: 14px;
            padding: 0.75rem 1rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
        }

        .pillars-nav-inner {
            display: flex;
            gap: 0.6rem;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }

        .pillar-tab {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.45rem 0.85rem;
            border-radius: 10px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 0.78rem;
            font-weight: 700;
            color: var(--color-text-muted, #64748b);
            border: 1px solid var(--color-border, #e2e8f0);
            background: var(--color-bg, #f8fafc);
            text-decoration: none;
            white-space: nowrap;
            transition: all 0.2s ease;
            flex-shrink: 0;
        }

        .pillar-tab:hover, .pillar-tab.active {
            border-color: var(--epi-accent, #0d9488);
            color: var(--epi-accent, #0d9488);
            background: rgba(13, 148, 136, 0.08);
            transform: translateY(-1px);
        }

        .pillar-tab.p-1 { border-left: 4px solid #0d9488; }
        .pillar-tab.p-2 { border-left: 4px solid #3b82f6; }
        .pillar-tab.p-3 { border-left: 4px solid #8b5cf6; }
        .pillar-tab.p-4 { border-left: 4px solid #f59e0b; }
        .pillar-tab.p-5 { border-left: 4px solid #ef4444; }
        .pillar-tab.p-6 { border-left: 4px solid #10b981; }
        .pillar-tab.p-7 { border-left: 4px solid #06b6d4; }
        .pillar-tab.p-8 { border-left: 4px solid #64748b; }

        [data-theme="dark"] .pillars-nav {
            background: var(--color-surface, #1e293b);
            border-color: var(--color-border, #334155);
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
        }

        [data-theme="dark"] .pillar-tab {
            background: var(--color-surface-2, #0f172a);
            border-color: var(--color-border, #334155);
            color: var(--color-text-muted, #94a3b8);
        }

        .article-section {
            scroll-margin-top: 80px;
            margin-bottom: 2.5rem;
        }

        .section-title {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: clamp(1.2rem, 2.4vw, 1.45rem);
            font-weight: 800;
            line-height: 1.35;
            color: var(--color-primary, #0d9488);
            margin: 2.25rem 0 1.25rem 0;
            padding-bottom: 0.65rem;
            border-bottom: 2px solid rgba(13, 148, 136, 0.2);
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.65rem;
        }

        .section-title i {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            font-size: 1.05rem;
            background: rgba(13, 148, 136, 0.12);
            color: var(--color-primary, #0d9488);
            border-radius: 8px;
            flex-shrink: 0;
        }

        [data-theme="dark"] .section-title {
            color: #2dd4bf;
        }

        [data-theme="dark"] .section-title i {
            background: rgba(45, 212, 191, 0.15);
            color: #2dd4bf;
        }

        .epi-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            font-size: 0.92rem;
        }
        .epi-table th, .epi-table td {
            border: 1px solid var(--color-border, #e2e8f0);
            padding: 0.85rem 1rem;
            text-align: left;
            vertical-align: top;
        }
        .epi-table th {
            background: var(--color-surface-offset, #f8fafc);
            font-weight: 700;
            color: var(--color-text, #0f172a);
        }
    </style>
</head>

<body class="physio-article-body">
    <div class="physio-article-container">

        <!-- HEADER -->
        <header class="epi-article-header">
            <span class="epi-badge"><i class="fa-solid fa-virus-covid"></i> DỊCH TỄ HỌC • TRUYỀN NHIỄM &amp; VI SINH</span>
            <h1 style="margin: 0.25rem 0 0.75rem 0; font-size: 2rem; font-weight: 800; color: #ffffff; line-height: 1.3;">
                [Tiêu Đề Dịch Tễ Học Bệnh/Tác Nhân]
            </h1>
            <p style="margin: 0; font-size: 1.05rem; opacity: 0.95; line-height: 1.6; max-width: 900px;">
                [Tóm tắt súc tích tam giác dịch tễ học, đặc điểm véc-tơ truyền bệnh, động thái chu kỳ ủ bệnh và gánh nặng dịch tễ toàn cầu &amp; Việt Nam.]
            </p>
        </header>

        <!-- PILLARS STICKY NAV STRIP -->
        <nav class="pillars-nav" aria-label="Mục lục bài học nhanh">
            <div class="pillars-nav-inner">
                <a href="#sec-1" class="pillar-tab p-1" onclick="event.preventDefault(); document.getElementById('sec-1')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-triangle-exclamation"></i> 1. Tam Giác Dịch Tễ</a>
                <a href="#sec-2" class="pillar-tab p-2" onclick="event.preventDefault(); document.getElementById('sec-2')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-dna"></i> 2. Tác Nhân &amp; Sinh Lý Bệnh</a>
                <a href="#sec-3" class="pillar-tab p-3" onclick="event.preventDefault(); document.getElementById('sec-3')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-mosquito"></i> 3. Véc-tơ Truyền Bệnh</a>
                <a href="#sec-4" class="pillar-tab p-4" onclick="event.preventDefault(); document.getElementById('sec-4')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-arrows-spin"></i> 4. Chu Kỳ Lây Truyền</a>
                <a href="#sec-5" class="pillar-tab p-5" onclick="event.preventDefault(); document.getElementById('sec-5')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-users"></i> 5. Vật Chủ &amp; Nguy Cơ</a>
                <a href="#sec-6" class="pillar-tab p-6" onclick="event.preventDefault(); document.getElementById('sec-6')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-cloud-sun-rain"></i> 6. Khí Hậu &amp; Xã Hội</a>
                <a href="#sec-7" class="pillar-tab p-7" onclick="event.preventDefault(); document.getElementById('sec-7')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-earth-americas"></i> 7. Tình Hình Toàn Cầu &amp; VN</a>
                <a href="#sec-8" class="pillar-tab p-8" onclick="event.preventDefault(); document.getElementById('sec-8')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-book-medical"></i> 8. Tài Liệu Tham Khảo</a>
            </div>
        </nav>

        <!-- SECTIONS CONTENT -->
        <!-- ... -->

    </div>
</body>
</html>
```

---

## 🛠️ 5. Checklist Kiểm Định Trước Khi Bàn Giao

- [ ] Đường dẫn tài nguyên đúng cấp 4 (`../../../../` và `../`).
- [ ] Tất cả liên kết trong `.pillars-nav` có `onclick="event.preventDefault(); document.getElementById('sec-X')?.scrollIntoView({behavior:'smooth'});"`.
- [ ] Không có khối mục lục thừa lặp lại.
- [ ] Mọi `.article-section` có `id="sec-X"` và `scroll-margin-top: 80px`.
- [ ] Đồ họa Pure Inline SVG tuân thủ `viewBox`, không chứa thẻ HTML trong `<text>`, hỗ trợ 100% Dark Mode.
- [ ] Chạy `node scratch/check_tags.js <file.html>` đạt **PASSED**.
- [ ] Chạy `node scratch/check_format_bugs.js <file.html>` đạt **0 lỗi $ và 0 lỗi #**.
- [ ] Chạy `npm run build` không phát sinh lỗi TypeScript.
