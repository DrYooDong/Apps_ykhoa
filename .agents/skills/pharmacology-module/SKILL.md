---
name: pharmacology-module
description: >
  Tạo và chỉnh sửa các trang dược lý (Pharmacology) trong phân hệ Dược lý của CliniPortal.
  Kích hoạt khi AI cần: tạo trang dược lý theo triệu chứng hoặc theo chuyên khoa,
  cập nhật phác đồ thuốc, thêm thông tin thuốc mới, hoặc làm việc với
  pages/Dược lý/.
---

# Pharmacology Module Skill

## 📁 Cấu trúc Phân hệ

```
pages/Dược lý/
├── duoc-ly.html                      # Hub tổng
├── README.md                         # Giới thiệu phân hệ
├── Triệu chứng/                      # Dược lý theo triệu chứng (Symptom-based)
│   ├── DL_Chongmat.html             # Chóng mặt
│   ├── DL_Daubungcap.html           # Đau bụng cấp
│   ├── DL_Daudau.html               # Đau đầu
│   ├── DL_Ho.html                   # Ho
│   └── DL_Nonoi.html                # Nôn nao
└── Chuyên khoa/                      # Dược lý theo chuyên khoa (Specialty-based)
    ├── DL_Hohap.html                # Hô hấp
    ├── DL_Khangsinh.html            # Kháng sinh (file lớn ~105KB)
    ├── DL_Timmach.html              # Tim mạch
    ├── DL_Tiêuhoá.html              # Tiêu hóa
    ├── DL_Ttoan_than.html           # Toan thận
    └── DL_Vanmach.html              # Vận mạch
```

---

## ⚡ Đường dẫn & CSS/JS (Cấp 3)

File trong `pages/Dược lý/[Nhóm]/file.html` — **prefix `../../../`**:

```html
<link rel="stylesheet" href="../../../css/reset.css">
<link rel="stylesheet" href="../../../css/main.css">
<link rel="stylesheet" href="../../../css/components/header.css">
<link rel="stylesheet" href="../../../css/components/sidebar.css">
<link rel="stylesheet" href="../../../css/components/footer.css">
<link rel="stylesheet" href="../../../css/components/pharmacology-symptoms.css">  <!-- BẮT BUỘC -->

<script src="../../../js/main.js" defer></script>
<script src="../../../components/header.js" defer></script>
<script src="../../../components/footer.js" defer></script>
<script src="../../../js/pharmacology-symptoms.js" defer></script>  <!-- Filter & display -->
```

---

## 🎨 Hai Kiểu Layout Dược lý

### Layout 1 — Symptom-based (Theo Triệu chứng)

Người dùng chọn triệu chứng → xem các thuốc phù hợp theo từng nhóm.

```html
<!-- Selector triệu chứng -->
<div class="symptom-selector">
  <button class="sym-btn active" data-symptom="all">Tất cả</button>
  <button class="sym-btn" data-symptom="mild">Nhẹ</button>
  <button class="sym-btn" data-symptom="moderate">Trung bình</button>
  <button class="sym-btn" data-symptom="severe">Nặng</button>
</div>

<!-- Grid thuốc -->
<div class="drug-grid">
  <div class="drug-card" data-symptom="mild moderate">
    <div class="drug-header">
      <span class="drug-name">Paracetamol</span>
      <span class="drug-class">Giảm đau - Hạ sốt</span>
    </div>
    <div class="drug-body">
      <div class="drug-dosage">
        <span class="dosage-label">Liều dùng:</span>
        <span class="dosage-value">500–1000mg mỗi 6–8h</span>
      </div>
      <div class="drug-note">Tối đa 4g/ngày; thận trọng với gan</div>
    </div>
    <div class="drug-footer">
      <span class="drug-route route-oral">PO</span>
      <span class="drug-route route-iv">IV</span>
    </div>
  </div>
</div>
```

### Layout 2 — Specialty-based (Theo Chuyên khoa)

Các nhóm thuốc được tổ chức theo cơ chế tác dụng hoặc chỉ định.

```html
<!-- Accordion nhóm thuốc -->
<div class="drug-group">
  <div class="group-header" onclick="toggleGroup(this)">
    <h3 class="group-title">
      <i class="fas fa-heartbeat"></i> Beta-blockers
    </h3>
    <i class="fas fa-chevron-down group-arrow"></i>
  </div>
  <div class="group-content">
    <!-- Bảng thuốc trong nhóm -->
    <table class="drug-table">
      <thead>
        <tr>
          <th>Tên thuốc</th>
          <th>Liều</th>
          <th>Chỉ định chính</th>
          <th>Lưu ý</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="drug-name-cell">Metoprolol</td>
          <td>25–100mg 2 lần/ngày</td>
          <td>THA, Suy tim, NMCT</td>
          <td class="caution-text">Không dùng khi block AV</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

---

## 🏷️ CSS Classes cho Thông tin Thuốc

```html
<!-- Đường dùng thuốc -->
<span class="drug-route route-oral">PO</span>    <!-- Uống -->
<span class="drug-route route-iv">IV</span>       <!-- Tĩnh mạch -->
<span class="drug-route route-im">IM</span>       <!-- Bắp -->
<span class="drug-route route-sc">SC</span>       <!-- Dưới da -->
<span class="drug-route route-topical">Tại chỗ</span>

<!-- Mức độ cảnh báo -->
<span class="drug-caution caution-high">⛔ CCĐ: Suy thận nặng</span>
<span class="drug-caution caution-moderate">⚠️ Thận trọng: Phụ nữ mang thai</span>
<span class="drug-caution caution-low">ℹ️ Theo dõi chức năng gan</span>

<!-- Phân loại thuốc -->
<span class="drug-class-badge class-antibiotic">Kháng sinh</span>
<span class="drug-class-badge class-antihypertensive">Hạ áp</span>
<span class="drug-class-badge class-analgesic">Giảm đau</span>
```

---

## 📝 Quy tắc Đặt Tên File

```
DL_[Tên chủ đề].html

Theo triệu chứng:  DL_[Trieuchung].html  →  VD: DL_Sot.html
Theo chuyên khoa:  DL_[Chuyen khoa].html →  VD: DL_Timmach.html
```

---

## 📝 Quy trình Tạo Trang Dược lý Mới

1. **Xác định loại** — Triệu chứng hay Chuyên khoa
2. **Chọn thư mục** con tương ứng
3. **Xem mẫu** trang hiện có trong cùng nhóm để copy structure
4. **Thêm CSS** `pharmacology-symptoms.css`
5. **Thêm JS** `pharmacology-symptoms.js` nếu có tính năng filter
6. **Cập nhật** `docs/FILE_MAP.md` sau khi hoàn thành
