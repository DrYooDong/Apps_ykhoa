# Phân loại Rối loạn nhịp tim trên ECG (ECG Arrhythmia Studio)

**Công cụ Phân loại Rối loạn nhịp tim & ECG Arrhythmia Studio** thuộc chuyên khoa Tim mạch & Huyết khối (CliniPortal Module Công cụ), cung cấp phương pháp chẩn đoán tiếp cận đa trục theo các tiêu chuẩn lâm sàng hiện hành.

---

## 1. Hệ thống Phân loại 6 Trục (6-Axis Classification System)

Hệ thống cơ sở dữ liệu `arrhythmia-classification-db.v2.json` phân chia 22+ chẩn đoán rối loạn nhịp tim theo 6 trục song song:

1. **Tần số (Rate)**
   - **Nhịp chậm (Bradycardia)**: HR < 60 l/p (Nhịp chậm xoang, AVB độ 1-2-3, suy nút xoang, rung nhĩ chậm).
   - **Nhịp nhanh (Tachycardia)**: HR > 100 l/p (Nhịp nhanh xoang, AVNRT, AVRT, rung nhĩ, cuồng nhĩ, VT, xoắn đỉnh).
   - **Bình thường (Normal-rate)**: Các hội chứng Brugada, QT ngắn, block nhĩ thất độ 1 hoặc 2 không ảnh hưởng tần số.
   - **Thay đổi (Variable)**: Nhịp thay đổi tùy thuộc gắng sức hoặc trương lực thần kinh tự chủ.

2. **Độ rộng phức bộ QRS (QRS Width)**
   - **QRS hẹp (< 120ms)**: Nguồn gốc trên thất dẫn truyền bình thường.
   - **QRS rộng (≥ 120ms)**: Nguồn gốc từ thất hoặc nhịp trên thất dẫn truyền lệch hướng / qua đường phụ (WPW).
   - **Thay đổi (Variable)**: Phụ thuộc vào mức độ block hoặc thay đổi hình thái QRS trong cơn.

3. **Tính đều đặn (Regularity)**
   - **Đều (Regular)**: Nhịp xoang, AVNRT, AVRT, VT đơn hình, Brugada.
   - **Không đều (Irregular)**: Rung nhĩ, MAT, Wenckebach, VT đa hình, xoắn đỉnh.

4. **Cơ chế sinh lý bệnh (Mechanism)**
   - **Tự động tính bình thường (Normal automaticity)**: Nhịp xoang nhanh/chậm.
   - **Tự động tính bất thường (Abnormal automaticity)**: MAT, nhịp gia tốc.
   - **Hoạt động nảy cò - EAD (Triggered EAD)**: Xoắn đỉnh, Andersen-Tawil.
   - **Hoạt động nảy cò - DAD (Triggered DAD)**: CPVT, RVOT-VT, LVOT-VT.
   - **Vòng vào lại giải phẫu (Anatomic Reentry)**: AVNRT, AVRT (WPW), VT quanh sẹo, VT bó.
   - **Vòng vào lại chức năng (Functional Reentry)**: Rung nhĩ.
   - **Nghẽn dẫn truyền (Conduction Block)**: Block nhĩ thất các độ, Brugada.

5. **Nguồn gốc giải phẫu (Origin)**
   - **Nút xoang (SA Node)**
   - **Cơ nhĩ (Atrial)**
   - **Bộ nối nhĩ thất / Nút AV (AV Junction / AV Node)**
   - **Đường dẫn truyền phụ (Accessory Pathway)**
   - **Hệ His-Purkinje (His-Purkinje System)**
   - **Đường ra thất phải / trái (RVOT / LVOT)**
   - **Bó dẫn truyền thất (Fascicular)**
   - **Vùng sẹo cơ tim (Scar-related)**
   - **Cơ tim lan tỏa (Diffuse Myocardial)**

6. **Tình trạng Tim cấu trúc (Structural Heart Disease)**
   - **Tim cấu trúc bình thường (Normal heart)**: AVNRT, AVRT, RVOT-VT vô căn.
   - **Bệnh tim cấu trúc (Structural disease)**: Rung nhĩ, VT quanh sẹo, ARVC, Block nhĩ thất độ 2-3.
   - **Bệnh kênh ion (Channelopathy)**: Hội chứng Brugada, QT dài/ngắn, CPVT, Andersen-Tawil.

---

## 2. Thuật toán Brugada chẩn đoán Nhịp nhanh QRS rộng

Công cụ tích hợp cây quyết định theo **Thuật toán Brugada 4 bước** để phân biệt Nhịp nhanh thất (VT) với Nhịp nhanh trên thất dẫn truyền lệch hướng (SVT with aberrancy):

1. **Bước 1**: Vắng mặt phức bộ RS ở tất cả đạo trình trước tim (V1 - V6)?
   - *Có* $\rightarrow$ Chẩn đoán **VT**.
   - *Không* $\rightarrow$ Sang Bước 2.
2. **Bước 2**: Khoảng từ khởi đầu sóng R đến điểm sâu nhất sóng S > 100ms ở một đạo trình trước tim bất kỳ?
   - *Có* $\rightarrow$ Chẩn đoán **VT**.
   - *Không* $\rightarrow$ Sang Bước 3.
3. **Bước 3**: Có hiện tượng Phân ly Nhĩ - Thất (AV Dissociation)?
   - *Có* $\rightarrow$ Chẩn đoán **VT**.
   - *Không* $\rightarrow$ Sang Bước 4.
4. **Bước 4**: Hình thái QRS ở V1-V2 và V6 có thỏa tiêu chuẩn của VT không?
   - *Có* $\rightarrow$ Chẩn đoán **VT**.
   - *Không* $\rightarrow$ Chẩn đoán **SVT dẫn truyền lệch hướng**.

---

## 3. Các Công thức Tính QTc & Phân tầng Nguy cơ

Công cụ hỗ trợ tính QTc theo 4 công thức chuẩn lâm sàng:
- **Bazett**: $\text{QTc} = \frac{\text{QT}}{\sqrt{\text{RR}}}$ *(Tối ưu khi tần số tim 60-100 l/p)*
- **Fridericia**: $\text{QTc} = \frac{\text{QT}}{\sqrt[3]{\text{RR}}}$ *(Ổn định hơn khi tần số tim nhanh > 100 l/p hoặc chậm < 60 l/p)*
- **Framingham**: $\text{QTc} = \text{QT} + 0.154 \times (1000 - \text{RR})$
- **Hodges**: $\text{QTc} = \text{QT} + 1.75 \times (\text{HR} - 60)$

### Phân tầng Nguy cơ theo Giới tính:
- **Bình thường**: Nam < 450ms, Nữ < 460ms.
- **Giới hạn (Borderline)**: Nam 450-470ms, Nữ 460-480ms.
- **Kéo dài (Prolonged)**: Nam > 470ms, Nữ > 480ms (Nguy cơ tăng cao cần rà soát thuốc gây kéo dài QT).
- **Nguy cơ cao Xoắn đỉnh (Critical / Torsades Risk)**: $\text{QTc} \ge 500\text{ms}$ (hoặc tăng > 60ms so với điện tim nền) $\rightarrow$ Cần điều trị ngay: bù Magie sulfat, chỉnh điện giải $K^+ \ge 4.0\text{ mmol/L}, Mg^{2+} \ge 2.0\text{ mg/dL}$, ngưng thuốc nghi ngờ.

---

## 4. Các Dấu hiệu Cảnh báo (Red Flags)

1. **Sóng Epsilon (V1-V3)**: Gợi ý Bệnh cơ tim thất phải gây loạn nhịp (ARVC).
2. **ST chênh dạng vòm (Type 1 Brugada) ở V1-V3**: Gợi ý Hội chứng Brugada, nguy cơ rung thất (VF) đột tử.
3. **Sóng Delta + PR ngắn (< 120ms)**: Gợi ý hội chứng WPW, cấm dùng thuốc chẹn nút nhĩ thất (Digoxin, Verapamil, Beta-blocker) khi có rung nhĩ qua đường phụ.
4. **QTc kéo dài $\ge 500\text{ms}$**: Nguy cơ cao xuất hiện Xoắn đỉnh (Torsades de Pointes) và rung thất.
