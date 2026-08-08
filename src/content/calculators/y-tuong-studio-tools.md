# 🎨 Bộ Ý Tưởng & Định Hướng Phát Triển Công Cụ Lâm Sàng Dạng Studio (Clinical Studio Tools & Workbenches)

> Tài liệu này tổng hợp triết lý thiết kế, quy chuẩn kiến trúc và bộ ý tưởng phát triển các **Công cụ Lâm sàng Dạng Studio (Clinical Studio Tools)** thuộc hệ sinh thái **CliniPortal**. Studio đại diện cho cấp độ công cụ tương tác cao cấp nhất, phục vụ bác sĩ thực hành lâm sàng và hồi sức chuyên sâu tại giường bệnh.

---

## 🏛️ 1. Triết Lý Thiết Kế & Đặc Trưng Của Studio Tools

Khác với các máy tính điểm y tế đơn giản (Diagnostic Calculators) hay bảng bù dịch đơn lẻ, một **Clinical Studio Tool** được định nghĩa bởi 5 đặc trưng cốt lõi:

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                      CLINICAL STUDIO WORKBENCH                          │
├───────────────────┬─────────────────────┬───────────────────────────────┤
│ PANEL 1: PRESETS  │ PANEL 2: INTERACTIVE│ PANEL 3: DYNAMIC CONTROLS     │
│ Ca bệnh mẫu       │ VISUALIZER CANVAS   │ Multi-Pump / Parameter Sliders│
│ & Demographics    │ (SVG / 2D Matrix)   │ Phản ứng tức thì (Reactive)   │
├───────────────────┴─────────────────────┴───────────────────────────────┤
│ PANEL 4: ADVANCED INTERVENTIONAL MANAGEMENT & ACTION PROTOCOLS          │
│ Thủ thuật can thiệp • Khuyến cáo EBM • Cảnh báo an toàn • Copy HIS      │
└─────────────────────────────────────────────────────────────────────────┘
```

1. **Giao diện Bàn Làm Việc 4 Cột / 4 Khối (4-Panel Interactive Workspace)**:
   - Tự động sắp xếp linh hoạt trên Desktop và Mobile. Bố cục gồm: Ca mẫu/Thông số bệnh nhân $\rightarrow$ Canvas trực quan $\rightarrow$ Bộ điều khiển động $\rightarrow$ Trung tâm Xử trí Can thiệp & Y lệnh.
2. **Bộ Mô Phỏng & Đồ Thị Trực Quan (Interactive Visualizer Canvas)**:
   - Sử dụng SVG thuần hoặc Canvas 2D render đồ thị huyết động, sóng ECG, radar phân loại sốc, sơ đồ vi sinh hoặc thước đo Broselow mà không dùng thư viện ngoài.
3. **Tính Toán Phản Ứng Tức Thì (Reactive Sliders & Control Panel)**:
   - Mọi thao tác kéo slider liều thuốc hoặc thay đổi chỉ số sinh hiệu đều lập tức cập nhật kết quả, tốc độ máy bơm tiêm điện (BTĐ), và chỉ số cảnh báo mà không cần bấm nút gửi form thủ công.
4. **Trung Tâm Xử Trí Can Thiệp & Thủ Thuật Lâm Sàng (Advanced Interventional Action Center)**:
   - Không chỉ trả về kết quả số, Studio tích hợp quy trình xử trí can thiệp xâm lấn: chỉ số can thiệp đường truyền (CVC, A-Line), cài đặt máy thở/RSI safety, test động học dịch (PLR), tiêu chí kích hoạt ECMO/IABP, và phác đồ giải độc khẩn cấp.
5. **Xuất Y Lệnh Bệnh Án 1-Click & Chia Sẻ Dữ Liệu (Clinical Bridge & HIS Copy)**:
   - Nút sao chép Y lệnh tiêu chuẩn HIS (VNPT-HIS, Viettel-HIS, FPT-HIS) và tự động đồng bộ thông số (Cân nặng, IBW, MAP, VIS...) sang các Studio khác qua `ClinicalBridge`.

---

## 💡 2. Bộ 8 Ý Tưởng Studio Lâm Sàng Trọng Điểm

### 1. 🩸 Hemodynamics & Shock Pro Studio (Hồi Sức Vận Mạch & Động Lực Học Huyết Động)
* **Vị trí**: `src/content/calculators/emergency/ql-van-mach-studio.html` (Đã được nâng cấp)
* **Tính năng Studio**:
  - Quản lý 4 bơm tiêm điện song song (Norepinephrine, Vasopressin, Epinephrine, Dobutamine/Dopamine).
  - Tính điểm tải vận mạch **VIS (Vasoactive-Inotropic Score)** và phân tầng rủi ro tử vong.
  - SVG Vector Radar định vị 4 thể sốc (Septic/Distributive, Cardiogenic, Hypovolemic, Mixed).
  - Máy tính ngược tốc độ BTĐ ($mL/h \rightarrow mcg/kg/min$).
  - Mô-đun Xử trí Can thiệp 5 Tab: Đặt CVC/A-Line & Cấp cứu thoát mạch NE; RSI Hemodynamic Safety; Test PLR & US-IVC; Trigger VA-ECMO/IABP; Liệu pháp ILE Lipid 20% & HIET.

### 2. 🫁 Ventilator & ARDS Pro Studio (Động Học Thông Khí Nhân Tạo & ARDS)
* **Vị trí đề xuất**: `src/content/calculators/emergency/ql-may-tho.html`
* **Tính năng Studio**:
  - Mô phỏng đường cong Áp lực - Thể tích ($P-V$ loop) và Dòng chảy - Thể tích ($F-V$ loop).
  - Ma trận cài đặt PEEP tối ưu theo tỷ lệ $P/F$ (ARDSNet Table vs Compliance Tối đa).
  - Máy tính cơ học phổi: Compliane động/tĩnh ($C_{stat}$), Trở kháng đường thở ($R_{aw}$), Driving Pressure ($\Delta P = P_{plat} - PEEP$).
  - Can thiệp lâm sàng: Protocol huy động phế nang (Recruitment Maneuver), chỉ định Thở bụng sấp (Prone Positioning), tiêu chí rút ống NKQ/Cai máy thở (RSBI, P0.1, NIF).

### 3. 💊 PK/PD TDM Pro Studio (Dược Động Học Tương Tác & Giám Sát Trị Liệu)
* **Vị trí đề xuất**: `src/content/calculators/infectious/ql-vancomycin.html` & `chinh-lieu-khang-sinh.html`
* **Tính năng Studio**:
  - Mô phỏng đồ thị nồng độ thuốc theo thời gian $C(t)$ (AUC/MIC, $C_{max}$, $C_{min}$ đỉnh/đáy).
  - Tự động chỉnh liều theo chức năng thận động ($eGFR$ CKD-EPI vs Cockcroft-Gault vs CrCl 24h).
  - Ma trận cảnh báo độc tính thận (Nephrotoxicity) khi phối hợp Vancomycin + Piperacillin/Tazobactam hoặc Aminoglycosides.
  - Can thiệp: Hướng dẫn lấy mẫu máu TDM đúng thời điểm (Trough level trước liều thứ 4) và hiệu chỉnh Bayesian.

### 4. 👶 Pediatric Emergency & Resus Studio (Cấp Cứu & Hồi Sức Nhi Khoa 3D Broselow)
* **Vị trí đề xuất**: `src/content/calculators/emergency/peds-resus-studio.html`
* **Tính năng Studio**:
  - Thước đo Broselow tương tác 3D/SVG theo chiều dài cơ thể trẻ ($\text{cm} \rightarrow \text{Màu dải Broselow} \rightarrow \text{Cân nặng ước tính}$).
  - Tự động tính nhanh liều thuốc cấp cứu hồi sức nhi (Adrenaline, Atropine, Amiodarone, Glucose 10%, Bicarbonate).
  - Kích thước ống nội quản (ETT cuffed/uncuffed), chiều sâu đặt ống, lưỡi đèn nội soi, và năng lượng sốc điện ($2-4\,J/kg$).
  - Can thiệp: Phác đồ bù dịch chống sốc ở trẻ em ($10-20\,mL/kg$), xử trí co giật do sốt / trạng thái động kinh Nhi.

### 5. 🎗️ OncoDose & Staging Pro Studio (Tính Liều Hóa Chất, Độc Tính & Phân Tầng Ung Thư)
* **Vị trí đề xuất**: `src/content/calculators/oncology/onco-dose-studio.html`
* **Tính năng Studio**:
  - Máy tính diện tích tích bề mặt cơ thể BSA (DuBois, Mosteller, Haycock) & Liều Carboplatin theo công thức Calvert ($AUC \times (CrCl + 25)$).
  - Phân tầng độc tính tủy xương & độc tính thần kinh ngoại vi theo tiêu chuẩn CTCAE v5.0.
  - Matrix hỗ trợ xếp giai đoạn ung thư tương tác (TNM 8th/9th Edition Dynamic Matrix).
  - Can thiệp: Hướng dẫn giảm liều hóa chất theo hạ bạch cầu hạt trung tính (Neutropenia) / suy thận / suy gan, phác đồ G-CSF và thuốc chống nôn 3 dược chất.

### 6. 🤰 Obstetric & Fetal Assessment Studio (Sản Khoa, Sức Khỏe Thai Nhi & Xử Trí Tiền Giật Co)
* **Vị trí đề xuất**: `src/content/calculators/obstetrics/obgyn-studio.html`
* **Tính năng Studio**:
  - Dynamic Timeline tính tuổi thai, ngày sinh dự kiến (EDD) theo siêu âm quý 1 và kinh cuối (LMP).
  - Biểu đồ tăng trưởng thai nhi Hadlock Percentiles (EFW, BPD, AC, FL).
  - Bộ phân tích sản đồ (Partogram) & Sóng Cardiotocography (CTG/NST) nhận diện nhịp giảm bất thường (Early/Late/Variable Decelerations).
  - Can thiệp: Phác đồ tiêm $MgSO_4$ phòng/trị co giật trong Tiền sản giật nặng (Liều tấn công 4g IV $\rightarrow$ Liều duy trì 1g/h + Bộ kiểm tra độc tính Mất phản xạ gân xương/Thở chậm/Liệu pháp Gluconate Canxi).

### 7. 🩺 Perioperative Risk & Optimization Studio (Đánh Giá Nguy Cơ Phẫu Thuật & Tối Ưu Nội Khoa)
* **Vị trí đề xuất**: `src/content/calculators/surgery/periop-risk-studio.html`
* **Tính năng Studio**:
  - Tích hợp 4 thang điểm phẫu thuật cùng lúc (ASA Physical Status, RCRI Lee, NSQIP Surgical Risk, Gupta MICA).
  - Ma trận hướng dẫn ngưng/tiếp tục thuốc nội khoa trước mổ: Thuốc kháng đông/kháng tiểu cầu (Bridging Heparin protocol), Thuốc đái tháo đường (SGLT2i ngưng 3-4 ngày, Metformin ngưng 24h, Insulin điều chỉnh), Thuốc huyết áp (ACEi/ARB).
  - Can thiệp: Phác đồ tối ưu hemoglobin tiền phẫu (Patient Blood Management - PBM), chiến lược nhịn ăn uống ERAS.

### 8. 🧪 Electrolyte & Acid-Base Kinetic Studio (Động Học Điện Giải & Thẩm Thấu Máu Nâng Cao)
* **Vị trí**: `src/content/calculators/renal/electrolyte-studio.html` (Nâng cấp mở rộng)
* **Tính năng Studio**:
  - Động học bù Natri trong Hạ Natri máu cấp/mạn (Công thức Adrogué-Madias, tốc độ nâng Natri tối đa $6-8\,mmol/L/24h$ phòng hội chứng Hủy Myelin Cầu Não ODS).
  - Xử trí cấp cứu Tăng Kali máu nặng ($\text{Gluconate Canxi} \rightarrow \text{Insulin + Dextrose} \rightarrow \text{Thần kinh/Bicarbonate} \rightarrow \text{Lọc máu}$).
  - Can thiệp: Bàn tính khoảng bù Anion Gap, Delta Gap ($\Delta/\Delta$), Osmolal Gap và công cụ lập kế hoạch pha dịch nhược trương/ưu trương custom.

---

## 🚨 3. Bộ Ý Tưởng Studio Chuyên Biệt Cho Bác Sĩ Cấp Cứu (Emergency Medicine Studio Tools)

Dành riêng cho công tác cấp cứu tại giường (Emergency Department / Trauma Bay / Resuscitation Unit), các công cụ Studio dưới đây được tối ưu hóa cho phản ứng tốc độ cao, hỗ trợ ra quyết định khẩn cấp và đếm nhịp thủ thuật:

### 1. ⚡ Cardiac Arrest & ACLS Resuscitation Pro Studio (Hồi Sinh Tim Phổi & Cấp Cứu Ngừng Tuần Hoàn High-Tech)
* **Vị trí đề xuất**: `src/content/calculators/emergency/acls-resus-studio.html`
* **Tính năng Studio**:
  - **Đồng hồ đếm ngược chu kỳ CPR 2 phút (Real-time 2-min CPR Cycle Timer)** kèm âm thanh nhịp metronome 100-120 bpm (SVG Visual Ring Progress Bar).
  - **Cây thuật toán ACLS tương tác 1-Click**: Phân nhánh tự động giữa Nhịp Sốc được (VF / Pulseless VT) và Nhịp Không Sốc được (Asystole / PEA).
  - **Máy tính & Nhắc liều thuốc cấp cứu**: Adrenaline 1mg (tự động đếm lùi 3-5 phút báo tiêm nhắc), Amiodarone (300mg $\rightarrow$ 150mg), Lidocaine, MgSO4, Canxi Chloride, Bicarbonate.
  - **Checklist 5H5T nhận diện nguyên nhân đảo ngược được**: Hypovolemia, Hypoxia, Hydrogen ion (Acidosis), Hypo/Hyperkalemia, Hypothermia; Tension pneumothorax, Tamponade, Toxins, Thrombosis (PE/MI).
  - **ROSC Protocol Tracker**: Quản lý chăm sóc sau ngừng tuần hoàn thành công (Kiểm soát nhiệt độ mục tiêu TTM 32-36°C, duy trì MAP $\ge 65\,mmHg$, PaCO2, kích hoạt PCI cấp cứu).

### 2. 🧪 Emergency Toxicology & Overdose Poisoning Studio (Giải Độc Cấp Cứu & Ngộ Độc Cấp High-Tech)
* **Vị trí đề xuất**: `src/content/calculators/emergency/toxicology-studio.html` (Đã có phiên bản cơ bản)
* **Tính năng Studio**:
  - **Toxidrome Matrix Selector**: Định vị 6 Hội chứng Ngộ độc Đặc trưng (Anticholinergic, Cholinergic/Thuốc trừ sâu phốt pho hữu cơ, Sympathomimetic, Opioid, Sedative-Hypnotic, Serotonin Syndrome).
  - **Biểu đồ Rumack-Matthew Nomogram tương tác (Ngộ độc Paracetamol)**: Nhập nồng độ Paracetamol ($mcg/mL$) và giờ thứ $t$ sau uống ($4 - 24\,h$) $\rightarrow$ Render vị trí điểm trực quan trên biểu đồ SVG $\rightarrow$ Đưa ra quyết định truyền N-Acetylcysteine (NAC) 21-hour IV Protocol (150 mg/kg $\rightarrow$ 50 mg/kg $\rightarrow$ 100 mg/kg).
  - **Fast-Guide Thuốc Giải Độc Đặc Hiệu (Antidotes)**: Naloxone (Opioid), Atropine + Pralidoxime (PAM), Lipid Emulsion 20% (ILE/LAST ngộ độc thuốc tê), Flumazenil (Benzodiazepine), Digoxin Immune Fab, Xanh Methylene (Methemoglobinemia).

### 3. 🚑 Polytrauma & Massive Transfusion MTP Pro Studio (Cấp Cứu Đa Chấn Thương & Truyền Máu Khối Lượng Lớn)
* **Vị trí đề xuất**: `src/content/calculators/emergency/polytrauma-mtp-studio.html`
* **Tính năng Studio**:
  - **Thang điểm Tiên lượng Truyền máu Khối lượng lớn TASH & ABC Score**: Dự đoán nguy cơ cần kích hoạt MTP ngay khi bệnh nhân vào phòng cấp cứu.
  - **Phác đồ MTP (Massive Transfusion Protocol Tỷ lệ 1:1:1)**: Máy tính số đơn vị Hồng cầu lắng (RBC), Huyết tương tươi đông lạnh (FFP), Tiêu cầu (Platelet) và Cryoprecipitate theo thể tích máu mất.
  - **Can thiệp Kháng sợi huyết & Hạ Canxi máu**: Thuật toán cho Tranexamic Acid (TXA) 1g IV trong 3 giờ đầu (CRASH-2 trial), bù Calcium Chloride/Gluconate phòng hạ Canxi máu do ngộ độc Citrate trong máu truyền.
  - **SVG Trauma Body Map Checklist**: Rà soát tổn thương cấp cứu Primary Survey (eFAST US: Morrison pouch, splenorenal, pelvis, pericardium, pneumothorax; Đặt dẫn lưu khoang màng phổi Chest Tube, Cố định xương chậu Pelvic Binder).

4. 🧠 Acute Stroke & Thrombolysis Rapid Decision Studio (Cấp Cứu Đột Quỵ Brain Attack & Tiêu Sợi Huyết/Can Thiệp Mạch)
* **Vị trí**: `src/content/calculators/neurology/dg-dot-quy-studio.html` (Đã được nâng cấp)
* **Tính năng Studio**:
  - **Thanh cửa sổ thời gian Time-Window Bar**: $0 \rightarrow 4.5\,h$ (Cửa sổ rtPA Tiêu sợi huyết đường tĩnh mạch) và $4.5 \rightarrow 24\,h$ (Cửa sổ Can thiệp lấy huyết khối cơ học EVT theo thử nghiệm DAWN/DEFUSE-3).
  - **Bảng điểm NIHSS 11 mục Visual interactive**: Tính điểm NIHSS tự động kèm phân tầng độ nặng.
  - **Máy tính liều Alteplase (rtPA) chuẩn**: $0.9\,mg/kg$ (tối đa $90\,mg$), bolus tĩnh mạch 10% trong 1 phút + 90% truyền trong 60 phút.
  - **Bảng kiểm Chống chỉ định rtPA 1-Click** (Huyết áp > 185/110, INR > 1.7, Tiểu cầu < 100k, Xuất huyết nảo trên CT).

### 5. 🫁 Difficult Airway & Rapid Sequence Intubation RSI Pro Studio (Đặt Ống NKQ Khó & Chuẩn Bị RSI Cấp Cứu)
* **Vị trí đề xuất**: `src/content/calculators/emergency/rsi-airway-studio.html`
* **Tính năng Studio**:
  - **Bảng Đánh giá Đường thở Khó 4 Thang điểm**: LEMON score (Look, Evaluate 3-3-2, Mallampati, Obstruction, Neck mobility), MAACOCHA score (ICU intubation), SHORT (Surgical airway).
  - **Máy tính Liều Thuốc RSI 3 Pha**:
    1. *Pretreatment*: Fentanyl ($3\,mcg/kg$), Lidocaine ($1.5\,mg/kg$).
    2. *Induction (Khởi mê)*: Etomidate ($0.3\,mg/kg$), Ketamine ($1.5-2\,mg/kg$), Propofol ($1.5\,mg/kg$).
    3. *Paralytic (Giãn cơ)*: Succinylcholine ($1.5\,mg/kg$), Rocuronium ($1.2\,mg/kg$).
  - **Thuật toán "Failed Airway" & Can thiệp Cấp cứu**: Quy trình Đặt ống qua Laryngeal Mask Airway (LMA), Video Laryngoscope, và Cắt màng nhẫn giáp cấp cứu (Cricothyroidotomy - Surgical vs Needle) khi rơi vào tình huống "Cannot Intubate, Cannot Oxygenate" (CICO).

### 6. 🔥 Burn Resuscitation & Fluid Calculator Studio (Cấp Cứu Bỏng Cấp & Bù Dịch Parkland/Galveston)
* **Vị trí đề xuất**: `src/content/calculators/emergency/burn-resus-studio.html`
* **Tính năng Studio**:
  - **Sơ đồ diện tích bỏng TBSA SVG Body Map (Rule of Nines & Lund-Browder Chart)**: Nhấp chọn các vùng cơ thể bỏng (Đầu mặt cổ 9%, Cánh tay 9%, Thân trước 18%, Thân sau 18%, Chân 18%, Sinh dục 1%) $\rightarrow$ Tự động tính % TBSA bỏng độ II trở lên.
  - **Máy tính liều bù dịch Parkland Formula (Adult)**: $4\,mL \times \text{Cân nặng (kg)} \times \%TBSA \text{ Bỏng Lactate Ringer}$. Phân bổ 50% lượng dịch trong 8 giờ đầu (tính từ thời điểm bỏng), 50% lượng dịch trong 16 giờ tiếp theo.
  - **Pediatric Galveston Burn Formula**: Bù dịch bỏng cho trẻ em.
  - **Can thiệp**: Chỉ định rạch giải ép khoang bỏng (Escharotomy), Tiêu chí chuyển tuyến Trung tâm Bỏng, và Xử trí bỏng hô hấp/ngộ độc CO ($COHb > 10\% \rightarrow O_2 100\%$).

### 7. 🫀 Cardiogenic Shock & ACS Interventional Pro Studio (Sốc Tim & Can Thiệp Mạch Vành Cấp Cứu)
* **Vị trí đề xuất**: `src/content/calculators/emergency/cardiogenic-shock-studio.html`
* **Tính năng Studio**:
  - **Thang điểm Phân tầng Sốc tim SCAI (SCAI Shock Stage Calculator)**: Phân tầng 5 giai đoạn từ A (At Risk) đến E (Extremis - Thất bại hồi sức).
  - **Dự đoán tử vong TIMI & GRACE Score**: Tính nguy cơ tử vong trong viện và 6 tháng đối với STEMI/NSTEMI.
  - **Ma trận lựa chọn Thuốc tăng co bóp & Vận mạch**: Phối hợp Dobutamine, Milrinone, Norepinephrine và Epinephrine theo HA tâm thu, Chỉ số tim (CI) và SVR.
  - **Can thiệp Lâm sàng**: Tiêu chí chỉ định Hỗ trợ tuần hoàn cơ học (IABP, Impella, VA-ECMO), Bảng kiểm chuyển phòng DSA can thiệp mạch và Y lệnh Thuốc chống đông/kháng tiểu cầu kép (Aspirin 300mg + Ticagrelor 180mg + Heparin 70U/kg).

### 8. 🫁 Pulmonary Embolism & Acute RV Failure Studio (Thuyên Tắc Phổi Cấp & Suy Thất Phải Cấp)
* **Vị trí đề xuất**: `src/content/calculators/emergency/pe-thrombolysis-studio.html`
* **Tính năng Studio**:
  - **Bộ tính điểm Wells PE, Geneva & Thuật toán YEARS**: Xác định xác suất thuyên tắc mạch phổi và chỉ định D-Dimer vs CTA ĐM Phổi.
  - **Thang điểm Phân tầng Nguy cơ PESI / sPESI**: Phân loại Thuyên tắc phổi diện rộng (Massive - Sốc/Tụt HA), Bán diện rộng (Submassive - Căng thất phải trên CT/Echo + Troponin/NT-proBNP cao) và Nguy cơ thấp.
  - **Phác đồ Tiêu sợi huyết khẩn cấp (Alteplase 100mg IV infusion 2h / Accelerated 50mg bolus trong Ngừng tuần hoàn)**.
  - **Can thiệp**: Tiêu chí chỉ định Can thiệp nội mạch lấy huyết khối (CDT/Thrombectomy) hoặc VA-ECMO / Phẫu thuật mở lấy huyết khối ĐM phổi cấp cứu.

### 9. ⚡ Severe Dysrhythmia & Transcutaneous Pacing Studio (Cấp Cứu Rối Loạn Nhịp Nặng & Tạo Nhịp Qua Da)
* **Vị trí đề xuất**: `src/content/calculators/emergency/arrhythmia-pacing-studio.html`
* **Tính năng Studio**:
  - **Cây thuật toán ACLS Cấp cứu Nhịp nhanh & Nhịp chậm Tương tác**: Nhận diện tiêu chí Không ổn định (Tụt HA, Biến đổi ý thức, Sốc, Đau ngực nhồi máu, Suy tim cấp).
  - **Máy tính Năng lượng Sốc điện Đồng bộ (Synchronized Cardioversion)**: Đưa ra mức năng lượng khuyến cáo ($50-200\,J$) theo dạng rối loại nhịp (Rung nhĩ, Cuồng nhĩ, Nhịp nhanh trên thất SVT, Nhanh thất VT).
  - **Hướng dẫn Đặt Máy Tạo Nhịp Qua Da (Transcutaneous Pacing - TCP)**: Cài đặt Tần số ($60-80\,bpm$), Tăng liều mA đến khi Bắt được nhịp điện học & cơ học, kèm phác đồ an thần/giảm đau (Ketamine / Midazolam / Fentanyl).
  - **Máy tính Liều Thuốc Chống Rối Loạn Nhịp**: Amiodarone 150mg IV trong 10 min $\rightarrow$ Truyền 1mg/min; Procainamide; Adenosine $6mg \rightarrow 12mg$ tiêm Nhanh bơm đuổi NaCl 0.9%.

### 10. 🩸 Sepsis & Hour-1 Bundle Pro Studio (Sốc Nhiễm Khuẩn & Quản Lý Phác Đồ Hour-1 Bundle)
* **Vị trí đề xuất**: `src/content/calculators/emergency/sepsis-bundle-studio.html`
* **Tính năng Studio**:
  - **Thang điểm SOFA & qSOFA Calculator**: Đánh giá suy đa cơ quan (Hô hấp P/F, Đông máu PLT, Gan Bilirubin, Tim mạch MAP/Vận mạch, Thần kinh GCS, Thận Cr/Nước tiểu).
  - **Đồng hồ Đếm Ngược 60 Phút Hour-1 Sepsis Bundle**: 1) Đo Lactate máu, 2) Cấy máu trước dùng kháng sinh, 3) Dùng Kháng sinh phổ rộng IV, 4) Truyền $30\,mL/kg$ Dịch tinh thể nếu Tụt HA hoặc Lactate $\ge 4\,mmol/L$, 5) Khởi động Norepinephrine duy trì MAP $\ge 65\,mmHg$.
  - **Ma trận Lựa chọn Phác đồ Kháng sinh Kinh nghiệm**: Gợi ý phối hợp kháng sinh theo ổ nhiễm trùng nghi ngờ (Phổi, Ổ bụng, Tiết niệu, Da mô mềm, TKTW, Sốt hạ bạch cầu hạt).
  - **Xử trí Sốc Nhiễm Khuẩn Kháng Vận Mạch**: Phác đồ Hydrocortisone $200\,mg/ngày$ truyền tĩnh mạch liên tục.

### 11. 🩸 Resuscitative Metabolic, Electrolyte & AEIOU Dialysis Crisis Studio (Cấp Cứu Rối Loạn Điện Giải, Toan Nặng & Lọc Máu Cấp)
* **Vị trí đề xuất**: `src/content/calculators/emergency/metabolic-crisis-studio.html`
* **Khác biệt cốt lõi với Phân hệ Thận**: Trong khi Phân hệ Thận (`renal/electrolyte-studio.html`) tập trung vào bù điện giải từ từ mạn tính và điều trị nội khoa, Studio Cấp cứu này tập trung **100% vào các Tình huống Khẩn cấp Đe dọa Tính mạng tại Giường bệnh (Resuscitation Bay & ICU)**:
* **Tính năng Studio**:
  - **Động cơ Phân tích Khí Máu & Toan Kiềm Hồi Sức Tốc Độ Cao (Resuscitative ABG & Stewart Matrix)**: Phân tích HAGMA, NAGMA, Delta Ratio ($\Delta AG / \Delta HCO_3^-$), và bảng tra cứu độc chất **GOLD MARK** (Methanol, Aspirin, Ketoacidosis, L-lactate, AKI) cho toan chuyển hóa nặng.
  - **Phác đồ Khẩn cấp Cấp cứu Tăng Kali Máu Đ dọa Tim (Hyperkalemia EKG Rescue)**:
    - *Ổn định màng cơ tim*: $CaCl_2$ 10% 1g qua CVC hoặc Canxi Gluconate 10% 30mL qua IV ngoại vi trong 1-2 phút khi có sóng T nhọn cao / QRS giãn rộng.
    - *Shift Kali vào tế bào*: Insulin 10U IV Rapid + Dextrose 50% 50mL + Salbutamol $10-20\,mg$ phun khí dung.
  - **Phác đồ NaCl 3% Bolus Cấp cứu Hạ Natri Máu Co Giật / Hôn Mê**: Nước muối ưu trương **NaCl 3% 150 mL IV bolus trong 20 phút** nâng khẩn Natri $4-6\,mmol/L$ chống thoát vị não cấp (Chỉ định rõ ranh giới khác với bù mạn tính 24h).
  - **Liệu pháp NaHCO3 8.4% trong Toan Nặng $pH < 7.15$ (BICAR-ICU Protocol)**: Chỉ định & Bàn tính liều Bicarbonate chuẩn cho toan chuyển hóa kèm suy thận cấp.
  - **Ma trận Kích hoạt Lọc Máu Cấp Cứu (Emergency Hemodialysis / CRRT Trigger Matrix - AEIOU)**:
    - **A** (Acidosis $pH < 7.15$ kháng trị), **E** (Electrolytes $K^+ > 6.5\,mmol/L$ có EKG đổi màu), **I** (Ingestion ngộ độc Methanol/Aspirin/Lithium), **O** (Overload phù phổi cấp kháng lợi tiểu), **U** (Uremia bệnh não/viêm màng ngoài tim).
    - Gợi ý cài đặt phương thức CRRT (CVVH / CVVHD / CVVHDF) hoặc SLED / HD cấp cứu.

### 12. 🩺 eFAST POCUS & Emergency Procedures Studio (Siêu Âm Cấp Cứu POCUS eFAST & Bảng Kiểm Thủ Thuật Cấp Cứu)
* **Vị trí đề xuất**: `src/content/calculators/emergency/pocus-efast-studio.html`
* **Tính năng Studio**:
  - **Sơ đồ SVG 7 Cửa Sổ Siêu Âm eFAST Tương Tác**: RUQ (Khoang Morrison), LUQ (Khoang lách-thận), Pelvis (Bàng quang/Túi cùng), Pericardium (Dưới mũi ức), Bilateral Pleural (Màng phổi 2 bên tìm Dấu trượt màng phổi Lung Sliding / Lung Point).
  - **Giao thức Siêu Âm Sốc RUSH Protocol**: Đánh giá 3 yếu tố: Bơm (Pump - EF, Tràn dịch màng tim, Giãn thất phải), Bình chứa (Tank - IVC collapse, Dịch màng phổi/màng bụng), Đường ống (Pipes - Phình ĐM chủ, Huyết khối ĐM sâu DVT).
  - **Checklist Hướng dẫn Thủ thuật Xâm lấn Cấp cứu**: Chọc hút khí màng phổi khẩn / Đặt dẫn lưu màng phổi (Chest Tube), Chọc dò màng tim cấp cứu, Đặt Catheter Tĩnh mạch trung tâm (US-guided CVC IJV/Femoral), Chọc dò tủy sống & Chọc dò dịch báng.

---

## 📐 3. Quy Chuẩn Kỹ Thuật Đóng Gói Studio Tool

Tất cả các công cụ nâng cấp hoặc tạo mới theo phong cách Studio phải tuân thủ nghiêm ngặt các quy tắc kỹ thuật sau:

1. **Không Dùng Thư Viện Bên Ngoài**:
   - Chỉ sử dụng HTML5, Vanilla CSS (Design Tokens `var(--color-...)`), và Vanilla JavaScript (ES6+).
   - Render đồ thị, visualizer bằng `<svg>` hoặc `<canvas>` thuần.
2. **Kiến Trúc Tách Biệt Modularity**:
   - File HTML ngữ nghĩa ngắn gọn, không inline CSS dài.
   - Logic công thức y khoa được đóng gói theo Pattern Strategy của `ClinicalEngine`.
3. **Responsive Mobile-First & Dark Mode Complete**:
   - Hỗ trợ xem mượt mà trên di động (width $\le 375px$, touch target $\ge 44px$).
   - Tuân thủ đầy đủ biến Dark Mode (`[data-theme="dark"]`).
4. **Hoạt Động Offline 100%**:
   - Dữ liệu tra cứu và presets ca bệnh mẫu được lưu trong các tập tin JS tĩnh, không phụ thuộc API bên ngoài.
