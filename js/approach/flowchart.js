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

// ══════════════════════════════════════════
//  CLINICAL DECISION SUPPORT SYSTEM (CDSS)
//  Emergency Resuscitation & Interactive Tools
// ══════════════════════════════════════════

let cdssTimerInterval = null;
let cdssTimerSeconds = 3600; // 60 mins default
let cdssTimerRunning = false;

function initFlowchartCDSS() {
    // 1. Inject CDSS Styles dynamically
    if (!document.getElementById('cdss-dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'cdss-dynamic-styles';
        style.textContent = `
            .cdss-action-bar {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
                margin-top: 10px;
                padding-top: 8px;
                border-top: 1px dashed rgba(2, 132, 199, 0.3);
            }
            .cdss-btn {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 4px 10px;
                font-size: 0.78rem;
                font-weight: 600;
                border-radius: 6px;
                border: 1px solid var(--color-primary, #0284c7);
                background: rgba(2, 132, 199, 0.08);
                color: var(--color-primary, #0284c7);
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .cdss-btn:hover {
                background: var(--color-primary, #0284c7);
                color: #ffffff;
                transform: translateY(-1px);
            }
            .cdss-btn-timer {
                border-color: #eab308;
                color: #d97706;
                background: rgba(234, 179, 8, 0.1);
            }
            .cdss-btn-timer:hover {
                background: #d97706;
                color: #ffffff;
            }
            .cdss-btn-fluid {
                border-color: #06b6d4;
                color: #0891b2;
                background: rgba(6, 182, 212, 0.1);
            }
            .cdss-btn-fluid:hover {
                background: #0891b2;
                color: #ffffff;
            }
            .cdss-btn-vaso {
                border-color: #ef4444;
                color: #dc2626;
                background: rgba(239, 68, 68, 0.1);
            }
            .cdss-btn-vaso:hover {
                background: #dc2626;
                color: #ffffff;
            }

            .cdss-modal-overlay {
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(15, 23, 42, 0.6);
                backdrop-filter: blur(4px);
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.25s ease;
            }
            .cdss-modal-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            .cdss-modal-card {
                background: var(--color-surface, #ffffff);
                color: var(--color-text, #1e293b);
                width: 90%;
                max-width: 520px;
                border-radius: 12px;
                box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3);
                border: 1px solid var(--color-border, #e2e8f0);
                overflow: hidden;
                transform: scale(0.95);
                transition: transform 0.25s ease;
            }
            .cdss-modal-overlay.active .cdss-modal-card {
                transform: scale(1);
            }
            .cdss-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 18px;
                background: var(--color-primary, #0284c7);
                color: #ffffff;
                font-weight: 700;
                font-size: 1rem;
            }
            .cdss-modal-close {
                background: none; border: none; color: #fff; font-size: 1.2rem; cursor: pointer; opacity: 0.8;
            }
            .cdss-modal-close:hover { opacity: 1; }
            .cdss-modal-body { padding: 18px; max-height: 75vh; overflow-y: auto; }
            .cdss-form-group { margin-bottom: 12px; }
            .cdss-form-group label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 4px; }
            .cdss-input {
                width: 100%; padding: 8px 12px; font-size: 0.9rem;
                border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px;
                background: var(--color-bg, #f8fafc); color: var(--color-text, #0f172a);
            }
            .cdss-res-box {
                margin-top: 14px; padding: 12px; border-radius: 8px;
                background: rgba(2, 132, 199, 0.08); border: 1px solid rgba(2, 132, 199, 0.2);
            }
            .cdss-timer-display {
                font-size: 2.2rem; font-weight: 800; text-align: center;
                font-family: monospace; letter-spacing: 2px; color: #dc2626; margin: 10px 0;
            }
        `;
        document.head.appendChild(style);
    }

    // 2. Inject Modal Overlay HTML
    if (!document.getElementById('cdss-modal-overlay')) {
        const modalHtml = `
            <div id="cdss-modal-overlay" class="cdss-modal-overlay" onclick="closeCdssModal(event)">
                <div class="cdss-modal-card" onclick="event.stopPropagation()">
                    <div class="cdss-modal-header">
                        <span id="cdss-modal-title">Hỗ Trợ Quyết Định Lâm Sàng (CDSS)</span>
                        <button class="cdss-modal-close" onclick="closeCdssModal()">&times;</button>
                    </div>
                    <div class="cdss-modal-body" id="cdss-modal-body">
                        <!-- Dynamic Content -->
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    // 3. Scan nodes and attach CDSS action buttons
    document.querySelectorAll('.fnode').forEach(node => {
        const text = node.innerText.toLowerCase();
        const details = node.querySelector('.fnode-details');
        if (!details) return;

        if (details.querySelector('.cdss-action-bar')) return;

        const actionBar = document.createElement('div');
        actionBar.className = 'cdss-action-bar';

        let hasAction = false;

        if (text.includes('30ml/kg') || text.includes('bù dịch') || text.includes('truyền dịch') || text.includes('crystallo')) {
            hasAction = true;
            const btn = document.createElement('button');
            btn.className = 'cdss-btn cdss-btn-fluid';
            btn.innerHTML = `<i class="fa-solid fa-droplet"></i> Tính nhanh lượng dịch`;
            btn.onclick = (e) => { e.stopPropagation(); openCdssFluidCalc(); };
            actionBar.appendChild(btn);
        }

        if (text.includes('vận mạch') || text.includes('noradrenaline') || text.includes('adrenaline') || text.includes('dopamine')) {
            hasAction = true;
            const btn = document.createElement('button');
            btn.className = 'cdss-btn cdss-btn-vaso';
            btn.innerHTML = `<i class="fa-solid fa-syringe"></i> Tính liều Vận mạch`;
            btn.onclick = (e) => { e.stopPropagation(); openCdssVasopressorCalc(); };
            actionBar.appendChild(btn);
        }

        if (text.includes('1 giờ') || text.includes('hour-1') || text.includes('giờ đầu') || text.includes('gói 1h')) {
            hasAction = true;
            const btn = document.createElement('button');
            btn.className = 'cdss-btn cdss-btn-timer';
            btn.innerHTML = `<i class="fa-solid fa-stopwatch"></i> Bật Đồng hồ Gói 1h`;
            btn.onclick = (e) => { e.stopPropagation(); openCdssTimerModal(); };
            actionBar.appendChild(btn);
        }

        if (text.includes('cvc') || text.includes('tĩnh mạch trung tâm') || text.includes('đặt catheter')) {
            hasAction = true;
            const btn = document.createElement('button');
            btn.className = 'cdss-btn';
            btn.innerHTML = `<i class="fa-solid fa-list-check"></i> Checklist CVC`;
            btn.onclick = (e) => { e.stopPropagation(); openCdssCvcChecklist(); };
            actionBar.appendChild(btn);
        }

        if (hasAction) {
            details.appendChild(actionBar);
        }
    });
}

function copyCdssCaseSummary(type) {
    let summaryText = '';
    const nowStr = new Date().toLocaleString('vi-VN');

    if (type === 'fluid') {
        const wt = parseFloat(document.getElementById('cdss-fluid-weight')?.value) || 60;
        const totalMl = wt * 30;
        const bags500 = (totalMl / 500).toFixed(1);
        summaryText = `[CẤP CỨU BÙ DỊCH SỐC NHIỄM KHUẨN - ${nowStr}]\n• Cân nặng: ${wt} kg\n• Thể tích Ringer Lactate/NaCl 0.9% (30 ml/kg): ${totalMl} mL (~${bags500} chai 500mL)\n• Tốc độ truyền 3h đầu: ${(totalMl/3).toFixed(0)} mL/h\n• Nguồn: CliniPortal CDSS`;
    } else if (type === 'vaso') {
        const wt = parseFloat(document.getElementById('cdss-vaso-weight')?.value) || 60;
        const dose = parseFloat(document.getElementById('cdss-vaso-dose')?.value) || 0.1;
        const prepVol = parseFloat(document.getElementById('cdss-vaso-prep')?.value) || 50;
        let mg = prepVol === 500 ? 8 : 4;
        const speed = (((wt * dose * 60) / ((mg * 1000) / prepVol))).toFixed(1);
        summaryText = `[CẤP CỨU VẬN MẠCH NORADRENALINE - ${nowStr}]\n• Cân nặng: ${wt} kg | Liều đích: ${dose} mcg/kg/min\n• Pha thuốc: Noradrenaline ${mg}mg / ${prepVol}mL\n• Tốc độ Bơm tiêm điện: ${speed} mL/h\n• Nguồn: CliniPortal CDSS`;
    }

    if (summaryText) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(summaryText).then(() => {
                alert('📋 Đã sao chép Tóm tắt Ca vào Clipboard!\nBạn có thể dán (Ctrl+V) vào Case Logger hoặc Bệnh án.');
            }).catch(() => alert(summaryText));
        } else {
            alert(summaryText);
        }
    }
}

function openCdssFluidCalc() {
    const title = document.getElementById('cdss-modal-title');
    const body = document.getElementById('cdss-modal-body');
    if (!title || !body) return;

    title.innerHTML = '<i class="fa-solid fa-droplet"></i> Tính Lượng Dịch Bù Sốc (30 mL/kg)';
    body.innerHTML = `
        <p style="font-size:0.85rem; color:var(--color-text-muted); margin-bottom:12px;">
            Khuyến cáo SSC 2021: Bồi phụ thể tích tối thiểu 30 mL/kg dịch tinh thể (Ringer Lactate / NaCl 0.9%) trong 3 giờ đầu cho Sốc nhiễm khuẩn hoặc Lactate ≥ 4 mmol/L.
        </p>
        <div class="cdss-form-group">
            <label>Cân nặng bệnh nhân (kg):</label>
            <input type="number" id="cdss-fluid-weight" class="cdss-input" placeholder="Ví dụ: 60" value="60" oninput="updateFluidCalc()">
        </div>
        <div class="cdss-res-box" id="cdss-fluid-res"></div>
        <button class="cdss-btn" style="margin-top:12px; width:100%; justify-content:center;" onclick="copyCdssCaseSummary('fluid')"><i class="fa-solid fa-copy"></i> Sao chép Tóm tắt Ca vào Bệnh án</button>
    `;
    document.getElementById('cdss-modal-overlay').classList.add('active');
    updateFluidCalc();
}

function updateFluidCalc() {
    let wt = parseFloat(document.getElementById('cdss-fluid-weight')?.value);
    const res = document.getElementById('cdss-fluid-res');
    if (!res) return;

    if (isNaN(wt) || wt <= 0 || wt > 300) {
        res.innerHTML = `<div style="color:#dc2626; font-size:0.85rem; font-weight:700;"><i class="fa-solid fa-triangle-exclamation"></i> Vui lòng nhập cân nặng hợp lệ (1 - 300 kg).</div>`;
        return;
    }

    const totalMl = wt * 30;
    const bags500 = (totalMl / 500).toFixed(1);
    const mlPerHour = (totalMl / 3).toFixed(0);

    let fluidAlert = '';
    if (wt > 100) {
        fluidAlert = `<div style="font-size:0.8rem; color:#d97706; margin-top:6px;"><i class="fa-solid fa-triangle-exclamation"></i> Lưu ý: Bệnh nhân béo phì nên tính thể tích dịch dựa trên Cân nặng lý tưởng (IBW).</div>`;
    }

    res.innerHTML = `
        <div style="font-size:0.9rem; font-weight:700; color:var(--color-primary);">Tổng thể tích dịch cần truyền: <span style="font-size:1.3rem; color:#0284c7;">${totalMl.toLocaleString()} mL</span></div>
        <div style="font-size:0.85rem; margin-top:6px;">• Tương đương: <strong>${bags500} chai</strong> (loại 500 mL)</div>
        <div style="font-size:0.85rem; margin-top:4px;">• Tốc độ truyền trung bình (3 giờ đầu): <strong>${mlPerHour} mL/giờ</strong></div>
        ${fluidAlert}
    `;
}

function openCdssVasopressorCalc() {
    const title = document.getElementById('cdss-modal-title');
    const body = document.getElementById('cdss-modal-body');
    if (!title || !body) return;

    title.innerHTML = '<i class="fa-solid fa-syringe"></i> Tính Liều Truyền Vận Mạch (Noradrenaline)';
    body.innerHTML = `
        <p style="font-size:0.85rem; color:var(--color-text-muted); margin-bottom:12px;">
            Noradrenaline là lựa chọn đầu tay trong Sốc nhiễm khuẩn (Mục tiêu MAP ≥ 65 mmHg).
        </p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div class="cdss-form-group">
                <label>Cân nặng (kg):</label>
                <input type="number" id="cdss-vaso-weight" class="cdss-input" value="60" oninput="updateVasoCalc()">
            </div>
            <div class="cdss-form-group">
                <label>Liều đích (mcg/kg/phút):</label>
                <input type="number" id="cdss-vaso-dose" class="cdss-input" value="0.1" step="0.05" oninput="updateVasoCalc()">
            </div>
        </div>
        <div class="cdss-form-group">
            <label>Pha thuốc (Noradrenaline 4mg):</label>
            <select id="cdss-vaso-prep" class="cdss-input" onchange="updateVasoCalc()">
                <option value="50">4 mg pha đủ 50 mL NaCl 0.9% (Bơm tiêm điện)</option>
                <option value="250">4 mg pha đủ 250 mL Glucose 5% / NaCl 0.9% (Chai truyền)</option>
                <option value="500">8 mg pha đủ 500 mL (Đậm đặc)</option>
            </select>
        </div>
        <div class="cdss-res-box" id="cdss-vaso-res"></div>
        <button class="cdss-btn" style="margin-top:12px; width:100%; justify-content:center;" onclick="copyCdssCaseSummary('vaso')"><i class="fa-solid fa-copy"></i> Sao chép Tóm tắt Ca vào Bệnh án</button>
    `;
    document.getElementById('cdss-modal-overlay').classList.add('active');
    updateVasoCalc();
}

function updateVasoCalc() {
    let wt = parseFloat(document.getElementById('cdss-vaso-weight')?.value);
    let dose = parseFloat(document.getElementById('cdss-vaso-dose')?.value);
    const prepVol = parseFloat(document.getElementById('cdss-vaso-prep')?.value) || 50;
    const res = document.getElementById('cdss-vaso-res');
    if (!res) return;

    if (isNaN(wt) || wt <= 0 || wt > 300 || isNaN(dose) || dose < 0 || dose > 5) {
        res.innerHTML = `<div style="color:#dc2626; font-size:0.85rem; font-weight:700;"><i class="fa-solid fa-triangle-exclamation"></i> Vui lòng nhập cân nặng (1-300kg) và liều lượng hợp lệ (0.01 - 5 mcg/kg/min).</div>`;
        return;
    }

    let mgDrug = 4;
    if (prepVol === 500) mgDrug = 8;

    const totalMcgPerMin = wt * dose;
    const totalMcgPerHour = totalMcgPerMin * 60;
    const concMcgPerMl = (mgDrug * 1000) / prepVol;
    const speedMlPerHour = (totalMcgPerHour / concMcgPerMl).toFixed(1);

    let doseWarning = '';
    if (dose > 0.5) {
        doseWarning = `<div style="font-size:0.8rem; color:#dc2626; font-weight:700; margin-top:6px;"><i class="fa-solid fa-skull-crossbones"></i> CẢNH BÁO LIỀU CAO: Liều Noradrenaline > 0.5 mcg/kg/min. Cân nhắc phối hợp Vasopressin (0.03 unit/min) hoặc Adrenaline!</div>`;
    }

    res.innerHTML = `
        <div style="font-size:0.9rem; font-weight:700; color:#dc2626;">Tốc độ cài đặt Bơm tiêm điện: <span style="font-size:1.4rem;">${speedMlPerHour} mL/giờ</span></div>
        <div style="font-size:0.85rem; margin-top:6px;">• Nồng độ dung dịch: <strong>${concMcgPerMl} mcg/mL</strong></div>
        <div style="font-size:0.85rem; margin-top:4px;">• Tổng liều nhập vào: <strong>${totalMcgPerMin.toFixed(1)} mcg/phút</strong></div>
        ${doseWarning}
    `;
}

function openCdssTimerModal() {
    const title = document.getElementById('cdss-modal-title');
    const body = document.getElementById('cdss-modal-body');
    if (!title || !body) return;

    title.innerHTML = '<i class="fa-solid fa-stopwatch"></i> Đồng Hồ Gói Hồi Sức 1 Giờ (Hour-1 Bundle)';
    body.innerHTML = `
        <div class="cdss-timer-display" id="cdss-timer-val">60:00</div>
        <div style="display:flex; justify-content:center; gap:10px; margin-bottom:15px;">
            <button class="cdss-btn cdss-btn-timer" onclick="toggleCdssTimer()" id="cdss-timer-toggle-btn"><i class="fa-solid fa-play"></i> Bắt đầu</button>
            <button class="cdss-btn" onclick="resetCdssTimer()"><i class="fa-solid fa-rotate-left"></i> Đặt lại (60p)</button>
        </div>
        <div style="font-weight:700; font-size:0.9rem; margin-bottom:8px;">Checklist Gói 1 Giờ (Surviving Sepsis Campaign):</div>
        <div style="font-size:0.85rem; display:flex; flex-direction:column; gap:6px;">
            <label><input type="checkbox"> 1. Đo nồng độ Lactate máu (Đo lại nếu > 2 mmol/L)</label>
            <label><input type="checkbox"> 2. Cấy máu trước khi bắt đầu dùng Kháng sinh</label>
            <label><input type="checkbox"> 3. Cho Kháng sinh phổ rộng ngay lập tức</label>
            <label><input type="checkbox"> 4. Bắt đầu bù dịch 30ml/kg nếu tụt HA hoặc Lactate ≥ 4</label>
            <label><input type="checkbox"> 5. Dùng Noradrenaline nếu MAP < 65 mmHg sau/trong khi bù dịch</label>
        </div>
    `;
    document.getElementById('cdss-modal-overlay').classList.add('active');
    updateCdssTimerDisplay();
}

function updateCdssTimerDisplay() {
    const el = document.getElementById('cdss-timer-val');
    if (!el) return;
    const m = Math.floor(cdssTimerSeconds / 60);
    const s = cdssTimerSeconds % 60;
    el.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function toggleCdssTimer() {
    const btn = document.getElementById('cdss-timer-toggle-btn');
    if (cdssTimerRunning) {
        clearInterval(cdssTimerInterval);
        cdssTimerRunning = false;
        if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i> Tiếp tục';
    } else {
        cdssTimerRunning = true;
        if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i> Tạm dừng';
        cdssTimerInterval = setInterval(() => {
            if (cdssTimerSeconds > 0) {
                cdssTimerSeconds--;
                updateCdssTimerDisplay();
            } else {
                clearInterval(cdssTimerInterval);
                cdssTimerRunning = false;
                alert('⏰ Hết giờ 1h cấp cứu! Vui lòng đánh giá lại sinh hiệu và Lactate.');
            }
        }, 1000);
    }
}

function resetCdssTimer() {
    clearInterval(cdssTimerInterval);
    cdssTimerRunning = false;
    cdssTimerSeconds = 3600;
    updateCdssTimerDisplay();
    const btn = document.getElementById('cdss-timer-toggle-btn');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i> Bắt đầu';
}

function openCdssCvcChecklist() {
    const title = document.getElementById('cdss-modal-title');
    const body = document.getElementById('cdss-modal-body');
    if (!title || !body) return;

    title.innerHTML = '<i class="fa-solid fa-list-check"></i> Checklist Vô Khuẩn Đặt CVC (Tĩnh mạch trung tâm)';
    body.innerHTML = `
        <div style="font-size:0.85rem; display:flex; flex-direction:column; gap:8px;">
            <div style="font-weight:700; color:var(--color-primary);">5 Bước Vô Khuẩn Tối Đa (Maximal Sterile Barrier):</div>
            <label><input type="checkbox"> 1. Vệ sinh tay bằng dung dịch chứa cồn trước thủ thuật.</label>
            <label><input type="checkbox"> 2. Mang khẩu trang, mũ, áo màng vô khuẩn & găng vô khuẩn đầy đủ.</label>
            <label><input type="checkbox"> 3. Sát khuẩn da vùng đặt bằng Chlorhexidine 2% trong cồn (để khô hoàn toàn).</label>
            <label><input type="checkbox"> 4. Phủ săm vô khuẩn toàn thân bệnh nhân.</label>
            <label><input type="checkbox"> 5. Định vị bằng Siêu âm khuyên dùng (Ultrasound-guided) để giảm biến chứng.</label>
            <hr style="margin:8px 0; border:none; border-top:1px dashed var(--color-border);">
            <div style="font-weight:700; color:#dc2626;">Biến chứng cần kiểm tra ngay sau đặt:</div>
            <div>• X-quang ngực kiểm tra vị trí đầu Catheter và loại trừ Tràn khí móng phổi (Pneumothorax).</div>
        </div>
    `;
    document.getElementById('cdss-modal-overlay').classList.add('active');
}

function closeCdssModal(e) {
    const overlay = document.getElementById('cdss-modal-overlay');
    if (overlay) overlay.classList.remove('active');
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

    // 5. Init CDSS Interactive Tools (Timer, Calculators, Checklists)
    initFlowchartCDSS();

    // 6. Init Pathophysiology Bridge (<patho-mechanism> tooltips)
    if (window.PathoBridge && typeof window.PathoBridge.initFlowchartNodes === 'function') {
        window.PathoBridge.initFlowchartNodes();
    }
});
