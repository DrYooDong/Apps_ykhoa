/**
 * CliniPortal 2.0 — SPA Entry Point & Core Framework Engine
 * Khởi tạo SPA Router, Content Engine, Search Engine và Mount động vào <main id="app"></main>
 */

import './styles/main.css';
import './styles/components/bottom-nav.css';
import './content/docspace/styles/docspace.css';
import './content/knowledge-vault/css/vault-hub.css';
import { 
  renderVaultHubView, 
  attachVaultEvents, 
  openArticleDrawer, 
  setVaultInitialState 
} from './content/knowledge-vault/vault-hub-view';

// Core Subsystems & UI Modules
import './main';
import './core/category-mapper';
import './data/clinical-cheatsheets-data';
import './components/footer';
import './core/pulse';
import './knowledge/evidence-bridge';
import './simulators/smart-recommender';
import './components/clinical-heatmap';
import './tools/good-day-calculator';
import './effects/premium-interactions';
import { initHomepageWidgets } from './dashboard/homepage-widgets';
import { initHomepageEffects } from './dashboard/homepage-effects';
import './core/toc';
import './core/mui-port';

import { storageCore } from './core/storage';
import { markdownCoreEngine } from './core/markdown-engine';
import { clinicalCoreEngine } from './core/clinical-engine';
import { categoryCoreMapper } from './core/category-mapper';
import { router, CliniRouter } from './core/router';
import { searchEngine, CliniSearchEngine } from './core/search-engine';
import { contentLoaderEngine, ContentLoaderEngine } from './core/content-loader';
import * as components from './components';
import { clinicalNonIntrusiveUX } from './components/non-intrusive-ux';
import { clinicalProvenance } from './content/ebm/provenance';
import { initHeaderModals } from './components/header-modals';
import { initDocSpaceRoutes } from './content/docspace/index';

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
 * Đồng bộ trạng thái active của Mobile Bottom Navigation Bar với Hash URL hiện tại (Phương án B: khớp 1:1 với src/content)
 */
function syncBottomNavActiveState(): void {
  const rawHash = window.location.hash || '#/';
  const clean = rawHash.replace(/^#\/?/, '').trim();
  const firstSeg = clean.split('/')[0] || '';

  document.querySelectorAll<HTMLElement>('.bottom-nav-item').forEach(item => {
    const route = item.getAttribute('data-nav-route') || '';
    let isMatch = false;

    if (route === 'home' && (clean === '' || clean === '/')) {
      isMatch = true;
    } else if (route === 'basic' && (firstSeg === 'basic-medical' || firstSeg === 'pathophysiology')) {
      isMatch = true;
    } else if (route === 'ebm' && (firstSeg === 'ebm' || firstSeg === 'guidelines')) {
      isMatch = true;
    } else if (route === 'docspace' && firstSeg === 'docspace') {
      isMatch = true;
    } else if (route === 'vault' && (firstSeg === 'knowledge-vault' || firstSeg === 'vault')) {
      isMatch = true;
    }

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
  const dock = document.querySelector('.floating-action-dock') as HTMLElement;

  const rawHash = window.location.hash || '#/';
  const cleanHash = rawHash.replace(/^#/, '').trim();
  const isHomePage = cleanHash === '' || cleanHash === '/' || cleanHash === '#';

  if (isHomePage) {
    if (mainContent) mainContent.style.display = '';
    if (dock) dock.style.display = '';
    document.body.classList.remove('dsp-active');
    document.body.classList.remove('guidelines-active');
    if (appContainer) {
      appContainer.style.display = 'none';
      appContainer.innerHTML = '';
    }
    initHomepageWidgets();
    initHomepageEffects();
  } else {
    if (mainContent) mainContent.style.display = 'none';
    if (dock) dock.style.display = 'none';
    if (cleanHash.startsWith('/docspace') || cleanHash.startsWith('docspace')) {
      document.body.classList.add('dsp-active');
    } else {
      document.body.classList.remove('dsp-active');
    }

    if (cleanHash.startsWith('/ebm/guidelines') || cleanHash.startsWith('/ebm/kho-guidelines') || cleanHash.startsWith('ebm/guidelines') || cleanHash.startsWith('ebm/kho-guidelines')) {
      document.body.classList.add('guidelines-active');
    } else {
      document.body.classList.remove('guidelines-active');
    }
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

import { 
  renderEbmView, 
  initEbmHub,
  renderGuidelinesView,
  initGuidelinesHub,
  renderJournalQualityView,
  renderRadarView,
  initGuidelineRadar,
  renderEbmLabView,
  initEbmLabEngine,
  renderForestPlotView,
  renderFunnelPlotView,
  renderKaplanMeierView,
  renderRocCurveView,
  renderStatisticsHubView,
  renderStatisticsReader,
  renderGuidelineReader,
  renderStudyAnalyzerView,
  initStudyAnalyzerController
} from './content/ebm';

import { 
  renderPathophysiologyView, 
  initPathophysiologyHub,
  renderGiaiPhauSinhLyView,
  renderCoCheBenhSinhView,
  renderBiochemistryView,
  initBiochemistryView,
  renderEpidemiologyView,
  initEpidemiologyView,
  renderEpidemiologyToolView,
  initEpidemiologyToolsView,
  renderFormulaVaultView,
  renderPhysioReader,
  renderPhysioHtmlReader,
  renderPhysiologySimulatorsView,
  initPhysiologySimulators,
  renderMetabolicNavigatorView,
  initMetabolicNavigator,
  renderPathoQuizView,
  initPathoQuizView
} from './content/basic-medical';

/**
 * Đăng ký các SPA Routes chính
 */
function initializeRoutes(): void {
  // 1. Route Trang Chủ Dashboard (#/ hoặc rỗng)
  router.register('/', 'Trang Chủ', () => {
    mountToApp(components.renderHomeView());
  });

  // 2. Native SPA Routes cho 7 Phân Hệ Y Khoa Cốt Lõi (100% Native Components, No Iframe)
  router.register('/ebm', 'Y học Chứng cứ (EBM)', () => {
    document.title = 'Y học Chứng cứ (EBM) – CliniPortal';
    mountToApp(renderEbmView());
    initEbmHub();
  });

  // === EBM SUB-ROUTES (Native SPA Components) ===
  router.register('/ebm/kho-guidelines', 'Kho Guidelines & Nghiên Cứu', () => {
    document.title = 'Kho Guidelines & Nghiên Cứu Lâm Sàng – CliniPortal';
    mountToApp(renderGuidelinesView());
    initGuidelinesHub();
  });
  router.register('/ebm/guidelines', 'Kho Guidelines & Nghiên Cứu', () => {
    document.title = 'Kho Guidelines & Nghiên Cứu Lâm Sàng – CliniPortal';
    mountToApp(renderGuidelinesView());
    initGuidelinesHub();
  });
  router.register('/ebm/kho-guidelines/:slug', 'Chi Tiết Guideline Lâm Sàng', (params) => {
    const slug = params.slug || '';
    mountToApp(renderGuidelineReader(slug));
  });
  router.register('/ebm/guidelines/reader/:slug', 'Chi Tiết Guideline Lâm Sàng', (params) => {
    const slug = params.slug || '';
    mountToApp(renderGuidelineReader(slug));
  });
  router.register('/ebm/journal-quality', 'Đánh Giá Chất Lượng Tạp Chí', () => {
    document.title = 'Đánh Giá Tạp Chí Y Khoa (Journal QA) – CliniPortal';
    mountToApp(renderJournalQualityView());
  });
  router.register('/ebm/study-analyzer', 'Phân Tích Nghiên Cứu EBM', () => {
    document.title = 'EBM Study Deep Analyzer & Appraisal Suite – CliniPortal';
    mountToApp(renderStudyAnalyzerView());
    initStudyAnalyzerController();
  });
  router.register('/ebm/radar', 'Guideline Radar Diff Viewer', () => {
    document.title = 'Guideline Radar Diff Viewer – CliniPortal';
    mountToApp(renderRadarView());
    initGuidelineRadar();
  });
  router.register('/ebm/guideline-radar', 'Guideline Radar Diff Viewer', () => {
    document.title = 'Guideline Radar Diff Viewer – CliniPortal';
    mountToApp(renderRadarView());
    initGuidelineRadar();
  });
  router.register('/ebm/lab', 'EBM Practice Lab', () => {
    document.title = 'EBM Practice Lab – CliniPortal';
    mountToApp(renderEbmLabView('nnt'));
    initEbmLabEngine('nnt');
  });
  router.register('/ebm/ebm-lab', 'EBM Practice Lab', () => {
    document.title = 'EBM Practice Lab – CliniPortal';
    mountToApp(renderEbmLabView('nnt'));
    initEbmLabEngine('nnt');
  });
  router.register('/ebm/forest-plot', 'Forest Plot Visualizer', () => {
    document.title = 'Forest Plot Visualizer – CliniPortal';
    mountToApp(renderForestPlotView());
  });
  router.register('/ebm/funnel-plot', 'Funnel Plot Visualizer', () => {
    document.title = 'Funnel Plot Visualizer – CliniPortal';
    mountToApp(renderFunnelPlotView());
  });
  router.register('/ebm/kaplan-meier', 'Kaplan-Meier Survival Curve', () => {
    document.title = 'Kaplan-Meier Survival Curve – CliniPortal';
    mountToApp(renderKaplanMeierView());
  });
  router.register('/ebm/roc-curve', 'ROC Curve & AUC Analyzer', () => {
    document.title = 'ROC Curve & AUC Analyzer – CliniPortal';
    mountToApp(renderRocCurveView());
  });
  router.register('/ebm/thong-ke-y-hoc', 'Thống Kê Y Học & NCKH', () => {
    document.title = 'Thống Kê Y Học & Thiết Kế NCKH – CliniPortal';
    mountToApp(renderStatisticsHubView());
  });
  router.register('/ebm/medical-statistics', 'Thống Kê Y Học & NCKH', () => {
    document.title = 'Thống Kê Y Học & Thiết Kế NCKH – CliniPortal';
    mountToApp(renderStatisticsHubView());
  });
  router.register('/ebm/thong-ke-y-hoc/:slug', 'Bài Học Thống Kê Y Học', (params) => {
    const slug = params.slug || '';
    mountToApp(renderStatisticsReader(slug));
  });
  router.register('/ebm/medical-statistics/:slug', 'Bài Học Thống Kê Y Học', (params) => {
    const slug = params.slug || '';
    mountToApp(renderStatisticsReader(slug));
  });

  // === KNOWLEDGE VAULT ROUTES (Kho Kiến Thức Y Khoa) ===
  const handleVaultRoute = (articleParam?: string) => {
    document.title = 'Kho Kiến Thức Y Khoa (Knowledge Vault) – CliniPortal';
    
    // Extract query parameters from URL or hash
    const rawHash = window.location.hash || '';
    const hashQuery = rawHash.includes('?') ? rawHash.split('?')[1] : '';
    const hashParams = new URLSearchParams(hashQuery);
    const searchParams = new URLSearchParams(window.location.search);
    
    const search = hashParams.get('search') || searchParams.get('search') || '';
    const kho = hashParams.get('kho') || searchParams.get('kho') || undefined;
    const group = hashParams.get('group') || searchParams.get('group') || undefined;
    const specialty = hashParams.get('specialty') || searchParams.get('specialty') || undefined;
    const protocolId = hashParams.get('protocol') || searchParams.get('protocol') || undefined;
    const targetArticle = articleParam || hashParams.get('article') || hashParams.get('id') || searchParams.get('article') || searchParams.get('id');

    setVaultInitialState({
      search: search || undefined,
      kho,
      group,
      specialty,
      protocolId
    });

    mountToApp(renderVaultHubView());
    const appContainer = document.getElementById('app');
    if (appContainer) {
      attachVaultEvents(appContainer);
      if (targetArticle && !protocolId) {
        setTimeout(() => openArticleDrawer(targetArticle), 250);
      }
    }
  };

  router.register('/vault', 'Kho Kiến Thức Y Khoa (Knowledge Vault)', () => {
    handleVaultRoute();
  });
  router.register('/vault/:articleId', 'Kho Kiến Thức Y Khoa (Knowledge Vault)', (params) => {
    handleVaultRoute(params.articleId);
  });
  router.register('/knowledge-vault', 'Kho Kiến Thức Y Khoa (Knowledge Vault)', () => {
    handleVaultRoute();
  });
  router.register('/knowledge-vault/:articleId', 'Kho Kiến Thức Y Khoa (Knowledge Vault)', (params) => {
    handleVaultRoute(params.articleId);
  });
  router.register('/docspace/vault', 'Kho Kiến Thức Y Khoa (Knowledge Vault)', () => {
    handleVaultRoute();
  });

  // === CLINICAL PROTOCOLS VAULT ROUTES ===
  router.register('/protocols', 'Kho Phác Đồ Điều Trị (Clinical Protocols)', () => {
    document.title = 'Kho Phác Đồ Điều Trị – CliniPortal';
    setVaultInitialState({ group: 'PROTOCOL' });
    mountToApp(renderVaultHubView());
    const appContainer = document.getElementById('app');
    if (appContainer) attachVaultEvents(appContainer);
  });
  router.register('/protocols/:protocolId', 'Chi Tiết Phác Đồ Điều Trị', (params) => {
    document.title = 'Chi Tiết Phác Đồ Điều Trị – CliniPortal';
    setVaultInitialState({ group: 'PROTOCOL', protocolId: params.protocolId });
    mountToApp(renderVaultHubView());
    const appContainer = document.getElementById('app');
    if (appContainer) attachVaultEvents(appContainer);
  });
  router.register('/vault/protocols', 'Kho Phác Đồ Điều Trị (Clinical Protocols)', () => {
    document.title = 'Kho Phác Đồ Điều Trị – CliniPortal';
    setVaultInitialState({ group: 'PROTOCOL' });
    mountToApp(renderVaultHubView());
    const appContainer = document.getElementById('app');
    if (appContainer) attachVaultEvents(appContainer);
  });
  router.register('/vault/protocols/:protocolId', 'Chi Tiết Phác Đồ Điều Trị', (params) => {
    document.title = 'Chi Tiết Phác Đồ Điều Trị – CliniPortal';
    setVaultInitialState({ group: 'PROTOCOL', protocolId: params.protocolId });
    mountToApp(renderVaultHubView());
    const appContainer = document.getElementById('app');
    if (appContainer) attachVaultEvents(appContainer);
  });


  // === CONSOLIDATED DOCSPACE REDIRECTS (Kỹ năng, Tiếp cận, Công cụ, Dược lý -> DocSpace) ===
  const legacyPrefixes = ['/skills', '/calculators', '/pharmacology', '/approaches'];
  legacyPrefixes.forEach(prefix => {
    router.register(prefix, 'DocSpace — Không Gian Lâm Sàng Tích Hợp', () => {
      window.location.hash = '#/docspace';
    });
  });


  // === BASIC MEDICAL SCIENCES ROUTES (Primary & Backwards Compatible Aliases) ===
  const registerBasicMedicalRoutes = (prefix: string) => {
    router.register(`/${prefix}`, 'Basic Medical Sciences (GP - SL - CCBS - HS - DT)', () => {
      document.title = 'Basic Medical Sciences – CliniPortal';
      mountToApp(renderPathophysiologyView('all'));
      initPathophysiologyHub();
    });

    router.register(`/${prefix}/giai-phau-sinh-ly`, 'Giải phẫu & Sinh lý học', () => {
      document.title = 'Giải phẫu & Sinh lý – CliniPortal';
      mountToApp(renderGiaiPhauSinhLyView());
      initPathophysiologyHub();
    });

    router.register(`/${prefix}/co-che-benh-sinh`, 'Cơ chế bệnh sinh & Sinh lý bệnh', () => {
      document.title = 'Cơ chế bệnh sinh – CliniPortal';
      mountToApp(renderCoCheBenhSinhView());
      initPathophysiologyHub();
    });

    router.register(`/${prefix}/hoa-sinh`, 'Hóa sinh Y học & Chuyển hóa', () => {
      document.title = 'Hóa sinh Y học – CliniPortal';
      mountToApp(renderBiochemistryView());
      initBiochemistryView();
    });

    router.register(`/${prefix}/biochemistry`, 'Hóa sinh Y học & Chuyển hóa', () => {
      document.title = 'Hóa sinh Y học – CliniPortal';
      mountToApp(renderBiochemistryView());
      initBiochemistryView();
    });

    router.register(`/${prefix}/dich-te-hoc`, 'Dịch Tễ Học & Y Tế Công Cộng', () => {
      document.title = 'Dịch Tễ Học Y Khoa – CliniPortal';
      mountToApp(renderEpidemiologyView());
      initEpidemiologyView();
    });

    router.register(`/${prefix}/epidemiology`, 'Dịch Tễ Học & Y Tế Công Cộng', () => {
      document.title = 'Dịch Tễ Học Y Khoa – CliniPortal';
      mountToApp(renderEpidemiologyView());
      initEpidemiologyView();
    });

    // === EPIDEMIOLOGY TOOLS & ARTICLES SUB-ROUTES ===
    const EPI_KNOWN_TOOLS = ['matrix-solver', 'epicurve', 'study-designs', 'bradford-hill'];

    router.register(`/${prefix}/epidemiology/:toolOrSlug`, 'Dịch Tễ Học Y Khoa', (params) => {
      const toolOrSlug = params.toolOrSlug || 'matrix-solver';
      if (EPI_KNOWN_TOOLS.includes(toolOrSlug)) {
        document.title = 'Công Cụ Dịch Tễ Học – CliniPortal';
        mountToApp(renderEpidemiologyToolView(toolOrSlug as any));
        initEpidemiologyToolsView(toolOrSlug as any);
      } else {
        document.title = 'Bài Giảng Dịch Tễ Học – CliniPortal';
        mountToApp(renderPhysioHtmlReader('epidemiology', toolOrSlug));
      }
    });

    router.register(`/${prefix}/dich-te-hoc/:toolOrSlug`, 'Dịch Tễ Học Y Khoa', (params) => {
      const toolOrSlug = params.toolOrSlug || 'matrix-solver';
      if (EPI_KNOWN_TOOLS.includes(toolOrSlug)) {
        document.title = 'Công Cụ Dịch Tễ Học – CliniPortal';
        mountToApp(renderEpidemiologyToolView(toolOrSlug as any));
        initEpidemiologyToolsView(toolOrSlug as any);
      } else {
        document.title = 'Bài Giảng Dịch Tễ Học – CliniPortal';
        mountToApp(renderPhysioHtmlReader('epidemiology', toolOrSlug));
      }
    });

    router.register(`/${prefix}/formula-vault`, 'Kho Công thức Sinh lý', () => {
      document.title = 'Kho Công thức Sinh lý – CliniPortal';
      mountToApp(renderFormulaVaultView());
    });

    router.register(`/${prefix}/simulators`, 'Mô Phỏng Sinh Lý Tương Tác', () => {
      document.title = 'Phòng Thí Nghiệm Mô Phỏng Sinh Lý – CliniPortal';
      mountToApp(renderPhysiologySimulatorsView('nernst'));
      initPhysiologySimulators();
    });

    router.register(`/${prefix}/metabolic-map`, 'Bản Đồ Chuyển Hóa Tương Tác', () => {
      document.title = 'Bản Đồ Chuyển Hóa & Hóa Sinh – CliniPortal';
      mountToApp(renderMetabolicNavigatorView('glycolysis'));
      initMetabolicNavigator();
    });

    router.register(`/${prefix}/quiz`, 'Luyện Tập Ca Lâm Sàng & Flashcards Cơ Chế', () => {
      document.title = 'Luyện Tập Cơ Chế Bệnh Sinh & Flashcards – CliniPortal';
      mountToApp(renderPathoQuizView('cases'));
      initPathoQuizView();
    });

    router.register(`/${prefix}/reader/:slug`, 'Bài Giảng Sinh Lý Học', (params) => {
      const slug = params.slug || '';
      mountToApp(renderPhysioReader(slug));
    });

    router.register(`/${prefix}/reader/:part/:slug`, 'Bài Giảng Sinh Lý Học', (params) => {
      const part = params.part || '';
      const slug = params.slug || '';
      mountToApp(renderPhysioReader(`${part}/${slug}`));
    });

    router.register(`/${prefix}/physiology/:part/:slug`, 'Bài Giảng Giải Phẫu & Sinh Lý', (params) => {
      const part = params.part || 'part1';
      const slug = params.slug || '';
      mountToApp(renderPhysioHtmlReader(part, slug));
    });

    router.register(`/${prefix}/biochemistry/:block/:slug`, 'Bài Giảng Hóa Sinh Y Học', (params) => {
      const block = params.block || 'block1-biomolecules';
      const slug = params.slug || '';
      mountToApp(renderPhysioHtmlReader(block, slug));
    });

    router.register(`/${prefix}/cases/:slug`, 'Cơ Chế Bệnh Sinh Lâm Sàng', (params) => {
      const slug = params.slug || '';
      mountToApp(renderPhysioHtmlReader('cases', slug));
    });

    router.register(`/${prefix}/co-che-benh-sinh/:slug`, 'Cơ Chế Bệnh Sinh Lâm Sàng', (params) => {
      const slug = params.slug || '';
      mountToApp(renderPhysioHtmlReader('cases', slug));
    });

    router.register(`/${prefix}/epidemiology/article/:slug`, 'Bài Giảng Dịch Tễ Học', (params) => {
      const slug = params.slug || '';
      mountToApp(renderPhysioHtmlReader('epidemiology', slug));
    });

    router.register(`/${prefix}/dich-te-hoc/article/:slug`, 'Bài Giảng Dịch Tễ Học', (params) => {
      const slug = params.slug || '';
      mountToApp(renderPhysioHtmlReader('epidemiology', slug));
    });
  };

  registerBasicMedicalRoutes('basic-medical');
  registerBasicMedicalRoutes('pathophysiology');

  router.register('/biochemistry', 'Hóa sinh Y học & Chuyển hóa', () => {
    document.title = 'Hóa sinh Y học – CliniPortal';
    mountToApp(renderBiochemistryView());
    initBiochemistryView();
  });

  router.register('/epidemiology', 'Dịch Tễ Học & Y Tế Công Cộng', () => {
    document.title = 'Dịch Tễ Học Y Khoa – CliniPortal';
    mountToApp(renderEpidemiologyView());
    initEpidemiologyView();
  });

  router.register('/dich-te-hoc', 'Dịch Tễ Học & Y Tế Công Cộng', () => {
    document.title = 'Dịch Tễ Học Y Khoa – CliniPortal';
    mountToApp(renderEpidemiologyView());
    initEpidemiologyView();
  });

  // 2.3. Tự động chuyển hướng các phân hệ cũ (TCM, Calculators, Pharmacology...) về DocSpace
  router.register('/tcm', 'Y học Cổ truyền', () => {
    window.location.hash = '#/docspace';
  });
  router.register('/tcm/:subroute', 'Y học Cổ truyền', () => {
    window.location.hash = '#/docspace';
  });

  // 3. Route Hub Danh Mục Phụ / Fallback (#/:category)
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
function initCliniPortal(): void {
  // IMPORTANT: DocSpace specific routes must be registered BEFORE wildcard routes (/:category, /:category/:slug)
  initDocSpaceRoutes();
  initializeRoutes();
  router.init();
  setupGlobalQuickSearch();
  syncSidebarActiveState();
  syncBottomNavActiveState();
  initHeaderModals();

  window.addEventListener('hashchange', () => {
    syncSidebarActiveState();
    syncBottomNavActiveState();
  });

  // Khởi tạo hệ thống Non-Intrusive UX (Focus Mode, Slide Drawer, Toast) và EBM Provenance
  clinicalNonIntrusiveUX.init();
  clinicalProvenance.init();

  // Nạp chỉ mục tìm kiếm offline cho 7 phân hệ y khoa
  searchEngine.initAllIndexes().then(() => {
    console.log('✅ CliniPortal 2.0 SPA Content Index Ready.');
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCliniPortal);
  } else {
    initCliniPortal();
  }
}

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

