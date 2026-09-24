---
name: medical-scientific-figure
description: >
  Thiết kế & Tạo Đồ Họa Xuất Bản Khoa Học & Sơ Đồ Cơ Chế Y Học Đỉnh Cao (Nature-Standard Medical Scientific Figures & Graphical Abstracts).
  Hấp thu tri thức từ nature-skills (nature-figure): Kiến trúc Đa Bảng (Multi-panel Evidence Architecture), Hero Panel,
  Bảng Màu Kiềm Chế Chuẩn Xuất Bản (Restrained Accessible Palette), Kiểm Toán Chống Va Chạm Nhãn (Collision Audit),
  Sơ Đồ PRISMA Flowchart và Đồ Họa Vector SVG Y Học 100% Dark Mode.
---

# 🎨 Nature Medical Scientific Figure & Graphical Abstract Studio

> **Kế thừa & Nâng cấp từ**: `nature-figure` (Yuan1z0825/nature-skills) & `medical-editorial-diagram`  
> **Áp dụng cho**: Tạo sơ đồ cơ chế phân tử (Molecular Mechanism), Sơ đồ dòng chảy nghiên cứu (PRISMA Flow Diagram), Biểu đồ Forest Plot, Đồ thị sống còn Kaplan-Meier, và Hình minh họa Đa Bảng (Multi-panel Figures) trong CliniPortal.

---

## 🏛️ 1. Triết Lý Thiết Kế Hình Ảnh Chuẩn Nature (Nature Figure Stance)

1. **Một Hình Vẽ = Một Luận Điểm Khoa Học Cốt Lõi**: Một hình vẽ đa bảng (Multi-panel Figure) không phải là sự tập hợp ngẫu nhiên của các biểu đồ. Toàn bộ hình vẽ phải phục vụ **một câu hỏi nghiên cứu cấp độ Results**.
2. **Kiến Trúc Bảng Có Trọng Tâm (Hero Panel Architecture)**:
   - Trong một hình vẽ gồm các bảng a, b, c, d, luôn có **01 Bảng Anh Hùng (Hero Panel)** mang trọng số chứng minh lớn nhất (ví dụ: Đường cong Kaplan-Meier kết cục chính hoặc Sơ đồ cơ chế phân tử).
   - Các bảng phụ trợ giải quyết các câu hỏi đi kèm: Bảng a (Sơ đồ thử nghiệm / phân bổ), Bảng b (Hero Panel: Hiệu quả chính), Bảng c (Phân tích phân nhóm Forest plot), Bảng d (Biến cố bất lợi / An toàn).
3. **Bảng Màu Kiềm Chế & Dễ Tiếp Cận (Restrained & Colorblind-Safe Palette)**:
   - Tuyệt đối không dùng màu 7 sắc cầu vồng (Rainbow colormaps) gây nhầm lẫn thị giác.
   - Sử dụng bảng màu khoa học tiêu chuẩn: Okabe-Ito, ColorBrewer, Viridis, hoặc Hệ thống Design Tokens của CliniPortal (`var(--color-primary)`, `var(--color-success)`, `var(--color-danger)`).
   - Tương thích 100% Dark Mode: Nền trong suốt (`fill="none"` hoặc CSS variables), đường viền sắc nét, độ tương phản đạt WCAG AAA.
4. **Kiểm Toán Va Chạm & Căn Chỉnh Nghiêm Ngặt (Collision & Alignment Audit)**:
   - Các nhãn trục, số liệu, điểm dữ liệu tuyệt đối không đè lên nhau.
   - Các panel cùng hàng phải có cùng chiều cao và khoảng đệm (gutter) đồng nhất (12px – 16px).

---

## 📐 2. Bố Cục Hình Vẽ Đa Bảng (Multi-Panel Composition)

### Cấu Trúc Khung Mẫu Chuẩn Nature 4 Bảng (2x2 Multi-Panel Grid)

```
┌──────────────────────────────────────┬──────────────────────────────────────┐
│ (a) SƠ ĐỒ THIẾT KẾ & PHÂN BỔ BỆNH NHÂN│ (b) KẾT CỤC CHÍNH (HERO PANEL)       │
│     (Trial Design & Enrollment Flow) │     (Primary Endpoint Kaplan-Meier)  │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ (c) PHÂN TÍCH PHÂN NHÓM (SUBGROUPS)  │ (d) AN TOÀN & TÁC DỤNG PHỤ (SAFETY)   │
│     (Forest Plot of Hazard Ratios)   │     (Adverse Events Incidence Rates) │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

---

## 🔬 3. Các Dạng Đồ Họa Khoa Học Y Học Cốt Lõi (Inline SVG Native)

Trong CliniPortal, mọi đồ họa khoa học được render bằng **Pure Inline SVG** (không dùng canvas bị vỡ nét trên màn hình Retina, không phụ thuộc thư viện JS nặng):

### 3.1. Sơ Đồ Quy Trình PRISMA 2020 Flowchart (SVG Native)
Minh họa dòng chảy sàng lọc y văn cho tổng quan hệ thống:
```html
<div class="fig-card editorial-svg-card">
  <div class="svg-container">
    <svg viewBox="0 0 800 500" class="editorial-diagram" xmlns="http://www.w3.org/2000/svg">
      <!-- Định nghĩa Markers Mũi Tên & Gradient -->
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-primary, #0284c7)"/>
        </marker>
      </defs>

      <!-- Giai đoạn 1: Identification -->
      <g class="flow-stage" transform="translate(40, 40)">
        <rect width="320" height="70" rx="8" fill="var(--color-surface, #1e293b)" stroke="var(--color-border, #334155)" stroke-width="2"/>
        <text x="160" y="30" text-anchor="middle" font-weight="700" font-size="14" fill="var(--color-text, #f8fafc)">Hồ sơ ghi nhận từ CSDL (n = 1,420)</text>
        <text x="160" y="52" text-anchor="middle" font-size="12" fill="var(--color-text-muted, #94a3b8)">PubMed (820), Embase (450), Cochrane (150)</text>
      </g>

      <!-- Mũi tên loại trừ trùng lặp -->
      <line x1="200" y1="110" x2="200" y2="160" stroke="var(--color-primary, #0284c7)" stroke-width="2" marker-end="url(#arrow)"/>

      <!-- Hộp loại trừ trùng lặp -->
      <g class="flow-stage" transform="translate(440, 40)">
        <rect width="320" height="70" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="var(--color-danger, #ef4444)" stroke-width="1.5"/>
        <text x="160" y="32" text-anchor="middle" font-weight="600" font-size="13" fill="var(--color-danger, #ef4444)">Hồ sơ bị loại bỏ trước sàng lọc:</text>
        <text x="160" y="52" text-anchor="middle" font-size="12" fill="var(--color-text-muted, #94a3b8)">Bản ghi trùng lặp đã xóa (n = 310)</text>
      </g>

      <!-- Giai đoạn 2: Screening -->
      <g class="flow-stage" transform="translate(40, 160)">
        <rect width="320" height="70" rx="8" fill="var(--color-surface, #1e293b)" stroke="var(--color-border, #334155)" stroke-width="2"/>
        <text x="160" y="32" text-anchor="middle" font-weight="700" font-size="14" fill="var(--color-text, #f8fafc)">Hồ sơ được sàng lọc tiêu đề (n = 1,110)</text>
        <text x="160" y="52" text-anchor="middle" font-size="12" fill="var(--color-text-muted, #94a3b8)">Tiêu chuẩn PICO ban đầu</text>
      </g>

      <!-- Hộp loại trừ sau đọc tiêu đề -->
      <line x1="360" y1="195" x2="440" y2="195" stroke="var(--color-danger, #ef4444)" stroke-width="2" marker-end="url(#arrow)"/>
      <g class="flow-stage" transform="translate(440, 160)">
        <rect width="320" height="70" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke="var(--color-danger, #ef4444)" stroke-width="1.5"/>
        <text x="160" y="32" text-anchor="middle" font-weight="600" font-size="13" fill="var(--color-danger, #ef4444)">Hồ sơ bị loại bỏ (n = 980):</text>
        <text x="160" y="52" text-anchor="middle" font-size="12" fill="var(--color-text-muted, #94a3b8)">Không đúng chủ đề, nghiên cứu trên động vật</text>
      </g>

      <!-- Giai đoạn 3: Eligibility & Included -->
      <line x1="200" y1="230" x2="200" y2="280" stroke="var(--color-primary, #0284c7)" stroke-width="2" marker-end="url(#arrow)"/>
      <g class="flow-stage" transform="translate(40, 280)">
        <rect width="320" height="70" rx="8" fill="rgba(16, 185, 129, 0.15)" stroke="var(--color-success, #10b981)" stroke-width="2"/>
        <text x="160" y="32" text-anchor="middle" font-weight="700" font-size="14" fill="var(--color-success, #10b981)">Toàn văn được đánh giá (n = 130)</text>
        <text x="160" y="52" text-anchor="middle" font-size="12" fill="var(--color-text-muted, #94a3b8)">Thẩm định phương pháp luận & dữ liệu</text>
      </g>

      <line x1="200" y1="350" x2="200" y2="400" stroke="var(--color-success, #10b981)" stroke-width="2" marker-end="url(#arrow)"/>
      <g class="flow-stage" transform="translate(40, 400)">
        <rect width="320" height="70" rx="8" fill="var(--color-success, #10b981)" stroke="var(--color-success, #10b981)" stroke-width="2"/>
        <text x="160" y="32" text-anchor="middle" font-weight="800" font-size="15" fill="#ffffff">Nghiên cứu đưa vào tổng hợp (n = 18)</text>
        <text x="160" y="52" text-anchor="middle" font-size="12" fill="rgba(255,255,255,0.9)">Đủ điều kiện phân tích gộp định lượng</text>
      </g>
    </svg>
  </div>
  <div class="fig-caption">
    <div class="fig-title">Figure 1. Sơ đồ dòng chảy sàng lọc y văn theo chuẩn PRISMA 2020</div>
    Minh họa các bước nhận diện, sàng lọc, đánh giá sự phù hợp và số lượng nghiên cứu đưa vào phân tích tổng hợp cuối cùng.
  </div>
</div>
```

### 3.2. Biểu Đồ Forest Plot Trực Quan (SVG Forest Plot)
Trực quan hóa tỷ số nguy cơ (Hazard Ratio) và khoảng tin cậy 95% giữa các phân nhóm:
```html
<div class="fig-card editorial-svg-card">
  <div class="svg-container">
    <svg viewBox="0 0 800 360" class="editorial-diagram" xmlns="http://www.w3.org/2000/svg">
      <!-- Trục hoành tọa độ Logarithmic / Tuyến tính -->
      <line x1="400" y1="40" x2="400" y2="300" stroke="var(--color-danger, #ef4444)" stroke-width="1.5" stroke-dasharray="4 4"/>
      <text x="400" y="320" text-anchor="middle" font-size="12" fill="var(--color-text-muted, #94a3b8)">1.0 (Đường vô hiệu - Line of No Effect)</text>

      <text x="240" y="340" text-anchor="middle" font-size="12" font-weight="600" fill="var(--color-success, #10b981)">← Nghiêng về Can thiệp (Favors Intervention)</text>
      <text x="560" y="340" text-anchor="middle" font-size="12" font-weight="600" fill="var(--color-text-muted, #94a3b8)">Nghiêng về Đối chứng (Favors Control) →</text>

      <!-- Phân nhóm 1: Toàn bộ bệnh nhân -->
      <text x="50" y="70" font-size="13" font-weight="700" fill="var(--color-text, #f8fafc)">Tổng thể dân số (Overall MACE)</text>
      <line x1="320" y1="65" x2="395" y2="65" stroke="var(--color-primary, #0284c7)" stroke-width="2"/>
      <rect x="350" y="58" width="14" height="14" rx="2" fill="var(--color-primary, #0284c7)"/>
      <text x="650" y="70" font-family="var(--dsp-font-mono)" font-size="12" fill="var(--color-text, #f8fafc)">0.86 [0.74–0.99]</text>

      <!-- Phân nhóm 2: Tuổi < 65 -->
      <text x="70" y="120" font-size="13" fill="var(--color-text, #f8fafc)">Tuổi &lt; 65 tuổi</text>
      <line x1="300" y1="115" x2="410" y2="115" stroke="var(--color-primary, #0284c7)" stroke-width="2"/>
      <rect x="345" y="108" width="12" height="12" rx="2" fill="var(--color-primary, #0284c7)"/>
      <text x="650" y="120" font-family="var(--dsp-font-mono)" font-size="12" fill="var(--color-text, #f8fafc)">0.85 [0.70–1.03]</text>

      <!-- Phân nhóm 3: Tuổi >= 65 -->
      <text x="70" y="170" font-size="13" fill="var(--color-text, #f8fafc)">Tuổi ≥ 65 tuổi</text>
      <line x1="315" y1="165" x2="390" y2="165" stroke="var(--color-primary, #0284c7)" stroke-width="2"/>
      <rect x="348" y="158" width="13" height="13" rx="2" fill="var(--color-primary, #0284c7)"/>
      <text x="650" y="170" font-family="var(--dsp-font-mono)" font-size="12" fill="var(--color-text, #f8fafc)">0.86 [0.71–0.98]</text>

      <!-- Phân nhóm 4: eGFR < 60 -->
      <text x="70" y="220" font-size="13" fill="var(--color-text, #f8fafc)">eGFR &lt; 60 mL/min/1.73m²</text>
      <line x1="280" y1="215" x2="385" y2="215" stroke="var(--color-primary, #0284c7)" stroke-width="2"/>
      <rect x="330" y="208" width="12" height="12" rx="2" fill="var(--color-primary, #0284c7)"/>
      <text x="650" y="220" font-family="var(--dsp-font-mono)" font-size="12" fill="var(--color-text, #f8fafc)">0.81 [0.65–0.96]</text>

      <!-- Hình thoi tổng hợp (Pooled Effect Diamond) -->
      <polygon points="340,270 355,263 370,270 355,277" fill="var(--color-success, #10b981)"/>
      <text x="50" y="275" font-size="13" font-weight="700" fill="var(--color-success, #10b981)">Ước tính gộp (Fixed-Effect)</text>
      <text x="650" y="275" font-family="var(--dsp-font-mono)" font-size="12" font-weight="700" fill="var(--color-success, #10b981)">0.85 [0.74–0.97]</text>
    </svg>
  </div>
  <div class="fig-caption">
    <div class="fig-title">Figure 2. Biểu đồ Forest Plot phân tích hiệu quả gộp và các phân nhóm then chốt</div>
    Các hình vuông đại diện cho ước tính điểm (kích thước tỷ lệ với cỡ mẫu/trọng số), râu ngang thể hiện khoảng tin cậy 95% CI.
  </div>
</div>
```

---

## 🛡️ 4. Bảng Kiểm Tra Chất Lượng Hình Vẽ Y Khoa (Scientific Figure Checklist)

- [ ] **Kiểm tra độ phân giải vector**: Sử dụng 100% SVG thuần, sắc nét trên mọi thiết bị.
- [ ] **Tương thích Dark Mode 100%**: Sử dụng biến màu `var(--color-...)` để tự thích ứng nền sáng/tối.
- [ ] **Nhãn bảng chuẩn Nature**: Bắt đầu bằng chữ in thường đậm `(a)`, `(b)`, `(c)`, `(d)` đặt ở góc trên bên trái của mỗi panel.
- [ ] **Chú thích hình đầy đủ (Figure Caption)**: Gồm tiêu đề in đậm (`Figure X. [Tiêu đề]`) và đoạn văn giải thích ý nghĩa y khoa, đơn vị đo lường và mức ý nghĩa thống kê.
- [ ] **Không va chạm nhãn (Zero-Collision)**: Kiểm tra khoảng cách chữ số và vạch chia trục không bị đè chữ.
