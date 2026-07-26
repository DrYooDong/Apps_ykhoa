/**
 * Markdown Renderer Engine — CliniPortal Utilities
 * Lightweight, zero-dependency client-side Markdown parser and HTML renderer.
 * 
 * Nâng cấp hỗ trợ:
 * - Parsing Frontmatter YAML (metadata tiêu đề, tác giả, chuyên khoa, ngày)
 * - Tự động sinh ID slug cho Headings (h1..h4) phục vụ Mục lục Động (TOC)
 * - Render Hình ảnh Y khoa (<figure> + <figcaption>)
 * - GitHub Alerts, Tables, Blockquotes, Code & Lists
 */

(function () {
    'use strict';

    function slugify(text) {
        if (!text) return '';
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-');
    }

    window.CliniMarkdown = {
        /**
         * Tách phần Frontmatter (YAML metadata ở đầu file .md) nếu có
         * @param {string} mdText 
         * @returns {{ metadata: Object, body: string }}
         */
        parseFrontmatter(mdText) {
            if (!mdText) return { metadata: {}, body: '' };

            const cleaned = mdText.replace(/\r\n/g, '\n');
            const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
            const match = cleaned.match(frontmatterRegex);

            if (!match) {
                return { metadata: {}, body: cleaned };
            }

            const yamlBlock = match[1];
            const body = cleaned.replace(frontmatterRegex, '');
            const metadata = {};

            yamlBlock.split('\n').forEach(line => {
                const parts = line.split(':');
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    let val = parts.slice(1).join(':').trim();
                    // Clean quotes
                    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                        val = val.slice(1, -1);
                    }
                    metadata[key] = val;
                }
            });

            return { metadata, body };
        },

        /**
         * Parse markdown string to HTML
         * @param {string} mdText 
         * @returns {string} HTML string
         */
        parse(mdText) {
            if (!mdText) return '';

            const { body } = this.parseFrontmatter(mdText);
            let html = body;

            // 1. Clean line endings
            html = html.replace(/\r\n/g, '\n');

            // 2. Images (![alt](url)) -> <figure><img ...><figcaption>alt</figcaption></figure>
            html = html.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, url) => {
                return `<figure class="md-figure"><img src="${url}" alt="${alt}" class="md-img" /><figcaption class="md-figcaption">${alt}</figcaption></figure>`;
            });

            // 3. Links ([text](url))
            html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="md-link" target="_blank" rel="noopener">$1</a>');

            // 4. Headings with Slug IDs for TOC Navigation
            const headingCounter = {};
            const createHeading = (level, text) => {
                let slug = slugify(text);
                if (!slug) slug = `heading-${level}`;
                if (headingCounter[slug]) {
                    headingCounter[slug]++;
                    slug = `${slug}-${headingCounter[slug]}`;
                } else {
                    headingCounter[slug] = 1;
                }
                return `<h${level} id="${slug}" class="md-h${level}">${text}</h${level}>`;
            };

            html = html.replace(/^#### (.*$)/gim, (_, text) => createHeading(4, text));
            html = html.replace(/^### (.*$)/gim, (_, text) => createHeading(3, text));
            html = html.replace(/^## (.*$)/gim, (_, text) => createHeading(2, text));
            html = html.replace(/^# (.*$)/gim, (_, text) => createHeading(1, text));

            // 5. GitHub style alert boxes (> [!NOTE], > [!WARNING], > [!IMPORTANT], > [!TIP], > [!CAUTION])
            html = html.replace(/^>\s*\[!NOTE\]\s*\n^>\s*(.*$)/gim, '<div class="md-alert md-alert-note"><i class="fa-solid fa-circle-info"></i> <div>$1</div></div>');
            html = html.replace(/^>\s*\[!WARNING\]\s*\n^>\s*(.*$)/gim, '<div class="md-alert md-alert-warning"><i class="fa-solid fa-triangle-exclamation"></i> <div>$1</div></div>');
            html = html.replace(/^>\s*\[!IMPORTANT\]\s*\n^>\s*(.*$)/gim, '<div class="md-alert md-alert-important"><i class="fa-solid fa-exclamation"></i> <div>$1</div></div>');
            html = html.replace(/^>\s*\[!TIP\]\s*\n^>\s*(.*$)/gim, '<div class="md-alert md-alert-tip"><i class="fa-solid fa-lightbulb"></i> <div>$1</div></div>');
            html = html.replace(/^>\s*\[!CAUTION\]\s*\n^>\s*(.*$)/gim, '<div class="md-alert md-alert-caution"><i class="fa-solid fa-shield-cat"></i> <div>$1</div></div>');

            // 6. Blockquotes (> text)
            html = html.replace(/^>\s*(.*$)/gim, '<blockquote class="md-blockquote">$1</blockquote>');

            // 7. Bold & Italic
            html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
            html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

            // 8. Inline Code (`code`)
            html = html.replace(/`(.*?)`/g, '<code class="md-inline-code">$1</code>');

            // 9. Tables Parsing (| header | header |\n|---|---|\n| cell | cell |)
            html = html.replace(/^\|(.+)\|\n\|[-|\s]+\|\n((?:\|.+\|\n?)+)/gm, (match, header, rows) => {
                const ths = header.split('|').filter(h => h.trim()).map(h => `<th>${h.trim()}</th>`).join('');
                const trs = rows.trim().split('\n').map(row => {
                    const tds = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
                    return `<tr>${tds}</tr>`;
                }).join('');
                return `<div class="md-table-wrapper"><table class="md-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
            });

            // 10. Unordered lists (- item or * item)
            html = html.replace(/^\s*[-*]\s+(.*$)/gim, '<li class="md-li">$1</li>');
            html = html.replace(/(<li class="md-li">.*<\/li>\n?)+/g, '<ul class="md-ul">$&</ul>');

            // 11. Ordered lists (1. item)
            html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="md-oli">$1</li>');
            html = html.replace(/(<li class="md-oli">.*<\/li>\n?)+/g, '<ol class="md-ol">$&</ol>');

            // 12. Horizontal rules (---)
            html = html.replace(/^---$/gim, '<hr class="md-hr">');

            // 13. Paragraphs
            const paragraphs = html.split(/\n\n+/);
            html = paragraphs.map(p => {
                p = p.trim();
                if (!p) return '';
                if (p.startsWith('<h') || p.startsWith('<div') || p.startsWith('<table') || p.startsWith('<ul') || p.startsWith('<ol') || p.startsWith('<blockquote') || p.startsWith('<hr') || p.startsWith('<figure')) {
                    return p;
                }
                return `<p class="md-p">${p.replace(/\n/g, '<br>')}</p>`;
            }).join('\n');

            return `<div class="md-rendered-body">${html}</div>`;
        },

        /**
         * Fetch .md file from URL and render into container
         * @param {string} url - Path to .md file
         * @param {string|HTMLElement} container - Selector or DOM element
         * @returns {Promise<{ metadata: Object, html: string }>}
         */
        async renderFromFile(url, container) {
            const targetEl = typeof container === 'string' ? document.querySelector(container) : container;

            if (targetEl) {
                targetEl.innerHTML = '<div class="md-loading"><i class="fa-solid fa-spinner fa-spin"></i> Đang tải bài viết...</div>';
            }

            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
                const text = await res.text();
                const { metadata } = this.parseFrontmatter(text);
                const html = this.parse(text);

                if (targetEl) {
                    targetEl.innerHTML = html;
                }

                return { metadata, html };
            } catch (err) {
                if (targetEl) {
                    targetEl.innerHTML = `<div class="md-alert md-alert-warning"><i class="fa-solid fa-triangle-exclamation"></i> Không thể nạp file bài viết (.md): ${err.message}</div>`;
                }
                throw err;
            }
        }
    };
})();
