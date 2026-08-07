---
name: medical-ui-ux-design
description: Kỹ năng thiết kế giao diện UI/UX y khoa hiện đại, ứng dụng Design Tokens (CSS Variables), Dark Mode, vi phối màu HSL hài hòa, glassmorphism và hiệu ứng chuyển động mượt mượt cho CliniPortal.
---

# Medical UI/UX Design — CliniPortal

Tài liệu này định nghĩa tiêu chuẩn thiết kế mỹ thuật và trải nghiệm người dùng (UI/UX) cao cấp cho ứng dụng y khoa CliniPortal.

---

## 🎨 Design System Tokens (Không Hardcode Màu)

Tất cả thành phần giao diện phải dùng CSS Variables khai báo trong `main.css`:

```css
/* Color Tokens */
--color-primary: #0284c7;       /* Xanh y tế chính */
--color-primary-hover: #0369a1;
--color-surface: #ffffff;       /* Nền card / container */
--color-bg: #f8fafc;            /* Nền trang chính */
--color-text: #0f172a;          /* Chữ chính */
--color-text-muted: #64748b;    /* Chữ phụ */
--color-border: #e2e8f0;        /* Viền */

/* State & Alert Tokens */
--color-success: #10b981;       /* An toàn / Bình thường */
--color-warning: #f59e0b;       /* Trầm trọng vừa / Theo dõi */
--color-danger: #ef4444;        /* Cấp cứu / Nguy hiểm */
--color-info: #06b6d4;          /* Thông tin cận lâm sàng */

/* Shadows & Radius */
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 16px;
--shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
--shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
```

---

## 🌙 Dark Mode Standard

Đảm bảo thuộc tính `data-theme="dark"` trên thẻ `<html>` hoạt động hoàn hảo:

```css
[data-theme="dark"] {
  --color-primary: #38bdf8;
  --color-surface: #1e293b;
  --color-bg: #0f172a;
  --color-text: #f8fafc;
  --color-text-muted: #94a3b8;
  --color-border: #334155;
  --shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}
```

---

## ✨ Micro-Animations & Interactivity

1. **Card Hover Effects**:
   - Thêm hiệu ứng trượt nhẹ (`transform: translateY(-2px)`) và bóng đổ mượt mượt khi di chuột qua card y khoa.
   - Thêm transition mượt: `transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);`

2. **Cảnh báo Lâm sàng (Alert Banners)**:
   - Các card nguy cơ cao phải có đường viền trái nổi bật (`border-left: 4px solid var(--color-danger)`).
   - Nền nhạt phản chiếu màu trạng thái: `background: rgba(239, 68, 68, 0.08);`.
