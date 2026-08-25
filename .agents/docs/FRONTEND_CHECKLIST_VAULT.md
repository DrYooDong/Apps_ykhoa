# KHO TIÊU CHUẨN & BẢNG KIỂM FRONT-END CHECKLIST (CliniPortal Standard Treasury)

> **Tài liệu tham khảo & Kiểm định chất lượng**: Biên soạn dựa trên tiêu chuẩn thế giới [thedaviddias/Front-End-Checklist](https://github.com/thedaviddias/Front-End-Checklist) kết hợp với Kiến trúc Pure Vanilla HTML/CSS/JS của dự án CliniPortal.
> **Mục đích**: Làm kho tra cứu lâu dài cho Developer và AI Assistant khi xây dựng, chỉnh sửa giao diện, kiểm thử và nâng cấp toàn bộ hệ sinh thái web Y khoa CliniPortal.

---

## 🗂️ MỤC LỤC PHÂN CẤP UY TÍN & CHUYÊN MÔN

* [🔴 SECTION 1: HEAD & META DATA (SEO, Social, Viewport)](#-section-1-head--meta-data-seo-social-viewport)
* [🔴 SECTION 2: HTML SEMANTIC & ACCESSIBILITY (a11y / WCAG 2.1)](#-section-2-html-semantic--accessibility-a11y--wcag-21)
* [🟡 SECTION 3: CSS & DESIGN SYSTEM (Tokens, Responsive, Dark Mode)](#-section-3-css--design-system-tokens-responsive-dark-mode)
* [🟡 SECTION 4: JAVASCRIPT & DOM PERFORMANCE (Pure JS, Clean Code)](#-section-4-javascript--dom-performance-pure-js-clean-code)
* [🔴 SECTION 5: MEDIA & ASSETS OPTIMIZATION (Images, WebP, Favicon)](#-section-5-media--assets-optimization-images-webp-favicon)
* [🟢 SECTION 6: BẢO MẬT & TỐI ƯU HÓA (Security & High Performance)](#-section-6-bảo-mật--tối-ưu-hóa-security--high-performance)
* [🩺 SECTION 7: QUY CHUẨN ĐẶC THÙ CLINIPORTAL (Medical Web Ecosystem)](#-section-7-quy-chuẩn-đặc-thù-cliniportal-medical-web-ecosystem)

---

## 🔴 SECTION 1: HEAD & META DATA (SEO, Social, Viewport)

- [ ] **1.1 Doctype chuẩn xác**: Khai báo `<!DOCTYPE html>` ở ngay dòng 1 không khoảng trắng trước.
- [ ] **1.2 Ngôn ngữ trang**: Khai báo `<html lang="vi" data-theme="light">` cho tiếng Việt và mặc định light theme.
- [ ] **1.3 Meta Charset**: Khai báo `<meta charset="UTF-8">` trong 1024 byte đầu tiên của `<head>`.
- [ ] **1.4 Meta Viewport**: Khai báo `<meta name="viewport" content="width=device-width, initial-scale=1.0">` để hiển thị chuẩn mobile.
- [ ] **1.5 Title Tag**: Tiêu đề trang độc nhất, chứa từ khóa chính y khoa + thương hiệu: `<title>[Tên Bệnh Lý / Guideline] - CliniPortal</title>`.
- [ ] **1.6 Meta Description**: Đoạn mô tả y khoa súc tích 150-160 ký tự, đầy đủ ý nghĩa: `<meta name="description" content="...">`.
- [ ] **1.7 Favicon Đa Thiết Bị**: Có đầy đủ `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png` và `site.webmanifest`.
- [ ] **1.8 Open Graph (OG) Tags**: Phục vụ chia sẻ Facebook/Zalo:
  - `<meta property="og:title" content="...">`
  - `<meta property="og:description" content="...">`
  - `<meta property="og:image" content="...">`
  - `<meta property="og:url" content="...">`
  - `<meta property="og:type" content="article">` (hoặc `website`)

---

## 🔴 SECTION 2: HTML SEMANTIC & ACCESSIBILITY (a11y / WCAG 2.1)

- [ ] **2.1 Semantic Layout**: Sử dụng đúng thẻ ngữ nghĩa HTML5: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`.
- [ ] **2.2 Cấu trúc Heading Duy nhất**: Mỗi trang chỉ có **duy nhất 1 thẻ `<h1>`**. Phân cấp Heading không nhảy cấp (`h1` -> `h2` -> `h3`, không từ `h1` nhảy sang `h3`).
- [ ] **2.3 Thẻ Đóng Mở Toàn Vẹn**: Chạy script `node tools/tools/scratch/check_tags.js <file.html>` đảm bảo **0 lỗi unclosed tags**.
- [ ] **2.4 Không Trùng Lặp ID**: Thuộc tính `id=""` trên toàn bộ trang phải là duy nhất.
- [ ] **2.5 ARIA Roles & Attributes**:
  - Các nút bấm không phải `<button>` hoặc `<a>` phải có `role="button"` và `tabindex="0"`.
  - Các modal/dialog phải có `aria-modal="true"`, `role="dialog"`.
  - Nút ẩn/mở có `aria-expanded="true/false"`.
- [ ] **2.6 Keyboard Navigation**: Mọi phần tử tương tác (links, buttons, inputs) phải truy cập được qua phím `Tab` và hiển thị đường viền `outline` rõ ràng khi focus.

---

## 🟡 SECTION 3: CSS & DESIGN SYSTEM (Tokens, Responsive, Dark Mode)

- [ ] **3.1 CSS CSS Variables (Design Tokens)**: Bắt buộc dùng biến CSS chuẩn (`var(--color-primary)`, `var(--color-bg)`, `var(--color-text)`...). **Cấm hardcode màu Hex `#0284c7`** trực tiếp trong selector.
- [ ] **3.2 Dark Mode Native**: Kiểm tra thuộc tính `[data-theme="dark"]`. Tất cả thẻ chữ, card background, đường viền phải đổi màu mượt mà, không bị "cháy màu" hoặc sót nền trắng.
- [ ] **3.3 Responsive Mobile-First**:
  - Tương thích tốt ở mốc 375px (Mobile), 768px (Tablet), 1280px (Desktop).
  - Không sinh thanh cuộn ngang ngoài ý muốn (`overflow-x: hidden`).
- [ ] **3.4 Touch Target Minimum Size**: Các nút bấm, icon link trên giao diện di động phải đạt kích thước tối thiểu **44x44px** để bấm bằng ngón tay dễ dàng.
- [ ] **3.5 CSS Reset & Modularization**: CSS nạp theo đúng thứ tự: `reset.css` -> `main.css` -> `components/*.css` -> `page-specific.css`.
- [ ] **3.6 Không Lạm Dụng `!important`**: Hạn chế ghi đè CSS bằng `!important` để tránh vỡ tính kế thừa styles.

---

## 🟡 SECTION 4: JAVASCRIPT & DOM PERFORMANCE (Pure JS, Clean Code)

- [ ] **4.1 Script Loading**: Thẻ `<script>` nạp file external phải luôn có thuộc tính `defer` để không chặn Render HTML.
- [ ] **4.2 Không Dùng Thư Viện Ngoài**: Tuyệt đối dùng Vanilla JS (ES6+), không nhập JQuery, React, Lodash...
- [ ] **4.3 Clean Console Logs**: Xóa toàn bộ `console.log()`, `console.dir()` trước khi đẩy code lên production.
- [ ] **4.4 Safe DOM Dereferencing**: Luôn kiểm tra phần tử tồn tại trước khi thao tác (`if (el) el.addEventListener(...)` hoặc Optional Chaining `el?.addEventListener`).
- [ ] **4.5 Event Delegation**: Ưu tiên bắt sự kiện trên container dùng Event Delegation thay vì gắn event listener vào hàng trăm thẻ con.
- [ ] **4.6 Memory Leak Prevention**: `removeEventListener` hoặc `abortController` khi hủy component/modal động.

---

## 🔴 SECTION 5: MEDIA & ASSETS OPTIMIZATION (Images, WebP, Favicon)

- [ ] **5.1 Alt Attributes Cho Ảnh**: 100% thẻ `<img>` phải có thuộc tính `alt="..."`. Nếu là ảnh trang trí thì để `alt=""`.
- [ ] **5.2 Đánh Kích Thước Explicit Height/Width**: Khai báo `width="..."` và `height="..."` hoặc `aspect-ratio` trên `<img>` để tránh hiện tượng nảy trang (Layout Shift - CLS).
- [ ] **5.3 Format Ảnh Hiện Đại**: Ưu tiên dùng định dạng **WebP** hoặc **SVG** (cho icon/diagram) thay vì PNG/JPG dung lượng lớn.
- [ ] **5.4 Native Lazy Loading**: Các ảnh nằm dưới màn hình đầu tiên (Below the fold) phải có `loading="lazy"`.

---

## 🟢 SECTION 6: BẢO MẬT & TỐI ƯU HÓA (Security & High Performance)

- [ ] **6.1 Security Link Attributes**: Mọi thẻ `<a target="_blank">` phải đi kèm `rel="noopener noreferrer"` để chống tấn công Tabnabbing.
- [ ] **6.2 Tốc độ Tải trang (Core Web Vitals)**:
  - LCP (Largest Contentful Paint) < 2.5s.
  - CLS (Cumulative Layout Shift) < 0.1.
  - FID/INP (Interaction to Next Paint) < 200ms.
- [ ] **6.3 Minification**: File CSS và JS nạp trên production nên được nén tối ưu dung lượng.

---

## 🩺 SECTION 7: QUY CHUẨN ĐẶC THÙ CLINIPORTAL (Medical Web Ecosystem)

- [ ] **7.1 Relative Path Index Precise**: Kiểm tra đường dẫn tương đối chính xác 100% theo cấp thư mục (`./`, `../`, `../../`, `../../../`, `../../../../`).
- [ ] **7.2 Dynamic Injection Header/Footer**: Thẻ placeholder `data-header-path` và `data-footer-path` hoạt động trơn tru trả về HTTP 200.
- [ ] **7.3 EBM Citation Standards**: Mọi khuyến cáo y khoa phải trích dẫn tên tổ chức (ACC/AHA, ESC, KDIGO, BYT) + Năm + Class/LoE.
- [ ] **7.4 Infobox Clinical Alert**: Dùng đúng `.infobox.danger` (Đỏ - Cấp cứu/Chống chỉ định), `.infobox.warning` (Cam - Chỉnh liều/Lưu ý), `.infobox.tip` (Xanh ngọc - Clinical Pearl).
- [ ] **7.5 Registry Synchronized**: Đã thêm file mới vào `.agents/docs/FILE_MAP.md` và các file Data Registry (`guidelinesdata.js`, `benh-ly.js`, `cong-cu.html`).

---

## 🛠️ HƯỚNG DẪN SỬ DỤNG KHO TIÊU CHUẨN NÀY

1. **Khi viết Code mới**: Mở bảng kiểm này ra tra cứu trong quá trình coding.
2. **Khi Sửa lỗi UI/UX/Code**: Rà soát theo từng Section từ Section 1 đến Section 7 để khoanh vùng nguyên nhân.
3. **Khi Code Review & QA**: Đối chiếu lại danh sách trước khi commit hoặc hoàn tất task.
