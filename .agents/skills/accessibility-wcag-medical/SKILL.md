---
name: accessibility-wcag-medical
description: Kỹ năng chuẩn hóa khả năng truy cập khuyết tật (WCAG 2.1 AA/AAA), tương phản màu sắc y tế, hỗ trợ điều hướng bàn phím (Keyboard Navigation) và ARIA roles cho CliniPortal.
---

# Accessibility & WCAG Medical Standard — CliniPortal

Hướng dẫn thiết kế và lập trình giao diện đạt chuẩn accessibility y tế (WCAG 2.1 AA/AAA) giúp bác sĩ, nhân viên y tế và bệnh nhân dễ dàng truy cập thông tin trên mọi thiết bị, bất kể tật khúc xạ hay hạn chế vận động.

---

## ♿ 1. Tiêu Chuẩn Tương Phản Màu Sắc & Tiếp Cận Thị Giác

1. **Độ tương phản Văn bản (Color Contrast Ratio)**:
   - Text thường ($< 18.5\text{px}$): Tỷ lệ tối thiểu **$4.5:1$** (WCAG AA) và **$7:1$** (WCAG AAA).
   - Text lớn ($\ge 18.5\text{px}$ Bold hoặc $\ge 24\text{px}$ Regular): Tỷ lệ tối thiểu **$3:1$**.
   - UI Components (Borders, Icons, Focus Rings, Graph lines): Tỷ lệ tối thiểu **$3:1$** so với màu nền kế cận.

2. **Thiết Kế An Toàn Cho Người Mù Màu (Color-Blindness Independence)**:
   - **Tuyệt đối không dùng màu sắc đơn thuần để biểu đạt trạng thái nguy hiểm hay an toàn**.
   - Mọi thông báo / badge phải có ít nhất 2 kênh tín hiệu: **Màu sắc + Biểu tượng (Icon) + Nhãn văn bản (Text Label)**.
   - Các bảng đối chiếu / biểu đồ có đường nét phân biệt (Solid, Dashed, Dotted).

---

## ⌨️ 2. Điều Hướng Bàn Phím Toàn Diện (Keyboard Navigation)

1. **Vòng Sáng Focus Ring Chất Lượng Cao**:
   - Thay thế viền mặc định của trình duyệt bằng Focus Ring tương phản cao:
     ```css
     :focus-visible {
       outline: none;
       box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.45);
       border-radius: inherit;
     }
     ```
2. **Không Bẫy Bàn Phím (No Keyboard Traps)**:
   - Người dùng phải có thể di chuyển vào và thoát ra khỏi bất kỳ Modal/Drawer/Dropdown nào bằng phím `Tab`, `Shift + Tab`, hoặc `Escape`.
3. **Phím Tắt Toàn Cục Trực Quan**:
   - `Ctrl + K`: Mở Command Palette.
   - `/`: Tập trung nhanh vào thanh Search.
   - `Esc`: Đóng bất kỳ lớp phủ Overlay đang mở.

---

## 🏷️ 3. Thẻ Semantic & Cấu Trúc ARIA Lâm Sàng

- Sử dụng đúng cấu trúc ngữ nghĩa HTML5: `<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`.
- Các nút không phải thẻ `<button>` bắt buộc có `role="button"` và `tabindex="0"`.
- Các khối cảnh báo khẩn / cập nhật sinh hiệu thời gian thực sử dụng `aria-live="polite"` hoặc `role="alert"`.
- Tất cả `<input>` và `<select>` phải có `<label for="...">` hoặc `aria-label="..."`.

---

## 📋 Checklist Bắt Buộc Trước Khi Release

- [ ] Toàn bộ nút bấm trên Mobile có diện tích tiếp xúc $\ge 44 \times 44\text{px}$.
- [ ] Kiểm tra bằng phím `Tab` duyệt qua 100% các thành phần tương tác mà không cần dùng chuột.
- [ ] Kiểm tra trên giả lập mù màu Achromatopsia (Trắng đen) vẫn đọc hiểu được toàn bộ trạng thái y khoa.
- [ ] Không có chữ bị mờ hoặc chìm vào nền trong cả 2 chế độ Light và Dark Mode.
