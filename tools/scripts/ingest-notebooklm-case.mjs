#!/usr/bin/env node

/**
 * CliniPortal Knowledge Vault — NotebookLM SOAP Ingestion Tool
 * Tự động nạp ca lâm sàng từ Markdown do NotebookLM sinh ra vào Knowledge Vault (khoCode: BA).
 *
 * Cú pháp sử dụng:
 *   node tools/scripts/ingest-notebooklm-case.mjs <duong-dan-file.md>
 *   node tools/scripts/ingest-notebooklm-case.mjs <duong-dan-thu-muc>
 *
 * Ví dụ:
 *   node tools/scripts/ingest-notebooklm-case.mjs src/content/knowledge-vault/ba/ca-nstemi.md
 */

import fs from 'fs';
import path from 'path';

const VAULT_ROOT = 'd:/Apps/Apps_ykhoa/src/content/knowledge-vault';
const VAULT_CATALOG_PATH = path.join(VAULT_ROOT, 'data/vault-catalog.json');
const VAULT_BA_DIR = path.join(VAULT_ROOT, 'ba');
const DOCSPACE_CATALOG_PATH = 'd:/Apps/Apps_ykhoa/src/content/docspace/src/data/vault-catalog.json';

/**
 * Hàm phân tích YAML Frontmatter đơn giản không cần external dependencies
 */
function parseFrontmatter(rawText) {
  const match = rawText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: rawText };
  }

  const yamlBlock = match[1];
  const body = match[2];
  const frontmatter = {};

  const lines = yamlBlock.split(/\r?\n/);
  let currentKey = null;
  let isArray = false;

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Item in array
    if (trimmed.startsWith('- ') && currentKey && isArray) {
      const val = trimmed.slice(2).replace(/^["']|["']$/g, '').trim();
      frontmatter[currentKey].push(val);
      continue;
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim();

      if (val === '') {
        // Có thể là array bắt đầu ở dòng sau
        currentKey = key;
        isArray = true;
        frontmatter[currentKey] = [];
      } else {
        isArray = false;
        currentKey = key;
        // Clean quotes and parse numbers
        const cleanVal = val.replace(/^["']|["']$/g, '');
        if (/^\d+$/.test(cleanVal)) {
          frontmatter[key] = parseInt(cleanVal, 10);
        } else if (/^\d+\.\d+$/.test(cleanVal)) {
          frontmatter[key] = parseFloat(cleanVal);
        } else if (cleanVal === 'true') {
          frontmatter[key] = true;
        } else if (cleanVal === 'false') {
          frontmatter[key] = false;
        } else {
          frontmatter[key] = cleanVal;
        }
      }
    }
  }

  return { frontmatter, body };
}

/**
 * Trích xuất cấu trúc SOAP từ nội dung Markdown
 */
function extractSoapBody(bodyText) {
  const patterns = [
    {
      s: /(?:^|\n)##\s*1\.\s*📝?\s*S[^\n]*\n([\s\S]*?)(?=(?:^|\n)##\s*2\.|$)/i,
      o: /(?:^|\n)##\s*2\.\s*🔬?\s*O[^\n]*\n([\s\S]*?)(?=(?:^|\n)##\s*3\.|$)/i,
      a: /(?:^|\n)##\s*3\.\s*🧠?\s*A[^\n]*\n([\s\S]*?)(?=(?:^|\n)##\s*4\.|$)/i,
      p: /(?:^|\n)##\s*4\.\s*📋?\s*P[^\n]*\n([\s\S]*?)$/i,
    },
    {
      s: /(?:^|\n)##\s*(?:1[.)]\s*)?(?:S\b|Chủ quan|Subjective)[^\n]*\n([\s\S]*?)(?=(?:^|\n)##\s*(?:2[.)]\s*)?(?:O\b|Khách quan|Objective)|$)/i,
      o: /(?:^|\n)##\s*(?:2[.)]\s*)?(?:O\b|Khách quan|Objective)[^\n]*\n([\s\S]*?)(?=(?:^|\n)##\s*(?:3[.)]\s*)?(?:A\b|Đánh giá|Biện luận|Assessment)|$)/i,
      a: /(?:^|\n)##\s*(?:3[.)]\s*)?(?:A\b|Đánh giá|Biện luận|Assessment)[^\n]*\n([\s\S]*?)(?=(?:^|\n)##\s*(?:4[.)]\s*)?(?:P\b|Kế hoạch|Xử trí|Plan)|$)/i,
      p: /(?:^|\n)##\s*(?:4[.)]\s*)?(?:P\b|Kế hoạch|Xử trí|Plan)[^\n]*\n([\s\S]*?)$/i,
    },
    {
      s: /(?:^|\n)###\s*(?:1[.)]\s*)?(?:S\b|Chủ quan|Subjective)[^\n]*\n([\s\S]*?)(?=(?:^|\n)###\s*(?:2[.)]\s*)?(?:O\b|Khách quan|Objective)|$)/i,
      o: /(?:^|\n)###\s*(?:2[.)]\s*)?(?:O\b|Khách quan|Objective)[^\n]*\n([\s\S]*?)(?=(?:^|\n)###\s*(?:3[.)]\s*)?(?:A\b|Đánh giá|Biện luận|Assessment)|$)/i,
      a: /(?:^|\n)###\s*(?:3[.)]\s*)?(?:A\b|Đánh giá|Biện luận|Assessment)[^\n]*\n([\s\S]*?)(?=(?:^|\n)###\s*(?:4[.)]\s*)?(?:P\b|Kế hoạch|Xử trí|Plan)|$)/i,
      p: /(?:^|\n)###\s*(?:4[.)]\s*)?(?:P\b|Kế hoạch|Xử trí|Plan)[^\n]*\n([\s\S]*?)$/i,
    },
  ];

  let sText = '';
  let oText = '';
  let aText = '';
  let pText = '';

  for (const pat of patterns) {
    if (!sText) {
      const sm = bodyText.match(pat.s);
      if (sm) sText = sm[1].trim();
    }
    if (!oText) {
      const om = bodyText.match(pat.o);
      if (om) oText = om[1].trim();
    }
    if (!aText) {
      const am = bodyText.match(pat.a);
      if (am) aText = am[1].trim();
    }
    if (!pText) {
      const pm = bodyText.match(pat.p);
      if (pm) pText = pm[1].trim();
    }
    if (sText && oText && aText && pText) break;
  }

  if (!sText && !oText && !aText && !pText) {
    sText = bodyText;
  }

  // Parse S
  const chiefComplaint = extractField(sText, 'Lý do nhập viện / Than phiền chính') || extractField(sText, 'Lý do nhập viện') || 'Chưa ghi nhận';
  const historyOfPresentIllness = extractField(sText, 'Bệnh sử chi tiết') || extractField(sText, 'Bệnh sử') || '';
  const pastMedicalHistory = extractField(sText, 'Tiền căn') || extractField(sText, 'Tiền sử') || 'Chưa ghi nhận tiền căn đặc biệt';

  // Parse Vitals in O
  const vitals = {
    bp: extractVitalsField(oText, 'Huyết áp') || extractVitalsField(oText, 'HA'),
    pulse: extractVitalsField(oText, 'Mạch') || extractVitalsField(oText, 'Nhịp tim'),
    temp: extractVitalsField(oText, 'Thân nhiệt') || extractVitalsField(oText, 'Nhiệt độ'),
    resp: extractVitalsField(oText, 'Nhịp thở'),
    spo2: extractVitalsField(oText, 'SpO₂') || extractVitalsField(oText, 'SpO2'),
    bmi: extractVitalsField(oText, 'BMI'),
  };

  const physicalExam = extractField(oText, 'Khám thực thể trọng tâm') || extractField(oText, 'Khám thực thể') || extractField(oText, 'Khám lâm sàng') || '';
  const labsAndImaging = extractField(oText, 'Cận lâm sàng & Hình ảnh học') || extractField(oText, 'Cận lâm sàng') || extractField(oText, 'Xét nghiệm') || '';

  // Parse A
  const primaryDiagnosis = extractField(aText, 'Chẩn đoán xác định') || extractField(aText, 'Chẩn đoán sơ bộ') || '';
  const icd10 = (extractField(aText, 'Mã ICD-10') || extractField(aText, 'Mã ICD') || '')?.replace(/[`]/g, '');
  const differentials = extractListItems(aText, 'Chẩn đoán phân biệt cần loại trừ');
  const riskStratification = extractField(aText, 'Phân tầng nguy cơ & Thang điểm lượng giá') || extractField(aText, 'Phân tầng nguy cơ') || extractField(aText, 'Thang điểm') || '';

  // Parse P
  const immediateActions = extractField(pText, 'Xử trí cấp cứu & Ban đầu') || extractField(pText, 'Xử trí tức thì') || extractField(pText, 'Xử trí ban đầu') || '';
  const medications = extractMedications(pText);
  const monitoringAndTargets = extractField(pText, 'Chỉ tiêu theo dõi & Mục tiêu lâm sàng') || extractField(pText, 'Kế hoạch theo dõi & Mục tiêu') || extractField(pText, 'Theo dõi & Mục tiêu') || '';
  const consultationOrReferral = extractField(pText, 'Tiêu chuẩn hội chẩn / Chuyển viện / Can thiệp') || extractField(pText, 'Hội chẩn / Chuyển viện') || '';

  return {
    s: {
      chiefComplaint,
      historyOfPresentIllness,
      pastMedicalHistory,
      symptomsList: [],
      historyPearls: '',
    },
    o: {
      vitals,
      physicalExam,
      labsAndImaging,
      objectivePitfalls: '',
    },
    a: {
      primaryDiagnosis,
      icd10,
      differentials,
      riskStratification,
      diagnosticPearls: '',
    },
    p: {
      immediateActions,
      medications,
      monitoringAndTargets,
      consultationOrReferral,
      takeawayLessons: '',
    },
  };
}

function extractField(sectionText, fieldLabel) {
  const regex = new RegExp(`-\\s*\\*\\*${fieldLabel}\\*\\*\\s*:\\s*([^\n]+)`, 'i');
  const m = sectionText.match(regex);
  return m ? m[1].trim() : null;
}

function extractVitalsField(text, name) {
  const regex = new RegExp(`-\\s*${name}\\s*:\\s*([^\\n,]+)`, 'i');
  const m = text.match(regex);
  return m ? m[1].trim().replace(/[^\d./]/g, '') : undefined;
}

function extractListItems(sectionText, headerLabel) {
  const regex = new RegExp(`-\\s*\\*\\*${headerLabel}\\*\\*\\s*:?\\s*\\n([\\s\\S]*?)(?=\\n-\\s*\\*\\*|$)`, 'i');
  const m = sectionText.match(regex);
  if (!m) return [];
  return m[1]
    .split(/\r?\n/)
    .map((l) => l.trim().replace(/^-\s*/, ''))
    .filter(Boolean);
}

function extractMedications(pText) {
  const meds = [];
  const regex = /-\s*\*\*([^*\n]+)\*\*\s*:\s*([^(\n]+)\(([^)\n]+)\)(?:\s*[—–-]\s*\*([^*\n]+)\*)?/g;
  let m;
  while ((m = regex.exec(pText)) !== null) {
    const drugName = m[1].trim();
    if (/^(Xử trí|Theo dõi|Tiêu chuẩn|Hội chẩn|Lưu ý|Chỉ tiêu)/i.test(drugName)) continue;
    meds.push({
      drug: drugName,
      dose: m[2].trim(),
      route: m[3].trim(),
      note: m[4] ? m[4].trim() : '',
    });
  }
  return meds;
}

/**
 * Xử lý nạp 1 file Markdown
 */
function processMarkdownFile(filePath) {
  console.log(`\n📄 Đang xử lý ca lâm sàng: ${path.basename(filePath)}...`);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, body } = parseFrontmatter(content);

  if (!frontmatter.title) {
    console.error(`❌ Lỗi: File ${filePath} không có trường 'title' trong frontmatter! Bỏ qua.`);
    return null;
  }

  const caseId = frontmatter.caseId || `soap-${path.basename(filePath, '.md')}`;
  const parsedSoap = extractSoapBody(body);

  // Gán các pearls từ frontmatter vào parsedSoap
  parsedSoap.s.historyPearls = frontmatter.historyPearls || '';
  parsedSoap.o.objectivePitfalls = frontmatter.objectivePitfalls || '';
  parsedSoap.a.diagnosticPearls = frontmatter.diagnosticPearls || '';
  parsedSoap.p.takeawayLessons = frontmatter.takeawayLessons || '';

  if (!parsedSoap.a.primaryDiagnosis) {
    parsedSoap.a.primaryDiagnosis = frontmatter.title;
  }
  if (!parsedSoap.a.icd10 && frontmatter.icd10) {
    parsedSoap.a.icd10 = Array.isArray(frontmatter.icd10) ? frontmatter.icd10.join(' · ') : String(frontmatter.icd10);
  }

  // Tạo cấu trúc VaultArticle chuẩn
  const article = {
    id: caseId,
    title: frontmatter.title,
    fullFileName: `${caseId}.md`,
    khoCode: 'BA',
    khoName: 'Bệnh án SOAP',
    khoGroup: 'Thực hành',
    khoDir: 'ba',
    khoIcon: 'fa-book-medical',
    khoColor: '#10b981',
    specialty: frontmatter.specialty || 'Tổng quát',
    part: 'Ca lâm sàng',
    relPath: `ba/${caseId}.md`,
    snippet: frontmatter.demographicContext || parsedSoap.s.chiefComplaint || 'Ca lâm sàng SOAP từ Knowledge Vault',
    readTime: '6 phút',
    aliases: [frontmatter.title],
    keywords: Array.isArray(frontmatter.tags) ? frontmatter.tags : ['SOAP', 'Lâm sàng'],
    icd10: Array.isArray(frontmatter.icd10)
      ? frontmatter.icd10
      : frontmatter.icd10
      ? [String(frontmatter.icd10)]
      : [],
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    topic: frontmatter.experienceLevel || 'essential',

    // SOAP specific extensions
    caseId: caseId,
    experienceLevel: frontmatter.experienceLevel || 'essential',
    difficultyRating: frontmatter.difficultyRating || 3,
    authorDoctor: frontmatter.authorDoctor || 'Knowledge Vault Editorial Board',
    demographicContext: frontmatter.demographicContext || '',
    historyPearls: frontmatter.historyPearls || '',
    objectivePitfalls: frontmatter.objectivePitfalls || '',
    diagnosticPearls: frontmatter.diagnosticPearls || '',
    takeawayLessons: frontmatter.takeawayLessons || '',

    // Lưu toàn bộ S-O-A-P vào trường context dưới dạng JSON
    context: JSON.stringify(parsedSoap),
  };

  // Lưu file .md vào thư mục Knowledge Vault ba/
  if (!fs.existsSync(VAULT_BA_DIR)) {
    fs.mkdirSync(VAULT_BA_DIR, { recursive: true });
  }
  const destMdPath = path.join(VAULT_BA_DIR, `${caseId}.md`);
  fs.writeFileSync(destMdPath, content, 'utf-8');
  console.log(`   ➔ Đã lưu file Markdown vào: ${destMdPath}`);

  return article;
}

/**
 * Main Runner
 */
function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(`
===================================================================
CLINIPORTAL KNOWLEDGE VAULT — NOTEBOOKLM SOAP INGESTION TOOL
===================================================================
Cách dùng:
  node tools/scripts/ingest-notebooklm-case.mjs <file.md hoặc thu_muc>

Ví dụ:
  node tools/scripts/ingest-notebooklm-case.mjs sample-case.md
===================================================================
`);
    process.exit(0);
  }

  const targetPath = path.resolve(args[0]);
  if (!fs.existsSync(targetPath)) {
    console.error(`❌ Lỗi: Đường dẫn không tồn tại: ${targetPath}`);
    process.exit(1);
  }

  let filesToProcess = [];
  const stat = fs.statSync(targetPath);
  if (stat.isDirectory()) {
    const files = fs.readdirSync(targetPath);
    filesToProcess = files
      .filter((f) => f.endsWith('.md'))
      .map((f) => path.join(targetPath, f));
  } else if (targetPath.endsWith('.md')) {
    filesToProcess = [targetPath];
  } else {
    console.error('❌ Lỗi: Chỉ chấp nhận file có phần mở rộng .md!');
    process.exit(1);
  }

  if (filesToProcess.length === 0) {
    console.log('⚠️ Không tìm thấy file .md nào để nạp.');
    process.exit(0);
  }

  console.log(`🔍 Tìm thấy ${filesToProcess.length} ca lâm sàng cần nạp vào Knowledge Vault...`);

  // Đọc catalog hiện tại
  if (!fs.existsSync(VAULT_CATALOG_PATH)) {
    console.error(`❌ Không tìm thấy catalog: ${VAULT_CATALOG_PATH}`);
    process.exit(1);
  }

  const catalogRaw = fs.readFileSync(VAULT_CATALOG_PATH, 'utf-8');
  const catalog = JSON.parse(catalogRaw);
  let newCount = 0;
  let updateCount = 0;

  for (const file of filesToProcess) {
    const article = processMarkdownFile(file);
    if (!article) continue;

    const existingIdx = catalog.findIndex((a) => a.id === article.id);
    if (existingIdx >= 0) {
      catalog[existingIdx] = article;
      updateCount++;
      console.log(`   ➔ [CẬP NHẬT] Đã ghi đè ca lâm sàng ID: ${article.id}`);
    } else {
      catalog.push(article);
      newCount++;
      console.log(`   ➔ [THÊM MỚI] Đã nạp thành công ca lâm sàng ID: ${article.id}`);
    }
  }

  // Ghi lại catalog Knowledge Vault
  fs.writeFileSync(VAULT_CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf-8');
  console.log(`\n💾 Đã lưu catalog Knowledge Vault: ${VAULT_CATALOG_PATH}`);

  // Đồng bộ sang DocSpace catalog nếu có
  if (fs.existsSync(DOCSPACE_CATALOG_PATH)) {
    fs.writeFileSync(DOCSPACE_CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf-8');
    console.log(`🔄 Đã đồng bộ sang DocSpace: ${DOCSPACE_CATALOG_PATH}`);
  }

  console.log(`
🎉 HOÀN TẤT NẠP DỮ LIỆU VÀO KNOWLEDGE VAULT:
   • Ca nạp mới : ${newCount}
   • Ca cập nhật: ${updateCount}
   • Tổng bài trong Vault: ${catalog.length} bài
`);
}

main();
