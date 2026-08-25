---
name: fix-text-formatting-bug
description: >
  Khắc phục lỗi định dạng văn bản: Ký tự $ công thức math, Bullets, Numbering và Heading Styles
---

# FIX TEXT FORMATTING BUG SKILL

Tài liệu này định nghĩa quy trình chẩn đoán, nguyên nhân cốt lõi và các bước khắc phục chuẩn cho dạng lỗi **fix-text-formatting-bug** trong hệ sinh thái CliniPortal.

---

## 🔍 1. Triệu Chứng Nhận Diện (Symptoms)

- **Biểu hiện**: Phát hiện số $ lẻ, ký hiệu LaTeX thô, bullets thô trong thẻ p, hoặc heading giả
- **Mức độ ảnh hưởng**: Cần khắc phục trước khi commit / bàn giao.

---

## 🧬 2. Phân Tích Nguyên Nhân Cốt Lõi (Root Cause Analysis)

- **Nguyên nhân chính**: Gõ trực tiếp văn bản thô từ tài liệu nguồn mà chưa qua chuẩn hóa HTML Semantic và LaTeX escaping
- **Vùng mã nguồn rủi ro**: Kiểm tra CSS, DOM event listeners, thứ tự z-index hoặc đường dẫn tương đối.

---

## 🛠️ 3. Quy Trình Khắc Phục 4 Bước (4-Step Remediation Workflow)

### Bước 1: Xác định điểm lỗi
- Kiểm tra các file ảnh hưởng bằng lệnh:
  ```bash
  node tools/tools/scratch/master_project_audit.js
  ```

### Bước 2: Khắc phục sự cố
- Sử dụng script node tools/scratch/fix_text_formatting.js để tự động chuyển đổi thành <ul><li>, <h3> và HTML entities
- **Quy tắc vá lỗi an toàn**: Sử dụng NodeJS patch để ghi đè chuỗi độc nhất nhằm tránh rủi ro CRLF line ending truncation.

### Bước 3: Đánh giá tác động gián tiếp (Graphify Trace)
- Kiểm tra các file/hàm phụ thuộc:
  ```bash
  node tools/tools/scratch/query_graph.js <symbol_hoặc_filename>
  ```

### Bước 4: Xác nhận và Lưu nhật ký
- Đảm bảo 100% test PASSED.
- Cập nhật nhật ký lỗi vào `.agents/skills/cliniportal-debugging/SKILL.md`.

---

## 🧪 4. Kịch Bản Kiểm Thử Phòng Ngừa Tái Phát

1. Quét cú pháp JS: `node -c path/to/file.js`
2. Quét thẻ HTML: `node tools/tools/scratch/check_tags.js path/to/file.html`
3. Quét lỗi định dạng $ & #: `node tools/scratch/check_format_bugs.js path/to/file.html`
4. Chạy master audit: `node tools/tools/scratch/master_project_audit.js`
