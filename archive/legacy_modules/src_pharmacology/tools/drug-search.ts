/**
 * CliniPortal — Drug Search Tool (TypeScript Module)
 */
import { DRUGS_DB_DATA } from '../data';
import { Drug } from '../types';
import { openDrugPassport } from '../renderer';

export function initDrugSearchPage(): void {
  const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
  const categoryFilter = document.getElementById('category-filter') as HTMLSelectElement | null;
  const routeFilter = document.getElementById('route-filter') as HTMLSelectElement | null;
  const resultsContainer = document.getElementById('drugs-grid');
  const countBadge = document.getElementById('result-count');

  if (!resultsContainer) return;

  function renderGrid(drugs: Drug[]) {
    if (!resultsContainer) return;

    if (countBadge) {
      countBadge.textContent = `${drugs.length} thuốc`;
    }

    if (drugs.length === 0) {
      resultsContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--color-text-muted);">
          <i class="fa-solid fa-pills" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
          <h3>Không tìm thấy thuốc phù hợp</h3>
          <p>Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = drugs.map(drug => `
      <div class="drug-card" style="background: var(--color-surface); border: 1px solid var(--color-divider); border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; gap: 0.75rem; transition: transform 0.2s, box-shadow 0.2s;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #047857; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px;">${drug.category}</span>
            <span style="font-size: 0.75rem; color: var(--color-text-muted);">Thai kỳ: <strong>${drug.pregnancyCategory}</strong></span>
          </div>
          <h3 style="margin: 0 0 0.25rem; font-size: 1.1rem; color: var(--color-text); font-weight: 700;">${drug.name}</h3>
          <p style="margin: 0 0 0.5rem; font-size: 0.825rem; color: var(--color-text-muted);">Biệt dược: ${drug.brandNames.join(', ')}</p>
          <div style="font-size: 0.85rem; color: var(--color-text); line-height: 1.4; margin-bottom: 0.5rem;">
            <strong>Chỉ định:</strong> ${drug.indications.slice(0, 2).join('; ')}...
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--color-divider); padding-top: 0.75rem; margin-top: 0.25rem;">
          <span style="font-size: 0.8rem; color: var(--color-text-muted);"><i class="fa-solid fa-syringe"></i> ${drug.routes.join(', ')}</span>
          <button class="btn-passport" data-drug-id="${drug.id}" style="background: var(--color-primary); color: #fff; border: none; padding: 0.4rem 0.85rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-id-card"></i> Drug Passport
          </button>
        </div>
      </div>
    `).join('');

    resultsContainer.querySelectorAll('.btn-passport').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const drugId = (e.currentTarget as HTMLElement).getAttribute('data-drug-id');
        if (drugId) openDrugPassport(drugId);
      });
    });
  }

  function filterDrugs() {
    const q = searchInput?.value.toLowerCase().trim() || '';
    const cat = categoryFilter?.value || 'all';
    const route = routeFilter?.value || 'all';

    const filtered = DRUGS_DB_DATA.filter(drug => {
      if (cat !== 'all' && drug.category !== cat) return false;
      if (route !== 'all' && !drug.routes.includes(route)) return false;

      if (!q) return true;
      const combined = `${drug.name} ${drug.brandNames.join(' ')} ${drug.drugClass} ${drug.indications.join(' ')}`.toLowerCase();
      return combined.includes(q);
    });

    renderGrid(filtered);
  }

  searchInput?.addEventListener('input', filterDrugs);
  categoryFilter?.addEventListener('change', filterDrugs);
  routeFilter?.addEventListener('change', filterDrugs);

  renderGrid(DRUGS_DB_DATA);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDrugSearchPage);
  } else {
    initDrugSearchPage();
  }
}
