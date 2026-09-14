#!/usr/bin/env node

/**
 * CliniPortal DocSpace — Prompt 06 & 07 Automated Ingestion CLI
 * 
 * Tự động bóc tách, chuẩn hóa và nạp toàn bộ dữ liệu từ tệp đầu ra Prompt 06 & 07 (NotebookLM/LLM)
 * vào hệ sinh thái CliniPortal DocSpace:
 *   1. Ca lâm sàng mẫu -> src/content/knowledge-vault/data/sample-clinical-cases.json
 *   2. Triệu chứng mới -> src/content/knowledge-vault/data/clinical-rules-symptoms.json
 *   3. Thực thể bệnh & Trọng số CDSS -> src/content/knowledge-vault/data/diseases/<chuyen-khoa>.json
 *   4. Đồng bộ Master KB -> bundle-clinical-rules.mjs
 *   5. Hồ sơ ca bệnh thực chiến SOAP Markdown -> src/content/knowledge-vault/ba/<caseId>.md
 *   6. Đồng bộ Catalog thực hành -> ingest-notebooklm-case.mjs
 *   7. Kiểm tra & Báo cáo Audit 10 tiêu chí DocSpace
 * 
 * Cú pháp:
 *   node tools/scripts/ingest-prompt-06-07.mjs <duong-dan-file.md>
 * 
 * Ví dụ:
 *   node tools/scripts/ingest-prompt-06-07.mjs "src/content/docspace/docs/ND_Prompt 06,07.md"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const VAULT_DATA_DIR = path.join(ROOT_DIR, 'src/content/knowledge-vault/data');
const DISEASES_DIR = path.join(VAULT_DATA_DIR, 'diseases');
const SYMPTOMS_PATH = path.join(VAULT_DATA_DIR, 'clinical-rules-symptoms.json');
const SAMPLE_CASES_PATH = path.join(VAULT_DATA_DIR, 'sample-clinical-cases.json');
const BA_DIR = path.join(ROOT_DIR, 'src/content/knowledge-vault/ba');

const SPECIALTY_FILE_MAP = {
  'truyền nhiễm': 'truyen-nhiem.json',
  'nhiễm': 'truyen-nhiem.json',
  'hô hấp': 'ho-hap.json',
  'tim mạch': 'tim-mach.json',
  'tiêu hóa': 'tieu-hoa.json',
  'tiết niệu': 'tiet-nieu.json',
  'nội tiết': 'noi-tiet.json',
  'thần kinh': 'than-kinh.json',
  'toàn thân': 'toan-than.json',
  'sản phụ khoa': 'san-phu-khoa.json',
};

function cleanJsonString(str) {
  return str
    .replace(/,\s*([\]}])/g, '$1') // Bỏ trailing commas
    .trim();
}

function parseJsonSafe(str, label) {
  try {
    return JSON.parse(str);
  } catch (e1) {
    try {
      return JSON.parse(cleanJsonString(str));
    } catch (e2) {
      console.error(`❌ Không thể phân tích JSON cho ${label}:`, e2.message);
      return null;
    }
  }
}

function runIngestion(inputFile) {
  console.log(`\n🚀 =============================================================`);
  console.log(`   CLINIPORTAL DOCSPACE — INGESTION PIPELINE (PROMPT 06 & 07)`);
  console.log(`   Tệp nguồn: ${inputFile}`);
  console.log(`=============================================================\n`);

  const fullPath = path.resolve(process.cwd(), inputFile);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Không tìm thấy tệp: ${fullPath}`);
    process.exit(1);
  }

  const rawText = fs.readFileSync(fullPath, 'utf8');

  // ─────────────────────────────────────────────────────────────
  // BƯỚC 1: TRÍCH XUẤT CÁC KHỐI DỮ LIỆU
  // ─────────────────────────────────────────────────────────────
  console.log('🔍 [1/6] Đang phân tích cú pháp các khối dữ liệu trong tệp...');

  // 1.1 Tìm các khối JSON code block
  const jsonBlocks = [];
  const jsonRegex = /```(?:json)?\r?\n([\s\S]*?)\r?\n```/g;
  let match;
  while ((match = jsonRegex.exec(rawText)) !== null) {
    const code = match[1].trim();
    if (code.startsWith('{') || code.startsWith('[')) {
      jsonBlocks.push(code);
    }
  }

  let sampleCaseJson = null;
  let symptomsJson = null;
  let diseaseEntityJson = null;

  for (const block of jsonBlocks) {
    const parsed = parseJsonSafe(block, 'JSON Block');
    if (!parsed) continue;

    // Phân loại khối JSON
    if (Array.isArray(parsed)) {
      // Mảng triệu chứng
      if (parsed.length > 0 && parsed[0].id && parsed[0].ten && parsed[0].nhom) {
        symptomsJson = parsed;
      }
    } else if (typeof parsed === 'object') {
      if (parsed.ten && parsed.vitals && parsed.form) {
        // Ca lâm sàng mẫu
        sampleCaseJson = parsed;
      } else if (parsed.id && parsed.ten && (parsed.dd || parsed.phacDo)) {
        // Thực thể bệnh
        diseaseEntityJson = parsed;
      }
    }
  }

  // 1.2 Trích xuất Prompt 07 (YAML Frontmatter + SOAP Markdown Body)
  let soapFrontmatter = '';
  let soapBody = '';
  let soapCaseId = '';

  // Tìm khối YAML (hỗ trợ cả ```yaml ... ``` lẫn block --- ... --- chứa caseId)
  const yamlBlockMatch = rawText.match(/```yaml\r?\n([\s\S]*?)\r?\n```/);
  const dashedMatches = [...rawText.matchAll(/(?:^|\n)---\r?\n([\s\S]*?)\r?\n---\r?\n/g)];
  const dashedYamlMatch = dashedMatches.find(m => m[1].includes('caseId:') && (m[1].includes('title:') || m[1].includes('specialty:')));

  if (yamlBlockMatch) {
    soapFrontmatter = yamlBlockMatch[1].trim();
  } else if (dashedYamlMatch) {
    soapFrontmatter = dashedYamlMatch[1].trim();
  }

  if (soapFrontmatter) {
    const idMatch = soapFrontmatter.match(/caseId:\s*["']?([^"'\r\n]+)["']?/);
    if (idMatch) {
      soapCaseId = idMatch[1].trim();
    }
  }

  // Tìm thân bài SOAP
  if (dashedYamlMatch) {
    const startIdx = dashedYamlMatch.index + dashedYamlMatch[0].length;
    let bodyCandidate = rawText.slice(startIdx).trim();
    bodyCandidate = bodyCandidate.replace(/\r?\n```[\s\S]*$/, '').replace(/\r?\n---\s*$/, '').trim();
    soapBody = bodyCandidate;
  } else {
    const soapBodyStartIdx = rawText.search(/(?:#\s*🩺|###?\s*1\.\s*📝\s*S|####?\s*1\.\s*📝\s*S|#\s*Ca Lâm Sàng)/i);
    if (soapBodyStartIdx !== -1) {
      let bodyCandidate = rawText.slice(soapBodyStartIdx).trim();
      const endNoteIdx = bodyCandidate.search(/(?:Hồ sơ bệnh án SOAP chuẩn|💡 Nếu bạn muốn chuyển đổi)/i);
      if (endNoteIdx !== -1) {
        bodyCandidate = bodyCandidate.slice(0, endNoteIdx).trim();
      }
      soapBody = bodyCandidate;
    }
  }

  // Báo cáo kết quả bóc tách
  console.log(`   ➔ Ca mẫu (Prompt 06 - P1): ${sampleCaseJson ? '✅ Tìm thấy' : '❌ Không tìm thấy'}`);
  console.log(`   ➔ Triệu chứng (Prompt 06 - P2.1): ${symptomsJson ? `✅ Tìm thấy (${symptomsJson.length} mục)` : '❌ Không tìm thấy'}`);
  console.log(`   ➔ Bệnh lý & Trọng số CDSS (Prompt 06 - P2.2): ${diseaseEntityJson ? `✅ Tìm thấy [${diseaseEntityJson.id}]` : '❌ Không tìm thấy'}`);
  console.log(`   ➔ Hồ sơ SOAP (Prompt 07): ${soapCaseId ? `✅ Tìm thấy [${soapCaseId}]` : '❌ Không tìm thấy'}`);

  if (!sampleCaseJson && !symptomsJson && !diseaseEntityJson && !soapCaseId) {
    console.error('\n❌ Không thể bóc tách bất kỳ khối dữ liệu hợp lệ nào từ tệp nguồn. Vui lòng kiểm tra định dạng.');
    process.exit(1);
  }

  // ─────────────────────────────────────────────────────────────
  // BƯỚC 2: NẠP TỪ ĐIỂN TRIỆU CHỨNG (clinical-rules-symptoms.json)
  // ─────────────────────────────────────────────────────────────
  console.log('\n📝 [2/6] Đang cập nhật từ điển triệu chứng...');
  if (fs.existsSync(SYMPTOMS_PATH)) {
    let existingSymptoms = JSON.parse(fs.readFileSync(SYMPTOMS_PATH, 'utf8'));
    const existingIds = new Set(existingSymptoms.map(s => s.id));
    let addedSymCount = 0;

    if (symptomsJson) {
      for (const sym of symptomsJson) {
        if (!existingIds.has(sym.id)) {
          existingSymptoms.push(sym);
          existingIds.add(sym.id);
          addedSymCount++;
        }
      }
    }

    // Kiểm tra thêm các triệu chứng trong negated/selected của ca mẫu để chống orphan
    if (sampleCaseJson) {
      const allSampleSyms = [...(sampleCaseJson.sel || []), ...(sampleCaseJson.selected || []), ...(sampleCaseJson.negated || [])];
      for (const symId of allSampleSyms) {
        if (!existingIds.has(symId)) {
          console.warn(`   ⚠️ Phát hiện triệu chứng [${symId}] từ ca mẫu chưa có trong từ điển. Đang tự động bổ sung...`);
          existingSymptoms.push({
            id: symId,
            ten: symId.replace(/_/g, ' '),
            nhom: 'Lâm sàng',
            loai: ['tt'],
            tuKhoa: [symId.replace(/_/g, ' ')],
            map: null
          });
          existingIds.add(symId);
          addedSymCount++;
        }
      }
    }

    // Kiểm tra thêm các triệu chứng trong ma trận dd của thực thể bệnh để chống orphan
    if (diseaseEntityJson && Array.isArray(diseaseEntityJson.dd)) {
      for (const [symId] of diseaseEntityJson.dd) {
        if (!existingIds.has(symId)) {
          console.warn(`   ⚠️ Phát hiện triệu chứng [${symId}] từ ma trận dd chưa có trong từ điển. Đang tự động bổ sung...`);
          existingSymptoms.push({
            id: symId,
            ten: symId.replace(/_/g, ' '),
            nhom: 'Cận lâm sàng',
            loai: ['cls'],
            tuKhoa: [symId.replace(/_/g, ' ')],
            map: null
          });
          existingIds.add(symId);
          addedSymCount++;
        }
      }
    }

    if (addedSymCount > 0) {
      fs.writeFileSync(SYMPTOMS_PATH, JSON.stringify(existingSymptoms, null, 2) + '\n', 'utf8');
      console.log(`   ✅ Đã thêm ${addedSymCount} triệu chứng mới vào clinical-rules-symptoms.json`);
    } else {
      console.log(`   ℹ️ Toàn bộ triệu chứng đã tồn tại trong từ điển, không cần cập nhật thêm.`);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // BƯỚC 3: NẠP THỰC THỂ BỆNH & TRỌNG SỐ CDSS (diseases/<chuyen-khoa>.json)
  // ─────────────────────────────────────────────────────────────
  console.log('\n🩺 [3/6] Đang cập nhật tệp bệnh lý chuyên khoa & CDSS...');
  if (diseaseEntityJson) {
    const rawNhom = (diseaseEntityJson.nhom || 'truyền nhiễm').toLowerCase().trim();
    let targetFileName = SPECIALTY_FILE_MAP[rawNhom] || 'truyen-nhiem.json';

    // Tìm file tương ứng
    for (const [key, fname] of Object.entries(SPECIALTY_FILE_MAP)) {
      if (rawNhom.includes(key)) {
        targetFileName = fname;
        break;
      }
    }

    const targetFilePath = path.join(DISEASES_DIR, targetFileName);
    if (!fs.existsSync(targetFilePath)) {
      console.error(`❌ Không tìm thấy tệp chuyên khoa: ${targetFilePath}`);
    } else {
      let diseases = JSON.parse(fs.readFileSync(targetFilePath, 'utf8'));
      const existingIdx = diseases.findIndex(d => d.id === diseaseEntityJson.id);

      if (existingIdx >= 0) {
        diseases[existingIdx] = diseaseEntityJson;
        console.log(`   ✅ Đã cập nhật thực thể bệnh [${diseaseEntityJson.id}] trong ${targetFileName}`);
      } else {
        diseases.push(diseaseEntityJson);
        console.log(`   ✅ Đã thêm mới thực thể bệnh [${diseaseEntityJson.id}] vào ${targetFileName}`);
      }
      fs.writeFileSync(targetFilePath, JSON.stringify(diseases, null, 2) + '\n', 'utf8');

      // Đồng bộ Master KB
      console.log('   🔄 Đang đồng bộ Master KB (bundle-clinical-rules.mjs)...');
      try {
        execSync(`node tools/scripts/bundle-clinical-rules.mjs`, { cwd: ROOT_DIR, stdio: 'pipe' });
        console.log('   ✅ Đã đồng bộ Master KB clinical-rules-kb.json thành công.');
      } catch (err) {
        console.warn('   ⚠️ Không thể chạy bundle-clinical-rules.mjs:', err.message);
      }
    }
  }

  // ─────────────────────────────────────────────────────────────
  // BƯỚC 4: NẠP CA LÂM SÀNG MẪU (sample-clinical-cases.json)
  // ─────────────────────────────────────────────────────────────
  console.log('\n📋 [4/6] Đang cập nhật ca lâm sàng mẫu (sample-clinical-cases.json)...');
  if (sampleCaseJson && fs.existsSync(SAMPLE_CASES_PATH)) {
    let sampleCases = JSON.parse(fs.readFileSync(SAMPLE_CASES_PATH, 'utf8'));
    const existingIdx = sampleCases.findIndex(c => c.ten === sampleCaseJson.ten);

    if (existingIdx >= 0) {
      sampleCases[existingIdx] = sampleCaseJson;
      console.log(`   ✅ Đã cập nhật ca mẫu: "${sampleCaseJson.ten}"`);
    } else {
      sampleCases.push(sampleCaseJson);
      console.log(`   ✅ Đã thêm mới ca mẫu: "${sampleCaseJson.ten}"`);
    }
    fs.writeFileSync(SAMPLE_CASES_PATH, JSON.stringify(sampleCases, null, 2) + '\n', 'utf8');
  }

  // ─────────────────────────────────────────────────────────────
  // BƯỚC 5: NẠP CA THỰC CHIẾN SOAP MARKDOWN & ĐỒNG BỘ CATALOG
  // ─────────────────────────────────────────────────────────────
  console.log('\n📖 [5/6] Đang lưu trữ ca thực chiến SOAP Markdown...');
  if (soapCaseId && soapFrontmatter && soapBody) {
    const soapFileName = `${soapCaseId}.md`;
    const soapFilePath = path.join(BA_DIR, soapFileName);

    const fullSoapContent = `---\n${soapFrontmatter}\n---\n\n${soapBody}\n`;
    fs.writeFileSync(soapFilePath, fullSoapContent, 'utf8');
    console.log(`   ✅ Đã ghi tệp SOAP: ${soapFilePath}`);

    console.log('   🔄 Đang đồng bộ catalog (ingest-notebooklm-case.mjs)...');
    try {
      execSync(`node tools/scripts/ingest-notebooklm-case.mjs "${soapFilePath}"`, { cwd: ROOT_DIR, stdio: 'pipe' });
      console.log('   ✅ Đã nạp thành công vào vault-catalog-thuc-hanh.json và vault-catalog.json.');
    } catch (err) {
      console.warn('   ⚠️ Không thể chạy ingest-notebooklm-case.mjs:', err.message);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // BƯỚC 6: CHẠY AUDIT KIỂM ĐỊNH TÍCH HỢP
  // ─────────────────────────────────────────────────────────────
  console.log('\n🧪 [6/6] Đang chạy kiểm định toàn diện...');

  const diseaseSlug = diseaseEntityJson?.id || (sampleCaseJson?.sel?.[0]?.split('_')?.[0] || 'unknown');
  try {
    console.log(`\n--- KIỂM TRA BỆNH LÝ [${diseaseSlug}] ---`);
    const auditOutput = execSync(`node tools/scripts/docspace-disease-audit.mjs "${diseaseSlug}"`, { cwd: ROOT_DIR, encoding: 'utf8' });
    console.log(auditOutput);
  } catch (err) {
    if (err.stdout) console.log(err.stdout);
  }

  console.log(`\n🎉 HOÀN TẤT NẠP DỮ LIỆU TỪ PROMPT 06 & 07!`);
}

// Chạy script
const targetFile = process.argv[2];
if (!targetFile) {
  console.log(`
Cách sử dụng:
  node tools/scripts/ingest-prompt-06-07.mjs <duong-dan-file.md>

Ví dụ:
  node tools/scripts/ingest-prompt-06-07.mjs "src/content/docspace/docs/ND_Prompt 06,07.md"
`);
  process.exit(0);
}

runIngestion(targetFile);
