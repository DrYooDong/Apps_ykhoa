/**
 * qa_guideline.js
 * 
 * Script Node.js tự động kiểm định chất lượng 8 điểm (8-Point Quality Gate)
 * cho file tóm tắt Guideline / RCT MDX trong CliniPortal.
 * 
 * Cách dùng:
 *   node .agents/skills/guideline-summary-module/scripts/qa_guideline.js --slug="2019-easl-dili"
 *   hoặc:
 *   node .agents/skills/guideline-summary-module/scripts/qa_guideline.js src/content/ebm/guidelines/kho-guidelines/2019-easl-dili.mdx
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '../../../../');
const KHO_GUIDELINES_DIR = path.join(WORKSPACE_ROOT, 'src/content/ebm/guidelines/kho-guidelines');
const IMAGES_DIR = path.join(KHO_GUIDELINES_DIR, 'images');
const REGISTRY_FILE = path.join(WORKSPACE_ROOT, 'src/content/ebm/guidelines/js/kho-guidelines-registry.ts');
const DATA_FILE = path.join(WORKSPACE_ROOT, 'src/content/ebm/guidelines/js/guidelinesdata.ts');

function getSlug(arg) {
  if (!arg) return null;
  if (arg.startsWith('--slug=')) {
    return arg.slice(7).trim().replace(/\.mdx$/i, '');
  }
  return path.basename(arg).replace(/\.mdx$/i, '');
}

function runQA() {
  const rawArg = process.argv[2];
  const slug = getSlug(rawArg);

  if (!slug) {
    console.log('Cách dùng: node qa_guideline.js --slug=<slug_name>');
    console.log('Ví dụ:    node qa_guideline.js --slug=2019-easl-dili');
    process.exit(1);
  }

  console.log(`\n============================================================`);
  console.log(`🔍 BẮT ĐẦU KIỂM ĐỊNH CHẤT LƯỢNG 8 ĐIỂM CHO: ${slug}`);
  console.log(`============================================================\n`);

  let score = 0;
  const maxScore = 8;
  const targetFilePath = path.join(KHO_GUIDELINES_DIR, `${slug}.mdx`);

  // [1] Kiểm tra file tồn tại
  if (!fs.existsSync(targetFilePath)) {
    console.error(`❌ [1/8] File không tồn tại: ${targetFilePath}`);
    process.exit(1);
  } else {
    const stat = fs.statSync(targetFilePath);
    console.log(`✅ [1/8] File tồn tại hợp lệ: ${targetFilePath} (${(stat.size / 1024).toFixed(1)} KB)`);
    score++;
  }

  const content = fs.readFileSync(targetFilePath, 'utf8');

  // [2] Kiểm tra Frontmatter YAML
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) {
    console.error(`❌ [2/8] Thiếu khối Frontmatter YAML (--- ... ---)!`);
  } else {
    const fmLines = fmMatch[1];
    const requiredKeys = ['title:', 'slug:', 'code:', 'organization:', 'year:', 'category:', 'status:', 'version:', 'updatedAt:', 'cor:', 'loe:'];
    const missingKeys = requiredKeys.filter(k => !fmLines.includes(k));
    if (missingKeys.length > 0) {
      console.warn(`⚠️ [2/8] Frontmatter thiếu các trường khuyến nghị: ${missingKeys.join(', ')}`);
      score += 0.5;
    } else {
      console.log(`✅ [2/8] Frontmatter YAML đầy đủ các trường chuẩn.`);
      score++;
    }
  }

  // [3] Kiểm tra sạch ký tự math LaTeX $
  const mathMatches = content.match(/\$[^$\n]+\$/g);
  if (mathMatches && mathMatches.length > 0) {
    console.error(`❌ [3/8] Phát hiện ${mathMatches.length} ký tự math LaTeX $:`);
    mathMatches.slice(0, 5).forEach(m => console.log('   - ', m));
  } else {
    console.log(`✅ [3/8] 100% Sạch ký tự math LaTeX $.`);
    score++;
  }

  // [4] Kiểm tra cân bằng thẻ HTML
  const tags = ['div', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'p', 'span', 'h2', 'h3', 'ul', 'li', 'strong', 'em'];
  let tagMismatch = false;
  for (const tag of tags) {
    const openRegex = new RegExp(`<${tag}(\\s+[^>]*)?>`, 'gi');
    const closeRegex = new RegExp(`</${tag}>`, 'gi');
    const openCount = (content.match(openRegex) || []).length;
    const closeCount = (content.match(closeRegex) || []).length;
    if (openCount !== closeCount) {
      console.error(`❌ [4/8] Mất cân bằng thẻ <${tag}>: Mở = ${openCount}, Đóng = ${closeCount}`);
      tagMismatch = true;
    }
  }
  if (!tagMismatch) {
    console.log(`✅ [4/8] Cấu trúc thẻ HTML hoàn toàn cân bằng và chuẩn xác.`);
    score++;
  }

  // [5] Kiểm tra liên kết hình ảnh
  const imgRegex = /src=["']\.\/images\/([^"']+)["']/g;
  let imgMatch;
  let missingImages = 0;
  let totalImages = 0;

  while ((imgMatch = imgRegex.exec(content)) !== null) {
    totalImages++;
    const imgName = imgMatch[1];
    const fullImgPath = path.join(IMAGES_DIR, imgName);
    if (!fs.existsSync(fullImgPath)) {
      console.error(`❌ [5/8] Ảnh đính kèm không tồn tại: ${imgName} (tại ${fullImgPath})`);
      missingImages++;
    }
  }

  if (totalImages === 0) {
    console.log(`ℹ️ [5/8] Bài viết không có ảnh đính kèm cục bộ (PASS).`);
    score++;
  } else if (missingImages === 0) {
    console.log(`✅ [5/8] Toàn bộ ${totalImages} hình ảnh đính kèm đều tồn tại trong thư mục images/.`);
    score++;
  }

  // [6] Kiểm tra lỗi HTML entities thừa
  const badEntities = content.match(/&amp;(amp|lt|gt|quot|#39);/gi);
  if (badEntities && badEntities.length > 0) {
    console.warn(`⚠️ [6/8] Phát hiện entity HTML kép (${badEntities.length} lỗi):`, badEntities.slice(0, 3));
  } else {
    console.log(`✅ [6/8] Không phát hiện lỗi trùng lặp HTML entities.`);
    score++;
  }

  // [7] Kiểm tra Đăng ký trong kho-guidelines-registry.ts
  let registeredInRegistry = false;
  let conditionKey = null;
  if (fs.existsSync(REGISTRY_FILE)) {
    const regContent = fs.readFileSync(REGISTRY_FILE, 'utf8');
    const idRegex = new RegExp(`"id"\\s*:\\s*"${slug}"`, 'i');
    if (idRegex.test(regContent)) {
      registeredInRegistry = true;
      console.log(`✅ [7/8] Đã đăng ký hợp lệ trong kho-guidelines-registry.ts.`);
      score++;

      // Trích xuất conditionKey nếu có
      const itemMatch = regContent.match(new RegExp(`"id"\\s*:\\s*"${slug}"[\\s\\S]*?"conditionKey"\\s*:\\s*"([^"]+)"`));
      if (itemMatch && itemMatch[1]) {
        conditionKey = itemMatch[1];
      }
    } else {
      console.warn(`⚠️ [7/8] CHƯA đăng ký trong kho-guidelines-registry.ts!`);
      console.log(`👉 Chạy lệnh: node .agents/skills/guideline-summary-module/scripts/register_guideline.js --slug=${slug} ...`);
    }
  } else {
    console.warn(`⚠️ [7/8] Không tìm thấy file kho-guidelines-registry.ts.`);
  }

  // [8] Kiểm tra Condition Key trong guidelinesdata.ts
  if (conditionKey && fs.existsSync(DATA_FILE)) {
    const dataContent = fs.readFileSync(DATA_FILE, 'utf8');
    const condRegex = new RegExp(`['"]?${conditionKey}['"]?\\s*:\\s*{`, 'i');
    if (condRegex.test(dataContent)) {
      console.log(`✅ [8/8] ConditionKey '${conditionKey}' tồn tại trong CLINICAL_CONDITIONS của guidelinesdata.ts.`);
      score++;
    } else {
      console.warn(`⚠️ [8/8] ConditionKey '${conditionKey}' chưa được thêm vào CLINICAL_CONDITIONS của guidelinesdata.ts.`);
    }
  } else if (!conditionKey && registeredInRegistry) {
    console.log(`ℹ️ [8/8] Bài viết không gắn conditionKey đặc thù (PASS).`);
    score++;
  } else {
    console.log(`ℹ️ [8/8] Bỏ qua kiểm tra ConditionKey (do chưa đăng ký registry).`);
  }

  // Tổng kết
  console.log(`\n------------------------------------------------------------`);
  console.log(`🎯 KẾT QUẢ ĐÁNH GIÁ CHẤT LƯỢNG: ${score}/${maxScore} ĐIỂM`);
  if (score >= 7.5) {
    console.log(`🎉 CHUẨN XUẤT BẢN! Bài viết đạt chất lượng Flagship Standard EBM.`);
  } else if (score >= 6) {
    console.log(`⚠️ Bài viết cần hoàn thiện thêm một số chi tiết trước khi xuất bản.`);
  } else {
    console.log(`❌ Bài viết chưa đạt chuẩn chất lượng tối thiểu.`);
  }
  console.log(`------------------------------------------------------------\n`);
}

if (require.main === module) {
  runQA();
}

module.exports = { runQA };
