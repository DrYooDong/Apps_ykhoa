// ══════════════════════════════════════════
//  CLINICAL FLOWCHART CORE SCRIPTS (UPGRADED)
//  Shared JS for Flowchart/Algorithm interfaces
// ══════════════════════════════════════════

/**
 * Switch active flowchart pane (tab switching)
 * @param {string} id - The ID suffix of the pane to switch to (e.g. 'bls', 'acls')
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
    
    // Clear search and collapse all nodes in the new pane
    const searchInput = document.getElementById('flow-search-input');
    if (searchInput) {
        searchInput.value = '';
        clearSearch();
    }
    collapseAll();
}

/**
 * Toggle active flowchart node details panel (expand/collapse) with smooth transition
 * @param {HTMLElement} el - The node HTML element containing details
 */
function toggleNode(el) {
    const details = el.querySelector('.fnode-details');
    if (!details) return;

    const isOpen = el.classList.contains('expanded');
    
    if (!isOpen) {
        // Expand
        el.classList.add('expanded');
        details.style.maxHeight = details.scrollHeight + "px";
        details.style.opacity = "1";
    } else {
        // Collapse
        el.classList.remove('expanded');
        details.style.maxHeight = "0px";
        details.style.opacity = "0";
    }
}

/**
 * Expand all nodes in the active pane
 */
function expandAll() {
    const activePane = document.querySelector('.flow-pane.active');
    if (!activePane) return;
    
    activePane.querySelectorAll('.fnode.clickable').forEach(node => {
        const details = node.querySelector('.fnode-details');
        if (details) {
            node.classList.add('expanded');
            details.style.maxHeight = details.scrollHeight + "px";
            details.style.opacity = "1";
        }
    });
}

/**
 * Collapse all nodes in the active pane
 */
function collapseAll() {
    const activePane = document.querySelector('.flow-pane.active');
    if (!activePane) return;
    
    activePane.querySelectorAll('.fnode.clickable').forEach(node => {
        const details = node.querySelector('.fnode-details');
        if (details) {
            node.classList.remove('expanded');
            details.style.maxHeight = "0px";
            details.style.opacity = "0";
        }
    });
}

/**
 * Clear search effects
 */
function clearSearch() {
    document.querySelectorAll('.fnode').forEach(node => {
        node.classList.remove('search-match', 'search-dim');
    });
    collapseAll();
}

/**
 * Initialize search and global control panel dynamically
 */
function initFlowchartControls() {
    const flowTabs = document.querySelector('.flow-tabs');
    if (!flowTabs) return;

    // Create the search and controls container HTML
    const controlHtml = `
        <div class="flow-controls-panel">
            <div class="flow-search-box">
                <span class="search-icon">🔍</span>
                <input type="text" id="flow-search-input" placeholder="Tìm từ khóa lâm sàng (ví dụ: sốc, oxy, bù dịch...)" aria-label="Tìm kiếm lưu đồ">
                <button id="flow-search-clear" class="search-clear-btn" aria-label="Xóa tìm kiếm">&times;</button>
            </div>
            <div class="flow-action-buttons">
                <button class="btn-flow-control" onclick="expandAll()" title="Mở rộng tất cả node chi tiết">
                    <i class="fa-solid fa-angles-down"></i> Mở rộng tất cả
                </button>
                <button class="btn-flow-control" onclick="collapseAll()" title="Thu gọn tất cả node chi tiết">
                    <i class="fa-solid fa-angles-up"></i> Thu gọn tất cả
                </button>
            </div>
        </div>
    `;

    // Insert controls directly after the tabs switcher
    flowTabs.insertAdjacentHTML('afterend', controlHtml);

    const searchInput = document.getElementById('flow-search-input');
    const searchClear = document.getElementById('flow-search-clear');

    searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length === 0) {
            clearSearch();
            searchClear.style.display = 'none';
            return;
        }

        searchClear.style.display = 'block';
        const activePane = document.querySelector('.flow-pane.active');
        if (!activePane) return;

        activePane.querySelectorAll('.fnode').forEach(node => {
            const text = node.innerText.toLowerCase();
            if (text.includes(query)) {
                node.classList.add('search-match');
                node.classList.remove('search-dim');
                
                // Auto-expand matches
                const details = node.querySelector('.fnode-details');
                if (details) {
                    node.classList.add('expanded');
                    details.style.maxHeight = details.scrollHeight + "px";
                    details.style.opacity = "1";
                }
            } else {
                node.classList.remove('search-match');
                node.classList.add('search-dim');
                
                // Collapse non-matches
                const details = node.querySelector('.fnode-details');
                if (details) {
                    node.classList.remove('expanded');
                    details.style.maxHeight = "0px";
                    details.style.opacity = "0";
                }
            }
        });
    });

    searchClear?.addEventListener('click', () => {
        searchInput.value = '';
        clearSearch();
        searchClear.style.display = 'none';
        searchInput.focus();
    });
}

/**
 * Initialize interactive paths highlighting on connector label clicks
 */
function initInteractivePaths() {
    const labels = document.querySelectorAll('.flow-connector-label');
    
    labels.forEach(label => {
        label.style.cursor = 'pointer';
        label.setAttribute('title', 'Nhấn để làm nổi bật lộ trình này');
        
        label.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Check if already active
            const isActive = this.classList.contains('active-path');
            
            // Clear all active paths in the same branch level
            const parentBranch = this.closest('.flow-branch');
            if (parentBranch) {
                parentBranch.querySelectorAll('.flow-connector-label').forEach(lbl => {
                    lbl.classList.remove('active-path');
                    // Find associated connector lines and nodes to deactivate
                    const connector = lbl.closest('.flow-connector');
                    if (connector) {
                        connector.querySelectorAll('.flow-connector-line').forEach(line => line.classList.remove('active-line'));
                        connector.querySelectorAll('.flow-connector-arrow').forEach(arr => arr.classList.remove('active-arrow'));
                    }
                    
                    // Deactivate immediate child nodes
                    const side = lbl.closest('.flow-branch-side');
                    if (side) {
                        side.querySelectorAll('.fnode').forEach(node => node.classList.remove('active-path-node'));
                        side.querySelectorAll('.flow-connector-line').forEach(line => line.classList.remove('active-line'));
                        side.querySelectorAll('.flow-connector-arrow').forEach(arr => arr.classList.remove('active-arrow'));
                        side.querySelectorAll('.flow-connector-label').forEach(childLbl => childLbl.classList.remove('active-path'));
                    }
                });
            }
            
            if (!isActive) {
                // Activate this path
                this.classList.add('active-path');
                
                // Highlight its connector lines & arrows
                const connector = this.closest('.flow-connector');
                if (connector) {
                    connector.querySelectorAll('.flow-connector-line').forEach(line => line.classList.add('active-line'));
                    connector.querySelectorAll('.flow-connector-arrow').forEach(arr => arr.classList.add('active-arrow'));
                }
                
                // Highlight child nodes in the same branch side
                const side = this.closest('.flow-branch-side');
                if (side) {
                    side.querySelectorAll('.fnode').forEach(node => node.classList.add('active-path-node'));
                    // Highlight child connectors inside this branch side
                    side.querySelectorAll('.flow-connector-line').forEach(line => line.classList.add('active-line'));
                    side.querySelectorAll('.flow-connector-arrow').forEach(arr => arr.classList.add('active-arrow'));
                    side.querySelectorAll('.flow-connector-label').forEach(childLbl => childLbl.classList.add('active-path'));
                }
            }
        });
    });
}

// Dom loaded triggers
document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup flowchart inputs auto-binding
    const rInputs = document.querySelectorAll('.r-field input');
    if (rInputs.length > 0) {
        rInputs.forEach(inp => {
            inp.addEventListener('keydown', e => {
                if (e.key === 'Enter') {
                    if (typeof calcR === 'function') {
                        calcR();
                    }
                }
            });
        });
    }

    // 2. Init search & global controls
    initFlowchartControls();

    // 3. Init interactive path highlighting
    initInteractivePaths();
});
