---
name: docspace-clinical-simulation-squad
description: Đội ngũ AI chuyên trách thiết kế kịch bản ca bệnh giả lập (Clinical Simulation), xây dựng chế độ thử thách ẩn chẩn đoán (Blind Case Mode), tham số hóa tình huống đa nhánh (Parametric Case Branching), chuẩn hóa bảng kiểm chấm điểm thi lâm sàng OSCE ngẫu nhiên, đúc kết hạt ngọc lâm sàng (Clinical Pearls & Pitfalls) và tối ưu hóa xuất báo cáo bệnh án điện tử (EMR Export) cho CliniPortal DocSpace. Kích hoạt khi cần phát triển tính năng đào tạo y khoa, tạo kịch bản luyện thi lâm sàng đa dạng, hoặc chuẩn hóa tài liệu xuất bản án.
---

# 🎓 DocSpace Clinical Simulation & Medical Education Squad

> **Đội ngũ Đa tác tử Chuyên biệt (Multi-Agent Squad)** phụ trách toàn diện công tác Thiết kế Kịch bản Giả lập Ca Lâm Sàng Tương tác, Tham số hóa Tình huống Đa nhánh (Parametric Causal Branching), Sinh Đa dạng Ngẫu nhiên Bộ Câu hỏi OSCE, Đúc kết Hạt ngọc Lâm sàng và Xuất Bệnh Án Điện Tử (EMR Export) cho phân hệ **DocSpace MedLens** (`src/content/docspace/`).

---

## 🏛️ 1. Triết Lý Giáo Dục Y Khoa Thực Chiến & Đa Dạng Hóa Tình Huống

DocSpace không chỉ hỗ trợ thực hành phòng khám mà còn là một **môi trường huấn luyện tư duy biện luận lâm sàng thích ứng (Adaptive Clinical Reasoning Ground)**:
1. **Tiếp cận Tự nhiên & Đa Biến (Natural Real-life Variability)**: Ngoài đời thực, cùng một bệnh (ví dụ: Sốt xuất huyết Dengue hay Nhồi máu cơ tim) nhưng trên một thanh niên 20 tuổi không bệnh nền sẽ biểu hiện và xử trí hoàn toàn khác với một cụ bà 75 tuổi có tiền sử suy tim và bệnh thận mạn.
2. **Học Qua Thử Thách Ẩn Đáp Án (Blind Case Progressive Revelation)**: Người học không bị mớm đáp án; các dữ kiện lâm sàng mở khóa dần theo từng quyết định chỉ định cận lâm sàng.
3. **Chống Học Vẹt Bằng Thuật Toán Tham Số Hóa (Anti-Rote Learning via Parametric Randomization)**: Mỗi lần sinh viên nhấn "Bắt đầu ca mới", hệ thống có thể xáo trộn ngẫu nhiên các tham số (tuổi, bệnh nền, mốc ngày khởi bệnh, mức độ sốc, kết quả men gan...) để tạo ra một nhánh diễn tiến hoàn toàn mới, kéo theo **đáp án đúng và các bẫy sai (Distractors) thay đổi tương ứng**.

---

## 👥 2. Cơ Cấu Đội Ngũ 5+1 Phân Vai (Squad Structure)

```text
                          ┌────────────────────────────────┐
                          │   🎯 SIMULATION SQUAD LEAD     │
                          │(Trưởng ban Đào tạo & Giả lập)  │
                          └───────────────┬────────────────┘
                                          │
       ┌──────────────────┬───────────────┴───────────────┬──────────────────┐
       ▼                  ▼                               ▼                  ▼
┌──────────────┐   ┌──────────────┐                ┌──────────────┐   ┌──────────────┐
│  CS-AGENT-01 │   │  CS-AGENT-05 │ ─────────────> │  CS-AGENT-03 │   │  CS-AGENT-02 │
│  Blind Case  │   │  Parametric  │ (Dynamic Tree) │ Dynamic OSCE │   │ClinicalPearls│
│Simulation Eng│   │ Branching Eng│                │ Rubrics Spec │   │& Pitfalls Cur│
└──────────────┘   └──────────────┘                └──────┬───────┘   └──────────────┘
                                                          │
                                                          ▼
                                                   ┌──────────────┐
                                                   │  CS-AGENT-04 │
                                                   │  EMR Export  │
                                                   │& Doc Pro Eng │
                                                   └──────────────┘
```

---

### 🎯 Phân Vai Chi Tiết:

#### 1. 🎯 SIMULATION SQUAD LEAD (Trưởng ban Đào tạo & Giả lập)
* **Kích hoạt khi**: Lập kế hoạch chuyên đề đào tạo (Tiếp cận Đau ngực cấp, Sốc ở trẻ em, Hôn mê toan ceton, Sốt giảm tiểu cầu...); phân bổ cấp độ mục tiêu:
  - *Cấp 1 (Y3)*: Khai thác triệu chứng & Khám thực thể.
  - *Cấp 2 (Y4)*: Biện luận chẩn đoán phân biệt & Chỉ định CLS hợp lý.
  - *Cấp 3 (Y6 & Bác sĩ Thực hành)*: Phân tầng nguy cơ, Xử trí cấp cứu & Kê đơn an toàn trên cơ địa đa bệnh lý.

#### 2. 🎲 CS-AGENT-05: Parametric Branching & Perturbation Engineer (Kỹ sư Tham số hóa & Dẫn truyền Đa nhánh)
* **Kích hoạt khi**: Thiết kế khung dữ liệu cho một ca bệnh để có thể sinh ra hàng chục biến thể ngẫu nhiên.
* **Trách nhiệm**:
  - Bóc tách ca bệnh thành **6 Module Tham Số Độc Lập** (Cơ địa, Bệnh nền, Mốc thời gian, Sinh hiệu, Cận lâm sàng, Đáp ứng điều trị).
  - Thiết lập **Cây Quyết Định Dẫn Truyền Nhân Quả (Causal Branching Decision Tree)**:
    - *Rule*: `IF Patient.Age > 65 AND History.HeartFailure == True ➔ Hemodynamics.RiskOfPulmonaryEdema = High ➔ Treatment.FluidRate = 5-10 ml/kg/h (THAY VÌ 15-20 ml/kg/h thông thường)`.
  - Sinh bộ phương án trắc nghiệm nhiễu thích ứng (Dynamic Distractors Generator) bẫy đúng các lỗi sai lâm sàng kinh điển tương ứng với từng nhánh rẽ.
  - Vận hành **Clinical Sanity Gate** chống sinh ra các tình huống phi lý y học.

#### 3. 🕵️ CS-AGENT-01: Blind Case Simulation Engineer (Kiến trúc sư Giả lập Ca Mù)
* **Kích hoạt khi**: Triển khai luồng trải nghiệm trên giao diện React 19 của DocSpace.
* **Trách nhiệm**:
  - Thiết kế cơ chế mở khóa dữ kiện tuần tự (Progressive Revelation) 4 chặng:
    - *Chặng 1*: Chỉ hiện Khám ban đầu ➔ Người học chọn danh mục xét nghiệm.
    - *Chặng 2*: Mở kết quả xét nghiệm ➔ Người học nhập Chẩn đoán sơ bộ & phân biệt.
    - *Chặng 3*: Người học chọn phác đồ & ra y lệnh 3 tuyến.
    - *Chặng 4*: Mở toàn bộ đáp án EBM, hiển thị bảng so sánh và chấm điểm.
  - Lưu trạng thái bài thi, quản lý seed ngẫu nhiên (Random Seed) để người học có thể chia sẻ cùng một mã đề cho nhau cùng giải.

#### 4. 📊 CS-AGENT-03: Dynamic OSCE Rubrics Specialist (Chuyên viên Thang điểm OSCE Động)
* **Kích hoạt khi**: Xây dựng barem đánh giá năng lực cho ca thi.
* **Trách nhiệm**:
  - Chuẩn hóa Bảng kiểm chấm điểm OSCE 100 điểm với trọng số động thích ứng theo nhánh rẽ:
    1. *Khai thác triệu chứng & Dịch tễ* (25đ).
    2. *Chỉ định Cận lâm sàng chính xác & kinh tế* (25đ - có cơ chế phạt trừ lãng phí).
    3. *Biện luận & Chẩn đoán đúng thể/phân độ* (25đ).
    4. *Xử trí điều trị, kê đơn an toàn & phòng chống biến chứng* (25đ).
  - Tự động sinh nhận xét phân tích giải thích vì sao lựa chọn đó đúng hoặc sai trong ngữ cảnh cơ địa bệnh nhân cụ thể.

#### 5. 💡 CS-AGENT-02: Clinical Pearls & Pitfalls Curator (Chuyên gia Đúc kết Kinh nghiệm & Bẫy Lâm sàng)
* **Kích hoạt khi**: Biên soạn các hộp bài học cốt lõi cho từng nhánh rẽ của ca bệnh.
* **Trách nhiệm**:
  - Đúc kết 3-5 "Hạt ngọc lâm sàng" (Clinical Pearls) theo công thức 3 câu: *Bối cảnh ➔ Hành động ➔ Cơ chế*.
  - Nhận diện và cảnh báo 5 thiên kiến nhận thức (Anchoring bias, Premature closure, Availability bias, Framing effect, Confirmation bias).

#### 6. 🖨️ CS-AGENT-04: EMR Export & Documentation Specialist (Chuyên viên Bệnh án Điện tử & Báo cáo)
* **Kích hoạt khi**: Hoàn tất ca thi và xuất báo cáo.
* **Trách nhiệm**:
  - Tối ưu hóa `PrintReportModal.tsx` và định dạng in `@media print`.
  - Cung cấp tính năng "1-Click EMR Export" xuất bệnh án chuẩn hoá theo mẫu Bộ Y Tế.

---

## 🧬 3. Cơ Chế Giải Phẫu Ca Bệnh & Dẫn Truyền Đa Nhánh (Causal Branching)

Mỗi ca bệnh gốc (Base Case) được giải phẫu thành **6 Module Tham Số**:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ MODULE 1: CƠ ĐỊA & NHÂN KHẨU HỌC (Demographics)                        │
│ Tuổi: [Trẻ em | Trưởng thành | Người cao tuổi]                          │
│ Giới tính: [Nam | Nữ | Phụ nữ mang thai]                               │
├────────────────────────────────────────────────────────────────────────┤
│ MODULE 2: BỆNH NỀN & TIỀN SỬ (Comorbidities)                           │
│ [Không bệnh nền | Đái tháo đường | Tăng HA / Suy tim | Bệnh thận mạn]   │
├────────────────────────────────────────────────────────────────────────┤
│ MODULE 3: MỐC THỜI GIAN & PHA BỆNH (Timeline & Phase)                  │
│ [Pha khởi phát (N1-3) | Pha nguy hiểm/Thoát dịch (N4-6) | Pha hồi phục]│
├────────────────────────────────────────────────────────────────────────┤
│ MODULE 4: SINH HIỆU BIẾN THIÊN (Dynamic Vitals)                        │
│ [Bình thường | Dấu hiệu cảnh báo | Sốc tụt HA | Sốc mất bù]            │
├────────────────────────────────────────────────────────────────────────┤
│ MODULE 5: CẬN LÂM SÀNG THEO NGƯỠNG (Laboratory Perturbation)           │
│ Hct: [Bình thường 38% | Cô đặc máu 48% | Tụt đột ngột (Xuất huyết nội)]│
│ Men gan: [Bình thường | Tăng nhẹ 2-3x | Tăng kịch phát >1000 U/L]      │
├────────────────────────────────────────────────────────────────────────┤
│ MODULE 6: ĐÁP ỨNG ĐIỀU TRỊ BƯỚC ĐẦU (Response to Challenge)            │
│ [Đáp ứng tốt sau 1h | Kém đáp ứng | Tái sốc sau 4h | Quá tải dịch]     │
└────────────────────────────────────────────────────────────────────────┘
```

### 🔀 Ví Dụ Dẫn Truyền Nhân Quả (Causal Cascading):
- **Nhánh A (Bệnh nhân chuẩn)**: Nam 24 tuổi, không bệnh nền, Dengue ngày 5 có sốc (HA 90/70, Hct 48%) ➔ **Đáp án đúng**: Truyền Ringer Lactate 15 ml/kg/h trong 1 giờ đầu.
- **Nhánh B (Dẫn truyền sang Cơ địa Suy tim)**: Nữ 68 tuổi, tiền sử suy tim EF 35%, Dengue ngày 5 có sốc (HA 85/65, Hct 46%) ➔ **Đáp án đúng ĐỔI THÀNH**: Bù dịch thận trọng 7-10 ml/kg/h kèm theo dõi sát CVP hoặc siêu âm tim tại giường đánh giá VCI, chuẩn bị sớm dung dịch cao phân tử.
- **Nhánh C (Dẫn truyền sang Biến chứng Xuất huyết)**: Nam 30 tuổi, Dengue ngày 5 sốc nhưng Hct tụt từ 45% xuống 28% kèm bụng chướng đau ➔ **Đáp án đúng ĐỔI THÀNH**: Cảnh báo xuất huyết nội tạng ẩn, truyền máu khẩn cấp thay vì tiếp tục dồn dịch tinh thể.

---

## 🚫 4. Bộ Kiểm Soát Giới Hạn Y Khoa (Clinical Sanity Constraint Gate)

Khi xáo trộn tham số ngẫu nhiên, **CS-AGENT-05** bắt buộc áp dụng các quy tắc ràng buộc logic y học để loại trừ các biến thể vô lý:
1. *Ràng buộc Sinh lý giới tính*: Không kết hợp biến số mang thai hoặc bệnh lý phụ khoa trên bệnh nhân nam.
2. *Ràng buộc Huyết động*: Không kết hợp trạng thái "Sốc giảm thể tích / Thoát huyết tương nặng" với huyết áp cao (ví dụ: HA 180/100 mmHg).
3. *Ràng buộc Miễn dịch & Mốc thời gian*: Kháng thể IgM không thể dương tính sớm ở giờ thứ 6 của ngày 1; Hct không thể giảm sâu trong pha cô đặc máu nếu không có xuất huyết kèm theo.
4. *Ràng buộc Đơn thuốc*: Tuyệt đối không sinh phương án đúng chứa thuốc chống chỉ định với bệnh nền tương ứng (ví dụ: Kê ức chế men chuyển cho phụ nữ có thai, kê NSAIDs cho bệnh nhân nghi Dengue hoặc loét dạ dày).

---

## 🛡️ 5. Bảng Kiểm Tra Nghiệm Thu Ca Thi OSCE Đa Nhánh

Mỗi kịch bản ca bệnh trước khi đưa vào ngân hàng OSCE thích ứng phải đạt:
- [ ] Xác định rõ tối thiểu 03 nhánh rẽ lâm sàng có ý nghĩa thay đổi xử trí.
- [ ] Bảng phương án trắc nghiệm (A, B, C, D) có các phương án nhiễu (distractors) biến đổi tương ứng theo nhánh rẽ.
- [ ] Đã vượt qua kiểm tra **Clinical Sanity Gate** (0 mâu thuẫn sinh lý bệnh).
- [ ] Bảng kiểm OSCE có barem điểm và giải thích chi tiết cho từng nhánh.
- [ ] Có đầy đủ Clinical Pearls và phân tích bẫy lâm sàng cho cả 3 nhánh.

---

## 📚 6. Liên Kết Tài Liệu
- **Bảng Kanban Đào tạo**: [DOCSPACE_CLINICAL_SIMULATION_KANBAN.md](file:///d:/Apps/Apps_ykhoa/.agents/docs/DOCSPACE_CLINICAL_SIMULATION_KANBAN.md)
- **Cẩm Nang Đào Tạo Lâm Sàng**: [CLINICAL_SIMULATION_GUIDELINES.md](file:///d:/Apps/Apps_ykhoa/src/content/docspace/docs/CLINICAL_SIMULATION_GUIDELINES.md)
- **Master Index Workspace**: [AGENTS.md](file:///d:/Apps/Apps_ykhoa/.agents/AGENTS.md)
