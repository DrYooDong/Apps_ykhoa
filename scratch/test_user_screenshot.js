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

const userText = "Tỷ lệ chẩn đoán lao phổi bằng BAL-CBNAAT đạt 91.75% (89/97) so với tỷ lệ chẩn đoán bằng phương pháp nhuộm soi AFB dịch BAL là 0% (0/97).";

const parsed = parseChartData(userText);
console.log('Parsed Chart Object:', JSON.stringify(parsed, null, 2));

const svg = renderChartSVG(parsed);
console.log('SVG Length:', svg ? svg.length : 0);
console.log('SVG Output:\n', svg);
