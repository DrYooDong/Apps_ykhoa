/**
 * Markdown Renderer Engine — CliniPortal Utilities
 * Lightweight, zero-dependency client-side Markdown parser and HTML renderer.
 * Converts markdown documents (.md) into styled HTML elements with tables, alerts, blockquotes, and code blocks.
 */

window.CliniMarkdown = {
    /**
     * Parse markdown string to HTML
     * @param {string} mdText 
     * @returns {string} HTML string
     */
    parse(mdText) {
        if (!mdText) return '';

        let html = mdText;

        // Clean up Windows line endings (\r\n -> \n)
        html = html.replace(/\r\n/g, '\n');

        // Headers (# H1, ## H2, ### H3, #### H4)
        html = html.replace(/^#### (.*$)/gim, '<h4 class="md-h4">$1</h4>');
        html = html.replace(/^### (.*$)/gim, '<h3 class="md-h3">$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2 class="md-h2">$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1 class="md-h1">$1</h1>');

        // GitHub style alert boxes (> [!NOTE], > [!WARNING], > [!IMPORTANT], > [!TIP], > [!CAUTION])
        html = html.replace(/^>\s*\[!NOTE\]\s*\n^>\s*(.*$)/gim, '<div class="md-alert md-alert-note"><i class="fa-solid fa-circle-info"></i> <div>$1</div></div>');
        html = html.replace(/^>\s*\[!WARNING\]\s*\n^>\s*(.*$)/gim, '<div class="md-alert md-alert-warning"><i class="fa-solid fa-triangle-exclamation"></i> <div>$1</div></div>');
        html = html.replace(/^>\s*\[!IMPORTANT\]\s*\n^>\s*(.*$)/gim, '<div class="md-alert md-alert-important"><i class="fa-solid fa-exclamation"></i> <div>$1</div></div>');
        html = html.replace(/^>\s*\[!TIP\]\s*\n^>\s*(.*$)/gim, '<div class="md-alert md-alert-tip"><i class="fa-solid fa-lightbulb"></i> <div>$1</div></div>');
        html = html.replace(/^>\s*\[!CAUTION\]\s*\n^>\s*(.*$)/gim, '<div class="md-alert md-alert-caution"><i class="fa-solid fa-shield-cat"></i> <div>$1</div></div>');

        // Standard Blockquotes (> text)
        html = html.replace(/^>\s*(.*$)/gim, '<blockquote class="md-blockquote">$1</blockquote>');

        // Bold & Italic
        html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Inline Code (`code`)
        html = html.replace(/`(.*?)`/g, '<code class="md-inline-code">$1</code>');

        // Tables Parsing (| header | header |\n|---|---|\n| cell | cell |)
        html = html.replace(/^\|(.+)\|\n\|[-|\s]+\|\n((?:\|.+\|\n?)+)/gm, (match, header, rows) => {
            const ths = header.split('|').filter(h => h.trim()).map(h => `<th>${h.trim()}</th>`).join('');
            const trs = rows.trim().split('\n').map(row => {
                const tds = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
                return `<tr>${tds}</tr>`;
            }).join('');
            return `<div class="md-table-wrapper"><table class="md-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
        });

        // Unordered lists (- item or * item)
        html = html.replace(/^\s*[-*]\s+(.*$)/gim, '<li class="md-li">$1</li>');
        html = html.replace(/(<li class="md-li">.*<\/li>\n?)+/g, '<ul class="md-ul">$&</ul>');

        // Ordered lists (1. item)
        html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="md-oli">$1</li>');
        html = html.replace(/(<li class="md-oli">.*<\/li>\n?)+/g, '<ol class="md-ol">$&</ol>');

        // Horizontal rules (---)
        html = html.replace(/^---$/gim, '<hr class="md-hr">');

        // Paragraphs (double newlines)
        const paragraphs = html.split(/\n\n+/);
        html = paragraphs.map(p => {
            p = p.trim();
            if (!p) return '';
            if (p.startsWith('<h') || p.startsWith('<div') || p.startsWith('<table') || p.startsWith('<ul') || p.startsWith('<ol') || p.startsWith('<blockquote') || p.startsWith('<hr')) {
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
     */
    async renderFromFile(url, container) {
        const targetEl = typeof container === 'string' ? document.querySelector(container) : container;
        if (!targetEl) return;

        targetEl.innerHTML = '<div class="md-loading"><i class="fa-solid fa-spinner fa-spin"></i> Đang nạp tài liệu hướng dẫn...</div>';

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
            const text = await res.text();
            targetEl.innerHTML = this.parse(text);
        } catch (err) {
            targetEl.innerHTML = `<div class="md-alert md-alert-warning"><i class="fa-solid fa-triangle-exclamation"></i> Không thể nạp file hướng dẫn (.md): ${err.message}</div>`;
        }
    }
};
