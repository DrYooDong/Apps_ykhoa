---
name: docspace-oneclick-ingest-agent
description: >
  Đội ngũ AI chuyên trách tiếp nhận và tích hợp 1 chạm (One-Click Ingestion) toàn bộ tri thức y khoa từ Prompt 05, Prompt 06
  và Prompt 07 (NotebookLM/EBM) vào CliniPortal DocSpace. Tự động nhận diện định dạng, khử HTML entities, tổng hợp frontmatter,
  bóc tách cấu trúc, đồng bộ CDSS và chạy 2 cổng kiểm định chất lượng (Medical QA Gate 6/6 & Vault Readiness 15/15).
---

# DocSpace One-Click Master Ingestion Agent & Skill (Autonomous EBM Pipeline)

Tài liệu này định nghĩa kiến trúc vận hành, bộ công cụ tự động hóa **1-Click Master Ingestion** và các tiêu chuẩn kiểm định chất lượng tự động giúp AI Agent tiếp nhận và nạp tức thì mọi dạng dữ liệu y khoa từ Google NotebookLM (Prompts 05, 06, 07) vào hệ sinh thái **CliniPortal DocSpace** và **Knowledge Vault**, bảo toàn 100% tiêu chuẩn EBM và Zero-Orphan Symptoms.

---

## 🏛️ 1. Ma Trận Dữ Liệu & Năng Lực Tự Động Nhận Diện

Engine tự động nhận diện 3 dạng dữ liệu y khoa từ NotebookLM và phân luồng nạp chính xác:

| Dạng Dữ Liệu | Nguồn Prompt | Dấu Hiệu Nhận Diện | Hành Động Tự Động |
|---|---|---|---|
| **Enriched CDSS JSON** | Prompt 05 | JSON chứa `slug`, `severityGrading`, `treatmentStrategyTable`, `protocol` | Nạp vào `src/content/docspace/data/enriched/<slug>.json`, biên dịch `build-enriched-cdss.mjs` và cập nhật alias `diagnostic-criteria-database.ts` |
| **Combo Prompt 06 & 07** | Prompt 06 & 07 | Markdown chứa Code blocks JSON (ca mẫu, từ điển triệu chứng, trọng số dd) + Đề mục SOAP | Phân luồng qua `ingest-prompt-06-07.mjs`, nạp `sample-clinical-cases.json`, cập nhật `diseases/<specialty>.json`, gom cụm KB và nạp hồ sơ SOAP |
| **Hồ sơ Ca Thực Chiến SOAP** | Prompt 07 Standalone | Markdown chứa `# ... S-O-A-P` hoặc các đề mục `S — CHỦ QUAN`, `O — KHÁCH QUAN` | Tự khử HTML entities (`&gt;`, `&amp;`), tự tổng hợp Frontmatter YAML nếu thiếu, lưu `ba/<caseId>.md` và đồng bộ Vault Catalog |

---

## ⚡ 2. Cú Pháp Vận Hành 1 Chạm (One-Click CLI)

Mọi thao tác nạp dữ liệu từ NotebookLM giờ đây được gom vào **01 lệnh duy nhất**:

### Nạp từ tệp Markdown hoặc JSON
```powershell
node tools/scripts/docspace-oneclick-ingester.mjs "src/content/docspace/docs/ND_Prompt 06,07.md"
```

### Nạp từ cả thư mục (Batch Ingestion)
```powershell
node tools/scripts/docspace-oneclick-ingester.mjs src/content/knowledge-vault/ba/
```

### Nạp trực tiếp từ đoạn text thô (Raw Text / Stdin)
```powershell
node tools/scripts/docspace-oneclick-ingester.mjs --text "<nội dung markdown hoặc json>"
```

---

## 🔄 3. Chuỗi Tự Động Hóa 5 Giai Đoạn (Automated Pipeline)

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. INGESTION & AUTO-DETECTION                                               │
│    ➔ Nhận diện: Prompt 05 | Prompt 06+07 Combo | Prompt 07 Standalone       │
│    ➔ Khử 100% HTML entities (&gt;, &lt;, &amp;, &#39;, &quot;)              │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. SCHEMA EXTRACTION & FRONTMATTER SYNTHESIS                                │
│    ➔ Trích xuất Tiêu đề, Mã ICD-10, Chuyên khoa, Bối cảnh DTH, Bài học      │
│    ➔ Tự động sinh khối Frontmatter YAML chuẩn nếu NotebookLM không xuất     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. CDSS MULTI-FILE SYNCHRONIZATION                                          │
│    ➔ Bổ sung Triệu chứng mới -> clinical-rules-symptoms.json                 │
│    ➔ Cập nhật Bệnh & Trọng số -> diseases/<chuyen-khoa>.json                 │
│    ➔ Tự sửa lỗi cấu trúc dd (Object -> 3-Tuple [id, weight, role])           │
│    ➔ Gom cụm Master KB -> bundle-clinical-rules.mjs                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. KNOWLEDGE VAULT INDEXING                                                 │
│    ➔ Phân tích cấu trúc 4 góc nhìn S-O-A-P                                  │
│    ➔ Đồng bộ vault-catalog.json & vault-catalog-thuc-hanh.json               │
│    ➔ Đồng bộ sang DocSpace catalog                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. DUAL-GATE QUALITY VERIFICATION                                           │
│    ➔ Cổng 1: Medical QA Gate (6/6 Pillars: Zero-Orphan, Role Matrix, SOAP)  │
│    ➔ Cổng 2: Vault Readiness Check (15/15 Criteria: EBM 890+ bài, 31+ ca BA)│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛡️ 4. Hai Cổng Kiểm Định Chất Lượng Bắt Buộc (Quality Gates)

Sau mỗi lượt nạp dữ liệu, hệ thống tự động kích hoạt 2 cổng kiểm định:

1. **Medical QA Gate** (`tools/qa/docspace-medical-qa-gate.mjs`):
   - **Pillar 1**: Zero-Orphan Symptoms Verification (0 triệu chứng mồ côi).
   - **Pillar 2**: Symptom Dictionary Deduplication & Multi-file Sync (0 trùng lặp).
   - **Pillar 3**: CDSS Role Matrix Integrity (`dt`, `gy`, `ht`, `loaitru`).
   - **Pillar 4**: Enriched Disease Schema & ICD-10 Cataloging (14 trường tiêu chuẩn).
   - **Pillar 5**: Clinical SOAP 4-Quadrant Architecture (Đủ 4 góc nhìn S-O-A-P).
   - **Pillar 6**: Clinical Humanizer & Anti-AI-ism Quality Pass (Không từ ngữ AI sáo rỗng).

2. **Vault Readiness Audit** (`tools/scripts/vault-readiness-check.mjs`):
   - Đảm bảo 15/15 tiêu chí hạ tầng tri thức đạt 100%.
   - Số ca lâm sàng SOAP $\ge 30$ ca.
   - Số bài viết EBM trong Vault $\ge 880$ bài.

---

## 🚨 5. Tự Phục Hồi & Xử Lý Sự Cố (Self-Healing Patterns)

1. **Lỗi Frontmatter bị thiếu từ Prompt 07**:
   - Engine tự động kích hoạt `synthesizeFrontmatter()`, đọc tiêu đề từ thẻ H1, tìm mã ICD-10, phân tích chuyên khoa và sinh khối Frontmatter hợp lệ.
2. **Lỗi HTML entities làm hỏng Markdown**:
   - `sanitizeHtmlEntities()` tự động chuyển `&gt;` $\to$ `>`, `&amp;` $\to$ `&`, giúp các callout box GitHub `> [!IMPORTANT]` hiển thị hoàn hảo.
3. **Lỗi cấu trúc `dd` dạng Object**:
   - `bundle-clinical-rules.mjs` tự động chuyển đổi `{ symptom_id: weight }` thành mảng 3-tuple `[["symptom_id", weight, "dt"]]` chuẩn schema.
