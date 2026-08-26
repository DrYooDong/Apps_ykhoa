---
name: html-to-mdx
description: "Cẩm nang và quy chuẩn kỹ thuật toàn diện chuyển đổi HTML Y khoa tĩnh sang Astro MDX Native, xử lý triệt để 100% lỗi cú pháp JSX, KaTeX Math, lồng thẻ HTML, escape ký tự và tối ưu hóa Content Collections."
category: "Workflow & Engineering"
tags:
  - "mdx"
  - "astro"
  - "migration"
  - "jsx"
  - "content-collections"
  - "cliniportal"
---

# ⚡ HTML-TO-MDX MASTER SKILL — QUY CHUẨN KỸ THUẬT CHUYỂN ĐỔI MDX NATIVE

> **Mục tiêu**: Hướng dẫn chi tiết, toàn diện và thực chiến về quy trình chuyển đổi hàng loạt bài viết HTML tĩnh Y khoa (guidelines, bệnh học, sinh lý, triệu chứng...) sang định dạng **MDX Native của Astro**. Đảm bảo đồng bộ 100% giao diện, không phát sinh lỗi biên dịch JSX/Remark AST, tương thích hoàn hảo Dark Mode và tối ưu hóa tốc độ tải trang.

---

## 🏛️ 1. Kiến Trúc MDX Native Trong CliniPortal

1. **Không Dùng HTML Shell & Inline Scripts**:
   - Loại bỏ hoàn toàn `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, `<script>`, `<style>`, inline event handlers (`onclick`, `onchange`).
   - Toàn bộ metadata được định nghĩa tập trung trong khối **YAML Frontmatter**.
2. **Đồng Bộ Schema Content Collections (`src/content.config.ts`)**:
   - Mọi trường khai báo trong frontmatter (`title`, `slug`, `code`, `organization`, `year`, `sections`, `keyRecommendations`, `tags`...) phải được định nghĩa kiểu dữ liệu chặt chẽ qua Zod schema.
3. **Khai Thác Layout & Mục Lục Tự Động (TOC)**:
   - Các bài viết MDX được bọc bởi `ArticleLayout.astro` hoặc layout tương ứng, tự động đọc mảng `sections: [{ id, number, title, icon }]` từ frontmatter để render Sidebar Table of Contents và Sticky Bar.

---

## 🛑 2. Bộ 10 Quy Tắc Vàng Vệ Sinh Cú Pháp JSX/MDX (The 10 Golden AST Rules)

Trong quá trình Astro MDX compiler (`@mdx-js/mdx` + `remark` + `rehype`) phân tích mã nguồn, bất kỳ sai lệch nào về chuẩn XML hoặc xung đột Markdown/JSX đều sẽ làm sập quá trình build. Dưới đây là 10 quy tắc bất di bất dịch đã được chuẩn hóa:

### 1. Tự đóng tất cả Void Elements (Self-closing Tags)

HTML cho phép thẻ mở đơn lẻ, nhưng JSX/MDX **bắt buộc phải có dấu gạch chéo tự đóng `/>`**:

- ❌ **Lỗi**: `<img src="..." alt="...">`, `<br>`, `<hr>`, `<input type="text">`, `<col width="30%">`
- ✅ **Chuẩn**: `<img src="..." alt="..." />`, `<br />`, `<hr />`, `<input type="text" />`, `<col width="30%" />`

### 2. Escape ký tự so sánh toán học & lâm sàng (`<` và `>`)

Ký tự `<` khi đi kèm chữ số, khoảng trắng hoặc tên không phải thẻ HTML sẽ bị JSX hiểu nhầm là thẻ đóng/mở bị lỗi:

- ❌ **Lỗi**: `HbA1c < 7%`, `Tuổi < 65`, `eGFR < 30 mL/phút`, `Bilirubin > 3 mg/dL`
- ✅ **Chuẩn**: `HbA1c &lt; 7%`, `Tuổi &lt; 65`, `eGFR &lt; 30 mL/phút`, `Bilirubin &gt; 3 mg/dL`
- ⚙️ **Quy tắc Regex**: Mọi dấu `<` không thuộc danh sách thẻ HTML/SVG hợp lệ (`a`, `div`, `span`, `table`, `ul`, `path`,...) đều phải được thay bằng `&lt;`.

### 3. Escape dấu ngoặc nhọn `{` và `}` ngoài JSX Props

Trong MDX, cặp ngoặc `{}` được trình thông dịch JavaScript coi là **JSX Expression**. Nếu gặp nội dung như `<code>\le 100\text{ mmHg}</code>` hay `{GCS < 15}`, JavaScript sẽ tìm biến `mmHg` hoặc `GCS` và gây lỗi `ReferenceError: ... is not defined`.

- ❌ **Lỗi**: `\text{ mmHg}`, `\text{ mL/kg}`, `Tỷ lệ {đạt mục tiêu}`
- ✅ **Chuẩn**: `&#123; mmHg&#125;`, `&#123; mL/kg&#125;`, `Tỷ lệ &#123;đạt mục tiêu&#125;`
- ⚙️ **Quy tắc**: Escape `{` thành `&#123;` và `}` thành `&#125;` ở toàn bộ văn bản text ngoài thẻ.

### 4. Chuẩn hóa KaTeX Math & Ký tự `$` Y khoa

Tránh để plugin `remark-math` parse nhầm các ký tự tiền tệ `$200` hoặc ghi chú Obsidian `$BMI \ge 25$` thành công thức KaTeX không hỗ trợ tiếng Việt:

- ❌ **Lỗi**: `$BMI \ge 25$`, `Chi phí $500`, `$HBsAg (+)$`
- ✅ **Chuẩn**: `BMI ≥ 25`, `Chi phí &#36;500`, `HBsAg (+)`
- ⚙️ **Ký hiệu Unicode chuẩn**: Sử dụng trực tiếp `≥`, `≤`, `±`, `×`, `→`, `µ`, `α`, `β`, `Δ`.

### 5. Escape ký tự `&` trần (Unescaped Ampersands)

- ❌ **Lỗi**: `title="A & B"`, `<p>Gan & Mật</p>`
- ✅ **Chuẩn**: `title="A &amp; B"` hoặc `title="A và B"`, `<p>Gan &amp; Mật</p>`

### 6. Làm phẳng dòng trong thẻ List (`<li>`), Table (`<td>`, `<th>`) và Paragraph (`<p>`)

Khi một thẻ `<li>`, `<td>`, `<p>` chứa văn bản nhiều dòng bắt đầu bằng dấu gạch ngang `-` hoặc chấm tròn `•`, Remark AST sẽ ngắt đoạn thành một Markdown list/paragraph mới lồng bên trong thẻ HTML, dẫn đến lỗi:
`Expected a closing tag for <li> before the end of paragraph`.

- ❌ **Lỗi**:

  ```html
  <li><strong>Chỉ định:</strong>
    - Bệnh nhân nặng
    - Suy hô hấp
  </li>
  ```

- ✅ **Chuẩn**:

  ```html
  <li><strong>Chỉ định:</strong> <br />&bull; Bệnh nhân nặng <br />&bull; Suy hô hấp</li>
  ```

### 7. Xử lý danh sách lồng nhau (Nested Lists)

Tránh lồng trực tiếp `<ul>` nhiều cấp có khoảng thụt lề 4+ spaces bên trong `<li>` vì sẽ kích hoạt Markdown Indented Code Block:

- ❌ **Lỗi**:

  ```html
  <li><strong>Nhóm 1:</strong>
      <ul>
          <li>Mục a</li>
      </ul>
  </li>
  ```

- ✅ **Chuẩn**:

  ```html
  <li><strong>Nhóm 1:</strong> <span class="sub-list"><span class="sub-item">• Mục a</span></span></li>
  ```

### 8. Loại bỏ xuống dòng trong thẻ mở HTML (Multi-line Opening Tags)

Các thuộc tính thẻ bị xuống dòng ở giữa (ví dụ `<i\n class="...">` hoặc `<div\n id="...">`) khiến JSX tokenizer parse sai:

- ❌ **Lỗi**: `<i\n class="fa-solid fa-arrow-down"></i>`
- ✅ **Chuẩn**: `<i class="fa-solid fa-arrow-down"></i>`

### 9. Xử lý Sơ đồ ASCII / Flowchart bên trong `<pre>`

Văn bản vẽ sơ đồ dạng Text/ASCII chứa nhiều ký tự gạch chéo `\`, ngoặc `{}` hoặc khoảng trắng phải được bọc an toàn trong JSX Template Literal:

- ❌ **Lỗi**: `<pre class="flowchart">│ └───┬───┘ ▼</pre>`
- ✅ **Chuẩn**: `<pre class="flowchart">{`│ └───┬───┘ ▼`}</pre>`

### 10. Tự động cân bằng và đóng thẻ vùng chứa (Tag Balancing)

Đảm bảo tất cả các thẻ vùng chứa `<div>`, `<section>`, `<article>`, `<pre>`, `<table>`, `<tbody>`, `<ul>`, `<ol>` đều có thẻ đóng tương ứng ở cuối file.

---

## 🔄 3. Quy Trình Chuyển Đổi 5 Bước Chuẩn (5-Step Pipeline)

```
[BƯỚC 1: QUÉT & TRÍCH XUẤT METADATA + TOC]
  ├── Đọc file HTML nguồn.
  ├── Trích xuất <title>, <meta description>, Tổ chức (BYT, AHA, ESC...), Năm ban hành.
  └── Quét cấu trúc <div class="sec-card" id="..."> hoặc .pillars-nav để tạo mảng sections: [].

[BƯỚC 2: CẮT LỌC NỘI DUNG CHÍNH (MAIN BODY EXTRACTION)]
  ├── Tìm điểm bắt đầu (.stats-strip, .pillars, hoặc .page-content).
  └── Cắt đến trước <footer, <script hoặc </body>.

[BƯỚC 3: CHẠY BỘ LỌC AST SANITIZATION ENGINE]
  ├── Áp dụng toàn bộ 10 Quy Tắc Vàng ở Mục 2.
  └── Ghép Frontmatter YAML hoàn chỉnh lên đầu file .mdx.

[BƯỚC 4: KIỂM THỬ BIÊN DỊCH MDX TẠI CHỖ (ON-THE-FLY TEST)]
  └── Dùng thư viện @mdx-js/mdx compile(content, { jsx: true }) để bắt lỗi cú pháp tức thì.

[BƯỚC 5: KIỂM THỬ HỆ THỐNG (BUILD & TYPECHECK)]
  ├── Chạy `npm run typecheck` (tsc --noEmit) đảm bảo 0 lỗi kiểu dữ liệu.
  └── Chạy `npm run astro:build` kiểm tra render static HTML thành công 100%.
```

---

## 💻 4. Mã Nguồn Script Mẫu Chuyển Đổi Tự Động (Production-Ready Node.js)

Dưới đây là module chuyển đổi chuẩn có thể tái sử dụng cho bất kỳ thư mục nào trong dự án:

```javascript
/**
 * @file convert-html-to-mdx-engine.js
 * @description Master AST Sanitization & Conversion Engine for CliniPortal HTML -> MDX
 */

const fs = require('fs');
const path = require('path');
const { compile } = require('@mdx-js/mdx');

const VALID_HTML_TAGS = new Set([
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo',
  'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup',
  'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed',
  'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label',
  'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object',
  'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp',
  'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span',
  'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template',
  'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',
  // SVG Elements
  'circle', 'ellipse', 'line', 'path', 'polygon', 'polyline', 'rect', 'text', 'tspan', 'g',
  'defs', 'use', 'symbol', 'clipPath', 'linearGradient', 'radialGradient', 'stop', 'foreignObject'
]);

function sanitizeMdxContent(rawHtml) {
  let content = rawHtml;

  // 1. Loại bỏ comments, script, style
  content = content.replace(/<!--[\s\S]*?-->/g, '');
  content = content.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<script[^>]*>/gi, '').replace(/<\/script>/gi, '');
  content = content.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<style[^>]*>/gi, '').replace(/<\/style>/gi, '');
  content = content.replace(/\s+on[a-z]+="[^"]*"/gi, '').replace(/\s+on[a-z]+='[^']*'/gi, '');

  // 2. Tự đóng thẻ void elements
  content = content.replace(/<(img|br|hr|input|source|col)\b([^>]*?)(\/?)>/gi, (m, tag, attrs, slash) => slash === '/' ? m : `<${tag}${attrs} />`);

  // 3. Chuẩn hóa toán học LaTeX & escape $
  content = content.replace(/\\text\{\s*([^}]+)\s*\}/g, '$1')
                   .replace(/\\le\s*/g, '≤ ').replace(/\\ge\s*/g, '≥ ')
                   .replace(/\\rightarrow/g, '→').replace(/\\pm\s*/g, '± ')
                   .replace(/\\times/g, '×').replace(/\\mu/g, 'µ')
                   .replace(/\\alpha/g, 'α').replace(/\\beta/g, 'β')
                   .replace(/\$/g, '&#36;');

  // 4. Escape dấu so sánh < không phải thẻ HTML
  content = content.replace(/<(\/?[a-zA-Z0-9\-_]+)?/g, (match, tag) => {
    if (!tag) return '&lt;';
    const clean = tag.replace(/^\//, '').toLowerCase();
    return VALID_HTML_TAGS.has(clean) ? match : `&lt;${tag}`;
  });

  // 5. Escape dấu & trần
  content = content.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');

  // 6. Xử lý xuống dòng trong thẻ mở HTML
  content = content.replace(/<([a-zA-Z0-9\-]+)\s*\n\s*([^>]*?)>/gi, '<$1 $2>');

  // 7. Escape dấu * ghi chú đơn lẻ
  content = content.replace(/(\)|\]|\d)\*(<\/[a-zA-Z0-9]+>)/g, '$1&#42;$2');

  // 8. Escape dấu ngoặc nhọn { và } ngoài thẻ
  let inTag = false, res = '';
  for (let i = 0; i < content.length; i++) {
    const c = content[i];
    if (c === '<') inTag = true;
    else if (c === '>') inTag = false;
    if (!inTag && c === '{') res += '&#123;';
    else if (!inTag && c === '}') res += '&#125;';
    else res += c;
  }
  content = res;

  // 9. Làm phẳng các thẻ leaf (li, td, th, p)
  content = content.replace(/<li\b([^>]*)>([\s\S]*?)<\/li>/gi, (m, a, inner) => `<li${a}>${inner.replace(/\n\s*([•\-])\s+/g, ' <br />&bull; ').replace(/\n\s*/g, ' ').trim()}</li>`);
  content = content.replace(/<td\b([^>]*)>([\s\S]*?)<\/td>/gi, (m, a, inner) => `<td${a}>${inner.replace(/\n\s*/g, ' ').trim()}</td>`);
  content = content.replace(/<th\b([^>]*)>([\s\S]*?)<\/th>/gi, (m, a, inner) => `<th${a}>${inner.replace(/\n\s*/g, ' ').trim()}</th>`);
  content = content.replace(/(<p\b[^>]*>)([\s\S]*?)(<\/p>)/gi, (m, o, inner, c) => o + inner.replace(/\s+/g, ' ').trim() + c);

  // 10. Chuyển đổi ASCII Pre sang JSX Literal
  content = content.replace(/<pre\b([^>]*)>([\s\S]*?)<\/pre>/gi, (m, a, inner) => {
    const t = inner.replace(/<[^>]+>/g, '').replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '&#36;');
    return `<pre${a}>{\`${t}\`}</pre>`;
  });

  // 11. Cân bằng thẻ container
  const tags = ['div', 'section', 'article', 'pre', 'table', 'tbody', 'ul', 'ol'];
  for (const t of tags) {
    const o = (content.match(new RegExp(`<${t}\\b`, 'gi')) || []).length;
    const c = (content.match(new RegExp(`</${t}>`, 'gi')) || []).length;
    for (let i = 0; i < o - c; i++) content += `\n</${t}>`;
  }

  return content;
}
```

---

## 🛠️ 5. Bảng Tra Cứu Sự Cố & Khắc Phục Nhanh (Troubleshooting Matrix)

| Triệu chứng Lỗi Build | Nguyên nhân Cốt lõi | Cách Xử lý Chuẩn |
| :--- | :--- | :--- |
| `Expected a closing tag for <li> before the end of paragraph` | Có dấu `-` hoặc `•` xuống dòng bên trong `<li>`, hoặc lồng `<ul>` có thụt lề 4+ spaces. | Làm phẳng dòng trong `<li>` hoặc thay `\n•` thành `<br />&bull;`. |
| `Unexpected character '4' before name` | Dấu so sánh `<40%`, `<2.5` trong text hoặc description bị hiểu là thẻ JSX. | Thay tất cả `<(?![a-zA-Z\/])` thành `&lt;`. |
| `ReferenceError: XYZ is not defined` | Ký tự `{XYZ}` bên trong văn bản bị JSX evaluate thành biến JS. | Escape `{` thành `&#123;` và `}` thành `&#125;`. |
| `Expected corresponding closing tag for <div>` | Thẻ `<main class="page-content">` không có thẻ đóng `</main>` hoặc bị thiếu `</div>`. | Dùng hàm `balanceTags()` tự động bổ sung thẻ đóng. |
| `Unrecognized Unicode character ... in KaTeX` | Dấu `$` tiền tệ hoặc công thức LaTeX có chứa chữ tiếng Việt (`$HBsAg (+)$`). | Chuyển sang ký tự Unicode (`≥`, `≤`, `±`, `→`) hoặc escape `&#36;`. |

---

## ✅ 6. Checklist Nghiệm Thu Sau Chuyển Đổi

- [ ] File `.mdx` có đầy đủ Frontmatter (khớp 100% Zod schema trong `src/content.config.ts`).
- [ ] Mảng `sections` có đầy đủ `id`, `number`, `title`, `icon` cho Mục lục TOC.
- [ ] Đã loại bỏ hoàn toàn các thẻ HTML shell, style inline và script tag cũ.
- [ ] Đã kiểm thử On-The-Fly qua `@mdx-js/mdx` không có cảnh báo JSX.
- [ ] `npm run typecheck` (`tsc --noEmit`) đạt **0 lỗi**.
- [ ] `npm run astro:build` build tĩnh toàn bộ site thành công **100%**.
