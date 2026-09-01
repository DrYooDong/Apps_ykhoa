# Quy Tắc Chuẩn Hóa Nội Dung Y Khoa & An Toàn Lâm Sàng (Medical Content & Clinical Safety Rules)

Mọi bài viết, phác đồ, công cụ tính toán và khuyến cáo y khoa trong CliniPortal phải tuân thủ nghiêm ngặt các quy chuẩn sau:

## 🩺 1. Quy chuẩn Nội dung & Y học Chứng cứ (EBM)
1. **Nguồn trích dẫn**: Ghi rõ tổ chức ban hành chính thức (NICE, ESC, ACC/AHA, KDIGO, GINA, GOLD, Bộ Y tế...) + năm cập nhật hoặc định danh y văn chính xác (PMID/DOI).
2. **Mức độ khuyến cáo**: Ghi rõ phân hạng Class (Class I, IIa, IIb, III) và Bằng chứng Level of Evidence (LoE A, B, C).
3. **Cảnh báo an toàn (Safety Banners)**: Bắt buộc highlight các chống chỉ định, liều độc, tương tác thuốc nguy hiểm bằng các khung infobox cảnh báo:
   ```html
   <div class="infobox danger">
     <div class="infobox-title">⚠️ Cảnh báo lâm sàng</div>
     <div class="infobox-body">...</div>
   </div>
   ```
4. **Văn phong Y khoa**: Sử dụng Tiếng Việt lâm sàng súc tích, chuyên nghiệp. Loại bỏ các từ ngữ mang dấu vết văn phong AI rườm rà (sử dụng skill `medical-humanizer`).
5. **BẮT BUỘC XỬ LÝ & NHÚNG 100% HÌNH ẢNH ĐÍNH KÈM TỪ FILE NGUỒN .MD (Image Asset Pipeline)**:
   - Khi file `.md` nguồn (trong `knowledge-vault/` hoặc các nguồn đầu vào) chứa cú pháp hình ảnh (`![[Pasted image ...]]` hoặc `![alt](path)`):
   - **Bước 1 (Trích xuất & Sao chép)**: Tìm file ảnh gốc trong `knowledge-vault/_resources/attachments/` và sao chép sang thư mục `images/` của phân hệ tương ứng (`src/content/.../images/`), đổi tên theo định dạng chuẩn kebab-case có ý nghĩa lâm sàng (vd: `<slug>-<feature>.png` hoặc `<slug>-fig<X>.png`).
   - **Bước 2 (Nhúng trực quan có chú thích)**: Bắt buộc nhúng hình ảnh vào bài `.mdx` bằng thẻ `<figure class="physio-figure">` hoặc `<div class="fig-card">` kèm `<figcaption>` / `<div class="fig-caption">` giải thích cơ chế, trích dẫn rõ nguồn EBM và hỗ trợ lightbox phóng to (`class="... lightbox-trigger"`).
   - **Tuyệt đối không được bỏ quên hoặc chỉ mô tả bằng chữ mà không nhúng tệp ảnh thực tế.**

---

## 🛡️ 2. An Toàn Hệ Thống Tính Toán Lâm Sàng (CDSS & Patient Safety Gates)
1. **Nguyên tắc "Zero Tolerance" đối với sai lệch liều lượng**: Mọi hàm tính toán liều (theo eGFR, cân nặng, BSA) phải là Pure Function, có kiểm tra biên (Edge Cases: suy thận nặng, béo phì, trẻ sơ sinh).
2. **Chuẩn hóa Đơn vị Đo**: Khi xử lý đường huyết, điện giải, men gan, creatinine... BẮT BUỘC quy đổi tường minh giữa các hệ đơn vị (vd: `mg/dL` $\leftrightarrow$ `mmol/L`, `μmol/L`). Không để người dùng nhầm lẫn đơn vị.
3. **Cờ Báo Nguy Kịch (Panic / Critical Values)**: Khi giá trị cận lâm sàng vượt ngưỡng nguy hiểm đến tính mạng (vd: $K^+ > 6.5\text{ mmol/L}$, Đường huyết $< 2.8\text{ mmol/L}$), giao diện phải bật cảnh báo đỏ nhấp nháy hoặc thông báo khẩn.

---

## 🔒 3. Bảo Vệ Dữ Liệu Sức Khỏe Định Danh (PHI/PII Compliance)
1. **Ẩn danh hóa 100% ca bệnh lâm sàng**: Khi đưa ví dụ case study hoặc ghi nhận nhật ký bệnh án (SOAP / Case Logger), TUYỆT ĐỐI KHÔNG chứa tên thật, số CMND/CCCD, địa chỉ cụ thể hoặc số điện thoại của bệnh nhân.
2. **Lưu trữ Cục bộ An toàn**: Mọi dữ liệu người dùng nhập trên CliniPortal chỉ được lưu trữ trên trình duyệt của máy người dùng (Client-side localStorage/IndexedDB), không truyền dữ liệu y tế nhạy cảm ra ngoài máy chủ lạ.

