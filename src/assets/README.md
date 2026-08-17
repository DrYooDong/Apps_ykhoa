# 🎨 Tài Nguyên (Assets) - CliniPortal

> **Assets Management Guide**: Hướng dẫn quản lý, tối ưu hóa và tổ chức tài nguyên hình ảnh, biểu tượng vector và phông chữ trong hệ thống **CliniPortal**.

---

## 📁 1. Cấu Trúc Thư Mục `src/assets/`

```text
src/assets/
├── icons/                     # Biểu tượng vector SVG y tế chuyên dụng
├── images/                    # Hình ảnh y khoa minh họa cơ chế bệnh sinh, giải phẫu
│   ├── biochemistry/          # Sơ đồ chuyển hóa, cấu trúc phân tử hóa sinh
│   ├── ebm/                   # Đồ thị Forest Plot, biểu đồ RCT, logo hội đoàn y học
│   └── pathophysiology/       # Sơ đồ chu chuyển tim, điện thế màng, mô bệnh học
└── fonts/                     # Các bộ phông chữ web offline hỗ trợ tiếng Việt
```

---

## 📐 2. Quy Chuẩn Tối Ưu Hóa & Đồ Họa

### 2.1 Biểu Tượng Vector SVG (`icons/`)
- **Định dạng**: Pure SVG (Scalable Vector Graphics), không nhúng mã JavaScript độc hại.
- **Kích thước**: Thiết kế trên khung chuẩn viewBox `0 0 24 24` hoặc `0 0 32 32`.
- **Màu sắc**: Sử dụng `currentColor` cho các thuộc tính `fill` hoặc `stroke` để kế thừa biến màu CSS của hệ thống (`var(--color-primary)`, `var(--color-text)`...).
- **Khả năng tiếp cận**: Luôn có thuộc tính `aria-hidden="true"` nếu là icon trang trí, hoặc thẻ `<title>` nếu mang ý nghĩa nội dung.

### 2.2 Hình Ảnh Y Khoa (`images/`)
- **Định dạng ưu tiên**: WebP hoặc SVG cho biểu đồ/sơ đồ luồng; PNG cho ảnh chụp tiêu bản y khoa có nền trong suốt.
- **Tối ưu dung lượng**: Nén dung lượng tệp $\le 300\text{ KB}$ cho mỗi ảnh lớn, đảm bảo tốc độ tải tức thì trên mạng di động bệnh viện.
- **Cơ chế tải lười (Lazy Loading)**: Luôn thêm thuộc tính `loading="lazy"` và xử lý fallback `onerror` hiển thị khung thông báo khi mở ngoại tuyến.

### 2.3 Phông Chữ Offline (`fonts/`)
- **Hỗ trợ đầy đủ**: Bảng mã Tiếng Việt Unicode với các họ phông chuẩn y khoa:
  - `Plus Jakarta Sans`: Tiêu đề và giao diện thẻ UI.
  - `Inter`: Văn bản nội dung bài đọc và số liệu cận lâm sàng.
  - `JetBrains Mono` / `Fira Code`: Dữ liệu công thức toán-y học, mã nguồn JSON và chỉ số định lượng.

---

## 🔗 3. Quy Tắc Đường Dẫn Tương Đối Tới Assets

Khi gọi tài nguyên assets từ các tầng mã nguồn, tuân thủ bảng ánh xạ đường dẫn tương đối:

| Vị trí gọi tệp | Đường dẫn tới `src/assets/` | Ví dụ tham chiếu |
|---|---|---|
| Từ `src/index.ts` / `src/core/` | `./assets/` | `./assets/icons/heart-pulse.svg` |
| Từ `src/content/ebm/guidelines/` | `../assets/` | `../assets/images/ebm/forest-plot-sample.svg` |
| Từ `src/content/ebm/guidelines/kho-guidelines/` | `../../assets/` | `../../assets/images/ebm/2026-ssc-sepsis-flow.png` |
| Từ Root `index.html` | `./src/assets/` | `./src/assets/icons/app-logo.svg` |
| Từ CSS Stylesheets (`src/styles/`) | `../assets/` | `url('../assets/fonts/Inter-Variable.woff2')` |
