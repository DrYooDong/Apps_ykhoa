# Hướng dẫn sử dụng bộ CSS chung cho Sinh lý - Sinh lý bệnh

Thư mục này chứa bộ CSS dùng chung (`css/physio-shared.css`) giúp trình bày các nội dung kiến thức y khoa chuyên sâu một cách gọn gàng, hiện đại và trực quan.

---

## 📁 Cấu trúc Thư mục Phân hệ

```
Sinh lý - Sinh lý bệnh/
├── Sinhly/                    # Bài học sinh lý học chi tiết theo từng hệ cơ quan
│   ├── Phan1/                 # Đại cương tế bào & Điện sinh lý
│   ├── Phan2/                 # Sinh lý hệ Thần kinh - Cơ
│   ├── Phan3/                 # Sinh lý Máu & Miễn dịch
│   ├── Phan4/                 # Sinh lý hệ Tuần hoàn & Hô hấp
│   ├── Phan5/                 # Sinh lý hệ Tiêu hóa & Chuyển hóa
│   ├── Phan6/                 # Sinh lý hệ Thận - Tiết niệu & Toan kiềm
│   ├── Phan7/                 # Sinh lý hệ Nội tiết & Sinh sản
│   └── Note sinh ly.md        # Ghi chú tổng hợp nội dung sinh lý học
├── Sinhlybenh/                # Bài học sinh lý bệnh học (định hướng phát triển tiếp theo)
├── css/
│   └── physio-shared.css      # Stylesheet dùng chung cho toàn bộ phân hệ Sinh lý
├── js/
│   └── physio-shared.js       # Kịch bản hỗ trợ hiệu ứng hiển thị hình ảnh y khoa
├── images/                    # Kho ảnh minh họa y khoa dùng chung (được phân theo các Phan1-Phan7)
├── Sinhly-sinhlybenh.html     # Trang Hub điều hướng chính của phân hệ Sinh lý
└── README.md                  # Tài liệu hướng dẫn này
```

---

## 1. Cách tích hợp Tài nguyên chung

### 1.1 Tích hợp CSS
Nhúng dòng sau vào thẻ `<head>` của tệp HTML:

```html
<link rel="stylesheet" href="../../css/physio-shared.css">
```
*(Lưu ý: Thay đổi đường dẫn tương đối tùy theo độ sâu thư mục chứa file HTML, ví dụ: `../../css/physio-shared.css` hoặc `../../../css/physio-shared.css`)*

### 1.2 Tích hợp JavaScript (Tối ưu hình ảnh & Lightbox)
Nhúng dòng sau vào thẻ `<head>` (với thuộc tính `defer`) hoặc trước thẻ đóng `</body>`:

```html
<script src="../../js/physio-shared.js" defer></script>
```
*(Lưu ý: Script này tự động thiết lập Lazy Loading kèm theo hiệu ứng chuyển cảnh mềm mại cho hình ảnh và tự động cấu hình bộ mở ảnh thu phóng Lightbox toàn màn hình kèm phân tích chú thích).*

### 1.3 Tích hợp Mục lục Tự động (TOC)
Nhúng cả stylesheet và script sau vào thẻ `<head>` của tệp HTML để kích hoạt cột mục lục tự động bên phải (Desktop) hoặc nút trượt drawer di động (Mobile):

```html
<!-- Dành cho tệp tin ở cấp 4 (ví dụ: pages/Sinh lý - Sinh lý bệnh/Sinhly/PhanX/file.html) -->
<link rel="stylesheet" href="../../../../css/components/toc.css">
<script src="../../../../js/toc.js" defer></script>
```
*(Lưu ý: Tệp lệnh tự động phát hiện các thẻ H2/H3 trong vùng nội dung học tập để tự xây dựng sơ đồ liên kết, hỗ trợ cuộn trang thông minh có khoảng cách bù trừ và kích hoạt ScrollSpy đồng bộ hóa cuộn).*

---

## 2. Các thành phần giao diện & Hướng dẫn sử dụng

### 2.1 Tiêu đề đầu bài học dạng Card (`.chapter-header`)
Thay thế tiêu đề dạng văn bản thông thường bằng một thẻ Card nổi bật, có màu viền chủ đạo, bóng mờ và hiệu ứng phát sáng nhẹ.
```html
<div class="chapter-header">
  <h1>Bài học: Tên bài học của bạn ở đây</h1>
  <p>Mô tả tóm tắt nội dung chính hoặc mục tiêu bài học...</p>
</div>
```

---

### 2.2 Các kiểu danh sách trình bày kiến thức gọn gàng

#### a. Chuỗi các bước diễn tiến / Timeline liên tục (`.physio-steps`)
Thích hợp cho các chu trình sinh lý (ví dụ: vòng tuần hoàn túi synapse, cơ chế đông máu, chuỗi phản ứng men).
```html
<ol class="physio-steps">
  <li>
    <div class="physio-step-card">
      <span class="physio-step-title">Bước 1: Tên bước</span>
      Nội dung mô tả chi tiết bước 1 ở đây...
    </div>
  </li>
  <li>
    <div class="physio-step-card">
      <span class="physio-step-title">Bước 2: Tên bước</span>
      Nội dung mô tả chi tiết bước 2 ở đây...
    </div>
  </li>
</ol>
```

#### b. Thẻ lưới nằm song song (`.physio-grid`)
Thay vì viết một danh sách dài thụt dòng thẳng đứng, chia các nội dung nhỏ thành các cột thẻ nằm cạnh nhau để tối ưu hóa diện tích.
```html
<div class="physio-grid">
  <div class="physio-grid-card">
    <div class="physio-grid-title">🧬 Tiêu đề thẻ 1</div>
    <p>Nội dung chi tiết khái niệm hoặc đặc tính 1...</p>
  </div>
  <div class="physio-grid-card">
    <div class="physio-grid-title">🧪 Tiêu đề thẻ 2</div>
    <p>Nội dung chi tiết khái niệm hoặc đặc tính 2...</p>
  </div>
</div>
```

#### c. Danh sách thuộc tính / Hằng số dạng dòng (`.physio-property-list`)
Rất phù hợp để giải thích các hằng số vật lý, công thức, hoặc định nghĩa ngắn gọn.
```html
<ul class="physio-property-list">
  <li>
    <span class="physio-property-name">Tên thuộc tính (ví dụ: Hằng số thời gian - τ)</span>
    <span class="physio-property-desc">Định nghĩa hoặc giải thích chi tiết thuộc tính đó ở đây...</span>
  </li>
</ul>
```

#### d. Danh sách dấu đầu dòng tùy chỉnh
*   **Danh sách mũi tên hướng dẫn hành động (`.physio-list-arrow`)**:
    ```html
    <ul class="physio-list-arrow">
      <li>Nội dung 1</li>
      <li>Nội dung 2</li>
    </ul>
    ```
*   **Danh sách dấu tích lâm sàng (`.physio-list-check`)**: Thích hợp cho các tiêu chuẩn chẩn đoán, tác dụng phụ, triệu chứng.
    ```html
    <ul class="physio-list-check">
      <li>Nội dung 1</li>
      <li>Nội dung 2</li>
    </ul>
    ```

---

### 2.3 Thiết kế bảng biểu chuyên nghiệp

Để bảng tự động hiển thị thanh cuộn ngang khi xem trên điện thoại di động, luôn bao bọc thẻ `<table>` trong thẻ `<div class="table-responsive">`.

#### a. Bảng so sánh đặc tính (`.physio-table-compare`)
Nổi bật hàng tiêu đề gradient và cột đầu tiên có màu nền xám nhạt để dễ so sánh đối chiếu.
```html
<div class="table-responsive">
  <table class="physio-table physio-table-compare">
    <thead>
      <tr>
        <th>Đặc tính</th>
        <th>Loại A</th>
        <th>Loại B</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Kích thước</strong></td>
        <td>Cực nhỏ</td>
        <td>Lớn hơn</td>
      </tr>
    </tbody>
  </table>
</div>
```

#### b. Bảng tóm tắt nội dung (`.physio-table-summary`)
Phiên bản thu gọn hơn với chữ nhỏ và căn lề tối giản để tóm lược thông tin nhanh.
```html
<div class="table-responsive">
  <table class="physio-table physio-table-summary">
    <!-- Cấu trúc thead và tbody thông thường -->
  </table>
</div>
```

---

### 2.4 Soạn thảo văn bản và Từ khóa nổi bật

*   **Đoạn mở đầu nổi bật (`.physio-lead`)**: Giúp chữ to và dễ đọc hơn ở phần giới thiệu đầu chương.
    ```html
    <p class="physio-lead">Nội dung đoạn giới thiệu...</p>
    ```
*   **Trích dẫn / Hộp ghi chú nhanh (`.physio-quote`)**:
    ```html
    <div class="physio-quote">
      "Nội dung lưu ý hoặc trích dẫn..."
    </div>
    ```
*   **Highlight từ khóa sinh học chính (`.term-hl`)**: Dùng cho tên thụ thể, protein, ion quan trọng.
    ```html
    Gắn vào thụ thể <span class="term-hl">Nicotinic ACh</span>...
    ```
*   **Highlight từ khóa phụ (`.term-hl-secondary`)**: Dùng cho tên chất hóa học, enzyme điều hòa liên quan.
    ```html
    Phân hủy bởi enzyme <span class="term-hl-secondary">Acetylcholinesterase</span>...
    ```
