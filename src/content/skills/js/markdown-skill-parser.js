/**
 * Markdown Skill Parser Engine — CliniPortal (Vanilla JS)
 * Lightweight parser that converts Markdown procedure manuals (.md) into CliniPortal UI components.
 */

window.MarkdownSkillParser = (function() {
    'use strict';

    class Parser {
        static parseFrontmatter(markdownText) {
            const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
            const match = markdownText.match(frontmatterRegex);
            const metadata = {};
            let body = markdownText;

            if (match) {
                body = markdownText.replace(match[0], '');
                const yamlLines = match[1].split(/\r?\n/);
                yamlLines.forEach(line => {
                    const colonIdx = line.indexOf(':');
                    if (colonIdx !== -1) {
                        const key = line.slice(0, colonIdx).trim();
                        let val = line.slice(colonIdx + 1).trim();
                        // Clean quotes if present
                        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                            val = val.slice(1, -1);
                        }
                        metadata[key] = val;
                    }
                });
            }

            return { metadata, body };
        }

        static renderToHtml(markdownText) {
            const { metadata, body } = this.parseFrontmatter(markdownText);

            let html = '';

            // Render Header metadata if present
            if (metadata.title) {
                html += `
                    <div class="skill-header-meta">
                        <h2>${metadata.title}</h2>
                        <div class="skill-meta-tags">
                            ${metadata.category ? `<span class="badge badge-info">${metadata.category}</span>` : ''}
                            ${metadata.difficulty ? `<span class="badge badge-warning">Độ khó: ${metadata.difficulty}</span>` : ''}
                            ${metadata.estimatedTime ? `<span class="badge badge-secondary"><i class="fas fa-clock"></i> ${metadata.estimatedTime}</span>` : ''}
                        </div>
                    </div>
                `;
            }

            // Convert Markdown body to HTML elements
            let lines = body.split(/\r?\n/);
            let inList = false;

            lines.forEach(line => {
                let trimmed = line.trim();

                if (trimmed.startsWith('# ')) {
                    if (inList) { html += '</ul>'; inList = false; }
                    html += `<h2 class="skill-section-h2">${trimmed.replace('# ', '')}</h2>`;
                } else if (trimmed.startsWith('## ')) {
                    if (inList) { html += '</ul>'; inList = false; }
                    html += `<h3 class="skill-section-h3">${trimmed.replace('## ', '')}</h3>`;
                } else if (trimmed.startsWith('### ')) {
                    if (inList) { html += '</ul>'; inList = false; }
                    html += `<h4>${trimmed.replace('### ', '')}</h4>`;
                } else if (trimmed.startsWith('> [!WARNING]')) {
                    if (inList) { html += '</ul>'; inList = false; }
                    html += `<div class="skill-note note-warning"><i class="fas fa-exclamation-triangle"></i> `;
                } else if (trimmed.startsWith('> [!NOTE]') || trimmed.startsWith('> [!INFO]')) {
                    if (inList) { html += '</ul>'; inList = false; }
                    html += `<div class="skill-note note-info"><i class="fas fa-info-circle"></i> `;
                } else if (trimmed.startsWith('> ')) {
                    if (inList) { html += '</ul>'; inList = false; }
                    html += `${trimmed.replace('> ', '')}</div>`;
                } else if (/^\d+\.\s/.test(trimmed)) {
                    if (inList) { html += '</ul>'; inList = false; }
                    const content = trimmed.replace(/^\d+\.\s/, '');
                    html += `
                        <div class="step-item">
                            <div class="step-content">${this.inlineParse(content)}</div>
                        </div>
                    `;
                } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                    if (!inList) { html += '<ul class="skill-list">'; inList = true; }
                    html += `<li>${this.inlineParse(trimmed.slice(2))}</li>`;
                } else if (trimmed === '---') {
                    if (inList) { html += '</ul>'; inList = false; }
                    html += '<hr class="skill-divider">';
                } else if (trimmed.length > 0) {
                    if (inList) { html += '</ul>'; inList = false; }
                    html += `<p>${this.inlineParse(trimmed)}</p>`;
                }
            });

            if (inList) html += '</ul>';

            return html;
        }

        static inlineParse(text) {
            return text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`([^`]+)`/g, '<code>$1</code>');
        }
    }

    return Parser;
})();
