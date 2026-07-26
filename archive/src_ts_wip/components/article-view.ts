/**
 * CliniPortal 2.0 — Article View Component (Markdown Reader)
 * Render bài viết y khoa động từ Markdown + Table of Contents (TOC) động.
 */

import { ArticleContent } from '../core/content-loader';
import { markdownCoreEngine } from '../core/markdown-engine';

export function renderArticleView(article: ArticleContent): string {
  const { html, toc } = markdownCoreEngine.parse(article.body);

  const title = article.metadata.title || article.slug.replace(/-/g, ' ').toUpperCase();
  const categoryTitle = article.category.toUpperCase();
  const author = article.metadata.author || 'Hội đồng Y khoa CliniPortal';
  const updatedDate = article.metadata.date || 'Cập nhật gần đây';

  const tocHtml = toc.length > 0
    ? toc.map(item => `<li class="toc-item level-${item.level}"><a href="#${item.id}">${item.text}</a></li>`).join('')
    : '<li><em>Không có mục lục</em></li>';

  return `
    <div class="article-reader-container" style="display: flex; gap: 2rem; width: 100%;">
      <!-- ARTICLE MAIN BODY -->
      <article class="article-body-wrapper" style="flex: 1; min-width: 0;">
        <header class="article-header" style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--color-border, #e2e8f0);">
          <div class="article-breadcrumb" style="font-size: 0.875rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.5rem;">
            <a href="#/" style="color: inherit;">Trang chủ</a> &nbsp;/&nbsp; 
            <a href="#/${article.category}" style="color: inherit;">${categoryTitle}</a> &nbsp;/&nbsp; 
            <span style="color: var(--color-primary, #0284c7);">${title}</span>
          </div>
          <h1 class="article-title" style="font-size: 2rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.75rem;">${title}</h1>
          <div class="article-meta" style="display: flex; gap: 1rem; font-size: 0.875rem; color: var(--color-text-muted, #64748b);">
            <span><i class="fa-solid fa-user-doctor"></i> ${author}</span>
            <span><i class="fa-regular fa-clock"></i> ${updatedDate}</span>
            <span><i class="fa-solid fa-folder"></i> ${categoryTitle}</span>
          </div>
        </header>

        <div class="article-content markdown-body">
          ${html}
        </div>
      </article>

      <!-- SIDEBAR TOC (MỤC LỤC BÀI VIẾT) -->
      <aside class="article-toc-sidebar" style="width: 260px; flex-shrink: 0;">
        <div class="toc-card" style="position: sticky; top: 1rem; padding: 1.25rem; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem;">
          <h4 style="font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted, #64748b); margin-bottom: 0.75rem;">
            <i class="fa-solid fa-list-ul"></i> Mục Lục Bài Viết
          </h4>
          <ul class="toc-list" style="list-style: none; padding: 0; margin: 0; font-size: 0.875rem; display: flex; flex-direction: column; gap: 0.5rem;">
            ${tocHtml}
          </ul>
        </div>
      </aside>
    </div>
  `;
}
