# 🧬 Sinh Lý & Sinh Lý Bệnh (Pathophysiology & Physiology Portal)

> **Phân hệ**: Sinh lý & Sinh lý bệnh (Pathophysiology) — CliniPortal  
> **Mục tiêu**: Cung cấp hệ thống bài học chuyên sâu về Hóa sinh y học phân tử, Sinh lý học các hệ cơ quan, Cơ chế bệnh sinh (CCBS) các bệnh lý nội-ngoại khoa thường gặp, và các bộ mô phỏng sinh lý tương tác trực quan.

---

## 🧭 1. Bản Đồ Tổng Quan Phân Hệ

```text
src/content/pathophysiology/
├── biochemistry/              # Kho Hóa sinh Y học (7 Khối - 31 Chuyên đề Phân tử)
│   ├── block1-biomolecules/   # Nền tảng Nước, pH, Glucid, Lipid, Protid, Hemoglobin, Nucleic Acid
│   ├── block2-catalysis/      # Vitamin/Coenzym, Động học Enzym, Màng tế bào, Hormon truyền tin
│   ├── block3-bioenergetics/  # Năng lượng sinh học, Chu trình Krebs, Chuỗi hô hấp tế bào ETC
│   ├── block4-metabolism/     # Chuyển hóa 4 đại phân tử & Acid uric / Gout
│   ├── block5-genetics/       # Tái bản DNA, Phiên mã, Dịch mã, Kỹ thuật PCR & NGS
│   ├── block6-organ/          # Tích hợp chuyển hóa đói/no, Đông máu, Hóa sinh Gan - Cơ - ECM
│   └── block7-clinical/       # Biện luận chức năng Gan, Thận, Tim mạch, Khí máu ABG, Dấu ấn Ung thư
│
├── physiology/                # Sinh lý học 9 Phân hệ Cơ quan
│   ├── part1 - Đại cương Tế bào & Điện sinh lý
│   ├── part2 - Hệ Thần kinh & Thần kinh - Cơ
│   ├── part3 - Hệ Máu & Miễn dịch
│   ├── part4 - Hệ Tuần hoàn & Tim mạch
│   ├── part5 - Hệ Hô hấp & Trao đổi khí
│   ├── part6 - Hệ Tiêu hóa & Chuyển hóa
│   ├── part7 - Hệ Thận - Tiết niệu & Toan kiềm
│   └── part9 - Hệ Nội tiết & Sinh sản
│
├── pathophysiology-cases/     # Kho 17+ Ca Sinh lý bệnh & Cơ chế bệnh sinh Lâm sàng (CCBS)
│   ├── slb-ccbs-acs.html      # Hội chứng Vành cấp (ACS)
│   ├── slb-ccbs-soc.html      # Sinh lý bệnh Sốc (Shock)
│   ├── slb-ccbs-aki.html      # Tổn thương Thận cấp (AKI)
│   ├── slb-ccbs-ckd.html      # Bệnh Thận mạn (CKD)
│   ├── slb-ccbs-st.html       # Suy tim (Heart Failure)
│   ├── slb-ccbs-copd.html     # Bệnh Phổi tắc nghẽn mạn tính (COPD)
│   ├── slb-ccbs-henpq.html    # Hen phế quản (Asthma)
│   ├── slb-ccbs-dtd.html      # Đái tháo đường (Diabetes Mellitus)
│   ├── slb-ccbs-xg.html       # Xơ gan & Tăng áp lực tĩnh mạch cửa (Cirrhosis)
│   └── slb-ccbs-vtc.html      # Viêm tụy cấp (Acute Pancreatitis)
│
└── simulators/                # Các Bộ Mô Phỏng Sinh Lý Tương Tác (Interactive Simulators)
    ├── Nernst & Goldman Equation Simulator (Tính điện thế màng nghỉ & điện thế hoạt động)
    ├── Wiggers Diagram Cardiac Cycle Simulator (Đồ thị chu chuyển tim đồng bộ)
    ├── Acid-Base ABG Solver & Stewart Approach Simulator (Phân tích toan kiềm đa biến)
    └── Starling Capillary Dynamics Simulator (Động học vi tuần hoàn & hình thành phù)
```

---

## 🧪 2. Kho Hóa Sinh Y Học Phân Tử (Biochemistry Repository)

Kho bài giảng gồm **31 chuyên đề** được tổ chức theo 7 khối module logic:

| Khối Chuyên Đề | Mã Bài | Tên Bài Học & Trọng Tâm Kiến Thức |
|---|---|---|
| **BLOCK 1: Phân Tử Sinh Học** | `CHEM-01 → 06` | Nước & pH, Hóa học Glucid, Hóa học Lipid, Hóa học Protid, Hemoglobin, Acid Nucleic |
| **BLOCK 2: Xúc Tác & Tín Hiệu** | `CAT-01 → 04` | Vitamin & Coenzym, Động học Enzym (Michaelis-Menten, Lineweaver-Burk), Màng tế bào & Vận chuyển, Hormon & Truyền tin thứ hai (cAMP, IP3/DAG, RTK) |
| **BLOCK 3: Năng Lượng Sinh Học** | `ENG-01 → 03` | Năng lượng tự do Gibbs ($\Delta G$), Chu trình Axit Citric (Krebs), Chuỗi truyền điện tử & Phosphoryl hóa oxy hóa (Phức hệ I - V, Chất ức chế & Mất ghép) |
| **BLOCK 4: Chuyển Hóa Trung Gian**| `MET-01 → 05` | Đường phân / Tân tạo đường / Glycogen, $\beta$-oxy hóa acid béo / Thể Ceton, Chu trình Ure, Thoái hóa Hemoglobin & Vàng da, Chuyển hóa Purin & Bệnh Gout |
| **BLOCK 5: Di Truyền Phân Tử** | `GEN-01 → 04` | Tái bản & Sửa sai DNA, Phiên mã & Điều hòa gen, Dịch mã & Đột biến, Kỹ thuật Sinh học phân tử (PCR, Real-time PCR, NGS) |
| **BLOCK 6: Chuyển Hóa Cơ Quan** | `ORG-01 → 03` | Tích hợp chuyển hóa chu kỳ Đói - No, Hóa sinh Máu & Dòng thác Đông máu, Hóa sinh Gan, Co cơ & Chất nền ngoại bào (ECM) |
| **BLOCK 7: Hóa Sinh Lâm Sàng** | `CLI-01 → 06` | Biện luận chức năng Gan (AST/ALT, Bilirubin, ALP, GGT, Albumin), Chức năng Thận (eGFR, Cystatin C, Microalbumin niệu), Dấu ấn Tim mạch (hs-Troponin, NT-proBNP), Đọc Khí máu Động mạch (ABG), Thăm dò Nội tiết (TSH, FT4, Cortisol, ACTH), Dấu ấn Ung thư (CEA, AFP, CA 125, PSA) |

---

## 🫀 3. Cơ Chế Bệnh Sinh & Ca Lâm Sàng (Pathophysiology Cases - CCBS)

Mỗi ca bệnh sinh lý bệnh lâm sàng được thiết kế theo cấu trúc **5 bước trực quan**:
1. **Trigger & Căn nguyên khởi phát**: Tác nhân vi khuẩn, thiếu máu cục bộ, độc chất hoặc phản ứng tự miễn.
2. **Dòng thác biến đổi phân tử**: Thay đổi thụ thể, dòng ion, cytokine gây viêm ($TNF-\alpha, IL-1\beta, IL-6$).
3. **Rối loạn chức năng cơ quan**: Giảm cung lượng tim, tụt huyết áp, tổn thương hàng rào phế nang - mao mạch, hoại tử ống thận cấp.
4. **Đáp ứng bù trừ của cơ thể**: Kích hoạt hệ thần kinh giao cảm, hệ RAAS, tăng thông khí bù toan.
5. **Biểu hiện lâm sàng & Điểm ngọc chẩn đoán**: Đối chiếu triệu chứng thực thể với cơ chế sinh lý bệnh nền tảng.

---

## 🎮 4. Các Bộ Mô Phỏng Tương Tác (Interactive Simulators)

Người dùng có thể trực tiếp thay đổi các thông số sinh lý trên thanh trượt (Sliders) để quan sát diễn tiến thời gian thực:
- **Nernst & GHK Simulator**: Thay đổi nồng độ $[Na^+]_o, [K^+]_o, [Ca^{2+}]_o$ để xem sự thay đổi của điện thế màng nghỉ và biên độ khử cực.
- **ABG Diagnostic Solver**: Nhập $pH, PaCO_2, HCO_3^-, Na^+, Cl^-$ để tự động xác định toan kiềm đơn thuần, toan kiềm hỗn hợp, khoảng trống Anion Gap (AG) và khoảng trống Delta ($\Delta AG / \Delta HCO_3^-$).
