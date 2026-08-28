---
name: antigravity-ui-motion-design
description: Kỹ nghệ chuyển động & không gian Antigravity: Hiệu ứng glassmorphism, 3D CSS transforms, Spring physics, Pulse Shimmer, và Micro-animations 60fps mượt mà trên web y khoa.
---

# 🚀 Antigravity UI & Motion Engineering Expert
## Kỹ Thuật Chuyển Động Vi Tế & Không Gian Trọng Lực (CliniPortal Standard)

> **Mục tiêu:** Tạo ra trải nghiệm thị giác sống động, mượt mà (60fps), công thái học cao mà không làm chậm thiết bị y tế hoặc gây mỏi mắt cho bác sĩ.

---

## 🎯 1. Nguyên Tắc Trọng Lực & Chiều Sâu (Antigravity Spatial Depth)

- **Cảm giác Không trọng lượng (Weightlessness)**: Các thẻ (Cards) và Panel công cụ tạo cảm giác lơ lửng bằng bóng đổ phân tán hai tầng (Ambient Light + Direct Light).
- **Phản hồi Xúc giác (Tactile Spring Physics)**: Mọi tương tác chạm (Tap/Click) đều có độ nén đàn hồi tinh tế thay vì chuyển đổi thô cứng.
- **Glassmorphism Chuẩn Mực**: Nền bán trong suốt kết hợp độ mờ quang sai cao cấp (`backdrop-filter: blur(16px) saturate(180%)`).

```css
/* Easing Tokens Chuẩn Chuyển Động Cao Cấp */
:root {
  --ease-spring:  cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-out:     cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out:  cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer:  cubic-bezier(0.32, 0.72, 0, 1);  /* Trượt Drawer mượt mà */

  --duration-fast: 150ms;
  --duration-base: 220ms;
  --duration-slow: 380ms;
}
```

---

## ✨ 2. Micro-Interactions & Animation Keyframes Chuẩn

### A. Chấm Nhịp Tim Báo Hiệu Trạng Thái (`.clini-pulse-dot`)
*Lấy cảm hứng từ Feature Pulse Dot của freeCodeCamp:*
```css
.clini-pulse-dot {
  position: relative;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--clinical-critical);
}

.clini-pulse-dot::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: inherit;
  animation: clini-dot-pulse 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes clini-dot-pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  70% {
    transform: scale(2.6);
    opacity: 0;
  }
  100% {
    transform: scale(2.6);
    opacity: 0;
  }
}
```

### B. Skeleton Heartbeat Shimmer (`pulse-1` & `pulse-2`)
Hai dải xung so le giúp màn hình chờ tải đạt hiệu ứng nhịp tim tự nhiên:
```css
@keyframes clini-shimmer-1 {
  0%, 100% { opacity: 1; transform: scaleY(1); }
  50% { opacity: 0.45; transform: scaleY(0.98); }
}

@keyframes clini-shimmer-2 {
  0% { opacity: 0.45; transform: scaleY(0.98); }
  50% { opacity: 1; transform: scaleY(1); }
  100% { opacity: 0.45; transform: scaleY(0.98); }
}
```

### C. Tactile Press Feedback (Nén vật lý)
```css
.clini-interactive:active {
  transform: scale(0.975);
  transition: transform 80ms var(--ease-spring);
}
```

---

## 🛡️ 3. Bảo Vệ Người Dùng Nhạy Cảm Chuyển Động (Reduced Motion)

Bắt buộc tuân thủ quy tắc WCAG 2.2 AA. Khi người dùng bật cài đặt giảm chuyển động trên hệ điều hành, toàn bộ animation phải dừng lại ngay lập tức:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .clini-pulse-dot::after,
  .clini-skeleton--line-1,
  .clini-skeleton--line-2 {
    animation: none !important;
    opacity: 0.75 !important;
  }
}
```

---

## ⚡ 4. Tối Ưu Hiệu Năng 60 FPS (Hardware Acceleration)

1. **Chỉ animate `transform` và `opacity`**: Không animate `margin`, `padding`, `width`, `height`, `box-shadow` liên tục để tránh hiện tượng CPU Layout Reflow.
2. **Kích hoạt GPU Rendering**: Bổ sung `will-change: transform` hoặc `transform: translateZ(0)` cho các card động phức tạp.
3. **Lazy Animations**: Chỉ kích hoạt chuyển động khi phần tử lọt vào khung nhìn (IntersectionObserver).
