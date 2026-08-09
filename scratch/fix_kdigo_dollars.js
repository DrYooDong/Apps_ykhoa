const fs = require('fs');

const filePath = 'd:/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines/2024-kdigo-ckd.html';
let content = fs.readFileSync(filePath, 'utf8');

// Replacements map for exact latex strings to clean html
const replacements = [
  {
    from: '• Albumin niệu tăng ($ACR \\ge 30\\text{ mg/g}$ [$\\ge 3\\text{ mg/mmol}$])<br>',
    to: '• Albumin niệu tăng (ACR ≥ 30 mg/g [≥ 3 mg/mmol])<br>'
  },
  {
    from: '• $GFR &lt; 60\\text{ ml/min/1.73 m}^2$ (Giai đoạn G3a - G5)',
    to: '• eGFR &lt; 60 ml/min/1.73 m<sup>2</sup> (Giai đoạn G3a - G5)'
  },
  {
    from: '<th>GFR ($\\text{ml/min/1.73m}^2$)</th>',
    to: '<th>GFR (ml/min/1.73m<sup>2</sup>)</th>'
  },
  {
    from: '<tr><td><strong>G1</strong></td><td>$\\ge 90$</td><td>Bình thường hoặc tăng</td></tr>',
    to: '<tr><td><strong>G1</strong></td><td>≥ 90</td><td>Bình thường hoặc tăng</td></tr>'
  },
  {
    from: '<tr><td><strong>G2</strong></td><td>$60 - 89$</td><td>Giảm nhẹ</td></tr>',
    to: '<tr><td><strong>G2</strong></td><td>60 – 89</td><td>Giảm nhẹ</td></tr>'
  },
  {
    from: '<tr><td><strong>G3a</strong></td><td>$45 - 59$</td><td>Giảm nhẹ đến trung bình</td></tr>',
    to: '<tr><td><strong>G3a</strong></td><td>45 – 59</td><td>Giảm nhẹ đến trung bình</td></tr>'
  },
  {
    from: '<tr><td><strong>G3b</strong></td><td>$30 - 44$</td><td>Giảm trung bình đến nặng</td></tr>',
    to: '<tr><td><strong>G3b</strong></td><td>30 – 44</td><td>Giảm trung bình đến nặng</td></tr>'
  },
  {
    from: '<tr><td><strong>G4</strong></td><td>$15 - 29$</td><td>Giảm nặng</td></tr>',
    to: '<tr><td><strong>G4</strong></td><td>15 – 29</td><td>Giảm nặng</td></tr>'
  },
  {
    from: '<tr><td><strong>G5</strong></td><td>$&lt; 15$</td><td>Suy thận (Kidney Failure)</td></tr>',
    to: '<tr><td><strong>G5</strong></td><td>&lt; 15</td><td>Suy thận (Kidney Failure)</td></tr>'
  },
  {
    from: '<th>ACR ($\\text{mg/g}$)</th>',
    to: '<th>ACR (mg/g)</th>'
  },
  {
    from: '<th>AER ($\\text{mg/24h}$)</th>',
    to: '<th>AER (mg/24h)</th>'
  },
  {
    from: '<tr><td><strong>A1</strong></td><td>$&lt; 30$</td><td>$&lt; 30$</td><td>Bình thường / Tăng nhẹ</td></tr>',
    to: '<tr><td><strong>A1</strong></td><td>&lt; 30</td><td>&lt; 30</td><td>Bình thường / Tăng nhẹ</td></tr>'
  },
  {
    from: '<tr><td><strong>A2</strong></td><td>$30 - 300$</td><td>$30 - 300$</td><td>Tăng trung bình (Vi thể)</td></tr>',
    to: '<tr><td><strong>A2</strong></td><td>30 – 300</td><td>30 – 300</td><td>Tăng trung bình (Vi thể)</td></tr>'
  },
  {
    from: '<tr><td><strong>A3</strong></td><td>$&gt; 300$</td><td>$&gt; 300$</td><td>Tăng nghiêm trọng (Đại thể)</td></tr>',
    to: '<tr><td><strong>A3</strong></td><td>&gt; 300</td><td>&gt; 300</td><td>Tăng nghiêm trọng (Đại thể)</td></tr>'
  },
  {
    from: '($ACR$)',
    to: '(ACR)'
  },
  {
    from: 'Nếu $eGFR &lt; 60$ hoặc $ACR \\ge 30\\text{ mg/g}$, tiến hành',
    to: 'Nếu eGFR &lt; 60 hoặc ACR ≥ 30 mg/g, tiến hành'
  },
  {
    from: 'kéo dài $\\ge 3$ tháng qua',
    to: 'kéo dài ≥ 3 tháng qua'
  },
  {
    from: '$eGFR_{cr-cys}$',
    to: 'eGFR<sub>cr-cys</sub>'
  },
  {
    from: '$eGFR_{cr}$',
    to: 'eGFR<sub>cr</sub>'
  },
  {
    from: '$mGFR$',
    to: 'mGFR'
  },
  {
    from: '$\\rightarrow$',
    to: '&rarr;'
  },
  {
    from: 'tỷ lệ $ACR$',
    to: 'tỷ lệ ACR'
  },
  {
    from: '($eGFR \\ge 20$)',
    to: '(eGFR ≥ 20)'
  },
  {
    from: '$ACR \\ge 200\\text{ mg/g}$',
    to: 'ACR ≥ 200 mg/g'
  },
  {
    from: '$eGFR &gt; 25$',
    to: 'eGFR &gt; 25'
  },
  {
    from: '($\\ge 30\\text{ mg/g}$)',
    to: '(≥ 30 mg/g)'
  },
  {
    from: '$eGFR &lt; 60$',
    to: 'eGFR &lt; 60'
  },
  {
    from: '$eGFR &lt; 30\\text{ ml/min/1.73m}^2$',
    to: 'eGFR &lt; 30 ml/min/1.73m<sup>2</sup>'
  },
  {
    from: '$ACR \\ge 300\\text{ mg/g}$',
    to: 'ACR ≥ 300 mg/g'
  },
  {
    from: '$ACR > 700\\text{ mg/g}$',
    to: 'ACR &gt; 700 mg/g'
  },
  {
    from: '$eGFR &lt; 15 - 20$',
    to: 'eGFR &lt; 15 – 20'
  }
];

let replacedCount = 0;
replacements.forEach(r => {
  if (content.includes(r.from)) {
    content = content.split(r.from).join(r.to);
    replacedCount++;
  } else {
    console.log('Not found:', r.from);
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully replaced ${replacedCount} patterns in 2024-kdigo-ckd.html`);
