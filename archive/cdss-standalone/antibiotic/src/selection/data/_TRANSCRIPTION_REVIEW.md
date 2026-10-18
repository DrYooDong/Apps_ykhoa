# ĐỐI CHIẾU DỮ LIỆU Y KHOA & GIẢI THUẬT PHÂN NHÓM KHÁNG SINH
## CDSS QUYẾT ĐỊNH SỬ DỤNG VÀ LỰA CHỌN KHÁNG SINH (CLINICAL DECISION SUPPORT SYSTEM)

> Tài liệu chuẩn hóa đối chiếu dữ liệu giữa các văn bản quy chuẩn từ Bệnh viện Bệnh Nhiệt Đới (eMed 2026), Bộ Y tế (QĐ 5631/QĐ-BYT 2020) và hệ thống mã nguồn TypeScript trong `src/selection/`.

---

## 1. MƯỜI HAI (12) NGUYÊN TẮC VÀNG VÀ CHỈ ĐỊNH BAN ĐẦU
* **Nguồn trích dẫn:** BV Bệnh Nhiệt Đới - *1. Lưu đồ hướng dẫn sử dụng kháng sinh* (File 1, Trang 3 - 4).
* **Định vị trong CDSS:** Bước 1 (StepIndication) & Checklists nhắc nhở an toàn kê đơn.
* **Các nguyên tắc cốt lõi được số hóa:**
  1. Xác định rõ bản chất bệnh lý nhiễm khuẩn cần kháng sinh.
  2. Phân nhóm bệnh nhân theo nguy cơ vi khuẩn kháng thuốc (VKĐK) và độ nặng bệnh.
  3. Khai thác kỹ tiền sử dị ứng trước khi chỉ định.
  4. Lấy bệnh phẩm vi sinh (cấy máu, đàm, mủ, nước tiểu) *trước liều KS đầu tiên*, không trì hoãn điều trị cấp cứu.
  5. Nhiễm trùng nặng và Sốc nhiễm khuẩn (*Sepsis & Septic Shock*): Kháng sinh phải được truyền ngay trong **giờ đầu tiên**.
  6. Giải quyết triệt để ổ nhiễm, nguồn lây (*source control*: dẫn lưu áp xe, rút catheter lưu).
  7. Áp dụng chiến lược xuống thang (*de-escalation*) theo kháng sinh đồ hoặc lâm sàng.
  8. Ứng dụng dược động - dược lực học (PK/PD): T>MIC, AUC/MIC, Cmax/MIC; truyền tĩnh mạch kéo dài.
  9. Không lạm dụng phối hợp KS: Carbapenem hoặc BL/BLI đã có phổ kỵ khí $\to$ **không phối hợp thêm Metronidazole**.
  10. Tái đánh giá hiệu quả dùng KS tại các mốc **48–72h**, mỗi tuần dùng thuốc, khi đổi thuốc và trước khi ngưng.
  11. Bắt buộc hội chẩn đa chuyên khoa khi lâm sàng không cải thiện hoặc ngoài hướng dẫn phác đồ.
  12. Thực hiện quy trình phê duyệt kháng sinh hạn chế (Nhóm 1 ưu tiên quản lý theo BYT).

---

## 2. GIẢI THUẬT PHÂN NHÓM NGUY CƠ NHIỄM VI KHUẨN ĐA KHÁNG (MDR)
* **Nguồn trích dẫn:** BV Bệnh Nhiệt Đới - *2. Lưu đồ phân nhóm nguy cơ nhiễm vi khuẩn đa kháng và chọn lựa kháng sinh ban đầu* (File 2, Trang 2 - 3, Cập nhật 22/09/2026).
* **Định vị trong CDSS:** Bước 3 (StepRisk) & Hàm `classifyRisk()` trong `engine.ts`.
* **Thuật toán ma trận quyết định:**
  - $n =$ Tổng số yếu tố nguy cơ CHUNG nhiễm MDR được chọn (trong 8 yếu tố).
  - Điểm độ nặng:
    + Người lớn: $\text{SOFA} \ge 2$
    + Trẻ em: $\text{pSOFA} \ge 8$ (hoặc Phoenix Sepsis 2024)
    + Bệnh nhân bệnh gan mạn / Xơ gan: $\text{CLIF-SOFA} \ge 12$
  - **Nhóm 1 (Ít nguy cơ VKĐK):**
    $$n = 0 \quad \text{HOẶC} \quad (n = 1 \text{ VÀ Độ nặng thấp})$$
    $\to$ Chỉ định kháng sinh theo phác đồ thông thường (Nhóm 1).
  - **Nhóm 2 (Nguy cơ cao VKĐK):**
    $$n \ge 2 \quad \text{HOẶC} \quad (n = 1 \text{ VÀ Độ nặng cao})$$
    $\to$ Bắt buộc sử dụng kháng sinh phổ rộng cho vi khuẩn đa kháng (Nhóm 2).
* **Quy tắc phối hợp tác nhân kép:**
  - Có nguy cơ cả Gram (+) và Gram (-) $\to$ Phối hợp KS (ví dụ Vancomycin + Carbapenem).
  - Có nguy cơ cả ESBL và *Pseudomonas/Acinetobacter* $\to$ **Ưu tiên chọn nhóm KS diệt Pseudomonas/Acinetobacter**.

---

## 3. PHÁC ĐỒ KHÁNG SINH KHỞI ĐẦU THEO Ổ NHIỄM VÀ CƠ ĐỊA
* **Nguồn trích dẫn:** BV Bệnh Nhiệt Đới - *7. Hướng dẫn sử dụng kháng sinh* (File 3, Trang 4 - 13).
* **Định vị trong CDSS:** Bước 4 (StepEmpiric) & `src/selection/data/empiricRegimens.ts`.

| Ổ nhiễm trùng | Nhóm 1 (Nguy cơ thấp) | Nhóm 2 + MRSA | Nhóm 2 + ESBL | Nhóm 2 + Pseudomonas / Acinetobacter đa kháng |
|---|---|---|---|---|
| **Viêm phổi người lớn** (P.8-9) | Ceftriaxone ± Azithro / Amox-clav ± Azithro; hoặc FQ đơn trị (Levo/Moxi) | Vancomycin / Teicoplanin / Linezolid (CCD: Daptomycin) | Pip-taz / Ertapenem / Imipenem / Meropenem | Pip-taz / Cefo-sulbactam / Ceftazidime / Cefepime / Meropenem + Amikacin ± Colistin |
| **Nhiễm khuẩn huyết** (P.12-13) | Ceftriaxone ± FQ/AG tùy ngõ vào | Vancomycin / Teicoplanin | Ertapenem / Pip-taz / Meropenem | Meropenem liều cao / Pip-taz + Amikacin ± Colistin |
| **Da & mô mềm (SSTI)** (P.9-10) | Cefazolin / Oxacillin / Clindamycin / Cotrim / Ceftriaxone | Vancomycin / Daptomycin / Teicoplanin / Linezolid | — | Pip-taz / Ceftazidime / Cipro / Levo + Amikacin / Tobra |
| **Nhiễm khuẩn tiết niệu** (P.10-11) | Fosfomycin PO / Nitrofurantoin / Amox-clav / Ceftriaxone | — (Enterococcus: Ampicillin, Vancomycin, Linezolid) | Ertapenem / Meropenem / Amikacin / Fosfomycin IV | Pip-taz / Ceftazidime / Cefepime / Meropenem + Amikacin ± Colistin |
| **Dịch báng (SBP)** (P.11-12) | Ceftriaxone / Cefotaxime | — | Ertapenem / Pip-taz / Meropenem (khi CLIF-SOFA ≥ 12) | — |

---

## 4. TỐI ƯU HÓA ĐIỀU TRỊ TRÚNG ĐÍCH VI KHUẨN ĐA KHÁNG (MDR/XDR)
* **Nguồn trích dẫn:** BV Bệnh Nhiệt Đới (File 3, Trang 14 - 21).
* **Định vị trong CDSS:** Bước 5 (MdrPathwayPanel) & `src/selection/data/mdrPathways.ts`.

### 4.1. CRE (Carbapenem-Resistant Enterobacterales)
- Nếu chỉ kháng Ertapenem, còn nhạy Meropenem/Imipenem: Meropenem $2\text{g q8h}$ hoặc Imipenem $1\text{g q8h}$ truyền kéo dài $\ge 3 - 4$ giờ.
- Kháng toàn bộ Carbapenem $\to$ Phân tầng theo kiểu gen:
  + **KPC:** Ceftazidime-avibactam (CAZ-AVI), Meropenem-vaborbactam, Imipenem-relebactam, Cefiderocol, Tigecycline liều cao.
  + **OXA-48:** CAZ-AVI, Cefiderocol, Tigecycline. (Lưu ý: MEM-VAB và IMP-REL không có tác dụng).
  + **MBL (NDM, VIM, IMP):** **CAZ-AVI + Aztreonam truyền đồng thời qua Y-site** (mỗi thuốc truyền kéo dài 3 giờ) HOẶC Cefiderocol.

### 4.2. DTR-*P. aeruginosa* (IDSA 2024)
- Ưu tiên đơn trị: **Ceftolozane-tazobactam** hoặc **Ceftazidime-avibactam**.
- Thuốc thay thế: Cefiderocol, Imipenem-cilastatin-relebactam. Cứu cánh: Colistin/Polymyxin B.
- Không phối hợp Aminoglycoside thường quy trừ khi sốc nhiễm trùng hoặc giảm bạch cầu hạt.

### 4.3. CRAB (*Acinetobacter baumannii* đa kháng)
- Ưu tiên mới: **Sulbactam-Durlobactam** kết hợp Meropenem/Imipenem.
- Phác đồ kinh điển: **Ampicillin-sulbactam liều cao (27g/ngày)** phối hợp Polymyxin B / Colistin / Minocycline / Tigecycline.
- **Cảnh báo BVBND:** Colistin phối hợp Meropenem liều cao truyền kéo dài $> 3\text{h}$ **KHÔNG CÓ HIỆU QUẢ** trên CRAB.

### 4.4. *Stenotrophomonas maltophilia*
- Đầu tay: **Co-trimoxazole (TMP-SMX)**, Minocycline, Levofloxacin.
- Phối hợp: TMP-SMX + Minocycline/Levofloxacin/Cefiderocol; hoặc CAZ-AVI + Aztreonam.
- **Chống chỉ định tuyệt đối Ceftazidime đơn độc** vì vi khuẩn mang gen đề kháng tự nhiên (L1 và L2 beta-lactamase).

---

## 5. THỜI GIAN ĐIỀU TRỊ TỐI THIỂU & TIÊU CHUẨN NGƯNG KHÁNG SINH (EBM)
* **Nguồn trích dẫn:** BV Bệnh Nhiệt Đới (File 1, Trang 3).
* **Định vị trong CDSS:** Bước 5 (StopAndSwitch) & `src/selection/data/stopAndSwitch.ts`.
- **Thời gian tối thiểu dựa trên bằng chứng:**
  + CAP: $3 - 5$ ngày (PTC trial, BTS).
  + VAP: 7 ngày (PRORATA, REGARD-VAP).
  + Ổ bụng: 4 ngày sau khi kiểm soát nguồn nhiễm (STOP-IT trial).
  + Nhiễm khuẩn huyết Gram (-): 7 ngày (Yahav 2019, Lee 2023).
  + Nhiễm khuẩn tiết niệu: 7 ngày.
  + Nhiễm khuẩn huyết Tụ cầu vàng (*S. aureus*): $\ge 14$ ngày.
  + Viêm nội tâm mạc: $4 - 8$ tuần.
  + Trực khuẩn không lên men (NFNG): $10 - 14$ ngày.
- **Checklist ngưng KS:** Phải đủ **5 tiêu chí lâm sàng (5/5)**:
  1. Thân nhiệt $\le 37.3^\circ\text{C}$ liên tục $\ge 24 - 48\text{h}$.
  2. Huyết động ổn định, không dùng vận mạch.
  3. $\text{FiO}_2 \le 40\%$ hoặc $\text{SpO}_2$ đạt mục tiêu khí trời.
  4. Triệu chứng tại chỗ giảm rõ.
  5. Ăn uống được, không buồn nôn/nôn.
  VÀ đạt **ít nhất 1 tiêu chí cận lâm sàng**: $\text{PCT} < 0.5\text{ ng/mL}$ (hoặc giảm $\ge 80\%$) HOẶC $\text{WBC}$ bình thường HOẶC $\text{CRP}$ giảm $> 50\%$ hoặc $< 35\text{ mg/L}$.

---

## 6. CHUYỂN ĐỔI KHÁNG SINH TIÊM SANG UỐNG (IV-TO-PO SWITCH)
* **Nguồn trích dẫn:** Bộ Y tế - Quyết định 5631/QĐ-BYT (Phụ lục 5 & 6).
* **Định vị trong CDSS:** Bước 5 (StepReassess / IV-to-PO).
- Tiêu chí: Hết sốt $\ge 24\text{h}$, huyết động ổn định, đường tiêu hóa hấp thu tốt, không thuộc danh mục chống chỉ định chuyển sớm (viêm nội tâm mạc, viêm màng não, viêm xương tủy, áp xe chưa dẫn lưu...).
- Phân nhóm 4 lớp chuyển đổi:
  + Nhóm 1 (F > 90%, liều IV:PO = 1:1): Levofloxacin, Moxifloxacin, Linezolid, Co-trimoxazole, Metronidazole, Fluconazole.
  + Nhóm 2 (F 70-80%, tăng liều PO): Ciprofloxacin, Voriconazole.
  + Nhóm 3 (F > 90%, liều PO tối đa thấp hơn): Clindamycin, Amoxicillin, Cephalexin.
  + Nhóm 4 (F và liều PO thấp hơn): Cefuroxime axetil.
