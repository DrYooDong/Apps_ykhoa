/* ============================================================
   CLINIPORTAL — EBM FORMAT LOADER & ENGINE (VANILLA JS)
   Location: src/content/ebm/js/ebm-format-loader.js
   Supports: JSON Schemas, Markdown (.md), CSV Data, BibTeX/RIS Citations, SVG Diagrams
   Offline Dual-Mode: Fetch API + Embedded Fallback Storage
============================================================ */

window.EBMFormatLoader = (function () {
  'use strict';

  // Fallback cache for local offline execution when fetch is blocked by file:/// CORS
  const fallbackStorage = {
    json: {},
    markdown: {},
    csv: {}
  };

  /**
   * Register embedded fallback data for offline execution
   */
  function registerFallback(type, key, data) {
    if (fallbackStorage[type]) {
      fallbackStorage[type][key] = data;
    }
  }

  /**
   * Universal Data Loader with file:/// protocol fallback
   */
  async function fetchOrFallback(url, type = 'json', fallbackKey = null) {
    const key = fallbackKey || url.split('/').pop().replace(/\.[^/.]+$/, '');
    
    // Attempt fetch
    try {
      if (window.location.protocol !== 'file:') {
        const response = await fetch(url);
        if (response.ok) {
          if (type === 'json') return await response.json();
          if (type === 'text' || type === 'md' || type === 'csv') return await response.text();
        }
      }
    } catch (e) {
      console.warn(`[EBMFormatLoader] Fetch unavailable for ${url}, switching to embedded fallback.`, e);
    }

    // Fallback lookup
    if (type === 'json' && fallbackStorage.json[key]) return fallbackStorage.json[key];
    if ((type === 'md' || type === 'text') && fallbackStorage.markdown[key]) return fallbackStorage.markdown[key];
    if (type === 'csv' && fallbackStorage.csv[key]) return fallbackStorage.csv[key];

    return null;
  }

  /**
   * Lightweight Markdown Parser with Frontmatter extraction
   */
  function parseMarkdown(mdText) {
    if (!mdText) return { meta: {}, contentHtml: '' };

    let meta = {};
    let content = mdText;

    // Check for YAML Frontmatter (between --- and ---)
    if (mdText.startsWith('---')) {
      const parts = mdText.split(/^---$/m);
      if (parts.length >= 3) {
        const yamlBlock = parts[1].trim();
        content = parts.slice(2).join('---').trim();

        yamlBlock.split('\n').forEach(line => {
          const colonIdx = line.indexOf(':');
          if (colonIdx !== -1) {
            const key = line.slice(0, colonIdx).trim();
            let value = line.slice(colonIdx + 1).trim();
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
              value = value.slice(1, -1);
            }
            meta[key] = value;
          }
        });
      }
    }

    // Simple, safe Markdown to HTML converter
    let html = content
      // Headings
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote class="ebm-quote">$1</blockquote>')
      // Bold & Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code tags
      .replace(/`(.*?)`/g, '<code class="ebm-code">$1</code>')
      // Lists
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    // Wrap list items
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');

    return {
      meta: meta,
      contentHtml: `<p>${html}</p>`
    };
  }

  /**
   * Lightweight CSV Parser
   */
  function parseCSV(csvText) {
    if (!csvText) return [];
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const obj = {};
      headers.forEach((header, index) => {
        const val = values[index] !== undefined ? values[index] : '';
        obj[header] = isNaN(val) ? val : parseFloat(val);
      });
      rows.push(obj);
    }
    return rows;
  }

  /**
   * Citation Generator (Vancouver, APA, BibTeX, RIS)
   */
  function generateCitation(study) {
    if (!study) return null;
    const author = study.organization || "Medical Trial Group";
    const year = study.year || new Date().getFullYear();
    const title = study.title || "Clinical Study";
    const journal = study.phase || "Medical Journal";
    const doi = study.doi || "10.1000/cliniportal.ebm";

    return {
      vancouver: `${author}. ${title}. ${journal}. ${year}. DOI: ${doi}`,
      apa: `${author}. (${year}). ${title}. ${journal}. https://doi.org/${doi}`,
      bibtex: `@article{study_${study.id || 'ebm'},\n  author = {${author}},\n  title = {${title}},\n  journal = {${journal}},\n  year = {${year}},\n  doi = {${doi}}\n}`,
      ris: `TY  - JOUR\nAU  - ${author}\nTI  - ${title}\nJO  - ${journal}\nPY  - ${year}\nDO  - ${doi}\nER  -`
    };
  }

  /**
   * Copy Citation to Clipboard
   */
  function copyCitation(text, formatName = "Citation") {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert(`Đã sao chép định dạng ${formatName} vào bộ nhớ tạm!`);
      }).catch(err => {
        console.error("Lỗi khi sao chép:", err);
      });
    }
  }

  return {
    registerFallback: registerFallback,
    fetchOrFallback: fetchOrFallback,
    parseMarkdown: parseMarkdown,
    parseCSV: parseCSV,
    generateCitation: generateCitation,
    copyCitation: copyCitation
  };
})();

