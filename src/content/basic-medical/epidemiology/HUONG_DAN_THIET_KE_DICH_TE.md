# Hướng Dẫn Thiết Kế Web Con Dịch Tễ Học Y Khoa (Medical Epidemiology)

> **Tài liệu quy chuẩn thiết kế** dành cho các bài đọc Dịch tễ học bệnh lý & Y tế công cộng chuyên sâu trong thư mục `src/content/basic-medical/epidemiology/`.
> Mọi web con mới hoặc cập nhật tại thư mục này **bắt buộc tuân thủ quy chuẩn dưới đây**.

---

## 📁 1. Vị trí & Cấp Đường Dẫn Tương Đối

- **Thư mục lưu trữ**: `src/content/basic-medical/epidemiology/`
- **Cấp thư mục**: **Cấp 4** (so với Root workspace `Apps_ykhoa/`).
- **Prefix đường dẫn tương đối lên Root**: `../../../../`
- **Prefix đường dẫn tương đối tới module Basic Medical**: `../`

### Bảng tra cứu đường dẫn chuẩn:

| Tài nguyên | Đường dẫn tương đối từ `epidemiology/` |
|------------|---------------------------------------|
| Asset Root CSS (`reset.css`, `main.css`, `header.css`, `sidebar.css`, `footer.css`) | `../../../../css/...` |
| CSS Dịch tễ học & Sinh lý dùng chung (`module-dashboard.css`, `physio-content.css`, `epidemiology-hub.css`) | `../../../../css/components/...` |
| CSS Module Dùng Chung | `../css/physio-shared.css` |
| Asset Root JS (`header.js`, `footer.js`, `main.js`) | `../../../../js/...` hoặc `../../../../components/...` |
| JS Module Dùng Chung | `../js/physio-shared.ts` |
| Trang Hub Dịch Tễ Học | `../dich-te-hoc.html` hoặc `../../index.html#/basic-medical/dich-te-hoc` |
| Trang Chủ CliniPortal | `../../../../index.html` |

---

## 🏷️ 2. Quy Tắc Đặt Tên File HTML

Định dạng tên tệp chuẩn:
```text
dth-[ten-benh-slug].html
```

Ví dụ:
- `dth-dengue.html`: Sốt xuất huyết Dengue (DENV)
- `dth-sot-ret.html`: Sốt rét (Malaria / Plasmodium)
- `dth-lao.html`: Bệnh Lao (Tuberculosis / Mycobacterium tuberculosis)
- `dth-cum.html`: Cúm mùa & Cúm gia cầm (Influenza)
- `dth-covid-19.html`: COVID-19 (SARS-CoV-2)
- `dth-sởi.html`: Bệnh Sởi (Measles)

---

## 🎨 3. Bảng Màu & Design Tokens Đặc Trưng Dịch Tễ

```css
:root {
    --epi-primary: #0d9488;          /* Deep Teal - Màu chủ đạo */
    --epi-primary-light: #2dd4bf;    /* Light Teal */
    --epi-vector: #8b5cf6;           /* Purple - Động học Véc-tơ trung gian */
    --epi-hazard: #ef4444;           /* Hazard Red - Cảnh báo dịch nguy hiểm & Tử vong */
    --epi-warning: #f59e0b;          /* Amber - Điểm ngọc lâm sàng / Nhóm nguy cơ */
    --epi-climate: #06b6d4;          /* Cyan - Sinh thái & Khí hậu */
    --epi-gradient: linear-gradient(135deg, #042f2e 0%, #0f172a 50%, #134e4a 100%);
}

[data-theme="dark"] {
    --epi-gradient: linear-gradient(135deg, #022c22 0%, #090d16 50%, #042f2e 100%);
}
```

---

## 🧩 4. Cấu Trúc Khối Mục Lục Sticky Nav Chuẩn (.pillars-nav)

Mọi bài Dịch tễ học đều sử dụng thanh dải sticky nav với 8 Tab Trụ cột:
```html
<nav class="pillars-nav" aria-label="Mục lục bài học nhanh">
    <div class="pillars-nav-inner">
        <a href="#sec-1" class="pillar-tab p-1" onclick="event.preventDefault(); document.getElementById('sec-1')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-triangle-exclamation"></i> 1. Tam Giác Dịch Tễ</a>
        <a href="#sec-2" class="pillar-tab p-2" onclick="event.preventDefault(); document.getElementById('sec-2')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-dna"></i> 2. Tác Nhân &amp; Cơ Chế</a>
        <a href="#sec-3" class="pillar-tab p-3" onclick="event.preventDefault(); document.getElementById('sec-3')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-mosquito"></i> 3. Véc-tơ Truyền Bệnh</a>
        <a href="#sec-4" class="pillar-tab p-4" onclick="event.preventDefault(); document.getElementById('sec-4')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-arrows-spin"></i> 4. Chu Kỳ Lây Truyền</a>
        <a href="#sec-5" class="pillar-tab p-5" onclick="event.preventDefault(); document.getElementById('sec-5')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-users"></i> 5. Vật Chủ &amp; Nguy Cơ</a>
        <a href="#sec-6" class="pillar-tab p-6" onclick="event.preventDefault(); document.getElementById('sec-6')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-cloud-sun-rain"></i> 6. Khí Hậu &amp; Xã Hội</a>
        <a href="#sec-7" class="pillar-tab p-7" onclick="event.preventDefault(); document.getElementById('sec-7')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-earth-americas"></i> 7. Tình Hình Toàn Cầu &amp; VN</a>
        <a href="#sec-8" class="pillar-tab p-8" onclick="event.preventDefault(); document.getElementById('sec-8')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-book-medical"></i> 8. Tài Liệu Tham Khảo</a>
    </div>
</nav>
```

---

## 📊 5. Tiêu Chuẩn Đồ Họa Vector Xuất Bản Cao Cấp (Editorial-Grade SVG)

1. **Tam giác dịch tễ học (Epidemiological Triad)**:
   - Thể hiện 3 đỉnh tam giác: **Tác nhân (Agent)**, **Vật chủ (Host)**, **Môi trường & Véc-tơ (Environment/Vector)**.
   - Thẻ Card Base tại mỗi đỉnh: kích thước tối thiểu `280x110px`, `rx="14"`, gradient nền `stop-opacity="0.12"` chuyển tiếp nhẹ sang `var(--color-surface)`.
   - Header Pill tích hợp trên mép thẻ (`<rect x="14" y="-12" width="150" height="26" rx="13">` + icon/text), **tuyệt đối không để vòng tròn trôi nổi chèn ép chữ**.
   - Tâm điểm giao thoa bùng phát dịch: vòng pulse hào quang kép (`stroke-width="6"` + `stroke-width="2.5"`), nhãn chữ in hoa đa tầng (`font-weight="900"`).
   - Đường nối động học: đường cong Bezier `Q` hoặc đường nét đứt `stroke-dasharray="5 5"` kèm marker mũi tên chỉ hướng theo màu chủ đề.

2. **Chu kỳ lây truyền & Timeline ủ bệnh (Transmission Cycle Timeline)**:
   - Sơ đồ tương tác khép kín 3 bước: **Bước 1: Nhiễm vi rút huyết (Viraemia)** ➔ **Bước 2: Ủ bệnh ngoại lai EIP (Muỗi)** ➔ **Bước 3: Ủ bệnh nội tại IIP (Người)** ➔ Khép kín chu kỳ (`↺`).
   - Mỗi bước có badge bước rõ ràng, thời gian ủ bệnh nổi bật (`⏱ -2 ngày đến +5-7 ngày`, `⏱ 8-12 ngày`, `⏱ 3-14 ngày`) và bullet point thụt lề chuẩn mực.

3. **Quy tắc kỹ thuật SVG nghiêm ngặt**:
   - `viewBox` co giãn rộng rãi (tối thiểu `860x520` cho Triad và `860x380` cho Timeline), `width="100%"`.
   - Text SVG dùng `<text>` và `<tspan font-weight="700">`, **tuyệt đối CẤM** thẻ HTML như `<b>`, `<strong>`, `<span>`, `<br>`.
   - Màu sắc kế thừa biến hệ thống: `var(--color-...)`, `#0d9488`, `#ef4444`, `#8b5cf6`, `#3b82f6`.

---

## 🔀 6. Quy Chuẩn 5 Mô Hình Lưu Đồ Động Học Cá Thể Hóa (5 Specialty Archetypes)

Tuyệt đối **KHÔNG dùng chung một mô hình chu kỳ lây truyền cho mọi bệnh lý**. Mỗi bài dịch tễ học phải chọn đúng 1 trong 5 mô hình lưu đồ sau đây cho **Trụ cột 4**:

| Nhóm | Chuyên Khoa / Dạng Bệnh | Mô Hình Trực Quan Trụ Cột 4 | Đặc Trưng Cấu Trúc |
|---|---|---|---|
| **🔴 Nhóm A** | Vector-borne & Zoonotic (Sốt xuất huyết, Sốt rét, Sốt mò, Dại...) | **Timeline Rail Studio (Vector/Host Cycle)** | Viraemia &rarr; Ủ bệnh ngoại lai (EIP trong véc-tơ) &rarr; Ủ bệnh nội tại (IIP trong người) &rarr; Vòng lặp tái nhiễm |
| **🟠 Nhóm B** | Direct Infectious (Thủy đậu, VGSV-B, VGSV-C, Viêm màng não, HIV, Lao...) | **Timeline Rail Studio (Natural History & Care Cascade)** | Xâm nhập &rarr; Nhiễm cấp &rarr; Thanh thải / Mãn tính &rarr; Di chứng &rarr; Cột mốc điều trị (DAA / Vắc-xin) & Cảnh báo tái nhiễm |
| **🟡 Nhóm C** | Progressive Chronic Organ Disease (Xơ gan, Suy tim, COPD, Bệnh thận mạn CKD, Đái tháo đường T2, THA...) | **Progression Cascade Studio (Decline Curve & Staging)** | Chuỗi thoái hóa cơ quan F0&rarr;F4/NYHA/GOLD/eGFR &rarr; Mất bù &rarr; Biến cố suy tạng kịch phát (ACLF/ADHF/AECOPD) + Cửa sổ vàng can thiệp (Baveno/KDIGO/GOLD) |
| **🟢 Nhóm D** | Acute Emergency & Events (Hội chứng vành cấp ACS, Đột quỵ cấp, Thuyên tắc phổi PE, Xuất huyết tiêu hóa...) | **Acute Event Radar Studio (Golden Hour & Risk Matrix)** | Trục thời gian khẩn cấp (Phút &rarr; Giờ &rarr; 24h &rarr; 30 ngày) + Đồng hồ tử vong (Mortality Clock) + Ma trận phân tầng nguy cơ khẩn cấp |
| **🔵 Nhóm E** | Genetic, Rare & Autoimmune Diseases (Thalassemia, SLE, Bệnh Wilson, Hemophilia, Bệnh tự miễn...) | **Population Genetics & Flare Map Studio** | Bản đồ dịch tễ di truyền / Vành đai lưu hành + Vòng lặp đợt bùng phát (Flare - Remission) + Tháp phân bố nhân khẩu/giới tính |

