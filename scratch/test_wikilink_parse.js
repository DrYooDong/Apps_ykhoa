const catalog = require('../src/content/knowledge-vault/data/vault-catalog.json');

const sampleMarkdown = `
# Thử nghiệm Wikilinks
Đây là bài viết liên kết đến [[Tăng huyết áp]] và [[1.4. Kho dịch tễ học/Tim mạch/DTH_Tăng huyết áp_P1.md|Dịch tễ THA]].
Cũng như [[YTNC_Suy tim_P1.md|Yếu tố nguy cơ Suy tim]] và [[Hội chứng Alagille]].
`;

const wikilinkRegex = /\[\[([^\]|\n]+)(?:\|([^\]\n]+))?\]\]/g;
let match;
console.log('=== TEST WIKILINK MATCHING & RESOLUTION IN CATALOG ===');

while ((match = wikilinkRegex.exec(sampleMarkdown)) !== null) {
  const target = match[1].trim();
  const label = (match[2] || match[1]).trim();
  const cleanTarget = target.replace(/^[./\\]+/, '').trim();
  const baseName = cleanTarget.split('/').pop().replace(/\.md$/, '').trim().toLowerCase();

  const found = catalog.find(a => 
    a.id === target || 
    a.relPath.toLowerCase() === cleanTarget.toLowerCase() ||
    a.relPath.toLowerCase().endsWith(cleanTarget.toLowerCase()) ||
    a.title.toLowerCase() === baseName || 
    (a.aliases || []).some(al => al.toLowerCase() === baseName) ||
    a.fullFileName.toLowerCase().replace(/\.md$/, '') === baseName
  );

  if (found) {
    console.log(`✅ MATCH: "[[${target}|${label}]]" ➔ [${found.khoCode}] ${found.title} (${found.relPath})`);
  } else {
    console.log(`⚠️ FALLBACK: "[[${target}|${label}]]" ➔ Open in Obsidian: obsidian://open?vault=Apps_ykhoa&file=${encodeURIComponent(cleanTarget)}`);
  }
}
