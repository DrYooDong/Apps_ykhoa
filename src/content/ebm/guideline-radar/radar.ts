/**
 * CliniPortal — Guideline Radar Diff Viewer Controller (TypeScript)
 * Path: src/content/ebm/guideline-radar/radar.ts
 */

const RADAR_STORAGE_KEY = 'cliniportal_radar_saved';

export function getSavedRadarCards(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RADAR_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveRadarCard(id: string): void {
  const saved = getSavedRadarCards();
  if (!saved.includes(id)) {
    saved.push(id);
    localStorage.setItem(RADAR_STORAGE_KEY, JSON.stringify(saved));
  }
  updateBookmarkUI();
}

export function removeRadarCard(id: string): void {
  let saved = getSavedRadarCards();
  saved = saved.filter(item => item !== id);
  localStorage.setItem(RADAR_STORAGE_KEY, JSON.stringify(saved));
  updateBookmarkUI();
}

export function updateBookmarkUI(): void {
  const saved = getSavedRadarCards();
  const savedCountBadge = document.getElementById('saved-count-badge');
  if (savedCountBadge) savedCountBadge.textContent = saved.length.toString();

  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    const cardId = btn.getAttribute('data-card-id');
    if (!cardId) return;

    if (saved.includes(cardId)) {
      btn.classList.add('saved');
      btn.innerHTML = '<i class="fa-solid fa-bookmark" style="color:#f59e0b;"></i>';
      (btn as HTMLElement).title = 'Đã lưu (Bấm để hủy)';
    } else {
      btn.classList.remove('saved');
      btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
      (btn as HTMLElement).title = 'Lưu thông báo này';
    }
  });
}

export function initGuidelineRadar(): void {
  const searchInput = document.getElementById('radar-search-input') as HTMLInputElement | null;
  const filterPills = document.querySelectorAll('.filter-pill');
  const modeBtnDiff = document.getElementById('view-mode-diff');
  const modeBtnTimeline = document.getElementById('view-mode-timeline');
  const modeBtnMatrix = document.getElementById('view-mode-matrix');
  const feedList = document.getElementById('radar-feed-list');
  const timelineList = document.getElementById('radar-timeline-list');
  const matrixList = document.getElementById('radar-matrix-list');

  // Toggle View Modes
  modeBtnDiff?.addEventListener('click', () => {
    [modeBtnDiff, modeBtnTimeline, modeBtnMatrix].forEach(b => b?.classList.remove('active'));
    modeBtnDiff.classList.add('active');
    if (feedList) feedList.style.display = 'flex';
    if (timelineList) timelineList.style.display = 'none';
    if (matrixList) matrixList.style.display = 'none';
  });

  modeBtnTimeline?.addEventListener('click', () => {
    [modeBtnDiff, modeBtnTimeline, modeBtnMatrix].forEach(b => b?.classList.remove('active'));
    modeBtnTimeline.classList.add('active');
    if (feedList) feedList.style.display = 'none';
    if (timelineList) timelineList.style.display = 'block';
    if (matrixList) matrixList.style.display = 'none';
  });

  modeBtnMatrix?.addEventListener('click', () => {
    [modeBtnDiff, modeBtnTimeline, modeBtnMatrix].forEach(b => b?.classList.remove('active'));
    modeBtnMatrix.classList.add('active');
    if (feedList) feedList.style.display = 'none';
    if (timelineList) timelineList.style.display = 'none';
    if (matrixList) matrixList.style.display = 'block';
  });

  // Filter Function
  const filterCards = () => {
    const query = searchInput?.value.toLowerCase().trim() || '';
    const activePill = document.querySelector('.filter-pill.active') as HTMLElement | null;
    const filterType = activePill?.getAttribute('data-filter-type') || 'spec';
    const filterVal = activePill?.getAttribute('data-filter-val') || 'all';
    const saved = getSavedRadarCards();

    document.querySelectorAll('.radar-card').forEach(card => {
      const cardEl = card as HTMLElement;
      const text = cardEl.textContent?.toLowerCase() || '';
      const cardSpec = cardEl.getAttribute('data-spec') || '';
      const cardCor = cardEl.getAttribute('data-cor') || '';
      const cardId = cardEl.getAttribute('data-card-id') || '';

      let matchFilter = true;
      if (filterType === 'spec' && filterVal !== 'all') {
        matchFilter = cardSpec.includes(filterVal);
      } else if (filterType === 'cor') {
        matchFilter = cardCor === filterVal;
      } else if (filterType === 'saved') {
        matchFilter = saved.includes(cardId);
      }

      const matchQuery = !query || text.includes(query);
      cardEl.style.display = (matchFilter && matchQuery) ? 'block' : 'none';
    });
  };

  // Filter Pills Events
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterCards();
    });
  });

  searchInput?.addEventListener('input', filterCards);

  // Heatmap Click Events
  document.querySelectorAll('.heatmap-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      const cor = cell.getAttribute('data-heatmap-cor');
      const loe = cell.getAttribute('data-heatmap-loe');

      document.querySelectorAll('.radar-card').forEach(card => {
        const cardEl = card as HTMLElement;
        const cardCor = cardEl.getAttribute('data-cor');
        const cardLoe = cardEl.getAttribute('data-loe');

        const match = (!cor || cardCor === cor) && (!loe || cardLoe === loe);
        cardEl.style.display = match ? 'block' : 'none';
      });

      // Switch to diff feed view
      modeBtnDiff?.click();
    });
  });

  // Deep Dive Toggles
  document.querySelectorAll('.toggle-deepdive-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = (e.currentTarget as HTMLElement).closest('.radar-card');
      const deepdive = card?.querySelector('.deepdive-content') as HTMLElement | null;
      if (deepdive) {
        const isHidden = deepdive.style.display === 'none' || !deepdive.style.display;
        deepdive.style.display = isHidden ? 'block' : 'none';
      }
    });
  });

  // Bookmarking Events
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cardId = (e.currentTarget as HTMLElement).getAttribute('data-card-id');
      if (!cardId) return;

      const saved = getSavedRadarCards();
      if (saved.includes(cardId)) {
        removeRadarCard(cardId);
      } else {
        saveRadarCard(cardId);
      }
    });
  });

  updateBookmarkUI();
}
