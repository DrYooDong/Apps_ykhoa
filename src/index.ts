/**
 * CliniPortal 2.0 — SPA Entry Point & Core Framework Engine
 * Khởi tạo SPA Router, Content Engine, Search Engine và Mount động vào <main id="app"></main>
 */

import './styles/main.css';
import './docspace/styles/docspace.css';

import { storageCore } from './core/storage';
import { markdownCoreEngine } from './core/markdown-engine';
import { clinicalCoreEngine } from './core/clinical-engine';
import { categoryCoreMapper } from './core/category-mapper';
import { router, CliniRouter } from './core/router';
import { searchEngine, CliniSearchEngine } from './core/search-engine';
import { contentLoaderEngine, ContentLoaderEngine } from './core/content-loader';
import * as components from './components';
import { initDocSpaceRoutes } from './docspace/index';

export interface CliniPortalCore {
  version: string;
  isOffline: boolean;
  storage: typeof storageCore;
  markdown: typeof markdownCoreEngine;
  clinical: typeof clinicalCoreEngine;
  categories: typeof categoryCoreMapper;
  router: CliniRouter;
  searchEngine: CliniSearchEngine;
  contentLoader: ContentLoaderEngine;
  components: typeof components;
}

declare global {
  interface Window {
    CliniPortalCore?: CliniPortalCore;
    CliniStorage?: any;
    ClinicalCalculatorEngine?: any;
    CliniMarkdown?: any;
    ArticleReaderEngine?: any;
    CliniCategoryMapper?: any;
  }
}

/**
 * Đồng bộ trạng thái active của Sidebar với Hash URL hiện tại
 */
function syncSidebarActiveState(): void {
  const hash = window.location.hash.slice(1) || '/';
  const category = hash.split('/')[1] || '';

  document.querySelectorAll<HTMLElement>('#appSidebar .nav-item').forEach(item => {
    const itemPath = item.getAttribute('data-path');
    const isMatch = (category === '' && itemPath === '') || (category !== '' && itemPath === category);
    if (isMatch) {
      item.classList.add('active');
      item.setAttribute('aria-current', 'page');
    } else {
      item.classList.remove('active');
      item.removeAttribute('aria-current');
    }
  });
}

/**
 * Hàm hỗ trợ mount HTML vào container #app
 * Tự động chuyển đổi giữa trang chủ Dashboard (#mainContent) và SPA View (#app)
 */
function mountToApp(html: string): void {
  const appContainer = document.getElementById('app');
  const mainContent = document.getElementById('mainContent');

  const rawHash = window.location.hash || '#/';
  const cleanHash = rawHash.replace(/^#/, '').trim();
  const isHomePage = cleanHash === '' || cleanHash === '/' || cleanHash === '#';

  if (isHomePage) {
    if (mainContent) mainContent.style.display = '';
    if (appContainer) {
      appContainer.style.display = 'none';
      appContainer.innerHTML = '';
    }
  } else {
    if (mainContent) mainContent.style.display = 'none';
    if (appContainer) {
      appContainer.style.display = 'block';
      appContainer.innerHTML = html;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.error('[CliniPortal] Container element #app not found in DOM.');
    }
  }
}

/**
 * Cấu hình sự kiện lọc thẻ card ngay trên trang chuyên khoa
 */
function setupCategoryFilter(): void {
  const input = document.getElementById('category-filter-input') as HTMLInputElement;
  if (!input) return;

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    const cards = document.querySelectorAll<HTMLElement>('.category-card-item');
    const sections = document.querySelectorAll<HTMLElement>('.category-subgroup-section');

    cards.forEach(card => {
      const title = card.getAttribute('data-title') || '';
      const desc = card.getAttribute('data-desc') || '';
      const sub = card.getAttribute('data-sub') || '';
      const match = !query || title.includes(query) || desc.includes(query) || sub.includes(query);
      card.style.display = match ? 'flex' : 'none';
    });

    sections.forEach(section => {
      const visibleCards = section.querySelectorAll('.category-card-item[style*="display: flex"], .category-card-item:not([style*="display: none"])');
      section.style.display = visibleCards.length > 0 ? 'block' : 'none';
    });
  });
}

/**
 * Đăng ký các SPA Routes chính
 */
function initializeRoutes(): void {
  // 1. Route Trang Chủ Dashboard (#/ hoặc rỗng)
  router.register('/', 'Trang Chủ', () => {
    mountToApp(components.renderHomeView());
  });

  // 2. Route Hub Danh Mục (#/:category)
  router.register('/:category', 'Phân Hệ Y Khoa', async (params) => {
    const category = params.category || '';
    const html = await components.renderCategoryView(category);
    mountToApp(html);
    setupCategoryFilter();
  });

  // 3. Route Bài Viết / Công Cụ Chi Tiết (#/:category/:slug)
  router.register('/:category/:slug', 'Bài Viết Y Khoa', async (params) => {
    const category = params.category || '';
    const slug = params.slug || '';

    // Nạp bài viết hoặc công cụ HTML
    const loadedItem = await contentLoaderEngine.loadItem(category, slug);

    if (loadedItem) {
      document.title = `${loadedItem.metadata.title || slug} – CliniPortal`;
      if (loadedItem.isHtml) {
        mountToApp(components.renderHtmlToolView(loadedItem));
      } else {
        mountToApp(components.renderArticleView(loadedItem));
      }
    } else {
      // 404 Fallback View
      mountToApp(`
        <div class="error-404-container" style="text-align: center; padding: 4rem 1rem;">
          <div style="font-size: 4rem; color: var(--color-primary, #0284c7); margin-bottom: 1rem;"><i class="fa-solid fa-file-circle-xmark"></i></div>
          <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem;">Nội dung chưa tồn tại</h2>
          <p style="color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">Không tìm thấy bài viết hoặc công cụ tại đường dẫn <code>#/${category}/${slug}</code>.</p>
          <a href="#/" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.2rem; background: var(--color-primary, #0284c7); color: #fff; border-radius: 0.5rem; text-decoration: none;">
            <i class="fa-solid fa-house"></i> Về Trang Chủ
          </a>
        </div>
      `);
    }
  });

  // 4. Router Fallback (khi hash không khớp bất kỳ pattern nào)
  router.setFallback((hashPath) => {
    mountToApp(`
      <div class="error-404-container" style="text-align: center; padding: 4rem 1rem;">
        <div style="font-size: 4rem; color: var(--color-warning, #f59e0b); margin-bottom: 1rem;"><i class="fa-solid fa-compass"></i></div>
        <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem;">Đường dẫn không hợp lệ</h2>
        <p style="color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">Hash path <code>#${hashPath}</code> không tồn tại trên hệ thống.</p>
        <a href="#/" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.2rem; background: var(--color-primary, #0284c7); color: #fff; border-radius: 0.5rem; text-decoration: none;">
          <i class="fa-solid fa-house"></i> Về Trang Chủ
        </a>
      </div>
    `);
  });
}

/**
 * Tích hợp tìm kiếm nhanh toàn cục trên thanh Header
 */
function setupGlobalQuickSearch(): void {
  const searchInput = document.querySelector('.search-bar-container .input') as HTMLInputElement;
  const dropdown = document.getElementById('searchResultsDropdown');

  if (!searchInput || !dropdown) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query.length === 0) {
      dropdown.style.display = 'none';
      dropdown.innerHTML = '';
      return;
    }

    const results = searchEngine.search(query, 12);
    if (results.length === 0) {
      dropdown.style.display = 'block';
      dropdown.innerHTML = `
        <div style="padding: 1rem; text-align: center; color: var(--color-text-muted, #64748b); font-size: 0.875rem;">
          Không tìm thấy công cụ hay phác đồ nào khớp với <strong>"${query}"</strong>.
        </div>
      `;
      return;
    }

    dropdown.style.display = 'block';
    dropdown.innerHTML = results.map(r => {
      const badgeBg = 'var(--color-surface-offset, #f1f5f9)';
      const badgeColor = 'var(--color-primary, #0284c7)';
      return `
        <a href="${r.doc.url}" class="search-result-item" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; text-decoration: none; color: inherit; border-bottom: 1px solid var(--color-border, #e2e8f0); transition: background 0.15s;">
          <div>
            <div style="font-weight: 600; font-size: 0.925rem; color: var(--color-text, #0f172a); margin-bottom: 0.2rem;">${r.doc.title}</div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">${r.doc.contentSnippet || r.doc.category}</div>
          </div>
          <span style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; padding: 0.2rem 0.5rem; border-radius: 0.25rem; background: ${badgeBg}; color: ${badgeColor};">
            ${r.doc.category}
          </span>
        </a>
      `;
    }).join('');

    dropdown.querySelectorAll('a.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        dropdown.style.display = 'none';
        searchInput.value = '';
      });
    });
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target as Node) && !dropdown.contains(e.target as Node)) {
      dropdown.style.display = 'none';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes((document.activeElement?.tagName || ''))) {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape' && dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
      searchInput.blur();
    }
  });

  const cmdTrigger = document.getElementById('cmdPaletteTrigger');
  if (cmdTrigger) {
    cmdTrigger.addEventListener('click', () => {
      searchInput.focus();
    });
  }
}

// Global Core Info & Module Registry
window.CliniPortalCore = {
  version: '2.0.0',
  isOffline: true,
  storage: storageCore,
  markdown: markdownCoreEngine,
  clinical: clinicalCoreEngine,
  categories: categoryCoreMapper,
  router,
  searchEngine,
  contentLoader: contentLoaderEngine,
  components
};

// Bootup SPA Routes & Indexes
// IMPORTANT: DocSpace specific routes must be registered BEFORE wildcard routes (/:category, /:category/:slug)
initDocSpaceRoutes();
initializeRoutes();
router.init();
setupGlobalQuickSearch();

// Nạp chỉ mục tìm kiếm offline cho 7 phân hệ y khoa
searchEngine.initAllIndexes().then(() => {
  console.log('✅ CliniPortal 2.0 SPA Content Index Ready.');
});

export {
  storageCore as storage,
  markdownCoreEngine as markdown,
  clinicalCoreEngine as clinical,
  categoryCoreMapper as categories,
  router,
  searchEngine,
  contentLoaderEngine as contentLoader,
  components
};

console.log('🚀 CliniPortal 2.0 SPA Engine & Dynamic Router Initialized Successfully.');

