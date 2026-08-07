---
name: performance-optimizer-medical
description: Kỹ thuật tối ưu hóa tốc độ tải trang, giảm thiểu thời gian phản hồi (TTFB, LCP, CLS) cho thiết bị y tế cấu hình thấp và máy tính bệnh viện trong CliniPortal.
---

# Performance Optimizer Medical — CliniPortal

Hướng dẫn tối ưu hóa hiệu năng ứng dụng web tĩnh CliniPortal giúp tải tức thì ngay cả trên thiết bị y tế cấu hình thấp hoặc môi trường mạng bệnh viện yếu.

---

## ⚡ Các Kỹ thuật Tối ưu Hàng đầu

### 1. Lazy Loading Assets Y khoa
- Áp dụng `loading="lazy"` cho tất cả các hình ảnh giải phẫu, sơ đồ bệnh lý không nằm ở vị trí đầu trang (Above the Fold):
  ```html
  <img src="../../../assets/images/anatomy-heart.jpg" alt="Giải phẫu tim" loading="lazy" width="600" height="400">
  ```

### 2. Debounce & Throttle cho Công cụ Tìm kiếm / Tra cứu
Khi bác sĩ gõ từ khóa tra cứu thuốc hoặc mã ICD-10, debounce 250ms để giảm số lần lọc mảng dữ liệu:

```javascript
function debounce(func, delay = 250) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

const searchInput = document.getElementById('icdSearchInput');
searchInput?.addEventListener('input', debounce((e) => {
  filterICD10Results(e.target.value);
}, 250));
```

### 3. Tối ưu Cumulative Layout Shift (CLS)
- Khai báo kích thước `width` và `height` rõ ràng trên thẻ `<img>` và `<svg>` để trình duyệt dành sẵn không gian hiển thị, tránh giật vỡ layout khi hình ảnh tải xong.
- Định vị kích thước cố định cho Placeholder của Header và Footer.

### 4. Critical CSS & Deferred JavaScript
- Luôn đặt thẻ `<script>` ở cuối `<body>` với thuộc tính `defer` để không cản trở quá trình dựng HTML (DOM Parsing).
