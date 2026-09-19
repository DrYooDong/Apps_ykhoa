# 📋 DOCSPACE TREATMENT PROTOCOL SQUAD — KANBAN BOARD

> Bảng theo dõi và điều phối công việc liên ngành của **DocSpace Treatment Protocol UI Squad** và **DocSpace Treatment Data Engineering Squad**.
> Quản lý toàn bộ vòng đời phát triển, tối ưu hóa giao diện và chuẩn hóa dữ liệu cho **04. Phác đồ điều trị & Y lệnh lâm sàng** (`Step3Protocol.tsx` và `components/step3/`).

---

## 🚦 Trạng Thái Tổng Thể (System Status)

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| **Trạng thái Kiến trúc** | 🟢 ĐÃ CHUẨN HOÁ 6 ĐẦU MỤC | Hoàn tất tái cấu trúc 6 headings & Bảng 4 cột |
| **Tech Stack** | React 19 + TypeScript Strict + TailwindCSS v4 | 100% Client-Side, Zero-Latency |
| **Kiểm định Mã nguồn** | ✅ 0 Lỗi TypeScript (`tsc --noEmit`) | Đã pass toàn diện |
| **Đội ngũ Vận hành** | UI Squad & Data Engineering Squad | Đã kích hoạt 2 Squad Skills |

---

## 📌 Khung 6 Đầu Mục Lâm Sàng Chuẩn Hoá (Clinical Architecture)

1. **TopNav & Header**: Thanh điều hướng tinh gọn (chỉ nút quay lại + chọn bệnh) và Header sạch (Tên bệnh, ICD, Chuyên khoa, Nguồn phác đồ).
2. **Đầu mục 1. Phân loại (cá thể hoá)**:
   - `1a. Phân độ nặng nhẹ`: Phân tầng bậc thang (Nhẹ / Trung bình / Nặng / Nguy kịch) kèm gợi ý tự động từ DHST/CLS.
   - `1b. Phân độ biến chứng`: Complications Sentinel, cảnh báo trực cấp cứu, kích hoạt y lệnh xử trí tức thì.
   - `1c. Đối tượng đặc biệt`: Khuyến cáo cho người cao tuổi, trẻ em, phụ nữ mang thai, suy thận (eGFR), suy gan.
3. **Đầu mục 2. Phác đồ điều trị chi tiết (Bảng 4 cột)**:
   - Cột 1: Phân loại (Mức độ / Phân tầng).
   - Cột 2: Giai đoạn & Mục tiêu (Day range, tên giai đoạn, mục tiêu lâm sàng & đích sinh hiệu).
   - Cột 3: Phác đồ & Y lệnh (Xử trí cấp cứu, Y lệnh thuốc chuẩn, BHYT, DDI, y lệnh bổ sung của BS).
   - Cột 4: Theo dõi (Lâm sàng & Cận lâm sàng) với tần suất & ngưỡng an toàn.
   - Thanh tiến độ thực thi (%) + Tác vụ: Hoàn thành tất cả, Đặt lại, Sao chép EMR chuẩn HIS.
4. **Đầu mục 3. Lưu ý lâm sàng**:
   - `[1] Lưu ý, cảnh báo quan trọng`: Dấu hiệu trở nặng, mốc theo dõi đặc biệt.
   - `[2] Chống chỉ định (CCĐ)`: Thuốc cấm dùng, can thiệp nguy hại theo giai đoạn.
   - `[3] Tiêu chuẩn xuất viện hoặc chuyển tuyến`: Đích an toàn cho phép ra viện hoặc chuyển tầng ICU.
5. **Đầu mục 4. Vấn đề người bệnh quan tâm**:
   - Tư vấn & giải thích bệnh cho người bệnh và thân nhân (kết nối trực tiếp Kho TV).
6. **Đầu mục 5. Kiến thức cho nhân viên y tế**:
   - `5a. Cơ sở`: Giải phẫu - Sinh lý (GPSL) & Sinh lý bệnh (SLB).
   - `5b. Lâm sàng`: Dịch tễ học (DTH) - Chẩn đoán (CĐ) - Biến chứng (BC) - Dược lý (DUOC).
   - `5c. Hướng dẫn thực hành lâm sàng`: Khuyến cáo EBM Guidelines & Thư viện Landmark Trials.
7. **Đầu mục 6. Các ca bệnh liên quan (SOAP)**:
   - Hồ sơ bệnh án thực chiến SOAP, bẫy chẩn đoán và hội chẩn thông minh NotebookLM.

---

## 📊 Bảng Điều Phối Kanban (Active Tasks)

### 📥 1. BACKLOG (Hàng đợi Nhiệm vụ)

| ID | Nhóm việc | Nội dung Nhiệm vụ | Đội ngũ Phụ trách | Ưu tiên |
|---|---|---|---|---|
| `TP-TASK-05` | Data Eng | Bổ sung thêm dữ liệu `DailyTreatmentPhase` cho 10 bệnh lý nhiễm trùng phổ biến còn lại trong `dailyTreatmentTimeline.ts` | Data Squad (TD-AGENT-01) | 🟡 Medium |
| `TP-TASK-06` | UI/UX | Tối ưu hóa giao diện in ấn (Print Layout) xuất Bảng 4 Cột ra file PDF sạch cho hồ sơ bệnh án | UI Squad (TP-AGENT-02) | 🟢 Low |
| `TP-TASK-07` | Feature | Mở rộng tính năng gán nhãn DDI nâng cao (Drug-Herb & Drug-Food interaction) trong Bảng 4 Cột | Data Squad (TD-AGENT-02) | 🟢 Low |

---

### 🔍 2. IN REVIEW / QA (Đang Kiểm Định)

| ID | Nhóm việc | Nội dung Nhiệm vụ | Đội ngũ Phụ trách | Trạng thái |
|---|---|---|---|---|
| `TP-TASK-04` | Quality Gate | Kiểm định tương thích di động (Responsive mobile 375px+) cho Bảng 4 cột và thanh điều hướng | TP-AGENT-04 & TD-AGENT-04 | 🟡 In Review |

---

### ⚙️ 3. IN PROGRESS (Đang Triển Khai)

*(Hiện tại các tác vụ chính đã hoàn thành giai đoạn 1, sẵn sàng tiếp nhận yêu cầu từ Bác sĩ)*

---

### ✅ 4. COMPLETED (Đã Hoàn Thành Nghiệm Thu)

| ID | Nhóm việc | Nội dung Nhiệm vụ Đã Hoàn Tất | Ngày hoàn thành | Kết quả |
|---|---|---|---|---|
| `TP-TASK-01` | Architecture | Tái cấu trúc thanh điều hướng trên cùng & thanh hiển thị tên bệnh tinh gọn (`ProtocolTopNav.tsx`, `ProtocolDiseaseHeader.tsx`) | 2026-09-19 | ✅ Đạt chuẩn tối giản |
| `TP-TASK-02` | UI & Matrix | Xây dựng Bảng 4 Cột chi tiết (`DetailedTreatmentTable.tsx`) tích hợp tiến độ thực thi & chép EMR | 2026-09-19 | ✅ Đạt chuẩn 4 cột EBM |
| `TP-TASK-03` | Modularization | Triển khai 6 Sub-components chuẩn hóa: `ProtocolClassificationSection` (1a, 1b, 1c), `ClinicalCautionsSection` ([1], [2], [3]), `HealthcareWorkerKnowledgeSection` (5a, 5b, 5c), `SoapCasesSection` | 2026-09-19 | ✅ Pass TypeScript 100% |
