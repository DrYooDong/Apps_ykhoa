# Hướng dẫn Thiết kế Web con Sinh lý bệnh & Cơ chế bệnh sinh (Pathophysiology Cases)

> **Tài liệu quy chuẩn thiết kế** dành cho các bài đọc Sinh lý bệnh & Cơ chế bệnh sinh chuyên sâu trong thư mục `src/content/pathophysiology/pathophysiology-cases/`.
> Mọi web con mới hoặc cập nhật tại thư mục này **bắt buộc tuân thủ quy chuẩn dưới đây**.

---

## 📁 1. Vị trí & Cấp Đường dẫn Tương đối

- **Thư mục lưu trữ**: `src/content/pathophysiology/pathophysiology-cases/`
- **Cấp thư mục**: **Cấp 4** (so với Root workspace `Apps_ykhoa/`).
- **Prefix đường dẫn tương đối lên Root**: `../../../../`
- **Prefix đường dẫn tương đối tới module Pathophysiology**: `../`

### Bảng tra cứu đường dẫn chuẩn:

| Tài nguyên | Đường dẫn tương đối từ `pathophysiology-cases/` |
|------------|------------------------------------------------|
| Asset Root CSS (`reset.css`, `main.css`, `header.css`, `sidebar.css`, `footer.css`) | `../../../../css/...` |
| CSS Sinh lý bệnh dùng chung (`module-dashboard.css`, `physio-headings.css`, `physio-content.css`, `toc.css`) | `../../../../css/components/...` |
| CSS Module Sinh lý | `../css/physio-shared.css` |
| Asset Root JS (`header.js`, `footer.js`, `main.js`, `toc.js`) | `../../../../js/...` hoặc `../../../../components/...` |
| JS Module Sinh lý | `../js/physio-shared.js` |
| Trang Hub Sinh lý & Sinh lý bệnh | `../sinhly-sinhlybenh.html` |
| Trang Chủ CliniPortal | `../../../../index.html` |

---

## 🏷️ 2. Quy tắc Đặt tên File HTML

Đặt tên tệp theo cấu trúc chuẩn:
```text
slb-ccbs-[mã-bệnh-rút-gọn].html
```

### Danh sách Mã bệnh Chuẩn (Hiện có & Mở rộng):
- `slb-ccbs-soc.html`: Sinh lý bệnh Sốc (Shock)
- `slb-ccbs-bach-hau.html`: Bệnh Bạch hầu (Diphtheria)
- `slb-ccbs-acs.html`: Hội chứng vành cấp (ACS)
- `slb-ccbs-aki.html`: Tổn thương thận cấp (AKI)
- `slb-ccbs-ckd.html`: Bệnh thận mạn (CKD)
- `slb-ccbs-copd.html`: Bệnh phổi tắc nghẽn mạn tính (COPD)
- `slb-ccbs-dtd.html`: Đái tháo đường (Diabetes Mellitus)
- `slb-ccbs-gerd.html`: Trào ngược dạ dày thực quản (GERD)
- `slb-ccbs-henpq.html`: Hen phế quản (Asthma)
- `slb-ccbs-sot-ret.html`: Sốt rét (Malaria)
- `slb-ccbs-st.html`: Suy tim (Heart Failure)
- `slb-ccbs-sxhd.html`: Sốt xuất huyết Dengue (DHF)
- `slb-ccbs-tha.html`: Tăng huyết áp (Hypertension)
- `slb-ccbs-tsg.html`: Tiền sản giật (Preeclampsia)
- `slb-ccbs-vp.html`: Viêm phổi (Pneumonia)
- `slb-ccbs-vtc.html`: Viêm tụy cấp (Acute Pancreatitis)
- `slb-ccbs-xg.html`: Xơ gan (Cirrhosis)

---

## 🧩 3. Khung Template HTML Chuẩn (Boilerplate)

```html
<!DOCTYPE html>
<html lang="vi" data-theme="light">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Sinh lý bệnh và Cơ chế bệnh sinh [Tên Bệnh] ([English Term]): Phân tích chi tiết...">
    <title>Sinh lý bệnh &amp; Cơ chế bệnh sinh [Tên Bệnh] – CliniPortal</title>

    <!-- Google Fonts & FontAwesome -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">

    <!-- CSS Core CliniPortal (Level 4 Paths) -->
    <link rel="stylesheet" href="../../../../css/reset.css">
    <link rel="stylesheet" href="../../../../css/main.css">
    <link rel="stylesheet" href="../../../../css/components/header.css">
    <link rel="stylesheet" href="../../../../css/components/sidebar.css">
    <link rel="stylesheet" href="../../../../css/components/footer.css">

    <!-- CSS Sinh lý học & TOC -->
    <link rel="stylesheet" href="../../../../css/components/module-dashboard.css">
    <link rel="stylesheet" href="../../../../css/components/physio-headings.css">
    <link rel="stylesheet" href="../../../../css/components/physio-content.css">
    <link rel="stylesheet" href="../css/physio-shared.css">
    <link rel="stylesheet" href="../../../../css/components/toc.css">

    <!-- Scripts -->
    <script src="../../../../components/header.js" defer></script>
    <script src="../../../../components/footer.js" defer></script>
    <script src="../../../../js/main.js" defer></script>
    <script src="../js/physio-shared.js" defer></script>
    <script src="../../../../js/toc.js" defer></script>

    <!-- Custom Style dành riêng cho bài (nếu có các thẻ card đặc thù) -->
    <style>
        /* Custom scoped styles */
    </style>
</head>

<body>
    <!-- HEADER PLACEHOLDER -->
    <div id="header-placeholder" data-header-path="../../../../components/header.html"></div>
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <div class="app-container">
        <!-- SIDEBAR -->
        <aside class="app-sidebar" id="appSidebar">
            <button id="sidebar-toggle-arrow" class="sidebar-toggle-arrow" aria-label="Thu gọn/Mở rộng Sidebar">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="toggle-arrow-svg">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <nav class="sidebar-nav" aria-label="Điều hướng chính">
                <ul class="nav-list" role="list">
                    <li><a href="../../../../index.html" class="nav-item" title="Trang chủ"><span class="nav-icon">🏠</span><span class="nav-text">Trang chủ</span></a></li>
                    <li><a href="../sinhly-sinhlybenh.html" class="nav-item active" title="Sinh lý & Sinh lý bệnh"><span class="nav-icon">🧬</span><span class="nav-text">Sinh lý & Sinh lý bệnh</span></a></li>
                    <li><a href="../../skills/ky-nang.html" class="nav-item" title="Kỹ năng"><span class="nav-icon">🩺</span><span class="nav-text">Kỹ năng</span></a></li>
                    <li><a href="../../approaches/tiep-can.html" class="nav-item" title="Tiếp cận"><span class="nav-icon">🤒</span><span class="nav-text">Tiếp cận</span></a></li>
                    <li><a href="../../calculators/cong-cu.html" class="nav-item" title="Công cụ"><span class="nav-icon">⚙️</span><span class="nav-text">Công cụ</span></a></li>
                    <li><a href="../../pharmacology/duoc-ly.html" class="nav-item" title="Dược lý"><span class="nav-icon">💊</span><span class="nav-text">Dược lý</span></a></li>
                    <li><a href="../../ebm/yhcc.html" class="nav-item" title="Y học chứng cứ"><span class="nav-icon">📄</span><span class="nav-text">Y học chứng cứ</span></a></li>
                    <li><a href="../../tcm/y-hoc-co-truyen.html" class="nav-item" title="Y học cổ truyền"><span class="nav-icon">☯️</span><span class="nav-text">Y học cổ truyền</span></a></li>
                </ul>
            </nav>
        </aside>

        <!-- MAIN WRAPPER -->
        <div class="main-wrapper" id="mainContent">
            <!-- BREADCRUMB -->
            <clini-breadcrumb items='[{"label": "🏠 Home", "url": "../../../../index.html"}, {"label": "Sinh lý & sinh lý bệnh", "url": "../sinhly-sinhlybenh.html"}, {"label": "Sinh lý bệnh & Cơ chế bệnh sinh [Tên Bệnh]"}]'></clini-breadcrumb>

            <!-- VÙNG HIỂN THỊ ĐỘNG TRỰC QUAN (toc.js nhận diện class visual-container) -->
            <main class="visual-container">
                <!-- CHAPTER HEADER CARD -->
                <div class="chapter-header">
                    <h1>SINH LÝ BỆNH & CƠ CHẾ BỆNH SINH [TÊN BỆNH]</h1>
                    <p>[Subheading tiếng Anh & Tóm tắt 2-3 dòng về toàn bộ diễn tiến cơ chế phân tử / huyết động / lâm sàng]</p>
                </div>

                <!-- LEAD PARAGRAPH -->
                <p class="physio-lead">
                    <span class="term-hl">[Tên Bệnh] ([English Name])</span> là ...
                </p>

                <!-- CÁC PHẦN NỘI DUNG (H2 có id để toc.js tự sinh TOC) -->
                <div class="physio-content">
                    <h2 id="phan-1-id" class="section-title">
                        <span>Phần I: [Tên Phần I]</span>
                    </h2>
                    <!-- Nội dung Phần I -->
                </div>

                <!-- CÁC PHẦN TIẾP THEO -->
                
                <!-- TÀI LIỆU THAM KHẢO -->
                <div class="ref-section">
                    <h3>📚 Tài liệu Tham khảo Chính</h3>
                    <ul class="ref-list">
                        <li><span>1. Harrison's Principles of Internal Medicine</span> (21st ed.) – Chapter...</li>
                        <li><span>2. Guyton and Hall Textbook of Medical Physiology</span> (14th ed.).</li>
                    </ul>
                </div>
            </main>
        </div>
    </div>
</body>
</html>
```

---

## 🎨 4. Các Thành phần Giao diện & Pattern Trực quan Đặc trưng

### 4.1 Thẻ Tiêu đề Đầu bài (`.chapter-header`)
```html
<div class="chapter-header">
    <h1>SINH LÝ BỆNH & CƠ CHẾ BỆNH SINH SỐC</h1>
    <p>Shock Pathophysiology & Pathogenesis — Phân tích sinh lý cung cấp oxy DO₂, biến đổi huyết động 4 loại sốc, cơ chế vi tuần hoàn, bão cytokine nhiễm khuẩn...</p>
</div>
```

### 4.2 Highlight Từ khóa Chuyên môn
- Từ khóa chính (Tên bệnh, thụ thể, cơ quan): `<span class="term-hl">Bệnh bạch hầu</span>`
- Từ khóa phụ (Enzyme, vi khuẩn, chất trung gian): `<span class="term-hl-secondary">Corynebacterium diphtheriae</span>`

### 4.3 Thẻ Khái niệm Chìa khóa & Dịch chuyển Mô hình (`.key-concept`)
```html
<div class="key-concept">
    🔑 <strong>Dịch chuyển mô hình: Từ X đến Y</strong><br>
    Nội dung mô tả chi tiết sự thay đổi hoặc nguyên lý then chốt...
</div>
```

### 4.4 Thẻ Hướng dẫn & Cảnh báo Lâm sàng
```html
<div class="clinical-pearl">💎 <strong>Pearl lâm sàng:</strong> Nội dung bài học rút ra cho thực hành...</div>
<div class="warning-box">⚠️ <strong>Cảnh báo nguy hiểm:</strong> Biến chứng đe dọa tính mạng...</div>
<div class="info-box">ℹ️ <strong>Thông tin bổ sung:</strong> Chi tiết cơ chế sinh học...</div>
```

### 4.5 Lưới Thẻ Nằm Song Song (`.physio-grid`)
```html
<div class="physio-grid">
    <div class="physio-grid-card">
        <div class="physio-grid-title">🦠 1. Tiêu đề Thẻ 1</div>
        <p>Nội dung chi tiết...</p>
    </div>
    <div class="physio-grid-card">
        <div class="physio-grid-title">⚡ 2. Tiêu đề Thẻ 2</div>
        <p>Nội dung chi tiết...</p>
    </div>
</div>
```

### 4.6 Chuỗi Phản ứng / Diễn tiến Cơ chế (`.pathway-chain`)
```html
<div class="pathway-chain">
    <span class="pathway-node red">Tổn thương ban đầu</span>
    <span class="pathway-arrow">➔</span>
    <span class="pathway-node orange">Tăng tính thấm thành mạch</span>
    <span class="pathway-arrow">➔</span>
    <span class="pathway-node">Phù nề & Trụy mạch</span>
</div>
```

### 4.7 Vòng Luẩn Quẩn Bệnh lý (`.vicious-cycle`)
```html
<div class="vicious-cycle">
    <div class="vicious-cycle-title">🔄 Vòng xoắn bệnh lý: [Tên vòng xoắn]</div>
    <div class="cycle-steps">
        <div class="cycle-step">
            <div class="cycle-step-num">1</div>
            <div class="cycle-step-text">Suy giảm chức năng co bóp tim...</div>
        </div>
        <div class="cycle-step">
            <div class="cycle-step-num">2</div>
            <div class="cycle-step-text">Giảm thể tích nhát bóp (SV) và lưu lượng tim (CO)...</div>
        </div>
    </div>
</div>
```

### 4.8 Hộp Công thức & Phương trình Sinh lý (`.formula-box`)
```html
<div class="formula-box">
    <div class="formula-label">📐 CÔNG THỨC CUNG CẤP OXY TOÀN THÂN (DO₂)</div>
    <div class="formula-main">DO₂ = CO × CaO₂ = CO × [(1.34 × Hb × SaO₂) + (0.0031 × PaO₂)]</div>
    <div class="formula-note">Giá trị bình thường: ~900 - 1100 mL O₂/phút</div>
</div>
```

### 4.9 Bảng So sánh & Huyết động Responsive (`.hemo-table-wrap`)
```html
<div class="hemo-table-wrap">
    <table class="hemo-table">
        <thead>
            <tr>
                <th>Loại sốc</th>
                <th>CVP / PCWP (Tiền tải)</th>
                <th>CO / CI (Cung lượng)</th>
                <th>SVR (Hậu tải)</th>
                <th>ScvO₂</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Sốc giảm thể tích</strong></td>
                <td><span class="val-low">⬇️ Giảm</span></td>
                <td><span class="val-low">⬇️ Giảm</span></td>
                <td><span class="val-high">⬆️ Tăng bù</span></td>
                <td><span class="val-low">⬇️ Giảm</span></td>
            </tr>
        </tbody>
    </table>
</div>
```

### 4.10 Khối Tài liệu Tham khảo (`.ref-section`)
```html
<div class="ref-section">
    <h3>📚 Tài liệu Tham khảo Chính</h3>
    <ul class="ref-list">
        <li><span>1. Harrison's Principles of Internal Medicine</span> (21st ed.) – Relevant Chapter.</li>
        <li><span>2. Guyton and Hall Textbook of Medical Physiology</span> (14th ed.) – Elsevier.</li>
        <li><span>3. Robbins & Cotran Pathologic Basis of Disease</span> (10th ed.) – Elsevier.</li>
    </ul>
</div>
```

### 4.11 Hình ảnh Minh họa Đính kèm & Lightbox (`.physio-figure`)
```html
<!-- Bắt buộc căn giữa hoàn toàn khung hình và ảnh minh họa -->
<figure class="physio-figure" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; margin: 1.75rem auto;">
    <img src="../images/[slug]/[ten-anh].png" 
         alt="Mô tả hình ảnh y khoa" 
         class="physio-img lightbox-trigger"
         style="display: block; margin: 0 auto; max-width: 100%; height: auto; border-radius: 12px; border: 1px solid var(--color-border, #e2e8f0); box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
    <figcaption style="margin-top: 0.75rem; font-size: 0.88rem; color: var(--color-text-muted, #64748b); font-style: italic; text-align: center; max-width: 800px;">
        <strong>Hình X:</strong> Chú thích nội dung hình ảnh y khoa chi tiết.
    </figcaption>
</figure>
```

---

## ⚡ 5. Cơ chế Tự động hóa với `toc.js`

- **TOC Auto-generation**: Chỉ cần đặt thẻ `<main class="visual-container">` kết hợp với các tiêu đề `<h2 id="...">` và `<h3 id="...">`, script `../../../../js/toc.js` sẽ tự động inject mục lục theo dõi trang thông minh ở sidebar bên phải trên desktop và dạng drawer trượt trên mobile.
- **ScrollSpy**: Tự động highlight tiêu đề `<h2>` đang hiển thị trên màn hình khi cuộn.

---

## ✅ 6. Checklist Kiểm định Trước định Commit

- [ ] Đường dẫn CSS & JS chính xác cấp 4 (`../../../../css/...`, `../css/physio-shared.css`, `../../../../js/...`).
- [ ] Thẻ `<html>` có `data-theme="light"`.
- [ ] Sidebar menu Sinh lý & Sinh lý bệnh mang class `active`.
- [ ] Tag `<clini-breadcrumb>` hiển thị đúng chuỗi điều hướng.
- [ ] Thẻ `<main class="visual-container">` được sử dụng đúng vị trí.
- [ ] Tất cả các tiêu đề `<h2 class="section-title">` đều có thuộc tính `id` hợp lệ để `toc.js` hoạt động.
- [ ] Không hardcode màu sắc; sử dụng Design Tokens và các class CSS chung hoặc scoped rgba gradient tương thích Dark mode.
- [ ] Kiểm tra hiển thị responsive trên giao diện Mobile (width ≤ 768px).
