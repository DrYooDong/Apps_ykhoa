---
name: cdss-module-builder
description: >
  Quy trình thiết kế, scaffolding, đóng gói và tích hợp một CDSS web độc lập (Standalone CDSS Web Module) mới
  vào hệ sinh thái CliniPortal DocSpace. Kích hoạt khi AI hoặc người dùng cần: tạo module CDSS mới từ đầu,
  nhập (import) một dự án CDSS từ bên ngoài vào, biên dịch bundle tĩnh chạy offline file:///, hoặc cấu hình
  đăng ký module trong cdss-registry.ts.
---

# CDSS Module Builder Skill

Kỹ năng này hướng dẫn toàn diện quy trình chuẩn hóa từ khâu tiếp nhận mã nguồn đến khi xuất xưởng và kết nối một ứng dụng CDSS web độc lập mới vào Kho CDSS của CliniPortal DocSpace.

---

## 🚀 1. Quy Trình 5 Bước Nạp Hoặc Xây Dựng CDSS Mới

```
[1. Tiếp Nhận/Khởi Tạo] ──> [2. Tối Ưu Offline & Bundle] ──> [3. Tích Hợp CDSS Shell]
                                                                     │
[5. Rebuild Hub & QA] <─── [4. Đăng Ký cdss-registry.ts] <──────────┘
```

### Bước 1: Thiết Lập Thư Mục Module
Tạo thư mục con chuyên biệt tại:
`src/content/docspace/public/cdss/<slug>/`

Ví dụ: `src/content/docspace/public/cdss/antibiotic/`

---

### Bước 2: Tối Ưu Mã Nguồn Cho Môi Trường Offline & GitHub Pages
1. **Cấu Hình Base Path Tương Đối**:
   - Nếu dự án dùng Vite, bắt buộc đặt `base: './'` trong `vite.config.ts`.
   - Tuyệt đối không dùng đường dẫn tuyệt đối bắt đầu bằng `/assets/...`, phải là `./assets/...`.
2. **Khử Bỏ Phụ Thuộc Server-Side / API Key Bên Ngoài**:
   - Mọi thuật toán lâm sàng (tính liều, thanh thải thận, phân tích toan kiềm, lưu đồ vi sinh) nên ưu tiên xử lý client-side deterministic.
   - Nếu có tính năng AI/LLM phụ trợ, bắt buộc phải có graceful fallback (khi không có API key thì vẫn dùng bộ dữ liệu khuyến cáo chuẩn EBM tích hợp sẵn).
3. **Đóng Gói Bundle**:
   - Chạy build Vite để sinh thư mục `assets/` chứa JS và CSS đã nén:
     ```bash
     npm run build
     ```
   - (Tùy chọn khuyến nghị cho file:///): Sử dụng esbuild để tạo thêm file IIFE standalone fallback:
     ```bash
     npx esbuild src/main.tsx --bundle --outfile=assets/<slug>-app.iife.js --format=iife
     ```

---

### Bước 3: Tích Hợp Khung Điều Hướng Chuẩn (CDSS Shell)
Tại file `src/content/docspace/public/cdss/<slug>/index.html`:
1. Nạp CSS & JS Shell từ thư mục shared:
   ```html
   <!-- CliniPortal CDSS Shell Styles & Theme Script -->
   <link rel="stylesheet" href="../shared/cdss-shell.css">
   <script src="../shared/cdss-shell.js"></script>
   ```
2. Chèn thẻ `<header class="cdss-portal-navbar">` chuẩn hóa.
3. Bổ sung đoạn script tự động kích hoạt bundle IIFE nếu ES module bị chặn bởi CORS trong môi trường `file:///`:
   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     setTimeout(() => {
       const rootEl = document.getElementById('root');
       if (rootEl && rootEl.children.length === 0) {
         console.info('Module blocked under file:///, activating standalone IIFE bundle...');
         const s = document.createElement('script');
         s.src = './assets/<slug>-app.iife.js?v=' + Date.now();
         document.body.appendChild(s);
       }
     }, 300);
   });
   ```

---

### Bước 4: Đăng Ký Module Vào `cdss-registry.ts`
Mở `src/content/docspace/public/cdss/cdss-registry.ts` và bổ sung entry mới vào mảng `CDSS_MODULES`:

```typescript
{
  id: 'cdss-<slug>-<feature>',
  slug: '<slug>',
  title: 'Tên Đầy Đủ Tiếng Việt Có Dấu',
  titleEn: 'English Full Title CDSS',
  shortDesc: 'Mô tả ngắn gọn tính năng cốt lõi (1-2 câu).',
  category: 'pharmacology', // 'infectious' | 'cardiology' | 'respiratory' | 'radiology' | 'gastroenterology' | 'neurology' | 'pharmacology'
  categoryName: 'Dược lý & Kháng sinh',
  version: '2.0.0',
  updatedAt: '2026-09-19',
  author: 'Đơn vị / Tác giả phát triển',
  guidelineSource: 'Nguồn Hướng dẫn điều trị / Khuyến cáo EBM',
  icd10: ['Z16', 'N18'],
  icon: 'fa-solid fa-pills',
  badge: 'Nhãn Nổi Bật',
  isStandalone: true,
  standaloneUrl: '<slug>/index.html'
}
```

---

### Bước 5: Re-bundle CDSS Hub & Kiểm Thử Toàn Vẹn
1. Chạy lệnh đóng gói Hub:
   ```bash
   npx esbuild src/content/docspace/public/cdss/index.ts --bundle --outfile=src/content/docspace/public/cdss/cdss-hub-bundle.js --format=iife
   ```
2. Chạy script kiểm tra tính toàn vẹn thẻ HTML:
   ```bash
   node tools/scratch/check_tags.js src/content/docspace/public/cdss/<slug>/index.html
   ```
3. Mở trình duyệt kiểm tra hiển thị trên Hub và trong trang con.
