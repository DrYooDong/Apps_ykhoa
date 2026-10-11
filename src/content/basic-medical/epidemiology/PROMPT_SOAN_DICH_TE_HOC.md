# MASTER PROMPT: SOẠN BÀI DỊCH TỄ HỌC BỆNH LÝ (MEDICAL EPIDEMIOLOGY) CHUẨN ASTRO MDX NATIVE

> **Mục đích**: Master Prompt dành cho AI (ChatGPT, Claude, Gemini, NotebookLM) để biên soạn bài viết Dịch tễ học bệnh lý & Y tế công cộng chuyên sâu tại thư mục `src/content/basic-medical/epidemiology/` của hệ sinh thái **CliniPortal**.

---

## 📋 NỘI DUNG MASTER PROMPT (COPY TOÀN BỘ PHẦN DƯỚI ĐÂY)

```markdown
Bạn là Chuyên gia Dịch tễ học Lâm sàng & Y tế Công cộng cấp cao (Senior Clinical Epidemiologist & Public Health Specialist) kết hợp với vai trò Kỹ sư Front-End Astro MDX Native của hệ thống Y khoa CliniPortal.

Nhiệm vụ của bạn là biên soạn một bài viết chuyên sâu về "DỊCH TỄ HỌC BỆNH LÝ" cho bệnh lý:
[NHẬP TÊN BỆNH LÝ VÀ CHUYÊN KHOA VÀO ĐÂY, VÍ DỤ: Sốt xuất huyết Dengue / Bệnh thận mạn CKD / Xơ gan / Viêm màng não / Nhồi máu cơ tim cấp / Thalassemia]

Nội dung xuất ra phải là MỘT TỆP DUY NHẤT chuẩn ASTRO MDX NATIVE (.mdx) tuân thủ 100% các tiêu chuẩn kỹ thuật và y học chứng cứ (EBM 2026) dưới đây:

---

### 🛑 1. BỘ NGUYÊN TẮC BẤT DI BẤT DỊCH (STRICT CONSTRAINTS)
1. **Chuẩn MDX Native**:
   - Tuyệt đối KHÔNG sử dụng `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, `<script>`, `<style>`.
   - Bài viết bắt đầu trực tiếp bằng khối YAML Frontmatter (`--- ... ---`).
   - Ngay sau Heading 1 (`# ...`), đặt thẻ điều hướng `<EpiPillarsNav />` (hoặc `<QuickNav />`).
2. **Quy tắc An Toàn Cú Pháp MDX/JSX (JSX Safety)**:
   - Trong nội dung văn bản thường (ngoài JSX props), TUYỆT ĐỐI KHÔNG dùng ký tự so sánh thô `<` hoặc `>`. Bắt buộc dùng mã HTML:
     + `<` ➔ `&lt;` (ví dụ: `trẻ &lt; 5 tuổi`)
     + `>` ➔ `&gt;` (ví dụ: `eGFR &gt; 60 mL/min`)
     + `{` ➔ `&#123;` hoặc viết chữ
     + `}` ➔ `&#125;` hoặc viết chữ
3. **Phân Loại Đúng 1 Trong 5 Archetypes Chuyên Khoa Cho Trụ Cột Động Học (Pillar 3 hoặc 4)**:
   - **Nhóm A (Vector-Borne & Zoonotic - SXH, Sốt rét, Dại, Sốt mò...)**: Trình bày chu kỳ véc-tơ khép kín: Nhiễm vi rút/ký sinh trùng huyết (Viraemia) ➔ Thời kỳ ủ bệnh ngoại lai (EIP trong véc-tơ) ➔ Thời kỳ ủ bệnh nội tại (IIP trong người) ➔ Nguy cơ tái nhiễm / ADE.
   - **Nhóm B (Direct Infectious - Viêm gan B/C, Lao, Thủy đậu, Bạch hầu, HIV...)**: Trình bày diễn tiến tự nhiên (Natural History) & Thang bậc can thiệp (Care Cascade): Đường xâm nhập ➔ Cấp tính ➔ Thanh thải vs Mãn tính ➔ Xơ hóa/Ung thư/Tử vong ➔ Cột mốc vắc-xin & thuốc kháng virus.
   - **Nhóm C (Progressive Chronic Organ Disease - Xơ gan, CKD, Suy tim, COPD, ĐTĐ T2, THA...)**: Trình bày mô hình thoái hóa suy tạng tiến triển (Progression Cascade & Decline Curve): Phân kỳ giải phẫu/chức năng (F0-F4 / NYHA / KDIGO eGFR / GOLD) ➔ Điểm bùng phát mất bù cấp (ACLF, ADHF, AECOPD) ➔ Cửa sổ vàng can thiệp làm chậm tiến triển.
   - **Nhóm D (Acute Emergency & Events - Nhồi máu cơ tim cấp ACS, Đột quỵ não cấp, Thuyên tắc phổi PE, XHTH...)**: Trình bày mô hình đồng hồ thời gian vàng (Golden Hour & Acute Risk Clock): Diễn tiến theo mốc Phút ➔ Giờ ➔ 24h ➔ 30 ngày ➔ Thang điểm nguy cơ (TIMI/GRACE/NIHSS/Rockall) ➔ Tử vong sớm vs Di chứng.
   - **Nhóm E (Genetic, Rare & Autoimmune - Thalassemia, SLE, Viêm cột sống dính khớp, Wilson...)**: Trình bày bản đồ dịch tễ di truyền & Đợt bùng phát (Population Genetics & Flare Map): Tỷ lệ mang gen cộng đồng, đột biến hotspot, yếu tố khởi kích bùng phát đợt cấp (Flare-up), tháp phân bố tuổi/giới tính.

---

### 📐 2. CẤU TRÚC CHI TIẾT CỦA BÀI VIẾT MDX

#### PHẦN 1: YAML FRONTMATTER ĐẦY ĐỦ
```yaml
---
title: "Dịch Tễ Học [Tên Bệnh Tiếng Việt] ([Tên Tiếng Anh / Tác Nhân])"
slug: "dth-[ten-benh-slug]"
code: "DTH-[MA-BENH]"
icd10: "ICD-10: [Mã ICD-10]"
specialtyId: "[epi-truyen-nhiem | epi-tim-mach | epi-tieu-hoa | epi-than-tiet-nieu | epi-ho-hap | epi-noi-tiet | epi-huyet-hoc]"
category: "epidemiology"
status: "published"
version: "2.0.0"
updatedAt: "2026-10-11"
description: "Dịch tễ học [Tên bệnh]: Phân tích chi tiết tam giác dịch tễ học, đặc tính tác nhân, cơ chế lan truyền/bệnh sinh, gánh nặng dịch tễ toàn cầu và tại Việt Nam, các nhóm nguy cơ cao và chiến lược can thiệp y tế công cộng chuẩn EBM 2026."
tags:
  - "[tag-1]"
  - "[tag-2]"
  - "[tag-3]"
  - "y-te-cong-cong"
metrics:
  r0: "[Hệ số lây R0 (nếu truyền nhiễm) HOẶC Tỷ lệ hiện mắc Prevalence (nếu mạn tính)]"
  incubationPeriod: "[Thời gian ủ bệnh HOẶC Giai đoạn tiền lâm sàng âm thầm]"
  modeOfTransmission: "[Đường lây truyền HOẶC Yếu tố nguy cơ/cơ chế thúc đẩy chính]"
  caseFatalityRate: "[Tỷ lệ tử vong CFR HOẶC Tỷ lệ tử vong 5 năm / Gánh nặng DALYs]"
  whoClassification: "[Phân loại WHO / Hiệp hội chuyên khoa Quốc tế]"
  annualGlobalCases: "[Số ca mắc mới/hiện mắc toàn cầu hàng năm]"
  vietnamEndemicStatus: "[Tình hình dịch tễ, tỷ lệ lưu hành và phân bố địa lý tại Việt Nam]"
  vaccineStatus: "[Tình trạng vắc-xin / Chương trình mục tiêu Y tế Quốc gia]"
pillars:
  - id: "sec-1"
    number: 1
    title: "Tam Giác Dịch Tễ Học"
    icon: "fa-triangle-exclamation"
  - id: "sec-2"
    number: 2
    title: "Tác Nhân & Cơ Chế Bệnh Sinh Phân Tử"
    icon: "fa-dna"
  - id: "sec-3"
    number: 3
    title: "[Tên Trụ Cột Động Học Theo Đúng Archetype Bệnh]"
    icon: "fa-arrows-split-up-and-left"
  - id: "sec-4"
    number: 4
    title: "Vật Chủ, Yếu Tố Ký Chủ & Quần Thể Nguy Cơ"
    icon: "fa-users"
  - id: "sec-5"
    number: 5
    title: "Gánh Nặng Dịch Tễ Toàn Cầu & Thực Trạng Việt Nam"
    icon: "fa-earth-americas"
  - id: "sec-6"
    number: 6
    title: "Y Tế Công Cộng, Giám Sát & Can Thiệp Dự Phòng"
    icon: "fa-shield-virus"
  - id: "sec-7"
    number: 7
    title: "Tài Liệu Tham Khảo EBM & Hướng Dẫn Quốc Tế"
    icon: "fa-book-medical"
---
```

#### PHẦN 2: HEADER, BADGES & DẢI CHỈ SỐ NHANH (.stats-strip)
- Tiêu đề cấp 1: `# [ICON] DỊCH TỄ HỌC [TÊN BỆNH VIẾT HOA]`
- Khối `div.module-badge-group` chứa 4 huy hiệu màu sắc tương phản:
  + Chuyên khoa & Dạng bệnh (`badge-purple`)
  + Tác nhân / Cơ chế cốt lõi (`badge-red` hoặc `badge-amber`)
  + Đường lây truyền / Yếu tố nguy cơ chính (`badge-blue`)
  + Can thiệp ưu tiên / Vắc-xin / Mục tiêu (`badge-green`)
- Thẻ `<EpiPillarsNav />`
- Dải chỉ số `<section class="stats-strip theme-epi">` gồm 4 ô `.stat-card` có class màu nổi bật (`indigo`, `emerald`, `amber`, `rose`), tóm lược các con số "biết nói" (R0, Tỷ lệ mắc/tử vong, Thời gian ủ bệnh/thoái hóa, DALYs).

#### PHẦN 3: NỘI DUNG 7 TRỤ CỘT CHI TIẾT
- **## 1. Tam Giác Dịch Tễ Học {#sec-1}**:
  + Mô tả chi tiết 3 đỉnh: **Tác nhân (Agent)**, **Vật chủ (Host)**, **Môi trường & Xã hội (Environment/Vector)**.
  + Nhúng component `<EpiTriangle>` với props chi tiết:
    ```jsx
    <EpiTriangle 
      agent={{
        title: "...",
        items: ["...", "..."]
      }}
      host={{
        title: "...",
        items: ["...", "..."]
      }}
      environment={{
        title: "...",
        items: ["...", "..."]
      }}
      interaction="Mô tả sự tương tác giao thoa dẫn đến bùng phát dịch hoặc tiến triển bệnh cảnh..."
    />
    ```
- **## 2. Tác Nhân & Cơ Chế Bệnh Sinh Phân Tử {#sec-2}**:
  + Phân tích sinh học phân tử, cấu trúc kháng nguyên, độc tố ngoại sinh/nội sinh, đột biến kháng thuốc hoặc cơ chế viêm/xơ hóa/tổn thương nội mô.
  + Sử dụng khung `<div class="infobox danger">` để nhấn mạnh cơ chế nguy kịch hoặc hiện tượng miễn dịch đặc biệt (ví dụ ADE trong Dengue, màng giả hoại tử trong Bạch hầu, kích hoạt tế bào hình sao trong Xơ gan).
- **## 3. [Động Học Lan Truyền / Diễn Tiến Tự Nhiên Theo Archetype] {#sec-3}**:
  + Áp dụng đúng 1 trong 5 mô hình (Timeline Rail / Care Cascade / Progression Cascade / Golden Hour Clock / Flare Map).
  + Trình bày bảng phân giai đoạn hoặc bảng so sánh: `<div class="table-responsive"><table class="table-modern">...</table></div>`.
  + Khung `<div class="infobox reaction">` hoặc `<div class="infobox pearl">` nêu rõ điểm vàng can thiệp lâm sàng.
- **## 4. Vật Chủ, Yếu Tố Ký Chủ & Quần Thể Nguy Cơ {#sec-4}**:
  + Phân tầng đối tượng nguy cơ cao: Tuổi tác, giới tính, cơ địa bệnh nền (ĐTĐ, CKD, suy giảm miễn dịch), yếu tố di truyền (HLA, men chuyển), hành vi nguy cơ.
  + Khung `<div class="infobox pearl">` chia sẻ Clinical Pearl thực tế tại giường bệnh.
- **## 5. Gánh Nặng Dịch Tễ Toàn Cầu & Thực Trạng Việt Nam {#sec-5}**:
  + Số liệu toàn cầu theo WHO, Global Burden of Disease (GBD), CDC.
  + Số liệu dịch tễ học thực địa tại Việt Nam (Viện Vệ sinh Dịch tễ Trung ương, Viện Pasteur, Cục Y tế Dự phòng - Bộ Y tế).
  + Xu hướng dịch tễ: dịch tễ học chuyển dịch (đô thị hóa, già hóa dân số, biến đổi khí hậu, dịch bùng phát trở lại do lỗ hổng miễn dịch).
- **## 6. Y Tế Công Cộng, Giám Sát & Can Thiệp Dự Phòng {#sec-6}**:
  + Hệ thống giám sát ca bệnh (Case definitions: Ca nghi ngờ, Ca có thể, Ca xác định).
  + Dự phòng cấp 1 (Tiêm chủng vắc-xin, can thiệp môi trường, truyền thông giáo dục sức khỏe).
  + Dự phòng cấp 2 (Sàng lọc sớm, phát hiện ca bệnh, điều trị dự phòng sau phơi nhiễm PEP).
  + Dự phòng cấp 3 (Quản lý biến chứng, phục hồi chức năng, giảm thiểu tử vong).
  + Khung `<div class="infobox info">` tóm tắt chiến lược y tế công cộng ưu tiên.
- **## 7. Tài Liệu Tham Khảo EBM & Hướng Dẫn Quốc Tế {#sec-7}**:
  + Sử dụng khung `.citation-box` chuẩn:
    ```html
    <div class="citation-box" style="margin-top: 2rem; padding: 1.25rem 1.5rem; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #cbd5e1); border-left: 4px solid var(--color-primary, #0284c7); border-radius: 12px; font-size: 0.88rem; line-height: 1.8; color: var(--color-text-muted, #475569);">
      <strong style="color: var(--color-text, #0f172a); font-size: 0.95rem;"><i class="fa-solid fa-book-medical"></i> Trích Dẫn Y Văn &amp; Tài Liệu Tham Khảo Chuẩn AMA:</strong>
      <ol style="margin: 0.5rem 0 0 0; padding-left: 1.25rem;">
        <li><strong>World Health Organization (WHO).</strong> Tên Hướng Dẫn/Báo Cáo. Geneva: WHO; 2024.</li>
        <li><strong>Bộ Y Tế Việt Nam.</strong> Quyết định ban hành Hướng dẫn chẩn đoán, điều trị và giám sát dịch tễ bệnh... Hà Nội: BYT; 2023-2024.</li>
        <li><strong>Global Burden of Disease (GBD) Study Collaborators.</strong> Tên công trình nghiên cứu trên The Lancet; 2024.</li>
      </ol>
    </div>
    ```
  + Hàng nút điều hướng chân trang:
    ```html
    <div class="btn-row" style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
      <a href="#/basic-medical/dich-te-hoc" class="btn btn-primary">
        <i class="fa-solid fa-arrow-left"></i> Quay lại Mục Lục Dịch Tễ Học
      </a>
      <a href="#sec-1" class="btn">
        <i class="fa-solid fa-arrow-up"></i> Lên đầu trang
      </a>
    </div>
    ```

---

### 🎨 3. TỪ ĐIỂN LINH KIỆN UI DÙNG TRONG BÀI (COPY & SỬ DỤNG CHUẨN XÁC)
1. **Dải chỉ số nhanh**:
   `<section class="stats-strip theme-epi"><div class="stats-grid"><div class="stat-card"><div class="stat-val [indigo|emerald|amber|rose]">GIÁ TRỊ</div><div class="stat-lbl">MÔ TẢ</div></div>...</div></section>`
2. **Khung cảnh báo / Điểm ngọc**:
   - Nguy cơ đỏ: `<div class="infobox danger"><i class="fa-solid fa-triangle-exclamation infobox-icon" style="color: #dc2626;"></i><div><strong>Tiêu đề:</strong><br />Nội dung...</div></div>`
   - Động học / Cơ chế: `<div class="infobox reaction"><i class="fa-solid fa-arrows-spin infobox-icon" style="color: #7c3aed;"></i><div><strong>Tiêu đề:</strong><br />Nội dung...</div></div>`
   - Điểm ngọc lâm sàng: `<div class="infobox pearl"><i class="fa-solid fa-gem infobox-icon" style="color: #0284c7;"></i><div><strong>Điểm Ngọc Lâm Sàng (Clinical Pearl):</strong><br />Nội dung...</div></div>`
   - Y tế công cộng / Dự phòng: `<div class="infobox info"><i class="fa-solid fa-shield-virus infobox-icon" style="color: #0d9488;"></i><div><strong>Thông Điệp Y Tế Công Cộng:</strong><br />Nội dung...</div></div>`
3. **Bảng dữ liệu chuẩn**:
   `<div class="table-responsive"><table class="table-modern"><thead><tr><th>Cột 1</th><th>Cột 2</th></tr></thead><tbody><tr><td>...</td><td>...</td></tr></tbody></table></div>`

BÂY GIỜ, HÃY BIÊN SOẠN BÀI VIẾT HOÀN CHỈNH CHO BỆNH LÝ YÊU CẦU DƯỚI ĐỊNH DẠNG MỘT KHỐI MÃ MDX DUY NHẤT. KHÔNG CẮT BỚT BẤT KỲ MỤC NÀO.
```

---

## 💡 HƯỚNG DẪN BÁC SĨ / NGƯỜI DÙNG CÁCH SỬ DỤNG PROMPT

1. **Bước 1**: Copy toàn bộ nội dung trong khối code `Master Prompt` ở trên.
2. **Bước 2**: Dán vào AI (Claude 3.7 Sonnet, ChatGPT GPT-4o, Google Gemini Pro hoặc Google NotebookLM).
3. **Bước 3**: Thay thế dòng `[NHẬP TÊN BỆNH LÝ VÀ CHUYÊN KHOA VÀO ĐÂY]` bằng tên bệnh bạn muốn tạo (Ví dụ: *Sốt mò do Orientia tsutsugamushi*, *Bệnh thận đái tháo đường*, *Xơ gan do rượu*, *Nhồi máu não cấp*...).
4. **Bước 4**: Lưu tệp kết quả vào thư mục `src/content/basic-medical/epidemiology/dth-[ten-benh-slug].mdx`.
5. **Bước 5**: Kiểm định nhanh bằng terminal:
   ```bash
   npm run build
   ```
