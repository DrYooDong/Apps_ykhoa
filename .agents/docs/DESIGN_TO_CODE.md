# Hướng dẫn Quy trình Design-to-Code (Figma → Vanilla CSS) — CliniPortal

> Tài liệu này định nghĩa quy chuẩn chuyển đổi thiết kế từ **Figma** sang **Pure HTML/Vanilla CSS/Vanilla JS** trong hệ sinh thái CliniPortal.

---

## 🎨 1. Nguyên tắc Cốt lõi

1. **Tuyệt đối không Hardcode giá trị tĩnh**: Mọi mã màu, bán kính bo góc, hiệu ứng đổ bóng lấy từ Figma phải được quy đổi thành **CSS Variables** (`:root`) trong `css/main.css`.
2. **Hỗ trợ Đa giao diện (Light/Dark Theme)**: CSS Variables đảm bảo giao diện hiển thị đúng ở cả 2 chế độ `data-theme="light"` và `data-theme="dark"`.
3. **Phân hệ hóa CSS**: Mỗi component hoặc trang mới cần sử dụng class name có tiền tố module (`.flow-`, `.calc-`, `.skill-`, `.physio-`, `.patho-`).

---

## 🔄 2. Bảng Quy đổi (Figma Inspect ➔ CliniPortal CSS Token)

| Thông số trên Figma | Thuộc tính CSS | CSS Variable trong CliniPortal |
| :--- | :--- | :--- |
| Primary Color (`#0284c7`) | `color`, `background` | `var(--color-primary)` |
| Primary Hover (`#0369a1`) | `:hover` state | `var(--color-primary-hover)` |
| Card Background (Sáng) | `background-color` | `var(--color-surface)` |
| Card Background (Subtle) | `background-color` | `var(--color-surface-2)` |
| Text Main (`#0f172a`) | `color` | `var(--color-text)` |
| Text Muted (`#475569`) | `color` | `var(--color-text-muted)` |
| Border (`#cbd5e1`) | `border` | `1px solid var(--color-border)` |
| Card Radius (`14px`) | `border-radius` | `var(--radius-lg)` |
| Button Radius (`10px`) | `border-radius` | `var(--radius-md)` |
| Small Radius (`6px`) | `border-radius` | `var(--radius-sm)` |
| Pill / Badge (`9999px`) | `border-radius` | `var(--radius-full)` |
| Card Shadow | `box-shadow` | `var(--shadow-md)` |
| Card Hover Shadow | `box-shadow` | `var(--shadow-card-hover)` |
| Glassmorphism Panel | `backdrop-filter` | `var(--glass-bg)` & `var(--glass-blur)` |

---

## 🛠️ 3. Quy trình Chuyển đổi 4 Bước

### Bước 1: Thiết kế trên Figma
- Tạo giao diện với Layout chuẩn (Auto-layout, Spacing 8px/12px/16px/24px).
- Sử dụng bảng màu chuẩn HSL trùng khớp với CliniPortal Tokens.

### Bước 2: Khai báo Token mới (Nếu Figma phát sinh Token mới)
- Mở `css/main.css`.
- Khai báo token mới ở cả 2 block `:root` (light mode) và `[data-theme="dark"]`.

### Bước 3: Đặt class theo chuẩn BEM & Tạo File Component
- Đặt tên file style mới trong `css/components/[ten-module].css`.
- Viết CSS theo chuẩn Mobile-first:
  ```css
  /* Mobile trước */
  .fnode-card {
    display: flex;
    flex-direction: column;
    padding: 16px;
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
  }

  /* Desktop mở rộng */
  @media (min-width: 768px) {
    .fnode-card {
      flex-direction: row;
    }
  }
  ```

### Bước 4: Thêm tương tác với Vanilla JS (ES6+)
- Sử dụng các event listener thuần (`addEventListener`, `dataset`, `classList.toggle`).
- Kết hợp với các **AI Skills** sẵn có (`flowchart-module`, `clinical-tools-module`, v.v.).

---

## ✅ 4. Checklist Kiểm duyệt (QA Checklist)

- [ ] 100% thuộc tính color, background, border-radius sử dụng `var(--...)`.
- [ ] Đã test giao diện trên cả Light Mode và Dark Mode.
- [ ] Đã kiểm tra Responsive di động (width $\le 768px$).
- [ ] Không thêm thư viện JS bên ngoài.
- [ ] Cập nhật file mới vào `.agents/docs/FILE_MAP.md`.
