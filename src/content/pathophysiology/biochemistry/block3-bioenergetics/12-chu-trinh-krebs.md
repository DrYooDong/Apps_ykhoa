# ENG-02: Phức Hợp Pyruvat Dehydrogenase & Chu Trình Acid Citric (Krebs)

> **Phân loại**: Năng lượng sinh học & Ti thể • **Khối**: BLOCK-3 (Năng Lượng Sinh Học & Chuỗi Hô Hấp Tế Bào)  
> **Tags**: #PyruvateDehydrogenase #ChuTrìnhKrebs #TCA #AcetylCoA #CitrateSynthase #Aconitase #IDH #Anaplerosis #Oncometabolites #HộiChứngLeigh

---

## 🎯 Mục Tiêu Học Tập & Tổng Quan Phân Tử
1. **Nhập khẩu Pyruvat vào Ti thể:** Tính thấm của màng ngoài (Porin) và màng trong; Cơ chế symport của *Pyruvate Translocase (MPC)* phụ thuộc lực đẩy proton.
2. **Cấu trúc & Coenzyme của Phức hợp Pyruvat Dehydrogenase (PDC):**
   - 3 tiểu đơn vị: E1 (Pyruvate decarboxylase - TPP), E2 (Lõi 60-mer - Lipoamide swinging arm 1.4 nm), E3 (Dihydrolipoyl dehydrogenase - FAD/E3BP).
   - 5 Coenzyme: TPP (B1), Lipoamide, CoA-SH (B5), FAD (B2), NAD⁺ (B3/PP).
   - Tính tỏa nhiệt không thuận nghịch ($\Delta G^{\circ\prime} \approx -31.4\text{ kJ/mol}$) ngăn chuyển ngược Acetyl-CoA thành Glucose ở động vật.
3. **Động học & Điều hòa PDC:**
   - 5 bước xúc tác liên kết qua cánh tay Lipoamide.
   - Điều hòa dị lập thể: Ức chế bởi Acetyl-CoA, NADH, ATP; Kích hoạt bởi AMP, ADP, NAD⁺, CoA-SH.
   - Điều hòa đồng hóa trị: PDK (Kinase bất hoạt E1) vs PDP (Phosphatase kích hoạt E1 qua Ca²⁺, Mg²⁺, Insulin).
4. **Chu trình Acid Citric (Krebs / TCA) & Cân bằng Năng lượng:**
   - 8 phản ứng enzyme chi tiết tại chất nền ti thể.
   - Cân bằng năng lượng: $3\text{ NADH } (7.5\text{ ATP}) + 1\text{ FADH}_2/QH_2 (1.5\text{ ATP}) + 1\text{ GTP } (1.0\text{ ATP}) = \mathbf{10\text{ ATP}}$ cho mỗi phân tử Acetyl-CoA ($20\text{ ATP}$ cho 1 phân tử Glucose).
5. **Mạng lưới Điều hòa & Bản chất Lưỡng hóa (Amphibolic):**
   - 3 điểm kiểm soát một chiều: Citrate Synthase, Isocitrate Dehydrogenase (IDH - kiểm soát chính bởi ADP, Ca²⁺), $\alpha$-Ketoglutarate Dehydrogenase.
   - Phản ứng tiêu hao (Cataplerotic) & Phản ứng bù đắp (Anaplerotic): *Pyruvate Carboxylase (PC)* phụ thuộc Biotin (B7) kích hoạt bắt buộc bởi Acetyl-CoA; AST; GDH; Thoái hóa amino acid mạch nhánh tạo Succinyl-CoA.
6. **Bệnh học Di truyền, Độc chất & Oncometabolites:**
   - Thiếu hụt Thiamine (B1) gây Beriberi, Wernicke-Korsakoff và toan lactic.
   - Thiếu hụt PDC di truyền gây Hội chứng Leigh (hoại tử đối xứng thân não/hạch nền).
   - Độc tính Thạch tín (Arsenite As³⁺) khóa nhóm -SH của Dihydrolipoamide E2; Điều trị bằng BAL.
   - Cơ chế Oncometabolites trong sinh ung thư: Đột biến SDH & FH tích tụ Succinate/Fumarate gây giả thiếu oxy (Pseudohypoxia / HIF-1$\alpha$); Đột biến điểm IDH1/2 tạo D-2-hydroxyglutarate (2-HG) gây siêu methyl hóa DNA (CIMP) trong u thần kinh đệm não (Glioma) và bạch cầu cấp (AML).

---

## 🔬 Phản Ứng, Phương Trình & Cơ Chế Then Chốt

1. **Phản Ứng Khử Carboxyl Oxy Hóa của PDC**:
   $$\text{Pyruvat} + \text{NAD}^+ + \text{CoA-SH} \xrightarrow{\text{PDC}} \text{Acetyl-CoA} + \text{CO}_2 + \text{NADH} + H^+$$
   *($\Delta G^{\circ\prime} = -31.4\text{ kJ/mol}$, không thuận nghịch sinh lý).*

2. **Phương Trình Tổng Quát Chu Trình Krebs**:
   $$\text{Acetyl-CoA} + 3\text{NAD}^+ + \text{FAD} + \text{GDP} + P_i + 2\text{H}_2\text{O} \rightarrow \text{CoA-SH} + 2\text{CO}_2 + 3\text{NADH} + \text{FADH}_2 + \text{GTP} + 2\text{H}^+$$

3. **8 Phản Ứng Enzyme Chi Tiết Của Chu Trình Krebs**:
   - **Pư 1**: $\text{Oxaloacetat} + \text{Acetyl-CoA} + \text{H}_2\text{O} \xrightarrow{\text{Citrat Synthase}} \text{Citrat} + \text{CoA-SH} + H^+$ ($\Delta G^{\circ\prime} = -32.2\text{ kJ/mol}$).
   - **Pư 2**: $\text{Citrat} \xrightleftharpoons{\text{Aconitase [4Fe-4S]}} \text{\textit{cis}-Aconitat} + \text{H}_2\text{O} \xrightleftharpoons{} \text{Isocitrat}$.
   - **Pư 3**: $\text{Isocitrat} + \text{NAD}^+ \xrightarrow{\text{IDH (Mn}^{2+}\text{/Mg}^{2+}\text{)}} \alpha\text{-Ketoglutarate} + \text{CO}_2 + \text{NADH} + H^+$.
   - **Pư 4**: $\alpha\text{-Ketoglutarate} + \text{NAD}^+ + \text{CoA-SH} \xrightarrow{\alpha\text{-KGDH}} \text{Succinyl-CoA} + \text{CO}_2 + \text{NADH} + H^+$.
   - **Pư 5**: $\text{Succinyl-CoA} + \text{GDP/ADP} + P_i \xrightleftharpoons{\text{Succinyl-CoA Synthetase}} \text{Succinat} + \text{CoA-SH} + \text{GTP/ATP}$.
   - **Pư 6**: $\text{Succinat} + \text{Q} \xrightarrow{\text{SDH (Complex II / FAD)}} \text{Fumarate} + \text{QH}_2$ (Bị ức chế cạnh tranh bởi Malonate).
   - **Pư 7**: $\text{Fumarate} + \text{H}_2\text{O} \xrightleftharpoons{\text{Fumarase}} \text{L-Malate}$ (Đặc hiệu lập thể tạo duy nhất L-Malate).
   - **Pư 8**: $\text{L-Malate} + \text{NAD}^+ \xrightleftharpoons{\text{MDH}} \text{Oxaloacetat} + \text{NADH} + H^+$ ($\Delta G^{\circ\prime} = +29.7\text{ kJ/mol}$).

4. **Phản Ứng Bù Đắp Anaplerosis Trung Tâm (Pyruvat Carboxylase)**:
   $$\text{Pyruvat} + \text{HCO}_3^- + \text{ATP} \xrightarrow[\text{Acetyl-CoA (kích hoạt bắt buộc)}]{\text{Pyruvat Carboxylase / Biotin}} \text{Oxaloacetat} + \text{ADP} + P_i$$

---

## 💡 Điểm Ngọc Lâm Sàng (Clinical Pearls)

- **Hội Chứng Leigh & Khiếm Khuyết PDC Di Truyền**: Đột biến gen *E1-$\alpha$* gây toan lactic tái diễn, suy sụp năng lượng và hoại tử đối xứng thân não/hạch nền. Điều trị bằng chế độ ăn sinh ceton (Ketogenic diet) và thuốc ức chế PDK là **Dichloroacetate (DCA)**.
- **Ứng Dụng DCA Trong Ung Thư & Hiệu Ứng Warburg**: Tế bào ung thư khóa PDC bằng cách tăng biểu hiện PDK. DCA ức chế PDK, ép tế bào ung thư khởi động lại hô hấp ti thể, giải phóng cytochrome c và kích hoạt apoptosis.
- **Oncometabolites & Đột Biến Sinh Ung Thư**:
  - *Đột biến SDH / FH:* Ứ đọng Succinate / Fumarate ức chế HIF Prolyl Hydroxylase (PHD), ổn định hóa HIF-1$\alpha$ gây giả thiếu oxy (Pseudohypoxia), kích hoạt tân tạo mạch VEGF sinh u tủy thượng thận (Pheochromocytoma) và u cơ trơn/ung thư thận (HLRCC).
  - *Đột biến IDH1 (R132) & IDH2 (R172):* Tạo Oncometabolite D-2-hydroxyglutarate (2-HG) ức chế TET DNA demethylase gây siêu methyl hóa DNA diện rộng (CIMP) trong u thần kinh đệm (Glioma) và bạch cầu cấp dòng tủy (AML).

---

## 🧪 Bilan Xét Nghiệm & Chỉ Số Tham Chiếu

| Chỉ Số Xét Nghiệm | Khoảng Tham Chiếu Sinh Lý | Ý Nghĩa Biến Động Lâm Sàng |
| :--- | :--- | :--- |
| **Lactate Máu Động Mạch** | $0.5 - 2.2\text{ mmol/L}$ | Tăng cao $> 4.0\text{ mmol/L}$ kèm toan chuyển hóa trong thiếu PDC, thiếu B1, hội chứng Leigh, ngộ độc chuỗi hô hấp. |
| **Pyruvate Máu** | $0.03 - 0.10\text{ mmol/L}$ | Tăng đồng thời trong tắc nghẽn chuyển hóa PDC. |
| **Tỷ Lệ Lactate / Pyruvate (L/P)** | $10:1 - 20:1$ | L/P bình thường nhưng cả hai cùng tăng: Gợi ý khiếm khuyết PDC; L/P tăng vọt $> 25 - 30$: Gợi ý khiếm khuyết Chuỗi hô hấp ti thể (ETC). |
| **Đột Biến IDH1 (R132) / IDH2 (R172)** | Âm tính (Wild-type) | Dấu ấn sinh học bắt buộc trong chẩn đoán u não Glioma và bạch cầu cấp AML. |

---

*Tài liệu tham khảo: Hóa Sinh Y Học ĐHYD 2024, Harper's Illustrated Biochemistry 32nd, Principles of Biochemistry 5th, Medical Biochemistry 5th.*
