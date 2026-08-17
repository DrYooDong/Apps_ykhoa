# CLI-04: Diễn Giải Khí Máu Động Mạch (ABG), Cân Bằng Toan Kiềm & Tiếp Cận Stewart

> **Phân loại**: Thăng bằng toan kiềm • **Khối**: BLOCK-7 (Hóa Sinh Lâm Sàng & Xét Nghiệm)  
> **Tags**: #KhíMáuĐộngMạch #ABG #ToanChuyểnHóa #KiềmChuyểnHóa #AnionGap #DeltaDelta #WinterFormula #StewartApproach #SID

---

## 🎯 Mục Tiêu Học Tập & Tổng Quan Phân Tử
Sinh lý thăng bằng Acid - Base của cơ thể; Các hệ đệm sinh học (Bicarbonate, Hemoglobin, Protein, Phosphate); Quy trình diễn giải Khí máu động mạch (ABG) chuẩn 6 bước; Đánh giá bù trừ sinh lý (Công thức Winter cho toan chuyển hóa, công thức bù kiềm chuyển hóa và toan/kiềm hô hấp cấp/mạn); Tính toán và biện luận Khoảng Trống Anion Máu (Serum Anion Gap - AG) và hiệu chỉnh theo Albumin; Tỷ số Delta-Delta ($\Delta\text{AG} / \Delta\text{HCO}_3^-$) để phát hiện rối loạn toan kiềm phối hợp ẩn giấu; Tiếp cận Hiện đại Stewart (Chênh lệch ion mạnh - SID, Tổng acid yếu không bay hơi - $A_{TOT}$, và $pCO_2$).

---

## 🔬 Phản Ứng, Phương Trình & Cơ Chế Then Chốt

1. **Phương Trình Henderson-Hasselbalch**:
   $$pH = 6.1 + \log_{10} \left( \frac{[HCO_3^-]}{0.03 \times PaCO_2} \right)$$
   - Thành phần chuyển hóa (Thận điều hòa): $[HCO_3^-]$ (Bình thường: $24\text{ mmol/L}$).
   - Thành phần hô hấp (Phổi điều hòa): $PaCO_2$ (Bình thường: $40\text{ mmHg}$).

2. **Quy Trình 6 Bước Đọc Khí Máu Động Mạch (ABG Algorithm)**:
   - **Bước 1: Đánh giá $pH$**: $pH < 7.35$ (Toan máu - Acidemia); $pH > 7.45$ (Kiềm máu - Alkalemia).
   - **Bước 2: Xác định Rối loạn Nguyên phát**: Nhìn $PaCO_2$ và $[HCO_3^-]$ xem biến số nào thay đổi cùng chiều với $pH$.
   - **Bước 3: Đánh giá Đáp ứng Bù trừ Sinh lý**:
     - *Toan chuyển hóa*: Dự đoán $PaCO_2$ bù trừ bằng **Công thức Winter**:
       $$\text{Dự đoán } PaCO_2 = 1.5 \times [HCO_3^-] + 8 \pm 2$$
       - Nếu $PaCO_2\text{ thực tế} > \text{Dự đoán}$: Phối hợp thêm **Toan hô hấp** (Ứ đọng $\text{CO}_2$).
       - Nếu $PaCO_2\text{ thực tế} < \text{Dự đoán}$: Phối hợp thêm **Kiềm hô hấp** (Tăng thông khí quá mức).
     - *Kiềm chuyển hóa*: $\text{Dự đoán } PaCO_2 = 0.7 \times ([HCO_3^-] - 24) + 40 \pm 2$.
     - *Toan hô hấp cấp*: Cứ tăng $10\text{ mmHg } PaCO_2 \rightarrow [HCO_3^-]$ tăng $1\text{ mmol/L}$.
     - *Toan hô hấp mạn*: Cứ tăng $10\text{ mmHg } PaCO_2 \rightarrow [HCO_3^-]$ tăng $3.5\text{ mmol/L}$.
     - *Kiềm hô hấp cấp*: Cứ giảm $10\text{ mmHg } PaCO_2 \rightarrow [HCO_3^-]$ giảm $2\text{ mmol/L}$.
     - *Kiềm hô hấp mạn*: Cứ giảm $10\text{ mmHg } PaCO_2 \rightarrow [HCO_3^-]$ giảm $4 - 5\text{ mmol/L}$.
   - **Bước 4: Tính Khoảng Trống Anion (Serum Anion Gap - AG)**:
     $$\text{AG} = [Na^+] - ([Cl^-] + [HCO_3^-])\quad (\text{Bình thường: } 10 - 12\text{ mmol/L})$$
     - **Hiệu chỉnh theo Albumin máu (Cực kỳ quan trọng)**:
       $$\text{AG}_{\text{hiệu chỉnh}} = \text{AG}_{\text{tính}} + 2.5 \times (4.0 - \text{Albumin (g/dL)}) = \text{AG}_{\text{tính}} + 0.25 \times (40 - \text{Albumin (g/L)})$$
   - **Bước 5: Tính Tỷ Số Delta-Delta ($\Delta\text{AG} / \Delta\text{HCO}_3^-$) Khi Có Tăng AG**:
     $$\text{Tỷ số } \frac{\Delta\text{AG}}{\Delta\text{HCO}_3^-} = \frac{\text{AG}_{\text{hiệu chỉnh}} - 12}{24 - [HCO_3^-]}$$
     - **Tỷ số từ $1.0 - 2.0$**: Toan chuyển hóa tăng khoảng trống Anion đơn thuần (Pure High AG Metabolic Acidosis).
     - **Tỷ số $< 1.0$**: Phối hợp **Toan chuyển hóa tăng Anion Gap + Toan chuyển hóa tăng Clo (Non-AG Acidosis)** (ví dụ: DKA kèm ỉa chảy).
     - **Tỷ số $> 2.0$**: Phối hợp **Toan chuyển hóa tăng Anion Gap + Kiềm chuyển hóa** (ví dụ: DKA kèm nôn ói nhiều mất dịch vị acid).
   - **Bước 6: Tính Khoảng Trống Thẩm Thấu (Osmolar Gap) Nếu Nghi Ngờ Ngộ Độc Cồn**.

---

## 💡 Điểm Ngọc Lâm Sàng (Clinical Pearls)

- **Mẹo Nhớ Nguyên Nhân Toan Chuyển Hóa Tăng Khoảng Trống Anion (GOLD MARK)**:
  - **G** - Glycols (Ethylene glycol, Diethylene glycol).
  - **O** - Oxoproline (Dùng Paracetamol liều cao kéo dài ở phụ nữ suy kiệt).
  - **L** - L-Lactate (Sốc, thiếu máu mô, toan lactic typ A/B).
  - **D** - D-Lactate (Hội chứng ruột ngắn - Short bowel syndrome).
  - **M** - Methanol (Ngộ độc rượu giả).
  - **A** - Aspirin / Salicylates (Toan chuyển hóa phối hợp kiềm hô hấp).
  - **R** - Renal failure (Suy thận giai đoạn cuối tích tụ Sulfate, Phosphate, Urate).
  - **K** - Ketoacidosis (Nhiễm toan Ceton do ĐTĐ, do rượu, do đói kéo dài).
- **Hạ Albumin Máu Làm Che Lấp Toan Chuyển Hóa Tăng Anion Gap**:
  - Albumin là một polyanion mang điện tích âm chiếm tới $80\%$ giá trị Anion Gap bình thường.
  - Cứ giảm $10\text{ g/L}$ Albumin máu ($1\text{ g/dL}$) làm Anion Gap giảm đi $2.5\text{ mmol/L}$. Ở bệnh nhân ICU nặng suy kiệt có Albumin $= 20\text{ g/L}$, giá trị $AG = 12\text{ mmol/L}$ tưởng chừng bình thường nhưng sau hiệu chỉnh thực tế là $17\text{ mmol/L}$ (Bệnh nhân đã có toan chuyển hóa tăng AG tiềm ẩn!).

---

## 🧪 Bảng Chỉ Số Khí Máu Động Mạch Chuẩn & Khoảng Tham Chiếu

| Thông Số Khí Máu | Máu Động Mạch (ABG) | Máu Tĩnh Mạch (VBG) | Ý Nghĩa Bệnh Lý |
| :--- | :--- | :--- | :--- |
| **$pH$ Máu** | $7.35 - 7.45$ (Chuẩn: $7.40$) | $7.31 - 7.41$ (Thấp hơn $0.03 - 0.05$) | $< 7.20$ hoặc $> 7.60$: Nguy kịch, đe dọa loạn nhịp và ngừng tim |
| **$PaCO_2$** | $35 - 45\text{ mmHg}$ ($4.7 - 6.0\text{ kPa}$) | $40 - 50\text{ mmHg}$ (Cao hơn $4 - 6\text{ mmHg}$) | $> 45\text{ mmHg}$: Toan hô hấp (giảm thông khí); $< 35\text{ mmHg}$: Kiềm hô hấp |
| **$PaO_2$** | $80 - 100\text{ mmHg}$ ($10.6 - 13.3\text{ kPa}$) | $30 - 50\text{ mmHg}$ | $< 60\text{ mmHg}$: Suy hô hấp giảm oxy máu (Hypoxemia) |
| **$[HCO_3^-]$ (Actual / Standard)** | $22 - 26\text{ mmol/L}$ (Chuẩn: $24$) | $24 - 28\text{ mmol/L}$ | $< 22\text{ mmol/L}$: Toan chuyển hóa; $> 26\text{ mmol/L}$: Kiềm chuyển hóa |
| **Base Excess (BE - Kiềm dư)** | $-2.0 \text{ đến } +2.0\text{ mmol/L}$ | $-2.0 \text{ đến } +2.0\text{ mmol/L}$ | $BE < -3.0$: Toan chuyển hóa; $BE > +3.0$: Kiềm chuyển hóa |
| **$SaO_2$** | $95 - 99\%$ | $65 - 75\%$ ($SvO_2$) | Tỷ lệ phần trăm Hemoglobin bão hòa oxy |
| **Lactate Máu** | $0.5 - 1.6\text{ mmol/L}$ | $0.5 - 2.0\text{ mmol/L}$ | $> 2.0\text{ mmol/L}$: Toan lactic, dấu hiệu giảm tưới máu mô trong sốc |

---

*Tài liệu tham khảo: Hóa Sinh Y Học ĐHYD 2024, Clinical Physiology of Acid-Base and Electrolyte Disorders (Rose & Post), Marino's The ICU Book 4th.*
