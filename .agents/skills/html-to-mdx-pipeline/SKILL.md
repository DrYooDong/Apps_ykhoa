---
name: html-to-mdx-pipeline
description: "Quy trình chuẩn hóa 6 bước chuyển đổi bài viết HTML y khoa cũ sang kiến trúc TypeScript + MDX Native tốc độ cao và chuẩn EBM cho CliniPortal."
category: "Workflow & Engineering"
tags:
  - "mdx"
  - "migration"
  - "workflow"
  - "typescript"
  - "cliniportal"
---

# 🚀 HTML-TO-MDX PIPELINE — WORKFLOW CHUYỂN ĐỔI CHUẨN CLINIPORTAL

> **Mục tiêu**: Hướng dẫn chi tiết quy trình 6 bước chuẩn hóa giúp AI Agent hoặc Developer chuyển đổi hàng loạt bài viết HTML tĩnh cũ sang kiến trúc **TypeScript + MDX Native** nhanh chóng, chính xác, không phát sinh lỗi compile và tuân thủ 100% tiêu chuẩn Y học chứng cứ (EBM).

---

## 🎯 1. Nguyên Tắc Cốt Lõi Khi Chuyển Đổi

1. **MDX Native Không Dùng HTML Shell**:
   - Loại bỏ hoàn toàn thẻ `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, các thẻ `<link rel="stylesheet">` và `<script src="...">`.
   - Toàn bộ metadata được khai báo tập trung trong khối **YAML Frontmatter** ở đầu file MDX.
2. **Tuân Thủ Hệ Thống Type TypeScript**:
   - Frontmatter phải khớp 100% với định nghĩa Type tại `src/content/basic-medical/types/*.types.ts` (`EpidemiologyMdxFrontmatter`, `PhysioMdxFrontmatter`, v.v.).
3. **Tuyệt Đối Tránh Lỗi Parse JSX**:
   - **Ký tự `&` thô**: Không dùng ký tự `&` đơn độc trong JSX props hoặc text (`title="A & B"` $\rightarrow$ Đổi thành `title="A và B"` hoặc `title="A &amp; B"`).
   - **Công thức Toán MathJax**: Luôn bọc trong dấu `$...$` cho inline math hoặc `$$...$$` cho block math.
4. **Clean Code & Dọn Dẹp Sau Chuyển Đổi**:
   - Sau khi tạo xong file `.mdx`, xóa ngay file `.html` cũ cùng thư mục để tránh trùng lặp.
   - Luôn chạy `npm run typecheck` để bảo đảm 0 lỗi TypeScript trước khi kết thúc tác vụ.

---

## 🛠️ 2. Quy Trình 6 Bước Thực Hiện Chi Tiết

```
[BƯỚC 1: QUÉT & KIỂM TRA FILE HTML CẦN CHUYỂN ĐỔI]
  • Dùng run_command quét danh sách file .html trong phân hệ đích.
  • Đọc lướt cấu trúc thẻ <title>, <meta description>, <h1>, các đề mục và điểm ngọc lâm sàng.

[BƯỚC 2: KHAI BÁO YAML FRONTMATTER ĐẦY ĐỦ]
  • Khai báo các trường bắt buộc: title, slug, code, part, system, systemName, guytonChapter, category, status, version, updatedAt, description, tags, clinicalPearls, sections.

[BƯỚC 3: IMPORT CÁC LINH KIỆN JSX CHUYÊN DỤNG]
  • import { PhysioAlert, PhysioQuickNav, PhysioFeedbackLoop } from '../components'
  • Đặt <PhysioQuickNav /> ngay dưới tiêu đề # H1.

[BƯỚC 4: CHUYỂN ĐỔI NỘI DUNG SANG MARKDOWN + JSX]
  • Chuyển các bảng phân loại sang cú pháp GFM Markdown Table chuẩn.
  • Bọc các lưu ý quan trọng vào <PhysioAlert type="pearl|danger|mechanism" title="...">.
  • Định dạng sơ đồ luồng bằng ASCII / Unicode Box-drawing sạch sẽ.

[BƯỚC 5: XÓA BỎ FILE HTML CŨ ĐỒNG BỘ]
  • Xóa toàn bộ file .html đã được chuyển sang .mdx.

[BƯỚC 6: CHẠY KIỂM THỬ TOÀN DIỆN (TYPECHECK)]
  • Chạy npm run typecheck đảm bảo không có lỗi type.
```

---

## 📝 3. Khung Template Chuẩn MDX (Reference Template)

```mdx
---
title: "Tên Bài Giảng Y Khoa Chuẩn Mực"
slug: "sl-ten-bai-viet"
code: "PHYS-SYS-01"
part: "partX"
system: "cardiovascular"
systemName: "Sinh Lý Hệ Tim Mạch"
guytonChapter: "Guyton 14th - Chapter XX: ..."
ganongChapter: "Ganong 26th - Chapter YY: ..."
category: "physiology"
status: "published"
version: "2.0.0"
updatedAt: "2026-08-26"
description: "Mô tả súc tích cơ chế sinh lý học, thụ thể tế bào và ứng dụng lâm sàng điều trị theo y học chứng cứ."
tags:
  - "sinh-ly"
  - "tim-mach"
clinicalPearls:
  - "Điểm ngọc lâm sàng 1..."
  - "Điểm ngọc lâm sàng 2..."
sections:
  - id: "sec-1"
    number: 1
    title: "Cơ Chế Phân Tử & Điện Sinh Lý"
    icon: "fa-dna"
  - id: "sec-2"
    number: 2
    title: "Ứng Dụng Bệnh Học & Dược Lý EBM"
    icon: "fa-stethoscope"
---

import { PhysioAlert, PhysioQuickNav, PhysioFeedbackLoop } from '../components'

# 🫀 TÊN BÀI GIẢNG Y KHOA CHUẨN MỰC

<PhysioQuickNav />

---

## 1. Cơ Chế Phân Tử & Điện Sinh Lý {#sec-1}

Nội dung giải thích chi tiết có công thức Toán/Sinh lý:

$$NFP = (P_{GC} - P_{BS}) - (\pi_{GC} - \pi_{BS})$$

---

## 2. Ứng Dụng Bệnh Học & Dược Lý EBM {#sec-2}

<PhysioAlert type="danger" title="Cạm Bẫy Lâm Sàng & Thuốc Điều Trị">
  Phân tích chi tiết tại đây...
</PhysioAlert>

---

## 3. Tài Liệu Tham Khảo EBM {#sec-3}

1. **Hall, J. E., & Hall, M. E. (2021)**. *Guyton and Hall Textbook of Medical Physiology* (14th ed.). Philadelphia: Elsevier.
```

---

## ⚡ 4. Lệnh Hỗ Trợ Nhanh (Quick CLI Command)

Để tạo nhanh khung bài viết MDX từ một thư mục chứa file HTML:

```bash
# Quét thư mục và tự động chuyển đổi sang MDX
node tools/scripts/migrate-html-to-mdx.js --dir=src/content/basic-medical/physiology/partX --auto-delete

# Kiểm tra tính toàn vẹn typecheck
npm run typecheck
```
