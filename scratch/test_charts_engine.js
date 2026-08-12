// Test guideline-charts-engine.js
const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '../src/content/ebm/guidelines/js/guideline-charts-engine.js'), 'utf8');

// Global window mock
global.window = {};

eval(code);

console.log('Test 1 - Single Forest Plot:');
console.log(window.renderStudyMiniChart({ keyResults: 'HR 0.75 (95% CI 0.65-0.86, p<0.001)' }));

console.log('\nTest 2 - Column Chart:');
console.log(window.renderStudyMiniChart({ keyResults: 'COL: Can thiệp: 3.7% | Giả dược: 5.9%' }));

console.log('\nTest 3 - Horizontal Bar:');
console.log(window.renderStudyMiniChart({ keyResults: 'HBAR: Đột quỵ: 1.2% | Suy tim: 2.7%' }));

console.log('\nTest 4 - Subgroups JSON:');
console.log(window.renderStudyMiniChart({
  keyResults: 'HR 0.86 (95% CI 0.74-0.99)',
  subgroups: {
    "Châu Á": "HR 0.82 (95% CI 0.64-1.04)",
    "Suy tim": "HR 0.65 (95% CI 0.50-0.85)"
  }
}));

console.log('\n✅ Mini-chart engine evaluation PASSED!');
