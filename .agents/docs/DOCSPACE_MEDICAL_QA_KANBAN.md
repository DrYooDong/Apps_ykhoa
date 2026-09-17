# 📋 DOCSPACE MEDICAL KNOWLEDGE STANDARDIZATION — KANBAN BOARD

> Bảng theo dõi và điều phối công tác **Kiểm định Nội dung Y khoa, Soát lỗi Chính tả/Thuật ngữ, Khử trùng lặp và Chuẩn hóa Ma trận CDSS** cho phân hệ **DocSpace MedLens** (`src/content/docspace/`).

---

## 🚦 Trạng Thái Đội Ngũ (Squad Status)

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| **Trạng thái** | 🟢 SẴN SÀNG (ACTIVE) | 5 phân vai đã được kích hoạt và chuẩn hóa |
| **Phạm vi kiểm định** | `data/enriched/*.json`, `knowledge-vault/ba/`, `seedData.ts` | Tri thức lâm sàng DocSpace |
| **Tiêu chuẩn chất lượng** | EBM 2026 + Zero-Orphan Symptoms + 0 Lỗi chính tả | Chuẩn mực BYT & Quốc tế |

---

## 📌 Phân Vùng Rà Soát (Audit Workstreams)

1. **WS-MED-01: Specialty Review (Kiểm tra Chuyên khoa)**:
   - Rà soát các khối bệnh: Tim mạch, Hô hấp, Tiêu hóa, Thần kinh, Truyền nhiễm, Nhi khoa, Thận - Tiết niệu, Cấp cứu.
2. **WS-MED-02: Terminology, Spelling & Anti-AI-isms (Thuật ngữ, Chính tả & Văn phong)**:
   - Rà soát chính tả tiếng Việt y khoa.
   - Thống nhất danh pháp Latin/Anh-Việt và bảng đơn vị cận lâm sàng.
   - Quét và loại bỏ văn phong AI máy móc (AI-isms).
3. **WS-MED-03: Symptom Dictionary & Deduplication (Khử trùng lặp & Từ điển)**:
   - Quét khử trùng lặp triệu chứng đồng nghĩa.
   - Kiểm soát nguyên tắc Zero-Orphan Symptoms.
4. **WS-MED-04: Schema Integrity & CDSS Weight Matrix (Cấu trúc & Ma trận Trọng số)**:
   - Validate JSON Schema các tệp trong `data/enriched/`.
   - Kiểm tra logic phân bổ trọng số `dt`, `gy`, `ht`, `loaitru`.

---

## 📊 Bảng Điều Phối Kanban (Active Audit Tasks)

### 📥 1. BACKLOG (Hàng Đợi Rà Soát)

| ID | Chuyên khoa / Module | Nhiệm vụ / Phạm vi | Phân vai phụ trách | Độ ưu tiên |
|---|---|---|---|---|
| `AUDIT-MED-02` | Khối Bệnh Truyền nhiễm | Thẩm định nội dung bệnh Dengue, Cúm, Sepsis, Viêm màng não trong `data/enriched/` theo Hướng dẫn BYT mới nhất | MK-AGENT-01, MK-AGENT-02 | 🟡 High |
| `AUDIT-MED-03` | Khối Bệnh Tim mạch | Thẩm định phác đồ Nhồi máu cơ tim (STEMI/NSTEMI), Suy tim, Cơn tăng huyết áp khẩn cấp/cấp cứu | MK-AGENT-01, MK-AGENT-04 | 🟡 High |
| `AUDIT-MED-05` | Khối Bệnh Hô hấp | Đối chiếu phân độ Hen phế quản (GINA) và COPD (GOLD) trong ma trận CDSS | MK-AGENT-01, MK-AGENT-03 | 🟢 Medium |

---

### 🔍 2. IN AUDIT (Đang Rà Soát Y Văn & Chính Tả)

*(Chưa có task nào trong trạng thái này - Sẵn sàng nhận lệnh)*

---

### ⚙️ 3. RESOLVING CONFLICTS & DEDUPLICATION (Đang Khử Trùng Lặp & Sửa Lỗi)

*(Chưa có task nào trong trạng thái này)*

---

### 🧪 4. SCHEMA & CDSS GATE (Đang Kiểm Tra Cấu Trúc JSON & Ma Trận)

*(Chưa có task nào trong trạng thái này)*

---

### ✅ 5. PUBLISHED & CERTIFIED (Đã Chuẩn Hóa & Xuất Bản)

| ID | Chuyên khoa | Nội dung nghiệm thu | Người kiểm duyệt | Ngày |
|---|---|---|---|---|
| `AUDIT-MED-01` | Toàn bộ KB & CDSS | Quét tự động 289 triệu chứng, 38 bệnh lý, 267 luật diễn dịch, 10 ca mẫu: 0 triệu chứng mồ côi (Zero-Orphan Pass 100%), đồng bộ hoàn hảo giữa `clinical-rules-kb.json` và `clinical-rules-symptoms.json`. Đóng gói bộ script `docspace-medical-qa-gate.mjs` (`npm run audit:medical`). | MK-AGENT-03, MK-AGENT-04 | 2026-09-17 |
| `AUDIT-MED-04` | Kho Ca Bệnh SOAP | Kiểm định 24 hồ sơ bệnh án lâm sàng tại `knowledge-vault/ba/`: 100% tuân thủ cấu trúc S-O-A-P 4 góc nhìn, 0 lỗi AI-isms máy móc, danh pháp và đơn vị cận lâm sàng chuẩn mực. | MK-AGENT-02, MK-AGENT-01 | 2026-09-17 |
| `SETUP-MED-01` | Architecture | Thành lập DocSpace Medical Knowledge Standardization Squad (5 phân vai, Skill, Kanban, Guidelines) | Lead | 2026-09-17 |

---

## 📝 Quy Định Cập Nhật Bảng Kanban

1. Khi tiếp nhận bệnh lý mới hoặc chiến dịch rà soát, Medical Knowledge Lead tạo mã `AUDIT-MED-XX` và ghi vào **BACKLOG**.
2. Khi MK-AGENT-01 & MK-AGENT-02 tiến hành kiểm định, chuyển sang **IN AUDIT**.
3. Khi phát hiện xung đột hoặc triệu chứng mồ côi, MK-AGENT-03 xử lý tại **RESOLVING CONFLICTS & DEDUPLICATION**.
4. Khi MK-AGENT-04 validate cú pháp JSON và ma trận trọng số, chuyển sang **SCHEMA & CDSS GATE**.
5. Sau khi đạt 100% tiêu chí xuất bản, chuyển sang **PUBLISHED & CERTIFIED**.
