---
name: cdss-ui-sync-squad
description: >
  Đội ngũ AI chuyên trách bảo đảm tính đồng bộ UI/UX, Design Tokens, Dark Mode, Shell Navigation
  và trải nghiệm lâm sàng thống nhất trên toàn bộ các web CDSS độc lập trong CliniPortal DocSpace.
  Kích hoạt khi cần: rà soát giao diện CDSS, sửa lỗi lệch màu/lệch font, cập nhật header/navbar dùng chung,
  kiểm tra độ tương phản WCAG 2.1 AA/AAA cho y tế, hoặc tối ưu hóa hiển thị responsive mobile/tablet/desktop.
---

# CDSS UI Sync Squad Skill

Đội ngũ này chuyên trách thiết lập và duy trì tính nhất quán về mặt thị giác, công thái học lâm sàng và kiến trúc giao diện người dùng trên tất cả các web CDSS độc lập (Standalone CDSS Web Modules).

---

## 🎨 1. Hệ Thống Design Tokens Thống Nhất (`cdss-shell.css`)

Tất cả các module CDSS (dù viết bằng Vanilla CSS hay TailwindCSS) đều phải thừa hưởng hoặc tương thích với bộ CSS Variables chuẩn đặt tại `src/content/docspace/public/cdss/shared/cdss-shell.css`:

```css
/* Color Palette Token CliniPortal CDSS */
--color-primary: #0284c7;        /* Xanh Cyan y khoa tiêu chuẩn */
--color-primary-hover: #0369a1;
--color-surface: #ffffff;        /* Nền thẻ / panel */
--color-bg: #f8fafc;             /* Nền toàn trang */
--color-text: #0f172a;           /* Chữ chính Slate 900 */
--color-text-muted: #64748b;     /* Chữ phụ / nhãn Slate 500 */
--color-border: #e2e8f0;         /* Viền thẻ / phân cách Slate 200 */

/* Semantic States */
--color-success: #16a34a;        /* Xanh lá - An toàn, bình thường */
--color-warning: #eab308;        /* Vàng cam - Cảnh báo, cần theo dõi */
--color-danger: #ef4444;         /* Đỏ - Cấp cứu, chống chỉ định, nguy kịch */
--color-info: #06b6d4;           /* Xanh ngọc - Ghi chú, chỉ số tham chiếu */
```

### Chế độ Dark Mode Bắt Buộc (`[data-theme="dark"]`):
```css
[data-theme="dark"] {
  --color-primary: #38bdf8;
  --color-primary-hover: #0ea5e9;
  --color-surface: #1e293b;
  --color-bg: #0f172a;
  --color-text: #f8fafc;
  --color-text-muted: #94a3b8;
  --color-border: rgba(255, 255, 255, 0.1);
}
```

---

## 🧭 2. Cấu Trúc Khung Điều Hướng Chuẩn (Standard Navbar Shell)

Mọi module CDSS bắt buộc phải sở hữu cấu trúc Header chuẩn hóa sau đây ngay đầu thẻ `<body>`:

```html
<header class="cdss-portal-navbar">
  <div class="cdss-portal-nav-breadcrumbs">
    <a href="../../index.html" class="crumb-hide-mobile"><i class="fa-solid fa-graduation-cap"></i> Knowledge Vault</a>
    <i class="fa-solid fa-chevron-right separator crumb-hide-mobile"></i>
    <a href="../index.html"><i class="fa-solid fa-network-wired"></i> Kho CDSS</a>
    <i class="fa-solid fa-chevron-right separator"></i>
    <span class="active"><i class="[FA_ICON] [COLOR_CLASS]"></i> [TÊN_MODULE_CDSS]</span>
  </div>

  <div class="cdss-portal-nav-right">
    <a href="../../docspace/index.html" class="cdss-portal-nav-btn" title="Mở trong Hồ Sơ Bệnh Án DocSpace">
      <i class="fa-solid fa-user-doctor"></i> <span>DocSpace Pro</span>
    </a>
    <a href="../index.html" class="cdss-portal-nav-btn" title="Trở về Trung Tâm CDSS">
      <i class="fa-solid fa-th-large"></i> <span>Danh Mục CDSS</span>
    </a>
    <button id="theme-toggle" class="cdss-portal-theme-btn" title="Chuyển chế độ Sáng/Tối" aria-label="Toggle Theme">
      <i class="fa-solid fa-moon"></i>
    </button>
  </div>
</header>
```

---

## 📱 3. Quy Chuẩn Responsive & Công Thái Học Y Khoa (Clinical Ergonomics)

1. **Mobile-First & Touch Target**:
   - Tất cả nút bấm, dropdown, thẻ chọn liều lượng phải có chiều cao tối thiểu $\ge 44\text{px}$ để thao tác ngón tay chính xác trên thiết bị di động / iPad tại buồng bệnh.
   - Khi co màn hình $< 768\text{px}$, các nhãn chữ trong `.cdss-portal-nav-btn` tự ẩn (`span { display: none; }`), giữ lại icon để không chiếm diện tích hiển thị.
2. **Typography Y Khoa**:
   - Font văn bản: `Plus Jakarta Sans` hoặc `Inter` cho độ rõ nét khi đọc kết quả xét nghiệm.
   - Font số liệu, công thức, liều lượng, liều bơm tiêm điện: `JetBrains Mono` hoặc `IBM Plex Mono` để tránh nhầm lẫn giữa các chữ số $0$ và $O$, $1$ và $l$.
3. **Cảnh Báo An Toàn Thuốc & Tương Tác**:
   - Khung cảnh báo đỏ (`--color-danger`) luôn phải có icon cảnh báo `fa-triangle-exclamation` và chữ có độ tương phản $\ge 4.5:1$ (WCAG AA).
