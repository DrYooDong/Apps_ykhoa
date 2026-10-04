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

const DOCSPACE_ROOT = path.join(ROOT, 'src/content/docspace');
const DOCSPACE_DATA_DIR = path.join(DOCSPACE_ROOT, 'src/data');
const DOCSPACE_CATALOG_PATH = path.join(DOCSPACE_DATA_DIR, 'vault-catalog.json');
const DOCSPACE_THUCHANH_PATH = path.join(DOCSPACE_DATA_DIR, 'vault-catalog-thuc-hanh.json');
const DOCSPACE_BA_DIR = path.join(DOCSPACE_ROOT, 'data/ba');

const VAULT_ROOT = path.join(ROOT, 'src/content/knowledge-vault');
const VAULT_DATA_DIR = path.join(VAULT_ROOT, 'data');
const VAULT_CATALOG_PATH = path.join(VAULT_DATA_DIR, 'vault-catalog.json');
const VAULT_THUCHANH_PATH = path.join(VAULT_DATA_DIR, 'vault-catalog-thuc-hanh.json');
const VAULT_BA_DIR = path.join(VAULT_ROOT, 'ba');

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
 * Trích xuất một khối văn bản đa dòng theo nhãn (Heading hoặc Bullet)
 */
function extractBlockFuzzy(sectionText, labelPatterns) {
  for (const label of labelPatterns) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const rHeading = new RegExp(
      `(?:^|\\n)#{2,3}\\s*(?:[^\\n]*?)?${escaped}[^\\n]*\\n([\\s\\S]*?)(?=(?:^|\\n)#{2,3}\\s(?!#)|\\n\\s*---\\s*\\n|$)`,
      'i'
    );
    const mH = sectionText.match(rHeading);
    if (mH && mH[1].trim()) return mH[1].trim();

    const rBullet = new RegExp(
      `(?:^|\\n)[-*]\\s*\\*\\*[^\\n*]*?${escaped}[^*:\\n]*\\*\\*\\s*[:=]?\\s*\\n?([\\s\\S]*?)(?=(?:^|\\n)[-*]\\s*\\*\\*|\\n#{2,3}\\s|\\n\\s*---\\s*\\n|$)`,
      'i'
    );
    const mB = sectionText.match(rBullet);
    if (mB && mB[1].trim()) return mB[1].trim();
  }
  return null;
}

/**
 * Trích xuất trường đơn theo nhãn
 */
function extractFieldFuzzy(sectionText, labelPatterns) {
  for (const label of labelPatterns) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const r1 = new RegExp(`(?:^|\\n)\\s*[-*]?\\s*\\*\\*${escaped}\\*\\*\\s*[:=]\\s*([^\\n]+)`, 'i');
    const m1 = sectionText.match(r1);
    if (m1 && m1[1].trim()) return m1[1].trim();

    const r2 = new RegExp(`(?:^|\\n)\\s*\\*\\*${escaped}\\s*[:=]\\*\\*\\s*([^\\n]+)`, 'i');
    const m2 = sectionText.match(r2);
    if (m2 && m2[1].trim()) return m2[1].trim();

    const r3 = new RegExp(`(?:^|\\n)\\s*[-*]?\\s*${escaped}\\s*[:=]\\s*([^\\n]+)`, 'i');
    const m3 = sectionText.match(r3);
    if (m3 && m3[1].trim()) return m3[1].trim();
  }
  return null;
}

/**
 * Trích xuất danh sách dòng (bullet items)
 */
function extractListFuzzy(sectionText, labelPatterns) {
  const block = extractBlockFuzzy(sectionText, labelPatterns);
  if (!block) return [];

  return block
    .split(/\r?\n/)
    .map((l) => l.trim().replace(/^[-*•]\s*/, '').replace(/^\d+[.)]\s*/, ''))
    .filter((l) => l.length > 0 && !l.startsWith('#'));
}

/**
 * Trích xuất sinh hiệu với regex linh hoạt
 */
function extractVitals(text) {
  const vitals = {};
  const bpMatch = text.match(/(?:huyết áp|ha|bp|blood pressure)\s*[:=]?\s*(\*?\*?\d{2,3}\s*\/\s*\d{2,3}(?:\s*mmHg)?\*?\*?)/i);
  if (bpMatch) vitals.bp = bpMatch[1].replace(/\*/g, '').trim();

  const pulseMatch = text.match(/(?:mạch|pulse|nhịp tim|hr|heart rate)\s*[:=]?\s*(\*?\*?\d{2,3}(?:\s*(?:l\/p|bpm|lần\/phút))?\*?\*?)/i);
  if (pulseMatch) vitals.pulse = pulseMatch[1].replace(/\*/g, '').trim();

  const tempMatch = text.match(/(?:nhiệt độ|thân nhiệt|temp|temperature)\s*[:=]?\s*(\*?\*?\d{2}(?:\.\d)?(?:\s*°?[Cc])?\*?\*?)/i);
  if (tempMatch) vitals.temp = tempMatch[1].replace(/\*/g, '').trim();

  const respMatch = text.match(/(?:nhịp thở|resp|respiratory rate|rr)\s*[:=]?\s*(\*?\*?\d{1,2}(?:\s*(?:l\/p|lần\/phút|bpm))?\*?\*?)/i);
  if (respMatch) vitals.resp = respMatch[1].replace(/\*/g, '').trim();

  const spo2Match = text.match(/(?:spo2|sp02)\s*[:=]?\s*(\*?\*?\d{2,3}(?:\s*%)?\*?\*?)/i);
  if (spo2Match) vitals.spo2 = spo2Match[1].replace(/\*/g, '').trim();

  const bmiMatch = text.match(/(?:bmi)\s*[:=]?\s*(\*?\*?\d{1,2}(?:\.\d)?(?:\s*kg\/m²)?\*?\*?)/i);
  if (bmiMatch) vitals.bmi = bmiMatch[1].replace(/\*/g, '').trim();

  return vitals;
}

/**
 * Trích xuất Bảng Đặt Vấn Đề (Problem List · 3 Tầng Ưu Tiên) từ Markdown Table
 */
function extractProblemListFromTable(text) {
  const problems = [];
  const lines = text.split(/\r?\n/);
  let tableStarted = false;
  let order = 1;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|') || !trimmed.endsWith('|')) {
      if (tableStarted && trimmed === '') break;
      continue;
    }
    if (trimmed.includes('---')) {
      tableStarted = true;
      continue;
    }
    if (!tableStarted) {
      if (
        trimmed.toLowerCase().includes('mức độ') ||
        trimmed.toLowerCase().includes('ưu tiên') ||
        trimmed.toLowerCase().includes('vấn đề')
      ) {
        continue;
      }
    }

    const cols = trimmed
      .split('|')
      .map((c) => c.trim())
      .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

    if (cols.length >= 2) {
      const priorityRaw = cols[0].toLowerCase();
      let priority = 'acute';
      if (
        priorityRaw.includes('tầng 1') ||
        priorityRaw.includes('đe dọa') ||
        priorityRaw.includes('threat') ||
        priorityRaw.includes('🔴') ||
        priorityRaw.includes('khẩn')
      ) {
        priority = 'life-threatening';
      } else if (
        priorityRaw.includes('tầng 3') ||
        priorityRaw.includes('mạn') ||
        priorityRaw.includes('chronic') ||
        priorityRaw.includes('tiền căn') ||
        priorityRaw.includes('🔵')
      ) {
        priority = 'chronic';
      } else if (
        priorityRaw.includes('tầng 2') ||
        priorityRaw.includes('cấp') ||
        priorityRaw.includes('acute') ||
        priorityRaw.includes('🟡')
      ) {
        priority = 'acute';
      }

      const problemName = cols[1].replace(/[*_`]/g, '').trim();
      const diagnosticOrientation = cols[2] ? cols[2].replace(/[*_`]/g, '').trim() : undefined;
      const immediateManagement = cols[3] ? cols[3].replace(/[*_`]/g, '').trim() : undefined;

      if (problemName) {
        problems.push({
          order: order++,
          priority,
          problemName,
          diagnosticOrientation:
            diagnosticOrientation && diagnosticOrientation !== '—' && diagnosticOrientation !== '-'
              ? diagnosticOrientation
              : undefined,
          immediateManagement:
            immediateManagement && immediateManagement !== '—' && immediateManagement !== '-'
              ? immediateManagement
              : undefined,
        });
      }
    }
  }
  return problems;
}

/**
 * Trích xuất các nhóm cận lâm sàng phân mục từ O (#### 1. Huyết học..., #### 2. Vi sinh...)
 */
function extractLabGroups(oText) {
  const groups = [];
  const regex = /(?:^|\n)#{3,4}\s*(?:\d+[.)]\s*)?([^\n]+)\n([\s\S]*?)(?=(?:^|\n)#{3,4}\s|$)/g;
  let m;
  while ((m = regex.exec(oText)) !== null) {
    const title = m[1].trim();
    if (/^(Dấu hiệu sinh tồn|Sinh hiệu|Triệu chứng thực thể|Khám thực thể|Khám)/i.test(title)) continue;
    const content = m[2].trim();
    if (content) {
      groups.push({
        groupName: title.replace(/^[*_`#]+|[*_`#]+$/g, '').trim(),
        content,
      });
    }
  }
  return groups;
}

/**
 * Trích xuất danh sách thuốc chuyên sâu từ khối Y lệnh thuốc
 */
function extractMedications(pText) {
  const blockRegex = /(?:^|\n)#{2,4}\s*(?:[^\n]*?)?(?:Y lệnh thuốc|Danh mục thuốc|Thuốc điều trị|Medications)[^\n]*\n([\s\S]*?)(?=(?:^|\n)#{2,4}\s|\n\s*---\s*\n|$)/i;
  const blockMatch = pText.match(blockRegex);
  const targetText = blockMatch ? blockMatch[1].trim() : pText;

  const meds = [];
  const itemRegex = /(?:^|\n)\s*(?:[-*]|\d+[.)])\s*\*\*([^*\n]+)\*\*\s*[:=]\s*([^\n]+)/g;
  let m;
  while ((m = itemRegex.exec(targetText)) !== null) {
    const drugName = m[1].replace(/[*_`]/g, '').trim();
    if (/^(Xử trí|Theo dõi|Tiêu chuẩn|Hội chẩn|Lưu ý|Chỉ tiêu|Chế độ|Lộ trình|Giai đoạn|Tần suất|Mục tiêu)/i.test(drugName)) {
      continue;
    }

    let rawRest = m[2].trim();
    let note = '';
    const noteMatch = rawRest.match(/[—–-]\s*\*([^*]+)\*/);
    if (noteMatch) {
      note = noteMatch[1].trim();
      rawRest = rawRest.replace(noteMatch[0], '').trim();
    }

    let route = 'PO';
    if (/\((PO|IV|SC|IM|Uống|Truyền tĩnh mạch|Tiêm bắp|Tiêm dưới da)[^)]*\)/i.test(rawRest)) {
      const rMatch = rawRest.match(/\((PO|IV|SC|IM|Uống|Truyền tĩnh mạch|Tiêm bắp|Tiêm dưới da)[^)]*\)/i);
      if (rMatch) {
        route = rMatch[1].trim();
        rawRest = rawRest.replace(rMatch[0], '').trim();
      }
    } else if (/truyền tĩnh mạch/i.test(rawRest)) {
      route = 'IV';
    } else if (/tiêm bắp/i.test(rawRest)) {
      route = 'IM';
    } else if (/uống/i.test(rawRest)) {
      route = 'PO';
    }

    const dose = rawRest
      .replace(/[*_`]/g, '')
      .replace(/^[—–-]\s*/, '')
      .replace(/[.—–-\s]+$/, '')
      .trim();

    meds.push({
      drug: drugName,
      dose: dose || 'Theo y lệnh',
      route,
      note,
    });
  }

  if (meds.length > 0) return meds;

  // Fallback Markdown Table format
  const lines = targetText.split(/\r?\n/);
  let isTable = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (trimmed.includes('---')) {
        isTable = true;
        continue;
      }
      if (isTable) {
        const cols = trimmed
          .split('|')
          .map((c) => c.trim())
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        if (cols.length >= 2) {
          meds.push({
            drug: cols[0].replace(/[*_`]/g, '').trim(),
            dose: cols[1].replace(/[*_`]/g, '').trim() || '',
            route: cols[2]?.replace(/[*_`]/g, '').trim() || 'PO',
            note: cols[3]?.replace(/[*_`]/g, '').trim() || '',
          });
        }
      }
    } else {
      isTable = false;
    }
  }

  return meds;
}

/**
 * Trích xuất cấu trúc SOAP toàn diện từ nội dung Markdown
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
      s: /(?:^|\n)##\s*(?:1[.)]\s*)?(?:📝\s*)?(?:S\b|Chủ quan|Subjective)[^\n]*\n([\s\S]*?)(?=(?:^|\n)##\s*(?:2[.)]\s*)?(?:🔬\s*)?(?:O\b|Khách quan|Objective)|$)/i,
      o: /(?:^|\n)##\s*(?:2[.)]\s*)?(?:🔬\s*)?(?:O\b|Khách quan|Objective)[^\n]*\n([\s\S]*?)(?=(?:^|\n)##\s*(?:3[.)]\s*)?(?:🧠\s*)?(?:A\b|Đánh giá|Biện luận|Assessment)|$)/i,
      a: /(?:^|\n)##\s*(?:3[.)]\s*)?(?:🧠\s*)?(?:A\b|Đánh giá|Biện luận|Assessment)[^\n]*\n([\s\S]*?)(?=(?:^|\n)##\s*(?:4[.)]\s*)?(?:📋\s*)?(?:P\b|Kế hoạch|Xử trí|Plan)|$)/i,
      p: /(?:^|\n)##\s*(?:4[.)]\s*)?(?:📋\s*)?(?:P\b|Kế hoạch|Xử trí|Plan)[^\n]*\n([\s\S]*?)$/i,
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
  const chiefComplaint =
    extractFieldFuzzy(sText, [
      'Lý do nhập viện / Than phiền chính',
      'Lý do nhập viện',
      'Than phiền chính',
      'Lý do khám',
      'LDVV',
      'Chief Complaint',
      'CC',
    ]) || 'Chưa ghi nhận';

  const historyOfPresentIllness =
    extractBlockFuzzy(sText, [
      'TCCN & Bệnh sử chi tiết',
      'Bệnh sử chi tiết',
      'Diễn tiến bệnh sử',
      'Bệnh sử',
      'History of Present Illness',
      'HPI',
    ]) ||
    extractFieldFuzzy(sText, [
      'TCCN & Bệnh sử chi tiết',
      'Bệnh sử chi tiết',
      'Diễn tiến bệnh sử',
      'Bệnh sử',
    ]) ||
    '';

  const pastMedicalHistory =
    extractBlockFuzzy(sText, ['Tiền căn & Bối cảnh dịch tễ', 'Tiền căn', 'Tiền sử', 'Dược sử', 'Past Medical History', 'PMH']) ||
    extractFieldFuzzy(sText, ['Tiền căn & Bối cảnh dịch tễ', 'Tiền căn', 'Tiền sử', 'Dược sử', 'Past Medical History', 'PMH']) ||
    'Chưa ghi nhận tiền căn đặc biệt';

  const familyHistory =
    extractBlockFuzzy(sText, ['Tiền căn gia đình', 'Tiền sử gia đình', 'Gia đình', 'Family History']) ||
    extractFieldFuzzy(sText, ['Tiền căn gia đình', 'Tiền sử gia đình', 'Gia đình', 'Family History']) ||
    undefined;

  const epidemiology =
    extractBlockFuzzy(sText, ['Bối cảnh dịch tễ', 'Yếu tố dịch tễ', 'Dịch tễ', 'Epidemiology']) ||
    extractFieldFuzzy(sText, ['Bối cảnh dịch tễ', 'Yếu tố dịch tễ', 'Dịch tễ', 'Epidemiology']) ||
    undefined;

  // Parse O
  const vitals = extractVitals(oText);

  const physicalExam =
    extractBlockFuzzy(oText, [
      'Triệu chứng thực thể khám được',
      'Khám thực thể trọng tâm',
      'Khám thực thể',
      'Khám lâm sàng',
      'Physical Exam',
      'PE',
    ]) ||
    extractFieldFuzzy(oText, [
      'Triệu chứng thực thể khám được',
      'Khám thực thể trọng tâm',
      'Khám thực thể',
      'Khám lâm sàng',
    ]) ||
    '';

  const labsAndImaging =
    extractBlockFuzzy(oText, [
      'Cận lâm sàng tại thời điểm vào viện',
      'Cận lâm sàng & Hình ảnh học',
      'Cận lâm sàng',
      'Xét nghiệm & Cận lâm sàng',
      'Xét nghiệm',
      'Hình ảnh học',
      'Labs and Imaging',
      'Labs',
    ]) ||
    extractFieldFuzzy(oText, [
      'Cận lâm sàng tại thời điểm vào viện',
      'Cận lâm sàng & Hình ảnh học',
      'Cận lâm sàng',
      'Xét nghiệm & Cận lâm sàng',
      'Xét nghiệm',
      'Hình ảnh học',
      'Labs',
    ]) ||
    '';

  const labGroups = extractLabGroups(oText);

  const imagingFindings =
    extractBlockFuzzy(oText, [
      'Chẩn đoán hình ảnh & Đo độ đàn hồi',
      'Chẩn đoán hình ảnh',
      'Hình ảnh học',
      'Siêu âm',
      'Imaging',
    ]) || undefined;

  // Parse A
  let problemList = extractProblemListFromTable(aText);
  if (problemList.length === 0) {
    const problemSectionText = extractBlockFuzzy(aText, [
      'Bảng Đặt Vấn Đề',
      'Đặt Vấn Đề',
      'Problem List',
      'Danh sách vấn đề',
    ]) || '';
    if (problemSectionText) {
      problemList = extractProblemListFromTable(problemSectionText);
    }
  }

  const primaryDiagnosis =
    extractFieldFuzzy(aText, ['Chẩn đoán xác định', 'Chẩn đoán sơ bộ', 'Chẩn đoán chính', 'Primary Diagnosis']) || '';
  const icd10 = (extractFieldFuzzy(aText, ['Mã ICD-10', 'Mã ICD', 'ICD-10', 'ICD10']) || '')?.replace(/[`]/g, '');
  const differentials = extractListFuzzy(aText, [
    'Chẩn đoán phân biệt cần loại trừ',
    'Chẩn đoán phân biệt',
    'Phân biệt',
    'Differentials',
    'DDx',
  ]);
  const riskStratification =
    extractBlockFuzzy(aText, [
      'Phân tầng nguy cơ & Thang điểm lượng giá',
      'Phân tầng nguy cơ',
      'Thang điểm lượng giá',
      'Thang điểm',
      'Risk Stratification',
    ]) ||
    extractFieldFuzzy(aText, [
      'Phân tầng nguy cơ & Thang điểm lượng giá',
      'Phân tầng nguy cơ',
      'Thang điểm lượng giá',
      'Thang điểm',
      'Risk Stratification',
    ]) ||
    '';

  const clinicalReasoning =
    extractBlockFuzzy(aText, [
      'Biện luận lâm sàng chi tiết',
      'Biện luận lâm sàng theo từng vấn đề',
      'Biện luận lâm sàng',
      'Biện luận chẩn đoán',
      'Clinical Reasoning',
    ]) || undefined;

  // Parse P
  const immediateActions =
    extractBlockFuzzy(pText, ['Xử trí ban đầu & Tư vấn hỗ trợ', 'Xử trí cấp cứu & Ban đầu', 'Xử trí cấp cứu', 'Xử trí ban đầu', 'Immediate Actions']) ||
    extractFieldFuzzy(pText, ['Xử trí ban đầu & Tư vấn hỗ trợ', 'Xử trí cấp cứu & Ban đầu', 'Xử trí cấp cứu', 'Xử trí ban đầu', 'Immediate Actions']) ||
    '';

  const medications = extractMedications(pText);

  const monitoringAndTargets =
    extractBlockFuzzy(pText, [
      'Chỉ tiêu theo dõi & Mục tiêu lâm sàng',
      'Kế hoạch theo dõi & Mục tiêu',
      'Theo dõi & Mục tiêu',
      'Monitoring and Targets',
    ]) ||
    extractFieldFuzzy(pText, [
      'Chỉ tiêu theo dõi & Mục tiêu lâm sàng',
      'Kế hoạch theo dõi & Mục tiêu',
      'Theo dõi & Mục tiêu',
      'Monitoring and Targets',
    ]) ||
    '';

  const treatmentRoadmap =
    extractBlockFuzzy(pText, [
      'LỘ TRÌNH ĐIỀU TRỊ & GIÁM SÁT DÀI HẠN',
      'LỘ TRÌNH ĐIỀU TRỊ',
      'Lộ trình điều trị',
      'Treatment Roadmap',
      'Roadmap',
    ]) || undefined;

  const lifestyleAndCounseling =
    extractBlockFuzzy(pText, [
      'Chế độ sinh hoạt & Tư vấn sống khỏe',
      'Chế độ sinh hoạt',
      'Tư vấn sống khỏe',
      'Lối sống & Dinh dưỡng',
      'Lifestyle',
    ]) || undefined;

  const discontinuationCriteria =
    extractBlockFuzzy(pText, [
      'Tiêu chuẩn cân nhắc Ngưng thuốc',
      'Tiêu chuẩn ngưng thuốc',
      'Ngưng thuốc NAs',
      'Ngưng điều trị',
      'Discontinuation Criteria',
    ]) || undefined;

  const consultationOrReferral =
    extractBlockFuzzy(pText, [
      'Tiêu chuẩn hội chẩn / Chuyển viện / Can thiệp',
      'Hội chẩn / Chuyển viện',
      'Hội chẩn',
      'Chuyển viện',
      'Consultation / Referral',
    ]) ||
    extractFieldFuzzy(pText, [
      'Tiêu chuẩn hội chẩn / Chuyển viện / Can thiệp',
      'Hội chẩn / Chuyển viện',
      'Hội chẩn',
      'Chuyển viện',
      'Consultation / Referral',
    ]) ||
    '';

  return {
    s: {
      chiefComplaint,
      historyOfPresentIllness,
      pastMedicalHistory,
      familyHistory,
      epidemiology,
      symptomsList: [],
      historyPearls: '',
    },
    o: {
      vitals,
      physicalExam,
      labsAndImaging,
      labGroups: labGroups.length > 0 ? labGroups : undefined,
      imagingFindings,
      objectivePitfalls: '',
    },
    a: {
      problemList: problemList.length > 0 ? problemList : undefined,
      primaryDiagnosis,
      icd10,
      differentials,
      riskStratification,
      clinicalReasoning,
      diagnosticPearls: '',
    },
    p: {
      immediateActions,
      medications,
      monitoringAndTargets,
      treatmentRoadmap,
      lifestyleAndCounseling,
      discontinuationCriteria,
      consultationOrReferral,
      takeawayLessons: '',
    },
  };
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

  // Lưu file .md trực tiếp vào thư mục DocSpace ba/
  if (!fs.existsSync(DOCSPACE_BA_DIR)) {
    fs.mkdirSync(DOCSPACE_BA_DIR, { recursive: true });
  }
  const destMdPath = path.join(DOCSPACE_BA_DIR, `${caseId}.md`);
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
  console.log(`   ➔ Đã lưu file Markdown vào DocSpace: ${destMdPath}`);

  // Đồng bộ thêm vào Knowledge Vault nếu có thư mục
  if (fs.existsSync(VAULT_BA_DIR)) {
    const vaultDestPath = path.join(VAULT_BA_DIR, `${caseId}.md`);
    fs.writeFileSync(vaultDestPath, contentToSave, 'utf-8');
  }

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

  console.log(`🔍 Tìm thấy ${filesToProcess.length} ca lâm sàng cần nạp vào DocSpace / Knowledge Vault...`);

  // Đọc catalog hiện tại (ưu tiên DocSpace catalog)
  const primaryCatalogPath = fs.existsSync(DOCSPACE_CATALOG_PATH)
    ? DOCSPACE_CATALOG_PATH
    : VAULT_CATALOG_PATH;

  if (!fs.existsSync(primaryCatalogPath)) {
    console.error(`❌ Không tìm thấy catalog: ${primaryCatalogPath}`);
    process.exit(1);
  }

  const catalogRaw = fs.readFileSync(primaryCatalogPath, 'utf-8');
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

  // Ghi lại catalog DocSpace chính
  if (fs.existsSync(DOCSPACE_DATA_DIR)) {
    fs.writeFileSync(DOCSPACE_THUCHANH_PATH, JSON.stringify(thucHanhArticles, null, 2), 'utf-8');
    fs.writeFileSync(DOCSPACE_CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf-8');
    console.log(`\n💾 Đã lưu catalog DocSpace (${thucHanhArticles.length} ca BA): ${DOCSPACE_THUCHANH_PATH}`);
    console.log(`💾 Đã cập nhật master catalog DocSpace: ${DOCSPACE_CATALOG_PATH}`);
  }

  // Đồng bộ thêm vào Knowledge Vault nếu có
  if (fs.existsSync(VAULT_DATA_DIR)) {
    fs.writeFileSync(VAULT_THUCHANH_PATH, JSON.stringify(thucHanhArticles, null, 2), 'utf-8');
    fs.writeFileSync(VAULT_CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf-8');
    console.log(`🔄 Đã đồng bộ sang Knowledge Vault: ${VAULT_CATALOG_PATH}`);
  }

  console.log(`
🎉 HOÀN TẤT NẠP DỮ LIỆU VÀO KNOWLEDGE VAULT:
   • Ca nạp mới : ${newCount}
   • Ca cập nhật: ${updateCount}
   • Tổng bài trong Vault: ${catalog.length} bài
`);
}

main();
