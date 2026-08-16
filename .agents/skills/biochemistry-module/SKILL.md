---
name: biochemistry-module
description: >
  Quy trình tạo và chỉnh sửa bài viết Hóa sinh Y học & Sinh học phân tử chuẩn EBM
  trong phân hệ Cơ sở Y khoa (src/content/pathophysiology/biochemistry/) của CliniPortal.
  Kích hoạt khi AI cần: tạo bài giảng Hóa sinh mới thuộc 7 khối (Block 1 - Block 7),
  thêm sơ đồ cơ chế phân tử SVG, tích hợp bảng xét nghiệm cận lâm sàng hoặc xử lý layout điều hướng sticky.
---

# Biochemistry Module Skill (Hóa Sinh Y Học & Sinh Học Phân Tử)

> Kỹ năng chuyên sâu hướng dẫn cấu trúc, giao diện, bảng biểu xét nghiệm, sơ đồ phản ứng phân tử SVG và chuẩn điều hướng mượt mà cho phân hệ **Hóa Sinh Y Học (Biochemistry & Molecular Biology)** trong CliniPortal.

---

## 🏛️ 1. Quy hoạch Phân hệ 7 Khối (7 Blocks)

Tất cả các bài viết Hóa sinh được lưu trữ tại `src/content/pathophysiology/biochemistry/`:

```text
src/content/pathophysiology/biochemistry/
├── README.md
├── block1-biomolecules/           # Khối 1: Cấu trúc 4 Đại phân tử (Glucid, Lipid, Protid, Acid Nucleic, Hb, Nước/pH)
├── block2-catalysis-signaling/    # Khối 2: Động học Enzym, Coenzym & Dẫn truyền tín hiệu tế bào
├── block3-bioenergetics/          # Khối 3: Năng lượng sinh học, Chuỗi hô hấp tế bào & Chu trình Krebs (TCA)
├── block4-intermediary-metabolism/# Khối 4: Chuyển hóa trung gian Glucid, Lipid, Protid & Nucleotid
├── block5-molecular-genetics/     # Khối 5: Di truyền phân tử, Sao chép DNA, Phiên mã, Dịch mã & Kỹ thuật Gene
├── block6-organ-metabolism/       # Khối 6: Hóa sinh cơ quan (Gan, Thận, Tim, Cơ, Não, Máu, Xương, Mô mỡ)
└── block7-clinical-biochemistry/  # Khối 7: Hóa sinh lâm sàng, Rối loạn chuyển hóa & Biện luận bộ Bilan xét nghiệm
```

---

## 🛑 2. Bộ Quy tắc Bất di Bất dịch (Mandatory Rules)

1. **Đường dẫn tương đối cấp 4**:
   - Tệp bài viết nằm ở cấp 4 (ví dụ `biochemistry/block1-biomolecules/hoa-hoc-lipid.html`).
   - Root CSS/JS: `../../../../css/` và `../../../../components/`.
   - Resource module: `../../css/physio-shared.css` và `../../physio-shared.ts`.
2. **Cấm xung đột SPA Hash Router**:
   - Tất cả các thẻ `<a href="#sec-X">` trong thanh điều hướng bài học **bắt buộc** phải có:
     `onclick="event.preventDefault(); document.getElementById('sec-X')?.scrollIntoView({behavior:'smooth'});"`
   - Thuộc tính `scroll-margin-top: 80px;` phải được khai báo trên `.article-section` hoặc `.sec-card` để tránh bị toolbar che khuất.
3. **Thanh Mục lục chuẩn Kho Guidelines (`.pillars-nav`)**:
   - Sử dụng thanh dải sticky nav `.pillars-nav` với các tab `.pillar-tab.p-1` &rarr; `.p-X`.
   - **Tuyệt đối không** nhân bản 2 khối mục lục (không dùng song song thẻ `.toc-card` trùng lặp).
4. **Chuẩn đồ họa SVG thuần (Pure Inline SVG)**:
   - Sơ đồ chuyển hóa, màng tế bào, cắt ngang lipoprotein dùng Pure Inline SVG với `viewBox` co giãn linh hoạt và sử dụng token `var(--color-...)` để tự động đổi màu khi sang Dark Mode.
5. **Kiểm tra HTML Integrity**:
   - Sau khi tạo hoặc chỉnh sửa tệp HTML, bắt buộc chạy:
     ```bash
     node scratch/check_tags.js src/content/pathophysiology/biochemistry/blockX/.../ten-bai.html
     npm run build
     ```

---

## 📐 3. Template HTML Mẫu Chuẩn Cho Bài Hóa Sinh

```html
<!DOCTYPE html>
<html lang="vi" data-theme="light">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CHEM-XX: [Tên Bài Giảng] – Hóa Sinh Y Học – CliniPortal</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="../../../../css/reset.css">
    <link rel="stylesheet" href="../../../../css/main.css">
    <link rel="stylesheet" href="../../../../css/components/physio-content.css">
    <link rel="stylesheet" href="../../css/physio-shared.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script type="module" src="../../physio-shared.ts"></script>

    <style>
        :root {
            --biochem-accent: #0284c7;
            --biochem-gradient: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0284c7 100%);
        }

        [data-theme="dark"] {
            --biochem-gradient: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e3a8a 100%);
        }

        .biochem-article-header {
            background: var(--biochem-gradient);
            color: #ffffff;
            padding: 2.5rem 2rem;
            border-radius: 16px;
            margin-bottom: 2rem;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
            position: relative;
            overflow: hidden;
        }

        .biochem-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.18);
            backdrop-filter: blur(8px);
            padding: 0.35rem 0.85rem;
            border-radius: 999px;
            font-size: 0.85rem;
            font-weight: 700;
            margin-bottom: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.25);
            text-transform: uppercase;
        }

        /* PILLARS STICKY NAV STRIP (MỤC LỤC ĐỒNG BỘ KHO GUIDELINES) */
        .pillars-nav {
            position: sticky;
            top: 0;
            z-index: 100;
            background: var(--color-surface, #ffffff);
            border: 1px solid var(--color-border, #e2e8f0);
            border-radius: 14px;
            padding: 0.75rem 1rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
        }

        .pillars-nav-inner {
            display: flex;
            gap: 0.6rem;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }

        .pillar-tab {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.45rem 0.85rem;
            border-radius: 10px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 0.78rem;
            font-weight: 700;
            color: var(--color-text-muted, #64748b);
            border: 1px solid var(--color-border, #e2e8f0);
            background: var(--color-bg, #f8fafc);
            text-decoration: none;
            white-space: nowrap;
            transition: all 0.2s ease;
            flex-shrink: 0;
        }

        .pillar-tab:hover, .pillar-tab.active {
            border-color: var(--color-primary, #0284c7);
            color: var(--color-primary, #0284c7);
            background: rgba(2, 132, 199, 0.08);
            transform: translateY(-1px);
        }

        .pillar-tab.p-1 { border-left: 4px solid #0284c7; }
        .pillar-tab.p-2 { border-left: 4px solid #10b981; }
        .pillar-tab.p-3 { border-left: 4px solid #8b5cf6; }
        .pillar-tab.p-4 { border-left: 4px solid #f59e0b; }
        .pillar-tab.p-5 { border-left: 4px solid #06b6d4; }
        .pillar-tab.p-6 { border-left: 4px solid #ec4899; }
        .pillar-tab.p-7 { border-left: 4px solid #ef4444; }
        .pillar-tab.p-8 { border-left: 4px solid #3b82f6; }

        [data-theme="dark"] .pillars-nav {
            background: var(--color-surface, #1e293b);
            border-color: var(--color-border, #334155);
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
        }

        [data-theme="dark"] .pillar-tab {
            background: var(--color-surface-2, #0f172a);
            border-color: var(--color-border, #334155);
            color: var(--color-text-muted, #94a3b8);
        }

        .article-section {
            scroll-margin-top: 80px;
            margin-bottom: 2.5rem;
        }

        /* HEADINGS TYPOGRAPHY CÓ MÀU CHUẨN KHO GUIDELINES / CƠ SỞ */
        .section-title,
        .article-section h2 {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: clamp(1.2rem, 2.4vw, 1.45rem);
            font-weight: 800;
            line-height: 1.35;
            color: var(--color-primary, #0284c7);
            margin: 2.25rem 0 1.25rem 0;
            padding-bottom: 0.65rem;
            border-bottom: 2px solid rgba(2, 132, 199, 0.2);
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.65rem;
        }

        .section-title i,
        .article-section h2 i {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            font-size: 1.05rem;
            background: rgba(2, 132, 199, 0.12);
            color: var(--color-primary, #0284c7);
            border-radius: 8px;
            flex-shrink: 0;
        }

        .subsection-title,
        .article-section h3 {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 1.15rem;
            font-weight: 700;
            line-height: 1.45;
            color: var(--color-primary, #0284c7);
            margin: 1.85rem 0 1rem 0;
            padding: 0.5rem 0.95rem;
            border-left: 4px solid var(--color-primary, #0284c7);
            background: linear-gradient(90deg, rgba(2, 132, 199, 0.08) 0%, transparent 100%);
            border-radius: 0 8px 8px 0;
            display: flex;
            align-items: center;
            gap: 0.55rem;
        }

        [data-theme="dark"] .section-title,
        [data-theme="dark"] .article-section h2,
        [data-theme="dark"] .subsection-title,
        [data-theme="dark"] .article-section h3 {
            color: #38bdf8;
        }

        [data-theme="dark"] .section-title i,
        [data-theme="dark"] .article-section h2 i {
            background: rgba(56, 189, 248, 0.15);
            color: #38bdf8;
        }

        [data-theme="dark"] .subsection-title,
        [data-theme="dark"] .article-section h3 {
            border-left-color: #38bdf8;
            background: linear-gradient(90deg, rgba(56, 189, 248, 0.12) 0%, transparent 100%);
        }

        /* Medical Callout Boxes */
        .reaction-box { background: rgba(139, 92, 246, 0.08); border-left: 4px solid #8b5cf6; padding: 1.25rem 1.5rem; border-radius: 0 12px 12px 0; margin: 1.5rem 0; }
        .pearl-box { background: rgba(245, 158, 11, 0.08); border-left: 4px solid #f59e0b; padding: 1.25rem 1.5rem; border-radius: 0 12px 12px 0; margin: 1.5rem 0; }
        .danger-box { background: rgba(239, 68, 68, 0.08); border-left: 4px solid #ef4444; padding: 1.25rem 1.5rem; border-radius: 0 12px 12px 0; margin: 1.5rem 0; }
        .info-box { background: rgba(2, 132, 199, 0.08); border-left: 4px solid #0284c7; padding: 1.25rem 1.5rem; border-radius: 0 12px 12px 0; margin: 1.5rem 0; }

        .lab-table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.92rem; }
        .lab-table th, .lab-table td { border: 1px solid var(--color-border, #e2e8f0); padding: 0.85rem 1rem; text-align: left; vertical-align: top; }
        .lab-table th { background: var(--color-surface-offset, #f8fafc); font-weight: 700; color: var(--color-text, #0f172a); }
    </style>
</head>

<body class="physio-article-body">
    <div class="physio-article-container">

        <!-- HEADER -->
        <header class="biochem-article-header">
            <span class="biochem-badge"><i class="fa-solid fa-dna"></i> CHEM-XX • Khối X: [Tên Khối]</span>
            <h1 style="margin: 0.25rem 0 0.75rem 0; font-size: 2rem; font-weight: 800; color: #ffffff; line-height: 1.3;">
                [Tiêu Đề Bài Giảng Hóa Sinh]
            </h1>
            <p style="margin: 0; font-size: 1.05rem; opacity: 0.95; line-height: 1.6; max-width: 900px;">
                [Tóm tắt ngắn gọn các chủ điểm phân tử, chu trình chuyển hóa, bệnh học di truyền và ứng dụng xét nghiệm lâm sàng.]
            </p>
        </header>

        <!-- PILLARS STICKY NAV STRIP -->
        <nav class="pillars-nav" aria-label="Mục lục bài học nhanh">
            <div class="pillars-nav-inner">
                <a href="#sec-1" class="pillar-tab p-1" onclick="event.preventDefault(); document.getElementById('sec-1')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-layer-group"></i> 1. Cấu Trúc & Phân Loại</a>
                <a href="#sec-2" class="pillar-tab p-2" onclick="event.preventDefault(); document.getElementById('sec-2')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-flask-vial"></i> 2. Tính Chất & Phản Ứng</a>
                <a href="#sec-3" class="pillar-tab p-3" onclick="event.preventDefault(); document.getElementById('sec-3')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-route"></i> 3. Chu Trình Chuyển Hóa</a>
                <a href="#sec-4" class="pillar-tab p-4" onclick="event.preventDefault(); document.getElementById('sec-4')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-stethoscope"></i> 4. Bệnh Học Phân Tử</a>
                <a href="#sec-5" class="pillar-tab p-5" onclick="event.preventDefault(); document.getElementById('sec-5')?.scrollIntoView({behavior:'smooth'});"><i class="fa-solid fa-vials"></i> 5. Chỉ Số Bilan Lâm Sàng</a>
            </div>
        </nav>

        <!-- SECTION 1 -->
        <section id="sec-1" class="article-section">
            <h2 class="section-title"><i class="fa-solid fa-layer-group"></i> 1. Cấu Trúc & Phân Loại</h2>
            <p class="section-text">...</p>
        </section>

        <!-- SECTION 2 -->
        <section id="sec-2" class="article-section">
            <h2 class="section-title"><i class="fa-solid fa-flask-vial"></i> 2. Tính Chất Lý Hóa & Điểm Chốt Phản Ứng</h2>
            <div class="reaction-box">
                <code>Phương trình phản ứng hoặc cơ chế enzym chốt</code>
            </div>
        </section>

        <!-- SECTION 3 -->
        <section id="sec-3" class="article-section">
            <h2 class="section-title"><i class="fa-solid fa-route"></i> 3. Động Học & Con Đường Chuyển Hóa</h2>
            <div class="pearl-box">
                <strong><i class="fa-solid fa-lightbulb"></i> Điểm Ngọc Lâm Sàng (Clinical Pearl):</strong>
                ...
            </div>
        </section>

        <!-- SECTION 4 -->
        <section id="sec-4" class="article-section">
            <h2 class="section-title"><i class="fa-solid fa-stethoscope"></i> 4. Bệnh Học Rối Loạn & Khiếm Khuyết Di Truyền</h2>
            <div class="danger-box">
                <strong><i class="fa-solid fa-triangle-exclamation"></i> Cảnh Báo Lâm Sàng:</strong>
                ...
            </div>
        </section>

        <!-- SECTION 5 -->
        <section id="sec-5" class="article-section">
            <h2 class="section-title"><i class="fa-solid fa-vials"></i> 5. Chỉ Số Cận Lâm Sàng & Biện Luận Bilan Xét Nghiệm</h2>
            <table class="lab-table">
                <thead>
                    <tr>
                        <th>Chỉ Số</th>
                        <th>Khoảng Tham Chiếu</th>
                        <th>Biện Luận Lâm Sàng</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>...</strong></td>
                        <td>...</td>
                        <td>...</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <!-- FOOTER & REFERENCES -->
        <footer style="margin-top: 3.5rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border, #e2e8f0); color: var(--color-text-muted, #64748b); font-size: 0.875rem; line-height: 1.7;">
            <h4 style="margin: 0 0 0.5rem 0; color: var(--color-text, #334155); font-size: 0.95rem;">Tài Liệu Tham Khảo Chuẩn AMA:</h4>
            <ol style="margin: 0; padding-left: 1.25rem;">
                <li>Bộ Môn Hóa Sinh (ĐHYD TPHCM). <em>Hóa Sinh Y Học</em>. TP. Hồ Chí Minh: NXB Y Học; 2024.</li>
                <li>Kennelly PJ, et al. <em>Harper's Illustrated Biochemistry</em>. 32nd ed. McGraw-Hill; 2023.</li>
            </ol>
        </footer>

    </div>
</body>

</html>
```

---

## 🛠️ 4. Checklist Kiểm Định Trước Khi Bàn Giao

- [ ] Đường dẫn tài nguyên đúng cấp 4 (`../../../../` và `../../`).
- [ ] Tất cả liên kết trong `.pillars-nav` có `onclick="event.preventDefault(); document.getElementById('sec-X')?.scrollIntoView({behavior:'smooth'});"`.
- [ ] Không có khối mục lục thừa lặp lại.
- [ ] Mọi `.article-section` có `id="sec-X"` và `scroll-margin-top: 80px`.
- [ ] Bảng biểu xét nghiệm `.lab-table` và các hộp callout có đủ 4 màu ngữ nghĩa.
- [ ] Chạy `node scratch/check_tags.js <file.html>` đạt **PASSED**.
- [ ] Chạy `npm run build` không phát sinh lỗi TypeScript.
