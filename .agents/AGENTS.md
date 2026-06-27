# Hướng dẫn Phát triển Dự án CliniPortal (Workspace Rules)

Tài liệu này chứa các quy tắc phát triển cốt lõi cho **CliniPortal** (Hệ sinh thái công cụ lâm sàng y khoa). Mọi tác nhân AI (Agent) hoạt động trong dự án này phải tuân thủ nghiêm ngặt các hướng dẫn dưới đây để đảm bảo tính đồng bộ, sạch sẽ của mã nguồn và tính chính xác của giao diện người dùng.

---

## 📁 1. Cấu trúc Thư mục Dự án

```
Workspace/
├── .agents/               # Chứa quy chuẩn cấu hình Agent (AGENTS.md, skills/)
├── assets/                # Chứa hình ảnh, tài liệu tĩnh
├── components/            # Thành phần giao diện động nhúng dùng chung
│   ├── header.html        # Khung điều hướng đầu trang
│   ├── header.js          # Logic nạp header & đồng bộ menu active
│   ├── footer.html        # Khung chân trang
│   └── footer.js          # Logic nạp footer
├── css/                   # Thư mục chứa mã stylesheet
│   ├── components/        # CSS riêng cho từng thành phần (header, sidebar, flowchart,...)
│   ├── main.css           # Design Tokens cốt lõi, Dark Mode & Utilities
│   └── reset.css          # Reset mặc định của các trình duyệt
├── js/                    # Các file kịch bản điều khiển chung
│   ├── main.js            # Điều khiển chuyển đổi theme (Light/Dark)
│   ├── sidebar.js         # Logic thu gọn/mở rộng sidebar & lưu cookie
│   └── flowchart.js       # Xử lý tương tác lưu đồ y khoa
├── pages/                 # 6 phân hệ y khoa cốt lõi chứa các trang nội dung
│   ├── Công cụ/           # Calculators tính toán chỉ số y học
│   ├── Dược lý/           # Tra cứu thuốc, dược động học, kháng sinh
│   ├── Kỹ năng lâm sàng/  # Bảng kiểm OSCE & khám bedside
│   ├── Sinh lý - Sinh lý bệnh/ # Cơ chế sinh lý học trực quan
│   ├── Tiếp cận/          # Thuật toán và lưu đồ chẩn đoán/xử trí
│   └── Y học chứng cứ/    # EBM Tools và tài liệu y học thực chứng
└── templates/             # Thư mục tài liệu HTML mẫu chuẩn hóa
```

---

## 🎨 2. Quy chuẩn Thiết kế & CSS

1. **Vanilla CSS & JS**:
   - Sử dụng HTML5, CSS3 và Vanilla JS (ES6+) thuần.
   - **Tuyệt đối KHÔNG sử dụng TailwindCSS**, Bootstrap hoặc bất kỳ thư viện CSS/JS cồng kềnh nào (như jQuery), để đảm bảo tốc độ tải trang cao nhất trên di động và khả năng tương thích khi mở file offline (`file:///...`).
   - Có thể sử dụng FontAwesome thông qua liên kết CDN trong thẻ `<head>` đối với các biểu tượng đặc thù.

2. **Kế thừa từ Design Tokens (`css/main.css`)**:
   - Mọi thuộc tính màu sắc, font chữ, đổ bóng, bo góc phải sử dụng biến CSS từ `main.css`. Không viết cứng mã màu `#` hoặc `rgb`.
   - *Ví dụ đúng*: `background-color: var(--color-surface); color: var(--color-text); transition: var(--tr);`
   - *Ví dụ sai*: `background-color: #ffffff; color: #0f172a;`

3. **Hỗ trợ Dark Mode**:
   - Hệ thống chuyển đổi theme sử dụng thuộc tính `data-theme` trên thẻ `<html>` (`data-theme="light"` hoặc `data-theme="dark"`).
   - Hãy chắc chắn rằng bạn kiểm tra các phần tử giao diện hiển thị đúng trên cả 2 chế độ sáng và tối.

4. **Responsive-First**:
   - Mặc định viết CSS tương thích với màn hình di động (mobile-first), sau đó sử dụng `@media (min-width: 768px)` và `@media (min-width: 1024px)` để định hình bố cục cho máy tính bảng và màn hình máy tính lớn.

---

## 🧱 3. Hệ thống Nhúng Layout Động (Dynamic Layout)

CliniPortal nhúng Header và Footer vào các trang nội dung bằng Javascript để tránh lặp mã. Khi tạo hoặc sửa trang HTML trong thư mục `pages/`, phải tuân thủ cấu trúc sau:

### Cú pháp Nhúng Header & Footer
```html
<!-- Nạp Header -->
<div id="header-placeholder" data-header-path="[relative_path]/components/header.html"></div>
<div class="sidebar-overlay" id="sidebarOverlay"></div>

<!-- Nạp Footer -->
<div id="footer-placeholder" data-footer-path="[relative_path]/components/footer.html"></div>
```
*Script `header.js` và `footer.js` sẽ tự động tải file HTML tương ứng và thay thế vào thẻ placeholder.*

### Bố cục HTML chuẩn của một Trang
```html
<!DOCTYPE html>
<html lang="vi" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="[Mô tả y khoa ngắn gọn của trang]">
    <title>[Tiêu đề trang] – CliniPortal</title>

    <!-- Google Fonts & FontAwesome CDN -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">

    <!-- CSS Core CliniPortal -->
    <link rel="stylesheet" href="[relative_path]/css/reset.css">
    <link rel="stylesheet" href="[relative_path]/css/main.css">
    <link rel="stylesheet" href="[relative_path]/css/components/header.css">
    <link rel="stylesheet" href="[relative_path]/css/components/sidebar.css">
    <link rel="stylesheet" href="[relative_path]/css/components/footer.css">

    <!-- JS Core -->
    <script src="[relative_path]/js/main.js" defer></script>
    <script src="[relative_path]/components/header.js" defer></script>
    <script src="[relative_path]/components/footer.js" defer></script>
</head>
<body>
    <div id="header-placeholder" data-header-path="[relative_path]/components/header.html"></div>
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <div class="app-container">
        <!-- SIDEBAR -->
        <aside class="app-sidebar" id="appSidebar">
            <button id="sidebar-toggle-arrow" class="sidebar-toggle-arrow" aria-label="Thu gọn/Mở rộng Sidebar">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="toggle-arrow-svg">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <nav class="sidebar-nav" aria-label="Điều hướng">
                <!-- Nội dung danh sách điều hướng riêng của phân hệ (xem mẫu) -->
            </nav>
        </aside>

        <!-- MAIN WRAPPER -->
        <main class="main-wrapper">
            <!-- BREADCRUMB -->
            <nav aria-label="Breadcrumb" class="breadcrumb-container">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item"><a href="[relative_path]/index.html" class="breadcrumb-link">Home</a></li>
                    <li class="breadcrumb-item"><a href="[relative_path]/pages/[Phân hệ]/[trang_chu_phan_he].html" class="breadcrumb-link">[Tên Phân hệ]</a></li>
                    <li class="breadcrumb-item active" aria-current="page">[Tiêu đề Trang]</li>
                </ol>
            </nav>
            
            <!-- NỘI DUNG CHÍNH CỦA BÀI VIẾT TẠI ĐÂY -->
        </main>
    </div>

    <div id="footer-placeholder" data-footer-path="[relative_path]/components/footer.html"></div>

    <!-- Script Sidebar -->
    <script src="[relative_path]/js/sidebar.js"></script>
</body>
</html>
```

---

## 📌 4. Quy tắc Tính toán Đường dẫn Tương đối (`[relative_path]`)

Vì dự án chạy được trên giao thức tập tin tĩnh (`file:///`), toàn bộ đường dẫn liên kết tĩnh đến các file CSS, JS, hình ảnh, trang liên kết khác phải sử dụng **đường dẫn tương đối** chính xác. Tuyệt đối không dùng đường dẫn tuyệt đối bắt đầu bằng `/`.

**Cách tính toán `[relative_path]`:**
- Phân tích độ sâu thư mục của tệp HTML hiện tại so với thư mục gốc dự án:
  - Nếu tệp nằm ở gốc (ví dụ: `index.html`): `[relative_path]` là rỗng (ví dụ: `css/main.css`).
  - Nếu tệp nằm ở cấp 2 (ví dụ: `pages/Tiếp cận/tiep-can.html`): `[relative_path]` là `../../` (ví dụ: `../../css/main.css`).
  - Nếu tệp nằm ở cấp 3 (ví dụ: `pages/Kỹ năng lâm sàng/Khám tim mạch/KN_Khamtim.html`): `[relative_path]` là `../../../` (ví dụ: `../../../css/main.css`).
- Hãy luôn tính toán cẩn thận để tránh lỗi hỏng định dạng trang khi người dùng chạy offline.

---

## 🗂️ 5. Thư viện Templates (`templates/`)

Trước khi tạo mới một trang bất kỳ, hãy kiểm tra thư mục `templates/` ở gốc dự án để tham khảo cấu trúc chuẩn đã được tối ưu hóa:

1. **`templates/flowchart-template.html`**: Dành cho các trang thuật toán chẩn đoán và điều trị (Lưu đồ tương tác, nhấp mở rộng chi tiết các Node y khoa).
2. **`templates/calculator-template.html`**: Dành cho các trang công cụ tính điểm số lâm sàng (Form nhập dữ liệu, phân tầng nguy cơ, script xử lý tính toán tự động).
3. **`templates/clinical-skill-template.html`**: Dành cho các quy trình kỹ năng lâm sàng OSCE/Bedside (giao diện phân chia theo tab Chuẩn bị, Tiến hành, Theo dõi, Tai biến).
4. **`templates/physiology-template.html`**: Dành cho các trang học tập Sinh lý - Sinh lý bệnh (có chuỗi timeline diễn tiến, lưới so sánh song song, highlight từ khóa, và cột mục lục TOC động).
