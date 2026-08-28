---
name: code-reviewer
description: Quy trình tự động review mã nguồn HTML/CSS/JS y khoa, kiểm tra tính tuân thủ quy tắc workspace, tính toàn vẹn thẻ và tiêu chuẩn EBM. Kích hoạt khi cần review mã nguồn trước khi bàn giao.
---

# Code Reviewer & Compliance Checker

Skill này cung cấp tiêu chuẩn kiểm tra mã nguồn y khoa toàn diện cho CliniPortal.

## 📋 Checklist Code Review

### 1. HTML & Accessibility
- [ ] Chỉ có **duy nhất 1 thẻ `<h1>`** trên mỗi trang HTML.
- [ ] Không có ID trùng lặp.
- [ ] Đường dẫn CSS/JS tương đối chính xác theo cấp thư mục (`../`, `../../`...).
- [ ] Đã chạy `node tools/tools/scratch/check_tags.js <file.html>` và không có lỗi đóng/mở thẻ.

### 2. CSS & Design Tokens
- [ ] 100% tương thích Dark Mode (`data-theme="dark"`).
- [ ] Tuyệt đối không hardcode hex code màu sắc, dùng biến `var(--color-...)`.
- [ ] Nút bấm đạt kích thước cảm ứng tối thiểu **44x44px**.

### 3. JavaScript & Performance
- [ ] Dùng Vanilla JS thuần, không dùng thư viện ngoài.
- [ ] Khai báo `defer` cho script ở cuối tag `<body>`.
- [ ] Không có lỗi runtime ReferenceError, TypeError.

### 4. Y học Chứng cứ (EBM)
- [ ] Bài viết/phác đồ có trích dẫn nguồn uy tín (NICE, ESC, ACC/AHA, BYT...) + năm cập nhật.
- [ ] Các thông tin cảnh báo an toàn thuốc/chống chỉ định được highlight rõ ràng.

### 5. Ma Trận Đánh Giá 2 Trục (Học từ Expo Monorepo)
Mọi phát hiện khi review phải được phân loại rõ ràng theo 2 trục độc lập:
- **Confidence (Độ tin cậy)**:
  - `High`: Có bằng chứng code/đường dẫn cụ thể, tái hiện được 100%.
  - `Medium`: Bằng chứng logic mạnh, có nguy cơ xảy ra ở trạng thái runtime thực tế.
  - `Low`: Suy đoán hoặc ý kiến chủ quan (bỏ qua, không báo cáo gây loãng).
- **Impact if shipped (Mức độ ảnh hưởng)**:
  - `Critical`: Sai sót liều thuốc / chỉ định y khoa nguy hiểm, lộ thông tin bảo mật, sập layout chính.
  - `Warning`: Vỡ giao diện di động, link tài nguyên 404, xung đột CSS Variables.
  - `Suggestion`: Gợi ý làm đẹp code hoặc cải thiện ngữ nghĩa.

### 6. Bộ Công Cụ Kiểm Tra Tự Động (QA Automation)
- Chạy `node tools/qa_suite.js` để quét toàn diện:
  - Tính toàn vẹn của tất cả tài nguyên ảnh/video/PDF nội bộ (Asset References).
  - Văn bản neo liên kết chuẩn SEO và WCAG AAA (Link Text Quality).
  - Lỗi đánh máy lặp từ liên tiếp trong bài viết y khoa (Repeated Words Detection).
- Chạy `node tools/scratch/check_tags.js <file.html>` để đảm bảo thẻ HTML đóng/mở chuẩn xác.

