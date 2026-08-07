---
name: content-structure-medical
description: Quy chuẩn phân cấp, tổ chức cấu trúc file, thư mục và điều hướng sidebar cho 7 phân hệ kiến thức y khoa trong CliniPortal.
---

# Content Structure Medical — CliniPortal

Hướng dẫn tổ chức kiến thức và phân cấp file cho 7 phân hệ chính của hệ sinh thái CliniPortal.

---

## 🗂️ Cấu trúc Phân hệ Kiến thức

```
pages/
├── Công cụ/                   # Phân hệ Công cụ Tính toán Lâm sàng
├── Dược lý/                   # Phân hệ Tra cứu Dược lý & Thuốc
├── Kỹ năng/                   # Phân hệ Kỹ năng Lâm sàng & Cận lâm sàng
├── Sinh lý - Sinh lý bệnh/    # Phân hệ Sinh lý & Sinh lý bệnh học
├── Tiếp cận/                  # Phân hệ Tiếp cận Triệu chứng & Flowchart
│   └── 4. Bệnh lý/            # Phân hệ Phác đồ Bệnh lý & Infographic
└── Y học chứng cứ/            # Phân hệ EBM & Guidelines Tóm tắt
```

---

## 📐 Naming Conventions & Rules

1. **Thư mục & File Name**:
   - Sử dụng Tiếng Việt có dấu cho các phân hệ đã có sẵn (`Công cụ`, `Dược lý`, `Kỹ năng`, `Sinh lý - Sinh lý bệnh`, `Tiếp cận`, `Y học chứng cứ`).
   - Tên file HTML bài viết dùng không dấu hoặc camelCase chuẩn hóa (ví dụ: `phannhomNMTC.html`, `DG_ABG.html`).

2. **Sidebar Navigation Alignment**:
   - Mọi trang con trong thư mục phân hệ phải chứa Sidebar tương ứng với đúng danh sách bài học/công cụ của phân hệ đó.
   - Active link trong sidebar phải có class `active` trên `<li>` hoặc `<a>` tương ứng.

3. **Breadcrumb Hierarchy**:
   - Trang con cấp 2 trở lên phải có thanh Breadcrumbs ở đầu `<main>`:
     `Trang chủ > [Tên Phân Hệ] > [Tên Bài Viết]`
