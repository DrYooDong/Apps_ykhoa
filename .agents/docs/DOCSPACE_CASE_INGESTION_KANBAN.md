# 📋 DOCSPACE CASE INGESTION & CLINICAL PROMPT — KANBAN BOARD

> Bảng theo dõi và điều phối công tác **Nạp Ca Bệnh Lâm Sàng, Quản Trị Prompt Master NotebookLM và Bóc Tách Dữ Liệu CLI** cho phân hệ **DocSpace MedLens** (`src/content/docspace/`).

---

## 🚦 Trạng Thái Đội Ngũ (Squad Status)

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| **Trạng thái** | 🟢 SẴN SÀNG (ACTIVE) | 5 phân vai đã được kích hoạt |
| **Công cụ chính** | Google NotebookLM + CLI scripts | Tự động hóa bóc tách Markdown/JSON |
| **Đích đến** | `knowledge-vault/ba/` & `data/enriched/` | Kho ca SOAP & CSDL CDSS |
| **Độ phủ Prompt** | 11 Master Prompts (00 - 08) | `src/content/docspace/docs/prompts/` |

---

## 📌 Phân Vùng Công Tác (Ingestion Workstreams)

1. **WS-INGEST-01: Infectious Diseases & Tropical Medicine (Truyền nhiễm & Nhiệt đới)**:
   - Sốt xuất huyết Dengue, Sốt rét, Cúm mùa, Viêm màng não, Uốn ván, Sepsis/Sốc nhiễm trùng.
2. **WS-INGEST-02: Cardiology & Critical Care (Tim mạch & Cấp cứu)**:
   - Hội chứng vành cấp (STEMI/NSTEMI), Suy tim cấp/mạn, Cơn tăng huyết áp, Đột quỵ não cấp.
3. **WS-INGEST-03: Respiratory & Internal Medicine (Hô hấp & Nội khoa)**:
   - Viêm phổi cộng đồng (CAP), Đợt cấp COPD, Cơn hen phế quản cấp, Xuất huyết tiêu hóa.
4. **WS-INGEST-04: Pediatrics & Neonatology (Nhi khoa & Sơ sinh)**:
   - Sốt co giật, Tiêu chảy cấp mất nước, Viêm tiểu phế quản, Vàng da sơ sinh.

---

## 📊 Bảng Điều Phối Kanban (Active Ingestion Tasks)

### 📥 1. BACKLOG (Hàng Đợi Y Văn Chờ Nạp)

| ID | Tên Bệnh / Ca Bệnh | Nguồn Tài Liệu | Prompt Áp Dụng | Phân vai | Độ ưu tiên |
|---|---|---|---|---|---|
| `INGEST-02` | Nhồi máu cơ tim cấp ST chênh lên | ESC 2023 / BYT | Prompt 05 & Prompt 07 | CI-AGENT-01, CI-AGENT-03 | 🟡 High |
| `INGEST-03` | Viêm phổi cộng đồng người lớn (CAP) | Hướng dẫn Hội Hô Hấp VN / ATS | Prompt 00 & Prompt 06 | CI-AGENT-01, CI-AGENT-02 | 🟡 High |
| `INGEST-04` | Xơ gan mất bù có báng bụng & XHTH | Hội Gan Mật VN / AASLD | Prompt 05 & Prompt 07 | CI-AGENT-01, CI-AGENT-04 | 🟡 High |
| `INGEST-05` | Cơn hen phế quản cấp ở trẻ em | GINA 2024 / Hướng dẫn Nhi khoa BYT | Prompt 06 & Prompt 07 | CI-AGENT-01, CI-AGENT-02 | 🟢 Medium |

---

### 🔍 2. PROMPT EXTRACTION IN NOTEBOOKLM (Đang Chạy Prompt Trong NotebookLM)

*(Chưa có task nào trong trạng thái này - Sẵn sàng nhận tài liệu nguồn)*

---

### ⚙️ 3. CLI PARSING & CATALOGING (Đang Bóc Tách CLI & Đồng Bộ Catalog)

*(Chưa có task nào trong trạng thái này)*

---

### 🧪 4. CLINICAL DATA VALIDATION (Đang Kiểm Tra Toàn Vẹn S-O-A-P)

*(Chưa có task nào trong trạng thái này)*

---

### ✅ 5. HANDED OVER TO MEDICAL QA (Đã Bàn Giao Cho Medical Knowledge Squad)

| ID | Tên Ca / Bệnh | Thư mục đầu ra | Người hoàn thành | Ngày |
|---|---|---|---|---|
| `SETUP-INGEST-01` | Architecture | Thiết lập Case Ingestion & Clinical Prompt Squad | Lead | 2026-09-17 |
| `INGEST-01` | **Sốt xuất huyết Dengue nặng có sốc (QĐ 2760/QĐ-BYT)** | `ba/soap-dengue-soc-2760-01.md`, `sample-clinical-cases.json`, `truyen-nhiem.json` | CI-AGENT-01, CI-AGENT-02, Ingestion Squad | 2026-09-17 |

---

## 📝 Quy Định Cập Nhật Bảng Kanban

1. Khi tiếp nhận văn bản Guideline hoặc ca bệnh thô, Case Ingestion Lead tạo mã `INGEST-XX` và ghi vào **BACKLOG**.
2. Khi CI-AGENT-01 đưa tài liệu và prompt vào NotebookLM, chuyển sang **PROMPT EXTRACTION IN NOTEBOOKLM**.
3. Khi lưu file markdown và chạy script `ingest-notebooklm-case.mjs`, chuyển sang **CLI PARSING & CATALOGING**.
4. Khi CI-AGENT-04 kiểm tra cấu trúc dữ liệu đạt chuẩn, chuyển sang **CLINICAL DATA VALIDATION**.
5. Sau khi đạt 100% tiêu chí Ingestion Gate, chuyển sang **HANDED OVER TO MEDICAL QA** để hội đồng y khoa thẩm định.
