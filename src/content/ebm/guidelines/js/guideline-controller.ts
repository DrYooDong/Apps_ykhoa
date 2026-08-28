/**
 * CliniPortal — Guidelines Directory & Evidence Hub Controller (TypeScript Module)
 * Powers guidelines.html, journal-quality-analyzer.html, and kho-guidelines/*.html
 */
import { EbmGuideline } from '../../types';
import { filterGuidelines, createSpecialtyBadge, createImpactBadge } from '../../renderer';

export function openGuidelineDetail(guidelineId: string): void {
  const gData = (window as any).guidelinesData as EbmGuideline[] | undefined;
  if (!gData) return;

  const item = gData.find(g => g.id === guidelineId);
  if (!item) return;

  let modal = document.getElementById('guideline-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'guideline-detail-modal';
    modal.className = 'guideline-modal';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-backdrop" onclick="document.getElementById('guideline-detail-modal').classList.remove('active')"></div>
    <div class="modal-content" style="max-width: 720px; max-height: 85vh; overflow-y: auto; background: var(--color-surface); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--color-divider);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--color-divider); padding-bottom: 1rem; margin-bottom: 1rem;">
        <div>
          <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
            ${createSpecialtyBadge(item.specialty)}
            ${createImpactBadge(item.impact)}
          </div>
          <h2 style="margin: 0; font-size: 1.25rem; color: var(--color-text);">${item.title}</h2>
          <small style="color: var(--color-text-muted);">${item.organization} (${item.year})</small>
        </div>
        <button style="border: none; background: none; font-size: 1.5rem; cursor: pointer;" onclick="document.getElementById('guideline-detail-modal').classList.remove('active')">&times;</button>
      </div>
      <div style="font-size: 0.9rem; line-height: 1.6;">
        <h4 style="margin: 0.75rem 0 0.5rem; color: var(--color-primary);">📋 Khuyến Cáo Lâm Sàng Then Chốt</h4>
        <ul style="padding-left: 1.25rem; margin: 0 0 1rem;">
          ${item.keyPoints.map(kp => `<li>${kp}</li>`).join('')}
        </ul>
        ${item.originalUrl ? `<a href="${item.originalUrl}" target="_blank" rel="noopener" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-weight: 700; background: var(--color-primary); color: #fff;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Đọc Bài Báo Gốc / Guideline Full</a>` : ''}
      </div>
    </div>
  `;

  modal.classList.add('active');
}

export function initGuidelinesSearch(): void {
  const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
  const specFilter = document.getElementById('specialty-filter') as HTMLSelectElement | null;
  const sourceFilter = document.getElementById('source-filter') as HTMLSelectElement | null;

  function filterCards() {
    const q = searchInput?.value.toLowerCase().trim() || '';
    const spec = specFilter?.value || 'all';
    const src = sourceFilter?.value || 'all';

    document.querySelectorAll('.guideline-card, .guideline-row').forEach(card => {
      const text = card.textContent?.toLowerCase() || '';
      const cardSpec = (card as HTMLElement).dataset.spec || 'all';
      const cardSrc = (card as HTMLElement).dataset.source || 'all';

      const matchQ = !q || text.includes(q);
      const matchSpec = (spec === 'all' || cardSpec === spec);
      const matchSrc = (src === 'all' || cardSrc === src);

      if (matchQ && matchSpec && matchSrc) {
        (card as HTMLElement).style.display = '';
      } else {
        (card as HTMLElement).style.display = 'none';
      }
    });
  }

  searchInput?.addEventListener('input', filterCards);
  specFilter?.addEventListener('change', filterCards);
  sourceFilter?.addEventListener('change', filterCards);
}

export function initGuidelinesApp(): void {
  initGuidelinesSearch();

  if (typeof window !== 'undefined') {
    (window as any).openGuidelineDetail = openGuidelineDetail;
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGuidelinesApp);
  } else {
    initGuidelinesApp();
  }
}
