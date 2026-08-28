/**
 * CliniPortal 2.0 — Article View Component (Markdown & MDX Reader)
 * Render bài viết y khoa động từ Markdown + Table of Contents (TOC) động + Runtime tương tác.
 */

import { ArticleContent } from '../core/content-loader';
import { markdownCoreEngine } from '../core/markdown-engine';
import { mdxInteractiveRuntime } from '../core/mdx-interactive-runtime';

export function renderArticleView(article: ArticleContent): string {
  const { html, toc } = markdownCoreEngine.parse(article.body);

  const title = article.metadata.title || article.slug.replace(/-/g, ' ').toUpperCase();
  const categoryTitle = article.category.toUpperCase();
  const author = article.metadata.author || 'Hội đồng Y khoa CliniPortal';
  const updatedDate = article.metadata.date || 'Cập nhật gần đây';

  const tocHtml =
    toc.length > 0
      ? toc.map((item) => `<li class="toc-item level-${item.level}"><a href="#${item.id}">${item.text}</a></li>`).join('')
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
          <h1 class="article-title" style="font-size: 2rem; font-weight: 800; color: var(--color-text, #0f172a); margin-bottom: 0.75rem; letter-spacing: -0.02em;">${title}</h1>
          <div class="article-meta" style="display: flex; gap: 1.25rem; font-size: 0.875rem; color: var(--color-text-muted, #64748b); flex-wrap: wrap;">
            <span><i class="fa-solid fa-user-doctor" style="color: var(--color-primary, #0284c7);"></i> ${author}</span>
            <span><i class="fa-regular fa-clock"></i> ${updatedDate}</span>
            <span><i class="fa-solid fa-folder" style="color: #7c3aed;"></i> ${categoryTitle}</span>
          </div>
        </header>

        <div class="article-content markdown-body mdx-content-root">
          ${html}
        </div>
      </article>

      <!-- SIDEBAR TOC (MỤC LỤC BÀI VIẾT) -->
      <aside class="article-toc-sidebar" style="width: 280px; flex-shrink: 0;">
        <div class="toc-card" style="position: sticky; top: 1.5rem; padding: 1.25rem; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.85rem; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
          <h4 style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted, #64748b); margin-bottom: 0.85rem; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-list-ul" style="color: var(--color-primary, #0284c7);"></i> Mục Lục Bài Viết
          </h4>
          <ul class="toc-list" style="list-style: none; padding: 0; margin: 0; font-size: 0.875rem; display: flex; flex-direction: column; gap: 0.5rem;">
            ${tocHtml}
          </ul>
        </div>
      </aside>
    </div>
  `;
}

/**
 * Kích hoạt các tính năng tương tác (Auto Blueprint, Responsive Table, Progress Bar, Active TOC)
 * sau khi chèn HTML của article vào DOM.
 */
export function initArticleViewRuntime(container: HTMLElement = document.body): void {
  const root = container.querySelector<HTMLElement>('.mdx-content-root') || container;
  mdxInteractiveRuntime.mount(root);
}
