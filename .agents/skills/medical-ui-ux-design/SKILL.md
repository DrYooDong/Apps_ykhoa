---
name: medical-ui-ux-design
description: Kỹ năng thiết kế giao diện UI/UX y khoa hiện đại, ứng dụng Design Tokens (CSS Variables), Dark Mode, không gian màu OKLCH mở rộng, tỷ lệ Line-height động, glassmorphism, 8 Định luật UX và hiệu ứng chuyển động mượt mà cho CliniPortal.
---

# 🩺 Medical UI/UX Design Mastery — CliniPortal Pro Max

Tài liệu này định nghĩa tiêu chuẩn thiết kế mỹ thuật và trải nghiệm người dùng (UI/UX) cao cấp nhất cho ứng dụng y khoa CliniPortal, ứng dụng nghiên cứu quang phổ hiện đại (**OKLCH Color Space**), công thái học di động (**Mobile-First Ergonomics**) và khoa học nhận thức (**Laws of UX**).

---

## 🎨 1. Không Gian Màu OKLCH & Design Tokens Mở Rộng

### A. Triệt Tiêu "Vùng Chết Màu Xám" (Gray Dead Zone) với OKLCH
OKLCH (`oklch(L C H)`) bảo toàn độ sáng nhận thức (Perceptual Uniformity). Khi chuyển dải màu (Gradients) giữa 2 màu tương phản, luôn sử dụng tính năng nội suy không gian màu mới trong CSS:
```css
/* ✅ Chuẩn Awwwards: Gradient mượt mà, không bị xỉn màu ở vùng chuyển tiếp */
background: linear-gradient(in oklch 135deg, oklch(58% 0.18 225) 0%, oklch(60% 0.17 160) 100%);
```

### B. Bảng Màu Lâm Sàng Đa Tầng (Clinical Semantic Tiers)
| Phân loại Lâm sàng | OKLCH Token (Light) | OKLCH Token (Dark) | Ý nghĩa Y khoa |
| :--- | :--- | :--- | :--- |
| **Critical / Danger** | `oklch(62% 0.22 25)` | `oklch(75% 0.18 25)` | Cấp cứu khẩn cấp / Dấu hiệu sinh tồn đe dọa / Chống chỉ định |
| **Warning / Alert** | `oklch(72% 0.18 70)` | `oklch(82% 0.16 70)` | Cảnh báo tương tác thuốc / Cần theo dõi sát / Tác dụng phụ |
| **Normal / Safe** | `oklch(60% 0.17 160)` | `oklch(78% 0.16 160)` | Chỉ số bình thường / Liều an toàn / Khuyến cáo độ 1 |
| **EBM Research** | `oklch(55% 0.22 290)` | `oklch(75% 0.18 290)` | Y học chứng cứ / Thử nghiệm RCT / Khuyến cáo Grade A |
| **Clinical Pearl** | `oklch(60% 0.15 190)` | `oklch(78% 0.14 190)` | Điểm nhấn kinh nghiệm / Mẹo chẩn đoán phân biệt |
| **Primary Brand** | `oklch(58% 0.18 225)` | `oklch(75% 0.16 225)` | Medical Sky Blue - Chủ đạo hệ thống |

---

## 📐 2. Typography Động & Công Thức Dynamic Line-Height

### A. Tỷ lệ Line-Height Tỷ Lệ Động (Đúc kết từ Tailwind v4)
Line-height không dùng số cố định chung chung mà được tính theo phân số chính xác:
```css
--text-xs:               clamp(0.72rem, 0.68rem + 0.2vw, 0.8rem);
--text-xs--line-height:  calc(1 / 0.75);      /* 1.333 cho nhãn nhỏ */

--text-sm:               clamp(0.82rem, 0.78rem + 0.2vw, 0.9rem);
--text-sm--line-height:  calc(1.25 / 0.875); /* 1.428 cho bảng xét nghiệm */

--text-base:             clamp(0.92rem, 0.88rem + 0.2vw, 1.02rem);
--text-base--line-height:calc(1.5 / 1);       /* 1.500 cho bài đọc lâm sàng */

--text-2xl:              clamp(1.75rem, 1.5rem + 1.2vw, 2.3rem);
--text-2xl--line-height: calc(2 / 1.5);       /* 1.333 cho Tiêu đề H2 */

--text-3xl:              clamp(2.2rem, 1.8rem + 1.8vw, 3rem);
--text-3xl--line-height: 1.15;                /* 1.15 cho Hero Headline */
```

### B. Tránh Tràn Chữ & Hỗ Trợ Đa Ngôn Ngữ
- `overflow-wrap: anywhere;` hoặc `word-break: break-word;` cho thuật ngữ Latin/Y khoa dài (như *Hypertriglyceridemia*).
- `scroll-padding-top: calc(var(--header-height) + 1rem);` đảm bảo khi click Mục lục (TOC) tiêu đề không bị che lấp bởi Header dính.

---

## 🌙 3. Chuẩn Hóa Dark Mode (Elevation & Ambient Glow)

Khi thẻ `<html>` mang thuộc tính `data-theme="dark"`, áp dụng nguyên tắc **Elevation Lighter (Tầng càng cao càng sáng hơn nền đáy)**:

```css
[data-theme="dark"] {
  --color-bg:             oklch(14% 0.02 240);  /* Nền đáy tối sâu */
  --color-surface:        oklch(18% 0.025 240); /* Nền thẻ Card tầng 1 */
  --color-surface-2:      oklch(22% 0.03 240);  /* Nền Card con / Dropdown tầng 2 */
  --color-surface-offset: oklch(25% 0.035 240); /* Nền Input / Search bar */
  --color-border:         oklch(32% 0.035 240); /* Viền ngăn cách rõ nét */

  /* Đổ bóng đa tầng trong Dark Mode (Ambient + Inset) */
  --shadow-sm:            0 1px 2px 0 rgba(0, 0, 0, 0.35);
  --shadow-md:            0 4px 8px -1px rgba(0, 0, 0, 0.45);
  --shadow-card-hover:    0 12px 28px -4px rgba(56, 189, 248, 0.22), 0 4px 8px -2px rgba(56, 189, 248, 0.12);
  --focus-outline:        3px solid oklch(75% 0.16 225);
}
```

---

## 📱 4. Công Thái Học Di Động (Mobile-First Ergonomics)

1. **Chuẩn Touch Target**: $\ge 44 \times 44\text{px}$ cho tất cả liên kết, nút bấm, accordion toggles.
2. **Loại Bỏ Highlight iOS**: `-webkit-tap-highlight-color: transparent` ngăn chặn vết mờ xanh trên iOS Safari.
3. **Safe Area Insets**: Hỗ trợ Dynamic Island và Home Bar trên iPhone hiện đại:
   ```css
   padding-bottom: max(16px, env(safe-area-inset-bottom));
   ```
4. **Vùng Ngón Cái Thuận Tiện (Thumb Zone Architecture)**: Đặt các nút điều hướng khẩn cấp, nút tính toán liều và bottom drawers ở nửa dưới màn hình để bác sĩ thao tác bằng 1 tay khi đi buồng bệnh.

---

## ♿ 5. Chuẩn Khả Năng Truy Cập (WCAG 2.2 AAA Focus Ring)

Tuyệt đối không dùng `outline: none` khi chưa có kiểu thay thế. Tuân thủ chuẩn freeCodeCamp:
```css
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

@supports not selector(:focus-visible) {
  :focus {
    outline: 3px solid var(--color-primary);
    outline-offset: 2px;
  }
}
```

---

## 🏛️ 6. Ứng Dụng Các Định Luật Trải Nghiệm (Laws of UX)

1. **Định luật Fitts**: Nút quan trọng nhất có diện tích lớn nhất và nằm gần ngón tay nhất.
2. **Định luật Hick**: Phân mảnh thông tin phức tạp (Chunking 5-7 mục), giấu chi tiết sau Superblock Accordion.
3. **Ngưỡng Doherty**: Phản hồi tức thì trong vòng $< 300\text{ms}$ với Skeleton Heartbeat Shimmer (`pulse-1` & `pulse-2`).
4. **Định luật Miller**: Giới hạn tối đa 7 thông số xét nghiệm trên 1 card để chống quá tải nhận thức lâm sàng.
