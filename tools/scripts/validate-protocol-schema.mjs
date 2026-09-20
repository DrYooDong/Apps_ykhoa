#!/usr/bin/env node
/**
 * CliniPortal DocSpace — Medical Treatment Protocol & 4-Column Table Validator
 * 
 * Công cụ tự động kiểm định chất lượng dữ liệu phác đồ điều trị 6 đầu mục & Bảng 4 Cột
 * Chạy kiểm tra:
 *   node tools/scripts/validate-protocol-schema.mjs [đường_dẫn_tệp.json]
 * Hoặc kiểm tra toàn bộ:
 *   node tools/scripts/validate-protocol-schema.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENRICHED_DIR = path.resolve(__dirname, '../../src/content/docspace/data/enriched');

function validateDiseaseFile(filePath) {
  const fileName = path.basename(filePath);
  const issues = [];
  const warnings = [];
  const passes = [];

  let data;
  try {
    const raw = fs.readFileSync(filePath, 'utf8');

    // 1. Kiểm tra HTML Entity chưa giải mã
    const entityMatches = raw.match(/&(?:amp|lt|gt|quot|#39);/g);
    if (entityMatches) {
      warnings.push(`Phát hiện ${entityMatches.length} HTML entity thô (ví dụ: &amp;, &lt;, &gt;). Nên chuyển về ký tự chuẩn &, <, >.`);
    }

    data = JSON.parse(raw);
  } catch (err) {
    return {
      fileName,
      filePath,
      valid: false,
      issues: [`Lỗi cú pháp JSON: ${err.message}`],
      warnings,
      passes,
    };
  }

  // 2. Kiểm tra siêu dữ liệu cốt lõi
  if (!data.icdCode || typeof data.icdCode !== 'string') {
    issues.push('Thiếu trường icdCode (Mã ICD-10 chính).');
  } else {
    passes.push(`ICD-10: ${data.icdCode}`);
  }

  if (!data.diseaseName || typeof data.diseaseName !== 'string') {
    issues.push('Thiếu trường diseaseName (Tên bệnh).');
  } else {
    passes.push(`Tên bệnh: "${data.diseaseName}"`);
  }

  if (!data.specialty) {
    warnings.push('Thiếu trường specialty (Chuyên khoa). Sẽ mặc định là "Nội khoa".');
  }

  if (!data.goldStandard || data.goldStandard.includes('Tiêu chuẩn vàng xác định dựa trên cận lâm sàng')) {
    warnings.push('Tiêu chuẩn vàng (goldStandard) còn là placeholder hoặc chưa cụ thể.');
  } else {
    passes.push('Đã cấu hình Tiêu chuẩn vàng (goldStandard).');
  }

  // 3. Mục 1: Phân loại & Phân độ nặng nhẹ (severityGrading)
  if (!Array.isArray(data.severityGrading) || data.severityGrading.length === 0) {
    issues.push('Mục 1a: Thiếu danh sách phân độ lâm sàng (severityGrading). Bắt buộc có ít nhất 2 phân độ.');
  } else {
    const gradesValid = data.severityGrading.every(g => g.grade && g.criteria && g.triage && g.primaryAction);
    if (!gradesValid) {
      warnings.push('Mục 1a: Một số phân độ trong severityGrading thiếu thông tin (grade, criteria, triage hoặc primaryAction).');
    } else {
      passes.push(`Mục 1a: Đạt chuẩn ${data.severityGrading.length} phân độ lâm sàng.`);
    }
  }

  // 4. Mục 1c: Đối tượng đặc biệt (specialPopulations)
  const specialPops = data.protocol?.specialPopulations || data.specialPopulations;
  if (!Array.isArray(specialPops) || specialPops.length === 0) {
    warnings.push('Mục 1c: Chưa cấu hình specialPopulations (Đối tượng đặc biệt: suy thận eGFR, thai kỳ, cao tuổi, suy gan).');
  } else {
    passes.push(`Mục 1c: Có ${specialPops.length} khuyến cáo cá thể hóa cho đối tượng đặc biệt.`);
  }

  // 5. Mục 2: Bảng 4 Cột & Lộ trình theo ngày (timelinePhases)
  const timeline = data.protocol?.timelinePhases || data.timelinePhases;
  const hasFallbackTimeline = /dengue|mang_nao|meningitis|sot_ret|malaria|leptospira|thuy_dau|varicella|vgsv_b|viem_gan_b|vgsv_c|viem_gan_c|dot_bung_phat/i.test(fileName);

  if (!Array.isArray(timeline) || timeline.length === 0) {
    if (hasFallbackTimeline) {
      warnings.push('Mục 2: Chưa nhúng timelinePhases trực tiếp trong JSON (đang dùng fallback từ dailyTreatmentTimeline.ts). Khuyến nghị nạp lộ trình vào JSON để đồng bộ.');
    } else {
      issues.push('Mục 2: BẢNG 4 CỘT CHƯA CÓ DỮ LIỆU! Thiếu trường timelinePhases trong protocol hoặc root.');
    }
  } else {
    passes.push(`Mục 2: Có ${timeline.length} giai đoạn điều trị chi tiết (timelinePhases).`);
    
    let hasTreatments = true;
    let hasMonitoring = true;
    let hasLs = false;
    let hasCls = false;

    timeline.forEach((phase, idx) => {
      if (!phase.dayRange || !phase.phaseName || !phase.clinicalGoal) {
        warnings.push(`Giai đoạn ${idx + 1}: Thiếu dayRange, phaseName hoặc clinicalGoal.`);
      }
      if (!Array.isArray(phase.treatments) || phase.treatments.length === 0) {
        hasTreatments = false;
      }
      if (!Array.isArray(phase.monitoring) || phase.monitoring.length === 0) {
        hasMonitoring = false;
      } else {
        phase.monitoring.forEach(m => {
          if (m.type === 'LS') hasLs = true;
          if (m.type === 'CLS') hasCls = true;
        });
      }
    });

    if (!hasTreatments) {
      issues.push('Mục 2: Có giai đoạn trong timelinePhases không chứa danh sách y lệnh điều trị (treatments).');
    }
    if (!hasMonitoring) {
      issues.push('Mục 2: Có giai đoạn trong timelinePhases thiếu danh mục theo dõi (monitoring).');
    }
    if (!hasLs || !hasCls) {
      warnings.push('Mục 2: Nên phân định rõ ràng cả hai loại type: "LS" (Lâm sàng) và type: "CLS" (Cận lâm sàng) trong mục monitoring.');
    }
  }

  // 6. Mục 3: Lưu ý & Chống chỉ định & Tiêu chuẩn xuất viện (cautionsAndDischarge / clinicalCautions)
  const cautionsData = data.protocol?.cautionsAndDischarge || data.cautionsAndDischarge || data.clinicalCautions || data.protocol?.clinicalCautions;
  if (!cautionsData) {
    warnings.push('Mục 3: Chưa có cấu trúc cautionsAndDischarge hoặc clinicalCautions chuyên biệt.');
  } else {
    const hasCautions = Array.isArray(cautionsData.cautions || cautionsData.warnings) && (cautionsData.cautions || cautionsData.warnings).length > 0;
    const hasCCDs = Array.isArray(cautionsData.contraindications) && cautionsData.contraindications.length > 0;
    const hasDischarge = Array.isArray(cautionsData.dischargeCriteria) && cautionsData.dischargeCriteria.length > 0;
    
    if (hasCautions && hasCCDs && hasDischarge) {
      passes.push('Mục 3: Đầy đủ 3 khối: [1] Cảnh báo quan trọng, [2] Chống chỉ định, [3] Tiêu chuẩn ra viện.');
    } else {
      warnings.push('Mục 3: Khuyến nghị có đủ 3 mảng: cautions (hoặc warnings), contraindications, và dischargeCriteria.');
    }
  }

  // 7. Mục 1b: Biến chứng đe dọa sinh mạng (complications / protocol.complications)
  const comps = data.complications || data.protocol?.complications || data.protocol?.complicationsManagement;
  if (!Array.isArray(comps) || comps.length === 0) {
    warnings.push('Mục 1b: Chưa có danh sách biến chứng cấp (complications hoặc protocol.complications).');
  } else {
    passes.push(`Mục 1b: Có ${comps.length} biến chứng kèm y lệnh trực Sentinel.`);
  }

  // 8. Mục 5: Liên kết Kho Tri Thức (vaultPathways)
  if (!Array.isArray(data.vaultPathways) || data.vaultPathways.length === 0) {
    warnings.push('Mục 5: Chưa có liên kết vaultPathways đến 18 Kho Tri Thức CliniPortal.');
  } else {
    passes.push(`Mục 5: Đã kết nối ${data.vaultPathways.length} Kho Tri Thức liên quan.`);
  }

  return {
    fileName,
    filePath,
    valid: issues.length === 0,
    issues,
    warnings,
    passes,
  };
}

function main() {
  console.log('🩺 ================================================================');
  console.log('🩺 CLINIPORTAL DOCSPACE — PROTOCOL & 4-COLUMN TABLE QA GATE');
  console.log('🩺 ================================================================\n');

  const targetArg = process.argv[2];
  let targetFiles = [];

  if (targetArg) {
    const fullPath = path.isAbsolute(targetArg) ? targetArg : path.resolve(process.cwd(), targetArg);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ Không tìm thấy tệp: ${fullPath}`);
      process.exit(1);
    }
    targetFiles = [fullPath];
  } else {
    if (!fs.existsSync(ENRICHED_DIR)) {
      console.error(`❌ Thư mục không tồn tại: ${ENRICHED_DIR}`);
      process.exit(1);
    }
    targetFiles = fs.readdirSync(ENRICHED_DIR)
      .filter(f => f.endsWith('.json') && !f.startsWith('_template'))
      .map(f => path.join(ENRICHED_DIR, f));
  }

  let totalCount = targetFiles.length;
  let passCount = 0;
  let warnCount = 0;
  let failCount = 0;

  targetFiles.forEach(file => {
    const res = validateDiseaseFile(file);
    const hasWarnings = res.warnings.length > 0;
    
    if (res.valid && !hasWarnings) {
      passCount++;
      console.log(`✅ [HOÀN HẢO] ${res.fileName}`);
    } else if (res.valid && hasWarnings) {
      warnCount++;
      console.log(`🟡 [ĐẠT YÊU CẦU - CÓ CẢNH BÁO] ${res.fileName}`);
    } else {
      failCount++;
      console.log(`❌ [LỖI CẤU TRÚC] ${res.fileName}`);
    }

    if (res.issues.length > 0) {
      console.log('   ❌ LỖI BẮT BUỘC:');
      res.issues.forEach(iss => console.log(`      - ${iss}`));
    }

    if (res.warnings.length > 0) {
      console.log('   ⚠️  CẢNH BÁO CHẤT LƯỢNG:');
      res.warnings.forEach(w => console.log(`      - ${w}`));
    }

    if (res.passes.length > 0 && process.env.VERBOSE) {
      console.log('   ✨ TIÊU CHÍ ĐẠT:');
      res.passes.forEach(p => console.log(`      + ${p}`));
    }
    console.log('');
  });

  console.log('----------------------------------------------------------------');
  console.log(`📊 TỔNG KẾT: ${totalCount} bệnh lý | ✅ Đạt: ${passCount + warnCount}/${totalCount} | ❌ Lỗi: ${failCount} | ⚠️ Cảnh báo: ${warnCount}`);
  console.log('----------------------------------------------------------------\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

main();
