# Quy Tắc Bảo Vệ Phân Quyền Subagent (Cascading Permission Guard)

> **Bài học từ OpenCode**: Sự cố an ninh khi Agent chính ở chế độ *Plan Mode* (Read-Only) nhưng khi spawn *Subagent* lại vô tình cấp quyền Full Access khiến Subagent tự ý chỉnh sửa mã nguồn ngoài tầm kiểm soát.

---

## 🛡️ Nguyên Tắc Kế Thừa Quyền Hạn (Permission Cascading)

1. **Ràng buộc Read-Only nghiêm ngặt**:
   - Khi Agent chính đang ở giai đoạn **Nghiên cứu (Research)**, **Lập kế hoạch (Plan Mode)**, hoặc **Đánh giá (Audit/Review)**, mọi Subagent được khởi tạo bắt buộc phải **kế thừa 100% chế độ Read-Only**.
   - Subagent trong trạng thái này **tuyệt đối không được phép**:
     - Sử dụng công cụ chỉnh sửa (`write_to_file`, `replace_file_content`, `multi_replace_file_content`).
     - Chạy các lệnh shell mang tính thay đổi trạng thái workspace (như `git checkout`, `npm install`, `rm`, xóa thư mục).

2. **Cổng Phê Duyệt Tường Minh (Socratic Gate & Approval)**:
   - Chỉ khi Người dùng chính thức duyệt Kế hoạch triển khai (`implementation_plan.md`) hoặc ra lệnh trực tiếp, Agent mới được phép chuyển sang chế độ **Thực thi (Build / Mutate Mode)**.
   - Khi đó, các Subagent chuyên trách mới được cấp quyền ghi tương ứng với phạm vi nhiệm vụ (Scoped Write).

3. **Bảo vệ Tính Toàn Vẹn Đường Dẫn & Cấu Trúc File**:
   - Mọi Subagent khi làm việc trong CliniPortal phải tuân thủ tuyệt đối quy tắc đường dẫn tương đối theo cấp thư mục (Level 0 đến Level 4).
   - Không Subagent nào được phép tự ý di chuyển file hoặc đổi tên file nếu không nằm trong danh mục kế hoạch đã duyệt.
