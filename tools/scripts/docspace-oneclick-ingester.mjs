#!/usr/bin/env node

/**
 * CliniPortal DocSpace — One-Click Master Ingestion Engine
 * 
 * Bộ nạp 1 chạm thông minh tự động nhận diện và xử lý toàn diện mọi định dạng tri thức:
 *   - Prompt 05: Enriched CDSS JSON (Phân độ nặng, Bảng 3 cột, Phác đồ 9 phân mục, Kháng sinh...)
 *   - Prompt 06 & 07: Ca lâm sàng mẫu + Trọng số suy luận CDSS + Hồ sơ SOAP Markdown
 *   - Prompt 07 Standalone: Bệnh án lâm sàng thực chiến S-O-A-P Markdown thô (tự khử HTML entities, tự tổng hợp Frontmatter)
 * 
 * Tự động kích hoạt chuỗi xử lý:
 *   1. Auto-Sanitizer & Frontmatter Synthesizer
 *   2. CDSS Rule Bundle & Dynamic Index Sync
 *   3. Knowledge Vault BA Catalog Indexing
 *   4. Quality Gate 1: Medical QA Gate (6/6 Pillars)
 *   5. Quality Gate 2: Vault Readiness Check (15/15 Criteria)
 * 
 * Cú pháp:
 *   node tools/scripts/docspace-oneclick-ingester.mjs <duong-dan-file-hoac-thu-muc>
 *   node tools/scripts/docspace-oneclick-ingester.mjs --text "<noi-dung-hoac-json>"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { resolveSymptom, registerNewSymptom } from './fuzzy-alias-resolver.mjs';
import { bundleSymptoms } from './bundle-symptoms.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const ENRICHED_DIR = path.join(ROOT_DIR, 'src/content/docspace/data/enriched');
const BA_DIR = path.join(ROOT_DIR, 'src/content/knowledge-vault/ba');

/**
 * Khử HTML entities thường gặp từ output LLM/NotebookLM
 */
function sanitizeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

/**
 * Nhận diện loại nội dung đầu vào
 */
function detectContentType(content) {
  const clean = sanitizeHtmlEntities(content).trim();

  // 1. Kiểm tra JSON thuần
  if ((clean.startsWith('{') && clean.endsWith('}')) || (clean.startsWith('[') && clean.endsWith(']'))) {
    try {
      const parsed = JSON.parse(clean);
      if (parsed.slug && (parsed.severityGrading || parsed.treatmentStrategyTable || parsed.protocol)) {
        return { type: 'PROMPT_05_ENRICHED', data: parsed };
      }
      if (parsed.sampleCases || parsed.rulesWeightMatrix || parsed.triệuChứngMới) {
        return { type: 'PROMPT_06_WEIGHTS', data: parsed };
      }
      return { type: 'GENERIC_JSON', data: parsed };
    } catch {
      // Có thể là JSON có trailing commas hoặc text bọc ngoài
    }
  }

  // 2. Kiểm tra Prompt 06 & 07 kết hợp (có code blocks JSON và đề mục SOAP)
  const hasJsonBlock = /```(?:json)?[\s\S]*?```/.test(clean);
  const hasSoapHeaders = /#{1,4}\s*(?:1[.)]\s*)?(?:📝\s*)?(?:S\b|Chủ quan|Subjective)/i.test(clean);

  if (hasJsonBlock && hasSoapHeaders) {
    return { type: 'PROMPT_06_07_COMBO', data: clean };
  }

  // 3. Kiểm tra Prompt 07 Standalone (SOAP Markdown)
  if (hasSoapHeaders || /BỆNH ÁN LÂM SÀNG\s*(?:S-O-A-P)?/i.test(clean)) {
    return { type: 'PROMPT_07_SOAP', data: clean };
  }

  // 4. Kiểm tra Prompt 05 dạng Markdown bọc JSON
  const jsonMatch = clean.match(/```(?:json)?\r?\n([\s\S]*?)\r?\n```/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[1].trim());
      if (parsed.slug && (parsed.severityGrading || parsed.treatmentStrategyTable || parsed.protocol)) {
        return { type: 'PROMPT_05_ENRICHED', data: parsed };
      }
    } catch {}
  }

  return { type: 'UNKNOWN', data: clean };
}

/**
 * Xử lý nạp Prompt 05 (Enriched CDSS JSON)
 */
function handlePrompt05(enrichedData) {
  console.log(`\n📦 [Xử lý Prompt 05] Enriched CDSS JSON: ${enrichedData.diseaseName || enrichedData.slug}...`);
  if (!fs.existsSync(ENRICHED_DIR)) {
    fs.mkdirSync(ENRICHED_DIR, { recursive: true });
  }

  // 1. Phân giải và chuẩn hóa symptomIds trong criteria[] qua Fuzzy Alias Resolver
  if (Array.isArray(enrichedData.criteria)) {
    let resolvedCount = 0;
    enrichedData.criteria.forEach(c => {
      if (Array.isArray(c.symptomIds)) {
        c.symptomIds = c.symptomIds.map(symId => {
          const res = resolveSymptom(symId);
          if (!res.isNew) {
            if (res.resolvedId !== symId) {
              console.log(`   🔄 Criteria [${c.id}]: Ánh xạ [${symId}] -> [${res.resolvedId}] (${res.matchType})`);
            }
            resolvedCount++;
            return res.resolvedId;
          }
          console.warn(`   ✨ Triệu chứng mới trong criteria [${c.id}]: [${symId}]. Đang tự động đăng ký...`);
          registerNewSymptom({
            id: symId,
            ten: symId.replace(/_/g, ' '),
            nhom: 'Toàn thân',
            loai: ['tt'],
            tuKhoa: [symId.replace(/_/g, ' ')],
            aliases: []
          });
          return symId;
        });
      }
    });
    if (resolvedCount > 0) {
      console.log(`   ✅ Đã phân giải và đối soát ${resolvedCount} liên kết symptomIds trong criteria.`);
    }
  }

  // 2. Xử lý mảng trieuChungMoi nếu có
  if (Array.isArray(enrichedData.trieuChungMoi)) {
    for (const sym of enrichedData.trieuChungMoi) {
      const res = resolveSymptom(sym.id);
      if (res.isNew) {
        registerNewSymptom(sym);
      } else {
        console.log(`   ℹ️ Triệu chứng mới đề xuất [${sym.id}] đã trùng với mã [${res.resolvedId}]. Bỏ qua.`);
      }
    }
  }

  const slug = enrichedData.slug || 'benh-chuyen-sau';
  const destPath = path.join(ENRICHED_DIR, `${slug}.json`);
  fs.writeFileSync(destPath, JSON.stringify(enrichedData, null, 2), 'utf8');
  console.log(`   ✅ Đã lưu Enriched JSON: ${destPath}`);

  // Biên dịch index
  try {
    execSync(`node tools/scripts/build-enriched-cdss.mjs`, { cwd: ROOT_DIR, stdio: 'inherit' });
  } catch (err) {
    console.warn(`   ⚠️ Cảnh báo build-enriched-cdss: ${err.message}`);
  }

  return { success: true, file: destPath };
}

/**
 * Xử lý nạp Prompt 06 & 07 Combo
 */
function handlePrompt0607(filePath) {
  console.log(`\n🚀 [Xử lý Prompt 06 & 07] Chuyển giao sang ingest-prompt-06-07.mjs...`);
  try {
    execSync(`node tools/scripts/ingest-prompt-06-07.mjs "${filePath}"`, { cwd: ROOT_DIR, stdio: 'inherit' });
    return { success: true, file: filePath };
  } catch (err) {
    console.error(`   ❌ Lỗi khi nạp Prompt 06-07: ${err.message}`);
    return { success: false, error: err.message };
  }
}

/**
 * Xử lý nạp Prompt 07 Standalone SOAP
 */
function handlePrompt07(content, originalPath = '') {
  console.log(`\n📋 [Xử lý Prompt 07] Hồ sơ ca thực chiến S-O-A-P...`);
  const sanitized = sanitizeHtmlEntities(content);

  // Lưu file tạm nếu đầu vào là raw text
  let targetPath = originalPath;
  if (!targetPath || !fs.existsSync(targetPath)) {
    if (!fs.existsSync(BA_DIR)) {
      fs.mkdirSync(BA_DIR, { recursive: true });
    }
    const tempName = `temp-soap-${Date.now()}.md`;
    targetPath = path.join(BA_DIR, tempName);
    fs.writeFileSync(targetPath, sanitized, 'utf8');
  }

  try {
    execSync(`node tools/scripts/ingest-notebooklm-case.mjs "${targetPath}"`, { cwd: ROOT_DIR, stdio: 'inherit' });
    return { success: true, file: targetPath };
  } catch (err) {
    console.error(`   ❌ Lỗi khi nạp SOAP case: ${err.message}`);
    return { success: false, error: err.message };
  }
}

/**
 * Chạy các cổng kiểm định chất lượng tự động
 */
function runQualityGates() {
  console.log(`\n` + `═`.repeat(70));
  console.log(`🛡️  TIẾN HÀNH KIỂM ĐỊNH CHẤT LƯỢNG 2 CẤP ĐỘ (QUALITY GATES)`);
  console.log(`═`.repeat(70));

  let qaGatePassed = false;
  let readinessPassed = false;

  // Gate 1: Medical QA Gate (6 Pillars)
  try {
    console.log(`\n🩺 [CỔNG 1] Khởi chạy Medical QA Gate (6/6 Pillars)...`);
    execSync(`node tools/qa/docspace-medical-qa-gate.mjs`, { cwd: ROOT_DIR, stdio: 'inherit' });
    qaGatePassed = true;
  } catch (err) {
    console.error(`❌ [CỔNG 1 THẤT BẠI]: Medical QA Gate phát hiện vi phạm tiêu chuẩn EBM!`);
  }

  // Gate 2: Vault Readiness Check (15 Criteria)
  try {
    console.log(`\n🏛️  [CỔNG 2] Khởi chạy Vault Readiness Check (15/15 Criteria)...`);
    execSync(`node tools/scripts/vault-readiness-check.mjs`, { cwd: ROOT_DIR, stdio: 'inherit' });
    readinessPassed = true;
  } catch (err) {
    console.error(`❌ [CỔNG 2 THẤT BẠI]: Vault Readiness Audit chưa đạt 100%!`);
  }

  return { qaGatePassed, readinessPassed };
}

/**
 * Main Runner
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║        🩺 CLINIPORTAL DOCSPACE — ONE-CLICK MASTER INGESTER          ║
╚══════════════════════════════════════════════════════════════════════╝

Công cụ nạp 1 chạm thông minh cho tri thức Y khoa DocSpace:
  - Tự động nhận diện Prompt 05 (Enriched CDSS JSON)
  - Tự động nhận diện Prompt 06 & 07 (Ca mẫu + Ma trận CDSS + SOAP)
  - Tự động nhận diện Prompt 07 (Bệnh án SOAP Markdown thô)
  - Khử 100% HTML entities (&gt;, &lt;, &amp;...)
  - Tự động tổng hợp Frontmatter nếu thiếu
  - Tự động gom cụm CDSS, đồng bộ Catalog Vault và chạy 2 Cổng QA

Cách dùng:
  node tools/scripts/docspace-oneclick-ingester.mjs <file.md|file.json|thu_muc>
  node tools/scripts/docspace-oneclick-ingester.mjs --text "<nội dung>"

Ví dụ:
  node tools/scripts/docspace-oneclick-ingester.mjs "src/content/docspace/docs/ND_Prompt 06,07.md"
  node tools/scripts/docspace-oneclick-ingester.mjs src/content/knowledge-vault/ba/
`);
    process.exit(0);
  }

  let rawContent = '';
  let inputFilePath = '';

  if (args[0] === '--text' && args[1]) {
    rawContent = args[1];
  } else {
    inputFilePath = path.resolve(args[0]);
    if (!fs.existsSync(inputFilePath)) {
      console.error(`❌ Lỗi: Không tìm thấy đường dẫn: ${inputFilePath}`);
      process.exit(1);
    }

    const stat = fs.statSync(inputFilePath);
    if (stat.isDirectory()) {
      console.log(`📁 Phát hiện thư mục: ${inputFilePath}. Quét toàn bộ file...`);
      const files = fs.readdirSync(inputFilePath).filter(f => f.endsWith('.md') || f.endsWith('.json'));
      console.log(`   Tìm thấy ${files.length} tệp cần xử lý.`);
      for (const f of files) {
        const full = path.join(inputFilePath, f);
        console.log(`\n─── Xử lý [${f}] ───`);
        const content = fs.readFileSync(full, 'utf8');
        const detected = detectContentType(content);
        if (detected.type === 'PROMPT_05_ENRICHED') handlePrompt05(detected.data);
        else if (detected.type === 'PROMPT_06_07_COMBO') handlePrompt0607(full);
        else if (detected.type === 'PROMPT_07_SOAP') handlePrompt07(content, full);
      }
      runQualityGates();
      process.exit(0);
    } else {
      rawContent = fs.readFileSync(inputFilePath, 'utf8');
    }
  }

  console.log(`🔍 Đang phân tích định dạng đầu vào...`);
  const detected = detectContentType(rawContent);
  console.log(`✨ Loại dữ liệu nhận diện được: [${detected.type}]`);

  let result = null;
  switch (detected.type) {
    case 'PROMPT_05_ENRICHED':
      result = handlePrompt05(detected.data);
      break;
    case 'PROMPT_06_07_COMBO':
      result = handlePrompt0607(inputFilePath);
      break;
    case 'PROMPT_07_SOAP':
      result = handlePrompt07(rawContent, inputFilePath);
      break;
    case 'PROMPT_06_WEIGHTS':
      console.log(`   ➔ Dữ liệu Prompt 06 JSON. Chuyển giao sang ingest-prompt-06-07.mjs...`);
      result = handlePrompt0607(inputFilePath);
      break;
    default:
      console.log(`⚠️ Không nhận diện rõ dạng prompt. Thử nạp dưới dạng SOAP Markdown...`);
      result = handlePrompt07(rawContent, inputFilePath);
      break;
  }

  // Chạy kiểm định 2 cổng
  const gates = runQualityGates();

  console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║               🎉 BÁO CÁO TỔNG KẾT NẠP 1 CHẠM DOCSPACE                ║
╚══════════════════════════════════════════════════════════════════════╝
  • Loại dữ liệu đã nạp : ${detected.type}
  • Trạng thái xử lý    : ${result?.success ? '✅ THÀNH CÔNG' : '❌ CÓ LỖI'}
  • Cổng 1 (Medical QA) : ${gates.qaGatePassed ? '✅ 6/6 PILLARS PASS' : '❌ VI PHẠM'}
  • Cổng 2 (Vault Ready): ${gates.readinessPassed ? '✅ 15/15 CRITERIA PASS' : '❌ CHƯA ĐẠT'}
══════════════════════════════════════════════════════════════════════
`);

  if (!gates.qaGatePassed || !gates.readinessPassed) {
    process.exit(1);
  }
}

main();
