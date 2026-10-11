# 🚀 Agent Starter Kit Dành Cho Mọi Dự Án Web

Bộ khung mẫu `.agents` siêu tốc, chuẩn hóa sẵn giúp AI Agent làm việc chính xác, an toàn và không bị hallucinate.

## 📦 Cách sử dụng cho dự án mới (Ví dụ: `App_Canhan`, `App_KhamBenh`...):

1. **Sao chép thư mục**:
   Sao chép toàn bộ nội dung trong `starter-kit/` vào thư mục gốc của dự án mới và đặt tên là `.agents/`:
   ```text
   <Thu_muc_du_an>/
   └── .agents/
       ├── AGENTS.md
       ├── commands/
       ├── rules/
       └── learnings/
   ```

2. **Chỉnh sửa nhẹ file `AGENTS.md`**:
   - Điền tên dự án.
   - Điền công nghệ (vd: HTML/Vanilla JS, React, Vue, Node.js).
   - Xác định file kiến trúc chính (vd: `index.html`, `main.js`, `patient_service.js`).

3. **Sử dụng ngay 5 lệnh thần tốc trong khung chat**:
   - `/new-feature [mô tả]` : Tạo tính năng mới an toàn, có tự kiểm thử.
   - `/fix-bug [mô tả]`     : Sửa lỗi tối thiểu có bằng chứng, chống hồi quy.
   - `/audit`               : Kiểm tra sức khỏe toàn diện mã nguồn.
   - `/ship`                : Chạy checklist bàn giao trước khi commit.
   - `/learn-from-session`  : Ghi lại kinh nghiệm sau mỗi phiên làm việc.
