# CliniPortal Debugging & Accelerated Risk Mitigation Skill

Skill này cung cấp các nguyên tắc, phương pháp chẩn đoán tức thì, và quy trình khắc phục các lỗi giao diện, lỗi cú pháp HTML/CSS/JS, cùng **mô hình truy vết đồ thị mã nguồn (Graphify Call Graph Tracing)** trong hệ sinh thái CliniPortal.

---

## ⚡ 1. Quy trình Chẩn đoán & Truy xuất Lỗi Tốc độ cao (4-Step Rapid Diagnostic Pipeline)

Khi xảy ra bất kỳ lỗi giao diện, lỗi JS không chạy, hoặc báo cáo sự cố từ người dùng, AI phải thực hiện đúng 4 bước theo thứ tự sau:

```
[Bước 1: Quét Thẻ HTML] ──> [Bước 2: Quét Cú pháp JS & CRLF] ──> [Bước 3: Truy vết Đồ thị Graphify] ──> [Bước 4: Vá Lỗi An toàn & Lưu Log]
```

### 🔹 Bước 1: Quét tính cân bằng thẻ đóng HTML (HTML Integrity Check)
- **Triệu chứng**: Giao diện bị biến mất, co xẹp dải dọc (~40px) ở mép trái, chữ bị vỡ dòng hoặc footer chui vào giữa nội dung.
- **Thao tác AI**: Chạy công cụ quét thẻ đóng tự động:
  ```bash
  node tools/tools/scratch/check_tags.js path/to/file.html
  ```
- **Xử lý**: Nếu phát hiện thiếu thẻ đóng `.app-container` hoặc `.main-wrapper`, ngay lập tức bổ sung thẻ `</div>` tương ứng trước khối `<script>`.

### 🔹 Bước 2: Kiểm tra lỗi dịch dòng Windows (CRLF Truncation) & Cú pháp JS
- **Triệu chứng**: `SyntaxError: Unexpected end of input` hoặc file bị mất nửa dưới.
- **Nguyên nhân**: Sự chênh lệch ký tự dòng `\r\n` (CRLF) khi ghi đè qua tool chỉnh sửa dòng.
- **Giải pháp vá lỗi an toàn (Safe String Patching)**: **KHÔNG** sửa theo chỉ số dòng trực tiếp trên các khối dài. Dùng script NodeJS vá theo chuỗi độc nhất:
  ```javascript
  const fs = require('fs');
  let content = fs.readFileSync('path/to/file.html', 'utf8');
  content = content.replace('chuỗi_gốc_độc_nhất', 'chuỗi_mới_đã_vá');
  fs.writeFileSync('path/to/file.html', content, 'utf8');
  ```

### 🔹 Bước 3: Truy vết Đồ thị Mã nguồn Graphify (Graphify Call Graph Tracing)
- **Mục tiêu**: Tìm nhanh hàm/file gây ra sự cố và xác định các file khác bị ảnh hưởng gián tiếp.
- **Thao tác AI**: Chạy lệnh truy vấn đồ thị:
  ```bash
  node tools/tools/scratch/query_graph.js <tên_hàm_bị_lỗi_hoặc_tên_file>
  ```
- **Phân tích kết quả**:
  - **Inbound Edges**: Các file/hàm đang gọi tới điểm lỗi.
  - **Outbound Edges**: Các phụ thuộc mà điểm lỗi gọi tới.
  - **Risk Level**: Xác định xem file bị lỗi có phải là `CRITICAL HUB` hay `HIGH RISK` hay không.

### 🔹 Bước 4: Kiểm thử Đa thiết bị & Cập nhật Nhật ký Sự cố (Troubleshooting Log)
- Chạy `browser_subagent` để kiểm thử hiển thị ở 2 độ phân giải: Desktop (`1200px`) và Mobile (`400px`).
- Ghi nhận lịch sử sửa đổi vào phần **Lịch sử Sự cố đã Khắc phục** bên dưới.

---

## 🎨 2. Phân loại & Khắc phục Lỗi Giao diện & Tương tác

### A. Lỗi mất nút Toggle Chevron hoặc Accordion trong Máy tính Lâm sàng
- **Hiện tượng**: Nút chevron thu gọn panel nhập liệu bị biến mất.
- **Nguyên nhân**: Class thẻ grid không khớp với selector trong `main.js` (`.na-grid`, `.urgent-grid`, `.calc-container`) hoặc panel kết quả bị lồng sai vào panel nhập liệu.
- **Cấu trúc chuẩn bắt buộc**:
```html
<div class="na-grid">
  <div class="panel">...</div> <!-- Panel 1: Nhập liệu -->
  <div class="panel sticky-panel">...</div> <!-- Panel 2: Kết quả -->
</div>
```

### B. Lỗi hiển thị nhãn / input bị xếp dọc hoặc méo mó
- Khi panel nhập liệu bị collapse (có class `.collapsed-state`), ta dùng thuộc tính ẩn các con:
```css
.panel.collapsed-state > *:not(.panel-title) {
  display: none !important;
}
```

### C. Lỗi Parse5 Parser: `invalid-first-character-of-tag-name` (Unescaped `<` & `>`)
- **Hiện tượng**: Lỗi build/parse HTML: `Unable to parse HTML; parse5 error code invalid-first-character-of-tag-name at line X:Y`.
- **Nguyên nhân**: Dùng ký tự `<` hoặc `>` trực tiếp trong văn bản HTML (ví dụ: `ĐH < 70 mg/dL` hoặc `ĐH > 180 mg/dL`). Trình parser nhầm ký tự `<` là mở đầu thẻ HTML mới có tên không hợp lệ.
- **Cách khắc phục**: Thay thế tất cả ký tự `<` trong văn bản bằng `&lt;` và `>` bằng `&gt;`.

### D. Lỗi Trình Duyệt Lưu Cache & Lệch ID Yêu Thích trong LocalStorage (`cong-cu.html`)
- **Hiện tượng**: Đã đổi tên/cập nhật thông tin thẻ trong `tools-data.js` nhưng giao diện trình duyệt vẫn hiển thị thẻ cũ.
- **Nguyên nhân**:
  1. Trình duyệt dùng bản cache HTTP của script (ví dụ `tools-data.js?v=3`).
  2. Mã ID cũ của công cụ bị kẹt trong `localStorage` (`cliniportal_favorite_tools`).
- **Cách khắc phục**:
  1. Tăng query parameter bẫy cache trong thẻ `<script>` (ví dụ `?v=3` ➔ `?v=4`).
  2. Bổ sung bộ ánh xạ `LEGACY_ID_MAP` trong `cong-cu-logic.js` để tự động migrate các ID cũ lưu trong `localStorage` sang ID mới.

---

## 📝 3. Nhật ký Sửa lỗi & Troubleshooting Log

Mỗi khi khắc phục sự cố, cập nhật ngay thông tin vào bảng sau:

### Lịch sử Sự cố đã Khắc phục

| Ngày | File Bị Ảnh Hưởng | Mô Tả Lỗi | Nguyên Nhân | Cách Khắc Phục |
| :--- | :--- | :--- | :--- | :--- |
| 15/07/2026 | `DG_Natri-Dich.html` | Trang bị co xẹp thành dải dọc 40px, màn hình đen. | Thiếu thẻ đóng `</div>` của `.app-container` khiến Footer lồng vào flex-box. | Bổ sung `</div>` cho `.app-container` ngay trước thẻ `<script>`. |
| 15/07/2026 | `DG_Kali-Canxi.html` | Lỗi HTML dư thừa ở Breadcrumb. | Thẻ đóng `</a>` dư thừa dòng 266. | Loại bỏ thẻ `</a>` dư thừa. |
| 26/07/2026 | `js/main.js` | `SyntaxError: Unexpected end of input` ngưng toàn bộ JS. | Thiếu dấu đóng `});` của click handler `.sample-case-btn`. | Thêm dấu `});` vào vị trí tương ứng. |
| 26/07/2026 | `js/clinical-reasoning.js` | `SyntaxError: Unexpected identifier 'Text'`. | Khoảng trắng trong tên hàm `generateSNAPPS Text()`. | Đổi tên hàm thành `generateSNAPPSText()`. |
| 27/07/2026 | Nâng cấp Hệ thống Skills | Khởi tạo công cụ truy vết Graphify & Quét HTML. | Cần tăng tốc chẩn đoán lỗi và phòng ngừa rủi ro side-effects. | Tích hợp `query_graph.js` và `check_tags.js` vào quy trình chẩn đoán. |
| 01/08/2026 | `css/components/homepage-bento.css` | Trang chủ bị co xẹp thành dải hẹp bên trái trên di động (width ≤ 768px), khoảng trắng lớn bên phải. | Widget `.bento-shift-checklist` bị thiếu trong danh sách override media query `@media (max-width: 768px)`, khiến CSS Grid giữ vị trí `grid-column: 10 / 13` và tự động sinh ra 12 cột ngầm. | Thay danh sách selector thủ công bằng selector tổng quát `.bento-homepage > * { grid-column: 1 / -1 !important; grid-row: auto !important; }` để đảm bảo 100% bento cards xếp 1 cột chuẩn. |
| 08/08/2026 | `insulin-studio.html` | `parse5 error code invalid-first-character-of-tag-name` | Gõ ký tự `<` thô trong thẻ HTML (`ĐH < 70 mg/dL`) khiến parser nhầm thành thẻ mới. | Chuyển toàn bộ `<` thành `&lt;` và `>` thành `&gt;`. |
| 08/08/2026 | `cong-cu.html`, `js/tools-data.js` | Thẻ công cụ cũ hiển thị lại từ cache & LocalStorage | Trình duyệt cache script `tools-data.js?v=3` và ID cũ còn trong `localStorage`. | Bumps version `?v=4` và thêm `LEGACY_ID_MAP` migrate ID cũ tự động trong `cong-cu-logic.js`. |

---

> [!IMPORTANT]
> **Quy tắc Vàng giảm thiểu rủi ro khi khắc phục sự cố:**
> 1. Đếm lại số thẻ HTML bằng `node tools/tools/scratch/check_tags.js <file>`.
> 2. Đánh giá mức độ ảnh hưởng bằng `node tools/tools/scratch/query_graph.js <symbol>`.
> 3. Sửa bằng script patch NodeJS để loại trừ hoàn toàn rủi ro CRLF truncation trên Windows.
