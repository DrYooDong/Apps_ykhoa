const fs = require('fs');
const catalog = JSON.parse(fs.readFileSync('d:/Apps_ykhoa/src/content/knowledge-vault/data/vault-catalog.json', 'utf8'));

const testQueries = ['Aspirin', 'Paracetamol', 'Troponin', 'Creatinine', 'DASH', 'Bệnh phổi mô kẽ', 'Tim', 'Insulin'];

console.log('=== TEST PHASE 3 SEARCH ENRICHMENT ===\n');

testQueries.forEach(q => {
  const lowerQ = q.toLowerCase();
  const matches = catalog.filter(art => {
    const titleMatch = art.title.toLowerCase().includes(lowerQ);
    const aliasMatch = (art.aliases || []).some(a => a.toLowerCase().includes(lowerQ));
    const keywordMatch = (art.keywords || []).some(k => k.toLowerCase().includes(lowerQ));
    const icdMatch = (art.icd10 || []).some(c => c.toLowerCase().includes(lowerQ));
    const snippetMatch = (art.snippet || '').toLowerCase().includes(lowerQ);
    return titleMatch || aliasMatch || keywordMatch || icdMatch || snippetMatch;
  });

  console.log(`Query: "${q}" -> Tìm thấy ${matches.length} bài viết.`);
  if (matches.length > 0) {
    console.log(`   👉 Top hit: [${matches[0].khoName}] ${matches[0].title}`);
  }
});
