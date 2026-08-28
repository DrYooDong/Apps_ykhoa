---
name: medical-dashboard-bento
description: Kỹ năng thiết kế và phát triển giao diện Bento Grid Dashboard Y khoa hiện đại (Vanilla HTML/CSS/JS), linh kiện KPI sinh hiệu, đồng hồ an toàn Gauge SVG, mạng lưới Node IoT và Bảng đối sánh y khoa cho CliniPortal.
---

# Medical Dashboard Bento Mastery — CliniPortal

Tài liệu hướng dẫn AI thiết kế và phát triển các giao diện Dashboard Y khoa hiện đại dạng **Bento Grid** kết hợp nguyên lý **Data Storytelling & Tỷ lệ Data-Ink (Edward Tufte)** bằng công nghệ thuần Vanilla HTML5 / CSS3 / JavaScript (ES6+).

---

## 🍱 1. Cấu Trúc Bento Grid Bất Đối Xứng (Asymmetric Bento Grid)

Bố cục Bento hiện đại phân chia không gian thành các ô đa tỷ lệ ($1\times1, 2\times1, 2\times2$) tạo điểm nhấn phân tầng thị giác:

```css
/* Container Lưới Bento 12 Cột Đáp Ứng Cao */
.bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-width: 1560px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1100px) {
  .bento-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(180px, auto);
  }

  .bento-cell-featured { grid-column: span 2; grid-row: span 2; } /* Khối chính 2x2 */
  .bento-cell-wide     { grid-column: span 2; }                    /* Khối rộng 2x1 */
  .bento-cell-tall     { grid-row: span 2; }                       /* Khối cao 1x2 */
}
```

---

## 📊 2. Bộ Linh Kiện Data Storytelling Thuần SVG & Canvas

### 1️⃣ Đồng Hồ Đo Sinh Hiệu / Nguy Cơ (Pure SVG Arc Gauge)
Không cần thư viện nặng, đồng hồ hiển thị điểm số lâm sàng (TIMI, SOFA, NIHSS) bằng SVG thuần:
```html
<div class="bento-gauge-wrapper">
  <svg class="bento-gauge-svg" viewBox="0 0 100 55" data-val="75">
    <path class="gauge-track" d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="var(--color-border)" stroke-width="8" stroke-linecap="round" />
    <path class="gauge-fill" d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="var(--color-primary)" stroke-width="8" stroke-linecap="round" stroke-dasharray="125.6" stroke-dashoffset="31.4" />
  </svg>
  <div class="gauge-value">75%</div>
  <div class="gauge-label">Kiểm Soát Đường Huyết</div>
</div>
```

### 2️⃣ Sparkline Xu Hướng Thời Gian Thực (Pure HTML5 Canvas)
Vẽ đường biến thiên huyết áp/nhịp tim trong 24h chỉ với 20 dòng mã Canvas API siêu nhẹ, hỗ trợ hiển thị độ phân giải Retina (`window.devicePixelRatio`).

### 3️⃣ Medical KPI Metric Card (`.bento-kpi-card`)
Trình bày chỉ số sinh hiệu (HR, BP, SpO2, Temp) với nhãn xu hướng (Trend Badge):
```html
<div class="bento-kpi-card">
  <div class="bento-kpi-header">
    <span class="bento-kpi-label">Huyết Áp Tâm Thu</span>
    <div class="bento-kpi-icon"><i class="fa-solid fa-heart-pulse"></i></div>
  </div>
  <div class="bento-kpi-body">
    <span class="bento-kpi-value">128</span>
    <span class="bento-kpi-unit">mmHg</span>
    <span class="bento-trend-badge success"><i class="fa-solid fa-check"></i> Đạt mục tiêu</span>
  </div>
</div>
```

---

## ⚡ 3. Nguyên Lý Tương Tác & Hiệu Năng 60fps

- **Xúc giác phản hồi bấm (Tactile Click)**: Nén nhẹ `:active { transform: scale(0.98); }` trên mọi thẻ Bento.
- **Ánh sáng viền Ambient (Border Glow)**: Sử dụng lớp giả `::before` với `radial-gradient` theo vị trí chuột để tạo chiều sâu công nghệ cao.
- **Tương thích Dark Mode 100%**: Sử dụng Design Tokens `var(--color-surface)` và `var(--color-border)`.
