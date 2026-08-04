/**
 * CliniPortal Physiology - Formula Vault Interactive Engine
 * Reads formula-vault.json & renders live dynamic calculators
 */

window.PhysioFormulaEngine = (function () {
    'use strict';

    let formulaData = [];

    async function init(containerId, jsonPath = 'data/formula-vault.json') {
        const container = document.getElementById(containerId);
        if (!container) return;

        try {
            const resp = await fetch(jsonPath);
            const data = await resp.json();
            formulaData = data.formulas || [];
            renderFormulas(container, formulaData);
        } catch (err) {
            console.error('PhysioFormulaEngine fetch failed, trying XHR:', err);
            const xhr = new XMLHttpRequest();
            xhr.open('GET', jsonPath, true);
            xhr.onload = function () {
                if (xhr.status === 200 || xhr.status === 0) {
                    const data = JSON.parse(xhr.responseText);
                    formulaData = data.formulas || [];
                    renderFormulas(container, formulaData);
                }
            };
            xhr.send();
        }
    }

    function renderFormulas(container, formulas) {
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
                                       oninput="PhysioFormulaEngine.recalculate('${f.id}')"
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
        formulas.forEach(f => recalculate(f.id));

        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise();
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
                resultEl.innerText = `${typeof res === 'number' ? res.toFixed(2) : res} ${formula.result_unit}`;
            }
        } catch (e) {
            console.error('Error calculating formula:', formulaId, e);
        }
    }

    return {
        init: init,
        recalculate: recalculate
    };
})();
