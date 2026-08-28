---
name: design-components
description: Quy chuẩn kích thước, tỷ lệ và ma trận 7 trạng thái linh kiện giao diện y khoa (Buttons, Badges, Chips, Modals, Superblock Accordions, Drawers, Skeletons, Bento Cards) với tỷ lệ padding/font chuẩn Awwwards và WCAG AAA.
---

# 🧩 Master Design Components Specification v2.0
## Chuẩn Hóa Linh Kiện Giao Diện Y Khoa & Đồ Họa Đỉnh Cao (CliniPortal)

> **Tiêu chuẩn thiết kế:** Tối ưu hóa từ **Tailwind CSS v4 Architecture** & **freeCodeCamp Production UI**.
> **Công nghệ:** Pure HTML5 + Vanilla Modern CSS3 + Design Tokens (`tokens.css`). Không phụ thuộc framework.

---

## 🔘 1. Button System (Hệ Thống Nút Bấm & Trạng Thái)

### A. Kích thước Chuẩn 8-Point Grid (Touch-First)
Mọi kích thước đều tuân thủ nguyên tắc ngón cái di động (Touch Target $\ge 44\text{px}$ trên mobile):

| Cỡ Nút (Size) | Chiều cao ($H$) | Padding ($V / H$) | Cỡ Chữ (Font) | Border Radius | Mục đích sử dụng |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Small (`.clini-btn--sm`)** | 32px | `4px 12px` | 13px / 0.8125rem | 6px | Bộ lọc, nút phụ trong bảng cận lâm sàng |
| **Medium (`.clini-btn--md`)** | 40px | `8px 18px` | 15px / 0.9375rem | 8px | Nút mặc định toàn hệ thống |
| **Large (`.clini-btn--lg`)** | 48px | `12px 24px` | 16px / 1.0000rem | 10px | Nút CTA chính trang chủ / Form submit |
| **XLarge (`.clini-btn--xl`)** | 56px | `16px 32px` | 18px / 1.1250rem | 12px | Nút Cấp cứu khẩn cấp / Hồi sức tim phổi |

### B. Ma Trận 7 Trạng Thái Bắt Buộc (7-State Matrix)
```css
/* 1. Default */
.clini-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-body);
  font-weight: 600;
  line-height: 1;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  user-select: none;
  transition: all var(--duration-base) var(--ease-out);
  -webkit-tap-highlight-color: transparent;
}

/* 2. Hover: Nâng nhẹ & sáng viền */
.clini-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* 3. Active / Tactile Press: Nén vật lý cơ học */
.clini-btn:active {
  transform: translateY(0) scale(0.97);
  transition-duration: 80ms;
}

/* 4. Focus-Visible (WCAG 2.2 AAA): Viền 3px sắc nét không mờ */
.clini-btn:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

/* 5. Disabled */
.clini-btn:disabled,
.clini-btn[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* 6. Loading / Shimmer State */
.clini-btn--loading {
  position: relative;
  color: transparent !important;
  pointer-events: none;
}
.clini-btn--loading::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: clini-spin 0.8s linear infinite;
}

/* 7. Success / Emergency State */
.clini-btn--critical {
  background: var(--clinical-critical);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(220, 38, 38, 0.35);
}
```

---

## 🗂️ 2. Superblock Accordion System (Phân Cấp Bài Học & Phác Đồ)
*Học tập từ mô hình Accordion 4 tầng vững chãi của freeCodeCamp (Chapter -> Module -> Block -> Item).*

### Đặc điểm Kỹ thuật:
- **Tách biệt 2 vùng bấm**: Khu vực tên bài (`.chapter-main-btn`) mở trực tiếp trang, khu vực mũi tên (`.chapter-toggle-btn`) mở rộng/thu gọn danh sách con.
- **Biểu tượng Trạng thái Tiến độ (Checkmark Indicator)**: Hiển thị trạng thái đã đọc/chưa đọc hoặc cấp độ khuyến cáo EBM (Class I, IIa, IIb, III).

```html
<div class="clini-accordion-chapter">
  <div class="clini-chapter-header">
    <a href="./bai-giang.html" class="clini-chapter-title-btn">
      <span class="clini-chapter-icon">🫀</span>
      <span class="clini-chapter-name">1. Tiếp Cận Hội Chứng Mạch Vành Cấp</span>
    </a>
    <button class="clini-chapter-toggle-btn" aria-expanded="false" aria-label="Mở rộng danh sách">
      <svg class="clini-toggle-chevron" width="16" height="16" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
    </button>
  </div>
  <div class="clini-chapter-collapse" hidden>
    <ul class="clini-block-list">
      <li class="clini-block-item"><a href="#stem-ecg">Điện tâm đồ STEMI/NSTEMI</a></li>
      <li class="clini-block-item"><a href="#biomarkers">Động học Troponin hs-cTn</a></li>
    </ul>
  </div>
</div>
```

---

## 📱 3. Bottom Drawer & Lower Jaw Panel (Khung Tương Tác Cận Lâm Sàng)
*Lấy cảm hứng từ Independent Lower Jaw của freeCodeCamp:*

Dùng cho:
1. **Máy tính Liều lượng & Thang điểm (Bedside Calculator)**: Bật lên tức thì khi người dùng click xem thang điểm Wells / CHA2DS2-VASc.
2. **Khung Gợi ý Chẩn đoán (Diagnostic Pearls Drawer)**: Chứa thông tin bổ trợ không làm gián đoạn dòng đọc của bác sĩ.

```css
.clini-drawer-jaw {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  width: 100%;
  max-width: var(--content-wide-width);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-bottom: none;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: transform var(--duration-slow) var(--ease-drawer);
}

.clini-drawer-jaw.is-open {
  transform: translateX(-50%) translateY(0);
}
```

---

## ⚡ 4. Skeleton Shimmer & Loading State (CLS = 0)
Hệ thống tạo 2 dải nhịp xung so le (`pulse-1` và `pulse-2`) giúp giảm hiện tượng gián đoạn layout (Cumulative Layout Shift = 0):

```css
.clini-skeleton {
  background-color: var(--color-surface-offset);
  border-radius: var(--radius-xs);
}

.clini-skeleton--line-1 {
  height: 16px;
  width: 100%;
  animation: clini-pulse-1 1.5s ease-in-out infinite;
}

.clini-skeleton--line-2 {
  height: 16px;
  width: 75%;
  animation: clini-pulse-2 1.5s ease-in-out infinite;
}

@keyframes clini-pulse-1 {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}

@keyframes clini-pulse-2 {
  0% { opacity: 0.45; }
  50% { opacity: 1; }
  100% { opacity: 0.45; }
}

@media (prefers-reduced-motion: reduce) {
  .clini-skeleton--line-1,
  .clini-skeleton--line-2 {
    animation: none;
    opacity: 0.7;
  }
}
```

---

## 🛡️ 5. Accessibility (A11y) & Touch Checkpoints
- [ ] **Touch Target**: Mọi phần tử bấm được trên mobile đều có `min-height: 44px` và `min-width: 44px`.
- [ ] **Focus Visible**: Không bao giờ ẩn outline bằng `outline: none` mà không có viền thay thế (`outline: 3px solid var(--color-primary)`).
- [ ] **Contrast Ratio**: Độ tương phản chữ tối thiểu $4.5:1$ (chuẩn WCAG AA) và $7:1$ (chuẩn WCAG AAA cho nội dung y khoa quan trọng).
- [ ] **Reduced Motion**: Mọi animation, pulse dot và shimmer đều có fallback dừng chuyển động khi người dùng bật chế độ tiết kiệm chuyển động.
