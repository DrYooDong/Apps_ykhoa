---
name: docspace-prompt-06-07-ingester
description: >
  Kỹ năng chuyên sâu tự động hóa tiếp nhận, phân tích cú pháp và tích hợp toàn diện dữ liệu từ Prompt 06 (Ca mẫu & Ma trận trọng số CDSS)
  và Prompt 07 (Hồ sơ ca thực chiến SOAP Markdown) vào CliniPortal DocSpace. Kích hoạt khi AI hoặc người dùng cung cấp tệp hoặc nội dung
  Prompt 06 & 07 từ NotebookLM (ví dụ ND_Prompt 06,07.md), cần nạp nhanh ca bệnh mẫu, từ điển triệu chứng, ma trận CDSS chuyên khoa,
  ca SOAP và kiểm định tự động 10/10 tiêu chí.
---

# DocSpace Prompt 06 & 07 Ingestion Pipeline Skill

Tài liệu này định nghĩa quy trình chuẩn hóa, bộ công cụ tự động và các bước thao tác chuẩn mực giúp AI Agent và Bác sĩ/Kỹ sư nạp thần tốc toàn bộ dữ liệu từ **Prompt 06** (Ca mẫu & Ma trận trọng số CDSS) và **Prompt 07** (Hồ sơ ca thực chiến SOAP) vào hệ sinh thái **CliniPortal DocSpace**.

---

## 🏛️ 1. Cấu Trúc Dữ Liệu Của Prompt 06 & 07

Mỗi lượt tạo dữ liệu từ NotebookLM cho một mặt bệnh thường được xuất ra dưới dạng 1 tệp Markdown tổng hợp (ví dụ: `ND_Prompt 06,07.md`), bao gồm 4 khối dữ liệu cốt lõi:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ PROMPT 06                                                                              │
│ ├── PHẦN 1: CA LÂM SÀNG MẪU THỰC TẾ (JSON)                                             │
│ │   ➔ Nạp vào: src/content/knowledge-vault/data/sample-clinical-cases.json             │
│ │   ➔ Phục vụ: Nút tải ca mẫu tại Bước 1 (Data Ingestion) của DocSpace                 │
│ │                                                                                      │
│ └── PHẦN 2: MA TRẬN TRỌNG SỐ SUY LUẬN CDSS                                             │
│     ├── 1. Bổ sung triệu chứng vào từ điển (JSON Array)                                │
│     │   ➔ Nạp vào: src/content/knowledge-vault/data/clinical-rules-symptoms.json      │
│     └── 2. Thực thể bệnh & Ma trận suy luận dd (JSON Object)                           │
│         ➔ Nạp vào: src/content/knowledge-vault/data/diseases/<chuyen-khoa>.json        │
│         ➔ Đồng bộ Master KB: node tools/scripts/bundle-clinical-rules.mjs              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ PROMPT 07                                                                              │
│ └── HỒ SƠ CA BỆNH THỰC CHIẾN SOAP (YAML Frontmatter + Markdown Thân bài S-O-A-P)       │
│     ➔ Lưu tệp: src/content/knowledge-vault/ba/<caseId>.md                              │
│     ➔ Đồng bộ Catalog: node tools/scripts/ingest-notebooklm-case.mjs <file.md>         │
│     ➔ Phục vụ: Mục 9 Bước 4 Chu trình lâm sàng & Sổ tay Thực hành SOAP                 │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ 2. Quy Trình Nạp Tự Động (1-Click Automation CLI)

Dự án đã tích hợp sẵn công cụ tự động hóa toàn bộ việc bóc tách và phân phối dữ liệu:

```powershell
node tools/scripts/ingest-prompt-06-07.mjs <duong-dan-file.md>
```

### Ví dụ Thực tế:
```powershell
node tools/scripts/ingest-prompt-06-07.mjs "src/content/docspace/docs/ND_Prompt 06,07.md"
```

### Các tác vụ công cụ tự động thực hiện:
1. **Tự động bóc tách 4 khối**: Ca mẫu JSON, Từ điển triệu chứng JSON, Thực thể bệnh JSON, và YAML + SOAP Markdown.
2. **Chống triệu chứng mồ côi (Zero-Orphan Guardian)**: Tự động rà soát cả các triệu chứng trong mảng `negated` và `selected` của ca mẫu, nếu chưa có trong từ điển sẽ tự động khai báo ngay.
3. **Phân phối đúng chuyên khoa**: Tự động nhận diện trường `"nhom"` để ghi vào đúng tệp chuyên khoa (`truyen-nhiem.json`, `ho-hap.json`, `tim-mach.json`, `tieu-hoa.json`...).
4. **Tự động đồng bộ Master KB**: Chạy script `bundle-clinical-rules.mjs` để cập nhật `clinical-rules-kb.json`.
5. **Đóng gói SOAP Markdown**: Lưu tệp `src/content/knowledge-vault/ba/<caseId>.md` với Frontmatter YAML chuẩn hóa.
6. **Đồng bộ Catalog Thực hành**: Chạy `ingest-notebooklm-case.mjs` để cập nhật `vault-catalog-thuc-hanh.json` và `vault-catalog.json`.
7. **Tự động kích hoạt Audit**: Chạy `docspace-disease-audit.mjs` để kiểm định tính sẵn sàng.

---

## 🛠️ 3. Quy Trình Thao Tác Bằng Tay (Manual Fallback Protocol)

Nếu tệp nguồn có cấu trúc đặc biệt không thể parse tự động bằng script, AI Agent thực hiện tuần tự theo 5 bước sau:

### Bước 1: Nạp Triệu chứng vào `clinical-rules-symptoms.json`
1. Mở `src/content/knowledge-vault/data/clinical-rules-symptoms.json`.
2. Kiểm tra và bổ sung các đối tượng triệu chứng từ **Phần 2.1** vào cuối mảng.
3. ⚠️ **BẮT BUỘC**: Kiểm tra cả các triệu chứng xuất hiện trong `negated` của Ca mẫu (Phần 1), nếu chưa có phải thêm vào từ điển để tránh triệu chứng mồ côi.

### Bước 2: Nạp Thực thể Bệnh vào `diseases/<chuyen-khoa>.json`
1. Xác định chuyên khoa của bệnh từ trường `"nhom"`:
   - `Truyền nhiễm` $\rightarrow$ `src/content/knowledge-vault/data/diseases/truyen-nhiem.json`
   - `Hô hấp` $\rightarrow$ `src/content/knowledge-vault/data/diseases/ho-hap.json`
   - `Tim mạch` $\rightarrow$ `src/content/knowledge-vault/data/diseases/tim-mach.json`
   - `Tiêu hóa` $\rightarrow$ `src/content/knowledge-vault/data/diseases/tieu-hoa.json`
   - `Tiết niệu` $\rightarrow$ `src/content/knowledge-vault/data/diseases/tiet-nieu.json`
   - `Nội tiết` $\rightarrow$ `src/content/knowledge-vault/data/diseases/noi-tiet.json`
   - `Thần kinh` $\rightarrow$ `src/content/knowledge-vault/data/diseases/than-kinh.json`
2. Thêm đối tượng bệnh học từ **Phần 2.2** vào mảng JSON của tệp chuyên khoa tương ứng.
3. Chạy lệnh đồng bộ Master KB:
   ```powershell
   node tools/scripts/bundle-clinical-rules.mjs
   ```

### Bước 3: Nạp Ca Mẫu vào `sample-clinical-cases.json`
1. Mở `src/content/knowledge-vault/data/sample-clinical-cases.json`.
2. Thêm đối tượng ca bệnh mẫu từ **Phần 1** vào cuối mảng JSON.

### Bước 4: Lưu Hồ sơ SOAP Markdown & Đồng bộ Catalog
1. Lấy thông tin `caseId` từ YAML frontmatter của Prompt 07 (ví dụ: `soap-viem-gan-vi-rut-b-01`).
2. Tạo tệp mới tại `src/content/knowledge-vault/ba/<caseId>.md`.
3. Định dạng tệp gồm:
   ```markdown
   ---
   <toàn bộ nội dung frontmatter>
   ---

   <toàn bộ nội dung thân bài markdown S - O - A - P>
   ```
4. Chạy script đồng bộ catalog:
   ```powershell
   node tools/scripts/ingest-notebooklm-case.mjs src/content/knowledge-vault/ba/<caseId>.md
   ```

### Bước 5: Khai Báo Aliasing & Dịch Tễ Học (DocSpace Integration)
1. **Ánh xạ Đa Key trong `src/content/docspace/data/diagnostic-criteria-database.ts`**:
   Thêm alias cho mã bệnh về khối Enriched tương ứng:
   ```typescript
   'vgsv_b': ENRICHED_DISEASES['vgsv_B'],
   'viem-gan-vi-rut-b': ENRICHED_DISEASES['vgsv_B'],
   'viem_gan_b': ENRICHED_DISEASES['vgsv_B'],
   ```
2. **Khai báo Hồ sơ Dịch tễ trong `src/content/docspace/src/data/epidemiology-context-database.ts`**:
   Bổ sung object bối cảnh dịch tễ (vùng lưu hành, mùa vụ, vector, quần thể nguy cơ...).
3. **Kích hoạt Tam giác Dịch tễ trong `src/content/docspace/src/lib/clinicalEngine.ts`**:
   Thêm ID của bệnh vào `isInfDisease` và thiết lập điểm thưởng Tam giác DTH ($1.2\times - 1.25\times$).

---

## 🧪 4. Bảng Kiểm Kiểm Định Sau Khi Nạp (Quality Gate)

Sau khi hoàn tất việc nạp, AI Agent **BẮT BUỘC CHẠY 2 LỆNH KIỂM ĐỊNH**:

```powershell
# 1. Kiểm tra 10 tiêu chí tích hợp toàn vẹn cho bệnh lý vừa nạp
node tools/scripts/docspace-disease-audit.mjs <slug_benh>

# 2. Kiểm tra 15 tiêu chí sẵn sàng của toàn bộ Knowledge Vault
node tools/scripts/vault-readiness-check.mjs
```

### Tiêu chuẩn Nghiệm thu (Acceptance Criteria):
- [ ] `docspace-disease-audit.mjs <slug>`: **ĐẠT 10/10 Tiêu chí (PASS 100%)**
- [ ] `vault-readiness-check.mjs`: **ĐẠT 15/15 Tiêu chí (PASS 100%)**
- [ ] Không có cảnh báo triệu chứng mồ côi (Zero Orphan Symptoms = 0).
- [ ] Hồ sơ SOAP được hiển thị đầy đủ trong catalog thực hành (`vault-catalog-thuc-hanh.json`).

---

## ⚠️ 5. Các Bẫy Kỹ Thuật Thường Gặp & Cách Khắc Phục

1. **Triệu chứng mồ côi từ trường `negated`**:
   - *Hiện tượng*: Ca mẫu có dấu hiệu loại trừ (ví dụ: `hbv_decompensated_cirrhosis_signs`) nhưng trong Phần 2.1 Prompt chỉ tạo 8 triệu chứng của ma trận `dd`.
   - *Xử lý*: Script `ingest-prompt-06-07.mjs` sẽ tự động quét cả `negated` và `selected` để tự động tạo triệu chứng phòng ngừa.
2. **Lỗi định dạng YAML Frontmatter**:
   - *Hiện tượng*: NotebookLM thường bao bọc YAML trong block ````yaml ... ```` thay vì `--- ... ---`.
   - *Xử lý*: Script tự động trích xuất nội dung bên trong block YAML và ghi lại với cặp dấu `---` hợp lệ theo chuẩn Markdown Parser.
3. **Lệch Key ID giữa Enriched JSON và Clinical Rules**:
   - *Hiện tượng*: Tệp Enriched đặt tên `vgsv_B.json`, nhưng mã bệnh trong Clinical Rules là `viem-gan-vi-rut-b`.
   - *Xử lý*: Công cụ kiểm định `docspace-disease-audit.mjs` đã được tích hợp bộ suy luận ánh xạ thông minh qua ICD-10 và từ khóa alias, đồng thời hỗ trợ khai báo đa key trong `diagnostic-criteria-database.ts`.
