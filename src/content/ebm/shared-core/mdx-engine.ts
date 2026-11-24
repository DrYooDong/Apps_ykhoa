/**
 * CliniPortal 2.0 — Shared Configurable MDX Engine for EBM Modules
 * Path: src/content/ebm/shared-core/mdx-engine.ts
 *
 * Parses MDX frontmatter & body safely with configurable image base path,
 * protecting inline SVGs, tables, styles, and scripts while building TOC.
 */

export interface SharedParsedMdx {
  frontmatter: Record<string, unknown>;
  title: string;
  description: string;
  html: string;
  toc: Array<{ id: string; text: string; level: number }>;
}

export interface SharedMdxParseOptions {
  imageBasePath?: string;
}

function cleanYamlScalar(raw: string): unknown {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null' || trimmed === '~') return null;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    }
  }
  return trimmed.replace(/^["']|["']$/g, '');
}

export function extractMdxFrontmatter(rawMdx: string): {
  frontmatter: Record<string, unknown>;
  body: string;
} {
  if (!rawMdx || !rawMdx.startsWith('---')) {
    return { frontmatter: {}, body: rawMdx || '' };
  }

  const match = rawMdx.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    return { frontmatter: {}, body: rawMdx };
  }

  const rawYaml = match[1];
  const body = rawMdx.slice(match[0].length);
  const frontmatter: Record<string, unknown> = {};
  const lines = rawYaml.split(/\r?\n/);

  let currentKey: string | null = null;
  let mode: 'array_simple' | 'array_objects' | 'object' | null = null;
  let currentObj: Record<string, unknown> | null = null;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const indent = (rawLine.match(/^(\s*)/)?.[1] || '').length;

    if (indent >= 2 && mode === 'array_objects' && currentKey && trimmed.startsWith('-')) {
      const rest = trimmed.replace(/^-\s*/, '').trim();
      currentObj = {};
      (frontmatter[currentKey] as Array<Record<string, unknown>>).push(currentObj);
      const colonIdx = rest.indexOf(':');
      if (colonIdx > 0) {
        const k = rest.slice(0, colonIdx).trim();
        const v = rest.slice(colonIdx + 1).trim();
        currentObj[k] = cleanYamlScalar(v);
      }
      continue;
    }

    if (indent >= 4 && mode === 'array_objects' && currentObj && trimmed.includes(':')) {
      const colonIdx = trimmed.indexOf(':');
      const k = trimmed.slice(0, colonIdx).trim();
      const v = trimmed.slice(colonIdx + 1).trim();
      currentObj[k] = cleanYamlScalar(v);
      continue;
    }

    if (indent >= 2 && mode === 'array_simple' && currentKey && trimmed.startsWith('-')) {
      const itemVal = trimmed.replace(/^-\s*/, '').trim();
      if (!Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey] = [];
      }
      (frontmatter[currentKey] as unknown[]).push(cleanYamlScalar(itemVal));
      continue;
    }

    if (indent >= 2 && mode === 'object' && currentKey && trimmed.includes(':')) {
      const colonIdx = trimmed.indexOf(':');
      const subKey = trimmed.slice(0, colonIdx).trim().replace(/^["']|["']$/g, '');
      const subVal = trimmed.slice(colonIdx + 1).trim();
      if (typeof frontmatter[currentKey] !== 'object' || frontmatter[currentKey] === null) {
        frontmatter[currentKey] = {};
      }
      (frontmatter[currentKey] as Record<string, unknown>)[subKey] = cleanYamlScalar(subVal);
      continue;
    }

    if (indent === 0 && trimmed.includes(':')) {
      const colonIdx = trimmed.indexOf(':');
      const key = trimmed.slice(0, colonIdx).trim();
      const val = trimmed.slice(colonIdx + 1).trim();

      if (val === '') {
        currentKey = key;
        currentObj = null;
        if (key === 'sections') {
          mode = 'array_objects';
          frontmatter[key] = [];
        } else if (key === 'subgroups' || key === 'primaryMetric' || key === 'metrics') {
          mode = 'object';
          frontmatter[key] = {};
        } else {
          mode = 'array_simple';
          frontmatter[key] = [];
        }
      } else {
        currentKey = key;
        mode = null;
        currentObj = null;
        frontmatter[key] = cleanYamlScalar(val);
      }
    }
  }

  return { frontmatter, body };
}

export class SharedEbmMdxEngine {
  public parse(rawMdx: string, options: SharedMdxParseOptions = {}): SharedParsedMdx {
    if (!rawMdx) {
      return { frontmatter: {}, title: '', description: '', html: '', toc: [] };
    }

    const imageBase = (options.imageBasePath || 'src/content/ebm/research/kho-nghien-cuu/images').replace(/\/$/, '');
    const { frontmatter, body } = extractMdxFrontmatter(rawMdx);
    let content = body;
    const toc: Array<{ id: string; text: string; level: number }> = [];

    const title = String(frontmatter.title || '');
    const description = String(frontmatter.description || '');

    // Strip JSX block comments {/* ... */}
    content = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

    // Rewrite relative ./images/... paths to target module image directory
    content = content.replace(
      /src=["'](?:\.\/)?(?:kho-guidelines\/|kho-nghien-cuu\/)?images\/([^"']+)["']/g,
      `src="${imageBase}/$1"`
    );
    content = content.replace(
      /!\[(.*?)\]\((?:\.\/)?(?:kho-guidelines\/|kho-nghien-cuu\/)?images\/(.*?)\)/g,
      (_m, alt: string, imgFile: string) =>
        `<figure class="res-figure-card"><img src="${imageBase}/${imgFile}" alt="${alt}" class="fig-img" loading="lazy" />${
          alt ? `<figcaption class="fig-caption">${alt}</figcaption>` : ''
        }</figure>`
    );

    // Stash sensitive HTML/SVG/Script/Style blocks
    const stash = new Map<string, string>();
    let blockCounter = 0;
    const stashBlock = (htmlBlock: string): string => {
      const token = `__CLINI_RES_MDX_STASH_${blockCounter++}__`;
      stash.set(token, htmlBlock.trim());
      return `\n\n${token}\n\n`;
    };

    content = content.replace(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/gi, (m) => stashBlock(m));
    content = content.replace(/<style(?:\s+[^>]*)?>([\s\S]*?)<\/style>/gi, (m) => stashBlock(m));
    content = content.replace(/<svg\b[\s\S]*?<\/svg>/gi, (m) => stashBlock(m));
    content = content.replace(/<table\b[\s\S]*?<\/table>/gi, (m) => stashBlock(m));

    // Self-closing & paired custom MDX tags
    content = content.replace(/<([A-Z][a-zA-Z0-9]*)\s+([^>]*?)\/>/g, (_m, tag: string, attrs: string) => {
      return `<div class="mdx-component mdx-${tag.toLowerCase()}" ${attrs}></div>`;
    });
    content = content.replace(
      /<([A-Z][a-zA-Z0-9]*)\s+([^>]*?)>([\s\S]*?)<\/\1>/g,
      (_m, tag: string, attrs: string, inner: string) => {
        return `<div class="mdx-callout mdx-${tag.toLowerCase()}" ${attrs}><div class="mdx-callout-inner">${inner}</div></div>`;
      }
    );

    // Extract headings from HTML <h2>/<h3> inside sec-cards as well as Markdown headings
    const htmlH2Regex = /<div\s+class=["'][^"']*sec-card[^"']*["']\s+id=["']([^"']+)["'][^>]*>[\s\S]*?<(?:h2|div)\s+class=["'][^"']*sec-title[^"']*["'][^>]*>([\s\S]*?)<\/(?:h2|div)>/gi;
    let hMatch: RegExpExecArray | null;
    while ((hMatch = htmlH2Regex.exec(content)) !== null) {
      const secId = hMatch[1].trim();
      const rawTitle = hMatch[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      if (secId && rawTitle && !toc.some((t) => t.id === secId)) {
        toc.push({ id: secId, text: rawTitle, level: 2 });
      }
    }

    content = content.replace(
      /^(#{1,6})\s+(.*?)(?:\s+\{#([a-zA-Z0-9_-]+)\})?$/gm,
      (_m, hashes: string, text: string, customId?: string) => {
        const level = hashes.length;
        const cleanText = text.replace(/<[^>]+>/g, '').trim();
        const id =
          customId ||
          cleanText
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        if (id && cleanText && !toc.some((t) => t.id === id)) {
          toc.push({ id, text: cleanText, level });
        }
        return `<h${level} id="${id}" class="res-heading-${level}">${text}</h${level}>`;
      }
    );

    // GitHub-style Alerts > [!NOTE] ...
    content = content.replace(
      /^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|PEARL|KEY)\]\s*\r?\n([\s\S]*?)(?=\n\n|\n[^>]|$)/gm,
      (_m, type: string, alertBody: string) => {
        const cleanBody = alertBody.replace(/^>\s?/gm, '').trim();
        const typeLower = type.toLowerCase();
        return stashBlock(
          `<div class="res-callout res-callout-${typeLower}"><div class="res-callout-hdr">${type}</div><div class="res-callout-body">${cleanBody}</div></div>`
        );
      }
    );

    // Markdown tables
    content = content.replace(/((?:^\|.*?\|\r?\n)+)/gm, (tableMatch) => {
      const rows = tableMatch
        .trim()
        .split('\n')
        .filter((l) => l.trim().startsWith('|'));
      if (rows.length < 2) return tableMatch;

      let out = '<div class="table-responsive"><table class="res-md-table">';
      let isHeader = true;
      for (const row of rows) {
        if (/^\|[\s\-:|]+\|$/.test(row.trim())) continue;
        const cells = row
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        if (isHeader) {
          out += `<thead><tr>${cells.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>`;
          isHeader = false;
        } else {
          out += `<tr>${cells.map((c) => `<td>${c}</td>`).join('')}</tr>`;
        }
      }
      out += '</tbody></table></div>';
      return stashBlock(out);
    });

    // Inline markdown formatting outside tags
    content = content.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/`([^`]+)`/g, '<code class="res-inline-code">$1</code>');
    content = content.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="res-ext-link">$1</a>'
    );

    // Restore stashed blocks
    stash.forEach((htmlVal, placeholder) => {
      content = content.split(placeholder).join(htmlVal);
    });

    return {
      frontmatter,
      title,
      description,
      html: content,
      toc
    };
  }
}

export const sharedEbmMdxEngine = new SharedEbmMdxEngine();
