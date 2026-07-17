---
name: guideline-summary-module
description: >
  Tạo và chỉnh sửa các trang tóm tắt khuyến cáo lâm sàng và nghiên cứu y khoa (Guidelines)
  đẹp mắt, chuyên nghiệp tại thư mục pages/Y học chứng cứ/Guidelines/Kho Guidelines/.
  Kích hoạt khi AI cần tạo trang guideline tóm tắt mới hoặc cập nhật các trang guideline hiện có.
---

# Guideline Summary Module Skill

Tài liệu này định nghĩa tiêu chuẩn thiết kế, cấu trúc mã nguồn và các thành phần giao diện mẫu (Boilerplate) cho các trang tóm tắt hướng dẫn lâm sàng (Guidelines/RCT Landmark) tại phân hệ **Y học chứng cứ (EBM)** của CliniPortal.

---

## 📁 Cấu trúc Thư mục Guidelines

Các trang tóm tắt cụ thể được đặt trong thư mục `Kho Guidelines`:
```
pages/Y học chứng cứ/
├── yhcc.html                             # Hub tổng Y học chứng cứ (Cấp 2)
└── Guidelines/
    ├── Guidelines.html                   # Trang tra cứu Guidelines (Cấp 3)
    ├── Guidelines.css                    # CSS cho trang tra cứu
    ├── Guidelines.js                     # JS xử lý filter/search
    ├── GuidelinesData.js                 # Database danh sách guidelines
    └── Kho Guidelines/                   # Thư mục chứa các trang chi tiết (Cấp 4)
        ├── empa-reg.html                 # Mẫu RCT Landmark
        └── ks-cho-bn-nang.html           # Mấu tóm tắt Guidelines mới 2026
```

---

## 📐 Cú pháp Đường dẫn tương đối (Cấp 4)

Tất cả các file trong thư mục `Kho Guidelines/` nằm ở **cấp 4** so với thư mục gốc `Apps_ykhoa/`. Do đó, khi liên kết các tài nguyên hệ thống hoặc các trang khác, bắt buộc sử dụng tiền tố đường dẫn tương đối chính xác:

- Trở về thư mục gốc: `../../../../`
  - *Ví dụ:* `<link rel="stylesheet" href="../../../../css/reset.css">`
- Trở về trang tra cứu Guidelines: `../Guidelines.html`
- Trở về trang Hub Y học chứng cứ: `../../yhcc.html`

---

## 🎨 Tiêu chuẩn Giao diện & Design Tokens

Các trang Guideline chi tiết được thiết kế theo dạng **trang độc lập (standalone)** có thanh điều hướng nhỏ (`.topnav`) ở trên cùng để quay lại, không sử dụng sidebar accordion của hệ thống chính nhằm dành toàn bộ không gian cho dữ liệu lâm sàng phức tạp.

### 1. Palette màu sắc trạng thái
Sử dụng các biến màu CSS từ `main.css` kết hợp với styling inline an toàn để hiển thị sinh động các mức độ khuyến cáo:
- **Nguy cơ thấp / Khuyến cáo mạnh (Màu xanh lá):** `--color-success` (`#059669`), nền `#f0fdf4`, viền `#a7f3d0`
- **Nguy cơ cao / Kháng thuốc / Cảnh báo (Màu cam):** `--color-warning` (`#d97706`), nền `#fffbeb`, viền `#fde68a`
- **Nguy kịch / Sốc / Chống chỉ định (Màu đỏ):** `--color-rose` / `--red` (`#dc2626`), nền `#fef2f2`, viền `#fca5a5`
- **Thông tin lâm sàng / Lựa chọn thay thế (Màu xanh dương):** `--color-primary` / `--blue` (`#2563eb`), nền `#eff6ff`, viền `#bfdbfe`
- **Thông tin bổ sung / Kỵ khí (Màu xanh ngọc):** `--color-teal` (`#0d9488`), nền `#f0fdfa`, viền `#99f6e4`

### 2. Typography
- Font tiêu đề: `'Plus Jakarta Sans', sans-serif`
- Font nội dung chính: `'Inter', sans-serif`
- Font dữ liệu, công thức, phác đồ liều: `'JetBrains Mono', monospace`

---

## 🧱 Boilerplate HTML & CSS chuẩn

Mỗi khi tạo trang tóm tắt Guideline mới, hãy sử dụng khung cấu trúc hoàn chỉnh dưới đây:

```html
<!DOCTYPE html>
<html lang="vi" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[Mô tả SEO tóm tắt nội dung guideline khoảng 150-160 ký tự]">
  <title>[Tên Guideline/Thử nghiệm] – CliniPortal</title>

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
    .topnav-badges { margin-left: auto; display: flex; gap: 0.5rem; flex-shrink: 0; }
    .badge { padding: 0.2rem 0.65rem; border-radius: 20px; font-size: 0.7rem; font-weight: 700; white-space: nowrap; }
    .badge-green { background: var(--green-bg); color: #065f46; border: 1px solid var(--green-light); }
    .badge-orange { background: var(--orange-bg); color: #92400e; border: 1px solid var(--orange-light); }

    /* HERO */
    .hero { background: linear-gradient(135deg, #0c4a6e 0%, #0f6fb4 40%, #065f46 100%); color: #fff; padding: 3.5rem 1.5rem 5rem; position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 15% 60%, rgba(56,189,248,0.2) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(16,185,129,0.15) 0%, transparent 50%); }
    .hero-inner { max-width: 960px; margin: 0 auto; position: relative; z-index: 1; }
    .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.24); border-radius: 20px; padding: 0.3rem 0.9rem; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 1rem; color: #7dd3fc; }
    .hero-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 0.75rem; }
    .hero-title span { display: block; background: linear-gradient(90deg, #7dd3fc, #6ee7b7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 0.7em; font-weight: 600; letter-spacing: 0; margin-bottom: 0.2rem; }
    .hero-subtitle { font-size: 0.95rem; opacity: 0.82; max-width: 660px; margin-bottom: 2rem; line-height: 1.6; }
    .hero-meta { display: flex; flex-wrap: wrap; gap: 0.75rem 2rem; font-size: 0.8rem; opacity: 0.75; }
    .hero-meta-item { display: flex; align-items: center; gap: 5px; }

    /* PILLARS STRIP */
    .pillars { background: var(--surface); border-bottom: 1px solid var(--border-light); padding: 1.75rem 1.5rem; }
    .pillars-inner { max-width: 960px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; }
    .pillar { background: var(--surface-2); border: 1px solid var(--border-light); border-radius: 14px; padding: 1.25rem 1.25rem 1.25rem 1.5rem; display: flex; align-items: flex-start; gap: 1rem; position: relative; overflow: hidden; transition: box-shadow var(--tr); }
    .pillar::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; border-radius: 4px 0 0 4px; }
    .pillar.p1::before { background: var(--blue); }
    .pillar.p2::before { background: var(--green); }
    .pillar.p3::before { background: var(--orange); }
    .pillar:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
    .pillar-icon { font-size: 1.8rem; flex-shrink: 0; line-height: 1; }
    .pillar-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 0.88rem; color: var(--text); margin-bottom: 0.25rem; }
    .pillar-desc { font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; }

    /* PAGE CONTENT */
    .page-content { max-width: 960px; margin: 0 auto; padding: 2.25rem 1.5rem; display: flex; flex-direction: column; gap: 2rem; }

    /* SECTION CARDS */
    .sec-card { background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius); overflow: hidden; }
    .sec-hdr { padding: 1rem 1.5rem; border-bottom: 1px solid var(--border-light); background: var(--surface-2); display: flex; align-items: center; gap: 0.6rem; }
    .sec-hdr-icon { font-size: 1.1rem; }
    .sec-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.95rem; font-weight: 800; color: var(--text); }
    .sec-body { padding: 1.5rem; }
    .sec-subtitle { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.04em; }

    /* INFO BOXES */
    .infobox { display: flex; align-items: flex-start; gap: 0.85rem; padding: 1rem 1.25rem; border-radius: 12px; margin-bottom: 1rem; font-size: 0.85rem; line-height: 1.6; }
    .infobox:last-child { margin-bottom: 0; }
    .infobox-icon { font-size: 1.3rem; flex-shrink: 0; line-height: 1.3; }
    .infobox.danger { background: var(--red-bg); border: 1px solid var(--red-light); border-left: 4px solid var(--red); }
    .infobox.success { background: var(--green-bg); border: 1px solid var(--green-light); border-left: 4px solid var(--green); }
    .infobox.warning { background: var(--orange-bg); border: 1px solid var(--orange-light); border-left: 4px solid var(--orange); }
    .infobox.info { background: var(--blue-bg); border: 1px solid var(--blue-light); border-left: 4px solid var(--blue); }
    .infobox strong { display: block; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.88rem; margin-bottom: 0.3rem; }

    /* TABLE DESIGN */
    .table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .regimen-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; min-width: 700px; }
    .regimen-table thead th { padding: 0.7rem 0.9rem; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .regimen-table thead .th-source { background: var(--accent); color: #fff; width: 120px; border-radius: 8px 0 0 0; }
    .regimen-table thead .th-low { background: var(--green); color: #fff; }
    .regimen-table thead .th-high { background: #b45309; color: #fff; border-radius: 0 8px 0 0; }
    .regimen-table td { padding: 0.85rem 0.9rem; border-bottom: 1px solid var(--border-light); vertical-align: top; line-height: 1.55; }
    .regimen-table tbody tr:hover td { background: #f8fafc; }
    .source-cell { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 0.82rem; color: var(--accent); display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; }
    .rx-tag { display: inline-block; background: var(--border-light); color: var(--text-muted); font-size: 0.72rem; font-family: 'JetBrains Mono', monospace; padding: 0.15rem 0.5rem; border-radius: 5px; margin: 0.15rem 0.1rem 0.15rem 0; }
    .rx-tag.preferred { background: var(--green-bg); color: #065f46; border: 1px solid var(--green-light); font-weight: 600; }

    /* UPDATES GRID CARDS */
    .updates-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(320px,100%), 1fr)); gap: 1.25rem; }
    .update-card { background: var(--surface-2); border: 1px solid var(--border-light); border-radius: 14px; padding: 1.35rem; position: relative; overflow: hidden; transition: box-shadow var(--tr); }
    .update-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
    .update-card-accent { position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: 14px 14px 0 0; }
    .update-card-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
    .update-card-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
    .update-card-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 0.9rem; color: var(--text); line-height: 1.3; }
    .update-card-body { font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; }
    .update-verdict { display: inline-flex; align-items: center; gap: 0.35rem; margin-top: 0.85rem; padding: 0.35rem 0.75rem; border-radius: 8px; font-size: 0.75rem; font-weight: 700; }
    .verdict-green { background: var(--green-bg); color: #065f46; border: 1px solid var(--green-light); }
    .verdict-blue { background: var(--blue-bg); color: #1e40af; border: 1px solid var(--blue-light); }

    /* CITATION & ACTION BUTTONS */
    .citation-box { background: var(--surface-2); border: 1px solid var(--border-light); border-radius: 12px; padding: 1.25rem; font-size: 0.82rem; color: var(--text-muted); line-height: 1.75; font-style: italic; }
    .btn-row { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1.25rem; }
    .btn { display: inline-flex; align-items: center; gap: 6px; padding: 0.55rem 1.1rem; border-radius: 10px; border: 1.5px solid var(--border-light); background: var(--surface); color: var(--text-muted); font-size: 0.82rem; font-weight: 600; cursor: pointer; text-decoration: none; transition: all var(--tr); }
    .btn:hover { border-color: var(--accent); color: var(--accent); background: var(--blue-bg); }
    .btn-primary { background: var(--accent); color: #fff; border-color: var(--accent); }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      .page-content { padding: 1.25rem 1rem; }
      .sec-body { padding: 1rem; }
      .updates-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <!-- TOP NAV -->
  <nav class="topnav">
    <a href="../Guidelines.html" class="topnav-back">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      Kho Guidelines
    </a>
    <div class="topnav-divider"></div>
    <div class="topnav-title">[Tên chủ đề cập nhật]</div>
  </nav>

  <!-- HERO -->
  <div class="hero">
    <div class="hero-inner">
      <div class="hero-badge">🔬 [Tên hội hội/chuyên khoa]</div>
      <h1 class="hero-title">
        <span>[Tiêu đề phụ tiếng Anh]</span>
        [Tiêu Đề Khuyến Cáo Tiếng Việt]
      </h1>
      <p class="hero-subtitle">
        [Mô tả tổng quan ngắn gọn về tầm quan trọng của guideline này]
      </p>
    </div>
  </div>

  <!-- PILLARS -->
  <div class="pillars">
    <div class="pillars-inner">
      <div class="pillar p1">
        <div class="pillar-icon">⏱️</div>
        <div>
          <div class="pillar-title">Trụ cột 1</div>
          <div class="pillar-desc">[Mô tả ngắn gọn]</div>
        </div>
      </div>
      <!-- Thêm các pillars khác nếu cần -->
    </div>
  </div>

  <!-- CONTENT -->
  <div class="page-content">
    <!-- Thêm sec-card tại đây -->
  </div>

</body>
</html>
```
