/**
 * CliniPortal — Knowledge Vault Metadata Enrichment & Linting Script
 * Chuẩn hóa và làm giàu Frontmatter cho toàn bộ 2.314+ bài viết trong knowledge-vault/
 * Đảm bảo liên kết tối ưu với Động cơ Suy luận & Chuỗi Bệnh học của DocSpace MedLens
 */

const fs = require('fs');
const path = require('path');

const VAULT_ROOT = path.resolve(__dirname, '../../knowledge-vault');

// Disease Dictionary: Mapping disease patterns to ICD-10 codes and canonical specialties
const DISEASE_RULES = [
  {
    regex: /\b(copd|phổi tắc nghẽn mạn|bptnmt)\b/i,
    icd: ['J44'],
    specialty: 'Hô hấp',
    aliases: ['COPD', 'Bệnh phổi tắc nghẽn mạn tính', 'Chronic Obstructive Pulmonary Disease']
  },
  {
    regex: /\b(viêm phổi|pneumonia)\b/i,
    icd: ['J18'],
    specialty: 'Hô hấp',
    aliases: ['Viêm phổi', 'Viêm phổi cộng đồng', 'Pneumonia']
  },
  {
    regex: /\b(hen phế quản|hen suyễn|asthma)\b/i,
    icd: ['J45'],
    specialty: 'Hô hấp',
    aliases: ['Hen phế quản', 'Hen suyễn', 'Asthma']
  },
  {
    regex: /\b(thuyên tắc phổi|pe|pulmonary embolism)\b/i,
    icd: ['I26'],
    specialty: 'Hô hấp',
    aliases: ['Thuyên tắc phổi', 'Thuyên tắc động mạch phổi', 'Pulmonary Embolism']
  },
  {
    regex: /\b(nhồi máu cơ tim|nmct|stemi|nstemi|acute myocardial infarction|hội chứng mạch vành)\b/i,
    icd: ['I21'],
    specialty: 'Tim mạch',
    aliases: ['Nhồi máu cơ tim', 'Hội chứng mạch vành cấp', 'Myocardial Infarction']
  },
  {
    regex: /\b(suy tim|heart failure)\b/i,
    icd: ['I50'],
    specialty: 'Tim mạch',
    aliases: ['Suy tim', 'Suy tim cấp', 'Suy tim mạn', 'Heart Failure']
  },
  {
    regex: /\b(tăng huyết áp|hypertension)\b/i,
    icd: ['I10'],
    specialty: 'Tim mạch',
    aliases: ['Tăng huyết áp', 'Cao huyết áp', 'Hypertension']
  },
  {
    regex: /\b(viêm tụy cấp|acute pancreatitis)\b/i,
    icd: ['K85'],
    specialty: 'Tiêu hóa - Gan mật',
    aliases: ['Viêm tụy cấp', 'Acute Pancreatitis']
  },
  {
    regex: /\b(xuất huyết tiêu hóa|gastrointestinal bleeding)\b/i,
    icd: ['K92'],
    specialty: 'Tiêu hóa - Gan mật',
    aliases: ['Xuất huyết tiêu hóa', 'Xuất huyết tiêu hóa trên', 'GI Bleeding']
  },
  {
    regex: /\b(viêm ruột thừa|appendicitis)\b/i,
    icd: ['K35'],
    specialty: 'Ngoại khoa - Chấn thương',
    aliases: ['Viêm ruột thừa', 'Viêm ruột thừa cấp', 'Appendicitis']
  },
  {
    regex: /\b(viêm túi mật|cholecystitis)\b/i,
    icd: ['K81'],
    specialty: 'Ngoại khoa - Chấn thương',
    aliases: ['Viêm túi mật', 'Viêm túi mật cấp', 'Cholecystitis']
  },
  {
    regex: /\b(xơ gan|cirrhosis)\b/i,
    icd: ['K74'],
    specialty: 'Tiêu hóa - Gan mật',
    aliases: ['Xơ gan', 'Cirrhosis']
  },
  {
    regex: /\b(sốt xuất huyết|dengue)\b/i,
    icd: ['A97'],
    specialty: 'Nhiễm trùng - Nhiệt đới',
    aliases: ['Sốt xuất huyết Dengue', 'SXH Dengue', 'Dengue Fever']
  },
  {
    regex: /\b(nhiễm khuẩn huyết|nhiễm trùng huyết|sepsis|sốc nhiễm khuẩn)\b/i,
    icd: ['A41'],
    specialty: 'Hồi sức - Cấp cứu',
    aliases: ['Nhiễm khuẩn huyết', 'Nhiễm trùng huyết', 'Sepsis']
  },
  {
    regex: /\b(đái tháo đường|tiểu đường|diabetes|dka|nhiễm toan ceton)\b/i,
    icd: ['E11', 'E10'],
    specialty: 'Nội tiết - Thận',
    aliases: ['Đái tháo đường', 'Tiểu đường', 'Diabetes Mellitus']
  },
  {
    regex: /\b(tổn thương thận cấp|aki|suy thận cấp|acute kidney injury)\b/i,
    icd: ['N17'],
    specialty: 'Thận - Tiết niệu',
    aliases: ['Tổn thương thận cấp', 'Suy thận cấp', 'Acute Kidney Injury', 'AKI']
  },
  {
    regex: /\b(bệnh thận mạn|suy thận mạn|ckd|chronic kidney disease)\b/i,
    icd: ['N18'],
    specialty: 'Thận - Tiết niệu',
    aliases: ['Bệnh thận mạn', 'Suy thận mạn', 'Chronic Kidney Disease', 'CKD']
  },
  {
    regex: /\b(lupus|viêm thận lupus|sle)\b/i,
    icd: ['M32'],
    specialty: 'Nội tiết - Thận',
    aliases: ['Lupus ban đỏ hệ thống', 'Systemic Lupus Erythematosus', 'SLE']
  },
  {
    regex: /\b(đột quỵ|tai biến mạch máu não|stroke|nhồi máu não)\b/i,
    icd: ['I63'],
    specialty: 'Thần kinh',
    aliases: ['Đột quỵ não', 'Tai biến mạch máu não', 'Nhồi máu não', 'Stroke']
  },
  {
    regex: /\b(viêm màng não|meningitis)\b/i,
    icd: ['G00'],
    specialty: 'Thần kinh',
    aliases: ['Viêm màng não', 'Meningitis']
  },
  {
    regex: /\b(nhiễm trùng tiểu|nhiễm trùng đường tiết niệu|uti)\b/i,
    icd: ['N39.0'],
    specialty: 'Thận - Tiết niệu',
    aliases: ['Nhiễm trùng đường tiết niệu', 'Nhiễm trùng tiểu', 'UTI']
  },
  {
    regex: /\b(sỏi thận|sỏi niệu|cơn đau quặn thận)\b/i,
    icd: ['N20', 'N23'],
    specialty: 'Thận - Tiết niệu',
    aliases: ['Sỏi thận', 'Cơn đau quặn thận', 'Renal Colic']
  }
];

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return null;
  const rawMeta = match[1];
  const body = content.slice(match[0].length);
  return { rawMeta, body, fullMatch: match[0] };
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fm = parseFrontmatter(content);
  if (!fm) return false;

  const fileName = path.basename(filePath);
  const dirName = path.dirname(filePath);

  let updated = false;
  let newMeta = fm.rawMeta;

  // Extract current metadata fields roughly
  const titleMatch = newMeta.match(/^title:\s*["']?([^"'\r\n]+)["']?/m);
  const currentTitle = titleMatch ? titleMatch[1].trim() : fileName.replace(/\.md$/, '');
  const hasIcd = /^icd10:/m.test(newMeta);
  const specialtyMatch = newMeta.match(/^specialty:\s*["']?([^"'\r\n]+)["']?/m);
  const currentSpecialty = specialtyMatch ? specialtyMatch[1].trim() : '';

  const searchText = `${fileName} ${currentTitle} ${dirName}`.toLowerCase();

  for (const rule of DISEASE_RULES) {
    if (rule.regex.test(searchText)) {
      // 1. Check and add ICD-10 if missing
      if (!hasIcd) {
        const icdYaml = `icd10:\n` + rule.icd.map(c => `  - "${c}"`).join('\n');
        newMeta = newMeta.trimEnd() + '\n' + icdYaml + '\n';
        updated = true;
      }

      // 2. Fix specialty discrepancy
      if (currentSpecialty && rule.specialty && currentSpecialty !== rule.specialty) {
        // Only fix if currentSpecialty is clearly wrong (e.g. COPD has Tim mạch, or Hô hấp has Tim mạch)
        if (
          (rule.specialty === 'Hô hấp' && currentSpecialty === 'Tim mạch') ||
          (rule.specialty === 'Nội tiết - Thận' && currentSpecialty === 'Tim mạch') ||
          (rule.specialty === 'Tiêu hóa - Gan mật' && currentSpecialty === 'Hô hấp')
        ) {
          newMeta = newMeta.replace(/^specialty:.*$/m, `specialty: "${rule.specialty}"`);
          updated = true;
        }
      }

      break;
    }
  }

  if (updated) {
    const newContent = `---\n${newMeta.trim()}\n---\n\n${fm.body.replace(/^\s+/, '')}`;
    fs.writeFileSync(filePath, newContent, 'utf-8');
    return true;
  }

  return false;
}

function walkAndEnrich(dir) {
  let count = 0;
  let total = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '.obsidian' && entry.name !== '_resources') {
        const res = walkAndEnrich(full);
        count += res.count;
        total += res.total;
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      total++;
      if (processFile(full)) {
        count++;
      }
    }
  }

  return { count, total };
}

console.log('[ENRICH] Starting Knowledge Vault metadata enrichment...');
const result = walkAndEnrich(VAULT_ROOT);
console.log(`[ENRICH] Completed. Scanned ${result.total} files, enriched ${result.count} files.`);
