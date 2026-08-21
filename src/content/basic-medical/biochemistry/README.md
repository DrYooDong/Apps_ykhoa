# 🧪 KHO BÀI HỌC HÓA SINH Y HỌC (BIOCHEMISTRY REPOSITORY)

> **Phân hệ**: Hóa sinh Y học Phân tử — CliniPortal  
> **Cấu trúc**: 7 Khối Chuyên đề — 31 Chuyên đề Bài học Toàn diện  
> **Chuẩn nội dung**: Pure Markdown + Inline Equations + High-Yield Clinical Pearls + Bảng Biện Luận Cận Lâm Sàng

---

## 📁 1. Cấu Trúc Thư Mục Kho Hóa Sinh (7 Blocks - 31 Lessons)

```text
src/content/pathophysiology/biochemistry/
├── README.md                                # Hướng dẫn & Bản đồ kho bài học
│
├── block1-biomolecules/                     # KHỐI 1: Cấu Trúc Phân Tử Sinh Học (6 bài)
│   ├── 01-nuoc-ph-he-dem.md                 # CHEM-01: Hóa học Nước, pH & Hệ đệm
│   ├── 02-hoa-hoc-glucid.md                 # CHEM-02: Hóa học Glucid & Đồng phân lập thể
│   ├── 03-hoa-hoc-lipid.md                  # CHEM-03: Hóa học Lipid & Màng sinh học
│   ├── 04-hoa-hoc-protid.md                 # CHEM-04: Acid amin, Liên kết Peptid & Cấu trúc Protein
│   ├── 05-hoa-hoc-hemoglobin.md             # CHEM-05: Hóa học Hemoglobin & Vận chuyển khí
│   └── 06-hoa-hoc-acid-nucleic.md           # CHEM-06: Nucleotid, DNA & Các dạng RNA
│
├── block2-catalysis-signaling/              # KHỐI 2: Xúc Tác, Màng & Truyền Tín Hiệu (4 bài)
│   ├── 07-vitamin-coenzym.md                # CAT-01: Vitamin tan trong nước/dầu & Coenzym
│   ├── 08-enzym-dong-hoc.md                 # CAT-02: Động học Enzym (Michaelis-Menten & Ức chế)
│   ├── 09-mang-te-bao-van-chuyen.md         # CAT-03: Vận chuyển qua màng & Kênh ion
│   └── 10-hormon-truyen-tin.md              # CAT-04: Hormon & Các con đường truyền tin thứ hai
│
├── block3-bioenergetics/                    # KHỐI 3: Năng Lượng Sinh Học & Chu Trình Krebs (3 bài)
│   ├── 11-nang-luong-sinh-hoc.md            # ENG-01: Năng lượng tự do Gibbs (ΔG) & Liên kết cao năng
│   ├── 12-chu-trinh-krebs.md                # ENG-02: Chu trình Acid Citric & Điều hòa năng lượng
│   └── 13-chuoi-ho-hap-etc.md               # ENG-03: Chuỗi truyền điện tử & Phosphoryl hóa oxy hóa
│
├── block4-intermediary-metabolism/          # KHỐI 4: Chuyển Hóa 4 Đại Phân Tử (5 bài)
│   ├── 14-chuyen-hoa-glucid.md              # MET-01: Đường phân, Tân tạo đường & Glycogen
│   ├── 15-chuyen-hoa-lipid.md               # MET-02: β-oxy hóa acid béo, Thể ceton & Lipoprotein
│   ├── 16-chuyen-hoa-protid.md              # MET-03: Khử amin, Chu trình Ure & Chuyển hóa acid amin
│   ├── 17-chuyen-hoa-hemoglobin-bilirubin.md# MET-04: Tổng hợp/Thoái hóa Heme & Biện luận vàng da
│   └── 18-chuyen-hoa-nucleotid-gout.md      # MET-05: Chuyển hóa Purin, Pyrimidin & Sinh lý bệnh Gout
│
├── block5-molecular-genetics/               # KHỐI 5: Di Truyền Phân Tử & Kỹ Thuật Gen (4 bài)
│   ├── 19-tai-ban-sua-sai-dna.md            # GEN-01: Tái bản & Cơ chế sửa sai DNA
│   ├── 20-phien-ma-bieu-hien-gen.md         # GEN-02: Phiên mã RNA & Điều hòa biểu hiện gen
│   ├── 21-dich-ma-dot-bien-gen.md           # GEN-03: Mã di truyền, Dịch mã & Đột biến gen
│   └── 22-ky-thuat-pcr-ngs.md               # GEN-04: Kỹ thuật PCR, Real-time PCR & Giải trình tự NGS
│
├── block6-organ-metabolism/                 # KHỐI 6: Hóa Sinh Cơ Quan & Tích Hợp (3 bài)
│   ├── 23-tich-hop-dieu-hoa-chuyen-hoa.md   # ORG-01: Tích hợp chuyển hóa chu kỳ Đói - No & ĐTĐ
│   ├── 24-hoa-sinh-mau-dong-mau.md          # ORG-02: Hóa sinh Máu, Protein huyết tương & Đông máu
│   └── 25-hoa-sinh-gan-co-ecm.md            # ORG-03: Chức năng hóa sinh Gan, Co cơ & Khung ngoại bào
│
└── block7-clinical-biochemistry/            # KHỐI 7: Hóa Sinh Lâm Sàng & Xét Nghiệm (6 bài)
    ├── 26-bien-luan-chuc-nang-gan.md        # CLI-01: Biện luận Bilan men gan, Bilirubin & Xơ hóa
    ├── 27-bien-luan-chuc-nang-than.md       # CLI-02: Đánh giá eGFR, Creatinine, Cystatin C & Protein niệu
    ├── 28-dau-an-tim-mach-troponin-bnp.md   # CLI-03: hs-Troponin, NT-proBNP & Dấu ấn hoại tử cơ tim
    ├── 29-dien-giai-toan-kiem-abg.md        # CLI-04: Phân tích Khí máu động mạch & Toan kiềm đa biến
    ├── 30-tham-do-noi-tiet-tsh-cortisol.md  # CLI-05: Thăm dò Trục Tuyến giáp, Tuyến thượng thận & Tuyến yên
    └── 31-dau-an-ung-thu-dich-sinh-hoc.md   # CLI-06: Dấu ấn Ung thư (Tumor Markers) & Dịch sinh học
```

---

## 📝 2. Mẫu Khung Bài Viết Chuẩn (Biochemistry Article Standard)

Mỗi bài viết markdown trong kho tuân thủ cấu trúc 6 phần chặt chẽ:

```markdown
# [Mã Bài]: [Tên Chuyên Đề Bài Học]

> **Phân loại**: [Cốt lõi / Xúc tác / Năng lượng / Chuyển hóa / Di truyền / Lâm sàng] • **Khối**: [BLOCK-X]  
> **Tags**: #[Tag1] #[Tag2] #[Tag3]

---

## 🎯 Mục Tiêu Học Tập & Tổng Quan Phân Tử
[Tóm tắt bản chất phân tử, tầm quan trọng sinh học và mục tiêu cốt lõi của bài học]

---

## 🔬 Phản Ứng, Phương Trình & Cơ Chế Then Chốt
1. [Phương trình/Phản ứng 1]
2. [Cơ chế enzym / Động học xúc tác]
3. [Điểm điều hòa dị lập thể then chốt]

---

## 💡 Điểm Ngọc Lâm Sàng (Clinical Pearls)
- **Điểm ngọc 1**: [Giải thích ứng dụng lâm sàng sâu sắc]
- **Điểm ngọc 2**: [Cơ chế dược lý hoặc ngộ độc liên quan]
- **Điểm ngọc 3**: [Cạm bẫy chẩn đoán thường gặp]

---

## 🧪 Chỉ Số Xét Nghiệm & Biện Luận Cận Lâm Sàng
| Chỉ Số Xét Nghiệm | Khoảng Tham Chiếu Sinh Lý | Ý Nghĩa Tăng Máu | Ý Nghĩa Giảm Máu |
| :--- | :--- | :--- | :--- |
| **[Tên Chỉ Số 1]** | [Khoảng giá trị kèm đơn vị] | [Nguyên nhân & Bệnh lý] | [Nguyên nhân & Bệnh lý] |
| **[Tên Chỉ Số 2]** | [Khoảng giá trị kèm đơn vị] | [Nguyên nhân & Bệnh lý] | [Nguyên nhân & Bệnh lý] |

---

*Tài liệu tham khảo: Hóa Sinh Y Học ĐHYD 2024, Harper's Illustrated Biochemistry 32nd, Tietz Textbook of Clinical Chemistry 7th.*
```
