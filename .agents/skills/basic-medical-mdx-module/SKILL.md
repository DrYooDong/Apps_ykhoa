---
name: basic-medical-mdx-module
description: >
  Bộ quy chuẩn và quy trình tổng lực soạn thảo, biên tập và kiểm định các bài học Y khoa cơ sở (.mdx)
  trong src/content/basic-medical/ (Sinh lý học, Hóa sinh y học, Dịch tễ học, Ca bệnh Sinh lý bệnh)
  theo chuẩn Astro MDX Native, Design Tokens CliniPortal 2.0 và Y học chứng cứ EBM 2026.
---

# 🧬 Basic Medical MDX Module Master Skill (Cơ Sở Y Khoa — MDX Native)

> **Mục tiêu**: Hướng dẫn toàn diện và thống nhất quy trình soạn thảo, chuyển đổi và kiểm thử các bài học Y khoa cơ sở thuộc 4 phân hệ chính (`physiology/`, `biochemistry/`, `epidemiology/`, `pathophysiology-cases/`) trong thư mục `src/content/basic-medical/` theo chuẩn **Astro MDX Native**.

---

## 🏛️ 1. Cấu Trúc Phân Hệ Cơ Sở Y Khoa (`src/content/basic-medical/`)

```text
src/content/basic-medical/
├── MDX_COMPONENT_DESIGN_SPEC.md       # Tài liệu đặc tả linh kiện MDX Gold Standard
├── README.md                          # Tổng quan phân hệ Cơ sở Y khoa
├── biochemistry/                      # 🧪 Hóa Sinh Y Học & Sinh Học Phân Tử (7 Blocks)
│   ├── block1-biomolecules/           # Cấu trúc 4 Đại phân tử, Hb & Nước/pH
│   ├── block2-catalysis-signaling/    # Động học Enzym, Coenzym & Truyền tin tế bào
│   ├── block3-bioenergetics/          # Năng lượng sinh học, Chuỗi ETC & Krebs
│   ├── block4-intermediary-metabolism/# Chuyển hóa Glucid, Lipid, Protid, Nucleotid
│   ├── block5-molecular-genetics/     # Di truyền phân tử, Tái bản, Phiên mã, Dịch mã
│   ├── block6-organ-metabolism/       # Hóa sinh Cơ quan (Gan, Thận, Tim, Cơ, Não)
│   └── block7-clinical-biochemistry/  # Hóa sinh lâm sàng & Biện luận Bilan Lab
├── physiology/                        # 🧬 Sinh Lý Học Y Khoa Chuẩn EBM (9 Parts)
│   ├── part1/                         # Tế bào, Màng & Nội môi
│   ├── part2/                         # Thần kinh & Cơ
│   ├── part3/                         # Tim mạch & Huyết động học
│   ├── part4/                         # Hô hấp & Trao đổi khí
│   ├── part5/                         # Thận & Thể dịch
│   ├── part6/                         # Tiêu hóa & Gan mật
│   ├── part7/                         # Nội tiết & Chuyển hóa
│   ├── part8/                         # Sinh sản & Phát triển
│   └── part9/                         # Thần kinh Cấp cao & Giác quan
├── epidemiology/                      # 🦟 Dịch Tễ Học Y Khoa & Y Tế Công Cộng (5 Domains)
│   ├── dth-dengue.mdx                 # Sốt xuất huyết Dengue & Vector Aedes
│   ├── dth-sot-ret.mdx                # Sốt rét & Vector Anopheles
│   └── ...                            # Các chuyên đề dịch tễ học khác
└── pathophysiology-cases/             # 🩺 Ca Bệnh Lâm Sàng & Cơ Chế Bệnh Sinh
    ├── slb-ccbs-soc.mdx               # Sốc (Shock) & Suy đa tạng
    ├── slb-ccbs-acs.mdx               # Hội chứng vành cấp (ACS)
    └── ...                            # Các chuyên đề cơ chế bệnh sinh khác
```

---

## 🛑 2. Bộ 8 Quy Tắc Vàng Khi Soạn Bài MDX Cơ Sở Y Khoa

1. **Tuyệt Đối Không Dùng HTML Shell**:
   - Loại bỏ hoàn toàn `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, `<script>`, `<style>`.
   - Layout được quản lý qua Astro Router (`src/pages/[chuyen-khoa]/[...slug].astro`) và `ArticleLayout.astro`.

2. **Khối Frontmatter YAML Chuẩn Hóa 100%**:
   - Luôn có đầy đủ metadata: `title`, `slug`, `code`, `category`, `status: "published"`, `version: "2.0.0"`, `updatedAt`, `description`, `tags`, `clinicalPearls`, `sections`.
   - Mảng `sections: [{ id: "sec-X", number: X, title: "...", icon: "fa-..." }]` bắt buộc phải khớp 100% với các thẻ `## X. Tiêu Đề {#sec-X}` trong bài.

3. **Cú Pháp KaTeX Toán Y Sinh Chuẩn**:
   - Công thức khối: Đặt trong `$$ ... $$` riêng một dòng.
   - Ký hiệu trong dòng: Đặt trong `$ ... $` (ví dụ: `$NADH$`, `$V_m \approx -90\text{ mV}$`, `$P_{GC}$`).
   - Tuyệt đối không để chữ tiếng Việt có dấu thô trong khối KaTeX (chuyển sang `\text{...}` hoặc ký tự Unicode `≥, ≤, ±, ×, →, α, β, Δ`).

4. **Escape Ký Tự JSX Bắt Buộc**:
   - Dấu so sánh nhỏ hơn: `<` $\rightarrow$ `&lt;` (ví dụ: `eGFR &lt; 30 mL/min`, `pH &lt; 7.35`).
   - Dấu so sánh lớn hơn: `>` $\rightarrow$ `&gt;` (ví dụ: `ScvO2 &gt; 85%`).
   - Dấu ngoặc nhọn ngoài JSX props: `{` $\rightarrow$ `&#123;`, `}` $\rightarrow$ `&#125;`.

5. **Linh Kiện Điều Hướng QuickNav & Stats Strip**:
   - Đặt `<BiochemQuickNav />` hoặc `<PhysioQuickNav />` hoặc `<QuickNav />` ngay sau tiêu đề `<h1>`.
   - Bổ sung `<section class="stats-strip">` với 4 thẻ `.stat-card` tóm tắt các chỉ số định lượng then chốt.

6. **Khung Thông Tin Chuyên Sâu (Alerts / Infoboxes)**:
   - Dùng `<BiochemAlert type="..." title="...">` hoặc `<div class="infobox pearl|danger|reaction|info">`.
   - Luôn phân loại rõ ràng: Pearl (Điểm ngọc), Danger (Cảnh báo nguy hiểm / chống chỉ định), Reaction (Điểm chốt phản ứng / động học), Info (Ghi chú sinh học).

7. **Đồ Họa Xuất Bản Editorial Pure SVG Studio**:
   - Không dùng thư viện ngoài (No Chart.js, No Mermaid).
   - SVG thuần dùng `viewBox`, token `var(--color-...)` để tự động chuyển màu trong Dark Mode.
   - Cấm dùng thẻ HTML (`<strong>`, `<b>`, `<span>`, `<br>`) bên trong `<text>` của SVG. Bắt buộc dùng `<tspan font-weight="700">` hoặc định vị `y` rõ ràng.

8. **Bắt Buộc Xử Lý & Nhúng 100% Hình Ảnh Đính Kèm (Image Asset Pipeline)**:
   - Khi file `.md` nguồn có chứa cú pháp hình ảnh (`![[Pasted image ...]]` hoặc `![alt](path)`):
   - **Tìm & Sao chép**: Trích xuất tệp ảnh từ `knowledge-vault/_resources/attachments/` sang thư mục `images/` của phân hệ (`src/content/basic-medical/.../images/`), đổi tên theo dạng kebab-case có ý nghĩa.
   - **Nhúng chuẩn thẻ Figure**: Bọc ảnh trong `<figure class="physio-figure">` với thẻ `<img src="./images/..." class="physio-img lightbox-trigger" ... />` và `<figcaption>` ghi rõ chú thích giải phẫu/bệnh học và nguồn trích dẫn EBM.
   - **Tuyệt đối không được bỏ quên ảnh đính kèm khi chuyển từ `.md` sang `.mdx`.**

9. **Kiểm Định Bản Build Cuối Cùng**:
   - Sau khi hoàn thành, bắt buộc chạy `npm run build` (`tsc --noEmit && vite build`).
   - Chỉ bàn giao khi kết quả trả về **Exit code 0**.

---

## 📐 3. Quy Trình Soạn Bài 4 Bước Từ Knowledge Vault Sang MDX

```
[BƯỚC 1: TRÍCH XUẤT NGUỒN TRI THỨC & TÀI NGUYÊN ẢNH]
  ├── Đọc toàn bộ file nguồn trong knowledge-vault/ (1.1. Kho sinh lý, 1.2. Kho hóa sinh, 1.3. Kho sinh lý bệnh, 1.4. Kho dịch tễ).
  ├── Quét tìm tất cả cú pháp ảnh ![[...]] hoặc ![...](...) ➔ Sao chép & chuẩn hóa tên vào images/.
  └── Hệ thống hóa: Cấu trúc cơ bản, cơ chế phân tử, phương trình phản ứng, điểm chốt lâm sàng và lab tests.

[BƯỚC 2: THIẾT KẾ KHỐI YAML FRONTMATTER & MỤC LỤC]
  ├── Xác định mã code (PHYS-..., CHEM-..., EPI-..., PATHO-..., CCBS-...).
  ├── Thiết lập 4-9 sections có icon FontAwesome phù hợp.
  └── Tóm tắt 2-4 Clinical Pearls chất lượng cao.

[BƯỚC 3: DỰNG NỘI DUNG VỚI LINH KIỆN MDX NATIVE & HÌNH ẢNH TRỰC QUAN]
  ├── Header <h1> + QuickNav + Quick Stats Strip.
  ├── Các phần nội dung có ID neo {#sec-X}.
  ├── Nhúng 100% sơ đồ hình ảnh <figure class="physio-figure"> kèm <figcaption> và lightbox.
  ├── Tích hợp KaTeX math, bảng đối sánh .table-modern, ma trận .matrix-grid và lưu đồ .flow-steps.
  └── Khung trích dẫn AMA Citation Box & Nút quay lại SPA.

[BƯỚC 4: KIỂM ĐỊNH TOÀN DIỆN & BUILD TEST]
  ├── Rà soát escape ký tự (<, >, {, }) và làm sạch lỗi Math.
  ├── Chạy `npm run build` kiểm tra TypeScript và biên dịch MDX.
  └── Xác nhận trang hiển thị hoàn hảo ở cả Light Mode và Dark Mode.
```

---

## 🛠️ 4. Bảng Tra Cứu Linh Kiện MDX Nhanh

| Mục Đích Hiển Thị | Linh Kiện / Thẻ HTML Chuẩn | Class / Props |
|---|---|---|
| **Điều hướng nhanh** | `<BiochemQuickNav />` / `<PhysioQuickNav />` / `<QuickNav />` | Tự động đọc `sections` |
| **Dải 4 chỉ số nhanh** | `<section class="stats-strip">` | `.stats-grid` > `.stat-card` > `.stat-val`, `.stat-lbl` |
| **Điểm ngọc lâm sàng** | `<BiochemAlert type="pearl">` hoặc `<div class="infobox pearl">` | Icon `fa-gem`, viền hổ phách |
| **Cảnh báo nguy hiểm** | `<BiochemAlert type="danger">` hoặc `<div class="infobox danger">` | Icon `fa-triangle-exclamation`, viền đỏ |
| **Điểm chốt phản ứng** | `<BiochemAlert type="reaction">` hoặc `<div class="infobox reaction">` | Icon `fa-flask-vial`, viền tím / ngọc |
| **Bảng đối sánh hiện đại** | `<div class="table-responsive">` | `<table class="table-modern">`, thẻ `<span class="rx-tag ...">` |
| **Ma trận khám phá** | `<div class="matrix-grid">` | `.matrix-card` > `.matrix-card-title`, `.matrix-card-desc` |
| **Lưu đồ cơ chế** | `<div class="flow-container">` | `.flow-step-grid` > `.flow-step-card` hoặc `.flow-steps` |
| **Trích dẫn y văn AMA** | `<div class="citation-box">` | Chuẩn định dạng Vancouver/AMA |
| **Hàng nút điều hướng** | `<div class="btn-row">` | `.btn.btn-primary` (Quay lại) + `.btn` (Lên đầu trang) |
