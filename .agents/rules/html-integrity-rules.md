# Quy Tắc Kiểm Tra Tính Toàn Vẹn HTML (HTML Integrity Rules)

## 🔍 Kiểm tra Cấu trúc Thẻ

1. **Chạy Script Validate**:
   - Trước và sau khi tạo/chỉnh sửa bất kỳ file HTML nào, BẮT BUỘC chạy script kiểm tra thẻ:
     ```bash
     node scratch/check_tags.js <path_to_file.html>
     ```
2. **Quy tắc Thẻ Header**:
   - Mỗi trang HTML chỉ được phép chứa **duy nhất 1 thẻ `<h1>`**.
3. **Quy tắc ID Cuy nhất**:
   - Không được tồn tại các thuộc tính `id` bị trùng lặp trên cùng một trang HTML.
