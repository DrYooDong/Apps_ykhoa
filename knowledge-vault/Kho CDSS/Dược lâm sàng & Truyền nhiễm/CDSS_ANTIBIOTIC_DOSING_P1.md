---
title: "Bảng Tính Liều Kháng Sinh Theo eGFR & PK/PD (Vancomycin, Aminoglycosides, Carbapenems)"
aliases: ["Bảng Tính liều Kháng sinh theo eGFR (Vancomycin, Aminoglycosides)", "CDSS_ANTIBIOTIC_DOSING", "ANTIBIOTIC_DOSING", "chỉnh liều kháng sinh", "Vancomycin AUC24", "Gentamicin", "Amikacin", "TDM", "AUC/MIC", "Clcr Cockcroft-Gault"]
keywords: ["CDSS", "chỉnh liều kháng sinh", "Vancomycin", "Gentamicin", "Amikacin", "TDM", "AUC/MIC", "eGFR", "Clcr", "PK/PD", "Sanford Guide"]
icd10: ["A41.9", "N18", "J18.9"]
specialty: "Dược lâm sàng & Truyền nhiễm"
tags: ["CliniPortal", "CDSS", "KhoCDSS", "ClinicalCalculator", "Dược lâm sàng & Truyền nhiễm", "Hồi sức cấp cứu"]
type: "cdss"
context: "noi-tru"
readTime: "12-15 phút"
---

# Bảng Tính Liều Kháng Sinh Theo eGFR & PK/PD (Vancomycin, Aminoglycosides, Carbapenems)

> [!NOTE]
> **Chuyên khoa:** Dược lâm sàng & Truyền nhiễm • Hồi sức Cấp cứu | **Mã ICD-10:** A41.9, N18, J18.9 | **Phân hệ:** Kho CDSS (Hệ Thống Hỗ Trợ Quyết Định Lâm Sàng) | **Căn cứ EBM:** Hướng dẫn IDSA/ASHP/SIDP/PIDS 2020 về TDM Vancomycin; Sanford Guide to Antimicrobial Therapy 2024; Phác đồ Sử dụng Kháng sinh Bộ Y tế.

---

> [!TIP] ⚡ **TRẢI NGHIỆM CÔNG CỤ CDSS TỐI ƯU HÓA KHÁNG SINH TRỰC TIẾP**
> Bạn có thể sử dụng trực tiếp công cụ CDSS tính liều kháng sinh tự động trên CliniPortal:
> - Tự động tính Độ thanh thải Creatinine ($\text{CrCl}$) theo công thức Cockcroft-Gault và Cân nặng lý tưởng (IBW / AdjBW).
> - Tính toán liều nạp (Loading dose) và liều duy trì Vancomycin theo mục tiêu $\text{AUC}_{24}/\text{MIC} \ge 400 - 600$.
> - Chế độ đơn liều hàng ngày mở rộng Aminoglycosides (Gentamicin/Tobramycin/Amikacin) theo Hartford Nomogram.
> - Bảng tra cứu chế độ truyền kéo dài (Extended Infusion) cho Beta-lactam & Carbapenem.
> 
> 🔗 **[Mở Công Cụ Tính Liều Kháng Sinh & PK/PD Studio](file:///d:/Apps_ykhoa/src/content/docspace/index.html)** *(Truy cập qua DocSpace Pro • Renal Dosing Studio)*

---

## 1. Nguyên Tắc PK/PD & Tối Ưu Hóa Liều Kháng Sinh

Hiệu quả diệt khuẩn và độ an toàn của kháng sinh phụ thuộc vào đặc tính Dược động học / Dược lực học (**PK/PD**):

| Nhóm Kháng Sinh | Chỉ Số PK/PD Quyết Định | Mục Tiêu Lâm Sàng | Chiến Lược Tối Ưu Hóa Liều |
| :--- | :--- | :--- | :--- |
| **Glycopeptides** (Vancomycin) | $\text{AUC}_{24}/\text{MIC}$ | $\text{AUC}_{24}/\text{MIC} \ge 400 - 600$<br>(Đáy Trough: 15–20 µg/ml) | Nạp liều cao ban đầu; chỉnh liều theo $\text{CrCl}$; giám sát TDM nồng độ đáy |
| **Aminoglycosides** (Gentamicin, Amikacin) | $\text{C}_{\max}/\text{MIC}$ (Phụ thuộc nồng độ) | $\text{C}_{\max}/\text{MIC} \ge 8 - 10$<br>(Gentamicin Peak 16–24, Trough < 1) | Chế độ đơn liều hàng ngày mở rộng (Một lần/ngày) theo IBW |
| **Beta-lactams & Carbapenems** (Meropenem, Piperacillin/Tazo) | $\%T > \text{MIC}$ (Phụ thuộc thời gian) | $\%T > \text{MIC} \ge 40 - 70\%$ (hoặc 100% trong sốc NK) | Giảm liều/giãn cữ theo eGFR; ưu tiên **truyền kéo dài trong 3–4 giờ** |

---

## 2. Công Thức Chuẩn Hóa Cân Nặng & Thanh Thải Thận

### 1. Cân Nặng Lý Tưởng (Ideal Body Weight - IBW)
- **Nam giới:** $\text{IBW (kg)} = 50 + 0.91 \times (\text{Chiều cao cm} - 152.4)$
- **Nữ giới:** $\text{IBW (kg)} = 45.5 + 0.91 \times (\text{Chiều cao cm} - 152.4)$

### 2. Cân Nặng Hiệu Chỉnh Khi Béo Phì (Adjusted Body Weight - AdjBW)
Áp dụng khi Cân nặng thực tế ($\text{TBW}$) vượt quá **120% IBW**:
$$\text{AdjBW (kg)} = \text{IBW} + 0.4 \times (\text{TBW} - \text{IBW})$$

### 3. Độ Thanh Thải Creatinine (Cockcroft-Gault)
$$\text{CrCl (ml/phút)} = \frac{(140 - \text{Tuổi}) \times \text{Cân nặng (kg)}}{72 \times \text{Creatinine huyết thanh (mg/dL)}} \quad [\times 0.85 \text{ nếu là Nữ}]$$

---

## 3. Phác Đồ CDSS Chỉnh Liều Vancomycin Chi Tiết

### 1. Liều Nạp Khẩn Cấp (Loading Dose)
- **Chỉ định:** Bệnh nhân nhiễm trùng nặng, sốc nhiễm khuẩn, viêm phổi thở máy, viêm nội tâm mạc hoặc viêm màng não nghi do MRSA.
- **Liều dùng:** **20 – 35 mg/kg** (tính theo Cân nặng thực tế $\text{TBW}$, tối đa 2.000–3.000 mg), truyền chậm (tối đa 1.000 mg trong mỗi 60 phút để phòng hội chứng Red Man).

### 2. Liều Duy Trì Theo Độ Thanh Thải Thận ($\text{CrCl}$)

| Mức $\text{CrCl}$ (ml/phút) | Chế Độ Liều Duy Trì | Khoảng Cách Đưa Liều | Thời Điểm Đo TDM Nồng Độ Đáy |
| :--- | :--- | :--- | :--- |
| **$\ge 90$** | 15–20 mg/kg (theo TBW) | Mỗi 8–12 giờ | Trước liều thứ 4 |
| **$60 – 89$** | 15–20 mg/kg | Mỗi 12 giờ | Trước liều thứ 4 |
| **$30 – 59$** | 15 mg/kg | Mỗi 24 giờ | Trước liều thứ 3 |
| **$15 – 29$** | 15 mg/kg | Mỗi 24–48 giờ | Trước liều thứ 2 hoặc đo ngắt quãng |
| **$< 15$ hoặc Thận nhân tạo (HD)** | Nạp 20–25 mg/kg; Duy trì 5–10 mg/kg sau lọc máu | Theo nồng độ đáy | Đo trước mỗi buổi chạy thận (duy trì 15–20 µg/ml) |
| **Lọc máu liên tục (CRRT)** | Nạp 20–25 mg/kg; Duy trì 10–15 mg/kg | Mỗi 12–24 giờ | Đo nồng độ đáy sau 24 giờ |

---

## 4. Phác Đồ Aminoglycosides (Đơn Liều Mở Rộng - Once Daily Dosing)

> [!WARNING]
> Không áp dụng chế độ một lần/ngày cho: Bệnh nhân suy thận nặng ($\text{CrCl} < 30\text{ ml/ph}$), phụ nữ có thai, cổ trướng nặng, bỏng diện rộng > 20% hoặc viêm nội tâm mạc nhiễm khuẩn do Enterococcus.

- **Gentamicin / Tobramycin:** **5 – 7 mg/kg** (tính theo IBW hoặc AdjBW nếu béo phì) truyền tĩnh mạch trong 60 phút.
- **Amikacin:** **15 – 20 mg/kg** (theo IBW/AdjBW) truyền tĩnh mạch trong 60 phút.
- **Chỉnh khoảng cách liều theo $\text{CrCl}$:**
  - $\text{CrCl} \ge 60\text{ ml/ph}$: Mỗi 24 giờ.
  - $\text{CrCl } 40–59\text{ ml/ph}$: Mỗi 36 giờ.
  - $\text{CrCl } 30–39\text{ ml/ph}$: Mỗi 48 giờ.
  - $\text{CrCl } < 30\text{ ml/ph}$: Chuyển sang chế độ đa liều truyền thống có theo dõi TDM chặt chẽ.

---

## 5. Bảng Chỉnh Liều Carbapenem & Beta-Lactam Theo eGFR

| Kháng Sinh | Liều Bình Thường | eGFR 30–59 ml/ph | eGFR 15–29 ml/ph | eGFR < 15 ml/ph / Thận nhân tạo |
| :--- | :--- | :--- | :--- | :--- |
| **Meropenem** | 1g q8h (truyền 3h) | 1g q12h (truyền 3h) | 500mg q12h | 500mg q24h (sau lọc máu) |
| **Imipenem/Cilastatin** | 500mg q6h | 500mg q8h | 250–500mg q12h | 250mg q12h (sau lọc máu) |
| **Piperacillin/Tazobactam**| 4.5g q6h (truyền 4h) | 3.375g q6h | 2.25g q6h | 2.25g q8h (+ 0.75g sau HD) |
| **Cefepime** | 2g q8h | 2g q12h | 1g q24h | 500mg–1g q24h |
| **Ceftriaxone** | 1–2g q24h | Không cần chỉnh liều | Không cần chỉnh liều | Không cần chỉnh (thải trừ kép gan-thận) |

---

## 6. Điểm Ngọc An Toàn & Phòng Ngừa Độc Tính Thận

> [!CAUTION]
> **Quy tắc an toàn sống còn:**
> 1. Tránh phối hợp đồng thời Vancomycin + Piperacillin/Tazobactam nếu bệnh nhân có nguy cơ suy thận cấp cao (nguy cơ AKI tăng gấp 3–4 lần so với Vancomycin + Cefepime/Meropenem).
> 2. Luôn kiểm tra Creatinine huyết thanh và lượng nước tiểu ít nhất mỗi 24–48 giờ ở bệnh nhân dùng kháng sinh độc thận.
> 3. Đảm bảo bù đủ thể tích dịch lòng mạch trước và trong quá trình điều trị Vancomycin / Aminoglycosides.
