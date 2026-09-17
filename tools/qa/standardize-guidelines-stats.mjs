#!/usr/bin/env node

/**
 * 🏥 CliniPortal QA Agent Squad — Standardize Guidelines Stats & Boilerplate
 * Script: tools/qa/standardize-guidelines-stats.mjs
 * 
 * Mục tiêu:
 *  - Xóa bỏ 100% placeholder chung (Khuyến Cáo Class I, Bằng Chứng Mức A...)
 *  - Thay thế bằng Dải Chỉ Số Then Chốt (.stats-strip) chuẩn lâm sàng mật độ cao
 *  - Chuẩn hóa keyRecommendations trong frontmatter phản ánh đúng nội dung từng guideline
 *  - Chuẩn hóa line endings sang Unix LF
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const GUIDELINES_DIR = path.join(ROOT_DIR, 'src/content/ebm/guidelines/kho-guidelines');
const AUDIT_REPORT = path.join(__dirname, 'reports/guidelines-audit-report.json');

const customData = {
  '2024-byt-vgsvc.mdx': {
    stats: [
      { val: 'DAA Toàn Kiểu Gen', lbl: 'SOF/VEL hoặc GLE/PIB 8-12 tuần đạt SVR12 > 95%', color: 'green' },
      { val: 'Đo Tải Lượng HCV RNA', lbl: 'Xét nghiệm khẳng định nhiễm vi rút hoạt động và đánh giá SVR12', color: 'blue' },
      { val: 'Xơ Hóa F3 - F4', lbl: 'Bắt buộc tầm soát ung thư gan (HCC) định kỳ mỗi 6 tháng', color: 'amber' },
      { val: 'Tương Tác Thuốc DDI', lbl: 'Thận trọng với Statin, PPIs và phác đồ điều trị HIV', color: 'red' }
    ],
    recs: [
      'Chẩn đoán nhiễm HCV mạn khi Anti-HCV (+) và HCV RNA (+) hoặc HCV Core-Ag (+) tồn tại trên 6 tháng.',
      'Chỉ định phác đồ DAA tác động trực tiếp toàn kiểu gen (SOF/VEL 12 tuần hoặc GLE/PIB 8-12 tuần) cho tất cả bệnh nhân.',
      'Đánh giá mức độ xơ hóa gan trước điều trị bằng APRI, FIB-4 hoặc FibroScan để định hướng theo dõi biến chứng.',
      'Tầm soát ung thư tế bào gan (HCC) bằng siêu âm và AFP định kỳ mỗi 6 tháng suốt đời cho bệnh nhân xơ hóa F3-F4 dù đã đạt SVR12.'
    ]
  },
  '2026-aha-acc-ckm-syndrome.mdx': {
    stats: [
      { val: 'Giai Đoạn CKM 0 - 4', lbl: 'Phân tầng nguy cơ hệ thống từ tiền bệnh lý đến suy tim/ASCVD lâm sàng', color: 'green' },
      { val: 'Thang Điểm PREVENT', lbl: 'Dự báo nguy cơ tim mạch và suy tim 10 năm & 30 năm', color: 'blue' },
      { val: 'Trụ Cột SGLT2i + nsMRA', lbl: 'Phối hợp sớm bảo vệ kép Tim - Thận - Chuyển hóa', color: 'amber' },
      { val: 'GLP-1 RA / GIP', lbl: 'Kiểm soát chuyển hóa mạnh mẽ, giảm cân nặng và bảo vệ tim mạch', color: 'red' }
    ],
    recs: [
      'Tầm soát và phân loại hội chứng CKM theo 5 giai đoạn (Stage 0 đến 4b) để can thiệp trúng đích sớm.',
      'Áp dụng phương trình PREVENT™ đánh giá nguy cơ biến cố tim mạch và suy tim 10-30 năm thay cho PCEs.',
      'Chỉ định sớm thuốc ức chế SGLT2 và kháng aldosterone không steroid (Finerenone) cho bệnh nhân CKM kèm CKD/T2D.',
      'Tối ưu hóa phác đồ đa chuyên khoa kết hợp GLP-1 RA/GIP kiểm soát cân nặng và bảo vệ đa tạng tim-thận.'
    ]
  },
  '2026-byt-viem-gan-b.mdx': {
    stats: [
      { val: 'NAs Hàng Đầu', lbl: 'TDF 300mg, TAF 25mg hoặc ETV 0.5mg hàng rào kháng thuốc cao', color: 'green' },
      { val: 'Ngưỡng Khởi Trị ALT', lbl: 'ALT > ULN (Nam > 35, Nữ > 25 U/L) kèm HBV DNA tăng', color: 'blue' },
      { val: 'Dự Phòng MTCT 24-28w', lbl: 'TDF cho thai phụ có HBV DNA > 200,000 IU/mL hoặc HBeAg (+)', color: 'amber' },
      { val: 'Tầm Soát HCC Suốt Đời', lbl: 'Siêu âm bụng và AFP mỗi 6 tháng cho mọi ca viêm gan B mạn', color: 'red' }
    ],
    recs: [
      'Chẩn đoán Viêm gan B mạn khi HBsAg (+) tồn tại trên 6 tháng hoặc HBsAg (+) kèm Anti-HBc IgG (+).',
      'Khởi trị kháng virus NAs (TDF, TAF hoặc Entecavir) cho bệnh nhân xơ gan hoặc có ALT tăng kèm tải lượng HBV DNA cao.',
      'Dự phòng lây truyền mẹ sang con (MTCT) bằng TDF từ tuần 24-28 thai kỳ nếu mẹ có HBV DNA > 200.000 IU/mL, phối hợp vắc-xin + HBIG trong 24h đầu.',
      'Theo dõi định kỳ chức năng gan, HBV DNA và tầm soát ung thư tế bào gan (HCC) bằng siêu âm + AFP mỗi 6 tháng suốt đời.'
    ]
  }
};

const colors = ['green', 'blue', 'amber', 'red'];

function cleanText(text) {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&le;/g, '≤')
    .replace(/&ge;/g, '≥')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function truncateClean(text, maxLen = 85) {
  let cleaned = cleanText(text);
  if (cleaned.length <= maxLen) return cleaned;
  let cut = cleaned.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > maxLen - 20) cut = cut.slice(0, lastSpace);
  return cut.replace(/[,;.\-–—\s]+$/, '');
}

function processFile(fileName) {
  const filePath = path.join(GUIDELINES_DIR, fileName);
  let content = fs.readFileSync(filePath, 'utf8');

  // Normalize CRLF to LF
  content = content.replace(/\r\n/g, '\n');

  let stats = [];
  let recs = [];

  if (customData[fileName]) {
    stats = customData[fileName].stats;
    recs = customData[fileName].recs;
  } else {
    // Extract pillars
    const matches = [...content.matchAll(/<div class=["']pillar-title["']>([\s\S]*?)<\/div>\s*<div class=["']pillar-desc["']>([\s\S]*?)<\/div>/gi)];
    if (matches.length >= 3) {
      matches.slice(0, 4).forEach((m, idx) => {
        const rawTitle = cleanText(m[1]).replace(/^\d+[\.\:\-]\s*/, '').replace(/^Trụ cột\s*\d+[\:\—\-]\s*/i, '').trim();
        const rawDesc = cleanText(m[2]);

        const val = truncateClean(rawTitle, 35);
        const lbl = truncateClean(rawDesc, 90);

        stats.push({ val, lbl, color: colors[idx] || 'blue' });
        recs.push(rawDesc);
      });
    } else {
      console.warn(`⚠️ [SKIP] Không đủ pillars cho ${fileName}`);
      return false;
    }
  }

  // Ensure 4 cards
  if (stats.length === 3) {
    stats.push({
      val: 'Cảnh Báo An Toàn',
      lbl: 'Theo dõi đáp ứng lâm sàng và phòng ngừa biến chứng nặng',
      color: 'red'
    });
    recs.push('Theo dõi sát đáp ứng điều trị, kiểm tra an toàn dùng thuốc và phòng ngừa biến chứng lâm sàng.');
  }

  // 1. Build new stats-strip HTML
  const isSectionStats = content.includes('<section class="stats-strip');
  const tagOpen = isSectionStats ? '<section class="stats-strip theme-trial">\n  <div class="stats-grid">' : '<div class="stats-strip">\n  <div class="stats-grid">';
  const tagClose = isSectionStats ? '  </div>\n</section>' : '  </div>\n</div>';

  const cardsHtml = stats.map(s => `    <div class="stat-card">
      <div class="stat-val ${s.color}">${s.val}</div>
      <div class="stat-lbl">${s.lbl}</div>
    </div>`).join('\n');

  const newStatsStrip = `${tagOpen}\n${cardsHtml}\n${tagClose}\n\n`;

  // Locate entire stats-strip span up to pillars or page-content
  const stripStartIdx = content.search(/<(?:div|section)\s+[^>]*class=["'][^"']*stats-strip/i);
  if (stripStartIdx === -1) {
    console.error(`❌ Không tìm thấy stats-strip trong ${fileName}`);
    return false;
  }

  const rest = content.slice(stripStartIdx);
  const nextSectionMatch = rest.search(/<(?:div|section|article)\s+[^>]*class=["'](?:pillars|page-content|sec-card)/i);
  if (nextSectionMatch === -1) {
    console.error(`❌ Không tìm thấy pillars/page-content trong ${fileName}`);
    return false;
  }

  const before = content.slice(0, stripStartIdx);
  const after = content.slice(stripStartIdx + nextSectionMatch);
  content = before + newStatsStrip + after;

  // 2. Replace keyRecommendations in frontmatter
  const recsYaml = recs.map(r => `  - "${r.replace(/"/g, "'").replace(/\n/g, ' ')}"`).join('\n');
  const keyRecsRegex = /keyRecommendations:\s*(?:\n\s*-\s*[^\n]+)+/i;
  if (keyRecsRegex.test(content)) {
    content = content.replace(keyRecsRegex, `keyRecommendations:\n${recsYaml}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Đã chuẩn hóa: ${fileName} (${stats.length} cards, ${recs.length} recs)`);
  return true;
}

async function main() {
  console.log('\n======================================================================');
  console.log('🏥 CLINI_PORTAL — CHUẨN HÓA STATS STRIP & KEY RECOMMENDATIONS');
  console.log('======================================================================\n');

  const report = JSON.parse(fs.readFileSync(AUDIT_REPORT, 'utf8'));
  const targetFiles = report.groups.A.files.map(f => f.file);

  console.log(`🎯 Số tệp cần chuẩn hóa: ${targetFiles.length} tệp\n`);

  let count = 0;
  for (const file of targetFiles) {
    if (processFile(file)) count++;
  }

  console.log(`\n🎉 Đã hoàn tất chuẩn hóa ${count}/${targetFiles.length} tệp!\n`);
}

main().catch(err => {
  console.error('❌ Lỗi:', err);
  process.exit(1);
});
