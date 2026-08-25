/**
 * CliniPortal - Cross-Module Knowledge Graph Renderer
 * Renders interactive SVG network graph connecting Symptoms, Diseases, Labs, and Drugs.
 */
document.addEventListener('DOMContentLoaded', () => {
    const svg = document.getElementById('knowledgeGraphSvg');
    const detailPanel = document.getElementById('nodeDetailPanel');

    if (!svg || !detailPanel) return;

    const nodes = [
        // SYMPTOMS (Blue)
        { id: 'sym-1', name: 'Đau ngực', type: 'symptom', color: '#0284c7', x: 200, y: 150 },
        { id: 'sym-2', name: 'Khó thở', type: 'symptom', color: '#0284c7', x: 200, y: 280 },
        { id: 'sym-3', name: 'Sốt cao', type: 'symptom', color: '#0284c7', x: 200, y: 400 },

        // DISEASES (Red)
        { id: 'dis-1', name: 'STEMI (Cơ tim)', type: 'disease', color: '#e11d48', x: 450, y: 120 },
        { id: 'dis-2', name: 'Sốc nhiễm khuẩn', type: 'disease', color: '#e11d48', x: 450, y: 270 },
        { id: 'dis-3', name: 'Cơn hen ác tính', type: 'disease', color: '#e11d48', x: 450, y: 420 },

        // LABS (Green)
        { id: 'lab-1', name: 'ECG 12 lead', type: 'lab', color: '#10b981', x: 700, y: 80 },
        { id: 'lab-2', name: 'Troponin hs', type: 'lab', color: '#10b981', x: 700, y: 170 },
        { id: 'lab-3', name: 'Procalcitonin', type: 'lab', color: '#10b981', x: 700, y: 270 },
        { id: 'lab-4', name: 'Khí máu (ABG)', type: 'lab', color: '#10b981', x: 700, y: 370 },

        // DRUGS (Purple)
        { id: 'drg-1', name: 'Aspirin / Ticagrelor', type: 'drug', color: '#8b5cf6', x: 700, y: 470, url: '../Dược lý/Chuyên khoa/DL_Timmach.html' },
        { id: 'drg-2', name: 'Noradrenaline', type: 'drug', color: '#8b5cf6', x: 450, y: 500, url: '../Dược lý/duoc-ly.html' },
        { id: 'drg-3', name: 'Salbutamol', type: 'drug', color: '#8b5cf6', x: 200, y: 500, url: '../Dược lý/Chuyên khoa/DL_Hohap.html' }
    ];

    const links = [
        { source: 'sym-1', target: 'dis-1' },
        { source: 'sym-2', target: 'dis-1' },
        { source: 'sym-2', target: 'dis-3' },
        { source: 'sym-3', target: 'dis-2' },
        { source: 'dis-1', target: 'lab-1' },
        { source: 'dis-1', target: 'lab-2' },
        { source: 'dis-1', target: 'drg-1' },
        { source: 'dis-2', target: 'lab-3' },
        { source: 'dis-2', target: 'drg-2' },
        { source: 'dis-3', target: 'lab-4' },
        { source: 'dis-3', target: 'drg-3' }
    ];

    // Node lookup map
    const nodeMap = {};
    nodes.forEach(n => nodeMap[n.id] = n);

    // Draw Links
    let linksHtml = '';
    links.forEach(l => {
        const s = nodeMap[l.source];
        const t = nodeMap[l.target];
        if (s && t) {
            linksHtml += `<line class="graph-link" id="link-${l.source}-${l.target}" x1="${s.x}" y1="${s.y}" x2="${t.x}" y2="${t.y}"/>`;
        }
    });

    // Draw Nodes
    let nodesHtml = '';
    nodes.forEach(n => {
        nodesHtml += `
            <g class="graph-node" data-id="${n.id}" transform="translate(${n.x}, ${n.y})">
                <circle class="graph-node-circle" r="24" fill="${n.color}"/>
                <text class="graph-node-text" dy="35">${n.name}</text>
            </g>
        `;
    });

    svg.innerHTML = linksHtml + nodesHtml;

    // Add Node Interactions
    svg.querySelectorAll('.graph-node').forEach(nodeEl => {
        const id = nodeEl.getAttribute('data-id');
        const data = nodeMap[id];

        nodeEl.addEventListener('mouseenter', () => {
            // Highlight connected links
            links.forEach(l => {
                if (l.source === id || l.target === id) {
                    const line = document.getElementById(`link-${l.source}-${l.target}`);
                    if (line) line.classList.add('active');
                }
            });
        });

        nodeEl.addEventListener('mouseleave', () => {
            svg.querySelectorAll('.graph-link').forEach(line => line.classList.remove('active'));
        });

        nodeEl.addEventListener('click', () => {
            if (!data) return;

            let typeText = 'Triệu chứng';
            if (data.type === 'disease') typeText = 'Bệnh lý';
            if (data.type === 'lab') typeText = 'Cận lâm sàng';
            if (data.type === 'drug') typeText = 'Thuốc điều trị';

            detailPanel.innerHTML = `
                <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: ${data.color}; margin-bottom: 4px;">
                    ${typeText}
                </div>
                <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--color-text); margin-bottom: 8px;">${data.name}</h3>
                <p style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.4; margin-bottom: 14px;">
                    Thực thể liên kết trong hệ sinh thái y khoa CliniPortal.
                </p>
                <div style="display: flex; gap: 8px;">
                    <a href="${data.url || 'ma-tran-trieu-chung.html'}" style="padding: 6px 12px; background: ${data.color}; color: white; border-radius: 8px; font-size: 0.8rem; font-weight: 700; text-decoration: none;">
                        <i class="fa-solid fa-arrow-right-to-bracket"></i> Mở Module Chi Tiết
                    </a>
                </div>
            `;
            detailPanel.classList.add('active');
        });
    });
});
