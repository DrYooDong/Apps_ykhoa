---
name: systematic-clinical-debugging
description: Quy trình chẩn đoán và sửa lỗi hệ thống lâm sàng — vỡ layout mobile, xung đột CSS Variables, lỗi Header/Footer dynamic không load, và kiểm thử tác động dây chuyền qua Graphify.
---

# Systematic Clinical Debugging — CliniPortal

Hướng dẫn quy trình 5 bước để chẩn đoán, khoanh vùng và khắc phục sự cố hiển thị/lập trình trên hệ sinh thái CliniPortal mà không gây side-effects sang các phân hệ khác.

---

## 🔍 Quy trình Debug 5 Bước

### Bước 1: Tra cứu Đồ thị Phụ thuộc (`graphify-out`)
Trước khi sửa bất kỳ file JS/CSS nào (đặc biệt là các Hub Modules như `main.js`, `guidelines.js`, `benh-ly.js`), hãy kiểm tra fan-in bằng tool CLI:
```bash
node tools/tools/scratch/query_graph.js <tên_file_hoặc_hàm>
```
Nếu file có chỉ số Rủi ro `CRITICAL HUB` hoặc `HIGH RISK`, mọi sửa đổi cần giữ nguyên API contract và signature.

### Bước 2: Kiểm tra Đường dẫn Tương đối (Relative Path Check)
Nếu Header/Footer không hiển thị hoặc mất CSS:
- Kiểm tra thuộc tính `data-header-path` và `data-footer-path` trên thẻ placeholder.
- Đếm số cấp thư mục để đảm bảo prefix `../` chính xác.

### Bước 3: Đăng ký & Xung đột CSS Variables
Nếu màu sắc hoặc giao diện bị sai ở Dark Mode:
- Kiểm tra xem màu có đang bị hardcode hex color thay vì `var(--color-primary)` hay không.
- Kiểm tra tính thứ tự load CSS: `reset.css` → `main.css` → `components/header.css` → `[module].css`.

### Bước 4: Kiểm tra HTML Integrity
Trước và sau khi thay đổi file HTML, chạy script kiểm tra thẻ đóng:
```bash
node tools/tools/scratch/check_tags.js <file.html>
```

### Bước 5: Thử nghiệm Mobile & Responsive (Width ≤ 768px)
Kiểm tra giao diện trên màn hình nhỏ:
- Card y khoa không bị tràn lề (`overflow-x: hidden`).
- Các nút bấm tính toán có kích thước tối thiểu 44x44px cho thao tác cảm ứng.
