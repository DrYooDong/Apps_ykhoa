/**
 * CliniPortal — Master Sync Clinical Database & CDSS
 * Hợp nhất toàn bộ chu trình gom dữ liệu và kiểm định CDSS thành 01 lệnh duy nhất:
 * 1. Gom 12 tệp triệu chứng & 9 tệp bệnh lý vào Master KB (bundle-clinical-rules.mjs)
 * 2. Đồng bộ các tệp enriched/<slug>.json vào CSDL CDSS index.ts (build-enriched-cdss.mjs)
 * 3. Kiểm định chất lượng & đo lường độ phủ CSDL Kho Chẩn Đoán (validate-kho-db.mjs)
 * 
 * Chạy bằng: 
 *   node tools/scripts/sync-clinical-db.mjs
 *   hoặc: npm run sync:cdss
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const steps = [
  {
    title: 'Bước 1/4: Gom cụm 12 tệp triệu chứng & 9 tệp bệnh lý (Master KB & Zero HTML Entities)',
    command: 'node tools/scripts/bundle-clinical-rules.mjs'
  },
  {
    title: 'Bước 2/4: Đồng bộ Kho Hội chứng Lâm sàng (Syndrome Registry)',
    command: 'node tools/scripts/build-syndrome-registry.mjs'
  },
  {
    title: 'Bước 3/4: Đồng bộ các tệp enriched/<slug>.json vào CSDL CDSS',
    command: 'node tools/scripts/build-enriched-cdss.mjs'
  },
  {
    title: 'Bước 4/4: Kiểm định Ràng buộc 4 Bước & Tính Toàn Vẹn Biện Luận Lâm Sàng',
    command: 'node tools/scripts/validate-docspace-pipeline.mjs'
  }
];

console.log('================================================================');
console.log('🩺 CLINIPORTAL CDSS — MASTER SYNC & VALIDATION PIPELINE');
console.log('================================================================\n');

const startTime = Date.now();

try {
  for (const step of steps) {
    console.log(`\n▶️  ${step.title}`);
    console.log(`$ ${step.command}\n`);
    execSync(step.command, {
      cwd: ROOT_DIR,
      stdio: 'inherit'
    });
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log('================================================================');
  console.log(`🎉 HOÀN TẤT ĐỒNG BỘ & KIỂM ĐỊNH TOÀN DIỆN CSDL CDSS TRONG ${durationSec}s!`);
  console.log('================================================================\n');
} catch (error) {
  console.error('\n❌ Quá trình đồng bộ gặp sự cố dừng lại:', error.message);
  process.exit(error.status || 1);
}
