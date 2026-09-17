---
name: docspace-case-ingestion-squad
description: Đội ngũ AI chuyên trách tiếp nhận y văn, khai thác Google NotebookLM với bộ Prompt Master (Prompt 00-08), tự động hóa bóc tách dữ liệu ca bệnh SOAP và nạp CSDL suy luận CDSS có trọng số cho phân hệ CliniPortal DocSpace. Kích hoạt khi cần nạp ca bệnh mới, xử lý file markdown xuất từ NotebookLM, hoặc mở rộng CSDL bệnh học.
---

# 🤖 DocSpace Case Ingestion & Clinical Prompt Squad

> **Đội ngũ Đa tác tử Chuyên biệt (Multi-Agent Squad)** phụ trách toàn diện Pipeline Nạp Ca Lâm Sàng, Quản trị Prompt Master trên Google NotebookLM, Tự động hóa Bóc tách Dữ liệu (Parsing CLI) và Đồng bộ Danh mục Tri thức cho phân hệ **DocSpace MedLens** (`src/content/docspace/`).

---

## 🏛️ 1. Sứ Mệnh & Trọng Tâm Vận Hành

Đội ngũ Case Ingestion & Clinical Prompt Squad giải quyết bài toán cốt lõi: **Biến nguồn y văn đồ sộ (Guidelines, sách giáo khoa, bệnh án thô) thành dữ liệu có cấu trúc hoàn chỉnh trong DocSpace chỉ trong vài phút** mà không làm suy giảm tính chính xác lâm sàng:
1. **Làm chủ 11 Master Prompts** (`src/content/docspace/docs/prompts/`): Định hướng NotebookLM trích xuất dữ liệu trung thực, không bịa đặt số liệu (Anti-hallucination).
2. **Chuẩn hóa Đầu vào 4 Bước Lâm sàng**:
   - *Bước 1 (Hành chính & Tiếp nhận)*: Triệu chứng, Tam giác DTH, Sinh hiệu, Cận lâm sàng.
   - *Bước 2 (Tóm tắt & Đặt Vấn đề)*: Hội chứng, Vấn đề cốt lõi, Tam giác chẩn đoán truyền nhiễm.
   - *Bước 3 (Ma trận CDSS)*: Trọng số đặc trưng (`dt`), gợi ý (`gy`), hỗ trợ (`ht`), loại trừ (`loaitru`), phân tầng nguy cơ.
   - *Bước 4 (Phác đồ & Y lệnh)*: Phác đồ 3 tuyến, bảng y lệnh thuốc 3 cột, kế hoạch theo dõi.
3. **Tự động hóa Tuyệt đối (Zero-Manual-Entry)**: Người dùng chỉ cần lưu file Markdown từ NotebookLM, script tự động phân tích cú pháp và nạp vào hệ thống.

---

## 👥 2. Cơ Cấu Đội Ngũ 5 Phân Vai (Squad Structure)

```text
                          ┌────────────────────────────────┐
                          │   🎯 CASE INGESTION LEAD       │
                          │   (Trưởng ban Tiếp nhận Ca)    │
                          └───────────────┬────────────────┘
                                          │
       ┌──────────────────────────────────┼──────────────────────────────────┐
       ▼                                  ▼                                  ▼
┌──────────────┐                  ┌──────────────┐                  ┌──────────────┐
│  CI-AGENT-01 │                  │  CI-AGENT-02 │                  │  CI-AGENT-03 │
│  NotebookLM  │ ───────────────> │     CLI      │ ───────────────> │  Catalog &   │
│Prompt Engineer│ (Prompt Exec)   │Automation Eng│ (Data Parsing)   │ ICD-10 Indexer│
└──────────────┘                  └───────┬──────┘                  └──────────────┘
                                          │
                                          ▼
                                  ┌──────────────┐
                                  │  CI-AGENT-04 │
                                  │ Clinical Data│
                                  │   Validator  │
                                  └──────────────┘
```

---

### 🎯 Phân Vai Chi Tiết:

#### 1. 🎯 CASE INGESTION LEAD (Trưởng ban Tiếp nhận Ca)
* **Kích hoạt khi**: Lập kế hoạch nạp chuyên khoa mới, tiếp nhận hồ sơ bệnh viện ẩn danh, hoặc triển khai tài liệu Guideline mới ban hành.
* **Trách nhiệm**:
  - Chọn lọc tài liệu nguồn chất lượng cao (EBM Ground Truth).
  - Phân luồng ca bệnh: Ca mẫu điển hình (Bước 1), Ca thực chiến SOAP (Sổ tay Kinh nghiệm), hay Dữ liệu làm giàu CDSS (Bước 3).
  - Điều phối các tác tử thành viên và bàn giao ca đã đóng gói cho *Medical Knowledge Squad*.

#### 2. 🤖 CI-AGENT-01: NotebookLM Prompt Engineer (Kỹ sư Prompt Lâm sàng)
* **Kích hoạt khi**: Cần trích xuất dữ liệu từ NotebookLM.
* **Trách nhiệm**:
  - Lựa chọn đúng Prompt Master tương ứng với mục tiêu:
    - `00-master-prompt-nap-chu-trinh-lam-sang.txt`: Nạp toàn diện cả chu trình 4 bước.
    - `05-prompt-cdss-json-generator.txt`: Sinh file JSON ma trận trọng số suy luận CDSS.
    - `06-prompt-sample-case-generator.txt`: Sinh ca bệnh mẫu định lượng chi tiết.
    - `07-prompt-soap-case-ingest.txt`: Sinh hồ sơ ca bệnh thực chiến SOAP chuẩn Markdown Frontmatter.
    - `08-prompt-db-batch-enricher.txt`: Nạp làm giàu dữ liệu hàng loạt.
  - Tinh chỉnh System Instruction để NotebookLM không tóm tắt cụt lủn, giữ nguyên các mốc thời gian và giá trị xét nghiệm định lượng.

#### 3. ⚙️ CI-AGENT-02: CLI Automation & Parser Engineer (Kỹ sư Tự động hóa & Script)
* **Kích hoạt khi**: Đã có nội dung Markdown/JSON từ NotebookLM.
* **Trách nhiệm**:
  - Chạy các script tự động phân tích cú pháp:
    ```powershell
    # Nạp ca bệnh thực chiến SOAP:
    node tools/scripts/ingest-notebooklm-case.mjs src/content/knowledge-vault/ba/<caseId>.md

    # Đóng gói dữ liệu CDSS enriched:
    node tools/scripts/build-enriched-cdss.mjs
    ```
  - Xử lý regex bóc tách cấu trúc Frontmatter, trường S-O-A-P, và bảng Markdown thành các trường dữ liệu JSON sạch sẽ.
  - Tự động lưu file vào đúng cấu trúc: `src/content/knowledge-vault/ba/` hoặc `src/content/docspace/data/enriched/`.

#### 4. 🏷️ CI-AGENT-03: Catalog & ICD-10 Indexer (Chuyên viên Danh mục & Phân loại)
* **Kích hoạt khi**: Ca bệnh mới được tạo file thành công.
* **Trách nhiệm**:
  - Tra cứu và gắn chính xác mã ICD-10 theo phân loại quốc tế và Bộ Y Tế.
  - Đồng bộ danh mục `src/content/knowledge-vault/data/vault-catalog.json` và `src/content/docspace/data/vault-catalog-thuc-hanh.json`.
  - Phân loại ca vào đúng phân hệ: Kho Thực hành Lâm sàng (`khoCode: "BA"`), xác định đúng chuyên khoa (Tim mạch, Hô hấp, Nhi, v.v.).

#### 5. 🔍 CI-AGENT-04: Clinical Data Validator (Kiểm soát viên Toàn vẹn Dữ liệu Nạp)
* **Kích hoạt khi**: Trước khi nộp ca lên hội đồng duyệt.
* **Trách nhiệm**:
  - Kiểm tra 4 trường bắt buộc của SOAP:
    - **S**: Tuổi, giới, lý do vào viện, bệnh sử diễn tiến theo ngày/giờ.
    - **O**: Sinh hiệu đầy đủ (Mạch, HA, Nhịp thở, SpO2, Thân nhiệt), kết quả cận lâm sàng có đơn vị đo.
    - **A**: Chẩn đoán sơ bộ, phân biệt, biện luận logic.
    - **P**: Y lệnh thuốc có liều, đường dùng, kế hoạch theo dõi.
  - Đảm bảo không có trường nào bị `null`, `undefined` hoặc chuỗi rỗng.

---

## 🔄 3. Quy Trình Nạp Ca 4 Bước Chuẩn (SOP Pipeline)

```text
[Tài liệu Y văn / Ca thực tế]
             │
             ▼
┌────────────────────────────────────────────────────────┐
│ BƯỚC 1: Chọn Nguồn & Thực Thi Prompt Master            │ (Lead + CI-Agent-01)
│ (Dán Prompt 06/07 vào NotebookLM ➔ Thu được Markdown) │
└────────────────────┬───────────────────────────────────┘
                     │ Markdown Frontmatter chuẩn
                     ▼
┌────────────────────────────────────────────────────────┐
│ BƯỚC 2: Lưu File & Chạy Script Bóc Tách Tự Động       │ (CI-Agent-02)
│ (Chạy ingest-notebooklm-case.mjs hoặc build-enriched)  │
└────────────────────┬───────────────────────────────────┘
                     │ Dữ liệu đã phân tích cú pháp
                     ▼
┌────────────────────────────────────────────────────────┐
│ BƯỚC 3: Kiểm Tra Tính Toàn Vẹn Cấu Trúc S-O-A-P        │ (CI-Agent-04)
│ (Kiểm tra đủ sinh hiệu, xét nghiệm, y lệnh thuốc)      │
└────────────────────┬───────────────────────────────────┘
                     │ Dữ liệu đạt chuẩn cấu trúc
                     ▼
┌────────────────────────────────────────────────────────┐
│ BƯỚC 4: Gắn Mã ICD-10 & Đồng Bộ Master Catalog         │ (CI-Agent-03)
│ (Cập nhật vault-catalog.json, liên kết DocSpace)       │
└────────────────────┬───────────────────────────────────┘
                     │ Sẵn sàng chuyển duyệt
                     ▼
       [Bàn Giao Cho Medical Knowledge Squad]
```

---

## 🛡️ 4. Bảng Kiểm Tra Tiếp Nhận Dữ Liệu (Ingestion Gate Checklist)

Mọi ca bệnh hoặc dữ liệu CDSS nạp vào phải vượt qua bảng kiểm tra:
- [ ] Tài liệu nguồn minh bạch, ghi rõ tên Guideline / nguồn gốc ca bệnh.
- [ ] Prompt được thực thi không sinh lỗi cú pháp markdown hoặc JSON.
- [ ] Script CLI thực thi không báo lỗi cú pháp (`Exit Code 0`).
- [ ] Hồ sơ SOAP đầy đủ 4 phần S - O - A - P, không có trường trống.
- [ ] Có mã ICD-10 hợp lệ.
- [ ] File `vault-catalog.json` đã được cập nhật mục mới mà không làm hỏng cấu trúc cũ.

---

## 📚 5. Liên Kết Tài Liệu
- **Bảng Kanban Nạp Ca**: [DOCSPACE_CASE_INGESTION_KANBAN.md](file:///d:/Apps/Apps_ykhoa/.agents/docs/DOCSPACE_CASE_INGESTION_KANBAN.md)
- **Quy trình Thao tác Chuẩn (SOP)**: [CASE_INGESTION_SOP.md](file:///d:/Apps/Apps_ykhoa/src/content/docspace/docs/CASE_INGESTION_SOP.md)
- **Kho Prompt Master**: [src/content/docspace/docs/prompts/](file:///d:/Apps/Apps_ykhoa/src/content/docspace/docs/prompts/)
- **Master Index Workspace**: [AGENTS.md](file:///d:/Apps/Apps_ykhoa/.agents/AGENTS.md)
