/**
 * CliniPortal 2.0 — Tool View Component (Interactive HTML Tools & Calculators)
 * Render các công cụ lâm sàng tương tác (.html) trong iframe liền mạch kèm thanh Breadcrumb & điều hướng SPA.
 */

import { LoadedContent } from '../core/content-loader';
import { categoryCoreMapper } from '../core/category-mapper';

export function renderHtmlToolView(content: LoadedContent): string {
  const catInfo = categoryCoreMapper.getCategory(content.category);
  const categoryName = catInfo.name || content.category.toUpperCase();
  const catIcon = catInfo.icon || 'fa-folder-open';
  const title = content.metadata.title || content.slug.replace(/-/g, ' ').toUpperCase();
  const description = content.metadata.description || 'Công cụ tính toán và phác đồ tiếp cận lâm sàng tương tác.';

  const isInternalHash = content.path.startsWith('#/');
  const [pathPart, hashPart] = content.path.split('#');
  const separator = pathPart.includes('?') ? '&' : '?';
  const embedPath = isInternalHash ? content.path : `${pathPart}${separator}embedded=1${hashPart ? '#' + hashPart : ''}`;

  return `
    <div class="tool-view-wrapper" style="width: 100%; display: flex; flex-direction: column; gap: 1rem; padding-bottom: 2rem;">
      
      <!-- TOOL VIEW HEADER -->
      <header class="tool-view-header" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.5rem; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        
        <div class="tool-header-left" style="display: flex; flex-direction: column; gap: 0.25rem;">
          <div class="breadcrumb" style="font-size: 0.825rem; color: var(--color-text-muted, #64748b);">
            <a href="#/" style="color: inherit; text-decoration: none;">Trang chủ</a> &nbsp;/&nbsp; 
            <a href="#/${content.category}" style="color: inherit; text-decoration: none;">${categoryName}</a> &nbsp;/&nbsp; 
            <span style="color: var(--color-primary, #0284c7); font-weight: 600;">${title}</span>
          </div>
          <h1 style="font-size: 1.5rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid ${catIcon}" style="color: ${catInfo.color || 'var(--color-primary, #0284c7)'};"></i> ${title}
          </h1>
          ${description ? `<p style="font-size: 0.875rem; color: var(--color-text-muted, #64748b); margin: 0;">${description}</p>` : ''}
        </div>

        <div class="tool-header-actions" style="display: flex; align-items: center; gap: 0.75rem;">
          <a href="#/${content.category}" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; font-size: 0.875rem; border-radius: 0.5rem; text-decoration: none; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #0f172a); background: var(--color-surface, #fff);">
            <i class="fa-solid fa-arrow-left"></i> ${categoryName}
          </a>
          ${!isInternalHash ? `
          <a href="${content.path}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.5rem 0.85rem; font-size: 0.875rem; border-radius: 0.5rem; text-decoration: none; border: 1px solid var(--color-primary, #0284c7); color: var(--color-primary, #0284c7);" title="Mở trong cửa sổ mới">
            <i class="fa-solid fa-up-right-from-square"></i> Mở tab mới
          </a>
          ` : ''}
        </div>

      </header>

      <!-- TOOL IFRAME CONTAINER -->
      <div class="tool-iframe-container" style="width: 100%; height: 85vh; min-height: 720px; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); position: relative;">
        <iframe 
          src="${embedPath}" 
          class="tool-iframe" 
          title="${title}" 
          sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
          style="width: 100%; height: 100%; border: none; display: block; background: #fff;"
        ></iframe>
      </div>

    </div>
  `;
}
