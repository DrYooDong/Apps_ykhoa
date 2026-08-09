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

const userTbText = "Tỷ lệ chẩn đoán lao phổi bằng BAL-CBNAAT đạt 91.75% (89/97) so với tỷ lệ chẩn đoán bằng phương pháp nhuộm soi AFB dịch BAL là 0% (0/97).";

// If single donut chart is preferred for the primary 91.75% result
const singleDonutData = {
  type: 'donut-progress',
  label: "Tỷ lệ chẩn đoán lao phổi bằng BAL-CBNAAT",
  pct: 91.75,
  count: 89,
  total: 97
};

console.log('Parsed Donut Chart Data:', parseChartData(userTbText));

const svgOutput = renderChartSVG(singleDonutData);
console.log('Rendered Donut SVG Output:\n', svgOutput);
