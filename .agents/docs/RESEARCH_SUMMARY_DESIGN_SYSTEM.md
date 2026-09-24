# 🏛️ NATURE-GRADE MEDICAL RESEARCH SUMMARY DESIGN SYSTEM
> **Hệ Thống Thiết Kế & Quy Chuẩn Trình Bày Bài Tóm Tắt Nghiên Cứu Y Khoa Xuất Sắc**  
> **Dự án**: CliniPortal — Hệ sinh thái Web Y khoa  
> **Phiên bản**: 3.0.0 (Nature & EBM Suite)  
> **Kế thừa tri thức từ**: `nature-skills` (`nature-paper-card`, `nature-figure`, `nature-statistics`, `nature-reviewer`, `nature-paper2ppt`)

---

## 📑 MỤC LỤC
1. [Triết Lý Cốt Lõi: Từ Bài Đọc Lướt Đến Bảng Điều Khiển Lâm Sàng](#1-triết-lý-cốt-lõi-từ-bài-đọc-lướt-đến-bảng-điều-khiển-lâm-sàng)
2. [Hệ Thống Cấu Trúc 16 Đề Mục Chuẩn Nature (Medical Paper Card)](#2-hệ-thống-cấu-trúc-16-đề-mục-chuẩn-nature-medical-paper-card)
3. [Quy Chuẩn Trực Quan Hóa Dữ Liệu Lâm Sàng (Visual Components)](#3-quy-chuẩn-trực-quan-hóa-dữ-liệu-lâm-sàng-visual-components)
   - [3.1. Dải Chỉ Số Then Chốt (.stats-strip)](#31-dải-chỉ-số-then-chốt-stats-strip)
   - [3.2. Khung Bento Thiết Kế Nghiên Cứu (.pico-bento-grid)](#32-khung-bento-thiết-kế-nghiên-cứu-pico-bento-grid)
   - [3.3. Bảng Điểm Kết Thúc Thử Nghiệm (.trial-endpoints-table)](#33-bảng-điểm-kết-thúc-thử-nghiệm-trial-endpoints-table)
   - [3.4. Thẻ Thẩm Định Nguy Cơ Sai Lệch Cochrane RoB 2.0 (.rob-card)](#34-thẻ-thẩm-định-nguy-cơ-sai-lệch-cochrane-rob-20-rob-card)
   - [3.5. Hộp Phán Quyết Lâm Sàng (.verdict-box)](#35-hộp-phán-quyết-lâm-sàng-verdict-box)
4. [Quy Chuẩn Đồ Họa Xuất Bản Khoa Học Thuần SVG (Nature Figures)](#4-quy-chuẩn-đồ-họa-xuất-bản-khoa-học-thuần-svg-nature-figures)
   - [4.1. Sơ Đồ Quy Trình PRISMA 2020 Flowchart](#41-sơ-đồ-quy-trình-prisma-2020-flowchart)
   - [4.2. Biểu Đồ Forest Plot Tỷ Số Nguy Cơ (HR/RR)](#42-biểu-đồ-forest-plot-tỷ-số-nguy-cơ-hrrr)
   - [4.3. Sơ Đồ Cơ Chế Phân Tử & Bệnh Sinh (Molecular Mechanism)](#43-sơ-đồ-cơ-chế-phân-tử--bệnh-sinh-molecular-mechanism)
5. [Quy Trình Kiểm Định & Cổng Bàn Giao 6/6 (Quality Gate)](#5-quy-trình-kiểm-định--cổng-bàn-giao-66-quality-gate)

---

## 1. TRIẾT LÝ CỐT LÕI: TỪ BÀI ĐỌC LƯỚT ĐẾN BẢNG ĐIỀU KHIỂN LÂM SÀNG

Một bài tóm tắt nghiên cứu khoa học chất lượng cao trong CliniPortal **không bao giờ là một bản dịch chữ nghĩa đơn thuần** mà phải được tổ chức như một **Bảng Điều Khiển Lâm Sàng (Clinical Dashboard)**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. TẬP TRUNG VÀO DỮ LIỆU ĐỊNH LƯỢNG (High-Density Quantitative Proof)       │
│    Mọi kết luận phải gắn liền với con số: HR, ARR, NNT, 95% CI, p-value.    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. PHÂN TÁCH MINH BẠCH BA NGUỒN THÔNG TIN (Three-Tier Grounding)            │
│    • [Author Claims]: Kết quả do nhóm tác giả trực tiếp đo lường.           │
│    • [Critical Appraisal]: Thẩm định độc lập của AI/chuyên gia về sai lệch. │
│    • [External Verification]: Đối chiếu với Guideline và y văn quốc tế.     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. CÔNG THÁI HỌC BÁC SĨ (Clinical Ergonomics)                               │
│    Quét nhanh trong 30 giây: Nắm trọn PICO, chỉ số chính và phán quyết.     │
│    Đọc sâu trong 5 phút: Nắm trọn phân tích phân nhóm, an toàn và RoB 2.0.  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. HỆ THỐNG CẤU TRÚC 16 ĐỀ MỤC CHUẨN NATURE (MEDICAL PAPER CARD)

Mọi bài tóm tắt thử nghiệm lâm sàng trọng điểm (Landmark Trial) hoặc nghiên cứu y khoa bước ngoặt áp dụng đầy đủ 16 mục chuẩn hóa:

| # | Đề mục | Nội dung trọng tâm | Linh kiện CliniPortal |
|---|---|---|---|
| **01** | **Thông Tin Cơ Bản** | Tiêu đề, Tác giả, Tạp chí, Năm, DOI, Mã NCT, Nhà tài trợ | Frontmatter + Metadata Badges |
| **02** | **Tóm Tắt Một Câu** | 1 câu súc tích: Dân số, can thiệp, cơ chế và kết quả lượng hóa | `.one-sentence-summary-box` |
| **03** | **Câu Hỏi Nghiên Cứu & Khoảng Trống** | Bối cảnh y học trước thử nghiệm; thất bại của các phác đồ cũ | Thẻ bối cảnh lâm sàng |
| **04** | **Lộ Trình Phát Triển Y Học** | So sánh với các thế hệ thuốc tiền nhiệm | Timeline / Bảng đối sánh |
| **05** | **Điểm Nghẽn Lâm Sàng Cốt Lõi** | Bảng 4 cột: Điểm nghẽn \| Biểu hiện \| Cơ chế \| Dữ liệu | Bảng Ma trận Pain Points |
| **06** | **Ý Tưởng & Đột Phá Cơ Chế** | Cơ chế phân tử mới hoặc chiến lược can thiệp đột phá | Sơ đồ cơ chế SVG / Infobox |
| **07** | **Thiết Kế Nghiên Cứu (PICO)** | Khung PICO: Dân số, Can thiệp, Đối chứng, Kết cục | `.pico-bento-grid` |
| **08** | **Giải Phẫu Phác Đồ Can Thiệp** | Liều lượng, đường dùng, thời gian, tiêu chuẩn điều chỉnh liều | Bảng phác đồ can thiệp |
| **09** | **Công Thức & Chỉ Số Thống Kê** | Tính toán cụ thể ARR, NNT, HR, eGFR, công thức phân tầng | Khung công thức KaTeX / Math |
| **10** | **Chuỗi Bằng Chứng & Kết Cục Thống Kê**| Bảng đối sánh kết cục chính & phụ (HR, 95% CI, p-value) | `.trial-endpoints-table` |
| **11** | **Diễn Giải Kết Luận Đúng Đắn** | Xác định ranh giới: Ai ĐƯỢC hưởng lợi, ai CHƯA ĐƯỢC chứng minh | Thẻ Bounded Claims |
| **12** | **Hạn Chế Tác Giả Thừa Nhận** | Các giới hạn tác giả tự ghi nhận trong bài báo gốc | Bảng Author Limitations |
| **13** | **Thẩm Định Nguy Cơ Sai Lệch** | Đánh giá 5 miền Cochrane RoB 2.0 (D1–D5) | `.rob-card` |
| **14** | **Tri Thức Chuyển Giao Thực Hành** | Hạt ngọc lâm sàng, cạm bẫy kê đơn và phòng ngừa tác dụng phụ | `.takeaway-pearl` |
| **15** | **Kết Nối Vào Guidelines Hiện Hành** | Vị trí trong khuyến cáo Bộ Y tế, ESC, AHA, ADA, KDIGO | Thẻ khuyến cáo COR & LOE |
| **16** | **Phán Quyết Lâm Sàng & Tương Lai** | Practice-Changing vs Confirmatory + Hướng nghiên cứu mở | `.verdict-box` |

---

## 3. QUY CHUẨN TRỰC QUAN HÓA DỮ LIỆU LÂM SÀNG (VISUAL COMPONENTS)

### 3.1. Dải Chỉ Số Then Chốt (`.stats-strip`)
Hiển thị ngay đầu bài viết để tạo ấn tượng thị giác mạnh mẽ:
```html
<div class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val green">-38%</div>
      <div class="stat-lbl">Tử vong do Tim mạch (HR 0.62, p&lt;0.001)</div>
    </div>
    <div class="stat-card">
      <div class="stat-val blue">-35%</div>
      <div class="stat-lbl">Nhập viện do Suy tim (HR 0.65, p=0.002)</div>
    </div>
    <div class="stat-card">
      <div class="stat-val purple">NNT = 39</div>
      <div class="stat-lbl">Số BN cần điều trị 3 năm để ngừa 1 tử vong TM</div>
    </div>
    <div class="stat-card">
      <div class="stat-val amber">-32%</div>
      <div class="stat-lbl">Tử vong do Mọi nguyên nhân (HR 0.68, p&lt;0.001)</div>
    </div>
  </div>
</div>
```

### 3.2. Khung Bento Thiết Kế Nghiên Cứu (`.pico-bento-grid`)
```html
<div class="pico-bento-grid">
  <div class="pico-item pico-p">
    <span class="pico-tag"><i class="fa-solid fa-user-group"></i> Population (Dân số)</span>
    <div class="pico-text">7,020 bệnh nhân ĐTĐ típ 2, tuổi ≥ 18, BMI ≤ 45 kg/m², eGFR ≥ 30 mL/min/1.73m², có tiền sử ASCVD đã xác lập.</div>
  </div>
  <div class="pico-item pico-i">
    <span class="pico-tag"><i class="fa-solid fa-syringe"></i> Intervention (Can thiệp)</span>
    <div class="pico-text">Empagliflozin 10 mg hoặc 25 mg uống 1 lần/ngày kết hợp với chăm sóc chuẩn.</div>
  </div>
  <div class="pico-item pico-c">
    <span class="pico-tag"><i class="fa-solid fa-vial"></i> Comparison (Đối chứng)</span>
    <div class="pico-text">Giả dược (Placebo) tương ứng 1 lần/ngày kết hợp với chăm sóc chuẩn.</div>
  </div>
  <div class="pico-item pico-o">
    <span class="pico-tag"><i class="fa-solid fa-trophy"></i> Outcome (Kết cục chính)</span>
    <div class="pico-text">3-Point MACE: Tử vong tim mạch, Nhồi máu cơ tim không tử vong, hoặc Đột quỵ không tử vong.</div>
  </div>
</div>
```

### 3.3. Bảng Điểm Kết Thúc Thử Nghiệm (`.trial-endpoints-table`)
```html
<div class="table-wrap">
  <table class="data-table trial-endpoints-table">
    <thead>
      <tr>
        <th>Điểm Kết Thúc</th>
        <th>Nhóm Can Thiệp</th>
        <th>Nhóm Đối Chứng</th>
        <th>HR (95% CI)</th>
        <th>Giá Trị p</th>
        <th>Ưu Thế</th>
      </tr>
    </thead>
    <tbody>
      <tr class="endpoint-primary">
        <td><strong>3-Point MACE</strong></td>
        <td>490/4687 (10.5%)</td>
        <td>282/2333 (12.1%)</td>
        <td>0.86 (0.74–0.99)</td>
        <td><span class="p-val sig">p = 0.04</span></td>
        <td><span class="favors-exp">Giảm 14%</span></td>
      </tr>
      <tr class="endpoint-secondary">
        <td><strong>Tử vong do Tim mạch</strong></td>
        <td>172/4687 (3.7%)</td>
        <td>137/2333 (5.9%)</td>
        <td>0.62 (0.49–0.77)</td>
        <td><span class="p-val sig">p &lt; 0.001</span></td>
        <td><span class="favors-exp">Giảm 38%</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

### 3.4. Thẻ Thẩm Định Nguy Cơ Sai Lệch Cochrane RoB 2.0 (`.rob-card`)
```html
<div class="rob-card">
  <div class="rob-header">
    <div class="rob-title"><i class="fa-solid fa-shield-halved"></i> Đánh Giá Nguy Cơ Sai Lệch (Cochrane RoB 2.0)</div>
    <span class="badge badge-rob"><i class="fa-solid fa-circle-check"></i> Rủi ro Sai lệch Tổng thể: THẤP</span>
  </div>
  <div class="rob-grid">
    <div class="rob-domain-card low-risk">
      <div class="rob-domain-title">D1: Ngẫu Nhiên Hóa</div>
      <div class="rob-status">Nguy cơ thấp</div>
      <div class="rob-desc">Sinh chuỗi ngẫu nhiên bằng máy tính trung tâm, giấu mã phân bổ qua web tương tác.</div>
    </div>
    <div class="rob-domain-card low-risk">
      <div class="rob-domain-title">D2: Sai Lệch Can Thiệp</div>
      <div class="rob-status">Nguy cơ thấp</div>
      <div class="rob-desc">Làm mù đôi hoàn hảo giữa thuốc hoạt tính và viên giả dược tương đồng hình dáng.</div>
    </div>
    <div class="rob-domain-card low-risk">
      <div class="rob-domain-title">D3: Dữ Liệu Thiếu Hụt</div>
      <div class="rob-status">Nguy cơ thấp</div>
      <div class="rob-desc">Tỷ lệ mất dấu theo dõi cực thấp (&lt; 0.5%), phân tích theo nguyên tắc ITT.</div>
    </div>
    <div class="rob-domain-card low-risk">
      <div class="rob-domain-title">D4: Đo Lường Kết Cục</div>
      <div class="rob-status">Nguy cơ thấp</div>
      <div class="rob-desc">Hội đồng CEC độc lập làm mù hoàn toàn khi thẩm định biến cố tim mạch.</div>
    </div>
    <div class="rob-domain-card low-risk">
      <div class="rob-domain-title">D5: Báo Cáo Chọn Lọc</div>
      <div class="rob-status">Nguy cơ thấp</div>
      <div class="rob-desc">Mọi kết cục đã đăng ký trước trên ClinicalTrials.gov đều được báo cáo minh bạch.</div>
    </div>
  </div>
</div>
```

### 3.5. Hộp Phán Quyết Lâm Sàng (`.verdict-box`)
```html
<div class="verdict-box practice-changing">
  <div class="verdict-badge"><i class="fa-solid fa-gavel"></i> PHÁN QUYẾT LÂM SÀNG: PRACTICE-CHANGING</div>
  <h4>Thử nghiệm mang tính bước ngoặt tái định hình toàn bộ hướng dẫn điều trị tim mạch - chuyển hóa toàn cầu</h4>
  <p>EMPA-REG OUTCOME đã mở đường cho kỷ nguyên mới: Thuốc hạ đường huyết không chỉ kiểm soát HbA1c mà còn trực tiếp cứu sống bệnh nhân tim mạch và bảo vệ chức năng thận lâu dài.</p>
  <div class="verdict-grid">
    <div><strong>Khuyến cáo Guideline:</strong> Khuyến cáo Nhóm I (Mức độ A) trong các Hướng dẫn ESC, ADA, ACC/AHA và Bộ Y Tế.</div>
    <div><strong>Ý nghĩa thực tế:</strong> NNT = 39 khẳng định chi phí - hiệu quả vượt trội trong phòng ngừa thứ phát biến cố tim mạch.</div>
  </div>
  <div class="takeaway-pearl">
    <i class="fa-solid fa-lightbulb"></i> <strong>Lưu ý thực chiến:</strong> Khởi trị sớm cho bệnh nhân ASCVD; theo dõi eGFR định kỳ và tư vấn vệ sinh niệu - sinh dục kỹ lưỡng.
  </div>
</div>
```

---

## 4. QUY CHUẨN ĐỒ HỌA XUẤT BẢN KHOA HỌC THUẦN SVG (NATURE FIGURES)

Mọi đồ họa y khoa xuất bản trong CliniPortal phải tuân thủ:
1. **100% Inline SVG**: Không dùng ảnh raster bitmap (PNG/JPEG) mờ nhòe khi thu phóng, không dùng Canvas 2D không responsive.
2. **Hero Panel Architecture**: Luôn xác định panel chủ đạo mang sức nặng chứng cứ lớn nhất.
3. **Bảng màu kiềm chế Nature**: Sử dụng các tone màu y khoa tiêu chuẩn:
   - Xanh dương y tế: `#0284c7`
   - Xanh lục thành công / can thiệp: `#10b981`
   - Đỏ cảnh báo / đối chứng: `#ef4444`
   - Hổ phách / thận trọng: `#f59e0b`
   - Slate nền tối: `#1e293b`
4. **Kiểm toán va chạm chữ (Collision Audit)**: Khoảng cách giữa các nhãn số và trục tọa độ tối thiểu 8px, font chữ không bị chồng lấn.

---

## 5. QUY TRÌNH KIỂM ĐỊNH & CỔNG BÀN GIAO 6/6 (QUALITY GATE)

Trước khi bàn giao bất kỳ bài tóm tắt nghiên cứu nào, bắt buộc vượt qua **6 Cổng Kiểm Định (6/6 Quality Gate)**:

- [ ] **Gate 1: Đủ 16 Đầu Mục Chuẩn Nature**: Không bỏ sót mục nào; nếu thông tin không có trong bài gốc, ghi rõ `Không báo cáo trong tài liệu gốc`.
- [ ] **Gate 2: PICO & Dữ Liệu Định Lượng Đầy Đủ**: Có đủ cỡ mẫu $N$, tỷ lệ $\%$, HR, khoảng tin cậy 95% CI và $p$-value.
- [ ] **Gate 3: Tính Toán ARR & NNT**: Đối với các kết cục có ý nghĩa lâm sàng, bắt buộc tính ARR và NNT cụ thể.
- [ ] **Gate 4: Thẩm Định Sai Lệch Cochrane RoB 2.0**: Đánh giá khách quan 5 miền D1–D5, không nương tay với các thử nghiệm mở (open-label).
- [ ] **Gate 5: Làm Sạch Lỗi Ký Tự $ Math LaTeX**: Tuyệt đối không còn sót ký tự `$` gây vỡ giao diện web.
- [ ] **Gate 6: Kiểm Tra Thẻ HTML & Đăng Ký Registry**: Chạy `node tools/scratch/check_tags.js <file>.mdx` không lỗi và đã đăng ký vào `kho-guidelines-registry.ts`.
