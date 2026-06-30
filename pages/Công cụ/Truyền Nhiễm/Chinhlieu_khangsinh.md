# Cấu trúc và Phân tích Mã nguồn Chinhlieu_khangsinh.html

Tài liệu này phân tích chi tiết cấu trúc giao diện (HTML/CSS) và logic xử lý kịch bản (JavaScript) của công cụ tính liều kháng sinh dựa trên chức năng thận và tra cứu kháng sinh đồ nội bộ.

---

## 📁 1. Thông tin chung
* **Đường dẫn tệp:** [Chinhlieu_khangsinh.html](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/pages/C%C3%B4ng%20c%E1%BB%A5/Truy%E1%BB%81n%20Nhi%E1%BB%85m/Chinhlieu_khangsinh.html)
* **Chức năng chính:** 
  1. Tính toán mức lọc cầu thận (eGFR/ClCr) theo công thức Cockcroft-Gault.
  2. Gợi ý liều nạp (LD), liều duy trì (MD), khoảng cách liều, cách pha truyền (số giọt/phút hoặc SE ml/h), và lịch trình dùng thuốc cụ thể cho 25 loại kháng sinh/kháng nấm.
  3. Tra cứu dữ liệu kháng sinh đồ (KSĐ) lâm sàng của BV ĐKKV Quảng Nam (năm 2025, cập nhật 6/2026).
  4. Đưa ra các cảnh báo lâm sàng đặc hiệu (phù hợp bệnh lý nhiễm trùng thần kinh trung ương, viêm phổi, chống chỉ định,...).

---

## 🎨 2. Cấu trúc Giao diện & CSS
Giao diện được xây dựng bằng HTML5 & CSS3 thuần, hỗ trợ responsive.

### Các khối CSS chính (`<style>`)
* **Thiết lập biến màu sắc (`:root`):**
  * `--primary`: `#0f6fba` (Màu xanh chủ đạo)
  * `--primary-dark`: `#0a4f8a`
  * `--accent`: `#16a085` (Màu xanh lá nhẹ cho các nút thay thế)
  * `--danger`: `#c0392b` (Cảnh báo quan trọng)
  * `--warning`: `#e67e22` (Liều nạp / lọc máu)
  * `--bg`: `#f4f7fb`
* **Bố cục lưới (`.main`):**
  * Sử dụng CSS Grid: Cột trái rộng `380px` cố định trên màn hình lớn để chứa Form nhập liệu; Cột phải chiếm phần diện tích còn lại để hiển thị kết quả và lịch sử tra cứu.
  * Media Query (`@media (max-width: 800px)`): Chuyển thành dạng 1 cột dọc trên thiết bị di động.
* **Hiệu ứng chuyển động (Animations):**
  * `.stat-card`, `.result-card`, `.prep-box`, `.ksd-panel`: Sử dụng thuộc tính `transition` kết hợp hiệu ứng trượt nhẹ (slide up/slide right) và tăng dần độ mờ (fade-in) khi kết quả hiển thị.
  * `@keyframes shake`: Lắc nút "Tính liều" khi có lỗi nhập liệu.

### Các phân đoạn HTML chính
1. **Màn hình Intro (`#intro-screen`):** Hiển thị màn hình chờ giới thiệu phiên bản và tác giả khi truy cập lần đầu.
2. **Tiêu đề (`.app-header`):** Chứa thông tin tên phần mềm, phiên bản, nút đặt lại nhanh (`reset-btn`).
3. **Bảng điều khiển nhập liệu (`.left-panel`):**
   * Các ô nhập số: Creatinine huyết thanh, Tuổi, Cân nặng.
   * Giới tính (Radio buttons).
   * Ô tìm kiếm kháng sinh thông minh có danh sách gợi ý tự động (Autocomplete suggestions).
   * Grid chọn nhanh bệnh lý nhiễm trùng (Viêm phổi, NK tiêu hóa, NK thần kinh TW,...).
   * Dropdown chọn mức độ nặng lâm sàng.
   * Nút bật/tắt trạng thái lọc máu liên tục/thẩm phân máu (`dialysis-toggle`).
4. **Bảng kết quả & Lịch sử (`.right-panel`):**
   * Danh sách lịch sử tra cứu nhanh (tối đa 5 lượt tra cứu gần nhất lưu qua `localStorage`).
   * Vùng kết quả (`#result-area`): Chỉ hiển thị sau khi nhấn nút **Tính liều**.

---

## ⚙️ 3. Cơ chế logic và Thuật toán trong JavaScript

### a. Ước tính chức năng thận (Cockcroft-Gault)
```javascript
function calcCrCl(scr, age, weight, gender) {
  if (gender === 'female') {
    return Math.round(((140 - age) * weight * 0.85) / (0.814 * scr) * 10) / 10;
  }
  return Math.round(((140 - age) * weight) / (0.814 * scr) * 10) / 10;
}
```
* **Tham số:** Creatinine huyết thanh (µmol/L), Tuổi (năm), Cân nặng (kg), Giới tính (male/female).
* **Kết quả:** Trả về ClCr (ml/phút) làm tròn tới 1 chữ số thập phân.

### b. Tìm kiếm kháng sinh thông minh (Fuzzy Search)
* Hàm `searchAB(val)` lọc danh sách kháng sinh dựa trên chuỗi tìm kiếm.
* Nếu không tìm thấy kết quả khớp chính xác, hàm `strSim(a, b)` sử dụng thuật toán tính toán độ tương đồng giữa các cặp ký tự liền kề (Bigram) để gợi ý các thuốc gần đúng nhất:
  ```javascript
  function strSim(a, b) {
    a = a.toLowerCase(); b = b.toLowerCase();
    if (a === b) return 1;
    if (a.includes(b) || b.includes(a)) return 0.85;
    const setA = new Set();
    for (let i = 0; i < a.length - 1; i++) setA.add(a.slice(i, i+2));
    let hits = 0;
    for (let i = 0; i < b.length - 1; i++) if (setA.has(b.slice(i, i+2))) hits++;
    return hits / Math.max(setA.size, b.length - 1, 1);
  }
  ```

### c. Các trình dựng giao diện thuốc đặc biệt (Special Renderers)
* **`renderTeicoplanin`:** 
  * Cho phép chọn liều nạp theo 2 nhóm chỉ định nặng/trung bình. Tính toán liều nạp tự động theo mg/kg và giới hạn tối đa (`maxMg`).
  * Trình bày liều duy trì (MD) bắt đầu từ ngày 5 dưới dạng bảng so sánh các khoảng cách liều (q24h, q48h, q72h) dựa trên mức lọc cầu thận hiện tại của bệnh nhân.
* **`renderColistin`:**
  * Liều nạp tính theo **Cân nặng lý tưởng (IBW)**: $4\text{ mg CBA/kg IBW}$ (tối đa 300mg CBA ~ 9 MIU).
  * Liều duy trì được hiển thị chi tiết qua 7 phân nhóm mức lọc cầu thận khác nhau.

### d. Tính tốc độ truyền và giờ dùng thuốc (infusion rates & schedule)
* **Tính tốc độ truyền (`formatPrepStructured`):** 
  * Nếu dùng bơm tiêm điện (`prep.se = true`): tính tốc độ truyền bằng ml/h cho thể tích 50ml.
  * Nếu truyền tĩnh mạch thông thường: tính số giọt/phút (**CTM**) theo công thức: 
    $$\text{CTM (giọt/phút)} = \frac{\text{Thể tích (ml)} \times 20}{\text{Thời gian (phút)}}$$
    Sau đó làm tròn về bội số của 5 gần nhất thông qua hàm `roundTo5` và chuyển sang số La Mã bằng hàm `toRoman`.
* **Tính lịch dùng thuốc (`calcSchedule`):** Tự động chia giờ dùng thuốc trong ngày (24 giờ) dựa trên giờ bắt đầu và khoảng cách liều (ví dụ: `q8h` từ 08:00 sẽ tạo lịch `8h-16h-0h`).

### e. Kiểm tra tính tương thích bệnh lý (`getDiseaseCompatibility`)
Thực hiện các cảnh báo đặc hiệu:
* Cảnh báo chống chỉ định **Daptomycin** trong viêm phổi (do bị bất hoạt bởi surfactant phổi).
* Cảnh báo không ưu tiên dùng **Metronidazole** hay **Clindamycin** trong viêm phổi.
* Cảnh báo kháng sinh kém thấm qua hàng rào máu não đối với **Nhiễm trùng thần kinh trung ương** (yêu cầu dùng các kháng sinh có bằng chứng thấm tốt như Ceftriaxone 2g q12h, Meropenem 2g q8h,...).

---

## 🗄️ 4. Cơ sở dữ liệu nhúng (Embedded Databases)

### a. Danh sách kháng sinh (`const AB`)
Mỗi kháng sinh là một đối tượng chứa:
* `id`, `name`, `group` (nhóm kháng sinh), `route` (đường dùng), `forms` (dạng bào chế).
* `dosing`: Mảng chứa các quy tắc chỉnh liều phân tầng theo ClCr (`cmin` - `cmax`) và mức độ nặng lâm sàng (`trung_binh`, `nang`, `nguy_kich`).
* `dialysis`: Hướng dẫn chỉnh liều chi tiết khi lọc máu (CRRT/HD).
* `prep`: Cách pha thuốc gồm loại dung môi (`sol`), thể tích (`vol`), thời gian truyền (`time`), và cờ sử dụng bơm tiêm điện (`se`).
* `notes`: Các lưu ý lâm sàng đặc biệt quan trọng (như độc thận, độc tai, hội chứng Red Man, nguy cơ co giật,...).
* `alt`: Mảng ID các kháng sinh cùng nhóm có thể thay thế khi cần.

### b. Danh sách kháng sinh đồ (`const KSD` & `KSD_TIER`)
Liên kết trực tiếp dữ liệu vi sinh lâm sàng cho từng kháng sinh:
* `hieu_luc`: Phân cấp hiệu lực dựa trên độ nhạy cảm tại bệnh viện:
  * `con_hieu_qua` (Nhạy $\ge 80\%$)
  * `co_dieu_kien` (Có điều kiện / Cần thận trọng)
  * `khang_cao` (Kháng $> 29\%$)
  * `mat_hieu_luc` (Kháng $> 70\%$)
* `vi_khuan`: Mảng chứa tỷ lệ phần trăm cụ thể nhạy cảm (S), trung gian (I), kháng (R) của các loại vi khuẩn đích tại cơ sở y tế (ví dụ: tỷ lệ kháng của *A. baumannii*, *Pseudomonas aeruginosa*, *E. coli*, tụ cầu vàng *S. aureus*).

---

## ⚠ 5. Điểm lệch chuẩn so với Quy chuẩn CliniPortal

Đối chiếu với tài liệu hướng dẫn phát triển hệ thống [AGENTS.md](file:///.agents/AGENTS.md), tệp tin này hiện đang hoạt động như một trang độc lập và chưa tích hợp đầy đủ vào hệ sinh thái của dự án:

1. **Thiếu Layout Động (Dynamic Layout Placeholders):**
   * Chưa khai báo các thẻ placeholder nhúng Header và Footer:
     ```html
     <div id="header-placeholder" data-header-path="[relative_path]/components/header.html"></div>
     <div id="footer-placeholder" data-footer-path="[relative_path]/components/footer.html"></div>
     ```
   * Phần Header hiện tại (`.app-header`) được dựng cứng bằng HTML/CSS nội bộ.
2. **Thiếu khung điều hướng (Sidebar):**
   * Không có thẻ `<aside class="app-sidebar">` và logic nạp kịch bản `js/sidebar.js` để đồng bộ menu điều hướng với các công cụ y khoa khác trong phân hệ.
3. **Mã CSS chưa được tối ưu hóa:**
   * CSS định nghĩa trực tiếp trong tệp thay vì kế thừa các Design Tokens từ `css/main.css`.
   * Việc tự định nghĩa các mã màu cứng (`#0f6fba`, `#ffffff`) làm mất khả năng tự động chuyển đổi giao diện sáng/tối (Dark Mode) theo thuộc tính `data-theme` của toàn hệ thống.
4. **Liên kết tài nguyên bên ngoài:**
   * Sử dụng liên kết CDN cho các biểu tượng mà không hỗ trợ dự phòng ngoại tuyến đầy đủ (offline accessibility) theo chuẩn hoạt động của CliniPortal.
