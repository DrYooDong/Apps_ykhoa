---
title: "Hóa Sinh: Phức Hợp Pyruvate Dehydrogenase & Chu Trình Acid Citric (Krebs)"
part: "P1"
aliases:
  - "12-chu-trinh-krebs"
  - "Citric Acid Cycle"
  - "TCA Cycle"
  - "Chu trình Krebs"
keywords:
  - "chu trình krebs"
  - "pyruvate dehydrogenase"
  - "acetyl-coa"
  - "oxaloacetate"
  - "thiamine pyrophosphate"
  - "wernicke korsakoff"
  - "beriberi"
specialty: "Chuyển hóa & Năng lượng"
kho: "1.2. Kho hóa sinh y học"
tags:
  - "he-co-quan/tong-quat"
  - "loai/biochemistry"
  - "y-khoa/hs"
icd10:
  - "E51 (Thiếu hụt Thiamine - Beriberi & Wernicke-Korsakoff)"
  - "E87.2 (Nhiễm toan Lactic)"
updated: "2026-08-22"
---

# ⚡ Bách Khoa Hóa Sinh: Phức Hợp Pyruvate Dehydrogenase (PDH) & Chu Trình Krebs (TCA Cycle)

> **Tóm tắt cốt lõi**: Chu trình Acid Citric (Krebs / TCA) là **ngã ba chuyển hóa trung tâm** của tế bào, nơi hội tụ thoái hóa Glucid, Lipid và Protid để tạo ra năng lượng ATP, đồng thời cung cấp tiền chất sinh tổng hợp (tính chất Lưỡng tính - Amphibolic). Phức hợp PDH nối đường phân với chu trình Krebs, đòi hỏi **5 coenzym có nguồn gốc Vitamin nhóm B ($B_1, B_2, B_3, B_5$, Lipoate)**.

---

## 🔬 1. PHỨC HỢP PYRUVATE DEHYDROGENASE (PDH COMPLEX)

Pyruvate tạo ra từ đường phân tại bào tương được vận chuyển vào chất nền ty thể và bị khử carboxyl oxy hóa thành Acetyl-CoA:

$$\text{Pyruvate} + \text{CoA-SH} + \text{NAD}^+ \xrightarrow{\text{PDH Complex}} \text{Acetyl-CoA} + \text{CO}_2 + \text{NADH} + \text{H}^+ \quad (\Delta G^{\circ\prime} = -33.4\text{ kJ/mol})$$

```
                                [CẤU TRÚC 3 ENZYM & 5 COENZYM CỦA PDH]
             Pyruvate ──► [E1: Pyruvate Dehydrogenase] (Coenzym: TPP - Vitamin B1) ──► Giải phóng CO2
                                    │
                                    ▼
             CoA-SH   ──► [E2: Dihydrolipoyl Transacetylase] (Coenzym: Lipoate & CoA - Vit B5) ──► ACETYL-CoA
                                    │
                                    ▼
             NAD+     ──► [E3: Dihydrolipoyl Dehydrogenase] (Coenzym: FAD - Vit B2 & NAD+ - Vit B3) ──► NADH + H+
```

### 1.1. Bảng 5 Coenzym Bắt Buộc của Phức Hợp PDH
| Coenzym | Tiền Chất Vitamin | Vị Trí Hoạt Động | Vai Trò Sinh Hóa | Bệnh Học Khi Thiếu Hụt |
|:---|:---|:---:|:---|:---|
| **TPP** | **Vitamin $B_1$ (Thiamine)** | Gắn trên $E_1$ | Khử carboxyl nhóm $\alpha$-keto của Pyruvate | **Bệnh Beriberi, Hội chứng Wernicke-Korsakoff** |
| **Lipoic Acid** | Tổng hợp nội sinh | Gắn trên $E_2$ | Cánh tay đòn vận chuyển gốc acyl & electron | **Bị bất hoạt bởi Thạch tín (Arsenic/Asen)** |
| **CoA-SH** | **Vitamin $B_5$ (Pantothenic Acid)** | Cơ chất cho $E_2$ | Tiếp nhận gốc Acetyl tạo thành Acetyl-CoA | Mệt mỏi, dị cảm đầu chi |
| **FAD** | **Vitamin $B_2$ (Riboflavin)** | Gắn trên $E_3$ | Nhận 2e- từ Lipoate bị khử | Viêm loét góc môi, viêm lưỡi |
| **$\text{NAD}^+$** | **Vitamin $B_3$ (Niacin / PP)** | Cơ chất cho $E_3$ | Tiếp nhận electron từ $FADH_2$ tạo thành NADH | **Bệnh Pellagra** (4D: Dermatitis, Diarrhea, Dementia, Death) |

---

## 🔄 2. TÁM PHẢN ỨNG CỐT LÕI CỦA CHU TRÌNH KREBS

Chu trình diễn ra hoàn toàn trong **Chất nền Ty thể (Mitochondrial Matrix)** (ngoại trừ Enzym Succinate Dehydrogenase nằm ở màng trong ty thể):

```
                        [Oxaloacetate (4C)] ◄──────────┐
                                │ + Acetyl-CoA (2C)    │ (8) Malate Dehydrogenase (Tạo NADH)
                                ▼ (1) Citrate Synthase │
                         [Citrate (6C)]                [L-Malate (4C)]
                                │                      ▲
                                ▼ (2) Aconitase        │ (7) Fumarase
                        [Isocitrate (6C)]              [Fumarate (4C)]
                                │                      ▲
                                ▼ (3) Isocitrate DH    │ (6) Succinate DH (Tạo FADH2) - Phức hệ II ETC
                     [α-Ketoglutarate (5C)] + CO2 + NADH
                                │                      [Succinate (4C)]
                                ▼ (4) α-KG DH          ▲
                        [Succinyl-CoA (4C)] + CO2 + NADH
                                │
                                └──────────────────────┘ (5) Succinyl-CoA Synthetase (Tạo 1 GTP)
```

| STT | Phản Ứng Sinh Hóa | Enzym Xúc Tác | Năng Lượng / Coenzym Thu Được | Ý Nghĩa Điều Hòa & Ức Chế |
|:---:|:---|:---|:---:|:---|
| **1** | $\text{Oxaloacetate} + \text{Acetyl-CoA} \to \text{Citrate}$ | **Citrate Synthase** | Tiêu thụ $1\ H_2O$ | Bước khóa khởi động; bị ức chế bởi ATP, NADH, Citrate, Succinyl-CoA. |
| **2** | $\text{Citrate} \rightleftharpoons \text{Isocitrate}$ | **Aconitase** | Đồng phân hóa qua Cis-Aconitate | **Bị ức chế độc chất Fluorocitrate** (từ thuốc diệt chuột Fluoroacetate). |
| **3** | $\text{Isocitrate} \to \alpha\text{-Ketoglutarate} + \text{CO}_2$ | **Isocitrate Dehydrogenase** | **$1\ \text{NADH} + 1\ \text{H}^+$** | **Bước giới hạn tốc độ chính của chu trình**; Kích hoạt bởi ADP, $Ca^{2+}$; ức chế bởi ATP, NADH. |
| **4** | $\alpha\text{-KG} + \text{CoA} \to \text{Succinyl-CoA} + \text{CO}_2$ | **$\alpha$-Ketoglutarate DH** | **$1\ \text{NADH} + 1\ \text{H}^+$** | Cấu trúc giống hệt PDH (cần 5 coenzym $B_1, B_2, B_3, B_5$, Lipoate). Kích hoạt bởi $Ca^{2+}$. |
| **5** | $\text{Succinyl-CoA} \to \text{Succinate} + \text{CoA}$ | **Succinyl-CoA Synthetase** | **$1\ \text{GTP}$ ($= 1\text{ ATP}$)** | **Phosphoryl hóa ở mức cơ chất duy nhất** trong chu trình Krebs. |
| **6** | $\text{Succinate} \to \text{Fumarate}$ | **Succinate Dehydrogenase** | **$1\ \text{FADH}_2$** | **Chính là Phức hợp II (Complex II) của Chuỗi hô hấp tế bào ETC**. Bị ức chế cạnh tranh bởi Malonate. |
| **7** | $\text{Fumarate} + \text{H}_2\text{O} \to \text{L-Malate}$ | **Fumarase** | Tiêu thụ $1\ H_2O$ | Phản ứng cộng nước có tính lập thể chọn lọc cao. |
| **8** | $\text{L-Malate} \to \text{Oxaloacetate}$ | **Malate Dehydrogenase** | **$1\ \text{NADH} + 1\ \text{H}^+$** | Tái tạo Oxaloacetate để tiếp tục vòng quay mới. $\Delta G^{\circ\prime} > 0$ nhưng phản ứng bị kéo về phía trước nhờ Oxaloacetate liên tục bị tiêu thụ ở bước 1. |

---

## ⚡ 3. TỔNG KẾT NĂNG LƯỢNG ATP THU ĐƯỢC TỪ 1 PHÂN TỬ GLUCOSE

$$\text{Mỗi vòng quay Krebs} = 3\text{ NADH } (\times 2.5) + 1\text{ FADH}_2\ (\times 1.5) + 1\text{ GTP} = \mathbf{10\text{ ATP}}$$

- Từ **1 phân tử Glucose** $\to 2$ Pyruvate $\to 2$ Acetyl-CoA:
  - **Đường phân (Glycolysis)**: $2\text{ ATP} + 2\text{ NADH}$ ($= 5$ hoặc $7\text{ ATP}$ tùy con Malate-Aspartate hay Glycerol-3-P shuttle).
  - **Khử carboxyl Pyruvate (2 PDH)**: $2\text{ NADH} = 5\text{ ATP}$.
  - **2 vòng Chu trình Krebs**: $2 \times 10 = 20\text{ ATP}$.
  - 👉 **Tổng năng lượng oxy hóa hoàn toàn 1 mol Glucose**: **$30\text{ đến }32\text{ mol ATP}$**.

---

## 🩺 4. Ý NGHĨA Y KHOA & BỆNH HỌC LÂM SÀNG

### 4.1. Thiếu Hụt Thiamine (Vitamin $B_1$) & Toan Lactic Nặng
- Thiamine là tiền chất của TPP, coenzym bắt buộc của **Pyruvate Dehydrogenase** và **$\alpha$-Ketoglutarate Dehydrogenase**.
- **Cơ chế**: Thiếu $B_1 \to$ PDH tê liệt $\to$ Pyruvate không thể vào chu trình Krebs $\to$ Dồn ứ và chuyển hướng thành **Lactate** (qua Lactate Dehydrogenase) $\to$ **Nhiễm toan Lactic (Lactic Acidosis)** và suy giảm năng lượng ATP tế bào não/tim.
- **Biểu hiện lâm sàng**:
  - **Bệnh Beriberi**: Thể ướt (Suy tim sung huyết cung lượng cao, phù ngoại biên) & Thể khô (Viêm đa dây thần kinh, teo cơ đối xứng).
  - **Hội chứng Wernicke-Korsakoff**: Thường gặp ở người nghiện rượu mạn tính (Bộ ba: Tam chứng Lú lẫn cấp + Mất điều hòa vận động + Rung giật nhãn cầu/liệt cơ vận nhãn; tiến triển thành mất trí nhớ quên thuận chiều và bịa chuyện).

> [!CAUTION]
> **Quy tắc cấp cứu ở bệnh nhân nghiện rượu / Hôn mê hạ đường huyết**: **LUÔN TIÊM THIAMINE (VITAMIN $B_1$) TRƯỚC KHI TRUYỀN DỊCH ĐƯỜNG GLUCOSE**. Nếu truyền Glucose trước, dòng thác chuyển hóa Glucose sẽ tiêu thụ cạn kiệt lượng Thiamine dự trữ ít ỏi còn lại $\to$ Khởi phát **Hôn mê não Wernicke cấp tính không hồi phục**!

### 4.2. Ngộ Độc Thạch Tín (Arsenic Poisoning)
- Asen gắn cộng hóa trị vào các nhóm thiol ($-SH$) của **Lipoic Acid**, làm bất hoạt hoàn toàn Enzym $E_2$ của PDH và $\alpha$-KGDH.
- Hơi thở có mùi tỏi, đau bụng dữ dội, nôn ói, đi tiêu phân nước như nước vo gạo, kéo dài khoảng QT gây xoắn đỉnh.

---

## 🧠 5. BỘ FLASHCARDS LÂM SÀNG CỐT LÕI (SPACED REPETITION)

1. **Câu hỏi**: Tại sao ở bệnh nhân nghiện rượu mạn tính nghi ngờ hạ đường huyết bắt buộc phải tiêm Vitamin B1 (Thiamine) trước khi truyền Glucose?
   - **Đáp án**: Truyền Glucose kích thích chuyển hóa tế bào tiêu thụ lượng lớn Thiamine. Nếu không bù B1 trước, phức hợp PDH bị tê liệt hoàn toàn, dồn ứ tạo acid Lactic gây toan chuyển hóa nặng và khởi phát cấp tính Hội chứng bệnh não Wernicke không hồi phục.
2. **Câu hỏi**: Enzym nào của Chu trình Krebs nằm trực tiếp trên màng trong ty thể và cũng chính là Phức hợp II (Complex II) của chuỗi hô hấp tế bào?
   - **Đáp án**: **Succinate Dehydrogenase** (xúc tác chuyển Succinate thành Fumarate, đồng thời chuyển giao $e^-$ cho FAD tạo thành $FADH_2$).
3. **Câu hỏi**: Phản ứng duy nhất nào trong chu trình Krebs tạo ra năng lượng ở mức độ phosphoryl hóa cơ chất (Substrate-level phosphorylation)?
   - **Đáp án**: Phản ứng chuyển **Succinyl-CoA $\to$ Succinate** do enzym **Succinyl-CoA Synthetase** xúc tác, tạo ra **$1\text{ GTP}$** (tương đương $1\text{ ATP}$).

---

## 📚 6. TRÍCH DẪN TÀI LIỆU THAM KHẢO CHUẨN EBM

1. Rodwell VW, et al. *Harper's Illustrated Biochemistry*. 32nd ed. McGraw-Hill; 2023.
2. Nelson DL, Cox MM. *Lehninger Principles of Biochemistry*. 8th ed. W.H. Freeman; 2021.
3. Lieberman M, Peet A. *Marks' Basic Medical Biochemistry: A Clinical Approach*. 6th ed. LWW; 2022.
4. Baynes JW, Dominiczak MH. *Medical Biochemistry*. 6th ed. Elsevier; 2023.
