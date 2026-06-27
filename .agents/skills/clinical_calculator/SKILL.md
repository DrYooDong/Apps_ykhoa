---
name: Create Clinical Calculator / Medical Score
description: Guides the development of medical calculators with forms, calculations, dynamic risk stratification, and input validation.
---

# Kỹ năng Phát triển Bộ tính toán Y khoa (Clinical Calculator)

Kỹ năng này điều khiển việc thiết kế giao diện nhập số liệu và tính toán điểm số lâm sàng tự động.

## 🛠️ Quy trình thực hiện:

### Bước 1: Thiết lập Form Nhập dữ liệu (`.calc-card`)
Thiết kế biểu mẫu nhập liệu trực quan:
- Các trường nhập số (`input[type="number"]`) kèm theo nhãn rõ ràng và đơn vị đo (ví dụ: mg/dL, mmHg, tuổi).
- Các trường lựa chọn (`select` hoặc bộ nút radio) cho các tiêu chí có sẵn điểm.
- Sử dụng các lớp tiện ích `.grid`, `.flex` để căn chỉnh trường nhập liệu thẳng hàng trên màn hình lớn.

### Bước 2: Tạo khu vực Hiển thị kết quả (`.calc-result-box`)
Khu vực này hiển thị điểm số tổng kết và kết luận phân tầng nguy cơ:
- Trạng thái mặc định: Hiển thị hướng dẫn "Vui lòng điền đủ thông tin để tính điểm".
- Khi đã tính toán: Hiển thị điểm số với kích thước lớn (`--text-2xl` hoặc `--text-3xl`), đi kèm hộp màu sắc chỉ thị mức độ nguy cơ (Ví dụ: nền xanh lá cho nguy cơ thấp, nền đỏ cho nguy cơ cao).
- Tận dụng các biến màu có sẵn: `var(--color-success-hl)` (thấp), `var(--color-warning-hl)` (trung bình), `var(--color-rose-hl)` (cao).

### Bước 3: Logic tính toán JavaScript
- Đặt mã tính toán trong một hàm rõ ràng (ví dụ: `calculateScore()`).
- Bắt sự kiện thay đổi giá trị (`input`, `change`) của tất cả các ô nhập để tự động cập nhật kết quả tức thời mà không cần nhấn nút "Tính toán".
- Thực hiện kiểm tra ràng buộc giá trị nhập (ví dụ: giá trị huyết áp phải dương, tuổi lớn hơn 0).
- Xử lý các giá trị đặc biệt hoặc ngoại lệ để tránh hiển thị lỗi `NaN` hoặc `Infinity` trên màn hình.

### Bước 4: Lưu trạng thái (Tùy chọn)
Nếu biểu mẫu phức tạp, có thể dùng `localStorage` để lưu tạm các chỉ số đã điền giúp người dùng không bị mất dữ liệu khi vô tình reload trang.
