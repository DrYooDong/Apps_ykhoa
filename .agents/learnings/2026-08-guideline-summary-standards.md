# Quyết Định & Tiêu Chuẩn Xây Dựng Trang Tóm Tắt Guidelines (EBM Guideline Summaries)

> **Ngày ghi nhận**: 09/08/2026  
> **Phân hệ**: Y học chứng cứ (EBM) — Kho Guidelines (`src/content/ebm/guidelines/kho-guidelines/`)

---

## 🎯 Quy Tắc Cốt Lõi (Bắt Buộc Tuân Thủ 100%)

1. **BẢO TỒN 100% NỘI DUNG Y KHOA TỪ FILE .MD (100% Medical Content Integrity)**:
   - Các file `.md` nguồn do người dùng cung cấp đã được tóm tắt và tổng hợp kỹ lưỡng từ các nghiên cứu/guideline chính thức.
   - **CẤM BỎ BỚT, CẮT NGẮN HOẶC LÀM MẤT NỘI DUNG**: Mọi mốc chỉ số chẩn đoán, phân loại giai đoạn, bảng/sơ đồ trích xuất (FIGURE/TABLE), tên các thử nghiệm lâm sàng (như SELECT, SUMMIT, FIGHT, LIVE...), tỷ lệ %, Hazard Ratio, chỉ định/chống chỉ định và tài liệu tham khảo AMA phải xuất hiện đầy đủ 100% trên trang HTML.

2. **CẤM TRÌNH BÀY DẠNG TEXT ĐƠN ĐIỆU (Visual Clinical UI Presentation)**:
   - Tuyệt đối không chỉ chuyển đổi markdown thành các đoạn văn bản (text) hay danh sách (`<ul>`/`<ol>`) đơn điệu.
   - Bắt buộc tổ chức tri thức bằng các linh kiện UI y khoa trực quan, sinh động:
     - **Bento Grid Cards / Matrix Boards**: Phân loại giai đoạn và tiêu chuẩn chẩn đoán.
     - **Lưu đồ & Thuật toán Lâm sàng (Flowchart V2 / Step Cards)**: Dựng các bước quyết định lâm sàng.
     - **Thẻ Phân Cấp Khuyến Cáo (COR & LOE Badges)**: Hiển thị nổi bật `COR 1`, `COR 2a`, `COR 2b`, `COR 3-HARM`, `LOE A`, `LOE B-R`.
     - **Bảng Phác Đồ Liều Dùng (`.data-table` & `.rx-tag`)**: Trình bày tên thuốc, liều lượng, ngưỡng eGFR và Clinical Pearls.
     - **Infoboxes Cảnh Báo Màu Sắc**: Khung Alert `danger`, `warning`, `success`, `info`, `teal`.

3. **BẮT BUỘC KIỂM TRA & LÀM SẠCH LỖI $ (Math LaTeX Cleanup)**:
   - Trước khi kết thúc tác vụ, phải làm sạch 100% các ký tự `$` math LaTeX (ví dụ: `$BMI \ge 25$` $\rightarrow$ `BMI ≥ 25`, `$\ge 150\text{ mg/dL}$` $\rightarrow$ `≥ 150 mg/dL`, `$\ge 20\%$` $\rightarrow$ `≥ 20%`).
   - Không để bất kỳ ký tự `$` thô nào hiển thị trên giao diện web.

4. **ĐẮNG KÝ REGISTRY & CHECK INTEGRITY**:
   - Đăng ký bản ghi mới vào array `SAMPLE_STUDIES` trong `guidelinesdata.js`.
   - Chạy `node scratch/check_tags.js <file>.html` để đảm bảo 0 lỗi đóng mở thẻ HTML.
