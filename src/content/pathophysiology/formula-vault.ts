/**
 * CliniPortal — Physiology Formula Vault Controller (TypeScript Module)
 * Powers formula-vault.html with interactive dynamic calculators.
 */
import { PHYSIO_FORMULAS_DATA } from './data';
import { PhysioFormula } from './types';

export function initFormulaVault(): void {
  const container = document.getElementById('formula-container') || document.getElementById('formula-vault-container') || document.getElementById('formulas-list');
  const searchInput = document.getElementById('formula-search') as HTMLInputElement | null;
  const categoryFilter = document.getElementById('formula-category-filter') as HTMLSelectElement | null;

  if (!container) return;

  function renderFormulas(list: PhysioFormula[]) {
    if (!container) return;

    if (list.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:3rem; color:var(--color-text-muted);">
          <i class="fa-solid fa-calculator" style="font-size:2.5rem; margin-bottom:1rem; opacity:0.5;"></i>
          <h3>Không tìm thấy công thức phù hợp</h3>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(f => {
      const inputsHtml = f.variables.map(v => `
        <div class="input-group" style="display:flex; flex-direction:column; gap:0.25rem;">
          <label style="font-size:0.8rem; font-weight:600; color:var(--color-text);">${v.label} (${v.unit})</label>
          <input type="number" step="any" class="formula-var-input" data-var="${v.name}" data-formula-id="${f.id}" value="${v.defaultValue ?? 0}" style="padding:0.4rem 0.6rem; border:1px solid var(--color-divider); border-radius:6px; background:var(--color-surface); color:var(--color-text); font-size:0.85rem;">
        </div>
      `).join('');

      return `
        <div class="formula-card" id="formula-card-${f.id}" style="background:var(--color-surface); border:1px solid var(--color-divider); border-radius:12px; padding:1.25rem; margin-bottom:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
            <div>
              <span class="badge" style="background:rgba(2,132,199,0.15); color:var(--color-primary); font-size:0.75rem; font-weight:700; padding:0.2rem 0.5rem; border-radius:4px;">${f.category}</span>
              <h3 style="margin:0.35rem 0 0; font-size:1.1rem; color:var(--color-text);">${f.name}</h3>
            </div>
            <span style="font-size:0.8rem; font-family:monospace; color:var(--color-text-muted);">ID: ${f.id}</span>
          </div>

          <div style="background:var(--color-surface-2, #f8fafc); border:1px dashed var(--color-divider); border-radius:8px; padding:0.75rem 1rem; margin-bottom:1rem; font-family:monospace; font-weight:700; color:var(--color-primary); font-size:0.9rem;">
            ${f.formula}
          </div>

          <div class="inputs-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:0.75rem; margin-bottom:1rem;">
            ${inputsHtml}
          </div>

          <div style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:0.75rem 1rem; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-weight:700; font-size:0.9rem; color:#047857;">Kết Quả Tính Toán:</span>
            <span class="formula-result-display" id="res-${f.id}" style="font-size:1.15rem; font-weight:800; color:#065f46;">-- ${f.unit}</span>
          </div>
        </div>
      `;
    }).join('');

    // Attach calculate listeners
    list.forEach(f => {
      const inputs = container.querySelectorAll(`input[data-formula-id="${f.id}"]`);
      function recalc() {
        const inputVals: Record<string, number> = {};
        inputs.forEach(inp => {
          const varName = (inp as HTMLElement).dataset.var;
          if (varName) {
            inputVals[varName] = parseFloat((inp as HTMLInputElement).value) || 0;
          }
        });
        const res = f.calculate(inputVals);
        const resEl = document.getElementById(`res-${f.id}`);
        if (resEl) {
          resEl.textContent = `${Number.isFinite(res) ? res.toFixed(2) : '--'} ${f.unit}`;
        }
      }

      inputs.forEach(inp => inp.addEventListener('input', recalc));
      recalc();
    });
  }

  function filterList() {
    const q = searchInput?.value.toLowerCase().trim() || '';
    const cat = categoryFilter?.value || 'all';

    const filtered = PHYSIO_FORMULAS_DATA.filter(f => {
      if (cat !== 'all' && f.category !== cat) return false;
      if (!q) return true;
      return f.name.toLowerCase().includes(q) || f.formula.toLowerCase().includes(q);
    });

    renderFormulas(filtered);
  }

  searchInput?.addEventListener('input', filterList);
  categoryFilter?.addEventListener('change', filterList);

  renderFormulas(PHYSIO_FORMULAS_DATA);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormulaVault);
  } else {
    initFormulaVault();
  }
}
