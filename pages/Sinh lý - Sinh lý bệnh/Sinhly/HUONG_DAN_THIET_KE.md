# Quy chuẩn Thiết kế & Biên soạn Bài viết Sinh lý học (CliniPortal)

Tài liệu này hướng dẫn chi tiết cách tạo và cấu trúc các tệp HTML bài viết sinh lý học tiếp theo trong thư mục `pages/Sinh lý - Sinh lý bệnh/Sinhly/` nhằm đảm bảo tính đồng bộ về thẩm mỹ, hiệu năng hoạt động offline (`file:///`) và tính chính xác của các tương tác động (như mục lục TOC tự động).

---

## 📁 1. Quy tắc Đường dẫn Tương đối (Relative Paths)
Do các bài viết nằm ở cấp thư mục thứ 4 (`pages/Sinh lý - Sinh lý bệnh/Sinhly/PhanX/`), toàn bộ tài nguyên dùng chung phải được liên kết bằng đường dẫn tương đối chính xác:
- **Tài nguyên hệ thống:** `../../../../` (Ví dụ: `../../../../css/main.css`, `../../../../components/header.js`, `../../../../js/toc.js`).
- **Tài nguyên riêng của Phân hệ Sinh lý:** `../../` (Ví dụ: `../../css/physio-shared.css`, `../../js/physio-shared.js`).
- **Thư mục ảnh minh họa:** `../../images/PhanX/` (Ví dụ: `../../images/Phan4/CoHohap_Hinh1.png`).

---

## 📐 2. Bố cục HTML Chuẩn (Dynamic Layout Boilerplate)

Các bài viết sinh lý mới **không sử dụng** hệ thống chia cột thủ công trong HTML. Thay vào đó, hãy sử dụng thẻ `<main class="visual-container">` để kịch bản `toc.js` tự động tái cấu trúc DOM và chèn thanh mục lục (TOC) động khi tải trang.

Dưới đây là mẫu khung HTML chuẩn để copy-paste khi tạo bài mới:

```html
<!DOCTYPE html>
<html lang="vi" data-theme="light">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[Mô tả y khoa ngắn gọn của bài viết]">
  <title>[Tên Bài học] – CliniPortal</title>
  
  <!-- Google Fonts & FontAwesome -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">

  <!-- CSS Core CliniPortal -->
  <link rel="stylesheet" href="../../../../css/reset.css">
  <link rel="stylesheet" href="../../../../css/main.css">
  <link rel="stylesheet" href="../../../../css/components/header.css">
  <link rel="stylesheet" href="../../../../css/components/sidebar.css">
  <link rel="stylesheet" href="../../../../css/components/footer.css">
  
  <!-- CSS chuyên biệt Sinh lý & TOC -->
  <link rel="stylesheet" href="../../../../css/components/physio-patho.css">
  <link rel="stylesheet" href="../../../../css/components/physio-headings.css">
  <link rel="stylesheet" href="../../../../css/components/physio-content.css">
  <link rel="stylesheet" href="../../css/physio-shared.css">
  <link rel="stylesheet" href="../../../../css/components/toc.css">

  <!-- Scripts điều hướng & xử lý tương tác động -->
  <script src="../../../../js/toc.js" defer></script>
  <script src="../../../../components/header.js"></script>
  <script src="../../../../components/footer.js"></script>
  <script src="../../js/physio-shared.js" defer></script>
  <script src="../../../../js/main.js" defer></script>
</head>

<body>
  <!-- Nạp Header động -->
  <div id="header-placeholder" data-header-path="../../../../components/header.html"></div>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>

  <div class="app-container">
    <!-- SIDEBAR HỆ THỐNG -->
    <aside class="app-sidebar" id="appSidebar">
      <button id="sidebar-toggle-arrow" class="sidebar-toggle-arrow" aria-label="Thu gọn/Mở rộng Sidebar">
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="toggle-arrow-svg">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <nav class="sidebar-nav" aria-label="Điều hướng chính">
        <ul class="nav-list" role="list">
          <li>
            <a href="../../../../index.html" class="nav-item" title="Trang chủ">
              <span class="nav-icon">🏠</span>
              <span class="nav-text">Trang chủ</span>
            </a>
          </li>
          <li>
            <a href="../../Sinhly-sinhlybenh.html" class="nav-item active" title="Sinh lý & Sinh lý bệnh">
              <span class="nav-icon">🧬</span>
              <span class="nav-text">Sinh lý</span>
            </a>
          </li>
          <!-- Thêm các phân hệ khác tương tự nếu cần -->
        </ul>
      </nav>
    </aside>

    <!-- KHUNG CHỨA NỘI DUNG CHÍNH -->
    <div class="main-wrapper" id="mainContent">
      <!-- BREADCRUMB -->
      <nav aria-label="Breadcrumb" class="breadcrumb-container" style="padding: 1rem 2rem; border-bottom: 1px solid var(--color-divider);">
        <ol class="breadcrumb-list" style="display:flex; gap:0.5rem; list-style:none; font-size:0.9rem; margin:0; padding:0;">
          <li><a href="../../../../index.html">🏠 Home</a> &gt;</li>
          <li><a href="../../Sinhly-sinhlybenh.html">Sinh lý &amp; sinh lý bệnh</a> &gt;</li>
          <li style="color:var(--color-primary); font-weight:600;">Chương [X]: [Tên chương] - [Tên bài]</li>
        </ol>
      </nav>

      <!-- VÙNG HIỂN THỊ ĐỘNG TRỰC QUAN -->
      <main class="visual-container">
        <!-- Chapter Header -->
        <div class="chapter-header">
          <h1>[Tiêu Đề Bài Viết]</h1>
          <p>[Mô tả ngắn gọn cốt lõi nội dung bài học trong 1 - 2 dòng]</p>
        </div>

        <!-- Phần I -->
        <div class="physio-content">
          <h2 class="section-title">
            <span>Phần I: [Tên Phần]</span>
          </h2>

          <div class="physio-text-block">
            <p class="physio-lead">
              [Đoạn dẫn nhập bôi đậm làm nổi bật cơ chế quan trọng nhất của phần này]
            </p>
            
            <p>Nội dung bài viết thông thường sử dụng các từ khóa chuyên biệt được highlight bằng thẻ span:</p>
            <ul>
              <li>Dùng <span class="term-hl">term-hl</span> cho các thuật ngữ sinh lý chính.</li>
              <li>Dùng <span class="term-hl-secondary">term-hl-secondary</span> cho các chất hóa học, ion hoặc chỉ số phụ.</li>
            </ul>
          </div>
        </div>

        <hr class="section-divider">

        <!-- Phần II (Ví dụ chứa Sơ đồ & Giao diện nâng cao) -->
        <div class="physio-content">
          <h2 class="section-title">
            <span>Phần II: Các thành phần giao diện mẫu</span>
          </h2>

          <div class="physio-text-block">
            <!-- 1. Danh sách có mũi tên -->
            <ul class="physio-list-arrow">
              <li><strong>Ý thứ nhất:</strong> Chi tiết nội dung...</li>
              <li><strong>Ý thứ hai:</strong> Chi tiết nội dung...</li>
            </ul>

            <!-- 2. Khối ghi chú/Cơ chế bệnh học -->
            <div class="clinical-note-box" style="background: var(--color-warning-hl); border-left: 4px solid var(--color-warning); margin-top: 1.5rem;">
              <div class="clinical-note-title" style="font-weight: 700; color: var(--color-warning); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; font-size: var(--text-sm);">
                🧠 CƠ CHẾ SINH LÝ BỆNH: [TÊN CƠ CHẾ]
              </div>
              <p style="font-size: var(--text-xs); line-height: 1.6; margin: 0; color: var(--color-text-muted);">
                Giải thích cơ chế bệnh học liên quan sâu sắc đến sinh lý học bình thường ở trên.
              </p>
            </div>
          </div>

          <!-- 3. Hộp chứa hình ảnh minh họa (Image Placeholder Card) -->
          <div class="image-placeholder-card">
            <div class="image-title">
              <span>🖼️</span> Hình 1: [Tiêu đề hình ảnh] (Nguồn sách tham khảo chuẩn)
            </div>
            <div class="image-drop-area">
              <div class="image-drop-text">
                <img src="../../images/Phan[X]/[Ten_File].png" alt="[Mô tả ảnh]"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <!-- Fallback hiển thị hộp nét đứt khi chưa có file ảnh vật lý trên đĩa -->
                <div class="fallback-placeholder" style="display: none; padding: 2rem;">
                  <i class="fa-regular fa-image" style="font-size: 3rem; color: var(--color-primary); opacity: 0.6; margin-bottom: 0.5rem;"></i>
                  <p style="margin: 0; font-size: var(--text-xs); color: var(--color-text-muted);">Hình ảnh minh họa đang được cập nhật</p>
                </div>
              </div>
            </div>
            <div class="image-description">
              <strong>Mô tả:</strong> Diễn giải các biểu đồ, mũi tên, hoặc thông số trên ảnh để người học dễ dàng nắm bắt thông tin.
            </div>
          </div>
        </div>

        <hr class="section-divider">

        <!-- Phần cuối: Tài liệu tham khảo -->
        <div class="physio-content">
          <h2 class="section-title">
            <span>Tài liệu tham khảo</span>
          </h2>

          <div class="physio-text-block">
            <ol style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.6; margin-left: 1.5rem;">
              <li>Tên tác giả. <em>Tên tài liệu / Sách tham khảo</em>. Phiên bản. Nhà xuất bản; Năm xuất bản.</li>
            </ol>
          </div>
        </div>

      </main>
    </div>
  </div>

  <!-- Nạp Footer động -->
  <div id="footer-placeholder" data-footer-path="../../../../components/footer.html"></div>

  <!-- Script điều khiển chung -->
  <script src="../../../../js/sidebar.js"></script>
</body>

</html>
```

---

## 🎨 3. Quy chuẩn Thiết kế UI Elements Chuyên biệt

### A. Tiêu đề chính (`h2.section-title`)
Tất cả các phần lớn phải sử dụng cặp thẻ sau để hiển thị đường kẻ ngang màu xanh ngọc y tế (Medical Teal Line) chuẩn của CliniPortal:
```html
<h2 class="section-title">
  <span>Phần I: Tên tiêu đề lớn</span>
</h2>
```

### B. Hộp ghi chú / Sinh lý bệnh lâm sàng (`.clinical-note-box`)
Dùng để phân tích ứng dụng lâm sàng hoặc cơ chế bệnh. Thiết lập inline style linh hoạt để tùy biến màu sắc cảnh báo:
- **Cơ chế Sinh lý bệnh / Chú ý:** Dùng tông màu vàng ấm:
  `background: var(--color-warning-hl); border-left: 4px solid var(--color-warning);`
- **Lưu ý lâm sàng khẩn cấp / Độc tính:** Dùng tông màu đỏ hồng:
  `background: var(--color-rose-hl); border-left: 4px solid var(--color-rose);`
- **Thông tin bổ trợ hữu ích:** Dùng tông màu xanh ngọc:
  `background: var(--color-primary-hl); border-left: 4px solid var(--color-primary);`

### C. Lưới thẻ so sánh song song (`.physio-grid`)
Để hiển thị hai cơ chế đối lập nhau (như Hít vào vs. Thở ra, Giảm suất đàn vs. Tăng suất đàn), hãy sử dụng cấu trúc lưới responsive sau:
```html
<div class="physio-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 1.5rem 0;">
  <!-- Thẻ thứ nhất -->
  <div class="physio-grid-card" style="background: var(--color-surface); border: 1px solid var(--color-border); padding: 1.25rem; border-radius: var(--radius-lg); border-left: 4px solid [Mã biến màu];">
    <div class="physio-grid-title" style="font-weight: 700; color: [Mã biến màu]; font-size: var(--text-sm); margin-bottom: 0.5rem;">
      [Tiêu đề nhỏ]
    </div>
    <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin: 0; line-height: 1.5;">
      [Nội dung mô tả chi tiết]
    </p>
  </div>
  ...
</div>
```

---

## 🛠️ 4. Tích hợp Lightbox Phóng to ảnh
Mọi hình ảnh đặt trong `.image-drop-area img` sẽ tự động kế thừa tính năng phóng to (lightbox zoom) cao cấp từ kịch bản `physio-shared.js`.
- Không cần viết thêm bất kỳ kịch bản phóng to nào khác ở file con.
- Khi người dùng click vào ảnh phế nang/chu kỳ hô hấp, một màn đêm mờ (lightbox overlay) sẽ hiện lên kèm theo tiêu đề hình lấy từ `.image-title` và phần mô tả lấy từ `.image-description`.
