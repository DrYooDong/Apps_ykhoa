---
name: fix-zindex-modal-bug
description: >
  Khắc phục lỗi z-index che khuất modal và dropdown trên di động
---

# FIX ZINDEX MODAL BUG SKILL

Tài liệu này định nghĩa quy trình chẩn đoán, nguyên nhân cốt lõi và các bước khắc phục chuẩn cho dạng lỗi **fix-zindex-modal-bug** trong hệ sinh thái CliniPortal.

---

## 🔍 1. Triệu Chứng Nhận Diện (Symptoms)

- **Biểu hiện**: Modal backdrop bị chìm bên dưới header sticky
- **Mức độ ảnh hưởng**: Cần khắc phục trước khi commit / bàn giao.

---

## 🧬 2. Phân Tích Nguyên Nhân Cốt Lõi (Root Cause Analysis)

- **Nguyên nhân chính**: Z-index của topnav (200) cao hơn z-index mặc định của modal (100)
- **Vùng mã nguồn rủi ro**: Kiểm tra CSS, DOM event listeners, thứ tự z-index hoặc đường dẫn tương đối.

---

## 🛠️ 3. Quy Trình Khắc Phục 4 Bước (4-Step Remediation Workflow)

### Bước 1: Xác định điểm lỗi
- Kiểm tra các file ảnh hưởng bằng lệnh:
  ```bash
  node scratch/master_project_audit.js
  ```

### Bước 2: Khắc phục sự cố
- Nâng z-index của modal-backdrop lên 1000 và modal-content lên 1010
- **Quy tắc vá lỗi an toàn**: Sử dụng NodeJS patch để ghi đè chuỗi độc nhất nhằm tránh rủi ro CRLF line ending truncation.

### Bước 3: Đánh giá tác động gián tiếp (Graphify Trace)
- Kiểm tra các file/hàm phụ thuộc:
  ```bash
  node scratch/query_graph.js <symbol_hoặc_filename>
  ```

### Bước 4: Xác nhận và Lưu nhật ký
- Đảm bảo 100% test PASSED.
- Cập nhật nhật ký lỗi vào `.agents/skills/cliniportal-debugging/SKILL.md`.

---

## 🧪 4. Kịch Bản Kiểm Thử Phòng Ngừa Tái Phát

1. Quét cú pháp JS: `node -c path/to/file.js`
2. Quét thẻ HTML: `node scratch/check_tags.js path/to/file.html`
3. Chạy master audit: `node scratch/master_project_audit.js`
