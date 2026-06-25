// ══════════════════════════════════════════
//  CLINICAL FLOWCHART CORE SCRIPTS
//  Shared JS for Flowchart/Algorithm interfaces
// ══════════════════════════════════════════

/**
 * Switch active flowchart pane (tab switching)
 * @param {string} id - The ID suffix of the pane to switch to (e.g. 'hepa', 'chole')
 */
function switchPane(id) {
    document.querySelectorAll('.flow-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.flow-tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
    });

    const targetPane = document.getElementById('pane-' + id);
    const targetBtn = document.getElementById('tab-btn-' + id);

    if (targetPane) {
        targetPane.classList.add('active');
    }
    if (targetBtn) {
        targetBtn.classList.add('active');
        targetBtn.setAttribute('aria-selected', 'true');
    }
}

/**
 * Toggle active flowchart node details panel (expand/collapse)
 * @param {HTMLElement} el - The node HTML element containing details
 */
function toggleNode(el) {
    const details = el.querySelector('.fnode-details');
    if (!details) return;
    const isOpen = details.classList.contains('open');
    details.classList.toggle('open', !isOpen);
    el.classList.toggle('expanded', !isOpen);
}

// Auto-bind enter key to calculation triggers if present
document.addEventListener('DOMContentLoaded', () => {
    const rInputs = document.querySelectorAll('.r-field input');
    if (rInputs.length > 0) {
        rInputs.forEach(inp => {
            inp.addEventListener('keydown', e => {
                if (e.key === 'Enter') {
                    // Check if calcR function exists in page-specific scope
                    if (typeof calcR === 'function') {
                        calcR();
                    }
                }
            });
        });
    }
});
