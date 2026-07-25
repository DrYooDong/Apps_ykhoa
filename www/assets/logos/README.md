# CliniPortal Logo Repository

Bộ nhận diện thương hiệu toàn diện cho hệ sinh thái CliniPortal.

## 📁 Cấu trúc thư mục

```
logos/
├── main/                 # Logo chính
│   ├── cliniportal-full.svg
│   ├── cliniportal-icon.svg
│   ├── cliniportal-text.svg
│   ├── cliniportal-full-dark.svg
│   └── cliniportal-icon-dark.svg
├── modules/              # Logo 6 module
│   ├── tools-logo.svg
│   ├── pharmacology-logo.svg
│   ├── skills-logo.svg
│   ├── approach-logo.svg
│   ├── physiology-logo.svg
│   └── ebm-logo.svg
├── favicons/             # Favicon đa kích thước
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-180x180.png
│   └── safari-pinned-tab.svg
├── app-icons/            # App icons cho PWA
│   ├── icon-192x192.png
│   ├── icon-512x512.png
│   └── maskable-icon.png
└── LOGO_USAGE.md         # Hướng dẫn sử dụng
```

## 🎨 Đặc điểm

### Hỗ trợ Dark/Light Mode
Tất cả logo SVG sử dụng CSS variables để tự động chuyển đổi:
```css
:root {
  --logo-primary: #0ea5e9;
  --logo-secondary: #0f172a;
}

.dark {
  --logo-primary: #38bdf8;
  --logo-secondary: #f8fafc;
}
```

### Định dạng
- **SVG**: Cho web, scalable, hỗ trợ theme switching
- **PNG**: Cho các trường hợp cần raster, có background trong suốt
- **ICO**: Favicon truyền thống

### Module Logos
Mỗi module có logo riêng với màu sắc đặc trưng:
- **Tools**: Xanh dương (#0ea5e9)
- **Pharmacology**: Tím (#8b5cf6)
- **Skills**: Xanh lá (#10b981)
- **Approach**: Cam (#f97316)
- **Physiology**: Đỏ hồng (#ef4444)
- **EBM**: Xanh ngọc (#14b8a6)

## 🚀 Sử dụng

### HTML (SVG Inline)
```html
<!-- Tự động đổi màu theo theme -->
<object data="/assets/logos/main/cliniportal-full.svg" type="image/svg+xml"></object>

<!-- Hoặc inline trực tiếp -->
<svg class="logo">...</svg>
```

### CSS Background
```css
.hero {
  background-image: url('/assets/logos/main/cliniportal-icon.svg');
}
```

### Favicon
```html
<link rel="icon" type="image/svg+xml" href="/assets/logos/favicons/favicon-32x32.png">
<link rel="apple-touch-icon" href="/assets/logos/app-icons/icon-180x180.png">
```

## 📋 Quy định sử dụng

Xem chi tiết trong `LOGO_USAGE.md`:
- Khoảng cách an toàn (clear space)
- Kích thước tối thiểu
- Trường hợp không được sử dụng
- Màu sắc thay thế

## 🔄 Cập nhật

- v1.0: Bộ logo cơ bản cho 6 module
- v1.1: Thêm biến thể Dark Mode
- v1.2: Bổ sung App Icons cho PWA

---

**CliniPortal** - Empowering Clinical Excellence Through Technology
