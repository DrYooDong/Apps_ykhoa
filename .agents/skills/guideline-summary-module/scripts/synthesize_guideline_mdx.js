/**
 * synthesize_guideline_mdx.js
 * 
 * Tool tự động hóa tổng hợp, trích xuất hình ảnh, làm sạch LaTeX $ và sinh file
 * Astro MDX Native cho Phân hệ Y học Chứng cứ (src/content/ebm/guidelines/kho-guidelines/<slug>.mdx).
 * 
 * Cách sử dụng:
 *   node .agents/skills/guideline-summary-module/scripts/synthesize_guideline_mdx.js --slug=<slug> --files="<file1>,<file2>,..." [--title="..."] [--org="..."] [--year="..."]
 *   
 * Ví dụ:
 *   node .agents/skills/guideline-summary-module/scripts/synthesize_guideline_mdx.js --slug=2026-apasl-viem-gan-b --files="knowledge-vault/Kho cập nhật/Truyền nhiễm & Vi sinh/CN_APASL_VGSVB_2026_P1.md,knowledge-vault/Kho cập nhật/Truyền nhiễm & Vi sinh/CN_APASL_VGSVB_2026_P2.md,knowledge-vault/Kho cập nhật/Truyền nhiễm & Vi sinh/CN_APASL_VGSVB_2026_P3.md"
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '../../../../');
const KHO_GUIDELINES_DIR = path.join(WORKSPACE_ROOT, 'src/content/ebm/guidelines/kho-guidelines');
const IMAGES_DEST_DIR = path.join(KHO_GUIDELINES_DIR, 'images');
const ATTACHMENTS_DIR = path.join(WORKSPACE_ROOT, 'knowledge-vault/_resources/attachments');
const DATA_FILE_PATH = path.join(WORKSPACE_ROOT, 'src/content/ebm/guidelines/guidelinesdata.js');

// Parse CLI Args
const args = {};
process.argv.slice(2).forEach(arg => {
  if (arg.startsWith('--')) {
    const [key, ...vals] = arg.slice(2).split('=');
    args[key] = vals.join('=');
  }
});

function cleanMathLatex(text) {
  if (!text) return '';
  return text
    .replace(/\\ge/g, '≥')
    .replace(/\\le/g, '≤')
    .replace(/\\geq/g, '≥')
    .replace(/\\leq/g, '≤')
    .replace(/\\text\{([^}]+)\}/g, ' $1')
    .replace(/\^2/g, '²')
    .replace(/\\%/g, '%')
    .replace(/\\\((.*?)\\\)/g, '$1')
    .replace(/\\rightarrow/g, '→')
    .replace(/<-/g, '←')
    .replace(/\\beta_1/g, 'β₁')
    .replace(/\\beta_2/g, 'β₂')
    .replace(/\\beta/g, 'β')
    .replace(/\\alpha1/g, 'α₁')
    .replace(/\\alpha/g, 'α')
    .replace(/T_4/g, 'T₄')
    .replace(/T_3/g, 'T₃')
    .replace(/K\^\+/g, 'K⁺')
    .replace(/Na\^\+/g, 'Na⁺')
    .replace(/\$([^\$]+)\$/g, (m, p1) => {
      return p1
        .replace(/\\ge/g, '≥')
        .replace(/\\le/g, '≤')
        .replace(/\\geq/g, '≥')
        .replace(/\\leq/g, '≤')
        .replace(/\\times/g, '×')
        .replace(/\\pm/g, '±')
        .replace(/\\mu/g, 'µ')
        .replace(/\\text\{([^}]+)\}/g, ' $1')
        .trim();
    });
}

function findAndCopyAttachments(rawText, targetSlug) {
  if (!fs.existsSync(IMAGES_DEST_DIR)) {
    fs.mkdirSync(IMAGES_DEST_DIR, { recursive: true });
  }

  // Find pattern ![[Pasted image ...]] or ![...](...Pasted image...)
  const imgRegex = /!\[\[([^\]]+\.(?:png|jpe?g|webp|svg))\]\]|!\[([^\]]*)\]\(([^)]+\.(?:png|jpe?g|webp|svg))\)/gi;
  let match;
  const foundImages = [];
  let index = 1;

  while ((match = imgRegex.exec(rawText)) !== null) {
    const rawName = match[1] || match[3];
    const baseName = path.basename(rawName);
    foundImages.push({
      original: match[0],
      baseName: baseName,
      targetName: `${targetSlug}-fig${index}${path.extname(baseName) || '.png'}`
    });
    index++;
  }

  const copiedImages = [];

  for (const img of foundImages) {
    let srcPath = null;
    if (fs.existsSync(path.join(ATTACHMENTS_DIR, img.baseName))) {
      srcPath = path.join(ATTACHMENTS_DIR, img.baseName);
    } else {
      // Recursive search in knowledge-vault if not in standard attachments dir
      const searchDir = (dir) => {
        if (!fs.existsSync(dir) || srcPath) return;
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const full = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            searchDir(full);
          } else if (entry.name === img.baseName) {
            srcPath = full;
            break;
          }
        }
      };
      searchDir(path.join(WORKSPACE_ROOT, 'knowledge-vault'));
    }

    if (srcPath) {
      const destPath = path.join(IMAGES_DEST_DIR, img.targetName);
      fs.copyFileSync(srcPath, destPath);
      console.log(`✅ Đã copy ảnh: ${img.baseName} -> ${img.targetName}`);
      copiedImages.push({
        original: img.original,
        targetName: img.targetName,
        relPath: `./images/${img.targetName}`
      });
    } else {
      console.warn(`⚠️ Không tìm thấy file ảnh nguồn: ${img.baseName}`);
    }
  }

  return copiedImages;
}

function processFiles(fileList, slug) {
  let fullRawText = '';
  console.log(`Đang đọc ${fileList.length} file nguồn...`);

  for (const f of fileList) {
    const absPath = path.isAbsolute(f) ? f : path.join(WORKSPACE_ROOT, f);
    if (!fs.existsSync(absPath)) {
      console.error(`❌ Không tìm thấy file: ${absPath}`);
      continue;
    }
    const txt = fs.readFileSync(absPath, 'utf8');
    fullRawText += `\n\n<!-- SOURCE: ${path.basename(absPath)} -->\n\n` + txt;
  }

  // 1. Image extraction
  const images = findAndCopyAttachments(fullRawText, slug);

  // 2. Clean Math LaTeX
  let processed = cleanMathLatex(fullRawText);

  // 3. Replace Image Markdown tags with Fig cards
  for (const img of images) {
    const cardHtml = `<div class="fig-card">
  <img src="${img.relPath}" alt="Figure" class="fig-img" loading="lazy" />
  <div class="fig-caption">
    <div class="fig-title">${img.targetName}</div>
  </div>
</div>`;
    processed = processed.replace(img.original, cardHtml);
  }

  console.log(`✅ Đã xử lý xong ${fileList.length} file nguồn (${processed.length} chars).`);
  return { processed, images };
}

module.exports = {
  cleanMathLatex,
  findAndCopyAttachments,
  processFiles
};

if (require.main === module) {
  if (!args.slug || !args.files) {
    console.log('Cách dùng: node synthesize_guideline_mdx.js --slug=<slug> --files="file1.md,file2.md"');
    process.exit(0);
  }

  const files = args.files.split(',').map(s => s.trim());
  processFiles(files, args.slug);
}
