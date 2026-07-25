# CliniPortal Button Effects Library

Thư viện 20+ hiệu ứng nút bấm CSS chuyên nghiệp, tối ưu cho giao diện y khoa hiện đại.

## 📁 Cấu trúc

```
buttons/
├── button-effects.css    # Thư viện CSS chính (20+ effects)
├── demo-buttons.html     # Trang demo trực quan
└── README.md             # Hướng dẫn sử dụng
```

## ✨ Danh sách Hiệu ứng

### Hiệu ứng Cơ bản
1. **Slide Left** - Hiệu ứng trượt sáng từ trái sang phải
2. **Slide Right** - Hiệu ứng trượt sáng từ phải sang trái
3. **Glow** - Phát sáng xung quanh nút
4. **Pulse** - Nhịp đập nhẹ liên tục
5. **Ripple** - Gợn sóng lan tỏa khi hover
6. **3D Push** - Hiệu ứng nổi 3D khi nhấn

### Hiệu ứng Nâng cao
7. **Fill Up** - Lấp đầy màu từ dưới lên
8. **Border Expand** - Viền mở rộng thành nền
9. **Shine** - Tia sáng chạy ngang qua nút
10. **Scale Up** - Phóng to kèm bóng đổ
11. **Rotate Icon** - Xoay icon khi hover
12. **Underline Slide** - Gạch chân trượt ra giữa

### Hiệu ứng Đặc biệt
13. **Neon** - Đèn neon phát sáng
14. **Bounce** - Nảy lên khi hover
15. **Skew** - Nghiêng và phóng to
16. **Gradient Shift** - Chuyển động gradient
17. **Arrow Slide** - Mũi tên trượt sang phải
18. **Blur Background** - Làm mờ nền phía sau
19. **Medical Pulse** - Icon nhịp tim bay lên (đặc trưng y khoa)
20. **Liquid Fill** - Chất lỏng lấp đầy từ dưới

## 🚀 Cài đặt

### Bước 1: Include CSS
```html
<link rel="stylesheet" href="/assets/buttons/button-effects.css">
```

### Bước 2: Sử dụng
```html
<!-- Nút cơ bản với hiệu ứng Glow -->
<button class="btn btn-primary btn-glow">Click Me</button>

<!-- Nút với hiệu ứng Medical Pulse -->
<button class="btn btn-success btn-medical-pulse">Emergency</button>

<!-- Nút Border Expand -->
<button class="btn btn-border-expand">Outline Button</button>
```

## 🎨 Biến thể Màu sắc

| Class | Màu sắc | Sử dụng |
|-------|---------|---------|
| `.btn-primary` | Xanh dương (#0ea5e9) | Hành động chính |
| `.btn-secondary` | Xám (#64748b) | Hành động phụ |
| `.btn-success` | Xanh lá (#10b981) | Xác nhận, thành công |
| `.btn-danger` | Đỏ (#ef4444) | Xóa, cảnh báo nguy hiểm |
| `.btn-warning` | Cam (#f97316) | Cảnh báo, lưu ý |

## 🌙 Dark Mode Support

Tự động chuyển đổi màu sắc khi kích hoạt Dark Mode nhờ CSS variables:

```css
:root {
  --btn-primary: #0ea5e9;
}

.dark {
  --btn-primary: #38bdf8;
}
```

## 📋 Kết hợp Hiệu ứng

Bạn có thể kết hợp nhiều class hiệu ứng:

```html
<!-- Glow + Scale Up -->
<button class="btn btn-primary btn-glow btn-scale-up">
  Combined Effect
</button>

<!-- Ripple + 3D Push -->
<button class="btn btn-success btn-ripple btn-3d-push">
  Multi Effect
</button>
```

## ⚙️ Tùy chỉnh

### Thay đổi màu chủ đạo
```css
:root {
  --btn-primary: #your-color;
  --btn-transition: all 0.4s ease; /* Thay đổi tốc độ */
}
```

### Tạo hiệu ứng mới
Thêm vào file `button-effects.css`:

```css
.btn-custom-effect:hover {
  transform: rotate(5deg) scale(1.1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
```

## 🎯 Best Practices

✅ **Nên dùng:**
- Hiệu ứng `glow`, `pulse` cho nút CTA chính
- Hiệu ứng `medical-pulse` cho chức năng cấp cứu
- Hiệu ứng `3d-push` cho nút submit form
- Kết hợp tối đa 2 hiệu ứng cùng lúc

❌ **Tránh:**
- Dùng quá nhiều hiệu ứng trên cùng 1 nút
- Hiệu ứng gây mất tập trung (bounce liên tục)
- Animation quá chậm (>0.5s)
- Không test trên mobile

## ♿ Accessibility

- Tất cả hiệu ứng đều tôn trọng `prefers-reduced-motion`
- Focus states rõ ràng với outline
- Disabled state không có hiệu ứng
- Tương thích screen reader

```css
@media (prefers-reduced-motion: reduce) {
  .btn-* {
    animation: none !important;
    transition: none !important;
  }
}
```

## 📱 Responsive

Tự động điều chỉnh kích thước trên mobile:

```css
@media (max-width: 768px) {
  .btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}
```

## 🔍 Demo

Mở file `demo-buttons.html` để xem trước tất cả hiệu ứng và toggle giữa Light/Dark Mode.

---

**CliniPortal** - Professional UI Components for Healthcare
