/**
 * CliniPortal 2.0 — SPA Entry Point & Core Framework Engine
 * Khởi tạo SPA Router, Content Engine, Search Engine và Mount động vào <main id="app"></main>
 */

import './styles/main.css';
import './content/docspace/styles/docspace.css';

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
import './dashboard/homepage-widgets';
import './dashboard/homepage-effects';
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
    if (appContainer) {
      appContainer.style.display = 'none';
      appContainer.innerHTML = '';
    }
  } else {
    if (mainContent) mainContent.style.display = 'none';
    if (dock) dock.style.display = 'none';
    if (cleanHash.startsWith('/docspace') || cleanHash.startsWith('docspace')) {
      document.body.classList.add('dsp-active');
    } else {
      document.body.classList.remove('dsp-active');
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
  renderEbmLabView,
  renderForestPlotView,
  renderFunnelPlotView,
  renderKaplanMeierView,
  renderRocCurveView,
  renderStatisticsHubView
} from './content/ebm';
import { 
  renderSkillsView, 
  initSkillsHub,
  renderOsceRandomizerView,
  renderVirtualPatientView,
  renderEcgStudioView,
  renderAuscultationView,
  renderSkillsNavigatorView,
  renderSkillReaderView
} from './content/skills';
import { 
  renderCalculatorsView, 
  initCalculatorsHub,
  renderGeneralToolsView,
  renderCardiologyToolsView,
  renderEmergencyToolsView,
  renderGastroToolsView,
  renderRenalToolsView,
  renderRespiratoryToolsView,
  renderInfectiousToolsView,
  renderEndocrinologyToolsView,
  renderHematologyToolsView,
  renderNeurologyToolsView
} from './content/calculators';
import { 
  renderPharmacologyView, 
  initPharmacologyHub,
  renderDrugSearchView,
  renderInteractionMatrixView,
  renderDoseOptimizerView,
  renderPkSimulatorView,
  renderSymptomPharmaView
} from './content/pharmacology';
import { 
  renderApproachesView, 
  initApproachesHub, 
  renderPediatricsView,
  renderCapCuuView,
  renderParaclinicalView,
  renderSymptomsView,
  renderBenhLyView,
  renderPharmacologyApproachesView
} from './content/approaches';
import { 
  renderPathophysiologyView, 
  initPathophysiologyHub,
  renderGiaiPhauSinhLyView,
  renderCoCheBenhSinhView,
  renderFormulaVaultView,
  renderPhysioReader
} from './content/pathophysiology';
import { 
  renderTcmView, 
  initTcmHub,
  renderMeridianAcupointsView,
  renderHerbsFormulasView,
  renderTcmDiagnosticsView,
  renderNguHanhStudioView,
  renderIntegrativeBridgeView
} from './content/tcm';

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
  router.register('/ebm/journal-quality', 'Đánh Giá Chất Lượng Tạp Chí', () => {
    document.title = 'Đánh Giá Tạp Chí Y Khoa (Journal QA) – CliniPortal';
    mountToApp(renderJournalQualityView());
  });
  router.register('/ebm/guideline-radar', 'Guideline Radar Diff Viewer', () => {
    document.title = 'Guideline Radar Diff Viewer – CliniPortal';
    mountToApp(renderRadarView());
  });
  router.register('/ebm/ebm-lab', 'EBM Practice Lab', () => {
    document.title = 'EBM Practice Lab – CliniPortal';
    mountToApp(renderEbmLabView());
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

  router.register('/skills', 'Kỹ năng Lâm sàng & OSCE', () => {
    document.title = 'Kỹ năng Lâm sàng & OSCE – CliniPortal';
    mountToApp(renderSkillsView());
    initSkillsHub();
  });

  router.register('/skills/osce-randomizer', 'OSCE Randomizer', () => {
    document.title = 'OSCE Station Randomizer – CliniPortal';
    mountToApp(renderOsceRandomizerView());
  });

  router.register('/skills/benh-nhan-ao', 'Bệnh Nhân Ảo & ICU Simulator', () => {
    document.title = 'Bệnh Nhân Ảo & ICU Simulator – CliniPortal';
    mountToApp(renderVirtualPatientView());
  });

  router.register('/skills/ecg-studio', 'Đọc ECG Tương Tác', () => {
    document.title = 'Interactive ECG Studio – CliniPortal';
    mountToApp(renderEcgStudioView());
  });

  router.register('/skills/auscultation', 'Thính Chẩn Tim - Phổi', () => {
    document.title = 'Thính Chẩn Tim - Phổi – CliniPortal';
    mountToApp(renderAuscultationView());
  });

  router.register('/skills/kham-lam-sang', 'Khám Lâm Sàng Hệ Cơ Quan', () => {
    document.title = 'Khám Lâm Sàng Hệ Cơ Quan – CliniPortal';
    mountToApp(renderSkillsNavigatorView('kham-lam-sang'));
  });

  router.register('/skills/hoi-suc', 'Hồi Sức Cấp Cứu', () => {
    document.title = 'Kỹ Năng Hồi Sức Cấp Cứu – CliniPortal';
    mountToApp(renderSkillsNavigatorView('hoi-suc'));
  });

  router.register('/skills/thu-thuat', 'Thủ Thuật Lâm Sàng', () => {
    document.title = 'Thủ Thuật Lâm Sàng Xâm Lấn – CliniPortal';
    mountToApp(renderSkillsNavigatorView('thu-thuat'));
  });

  router.register('/skills/can-lam-sang', 'Đọc Kết Quả Cận Lâm Sàng', () => {
    document.title = 'Đọc Kết Quả Cận Lâm Sàng – CliniPortal';
    mountToApp(renderSkillsNavigatorView('can-lam-sang'));
  });

  router.register('/skills/benh-an', 'Làm Bệnh Án & Giao Tiếp', () => {
    document.title = 'Làm Bệnh Án & Giao Tiếp SBAR – CliniPortal';
    mountToApp(renderSkillsNavigatorView('benh-an'));
  });

  router.register('/skills/reader/:slug', 'Quy Trình Kỹ Năng', (params) => {
    const slug = params.slug || '';
    mountToApp(renderSkillReaderView(slug));
  });

  router.register('/skills/reader/:sub/:slug', 'Quy Trình Kỹ Năng', (params) => {
    const sub = params.sub || '';
    const slug = params.slug || '';
    mountToApp(renderSkillReaderView(`${sub}/${slug}`));
  });

  router.register('/skills/reader/:sub/:folder/:slug', 'Quy Trình Kỹ Năng', (params) => {
    const sub = params.sub || '';
    const folder = params.folder || '';
    const slug = params.slug || '';
    mountToApp(renderSkillReaderView(`${sub}/${folder}/${slug}`));
  });

  router.register('/calculators', 'Công cụ & Thang điểm', () => {
    document.title = 'Công cụ Lâm sàng & Thang điểm – CliniPortal';
    mountToApp(renderCalculatorsView());
    initCalculatorsHub();
  });

  // === CALCULATORS SUB-ROUTES (Native SPA Components) ===
  // General
  router.register('/calculators/benh-an-noi-khoa', 'Mẫu Bệnh Án Nội Khoa', () => {
    document.title = 'Mẫu Bệnh Án Nội Khoa – CliniPortal';
    mountToApp(renderGeneralToolsView('benh-an'));
  });
  router.register('/calculators/tra-cuu-icd10', 'Tra Cứu Mã ICD-10 & BHYT', () => {
    document.title = 'Tra Cứu ICD-10 – CliniPortal';
    mountToApp(renderGeneralToolsView('icd10'));
  });
  router.register('/calculators/tinh-co-mau', 'Tính Cỡ Mẫu Nghiên Cứu', () => {
    document.title = 'Tính Cỡ Mẫu NCKH – CliniPortal';
    mountToApp(renderGeneralToolsView('tinh-co-mau'));
  });
  router.register('/calculators/quy-doi-lieu', 'Quy Đổi Liều Tương Đương', () => {
    document.title = 'Quy Đổi Liều Thuốc – CliniPortal';
    mountToApp(renderGeneralToolsView('quy-doi-lieu'));
  });
  router.register('/calculators/kho-cong-thuc-sinh-ly', 'Kho Công Thức Sinh Lý', () => {
    document.title = 'Kho Công Thức Sinh Lý – CliniPortal';
    mountToApp(renderGeneralToolsView('formula-vault'));
  });

  // Cardiology
  router.register('/calculators/ptnc-tim-mach', 'Phân Tầng Nguy Cơ Tim Mạch SCORE2', () => {
    document.title = 'Phân Tầng Tim Mạch (SCORE2) – CliniPortal';
    mountToApp(renderCardiologyToolsView('ptnc-tim-mach'));
  });
  router.register('/calculators/dg-ldlc', 'Mục Tiêu LDL-C (ESC/VNHA)', () => {
    document.title = 'Đánh Giá Mục Tiêu LDL-C – CliniPortal';
    mountToApp(renderCardiologyToolsView('dg-ldlc'));
  });
  router.register('/calculators/dg-suy-tim', 'Đánh Giá & Phân Loại Suy Tim', () => {
    document.title = 'Đánh Giá Suy Tim – CliniPortal';
    mountToApp(renderCardiologyToolsView('dg-suy-tim'));
  });
  router.register('/calculators/vte-toolkit', 'VTE Toolkit (Wells DVT & PE)', () => {
    document.title = 'VTE Toolkit – CliniPortal';
    mountToApp(renderCardiologyToolsView('vte-toolkit'));
  });
  router.register('/calculators/phan-loai-roi-loan-nhip', 'Arrhythmia Pro Studio', () => {
    document.title = 'Arrhythmia Pro Studio – CliniPortal';
    mountToApp(renderCardiologyToolsView('phan-loai-roi-loan-nhip'));
  });

  // Emergency & ICU
  router.register('/calculators/an-than-icu', 'An Thần ICU (RASS / CPOT)', () => {
    document.title = 'An Thần ICU – CliniPortal';
    mountToApp(renderEmergencyToolsView('an-than-icu'));
  });
  router.register('/calculators/van-mach-tro-tim', 'Vận Mạch & Huyết Động Cấp Cứu', () => {
    document.title = 'Quản Lý Vận Mạch – CliniPortal';
    mountToApp(renderEmergencyToolsView('van-mach'));
  });
  router.register('/calculators/bu-dich', 'Fluid Resuscitation Studio', () => {
    document.title = 'Bù Dịch Hồi Sức – CliniPortal';
    mountToApp(renderEmergencyToolsView('bu-dich'));
  });
  router.register('/calculators/quan-ly-may-tho', 'Ventilator Pro Studio', () => {
    document.title = 'Máy Thở ICU – CliniPortal';
    mountToApp(renderEmergencyToolsView('may-tho'));
  });
  router.register('/calculators/acls-resus-studio', 'ACLS Resuscitation Pro Studio', () => {
    document.title = 'ACLS Cấp Cứu Ngừng Tim – CliniPortal';
    mountToApp(renderEmergencyToolsView('acls'));
  });
  router.register('/calculators/dg-dot-quy', 'Stroke Pro Studio', () => {
    document.title = 'Stroke Pro Studio – CliniPortal';
    mountToApp(renderEmergencyToolsView('stroke'));
  });
  router.register('/calculators/toxicology-studio', 'Toxicology Pro Studio', () => {
    document.title = 'Hồi Sức Chống Độc – CliniPortal';
    mountToApp(renderEmergencyToolsView('toxicology'));
  });
  router.register('/calculators/polytrauma-mtp-studio', 'Polytrauma & MTP Pro Studio', () => {
    document.title = 'Đa Chấn Thương & MTP – CliniPortal';
    mountToApp(renderEmergencyToolsView('polytrauma'));
  });
  router.register('/calculators/ecg-studio', 'ECG Pro Studio', () => {
    document.title = 'ECG Pro Studio – CliniPortal';
    mountToApp(renderCardiologyToolsView('phan-loai-roi-loan-nhip'));
  });
  router.register('/calculators/metabolic-crisis-studio', 'Resuscitative Metabolic Studio', () => {
    document.title = 'Metabolic Crisis Studio – CliniPortal';
    mountToApp(renderRenalToolsView('electrolyte'));
  });
  router.register('/calculators/pocus-efast-studio', 'POCUS & eFAST Studio', () => {
    document.title = 'POCUS eFAST – CliniPortal';
    mountToApp(renderEmergencyToolsView('an-than-icu'));
  });
  router.register('/calculators/cardiogenic-shock-studio', 'Cardiogenic Shock Studio', () => {
    document.title = 'Cardiogenic Shock – CliniPortal';
    mountToApp(renderEmergencyToolsView('van-mach'));
  });

  // Gastroenterology & Nutrition
  router.register('/calculators/dg-xo-gan-studio', 'Cirrhosis Studio (Child-Pugh / MELD)', () => {
    document.title = 'Đánh Giá Xơ Gan – CliniPortal';
    mountToApp(renderGastroToolsView('xo-gan'));
  });
  router.register('/calculators/dg-dinh-duong', 'Đánh Giá Dinh Dưỡng Nội Viện', () => {
    document.title = 'Dinh Dưỡng Nội Viện – CliniPortal';
    mountToApp(renderGastroToolsView('dinh-duong'));
  });
  router.register('/calculators/ascites-studio', 'Ascites Pro Studio (SAAG)', () => {
    document.title = 'Phân Tích Dịch Báng – CliniPortal';
    mountToApp(renderGastroToolsView('ascites'));
  });
  router.register('/calculators/xuat-huyet-tieu-hoa', 'Xuất Huyết Tiêu Hóa (GBS)', () => {
    document.title = 'Xuất Huyết Tiêu Hóa – CliniPortal';
    mountToApp(renderGastroToolsView('xhth'));
  });
  router.register('/calculators/ptnc-hcc', 'Phân Tầng Nguy Cơ HCC', () => {
    document.title = 'Phân Tầng HCC – CliniPortal';
    mountToApp(renderGastroToolsView('ptnc-hcc'));
  });

  // Renal & Electrolytes
  router.register('/calculators/chuc-nang-than', 'Chức Năng Thận (CKD-EPI / Cockcroft-Gault)', () => {
    document.title = 'Chức Năng Thận (eGFR) – CliniPortal';
    mountToApp(renderRenalToolsView('chuc-nang-than'));
  });
  router.register('/calculators/khi-mau-dong-mach', 'Khí Máu Động Mạch (ABG Studio)', () => {
    document.title = 'Khí Máu Động Mạch – CliniPortal';
    mountToApp(renderRenalToolsView('khi-mau'));
  });
  router.register('/calculators/electrolyte-studio', 'Electrolyte Pro Studio', () => {
    document.title = 'Rối Loạn Điện Giải – CliniPortal';
    mountToApp(renderRenalToolsView('electrolyte'));
  });
  router.register('/calculators/danh-gia-nguyen-nhan-aki', 'Đánh Giá Nguyên Nhân AKI', () => {
    document.title = 'Nguyên Nhân AKI – CliniPortal';
    mountToApp(renderRenalToolsView('aki-cause'));
  });

  // Respiratory
  router.register('/calculators/pneumonia-studio', 'Pneumonia Studio (CURB-65 / PSI)', () => {
    document.title = 'Viêm Phổi (CURB-65) – CliniPortal';
    mountToApp(renderRespiratoryToolsView('pneumonia'));
  });
  router.register('/calculators/cxr-studio', 'CXR Pro Studio & CTR', () => {
    document.title = 'X-quang Ngực (CXR) – CliniPortal';
    mountToApp(renderRespiratoryToolsView('cxr'));
  });
  router.register('/calculators/pleural-effusion-studio', 'Dịch Màng Phổi (Tiêu Chuẩn Light)', () => {
    document.title = 'Dịch Màng Phổi – CliniPortal';
    mountToApp(renderRespiratoryToolsView('pleural'));
  });

  // Infectious Diseases
  router.register('/calculators/sepsis-studio', 'Sepsis Pro Studio (qSOFA / SOFA)', () => {
    document.title = 'Sepsis Pro Studio – CliniPortal';
    mountToApp(renderInfectiousToolsView('sepsis'));
  });
  router.register('/calculators/chinh-lieu-khang-sinh', 'Chỉnh Liều Kháng Sinh', () => {
    document.title = 'Chỉnh Liều Kháng Sinh – CliniPortal';
    mountToApp(renderInfectiousToolsView('chinh-lieu'));
  });
  router.register('/calculators/ql-vancomycin', 'Quản Lý Vancomycin (AUC/MIC)', () => {
    document.title = 'Quản Lý Vancomycin – CliniPortal';
    mountToApp(renderInfectiousToolsView('vancomycin'));
  });
  router.register('/calculators/microbiology-studio', 'Microbiology Pro Studio', () => {
    document.title = 'Microbiology Studio – CliniPortal';
    mountToApp(renderInfectiousToolsView('microbiology'));
  });

  // Endocrinology
  router.register('/calculators/insulin-studio', 'Diabetes & Insulin Pro Studio', () => {
    document.title = 'Insulin Pro Studio – CliniPortal';
    mountToApp(renderEndocrinologyToolsView());
  });

  // Hematology
  router.register('/calculators/phan-tang-thieu-mau', 'Phân Tầng Thiếu Máu (MCV / RPI)', () => {
    document.title = 'Phân Tầng Thiếu Máu – CliniPortal';
    mountToApp(renderHematologyToolsView('thieu-mau'));
  });
  router.register('/calculators/lab-pro-studio', 'Lab Pro Studio PACS', () => {
    document.title = 'Lab Pro Studio – CliniPortal';
    mountToApp(renderHematologyToolsView('lab-studio'));
  });

  router.register('/pharmacology', 'Dược lý Lâm sàng', () => {
    document.title = 'Dược lý Lâm sàng – CliniPortal';
    mountToApp(renderPharmacologyView());
    initPharmacologyHub();
  });

  router.register('/pharmacology/tra-cuu-thuoc', 'Tra Cứu Dược Thư', () => {
    document.title = 'Tra Cứu Dược Thư & Drug Passport – CliniPortal';
    mountToApp(renderDrugSearchView());
  });

  router.register('/pharmacology/ma-tran-tuong-tac', 'Ma Trận Tương Tác Thuốc', () => {
    document.title = 'Ma Trận Tương Tác Thuốc 2D – CliniPortal';
    mountToApp(renderInteractionMatrixView());
  });

  router.register('/pharmacology/dose-optimizer', 'Tối Ưu Hóa Liều Thuốc', () => {
    document.title = 'Tối Ưu Hóa Liều Thuốc (CrCl) – CliniPortal';
    mountToApp(renderDoseOptimizerView());
  });

  router.register('/pharmacology/pk-simulator', 'Giả Lập Dược Động Học PK', () => {
    document.title = 'Giả Lập Dược Động Học PK/PD – CliniPortal';
    mountToApp(renderPkSimulatorView());
  });

  router.register('/pharmacology/trieu-chung', 'Dược Trị Liệu Theo Triệu Chứng', () => {
    document.title = 'Dược Trị Liệu Theo Triệu Chứng – CliniPortal';
    mountToApp(renderSymptomPharmaView('all'));
  });

  router.register('/pharmacology/trieu-chung/:symptom', 'Dược Trị Liệu Theo Triệu Chứng', (params) => {
    const symptom = (params.symptom || 'all') as any;
    document.title = 'Dược Trị Liệu Theo Triệu Chứng – CliniPortal';
    mountToApp(renderSymptomPharmaView(symptom));
  });

  router.register('/approaches', 'Tiếp cận Lâm sàng & CDSS', () => {
    document.title = 'Tiếp cận Lâm sàng – CliniPortal';
    mountToApp(renderApproachesView());
    initApproachesHub();
  });

  router.register('/approaches/cap-cuu', 'Cấp Cứu & Hồi Sức (HS-CC)', () => {
    document.title = 'Hồi Sức Cấp Cứu – CliniPortal';
    mountToApp(renderCapCuuView());
  });

  router.register('/approaches/can-lam-sang', 'Tiếp cận Cận Lâm Sàng', () => {
    document.title = 'Tiếp cận Cận Lâm Sàng – CliniPortal';
    mountToApp(renderParaclinicalView());
  });

  router.register('/approaches/trieu-chung', 'Tiếp cận Triệu Chứng Lâm Sàng', () => {
    document.title = 'Tiếp cận Triệu Chứng – CliniPortal';
    mountToApp(renderSymptomsView());
  });

  router.register('/approaches/benh-ly', 'Tiếp cận Bệnh Lý & Phác Đồ', () => {
    document.title = 'Tiếp cận Bệnh Lý – CliniPortal';
    mountToApp(renderBenhLyView());
  });

  router.register('/approaches/pharmacology', 'Dược Lý Theo Tạng', () => {
    document.title = 'Dược Lý Theo Tạng – CliniPortal';
    mountToApp(renderPharmacologyApproachesView());
  });

  router.register('/approaches/nhi-khoa', 'Tiếp cận Chuyên khoa Nhi', () => {
    document.title = 'Tiếp cận Nhi khoa – CliniPortal';
    mountToApp(renderPediatricsView());
  });

  router.register('/pathophysiology', 'Cơ sở Y khoa (GP - SL - CCBS)', () => {
    document.title = 'Cơ sở Y khoa – CliniPortal';
    mountToApp(renderPathophysiologyView('all'));
    initPathophysiologyHub();
  });

  router.register('/pathophysiology/giai-phau-sinh-ly', 'Giải phẫu & Sinh lý học', () => {
    document.title = 'Giải phẫu & Sinh lý – CliniPortal';
    mountToApp(renderGiaiPhauSinhLyView());
  });

  router.register('/pathophysiology/co-che-benh-sinh', 'Cơ chế bệnh sinh & Sinh lý bệnh', () => {
    document.title = 'Cơ chế bệnh sinh – CliniPortal';
    mountToApp(renderCoCheBenhSinhView());
  });

  router.register('/pathophysiology/formula-vault', 'Kho Công thức Sinh lý', () => {
    document.title = 'Kho Công thức Sinh lý – CliniPortal';
    mountToApp(renderFormulaVaultView());
  });

  router.register('/pathophysiology/reader/:slug', 'Bài Giảng Sinh Lý Học', (params) => {
    const slug = params.slug || '';
    mountToApp(renderPhysioReader(slug));
  });

  router.register('/pathophysiology/reader/:part/:slug', 'Bài Giảng Sinh Lý Học', (params) => {
    const part = params.part || '';
    const slug = params.slug || '';
    mountToApp(renderPhysioReader(`${part}/${slug}`));
  });

  router.register('/tcm', 'Y học Cổ truyền', () => {
    document.title = 'Y học Cổ truyền & Đông Tây Y – CliniPortal';
    mountToApp(renderTcmView());
    initTcmHub();
  });

  router.register('/tcm/huyet-vi', 'Bản Đồ Kinh Lạc & Huyệt Vị', () => {
    document.title = 'Bản Đồ Kinh Lạc & Huyệt Vị – CliniPortal';
    mountToApp(renderMeridianAcupointsView());
  });

  router.register('/tcm/duoc-lieu', 'Dược Liệu & Phương Tễ', () => {
    document.title = 'Dược Liệu & Phương Tễ YHCT – CliniPortal';
    mountToApp(renderHerbsFormulasView());
  });

  router.register('/tcm/chan-doan', 'Tứ Chẩn YHCT', () => {
    document.title = 'Tứ Chẩn YHCT (Thiệt Chẩn & Mạch Chẩn) – CliniPortal';
    mountToApp(renderTcmDiagnosticsView());
  });

  router.register('/tcm/ngu-hanh', 'Ngũ Hành Studio', () => {
    document.title = 'Studio Ngũ Hành Tương Sinh Tương Khắc – CliniPortal';
    mountToApp(renderNguHanhStudioView());
  });

  router.register('/tcm/dong-tay-y-bridge', 'Đông Tây Y Kết Hợp', () => {
    document.title = 'Cầu Nối Đông - Tây Y Kết Hợp – CliniPortal';
    mountToApp(renderIntegrativeBridgeView());
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

