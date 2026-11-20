# Quy Tắc Chuyển Động & Chống Thiết Kế Rác (Design Squad Rules)

> Quy chuẩn màu sắc, Dark Mode, Responsive và HTML toàn vẹn xem tại các rule riêng (`dark-mode-rules.md`, `responsive-rules.md`, `html-integrity-rules.md`). Quy trình đầy đủ & Merge Gate 8 bước nạp từ skill `design-agent-squad`.

1. **Kỹ thuật Chuyển động (Motion Invariants)**:
   - **Cấm `transition: all`**: Khai báo rõ thuộc tính (`transform`, `opacity`).
   - **Cấm animate từ `scale(0)`**: Bắt đầu từ `transform: scale(0.95); opacity: 0;`; nút/card tương tác có `:active { transform: scale(0.97); }`.
   - Thời lượng UI thông thường `< 300ms` (150–250ms), dùng `ease-out` hoặc `cubic-bezier(0.23, 1, 0.32, 1)` (không dùng `ease-in`).
   - Tôn trọng `@media (prefers-reduced-motion: reduce)`.
2. **Chống Thiết Kế Rác (Anti-UI Slop)**:
   - Cấm dữ liệu/placeholder giả lập vô nghĩa; mọi bảng/sơ đồ phải dùng số liệu & thuật ngữ lâm sàng thực tế.
   - Vẽ lưu đồ bằng Inline SVG thuần chuẩn Editorial (`flowchart-module`, `medical-editorial-diagram`), không đưa Mermaid-slop hay thư viện nặng vào codebase.
3. **Độ tương phản WCAG**: Đạt tối thiểu WCAG 2.1/2.2 AA (`≥ 4.5:1`) ở cả Light & Dark Mode.
