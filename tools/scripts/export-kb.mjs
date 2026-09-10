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

  const outKbPath = path.join(targetDir, 'clinical-rules-kb.json');
  fs.writeFileSync(outKbPath, JSON.stringify(DEFAULT_KNOWLEDGE_BASE, null, 2), 'utf-8');
  console.log(`Successfully exported clinical rules to: ${outKbPath} (${DEFAULT_KNOWLEDGE_BASE.benh.length} bệnh, ${DEFAULT_KNOWLEDGE_BASE.trieuChung.length} triệu chứng)`);

  const outCasesPath = path.join(targetDir, 'sample-clinical-cases.json');
  fs.writeFileSync(outCasesPath, JSON.stringify(SAMPLE_CASES, null, 2), 'utf-8');
  console.log(`Exported sample cases to: ${outCasesPath}`);

  await vite.close();
}

exportKb().catch(err => {
  console.error(err);
  process.exit(1);
});
