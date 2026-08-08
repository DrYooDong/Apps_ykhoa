---
name: project-error-audit
description: >
  Skill kiểm tra toàn diện rủi ro & lỗi kỹ thuật trước khi kết thúc bất kỳ dự án / task nào trong CliniPortal.
  Kích hoạt khi AI chuẩn bị hoàn thành task, bàn giao tính năng mới, hoặc khi người dùng yêu cầu kiểm tra lỗi trước khi commit.
---

# Project Error Audit & Pre-Completion Verification Skill

Tài liệu này quy định **quy trình kiểm tra chất lượng mã nguồn bắt buộc (Pre-Completion Checklist)** mà AI phải thực thi trước khi tuyên bố hoàn thành bất kỳ task nào trong CliniPortal.

---

## 🛑 Nguyên Tắc Bắt Buộc (Mandatory Rule)

> **KHÔNG ĐƯỢC PHÉP tuyên bố task đã hoàn thành nếu chưa chạy lệnh kiểm tra lỗi tổng hợp `node scratch/master_project_audit.js` và xác nhận kết quả PASSED.**

---

## ⚡ Quy Trình Kiểm Tra Lỗi 4 Bước (4-Step Audit Workflow)

```
[Bước 1: Chạy Master Audit Script] ──> [Bước 2: Phân Tích Log Lỗi & Rủi Ro] ──> [Bước 3: Vá Lỗi An Toàn NodeJS Patch] ──> [Bước 4: Xác Nhận & Cập Nhật Log]
```

### 🔹 Bước 1: Chạy Script Master Audit 1-Click
Thực thi lệnh kiểm tra tự động trên toàn bộ mã nguồn nguồn:
```bash
node scratch/master_project_audit.js
```
Script sẽ tự động quét 7 hạng mục:
1. **HTML Structural Tag Balance**: Cân bằng thẻ `<div>`, `<main>`, `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`.
2. **JavaScript Syntax**: Kiểm tra cú pháp ES6+ của 100% file `.js` bằng `node -c`.
3. **Design Tokens & Hardcoded Colors**: Phát hiện màu hex viết cứng vi phạm quy chuẩn CSS Variables.
4. **Relative Path Level**: Kiểm tra tính đúng đắn của tiền tố đường dẫn tương đối (Cấp 3: `../../../`, Cấp 4: `../../../../`).
5. **Critical Hub Integrity**: Kiểm tra sự tồn tại và tính hợp lệ của các file trung tâm (`main.js`, `cliniportal-sync.js`, `guidelinesdata.js`, v.v.).
6. **Text & Math ($) Formatting**: Kiểm tra số lượng ký tự `$` lẻ (unmatched math formula) và ký hiệu LaTeX thô (`\ge`, `\le`, `\rightarrow`).
7. **Bullets, Numbering & Heading Styles**: Phát hiện raw bullets (`•`, `⁃`), số thứ tự viết thủ công trong `<p>`, heading nhảy cấp hoặc heading giả (`<p><strong>Title</strong></p>`).

---

### 🔹 Bước 2: Phân Tích Nguyên Nhân Cốt Lõi (Root Cause Analysis)

Nếu kết quả audit trả về lỗi (exit code 1):
- **Lỗi thẻ HTML thiếu/thừa**: Đếm số dòng thiếu thẻ đóng, kiểm tra thẻ đóng bọc quanh `<script>` hoặc trước `</body>`.
- **Lỗi JS Syntax**: Đọc dòng báo lỗi chính xác, kiểm tra dấu ngoặc `}`, `)` hoặc tên hàm có khoảng trắng.
- **Lỗi đường dẫn Cấp 4**: Đếm độ sâu thư mục từ root `Apps_ykhoa` tới vị trí file (Ví dụ: `src/content/ebm/guidelines/kho-guidelines/` là cấp 4 $\rightarrow$ bắt buộc dùng `../../../../`).

---

### 🔹 Bước 3: Vá Lỗi An Toàn Bằng Script NodeJS (Safe String Patching)

> **Cảnh cáo**: Không dùng các công cụ ghi đè trực tiếp theo chỉ số dòng lớn trên Windows để tránh rủi ro **CRLF Line Ending Truncation**.
> Sử dụng đoạn code NodeJS thay thế chuỗi độc nhất:

```javascript
const fs = require('fs');
let content = fs.readFileSync('path/to/target_file.html', 'utf8');
content = content.replace('chuỗi_gốc_độc_nhất', 'chuỗi_đã_sửa');
fs.writeFileSync('path/to/target_file.html', content, 'utf8');
```

---

### 🔹 Bước 4: Xác Nhận & Cập Nhật Log Sự Cố

- Tái chạy lệnh `node scratch/master_project_audit.js` để đảm bảo 0 Errors.
- Nếu đây là một dạng lỗi hoàn toàn mới (chưa từng gặp), hãy kích hoạt Skill `debug-skill-generator` để tạo ra 01 Skill sửa lỗi mới lưu lại tri thức cho hệ thống!

---

## 📋 Checklist Trước Khi Tuyên Bố Hoàn Thành

- [ ] Lệnh `node scratch/master_project_audit.js` chạy thành công (0 Errors).
- [ ] Các file HTML mới được kiểm tra thẻ đóng bằng `check_tags.js`.
- [ ] Các file JS mới đạt chuẩn syntax (`node -c`).
- [ ] Không có màu hex hardcoded vi phạm Dark Mode.
- [ ] Nhật ký sửa lỗi đã được cập nhật nếu có sự cố xảy ra.
