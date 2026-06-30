# Thư mục Định dạng CSS (Stylesheets) - CliniPortal

Thư mục này chứa toàn bộ hệ thống định dạng (styling) của CliniPortal, được thiết kế theo kiến trúc module hóa để tối ưu hóa hiệu năng tải trang và dễ dàng bảo trì giao diện.

---

## 📁 Cấu trúc Thư mục

```
css/
├── components/           # Các stylesheet của các thành phần giao diện dùng chung
│   ├── header.css        # Thanh điều hướng đầu trang (Navigation Header)
│   ├── sidebar.css       # Thanh trình đơn bên cạnh (Accordion Sidebar)
│   ├── footer.css        # Chân trang (Footer)
│   ├── clinical-skill.css # Giao diện tab kỹ năng lâm sàng
│   ├── flowchart.css     # Thư viện dùng chung cho lưu đồ/flowchart tương tác
│   ├── abg-calculator.css # Giao diện bộ tính toán khí máu động mạch (ABG)
│   ├── insulin-calculator.css # Giao diện bộ tính toán chỉnh liều Insulin
│   ├── pharmacology-symptoms.css # Giao diện phân hệ dược lý theo triệu chứng
│   ├── approach-hub.css  # Hub tiếp cận lâm sàng
│   ├── approach-card.css # Giao diện thẻ tiếp cận lâm sàng
│   ├── approach-detail.css # Giao diện trang tiếp cận chi tiết
│   ├── physio-patho.css  # Giao diện tổng quan Sinh lý - Sinh lý bệnh
│   ├── physio-content.css # Định dạng nội dung bài học Sinh lý - Sinh lý bệnh
│   ├── physio-headings.css # Định dạng tiêu đề bài học Sinh lý - Sinh lý bệnh
│   ├── toc.css           # Cột mục lục tự động (Table of Contents)
│   └── benh-an.css       # Giao diện mẫu bệnh án điện tử tương tác
├── main.css              # Hệ thống thiết kế cốt lõi (Core Design System)
└── reset.css             # Thiết lập lại CSS mặc định của các trình duyệt (Reset CSS)
```

---

## 🎨 Hệ thống Thiết kế Cốt lõi (`main.css`)

Tập tin `main.css` đóng vai trò là xương sống cho giao diện của dự án, bao gồm các phần chính sau:

1.  **Hệ thống biến Design Tokens (`:root`)**:
    *   **Màu sắc**: Khai báo bảng màu sắc chuẩn HSL (chủ đạo Xanh dương `#0284c7`, màu cảnh báo nguy cơ, màu nền, v.v.).
    *   **Giao diện Tối (`[data-theme="dark"]`)**: Khai báo lại toàn bộ mã màu nền tối, màu chữ phản chiếu tương thích giúp chuyển đổi giao diện mượt mà không cần reload trang.
    *   **Typography**: Định nghĩa các kích thước font (`--text-xs` đến `--text-4xl`) và độ dày chữ chuẩn.
    *   **Bán kính bo góc & Đổ bóng**: Định chuẩn `--radius-sm` đến `--radius-full`, cùng hệ thống đổ bóng `--shadow-sm` đến `--shadow-xl`.

2.  **Bố cục Layout**:
    *   Cấu trúc grid và flexbox chuẩn cho màn hình lớn (Desktop) và di động (Mobile Responsive).
    *   Tối ưu hóa các lớp bao bọc chính như `.app-container`, `.main-wrapper`, và `.main-content-grid`.

3.  **Thành phần Tiện ích (Utility Classes)**:
    *   Các lớp tiện ích căn chỉnh nhanh như padding, margin, text alignment, hide/show, hiệu ứng chuyển cảnh mượt mà (`transition`).

---

## 🛠️ Quy định khi Thiết lập Styling mới

*   **Không viết đè CSS inline**: Tránh sử dụng thuộc tính `style="..."` trực tiếp trong mã HTML. Hãy tận dụng các biến thiết kế hoặc lớp CSS đã khai báo sẵn trong `main.css`.
*   **Kế thừa từ Design Tokens**: Luôn luôn sử dụng biến CSS khi định nghĩa màu sắc hoặc kích thước để đảm bảo Dark Mode hoạt động chuẩn xác.
    *   *Ví dụ đúng:* `color: var(--color-primary); background: var(--color-surface);`
    *   *Ví dụ sai:* `color: #0284c7; background: #ffffff;`
*   **Responsive-first**: Viết style ưu tiên cho hiển thị di động trước, sau đó dùng `@media (min-width: 768px)` hoặc `@media (min-width: 1024px)` để mở rộng giao diện trên máy tính.
*   **Tránh xung đột tên lớp**: Đặt tên class theo chuẩn BEM hoặc tiền tố cụ thể (Ví dụ: các thành phần lưu đồ y khoa đều sử dụng tiền tố `.flow-` hoặc `.fnode-`).
