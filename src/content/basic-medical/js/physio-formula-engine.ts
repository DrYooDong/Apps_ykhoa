/**
 * CliniPortal Physiology - Formula Vault Interactive Engine (TypeScript)
 * Reads formula-vault.json & renders live dynamic calculators
 */

export interface FormulaVariable {
  code: string;
  name: string;
  unit: string;
  default: number;
}

export interface FormulaItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  latex: string;
  variables: FormulaVariable[];
  result_unit: string;
  calculation: string;
  explanation: string;
  clinical_pearl?: string;
}

export class PhysioFormulaEngine {
  private static formulaData: FormulaItem[] = [];

  public static async init(containerId: string, jsonPath: string = 'data/formula-vault.json'): Promise<void> {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
      const resp = await fetch(jsonPath);
      const data = await resp.json();
      this.formulaData = data.formulas || [];
      this.renderFormulas(container, this.formulaData);
    } catch (err) {
      console.error('PhysioFormulaEngine fetch failed, trying XHR:', err);
      const xhr = new XMLHttpRequest();
      xhr.open('GET', jsonPath, true);
      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 0) {
          const data = JSON.parse(xhr.responseText);
          this.formulaData = data.formulas || [];
          this.renderFormulas(container, this.formulaData);
        }
      };
      xhr.send();
    }
  }

  public static renderFormulas(container: HTMLElement, formulas: FormulaItem[]): void {
    let html = '';

    formulas.forEach(f => {
      html += `
      <div class="formula-card physio-step-card" id="card-${f.id}">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="quiz-badge">${f.category}</span>
          <span style="font-size:0.8rem; color:var(--color-text-muted);">ID: ${f.id}</span>
        </div>
        <h3 style="color: var(--color-primary); margin-top: 0.5rem; margin-bottom: 0.25rem;">${f.name}</h3>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.75rem;">${f.subtitle}</p>

        <div class="formula-expr" style="background: var(--color-primary-hl); padding: 0.75rem; border-radius: 8px; text-align: center; margin-bottom: 1rem;">
          $$\\displaystyle ${f.latex}$$
        </div>

        <!-- Calculator Inputs -->
        <div class="calculator-box" style="background: var(--color-bg); padding: 1rem; border-radius: 8px; border: 1px stroke var(--color-border); margin-bottom: 1rem;">
          <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--color-text);">🧮 Máy tính Tính toán Tức thì:</div>
          <div class="inputs-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem;">
            ${f.variables.map(v => `
              <div>
                <label style="display:block; font-size:0.8rem; color:var(--color-text-muted); margin-bottom:0.2rem;">${v.name} (${v.unit}):</label>
                <input type="number" id="input-${f.id}-${v.code}" value="${v.default}" step="0.1" 
                       oninput="window.PhysioFormulaEngine.recalculate('${f.id}')"
                       style="width: 100%; padding: 0.4rem 0.6rem; border-radius: 6px; border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text);">
              </div>
            `).join('')}
          </div>

          <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px dashed var(--color-border); display: flex; align-items: center; justify-content: space-between;">
            <span style="font-weight: 600; color: var(--color-primary);">Kết quả Tính toán:</span>
            <span id="result-${f.id}" style="font-size: 1.25rem; font-weight: 700; color: var(--color-success);">-- ${f.result_unit}</span>
          </div>
        </div>

        <p class="formula-desc" style="font-size:0.9rem;">
          <strong>Ý nghĩa:</strong> ${f.explanation}
        </p>

        ${f.clinical_pearl ? `
        <div class="clinical-pearl" style="margin-top: 0.75rem; font-size: 0.85rem;">
          💎 <strong>Pearl Lâm sàng:</strong> ${f.clinical_pearl}
        </div>
        ` : ''}
      </div>
      `;
    });

    container.innerHTML = html;

    // Initial calculation & MathJax Typeset
    formulas.forEach(f => this.recalculate(f.id));

    const win = window as any;
    if (win.MathJax && win.MathJax.typesetPromise) {
      win.MathJax.typesetPromise();
    }
  }

  public static recalculate(formulaId: string): void {
    const formula = this.formulaData.find(f => f.id === formulaId);
    if (!formula) return;

    const argNames = formula.variables.map(v => v.code);
    const argValues = formula.variables.map(v => {
      const el = document.getElementById(`input-${formula.id}-${v.code}`) as HTMLInputElement | null;
      return el ? parseFloat(el.value) || 0 : v.default;
    });

    let res: number = 0;
    try {
      const calcFunc = new Function(...argNames, `return ${formula.calculation};`);
      res = calcFunc(...argValues);
    } catch (e) {
      console.error('Calculation error for formula', formulaId, e);
    }

    const resEl = document.getElementById(`result-${formula.id}`);
    if (resEl) {
      const formatted = isNaN(res) ? '--' : (Math.round(res * 100) / 100).toString();
      resEl.textContent = `${formatted} ${formula.result_unit}`;
    }
  }
}

// Attach to window for global inline accessibility
if (typeof window !== 'undefined') {
  (window as any).PhysioFormulaEngine = PhysioFormulaEngine;
}
