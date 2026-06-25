# Thư mục Kịch bản JavaScript (Scripts) - CliniPortal

Thư mục này chứa toàn bộ các kịch bản JavaScript để xử lý logic tương tác động, điều khiển bố cục (layout) và duy trì trạng thái người dùng (như cài đặt sáng/tối, trạng thái thu gọn sidebar).

---

## 📁 Cấu trúc Thư mục

```
js/
├── main.js                  # Kịch bản chính điều khiển toàn ứng dụng
├── sidebar.js               # Điều khiển trạng thái thu gọn/mở rộng thanh Sidebar
├── clinical-skill-tabs.js   # Điều khiển chuyển tab trong các bài viết kỹ năng
└── flowchart.js             # Logic tương tác dùng chung cho lưu đồ/flowchart
```

---

## ⚙️ Chi tiết vai trò của từng Kịch bản

### 1. Kịch bản điều khiển chung (`main.js`)
*   **Quản lý Giao diện Sáng/Tối (Theme Switching)**: Lắng nghe sự kiện bật tắt chế độ Dark Mode từ nút bấm trên Header, cập nhật thuộc tính `data-theme` trên thẻ `<html>`, và tự động lưu lựa chọn vào `localStorage` của trình duyệt để duy trì trạng thái ở các phiên làm việc sau.
*   **Đồng bộ giao diện hệ thống**: Tự động phát hiện cài đặt giao diện tối của hệ điều hành người dùng nếu họ chưa từng cấu hình thủ công.
*   **Tiện ích chung**: Hỗ trợ các hàm tương tác toàn trang khác.

### 2. Kịch bản thanh điều hướng bên (`sidebar.js`)
*   **Thu gọn/Mở rộng Sidebar**: Điều khiển hiệu ứng co giãn của thanh điều hướng chính (`.app-sidebar`) khi người dùng click vào nút mũi tên.
*   **Duy trì trạng thái hiển thị**: Trạng thái đóng/mở sidebar được ghi nhớ tự động thông qua `localStorage` (biến `sidebarCollapsed`), giúp giao diện không bị giật hay thay đổi kích thước đột ngột khi chuyển tiếp giữa các trang HTML khác nhau.
*   **Tương tác trên Mobile**: Xử lý vuốt chạm và lớp phủ nền (`.sidebar-overlay`) khi sidebar hoạt động như một menu trượt (drawer menu) trên màn hình điện thoại di động.

### 3. Kịch bản Lưu đồ tương tác (`flowchart.js`)
*   **Chuyển đổi Sơ đồ phụ (`switchPane`)**: Cho phép người dùng chuyển nhanh giữa các phân nhánh thuật toán lớn (ví dụ: chuyển từ sơ đồ Chẩn đoán sang sơ đồ Xử trí cấp cứu) mà không cần tải lại trang.
*   **Xổ thông tin chi tiết Node (`toggleNode`)**: Mở rộng hoặc thu gọn bảng thông tin lâm sàng chi tiết (`.fnode-details`) dưới dạng accordion khi click vào các Node có biểu tượng mũi tên, giúp giao diện lưu đồ gọn gàng, trực quan.
*   **Tự động liên kết bộ tính toán**: Tự động tìm kiếm các ô nhập liệu của bộ tính toán R-Ratio lâm sàng (nếu có trên trang) và gắn sự kiện kích hoạt bằng phím Enter.

### 4. Kịch bản tab kỹ năng lâm sàng (`clinical-skill-tabs.js`)
*   Kịch bản gọn nhẹ xử lý việc chuyển đổi nội dung giữa các tab quy trình thực hành (Chuẩn bị, Tiến hành, Theo dõi, Tai biến) trong các trang hướng dẫn thực hành kỹ năng lâm sàng.

---

## ⚠️ Nguyên tắc Phát triển JavaScript

1.  **Sử dụng Vanilla JS (JavaScript thuần)**: Toàn bộ mã nguồn viết bằng JS gốc chuẩn ES6+, không sử dụng các thư viện cồng kềnh bên ngoài (như jQuery) để đảm bảo tốc độ tải trang nhanh nhất.
2.  **Bảo vệ Phạm vi Biến (Scope Protection)**: Định nghĩa các hàm rõ ràng, tránh sử dụng biến toàn cục trùng tên gây xung đột.
3.  **Tương thích với local files**: Đảm bảo các đường dẫn tương đối hoạt động tốt khi người dùng chạy ứng dụng trực tiếp bằng giao thức file trên trình duyệt (`file:///...`) lẫn khi chạy qua máy chủ cục bộ (Web Server).
