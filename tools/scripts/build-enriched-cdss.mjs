/**
 * CliniPortal — Build & Bundle Enriched CDSS Entries
 * Script quét toàn bộ file JSON trong `src/content/docspace/data/enriched/`,
 * kiểm tra tính hợp lệ và tự động sinh file TypeScript `index.ts`.
 * 
 * Chạy bằng: node tools/scripts/build-enriched-cdss.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENRICHED_DIR = path.resolve(__dirname, '../../src/content/docspace/data/enriched');
const OUTPUT_INDEX_FILE = path.resolve(ENRICHED_DIR, 'index.ts');

function runBuild() {
  console.log('🔍 Đang quét các file JSON bệnh lý trong thư mục enriched/...\n');

  if (!fs.existsSync(ENRICHED_DIR)) {
    fs.mkdirSync(ENRICHED_DIR, { recursive: true });
  }

  const files = fs.readdirSync(ENRICHED_DIR).filter(f => f.endsWith('.json'));

  if (files.length === 0) {
    console.log('⚠️ Chưa có file JSON nào trong thư mục enriched/. Tạo index.ts rỗng.');
    const emptyTs = `/**
 * CliniPortal Enriched CDSS Database Index
 * Tự động tạo bởi: tools/scripts/build-enriched-cdss.mjs
 */

import type { DiseaseReactionChainDefinition } from '../diagnostic-criteria-database';

export const ENRICHED_DISEASES: Record<string, DiseaseReactionChainDefinition> = {};
export const ENRICHED_DISEASE_KEYS: string[] = [];
`;
    fs.writeFileSync(OUTPUT_INDEX_FILE, emptyTs, 'utf8');
    return;
  }

  const imports = [];
  const entries = [];
  let validCount = 0;

  for (const file of files) {
    const filePath = path.join(ENRICHED_DIR, file);
    const key = path.basename(file, '.json');

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);

      // Validate cấu trúc cơ bản
      if (!data.icdCode || !data.diseaseName || !data.criteria || !data.protocol) {
        console.warn(`⚠️ Bỏ qua [${file}]: Thiếu các trường bắt buộc (icdCode, diseaseName, criteria, protocol).`);
        continue;
      }

      // Check xem có còn câu placeholder không
      if (data.goldStandard && data.goldStandard.includes('Tiêu chuẩn vàng xác định dựa trên cận lâm sàng')) {
        console.warn(`⚠️ [${file}]: Cảnh báo tiêu chuẩn vàng còn là placeholder!`);
      }

      const varName = key.replace(/[^a-zA-Z0-9_]/g, '_');
      imports.push(`import ${varName} from './${file}';`);
      entries.push(`  '${key}': ${varName} as unknown as DiseaseReactionChainDefinition,`);

      console.log(`✅ Đã nạp thành công: ${key} -> "${data.diseaseName}" (${data.icdCode})`);
      validCount++;
    } catch (err) {
      console.error(`❌ Lỗi phân tích cú pháp JSON trong file [${file}]:`, err.message);
    }
  }

  const tsContent = `/**
 * CliniPortal Enriched CDSS Database Index
 * Tự động tạo bởi: tools/scripts/build-enriched-cdss.mjs
 * 
 * ⚠️ KHÔNG SỬA FILE NÀY TRỰC TIẾP.
 * Khi thêm bệnh lý mới từ Prompt 08/09:
 * 1. Lưu file <ten_benh>.json vào thư mục này.
 * 2. Chạy lệnh: node tools/scripts/build-enriched-cdss.mjs
 */

import type { DiseaseReactionChainDefinition } from '../diagnostic-criteria-database';

${imports.join('\n')}

export const ENRICHED_DISEASES: Record<string, DiseaseReactionChainDefinition> = {
${entries.join('\n')}
};

export const ENRICHED_DISEASE_KEYS = Object.keys(ENRICHED_DISEASES);
`;

  fs.writeFileSync(OUTPUT_INDEX_FILE, tsContent, 'utf8');
  console.log(`\n💾 Đã cập nhật file: ${OUTPUT_INDEX_FILE}`);
  console.log(`🎉 Hoàn tất nạp ${validCount} bệnh lý đã làm giàu vào hệ thống CDSS DocSpace!`);
}

runBuild();
