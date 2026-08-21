# Workflow: Quy Trình Tạo Bài Dịch Tễ Học Y Khoa (Epidemiology Workflow)

> **Mục đích**: Hướng dẫn quy trình 6 bước khép kín từ file tài liệu Markdown trong Knowledge Vault (`knowledge-vault/1.4. Kho dịch tễ học/...`) chuyển thành trang web con HTML chuẩn mực trong CliniPortal (`src/content/basic-medical/epidemiology/...`).

---

## 🧭 Tổng Quan Quy Trình 6 Bước

```text
[1. Tiếp nhận file Vault .md] ➔ [2. Chuẩn hóa & Trích xuất Metadata] ➔ [3. Thiết kế SVG & Bảng Dữ Liệu]
            ➔ [4. Tạo file HTML Cấp 4] ➔ [5. Kiểm Thử QA Tự Động] ➔ [6. Đăng ký Mục lục]
```

---

## 📋 Chi Tiết Từng Bước Thực Hiện

### Bước 1: Tiếp Nhận & Phân Tích File Knowledge Vault
- Đọc file Markdown nguồn từ thư mục `knowledge-vault/1.4. Kho dịch tễ học/[Chuyên khoa]/DTH_[Tên bệnh].md`.
- Trích xuất: Tác nhân gây bệnh, Véc-tơ trung gian, Thời kỳ ủ bệnh (EIP, IIP), Nhóm nguy cơ cao, Yếu tố môi trường, Số liệu dịch tễ (Toàn cầu, Việt Nam, Quốc gia lân cận), và Trích dẫn tài liệu tham khảo AMA.

### Bước 2: Chuẩn Hóa Ký Tự Toán Học & Heading
- Chuyển toàn bộ công thức toán / ký hiệu LaTeX `$ ... $` sang Unicode hoặc HTML entities:
  - `\ge` hoặc `\geq` &rarr; `&ge;` hoặc `≥`
  - `\le` hoặc `\leq` &rarr; `&le;` hoặc `≤`
  - `log_{10}` &rarr; `log<sub>10</sub>`
  - `CO_2` &rarr; `CO<sub>2</sub>`
- Chuyển toàn bộ Heading Markdown (`#`, `##`, `###`) sang thẻ HTML tương ứng (`<h1>`, `<h2>`, `<h3>`).

### Bước 3: Thiết Kế Sơ Đồ Pure Inline SVG & Bảng So Sánh
- **Tam giác dịch tễ học**: Minh họa tương tác giữa Tác nhân, Vật chủ và Môi trường.
- **Chu kỳ lây truyền & Timeline ủ bệnh**: Minh họa rõ ràng thời gian nhiễm vi rút huyết (Viraemia), thời kỳ ủ bệnh ngoại lai (EIP 8-12 ngày) ở muỗi và thời kỳ ủ bệnh nội tại (IIP 3-14 ngày) ở người.
- **Bảng đối sánh véc-tơ**: Tổng hợp so sánh hình thái, tập tính, sức bền trứng, thời gian sống của các loài muỗi/trung gian truyền bệnh.

### Bước 4: Tạo File HTML Theo Template Chuẩn
- Tạo tệp `src/content/basic-medical/epidemiology/dth-[ten-benh-slug].html`.
- Áp dụng cấu trúc 8 Trụ cột (Pillars), dải sticky nav `.pillars-nav`, các thẻ callout semantic (`.pearl-box`, `.danger-box`, `.reaction-box`, `.info-box`).
- Khai báo đúng đường dẫn cấp 4: `../../../../css/` và `../../../../components/`.

### Bước 5: Kiểm Thử QA Toàn Vẹn Thẻ & Định Dạng
- Chạy kiểm tra đóng/mở thẻ HTML:
  ```bash
  node scratch/check_tags.js src/content/basic-medical/epidemiology/dth-[ten-benh-slug].html
  ```
- Chạy kiểm tra tồn dư ký tự `$` và `#`:
  ```bash
  node scratch/check_format_bugs.js src/content/basic-medical/epidemiology/dth-[ten-benh-slug].html
  ```
- Kiểm tra tính tương thích Dark Mode và Responsive Mobile.

### Bước 6: Đăng Ký Chỉ Mục & Barrel
- Thêm đường dẫn bài viết vào `src/content/basic-medical/readme.md` và các trang Hub liên quan.
- Chạy `npm run build` để kiểm tra toàn bộ pipeline.
