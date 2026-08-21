const fs = require('fs');
const path = require('path');

console.log('=== TEST CLINICAL PATHWAY MATRIX & MEDICAL READER PRO ===\n');

// 1. Check Catalog Loading
const catalog = JSON.parse(fs.readFileSync('d:/Apps_ykhoa/src/content/knowledge-vault/data/vault-catalog.json', 'utf8'));
console.log(`✅ Loaded Catalog with ${catalog.length} articles.`);

// 2. Test Pathway Matrix Linking for common diseases
const testConditions = ['Bỏng', 'Hội chứng vành cấp', 'COPD', 'Tăng huyết áp', 'Tổn thương thận cấp'];

testConditions.forEach(cond => {
  const normTitle = cond.toLowerCase().trim();
  const matched = catalog.filter(art => {
    const artTitle = art.title.toLowerCase().trim();
    return artTitle === normTitle || 
      (normTitle.length > 4 && artTitle.includes(normTitle)) || 
      (artTitle.length > 4 && normTitle.includes(artTitle));
  });

  const facets = {};
  matched.forEach(m => {
    facets[m.khoCode] = m.title;
  });

  console.log(`\n📌 Condition: "${cond}" -> Found ${matched.length} linked facets:`);
  console.log(JSON.stringify(facets, null, 2));
});

// 3. Test Markdown TOC Parsing on a real file
const sampleFile = 'd:/Apps_ykhoa/knowledge-vault/1.3. Kho sinh lý bệnh/Tim mạch/SLB_Hội chứng vành cấp_P1.md';
if (fs.existsSync(sampleFile)) {
  const content = fs.readFileSync(sampleFile, 'utf8');
  const headings = [];
  const lines = content.split('\n');
  lines.forEach(l => {
    if (l.startsWith('## ') || l.startsWith('### ')) {
      headings.push(l.trim());
    }
  });
  console.log(`\n✅ TOC Parsing Test on "SLB_Hội chứng vành cấp_P1.md": Found ${headings.length} headings.`);
  headings.slice(0, 5).forEach(h => console.log('   - ' + h));
}
