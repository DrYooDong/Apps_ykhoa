#!/usr/bin/env node
/**
 * dedup-engine.mjs - DocSpace Master Deduplication Engine CLI
 * 
 * Sử dụng:
 *   node tools/scripts/dedup-engine.mjs --scope all
 *   node tools/scripts/dedup-engine.mjs --scope criteria
 *   node tools/scripts/dedup-engine.mjs --scope protocol
 *   node tools/scripts/dedup-engine.mjs --scope soap
 *   node tools/scripts/dedup-engine.mjs --scope cases
 *   node tools/scripts/dedup-engine.mjs --fix
 *   node tools/scripts/dedup-engine.mjs --report
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { detectCriteriaDups } from './dedup/criteria-dedup.mjs';
import { detectProtocolDups } from './dedup/protocol-dedup.mjs';
import { detectSoapDups } from './dedup/soap-dedup.mjs';
import { detectCaseDups } from './dedup/case-dedup.mjs';
import { generateHtmlReport } from './dedup/report-generator.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../');

// Định nghĩa các đường dẫn dữ liệu chuẩn DocSpace
const ENRICHED_DIR = path.join(ROOT_DIR, 'src/content/docspace/data/enriched');
const BA_DIR = path.join(ROOT_DIR, 'src/content/docspace/data/ba');
const CATALOG_PATH = path.join(ROOT_DIR, 'src/content/docspace/src/data/vault-catalog-thuc-hanh.json');
const CASES_PATH = path.join(ROOT_DIR, 'src/content/docspace/src/data/sample-clinical-cases.json');
const SCRATCH_DIR = path.join(ROOT_DIR, 'tools/scratch');

// Parse CLI arguments
const args = process.argv.slice(2);
let scope = 'all';
let fix = false;
let shouldReport = true;
let threshold = 0.85;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--scope' && args[i + 1]) {
    scope = args[++i];
  } else if (args[i] === '--fix') {
    fix = true;
  } else if (args[i] === '--report') {
    shouldReport = true;
  } else if (args[i] === '--threshold' && args[i + 1]) {
    threshold = parseFloat(args[++i]);
  }
}

console.log('='.repeat(65));
console.log('🔍 DOCSPACE DEDUPLICATION ENGINE v2.0');
console.log(`📌 Phạm vi: ${scope} | Auto-fix: ${fix ? 'BẬT' : 'TẮT'} | Ngưỡng tương đồng: ${threshold}`);
console.log('='.repeat(65));

async function run() {
  const masterSummary = {};

  try {
    // 1. Scope: Criteria
    if (scope === 'all' || scope === 'criteria') {
      process.stdout.write('\n⏳ Đang quét Tiêu Chuẩn Chẩn Đoán (Criteria)... ');
      const critRes = await detectCriteriaDups(ENRICHED_DIR, { fix, similarityThreshold: threshold });
      masterSummary.criteria = critRes;
      console.log(`Xong! [${critRes.totalCriteriaScanned} tiêu chuẩn, ${critRes.exactDupsWithinDisease.length} exact dups, ${critRes.semanticNearDups.length} near dups]`);
    }

    // 2. Scope: Protocol
    if (scope === 'all' || scope === 'protocol') {
      process.stdout.write('⏳ Đang quét Phác Đồ & Danh Mục Thuốc (Protocol)... ');
      const protoRes = await detectProtocolDups(ENRICHED_DIR, { fix, similarityThreshold: threshold });
      masterSummary.protocol = protoRes;
      console.log(`Xong! [${protoRes.totalDrugsScanned} thuốc, ${protoRes.exactDrugDupsInBranch.length} exact dups, ${protoRes.nearDrugDupsInBranch.length} near dups]`);
    }

    // 3. Scope: SOAP
    if (scope === 'all' || scope === 'soap') {
      process.stdout.write('⏳ Đang quét Bệnh Án SOAP & Catalog Thực Hành... ');
      const soapRes = await detectSoapDups(BA_DIR, CATALOG_PATH, { fix, similarityThreshold: threshold });
      masterSummary.soap = soapRes;
      console.log(`Xong! [${soapRes.totalMdFiles} files, ${soapRes.orphanCatalogEntries.length} orphan catalog, ${soapRes.unregisteredMdFiles.length} unregistered]`);
    }

    // 4. Scope: Cases
    if (scope === 'all' || scope === 'cases') {
      process.stdout.write('⏳ Đang quét Ca Mẫu Lâm Sàng (Sample Cases)... ');
      const caseRes = await detectCaseDups(CASES_PATH, { fix, similarityThreshold: threshold });
      masterSummary.cases = caseRes;
      console.log(`Xong! [${caseRes.totalCasesScanned} ca mẫu, ${caseRes.exactIdDups.length} exact dups, ${caseRes.nearDuplicateCases.length} near dups]`);
    }

    // Tổng hợp số liệu
    console.log('\n' + '-'.repeat(65));
    console.log('📊 TỔNG KẾT KẾT QUẢ KIỂM SOÁT LỌC TRÙNG:');
    console.log('-'.repeat(65));

    let totalCritical = 0;
    let totalWarnings = 0;
    let totalFixed = 0;

    if (masterSummary.criteria) {
      const crit = masterSummary.criteria;
      totalCritical += crit.exactDupsWithinDisease.length;
      totalWarnings += crit.semanticNearDups.length + crit.crossDiseaseConflicts.length;
      totalFixed += crit.fixedCount;
      console.log(`1. Criteria: ${crit.exactDupsWithinDisease.length} Critical | ${crit.semanticNearDups.length} Near-Dups | ${crit.fixedCount} Fixed`);
    }

    if (masterSummary.protocol) {
      const proto = masterSummary.protocol;
      totalCritical += proto.exactDrugDupsInBranch.length;
      totalWarnings += proto.nearDrugDupsInBranch.length + proto.duplicateTreatmentsInProblem.length;
      totalFixed += proto.fixedCount;
      console.log(`2. Protocol: ${proto.exactDrugDupsInBranch.length} Critical | ${proto.nearDrugDupsInBranch.length} Near-Dups | ${proto.fixedCount} Fixed`);
    }

    if (masterSummary.soap) {
      const soap = masterSummary.soap;
      totalCritical += soap.orphanCatalogEntries.length + soap.duplicateCatalogEntries.length;
      totalWarnings += soap.unregisteredMdFiles.length + soap.nearDuplicateSoapCases.length;
      totalFixed += soap.fixedCount;
      console.log(`3. SOAP:     ${soap.orphanCatalogEntries.length + soap.duplicateCatalogEntries.length} Critical | ${soap.unregisteredMdFiles.length} Unregistered | ${soap.fixedCount} Fixed`);
    }

    if (masterSummary.cases) {
      const cs = masterSummary.cases;
      totalCritical += cs.exactIdDups.length;
      totalWarnings += cs.nearDuplicateCases.length;
      totalFixed += cs.fixedCount;
      console.log(`4. Cases:    ${cs.exactIdDups.length} Critical | ${cs.nearDuplicateCases.length} Near-Dups | ${cs.fixedCount} Fixed`);
    }

    console.log('-'.repeat(65));
    console.log(`👉 TỔNG CỘNG: 🔴 ${totalCritical} CRITICAL | 🟡 ${totalWarnings} CẢNH BÁO | 🟢 ${totalFixed} ĐÃ SỬA`);

    // Xuất Report HTML
    if (shouldReport) {
      if (!fs.existsSync(SCRATCH_DIR)) {
        fs.mkdirSync(SCRATCH_DIR, { recursive: true });
      }
      const reportHtmlPath = path.join(SCRATCH_DIR, 'dedup-report.html');
      generateHtmlReport(masterSummary, reportHtmlPath);
      console.log(`\n📄 Đã xuất báo cáo HTML: ${reportHtmlPath}`);
    }

    console.log('='.repeat(65));
  } catch (err) {
    console.error('\n❌ Có lỗi xảy ra trong quá trình thực thi:', err);
    process.exit(1);
  }
}

run();
