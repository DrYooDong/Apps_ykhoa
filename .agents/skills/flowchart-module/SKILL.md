---
name: flowchart-module
description: >
  Tạo, chỉnh sửa và vẽ lưu đồ tiếp cận lâm sàng tương tác và sơ đồ trực quan y khoa đồ họa xuất bản (Interactive Clinical Flowcharts & Editorial SVG Studio)
  trong phân hệ Tiếp cận của CliniPortal. Kích hoạt khi AI cần: tạo lưu đồ thuật toán chẩn đoán, phác đồ xử trí cấp cứu, vẽ đường nối mũi tên vector trực giao,
  hoặc chỉnh sửa bất kỳ lưu đồ/sơ đồ y khoa nào đạt chuẩn Editorial (Pure SVG, 100% Dark Mode, No Shadows, No Mermaid-slop).
---

# Clinical Flowchart & Medical Editorial Diagram Skill

Skill này quy định chuẩn kiến trúc, quy tắc bố cục trực giao (Orthogonal Routing Grammar), bảng màu Editorial Y khoa (Medical Editorial Palette) và các anti-patterns bắt buộc phải tránh khi AI tạo/chỉnh sửa lưu đồ y khoa trong `CliniPortal`.

---

## 🛑 MODULE RULES BẮT BUỘC (Quy tắc Bất di Bất dịch)

1. **Triết lý Tinh gọn Editorial (Độ đậm đặc 4/10)**: "The highest-quality move is deletion". Mỗi node là một quyết định lâm sàng rõ ràng. Tối đa 7–9 node trên một màn hình; nếu phác đồ quá dài, bắt buộc chia thành 2 sơ đồ (Tổng quan High-level & Chi tiết Deep-dive).
2. **Quy tắc Màu Nhấn Tiêu điểm (Editorial Focal Rule)**: Màu đỏ/cam cảnh báo nguy kịch (Red Flags / Khẩn cấp) **chỉ dành cho 1–2 node quyết định tối quan trọng**. Tuyệt đối không tô màu sặc sỡ mọi node làm mất tín hiệu nhận thức của bác sĩ.
3. **Đường nối Trực giao 100% (Strict Orthogonal Connectors)**: Mọi đường nối giữa các node lệch trục phải bẻ góc vuông 90° có bo tròn nhẹ ($r = 4 - 8\text{px}$). Tuyệt đối cấm vẽ đường xiên chéo cắt ngang qua các node khác.
4. **Mặt nạ Nhãn Chữ (Label Masking Rect)**: Mọi nhãn chữ trên mũi tên (Có/Không, Dương tính/Âm tính) phải có hộp nền `<rect fill="var(--color-surface)">` để đường kẻ không bao giờ đâm xuyên qua thân chữ.
5. **Không Dùng Drop-Shadow (Shadows are OUT, Borders are IN)**: Dùng đường viền sắc nét (`1px solid var(--color-border)`) và bo góc nhẹ (`rx="6-8px"`).
6. **Tuân thủ 100% Design Tokens & Dark Mode**: Bắt buộc dùng `var(--color-...)` cho toàn bộ thuộc tính `fill`, `stroke`, `color`.
7. **TUYỆT ĐỐI CẤM THẺ HTML TRONG SVG `<text>` (No HTML in SVG Text)**: Tuyệt đối **KHÔNG ĐƯỢC** dùng các thẻ HTML (`<strong>`, `<b>`, `<span>`, `<br>`, `<em>`, `<code>`) bên trong `<text>` hoặc `<svg>`. Trình duyệt sẽ parse lỗi khiến văn bản bị vỡ và rớt ra ngoài khung SVG. Để in đậm trong SVG, **BẮT BUỘC** dùng `<tspan font-weight="700">Chữ in đậm</tspan>` hoặc gán trực tiếp `font-weight="700"` trên thẻ `<text>`. Để xuống dòng, dùng các thẻ `<text y="...">` riêng biệt hoặc `<tspan x="..." dy="...">`.

---

## 🎨 Bảng Màu Editorial Y Khoa Chuẩn (Medical Editorial Tokens)

| Loại Node / Trạng thái | Nền Fill | Viền Stroke | Chữ / Tag | Ý nghĩa Lâm sàng & Ứng dụng |
| :--- | :--- | :--- | :--- | :--- |
| **Focal / Red Flag (Cấp cứu tối khẩn)** | `var(--color-danger-hl)` hoặc `var(--color-rose-hl)` | `var(--color-danger)` (2px) | Đỏ / Rose đậm | Dấu hiệu cờ đỏ, Đe dọa tính mạng, Chỉ định can thiệp khẩn (Đặt NKQ, Tiêu sợi huyết). **(1-2 node max)** |
| **Start / Tình huống đầu** | `var(--color-primary-hl)` | `var(--color-primary)` (1.5px) | Xanh dương | Bệnh cảnh tiếp nhận ban đầu (Lý do vào viện, Triệu chứng chính). |
| **Decision / Câu hỏi rẽ nhánh** | `var(--color-warning-hl)` | `var(--color-warning)` (1.5px) | Vàng / Cam | Điểm phân tầng chẩn đoán, Thang điểm (Wells, CURB-65, Glasgow). |
| **Action / Can thiệp điều trị** | `var(--color-teal-hl)` hoặc `var(--color-surface)` | `var(--color-teal)` (1.5px) | Xanh ngọc / Primary | Y lệnh điều trị, chỉ định xét nghiệm/chẩn đoán hình ảnh. |
| **Dose / Cảnh báo Dược lý** | `var(--color-purple-hl)` | `var(--color-purple)` (1.5px) | Tím | Cảnh báo liều lượng thuốc, chống chỉ định, độc tính dược lý. |
| **Stable / Tiên lượng tốt** | `var(--color-success-hl)` | `var(--color-success)` (1.5px) | Xanh lá | Bệnh nhân ổn định, Xuất viện an toàn, Theo dõi ngoại trú. |
| **Standard Step / Node phụ** | `var(--color-surface-2)` | `var(--color-border)` (1px) | Text Muted | Các bước thăm khám thường quy hoặc thùng chứa dữ liệu. |

---

## 📐 6 Quy Tắc Định Tuyến Đường Nối Trực Giao (Orthogonal Edge Routing)

Khi AI sinh hoặc vẽ lưu đồ y khoa (bằng SVG thuần hoặc JSON Engine), bắt buộc tuân thủ 6 quy tắc trực giao:

### Rule 1: Giới hạn Viewport Đơn (Single Responsive Viewport)
- Tọa độ thiết kế chuẩn: $X: 0 \rightarrow 960\text{px}$ (hoặc $1000\text{px}$), $Y: 0 \rightarrow 600\text{px}$ (hoặc $750\text{px}$).
- Luôn bọc trong thẻ `<svg viewBox="0 0 960 600" width="100%" height="100%">` để tự co giãn 100% trên thiết bị di động.

### Rule 2: Điểm Neo Xuất / Nhập Cố Định (Explicit Anchors)
- **Luồng chảy từ trên xuống (Top-down)**: Mép dưới node nguồn (`exitX=0.5; exitY=1.0`) $\rightarrow$ Mép trên node đích (`entryX=0.5; entryY=0.0`).
- **Luồng rẽ nhánh 2 bên (Branching)**: Rẽ trái (`exitX=0.0; exitY=0.5`), Rẽ phải (`exitX=1.0; exitY=0.5`).

### Rule 3: Bẻ Góc Bo Tròn Trực Giao (Rounded Right-Angle Elbows)
- Thay vì vẽ đường chéo `M x1 y1 L x2 y2`, dùng lệnh Path trực giao có bo góc:
  ```svg
  <!-- Lượn góc vuông từ (200, 100) sang (400, 250) -->
  <path d="M 200 100 L 200 240 Q 200 250 210 250 L 400 250" fill="none" stroke="var(--color-border)" stroke-width="1.5"/>
  ```

### Rule 4: Tách Điểm Neo Đa Tuyến (Fanning Attach Points $\ge 12\text{px}$)
- Khi 2 đường nối cùng xuất phát từ một cạnh của node, các điểm neo phải cách nhau tối thiểu $12\text{px}$, không dùng chung 1 điểm gây dính đường nối.

### Rule 5: Mặt Nạ Chữ Che Đường Kẻ (Label Masking)
```svg
<g>
  <!-- Hộp che nền phía dưới nhãn -->
  <rect x="280" y="165" width="60" height="20" rx="4" fill="var(--color-surface)" stroke="var(--color-divider)" stroke-width="0.5"/>
  <text x="310" y="179" font-size="10" font-weight="700" fill="var(--color-text)" text-anchor="middle">CÓ / YES</text>
</g>
```

### Rule 6: Tránh Đi Xuyên Qua Node Trung Gian (Obstacle Avoidance)
- Khi đường nối đi từ tầng 1 xuống tầng 3 mà tầng 2 có node chắn giữa, mũi tên phải bẻ góc vuông đi vòng sang hành lang biên ($X \le 50\text{px}$ hoặc $X \ge 900\text{px}$), tuyệt đối không đâm xuyên qua thân node ở giữa.

---

## 🚫 Bảng Đối Chiếu Anti-Patterns (Tránh "Mermaid-slop" & Lỗi Thường Gặp)

| Anti-Pattern Cần Tránh ❌ | Chuẩn Editorial Medical Flowchart ✅ |
| :--- | :--- |
| **Đường nối xiên chéo, cắt ngang qua chữ** | Đường nối trực giao vuông góc, nhãn có `rect` mặt nạ che nền. |
| **Tô màu đỏ/vàng/xanh khắp mọi node** | Nền trung tính (`surface-2`), chỉ dùng màu nhấn đỏ cho 1–2 node nguy kịch (Focal). |
| **Drop-shadow mờ mịt, vỡ khi sang Dark Mode** | Viền mảnh 1px (`border`), không shadow, tương thích 100% Dark Mode. |
| **Hơn 15 node chen chúc trên 1 sơ đồ** | Giới hạn 7–9 node (Target density 4/10), tách thành sơ đồ con nếu cần. |
| **Mã màu HEX cố định (`#ff0000`, `#ffffff`)** | 100% sử dụng Design Tokens (`var(--color-danger)`, `var(--color-surface)`). |
| **Chữ viết dọc (`writing-mode: vertical`) trên mũi tên** | Chữ luôn nằm ngang (`writing-mode: horizontal`), dễ đọc trên di động. |

---

## ⚡ 2 Phương Thức Triển Khai Trong CliniPortal

### Phương thức 1: Sơ đồ Pure Inline SVG Độc Lập (Self-Contained Mode - Khuyên dùng)
Dùng khi cần nhúng sơ đồ nhanh, nhẹ, không phụ thuộc JS vào các bài viết Guideline, Dược lý, Bệnh lý:
- Tham khảo thư viện mẫu: [`templates/medical-svg-templates.html`](file:///d:/Apps_ykhoa/templates/medical-svg-templates.html)
- Sử dụng công cụ sinh tự động: [`js/medical-svg-generator.js`](file:///d:/Apps_ykhoa/js/medical-svg-generator.js)

### Phương thức 2: Sơ đồ DOM Accordion Tương Tác (Interactive Canvas Mode)
Dùng trong phân hệ Tiếp cận (`pages/Tiếp cận/`) khi cần tính năng người dùng nhấp vào từng node để xổ ra bảng chi tiết lâm sàng (Liều thuốc, Red flags checklist, Video kỹ năng):
- Nhúng: `js/flowchart.js` và `js/medical-draw-engine.js`.
- File mẫu: [`templates/flowchart-template.html`](file:///d:/Apps_ykhoa/templates/flowchart-template.html).
- Trình thiết kế trực quan: `pages/clinical-flow-studio.html`.

---

## 📋 Checklist Đánh Giá Trước Khi Hoàn Tất
- [ ] ViewBox SVG thiết lập đầy đủ (`viewBox="0 0 960 ..."`), responsive trên mobile.
- [ ] Không có đường nối chéo nào cắt ngang qua node khác.
- [ ] Mọi nhãn trên mũi tên đều có mặt nạ che nền (`<rect>`).
- [ ] Màu nhấn (Focal Red/Rose) chỉ xuất hiện tối đa ở 1–2 vị trí then chốt.
- [ ] Đã kiểm tra độ tương phản ở cả 2 chế độ Sáng (Light) và Tối (Dark Mode).
- [ ] Chạy lệnh `node scratch/check_tags.js <file.html>` không có lỗi thẻ unclosed.
