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
                <button class="btn-flow-control" id="btn-zoom-out" title="Thu nhỏ" aria-label="Thu nhỏ lưu đồ">
                    <i class="fa-solid fa-minus"></i>
                </button>
                <button class="btn-flow-control" id="btn-zoom-reset" title="Mặc định" aria-label="Khôi phục kích thước lưu đồ">
                    <i class="fa-solid fa-expand"></i>
                </button>
                <button class="btn-flow-control" id="btn-zoom-in" title="Phóng to" aria-label="Phóng to lưu đồ">
                    <i class="fa-solid fa-plus"></i>
                </button>
                <div style="width: 1px; height: 24px; background: #cbd5e1; margin: 0 4px;"></div>
                <button class="btn-flow-control" id="btn-print" title="In lưu đồ" aria-label="In hoặc lưu PDF lưu đồ">
                    <i class="fa-solid fa-print"></i> In / Xuất PDF
                </button>
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

/**
 * Initialize zoom and pan for the flowchart canvas
 */
function initZoomPan() {
    const wrappers = document.querySelectorAll('.flow-canvas-wrapper');
    if (wrappers.length === 0) return;

    wrappers.forEach(wrapper => {
        let scale = 1;
        let isDragging = false;
        let startX, startY;
        let translateX = 0, translateY = 0;

        wrapper.style.overflow = 'hidden';
        wrapper.style.cursor = 'grab';

        const updateTransform = () => {
            const activePane = wrapper.querySelector('.flow-pane.active');
            if (activePane) {
                activePane.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
                activePane.style.transformOrigin = 'center top';
            }
        };

        const resetTransform = () => {
            scale = 1; translateX = 0; translateY = 0;
            updateTransform();
        };

        // Reset transform when switching panes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class' && mutation.target.classList.contains('active')) {
                   resetTransform();
                }
            });
        });

        wrapper.querySelectorAll('.flow-pane').forEach(pane => {
            pane.style.transition = 'transform 0.1s ease-out';
            observer.observe(pane, { attributes: true });
        });

        wrapper.addEventListener('mousedown', (e) => {
            // Ignore if clicking on interactive elements
            if (e.target.closest('.fnode') || e.target.closest('.flow-connector-label') || e.target.closest('button')) return;
            isDragging = true;
            wrapper.style.cursor = 'grabbing';
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateTransform();
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                wrapper.style.cursor = 'grab';
            }
        });

        wrapper.addEventListener('wheel', (e) => {
            if (e.target.closest('.fnode-details')) return; // Allow scrolling inside details
            e.preventDefault();
            const zoomSpeed = 0.05;
            if (e.deltaY < 0) {
                scale += zoomSpeed;
            } else {
                scale -= zoomSpeed;
            }
            scale = Math.min(Math.max(0.4, scale), 2.5); // Limit zoom
            updateTransform();
        }, { passive: false });

        // Bind buttons
        const btnZoomIn = document.getElementById('btn-zoom-in');
        const btnZoomOut = document.getElementById('btn-zoom-out');
        const btnZoomReset = document.getElementById('btn-zoom-reset');
        const btnPrint = document.getElementById('btn-print');

        if (btnZoomIn) btnZoomIn.addEventListener('click', () => { scale = Math.min(2.5, scale + 0.1); updateTransform(); });
        if (btnZoomOut) btnZoomOut.addEventListener('click', () => { scale = Math.max(0.4, scale - 0.1); updateTransform(); });
        if (btnZoomReset) btnZoomReset.addEventListener('click', resetTransform);
        
        if (btnPrint) btnPrint.addEventListener('click', () => {
            expandAll(); // Mở rộng tất cả trước khi in
            setTimeout(() => window.print(), 300);
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

    // 4. Init zoom and pan
    initZoomPan();
});
