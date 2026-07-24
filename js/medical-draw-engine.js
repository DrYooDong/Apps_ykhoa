/**
 * ════════════════════════════════════════════════════════════════════════════
 *  MEDICAL DRAW ENGINE — CLINI-PORTAL (APPS_YKHOA)
 *  Engine vẽ & định tuyến lưu đồ y khoa vector (SVG + DOM Node Hybrid)
 *  Kỹ thuật rút ra từ next-ai-draw-io (Edge Routing, Anchors, Waypoints, SVG/PNG Export)
 * ════════════════════════════════════════════════════════════════════════════
 */

class MedicalDrawEngine {
    constructor(options = {}) {
        this.container = typeof options.container === 'string' 
            ? document.querySelector(options.container) 
            : options.container;
        
        this.width = options.width || 1000;
        this.height = options.height || 750;
        this.readOnly = options.readOnly || false;
        
        // Dynamic state
        this.nodes = [];
        this.edges = [];
        this.selectedNodeId = null;
        this.selectedEdgeId = null;
        this.activePathNodeIds = new Set();
        this.activePathEdgeIds = new Set();

        // Canvas transform
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.isDraggingCanvas = false;
        this.dragStartX = 0;
        this.dragStartY = 0;

        // Callbacks
        this.onNodeSelect = options.onNodeSelect || null;
        this.onEdgeSelect = options.onEdgeSelect || null;
        this.onChange = options.onChange || null;

        if (this.container) {
            this.init();
        }
    }

    /**
     * Khởi tạo DOM container & Canvas SVG
     */
    init() {
        this.container.classList.add('med-draw-viewport');
        this.container.innerHTML = `
            <div class="med-draw-canvas" id="medDrawCanvas">
                <svg class="med-draw-svg-layer" width="${this.width}" height="${this.height}">
                    <defs>
                        <!-- Arrowhead Normal -->
                        <marker id="med-arrow-normal" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                        </marker>
                        <!-- Arrowhead Active / Highlighted -->
                        <marker id="med-arrow-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#0284c7" />
                        </marker>
                        <!-- Arrowhead Danger -->
                        <marker id="med-arrow-danger" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                        </marker>
                        <!-- Arrowhead Success -->
                        <marker id="med-arrow-success" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                        </marker>
                    </defs>
                    <g class="med-svg-edges-group"></g>
                    <g class="med-svg-labels-group"></g>
                </svg>
                <div class="med-draw-nodes-layer"></div>
            </div>
        `;

        this.canvasEl = this.container.querySelector('#medDrawCanvas');
        this.svgEl = this.container.querySelector('.med-draw-svg-layer');
        this.edgesGroup = this.container.querySelector('.med-svg-edges-group');
        this.labelsGroup = this.container.querySelector('.med-svg-labels-group');
        this.nodesLayer = this.container.querySelector('.med-draw-nodes-layer');

        this.setupInteractions();
    }

    /**
     * Tương tác Zoom, Pan & Dragging
     */
    setupInteractions() {
        // Pan Canvas
        this.container.addEventListener('mousedown', (e) => {
            if (e.target.closest('.med-node') || e.target.closest('.med-edge-label')) return;
            this.isDraggingCanvas = true;
            this.dragStartX = e.clientX - this.translateX;
            this.dragStartY = e.clientY - this.translateY;
            this.container.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (!this.isDraggingCanvas) return;
            this.translateX = e.clientX - this.dragStartX;
            this.translateY = e.clientY - this.dragStartY;
            this.updateTransform();
        });

        window.addEventListener('mouseup', () => {
            if (this.isDraggingCanvas) {
                this.isDraggingCanvas = false;
                this.container.style.cursor = 'grab';
            }
        });

        // Wheel Zoom
        this.container.addEventListener('wheel', (e) => {
            if (e.target.closest('.med-node-details')) return; // Cho phép scroll chi tiết node
            e.preventDefault();
            const delta = e.deltaY < 0 ? 0.08 : -0.08;
            this.scale = Math.min(Math.max(0.4, this.scale + delta), 2.2);
            this.updateTransform();
        }, { passive: false });
    }

    updateTransform() {
        if (this.canvasEl) {
            this.canvasEl.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
            this.canvasEl.style.transformOrigin = '0 0';
        }
    }

    resetView() {
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();
    }

    zoomIn() {
        this.scale = Math.min(2.2, this.scale + 0.15);
        this.updateTransform();
    }

    zoomOut() {
        this.scale = Math.max(0.4, this.scale - 0.15);
        this.updateTransform();
    }

    /**
     * Nạp dữ liệu Sơ đồ từ cấu trúc JSON Schema
     */
    loadDiagram(data) {
        if (!data) return;
        this.nodes = data.nodes ? JSON.parse(JSON.stringify(data.nodes)) : [];
        this.edges = data.edges ? JSON.parse(JSON.stringify(data.edges)) : [];
        this.selectedNodeId = null;
        this.selectedEdgeId = null;
        this.activePathNodeIds.clear();
        this.activePathEdgeIds.clear();
        this.render();
    }

    /**
     * Xuất dữ liệu sơ đồ thành JSON Schema
     */
    exportJSON() {
        return {
            version: '1.0',
            width: this.width,
            height: this.height,
            nodes: this.nodes,
            edges: this.edges
        };
    }

    /**
     * Render lại toàn bộ Nodes & Edges SVG
     */
    render() {
        this.renderNodes();
        this.renderEdges();
        if (this.onChange) this.onChange();
    }

    /**
     * Render các Node HTML (Start, Question, Action, Danger, Success, Dose Warning)
     */
    renderNodes() {
        this.nodesLayer.innerHTML = '';
        this.nodes.forEach(node => {
            const nodeEl = document.createElement('div');
            nodeEl.className = `med-node med-node-${node.type || 'action'} ${this.selectedNodeId === node.id ? 'selected' : ''} ${this.activePathNodeIds.has(node.id) ? 'active-path-node' : ''}`;
            nodeEl.dataset.id = node.id;
            nodeEl.style.left = `${node.x}px`;
            nodeEl.style.top = `${node.y}px`;
            nodeEl.style.width = `${node.width || 180}px`;
            if (node.height) nodeEl.style.minHeight = `${node.height}px`;

            let badgeHtml = '';
            if (node.badge) {
                badgeHtml = `<span class="med-node-badge">${node.badge}</span>`;
            }

            let detailsHtml = '';
            if (node.details) {
                detailsHtml = `
                    <div class="med-node-details">
                        ${node.details}
                    </div>
                `;
            }

            nodeEl.innerHTML = `
                ${badgeHtml}
                <div class="med-node-header">
                    <span class="med-node-title">${node.title || 'Node'}</span>
                </div>
                ${node.subtitle ? `<div class="med-node-subtitle">${node.subtitle}</div>` : ''}
                ${detailsHtml}
            `;

            // Node Click Event
            nodeEl.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectNode(node.id);
            });

            // Make Node Draggable (If not readOnly)
            if (!this.readOnly) {
                this.makeNodeDraggable(nodeEl, node);
            }

            this.nodesLayer.appendChild(nodeEl);
        });
    }

    /**
     * Cho phép kéo thả Node vị trí linh hoạt trên Canvas
     */
    makeNodeDraggable(nodeEl, nodeObj) {
        let isDragging = false;
        let startX = 0, startY = 0;
        let initialX = 0, initialY = 0;

        nodeEl.addEventListener('mousedown', (e) => {
            if (e.target.closest('.med-node-details')) return; // Cho phép cuộn text trong details
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = nodeObj.x;
            initialY = nodeObj.y;
            nodeEl.classList.add('dragging');
            e.stopPropagation();
        });

        const onMouseMove = (e) => {
            if (!isDragging) return;
            const dx = (e.clientX - startX) / this.scale;
            const dy = (e.clientY - startY) / this.scale;
            nodeObj.x = Math.round(initialX + dx);
            nodeObj.y = Math.round(initialY + dy);
            nodeEl.style.left = `${nodeObj.x}px`;
            nodeEl.style.top = `${nodeObj.y}px`;
            this.renderEdges(); // Render lại dây nối ngay lập tức
        };

        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                nodeEl.classList.remove('dragging');
                if (this.onChange) this.onChange();
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }

    /**
     * Render các đường nối Edge (Mũi tên SVG) & Nhãn đường đi (Connector Labels)
     * Áp dụng quy tắc Định tuyến (Edge Routing) từ next-ai-draw-io: Anchors exitX/entryY & Waypoints
     */
    renderEdges() {
        this.edgesGroup.innerHTML = '';
        this.labelsGroup.innerHTML = '';

        this.edges.forEach(edge => {
            const sourceNode = this.nodes.find(n => n.id === edge.source);
            const targetNode = this.nodes.find(n => n.id === edge.target);
            if (!sourceNode || !targetNode) return;

            // Tính toán tọa độ đầu/cuối dựa theo Anchors exitX, exitY, entryX, entryY (mặc định 0.5)
            const exitX = edge.exitX !== undefined ? edge.exitX : 0.5;
            const exitY = edge.exitY !== undefined ? edge.exitY : 1.0; // Xuất mép dưới
            const entryX = edge.entryX !== undefined ? edge.entryX : 0.5;
            const entryY = edge.entryY !== undefined ? edge.entryY : 0.0; // Vào mép trên

            const srcW = sourceNode.width || 180;
            const srcH = sourceNode.height || 60;
            const tgtW = targetNode.width || 180;
            const tgtH = targetNode.height || 60;

            const startX = sourceNode.x + srcW * exitX;
            const startY = sourceNode.y + srcH * exitY;
            const endX = targetNode.x + tgtW * entryX;
            const endY = targetNode.y + tgtH * entryY;

            // Tạo đường nối SVG Path (Orthogonal hoặc Curved)
            let pathD = '';
            let labelX = (startX + endX) / 2;
            let labelY = (startY + endY) / 2;

            if (edge.waypoints && edge.waypoints.length > 0) {
                // Định tuyến qua Waypoints (tránh chướng ngại vật)
                pathD = `M ${startX} ${startY}`;
                edge.waypoints.forEach(wp => {
                    pathD += ` L ${wp.x} ${wp.y}`;
                });
                pathD += ` L ${endX} ${endY}`;

                // Vị trí label tại waypoint trung tâm
                const midWp = edge.waypoints[Math.floor(edge.waypoints.length / 2)];
                labelX = midWp.x;
                labelY = midWp.y;
            } else if (edge.style === 'curved') {
                // Đường cong mượt S-Curve
                const ctrlY = (startY + endY) / 2;
                pathD = `M ${startX} ${startY} C ${startX} ${ctrlY}, ${endX} ${ctrlY}, ${endX} ${endY}`;
            } else {
                // Mặc định: Orthogonal Edge Routing (Góc vuông)
                const midY = startY + (endY - startY) * 0.5;
                pathD = `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
                labelX = (startX + endX) / 2;
                labelY = midY;
            }

            // Trạng thái Highlight/Active Path
            const isActive = this.activePathEdgeIds.has(edge.id);
            const isSelected = this.selectedEdgeId === edge.id;
            const markerId = edge.type === 'danger' ? 'med-arrow-danger' 
                : edge.type === 'success' ? 'med-arrow-success' 
                : isActive ? 'med-arrow-active' 
                : 'med-arrow-normal';

            // Vẽ Path SVG
            const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathEl.setAttribute('d', pathD);
            pathEl.setAttribute('class', `med-edge-line ${edge.type || 'normal'} ${isActive ? 'active-line' : ''} ${isSelected ? 'selected' : ''}`);
            pathEl.setAttribute('marker-end', `url(#${markerId})`);
            pathEl.dataset.id = edge.id;

            pathEl.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectEdge(edge.id);
            });

            this.edgesGroup.appendChild(pathEl);

            // Vẽ Nhãn Connector Label (nếu có: Ví dụ "Có/Yes", "Không/No")
            if (edge.label) {
                const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                labelGroup.setAttribute('class', `med-edge-label-group ${isActive ? 'active-path' : ''}`);
                labelGroup.setAttribute('transform', `translate(${labelX}, ${labelY})`);

                const rectEl = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rectEl.setAttribute('class', `med-edge-label-bg ${edge.labelStyle || ''}`);
                rectEl.setAttribute('rx', '4');
                rectEl.setAttribute('ry', '4');

                const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                textEl.setAttribute('class', 'med-edge-label-text');
                textEl.setAttribute('text-anchor', 'middle');
                textEl.setAttribute('dy', '4');
                textEl.textContent = edge.label;

                labelGroup.appendChild(rectEl);
                labelGroup.appendChild(textEl);

                // Tính kích thước background động theo text
                setTimeout(() => {
                    try {
                        const bbox = textEl.getBBox();
                        rectEl.setAttribute('x', `${bbox.x - 8}`);
                        rectEl.setAttribute('y', `${bbox.y - 4}`);
                        rectEl.setAttribute('width', `${bbox.width + 16}`);
                        rectEl.setAttribute('height', `${bbox.height + 8}`);
                    } catch (err) {
                        rectEl.setAttribute('x', '-25');
                        rectEl.setAttribute('y', '-10');
                        rectEl.setAttribute('width', '50');
                        rectEl.setAttribute('height', '20');
                    }
                }, 0);

                // Click label -> Highlight lộ trình lâm sàng downstream
                labelGroup.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.highlightPathFromEdge(edge.id);
                });

                this.labelsGroup.appendChild(labelGroup);
            }
        });
    }

    /**
     * Chọn 1 Node & phát sự kiện callback
     */
    selectNode(nodeId) {
        this.selectedNodeId = nodeId;
        this.selectedEdgeId = null;
        this.activePathNodeIds.clear();
        this.activePathEdgeIds.clear();
        this.render();

        const nodeObj = this.nodes.find(n => n.id === nodeId);
        if (this.onNodeSelect) this.onNodeSelect(nodeObj);
    }

    /**
     * Chọn 1 Edge & phát sự kiện callback
     */
    selectEdge(edgeId) {
        this.selectedEdgeId = edgeId;
        this.selectedNodeId = null;
        this.render();

        const edgeObj = this.edges.find(e => e.id === edgeId);
        if (this.onEdgeSelect) this.onEdgeSelect(edgeObj);
    }

    /**
     * Tương tác Thông minh: Highlight toàn bộ lộ trình lâm sàng downstream khi bấm vào câu trả lời
     */
    highlightPathFromEdge(edgeId) {
        this.activePathNodeIds.clear();
        this.activePathEdgeIds.clear();

        const targetEdge = this.edges.find(e => e.id === edgeId);
        if (!targetEdge) return;

        this.activePathEdgeIds.add(edgeId);
        this.activePathNodeIds.add(targetEdge.source);
        this.activePathNodeIds.add(targetEdge.target);

        // Thuật toán DFS tìm tất cả node & edge tiếp theo
        const queue = [targetEdge.target];
        while (queue.length > 0) {
            const currNodeId = queue.shift();
            const outEdges = this.edges.filter(e => e.source === currNodeId);

            outEdges.forEach(e => {
                if (!this.activePathEdgeIds.has(e.id)) {
                    this.activePathEdgeIds.add(e.id);
                    this.activePathNodeIds.add(e.target);
                    queue.push(e.target);
                }
            });
        }

        this.render();
    }

    /**
     * Thêm Node mới
     */
    addNode(nodeData) {
        const id = nodeData.id || `node-${Date.now()}`;
        const newNode = {
            id,
            type: nodeData.type || 'action',
            title: nodeData.title || 'Tiêu đề node mới',
            subtitle: nodeData.subtitle || '',
            details: nodeData.details || '',
            x: nodeData.x || 100,
            y: nodeData.y || 100,
            width: nodeData.width || 200
        };
        this.nodes.push(newNode);
        this.selectNode(id);
        return newNode;
    }

    /**
     * Cập nhật thông tin Node
     */
    updateNode(nodeId, newData) {
        const idx = this.nodes.findIndex(n => n.id === nodeId);
        if (idx !== -1) {
            this.nodes[idx] = { ...this.nodes[idx], ...newData };
            this.render();
        }
    }

    /**
     * Xóa Node (Tự động xóa các Edge liên quan - Cascade Delete tương tự edit_diagram)
     */
    deleteNode(nodeId) {
        this.nodes = this.nodes.filter(n => n.id !== nodeId);
        this.edges = this.edges.filter(e => e.source !== nodeId && e.target !== nodeId);
        if (this.selectedNodeId === nodeId) this.selectedNodeId = null;
        this.render();
    }

    /**
     * Thêm đường nối Edge mới
     */
    addEdge(edgeData) {
        const id = edgeData.id || `edge-${Date.now()}`;
        const newEdge = {
            id,
            source: edgeData.source,
            target: edgeData.target,
            label: edgeData.label || '',
            type: edgeData.type || 'normal',
            style: edgeData.style || 'orthogonal',
            exitX: edgeData.exitX !== undefined ? edgeData.exitX : 0.5,
            exitY: edgeData.exitY !== undefined ? edgeData.exitY : 1.0,
            entryX: edgeData.entryX !== undefined ? edgeData.entryX : 0.5,
            entryY: edgeData.entryY !== undefined ? edgeData.entryY : 0.0
        };
        this.edges.push(newEdge);
        this.render();
        return newEdge;
    }

    /**
     * Xóa đường nối Edge
     */
    deleteEdge(edgeId) {
        this.edges = this.edges.filter(e => e.id !== edgeId);
        if (this.selectedEdgeId === edgeId) this.selectedEdgeId = null;
        this.render();
    }

    /**
     * Xuất file ảnh Vector SVG độc lập (Editable & High-Res)
     */
    exportSVG() {
        const clonedSvg = this.svgEl.cloneNode(true);
        clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        
        // Nhúng style CSS trực tiếp vào SVG
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            .med-edge-line { stroke: #64748b; stroke-width: 2.5px; fill: none; }
            .med-edge-line.danger { stroke: #ef4444; }
            .med-edge-line.success { stroke: #10b981; }
            .med-edge-line.active-line { stroke: #0284c7; stroke-width: 3.5px; }
            .med-edge-label-bg { fill: #ffffff; stroke: #cbd5e1; stroke-width: 1px; }
            .med-edge-label-text { font-family: sans-serif; font-size: 12px; fill: #1e293b; font-weight: 600; }
        `;
        clonedSvg.prepend(styleEl);

        const svgData = new XMLSerializer().serializeToString(clonedSvg);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Clinical_Flowchart_${Date.now()}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 100);
    }

    /**
     * Xuất sơ đồ ra file ảnh PNG chất lượng cao
     */
    exportPNG() {
        // Tạm thời reset view để chụp vừa khung
        const origScale = this.scale;
        const origX = this.translateX;
        const origY = this.translateY;
        this.resetView();

        setTimeout(() => {
            const svgData = new XMLSerializer().serializeToString(this.svgEl);
            const canvas = document.createElement('canvas');
            canvas.width = this.width * 2; // High resolution DPI
            canvas.height = this.height * 2;
            const ctx = canvas.getContext('2d');
            ctx.scale(2, 2);

            // Nền trắng
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, this.width, this.height);

            const img = new Image();
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);

            img.onload = () => {
                ctx.drawImage(img, 0, 0);
                URL.revokeObjectURL(url);

                const pngUrl = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = pngUrl;
                a.download = `Clinical_Algorithm_${Date.now()}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                // Phục hồi transform ban đầu
                this.scale = origScale;
                this.translateX = origX;
                this.translateY = origY;
                this.updateTransform();
            };

            img.src = url;
        }, 100);
    }
}

// Global Export
if (typeof window !== 'undefined') {
    window.MedicalDrawEngine = MedicalDrawEngine;
}
