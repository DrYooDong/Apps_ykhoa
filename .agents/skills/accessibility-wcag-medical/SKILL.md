---
name: accessibility-wcag-medical
description: Kỹ năng chuẩn hóa khả năng truy cập khuyết tật (WCAG 2.1 AA), tương phản màu sắc y tế, hỗ trợ điều hướng bàn phím (Keyboard Navigation) và ARIA roles cho CliniPortal.
---

# Accessibility & WCAG Medical Standard — CliniPortal

Hướng dẫn thiết kế và lập trình giao diện đạt chuẩn accessibility y tế (WCAG 2.1 AA) giúp bác sĩ, nhân viên y tế và bệnh nhân dễ dàng truy cập thông tin trên mọi thiết bị.

---

## ♿ Quy tắc Bắt buộc

1. **Độ tương phản Màu sắc (Color Contrast Ratio)**:
   - Text thường: Tỷ lệ tối thiểu **4.5:1** so với nền.
   - Text lớn (≥18pt hoặc 14pt bold) & Icon UI: Tỷ lệ tối thiểu **3.0:1**.
   - Tránh dùng màu sắc duy nhất để truyền tải thông tin nguy hiểm (phải kết hợp icon, nhãn chữ hoặc đường viền).

2. **Điều hướng Bàn phím (Keyboard Accessibility)**:
   - Tất cả các button, input, tab, modal phải có thể focus bằng phím `Tab` và kích hoạt bằng phím `Space` hoặc `Enter`.
   - Vùng focus phải hiển thị rõ ràng: `outline: 2px solid var(--color-primary); outline-offset: 2px;`.

3. **Thẻ Semantic & ARIA Roles**:
   - Sử dụng đúng thẻ `<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`, `<section>`.
   - Các nút tương tác không phải thẻ `<button>` phải có `role="button"` và `tabindex="0"`.
   - Dynamic alert cards dùng `aria-live="polite"` hoặc `role="alert"`.

---

## 📋 Checklist Kiểm tra Accessibility

- [ ] Tất cả `<input>` trong máy tính y khoa có nhãn `<label for="...">` tương ứng.
- [ ] Ảnh minh họa y học/giải phẫu có `alt="..."` mô tả ngắn gọn nội dung hình ảnh.
- [ ] Modal dialog có `role="dialog"`, `aria-modal="true"` và phím `Escape` để đóng.
- [ ] Không có hiện tượng bẫy bàn phím (keyboard trap).
