# Quy Tắc Vận Hành Đội Ngũ Thiết Kế (Design Squad Governance Rules)

> Tài liệu này chứa các quy tắc thiết kế, kỹ thuật chuyển động và cổng kiểm soát chất lượng (Merge Gate) áp dụng bắt buộc cho mọi tác vụ giao diện trong CliniPortal.

---

## 🎨 1. Quy tắc Design Tokens & Dark Mode

1. **Tuyệt đối KHÔNG hardcode màu sắc**:
   - Mọi màu nền, màu chữ, viền, shadow phải dùng CSS variables từ hệ thống token y khoa:
     ```css
     var(--color-primary)        /* Xanh y tế chính */
     var(--color-primary-hover)  /* Hover state */
     var(--color-surface)        /* Card / Container background */
     var(--color-bg)             /* Toàn bộ nền trang */
     var(--color-text)           /* Chữ chính */
     var(--color-text-muted)     /* Chữ phụ / Chú thích */
     var(--color-border)         /* Đường viền phân cách */
     var(--color-success)        /* An toàn / Bình thường */
     var(--color-warning)        /* Cảnh báo / Theo dõi */
     var(--color-danger)         /* Cấp cứu / Nguy hiểm */
     var(--color-info)           /* Thông tin cận lâm sàng */
     ```
2. **Kiểm thử Dark Mode 100%**:
   - Tất cả component phải hoạt động sắc nét và đạt chuẩn tương phản khi thẻ `<html>` mang thuộc tính `data-theme="dark"`.

---

## ⚡ 2. Quy tắc Kỹ thuật Chuyển động (Motion & Interaction Rules)

1. **Không dùng `transition: all`**:
   - Bắt buộc khai báo rõ thuộc tính cần biến đổi: `transition: transform 160ms ease-out, opacity 160ms ease-out;`.
2. **Không animate từ `scale(0)`**:
   - Sử dụng điểm khởi đầu tự nhiên: `transform: scale(0.95); opacity: 0;`.
3. **Phản hồi tương tác nút bấm**:
   - Mọi nút bấm/card tương tác phải có `:active` state rõ rệt: `transform: scale(0.97);`.
4. **Thời lượng Animation**:
   - Các chuyển động giao diện thông thường (Dropdown, Popover, Card hover) phải dưới **300ms** (khuyến nghị 150ms – 250ms).
   - Tuyệt đối không dùng `ease-in` gây cảm giác ì ạch; ưu tiên `cubic-bezier(0.23, 1, 0.32, 1)` hoặc `ease-out`.
5. **Hạn chế chuyển động theo cài đặt người dùng**:
   - Bắt buộc bọc các hiệu ứng dịch chuyển phức tạp trong `@media (prefers-reduced-motion: reduce)`.

---

## 🛡️ 3. Tiêu chuẩn Chống Thiết Kế Rác (Anti-UI Slop)

1. **Không sử dụng dữ liệu/placeholder giả lập vô nghĩa**:
   - Mọi bảng biểu, sơ đồ, kịch bản phải chứa thuật ngữ lâm sàng chính xác, số liệu sinh hiệu thực tế.
2. **Không lạm dụng thư viện cồng kềnh**:
   - Vẽ sơ đồ, lưu đồ bằng Inline SVG thuần hoặc Canvas API theo chuẩn Editorial (`flowchart-module`, `medical-editorial-diagram`). Không đưa Mermaid-slop hoặc framework nặng vào codebase.

---

## 🚪 4. Cổng Kiểm Soát Chất Lượng (Squad Merge Gate)

Trước khi chuyển một tính năng giao diện sang trạng thái `Merged`, bắt buộc phải đạt đủ 8 tiêu chí sau:

| STT | Tiêu chí Kiểm định | Yêu cầu Tối thiểu |
| :---: | :--- | :--- |
| 1 | **Màu sắc & Tokens** | 0 mã màu hex hardcoded trong CSS của component. |
| 2 | **Dark Mode** | Hiển thị chuẩn xác, không bị chìm chữ khi đổi theme. |
| 3 | **Độ tương phản WCAG** | Đạt chuẩn WCAG 2.1/2.2 AA (Tỉ lệ tương phản ≥ 4.5:1). |
| 4 | **Mobile Viewport** | Thử nghiệm tại `375px`, tuyệt đối không có thanh cuộn ngang vỡ layout. |
| 5 | **Touch Target** | Vùng bấm tối thiểu `44px x 44px` cho các nút điều hướng di động. |
| 6 | **Toàn vẹn HTML** | `node tools/scratch/check_tags.js <file.html>` không có lỗi đóng thẻ. |
| 7 | **Đường dẫn tương đối** | Đúng cấp thư mục (`./`, `../`, `../../`, v.v.). |
| 8 | **Đăng ký File** | Cập nhật tên và đường dẫn file vào `docs/FILE_MAP.md`. |
