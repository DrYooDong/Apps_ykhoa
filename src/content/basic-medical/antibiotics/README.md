# 💊 Phân Hệ Kháng Sinh Học Lâm Sàng (Clinical Antibiotics Subsystem)
> **Đường dẫn**: `src/content/basic-medical/antibiotics/`  
> **Hệ sinh thái**: CliniPortal — Cơ sở Y khoa & Quản lý Kháng sinh (AMS)  
> **Quy chuẩn Thiết kế MDX**: Xem chi tiết tại [**`ANTIBIOTICS_MDX_DESIGN_SPEC.md`**](./ANTIBIOTICS_MDX_DESIGN_SPEC.md)

---

## 🧭 Hướng Dẫn Dành Cho AI & Lập Trình Viên

Khi cần đọc hiểu, biên tập, chỉnh sửa hoặc tạo mới các bài học `.mdx` trong phân hệ Kháng Sinh Học:
1. **Đọc tài liệu quy chuẩn thiết kế giao diện**: Mở file [**`ANTIBIOTICS_MDX_DESIGN_SPEC.md`**](./ANTIBIOTICS_MDX_DESIGN_SPEC.md). File này quy định toàn bộ quy chuẩn từ Frontmatter YAML, Hero Badges, thanh điều hướng `<AntibioticQuickNav />`, huy hiệu `<AWaRePill />`, sơ đồ Pure Editorial SVG, bảng dược lý, công thức KaTeX, alerts và mã nguồn mẫu Golden Template.
2. **Đăng ký bài học mới**: Khi tạo bài học mới, khai báo thông tin bài vào file [**`data/antibiotics-curriculum-data.ts`**](./data/antibiotics-curriculum-data.ts).
3. **Tuân thủ Dark Mode & Design Tokens**: Sử dụng biến màu `var(--dsp-...)` và `var(--color-...)`, không hardcode màu sắc.

---

## 📂 Bản Đồ Thư Mục Phân Hệ

- **`ANTIBIOTICS_MDX_DESIGN_SPEC.md`**: Quy chuẩn thiết kế giao diện MDX chi tiết cho AI.
- **`module1-vi-sinh/`**: 2 bài về Cấu trúc vi khuẩn, Vách Peptidoglycan, Kênh Porin & Nhuộm Gram.
- **`module2-phan-loai-aware/`**: 2 bài về Cơ chế phân tử & Khung phân tầng WHO AWaRe 2023.
- **`module3-pk-pd-duong-dung/`**: 3 bài về Chỉ số PK/PD (%T>MIC, Cmax/MIC, AUC/MIC), Phổ tác động của các loại kháng sinh & Chuyển đổi IV sang PO.
- **`module4-ke-don-an-toan-adr/`**: 3 bài về Bảng kiểm 8 điều D8, Nguyên tắc phối hợp kháng sinh & Tác dụng phụ ADR.
- **`module5-di-ung-beta-lactam/`**: 3 bài về Dị ứng thật vs Giả dị ứng, Tỷ lệ dị ứng chéo Beta-lactam & Dị ứng Quinolone.
- **`module6-phac-do-ngoai-tru/`**: 3 bài về Phác đồ điều trị ngoại trú chuẩn EBM (CAP, UTI, SSTI).
- **`components/`**: Linh kiện TypeScript native (`AntibioticQuickNav.ts`, `AWaRePill.ts`).
- **`data/`**: CSDL chương trình đào tạo (`antibiotics-curriculum-data.ts`).
- **`types/`**: Định nghĩa kiểu TypeScript (`antibiotics.types.ts`).
- **`views/`**: View hiển thị Hub tổng quan và Công cụ tương tác.

