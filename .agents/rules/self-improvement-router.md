# 🔄 Quy Tắc Vận Hành Vòng Lặp Tự Cải Thiện (Lesson Router & Self-Improvement)

Tài liệu này định nghĩa cách thức AI Agent tự động học hỏi, nâng cấp năng lực cho bản thân và "đồng đội" sau mỗi lần thực hiện kế hoạch hoặc sửa lỗi.

---

## 🧭 1. Ma Trận Điều Hướng Bài Học (Lesson Routing Matrix)

Mọi bài học rút ra từ thực tế đều phải được xếp đúng vị trí, **tuyệt đối không để lưu trữ vô nghĩa**:

| Bản chất sự cố / Bài học | Nơi cập nhật trực tiếp | Hành động bắt buộc |
|---|---|---|
| **Lỗi lặp lại $\ge 2$ lần (Rule of 2)** | `tools/dev.mjs check` | Viết thêm 1 hàm regex/kiểm tra tự động để bắt lỗi ngay từ lần sau |
| **Quy trình thiếu bước, quên kiểm tra** | `.agents/commands/<command>.md` | Thêm 1 bước vào checklist của lệnh đó |
| **Lỗi định dạng, cú pháp, CSS, Dark mode** | `.agents/rules/<rule>.md` | Bổ sung quy tắc phòng ngừa vào rule tương ứng |
| **Kiến thức chuyên môn hoặc prompt** | Skill chuyên ngành trong `.agents/skills/` | Bổ sung vào `references/` hoặc cập nhật `SKILL.md` |
| **Kỹ năng ít được AI tự động gọi** | `SKILL.md` (frontmatter `description`) | Tinh chỉnh lại câu kích hoạt (trigger keywords) rõ ràng hơn |
| **Mẹo chung có ích cho mọi dự án** | `.agents/starter-kit/` | Sao chép/đồng bộ sang starter-kit để các app khác dùng ngay |

---

## ⚖️ 2. Ba Nguyên Tắc Thép Trong Tự Cải Thiện

### Nguyên Tắc 1: "Sửa trước — Tạo sau" (Refactor Over Bloat)
- Tuyệt đối không tùy tiện tạo thêm skill mới khi gặp lỗi nhỏ.
- Luôn tìm skill hoặc rule sẵn có liên quan nhất để cập nhật thêm kinh nghiệm vào đó. Chỉ tạo skill mới khi xuất hiện một phân hệ công nghệ hoàn toàn mới.

### Nguyên Tắc 2: "Rule of 2" (Tự động hóa lỗi lặp lại)
- Nếu một dạng lỗi xuất hiện lần thứ 2 (ví dụ: mất cân bằng thẻ div, unescaped `$` math, đường dẫn local tuyệt đối, class vs className...):
  - **Bắt buộc**: Bổ sung hàm kiểm tra tự động vào `tools/dev.mjs check`.
  - Không dựa vào "trí nhớ văn bản", phải dựa vào **kiểm thử bằng mã nguồn**.

### Nguyên Tắc 3: "Pre-mortem 3 dòng" trước việc lớn
- Trước khi thực hiện một kế hoạch thay đổi kiến trúc lớn, AI phải tự đặt câu hỏi và ghi nhận 3 dòng:
  1. *Điểm rủi ro cao nhất có thể làm hỏng code là gì?*
  2. *Đâu là phương án phục hồi nếu xảy ra sự cố?*
  3. *Làm thế nào để kiểm chứng kết quả trong 1 bước?*

---

## 🛡️ 3. Cổng Kiểm Chứng (Eval Gate) Khi Sửa Đổi Skill
Khi cập nhật nội dung bất kỳ file `SKILL.md` nào:
1. Không được xóa các hướng dẫn cốt lõi của skill.
2. Phải giữ nguyên cấu trúc YAML frontmatter (`name:`, `description:`).
3. Đảm bảo chạy `node tools/dev.mjs selfcheck` đạt `PASS` trước khi kết thúc tác vụ.
