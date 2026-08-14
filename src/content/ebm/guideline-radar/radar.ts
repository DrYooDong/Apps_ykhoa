/**
 * CliniPortal — Guideline Radar Diff Viewer Module (TypeScript)
 * Powers radar.html with diff comparison, bookmarking, and specialty filters.
 */
import { RadarUpdateItem } from '../types';

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
      btn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
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
  const feedList = document.getElementById('radar-feed-list');
  const timelineList = document.getElementById('radar-timeline-list');

  // Toggle View Modes
  modeBtnDiff?.addEventListener('click', () => {
    modeBtnDiff.classList.add('active');
    modeBtnTimeline?.classList.remove('active');
    if (feedList) feedList.style.display = 'block';
    if (timelineList) timelineList.style.display = 'none';
  });

  modeBtnTimeline?.addEventListener('click', () => {
    modeBtnTimeline.classList.add('active');
    modeBtnDiff?.classList.remove('active');
    if (feedList) feedList.style.display = 'none';
    if (timelineList) timelineList.style.display = 'block';
  });

  // Filter Pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterCards();
    });
  });

  function filterCards() {
    const query = searchInput?.value.toLowerCase().trim() || '';
    const activePill = document.querySelector('.filter-pill.active') as HTMLElement | null;
    const spec = activePill?.dataset.spec || 'all';

    document.querySelectorAll('.radar-diff-card').forEach(card => {
      const cardEl = card as HTMLElement;
      const text = cardEl.textContent?.toLowerCase() || '';
      const cardSpec = cardEl.dataset.spec || '';

      const matchSpec = (spec === 'all' || cardSpec === spec);
      const matchQuery = (!query || text.includes(query));

      if (matchSpec && matchQuery) {
        cardEl.style.display = 'block';
      } else {
        cardEl.style.display = 'none';
      }
    });
  }

  searchInput?.addEventListener('input', filterCards);

  // Bookmark button clicks
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cardId = btn.getAttribute('data-card-id');
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

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGuidelineRadar);
  } else {
    initGuidelineRadar();
  }
}
