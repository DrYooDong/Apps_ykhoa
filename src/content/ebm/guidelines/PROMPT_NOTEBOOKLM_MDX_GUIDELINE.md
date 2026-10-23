# 📋 MASTER PROMPT NOTEBOOKLM — SOẠN BÀI TÓM TẮT GUIDELINE / LANDMARK RCT CHUẨN ASTRO MDX NATIVE
> **Phân Hệ**: Y Học Chứng Cứ — Kho Guidelines & Thử Nghiệm Lâm Sàng (`src/content/ebm/guidelines/kho-guidelines/`)  
> **Chuẩn Áp Dụng**: Astro MDX Native 2.0 (Gold Standard EBM Clinical Dashboard Suite)  
> **Tương Thích**: Google NotebookLM, Gemini 1.5/2.0 Pro, Claude 3.5 Sonnet, GPT-4o  

---

## 💡 HƯỚNG DẪN DÀNH CHO BÁC SĨ / BIÊN TẬP VIÊN

1. Tải tài liệu nguồn (PDF Hướng dẫn điều trị, Khuyến cáo CPG, hoặc Bài báo Thử nghiệm lâm sàng RCT gốc từ NEJM/Lancet/JAMA...) vào **Google NotebookLM**.
2. Sao chép toàn bộ phần **MẪU CÂU LỆNH (MASTER PROMPT)** bên dưới.
3. Thay thế các thông số trong dấu ngoặc vuông `[ ... ]` ở phần đầu prompt theo chủ đề cần soạn.
4. Dán vào ô Chat của NotebookLM và nhấn Gửi.
5. Khi nhận được kết quả:
   - Lưu nội dung thành file `src/content/ebm/guidelines/kho-guidelines/<slug>.mdx`.
   - Chạy lệnh kiểm định: `node .agents/skills/guideline-summary-module/scripts/qa_guideline.js --slug=<slug>` để kiểm tra chất lượng 8 điểm tự động.
   - Chạy lệnh đăng ký: `node .agents/skills/guideline-summary-module/scripts/register_guideline.js --slug=<slug> ...` để nạp vào hệ thống tra cứu CliniPortal.

---

## ═══════════════════════════════════════════════════════════════
## 📋 NỘI DUNG MASTER PROMPT (CHÉP TOÀN BỘ PHẦN BÊN DƯỚI VÀO NOTEBOOKLM)
## ═══════════════════════════════════════════════════════════════

```text
Bạn là Bác sĩ Chuyên khoa Cấp cao, Chuyên gia Y học Chứng cứ (EBM) và Kỹ sư Thiết kế Giao diện Lâm sàng (Clinical UI/UX Engineer) của hệ sinh thái CliniPortal.

Dựa DUY NHẤT và CHẶT CHẼ trên các tài liệu y văn đã tải lên trong Notebook này, hãy phân tích toàn diện và soạn thảo một bài tóm tắt lâm sàng hoàn chỉnh dưới dạng FILE NGUỒN ASTRO MDX NATIVE (.mdx) theo đúng quy chuẩn dưới đây.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 THÔNG SỐ ĐẦU VÀO CẦN SOẠN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Tên chủ đề / Hướng dẫn: [TÊN HƯỚNG DẪN HOẶC TÊN THỬ NGHIỆM LÂM SÀNG, ví dụ: Khuyến cáo Chẩn đoán và Điều trị Tăng Huyết Áp AHA/ACC 2025]
- Tên tiếng Anh chính thức: [TÊN TIẾNG ANH ĐẦY ĐỦ, ví dụ: 2025 AHA/ACC/AANP/AAPA Guideline for the Prevention, Detection, Evaluation and Management of High Blood Pressure in Adults]
- Tổ chức ban hành / Tạp chí: [VÍ DỤ: AHA / ACC hoặc ESC hoặc EASL hoặc NEJM]
- Năm ban hành: [NĂM, ví dụ: 2025]
- Chuyên khoa chính: [CHỌN 1 MÃ: cardio | pulmo | gi | endo | renal | neuro | infect | rheum | hema | onco | pedia | obgyn | icu]
- Loại tài liệu: [guideline (Hướng dẫn điều trị) HOẶC rct (Thử nghiệm lâm sàng bước ngoặt)]
- Tên slug file đề xuất: [year]-[org]-[topic] (chữ thường, gạch nối ASCII, ví dụ: 2025-aha-acc-hypertension hoặc 2026-easl-dili)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛑 CÁC NGUYÊN TẮC BẤT DI BẤT DỊCH (CRITICAL ANTI-HALLUCINATION & QA RULES):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. ⚠️ TUYỆT ĐỐI KHÔNG DÙNG KÝ TỰ $ CÔNG THỨC TOÁN LATEX:
   - CẤM VIẾT: $BMI \ge 25$, $ALT \ge 40$, $p < 0.05$, $95\% CI$, $\ge 150\text{ mg/dL}$.
   - BẮT BUỘC VIẾT KÝ TỰ UNICODE THUẦN: BMI ≥ 25, ALT ≥ 40, p < 0.05, 95% CI, ≥ 150 mg/dL, ≤, ±, ×, →, °, °C, µg, µmol/L.
2. ⚠️ BẢO TỒN 100% CÂN BẰNG THẺ HTML & CÚ PHÁP JSX:
   - Mọi thẻ mở <div>, <span>, <section>, <table>, <thead>, <tbody>, <tr>, <th>, <td>, <ul>, <li>, <strong>, <em> PHẢI có thẻ đóng tương ứng.
   - Không được lồng thẻ sai (ví dụ: cấm đặt <h3> hoặc tiêu đề bên trong .table-wrapper vì sẽ vỡ responsive trên điện thoại di động).
   - Viết trực tiếp ký tự <, >, &, " trong nội dung thẻ (không sinh entity kép như &amp;amp; hoặc &amp;lt;).
3. ⚠️ NÓI KHÔNG VỚI PLACEHOLDER & NỘI DUNG SƠ SÀI:
   - KHÔNG ĐƯỢC dùng các cụm từ lười biếng như "[Xem thêm trong tài liệu]", "[Điền tiếp]", "...".
   - Mọi khuyến cáo, liều dùng thuốc, thời gian duy trì, chỉ số ngưỡng, tiêu chuẩn chẩn đoán, giá trị p-value, HR (95% CI), NNT phải được trích xuất CHÍNH XÁC, CHI TIẾT TỪNG CON SỐ từ y văn nguồn.
4. ⚠️ ĐỊNH DẠNG XUẤT BẢN:
   - Chỉ xuất DUY NHẤT 01 khối mã ```mdx ... ``` hoàn chỉnh.
   - Không viết bất kỳ lời chào đầu hay đoạn văn bản giải thích nào ngoài khối mã.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏗️ BẢN THIẾT KẾ CẤU TRÚC FILE MDX (BLUEPRINT):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bài viết .mdx phải có đầy đủ 6 Khối Thành Phần theo đúng thứ tự sau:

---
[KHỐI 1]: FRONTMATTER YAML CHUẨN HOÁ (Đầy đủ 20+ trường dữ liệu)
---
id: "[slug]"
slug: "[slug]"
title: "[Tên Tiếng Việt Chuẩn]: [Tiêu Đề Phụ Súc Tích]"
titleEn: "[Tên Tiếng Anh Chính Thức]"
code: "GDL-[YEAR]-[ORG]-[TOPIC]"
organization: "[Tên Tổ Chức Ban Hành]"
journal: "[Tên Tạp Chí Xuất Bản / Nguồn]"
year: [NĂM_SỐ_NGUYÊN]
sourceType: "intl-guideline" # intl-guideline | intl-study | vn-moh | vn-doh | vn-association
specialty: "[MÃ CHUYÊN KHOA: cardio | pulmo | gi | endo | renal | neuro | infect | rheum | hema | onco | pedia | obgyn | icu]"
design: "guideline"          # guideline | rct | meta | cohort | review
impact: "practice-changing"  # practice-changing | informative | early-signal | negative | regulatory
cor: "I"                     # Khuyến cáo cao nhất trong tài liệu (I | IIa | IIb)
loe: "A"                     # Mức chứng cứ cao nhất (A | B-R | B-NR | C-LD | C-EO)
category: "guidelines"
status: "published"
version: "2.0.0"
updatedAt: "2026-10-23"
conditionKey: "[key bệnh lý, ví dụ: hypertension | heart-failure | masld-mash | copd | dili | stroke]"
icd10: ["[MÃ ICD-10 CHÍNH]", "[MÃ PHỤ NẾU CÓ]"]
drug: "[Danh sách hoạt chất/nhóm thuốc chính cách nhau bằng dấu phẩy]"
population: "[Quần thể bệnh nhân mục tiêu của hướng dẫn]"
intervention: "[Các can thiệp/phác đồ cốt lõi]"
description: "[Mô tả súc tích 150-180 ký tự tóm tắt chỉ định bản lề và mục tiêu điều trị]"
tags:
  - "[Tổ chức]"
  - "[Năm]"
  - "[Chuyên khoa]"
  - "[Tên bệnh]"
  - "Khuyến cáo lâm sàng"
  - "Evidence-Based Medicine"
keyRecommendations:
  - "[Khuyến cáo cốt lõi 1: Tiêu chuẩn chẩn đoán / ngưỡng chỉ số mới]"
  - "[Khuyến cáo cốt lõi 2: Chiến lược điều trị ưu tiên đầu tay (First-line)]"
  - "[Khuyến cáo cốt lõi 3: Biện pháp phối hợp hoặc can thiệp bậc 2]"
  - "[Khuyến cáo cốt lõi 4: Lưu ý an toàn, theo dõi tác dụng phụ hoặc chống chỉ định nguy kịch]"
sections:
  - id: "sec-1"
    number: 1
    title: "[Tên Mục 1: Định Nghĩa, Dịch Tễ & Phân Loại]"
    icon: "fa-solid fa-stethoscope"
  - id: "sec-2"
    number: 2
    title: "[Tên Mục 2: Tiêu Chuẩn Chẩn Đoán & Thang Điểm Lượng Giá]"
    icon: "fa-solid fa-calculator"
  - id: "sec-3"
    number: 3
    title: "[Tên Mục 3: Chiến Lược Điều Trị & Phác Đồ Dược Lý]"
    icon: "fa-solid fa-pills"
  - id: "sec-4"
    number: 4
    title: "[Tên Mục 4: Lưu Đồ Thuật Toán Xử Trí Lâm Sàng]"
    icon: "fa-solid fa-diagram-project"
  - id: "sec-5"
    number: 5
    title: "[Tên Mục 5: Tình Huống Đặc Biệt & Dân Số Dễ Tổn Thương]"
    icon: "fa-solid fa-triangle-exclamation"
  - id: "sec-6"
    number: 6
    title: "[Tên Mục 6: Kế Hoạch Theo Dõi, Tiên Lượng & Tài Liệu Tham Khảo]"
    icon: "fa-solid fa-book-medical"
---

---
[KHỐI 2]: DẢI CHỈ SỐ THEN CHỐT (.stats-strip) & 3 TRỤ CỘT (.pillars)
---
<div class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val green">[Chỉ số/Mốc 1, ví dụ: ≥ 7.5% hoặc FIB-4 < 1.30]</div>
      <div class="stat-lbl">[Ý nghĩa lâm sàng ngắn gọn]</div>
    </div>
    <div class="stat-card">
      <div class="stat-val blue">[Chỉ số/Mốc 2, ví dụ: SPC 2 Nhóm hoặc Giảm 38% Tử vong]</div>
      <div class="stat-lbl">[Chiến lược can thiệp ưu tiên]</div>
    </div>
    <div class="stat-card">
      <div class="stat-val amber">[Chỉ số/Mốc 3, ví dụ: NNT = 39 hoặc eGFR < 30]</div>
      <div class="stat-lbl">[Ngưỡng cảnh báo / Hiệu quả can thiệp]</div>
    </div>
    <div class="stat-card">
      <div class="stat-val red">[Chỉ số/Mốc 4, ví dụ: Cấm Phối Hợp RAAS hoặc RDN Class IIb]</div>
      <div class="stat-lbl">[Chống chỉ định nguy kịch / Cảnh báo an toàn]</div>
    </div>
  </div>
</div>

<div class="pillars">
  <div class="pillars-inner">
    <div class="pillar p1">
      <div class="pillar-icon">🎯</div>
      <div>
        <div class="pillar-title">[Trụ Cột 1: Chẩn đoán & Phân Tầng]</div>
        <div class="pillar-desc">[Tóm tắt điểm cốt lõi chẩn đoán, thang điểm hoặc ngưỡng sàng lọc trong 1-2 câu]</div>
      </div>
    </div>
    <div class="pillar p2">
      <div class="pillar-icon">⚖️</div>
      <div>
        <div class="pillar-title">[Trụ Cột 2: Khởi Trị & Phối Hợp]</div>
        <div class="pillar-desc">[Tóm tắt phác đồ can thiệp đầu tay, liều lượng và thời điểm khởi trị trong 1-2 câu]</div>
      </div>
    </div>
    <div class="pillar p3">
      <div class="pillar-icon">🛡️</div>
      <div>
        <div class="pillar-title">[Trụ Cột 3: An Toàn & Mục Tiêu Đích]</div>
        <div class="pillar-desc">[Tóm tắt mục tiêu kiểm soát, theo dõi biến chứng và nguyên tắc tránh gây hại trong 1-2 câu]</div>
      </div>
    </div>
  </div>
</div>

---
[KHỐI 3]: THANH ĐIỀU HƯỚNG NHANH (.quickmenu)
---
<div class="quickmenu" id="quickmenu">
  <div class="quickmenu-inner">
    <a href="#sec-1" class="quickmenu-item active">1. [Tiêu đề Mục 1]</a>
    <a href="#sec-2" class="quickmenu-item">2. [Tiêu đề Mục 2]</a>
    <a href="#sec-3" class="quickmenu-item">3. [Tiêu đề Mục 3]</a>
    <a href="#sec-4" class="quickmenu-item">4. [Tiêu đề Mục 4]</a>
    <a href="#sec-5" class="quickmenu-item">5. [Tiêu đề Mục 5]</a>
    <a href="#sec-6" class="quickmenu-item">6. [Tiêu đề Mục 6]</a>
  </div>
</div>

---
[KHỐI 4]: NỘI DUNG CHÍNH (<div class="page-content">) GỒM CÁC SECTION CARDS
---
<div class="page-content">

  <!-- MỤC 1: ĐỊNH NGHĨA & PHÂN LOẠI -->
  <div class="sec-card" id="sec-1">
    <div class="sec-hdr">
      <span class="sec-hdr-icon">🔬</span>
      <h2 class="sec-title">1. Định Nghĩa, Dịch Tễ & Phân Loại Lâm Sàng</h2>
    </div>
    <div class="sec-body">
      <div class="infobox info">
        <span class="infobox-icon">💡</span>
        <div>
          <strong>Điểm mới then chốt trong định nghĩa & phân loại:</strong>
          [Mô tả chi tiết những thay đổi mang tính bước ngoặt của guideline so với phiên bản trước].
        </div>
      </div>

      <div class="updates-grid">
        <div class="update-card">
          <div class="update-card-accent" style="background: #0284c7;"></div>
          <div class="update-card-header">
            <div class="update-card-icon" style="background: rgba(2, 132, 199, 0.1); color: #0284c7;">📊</div>
            <div class="update-card-title">[Phân Nhóm / Thể Bệnh A]</div>
          </div>
          <div class="update-card-body">
            <ul style="margin-left: 1rem; line-height: 1.7;">
              <li><strong>Đặc điểm nhận diện:</strong> [Chi tiết lâm sàng & sinh học]</li>
              <li><strong>Tỷ lệ & Ý nghĩa:</strong> [Dữ liệu dịch tễ cụ thể]</li>
              <li><strong>Mục tiêu:</strong> [Đích kiểm soát]</li>
            </ul>
          </div>
          <div class="update-verdict verdict-blue">[Phổ biến / Ưu tiên sàng lọc]</div>
        </div>

        <div class="update-card">
          <div class="update-card-accent" style="background: #f59e0b;"></div>
          <div class="update-card-header">
            <div class="update-card-icon" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b;">⚡</div>
            <div class="update-card-title">[Phân Nhóm / Thể Bệnh B]</div>
          </div>
          <div class="update-card-body">
            <ul style="margin-left: 1rem; line-height: 1.7;">
              <li><strong>Đặc điểm nhận diện:</strong> [Chi tiết lâm sàng & sinh học]</li>
              <li><strong>Nguy cơ:</strong> [Tỷ lệ biến cố / tiến triển nặng]</li>
              <li><strong>Can thiệp:</strong> [Chiến lược đặc thù]</li>
            </ul>
          </div>
          <div class="update-verdict verdict-amber">[Cần giám sát chặt]</div>
        </div>
      </div>
    </div>
  </div>

  <!-- MỤC 2: TIÊU CHUẨN CHẨN ĐOÁN & THANG ĐIỂM -->
  <div class="sec-card" id="sec-2">
    <div class="sec-hdr">
      <span class="sec-hdr-icon">📐</span>
      <h2 class="sec-title">2. Tiêu Chuẩn Chẩn Đoán & Thang Điểm Lượng Giá Nguy Cơ</h2>
    </div>
    <div class="sec-body">
      <div class="infobox warning">
        <span class="infobox-icon">⚠️</span>
        <div>
          <strong>Cảnh báo chẩn đoán:</strong> [Nguyên tắc chẩn đoán loại trừ hoặc các bẫy lâm sàng thường gặp].
        </div>
      </div>

      <!-- BẢNG TIÊU CHUẨN CHẨN ĐOÁN HOẶC THANG ĐIỂM -->
      <div class="table-card">
        <div class="table-header">
          <div class="table-title">
            <i class="fa-solid fa-calculator"></i> Bảng 1. Tiêu Chuẩn Phân Tầng Nguy Cơ & Lượng Giá Lâm Sàng
          </div>
          <span class="table-badge"><i class="fa-solid fa-square-check"></i> Tiêu chuẩn vàng</span>
        </div>
        <div class="table-wrapper">
          <table class="diagnostic-table">
            <thead>
              <tr>
                <th style="width: 25%;">Thông Số / Tiêu Chí</th>
                <th style="width: 50%;">Giá Trị Ngưỡng & Biểu Hiện Lâm Sàng</th>
                <th style="width: 25%;">Ý Nghĩa / Điểm Số</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="source-cell"><strong>[Tiêu chí 1]</strong></td>
                <td>[Chi tiết ngưỡng cắt, ví dụ: SBP ≥ 140 mmHg hoặc eGFR < 60 mL/min/1.73m²]</td>
                <td><span class="score-badge score-pos">Nguy cơ Cao</span></td>
              </tr>
              <tr>
                <td class="source-cell"><strong>[Tiêu chí 2]</strong></td>
                <td>[Chi tiết ngưỡng cắt]</td>
                <td><span class="score-badge score-neu">Nguy cơ Vừa</span></td>
              </tr>
              <tr class="total-row">
                <td colspan="2"><strong>KẾT LUẬN & ĐỊNH HƯỚNG XỬ TRÍ</strong></td>
                <td><strong>[Ngưỡng kích hoạt điều trị ngay]</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- MỤC 3: CHIẾN LƯỢC ĐIỀU TRỊ & PHÁC ĐỒ DƯỢC LÝ -->
  <div class="sec-card" id="sec-3">
    <div class="sec-hdr">
      <span class="sec-hdr-icon">💊</span>
      <h2 class="sec-title">3. Chiến Lược Điều Trị & Phác Đồ Dược Lý Cụ Thể</h2>
    </div>
    <div class="sec-body">

      <!-- CÁC KHUNG KHUYẾN CÁO COR / LOE -->
      <div class="rec-card cor-1">
        <div class="rec-header">
          <span class="badge-cor-1"><i class="fa-solid fa-circle-check"></i> CLASS I (MẠNH / CHỈ ĐỊNH ĐẦU TAY)</span>
          <span class="badge-loe-a"><i class="fa-solid fa-layer-group"></i> LOE A</span>
        </div>
        <div class="rec-body">
          [Nội dung khuyến cáo mạnh nhất, đối tượng chỉ định rõ ràng, bằng chứng lâm sàng ủng hộ lợi ích vượt trội so với nguy cơ].
        </div>
      </div>

      <div class="rec-card cor-2a">
        <div class="rec-header">
          <span class="badge-cor-2a"><i class="fa-solid fa-circle-info"></i> CLASS IIa (NÊN CHỈ ĐỊNH)</span>
          <span class="badge-loe-b"><i class="fa-solid fa-layer-group"></i> LOE B-R</span>
        </div>
        <div class="rec-body">
          [Nội dung khuyến cáo mức trung bình, các biện pháp bổ trợ hoặc điều trị thay thế].
        </div>
      </div>

      <div class="rec-card cor-3">
        <div class="rec-header">
          <span class="badge-cor-3"><i class="fa-solid fa-triangle-exclamation"></i> CLASS III: NGUY HẠI (HARM / CẤM CHỈ ĐỊNH)</span>
          <span class="badge-loe-a"><i class="fa-solid fa-layer-group"></i> LOE A</span>
        </div>
        <div class="rec-body">
          <strong>CẤM CHỈ ĐỊNH:</strong> [Hành vi kê đơn nguy hại, phối hợp thuốc gây biến chứng nặng nề hoặc can thiệp không có lợi ích].
        </div>
      </div>

      <!-- BẢNG PHÁC ĐỒ LIỀU LƯỢNG CHI TIẾT (.regimen-table) -->
      <div class="table-card" style="margin-top: 1.5rem;">
        <div class="table-header">
          <div class="table-title">
            <i class="fa-solid fa-pills"></i> Bảng 2. Danh Mục Thuốc, Liều Khởi Đầu, Liều Tối Đa & Lưu Ý Thực Chiến
          </div>
          <span class="table-badge"><i class="fa-solid fa-prescription-bottle-medical"></i> Phác đồ dược lý</span>
        </div>
        <div class="table-wrapper">
          <table class="regimen-table">
            <thead>
              <tr>
                <th style="width: 22%;">Nhóm / Hoạt Chất</th>
                <th style="width: 25%;">Liều Khởi Đầu</th>
                <th style="width: 23%;">Liều Đích / Tối Đa</th>
                <th style="width: 30%;">Lưu Ý An Toàn & Chỉnh Liều</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="source-cell">
                  <span class="rx-tag preferred">Đầu tay</span>
                  <strong>[Tên Thuốc 1]</strong>
                </td>
                <td>[Liều, đường dùng, tần suất]</td>
                <td>[Liều tối đa/ngày]</td>
                <td>[Theo dõi xét nghiệm, chức năng thận/gan, tác dụng phụ]</td>
              </tr>
              <tr>
                <td class="source-cell">
                  <span class="rx-tag alternative">Phối hợp</span>
                  <strong>[Tên Thuốc 2]</strong>
                </td>
                <td>[Liều, đường dùng, tần suất]</td>
                <td>[Liều tối đa/ngày]</td>
                <td>[Lưu ý tương tác thuốc, chống chỉ định]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>

  <!-- MỤC 4: LƯU ĐỒ THUẬT TOÁN XỬ TRÍ -->
  <div class="sec-card" id="sec-4">
    <div class="sec-hdr">
      <span class="sec-hdr-icon">🗺️</span>
      <h2 class="sec-title">4. Lưu Đồ Quyết Định Điều Trị & Thuật Toán Phân Nhánh Lâm Sàng</h2>
    </div>
    <div class="sec-body">
      <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 1.25rem;">
        Quy trình xử trí nấc thang theo từng bước đánh giá đáp ứng lâm sàng:
      </p>

      <!-- CLINICAL FLOW TRACK 2.0 -->
      <div class="flow-track-container">
        <!-- Bước 1 -->
        <div class="flow-track-step">
          <div class="flow-track-rail">
            <div class="flow-track-marker marker-blue">01</div>
            <div class="flow-track-line"></div>
          </div>
          <div class="flow-track-content accent-blue">
            <div class="flow-step-header">
              <div class="flow-step-title"><i class="fa-solid fa-stethoscope" style="color: #0284c7;"></i> Bước 1: Tiếp Nhận & Khởi Trị Ban Đầu</div>
              <span class="flow-step-badge flow-badge-blue">Khởi đầu</span>
            </div>
            <div class="flow-step-text">
              [Mô tả tiêu chuẩn chẩn đoán xác định, xét nghiệm cơ bản cần làm ngay và biện pháp can thiệp đầu tay].
            </div>
          </div>
        </div>

        <!-- Bước 2: Rẽ Nhánh Quyết Định -->
        <div class="flow-track-step">
          <div class="flow-track-rail">
            <div class="flow-track-marker marker-teal">02</div>
            <div class="flow-track-line"></div>
          </div>
          <div class="flow-track-content accent-teal">
            <div class="flow-step-header">
              <div class="flow-step-title"><i class="fa-solid fa-code-branch" style="color: #0d9488;"></i> Bước 2: Đánh Giá Đáp Ứng Sau [Khoảng Thời Gian, ví dụ: 4–12 Tuần]</div>
              <span class="flow-step-badge flow-badge-amber">Phân nhánh</span>
            </div>
            <div class="flow-step-text">
              <div class="flow-branch-grid">
                <div class="flow-branch-card accent-green">
                  <div class="flow-branch-title" style="color: #047857;"><i class="fa-solid fa-circle-check"></i> Nhánh 1: Đạt Mục Tiêu Kiểm Soát</div>
                  <div class="flow-branch-desc">[Duy trì liều hiện tại, theo dõi định kỳ mỗi 3–6 tháng].</div>
                </div>
                <div class="flow-branch-card accent-rose">
                  <div class="flow-branch-title" style="color: #be123c;"><i class="fa-solid fa-triangle-exclamation"></i> Nhánh 2: Chưa Đạt Mục Tiêu / Kháng Trị</div>
                  <div class="flow-branch-desc">[Nâng bậc liều, bổ sung nhóm thuốc thứ 2 hoặc thứ 3, tầm soát nguyên nhân thứ phát].</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bước 3 -->
        <div class="flow-track-step">
          <div class="flow-track-rail">
            <div class="flow-track-marker marker-purple">03</div>
          </div>
          <div class="flow-track-content accent-purple">
            <div class="flow-step-header">
              <div class="flow-step-title"><i class="fa-solid fa-shield-halved" style="color: #7c3aed;"></i> Bước 3: Kiểm Soát Kháng Trị & Can Thiệp Chuyên Sâu</div>
              <span class="flow-step-badge flow-badge-purple">Nâng cao</span>
            </div>
            <div class="flow-step-text">
              [Phác đồ bậc 4, chỉ định hội chẩn chuyên khoa sâu hoặc can thiệp thủ thuật].
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- MỤC 5: TÌNH HUỐNG ĐẶC BIỆT -->
  <div class="sec-card" id="sec-5">
    <div class="sec-hdr">
      <span class="sec-hdr-icon">🛡️</span>
      <h2 class="sec-title">5. Xử Trí Tình Huống Lâm Sàng Đặc Biệt & Nhóm Nguy Cơ Cao</h2>
    </div>
    <div class="sec-body">
      <div class="updates-grid">
        <div class="update-card">
          <div class="update-card-accent" style="background: #ef4444;"></div>
          <div class="update-card-header">
            <div class="update-card-icon" style="background: rgba(239, 68, 68, 0.1); color: #ef4444;">🚨</div>
            <div class="update-card-title">[Tình Huống 1: Suy Thận / Bệnh Thận Mạn (CKD)]</div>
          </div>
          <div class="update-card-body">
            <p style="font-size: 0.9rem; line-height: 1.6;">
              [Hướng dẫn điều chỉnh liều theo eGFR, các thuốc an toàn và thuốc chống chỉ định].
            </p>
          </div>
          <div class="update-verdict verdict-red">[Nguy cơ tích lũy độc tính]</div>
        </div>

        <div class="update-card">
          <div class="update-card-accent" style="background: #8b5cf6;"></div>
          <div class="update-card-header">
            <div class="update-card-icon" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6;">🤰</div>
            <div class="update-card-title">[Tình Huống 2: Phụ Nữ Mang Thai / Cho Con Bú]</div>
          </div>
          <div class="update-card-body">
            <p style="font-size: 0.9rem; line-height: 1.6;">
              [Thuốc lựa chọn đầu tay an toàn và danh sách thuốc tuyệt đối cấm do quái thai].
            </p>
          </div>
          <div class="update-verdict verdict-purple">[Bảo vệ thai kỳ]</div>
        </div>

        <div class="update-card">
          <div class="update-card-accent" style="background: #0284c7;"></div>
          <div class="update-card-header">
            <div class="update-card-icon" style="background: rgba(2, 132, 199, 0.1); color: #0284c7;">👴</div>
            <div class="update-card-title">[Tình Huống 3: Người Cao Tuổi / Suy Giảm Thể Trạng]</div>
          </div>
          <div class="update-card-body">
            <p style="font-size: 0.9rem; line-height: 1.6;">
              [Chiến lược khởi trị liều thấp, tăng liều từ từ, phòng ngừa tụt huyết áp tư thế].
            </p>
          </div>
          <div class="update-verdict verdict-blue">[Khởi trị thận trọng]</div>
        </div>
      </div>
    </div>
  </div>

  <!-- MỤC 6: THEO DÕI & TÀI LIỆU THAM KHẢO -->
  <div class="sec-card" id="sec-6">
    <div class="sec-hdr">
      <span class="sec-hdr-icon">📋</span>
      <h2 class="sec-title">6. Kế Hoạch Theo Dõi, Tiêu Chuẩn Xuất Viện & Tài Liệu Tham Khảo</h2>
    </div>
    <div class="sec-body">
      <div class="infobox success">
        <span class="infobox-icon">✅</span>
        <div>
          <strong>Bảng kiểm an toàn lâm sàng & Lịch theo dõi:</strong>
          <ul style="margin: 0.5rem 0 0 1.2rem; line-height: 1.6;">
            <li><strong>Lịch tái khám:</strong> [Thời gian tái khám định kỳ sau khởi trị / chỉnh liều].</li>
            <li><strong>Xét nghiệm giám sát:</strong> [Các chỉ số cận lâm sàng cần kiểm tra lại].</li>
            <li><strong>Dấu hiệu cảnh báo nguy hiểm:</strong> [Các triệu chứng khiến bệnh nhân phải tái khám cấp cứu ngay].</li>
          </ul>
        </div>
      </div>

      <!-- CITATION BOX (AMA FORMAT) -->
      <div class="citation-box" style="margin-top: 1.5rem;">
        <strong>Trích dẫn tài liệu tham khảo chính thức (AMA Format):</strong><br />
        1. [Tác giả chính], et al. [Tên Guideline chính thức]. <em>[Tên Tạp chí viết tắt]</em>. [Năm];[Tập]([Số]):[Trang]. doi:[Mã DOI].
      </div>
    </div>
  </div>

</div>

---
[KHỐI 5]: ĐIỀU HƯỚNG CHÂN TRANG (.btn-row)
---
<div style="margin-top: 1.5rem;">
  <div class="btn-row">
    <a href="#/ebm/kho-guidelines" class="btn btn-primary">
      <i class="fa-solid fa-arrow-left"></i> Quay lại Kho Guidelines
    </a>
    <a href="#sec-1" class="btn">
      <i class="fa-solid fa-arrow-up"></i> Lên đầu trang
    </a>
  </div>
</div>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔬 BỔ SUNG ĐẶC BIỆT KHI SOẠN THỬ NGHIỆM LÂM SÀNG TRỌNG ĐIỂM (LANDMARK RCT):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NẾU tài liệu nguồn là một bài báo RCT / Landmark Study (như NEJM, Lancet, JAMA):
- Tại Mục 2: Thêm Khung PICO Bento Grid (.pico-bento-grid với 4 ô: Population, Intervention, Comparison, Outcome).
- Tại Mục 3: Dùng Bảng Biến Cố Điểm Kết Thúc (.trial-endpoints-table) có đầy đủ các cột: Biến Cố Kết Cục | Can Thiệp n/N (%) | Đối Chứng n/N (%) | Thống Kê (HR, 95% CI) | p-value | Ưu Thế.
- Tại Mục 5: Thêm Thẻ Đánh Giá Sai Lệch Cochrane RoB 2.0 (.rob-card với 5 miền D1 đến D5: Ngẫu nhiên hóa, Sai lệch can thiệp, Dữ liệu thiếu hụt, Đo lường kết cục, Báo cáo chọn lọc).
- Tại Mục 6: Thêm Hộp Phán Quyết Lâm Sàng (.verdict-box.practice-changing) đúc kết giá trị thay đổi thực hành và NNT.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 HÃY BẮT ĐẦU SOẠN BÀI VIẾT .MDX HOÀN CHỈNH NGAY BÂY GIỜ!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Chỉ xuất DUY NHẤT một khối code ```mdx ... ``` chứa toàn bộ nội dung từ Frontmatter đến Chân trang.
```

---

## ⚡ LỆNH TIẾP TỤC KHI BỊ DỪNG NGANG (DO GIỚI HẠN TOKEN CỦA NOTEBOOKLM)

Nếu NotebookLM dừng lại giữa chừng do chạm giới hạn token độ dài của câu trả lời, hãy gửi ngay câu lệnh sau vào ô chat:

> **"tiếp tục viết tiếp đoạn mã MDX từ đúng vị trí vừa dừng, không lặp lại đoạn trước, đảm bảo đóng đầy đủ các thẻ HTML mở và giữ nguyên cấu trúc CSS classes."**

---

## 🛠️ CÁC BƯỚC XỬ LÝ SAU KHI NHẬN KẾT QUẢ TỪ NOTEBOOKLM

Sau khi sao chép toàn bộ khối code `.mdx` từ NotebookLM về máy tính:

### 1. Lưu file
Lưu nội dung vào đường dẫn:
```text
src/content/ebm/guidelines/kho-guidelines/<slug>.mdx
```

### 2. Chạy Cổng Kiểm Định Tự Động 8 Điểm (8-Point Quality Gate)
Mở terminal trong IDE và chạy lệnh:
```bash
node .agents/skills/guideline-summary-module/scripts/qa_guideline.js --slug=<slug>
```
*Script sẽ tự động quét: Kích thước file, Frontmatter YAML, Sạch 100% ký tự math `$`, cân bằng thẻ HTML, liên kết hình ảnh, khử trùng HTML entities.*

### 3. Đăng ký Guideline vào Registry Tập Trung
Chạy script tự động cập nhật `kho-guidelines-registry.ts` và `guidelinesdata.ts`:
```bash
node .agents/skills/guideline-summary-module/scripts/register_guideline.js \
  --slug="<slug>" \
  --title="[Tên Tiếng Việt Chuẩn]" \
  --titleEn="[Tên Tiếng Anh]" \
  --org="[Tổ Chức]" \
  --year=[Năm] \
  --specialty="[cardio | pulmo | gi | endo | renal | neuro | infect | ...]" \
  --sourceType="intl-guideline" \
  --design="guideline" \
  --impact="practice-changing" \
  --conditionKey="[key bệnh lý]" \
  --icd10="[Mã ICD-10]" \
  --summary="[Tóm tắt súc tích 2-3 câu]" \
  --intervention="[Can thiệp cốt lõi]"
```

Sau bước này, bài viết đã sẵn sàng xuất bản trên giao diện Kho Guidelines EBM của CliniPortal!
