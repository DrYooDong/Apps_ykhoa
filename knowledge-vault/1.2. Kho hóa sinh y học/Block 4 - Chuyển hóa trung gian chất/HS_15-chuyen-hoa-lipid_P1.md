---
title: "Hóa Sinh: Chuyển Hóa Lipid, Sinh Tổng Hợp Thể Ceton & Rối Loạn Lipoprotein Máu"
part: "P1"
aliases:
  - "15-chuyen-hoa-lipid"
  - "Lipid Metabolism"
  - "Chuyển hóa Lipid"
  - "Rối loạn Lipoprotein máu"
keywords:
  - "chuyển hóa lipid"
  - "beta oxy hóa"
  - "thể ceton dka"
  - "carnitine shuttle"
  - "lipoprotein"
  - "statin hmg-coa"
  - "xơ vữa động mạch"
  - "pcsk9"
specialty: "Chuyển hóa & Nội tiết"
kho: "1.2. Kho hóa sinh y học"
tags:
  - "he-co-quan/tim-mach"
  - "loai/biochemistry"
  - "y-khoa/hs"
icd10:
  - "E78 (Rối loạn chuyển hóa lipoprotein và tình trạng tăng lipid máu)"
  - "E10.1 / E11.1 (Đái tháo đường kèm nhiễm toan Ceton - DKA)"
  - "I25 (Bệnh tim thiếu máu cục bộ xơ vữa)"
updated: "2026-08-22"
---

# 🧈 Bách Khoa Hóa Sinh: Chuyển Hóa Lipid, Thể Ceton & Động Học Lipoprotein Máu

> **Tóm tắt cốt lõi**: Chuyển hóa lipid cung cấp nguồn dự trữ năng lượng dồi dào nhất của cơ thể ($9\text{ kcal/g}$). Quá trình $\beta$-oxy hóa acid béo tại ty thể phụ thuộc vào **Con thoi Carnitine (CPT-I)**. Khi tỷ lệ Glucagon/Insulin tăng cao, gan chuyển hướng Acetyl-CoA dư thừa thành **Thể Ceton (Acetoacetate, $\beta$-Hydroxybutyrate)**. Hệ thống **5 lớp Lipoprotein** (ApoB vs ApoA-I) đóng vai trò then chốt trong bệnh sinh xơ vữa động mạch và là đích nhắm của các liệu pháp hạ lipid máu (Statins, PCSK9i, Ezetimibe).

---

## ⚡ 1. $\beta$-OXY HÓA ACID BÉO & HỆ CON THOI CARNITINE

Để thoái hóa sinh năng lượng, acid béo tự do (FFA) từ bào tương phải được hoạt hóa thành Acyl-CoA và vận chuyển qua màng trong ty thể:

```
[Bào Tương]                                           [Chất Nền Ty Thể]
Acid Béo ──► Acyl-CoA (qua Acyl-CoA Synthetase)
                 │
                 ▼ (Gắn Carnitine qua CPT-I / CAT-I - BỊ ỨC CHẾ BỞI MALONYL-CoA)
             Acyl-Carnitine ──► [Kênh CACT] ──► Acyl-Carnitine
                                                        │
                                                        ▼ (CPT-II / CAT-II: Nhả Carnitine)
                                                    Acyl-CoA
                                                        │
                                                        ▼ (Vòng xoắn Lynen 4 bước)
                                                 [β-OXY HÓA] ──► Acetyl-CoA + NADH + FADH2
```

### 1.1. Bốn Phản Ứng của Vòng Xoắn $\beta$-Oxy Hóa (Vòng Xoắn Lynen)
1. **Oxy hóa 1 (Tạo liên kết đôi trans)**: Xúc tác bởi **Acyl-CoA Dehydrogenase** $\to$ Tạo **$1\ \text{FADH}_2$** ($= 1.5\text{ ATP}$). (Đột biến men MCAD gây hạ đường huyết giảm ceton nguy hiểm ở trẻ em).
2. **Cộng nước**: Xúc tác bởi **Enoyl-CoA Hydratase** $\to$ Tạo L-$\beta$-Hydroxyacyl-CoA.
3. **Oxy hóa 2**: Xúc tác bởi **$\beta$-Hydroxyacyl-CoA Dehydrogenase** $\to$ Tạo **$1\ \text{NADH}$** ($= 2.5\text{ ATP}$).
4. **Phân cắt Thiolase**: Cắt bởi **$\beta$-Ketothiolase** giải phóng **$1\ \text{Acetyl-CoA}$** và một chuỗi Acyl-CoA ngắn hơn 2 Carbon.

> [!PEARL]
> **Năng lượng từ 1 phân tử Acid Palmitic (16C)**:
> - Trải qua 7 vòng $\beta$-oxy hóa $\to$ Tạo $8\text{ Acetyl-CoA} + 7\text{ FADH}_2 + 7\text{ NADH}$.
> - $8\text{ Acetyl-CoA} \times 10 = 80\text{ ATP}$.
> - $7\text{ FADH}_2 \times 1.5 = 10.5\text{ ATP}$; $7\text{ NADH} \times 2.5 = 17.5\text{ ATP}$.
> - Tổng tạo: $80 + 10.5 + 17.5 = 108\text{ ATP}$. Trừ $2\text{ ATP}$ hoạt hóa ban đầu $\implies \mathbf{106\text{ mol ATP}}$!

---

## 🧪 2. SINH TỔNG HỢP THỂ CETON (KETOGENESIS) & BỆNH SINH DKA

Diễn ra **DUY NHẤT TẠI TY THỂ TẾ BÀO GAN** khi lượng Acetyl-CoA vượt quá công suất tiêu thụ của chu trình Krebs:

```
2 Acetyl-CoA ──► Acetoacetyl-CoA ──► [HMG-CoA Synthase Ty Thể (Bước khóa)] ──► HMG-CoA
                                                                                  │
                                                                                  ▼ (HMG-CoA Lyase)
                                                                           ACETOACETATE
                                                                           ┌──────┴──────┐
                                                  (Khử tự phát) ◄──────────┘             └──────────► (β-Hydroxybutyrate DH)
                                                      ACETONE                                 β-HYDROXYBUTYRATE
                                            (Thải qua hơi thở mùi táo chín)                 (Dạng chiếm ưu thế trong máu)
```

### 2.2. Cơ Chế Nhiễm Toan Ceton Đái Tháo Đường (Diabetic Ketoacidosis - DKA)
1. **Thiếu hụt Insulin tuyệt đối + Tăng Hormone đối kháng (Glucagon, Cortisol, Catecholamine)**.
2. Kích hoạt men **Lipase nhạy cảm Hormone (HSL)** ở mô mỡ $\to$ Ly giải ồ ạt Triglyceride phóng thích lượng khổng lồ Acid béo tự do (FFA) vào máu.
3. Nồng độ Malonyl-CoA tụt giảm $\to$ Mất ức chế **CPT-I** $\to$ FFA ồ ạt tràn vào ty thể gan thực hiện $\beta$-oxy hóa cực mạnh tạo núi Acetyl-CoA.
4. Đồng thời, do tân tạo đường tăng tốc, **Oxaloacetate bị rút cạn** khỏi ty thể gan $\to$ Chu trình Krebs bị tắc nghẽn $\to$ Toàn bộ Acetyl-CoA bị chuyển hướng thành **Thể Ceton**.
5. Thể Ceton (Acetoacetate và $\beta$-Hydroxybutyrate) là các acid hữu cơ mạnh ($pK_a \approx 3.8$) $\to$ Phân ly giải phóng $H^+ \to$ **Toan chuyển hóa có khoảng trống Anion Gap tăng vọt (High AG Metabolic Acidosis)**.

---

## 🧬 3. ĐỘNG HỌC CÁC LỚP LIPOPROTEIN VÀ APOLIPOPROTEIN

Lipoprotein là các phức hợp hình cầu giúp vận chuyển Lipid kỵ nước (Triglyceride, Cholesterol ester) trong môi trường máu ái nước:

```
Tăng dần tỷ trọng & Hàm lượng Protein:
[Chylomicron] ──► [VLDL] ──► [IDL] ──► [LDL (Gây xơ vữa chính)] ──► [HDL (Vận chuyển ngược bảo vệ)]
(Chở mỡ ngoại sinh)   (Chở mỡ nội sinh từ gan)
```

### 3.1. Bảng Phân Loại Toàn Diện 5 Lớp Lipoprotein & Chức Năng Apolipoprotein

| Lớp Lipoprotein | Tỷ Lệ Lipid Chính | Apolipoprotein Đặc Trưng | Chức Năng Sinh Học Cốt Lõi | Nguy Cơ Xơ Vữa |
|:---|:---|:---|:---|:---:|
| **Chylomicron** | **Triglyceride ngoại sinh (85-90%)** | **ApoB-48**, ApoC-II, ApoE | Vận chuyển Lipid từ thức ăn ở ruột về mô mỡ và cơ qua ống ngực. | Thấp (nhưng gây viêm tụy cấp nếu TG $> 10\text{ mmol/L}$) |
| **VLDL** | **Triglyceride nội sinh (55-65%)** | **ApoB-100**, ApoC-II, ApoE | Gan tiết ra để vận chuyển Triglyceride nội sinh đến các mô ngoại biên. | Trung bình |
| **IDL** | TG & Cholesterol bằng nhau | ApoB-100, ApoE | Dạng trung gian thoái hóa từ VLDL, một phần về gan, một phần chuyển thành LDL. | Cao |
| **LDL** | **Cholesterol Ester (50%)** | **ApoB-100 (duy nhất)** | Vận chuyển Cholesterol từ gan đến các mô ngoại biên qua thụ thể **LDL Receptor (LDLR)**. | **CỰC KỲ CAO (Thủ phạm xơ vữa chính)** |
| **HDL** | **Protein (50%) + Phospholipid** | **ApoA-I**, ApoA-II, LCAT | **Vận chuyển Cholesterol ngược (Reverse Cholesterol Transport)** từ mô và mảng xơ vữa về gan. | **BẢO VỆ TIM MẠCH** |

### 3.2. Vai Trò Các Apolipoprotein Trọng Điểm
- **ApoB-100**: Phân tử nhận diện gắn vào thụ thể LDL-R trên màng tế bào gan. Mỗi hạt LDL chỉ chứa đúng 1 phân tử ApoB-100 $\to$ Định lượng ApoB phản ánh chính xác tổng số hạt sinh xơ vữa trong máu.
- **ApoC-II**: Đồng yếu tố hoạt hóa enzym **Lipoprotein Lipase (LPL)** ở nội mô mao mạch để thủy phân Triglyceride trong Chylomicron và VLDL giải phóng acid béo tự do cho mô.
- **ApoE**: Nhận diện thụ thể gan để dọn dẹp Chylomicron remnant và IDL. (Alen ApoE $\epsilon4$ liên quan chặt chẽ đến nguy cơ cao mắc bệnh Alzheimer).
- **ApoA-I**: Hoạt hóa enzym **LCAT (Lecithin-Cholesterol Acyltransferase)** để este hóa Cholesterol tự do vào lõi HDL.

---

## 💔 4. CƠ CHẾ SINH BỆNH HỌC MẢNG XƠ VỮA ĐỘNG MẠCH (ATHEROGENESIS)

```
1. Tăng LDL-C thấm qua nội mô vào lớp dưới nội mô (Intima)
        │
        ▼
2. LDL bị Oxy hóa (Ox-LDL) dưới tác động của gốc tự do ROS
        │
        ▼
3. Nội mô tiết MCP-1 & VCAM-1 thu hút Bạch cầu đơn nhân (Monocyte) xuyên mạch
        │
        ▼
4. Monocyte biến thành Đại thực bào, dùng thụ thể Scavenger (SR-A/CD36) "ăn" vô tội vạ Ox-LDL
        │
        ▼
5. Đại thực bào ứ đọng lipid biến thành TẾ BÀO BỌT (FOAM CELLS) ──► Tạo vệt mỡ (Fatty Streak)
        │
        ▼
6. Tế bào cơ trơn tăng sinh, tiết Collagen tạo vỏ xơ (Fibrous Cap) bao bọc lõi hoại tử Lipid
```

---

## 💊 5. DƯỢC LÝ HÓA SINH: CÁC THUỐC ĐIỀU TRỊ RỐI LOẠN LIPID MÁU

| Nhóm Thuốc | Hoạt Chất Tiêu Biểu | Cơ Chế Tác Dụng Phân Tử | Mức Giảm LDL-C | Tác Dụng Phụ Cần Lưu Ý |
|:---|:---|:---|:---:|:---|
| **Statins** | Atorvastatin, Rosuvastatin | Ức chế cạnh tranh men **HMG-CoA Reductase** $\to \downarrow$ tổng hợp Cholesterol nội sinh ở gan $\to$ Gan phản ứng tăng biểu hiện thụ thể **LDL-Receptor** trên màng tế bào $\to$ Tăng bắt giữ và thanh thải LDL khỏi máu. | **$\downarrow$ 30 - 60%** | Tăng men gan (ALT/AST), Đau cơ/Viêm cơ (theo dõi CK), Tăng nhẹ đường huyết. |
| **Ezetimibe** | Ezetimibe 10mg | Ức chế protein vận chuyển **NPC1L1** ở diềm bàn chải ruột non $\to$ Giảm 54% hấp thu Cholesterol từ thức ăn và dịch mật. | **$\downarrow$ thêm 15 - 20%** | Rối loạn tiêu hóa nhẹ, dung nạp rất tốt. |
| **Kháng thể ức chế PCSK9** | Evolocumab, Alirocumab | Kháng thể đơn dòng gắn và trung hòa enzym **PCSK9** $\to$ Ngăn PCSK9 thoái giáng thụ thể LDL-R $\to$ Tái sử dụng liên tục LDL-R trên màng tế bào gan. | **$\downarrow$ 50 - 60%** (Kết hợp Statin giảm tới 85%) | Phản ứng tại chỗ tiêm dưới da, giá thành cao. |
| **Fibrates** | Fenofibrate, Gemfibrozil | Kích hoạt thụ thể nhân **PPAR-$\alpha$** $\to \uparrow$ tổng hợp LPL và $\uparrow \beta$-oxy hóa acid béo $\to$ Giảm mạnh Triglyceride máu. | $\downarrow$ TG 30-50%, $\uparrow$ HDL 10-20% | Nguy cơ tiêu cơ vân khi phối hợp với Gemfibrozil + Statin. |
| **Acid Bempedoic** | Bempedoic Acid | Ức chế enzym **ATP Citrate Lyase (ACL)** ở thượng nguồn HMG-CoA trong chu trình tổng hợp cholesterol tại gan. | **$\downarrow$ 15 - 25%** | Tăng acid uric máu (Gout), đứt gân gót (hiếm). |

---

## 🧠 6. BỘ FLASHCARDS LÂM SÀNG CỐT LÕI (SPACED REPETITION)

1. **Câu hỏi**: Vì sao thuốc Statin làm hạ rất mạnh nồng độ LDL-Cholesterol lưu hành trong máu mặc dù cơ chế trực tiếp chỉ là ức chế tổng hợp cholesterol nội sinh ở gan?
   - **Đáp án**: Khi Statin ức chế HMG-CoA Reductase làm giảm nồng độ cholesterol nội bào gan, tế bào gan kích hoạt yếu tố phiên mã SREBP-2 $\to$ Tăng biểu hiện ồ ạt thụ thể **LDL-Receptor (LDLR)** lên bề mặt màng tế bào $\to$ Hút sạch và thanh thải các hạt LDL từ máu vào gan.
2. **Câu hỏi**: Tại sao tế bào não không thể sử dụng Acid béo tự do để sinh năng lượng mà bắt buộc phải dùng Glucose hoặc Thể Ceton khi đói kéo dài?
   - **Đáp án**: Vì Acid béo tự do gắn với Albumin có kích thước phân tử lớn không thể vượt qua **Hàng rào máu não (Blood-Brain Barrier)**. Ngược lại, Thể Ceton (Acetoacetate, $\beta$-hydroxybutyrate) là các phân tử nhỏ tan trong nước, dễ dàng đi qua hàng rào máu não qua kênh vận chuyển Monocarboxylate (MCT) để chuyển thành Acetyl-CoA sinh ATP.
3. **Câu hỏi**: Đột biến mất chức năng hoặc thuốc ức chế protein PCSK9 mang lại lợi ích gì cho chuyển hóa mỡ máu?
   - **Đáp án**: Bình thường PCSK9 gắn vào thụ thể LDL-R và kéo thụ thể này vào Lysosome để tiêu hủy. Ức chế PCSK9 bảo vệ thụ thể LDL-R không bị phá hủy $\to$ Tăng số lượng LDL-R trên màng tế bào gan $\to$ Giảm sâu LDL-C máu tới 60%.

---

## 📚 7. TRÍCH DẪN TÀI LIỆU THAM KHẢO CHUẨN EBM

1. Rodwell VW, et al. *Harper's Illustrated Biochemistry*. 32nd ed. McGraw-Hill; 2023.
2. Mach F, et al. 2019 ESC/EAS Guidelines for the management of dyslipidaemias: lipid modification to reduce cardiovascular risk. *Eur Heart J*. 2020.
3. Grundy SM, et al. 2018 AHA/ACC Guideline on the Management of Blood Cholesterol. *Circulation*. 2019.
4. Baynes JW, Dominiczak MH. *Medical Biochemistry*. 6th ed. Elsevier; 2023.
