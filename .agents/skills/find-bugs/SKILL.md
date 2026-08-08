---
name: find-bugs
description: Quy trình kiểm tra rà soát lỗi tĩnh (Static Bug Finder) và chẩn đoán sự cố giao diện, lỗi JS runtime hoặc hỏng liên kết trong CliniPortal.
---

# Static Bug Finder & Diagnostic Skill

Skill này hướng dẫn phương pháp rà soát và tìm kiếm lỗi kỹ thuật nhanh chóng trong dự án CliniPortal.

## 🛠️ Các Bước Rà Soát Lỗi

1. **Lỗi Liên kết Tương đối & Thẻ HTML**:
   - Sử dụng script kiểm tra thẻ: `node scratch/check_tags.js <file_path>`
   - Kiểm tra các liên kết CSS/JS/Image xem có bị lệch cấp thư mục không.

2. **Lỗi vỡ Layout Mobile & Z-Index Modal**:
   - Tìm kiếm các phần tử có hardcode `width` thay vì `max-width: 100%`.
   - Kiểm tra xung đột Z-index của modal/dropdown trên thiết bị màn hình nhỏ.

3. **Lỗi Registry chưa Đăng ký**:
   - Kiểm tra file mới đã được thêm vào `docs/FILE_MAP.md` chưa.
   - Đối với Guideline mới: Đã khai báo trong `SAMPLE_STUDIES` (`guidelinesdata.js`) chưa?
   - Đối với Phác đồ mới: Đã cập nhật vào `benh-ly.js` chưa?
