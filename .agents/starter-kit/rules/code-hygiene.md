# Code Hygiene & Clean Code Rules

1. **Vanilla JS Modularization**: Khi một tệp JS vượt quá 1000 dòng, chủ động phân tách logic thành các module hàm thuần túy (pure functions) hoặc service riêng biệt.
2. **Không biến toàn cục bừa bãi**: Tránh khai báo biến tràn lan trên `window`; gom vào object namespace hoặc ES Module.
3. **An toàn DOM**: Luôn kiểm tra phần tử tồn tại trước khi thao tác (`el && el.addEventListener(...)`).
4. **Xử lý ngoại lệ**: Bọc các tác vụ I/O, `JSON.parse()`, `localStorage` bằng khối `try...catch` an toàn.
