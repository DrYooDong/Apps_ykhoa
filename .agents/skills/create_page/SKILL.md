---
name: Create Page / Add Article
description: Guides the creation of new HTML articles, including pathing and layout injection.
---

# Kỹ năng Tạo bài viết / Trang nội dung mới trong CliniPortal

Kỹ năng này định hướng các bước thiết lập khi tạo một trang HTML mới trong bất kỳ phân hệ nào thuộc thư mục `pages/`.

## 🛠️ Quy trình thực hiện:

### Bước 1: Tính toán Đường dẫn Tương đối (`relative_path`)
Đo mức độ sâu thư mục của trang mới so với gốc dự án:
- `pages/[Module]/[file].html` => `relative_path` = `../../`
- `pages/[Module]/[Sub-module]/[file].html` => `relative_path` = `../../../`

### Bước 2: Thiết lập thẻ `<head>`
Nhúng font chữ, bộ icon, các file CSS chung và core scripts với `relative_path` tương đối chính xác:
```html
<link rel="stylesheet" href="[relative_path]/css/reset.css">
<link rel="stylesheet" href="[relative_path]/css/main.css">
<link rel="stylesheet" href="[relative_path]/css/components/header.css">
<link rel="stylesheet" href="[relative_path]/css/components/sidebar.css">
<link rel="stylesheet" href="[relative_path]/css/components/footer.css">
<script src="[relative_path]/js/main.js" defer></script>
<script src="[relative_path]/components/header.js" defer></script>
<script src="[relative_path]/components/footer.js" defer></script>
```

### Bước 3: Nạp dynamic layout
- Thêm div placeholder cho header ở đầu thẻ `<body>`:
  ```html
  <div id="header-placeholder" data-header-path="[relative_path]/components/header.html"></div>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  ```
- Thêm div placeholder cho footer ở cuối thẻ `<body>`:
  ```html
  <div id="footer-placeholder" data-footer-path="[relative_path]/components/footer.html"></div>
  ```

### Bước 4: Thiết lập Sidebar điều hướng cho từng Phân hệ
Sidebar của từng phân hệ cần kế thừa đúng danh mục điều hướng. Trích xuất danh sách liên kết điều hướng từ các tệp cùng phân hệ (ví dụ: copy thẻ `<aside class="app-sidebar">` từ các trang hiện tại trong phân hệ đó).

### Bước 5: Nạp script Sidebar
Ở cuối trang (ngay trước thẻ đóng `</body>`), nhúng script điều khiển sidebar:
```html
<script src="[relative_path]/js/sidebar.js"></script>
```
