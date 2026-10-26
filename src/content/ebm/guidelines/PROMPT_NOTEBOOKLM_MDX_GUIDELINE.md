# 📋 MASTER PROMPT NOTEBOOKLM — SOẠN BÀI TÓM TẮT GUIDELINE / LANDMARK RCT CHUẨN ASTRO MDX NATIVE
> **Phân Hệ**: Y Học Chứng Cứ — Kho Guidelines & Thử Nghiệm Lâm Sàng (`src/content/ebm/guidelines/kho-guidelines/`)  
> **Chuẩn Áp Dụng**: Astro MDX Native 2.0 (Gold Standard EBM Clinical Dashboard Suite)  
> **Tương Thích**: Google NotebookLM, Gemini 1.5/2.0 Pro, Claude 3.5 Sonnet, GPT-4o  
> **Cải Tiến Bản 2.5**: Tự động nhận diện & bám sát 100% khung trình bày bố cục, mục lục và các chương mục của tài liệu nguồn được chọn.

---

## 💡 HƯỚNG DẪN DÀNH CHO BÁC SĨ / BIÊN TẬP VIÊN

1. **Chọn tài liệu trong NotebookLM**: Tải tài liệu nguồn (PDF Hướng dẫn điều trị CPG, Quyết định Bộ Y Tế, Báo cáo Đồng thuận, hoặc Bài báo RCT gốc) vào Google NotebookLM. Trong danh sách **Sources**, hãy **tích chọn đúng tài liệu cần soạn**.
2. **Sao chép toàn bộ Master Prompt**: Chép phần nội dung trong khung code bên dưới.
3. **Điền thông số (nếu có)**: Thay thế các thông số trong ngoặc vuông `[ ... ]` ở đầu prompt (Năm, Chuyên khoa, Slug...).
   - *Mẹo về bố cục*: Để trống mục `[KHUNG BỐ CỤC...]` nếu muốn NotebookLM **tự động quét và tái hiện theo đúng Mục lục (Table of Contents)** của tài liệu gốc. Hoặc bạn có thể dán sẵn dàn ý các chương/phần mong muốn nếu muốn chỉ định rõ.
4. **Dán vào ô Chat của NotebookLM và nhấn Gửi**.
5. **Khi nhận được kết quả**:
   - Lưu nội dung thành file `src/content/ebm/guidelines/kho-guidelines/<slug>.mdx`.
   - Chạy lệnh kiểm định: `node .agents/skills/guideline-summary-module/scripts/qa_guideline.js --slug=<slug>` để kiểm tra chất lượng 8 điểm tự động.
   - Chạy lệnh đăng ký: `node .agents/skills/guideline-summary-module/scripts/register_guideline.js --slug=<slug> ...` để nạp vào hệ thống tra cứu CliniPortal.

---

## ═══════════════════════════════════════════════════════════════
## 📋 NỘI DUNG MASTER PROMPT (CHÉP TOÀN BỘ PHẦN BÊN DƯỚI VÀO NOTEBOOKLM)
## ═══════════════════════════════════════════════════════════════

```text
Bạn là Bác sĩ Chuyên khoa Cấp cao, Chuyên gia Y học Chứng cứ (EBM) và Kỹ sư Thiết kế Giao diện Lâm sàng (Clinical UI/UX Engineer) của hệ sinh thái CliniPortal.

Dựa DUY NHẤT và CHẶT CHẼ trên tài liệu y văn ĐƯỢC CHỌN trong Notebook này, hãy phân tích toàn diện và soạn thảo một bài tóm tắt lâm sàng hoàn chỉnh dưới dạng FILE NGUỒN ASTRO MDX NATIVE (.mdx) theo đúng quy chuẩn dưới đây:
- Năm ban hành: [NĂM, ví dụ: 2025 hoặc 2026]
- Chuyên khoa chính: [CHỌN 1 MÃ: cardio | pulmo | gi | endo | renal | neuro | infect | rheum | hema | onco | pedia | obgyn | icu | derma | nutri | allergy]
- Chuyên khoa phụ (specialty2 — BẮT BUỘC nếu là bài liên chuyên khoa): [CHỌN MÃ: icu | infect | gi | pulmo | renal | derma... hoặc để trống nếu thuần túy 1 chuyên khoa]
  * 🚨 Nhóm ICU ⟷ Truyền nhiễm (Sepsis, Sốc nhiễm khuẩn, Kháng sinh ICU, Nấm xâm lấn): icu + infect
  * 🫁 Nhóm Tiêu hóa ⟷ Truyền nhiễm (Viêm gan B/C/A, Tiêu chảy nhiễm trùng, Viêm dạ dày ruột, IAI): gi + infect
  * 🚨 Nhóm Tiêu hóa ⟷ Hồi sức cấp cứu ICU (Suy gan cấp ALF, XHTH trên sốc mất máu, Viêm tụy cấp nặng, DILI): gi + icu
  * 🫁 Nhóm Hô hấp ⟷ ICU / Truyền nhiễm (ARDS nằm sấp, SCAP nặng: icu + pulmo; Viêm phổi CAP, Lao: pulmo + infect)
  * 🩹 Nhóm Da liễu ⟷ Truyền nhiễm (Nhiễm trùng da mô mềm SSTI, Bệnh lậu, Giang mai): infect + derma
  * 💧 Nhóm Thận ⟷ Truyền nhiễm / ICU (Nhiễm trùng niệu UTI: renal + infect; Tăng kali máu nặng: renal + icu)
- Loại tài liệu: [guideline (Hướng dẫn điều trị quốc tế) | byt (Hướng dẫn Bộ Y Tế) | consensus (Báo cáo đồng thuận) | rct (Thử nghiệm lâm sàng bước ngoặt)]
- Tên slug file đề xuất: [year]-[org]-[topic] (chữ thường, gạch nối ASCII, ví dụ: 2025-aha-acc-hypertension hoặc 2026-ash-iron-deficiency-diagnosis)
- Bố cục chương mục mong muốn: [ĐỂ TRỐNG ĐỂ AI TỰ ĐỘNG QUÉT THEO MỤC LỤC GỐC CỦA TÀI LIỆU; HOẶC DÁN DANH SÁCH CHƯƠNG MỤC CẦN SOẠN NẾU MUỐN CHỈ ĐỊNH]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 NGUYÊN TẮC CỐT LÕI: BÁM SÁT 100% KHUNG TRÌNH BÀY & BỐ CỤC CỦA TÀI LIỆU NGUỒN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Khác với các bản tóm tắt thông thường, bài viết của CliniPortal PHẢI PHẢN ÁNH CHÍNH XÁC cấu trúc tư duy và cách tổ chức chương mục của tài liệu gốc:

1. BƯỚC 1: QUÉT & TRÍCH XUẤT KHUNG ĐỀ MỤC GỐC (SOURCE TABLE OF CONTENTS):
   - Trước khi tạo nội dung, bạn PHẢI đọc kỹ Mục lục (Table of Contents), các Chương / Phần chính (Chapters, Sections, Recommendation Modules, Clinical Questions) của tài liệu y văn được chọn.
   - Xác định số lượng mục lớn ($N$ mục, linh hoạt từ 4 đến 8+ mục tùy độ dài và tính chất tài liệu gốc).
   - TUYỆT ĐỐI KHÔNG ép buộc tài liệu vào một khung 6 mục cứng nhắc giả định. Ví dụ:
     * Nếu tài liệu gốc có 5 chương lớn (như ASH ID) ➔ Tạo đúng 5 sections tương ứng.
     * Nếu tài liệu có 7-8 lĩnh vực lâm sàng (như SSC Sepsis hay KDIGO CKD) ➔ Tạo đúng 7-8 sections tương ứng.
     * Nếu tài liệu là Quyết định Bộ Y Tế ➔ Đi theo đúng trình tự: 1. Đại cương & Dịch tễ; 2. Lâm sàng & Cận lâm sàng; 3. Chẩn đoán & Phân loại; 4. Điều trị & Phác đồ thuốc; 5. Tiêu chuẩn chuyển tuyến / Nhập viện; 6. Phòng bệnh & Quản lý.
     * Nếu tài liệu là Landmark RCT ➔ Đi theo cấu trúc nghiên cứu: 1. Bối cảnh & Mục tiêu; 2. Thiết kế nghiên cứu & Quần thể PICO; 3. Kết quả Kết cục Chính & Phụ (Endpoints); 4. Phân tích Phân nhóm & An toàn; 5. Thẩm định Phương pháp Cochrane RoB 2.0 & Ý nghĩa Thực hành Lâm sàng.

2. BƯỚC 2: BẢO TOÀN TRÌNH TỰ & MẠCH TƯ DUY TỰ NHIÊN CỦA TÁC GIẢ:
   - Các mục lớn phải mang tiêu đề tiếng Việt chuẩn xác, súc tích, phản ánh đúng tên chương/phần gốc trong tài liệu kèm số thứ tự (ví dụ: "1. Định Nghĩa & Chuẩn Hóa Ngưỡng Ferritin", "2. Đánh Giá Thiếu Sắt Trong Bối Cảnh Viêm Mạn Tính", ...).
   - Mục cuối cùng (Section N) LUÔN dành cho: "Kế Hoạch Theo Dõi, Tiên Lượng & Trích Dẫn Y Văn Chuẩn AMA".

3. BƯỚC 3: ĐỒNG BỘ TUYỆT ĐỐI 3 VỊ TRÍ TRONG FILE MDX:
   - (A) Trường `sections:` trong Frontmatter YAML: Khai báo đầy đủ $N$ mục (`sec-1`, `sec-2`, ..., `sec-N`) với `id`, `number`, `title` và `icon` FontAwesome thích hợp.
   - (B) Thanh điều hướng nhanh `<div class="quickmenu">`: Chứa đúng $N$ thẻ `<a href="#sec-1">`, ..., `<a href="#sec-N">` đồng bộ 100% với Frontmatter.
   - (C) Nội dung chính `<div class="page-content">`: Chứa đúng $N$ khối `<div class="sec-card" id="sec-1">` đến `<div class="sec-card" id="sec-N">`.

4. BƯỚC 4: ỨNG DỤNG BỘ CÔNG CỤ LINH KIỆN UI CHUẨN CLINIPORTAL (UI COMPONENT TOOLKIT):
   - Bên trong mỗi `sec-card`, không dùng văn bản trần trụi (plain text). BẮT BUỘC căn cứ vào tính chất của nội dung tài liệu nguồn để ứng dụng linh hoạt các linh kiện UI lâm sàng:
     * Khuyến cáo phân tầng (COR/LOE hoặc GRADE) ➔ Thẻ khuyến cáo `.rec-card` (`cor-1`, `cor-2a`, `cor-2b`, `cor-3`).
     * Tiêu chuẩn chẩn đoán, ngưỡng cắt, bảng điểm ➔ Bảng `.table-card` với `.diagnostic-table`.
     * Danh mục thuốc, liều khởi đầu, liều đích, chỉnh liều ➔ Bảng `.table-card` với `.regimen-table` và các nhãn `.rx-tag`.
     * Thuật toán, các bước tiếp cận, quy trình rẽ nhánh ➔ Lưu đồ `.flow-track-container` với `.flow-branch-grid`.
     * Phân nhóm đối tượng, thể bệnh, tình huống đặc biệt ➔ Lưới thẻ `.updates-grid` với các `.update-card`.
     * Điểm nhấn quan trọng, bẫy lâm sàng, cảnh báo an toàn ➔ Khung `.infobox` (`info`, `warning`, `danger`, `success`).
     * Trích dẫn tài liệu tham khảo ➔ Khung `.citation-box` ở section cuối cùng.

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
🏗️ BẢN THIẾT KẾ CẤU TRÚC FILE MDX (BLUEPRINT LINH HOẠT THEO TÀI LIỆU NGUỒN):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bài viết .mdx hoàn chỉnh bao gồm 5 Khối theo đúng thứ tự sau:

---
[KHỐI 1]: FRONTMATTER YAML CHUẨN HOÁ (Đầy đủ 20+ trường dữ liệu)
---
id: "[slug]"
slug: "[slug]"
title: "[Tên Tiếng Việt Chuẩn]: [Tiêu Đề Phụ Súc Tích]"
titleEn: "[Tên Tiếng Anh Chính Thức Của Tài Liệu]"
code: "GDL-[YEAR]-[ORG]-[TOPIC]"
organization: "[Tên Tổ Chức Ban Hành, ví dụ: AHA/ACC, ESC, KDIGO, EASL, ASH, Bộ Y Tế]"
journal: "[Tên Tạp Chí Xuất Bản / Nguồn Chính Thức]"
year: [NĂM_SỐ_NGUYÊN]
sourceType: "intl-guideline" # intl-guideline | intl-study | vn-moh | vn-doh | vn-association
specialty: "[MÃ CHUYÊN KHOA CHÍNH: cardio | pulmo | gi | endo | renal | neuro | infect | rheum | hema | onco | pedia | obgyn | icu | derma | nutri]"
specialty2: "[MÃ CHUYÊN KHOA PHỤ NẾU CÓ: icu | infect | gi | pulmo | renal | derma... (bỏ dòng này nếu thuần túy 1 chuyên khoa)]"
design: "guideline"          # guideline | rct | meta | cohort | review | consensus
impact: "practice-changing"  # practice-changing | informative | early-signal | negative | regulatory
cor: "I"                     # Khuyến cáo cao nhất trong tài liệu (I | IIa | IIb)
loe: "A"                     # Mức chứng cứ cao nhất (A | B-R | B-NR | C-LD | C-EO)
category: "guidelines"
status: "published"
version: "2.0.0"
updatedAt: "2026-10-26"
conditionKey: "[key bệnh lý, ví dụ: hypertension | heart-failure | masld-mash | copd | dili | iron-deficiency | sepsis]"
icd10: ["[MÃ ICD-10 CHÍNH]", "[MÃ PHỤ NẾU CÓ]"]
drug: "[Danh sách hoạt chất/thuốc chính được đề cập, cách nhau bằng dấu phẩy]"
population: "[Quần thể bệnh nhân mục tiêu của hướng dẫn]"
intervention: "[Các can thiệp/phác đồ cốt lõi được khuyến nghị]"
description: "[Mô tả súc tích 150-180 ký tự tóm tắt chỉ định bản lề và mục tiêu điều trị]"
tags:
  - "[Tổ chức ban hành]"
  - "[Năm ban hành]"
  - "[Chuyên khoa]"
  - "[Tên bệnh lý]"
  - "Khuyến cáo lâm sàng"
  - "Evidence-Based Medicine"
keyRecommendations:
  - "[Khuyến cáo then chốt 1: Tiêu chuẩn chẩn đoán / ngưỡng chỉ số mới từ tài liệu nguồn]"
  - "[Khuyến cáo then chốt 2: Chiến lược điều trị ưu tiên đầu tay (First-line) từ tài liệu nguồn]"
  - "[Khuyến cáo then chốt 3: Biện pháp phối hợp hoặc can thiệp bậc 2 từ tài liệu nguồn]"
  - "[Khuyến cáo then chốt 4: Lưu ý an toàn, theo dõi tác dụng phụ hoặc chống chỉ định từ tài liệu nguồn]"
# SECTIONS PHẢI ĐƯỢC SINH ĐỘNG THEO ĐÚNG MỤC LỤC & BỐ CỤC CHƯƠNG CỦA TÀI LIỆU NGUỒN ($N$ mục linh hoạt, không cố định):
sections:
  - id: "sec-1"
    number: 1
    title: "[Tiêu đề Chương/Phần 1 của tài liệu nguồn]"
    icon: "fa-solid fa-stethoscope"
  - id: "sec-2"
    number: 2
    title: "[Tiêu đề Chương/Phần 2 của tài liệu nguồn]"
    icon: "fa-solid fa-calculator"
  - id: "sec-3"
    number: 3
    title: "[Tiêu đề Chương/Phần 3 của tài liệu nguồn]"
    icon: "fa-solid fa-pills"
  - id: "sec-4"
    number: 4
    title: "[Tiêu đề Chương/Phần 4 của tài liệu nguồn]"
    icon: "fa-solid fa-diagram-project"
  # ... Thêm tiếp sec-5, sec-6... bám sát theo đúng các chương mục tiếp theo của tài liệu gốc ...
  - id: "sec-N"
    number: N
    title: "[Tiêu đề Chương/Phần cuối cùng: Kế Hoạch Theo Dõi & Tài Liệu Tham Khảo]"
    icon: "fa-solid fa-book-medical"
---

---
[KHỐI 2]: DẢI CHỈ SỐ THEN CHỐT (.stats-strip) & 3 TRỤ CỘT CỐT LÕI (.pillars)
---
<!-- 4 Chỉ số / Ngưỡng cắt / Mốc số liệu nổi bật nhất rút ra từ tài liệu nguồn -->
<div class="stats-strip">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-val green">[Chỉ số/Mốc 1 từ tài liệu nguồn, ví dụ: Ferritin ≤ 20 ng/mL hoặc SBP < 120 mmHg]</div>
      <div class="stat-lbl">[Ý nghĩa lâm sàng / Ngưỡng quyết định ngắn gọn]</div>
    </div>
    <div class="stat-card">
      <div class="stat-val blue">[Chỉ số/Mốc 2 từ tài liệu nguồn, ví dụ: TSAT < 20% hoặc SPC 2 Nhóm Đầu Tay]</div>
      <div class="stat-lbl">[Chiến lược can thiệp ưu tiên / Tiêu chuẩn vàng]</div>
    </div>
    <div class="stat-card">
      <div class="stat-val amber">[Chỉ số/Mốc 3 từ tài liệu nguồn, ví dụ: Ferritin ≤ 50 ng/mL hoặc Giảm 38% Biến cố]</div>
      <div class="stat-lbl">[Ngưỡng mở rộng / Hiệu quả can thiệp cốt lõi]</div>
    </div>
    <div class="stat-card">
      <div class="stat-val red">[Chỉ số/Mốc 4 từ tài liệu nguồn, ví dụ: Cấm Phối Hợp RAAS hoặc Cảnh Báo An Toàn]</div>
      <div class="stat-lbl">[Chống chỉ định nguy kịch / Cảnh báo độc tính]</div>
    </div>
  </div>
</div>

<!-- 3 Trụ Cột Đúc Kết 3 Thông Điệp Cốt Lõi Của Tài Liệu Nguồn -->
<div class="pillars">
  <div class="pillars-inner">
    <div class="pillar p1">
      <div class="pillar-icon">🎯</div>
      <div>
        <div class="pillar-title">[Trụ Cột 1: Thông điệp then chốt về Chẩn đoán / Phân loại của tài liệu]</div>
        <div class="pillar-desc">[Tóm tắt điểm cốt lõi về chẩn đoán, ngưỡng xét nghiệm hoặc phân tầng nguy cơ trong 1-2 câu]</div>
      </div>
    </div>
    <div class="pillar p2">
      <div class="pillar-icon">⚖️</div>
      <div>
        <div class="pillar-title">[Trụ Cột 2: Thông điệp then chốt về Điều trị / Can thiệp của tài liệu]</div>
        <div class="pillar-desc">[Tóm tắt phác đồ can thiệp đầu tay, phối hợp thuốc hoặc chiến lược xử trí trong 1-2 câu]</div>
      </div>
    </div>
    <div class="pillar p3">
      <div class="pillar-icon">🛡️</div>
      <div>
        <div class="pillar-title">[Trụ Cột 3: Thông điệp then chốt về An toàn / Theo dõi của tài liệu]</div>
        <div class="pillar-desc">[Tóm tắt mục tiêu kiểm soát, phòng ngừa biến chứng hoặc cảnh báo nguy cơ trong 1-2 câu]</div>
      </div>
    </div>
  </div>
</div>

---
[KHỐI 3]: THANH ĐIỀU HƯỚNG NHANH (.quickmenu)
---
<!-- Phải đồng bộ 100% với số lượng N mục và tiêu đề trong sections: của Frontmatter -->
<div class="quickmenu" id="quickmenu">
  <div class="quickmenu-inner">
    <a href="#sec-1" class="quickmenu-item active">1. [Tiêu đề ngắn Mục 1]</a>
    <a href="#sec-2" class="quickmenu-item">2. [Tiêu đề ngắn Mục 2]</a>
    <a href="#sec-3" class="quickmenu-item">3. [Tiêu đề ngắn Mục 3]</a>
    <a href="#sec-4" class="quickmenu-item">4. [Tiêu đề ngắn Mục 4]</a>
    <!-- Thêm các nút liên kết tương ứng với các mục tiếp theo nếu có: -->
    <!-- <a href="#sec-5" class="quickmenu-item">5. [Tiêu đề ngắn Mục 5]</a> -->
    <!-- ... -->
    <a href="#sec-N" class="quickmenu-item">N. [Tiêu đề ngắn Mục N]</a>
  </div>
</div>

---
[KHỐI 4]: BỘ CÔNG CỤ LINH KIỆN UI & NỘI DUNG CHÍNH (<div class="page-content">)
---
Bọc toàn bộ trong `<div class="page-content">`.
Tạo lần lượt đúng $N$ khối `<div class="sec-card" id="sec-1">` đến `<div class="sec-card" id="sec-N">` tương ứng với $N$ chương/mục lớn của tài liệu nguồn.

Dưới đây là BẢNG MẪU CẤU TRÚC VÀ BỘ LINH KIỆN UI CHUẨN CLINIPORTAL ĐỂ BẠN ÁP DỤNG VÀO TỪNG SECTION:

────────────────────────────────────────────────────────────────
A. MẪU CẤU TRÚC CHUẨN CỦA MỖI SECTION CARD:
────────────────────────────────────────────────────────────────
<div class="sec-card" id="sec-X">
  <div class="sec-hdr">
    <span class="sec-hdr-icon">[Icon Emoji hoặc FontAwesome phù hợp]</span>
    <h2 class="sec-title">X. [Tiêu Đề Chương/Mục Của Tài Liệu Nguồn]</h2>
    <span class="sec-badge">[Nhãn phụ nếu có, ví dụ: Điểm mới 2026 | Khuyến cáo then chốt | Tiêu chuẩn vàng]</span>
  </div>
  <div class="sec-body">
    <!-- Nội dung chi tiết của chương/mục này, sử dụng các linh kiện UI dưới đây -->
  </div>
</div>

────────────────────────────────────────────────────────────────
B. THƯ VIỆN LINH KIỆN UI (CHỌN LINH KIỆN PHÙ HỢP CHO TỪNG DẠNG NỘI DUNG):
────────────────────────────────────────────────────────────────

1. KHUNG CHÚ THÍCH & CẢNH BÁO (.infobox):
Dùng khi nêu bật thay đổi cốt lõi, bẫy lâm sàng hoặc nguyên tắc quan trọng.
```html
<div class="infobox info">
  <span class="infobox-icon">💡</span>
  <div>
    <strong>[Tiêu đề điểm nhấn / Điểm mới cốt lõi]:</strong>
    [Nội dung giải thích chi tiết trích từ tài liệu nguồn].
  </div>
</div>

<!-- Dùng warning khi cảnh báo cạm bẫy hoặc nguy cơ: -->
<div class="infobox warning">
  <span class="infobox-icon">⚠️</span>
  <div>
    <strong>Cảnh báo lâm sàng:</strong> [Nguyên tắc phòng tránh sai sót hoặc lưu ý chẩn đoán].
  </div>
</div>
```

2. THẺ KHUYẾN CÁO PHÂN TẦNG EBM (.rec-card):
BẮT BUỘC dùng khi tài liệu có khuyến cáo điều trị / can thiệp gắn phân tầng (COR/LOE hoặc GRADE).
```html
<!-- KHUYẾN CÁO MẠNH (CLASS I / GRADE STRONG) -->
<div class="rec-card cor-1">
  <div class="rec-header">
    <span class="badge-cor-1"><i class="fa-solid fa-circle-check"></i> CLASS I (MẠNH / CHỈ ĐỊNH ĐẦU TAY)</span>
    <span class="badge-loe-a"><i class="fa-solid fa-layer-group"></i> LOE A</span>
  </div>
  <div class="rec-body">
    [Nội dung khuyến cáo mạnh nhất, đối tượng chỉ định rõ ràng, bằng chứng lâm sàng ủng hộ lợi ích vượt trội].
  </div>
</div>

<!-- KHUYẾN CÁO TRUNG BÌNH (CLASS IIa / CONDITIONAL) -->
<div class="rec-card cor-2a">
  <div class="rec-header">
    <span class="badge-cor-2a"><i class="fa-solid fa-circle-info"></i> CLASS IIa (NÊN CHỈ ĐỊNH)</span>
    <span class="badge-loe-b"><i class="fa-solid fa-layer-group"></i> LOE B-R</span>
  </div>
  <div class="rec-body">
    [Nội dung khuyến cáo mức trung bình, các biện pháp bổ trợ hoặc điều trị thay thế].
  </div>
</div>

<!-- CHỐNG CHỈ ĐỊNH NGUY HẠI (CLASS III / DO NOT DO) -->
<div class="rec-card cor-3">
  <div class="rec-header">
    <span class="badge-cor-3"><i class="fa-solid fa-triangle-exclamation"></i> CLASS III: NGUY HẠI (HARM / CẤM CHỈ ĐỊNH)</span>
    <span class="badge-loe-a"><i class="fa-solid fa-layer-group"></i> LOE A</span>
  </div>
  <div class="rec-body">
    <strong>CẤM CHỈ ĐỊNH:</strong> [Hành vi kê đơn nguy hại, phối hợp thuốc gây biến chứng nặng hoặc can thiệp không có lợi ích].
  </div>
</div>
```

3. BẢNG TIÊU CHUẨN CHẨN ĐOÁN / PHÂN TẦNG NGUY CƠ (.diagnostic-table):
Dùng khi tài liệu có bảng chỉ số, ngưỡng cắt, tiêu chuẩn chẩn đoán, hoặc thang điểm.
```html
<div class="table-card">
  <div class="table-header">
    <div class="table-title">
      <i class="fa-solid fa-calculator"></i> [Tên Bảng Tiêu Chuẩn / Phân Tầng Trích Từ Tài Liệu]
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
          <td>[Giá trị ngưỡng cụ thể trích từ tài liệu gốc]</td>
          <td><span class="score-badge score-pos">Nguy cơ Cao</span></td>
        </tr>
        <tr>
          <td class="source-cell"><strong>[Tiêu chí 2]</strong></td>
          <td>[Giá trị ngưỡng cụ thể]</td>
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
```

4. BẢNG DANH MỤC THUỐC & PHÁC ĐỒ LIỀU DƯỢC LÝ (.regimen-table):
Dùng khi tài liệu cung cấp hướng dẫn dùng thuốc, liều khởi đầu, liều đích và chỉnh liều.
```html
<div class="table-card" style="margin-top: 1.5rem;">
  <div class="table-header">
    <div class="table-title">
      <i class="fa-solid fa-pills"></i> [Tên Bảng Phác Đồ Liều Dược Lý Chi Tiết]
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
          <td>[Liều lượng, đường dùng, tần suất dùng cụ thể]</td>
          <td>[Liều tối đa/ngày hoặc đích chuẩn độ]</td>
          <td>[Theo dõi eGFR, chức năng gan, tương tác thuốc]</td>
        </tr>
        <tr>
          <td class="source-cell">
            <span class="rx-tag alternative">Phối hợp</span>
            <strong>[Tên Thuốc 2]</strong>
          </td>
          <td>[Liều, đường dùng, tần suất]</td>
          <td>[Liều tối đa]</td>
          <td>[Chống chỉ định, lưu ý an toàn lâm sàng]</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

5. LƯU ĐỒ THUẬT TOÁN QUYẾT ĐỊNH & PHÂN NHÁNH LÂM SÀNG (.flow-track-container):
Dùng khi tài liệu có sơ đồ tiếp cận, thuật toán từng bước hoặc quy trình rẽ nhánh điều trị.
```html
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
        [Mô tả tiêu chuẩn chẩn đoán, xét nghiệm cần làm ngay và can thiệp đầu tay].
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
        [Phác đồ bậc cao, chỉ định hội chẩn chuyên khoa sâu hoặc can thiệp thủ thuật].
      </div>
    </div>
  </div>
</div>
```

6. LƯỚI THẺ PHÂN NHÓM, THỂ BỆNH HOẶC TÌNH HUỐNG ĐẶC BIỆT (.updates-grid):
Dùng khi tài liệu phân loại các thể bệnh lâm sàng, hoặc hướng dẫn xử trí trên các đối tượng đặc biệt (suy thận, thai kỳ, người cao tuổi, bệnh đồng mắc...).
```html
<div class="updates-grid">
  <div class="update-card">
    <div class="update-card-accent" style="background: #ef4444;"></div>
    <div class="update-card-header">
      <div class="update-card-icon" style="background: rgba(239, 68, 68, 0.1); color: #ef4444;">🚨</div>
      <div class="update-card-title">[Tình Huống 1 / Thể Bệnh A, ví dụ: Suy Thận / CKD]</div>
    </div>
    <div class="update-card-body">
      <ul style="margin-left: 1rem; line-height: 1.7;">
        <li><strong>Đặc điểm nhận diện:</strong> [Chi tiết lâm sàng & sinh học]</li>
        <li><strong>Điều chỉnh liều:</strong> [Quy tắc chỉnh liều theo eGFR hoặc cân nặng]</li>
        <li><strong>Chống chỉ định:</strong> [Các thuốc tuyệt đối cấm dùng]</li>
      </ul>
    </div>
    <div class="update-verdict verdict-red">[Nguy cơ tích lũy độc tính]</div>
  </div>

  <div class="update-card">
    <div class="update-card-accent" style="background: #8b5cf6;"></div>
    <div class="update-card-header">
      <div class="update-card-icon" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6;">🤰</div>
      <div class="update-card-title">[Tình Huống 2 / Thể Bệnh B, ví dụ: Thai Kỳ & Cho Con Bú]</div>
    </div>
    <div class="update-card-body">
      <ul style="margin-left: 1rem; line-height: 1.7;">
        <li><strong>Thuốc an toàn:</strong> [Thuốc được phép chỉ định trong thai kỳ]</li>
        <li><strong>Thuốc cấm:</strong> [Thuốc gây quái thai / độc tính cho thai nhi]</li>
      </ul>
    </div>
    <div class="update-verdict verdict-purple">[Bảo vệ thai kỳ]</div>
  </div>
</div>
```

7. HỘP TRÍCH DẪN TÀI LIỆU THAM KHẢO CHUẨN AMA (.citation-box):
BẮT BUỘC đặt ở cuối Section cuối cùng (Section N).
```html
<div class="citation-box" style="margin-top: 1.5rem;">
  <strong>Trích dẫn tài liệu tham khảo chính thức (AMA Format):</strong><br />
  1. [Tên các tác giả chính / Tổ chức ban hành]. [Tên Hướng dẫn / Bài báo chính thức]. <em>[Tên Tạp chí viết tắt]</em>. [Năm];[Tập]([Số]):[Trang]. doi:[Mã DOI hoặc URL nguồn].
</div>
```

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
- Tại Mục Thiết kế nghiên cứu: Thêm Khung PICO Bento Grid (.pico-bento-grid với 4 ô: Population, Intervention, Comparison, Outcome).
- Tại Mục Kết quả: Dùng Bảng Biến Cố Điểm Kết Thúc (.trial-endpoints-table) có đầy đủ các cột: Biến Cố Kết Cục | Can Thiệp n/N (%) | Đối Chứng n/N (%) | Thống Kê (HR, 95% CI) | p-value | Ưu Thế.
- Tại Mục Thẩm định phương pháp: Thêm Thẻ Đánh Giá Sai Lệch Cochrane RoB 2.0 (.rob-card với 5 miền D1 đến D5: Ngẫu nhiên hóa, Sai lệch can thiệp, Dữ liệu thiếu hụt, Đo lường kết cục, Báo cáo chọn lọc).
- Tại Mục Kết luận: Thêm Hộp Phán Quyết Lâm Sàng (.verdict-box.practice-changing) đúc kết giá trị thay đổi thực hành và NNT.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 HÃY BẮT ĐẦU SOẠN BÀI VIẾT .MDX HOÀN CHỈNH NGAY BÂY GIỜ!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hãy rà soát kỹ Mục lục & Bố cục của tài liệu nguồn được chọn, xác định $N$ chương mục cốt lõi, và chỉ xuất DUY NHẤT một khối code ```mdx ... ``` chứa toàn bộ nội dung từ Frontmatter đến Chân trang.
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
