# Guideline Creation & Duplicate Prevention Rules

> Quy chuẩn trình bày `.mdx`, EBM badges (`.ebm-rec-card`, `.cor-badge`, `.loe-badge`), Image Asset Pipeline và Image-to-Code Flowchart nạp từ skill `guideline-summary-module`.

1. **Cấm Tự Ý Tạo Guideline Mới**: Tuyệt đối không sinh file guideline mới trừ khi Người dùng yêu cầu trực tiếp. Khi nhận file `.md` nguồn, phải xác nhận tên file/slug trước khi tạo.
2. **Bắt Buộc Kiểm Tra Trùng Lặp 3 Yếu Tố**: Trước khi tạo mới hoặc nạp JSON, đối chiếu `KHO_GUIDELINES_STATIC` (`src/content/ebm/guidelines/js/kho-guidelines-registry.ts`) theo 3 tiêu chí: *(1) Bệnh/Chủ đề/ICD-10, (2) Năm công bố, (3) Tổ chức/Tạp chí*. Nếu đã tồn tại → cập nhật ghi đè hoặc hỏi Người dùng, cấm tạo slug trùng lặp gây rác hệ thống.
