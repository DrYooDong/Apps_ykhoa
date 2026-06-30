# Thư mục Kịch bản JavaScript (Scripts) - CliniPortal

Thư mục này chứa toàn bộ các kịch bản JavaScript để xử lý logic tương tác động, điều khiển bố cục (layout) và duy trì trạng thái người dùng (như cài đặt sáng/tối, trạng thái thu gọn sidebar).

---

## 📁 Cấu trúc Thư mục

```
js/
├── main.js                  # Kịch bản chính điều khiển toàn ứng dụng (bao gồm cả toggle theme & co giãn sidebar)
├── clinical-skill-tabs.js   # Điều khiển chuyển tab trong các bài viết kỹ năng lâm sàng
├── flowchart.js             # Logic tương tác dùng chung cho lưu đồ/flowchart
├── pharmacology-symptoms.js # Xử lý tương tác phân hệ Dược lý theo triệu chứng
├── approach-hub.js          # Logic điều khiển trang Hub tiếp cận lâm sàng
├── physio-patho.js          # Logic và kịch bản chung cho Sinh lý - Sinh lý bệnh (Lightbox, Lazyload)
├── toc.js                   # Logic tự động xây dựng mục lục (TOC) cuộn trang thông minh
├── benh-an.js               # Xử lý tương tác mẫu bệnh án điện tử nội khoa
└── calculators/             # Thư mục chứa các bộ tính toán lâm sàng phức tạp
    ├── abg-calculator.js    # Logic tính toán & biện luận khí máu động mạch (ABG)
    └── insulin-calculator.js # Logic tính toán chỉnh liều Insulin động
```

---

## ⚙️ Chi tiết vai trò của từng Kịch bản

### 1. Kịch bản điều khiển chung (`main.js`)
*   **Quản lý Giao diện Sáng/Tối (Theme Switching)**: Lắng nghe sự kiện bật tắt chế độ Dark Mode từ nút bấm trên Header, cập nhật thuộc tính `data-theme` trên thẻ `<html>`, và tự động lưu lựa chọn vào `localStorage` của trình duyệt để duy trì trạng thái ở các phiên làm việc sau.
*   **Đồng bộ giao diện hệ thống**: Tự động phát hiện cài đặt giao diện tối của hệ điều hành người dùng nếu họ chưa từng cấu hình thủ công.
*   **Thu gọn/Mở rộng Sidebar**: Điều khiển hiệu ứng co giãn của thanh điều hướng chính (`.app-sidebar`) khi người dùng click vào nút mũi tên (desktop) hoặc nút menu (mobile). Được gộp từ `sidebar.js` cũ để tối ưu hóa việc quản lý mã nguồn.
*   **Tiện ích chung**: Hỗ trợ các hàm tương tác toàn trang khác như phím tắt tìm kiếm "/", và modal Cài đặt & Đồng bộ dữ liệu.

### 2. Kịch bản Lưu đồ tương tác (`flowchart.js`)
*   **Chuyển đổi Sơ đồ phụ (`switchPane`)**: Cho phép người dùng chuyển nhanh giữa các phân nhánh thuật toán lớn (ví dụ: chuyển từ sơ đồ Chẩn đoán sang sơ đồ Xử trí cấp cứu) mà không cần tải lại trang.
*   **Xổ thông tin chi tiết Node (`toggleNode`)**: Mở rộng hoặc thu gọn bảng thông tin lâm sàng chi tiết (`.fnode-details`) dưới dạng accordion khi click vào các Node có biểu tượng mũi tên, giúp giao diện lưu đồ gọn gàng, trực quan.
*   **Tự động liên kết bộ tính toán**: Tự động tìm kiếm các ô nhập liệu của bộ tính toán R-Ratio lâm sàng (nếu có trên trang) và gắn sự kiện kích hoạt bằng phím Enter.

### 3. Kịch bản tab kỹ năng lâm sàng (`clinical-skill-tabs.js`)
*   Kịch bản gọn nhẹ xử lý việc chuyển đổi nội dung giữa các tab quy trình thực hành (Chuẩn bị, Tiến hành, Theo dõi, Tai biến) trong các trang hướng dẫn thực hành kỹ năng lâm sàng.

### 4. Kịch bản các Bộ tính toán Lâm sàng (`calculators/`)
*   **Khí máu động mạch (`abg-calculator.js`)**: Thực hiện quy trình 6 bước chẩn đoán toan kiềm tự động, tính khoảng trống Anion (AG), AG hiệu chỉnh theo Albumin, Delta-Delta Ratio và gợi ý nguyên nhân lâm sàng phù hợp.
*   **Chỉnh liều Insulin (`insulin-calculator.js`)**: Tính toán liều lượng insulin nền/nhanh động dựa trên chỉ số đường huyết hiện tại và phác đồ điều chỉnh nội trú.

### 5. Kịch bản bổ trợ chuyên khoa (`pharmacology-symptoms.js`, `approach-hub.js`, `physio-patho.js`, `toc.js`, `benh-an.js`)
*   **`pharmacology-symptoms.js`**: Điều khiển hiển thị và tương tác các bộ thuốc theo triệu chứng.
*   **`approach-hub.js`**: Xử lý việc tìm kiếm, phân loại và lọc các sơ đồ tiếp cận.
*   **`physio-patho.js` & `toc.js`**: Hỗ trợ hiển thị bài viết sinh học trực quan (lightbox phóng to ảnh) và cột mục lục động bám dính (sticky TOC) giúp điều hướng nhanh trong các bài viết dài.
*   **`benh-an.js`**: Điều khiển logic form, kiểm tra ràng buộc dữ liệu đầu vào và hỗ trợ xuất bản in cho biểu mẫu Bệnh án Nội khoa điện tử.

---

## ⚠️ Nguyên tắc Phát triển JavaScript

1.  **Sử dụng Vanilla JS (JavaScript thuần)**: Toàn bộ mã nguồn viết bằng JS gốc chuẩn ES6+, không sử dụng các thư viện cồng kềnh bên ngoài (như jQuery) để đảm bảo tốc độ tải trang nhanh nhất.
2.  **Bảo vệ Phạm vi Biến (Scope Protection)**: Định nghĩa các hàm rõ ràng, tránh sử dụng biến toàn cục trùng tên gây xung đột.
3.  **Tương thích với local files**: Đảm bảo các đường dẫn tương đối hoạt động tốt khi người dùng chạy ứng dụng trực tiếp bằng giao thức file trên trình duyệt (`file:///...`) lẫn khi chạy qua máy chủ cục bộ (Web Server).
