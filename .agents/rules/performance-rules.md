# Quy Tắc Performance & Bundle Size (Hiệu Năng & Tải Trang)

## 🚀 Giới hạn Kỹ thuật

1. **CSS Inline trong thẻ `<style>`**: Tối đa 500 dòng per page. Nếu phức tạp hơn, bắt buộc tách thành file CSS dùng chung trong thư mục `css/`.
2. **JS Inline trong thẻ `<script>`**: Tối đa 300 dòng per page. Phải tách logic xử lý phức tạp vào file `.js` riêng.
3. **Hình ảnh & Assets**:
   - KHÔNG nhúng Base64 image có dung lượng quá 50KB trực tiếp vào file code HTML/CSS.
   - Ưu tiên sử dụng SVG vector inline hoặc đường dẫn ảnh tương đối (`.svg`, `.png`, `.webp`).
4. **Không dùng `@import` trong CSS**: Tránh việc chặn tiến trình tải tài nguyên song song của trình duyệt (blocking asset loading).
