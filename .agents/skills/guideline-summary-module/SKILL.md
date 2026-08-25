---
name: guideline-summary-module
description: >
  Tạo và chỉnh sửa các trang tóm tắt khuyến cáo lâm sàng và nghiên cứu y khoa (Guidelines)
  đẹp mắt, chuyên nghiệp tại thư mục pages/Y học chứng cứ/Guidelines/Kho Guidelines/.
  Kích hoạt khi AI cần tạo trang guideline tóm tắt mới hoặc cập nhật các trang guideline hiện có.
---

# Guideline Summary Module Skill

Tài liệu này định nghĩa tiêu chuẩn thiết kế, cấu trúc mã nguồn và các thành phần giao diện mẫu (Boilerplate) cho các trang tóm tắt hướng dẫn lâm sàng (Guidelines/RCT Landmark) tại phân hệ **Y học chứng cứ (EBM)** của CliniPortal.

---

## 🛑 MODULE RULES BẮT BUỘC (Quy tắc Module EBM Guidelines)

1. **Chuẩn Đường Dẫn Cấp 4**: Mọi trang tóm tắt mới trong `kho-guidelines/` nằm ở **cấp 4**. Bắt buộc prefix `../../../../` cho tài nguyên gốc root (`css/reset.css`, `css/main.css`, `js/main.js`).
2. **Quy Tắc Đặt Tên File**: File HTML mới phải đặt theo dạng `<year>-<org>-<topic>.html` (ví dụ: `2026-kdigo-ckd.html`). Dùng 100% ASCII kebab-case chữ thường.
3. **Ưu Tiên Script Tự Động & Nâng Cấp Visual UI**: Khi có file nguồn `.md`, dùng script `node .agents/skills/guideline-summary-module/scripts/convert_md_to_guideline.js "<path_to_md>"` để dựng khung, sau đó BẮT BUỘC biên tập nâng cấp thành giao diện trực quan sinh động.
4. **CẤM TRÌNH BÀY DẠNG TEXT ĐƠN ĐIỆU & BẮT BUỘC TÍCH HỢP EDITORIAL SVG DIAGRAM / FLOWCHART**: Trang tóm tắt Guideline **KHÔNG ĐƯỢC** chỉ chứa các đoạn chữ (paragraph) hay list đơn thuần. **BẮT BUỘC** chuyển đổi mọi khuyến cáo lâm sàng thành hệ thống trực quan:
   - **01 Lưu đồ Phác đồ Điều trị / Thuật toán Chẩn đoán dạng Editorial SVG Trực giao** (Orthogonal SVG Flowchart, tối đa 7-9 node, 100% Dark Mode, không shadow, tham khảo skill `flowchart-module` hoặc `medical-editorial-diagram`).
   - Thẻ khuyến cáo `.ebm-rec-card` kết hợp nhãn `.cor-badge` (Class I, IIa, IIb, III) và `.loe-badge` (Level/Grade A, B, C, E).
   - Bento Grid Cards, Matrix Boards, Phác đồ liều dùng (`.rx-tag`, `.data-table`) và Infoboxes cảnh báo màu sắc.
5. **BẢO TỒN 100% TOÀN VẸN NỘI DUNG Y KHOA TỪ FILE .MD (100% Medical Content Integrity)**: File `.md` nguồn chứa các tri thức y khoa đã được tóm tắt kỹ lưỡng từ các nghiên cứu/guidelines (mốc chỉ số, tiêu chuẩn chẩn đoán, các trích xuất sơ đồ/bảng FIGURE & TABLE, tên thử nghiệm RCT như SELECT, SUMMIT, FIGHT, LIVE, chỉ số HR/OR/%, phân tích nhóm, tài liệu tham khảo AMA). **TUYỆT ĐỐI KHÔNG LƯỢC BỎ, CẮT NGẮN HAY LÀM MẤT BẤT KỲ THÔNG TIN NÀO**. Tất cả nội dung trong `.md` phải xuất hiện đầy đủ 100% trên trang HTML, trình bày qua các linh kiện UI sinh động.
6. **Bắt Buộc Đăng Ký Registry `guidelinesdata.js`**: Mọi guideline mới tạo phải bổ sung 1 bản ghi vào array `SAMPLE_STUDIES` trong `src/content/ebm/guidelines/guidelinesdata.js`.
7. **Kiểm Tra HTML Integrity**: Chạy `node tools/tools/scratch/check_tags.js <file>.html` sau khi tạo/sửa.
8. **BẮT BUỘC KIỂM TRA & LÀM SẠCH LỖI $ (Math LaTeX Formatting Cleanup)**: Trước khi hoàn tất bất kỳ trang Guideline HTML nào, **BẮT BUỘC** kiểm tra và làm sạch 100% ký tự `$` math LaTeX (`$BMI \ge 25$` $\rightarrow$ `BMI ≥ 25`, `$\ge 150\text{ mg/dL}$` $\rightarrow$ `≥ 150 mg/dL`, `$\ge 20\%$` $\rightarrow$ `≥ 20%`). Tuyệt đối không để sót ký tự `$` thô hiển thị trên giao diện web.
9. **Bảo Vệ Hub `guidelines.js`**: Chạy `node tools/tools/scratch/query_graph.js guidelines.js` nếu tác động vào engine xử lý chung của Kho Guidelines (chỉ số fan-in 570).
10. **Tự Động Dọn Dẹp File Tạm**: Tự động xóa tất cả các file `.md` trung gian / hợp nhất được tạo ra trong `scratch/` ngay sau khi hoàn tất việc sinh file `.html` và đăng ký registry.
11. **TUYỆT ĐỐI CẤM THẺ HTML TRONG SVG `<text>` (SVG Text Formatting Rule)**: Tuyệt đối **KHÔNG ĐƯỢC** sử dụng các thẻ HTML (`<strong>`, `<b>`, `<span>`, `<br>`, `<em>`, `<code>`) bên trong `<text>` của SVG. Để in đậm trong SVG, bắt buộc dùng `<tspan font-weight="700">` hoặc thuộc tính `font-weight="700"`. Để xuống dòng, dùng nhiều thẻ `<text>` hoặc `<tspan x="..." dy="...">`. ViewBox SVG phải luôn đủ rộng/cao để không cắt cụt các node.
12. **BẮT BUỘC XỬ LÝ HÌNH ẢNH ĐÍNH KÈM TỪ FILE .MD (Image Asset Extraction & Embedding Rule)**: Khi file `.md` nguồn có chứa hình ảnh đính kèm (dạng `![[Pasted image ...]]` hoặc `![alt](path)`):
    - **Bước 1**: Tìm và sao chép file ảnh từ thư mục đính kèm (ví dụ: `knowledge-vault/_resources/attachments/`) vào thư mục `src/content/ebm/guidelines/kho-guidelines/images/` với tên chuẩn kebab-case: `<slug>-fig<X>.<ext>` (ví dụ: `2021-acg-ugib-fig1.png`).
    - **Bước 2**: Nhúng hình ảnh vào đúng vị trí tương ứng trong trang HTML bằng thẻ `<img>` kết hợp khung card chuẩn:
      ```html
      <div class="fig-card">
        <img src="./images/<slug>-fig<X>.png" alt="[Mô tả hình ảnh]" class="fig-img" loading="lazy">
        <div class="fig-caption">
          <div class="fig-title">Figure X. [Tiêu đề hình ảnh]</div>
          [Mô tả chi tiết giải thích ý nghĩa lâm sàng dưới hình]
        </div>
      </div>
      ```
    - Tuyệt đối không được bỏ sót hình ảnh minh họa có trong file `.md` nguồn.

---

## 📁 Cấu trúc Thư mục Guidelines

Các trang tóm tắt cụ thể được đặt trong thư mục `kho-guidelines`:
```
src/content/ebm/guidelines/
├── guidelines.html                       # Trang tra cứu Guidelines (Cấp 3)
├── guidelines.css                        # CSS cho trang tra cứu
├── guidelines.js                         # JS xử lý filter/search
├── guidelinesdata.js                     # Database danh sách guidelines (SAMPLE_STUDIES)
├── HUONG_DAN_TAO_TOM_TAT_TU_MD.md        # Hướng dẫn chi tiết chuyển đổi từ file .md
└── kho-guidelines/                       # Thư mục chứa các trang chi tiết (.html / .md nguồn)
    ├── 2024-kdigo-ckd.html               # Mẫu Guideline KDIGO 2024
    ├── 2025-aha-acc-hypertension.html    # Mẫu Guideline AHA/ACC 2025
    ├── 2015-nejm-empa-reg.html                     # Mẫu RCT Landmark
    └── phac-do-soc-nhiem-khuan-sepsis3.md # Mẫu file nguồn Markdown (.md)
```

---

## 📐 Cú pháp Đường dẫn tương đối (Cấp 4)

Tất cả các file trong thư mục `kho-guidelines/` nằm ở **cấp 4** so với thư mục gốc `Apps_ykhoa/`. Do đó, khi liên kết các tài nguyên hệ thống hoặc các trang khác, bắt buộc sử dụng tiền tố đường dẫn tương đối chính xác:

- Trở về thư mục gốc: `../../../../`
  - *Ví dụ:* `<link rel="stylesheet" href="../../../../css/reset.css">`
- Trở về trang tra cứu Guidelines: `../guidelines.html`
- Trở về trang Hub Y học chứng cứ: `../../ebm.html`

---

## ⚡ Quy Trình Tạo Tóm Tắt Guideline từ File Markdown (.md)

Khi nhận được tài liệu Y khoa / Guideline / RCT dạng file Markdown (`.md`) từ người dùng (nằm ở bất kỳ vị trí nào trong workspace hoặc `knowledge-vault`), thực hiện chuyển đổi nhanh chóng theo **2 phương thức**:

### 🛠️ Phương thức 1: Sử dụng Script Tự Động Hóa + Nâng Cấp UI Bắt Buộc (Khuyên Dùng)

Chạy lệnh Node.js với đường dẫn tới file `.md` đã chọn:
```bash
node .agents/skills/guideline-summary-module/scripts/convert_md_to_guideline.js "<path_to_md_file>"
```
*Script chỉ đóng vai trò dựng khung Boilerplate ban đầu:*
1. Parse YAML Frontmatter & cấu trúc Markdown.
2. Tạo file HTML cơ bản tại `src/content/ebm/guidelines/kho-guidelines/<slug>.html`.
3. Thêm bản ghi `SAMPLE_STUDIES` vào `guidelinesdata.js`.

⚠️ **BẮT BUỘC SAU KHI CHẠY SCRIPT (CRITICAL POST-PROCESSING STEP):**
Script `convert_md_to_guideline.js` chỉ tạo ra khung văn bản đơn thuần (`<p>`, `<ul>`). **AI TUYỆT ĐỐI KHÔNG ĐƯỢC DỪNG LẠI Ở ĐÂY**. AI phải dùng tool chỉnh sửa file để refactor lại toàn bộ file HTML vừa sinh ra, chuyển các đoạn văn bản dài thành các linh kiện UI trực quan sinh động:
- Chuyển phân loại/giai đoạn/triệu chứng thành **Bento Grid Cards (`.matrix-grid`, `.matrix-card`)** hoặc **Clinical Cards (`.clinical-grid`, `.clin-card`)**.
- Chuyển các bước di chuyển/diễn tiến sinh lý thành **Step Algorithm Cards (`.algorithm-container`, `.algo-step`)**.
- Chuyển cảnh báo, tác dụng phụ, lưu ý thành các **Infoboxes màu sắc (`.infobox.danger`, `.infobox.warning`, `.infobox.success`, `.infobox.info`)**.
- Chuyển phác đồ liều dùng & bằng chứng thành **Data Tables (`.data-table`)** với các nhãn liều dùng **`.rx-tag`**.
- Giữ 100% nội dung y khoa từ `.md` gốc nhưng trình bày theo đúng phong cách **Flagship Clinical Dashboard**.

### ✍️ Phương thức 2: Quy Trình 5 Bước Thủ Công / Tùy Chỉnh Chuyên Sâu

1. **Phân tích File `.md`**:
   - Trích xuất Frontmatter metadata (tiêu đề Việt-Anh, năm, tổ chức, chuyên khoa `specialty`, loại nguồn `sourceType`, thiết kế `design`, mức độ tác động `impact`).
   - Phân tích các Trụ cột chính (Pillars), Khuyến cáo chính (LOE, Class), Phác đồ liều dùng, Cảnh báo an toàn (Danger/Warning/Success Infoboxes), Dữ liệu bằng chứng định lượng (HR, OR, RR, %, p-value).
2. **Tạo trang HTML UI**:
   - Tạo file `src/content/ebm/guidelines/kho-guidelines/<slug>.html`.
   - Sử dụng Boilerplate chuẩn với Topnav sticky, Hero gradient, Pillars strip, Section cards, Infoboxes & Regimen tables.
3. **Đăng ký vào `guidelinesdata.js`**:
   - Thêm bản ghi mới vào mảng `SAMPLE_STUDIES` với `file: "kho-guidelines/<slug>.html"`.
   - Cấu hình chuỗi số liệu `keyResults` hoặc `subgroups` với cú pháp chuẩn (`HR ...`, `COL: ...`, `HBAR: ...`) để tự động render biểu đồ Mini SVG.
4. **Kiểm tra Tags & Links**:
   - Kiểm tra đóng mở thẻ HTML (`node tools/tools/scratch/check_tags.js <file>.html`).
   - Kiểm tra cú pháp JS: `node -c src/content/ebm/guidelines/guidelinesdata.js`.
5. **Tham khảo chi tiết**:
   - Đọc thêm tại `src/content/ebm/guidelines/HUONG_DAN_TAO_TOM_TAT_TU_MD.md`.

---

## 🎨 Tiêu chuẩn Giao diện & Design Tokens

Các trang Guideline chi tiết được thiết kế theo dạng **trang độc lập (standalone)** có thanh điều hướng nhỏ (`.topnav`) ở trên cùng để quay lại, không sử dụng sidebar accordion của hệ thống chính nhằm dành toàn bộ không gian cho dữ liệu lâm sàng phức tạp.

### 1. Palette màu sắc trạng thái
Sử dụng các biến màu CSS từ `main.css` kết hợp với styling inline an toàn để hiển thị sinh động các mức độ khuyến cáo:
- **Nguy cơ thấp / Khuyến cáo mạnh (Màu xanh lá):** `--color-success` (`#059669`), nền `#f0fdf4`, viền `#a7f3d0`
- **Nguy cơ cao / Kháng thuốc / Cảnh báo (Màu cam):** `--color-warning` (`#d97706`), nền `#fffbeb`, viền `#fde68a`
- **Nguy kịch / Sốc / Chống chỉ định (Màu đỏ):** `--color-rose` / `--red` (`#dc2626`), nền `#fef2f2`, viền `#fca5a5`
- **Thông tin lâm sàng / Lựa chọn thay thế (Màu xanh dương):** `--color-primary` / `--blue` (`#2563eb`), nền `#eff6ff`, viền `#bfdbfe`
- **Thông tin bổ sung / Kỵ khí (Màu xanh ngọc):** `--color-teal` (`#0d9488`), nền `#f0fdfa`, viền `#99f6e4`

### 2. Typography
- Font tiêu đề: `'Plus Jakarta Sans', sans-serif`
- Font nội dung chính: `'Inter', sans-serif`
- Font dữ liệu, công thức, phác đồ liều: `'JetBrains Mono', monospace`

---

## 🧱 Boilerplate HTML & CSS chuẩn

Mỗi khi tạo trang tóm tắt Guideline mới, hãy sử dụng khung cấu trúc hoàn chỉnh dưới đây:

```html
<!DOCTYPE html>
<html lang="vi" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[Mô tả SEO tóm tắt nội dung guideline khoảng 150-160 ký tự]">
  <title>[Tên Guideline/Thử nghiệm] – CliniPortal</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

    :root {
      --green: #059669; --green-bg: #f0fdf4; --green-light: #a7f3d0;
      --orange: #d97706; --orange-bg: #fffbeb; --orange-light: #fde68a;
      --red: #dc2626; --red-bg: #fef2f2; --red-light: #fca5a5;
      --blue: #2563eb; --blue-bg: #eff6ff; --blue-light: #bfdbfe;
      --teal: #0d9488; --teal-bg: #f0fdfa; --teal-light: #99f6e4;
      --purple: #7c3aed; --purple-bg: #faf5ff; --purple-light: #ddd6fe;
      --accent: #0f6fb4;
      --bg: #f0f4f8; --surface: #ffffff; --surface-2: #f8fafc;
      --border: #cbd5e1; --border-light: #e2e8f0;
      --text: #0f172a; --text-muted: #475569; --text-faint: #94a3b8;
      --radius: 16px; --tr: 220ms cubic-bezier(0.16,1,0.3,1);
    }

    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; font-size: 15px; background: var(--bg); color: var(--text); line-height: 1.65; min-height: 100vh; }

    /* TOP NAV */
    .topnav { position: sticky; top: 0; z-index: 200; background: rgba(255,255,255,0.94); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border-bottom: 1px solid var(--border-light); display: flex; align-items: center; gap: 1rem; padding: 0 1.5rem; height: 56px; }
    .topnav-back { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--accent); text-decoration: none; font-size: 0.82rem; font-weight: 600; padding: 0.3rem 0.75rem; border-radius: 8px; transition: background var(--tr); white-space: nowrap; }
    .topnav-back:hover { background: var(--blue-bg); }
    .topnav-divider { width: 1px; height: 18px; background: var(--border-light); flex-shrink: 0; }
    .topnav-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 0.88rem; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .topnav-badges { margin-left: auto; display: flex; gap: 0.5rem; flex-shrink: 0; }
    .badge { padding: 0.2rem 0.65rem; border-radius: 20px; font-size: 0.7rem; font-weight: 700; white-space: nowrap; }
    .badge-green { background: var(--green-bg); color: #065f46; border: 1px solid var(--green-light); }
    .badge-orange { background: var(--orange-bg); color: #92400e; border: 1px solid var(--orange-light); }

    /* HERO */
    .hero { background: linear-gradient(135deg, #0c4a6e 0%, #0f6fb4 40%, #065f46 100%); color: #fff; padding: 3.5rem 1.5rem 5rem; position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 15% 60%, rgba(56,189,248,0.2) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(16,185,129,0.15) 0%, transparent 50%); }
    .hero-inner { max-width: 960px; margin: 0 auto; position: relative; z-index: 1; }
    .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.24); border-radius: 20px; padding: 0.3rem 0.9rem; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 1rem; color: #7dd3fc; }
    .hero-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 0.75rem; }
    .hero-title span { display: block; background: linear-gradient(90deg, #7dd3fc, #6ee7b7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 0.7em; font-weight: 600; letter-spacing: 0; margin-bottom: 0.2rem; }
    .hero-subtitle { font-size: 0.95rem; opacity: 0.82; max-width: 660px; margin-bottom: 2rem; line-height: 1.6; }
    .hero-meta { display: flex; flex-wrap: wrap; gap: 0.75rem 2rem; font-size: 0.8rem; opacity: 0.75; }
    .hero-meta-item { display: flex; align-items: center; gap: 5px; }

    /* PILLARS STICKY NAV STRIP (MỤC LỤC ĐỒNG BỘ CHUẨN) */
    .pillars-nav { position: sticky; top: 56px; z-index: 190; background: var(--surface); border-bottom: 1px solid var(--border-light); padding: 0.75rem 1.5rem; }
    .pillars-nav-inner { max-width: 960px; margin: 0 auto; display: flex; gap: 0.6rem; overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .pillar-tab { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.85rem; border-radius: 10px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.78rem; font-weight: 700; color: var(--text-muted); border: 1px solid var(--border-light); background: var(--surface-2); text-decoration: none; white-space: nowrap; transition: all var(--tr); }
    .pillar-tab:hover { border-color: var(--accent); color: var(--accent); background: var(--blue-bg); }
    .pillar-tab.p-1 { border-left: 4px solid var(--blue); }
    .pillar-tab.p-2 { border-left: 4px solid var(--teal); }
    .pillar-tab.p-3 { border-left: 4px solid var(--green); }
    .pillar-tab.p-4 { border-left: 4px solid var(--purple); }
    .pillar-tab.p-5 { border-left: 4px solid var(--red); }
    .pillar-tab.p-6 { border-left: 4px solid var(--orange); }

    /* PILLARS STRIP */
    .pillars { background: var(--surface); border-bottom: 1px solid var(--border-light); padding: 1.75rem 1.5rem; }
    .pillars-inner { max-width: 960px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; }
    .pillar { background: var(--surface-2); border: 1px solid var(--border-light); border-radius: 14px; padding: 1.25rem 1.25rem 1.25rem 1.5rem; display: flex; align-items: flex-start; gap: 1rem; position: relative; overflow: hidden; transition: box-shadow var(--tr); }
    .pillar::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; border-radius: 4px 0 0 4px; }
    .pillar.p1::before { background: var(--blue); }
    .pillar.p2::before { background: var(--green); }
    .pillar.p3::before { background: var(--orange); }
    .pillar:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
    .pillar-icon { font-size: 1.8rem; flex-shrink: 0; line-height: 1; }
    .pillar-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 0.88rem; color: var(--text); margin-bottom: 0.25rem; }
    .pillar-desc { font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; }

    /* PAGE CONTENT */
    .page-content { max-width: 960px; margin: 0 auto; padding: 2.25rem 1.5rem; display: flex; flex-direction: column; gap: 2rem; }

    /* SECTION CARDS */
    .sec-card { background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius); overflow: hidden; scroll-margin-top: 110px; }
    .sec-hdr { padding: 1rem 1.5rem; border-bottom: 1px solid var(--border-light); background: var(--surface-2); display: flex; align-items: center; gap: 0.6rem; }
    .sec-hdr-icon { font-size: 1.1rem; }
    .sec-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.95rem; font-weight: 800; color: var(--text); }
    .sec-body { padding: 1.5rem; }
    .sec-subtitle { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.04em; }

    /* INFO BOXES */
    .infobox { display: flex; align-items: flex-start; gap: 0.85rem; padding: 1rem 1.25rem; border-radius: 12px; margin-bottom: 1rem; font-size: 0.85rem; line-height: 1.6; }
    .infobox:last-child { margin-bottom: 0; }
    .infobox-icon { font-size: 1.3rem; flex-shrink: 0; line-height: 1.3; }
    .infobox.danger { background: var(--red-bg); border: 1px solid var(--red-light); border-left: 4px solid var(--red); }
    .infobox.success { background: var(--green-bg); border: 1px solid var(--green-light); border-left: 4px solid var(--green); }
    .infobox.warning { background: var(--orange-bg); border: 1px solid var(--orange-light); border-left: 4px solid var(--orange); }
    .infobox.info { background: var(--blue-bg); border: 1px solid var(--blue-light); border-left: 4px solid var(--blue); }
    .infobox-title, .infobox > div > strong:first-child { display: block; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.88rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--text); }
    .infobox strong { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; }

    /* TABLE DESIGN */
    .table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .regimen-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; min-width: 700px; }
    .regimen-table thead th { padding: 0.7rem 0.9rem; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .regimen-table thead .th-source { background: var(--accent); color: #fff; width: 120px; border-radius: 8px 0 0 0; }
    .regimen-table thead .th-low { background: var(--green); color: #fff; }
    .regimen-table thead .th-high { background: #b45309; color: #fff; border-radius: 0 8px 0 0; }
    .regimen-table td { padding: 0.85rem 0.9rem; border-bottom: 1px solid var(--border-light); vertical-align: top; line-height: 1.55; }
    .regimen-table tbody tr:hover td { background: #f8fafc; }
    .source-cell { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 0.82rem; color: var(--accent); display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; }
    .rx-tag { display: inline-block; background: var(--border-light); color: var(--text-muted); font-size: 0.72rem; font-family: 'JetBrains Mono', monospace; padding: 0.15rem 0.5rem; border-radius: 5px; margin: 0.15rem 0.1rem 0.15rem 0; }
    .rx-tag.preferred { background: var(--green-bg); color: #065f46; border: 1px solid var(--green-light); font-weight: 600; }

    /* EBM EVIDENCE HIERARCHY BADGES & CARDS */
    .ebm-badge-group { display: inline-flex; align-items: center; gap: 0.35rem; flex-wrap: wrap; margin-right: 0.4rem; vertical-align: middle; }
    .cor-badge, .loe-badge { padding: 0.2rem 0.55rem; border-radius: 8px; font-size: 0.72rem; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; display: inline-flex; align-items: center; gap: 0.3rem; }
    .cor-class-1 { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
    .cor-class-2a { background: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc; }
    .cor-class-2b { background: #fef3c7; color: #b45309; border: 1px solid #fcd34d; }
    .cor-class-3 { background: #ffe4e6; color: #be123c; border: 1px solid #fda4af; }
    .loe-grade-a { background: rgba(16,185,129,0.12); color: #047857; border: 1px solid rgba(16,185,129,0.35); }
    .loe-grade-b { background: rgba(59,130,246,0.12); color: #1d4ed8; border: 1px solid rgba(59,130,246,0.35); }
    .loe-grade-c { background: rgba(245,158,11,0.12); color: #b45309; border: 1px solid rgba(245,158,11,0.35); }
    .ebm-rec-card { background: var(--surface); border: 1px solid var(--border-light); border-left: 4px solid var(--accent); border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 0.85rem; }
    .ebm-rec-card.class-1 { border-left-color: #059669; }
    .ebm-rec-card.class-2a { border-left-color: #0284c7; }
    .ebm-rec-card.class-2b { border-left-color: #d97706; }
    .ebm-rec-card.class-3 { border-left-color: #dc2626; }

    /* UPDATES GRID CARDS */
    .updates-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(320px,100%), 1fr)); gap: 1.25rem; }
    .update-card { background: var(--surface-2); border: 1px solid var(--border-light); border-radius: 14px; padding: 1.35rem; position: relative; overflow: hidden; transition: box-shadow var(--tr); }
    .update-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
    .update-card-accent { position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: 14px 14px 0 0; }
    .update-card-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
    .update-card-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
    .update-card-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 0.9rem; color: var(--text); line-height: 1.3; }
    .update-card-body { font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; }
    .update-verdict { display: inline-flex; align-items: center; gap: 0.35rem; margin-top: 0.85rem; padding: 0.35rem 0.75rem; border-radius: 8px; font-size: 0.75rem; font-weight: 700; }
    .verdict-green { background: var(--green-bg); color: #065f46; border: 1px solid var(--green-light); }
    .verdict-blue { background: var(--blue-bg); color: #1e40af; border: 1px solid var(--blue-light); }

    /* CITATION & ACTION BUTTONS */
    .citation-box { background: var(--surface-2); border: 1px solid var(--border-light); border-radius: 12px; padding: 1.25rem; font-size: 0.82rem; color: var(--text-muted); line-height: 1.75; font-style: italic; }
    .btn-row { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-top: 1.25rem; }
    .btn { display: inline-flex; align-items: center; gap: 6px; padding: 0.55rem 1.1rem; border-radius: 10px; border: 1.5px solid var(--border-light); background: var(--surface); color: var(--text-muted); font-size: 0.82rem; font-weight: 600; cursor: pointer; text-decoration: none; transition: all var(--tr); }
    .btn:hover { border-color: var(--accent); color: var(--accent); background: var(--blue-bg); }
    .btn-primary { background: var(--accent); color: #fff; border-color: var(--accent); }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      .page-content { padding: 1.25rem 1rem; }
      .sec-body { padding: 1rem; }
      .updates-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <!-- TOP NAV -->
  <nav class="topnav">
    <a href="../Guidelines.html" class="topnav-back">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      Kho Guidelines
    </a>
    <div class="topnav-divider"></div>
    <div class="topnav-title">[Tên chủ đề cập nhật]</div>
  </nav>

  <!-- HERO -->
  <div class="hero">
    <div class="hero-inner">
      <div class="hero-badge">🔬 [Tên hội hội/chuyên khoa]</div>
      <h1 class="hero-title">
        <span>[Tiêu đề phụ tiếng Anh]</span>
        [Tiêu Đề Khuyến Cáo Tiếng Việt]
      </h1>
      <p class="hero-subtitle">
        [Mô tả tổng quan ngắn gọn về tầm quan trọng của guideline này]
      </p>
    </div>
  </div>

  <!-- PILLARS STICKY NAV BAR (MỤC LỤC ĐỒNG BỘ CÁC TRANG GUIDELINES) -->
  <div class="pillars-nav">
    <div class="pillars-nav-inner">
      <a href="#sec-1" class="pillar-tab p-1">1. [Phần 1]</a>
      <a href="#sec-2" class="pillar-tab p-2">2. [Phần 2]</a>
      <a href="#sec-3" class="pillar-tab p-3">3. [Phần 3]</a>
      <a href="#sec-4" class="pillar-tab p-4">4. [Phần 4]</a>
    </div>
  </div>

  <!-- PILLARS -->
  <div class="pillars">
    <div class="pillars-inner">
      <div class="pillar p1">
        <div class="pillar-icon">⏱️</div>
        <div>
          <div class="pillar-title">Trụ cột 1</div>
          <div class="pillar-desc">[Mô tả ngắn gọn]</div>
        </div>
      </div>
      <!-- Thêm các pillars khác nếu cần -->
    </div>
  </div>

  <!-- CONTENT -->
  <div class="page-content">
    <!-- Thêm sec-card tại đây -->
  </div>

  <!-- 📊 HƯỚNG DẪN DÙNG VẼ BIỂU ĐỒ MINI TRONG EBM GUIDELINES -->
  <!-- 
    Hệ thống tự động nhận diện và vẽ SVG mini cho 3 dạng biểu đồ:
    1. Forest Plot:
       keyResults / subgroup value chứa HR, OR, RR, 95% CI
       Ví dụ: "HR 0.86 (95% CI 0.74-0.99, p=0.04)"
    2. Biểu đồ Cột đứng (Column Chart):
       Ví dụ: "COL: Can thiệp: 74.5% | Giả dược: 48.2%"
       Hoặc JSON: { "type": "column", "data": [{ "label": "A", "value": 10 }] }
    3. Biểu đồ Cột ngang (Horizontal Bar Chart):
       Ví dụ: "HBAR: Tuổi <65: 78.5% | Tuổi >=65: 54.0%"
       Hoặc JSON: { "type": "horizontal-bar", "data": [{ "label": "A", "value": 10 }] }
  -->

  <!-- 💡 GRAPHIFY & INTEGRITY CHECKLIST -->
  <!-- 
    1. Graphify Risk Check: guidelines.js là CRITICAL HUB (570 fan-in dependencies).
       Nếu chỉnh sửa logic chung hoặc Supabase sync của Kho Guidelines, chạy `node tools/tools/scratch/query_graph.js guidelines.js`.
    2. HTML Integrity Check: Chạy `node tools/tools/scratch/check_tags.js path/to/guideline_file.html` để đảm bảo thẻ đóng mở chuẩn xác.
  -->
</body>
</html>
```

