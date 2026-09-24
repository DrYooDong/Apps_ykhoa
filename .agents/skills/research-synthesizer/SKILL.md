---
name: research-synthesizer
description: >
  Đội ngũ & Quy trình Tổng hợp Nghiên cứu Khoa học Y học Chứng cứ Đỉnh cao (Medical Research Synthesizer)
  chuẩn Nature & EBM 2026. Hấp thu tri thức từ nature-skills (nature-paper-card, nature-literature-pipeline,
  nature-shared): Khung PICO, Ma trận Chuỗi Bằng chứng (Claim-Evidence Matrix), Đánh giá GRADE, Forest Plot,
  và Rút trích Tri thức Chuyển giao Thực hành Lâm sàng (Practice-Changing Insights).
---

# 🔬 Medical Research Synthesizer — Master Skill (Nature & EBM 2026 Standard)

> **Kế thừa & Nâng cấp từ**: `nature-skills` (`nature-paper-card`, `nature-literature-pipeline`, `nature-shared`)  
> **Áp dụng cho**: Phân hệ Y học Chứng cứ (EBM), Kho Guidelines & Landmark Trials (`src/content/ebm/guidelines/`), Tổng quan Nghiên cứu và Báo cáo Y khoa tại CliniPortal.

---

## 🎯 1. Mục Tiêu & Bản Chất Cốt Lõi

Khác với việc tóm tắt thông thường (chỉ chép lại phần tóm tắt Abstract hoặc liệt kê các đoạn văn xuôi), **Medical Research Synthesizer** thực hiện một cuộc **giải phẫu học thuật đa tầng (Multi-layered Academic Dissection)**:
1. **Bảo toàn Chuỗi Bằng chứng (Claim-to-Evidence Groundedness)**: Mọi kết luận, khuyến cáo đều phải liên kết trực tiếp với dữ liệu định lượng (HR, RR, OR, ARR, NNT, p-value, 95% CI) hoặc hình ảnh/bảng biểu cụ thể từ nguồn gốc.
2. **Phân Định Ranh Giới Nghiêm Ngặt**:
   - `[Tác giả khẳng định]`: Những gì nghiên cứu công bố và đo lường trực tiếp.
   - `[Agent phân tích / Thẩm định độc lập]`: Đánh giá phản biện về nguy cơ sai lệch (bias), điểm nghẽn phương pháp luận hoặc giả thuyết chưa chứng minh.
   - `[Bằng chứng ngoại kiểm]`: Dữ liệu đối chiếu từ các nghiên cứu đối chứng hoặc guideline quốc tế khác.
3. **Chuyển Giao Lâm Sàng (Practice-Changing vs Confirmatory)**: Định vị chính xác giá trị thực tế của bài báo đối với quyết định điều trị tại giường bệnh.

---

## 🧭 2. Quy Trình Tổng Hợp 5 Bước (5-Stage Synthesis Protocol)

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ 1. INTAKE &     │ ──> │ 2. PICO & STUDY │ ──> │ 3. CLAIM-       │ ──> │ 4. CRITICAL     │ ──> │ 5. VISUAL       │
│    GROUNDING    │     │    DECONSTRUCT  │     │    EVIDENCE     │     │    APPRAISAL    │     │    DASHBOARD    │
│ (Đọc sâu & Lập  │     │ (Bóc tách PICO, │     │    MATRIX       │     │ (Thẩm định sai  │     │ (Thiết kế bài   │
│  bảng thuật ngữ)│     │  endpoints, CLS)│     │ (Ma trận chứng) │     │  lệch & GRADE)  │     │  tóm tắt MDX)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Bước 1: Tiếp Nhận & Lập Bảng Thuật Ngữ (Terminology Ledger)
- Xác định phạm vi tài liệu: Bản đầy đủ (Full PDF/HTML) có hình/bảng hay bản tóm tắt (Abstract/Excerpt).
- Lập **Bảng Thuật Ngữ Nhất Quán (Terminology Ledger)**: Cố định tên thuốc, tên thử nghiệm, tên gen, dấu ấn sinh học (biomarkers), chỉ số thống kê, tránh dịch sai hoặc đổi tên xuyên suốt bài viết.

### Bước 2: Bóc Tách Thiết Kế Nghiên Cứu (PICO Deconstruction)
- **P (Population / Dân số)**: Tiêu chuẩn chọn vào, loại trừ, cỡ mẫu, độ tuổi trung bình, giới tính, tiền sử bệnh nền.
- **I (Intervention / Can thiệp)**: Thuốc/liệu pháp, phác đồ liều, đường dùng, thời gian can thiệp.
- **C (Comparator / Đối chứng)**: Giả dược (Placebo) hay Chăm sóc chuẩn (Standard of Care - SoC).
- **O (Outcomes / Kết cục)**:
  - *Kết cục chính (Primary Endpoint)*: Đơn lẻ hay gộp (Composite Endpoint)?
  - *Kết cục phụ (Secondary Endpoints)*: Tử vong tim mạch, tỷ lệ nhập viện, biến cố ngoại ý nghiêm trọng (SAEs).

### Bước 3: Xây Dựng Ma Trận Chuỗi Bằng Chứng (Claim-to-Evidence Matrix)
Mỗi tuyên bố lớn của tác giả phải được ánh xạ vào một bảng kiểm chứng khách quan:

| Khẳng định của nghiên cứu | Dữ liệu đo lường | Can thiệp vs Đối chứng | Chỉ số thống kê (HR / RR / p) | Kết luận được bảo chứng | Kết luận vượt quá bằng chứng | Nguồn / Figure / Table |
|---|---|---|---|---|---|---|
| *Ví dụ: Giảm tử vong tim mạch* | *Biến cố tử vong* | *3.7% vs 5.9%* | *HR 0.62 (0.49–0.77), p < 0.001* | *Giảm 38% tử vong tim mạch ở BN ASCVD xác lập* | *Không chứng minh được giảm đột quỵ không tử vong* | *NEJM Figure 1B, Table 2* |

### Bước 4: Thẩm Định Phản Biện & Nguy Cơ Sai Lệch (Critical Appraisal)
- Kiểm tra nguy cơ sai lệch theo chuẩn Cochrane RoB 2.0 (RCT) hoặc ROBINS-I (Quan sát).
- Đánh giá chất lượng bằng chứng theo hệ thống **GRADE** (High, Moderate, Low, Very Low).
- Phát hiện các yếu tố gây nhiễu (confounders), phân tích phân nhóm (subgroup analysis) có được dự định trước (pre-specified) hay hậu nghiệm (post-hoc).
- Rà soát các xung đột lợi ích (COI) và tài trợ từ hãng dược phẩm.

### Bước 5: Đóng Gói Thành Dashboard Trực Quan Chuẩn CliniPortal
- Tích hợp vào bài viết `.mdx` tại `src/content/ebm/guidelines/kho-guidelines/<slug>.mdx`.
- Áp dụng triệt để hệ thống linh kiện trực quan:
  - Dải chỉ số then chốt (`.stats-strip`).
  - Khung PICO Bento Grid (`.pico-bento-grid`).
  - Bảng Điểm kết thúc (`.trial-endpoints-table`).
  - Đánh giá RoB 2.0 (`.rob-card`).
  - Phán quyết lâm sàng (`.verdict-box`).

---

## 📊 3. Khung Tổng Hợp Đối Sánh Đa Nghiên Cứu (Meta-Synthesis Framework)

Khi tổng hợp một chủ đề từ nhiều nghiên cứu (Systematic Review / Meta-analysis / Topic Guideline):

### 3.1. Bảng Đối Sánh Các Thử Nghiệm Lâm Sàng Trọng Điểm (Landmark Trials Matrix)
```html
<div class="table-wrap">
  <table class="data-table landmark-trials-matrix">
    <thead>
      <tr>
        <th>Thử Nghiệm & Năm</th>
        <th>Dân Số (N)</th>
        <th>Can Thiệp vs Đối Chứng</th>
        <th>Kết Cục Chính (Primary)</th>
        <th>Kết Quả Thống Kê (HR / ARR)</th>
        <th>Ý Nghĩa Thực Hành</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>EMPA-REG (2015)</strong></td>
        <td>ĐTĐ típ 2 + ASCVD (N=7,020)</td>
        <td>Empagliflozin vs Placebo</td>
        <td>3-Point MACE</td>
        <td>HR 0.86 (0.74–0.99), p=0.04</td>
        <td><span class="badge badge-success">Practice-Changing</span></td>
      </tr>
      <tr>
        <td><strong>CANVAS (2017)</strong></td>
        <td>ĐTĐ típ 2 + Đa YTNC (N=10,142)</td>
        <td>Canagliflozin vs Placebo</td>
        <td>3-Point MACE</td>
        <td>HR 0.86 (0.75–0.97), p=0.02</td>
        <td><span class="badge badge-info">Confirmatory</span></td>
      </tr>
      <tr>
        <td><strong>DECLARE-TIMI 58 (2019)</strong></td>
        <td>ĐTĐ típ 2 + Phòng ngừa tiên phát (N=17,160)</td>
        <td>Dapagliflozin vs Placebo</td>
        <td>MACE & Tử vong TM/Nhập viện HF</td>
        <td>HR 0.83 (0.73–0.95), p=0.005 (HHF)</td>
        <td><span class="badge badge-info">HF Benefit Expanded</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

### 3.2. Sơ Đồ Forest Plot Trực Quan Thuần SVG (Inline SVG Forest Plot)
Thay vì dùng hình ảnh chụp mờ hoặc text ASCII, tổng hợp tỷ lệ nguy cơ (HR/RR) bằng SVG trực quan:
- Trục thẳng đứng hoành độ $X = 1.0$ (Đường vô hiệu - Line of No Effect).
- Hộp vuông kích thước tỷ lệ thuận với trọng số nghiên cứu (Weight %).
- Râu ngang thể hiện khoảng tin cậy 95% CI.
- Hình thoi (Diamond) tổng hợp ở cuối hàng biểu thị kết quả gộp (Pooled Estimate).

---

## 🛡️ 4. Quy Tắc Bất Di Bất Dịch (Zero-Hallucination & Evidence Rules)

1. **Tuyệt Đối Không Bịa Đặt Chỉ Số**: Nếu bài báo không công bố ARR (Absolute Risk Reduction) hoặc NNT (Number Needed to Treat), ghi rõ `Không báo cáo trong tài liệu gốc` hoặc tự tính toán minh bạch với chú thích công thức.
2. **Không Tự Ý Khái Quát Hóa Ngoài Quần Thể Nghiên Cứu**: Thử nghiệm trên bệnh nhân suy tim phân suất tống máu giảm (HFrEF) không được tự động suy diễn sang bệnh nhân phân suất tống máu bảo tồn (HFpEF) nếu chưa có nghiên cứu chứng minh.
3. **Phân Tách Rõ Ràng Ý Kiến Tác Giả & Phản Biện Của AI**:
   - Sử dụng tag `[Author Claim]` cho phát biểu của tác giả.
   - Sử dụng tag `[Critical Appraisal]` hoặc `[Analysis]` cho các đánh giá về hạn chế, nguy cơ sai lệch hoặc các giả định chưa được kiểm chứng.
4. **100% Dark Mode & Clean Typography**: Tôn trọng bảng màu EBM tokens của CliniPortal. Không dùng màu chói gây mỏi mắt.
