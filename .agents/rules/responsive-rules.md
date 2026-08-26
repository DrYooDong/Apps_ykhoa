# Quy Tắc Thiết Kế Responsive & Trải Nghiệm Mobile Y Khoa (Mobile Design System)

> **Triết lý cốt lõi**: Touch-first • Tiết kiệm Pin/CPU • Offline-first • Tôn trọng thói quen sử dụng của Nhân viên Y tế.

---

## 📱 1. Tiêu Chuẩn Giao Diện Mobile-First & Kích Thước Màn Hình

1. **Thiết kế Mobile-First**: Viết CSS cơ sở cho màn hình nhỏ trước, sau đó dùng `@media (min-width: 768px)` và `@media (min-width: 1024px)` để mở rộng layout.
2. **Kiểm thử Chiều rộng Tối thiểu ($\le 375\text{px}$)**: Tuyệt đối không để xuất hiện thanh cuộn ngang (horizontal scroll) toàn trang.
3. **Bảng và Sơ đồ Phức Tạp**: Phải bọc trong container có class cuộn ngang riêng biệt:
   ```css
   .table-responsive {
     overflow-x: auto;
     -webkit-overflow-scrolling: touch;
   }
   ```

---

## 👆 2. Vùng Thao Tác Cảm Ứng (Touch Targets & Thumb-Zone)

1. **Kích thước Điểm chạm Tối thiểu**: Mọi nút bấm, icon bấm được, tab điều hướng, ô chọn checkbox/radio phải có kích thước tối thiểu **$44 \times 44\text{px}$** (hoặc `min-height: 44px; min-width: 44px;`).
2. **Vùng Ngón Cái Thuận Tiện (Thumb Zone)**: Các nút hành động chính (vd: "Tính điểm", "Xem phác đồ", "Bắt đầu cấp cứu") nên nằm ở 1/3 dưới cùng màn hình hoặc sử dụng Bottom Sticky Action Bar.
3. **Khoảng cách Giữa các Điểm chạm**: Giữ khoảng cách tối thiểu **$8\text{px}$** giữa hai nút bấm liền kề để tránh bấm nhầm trong thao tác cấp cứu gấp.

---

## 🚫 3. Tiêu Chuẩn Anti-UI-Slop (Chống Giao Diện Rác)

1. **Không Dùng Placeholder Vô Nghĩa**: Mọi ô nhập và card thông tin phải có nhãn (label) và ví dụ giá trị y khoa thực tế (`vd: 120/80 mmHg`, `5.2 mmol/L`).
2. **Chuyển Động Tối Ưu (Motion Design)**: Sử dụng CSS Transitions ngắn (150ms - 250ms) với `ease-out`, không lạm dụng hiệu ứng bay lắc làm chậm thao tác lâm sàng.
3. **Typography Rõ Ràng**: Cỡ chữ body text trên mobile tối thiểu **$15\text{px} - 16\text{px}$**, tỷ lệ tương phản đạt chuẩn WCAG AA.

