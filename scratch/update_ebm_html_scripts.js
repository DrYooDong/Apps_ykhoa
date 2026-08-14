const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

const baseDir = 'd:\\Apps_ykhoa\\src\\content\\ebm';
const htmlFiles = walk(baseDir).filter(f => f.endsWith('.html'));

const jsFiles = [
  'ebm-lab.js', 'ebm-outcome-card.js', 'forest-plot.js', 'funnel-plot.js', 'kaplan-meier.js', 'roc-curve.js',
  'radar.js', 'quiz.js', 'predatory-blacklist.js', 'guidelines.js', 'guidelinesdata.js', 'drug-linker.js',
  'guideline-cdss.js', 'guideline-charts-engine.js', 'guideline-cmd-palette.js', 'guideline-compare-matrix.js',
  'guideline-evidence-analytics.js', 'guideline-journal-badge.js', 'guideline-modals.js', 'guideline-sync.js',
  'guideline-table.js', 'guideline-tools.js', 'guideline-visualizations.js', 'guidelines-dashboard.js',
  'journal-quality-analyzer.js', 'journal-trust-scorer.js', 'openalex-service.js', 'ebm-bedside-copilot.js',
  'ebm-bookmarks.js', 'ebm-format-loader.js', 'ebm-onboarding.js', 'ebm-premium-system.js',
  'ebm-recommendation-engine.js', 'pubmed-gemini-service.js', 'yhcc-hub.js'
];

let updatedCount = 0;

htmlFiles.forEach(hf => {
  let content = fs.readFileSync(hf, 'utf8');
  let changed = false;

  jsFiles.forEach(jf => {
    const baseName = jf.replace('.js', '');
    const regex = new RegExp(`(<script[^>]*src=["'][^"']*?)` + baseName + `\\.js(["'][^>]*>\\s*<\\/script>)`, 'gi');
    if (regex.test(content)) {
      content = content.replace(regex, (match, p1, p2) => {
        let tag = p1 + baseName + '.ts' + p2;
        if (!tag.includes('type="module"')) {
          tag = tag.replace('<script', '<script type="module"');
        }
        return tag;
      });
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(hf, content, 'utf8');
    updatedCount++;
  }
});

console.log(`Updated ${updatedCount} HTML files in src/content/ebm.`);
