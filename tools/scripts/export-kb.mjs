import { createServer } from 'vite';
import fs from 'fs';
import path from 'path';

async function exportKb() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    root: 'd:/Apps/Apps_ykhoa/src/content/docspace'
  });

  const { DEFAULT_KNOWLEDGE_BASE, SAMPLE_CASES } = await vite.ssrLoadModule('/src/data/seedData.ts');
  
  const targetDir = 'd:/Apps/Apps_ykhoa/src/content/knowledge-vault/data';
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const outSymptomsPath = path.join(targetDir, 'clinical-rules-symptoms.json');
  fs.writeFileSync(outSymptomsPath, JSON.stringify(DEFAULT_KNOWLEDGE_BASE.trieuChung, null, 2), 'utf-8');
  console.log(`Exported symptoms to: ${outSymptomsPath} (${DEFAULT_KNOWLEDGE_BASE.trieuChung.length} triệu chứng)`);


  // Đồng bộ sang thư mục diseases/ phân tách theo chuyên khoa
  const diseasesDir = path.join(targetDir, 'diseases');
  if (!fs.existsSync(diseasesDir)) {
    fs.mkdirSync(diseasesDir, { recursive: true });
  }
  const specialtyMap = {
    'Hô hấp': 'ho-hap.json',
    'Tim mạch': 'tim-mach.json',
    'Tiêu hóa': 'tieu-hoa.json',
    'Tiết niệu': 'tiet-nieu.json',
    'Nội tiết': 'noi-tiet.json',
    'Thần kinh': 'than-kinh.json',
    'Toàn thân': 'toan-than.json',
    'Sản phụ khoa': 'san-phu-khoa.json',
    'Truyền nhiễm': 'truyen-nhiem.json'
  };
  const categorized = {};
  Object.values(specialtyMap).forEach(file => categorized[file] = []);
  DEFAULT_KNOWLEDGE_BASE.benh.forEach(d => {
    const file = specialtyMap[d.nhom] || 'khac.json';
    if (!categorized[file]) categorized[file] = [];
    categorized[file].push(d);
  });
  for (const [file, list] of Object.entries(categorized)) {
    if (list.length > 0) {
      fs.writeFileSync(path.join(diseasesDir, file), JSON.stringify(list, null, 2) + '\n', 'utf-8');
    }
  }
  console.log(`Exported specialty diseases to: ${diseasesDir} (${Object.keys(categorized).length} chuyên khoa)`);

  const outKbPath = path.join(targetDir, 'clinical-rules-kb.json');
  fs.writeFileSync(outKbPath, JSON.stringify(DEFAULT_KNOWLEDGE_BASE, null, 2), 'utf-8');
  console.log(`Successfully exported master clinical rules to: ${outKbPath}`);

  const outCasesPath = path.join(targetDir, 'sample-clinical-cases.json');
  fs.writeFileSync(outCasesPath, JSON.stringify(SAMPLE_CASES, null, 2), 'utf-8');
  console.log(`Exported sample cases to: ${outCasesPath}`);

  await vite.close();
}

exportKb().catch(err => {
  console.error(err);
  process.exit(1);
});
