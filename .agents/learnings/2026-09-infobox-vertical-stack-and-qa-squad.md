# 🧠 Bài Học Kinh Nghiệm: Khắc Phục Lỗi Xếp Chồng `.infobox` & Thiết Lập QA Agent Squad

> **Ngày ghi nhận**: 17/09/2026  
> **Phân hệ liên quan**: `src/styles/components/`, `src/content/basic-medical/`, `tools/qa/`  
> **Người thực hiện**: Antigravity Squad Lead & CliniPortal QA Agent Squad  

---

## 🔍 1. Hiện Tượng & Nguyên Nhân Cốt Lõi (Root Causes)

### Sự cố 1: Khung `.infobox` Bị Ép Méo 2 Cột Dọc Trên Mobile & Desktop
* **Hiện tượng**: Tiêu đề `.infobox-title` bị dồn thành một cột hẹp phía bên trái, trong khi phần nội dung `.infobox-body` bị ép sang bên phải. Các công thức toán học KaTeX và bảng biểu bên trong bị co hẹp, tràn viền hoặc cắt cụt.
* **Nguyên nhân gốc rễ**: Lớp CSS `.infobox` được thiết kế ban đầu với `display: flex; align-items: flex-start; gap: 1rem;` nhằm mục đích hiển thị Icon bên trái và Nội dung bên phải. Tuy nhiên, khi tác giả sử dụng `.infobox` chứa thẻ `<div class="infobox-title">` thay vì icon, trình duyệt coi `.infobox-title` là flex-item đầu tiên, biến bố cục thành 2 cột ngang thay vì xếp dọc tiêu đề trên - nội dung dưới.

### Sự cố 2: Lớp Lỗi Ký Tự Rác Box-Drawing Unicode (1900 Ký Tự)
* **Hiện tượng**: Các ký tự `─│┼┬┴┤├╠╣╦╩╬╔╗╚╝═` xuất hiện rải rác trong 150 file MDX (biochemistry, pathophysiology, physiology, epidemiology).
* **Nguyên nhân gốc rễ**: Quá trình chuyển đổi tự động từ tài liệu terminal/ASCII hoặc copy từ console vào file `.mdx` để lại các ký tự vẽ khung dạng text thô.

### Sự cố 3: Ký Tự Gạch Dưới Bị Escape Trong File CSDL JSON (`\_`)
* **Hiện tượng**: Chuỗi key `"benh\_nhan"` thay vì `"benh_nhan"` trong `tieu-hoa.json`.
* **Nguyên nhân gốc rễ**: Bộ sinh markdown hoặc extension tự động escape ký tự `_` khi xuất dữ liệu sang JSON.

---

## 🛠️ 2. Giải Pháp Xử Lý Toàn Diện Hai Tầng (Dual-Layer Architecture)

Để giải quyết triệt để lỗi `.infobox`, CliniPortal đã áp dụng kiến trúc khắc phục 2 tầng:

### Tầng 1: Quy Tắc CSS Toàn Cục Phản Ứng Tự Động (`:has()`)
Áp dụng đồng bộ trên `physio-shared.css`, `guidelines-article.css` và `mdx-alerts.css`:

```css
/* Tự động kích hoạt xếp chồng dọc khi infobox chứa tiêu đề */
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

### Tầng 2: Phòng Thủ Cục Bộ Trong SPA Reader View (`physio-html-reader-view.ts`)
Trong môi trường SPA nạp động, để triệt tiêu độ trễ tải stylesheet bên ngoài (FOUC), chèn trực tiếp khối `#physio-mdx-reader-styles` gắn kèm `!important` và kích hoạt hàm nạp dynamic CSS trước khi tiến hành hydrate DOM.

---

## 🤖 3. Đóng Gói Thành Đội Ngũ Tự Động: CliniPortal QA Agent Squad

Không dừng lại ở việc vá thủ công, toàn bộ các giải pháp đã được hệ thống hóa thành **QA Agent Squad**:

1. **AGENT-01** (`agent01-svg-katex-audit.mjs`): Quét và tự động dọn sạch 1900 ký tự box-drawing rác bằng cờ `--fix`.
2. **AGENT-02** (`agent02-css-layout-audit.mjs`): Kiểm tra quy tắc bảo vệ xếp chồng dọc và typography trên mọi stylesheet.
3. **AGENT-03** (`agent03-darkmode-token-audit.mjs`): Quét hardcoded hex và bảo đảm độ tương phản Dark Mode.
4. **AGENT-04** (`agent04-spa-reader-audit.mjs`): Xác thực việc nạp dynamic CSS và thẻ inline override trong SPA Reader.
5. **AGENT-05** (`agent05-json-schema-validator.mjs`): Kiểm tra lỗi escape `\_` và cấu trúc mảng suy luận `dd` [symptom, weight, type].
6. **QA Conductor** (`run-qa-squad.mjs`): Chạy kiểm tra hợp nhất toàn bộ 5 tác tử trong **0.51 giây**, xuất báo cáo JSON tự động.

---

## 📋 4. Bảng Kiểm Phòng Ngừa Tái Phát (Regression Prevention Checklist)

- [ ] Khi tạo kiểu card mới, nếu dùng `display: flex`, luôn xác định rõ có cần `flex-direction: column` khi chứa tiêu đề hay không.
- [ ] Luôn kiểm tra giao diện ở cả 2 môi trường: Astro Static build và SPA Reader View (`#/basic-medical/...`).
- [ ] Chạy `node tools/qa/run-qa-squad.mjs` trước khi commit bất kỳ chỉnh sửa nào.
- [ ] Mọi tệp JSON bệnh học phải bảo đảm key không chứa dấu gạch chéo ngược (`\`).
