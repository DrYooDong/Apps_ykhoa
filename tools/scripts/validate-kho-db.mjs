/**
 * CliniPortal — Validate & Audit Kho Chẩn Đoán Database
 * Quét toàn bộ CSDL DocSpace để phát hiện các bệnh lý còn dùng dữ liệu placeholder/mẫu
 * và đo lường tỷ lệ hoàn thiện theo chuẩn CDSS Gold Standard (Hình 2).
 * 
 * Chạy bằng: node tools/scripts/validate-kho-db.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DB_FILE = path.resolve(__dirname, '../../src/content/docspace/data/kho-chan-doan-db.ts');
const GOLD_DB_FILE = path.resolve(__dirname, '../../src/content/docspace/data/diagnostic-criteria-database.ts');
const ENRICHED_DIR = path.resolve(__dirname, '../../src/content/docspace/data/enriched');

const PLACEHOLDER_PATTERNS = [
  /Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của/i,
  /Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu/i,
  /Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong/i,
  /Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu/i,
  /Thuốc điều trị bậc 1 cho/i,
  /Biến đổi trên ngưỡng tham chiếu bình thường/i,
  /Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa/i
];

function checkDiseaseIsPlaceholder(disease) {
  let placeholderHits = 0;

  if (disease.goldStandard) {
    if (PLACEHOLDER_PATTERNS[3].test(disease.goldStandard)) placeholderHits++;
  }

  if (Array.isArray(disease.criteria)) {
    for (const c of disease.criteria) {
      if (PLACEHOLDER_PATTERNS[0].test(c.label) || PLACEHOLDER_PATTERNS[1].test(c.label) || PLACEHOLDER_PATTERNS[2].test(c.label)) {
        placeholderHits++;
      }
    }
  }

  if (disease.protocol?.firstLineDrugs) {
    for (const d of disease.protocol.firstLineDrugs) {
      if (PLACEHOLDER_PATTERNS[4].test(d.drugName)) {
        placeholderHits++;
      }
    }
  }

  return placeholderHits > 0;
}

function runAudit() {
  console.log('🩺 Đang kiểm tra cơ sở dữ liệu DocSpace Kho Chẩn Đoán...');

  if (!fs.existsSync(TARGET_DB_FILE)) {
    console.error(`❌ Không tìm thấy file: ${TARGET_DB_FILE}`);
    process.exit(1);
  }

  const content = fs.readFileSync(TARGET_DB_FILE, 'utf8');

  // Đếm các file JSON đã làm giàu độc lập trong thư mục enriched/
  let enrichedFilesCount = 0;
  const enrichedDiseasesList = [];
  if (fs.existsSync(ENRICHED_DIR)) {
    const jsonFiles = fs.readdirSync(ENRICHED_DIR).filter(f => f.endsWith('.json'));
    enrichedFilesCount = jsonFiles.length;
    for (const f of jsonFiles) {
      try {
        const d = JSON.parse(fs.readFileSync(path.join(ENRICHED_DIR, f), 'utf8'));
        enrichedDiseasesList.push(`${d.diseaseName || f} (${d.icdCode || 'N/A'})`);
      } catch (_) {}
    }
  }

  // Đếm nhanh các match mẫu template trong kho thô
  let countTemplateGoldStandard = (content.match(/Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu/g) || []).length;
  let countTemplateDrug = (content.match(/Thuốc điều trị bậc 1 cho/g) || []).length;
  let countTemplateCriteria = (content.match(/Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của/g) || []).length;

  // Đếm tổng số key bệnh lý trong kho thô
  const keyMatches = content.match(/^\s*["']([a-zA-Z0-9_]+)["']:\s*\{/gm) || [];
  const rawTotalDiseases = keyMatches.length;

  // Đọc file 30 bệnh lý chuẩn thủ công
  let goldDiseasesCount = 0;
  if (fs.existsSync(GOLD_DB_FILE)) {
    const goldContent = fs.readFileSync(GOLD_DB_FILE, 'utf8');
    const goldMatches = goldContent.match(/^\s*["']([a-zA-Z0-9_]+)["']:\s*\{/gm) || [];
    goldDiseasesCount = goldMatches.length;
  }

  const placeholderCount = Math.max(0, countTemplateGoldStandard - enrichedFilesCount);
  const totalDiseases = rawTotalDiseases;
  const enrichedCount = totalDiseases - placeholderCount;
  const completionRate = totalDiseases > 0 ? ((enrichedCount / totalDiseases) * 100).toFixed(1) : 0;

  console.log('\n================================================================');
  console.log('📊 KẾT QUẢ KIỂM ĐỊNH CHẤT LƯỢNG KHO CHẨN ĐOÁN (DOCSPACE CDSS)');
  console.log('================================================================');
  console.log(`• Tổng số bệnh lý trong hệ thống:       ${totalDiseases}`);
  console.log(`• Số bệnh lý đạt chuẩn chuyên sâu:      ${enrichedCount} (${completionRate}%)`);
  console.log(`  - Từ thư mục enriched/ (mới):         ${enrichedFilesCount}`);
  if (enrichedDiseasesList.length > 0) {
    enrichedDiseasesList.forEach(name => console.log(`    + ${name}`));
  }
  console.log(`• Số bệnh lý còn là Template mẫu:       ${placeholderCount} (${(100 - completionRate).toFixed(1)}%)`);
  console.log(`• Dấu hiệu mẫu còn sót lại:`);
  console.log(`  - Tiêu chuẩn vàng placeholder:        ${countTemplateGoldStandard}`);
  console.log(`  - Thuốc bậc 1 placeholder:             ${countTemplateDrug}`);
  console.log(`  - Tiêu chuẩn chẩn đoán placeholder:   ${countTemplateCriteria}`);
  console.log('================================================================');
  console.log('💡 HƯỚNG DẪN LÀM GIÀU BỆNH MỚI (CÁCH 1):');
  console.log('1. Chạy Prompt 08/09 -> lưu file JSON vào: src/content/docspace/data/enriched/<ten_benh>.json');
  console.log('2. Chạy lệnh đồng bộ: node tools/scripts/build-enriched-cdss.mjs');
  console.log('================================================================\n');
}

runAudit();
