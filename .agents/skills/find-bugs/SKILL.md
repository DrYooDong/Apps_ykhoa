---
name: find-bugs
description: Quy trình kiểm tra rà soát lỗi tĩnh (Static Bug Finder) và chẩn đoán sự cố giao diện, lỗi JS runtime hoặc hỏng liên kết trong CliniPortal.
---

# Static Bug Finder & Diagnostic Skill

Skill này hướng dẫn phương pháp rà soát và tìm kiếm lỗi kỹ thuật nhanh chóng trong dự án CliniPortal.

## 🛠️ Các Bước Rà Soát Lỗi

1. **Lỗi Liên kết Tương đối & Thẻ HTML**:
   - Sử dụng script kiểm tra thẻ: `node tools/tools/scratch/check_tags.js <file_path>`
   - Kiểm tra các liên kết CSS/JS/Image xem có bị lệch cấp thư mục không.

2. **Lỗi vỡ Layout Mobile & Z-Index Modal**:
   - Tìm kiếm các phần tử có hardcode `width` thay vì `max-width: 100%`.
   - Kiểm tra xung đột Z-index của modal/dropdown trên thiết bị màn hình nhỏ.

3. **Lỗi Registry chưa Đăng ký**:
   - Kiểm tra file mới đã được thêm vào `.agents/docs/FILE_MAP.md` chưa.
   - Đối với Guideline mới: Đã khai báo trong `SAMPLE_STUDIES` (`guidelinesdata.js`) chưa?
   - Đối với Phác đồ mới: Đã cập nhật vào `benh-ly.js` chưa?

4. **Lỗi Parse HTML Entity Escaping (Unescaped `<` & `>`)**:
   - Rà soát các ký tự toán học/so sánh (`<`, `>`) trong văn bản HTML. Đảm bảo thay thế bằng `&lt;` và `&gt;` để tránh lỗi parse5 `invalid-first-character-of-tag-name`.

5. **Lỗi Cache Bẫy Script & LocalStorage Favorites**:
   - Đổi tên/ID công cụ cũ trong `tools-data.js` cần tăng phiên bản `?v=N` trên thẻ script trong `cong-cu.html` và thêm `LEGACY_ID_MAP` vào `cong-cu-logic.js` để tự động migrate ID cũ của người dùng.
