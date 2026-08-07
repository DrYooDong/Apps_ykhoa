---
name: clinical-data-visualization
description: Hướng dẫn thiết kế và render biểu đồ, thang điểm, đồ thị trực quan y khoa bằng SVG thuần và Canvas 2D API không sử dụng thư viện ngoài trong CliniPortal.
---

# Clinical Data Visualization — CliniPortal

Tài liệu hướng dẫn trực quan hóa dữ liệu lâm sàng (chỉ số xét nghiệm, thang điểm tiên lượng, biểu đồ đường cong sống còn) bằng SVG & HTML5 Canvas thuần.

---

## 📊 1. Progress Gauge Indicator (Thang điểm Cảnh báo)

Dùng SVG thuần để render thang điểm trực quan (ví dụ: SOFA Score, Child-Pugh, CHA2DS2-VASc):

```html
<div class="score-gauge" data-score="8" data-max="15">
  <svg viewBox="0 0 100 50" class="gauge-svg">
    <!-- Nền bán cầu -->
    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="var(--color-border)" stroke-width="8" />
    <!-- Vùng giá trị -->
    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="var(--color-danger)" stroke-width="8" 
          stroke-dasharray="125" stroke-dashoffset="50" class="gauge-fill" />
  </svg>
  <div class="gauge-value">8 / 15</div>
</div>
```

---

## 📈 2. Kaplan-Meier / Trend Charts với HTML5 Canvas

Render đồ thị diễn tiến hoặc tỷ lệ sống còn bằng Canvas 2D:

```javascript
function drawTrendLine(canvasEl, dataPoints) {
  const ctx = canvasEl.getContext('2d');
  const width = canvasEl.width;
  const height = canvasEl.height;

  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
  ctx.lineWidth = 3;

  const stepX = width / (dataPoints.length - 1);
  dataPoints.forEach((pt, index) => {
    const x = index * stepX;
    const y = height - (pt.value / 100) * height;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}
```

---

## 🎨 Quy tắc Màu sắc Biểu đồ Lâm sàng

- **Bình thường / An toàn**: `var(--color-success)` (#10b981)
- **Cần theo dõi / Trung bình**: `var(--color-warning)` (#f59e0b)
- **Nguy cơ cao / Cấp cứu**: `var(--color-danger)` (#ef4444)
- **Cận lâm sàng / Chỉ số phụ**: `var(--color-info)` (#06b6d4)
