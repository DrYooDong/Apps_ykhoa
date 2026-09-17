/**
 * tools/qa/fix-remaining-katex.mjs
 * Khắc phục triệt để 3 tệp cuối cùng còn vi phạm KaTeX / Template String Backtick Lồng Nhau:
 * 1. 2026-ucsf-ssti.mdx (Ký tự mũi tên $...$)
 * 2. 2024-ilep-ascvd-post-acs.mdx (dangerouslySetInnerHTML nested backticks)
 * 3. 2025-aace-dyslipidemia.mdx (dangerouslySetInnerHTML nested backticks)
 */

import fs from 'fs';
import path from 'path';

const GUIDELINES_DIR = path.resolve('src/content/ebm/guidelines/kho-guidelines');

// 1. 2026-ucsf-ssti.mdx
{
  const file = '2026-ucsf-ssti.mdx';
  const filePath = path.join(GUIDELINES_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Thay thế ký tự $ + (CR/gạch chéo/không có) + (r)ightarrow + $
  // Dùng regex linh hoạt bắt mọi biến thể
  const arrowRegex = /\$[\r\n\\]*r?ightarrow\$/g;
  content = content.replace(arrowRegex, '→');
  content = content.replace(/\r\n/g, '\n');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ [${file}] Đã chuẩn hóa toàn bộ mũi tên KaTeX sang "→"`);
}

// 2. 2024-ilep-ascvd-post-acs.mdx
{
  const file = '2024-ilep-ascvd-post-acs.mdx';
  const filePath = path.join(GUIDELINES_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const oldBlock = `    resultDiv.innerHTML = \\\`
      <div style="background: var(--color-surface, #fff); padding: 1.25rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem; border-bottom: 1px solid var(--color-border, #cbd5e1); padding-bottom: 0.5rem;">
          <h5 style="margin: 0; font-size: 1rem; color: var(--color-text);">
            Mục Tiêu LDL-C Mục Tiêu: <span style="color: #dc2626; font-weight: 800;">\\\${targetLDL}</span>
          </h5>
          <span style="font-size: 0.82rem; color: var(--color-text-muted);">ILEP 2024 Upfront Protocol</span>
        </div>
        <div style="margin-bottom: 0.75rem;">
          <strong style="color: #0284c7; font-size: 0.9rem;">Khuyến Cáo Phác Đồ Cá Thể Hóa:</strong>
          <ul style="margin: 0.35rem 0 0 1.25rem; padding: 0; font-size: 0.85rem; line-height: 1.65;">
            \\\${recs.map(r => \\\`<li style="margin-bottom: 0.35rem;">\\\${r}</li>\\\`).join('')}
          </ul>
        </div>
        \\\${alerts.length > 0 ? \\\`
          <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 0.75rem; margin-top: 0.5rem;">
            <strong style="color: #dc2626; font-size: 0.85rem;"><i class="fa-solid fa-triangle-exclamation"></i> Cảnh Báo Lâm Sàng & An Toàn:</strong>
            <ul style="margin: 0.25rem 0 0 1.25rem; padding: 0; font-size: 0.82rem; line-height: 1.55; color: #991b1b;">
              \\\${alerts.map(a => \\\`<li>\\\${a}</li>\\\`).join('')}
            </ul>
          </div>
        \\\` : ''}
      </div>
    \\\`;`;

  const newBlock = `    let recsHtml = recs.map(function(r) { return '<li style="margin-bottom: 0.35rem;">' + r + '</li>'; }).join('');
    let alertsHtml = '';
    if (alerts.length > 0) {
      alertsHtml = '<div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 0.75rem; margin-top: 0.5rem;"><strong style="color: #dc2626; font-size: 0.85rem;"><i class="fa-solid fa-triangle-exclamation"></i> Cảnh Báo Lâm Sàng & An Toàn:</strong><ul style="margin: 0.25rem 0 0 1.25rem; padding: 0; font-size: 0.82rem; line-height: 1.55; color: #991b1b;">' + alerts.map(function(a) { return '<li>' + a + '</li>'; }).join('') + '</ul></div>';
    }

    resultDiv.innerHTML = \\x60
      <div style="background: var(--color-surface, #fff); padding: 1.25rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem; border-bottom: 1px solid var(--color-border, #cbd5e1); padding-bottom: 0.5rem;">
          <h5 style="margin: 0; font-size: 1rem; color: var(--color-text);">
            Mục Tiêu LDL-C Mục Tiêu: <span style="color: #dc2626; font-weight: 800;">\\\${targetLDL}</span>
          </h5>
          <span style="font-size: 0.82rem; color: var(--color-text-muted);">ILEP 2024 Upfront Protocol</span>
        </div>
        <div style="margin-bottom: 0.75rem;">
          <strong style="color: #0284c7; font-size: 0.9rem;">Khuyến Cáo Phác Đồ Cá Thể Hóa:</strong>
          <ul style="margin: 0.35rem 0 0 1.25rem; padding: 0; font-size: 0.85rem; line-height: 1.65;">
            \\\${recsHtml}
          </ul>
        </div>
        \\\${alertsHtml}
      </div>
    \\x60;`;

  if (content.includes(oldBlock)) {
    content = content.replace(oldBlock, newBlock);
    content = content.replace(/\r\n/g, '\n');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ [${file}] Đã tái cấu trúc template string sạch sẽ, không còn nested backtick.`);
  } else {
    // Thử replace phần nhỏ
    console.log(`⚠️ [${file}] oldBlock exact match fail, đang dùng regex thay thế...`);
    content = content.replace(/\\`\s*<div style="background: var\(--color-surface[\s\S]*?\\`;/, match => {
      return `\\x60\n      <div style="background: var(--color-surface, #fff); padding: 1.25rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1);">\n        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem; border-bottom: 1px solid var(--color-border, #cbd5e1); padding-bottom: 0.5rem;">\n          <h5 style="margin: 0; font-size: 1rem; color: var(--color-text);">\n            Mục Tiêu LDL-C Mục Tiêu: <span style="color: #dc2626; font-weight: 800;">\\\${targetLDL}</span>\n          </h5>\n          <span style="font-size: 0.82rem; color: var(--color-text-muted);">ILEP 2024 Upfront Protocol</span>\n        </div>\n        <div style="margin-bottom: 0.75rem;">\n          <strong style="color: #0284c7; font-size: 0.9rem;">Khuyến Cáo Phác Đồ Cá Thể Hóa:</strong>\n          <ul style="margin: 0.35rem 0 0 1.25rem; padding: 0; font-size: 0.85rem; line-height: 1.65;">\n            \\\${recs.map(function(r) { return '<li style="margin-bottom: 0.35rem;">' + r + '</li>'; }).join('')}\n          </ul>\n        </div>\n        \\\${alerts.length > 0 ? '<div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 0.75rem; margin-top: 0.5rem;"><strong style="color: #dc2626; font-size: 0.85rem;"><i class="fa-solid fa-triangle-exclamation"></i> Cảnh Báo Lâm Sàng & An Toàn:</strong><ul style="margin: 0.25rem 0 0 1.25rem; padding: 0; font-size: 0.82rem; line-height: 1.55; color: #991b1b;">' + alerts.map(function(a) { return '<li>' + a + '</li>'; }).join('') + '</ul></div>' : ''}\n      </div>\n    \\x60;`;
    });
    content = content.replace(/\r\n/g, '\n');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ [${file}] Đã xử lý regex.`);
  }
}

// 3. 2025-aace-dyslipidemia.mdx
{
  const file = '2025-aace-dyslipidemia.mdx';
  const filePath = path.join(GUIDELINES_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/\\`\s*<div style="background: var\(--color-surface[\s\S]*?\\`;/, match => {
    return `\\x60\n      <div style="background: var(--color-surface, #fff); padding: 1.25rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1);">\n        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem; border-bottom: 1px solid var(--color-border, #cbd5e1); padding-bottom: 0.5rem;">\n          <h5 style="margin: 0; font-size: 1rem; color: var(--color-text);">\n            Mục tiêu LDL-C Khuyến Cáo: <span style="color: #0284c7; font-weight: 800;">&lt; \\\${targetLDL} mg/dL (1.8 mmol/L)</span>\n          </h5>\n          <span style="font-size: 0.82rem; color: var(--color-text-muted);">AACE 2025 EBM Protocol</span>\n        </div>\n        <div style="margin-bottom: 0.75rem;">\n          <strong style="color: #0284c7; font-size: 0.9rem;">Khuyến Cáo Dược Lý Cụ Thể:</strong>\n          <ul style="margin: 0.35rem 0 0 1.25rem; padding: 0; font-size: 0.85rem; line-height: 1.65;">\n            \\\${recs.map(function(r) { return '<li style="margin-bottom: 0.35rem;">' + r + '</li>'; }).join('')}\n          </ul>\n        </div>\n        \\\${warnings.length > 0 ? '<div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 0.75rem; margin-top: 0.5rem;"><strong style="color: #dc2626; font-size: 0.85rem;"><i class="fa-solid fa-triangle-exclamation"></i> Lưu Ý An Toàn & Cảnh Báo:</strong><ul style="margin: 0.25rem 0 0 1.25rem; padding: 0; font-size: 0.82rem; line-height: 1.55; color: #991b1b;">' + warnings.map(function(w) { return '<li>' + w + '</li>'; }).join('') + '</ul></div>' : ''}\n      </div>\n    \\x60;`;
  });

  content = content.replace(/\r\n/g, '\n');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ [${file}] Đã xử lý regex.`);
}

console.log('🎉 Hoàn tất 3 tệp còn lại!');
