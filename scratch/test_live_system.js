const fs = require('fs');

global.window = { innerWidth: 1024, addEventListener: () => {} };
global.document = { querySelectorAll: () => [], getElementById: () => null, addEventListener: () => {} };

let jsCode = fs.readFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/guidelines.js', 'utf8');

const parseChartData = new Function('keyResults', `
  ${jsCode}
  return parseChartData(keyResults);
`);

const renderChartSVG = new Function('chartData', `
  ${jsCode}
  return renderChartSVG(chartData);
`);

const testCases = [
  "91% (63/69)",
  "Tỷ lệ khỏi bệnh 91% (63/69)",
  "Can thiệp 3.7% vs Placebo 5.9%",
  "NNT = 19 trong 3.5 năm",
  "COL: Nhóm A: 12% | Nhóm B: 28%",
  "HBAR: MACE: 4.5% | Tử vong: 2.1%",
  "HR 0.74 (95% CI 0.58-0.94)"
];

testCases.forEach((tc, idx) => {
  const parsed = parseChartData(tc);
  const svg = renderChartSVG(parsed);
  console.log(`\n--- Test Case ${idx + 1}: "${tc}" ---`);
  console.log(`Chart Type:`, parsed ? parsed.type : 'NULL');
  console.log(`Generated SVG Length:`, svg ? svg.length : 0);
  console.log(`SVG Valid:`, svg && svg.includes('<svg') && svg.includes('</svg>'));
});
