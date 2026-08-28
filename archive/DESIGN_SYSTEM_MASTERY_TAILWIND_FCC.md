# 🎨 TỔNG HỢP KIẾN TRÚC THIẾT KẾ (DESIGN SYSTEM MASTERY)
## Đúc kết từ Tailwind CSS (v4 Architecture) & freeCodeCamp

> **Tài liệu nghiên cứu & chuyển giao kỹ thuật UI/UX Design**
> Trích xuất trực tiếp từ mã nguồn: `archive/tailwindcss-main.zip` & `archive/freeCodeCamp-main.zip`
> Tối ưu hóa cho hệ sinh thái Y khoa **CliniPortal** (Vanilla HTML5 / Modern CSS3 / Zero-Framework).

---

## 📑 MỤC LỤC
1. [Hệ thống Tailwind CSS v4 — Triết lý CSS-First & Không gian màu OKLCH](#1-tailwind-css-v4--css-first--oklch)
2. [Hệ thống freeCodeCamp — Thiết kế Giáo dục Chuyên sâu & Siêu tương phản (WCAG AAA)](#2-freecodecamp--pedagogical-ui--wcag-aaa)
3. [Bảng đối chiếu Design Tokens & Thông số Chuẩn](#3-bảng-đối-chiếu-design-tokens)
4. [Các Pattern UI/UX Đắt giá Học tập được](#4-các-pattern-uiux-đắt-giá)
5. [Lộ trình Ứng dụng Thực chiến vào CliniPortal](#5-lộ-trình-ứng-dụng-vào-cliniportal)

---

## 1. Tailwind CSS v4 — CSS-First & OKLCH

Tailwind CSS v4 đánh dấu cuộc cách mạng loại bỏ hoàn toàn file cấu hình JavaScript (`tailwind.config.js`), chuyển toàn bộ định nghĩa sang **CSS Native** thông qua `@theme` và hệ thống biến CSS hiện đại.

### 🌟 1.1 Không gian màu OKLCH (Perceptually Uniform Color Space)
Toàn bộ bảng màu Tailwind v4 sử dụng `oklch(L C H)` thay vì sRGB hex/hsl truyền thống:
- **Độ sáng đồng đều (Perceptual Uniformity)**: Các màu khác nhau ở cùng bước sắc độ (vd: `blue-500` và `red-500`) có độ tương phản và cảm nhận ánh sáng bằng mắt người hoàn toàn chuẩn xác, loại bỏ hiện tượng màu vàng/xanh lục bị chói sáng hơn màu xanh dương.
- **Dải màu rộng hơn (P3 Gamut)**: Hiển thị rực rỡ và chân thực trên các màn hình Retina / OLED hiện đại.

```css
/* Ví dụ Palette OKLCH chuẩn từ Tailwind v4 theme.css */
--color-red-500: oklch(63.7% 0.237 25.331);
--color-emerald-500: oklch(69.6% 0.17 162.48);
--color-sky-500: oklch(68.5% 0.169 237.323);
--color-indigo-500: oklch(58.5% 0.233 277.117);
--color-slate-900: oklch(20.8% 0.042 265.755);
```

### 📐 1.2 Hệ tỷ lệ Typography & Line-height Tỷ lệ Động
Tailwind v4 tính toán `line-height` độc lập theo công thức phân số chuẩn xác `calc(target_leading / font_size)`:
```css
--text-xs: 0.75rem;
--text-xs--line-height: calc(1 / 0.75);      /* = 1.333 */

--text-sm: 0.875rem;
--text-sm--line-height: calc(1.25 / 0.875); /* = 1.428 */

--text-base: 1rem;
--text-base--line-height: calc(1.5 / 1);     /* = 1.5 */

--text-2xl: 1.5rem;
--text-2xl--line-height: calc(2 / 1.5);      /* = 1.333 */

--text-5xl: 3rem;
--text-5xl--line-height: 1;                 /* = 1.0 cho Headings lớn */
```

### 🌓 1.3 Hệ thống Đổ bóng Đa lớp (Layered Shadows & Inset Shadows)
Bổ sung hệ thống bóng nội vi (`--inset-shadow-*`) và bóng văn bản (`--text-shadow-*`) đạt độ sâu thị giác tối đa mà không gây đục màu:
```css
/* Đổ bóng ngoài tự nhiên (Ambient + Direct light) */
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

/* Đổ bóng trong (Tạo chiều sâu cho Form Controls & Inset Cards) */
--inset-shadow-xs: inset 0 1px 1px rgb(0 0 0 / 0.05);
--inset-shadow-sm: inset 0 2px 4px rgb(0 0 0 / 0.05);

/* Text Shadow vi tế cho Badges & Headings */
--text-shadow-sm: 0px 1px 0px rgb(0 0 0 / 0.075), 0px 1px 1px rgb(0 0 0 / 0.075), 0px 2px 2px rgb(0 0 0 / 0.075);
```

### 🛡️ 1.4 Preflight Reset Hiện đại & Công thái học Di động
- `-webkit-tap-highlight-color: transparent`: Loại bỏ viền xanh nhấp nháy xấu xí khi tap trên iOS Safari.
- `-webkit-text-size-adjust: 100%`: Ngăn iOS tự phóng to chữ khi xoay ngang màn hình.
- `scroll-padding-top`: Tự động tính toán khoảng bù trừ khi cuộn tới anchor link có fixed header.
- Reset bảng biểu và hình ảnh (`img, svg, video { display: block; vertical-align: middle; max-width: 100%; height: auto; }`).

---

## 2. freeCodeCamp — Pedagogical UI & WCAG AAA

freeCodeCamp là một trong những nền tảng giáo dục lập trình có lượng người dùng lớn nhất thế giới. Thiết kế của FCC tập trung vào **hiệu suất tối đa, độ tương phản tuyệt đối và không gây mỏi mắt trong phiên làm việc kéo dài hàng giờ**.

### 🎨 2.1 Kiến trúc Dual Palette (Dark vs Light Token Inversion)
FCC tổ chức bảng màu qua 2 class bao bọc `.dark-palette` và `.light-palette` với triết lý đối ngẫu 4 cấp bậc (`Primary`, `Secondary`, `Tertiary`, `Quaternary`):

```css
/* Gốc màu chủ đạo (Night Navy) */
:root {
  --theme-color: #0a0a23;       /* Nền đêm sâu thẳm đặc trưng */
  --yellow-gold: #ffbf00;       /* Điểm nhấn CTA năng lượng */
  --gray-00: #ffffff;
  --gray-05: #f5f6f7;
  --gray-10: #dfdfe2;
  --gray-75: #3b3b4f;
  --gray-85: #1b1b32;
  --gray-90: #0a0a23;
}

/* Dark Mode: Text sáng trên nền tối bậc 4 */
.dark-palette {
  --primary-color: var(--gray-00);
  --secondary-color: var(--gray-05);
  --primary-background: var(--gray-90);
  --secondary-background: var(--gray-85);
  --tertiary-background: var(--gray-80);
  --quaternary-background: var(--gray-75);
  --highlight-color: var(--blue-light);
  --highlight-background: var(--blue-dark);
}

/* Light Mode: Đảo chiều hoàn hảo */
.light-palette {
  --primary-color: var(--gray-90);
  --secondary-color: var(--gray-85);
  --primary-background: var(--gray-00);
  --secondary-background: var(--gray-05);
  --tertiary-background: var(--gray-10);
  --quaternary-background: var(--gray-15);
  --highlight-color: var(--blue-dark);
  --highlight-background: var(--blue-light);
}
```

### 🎯 2.2 Chuẩn Focus Ring & Keyboard Accessibility
FCC tuân thủ nghiêm ngặt tiêu chuẩn WCAG 2.2 Level AAA:
```css
/* Focus Ring sắc nét 3px không dùng outline mờ */
:focus-visible {
  outline: 3px solid var(--focus-outline-color);
  outline-offset: 0;
}

/* Fallback cho trình duyệt cũ */
@supports not selector(:focus-visible) {
  :focus {
    outline: 3px solid var(--focus-outline-color);
    outline-offset: 0;
  }
}
```

### 🧱 2.3 Phân cấp Accordion Siêu Cấu trúc (Superblock Hierarchy)
Hệ thống hiển thị giáo trình theo phân cấp 4 tầng: `Superblock -> Chapter -> Module -> Block -> Challenge`:
- **Đường viền dày dặn (Industrial / Brutalist Border 3px)**: Tạo cảm giác cấu trúc vững chãi, phân định ranh giới bài học rõ ràng.
- **Nút Toggle độc lập (`chapter-button-main` vs `chapter-button-toggle`)**: Tách biệt khu vực click điều hướng và click mở rộng accordion, tránh xung đột tương tác.
- **Huy hiệu Checkmark trạng thái**: Đồng bộ hóa trực quan tiến độ học viên theo thời gian thực.

### 💡 2.4 Panel Tương tác Hạ tầng (Independent Lower Jaw & Drawer)
- Khung phản hồi dưới đáy (Bottom Jaw) bật lên mượt mà với `@keyframes jaw-hint-fade-in`.
- Hiệu ứng Chấm tròn Nhấp nháy Thông minh (`.socrates-feature-dot`):
```css
@keyframes socrates-dot-pulse {
  0% { box-shadow: 0 0 0 0 var(--red80); }
  70% { box-shadow: 0 0 0 6px rgba(248, 33, 83, 0); }
  100% { box-shadow: 0 0 0 0 rgba(248, 33, 83, 0); }
}

/* Tôn trọng người dùng nhạy cảm chuyển động */
@media (prefers-reduced-motion: reduce) {
  .socrates-feature-dot { animation: none; }
}
```

### ⚡ 2.5 Skeleton Shimmer Loading (Giảm giật layout CLS)
Hai dải xương nhịp tim so le (`pulse-1` và `pulse-2`) giúp giao diện chờ tải trông sinh động và chuyên nghiệp:
```css
.skeleton-line-1 { animation: pulse-1 1.5s ease-in-out infinite; }
.skeleton-line-2 { animation: pulse-2 1.5s ease-in-out infinite; }

@keyframes pulse-1 { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
@keyframes pulse-2 { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
```

---

## 3. Bảng Đối Chiếu Design Tokens

| Hạng mục | Tailwind CSS v4 Standard | freeCodeCamp Production | Đề xuất Chuẩn hóa cho CliniPortal |
| :--- | :--- | :--- | :--- |
| **Không gian màu** | `oklch(L C H)` | HSL & Hex tương phản cao | OKLCH / CSS Custom Properties |
| **Màu Primary** | Blue / Indigo / Sky | Deep Night Navy (`#0a0a23`) | Medical Sky Blue (`#0284c7`) / OKLCH |
| **Màu Nhấn CTA** | Indigo / Violet 600 | Gold / Amber (`#ffbf00`) | Emerald Green & Amber Alert |
| **Border Radius** | 0.125rem đến 2rem | 0px (Brutalist) / 2px-4px | 8px - 12px (Smooth Modern Card) |
| **Bóng đổ (Shadow)** | 2xs -> 2xl + Inset Shadow | Shadow tối giản / Viền 1-3px | Layered Soft Shadow + Inset Border |
| **Focus State** | 2px ring offset | 3px solid outline không mờ | 3px solid ring tương phản cao |
| **Typography** | Dynamic Line-height | System Sans + Monospace | Inter / Outfit + JetBrains Mono |
| **Motion/A11y** | Cubic bezier + Bounce | Keyframes Pulse + Reduced motion | Micro-animations + Reduced motion |

---

## 4. Các Pattern UI/UX Đắt Giá Học Tập Được

### 🔹 Pattern 1: Sticky Navigation Bar có tính `scroll-padding-top`
Khi trang web có thanh điều hướng hoặc Header cố định (`position: sticky` hoặc `fixed`), việc click vào mục lục (TOC) thường bị che khuất tiêu đề. Cả Tailwind và FCC giải quyết triệt để bằng:
```css
html {
  scroll-padding-top: calc(var(--header-height) + 1rem);
  scroll-behavior: smooth;
}
```

### 🔹 Pattern 2: Multi-layer Elevation cho Card lâm sàng
Kết hợp viền tinh tế (`1px solid var(--color-border)`) với bóng đổ hai tầng (Direct + Ambient Light):
```css
.clini-card-elevated {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: 
    0 1px 3px 0 rgb(0 0 0 / 0.05),
    0 4px 6px -2px rgb(0 0 0 / 0.03);
  transition: transform 0.2s cubic-bezier(0, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0, 0, 0.2, 1);
}

.clini-card-elevated:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 4px 12px -2px rgb(0 0 0 / 0.08),
    0 2px 6px -1px rgb(0 0 0 / 0.04);
}
```

### 🔹 Pattern 3: Callout / Alert Box phân tầng y khoa
Áp dụng cơ chế Inset Tint và Border Trọng âm từ FCC:
```css
.medical-alert {
  border-left: 4px solid var(--color-danger);
  background-color: oklch(from var(--color-danger) l c h / 0.08);
  padding: 0.875rem 1.25rem;
  border-radius: 0 8px 8px 0;
}
```

### 🔹 Pattern 4: Responsive Touch Target ($\ge 44\text{px}$)
FCC đảm bảo mọi button điều hướng trên mobile đều đạt chuẩn ngón tay bấm:
```css
@media (max-width: 768px) {
  .nav-button, .btn-action, .accordion-header {
    min-height: 44px;
    min-width: 44px;
    padding: 10px 16px;
  }
}
```

---

## 5. Lộ trình Ứng dụng Thực chiến vào CliniPortal

1. **Chuẩn hóa Token Palette sang OKLCH**: Bổ sung dải màu OKLCH song song với HEX trong `src/styles/design-tokens.css` để tăng độ rực rỡ và chân thực trên màn hình y tế.
2. **Nâng cấp Hệ thống Focus State (A11y)**: Đưa chuẩn `:focus-visible` 3px của freeCodeCamp vào toàn bộ Form Calculator và Navigation Links của CliniPortal.
3. **Ứng dụng Accordion 4 tầng**: Chuẩn hóa các trang Kho Phác đồ Bệnh lý & Guidelines theo mô hình phân cấp Accordion của FCC để tối ưu khả năng tra cứu nhanh tại giường bệnh.
4. **Bổ sung Skeleton Loading State**: Dùng animation dải xung nhịp tim so le khi tải dữ liệu tìm kiếm hoặc dynamic components.
