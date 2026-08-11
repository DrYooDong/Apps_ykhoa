---
name: frontend-checklist-qa
description: Kỹ năng tra cứu Kho Tiêu chuẩn & Bảng kiểm Front-End (Front-End Checklist & Quality Vault) lấy cảm hứng từ thedaviddias/Front-End-Checklist. Kích hoạt khi AI cần kiểm tra toàn diện giao diện, sửa lỗi UI/UX, tối ưu SEO/Performance/Accessibility, hoặc audit trang web trong CliniPortal.
---

# Front-End Checklist & Quality Vault Skill

Skill này cung cấp quy trình kiểm tra chất lượng toàn diện (Front-End & UI/UX Quality Assurance) dựa trên tài liệu kho tiêu chuẩn `docs/FRONTEND_CHECKLIST_VAULT.md` trong hệ sinh thái CliniPortal.

---

## 🛑 THỜI ĐIỂM KÍCH HOẠT SKILL

Kích hoạt Skill này khi:
1. Bạn vừa tạo hoặc chỉnh sửa một trang HTML/CSS/JS mới trong CliniPortal.
2. Người dùng yêu cầu *"Sửa lỗi giao diện"*, *"Audit chất lượng trang X"*, *"Kiểm tra theo chuẩn Front-End Checklist"*.
3. Cần làm tài liệu tham khảo để tối ưu hóa SEO, Performance, Accessibility, Responsive hoặc Dark Mode.

---

## 📋 QUY TRÌNH KIỂM TRA 7 SECTION CHECKLIST

Đọc kỹ và đối chiếu từng mục trong file [FRONTEND_CHECKLIST_VAULT.md](file:///d:/Apps_ykhoa/docs/FRONTEND_CHECKLIST_VAULT.md):

1. **Section 1: Head & Meta Data (SEO, Social, Viewport)**
   - Thẻ `<!DOCTYPE html>`, `<html lang="vi" data-theme="light">`.
   - Title độc nhất, Meta description, Open Graph tags (`og:image`, `og:title`), Meta Viewport.
2. **Section 2: HTML Semantic & Accessibility (a11y / WCAG 2.1)**
   - Đúng cấu trúc ngữ nghĩa HTML5, duy nhất 1 thẻ `<h1>`.
   - Chạy `node scratch/check_tags.js <file.html>` đảm bảo 0 lỗi unclosed tags.
   - Thẻ ARIA roles, hỗ trợ phím `Tab` navigation.
3. **Section 3: CSS & Design System (Tokens, Responsive, Dark Mode)**
   - Dùng Design Tokens `var(--color-...)`. **Cấm hardcode màu hex**.
   - Kiểm tra `[data-theme="dark"]` không vỡ màu.
   - Test Responsive ở 375px, 768px, 1280px. Touch target $\ge 44 \times 44\text{px}$.
4. **Section 4: JavaScript & DOM Performance (Pure JS, Clean Code)**
   - Khai báo `<script defer src="...">`.
   - Pure Vanilla JS (ES6+). Xóa sạch `console.log`.
   - Kiểm tra safe dereferencing (`el?.addEventListener`).
5. **Section 5: Media & Assets Optimization**
   - 100% ảnh có `alt="..."` và explicit `width`/`height` để tránh Layout Shift.
   - Dùng WebP/SVG + `loading="lazy"`.
6. **Section 6: Bảo mật & Tối ưu hóa (Security & High Performance)**
   - Thẻ `<a target="_blank">` có `rel="noopener noreferrer"`.
   - LCP < 2.5s, CLS < 0.1, INP < 200ms.
7. **Section 7: Quy chuẩn Đặc thù CliniPortal (Medical Web Ecosystem)**
   - Đường dẫn tương đối chính xác 100% theo cấp thư mục (`./`, `../`, `../../`, `../../../`, `../../../../`).
   - Dynamic Injection Header/Footer (`data-header-path`, `data-footer-path`).
   - Cập nhật Registry: `docs/FILE_MAP.md`, `guidelinesdata.js`, `benh-ly.js`, `cong-cu.html`.
