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

function extractJsonBlocks(rawText) {
  const jsonBlocks = [];
  const jsonRegex = /```(?:json)?\r?\n([\s\S]*?)\r?\n```/g;
  let match;
  while ((match = jsonRegex.exec(rawText)) !== null) {
    const code = match[1].trim();
    if (code.startsWith('{') || code.startsWith('[')) {
      jsonBlocks.push(code);
    }
  }

  // Fallback nếu thiếu dấu đóng code block ```
  const sampleMatch = rawText.match(/```(?:json)?\r?\n(\s*\{\s*"ten":[\s\S]*?\n\s*\})\s*(?:\r?\n|$)(?:```|Prompt|#|\*\*\*|---)/);
  if (sampleMatch && !jsonBlocks.some(b => b.includes(sampleMatch[1].slice(0, 30)))) {
    jsonBlocks.push(sampleMatch[1].trim());
  }

  const symsMatch = rawText.match(/```(?:json)?\r?\n(\s*\[\s*\{[\s\S]*?\n\s*\])\s*(?:\r?\n|$)(?:```|Prompt|#|\*\*\*|---)/);
  if (symsMatch && !jsonBlocks.some(b => b.includes(symsMatch[1].slice(0, 30)))) {
    jsonBlocks.push(symsMatch[1].trim());
  }

  const disMatch = rawText.match(/```(?:json)?\r?\n(\s*\{\s*"id":[\s\S]*?\n\s*\})\s*(?:\r?\n|$)(?:```|Prompt|#|\*\*\*|---)/);
  if (disMatch && !jsonBlocks.some(b => b.includes(disMatch[1].slice(0, 30)))) {
    jsonBlocks.push(disMatch[1].trim());
  }

  return jsonBlocks;
}

function findEnrichedKey(diseaseEntityJson, sampleCaseJson) {
  const enrichedDir = path.join(ROOT_DIR, 'src/content/docspace/data/enriched');
  if (!fs.existsSync(enrichedDir)) return null;
  const files = fs.readdirSync(enrichedDir).filter(f => f.endsWith('.json'));
  
  const disId = (diseaseEntityJson?.id || '').toLowerCase();
  const disIcd = (diseaseEntityJson?.icd || '').toUpperCase();
  const disName = (diseaseEntityJson?.ten || sampleCaseJson?.ten || '').toLowerCase();

  // 1. Đối sánh trực tiếp theo tên file / ID
  for (const f of files) {
    const key = path.basename(f, '.json');
    const kLower = key.toLowerCase();
    if (kLower === disId || disId.includes(kLower) || kLower.includes(disId)) {
      return key;
    }
  }

  // 2. Phân tích nội dung Enriched JSON (ICD hoặc Tên bệnh)
  for (const f of files) {
    const key = path.basename(f, '.json');
    try {
      const data = JSON.parse(fs.readFileSync(path.join(enrichedDir, f), 'utf8'));
      if (disIcd && (data.icdCode === disIcd || (Array.isArray(data.icdPrefixes) && data.icdPrefixes.includes(disIcd)))) {
        return key;
      }
      if (disName && data.diseaseName) {
        const dClean = disName.split('(')[0].trim();
        const eClean = data.diseaseName.toLowerCase().split('(')[0].trim();
        if (dClean.includes(eClean) || eClean.includes(dClean)) {
          return key;
        }
      }
    } catch {}
  }
  return null;
}

function syncEnrichedIndex() {
  console.log('   🔄 Đang biên dịch CSDL Enriched CDSS (build-enriched-cdss.mjs)...');
  try {
    execSync(`node tools/scripts/build-enriched-cdss.mjs`, { cwd: ROOT_DIR, stdio: 'pipe' });
    console.log('   ✅ Đã cập nhật enriched/index.ts.');
  } catch (err) {
    console.warn('   ⚠️ Lỗi khi chạy build-enriched-cdss.mjs:', err.message);
  }
}

function syncDiagnosticCriteriaDatabase(enrichedKey, diseaseEntityJson) {
  if (!enrichedKey || !diseaseEntityJson) return;
  const dcdPath = path.join(ROOT_DIR, 'src/content/docspace/data/diagnostic-criteria-database.ts');
  if (!fs.existsSync(dcdPath)) return;

  let content = fs.readFileSync(dcdPath, 'utf8');
  const idsToCheck = [
    diseaseEntityJson.id,
    diseaseEntityJson.id.replace(/_/g, '-'),
    diseaseEntityJson.id.replace(/-/g, '_'),
    enrichedKey,
    enrichedKey.toLowerCase()
  ];

  const uniqueIds = [...new Set(idsToCheck)];
  const missingIds = uniqueIds.filter(id => !content.includes(`'${id}':`) && !content.includes(`"${id}":`));
  if (missingIds.length === 0) return;

  console.log(`   🔗 Đang đăng ký alias cho [${missingIds.join(', ')}] -> ENRICHED_DISEASES['${enrichedKey}']...`);
  const anchor = '...ENRICHED_DISEASES,';
  const anchorIdx = content.indexOf(anchor);
  if (anchorIdx !== -1) {
    const insertLines = missingIds.map(id => `  '${id}': ENRICHED_DISEASES['${enrichedKey}'],`).join('\n') + '\n';
    content = content.slice(0, anchorIdx + anchor.length) + '\n' + insertLines + content.slice(anchorIdx + anchor.length + 1);
    fs.writeFileSync(dcdPath, content, 'utf8');
    console.log(`   ✅ Đã tự động cập nhật diagnostic-criteria-database.ts`);
  }
}

function syncEpidemiologyContextDatabase(enrichedKey, diseaseEntityJson, sampleCaseJson) {
  const epiPath = path.join(ROOT_DIR, 'src/content/docspace/src/data/epidemiology-context-database.ts');
  if (!fs.existsSync(epiPath)) return;

  let content = fs.readFileSync(epiPath, 'utf8');
  const keysToCheck = [enrichedKey, diseaseEntityJson?.id].filter(Boolean);
  const alreadyHas = keysToCheck.some(k => content.includes(`${k}:`) || content.includes(`'${k}':`));
  if (alreadyHas) return;

  const targetKey = enrichedKey || diseaseEntityJson.id;
  console.log(`   🌍 Đang tự động cấu hình hồ sơ Dịch tễ học cho [${targetKey}]...`);

  const epi = sampleCaseJson?.epiContext || {};
  const form = sampleCaseJson?.form || {};

  const profile = `  ${targetKey}: {
    diseaseId: '${targetKey}',
    diseaseName: '${(diseaseEntityJson?.ten || form?.lyDo || targetKey).replace(/'/g, "\\'")}',
    icdCode: '${diseaseEntityJson?.icd || 'B99'}',
    specialty: '${diseaseEntityJson?.nhom || 'Truyền nhiễm'}',
    endemicAreas: [${JSON.stringify(epi.endemicArea || 'Việt Nam (Toàn quốc)')}, 'Toàn quốc'],
    peakSeasons: [${JSON.stringify(epi.seasonalContext || 'Quanh năm (Bệnh nhiễm vi rút/vi khuẩn lưu hành quanh năm)')}],
    vectors: [${JSON.stringify(epi.vectorExposure || 'Không qua vector côn trùng; lây truyền theo đường bệnh học đặc thù')}],
    occupationalRisks: ['Nhân viên y tế phơi nhiễm nghề nghiệp', 'Người lao động có nguy cơ tiếp xúc'],
    foodWaterRisks: ['Tuân thủ vệ sinh an toàn thực phẩm và nguồn nước sinh hoạt'],
    transmissionRoutes: [${JSON.stringify(epi.outbreakAlert || 'Lây qua dịch tiết, đường máu hoặc đường hô hấp/tiêu hóa')}],
    incubationPeriod: 'Thời gian ủ bệnh thay đổi tùy thuộc độc lực tác nhân và cơ địa người bệnh',
    highRiskPopulations: ['Người có bệnh nền mạn tính', 'Người cao tuổi hoặc trẻ nhỏ', 'Người suy giảm miễn dịch'],
    outbreakPotential: 'sporadic',
    clinicalPearls: 'Khai thác kỹ tiền sử tiếp xúc, yếu tố phơi nhiễm dịch tễ và các triệu chứng cảnh báo sớm tại vùng lưu hành để chẩn đoán kịp thời.'
  },
`;

  const lastBraceIdx = content.lastIndexOf('};');
  if (lastBraceIdx !== -1) {
    content = content.slice(0, lastBraceIdx) + profile + content.slice(lastBraceIdx);
    fs.writeFileSync(epiPath, content, 'utf8');
    console.log(`   ✅ Đã tự động bổ sung hồ sơ dịch tễ vào epidemiology-context-database.ts`);
  }
}

function syncClinicalEngine(enrichedKey, diseaseEntityJson) {
  const enginePath = path.join(ROOT_DIR, 'src/content/docspace/src/lib/clinicalEngine.ts');
  if (!fs.existsSync(enginePath)) return;

  let content = fs.readFileSync(enginePath, 'utf8');
  const targetIds = [enrichedKey, diseaseEntityJson?.id].filter(Boolean);
  const isInf = (diseaseEntityJson?.nhom || '').toLowerCase().includes('nhiễm');
  if (!isInf) return;

  const missingIds = targetIds.filter(id => !content.includes(`b.id === '${id}'`) && !content.includes(`b.id === "${id}"`));
  if (missingIds.length > 0) {
    console.log(`   ⚙️ Đang kích hoạt nhận diện [${missingIds.join(', ')}] trong isInfDisease của clinicalEngine.ts...`);
    const anchor = "b.id === 'viem_phoi';";
    if (content.includes(anchor)) {
      const newLines = missingIds.map(id => `b.id === '${id}' ||\n        `).join('');
      content = content.replace(anchor, `${newLines}${anchor}`);
      fs.writeFileSync(enginePath, content, 'utf8');
      console.log(`   ✅ Đã thêm vào clinicalEngine.ts`);
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
  console.log('🔍 [1/7] Đang phân tích cú pháp các khối dữ liệu trong tệp...');

  // 1.1 Trích xuất các khối JSON với cơ chế fallback thông minh
  const jsonBlocks = extractJsonBlocks(rawText);

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

  // 1) Thử khối ```yaml ... ```
  const yamlBlockMatch = rawText.match(/```yaml\r?\n([\s\S]*?)\r?\n```/);
  if (yamlBlockMatch && yamlBlockMatch[1].includes('caseId:')) {
    soapFrontmatter = yamlBlockMatch[1].trim();
  }

  // 2) Tìm khối frontmatter --- ... --- chứa caseId:
  if (!soapFrontmatter) {
    const caseIdIdx = rawText.indexOf('caseId:');
    if (caseIdIdx !== -1) {
      const before = rawText.slice(0, caseIdIdx);
      const after = rawText.slice(caseIdIdx);
      const lastDashIdx = before.lastIndexOf('\n---');
      const nextDashIdx = after.search(/\r?\n---\r?\n/);
      if (lastDashIdx !== -1 && nextDashIdx !== -1) {
        soapFrontmatter = (before.slice(lastDashIdx + 4) + after.slice(0, nextDashIdx)).trim();
        const bodyStart = caseIdIdx + nextDashIdx + 5;
        soapBody = rawText.slice(bodyStart).trim();
      }
    }
  }

  // 3) Fallback lấy SOAP body nếu chưa có
  if (!soapBody) {
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

  if (soapFrontmatter) {
    const idMatch = soapFrontmatter.match(/caseId:\s*["']?([^"'\r\n]+)["']?/);
    if (idMatch) {
      soapCaseId = idMatch[1].trim();
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
  console.log('\n📝 [2/7] Đang cập nhật từ điển triệu chứng...');
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

    const COMMON_SYMPTOM_NAMES = {
      alt_ast_tang_nhe: { ten: 'Men gan AST/ALT tăng nhẹ', nhom: 'Cận lâm sàng', loai: ['cls'], tuKhoa: ['men gan tang', 'ast alt tang', 'transaminase tang'] },
      co_truong: { ten: 'Cổ trướng (Báng bụng / Dịch tự do ổ bụng)', nhom: 'Tiêu hóa', loai: ['tt'], tuKhoa: ['co truong', 'bang bung', 'dich o bung'] },
      vang_da_mat: { ten: 'Vàng da, vàng mắt (Hoàng đản)', nhom: 'Tiêu hóa', loai: ['tt'], tuKhoa: ['vang da', 'vang mat', 'hoang dan', 'jaundice'] },
      xuat_huyet_tieu_hoa: { ten: 'Xuất huyết tiêu hóa (Nôn ra máu, đi ngoài phân đen)', nhom: 'Tiêu hóa', loai: ['cn', 'tt'], tuKhoa: ['xuat huyet tieu hoa', 'non ra mau', 'phan den'] },
      nao_gan: { ten: 'Bệnh não gan (Hôn mê gan / Rối loạn tri giác do suy tế bào gan)', nhom: 'Thần kinh', loai: ['tt'], tuKhoa: ['nao gan', 'hon me gan', 'hepatic encephalopathy'] },
      hbsag_pos: { ten: 'Kháng nguyên bề mặt viêm gan B (HBsAg) dương tính', nhom: 'Cận lâm sàng', loai: ['cls'], tuKhoa: ['hbsag duong tinh', 'hbsag (+)', 'khang nguyen viem gan b'] },
    };

    // Kiểm tra thêm các triệu chứng trong negated/selected của ca mẫu để chống orphan
    if (sampleCaseJson) {
      const allSampleSyms = [...(sampleCaseJson.sel || []), ...(sampleCaseJson.selected || []), ...(sampleCaseJson.negated || [])];
      for (const symId of allSampleSyms) {
        if (!existingIds.has(symId)) {
          const fallback = COMMON_SYMPTOM_NAMES[symId] || {
            ten: symId.replace(/_/g, ' '),
            nhom: 'Lâm sàng',
            loai: ['tt'],
            tuKhoa: [symId.replace(/_/g, ' ')],
            map: null
          };
          console.warn(`   ⚠️ Phát hiện triệu chứng [${symId}] từ ca mẫu chưa có trong từ điển. Đang tự động bổ sung (${fallback.ten})...`);
          existingSymptoms.push({
            id: symId,
            ten: fallback.ten,
            nhom: fallback.nhom,
            loai: fallback.loai,
            tuKhoa: fallback.tuKhoa,
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
          const fallback = COMMON_SYMPTOM_NAMES[symId] || {
            ten: symId.replace(/_/g, ' '),
            nhom: 'Cận lâm sàng',
            loai: ['cls'],
            tuKhoa: [symId.replace(/_/g, ' ')],
            map: null
          };
          console.warn(`   ⚠️ Phát hiện triệu chứng [${symId}] từ ma trận dd chưa có trong từ điển. Đang tự động bổ sung (${fallback.ten})...`);
          existingSymptoms.push({
            id: symId,
            ten: fallback.ten,
            nhom: fallback.nhom,
            loai: fallback.loai,
            tuKhoa: fallback.tuKhoa,
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
  console.log('\n🩺 [3/7] Đang cập nhật tệp bệnh lý chuyên khoa & CDSS...');
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
  console.log('\n📋 [4/7] Đang cập nhật ca lâm sàng mẫu (sample-clinical-cases.json)...');
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
  console.log('\n📖 [5/7] Đang lưu trữ ca thực chiến SOAP Markdown...');
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
  // BƯỚC 6: TỰ ĐỘNG ĐỒNG BỘ & TÍCH HỢP HỆ THỐNG DOCSPACE
  // ─────────────────────────────────────────────────────────────
  console.log('\n⚡ [6/7] Đang tự động cấu hình & tích hợp sâu vào DocSpace...');

  // 6.1 Đồng bộ index Enriched CDSS
  syncEnrichedIndex();

  // 6.2 Tìm key Enriched tương ứng
  const enrichedKey = findEnrichedKey(diseaseEntityJson, sampleCaseJson);
  if (enrichedKey) {
    console.log(`   🎯 Đã nhận diện ánh xạ Enriched CDSS: [${enrichedKey}]`);
    // 6.3 Ánh xạ đa key trong diagnostic-criteria-database.ts
    syncDiagnosticCriteriaDatabase(enrichedKey, diseaseEntityJson);
    // 6.4 Cấu hình hồ sơ dịch tễ học trong epidemiology-context-database.ts
    syncEpidemiologyContextDatabase(enrichedKey, diseaseEntityJson, sampleCaseJson);
    // 6.5 Kích hoạt nhận diện trong clinicalEngine.ts
    syncClinicalEngine(enrichedKey, diseaseEntityJson);
  } else {
    console.warn(`   ⚠️ Chưa tìm thấy tệp Enriched JSON phù hợp trong enriched/.`);
  }

  // ─────────────────────────────────────────────────────────────
  // BƯỚC 7: CHẠY BỘ BẢNG KIỂM KIỂM ĐỊNH TOÀN DIỆN (QUALITY GATES)
  // ─────────────────────────────────────────────────────────────
  console.log('\n🧪 [7/7] Đang chạy kiểm định toàn diện (Quality Gates)...');

  let auditSlug = enrichedKey || diseaseEntityJson?.id || (sampleCaseJson?.sel?.[0]?.split('_')?.[0] || 'unknown');
  if (auditSlug.includes('c-man') || auditSlug.includes('viem-gan-vi-rut-c') || auditSlug.includes('hcv')) {
    auditSlug = 'vgsv_C';
  }

  let auditPassed = false;
  try {
    console.log(`\n--- KIỂM TRA BỆNH LÝ [${auditSlug}] ---`);
    const auditOutput = execSync(`node tools/scripts/docspace-disease-audit.mjs "${auditSlug}"`, { cwd: ROOT_DIR, encoding: 'utf8' });
    console.log(auditOutput);
    auditPassed = !auditOutput.includes('❌ [FAIL]');
  } catch (err) {
    if (err.stdout) console.log(err.stdout);
  }

  try {
    console.log(`\n--- KIỂM TRA TOÀN DIỆN KNOWLEDGE VAULT ---`);
    const readinessOutput = execSync(`node tools/scripts/vault-readiness-check.mjs`, { cwd: ROOT_DIR, encoding: 'utf8' });
    console.log(readinessOutput);
  } catch (err) {
    if (err.stdout) console.log(err.stdout);
  }

  if (auditPassed) {
    console.log(`\n🎉 HOÀN TẤT NẠP DỮ LIỆU TỪ PROMPT 06 & 07 — ĐẠT 100% TIÊU CHÍ!`);
  } else {
    console.log(`\n⚠️ ĐÃ NẠP DỮ LIỆU NHƯNG CÒN TIÊU CHÍ CHƯA ĐẠT. VUI LÒNG KIỂM TRA BÁO CÁO AUDIT Ở TRÊN.`);
  }
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
