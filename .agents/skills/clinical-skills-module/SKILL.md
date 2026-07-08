---
name: clinical-skills-module
description: >
  Tạo và chỉnh sửa các trang kỹ năng lâm sàng (OSCE & Bedside Skills) trong phân hệ
  Kỹ năng của CliniPortal. Kích hoạt khi AI cần: tạo trang hướng dẫn kỹ năng mới,
  bài đọc kết quả cận lâm sàng, trang kỹ năng hồi sức, hoặc làm việc với
  pages/Kỹ năng/.
---

# Clinical Skills Module Skill

## 📁 Cấu trúc Phân hệ

```
pages/Kỹ năng/
├── ky-nang.html                      # Hub tổng
├── Cận lâm sàng/                     # Đọc kết quả xét nghiệm/hình ảnh
│   ├── Doc_KQCLS.html               # Overview
│   ├── doc-dien-giai-do.html
│   ├── doc-dong-mau.html
│   ├── doc-ecg-co-ban.html
│   ├── doc-ecg-nang-cao.html
│   ├── doc-nhuom-soi.html
│   ├── doc-sh-gan.html
│   ├── doc-sh-than.html
│   ├── doc-tpttb-mau.html
│   ├── doc-xq-bung.html
│   └── doc-xq-nguc.html
├── Hồi sức cấp cứu/                  # Kỹ năng hồi sức
│   ├── KN_Hoisinh_Timphoi.html
│   ├── KN_Hoisuc_Huyetdong.html
│   ├── KN_Kiemsoat_Duongtho.html
│   ├── KN_Sieuam_Capcuu.html
│   ├── KN_Triage.html
│   └── KN_Xutri_Ngodoc.html
├── Lâm sàng/                         # Kỹ năng khám lâm sàng (OSCE)
│   ├── Khám cơ xương khớp/
│   ├── Khám da tóc móng/
│   ├── Khám hô hấp/
│   ├── Khám nội tiết/
│   ├── Khám sinh dục/
│   ├── Khám tai mũi họng/
│   ├── Khám thần kinh/
│   ├── Khám thận - tiết niệu/
│   ├── Khám thị giác/
│   ├── Khám tim mạch/
│   └── Khám tiêu hóa/
└── Quản lý điều trị/
    └── Luachon_Khangsinh.html
```

---

## ⚡ Đường dẫn & CSS/JS (Cấp 3)

File trong `pages/Kỹ năng/[Phân nhóm]/file.html` — **prefix `../../../`**:

```html
<link rel="stylesheet" href="../../../css/reset.css">
<link rel="stylesheet" href="../../../css/main.css">
<link rel="stylesheet" href="../../../css/components/header.css">
<link rel="stylesheet" href="../../../css/components/sidebar.css">
<link rel="stylesheet" href="../../../css/components/footer.css">
<link rel="stylesheet" href="../../../css/components/clinical-skill.css">  <!-- BẮT BUỘC -->

<script src="../../../js/main.js" defer></script>
<script src="../../../components/header.js" defer></script>
<script src="../../../components/footer.js" defer></script>
<script src="../../../js/clinical-skill-tabs.js" defer></script>  <!-- Tab switching -->
```

---

## 🎨 CSS Classes — clinical-skill.css

### Layout Tab Kỹ năng (Chuẩn OSCE)

```html
<div class="skill-container">
  <!-- Thanh tab -->
  <div class="skill-tabs">
    <button class="skill-tab active" data-tab="chuan-bi">
      <i class="fas fa-list-check"></i> Chuẩn bị
    </button>
    <button class="skill-tab" data-tab="tien-hanh">
      <i class="fas fa-hands"></i> Tiến hành
    </button>
    <button class="skill-tab" data-tab="theo-doi">
      <i class="fas fa-eye"></i> Theo dõi
    </button>
    <button class="skill-tab" data-tab="tai-bien">
      <i class="fas fa-triangle-exclamation"></i> Tai biến
    </button>
  </div>

  <!-- Nội dung tab -->
  <div class="skill-tab-content active" id="chuan-bi">
    <!-- Checklist chuẩn bị -->
  </div>
  <div class="skill-tab-content" id="tien-hanh">
    <!-- Các bước thực hiện -->
  </div>
  <div class="skill-tab-content" id="theo-doi">
    <!-- Theo dõi sau thủ thuật -->
  </div>
  <div class="skill-tab-content" id="tai-bien">
    <!-- Tai biến và xử trí -->
  </div>
</div>
```

### Danh sách bước thực hiện

```html
<ol class="step-list">
  <li class="step-item">
    <div class="step-number">1</div>
    <div class="step-content">
      <strong>Giải thích cho bệnh nhân</strong>
      <p>Mô tả chi tiết bước thực hiện...</p>
    </div>
  </li>
</ol>
```

### Hộp chú ý lâm sàng

```html
<div class="skill-note note-warning">
  <i class="fas fa-exclamation-triangle"></i>
  <strong>Lưu ý:</strong> Nội dung cảnh báo quan trọng
</div>
<div class="skill-note note-info">
  <i class="fas fa-info-circle"></i>
  Thông tin bổ trợ
</div>
```

---

## 🔬 CSS Classes — paraclinical.css (Đọc kết quả CLS)

Dành cho các trang trong `Cận lâm sàng/`:

```html
<!-- Bảng chỉ số xét nghiệm -->
<div class="lab-table-wrapper">
  <table class="lab-table">
    <thead>
      <tr>
        <th>Chỉ số</th>
        <th>Bình thường</th>
        <th>Bất thường thấp</th>
        <th>Bất thường cao</th>
        <th>Ý nghĩa lâm sàng</th>
      </tr>
    </thead>
    <tbody>
      <tr class="lab-row-normal">...</tr>
      <tr class="lab-row-abnormal">...</tr>
      <tr class="lab-row-critical">...</tr>
    </tbody>
  </table>
</div>

<!-- Badge trạng thái -->
<span class="lab-badge badge-normal">Bình thường</span>
<span class="lab-badge badge-low">Thấp ↓</span>
<span class="lab-badge badge-high">Cao ↑</span>
<span class="lab-badge badge-critical">Nguy hiểm!</span>
```

---

## 📝 Quy tắc Đặt Tên File

```
[Loại]_[Tên Rút gọn].html

Kỹ năng lâm sàng (OSCE):  KN_[Tên].html  →  VD: KN_Kham_Tim.html
Đọc CLS:                   doc-[ten].html  →  VD: doc-ecg-co-ban.html
Hồi sức:                   KN_Hoisuc_[Tên].html
```

---

## 📝 Quy trình Tạo Trang Kỹ năng Mới

1. **Xác định loại** — OSCE/Lâm sàng, Đọc CLS, hay Hồi sức
2. **Chọn thư mục** con phù hợp
3. **Copy boilerplate** từ `templates/clinical-skill-template.html`
4. **Thêm CSS** `clinical-skill.css` (tabs) hoặc `paraclinical.css` (CLS)
5. **Thêm JS** `clinical-skill-tabs.js` để tabs hoạt động
6. **Cập nhật** `docs/FILE_MAP.md` sau khi hoàn thành
