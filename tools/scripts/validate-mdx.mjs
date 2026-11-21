#!/usr/bin/env node

/**
 * 🩺 CliniPortal Unified MDX Error Checker & Design Quality Gate
 * Path: tools/scripts/validate-mdx.mjs
 *
 * Kiểm tra toàn diện lỗi cú pháp, công thức toán học (KaTeX/LaTeX), ký hiệu/HTML entities,
 * tài nguyên ảnh và chuẩn thiết kế cho mọi file .mdx trong quy trình nạp Design CliniPortal.
 *
 * Cách dùng:
 *   node tools/scripts/validate-mdx.mjs <file_or_dir> [file_or_dir2 ...] [--strict] [--no-ast] [--json]
 *   npm run validate:mdx -- src/content/basic-medical/approach
 *   npm run validate:mdx -- src/content/basic-medical/approach/ck03-truyen-nhiem-sot/tc-03-sot-cap-tinh-nl.mdx
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../');

// Optional AST compiler (@mdx-js/mdx + remark plugins matching astro.config.mjs)
let mdxCompile = null;
let remarkPlugins = [];

async function loadMdxCompiler() {
  try {
    const mdxMod = await import('@mdx-js/mdx');
    mdxCompile = mdxMod.compile;
    try {
      const rmHeading = await import('remark-heading-id');
      remarkPlugins.push(rmHeading.default || rmHeading);
    } catch {}
    try {
      const rmMath = await import('remark-math');
      remarkPlugins.push(rmMath.default || rmMath);
    } catch {}
    try {
      const rmGfm = await import('remark-gfm');
      remarkPlugins.push(rmGfm.default || rmGfm);
    } catch {}
  } catch {
    mdxCompile = null;
  }
}

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
};

// Registered custom JSX components in CliniMdxEngine (src/core/mdx-engine.ts)
const REGISTERED_COMPONENTS = new Set([
  'FlowchartViewer',
  'EpiPillarsNav',
  'EpiAlert',
  'EpiTriangle',
  'EpiTransmissionCycle',
  'EpiVectorTable',
  'PhysioQuickNav',
  'PhysioAlert',
  'PhysioFeedbackLoop',
  'BiochemQuickNav',
  'BiochemAlert',
  'PathoQuickNav',
  'PathoAlert',
  'AntibioticQuickNav',
  'AWaRePill',
  'ApproachQuickNav',
  'UrgencyPill',
  'QuickNav',
]);

// LaTeX commands handled by CliniMdxEngine.formatMathContent() fallback
const SUPPORTED_LATEX_CMDS = new Set([
  'mathbf', 'mathit', 'mathrm', 'text',
  'circ', 'left', 'right',
  'Big', 'bigg', 'big', 'Bigg', 'Bigl', 'Bigr', 'biggl', 'biggr', 'bigl', 'bigr', 'Biggl', 'Biggr',
  'sqrt', 'frac', 'xrightarrow',
  'implies', 'Longrightarrow', 'Longleftarrow',
  'rightarrow', 'leftarrow', 'leftrightarrow',
  'longrightarrow', 'longleftarrow', 'longleftrightarrow',
  'Rightarrow', 'Leftarrow', 'to', 'iff', 'uparrow', 'downarrow',
  'sum', 'prod',
  'Gamma', 'gamma', 'Delta', 'delta', 'Theta', 'theta', 'Lambda', 'lambda',
  'Sigma', 'sigma', 'Omega', 'omega', 'Phi', 'phi', 'Pi', 'pi',
  'alpha', 'beta', 'kappa', 'mu', 'eta', 'epsilon', 'varepsilon', 'rho', 'tau',
  'approx', 'propto', 'sim', 'times', 'cdot', 'pm',
  'le', 'leq', 'ge', 'geq', 'lt', 'gt', 'gg', 'll', 'neq', 'infty',
  'qquad', 'quad', 'ln', 'log',
]);

// Standard HTML5 named entities accepted without warning
const VALID_HTML_ENTITIES_RE = /^&(amp|lt|gt|quot|apos|nbsp|bull|times|ge|le|deg|plusmn|rarr|larr|uarr|darr|harr|mdash|ndash|approx|mu|alpha|beta|gamma|delta|Delta|micro|middot|minus|hellip|check|cross|copy|reg|trade|sect|para|frac12|frac14|frac34|ne|equiv|infin|sum|prod|radic|prop|sim|permil|prime|Prime|lsquo|rsquo|ldquo|rdquo|#\d+|#x[0-9a-fA-F]+);/;

// Raw LaTeX commands that should NEVER appear outside $...$ / $$...$$
const RAW_LATEX_OUTSIDE_RE = /\\(le|ge|leq|geq|rightarrow|leftarrow|leftrightarrow|Rightarrow|Leftarrow|implies|iff|times|pm|mu|alpha|beta|gamma|delta|Delta|sigma|Sigma|omega|Omega|pi|Pi|circ|text|frac|approx|neq|infty|cdot|sum|sqrt|mathbf|mathrm|mathit|uparrow|downarrow|left|right|xrightarrow|propto)\b/g;

// Container HTML/SVG tags checked for open/close balance
const BALANCED_TAGS = [
  'div', 'section', 'nav', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'ul', 'ol', 'li', 'p', 'span', 'strong', 'em', 'svg', 'figure',
  'figcaption', 'details', 'summary', 'blockquote', 'pre', 'code', 'a'
];

function collectMdxFiles(targets) {
  const results = [];
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (['node_modules', '.git', 'dist', '.astro', 'archive'].includes(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.toLowerCase().endsWith('.mdx')) results.push(full);
    }
  };

  for (const t of targets) {
    const resolved = path.isAbsolute(t) ? t : path.resolve(ROOT_DIR, t);
    if (!fs.existsSync(resolved)) {
      console.error(`${C.red}❌ Không tìm thấy đường dẫn: ${t}${C.reset}`);
      process.exitCode = 1;
      continue;
    }
    const st = fs.statSync(resolved);
    if (st.isDirectory()) walk(resolved);
    else if (st.isFile()) results.push(resolved);
  }
  return [...new Set(results)].sort();
}

function detectProfile(filePath) {
  const p = filePath.replace(/\\/g, '/').toLowerCase();
  if (p.includes('/basic-medical/approach/')) return 'approach';
  if (p.includes('/clinical-handbook/')) return 'handbook';
  if (p.includes('/ebm/guidelines/')) return 'guideline';
  if (p.includes('/basic-medical/')) return 'basic-medical';
  return 'generic';
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return { hasFm: false, fmRaw: '', body: raw, fmLineCount: 0, fields: {}, sectionIds: [] };
  const fmRaw = match[1];
  const body = raw.slice(match[0].length);
  const fmLineCount = match[0].split(/\r?\n/).length - 1;

  const fields = {};
  for (const line of fmRaw.split(/\r?\n/)) {
    const m = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (m) {
      fields[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  }
  const sectionIds = [...fmRaw.matchAll(/^\s*-\s*id:\s*["']?([^"'\r\n]+)["']?/gm)].map(m => m[1].trim());
  return { hasFm: true, fmRaw, body, fmLineCount, fields, sectionIds };
}

function stripInlineCode(line) {
  return line.replace(/`[^`]*`/g, (m) => ' '.repeat(m.length));
}

async function validateFile(filePath, opts) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const fileDir = path.dirname(filePath);
  const fileSlug = path.basename(filePath, '.mdx');
  const profile = detectProfile(filePath);

  const errors = [];
  const warnings = [];
  const addErr = (rule, line, message, snippet = '') => errors.push({ rule, line, message, snippet: snippet.slice(0, 120) });
  const addWarn = (rule, line, message, snippet = '') => warnings.push({ rule, line, message, snippet: snippet.slice(0, 120) });

  // ── 0. UTF-8 CORRUPTION CHECK ──
  if (raw.includes('\uFFFD')) {
    const ln = raw.split(/\r?\n/).findIndex(l => l.includes('\uFFFD')) + 1;
    addErr('symbol/utf8-replacement', ln, 'Phát hiện ký tự lỗi mã hóa UTF-8 ( / U+FFFD)');
  }

  // ── 1. FRONTMATTER & METADATA ──
  const { hasFm, fmRaw, body, fmLineCount, fields, sectionIds } = parseFrontmatter(raw);
  const isDraft = (fields.status || '').toLowerCase() === 'draft';

  if (!hasFm) {
    addErr('fm/missing', 1, 'Thiếu khối Frontmatter YAML hợp lệ (--- ... ---)');
  } else {
    if (!fields.title) addErr('fm/required-fields', 1, 'Frontmatter thiếu trường bắt buộc "title"');
    if (fields.slug && fields.slug !== fileSlug) {
      addErr('fm/slug-mismatch', 1, `slug "${fields.slug}" không khớp tên file "${fileSlug}.mdx"`);
    }
    if (profile === 'approach' && !isDraft) {
      for (const k of ['slug', 'code', 'specialty', 'urgency', 'sections']) {
        if (!new RegExp(`^${k}:`, 'm').test(fmRaw)) {
          addErr('fm/required-fields', 1, `Bài Tiếp cận (published) thiếu trường YAML "${k}"`);
        }
      }
    }
    if (profile === 'handbook' && !isDraft) {
      for (const k of ['slug', 'specialty', 'disease', 'sections']) {
        if (!new RegExp(`^${k}:`, 'm').test(fmRaw)) {
          addErr('fm/required-fields', 1, `Bài Sổ tay lâm sàng thiếu trường YAML "${k}"`);
        }
      }
    }

    // Check sections IDs exist in body
    for (const sId of sectionIds) {
      const hasHashId = new RegExp(`\\{#${sId}\\}`).test(body);
      const hasAttrId = new RegExp(`id=["']${sId}["']`).test(body);
      if (!hasHashId && !hasAttrId) {
        addErr('fm/section-anchor-missing', 1, `Section id "${sId}" trong YAML không tìm thấy neo "{#${sId}}" hoặc id="${sId}" trong nội dung`);
      }
    }

    // Check duplicate IDs across body
    const bodyNoCodeForIds = body.replace(/```[\s\S]*?```/g, '');
    const idCounts = new Map();
    for (const m of bodyNoCodeForIds.matchAll(/\{#([a-zA-Z0-9_-]+)\}/g)) {
      idCounts.set(m[1], (idCounts.get(m[1]) || 0) + 1);
    }
    for (const m of bodyNoCodeForIds.matchAll(/\bid=["']([a-zA-Z0-9_-]+)["']/g)) {
      // Ignore SVG marker/gradient/clipPath defs duplicates only if unique; actually all DOM IDs should be unique!
      idCounts.set(m[1], (idCounts.get(m[1]) || 0) + 1);
    }
    for (const [id, count] of idCounts.entries()) {
      if (count > 1) {
        addErr('mdx/duplicate-id', 1, `Trùng lặp DOM ID "${id}" (${count} lần) — có thể làm lệch điều hướng QuickNav/TOC`);
      }
    }
  }

  // ── 2. LINE-BY-LINE SCAN: SYNTAX, FORMULAS, SYMBOLS, DESIGN ──
  const bodyLines = body.split(/\r?\n/);
  let inCodeBlock = false;
  let codeBlockStart = 0;
  let asciiReportedInBlock = false;
  let inMathBlock = false;
  let mathBlockStart = 0;
  let inSvg = false;
  let inTable = false;
  let tableExpectedCols = 0;
  let tableRowIdx = 0;

  for (let i = 0; i < bodyLines.length; i++) {
    const line = bodyLines[i];
    const ln = fmLineCount + i + 1;
    const trimmed = line.trim();

    // Fenced code blocks
    if (trimmed.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockStart = ln;
        asciiReportedInBlock = false;
      } else {
        inCodeBlock = false;
      }
      continue;
    }

    if (inCodeBlock) {
      if (!asciiReportedInBlock && (/[┌┐└┘├┤┬┴┼│▼▲►◄]/.test(line) || /\+-[-+]+-\+/.test(line))) {
        asciiReportedInBlock = true;
        const msg = 'Phát hiện sơ đồ ASCII Art / Box-drawing trong code block (khuyến nghị chuyển sang Pure Editorial SVG hoặc Grid Cards)';
        if (!isDraft && (profile === 'approach' || profile === 'handbook')) {
          addErr('design/ascii-diagram', codeBlockStart, msg, trimmed);
        } else {
          addWarn('design/ascii-diagram', codeBlockStart, msg, trimmed);
        }
      }
      continue;
    }

    // Multiline $$ display math tracking
    if (trimmed.startsWith('$$')) {
      const rest = trimmed.slice(2).trim();
      if (inMathBlock) {
        inMathBlock = false;
      } else if (rest.endsWith('$$') && rest.length > 2) {
        // Single-line display math $$...$$
        checkMathExpr(rest.slice(0, -2).trim(), ln, addErr, addWarn);
      } else {
        inMathBlock = true;
        mathBlockStart = ln;
      }
      continue;
    }
    if (inMathBlock) {
      if (trimmed.endsWith('$$')) {
        inMathBlock = false;
      }
      continue;
    }

    // Track SVG region
    if (/<svg\b/i.test(line)) inSvg = true;

    const noCode = stripInlineCode(line);

    // 2.1. Heading legacy <span id="..."></span>
    if (/^#{1,6}\s+.*<span\s+id=["'][^"']+["']\s*>\s*<\/span>/i.test(trimmed)) {
      addWarn('mdx/heading-span-id', ln, 'Tiêu đề dùng <span id="..."></span> kiểu cũ — nên chuẩn hóa sang cú pháp {#id} để đồng bộ TOC & tránh trùng ID', trimmed);
    }

    // 2.2. HTML comments <!-- ... -->
    if (/<!--/.test(noCode)) {
      addErr('html/comment-syntax', ln, 'Dùng comment HTML <!-- ... --> trong MDX sẽ làm lỗi biên dịch @mdx-js/mdx (đổi sang {/* ... */})', trimmed);
    }

    // 2.3. Unclosed void HTML tags (<br>, <hr>, <img ...>, <input ...>, <col ...>, <source ...>)
    const voidMatches = noCode.match(/<(br|hr|img|input|col|source)\b[^/>]*?(?<!\/)>/gi);
    if (voidMatches) {
      addErr('html/unclosed-void-tag', ln, `Thẻ void HTML chưa tự đóng JSX (${voidMatches.join(', ')}) — cần thêm dấu />`, trimmed);
    }

    // 2.4. SVG <text> containing illegal HTML tags
    if (inSvg && /<text\b[^>]*>.*<(strong|b|span|br|em|i)\b/i.test(line)) {
      addErr('svg/html-inside-text', ln, 'Cấm lồng thẻ HTML (<strong>, <b>, <span>, <br>) bên trong <text> của SVG — hãy dùng <tspan>', trimmed);
    }

    // 2.5. Wrong LaTeX delimiters: \\(...\\), \(...\), \\[...\\], \[...\]
    if (/\\\\\(|\\\\\)|\\\\\[|\\\\\]/.test(noCode)) {
      addErr('math/wrong-delimiter', ln, 'Dùng dấu phân tách LaTeX kép \\\\(...\\\\) hoặc \\\\[...\\\\] không được render — bắt buộc đổi sang $...$ hoặc $$...$$', trimmed);
    } else if (/(?<!\\)\\\(|(?<!\\)\\\)|(?<!\\)\\\[|(?<!\\)\\\]/.test(noCode)) {
      addErr('math/wrong-delimiter', ln, 'Dùng dấu phân tách LaTeX \\(...\\) hoặc \\[...\\] — CliniMdxEngine & remark-math chỉ hỗ trợ $...$ và $$...$$', trimmed);
    }

    // 2.6. Display math $$...$$ inside blockquote
    if (/^>\s*.*\$\$/.test(trimmed)) {
      addErr('math/display-in-blockquote', ln, 'Đặt khối công thức $$...$$ bên trong blockquote (>) có thể lỗi render — tách $$...$$ ra dòng độc lập hoặc dùng $...$', trimmed);
    }

    // 2.7. Unmatched inline $
    const lineForDollar = noCode
      .replace(/\\\$/g, '')
      .replace(/&#36;/g, '')
      .replace(/\$\$[^\n]+?\$\$/g, '');
    const dollarCount = (lineForDollar.match(/\$/g) || []).length;
    if (dollarCount % 2 !== 0) {
      addErr('math/unmatched-dollar', ln, `Số dấu $ lẻ trên cùng một dòng (${dollarCount} dấu $) — thiếu dấu $ đóng hoặc cần escape \\$ / &#36;`, trimmed);
    }

    // 2.8. Inspect every inline $...$ expression
    for (const m of noCode.matchAll(/(?<!\$)\$(?!\$)([^\n$]+)(?<!\$)\$(?!\$)/g)) {
      checkMathExpr(m[1], ln, addErr, addWarn);
    }

    // 2.9. Raw LaTeX commands leaking OUTSIDE math
    const outsideMath = noCode
      .replace(/\$\$[^\n]+?\$\$/g, '')
      .replace(/(?<!\$)\$(?!\$)[^\n$]+(?<!\$)\$(?!\$)/g, '');
    const rawLatexHits = outsideMath.match(RAW_LATEX_OUTSIDE_RE);
    if (rawLatexHits) {
      addErr('math/raw-latex-outside', ln, `Phát hiện lệnh LaTeX thô ngoài cặp $...$: ${[...new Set(rawLatexHits)].join(', ')}`, trimmed);
    }

    // 2.10. Broken/typo LaTeX commands anywhere in line (missing backslash)
    const brokenCmdHits = noCode.match(/(?<![a-zA-Z0-9_\\])(rac\{|ext\{|ightarrow|eftarrow|ULN_\{AST\})/g);
    if (brokenCmdHits) {
      addErr('math/broken-command', ln, `Lệnh LaTeX bị mất dấu gạch chéo ngược (${brokenCmdHits.join(', ')}) — kiểm tra \\frac, \\text, \\rightarrow`, trimmed);
    }

    // 2.11. Unescaped < before digit outside math & code
    const textForLt = outsideMath.replace(/<!--[\s\S]*?-->/g, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
    if (/<\s*\d/.test(textForLt)) {
      addErr('symbol/unescaped-lt', ln, 'Dấu "<" đứng trước chữ số ngoài công thức $...$ sẽ làm lỗi JSX compiler — dùng &lt; hoặc bọc trong $...$', trimmed);
    }

    // 2.12. Double-escaped HTML entities
    const dblEntity = noCode.match(/&amp;(amp|lt|gt|quot|apos|deg|ge|le|mu|nbsp|times|rarr|larr|plusmn|bull|#\d+);/gi);
    if (dblEntity) {
      addErr('symbol/double-entity', ln, `Phát hiện HTML entity bị escape kép: ${dblEntity.join(', ')}`, trimmed);
    }

    // 2.13. Raw unescaped & inside HTML/SVG tag lines
    if (inSvg || /^<[a-zA-Z]/.test(trimmed)) {
      const htmlLineClean = outsideMath
        .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/href=["'][^"']*["']/gi, '')
        .replace(/src=["'][^"']*["']/gi, '');
      const amps = [...htmlLineClean.matchAll(/&[a-zA-Z0-9#]*;?/g)]
        .map(m => m[0])
        .filter(tok => !VALID_HTML_ENTITIES_RE.test(tok));
      if (amps.length > 0) {
        addWarn('symbol/raw-amp-in-html', ln, `Ký tự "&" chưa escape trong HTML/SVG (${amps.slice(0, 3).join(', ')}) — nên dùng &amp;`, trimmed);
      }
    }

    // 2.14. Obsidian raw syntax remnants
    if (/!\[\[[^\]]+\]\]/.test(noCode) || /\[\[[^\]]+\]\]/.test(noCode)) {
      addErr('symbol/obsidian-remnant', ln, 'Còn sót cú pháp Wikilink/Embed Obsidian ([[...]] hoặc ![[...]])', trimmed);
    }
    if (/==[^=\n]+==/.test(noCode)) {
      addErr('symbol/obsidian-remnant', ln, 'Còn sót cú pháp highlight Obsidian (==...==) — đổi sang **in đậm** hoặc <mark>', trimmed);
    }

    // 2.15. Unknown PascalCase JSX components
    for (const cm of noCode.matchAll(/<([A-Z][a-zA-Z0-9]+)\b/g)) {
      if (!REGISTERED_COMPONENTS.has(cm[1])) {
        addWarn('mdx/unknown-component', ln, `Component <${cm[1]}> chưa đăng ký trong CliniMdxEngine (src/core/mdx-engine.ts)`, trimmed);
      }
    }

    // 2.16. Hardcoded local OS paths
    if (/(?:[A-Z]:\\(?:Apps_ykhoa|Users|App_Canhan)|file:\/\/\/)/i.test(noCode)) {
      addErr('asset/hardcoded-local-path', ln, 'Phát hiện đường dẫn cục bộ ổ cứng tuyệt đối — bắt buộc dùng đường dẫn tương đối', trimmed);
    }

    // 2.17. Markdown Table consistency
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && !inSvg) {
      // Count unescaped pipes outside inline math/code
      const pipeCount = (noCode.replace(/\\\|/g, '').match(/\|/g) || []).length;
      if (!inTable) {
        inTable = true;
        tableExpectedCols = pipeCount;
        tableRowIdx = 0;
      } else {
        tableRowIdx++;
        if (tableRowIdx === 1 && !/^\|[\s:|-]+\|$/.test(trimmed)) {
          addWarn('design/markdown-table', ln, 'Dòng thứ 2 của bảng Markdown không phải hàng phân cách |---|---|', trimmed);
        } else if (pipeCount !== tableExpectedCols) {
          addWarn('design/markdown-table', ln, `Số cột bảng Markdown lệch (${pipeCount - 1} cột, mong đợi ${tableExpectedCols - 1} cột)`, trimmed);
        }
      }
    } else if (inTable) {
      inTable = false;
    }

    if (/<\/svg>/i.test(line)) inSvg = false;
  }

  if (inMathBlock) {
    addErr('math/unmatched-dollar', mathBlockStart, 'Khối công thức $$ ... $$ mở nhưng không có $$ đóng ở cuối file');
  }

  // ── 3. HTML/SVG CONTAINER TAG BALANCE ──
  const bodyNoCode = body.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]+`/g, '');
  for (const tag of BALANCED_TAGS) {
    const openRe = new RegExp(`<${tag}(?:\\s+[^>]*)?(?<!/)>`, 'gi');
    const closeRe = new RegExp(`</${tag}>`, 'gi');
    const openCount = (bodyNoCode.match(openRe) || []).length;
    const closeCount = (bodyNoCode.match(closeRe) || []).length;
    if (openCount !== closeCount) {
      addErr('html/tag-imbalance', 1, `Mất cân bằng thẻ <${tag}>: mở = ${openCount}, đóng = ${closeCount}`);
    }
  }

  // ── 4. LOCAL IMAGE ASSET VERIFICATION ──
  const imgSources = [];
  for (const m of bodyNoCode.matchAll(/!\[[^\]]*\]\(([^)\s]+)[^)]*\)/g)) {
    imgSources.push({ src: m[1], idx: m.index });
  }
  for (const m of bodyNoCode.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)) {
    imgSources.push({ src: m[1], idx: m.index });
  }
  for (const { src, idx } of imgSources) {
    if (/^(https?:|data:|\/\/)/i.test(src)) continue;
    const cleanSrc = src.split('?')[0].split('#')[0];
    const resolved = cleanSrc.startsWith('/')
      ? path.join(ROOT_DIR, 'public', cleanSrc)
      : path.resolve(fileDir, cleanSrc);
    if (!fs.existsSync(resolved)) {
      const ln = fmLineCount + bodyNoCode.slice(0, idx).split(/\r?\n/).length;
      addErr('asset/missing-image', ln, `Không tìm thấy tệp ảnh cục bộ: "${src}"`);
    }
  }

  // ── 5. LIVE @mdx-js/mdx AST COMPILATION CHECK ──
  if (opts.ast && mdxCompile) {
    try {
      // Strip valid CliniMdxEngine heading anchors `{#id}` before MDX v3 acorn parse
      // (MDX v3 tokenizes `{...}` as JS expressions before remark-heading-id transforms them)
      const astBody = body.replace(/^(#{1,6}\s+.*?)\s+\{#[a-zA-Z0-9_-]+\}\s*$/gm, '$1');
      await mdxCompile(astBody, { remarkPlugins });
    } catch (err) {
      const errLine = err.line ? fmLineCount + err.line : 1;
      addErr('mdx/ast-compile', errLine, `Lỗi biên dịch MDX AST: ${err.message}`);
    }
  }

  return { relPath, profile, isDraft, errors, warnings };
}

function checkMathExpr(expr, ln, addErr, addWarn) {
  // 1. HTML entities inside math
  const entityHits = expr.match(/&(lt|gt|le|ge|deg|mu|amp|times|plusmn|rarr|larr|nbsp|approx);/gi);
  if (entityHits) {
    addErr('math/entity-inside-math', ln, `HTML entity (${entityHits.join(', ')}) nằm bên trong công thức $...$ sẽ làm vỡ KaTeX — dùng <, >, \\le, \\ge, ^\\circ`, expr);
  }

  // 2. Unbalanced braces { }
  const openBraces = (expr.match(/(?<!\\)\{/g) || []).length;
  const closeBraces = (expr.match(/(?<!\\)\}/g) || []).length;
  if (openBraces !== closeBraces) {
    addErr('math/unbalanced-braces', ln, `Ngoặc nhọn trong công thức không cân bằng ({=${openBraces}, }=${closeBraces})`, expr);
  }

  // 3. Nested \mathbf{...\text{...}} or ^{\circ}
  if (/\\mathbf\{[^{}]*\\text\{/.test(expr)) {
    addWarn('math/nested-font-cmd', ln, 'Lồng \\text{} trong \\mathbf{} dễ lỗi trên parser fallback — nên viết tách \\mathbf{...}\\text{...}', expr);
  }
  if (/\^\{\\circ\}/.test(expr)) {
    addWarn('math/nested-font-cmd', ln, 'Dùng ^{\\circ} nên rút gọn thành ^\\circ (hoặc ký tự Unicode °) để hiển thị đồng nhất', expr);
  }

  // 4. Unsupported LaTeX commands in CliniMdxEngine fallback
  const cmds = [...expr.matchAll(/\\([a-zA-Z]+)/g)].map(m => m[1]);
  const unsup = [...new Set(cmds.filter(c => !SUPPORTED_LATEX_CMDS.has(c)))];
  if (unsup.length > 0) {
    addWarn('math/unsupported-cmd', ln, `Lệnh LaTeX chưa được hỗ trợ trong CliniMdxEngine fallback: ${unsup.map(c => '\\' + c).join(', ')}`, expr);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const opts = {
    strict: args.includes('--strict'),
    ast: !args.includes('--no-ast'),
    json: args.includes('--json'),
  };
  const targets = args.filter(a => !a.startsWith('--'));
  if (targets.length === 0) targets.push('src/content');

  if (opts.ast) await loadMdxCompiler();

  const files = collectMdxFiles(targets);
  if (files.length === 0) {
    console.log(`${C.yellow}⚠️ Không tìm thấy file .mdx nào trong: ${targets.join(', ')}${C.reset}`);
    process.exit(0);
  }

  const startTime = Date.now();
  const reports = [];
  let totalErrors = 0;
  let totalWarnings = 0;
  let passedFiles = 0;

  for (const f of files) {
    const r = await validateFile(f, opts);
    reports.push(r);
    totalErrors += r.errors.length;
    totalWarnings += r.warnings.length;
    if (r.errors.length === 0 && (!opts.strict || r.warnings.length === 0)) {
      passedFiles++;
    }
  }

  if (opts.json) {
    console.log(JSON.stringify({
      totalFiles: files.length,
      passedFiles,
      totalErrors,
      totalWarnings,
      astEnabled: Boolean(opts.ast && mdxCompile),
      reports
    }, null, 2));
  } else {
    console.log(`\n${C.bold}${C.cyan}════════════════════════════════════════════════════════════════════════${C.reset}`);
    console.log(`${C.bold}${C.cyan}  🩺 CliniPortal Unified MDX Error Checker (Syntax • Math • Symbols)    ${C.reset}`);
    console.log(`${C.dim}  AST Compiler: ${opts.ast && mdxCompile ? 'ON (@mdx-js/mdx + remark-math + remark-heading-id)' : 'OFF'} | Strict: ${opts.strict ? 'ON' : 'OFF'}${C.reset}`);
    console.log(`${C.bold}${C.cyan}════════════════════════════════════════════════════════════════════════${C.reset}\n`);

    for (const r of reports) {
      if (r.errors.length === 0 && r.warnings.length === 0) {
        console.log(`${C.green}✅ PASS${C.reset} ${C.bold}${r.relPath}${C.reset} ${C.dim}[${r.profile}${r.isDraft ? ' • draft' : ''}]${C.reset}`);
        continue;
      }
      const icon = r.errors.length > 0 ? `${C.red}✖ FAIL${C.reset}` : `${C.yellow}⚠ WARN${C.reset}`;
      console.log(`${icon} ${C.bold}${r.relPath}${C.reset} ${C.dim}[${r.profile}${r.isDraft ? ' • draft' : ''}]${C.reset}`);
      for (const e of r.errors) {
        console.log(`   ${C.red}error${C.reset} [${e.rule}] L${e.line}: ${e.message}`);
        if (e.snippet) console.log(`         ${C.dim}${e.snippet}${C.reset}`);
      }
      for (const w of r.warnings) {
        console.log(`   ${C.yellow}warn ${C.reset} [${w.rule}] L${w.line}: ${w.message}`);
        if (w.snippet) console.log(`         ${C.dim}${w.snippet}${C.reset}`);
      }
      console.log('');
    }

    const sec = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`${C.bold}${C.cyan}────────────────────────────────────────────────────────────────────────${C.reset}`);
    console.log(`  • Files kiểm tra : ${C.bold}${files.length}${C.reset} (${C.green}${passedFiles} đạt${C.reset})`);
    console.log(`  • Lỗi nghiêm trọng: ${totalErrors > 0 ? C.red : C.green}${C.bold}${totalErrors} errors${C.reset}`);
    console.log(`  • Cảnh báo       : ${totalWarnings > 0 ? C.yellow : C.green}${C.bold}${totalWarnings} warnings${C.reset}`);
    console.log(`  • Thời gian      : ${C.dim}${sec}s${C.reset}`);
    console.log(`${C.bold}${C.cyan}────────────────────────────────────────────────────────────────────────${C.reset}\n`);

    if (totalErrors > 0 || (opts.strict && totalWarnings > 0)) {
      console.log(`${C.bgRed}${C.white}${C.bold} FAILED ${C.reset} Phát hiện lỗi MDX cần khắc phục trước khi nạp design / build.\n`);
    } else {
      console.log(`${C.bgGreen}${C.white}${C.bold} PASSED ${C.reset} Toàn bộ file MDX sạch lỗi cú pháp, công thức và ký hiệu!\n`);
    }
  }

  if (totalErrors > 0 || (opts.strict && totalWarnings > 0)) {
    process.exit(1);
  }
}

main();
