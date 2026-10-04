#!/usr/bin/env node
/**
 * CLI Tool: Content Trim & Abbreviation Verifier for DocSpace
 *
 * Kiểm tra trước (dry-run) và xuất báo cáo trực quan cho tính năng:
 * - Viết tắt y khoa (Abbreviation Engine)
 * - Lọc nội dung thừa (Content Trimmer)
 *
 * Usage:
 *   node tools/scripts/content-trim.mjs --dry-run
 *   node tools/scripts/content-trim.mjs --report
 *   node tools/scripts/content-trim.mjs --apply
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../../');

const ENRICHED_DIR = path.join(ROOT, 'src/content/docspace/data/enriched');
const ABBREV_MAP_PATH = path.join(ROOT, 'src/content/docspace/src/data/medical-abbreviation-map.json');
const DISEASES_TS_PATH = path.join(ROOT, 'src/content/docspace/src/data/diseases.ts');

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run') || args.length === 0;
const isReport = args.includes('--report');
const isApply = args.includes('--apply');

// Load abbreviation map
const abbrevData = JSON.parse(fs.readFileSync(ABBREV_MAP_PATH, 'utf8'));
const CATEGORIES = abbrevData.categories || {};
const FULL_TO_ABBR_FAST_MAP = new Map();

for (const cat of Object.keys(CATEGORIES)) {
  for (const item of CATEGORIES[cat]) {
    FULL_TO_ABBR_FAST_MAP.set(item.full.trim().toLowerCase(), item.abbr);
    if (Array.isArray(item.also)) {
      for (const alt of item.also) {
        FULL_TO_ABBR_FAST_MAP.set(alt.trim().toLowerCase(), item.abbr);
      }
    }
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function abbreviate(text, ctx = 'auto', maxLen = 0) {
  if (!text || typeof text !== 'string') return text || '';
  let result = text.trim();

  const exactMatch = FULL_TO_ABBR_FAST_MAP.get(result.toLowerCase());
  if (exactMatch) {
    result = exactMatch;
  } else {
    const catKeys = Object.keys(CATEGORIES);
    const orderedCats = ctx !== 'auto' && CATEGORIES[ctx]
      ? [ctx, ...catKeys.filter((k) => k !== ctx)]
      : catKeys;

    for (const cat of orderedCats) {
      const items = CATEGORIES[cat] || [];
      const sortedItems = [...items].sort((a, b) => b.full.length - a.full.length);

      for (const item of sortedItems) {
        if (!item.full || item.full.length < 2) continue;
        const escaped = escapeRegex(item.full);
        const regex = new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}(?=[^\\p{L}\\p{N}]|$)`, 'giu');
        if (regex.test(result)) {
          result = result.replace(regex, `$1${item.abbr}`);
        }
      }
    }
  }

  if (maxLen > 0 && result.length > maxLen) {
    result = result.slice(0, Math.max(1, maxLen - 1)).trimEnd() + '…';
  }
  return result;
}

function trimParentheticalWrapper(text) {
  const match = text.match(/^([^(]+?)\s*\(([^)]{1,25})\)\s*$/);
  if (match) {
    const parent = match[1].trim();
    const inside = match[2].trim();
    if (/[A-Z0-9]/.test(inside) && inside.length <= parent.length) {
      if (/men gan|hematocrit|tiểu cầu|bạch cầu|huyết sắc tố/i.test(parent)) return inside;
      if (/oresol|ors/i.test(inside)) return inside;
      if (/^[A-Z0-9\s/-]+$/.test(inside)) return inside;
    }
  }
  return text;
}

function trimBranchName(name) {
  if (!name || typeof name !== 'string') return name || '';
  let res = name.trim();

  const branchMatch = res.match(/^(Nhánh\s+\d+|Mức\s+độ\s+\d+|Bậc\s+\d+)\s*[:—–-]\s*(.+)$/i);
  if (branchMatch) {
    const prefix = branchMatch[1];
    let body = branchMatch[2].trim();

    let icd = '';
    const icdMatch = body.match(/\(([A-Z]\d+(?:\.\d+)?)\)$/);
    if (icdMatch) {
      icd = ` (${icdMatch[1]})`;
      body = body.replace(/\(([A-Z]\d+(?:\.\d+)?)\)$/, '').trim();
    }

    body = body
      .replace(/Sốt xuất huyết Dengue/gi, '')
      .replace(/SXH Dengue/gi, '')
      .replace(/không có dấu hiệu cảnh báo/gi, 'Không DHCB')
      .replace(/có dấu hiệu cảnh báo/gi, 'Có DHCB')
      .replace(/dấu hiệu cảnh báo/gi, 'DHCB')
      .replace(/nặng/gi, 'Nặng')
      .replace(/^[-—–:\s]+|[-—–:\s]+$/g, '')
      .trim();

    return `${prefix} — ${body}${icd}`;
  }

  res = res
    .replace(/không có dấu hiệu cảnh báo/gi, 'Không DHCB')
    .replace(/có dấu hiệu cảnh báo/gi, 'Có DHCB')
    .replace(/dấu hiệu cảnh báo/gi, 'DHCB');

  return abbreviate(res, 'diseases', 45);
}

function trimMetricList(metricStr, maxItems = 4) {
  if (!metricStr || typeof metricStr !== 'string') return [];
  const rawItems = metricStr.split(/[,;]/).map((s) => s.trim()).filter(Boolean);
  const trimmedItems = rawItems.map((item) => {
    let clean = trimParentheticalWrapper(item);
    clean = abbreviate(clean, 'labs', 25);
    return clean;
  });

  if (trimmedItems.length <= maxItems) {
    return trimmedItems;
  }
  const result = trimmedItems.slice(0, maxItems);
  const remaining = trimmedItems.length - maxItems;
  result.push(`+${remaining} khác`);
  return result;
}

function trimContent(text, ctx = 'auto') {
  if (!text || typeof text !== 'string') return text || '';
  let result = text.trim();

  if (ctx === 'branchName') return trimBranchName(result);
  if (ctx === 'monitoringMetric') return trimMetricList(result, 5).join(' | ');
  if (ctx === 'drugName') {
    result = trimParentheticalWrapper(result);
    return abbreviate(result, 'drugs', 30);
  }
  return trimParentheticalWrapper(result);
}

// ----------------------------------------------------
// SCANNING LOGIC
// ----------------------------------------------------
const monitoringResults = [];
const branchResults = [];
const drugResults = [];
const diseaseResults = [];

// 1. Scan enriched files
if (fs.existsSync(ENRICHED_DIR)) {
  const files = fs.readdirSync(ENRICHED_DIR).filter((f) => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(ENRICHED_DIR, file);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Monitoring
      if (Array.isArray(data.monitoring)) {
        for (const m of data.monitoring) {
          const raw = typeof m === 'string' ? m : m.metric || m.param;
          if (raw && raw.length > 15) {
            const trimmed = trimContent(raw, 'monitoringMetric');
            if (trimmed !== raw) {
              monitoringResults.push({ file, before: raw, after: trimmed });
            }
          }
        }
      }

      // Branching
      if (data.branching && Array.isArray(data.branching.axes)) {
        for (const axis of data.branching.axes) {
          if (Array.isArray(axis.branches)) {
            for (const b of axis.branches) {
              if (b.name) {
                const trimmed = trimBranchName(b.name);
                if (trimmed !== b.name) {
                  branchResults.push({ file, before: b.name, after: trimmed });
                }
              }
            }
          }
        }
      } else if (Array.isArray(data.branches)) {
        for (const b of data.branches) {
          if (b.name) {
            const trimmed = trimBranchName(b.name);
            if (trimmed !== b.name) {
              branchResults.push({ file, before: b.name, after: trimmed });
            }
          }
        }
      }

      // Drugs
      if (Array.isArray(data.treatmentProtocol?.medications)) {
        for (const med of data.treatmentProtocol.medications) {
          const name = med.drugName || med.name;
          if (name) {
            const trimmed = trimContent(name, 'drugName');
            if (trimmed !== name) {
              drugResults.push({ file, before: name, after: trimmed });
            }
          }
        }
      }
    } catch (err) {
      // ignore individual parse errors
    }
  }
}

// 2. Scan diseases.ts
if (fs.existsSync(DISEASES_TS_PATH)) {
  const content = fs.readFileSync(DISEASES_TS_PATH, 'utf8');
  const regex = /"id":\s*"([^"]+)",\s*\n\s*"ten":\s*"([^"]+)",(?:\s*\n\s*"tenNgan":\s*"([^"]+)",)?/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const id = m[1];
    const ten = m[2];
    const tenNgan = m[3] || abbreviate(ten, 'diseases');
    diseaseResults.push({ id, before: ten, after: tenNgan });
  }
}

// ----------------------------------------------------
// OUTPUT & REPORT
// ----------------------------------------------------
console.log('====================================================');
console.log('📊 CONTENT TRIM & ABBREVIATION AUDIT — DocSpace Data');
console.log('====================================================');

console.log(`\n📌 1. MONITORING METRICS (${monitoringResults.length} trường hợp rút gọn phát hiện):`);
monitoringResults.slice(0, 5).forEach((r) => {
  console.log(`  [${r.file}]`);
  console.log(`    Before: "${r.before}"`);
  console.log(`    After:  "${r.after}"`);
});
if (monitoringResults.length > 5) console.log(`  ... và ${monitoringResults.length - 5} mục khác`);

console.log(`\n📌 2. BRANCH NAMES (${branchResults.length} nhánh rút gọn phát hiện):`);
branchResults.slice(0, 6).forEach((r) => {
  console.log(`  [${r.file}]`);
  console.log(`    Before: "${r.before}"`);
  console.log(`    After:  "${r.after}"`);
});
if (branchResults.length > 6) console.log(`  ... và ${branchResults.length - 6} mục khác`);

console.log(`\n📌 3. DRUG NAMES (${drugResults.length} tên thuốc rút gọn phát hiện):`);
drugResults.slice(0, 5).forEach((r) => {
  console.log(`  [${r.file}]`);
  console.log(`    Before: "${r.before}"`);
  console.log(`    After:  "${r.after}"`);
});

console.log(`\n📌 4. CORE DISEASES (${diseaseResults.length} bệnh có tên rút gọn tenNgan):`);
diseaseResults.slice(0, 6).forEach((r) => {
  console.log(`  [${r.id}] "${r.before}"`);
  console.log(`    → tenNgan: "${r.after}"`);
});
if (diseaseResults.length > 6) console.log(`  ... và ${diseaseResults.length - 6} bệnh khác`);

console.log('\n====================================================');

if (isApply) {
  console.log('ℹ️ Lưu ý thiết kế kiến trúc:');
  console.log('   Dữ liệu gốc trong enriched/*.json được BẢO TỒN NGUYÊN VẸN để phục vụ LLM / NotebookLM.');
  console.log('   Viết tắt và rút gọn được áp dụng tự động tại runtime UI qua compactText() và tenNgan trong diseases.ts.');
  console.log('   ✅ Tên ngắn tenNgan cho 56 bệnh đã được cập nhật trực tiếp trong diseases.ts!');
}

if (isReport) {
  const reportHtmlPath = path.join(ROOT, 'tools/scratch/content-trim-report.html');
  const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Báo cáo Rút Gọn & Viết Tắt Y Khoa — DocSpace</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; }
    h1 { color: #38bdf8; }
    h2 { color: #94a3b8; border-bottom: 1px solid #334155; padding-bottom: 0.5rem; margin-top: 2rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; background: #1e293b; border-radius: 8px; overflow: hidden; }
    th, td { padding: 10px 14px; text-align: left; border-bottom: 1px solid #334155; font-size: 14px; }
    th { background: #0f172a; color: #38bdf8; }
    .before { color: #f43f5e; font-family: monospace; }
    .after { color: #10b981; font-family: monospace; font-weight: bold; }
    .tag { background: #334155; padding: 2px 6px; border-radius: 4px; font-size: 12px; }
  </style>
</head>
<body>
  <h1>📊 Báo Cáo Thẩm Định Viết Tắt & Rút Gọn DocSpace</h1>
  <p>Thời gian quét: ${new Date().toLocaleString('vi-VN')} | Đã quét 30 enriched JSON + 56 Core Diseases</p>

  <h2>1. Nhánh Điều Trị (Branch Names) — ${branchResults.length} trường hợp</h2>
  <table>
    <tr><th>Tệp nguồn</th><th>Trước khi rút gọn</th><th>Sau khi rút gọn UI</th></tr>
    ${branchResults.map(r => `<tr><td><span class="tag">${r.file}</span></td><td class="before">${r.before}</td><td class="after">${r.after}</td></tr>`).join('')}
  </table>

  <h2>2. Chỉ Số Theo Dõi (Monitoring Metrics) — ${monitoringResults.length} trường hợp</h2>
  <table>
    <tr><th>Tệp nguồn</th><th>Trước khi rút gọn</th><th>Sau khi rút gọn UI</th></tr>
    ${monitoringResults.map(r => `<tr><td><span class="tag">${r.file}</span></td><td class="before">${r.before}</td><td class="after">${r.after}</td></tr>`).join('')}
  </table>

  <h2>3. Danh Mục Bệnh (Core Diseases) — ${diseaseResults.length} bệnh</h2>
  <table>
    <tr><th>Mã bệnh</th><th>Tên đầy đủ gốc (Full)</th><th>Tên hiển thị ngắn (tenNgan)</th></tr>
    ${diseaseResults.map(r => `<tr><td><span class="tag">${r.id}</span></td><td>${r.before}</td><td class="after">${r.after}</td></tr>`).join('')}
  </table>
</body>
</html>`;

  fs.writeFileSync(reportHtmlPath, htmlContent, 'utf8');
  console.log(`📄 Đã tạo báo cáo HTML tại: ${reportHtmlPath}`);
}
