---
name: scholar-evaluation
description: >
  Đội ngũ & Quy trình Thẩm định Y văn & Kiểm định Phương pháp luận Nghiên cứu (Scholar Critical Appraisal & Methodology QA)
  chuẩn Nature & EBM 2026. Hấp thu tri thức từ nature-skills (nature-statistics, nature-reviewer, nature-ref-verifier):
  Kiểm định sai lệch Cochrane RoB 2.0 / ROBINS-I, Kiểm toán thống kê (p-value, 95% CI, HR, NNT, Power), Đánh giá chất lượng
  chứng cứ GRADE, Rà soát trích dẫn y văn AMA/PubMed, và Mô phỏng phản biện chuyên gia độc lập (Nature-Reviewer Simulation).
---

# ⚖️ Scholar Critical Appraisal & Methodology QA — Master Skill (Nature & EBM Standard)

> **Kế thừa & Nâng cấp từ**: `nature-skills` (`nature-statistics`, `nature-reviewer`, `nature-ref-verifier`, `nature-paper-card`)  
> **Áp dụng cho**: Thẩm định thử nghiệm lâm sàng (RCT), Nghiên cứu quan sát (Cohort/Case-Control), Phân tích gộp (Systematic Review/Meta-analysis), Báo cáo ca bệnh và Hướng dẫn thực hành lâm sàng (Clinical Guidelines) tại CliniPortal.

---

## 🏛️ 1. Khung Thẩm Định Đa Tầng (Multi-Tier Appraisal Framework)

Một nghiên cứu khoa học y khoa chỉ thực sự có giá trị khi vượt qua 5 cổng kiểm định học thuật nghiêm ngặt:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. STUDY DESIGN & REPORTING GUIDELINE (CONSORT / PRISMA / STROBE / STARD)   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. RISK OF BIAS AUDIT (Cochrane RoB 2.0 / ROBINS-I / QUADAS-2 / Newcastle)  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. STATISTICAL INTEGRITY & REPRODUCIBILITY (p, 95% CI, HR, ARR, NNT, Power)│
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. CERTAINTY OF EVIDENCE GRADING (GRADE Methodology: High/Mod/Low/Very Low) │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. CITATION & CONFLICT OF INTEREST VERIFICATION (Retraction check, COI, Bio)│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔍 2. Cổng 1: Đánh Giá Nguy Cơ Sai Lệch (Risk of Bias — RoB 2.0)

Áp dụng cho Thử nghiệm Lâm sàng Ngẫu nhiên có Đối chứng (RCT) theo chuẩn Cochrane RoB 2.0 (5 Domains):

### Ma Trận 5 Miền Sai Lệch (5 RoB Domains)
1. **D1: Quá trình Ngẫu nhiên hóa (Randomization Process)**:
   - Trình tự ngẫu nhiên có thực sự ngẫu nhiên không (máy tính, bảng số ngẫu nhiên)?
   - Mã phân bổ có được che giấu đến phút chót không (Allocation Concealment: bì thư dán kín không nhìn xuyên thấu, hệ thống IVRS/IWRS trung tâm)?
   - Có sự mất cân đối đặc điểm nền (baseline characteristics) giữa các nhóm can thiệp không?
2. **D2: Sai lệch do Sai lệch Can thiệp Dự kiến (Deviations from Intended Interventions)**:
   - Thử nghiệm làm mù đối tượng nào: Bệnh nhân (Single-blind), Bác sĩ điều trị (Double-blind), Người đánh giá kết cục (Triple-blind)?
   - Phân tích thống kê theo nguyên tắc Ý định Điều trị (Intention-to-Treat - ITT) hay Theo Phác đồ (Per-Protocol - PP)? *(Lưu ý: Bắt buộc ITT cho thử nghiệm chứng minh vượt trội; PP có thể dùng bổ trợ trong thử nghiệm không thua kém).*
3. **D3: Dữ liệu Kết cục Bị Thiếu (Missing Outcome Data)**:
   - Tỷ lệ mất dấu theo dõi (Loss to Follow-up) là bao nhiêu? Có vượt quá 5% - 20% không?
   - Tỷ lệ bỏ cuộc có cân bằng giữa 2 nhóm không? Lý do bỏ cuộc có liên quan đến tác dụng phụ hoặc thất bại điều trị không?
4. **D4: Đo lường Kết cục (Measurement of the Outcome)**:
   - Kết cục đo lường là khách quan (Tử vong do mọi nguyên nhân, nồng độ Troponin) hay chủ quan (Điểm đau VAS, chất lượng sống QoL)?
   - Người đo lường kết cục có được làm mù không?
   - Đã có Hội đồng Thẩm định Biến cố Lâm sàng Độc lập (Clinical Event Committee - CEC) mù danh tính bệnh nhân để xác thực biến cố chưa?
5. **D5: Lựa chọn Báo cáo Kết quả (Selection of the Reported Result)**:
   - Nghiên cứu có được đăng ký trước trên ClinicalTrials.gov hoặc PROSPERO không?
   - Các kết cục công bố trong bài báo có trùng khớp 100% với đề cương đăng ký ban đầu (Primary/Secondary Endpoints) không? Có hiện tượng "p-hacking" (đổi kết cục phụ thành kết cục chính khi thấy p < 0.05) không?

---

## 📐 3. Cổng 2: Kiểm Toán Thống Kê Chuẩn Nature (Statistical Rigor Audit)

Hấp thu toàn bộ tiêu chuẩn từ `nature-statistics`:

### 3.1. Rà Soát Tính Hợp Lệ Của Thống Kê
- **Khoảng Tin Cậy 95% (95% Confidence Interval)**:
  - Nếu kết cục là tỷ số (RR, OR, HR): Khoảng tin cậy có chứa giá trị $1.00$ không? Nếu chứa $1.00$, sự khác biệt **không có ý nghĩa thống kê** ($p \ge 0.05$).
  - Nếu kết cục là hiệu số trung bình (Mean Difference): Khoảng tin cậy có chứa giá trị $0.00$ không?
- **Sự Khác Biệt Giữa Ý Nghĩa Thống Kê ($p < 0.05$) & Ý Nghĩa Lâm Sàng (Clinical Relevance)**:
  - Một nghiên cứu cỡ mẫu cực lớn ($N = 100,000$) có thể đạt $p < 0.001$ với mức giảm huyết áp chỉ $0.5\text{ mmHg}$. Về mặt thống kê là có ý nghĩa, nhưng về mặt lâm sàng là **vô nghĩa**.
  - Kiểm toán bắt buộc tính toán:
    $$\text{ARR (Absolute Risk Reduction)} = \text{Tỷ lệ biến cố Giả dược} - \text{Tỷ lệ biến cố Can thiệp}$$
    $$\text{NNT (Number Needed to Treat)} = \frac{1}{\text{ARR}}$$
  - Báo cáo số bệnh nhân cần điều trị (NNT) và khoảng thời gian theo dõi cụ thể.

### 3.2. Giả Định Mô Hình & Kiểm Định Đa Biến (Multiplicity & Model Assumptions)
- Thử nghiệm có kiểm soát tỷ lệ sai số loại I (Type I Error Inflation) khi so sánh nhiều nhóm không (hiệu chỉnh Bonferroni, Hochberg, FDR)?
- Mô hình hồi quy Cox (Cox Proportional Hazards): Đã kiểm tra giả định nguy cơ tỷ lệ (Proportional Hazards Assumption) chưa? Đường cong sống còn Kaplan-Meier có bị cắt chéo nhau (crossing curves) không?

---

## 🌟 4. Cổng 3: Đánh Giá Chất Lượng Bằng Chứng Theo GRADE

Phân cấp độ tin cậy của toàn bộ khối bằng chứng thành 4 mức:
- **Cao (High - ⊕⊕⊕⊕)**: Rất tự tin rằng hiệu quả thực tế sát với ước tính hiệu quả.
- **Trung bình (Moderate - ⊕⊕⊕⊝)**: Tự tin vừa phải; hiệu quả thực tế có thể gần với ước tính nhưng vẫn có khả năng khác biệt.
- **Thấp (Low - ⊕⊕⊝⊝)**: Mức độ tin cậy hạn chế; hiệu quả thực tế có thể khác biệt đáng kể.
- **Rất thấp (Very Low - ⊕⊝⊝⊝)**: Rất ít tự tin; ước tính hiệu quả rất không chắc chắn.

### 5 Yếu Tố Hạ Bậc Chứng Cứ (Downgrading Factors)
1. **Nguy cơ sai lệch (Risk of Bias)**: Giảm 1 hoặc 2 bậc nếu phần lớn nghiên cứu có rủi ro cao ở các miền RoB.
2. **Tính không nhất quán (Inconsistency)**: Giảm bậc nếu chỉ số dị biến $I^2 > 50\%$ trong phân tích gộp và không giải thích được.
3. **Bằng chứng gián tiếp (Indirectness)**: Giảm bậc nếu dân số, can thiệp hoặc kết cục nghiên cứu khác biệt so với câu hỏi lâm sàng cần áp dụng.
4. **Độ không chính xác (Imprecision)**: Giảm bậc nếu cỡ mẫu nhỏ, số lượng biến cố ít ($< 300$ biến cố), hoặc khoảng tin cậy 95% quá rộng bao trùm cả lợi ích lâm sàng lẫn nguy cơ gây hại.
5. **Sai lệch xuất bản (Publication Bias)**: Giảm bậc nếu biểu đồ phễu (Funnel Plot) bất đối xứng hoặc kiểm định Egger có ý nghĩa thống kê ($p < 0.10$).

---

## 👥 5. Mô Phỏng Phản Biện Chuyên Gia Độc Lập (Nature-Reviewer Simulation)

Khi người dùng cần đánh giá sâu sắc một bài báo hoặc bản thảo nghiên cứu, khởi chạy quy trình **3 Reviewers Mù Chéo (Triple-Blind Peer Review)**:

- **Reviewer 1 (Chuyên gia Lâm sàng & Phương pháp luận)**:
  - Soi xét tính thực tế của tiêu chuẩn chọn mẫu.
  - Phân tích xem phác đồ can thiệp có phản ánh đúng thực hành lâm sàng tiêu chuẩn hay không.
  - Đánh giá tính an toàn và tỷ lệ biến cố ngoại ý nghiêm trọng.
- **Reviewer 2 (Chuyên gia Thống kê Y sinh & Dữ liệu)**:
  - Soi xét công thức tính cỡ mẫu, giả định phân phối dữ liệu.
  - Đào sâu các giá trị ngoại lai, tỷ lệ mất mẫu và phương pháp xử lý dữ liệu khuyết (Imputation).
  - Kiểm tra xem kết luận rút ra có vượt quá phạm vi dữ liệu chứng minh hay không.
- **Reviewer 3 (Tổng biên tập / Chuyên gia Đột phá & Tính Mới)**:
  - Định vị bài báo trong dòng chảy nghiên cứu toàn cầu: Đây là một bước đột phá làm thay đổi thực hành (Practice-changing) hay chỉ là một nghiên cứu xác nhận lặp lại (Confirmatory / Incremental)?
  - Phân định ranh giới giữa đóng góp thực tế và quảng cáo thái quá (over-claiming).

---

## 📋 6. Bảng Kiểm Bàn Giao Thẩm Định (Critical Appraisal Checklist)

Trước khi xác nhận hoàn tất thẩm định một công trình nghiên cứu:
- [ ] Xác định rõ ràng câu hỏi PICO của nghiên cứu.
- [ ] Phân loại chính xác thiết kế nghiên cứu (RCT, Cohort, Case-Control, Systematic Review).
- [ ] Chấm điểm đủ 5 miền Cochrane RoB 2.0 (hoặc công cụ tương ứng).
- [ ] Kiểm tra tính chính xác của các số liệu thống kê (HR/RR, 95% CI, p-value, ARR, NNT).
- [ ] Đánh giá mức độ chắc chắn của bằng chứng theo GRADE.
- [ ] Rà soát xung đột lợi ích (COI) và nguồn tài trợ.
- [ ] Đưa ra Phán quyết Lâm sàng rõ ràng: **Practice-Changing / Guideline-Adopting / Confirmatory / Methodologically Flawed**.
