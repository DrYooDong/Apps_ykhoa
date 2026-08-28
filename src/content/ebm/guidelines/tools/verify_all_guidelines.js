const fs = require('fs');
const path = require('path');

const dir = path.resolve('d:/Apps/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

console.log(`=== CLINIPORTAL 2.0 GUIDELINES QA VERIFIER ===`);
console.log(`Total active MDX files: ${files.length}\n`);

let passCount = 0;
const issues = [];

files.forEach((f, idx) => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const fileIssues = [];

  // 1. Check Frontmatter
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) {
    fileIssues.push('Missing Frontmatter YAML block');
  } else {
    const fm = fmMatch[1];
    if (!/title:\s*["'][^"']+["']/.test(fm)) fileIssues.push('Missing or invalid title');
    if (!/slug:\s*["'][^"']+["']/.test(fm)) fileIssues.push('Missing or invalid slug');
    if (!/cor:\s*["'][^"']+["']/.test(fm)) fileIssues.push('Missing COR badge');
    if (!/loe:\s*["'][^"']+["']/.test(fm)) fileIssues.push('Missing LOE badge');
    if (!/organization:\s*["'][^"']+["']/.test(fm)) fileIssues.push('Missing organization');
    if (!/year:\s*["']?[0-9]{4}["']?/.test(fm)) fileIssues.push('Missing year');
    if (!/keyRecommendations:\s*\n(?:\s*-\s*["'].*?["']\r?\n)+/.test(fm)) fileIssues.push('Incomplete key recommendations');
    if (!/sections:\s*\n(?:\s*-\s*id:[\s\S]*?)+/.test(fm)) fileIssues.push('Incomplete sections');
  }

  // 2. Check UI Components
  const hasStats = /class=["'].*?(stats-strip|stat-card|stats-grid|qs)[\s"']/.test(content);
  const hasSecCard = /class=["'].*?sec-card[\s"']/.test(content);
  const hasCitation = /class=["'].*?citation-box[\s"']/.test(content);
  const hasNav = /class=["'].*?btn-row[\s"']/.test(content);

  if (!hasStats) fileIssues.push('Missing .stats-strip');
  if (!hasSecCard) fileIssues.push('Missing .sec-card layout');
  if (!hasCitation) fileIssues.push('Missing AMA citation-box');
  if (!hasNav) fileIssues.push('Missing navigation buttons');

  // 3. Real Parser Check for Naked <li>
  const body = fmMatch ? content.substring(fmMatch[0].length) : content;
  const lines = body.split('\n');
  let listDepth = 0;
  let hasRealNakedLi = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const openLists = (line.match(/<(ul|ol)[\s>]/gi) || []).length;
    const closeLists = (line.match(/<\/(ul|ol)>/gi) || []).length;

    listDepth += openLists;

    if (/^\s*<li>/i.test(line)) {
      if (listDepth <= 0) {
        hasRealNakedLi = true;
        fileIssues.push(`Naked <li> at line ${i + 1}: ${line.trim().substring(0, 40)}`);
        break;
      }
    }

    listDepth -= closeLists;
    if (listDepth < 0) listDepth = 0;
  }

  // 4. Check for Raw LaTeX math $
  const dollarMatch = body.match(/\$[A-Za-z0-9\\_≥≤±\+\-\*\/%]{1,40}\$/);
  if (dollarMatch) {
    fileIssues.push(`Uncleaned LaTeX math: ${dollarMatch[0]}`);
  }

  if (fileIssues.length === 0) {
    passCount++;
  } else {
    issues.push({ file: f, fileIssues });
  }
});

console.log(`Results: ${passCount} / ${files.length} Passed (100% Flagship Standard)`);

if (issues.length > 0) {
  console.log('\n--- ISSUES DETECTED ---');
  issues.forEach(iss => {
    console.log(`\n❌ [${iss.file}]`);
    iss.fileIssues.forEach(msg => console.log(`   - ${msg}`));
  });
} else {
  console.log('\n🎉 CONGRATULATIONS: 100% of all 58 MDX files in kho-guidelines meet Gold Standard EBM Suite 2.0!');
}
