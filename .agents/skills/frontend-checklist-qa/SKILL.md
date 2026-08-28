---
name: frontend-checklist-qa
description: Kỹ năng tra cứu Kho Tiêu chuẩn & Bảng kiểm Front-End (Front-End Checklist & Quality Vault) lấy cảm hứng từ thedaviddias/Front-End-Checklist. Kích hoạt khi AI cần kiểm tra toàn diện giao diện, sửa lỗi UI/UX, tối ưu SEO/Performance/Accessibility, hoặc audit trang web trong CliniPortal.
---

# Front-End Checklist & Quality Vault Skill

Skill này cung cấp quy trình kiểm tra chất lượng toàn diện (Front-End & UI/UX Quality Assurance) dựa trên các công cụ kiểm thử hiện đại (VisBug, Pesticide, Kontrast, Core Web Vitals) trong hệ sinh thái CliniPortal.

---

## 🛑 THỜI ĐIỂM KÍCH HOẠT SKILL

Kích hoạt Skill này khi:
1. Bạn vừa tạo hoặc chỉnh sửa một trang HTML/CSS/JS mới trong CliniPortal.
2. Người dùng yêu cầu *"Sửa lỗi giao diện"*, *"Audit chất lượng trang X"*, *"Kiểm tra theo chuẩn Front-End Checklist"*.
3. Cần làm tài liệu tham khảo để tối ưu hóa SEO, Performance, Accessibility, Responsive hoặc Dark Mode.

---

## 📋 QUY TRÌNH KIỂM TRA 7 SECTION CHECKLIST & DESIGN QA TOOLS

### 1. Section 1: Head & Meta Data (SEO, Social, Viewport)
- Thẻ `<!DOCTYPE html>`, `<html lang="vi" data-theme="light">`.
- Title độc nhất, Meta description, Open Graph tags (`og:image`, `og:title`), Meta Viewport.
- Schema.org `MedicalWebPage` JSON-LD hợp lệ.

### 2. Section 2: HTML Semantic & Accessibility (a11y / WCAG 2.1)
- Đúng cấu trúc ngữ nghĩa HTML5, duy nhất 1 thẻ `<h1>`.
- Chạy `node tools/scratch/check_tags.js <file.html>` đảm bảo **0 lỗi unclosed tags**.
- Thẻ ARIA roles (`aria-label`, `aria-expanded`, `aria-modal`), hỗ trợ phím `Tab` navigation và `:focus-visible`.

### 3. Section 3: Bố Cục & Tràn Viền (Layout Debugging với Pesticide)
- Kiểm tra tràn ngang (Horizontal Scrollbar) trên thiết bị 360px - 375px:
  ```javascript
  /* Snippet phát hiện phần tử tràn khung nhanh */
  document.querySelectorAll('*').forEach(el => {
    if (el.offsetWidth > document.documentElement.offsetWidth) {
      console.warn('⚠️ Phần tử tràn viền:', el);
    }
  });
  ```
- Touch target trên Mobile $\ge 44 \times 44\text{px}$ (Định luật Fitts).

### 4. Section 4: Màu Sắc & Khả Năng Tiếp Cận (WCAG 2.1 & Color-blindness)
- Tỷ lệ tương phản văn bản so với nền $\ge 4.5:1$ (AA) và $\ge 3:1$ cho đồ họa / icons.
- Kiểm tra tính độc lập màu sắc: Mọi cảnh báo phải đi kèm Icon + Label chữ (không dùng màu đơn độc).
- Kiểm tra trên bộ giả lập mù màu Chrome DevTools (Protanopia, Deuteranopia, Achromatopsia).

### 5. Section 5: JavaScript & DOM Performance (Pure JS, Clean Code)
- Khai báo `<script defer src="...">` hoặc `<script type="module">`.
- Pure Vanilla JS (ES6+), không thêm thư viện ngoài nặng nề. Xóa sạch `console.log`.
- Safe dereferencing (`el?.addEventListener`).

### 6. Section 6: Media & Assets & Core Web Vitals
- 100% ảnh có `alt="..."` và explicit `width`/`height` để tránh Cumulative Layout Shift (CLS $\le 0.1$).
- Largest Contentful Paint (LCP $\le 2.5\text{s}$), Interaction to Next Paint (INP $\le 200\text{ms}$).
- Dùng SVG inline hoặc WebP tối ưu qua Squoosh/SVGOMG.

### 7. Section 7: Quy chuẩn Đặc thù CliniPortal
- Đường dẫn tương đối chính xác 100% theo cấp thư mục (`./`, `../`, `../../`, `../../../`, `../../../../`).
- Dynamic Injection Header/Footer (`data-header-path`, `data-footer-path`).
- Cập nhật Registry: `.agents/docs/FILE_MAP.md`, `guidelinesdata.js`.
