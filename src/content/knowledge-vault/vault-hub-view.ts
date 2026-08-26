/**
 * CliniPortal — Knowledge Vault Hub & Dynamic Reader View
 * Hỗ trợ toàn bộ 14 Kho Tri Thức (2.250+ Bài Viết)
 */

import { VAULT_CATALOG, getKhoSummaries, filterVaultArticles, getArticleByIdOrPath, KHO_DEFINITIONS } from './vault-loader';
import type { VaultFilterState, VaultArticle } from './types';
import { renderPathwayRibbon, processMarkdownWithToc, renderTocHtml, renderReaderToolbar, renderAnnotationsBoxHtml, renderEncyclopediaQuickFactsHtml, attachReaderProEvents } from './vault-reader-pro';
import { renderFlowchartStudioHtml, attachFlowchartEvents, CLINICAL_FLOWCHARTS_REGISTRY } from './vault-flowchart-engine';
import { renderFlashcardStudioHtml, attachFlashcardEvents, DEFAULT_MEDICAL_FLASHCARDS } from './vault-flashcard-engine';
import { 
  renderProtocolsHubView, 
  attachProtocolsEvents, 
  KHO_PROTOCOLS_REGISTRY, 
  getProtocolById
} from './protocols';
import type {
  ProtocolFilterState,
  ClinicalProtocol 
} from './protocols';
import {
  renderVaultCrceView,
  attachVaultCrceEvents,
  DEFAULT_CRCE_STATE
} from './vault-crce-view';
import type {
  VaultCrceState
} from './vault-crce-view';

let state: VaultFilterState & { activeGroup: string; displayLimit: number } = {
  searchQuery: '',
  activeKho: 'ALL',
  activeSpecialty: 'ALL',
  activeGroup: 'ALL',
  displayLimit: 48
};

let crceState: VaultCrceState = {
  ...DEFAULT_CRCE_STATE,
  checkedCriteriaIds: new Set<string>()
};

let protocolsState: {
  filter: ProtocolFilterState;
  selectedId?: string;
  activeTab: string;
} = {
  filter: {
    searchQuery: '',
    specialty: 'all',
    triageLevel: 'all',
    sortBy: 'title'
  },
  selectedId: undefined,
  activeTab: 'flowchart'
};


export function setVaultInitialState(params: { search?: string; kho?: string; group?: string; specialty?: string; protocolId?: string; disease?: string }): void {
  if (params.search !== undefined) state.searchQuery = params.search;
  if (params.kho !== undefined) state.activeKho = params.kho;
  if (params.group !== undefined) state.activeGroup = params.group;
  if (params.specialty !== undefined) state.activeSpecialty = params.specialty;
  if (params.protocolId !== undefined) {
    state.activeGroup = 'PROTOCOL';
    protocolsState.selectedId = params.protocolId;
  }
  if (params.disease !== undefined) {
    state.activeGroup = 'CRCE';
    crceState.selectedDiseaseKey = params.disease;
  }
}


export function renderVaultHubView(): string {
  const summaries = getKhoSummaries();
  const totalArticles = VAULT_CATALOG.length;
  
  // Apply Group filtering if activeGroup != ALL
  let filteredPool = VAULT_CATALOG;
  if (state.activeGroup !== 'ALL') {
    filteredPool = filteredPool.filter(a => (a as any).khoGroup === state.activeGroup);
  }

  // Filter articles
  const q = state.searchQuery.trim().toLowerCase();
  const allFiltered = filteredPool.filter(art => {
    if (state.activeKho !== 'ALL' && art.khoCode !== state.activeKho) return false;
    if (state.activeSpecialty !== 'ALL' && art.specialty !== state.activeSpecialty) return false;
    if (q) {
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchSpecialty = art.specialty.toLowerCase().includes(q);
      const matchSnippet = (art.snippet || '').toLowerCase().includes(q);
      const matchKho = art.khoName.toLowerCase().includes(q);
      const matchAlias = (art.aliases || []).some(a => a.toLowerCase().includes(q));
      const matchKeyword = (art.keywords || []).some(k => k.toLowerCase().includes(q));
      const matchIcd = (art.icd10 || []).some(c => c.toLowerCase().includes(q));

      if (!matchTitle && !matchSpecialty && !matchSnippet && !matchKho && !matchAlias && !matchKeyword && !matchIcd) {
        return false;
      }
    }
    return true;
  });

  const displayedArticles = allFiltered.slice(0, state.displayLimit);

  // Extract available specialties
  const availableSpecialties = Array.from(
    new Set(filteredPool.map(a => a.specialty))
  ).sort();

  // Group stats
  const coSoCount = VAULT_CATALOG.filter(a => (a as any).khoGroup === 'Cơ sở').length;
  const chuyenSauCount = VAULT_CATALOG.filter(a => (a as any).khoGroup === 'Chuyên sâu').length;
  const hoTroCount = VAULT_CATALOG.filter(a => (a as any).khoGroup === 'Hỗ trợ').length;

  return `
    <div class="vault-container">
      <!-- Top Banner -->
      <div class="vault-header">
        <div class="vault-header-title">
          <h1><i class="fa-solid fa-book-medical" style="color: var(--vault-primary);"></i> Kho Kiến Thức Y Khoa CliniPortal</h1>
          <p>Hệ sinh thái tra cứu và trình đọc tri thức chuẩn mực cho ${summaries.length} phân hệ y khoa.</p>
        </div>
        <div class="vault-header-stats">
          <div class="vault-stat-badge">
            <div class="num">${summaries.length}</div>
            <div class="label">Kho Chuyên Môn</div>
          </div>
          <div class="vault-stat-badge">
            <div class="num">${totalArticles}</div>
            <div class="label">Bài Viết Chuẩn</div>
          </div>
        </div>
      </div>

      <!-- Group Filter Tabs -->
      <div style="display:flex; gap:8px; margin-bottom:1rem; flex-wrap:wrap;">
        <button class="vault-group-btn ${state.activeGroup === 'ALL' ? 'active' : ''}" data-group="ALL" style="padding:8px 16px; border-radius:8px; border:1px solid var(--vault-border); background:${state.activeGroup === 'ALL' ? 'var(--vault-primary)' : 'var(--vault-surface)'}; color:${state.activeGroup === 'ALL' ? '#fff' : 'var(--vault-text)'}; font-weight:600; font-size:13px; cursor:pointer;">
          <i class="fa-solid fa-layer-group"></i> Tất cả Phân hệ (${totalArticles})
        </button>
        <button class="vault-group-btn ${state.activeGroup === 'CRCE' ? 'active' : ''}" data-group="CRCE" style="padding:8px 16px; border-radius:8px; border:1px solid var(--vault-border); background:${state.activeGroup === 'CRCE' ? '#f59e0b' : 'var(--vault-surface)'}; color:${state.activeGroup === 'CRCE' ? '#fff' : 'var(--vault-text)'}; font-weight:700; font-size:13px; cursor:pointer;">
          ⚡ Chuỗi CRCE (30)
        </button>
        <button class="vault-group-btn ${state.activeGroup === 'PROTOCOL' ? 'active' : ''}" data-group="PROTOCOL" style="padding:8px 16px; border-radius:8px; border:1px solid var(--vault-border); background:${state.activeGroup === 'PROTOCOL' ? '#e11d48' : 'var(--vault-surface)'}; color:${state.activeGroup === 'PROTOCOL' ? '#fff' : 'var(--vault-text)'}; font-weight:700; font-size:13px; cursor:pointer;">
          💉 Phác Đồ (${KHO_PROTOCOLS_REGISTRY.length})
        </button>
        <button class="vault-group-btn ${state.activeGroup === 'FLOWCHART' ? 'active' : ''}" data-group="FLOWCHART" style="padding:8px 16px; border-radius:8px; border:1px solid var(--vault-border); background:${state.activeGroup === 'FLOWCHART' ? '#0d9488' : 'var(--vault-surface)'}; color:${state.activeGroup === 'FLOWCHART' ? '#fff' : 'var(--vault-text)'}; font-weight:700; font-size:13px; cursor:pointer;">
          🌿 Sơ Đồ Thuật Toán (${CLINICAL_FLOWCHARTS_REGISTRY.length})
        </button>
        <button class="vault-group-btn ${state.activeGroup === 'FLASHCARD' ? 'active' : ''}" data-group="FLASHCARD" style="padding:8px 16px; border-radius:8px; border:1px solid var(--vault-border); background:${state.activeGroup === 'FLASHCARD' ? '#8b5cf6' : 'var(--vault-surface)'}; color:${state.activeGroup === 'FLASHCARD' ? '#fff' : 'var(--vault-text)'}; font-weight:700; font-size:13px; cursor:pointer;">
          🧠 Thẻ Ghi Nhớ Flashcard (${DEFAULT_MEDICAL_FLASHCARDS.length})
        </button>
        <button class="vault-group-btn ${state.activeGroup === 'Cơ sở' ? 'active' : ''}" data-group="Cơ sở" style="padding:8px 16px; border-radius:8px; border:1px solid var(--vault-border); background:${state.activeGroup === 'Cơ sở' ? 'var(--vault-primary)' : 'var(--vault-surface)'}; color:${state.activeGroup === 'Cơ sở' ? '#fff' : 'var(--vault-text)'}; font-weight:600; font-size:13px; cursor:pointer;">
          🫀 1. Cơ sở (${coSoCount})
        </button>
        <button class="vault-group-btn ${state.activeGroup === 'Chuyên sâu' ? 'active' : ''}" data-group="Chuyên sâu" style="padding:8px 16px; border-radius:8px; border:1px solid var(--vault-border); background:${state.activeGroup === 'Chuyên sâu' ? 'var(--vault-primary)' : 'var(--vault-surface)'}; color:${state.activeGroup === 'Chuyên sâu' ? '#fff' : 'var(--vault-text)'}; font-weight:600; font-size:13px; cursor:pointer;">
          🩺 2. Chuyên sâu (${chuyenSauCount})
        </button>
        <button class="vault-group-btn ${state.activeGroup === 'Hỗ trợ' ? 'active' : ''}" data-group="Hỗ trợ" style="padding:8px 16px; border-radius:8px; border:1px solid var(--vault-border); background:${state.activeGroup === 'Hỗ trợ' ? 'var(--vault-primary)' : 'var(--vault-surface)'}; color:${state.activeGroup === 'Hỗ trợ' ? '#fff' : 'var(--vault-text)'}; font-weight:600; font-size:13px; cursor:pointer;">
          📊 3. Hỗ trợ (${hoTroCount})
        </button>
      </div>

      <!-- Live Search & Control Bar at Top (Only for General Vault view) -->
      ${state.activeGroup !== 'PROTOCOL' && state.activeGroup !== 'CRCE' ? `
      <div class="vault-control-bar" style="margin-bottom:1.5rem;">
        <div class="vault-search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            id="vault-search-input" 
            class="vault-search-input" 
            placeholder="Tìm kiếm trong ${allFiltered.length} bài viết (chẩn đoán, triệu chứng, cơ chế, thuốc, ICD-10...)" 
            value="${escapeHtml(state.searchQuery)}"
          />
        </div>

        <select id="vault-specialty-select" class="vault-filter-select">
          <option value="ALL">Tất cả Chuyên khoa (${availableSpecialties.length})</option>
          ${availableSpecialties.map(spec => `
            <option value="${escapeHtml(spec)}" ${state.activeSpecialty === spec ? 'selected' : ''}>
              ${escapeHtml(spec)}
            </option>
          `).join('')}
        </select>
      </div>
      ` : ''}

      ${state.activeGroup === 'CRCE' ? `
        <div id="vault-crce-mount-point" style="margin-bottom: 2rem;">
          ${renderVaultCrceView(crceState)}
        </div>
      ` : ''}

      ${state.activeGroup === 'PROTOCOL' ? `
        <div id="vault-protocol-mount-point" style="margin-bottom: 2rem;">
          ${renderProtocolsHubView(protocolsState.filter, protocolsState.selectedId, protocolsState.activeTab)}
        </div>
      ` : ''}

      ${state.activeGroup === 'FLOWCHART' ? `
        <div id="vault-flowchart-mount-point" style="margin-bottom: 2rem;">
          ${renderFlowchartStudioHtml()}
        </div>
      ` : ''}

      ${state.activeGroup === 'FLASHCARD' ? `
        <div id="vault-flashcard-mount-point" style="margin-bottom: 2rem;">
          ${renderFlashcardStudioHtml()}
        </div>
      ` : ''}


      ${state.activeGroup !== 'PROTOCOL' && state.activeGroup !== 'CRCE' ? `
      <!-- Kho Bento Hero Grid -->
      <div class="vault-kho-grid">
        ${summaries.filter(k => state.activeGroup === 'ALL' || (KHO_DEFINITIONS[k.code] && KHO_DEFINITIONS[k.code].group === state.activeGroup)).map(k => `
          <div class="vault-kho-card ${state.activeKho === k.code ? 'active' : ''}" data-kho="${k.code}" style="--kho-color: ${k.color};">
            <div class="vault-kho-card-header">
              <div class="vault-kho-icon"><i class="fa-solid ${k.icon}"></i></div>
              <div>
                <h3 class="vault-kho-card-title">${k.name}</h3>
                <div class="vault-kho-card-meta">${k.articleCount} bài • ${k.specialties.length} chuyên khoa</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Results Section & Counter -->
      <div id="vault-results-section" style="margin-top:1.5rem; margin-bottom: 1rem; font-size: 0.95rem; color: var(--vault-muted); display: flex; justify-content: space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div>
          ${state.activeKho !== 'ALL' && KHO_DEFINITIONS[state.activeKho] ? `
            <span style="font-weight:700; color:var(--vault-primary); margin-right:8px;">
              <i class="fa-solid fa-folder-open"></i> Đang xem Kho: ${KHO_DEFINITIONS[state.activeKho].name}
            </span>
          ` : ''}
          <span>Hiển thị <strong>${displayedArticles.length}</strong> / <strong>${allFiltered.length}</strong> bài viết</span>
        </div>
        ${state.searchQuery || state.activeKho !== 'ALL' || state.activeSpecialty !== 'ALL' || state.activeGroup !== 'ALL' ? `
          <button id="vault-reset-filter" style="background:rgba(2,132,199,0.08); border:1px solid rgba(2,132,199,0.25); border-radius:6px; padding:4px 10px; color:var(--vault-primary); cursor:pointer; font-size:0.85rem; font-weight:600;">
            <i class="fa-solid fa-rotate-left"></i> Đặt lại bộ lọc (Hiện tất cả)
          </button>
        ` : ''}
      </div>

      <!-- Articles Grid -->
      <div class="vault-articles-grid">
        ${displayedArticles.length > 0 ? displayedArticles.map(art => `
          <div class="vault-article-card" data-id="${art.id}" data-rel="${escapeHtml(art.relPath)}">
            <div class="vault-article-top">
              <div class="vault-article-badges">
                <span class="vault-badge" style="background: rgba(2, 132, 199, 0.1); color: var(--vault-primary);">
                  <i class="fa-solid ${art.khoIcon}"></i> ${escapeHtml(art.khoName)}
                </span>
                <span class="vault-badge" style="background: rgba(100,116,139,0.1); color: var(--vault-muted);">
                  ${escapeHtml(art.specialty)}
                </span>
                <span class="vault-badge" style="background: rgba(100,116,139,0.08); color: var(--vault-muted);">
                  ${escapeHtml(art.part)}
                </span>
                ${art.icd10 && art.icd10.length > 0 ? `
                  <span class="vault-badge" style="background: rgba(239, 68, 68, 0.1); color: #ef4444; font-weight:700;">
                    ICD-10: ${escapeHtml(art.icd10[0])}
                  </span>
                ` : ''}
                ${art.aliases && art.aliases.length > 1 ? `
                  <span class="vault-badge" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6;">
                    ${escapeHtml(art.aliases[1])}
                  </span>
                ` : ''}
              </div>
              <h4 class="vault-article-title">${escapeHtml(art.title)}</h4>
              <div class="vault-article-snippet">${escapeHtml(art.snippet || 'Tài liệu kiến thức y khoa chuẩn hóa.')}</div>
            </div>

            <div class="vault-article-footer">
              <span><i class="fa-regular fa-clock"></i> ${art.readTime}</span>
              <span class="action-link">Đọc bài <i class="fa-solid fa-arrow-right"></i></span>
            </div>
          </div>
        `).join('') : `
          <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--vault-muted);">
            <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.5;"></i>
            <h3>Không tìm thấy bài viết phù hợp</h3>
            <p>Vui lòng thử từ khóa khác hoặc đặt lại bộ lọc.</p>
          </div>
        `}
      </div>

      <!-- Load More Button -->
      ${allFiltered.length > state.displayLimit ? `
        <div style="text-align:center; margin-top:2.5rem;">
          <button id="vault-load-more" style="padding:0.75rem 2rem; background:var(--vault-surface); border:1px solid var(--vault-border); border-radius:8px; font-weight:600; cursor:pointer; color:var(--vault-primary); box-shadow:0 2px 6px rgba(0,0,0,0.04);">
            <i class="fa-solid fa-angles-down"></i> Tải thêm bài viết (còn ${allFiltered.length - state.displayLimit} bài)
          </button>
        </div>
      ` : ''}
      ` : ''}
    </div>


    <!-- Article Reader Drawer -->
    <div id="vault-drawer" class="vault-drawer-overlay">
      <div class="vault-drawer-panel">
        <div class="vault-drawer-header">
          <div id="vault-drawer-meta">
            <span id="vault-drawer-kho" class="vault-badge">KHO</span>
            <strong id="vault-drawer-title" style="margin-left: 0.5rem; font-size: 1.1rem;">Tiêu đề bài viết</strong>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button id="vault-drawer-close" style="background:none; border:none; font-size:1.4rem; cursor:pointer; color:var(--vault-muted);">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <div id="vault-drawer-body" class="vault-drawer-body">
          <div class="dsp-loading-spinner" style="text-align:center; padding:3rem;"><i class="fa-solid fa-spinner fa-spin fa-2x"></i></div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Gắn bộ lắng nghe sự kiện
 */
export function attachVaultEvents(container: HTMLElement): void {
  // Group Filter Tabs
  container.querySelectorAll('.vault-group-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const g = btn.getAttribute('data-group') || 'ALL';
      state.activeGroup = g;
      state.activeKho = 'ALL';
      state.activeSpecialty = 'ALL';
      state.displayLimit = 48;
      renderAndRebind(container);
    });
  });

  // Kho Filter clicks
  container.querySelectorAll('.vault-kho-card').forEach(el => {
    el.addEventListener('click', () => {
      const kho = el.getAttribute('data-kho') || 'ALL';
      state.activeKho = state.activeKho === kho ? 'ALL' : kho;
      state.activeSpecialty = 'ALL';
      state.displayLimit = 48;
      renderAndRebind(container);

      // Auto scroll to results section so user immediately sees articles
      const resultsSection = container.querySelector('#vault-results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Search input live filtering
  const searchInput = container.querySelector('#vault-search-input') as HTMLInputElement | null;
  if (searchInput) {
    let debounceTimer: any;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.searchQuery = (e.target as HTMLInputElement).value;
        state.displayLimit = 48;
        renderAndRebind(container);
      }, 200);
    });
  }

  // Specialty select
  const specSelect = container.querySelector('#vault-specialty-select') as HTMLSelectElement | null;
  if (specSelect) {
    specSelect.addEventListener('change', (e) => {
      state.activeSpecialty = (e.target as HTMLSelectElement).value;
      state.displayLimit = 48;
      renderAndRebind(container);
    });
  }

  // Reset button
  const resetBtn = container.querySelector('#vault-reset-filter');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state = { searchQuery: '', activeKho: 'ALL', activeSpecialty: 'ALL', activeGroup: 'ALL', displayLimit: 48 };
      renderAndRebind(container);
    });
  }

  // Load more button
  const loadMoreBtn = container.querySelector('#vault-load-more');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      state.displayLimit += 48;
      renderAndRebind(container);
    });
  }

  // Article card click -> Open Reader Drawer
  container.querySelectorAll('.vault-article-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const rel = card.getAttribute('data-rel');
      if (id || rel) {
        openArticleDrawer(id || rel || '');
      }
    });
  });

  // Attach CRCE Events if in CRCE View
  const crceMount = container.querySelector('#vault-crce-mount-point') as HTMLElement | null;
  if (crceMount) {
    attachVaultCrceEvents(crceMount, crceState, (newState) => {
      crceState = newState;
      renderAndRebind(container);
    }, (articleIdOrPath) => {
      openArticleDrawer(articleIdOrPath);
    });
  }

  // Attach Protocol Events if in Protocol View
  const protocolMount = container.querySelector('#vault-protocol-mount-point') as HTMLElement | null;
  if (protocolMount) {
    attachProtocolsEvents(protocolMount, protocolsState, (newState) => {
      protocolsState = newState;
      renderAndRebind(container);
    });
  }

  // Attach Flowchart Events if in Flowchart View
  const flowchartMount = container.querySelector('#vault-flowchart-mount-point') as HTMLElement | null;
  if (flowchartMount) {
    attachFlowchartEvents(flowchartMount);
  }


  // Attach Flashcard Events if in Flashcard View
  const flashcardMount = container.querySelector('#vault-flashcard-mount-point') as HTMLElement | null;
  if (flashcardMount) {
    attachFlashcardEvents(flashcardMount);
  }

  // Drawer Close
  const closeBtn = document.getElementById('vault-drawer-close');
  const drawer = document.getElementById('vault-drawer');
  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => drawer.classList.remove('active'));
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) drawer.classList.remove('active');
    });
  }
}

function renderAndRebind(container: HTMLElement) {
  container.innerHTML = renderVaultHubView();
  attachVaultEvents(container);
}

/**
 * Mở Drawer chi tiết bài viết (Hỗ trợ Reader Pro Layout, Dynamic TOC, Pathway Ribbon, Flowchart & Annotations)
 */
export async function openArticleDrawer(articleIdOrPath: string): Promise<void> {
  const article = getArticleByIdOrPath(articleIdOrPath);
  if (!article) return;

  const drawer = document.getElementById('vault-drawer');
  const drawerPanel = drawer?.querySelector('.vault-drawer-panel') as HTMLElement | null;
  const titleEl = document.getElementById('vault-drawer-title');
  const khoBadge = document.getElementById('vault-drawer-kho');
  const bodyEl = document.getElementById('vault-drawer-body');

  if (!drawer || !drawerPanel || !titleEl || !bodyEl || !khoBadge) return;

  titleEl.textContent = article.title;
  khoBadge.textContent = `${article.khoName} • ${article.specialty} (${article.part})`;
  khoBadge.className = `vault-badge`;
  drawer.classList.add('active');

  bodyEl.innerHTML = `
    <div style="text-align:center; padding:3rem; color:var(--vault-muted);">
      <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
      <p style="margin-top:1rem;">Đang tải nội dung và lập bản đồ liên kết y khoa...</p>
    </div>
  `;

  try {
    const isSpaMode = !window.location.pathname.includes('/src/content/knowledge-vault/');
    const baseVaultPath = isSpaMode ? './knowledge-vault/' : '../../../knowledge-vault/';
    const encodedRelPath = article.relPath.split('/').map(encodeURIComponent).join('/');
    const url = `${baseVaultPath}${encodedRelPath}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Không thể nạp tệp (${res.status})`);
    const rawMarkdown = await res.text();

    // 1. Clinical Pathway Ribbon
    const pathwayRibbonHtml = renderPathwayRibbon(article);

    // 2. Reader Toolbar
    const toolbarHtml = renderReaderToolbar(article);

    // 3. Process Markdown & Dynamic TOC
    const { htmlContent, tocItems } = processMarkdownWithToc(rawMarkdown);
    const tocHtml = renderTocHtml(tocItems);

    // 4. Check for matched interactive flowchart
    const matchedFlowchart = CLINICAL_FLOWCHARTS_REGISTRY.find(c => 
      article.title.toLowerCase().includes(c.conditionName.toLowerCase()) ||
      (article.keywords || []).some(k => c.conditionName.toLowerCase().includes(k.toLowerCase()))
    );

    let flowchartSection = '';
    if (matchedFlowchart) {
      flowchartSection = `
        <div id="drawer-flowchart-mount" style="margin-bottom:1.5rem;">
          ${renderFlowchartStudioHtml(matchedFlowchart.id)}
        </div>
      `;
    }

    // 4b. Check for matched clinical protocol
    const matchedProtocol = KHO_PROTOCOLS_REGISTRY.find(p => 
      article.title.toLowerCase().includes(p.title.toLowerCase()) ||
      (p.aliases || []).some(a => article.title.toLowerCase().includes(a.toLowerCase())) ||
      (article.icd10 && article.icd10.some(icd => p.icd10.includes(icd)))
    );

    let protocolSection = '';
    if (matchedProtocol) {
      protocolSection = `
        <div style="background: linear-gradient(135deg, rgba(225, 29, 72, 0.06) 0%, rgba(2, 132, 199, 0.06) 100%); border: 1.5px solid #e11d48; border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 8px;">
            <span style="background: #e11d48; color: #fff; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 4px;">
              <i class="fa-solid fa-code-fork"></i> PHÁC ĐỒ ĐIỀU TRỊ CHUẨN (EBM)
            </span>
            <span style="font-size: 12px; color: var(--vault-muted); font-weight: 600;">
              Nguồn: ${escapeHtml(matchedProtocol.guidelineSource)} (${matchedProtocol.year})
            </span>
          </div>
          <h4 style="margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 800; color: var(--vault-text);">
            ${escapeHtml(matchedProtocol.title)}
          </h4>
          <p style="margin: 0 0 0.75rem; font-size: 13px; color: var(--vault-muted); line-height: 1.45;">
            ${escapeHtml(matchedProtocol.summary)}
          </p>
          <button id="drawer-open-proto-btn" data-proto-id="${matchedProtocol.id}" style="background: #e11d48; color: #fff; border: none; border-radius: 8px; padding: 8px 16px; font-weight: 700; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Mở Trình Đọc Phác Đồ & Bảng Liều eGFR
          </button>
        </div>
      `;
    }

    // 5. Metadata Chip Bar
    let metadataBanner = '';
    if ((article.aliases && article.aliases.length > 1) || (article.icd10 && article.icd10.length > 0)) {
      metadataBanner = `
        <div style="background:var(--vault-surface); border:1px solid var(--vault-border); border-radius:8px; padding:8px 12px; margin-bottom:1rem; display:flex; flex-wrap:wrap; gap:8px; align-items:center;">
          ${article.icd10 && article.icd10.length > 0 ? `
            <span style="font-size:12px; font-weight:700; color:#ef4444; background:rgba(239,68,68,0.1); padding:2px 8px; border-radius:4px;">
              <i class="fa-solid fa-barcode"></i> ICD-10: ${article.icd10.join(', ')}
            </span>
          ` : ''}
          ${article.aliases && article.aliases.length > 1 ? `
            <span style="font-size:12px; color:var(--vault-muted);">
              <strong>Tên gọi khác / Viết tắt:</strong> ${article.aliases.slice(1).join(' • ')}
            </span>
          ` : ''}
        </div>
      `;
    }

    // 6. Personal Annotations Box
    const annotationsHtml = renderAnnotationsBoxHtml(article);

    // 7. Vault Path Breadcrumb Bar (Two-Way Link)
    const vaultPathBar = `
      <div class="vault-path-bar">
        <div class="vault-path-text" title="Đường dẫn tương đối trong Knowledge Vault">
          <i class="fa-solid fa-folder-open" style="color:var(--vault-primary);"></i>
          <span>knowledge-vault/${escapeHtml(article.relPath)}</span>
        </div>
        <div style="display:flex; gap:6px; align-items:center;">
          <a href="obsidian://open?vault=Apps_ykhoa&file=${encodeURIComponent('knowledge-vault/' + article.relPath.replace(/\.md$/, ''))}" class="vault-obsidian-badge" style="text-decoration:none;" title="Mở trực tiếp tệp này trong Obsidian">
            <i class="fa-solid fa-gem"></i> Obsidian Note
          </a>
        </div>
      </div>
    `;

    // 8. Combine into Reader Pro Grid
    bodyEl.innerHTML = `
      ${pathwayRibbonHtml}
      ${toolbarHtml}
      ${vaultPathBar}
      ${metadataBanner}
      ${protocolSection}
      ${renderEncyclopediaQuickFactsHtml(article)}
      ${flowchartSection}
      <div class="vault-reader-pro-grid">
        <div class="vault-article-content">
          ${annotationsHtml}
          ${htmlContent}
        </div>
        ${tocHtml}
      </div>
    `;

    // 8. Attach Reader Pro & Flowchart Events
    attachReaderProEvents(drawerPanel, (targetArticleId) => {
      openArticleDrawer(targetArticleId);
    });

    const drawerFlowchartMount = bodyEl.querySelector('#drawer-flowchart-mount') as HTMLElement | null;
    if (drawerFlowchartMount) {
      attachFlowchartEvents(drawerFlowchartMount);
    }

    const drawerProtoBtn = bodyEl.querySelector('#drawer-open-proto-btn') as HTMLElement | null;
    if (drawerProtoBtn) {
      drawerProtoBtn.addEventListener('click', () => {
        const protoId = drawerProtoBtn.getAttribute('data-proto-id');
        if (protoId) {
          drawer.classList.remove('active');
          state.activeGroup = 'PROTOCOL';
          protocolsState.selectedId = protoId;
          protocolsState.activeTab = 'flowchart';
          const vaultApp = document.getElementById('vault-app') || document.getElementById('app');
          if (vaultApp) {
            renderAndRebind(vaultApp);
          }
        }
      });
    }


  } catch (err) {
    bodyEl.innerHTML = `
      <div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:8px; padding:1.5rem; color:#ef4444;">
        <i class="fa-solid fa-circle-exclamation"></i> <strong>Lỗi nạp bài viết:</strong> Không tìm thấy tệp tin hoặc đường dẫn chưa được đồng bộ.
        <p style="font-size:0.85rem; margin-top:0.5rem; color:var(--vault-text);">Đường dẫn: <code>knowledge-vault/${article.relPath}</code></p>
      </div>
    `;
  }
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
