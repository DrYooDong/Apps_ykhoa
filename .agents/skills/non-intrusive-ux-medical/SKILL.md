---
name: non-intrusive-ux-medical
description: Kỹ năng thiết kế giao diện Y khoa Không Xâm lấn (Non-Intrusive Medical UX) lấy cảm hứng từ Abridge AI. Áp dụng cho CliniPortal: Chế độ Focus Mode (Zen Mode), Slide-over Drawers thay thế Popup Modal, Progressive Disclosure (Tách tầng thông tin), Quick Glance Cards (Tóm tắt ≤5s) và Ambient Toasts.
---

# Non-Intrusive Medical UX — CliniPortal

Kỹ năng này định nghĩa các nguyên tắc và mẫu thành phần (UI Component Patterns) nhằm bảo đảm trải nghiệm người dùng trong y khoa đạt tiêu chuẩn **tinh gọn, không xâm lấn, giảm tải nhận thức (Cognitive Load Reduction)** và không làm gián đoạn luồng tư duy lâm sàng của bác sĩ hay sinh viên Y.

---

## 🎯 5 Nguyên Tắc Vàng (Abridge AI Inspiration)

1. **Zero Disruptive Modals**: Tuyệt đối không dùng `window.alert()` hoặc modal dialog chặn toàn màn hình khi tra cứu thông tin phụ. Dùng **Slide-over Drawer** (bên phải trên desktop / bottom-sheet trên mobile) hoặc **Inline Popover**.
2. **Distraction-Free Clinical Focus Mode**: Hỗ trợ thu gọn thanh điều hướng và chỉ giữ lại bài viết với độ rộng tối ưu (680px - 760px), hỗ trợ phím tắt `F` để bật và `Escape` để thoát.
3. **Progressive Disclosure (Tiết lộ thông tin lũy tiến)**: Thông tin cấp cứu/hành động chính đặt ở Tầng 1 (luôn thấy); cơ chế bệnh sinh chi tiết hoặc tài liệu tham khảo đặt trong `<details class="clinical-details">` (Tầng 2).
4. **≤5-Second Glance Scannability**: Mỗi phác đồ/bài viết bệnh lý cần có **"30-Second Glance Card"** ở đầu trang tóm gọn 3 ý chính + 1 điều cần tránh + 1 thuốc đầu tay.
5. **Night-shift & Bedside Touch Standards**: Touch target tối thiểu 44-48px, không gây nhấp nhầm khi thao tác gấp (trực cấp cứu ban đêm).

---

## 💻 Mẫu Cấu Trúc HTML Chuẩn

### 1. Nút Bật/Tắt Focus Mode trong Toolbar
```html
<button type="button" class="btn-focus-toggle" data-action="toggle-focus" title="Phím tắt: F">
  <i class="fa-solid fa-feather"></i> Đọc tập trung (F)
</button>
```

### 2. Thẻ Tóm Tắt Nhanh (30-Second Clinical Glance Card)
```html
<div class="glance-card">
  <div class="glance-card-header">
    <div class="glance-title-wrap">
      <i class="fa-solid fa-bolt glance-icon"></i>
      <h3 class="glance-title">Tóm Tắt Nhanh 30 Giây</h3>
    </div>
    <span class="glance-badge">Cốt lõi Lâm sàng</span>
  </div>
  <div class="glance-grid">
    <div class="glance-item">
      <div class="glance-item-label">Dấu hiệu Báo động</div>
      <div class="glance-item-val">Đau ngực kiểu màng phổi + Tụt HA + SpO2 &lt; 90%</div>
    </div>
    <div class="glance-item">
      <div class="glance-item-label">Chỉ định Đầu tay</div>
      <div class="glance-item-val">Kháng đông khẩn cấp + Siêu âm tim tại giường</div>
    </div>
    <div class="glance-item">
      <div class="glance-item-label">Lưu ý Tránh sai sót</div>
      <div class="glance-item-val">Không chờ D-Dimer nếu bệnh nhân nguy cơ rất cao</div>
    </div>
  </div>
</div>
```

### 3. Bằng chứng Tra cứu Trượt Phải (Slide-over Trigger)
```html
<!-- Bấm để mở Slide-over Drawer không làm gián đoạn bài đọc -->
<button type="button" class="evidence-link-trigger"
        data-evidence-title="ACC/AHA 2024 Guideline"
        data-evidence-badge="Khuyến cáo Mức IA"
        data-evidence-content="&lt;p&gt;Khuyến cáo sử dụng NOAC hàng đầu so với VKA ở bệnh nhân AF không do van tim.&lt;/p&gt;">
  <i class="fa-solid fa-book-bookmark"></i> ACC/AHA 2024 [IA]
</button>
```

### 4. Semantic Progressive Disclosure (Accordion mượt)
```html
<details class="clinical-details">
  <summary>
    <div class="clinical-details-summary-content">
      <i class="fa-solid fa-chevron-right clinical-details-icon"></i>
      <span>Xem Cơ chế Bệnh sinh Phân tử &amp; Sinh lý bệnh Chi tiết</span>
    </div>
    <span class="clinical-details-badge">Chuyên sâu</span>
  </summary>
  <div class="clinical-details-body">
    <!-- Nội dung chi tiết tầng 2 -->
    <p>Giải thích chuyên sâu về chuỗi tín hiệu enzyme, thụ thể và chuyển hóa...</p>
  </div>
</details>
```

---

## 🎨 Tích Hợp File CSS & JS

Trong các trang bài viết lâm sàng (`pages/...`), nhúng:
```html
<!-- CSS Non-Intrusive -->
<link rel="stylesheet" href="../../css/components/non-intrusive-ui.css">

<!-- JS Non-Intrusive Engine -->
<script src="../../js/non-intrusive-engine.js" defer></script>
```
*(Đếm chính xác cấp thư mục tương đối theo quy tắc của CliniPortal)*.
