---
name: fix-infobox-layout-bug
description: >
  Khắc phục lỗi khung .infobox bị ép méo 2 cột, dồn tiêu đề sang trái và tràn công thức KaTeX trên giao diện CliniPortal.
---

# 📦 FIX INFOBOX LAYOUT & STACKING BUG SKILL

Tài liệu này định nghĩa quy trình chẩn đoán, nguyên nhân gốc rễ và các bước khắc phục chuẩn mực cho dạng lỗi **vỡ layout khung .infobox (ép méo 2 cột)** trong hệ sinh thái CliniPortal.

---

## 🔍 1. Triệu Chứng Nhận Diện (Symptoms)

- **Biểu hiện**: Thẻ `.infobox-title` bị dồn về một cột hẹp phía bên trái, trong khi phần nội dung `.infobox-body` bị ép sang bên phải tạo thành 2 cột mất cân đối.
- **Tác động phụ**: Các công thức toán học KaTeX (`$...$`) hoặc bảng biểu nằm bên trong bị co hẹp diện tích hiển thị, dẫn đến tràn viền ngang hoặc bị che khuất.
- **Môi trường bị ảnh hưởng**: Cả phiên bản Astro build tĩnh lẫn SPA HTML Reader View (`#/basic-medical/...`).

---

## 🧬 2. Phân Tích Nguyên Nhân Cốt Lõi (Root Cause Analysis)

- **Nguyên nhân chính**: Lớp CSS `.infobox` được gán thuộc tính `display: flex; align-items: flex-start; gap: 1rem;` mà không chỉ định rõ `flex-direction: column`.
- Khi `.infobox` chứa `<div class="infobox-title">` thay vì icon, thẻ tiêu đề bị đối xử như một flex item nằm ngang (row item), dẫn đến chia đôi chiều rộng theo chiều ngang.
- **Vùng mã nguồn rủi ro**:
  - `src/styles/components/guidelines-article.css`
  - `src/content/basic-medical/css/physio-shared.css`
  - `src/styles/components/mdx/mdx-alerts.css`
  - `src/content/basic-medical/views/physio-html-reader-view.ts`

---

## 🛠️ 3. Quy Trình Khắc Phục 2 Tầng Chuẩn (2-Layer Remediation Workflow)

### Tầng 1: Bổ sung quy tắc xếp chồng dọc tự động trong CSS tĩnh
Thêm quy tắc CSS sử dụng bộ chọn `:has()` để tự động chuyển sang xếp dọc khi có tiêu đề:

```css
.infobox:has(> .infobox-title),
.infobox:not(:has(.infobox-icon)):not(:has(.mdx-alert-icon)) {
  flex-direction: column !important;
  align-items: stretch !important;
  gap: 0.5rem !important;
}

.infobox-title {
  display: block !important;
  width: 100% !important;
  font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
  font-size: 0.98rem;
  font-weight: 800;
  line-height: 1.4;
  margin-bottom: 0.35rem;
  color: var(--color-text, #0f172a);
}

[data-theme="dark"] .infobox-title {
  color: var(--color-text, #f8fafc) !important;
}
```

### Tầng 2: Phòng thủ trong SPA Reader View (`physio-html-reader-view.ts`)
Bổ sung đoạn style inline vào thẻ `<style id="physio-mdx-reader-styles">` với bộ chọn ưu tiên `#physio-article-mount .infobox:has(> .infobox-title)` kèm `!important` để chống lại độ trễ nạp CSS (FOUC).

---

## 🧪 4. Kịch Bản Kiểm Thử & Xác Nhận Tự Động

Kích hoạt các tác tử trong **QA Agent Squad**:

```bash
# 1. Kiểm tra quy tắc CSS và cấu trúc infobox:
node tools/qa/agent02-css-layout-audit.mjs

# 2. Kiểm tra việc nạp dynamic CSS trong SPA Reader:
node tools/qa/agent04-spa-reader-audit.mjs

# 3. Chạy tổng duyệt toàn bộ hệ thống:
node tools/qa/run-qa-squad.mjs
```
