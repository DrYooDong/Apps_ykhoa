# 🔄 Kho Hồi Tưởng & Đúc Kết Tác Vụ (Retro Cards)

Thư mục này lưu trữ các thẻ **Retro Card** siêu gọn (≤ 15 dòng) sau mỗi lần hoàn thành kế hoạch hoặc sửa lỗi.

## 🎯 Cấu Trúc 1 Retro Card Chuẩn (YYYY-MM-DD-<slug>.md):
```markdown
# Retro: [Tên task / lỗi đã sửa]
- **Thời gian**: YYYY-MM-DD HH:mm | **Người/Agent**: [Vai trò]
- **Mục tiêu**: [1 câu mô tả mục tiêu]
- **Kết quả**: [ĐẠT / CHƯA ĐẠT] (Số lần sửa: X vòng)
- **Nguyên nhân gốc (Root cause)**: [1 câu chỉ rõ bản chất sự cố]
- **Điểm nghẽn tốn thời gian nhất**: [Tooling / Lạc đường / Conflict / Thiếu context]
- **Skill/Workflow đã dùng**: [Tên skill hoặc command]
- **Skill/Check lẽ ra nên có**: [Tên công cụ/check giúp phát hiện sớm hơn]
- **Hành động cải thiện (Action Item)**:
  - [ ] [Cập nhật vào file rule / skill / command / dev.mjs cụ thể]
```

## 📜 Quy Tắc Tự Cải Thiện:
1. **Rule of 2**: Nếu một lỗi xuất hiện lần thứ 2, bắt buộc chuyển thành bài kiểm tra tự động trong `tools/dev.mjs check`.
2. **Sửa trước - Tạo sau**: Cải tiến kỹ năng hoặc lệnh sẵn có trước khi nghĩ đến việc tạo skill mới.
