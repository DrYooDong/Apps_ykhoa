# Guideline Creation & Duplicate Prevention Rules

## 🛑 Quy Tắc Bắt Buộc Về Tạo Guideline Mới

1. **CẤM TỰ Ý TẠO GUIDELINE MỚI KHÔNG CÓ YÊU CẦU TRỰC TIẾP**: 
   - AI **TUYỆT ĐỐI KHÔNG ĐƯỢC** tự động sinh ra hoặc tạo file `.html` guideline mới trừ khi Người dùng có yêu cầu rõ ràng ("Hãy tạo tóm tắt guideline...", "Xây dựng tóm tắt guidelines...").
   - Khi Người dùng cung cấp tài liệu `.md`, AI phải **HỎI Ý KIẾN HOẶC XÁC NHẬN TÊN FILE / SLUG** trước khi tự ý khởi tạo file trong Kho Guidelines.

2. **KIỂM TRA TRÙNG LẶP (DUPLICATE CHECK) BẮT BUỘC**:
   - Trước khi tạo bất kỳ trang Guideline mới nào hoặc nạp mảng JSON, AI **BẮT BUỘC** phải sử dụng Phép Kiểm Trùng Lặp 3 yếu tố (`detectStudyDuplicate` / `batchCheckDuplicates`):
     1. **Bệnh / Vấn đề y khoa / Thuốc / Tiêu đề** (`conditionKey`, `specialty`, `icd10`, `drug`, `title`)
     2. **Năm công bố** (`year`)
     3. **Nguồn / Tổ chức / Tạp chí phát hành** (`organization`, `journal`, `sourceType`)
   - Nếu đã tồn tại file guideline hoặc bản ghi tương tự: **KHÔNG ĐƯỢC TẠO FILE MỚI KHÁC SLUG** gây rác hệ thống. Hãy thực thi cơ chế **Ghi đè/Cập nhật** (Overwrite) hoặc hỏi ý kiến Người dùng.

3. **BẢO VỆ REGISTRY & TỰ ĐỘNG DỌN DẸP**:
   - Khi tạo file theo yêu cầu, phải kiểm tra danh sách `SAMPLE_STUDIES` để tránh ghi trùng lặp các key ID / slug.

4. **BẮT BUỘC CHUẨN HÓA PHÂN CẤP BẰNG CHỨNG (EBM EVIDENCE HIERARCHY)**:
   - Mọi trang Guideline được khởi tạo hoặc cập nhật từ nay về sau **BẮT BUỘC** phải tích hợp bộ linh kiện Phân cấp Bằng chứng EBM trực quan: Thẻ khuyến cáo `.ebm-rec-card`, nhãn Khuyến cáo `.cor-badge` (Class I, IIa, IIb, III) và nhãn Bằng chứng `.loe-badge` (Level/Grade A, B, C, E) theo đúng chuẩn thiết kế trong Skill `guideline-summary-module`.


