# AGENTS.md — CliniPortal Workspace Rules

> Tài liệu này định nghĩa các **quy tắc bắt buộc** cho mọi tác vụ AI trong workspace CliniPortal.
> **AI phải đọc file này trước khi thực hiện bất kỳ tác vụ nào trong project.**

---

## 🔑 Nhận diện Dự án

- **Tên project**: CliniPortal — Hệ sinh thái Web Y khoa
- **Thư mục gốc (Root)**: `i:\Drive của tôi\apps\Apps_ykhoa\`
- **Công nghệ**: Pure HTML + Vanilla CSS + Vanilla JavaScript (ES6+), **KHÔNG framework**
- **Môi trường chạy**: `file:///` offline hoặc local web server
- **Ngôn ngữ giao diện**: Tiếng Việt

---

## 📚 Tài liệu Phải Đọc Trước

| Khi làm task... | Đọc file... |
|-----------------|-------------|
| Bất kỳ task nào | `docs/PROJECT_OVERVIEW.md` |
| Tìm file cụ thể | `docs/FILE_MAP.md` |
| Thêm CSS/JS mới | `css/README.md`, `js/README.md` |
| Chuyển đổi Figma → CSS | `docs/DESIGN_TO_CODE.md` |
| Tạo trang mới (tổng quát) | `pages/README.md` |
| Tạo lưu đồ tiếp cận | `pages/Tiếp cận/HUONG_DAN_THIET_KE.md` |
| Tạo công cụ lâm sàng | `pages/Công cụ/HUONG_DAN_THIET_KE.md` |
| Tạo bài sinh lý | `pages/Sinh lý - Sinh lý bệnh/Sinhly/HUONG_DAN_THIET_KE.md` |

---

## 🛑 Quy tắc Bất di Bất dịch (KHÔNG ĐƯỢC VI PHẠM)

### 1. Không di chuyển file HTML/CSS/JS chức năng
Các file chức năng sử dụng **đường dẫn tương đối**. Di chuyển chúng sẽ phá vỡ toàn bộ liên kết.

### 2. Không dùng hardcode màu sắc
```css
/* ❌ SAI */
color: #0284c7;
background: #ffffff;

/* ✅ ĐÚNG */
color: var(--color-primary);
background: var(--color-surface);
```

### 3. Không thêm thư viện JS bên ngoài (trừ Google Fonts & FontAwesome)
Project dùng Vanilla JS thuần. Không jQuery, không React, không Vue.

### 4. Không tạo file trong thư mục gốc nếu không phải file chức năng cốt lõi
File mới phải đặt đúng trong thư mục phân hệ tương ứng.

### 5. Luôn kiểm tra đường dẫn tương đối trước khi viết code
Đếm số cấp thư mục: cấp 3 → `../../../`, cấp 4 → `../../../../`.

---

## ✅ Quy tắc Bắt buộc Khi Tạo Trang Mới

1. **Load `reset.css` → `main.css` trước** mọi CSS khác
2. **Load `main.js` + `header.js` + `footer.js`** ở cuối body với `defer`
3. **Khai báo `data-header-path`** và `data-footer-path` đúng path tương đối
4. **Dùng `data-theme="light"`** trên thẻ `<html>` làm giá trị mặc định
5. **Dùng thẻ `<meta name="description">`** cho SEO
6. **Đặt title** theo format: `[Tên trang] – CliniPortal`

---

## 🗂️ AI Skills Khả dụng

Các Skills sau đây đã được tạo và sẵn sàng sử dụng:

| Skill | Kích hoạt khi... |
|-------|-----------------|
| `cliniportal-architecture` | Làm bất kỳ task nào trong project |
| `flowchart-module` | Làm việc với lưu đồ tiếp cận lâm sàng |
| `physiology-module` | Tạo/sửa bài viết sinh lý học |
| `clinical-tools-module` | Tạo/sửa công cụ tính toán lâm sàng |
| `clinical-skills-module` | Tạo/sửa trang kỹ năng lâm sàng |
| `pharmacology-module` | Tạo/sửa trang dược lý |
| `symptom-approach-module` | Tạo/sửa trang chẩn đoán tiếp cận triệu chứng lâm sàng |
| `pathology-approach-module` | Tạo/sửa phác đồ tiếp cận bệnh lý lâm sàng & Infographic Poster Board |
| `cliniportal-debugging` | Sửa lỗi giao diện, lỗi HTML/CSS/JS, hoặc cập nhật nhật ký sửa lỗi |
| `vanilla-web-mastery` | Tối ưu Vanilla HTML/CSS/JS, quản lý DOM thuần, không framework, đường dẫn tương đối |
| `medical-ui-ux-design` | Thiết kế UI/UX y khoa hiện đại, hệ thống Design Tokens, Dark Mode, glassmorphism |
| `accessibility-wcag-medical` | Khả năng truy cập khuyết tật WCAG 2.1 AA, tương phản màu sắc y tế, điều hướng bàn phím |
| `medical-seo-structure` | Chuẩn hóa SEO Y khoa, thẻ Meta Semantic, tiêu đề chuẩn mực, dữ liệu Schema.org MedicalWebPage |
| `systematic-clinical-debugging` | Quy trình debug lỗi hệ thống, vỡ layout mobile, CSS Variables, kiểm tra tác động qua Graphify |
| `clinical-data-visualization` | Vẽ biểu đồ, thang điểm SOFA/Child-Pugh, đồ thị trực quan y khoa bằng SVG & Canvas thuần |
| `content-structure-medical` | Quy chuẩn phân cấp file/thư mục, breadcrumbs và đồng bộ sidebar cho 7 phân hệ CliniPortal |
| `performance-optimizer-medical` | Tối ưu tốc độ tải trang (TTFB, LCP), debounce/throttle tra cứu, lazy loading cho thiết bị y tế |
| `pubmed-research-linker` | Tích hợp tra cứu y văn, trích dẫn tài liệu tham khảo PubMed REST API (E-utilities), DOI, PMID |
| `medical-infographic-prompt` | Tạo kịch bản Infographic, sơ đồ tư duy & prompt sinh ảnh AI y khoa từ bài viết |
| `medical-content-formatter` | Chuẩn hóa định dạng bài viết Y khoa Mobile-first, HTML Semantic & UI Components |
| `medical-humanizer` | Tự động phát hiện & loại bỏ dấu vết văn bản AI, chuẩn hóa văn phong lâm sàng súc tích, chuẩn y học |
| `medical-content-matrix` | Quy hoạch ma trận phân loại nội dung y khoa, sơ đồ thực thể tri thức (Entity Graph) & kiến trúc LLM-Wiki hạt nhân cho 7 phân hệ CliniPortal |
| `medical-privacy-fl` | AI Y tế Bảo vệ Quyền riêng tư (Privacy-Preserving AI), Federated Learning, MAML cá nhân hóa, Differential Privacy (DP-RDP), Lượng thể nén dữ liệu |
| `medical-dashboard-bento` | Thiết kế Bento Grid Dashboard Y khoa thuần Vanilla Web, KPI Sinh hiệu, đồng hồ an toàn Gauge SVG, mạng lưới IoT Node & Bảng đối sánh y khoa |


---

## 📐 Quick Reference — Đường dẫn Tương đối

| Cấp | Ví dụ vị trí file | Prefix |
|-----|-------------------|--------|
| 0 (root) | `index.html` | `./` |
| 1 | `pages/Module/hub.html` | `../` |
| 2 | `pages/Module/Sub/page.html` | `../../` |
| 3 | `pages/Module/Sub/Sub2/page.html` | `../../../` |
| 4 | `pages/Sinh lý.../Sinhly/PhanX/file.html` | `../../../../` |

---

## 🎨 Quick Reference — Design Tokens

```css
/* Màu */
var(--color-primary)        /* #0284c7 */
var(--color-surface)        /* Card background */
var(--color-bg)             /* Page background */
var(--color-text)           /* Body text */
var(--color-text-muted)     /* Secondary text */
var(--color-border)         /* Borders */

/* Cảnh báo */
var(--color-success)        /* Xanh lá */
var(--color-warning)        /* Vàng */
var(--color-danger)         /* Đỏ */
var(--color-info)           /* Xanh ngọc */
```

---

## 📋 Checklist Trước Khi Commit Thay Đổi

- [ ] Đường dẫn CSS/JS chính xác theo cấp thư mục
- [ ] Không có hardcode màu sắc
- [ ] Dark mode hoạt động bình thường
- [ ] Sidebar hiển thị đúng
- [ ] Header/Footer load thành công
- [ ] Responsive trên mobile (kiểm tra width ≤ 768px)
- [ ] `docs/FILE_MAP.md` đã được cập nhật nếu có file mới

---

## 🧠 Tối ưu hóa Context (Tiết kiệm Token)

- **Hạn chế lệnh quét toàn bộ dự án**: Không dùng các công cụ tìm kiếm trên toàn bộ codebase nếu không thật sự cần thiết.
- **Sử dụng Context hẹp (Targeted Scoping)**: Chỉ định chính xác file hoặc hàm/symbol cần làm việc.
- **Chỉ cung cấp Interface/Signature**: Khi cần tương tác với module khác, chỉ cần đọc/gửi phần định nghĩa kiểu, struct, hoặc tên hàm/params thay vì đọc toàn bộ file dài.
- **Chuyển sang Chat mới khi đổi Task**: Bắt đầu một session mới (/clear hoặc New Chat) khi hoàn thành một tính năng hoặc bài toán refactor để tránh lưu trữ lịch sử trò chuyện quá dài.
- **File Ignore**: Hệ thống đã được thiết lập các file `.cursorignore`, `.clineignore`, `.aiderignore` để tự động bỏ qua các file/thư mục không cần thiết (node_modules, logs, ảnh, lock files, file dữ liệu lớn).
