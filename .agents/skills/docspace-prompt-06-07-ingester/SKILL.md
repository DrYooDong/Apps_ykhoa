---
name: docspace-prompt-06-07-ingester
description: >
  Kỹ năng chuyên sâu tự động hóa tiếp nhận, phân tích cú pháp và tích hợp toàn diện dữ liệu từ Prompt 06 (Ca mẫu & Ma trận trọng số CDSS)
  và Prompt 07 (Hồ sơ ca thực chiến SOAP Markdown) vào CliniPortal DocSpace. Kích hoạt khi AI hoặc người dùng cung cấp tệp hoặc nội dung
  Prompt 06 & 07 từ NotebookLM (ví dụ ND_Prompt 06,07.md), cần nạp nhanh ca bệnh mẫu, từ điển triệu chứng, ma trận CDSS chuyên khoa,
  ca SOAP và kiểm định tự động 10/10 tiêu chí.
---

# DocSpace Prompt 06 & 07 Ingestion Pipeline Skill (Fast-Track & Fully Autonomous)

Tài liệu này định nghĩa quy trình chuẩn hóa, bộ công cụ tự động hóa toàn diện 1-Click và các bài học kỹ thuật thực chiến giúp AI Agent và Bác sĩ/Kỹ sư nạp thần tốc toàn bộ dữ liệu từ **Prompt 06** (Ca mẫu & Ma trận trọng số CDSS) và **Prompt 07** (Hồ sơ ca thực chiến SOAP) vào hệ sinh thái **CliniPortal DocSpace**, đạt chuẩn 10/10 tiêu chí kiểm định tự động ngay trong 01 lượt chạy.

---

## 🏛️ 1. Cấu Trúc Dữ Liệu Của Prompt 06 & 07

Mỗi lượt tạo dữ liệu từ NotebookLM cho một mặt bệnh thường được xuất ra dưới dạng 1 tệp Markdown tổng hợp (ví dụ: `ND_Prompt 06,07.md`), bao gồm 4 khối dữ liệu cốt lõi:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ PROMPT 06                                                                              │
│ ├── PHẦN 1: CA LÂM SÀNG MẪU THỰC TẾ (JSON)                                             │
│ │   ➔ Nạp vào: src/content/knowledge-vault/data/sample-clinical-cases.json             │
│ │   ➔ Phục vụ: Nút tải ca mẫu tại Bước 1 (Data Ingestion) của DocSpace                 │
│ │   ➔ Cung cấp: epiContext (Bối cảnh dịch tễ), vitals (Sinh hiệu), form (Bệnh sử)     │
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
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TỰ ĐỘNG TÍCH HỢP HỆ THỐNG DOCSPACE (AUTOMATIC DEEP INTEGRATION)                        │
│ ├── 1. Biên dịch CSDL Enriched CDSS: node tools/scripts/build-enriched-cdss.mjs        │
│ ├── 2. Đăng ký Multi-Key Aliases: src/content/docspace/data/diagnostic-criteria-database│
│ ├── 3. Cấu hình Hồ sơ Dịch tễ: src/content/docspace/src/data/epidemiology-context-db  │
│ └── 4. Kích hoạt Tam giác DTH: src/content/docspace/src/lib/clinicalEngine.ts          │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ 2. Quy Trình Nạp Thần Tốc 1-Click (Fast-Track SOP Cho AI Agent)

Khi Người dùng yêu cầu nạp tiếp mặt bệnh từ Prompt 06 & 07 (ví dụ: `ND_Prompt 06,07.md`), AI Agent chỉ cần thực hiện **3 bước tinh gọn**:

### Bước 1: Tiếp nhận và lưu tệp nguồn
- Nếu người dùng cung cấp nội dung text trực tiếp: lưu vào `src/content/docspace/docs/ND_Prompt 06,07.md`.
- Nếu đã có sẵn đường dẫn tệp: sử dụng trực tiếp đường dẫn đó.

### Bước 2: Chạy lệnh tự động hóa toàn diện 1-Click
```powershell
node tools/scripts/ingest-prompt-06-07.mjs "src/content/docspace/docs/ND_Prompt 06,07.md"
```

### Bước 3: Đọc kết quả Audit & Nghiệm thu
Script sẽ tự động hoàn tất 7 bước và in báo cáo kép:
1. `docspace-disease-audit.mjs <slug>`: Phải đạt **10/10 Tiêu chí (100% PASS)**.
2. `vault-readiness-check.mjs`: Phải đạt **15/15 Tiêu chí (100% PASS)**.

---

## 🤖 3. Các Tác Vụ Công Cụ Tự Động Thực Hiện (Autonomous Pipeline Details)

Công cụ `tools/scripts/ingest-prompt-06-07.mjs` đã được trang bị cơ chế tự phục hồi và tự tích hợp sâu:

1. **Bóc tách đa tầng linh hoạt (Robust Multi-Block Extraction)**:
   - Nhận diện cả block chuẩn lẫn block thiếu dấu đóng ```` ``` ```` code block từ LLM.
   - Nhận diện YAML frontmatter thông minh qua việc neo vị trí `caseId:` ngược xuôi giữa các cặp dấu `---`, không bị nhầm với dấu gạch ngang kẻ dòng trong bài viết.
2. **Bảo vệ chống triệu chứng mồ côi (Zero-Orphan Guardian)**:
   - Tự động rà soát cả các triệu chứng trong mảng `negated` và `selected` của ca mẫu, cũng như mảng `dd` của thực thể bệnh.
   - Tự động tra cứu từ điển thuật ngữ y khoa (`COMMON_SYMPTOM_NAMES`) để gắn nhãn tiếng Việt chuẩn (ví dụ: `alt_ast_tang_nhe` $\rightarrow$ *"Men gan AST/ALT tăng nhẹ"*, `co_truong` $\rightarrow$ *"Cổ trướng (Báng bụng)"*) thay vì chuỗi gạch dưới thô.
3. **Phân phối chuyên khoa & Đồng bộ Master KB**:
   - Phân tích trường `"nhom"` để ghi đúng tệp `diseases/<chuyen-khoa>.json`.
   - Tự động chạy `bundle-clinical-rules.mjs` để cập nhật `clinical-rules-kb.json`.
4. **Lưu trữ SOAP Markdown & Đồng bộ Catalog Kép**:
   - Lưu trữ tại `src/content/knowledge-vault/ba/<caseId>.md`.
   - Tự động chạy `ingest-notebooklm-case.mjs` để cập nhật cả 2 catalog (`vault-catalog-thuc-hanh.json` và `vault-catalog.json`).
5. **Tự động biên dịch Enriched CDSS**:
   - Tự động chạy `build-enriched-cdss.mjs` để đăng ký các bệnh lý enriched mới vào `src/content/docspace/data/enriched/index.ts`.
6. **Tự động Ánh xạ Đa Key (Multi-Key Aliasing)**:
   - Tự động tìm key Enriched tương ứng và ghi các biến thể (`slug`, `kebab-case`, `snake_case`) vào `DIAGNOSTIC_CHAIN_DATABASE` trong `diagnostic-criteria-database.ts`.
7. **Tự động Cấu hình Hồ sơ Dịch tễ (Epidemiology Profile)**:
   - Khai thác khối `epiContext` từ ca lâm sàng mẫu để tổng hợp profile hoàn chỉnh vào `epidemiology-context-database.ts`.
8. **Tự động Kích hoạt Clinical Engine**:
   - Thêm ID bệnh lý vào danh sách `isInfDisease` trong `clinicalEngine.ts` để kích hoạt điểm thưởng Tam giác DTH.
9. **Kích hoạt Bộ đôi Quality Gates**:
   - Chạy `docspace-disease-audit.mjs` cho bệnh lý vừa nạp và `vault-readiness-check.mjs` cho toàn bộ Knowledge Vault.

---

## 🛠️ 4. Quy Trình Thao Tác Bằng Tay (Manual Fallback Checklist)

Nếu gặp trường hợp đặc biệt cần can thiệp thủ công từng bước:

| Bước | Hành động | Tệp đích | Lệnh đồng bộ |
| :---: | :--- | :--- | :--- |
| **1** | Bổ sung Triệu chứng | `src/content/knowledge-vault/data/clinical-rules-symptoms.json` | Tự động cập nhật |
| **2** | Bổ sung Thực thể bệnh | `src/content/knowledge-vault/data/diseases/<chuyen-khoa>.json` | `node tools/scripts/bundle-clinical-rules.mjs` |
| **3** | Bổ sung Ca mẫu | `src/content/knowledge-vault/data/sample-clinical-cases.json` | Tự động cập nhật |
| **4** | Lưu SOAP Markdown | `src/content/knowledge-vault/ba/<caseId>.md` | `node tools/scripts/ingest-notebooklm-case.mjs <file.md>` |
| **5** | Biên dịch Enriched | `src/content/docspace/data/enriched/index.ts` | `node tools/scripts/build-enriched-cdss.mjs` |
| **6** | Ánh xạ Alias | `src/content/docspace/data/diagnostic-criteria-database.ts` | Thêm `'<alias>': ENRICHED_DISEASES['<key>']` |
| **7** | Hồ sơ Dịch tễ | `src/content/docspace/src/data/epidemiology-context-database.ts` | Khai báo object bối cảnh |
| **8** | Clinical Engine | `src/content/docspace/src/lib/clinicalEngine.ts` | Thêm ID vào `isInfDisease` |

---

## 🧪 5. Bảng Kiểm Nghiệm Thu (Quality Gates)

Sau khi chạy xong, kết quả **BẮT BUỘC ĐẠT 100%**:

- [ ] `docspace-disease-audit.mjs <slug>`: **ĐẠT 10/10 Tiêu chí (PASS 100%)**
- [ ] `vault-readiness-check.mjs`: **ĐẠT 15/15 Tiêu chí (PASS 100%)**
- [ ] Không có triệu chứng mồ côi (Zero Orphan Symptoms = 0).
- [ ] Hồ sơ SOAP được hiển thị trong catalog thực hành (`vault-catalog-thuc-hanh.json`).

---

## ⚠️ 6. Các Bẫy Kỹ Thuật Thường Gặp & Bài Học Thực Chiến

1. **Thiếu dấu đóng code block ```` ``` ```` từ LLM**:
   - *Hiện tượng*: LLM sinh xong JSON của Phần 2.2 nhưng xuống dòng ghi ngay `Prompt 07` mà quên đóng ```, làm hỏng các bộ phân tích cú pháp regex thông thường.
   - *Khắc phục*: Script đã tích hợp hàm `extractJsonBlocks` với fallback thông minh tự bóc tách đối tượng JSON theo cấu trúc trường nhận diện (`"ten":`, `"id":`, v.v.).
2. **Xung đột dấu kẻ ngang `---` Markdown và YAML Frontmatter**:
   - *Hiện tượng*: Bài viết dùng dấu `---` để phân cách các phần, khiến bộ phân tích ghép nhầm từ dấu kẻ ngang đầu tiên đến dấu mở đầu frontmatter.
   - *Khắc phục*: Script neo trực tiếp vị trí `caseId:` rồi quét ngược lên `\n---` gần nhất và xuôi xuống `\n---` tiếp theo để cô lập chính xác khối YAML.
3. **Phân biệt rạch ròi các mặt bệnh cùng họ (Hepatitis B vs Hepatitis C)**:
   - *Hiện tượng*: Các từ khóa chung như `viem-gan`, `vgsv` dễ gây nhầm lẫn giữa Viêm gan B và Viêm gan C nếu không kiểm tra chặt chẽ ký tự định danh chủng (`b/hbv` vs `c/hcv`).
   - *Khắc phục*: Công cụ audit và mapping đã thiết lập ràng buộc loại trừ chéo nghiêm ngặt, đảm bảo không bao giờ nhận diện nhầm ca mẫu hay hồ sơ SOAP giữa HBV và HCV.
4. **Triệu chứng trong mảng `negated` của Ca Mẫu**:
   - *Hiện tượng*: Ca mẫu khai báo các dấu hiệu loại trừ (như `co_truong`, `vang_da_mat`, `nao_gan`, `hbsag_pos`) mà Phần 2.1 không liệt kê.
   - *Khắc phục*: Cơ chế Zero-Orphan Guardian tự động quét toàn bộ `sel`, `selected`, `negated`, `dd` và gán nhãn chuyên môn tiếng Việt chuẩn.

