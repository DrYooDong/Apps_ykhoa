# 📐 APPROACH MDX DESIGN SPEC — Quy Chuẩn Thiết Kế Bài Học "Tiếp Cận" (CliniPortal 2.0)

> **Phạm vi áp dụng**: Toàn bộ file `.mdx` thuộc `src/content/basic-medical/approach/ck01-*/` đến `ck13-*/`.  
> **Tiêu chuẩn y khoa**: Evidence-Based Medicine (EBM 2026) — Red Flags First, Chẩn đoán phân biệt phân tầng, Lưu đồ quyết định Pure Editorial SVG.

---

## 1. Quy Ước Đặt Tên File & Đường Dẫn

- **Thư mục chuyên khoa**: `ck<01..13>-<slug>/` (ví dụ: `ck04-tim-mach/`, `ck07-than-dien-giai/`, `ck13-nhi-khoa/`).
- **Tên file MDX**: `tc-<ck>-<stt>-<slug>.mdx` (ví dụ: `tc-04-01-dau-nguc.mdx`).
- **Mã bài học (`code`)**: `TC-<MÃ CK>-<STT>` (ví dụ: `TC-TM-01`, `TC-TDG-09`, `TC-NK-01`).
- **Route SPA**: `#/basic-medical/tiep-can/<specialtyKey>/<slug>` (alias: `#/basic-medical/approach/<specialtyKey>/<slug>`).

---

## 2. Frontmatter YAML Chuẩn Bắt Buộc

```yaml
---
title: "Tiếp Cận Đau Ngực Cấp (Acute Chest Pain) & 6 Sát Thủ Đe Dọa Tính Mạng"
slug: "tc-04-01-dau-nguc"
code: "TC-TM-01"
specialty: "ck04-tim-mach"
specialtyLabel: "CK04: Tim Mạch"
specialtyNumber: 4
lessonNumber: 1
order: 1
urgency: "emergent" # emergent | urgent | routine
status: "published" # published | draft
version: "2.0.0"
updatedAt: "2026-11-21"
estimatedTime: 25
description: "Mô tả ngắn súc tích 1–2 câu chuẩn lâm sàng."
tags:
  - "Tim mạch"
  - "Cấp cứu"
  - "Đau ngực"
icd10:
  - "R07.9"
clinicalPearls:
  - "Pearl 1 cô đọng, hành động được tại giường bệnh."
sections:
  - id: "sec-1"
    number: 1
    title: "Định Nghĩa & Phân Loại"
    icon: "fa-book-medical"
  - id: "sec-2"
    number: 2
    title: "Cơ Chế Sinh Lý Bệnh"
    icon: "fa-dna"
  - id: "sec-3"
    number: 3
    title: "Dấu Hiệu Báo Động (Red Flags) & Phân Tầng"
    icon: "fa-triangle-exclamation"
  - id: "sec-4"
    number: 4
    title: "Khai Thác Bệnh Sử & Khám Định Hướng"
    icon: "fa-user-doctor"
  - id: "sec-5"
    number: 5
    title: "Chẩn Đoán Phân Biệt"
    icon: "fa-list-check"
  - id: "sec-6"
    number: 6
    title: "Cận Lâm Sàng Theo Bậc"
    icon: "fa-vial"
  - id: "sec-7"
    number: 7
    title: "Lưu Đồ Tiếp Cận"
    icon: "fa-diagram-project"
  - id: "sec-8"
    number: 8
    title: "Xử Trí Ban Đầu & Chuyển Tuyến"
    icon: "fa-truck-medical"
  - id: "sec-9"
    number: 9
    title: "Ca Minh Họa, Pearls & Trích Dẫn"
    icon: "fa-gem"
---
```

---

## 3. Khung Nội Dung 9 Mục Chuẩn (Golden 9-Section Skeleton)

1. **Header + Badges + `<ApproachQuickNav />` + `<section class="stats-strip">`** (4 chỉ số định lượng then chốt).
2. **`## 1. Định Nghĩa & Phân Loại <span id="sec-1"></span>`**: Định nghĩa lâm sàng, ngưỡng chẩn đoán, phân loại theo thời gian/nguy cơ/cơ chế.
3. **`## 2. Cơ Chế Sinh Lý Bệnh <span id="sec-2"></span>`**: Kết nối trực tiếp cơ chế phân tử/sinh lý với triệu chứng; gắn liên kết chéo sang Sinh lý (`#/basic-medical/giai-phau-sinh-ly`) hoặc CCBS (`#/basic-medical/co-che-benh-sinh`).
4. **`## 3. Dấu Hiệu Báo Động (Red Flags) & Phân Tầng <span id="sec-3"></span>`**: Đặt **Red Flags** rõ ràng trong `<div class="infobox danger">`, phân tầng khẩn cấp dùng `<UrgencyPill level="emergent|urgent|routine" />`.
5. **`## 4. Khai Thác Bệnh Sử & Khám Định Hướng <span id="sec-4"></span>`**: Cấu trúc SOCRATES / OPQRST / SAMPLE, tiền căn thuốc, yếu tố dịch tễ và khám định hướng theo hệ cơ quan.
6. **`## 5. Chẩn Đoán Phân Biệt <span id="sec-5"></span>`**: Bảng `.table-modern` đối sánh 2 tầng: (a) Nhóm không được bỏ sót (Must-Not-Miss), (b) Nhóm nguyên nhân thường gặp.
7. **`## 6. Cận Lâm Sàng Theo Bậc <span id="sec-6"></span>`**: Bảng phân bậc First-line (Tại giường/Cấp cứu) → Second-line (Định hướng chuyên sâu) → Third-line (Tiêu chuẩn vàng/Xâm lấn).
8. **`## 7. Lưu Đồ Tiếp Cận <span id="sec-7"></span>`**: Bắt buộc vẽ **Pure Editorial SVG** trong `<div class="flowchart-card">`, đường nối trực giao, dùng CSS tokens (`var(--color-surface)`, `var(--color-text)`, `var(--color-border)`), không dùng thẻ HTML trong `<text>` SVG, tương thích 100% Dark Mode.
9. **`## 8. Xử Trí Ban Đầu & Chuyển Tuyến <span id="sec-8"></span>`**: Ổn định ABCDE, xử trí cứu mạng trước khi có chẩn đoán xác định, chống sai lệch nhận thức (Cognitive Biases) và tiêu chuẩn nhập ICU/chuyển tuyến.
10. **`## 9. Ca Minh Họa, Pearls & Trích Dẫn <span id="sec-9"></span>`**: 1 ca lâm sàng ngắn ứng dụng thuật toán + Pearls/Flashcards + `<div class="citation-box">` theo chuẩn AMA + liên kết sang Sổ tay Lâm sàng / Kháng sinh.

---

## 4. Linh Kiện MDX Riêng Của Phân Hệ

| Linh kiện | Cú pháp trong MDX | Công dụng |
|---|---|---|
| `<ApproachQuickNav />` | Tự đóng ngay sau badge group | Thanh mục lục bám dính đọc mảng `sections` |
| `<UrgencyPill />` | `<UrgencyPill level="emergent" />` (`emergent` \| `urgent` \| `routine`) | Huy hiệu phân tầng khẩn cấp, dùng an toàn trong cả văn bản và bảng Markdown |

---

## 5. Quy Tắc An Toàn Cú Pháp & Dark Mode

- **Escape ký tự JSX**: Trong khối HTML raw (`<div>`, `<td>`, `<svg>`), thay `<` thành `&lt;`, `>` thành `&gt;`, `&` thành `&amp;`.
- **KaTeX**: Công thức khối dùng `$$ ... $$` riêng dòng; công thức nội tuyến dùng `$ ... $`; bọc chữ có dấu trong `\text{...}` hoặc dùng ký tự Unicode (`≥`, `≤`, `±`, `→`, `Δ`).
- **Dark Mode**: Nền SVG và khung box dùng `var(--color-surface, #ffffff)`, chữ dùng `var(--color-text, #0f172a)` và `var(--color-text-muted, #64748b)`, viền dùng `var(--color-border, #e2e8f0)`.
- **Loại bỏ Wikilinks Obsidian**: Khi chuyển từ `knowledge-vault/*.md`, xóa hoàn toàn `[[...]]` và `==...==` (chuyển sang văn bản sạch hoặc `**in đậm**`).
