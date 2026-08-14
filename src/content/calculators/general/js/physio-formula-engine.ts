/**
 * CliniPortal Physiology & Clinical Calculators - Formula Vault Interactive Engine (TypeScript Module)
 * Reads formula-vault.json & renders live dynamic calculators with search & filtering
 */

export interface FormulaVariable {
  code: string;
  name: string;
  unit?: string;
  default: number;
}

export interface FormulaItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  latex: string;
  calculate_js: string;
  result_unit: string;
  explanation: string;
  clinical_pearl?: string;
  variables: FormulaVariable[];
}

export interface FormulaDataResponse {
  formulas: FormulaItem[];
}

export class PhysioFormulaEngineService {
  private formulaData: FormulaItem[] = [];
  private currentCategory: string = 'all';
  private searchQuery: string = '';

  public async init(containerId: string, jsonPath: string = 'data/formula-vault.json'): Promise<void> {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
      const resp = await fetch(jsonPath);
      const data: FormulaDataResponse = await resp.json();
      this.formulaData = data.formulas || [];
      this.setupFilterEvents(container);
      this.renderFormulas(container);
    } catch (err) {
      console.warn('PhysioFormulaEngine fetch failed, trying XHR:', err);
      const xhr = new XMLHttpRequest();
      xhr.open('GET', jsonPath, true);
      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 0) {
          const data: FormulaDataResponse = JSON.parse(xhr.responseText);
          this.formulaData = data.formulas || [];
          this.setupFilterEvents(container);
          this.renderFormulas(container);
        }
      };
      xhr.send();
    }
  }

  private setupFilterEvents(container: HTMLElement): void {
    const searchInput = document.getElementById('formula-search') as HTMLInputElement | null;
    if (searchInput) {
      searchInput.addEventListener('input', (e: Event) => {
        this.searchQuery = ((e.target as HTMLInputElement).value || '').toLowerCase().trim();
        this.renderFormulas(container);
      });
    }

    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.currentCategory = chip.getAttribute('data-category') || 'all';
        this.renderFormulas(container);
      });
    });
  }

  private getFilteredFormulas(): FormulaItem[] {
    return this.formulaData.filter(f => {
      const matchesCat =
        this.currentCategory === 'all' || f.category.toLowerCase() === this.currentCategory.toLowerCase();
      const matchesSearch =
        !this.searchQuery ||
        f.name.toLowerCase().includes(this.searchQuery) ||
        f.subtitle.toLowerCase().includes(this.searchQuery) ||
        f.category.toLowerCase().includes(this.searchQuery) ||
        f.explanation.toLowerCase().includes(this.searchQuery);
      return matchesCat && matchesSearch;
    });
  }

  public renderFormulas(container: HTMLElement): void {
    const filtered = this.getFilteredFormulas();

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="vault-empty-state" style="grid-column: 1 / -1;">
          <div class="vault-empty-icon">🔍</div>
          <h3>Không tìm thấy công thức sinh lý phù hợp</h3>
          <p>Thử tìm kiếm với từ khóa khác hoặc bỏ lọc danh mục.</p>
        </div>
      `;
      return;
    }

    let html = '';
    filtered.forEach(f => {
      html += `
      <div class="formula-card" id="card-${f.id}">
        <div>
          <div class="formula-card-header">
            <span class="formula-category-badge">${this.escapeHtml(f.category)}</span>
            <span class="formula-id-tag">${this.escapeHtml(f.id)}</span>
          </div>
          <h3 class="formula-title">${this.escapeHtml(f.name)}</h3>
          <p class="formula-subtitle">${this.escapeHtml(f.subtitle)}</p>

          <div class="formula-expr" title="Cuộn ngang nếu công thức dài">
            $$\\displaystyle ${f.latex}$$
          </div>

          <!-- Calculator Inputs Box -->
          <div class="calculator-box">
            <div class="calc-box-title">
              <span>🧮</span>
              <span>Máy tính Tính toán Tức thì:</span>
            </div>
            <div class="inputs-grid">
              ${f.variables
                .map(
                  v => `
                <div class="input-field-group">
                  <label class="input-label" for="input-${f.id}-${v.code}">${this.escapeHtml(v.name)} ${
                    v.unit ? `(${v.unit})` : ''
                  }</label>
                  <input type="number" 
                         id="input-${f.id}-${v.code}" 
                         class="calc-input-elem" 
                         value="${v.default}" 
                         step="any" 
                         oninput="window.PhysioFormulaEngine.recalculate('${f.id}')">
                </div>
              `
                )
                .join('')}
            </div>

            <div class="result-bar">
              <span class="result-label-text">Kết quả Tính toán:</span>
              <span id="result-${f.id}" class="result-value-text">-- ${this.escapeHtml(f.result_unit)}</span>
            </div>
          </div>

          <div class="formula-explanation">
            <strong>Ý nghĩa:</strong> ${f.explanation}
          </div>
        </div>

        ${
          f.clinical_pearl
            ? `
        <div class="clinical-pearl-box">
          <span class="clinical-pearl-title">💎 Pearl Lâm sàng:</span>
          ${f.clinical_pearl}
        </div>
        `
            : ''
        }
      </div>
      `;
    });

    container.innerHTML = html;

    // Recalculate values for rendered cards
    filtered.forEach(f => this.recalculate(f.id));

    // Request MathJax typeset update if available
    const win = window as any;
    if (win.MathJax && win.MathJax.typesetPromise) {
      win.MathJax.typesetPromise([container]).catch((err: any) => console.warn('MathJax error:', err));
    }
  }

  public recalculate(formulaId: string): void {
    const formula = this.formulaData.find(f => f.id === formulaId);
    if (!formula) return;

    const argNames = formula.variables.map(v => v.code);
    const argValues = formula.variables.map(v => {
      const el = document.getElementById(`input-${formulaId}-${v.code}`) as HTMLInputElement | null;
      return el ? parseFloat(el.value) || 0 : v.default;
    });

    try {
      const func = new Function(...argNames, formula.calculate_js);
      const res = func(...argValues);

      const resultEl = document.getElementById(`result-${formulaId}`);
      if (resultEl) {
        let displayVal = '--';
        if (typeof res === 'number') {
          displayVal = Number.isInteger(res) ? res.toString() : res.toFixed(2);
        } else {
          displayVal = res;
        }
        resultEl.innerText = `${displayVal} ${formula.result_unit}`;
      }
    } catch (e) {
      console.error('Error calculating formula:', formulaId, e);
    }
  }

  private escapeHtml(str: string): string {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

export const PhysioFormulaEngine = new PhysioFormulaEngineService();

// Global binding
if (typeof window !== 'undefined') {
  (window as any).PhysioFormulaEngine = PhysioFormulaEngine;
}
