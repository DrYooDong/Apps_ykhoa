# 📋 DOCSPACE UI/UX & FEATURE SQUAD — KANBAN BOARD

> Bảng theo dõi và điều phối công việc của **DocSpace UI/UX & Feature Engineering Squad**.
> Áp dụng cho toàn bộ hoạt động thiết kế, tái cấu trúc layout, tinh chỉnh micro-motion và phát triển tính năng trong `src/content/docspace/`.

---

## 🚦 Trạng Thái Tổng Thể (Squad Status)

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| **Trạng thái Đội ngũ** | 🟢 SẴN SÀNG (ACTIVE) | Đã chuẩn hóa 5 vai trò và quy trình 4 giai đoạn |
| **Tech Stack** | React 19 + TS + Tailwind v4 | 100% Client-Side, Zero-Latency |
| **Thư mục Mục tiêu** | `src/content/docspace/` | SPA lâm sàng CliniPortal MedLens |
| **Cổng Kiểm định (Gate)** | 0 Error Build + WCAG 2.1 AA | `npm run build` |

---

## 📌 Phân Vùng Công Việc (Workstreams)

1. **WS-01: Layout & Ergonomics (Bố cục & Công thái học)**:
   - Header, Topbar, StepNav điều hướng wizard 4 bước.
   - Drawer tra cứu Vault, Modal CDSS, Sổ tay SOAP layout.
2. **WS-02: Monolith Refactoring & Component Modularization (Mô-đun hóa)**:
   - Tách nhỏ `Step1DataIngestion.tsx` (~98KB) -> `components/step1/`
   - Tách nhỏ `Step2Analysis.tsx` (~182KB) & `Step2ProblemStatement.tsx` (~83KB) -> `components/step2/`
   - Tách nhỏ `Step3Protocol.tsx` (~147KB) -> `components/step3/`
3. **WS-03: Interaction, Motion & Responsive (Tương tác, Chuyển động & Di động)**:
   - Touch targets trên di động (≥ 44px).
   - Micro-transitions khi chuyển tab, mở accordions, sao chép văn bản.
   - Dark Mode contrast & readability.
4. **WS-04: Clinical Features & Data Flow (Tính năng Lâm sàng & Dòng dữ liệu)**:
   - Quick Ingest từ văn bản tự do / NotebookLM.
   - Cảnh báo cờ đỏ, tương tác thuốc (SafePrescribingDdiPanel), Complication Sentinel.
   - In ấn bệnh án tùy chỉnh (PrintReportModal) & Bảng y lệnh 3 cột.

---

## 📊 Bảng Điều Phối Kanban (Active Tasks)

### 📥 1. BACKLOG (Hàng đợi Nhiệm vụ)

| ID | Module / File | Nhiệm vụ / Mục tiêu | Phân vai phụ trách | Độ ưu tiên |
|---|---|---|---|---|
| `TASK-DS-05` | `components/soap/` | Tinh chỉnh giao diện ma trận 4 cột S - O - A - P trong `SoapDetailView.tsx` cho màn hình Mobile và Tablet | DS-AGENT-01, DS-AGENT-03 | 🟢 Medium |

---

### 🔍 2. IN DESIGN / REVIEW (Đang Lập Design Contract)

*(Chưa có task nào trong trạng thái này - Sẵn sàng tiếp nhận chỉ định)*

---

### ⚙️ 3. IN PROGRESS (Đang Triển khai Mã nguồn)

*(Sẵn sàng kích hoạt theo lệnh của Người dùng)*

---

### 🧪 4. QUALITY GATE AUDIT (Đang Kiểm tra & Build)

*(Chưa có task nào đang chờ duyệt Gate)*

---

### ✅ 5. DONE (Đã Hoàn thành & Bàn giao)

| ID | Module | Mô tả kết quả | Người hoàn thành | Ngày |
|---|---|---|---|---|
| `TASK-DS-03` | `components/step3/` | Refactor tách nhỏ monolith Bước 4 `Step3Protocol.tsx` (2.945 dòng -> 667 dòng, giảm ~77%). Tạo 9 sub-components chuẩn hóa (`CollapsibleProtocolSection`, `SeverityGradingPanel`, `ProtocolOrderSheet`, `DailyTimelineTable`, `ComplicationsTriageSection`, `ClinicalCalculatorsSection`, `MonitoringCautionsSection`, `EbmGuidelinesSection`, `SoapCasesSection`). Build & Medical QA 100% PASS. | DS-AGENT-02, DS-AGENT-03, DS-AGENT-04 | 2026-09-17 |
| `TASK-DS-02` | `components/step2/` | Refactor tách nhỏ 2 monoliths Bước 2 & 3: `Step2ProblemStatement.tsx` (1.746 lines -> 439 lines) và `Step2Analysis.tsx` (3.511 lines -> 217 lines). Tạo 8 sub-components chuẩn hóa (`CaseSummaryPanel`, `DiagnosticTrianglePanel`, `ProblemListSection`, `RiskScoreTriagePanel`, `ParallelActionBoard`, `LeadDiagnosisCard`, `TargetedDiagnosticWorkup`, `DifferentialDiagnosisTable`). Build & Medical QA 100% PASS. | DS-AGENT-02, DS-AGENT-01, DS-AGENT-04 | 2026-09-17 |
| `TASK-DS-01` | `components/step1/` | Refactor tách nhỏ monolith `Step1DataIngestion.tsx` (~98KB -> ~25KB) thành 6 sub-components (`TopVaultsQuickBar`, `VitalsCardsPanel`, `LabsCardsPanel`, `ClinicalSelectorControl`, `SymptomCategorySection`, `ClinicalCopilotSidebar`). Build 0 error. | DS-AGENT-02, DS-AGENT-01 | 2026-09-17 |
| `TASK-DS-04` | `components/StepNav.tsx` | Nâng cấp thanh chuyển bước StepNav: thêm Dynamic Overall Progress Bar (0-100%), tối ưu touch target mobile ≥ 44px, chỉ báo hoàn thành check badge. | DS-AGENT-01, DS-AGENT-03 | 2026-09-17 |
| `SETUP-01` | Architecture | Thành lập DocSpace UI/UX & Feature Engineering Squad (5 phân vai, Skill, Kanban, Design System doc) | Squad Lead | 2026-09-17 |

---

## 📝 Quy Định Cập Nhật Bảng Kanban

1. Khi tiếp nhận task mới từ Người dùng, Squad Lead sẽ cấp mã `TASK-DS-XX` và ghi vào mục **BACKLOG**.
2. Khi bắt đầu thiết kế layout, chuyển sang **IN DESIGN / REVIEW** kèm theo link bản cam kết thiết kế.
3. Khi DS-AGENT-02 & DS-AGENT-03 lập trình, chuyển sang **IN PROGRESS**.
4. Khi chạy `npm run build` và kiểm thử di động/dark mode, chuyển sang **QUALITY GATE AUDIT**.
5. Sau khi DS-AGENT-04 nghiệm thu đạt 100% checklist, chuyển sang **DONE**.
