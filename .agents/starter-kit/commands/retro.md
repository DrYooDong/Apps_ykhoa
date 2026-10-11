---
description: Quy trình tự hồi tưởng (Retro Card ≤15 dòng) sau mỗi tác vụ để cải thiện kỹ năng, công cụ và đồng đội
---

# Lệnh Tự Hồi Tưởng & Nâng Cấp: /retro

Khi nhận lệnh `/retro [tên task hoặc tóm tắt lỗi vừa sửa]`, AI Agent thực hiện tự đánh giá và nâng cấp đồng đội theo chu trình:

---

## 🧭 Bước 1: Trích Xuất Dữ Liệu Thực Tế
Không phỏng đoán, rà soát lại trực tiếp từ phiên làm việc:
1. Nhiệm vụ vừa thực hiện là gì? Có gặp lỗi giữa chừng không?
2. Số lần thử / sửa đổi (iterations) là bao nhiêu vòng?
3. Điều gì làm mất nhiều thời gian nhất?

---

## 📝 Bước 2: Tạo Retro Card Siêu Gọn (≤ 15 Dòng)
Tạo file mới tại `.agents/learnings/retro/YYYY-MM-DD-<slug>.md` với mẫu:

```markdown
# Retro: [Tên nhiệm vụ / Bản vá lỗi]
- **Thời gian**: [YYYY-MM-DD HH:mm] | **Trạng thái**: ĐẠT (X vòng sửa)
- **Mục tiêu**: [1 dòng tóm tắt]
- **Nguyên nhân gốc (nếu có lỗi)**: [1 dòng bản chất]
- **Điểm nghẽn tốn thời gian**: [Tooling / Prompt / Path / CSS conflict / Missing test]
- **Công cụ/Skill đã dùng**: [command / skill]
- **Công cụ lẽ ra nên có**: [Điều gì sẽ giúp phát hiện ngay lập tức]
- **Hành động nâng cấp hệ thống (Action Item)**:
  - [ ] Cập nhật vào: [Chỉ định file cụ thể: rule/command/skill/dev.mjs]
```

---

## ⚡ Bước 3: Áp Dụng Ngược Vào Hệ Thống (Self-Update Loop)
Theo nguyên tắc **Lesson Router**:
- Nếu là **lỗi quy trình**: Cập nhật ngay checklist trong command tương ứng (`/new-feature`, `/fix-bug`, `/ship`).
- Nếu là **lỗi kỹ thuật lặp lại lần 2 (Rule of 2)**: Thêm 1 hàm kiểm tra vào `tools/dev.mjs check`.
- Nếu là **mẹo chung**: Đồng bộ sang `.agents/starter-kit/` để các dự án khác được hưởng lợi.
- Nếu là **skill hiện có kích hoạt kém**: Bổ sung từ khóa gợi mở vào thẻ `description` của skill đó.

---

## 📢 Bước 4: Báo Cáo Ngắn
Báo cáo lại cho User trong 3 bullet points:
1. Thẻ Retro Card vừa lưu.
2. Bài học mấu chốt được rút ra.
3. Thay đổi đã cập nhật vào rule/skill/script (nếu có).
