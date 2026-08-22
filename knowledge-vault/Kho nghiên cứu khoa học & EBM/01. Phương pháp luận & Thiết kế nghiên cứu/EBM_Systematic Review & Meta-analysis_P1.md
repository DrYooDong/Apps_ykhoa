---
title: "Bách Khoa EBM: Tổng Quan Hệ Thống (Systematic Review) & Phân Tích Gộp (Meta-Analysis) Đỉnh Tháp Chứng Cứ"
part: "P1"
aliases:
  - "Systematic Review & Meta-analysis"
  - "Tổng quan hệ thống"
  - "Phân tích gộp"
  - "Forest Plot"
  - "Funnel Plot"
  - "PRISMA 2020"
  - "GRADE system"
keywords:
  - "tổng quan hệ thống systematic review"
  - "phân tích gộp meta-analysis"
  - "biểu đồ rừng forest plot"
  - "tính không đồng nhất i2"
  - "biểu đồ phễu funnel plot"
  - "tiêu chuẩn prisma 2020"
  - "hệ thống bằng chứng grade"
icd10:
  - "Z01.89"
specialty: "Phương pháp luận NCKH & Y học chứng cứ"
kho: "Kho nghiên cứu khoa học & EBM"
tags:
  - "he-co-quan/tong-quat"
  - "loai/ebm"
  - "y-khoa/ebm"
updated: "2026-08-22"
---

# 📚 Bách Khoa EBM: Tổng Quan Hệ Thống (Systematic Review) & Phân Tích Gộp (Meta-Analysis)

> **Tóm tắt cốt lõi**: Trong Kim tự tháp Y học chứng cứ (EBM), **Tổng quan hệ thống (Systematic Review - SR)** và **Phân tích gộp (Meta-Analysis - MA)** của các thử nghiệm ngẫu nhiên đối chứng (RCT) đồng nhất giữ vị trí **Đỉnh tháp Bằng chứng Cấp độ 1a (Level 1a Evidence)**. Đây là công cụ phương pháp luận tối cao để tổng hợp dữ liệu định lượng, gia tăng sức mạnh thống kê ($Power$), triệt tiêu các sai số ngẫu nhiên của các nghiên cứu đơn lẻ cỡ mẫu nhỏ và làm cơ sở khoa học để xây dựng mọi Hướng dẫn Điều trị Lâm sàng (Clinical Practice Guidelines) trên toàn cầu.

---

## 🏛️ 1. PHÂN BIỆT PHƯƠNG PHÁP LUẬN: TỔNG QUAN TƯỜNG THUẬT VS HỆ THỐNG VS PHÂN TÍCH GỘP

| Đặc Điểm So Sánh | Tổng Quan Tường Thuật (Narrative Review) | Tổng Quan Hệ Thống (Systematic Review - SR) | Phân Tích Gộp (Meta-Analysis - MA) |
|:---|:---|:---|:---|
| **Câu hỏi nghiên cứu** | Rộng, bao quát toàn bộ chủ đề tổng quát. | **Hẹp, tập trung, chuẩn hóa theo mô hình PICO**. | Tương tự SR, tập trung vào kết cục định lượng cụ thể. |
| **Chiến lược tìm kiếm** | Không công khai, mang tính chủ quan của tác giả. | **Toàn diện, minh bạch, có thể lặp lại** (MeSH, Embase, Cochrane, Grey literature). | Sử dụng tập dữ liệu từ một Tổng quan hệ thống chuẩn mực. |
| **Chọn lọc nghiên cứu** | Có nguy cơ sai lệch lựa chọn (Selection bias) cao. | **Áp dụng tiêu chí thu nhận/loại trừ nghiêm ngặt** qua sàng lọc độc lập kép (2 tác giả). | Chỉ gộp các nghiên cứu có tính đồng nhất về mặt lâm sàng và phương pháp. |
| **Đánh giá chất lượng** | Thường không đánh giá nguy cơ sai lệch. | **Bắt buộc đánh giá Nguy cơ sai lệch (Risk of Bias: RoB 2, ROBINS-I)**. | Phân tích độ nhạy (Sensitivity analysis) dựa trên điểm chất lượng RoB. |
| **Tổng hợp kết quả** | Tổng hợp định tính bằng lời văn chủ quan. | Tổng hợp định tính có cấu trúc (Narrative synthesis). | **TỔNG HỢP TOÁN HỌC ĐỊNH LƯỢNG (Biểu đồ Forest Plot)** tạo ra một Ước lượng Hiệu quả Chung duy nhất. |

---

## 🌲 2. GIẢI MÃ CẤU TRÚC VÀ CÁCH ĐỌC BIỂU ĐỒ RỪNG (FOREST PLOT)

Biểu đồ Rừng (Forest Plot) là "trái tim" của mọi bài báo Phân tích gộp. Dưới đây là sơ đồ cấu trúc trực quan:

```
[MÔ MINH HỌA CẤU TRÚC BIỂU ĐỒ RỪNG FOREST PLOT]

Nghiên Cứu      Can Thiệp   Đối Chứng    Trọng Số   Risk Ratio [95% CI]           Biểu Đồ Đồ Họa [Risk Ratio & 95% CI]
(Study Name)    (Events/N)  (Events/N)   (Weight)                                Ưu thế Can Thiệp     Ưu thế Đối Chứng
────────────────────────────────────────────────────────────────────────────────────────┬─────────────────────────────
Smith 2020        15/150      30/150      18.5%     0.50 [0.28, 0.89]             ──■──     │
Jones 2021        40/200      60/200      32.0%     0.67 [0.47, 0.94]               ─■─     │
Taylor 2022       25/180      50/180      24.5%     0.50 [0.32, 0.77]              ──■──    │
Miller 2023       35/220      45/220      25.0%     0.78 [0.52, 1.16]                 ■─────┼─────
────────────────────────────────────────────────────────────────────────────────────────┴─────────────────────────────
TỔNG CỘNG (95% CI)115/750    185/750     100.0%     0.62 [0.51, 0.76]                  ◆    │
                                                                                 (HÌNH KIM CƯƠNG)
Kiểm định Hiệu quả Chung: Z = 4.52 (P < 0.00001)                                        │
Kiểm định Tính Không Đồng Nhất: Chi² = 2.85 (P = 0.41), I² = 0%                         0.1    0.5    1.0    2.0    10.0
                                                                                              [ĐƯỜNG VÔ HIỆU (x=1.0)]
```

### Các Thành Phần Cốt Lõi Trên Forest Plot:
1. **Đường Vô Hiệu (Line of Null Effect)**: Đường thẳng đứng tại giá trị **$1.0$ (cho RR, OR, HR)** hoặc tại **$0.0$ (cho Mean Difference - MD)**. Nếu khoảng tin cậy của một nghiên cứu cắt qua đường vô hiệu $\to$ Kết quả nghiên cứu đó **không có ý nghĩa thống kê ($p > 0.05$)**.
2. **Hình Vuông (Point Estimate)**: Điểm ước lượng hiệu quả của từng nghiên cứu riêng lẻ. **Kích thước của hình vuông tỷ lệ thuận với Trọng số (Weight)** của nghiên cứu đó trong mô hình (mẫu càng lớn, biến thiên càng nhỏ thì hình vuông càng to).
3. **Thanh Ngang (Horizontal Line)**: Đại diện cho **Khoảng tin cậy $95\%$ ($95\%\text{CI}$)** của nghiên cứu. Thanh càng ngắn thể hiện kết quả càng chính xác.
4. **HÌNH KIM CƯƠNG (DIAMOND - SUMMARY EFFECT)**: Đại diện cho **ƯỚC LƯỢNG HIỆU QUẢ GỘP CHUNG** của toàn bộ phân tích gộp:
   - **Tâm điểm thẳng đứng của kim cương**: Điểm ước lượng trung bình của hiệu quả gộp.
   - **Chiều rộng hai bên của kim cương**: Khoảng tin cậy $95\%\text{CI}$ của hiệu quả gộp.
   - **Quy tắc vàng**: Nếu **toàn bộ hình kim cương nằm lệch hẳn về một phía và KHÔNG CHẠM VÀO ĐƯỜNG VÔ HIỆU** $\to$ Can thiệp điều trị **CÓ HIỆU QUẢ CÓ Ý NGHĨA THỐNG KÊ TOÀN CỤC ($p < 0.05$)**.

---

## ⚖️ 3. ĐÁNH GIÁ TÍNH KHÔNG ĐỒNG NHẤT (HETEROGENEITY) & LỰA CHỌN MÔ HÌNH

```
                           [ĐÁNH GIÁ TÍNH KHÔNG ĐỒNG NHẤT THỐNG KÊ]
                                              │
         ┌────────────────────────────────────┴────────────────────────────────────┐
         ▼ (Chỉ số Higgins I² < 50% & Cochran's Q p > 0.10)                        ▼ (Chỉ số Higgins I² ≥ 50% & Cochran's Q p ≤ 0.10)
[TÍNH KHÔNG ĐỒNG NHẤT THẤP / CHẤP NHẬN ĐƯỢC]                              [TÍNH KHÔNG ĐỒNG NHẤT ĐÁNG KỂ / CAO]
• Giả định: Mọi nghiên cứu cùng ước lượng MỘT HIỆU QUẢ CAN THIỆP DUY NHẤT.  • Giả định: Có một PHỔ CÁC HIỆU QUẢ KHÁC NHAU giữa các quần thể.
• ÁP DỤNG: MÔ HÌNH HIỆU ỨNG CỐ ĐỊNH (FIXED-EFFECT MODEL).                 • ÁP DỤNG: MÔ HÌNH HIỆU ỨNG NGẪU NHIÊN (RANDOM-EFFECTS MODEL).
• Trọng số chủ yếu phụ thuộc vào phương sai nội tại của từng nghiên cứu.    • BẮT BUỘC TÌM NGUYÊN NHÂN: Phân tích phân nhóm (Subgroup analysis)
                                                                            hoặc Hồi quy gộp (Meta-regression) theo tuổi, liều, giai đoạn.
```

### Phân Loại Chỉ Số Higgins $I^2$:
$$I^2 = \frac{Q - df}{Q} \times 100\% \quad (df = k - 1)$$
- **$I^2 = 0 - 25\%$**: Tính không đồng nhất không đáng kể.
- **$I^2 = 25 - 50\%$**: Tính không đồng nhất mức độ nhẹ đến vừa.
- **$I^2 = 50 - 75\%$**: Tính không đồng nhất mức độ đáng kể.
- **$I^2 > 75\%$**: Tính không đồng nhất rất cao $\to$ **Cân nhắc không nên gộp kết quả** nếu có sự khác biệt quá lớn về mặt lâm sàng ("trộn táo với cam").

---

## 🪓 4. ĐÁNH GIÁ THIÊN VỊ XUẤT BẢN (PUBLICATION BIAS) QUA FUNNEL PLOT

```
[BIỂU ĐỒ PHỄU ĐỐI XỨNG - KHÔNG CÓ THIÊN VỊ XUẤT BẢN]      [BIỂU ĐỒ PHỄU BỊ KHUYẾT - CÓ THIÊN VỊ XUẤT BẢN (BIAS)]
             Precision (1/SE)                                           Precision (1/SE)
                   ▲                                                          ▲
                   │         /│\                                              │         /│\
   Nghiên cứu lớn  │        / ● \                               Nghiên cứu lớn│        / ● \
   (Sai số chuẩn nhỏ)      /  ●  \                                            │       /  ●  \
                   │      / ●   ● \                                           │      / ●   ● \
                   │     /  ●   ●  \                                          │     /  ●   ●  \
   Nghiên cứu nhỏ  │    / ●   ●   ● \                           Nghiên cứu nhỏ│    / ●   ●     \ ◄─── KHUYẾT CÁC
   (Sai số chuẩn lớn)  /●   ●   ●   ●\                                        │   /●   ●        \      NGHIÊN CỨU NHỎ
                   └──┴───────────────┴──► Effect Size                        └──┴───────────────┴──► KẾT QUẢ ÂM TÍNH
```

- **Nguyên nhân thiên vị xuất bản**: Các nghiên cứu cỡ mẫu nhỏ có kết quả âm tính (không có ý nghĩa thống kê) thường bị cất vào ngăn kéo (File-drawer problem) và không được gửi đăng báo $\to$ Khiến phân tích gộp **thổi phồng hiệu quả thực sự của thuốc**.
- **Công cụ kiểm định thống kê**: **Kiểm định hồi quy Egger (Egger's linear regression test)** và **Kiểm định Begg (Rank correlation)** ($p < 0.05$ khẳng định có thiên vị xuất bản).
- **Kỹ thuật Cắt và Điền (Trim and Fill)**: Bổ sung giả lập các nghiên cứu bị khuyết để ước tính lại hiệu quả điều trị thực tế sau khi đã hiệu chỉnh thiên vị.

---

## 🏆 5. HỆ THỐNG ĐÁNH GIÁ ĐỘ CHẮC CHẮN CỦA BẰNG CHỨNG (GRADE FRAMEWORK)

Hệ thống **GRADE (Grading of Recommendations Assessment, Development, and Evaluation)** phân loại chất lượng bằng chứng thành 4 mức: **Rất cao (High)**, **Trung bình (Moderate)**, **Thấp (Low)**, **Rất thấp (Very Low)**.

```
[BẰNG CHỨNG KHỞI ĐIỂM TỪ CÁC THỬ NGHIỆM RCT: CHẤT LƯỢNG CAO (HIGH)]
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
[5 YẾU TỐ LÀM HẠ MỨC BẰNG CHỨNG (DOWNGRADE -1 HOẶC -2)] [3 YẾU TỐ NÂNG MỨC BẰNG CHỨNG TRONG NGHIÊN CỨU QUAN SÁT]
1. Nguy cơ sai lệch (Risk of Bias trong RoB 2).          1. Cỡ ảnh hưởng rất lớn (Large Effect: RR > 2 hoặc > 5).
2. Tính không nhất quán (Inconsistency: I² cao).        2. Mối quan hệ liều - đáp ứng (Dose-response gradient).
3. Bằng chứng gián tiếp (Indirectness: Dân số/can thiệp).3. Các yếu tố gây nhiễu còn lại làm giảm hiệu quả thực.
4. Độ không chính xác (Imprecision: Cỡ mẫu nhỏ, CI rộng).
5. Thiên vị xuất bản (Publication Bias rõ).
```

---

## 🧠 6. BỘ FLASHCARDS LÂM SÀNG CỐT LÕI (SPACED REPETITION)

1. **Câu hỏi**: Trên Biểu đồ Rừng (Forest Plot) của một phân tích gộp đánh giá hiệu quả thuốc giảm tử vong (Risk Ratio), hình kim cương (Diamond) có ý nghĩa gì và khi nào thì hiệu quả gộp chung được xem là có ý nghĩa thống kê?
   - **Đáp án**: Hình kim cương đại diện cho **Ước lượng Hiệu quả Gộp Chung (Summary Effect)** và khoảng tin cậy $95\%\text{CI}$ của toàn bộ các nghiên cứu. Hiệu quả gộp có ý nghĩa thống kê khi **toàn bộ hình kim cương nằm lệch hẳn về phía bên trái (RR $< 1$) và hoàn toàn không chạm vào đường vô hiệu ($x = 1.0$)**.
2. **Câu hỏi**: Khi chỉ số không đồng nhất $I^2 \ge 50\%$ và kiểm định Cochran's $Q$ có $p \le 0.10$, nhà nghiên cứu nên lựa chọn Mô hình Hiệu ứng Cố định (Fixed-effect) hay Mô hình Hiệu ứng Ngẫu nhiên (Random-effects)?
   - **Đáp án**: Bắt buộc phải sử dụng **Mô hình Hiệu ứng Ngẫu nhiên (Random-effects Model)** vì mô hình này thừa nhận sự tồn tại của một phổ các hiệu quả can thiệp khác nhau giữa các quần thể nghiên cứu và tính toán thêm phương sai giữa các nghiên cứu ($\tau^2$).
3. **Câu hỏi**: Hiện tượng bất đối xứng trên Biểu đồ Phễu (Asymmetry on Funnel Plot) thường phản ánh nguy cơ sai lệch phương pháp luận nào?
   - **Đáp án**: Phản ánh nguy cơ **Thiên vị xuất bản (Publication Bias)** do các nghiên cứu cỡ mẫu nhỏ có kết quả âm tính hoặc không có ý nghĩa thống kê bị từ chối xuất bản hoặc không được gửi đăng báo.

---

## 📚 7. TRÍCH DẪN TÀI LIỆU THAM KHẢO CHUẨN EBM

1. Page MJ, et al. The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. *BMJ*. 2021;372:n71.
2. Higgins JPT, et al. *Cochrane Handbook for Systematic Reviews of Interventions*. 2nd ed. John Wiley & Sons; 2019.
3. Guyatt GH, et al. GRADE: an emerging consensus on rating quality of evidence and strength of recommendations. *BMJ*. 2008;336(7650):924-926.
4. Egger M, et al. Bias in meta-analysis detected by a simple, graphical test. *BMJ*. 1997;315(7109):629-634.