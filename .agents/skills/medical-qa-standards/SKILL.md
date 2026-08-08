---
name: medical-qa-standards
description: >
  Kỹ năng kiểm tra chất lượng (QA), đánh giá tiêu chuẩn mã nguồn, kiểm tra liên kết tương đối,
  toàn vẹn thẻ HTML, dark mode và kiểm thử y khoa trước khi hoàn tất hoặc commit bất kỳ tác vụ nào trong CliniPortal.
---

# Medical QA Standards & Audit Skill

Skill này quy định quy trình kiểm tra chất lượng toàn diện (Quality Assurance & Audit) cho mọi tính năng, bài viết, và công cụ trong CliniPortal.

---

## 🛑 THỜI ĐIỂM KÍCH HOẠT SKILL

Kích hoạt Skill này khi:
1. Chuẩn bị kết thúc một Task lớn hoặc bàn giao trang/tính năng mới.
2. Kiểm tra lại toàn bộ liên kết, layout, dark mode, responsive trước khi commit.
3. Người dùng yêu cầu *"QA trang X"*, *"Check lỗi"*, hoặc *"Audit lại code"*.

---

## 📋 QUY TRÌNH CHECKLIST 6 BƯỚC THỰC HIỆN QA

### Bước 1: Kiểm Tra Đường Dẫn Tương Đối (Relative Paths Audit)
- Mọi thẻ `<link rel="stylesheet">`, `<script src="...">`, `<a href="...">`, `<img src="...">` phải dùng **đường dẫn tương đối chính xác** theo cấp thư mục.
- Kiểm tra tính khớp prefix:
  - Cấp 0 (Root): `./`
  - Cấp 1 (`pages/x.html`): `../`
  - Cấp 2 (`pages/sub/x.html`): `../../`
  - Cấp 3 (`pages/sub/sub2/x.html`): `../../../`
  - Cấp 4 (`src/content/ebm/guidelines/kho-guidelines/x.html`): `../../../../`

### Bước 2: Kiểm Tra Thẻ Đóng Mở HTML (HTML Integrity Audit)
Chạy script tự động kiểm tra HTML tags:
```bash
node scratch/check_tags.js <path_to_html_file>
```
- Phải đảm bảo 0 lỗi unclosed tag (`<div>`, `<span>`, `<table>`, `<tr>`, `<td>`...).
- Mỗi trang chỉ chứa duy nhất 1 thẻ `<h1>`.
- Không trùng lặp thuộc tính `id=""` trên cùng một trang.

### Bước 3: Kiểm Tra Tương Thích Dark Mode
- Bật `data-theme="dark"` trên thẻ `<html>`.
- Đảm bảo màu chữ hiển thị rõ ràng trên nền tối (`var(--color-text)`, `var(--color-bg)`).
- Không có phần tử bị "cháy màu" hoặc lộ nền trắng cứng (Hardcoded white `#ffffff`).

### Bước 4: Kiểm Tra Tác Động Dây Chuyền (Graphify Risk Audit)
Nếu thay đổi có đụng chạm đến file JS/CSS cốt lõi:
```bash
node scratch/query_graph.js <filename>
```
- Đánh giá chỉ số Fan-in và kiểm tra side-effects trên các Hub liên quan (`main.js`, `guidelines.js`, `benh-ly.js`).

### Bước 5: Kiểm Tra Trích Dẫn Y Văn & Văn Phong (Medical Quality Audit)
- Nội dung y khoa có trích dẫn nguồn uy tín (ACC/AHA, ESC, NICE, KDIGO, BYT...) + năm xuất bản.
- Có phân loại khuyến cáo Class/LoE chuẩn xác.
- Đã loại bỏ các câu từ AI rườm rà (Medical Humanizer pass).

### Bước 6: Đồng Bộ Registry Hệ Thống
- File mới đã được bổ sung vào `docs/FILE_MAP.md`.
- Guideline mới đã đăng ký trong `guidelinesdata.js`.
- Bệnh lý mới đã đăng ký trong `benh-ly.js`.
- Máy tính lâm sàng mới đã được gắn liên kết trên menu `cong-cu.html`.
