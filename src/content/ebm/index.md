# 🏛️ Y Học Chứng Cứ (Evidence-Based Medicine & Guidelines Hub)

> **Phân hệ**: Y học chứng cứ (EBM) — CliniPortal  
> **Mục tiêu**: Cung cấp nền tảng tra cứu, phân tích, đối chiếu hướng dẫn điều trị chuẩn mực (Guidelines) và thử nghiệm lâm sàng ngẫu nhiên có đối chứng (RCTs), tích hợp bộ công cụ thống kê y học và thẩm định y văn chất lượng cao.

---

## 🧭 1. Bản Đồ Phân Hệ Y Học Chứng Cứ

Phân hệ EBM của CliniPortal được cấu trúc thành 4 cấu phần chính:

```text
src/content/ebm/
├── guidelines/                 # Kho 60+ Guidelines quốc tế & Bộ Y Tế Việt Nam
│   ├── kho-guidelines/         # Các bài tóm tắt HTML chuyên sâu offline
│   ├── data/                   # Registry danh mục & Predatory Journal Blacklist
│   └── js/                     # Engine đối sánh, Forest Plot SVG, CDSS Matcher
├── medical-statistics/         # 12 Chuyên đề Thống kê Y học Lâm sàng thực chiến
│   ├── 1-12.html               # Các bài học lý thuyết & tương tác trực quan
│   └── quiz.html               # Bộ câu hỏi trắc nghiệm thẩm định EBM
├── guideline-radar/            # Radar so sánh đa chiều khuyến cáo điều trị
└── ebm-lab/                    # Phòng thí nghiệm EBM & Công cụ tính toán 2x2 Table
```

---

## 📚 2. Kho Hướng Dẫn Điều Trị & Thử Nghiệm Lâm Sàng (Guidelines & RCTs)

Kho dữ liệu tổng hợp hơn **60+ tài liệu hướng dẫn và thử nghiệm lâm sàng then chốt** được phân loại theo chuyên khoa và mức độ khuyến cáo:

### 2.1 Tim Mạch & Chuyển Hóa (Cardiology & Endocrinology)
- **2026 ADA Standards of Care in Diabetes**: Cập nhật toàn diện mục tiêu HbA1c, thuốc ức chế SGLT2i, đồng vận thụ thể GLP-1RA và bảo vệ thận/tim mạch.
- **2026 AHA/ACC CKM Syndrome**: Khái niệm và phác đồ quản lý Hội chứng Tim mạch - Thận - Chuyển hóa (Cardiovascular-Kidney-Metabolic Syndrome).
- **2025 AHA/ACC Hypertension Guidelines**: Ngưỡng chẩn đoán tăng huyết áp mới, phân tầng nguy cơ và chiến lược phối hợp thuốc sớm.
- **EMPA-REG OUTCOME, DAPA-HF, DELIVER**: Thử nghiệm bản lề khẳng định vai trò vượt trội của SGLT2i trong suy tim và bệnh thận mạn.

### 2.2 Hồi Sức Cấp Cứu & Chống Nhiễm Khuẩn (ICU & Infectious Diseases)
- **2026 Surviving Sepsis Campaign (SSC) & Sepsis-3**: Phác đồ xử trí cấp cứu Sốc nhiễm khuẩn (Hồi sức dịch tinh thể $30\text{ mL/kg}$, Norepinephrine sớm, mục tiêu MAP $\ge 65\text{ mmHg}$, Corticoid khi sốc kháng vận mạch).
- **2026 IDSA Antimicrobial Resistance (AMR)**: Hướng dẫn điều trị vi khuẩn Gram âm đa kháng thuốc (CRE, CRPA, CRAB) và MRSA.
- **2026 ICM Thở Nằm Sấp Trong ARDS**: Chỉ định thở nằm sấp $\ge 16\text{ h/ngày}$ cho bệnh nhân ARDS mức độ trung bình - nặng ($PaO_2/FiO_2 < 150\text{ mmHg}$).

### 2.3 Hô Hấp & Tiêu Hóa - Gan Mật (Pulmonology & Gastroenterology)
- **2026 GINA Global Strategy for Asthma**: Chiến lược kiểm soát hen bằng phác đồ kết hợp ICS-Formoterol làm thuốc cắt cơn và ngừa cơn ưu tiên.
- **2026 GOLD COPD Guidelines**: Phân nhóm ABE mới, hướng dẫn sử dụng LAMA + LABA và vai trò đếm bạch cầu ái toan (Eosinophil) trong chỉ định ICS.
- **2025 BSG Guidelines on IBD**: Hướng dẫn thực hành lâm sàng điều trị Viêm loét đại tràng (UC) và Bệnh Crohn.
- **2026 APASL / Bộ Y Tế Viêm Gan B**: Tiêu chuẩn chỉ định thuốc kháng virus (Entecavir, TDF, TAF) và theo dõi nguy cơ ung thư biểu mô tế bào gan (HCC).

---

## 📊 3. Thống Kê Y Học Lâm Sàng (Medical Statistics Suite)

Hệ thống cung cấp **12 chuyên đề thống kê y học thực chiến** phục vụ đọc và thẩm định y văn:

1. **[Ý Nghĩa Thống Kê vs Ý Nghĩa Lâm Sàng](./medical-statistics/1-ynghia-thongke-lamsang.html)**: P-value, Độ lớn hiệu quả (Effect Size), Giảm nguy cơ tuyệt đối (ARR), Giảm nguy cơ tương đối (RRR) và Số bệnh nhân cần điều trị (NNT).
2. **[Đánh Giá Công Cụ Chẩn Đoán](./medical-statistics/2-dg-congcu-chandoan.html)**: Độ nhạy (Se), Độ đặc hiệu (Sp), Giá trị dự đoán dương/âm (PPV/NPV), Tỷ số khả dĩ (LR+, LR-) và Đường cong ROC (AUC).
3. **[Thiết Kế Nghiên Cứu Khoa Học](./medical-statistics/3-thietke-nckh.html)**: RCT, Nghiên cứu đoàn hệ (Cohort), Bệnh - Chứng (Case-Control), Cắt ngang (Cross-Sectional).
4. **[Phân Tích RCT & Meta-Analysis](./medical-statistics/4-phantichnc-rct-meta-analysis.html)**: Đọc hiểu biểu đồ Forest Plot, Đánh giá tính không đồng nhất ($I^2$, Cochran Q), Funnel Plot và Sai lệch xuất bản.
5. **[Phân Tích Phương Sai (ANOVA)](./medical-statistics/5-anova-phan-tich-phuong-sai.html)**: One-way, Two-way ANOVA, Phép kiểm Post-hoc (Tukey, Bonferroni).
6. **[Hồi Quy Logistic Đa Biến](./medical-statistics/6-hoi-quy-logistic-da-thuc.html)**: Mô hình hóa biến nhị phân, Tỷ số số chênh hiệu chỉnh (aOR), Kiểm định Goodness-of-Fit (Hosmer-Lemeshow).
7. **[Thống Kê Bayes Lâm Sàng](./medical-statistics/7-hoi-quy-bayes.html)**: Xác suất tiền nghiệm (Pre-test probability), Định lý Bayes và Cập nhật xác suất hậu nghiệm (Post-test probability).
8. **[Phê Bình & Đánh Giá Nghiên Cứu](./medical-statistics/8-phan-bien-nghien-cuu.html)**: Thang điểm Cochrane RoB 2 (RCT), ROBINS-I (Nghiên cứu quan sát), và GRADE Profiler.
9. **[Phân Tích Sinh Tồn (Survival Analysis)](./medical-statistics/9-phan-tich-sinh-ton.html)**: Đường cong Kaplan-Meier, Phép kiểm Log-rank, Mô hình Hồi quy Cox Proportional Hazards (Hazard Ratio - HR).
10. **[Ghép Điểm Xu Hướng (Propensity Score Matching - PSM)](./medical-statistics/10-propensity-score-matching.html)**: Kiểm soát yếu tố gây nhiễu trong nghiên cứu quan sát hồi cứu.
11. **[Mô Hình Dự Đoán & Machine Learning](./medical-statistics/11-mo-hinh-du-doan-machine-learning.html)**: Phát triển và thẩm định mô hình tiên lượng lâm sàng (TRIPOD statement, C-index, Calibration plot).
12. **[Xử Lý Dữ Liệu Khuyết (Missing Data)](./medical-statistics/12-xu-ly-du-lieu-khuyet.html)**: Phân loại MCAR, MAR, MNAR và Kỹ thuật nội suy đa biến (Multiple Imputation by Chained Equations - MICE).

---

## 🔬 4. Bộ Công Cụ Thẩm Định Y Văn & Đảm Bảo Chất Lượng

- **OpenAlex Live Journal Quality Analyzer**: Tự động tra cứu chỉ số tác động của tạp chí (Impact Factor, CiteScore, H-index, Scimago Q1/Q2/Q3/Q4).
- **Journal Trust Scorer (0 - 100)**: Thuật toán đánh giá độ tin cậy dựa trên tính minh bạch bình duyệt, chỉ số trích dẫn và uy tín nhà xuất bản.
- **Predatory Journal Blacklist**: Tự động cảnh báo các tạp chí rởm/săn mồi dựa trên cơ sở dữ liệu mở rộng của Beall's List.
- **Interactive 2x2 EBM Matrix Calculator**: Tính toán tức thì các chỉ số $RR, OR, ARR, RRR, NNT, NNH$ với khoảng tin cậy $95\%\text{ CI}$ từ số liệu thô của thử nghiệm lâm sàng.
