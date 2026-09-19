# 📋 DOCSPACE 4-STEPS CLINICAL MULTI-AGENT KANBAN BOARD

> Bảng điều phối chiến lược và giám sát vòng đời làm việc của **4 Đội ngũ AI Agent Squads** chuyên trách tương ứng với **Chu trình Lâm sàng 4 Bước** của CliniPortal MedLens DocSpace (`src/content/docspace/`).

---

## 🚦 Trạng Thái Tổng Thể (System Architecture Status)

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| **Mô hình Vận hành** | 4 Chuyên khoa Squads Khép kín | Bước 1 Ingestion ➔ Bước 2 Reasoning ➔ Bước 3 CDSS ➔ Bước 4 Protocol |
| **Tech Stack** | React 19 + TypeScript Strict + TailwindCSS v4 | 100% Client-Side, Zero-Latency |
| **Data Contracts** | 3 Chuẩn giao thức liên đội ngũ | IngestionToReasoning, ReasoningToCdss, CdssToProtocol |
| **Cổng Kiểm định (Gate)** | 0 Lỗi Type (`tsc --noEmit`) + Medical QA Gate | Pass 100% |

---

## 📌 Phân Vùng 4 Đội Ngũ Tương Ứng 4 Bước Lâm Sàng

```text
┌───────────────────────────┐      ┌───────────────────────────┐
│ 🤖 SQUAD 1: INGESTION     │      │ 🧠 SQUAD 2: REASONING     │
│ ID: docspace-step1-       │ ───> │ ID: docspace-step2-       │
│ ingestion-squad           │      │ reasoning-squad           │
│ Bước 1: Tiếp nhận dữ liệu │      │ Bước 2: Tóm tắt & Đặt VĐ  │
└─────────────┬─────────────┘      └─────────────┬─────────────┘
              │                                  │
              ▼                                  ▼
┌───────────────────────────┐      ┌───────────────────────────┐
│ ⚖️ SQUAD 3: DIAGNOSTIC    │      │ 💊 SQUAD 4: PROTOCOL      │
│ ID: docspace-step3-       │ ───> │ ID: docspace-step4-       │
│ cdss-squad                │      │ protocol-squad            │
│ Bước 3: CDSS & Phân độ    │      │ Bước 4: Phác đồ Bảng 4 Cột│
└───────────────────────────┘      └───────────────────────────┘
```

---

## 📊 Bảng Điều Phối Kanban (Multi-Squad Active Tasks)

### 📥 1. BACKLOG (Hàng đợi Nhiệm vụ Các Bước)

| ID | Bước | Nhiệm vụ / Mục tiêu | Đội ngũ Phụ trách | Mức ưu tiên |
|---|:---:|---|---|---|
| `TASK-S1-01` | Bước 1 | Mở rộng tính năng bóc tách tự động dấu hiệu nguy hiểm (Red Flags) từ lời kể tự do của người bệnh | Squad 1 (S1-AGENT-01) | 🟡 Medium |
| `TASK-S1-02` | Bước 1 | Bổ sung 20 ca lâm sàng mẫu EBM đa dạng chuyên khoa vào `sample-clinical-cases.json` | Squad 1 (S1-AGENT-03) | 🟢 Low |
| `TASK-S2-01` | Bước 2 | Nâng cấp ma trận phát hiện xung đột điều trị giữa 5 bệnh lý đồng mắc thường gặp nhất (Suy tim + COPD + ĐTĐ + CKD + SXH) | Squad 2 (S2-AGENT-03) | 🟡 Medium |
| `TASK-S3-01` | Bước 3 | Chuẩn hóa thêm các công cụ lượng giá lâm sàng tự động (CURB-65, ESI v4, PEWS) vào card chẩn đoán | Squad 3 (S3-AGENT-02) | 🟡 Medium |
| `TASK-S4-01` | Bước 4 | Mở rộng thư viện lộ trình điều trị chi tiết từng ngày `DailyTreatmentPhase` cho 15 bệnh lý truyền nhiễm tiếp theo | Squad 4 (S4-AGENT-01) | 🟡 Medium |

---

### 🔍 2. IN REVIEW / MEDICAL QA (Đang Kiểm Định Chất Lượng)

| ID | Bước | Nội dung Thẩm định | Đội ngũ Thẩm duyệt | Trạng thái |
|---|:---:|---|---|---|
| `GATE-4S-01` | Toàn hệ | Kiểm định tính toàn vẹn Data Contract liên thông xuyên suốt từ Bước 1 đến Bước 4 | 4 Squad Leads | 🟢 Ready |
| `GATE-S4-01` | Bước 4 | Kiểm tra độ tương thích di động (Mobile Responsive 375px+) của Bảng 4 Cột và phác đồ 6 đầu mục | Squad 4 (S4-AGENT-01) | 🟢 Passed |

---

### ⚙️ 3. IN PROGRESS (Đang Triển Khai)

*(Sẵn sàng tiếp nhận lệnh kích hoạt chuyên sâu cho từng Squad)*

---

### ✅ 4. COMPLETED (Đã Hoàn Thành Nghiệm Thu)

| ID | Bước | Nội dung Nhiệm vụ Đã Hoàn Tất | Ngày hoàn thành | Kết quả |
|---|:---:|---|---|---|
| `COMP-S4-01` | Bước 4 | Nâng cấp toàn diện Mục 04. Phác đồ điều trị sang cấu trúc 6 Đầu mục chuẩn hóa & Bảng 4 Cột chi tiết | 2026-09-19 | ✅ Pass TypeScript Strict |
| `COMP-S4-02` | Bước 4 | Tinh gọn thanh điều hướng trên cùng & thanh hiển thị tên bệnh tinh gọn | 2026-09-19 | ✅ Đạt chuẩn tối giản |
| `COMP-ARCH-01`| Toàn hệ | Thiết lập bản đồ Data Contracts 3 chiều kết nối Bước 1 ➔ Bước 2 ➔ Bước 3 ➔ Bước 4 | 2026-09-19 | ✅ Đã chuẩn hoá |
| `COMP-SQ-01` | Toàn hệ | Khởi tạo trọn bộ 4 Skill SOP chuyên biệt cho 4 Đội ngũ AI Agent Squads | 2026-09-19 | ✅ Kích hoạt 4 Squads |
