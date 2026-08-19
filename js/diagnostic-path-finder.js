/**
 * ════════════════════════════════════════════════════════════════════════════
 *  DIAGNOSTIC PATH FINDER & STEINER TREE ENGINE — CLINI-PORTAL
 *  Phiên bản 3.0 (Phase 3) — Ứng dụng Thuật toán Đồ thị từ 0.6. Thiết kế
 *  Thuật toán: Dijkstra SSSP, General Steiner Tree Approximation & Graph Matching.
 *  Hỗ trợ: Pure SVG Network Graph, Multi-criteria Path Finding, Minimum Test Panel.
 * ════════════════════════════════════════════════════════════════════════════
 */

class DiagnosticPathFinder {
    constructor(options = {}) {
        this.graph = null;
        this.svgContainer = typeof options.svgContainer === 'string'
            ? document.querySelector(options.svgContainer)
            : options.svgContainer;

        this.width = options.width || 920;
        this.height = options.height || 540;

        // Callbacks
        this.onNodeClick = options.onNodeClick || null;
    }

    /**
     * Nạp dữ liệu Đồ thị Tri thức Y khoa
     */
    loadGraph(graphData) {
        if (!graphData || !graphData.nodes || !graphData.edges) return;
        this.graph = JSON.parse(JSON.stringify(graphData));
        this.calculatePositions();
        this.renderGraph();
    }

    /**
     * Tự động tính toán vị trí tọa độ các Node theo 3 Cột (Triệu chứng ➔ Cận lâm sàng ➔ Bệnh học)
     */
    calculatePositions() {
        if (!this.graph) return;

        const symptoms = this.graph.nodes.filter(n => n.type === 'symptom');
        const tests = this.graph.nodes.filter(n => n.type === 'test');
        const diseases = this.graph.nodes.filter(n => n.type === 'disease');

        const colWidth = this.width / 3;

        // Cột 1: Triệu chứng (X: 80 - 160)
        symptoms.forEach((n, idx) => {
            const spacing = this.height / (symptoms.length + 1);
            n.x = 100;
            n.y = Math.round(spacing * (idx + 1));
            n.r = 28;
        });

        // Cột 2: Cận lâm sàng & Chẩn đoán hình ảnh (X: Trung tâm)
        tests.forEach((n, idx) => {
            const spacing = this.height / (tests.length + 1);
            // Đặt sole nhẹ để tránh chồng chéo cạnh
            n.x = Math.round(colWidth + 100 + (idx % 2 === 0 ? -30 : 30));
            n.y = Math.round(spacing * (idx + 1));
            n.r = 32;
        });

        // Cột 3: Bệnh lý & Chẩn đoán xác định (X: Bên phải)
        diseases.forEach((n, idx) => {
            const spacing = this.height / (diseases.length + 1);
            n.x = this.width - 120;
            n.y = Math.round(spacing * (idx + 1));
            n.r = 30;
        });
    }

    /**
     * THUẬT TOÁN 1: Dijkstra Single-Source Shortest Path (SSSP)
     * Tìm đường chẩn đoán ngắn nhất / tối ưu theo 4 tiêu chí lâm sàng
     */
    findOptimalPath(sourceId, targetId, criteria = 'balanced') {
        if (!this.graph) return null;

        const distances = new Map();
        const previous = new Map();
        const unvisited = new Set();

        this.graph.nodes.forEach(n => {
            distances.set(n.id, Infinity);
            unvisited.add(n.id);
        });

        distances.set(sourceId, 0);

        while (unvisited.size > 0) {
            // Tìm đỉnh có khoảng cách nhỏ nhất trong unvisited
            let current = null;
            let minDistance = Infinity;

            unvisited.forEach(nodeId => {
                const d = distances.get(nodeId);
                if (d < minDistance) {
                    minDistance = d;
                    current = nodeId;
                }
            });

            if (current === null || current === targetId || minDistance === Infinity) {
                break;
            }

            unvisited.delete(current);

            // Duyệt các cạnh lân cận đi từ current
            const neighbors = this.graph.edges.filter(e => e.source === current);
            neighbors.forEach(edge => {
                if (unvisited.has(edge.target)) {
                    const targetNode = this.graph.nodes.find(n => n.id === edge.target);
                    const weight = this.calculateEdgeWeight(edge, targetNode, criteria);
                    const alt = distances.get(current) + weight;

                    if (alt < distances.get(edge.target)) {
                        distances.set(edge.target, alt);
                        previous.set(edge.target, { from: current, edge: edge });
                    }
                }
            });
        }

        // Tái tạo lại lộ trình đường đi từ targetId ngược về sourceId
        const pathNodes = [];
        const pathEdges = [];
        let curr = targetId;

        if (!previous.has(curr) && curr !== sourceId) {
            return null; // Không có đường nối
        }

        pathNodes.unshift(curr);
        while (previous.has(curr)) {
            const step = previous.get(curr);
            pathEdges.unshift(step.edge);
            curr = step.from;
            pathNodes.unshift(curr);
        }

        // Tính tổng chi phí, thời gian và mức độ xâm lấn
        let totalCost = 0;
        let totalTimeMinutes = 0;
        let maxRisk = 1;

        pathNodes.forEach(nId => {
            const node = this.graph.nodes.find(n => n.id === nId);
            if (node && node.type === 'test') {
                totalCost += (node.cost || 0);
                totalTimeMinutes += (node.timeMinutes || 0);
                maxRisk = Math.max(maxRisk, node.risk || 1);
            }
        });

        return {
            nodes: pathNodes,
            edges: pathEdges,
            totalCost,
            totalTimeMinutes,
            maxRisk,
            criteria
        };
    }

    /**
     * Hàm tính trọng số cạnh theo tiêu chí
     */
    calculateEdgeWeight(edge, targetNode, criteria) {
        const cost = targetNode ? (targetNode.cost || 50) : 50;
        const time = targetNode ? (targetNode.timeMinutes || 30) : 30;
        const risk = targetNode ? (targetNode.risk || 1) : 1;

        switch (criteria) {
            case 'fastest': // Ưu tiên thời gian nhanh nhất
                return time;
            case 'cheapest': // Ưu tiên chi phí rẻ nhất
                return cost;
            case 'least-invasive': // Ưu tiên ít xâm lấn nhất
                return risk * 100 + cost * 0.05;
            case 'balanced':
            default:
                // Công thức cân bằng: Thời gian + Chi phí quy đổi + Mức độ xâm lấn
                return time * 0.4 + (cost / 10) * 0.4 + risk * 15;
        }
    }

    /**
     * THUẬT TOÁN 2: Minimum Clinical Steiner Tree Panel
     * Tìm gói cận lâm sàng tối thiểu kết nối & bao phủ toàn bộ các triệu chứng đã chọn
     */
    findSteinerPanel(selectedSymptomIds) {
        if (!this.graph || !selectedSymptomIds || selectedSymptomIds.length === 0) return null;

        const candidateTests = this.graph.nodes.filter(n => n.type === 'test');
        const selectedSymptomsSet = new Set(selectedSymptomIds);

        // Đếm độ bao phủ của từng xét nghiệm đối với tập triệu chứng đã chọn
        const testScores = candidateTests.map(testNode => {
            const coveredSymptoms = this.graph.edges
                .filter(e => e.target === testNode.id && selectedSymptomsSet.has(e.source))
                .map(e => e.source);

            const connectedDiseases = this.graph.edges
                .filter(e => e.source === testNode.id)
                .map(e => e.target);

            const coverageCount = coveredSymptoms.length;
            const cost = testNode.cost || 100;
            // Hiệu quả bao phủ trên mỗi đồng chi phí (Coverage-to-Cost ratio)
            const efficiency = coverageCount > 0 ? (coverageCount * 1000) / cost : 0;

            return {
                test: testNode,
                coveredSymptoms,
                connectedDiseases,
                coverageCount,
                efficiency
            };
        });

        // Sắp xếp theo hiệu quả bao phủ giảm dần (Greedy Steiner Approximation)
        testScores.sort((a, b) => b.efficiency - a.efficiency || b.coverageCount - a.coverageCount);

        const recommendedTests = [];
        const coveredSoFar = new Set();
        let totalCost = 0;
        let totalTime = 0;

        testScores.forEach(item => {
            // Nếu xét nghiệm này bổ sung thêm ít nhất 1 triệu chứng chưa được bao phủ
            const hasNewCoverage = item.coveredSymptoms.some(s => !coveredSoFar.has(s));
            if (hasNewCoverage || (recommendedTests.length === 0 && item.coverageCount > 0)) {
                recommendedTests.push(item.test);
                item.coveredSymptoms.forEach(s => coveredSoFar.add(s));
                totalCost += (item.test.cost || 0);
                totalTime = Math.max(totalTime, item.test.timeMinutes || 0);
            }
        });

        return {
            selectedSymptoms: selectedSymptomIds,
            recommendedTests,
            uncoveredSymptoms: selectedSymptomIds.filter(s => !coveredSoFar.has(s)),
            totalCost,
            totalTime
        };
    }

    /**
     * THUẬT TOÁN 3: Graph Bipartite Matching & Xếp hạng Chẩn đoán
     */
    rankDiagnoses(selectedSymptomIds) {
        if (!this.graph || !selectedSymptomIds || selectedSymptomIds.length === 0) return [];

        const diseases = this.graph.nodes.filter(n => n.type === 'disease');
        const selectedSet = new Set(selectedSymptomIds);

        const rankings = diseases.map(diseaseNode => {
            // Tìm tất cả triệu chứng có đường dẫn đến bệnh này qua các xét nghiệm
            const incomingTests = this.graph.edges
                .filter(e => e.target === diseaseNode.id)
                .map(e => e.source);

            const associatedSymptoms = new Set();
            incomingTests.forEach(testId => {
                const symptomsLeadingToTest = this.graph.edges
                    .filter(e => e.target === testId)
                    .map(e => e.source);
                symptomsLeadingToTest.forEach(s => associatedSymptoms.add(s));
            });

            // Tính số lượng triệu chứng trùng khớp (Graph Overlap)
            let matchedCount = 0;
            associatedSymptoms.forEach(sId => {
                if (selectedSet.has(sId)) matchedCount++;
            });

            const totalPossible = Math.max(associatedSymptoms.size, 1);
            const matchPercentage = Math.round((matchedCount / totalPossible) * 100);

            return {
                disease: diseaseNode,
                matchPercentage,
                matchedSymptomsCount: matchedCount,
                totalSymptomsCount: totalPossible
            };
        });

        rankings.sort((a, b) => b.matchPercentage - a.matchPercentage || b.matchedSymptomsCount - a.matchedSymptomsCount);
        return rankings;
    }

    /**
     * Render toàn bộ Đồ thị Vector SVG Tương tác
     */
    renderGraph(highlightedPathNodes = [], highlightedPathEdges = []) {
        if (!this.svgContainer || !this.graph) return;

        const pathNodesSet = new Set(highlightedPathNodes);
        const pathEdgesSet = new Set(highlightedPathEdges.map(e => `${e.source}->${e.target}`));

        let edgesSvg = this.graph.edges.map(e => {
            const src = this.graph.nodes.find(n => n.id === e.source);
            const tgt = this.graph.nodes.find(n => n.id === e.target);
            if (!src || !tgt) return '';

            const isHighlighted = pathEdgesSet.has(`${e.source}->${e.target}`);
            const midX = (src.x + tgt.x) / 2;
            const midY = (src.y + tgt.y) / 2;

            return `
                <g class="graph-edge-group ${isHighlighted ? 'active-edge' : ''}">
                    <line x1="${src.x}" y1="${src.y}" x2="${tgt.x}" y2="${tgt.y}" 
                          class="graph-edge-line ${isHighlighted ? 'active' : ''}" />
                    ${e.condition ? `
                        <rect x="${midX - 35}" y="${midY - 10}" width="70" height="20" rx="4" class="edge-badge-bg" />
                        <text x="${midX}" y="${midY + 4}" class="edge-badge-text" text-anchor="middle">${e.condition}</text>
                    ` : ''}
                </g>
            `;
        }).join('\n');

        let nodesSvg = this.graph.nodes.map(n => {
            const isHighlighted = pathNodesSet.has(n.id);
            let typeClass = n.type === 'symptom' ? 'node-symptom'
                : n.type === 'test' ? 'node-test' : 'node-disease';

            return `
                <g class="graph-node-group ${typeClass} ${isHighlighted ? 'active-node' : ''}" 
                   transform="translate(${n.x}, ${n.y})" 
                   onclick="window.currentPathFinder.handleNodeClick('${n.id}')">
                    <circle r="${n.r || 28}" class="graph-node-circle" />
                    <text y="4" class="graph-node-label" text-anchor="middle">${n.label}</text>
                    ${n.cost ? `<text y="${n.r + 14}" class="graph-node-sub" text-anchor="middle">${n.cost}k • ${n.timeMinutes}p</text>` : ''}
                </g>
            `;
        }).join('\n');

        this.svgContainer.innerHTML = `
            <svg class="med-graph-svg" viewBox="0 0 ${this.width} ${this.height}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <!-- Column Background Bands -->
                <rect x="20" y="20" width="${this.width / 3 - 30}" height="${this.height - 40}" rx="10" class="graph-col-band band-symptom" />
                <rect x="${this.width / 3 + 10}" y="20" width="${this.width / 3 - 20}" height="${this.height - 40}" rx="10" class="graph-col-band band-test" />
                <rect x="${(this.width / 3) * 2 + 10}" y="20" width="${this.width / 3 - 30}" height="${this.height - 40}" rx="10" class="graph-col-band band-disease" />

                <!-- Column Headers -->
                <text x="100" y="45" class="graph-col-title" text-anchor="middle">🟡 TRIỆU CHỨNG (SOURCE)</text>
                <text x="${this.width / 2}" y="45" class="graph-col-title" text-anchor="middle">🔵 CẬN LÂM SÀNG (STEINER NODES)</text>
                <text x="${this.width - 120}" y="45" class="graph-col-title" text-anchor="middle">🔴 CHẨN ĐOÁN (TARGET)</text>

                <!-- Edges & Nodes -->
                <g class="graph-layer-edges">${edgesSvg}</g>
                <g class="graph-layer-nodes">${nodesSvg}</g>
            </svg>
        `;
    }

    handleNodeClick(nodeId) {
        const node = (this.graph.nodes || []).find(n => n.id === nodeId);
        if (this.onNodeClick && node) {
            this.onNodeClick(node);
        }
    }
}

if (typeof window !== 'undefined') {
    window.DiagnosticPathFinder = DiagnosticPathFinder;
}
