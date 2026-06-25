# Thư mục Phân hệ Nội dung (Pages) - CliniPortal

Thư mục này chứa toàn bộ các trang nội dung, công cụ tính toán y khoa, kịch bản kỹ năng lâm sàng và lưu đồ tiếp cận chẩn đoán của hệ sinh thái CliniPortal. Các trang được cấu trúc thành 6 thư mục tương ứng với 6 phân hệ y khoa cốt lõi.

---

## 📁 Cấu trúc Thư mục

```
pages/
├── Công cụ/                # Các bộ tính toán chỉ số lâm sàng (Clinical Calculators)
├── Dược lý/                # Dược động học, tương tác thuốc và phác đồ điều trị triệu chứng
├── Kỹ năng lâm sàng/       # Hướng dẫn quy trình thực hành kỹ năng (OSCE & Bedside skills)
├── Sinh lý - Sinh lý bệnh/ # Cơ chế sinh lý bệnh trực quan (Visual Physiology)
├── Tiếp cận/               # Các thuật toán chẩn đoán & lưu đồ (Interactive Flowcharts)
├── Y học chứng cứ/         # Bộ công cụ dịch tễ học và y học chứng cứ (EBM Tools)
└── (Lưu ý: Các file layout dùng chung như header/footer được lưu tại thư mục /components ngoài thư mục gốc)
```

---

## 🧱 Các Thành phần Dùng chung (Global Shared Layout)

CliniPortal sử dụng cơ chế nhúng động (dynamic layout injection) để đồng bộ hóa Header và Footer trên toàn bộ các trang nội dung mà không cần dùng đến các framework phức tạp:

*   **Nhúng Header**: Ở mỗi trang nội dung, một thẻ div placeholder sẽ được khai báo:
    ```html
    <div id="header-placeholder" data-header-path="[Đường dẫn tương đối tới components/header.html]"></div>
    ```
    Script [header.js](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/components/header.js) sẽ tự động fetch file `header.html`, chèn nội dung vào placeholder và thiết lập trạng thái hoạt động cho mục menu tương ứng.

*   **Nhúng Footer**: Tương tự, thẻ placeholder chân trang:
    ```html
    <div id="footer-placeholder" data-footer-path="[Đường dẫn tương đối tới components/footer.html]"></div>
    ```
    Script [footer.js](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/components/footer.js) sẽ tự động nạp chân trang vào cuối trang web.

---

## 🧭 Hướng dẫn Tạo bài viết/Trang nội dung mới

Khi tạo một trang nội dung mới trong các phân hệ, vui lòng tuân thủ các bước thiết lập chuẩn sau:

1.  **Nhúng CSS cốt lõi**:
    Khai báo các đường dẫn CSS tương đối chính xác ở phần `<head>` (chú ý số lượng dấu `../` phụ thuộc vào cấp độ thư mục của trang mới):
    ```html
    <link rel="stylesheet" href="[path-to-root]/css/reset.css">
    <link rel="stylesheet" href="[path-to-root]/css/main.css">
    <link rel="stylesheet" href="[path-to-root]/css/components/header.css">
    <link rel="stylesheet" href="[path-to-root]/css/components/sidebar.css">
    <link rel="stylesheet" href="[path-to-root]/css/components/footer.css">
    ```

2.  **Nhúng JS điều hướng & Layout**:
    Nhúng các script cần thiết để tự động dựng Header/Footer và nạp Sidebar:
    ```html
    <script src="[path-to-root]/components/header.js" defer></script>
    <script src="[path-to-root]/components/footer.js" defer></script>
    ```

3.  **Khai báo Cấu trúc Layout HTML**:
    Sử dụng cấu trúc bao bọc chuẩn để sidebar co giãn hoạt động đúng cách:
    ```html
    <body>
      <div id="header-placeholder" data-header-path="[path-to-root]/components/header.html"></div>
      <div class="sidebar-overlay" id="sidebarOverlay"></div>

      <div class="app-container">
        <!-- SIDEBAR -->
        <aside class="app-sidebar" id="appSidebar">
            <!-- Sidebar Navigation copy từ các trang mẫu cùng phân hệ -->
        </aside>

        <!-- MAIN WRAPPER -->
        <main class="main-wrapper">
          <!-- BREADCRUMB & NỘI DUNG CHÍNH CỦA BẠN TẠI ĐÂY -->
        </main>
      </div>

      <!-- FOOTER -->
      <div id="footer-placeholder" data-footer-path="[path-to-root]/components/footer.html"></div>

      <!-- Script Sidebar -->
      <script src="[path-to-root]/js/sidebar.js"></script>
    </body>
    ```

4.  **Tích hợp Lưu đồ Tương tác**:
    Nếu trang mới là một thuật toán/lưu đồ lâm sàng, hãy liên kết trực tiếp tới thư viện flowchart dùng chung:
    *   CSS: `<link rel="stylesheet" href="[path-to-root]/css/components/flowchart.css">`
    *   JS: `<script src="[path-to-root]/js/flowchart.js"></script>`
    *   *Tham khảo cấu trúc mã nguồn mẫu tại:* [flowchart-template.html](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/pages/Ti%E1%BA%BFp%20c%E1%BA%ADn/flowchart-template.html).
