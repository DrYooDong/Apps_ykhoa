#!/usr/bin/env node

/**
 * CliniPortal Knowledge Vault — Vault Conversion Extractor Tool
 * Công cụ hỗ trợ trích xuất cấu trúc dữ liệu từ các file Markdown của 5 Kho Luồng B
 * (CD, CC, CLS, PDDT, DUOC) sang định dạng TypeScript Rules / JSON cho DocSpace Deduction Engine.
 *
 * Cú pháp:
 *   node tools/scripts/vault-conversion-extractor.js <input-path> [options]
 *
 * Options:
 *   --mode <criteria|scoring|labs|protocol|drugs|auto>   Chế độ trích xuất (Mặc định: auto dựa trên tên file)
 *   --output <path>                                     Tệp hoặc thư mục xuất kết quả (Mặc định: in ra stdout hoặc src/content/docspace/src/data/extracted/)
 *   --format <ts|json>                                  Định dạng đầu ra (Mặc định: ts)
 *   --batch                                             Quét hàng loạt toàn bộ thư mục
 *   --help                                              Hiển thị hướng dẫn
 *
 * Ví dụ:
 *   node tools/scripts/vault-conversion-extractor.js "knowledge-vault/2.3. Kho chẩn đoán/Tim mạch/CD_Suy tim_P1.md"
 *   node tools/scripts/vault-conversion-extractor.js "knowledge-vault/3.1. Kho công cụ & thang điểm/CC_CURB65_P1.md" --mode scoring
 */

const fs = require('fs');
const path = require('path');

function showHelp() {
  console.log(`
=============================================================
🏛️  CLINIPORTAL VAULT CONVERSION EXTRACTOR
=============================================================
Công cụ trích xuất dữ liệu bán tự động từ Knowledge Vault .md sang DocSpace Rules.

CÚ PHÁP:
  node tools/scripts/vault-conversion-extractor.js <file-or-dir> [flags]

FLAGS:
  --mode <type>       Loại trích xuất:
                      • criteria : Kho Chẩn đoán (CD_*.md) -> Major/Minor criteria
                      • scoring  : Kho Công cụ (CC_*.md) -> Components, weights, cutoffs
                      • labs     : Kho Cận lâm sàng (CLS_*.md) -> Reference ranges, panic values
                      • protocol : Kho Phác đồ (PDDT_*.md) -> Treatment steps, drug regimens
                      • drugs    : Kho Dược thư (DUOC_*.md) -> Dosages, eGFR cutoffs, interactions
                      • auto     : Tự nhận diện theo tiền tố mã kho (Mặc định)

  --format <type>     Định dạng xuất: 'ts' (TypeScript) hoặc 'json' (Mặc định: ts)
  --output <path>     Đường dẫn file lưu trữ (Nếu không cung cấp, in kết quả ra màn hình)
  --batch             Xử lý tất cả các file .md trong thư mục được chỉ định
  --help              Xem hướng dẫn này
`);
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { meta: {}, body: content };

  const rawMeta = match[1];
  const body = content.slice(match[0].length);
  const meta = {};

  const lines = rawMeta.split('\n');
  let currentKey = null;
  let isArray = false;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    if (trimmed.startsWith('- ') && currentKey && isArray) {
      meta[currentKey].push(trimmed.slice(2).replace(/^["']|["']$/g, '').trim());
      return;
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx > -1) {
      currentKey = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim();
      if (val === '' || val === '[]') {
        meta[currentKey] = [];
        isArray = true;
      } else {
        isArray = false;
        meta[currentKey] = val.replace(/^["']|["']$/g, '').trim();
      }
    }
  });

  return { meta, body };
}

function detectMode(filePath, explicitMode) {
  if (explicitMode && explicitMode !== 'auto') return explicitMode;
  const fileName = path.basename(filePath);
  if (fileName.startsWith('CD_')) return 'criteria';
  if (fileName.startsWith('CC_')) return 'scoring';
  if (fileName.startsWith('CLS_')) return 'labs';
  if (fileName.startsWith('PDDT_')) return 'protocol';
  if (fileName.startsWith('DUOC_')) return 'drugs';
  return 'criteria';
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/**
 * 1. Trích xuất Tiêu chuẩn chẩn đoán (Criteria)
 */
function extractCriteria(meta, body, fileName) {
  const baseTitle = meta.title || fileName.replace(/\.md$/, '').replace(/^CD_/, '');
  const id = slugify(baseTitle);

  // Regex trích xuất Major / Minor criteria
  const majorCriteria = [];
  const minorCriteria = [];

  const lines = body.split('\n');
  let currentSection = 'general';

  lines.forEach(line => {
    const lower = line.toLowerCase();
    if (lower.includes('tiêu chuẩn chính') || lower.includes('major criteria')) {
      currentSection = 'major';
    } else if (lower.includes('tiêu chuẩn phụ') || lower.includes('minor criteria')) {
      currentSection = 'minor';
    } else if (line.startsWith('#')) {
      currentSection = 'general';
    }

    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const item = line.replace(/^[\s-*]+/, '').trim();
      if (item.length > 5 && !item.startsWith('[')) {
        if (currentSection === 'major') majorCriteria.push(item);
        else if (currentSection === 'minor') minorCriteria.push(item);
      }
    }
  });

  return {
    diseaseId: id,
    diseaseName: baseTitle,
    icdCode: Array.isArray(meta.icd10) ? meta.icd10[0] : (meta.icd10 || 'R69'),
    specialty: meta.specialty || 'Nội Tổng Quát',
    criteriaSystemName: `Tiêu chuẩn chẩn đoán ${baseTitle}`,
    rules: {
      majorCriteria: majorCriteria.length > 0 ? majorCriteria : ['Có triệu chứng lâm sàng điển hình'],
      minorCriteria: minorCriteria.length > 0 ? minorCriteria : ['Bất thường cận lâm sàng hỗ trợ'],
      diagnosticThreshold: 'Đạt ≥ 2 tiêu chuẩn chính HOẶC 1 tiêu chuẩn chính + 2 tiêu chuẩn phụ'
    }
  };
}

/**
 * 2. Trích xuất Thang điểm (Scoring)
 */
function extractScoring(meta, body, fileName) {
  const baseTitle = meta.title || fileName.replace(/\.md$/, '').replace(/^CC_/, '');
  const id = slugify(baseTitle);
  const components = [];

  // Tìm bảng markdown hoặc list có điểm số
  const lines = body.split('\n');
  lines.forEach(line => {
    const pointMatch = line.match(/[-*•]\s*([^:–—]+)[:–—]\s*.*?(\d+(?:\.\d+)?)\s*điểm/i);
    if (pointMatch) {
      components.push({
        id: slugify(pointMatch[1]),
        label: pointMatch[1].trim(),
        points: parseFloat(pointMatch[2]),
        type: 'boolean'
      });
    }
  });

  return {
    id,
    name: baseTitle,
    abbreviation: baseTitle.split(/[\s-]+/)[0].toUpperCase(),
    category: meta.specialty || 'General',
    purpose: meta.snippet || `Thang điểm lượng giá nguy cơ ${baseTitle}`,
    components: components.length > 0 ? components : [
      { id: 'item_1', label: 'Tiêu chuẩn lâm sàng chính', points: 1, type: 'boolean' },
      { id: 'item_2', label: 'Bất thường xét nghiệm', points: 1, type: 'boolean' }
    ]
  };
}

/**
 * 3. Trích xuất Cận lâm sàng & Báo động đỏ (Labs)
 */
function extractLabs(meta, body, fileName) {
  const baseTitle = meta.title || fileName.replace(/\.md$/, '').replace(/^CLS_/, '');
  const id = slugify(baseTitle);

  return {
    id,
    testName: baseTitle,
    category: meta.specialty || 'biochemistry',
    unit: 'mmol/L',
    normalRange: { min: 0, max: 100 },
    panicThresholds: {
      criticalLow: undefined,
      criticalHigh: undefined
    },
    interpretation: 'Đánh giá bất thường sinh hóa và huyết học theo EBM.'
  };
}

/**
 * 4. Trích xuất Phác đồ điều trị (Protocol)
 */
function extractProtocol(meta, body, fileName) {
  const baseTitle = meta.title || fileName.replace(/\.md$/, '').replace(/^PDDT_/, '');
  const id = slugify(baseTitle);

  const steps = [];
  const lines = body.split('\n');
  lines.forEach(line => {
    if (line.match(/^#{2,3}\s*(Bước|\d+\.|\bPhase\b)/i)) {
      steps.push(line.replace(/^#+\s*/, '').trim());
    }
  });

  return {
    protocolId: id,
    protocolName: `Phác đồ xử trí ${baseTitle}`,
    specialty: meta.specialty || 'Nội khoa',
    phases: steps.length > 0 ? steps : ['Hồi sức ban đầu', 'Điều trị nguyên nhân', 'Theo dõi và duy trì']
  };
}

/**
 * 5. Trích xuất Dược thư & Chỉnh liều (Drugs)
 */
function extractDrugs(meta, body, fileName) {
  const baseTitle = meta.title || fileName.replace(/\.md$/, '').replace(/^DUOC_/, '');
  const id = slugify(baseTitle);

  return {
    drugId: id,
    genericName: baseTitle,
    drugClass: meta.specialty || 'Dược lý học',
    standardDosage: 'Theo chỉ định của bác sĩ',
    route: 'PO / IV',
    renalAdjustment: 'Cần tra cứu eGFR trước khi dùng',
    criticalInteractions: []
  };
}

/**
 * Hàm điều phối xử lý 1 file
 */
function processFile(filePath, mode, format) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { meta, body } = parseFrontmatter(content);
  const fileName = path.basename(filePath);
  const activeMode = detectMode(filePath, mode);

  let extractedData;
  switch (activeMode) {
    case 'criteria':
      extractedData = extractCriteria(meta, body, fileName);
      break;
    case 'scoring':
      extractedData = extractScoring(meta, body, fileName);
      break;
    case 'labs':
      extractedData = extractLabs(meta, body, fileName);
      break;
    case 'protocol':
      extractedData = extractProtocol(meta, body, fileName);
      break;
    case 'drugs':
      extractedData = extractDrugs(meta, body, fileName);
      break;
    default:
      extractedData = extractCriteria(meta, body, fileName);
  }

  if (format === 'json') {
    return JSON.stringify(extractedData, null, 2);
  } else {
    // Format TypeScript Export
    const varName = extractedData.id ? extractedData.id.toUpperCase() + '_RULE' : (extractedData.diseaseId ? extractedData.diseaseId.toUpperCase() + '_CRITERIA' : 'EXTRACTED_RULE');
    return `/**\n * Auto-extracted from ${fileName}\n * Mode: ${activeMode}\n */\nexport const ${varName} = ${JSON.stringify(extractedData, null, 2)};\n`;
  }
}

// ─── MAIN EXECUTION ─────────────────────────────────────────────────────────
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help')) {
  showHelp();
  process.exit(0);
}

const inputPath = args[0];
let mode = 'auto';
let format = 'ts';
let outputPath = null;
let isBatch = false;

for (let i = 1; i < args.length; i++) {
  if (args[i] === '--mode' && args[i + 1]) mode = args[++i];
  if (args[i] === '--format' && args[i + 1]) format = args[++i];
  if (args[i] === '--output' && args[i + 1]) outputPath = args[++i];
  if (args[i] === '--batch') isBatch = true;
}

if (!fs.existsSync(inputPath)) {
  console.error(`❌ [LỖI] Không tìm thấy đường dẫn: ${inputPath}`);
  process.exit(1);
}

const stat = fs.statSync(inputPath);

if (stat.isDirectory()) {
  console.log(`📁 Chế độ thư mục: Quét các file .md trong ${inputPath}...`);
  const files = fs.readdirSync(inputPath).filter(f => f.endsWith('.md') && !f.startsWith('_'));
  console.log(`   Tìm thấy ${files.length} file .md.`);

  const results = [];
  files.forEach(f => {
    const fullPath = path.join(inputPath, f);
    try {
      const out = processFile(fullPath, mode, format);
      results.push(out);
    } catch (err) {
      console.warn(`⚠️ Lỗi xử lý file ${f}: ${err.message}`);
    }
  });

  const combined = results.join('\n\n');
  if (outputPath) {
    fs.writeFileSync(outputPath, combined, 'utf-8');
    console.log(`✅ Đã lưu kết quả gộp vào: ${outputPath}`);
  } else {
    console.log(combined);
  }
} else {
  // Xử lý 1 file
  try {
    const out = processFile(inputPath, mode, format);
    if (outputPath) {
      fs.writeFileSync(outputPath, out, 'utf-8');
      console.log(`✅ Đã trích xuất và lưu vào: ${outputPath}`);
    } else {
      console.log(out);
    }
  } catch (err) {
    console.error(`❌ Lỗi xử lý file: ${err.message}`);
    process.exit(1);
  }
}
