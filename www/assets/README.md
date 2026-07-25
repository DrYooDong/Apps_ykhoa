# Thư mục Tài nguyên Tĩnh (Assets) - CliniPortal

Thư mục này chứa toàn bộ các tài nguyên tĩnh phục vụ cho giao diện trực quan và trải nghiệm người dùng của hệ sinh thái CliniPortal. Các tài nguyên được phân loại khoa học vào các thư mục chuyên biệt.

---

## 📁 Cấu trúc Thư mục Tài nguyên

```
assets/
├── fonts/                 # Bộ phông chữ Inter cục bộ phục vụ chạy ngoại tuyến
├── images/                # Các sơ đồ và hình vẽ minh họa y khoa gốc (SVG, PNG)
├── logos/                 # Biểu trưng, thương hiệu, favicons và app icons
├── icons/                 # Hơn 50+ biểu tượng SVG chuyên khoa y học
├── lottie/                # Kho hoạt ảnh y khoa động định dạng JSON
├── buttons/               # Thư viện hiệu ứng CSS động cho nút bấm
├── geometry/              # Hoa văn và hình khối hình học trang trí
├── backgrounds/           # Dải màu gradients và hình nền Glassmorphism
├── charts/                # Thư viện và mẫu vẽ đồ thị y học thuần JS
├── demo-assets.html       # Trang cổng thư viện hiển thị và thử nghiệm assets
└── README.md              # Tài liệu hướng dẫn này
```

### 1. 🎨 Biểu trưng & Thương hiệu (`/logos`)
*   **Logo chính (`/main`)**: Chứa các biến thể logo của CliniPortal dạng đầy đủ (`cliniportal-full.svg`), dạng biểu tượng (`cliniportal-icon.svg`), và dạng văn bản chữ (`cliniportal-text.svg`) hỗ trợ cả giao diện sáng (Light) và tối (Dark).
*   **Biểu tượng Phân hệ (`/modules`)**: Bộ logo màu sắc đặc trưng cho 6 phân hệ lớn:
    *   **Công cụ**: `tools-logo.svg` (Xanh dương)
    *   **Dược lý**: `pharmacology-logo.svg` (Tím)
    *   **Kỹ năng**: `skills-logo.svg` (Xanh lá)
    *   **Tiếp cận**: `approach-logo.svg` (Cam)
    *   **Sinh lý**: `physiology-logo.svg` (Đỏ hồng)
    *   **EBM**: `ebm-logo.svg` (Xanh ngọc)
*   **Favicons & PWA Icons (`/favicons` & `/app-icons`)**: Bộ icons đa kích thước phục vụ hiển thị trên trình duyệt và cấu hình ứng dụng di động PWA. 
    *   *Lưu ý:* Tất cả các file PNG này đã được tối ưu kết xuất chất lượng cao trực tiếp từ file vector SVG gốc.

### 2. 🔹 Bộ Biểu tượng (`/icons`)
*   Chứa hơn 50+ biểu tượng SVG chuyên khoa y học (như tim mạch, nội tiết, tiêu hóa, thận, nhiễm khuẩn, v.v.).
*   Được thiết kế nguyên bản bằng mã SVG thủ công siêu nhẹ, cho phép thay đổi màu sắc động theo Dark Mode thông qua CSS variables.

### 3. 🎬 Hoạt ảnh Lottie (`/lottie`)
*   Hơn 65+ hoạt ảnh y khoa định dạng JSON nhẹ.
*   Ứng dụng trong việc minh họa các trạng thái tải trang (loading), màn hình trống (empty state), phản hồi thành công/thất bại, và hình ảnh mô phỏng động cho các bài viết chuyên sâu.
*   Hỗ trợ đầy đủ biến thể màu sắc sáng/tối riêng biệt trong thư mục `/light` và `/dark`.

### 4. 🔘 Hiệu ứng Nút bấm (`/buttons`)
*   Thư viện hiệu ứng CSS động cho nút bấm (`button-effects.css`).
*   Bao gồm các hiệu ứng hover hiện đại: Slide, Glow, Pulse, Ripple, 3D Push, và Medical Pulse (nhịp đập y tế).
*   *Trang demo:* `demo-buttons.html` để xem trước các hiệu ứng tương tác.

### 5. 🔷 Hình học & Hoa văn (`/geometry`)
*   Chứa các hoa văn cấu trúc nền như chuỗi xoắn kép DNA, lưới tế bào, hoa văn giải phẫu và các khối isometric 3D trang trí.
*   Sử dụng CSS variables để đổi màu nền hòa hợp với màu chủ đạo của từng trang.

### 6. 🌊 Hiệu ứng Hình nền (`/backgrounds`)
*   Chứa các dải màu gradient y tế, hiệu ứng Glassmorphism (kính mờ), mesh gradient và các hoạt ảnh chuyển động nền nhẹ nhàng ở tiêu đề.

### 7. 📊 Thư viện Đồ thị (`/charts`)
*   Thư viện vẽ biểu đồ y khoa viết bằng JavaScript thuần (`pure-charts.js`) không phụ thuộc vào bất kỳ thư viện bên ngoài nào.
*   Hỗ trợ biểu đồ Đường (Line), Cột (Bar), Đồng hồ đo (Gauge), Radar, giúp trực quan hóa sinh hiệu, kết quả lab, và động học nồng độ thuốc.

### 8. 📷 Hình ảnh & Sơ đồ Y khoa (`/images`)
*   Chứa các hình ảnh, sơ đồ giải phẫu học, và lưu đồ tĩnh hỗ trợ trực quan hóa các bài viết lý thuyết sinh lý/lâm sàng (ví dụ: `co2_transport_blood.png`, `body_fluid_compartments.svg`, `blood_components.svg`).

### 9. 🔤 Phông chữ Hệ thống (`/fonts`)
*   Chứa bộ phông chữ Inter (Variable Font) phục vụ hiển thị ngoại tuyến trong môi trường PWA hoặc khi mất kết nối mạng.

---

## 🚀 Nguyên tắc Tích hợp & Tối ưu

1.  **Chuyển đổi Theme tự động**: Hầu hết các file SVG và CSS trong thư mục này đều liên kết với hệ thống Design Tokens của CliniPortal để tự động cập nhật màu sắc khi người dùng bật/tắt Dark Mode.
2.  **Hiệu năng cao**: Các hình ảnh SVG đều được tối ưu hóa dung lượng (minified) và viết inline để giảm thiểu số lượng HTTP request.
3.  **Tải Font cục bộ**: Thư mục `/fonts` chứa font chữ Inter dự phòng cho trường hợp chạy ngoại tuyến (Offline PWA). Trong điều kiện có kết nối Internet, ứng dụng sẽ ưu tiên tải font qua Google Fonts CDN để tối ưu hóa tốc độ tải trang đầu tiên.
