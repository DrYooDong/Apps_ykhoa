/**
 * CliniPortal — Knowledge Vault Hub & Dynamic Reader View
 * Hỗ trợ toàn bộ 14 Kho Tri Thức (2.250+ Bài Viết)
 */

import { VAULT_CATALOG, getKhoSummaries, filterVaultArticles, getArticleByIdOrPath, KHO_DEFINITIONS } from './vault-loader';
import { VaultFilterState, VaultArticle } from './types';

let state: VaultFilterState & { activeGroup: string; displayLimit: number } = {
  searchQuery: '',
  activeKho: 'ALL',
  activeSpecialty: 'ALL',
  activeGroup: 'ALL',
  displayLimit: 48
};

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
  const coSoCount = VAULT_CATALOG.filter(a => (a as any).khoGroup === 'Cơ sở Y khoa').length;
  const lamSangCount = VAULT_CATALOG.filter(a => (a as any).khoGroup === 'Lâm sàng & Bệnh học').length;
  const chuyenSauCount = VAULT_CATALOG.filter(a => (a as any).khoGroup === 'Chuyên sâu & Bổ trợ').length;

  return `
    <div class="vault-container">
      <!-- Top Banner -->
      <div class="vault-header">
        <div class="vault-header-title">
          <h1><i class="fa-solid fa-book-medical" style="color: var(--vault-primary);"></i> Kho Kiến Thức Y Khoa CliniPortal</h1>
          <p>Hệ sinh thái tra cứu và trình đọc tri thức chuẩn mực cho 14 phân hệ y khoa.</p>
        </div>
        <div class="vault-header-stats">
          <div class="vault-stat-badge">
            <div class="num">14</div>
            <div class="label">Kho Chuyên Môn</div>
          </div>
          <div class="vault-stat-badge">
            <div class="num">${totalArticles}</div>
            <div class="label">Bài Viết Chuẩn</div>
          </div>
        </div>
      </div>

      <!-- Group Filter Tabs -->
      <div style="display:flex; gap:8px; margin-bottom:1.25rem; flex-wrap:wrap;">
        <button class="vault-group-btn ${state.activeGroup === 'ALL' ? 'active' : ''}" data-group="ALL" style="padding:8px 16px; border-radius:8px; border:1px solid var(--vault-border); background:${state.activeGroup === 'ALL' ? 'var(--vault-primary)' : 'var(--vault-surface)'}; color:${state.activeGroup === 'ALL' ? '#fff' : 'var(--vault-text)'}; font-weight:600; font-size:13px; cursor:pointer;">
          <i class="fa-solid fa-layer-group"></i> Tất cả Phân hệ (${totalArticles})
        </button>
        <button class="vault-group-btn ${state.activeGroup === 'Cơ sở Y khoa' ? 'active' : ''}" data-group="Cơ sở Y khoa" style="padding:8px 16px; border-radius:8px; border:1px solid var(--vault-border); background:${state.activeGroup === 'Cơ sở Y khoa' ? 'var(--vault-primary)' : 'var(--vault-surface)'}; color:${state.activeGroup === 'Cơ sở Y khoa' ? '#fff' : 'var(--vault-text)'}; font-weight:600; font-size:13px; cursor:pointer;">
          🫀 1. Cơ sở Y khoa (${coSoCount})
        </button>
        <button class="vault-group-btn ${state.activeGroup === 'Lâm sàng & Bệnh học' ? 'active' : ''}" data-group="Lâm sàng & Bệnh học" style="padding:8px 16px; border-radius:8px; border:1px solid var(--vault-border); background:${state.activeGroup === 'Lâm sàng & Bệnh học' ? 'var(--vault-primary)' : 'var(--vault-surface)'}; color:${state.activeGroup === 'Lâm sàng & Bệnh học' ? '#fff' : 'var(--vault-text)'}; font-weight:600; font-size:13px; cursor:pointer;">
          🩺 2. Lâm sàng & Bệnh học (${lamSangCount})
        </button>
        <button class="vault-group-btn ${state.activeGroup === 'Chuyên sâu & Bổ trợ' ? 'active' : ''}" data-group="Chuyên sâu & Bổ trợ" style="padding:8px 16px; border-radius:8px; border:1px solid var(--vault-border); background:${state.activeGroup === 'Chuyên sâu & Bổ trợ' ? 'var(--vault-primary)' : 'var(--vault-surface)'}; color:${state.activeGroup === 'Chuyên sâu & Bổ trợ' ? '#fff' : 'var(--vault-text)'}; font-weight:600; font-size:13px; cursor:pointer;">
          📊 3. Chuyên sâu & Bổ trợ (${chuyenSauCount})
        </button>
      </div>

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

      <!-- Control Bar -->
      <div class="vault-control-bar">
        <div class="vault-search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            id="vault-search-input" 
            class="vault-search-input" 
            placeholder="Tìm kiếm bài viết trong ${allFiltered.length} bài (chẩn đoán, cơ chế, thuốc, vi sinh...)" 
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

      <!-- Results Count -->
      <div style="margin-bottom: 1rem; font-size: 0.9rem; color: var(--vault-muted); display: flex; justify-content: space-between; align-items:center;">
        <span>Hiển thị <strong>${displayedArticles.length}</strong> / <strong>${allFiltered.length}</strong> bài viết</span>
        ${state.searchQuery || state.activeKho !== 'ALL' || state.activeSpecialty !== 'ALL' || state.activeGroup !== 'ALL' ? `
          <button id="vault-reset-filter" style="background:none; border:none; color:var(--vault-primary); cursor:pointer; font-size:0.85rem; font-weight:600;">
            <i class="fa-solid fa-rotate-left"></i> Đặt lại tất cả bộ lọc
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
 * Mở và tải nội dung bài viết vào Drawer
 */
export async function openArticleDrawer(identifier: string): Promise<void> {
  const article = getArticleByIdOrPath(identifier);
  if (!article) return;

  const drawer = document.getElementById('vault-drawer');
  const titleEl = document.getElementById('vault-drawer-title');
  const khoBadge = document.getElementById('vault-drawer-kho');
  const bodyEl = document.getElementById('vault-drawer-body');

  if (!drawer || !titleEl || !bodyEl || !khoBadge) return;

  titleEl.textContent = article.title;
  khoBadge.textContent = `${article.khoName} • ${article.specialty} (${article.part})`;
  khoBadge.className = `vault-badge`;
  drawer.classList.add('active');

  bodyEl.innerHTML = `
    <div style="text-align:center; padding:3rem; color:var(--vault-muted);">
      <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
      <p style="margin-top:1rem;">Đang tải nội dung từ Knowledge Vault...</p>
    </div>
  `;

  try {
    const url = `../../../knowledge-vault/${article.relPath}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Không thể nạp tệp');
    let metadataBanner = '';
    if ((article.aliases && article.aliases.length > 1) || (article.icd10 && article.icd10.length > 0)) {
      metadataBanner = `
        <div style="background:var(--vault-bg); border:1px solid var(--vault-border); border-radius:8px; padding:10px 14px; margin-bottom:1.5rem; display:flex; flex-wrap:wrap; gap:8px; align-items:center;">
          ${article.icd10 && article.icd10.length > 0 ? `
            <span style="font-size:12px; font-weight:700; color:#ef4444; background:rgba(239,68,68,0.1); padding:3px 8px; border-radius:4px;">
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

    bodyEl.innerHTML = metadataBanner + formatMedicalMarkdown(rawMarkdown);
  } catch (err) {
    bodyEl.innerHTML = `
      <div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:8px; padding:1.5rem; color:#ef4444;">
        <i class="fa-solid fa-circle-exclamation"></i> <strong>Lỗi nạp bài viết:</strong> Không tìm thấy tệp tin hoặc đường dẫn chưa được đồng bộ.
        <p style="font-size:0.85rem; margin-top:0.5rem; color:var(--vault-text);">Đường dẫn: <code>knowledge-vault/${article.relPath}</code></p>
      </div>
    `;
  }
}

function formatMedicalMarkdown(md: string): string {
  let clean = md.replace(/^---[\s\S]*?---\n*/, '');

  clean = clean.replace(/^# (.*$)/gim, '<h1 class="vault-h1">$1</h1>');
  clean = clean.replace(/^## (.*$)/gim, '<h2 class="vault-h2">$1</h2>');
  clean = clean.replace(/^### (.*$)/gim, '<h3 class="vault-h3">$1</h3>');
  clean = clean.replace(/^#### (.*$)/gim, '<h4 class="vault-h4">$1</h4>');

  clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  clean = clean.replace(/\*(.*?)\*/g, '<em>$1</em>');

  clean = clean.replace(/> \[!NOTE\]\s*([\s\S]*?)(?=\n\n|$)/g, '<div class="dsp-callout dsp-callout-note" style="border-left:4px solid #0284c7; background:rgba(2,132,199,0.08); padding:0.75rem 1rem; border-radius:6px; margin:1rem 0;"><i class="fa-solid fa-circle-info" style="color:#0284c7;"></i> <strong>Ghi chú:</strong> $1</div>');
  clean = clean.replace(/> \[!TIP\]\s*([\s\S]*?)(?=\n\n|$)/g, '<div class="dsp-callout dsp-callout-tip" style="border-left:4px solid #10b981; background:rgba(16,185,129,0.08); padding:0.75rem 1rem; border-radius:6px; margin:1rem 0;"><i class="fa-solid fa-lightbulb" style="color:#10b981;"></i> <strong>Điểm ngọc lâm sàng:</strong> $1</div>');
  clean = clean.replace(/> \[!WARNING\]\s*([\s\S]*?)(?=\n\n|$)/g, '<div class="dsp-callout dsp-callout-warning" style="border-left:4px solid #f59e0b; background:rgba(245,158,11,0.08); padding:0.75rem 1rem; border-radius:6px; margin:1rem 0;"><i class="fa-solid fa-triangle-exclamation" style="color:#f59e0b;"></i> <strong>Cảnh báo:</strong> $1</div>');
  clean = clean.replace(/> \[!CAUTION\]\s*([\s\S]*?)(?=\n\n|$)/g, '<div class="dsp-callout dsp-callout-danger" style="border-left:4px solid #ef4444; background:rgba(239,68,68,0.08); padding:0.75rem 1rem; border-radius:6px; margin:1rem 0;"><i class="fa-solid fa-circle-exclamation" style="color:#ef4444;"></i> <strong>Chống chỉ định / Nguy hiểm:</strong> $1</div>');

  clean = clean.split('\n\n').map(p => {
    if (p.startsWith('<h') || p.startsWith('<div') || p.startsWith('<ul') || p.startsWith('<ol')) {
      return p;
    }
    return `<p>${p.replace(/\n/g, '<br/>')}</p>`;
  }).join('\n');

  return clean;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
