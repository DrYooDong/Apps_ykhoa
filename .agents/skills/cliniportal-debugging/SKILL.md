---
name: cliniportal-debugging
description: >
  Chẩn đoán và khắc phục các sự cố giao diện, lỗi lồng thẻ HTML, lỗi CSS Grid/Flexbox,
  lỗi Windows Line Endings và lỗi JavaScript trong phân hệ Công cụ & Kỹ năng của CliniPortal.
---

# CliniPortal Debugging & Troubleshooting Skill

Skill này cung cấp các nguyên tắc, phương pháp chẩn đoán và quy trình khắc phục các lỗi giao diện, lỗi cú pháp HTML/CSS/JS, và lỗi tương tác đặc thù trong hệ sinh thái CliniPortal.

---

## 🛑 1. Sự cố Lồng thẻ & Mất toàn vẹn HTML (HTML Markup Integrity)

### A. Hiện tượng & Hậu quả
- **Hiện tượng**: Một phần diện tích lớn của trang (như `.main-wrapper`) bị biến mất, đen ngòm hoặc bị co xẹp xuống kích thước cực hẹp (~40px) ở mép trái màn hình; chữ hoặc các ô nhập liệu bị xếp dọc từ trên xuống dưới.
- **Nguyên nhân cốt lõi**: Thiếu thẻ đóng `</div>` của các thẻ bao ngoài lớn (đặc biệt là `.app-container` hoặc `.main-wrapper`).
  - Khi thiếu thẻ đóng `.app-container`, trình duyệt tự động lồng các phần tử phía sau (bao gồm cả `#footer-placeholder` và footer được inject động qua JS) vào bên trong `.app-container`.
  - Do `.app-container` sử dụng cơ chế **Flexbox** (`display: flex`), Footer khi bị lọt vào trong sẽ trở thành một flex-item thứ ba, chèn ép dữ dội và làm co xẹp `.main-wrapper` (flex-item thứ hai) để nhường chỗ cho chính nó.

### B. Phương pháp Chẩn đoán
Trước khi tiến hành sửa đổi giao diện hoặc nghi ngờ lỗi JS, hãy chạy một script kiểm tra tính cân bằng của các thẻ HTML đóng/mở trên file lỗi.
Dưới đây là mã nguồn NodeJS khuyến nghị để quét nhanh lỗi thẻ đóng (lưu tại `scratch/check_tags.js`):

```javascript
const fs = require('fs');
const content = fs.readFileSync('path/to/file.html', 'utf8');
const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const stack = [];
const errors = [];

// Quét các thẻ HTML trong content (đã bỏ qua comments, script, style)...
// Nếu phát hiện stack không rỗng ở cuối hoặc thẻ đóng không khớp giữa chừng -> báo lỗi dòng cụ thể.
```

### C. Cách Khắc phục
- Đảm bảo cấu trúc phân cấp ở cuối file luôn đầy đủ:
```html
      </div> <!-- Đóng .na-grid / .urgent-grid -->
    </div> <!-- Đóng .main-wrapper -->
  </div> <!-- Đóng .app-container (CỰC KỲ QUAN TRỌNG - PHẢI CÓ) -->
  
  <script>
    // Javascript logic...
  </script>
  <div id="footer-placeholder" data-footer-path="../../../components/footer.html"></div>
</body>
</html>
```

---

## 💻 2. Sự cố Dịch dòng & Cắt cụt tệp tin trên Windows (Windows Line Endings)

### A. Bản chất Sự cố
- Dự án chạy trên hệ điều hành **Windows**, sử dụng ký tự xuống dòng `\r\n` (CRLF).
- Các công cụ tự động chỉnh sửa code dựa trên chỉ số dòng (như `replace_file_content`) rất dễ bị lệch dòng khi đếm ký tự byte, dẫn đến việc ghi đè sai vị trí và vô tình **cắt cụt (truncate)** mất nửa cuối của tệp tin.

### B. Giải pháp Sửa đổi An toàn (Safe Patching)
Khi cần sửa đổi các file HTML lớn hoặc chèn ca lâm sàng mẫu, **HẠN CHẾ** dùng công cụ chỉnh sửa dòng tự động trực tiếp trên các khối code dài. Thay vào đó, hãy viết một script NodeJS ngắn trong thư mục `scratch/` để đọc và thay thế chuỗi an toàn:

```javascript
const fs = require('fs');
const filePath = 'path/to/file.html';
let content = fs.readFileSync(filePath, 'utf8');

// Sử dụng replace chuỗi định danh độc nhất thay vì chỉ số dòng
content = content.replace('chuỗi_gốc_độc_nhất', 'chuỗi_mới_đã_vá');

fs.writeFileSync(filePath, content, 'utf8');
```

---

## 🎨 3. Lỗi Giao diện & Tương tác trong phân hệ Máy tính Lâm sàng

### A. Lỗi mất nút Toggle Chevron hoặc Accordion
- **Hiện tượng**: Không thấy nút chevron thu gọn panel nhập liệu ở góc trên bên phải, panel nhập liệu không thể co giãn.
- **Nguyên nhân**:
  - Tên class của thẻ grid không khớp với selector trong `main.js` (ví dụ: dùng class tự chế thay vì `.na-grid`, `.urgent-grid` hoặc `.calc-container`).
  - Cấu trúc con bị lỗi khiến `calcContainer.children.length < 2` (do panel kết quả bị lồng vào trong panel nhập liệu).
- **Khắc phục**: Đảm bảo cấu trúc phân cấp của máy tính lâm sàng luôn tuân thủ chuẩn:
```html
<div class="na-grid"> (hoặc urgent-grid, calc-container)
  <div class="panel">...</div> <!-- Con thứ 1: Nhập liệu -->
  <div class="panel sticky-panel">...</div> <!-- Con thứ 2: Kết quả -->
</div>
```

### B. Lỗi hiển thị nhãn / input bị xếp dọc hoặc méo mó
- Khi panel nhập liệu bị collapse (có class `.collapsed-state`), ta dùng thuộc tính ẩn các con:
```css
.panel.collapsed-state > *:not(.panel-title) {
  display: none !important;
}
```
- Nếu các phần tử bên trong vẫn hiển thị méo mó mà không bị ẩn đi, hãy kiểm tra xem class `.collapsed-state` đã được add vào đúng thẻ `.panel` chưa, hoặc có selector CSS nào ghi đè làm hiển thị lại các phần tử con đó không.

---

## 📝 4. Nhật ký Sửa lỗi & Ghi chú các Phần sửa lỗi Khác (Troubleshooting Log Template)

Mỗi khi phát hiện và khắc phục một lỗi nghiêm trọng trong hệ thống, hãy cập nhật thông tin lỗi vào phần này dưới dạng bảng hoặc danh sách chuẩn hóa để lưu lại tri thức cho các AI Agents tiếp theo.

### Lịch sử Sự cố đã Khắc phục

| Ngày | File Bị Ảnh Hưởng | Mô Tả Lỗi | Nguyên Nhân | Cách Khắc Phục |
| :--- | :--- | :--- | :--- | :--- |
| 15/07/2026 | `DG_Natri-Dich.html` | Toàn bộ trang bị co xẹp thành dải dọc 40px, màn hình đen ngòm. | Thiếu thẻ đóng `</div>` của `.app-container` làm Footer bị chui vào trong flex-box. | Thêm thẻ đóng `</div>` cho `.app-container` ngay trước thẻ `<script>`. |
| 15/07/2026 | `DG_Kali-Canxi.html` | Lỗi cú pháp HTML nhỏ trong Breadcrumb. | Có thẻ đóng `</a>` dư thừa ở dòng 266 của Breadcrumb item. | Loại bỏ thẻ đóng `</a>` dư thừa. |

---
> [!IMPORTANT]
> Quy trình 3 bước bắt buộc khi sửa lỗi giao diện:
> 1. Chạy script check thẻ đóng mở để bảo toàn cấu trúc HTML.
> 2. Thực hiện sửa đổi bằng script patch NodeJS để tránh lỗi dịch dòng CRLF trên Windows.
> 3. Chạy `browser_subagent` kiểm thử trên cả kích thước Desktop (1200px) và Mobile (400px).
