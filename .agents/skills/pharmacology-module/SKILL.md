---
name: pharmacology-module
description: >
  Tạo và chỉnh sửa các trang dược lý (Pharmacology) trong phân hệ Dược lý của CliniPortal.
  Kích hoạt khi AI cần: tạo trang dược lý theo triệu chứng, công cụ tra cứu thuốc,
  cập nhật phác đồ thuốc, thêm thông tin thuốc mới, hoặc làm việc với
  src/content/pharmacology/.
---

# Pharmacology Module Skill

## 🛑 MODULE RULES BẮT BUỘC (Quy tắc Module Dược Lý)

1. **Chuẩn Bảng Liều Dùng**: Mọi card/bảng thuốc phải ghi rõ: Tên gốc Generic, Nhóm Dược lý, Liều dùng & Tần suất, Đường dùng (PO/IV/IM/SC), Chống chỉ định & Thận trọng.
2. **Cảnh Báo An Toàn Theo Mã Màu WHO**:
   - `caution-high` / Màu Đỏ: Chống chỉ định tuyệt đối / Tác dụng phụ nguy hiểm tính mạng.
   - `caution-moderate` / Màu Cam: Thận trọng (thai kỳ, suy gan/thận).
   - `caution-low` / Màu Xanh dương: Theo dõi cận lâm sàng định kỳ.
3. **Quy Tắc Đặt Tên File Dược Lý**: File mới trong `symptoms/` phải bắt đầu bằng `dl-<triuchung>.html` (ví dụ: `dl-daudau.html`), file trong `tools/` dùng kebab-case.
4. **Kiểm Tra HTML Integrity**: Chạy `node scratch/check_tags.js path/to/file.html` khi sửa/tạo trang dược lý.

---

## 📁 Cấu trúc Phân hệ

```
src/content/pharmacology/
├── duoc-ly.html                      # Hub tổng
├── readme.md                         # Giới thiệu phân hệ
├── symptoms/                         # Dược lý theo triệu chứng (Symptom-based)
│   ├── dl-chongmat.html              # Chóng mặt
│   ├── dl-daubungcap.html            # Đau bụng cấp
│   ├── dl-daudau.html                # Đau đầu
│   ├── dl-ho.html                    # Ho
│   └── dl-nonoi.html                 # Nôn nao
└── tools/                            # Công cụ & Tra cứu tương tác
    ├── ma-tran-tuong-tac.html
    ├── dose-optimizer.html
    ├── pk-simulator.html
    └── tra-cuu-thuoc.html
```

---

## 🎨 Layout Dược lý theo Triệu chứng (Symptom-based)

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

## 📝 Quy trình Tạo Trang Dược lý Mới

1. **Chọn thư mục** `symptoms/` hoặc `tools/`
2. **Xem mẫu** trang hiện có trong cùng nhóm để copy structure
3. **Thêm CSS/JS** hỗ trợ nếu có tính năng filter
4. **Cập nhật** `docs/FILE_MAP.md` sau khi hoàn thành

