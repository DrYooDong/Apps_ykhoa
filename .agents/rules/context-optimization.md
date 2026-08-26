# Quy Tắc Tối Ưu Hóa Context & Quản Lý Bộ Nhớ AI (Context & Memory Optimization)

## 🧠 1. Kiến Trúc Bộ Nhớ AI (CoALA Memory Hierarchy)

1. **Semantic Memory (Tri thức Khái niệm)**:
   - Tra cứu quy tắc, định dạng và quy chuẩn y khoa qua các file `rules/*.md` và `docs/PROJECT_OVERVIEW.md`.
   - Không đọc lặp lại toàn bộ nếu chỉ cần 1 token quy ước.

2. **Episodic Memory (Bộ nhớ Trải nghiệm & Sự cố đã giải quyết)**:
   - Khi gặp bug hoặc sự cố phát sinh, ghi nhận vào `.agents/learnings/` hoặc tra cứu các skill sửa lỗi `fix-*` để không lặp lại lỗi cũ.

3. **Procedural Memory (Quy trình Thực thi)**:
   - Gọi đúng skill nghiệp vụ tương ứng (`.agents/skills/<skill-name>/SKILL.md`) theo từng phân hệ.

---

## ⚡ 2. Tiết kiệm Context Token & Tối Ưu Hóa Bộ Nhớ Phiên Làm Việc

1. **Hạn chế Quét Toàn Bộ Dự Án**: Tuyệt đối không dùng grep/find quét toàn bộ codebase hàng chục ngàn dòng nếu không chỉ định rõ `SearchPath` hoặc `Includes`.
2. **Khoanh vùng Phạm vi (Targeted Scoping)**: Đọc đúng file hoặc phạm vi dòng (`StartLine`, `EndLine`) cần làm việc.
3. **Đọc đúng Interface/Signature**: Khi tương tác với module khác, chỉ đọc phần định nghĩa hàm/DOM element thay vì tải cả file hàng ngàn dòng.
4. **Session Checkpoints & Tách Chat khi Đổi Task**:
   - Khi hoàn thành 1 milestone lớn, tổng kết tóm tắt tiến trình và cập nhật documentation trước khi chuyển task.
   - Tránh để context window quá tải (>100k tokens) làm suy giảm độ chính xác logic.
5. **State Persistence & Crash Recovery**:
   - Mọi trạng thái dữ liệu lưu trữ phía client phải tuân thủ chuẩn an toàn (Atomic write, fallback try-catch).
6. **File Ignore**: Tuân thủ `.cursorignore`, `.clineignore`, `.gitignore` để loại bỏ node_modules, log, build artifact khỏi luồng đọc của AI.

