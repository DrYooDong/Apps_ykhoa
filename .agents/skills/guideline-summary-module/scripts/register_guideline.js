/**
 * register_guideline.js
 * 
 * Script Node.js tự động đăng ký bản ghi metadata mới vào kho lưu trữ tĩnh:
 *   src/content/ebm/guidelines/js/kho-guidelines-registry.ts
 * và kiểm tra tính hợp lệ của specialty, conditionKey với guidelinesdata.ts.
 * 
 * Cách dùng:
 *   node .agents/skills/guideline-summary-module/scripts/register_guideline.js \
 *     --slug="2026-apasl-viem-gan-b" \
 *     --title="APASL 2026: Hướng Dẫn Quản Lý Viêm Gan B" \
 *     --titleEn="APASL 2026 guidelines on the management of hepatitis B" \
 *     --org="APASL" \
 *     --year=2026 \
 *     --specialty="gi" \
 *     --sourceType="intl-guideline" \
 *     --design="guideline" \
 *     --impact="practice-changing" \
 *     --conditionKey="hepb" \
 *     --icd10="B18.1,B18.0" \
 *     --summary="..." \
 *     --intervention="..."
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '../../../../');
const REGISTRY_FILE = path.join(WORKSPACE_ROOT, 'src/content/ebm/guidelines/js/kho-guidelines-registry.ts');
const DATA_FILE = path.join(WORKSPACE_ROOT, 'src/content/ebm/guidelines/js/guidelinesdata.ts');

function parseArgs() {
  const args = {};
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith('--')) {
      const eqIdx = arg.indexOf('=');
      if (eqIdx !== -1) {
        const key = arg.slice(2, eqIdx).trim();
        const val = arg.slice(eqIdx + 1).trim();
        args[key] = val;
      } else {
        const key = arg.slice(2).trim();
        const nextVal = process.argv[i + 1];
        if (nextVal && !nextVal.startsWith('--')) {
          args[key] = nextVal.trim();
          i++;
        } else {
          args[key] = true;
        }
      }
    }
  }
  return args;
}

function checkGuidelinesData(specialty, conditionKey) {
  if (!fs.existsSync(DATA_FILE)) {
    console.warn(`⚠️ Không tìm thấy ${DATA_FILE} để kiểm tra đối chiếu.`);
    return;
  }
  const dataContent = fs.readFileSync(DATA_FILE, 'utf8');

  // Check specialty
  if (specialty) {
    const specRegex = new RegExp(`['"]?${specialty}['"]?\\s*:\\s*{`, 'i');
    if (specRegex.test(dataContent)) {
      console.log(`✅ Specialty '${specialty}' hợp lệ và tồn tại trong guidelinesdata.ts`);
    } else {
      console.warn(`⚠️ Cảnh báo: Specialty '${specialty}' chưa được khai báo trong SPECIALTIES của guidelinesdata.ts!`);
    }
  }

  // Check conditionKey
  if (conditionKey) {
    const condRegex = new RegExp(`['"]?${conditionKey}['"]?\\s*:\\s*{`, 'i');
    if (condRegex.test(dataContent)) {
      console.log(`✅ ConditionKey '${conditionKey}' hợp lệ và tồn tại trong CLINICAL_CONDITIONS của guidelinesdata.ts`);
    } else {
      console.warn(`⚠️ Cảnh báo: ConditionKey '${conditionKey}' CHƯA CÓ trong CLINICAL_CONDITIONS của guidelinesdata.ts.`);
      console.warn(`👉 Gợi ý: Bổ sung vào CLINICAL_CONDITIONS trong guidelinesdata.ts:`);
      console.warn(`   ${conditionKey}: { name: '[Tên Bệnh]', specialty: '${specialty || "gi"}', icd10Prefix: '[ICD]' },`);
    }
  }
}

function registerGuideline(args) {
  if (!args.slug || !args.title) {
    console.error('❌ Thiếu tham số bắt buộc: --slug và --title');
    console.log('Ví dụ: node register_guideline.js --slug="2026-apasl-vgsv" --title="..."');
    process.exit(1);
  }

  const slug = args.slug.replace(/\.mdx$/i, '');
  const fileName = args.file || `${slug}.mdx`;
  const year = parseInt(args.year, 10) || new Date().getFullYear();
  const org = args.org || args.organization || 'Hội Chuyên Khoa';
  const specialty = args.specialty || 'gi';
  const sourceType = args.sourceType || 'intl-guideline';
  const design = args.design || 'guideline';
  const impact = args.impact || 'practice-changing';
  const conditionKey = args.conditionKey || '';
  
  let icd10Arr = [];
  if (args.icd10) {
    icd10Arr = args.icd10.split(',').map(s => s.trim()).filter(Boolean);
  }

  checkGuidelinesData(specialty, conditionKey);

  if (!fs.existsSync(REGISTRY_FILE)) {
    console.error(`❌ Không tìm thấy file registry: ${REGISTRY_FILE}`);
    process.exit(1);
  }

  let registryContent = fs.readFileSync(REGISTRY_FILE, 'utf8');

  // Kiểm tra trùng lặp slug
  const idCheckRegex = new RegExp(`"id"\\s*:\\s*"${slug}"`, 'i');
  if (idCheckRegex.test(registryContent)) {
    console.warn(`⚠️ ID '${slug}' đã tồn tại trong KHO_GUIDELINES_STATIC!`);
    if (!args.force) {
      console.log('👉 Dùng thêm cờ --force nếu muốn ghi đè.');
      return;
    }
  }

  const newEntry = {
    id: slug,
    title: args.title,
    titleEn: args.titleEn || args.title,
    drug: args.drug || '',
    sourceType: sourceType,
    specialty: specialty,
    design: design,
    intervention: args.intervention || args.summary || args.title,
    primaryEndpoint: args.primaryEndpoint || args.title,
    keyResults: args.keyResults || args.summary || '',
    impact: impact,
    year: year,
    organization: org,
    journal: args.journal || `${org} Practice Guidelines ${year}`,
    phase: args.phase || (design === 'rct' ? 'Phase III RCT' : 'Clinical Practice Guidelines / EBM'),
    population: args.population || 'Bệnh nhân trong nhóm chỉ định lâm sàng.',
    summary: args.summary || args.title,
    detailedConclusion: args.detailedConclusion || args.summary || '',
    file: fileName,
    conditionKey: conditionKey,
    icd10: icd10Arr.length > 0 ? icd10Arr : ['Z00'],
    asianData: args.asianData === 'true' || args.asianData === true || true,
    bookmarked: false
  };

  const formattedJson = JSON.stringify(newEntry, null, 4)
    .split('\n')
    .map(line => '  ' + line)
    .join('\n');

  // Tìm vị trí mở mảng KHO_GUIDELINES_STATIC
  const staticArrayRegex = /export\s+const\s+KHO_GUIDELINES_STATIC\s*:\s*Study\[\]\s*=\s*\[\r?\n/;
  const match = registryContent.match(staticArrayRegex);

  if (!match) {
    console.error('❌ Không tìm thấy khai báo `export const KHO_GUIDELINES_STATIC: Study[] = [` trong file registry.');
    process.exit(1);
  }

  const insertPos = match.index + match[0].length;
  const updatedContent = 
    registryContent.slice(0, insertPos) +
    formattedJson + ',\n' +
    registryContent.slice(insertPos);

  fs.writeFileSync(REGISTRY_FILE, updatedContent, 'utf8');
  console.log(`🎉 ĐĂNG KÝ THÀNH CÔNG: '${slug}' vào kho-guidelines-registry.ts!`);
  console.log(`   - File: ${fileName}`);
  console.log(`   - Specialty: ${specialty}`);
  console.log(`   - ConditionKey: ${conditionKey}`);
  console.log(`   - Year: ${year}`);
}

if (require.main === module) {
  const args = parseArgs();
  registerGuideline(args);
}

module.exports = { registerGuideline };
