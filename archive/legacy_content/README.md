# CliniPortal — Thư Mục Lưu Trữ Nội Dung Y Khoa (Content Root)

> **Thư mục `content/`** là nơi lưu trữ toàn bộ dữ liệu nội dung bài viết, phác đồ, bài sinh lý, dược lý và cấu hình công cụ lâm sàng dưới định dạng **ASCII Kebab-case chuẩn mực**.

---

## 🗂️ Cấu Trúc Thư Mục Chuẩn (ASCII Kebab-case)

```
content/
├── calculators/       ← Cấu hình & công thức Máy tính Lâm sàng (.json, .js)
├── pharmacology/      ← Bài viết & dữ liệu Dược lý học (.md, .json)
├── pathophysiology/   ← Bài đọc Sinh lý & Sinh lý bệnh (.md)
├── ebm/               ← Y học chứng cứ & Guidelines tóm tắt (.md)
├── skills/            ← Hướng dẫn Kỹ năng lâm sàng, đọc ECG/CXR (.md)
└── approaches/        ← Lưu đồ tiếp cận chẩn đoán & phác đồ bệnh lý (.md, .json)
```

---

## 📐 Quy Tắc Đặt Tên File (Naming Conventions)

1. **Sử dụng hoàn toàn chữ thường ASCII và dấu gạch nối (`kebab-case`)**:
   - ❌ `Sốc Nhiễm Khuẩn.md`, `CongCu_1.json`
   - ✅ `soc-nhiem-khuan-sepsis3.md`, `gcs-calculator.json`

2. **Bài viết Markdown (`.md`)**:
   - Phải chứa phần **YAML Frontmatter** ở đầu file để `CliniCategoryMapper` và `ArticleReaderEngine` nhận diện metadata:
   ```yaml
   ---
   title: "Tiêu Đề Bài Viết"
   category: "Chuyên Khoa"
   author: "Tên Tác Giả"
   updatedDate: "DD/MM/YYYY"
   ---
   ```

3. **Ánh xạ Tiếng Việt**:
   - Hệ thống hiển thị Tiếng Việt trên giao diện UI được điều khiển bởi `data/categories.json` và `js/core/category-mapper.js`. Không cần đặt tên thư mục bằng Tiếng Việt có dấu.
