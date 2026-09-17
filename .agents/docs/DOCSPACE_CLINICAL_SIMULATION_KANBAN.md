# 📋 DOCSPACE CLINICAL SIMULATION & OSCE — KANBAN BOARD

> Bảng theo dõi và điều phối công tác **Thiết kế Ca Giả Lập Lâm Sàng, Tham Số Hóa Đa Nhánh, Chế Độ Thi Ẩn Đáp Án, Bảng Kiểm OSCE Động và Mẫu Bệnh Án EMR** cho phân hệ **DocSpace MedLens** (`src/content/docspace/`).

---

## 🚦 Trạng Thái Đội Ngũ (Squad Status)

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| **Trạng thái** | 🟢 SẴN SÀNG (ACTIVE - UPGRADED) | Đã bổ sung CS-AGENT-05 & Causal Branching Engine |
| **Phân tầng đối tượng** | Y3 ➔ Y4 ➔ Y6 ➔ Bác sĩ Nội trú | Đào tạo từ cơ sở đến chuyên sâu |
| **Năng lực cốt lõi** | Tham số hóa ca bệnh, sinh ngẫu nhiên OSCE | Đa dạng hóa câu hỏi, chống học vẹt |

---

## 📌 Phân Vùng Công Tác (Simulation Workstreams)

1. **WS-SIM-01: Blind Case Simulation Engine (Công nghệ Giả lập & Ẩn đáp án)**:
   - Xây dựng giao diện Quiz/Study Mode ẩn chẩn đoán sơ bộ.
   - Cơ chế mở khóa dữ kiện tuần tự (Progressive Revelation) trên Step 1 -> Step 4.
2. **WS-SIM-02: OSCE Rubrics & Scoring Engine (Chấm điểm OSCE & Phản hồi)**:
   - Thang điểm 100 theo 4 tiêu chí cốt lõi.
   - Tự động sinh nhận xét phân tích sai sót cho người học.
3. **WS-SIM-03: Clinical Pearls & Cognitive Pitfalls Bank (Hạt ngọc & Bẫy lâm sàng)**:
   - Kho đúc kết kinh nghiệm thực chiến cho từng ca bệnh trong Sổ tay SOAP.
   - Bẫy thiên kiến nhận thức: Anchoring bias, Premature closure.
4. **WS-SIM-04: EMR Export & Professional Print Formatting (Bệnh án EMR & In ấn)**:
   - Tối ưu `PrintReportModal.tsx` và định dạng in ấn `@media print`.
   - 1-Click Copy EMR format chuẩn hồ sơ bệnh án Bộ Y Tế.
5. **WS-SIM-05: Parametric Branching & Dynamic OSCE Generation (Tham số hóa & Sinh đề ngẫu nhiên)**:
   - Thiết kế 6 Module tham số cho ca bệnh gốc (Blueprint).
   - Xây dựng cây quyết định dẫn truyền nhân quả (Causal Cascading).
   - Sinh phương án trắc nghiệm nhiễu thích ứng (Dynamic Distractors) và bộ kiểm soát Clinical Sanity Gate.

---

## 📊 Bảng Điều Phối Kanban (Active Simulation Tasks)

### 📥 1. BACKLOG (Hàng Đợi Ca Giả Lập Chờ Thiết Kế)

| ID | Tên Ca / Kịch Bản | Đối tượng mục tiêu | Trọng tâm sư phạm | Phân vai | Độ ưu tiên |
|---|---|---|---|---|---|
| `SIM-01` | Cấp cứu Đau ngực cấp phân biệt STEMI vs Viêm màng ngoài tim | Y6 & Bác sĩ trẻ | Tránh bẫy ST chênh lên; nhận định cờ đỏ; tính thang điểm TIMI/GRACE | CS-AGENT-01, CS-AGENT-02 | 🔴 Critical |
| `SIM-02` | Sốt ngày 4 kèm Đau bụng vùng gan ở trẻ 10 tuổi | Y4 & Y6 Nhi khoa | Nhận diện sớm dấu hiệu cảnh báo sốc Dengue; chống bẫy đau bụng ngoại khoa | CS-AGENT-02, CS-AGENT-03 | 🟡 High |
| `SIM-03` | Khó thở cấp ở bệnh nhân cao tuổi có tiền sử COPD và Suy tim | Bác sĩ Nội trú | Tiếp cận chẩn đoán phân biệt khó thở: AECOPD vs Hen tim (Suy tim ứ huyết) | CS-AGENT-01, CS-AGENT-03 | 🟡 High |
| `SIM-05` | Nâng cấp 1-Click EMR Export trong PrintReportModal | Bác sĩ lâm sàng | Định dạng xuất nhanh bệnh án vào HIS bệnh viện không lỗi font | CS-AGENT-04 | 🟢 Medium |

---

### 🔍 2. IN SCENARIO DESIGN (Đang Thiết Kế Kịch Bản & Khóa Dữ Kiện)

*(Chưa có task nào trong trạng thái này)*

---

### ⚙️ 3. SCORING & PEARLS INTEGRATION (Đang Tích Hợp Thang Điểm & Bẫy)

*(Chưa có task nào trong trạng thái này)*

---

### 🧪 4. SIMULATION VALIDATION (Đang Chạy Thử Nghiệm Giả Lập)

*(Chưa có task nào trong trạng thái này)*

---

### ✅ 5. CERTIFIED & PUBLISHED (Đã Đưa Vào Ngân Hàng Đào Tạo)

| ID | Kịch bản / Tính năng | Mô tả nghiệm thu | Người hoàn thành | Ngày |
|---|---|---|---|---|
| `SETUP-SIM-01` | Architecture | Thành lập Clinical Simulation & Medical Education Squad | Lead | 2026-09-17 |
| `UPGRADE-SIM-02` | Parametric OSCE | Nâng cấp CS-AGENT-05 & Động cơ Dẫn truyền Đa nhánh (Causal Branching) | Lead | 2026-09-17 |
| `SIM-06` | **Blueprint Tham số hóa Ca Dengue có sốc (3 nhánh rẽ)** | Master Blueprint Causal Branching (Nhánh A Chuẩn, Nhánh B Suy tim, Nhánh C Xuất huyết nội ẩn), 4-stage revelation, Sanity Gate 100% | CS-AGENT-05, CS-AGENT-03, Squad | 2026-09-17 |
| `SIM-04` | **Barem 100 điểm OSCE & Dynamic Distractors Engine** | Engine tính điểm 4 trụ cột (Khám 25 + CLS 25 + Chẩn đoán 25 + Xử trí 25), giải thích chi tiết, Pearls & Pitfalls | CS-AGENT-03, CS-AGENT-02 | 2026-09-17 |

---

## 📝 Quy Định Cập Nhật Bảng Kanban

1. Khi tiếp nhận chuyên đề đào tạo mới, Lead tạo mã `SIM-XX` và ghi vào **BACKLOG**.
2. Khi CS-AGENT-05 và CS-AGENT-01 thiết kế cây quyết định tham số hóa, chuyển sang **IN SCENARIO DESIGN**.
3. Khi CS-AGENT-02 và CS-AGENT-03 xây dựng bảng kiểm OSCE động và đúc kết hạt ngọc lâm sàng, chuyển sang **SCORING & PEARLS INTEGRATION**.
4. Khi chạy kiểm tra qua Clinical Sanity Gate và thử nghiệm giả lập, chuyển sang **SIMULATION VALIDATION**.
5. Sau khi kiểm định đạt chuẩn, chuyển sang **CERTIFIED & PUBLISHED**.
