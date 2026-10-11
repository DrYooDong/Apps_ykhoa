---
description: Kiểm tra toàn diện chất lượng giao diện, HTML, CSS tokens, đường dẫn, Dark Mode và tính toàn vẹn
---

# Lệnh Kiểm Tra Toàn Diện: /audit

Khi nhận lệnh `/audit [phạm vi: file/thư mục/toàn dự án]`, AI Agent tiến hành quét tự động theo bộ 6 tiêu chí vàng của CliniPortal:

---

## 📋 Ma Trận Kiểm Tra 6 Tiêu Chí Vàng

| STT | Hạng mục | Quy tắc kiểm tra | Script / Công cụ |
|---|---|---|---|
| **1** | **Toàn vẹn HTML & Cú pháp** | Kiểm tra đóng/mở thẻ hợp lệ, không có thẻ div mồ côi, không lỗi lồng thẻ (`<p>` trong `<p>`) | `node tools/scratch/check_tags.js <file>` hoặc script audit |
| **2** | **Đường dẫn Tương đối (Relative Paths)** | Đếm chính xác cấp thư mục (Cấp 0 `./`, Cấp 1 `../`, Cấp 2 `../../`, Cấp 3 `../../../`). Không dùng đường dẫn tuyệt đối local (`C:\...`, `/pages/...`) | Rà soát `href`, `src`, `url()` |
| **3** | **Design Tokens & Dark Mode** | 100% màu sắc dùng `var(--color-...)`. Không hardcode hex `#fff`, `#000` trực tiếp trong component; `[data-theme="dark"]` hoạt động hoàn chỉnh | Quét CSS Variables |
| **4** | **Responsive & Touch Ergonomics** | Giao diện hiển thị tốt trên Mobile width $\le 375\text{px}$. Nút bấm & interactive targets $\ge 44\text{px} \times 44\text{px}$ | Kiểm tra viewport & CSS media queries |
| **5** | **Khả năng Truy cập (Accessibility / a11y)** | Độ tương phản màu đạt WCAG 2.1 AA/AAA, các nút icon có `aria-label`, ảnh có `alt` | Accessibility Audit |
| **6** | **Chất lượng Tri thức & EBM** | Không để lại placeholder dạng "TODO", "Lorem ipsum", hoặc mã hóa HTML Entities lỗi (`&amp;`, `&quot;` trôi nổi trong text) | `node tools/scripts/medical-linter.mjs` |

---

## 📊 Báo Cáo Kết Quả Audit
AI Agent tổng hợp kết quả theo định dạng:
1. **Tổng quan Trạng thái**: `[PASS]` / `[WARNING]` / `[FAIL]`
2. **Chi tiết Lỗi (nếu có)**: Tên file, dòng, mô tả vi phạm.
3. **Đề xuất Hành động Khắc phục Nhanh**: Các khối mã cần thay thế ngay.
