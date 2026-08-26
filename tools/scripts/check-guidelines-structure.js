const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '../../src/content/ebm/guidelines/kho-guidelines');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

console.log('Total HTML guidelines:', files.length);
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const hasPageContent = content.includes('class="page-content"') || content.includes("class='page-content'");
  const hasStatsStrip = content.includes('class="stats-strip"') || content.includes("class='stats-strip'");
  const hasPillars = content.includes('class="pillars"') || content.includes("class='pillars'");
  const secCardDivs = (content.match(/<div[^>]*class=["'][^"']*sec-card/gi) || []).length;
  const secCardSections = (content.match(/<section[^>]*class=["'][^"']*sec-card/gi) || []).length;
  const navTabs = (content.match(/class=["'][^"']*pillar-tab/gi) || []).length;
  console.log(`${f}: pageContent=${hasPageContent}, stats=${hasStatsStrip}, pillars=${hasPillars}, cards=${secCardDivs + secCardSections}, navTabs=${navTabs}`);
}
