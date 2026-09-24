---
name: medical-research-card
description: >
  Tạo Thẻ Tóm Tắt & Giải Phẫu Nghiên Cứu Y Khoa Chuyên Sâu 16 Mục (Nature-Grade Medical Paper Card)
  dành cho các Thử nghiệm Lâm sàng Trọng điểm (Landmark RCTs), Nghiên cứu Bước ngoặt và Hướng dẫn Điều trị
  trong CliniPortal. Kết hợp chuẩn mực học thuật Nature với hệ thống giao diện Clinical Dashboard Astro MDX Native.
---

# 🗂️ Medical Research Card — 16 Sections (Nature & EBM Standard)

> **Kế thừa & Chuyển hóa từ**: `nature-paper-card` (Yuan1z0825/nature-skills)  
> **Tích hợp cùng**: CliniPortal Astro MDX Native Clinical Dashboard (`src/content/ebm/guidelines/kho-guidelines/`)

---

## 🏛️ 1. Bản Chất Của Medical Research Card

Khác với một bản dịch tóm tắt đơn thuần hay một bài đọc lướt, **Medical Research Card** là một tài liệu học thuật có cấu trúc cố định gồm **16 Mục Chuẩn Hóa**, được thiết kế để:
1. **Neo chặt bằng chứng (Source-Grounded)**: Mọi dữ liệu phải có con số cụ thể, chỉ rõ vị trí bảng biểu (`Figure 1`, `Table 2`, `Supplementary Appendix p. 14`).
2. **Minh bạch hóa ranh giới**: Phân định rạch ròi giữa kết quả thực tế của thử nghiệm với những suy diễn chưa được kiểm chứng.
3. **Trực quan hóa công thái học (Clinical Dashboard)**: Tích hợp đầy đủ các linh kiện giao diện CliniPortal như Dải chỉ số (`stats-strip`), Bento PICO, Bảng điểm kết thúc (`trial-endpoints-table`), Thẻ đánh giá sai lệch (`rob-card`), và Hộp phán quyết lâm sàng (`verdict-box`).

---

## 📑 2. Cấu Trúc 16 Mục Chuẩn Hóa (The 16-Section Schema)

Mỗi file Medical Research Card (hoặc bài MDX Landmark Study) tuân thủ nghiêm ngặt 16 đề mục sau:

| Số Thứ Tự | Tên Đề Mục (Tiếng Việt) | English Heading | Vai Trò & Linh Kiện Trực Quan CliniPortal |
|---|---|---|---|
| **01** | **Thông Tin Cơ Bản** | Basic Information | Frontmatter YAML + Metadata (DOI, PMCID, Tạp chí, Tài trợ, Link thử nghiệm) |
| **02** | **Tóm Tắt Một Câu** | One-Sentence Summary | Đúc kết trong 1 câu: Dân số nào, can thiệp gì, cơ chế nào, kết quả lượng hóa ra sao |
| **03** | **Câu Hỏi Nghiên Cứu & Khoảng Trống Tri Thức** | Research Question & Knowledge Gap | Bối cảnh lâm sàng trước nghiên cứu; tại sao các phác đồ cũ thất bại |
| **04** | **Lộ Trình Phát Triển Y Học & Bối Cảnh** | Development Path & Prior Art | Lịch sử các thử nghiệm tiền nhiệm; so sánh với các thế hệ thuốc/phác đồ trước |
| **05** | **Điểm Nghẽn Lâm Sàng Cốt Lõi (Pain Points)** | Core Clinical Pain Points | Bảng 4 cột: Điểm nghẽn | Biểu hiện lâm sàng | Cơ chế giải thích | Dữ liệu chứng minh |
| **06** | **Ý Tưởng & Đột Phá Trung Tâm** | Core Insight & Mechanism | Đột phá về mặt cơ chế phân tử hoặc chiến lược can thiệp |
| **07** | **Thiết Kế Nghiên Cứu Tổng Thể (PICO)** | Study Design & PICO Architecture | Khung `.pico-bento-grid` (Population, Intervention, Comparator, Outcomes) |
| **08** | **Giải Phẫu Phác Đồ Can Thiệp & Quy Trình** | Protocol Breakdown & Clinical Flow | Bảng phân tích chi tiết liều dùng, chuẩn bị, theo dõi định kỳ, tiêu chuẩn dừng thuốc |
| **09** | **Công Thức & Chỉ Số Thống Kê Then Chốt** | Essential Metrics & Formulas | Tính toán cụ thể ARR, RRR, NNT, HR, eGFR, công thức phân tầng nguy cơ |
| **10** | **Chuỗi Bằng Chứng & Kết Cục Thử Nghiệm** | Experimental Design & Evidence Chain | Bảng `.trial-endpoints-table` (Primary/Secondary MACE, Subgroups, p-value, 95% CI) |
| **11** | **Diễn Giải Kết Luận Đúng Đắn & Giới Hạn Quần Thể** | Bounded Interpretation of Conclusions | Xác lập ranh giới áp dụng: Ai ĐƯỢC dùng, ai CHƯA ĐƯỢC chứng minh hưởng lợi |
| **12** | **Hạn Chế Được Tác Giả Thừa Nhận** | Author-Acknowledged Limitations | Bảng tổng hợp các giới hạn được nhóm tác giả tự ghi nhận trong bài báo |
| **13** | **Phân Tích Phản Biện Độc Lập (Critical Appraisal)** | Critical Appraisal & RoB 2.0 | Khung `.rob-card` (5 miền Cochrane RoB) + Bảng phân tích nguy cơ sai lệch |
| **14** | **Tri Thức Chuyển Giao Thực Hành (Clinical Pearls)** | Transferable Clinical Knowledge | Hộp `.takeaway-pearl` + Khuyến cáo xử trí tác dụng phụ tại giường bệnh |
| **15** | **Kết Nối Vào Hệ Thống Guidelines Hiện Hành** | Integration into Current Guidelines | Đối chiếu với khuyến cáo mới nhất của Bộ Y tế, ESC, AHA, ADA, KDIGO (COR & LOE) |
| **16** | **Phán Quyết Lâm Sàng & Định Hướng Tương Lai** | Clinical Verdict & Future Directions | Khung `.verdict-box` (Practice-Changing vs Confirmatory) + Các câu hỏi nghiên cứu mở |

---

## 🎨 3. Quy Chuẩn Thiết Kế Giao Diện Trực Quan (MDX Implementation)

Khi xuất bản bài tóm tắt nghiên cứu dưới dạng Astro MDX Native tại CliniPortal, áp dụng mẫu code sau:

```mdx
---
title: "EMPA-REG OUTCOME: Empagliflozin, Kết Cục Tim Mạch & Tử Vong Ở Đái Tháo Đường Típ 2"
slug: "2015-nejm-empareg-outcome"
code: "STUDY-2015-NEJM-EMPAREG"
organization: "NEJM / Boehringer Ingelheim & Eli Lilly"
year: "2015"
category: "guidelines"
status: "published"
version: "2.0.0"
updatedAt: "2026-09-24"
cor: "I"
loe: "A"
description: "Thẻ giải phẫu nghiên cứu chuyên sâu 16 mục của thử nghiệm EMPA-REG OUTCOME: Đột phá SGLT2i giảm 38% tử vong tim mạch và 32% tử vong do mọi nguyên nhân."
tags:
  - "NEJM"
  - "Landmark RCT"
  - "SGLT2i"
  - "Empagliflozin"
  - "Tim mạch - Chuyển hóa"
keyRecommendations:
  - "Empagliflozin làm giảm có ý nghĩa 14% kết cục gộp 3-Point MACE (HR 0.86, 95% CI 0.74–0.99, p=0.04)."
  - "Giảm ngoạn mục 38% tử vong do nguyên nhân tim mạch (HR 0.62, 95% CI 0.49–0.77, p<0.001)."
  - "Giảm 35% tỷ lệ nhập viện do suy tim (HR 0.65, 95% CI 0.50–0.85, p=0.002)."
  - "NNT = 39 bệnh nhân điều trị trong 3 năm để ngăn ngừa 1 ca tử vong tim mạch."
sections:
  - id: "sec-1"
    number: 1
    title: "Thông Tin & Tóm Tắt Một Câu"
    icon: "fa-solid fa-file-contract"
  - id: "sec-2"
    number: 2
    title: "Bối Cảnh & Điểm Nghẽn Lâm Sàng"
    icon: "fa-solid fa-triangle-exclamation"
  - id: "sec-3"
    number: 3
    title: "Thiết Kế Nghiên Cứu PICO"
    icon: "fa-solid fa-flask-vial"
  - id: "sec-4"
    number: 4
    title: "Chuỗi Bằng Chứng & Kết Cục Thống Kê"
    icon: "fa-solid fa-chart-line"
  - id: "sec-5"
    number: 5
    title: "Thẩm Định Sai Lệch Cochrane RoB 2.0"
    icon: "fa-solid fa-shield-halved"
  - id: "sec-6"
    number: 6
    title: "Phán Quyết Lâm Sàng & Ứng Dụng Thực Hành"
    icon: "fa-solid fa-gavel"
---

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

<div class="page-content">

  <!-- MỤC 01 & 02 -->
  <div class="sec-card" id="sec-1">
    <div class="sec-hdr">
      <div class="sec-title"><i class="fa-solid fa-file-contract"></i> 01 & 02. Thông Tin Cơ Bản & Tóm Tắt Một Câu</div>
    </div>
    <div class="sec-body">
      <div class="one-sentence-summary-box">
        <div class="summary-label"><i class="fa-solid fa-bolt"></i> Tóm Tắt Một Câu:</div>
        <p>Ở bệnh nhân đái tháo đường típ 2 có nguy cơ tim mạch cao kèm bệnh tim mạch do xơ vữa (ASCVD) đã xác lập, việc bổ sung <strong>Empagliflozin</strong> (10 mg hoặc 25 mg) vào phác đồ điều trị chuẩn giúp <strong>làm giảm có ý nghĩa 14% biến cố gộp MACE</strong> và <strong>38% nguy cơ tử vong do tim mạch</strong> sau trung vị 3.1 năm theo dõi.</p>
      </div>
      
      <div class="meta-bento-grid">
        <div class="meta-item"><strong>Tạp chí / Năm:</strong> New England Journal of Medicine (NEJM), 2015</div>
        <div class="meta-item"><strong>DOI:</strong> 10.1056/NEJMoa1504720</div>
        <div class="meta-item"><strong>Đăng ký thử nghiệm:</strong> ClinicalTrials.gov (NCT01131676)</div>
        <div class="meta-item"><strong>Nhà tài trợ:</strong> Boehringer Ingelheim & Eli Lilly and Company</div>
      </div>
    </div>
  </div>

  <!-- MỤC 03 & 04 & 05 -->
  <div class="sec-card" id="sec-2">
    <div class="sec-hdr">
      <div class="sec-title"><i class="fa-solid fa-triangle-exclamation"></i> 03, 04 & 05. Bối Cảnh, Lộ Trình & Điểm Nghẽn Lâm Sàng</div>
    </div>
    <div class="sec-body">
      <p>Trước năm 2008, các thuốc hạ đường huyết chỉ tập trung vào việc giảm chỉ số HbA1c mà chưa chứng minh được lợi ích bảo vệ tim mạch, thậm chí Rosiglitazone còn làm dấy lên quan ngại tăng nguy cơ nhồi máu cơ tim. Sau yêu cầu bắt buộc của FDA (2008) về đánh giá an toàn tim mạch, EMPA-REG OUTCOME ra đời nhằm giải quyết khoảng trống này.</p>
      
      <h4>Bảng Điểm Nghẽn Lâm Sàng Cốt Lõi (Pain Points Matrix)</h4>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Điểm Nghẽn Lâm Sàng</th>
              <th>Biểu Hiện Thực Tế</th>
              <th>Cơ Chế Bệnh Sinh</th>
              <th>Chứng Minh Trong Thử Nghiệm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Tử vong tim mạch cao dù đường huyết đạt mục tiêu</strong></td>
              <td>Bệnh nhân ĐTĐ típ 2 vẫn tử vong do biến cố xơ vữa và suy tim dù HbA1c &lt; 7.0%.</td>
              <td>Tăng tải thể tích nội mạch, hoạt hóa hệ RAAS, độc tính đường huyết và stress oxy hóa cơ tim.</td>
              <td>Empagliflozin giảm 38% tử vong TM với cơ chế vượt ra ngoài tác dụng hạ HbA1c đơn thuần.</td>
            </tr>
            <tr>
              <td><strong>Nguy cơ hạ đường huyết nguy hiểm</strong></td>
              <td>Các nhóm thuốc cũ (Sulfonylurea, Insulin) dễ gây hạ đường huyết nặng, khởi kích biến cố loạn nhịp.</td>
              <td>Kích thích tiết insulin độc lập với nồng độ glucose trong máu.</td>
              <td>Empagliflozin chỉ thải đường qua nước tiểu khi đường huyết vượt ngưỡng thận, không gây hạ đường huyết khi dùng đơn trị.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- MỤC 07: THIẾT KẾ PICO BENTO GRID -->
  <div class="sec-card" id="sec-3">
    <div class="sec-hdr">
      <div class="sec-title"><i class="fa-solid fa-flask-vial"></i> 07. Thiết Kế Nghiên Cứu Tổng Thể (PICO Bento Grid)</div>
    </div>
    <div class="sec-body">
      <div class="pico-bento-grid">
        <div class="pico-item pico-p">
          <span class="pico-tag"><i class="fa-solid fa-user-group"></i> Population (Dân số)</span>
          <div class="pico-text">7,020 bệnh nhân ĐTĐ típ 2, tuổi ≥ 18, BMI ≤ 45 kg/m², eGFR ≥ 30 mL/min/1.73m², có tiền sử bệnh tim mạch do xơ vữa (NMCT, bệnh mạch vành, đột quỵ, bệnh mạch máu ngoại biên).</div>
        </div>
        <div class="pico-item pico-i">
          <span class="pico-tag"><i class="fa-solid fa-syringe"></i> Intervention (Can thiệp)</span>
          <div class="pico-text">Empagliflozin 10 mg (N=2,345) hoặc Empagliflozin 25 mg (N=2,342) uống 1 lần/ngày kết hợp với chăm sóc chuẩn.</div>
        </div>
        <div class="pico-item pico-c">
          <span class="pico-tag"><i class="fa-solid fa-vial"></i> Comparison (Đối chứng)</span>
          <div class="pico-text">Giả dược (Placebo) (N=2,333) uống 1 lần/ngày kết hợp với chăm sóc chuẩn tương đương.</div>
        </div>
        <div class="pico-item pico-o">
          <span class="pico-tag"><i class="fa-solid fa-trophy"></i> Outcome (Kết cục chính)</span>
          <div class="pico-text">3-Point MACE: Tử vong tim mạch, Nhồi máu cơ tim không tử vong, hoặc Đột quỵ không tử vong.</div>
        </div>
      </div>
    </div>
  </div>

  <!-- MỤC 10: BẢNG KẾT CỤC THỐNG KÊ -->
  <div class="sec-card" id="sec-4">
    <div class="sec-hdr">
      <div class="sec-title"><i class="fa-solid fa-chart-line"></i> 10. Chuỗi Bằng Chứng & Kết Cục Thống Kê</div>
    </div>
    <div class="sec-body">
      <div class="table-wrap">
        <table class="data-table trial-endpoints-table">
          <thead>
            <tr>
              <th>Điểm Kết Thúc (Endpoints)</th>
              <th>Empagliflozin Gộp (N=4,687)</th>
              <th>Giả Dược (N=2,333)</th>
              <th>Hazard Ratio (95% CI)</th>
              <th>p-value</th>
              <th>Ý Nghĩa Lâm Sàng</th>
            </tr>
          </thead>
          <tbody>
            <tr class="endpoint-primary">
              <td><strong>3-Point MACE (Kết cục chính)</strong></td>
              <td>490 (10.5%)</td>
              <td>282 (12.1%)</td>
              <td>0.86 (0.74–0.99)</td>
              <td><span class="p-val sig">p = 0.04</span></td>
              <td><span class="favors-exp">Giảm 14% biến cố gộp</span></td>
            </tr>
            <tr class="endpoint-secondary">
              <td><strong>Tử vong do Tim mạch</strong></td>
              <td>172 (3.7%)</td>
              <td>137 (5.9%)</td>
              <td>0.62 (0.49–0.77)</td>
              <td><span class="p-val sig">p &lt; 0.001</span></td>
              <td><span class="favors-exp">Giảm 38% tử vong TM</span></td>
            </tr>
            <tr class="endpoint-secondary">
              <td><strong>Nhập viện do Suy tim</strong></td>
              <td>126 (2.7%)</td>
              <td>95 (4.1%)</td>
              <td>0.65 (0.50–0.85)</td>
              <td><span class="p-val sig">p = 0.002</span></td>
              <td><span class="favors-exp">Giảm 35% nhập viện HF</span></td>
            </tr>
            <tr class="endpoint-secondary">
              <td><strong>Tử vong do Mọi nguyên nhân</strong></td>
              <td>269 (5.7%)</td>
              <td>194 (8.3%)</td>
              <td>0.68 (0.57–0.82)</td>
              <td><span class="p-val sig">p &lt; 0.001</span></td>
              <td><span class="favors-exp">Giảm 32% tử vong chung</span></td>
            </tr>
            <tr>
              <td><strong>Đột quỵ không tử vong</strong></td>
              <td>164 (3.5%)</td>
              <td>69 (3.0%)</td>
              <td>1.18 (0.89–1.56)</td>
              <td><span class="p-val ns">p = 0.26</span></td>
              <td><span class="favors-ctrl">Không có sự khác biệt</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- MỤC 13: THẨM ĐỊNH COCHRANE ROB 2.0 -->
  <div class="sec-card" id="sec-5">
    <div class="sec-hdr">
      <div class="sec-title"><i class="fa-solid fa-shield-halved"></i> 13. Thẩm Định Nguy Cơ Sai Lệch (Cochrane RoB 2.0)</div>
    </div>
    <div class="sec-body">
      <div class="rob-card">
        <div class="rob-header">
          <div class="rob-title"><i class="fa-solid fa-shield-halved"></i> Đánh Giá Nguy Cơ Sai Lệch (Cochrane RoB 2.0)</div>
          <span class="badge badge-rob"><i class="fa-solid fa-circle-check"></i> Rủi ro Sai lệch Tổng thể: THẤP</span>
        </div>
        <div class="rob-grid">
          <div class="rob-domain-card low-risk">
            <div class="rob-domain-title">D1: Ngẫu Nhiên Hóa</div>
            <div class="rob-status">Nguy cơ thấp</div>
            <div class="rob-desc">Hệ thống phân bổ ngẫu nhiên bằng máy tính trung tâm qua web tương tác, giấu mã phân bổ tuyệt đối.</div>
          </div>
          <div class="rob-domain-card low-risk">
            <div class="rob-domain-title">D2: Sai Lệch Can Thiệp</div>
            <div class="rob-status">Nguy cơ thấp</div>
            <div class="rob-desc">Làm mù đôi hoàn hảo giữa thuốc hoạt tính và viên giả dược tương đồng hình dáng.</div>
          </div>
          <div class="rob-domain-card low-risk">
            <div class="rob-domain-title">D3: Dữ Liệu Thiếu Hụt</div>
            <div class="rob-status">Nguy cơ thấp</div>
            <div class="rob-desc">Tỷ lệ mất dấu theo dõi cực thấp (&lt; 0.5%), 97% bệnh nhân hoàn tất theo dõi tình trạng sống còn.</div>
          </div>
          <div class="rob-domain-card low-risk">
            <div class="rob-domain-title">D4: Đo Lường Kết Cục</div>
            <div class="rob-status">Nguy cơ thấp</div>
            <div class="rob-desc">Hội đồng CEC độc lập làm mù hoàn toàn khi thẩm định và phân loại biến cố tim mạch.</div>
          </div>
          <div class="rob-domain-card low-risk">
            <div class="rob-domain-title">D5: Báo Cáo Chọn Lọc</div>
            <div class="rob-status">Nguy cơ thấp</div>
            <div class="rob-desc">Mọi kết cục đã đăng ký trước trên ClinicalTrials.gov đều được báo cáo minh bạch.</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- MỤC 16: PHÁN QUYẾT LÂM SÀNG -->
  <div class="sec-card" id="sec-6">
    <div class="sec-hdr">
      <div class="sec-title"><i class="fa-solid fa-gavel"></i> 16. Phán Quyết Lâm Sàng & Ứng Dụng Thực Hành</div>
    </div>
    <div class="sec-body">
      <div class="verdict-box practice-changing">
        <div class="verdict-badge"><i class="fa-solid fa-gavel"></i> PHÁN QUYẾT LÂM SÀNG: PRACTICE-CHANGING</div>
        <h4>Thử nghiệm mang tính bước ngoặt tái định hình toàn bộ hướng dẫn điều trị tim mạch - chuyển hóa toàn cầu</h4>
        <p>EMPA-REG OUTCOME đã phá vỡ ranh giới truyền thống: SGLT2i từ một nhóm thuốc hạ đường huyết đơn thuần đã trở thành liệu pháp bảo vệ tim mạch và thận cốt lõi. Kết quả này đã thúc đẩy hàng loạt nghiên cứu mở rộng sang suy tim (DAPA-HF, EMPEROR) và bệnh thận mạn (DAPA-CKD, EMPA-KIDNEY).</p>
        <div class="verdict-grid">
          <div><strong>Ứng dụng Guideline:</strong> Khuyến cáo Nhóm I (Mức độ A) trong các Hướng dẫn ESC, ADA, ACC/AHA và Bộ Y Tế.</div>
          <div><strong>Ý nghĩa thực tế:</strong> NNT = 39 khẳng định chi phí - hiệu quả vượt trội trong phòng ngừa thứ phát biến cố tim mạch.</div>
        </div>
      </div>
    </div>
  </div>

</div>
```

---

## 🛡️ 4. Quy Tắc Kiểm Định Chất Lượng Bắt Buộc

Trước khi bàn giao một bài Medical Research Card:
- [ ] Đủ 16 đầu mục theo đúng trình tự chuẩn.
- [ ] PICO phân rã rõ ràng dân số chọn vào/loại trừ và kết cục chính.
- [ ] Đủ số liệu định lượng: Cỡ mẫu $N$, tỷ lệ biến cố $\%$, HR kèm khoảng tin cậy 95% CI và $p$-value.
- [ ] Tính toán đầy đủ ARR và NNT cho các kết cục có ý nghĩa lâm sàng.
- [ ] Đánh giá đầy đủ 5 miền Cochrane RoB 2.0.
- [ ] Kết luận phải nằm trong phạm vi dữ liệu chứng minh (Bounded Claims).
- [ ] Không có ký tự `$` math LaTeX chưa được làm sạch.
