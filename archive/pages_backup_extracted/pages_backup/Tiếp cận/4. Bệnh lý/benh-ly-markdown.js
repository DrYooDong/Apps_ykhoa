/**
 * ════════════════════════════════════════════════════════════════════════════
 *  MARKDOWN EVIDENCE READER ENGINE — PATHOLOGY MODULE (CLINIPORTAL)
 *  Bộ đọc & hiển thị tài liệu Markdown YHC chuẩn y khoa
 * ════════════════════════════════════════════════════════════════════════════
 */

class PathologyMarkdownViewer {
    static parseMarkdown(mdText) {
        if (!mdText) return '';

        let html = mdText;

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3 class="md-h3">$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2 class="md-h2">$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1 class="md-h1">$1</h1>');

        // Blockquotes / Alerts
        html = html.replace(/^> (.*$)/gim, '<blockquote class="md-blockquote">$1</blockquote>');

        // Bold & Italic
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Lists
        html = html.replace(/^\s*-\s+(.*$)/gim, '<li class="md-li">$1</li>');
        html = html.replace(/(<li class="md-li">.*<\/li>)/gims, '<ul class="md-ul">$1</ul>');

        // Clean up duplicate uls
        html = html.replace(/<\/ul>\s*<ul class="md-ul">/g, '');

        // Horizontal rules
        html = html.replace(/^---$/gim, '<hr class="md-hr">');

        // Paragraphs
        html = html.split('\n\n').map(p => {
            if (p.trim().startsWith('<h') || p.trim().startsWith('<block') || p.trim().startsWith('<ul') || p.trim().startsWith('<hr')) {
                return p;
            }
            return `<p class="md-p">${p.trim()}</p>`;
        }).join('\n');

        return html;
    }

    static async fetchAndShowMarkdown(filePath, modalTitle = 'Tài liệu Y học Chứng cứ') {
        const modal = document.getElementById('markdown-view-modal');
        const titleEl = document.getElementById('md-modal-title');
        const bodyEl = document.getElementById('md-modal-body');

        if (!modal || !bodyEl) return;

        if (titleEl) titleEl.textContent = modalTitle;
        bodyEl.innerHTML = '<div class="md-loading"><i class="fa-solid fa-spinner fa-spin"></i> Đang nạp tài liệu YHC...</div>';
        modal.classList.add('active');

        try {
            const resp = await fetch(filePath);
            if (!resp.ok) throw new Error(`Không tìm thấy file ${filePath}`);
            const text = await resp.text();
            bodyEl.innerHTML = this.parseMarkdown(text);
        } catch (err) {
            bodyEl.innerHTML = `<div class="md-error-box"><i class="fa-solid fa-triangle-exclamation"></i> Lỗi: ${err.message}</div>`;
        }
    }

    static closeModal() {
        const modal = document.getElementById('markdown-view-modal');
        if (modal) modal.classList.remove('active');
    }
}

window.PathologyMarkdownViewer = PathologyMarkdownViewer;
