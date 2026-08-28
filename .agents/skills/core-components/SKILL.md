---
name: core-components
description: Thư viện linh kiện UI cốt lõi (Vanilla HTML5 & CSS3) của CliniPortal: Buttons, Cards, Superblock Accordions, Drawers, Skeletons, Form Controls, Badges, và Focus States. Kích hoạt khi cần dựng trang mới hoặc tái sử dụng các linh kiện giao diện chuẩn.
---

# 🏛️ CliniPortal Core Component Library (Vanilla HTML5 & Modern CSS3)

> **Triết lý:** Pure HTML5 + Vanilla CSS3 (`ui-core.css`, `tokens.css`) + Vanilla JavaScript (ES6+).
> **Không phụ thuộc bất kỳ Framework hay Build Tool nào.**

---

## 🔘 1. Buttons & Action Elements

### Code Mẫu Chuẩn:
```html
<!-- 1. Primary Action Button -->
<button class="clini-btn clini-btn--primary clini-btn--md">
  <span>Xác Nhận Chỉ Định</span>
</button>

<!-- 2. Hero CTA Glow Button -->
<a href="#kham-lam-sang" class="clini-btn clini-btn--cta-glow clini-btn--lg">
  <span>Khám Lâm Sàng Ngay</span>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
</a>

<!-- 3. Critical / Emergency Button -->
<button class="clini-btn clini-btn--critical clini-btn--md">
  <span class="clini-pulse-dot"></span>
  <span>Kích Hoạt Code Red</span>
</button>

<!-- 4. Ghost / Secondary Button -->
<button class="clini-btn clini-btn--ghost clini-btn--sm">
  <span>Xuất PDF</span>
</button>
```

---

## 🗂️ 2. Superblock Accordions (Phân Cấp Bài Học & Phác Đồ)

### Code Mẫu Chuẩn:
```html
<div class="clini-accordion">
  <div class="clini-accordion-chapter">
    <div class="clini-chapter-header">
      <a href="./phan-1-chuan-doan.html" class="clini-chapter-title-btn">
        <span>🩺</span>
        <span>Phần 1: Chẩn Đoán Xác Định & Phân Tầng Nguy Cơ</span>
      </a>
      <button class="clini-chapter-toggle-btn" aria-expanded="false" onclick="toggleAccordion(this)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      </button>
    </div>
    <div class="clini-chapter-collapse" hidden>
      <ul class="clini-block-list">
        <li class="clini-block-item"><a href="#tieu-chuan">1.1 Tiêu chuẩn chẩn đoán ESC/AHA</a></li>
        <li class="clini-block-item"><a href="#troponin">1.2 Động học men tim Troponin</a></li>
      </ul>
    </div>
  </div>
</div>
```

---

## 📱 3. Bottom Drawer / Bedside Calculator Jaw

### Code Mẫu Chuẩn:
```html
<div id="calculator-drawer" class="clini-drawer-jaw">
  <div class="clini-jaw-header">
    <div class="clini-jaw-title">
      <span>🧮</span>
      <span>Thang Điểm CHA2DS2-VASc</span>
    </div>
    <button class="clini-btn clini-btn--ghost clini-btn--sm" onclick="closeDrawer()">✕</button>
  </div>
  <div class="clini-jaw-body">
    <!-- Nội dung công cụ tính toán tại đây -->
    <p>Điểm: <strong id="score-result">0 điểm</strong> (Nguy cơ tắc mạch thấp)</p>
  </div>
</div>
```

---

## ⚡ 4. Skeleton Shimmer & Loading State

### Code Mẫu Chuẩn:
```html
<!-- Dải tải dữ liệu mô phỏng bài viết (CLS = 0) -->
<div class="clini-card">
  <div class="clini-skeleton clini-skeleton-line-1" style="margin-bottom: 12px;"></div>
  <div class="clini-skeleton clini-skeleton-line-2" style="margin-bottom: 20px;"></div>
  <div class="clini-skeleton clini-skeleton-box"></div>
</div>
```

---

## 🏷️ 5. Medical Status Badges & Clinical Pills

### Code Mẫu Chuẩn:
```html
<span class="clini-badge clini-badge--critical clini-badge--pill">Chống Chỉ Định Tuyệt Đối</span>
<span class="clini-badge clini-badge--warning">Cần Theo Dõi SpO2</span>
<span class="clini-badge clini-badge--normal">Liều An Toàn</span>
<span class="clini-badge clini-badge--pearl">💡 Clinical Pearl</span>
<span class="clini-badge clini-badge--research">Chứng Cứ RCT Mức độ A</span>
```

---

## 🔍 6. Modern Search Bar with Shortcut

### Code Mẫu Chuẩn:
```html
<div class="clini-search-modern">
  <svg class="clini-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
  <input type="text" class="clini-input" placeholder="Tìm kiếm thuốc, phác đồ, triệu chứng...">
  <kbd class="clini-search-kbd">Ctrl K</kbd>
</div>
```

---

## 📋 Checklist Kiểm Tra Giao Diện Mới
1. [ ] Đã link `src/styles/tokens.css` và `src/styles/components/ui-core.css`?
2. [ ] Các nút bấm và ô nhập liệu đều đạt touch target tối thiểu $44\text{px}$ trên mobile?
3. [ ] Hoạt động trơn tru ở cả 2 giao diện `[data-theme="light"]` và `[data-theme="dark"]`?
4. [ ] Bàn phím điều hướng (Tab) hiển thị viền focus 3px rõ nét?
5. [ ] Đã thêm `@media (prefers-reduced-motion: reduce)` cho các chuyển động nếu có viết animation mới?
