# GEN-04: Kỹ Thuật Sinh Học Phân Tử (PCR, RT-qPCR, Lai Phân Tử & Giải Trình Tự NGS)

> **Phân loại**: Kỹ thuật phân tử • **Khối**: BLOCK-5 (Sinh Học Phân Tử & Di Truyền)  
> **Tags**: #PCR #RealTimePCR #RT_PCR #Ct_value #SouthernBlot #FISH #Sanger #NGS #NIPT #YhọcCáThểHóa

---

## 🎯 Mục Tiêu Học Tập & Tổng Quan Phân Tử
Nguyên lý 3 bước của phản ứng chuỗi Polymerase (Biến tính $95^\circ\text{C}$, Bắt cặp mồi $55-60^\circ\text{C}$, Kéo dài $72^\circ\text{C}$); Các thành phần phản ứng PCR (Taq DNA Polymerase chịu nhiệt, Cặp mồi xuôi/ngược, dNTPs, đệm $\text{Mg}^{2+}$); Kỹ thuật Reverse Transcription PCR (RT-PCR) và Real-time quantitative PCR (RT-qPCR) sử dụng chất nhuộm huỳnh quang SYBR Green và đầu dò TaqMan probe; Khái niệm giá trị chu kỳ ngưỡng ($C_t$ value); Các kỹ thuật lai phân tử (Southern Blot, Northern Blot, Western Blot, FISH); Nguyên lý giải trình tự chuỗi Sanger (Dideoxy Method) và Giải trình tự gen thế hệ mới (Next-Generation Sequencing - NGS); Ứng dụng trong chẩn đoán vi sinh, sàng lọc trước sinh không xâm lấn (NIPT), và Y học chính xác trong ung thư học.

---

## 🔬 Phản Ứng, Phương Trình & Cơ Chế Then Chốt

1. **Động Học Khuếch Đại Phân Tử Của Phản Ứng PCR**:
   - Sau $n$ chu kỳ nhiệt, số lượng bản sao DNA mục tiêu tăng theo cấp số nhân lý thuyết:
     $$N_n = N_0 \times (1 + E)^n \approx N_0 \times 2^n\quad (\text{với hiệu suất } E = 100\%)$$
   - Sau 30 chu kỳ, 1 phân tử DNA ban đầu được nhân bản thành $2^{30} \approx 1.07 \times 10^9$ bản sao (Hơn 1 tỷ bản sao).

2. **Nguyên Lý Giá Trị Chu Kỳ Ngưỡng ($C_t$ / $C_q$ Value) Trong Real-Time PCR**:
   - $C_t$ (Cycle Threshold): Chu kỳ nhiệt mà tại đó tín hiệu huỳnh quang phát ra vượt qua ngưỡng phát hiện nền (Baseline).
   - **$C_t$ tỷ lệ nghịch với logarit nồng độ acid nucleic ban đầu**:
     - $C_t$ càng thấp $\rightarrow$ Lượng virus/vi khuẩn ban đầu càng cao (Tải lượng virus cao).
     - Cứ chênh lệch $3.3$ chu kỳ $C_t$ tương ứng với độ chênh lệch nồng độ gấp **$10$ lần ($1\log_{10}$)**.

3. **Bảng Tóm Tắt Các Kỹ Thuật Phân Tử Kinh Điển (Mẹo nhớ SNOW DROP)**:
   | Kỹ thuật | Phân tử đích khảo sát | Đầu dò / Phương pháp nhận diện | Ứng dụng lâm sàng |
   | :--- | :--- | :--- | :--- |
   | **S**outhern Blot | **D**NA | Đoạn mồi DNA/RNA đánh dấu phóng xạ | Mất đoạn lớn, chẩn đoán bệnh di truyền |
   | **N**orthern Blot | **R**NA | Đoạn mồi đơn RNA/DNA huỳnh quang | Đánh giá mức độ biểu hiện gen (mRNA) |
   | **O** (Không có) | **O** (Không có) | - | - |
   | **W**estern Blot | **P**rotein | Kháng thể đặc hiệu (Kháng thể sơ cấp + thứ cấp gắn enzym/HRP) | Khẳng định chẩn đoán nhiễm HIV, tự kháng thể |

---

## 💡 Điểm Ngọc Lâm Sàng (Clinical Pearls)

- **Giải Trình Tự Gen Thế Hệ Mới (NGS) Trong Điều Trị Đích Ung Thư Phổi**:
  - Xét nghiệm NGS trên mẫu sinh thiết mô hoặc sinh thiết lỏng (ctDNA trong máu) giúp khảo sát đồng thời hàng trăm đột biến gen chỉ trong 1 lần chạy: Đột biến nhạy thuốc $EGFR$ (Exon 19 del, L858R $\rightarrow$ Dùng Osimertinib), Đảo đoạn $ALK$ / $ROS1$ (Dùng Alectinib, Crizotinib), Đột biến $KRAS\text{ G12C}$ (Dùng Sotorasib), và Đột biến $BRAF\text{ V600E}$.
- **Sàng Lọc Trước Sinh Không Xâm Lấn (NIPT - Non-Invasive Prenatal Testing)**: Phân tích cffDNA (Cell-free fetal DNA phóng thích từ tế bào lá nuôi nhau thai vào máu mẹ từ tuần thứ 9-10 thai kỳ) bằng công nghệ NGS để sàng lọc lệch bội các nhiễm sắc thể: Hội chứng Down (Trisomy 21), Edwards (Trisomy 18), Patau (Trisomy 13) với độ nhạy $> 99\%$.
- **Tải Lượng Virus (Viral Load) Trong Theo Dõi Điều Trị Viêm Gan B, C & HIV**:
  - Đo tải lượng HBV-DNA, HCV-RNA và HIV-1 RNA bằng Real-time RT-PCR định lượng.
  - Ngưỡng phát hiện nhạy ($< 10 - 20\text{ IU/mL}$). Đạt đáp ứng virus duy trì (SVR) trong Viêm gan C hoặc nồng độ dưới ngưỡng phát hiện trong HIV ($U = U$: Không phát hiện = Không lây truyền qua đường tình dục).

---

## 🧪 Chỉ Số Xét Nghiệm & Biện Luận Cận Lâm Sàng

| Chỉ Số Xét Nghiệm | Đơn Vị Đo Lường | Ngưỡng & Ý Nghĩa Biện Luận Lâm Sàng |
| :--- | :--- | :--- |
| **Định Lượng HBV-DNA Máu** | $\text{IU/mL}$ (hoặc copies/mL) | $\ge 2000\text{ IU/mL}$ ($\ge 10^4\text{ copies/mL}$): Tiêu chuẩn xem xét chỉ định thuốc kháng virus (Tenofovir/Entecavir) |
| **Định Lượng HCV-RNA Máu** | $\text{IU/mL}$ | Khẳng định nhiễm virus Viêm gan C đang hoạt động; Đạt SVR12 (Âm tính sau 12 tuần ngừng thuốc DAA) $\rightarrow$ Khỏi bệnh |
| **Định Lượng Tải Lượng HIV-1 RNA** | $\text{copies/mL}$ | Đánh giá hiệu quả phác đồ ARV; Mục tiêu điều trị là đạt $< 50\text{ copies/mL}$ (Dưới ngưỡng phát hiện) |
| **Real-time PCR Đa Mồi Căn Nguyên Nhiễm Khuẩn Hô Hấp / Thần Kinh** | Âm tính / Dương tính | Phát hiện nhanh 20+ tác nhân virus/vi khuẩn (Cúm A/B, RSV, SARS-CoV-2, Phế cầu, Não mô cầu) trong 2-4 giờ |
| **Kỹ Thuật FISH Tìm Khuếch Đại Gen HER2** | Tỷ lệ $HER2 / CEP17$ | Tỷ lệ $\ge 2.0$ (Khuếch đại gen $HER2$ dương tính): Chỉ định thuốc kháng thể đơn dòng Trastuzumab (Herceptin) trong ung thư vú/dạ dày |

---

*Tài liệu tham khảo: Hóa Sinh Y Học ĐHYD 2024, Harper's Illustrated Biochemistry 32nd, Molecular Biology of the Cell 7th (Alberts).*
