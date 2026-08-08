---
name: debug-skill-generator
description: >
  Meta-Skill tự động tạo 01 Skill sửa lỗi mới trong .agents/skills/ mỗi khi dự án xuất hiện dạng lỗi / sự cố mới.
  Kích hoạt khi AI hoặc Người dùng vừa khắc phục một lỗi mới và muốn đóng gói quy trình sửa lỗi thành một Skill mới cho tương lai.
---

# Debug Skill Generator (Meta-Skill)

Tài liệu này định nghĩa quy trình tự động hóa việc tạo ra các **Skills sửa lỗi chuyên biệt mới** tại thư mục `.agents/skills/<skill_name>/` để ghi nhớ và nhân rộng tri thức giải quyết sự cố trong hệ thống CliniPortal.

---

## ⚡ Khi Nào Kích Hoạt Skill Này?

Kích hoạt Meta-Skill này khi:
1. Bạn vừa phát hiện và sửa xong một **dạng lỗi hoàn toàn mới** (ví dụ: z-index modal, vỡ grid bento mobile, đứt gãy relative path cấp 4, xung đột CSS Variable).
2. Muốn đóng gói quy trình chẩn đoán, nguyên nhân, bước vá lỗi an toàn và bài test kiểm thử thành 01 Skill chuyên biệt cho AI ở các phiên làm việc sau.

---

## 🛠️ Quy Trình 1-Click Tạo Skill Sửa Lỗi Mới

Chạy lệnh Node.js với các tham số mô tả lỗi:

```bash
node .agents/skills/debug-skill-generator/scripts/generate_bug_skill.js \
  --name "fix-<ten-loi>-bug" \
  --desc "<Mô tả ngắn gọn lỗi>" \
  --symptoms "<Triệu chứng nhận diện trên giao diện/console>" \
  --rootcause "<Nguyên nhân cốt lõi gây lỗi>" \
  --solution "<Phương pháp vá lỗi an toàn>"
```

### Ví dụ thực tế:

```bash
node .agents/skills/debug-skill-generator/scripts/generate_bug_skill.js \
  --name "fix-mobile-bento-overflow" \
  --desc "Khắc phục lỗi Bento Grid bị tràn viền và co hẹp dải dọc trên di động (width <= 768px)" \
  --symptoms "Trang chủ bị vỡ layout, bento cards co lại 40px ở lề trái" \
  --rootcause "CSS Grid giữ grid-column ngầm định vượt quá 1 cột trên mobile" \
  --solution "Sử dụng override selector .bento-homepage > * { grid-column: 1 / -1 !important; }"
```

---

## 📁 Cấu Trúc Skill Sửa Lỗi Mới Được Sinh Ra

Script sẽ tự động tạo thư mục và file `SKILL.md` theo cấu trúc tiêu chuẩn:

```
.agents/skills/fix-mobile-bento-overflow/
├── SKILL.md                  # Hướng dẫn chi tiết 4 bước chẩn đoán & vá lỗi
└── scripts/                  # (Tùy chọn) chứa script vá lỗi tự động nếu cần
```

Nội dung `SKILL.md` sẽ chứa đầy đủ:
- **YAML Frontmatter** kích hoạt skill khi gặp loại lỗi tương tự.
- **Triệu chứng & Mức độ ảnh hưởng**.
- **Phân tích nguyên nhân gốc (Root Cause)**.
- **Quy trình vá lỗi 4 bước** (Xác định $\rightarrow$ Fix bằng NodeJS Patch $\rightarrow$ Graphify Trace $\rightarrow$ Verify).
- **Kịch bản kiểm thử phòng ngừa tái phát**.

---

## 📋 Checklist Sau Khi Tạo Skill Mới

- [ ] Xác nhận file `.agents/skills/<skill-name>/SKILL.md` đã được tạo.
- [ ] Kiểm tra cú pháp YAML Frontmatter hợp lệ.
- [ ] Cập nhật nhật ký sự cố vào `.agents/skills/cliniportal-debugging/SKILL.md`.
- [ ] Chạy `node scratch/master_project_audit.js` để đảm bảo hệ thống hoàn toàn ổn định.
