/**
 * CliniPortal Physiology & Clinical Calculators - Formula Vault Interactive Engine
 * Reads formula-vault.json & renders live dynamic calculators with search & filtering
 */

window.PhysioFormulaEngine = (function () {
  'use strict';

  let formulaData = [];
  let currentCategory = 'all';
  let searchQuery = '';

  async function init(containerId, jsonPath = 'data/formula-vault.json') {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
      const resp = await fetch(jsonPath);
      const data = await resp.json();
      formulaData = data.formulas || [];
      setupFilterEvents(container);
      renderFormulas(container);
    } catch (err) {
      console.warn('PhysioFormulaEngine fetch failed, trying XHR:', err);
      const xhr = new XMLHttpRequest();
      xhr.open('GET', jsonPath, true);
      xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 0) {
          const data = JSON.parse(xhr.responseText);
          formulaData = data.formulas || [];
          setupFilterEvents(container);
          renderFormulas(container);
        }
      };
      xhr.send();
    }
  }

  function setupFilterEvents(container) {
    const searchInput = document.getElementById('formula-search');
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        searchQuery = (e.target.value || '').toLowerCase().trim();
        renderFormulas(container);
      });
    }

    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
      chip.addEventListener('click', function () {
        filterChips.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.getAttribute('data-category') || 'all';
        renderFormulas(container);
      });
    });
  }

  function getFilteredFormulas() {
    return formulaData.filter(f => {
      const matchesCat = currentCategory === 'all' || f.category.toLowerCase() === currentCategory.toLowerCase();
      const matchesSearch = !searchQuery || 
        f.name.toLowerCase().includes(searchQuery) ||
        f.subtitle.toLowerCase().includes(searchQuery) ||
        f.category.toLowerCase().includes(searchQuery) ||
        f.explanation.toLowerCase().includes(searchQuery);
      return matchesCat && matchesSearch;
    });
  }

  function renderFormulas(container) {
    const filtered = getFilteredFormulas();

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
            <span class="formula-category-badge">${escapeHtml(f.category)}</span>
            <span class="formula-id-tag">${escapeHtml(f.id)}</span>
          </div>
          <h3 class="formula-title">${escapeHtml(f.name)}</h3>
          <p class="formula-subtitle">${escapeHtml(f.subtitle)}</p>

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
              ${f.variables.map(v => `
                <div class="input-field-group">
                  <label class="input-label" for="input-${f.id}-${v.code}">${escapeHtml(v.name)} ${v.unit ? `(${v.unit})` : ''}</label>
                  <input type="number" 
                         id="input-${f.id}-${v.code}" 
                         class="calc-input-elem" 
                         value="${v.default}" 
                         step="any" 
                         oninput="PhysioFormulaEngine.recalculate('${f.id}')">
                </div>
              `).join('')}
            </div>

            <div class="result-bar">
              <span class="result-label-text">Kết quả Tính toán:</span>
              <span id="result-${f.id}" class="result-value-text">-- ${escapeHtml(f.result_unit)}</span>
            </div>
          </div>

          <div class="formula-explanation">
            <strong>Ý nghĩa:</strong> ${f.explanation}
          </div>
        </div>

        ${f.clinical_pearl ? `
        <div class="clinical-pearl-box">
          <span class="clinical-pearl-title">💎 Pearl Lâm sàng:</span>
          ${f.clinical_pearl}
        </div>
        ` : ''}
      </div>
      `;
    });

    container.innerHTML = html;

    // Recalculate values for rendered cards
    filtered.forEach(f => recalculate(f.id));

    // Request MathJax typeset update if available
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([container]).catch(err => console.warn('MathJax error:', err));
    }
  }

  function recalculate(formulaId) {
    const formula = formulaData.find(f => f.id === formulaId);
    if (!formula) return;

    const argNames = formula.variables.map(v => v.code);
    const argValues = formula.variables.map(v => {
      const el = document.getElementById(`input-${formulaId}-${v.code}`);
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

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  return {
    init: init,
    recalculate: recalculate
  };
})();
