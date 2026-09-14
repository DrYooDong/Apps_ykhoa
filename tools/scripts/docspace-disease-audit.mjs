/**
 * CliniPortal MedLens DocSpace — Disease Integration & Readiness Audit CLI
 * Kiểm tra tính toàn vẹn 10 tiêu chí cho một mặt bệnh lâm sàng (hoặc tất cả các bệnh đã nạp)
 * 
 * Cách dùng:
 *   node tools/scripts/docspace-disease-audit.mjs <slug_benh>
 *   node tools/scripts/docspace-disease-audit.mjs all
 * 
 * Ví dụ:
 *   node tools/scripts/docspace-disease-audit.mjs viem_mang_nao
 *   node tools/scripts/docspace-disease-audit.mjs sot_xuat_huyet_dengue
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const VALID_SPECIALTIES = new Set([
  'Truyền nhiễm',
  'Tim mạch',
  'Hô hấp',
  'Tiêu hóa',
  'Tiết niệu',
  'Nội tiết',
  'Thần kinh',
  'Sản phụ khoa',
  'Da liễu',
  'Huyết học',
  'Nhi khoa',
  'Hồi sức - Cấp cứu',
  'Cơ xương khớp',
  'Ngoại khoa',
  'Tai Mũi Họng - Răng Hàm Mặt - Mắt'
]);

function logPass(msg) {
  console.log(`  ✅ [PASS] ${msg}`);
}

function logFail(msg) {
  console.error(`  ❌ [FAIL] ${msg}`);
}

function logWarn(msg) {
  console.warn(`  ⚠️  [WARN] ${msg}`);
}

function auditDisease(slug) {
  console.log(`\n🩺 =============================================================`);
  console.log(`   KIỂM ĐỊNH TÍCH HỢP DOCSPACE CHO MẶT BỆNH: [${slug}]`);
  console.log(`=============================================================`);

  let passCount = 0;
  let totalCount = 10;

  // 1. Kiểm tra Enriched JSON
  const enrichedPath = path.join(ROOT_DIR, `src/content/docspace/data/enriched/${slug}.json`);
  let enrichedData = null;
  if (fs.existsSync(enrichedPath)) {
    try {
      enrichedData = JSON.parse(fs.readFileSync(enrichedPath, 'utf8'));
      logPass(`1. Tệp Enriched JSON tồn tại (${(fs.statSync(enrichedPath).size / 1024).toFixed(1)} KB)`);
      passCount++;
    } catch (e) {
      logFail(`1. Lỗi phân tích cú pháp Enriched JSON: ${e.message}`);
    }
  } else {
    logFail(`1. Không tìm thấy tệp Enriched JSON: ${enrichedPath}`);
  }

  // 2. Kiểm tra Enriched index.ts
  const indexPath = path.join(ROOT_DIR, 'src/content/docspace/data/enriched/index.ts');
  const indexContent = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : '';
  if (indexContent.includes(`'${slug}':`)) {
    logPass(`2. Đã đăng ký trong src/content/docspace/data/enriched/index.ts`);
    passCount++;
  } else {
    logFail(`2. Chưa đăng ký trong index.ts (Chạy: node tools/scripts/build-enriched-cdss.mjs)`);
  }

  // 3. Kiểm tra Chuỗi Chẩn Đoán & Severity Grading
  const dcdPath = path.join(ROOT_DIR, 'src/content/docspace/data/diagnostic-criteria-database.ts');
  const dcdContent = fs.existsSync(dcdPath) ? fs.readFileSync(dcdPath, 'utf8') : '';
  const hasInDcd = dcdContent.includes(`'${slug}':`) || indexContent.includes(`'${slug}':`);
  const hasSeverityGrading = enrichedData?.severityGrading && Array.isArray(enrichedData.severityGrading) && enrichedData.severityGrading.length >= 2;

  if (hasInDcd && hasSeverityGrading) {
    logPass(`3. CSDL Chuỗi bệnh học sở hữu đầy đủ phân độ nặng severityGrading (${enrichedData.severityGrading.length} phân độ)`);
    passCount++;
  } else if (!hasSeverityGrading) {
    logFail(`3. Thiếu trường 'severityGrading' hoặc có ít hơn 2 phân độ nặng`);
  } else {
    logFail(`3. Bệnh lý chưa được ánh xạ trong DIAGNOSTIC_CHAIN_DATABASE`);
  }

  // 4. Kiểm tra Chuẩn hóa Chuyên khoa (Specialty)
  const specialty = enrichedData?.specialty?.trim();
  if (specialty && VALID_SPECIALTIES.has(specialty)) {
    logPass(`4. Chuyên khoa chuẩn y tế: "${specialty}"`);
    passCount++;
  } else {
    logFail(`4. Chuyên khoa "${specialty || 'rỗng'}" không chuẩn y tế (Tránh nối chuỗi như "Thần kinh - Truyền nhiễm - Hồi sức")`);
  }

  // 5. Kiểm tra Tồn tại trong Clinical Rules Diseases (Kho Chuyên Khoa)
  const disDir = path.join(ROOT_DIR, 'src/content/knowledge-vault/data/diseases');
  let disList = [];
  try {
    const files = fs.readdirSync(disDir).filter(f => f.endsWith('.json'));
    for (const f of files) {
      const items = JSON.parse(fs.readFileSync(path.join(disDir, f), 'utf8'));
      if (Array.isArray(items)) disList.push(...items);
    }
  } catch {}

  const matchedDis = disList.find(d => 
    d.id === slug || 
    d.id === slug.replace(/_/g, '-') || 
    d.id === slug.replace(/-/g, '_') ||
    d.id.startsWith(slug) ||
    slug.startsWith(d.id) ||
    (d.ten && enrichedData?.diseaseName && d.ten.toLowerCase().includes(enrichedData.diseaseName.toLowerCase().split('(')[0].trim()))
  );
  if (matchedDis) {
    logPass(`5. Đã khai báo thực thể bệnh trong CSDL diseases/ (ID: ${matchedDis.id})`);
    passCount++;
  } else {
    logFail(`5. Chưa khai báo thực thể bệnh trong CSDL diseases/`);
  }

  // 6. Kiểm tra Toàn vẹn Triệu chứng (Zero Orphan Symptoms)
  const symPath = path.join(ROOT_DIR, 'src/content/knowledge-vault/data/clinical-rules-symptoms.json');
  let symList = [];
  try {
    symList = JSON.parse(fs.readFileSync(symPath, 'utf8'));
  } catch {}
  const symSet = new Set(symList.map(s => s.id));

  if (matchedDis && Array.isArray(matchedDis.dd)) {
    const orphanList = matchedDis.dd.map(([id]) => id).filter(id => !symSet.has(id));
    if (orphanList.length === 0) {
      logPass(`6. Không có triệu chứng mồ côi (100% trong số ${matchedDis.dd.length} triệu chứng đã được định nghĩa)`);
      passCount++;
    } else {
      logFail(`6. Phát hiện ${orphanList.length} triệu chứng mồ côi chưa có trong từ điển: ${orphanList.join(', ')}`);
    }
  } else {
    logFail(`6. Không thể kiểm tra triệu chứng do bệnh lý chưa có trong CSDL`);
  }

  // 7. Kiểm tra Ca Bệnh Mẫu (Sample Case) ở Bước 1
  const casesPath = path.join(ROOT_DIR, 'src/content/knowledge-vault/data/sample-clinical-cases.json');
  let sampleCases = [];
  try {
    sampleCases = JSON.parse(fs.readFileSync(casesPath, 'utf8'));
  } catch {}

  const normSlug = slug.replace(/_/g, ' ').toLowerCase();
  const sampleCase = sampleCases.find(c => {
    const normTen = c.ten.toLowerCase();
    return normTen.includes(normSlug) || 
      (slug.includes('sot_xuat_huyet') && (normTen.includes('sxh') || normTen.includes('dengue'))) ||
      (slug.includes('viem_mang_nao') && (normTen.includes('màng não') || normTen.includes('não mô cầu'))) ||
      (enrichedData?.diseaseName && normTen.includes(enrichedData.diseaseName.toLowerCase().split('(')[0].trim()));
  });

  if (sampleCase) {
    logPass(`7. Ca lâm sàng mẫu Bước 1 sẵn sàng: "${sampleCase.ten}" (${sampleCase.sel?.length || 0} triệu chứng)`);
    passCount++;
  } else {
    logFail(`7. Chưa nạp ca lâm sàng mẫu vào sample-clinical-cases.json`);
  }

  // 8. Kiểm tra Hồ Sơ Ca Bệnh Thực Chiến SOAP ở Bước 4 Mục 9
  const soapCatalogPath = path.join(ROOT_DIR, 'src/content/docspace/src/data/vault-catalog-thuc-hanh.json');
  let soapList = [];
  try {
    soapList = JSON.parse(fs.readFileSync(soapCatalogPath, 'utf8'));
  } catch {}

  const soapCase = soapList.find(s => {
    const sid = s.id?.toLowerCase() || '';
    const sfile = s.fullFileName?.toLowerCase() || '';
    const stitle = s.title?.toLowerCase() || '';
    return sid.includes(slug) || sid.includes(slug.replace(/_/g, '-')) || 
      sfile.includes(slug) ||
      (slug.includes('sot_xuat_huyet') && (sid.includes('sot_xuat_huyet') || sfile.includes('sot_xuat_huyet'))) ||
      stitle.includes(normSlug);
  });

  if (soapCase) {
    logPass(`8. Ca bệnh thực chiến SOAP sẵn sàng: [${soapCase.id}] - "${soapCase.title}"`);
    passCount++;
  } else {
    logFail(`8. Chưa nạp ca thực chiến SOAP Markdown vào kho ba/ hoặc catalog thực hành`);
  }

  // 9. Kiểm tra Bối cảnh Dịch tễ học (Epidemiology Context)
  const epiPath = path.join(ROOT_DIR, 'src/content/docspace/src/data/epidemiology-context-database.ts');
  const epiContent = fs.existsSync(epiPath) ? fs.readFileSync(epiPath, 'utf8') : '';
  const hasEpi = epiContent.includes(`${slug}:`) || epiContent.includes(`'${slug}':`);

  if (hasEpi) {
    logPass(`9. Bối cảnh Dịch tễ học (Vùng lưu hành, mùa vụ, véc-tơ, lây truyền) đã được cấu hình`);
    passCount++;
  } else {
    logWarn(`9. Chưa có hồ sơ dịch tễ riêng trong epidemiology-context-database.ts`);
  }

  // 10. Kiểm tra Tam Giác Chẩn Đoán trong Clinical Engine
  const enginePath = path.join(ROOT_DIR, 'src/content/docspace/src/lib/clinicalEngine.ts');
  const engineContent = fs.existsSync(enginePath) ? fs.readFileSync(enginePath, 'utf8') : '';
  const hasEngineSupport = engineContent.includes(`'${slug}'`) || engineContent.includes(`"${slug}"`);

  if (hasEngineSupport) {
    logPass(`10. Engine suy luận đã tích hợp nhận diện và tính điểm thưởng Tam giác dịch tễ`);
    passCount++;
  } else {
    logWarn(`10. Chưa thêm ID '${slug}' vào khối điểm thưởng Dịch tễ học trong clinicalEngine.ts`);
  }

  const scorePct = Math.round((passCount / totalCount) * 100);
  console.log(`\n📊 KẾT QUẢ KIỂM ĐỊNH CHO [${slug}]: ${passCount}/${totalCount} Tiêu chí (${scorePct}%)`);
  if (scorePct === 100) {
    console.log(`🌟 BỆNH LÝ ĐÃ SẴN SÀNG 100% CHO TOÀN BỘ CHU TRÌNH 4 BƯỚC CỦA DOCSPACE!\n`);
    return true;
  } else {
    console.log(`⚠️  Vui lòng bổ sung các tiêu chí chưa đạt trước khi hoàn tất.\n`);
    return false;
  }
}

// Main execution
const targetArg = process.argv[2] || 'all';

if (targetArg === 'all') {
  const enrichedDir = path.join(ROOT_DIR, 'src/content/docspace/data/enriched');
  const files = fs.readdirSync(enrichedDir).filter(f => f.endsWith('.json'));
  console.log(`🔍 Tìm thấy ${files.length} bệnh lý đã làm giàu trong thư mục enriched/. Tiến hành audit toàn diện...\n`);
  
  let allPass = true;
  for (const f of files) {
    const slug = path.basename(f, '.json');
    const ok = auditDisease(slug);
    if (!ok) allPass = false;
  }
  process.exit(allPass ? 0 : 1);
} else {
  const ok = auditDisease(targetArg);
  process.exit(ok ? 0 : 1);
}
