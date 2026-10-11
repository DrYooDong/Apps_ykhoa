---
description: Quy trình 5 bước điều tra, cô lập, sửa lỗi tối thiểu, kiểm thử hồi quy và ghi nhận bài học
---

# Lệnh Sửa Lỗi Có Hệ Thống: /fix-bug

Khi nhận lệnh `/fix-bug [mô tả lỗi / triệu chứng / file bị lỗi]`, AI Agent áp dụng quy trình chẩn đoán có bằng chứng (Evidence-based Debugging):

---

## 🔍 Bước 1: Thu Thập Bằng Chứng & Tái Hiện
1. Đọc nội dung file bị lỗi và thông báo lỗi/triệu chứng từ User.
2. Không đoán mò. Xác định chính xác:
   - Dòng code phát sinh lỗi.
   - Nguyên nhân gốc rễ (Root Cause): lệch kiểu dữ liệu, sai đường dẫn tương đối, cú pháp thẻ đóng, conflict CSS z-index/transform, hoặc race condition async.

---

## 🎯 Bước 2: Cô Lập & Khoanh Vùng Rủi Ro
1. Đánh giá xem lỗi mang tính cục bộ (trong 1 hàm/component) hay ảnh hưởng dây chuyền (systemic).
2. Kiểm tra các quy tắc liên quan trong `.agents/rules/` (dark mode, responsive, hub protection).
3. Đề xuất giải pháp sửa **tối thiểu (Minimal Surgical Fix)**, tuyệt đối không viết lại toàn bộ file nếu không cần thiết.

---

## 💉 Bước 3: Triển Khai Sửa Lỗi Tối Thiểu
1. Dùng công cụ `replace_file_content` hoặc sửa chính xác khối mã bị lỗi.
2. Giữ nguyên toàn bộ cấu trúc và logic đang hoạt động ổn định khác.
3. Bảo đảm không vô tình xóa các comment, event listener hoặc xử lý edge-case đã có.

---

## 🛡️ Bước 4: Kiểm Thử Hồi Quy (Regression Check)
1. Kiểm tra lại luồng hoạt động chính của trang/hàm sau khi sửa.
2. Chạy kiểm tra cú pháp và toàn vẹn thẻ:
   - `node tools/scratch/check_tags.js <file.html>` (nếu áp dụng).
3. Xác minh trên cả chế độ Light Mode & Dark Mode, kích thước màn hình Mobile ($\le 375\text{px}$).

---

## 📝 Bước 5: Tự Động Hóa Vòng Lặp Cải Thiện (/retro)
1. Tự động kích hoạt quy trình `/retro` để tạo thẻ **Retro Card (≤15 dòng)** trong `.agents/learnings/retro/`.
2. Áp dụng quy tắc **Rule of 2**: Nếu lỗi này đã xảy ra $\ge 2$ lần, lập tức thêm check tự động vào `tools/dev.mjs check`.
3. Trình bày súc tích cho User: **Nguyên nhân cốt lõi**, **Cách đã khắc phục**, và **Hành động nâng cấp hệ thống**.
