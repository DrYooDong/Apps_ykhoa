# Quyết Định & Tiêu Chuẩn Xây Dựng Trang Tóm Tắt Guidelines (EBM Guideline Summaries)

> **Ngày ghi nhận**: 09/08/2026  
> **Phân hệ**: Y học chứng cứ (EBM) — Kho Guidelines (`src/content/ebm/guidelines/kho-guidelines/`)

---

## 🎯 Quy Tắc Cốt Lõi (Bắt Buộc Tuân Thủ 100%)

1. **BẢO TỒN 100% NỘI DUNG Y KHOA TỪ FILE .MD (100% Medical Content Integrity)**:
   - Các file `.md` nguồn do người dùng cung cấp đã được tóm tắt và tổng hợp kỹ lưỡng từ các nghiên cứu/guideline chính thức.
   - **CẤM BỎ BỚT, CẮT NGẮN HOẶC LÀM MẤT NỘI DUNG**: Mọi mốc chỉ số chẩn đoán, phân loại giai đoạn, bảng/sơ đồ trích xuất (FIGURE/TABLE), tên các thử nghiệm lâm sàng, tỷ lệ %, Hazard Ratio, chỉ định/chống chỉ định và tài liệu tham khảo AMA phải xuất hiện đầy đủ 100% trên trang MDX.

2. **TỔNG HỢP NGUỒN ĐA PHẦN & TRÍCH XUẤT ẢNH ĐÍNH KÈM (Multi-part & Image Pipeline)**:
   - Khi tài liệu chia thành nhiều phần (`_P1.md`, `_P2.md`, `_P3.md`...), dùng script:
     `node .agents/skills/guideline-summary-module/scripts/synthesize_guideline_mdx.js --slug=<slug> --files="<files>"`
   - Tự động phát hiện `![[Pasted image ...]]` và copy vào `src/content/ebm/guidelines/kho-guidelines/images/<slug>-fig<X>.<ext>`.
   - Nhúng vào cấu trúc thẻ chuẩn `<div class="fig-card"><img src="./images/..." ... /><div class="fig-caption">...</div></div>`.

3. **CẤM TRÌNH BÀY DẠNG TEXT ĐƠN ĐIỆU (Visual Clinical UI Presentation)**:
   - Tuyệt đối không chỉ chuyển đổi markdown thành các đoạn văn bản (text) hay danh sách (`<ul>`/`<ol>`) đơn điệu.
   - Bắt buộc tổ chức tri thức bằng các linh kiện UI y khoa trực quan:
     - **Stats Strip & Bento Cards**: Nêu bật các con số then chốt (257M nhiễm, ~10M VN, Treat-all).
     - **Pillars & Quickmenu**: Tóm tắt 3 trụ cột và thanh điều hướng dính.
     - **Bảng Phác Đồ Liều Dùng (`.table-wrapper`, `.regimen-table`, `.rx-tag`)**: Trình bày rõ ràng liều, chỉ định, chỉnh liều suy thận/gan.
     - **Infoboxes Cảnh Báo Màu Sắc**: Khung Alert `danger`, `warning`, `success`, `info`.

4. **BẮT BUỘC KIỂM TRA & LÀM SẠCH LỖI $ (Math LaTeX Cleanup)**:
   - Làm sạch 100% ký tự `$` math LaTeX (`$BMI \ge 25$` $\rightarrow$ `BMI ≥ 25`, `$ALT \ge 40$` $\rightarrow$ `ALT ≥ 40`, `$\ge 150\text{ mg/dL}$` $\rightarrow$ `≥ 150 mg/dL`, `$\ge 20\%$` $\rightarrow$ `≥ 20%`).

5. **KỸ THUẬT GHI FILE LỚN TRÁNH LỖI WINDOWS CLI**:
   - Khi tạo file MDX lớn (> 30KB), không truyền trực tiếp chuỗi multiline qua PowerShell command line để tránh lỗi *"The filename or extension is too long"*. Sử dụng Node.js/Python script để ghi file UTF-8 an toàn.

6. **ĐĂNG KÝ REGISTRY & CHECK INTEGRITY**:
   - Đăng ký bản ghi mới vào array `SAMPLE_STUDIES` trong `guidelinesdata.js`.
   - Chạy `node tools/scratch/check_tags.js src/content/ebm/guidelines/kho-guidelines/<slug>.mdx` để đảm bảo 0 lỗi đóng mở thẻ HTML.
