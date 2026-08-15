/**
 * CliniPortal — Physiology & Pathophysiology Article Reader SPA View (TypeScript)
 * Path: src/content/pathophysiology/physio-reader-view.ts
 */

export function renderPhysioReader(slug: string): string {
  // Determine if it's a CCBS case or Physiology lesson
  const isCcbs = slug.startsWith('slb-ccbs-') || !slug.includes('/');
  const backLink = isCcbs ? '#/pathophysiology/co-che-benh-sinh' : '#/pathophysiology/giai-phau-sinh-ly';
  const parentName = isCcbs ? 'Cơ Chế Bệnh Sinh (CCBS)' : 'Giải Phẫu & Sinh Lý';

  const cleanSlug = slug.endsWith('.html') ? slug : `${slug}.html`;
  const basePath = isCcbs 
    ? `src/content/pathophysiology/pathophysiology-cases/${cleanSlug}`
    : `src/content/pathophysiology/physiology/${cleanSlug}`;

  // Trigger async fetch after DOM renders
  setTimeout(() => {
    fetchArticleContent(basePath, slug);
  }, 50);

  return `
    <div class="physio-reader-container animate-fade-in" style="max-width: 1200px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b);">
          <a href="#/pathophysiology" style="color: var(--color-primary, #0284c7); text-decoration: none;">Cơ Sở Y Khoa</a> &nbsp;/&nbsp;
          <a href="${backLink}" style="color: var(--color-primary, #0284c7); text-decoration: none;">${parentName}</a> &nbsp;/&nbsp;
          <span style="color: var(--color-text, #0f172a); font-weight: 600;" id="reader-title-crumb">${slug}</span>
        </div>
        
        <div style="display: flex; gap: 0.5rem;">
          <a href="${backLink}" class="btn btn-outline" style="padding: 0.4rem 0.85rem; border-radius: 6px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.825rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Quay lại danh mục
          </a>
        </div>
      </div>

      <!-- Article Content Container -->
      <div id="physio-article-body" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 2rem; min-height: 400px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
        <div style="text-align: center; padding: 3rem 0; color: #64748b;">
          <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2rem; color: var(--color-primary, #0284c7); margin-bottom: 1rem;"></i>
          <p>Đang tải bài giảng y khoa...</p>
        </div>
      </div>
    </div>
  `;
}

async function fetchArticleContent(filePath: string, slug: string): Promise<void> {
  const container = document.getElementById('physio-article-body');
  if (!container) return;

  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const htmlText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    // Extract title
    const pageTitle = doc.querySelector('title')?.textContent || doc.querySelector('h1')?.textContent || slug;
    const crumb = document.getElementById('reader-title-crumb');
    if (crumb) crumb.textContent = pageTitle.replace('– CliniPortal', '').trim();
    document.title = `${pageTitle} – CliniPortal`;

    // Remove legacy header/footer/sidebar placeholders
    doc.querySelectorAll('#header-placeholder, #footer-placeholder, .sidebar, .sidebar-overlay, script, link[rel="stylesheet"]').forEach(el => el.remove());

    // Extract main content
    const mainContent = doc.querySelector('.app-container, .main-content, .content-container, main, body');
    if (mainContent) {
      container.innerHTML = mainContent.innerHTML;
    } else {
      container.innerHTML = htmlText;
    }
  } catch (err) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2.5rem; color: #dc2626;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
        <h3>Không thể tải bài học</h3>
        <p style="color: #64748b; font-size: 0.9rem;">Vui lòng kiểm tra lại kết nối hoặc quay lại danh sách bài giảng.</p>
        <a href="#/pathophysiology" class="btn btn-primary" style="margin-top: 1rem; display: inline-block; padding: 0.5rem 1rem; background: var(--color-primary, #0284c7); color: #fff; border-radius: 6px; text-decoration: none;">Về Hub Cơ Sở Y Khoa</a>
      </div>
    `;
  }
}
