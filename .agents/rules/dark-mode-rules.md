# Quy Tắc Dark Mode Bắt Buộc (Dark Mode Compliance)

## 🌙 Các Nguyên tắc Bắt buộc

1. **100% Tương thích**: Mọi giao diện/component mới được tạo ra hoặc chỉnh sửa đều phải hoạt động mượt mà ở cả 2 chế độ Light Mode và Dark Mode.
2. **Sử dụng Design Tokens (CSS Variables)**:
   - **Tuyệt đối KHÔNG hardcode** mã màu hex (`#ffffff`, `#000000`, `#0284c7`).
   - Sử dụng các biến CSS chuẩn:
     ```css
     var(--color-primary)        /* Màu chủ đạo */
     var(--color-surface)        /* Phông nền card/khung */
     var(--color-bg)             /* Phông nền toàn trang */
     var(--color-text)           /* Chữ chính */
     var(--color-text-muted)     /* Chữ phụ */
     var(--color-border)         /* Đường viền */
     ```
3. **Kiểm thử giao diện**: Đảm bảo toggle thuộc tính `data-theme="dark"` trên thẻ `<html>` hiển thị chính xác tương phản màu sắc.
