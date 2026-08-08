# Quy Tắc Tối Ưu Hóa Context & Token Space (Context Optimization)

## 🧠 Tiết kiệm Context Token cho AI Agent

1. **Hạn chế Quét Toàn Bộ Dự Án**: Không sử dụng các câu lệnh grep/find quét toàn bộ codebase nếu không thật sự cần thiết.
2. **Khoanh vùng Phạm vi (Targeted Scoping)**: Đọc đúng file hoặc hàm/symbol cần làm việc.
3. **Đọc đúng Interface/Signature**: Khi tương tác với module khác, chỉ đọc phần định nghĩa kiểu hoặc signature hàm thay vì load cả file hàng nghìn dòng.
4. **Tách Chat khi đổi Task**: Chuyển sang Chat/Session mới khi xong một task lớn để giải phóng bộ nhớ context.
5. **File Ignore**: Tuân thủ `.cursorignore`, `.clineignore`, `.aiderignore` để loại bỏ node_modules, log, build artifact khỏi luồng đọc của AI.
