const fs = require('fs');

const filePath = 'd:/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines/2026-byt-u-xo-tu-cung.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix line 693
content = content.replace('&lt;5text{ cm}', '&lt; 5 cm');

// 2. Fix line 755
content = content.replace('>60^circtext{C}', '&gt; 60°C');

// 3. Fix line 761
content = content.replace('>55^circtext{C}', '&gt; 55°C');

// 4. Fix line 762
content = content.replace('&lt; 5text{ cm}', '&lt; 5 cm');

// 5. Fix infobox markdown blockquote artifact at lines 777-781
const oldBlockquote = `<p style="line-height: 1.65;">> [!SUCCESS]
> <strong>Khuyến cáo Xử trí Vô sinh theo Nhóm FIGO</strong>
> • <strong>Nhóm L0, L1, L2:</strong> Phẫu thuật nội soi buồng tử cung cắt u hoặc làm US-HIFU trước khi làm IVF.
> • <strong>Nhóm L3 - L5 (>4text{ cm} hoặc thất bại IVF nhiều lần):</strong> Chỉ định US-HIFU hoặc bóc nhân xơ. US-HIFU có ưu thế vượt trội vì không gây sẹo tử cung, phục hồi sinh sản sớm (sau 3-6 tháng).
> • <strong>Nhóm L6 - L8:</strong> Phẫu thuật bóc u xơ nếu u kích thước lớn.</p>`;

const newInfobox = `<div class="infobox success" style="margin-top: 1rem; margin-bottom: 1.25rem;">
  <span class="infobox-icon">✅</span>
  <div>
    <strong>Khuyến cáo Xử trí Vô sinh theo Nhóm FIGO:</strong>
    <ul style="margin-left: 1.25rem; margin-top: 0.5rem; line-height: 1.6;">
      <li><strong>Nhóm L0, L1, L2:</strong> Phẫu thuật nội soi buồng tử cung cắt u hoặc làm US-HIFU trước khi làm IVF.</li>
      <li><strong>Nhóm L3 – L5 (&gt; 4 cm hoặc thất bại IVF nhiều lần):</strong> Chỉ định US-HIFU hoặc bóc nhân xơ. US-HIFU có ưu thế vượt trội vì không gây sẹo tử cung, phục hồi sinh sản sớm (sau 3–6 tháng).</li>
      <li><strong>Nhóm L6 – L8:</strong> Phẫu thuật bóc u xơ nếu u kích thước lớn.</li>
    </ul>
  </div>
</div>`;

if (content.includes(oldBlockquote)) {
  content = content.replace(oldBlockquote, newInfobox);
  console.log('Successfully replaced infobox blockquote!');
} else {
  console.log('Warning: oldBlockquote pattern not matched exactly. Trying regex...');
  content = content.replace(/<p style="line-height: 1\.65;">\s*>\s*\[!SUCCESS\][\s\S]*?<\/p>/, newInfobox);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Completed fixing 2026-byt-u-xo-tu-cung.html');
