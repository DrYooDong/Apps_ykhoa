# 🚀 DocSpace MedLens — Case Ingestion Standard Operating Procedure (SOP)

> **Quy Trình Thao Tác Chuẩn (SOP): Nạp Ca Lâm Sàng & Dữ Liệu CDSS Tự Động**
> *Hướng dẫn từng bước biến tài liệu Guideline EBM hoặc bệnh án lâm sàng thô thành hồ sơ ca bệnh thực chiến SOAP và dữ liệu CDSS có trọng số trong DocSpace chỉ trong 2 phút.*

---

## 🧭 Tổng Quan Pipeline 2 Phút

```text
[Tài liệu Nguồn: PDF Guideline / Ca bệnh]
                     │
                     ▼
  (1) Mở Google NotebookLM & Tải Tài Liệu Lên
                     │
                     ▼
  (2) Dán Prompt Master (Prompt 06 hoặc Prompt 07)
                     │
                     ▼
  (3) Copy Kết quả Markdown Lưu vào ba/<caseId>.md
                     │
                     ▼
  (4) Chạy 1 Lệnh CLI Duy Nhất Để Đồng Bộ Catalog
                     │
                     ▼
[DocSpace Hiển Thị Ca Mới Ngay Lập Tức!]
```

---

## 📝 Hướng Dẫn Chi Tiết Từng Bước

### Bước 1: Chuẩn Bị Nguồn Tài Liệu
1. Truy cập [Google NotebookLM](https://notebooklm.google.com/).
2. Tạo một Notebook mới (ví dụ: `DocSpace - Dengue Clinical Cases`).
3. Tải lên tệp PDF Hướng dẫn chẩn đoán điều trị của **Bộ Y Tế** (hoặc tài liệu ca bệnh lâm sàng thực tế đã được xóa thông tin định danh cá nhân).

---

### Bước 2: Chọn Prompt Master Thích Hợp
Mở thư mục `src/content/docspace/docs/prompts/` và chọn file prompt tương ứng với mục tiêu:

* **Kịch bản A — Nạp Ca Thực Chiến S-O-A-P**:
  - Mở file: `docs/prompts/07-prompt-soap-case-ingest.txt`.
  - Copy toàn bộ nội dung và dán vào thanh chat của NotebookLM.
  - Bấm gửi và đợi NotebookLM trích xuất ca bệnh theo cấu trúc YAML Frontmatter + Markdown.
* **Kịch bản B — Nạp Ca Mẫu Định Lượng (Bước 1 Chu trình Lâm sàng)**:
  - Mở file: `docs/prompts/06-prompt-sample-case-generator.txt`.
  - Dán vào NotebookLM để sinh dữ liệu định lượng (Mạch, HA, WBC, Hct, Men gan, v.v.).
* **Kịch bản C — Sinh Ma Trận CDSS Trọng Số (Bước 3 Chu trình Lâm sàng)**:
  - Mở file: `docs/prompts/05-prompt-cdss-json-generator.txt`.
  - Dán vào NotebookLM để nhận file JSON enriched gồm 4 mức trọng số (`dt`, `gy`, `ht`, `loaitru`).

---

### Bước 3: Lưu Tệp Markdown
1. Sao chép toàn bộ khối kết quả từ NotebookLM.
2. Tạo một tệp Markdown mới tại thư mục:
   ```text
   src/content/knowledge-vault/ba/<slug-ca-benh>.md
   ```
   *(Ví dụ: `src/content/knowledge-vault/ba/ca-sxh-dengue-soc-ngay-5.md`)*.
3. Dán nội dung vào và lưu lại (Ctrl + S).

---

### Bước 4: Chạy Lệnh CLI Tự Động Hóa
Mở terminal PowerShell tại thư mục gốc dự án (`d:\Apps\Apps_ykhoa`) và chạy lệnh:

```powershell
node tools/scripts/ingest-notebooklm-case.mjs src/content/knowledge-vault/ba/<slug-ca-benh>.md
```

**Script sẽ tự động thực hiện các thao tác sau**:
1. Phân tích cú pháp YAML Frontmatter (`id`, `title`, `khoCode: "BA"`, `icd10`, `chuyenKhoa`, `doKho`, `bacSi`).
2. Trích xuất tóm tắt triệu chứng và chẩn đoán.
3. Thêm bản ghi ca mới vào `src/content/knowledge-vault/data/vault-catalog.json`.
4. Đồng bộ dữ liệu sang `src/content/docspace/data/vault-catalog-thuc-hanh.json`.
5. Đưa ra thông báo hoàn tất: `[SUCCESS] Ca lâm sàng đã được nạp vào Catalog!`.

---

### Bước 5: Đóng Gói Dữ Liệu CDSS Làm Giàu (Nếu có file Enriched mới)
Nếu bạn nạp thêm file `data/enriched/<slug>.json` mới:
```powershell
node tools/scripts/build-enriched-cdss.mjs
```
Script sẽ tự động kiểm tra cú pháp, hợp nhất danh mục triệu chứng và đóng gói CSDL cho động cơ suy luận DocSpace.

---

## 🧪 Bảng Kiểm Tra Sau Khi Nạp (Quick Verification)

Sau khi chạy lệnh CLI, mở trình duyệt vào DocSpace:
- [ ] Chuyển sang phân hệ **Sổ Tay Kinh Nghiệm SOAP** ➔ Ca mới xuất hiện ở đầu danh sách.
- [ ] Bấm vào xem chi tiết ➔ 4 cột S - O - A - P hiển thị đầy đủ, không bị lỗi font hoặc vỡ bảng.
- [ ] Kiểm tra liên kết mã ICD-10 và chuyên khoa chính xác.
- [ ] Chuyển giao thông tin sang **Medical Knowledge Standardization Squad** để kiểm định nội dung y khoa và chính tả.
