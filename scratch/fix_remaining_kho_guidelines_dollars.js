const fs = require('fs');
const path = require('path');

const dir = 'd:/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines';

function fixFile(fileName, replacements) {
  const filePath = path.join(dir, fileName);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let count = 0;
  replacements.forEach(r => {
    if (content.includes(r.from)) {
      content = content.split(r.from).join(r.to);
      count++;
    }
  });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed ${count} replacements in ${fileName}`);
}

// 1. byt-copd-2026.html
fixFile('byt-copd-2026.html', [
  { from: '$PaO_2 \\le 55$', to: 'PaO<sub>2</sub> ≤ 55' },
  { from: '$SaO_2 \\le 88\\%$', to: 'SaO<sub>2</sub> ≤ 88%' },
  { from: '$PaO_2$', to: 'PaO<sub>2</sub>' },
  { from: '$Hb > 17$', to: 'Hb &gt; 17' },
  { from: '$15$', to: '15' },
  { from: 'pH $\\le$', to: 'pH ≤' },
  { from: '$PaCO_2$', to: 'PaCO<sub>2</sub>' },
  { from: '45$ mmHg', to: '45 mmHg' },
  { from: '$CO_2$', to: 'CO<sub>2</sub>' },
  { from: '53$ mmHg', to: '53 mmHg' }
]);

// 2. byt-sot-xuat-huyet-dengue-2023.html
fixFile('byt-sot-xuat-huyet-dengue-2023.html', [
  { from: '($\\le 20\\text{ mmHg}$)', to: '(≤ 20 mmHg)' },
  { from: '(AST/ALT $\\ge 1000\\text{ U/L}$)', to: '(AST/ALT ≥ 1000 U/L)' },
  { from: 'Sốt $\\le 7$ ngày', to: 'Sốt ≤ 7 ngày' },
  { from: '($\\ge 3$ lần/1 giờ hoặc $\\ge 4$ lần/6 giờ)', to: '(≥ 3 lần/1 giờ hoặc ≥ 4 lần/6 giờ)' },
  { from: 'AST/ALT $\\ge 400\\text{ U/L}$', to: 'AST/ALT ≥ 400 U/L' },
  { from: '$ALT \\ge 1000\\text{ U/L}$', to: 'ALT ≥ 1000 U/L' },
  { from: '$\\ge 38,5^{\\circ}\\text{C}$', to: '≥ 38.5°C' }
]);

// 3. phac-do-soc-nhiem-khuan-sepsis3.html
fixFile('phac-do-soc-nhiem-khuan-sepsis3.html', [
  { from: '$> 2\\text{ mmol/L}$', to: '&gt; 2 mmol/L' },
  { from: '$> 20\\%$', to: '&gt; 20%' },
  { from: '**$30\\text{ mL/kg}$ dung dịch tinh thể đẳng trương**', to: '<strong>30 mL/kg dung dịch tinh thể đẳng trương</strong>' },
  { from: '$\\ge 4\\text{ mmol/L}$', to: '≥ 4 mmol/L' },
  { from: '$\\lt 65\\text{ mmHg}$', to: '&lt; 65 mmHg' },
  { from: '$\\ge 65\\text{ mmHg}$', to: '≥ 65 mmHg' },
  { from: '$\\ge 0.5\\text{ mL/kg/giờ}$', to: '≥ 0.5 mL/kg/giờ' },
  { from: '($ScvO_2$)', to: '(ScvO<sub>2</sub>)' },
  { from: '$\\ge 70\\%$', to: '≥ 70%' },
  { from: '$0.05 - 0.1\\text{ mcg/kg/phút}$', to: '0.05 – 0.1 mcg/kg/phút' },
  { from: '$0.03\\text{ đơn vị/phút}$', to: '0.03 đơn vị/phút' },
  { from: '$ScvO_2 \\lt 70\\%$', to: 'ScvO<sub>2</sub> &lt; 70%' }
]);

// 4. tom-tat-huong-dan-byt-vgsvb-2026.html
fixFile('tom-tat-huong-dan-byt-vgsvb-2026.html', [
  { from: '**$\ge$ 18 tuổi**', to: '≥ 18 tuổi' },
  { from: '**$\ge$ 6 tháng**', to: '≥ 6 tháng' },
  { from: '$\mu$g', to: 'µg' }
]);
