# Quy Tắc Kiểm Tra Tính Toàn Vẹn HTML & SVG (HTML & SVG Integrity Rules)

## 🔍 Kiểm tra Cấu trúc Thẻ

1. **Chạy Script Validate Bắt Buộc**:
   - Trước và sau khi tạo/chỉnh sửa bất kỳ file HTML nào, BẮT BUỘC chạy script kiểm tra thẻ:
     ```bash
     node scratch/check_tags.js <path_to_file.html>
     ```
   - Script tự động kiểm tra:
     - Độ cân bằng mở/đóng các thẻ HTML.
     - **Chặn tuyệt đối các thẻ HTML bên trong thẻ `<svg>`** (ngoại trừ trong `<foreignObject>`).

2. **Quy tắc Thẻ Header**:
   - Mỗi trang HTML chỉ được phép chứa **duy nhất 1 thẻ `<h1>`**.

3. **Quy tắc ID Duy Nhất**:
   - Không được tồn tại các thuộc tính `id` bị trùng lặp trên cùng một trang HTML.

---

## 🎨 4. Quy Tắc Bất Di Bất Dịch Cho Sơ Đồ SVG (Editorial SVG Rules)

1. **CẤM DÙNG THẺ HTML TRONG SVG `<text>`**:
   - Tuyệt đối **KHÔNG** dùng: `<strong>`, `<b>`, `<em>`, `<i>`, `<span>`, `<br>`, `<sub>`, `<sup>`, `<p>`, `<div>`.
   - Trình duyệt sẽ gặp lỗi cú pháp XML/SVG, làm vỡ DOM SVG và đẩy toàn bộ văn bản còn lại tràn ra ngoài HTML dưới dạng raw text.
2. **BẢNG TRA CỨU THAY THẾ CHUẨN SVG**:
   - In đậm: Dùng `<tspan font-weight="700">` hoặc thuộc tính `font-weight="700"` trên `<text>`.
   - In nghiêng: Dùng `<tspan font-style="italic">` hoặc thuộc tính `font-style="italic"`.
   - Xuống dòng (Line break): Dùng `<tspan x="..." dy="1.3em">` (hoặc `dy="14"`).
   - Chỉ số dưới/trên: Dùng `<tspan baseline-shift="sub" font-size="0.75em">` / `<tspan baseline-shift="super" font-size="0.75em">`.
3. **ĐỒNG BỘ CĂN LỀ (`text-anchor`)**:
   - Tiêu đề card / node nằm giữa: `text-anchor="middle"` với `x` là tâm của node.
   - Danh sách bullet point bên trong box: Bắt buộc dùng `text-anchor="start"` với `x` là mép trái của box (`box_x + 15px`). Tuyệt đối không dùng `x` tâm của box cho các dòng bullet point mà không có `text-anchor="middle"`.
