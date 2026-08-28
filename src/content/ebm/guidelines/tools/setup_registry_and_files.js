const fs = require('fs');
const path = require('path');

const dir = path.resolve('d:/Apps/Apps_ykhoa/src/content/ebm/guidelines/kho-guidelines');
const oldIapPath = path.join(dir, 'International_Association_of_Pancreatology_Revised_Guidelines_on_Acute_Pancreatitis_2025.mdx');
const newIapPath = path.join(dir, '2025-iap-acute-pancreatitis.mdx');
const bavenoStubPath = path.join(dir, '2021-bavenovii-taltmc.mdx');

// 1. Rename & Update IAP 2025
if (fs.existsSync(oldIapPath)) {
  let content = fs.readFileSync(oldIapPath, 'utf8');
  content = content.replace(/slug:\s*["'][^"']+["']/, 'slug: "2025-iap-acute-pancreatitis"');
  content = content.replace(/code:\s*["'][^"']+["']/, 'code: "GDL-2025-IAP-ACUTE-PANCREATITIS"');
  content = content.replace(/organization:\s*["'][^"']+["']/, 'organization: "IAP / APA"');
  content = content.replace(/year:\s*["']?[0-9]+["']?/, 'year: "2025"');
  fs.writeFileSync(newIapPath, content, 'utf8');
  fs.unlinkSync(oldIapPath);
  console.log('Renamed IAP 2025 to 2025-iap-acute-pancreatitis.mdx');
}

// 2. Remove Baveno VII stub
if (fs.existsSync(bavenoStubPath)) {
  fs.unlinkSync(bavenoStubPath);
  console.log('Removed 2021-bavenovii-taltmc.mdx stub');
}

// 3. Update kho-guidelines-registry.ts
const regPath = path.resolve('d:/Apps/Apps_ykhoa/src/content/ebm/guidelines/js/kho-guidelines-registry.ts');
let regContent = fs.readFileSync(regPath, 'utf8');

// Update Baveno VII file mapping
regContent = regContent.replace(
  /id:\s*'2022-easl-baveno-vii-portal-hypertension-consensus'([\s\S]*?)file:\s*'2021-bavenovii-taltmc\.html'/,
  "id: '2022-easl-baveno-vii-portal-hypertension-consensus'$1file: '2022-easl-baveno-vii-portal-hypertension-consensus.html'"
);

// Update IAP 2025 mapping
regContent = regContent.replace(
  /id:\s*'International_Association_of_Pancreatology_Revised_Guidelines_on_Acute_Pancreatitis_2025'/,
  "id: '2025-iap-acute-pancreatitis'"
);
regContent = regContent.replace(
  /file:\s*'International_Association_of_Pancreatology_Revised_Guidelines_on_Acute_Pancreatitis_2025\.html'/,
  "file: '2025-iap-acute-pancreatitis.html'"
);

fs.writeFileSync(regPath, regContent, 'utf8');
console.log('Updated kho-guidelines-registry.ts successfully');
