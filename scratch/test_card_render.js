const fs = require('fs');

global.window = { innerWidth: 1024, addEventListener: () => {} };
global.document = { querySelectorAll: () => [], getElementById: () => null, addEventListener: () => {} };

let dataContent = fs.readFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/guidelinesdata.js', 'utf8');
const match = dataContent.match(/id:\s*"study_2026_aha_acc_ada_asn_ckm_syndrome"[\s\S]*?keyResults:\s*"([^"]+)"/);

let jsCode = fs.readFileSync('D:/Apps_ykhoa/src/content/ebm/guidelines/guidelines.js', 'utf8');

const parseForestDataAll = new Function('keyResults', `
  ${jsCode}
  return parseForestDataAll(keyResults);
`);

const renderForestPlotSVG = new Function('forestData', `
  ${jsCode}
  return renderForestPlotSVG(forestData);
`);

if (match) {
  const text = match[1];
  const parsed = parseForestDataAll(text);
  console.log('Parsed multi items:', JSON.stringify(parsed, null, 2));
  const svg = renderForestPlotSVG(parsed);
  console.log('SVG snippet:', svg.substring(0, 1000));
}
