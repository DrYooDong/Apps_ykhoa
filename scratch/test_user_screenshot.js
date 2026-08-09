const fs = require('fs');

global.window = { innerWidth: 1024, addEventListener: () => {} };
global.document = { querySelectorAll: () => [], getElementById: () => null, addEventListener: () => {} };

let jsCode = fs.readFileSync('src/content/ebm/guidelines/guidelines.js', 'utf8');

const parseChartData = new Function('keyResults', `
  ${jsCode}
  return parseChartData(keyResults);
`);

const renderChartSVG = new Function('chartData', `
  ${jsCode}
  return renderChartSVG(chartData);
`);

const userText = "Ăn thuần chay giảm nguy cơ bệnh tim thiếu máu cục bộ 25%-30% vs Ăn chay giảm 20%-25%; Giảm 20%-50% tỷ lệ mắc đái tháo đường típ 2; Nhóm thuần chay giảm 8%-16% nguy cơ ung thư toàn bộ so với nhóm ăn mặn; Thực phẩm siêu chế biến thực vật làm tăng 20%-30% nguy cơ tử vong do mọi nguyên nhân";

const parsed = parseChartData(userText);
console.log('Parsed Chart Object:', JSON.stringify(parsed, null, 2));

const svg = renderChartSVG(parsed);
console.log('\nGenerated SVG Output:\n', svg);
