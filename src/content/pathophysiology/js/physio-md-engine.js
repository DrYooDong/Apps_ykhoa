/**
 * CliniPortal Physiology - Universal Vanilla JS Markdown Engine
 * Parses Markdown + YAML Frontmatter + Custom Medical Callout Blocks
 * Fully offline-first (file:// compatible)
 */

window.PhysioMDEngine = (function () {
    'use strict';

    /**
     * Parse YAML Frontmatter from raw text
     */
    function parseFrontmatter(text) {
        const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
        const match = text.match(frontmatterRegex);

        let metadata = {};
        let body = text;

        if (match) {
            const rawYaml = match[1];
            body = text.slice(match[0].length);

            rawYaml.split('\n').forEach(line => {
                const colonIdx = line.indexOf(':');
                if (colonIdx > 0) {
                    const key = line.slice(0, colonIdx).trim();
                    let val = line.slice(colonIdx + 1).trim();

                    // Parse arrays [item1, item2]
                    if (val.startsWith('[') && val.endsWith(']')) {
                        val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
                    } else if (val === 'true') {
                        val = true;
                    } else if (val === 'false') {
                        val = false;
                    } else {
                        val = val.replace(/^['"]|['"]$/g, '');
                    }
                    metadata[key] = val;
                }
            });
        }

        return { metadata, body };
    }

    /**
     * Parse Custom Blocks (:::clinical-pearl, :::physio-steps, :::formula-card, :::warning-box)
     */
    function parseCustomBlocks(text) {
        // :::clinical-pearl ... :::
        text = text.replace(/:::clinical-pearl\r?\n([\s\S]*?)\r?\n:::/g, function (m, content) {
            return `<div class="clinical-pearl">${renderSimpleMarkdown(content)}</div>`;
        });

        // :::physio-steps ... :::
        text = text.replace(/:::physio-steps\r?\n([\s\S]*?)\r?\n:::/g, function (m, content) {
            const items = content.split(/\r?\n(?=\d+\.\s)/);
            let html = '<ol class="physio-steps">';
            items.forEach(item => {
                if (item.trim()) {
                    const cleanItem = item.replace(/^\d+\.\s*/, '').trim();
                    html += `<li><div class="physio-step-card">${renderSimpleMarkdown(cleanItem)}</div></li>`;
                }
            });
            html += '</ol>';
            return html;
        });

        // :::formula-card ... :::
        text = text.replace(/:::formula-card\r?\n([\s\S]*?)\r?\n:::/g, function (m, content) {
            return `<div class="formula-card physio-step-card">${renderSimpleMarkdown(content)}</div>`;
        });

        return text;
    }

    /**
     * Convert markdown tables to styled responsive HTML tables
     */
    function parseTables(text) {
        const tableRegex = /((?:\|[^\n]+\|\r?\n)+)/g;

        return text.replace(tableRegex, function (match) {
            const lines = match.trim().split(/\r?\n/);
            if (lines.length < 2) return match;

            let html = '<div class="table-responsive"><table class="physio-table physio-table-compare"><thead><tr>';

            // Headers
            const headers = lines[0].split('|').slice(1, -1).map(h => h.trim());
            headers.forEach(h => {
                html += `<th>${renderInline(h)}</th>`;
            });
            html += '</tr></thead><tbody>';

            // Rows (skip index 1 separator line)
            for (let i = 2; i < lines.length; i++) {
                const cells = lines[i].split('|').slice(1, -1).map(c => c.trim());
                if (cells.length > 0) {
                    html += '<tr>';
                    cells.forEach((cell, idx) => {
                        html += `<td>${idx === 0 ? '<strong>' + renderInline(cell) + '</strong>' : renderInline(cell)}</td>`;
                    });
                    html += '</tr>';
                }
            }

            html += '</tbody></table></div>';
            return html;
        });
    }

    /**
     * Inline Markdown Parser (Bold, Italic, Code, Math, Links)
     */
    function renderInline(str) {
        if (!str) return '';
        return str
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    }

    /**
     * Render Simple Markdown
     */
    function renderSimpleMarkdown(md) {
        let text = parseTables(md);
        text = parseCustomBlocks(text);

        const paragraphs = text.split(/\r?\n\r?\n/);
        return paragraphs.map(p => {
            p = p.trim();
            if (!p) return '';
            if (p.startsWith('<div') || p.startsWith('<ol') || p.startsWith('<table')) return p;
            if (p.startsWith('#')) {
                const level = p.match(/^#+/)[0].length;
                const titleText = p.replace(/^#+\s*/, '');
                const id = titleText.toLowerCase().replace(/[^\w\u00C0-\u024F]+/g, '-');
                return `<h${level} id="${id}" class="${level === 2 ? 'section-title' : 'subsection-title'}">${renderInline(titleText)}</h${level}>`;
            }
            return `<p>${renderInline(p)}</p>`;
        }).join('\n');
    }

    /**
     * Load Article Markdown File
     */
    async function loadArticle(path) {
        try {
            const resp = await fetch(path);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const text = await resp.text();
            return parseFrontmatter(text);
        } catch (err) {
            console.error('PhysioMDEngine error loading file:', err);
            // Fallback for file:// or offline fetch errors
            return new Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', path, true);
                xhr.onload = function () {
                    if (xhr.status === 200 || xhr.status === 0) {
                        resolve(parseFrontmatter(xhr.responseText));
                    } else {
                        resolve({ metadata: { title: "Lỗi tải bài viết" }, body: "Không thể tải tệp Markdown." });
                    }
                };
                xhr.onerror = function () {
                    resolve({ metadata: { title: "Lỗi kết nối offline" }, body: "Không tìm thấy tệp." });
                };
                xhr.send();
            });
        }
    }

    return {
        parseFrontmatter: parseFrontmatter,
        renderMarkdown: renderSimpleMarkdown,
        loadArticle: loadArticle
    };
})();
