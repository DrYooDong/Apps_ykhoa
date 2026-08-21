---
name: medical-editorial-diagram
description: >
  Tạo sơ đồ Y khoa đồ họa xuất bản cao cấp (Editorial Medical Diagrams) bằng Pure HTML + Inline SVG.
  Tự động vẽ các dạng sơ đồ: Swimlane cấp cứu, Ma trận phân tầng 2x2 (Quadrant), Chồng tầng bậc thang (Layer Stack),
  Radar so sánh thuốc, Kim tự tháp chứng cứ EBM (Pyramid), Vòng lặp hồi sức (Clinical Loop) và Lưu đồ trực giao (Orthogonal Flowchart).
  Tuyệt đối không dùng thư viện ngoài (No Mermaid, No Chart.js), tuân thủ 100% Dark Mode và Design Tokens của CliniPortal.
---

# Medical Editorial Diagram Skill (Kỹ Năng Tạo Sơ Đồ Y Khoa Xuất Bản Độc Lập)

Skill này hướng dẫn và quy chuẩn hóa việc tạo các sơ đồ trực quan y khoa **chuẩn phong cách đồ họa xuất bản (Editorial-grade)**, sử dụng **100% HTML + inline SVG thuần**, tương thích hoàn toàn với hệ thống Design Tokens và Dark Mode của CliniPortal.

---

## 🏛️ 1. Triết Lý Thiết Kế Cốt Lõi (Editorial Principles)

1. **Độ đậm đặc mục tiêu 4/10 (Target Density 4/10):**
   - Mỗi node biểu thị một ý niệm lâm sàng độc lập. Nếu 2 yếu tố luôn đi cùng nhau, gộp thành 1 node.
   - Không nhồi nhét quá 7–9 node trong một sơ đồ. Nếu vượt quá, tách thành 2 sơ đồ: **Tổng quan (Overview)** và **Chi tiết (Deep-dive)**.
2. **Màu nhấn Tiêu điểm (Focal Accent):**
   - Màu nhấn đặc biệt (Đỏ/Cam/Tím) **chỉ dành cho 1–2 node quyết định quan trọng nhất** (ví dụ: *Cờ đỏ Red Flags*, *Chỉ định can thiệp khẩn*).
   - Các node còn lại sử dụng màu bề mặt chuẩn (`var(--color-surface)` / `var(--color-surface-2)` / `var(--color-border)`).
3. **Đường nối Trực giao (Orthogonal Connectors):**
   - Chỉ dùng đường vuông góc với góc bo nhẹ (`rx="4"` đến `8px`). Tuyệt đối không vẽ đường chéo xiên xẹo cắt ngang qua các node khác.
   - Mọi nhãn chữ trên đường nối phải có mặt nạ che (`<rect>` che nền) để chữ không bị đường kẻ đâm xuyên qua.
4. **Không Dùng Drop-Shadow Nặng Nề:**
   - Dùng viền thanh mảnh (`1px solid var(--color-border)`) và bo góc nhẹ (`rx="6"` đến `8px`).

---

## 🛑 2. Quy Tắc Bất Di Bất Dịch Cho Thẻ Chữ & Định Dạng SVG (SVG Text Standards)

1. **TUYỆT ĐỐI CẤM DÙNG THẺ HTML TRONG SVG `<text>`**:
   - ❌ **CẤM**: `<strong>`, `<b>`, `<em>`, `<i>`, `<span>`, `<br>`, `<sub>`, `<sup>`, `<p>`, `<div>`.
   - **Hậu quả**: Khiến parser XML của trình duyệt bị đứt quãng, phá hỏng DOM của SVG và làm toàn bộ văn bản sau đó bị văng ra ngoài HTML body thành raw text.
2. **CHUẨN ĐỊNH DẠNG VĂN BẢN SVG BẰNG `<tspan>`**:
   - **In đậm**: Dùng `<tspan font-weight="700">Chữ in đậm</tspan>`.
   - **In nghiêng**: Dùng `<tspan font-style="italic">Chữ in nghiêng</tspan>`.
   - **Xuống dòng nhiều hàng**:
     ```html
     <text x="450" y="235" text-anchor="middle" font-size="10" font-weight="700">
       <tspan x="450">Dòng 1: Tiêu đề</tspan>
       <tspan x="450" dy="14">Dòng 2: Nội dung phụ</tspan>
     </text>
     ```
   - **Chỉ số dưới / trên**: Dùng `<tspan baseline-shift="sub" font-size="0.75em">2</tspan>`.
3. **QUY TẮC CĂN LỀ (`text-anchor`) TRÁNH LỆCH TỌA ĐỘ**:
   - **Tiêu đề ở tâm box**: Dùng `text-anchor="middle"` với `x` là tâm của box.
   - **Danh sách gạch đầu dòng (Bullet points)**: Bắt buộc dùng `text-anchor="start"` với `x` là mép trái box (`box_x + 15px`). Tuyệt đối không dùng tọa độ tâm `x` cho các dòng bullet point khi không khai báo `text-anchor="middle"`.

---

## 🎨 3. Bảng Màu Design Tokens Bắt Buộc (CSS Variables)

Tuyệt đối không dùng hardcode mã màu hex cố định. Mọi thuộc tính `fill`, `stroke`, `color` phải sử dụng biến CSS:

```css
/* Nền và Khung */
fill="var(--color-surface)"        /* Nền chính của thẻ sơ đồ */
fill="var(--color-surface-2)"      /* Nền node cấp 2 / container */
fill="var(--color-surface-offset)" /* Nền node phụ / header */
stroke="var(--color-border)"       /* Đường viền khung node */
stroke="var(--color-divider)"      /* Đường phân cách mờ */

/* Chữ */
fill="var(--color-text)"           /* Tiêu đề / Nội dung chính */
fill="var(--color-text-muted)"     /* Chú thích / Nhãn phụ */
fill="var(--color-text-faint)"     /* Đường kẻ phụ / Ghi chú nhỏ */

/* Màu Trạng Thái Y Khoa */
var(--color-primary)               /* Xanh dương: Phác đồ chuẩn / Khởi đầu */
var(--color-primary-hl)            /* Nền sáng xanh dương */
var(--color-danger) / var(--color-rose) /* Đỏ / Hồng: Cấp cứu tối khẩn / Nguy kịch */
var(--color-danger-hl) / var(--color-rose-hl) /* Nền sáng cảnh báo đỏ */
var(--color-warning)               /* Vàng / Cam: Cảnh báo / Nguy cơ trung bình */
var(--color-warning-hl)            /* Nền sáng cảnh báo vàng */
var(--color-success) / var(--color-teal) /* Xanh lá / Xanh ngọc: Ổn định / An toàn */
var(--color-success-hl) / var(--color-teal-hl) /* Nền sáng an toàn */
```

---

## 📊 4. Bảng Chọn Dạng Sơ Đồ Theo Dữ Liệu Lâm Sàng (Routing Matrix)

| Tình huống lâm sàng | Chọn loại Sơ đồ | Cấu trúc SVG đề xuất |
| :--- | :--- | :--- |
| **Quy trình nhiều bên phối hợp theo thời gian** (VD: Code Blue, Fast-track Stroke, Handoff cấp cứu) | **Swimlane** | Chia các Track ngang/dọc, mũi tên trực giao nối giữa các làn. |
| **Phân loại / Phân tầng nguy cơ 2 yếu tố** (VD: Xác suất vs Mức độ nặng, Wells vs D-Dimer, CURB-65) | **Quadrant 2×2** | 2 trục trực giao, 4 góc phần tư có màu nền phân cấp nguy cơ rõ rệt. |
| **Thang bậc điều trị / Bậc thang can thiệp** (VD: Bậc đau WHO, Bậc Hen GINA, Phân tầng kháng sinh) | **Layer Stack** | Các thanh chữ nhật xếp chồng từ dưới lên (hoặc từ trên xuống) có đánh số Bậc 1-2-3. |
| **So sánh đa tiêu chí giữa các nhóm thuốc/phác đồ** (VD: SGLT2i vs GLP-1 RA vs DPP4i, Kháng sinh) | **Radar Chart** | Lưới đa giác đồng tâm 4-6 trục, vẽ diện tích polygon có `fill-opacity="0.25"`. |
| **Phân cấp thứ bậc chứng cứ nghiên cứu** (VD: Kim tự tháp EBM, Kim tự tháp phòng chống dịch) | **Evidence Pyramid** | Khối đa giác hình chóp chia 4-5 tầng từ đáy lên đỉnh. |
| **Quy trình hồi sức / Vòng lặp tái đánh giá** (VD: Sepsis bundle 1h-3h, Chu trình PDCA bệnh viện) | **Clinical Loop** | Hub trung tâm hình tròn kết nối với 4-6 trạm vệ tinh xung quanh qua đường quỹ đạo tròn nét đứt. |

---

## 🛑 5. Checklist Kiểm Tra Chất Lượng Trước Khi Hoàn Tất

- [ ] Sơ đồ nằm trong thẻ `<svg viewBox="0 0 W H" width="100%">` đảm bảo co giãn 100% trên Mobile.
- [ ] Không chứa bất kỳ thẻ HTML nào (`<em>`, `<strong>`, `<span>`, `<br>`, `<b>`, `<i>`, `<p>`, `<div>`) bên trong `<svg>`.
- [ ] Toàn bộ định dạng dùng `<tspan>` với `font-weight`, `font-style` và `dy`.
- [ ] Các dòng gạch đầu dòng trong box được căn lề đồng bộ `text-anchor="start"`.
- [ ] Không có mã màu hex hardcoded (toàn bộ dùng `var(--color-...)` hoặc CSS tokens).
- [ ] Đã kiểm tra tính rõ ràng ở cả 2 chế độ Sáng (Light) và Tối (Dark Mode).
- [ ] Không có đường nối xiên chéo cắt ngang qua nội dung của node khác.
- [ ] Chạy lệnh `node scratch/check_tags.js <file.html>` **PASSED** (0 lỗi HTML và SVG).
