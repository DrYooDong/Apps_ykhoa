---
name: medical-dashboard-bento
description: Kỹ năng thiết kế và phát triển giao diện Bento Grid Dashboard Y khoa hiện đại (Vanilla HTML/CSS/JS), linh kiện KPI sinh hiệu, đồng hồ an toàn Gauge SVG, mạng lưới Node IoT và Bảng đối sánh y khoa cho CliniPortal.
---

# Medical Dashboard Bento Skill — CliniPortal

Tài liệu hướng dẫn AI thiết kế và phát triển các giao diện Dashboard Y khoa hiện đại dạng **Bento Grid** (dựa trên thiết kế PFL-HCare) bằng công nghệ thuần Vanilla HTML5 / CSS3 / JavaScript (ES6+) không dùng framework.

---

## 🎨 1. Quy Chuẩn Thiết Kế Bento Grid Y Khoa

1. **Khung Grid Thống Nhất (`.bento-homepage`)**:
   - Sử dụng CSS Grid 12 cột tự động co giãn:
     ```css
     .bento-homepage {
       display: grid;
       grid-template-columns: repeat(12, 1fr);
       gap: 0.75rem;
       max-width: 1600px;
       margin: 0 auto;
     }
     ```
2. **Thẻ Bento Cell Standard (`.bento-cell`)**:
   - Nền `var(--color-surface)`, viền `var(--color-border)`, bo góc `var(--radius-md, 12px)`.
   - Hiệu ứng trượt nhẹ khi hover: `transform: translateY(-2px); border-color: var(--color-primary);`.
3. **Đồng Bộ CSS Tokens (Không Hardcode Màu)**:
   - Nền: `var(--color-bg)`, Card: `var(--color-surface)`.
   - Trạng thái: `var(--color-success)` (An toàn), `var(--color-warning)` (Cảnh báo), `var(--color-danger)` (Cấp cứu), `var(--color-info)` (Thông tin).

---

## 🧩 2. Bộ Linh Kiện Core Bento Components

### 1️⃣ Medical KPI Metric Card (`.bento-kpi-card`)
Trình bày chỉ số sinh hiệu (HR, BP, SpO2, Temp) hoặc điểm số nguy cơ (NEWS2, qSOFA, Child-Pugh):
```html
<div class="bento-kpi-card">
  <div class="bento-kpi-header">
    <span class="bento-kpi-label">Nhịp Tim (HR)</span>
    <div class="bento-kpi-icon"><i class="fa-solid fa-heart-pulse"></i></div>
  </div>
  <div class="bento-kpi-body">
    <div>
      <span class="bento-kpi-value">74</span>
      <span class="bento-kpi-unit">bpm</span>
    </div>
    <span class="bento-trend-badge success"><i class="fa-solid fa-arrow-down"></i> Ổn định</span>
  </div>
</div>
```

### 2️⃣ Clinical Safety & Privacy Gauge (`.bento-safety-gauge`)
Đồng hồ đo mức độ an toàn hoặc bảo mật riêng tư bằng SVG thuần (Bán kính $R=70$, Chu vi Arc $= 220$):
```html
<svg class="bento-gauge-svg" id="safety-gauge" viewBox="0 0 200 120" data-value="85">
  <path class="gauge-bg-arc" d="M 30,100 A 70,70 0 0,1 170,100" />
  <path class="gauge-value-arc" d="M 30,100 A 70,70 0 0,1 170,100" />
  <g class="gauge-center-text" transform="translate(100, 85)">
    <text class="gauge-val-num">85%</text>
    <text class="gauge-val-label" y="20">Chỉ số An toàn AI</text>
  </g>
</svg>
```

### 3️⃣ Live Node Network Status (`.bento-node-grid`)
Mạng lưới theo dõi trạng thái các khoa phòng / thiết bị IoT với chấm nhấp nháy 60fps (`.pulse-dot`):
- `.pulse-dot.active`: Xanh lá (Hoạt động bình thường)
- `.pulse-dot.warning`: Vàng (Cần theo dõi)
- `.pulse-dot.danger`: Đỏ (Cấp cứu / Mất kết nối)

### 4️⃣ Comparison Matrix Table (`.bento-comparison-table`)
Bảng đối sánh các phương pháp, nhóm thuốc hoặc phác đồ điều trị với nhãn chip badge (`.bento-chip.yes`, `.bento-chip.no`, `.bento-chip.sim`).

---

## ⚡ 3. JavaScript Performance & Animations

- **Không dùng thư viện nặng**: Sử dụng Vanilla JS với `addEventListener` và `requestAnimationFrame`.
- **Chuyển động mượt mượt**: Sử dụng CSS transition `cubic-bezier(0.16, 1, 0.3, 1)` cho đồng hồ Gauge và hiệu ứng hover.
- **Tương thích Dark Mode**: Đảm bảo tất cả màu sắc được dereference qua CSS Variables để khi `data-theme="dark"` trên `<html>` thay đổi, toàn bộ Bento Dashboard tự động đổi màu mượt mượt mà không bị lóa mắt.
