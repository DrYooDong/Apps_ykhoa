#!/usr/bin/env node
/**
 * @file convert-guidelines-html-to-mdx.js
 * @description Batch converts all 58 HTML clinical guidelines into 100% rich, high-fidelity Astro MDX Native files.
 */

const fs = require('fs');
const path = require('path');
const { compile } = require('@mdx-js/mdx');

const GUIDELINES_DIR = path.resolve(__dirname, '../../src/content/ebm/guidelines/kho-guidelines');

const ORG_MAP = {
  'byt': 'Bộ Y Tế',
  'aha-acc': 'AHA / ACC',
  'kdigo': 'KDIGO',
  'esc': 'ESC',
  'idsa': 'IDSA',
  'ada': 'ADA',
  'who': 'WHO',
  'apasl': 'APASL',
  'bsg': 'BSG',
  'jrs': 'JRS',
  'jcem': 'JCEM',
  'jcva': 'JCVA',
  'lww': 'LWW',
  'mbm': 'MBM',
  'nature-reviews': 'Nature Reviews',
  'nejm': 'NEJM',
  'ssc': 'Surviving Sepsis Campaign',
  'tg18': 'Tokyo Guidelines',
  'jsge': 'JSGE',
  'acg': 'ACG',
  'easl': 'EASL',
  'dash': 'AHA / NHLBI',
  'gina': 'GINA',
  'icm': 'ICM',
  'icu': 'ICU Critical Care'
};

const VALID_HTML_TAGS = new Set([
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo',
  'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup',
  'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed',
  'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label',
  'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object',
  'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp',
  'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span',
  'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template',
  'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',
  // SVG tags
  'circle', 'ellipse', 'line', 'path', 'polygon', 'polyline', 'rect', 'text', 'tspan', 'g',
  'defs', 'use', 'symbol', 'clipPath', 'linearGradient', 'radialGradient', 'stop', 'foreignObject'
]);

function extractOrgAndYear(slug) {
  const parts = slug.split('-');
  let year = '2026';
  let orgKey = 'BYT';

  if (/^\d{4}$/.test(parts[0])) {
    year = parts[0];
    if (parts[1]) {
      if (parts[1] === 'aha' && parts[2] === 'acc') orgKey = 'aha-acc';
      else if (parts[1] === 'nature' && parts[2] === 'reviews') orgKey = 'nature-reviews';
      else orgKey = parts[1];
    }
  }

  const organization = ORG_MAP[orgKey.toLowerCase()] || orgKey.toUpperCase();
  return { year, organization };
}

function fixSelfClosingTags(html) {
  let res = html;
  res = res.replace(/<(img|br|hr|input|source|col)\b([^>]*?)(\/?)>/gi, (match, tag, attrs, slash) => {
    if (slash === '/') return match;
    return `<${tag}${attrs} />`;
  });
  return res;
}

function escapeNonTagAngleBrackets(html) {
  return html.replace(/<(\/?[a-zA-Z0-9\-_]+)?/g, (match, tag) => {
    if (!tag) return '&lt;';
    const cleanTag = tag.replace(/^\//, '').toLowerCase();
    if (VALID_HTML_TAGS.has(cleanTag)) {
      return match;
    }
    return `&lt;${tag}`;
  });
}

function cleanMathLatex(html) {
  let res = html;
  res = res.replace(/\\text\{\s*([^}]+)\s*\}/g, '$1');
  res = res.replace(/\\le\s*/g, '≤ ');
  res = res.replace(/\\ge\s*/g, '≥ ');
  res = res.replace(/\\rightarrow/g, '→');
  res = res.replace(/\\pm\s*/g, '± ');
  res = res.replace(/\\times/g, '×');
  res = res.replace(/\\mu/g, 'µ');
  res = res.replace(/\\alpha/g, 'α');
  res = res.replace(/\\beta/g, 'β');

  res = res.replace(/\$BMI\s*\\ge\s*(\d+)\$/g, 'BMI ≥ $1');
  res = res.replace(/\$\\ge\s*(\d+)\s*\\text\{\s*mg\/dL\s*\}\$/g, '≥ $1 mg/dL');
  res = res.replace(/\$\\ge\s*(\d+)\\\%\$/g, '≥ $1%');
  res = res.replace(/\$\\le\s*(\d+)\\\%\$/g, '≤ $1%');
  res = res.replace(/\$\\ge\s*(\d+)\$/g, '≥ $1');
  res = res.replace(/\$\\le\s*(\d+)\$/g, '≤ $1');
  res = res.replace(/\$\\pm\s*(\d+)\$/g, '± $1');
  res = res.replace(/\$\\times\$/g, '×');
  res = res.replace(/\$/g, '&#36;');
  return res;
}

function sanitizeJsxContent(html) {
  let content = html;

  // 1. Remove HTML comments
  content = content.replace(/<!--[\s\S]*?-->/g, '');

  // 2. Remove script and style tags completely
  content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<script[^>]*>/gi, '');
  content = content.replace(/<\/script>/gi, '');
  content = content.replace(/<style[\s\S]*?<\/style>/gi, '');
  content = content.replace(/<style[^>]*>/gi, '');
  content = content.replace(/<\/style>/gi, '');

  // 3. Remove inline event handlers
  content = content.replace(/\s+on[a-z]+="[^"]*"/gi, '');
  content = content.replace(/\s+on[a-z]+='[^']*'/gi, '');

  // 4. Normalize <main class="page-content"> to <div class="page-content">
  content = content.replace(/<main\b/gi, '<div');
  content = content.replace(/<\/main>/gi, '</div>');

  // 5. Fix self closing tags
  content = fixSelfClosingTags(content);

  // 6. Clean math LaTeX and stray $
  content = cleanMathLatex(content);

  // 7. Escape comparison operators < that are not HTML tags
  content = escapeNonTagAngleBrackets(content);

  // 8. Escape raw & in attributes and text
  content = content.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');

  // 9. Clean newlines inside opening tags like <i\n class="..."> -> <i class="...">
  content = content.replace(/<([a-zA-Z0-9\-]+)\s*\n\s*([^>]*?)>/gi, '<$1 $2>');
  content = content.replace(/<([a-zA-Z0-9\-]+)\s*\n\s*([^>]*?)>/gi, '<$1 $2>');

  // 10. Escape literal footnote asterisks e.g. )* or \d* inside table cells
  content = content.replace(/(\)|\]|\d)\*(<\/[a-zA-Z0-9]+>)/g, '$1&#42;$2');
  content = content.replace(/(<\b[a-zA-Z0-9]+[^>]*>)\*(<\/[a-zA-Z0-9]+>)/g, '$1&#42;$2');

  // 11. Escape literal { and } everywhere outside tags BEFORE JSX template literal creation
  let inTag = false;
  let result = '';
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (char === '<') inTag = true;
    else if (char === '>') inTag = false;

    if (!inTag) {
      if (char === '{') {
        result += '&#123;';
        continue;
      } else if (char === '}') {
        result += '&#125;';
        continue;
      }
    }
    result += char;
  }
  content = result;

  // 12. Flatten each <li>...</li> to single line
  content = content.replace(/<li\b([^>]*)>([\s\S]*?)<\/li>/gi, (match, attrs, inner) => {
    const cleanInner = inner.replace(/\n\s*([•\-])\s+/g, ' <br />&bull; ').replace(/\n\s*/g, ' ').trim();
    return `<li${attrs}>${cleanInner}</li>`;
  });

  // 13. Flatten each <td>...</td> and <th>...</th> to single line
  content = content.replace(/<td\b([^>]*)>([\s\S]*?)<\/td>/gi, (match, attrs, inner) => {
    const clean = inner.replace(/\n\s*/g, ' ').trim();
    return `<td${attrs}>${clean}</td>`;
  });
  content = content.replace(/<th\b([^>]*)>([\s\S]*?)<\/th>/gi, (match, attrs, inner) => {
    const clean = inner.replace(/\n\s*/g, ' ').trim();
    return `<th${attrs}>${clean}</th>`;
  });

  // 14. Flatten <p> and subtitle/card-header/desc divs to single line
  content = content.replace(/(<p\b[^>]*>)([\s\S]*?)(<\/p>)/gi, (m, o, inner, c) => o + inner.replace(/\s+/g, ' ').trim() + c);
  content = content.replace(/(<div class="[^"]*(?:desc|hdr|title|subtitle|text|label|item)[^"]*"[^>]*>)([\s\S]*?)(<\/div>)/gi, (m, o, inner, c) => {
    if (inner.includes('<div') || inner.includes('<table') || inner.includes('<ul')) return m;
    return o + inner.replace(/\s+/g, ' ').trim() + c;
  });

  // 15. Pre tag cleanup: convert ASCII flowcharts inside <pre> to safe JSX string literals
  content = content.replace(/<pre\b([^>]*)>([\s\S]*?)<\/pre>/gi, (match, attrs, inner) => {
    const textOnly = inner.replace(/<[^>]+>/g, '');
    const escaped = textOnly.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '&#36;');
    return `<pre${attrs}>{\`${escaped}\`}</pre>`;
  });

  // 16. Fix <span class="infobox-title">...</span> followed immediately by <ul> on the same line
  content = content.replace(/(<span\b[^>]*>[^<]*<\/span>)\s*(<ul\b)/gi, '$1\n$2');

  // 17. Fix nested <ul> inside <li> ONLY within single <li>
  content = content.replace(/(<li\b[^>]*>(?:(?!<\/?li\b)[\s\S])*?)<ul\b([^>]*)>([\s\S]*?)<\/ul>\s*<\/li>/gi, (match, title, ulAttrs, inner) => {
    const subItems = inner.replace(/<\/?li>/gi, (m) => m.toLowerCase() === '<li>' ? '<span class="sub-item">• ' : '</span>').replace(/\n\s*/g, ' ').trim();
    return `${title.trim()} <span class="sub-list">${subItems}</span></li>`;
  });

  // 18. Fix specific formatting in 2026-byt-tom-tat-viem-gan-b
  if (content.includes('Quyết định số 1740/QĐ-BYT')) {
    content = content.replace(/(?:^|\n)\s*(\d+\.\s+[^\n<]+)/gm, '\n<li>$1</li>');
    content = content.replace(/(<h3\b[^>]*>[\s\S]*?<\/h3>)\s*(<li>[\s\S]*?<\/li>(?:\s*<li>[\s\S]*?<\/li>)*)/gi, '$1\n<ul>\n$2\n</ul>');
    content = content.replace(/(<div class="sec-body">)\s*(<li>[\s\S]*?<\/li>)/gi, '$1\n<ul>\n$2\n</ul>');
  }

  // 19. Fix unclosed structural tags
  const tagsToBalance = ['div', 'section', 'article', 'pre', 'table', 'tbody', 'ul', 'ol'];
  for (const tag of tagsToBalance) {
    const openCount = (content.match(new RegExp(`<${tag}\\b`, 'gi')) || []).length;
    const closeCount = (content.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
    if (openCount > closeCount) {
      for (let i = 0; i < (openCount - closeCount); i++) {
        content += `\n</${tag}>`;
      }
    }
  }

  return content;
}

function parseSections(html) {
  const sections = [];
  const seenIds = new Set();

  const navLinkRegex = /<a\s+[^>]*href="#([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let navMatch;
  let navCount = 1;
  while ((navMatch = navLinkRegex.exec(html)) !== null) {
    const id = navMatch[1];
    if (seenIds.has(id) || id.startsWith('top') || id === 'header' || id === 'quickmenu') continue;
    seenIds.add(id);

    const inner = navMatch[2];
    const iconMatch = inner.match(/<i\s+class="([^"]+)"/i);
    let title = inner.replace(/<[^>]+>/g, '').trim();
    title = title.replace(/^\d+[\.\:\-]\s*/, '').trim();

    sections.push({
      id,
      number: navCount,
      title: title.replace(/"/g, "'"),
      icon: iconMatch ? iconMatch[1] : 'fa-solid fa-book-medical'
    });
    navCount++;
  }

  if (sections.length > 0) return sections;

  const secElementRegex = /<(div|section|article)\s+[^>]*class=["'][^"']*sec-card[^"']*["'][^>]*id=["']([^"']+)["'][\s\S]*?<(span|h\d|div)\s+class=["']sec-title["'][^>]*>([\s\S]*?)<\/\3>/gi;
  let elMatch;
  let elCount = 1;

  while ((elMatch = secElementRegex.exec(html)) !== null) {
    const id = elMatch[2];
    const rawTitle = elMatch[4];
    if (seenIds.has(id)) continue;
    seenIds.add(id);

    let title = rawTitle.replace(/<[^>]+>/g, '').trim();
    title = title.replace(/^\d+[\.\:\-]\s*/, '').trim();

    sections.push({
      id,
      number: elCount,
      title: title.replace(/"/g, "'"),
      icon: 'fa-solid fa-book-medical'
    });
    elCount++;
  }

  return sections;
}

function parseKeyRecommendations(html) {
  const recs = [];
  const pearlMatches = html.match(/<div\s+class="infobox\s+success"[^>]*>([\s\S]*?)<\/div>/gi) ||
                       html.match(/<div\s+class="ebm-rec-card\s+class-1"[^>]*>([\s\S]*?)<\/div>/gi) ||
                       html.match(/<div\s+class="stat-lbl"[^>]*>([\s\S]*?)<\/div>/gi) ||
                       html.match(/<div\s+class="infobox[^"]*"[^>]*>([\s\S]*?)<\/div>/gi);

  if (pearlMatches) {
    for (const pm of pearlMatches.slice(0, 4)) {
      const text = pm.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      if (text.length > 15 && text.length < 250) {
        recs.push(text.replace(/"/g, "'"));
      }
    }
  }

  if (recs.length === 0) {
    recs.push('Nắm vững các chỉ định điều trị và cập nhật phác đồ chuẩn y học chứng cứ.');
  }

  return recs;
}

function extractMainBody(rawHtml) {
  let startIdx = -1;
  const statsMatch = rawHtml.search(/<(div|section)\s+class=["'][^"']*stats-strip/i);
  const pillarsMatch = rawHtml.search(/<(div|section)\s+class=["'][^"']*pillars["']/i);
  const pageContentMatch = rawHtml.search(/<(div|main)\s+class=["'][^"']*page-content/i);

  const indices = [statsMatch, pillarsMatch, pageContentMatch].filter(i => i !== -1);
  if (indices.length > 0) {
    startIdx = Math.min(...indices);
  } else {
    const firstSecCard = rawHtml.search(/<(div|section|article)\s+[^>]*id=["']sec-1["']/i);
    if (firstSecCard !== -1) startIdx = firstSecCard;
  }

  if (startIdx === -1) return '';

  let bodyPortion = rawHtml.substring(startIdx);

  const endMatch = bodyPortion.search(/<footer|<div\s+id=["']footer|<div\s+class=["']page-footer|<script|<\/body/i);
  if (endMatch !== -1) {
    bodyPortion = bodyPortion.substring(0, endMatch);
  }

  return bodyPortion.trim();
}

function convertHtmlToMdx(filePath) {
  const rawHtml = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const slug = fileName.replace(/\.html$/, '');

  // 1. Metadata
  const titleMatch = rawHtml.match(/<title>([\s\S]*?)<\/title>/i);
  let title = titleMatch ? titleMatch[1].replace(/– CliniPortal|— CliniPortal/g, '').trim() : slug;
  title = title.replace(/"/g, "'").replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const descMatch = rawHtml.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  let description = descMatch ? descMatch[1].trim() : `Tóm tắt khuyến cáo lâm sàng EBM: ${title}`;
  description = description.replace(/"/g, "'").replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, ' ');

  const { year, organization } = extractOrgAndYear(slug);
  const code = `GDL-${slug.toUpperCase()}`;

  const sections = parseSections(rawHtml);
  const keyRecommendations = parseKeyRecommendations(rawHtml);

  // 2. Extract Body Content
  const rawBody = extractMainBody(rawHtml);
  const cleanBody = sanitizeJsxContent(rawBody);

  // Build Frontmatter
  const sectionsYaml = sections.map(s => `  - id: "${s.id}"\n    number: ${s.number}\n    title: "${s.title}"\n    icon: "${s.icon}"`).join('\n');
  const pearlsYaml = keyRecommendations.map(r => `  - "${r.replace(/</g, '&lt;').replace(/>/g, '&gt;')}"`).join('\n');

  const tags = [
    organization,
    year,
    'Khuyến cáo lâm sàng',
    'Evidence-Based Medicine'
  ];
  const tagsYaml = tags.map(t => `  - "${t}"`).join('\n');

  const mdxContent = `---
title: "${title}"
slug: "${slug}"
code: "${code}"
organization: "${organization}"
year: "${year}"
category: "guidelines"
status: "published"
version: "2.0.0"
updatedAt: "${new Date().toISOString().split('T')[0]}"
description: "${description}"
tags:
${tagsYaml}
keyRecommendations:
${pearlsYaml}
sections:
${sectionsYaml}
---

${cleanBody}
`;

  const targetMdxPath = path.join(GUIDELINES_DIR, `${slug}.mdx`);
  fs.writeFileSync(targetMdxPath, mdxContent, 'utf8');
}

async function run() {
  console.log('🚀 Starting Comprehensive Guideline HTML to MDX Conversion...');
  const files = fs.readdirSync(GUIDELINES_DIR).filter(f => f.endsWith('.html') && f !== 'index.html');
  console.log(`Found ${files.length} guideline HTML files.`);

  let successCount = 0;
  for (const file of files) {
    try {
      convertHtmlToMdx(path.join(GUIDELINES_DIR, file));
      successCount++;
    } catch (err) {
      console.error(`❌ Error converting ${file}:`, err);
    }
  }

  console.log(`\n🎉 Converted ${successCount}/${files.length} guidelines. Now testing compilation...`);

  let compileErrors = 0;
  const mdxFiles = fs.readdirSync(GUIDELINES_DIR).filter(f => f.endsWith('.mdx'));
  for (const f of mdxFiles) {
    const filePath = path.join(GUIDELINES_DIR, f);
    const content = fs.readFileSync(filePath, 'utf8');
    try {
      await compile(content, { jsx: true });
    } catch (err) {
      console.error(`❌ MDX Error in ${f}:`, err.message);
      compileErrors++;
    }
  }

  if (compileErrors === 0) {
    console.log(`\n🌟🌟🌟 100% OF ALL ${mdxFiles.length} MDX FILES COMPILED CLEANLY WITH ZERO ERRORS! 🌟🌟🌟`);
  } else {
    console.error(`\n⚠️ ${compileErrors} files have MDX syntax issues.`);
  }
}

run();
