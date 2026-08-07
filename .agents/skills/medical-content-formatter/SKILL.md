---
name: medical-content-formatter
description: Định dạng bài viết y khoa chuẩn mobile, ngắt dòng trực quan, bổ sung khung chú thích y khoa (Alert, Clinical Pearl, Comparison) & thẻ HTML semantic cho CliniPortal.
---

# Medical Content Formatter & Layout Optimizer

Skill này giúp AI biên tập và định dạng các văn bản Y khoa thô thành bài viết chuẩn HTML5 Semantic, tương thích hoàn toàn với Design System và CSS Variables của CliniPortal.

---

## 🎯 Mục tiêu của Skill

1. **Mobile-First Readability**: Tối ưu hóa khoảng trắng, độ dài đoạn văn (dưới 3-4 dòng trên di động), tăng khả năng đọc lướt cho bác sĩ/sinh viên y khoa.
2. **Chuẩn hóa HTML Semantic**: Sử dụng đúng hệ thống thẻ (`<h1>`-`<h3>`, `<article>`, `<section>`, `<aside>`, `<details>`, `<table>`).
3. **Tích hợp Components Y khoa**: Tự động chuyển đổi các chú ý quan trọng thành các khung UI chuyên biệt (`.alert-card`, `.clinical-pearl`, `.dose-table`, `.comparison-box`).

---

## 📏 Quy chuẩn Định dạng Y khoa

### 1. Quy chuẩn Tiêu đề & Cấu trúc Phân cấp
- `<h1>`: Tên bài viết (chỉ có 1 `<h1>` duy nhất mỗi trang).
- `<h2>`: Các mục lớn trong tiếp cận (ví dụ: `1. Định nghĩa & Nguyên nhân`, `2. Chẩn đoán Lâm sàng`, `3. Phác đồ Điều trị`).
- `<h3>`: Các tiêu đề phụ (ví dụ: `2.1. Triệu chứng cơ năng`, `2.2. Cận lâm sàng`).

### 2. Định dạng Khung Chú thích Lâm sàng (UI Components)

#### 🔴 Cảnh báo Đỏ (Red Flags / Khẩn cấp):
```html
<div class="alert-card alert-danger">
  <div class="alert-header"><i class="fas fa-exclamation-triangle"></i> DẤU HIỆU CẢNH BÁO ĐỎ</div>
  <div class="alert-body">
    Cần can thiệp cấp cứu ngay nếu bệnh nhân có tụt huyết áp (PAS < 90 mmHg) hoặc SpO2 < 92%.
  </div>
</div>
```

#### 💡 Ngọc Lâm sàng (Clinical Pearls / Lưu ý Thực hành):
```html
<div class="clinical-pearl">
  <div class="pearl-title"><i class="fas fa-lightbulb"></i> CLINICAL PEARL</div>
  <p>Luôn kiểm tra đường huyết mao mạch ngay lập tức cho tất cả bệnh nhân có rối loạn ý thức cấp tính.</p>
</div>
```

#### 📊 Bảng Liều Thuốc & So Sánh (Dose Table):
- Mọi bảng phải được bọc trong `<div class="table-responsive">` để không bị đè vỡ layout trên thiết bị di động.
- Dùng CSS variable `var(--color-primary)` cho header bảng.

---

## 🛠️ Quy trình Định dạng 4 Bước

1. **Bước 1 (Clean up & Medical Humanize)**: Loại bỏ các ký tự thừa, sửa lỗi khoảng trắng và áp dụng skill `medical-humanizer` để khử các văn phong sáo rỗng AI-isms.
2. **Bước 2 (Breakdown)**: Cắt nhỏ các đoạn văn dài > 4 dòng thành các dòng ngắn gọn, có bullet points.
3. **Bước 3 (Tagging UI)**: Gán các thẻ CSS Component y khoa thích hợp cho các nội dung cảnh báo, liều thuốc, trích dẫn.
4. **Bước 4 (Check relative path & design tokens)**: Đảm bảo sử dụng CSS Variables chuẩn (`var(--color-primary)`, `var(--color-surface)`) thay vì hardcode màu hexadecimal.
