/**
 * tools/qa/fix-katex-guidelines.mjs
 * Tự động chuyển đổi các biểu thức KaTeX / Math inline sang ký tự Unicode hoặc định dạng HTML chuẩn
 * Triệt tiêu 100% vi phạm KaTeX $...$ trong 14 tệp thuộc src/content/ebm/guidelines/kho-guidelines/
 */

import fs from 'fs';
import path from 'path';

const GUIDELINES_DIR = path.resolve('src/content/ebm/guidelines/kho-guidelines');

function fixFiles() {
  console.log('🚀 Bắt đầu thực thi fix KaTeX cho 14 tệp...');

  // 1. 2011-aasld-acute-liver-failure.mdx
  fixSingleFile('2011-aasld-acute-liver-failure.mdx', content => {
    return content.replace(/\$NH_3\$/g, 'NH₃');
  });

  // 2. 2019-easl-dinh-duong-benh-gan-man.mdx
  fixSingleFile('2019-easl-dinh-duong-benh-gan-man.mdx', content => {
    return content.replace(/\$NH_3\$/g, 'NH₃');
  });

  // 3. 2021-aasld-dinh-duong-suy-yeu-teo-co.mdx
  fixSingleFile('2021-aasld-dinh-duong-suy-yeu-teo-co.mdx', content => {
    return content.replace(/\$NH_3\$/g, 'NH₃');
  });

  // 4. 2021-acg-ibs.mdx
  fixSingleFile('2021-acg-ibs.mdx', content => {
    return content.replace(/\(\\\$3,160 so với \\\$5,075 mỗi bệnh nhân\)/g, '(3.160 USD so với 5.075 USD mỗi bệnh nhân)');
  });

  // 5. 2022-aasld-cham-soc-giam-nhe-xo-gan.mdx
  fixSingleFile('2022-aasld-cham-soc-giam-nhe-xo-gan.mdx', content => {
    return content
      .replace(/\$K\^\+\$/g, 'K⁺')
      .replace(/\$Mg\^\{2\+\}\$/g, 'Mg²⁺');
  });

  // 6. 2024-aasld-tang-ap-cua.mdx
  fixSingleFile('2024-aasld-tang-ap-cua.mdx', content => {
    return content
      .replace(/\$\\rightarrow\$/g, '→')
      .replace(/\(\$Q\$\)/g, '(Q)')
      .replace(/\(\$R\$\)/g, '(R)')
      .replace(/\$\\beta_1\s*\+\s*\\beta_2\$/g, 'β₁ + β₂')
      .replace(/\$\\alpha_1\$/g, 'α₁')
      .replace(/\$\\beta_1\$/g, 'β₁')
      .replace(/\$\\beta_2\$/g, 'β₂');
  });

  // 7. 2024-ilep-ascVD-post-acs.mdx: Gỡ bỏ backtick lồng nhau trong dangerouslySetInnerHTML
  fixSingleFile('2024-ilep-ascvd-post-acs.mdx', content => {
    let res = content;
    // Thay thế recs.map và alerts.map không dùng nested backtick
    res = res.replace(
      /\\\${recs\.map\(r => `[\s\S]*?`\)\.join\(''\)}/g,
      `\${recs.map(function(r) { return '<li style="margin-bottom: 0.35rem;">' + r + '</li>'; }).join('')}`
    );
    res = res.replace(
      /\\\${alerts\.map\(a => `[\s\S]*?`\)\.join\(''\)}/g,
      `\${alerts.map(function(a) { return '<li>' + a + '</li>'; }).join('')}`
    );
    return res;
  });

  // 8. 2024-kdigo-ckd.mdx
  fixSingleFile('2024-kdigo-ckd.mdx', content => {
    return content
      .replace(/\$\\text\{CV\}\s*&lt;\s*2\.3\\%\$/g, 'CV &lt; 2.3%')
      .replace(/\(\$\\text\{CV\}\s*&lt;\s*2\.0\\%\$\)/g, '(CV &lt; 2.0%)');
  });

  // 9. 2025-aace-dyslipidemia.mdx: Gỡ bỏ backtick lồng nhau và xử lý ($$$)
  fixSingleFile('2025-aace-dyslipidemia.mdx', content => {
    let res = content;
    res = res.replace(
      /\\\${recs\.map\(r => `[\s\S]*?`\)\.join\(''\)}/g,
      `\${recs.map(function(r) { return '<li style="margin-bottom: 0.35rem;">' + r + '</li>'; }).join('')}`
    );
    res = res.replace(
      /\\\${warnings\.map\(w => `[\s\S]*?`\)\.join\(''\)}/g,
      `\${warnings.map(function(w) { return '<li>' + w + '</li>'; }).join('')}`
    );
    return res;
  });

  // 10. 2025-aasld-nilda.mdx
  fixSingleFile('2025-aasld-nilda.mdx', content => {
    return content.replace(/\(\$r\s*=\s*0\.81\$\)/g, '(hệ số tương quan r = 0,81)');
  });

  // 11. 2026-byt-tom-tat-viem-gan-b.mdx
  fixSingleFile('2026-byt-tom-tat-viem-gan-b.mdx', content => {
    const formulaDiv = `<div class="formula-box" style="background: var(--color-surface-2, #f8fafc); border: 1px solid var(--color-border, #cbd5e1); border-left: 4px solid var(--color-primary, #0284c7); padding: 0.85rem 1.25rem; border-radius: 8px; margin: 0.75rem 0; font-family: monospace; font-size: 0.95rem;">\n  <strong>APRI</strong> = [ (AST / ULN_AST) / Tiểu cầu (10⁹/L) ] × 100 <span style="color: var(--color-text-muted); font-size: 0.85rem;"><em>(Quy ước AST ULN = 40 U/L)</em></span>\n</div>`;
    return content.replace(/\$\\text\{APRI\}[\s\S]*?\*\(Quy ước AST ULN = 40 U\/L\)\.\*/g, formulaDiv);
  });

  // 12. 2026-eta-diet-and-thyroid.mdx
  fixSingleFile('2026-eta-diet-and-thyroid.mdx', content => {
    return content
      .replace(/\(\$I\^-\$\)/g, '(I⁻)')
      .replace(/\(\$I\^0\$\s*hoặc\s*\$I\^\+\$\)/g, '(I⁰ hoặc I⁺)')
      .replace(/\$H_2O_2\$/g, 'H₂O₂')
      .replace(/T4\s*\$\\rightarrow\$\s*T3/g, 'T4 → T3')
      .replace(/\(\$Fe\^\{2\+\}\s*\/\s*Fe\^\{3\+\}\$\)/g, '(Fe²⁺ / Fe³⁺)');
  });

  // 13. 2026-kasl-co-truong-xo-gan.mdx
  fixSingleFile('2026-kasl-co-truong-xo-gan.mdx', content => {
    const saagDiv = `<div style="margin: 0.5rem 0; font-family: monospace; font-weight: 700; color: var(--color-primary, #0284c7); font-size: 1rem;">SAAG = Albumin huyết thanh - Albumin dịch màng bụng (dịch cổ trướng)</div>`;
    return content.replace(/\$\$\s*\\?t?ext\{SAAG\}[\s\S]*?\$\$/g, saagDiv);
  });

  // 14. 2026-ucsf-ssti.mdx
  fixSingleFile('2026-ucsf-ssti.mdx', content => {
    return content.replace(/\$\\?rightarrow\$/g, '→');
  });

  console.log('\n✨ Hoàn tất quét và sửa lỗi KaTeX.');
}

function fixSingleFile(fileName, transformFn) {
  const filePath = path.join(GUIDELINES_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Không tìm thấy tệp: ${fileName}`);
    return;
  }

  const original = fs.readFileSync(filePath, 'utf8');
  let updated = transformFn(original);
  updated = updated.replace(/\r\n/g, '\n');

  if (original !== updated) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`  ✅ [${fileName}] Đã cập nhật thành công.`);
  } else {
    console.log(`  ℹ️ [${fileName}] Không có thay đổi (hoặc đã được sửa trước đó).`);
  }
}

fixFiles();
