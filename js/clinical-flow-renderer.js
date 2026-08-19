/**
 * ════════════════════════════════════════════════════════════════════════════
 *  CLINICAL FLOW & DECISION TREE RENDERER ENGINE — CLINI-PORTAL
 *  Phiên bản 1.0 (Phase 1) — Tối ưu hóa theo chuẩn VisuAlgo & CSVisTool
 *  Hỗ trợ: Pure SVG, Hierarchical Layout, Active Path Traversal, Subtree Pruning,
 *  Orthogonal Routing, Dark Mode CSS Variables & Synchronized Clinical Inspector.
 * ════════════════════════════════════════════════════════════════════════════
 */

class ClinicalFlowEngine {
    constructor(options = {}) {
        this.container = typeof options.container === 'string'
            ? document.querySelector(options.container)
            : options.container;

        this.inspectorContainer = typeof options.inspector === 'string'
            ? document.querySelector(options.inspector)
            : options.inspector;

        this.width = options.width || 960;
        this.height = options.height || 640;
        this.data = null;

        // Trạng thái tương tác đồ thị (State Machine)
        this.currentNodeId = null;
        this.activePathNodes = new Set();
        this.activePathEdges = new Set();
        this.excludedNodes = new Set();
        this.decisionHistory = []; // Stack lưu lại lịch sử bước đi lâm sàng (Breadcrumbs & Undo)

        // Callbacks
        this.onNodeSelect = options.onNodeSelect || null;
        this.onStateChange = options.onStateChange || null;

        if (this.container) {
            this.initViewport();
        }
    }

    /**
     * Khởi tạo khung chứa Viewport SVG & Controls
     */
    initViewport() {
        this.container.classList.add('clinical-flow-viewport');
        this.container.innerHTML = `
            <div class="flow-engine-toolbar">
                <div class="flow-history-breadcrumbs" id="flowBreadcrumbs">
                    <span class="breadcrumb-chip active"><i class="fa-solid fa-play"></i> Bắt đầu</span>
                </div>
                <div class="flow-actions-group">
                    <button class="flow-btn-tool" id="btnStepBack" title="Lùi lại bước trước (Undo)">
                        <i class="fa-solid fa-arrow-rotate-left"></i> Lùi bước
                    </button>
                    <button class="flow-btn-tool" id="btnResetFlow" title="Đặt lại từ đầu">
                        <i class="fa-solid fa-arrows-rotate"></i> Làm mới
                    </button>
                    <button class="flow-btn-tool" id="btnFitView" title="Đặt lại Tầm nhìn">
                        <i class="fa-solid fa-compress"></i> Vừa khung
                    </button>
                </div>
            </div>
            <div class="flow-svg-canvas-wrapper" id="flowCanvasWrapper">
                <svg class="clinical-flow-svg" viewBox="0 0 ${this.width} ${this.height}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <!-- Arrowhead Markers chuẩn Tokens -->
                        <marker id="med-arrow-def" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-border)" />
                        </marker>
                        <marker id="med-arrow-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                            <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-primary)" />
                        </marker>
                        <marker id="med-arrow-danger" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                            <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-danger)" />
                        </marker>
                        <marker id="med-arrow-success" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                            <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-success)" />
                        </marker>
                    </defs>
                    <g class="flow-layer-edges"></g>
                    <g class="flow-layer-nodes"></g>
                </svg>
            </div>
        `;

        this.svgEl = this.container.querySelector('.clinical-flow-svg');
        this.edgesGroup = this.container.querySelector('.flow-layer-edges');
        this.nodesGroup = this.container.querySelector('.flow-layer-nodes');
        this.breadcrumbsEl = this.container.querySelector('#flowBreadcrumbs');

        // Bắt sự kiện Toolbar
        const btnStepBack = this.container.querySelector('#btnStepBack');
        const btnResetFlow = this.container.querySelector('#btnResetFlow');

        if (btnStepBack) {
            btnStepBack.addEventListener('click', () => this.stepBack());
        }
        if (btnResetFlow) {
            btnResetFlow.addEventListener('click', () => this.reset());
        }
    }

    /**
     * Nạp dữ liệu Sơ đồ Lâm sàng
     */
    load(diagramData) {
        if (!diagramData || !diagramData.nodes) return;
        this.data = JSON.parse(JSON.stringify(diagramData));
        this.width = this.data.width || this.width;
        this.height = this.data.height || this.height;

        if (this.svgEl) {
            this.svgEl.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
        }

        // Tự động tính toán vị trí phân tầng (Auto-Layout) nếu dữ liệu chưa có tọa độ x, y
        this.calculateAutoLayout();

        // Khởi động từ root node
        this.reset();
    }

    /**
     * Thuật toán Bố cục Phân tầng Cây / DAG (Hierarchical Layout Engine)
     */
    calculateAutoLayout() {
        if (!this.data || !this.data.nodes) return;
        
        // Kiểm tra xem các node đã có tọa độ x, y sẵn chưa
        const hasCustomCoords = this.data.nodes.every(n => typeof n.x === 'number' && typeof n.y === 'number');
        if (hasCustomCoords) return;

        const nodesMap = new Map(this.data.nodes.map(n => [n.id, n]));
        const rootId = this.data.rootId || this.data.nodes[0].id;

        // Tính độ sâu (Depth) của từng node bằng BFS
        const depths = new Map();
        depths.set(rootId, 0);
        const queue = [rootId];

        while (queue.length > 0) {
            const currId = queue.shift();
            const currDepth = depths.get(currId);
            const outEdges = (this.data.edges || []).filter(e => e.source === currId);

            outEdges.forEach(e => {
                if (!depths.has(e.target)) {
                    depths.set(e.target, currDepth + 1);
                    queue.push(e.target);
                }
            });
        }

        // Gom nhóm các node theo Level
        const levelGroups = new Map();
        this.data.nodes.forEach(n => {
            const d = depths.get(n.id) || 0;
            if (!levelGroups.has(d)) levelGroups.set(d, []);
            levelGroups.get(d).push(n);
        });

        // Gán tọa độ X, Y đối xứng
        const maxLevel = Math.max(...levelGroups.keys(), 0);
        const levelHeight = (this.height - 120) / Math.max(maxLevel, 1);
        const nodeWidth = 240;
        const nodeHeight = 85;

        levelGroups.forEach((nodesInLevel, level) => {
            const y = 40 + level * levelHeight;
            const totalWidth = this.width;
            const count = nodesInLevel.length;
            const segment = totalWidth / (count + 1);

            nodesInLevel.forEach((n, idx) => {
                n.width = n.width || nodeWidth;
                n.height = n.height || nodeHeight;
                n.x = Math.round(segment * (idx + 1) - n.width / 2);
                n.y = Math.round(y);
            });
        });
    }

    /**
     * Đặt lại trạng thái từ điểm bắt đầu (Root)
     */
    reset() {
        if (!this.data || !this.data.nodes || this.data.nodes.length === 0) return;
        const rootNode = this.data.nodes.find(n => n.id === this.data.rootId) || this.data.nodes[0];
        
        this.currentNodeId = rootNode.id;
        this.activePathNodes = new Set([rootNode.id]);
        this.activePathEdges = new Set();
        this.excludedNodes = new Set();
        this.decisionHistory = [{ nodeId: rootNode.id, title: rootNode.title, badge: rootNode.badge }];

        this.render();
        this.updateInspector(rootNode);
        this.updateBreadcrumbs();
    }

    /**
     * Chọn bước tiếp theo thông qua Nhánh Quyết định (Branch)
     */
    selectBranch(edgeId) {
        if (!this.data) return;
        const edge = (this.data.edges || []).find(e => e.id === edgeId);
        if (!edge) return;

        const targetNode = this.data.nodes.find(n => n.id === edge.target);
        if (!targetNode) return;

        // Lưu lịch sử bước
        this.decisionHistory.push({
            edgeId: edge.id,
            label: edge.label || 'Tiếp tục',
            nodeId: targetNode.id,
            title: targetNode.title,
            badge: targetNode.badge
        });

        this.activePathEdges.add(edge.id);
        this.activePathNodes.add(targetNode.id);
        this.currentNodeId = targetNode.id;

        // Tự động làm mờ các nhánh cạnh tranh khác xuất phát từ cùng nguồn (Subtree Pruning)
        const siblingEdges = (this.data.edges || []).filter(e => e.source === edge.source && e.id !== edge.id);
        siblingEdges.forEach(sibEdge => {
            this.pruneSubtree(sibEdge.target);
        });

        this.render();
        this.updateInspector(targetNode);
        this.updateBreadcrumbs();

        if (this.onStateChange) this.onStateChange(this.getState());
    }

    /**
     * Làm mờ nhánh cây con (Subtree Pruning)
     */
    pruneSubtree(startNodeId) {
        const queue = [startNodeId];
        while (queue.length > 0) {
            const currId = queue.shift();
            this.excludedNodes.add(currId);
            const outEdges = (this.data.edges || []).filter(e => e.source === currId);
            outEdges.forEach(e => {
                if (!this.excludedNodes.has(e.target)) {
                    queue.push(e.target);
                }
            });
        }
    }

    /**
     * Lùi lại một bước quyết định (Backtrack / Undo)
     */
    stepBack() {
        if (this.decisionHistory.length <= 1) return;

        // Xóa bước cuối khỏi Stack
        this.decisionHistory.pop();

        // Tái tạo lại Active Path từ lịch sử
        this.activePathNodes.clear();
        this.activePathEdges.clear();
        this.excludedNodes.clear();

        this.decisionHistory.forEach((step, idx) => {
            this.activePathNodes.add(step.nodeId);
            if (step.edgeId) this.activePathEdges.add(step.edgeId);

            // Re-prune nhánh cạnh tranh
            if (step.edgeId) {
                const edge = (this.data.edges || []).find(e => e.id === step.edgeId);
                if (edge) {
                    const siblingEdges = (this.data.edges || []).filter(e => e.source === edge.source && e.id !== edge.id);
                    siblingEdges.forEach(sibEdge => this.pruneSubtree(sibEdge.target));
                }
            }
        });

        const currentStep = this.decisionHistory[this.decisionHistory.length - 1];
        this.currentNodeId = currentStep.nodeId;
        const currentNode = this.data.nodes.find(n => n.id === this.currentNodeId);

        this.render();
        this.updateInspector(currentNode);
        this.updateBreadcrumbs();

        if (this.onStateChange) this.onStateChange(this.getState());
    }

    /**
     * Render toàn bộ Nodes và Edges lên SVG
     */
    render() {
        if (!this.data) return;
        this.renderEdges();
        this.renderNodes();
    }

    /**
     * Render các đường nối Trực giao (Orthogonal Routing)
     */
    renderEdges() {
        this.edgesGroup.innerHTML = '';
        const edges = this.data.edges || [];

        edges.forEach(edge => {
            const srcNode = this.data.nodes.find(n => n.id === edge.source);
            const tgtNode = this.data.nodes.find(n => n.id === edge.target);
            if (!srcNode || !tgtNode) return;

            const exitX = edge.exitX !== undefined ? edge.exitX : 0.5;
            const exitY = edge.exitY !== undefined ? edge.exitY : 1.0;
            const entryX = edge.entryX !== undefined ? edge.entryX : 0.5;
            const entryY = edge.entryY !== undefined ? edge.entryY : 0.0;

            const startX = srcNode.x + srcNode.width * exitX;
            const startY = srcNode.y + srcNode.height * exitY;
            const endX = tgtNode.x + tgtNode.width * entryX;
            const endY = tgtNode.y + tgtNode.height * entryY;

            // Đường nối trực giao có bo góc (Orthogonal Rounded Elbow)
            let pathD = '';
            let labelX = (startX + endX) / 2;
            let labelY = (startY + endY) / 2;

            if (edge.waypoints && edge.waypoints.length > 0) {
                pathD = `M ${startX} ${startY}`;
                edge.waypoints.forEach(wp => { pathD += ` L ${wp.x} ${wp.y}`; });
                pathD += ` L ${endX} ${endY}`;
                const midWp = edge.waypoints[Math.floor(edge.waypoints.length / 2)];
                labelX = midWp.x;
                labelY = midWp.y;
            } else if (Math.abs(startX - endX) < 4) {
                // Thẳng đứng
                pathD = `M ${startX} ${startY} L ${endX} ${endY}`;
                labelY = (startY + endY) / 2;
            } else {
                // Trực giao bo góc
                const midY = startY + (endY - startY) * 0.5;
                const radius = 6;
                const isGoingRight = endX > startX;
                const isGoingDown = endY > startY;

                const dirY = isGoingDown ? 1 : -1;
                const dirX = isGoingRight ? 1 : -1;

                pathD = `M ${startX} ${startY} ` +
                        `L ${startX} ${midY - radius * dirY} ` +
                        `Q ${startX} ${midY} ${startX + radius * dirX} ${midY} ` +
                        `L ${endX - radius * dirX} ${midY} ` +
                        `Q ${endX} ${midY} ${endX} ${midY + radius * dirY} ` +
                        `L ${endX} ${endY}`;

                labelX = (startX + endX) / 2;
                labelY = midY;
            }

            const isActive = this.activePathEdges.has(edge.id);
            const isExcluded = this.excludedNodes.has(edge.target);
            const markerType = edge.type === 'danger' ? 'med-arrow-danger'
                : edge.type === 'success' ? 'med-arrow-success'
                : isActive ? 'med-arrow-active'
                : 'med-arrow-def';

            // SVG Path Element
            const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathEl.setAttribute('d', pathD);
            pathEl.setAttribute('class', `flow-edge-path ${edge.type || 'normal'} ${isActive ? 'active' : ''} ${isExcluded ? 'dimmed' : ''}`);
            pathEl.setAttribute('marker-end', `url(#${markerType})`);
            pathEl.dataset.edgeId = edge.id;

            this.edgesGroup.appendChild(pathEl);

            // Label & Interactive Button trên đường nối
            if (edge.label) {
                const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                labelGroup.setAttribute('class', `flow-edge-label-group ${isActive ? 'active' : ''} ${isExcluded ? 'dimmed' : ''}`);
                labelGroup.setAttribute('transform', `translate(${labelX}, ${labelY})`);

                const approxW = Math.max(50, edge.label.length * 7.5 + 16);
                const approxH = 22;

                const rectEl = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rectEl.setAttribute('class', `flow-edge-label-bg ${edge.type || ''}`);
                rectEl.setAttribute('x', `${-approxW / 2}`);
                rectEl.setAttribute('y', `${-approxH / 2}`);
                rectEl.setAttribute('width', `${approxW}`);
                rectEl.setAttribute('height', `${approxH}`);
                rectEl.setAttribute('rx', '4');

                const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                textEl.setAttribute('class', 'flow-edge-label-text');
                textEl.setAttribute('text-anchor', 'middle');
                textEl.setAttribute('dy', '4');
                textEl.textContent = edge.label;

                labelGroup.appendChild(rectEl);
                labelGroup.appendChild(textEl);

                // Click vào Label -> Chuyển nhánh quyết định
                labelGroup.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.selectBranch(edge.id);
                });

                this.edgesGroup.appendChild(labelGroup);
            }
        });
    }

    /**
     * Render các Node lên SVG Layer
     */
    renderNodes() {
        this.nodesGroup.innerHTML = '';
        const nodes = this.data.nodes || [];

        nodes.forEach(node => {
            const isActive = this.activePathNodes.has(node.id);
            const isCurrent = this.currentNodeId === node.id;
            const isExcluded = this.excludedNodes.has(node.id);

            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('class', `flow-node-group node-type-${node.type || 'action'} ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''} ${isExcluded ? 'dimmed' : ''}`);
            g.setAttribute('transform', `translate(${node.x}, ${node.y})`);
            g.dataset.nodeId = node.id;

            // Box nền Node
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('class', 'flow-node-box');
            rect.setAttribute('width', node.width);
            rect.setAttribute('height', node.height);
            rect.setAttribute('rx', '8');
            rect.setAttribute('ry', '8');
            g.appendChild(rect);

            // Badge Tag phía trên (nếu có)
            let textStartY = 28;
            if (node.badge) {
                const badgeBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                badgeBg.setAttribute('class', `flow-node-badge-bg badge-${node.type || 'default'}`);
                badgeBg.setAttribute('x', '12');
                badgeBg.setAttribute('y', '8');
                badgeBg.setAttribute('width', `${Math.min(node.width - 24, node.badge.length * 7 + 14)}`);
                badgeBg.setAttribute('height', '18');
                badgeBg.setAttribute('rx', '4');
                g.appendChild(badgeBg);

                const badgeTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                badgeTxt.setAttribute('class', 'flow-node-badge-text');
                badgeTxt.setAttribute('x', '18');
                badgeTxt.setAttribute('y', '21');
                badgeTxt.textContent = node.badge;
                g.appendChild(badgeTxt);

                textStartY = 44;
            }

            // Tiêu đề Node
            const titleTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            titleTxt.setAttribute('class', 'flow-node-title');
            titleTxt.setAttribute('x', '12');
            titleTxt.setAttribute('y', `${textStartY}`);
            titleTxt.textContent = this.truncateText(node.title, node.width - 24, 13);
            g.appendChild(titleTxt);

            // Phụ đề (Subtitle / Ghi chú nhanh)
            if (node.subtitle) {
                const subTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                subTxt.setAttribute('class', 'flow-node-subtitle');
                subTxt.setAttribute('x', '12');
                subTxt.setAttribute('y', `${textStartY + 18}`);
                subTxt.textContent = this.truncateText(node.subtitle, node.width - 24, 11);
                g.appendChild(subTxt);
            }

            // Sự kiện Click Node
            g.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleNodeClick(node);
            });

            this.nodesGroup.appendChild(g);
        });
    }

    /**
     * Xử lý khi người dùng nhấp vào một Node
     */
    handleNodeClick(node) {
        const directEdge = (this.data.edges || []).find(e => e.source === this.currentNodeId && e.target === node.id);
        if (directEdge) {
            this.selectBranch(directEdge.id);
        } else {
            this.updateInspector(node);
        }

        if (this.onNodeSelect) this.onNodeSelect(node);
    }

    /**
     * Cập nhật Khung Thanh tra Lâm sàng Đồng bộ (Inspector Panel)
     */
    updateInspector(node) {
        if (!this.inspectorContainer || !node) return;

        let iconType = node.type === 'focal' || node.type === 'danger' ? 'fa-triangle-exclamation text-danger'
            : node.type === 'start' ? 'fa-play text-primary'
            : node.type === 'question' ? 'fa-circle-question text-warning'
            : node.type === 'success' ? 'fa-circle-check text-success'
            : 'fa-stethoscope text-primary';

        const nextEdges = (this.data.edges || []).filter(e => e.source === node.id);
        let branchButtonsHtml = '';

        if (nextEdges.length > 0) {
            branchButtonsHtml = `
                <div class="inspector-section">
                    <div class="inspector-section-title"><i class="fa-solid fa-code-branch"></i> Bước Rẽ Nhánh Tiếp Theo:</div>
                    <div class="inspector-branch-buttons">
                        ${nextEdges.map(e => `
                            <button class="btn-inspector-branch ${e.type || ''}" onclick="window.currentFlowEngine.selectBranch('${e.id}')">
                                <span class="branch-label">${e.label || 'Tiếp tục'} ➔</span>
                                <span class="branch-target">${this.getNodeTitle(e.target)}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        let evidenceHtml = node.evidence ? `
            <div class="inspector-section ebm-box">
                <div class="inspector-section-title"><i class="fa-solid fa-book-medical"></i> Khuyến cáo EBM & Bằng chứng:</div>
                <div class="ebm-content">${node.evidence}</div>
            </div>
        ` : '';

        let doseHtml = node.dose ? `
            <div class="inspector-section dose-box">
                <div class="inspector-section-title"><i class="fa-solid fa-pills"></i> Liều lượng & Dược lý khẩn cấp:</div>
                <div class="dose-content">${node.dose}</div>
            </div>
        ` : '';

        let redFlagsHtml = node.redFlags && node.redFlags.length > 0 ? `
            <div class="inspector-section redflags-box">
                <div class="inspector-section-title"><i class="fa-solid fa-flag"></i> Dấu hiệu Cờ Đỏ (Red Flags):</div>
                <ul class="redflags-list">
                    ${node.redFlags.map(rf => `<li>${rf}</li>`).join('')}
                </ul>
            </div>
        ` : '';

        this.inspectorContainer.innerHTML = `
            <div class="inspector-card">
                <div class="inspector-header">
                    <span class="inspector-badge badge-${node.type || 'default'}">${node.badge || 'Bước Quyết định'}</span>
                    <h3 class="inspector-title"><i class="fa-solid ${iconType}"></i> ${node.title}</h3>
                    ${node.subtitle ? `<div class="inspector-subtitle">${node.subtitle}</div>` : ''}
                </div>
                <div class="inspector-body">
                    ${node.details ? `<div class="inspector-desc">${node.details}</div>` : ''}
                    ${branchButtonsHtml}
                    ${doseHtml}
                    ${redFlagsHtml}
                    ${evidenceHtml}
                </div>
            </div>
        `;
    }

    /**
     * Cập nhật Thanh Breadcrumbs chỉ báo các bước đã đi
     */
    updateBreadcrumbs() {
        if (!this.breadcrumbsEl) return;
        this.breadcrumbsEl.innerHTML = this.decisionHistory.map((step, idx) => {
            const isLast = idx === this.decisionHistory.length - 1;
            return `
                <span class="breadcrumb-chip ${isLast ? 'active' : ''}">
                    ${step.label ? `<span class="chip-branch">${step.label}</span> ➔ ` : ''}
                    <strong>${step.badge || `B${idx + 1}`}:</strong> ${step.title}
                </span>
            `;
        }).join('');
    }

    getNodeTitle(nodeId) {
        const node = (this.data.nodes || []).find(n => n.id === nodeId);
        return node ? node.title : nodeId;
    }

    truncateText(str, maxWidth, approxCharWidth = 10) {
        if (!str) return '';
        const maxChars = Math.floor(maxWidth / approxCharWidth);
        return str.length > maxChars ? str.substring(0, maxChars - 3) + '...' : str;
    }

    getState() {
        return {
            currentNodeId: this.currentNodeId,
            history: this.decisionHistory,
            activeNodes: Array.from(this.activePathNodes),
            activeEdges: Array.from(this.activePathEdges)
        };
    }
}

if (typeof window !== 'undefined') {
    window.ClinicalFlowEngine = ClinicalFlowEngine;
}
