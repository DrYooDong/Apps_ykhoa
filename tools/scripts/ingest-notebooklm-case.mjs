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

const ROOT = fs.existsSync(path.join(process.cwd(), 'src/content/knowledge-vault'))
  ? process.cwd()
  : (fs.existsSync('d:/Apps/Apps_ykhoa/src/content/knowledge-vault') ? 'd:/Apps/Apps_ykhoa' : process.cwd());

const VAULT_ROOT = path.join(ROOT, 'src/content/knowledge-vault');
const VAULT_DATA_DIR = path.join(VAULT_ROOT, 'data');
const VAULT_CATALOG_PATH = path.join(VAULT_DATA_DIR, 'vault-catalog.json');
const VAULT_THUCHANH_PATH = path.join(VAULT_DATA_DIR, 'vault-catalog-thuc-hanh.json');
const VAULT_BA_DIR = path.join(VAULT_ROOT, 'ba');

const DOCSPACE_DATA_DIR = path.join(ROOT, 'src/content/docspace/src/data');
const DOCSPACE_CATALOG_PATH = path.join(DOCSPACE_DATA_DIR, 'vault-catalog.json');
const DOCSPACE_THUCHANH_PATH = path.join(DOCSPACE_DATA_DIR, 'vault-catalog-thuc-hanh.json');

/**
 * Hàm khử HTML entities thường gặp từ output thô của AI/NotebookLM
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
 * Tạo slug chuẩn từ tiếng Việt
 */
function slugifyVietnamese(text) {
  if (!text) return 'ca-lam-sang';
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Tự động tổng hợp Frontmatter khi Markdown từ Prompt 07 thiếu khối ---
 */
function synthesizeFrontmatter(rawText, filePath = '') {
  const clean = sanitizeHtmlEntities(rawText);
  const frontmatter = {};

  // 1. Trích xuất Tiêu đề
  const titleMatch = clean.match(/^#\s*(?:📋\s*)?(?:BỆNH ÁN LÂM SÀNG\s*(?:S-O-A-P)?:?\s*)?([^\n\r]+)/mi);
  if (titleMatch) {
    frontmatter.title = titleMatch[1].trim().replace(/^:\s*/, '');
  } else {
    const base = path.basename(filePath, '.md');
    frontmatter.title = base.replace(/^(?:soap-)/, '').replace(/-/g, ' ').toUpperCase();
  }

  // 2. CaseId
  const fileBase = path.basename(filePath, '.md');
  if (fileBase && fileBase !== 'temp' && fileBase !== 'input') {
    frontmatter.caseId = fileBase.startsWith('soap-') ? fileBase : `soap-${fileBase}`;
  } else {
    frontmatter.caseId = `soap-${slugifyVietnamese(frontmatter.title).slice(0, 40)}`;
  }

  // 3. ICD-10
  const icdMatch = clean.match(/(?:Mã\s*ICD(?:-10)?|ICD-10)\s*[:：]\s*`?([A-Z0-9.,\s\-–]+)`?/i);
  if (icdMatch) {
    const rawCodes = icdMatch[1].split(/[,·\s–-]+/).map(c => c.trim()).filter(c => /^[A-Z][0-9]/.test(c));
    if (rawCodes.length > 0) {
      frontmatter.icd10 = rawCodes;
    }
  }

  // 4. Chuyên khoa (Inferred Specialty)
  const lowerAll = (frontmatter.title + ' ' + clean.slice(0, 1500)).toLowerCase();
  if (/dengue|sốt xuất huyết|uốn ván|nhiễm trùng|viêm ruột thừa|ký sinh|sốt rét|thương hàn|lao/.test(lowerAll)) {
    frontmatter.specialty = 'Truyền nhiễm';
  } else if (/nhồi máu|nstemi|stemi|suy tim|tăng huyết áp|rung nhĩ|mạch vành|đau ngực/.test(lowerAll)) {
    frontmatter.specialty = 'Tim mạch';
  } else if (/xơ gan|viêm gan|viêm tụy|xuất huyết tiêu hóa|loét dạ dày|dạ dày/.test(lowerAll)) {
    frontmatter.specialty = 'Tiêu hóa';
  } else if (/đột quỵ|nhồi máu não|xuất huyết não|động kinh|màng não|yếu liệt/.test(lowerAll)) {
    frontmatter.specialty = 'Thần kinh';
  } else if (/copd|hen|viêm phổi|khó thở|suy hô hấp|tràn khí/.test(lowerAll)) {
    frontmatter.specialty = 'Hô hấp';
  } else if (/suy thận|aki|ckd|hội chứng thận hư|tiết niệu|sỏi thận/.test(lowerAll)) {
    frontmatter.specialty = 'Thận - Tiết niệu';
  } else if (/đái tháo đường|bướu giáp|cường giáp|suy giáp|cushing/.test(lowerAll)) {
    frontmatter.specialty = 'Nội tiết';
  } else {
    frontmatter.specialty = 'Nội khoa tổng quát';
  }

  // 5. Bối cảnh dịch tễ & Hành chánh
  const demoMatch = clean.match(/(?:Hành chánh & Bối cảnh|Bối cảnh dịch tễ|Hành chính)[:：]?([\s\S]*?)(?=###|##|\n\n\n|$)/i);
  if (demoMatch) {
    frontmatter.demographicContext = demoMatch[1].replace(/[*#]/g, '').trim().split('\n').filter(l => l.trim()).join(' | ').slice(0, 200);
  }

  // 6. Pearls & Pitfalls
  const pearlMatch = clean.match(/(?:CẠM BẪY LÂM SÀNG|ĐIỂM NGỌC LÂM SÀNG|BÀI HỌC KINH NGHIỆM)[:：]?([\s\S]*?)(?=###|##|$)/i);
  if (pearlMatch) {
    frontmatter.takeawayLessons = pearlMatch[1].replace(/[*#]/g, '').trim().slice(0, 300);
  }

  frontmatter.experienceLevel = 'intermediate';
  frontmatter.difficultyRating = 3;
  frontmatter.authorDoctor = 'DocSpace AI Ingestion Engine';
  frontmatter.tags = ['SOAP', frontmatter.specialty, 'NotebookLM'];

  return { frontmatter, body: clean, synthesized: true };
}

/**
 * Hàm phân tích YAML Frontmatter đơn giản không cần external dependencies
 */
function parseFrontmatter(rawText, filePath = '') {
  const sanitized = sanitizeHtmlEntities(rawText);
  const match = sanitized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    // Tự động tổng hợp Frontmatter nếu thiếu
    return synthesizeFrontmatter(sanitized, filePath);
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
      s: /(?:^|\n)#{2,4}\s*(?:1[.)]\s*)?(?:📝\s*)?(?:S\b|Chủ quan|Subjective)[^\n]*\n([\s\S]*?)(?=(?:^|\n)#{2,4}\s*(?:2[.)]\s*)?(?:🔬\s*)?(?:O\b|Khách quan|Objective)|$)/i,
      o: /(?:^|\n)#{2,4}\s*(?:2[.)]\s*)?(?:🔬\s*)?(?:O\b|Khách quan|Objective)[^\n]*\n([\s\S]*?)(?=(?:^|\n)#{2,4}\s*(?:3[.)]\s*)?(?:🧠\s*)?(?:A\b|Đánh giá|Biện luận|Assessment)|$)/i,
      a: /(?:^|\n)#{2,4}\s*(?:3[.)]\s*)?(?:🧠\s*)?(?:A\b|Đánh giá|Biện luận|Assessment)[^\n]*\n([\s\S]*?)(?=(?:^|\n)#{2,4}\s*(?:4[.)]\s*)?(?:📋\s*)?(?:P\b|Kế hoạch|Xử trí|Plan)|$)/i,
      p: /(?:^|\n)#{2,4}\s*(?:4[.)]\s*)?(?:📋\s*)?(?:P\b|Kế hoạch|Xử trí|Plan)[^\n]*\n([\s\S]*?)$/i,
    },
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
  const escaped = fieldLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(?:^|\\n)\\s*(?:[-*]|\\d+\\.)\\s*\\*\\*${escaped}\\*\\*\\s*:\\s*([^\\n]+)`, 'i');
  const m = sectionText.match(regex);
  return m ? m[1].trim() : null;
}

function extractVitalsField(text, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(?:^|\\n)\\s*(?:[-*]|\\d+\\.)\\s*\\*\\*?${escaped}\\*\\*?\\s*:\\s*\\*?\\*?\\s*([0-9]+(?:\\.[0-9]+)?(?:\\/[0-9]+)?)`, 'i');
  const m = text.match(regex);
  if (m) return m[1].trim();
  const fallbackRegex = new RegExp(`(?:^|\\n)\\s*(?:[-*]|\\d+\\.)\\s*\\*\\*?${escaped}\\*\\*?\\s*:\\s*([^\\n,]+)`, 'i');
  const fm = text.match(fallbackRegex);
  return fm ? fm[1].trim().replace(/[^\d./]/g, '').replace(/\/+$/, '') : undefined;
}

function extractListItems(sectionText, headerLabel) {
  const escaped = headerLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(?:^|\\n)\\s*(?:[-*]|\\d+\\.)\\s*\\*\\*${escaped}\\*\\*\\s*:?\\s*\\n([\\s\\S]*?)(?=\\n\\s*(?:[-*]|\\d+\\.)\\s*\\*\\*|$)`, 'i');
  const m = sectionText.match(regex);
  if (!m) return [];
  return m[1]
    .split(/\r?\n/)
    .map((l) => l.trim().replace(/^(?:[-*]|\d+\.)\s*/, ''))
    .filter(Boolean);
}

function extractMedications(pText) {
  const meds = [];
  const regex1 = /(?:[-*]|\d+\.)\s*\*\*([^*\n]+)\*\*\s*:\s*([^(\n]+)\(([^)\n]+)\)(?:\s*[—–-]\s*\*([^*\n]+)\*)?/g;
  let m;
  while ((m = regex1.exec(pText)) !== null) {
    const drugName = m[1].trim();
    if (/^(Xử trí|Theo dõi|Tiêu chuẩn|Hội chẩn|Lưu ý|Chỉ tiêu|Y lệnh|Quản lý|Dự phòng|Mục tiêu)/i.test(drugName)) continue;
    meds.push({
      drug: drugName,
      dose: m[2].trim(),
      route: m[3].trim(),
      note: m[4] ? m[4].trim() : '',
    });
  }

  if (meds.length === 0) {
    // Thử trích xuất định dạng danh sách lồng: 1. **Dexamethasone 10 mg**:\n * *Liều dùng*: ...
    const blocks = pText.split(/(?:^|\n)\s*(?:\d+\.|\*|-)\s*\*\*/);
    for (const block of blocks.slice(1)) {
      const endNameIdx = block.indexOf('**');
      if (endNameIdx <= 0) continue;
      const drugName = block.slice(0, endNameIdx).trim();
      if (/^(Xử trí|Theo dõi|Tiêu chuẩn|Hội chẩn|Lưu ý|Chỉ tiêu|Y lệnh|Quản lý|Dự phòng|Mục tiêu)/i.test(drugName)) continue;
      const doseMatch = block.match(/\*(?:Liều dùng|Tốc độ|Chỉ định)\*:\s*([^\n]+)/i);
      const routeMatch = block.match(/\*Cách dùng\*:\s*([^\n]+)/i);
      const purposeMatch = block.match(/\*Mục đích\*:\s*([^\n]+)/i);
      meds.push({
        drug: drugName,
        dose: doseMatch ? doseMatch[1].trim() : '',
        route: routeMatch ? routeMatch[1].trim() : '',
        note: purposeMatch ? purposeMatch[1].trim() : '',
      });
    }
  }

  return meds;
}

/**
 * Xử lý nạp 1 file Markdown
 */
function processMarkdownFile(filePath) {
  console.log(`\n📄 Đang xử lý ca lâm sàng: ${path.basename(filePath)}...`);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, body, synthesized } = parseFrontmatter(content, filePath);

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
  let contentToSave = content;
  if (synthesized) {
    const yml = [
      '---',
      `title: "${frontmatter.title.replace(/"/g, '\\"')}"`,
      `caseId: ${caseId}`,
      `specialty: ${frontmatter.specialty}`,
      `difficultyRating: ${frontmatter.difficultyRating || 3}`,
      `experienceLevel: ${frontmatter.experienceLevel || 'intermediate'}`,
      `authorDoctor: "${frontmatter.authorDoctor || 'DocSpace AI Ingestion Engine'}"`,
      frontmatter.demographicContext ? `demographicContext: "${frontmatter.demographicContext.replace(/"/g, '\\"')}"` : null,
      frontmatter.takeawayLessons ? `takeawayLessons: "${frontmatter.takeawayLessons.replace(/"/g, '\\"')}"` : null,
      frontmatter.icd10 && frontmatter.icd10.length > 0 ? `icd10:\n${frontmatter.icd10.map(c => `  - ${c}`).join('\n')}` : null,
      frontmatter.tags && frontmatter.tags.length > 0 ? `tags:\n${frontmatter.tags.map(t => `  - ${t}`).join('\n')}` : null,
      '---',
      '',
      body
    ].filter(x => x !== null).join('\n');
    contentToSave = yml;
    console.log(`   ✨ [Auto-Frontmatter] Đã tự động tổng hợp Frontmatter chuẩn cho ${caseId}.md`);
  }
  fs.writeFileSync(destMdPath, contentToSave, 'utf-8');
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

  // Lọc riêng các bài viết Thực hành (BA)
  const thucHanhArticles = catalog.filter((a) => a.khoCode === 'BA' || a.khoGroup === 'Thực hành');

  // Ghi lại catalog Knowledge Vault (cả phân nhóm Thực hành và Master)
  fs.writeFileSync(VAULT_THUCHANH_PATH, JSON.stringify(thucHanhArticles, null, 2), 'utf-8');
  fs.writeFileSync(VAULT_CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf-8');
  console.log(`\n💾 Đã lưu catalog Knowledge Vault (${thucHanhArticles.length} ca BA): ${VAULT_THUCHANH_PATH}`);
  console.log(`💾 Đã cập nhật master catalog Knowledge Vault: ${VAULT_CATALOG_PATH}`);

  // Đồng bộ sang DocSpace catalog nếu có
  if (fs.existsSync(DOCSPACE_DATA_DIR)) {
    fs.writeFileSync(DOCSPACE_THUCHANH_PATH, JSON.stringify(thucHanhArticles, null, 2), 'utf-8');
    fs.writeFileSync(DOCSPACE_CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf-8');
    console.log(`🔄 Đã đồng bộ sang DocSpace: ${DOCSPACE_THUCHANH_PATH}`);
  }

  console.log(`
🎉 HOÀN TẤT NẠP DỮ LIỆU VÀO KNOWLEDGE VAULT:
   • Ca nạp mới : ${newCount}
   • Ca cập nhật: ${updateCount}
   • Tổng bài trong Vault: ${catalog.length} bài
`);
}

main();
