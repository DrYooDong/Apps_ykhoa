---
description: Tự động đúc kết kinh nghiệm, lỗi đã khắc phục và kỹ thuật mới vào kho ký ức dài hạn (.agents/learnings/)
---

# Lệnh Đúc Kết Bài Học: /learn-from-session

Khi nhận lệnh `/learn-from-session`, AI Agent thực hiện tổng kết tri thức từ phiên làm việc vừa qua để biến thành trí nhớ dài hạn (Long-term Knowledge Memory):

---

## 🎯 Mục Tiêu
Ngăn chặn AI lặp lại các lỗi tương tự trong các phiên làm việc tiếp theo, đồng thời chuẩn hóa các giải pháp hay thành tài liệu tham chiếu nhanh.

---

## 🧭 Quy Trình Đúc Kết

### 1. Phân Tích Phiên Làm Việc
AI tự rà soát lại:
- Đã gặp những lỗi hoặc sự cố gì? (ví dụ: layout vỡ, đường dẫn sai, format KaTeX lỗi, entity HTML...)
- Đâu là nguyên nhân cốt lõi thực sự?
- Giải pháp nào đã giải quyết triệt để vấn đề?

### 2. Định Dạng Tài Liệu Học Tập Chuẩn
Tạo tệp bài học mới trong `.agents/learnings/YYYY-MM-<ten-bai-hoc>.md` theo cấu trúc:

```markdown
# [Bài Học] <Tiêu đề ngắn gọn về sự cố / kỹ thuật>

- **Thời gian**: YYYY-MM-DD
- **Phạm vi ảnh hưởng**: <Module / Component / File liên quan>
- **Trạng thái**: Đã khắc phục & Chuẩn hóa

---

## 1. Triệu Chứng & Hiện Tượng Ban Đầu
<Mô tả ngắn gọn lỗi xảy ra như thế nào>

## 2. Nguyên Nhân Cốt Lõi (Root Cause)
<Tại sao lại phát sinh lỗi này?>

## 3. Giải Pháp & Quy Chuẩn Đã Áp Dụng
<Đoạn mã mẫu hoặc quy tắc sửa đổi cụ thể>

## 4. Quy Tắc Phòng Ngừa Cho Các Phiên Sau (Actionable Rules)
- [ ] Quy tắc 1
- [ ] Quy tắc 2
```

### 3. Cập Nhật Chỉ Mục Ký Ức
Đăng ký file mới vào `.agents/learnings/README.md` để các Agent trong tương lai dễ dàng tra cứu.
