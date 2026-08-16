/**
 * CliniPortal — Drug Search & Drug Passport SPA View (TypeScript)
 * Path: src/content/pharmacology/tools/drug-search-view.ts
 */

import { DRUGS_DB_DATA } from '../data';
import { openDrugPassport } from '../renderer';

export function renderDrugSearchView(): string {
  // Trigger DOM initialization after render
  setTimeout(() => {
    initDrugSearchDOM();
  }, 50);

  return `
    <div class="drug-search-container animate-fade-in" style="max-width: 1440px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/pharmacology" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Dược Lý Lâm Sàng</a> / Tra Cứu Dược Thư
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #db2777; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-book-medical"></i> Tra Cứu Dược Thư Lâm Sàng & Drug Passport
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Tra cứu liều dùng, chỉnh liều theo chức năng thận/gan, chống chỉ định, tương tác nguy cơ cao và Drug Passport tương tác.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/pharmacology/ma-tran-tuong-tac" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-table-cells" style="color: #dc2626;"></i> Ma Trận Tương Tác
          </a>
          <a href="#/pharmacology/dose-optimizer" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-calculator" style="color: #0284c7;"></i> Tối Ưu Hóa Liều
          </a>
          <a href="#/pharmacology/pk-simulator" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-chart-line" style="color: #7c3aed;"></i> Giả Lập PK
          </a>
        </div>
      </div>

      <!-- Search & Filters -->
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
        <div style="display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 1rem; align-items: center;">
          <div style="position: relative;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8;"></i>
            <input type="text" id="drug-search-input" placeholder="Tìm kiếm theo tên thuốc, hoạt chất, biệt dược (VD: Augmentin, Enoxaparin, Metformin...)..." 
              style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; font-size: 0.95rem;" />
          </div>

          <div>
            <select id="drug-category-filter" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; font-size: 0.9rem;">
              <option value="all">Tất cả nhóm dược lý</option>
              <option value="Kháng sinh">Kháng sinh & Kháng khuẩn</option>
              <option value="Tim mạch">Tim mạch & Chống đông</option>
              <option value="Nội tiết">Nội tiết & Đái tháo đường</option>
              <option value="Giảm đau">Giảm đau & Kháng viêm</option>
              <option value="Hô hấp">Hô hấp & Kháng Histamin</option>
            </select>
          </div>

          <div>
            <select id="drug-route-filter" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; font-size: 0.9rem;">
              <option value="all">Tất cả đường dùng</option>
              <option value="PO">Đường uống (PO)</option>
              <option value="IV">Tiêm tĩnh mạch (IV)</option>
              <option value="SC">Tiêm dưới da (SC)</option>
            </select>
          </div>

          <div>
            <span id="drug-result-count" style="font-size: 0.85rem; font-weight: 700; color: #db2777; background: #fce7f3; padding: 0.75rem 1rem; border-radius: 8px; white-space: nowrap; display: inline-block;">
              ${DRUGS_DB_DATA.length} thuốc
            </span>
          </div>
        </div>
      </div>

      <!-- Drugs Grid -->
      <div id="drugs-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.25rem;">
        <!-- Filled by initDrugSearchDOM -->
      </div>
    </div>
  `;
}

function initDrugSearchDOM(): void {
  const searchInput = document.getElementById('drug-search-input') as HTMLInputElement | null;
  const categoryFilter = document.getElementById('drug-category-filter') as HTMLSelectElement | null;
  const routeFilter = document.getElementById('drug-route-filter') as HTMLSelectElement | null;
  const resultsContainer = document.getElementById('drugs-grid');
  const countBadge = document.getElementById('drug-result-count');

  if (!resultsContainer) return;

  function renderGrid() {
    if (!resultsContainer) return;
    const q = searchInput?.value.toLowerCase().trim() || '';
    const cat = categoryFilter?.value || 'all';
    const route = routeFilter?.value || 'all';

    const filtered = DRUGS_DB_DATA.filter(drug => {
      const matchQ = !q || 
        drug.name.toLowerCase().includes(q) || 
        drug.brandNames.some(b => b.toLowerCase().includes(q)) ||
        drug.drugClass.toLowerCase().includes(q) ||
        drug.category.toLowerCase().includes(q);

      const matchCat = cat === 'all' || drug.category.toLowerCase().includes(cat.toLowerCase());
      const matchRoute = route === 'all' || drug.routes.some(r => r.toUpperCase() === route.toUpperCase());

      return matchQ && matchCat && matchRoute;
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} thuốc`;
    }

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #64748b;">
          <i class="fa-solid fa-pills" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
          <h3>Không tìm thấy thuốc phù hợp</h3>
          <p>Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map(drug => `
      <div class="drug-card" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; gap: 0.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: transform 0.2s, box-shadow 0.2s;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span style="background: #fce7f3; color: #db2777; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px;">${drug.category}</span>
            <span style="font-size: 0.75rem; color: #64748b;">Thai kỳ: <strong>${drug.pregnancyCategory}</strong></span>
          </div>
          <h3 style="margin: 0 0 0.25rem; font-size: 1.1rem; color: var(--color-text, #0f172a); font-weight: 700;">${drug.name}</h3>
          <p style="margin: 0 0 0.5rem; font-size: 0.825rem; color: #64748b;">Biệt dược: ${drug.brandNames.join(', ')}</p>
          <div style="font-size: 0.85rem; color: #334155; line-height: 1.4; margin-bottom: 0.5rem;">
            <strong>Chỉ định:</strong> ${drug.indications.slice(0, 2).join('; ')}...
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #e2e8f0; padding-top: 0.75rem; margin-top: 0.25rem;">
          <span style="font-size: 0.8rem; color: #64748b;"><i class="fa-solid fa-syringe"></i> ${drug.routes.join(', ')}</span>
          <button class="btn-passport-open" data-drug-id="${drug.id}" style="background: #db2777; color: #fff; border: none; padding: 0.4rem 0.85rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem;">
            <i class="fa-solid fa-id-card"></i> Drug Passport
          </button>
        </div>
      </div>
    `).join('');

    resultsContainer.querySelectorAll('.btn-passport-open').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const drugId = (e.currentTarget as HTMLElement).getAttribute('data-drug-id');
        if (drugId) openDrugPassport(drugId);
      });
    });
  }

  searchInput?.addEventListener('input', renderGrid);
  categoryFilter?.addEventListener('change', renderGrid);
  routeFilter?.addEventListener('change', renderGrid);

  renderGrid();
}
