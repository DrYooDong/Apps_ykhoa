# 📋 DOCSPACE SOAP GUARDIAN SQUAD — KANBAN BOARD

> Bảng theo dõi và điều phối công tác **Bảo trì, Đồng bộ Danh mục, Tối ưu Bố cục Mobile và Kiểm định Dữ liệu** cho phân hệ **Sổ tay Kinh nghiệm Thực chiến SOAP** (`src/content/docspace/src/components/soap/` & `data/ba/`).

---

## 🚦 Trạng Thái Đội Ngũ (Squad Status)

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| **Trạng thái** | 🟢 SẴN SÀNG (ACTIVE) | 5 phân vai đã kích hoạt |
| **Công cụ chính** | CLI Ingest, Validator & React 19 Components | Zero-latency client-side |
| **Thư mục Quản lý** | `data/ba/*.md` & `components/soap/` | 16+ ca thực chiến lâm sàng |
| **Cổng Kiểm định (Gate)** | 100% Khớp Catalog & Responsive 375px | `validate-soap-catalog.mjs` |

---

## 📌 Phân Vùng Công Tác (Workstreams)

1. **WS-SOAP-01: Catalog Sync & Ingestion Pipeline (Đồng bộ Danh mục)**:
   - Tự động hóa đồng bộ từ `data/ba/*.md` sang `vault-catalog-thuc-hanh.json` và `vault-catalog.json`.
   - Ngăn ngừa lỗi "chỉ hiển thị 1 bệnh" (Catalog Drift).
2. **WS-SOAP-02: Mobile Ergonomics & Responsive Layout (Giao diện Di động)**:
   - Header card, Toolbar, 6-tab navigation trên màn hình nhỏ.
   - Touch targets, xử lý ngắt dòng (`break-words`), triệt tiêu tràn ngang.
3. **WS-SOAP-03: Data Quality & Clinical Integrity (Chất lượng Dữ liệu)**:
   - Chuẩn hóa Frontmatter YAML (`caseId`, `demographicContext`, `icd10`).
   - Khử HTML entities (`&gt;`, `&lt;`, `&amp;`), bảo toàn 4 góc phần tư S-O-A-P và 4 khối Pearls.
4. **WS-SOAP-04: Quality Gate Auditing (Kiểm toán Cổng Chất lượng)**:
   - Chạy các kịch bản kiểm tra trước khi bàn giao.

---

## 📊 Bảng Điều Phối Kanban (Active Tasks)

### 📥 1. BACKLOG (Hàng Đợi Nhiệm Vụ)

| ID | Module / File | Nhiệm vụ / Mục tiêu | Phân vai phụ trách | Độ ưu tiên |
|---|---|---|---|---|
| `TASK-SOAP-03` | `tools/scripts/` | Tích hợp kiểm tra tự động `validate-soap-catalog.mjs` vào quy trình build / CI | SG-AGENT-01 | 🟢 Low |

---

### 🔍 2. IN DESIGN / REVIEW (Đang Lập Kế Hoạch)

*(Chưa có task nào trong trạng thái này)*

---

### ⚙️ 3. IN PROGRESS (Đang Triển khai Mã nguồn)

*(Chưa có task nào trong trạng thái này)*

---

### 🧪 4. QUALITY GATE AUDIT (Đang Kiểm Tra Gate)

*(Chưa có task nào trong trạng thái này)*

---

### ✅ 5. DONE (Đã Hoàn thành & Bàn giao)

| ID | Module | Mô tả kết quả | Người hoàn thành | Ngày |
|---|---|---|---|---|
| `TASK-SOAP-02` | `components/soap/SoapDetailView.tsx` | Khắc phục lỗi vỡ layout Header Card và thanh Toolbar co rúm trên di động (375px): chuyển sang `flex-col`, thêm `break-words`, `min-w-0`, dải toolbar full-width bên dưới tiêu đề | SG-AGENT-02 | 2026-10-07 |
| `TASK-SOAP-01` | `data/ba/` & Catalog JSON | Sửa lỗi "chỉ hiển thị 01 bệnh" trong phân hệ SOAP: đồng bộ thành công toàn bộ 16 ca lâm sàng thực chiến vào `vault-catalog-thuc-hanh.json` và `vault-catalog.json` | SG-AGENT-01 | 2026-10-07 |
| `SETUP-SOAP-01` | Architecture | Thành lập DocSpace SOAP Guardian Squad (5 phân vai, Skill, Kanban, Lessons Learned, Validation tool) | Squad Lead | 2026-10-07 |

---

## 📝 Quy Định Cập Nhật Bảng Kanban

1. Khi phát hiện lỗi hoặc tiếp nhận ca mới, Orchestrator cấp mã `TASK-SOAP-XX` và ghi vào **BACKLOG**.
2. Phân công đúng Agent phụ trách theo bảng phân loại (A: SG-01, B: SG-02, C: SG-03).
3. Trước khi chuyển sang **DONE**, bắt buộc chạy `node tools/scripts/validate-soap-catalog.mjs` và kiểm tra hiển thị 375px.
