/**
 * CliniPortal — Calculators Hub TypeScript Renderer & Controller
 */
import { ClinicalTool, LabCategory } from './types';
import { CLINICAL_TOOLS_DATA, PART_METADATA, LAB_VALUES_DATA } from './data';

const FAVORITES_KEY = 'cliniportal_favorite_tools';
const LEGACY_ID_MAP: Record<string, string> = {
  'chinh-lieu-insulin': 'insulin-studio'
};

let favorites: string[] = [];

function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY) || '[]';
    const parsed: string[] = JSON.parse(raw);
    favorites = parsed.map(id => LEGACY_ID_MAP[id] || id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    favorites = [];
  }
  return favorites;
}

function resolveToolLink(rawLink: string): string {
  if (!rawLink) return '#';
  const path = window.location.pathname.replace(/\\/g, '/');
  if (path.includes('/calculators/general/')) {
    return '../' + rawLink;
  }
  return rawLink;
}

export function createToolCard(tool: ClinicalTool, _isFavoriteView = false): string {
  const isFav = favorites.includes(tool.id);
  const starClass = isFav ? 'fa-solid fa-star' : 'fa-regular fa-star';
  const starColor = isFav ? 'var(--color-warning)' : 'var(--color-text-muted)';
  const toolLink = resolveToolLink(tool.link);

  return `
    <div class="specialty-card tool-card" data-tool-id="${tool.id}" data-tags="${tool.tags.join(' ')}">
      <div class="specialty-card-top">
        <div class="specialty-icon">${tool.icon}</div>
        <div class="specialty-info">
          <h3>${tool.title}</h3>
          <p>${tool.description}</p>
        </div>
        <button class="fav-btn" data-id="${tool.id}" title="${isFav ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}" style="position:absolute; top: 12px; right: 12px; background: transparent; border: none; cursor: pointer; color: ${starColor}; font-size: 1.1rem;">
          <i class="${starClass}"></i>
        </button>
      </div>
      <a href="${encodeURI(toolLink)}" class="specialty-card-action" style="text-decoration:none; display:flex; justify-content:space-between; align-items:center;">
        <span>Mở công cụ</span>
        <i class="fa-solid fa-chevron-right"></i>
      </a>
    </div>
  `;
}

export function renderFavorites(): void {
  const favSection = document.getElementById('favorites-section');
  const favGrid = document.getElementById('favorites-grid');
  if (!favSection || !favGrid) return;

  if (favorites.length === 0) {
    favSection.style.display = 'none';
    return;
  }

  favSection.style.display = 'block';
  const favTools = CLINICAL_TOOLS_DATA.filter(t => favorites.includes(t.id));
  favGrid.innerHTML = favTools.map(t => createToolCard(t, true)).join('');
  attachFavoriteEvents(favGrid);
}

export async function toggleFavorite(id: string): Promise<void> {
  if (favorites.includes(id)) {
    favorites = favorites.filter(fav => fav !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

  // Đồng bộ vào CliniStorage nếu có
  const win = window as any;
  if (win.CliniStorage && typeof win.CliniStorage.toggleBookmark === 'function') {
    const tool = CLINICAL_TOOLS_DATA.find(t => t.id === id);
    await win.CliniStorage.toggleBookmark({
      id: id,
      title: tool ? tool.title : id,
      module: 'calculators'
    });
  }

  renderFavorites();

  // Cập nhật lại sao trên danh sách chính
  const allBtns = document.querySelectorAll(`.tool-card[data-tool-id="${id}"] .fav-btn`);
  allBtns.forEach(btn => {
    const isFav = favorites.includes(id);
    btn.innerHTML = `<i class="${isFav ? 'fa-solid fa-star' : 'fa-regular fa-star'}"></i>`;
    (btn as HTMLElement).style.color = isFav ? 'var(--color-warning)' : 'var(--color-text-muted)';
    (btn as HTMLElement).title = isFav ? 'Bỏ yêu thích' : 'Thêm vào yêu thích';
  });
}

export function attachFavoriteEvents(container: Document | HTMLElement = document): void {
  const btns = container.querySelectorAll('.fav-btn');
  btns.forEach(btn => {
    (btn as HTMLElement).onclick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (id) toggleFavorite(id);
    };
  });
}

export function renderAllTools(): void {
  const lessonsContainer = document.getElementById('lessons-container');
  if (!lessonsContainer) return;

  // Xóa các section động cũ
  const oldSections = lessonsContainer.querySelectorAll('section:not(#favorites-section)');
  oldSections.forEach(sec => sec.remove());

  // Nhóm tools theo part
  const groupedTools: Record<string, ClinicalTool[]> = {};
  CLINICAL_TOOLS_DATA.forEach(tool => {
    if (!groupedTools[tool.part]) groupedTools[tool.part] = [];
    groupedTools[tool.part]!.push(tool);
  });

  let html = '';
  for (const [partId, tools] of Object.entries(groupedTools)) {
    const meta = PART_METADATA[partId];
    if (!meta) continue;

    html += `
      <section id="${partId}" class="tool-section" aria-labelledby="${meta.id}-heading">
        <div class="physio-group-container">
          <div class="physio-group-header">
            <span class="physio-group-icon"><i class="fa-solid ${meta.icon}"></i></span>
            <h3 id="${meta.id}-heading">${meta.name}</h3>
          </div>
          <div class="specialty-grid">
            ${tools.map(t => createToolCard(t)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  const favSection = document.getElementById('favorites-section');
  if (favSection) {
    favSection.insertAdjacentHTML('afterend', html);
  } else {
    lessonsContainer.insertAdjacentHTML('beforeend', html);
  }

  attachFavoriteEvents();
}

export function handleSearch(query: string): void {
  query = query.toLowerCase().trim();
  const normalizedQuery = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const clearSearchBtn = document.getElementById('clear-search');
  const emptyState = document.getElementById('empty-search-state');
  const favSection = document.getElementById('favorites-section');

  if (query === '') {
    if (clearSearchBtn) clearSearchBtn.style.display = 'none';
    document.querySelectorAll('.tool-section').forEach(sec => (sec as HTMLElement).style.display = 'block');
    document.querySelectorAll('.tool-card').forEach(card => (card as HTMLElement).style.display = 'block');
    if (emptyState) emptyState.style.display = 'none';
    if (favSection && favorites.length > 0) favSection.style.display = 'block';
    return;
  }

  if (clearSearchBtn) clearSearchBtn.style.display = 'block';
  if (favSection) favSection.style.display = 'none';

  let hasResult = false;
  const sections = document.querySelectorAll('.tool-section');
  sections.forEach(sec => {
    let sectionHasResult = false;
    const cards = sec.querySelectorAll('.tool-card');

    cards.forEach(card => {
      const id = card.getAttribute('data-tool-id');
      const tool = CLINICAL_TOOLS_DATA.find(t => t.id === id);
      if (!tool) return;

      const title = tool.title.toLowerCase();
      const desc = tool.description.toLowerCase();
      const tags = tool.tags.join(' ');
      const combined = `${title} ${desc} ${tags}`;
      const normalizedCombined = combined.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      if (combined.includes(query) || normalizedCombined.includes(normalizedQuery)) {
        (card as HTMLElement).style.display = 'block';
        sectionHasResult = true;
        hasResult = true;
      } else {
        (card as HTMLElement).style.display = 'none';
      }
    });

    (sec as HTMLElement).style.display = sectionHasResult ? 'block' : 'none';
  });

  if (emptyState) {
    emptyState.style.display = hasResult ? 'none' : 'flex';
  }
}

export function initLabWidget(): void {
  const listEl = document.getElementById('labList');
  const detailsCard = document.getElementById('labDetailsCard');
  if (!listEl || !detailsCard) return;

  const tabBtns = document.querySelectorAll('.lab-tab-btn');

  function renderTab(tabKey: LabCategory) {
    const items = LAB_VALUES_DATA[tabKey];
    if (!items || !listEl) return;

    listEl.innerHTML = items.map(item => `
      <div class="lab-item-badge" data-key="${item.key}" title="${item.name}">
        ${item.key.toUpperCase()}
      </div>
    `).join('');

    // Click item badge
    listEl.querySelectorAll('.lab-item-badge').forEach(badge => {
      badge.addEventListener('click', () => {
        const key = badge.getAttribute('data-key');
        const found = items.find(i => i.key === key);
        if (found && detailsCard) {
          detailsCard.innerHTML = `
            <div style="font-weight:600; color:var(--color-primary); font-size:var(--text-sm);">${found.name}</div>
            <div style="font-size:var(--text-xs); color:var(--color-text-muted); margin-top:2px;">Khoảng tham chiếu: <strong style="color:var(--color-text);">${found.range}</strong></div>
          `;
          detailsCard.style.display = 'block';
        }
      });
    });

    if (items.length > 0 && items[0]) {
      const first = items[0];
      detailsCard.innerHTML = `
        <div style="font-weight:600; color:var(--color-primary); font-size:var(--text-sm);">${first.name}</div>
        <div style="font-size:var(--text-xs); color:var(--color-text-muted); margin-top:2px;">Khoảng tham chiếu: <strong style="color:var(--color-text);">${first.range}</strong></div>
      `;
    }
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab') as LabCategory;
      if (tab) renderTab(tab);
    });
  });

  renderTab('hemato');
}

export function initCalculatorsHub(): void {
  loadFavorites();
  renderAllTools();
  renderFavorites();
  initLabWidget();

  const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;
  const clearSearchBtn = document.getElementById('clear-search');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      handleSearch((e.target as HTMLInputElement).value);
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      handleSearch('');
      searchInput.focus();
    });
  }

  // Calculation History Modal
  const openHistoryBtn = document.getElementById('btn-open-calc-history');
  if (openHistoryBtn) {
    openHistoryBtn.addEventListener('click', () => {
      const win = window as any;
      if (win.CalculationHistoryModal && typeof win.CalculationHistoryModal.open === 'function') {
        win.CalculationHistoryModal.open();
      }
    });
  }
}
