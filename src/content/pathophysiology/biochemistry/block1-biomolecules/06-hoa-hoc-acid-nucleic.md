# CHEM-06: Hóa học Nucleotid & Acid Nucleic (DNA / RNA)

> **Phân loại**: Cốt lõi | **Khối**: BLOCK-1 (Cấu Trúc Đại Phân Tử Sinh Học)  
> **Tags**: #Nucleotid #DNA #RNA #WatsonCrick #Chromatin #Nucleosome #PCR #qPCR #Tm #Sanger

---

## 🎯 Mục Tiêu Học Tập & Tổng Quan

1. Trình bày cấu tạo hóa học của 3 thành phần cơ bản: Acid Phosphoric, Pentose (Ribose vs Deoxyribose), Base Nitơ (Purin vs Pyrimidin).
2. Phân tích ý nghĩa sinh học của nhóm 2'-OH trong việc giải thích tính bền vững của DNA trước kiềm và tính dễ bị thủy phân của RNA.
3. Giải thích cấu hình Syn/Anti, liên kết 3',5'-Phosphodiester và cơ chế của các thuốc tương tự nucleotide trong hóa trị ung thư/kháng virus (5-FU, AZT, Ara-C, Allopurinol).
4. Mô tả chi tiết cấu trúc chuỗi xoắn kép B-DNA Watson-Crick, nguyên tắc bổ sung Chargaff và 4 lực ổn định xoắn kép (tương tác xếp chồng base-stacking).
5. Trình bày cấu trúc siêu phân tử của Chromatin: bát phân histone lõi, cấu trúc hạt nucleosome và 5 cấp độ đóng gói nén DNA 10.000 lần trong nhân.
6. Phân tích các loại RNA chính (mRNA 5'-cap 3'-poly(A), tRNA lá chẻ ba/chữ L, rRNA ribozyme peptidyl transferase) và các RNA điều hòa.
7. Giải thích động học biến tính nhiệt, điểm nóng chảy (Tm), hiệu ứng tăng sắc (Hyperchromicity) và ứng dụng kỹ thuật sinh học phân tử (PCR, Real-Time qPCR TaqMan, Sanger, NGS).

---

## 🔬 Phản Ứng & Cơ Chế Chìa Khóa

- **Nguyên tắc bổ sung Watson-Crick:**  
  `A = T (2 liên kết Hydro)` &bull; `G ≡ C (3 liên kết Hydro)` (Quy luật Chargaff: `A+G = C+T`)
- **Thủy phân RNA trong kiềm tạo nucleotide vòng:**  
  `RNA + OH⁻ ⟶ 2',3'-cyclic mononucleotide ⟶ 2'-NMP + 3'-NMP` (DNA không có 2'-OH nên trơ)
- **Chu kỳ nhiệt PCR 3 bước khuếch đại 2ⁿ bản sao:**  
  `Biến tính (94-96°C) ⟶ Bắt cặp mồi (55-65°C) ⟶ Kéo dài (72°C qua Taq Polymerase)`
- **Cơ chế ức chế phân bào của 5-FU:**  
  `5-Fluorouracil ⟶ 5-FdUMP (ức chế cạnh tranh Thymidylate Synthase) ⟶ Chặn tổng hợp dTMP`

---

## 💡 Điểm Ngọc Lâm Sàng (Clinical Pearls)

> [!IMPORTANT]
> **Điểm Nóng Chảy (Tm) & Tương Tác Xếp Chồng Base:**
> - DNA có tỷ lệ G-C càng cao thì Tm càng lớn (cứ giảm 1% G-C thì Tm giảm 0,4°C). Nguyên nhân chính không chỉ vì G-C có 3 liên kết hydro mà chủ yếu do **năng lượng xếp chồng base kỵ nước (stacking energy)** giữa các cặp G-C lớn hơn rất nhiều so với A-T.
> - Khi tăng nồng độ ion Na⁺ lên 10 lần, điện tích âm của phosphat được trung hòa làm Tm tăng vọt thêm 16,6°C.

> [!IMPORTANT]
> **Đầu Dò TaqMan & Độc Tính Hóa Trị 5-FU:**
> - Trong Real-Time PCR, đầu dò TaqMan phát huỳnh quang khi bị enzyme Taq DNA Polymerase cắt đứt nhờ hoạt tính **5'⟶3' exonuclease**, giải phóng Reporter khỏi Quencher (FRET).
> - Người bệnh mang đột biến gen **DPYD (Dihydropyrimidine Dehydrogenase)** bị giảm chuyển hóa 5-FU, tích lũy thuốc gây độc tính tử vong &rarr; bắt buộc tầm soát gen DPYD trước khi hóa trị.

---

## 🧪 Chỉ Số Xét Nghiệm & Thăm Dò Liên Quan

| STT | Xét nghiệm / Chỉ số | Phương pháp kỹ thuật | Ý nghĩa & Bệnh lý liên quan |
| :--- | :--- | :--- | :--- |
| 1 | **Tải lượng Virus (HBV, HCV, HIV)** | Real-Time RT-PCR / TaqMan | Định lượng chính xác nồng độ bản sao virus trong máu (IU/mL), theo dõi đáp ứng điều trị |
| 2 | **Kháng thể Anti-dsDNA** | Miễn dịch huỳnh quang / ELISA | Tiêu chuẩn vàng chẩn đoán và theo dõi đợt bùng phát Lupus ban đỏ hệ thống (SLE) |
| 3 | **Đột biến gen EGFR (Exon 19, L858R)** | PCR / Giải trình tự Sanger / NGS | Chỉ định thuốc điều trị đích ức chế Tyrosine Kinase (TKI: Osimertinib) trong ung thư phổi |
| 4 | **Sàng lọc trước sinh NIPT (cffDNA)** | Giải trình tự gen thế hệ mới (NGS) | Sàng lọc sớm các hội chứng lệch bội NST (Down T21, Edwards T18, Patau T13) từ tuần thai thứ 9 |
| 5 | **Định lượng Acid Uric máu** | Đo quang enzym Uricase | Đánh giá tăng dị hóa acid nucleic trong bệnh Gout và Hội chứng ly giải u (Tumor Lysis Syndrome) |

---
*Tài liệu tham khảo: Hóa Sinh Y Học ĐHYD TP.HCM 2024, Harper's Illustrated Biochemistry 32nd, Medical Biochemistry 5th (Baynes), Essential Biochemistry 5th (Pratt).*
