const fs = require('fs');

const files = [
  "d:\\Apps_ykhoa\\src\\content\\calculators\\infectious\\chinh-lieu-khang-sinh.html",
  "d:\\Apps_ykhoa\\src\\content\\ebm\\yhcc.html",
  "d:\\Apps_ykhoa\\src\\content\\ebm\\ebm-lab\\kaplan-meier.html",
  "d:\\Apps_ykhoa\\src\\content\\ebm\\guidelines\\kho-guidelines\\empa-reg.html",
  "d:\\Apps_ykhoa\\src\\content\\ebm\\guideline-radar\\radar.html",
  "d:\\Apps_ykhoa\\src\\content\\pathophysiology\\pathophysiology-cases\\slb-ccbs-xhth.html",
  "d:\\Apps_ykhoa\\src\\content\\pharmacology\\tools\\tra-cuu-thuoc.html",
  "d:\\Apps_ykhoa\\src\\content\\skills\\treatment-management\\luachon-khangsinh.html"
];

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log(`File not found: ${file}`);
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace items='[...]' with items="[{...}]" and escape quotes
  content = content.replace(/items='(\[.*?\])'/g, (match, p1) => {
    const escapedJson = p1.replace(/"/g, '&quot;');
    return `items="${escapedJson}"`;
  });
  
  // Fix specific > issues in radar.html
  if (file.includes('radar.html')) {
    content = content.replace(/fT > MIC/g, 'fT &gt; MIC');
    content = content.replace(/đạt > 88%/g, 'đạt &gt; 88%');
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Fixed ${file}`);
}
